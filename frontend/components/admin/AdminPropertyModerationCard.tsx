"use client"

import Image from "next/image"
import Link from "next/link"

import { getImageUrl } from "@/lib/getImageUrl"
import type { Property } from "@/types/property"

type ModerationAction = "verify" | "archive" | "activate" | "delete"

type AdminPropertyModerationCardProps = {
  property: Property
  isBusy: boolean
  busyAction: ModerationAction | null
  errorMessage?: string
  showDeleteConfirm: boolean
  onVerify: () => void
  onArchive: () => void
  onActivate: () => void
  onDeleteClick: () => void
  onDeleteConfirm: () => void
  onDeleteCancel: () => void
}

const actionButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-4 text-xs font-semibold transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

const primaryActionClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const destructiveActionClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-2xl border border-red-400/30 bg-[#2A2222] px-4 text-sm font-semibold text-red-100 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

function getVerificationLabel(lastVerifiedAt?: string | null): string {
  if (!lastVerifiedAt) {
    return "Needs verification"
  }

  const verifiedDate = new Date(lastVerifiedAt)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays <= 0) {
    return "Verified today"
  }

  if (diffDays === 1) {
    return "Verified yesterday"
  }

  if (diffDays <= 7) {
    return `Verified ${diffDays} days ago`
  }

  return "Needs verification"
}

