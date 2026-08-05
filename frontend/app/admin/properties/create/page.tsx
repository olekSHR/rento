"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useId, useState } from "react"
import { useRouter } from "next/navigation"

import AdminPageShell from "@/components/admin/AdminPageShell"
import AdminRoute from "@/components/AdminRoute"
import PropertyLocationPicker from "@/components/map/PropertyLocationPickerLazy"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  buildCoordinatePayload,
  EMPTY_PROPERTY_LOCATION,
} from "@/lib/propertyLocation"
import {
  addPropertyImage,
  createProperty,
  uploadImage,
} from "@/services/api"

const fieldClassName =
  "w-full min-h-11 rounded-2xl border border-white/10 bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

const labelClassName = "mb-2 block text-sm font-semibold text-[#F5F5F5]"

const primaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:cursor-not-allowed disabled:opacity-50"

export default function CreatePropertyPage() {
  const router = useRouter()
  const formId = useId()

  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [, setImagePreview] = useState("")
  const [uploadError, setUploadError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [qualityError, setQualityError] = useState("")

  const [galleryImages, setGalleryImages] = useState<
    {
      url: string
      is_cover: boolean
      sort_order: number
    }[]
  >([])

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    rooms: "",
    image_url: "",
    status: "available",
    contact_name: "",
    phone: "",
    whatsapp: "",
  })
  const [location, setLocation] = useState(EMPTY_PROPERTY_LOCATION)

  const qualityChecks = [
    {
      label: "Title has at least 8 characters",
      passed: formData.title.trim().length >= 8,
    },
    {
      label: "Description has at least 40 characters",
      passed: formData.description.trim().length >= 40,
    },
    {
      label: "Price is greater than 0",
      passed: Number(formData.price) > 0,
    },
    {
      label: "Rooms is at least 1",
      passed: Number(formData.rooms) >= 1,
    },
    {
      label: "City is filled",
      passed: formData.city.trim().length > 0,
    },
    {
      label: "Phone or WhatsApp is filled",
      passed:
        formData.phone.trim().length > 0 ||
        formData.whatsapp.trim().length > 0,
    },
    {
      label: "At least 1 photo is uploaded",
      passed: galleryImages.length > 0,
    },
  ]

  const isQualityPassed = qualityChecks.every((check) => check.passed)
  const passedCount = qualityChecks.filter((check) => check.passed).length

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setQualityError("")
    setSubmitError("")
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError("")

    try {
      const files = Array.from(e.target.files || [])

      if (files.length === 0) {
        return
      }

      setIsUploading(true)

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

        setFormData((prev) => ({
          ...prev,
          image_url: prev.image_url || response.url,
        }))

        setImagePreview((prev) => prev || response.url)
      }

      e.target.value = ""
    } catch (error) {
      console.error(error)
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload images."
      )
    } finally {
      setIsUploading(false)
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitError("")
    setQualityError("")

    if (!isQualityPassed) {
      setQualityError("Please complete listing quality checks before publishing.")
      return
    }

    try {
      setIsLoading(true)

      const createdProperty = await createProperty({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        city: formData.city,
        rooms: Number(formData.rooms),
        image_url: formData.image_url,
        status: formData.status,
        contact_name: formData.contact_name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        ...buildCoordinatePayload(location),
      })

      await Promise.all(
        galleryImages.map((image) =>
          addPropertyImage(createdProperty.id, {
            url: image.url,
            is_cover: image.is_cover,
            sort_order: image.sort_order,
          })
        )
      )

      router.push("/")
    } catch (error) {
      console.error(error)
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create property."
      )
    } finally {
      setIsLoading(false)
    }
  }

  const fieldIds = {
    title: `${formId}-title`,
    description: `${formId}-description`,
    price: `${formId}-price`,
    city: `${formId}-city`,
    rooms: `${formId}-rooms`,
    status: `${formId}-status`,
    contact_name: `${formId}-contact-name`,
    phone: `${formId}-phone`,
    whatsapp: `${formId}-whatsapp`,
    photos: `${formId}-photos`,
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <Link
          href="/admin/properties"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#DFC58A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to properties
        </Link>

        <header>
          <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
            Property Management
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
            Create Property
          </h1>
          <p className="mt-2 text-sm text-[#B8B8B8]">
            Add a new listing to the marketplace. Complete all quality checks
            before publishing.
          </p>
        </header>

        <div className="mx-auto w-full max-w-2xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"
            aria-busy={isLoading || isUploading}
          >
            {submitError && (
              <div
                role="alert"
                className="rounded-2xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-100"
              >
                {submitError}
              </div>
            )}

            <div>
              <label htmlFor={fieldIds.title} className={labelClassName}>
                Title
              </label>
              <input
                id={fieldIds.title}
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor={fieldIds.description} className={labelClassName}>
                Description
              </label>
              <textarea
                id={fieldIds.description}
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={fieldClassName}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={fieldIds.price} className={labelClassName}>
                  Price
                </label>
                <input
                  id={fieldIds.price}
                  type="number"
                  name="price"
                  required
                  min={0}
                  value={formData.price}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor={fieldIds.rooms} className={labelClassName}>
                  Rooms
                </label>
                <input
                  id={fieldIds.rooms}
                  type="number"
                  name="rooms"
                  required
                  min={1}
                  value={formData.rooms}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>
            </div>

            <div>
              <label htmlFor={fieldIds.city} className={labelClassName}>
                City
              </label>
              <input
                id={fieldIds.city}
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className={fieldClassName}
              />
            </div>

            <div>
              <p className={labelClassName}>Approximate location</p>
              <PropertyLocationPicker
                value={location}
                onChange={setLocation}
              />
            </div>

            <div>
              <label htmlFor={fieldIds.status} className={labelClassName}>
                Status
              </label>
              <select
                id={fieldIds.status}
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={fieldClassName}
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="rented">Rented</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <fieldset className="space-y-4 rounded-2xl border border-white/8 bg-[#252525] p-4">
              <legend className="px-1 text-sm font-semibold text-[#F5F5F5]">
                Contact details
              </legend>

              <div>
                <label htmlFor={fieldIds.contact_name} className={labelClassName}>
                  Contact name
                </label>
                <input
                  id={fieldIds.contact_name}
                  type="text"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor={fieldIds.phone} className={labelClassName}>
                  Phone
                </label>
                <input
                  id={fieldIds.phone}
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>

              <div>
                <label htmlFor={fieldIds.whatsapp} className={labelClassName}>
                  WhatsApp
                </label>
                <input
                  id={fieldIds.whatsapp}
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className={fieldClassName}
                />
              </div>
            </fieldset>

            <div>
              <label htmlFor={fieldIds.photos} className={labelClassName}>
                Photos
              </label>

              {uploadError && (
                <div
                  role="alert"
                  className="mb-3 rounded-2xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-100"
                >
                  {uploadError}
                </div>
              )}

              <label
                htmlFor={fieldIds.photos}
                className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-white/15 bg-[#252525] text-[#B8B8B8] transition-colors hover:border-[#DFC58A]/40 focus-within:ring-2 focus-within:ring-[#DFC58A] focus-within:ring-offset-2 focus-within:ring-offset-[#2D2D2D]"
              >
                <input
                  id={fieldIds.photos}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="sr-only"
                />

                {galleryImages.length > 0 ? (
                  <div className="grid w-full grid-cols-2 gap-3 p-3 sm:grid-cols-3">
                    {galleryImages.map((image, index) => (
                      <div
                        key={`${image.url}-${index}`}
                        className="relative h-32 overflow-hidden rounded-2xl border border-white/10"
                      >
                        <Image
                          src={getImageUrl(image.url) || "/placeholder.jpg"}
                          alt={`Uploaded photo ${index + 1}`}
                          fill
                          sizes="(max-width: 768px) 50vw, 200px"
                          className="object-cover"
                        />

                        {image.is_cover && (
                          <span className="absolute left-2 top-2 rounded-full border border-[#DFC58A]/30 bg-[#2A2720] px-3 py-1 text-xs font-semibold text-[#DFC58A]">
                            Cover
                          </span>
                        )}

                        <button
                          type="button"
                          aria-label={`Remove photo ${index + 1}`}
                          onClick={(event) => {
                            event.preventDefault()
                            handleRemoveGalleryImage(index)
                          }}
                          className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1B]/90 text-lg font-bold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center px-4 py-8 text-center">
                    <span
                      className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1B] text-3xl font-light text-[#DFC58A]"
                      aria-hidden="true"
                    >
                      +
                    </span>
                    <span className="text-sm font-semibold text-[#F5F5F5]">
                      {isUploading ? "Uploading photos..." : "Add photos"}
                    </span>
                    <span className="mt-1 text-xs text-[#B8B8B8]">
                      Upload one or more listing images
                    </span>
                  </div>
                )}
              </label>
            </div>

            <section
              aria-labelledby={`${formId}-quality-heading`}
              className="rounded-[24px] border border-white/8 bg-[#252525] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <h2
                    id={`${formId}-quality-heading`}
                    className="text-sm font-bold text-[#F5F5F5]"
                  >
                    Listing quality
                  </h2>
                  <p className="mt-1 text-xs text-[#B8B8B8]">
                    Complete these checks before publishing.
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                    isQualityPassed
                      ? "border border-emerald-400/30 bg-emerald-950/40 text-emerald-200"
                      : "border border-amber-400/30 bg-amber-950/40 text-amber-200"
                  }`}
                >
                  {passedCount}/{qualityChecks.length} complete
                </span>
              </div>

              {qualityError && (
                <div
                  role="alert"
                  className="mb-3 rounded-2xl border border-amber-400/20 bg-amber-950/30 px-4 py-3 text-sm text-amber-100"
                >
                  {qualityError}
                </div>
              )}

              <ul className="space-y-2">
                {qualityChecks.map((check) => (
                  <li
                    key={check.label}
                    className="flex items-start gap-3 text-sm"
                  >
                    <span
                      className={`mt-0.5 inline-flex min-h-6 min-w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold uppercase ${
                        check.passed
                          ? "bg-emerald-700 text-[#F5F5F5]"
                          : "border border-white/10 bg-[#1B1B1B] text-[#B8B8B8]"
                      }`}
                      aria-hidden="true"
                    >
                      {check.passed ? "OK" : "—"}
                    </span>
                    <span className={check.passed ? "text-[#F5F5F5]" : "text-[#B8B8B8]"}>
                      {check.label}
                      <span className="sr-only">
                        {check.passed ? " — complete" : " — incomplete"}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <button
              type="submit"
              disabled={isLoading || !isQualityPassed || isUploading}
              aria-busy={isLoading}
              className={primaryButtonClassName}
            >
              {isLoading ? "Creating..." : "Create property"}
            </button>
          </form>
        </div>
      </AdminPageShell>
    </AdminRoute>
  )
}
