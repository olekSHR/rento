"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Camera, ChevronRight, Plus } from "lucide-react"

import { getImageUrl } from "@/lib/getImageUrl"
import { computeProfileCompletionPercent } from "@/lib/realtorWorkspace"
import {
  getTelegramUsernameInputError,
  TELEGRAM_USERNAME_VALIDATION_MESSAGE,
} from "@/lib/telegram"
import {
  getMyRealtorProfile,
  updateMyRealtorProfile,
  uploadImage,
  type RealtorProfile,
} from "@/services/api"

const PROFILE_FORM_ID = "realtor-profile-form"
const PROFILE_ERROR_ID = "realtor-profile-error"
const PROFILE_SUCCESS_ID = "realtor-profile-success"
const TELEGRAM_ERROR_ID = "realtor-profile-telegram-error"

const AVATAR_OUTPUT_SIZE = 512
const AVATAR_CROP_PREVIEW_SIZE = 176
const ALLOWED_AVATAR_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const

const shellClassName =
  "min-h-screen bg-[#1B1B1B] text-[#F5F5F5] px-5 py-6 pb-24 md:px-8 md:py-8 md:pb-28"

const containerClassName = "mx-auto max-w-[1280px] space-y-5 md:space-y-6"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const surfaceClassName =
  "rounded-2xl border border-white/8 bg-[#252525] px-4 py-3 md:py-4"

const primaryButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-12"

const secondaryLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const inputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"

const labelClassName = "mb-2 block text-sm font-semibold text-[#F5F5F5]"

const badgeGoldClassName =
  "inline-flex rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const badgeMutedClassName =
  "inline-flex rounded-full border border-white/10 bg-[#252525] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#B8B8B8]"

const errorAlertClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const successStatusClassName =
  "rounded-xl border border-emerald-400/15 bg-[#222A24] px-4 py-3 text-sm font-medium leading-relaxed text-emerald-100/90"

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

function ProfileSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-5 md:space-y-6">
      <span className="sr-only">Loading profile</span>
      <div className="h-28 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none md:h-24" />
      <div className="grid gap-5 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-6">
        <div className="h-80 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
        <div className="space-y-4">
          <div className="h-14 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          <div className="h-14 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          <div className="h-32 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  )
}

