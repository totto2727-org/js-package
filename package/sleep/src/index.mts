export function sleep(milisecond: number) {
  const status = { isResolved: false, isRejected: false }

  const { promise, resolve } = Promise.withResolvers()

  promise
    .then(() => {
      status.isResolved = true
    })
    .catch(() => {
      status.isRejected = true
    })

  const timeoutId = setTimeout(() => resolve(), milisecond)

  return {
    status,
    promise,
    forceResolve: () => {
      clearTimeout(timeoutId)
      resolve()
    },
  }
}
