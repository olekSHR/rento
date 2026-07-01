"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Camera, ChevronRight, Pencil, Plus, Search, Sparkles } from "lucide-react"

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
  getWorkspaceGreetingName,
  searchProperties,
  type PropertyFilter,
} from "@/lib/realtorWorkspace"
import { getToken } from "@/lib/tokenStorage"
import {
  getMyRealtorProfile,
  getMyRealtorProperties,
  updateMyRealtorProfile,
  uploadImage,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"

const AVATAR_OUTPUT_SIZE = 512
const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Failed to load image"))
    image.src = src
  })
}

async function createCroppedAvatarFile(
  image: HTMLImageElement,
  zoom: number,
  sourceFile: File
): Promise<File> {
  const canvas = document.createElement("canvas")
  canvas.width = AVATAR_OUTPUT_SIZE
  canvas.height = AVATAR_OUTPUT_SIZE

  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Canvas not supported")
  }

  const minSide = Math.min(image.width, image.height)
  // Zoom narrows the source square taken from the image center.
  const cropSize = minSide / zoom
  const sourceX = (image.width - cropSize) / 2
  const sourceY = (image.height - cropSize) / 2

  context.drawImage(
    image,
    sourceX,
    sourceY,
    cropSize,
    cropSize,
    0,
    0,
    AVATAR_OUTPUT_SIZE,
    AVATAR_OUTPUT_SIZE
  )

  const mimeType =
    sourceFile.type === "image/webp" ? "image/webp" : "image/jpeg"
  const extension = mimeType === "image/webp" ? "webp" : "jpg"

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (result) {
          resolve(result)
          return
        }

        reject(new Error("Failed to create image"))
      },
      mimeType,
      0.92
    )
  })

  return new File([blob], `avatar.${extension}`, { type: mimeType })
}

