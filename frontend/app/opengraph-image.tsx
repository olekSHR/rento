import { ImageResponse } from "next/og"

import { getRentoLogoDataUri } from "@/lib/rentoBrandAssets.server"

export const alt = "Rento — Find your next home"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function OpenGraphImage() {
  const logoSrc = getRentoLogoDataUri("full")

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1B1B1B",
          color: "#F5F5F5",
          padding: "72px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            border: "2px solid rgba(223, 197, 138, 0.38)",
            borderRadius: "44px",
            background: "#252525",
            padding: "72px 84px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "92px",
                fontWeight: 700,
                letterSpacing: "-4px",
              }}
            >
              Rento
            </div>
            <div
              style={{
                display: "flex",
                marginTop: "22px",
                fontSize: "30px",
                color: "#B8B8B8",
                letterSpacing: "-0.5px",
              }}
            >
              Find your next home.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 220,
              height: 220,
              borderRadius: 32,
              background: "#DFC58A",
            }}
          >
            <img
              src={logoSrc}
              alt="Rento"
              width={200}
              height={200}
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>
    ),
    size
  )
}
