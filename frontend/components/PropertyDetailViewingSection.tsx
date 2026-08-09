"use client"

import PropertyDetailStickyActions from "@/components/PropertyDetailStickyActions"
import RequestViewingSection from "@/components/RequestViewingSection"

type Props = {
  propertyId: number
  canRequest: boolean
  canRequestViewing: boolean
  showContact: boolean
}

export default function PropertyDetailViewingSection({
  propertyId,
  canRequest,
  canRequestViewing,
  showContact,
}: Props) {
  return (
    <RequestViewingSection
      propertyId={propertyId}
      canRequest={canRequest}
      renderStickyActions={({ openRequest, canOpenRequest }) => (
        <PropertyDetailStickyActions
          canRequestViewing={canRequestViewing}
          showContact={showContact}
          canOpenRequestViewing={canOpenRequest}
          onRequestViewing={openRequest}
        />
      )}
    />
  )
}
