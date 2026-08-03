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
import {
  getMyRealtorProfile,
  getMyRealtorProperties,
  updateMyRealtorProfile,
  uploadImage,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"

const AVATAR_OUTPUT_SIZE = 512
const AVATAR_CROP_PREVIEW_SIZE = 176
const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const

const WORKSPACE_SEARCH_ID = "realtor-workspace-search"

const workspaceShellClassName =
  "min-h-screen bg-[#1B1B1B] text-[#F5F5F5] px-5 py-6 pb-24 md:px-8 md:py-8 md:pb-28"

const workspaceContainerClassName = "mx-auto max-w-[1280px] space-y-5 md:space-y-6"

const workspaceCardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const workspacePrimaryCtaClassName =
  "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] md:h-14"

const workspaceSecondaryLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const workspaceInputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] py-3 pl-11 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const workspaceErrorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const workspaceBadgeGoldClassName =
  "inline-flex rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const workspaceBadgeMutedClassName =
  "inline-flex rounded-full border border-white/10 bg-[#252525] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#B8B8B8]"

const workspaceStatCardClassName =
  "rounded-2xl border border-white/8 bg-[#252525] px-4 py-3 md:py-4"

const workspaceIconButtonClassName =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-[#DFC58A] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new window.Image()

    image.onload = () => resolve(image)
    image.onerror = () => reject(new Error("Failed to load image"))
    image.src = src
  })
}

function getAvatarCropSize(
  imageWidth: number,
  imageHeight: number,
  zoom: number
): number {
  return Math.min(imageWidth, imageHeight) / zoom
}

function clampAvatarPan(
  offsetX: number,
  offsetY: number,
  imageWidth: number,
  imageHeight: number,
  zoom: number
) {
  const cropSize = getAvatarCropSize(imageWidth, imageHeight, zoom)
  const panScale = AVATAR_CROP_PREVIEW_SIZE / cropSize
  const maxPanX = ((imageWidth - cropSize) / 2) * panScale
  const maxPanY = ((imageHeight - cropSize) / 2) * panScale

  return {
    offsetX: Math.max(-maxPanX, Math.min(maxPanX, offsetX)),
    offsetY: Math.max(-maxPanY, Math.min(maxPanY, offsetY)),
  }
}

