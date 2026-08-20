"use client"

import Image from "next/image"
import Link from "next/link"
import { Building2 } from "lucide-react"

import { getImageUrl } from "@/lib/getImageUrl"
import { formatDashboardDateTime } from "@/lib/realtorWorkspace"
import {
  getRealtorViewingRequestStatusLabel,
  isPropertyPubliclyAvailable,
  type ViewingRequestRealtor,
  type ViewingRequestStatus,
} from "@/types/viewingRequest"

type ViewingRequestListCardProps = {
  item: ViewingRequestRealtor
  onAccept: (request: ViewingRequestRealtor) => void
  onDecline: (request: ViewingRequestRealtor) => void
  actionsDisabled?: boolean
}

const MESSAGE_PREVIEW_MAX_LENGTH = 140

const cardClassName = "rounded-2xl border border-white/8 bg-[#2D2D2D] p-4"

const statusBadgeBaseClassName =
  "inline-flex shrink-0 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"

const statusBadgeClassNames: Record<StatusBadgeTone, string> = {
  warning: "border-amber-400/25 bg-[#2A2620] text-amber-200",
  success: "border-emerald-400/25 bg-[#222A24] text-emerald-200",
  danger: "border-red-400/25 bg-[#2A2020] text-red-200",
  neutral: "border-white/10 bg-[#252525] text-[#B8B8B8]",
}

const actionBaseClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl border text-sm font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:pointer-events-none disabled:opacity-60"

const primaryActionClassName = `${actionBaseClassName} border-[#DFC58A] bg-[#DFC58A] text-[#1B1B1B]`

const secondaryActionClassName = `${actionBaseClassName} border-white/15 bg-[#252525] text-[#F5F5F5] hover:bg-white/5`

const declineActionClassName = `${actionBaseClassName} border-red-400/20 bg-[#2A2020] text-red-200`

type StatusBadgeTone = "warning" | "success" | "danger" | "neutral"

function getStatusBadgeVariant(status: ViewingRequestStatus): StatusBadgeTone {
  switch (status) {
    case "pending":
      return "warning"
    case "accepted":
      return "success"
    case "declined":
      return "danger"
    default:
      return "neutral"
  }
}

function getMessagePreview(message: string | null): string | null {
  if (!message?.trim()) {
    return null
  }

  const trimmed = message.trim()

  if (trimmed.length <= MESSAGE_PREVIEW_MAX_LENGTH) {
    return trimmed
  }

  return `${trimmed.slice(0, MESSAGE_PREVIEW_MAX_LENGTH).trimEnd()}…`
}

export default function ViewingRequestListCard({
  item,
  onAccept,
  onDecline,
  actionsDisabled = false,
}: ViewingRequestListCardProps) {
  const imageSrc = getImageUrl(item.property.image_url)
  const messagePreview = getMessagePreview(item.message)
  const detailHref = `/realtor/viewing-requests/${item.id}`
  const isPublic = isPropertyPubliclyAvailable(item.property.status)

  return (
    <article className={cardClassName}>
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#252525] ring-1 ring-white/10">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[#B8B8B8]">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-[#F5F5F5]">
                {item.property.title}
              </h2>
              {item.property.city ? (
                <p className="mt-0.5 text-sm text-[#B8B8B8]">
                  {item.property.city}
                </p>
              ) : null}
            </div>
            <span
              className={`${statusBadgeBaseClassName} ${
                statusBadgeClassNames[getStatusBadgeVariant(item.status)]
              }`}
            >
              {getRealtorViewingRequestStatusLabel(item.status)}
            </span>
          </div>

          <p className="mt-2 truncate text-sm text-[#F5F5F5]">
            {item.requester_email}
          </p>

          <div className="mt-2 space-y-0.5 text-xs text-[#B8B8B8]">
            <p>Requested {formatDashboardDateTime(item.created_at)}</p>
            {item.responded_at ? (
              <p>Responded {formatDashboardDateTime(item.responded_at)}</p>
            ) : null}
          </div>
        </div>
      </div>

      {messagePreview ? (
        <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
          {messagePreview}
        </p>
      ) : null}

      {item.status === "pending" ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={detailHref}
            className={`${primaryActionClassName} sm:w-auto sm:min-w-[9rem]`}
          >
            Review
          </Link>
          <button
            type="button"
            onClick={() => onAccept(item)}
            disabled={actionsDisabled}
            className={`${secondaryActionClassName} sm:w-auto sm:min-w-[9rem]`}
          >
            Accept
          </button>
          <button
            type="button"
            onClick={() => onDecline(item)}
            disabled={actionsDisabled}
            className={`${declineActionClassName} sm:w-auto sm:min-w-[9rem]`}
          >
            Decline
          </button>
        </div>
      ) : null}

      {item.status === "accepted" ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm leading-relaxed text-[#B8B8B8]">
            Contact the renter to arrange the viewing time and manage the
            relationship.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Link
              href={detailHref}
              className={`${primaryActionClassName} sm:w-auto sm:min-w-[11rem]`}
            >
              Manage relationship
            </Link>
            <Link
              href={`mailto:${item.requester_email}`}
              className={`${secondaryActionClassName} sm:w-auto sm:min-w-[9rem]`}
            >
              Email renter
            </Link>
            {isPublic ? (
              <Link
                href={`/properties/${item.property_id}`}
                className={`${secondaryActionClassName} sm:w-auto sm:min-w-[9rem]`}
              >
                Open property
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}

      {item.status === "declined" || item.status === "cancelled" ? (
        <div className="mt-4">
          <Link
            href={detailHref}
            className={`${secondaryActionClassName} sm:w-auto sm:min-w-[9rem]`}
          >
            View details
          </Link>
        </div>
      ) : null}
    </article>
  )
}
