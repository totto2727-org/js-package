import {
  fail,
  isFailure,
  isSuccess,
  Result,
  SerializableResult,
  succeed,
} from "./result.ts"
import { failInternal, InternalResult } from "./internal.ts"

export function serialize<
  T,
  U extends Error,
  V extends Record<string, unknown>,
>(
  serializeFn: (error: U) => V,
): (result: Result<T, U>) => SerializableResult<T, V> {
  return (result) => {
    if (isSuccess(result)) return result
    return failInternal(serializeFn(result.cause))
  }
}

export function unwrapOr<T, U, V>(
  fallbackValue: V,
): (result: InternalResult<T, U>) => T | V {
  return (result: InternalResult<T, U>) => {
    if (isFailure(result)) return fallbackValue
    return result.value
  }
}

export function unwrapOrElse<T, U, V>(
  fallbackFn: (error: U) => V,
): (result: InternalResult<T, U>) => T | V {
  return (result: InternalResult<T, U>) => {
    if (isFailure(result)) return fallbackFn(result.cause)
    return result.value
  }
}

export function map<T, U extends Error, V>(
  f: (v: T) => V,
): (result: Result<T, U>) => Result<V, U> {
  return (r) => {
    if (isFailure(r)) return r
    return succeed(f(r.value))
  }
}

export function mapError<T, U extends Error, V extends Error>(
  f: (v: U) => V,
): (result: Result<T, U>) => Result<T, V | Error> {
  return (r) => {
    if (isSuccess(r)) return r
    return fail(f(r.cause))
  }
}

export function flatMap<T, U extends Error, V, W extends Error>(
  f: (x: T) => Result<V, W>,
): (result: Result<T, U>) => Result<V, U | W> {
  return (result) => {
    if (isFailure(result)) return result
    return f(result.value)
  }
}

export function flatMapError<T, U extends Error, V, W extends Error>(
  f: (x: U) => Result<V, W>,
): (result: Result<T, U>) => Result<T | V, W> {
  return (result) => {
    if (isSuccess(result)) return result
    return f(result.cause)
  }
}

export function tryCatch<const T extends unknown[], U, V extends Error>(
  throwableFunction: (...x: T) => U,
): (...x: T) => Result<U, V | Error> {
  return (...x: T) => {
    try {
      return succeed(throwableFunction(...x))
    } catch (e) {
      return fail(e as V)
    }
  }
}

export function tryCatchAsync<const T extends unknown[], U, V extends Error>(
  throwableFunction: (...x: T) => PromiseLike<U>,
): (...x: T) => PromiseLike<Result<U, V>> {
  return (...x: T) =>
    throwableFunction(...x).then(
      (v) => succeed(v),
      (e) => fail(e),
    )
}
