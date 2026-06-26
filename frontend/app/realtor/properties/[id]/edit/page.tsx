"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import RealtorRoute from "@/components/RealtorRoute"
import RealtorPropertyGallery from "@/components/realtor/RealtorPropertyGallery"
import {
  getPropertyStatusLabel,
  getPropertyStatusTone,
} from "@/lib/realtorWorkspace"
import { getToken } from "@/lib/tokenStorage"
import { getPropertyById, updateProperty } from "@/services/api"
import type { Property, PropertyStatus } from "@/types/property"

export default function RealtorEditPropertyPage() {
  const params = useParams()
  const router = useRouter()

  const propertyId = Number(params.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [propertyStatus, setPropertyStatus] = useState<PropertyStatus>("pending")
  const [saveMessage, setSaveMessage] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    city: "",
    rooms: "",
    image_url: "",
  })

  useEffect(() => {
    async function loadProperty() {
      try {
        const token = getToken()

        if (!token) {
          throw new Error("No token")
        }

        const property: Property = await getPropertyById(propertyId, token)

        setPropertyStatus(property.status)
        setFormData({
          title: property.title,
          description: property.description ?? "",
          price: property.price?.toString() ?? "",
          city: property.city ?? "",
          rooms: property.rooms?.toString() ?? "",
          image_url: property.image_url ?? "",
        })
      } catch (error) {
        console.error(error)
        alert("Failed to load property")
      } finally {
        setIsLoading(false)
      }
    }

    if (Number.isFinite(propertyId)) {
      loadProperty()
    }
  }, [propertyId])

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

      const token = getToken()

      if (!token) {
        throw new Error("No token")
      }

      await updateProperty(
        propertyId,
        {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          city: formData.city,
          rooms: Number(formData.rooms),
          image_url: formData.image_url,
          status: propertyStatus,
        },
        token
      )

      setSaveMessage("Changes saved successfully")
      window.setTimeout(() => router.push("/realtor"), 900)
    } catch (error) {
      console.error(error)
      alert("Failed to update property")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <RealtorRoute>
      <main className="min-h-screen bg-zinc-100 px-4 pb-32 pt-6">
        <div className="mx-auto max-w-md">
          <header className="mb-6">
            <Link
              href="/realtor"
              className="text-sm font-semibold text-blue-700"
            >
              ← Back to workspace
            </Link>

            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
                  Edit Property
                </h1>
                <p className="mt-2 text-sm text-zinc-500">
                  Update listing details and manage your gallery.
                </p>
              </div>

              {!isLoading && (
                <span
                  className={`rounded-full px-3 py-1 text-[11px] font-bold ring-1 ${getPropertyStatusTone(
                    propertyStatus
                  )}`}
                >
                  {getPropertyStatusLabel(propertyStatus)}
                </span>
              )}
            </div>
          </header>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-32 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />
            </div>
          ) : (
            <>
              <form
                id="edit-property-form"
                onSubmit={handleSubmit}
                className="space-y-4 rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">
                  Listing details
                </p>

                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
                />

                <textarea
                  name="description"
                  placeholder="Description"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
                />

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price (€)"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
                  />

                  <input
                    type="number"
                    name="rooms"
                    placeholder="Rooms"
                    required
                    value={formData.rooms}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
                  />
                </div>

                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-zinc-900 outline-none"
                />

                <p className="rounded-2xl bg-blue-50 p-3 text-xs text-blue-800">
                  Contacts and publication status are managed automatically by
                  Rento.
                </p>
              </form>

              <div className="mt-6">
                <RealtorPropertyGallery propertyId={propertyId} />
              </div>
            </>
          )}
        </div>

        {!isLoading && (
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-200 bg-white/95 px-4 py-4 backdrop-blur">
            <div className="mx-auto max-w-md space-y-2">
              {saveMessage && (
                <p className="text-center text-sm font-semibold text-emerald-600">
                  {saveMessage}
                </p>
              )}
              <button
                type="submit"
                form="edit-property-form"
                disabled={isSaving}
                className="flex h-14 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white shadow-[0_12px_28px_rgba(29,78,216,0.22)] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        )}
      </main>
    </RealtorRoute>
  )
}
