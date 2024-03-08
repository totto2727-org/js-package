import { Result, isFailure, succeed } from "@totto2727/result"
import he from "he"
import { ImageObject } from "open-graph-scraper/dist/lib/types"
import { hasAtLeast } from "remeda"
import { fetchOpenGraph } from "./fetchOpenGraph.mts"
import { generateFaviconSrc } from "./generateFaviconSrc.mts"
import { decodeUriSafe, parseUrlSafe } from "./safe.mts"
import { LinkCardProps, RlcOption } from "./type.mts"

export async function fetchLinkCardProps(
  option: Required<RlcOption>,
  ogpSourceUrl: URL,
): Promise<
  Result<
    Partial<Omit<LinkCardProps, "url" | "displayUrl" | "faviconSrc">>,
    Error
  >
> {
  // get open graph
  const result = await fetchOpenGraph(option, ogpSourceUrl)

  if (isFailure(result)) {
    return result
  }

  const ogp = result.value

  // set title
  const title = ogp?.ogTitle && he.encode(ogp.ogTitle)

  // set description
  const description = ogp?.ogDescription && he.encode(ogp.ogDescription)

  // set open graph
  const ogImages = ogp.ogImage ?? []

  let ogImage: ImageObject

  if (hasAtLeast(ogImages, 1)) {
    ogImage = ogImages[0]
  } else {
    return succeed({
      title,
      description,
    })
  }

  // set open graph image src
  const ogImageSrc = ogImage.url

  // set open graph image alt
  const ogImageAlt = (ogImage.alt && he.encode(ogImage.alt)) || title

  return succeed({
    title,
    description,
    ogImageSrc,
    ogImageAlt,
  })
}
