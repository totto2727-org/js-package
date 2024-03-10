import { isString } from "./deps.ts"

const isDebug = false

export function debug(label: string, value: unknown, enable = false): void {
  if (!enable && !isDebug) return
  else if (isString(value)) console.debug(label, "\n", value)
  else console.debug(label, "\n", JSON.stringify(value))
}
