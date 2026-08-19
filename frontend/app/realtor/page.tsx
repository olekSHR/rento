"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useMemo, useRef, useState } from "react"
import { Camera, Pencil, Search } from "lucide-react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import DashboardMetrics from "@/components/realtor/dashboard/DashboardMetrics"
import DashboardQuickActions from "@/components/realtor/dashboard/DashboardQuickActions"
import DashboardRecentPendingRequests from "@/components/realtor/dashboard/DashboardRecentPendingRequests"
import DashboardRequiresAttention from "@/components/realtor/dashboard/DashboardRequiresAttention"
import PropertyBottomSheet from "@/components/realtor/PropertyBottomSheet"
import PropertyEmptyState from "@/components/realtor/PropertyEmptyState"
import PropertyListSkeleton from "@/components/realtor/PropertyListSkeleton"
import RealtorPropertyCard from "@/components/realtor/RealtorPropertyCard"
import { useAuth } from "@/context/AuthContext"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  LISTING_VIEW_OPTIONS,
  REALTOR_PROPERTIES_SECTION_ID,
  buildRequiresAttentionItems,
  computeDashboardMetrics,
  filterPropertiesByView,
  getWorkspaceGreetingName,
  scrollToRealtorPropertiesSection,
  searchProperties,
  type ListingView,
} from "@/lib/realtorWorkspace"
import {
  archiveMyRealtorProperty,
  deleteMyArchivedRealtorProperty,
  getMyRealtorProfile,
  getMyRealtorProperties,
  getRealtorViewingRequests,
  restoreMyRealtorProperty,
  updateMyRealtorProfile,
  uploadImage,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

const AVATAR_OUTPUT_SIZE = 512
const AVATAR_CROP_PREVIEW_SIZE = 176
const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const

const WORKSPACE_SEARCH_ID = "realtor-workspace-search"

// The workspace shell content surface is still light (TASK-015 deviation D1)
// because Viewing Requests depends on it, so this page owns its own dark surface.
const dashboardShellClassName = "min-h-full bg-[#1B1B1B] text-[#F5F5F5]"

const dashboardContainerClassName =
  "mx-auto max-w-[1280px] space-y-5 px-4 py-6 md:px-8 md:py-8"

const listingsShellClassName =
  "bg-[#1B1B1B] px-5 py-6 pb-24 text-[#F5F5F5] md:px-8 md:py-8 md:pb-28"

const listingsContainerClassName = "mx-auto max-w-[1280px] space-y-5 md:space-y-6"

const workspaceInputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] py-3 pl-11 pr-4 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const workspaceErrorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const workspaceBadgeGoldClassName =
  "inline-flex rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const workspaceBadgeMutedClassName =
  "inline-flex rounded-full border border-white/10 bg-[#252525] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#B8B8B8]"

