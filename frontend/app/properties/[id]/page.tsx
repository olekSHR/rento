import { notFound } from "next/navigation"

import FavoriteButton from "@/components/FavoriteButton"
import BackButton from "@/components/BackButton"
import PropertyGallery from "@/components/PropertyGallery"
import ShareButton from "@/components/ShareButton"
import ReportButton from "@/components/ReportButton"
import {
  getPropertyById,
  getPropertyImages,
} from "@/services/api"

import type { Property } from "@/types/property"


type Props = {
  params: Promise<{
    id: string
  }>
}

function getVerificationLabel(lastVerifiedAt?: string | null) {
  if (!lastVerifiedAt) {
    return "Needs Verification"
  }

  const verifiedDate = new Date(lastVerifiedAt)
  const now = new Date()

  const diffMs = now.getTime() - verifiedDate.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) {
    return "Verified Today"
  }

  if (diffDays === 1) {
    return "Verified Yesterday"
  }

  if (diffDays >= 2 && diffDays <= 7) {
    return `Verified ${diffDays} days ago`
  }

  return "Needs Verification"
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

  const verificationLabel = getVerificationLabel(property.last_verified_at)

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
<div className="absolute right-4 top-4 z-20 flex items-center gap-2">
  <ShareButton title={property.title} />
  <FavoriteButton propertyId={property.id} />
</div>
          

          <PropertyGallery
            title={property.title}
            images={galleryImages}
          />
        </div>

        <div className="p-4">
          <div className="mb-3 inline-flex rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {verificationLabel}
          </div>

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

          {(property.phone || property.whatsapp) && (
            <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-sm font-semibold text-zinc-500">
                Contact
              </p>

              {property.contact_name && (
                <p className="mt-1 text-lg font-bold text-black">
                  {property.contact_name}
                </p>
              )}

              <div className="mt-4 space-y-3">
                {property.phone && (
                  <a
                    href={`tel:${property.phone}`}
                    className="block w-full rounded-2xl bg-black p-4 text-center font-semibold text-white active:scale-[0.98]"
                  >
                    Call
                  </a>
                )}

                {property.whatsapp && (
                  <a
                    href={`https://wa.me/${property.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-2xl border border-zinc-300 bg-white p-4 text-center font-semibold text-black active:scale-[0.98]"
                  >
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          )}
        
         <ReportButton propertyId={property.id} />
       </div>
      </div>
    </main>
  )
}
