import { ImageResponse } from "next/og"

import RentoGlyph from "@/components/RentoGlyph"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(<RentoGlyph size={180} title="Rento" />, size)
}
