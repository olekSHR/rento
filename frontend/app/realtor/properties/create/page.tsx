"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useId, useRef, useState } from "react"
import { BedDouble, MapPin, Upload } from "lucide-react"

import RealtorRoute from "@/components/RealtorRoute"
import { getImageUrl } from "@/lib/getImageUrl"
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

const shellClassName =
  "min-h-screen bg-[#1B1B1B] text-[#F5F5F5] px-5 py-6 pb-24 md:px-8 md:py-8 md:pb-28"

const containerClassName = "mx-auto max-w-[1280px] space-y-5 md:space-y-6"

const wizardColumnClassName = "mx-auto w-full max-w-xl space-y-5 md:space-y-6"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const surfaceClassName =
  "rounded-2xl border border-white/8 bg-[#252525] px-4 py-3 md:py-4"

const primaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-12"

const secondaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-2xl border border-white/10 bg-[#252525] px-5 text-sm font-semibold text-[#F5F5F5] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-60 md:min-h-12"

const secondaryLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const inputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60 aria-[invalid=true]:border-red-400/40"

const labelClassName = "mb-2 block text-sm font-semibold text-[#F5F5F5]"

const errorAlertClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const warningAlertClassName =
  "rounded-xl border border-amber-400/15 bg-[#2A2720] px-4 py-3 text-left text-sm font-medium leading-relaxed text-amber-100/90"

const infoPanelClassName =
  "rounded-2xl border border-[#DFC58A]/15 bg-[#252525] p-4 text-sm text-[#F5F5F5]"

const overlayBadgeClassName =
  "absolute left-2 top-2 rounded-full bg-[#1B1B1B]/80 px-3 py-1 text-xs font-semibold text-[#F5F5F5]"

const overlayActionClassName =
  "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#1B1B1B]/80 text-sm font-bold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

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

function CreateWizardSkeleton() {
  return (
    <div role="status" aria-live="polite" className={wizardColumnClassName}>
      <span className="sr-only">Loading create listing wizard</span>
      <div className="h-28 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none md:h-24" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-72 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
    </div>
  )
}

export default function RealtorCreatePropertyPage() {
  const router = useRouter()
  const photoInputId = useId()
  const photoInputRef = useRef<HTMLInputElement>(null)

  const [isCheckingProfile, setIsCheckingProfile] = useState(true)
  const [step, setStep] = useState<WizardStep>("details")
  const [isPublishing, setIsPublishing] = useState(false)
  const [isUploadingPhotos, setIsUploadingPhotos] = useState(false)
  const [publishWarning, setPublishWarning] = useState("")
  const [createdPropertyId, setCreatedPropertyId] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState("")
  const [publishError, setPublishError] = useState("")

  const [formData, setFormData] = useState(EMPTY_FORM)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    async function checkProfile() {
      try {
        const profile = await getMyRealtorProfile()

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

    try {
      setUploadError("")
      setIsUploadingPhotos(true)

      for (const file of files) {
        const response = await uploadImage(file)

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
      setUploadError("Failed to upload images")
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
    setUploadError("")
    setPublishError("")
  }

  async function handlePublish() {
    if (!isDetailsValid || !canProceedToPreview) {
      return
    }

    try {
      setPublishError("")
      setIsPublishing(true)
      setPublishWarning("")

      const coverUrl = getCoverImageUrl(galleryImages)

      const createdProperty = await createProperty({
        title: formData.title.trim(),
        description: normalizeDescription(formData.description),
        price: Number(formData.price),
        city: formData.city.trim(),
        rooms: Number(formData.rooms),
        ...(coverUrl ? { image_url: coverUrl } : {}),
      })

      const failedImages: string[] = []

      for (const image of galleryImages) {
        try {
          await addPropertyImage(createdProperty.id, {
            url: image.url,
            is_cover: image.is_cover,
            sort_order: image.sort_order,
          })
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
      setPublishError("Failed to publish listing")
    } finally {
      setIsPublishing(false)
    }
  }

  if (isCheckingProfile) {
    return (
      <RealtorRoute>
        <main className={shellClassName}>
          <div className={containerClassName}>
            <CreateWizardSkeleton />
          </div>
        </main>
      </RealtorRoute>
    )
  }

  return (
    <RealtorRoute>
      <main className={shellClassName}>
        <div className={containerClassName}>
          <header className={cardClassName}>
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
                  Create listing
                </p>
                <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
                  Add Property
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B8B8B8]">
                  Create a listing, upload photos, and submit for admin review.
                  Contact details are taken from your realtor profile.
                </p>
              </div>

              <Link href="/realtor" className={`${secondaryLinkClassName} md:shrink-0`}>
                Back to dashboard
              </Link>
            </div>
          </header>

          <div className={wizardColumnClassName}>
            {step !== "success" && (
              <nav aria-label="Listing creation steps">
                <ol className="flex gap-2">
                  {WIZARD_STEPS.map((wizardStep) => {
                    const isActive = step === wizardStep.id
                    const isPast =
                      WIZARD_STEPS.findIndex((item) => item.id === step) >
                      WIZARD_STEPS.findIndex((item) => item.id === wizardStep.id)

                    return (
                      <li key={wizardStep.id} className="flex-1">
                        <div
                          aria-current={isActive ? "step" : undefined}
                          className={`rounded-2xl px-3 py-2.5 text-center text-xs font-bold ${
                            isActive
                              ? "border border-[#DFC58A]/25 bg-[#252525] text-[#DFC58A]"
                              : isPast
                                ? "border border-emerald-400/15 bg-[#252525] text-emerald-200/90"
                                : "border border-white/8 bg-[#252525] text-[#B8B8B8]"
                          }`}
                        >
                          {wizardStep.label}
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </nav>
            )}

            {step === "details" && (
              <section aria-labelledby="create-listing-details-heading" className={cardClassName}>
                <h2
                  id="create-listing-details-heading"
                  className="text-sm font-semibold text-[#F5F5F5]"
                >
                  Property details
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                  Required fields must be completed before you upload photos.
                </p>

                <form className="mt-6 space-y-5" onSubmit={(event) => event.preventDefault()}>
                  <div>
                    <label htmlFor="create-listing-title" className={labelClassName}>
                      Title
                    </label>
                    <input
                      id="create-listing-title"
                      type="text"
                      name="title"
                      autoComplete="off"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      aria-invalid={formData.title.trim().length === 0}
                      className={inputClassName}
                    />
                  </div>

                  <div>
                    <label htmlFor="create-listing-description" className={labelClassName}>
                      Description
                    </label>
                    <textarea
                      id="create-listing-description"
                      name="description"
                      rows={4}
                      autoComplete="off"
                      value={formData.description}
                      onChange={handleChange}
                      className={`${inputClassName} resize-y`}
                    />
                    <p
                      id="create-listing-description-help"
                      className="mt-2 text-xs leading-relaxed text-[#B8B8B8]"
                    >
                      Recommended. A default description is used if left empty.
                    </p>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="create-listing-price" className={labelClassName}>
                        Price (€)
                      </label>
                      <input
                        id="create-listing-price"
                        type="number"
                        name="price"
                        min={1}
                        inputMode="numeric"
                        autoComplete="off"
                        required
                        value={formData.price}
                        onChange={handleChange}
                        aria-invalid={!(Number(formData.price) > 0)}
                        className={inputClassName}
                      />
                    </div>

                    <div>
                      <label htmlFor="create-listing-rooms" className={labelClassName}>
                        Rooms
                      </label>
                      <input
                        id="create-listing-rooms"
                        type="number"
                        name="rooms"
                        min={1}
                        inputMode="numeric"
                        autoComplete="off"
                        required
                        value={formData.rooms}
                        onChange={handleChange}
                        aria-invalid={!(Number(formData.rooms) > 0)}
                        className={inputClassName}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="create-listing-city" className={labelClassName}>
                      City
                    </label>
                    <input
                      id="create-listing-city"
                      type="text"
                      name="city"
                      autoComplete="address-level2"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      aria-invalid={formData.city.trim().length === 0}
                      className={inputClassName}
                    />
                  </div>

                  <button
                    type="button"
                    disabled={!isDetailsValid}
                    onClick={() => setStep("photos")}
                    className={primaryButtonClassName}
                  >
                    Continue to Photos
                  </button>
                </form>
              </section>
            )}

            {step === "photos" && (
              <section aria-labelledby="create-listing-photos-heading" className={cardClassName}>
                <h2
                  id="create-listing-photos-heading"
                  className="text-sm font-semibold text-[#F5F5F5]"
                >
                  Property photos
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                  Upload at least one photo before previewing your listing.
                </p>

                {uploadError && (
                  <p role="alert" aria-live="assertive" className={`mt-4 ${errorAlertClassName}`}>
                    {uploadError}
                  </p>
                )}

                <input
                  ref={photoInputRef}
                  id={photoInputId}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="sr-only"
                />

                {galleryImages.length === 0 ? (
                  <button
                    type="button"
                    onClick={() => photoInputRef.current?.click()}
                    disabled={isUploadingPhotos}
                    aria-controls={photoInputId}
                    aria-busy={isUploadingPhotos}
                    className="mt-6 flex min-h-40 w-full cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-white/15 bg-[#252525] text-[#B8B8B8] transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60"
                  >
                    <span className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#2D2D2D] text-[#DFC58A]">
                      {isUploadingPhotos ? (
                        <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#DFC58A] border-t-transparent motion-reduce:animate-none" />
                      ) : (
                        <Upload className="h-7 w-7" aria-hidden="true" />
                      )}
                    </span>
                    <span className="text-sm font-semibold text-[#F5F5F5]">
                      {isUploadingPhotos ? "Uploading..." : "Add photos"}
                    </span>
                  </button>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      {galleryImages.map((image, index) => (
                        <div
                          key={`${image.url}-${index}`}
                          className="relative h-32 overflow-hidden rounded-2xl border border-white/8 bg-[#252525]"
                        >
                          <Image
                            src={getImageUrl(image.url) || "/placeholder.jpg"}
                            alt={`Uploaded photo ${index + 1}`}
                            fill
                            unoptimized
                            sizes="(max-width: 768px) 50vw, 200px"
                            className="object-cover"
                          />

                          {image.is_cover && (
                            <div className={overlayBadgeClassName}>Cover</div>
                          )}

                          <button
                            type="button"
                            onClick={() => handleSetCover(index)}
                            className="absolute bottom-2 left-2 min-h-8 rounded-full bg-[#1B1B1B]/80 px-2.5 py-1 text-[10px] font-bold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
                          >
                            Set cover
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemoveGalleryImage(index)}
                            aria-label={`Remove photo ${index + 1}`}
                            className={overlayActionClassName}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      disabled={isUploadingPhotos}
                      aria-controls={photoInputId}
                      className={secondaryButtonClassName}
                    >
                      {isUploadingPhotos ? "Uploading..." : "Add more photos"}
                    </button>
                  </div>
                )}

                <p className="mt-4 text-xs leading-relaxed text-[#B8B8B8]">
                  Tap &quot;Set cover&quot; to choose the main photo. Photos are
                  attached to the listing after you publish.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className={secondaryButtonClassName}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={!canProceedToPreview || isUploadingPhotos}
                    onClick={() => setStep("preview")}
                    className={primaryButtonClassName}
                  >
                    Preview
                  </button>
                </div>
              </section>
            )}

            {step === "preview" && (
              <section aria-labelledby="create-listing-preview-heading" className="space-y-4">
                <h2 id="create-listing-preview-heading" className="sr-only">
                  Listing preview
                </h2>

                {publishError && (
                  <p role="alert" aria-live="assertive" className={errorAlertClassName}>
                    {publishError}
                  </p>
                )}

                <article className={`overflow-hidden ${cardClassName} p-0`}>
                  <div className="relative h-48 bg-[#252525]">
                    {coverImageUrl ? (
                      <Image
                        src={getImageUrl(coverImageUrl) || "/placeholder.jpg"}
                        alt={formData.title}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 576px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm font-semibold text-[#B8B8B8]">
                        No cover photo
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-[#F5F5F5]">
                      {formData.title}
                    </h3>

                    <p className="mt-2 text-2xl font-semibold text-[#DFC58A]">
                      €{Number(formData.price) || 0}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-[#B8B8B8]">
                      <span className={`inline-flex items-center gap-1 ${surfaceClassName}`}>
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {formData.city}
                      </span>
                      <span className={`inline-flex items-center gap-1 ${surfaceClassName}`}>
                        <BedDouble className="h-3.5 w-3.5" aria-hidden="true" />
                        {formData.rooms} rooms
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-[#B8B8B8]">
                      {formData.description.trim() ||
                        "Description will use a default placeholder if left empty."}
                    </p>
                  </div>
                </article>

                <div className={infoPanelClassName}>
                  <p className="font-semibold text-[#F5F5F5]">Before you publish</p>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-[#B8B8B8]">
                    <li>
                      Contact information will be taken from your realtor profile.
                    </li>
                    <li>
                      After publishing, the listing will be submitted for review.
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setStep("photos")}
                    className={secondaryButtonClassName}
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={isPublishing}
                    aria-busy={isPublishing}
                    onClick={handlePublish}
                    className={primaryButtonClassName}
                  >
                    {isPublishing ? "Publishing..." : "Publish"}
                  </button>
                </div>
              </section>
            )}

            {step === "success" && (
              <section
                aria-labelledby="create-listing-success-heading"
                className={`${cardClassName} text-center`}
                role="status"
                aria-live="polite"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#DFC58A]/25 bg-[#252525] text-2xl text-[#DFC58A]">
                  ✓
                </div>

                <h2
                  id="create-listing-success-heading"
                  className="mt-4 text-2xl font-semibold text-[#F5F5F5]"
                >
                  Listing submitted
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  After review, it will appear in the catalog.
                </p>

                {publishWarning && (
                  <p
                    role="alert"
                    aria-live="assertive"
                    className={`mt-4 ${warningAlertClassName}`}
                  >
                    {publishWarning}
                  </p>
                )}

                <div className="mt-6 space-y-3">
                  <Link href="/realtor" className={primaryButtonClassName}>
                    Back to dashboard
                  </Link>

                  {createdPropertyId && publishWarning && (
                    <Link
                      href={`/realtor/properties/${createdPropertyId}/edit`}
                      className={secondaryButtonClassName}
                    >
                      Finish photos on edit page
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={resetWizard}
                    className={secondaryButtonClassName}
                  >
                    Add another property
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
    </RealtorRoute>
  )
}
