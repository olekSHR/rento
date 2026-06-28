"use client"

import Link from "next/link"

import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import type { AdminUserListItem } from "@/services/api"

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

function getRoleVariant(
  role: string
): "success" | "warning" | "neutral" | "info" {
  if (role === "admin") {
    return "info"
  }

  if (role === "realtor") {
    return "success"
  }

  return "neutral"
}

function getApplicationVariant(
  status: string
): "success" | "warning" | "danger" | "neutral" {
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
      className="block transition-transform active:scale-[0.98]"
    >
      <SectionCard>
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white">
            {getDisplayInitials(user.display_name)}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-zinc-900">
                  {user.display_name}
                </h2>
                <p className="mt-0.5 truncate text-sm text-zinc-500">
                  {user.email}
                </p>
              </div>

              <div className="flex flex-wrap gap-1">
                <StatusBadge variant={getRoleVariant(user.role)}>
                  {user.role}
                </StatusBadge>
                {user.is_verified_realtor && (
                  <StatusBadge variant="success">Verified</StatusBadge>
                )}
                {user.application_status && (
                  <StatusBadge
                    variant={getApplicationVariant(user.application_status)}
                  >
                    {user.application_status}
                  </StatusBadge>
                )}
              </div>
            </div>

            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="font-semibold text-zinc-700">Listings</dt>
                <dd className="mt-0.5 text-zinc-500">
                  {user.listings_count.toLocaleString()}
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-zinc-700">Registered</dt>
                <dd className="mt-0.5 text-zinc-500">
                  {formatRegisteredAt(user.registered_at)}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </SectionCard>
    </Link>
  )
}
