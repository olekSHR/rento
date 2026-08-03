"use client"

import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, BedDouble, Home, MapPin } from "lucide-react"

import FavoriteButton from "./FavoriteButton"
import ShareButton from "./ShareButton"
import { RealtorAvatarEnlargeTrigger } from "./RealtorAvatarLightbox"
import { getImageUrl, resolvePropertyListingImage } from "@/lib/getImageUrl"
import type { Property } from "@/types/property"

type PropertyCardProps = Pick<
  Property,
  | "id"
  | "title"
  | "price"
  | "city"
  | "rooms"
  | "image_url"
  | "images"
  | "last_verified_at"
  | "contact_name"
  | "avatar_url"
>

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

  if (diffDays <= 7) {
    return `Verified ${diffDays} days ago`
  }

  return "Needs Verification"
}

export default function PropertyCard({
  id,
  title,
  price,
  city,
  rooms,
  image_url,
  images,
  last_verified_at,
  contact_name,
  avatar_url,
}: PropertyCardProps) {
  const coverImage = resolvePropertyListingImage({ images, image_url })

  const verificationLabel = getVerificationLabel(last_verified_at)
  const isVerified = verificationLabel !== "Needs Verification"
  const realtorAvatarUrl = avatar_url ? getImageUrl(avatar_url) : null
  const showRealtorRow = Boolean(realtorAvatarUrl || contact_name?.trim())

  return (
    <article className="relative w-full overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D] shadow-[0_10px_30px_rgba(0,0,0,0.22)] transition-[transform,box-shadow] duration-300 active:scale-[0.99]">
      <ShareButton
        title={title}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://rentonow.ro"}/properties/${id}`}
      />
      <FavoriteButton propertyId={id} />

      <Link
        href={`/properties/${id}`}
        className="block rounded-[24px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
      >
        <div className="relative h-60 w-full overflow-hidden bg-[#252525]">
          {coverImage ? (
            <Image
              src={getImageUrl(coverImage) || ""}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-cover transition-transform duration-500 hover:scale-[1.02]"
            />
          ) : (
            <div
              role="img"
              aria-label="Photos are not available"
              className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#252525] px-4 text-center"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D2D2D] ring-1 ring-white/10">
                <Home className="h-5 w-5 text-[#B8B8B8]" aria-hidden="true" />
              </div>
              <p className="text-xs font-medium text-[#B8B8B8]">
                Photos are not available
              </p>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#1B1B1B]/70 via-[#1B1B1B]/20 to-transparent" />

          <div
            className={`
              absolute
              bottom-3
              left-3
              z-[1]
              inline-flex
              max-w-[calc(100%-1.5rem)]
              items-center
              gap-1
              rounded-full
              px-2.5
              py-1
              text-[11px]
              font-medium
              backdrop-blur-sm
              ${
                isVerified
                  ? "bg-[#252525]/90 text-[#DFC58A] ring-1 ring-white/15"
                  : "bg-[#252525]/90 text-[#F5F5F5] ring-1 ring-white/15"
              }
            `}
          >
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{verificationLabel}</span>
          </div>
        </div>

        <div className="px-5 pb-5 pt-4">
          <h2 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-[#F5F5F5]">
            {title}
          </h2>

          <div className="mt-2 flex items-center gap-1.5 text-sm text-[#B8B8B8]">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{city || "Unknown city"}</span>
          </div>

          <div className="mt-4 flex items-end justify-between gap-4">
            <div className="min-w-0">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[#B8B8B8]">
                Monthly rent
              </p>
              <p className="mt-1 text-[1.625rem] font-bold leading-none tracking-tight text-[#DFC58A]">
                €{price || 0}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-xl bg-[#252525] px-3 py-2 text-sm font-medium text-[#F5F5F5] ring-1 ring-white/10">
              <BedDouble className="h-4 w-4 text-[#B8B8B8]" />
              <span>{rooms || 0} rooms</span>
            </div>
          </div>
        </div>
      </Link>

      {showRealtorRow && (
        <div className="flex items-center gap-3 border-t border-white/8 px-5 pb-5 pt-4">
          {realtorAvatarUrl ? (
            <RealtorAvatarEnlargeTrigger
              imageUrl={realtorAvatarUrl}
              alt={contact_name || "Realtor"}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30 active:scale-95"
            >
              <Image
                src={realtorAvatarUrl}
                alt={contact_name || "Realtor"}
                fill
                unoptimized
                className="object-cover"
                sizes="36px"
              />
            </RealtorAvatarEnlargeTrigger>
          ) : (
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30">
              <span className="text-xs font-semibold text-[#DFC58A]">
                {getContactInitials(contact_name)}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#F5F5F5]">
              {contact_name || "Realtor"}
            </p>
            <p className="text-xs text-[#B8B8B8]">Listing agent</p>
          </div>
        </div>
      )}
    </article>
  )
}
