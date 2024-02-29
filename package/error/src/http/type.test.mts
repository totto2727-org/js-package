import { describe, expect, test } from "bun:test"
import { HttpErrorOk } from "./index.mts"

describe("HttpErrorクラス", () => {
  test("toResponse()", () => {
    expect(new HttpErrorOk().toResponse().status).toBe(200)
  })
})
