"use client"

import Link from "next/link"
import { Archive, Copy, Images, Pencil, Trash2, X } from "lucide-react"

import type { Property } from "@/types/property"

type PropertyBottomSheetProps = {
  property: Property | null
  isOpen: boolean
  onClose: () => void
  onComingSoon: (label: string) => void
}

type SheetAction = {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  comingSoon?: boolean
  adminOnly?: boolean
  onClick?: () => void
}

export default function PropertyBottomSheet({
  property,
  isOpen,
  onClose,
  onComingSoon,
}: PropertyBottomSheetProps) {
  if (!isOpen || !property) {
    return null
  }

  const actions: SheetAction[] = [
    {
      id: "edit",
      label: "Edit Property",
      icon: <Pencil className="h-5 w-5" />,
      href: `/realtor/properties/${property.id}/edit`,
    },
    {
      id: "gallery",
      label: "Manage Gallery",
      icon: <Images className="h-5 w-5" />,
      href: `/realtor/properties/${property.id}/edit#gallery`,
    },
    {
      id: "duplicate",
      label: "Duplicate",
      icon: <Copy className="h-5 w-5" />,
      comingSoon: true,
    },
    {
      id: "archive",
      label: "Archive",
      icon: <Archive className="h-5 w-5" />,
      comingSoon: true,
    },
    {
      id: "delete",
      label: "Delete",
      icon: <Trash2 className="h-5 w-5" />,
      adminOnly: true,
      comingSoon: true,
    },
  ]

  function handleAction(action: SheetAction) {
    if (action.comingSoon || action.adminOnly) {
      onComingSoon(action.label)
      return
    }

    onClose()
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
          {actions.map((action) => {
            const content = (
              <>
                <span className="text-zinc-700">{action.icon}</span>
                <span className="flex-1 text-left text-sm font-semibold text-zinc-900">
                  {action.label}
                </span>
                {(action.comingSoon || action.adminOnly) && (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                    {action.adminOnly ? "Admin" : "Soon"}
                  </span>
                )}
              </>
            )

            if (action.href && !action.comingSoon) {
              return (
                <Link
                  key={action.id}
                  href={action.href}
                  onClick={onClose}
                  className="flex w-full items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3.5 ring-1 ring-zinc-100 active:scale-[0.99]"
                >
                  {content}
                </Link>
              )
            }

            return (
              <button
                key={action.id}
                type="button"
                onClick={() => handleAction(action)}
                className="flex w-full items-center gap-3 rounded-2xl bg-zinc-50 px-4 py-3.5 ring-1 ring-zinc-100 active:scale-[0.99]"
              >
                {content}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
