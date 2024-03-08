import { Result, fail, isFailure, succeed } from "@totto2727/result"
import * as rutil from "@totto2727/result/eager"
import ogs from "open-graph-scraper"
import { OgObject } from "open-graph-scraper/dist/lib/types"
import { error } from "./error.mts"
import { RlcOption } from "./type.mts"

export async function fetchOpenGraph(
  option: Required<RlcOption>,
  targetUrl: URL,
): Promise<Result<OgObject, Error>> {
  const data = await rutil.tryCatchAsync(() =>
    ogs({
      url: targetUrl.toString(),
      fetchOptions: {
        signal: AbortSignal.timeout(option.timeout),
      },
    }),
  )

  if (isFailure(data)) {
    return fail(data.cause)
  }
  if (data.value.error) {
    const errorObject =
      data.value.result.errorDetails ??
      new Error(JSON.stringify(data.value.result))

    return fail(errorObject)
  }

  return succeed(data.value.result)
}
