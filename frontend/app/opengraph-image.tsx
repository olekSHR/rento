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
          padding: "64px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "2px solid rgba(223, 197, 138, 0.38)",
            borderRadius: "44px",
            background: "#252525",
            padding: "56px 72px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 296,
              height: 296,
              borderRadius: 36,
              background: "#DFC58A",
              flexShrink: 0,
            }}
          >
            <img
              src={logoSrc}
              alt="Rento"
              width={272}
              height={272}
              style={{ objectFit: "contain" }}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 72,
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "108px",
                fontWeight: 700,
                letterSpacing: "-5px",
                lineHeight: 1,
                color: "#F5F5F5",
              }}
            >
              Rento
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 34,
                fontWeight: 500,
                color: "#B8B8B8",
                letterSpacing: "-0.5px",
                lineHeight: 1.25,
              }}
            >
              Find your next home with Rento.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                fontSize: 28,
                fontWeight: 500,
                color: "#DFC58A",
                letterSpacing: "0.01em",
                lineHeight: 1.2,
              }}
            >
              rentonow.ro
            </div>
          </div>
        </div>
      </div>
    ),
    size
  )
}
