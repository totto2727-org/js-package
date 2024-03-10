import { describe, expect, it } from "@/test/index.ts"

import { fn } from "./index.ts"

describe("describe", () => {
  it("test", () => {
    expect(fn()).toBe(1)
  })
})
