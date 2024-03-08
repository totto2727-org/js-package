const isDebug = false

export function debug(label: string, value: unknown, enable = false): void {
  if (!enable && !isDebug) return
  typeof value === "string" && console.debug(label, "\n", value)
  console.debug(label, "\n", JSON.stringify(value))
}
