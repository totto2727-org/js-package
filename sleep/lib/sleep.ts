export type Sleep = {
  status: {
    isResolved: boolean
    isRejected: boolean
  }
  promise: Promise<unknown>
  forceResolve: () => void
}

export function sleep(milisecond: number): Sleep {
  const status = { isResolved: false, isRejected: false }

  const { promise, resolve } = Promise.withResolvers()

  promise
    .then(() => {
      status.isResolved = true
    })
    .catch(() => {
      status.isRejected = true
    })

  const timeoutId = setTimeout(() => resolve(null), milisecond)

  return {
    status,
    promise,
    forceResolve: () => {
      clearTimeout(timeoutId)
      resolve(null)
    },
  }
}
