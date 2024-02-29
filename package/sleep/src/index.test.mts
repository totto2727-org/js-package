import { describe, expect, test } from "bun:test"
import { sleep } from "./index.mts"

describe("sleep function", () => {
  test("sleep.promise and sleep.forceResolve", (done) => {
    const sleep1 = sleep(10000)

    return (async () => {
      expect(sleep1.status.isResolved).toBeFalse()

      sleep1.forceResolve()
      await sleep1.promise

      expect(sleep1.status.isResolved).toBeTrue()

      done()
    })()
  })
})
