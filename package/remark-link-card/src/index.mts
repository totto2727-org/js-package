import { access, mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import he from "he"
import ogs from "open-graph-scraper"
import * as r from "remeda"
import sanitize from "sanitize-filename"
import { Transformer } from "unified"
import { Literal, Parent } from "unist"
import visit from "unist-util-visit"

type RlcOption = Partial<{
  cache: boolean
  shortenUrl: boolean
  timeout: number
  cachePublicDirectory: string
  cacheBaseDirectory: string
}>

const DEFAULT_RLC_OPTION: Required<RlcOption> = {
  cache: false,
  shortenUrl: false,
  timeout: 10000,
  cachePublicDirectory: "public",
  cacheBaseDirectory: "remark-link-card",
}

const isDebug = false

function debug(label: string, value: unknown, enable = false) {
  if (!enable && !isDebug) return
  console.debug(label, "\n", JSON.stringify(value))
}

export function rlc(optionsRaw?: RlcOption): Transformer {
  const options = r.merge(DEFAULT_RLC_OPTION, optionsRaw ?? {})

  return async (tree_) => {
    // TODO: remove as Parent
    const tree = tree_ as Parent

    debug("tree", tree)

    const transformers: (() => Promise<void>)[] = []

    visit<Parent>(tree, "paragraph", (paragraph, index) => {
      debug("index", index)
      debug("paragraph", paragraph)

      if (paragraph.children.length !== 1) {
        debug("paragraph", "not exists node.children")
        return
      }

      if (paragraph.data) {
        debug("paragraph", "exists node.data")
        return
      }

      debug("node", "not exists node.data")

      visit<Literal<string>>(paragraph, "text", (text) => {
        debug("text", text)

        if (!URL.canParse(text.value)) {
          debug("text", "fail to parse URL")
          return
        }
        debug("text", "success to parse URL")

        const url = new URL(text.value)
        debug("url", url.toString())

        const transform = async () => {
          // @ts-expect-error URL type error?
          // TODO: fix type error
          const data = await fetchData(options, url)
          debug("fetch", data)

          const linkCardHtml = createLinkCard(data)
          debug("link-card-html", linkCardHtml)

          const linkCardNode = {
            type: "html",
            value: linkCardHtml,
          }

          // Replace paragraph node with linkCardNode
          tree.children.splice(index, 1, linkCardNode)
        }

        transformers.push(transform)
        debug("transformers", transformers.length)
      })
    })

    try {
      debug("transformers", "start")
      await Promise.all(transformers.map((f) => f()))
      debug("transformers", "success")
    } catch (error) {
      debug("transformers", "fail")
      console.error(`[remark-link-card] Error: ${error}`)
    }

    return tree
  }
}

async function getOpenGraph(option: Required<RlcOption>, targetUrl: URL) {
  const data = await ogs({
    url: targetUrl.toString(),
    fetchOptions: {
      signal: AbortSignal.timeout(option.timeout),
    },
  })
  if (data.error) {
    console.error(
      `[remark-link-card] Error: Failed to get the Open Graph data of ${targetUrl.toString()}} due to ${
        data.result.errorDetails
      }.`,
    )
    return undefined
  }

  return data.result
}

async function fetchData(option: Required<RlcOption>, targetUrl: URL) {
  // get open graph
  const data = await getOpenGraph(option, targetUrl)

  const ogImage = data?.ogImage?.[0]

  // set title
  const title =
    (data?.ogTitle && he.decode(data.ogTitle)) || targetUrl.toString()

  // set description
  const description =
    (data?.ogDescription && he.encode(data.ogDescription)) || ""

  // set favicon src
  const faviconUrlRaw = `https://www.google.com/s2/favicons?domain=${targetUrl.hostname}`
  if (!URL.canParse(faviconUrlRaw)) {
    throw new Error(
      `[remark-link-card] Error: Failed to parse url "${faviconUrlRaw}"`,
    )
  }

  const faviconUrl = new URL(faviconUrlRaw)

  let faviconSrc: string | undefined
  if (option.cache) {
    // @ts-expect-error URL type error?
    // TODO: fix type error
    const faviconFilename = await downloadImage(option, faviconUrl)
    faviconSrc =
      faviconFilename && path.join(option.cacheBaseDirectory, faviconFilename)
  } else {
    faviconSrc = faviconUrl.toString()
  }

  // set open graph image src
  let ogImageSrc: string | undefined
  if (ogImage?.url) {
    if (option.cache) {
      // @ts-expect-error URL type error?
      // TODO: fix type error
      const imageFilename = await downloadImage(option, new URL(ogImage.url))
      ogImageSrc =
        imageFilename && path.join(option.cacheBaseDirectory, imageFilename)
    } else {
      ogImageSrc = ogImage.url
    }
  } else {
    ogImageSrc = undefined
  }

  // set open graph image alt
  const ogImageAlt = (ogImage?.alt && he.encode(ogImage.alt)) || title

  // set display url
  let displayUrl = option?.shortenUrl
    ? targetUrl.hostname
    : targetUrl.toString()
  try {
    displayUrl = decodeURI(displayUrl)
  } catch (error) {
    console.error(
      `[remark-link-card] Error: Cannot decode url: "${displayUrl.toString()}"\n ${error}`,
    )
  }

  return {
    title,
    description,
    faviconSrc,
    ogImageSrc,
    ogImageAlt,
    displayUrl,
    url: targetUrl.toString(),
  }
}

function createLinkCard(data: Awaited<ReturnType<typeof fetchData>>) {
  // create favicon element
  const faviconElement = data.faviconSrc
    ? `<img class="rlc-favicon" src="${data.faviconSrc}" alt="${data.title} favicon" width="16" height="16">`.trim()
    : ""

  // create description element
  const descriptionElement = data.description
    ? `<div class="rlc-description">${data.description}</div>`
    : ""

  // create image element
  const imageElement = data.ogImageSrc
    ? `<div class="rlc-image-container">
      <img class="rlc-image" src="${data.ogImageSrc}" alt="${data.ogImageAlt}" />
    </div>`.trim()
    : ""

  // create output HTML
  const outputHTML = `
<a class="rlc-container" href="${data.url}">
  <div class="rlc-info">
    <div class="rlc-title">${data.title}</div>
    ${descriptionElement}
    <div class="rlc-url-container">
      ${faviconElement}
      <span class="rlc-url">${data.displayUrl}</span>
    </div>
  </div>
  ${imageElement}
</a>
`.trim()

  return outputHTML
}

async function downloadImage(option: Required<RlcOption>, url: URL) {
  // try {
  //   targetUrl = new URL(url)
  // } catch (error) {
  //   console.error(
  //     `[remark-link-card] Error: Failed to parse url "${url}"\n ${error}`,
  //   )
  // }

  const filename = sanitize(decodeURI(url.href))

  const saveFilePath = path.join(
    option.cachePublicDirectory,
    option.cacheBaseDirectory,
    filename,
  )

  // check file existence(if it is existed, return filename)
  try {
    await access(saveFilePath)
    return filename
  } catch (error) {}

  // check directory existence
  try {
    await access(
      path.join(option.cachePublicDirectory, option.cacheBaseDirectory),
    )
  } catch (error) {
    // create directory if it is not existed
    await mkdir(
      path.join(option.cachePublicDirectory, option.cacheBaseDirectory),
      { recursive: true },
    )
  }

  // fetch data
  try {
    const response = await fetch(url.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
      },
      signal: AbortSignal.timeout(option.timeout),
    })

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    writeFile(saveFilePath, buffer)
  } catch (error) {
    console.error(
      `[remark-link-card] Error: Failed to download image from ${url.toString()}\n ${error}`,
    )
    return undefined
  }

  return filename
}
