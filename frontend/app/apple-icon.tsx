import { ImageResponse } from "next/og"

import { getRentoLogoDataUri } from "@/lib/rentoBrandAssets.server"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  const logoSrc = getRentoLogoDataUri("symbol")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#DFC58A",
          borderRadius: 40,
        }}
      >
        <img
          src={logoSrc}
          alt="Rento"
          width={156}
          height={156}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size
  )
}
