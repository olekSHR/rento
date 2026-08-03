import "server-only"

import { readFileSync } from "node:fs"
import { join } from "node:path"

import type { RentoLogoVariant } from "@/lib/rentoBrandAssets"

function getBrandAssetPath(variant: RentoLogoVariant): string {
  const filename =
    variant === "symbol" ? "rento-logo-symbol.svg" : "rento-logo.svg"

  return join(process.cwd(), "public", "brand", filename)
}

export function getRentoLogoDataUri(variant: RentoLogoVariant = "full"): string {
  const svg = readFileSync(getBrandAssetPath(variant))

  return `data:image/svg+xml;base64,${svg.toString("base64")}`
}
