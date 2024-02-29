import * as result from "@/result/lib/result.ts"
import { createLinkCard } from "./createLinkCard.ts"
import { debug } from "./debug.ts"
import { error } from "./error.ts"
import { extractUrl } from "./extracteUrl.ts"
import { fetchLinkCardProps } from "./fetchLinkCardProps.ts"
import { generateFaviconSrc } from "./generateFaviconSrc.ts"
import { decodeUriSafe, parseUrlSafe } from "@/safe/lib/safe.ts"
import { DEFAULT_RLC_OPTION, LinkCardProps, RlcOption } from "./type.ts"
import { isDefined, merge, Parent, Plugin, visit } from "./deps.ts"

export const rlc: Plugin<[RlcOption?], Parent, Parent> = (
  optionsRaw,
) => {
  const options = merge(DEFAULT_RLC_OPTION, optionsRaw ?? {})

  return async (tree) => {
    debug("tree", tree)

    const transformers: (() => Promise<void>)[] = []

    visit(tree, "paragraph", (paragraph, index) => {
      debug("paragraph index", index)
      debug("paragraph", paragraph)

      if (paragraph.children.length !== 1) {
        debug("paragraph", "not exists children")
        return
      }

      if (isDefined(paragraph.data)) {
        debug("paragraph", "exists data")
        return
      }

      debug("node", "not exists data")

      visit(paragraph, "text", (text) => {
        debug("text", text)

        const extracted = extractUrl(text.value)

        if (extracted.length !== 1) {
          debug("extracted", extracted)
          return
        }

        // set url
        const urlResult = parseUrlSafe(extracted[0])

        // extracted is validated URLs
        // No chance of execution.
        if (result.isFailure(urlResult)) {
          return
        }

        const url = urlResult.value
        debug("url", url.toString())

        // set display url
        const displayUrlResult = decodeUriSafe(
          options?.shortenUrl ? url.hostname : url.toString(),
        )
        debug("displayUrlResult", displayUrlResult)

        let displayUrl: string
        if (result.isFailure(displayUrlResult)) {
          error(
            options,
            displayUrlResult.cause,
            "fail to parse url for display url of card ",
          )
          displayUrl = url.hostname
        } else {
          displayUrl = displayUrlResult.value
        }

        // set favicon src
        const faviconUrlResult = generateFaviconSrc(url)

        let faviconSrc: string | null
        if (result.isFailure(faviconUrlResult)) {
          error(
            options,
            faviconUrlResult.cause,
            "fail to generate favicon src of link card",
          )
          faviconSrc = null
        } else {
          faviconSrc = faviconUrlResult.value.toString()
        }

        const baseProps = {
          url: url.toString(),
          displayUrl: displayUrl,
          faviconSrc,
        }

        const transform = async () => {
          const data = await fetchLinkCardProps(options, url)
          debug("fetch", data)

          let props: LinkCardProps

          if (result.isFailure(data)) {
            error(options, data.cause, "fail to fetch source of link card")

            props = {
              ...baseProps,
              title: url.hostname,
            }
          } else {
            props = {
              ...baseProps,
              ...data.value,
              title: data.value.title ?? url.hostname,
            }
          }

          debug("props", props)

          const linkCardHtml = createLinkCard(props)

          debug("link-card-html", linkCardHtml)

          const linkCardNode = {
            type: "html",
            value: linkCardHtml,
          } as const

          // Replace paragraph node with linkCardNode
          if (isDefined(index)) {
            tree.children.splice(index, 1, linkCardNode)
          }
        }

        transformers.push(transform)
        debug("transformers", transformers.length)
      })
    })

    try {
      debug("transformers", "start")
      await Promise.all(transformers.map((f) => f()))
      debug("transformers", "success")
    } catch (e) {
      debug("transformers", "fail")
      error(options, e as Error, "fail to transform link card")
    }

    return tree
  }
}
