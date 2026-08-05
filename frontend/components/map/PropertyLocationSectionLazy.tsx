"use client"

import dynamic from "next/dynamic"

export const PropertyLocationSection = dynamic(
  () =>
    import("@/components/map/PropertyLocationSection").then(
      (module) => module.PropertyLocationSection
    ),
  {
    ssr: false,
    loading: () => (
      <section aria-labelledby="property-location-heading" className="mt-8">
        <h2
          id="property-location-heading"
          className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
        >
          Location
        </h2>
        <div
          className="mt-4 h-56 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none sm:h-64 md:h-72"
          role="status"
          aria-live="polite"
        >
          <span className="sr-only">Loading location map</span>
        </div>
      </section>
    ),
  }
)
