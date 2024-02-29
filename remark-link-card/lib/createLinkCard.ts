import { LinkCardProps } from "./type.ts"

export function createLinkCard(data: LinkCardProps): string {
  // create favicon element
  const faviconElement = data.faviconSrc
    ? `<img class="rlc-favicon" src="${data.faviconSrc}" alt="${data.title} favicon" width="16" height="16">`
      .trim()
    : ""

  // create description element
  const descriptionElement = data.description
    ? `<div class="rlc-description">${data.description}</div>`
    : ""

  // create image element
  const imageElement = data.ogImageSrc
    ? `<div class="rlc-image-container"><img class="rlc-image" src="${data.ogImageSrc}" alt="${
      data.ogImageAlt ?? ""
    }" /></div>`.trim()
    : ""

  // create output HTML
  const outputHTML = `
<a class="rlc-container" href="${data.url}">
  <div class="rlc-info">
    <div class="rlc-title">${data.title}</div>
    ${descriptionElement}
    <div class="rlc-url-container">
      ${faviconElement}
      <span class="rlc-url">${data.displayUrl}</span>
    </div>
  </div>
  ${imageElement}
</a>`.trim().replace(/\n *\n+/g, "\n")

  return outputHTML
}
