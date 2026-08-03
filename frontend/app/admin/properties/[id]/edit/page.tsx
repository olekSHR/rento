"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useEffect, useId, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import AdminGalleryManager from "@/components/admin/AdminGalleryManager"
import AdminPageShell from "@/components/admin/AdminPageShell"
import AdminRoute from "@/components/AdminRoute"
import { getImageUrl } from "@/lib/getImageUrl"
import {
  getPropertyById,
  updateProperty,
  uploadImage,
} from "@/services/api"
import type { Property } from "@/types/property"

const fieldClassName =
  "w-full min-h-11 rounded-2xl border border-white/10 bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

const labelClassName = "mb-2 block text-sm font-semibold text-[#F5F5F5]"

const primaryButtonClassName =
  "inline-flex min-h-11 w-full items-center justify-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:cursor-not-allowed disabled:opacity-50"

function EditFormSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-4 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
    >
      <span className="sr-only">Loading property details</span>
      <div className="h-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-32 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
      <div className="h-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
    </div>
  )
}

export default function EditPropertyPage() {
  const params = useParams()
  const router = useRouter()
  const formId = useId()

  const propertyId = Number(params.id)
  const isInvalidId = !Number.isFinite(propertyId)

  const [isLoading, setIsLoading] = useState(!isInvalidId)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState("")
  const [loadError, setLoadError] = useState("")
  const [uploadError, setUploadError] = useState("")
  const [saveError, setSaveError] = useState("")

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

  useEffect(() => {
    async function loadProperty() {
      try {
        setIsLoading(true)
        setLoadError("")

        const property: Property = await getPropertyById(propertyId, {
          authenticated: true,
        })

        setFormData({
          title: property.title,
          description: property.description ?? "",
          price: property.price?.toString() ?? "",
          city: property.city ?? "",
          rooms: property.rooms?.toString() ?? "",
          image_url: property.image_url ?? "",
          status: property.status,
          contact_name: property.contact_name ?? "",
          phone: property.phone ?? "",
          whatsapp: property.whatsapp ?? "",
        })

        setImagePreview(property.image_url ?? "")
      } catch (error) {
        console.error(error)
        setLoadError(
          error instanceof Error ? error.message : "Failed to load property."
        )
      } finally {
        setIsLoading(false)
      }
    }

    if (isInvalidId) {
      return
    }

    void loadProperty()
  }, [isInvalidId, propertyId])

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setSaveError("")
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    setUploadError("")

    try {
      const file = e.target.files?.[0]

      if (!file) {
        return
      }

      setIsUploading(true)

      const response = await uploadImage(file)

      setFormData((prev) => ({
        ...prev,
        image_url: response.url,
      }))

      setImagePreview(response.url)
    } catch (error) {
      console.error(error)
      setUploadError(
        error instanceof Error ? error.message : "Failed to upload image."
      )
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaveError("")

    try {
      setIsSaving(true)

      await updateProperty(propertyId, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        city: formData.city,
        rooms: Number(formData.rooms),
        status: formData.status,
        contact_name: formData.contact_name,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
      })

      router.push("/admin/properties")
    } catch (error) {
      console.error(error)
      setSaveError(
        error instanceof Error ? error.message : "Failed to update property."
      )
    } finally {
      setIsSaving(false)
    }
  }

  function getPreviewUrl() {
    return getImageUrl(imagePreview) || ""
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
    photo: `${formId}-photo`,
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
            Edit Property
          </h1>
          <p className="mt-2 text-sm text-[#B8B8B8]">
            Update listing details and manage the property gallery below.
          </p>
          {!isLoading && !loadError && !isInvalidId && (
            <p className="mt-3 text-sm text-[#F5F5F5]">
              Property ID{" "}
              <span className="font-semibold text-[#DFC58A]">#{propertyId}</span>
            </p>
          )}
        </header>

        <div className="mx-auto w-full max-w-2xl space-y-6">
          {isLoading ? (
            <EditFormSkeleton />
          ) : loadError || isInvalidId ? (
            <section
              role="alert"
              className="rounded-[24px] border border-red-400/20 bg-red-950/30 p-5"
            >
              <h2 className="text-base font-semibold text-[#F5F5F5]">
                Unable to load property
              </h2>
              <p className="mt-2 text-sm text-red-100">
                {loadError || "Invalid property ID."}
              </p>
              <Link
                href="/admin/properties"
                className="mt-4 inline-flex min-h-11 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
              >
                Back to properties
              </Link>
            </section>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"
                aria-busy={isSaving || isUploading}
              >
                {saveError && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-100"
                  >
                    {saveError}
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
                  <label htmlFor={fieldIds.photo} className={labelClassName}>
                    Preview photo
                  </label>
                  <p className="mb-3 text-xs text-[#B8B8B8]">
                    Legacy preview upload. Persisted gallery images are managed
                    below.
                  </p>

                  {uploadError && (
                    <div
                      role="alert"
                      className="mb-3 rounded-2xl border border-red-400/20 bg-red-950/30 px-4 py-3 text-sm text-red-100"
                    >
                      {uploadError}
                    </div>
                  )}

                  <label
                    htmlFor={fieldIds.photo}
                    className="relative flex min-h-40 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-white/15 bg-[#252525] text-[#B8B8B8] transition-colors hover:border-[#DFC58A]/40 focus-within:ring-2 focus-within:ring-[#DFC58A] focus-within:ring-offset-2 focus-within:ring-offset-[#2D2D2D]"
                  >
                    <input
                      id={fieldIds.photo}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                      className="sr-only"
                    />

                    {imagePreview ? (
                      <Image
                        src={getPreviewUrl()}
                        alt="Property preview"
                        fill
                        sizes="100vw"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center px-4 py-8 text-center">
                        <span
                          className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1B] text-3xl font-light text-[#DFC58A]"
                          aria-hidden="true"
                        >
                          +
                        </span>
                        <span className="text-sm font-semibold text-[#F5F5F5]">
                          {isUploading ? "Uploading..." : "Add preview photo"}
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  aria-busy={isSaving}
                  className={primaryButtonClassName}
                >
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </form>

              <AdminGalleryManager propertyId={Number(params.id)} />
            </>
          )}
        </div>
      </AdminPageShell>
    </AdminRoute>
  )
}