function getVerificationTone(
  lastVerifiedAt?: string | null
): "success" | "warning" | "danger" {
  if (!lastVerifiedAt) {
    return "danger"
  }

  const verifiedDate = new Date(lastVerifiedAt)
  const now = new Date()
  const diffDays = Math.floor(
    (now.getTime() - verifiedDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  if (diffDays <= 1) {
    return "success"
  }

  if (diffDays <= 7) {
    return "warning"
  }

  return "danger"
}

function getStatusLabel(status: Property["status"]): string {
  switch (status) {
    case "available":
      return "Available"
    case "reserved":
      return "Reserved"
    case "rented":
      return "Rented"
    case "pending":
      return "Pending"
    case "archived":
      return "Archived"
    default:
      return status
  }
}

function getStatusTone(
  status: Property["status"]
): "success" | "warning" | "danger" | "neutral" | "accent" {
  switch (status) {
    case "available":
      return "success"
    case "reserved":
      return "warning"
    case "rented":
      return "danger"
    case "pending":
      return "accent"
    case "archived":
      return "neutral"
    default:
      return "neutral"
  }
}

const badgeToneClasses = {
  success: "border-emerald-400/20 bg-emerald-950/40 text-emerald-100",
  warning: "border-amber-400/20 bg-amber-950/40 text-amber-100",
  danger: "border-red-400/20 bg-red-950/40 text-red-100",
  neutral: "border-white/10 bg-[#252525] text-[#B8B8B8]",
  accent: "border-[#DFC58A]/30 bg-[#2A2720] text-[#DFC58A]",
} as const

function formatPrice(price: number | null | undefined): string {
  if (price == null || !Number.isFinite(price)) {
    return "Price unavailable"
  }

  return `${price.toLocaleString()} €`
}

function formatRooms(rooms: number | null | undefined): string {
  if (rooms == null || !Number.isFinite(rooms)) {
    return "Rooms unavailable"
  }

  return `${rooms} ${rooms === 1 ? "room" : "rooms"}`
}

export default function AdminPropertyModerationCard({
  property,
  isBusy,
  busyAction,
  errorMessage,
  showDeleteConfirm,
  onVerify,
  onArchive,
  onActivate,
  onDeleteClick,
  onDeleteConfirm,
  onDeleteCancel,
}: AdminPropertyModerationCardProps) {
  const imageUrl = getImageUrl(property.image_url)
  const verificationLabel = getVerificationLabel(property.last_verified_at)
  const verificationTone = getVerificationTone(property.last_verified_at)
  const statusLabel = getStatusLabel(property.status)
  const statusTone = getStatusTone(property.status)
  const isPending = property.status === "pending"

  return (
    <article
      aria-busy={isBusy}
      className={`overflow-hidden rounded-[24px] border bg-[#2D2D2D] ${
        isPending
          ? "border-[#DFC58A]/35 ring-1 ring-[#DFC58A]/15"
          : "border-white/8"
      }`}
    >
      <div className="relative h-44 w-full bg-[#252525]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-sm text-[#B8B8B8]">
            No photo available
          </div>
        )}

        {isPending && (
          <span className="absolute left-3 top-3 rounded-full border border-[#DFC58A]/30 bg-[#1B1B1B]/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#DFC58A]">
            Action required
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div>
          <h2 className="text-lg font-semibold text-[#F5F5F5]">
            {property.title}
          </h2>
          <p className="mt-1 text-sm text-[#B8B8B8]">
            {property.city?.trim() || "City unavailable"}
          </p>
          <p className="mt-2 text-sm font-medium text-[#F5F5F5]">
            {formatPrice(property.price)}
            <span className="mx-2 text-[#B8B8B8]">·</span>
            {formatRooms(property.rooms)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeToneClasses[statusTone]}`}
          >
            Status: {statusLabel}
          </span>

          <span
            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${badgeToneClasses[verificationTone]}`}
          >
            {verificationLabel}
          </span>

          {property.report_count != null && property.report_count > 0 && (
            <span
              className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${
                property.report_count >= 3
                  ? badgeToneClasses.danger
                  : badgeToneClasses.warning
              }`}
            >
              Reports: {property.report_count}
            </span>
          )}
        </div>

        {errorMessage && (
          <p
            role="alert"
            className="rounded-2xl border border-red-400/20 bg-red-950/30 p-3 text-sm text-red-100"
          >
            {errorMessage}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {property.status === "pending" && (
            <button
              type="button"
              disabled={isBusy}
              aria-busy={busyAction === "verify"}
              onClick={onVerify}
              className={`${actionButtonClassName} border border-emerald-400/20 bg-emerald-950/40 text-emerald-100`}
            >
              {busyAction === "verify" ? "Verifying..." : "Verify"}
            </button>
          )}

          {property.status === "available" && (
            <button
              type="button"
              disabled={isBusy}
              aria-busy={busyAction === "archive"}
              onClick={onArchive}
              className={`${actionButtonClassName} border border-white/10 bg-[#252525] text-[#F5F5F5]`}
            >
              {busyAction === "archive" ? "Archiving..." : "Archive"}
            </button>
          )}

          {property.status === "archived" && (
            <button
              type="button"
              disabled={isBusy}
              aria-busy={busyAction === "activate"}
              onClick={onActivate}
              className={`${actionButtonClassName} border border-[#DFC58A]/25 bg-[#2A2720] text-[#DFC58A]`}
            >
              {busyAction === "activate" ? "Activating..." : "Activate"}
            </button>
          )}
        </div>

        {showDeleteConfirm ? (
          <div className="rounded-2xl border border-amber-400/15 bg-[#2A2720] p-4">
            <p className="text-sm text-[#F5F5F5]">
              Delete{" "}
              <span className="font-semibold text-[#DFC58A]">
                {property.title}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                disabled={isBusy}
                aria-busy={busyAction === "delete"}
                onClick={onDeleteConfirm}
                className={destructiveActionClassName}
              >
                {busyAction === "delete" ? "Deleting..." : "Confirm delete"}
              </button>
              <button
                type="button"
                disabled={isBusy}
                onClick={onDeleteCancel}
                className={`${actionButtonClassName} flex-1 border border-white/10 bg-[#252525] text-[#F5F5F5]`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              href={`/admin/properties/${property.id}/edit`}
              className={primaryActionClassName}
            >
              Edit
            </Link>

            <button
              type="button"
              disabled={isBusy}
              onClick={onDeleteClick}
              className={destructiveActionClassName}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
