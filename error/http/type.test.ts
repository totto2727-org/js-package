import { describe, expect, test } from "@/test/index.ts"
import { HttpErrorOk } from "./index.ts"

describe("HttpErrorクラス", () => {
  test("toResponse()", () => {
    expect(new HttpErrorOk().toResponse().status).toBe(200)
  })
})
