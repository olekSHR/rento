export const RENTO_LOGO_PATH = "/brand/rento-logo.svg"
export const RENTO_LOGO_SYMBOL_PATH = "/brand/rento-logo-symbol.svg"

export type RentoLogoVariant = "full" | "symbol"

export function getRentoLogoSrc(variant: RentoLogoVariant = "full"): string {
  return variant === "symbol" ? RENTO_LOGO_SYMBOL_PATH : RENTO_LOGO_PATH
}
