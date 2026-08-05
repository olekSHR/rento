"use client"

import dynamic from "next/dynamic"

const NearbyInfrastructureSection = dynamic(
  () => import("@/components/nearby/NearbyInfrastructureSection"),
  {
    ssr: false,
    loading: () => null,
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
