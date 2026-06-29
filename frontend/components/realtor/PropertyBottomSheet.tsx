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
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md animate-in slide-in-from-bottom duration-200 rounded-t-3xl border border-zinc-200 bg-white px-4 pb-8 pt-3 shadow-2xl">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-zinc-200" />

        <div className="mb-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
              Property actions
            </p>
            <p className="truncate text-base font-bold text-zinc-900">
              {property.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-600"
          >
            <X className="h-4 w-4" />
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
                className="flex w-full items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3.5 ring-1 ring-zinc-100 active:scale-[0.99]"
              >
                <Icon className="h-5 w-5 text-zinc-700" />
                <span className="flex-1 text-left text-sm font-semibold text-zinc-900">
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
