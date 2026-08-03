import { ImageResponse } from "next/og"

import { getRentoLogoDataUri } from "@/lib/rentoBrandAssets.server"

export const size = {
  width: 64,
  height: 64,
}

export const contentType = "image/png"

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <img
          src={logoSrc}
          alt="Rento"
          width={56}
          height={56}
          style={{ objectFit: "contain" }}
        />
      </div>
    ),
    size
  )
}
