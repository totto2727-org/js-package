import { urlRegexGenerator } from "./deps.ts"

const urlRegex = urlRegexGenerator({ strict: true, localhost: false })

export function extractUrl(str: string): string[] {
  const match = str.match(urlRegex)
  const filterd = match?.filter((v) => URL.canParse(v)) ?? []
  return filterd
}
