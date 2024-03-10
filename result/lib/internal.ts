import { Failure, Success } from "./share.ts"

export type InternalResult<T, U> = Success<T> | Failure<U>

export function failInternal<const T>(cause: T): Failure<T> {
  return { type: "failure", cause }
}
