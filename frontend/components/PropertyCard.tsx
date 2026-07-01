"use client"

import Image from "next/image"
import Link from "next/link"
import { BadgeCheck, BedDouble, MapPin } from "lucide-react"

import FavoriteButton from "./FavoriteButton"
import ShareButton from "./ShareButton"
import { RealtorAvatarEnlargeTrigger } from "./RealtorAvatarLightbox"
import { getImageUrl } from "@/lib/getImageUrl"
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
  const coverImage =
    images?.find((image) => image.is_cover)?.url ??
    images?.[0]?.url ??
    image_url ??
    null

  const verificationLabel = getVerificationLabel(last_verified_at)
  const isVerified = verificationLabel !== "Needs Verification"
  const realtorAvatarUrl = avatar_url ? getImageUrl(avatar_url) : null
  const showRealtorRow = Boolean(realtorAvatarUrl || contact_name?.trim())

  return (
    <article className="relative mx-auto mb-5 w-full max-w-md overflow-hidden rounded-[28px] border border-zinc-200/80 bg-white shadow-[0_14px_35px_rgba(15,23,42,0.08)] transition-all duration-300 active:scale-[0.985] md:max-w-lg">
      <ShareButton
        title={title}
        url={`${process.env.NEXT_PUBLIC_SITE_URL || "https://rentonow.ro"}/properties/${id}`}
      />
      <FavoriteButton propertyId={id} />

      <Link href={`/properties/${id}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-zinc-200">
          {coverImage ? (
            <Image
              src={getImageUrl(coverImage) || ""}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              No Image
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
        </div>

        <div className="p-4 pb-0">
          <div
            className={`
              mb-3
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

          <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-zinc-950">
            {title}
          </h2>

          <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-zinc-500">
            <MapPin className="h-4 w-4" />
            <span>{city || "Unknown city"}</span>
          </div>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                Monthly rent
              </p>
              <p className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-950">
                €{price || 0}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-3 py-2 text-sm font-semibold text-zinc-700">
              <BedDouble className="h-4 w-4" />
              <span>{rooms || 0} rooms</span>
            </div>
          </div>
        </div>
      </Link>

      {showRealtorRow && (
        <div className="flex items-center gap-2.5 border-t border-zinc-100 px-4 pb-4 pt-4">
          {realtorAvatarUrl ? (
            <RealtorAvatarEnlargeTrigger
              imageUrl={realtorAvatarUrl}
              alt={contact_name || "Realtor"}
              className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-blue-700 ring-1 ring-zinc-200 active:scale-95"
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
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-700 ring-1 ring-zinc-200">
              <span className="text-xs font-bold text-white">
                {getContactInitials(contact_name)}
              </span>
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-800">
              {contact_name || "Realtor"}
            </p>
            <p className="text-xs text-zinc-500">Listing agent</p>
          </div>
        </div>
      )}
    </article>
  )
}
