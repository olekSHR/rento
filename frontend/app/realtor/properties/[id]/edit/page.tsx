"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import RealtorPropertyGallery from "@/components/realtor/RealtorPropertyGallery"
import PropertyLocationPicker from "@/components/map/PropertyLocationPickerLazy"
import { getPropertyStatusLabel } from "@/lib/realtorWorkspace"
import {
  buildCoordinatePayload,
  coordinatesFromProperty,
  EMPTY_PROPERTY_LOCATION,
} from "@/lib/propertyLocation"
import { getPropertyById, updateProperty } from "@/services/api"
import type { Property, PropertyStatus } from "@/types/property"

type LoadState = "loading" | "ready" | "not-found"

const SAVE_SUCCESS_ID = "edit-property-save-success"
const SAVE_ERROR_ID = "edit-property-save-error"
const LISTING_INFO_ID = "edit-listing-info"

const shellClassName =
  "min-h-screen bg-[#1B1B1B] text-[#F5F5F5] px-5 py-6 pb-28 md:px-8 md:py-8 md:pb-32"

const containerClassName = "mx-auto max-w-[1280px] space-y-5 md:space-y-6"

const contentColumnClassName = "mx-auto w-full max-w-xl space-y-5 md:space-y-6"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const primaryButtonClassName =
  "inline-flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:cursor-not-allowed disabled:opacity-60"

const secondaryLinkClassName =
  "inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const inputClassName =
  "min-h-11 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-60 aria-[invalid=true]:border-red-400/40"

const labelClassName = "mb-2 block text-sm font-semibold text-[#F5F5F5]"

const infoPanelClassName =
  "rounded-2xl border border-[#DFC58A]/15 bg-[#252525] p-4 text-xs leading-relaxed text-[#B8B8B8]"

const errorAlertClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const successStatusClassName =
  "rounded-xl border border-emerald-400/15 bg-[#222A24] px-4 py-3 text-center text-sm font-medium leading-relaxed text-emerald-100/90"

function getDarkPropertyStatusTone(status: PropertyStatus): string {
  switch (status) {
    case "pending":
      return "border-amber-400/20 bg-[#2A2820] text-amber-200"
    case "available":
      return "border-emerald-400/20 bg-[#222A25] text-emerald-200"
    case "reserved":
      return "border-sky-400/20 bg-[#222528] text-sky-200"
    case "rented":
      return "border-violet-400/20 bg-[#252228] text-violet-200"
    case "archived":
      return "border-white/10 bg-[#252525] text-[#B8B8B8]"
    default:
      return "border-white/10 bg-[#252525] text-[#B8B8B8]"
  }
}

function EditPageSkeleton() {
  return (
    <div role="status" aria-live="polite" className={contentColumnClassName}>
      <span className="sr-only">Loading property details</span>
      <div className="h-28 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none md:h-24" />
      <div className="h-72 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
      <div className="h-48 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
    </div>
  )
}

function PropertyNotFoundPanel() {
  return (
    <div className={`${cardClassName} text-center`}>
      <h2 className="text-lg font-semibold text-[#F5F5F5]">Property not found</h2>
      <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
        This listing does not exist or you do not have access to it.
      </p>
      <Link href="/realtor" className={`mt-6 ${primaryButtonClassName}`}>
        Back to dashboard
      </Link>
    </div>
  )
}

