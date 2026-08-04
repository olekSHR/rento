"use client"

import Link from "next/link"
import { Archive, Images, Pencil, RotateCcw, Trash2, X } from "lucide-react"

import type { ListingView } from "@/lib/realtorWorkspace"
import type { Property } from "@/types/property"

type PropertyBottomSheetProps = {
  property: Property | null
  isOpen: boolean
  listingView: ListingView
  isBusy: boolean
  busyAction: "archive" | "restore" | "delete" | null
  onClose: () => void
  onArchive: (property: Property) => void
  onRestore: (property: Property) => void
  onDelete: (property: Property) => void
}

const actionLinkClassName =
  "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-white/8 bg-[#252525] px-4 py-3.5 text-[#F5F5F5] transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const actionButtonClassName =
  "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-white/8 bg-[#252525] px-4 py-3.5 text-left text-[#F5F5F5] transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"

const destructiveButtonClassName =
  "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-red-400/20 bg-[#2A2020] px-4 py-3.5 text-left text-red-200 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"

export default function PropertyBottomSheet({
  property,
  isOpen,
  listingView,
  isBusy,
  busyAction,
  onClose,
  onArchive,
  onRestore,
  onDelete,
}: PropertyBottomSheetProps) {
  if (!isOpen || !property) {
    return null
  }

  const canArchive =
    listingView === "current" && property.status === "available"
  const canRestore = listingView === "archived" && property.status === "archived"
  const canDelete = listingView === "archived" && property.status === "archived"

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-[#1B1B1B]/80 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="property-bottom-sheet-title"
        className="relative w-full max-w-md rounded-t-[24px] border border-white/8 border-b-0 bg-[#2D2D2D] px-4 pb-8 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.32)]"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/15"
        />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8B8B8]">
              Property actions
            </p>
            <p
              id="property-bottom-sheet-title"
              className="truncate text-base font-semibold text-[#F5F5F5]"
            >
              {property.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close property actions"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#252525] text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-2">
          {listingView === "current" && (
            <>
              <Link
                href={`/realtor/properties/${property.id}/edit`}
                onClick={onClose}
                className={actionLinkClassName}
              >
                <Pencil className="h-5 w-5 shrink-0 text-[#DFC58A]" aria-hidden="true" />
                <span className="flex-1 text-left text-sm font-semibold">
                  Edit Property
                </span>
              </Link>

              <Link
                href={`/realtor/properties/${property.id}/edit#gallery`}
                onClick={onClose}
                className={actionLinkClassName}
              >
                <Images className="h-5 w-5 shrink-0 text-[#DFC58A]" aria-hidden="true" />
                <span className="flex-1 text-left text-sm font-semibold">
                  Manage Gallery
                </span>
              </Link>

              {canArchive && (
                <button
                  type="button"
                  disabled={isBusy}
                  aria-busy={busyAction === "archive"}
                  onClick={() => onArchive(property)}
                  className={actionButtonClassName}
                >
                  <Archive className="h-5 w-5 shrink-0 text-[#DFC58A]" aria-hidden="true" />
                  <span className="flex-1 text-sm font-semibold">
                    {busyAction === "archive" ? "Archiving..." : "Archive"}
                  </span>
                </button>
              )}
            </>
          )}

          {listingView === "archived" && (
            <>
              {canRestore && (
                <button
                  type="button"
                  disabled={isBusy}
                  aria-busy={busyAction === "restore"}
                  onClick={() => onRestore(property)}
                  className={actionButtonClassName}
                >
                  <RotateCcw className="h-5 w-5 shrink-0 text-[#DFC58A]" aria-hidden="true" />
                  <span className="flex-1 text-sm font-semibold">
                    {busyAction === "restore" ? "Restoring..." : "Restore"}
                  </span>
                </button>
              )}

              {canDelete && (
                <button
                  type="button"
                  disabled={isBusy}
                  aria-busy={busyAction === "delete"}
                  onClick={() => onDelete(property)}
                  className={destructiveButtonClassName}
                >
                  <Trash2 className="h-5 w-5 shrink-0 text-red-300" aria-hidden="true" />
                  <span className="flex-1 text-sm font-semibold">
                    {busyAction === "delete" ? "Deleting..." : "Permanent Delete"}
                  </span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
