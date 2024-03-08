export type RlcOption = Partial<{
  shortenUrl: boolean
  timeout: number
}>

export const DEFAULT_RLC_OPTION: Required<RlcOption> = {
  shortenUrl: false,
  timeout: 10000,
}

export type LinkCardProps = {
  url: string
  title: string
  faviconSrc: string | null
  displayUrl: string
  description?: string
  ogImageSrc?: string
  ogImageAlt?: string
}
