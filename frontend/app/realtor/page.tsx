"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import {
  ChevronRight,
  MoreHorizontal,
  Plus,
  Sparkles,
} from "lucide-react"

import { useAuth } from "@/context/AuthContext"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  buildWorkspaceActions,
  computeProfileCompletionPercent,
  filterProperties,
  getContinueEditingProperty,
  getPropertyStatusLabel,
  getPropertyStatusTone,
  getWorkspaceGreetingName,
  type PropertyFilter,
} from "@/lib/realtorWorkspace"
import { getToken } from "@/lib/tokenStorage"
import {
  getMyRealtorProfile,
  getMyRealtorProperties,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"

const PROPERTY_FILTERS: { id: PropertyFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "drafts", label: "Drafts" },
  { id: "archive", label: "Archive" },
]

function WorkspaceSkeleton() {
  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-4">
        <div className="h-28 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
        <div className="h-32 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-20 animate-pulse rounded-2xl bg-zinc-200" />
          <div className="h-20 animate-pulse rounded-2xl bg-zinc-200" />
        </div>
        <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />
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
  const [activeFilter, setActiveFilter] = useState<PropertyFilter>("all")

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

        if (!token) {
          return
        }

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

  const profileCompletion = computeProfileCompletionPercent(profile)
  const greetingName = getWorkspaceGreetingName(profile, user?.email)
  const canCreateListing = profile?.is_completed === true

  const stats = useMemo(() => {
    return {
      active: properties.filter(
        (property) =>
          property.status === "available" || property.status === "reserved"
      ).length,
      drafts: properties.filter((property) => property.status === "pending")
        .length,
      archived: properties.filter(
        (property) =>
          property.status === "archived" || property.status === "rented"
      ).length,
      // TODO: Replace with analytics API when available
      viewsThisWeek: 0,
    }
  }, [properties])

  const actionItems = useMemo(
    () => buildWorkspaceActions(profile, properties),
    [profile, properties]
  )

  const continueEditingProperty = useMemo(
    () => getContinueEditingProperty(properties),
    [properties]
  )

  const filteredProperties = useMemo(
    () => filterProperties(properties, activeFilter),
    [properties, activeFilter]
  )

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
        {/* 1. Header / Welcome */}
        <header className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                Realtor Workspace
              </p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-zinc-900">
                Welcome back, {greetingName}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">
                {profile?.city
                  ? `Managing listings in ${profile.city}`
                  : "Your professional rental workspace"}
              </p>
            </div>

            {profile?.is_verified ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 ring-1 ring-emerald-200">
                Verified
              </span>
            ) : (
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-500 ring-1 ring-zinc-200">
                {/* TODO: Verification workflow in a later phase */}
                Verified soon
              </span>
            )}
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
        </header>

        {/* 2. Primary CTA */}
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

        {/* Returning user: Continue editing */}
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
                {getPropertyStatusLabel(continueEditingProperty.status)} listing
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </Link>
        )}

        {/* 3. Action Center */}
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

        {/* 4. Stats cards */}
        <section className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-lg font-extrabold text-zinc-900">{stats.active}</p>
            <p className="text-[11px] font-semibold text-zinc-500">Active</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-lg font-extrabold text-zinc-900">{stats.drafts}</p>
            <p className="text-[11px] font-semibold text-zinc-500">Drafts</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-lg font-extrabold text-zinc-900">{stats.archived}</p>
            <p className="text-[11px] font-semibold text-zinc-500">Archived</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm">
            <p className="text-lg font-extrabold text-zinc-900">
              {stats.viewsThisWeek > 0 ? stats.viewsThisWeek : "—"}
            </p>
            <p className="text-[11px] font-semibold text-zinc-500">
              Views / week
            </p>
          </div>
        </section>

        {error && (
          <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 ring-1 ring-red-100">
            {error}
          </p>
        )}

        {/* 5. My Properties */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-zinc-900">My properties</h2>
            <span className="text-xs font-semibold text-zinc-500">
              {filteredProperties.length} shown
            </span>
          </div>

          <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
            {PROPERTY_FILTERS.map((filter) => {
              const isActive = activeFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-colors ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "bg-white text-zinc-600 ring-1 ring-zinc-200"
                  }`}
                >
                  {filter.label}
                </button>
              )
            })}
          </div>

          {properties.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-zinc-900">
                Welcome to your workspace
              </h3>
              <p className="mt-2 text-sm text-zinc-500">
                Follow these steps to publish your first rental listing.
              </p>

              <ol className="mt-5 space-y-3">
                <li className="flex gap-3 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    1
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Complete profile
                    </p>
                    <p className="text-xs text-zinc-500">
                      Contacts are pulled automatically into listings.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    2
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Add photos
                    </p>
                    <p className="text-xs text-zinc-500">
                      Listings with photos get more attention.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-100">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                    3
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Publish first property
                    </p>
                    <p className="text-xs text-zinc-500">
                      New listings go to admin moderation.
                    </p>
                  </div>
                </li>
              </ol>

              <Link
                href={
                  canCreateListing
                    ? "/realtor/properties/create"
                    : "/realtor/profile"
                }
                className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
              >
                Create first property
              </Link>
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
              <p className="text-sm font-semibold text-zinc-900">
                No properties in this filter
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Try another category or add a new listing.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProperties.map((property) => {
                const imageUrl = getImageUrl(property.image_url)

                return (
                  <article
                    key={property.id}
                    className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
                  >
                    <div className="relative h-40 bg-zinc-100">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 448px) 100vw, 448px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs font-semibold text-zinc-400">
                          No photo yet
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-bold text-zinc-900">
                            {property.title}
                          </h3>
                          <p className="mt-1 text-sm text-zinc-500">
                            {property.city || "No city"} · {property.rooms || 0}{" "}
                            rooms
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${getPropertyStatusTone(
                            property.status
                          )}`}
                        >
                          {getPropertyStatusLabel(property.status)}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-xl font-extrabold text-zinc-900">
                          €{property.price || 0}
                        </p>
                        <p className="text-xs font-semibold text-zinc-400">
                          {/* TODO: Property views API */}
                          — views
                        </p>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Link
                          href={`/realtor/properties/${property.id}/edit`}
                          className="flex h-10 flex-1 items-center justify-center rounded-2xl bg-zinc-900 text-sm font-bold text-white"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          aria-label="More actions"
                          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-zinc-500"
                          disabled
                          title="More actions coming soon"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
