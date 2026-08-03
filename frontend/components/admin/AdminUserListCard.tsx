"use client"

import Link from "next/link"
import type { ReactNode } from "react"

import type { AdminUserListItem } from "@/services/api"

type BadgeVariant = "success" | "warning" | "danger" | "neutral" | "info"

const badgeClassNames: Record<BadgeVariant, string> = {
  success:
    "border border-emerald-400/30 bg-emerald-950/40 text-emerald-200",
  warning: "border border-amber-400/30 bg-amber-950/40 text-amber-200",
  danger: "border border-red-400/30 bg-red-950/40 text-red-200",
  neutral: "border border-white/10 bg-[#252525] text-[#B8B8B8]",
  info: "border border-sky-400/30 bg-sky-950/40 text-sky-200",
}

function DarkBadge({
  children,
  variant = "neutral",
}: {
  children: ReactNode
  variant?: BadgeVariant
}) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${badgeClassNames[variant]}`}
    >
      {children}
    </span>
  )
}

function getDisplayInitials(displayName: string): string {
  const parts = displayName.trim().split(/\s+/).filter(Boolean)

  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
  }

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return "U"
}

function getRoleVariant(role: string): BadgeVariant {
  if (role === "admin") {
    return "info"
  }

  if (role === "realtor") {
    return "success"
  }

  return "neutral"
}

function getApplicationVariant(status: string): BadgeVariant {
  if (status === "approved") {
    return "success"
  }

  if (status === "rejected") {
    return "danger"
  }

  if (status === "pending") {
    return "warning"
  }

  return "neutral"
}

function getAccountStatusVariant(status: string): BadgeVariant {
  if (status === "active") {
    return "success"
  }

  if (status === "suspended") {
    return "warning"
  }

  if (status === "blocked") {
    return "danger"
  }

  return "neutral"
}

function formatAccountStatusLabel(status: string): string {
  if (status === "active") {
    return "Active"
  }

  if (status === "suspended") {
    return "Suspended"
  }

  if (status === "blocked") {
    return "Blocked"
  }

  return status
}

function formatRegisteredAt(value: string | null): string {
  if (!value) {
    return "—"
  }

  return new Date(value).toLocaleDateString(undefined, {
    dateStyle: "medium",
  })
}

export default function AdminUserListCard({ user }: { user: AdminUserListItem }) {
  return (
    <Link
      href={`/admin/users/${user.id}`}
      className="block rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] active:scale-[0.99]"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#252525] text-sm font-bold text-[#DFC58A] ring-1 ring-white/10">
          {getDisplayInitials(user.display_name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0">
              <h2 className="truncate text-base font-bold text-[#F5F5F5]">
                {user.display_name}
              </h2>
              <p className="mt-0.5 break-all text-sm text-[#B8B8B8] sm:truncate">
                {user.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-1">
              <DarkBadge variant={getRoleVariant(user.role)}>{user.role}</DarkBadge>
              <DarkBadge variant={getAccountStatusVariant(user.account_status)}>
                {formatAccountStatusLabel(user.account_status)}
              </DarkBadge>
              {user.is_verified_realtor && (
                <DarkBadge variant="success">Verified</DarkBadge>
              )}
              {user.application_status && (
                <DarkBadge
                  variant={getApplicationVariant(user.application_status)}
                >
                  {user.application_status}
                </DarkBadge>
              )}
            </div>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="font-semibold text-[#B8B8B8]">Listings</dt>
              <dd className="mt-0.5 text-[#F5F5F5]">
                {user.listings_count.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[#B8B8B8]">Registered</dt>
              <dd className="mt-0.5 text-[#F5F5F5]">
                {formatRegisteredAt(user.registered_at)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  )
}
