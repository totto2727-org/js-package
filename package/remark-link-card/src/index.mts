import { isFailure } from "@totto2727/result"
import * as result from "@totto2727/result"
import { Literal, Parent } from "mdast"
import * as r from "remeda"
import { Plugin } from "unified"
import visit from "unist-util-visit"
import { createLinkCard } from "./createLinkCard.mts"
import { debug } from "./debug.mts"
import { error } from "./error.mts"
import { extractUrl } from "./extracteUrl.mts"
import { fetchLinkCardProps } from "./fetchLinkCardProps.mts"
import { generateFaviconSrc } from "./generateFaviconSrc.mts"
import { decodeUriSafe, parseUrlSafe } from "./safe.mts"
import { DEFAULT_RLC_OPTION, LinkCardProps, RlcOption } from "./type.mts"

export const rlc: Plugin<[(RlcOption | undefined | null)?], Parent> = (
  optionsRaw,
) => {
  const options = r.merge(DEFAULT_RLC_OPTION, optionsRaw ?? {})

  return async (tree) => {
    debug("tree", tree)

    const transformers: (() => Promise<void>)[] = []

    visit<Parent>(tree, "paragraph", (paragraph, index) => {
      debug("paragraph index", index)
      debug("paragraph", paragraph)

      if (paragraph.children.length !== 1) {
        debug("paragraph", "not exists children")
        return
      }

      if (paragraph.data) {
        debug("paragraph", "exists data")
        return
      }

      debug("node", "not exists data")

      visit<Literal>(paragraph, "text", (text) => {
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

        let displayUrl: string
        if (isFailure(displayUrlResult)) {
          error(
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
        if (isFailure(faviconUrlResult)) {
          error(
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

          if (isFailure(data)) {
            error(data.cause, "fail to fetch source of link card")

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

          const linkCardHtml = createLinkCard(props)
          debug("link-card-html", linkCardHtml)

          const linkCardNode = {
            type: "html",
            value: linkCardHtml,
          } as const

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
    } catch (e) {
      debug("transformers", "fail")
      error(e as Error, "fail to transform link card")
    }

    return tree
  }
}
