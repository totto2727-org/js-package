import { createLinkCard } from "./createLinkCard.ts"
import { assertEquals, describe, it } from "@/test/index.ts"

describe("remark-link-card/internal/createLinkCard()", () => {
  it("full props", () => {
    const result = createLinkCard({
      url: "https://example.com",
      title: "Example",
      displayUrl: "example.com",
      faviconSrc: "https://example.com/favicon.ico",
      description: "This is an example",
      ogImageSrc: "https://example.com/og-image.jpg",
      ogImageAlt: "Example",
    })

    assertEquals(
      result.trim(),
      `
<a class="rlc-container" href="https://example.com">
  <div class="rlc-info">
    <div class="rlc-title">Example</div>
    <div class="rlc-description">This is an example</div>
    <div class="rlc-url-container">
      <img class="rlc-favicon" src="https://example.com/favicon.ico" alt="Example favicon" width="16" height="16">
      <span class="rlc-url">example.com</span>
    </div>
  </div>
  <div class="rlc-image-container"><img class="rlc-image" src="https://example.com/og-image.jpg" alt="Example" /></div>
</a>`.trim(),
    )
  })
})
