import type { Metadata } from "next"
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
import PropertyCard from "@/components/PropertyCard"
import ShareButton from "@/components/ShareButton"
import ReportButton from "@/components/ReportButton"
import { RealtorAvatarEnlargeTrigger } from "@/components/RealtorAvatarLightbox"
import { SAFE_BOTTOM_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { getImageUrl, hasPropertyListingImage } from "@/lib/getImageUrl"
import {
  getProperties,
  getPropertyById,
  getPropertyImages,
} from "@/services/api"

import { PropertyLocationSection } from "@/components/map/PropertyLocationSectionLazy"
import type { Property } from "@/types/property"

type Props = {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const canonicalPath = `/properties/${encodeURIComponent(id)}`
  const description = "Discover verified homes for rent on Rento."

  return {
    title: {
      absolute: "Rento",
    },
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      url: canonicalPath,
      siteName: "Rento",
      title: "Rento",
      description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: "Rento — Find your next home",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rento",
      description,
      images: ["/opengraph-image"],
    },
  }
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

async function getRelatedListings(
  currentId: number,
  city?: string | null
): Promise<Property[]> {
  try {
    const data = await getProperties()
    const items: Property[] = data.items ?? []

    const photographed = items.filter(
      (property) =>
        property.id !== currentId && hasPropertyListingImage(property)
    )

    if (photographed.length === 0) {
      return []
    }

    const normalizedCity = city?.trim().toLowerCase() || ""

    const sameCity = normalizedCity
      ? photographed.filter(
          (property) => property.city?.trim().toLowerCase() === normalizedCity
        )
      : []

    const otherCities = photographed.filter(
      (property) =>
        !normalizedCity ||
        property.city?.trim().toLowerCase() !== normalizedCity
    )

    return [...sameCity, ...otherCities].slice(0, 3)
  } catch {
    return []
  }
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

  const relatedListings = await getRelatedListings(
    property.id,
    property.city
  )

  const verificationLabel = getVerificationLabel(property.last_verified_at)
  const isVerified = verificationLabel !== "Needs Verification"
  const contactAvatarUrl = property.avatar_url
    ? getImageUrl(property.avatar_url)
    : null
  const realtorDisplayName =
    property.contact_name?.trim() || "Property contact"
  const hasRealtorIdentity = Boolean(
    property.contact_name?.trim() || property.avatar_url
  )
  const hasContactMethods = Boolean(property.phone || property.whatsapp)

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
    <ConsumerShell hideBottomNav>
      <main
        className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${SAFE_BOTTOM_CONTENT_CLASS}`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-10 lg:px-8 lg:pt-8">
            <div className="relative">
              <BackButton />

              <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
                <ShareButton className="relative" />
                <FavoriteButton
                  propertyId={property.id}
                  className="relative"
                />
              </div>

              <PropertyGallery
                title={property.title}
                images={galleryImages}
              />
            </div>

            <section className="px-5 pt-6 md:px-8 lg:px-0 lg:pt-2">
              <div
                className={`
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  backdrop-blur-sm
                  ${
                    isVerified
                      ? "bg-[#252525] text-[#DFC58A] ring-1 ring-white/15"
                      : "bg-[#252525] text-[#F5F5F5] ring-1 ring-white/15"
                  }
                `}
              >
                <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{verificationLabel}</span>
              </div>

              <h1 className="mt-4 text-[1.75rem] font-semibold leading-tight tracking-tight text-[#F5F5F5] md:text-[2rem]">
                {property.title}
              </h1>

              <div className="mt-3 flex items-center gap-1.5 text-sm text-[#B8B8B8]">
                <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{property.city || "Unknown city"}</span>
              </div>

              <div className="mt-6 flex items-end justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#B8B8B8]">
                    Monthly rent
                  </p>
                  <p className="mt-1 text-[1.625rem] font-bold leading-none tracking-tight text-[#DFC58A] md:text-[1.75rem]">
                    €{property.price || 0}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[#252525] px-3 py-2 text-sm font-medium text-[#F5F5F5] ring-1 ring-white/10">
                  <BedDouble className="h-4 w-4 text-[#B8B8B8]" aria-hidden="true" />
                  <span>{property.rooms || 0} rooms</span>
                </div>
              </div>

              {hasRealtorIdentity && (
                <div className="mt-7 flex items-center gap-3 rounded-[24px] border border-white/8 bg-[#2D2D2D] px-4 py-4">
                  {contactAvatarUrl ? (
                    <RealtorAvatarEnlargeTrigger
                      imageUrl={contactAvatarUrl}
                      alt={realtorDisplayName}
                      className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
                    >
                      <Image
                        src={contactAvatarUrl}
                        alt={realtorDisplayName}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="48px"
                      />
                    </RealtorAvatarEnlargeTrigger>
                  ) : (
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30">
                      <span className="text-sm font-semibold text-[#DFC58A]">
                        {getContactInitials(property.contact_name)}
                      </span>
                    </div>
                  )}

                  {hasContactMethods ? (
                    <a
                      href="#property-contact"
                      className="flex min-w-0 flex-1 items-center gap-2 rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                          {realtorDisplayName}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-[#B8B8B8]">
                          Listing agent
                        </p>
                      </div>
                      <ChevronRight
                        className="h-5 w-5 shrink-0 text-[#B8B8B8]"
                        aria-hidden="true"
                      />
                    </a>
                  ) : (
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                        {realtorDisplayName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-[#B8B8B8]">
                        Listing agent
                      </p>
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>

          <div className="px-5 pb-8 pt-8 md:px-8 lg:px-8">
            <section aria-labelledby="property-about-heading">
              <h2
                id="property-about-heading"
                className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
              >
                About this property
              </h2>

              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#B8B8B8]">
                {property.description || "No description available."}
              </p>
            </section>

            <PropertyLocationSection
              latitude={property.latitude}
              longitude={property.longitude}
              city={property.city}
            />

            {hasContactMethods && (
              <section
                id="property-contact"
                aria-labelledby="property-contact-heading"
                className="mt-8 scroll-mt-6 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
              >
                <h2
                  id="property-contact-heading"
                  className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]"
                >
                  Contact
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  Ask {realtorDisplayName} about availability, viewing time, and
                  rental conditions.
                </p>

                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {property.whatsapp && (
                    <a
                      href={`https://wa.me/${property.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
                    >
                      <MessageCircle className="h-5 w-5" aria-hidden="true" />
                      WhatsApp
                    </a>
                  )}

                  {property.phone && (
                    <a
                      href={`tel:${property.phone}`}
                      className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition hover:border-white/25 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      Call
                    </a>
                  )}
                </div>
              </section>
            )}

            <ReportButton propertyId={property.id} />

            {relatedListings.length > 0 && (
              <section
                aria-labelledby="related-listings-heading"
                className="mt-12"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
                  Available now
                </p>

                <h2
                  id="related-listings-heading"
                  className="mt-2 text-[1.5rem] font-semibold tracking-tight text-[#F5F5F5]"
                >
                  Similar rentals
                </h2>

                <ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedListings.map((related) => (
                    <li key={related.id} className="min-w-0">
                      <PropertyCard
                        id={related.id}
                        title={related.title}
                        price={related.price}
                        city={related.city}
                        rooms={related.rooms}
                        image_url={related.image_url}
                        images={related.images}
                        last_verified_at={related.last_verified_at}
                      />
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>
      </main>
    </ConsumerShell>
  )
}
