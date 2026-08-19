"use client"

import Image from "next/image"
import { Building2 } from "lucide-react"

import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import StatusBadge from "@/components/ui/StatusBadge"
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

function getStatusBadgeVariant(
  status: ViewingRequestStatus
): "warning" | "success" | "danger" | "neutral" {
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
    <article className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-200">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-400">
              <Building2 className="h-6 w-6" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="truncate text-base font-semibold text-zinc-900">
                {item.property.title}
              </h2>
              {item.property.city ? (
                <p className="mt-0.5 text-sm text-zinc-500">{item.property.city}</p>
              ) : null}
            </div>
            <StatusBadge variant={getStatusBadgeVariant(item.status)}>
              {getRealtorViewingRequestStatusLabel(item.status)}
            </StatusBadge>
          </div>

          <p className="mt-2 truncate text-sm text-zinc-700">
            {item.requester_email}
          </p>

          <div className="mt-2 space-y-0.5 text-xs text-zinc-500">
            <p>Requested {formatDashboardDateTime(item.created_at)}</p>
            {item.responded_at ? (
              <p>Responded {formatDashboardDateTime(item.responded_at)}</p>
            ) : null}
          </div>
        </div>
      </div>

      {messagePreview ? (
        <p className="mt-4 text-sm leading-relaxed text-zinc-600">
          {messagePreview}
        </p>
      ) : null}

      {item.status === "pending" ? (
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <PrimaryButton href={detailHref} className="sm:w-auto sm:min-w-[9rem]">
            Review
          </PrimaryButton>
          <SecondaryButton
            onClick={() => onAccept(item)}
            disabled={actionsDisabled}
            className="sm:w-auto sm:min-w-[9rem]"
          >
            Accept
          </SecondaryButton>
          <SecondaryButton
            onClick={() => onDecline(item)}
            disabled={actionsDisabled}
            className="sm:w-auto sm:min-w-[9rem] border-red-200 text-red-700"
          >
            Decline
          </SecondaryButton>
        </div>
      ) : null}

      {item.status === "accepted" ? (
        <div className="mt-4 space-y-3">
          <p className="text-sm leading-relaxed text-zinc-600">
            Contact the renter to arrange the viewing time and manage the
            relationship.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <PrimaryButton href={detailHref} className="sm:w-auto sm:min-w-[11rem]">
              Manage relationship
            </PrimaryButton>
            <SecondaryButton
              href={`mailto:${item.requester_email}`}
              className="sm:w-auto sm:min-w-[9rem]"
            >
              Email renter
            </SecondaryButton>
            {isPublic ? (
              <SecondaryButton
                href={`/properties/${item.property_id}`}
                className="sm:w-auto sm:min-w-[9rem]"
              >
                Open property
              </SecondaryButton>
            ) : null}
          </div>
        </div>
      ) : null}

      {item.status === "declined" || item.status === "cancelled" ? (
        <div className="mt-4">
          <SecondaryButton href={detailHref} className="sm:w-auto sm:min-w-[9rem]">
            View details
          </SecondaryButton>
        </div>
      ) : null}
    </article>
  )
}
