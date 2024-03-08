import { describe, expect, test } from "bun:test"

import * as r from "./index.mts"
import { paththrough } from "./test-helper.mts"

describe("Result型のプリミティブのテスト", () => {
  describe("Success型のテスト", () => {
    // type check
    const x: r.Success<1> = { type: "success", value: 1 }

    test('succeed関数の返り値は`type: "success"`を持つ', () => {
      // type check
      const y: r.Success<1> = r.succeed(1)

      expect(y).toStrictEqual(x)

      expect(y.type).toBe("success")
    })

    const title1 =
      "isSuccess function return true when Success type is taken as argument"
    test(title1, () => {
      const x = r.succeed(true)

      if (!r.isSuccess(x)) {
        throw new Error(title1)
      }
      // type check
      expect(x.value).toBe(true)
    })

    const title2 =
      "isSuccess function return false when Failure type is taken as argument"
    test(title2, () => {
      const x = r.fail(new Error("hoge"))

      if (r.isSuccess(x)) {
        throw new Error(title2)
      }
      // type check
      expect(x.cause.message).toBe("hoge")
    })
  })

  describe("Failure型のテスト", () => {
    // type check
    const x: r.Failure<Error> = { type: "failure", cause: new Error("hoge") }

    test('fail関数は`type: "failure"`を返す', () => {
      const y: r.Failure<Error> = r.fail(new Error("hoge"))

      expect(y.cause.message).toBe(x.cause.message)

      expect(r.fail(new Error("fuga")).type).toBe("failure")
    })

    const title1 =
      "isFailure function return true when Failure type is taken as argument"
    test(title1, () => {
      // type check
      const x: r.Failure<Error> = r.fail(new Error("hoge"))

      if (!r.isFailure(x)) {
        throw new Error(title1)
      }

      // type check
      expect(x.cause.message).toBe("hoge")
    })

    const title2 =
      "isFailure function return false when Failure type is taken as argument"
    test(title2, () => {
      const x = r.succeed("hoge")

      if (r.isFailure(x)) {
        throw new Error(title2)
      }
      // type check
      expect(x.value).toBe("hoge")
    })
  })

  describe("Result型のテスト", () => {
    test("ExtractSuccess型はResult型からSuccess型の型変数を抽出することができる", () => {
      type OriginalResult = r.Result<number, Error>
      const a: r.ExtractSuccess<OriginalResult> = 1
      paththrough(a)
    })

    test("ExtractFailure型はResult型からFailure型の型変数を抽出することができる", () => {
      type OriginalResult = r.Result<number, Error>
      const b: r.ExtractFailure<OriginalResult> = new Error("hoge")
      paththrough(b)
    })

    test("AnyhowResult型はあらゆる失敗の可能性を内包することができる", () => {
      const v: r.AnyhowResult<number> = r.fail(new Error("hoge"))

      if (r.isFailure(v)) {
        const v2: unknown = v.cause
      }
    })

    describe("unwrap関数のテスト", () => {
      test("unwrap関数はSuccess型の値を受け取った時、valueプロパティの値を返す", () => {
        expect(r.unwrap(r.succeed(1))).toBe(1)
      })

      test("unwrap関数はFailure型の値を受け取った時、例外を投げる", () => {
        expect(() => r.unwrap(r.fail(new Error("hoge")))).toThrow()
      })
    })
  })
})
