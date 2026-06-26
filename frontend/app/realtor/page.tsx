"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { ChevronRight, Plus, Search, Sparkles } from "lucide-react"

import PropertyBottomSheet from "@/components/realtor/PropertyBottomSheet"
import PropertyEmptyState from "@/components/realtor/PropertyEmptyState"
import PropertyListSkeleton from "@/components/realtor/PropertyListSkeleton"
import RealtorPropertyCard from "@/components/realtor/RealtorPropertyCard"
import { useAuth } from "@/context/AuthContext"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  PROPERTY_FILTER_OPTIONS,
  buildWorkspaceActions,
  computeProfileCompletionPercent,
  filterProperties,
  getContinueEditingProperty,
  getPropertyStatusLabel,
  searchProperties,
  type PropertyFilter,
} from "@/lib/realtorWorkspace"
import { getToken } from "@/lib/tokenStorage"
import {
  getMyRealtorProfile,
  getMyRealtorProperties,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"

function getProfileDisplayName(profile: RealtorProfile | null): string {
  const name = profile?.full_name?.trim()

  if (name) {
    return name
  }

  return "Realtor Profile"
}

function getProfileInitials(profile: RealtorProfile | null): string {
  const name = profile?.full_name?.trim()

  if (!name) {
    return "R"
  }

  const parts = name.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase()
}

function WorkspaceSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-4">
        <div className="h-28 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
        <div className="h-10 animate-pulse rounded-2xl bg-zinc-200" />
        <PropertyListSkeleton />
      </div>
    </main>
  )
}

