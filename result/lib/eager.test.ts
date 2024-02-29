import * as rutil from "./eager.ts"
import * as r from "./result.ts"
import { failInternal } from "./internal.ts"
import { describe, expect, test } from "@/test/index.ts"

describe("result/eager", () => {
  describe("serialize関数のテスト", () => {
    test("serialize関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(
        rutil.serialize(r.succeed(1), (_) => ({
          value: 2,
        })),
      ).toStrictEqual(r.succeed(1))
    })

    test("serialize関数はFailure型の値を受け取った時、関数を実行してFailure型を返す", () => {
      expect(
        rutil.serialize(
          r.fail(new Error("hoge")) as r.Result<number, Error>,
          (error) => ({
            message: error.message,
          }),
        ),
      ).toStrictEqual(failInternal({ message: "hoge" }))
    })
  })

  describe("unwrapOr関数のテスト", () => {
    test("unwrapOr関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型のvalueを返す", () => {
      expect(rutil.unwrapOr(r.succeed(1), 10)).toStrictEqual(1)
    })

    test("unwrapOr関数はFailure型の値を受け取った時、代替の値を返す", () => {
      expect(
        rutil.unwrapOr(
          r.fail(new Error("hoge")) as r.Result<number, Error>,
          10,
        ),
      ).toStrictEqual(10)
    })
  })

  describe("unwrapOrElse関数のテスト", () => {
    test("unwrapOrElse関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型のvalueを返す", () => {
      expect(rutil.map(r.succeed(1), (v) => v + 1)).toStrictEqual(r.succeed(2))
    })

    test("unwrapOrElse関数はFailure型の値を受け取った時、関数を実行して代替の値を返す", () => {
      expect(
        rutil.unwrapOrElse(
          r.fail(new Error("hoge")) as r.Result<number, Error>,
          (v) => v.message.length,
        ),
      ).toStrictEqual(4)
    })
  })

  describe("mapError関数のテスト", () => {
    test("mapError関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(
        rutil.mapError(
          r.succeed(1) as r.Result<number, Error>,
          () => new Error("hoge"),
        ),
      ).toStrictEqual(r.succeed(1))
    })

    test("mapError関数はFailure型の値を受け取った時、関数を実行してFailure型を返す", () => {
      expect(
        rutil.mapError(
          r.fail(new Error("hoge")),
          (v) => new Error(`${v.message}fuga`),
        ),
      ).toStrictEqual(r.fail(new Error("hogefuga")))
    })
  })

  describe("flatMap関数のテスト", () => {
    test("flatMap関数はSuccess型の値を受け取った時、引数の関数を実行してSuccess型を返す", () => {
      expect(
        rutil.flatMap(r.succeed(1), (v) => {
          switch (v) {
            case 1:
              return r.succeed(v + 1)
            default:
              return r.fail(new Error("hoge"))
          }
        }),
      ).toStrictEqual(r.succeed(2))
    })

    test("flatMap関数はSuccess型の値を受け取った時、引数の関数を実行してFailure型を返す", () => {
      expect(
        rutil.flatMap(r.succeed(2 as number), (v) => {
          switch (v) {
            case 2:
              return r.succeed(v + 1)
            default:
              return r.fail(new Error("hoge"))
          }
        }),
      ).toStrictEqual(r.succeed(3))
    })

    test("flatMap関数はFailure型の値を受け取った時、そのままFailure型を返す", () => {
      expect(
        rutil.flatMap(r.fail(new Error("hoge")), (v: number) => {
          switch (v) {
            case 1:
              return r.succeed(v + 1)
            default:
              return r.fail(new Error("fuga"))
          }
        }),
      ).toStrictEqual(r.fail(new Error("hoge")))
    })
  })

  describe("flatMapError関数のテスト", () => {
    test("flatMapError関数はSuccess型の値を受け取った時、そのままSuccess型を返す", () => {
      expect(
        rutil.flatMapError(r.succeed(1), (v: Error) => {
          switch (v.message) {
            case "fuga":
              return r.succeed("fuga")
            default:
              return r.fail(new Error("hoge"))
          }
        }),
      ).toStrictEqual(r.succeed(1))
    })

    test("flatMapError関数はFailure型の値を受け取った時、引数の関数を実行してSuccess型を返す", () => {
      expect(
        rutil.flatMapError(r.fail(new Error("hoge")), (v: Error) => {
          switch (v.message) {
            case "hoge":
              return r.succeed("fuga")
            default:
              return r.fail(new Error("piyo"))
          }
        }),
      ).toStrictEqual(r.succeed("fuga"))
    })

    test("flatMapError関数はFailure型の値を受け取った時、引数の関数を実行してFailure型を返す", () => {
      expect(
        rutil.flatMapError(r.fail(new Error("hoge")), (v: Error) => {
          switch (v.message) {
            case "fuga":
              return r.succeed("fuga")
            default:
              return r.fail(new Error("piyo"))
          }
        }),
      ).toStrictEqual(r.fail(new Error("piyo")))
    })
  })

  describe("tryCatch関数のテスト", () => {
    test("tryCatch関数は例外が投げられなければ、Success型を返す", () => {
      expect(rutil.tryCatch(() => 1 + 1)).toStrictEqual(r.succeed(2))
    })

    test("tryCatch関数は例外が投げられた時、Failure型を返す", () => {
      expect(
        rutil.tryCatch(() => {
          throw new Error("error")
        }),
      ).toStrictEqual(r.fail(new Error("error")))
    })
  })

  describe("tryCatchAsync関数のテスト", () => {
    test("tryCatchAsync関数は非同期関数で例外が投げられなければ、PromiseLike<Success>型を返す", async () => {
      expect(
        await rutil.tryCatchAsync(async () => await Promise.resolve(1 + 1)),
      ).toStrictEqual(
        r.succeed(2),
      )
    })

    test("tryCatchAsync関数は非同期関数で例外が投げられると、PromiseLike<Failure>型を返す", async () => {
      expect(
        // deno-lint-ignore require-await
        await rutil.tryCatchAsync(async () => {
          throw new Error("error")
        }),
      ).toStrictEqual(r.fail(new Error("error")))
    })
  })
})