const dashboardIconButtonClassName =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-[#B8B8B8] transition-transform active:scale-95 hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

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
    <div className={dashboardShellClassName}>
      <div className={dashboardContainerClassName}>
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading workspace</span>
          <div className="h-40 animate-pulse rounded-3xl bg-white/10 motion-reduce:animate-none md:h-36" />
          <div className="mt-5 h-12 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none"
              />
            ))}
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <div className="h-56 animate-pulse rounded-3xl bg-white/10 motion-reduce:animate-none" />
            <div className="h-56 animate-pulse rounded-3xl bg-white/10 motion-reduce:animate-none" />
          </div>
          <div className={`mt-8 ${listingsShellClassName}`}>
            <div className={listingsContainerClassName}>
              <PropertyListSkeleton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RealtorWorkspacePage() {
  const { user } = useAuth()

  const [properties, setProperties] = useState<Property[]>([])
  const [profile, setProfile] = useState<RealtorProfile | null>(null)
  const [pendingViewingRequests, setPendingViewingRequests] = useState<
    ViewingRequestRealtor[]
  >([])
  const [pendingViewingRequestTotal, setPendingViewingRequestTotal] = useState(0)
  const [acceptedViewingRequestTotal, setAcceptedViewingRequestTotal] =
    useState(0)
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [listingView, setListingView] = useState<ListingView>("current")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [lifecycleError, setLifecycleError] = useState("")
  const [busyPropertyId, setBusyPropertyId] = useState<number | null>(null)
  const [busyAction, setBusyAction] = useState<
    "archive" | "restore" | "delete" | null
  >(null)
  const [pendingArchiveProperty, setPendingArchiveProperty] =
    useState<Property | null>(null)
  const [pendingDeleteProperty, setPendingDeleteProperty] =
    useState<Property | null>(null)
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

  useEffect(() => {
    async function loadWorkspace() {
      try {
        setIsDataLoading(true)
        setError("")

        const [
          propertiesData,
          profileData,
          pendingViewingRequestsData,
          acceptedViewingRequestsData,
        ] = await Promise.all([
          getMyRealtorProperties(),
          getMyRealtorProfile(),
          getRealtorViewingRequests({ status: "pending", limit: 5 }),
          getRealtorViewingRequests({ status: "accepted", limit: 1 }),
        ])

        setProperties(propertiesData.items || [])
        setProfile(profileData)
        setPendingViewingRequests(pendingViewingRequestsData.items || [])
        setPendingViewingRequestTotal(pendingViewingRequestsData.total)
        setAcceptedViewingRequestTotal(acceptedViewingRequestsData.total)
      } catch {
        setError("Failed to load your workspace")
      } finally {
        setIsDataLoading(false)
      }
    }

    void loadWorkspace()
  }, [])

  useEffect(() => {
    if (isDataLoading) {
      return
    }

    if (window.location.hash === `#${REALTOR_PROPERTIES_SECTION_ID}`) {
      scrollToRealtorPropertiesSection("auto")
    }
  }, [isDataLoading])

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

  function clearLifecycleError() {
    setLifecycleError("")
  }

  function handleArchiveRequest(property: Property) {
    clearLifecycleError()
    setPendingArchiveProperty(property)
  }

  async function handleArchiveConfirm() {
    if (!pendingArchiveProperty) {
      return
    }

    const propertyId = pendingArchiveProperty.id

    try {
      setBusyPropertyId(propertyId)
      setBusyAction("archive")
      clearLifecycleError()

      const updatedProperty = await archiveMyRealtorProperty(propertyId)

      setProperties((previous) =>
        previous.map((property) =>
          property.id === propertyId
            ? {
                ...property,
                status: updatedProperty.status,
                last_verified_at: updatedProperty.last_verified_at,
              }
            : property
        )
      )
      setPendingArchiveProperty(null)
      setSelectedProperty(null)
    } catch (archiveError) {
      setLifecycleError(
        archiveError instanceof Error
          ? archiveError.message
          : "Failed to archive property"
      )
    } finally {
      setBusyPropertyId(null)
      setBusyAction(null)
    }
  }

  async function handleRestore(property: Property) {
    try {
      setBusyPropertyId(property.id)
      setBusyAction("restore")
      clearLifecycleError()

      const updatedProperty = await restoreMyRealtorProperty(property.id)

      setProperties((previous) =>
        previous.map((item) =>
          item.id === property.id
            ? {
                ...item,
                status: updatedProperty.status,
                last_verified_at: updatedProperty.last_verified_at,
              }
            : item
        )
      )
      setSelectedProperty(null)
    } catch (restoreError) {
      setLifecycleError(
        restoreError instanceof Error
          ? restoreError.message
          : "Failed to restore property"
      )
    } finally {
      setBusyPropertyId(null)
      setBusyAction(null)
    }
  }

  function handleDeleteRequest(property: Property) {
    clearLifecycleError()
    setPendingDeleteProperty(property)
  }

  async function handleDeleteConfirm() {
    if (!pendingDeleteProperty) {
      return
    }

    const propertyId = pendingDeleteProperty.id

    try {
      setBusyPropertyId(propertyId)
      setBusyAction("delete")
      clearLifecycleError()

      await deleteMyArchivedRealtorProperty(propertyId)

      setProperties((previous) =>
        previous.filter((property) => property.id !== propertyId)
      )
      setPendingDeleteProperty(null)
      setSelectedProperty(null)
    } catch (deleteError) {
      setLifecycleError(
        deleteError instanceof Error
          ? deleteError.message
          : "Failed to delete property"
      )
    } finally {
      setBusyPropertyId(null)
      setBusyAction(null)
    }
  }

  const currentListingsCount = useMemo(
    () => properties.filter((property) => property.status !== "archived").length,
    [properties]
  )

  const archivedListingsCount = useMemo(
    () => properties.filter((property) => property.status === "archived").length,
    [properties]
  )

  const canCreateListing = profile?.is_completed === true
  const profileActionLabel = canCreateListing
    ? "Edit Profile"
    : "Complete Profile"
  const avatarUrl = profile?.avatar_url
    ? getImageUrl(profile.avatar_url)
    : null

  const dashboardMetrics = useMemo(
    () =>
      computeDashboardMetrics(
        properties,
        pendingViewingRequestTotal,
        acceptedViewingRequestTotal
      ),
    [properties, pendingViewingRequestTotal, acceptedViewingRequestTotal]
  )

  const attentionItems = useMemo(
    () =>
      buildRequiresAttentionItems(
        profile,
        properties,
        pendingViewingRequestTotal
      ),
    [profile, properties, pendingViewingRequestTotal]
  )

  const visibleProperties = useMemo(() => {
    const filtered = filterPropertiesByView(properties, listingView)
    return searchProperties(filtered, searchQuery)
  }, [properties, listingView, searchQuery])

  const greetingName = getWorkspaceGreetingName(profile, user?.email)

  if (isDataLoading) {
    return <WorkspaceSkeleton />
  }

  if (error) {
    return (
      <div className={dashboardShellClassName}>
        <div className={dashboardContainerClassName}>
          <p role="alert" className={workspaceErrorClassName}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={dashboardShellClassName}>
      <div className={dashboardContainerClassName}>
        <header className="rounded-3xl border border-white/8 bg-[#2D2D2D] p-5 md:p-6">
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
                className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/10 bg-[#252525] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-80"
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
                  <span className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#252525] text-[#B8B8B8]">
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
                Review what needs attention and manage your listings.
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
              className={dashboardIconButtonClassName}
            >
              <Pencil className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>

          {avatarError && (
            <p
              role="alert"
              className="mt-3 text-xs font-medium text-red-200"
            >
              {avatarError}
            </p>
          )}
        </header>

        <DashboardQuickActions
          canCreateListing={canCreateListing}
          pendingViewingRequestTotal={pendingViewingRequestTotal}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <DashboardRequiresAttention
            items={attentionItems}
            className="order-3 lg:order-2 lg:col-start-1"
          />
          <DashboardMetrics
            metrics={dashboardMetrics}
            className="order-4 lg:order-1 lg:col-span-2"
          />
          <DashboardRecentPendingRequests
            items={pendingViewingRequests}
            className="order-5 lg:order-2 lg:col-start-2"
          />
        </div>
      </div>

      <section className={listingsShellClassName}>
        <div className={listingsContainerClassName}>
        {lifecycleError && (
          <p role="alert" className={workspaceErrorClassName}>
            {lifecycleError}
          </p>
        )}

        <section aria-labelledby="realtor-properties-heading" className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2
              id="realtor-properties-heading"
              className="text-lg font-semibold text-[#F5F5F5]"
            >
              {listingView === "current" ? "My listings" : "Archived"}
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
            role="tablist"
            aria-label="Listing views"
          >
            {LISTING_VIEW_OPTIONS.map((viewOption) => {
              const isActive = listingView === viewOption.id
              const count =
                viewOption.id === "current"
                  ? currentListingsCount
                  : archivedListingsCount

              return (
                <button
                  key={viewOption.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setListingView(viewOption.id)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] motion-reduce:transition-none ${
                    isActive
                      ? "border border-[#DFC58A]/30 bg-[#252525] text-[#DFC58A] ring-1 ring-[#DFC58A]/20"
                      : "border border-white/8 bg-[#2D2D2D] text-[#B8B8B8]"
                  }`}
                >
                  {viewOption.label}
                  {count > 0 ? ` (${count})` : ""}
                </button>
              )
            })}
          </div>

          {listingView === "current" && currentListingsCount === 0 ? (
            <PropertyEmptyState
              variant="no-listings"
              canCreateListing={canCreateListing}
            />
          ) : listingView === "archived" && archivedListingsCount === 0 ? (
            <PropertyEmptyState variant="no-archived" canCreateListing={false} />
          ) : visibleProperties.length === 0 && searchQuery.trim() ? (
            <PropertyEmptyState variant="no-results" canCreateListing={false} />
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
      </section>
      </div>

      <PropertyBottomSheet
        property={selectedProperty}
        isOpen={selectedProperty !== null}
        listingView={listingView}
        isBusy={busyPropertyId === selectedProperty?.id}
        busyAction={
          busyPropertyId === selectedProperty?.id ? busyAction : null
        }
        onClose={() => setSelectedProperty(null)}
        onArchive={handleArchiveRequest}
        onRestore={handleRestore}
        onDelete={handleDeleteRequest}
      />

      <ConfirmDialog
        isOpen={pendingArchiveProperty !== null}
        isPending={busyAction === "archive"}
        titleId="archive-listing-title"
        title="Archive listing?"
        description={
          pendingArchiveProperty
            ? `"${pendingArchiveProperty.title}" will disappear from your current listings and public search. You can restore it later from Archived.`
            : ""
        }
        confirmLabel="Archive"
        pendingLabel="Archiving..."
        onCancel={() => setPendingArchiveProperty(null)}
        onConfirm={() => void handleArchiveConfirm()}
      />

      <ConfirmDialog
        isOpen={pendingDeleteProperty !== null}
        isPending={busyAction === "delete"}
        titleId="delete-listing-title"
        title="Permanently delete listing?"
        description={
          pendingDeleteProperty
            ? `"${pendingDeleteProperty.title}" will be permanently deleted. This action cannot be undone.`
            : ""
        }
        confirmLabel="Delete permanently"
        pendingLabel="Deleting..."
        destructive
        onCancel={() => setPendingDeleteProperty(null)}
        onConfirm={() => void handleDeleteConfirm()}
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
    </>
  )
}
