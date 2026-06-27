"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import EmptyState from "@/components/ui/EmptyState"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
import {
  getAdminUsers,
  type AdminUserListItem,
} from "@/services/api"

const PAGE_LIMIT = 20

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

function UsersSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-32 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-32 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-32 animate-pulse rounded-3xl bg-zinc-200" />
    </div>
  )
}

function UserCard({ user }: { user: AdminUserListItem }) {
  return (
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
  )
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUserListItem[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [reloadKey, setReloadKey] = useState(0)

  const hasNextPage = page * PAGE_LIMIT < total

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      setError("")

      try {
        setIsLoading(true)

        const token = getToken()

        if (!token) {
          throw new Error("Unable to load users.")
        }

        const data = await getAdminUsers(token, page, PAGE_LIMIT)

        if (!isMounted) {
          return
        }

        setUsers(data.items)
        setTotal(data.total)
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setUsers([])
        setTotal(0)
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load users."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadUsers()

    return () => {
      isMounted = false
    }
  }, [page, reloadKey])

  function handlePreviousPage() {
    if (page > 1) {
      setPage((current) => current - 1)
    }
  }

  function handleNextPage() {
    if (hasNextPage) {
      setPage((current) => current + 1)
    }
  }

  function handleRetry() {
    setReloadKey((current) => current + 1)
  }

  return (
    <AdminRoute>
      <PageShell>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to admin
        </Link>

        <PageHeader
          title="Users"
          subtitle="Registered platform accounts."
        />

        {isLoading ? (
          <UsersSkeleton />
        ) : error ? (
          <SectionCard>
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
              {error}
            </p>
            <div className="mt-4">
              <PrimaryButton onClick={handleRetry}>
                Try again
              </PrimaryButton>
            </div>
          </SectionCard>
        ) : users.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Registered users will appear here."
          />
        ) : (
          <>
            <div className="space-y-3">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>

            <SectionCard>
              <div className="flex items-center justify-between gap-3">
                <SecondaryButton
                  disabled={page <= 1 || isLoading}
                  onClick={handlePreviousPage}
                >
                  Previous
                </SecondaryButton>

                <p className="text-sm font-semibold text-zinc-700">
                  Page {page}
                </p>

                <SecondaryButton
                  disabled={!hasNextPage || isLoading}
                  onClick={handleNextPage}
                >
                  Next
                </SecondaryButton>
              </div>
            </SectionCard>
          </>
        )}
      </PageShell>
    </AdminRoute>
  )
}
