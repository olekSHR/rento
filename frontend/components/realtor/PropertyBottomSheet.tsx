"use client"

import Link from "next/link"
import { Images, Pencil, X } from "lucide-react"

import type { Property } from "@/types/property"

type PropertyBottomSheetProps = {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

const SHEET_ACTIONS = [
  {
    id: "edit",
    label: "Edit Property",
    icon: Pencil,
    href: (propertyId: number) => `/realtor/properties/${propertyId}/edit`,
  },
  {
    id: "gallery",
    label: "Manage Gallery",
    icon: Images,
    href: (propertyId: number) =>
      `/realtor/properties/${propertyId}/edit#gallery`,
  },
] as const

const actionLinkClassName =
  "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-white/8 bg-[#252525] px-4 py-3.5 text-[#F5F5F5] transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

export default function PropertyBottomSheet({
  property,
  isOpen,
  onClose,
}: PropertyBottomSheetProps) {
  if (!isOpen || !property) {
    return null
  }

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
          {SHEET_ACTIONS.map((action) => {
            const Icon = action.icon

            return (
              <Link
                key={action.id}
                href={action.href(property.id)}
                onClick={onClose}
                className={actionLinkClassName}
              >
                <Icon className="h-5 w-5 shrink-0 text-[#DFC58A]" aria-hidden="true" />
                <span className="flex-1 text-left text-sm font-semibold">
                  {action.label}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