async function createCroppedAvatarFile(
  image: HTMLImageElement,
  zoom: number,
  offsetX: number,
  offsetY: number,
  sourceFile: File
): Promise<File> {
  const canvas = document.createElement("canvas")
  canvas.width = AVATAR_OUTPUT_SIZE
  canvas.height = AVATAR_OUTPUT_SIZE

  const context = canvas.getContext("2d")

  if (!context) {
    throw new Error("Canvas not supported")
  }

  const cropSize = getAvatarCropSize(image.width, image.height, zoom)
  // Preview pan is in viewport pixels; convert to image-space center shift.
  const panScale = cropSize / AVATAR_CROP_PREVIEW_SIZE
  const centerX = image.width / 2 - offsetX * panScale
  const centerY = image.height / 2 - offsetY * panScale
  const sourceX = Math.max(
    0,
    Math.min(image.width - cropSize, centerX - cropSize / 2)
  )
  const sourceY = Math.max(
    0,
    Math.min(image.height - cropSize, centerY - cropSize / 2)
  )

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
    <main className={workspaceShellClassName}>
      <div className={workspaceContainerClassName}>
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading workspace</span>
          <div className="h-52 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none md:h-44" />
          <div className="mt-5 h-14 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          <div className="mt-5 h-10 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          <div className="mt-6">
            <PropertyListSkeleton />
          </div>
        </div>
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
  const [avatarOffsetX, setAvatarOffsetX] = useState(0)
  const [avatarOffsetY, setAvatarOffsetY] = useState(0)
  const [avatarImageSize, setAvatarImageSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [isAvatarDragging, setIsAvatarDragging] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const avatarDragStartRef = useRef<{
    pointerId: number
    startX: number
    startY: number
    offsetX: number
    offsetY: number
  } | null>(null)

  const isRealtor = user?.role === "realtor"

  useEffect(() => {
    if (isLoading || !isAuthenticated || !isRealtor) {
      return
    }

    async function loadWorkspace() {
      try {
        setIsDataLoading(true)
        setError("")

        const [propertiesData, profileData] = await Promise.all([
          getMyRealtorProperties(),
          getMyRealtorProfile(),
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
    setAvatarOffsetX(0)
    setAvatarOffsetY(0)
    setAvatarImageSize(null)
    setIsAvatarDragging(false)
    avatarDragStartRef.current = null
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
    setAvatarOffsetX(0)
    setAvatarOffsetY(0)
    setIsAvatarPreviewOpen(true)
    event.target.value = ""

    void loadImageElement(previewUrl).then((image) => {
      setAvatarImageSize({
        width: image.width,
        height: image.height,
      })
    })
  }

  function handleAvatarZoomChange(nextZoom: number) {
    setAvatarZoom(nextZoom)

    if (!avatarImageSize) {
      return
    }

    const clamped = clampAvatarPan(
      avatarOffsetX,
      avatarOffsetY,
      avatarImageSize.width,
      avatarImageSize.height,
      nextZoom
    )

    setAvatarOffsetX(clamped.offsetX)
    setAvatarOffsetY(clamped.offsetY)
  }

  function handleAvatarCropPointerDown(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    if (isAvatarUploading) {
      return
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    avatarDragStartRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      offsetX: avatarOffsetX,
      offsetY: avatarOffsetY,
    }
    setIsAvatarDragging(true)
  }

  function handleAvatarCropPointerMove(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const dragStart = avatarDragStartRef.current

    if (!dragStart || !avatarImageSize || dragStart.pointerId !== event.pointerId) {
      return
    }

    const deltaX = event.clientX - dragStart.startX
    const deltaY = event.clientY - dragStart.startY
    const clamped = clampAvatarPan(
      dragStart.offsetX + deltaX,
      dragStart.offsetY + deltaY,
      avatarImageSize.width,
      avatarImageSize.height,
      avatarZoom
    )

    setAvatarOffsetX(clamped.offsetX)
    setAvatarOffsetY(clamped.offsetY)
  }

  function handleAvatarCropPointerEnd(
    event: React.PointerEvent<HTMLDivElement>
  ) {
    const dragStart = avatarDragStartRef.current

    if (!dragStart || dragStart.pointerId !== event.pointerId) {
      return
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    avatarDragStartRef.current = null
    setIsAvatarDragging(false)
  }

  async function handleAvatarSave() {
    if (!avatarSelectedFile || !avatarPreviewUrl) {
      return
    }

    try {
      setAvatarError("")
      setIsAvatarUploading(true)

      const image = await loadImageElement(avatarPreviewUrl)
      const croppedFile = await createCroppedAvatarFile(
        image,
        avatarZoom,
        avatarOffsetX,
        avatarOffsetY,
        avatarSelectedFile
      )
      const uploaded = await uploadImage(croppedFile)
      const updatedProfile = await updateMyRealtorProfile({
        avatar_url: uploaded.url,
      })

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
      <main className={workspaceShellClassName}>
        <div className={`mx-auto max-w-[1280px] ${workspaceCardClassName}`}>
          <h1 className="text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
            Login required
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Sign in to access your realtor workspace.
          </p>
          <Link href="/login" className={`mt-6 ${workspacePrimaryCtaClassName}`}>
            Go to login
          </Link>
        </div>
      </main>
    )
  }

  if (!isRealtor) {
    return (
      <main className={workspaceShellClassName}>
        <div className={`mx-auto max-w-[1280px] ${workspaceCardClassName}`}>
          <h1 className="text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
            Access denied
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            This workspace is available only for realtor accounts.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className={workspaceShellClassName}>
      <div className={workspaceContainerClassName}>
        <header className={workspaceCardClassName}>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
            Realtor workspace
          </p>

          <div className="mt-4 flex items-start gap-3.5 md:gap-4">
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => avatarInputRef.current?.click()}
                disabled={isAvatarUploading || isAvatarPreviewOpen}
                aria-label="Upload profile photo"
                className="relative h-14 w-14 overflow-hidden rounded-2xl border border-[#DFC58A]/25 bg-[#252525] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-80"
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
                  <div className="flex h-full w-full items-center justify-center text-lg font-semibold text-[#DFC58A]">
                    {getProfileInitials(profile)}
                  </div>
                )}

                {isAvatarUploading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1B1B1B]/70">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#DFC58A] border-t-transparent motion-reduce:animate-none" />
                  </div>
                ) : (
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#DFC58A]/25 bg-[#2D2D2D] text-[#DFC58A]">
                    <Camera className="h-3.5 w-3.5" aria-hidden="true" />
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
              <p className="text-sm font-medium text-[#B8B8B8]">
                {getTimeGreeting()},
              </p>
              <h1 className="mt-0.5 truncate text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
                {greetingName}
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                Manage your listings, track review status, and take the next
                step.
              </p>
              <div className="mt-2.5">
                {profile?.is_verified ? (
                  <span className={workspaceBadgeGoldClassName}>Verified</span>
                ) : (
                  <span className={workspaceBadgeMutedClassName}>
                    Verification soon
                  </span>
                )}
              </div>
            </div>

            <Link
              href="/realtor/profile"
              aria-label={profileActionLabel}
              className={workspaceIconButtonClassName}
            >
              <Pencil className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {avatarError && (
            <p
              role="alert"
              className="mt-3 text-xs font-medium text-red-200/90"
            >
              {avatarError}
            </p>
          )}

          <div className="mt-5 grid grid-cols-2 gap-3 md:max-w-md">
            <div className={workspaceStatCardClassName}>
              <p className="text-2xl font-semibold leading-none text-[#F5F5F5]">
                {stats.active}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-[#B8B8B8]">
                Active listings
              </p>
            </div>
            <div className={workspaceStatCardClassName}>
              <p className="text-2xl font-semibold leading-none text-[#F5F5F5]">
                {stats.pending}
              </p>
              <p className="mt-1.5 text-xs font-semibold text-[#B8B8B8]">
                Pending listings
              </p>
            </div>
          </div>

          <div className="mt-5 space-y-4 border-t border-white/8 pt-5">
            {nextAction && (
              <Link
                href={nextAction.href}
                className={`block rounded-2xl px-4 py-3.5 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] ${
                  nextAction.tone === "urgent"
                    ? "border border-[#DFC58A]/20 bg-[#252525]"
                    : "border border-white/8 bg-[#252525]"
                }`}
              >
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#B8B8B8]">
                  Suggested next step
                </p>
                <p className="mt-1 text-sm font-semibold text-[#F5F5F5]">
                  {nextAction.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#B8B8B8]">
                  {nextAction.description}
                </p>
              </Link>
            )}

            <div>
              <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-[#B8B8B8]">
                <span>Profile completion</span>
                <span className="text-[#F5F5F5]">{profileCompletion}%</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-[#252525]">
                <div
                  className="h-full rounded-full bg-[#DFC58A] transition-all duration-300 motion-reduce:transition-none"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
              {canCreateListing ? (
                <p className="mt-2.5 text-xs leading-relaxed text-[#B8B8B8]">
                  Your profile is complete
                </p>
              ) : (
                <Link
                  href="/realtor/profile"
                  className={`mt-2.5 block ${workspaceSecondaryLinkClassName}`}
                >
                  Complete your profile to publish listings
                </Link>
              )}
            </div>
          </div>
        </header>

        {canCreateListing ? (
          <Link href="/realtor/properties/create" className={workspacePrimaryCtaClassName}>
            <Plus className="h-5 w-5" aria-hidden="true" />
            Add Property
          </Link>
        ) : (
          <Link href="/realtor/profile" className={workspacePrimaryCtaClassName}>
            <Plus className="h-5 w-5" aria-hidden="true" />
            Complete profile to add property
          </Link>
        )}

        {continueEditingProperty && (
          <Link
            href={`/realtor/properties/${continueEditingProperty.id}/edit`}
            className={`flex items-center justify-between ${workspaceCardClassName} transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]`}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#DFC58A]">
                Continue editing
              </p>
              <p className="mt-1 text-sm font-semibold text-[#F5F5F5]">
                {continueEditingProperty.title}
              </p>
              <p className="mt-0.5 text-xs text-[#B8B8B8]">
                {getPropertyStatusLabel(continueEditingProperty.status)}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-[#B8B8B8]" aria-hidden="true" />
          </Link>
        )}

        {actionItems.length > 0 && (
          <section
            aria-labelledby="realtor-action-center-heading"
            className={workspaceCardClassName}
          >
            <div className="mb-3 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#DFC58A]" aria-hidden="true" />
              <h2
                id="realtor-action-center-heading"
                className="text-sm font-semibold text-[#F5F5F5]"
              >
                Action center
              </h2>
            </div>
            <div className="space-y-2">
              {actionItems.map((action) => (
                <Link
                  key={action.id}
                  href={action.href}
                  className={`flex items-center justify-between rounded-2xl px-3 py-3 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] ${
                    action.tone === "urgent"
                      ? "border border-[#DFC58A]/20 bg-[#252525]"
                      : "border border-white/8 bg-[#252525]"
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-[#F5F5F5]">
                      {action.title}
                    </p>
                    <p className="mt-0.5 text-xs text-[#B8B8B8]">
                      {action.description}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-[#B8B8B8]"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </div>
          </section>
        )}

        <section
          aria-label="Listing totals"
          className="grid grid-cols-2 gap-2 sm:grid-cols-4"
        >
          {[
            { label: "Active", value: stats.active },
            { label: "Pending", value: stats.pending },
            { label: "Rented", value: stats.rented },
            { label: "Archived", value: stats.archived },
          ].map((stat) => (
            <div key={stat.label} className={`${workspaceStatCardClassName} text-center`}>
              <p className="text-base font-semibold text-[#F5F5F5]">
                {stat.value}
              </p>
              <p className="text-[10px] font-semibold text-[#B8B8B8]">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        {error && (
          <p role="alert" className={workspaceErrorClassName}>
            {error}
          </p>
        )}

        <section aria-labelledby="realtor-properties-heading" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2
              id="realtor-properties-heading"
              className="text-lg font-semibold text-[#F5F5F5]"
            >
              My properties
            </h2>
            <span className="text-xs font-semibold text-[#B8B8B8]">
              {visibleProperties.length} shown
            </span>
          </div>

          <div>
            <label
              htmlFor={WORKSPACE_SEARCH_ID}
              className="mb-1.5 block text-[13px] font-medium text-[#F5F5F5]"
            >
              Search listings
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#B8B8B8]"
                aria-hidden="true"
              />
              <input
                id={WORKSPACE_SEARCH_ID}
                type="search"
                name="property-search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search title, city, or price"
                className={workspaceInputClassName}
              />
            </div>
          </div>

          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="group"
            aria-label="Filter listings by status"
          >
            {PROPERTY_FILTER_OPTIONS.map((filter) => {
              const isActive = activeFilter === filter.id

              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={isActive}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] motion-reduce:transition-none ${
                    isActive
                      ? "border border-[#DFC58A]/30 bg-[#252525] text-[#DFC58A] ring-1 ring-[#DFC58A]/20"
                      : "border border-white/8 bg-[#2D2D2D] text-[#B8B8B8]"
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 transition-opacity duration-200 motion-reduce:transition-none">
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
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1B1B1B]/80 p-4">
          <div
            className="w-full max-w-md overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 shadow-[0_8px_32px_rgba(0,0,0,0.32)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="avatar-preview-title"
          >
            <h2
              id="avatar-preview-title"
              className="text-lg font-semibold text-[#F5F5F5]"
            >
              Adjust profile photo
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-[#B8B8B8]">
              Zoom and preview how your avatar will appear.
            </p>
            <p className="mt-2 text-xs text-[#B8B8B8]/80">
              Drag to position. Use slider to zoom.
            </p>

            <div
              className={`mx-auto mt-5 flex h-44 w-44 touch-none items-center justify-center overflow-hidden rounded-full border-4 border-[#DFC58A]/25 bg-[#252525] ${
                isAvatarDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              onPointerDown={handleAvatarCropPointerDown}
              onPointerMove={handleAvatarCropPointerMove}
              onPointerUp={handleAvatarCropPointerEnd}
              onPointerCancel={handleAvatarCropPointerEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarPreviewUrl}
                alt="Avatar preview"
                className="pointer-events-none h-full w-full select-none object-cover"
                draggable={false}
                style={{
                  transform: `translate(${avatarOffsetX}px, ${avatarOffsetY}px) scale(${avatarZoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[#B8B8B8]">
                <span>Zoom</span>
                <span className="text-[#F5F5F5]">{avatarZoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.05}
                value={avatarZoom}
                onChange={(event) =>
                  handleAvatarZoomChange(Number(event.target.value))
                }
                disabled={isAvatarUploading}
                className="h-2 w-full cursor-pointer accent-[#DFC58A]"
                aria-label="Avatar zoom"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleAvatarCancel}
                disabled={isAvatarUploading}
                className="flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-sm font-semibold text-[#F5F5F5] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAvatarSave}
                disabled={isAvatarUploading}
                aria-busy={isAvatarUploading}
                className="flex h-12 items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"
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
