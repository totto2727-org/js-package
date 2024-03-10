export { default as urlRegexGenerator } from "npm:url-regex-safe@4.0.0"
export { default as he } from "npm:he@1.2.0"
export {
  hasAtLeast,
  isDefined,
  isNonNull,
  isString,
  merge,
} from "npm:remeda@1.47.0"

export type { Plugin } from "npm:unified@11.0.4"
export type { Parent } from "npm:@types/mdast@4.0.3"
export { visit } from "npm:unist-util-visit@5.0.0"

export type { SuccessResult } from "npm:open-graph-scraper@6.5.0"
export type { ImageObject } from "npm:open-graph-scraper@6.5.0/dist/lib/types"

import ogs_ from "npm:open-graph-scraper@6.5.0"
export const ogs = ogs_ as unknown as typeof ogs_.default