function getTimeGreeting(): string {
  const hour = new Date().getHours()

  if (hour < 12) {
    return "Good morning"
  }

  if (hour < 17) {
    return "Good afternoon"
  }

  return "Good evening"
}

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
        <div className="h-72 animate-pulse rounded-3xl bg-zinc-200" />
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
  const [isAvatarUploading, setIsAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState("")
  const [isAvatarPreviewOpen, setIsAvatarPreviewOpen] = useState(false)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null)
  const [avatarSelectedFile, setAvatarSelectedFile] = useState<File | null>(null)
  const [avatarZoom, setAvatarZoom] = useState(1)
  const avatarInputRef = useRef<HTMLInputElement>(null)

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
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl)
      }
    }
  }, [avatarPreviewUrl])

  function closeAvatarPreview() {
    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }

    setAvatarPreviewUrl(null)
    setAvatarSelectedFile(null)
    setAvatarZoom(1)
    setIsAvatarPreviewOpen(false)

    if (avatarInputRef.current) {
      avatarInputRef.current.value = ""
    }
  }

  function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    if (
      !ALLOWED_AVATAR_TYPES.includes(
        file.type as (typeof ALLOWED_AVATAR_TYPES)[number]
      )
    ) {
      setAvatarError("Failed to upload avatar. Use JPEG, PNG, or WebP.")
      event.target.value = ""
      return
    }

    setAvatarError("")

    if (avatarPreviewUrl) {
      URL.revokeObjectURL(avatarPreviewUrl)
    }

    const previewUrl = URL.createObjectURL(file)

    setAvatarSelectedFile(file)
    setAvatarPreviewUrl(previewUrl)
    setAvatarZoom(1)
    setIsAvatarPreviewOpen(true)
    event.target.value = ""
  }

  async function handleAvatarSave() {
    if (!avatarSelectedFile || !avatarPreviewUrl) {
      return
    }

    const token = getToken()

    if (!token) {
      return
    }

    try {
      setAvatarError("")
      setIsAvatarUploading(true)

      const image = await loadImageElement(avatarPreviewUrl)
      const croppedFile = await createCroppedAvatarFile(
        image,
        avatarZoom,
        avatarSelectedFile
      )
      const uploaded = await uploadImage(croppedFile, token)
      const updatedProfile = await updateMyRealtorProfile(
        { avatar_url: uploaded.url },
        token
      )

      setProfile(updatedProfile)
      closeAvatarPreview()
    } catch {
      setAvatarError("Failed to upload avatar. Use JPEG, PNG, or WebP.")
    } finally {
      setIsAvatarUploading(false)
    }
  }

  function handleAvatarCancel() {
    closeAvatarPreview()
  }

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

  const greetingName = getWorkspaceGreetingName(profile, user?.email)
  const nextAction = actionItems[0] ?? null

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
        <header className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="bg-gradient-to-br from-blue-700 via-blue-700 to-blue-800 px-5 pb-5 pt-5 text-white">
            <div className="flex items-start gap-3.5">
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isAvatarUploading || isAvatarPreviewOpen}
                  aria-label="Upload profile photo"
                  className="relative h-14 w-14 overflow-hidden rounded-2xl bg-blue-600 ring-2 ring-white/20 active:scale-95 disabled:opacity-80"
                >
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

                  {isAvatarUploading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/60">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    </div>
                  ) : (
                    <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm ring-2 ring-blue-700">
                      <Camera className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-blue-100">
                  {getTimeGreeting()},
                </p>
                <h1 className="mt-0.5 truncate text-2xl font-extrabold tracking-tight">
                  {greetingName}
                </h1>
                <div className="mt-2.5">
                  {profile?.is_verified ? (
                    <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white ring-1 ring-white/25">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-blue-100 ring-1 ring-white/20">
                      Verification soon
                    </span>
                  )}
                </div>
              </div>

              <Link
                href="/realtor/profile"
                aria-label={profileActionLabel}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20 active:scale-95"
              >
                <Pencil className="h-5 w-5" />
              </Link>
            </div>

            {avatarError && (
              <p className="mt-3 text-xs font-medium text-red-200">
                {avatarError}
              </p>
            )}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <p className="text-2xl font-extrabold leading-none">
                  {stats.active}
                </p>
                <p className="mt-1.5 text-xs font-semibold text-blue-100">
                  Active listings
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
                <p className="text-2xl font-extrabold leading-none">
                  {stats.pending}
                </p>
                <p className="mt-1.5 text-xs font-semibold text-blue-100">
                  Pending listings
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 px-5 py-5">
            {nextAction && (
              <Link
                href={nextAction.href}
                className={`block rounded-2xl px-4 py-3.5 active:scale-[0.99] ${
                  nextAction.tone === "urgent"
                    ? "bg-blue-50 ring-1 ring-blue-100"
                    : "bg-zinc-50 ring-1 ring-zinc-100"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                  Suggested next step
                </p>
                <p className="mt-1 text-sm font-bold text-zinc-900">
                  {nextAction.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">
                  {nextAction.description}
                </p>
              </Link>
            )}

            <div>
              <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-zinc-500">
                <span>Profile completion</span>
                <span className="text-zinc-900">{profileCompletion}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-300"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              {canCreateListing ? (
                <p className="mt-2.5 text-xs leading-relaxed text-zinc-500">
                  Your profile is complete
                </p>
              ) : (
                <Link
                  href="/realtor/profile"
                  className="mt-2.5 block text-xs font-semibold leading-relaxed text-blue-700 active:opacity-80"
                >
                  Complete your profile to publish listings
                </Link>
              )}
            </div>
          </div>
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
      />

      {isAvatarPreviewOpen && avatarPreviewUrl && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4">
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white p-5 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-preview-title"
          >
            <h2
              id="avatar-preview-title"
              className="text-lg font-bold text-zinc-900"
            >
              Adjust profile photo
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Zoom and preview how your avatar will appear.
            </p>

            <div className="mx-auto mt-6 flex h-44 w-44 items-center justify-center overflow-hidden rounded-full bg-zinc-100 ring-4 ring-blue-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarPreviewUrl}
                alt="Avatar preview"
                className="h-full w-full object-cover"
                style={{
                  transform: `scale(${avatarZoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-zinc-500">
                <span>Zoom</span>
                <span className="text-zinc-900">{avatarZoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={avatarZoom}
                onChange={(event) =>
                  setAvatarZoom(Number(event.target.value))
                }
                disabled={isAvatarUploading}
                className="h-2 w-full cursor-pointer accent-blue-700"
                aria-label="Avatar zoom"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAvatarCancel}
                disabled={isAvatarUploading}
                className="flex h-12 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700 active:scale-[0.98] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAvatarSave}
                disabled={isAvatarUploading}
                className="flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white active:scale-[0.98] disabled:opacity-60"
              >
                {isAvatarUploading ? "Saving..." : "Save photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
