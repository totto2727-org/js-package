import { Result } from "@totto2727/result"
import { parseUrlSafe } from "./safe.mts"

export function generateFaviconSrc(url: URL): Result<URL, Error> {
  return parseUrlSafe(
    `https://www.google.com/s2/favicons?domain=${url.hostname}`,
  )
}
