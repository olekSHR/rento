"use client"

import dynamic from "next/dynamic"

const PropertyLocationPicker = dynamic(
  () => import("@/components/map/PropertyLocationPicker"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-56 animate-pulse rounded-2xl border border-white/8 bg-[#252525] motion-reduce:animate-none md:h-64"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Loading location picker</span>
      </div>
    ),
  }
)

export default PropertyLocationPicker

export type { PropertyLocationValue } from "@/components/map/PropertyLocationPicker"