export default function RealtorWorkspacePage() {
  const { isLoading, isAuthenticated, user } = useAuth()

  const [properties, setProperties] = useState<Property[]>([])
  const [profile, setProfile] = useState<RealtorProfile | null>(null)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState<PropertyFilter>("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [toastMessage, setToastMessage] = useState("")

  const isRealtor = user?.role === "realtor"

  useEffect(() => {
    if (isLoading || !isAuthenticated || !isRealtor) {
      return
    }

    async function loadWorkspace() {
      try {
        setIsDataLoading(true)
        setError("")

        const token = getToken()
        if (!token) return

        const [propertiesData, profileData] = await Promise.all([
          getMyRealtorProperties(token),
          getMyRealtorProfile(token),
        ])

        setProperties(propertiesData.items || [])
        setProfile(profileData)
      } catch {
        setError("Failed to load your workspace")
      } finally {
        setIsDataLoading(false)
      }
    }

    loadWorkspace()
  }, [isLoading, isAuthenticated, isRealtor])

  useEffect(() => {
    if (!toastMessage) return

    const timer = window.setTimeout(() => setToastMessage(""), 2800)
    return () => window.clearTimeout(timer)
  }, [toastMessage])

  const profileCompletion = computeProfileCompletionPercent(profile)
  const canCreateListing = profile?.is_completed === true
  const profileActionLabel = canCreateListing
    ? "Edit Profile"
    : "Complete Profile"
  const avatarUrl = profile?.avatar_url
    ? getImageUrl(profile.avatar_url)
    : null

  const stats = useMemo(
    () => ({
      active: properties.filter((p) => p.status === "available").length,
      pending: properties.filter((p) => p.status === "pending").length,
      rented: properties.filter((p) => p.status === "rented").length,
      archived: properties.filter((p) => p.status === "archived").length,
    }),
    [properties]
  )

  const actionItems = useMemo(
    () => buildWorkspaceActions(profile, properties),
    [profile, properties]
  )

  const continueEditingProperty = useMemo(
    () => getContinueEditingProperty(properties),
    [properties]
  )

  const visibleProperties = useMemo(() => {
    const filtered = filterProperties(properties, activeFilter)
    return searchProperties(filtered, searchQuery)
  }, [properties, activeFilter, searchQuery])

  const activeFilterLabel =
    PROPERTY_FILTER_OPTIONS.find((option) => option.id === activeFilter)
      ?.label ?? "filtered"

  if (isLoading || (isAuthenticated && isRealtor && isDataLoading)) {
    return <WorkspaceSkeleton />
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Login required</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Sign in to access your realtor workspace.
          </p>
          <Link
            href="/login"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
          >
            Go to login
          </Link>
        </div>
      </main>
    )
  }

  if (!isRealtor) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Access denied</h1>
          <p className="mt-2 text-sm text-zinc-500">
            This workspace is available only for realtor accounts.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-5">
        <header className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-blue-700 ring-2 ring-blue-100">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={getProfileDisplayName(profile)}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
                  {getProfileInitials(profile)}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-extrabold tracking-tight text-zinc-900">
                {getProfileDisplayName(profile)}
              </h1>
              <p className="mt-0.5 text-sm text-zinc-500">Realtor Workspace</p>
              <div className="mt-2">
                {profile?.is_verified ? (
                  <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                    Verified
                  </span>
                ) : (
                  <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-semibold text-zinc-500 ring-1 ring-zinc-200">
                    Verification soon
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/realtor/profile"
              aria-label={profileActionLabel}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-500 ring-1 ring-zinc-200 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-500">
              <span>Profile completion</span>
              <span className="text-zinc-900">{profileCompletion}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <Link
            href="/realtor/profile"
            className="mt-4 flex h-11 w-full items-center justify-center rounded-2xl bg-zinc-900 text-sm font-bold text-white active:scale-[0.98]"
          >
            {profileActionLabel}
          </Link>
        </header>

        {canCreateListing ? (
          <Link
            href="/realtor/properties/create"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.28)] active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            Add Property
          </Link>
        ) : (
          <Link
            href="/realtor/profile"
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.28)] active:scale-[0.98]"
          >
            <Plus className="h-5 w-5" />
            Complete profile to add property
          </Link>
        )}

        {continueEditingProperty && (
          <Link
            href={`/realtor/properties/${continueEditingProperty.id}/edit`}
            className="flex items-center justify-between rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm active:scale-[0.99]"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Continue editing
              </p>
              <p className="mt-1 text-sm font-bold text-zinc-900">
                {continueEditingProperty.title}
              </p>
              <p className="mt-0.5 text-xs text-zinc-500">
                {getPropertyStatusLabel(continueEditingProperty.status)}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </Link>
        )}

        {actionItems.length > 0 && (
          <section className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-700" />
              <h2 className="text-sm font-bold text-zinc-900">Action center</h2>
            </div>
            <div className="space-y-2">
              {actionItems.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className={`flex items-center justify-between rounded-2xl px-3 py-3 ${
                    action.tone === "urgent"
                      ? "bg-blue-50 ring-1 ring-blue-100"
                      : "bg-zinc-50 ring-1 ring-zinc-100"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {action.title}
                    </p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-400" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="grid grid-cols-4 gap-2">
          {[
            { label: "Active", value: stats.active },
            { label: "Pending", value: stats.pending },
            { label: "Rented", value: stats.rented },
            { label: "Archived", value: stats.archived },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-200 bg-white p-2.5 text-center shadow-sm"
            >
              <p className="text-base font-extrabold text-zinc-900">
                {stat.value}
              </p>
              <p className="text-[10px] font-semibold text-zinc-500">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {error && (
          <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 ring-1 ring-red-100">
            {error}
          </p>
        )}

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">My properties</h2>
            <span className="text-xs font-semibold text-zinc-500">
              {visibleProperties.length} shown
            </span>
          </div>

          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search title, city, or price"
              className="w-full rounded-2xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-sm text-zinc-900 outline-none ring-0 placeholder:text-zinc-400"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {PROPERTY_FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "scale-[1.02] bg-zinc-900 text-white shadow-sm"
                      : "bg-white text-zinc-600 ring-1 ring-zinc-200"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          {properties.length === 0 ? (
            <PropertyEmptyState
              variant="no-listings"
              canCreateListing={canCreateListing}
            />
          ) : visibleProperties.length === 0 && searchQuery.trim() ? (
            <PropertyEmptyState variant="no-results" canCreateListing />
          ) : visibleProperties.length === 0 ? (
            <PropertyEmptyState
              variant="no-filter-results"
              filterLabel={activeFilterLabel}
              canCreateListing={canCreateListing}
            />
          ) : (
            <div className="space-y-4 transition-opacity duration-200">
              {visibleProperties.map((property) => (
                <RealtorPropertyCard
                  key={property.id}
                  property={property}
                  onMore={setSelectedProperty}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <PropertyBottomSheet
        property={selectedProperty}
        isOpen={selectedProperty !== null}
        onClose={() => setSelectedProperty(null)}
        onComingSoon={(label) => {
          setToastMessage(`${label} — Coming Soon`)
          setSelectedProperty(null)
        }}
      />

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-zinc-900 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg">
          {toastMessage}
        </div>
      )}
    </main>
  )
}
