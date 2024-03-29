import fs from "node:fs/promises"
import { debug } from "./debug.ts"
import { rlc } from "./rlc.ts"
import { remark, remarkEmbdder, remarkHtml } from "./deps-test.ts"
import { RlcOption } from "@/remark-link-card/index.ts"
import { HttpErrorNotFound } from "@/error/http/index.ts"
import {
  abortSignalStub,
  describe,
  expect,
  fetchStub,
  test,
} from "@/test/index.ts"

const option: Partial<RlcOption> = {
  error: false,
}

const inlineLinksSample = `
[example](http://example.com/) is inline link

[remark-link-card](https://www.npmjs.com/package/remark-link-card) is inline link
`.trim()

const multipleLinksSample = `
http://example.com/ http://example.com/ http://example.com/
`.trim()

abortSignalStub()
fetchStub(new HttpErrorNotFound().toResponse())

describe("remark-link-card", () => {
  // Bare links are converted link cards.
  test("convert bare links to link cards", async () => {
    const doc = await fs.readFile(`${import.meta.dirname}/fixture.md`, "utf8")
    const result = await remark().use(rlc, option).process(doc)
    debug("result", result.toString())

    expect(result.toString()).toContain("</a>")
  })

  // Inline links are not converted to link cards.
  test("Inline links are not converted to link cards.", async () => {
    const result = await remark().use(rlc, option).process(inlineLinksSample)
    expect(result.toString().trim()).toEqual(inlineLinksSample)
  })

  // Multiple links in one line are not converted to link cards
  test("Multiple links in one line are not converted to link cards", async () => {
    const result = await remark().use(rlc, option).process(multipleLinksSample)
    expect(result.toString().trim()).toEqual(multipleLinksSample)
  })

  // Decode Url
  // Succeeds though fetch error is reported
  const encodedUrl =
    "https://example.com/%E3%83%86%E3%82%B9%E3%83%88/foo%E3%83%90%E3%83%BC/#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB"
  const decodedUrl = "https://example.com/テスト/fooバー/#はじめに"

  test("Decode Url", async () => {
    const result = await remark().use(rlc, option).process(encodedUrl)
    debug("result", result.toString())

    expect(result.toString().trim()).toContain(decodedUrl)
  })

  // Shorten URL
  test("Shorten URL", async () => {
    const result = await remark()
      .use(rlc, { ...option, shortenUrl: true })
      .process("https://www.npmjs.com/package/remark-link-card")

    expect(result.toString().trim()).toContain(
      '<a class="rlc-container" href="https://www.npmjs.com/package/remark-link-card">',
    )
    expect(result.toString().trim()).toContain(
      '<span class="rlc-url">www.npmjs.com</span>',
    )
  })

  // With remark-embedder
  // If remark-embedder conversion data exists, remark-link-card does nothing.
  const CodeSandboxTransformer = {
    name: "CodeSandbox",
    // shouldTransform can also be async
    shouldTransform(url: string) {
      const { host, pathname } = new URL(url)
      return (
        ["codesandbox.io", "www.codesandbox.io"].includes(host) &&
        pathname.includes("/s/")
      )
    },
    // getHTML can also be async
    getHTML(url: string) {
      const iframeUrl = url.replace("/s/", "/embed/")

      return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`
    },
  }

  const exampleMarkdown = `
This is a CodeSandbox:

https://codesandbox.io/s/css-variables-vs-themeprovider-df90h
`.trim()

  const expectedResult = `
<p>This is a CodeSandbox:</p>
<iframe src="https://codesandbox.io/embed/css-variables-vs-themeprovider-df90h" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
    `.trim()

  test("Use remark-link-card with remark-embedder", async () => {
    const result = await remark()
      // @ts-expect-error remark-embedder is typed by unified@10
      .use(remarkEmbdder, {
        transformers: [CodeSandboxTransformer],
      })
      .use(rlc, option)
      .use(remarkHtml, { sanitize: false })
      .process(exampleMarkdown)

    expect(result.toString().trim()).toEqual(expectedResult)
  })
})
