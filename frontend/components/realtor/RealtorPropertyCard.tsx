"use client"

import Image from "next/image"
import Link from "next/link"
import { BedDouble, MapPin, MoreHorizontal } from "lucide-react"

import { getImageUrl } from "@/lib/getImageUrl"
import {
  getPropertyStatusLabel,
  getPropertyUpdatedLabel,
} from "@/lib/realtorWorkspace"
import type { Property } from "@/types/property"

type RealtorPropertyCardProps = {
  property: Property
  onMore: (property: Property) => void
}

function getDarkPropertyStatusTone(status: Property["status"]): string {
  switch (status) {
    case "pending":
      return "border-amber-400/20 bg-[#2A2820] text-amber-200"
    case "available":
      return "border-emerald-400/20 bg-[#222A25] text-emerald-200"
    case "reserved":
      return "border-sky-400/20 bg-[#222528] text-sky-200"
    case "rented":
      return "border-violet-400/20 bg-[#252228] text-violet-200"
    case "archived":
      return "border-white/10 bg-[#252525] text-[#B8B8B8]"
    default:
      return "border-white/10 bg-[#252525] text-[#B8B8B8]"
  }
}

const editLinkClassName =
  "flex h-11 flex-1 items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const moreButtonClassName =
  "flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-[#B8B8B8] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

export default function RealtorPropertyCard({
  property,
  onMore,
}: RealtorPropertyCardProps) {
  const imageUrl = getImageUrl(property.image_url)
  const statusLabel = getPropertyStatusLabel(property.status)

  return (
    <article className="overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D] transition-transform duration-200 active:scale-[0.995]">
      <div className="relative h-44 bg-[#252525]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-semibold text-[#B8B8B8]">
            No cover photo
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold ${getDarkPropertyStatusTone(
            property.status
          )}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xl font-semibold tracking-tight text-[#F5F5F5]">
              €{property.price || 0}
            </p>
            <h3 className="mt-1 truncate text-base font-semibold text-[#F5F5F5]">
              {property.title}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-[#B8B8B8]">
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-[#252525] px-2.5 py-1">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {property.city || "No city"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-[#252525] px-2.5 py-1">
            <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
            {property.rooms || 0} rooms
          </span>
        </div>

        <p className="mt-3 text-xs text-[#B8B8B8]">
          Updated {getPropertyUpdatedLabel(property)}
        </p>

        <div className="mt-4 flex gap-2 border-t border-white/8 pt-4">
          <Link
            href={`/realtor/properties/${property.id}/edit`}
            className={editLinkClassName}
          >
            Edit
          </Link>
          <button
            type="button"
            aria-label={`More actions for ${property.title}`}
            onClick={() => onMore(property)}
            className={moreButtonClassName}
          >
            <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}
