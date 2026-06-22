"use client"

import PropertyGalleryManager from "@/components/gallery/PropertyGalleryManager"

type AdminGalleryManagerProps = {
  propertyId: number
}

export default function AdminGalleryManager({
  propertyId,
}: AdminGalleryManagerProps) {
  return <PropertyGalleryManager propertyId={propertyId} />
}
