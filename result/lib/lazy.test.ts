import * as r from "./result.ts"
import { failInternal } from "./internal.ts"
import * as rutil from "./lazy.ts"
import { describe, expect, test } from "@/test/index.ts"

describe("result/lazy", () => {
  describe("serialize関数のテスト", () => {
    test("serialize関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(
        rutil.serialize((_) => ({
          value: 2,
        }))(r.succeed(1)),
      ).toStrictEqual(r.succeed(1))
    })

    test("serialize関数はFailure型の値を受け取った時、関数を実行してFailure型を返す", () => {
      expect(
        rutil.serialize((error) => ({
          message: error.message,
        }))(r.fail(new Error("hoge")) as r.Result<number, Error>),
      ).toStrictEqual(failInternal({ message: "hoge" }))
    })
  })

  describe("unwrapOr関数のテスト", () => {
    test("unwrapOr関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型のvalueを返す", () => {
      expect(rutil.unwrapOr(10)(r.succeed(1))).toStrictEqual(1)
    })

    test("unwrapOr関数はFailure型の値を受け取った時、代替の値を返す", () => {
      expect(
        rutil.unwrapOr(10)(
          r.fail(new Error("hoge")) as r.Result<number, Error>,
        ),
      ).toStrictEqual(10)
    })
  })

  describe("unwrapOrElse関数のテスト", () => {
    test("unwrapOrElse関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型のvalueを返す", () => {
      expect(rutil.map((v: number) => v + 1)(r.succeed(1))).toStrictEqual(
        r.succeed(2),
      )
    })

    test("unwrapOrElse関数はFailure型の値を受け取った時、関数を実行して代替の値を返す", () => {
      expect(
        rutil.unwrapOrElse((v: Error) => v.message.length)(
          r.fail(new Error("hoge")) as r.Result<number, Error>,
        ),
      ).toStrictEqual(4)
    })
  })
  describe("map関数のテスト", () => {
    const f = rutil.map((v: number) => v + 1)

    test("map関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型を返す", () => {
      expect(f(r.succeed(1))).toStrictEqual(r.succeed(2))
    })

    test("map関数はFailure型の値を受け取った時、そのままFailure型を返す", () => {
      expect(f(r.fail(new Error("error")))).toStrictEqual(
        r.fail(new Error("error")),
      )
    })
  })

  describe("mapError関数のテスト", () => {
    const f = rutil.mapError((v: Error) => new Error(`${v.message}fuga`))

    test("mapError関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(f(r.succeed(1))).toStrictEqual(r.succeed(1))
    })

    test("mapError関数はFailure型の値を受け取った時、関数を実行してFailure型を返す", () => {
      expect(f(r.fail(new Error("hoge")))).toStrictEqual(
        r.fail(new Error("hogefuga")),
      )
    })
  })

  describe("flatMap関数のテスト", () => {
    const f = rutil.flatMap((v: number) => {
      switch (v) {
        case 1:
          return r.succeed(v + 1)
        default:
          return r.fail(new Error("error"))
      }
    })

    test("flatMap関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型を返す", () => {
      expect(f(r.succeed(1))).toStrictEqual(r.succeed(2))
    })

    test("flatMap関数はSuccess型の値を受け取った時、引数の関数を実行してFailure型を返す", () => {
      expect(f(r.succeed(2))).toStrictEqual(r.fail(new Error("error")))
    })

    test("flatMap関数はFailure型の値を受け取った時、そのままFailure型を返す", () => {
      expect(f(r.fail(new Error("error")))).toStrictEqual(
        r.fail(new Error("error")),
      )
    })
  })

  describe("flatMapError関数のテスト", () => {
    const f = rutil.flatMapError((v: Error) => {
      switch (v.message) {
        case "hoge":
          return r.succeed("hogefuga")
        default:
          return r.fail(new Error("fuga"))
      }
    })

    test("flatMapError関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(f(r.succeed(1))).toStrictEqual(r.succeed(1))
    })

    test("flatMapError関数はFailure型の値を受け取った時、引数の関数を実行してSuccess型を返す", () => {
      expect(f(r.fail(new Error("hoge")))).toStrictEqual(r.succeed("hogefuga"))
    })

    test("flatMapError関数はFailure型の値を受け取った時、引数の関数を実行してFailure型を返す", () => {
      expect(f(r.fail(new Error("piyo")))).toStrictEqual(
        r.fail(new Error("fuga")),
      )
    })
  })

  describe("tryCatch関数のテスト", () => {
    test("tryCatch関数は例外が投げられなければ、Success型を返す", () => {
      expect(rutil.tryCatch((x: number) => x + 1)(1)).toStrictEqual(
        r.succeed(2),
      )
    })

    test("tryCatch関数は例外が投げられた時、Failure型を返す", () => {
      expect(
        rutil.tryCatch((_: number) => {
          throw new Error("error")
        })(1),
      ).toStrictEqual(r.fail(new Error("error")))
    })
  })

  describe("tryCatchAsync関数のテスト", () => {
    test("tryCatchAsync関数は非同期関数で例外が投げられなければ、PromiseLike<Success>型を返す", async () => {
      expect(
        // deno-lint-ignore require-await
        await rutil.tryCatchAsync(async (x: number) => x + 1)(1),
      ).toStrictEqual(r.succeed(2))
    })

    test("tryCatchAsync関数は非同期関数で例外が投げられると、PromiseLike<Failure>型を返す", async () => {
      expect(
        // deno-lint-ignore require-await
        await rutil.tryCatchAsync(async (_: number) => {
          throw new Error("error")
        })(1),
      ).toStrictEqual(r.fail(new Error("error")))
    })
  })
})
