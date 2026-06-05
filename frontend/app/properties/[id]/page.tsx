import { notFound } from "next/navigation"

import FavoriteButton from "@/components/FavoriteButton"

import {
  getPropertyById,
  getPropertyImages,
} from "@/services/api"
import type { Property } from "@/types/property"
import BackButton from "@/components/BackButton"
import PropertyGallery from "@/components/PropertyGallery"
type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function PropertyPage({ params }: Props) {
  const { id } = await params

  const propertyId = Number(id)

  if (!Number.isFinite(propertyId)) {
    notFound()
  }

  let property: Property

  try {
    const data = await getPropertyById(propertyId)
    const images = await getPropertyImages(propertyId)

    property = {
      ...data,
      images,
    }
  } catch {
    notFound()
  }

  const galleryImages =
    property.images && property.images.length > 0
      ? property.images
      : property.image_url
        ? [
            {
              id: 0,
              url: property.image_url,
              is_cover: true,
              sort_order: 0,
            },
          ]
        : []

  return (
    <main className="min-h-screen bg-zinc-100 pb-24">
      <div className="mx-auto min-h-screen max-w-md bg-white">
        <div className="relative">
  <BackButton />
  <FavoriteButton propertyId={property.id} />

  <PropertyGallery
    title={property.title}
    images={galleryImages}
  />
</div>

        <div className="p-4">
          <h1 className="text-3xl font-bold text-black">
            {property.title}
          </h1>

          <p className="mt-2 text-zinc-500">
            {property.city || "Unknown city"}
          </p>

          <div className="mt-4">
            <span className="text-2xl font-bold text-black">
              ${property.price || 0}
            </span>
          </div>

          <div className="mt-4 text-zinc-600">
            {property.rooms || 0} rooms
          </div>

          <p className="mt-6 leading-7 text-zinc-700">
            {property.description || "No description available."}
          </p>
        </div>
      </div>
    </main>
  )
}