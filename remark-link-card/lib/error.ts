import { RlcOption } from "./type.ts"

export function error(
  option: Pick<RlcOption, "error">,
  error: Error,
  message: string,
): void {
  if (!option.error) return

  console.error(`[remark-link-card] Error: ${message}`)
  console.error(error)
}
