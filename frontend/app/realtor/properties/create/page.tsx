"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { BedDouble, MapPin } from "lucide-react"

import RealtorRoute from "@/components/RealtorRoute"
import { getImageUrl } from "@/lib/getImageUrl"
import { getToken } from "@/lib/tokenStorage"
import {
  addPropertyImage,
  createProperty,
  getMyRealtorProfile,
  uploadImage,
} from "@/services/api"

type WizardStep = "details" | "photos" | "preview" | "success"

type GalleryImage = {
  url: string
  is_cover: boolean
  sort_order: number
}

const WIZARD_STEPS: { id: WizardStep; label: string }[] = [
  { id: "details", label: "Details" },
  { id: "photos", label: "Photos" },
  { id: "preview", label: "Preview" },
]

const EMPTY_FORM = {
  title: "",
  description: "",
  price: "",
  city: "",
  rooms: "",
}

function getCoverImageUrl(images: GalleryImage[]): string | undefined {
  return images.find((image) => image.is_cover)?.url ?? images[0]?.url
}

function normalizeDescription(description: string): string {
  const trimmed = description.trim()

  if (trimmed.length >= 10) {
    return trimmed
  }

  return "Rental property available. Contact the realtor for more details."
}

export default function RealtorCreatePropertyPage() {
  const router = useRouter()

  const [isCheckingProfile, setIsCheckingProfile] = useState(true)
  const [step, setStep] = useState<WizardStep>("details")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false)
  const [publishWarning, setPublishWarning] = useState("")
  const [createdPropertyId, setCreatedPropertyId] = useState<number | null>(null)

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    async function checkProfile() {
      try {
        const token = getToken()

        if (!token) {
          router.push("/login")
          return
        }

        const profile = await getMyRealtorProfile(token)

        if (!profile.is_completed) {
          router.replace("/realtor/profile")
          return
        }
      } catch {
        router.replace("/realtor/profile")
      } finally {
        setIsCheckingProfile(false)
      }
    }

    checkProfile()
  }, [router])

  const coverImageUrl = useMemo(
    () => getCoverImageUrl(galleryImages),
    [galleryImages]
  )

  const isDetailsValid =
    formData.title.trim().length > 0 &&
    Number(formData.price) > 0 &&
    formData.city.trim().length > 0 &&
    Number(formData.rooms) > 0

  const canProceedToPreview = galleryImages.length > 0

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || [])

    if (files.length === 0) {
      return
    }

    const token = getToken()

    if (!token) {
      return
    }

    try {
      setIsUploadingPhotos(true)

      for (const file of files) {
        const response = await uploadImage(file, token)

        setGalleryImages((prev) => [
          ...prev,
          {
            url: response.url,
            is_cover: prev.length === 0,
            sort_order: prev.length,
          },
        ])
      }
    } catch (error) {
      console.error(error)
      alert("Failed to upload images")
    } finally {
      setIsUploadingPhotos(false)
      event.target.value = ""
    }
  }

  function handleRemoveGalleryImage(indexToRemove: number) {
    setGalleryImages((prev) => {
      const filtered = prev.filter((_, index) => index !== indexToRemove)

      return filtered.map((image, index) => ({
        ...image,
        is_cover: index === 0,
        sort_order: index,
      }))
    })
  }

  function handleSetCover(index: number) {
    setGalleryImages((prev) =>
      prev.map((image, imageIndex) => ({
        ...image,
        is_cover: imageIndex === index,
      }))
    )
  }

  function resetWizard() {
    setStep("details")
    setFormData(EMPTY_FORM)
    setGalleryImages([])
    setPublishWarning("")
    setCreatedPropertyId(null)
  }

  async function handlePublish() {
    if (!isDetailsValid || !canProceedToPreview) {
      return
    }

    const token = getToken()

    if (!token) {
      router.push("/login")
      return
    }

    try {
      setIsPublishing(true)
      setPublishWarning("")

      const coverUrl = getCoverImageUrl(galleryImages)

      const createdProperty = await createProperty(
        {
          title: formData.title.trim(),
          description: normalizeDescription(formData.description),
          price: Number(formData.price),
          city: formData.city.trim(),
          rooms: Number(formData.rooms),
          ...(coverUrl ? { image_url: coverUrl } : {}),
        },
        token
      )

      const failedImages: string[] = []

      for (const image of galleryImages) {
        try {
          await addPropertyImage(
            createdProperty.id,
            {
              url: image.url,
              is_cover: image.is_cover,
              sort_order: image.sort_order,
            },
            token
          )
        } catch {
          failedImages.push(image.url)
        }
      }

      setCreatedPropertyId(createdProperty.id)

      if (failedImages.length > 0) {
        setPublishWarning(
          `Listing created, but ${failedImages.length} photo(s) could not be attached. You can add them from the edit page.`
        )
      }

      setStep("success")
    } catch (error) {
      console.error(error)
      alert("Failed to publish listing")
    } finally {
      setIsPublishing(false)
    }
  }

  if (isCheckingProfile) {
    return (
      <RealtorRoute>
        <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
          <div className="mx-auto max-w-md space-y-4">
            <div className="h-8 w-48 animate-pulse rounded-2xl bg-zinc-200" />
            <div className="h-40 animate-pulse rounded-3xl bg-zinc-200" />
            <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
          </div>
        </main>
      </RealtorRoute>
    )
  }

  return (
    <RealtorRoute>
      <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
        <div className="mx-auto max-w-md">
          <header className="mb-6">
            <Link
              href="/realtor"
              className="text-sm font-semibold text-blue-700"
            >
              ← Back to workspace
            </Link>

            <p className="mt-4 text-sm font-semibold text-blue-700">
              Publish Listing
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">
              Add Property
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Create a listing, upload photos, and submit for admin review.
            </p>
          </header>

          {step !== "success" && (
            <div className="mb-6 flex gap-2">
              {WIZARD_STEPS.map((wizardStep) => {
                const isActive = step === wizardStep.id
                const isPast =
                  WIZARD_STEPS.findIndex((item) => item.id === step) >
                  WIZARD_STEPS.findIndex((item) => item.id === wizardStep.id)

                return (
                  <div
                    key={wizardStep.id}
                    className={`flex-1 rounded-2xl px-3 py-2 text-center text-xs font-bold ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : isPast
                          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                          : "bg-white text-zinc-400 ring-1 ring-zinc-200"
                    }`}
                  >
                    {wizardStep.label}
                  </div>
                )
              })}
            </div>
          )}

          {step === "details" && (
            <section className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title *"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <textarea
                name="description"
                placeholder="Description (recommended)"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="number"
                name="price"
                placeholder="Price (€) *"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="number"
                name="rooms"
                placeholder="Rooms *"
                value={formData.rooms}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <button
                type="button"
                disabled={!isDetailsValid}
                onClick={() => setStep("photos")}
                className="w-full rounded-2xl bg-blue-700 p-4 font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                Continue to Photos
              </button>
            </section>
          )}

          {step === "photos" && (
            <section className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-900">
                  Property photos
                </label>

                <label className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-zinc-300 bg-white text-zinc-400 transition-all duration-200 active:scale-[0.98]">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {galleryImages.length > 0 ? (
                    <div className="grid w-full grid-cols-2 gap-3 p-3">
                      {galleryImages.map((image, index) => (
                        <div
                          key={`${image.url}-${index}`}
                          className="relative h-32 overflow-hidden rounded-2xl border border-zinc-200"
                        >
                          <Image
                            src={getImageUrl(image.url) || "/placeholder.jpg"}
                            alt={`Preview ${index + 1}`}
                            fill
                            sizes="(max-width: 768px) 50vw, 200px"
                            className="object-cover"
                          />

                          {image.is_cover && (
                            <div className="absolute left-2 top-2 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
                              Cover
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={(clickEvent) => {
                              clickEvent.preventDefault()
                              handleSetCover(index)
                            }}
                            className="absolute bottom-2 left-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-zinc-800"
                          >
                            Set cover
                          </button>

                          <button
                            type="button"
                            onClick={(clickEvent) => {
                              clickEvent.preventDefault()
                              handleRemoveGalleryImage(index)
                            }}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/80 text-sm font-bold text-white"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 text-4xl text-zinc-900">
                        +
                      </span>
                      <span className="text-sm">
                        {isUploadingPhotos ? "Uploading..." : "Add photos"}
                      </span>
                    </>
                  )}
                </label>
              </div>

              <p className="text-xs text-zinc-500">
                Tap &quot;Set cover&quot; to choose the main photo. Photos are
                attached to the listing after you publish.
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white p-4 font-semibold text-zinc-700"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={!canProceedToPreview || isUploadingPhotos}
                  onClick={() => setStep("preview")}
                  className="flex-1 rounded-2xl bg-blue-700 p-4 font-semibold text-white disabled:opacity-50"
                >
                  Preview
                </button>
              </div>
            </section>
          )}

          {step === "preview" && (
            <section className="space-y-4">
              <article className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="relative h-48 bg-zinc-100">
                  {coverImageUrl ? (
                    <Image
                      src={getImageUrl(coverImageUrl) || "/placeholder.jpg"}
                      alt={formData.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 448px) 100vw, 448px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm font-semibold text-zinc-400">
                      No cover photo
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-extrabold text-zinc-900">
                    {formData.title}
                  </h2>

                  <p className="mt-2 text-2xl font-extrabold text-zinc-900">
                    €{Number(formData.price) || 0}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-zinc-600">
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {formData.city}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-3 py-1">
                      <BedDouble className="h-3.5 w-3.5" />
                      {formData.rooms} rooms
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-zinc-600">
                    {formData.description.trim() ||
                      "Description will use a default placeholder if left empty."}
                  </p>
                </div>
              </article>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-900">
                <p className="font-semibold">Before you publish</p>
                <ul className="mt-2 list-disc space-y-1 pl-4 text-blue-800">
                  <li>
                    Contact information will be taken from your realtor profile.
                  </li>
                  <li>
                    After publishing, the listing will be submitted for review.
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("photos")}
                  className="flex-1 rounded-2xl border border-zinc-200 bg-white p-4 font-semibold text-zinc-700"
                >
                  Back
                </button>

                <button
                  type="button"
                  disabled={isPublishing}
                  onClick={handlePublish}
                  className="flex-1 rounded-2xl bg-blue-700 p-4 font-semibold text-white disabled:opacity-50"
                >
                  {isPublishing ? "Publishing..." : "Publish"}
                </button>
              </div>
            </section>
          )}

          {step === "success" && (
            <section className="rounded-3xl border border-emerald-200 bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl">
                ✓
              </div>

              <h2 className="mt-4 text-2xl font-extrabold text-zinc-900">
                Listing submitted
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                After review, it will appear in the catalog.
              </p>

              {publishWarning && (
                <p className="mt-4 rounded-2xl bg-amber-50 p-3 text-left text-sm text-amber-800 ring-1 ring-amber-200">
                  {publishWarning}
                </p>
              )}

              <div className="mt-6 space-y-3">
                <Link
                  href="/realtor"
                  className="flex h-12 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
                >
                  Back to dashboard
                </Link>

                {createdPropertyId && publishWarning && (
                  <Link
                    href={`/realtor/properties/${createdPropertyId}/edit`}
                    className="flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50 text-sm font-bold text-zinc-700"
                  >
                    Finish photos on edit page
                  </Link>
                )}

                <button
                  type="button"
                  onClick={resetWizard}
                  className="flex h-12 w-full items-center justify-center rounded-2xl border border-zinc-200 bg-white text-sm font-bold text-zinc-700"
                >
                  Add another property
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </RealtorRoute>
  )
}
