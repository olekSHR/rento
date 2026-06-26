"use client"

import Image from "next/image"
import Link from "next/link"
import { BedDouble, MapPin, MoreHorizontal } from "lucide-react"

import { getImageUrl } from "@/lib/getImageUrl"
import {
  getPropertyStatusLabel,
  getPropertyStatusTone,
  getPropertyUpdatedLabel,
} from "@/lib/realtorWorkspace"
import type { Property } from "@/types/property"

type RealtorPropertyCardProps = {
  property: Property
  onMore: (property: Property) => void
}

export default function RealtorPropertyCard({
  property,
  onMore,
}: RealtorPropertyCardProps) {
  const imageUrl = getImageUrl(property.image_url)

  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-transform duration-200 active:scale-[0.995]">
      <div className="relative h-44 bg-zinc-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-semibold text-zinc-400">
            No cover photo
          </div>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 backdrop-blur-sm ${getPropertyStatusTone(
            property.status
          )}`}
        >
          {getPropertyStatusLabel(property.status)}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xl font-extrabold tracking-tight text-zinc-900">
              €{property.price || 0}
            </p>
            <h3 className="mt-1 truncate text-base font-bold text-zinc-900">
              {property.title}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-zinc-600">
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1">
            <MapPin className="h-3.5 w-3.5" />
            {property.city || "No city"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2.5 py-1">
            <BedDouble className="h-3.5 w-3.5" />
            {property.rooms || 0} rooms
          </span>
        </div>

        <p className="mt-3 text-xs text-zinc-400">
          Updated {getPropertyUpdatedLabel(property)}
        </p>

        <div className="mt-4 flex gap-2 border-t border-zinc-100 pt-4">
          <Link
            href={`/realtor/properties/${property.id}/edit`}
            className="flex h-11 flex-1 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-bold text-white"
          >
            Edit
          </Link>
          <button
            type="button"
            aria-label="More actions"
            onClick={() => onMore(property)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-600 active:scale-95"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  )
}
