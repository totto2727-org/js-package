import { expect } from "./deps.ts"

export function paththrough<T>(v: T): T {
  return v
}

export function todo(): void {
  expect(true, "todo!").toBe(false)
}
