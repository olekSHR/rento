"use client"

import Image from "next/image"
import Link from "next/link"
import { BadgeCheck } from "lucide-react"

import { RealtorAvatarEnlargeTrigger } from "@/components/RealtorAvatarLightbox"
import { getImageUrl } from "@/lib/getImageUrl"
import type { PropertyRealtorSummary } from "@/types/property"

type PropertyTrustCardProps = {
  realtor: PropertyRealtorSummary
  fallbackInitials?: string
  showViewProfile?: boolean
  trustOnly?: boolean
}

function formatMemberSince(value: string): string {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("en", {
    month: "long",
    year: "numeric",
  }).format(date)
}

function formatActiveListingsCount(count: number): string {
  if (count === 1) {
    return "1 active listing"
  }

  return `${count} active listings`
}

export function PropertyTrustCard({
  realtor,
  fallbackInitials = "R",
  showViewProfile = false,
  trustOnly = false,
}: PropertyTrustCardProps) {
  const displayName = realtor.full_name?.trim() || "Listing agent"
  const avatarUrl = realtor.avatar_url
    ? getImageUrl(realtor.avatar_url)
    : null
  const agencyName = realtor.agency_name?.trim()
  const memberSinceLabel = realtor.member_since
    ? formatMemberSince(realtor.member_since)
    : null

  return (
    <div className="rounded-2xl border border-white/8 bg-[#252525] p-4">
      {!trustOnly && (
        <div className="flex items-start gap-3">
          {avatarUrl ? (
            <RealtorAvatarEnlargeTrigger
              imageUrl={avatarUrl}
              alt={displayName}
              className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-[#1B1B1B] ring-1 ring-[#DFC58A]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
            >
              <Image
                src={avatarUrl}
                alt={displayName}
                fill
                unoptimized
                className="object-cover"
                sizes="56px"
              />
            </RealtorAvatarEnlargeTrigger>
          ) : (
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#1B1B1B] ring-1 ring-[#DFC58A]/30">
              <span className="text-sm font-semibold text-[#DFC58A]">
                {fallbackInitials}
              </span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate text-base font-semibold text-[#F5F5F5]">
                {displayName}
              </p>
              {realtor.is_verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1B1B1B] px-2.5 py-1 text-[11px] font-medium text-[#DFC58A] ring-1 ring-[#DFC58A]/25">
                  <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  Verified realtor
                </span>
              )}
            </div>

            {agencyName && (
              <p className="mt-1 truncate text-sm text-[#B8B8B8]">{agencyName}</p>
            )}
          </div>
        </div>
      )}

      {trustOnly && realtor.is_verified && (
        <div className="mb-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#1B1B1B] px-2.5 py-1 text-[11px] font-medium text-[#DFC58A] ring-1 ring-[#DFC58A]/25">
            <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Verified realtor
          </span>
        </div>
      )}

      <dl
        className={`space-y-1 text-xs text-[#B8B8B8] ${trustOnly ? "" : "mt-3"}`}
      >
        <div className="flex flex-wrap gap-x-2">
          <dt className="sr-only">Active listings</dt>
          <dd>{formatActiveListingsCount(realtor.active_listings_count)}</dd>
        </div>
        {memberSinceLabel && (
          <div className="flex flex-wrap gap-x-2">
            <dt className="sr-only">Member since</dt>
            <dd>Member since {memberSinceLabel}</dd>
          </div>
        )}
      </dl>

      {showViewProfile && realtor.user_id && (
        <div className="mt-4">
          <Link
            href={`/realtors/${realtor.user_id}`}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-white/12 bg-transparent px-4 text-sm font-medium text-[#B8B8B8] transition hover:border-white/20 hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
          >
            View profile
          </Link>
        </div>
      )}
    </div>
  )
}
