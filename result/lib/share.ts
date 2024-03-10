export type Success<T> = {
  type: "success"
  value: T
}

export type Failure<T> = {
  type: "failure"
  cause: T
}
