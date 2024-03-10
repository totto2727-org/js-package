import { Result } from "@/result/index.ts"
import { parseUrlSafe } from "@/safe/lib/safe.ts"

export function generateFaviconSrc(url: URL): Result<URL, Error> {
  return parseUrlSafe(
    `https://www.google.com/s2/favicons?domain=${url.hostname}`,
  )
}