export default function RealtorEditPropertyPage() {
  const params = useParams()
  const router = useRouter()

  const propertyId = Number(params.id)

  const [loadState, setLoadState] = useState<LoadState>("loading")
  const [isSaving, setIsSaving] = useState(false)
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus>("pending")
  const [saveMessage, setSaveMessage] = useState("")
  const [saveError, setSaveError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    rooms: "",
  })
  const [location, setLocation] = useState(EMPTY_PROPERTY_LOCATION)

  const isValidPropertyId = Number.isFinite(propertyId)

  useEffect(() => {
    if (!isValidPropertyId) {
      return
    }

    async function loadProperty() {
      try {
        const property: Property = await getPropertyById(propertyId, {
          authenticated: true,
        })

        setPropertyStatus(property.status)
        setFormData({
          title: property.title,
          description: property.description ?? "",
          price: property.price?.toString() ?? "",
          city: property.city ?? "",
          rooms: property.rooms?.toString() ?? "",
        })
        setLocation(coordinatesFromProperty(property))
        setLoadState("ready")
      } catch (error) {
        console.error(error)
        setLoadState("not-found")
      }
    }

    loadProperty()
  }, [propertyId, isValidPropertyId])

  if (!isValidPropertyId) {
    return (
      <main className={shellClassName}>
        <div className={containerClassName}>
          <div className={contentColumnClassName}>
            <PropertyNotFoundPanel />
          </div>
        </div>
      </main>
    )
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setIsSaving(true)
      setSaveMessage("")
      setSaveError("")

      const property = await getPropertyById(propertyId, { authenticated: true })

      await updateProperty(propertyId, {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        city: formData.city,
        rooms: Number(formData.rooms),
        image_url: property.image_url ?? "",
        status: propertyStatus,
        ...buildCoordinatePayload(location),
      })

      setSaveMessage("Changes saved successfully")
      window.setTimeout(() => router.push("/realtor"), 900)
    } catch (error) {
      console.error(error)
      setSaveError("Failed to update property")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className={shellClassName}>
        <div className={containerClassName}>
          {loadState !== "not-found" && (
            <header className={cardClassName}>
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
                    Edit listing
                  </p>
                  <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
                    Edit Property
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#B8B8B8]">
                    Update listing details and manage your gallery.
                  </p>
                </div>

                <div className="flex flex-col items-start gap-3 md:items-end md:shrink-0">
                  {loadState === "ready" && (
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${getDarkPropertyStatusTone(
                        propertyStatus
                      )}`}
                    >
                      {getPropertyStatusLabel(propertyStatus)}
                    </span>
                  )}

                  <Link href="/realtor" className={secondaryLinkClassName}>
                    Back to dashboard
                  </Link>
                </div>
              </div>
            </header>
          )}

          <div className={contentColumnClassName}>
            {loadState === "loading" && <EditPageSkeleton />}

            {loadState === "not-found" && <PropertyNotFoundPanel />}

            {loadState === "ready" && (
              <>
                <section
                  aria-labelledby="edit-listing-details-heading"
                  className={cardClassName}
                >
                  <h2
                    id="edit-listing-details-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Listing details
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
                    Required fields must be saved before leaving this page.
                  </p>

                  <form
                    id="edit-property-form"
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-5"
                    aria-describedby={LISTING_INFO_ID}
                  >
                    <div>
                      <label htmlFor="edit-listing-title" className={labelClassName}>
                        Title
                      </label>
                      <input
                        id="edit-listing-title"
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
                      <label
                        htmlFor="edit-listing-description"
                        className={labelClassName}
                      >
                        Description
                      </label>
                      <textarea
                        id="edit-listing-description"
                        name="description"
                        rows={5}
                        autoComplete="off"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        aria-invalid={formData.description.trim().length === 0}
                        className={`${inputClassName} resize-y`}
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="edit-listing-price" className={labelClassName}>
                          Price (€)
                        </label>
                        <input
                          id="edit-listing-price"
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
                        <label htmlFor="edit-listing-rooms" className={labelClassName}>
                          Rooms
                        </label>
                        <input
                          id="edit-listing-rooms"
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
                      <label htmlFor="edit-listing-city" className={labelClassName}>
                        City
                      </label>
                      <input
                        id="edit-listing-city"
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

                    <div>
                      <p className={labelClassName}>Approximate location</p>
                      <PropertyLocationPicker
                        value={location}
                        onChange={setLocation}
                      />
                    </div>

                    <p id={LISTING_INFO_ID} className={infoPanelClassName}>
                      Contacts and publication status are managed automatically by
                      Rento. Cover image is managed in the gallery below.
                    </p>
                  </form>
                </section>

                <section aria-label="Property gallery" className="pt-1">
                  <RealtorPropertyGallery propertyId={propertyId} />
                </section>
              </>
            )}
          </div>
        </div>

        {loadState === "ready" && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#1B1B1B]/95 px-5 py-4 backdrop-blur supports-[padding:env(safe-area-inset-bottom)]:pb-[max(1rem,env(safe-area-inset-bottom))] md:px-8">
            <div className="mx-auto max-w-xl space-y-2">
              {saveError && (
                <p
                  id={SAVE_ERROR_ID}
                  role="alert"
                  aria-live="assertive"
                  className={errorAlertClassName}
                >
                  {saveError}
                </p>
              )}

              {saveMessage && (
                <p
                  id={SAVE_SUCCESS_ID}
                  role="status"
                  aria-live="polite"
                  className={successStatusClassName}
                >
                  {saveMessage}
                </p>
              )}

              <button
                type="submit"
                form="edit-property-form"
                disabled={isSaving}
                aria-busy={isSaving}
                className={primaryButtonClassName}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </main>
  )
}