export default function RealtorProfilePage() {
  const [profile, setProfile] = useState<RealtorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [telegramError, setTelegramError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    telegram_username: "",
    agency_name: "",
    avatar_url: "",
    bio: "",
    city: "",
  })

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
    async function loadProfile() {
      try {
        const data = await getMyRealtorProfile()

        setProfile(data)

        setFormData({
          full_name: data.full_name || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
          telegram_username: data.telegram_username || "",
          agency_name: data.agency_name || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
          city: data.city || "",
        })
      } catch {
        setError("Failed to load profile")
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [])

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl)
      }
    }
  }, [avatarPreviewUrl])

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target

    if (name === "telegram_username") {
      setTelegramError(getTelegramUsernameInputError(value) ?? "")
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextTelegramError =
      getTelegramUsernameInputError(formData.telegram_username) ?? ""

    setError("")
    setTelegramError(nextTelegramError)
    setSuccess("")

    if (nextTelegramError) {
      return
    }

    try {
      setIsSaving(true)

      const updatedProfile = await updateMyRealtorProfile({
        full_name: formData.full_name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        telegram_username: formData.telegram_username,
        agency_name: formData.agency_name,
        bio: formData.bio,
        city: formData.city,
      })

      setProfile(updatedProfile)
      setSuccess("Profile saved")
    } catch (saveError) {
      const message =
        saveError instanceof Error && saveError.message.trim().length > 0
          ? saveError.message
          : "Failed to save profile"

      if (message === TELEGRAM_USERNAME_VALIDATION_MESSAGE) {
        setTelegramError(message)
        setError("")
      } else {
        setError(message)
      }
    } finally {
      setIsSaving(false)
    }
  }

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

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
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
      setFormData((prev) => ({
        ...prev,
        avatar_url: uploaded.url,
      }))
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

  const isCompleted = profile?.is_completed ?? false
  const profileCompletion = computeProfileCompletionPercent(profile)
  const avatarUrl = profile?.avatar_url ? getImageUrl(profile.avatar_url) : null

  return (
    <main className={shellClassName}>
        <div className={containerClassName}>
          <header className={cardClassName}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
                  Realtor profile
                </p>
                <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
                  Profile
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B8B8B8]">
                  Complete your profile so contact details appear on listings and
                  your public realtor presence stays accurate.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:shrink-0">
                <Link href="/realtor" className={secondaryLinkClassName}>
                  Back to dashboard
                </Link>
                <button
                  type="submit"
                  form={PROFILE_FORM_ID}
                  disabled={isSaving || isLoading}
                  aria-busy={isSaving}
                  className={`${primaryButtonClassName} w-full sm:w-auto`}
                >
                  {isSaving ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </div>
          </header>

          {error && !isLoading && (
            <p
              id={PROFILE_ERROR_ID}
              role="alert"
              className={errorAlertClassName}
            >
              {error}
            </p>
          )}

          {isLoading ? (
            <ProfileSkeleton />
          ) : (
            <div className="grid gap-5 md:grid-cols-[minmax(0,360px)_minmax(0,1fr)] md:gap-6">
              <aside className="space-y-5 md:space-y-6">
                <section
                  aria-labelledby="realtor-profile-avatar-heading"
                  className={cardClassName}
                >
                  <h2
                    id="realtor-profile-avatar-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Profile photo
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                    Used on your listings and public realtor presence.
                  </p>

                  <div className="mt-5 flex flex-col items-center">
                    <div className="relative shrink-0">
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        disabled={isAvatarUploading || isAvatarPreviewOpen}
                        aria-label="Upload profile photo"
                        className="relative h-24 w-24 overflow-hidden rounded-[24px] border border-[#DFC58A]/25 bg-[#252525] transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-80"
                      >
                        {avatarUrl ? (
                          <Image
                            src={avatarUrl}
                            alt={getProfileDisplayName(profile)}
                            fill
                            unoptimized
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-[#DFC58A]">
                            {getProfileInitials(profile)}
                          </div>
                        )}

                        {isAvatarUploading ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#1B1B1B]/70">
                            <span className="h-5 w-5 animate-spin rounded-full border-2 border-[#DFC58A] border-t-transparent motion-reduce:animate-none" />
                          </div>
                        ) : (
                          <span className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border border-[#DFC58A]/25 bg-[#2D2D2D] text-[#DFC58A]">
                            <Camera className="h-4 w-4" aria-hidden="true" />
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

                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      disabled={isAvatarUploading || isAvatarPreviewOpen}
                      className={`mt-4 ${secondaryLinkClassName}`}
                    >
                      Upload photo
                    </button>
                  </div>

                  {avatarError && (
                    <p role="alert" className="mt-4 text-xs font-medium text-red-200/90">
                      {avatarError}
                    </p>
                  )}
                </section>

                <section
                  aria-labelledby="realtor-profile-status-heading"
                  className={cardClassName}
                >
                  <h2
                    id="realtor-profile-status-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Profile status
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {profile?.is_verified ? (
                      <span className={badgeGoldClassName}>Verified</span>
                    ) : (
                      <span className={badgeMutedClassName}>
                        Verification soon
                      </span>
                    )}

                    <span
                      className={
                        isCompleted ? badgeGoldClassName : badgeMutedClassName
                      }
                    >
                      {isCompleted ? "Complete" : "Incomplete"}
                    </span>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2.5 flex items-center justify-between text-xs font-semibold text-[#B8B8B8]">
                      <span>Profile completion</span>
                      <span className="text-[#F5F5F5]">{profileCompletion}%</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-[#252525]">
                      <div
                        className="h-full rounded-full bg-[#DFC58A] transition-all duration-300 motion-reduce:transition-none"
                        style={{ width: `${profileCompletion}%` }}
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={profileCompletion}
                        aria-label="Profile completion"
                      />
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#B8B8B8]">
                      {isCompleted
                        ? "Your profile is complete"
                        : "Required: full name, city, and phone or WhatsApp."}
                    </p>
                  </div>
                </section>

                <section
                  aria-labelledby="realtor-profile-actions-heading"
                  className={cardClassName}
                >
                  <h2
                    id="realtor-profile-actions-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Quick actions
                  </h2>

                  <ul className="mt-4 space-y-2">
                    <li>
                      <Link
                        href="/realtor"
                        className={`flex min-h-11 items-center justify-between ${surfaceClassName} transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]`}
                      >
                        <span className="text-sm font-semibold text-[#F5F5F5]">
                          Back to dashboard
                        </span>
                        <ChevronRight
                          className="h-4 w-4 text-[#B8B8B8]"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>

                    {isCompleted && (
                      <li>
                        <Link
                          href="/realtor/properties/create"
                          className={`flex min-h-11 items-center justify-between ${surfaceClassName} transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]`}
                        >
                          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5F5F5]">
                            <Plus className="h-4 w-4 text-[#DFC58A]" aria-hidden="true" />
                            Add property
                          </span>
                          <ChevronRight
                            className="h-4 w-4 text-[#B8B8B8]"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    )}
                  </ul>
                </section>
              </aside>

              <section className={cardClassName}>
                <h2 className="text-sm font-semibold text-[#F5F5F5]">
                  Contact and profile details
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                  This information is used automatically in your rental listings.
                </p>

                <form
                  id={PROFILE_FORM_ID}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                  aria-describedby={
                    error
                      ? PROFILE_ERROR_ID
                      : success
                        ? PROFILE_SUCCESS_ID
                        : undefined
                  }
                >
                  <div>
                    <label htmlFor="realtor-profile-full-name" className={labelClassName}>
                      Full name
                    </label>
                    <input
                      id="realtor-profile-full-name"
                      type="text"
                      name="full_name"
                      autoComplete="name"
                      value={formData.full_name}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={inputClassName}
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label htmlFor="realtor-profile-phone" className={labelClassName}>
                        Phone
                      </label>
                      <input
                        id="realtor-profile-phone"
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSaving}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label htmlFor="realtor-profile-whatsapp" className={labelClassName}>
                        WhatsApp
                      </label>
                      <input
                        id="realtor-profile-whatsapp"
                        type="tel"
                        name="whatsapp"
                        autoComplete="tel"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        disabled={isSaving}
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="realtor-profile-telegram-username"
                      className={labelClassName}
                    >
                      Telegram username
                    </label>
                    <input
                      id="realtor-profile-telegram-username"
                      type="text"
                      name="telegram_username"
                      autoComplete="off"
                      placeholder="@username"
                      value={formData.telegram_username}
                      onChange={handleChange}
                      disabled={isSaving}
                      aria-invalid={telegramError ? true : undefined}
                      aria-describedby={
                        telegramError ? TELEGRAM_ERROR_ID : undefined
                      }
                      className={inputClassName}
                    />
                    {telegramError ? (
                      <p
                        id={TELEGRAM_ERROR_ID}
                        role="alert"
                        className="mt-2 text-xs font-medium text-red-200/90"
                      >
                        {telegramError}
                      </p>
                    ) : (
                      <p className="mt-2 text-xs text-[#B8B8B8]">
                        Optional. Used for the Telegram contact button on your
                        listings. Must contain 5–32 characters and start with a
                        letter.
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="realtor-profile-agency-name" className={labelClassName}>
                      Agency name
                    </label>
                    <input
                      id="realtor-profile-agency-name"
                      type="text"
                      name="agency_name"
                      autoComplete="organization"
                      value={formData.agency_name}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="realtor-profile-city" className={labelClassName}>
                      City
                    </label>
                    <input
                      id="realtor-profile-city"
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="realtor-profile-bio" className={labelClassName}>
                      Bio
                    </label>
                    <textarea
                      id="realtor-profile-bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={isSaving}
                      className={`${inputClassName} resize-y`}
                    />
                  </div>

                  {success && (
                    <p
                      id={PROFILE_SUCCESS_ID}
                      role="status"
                      className={successStatusClassName}
                    >
                      {success}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSaving}
                    aria-busy={isSaving}
                    className={`${primaryButtonClassName} w-full md:hidden`}
                  >
                    {isSaving ? "Saving..." : "Save Profile"}
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>

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
