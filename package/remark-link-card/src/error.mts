export function error(error: Error, message: string): void {
  console.error(`[remark-link-card] Error: ${message}`)
  console.error(error)
}
