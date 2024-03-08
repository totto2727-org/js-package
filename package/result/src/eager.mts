import {
  Result,
  SerializableResult,
  fail,
  isFailure,
  isSuccess,
  succeed,
} from "./index.mts"
import { InternalResult, failInternal } from "./internal.mts"

export function serialize<
  T,
  U extends Error,
  V extends Record<string, unknown>,
>(
  result: Result<T, U>,
  serializeFn: (error: U) => V,
): SerializableResult<T, V> {
  if (isSuccess(result)) return result
  return failInternal(serializeFn(result.cause))
}

export function unwrapOr<T, U, V>(
  result: InternalResult<T, U>,
  fallbackValue: V,
): T | V {
  if (isFailure(result)) return fallbackValue
  return result.value
}

export function unwrapOrElse<T, U, V>(
  result: InternalResult<T, U>,
  fallbackFn: (error: U) => V,
): T | V {
  if (isFailure(result)) return fallbackFn(result.cause)
  return result.value
}

export function map<T, U extends Error, V>(
  result: Result<T, U>,
  f: (v: T) => V,
): Result<V, U> {
  if (isFailure(result)) return result
  return succeed(f(result.value))
}

export function mapError<T, U extends Error, V extends Error>(
  result: Result<T, U>,
  f: (v: U) => V,
): Result<T, V | Error> {
  if (isSuccess(result)) return result
  return fail(f(result.cause))
}

export function flatMap<T, U extends Error, V, W extends Error>(
  result: Result<T, U>,
  f: (x: T) => Result<V, W>,
): Result<V, U | W> {
  if (isFailure(result)) return result
  return f(result.value)
}

export function flatMapError<T, U extends Error, V, W extends Error>(
  result: Result<T, U>,
  f: (x: U) => Result<V, W>,
): Result<T | V, W> {
  if (isSuccess(result)) return result
  return f(result.cause)
}

export function tryCatch<T, U extends Error>(
  throwableFunction: () => T,
): Result<T, U | Error> {
  try {
    return succeed(throwableFunction())
  } catch (e) {
    return fail(e as U)
  }
}

export function tryCatchAsync<T, U extends Error>(
  throwableFunction: () => PromiseLike<T>,
): PromiseLike<Result<T, U>> {
  return throwableFunction().then((v) => succeed(v), fail)
}
