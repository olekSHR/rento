"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

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

const ROLE_FILTERS = [
  { value: "", label: "All" },
  { value: "user", label: "User" },
  { value: "realtor", label: "Realtor" },
  { value: "admin", label: "Admin" },
] as const

const APPLICATION_FILTERS = [
  { value: "", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
  { value: "none", label: "None" },
] as const

type RoleFilter = (typeof ROLE_FILTERS)[number]["value"]
type ApplicationFilter = (typeof APPLICATION_FILTERS)[number]["value"]

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

function parsePageParam(value: string | null): number {
  const parsed = Number(value)

  if (!Number.isFinite(parsed) || parsed < 1) {
    return 1
  }

  return Math.floor(parsed)
}

function hasActiveFilters(
  searchQuery: string,
  role: RoleFilter,
  applicationStatus: ApplicationFilter
): boolean {
  return (
    searchQuery.trim().length >= 2 ||
    role !== "" ||
    applicationStatus !== ""
  )
}

function parseRoleFilter(value: string | null): RoleFilter {
  if (value === "user" || value === "realtor" || value === "admin") {
    return value
  }

  return ""
}

function parseApplicationFilter(value: string | null): ApplicationFilter {
  if (
    value === "pending" ||
    value === "approved" ||
    value === "rejected" ||
    value === "none"
  ) {
    return value
  }

  return ""
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

function FilterChip({
  label,
  isActive,
  onClick,
}: {
  label: string
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition-colors active:scale-[0.98] ${
        isActive
          ? "bg-blue-700 text-white ring-blue-700"
          : "bg-white text-zinc-700 ring-zinc-200"
      }`}
    >
      {label}
    </button>
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
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("q") ?? ""
  )
  const [debouncedQuery, setDebouncedQuery] = useState(
    () => searchParams.get("q")?.trim() ?? ""
  )
  const [role, setRole] = useState<RoleFilter>(() =>
    parseRoleFilter(searchParams.get("role"))
  )
  const [applicationStatus, setApplicationStatus] = useState<ApplicationFilter>(
    () => parseApplicationFilter(searchParams.get("application_status"))
  )
  const [page, setPage] = useState(() =>
    parsePageParam(searchParams.get("page"))
  )

  const [users, setUsers] = useState<AdminUserListItem[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [reloadKey, setReloadKey] = useState(0)

  const skipPageResetRef = useRef(true)
  const hasNextPage = page * PAGE_LIMIT < total
  const effectiveQuery =
    debouncedQuery.length >= 2 ? debouncedQuery : undefined
  const filtersActive = hasActiveFilters(debouncedQuery, role, applicationStatus)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(searchInput.trim())
    }, 300)

    return () => window.clearTimeout(timer)
  }, [searchInput])

  useEffect(() => {
    if (skipPageResetRef.current) {
      skipPageResetRef.current = false
      return
    }

    setPage(1)
  }, [debouncedQuery, role, applicationStatus])

  useEffect(() => {
    const params = new URLSearchParams()

    if (effectiveQuery) {
      params.set("q", effectiveQuery)
    }

    if (role) {
      params.set("role", role)
    }

    if (applicationStatus) {
      params.set("application_status", applicationStatus)
    }

    if (page > 1) {
      params.set("page", String(page))
    }

    const nextQuery = params.toString()
    const currentQuery = searchParams.toString()

    if (nextQuery !== currentQuery) {
      router.replace(
        nextQuery ? `/admin/users?${nextQuery}` : "/admin/users",
        { scroll: false }
      )
    }
  }, [
    effectiveQuery,
    role,
    applicationStatus,
    page,
    router,
    searchParams,
  ])

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

        const data = await getAdminUsers(token, {
          page,
          limit: PAGE_LIMIT,
          q: effectiveQuery,
          role: role || undefined,
          application_status: applicationStatus || undefined,
        })

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
  }, [page, effectiveQuery, role, applicationStatus, reloadKey])

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

        <SectionCard>
          <label className="block">
            <span className="sr-only">Search users</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search by email, name, phone, agency..."
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-900 outline-none"
            />
          </label>

          <div className="mt-4 space-y-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                Role
              </p>
              <div className="flex flex-wrap gap-2">
                {ROLE_FILTERS.map((filter) => (
                  <FilterChip
                    key={filter.label}
                    label={filter.label}
                    isActive={role === filter.value}
                    onClick={() => setRole(filter.value)}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-zinc-500">
                Application
              </p>
              <div className="flex flex-wrap gap-2">
                {APPLICATION_FILTERS.map((filter) => (
                  <FilterChip
                    key={filter.label}
                    label={filter.label}
                    isActive={applicationStatus === filter.value}
                    onClick={() => setApplicationStatus(filter.value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </SectionCard>

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
            title={
              filtersActive ? "No users match your filters" : "No users found"
            }
            description={
              filtersActive
                ? "Try adjusting your search or filters."
                : "Registered users will appear here."
            }
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
