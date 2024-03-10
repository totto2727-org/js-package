import { Stub, stub } from "./deps.ts"

export function abortSignalStub(): Stub<
  typeof AbortSignal,
  Parameters<typeof AbortSignal.timeout>,
  AbortSignal
> {
  return stub(
    AbortSignal,
    "timeout",
    () => new AbortController().signal,
  )
}

export function fetchStub(
  response: Response,
): Stub<
  typeof globalThis,
  Parameters<typeof fetch>,
  Promise<Response>
> {
  return stub(
    globalThis,
    "fetch",
    () => Promise.resolve(response),
  )
}
