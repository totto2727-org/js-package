export type RlcOption = Partial<{
  shortenUrl: boolean
  timeout: number
  error: boolean
}>

export const DEFAULT_RLC_OPTION: Required<RlcOption> = {
  shortenUrl: false,
  timeout: 10000,
  error: true,
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
