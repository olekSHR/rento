import { notFound } from "next/navigation"
import Image from "next/image"
import {
  BadgeCheck,
  BedDouble,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react"

import ConsumerShell from "@/components/ConsumerShell"
import FavoriteButton from "@/components/FavoriteButton"
import BackButton from "@/components/BackButton"
import PropertyGallery from "@/components/PropertyGallery"
import ShareButton from "@/components/ShareButton"
import ReportButton from "@/components/ReportButton"
import { RealtorAvatarEnlargeTrigger } from "@/components/RealtorAvatarLightbox"
import { getImageUrl } from "@/lib/getImageUrl"
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

function getContactInitials(contactName?: string | null): string {
  const name = contactName?.trim()

  if (!name) {
    return "R"
  }

  const parts = name.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase()
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
  const isVerified = verificationLabel !== "Needs Verification"
  const realtorTrustSubtitle = isVerified
    ? "Verified Realtor"
    : verificationLabel
  const contactAvatarUrl = property.avatar_url
    ? getImageUrl(property.avatar_url)
    : null
  const realtorDisplayName =
    property.contact_name?.trim() || "Property contact"

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
    <ConsumerShell>
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

        <section className="relative -mt-6 rounded-t-[32px] bg-white px-4 pb-6 pt-5 shadow-[0_-18px_35px_rgba(15,23,42,0.08)]">
          <div
            className={`
              mb-4
              inline-flex
              items-center
              gap-1.5
              rounded-full
              px-3
              py-1.5
              text-xs
              font-semibold
              ${
                isVerified
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                  : "bg-amber-50 text-amber-700 ring-1 ring-amber-100"
              }
            `}
          >
            <BadgeCheck className="h-4 w-4" />
            {verificationLabel}
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
            {property.title}
          </h1>

          <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-zinc-500">
            <MapPin className="h-4 w-4" />
            <span>{property.city || "Unknown city"}</span>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-zinc-200 bg-zinc-50">
            <div className="p-4 pb-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Monthly rent
              </p>

              <div className="mt-2 flex items-end justify-between gap-4">
                <p className="text-4xl font-extrabold tracking-tight text-zinc-950">
                  €{property.price || 0}
                </p>

                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 text-sm font-semibold text-zinc-700 ring-1 ring-zinc-200">
                  <BedDouble className="h-4 w-4" />
                  <span>{property.rooms || 0} rooms</span>
                </div>
              </div>
            </div>

            <div className="mx-4 border-t border-zinc-200" />

            <div className="flex min-h-14 items-center gap-3 px-4 py-3">
              {contactAvatarUrl ? (
                <RealtorAvatarEnlargeTrigger
                  imageUrl={contactAvatarUrl}
                  alt={realtorDisplayName}
                  className="relative h-11 w-11 shrink-0 overflow-hidden rounded-2xl bg-blue-700 ring-1 ring-zinc-200 active:scale-95"
                >
                  <Image
                    src={contactAvatarUrl}
                    alt={realtorDisplayName}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="44px"
                  />
                </RealtorAvatarEnlargeTrigger>
              ) : (
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-blue-700 ring-1 ring-zinc-200">
                  <span className="text-sm font-bold text-white">
                    {getContactInitials(property.contact_name)}
                  </span>
                </div>
              )}

              <a
                href="#property-contact"
                className="flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 active:opacity-80"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-zinc-950">
                    {realtorDisplayName}
                  </p>
                  <p
                    className={`mt-0.5 truncate text-xs font-semibold ${
                      isVerified ? "text-emerald-700" : "text-amber-700"
                    }`}
                  >
                    {realtorTrustSubtitle}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-zinc-400" />
              </a>
            </div>

            <div className="mx-4 border-t border-zinc-200" />

            <div className="grid grid-cols-3 gap-2 p-4 pt-3">
              <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
                <p className="text-[11px] font-semibold uppercase text-zinc-400">
                  City
                </p>
                <p className="mt-1 truncate text-sm font-bold text-zinc-900">
                  {property.city || "Unknown"}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
                <p className="text-[11px] font-semibold uppercase text-zinc-400">
                  Rooms
                </p>
                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {property.rooms || 0}
                </p>
              </div>

              <div className="rounded-2xl bg-white p-3 ring-1 ring-zinc-200">
                <p className="text-[11px] font-semibold uppercase text-zinc-400">
                  Status
                </p>
                <p
                  className={`mt-1 truncate text-sm font-bold ${
                    isVerified ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {verificationLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-bold text-zinc-950">
              About this property
            </h2>

            <p className="mt-3 leading-7 text-zinc-700">
              {property.description || "No description available."}
            </p>
          </div>

          {(property.phone || property.whatsapp) && (
            <div
              id="property-contact"
              className="mt-7 scroll-mt-6 rounded-[28px] border border-zinc-200 bg-white p-4 shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Contact
              </p>

              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                Ask {realtorDisplayName} about availability, viewing time, and
                rental conditions.
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3">
                {property.whatsapp && (
                  <a
                    href={`https://wa.me/${property.whatsapp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 font-bold text-white shadow-[0_12px_28px_rgba(5,150,105,0.25)] active:scale-[0.98]"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                  </a>
                )}

                {property.phone && (
                  <a
                    href={`tel:${property.phone}`}
                    className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-4 font-bold text-zinc-950 active:scale-[0.98]"
                  >
                    <Phone className="h-5 w-5" />
                    Call
                  </a>
                )}
              </div>
            </div>
          )}

          <ReportButton propertyId={property.id} />
        </section>
      </div>
    </main>
    </ConsumerShell>
  )
}
