import { describe, expect, it } from "@/test/index.ts"
import { sleep } from "./sleep.ts"

describe("sleep", () => {
  describe("sleep()", () => {
    it("should change state before and after completion", async (t) => {
      const sleep1 = sleep(10000)

      await t.step("unresolved", () => {
        expect(sleep1.status.isResolved).toBeFalsy()
      })

      sleep1.forceResolve()
      await sleep1.promise

      await t.step("resolved", () => {
        expect(sleep1.status.isResolved).toBeTruthy()
      })
    })
  })
})
