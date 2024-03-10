import { describe, expect, it } from "@/test/index.ts"
import * as safe from "./safe.ts"
import * as r from "@/result/index.ts"
import { decodeUriSafe } from "@/safe/index.ts"
import { Failure } from "@/result/lib/share.ts"

describe("safe", () => {
  describe("parseUrlSafe()", () => {
    it("should parse valid url", () => {
      const result = safe.parseUrlSafe("https://example.com")
      const expected = r.succeed(new URL("https://example.com"))
      expect(result).toEqual(expected)
    })

    it("should fail to parse invalid url", async (t) => {
      const url = "example.com"
      const result = safe.parseUrlSafe(url) as Failure<Error>

      await t.step(
        "result type",
        () => {
          const expectedType = "failure"

          expect(result.type).toEqual(
            expectedType,
          )
        },
      )

      await t.step(
        "result error message",
        () => {
          const expectedMessage = `Failed to parse url "${url}"`

          expect(result.cause.message.split("\n")[0]).toEqual(
            expectedMessage,
          )
        },
      )
    })
  })

  describe("decodeUriSafe()", () => {
    it("should decode valid url", () => {
      const encoded =
        "https://mozilla.org/%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%91%E3%82%B9/?x=%22%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%82%AF%E3%82%A8%E3%83%AA%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%22"
      const decoded =
        'https://mozilla.org/日本語パス/?x="日本語クエリパラメータ"'
      expect(decodeUriSafe(encoded)).toEqual(r.succeed(decoded))
    })

    it("should fail to decode invalid url", async (t) => {
      const encoded = "%E0%A4%A"
      const result = decodeUriSafe(encoded) as Failure<Error>

      await t.step(
        "result type",
        () => {
          const expectedType = "failure"

          expect(result.type).toEqual(
            expectedType,
          )
        },
      )

      await t.step(
        "result error message",
        () => {
          const expectedMessage =
            `Failed to decode url "${encoded}: URI malformed"`

          expect(result.cause.message.split("\n")[0]).toEqual(
            expectedMessage,
          )
        },
      )
    })
  })
})
