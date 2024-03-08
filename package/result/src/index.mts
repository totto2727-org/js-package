import { InternalResult, failInternal } from "./internal.mts"
import { Failure, Success } from "./share.mts"

export * from "./share.mts"

export type Result<T, U extends Error> = InternalResult<T, U>

export type AnyhowResult<T> = InternalResult<T, Error>

export type SerializableResult<
  T,
  U extends Record<string, unknown>,
> = InternalResult<T, U>

export type ExtractSuccess<T> = T extends Success<infer U> ? U : never
export type ExtractFailure<T> = T extends Failure<infer U> ? U : never

export function succeed<const T>(value: T): Success<T> {
  return { type: "success", value }
}
export function fail<const T extends Error>(
  cause: T,
  option?: { logWhenNotErrorInstance: boolean },
): Failure<T | Error> {
  // tryCatchなどでErrorではない値が渡された場合は、Errorに変換してfailする
  if (!(cause instanceof Error)) {
    try {
      return failInternal(new Error(JSON.stringify(cause)))
    } catch (e) {
      if (e instanceof Error) {
        return failInternal(
          new Error(`cause must be an instance of Error: ${e.message}`),
        )
      }

      option?.logWhenNotErrorInstance && console.error(e)
      return failInternal(new Error("cause must be an instance of Error"))
    }
  }

  return failInternal(cause)
}

export function isSuccess(
  result: InternalResult<unknown, unknown>,
): result is Success<unknown> {
  return result.type === "success"
}
export function isFailure(
  result: InternalResult<unknown, unknown>,
): result is Failure<unknown> {
  return result.type === "failure"
}

export function unwrap<T, U extends Error>(result: Result<T, U>): T {
  if (isFailure(result)) throw result.cause
  return result.value
}
