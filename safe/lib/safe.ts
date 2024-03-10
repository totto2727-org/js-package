import { fail, Result, succeed } from "@/result/index.ts"

export function parseUrlSafe(url: string): Result<URL, Error> {
  if (URL.canParse(url)) {
    return succeed(new URL(url))
  }
  return fail(new Error(`Failed to parse url "${url}"`))
}

export function decodeUriSafe(url: string): Result<string, Error> {
  try {
    return succeed(decodeURI(url))
  } catch (e) {
    if (e instanceof Error) {
      return fail(new Error(`Failed to decode url "${url}: ${e.message}"`))
    }

    return fail(new Error(`Failed to decode url "${url}"`))
  }
}
