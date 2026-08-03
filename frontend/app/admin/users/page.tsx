"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

import AdminUserListCard from "@/components/admin/AdminUserListCard"
import AdminRoute from "@/components/AdminRoute"
import AdminPageShell from "@/components/admin/AdminPageShell"
import {
  getAdminUsers,
  type AdminUserListItem,
} from "@/services/api"

const PAGE_LIMIT = 20
const ADMIN_USERS_RELOAD_KEY = "adminUsersNeedsReload"

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

const filterButtonClassName =
  "inline-flex h-11 shrink-0 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

function getFilterButtonClassName(isActive: boolean): string {
  if (isActive) {
    return `${filterButtonClassName} bg-[#2D2D2D] text-[#DFC58A] underline decoration-[#DFC58A] decoration-2 underline-offset-4`
  }

  return `${filterButtonClassName} border border-white/10 bg-[#252525] text-[#B8B8B8] hover:text-[#F5F5F5]`
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
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <span className="sr-only">Loading users</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
        >
          <div className="flex items-start gap-3">
            <div className="h-12 w-12 animate-pulse rounded-2xl bg-[#252525] motion-reduce:animate-none" />
            <div className="min-w-0 flex-1 space-y-3">
              <div className="h-5 w-2/3 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
              <div className="h-8 w-full animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
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
  const totalPages = Math.max(1, Math.ceil(total / PAGE_LIMIT))
  const hasNextPage = page < totalPages
  const rangeStart = total === 0 ? 0 : (page - 1) * PAGE_LIMIT + 1
  const rangeEnd = Math.min(page * PAGE_LIMIT, total)
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

        const data = await getAdminUsers({
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

  useEffect(() => {
    function checkReloadFlag() {
      if (sessionStorage.getItem(ADMIN_USERS_RELOAD_KEY) === "1") {
        sessionStorage.removeItem(ADMIN_USERS_RELOAD_KEY)
        setReloadKey((current) => current + 1)
      }
    }

    checkReloadFlag()
    window.addEventListener("pageshow", checkReloadFlag)

    return () => {
      window.removeEventListener("pageshow", checkReloadFlag)
    }
  }, [])

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
    setIsLoading(true)
    setReloadKey((current) => current + 1)
  }

  function handleClearFilters() {
    setSearchInput("")
    setDebouncedQuery("")
    setRole("")
    setApplicationStatus("")
    setPage(1)
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#DFC58A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to admin
        </Link>

        <header>
          <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
            User Management
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
            Users
          </h1>
          <p className="mt-2 text-sm text-[#B8B8B8]">
            Search accounts, review roles and application state, and open user
            records for status management.
          </p>
          {!isLoading && !error && (
            <p className="mt-3 text-sm text-[#F5F5F5]">
              <span className="font-semibold text-[#DFC58A]">
                {total.toLocaleString()}
              </span>{" "}
              {total === 1 ? "account" : "accounts"}
            </p>
          )}
        </header>

        <section
          aria-label="Search and filters"
          className="rounded-[24px] border border-white/8 bg-[#252525] p-5"
        >
          <div>
            <label htmlFor="admin-users-search" className="sr-only">
              Search users
            </label>
            <div className="flex gap-2">
              <input
                id="admin-users-search"
                name="q"
                type="search"
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Search by email, name, phone, agency..."
                className="min-h-11 w-full rounded-2xl border border-white/10 bg-[#2D2D2D] px-4 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => setSearchInput("")}
                  className="inline-flex h-11 shrink-0 items-center rounded-2xl border border-white/10 bg-[#2D2D2D] px-4 text-sm font-semibold text-[#B8B8B8] hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
                >
                  Clear
                </button>
              )}
            </div>
            <p className="mt-2 text-xs text-[#B8B8B8]">
              Enter at least 2 characters to search.
            </p>
          </div>

          <div className="mt-5 space-y-4">
            <div role="group" aria-label="Role filters">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
                Role
              </p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {ROLE_FILTERS.map((filter) => (
                  <button
                    key={filter.label}
                    type="button"
                    aria-pressed={role === filter.value}
                    onClick={() => setRole(filter.value)}
                    className={getFilterButtonClassName(role === filter.value)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div role="group" aria-label="Application status filters">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
                Application
              </p>
              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                {APPLICATION_FILTERS.map((filter) => (
                  <button
                    key={filter.label}
                    type="button"
                    aria-pressed={applicationStatus === filter.value}
                    onClick={() => setApplicationStatus(filter.value)}
                    className={getFilterButtonClassName(
                      applicationStatus === filter.value
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {isLoading ? (
          <UsersSkeleton />
        ) : error ? (
          <section
            role="alert"
            className="rounded-[24px] border border-red-400/20 bg-red-950/30 p-5"
          >
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              Unable to load users
            </h2>
            <p className="mt-2 text-sm text-red-100">{error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 inline-flex h-11 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
            >
              Try again
            </button>
          </section>
        ) : users.length === 0 ? (
          <section className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 text-center">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">
              {filtersActive
                ? "No users match your filters"
                : "No users found"}
            </h2>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              {filtersActive
                ? "Try adjusting your search or filters."
                : "Registered users will appear here."}
            </p>
            {filtersActive && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-6 inline-flex h-11 items-center rounded-2xl border border-white/10 bg-[#252525] px-5 text-sm font-semibold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
              >
                Clear filters
              </button>
            )}
          </section>
        ) : (
          <>
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {users.map((user) => (
                <li key={user.id}>
                  <AdminUserListCard user={user} />
                </li>
              ))}
            </ul>

            <nav
              aria-label="Users pagination"
              className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-[#B8B8B8]">
                  Showing{" "}
                  <span className="font-semibold text-[#F5F5F5]">
                    {rangeStart.toLocaleString()}–{rangeEnd.toLocaleString()}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-[#F5F5F5]">
                    {total.toLocaleString()}
                  </span>
                </p>
                <p className="text-sm font-semibold text-[#F5F5F5]">
                  Page {page} of {totalPages}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={page <= 1 || isLoading}
                  aria-label="Previous page"
                  onClick={handlePreviousPage}
                  className="inline-flex h-11 items-center rounded-2xl border border-white/10 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={!hasNextPage || isLoading}
                  aria-label="Next page"
                  onClick={handleNextPage}
                  className="inline-flex h-11 items-center rounded-2xl border border-white/10 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
                >
                  Next
                </button>
              </div>
            </nav>
          </>
        )}
      </AdminPageShell>
    </AdminRoute>
  )
}
