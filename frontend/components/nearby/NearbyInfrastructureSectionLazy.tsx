"use client"

import dynamic from "next/dynamic"

const shellClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const pulseClassName =
  "animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none"

function NearbyInfrastructureLoadingPlaceholder() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading nearby area information</span>

      <section className="mt-8" aria-hidden="true">
        <div className={`h-6 w-40 ${pulseClassName}`} />

        <div className={`${shellClassName} mt-4 space-y-2.5`}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className={`h-5 ${pulseClassName}`} />
          ))}
        </div>
      </section>

      <section className="mt-6" aria-hidden="true">
        <div className={`h-6 w-24 ${pulseClassName}`} />

        <div className={`${shellClassName} mt-4 space-y-3`}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className={`h-10 rounded-xl ${pulseClassName}`} />
          ))}
        </div>
      </section>
    </div>
  )
}

const NearbyInfrastructureSection = dynamic(
  () => import("@/components/nearby/NearbyInfrastructureSection"),
  {
    ssr: false,
    loading: NearbyInfrastructureLoadingPlaceholder,
  }
)

type NearbyInfrastructureSectionLazyProps = {
  propertyId: number
  hasCoordinates: boolean
}

export function NearbyInfrastructureSectionLazy({
  propertyId,
  hasCoordinates,
}: NearbyInfrastructureSectionLazyProps) {
  if (!hasCoordinates) {
    return null
  }

  return (
    <NearbyInfrastructureSection propertyId={propertyId} />
  )
}
