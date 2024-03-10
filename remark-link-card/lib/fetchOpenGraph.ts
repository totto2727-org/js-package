import { fail, isFailure, Result, succeed } from "@/result/index.ts"
import * as rutil from "@/result/eager.ts"
import { RlcOption } from "./type.ts"
import { ogs, SuccessResult } from "./deps.ts"

export async function fetchOpenGraph(
  option: Required<RlcOption>,
  targetUrl: URL,
): Promise<Result<SuccessResult["result"], Error>> {
  const signal = AbortSignal.timeout(option.timeout)

  const data = await rutil.tryCatchAsync(() =>
    ogs({
      url: targetUrl.toString(),

      fetchOptions: {
        // @ts-ignore @types/node
        signal,
      },
    })
  )

  if (isFailure(data)) {
    return fail(data.cause)
  }

  if (data.value.error) {
    const errorObject = data.value.result.errorDetails ??
      new Error(JSON.stringify(data.value.result))

    return fail(errorObject)
  }

  return succeed(data.value.result)
}
