"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import RealtorRoute from "@/components/RealtorRoute"
import {
  getPropertyById,
  updateProperty,
} from "@/services/api"
import type { Property } from "@/types/property"
import PropertyGalleryManager from "@/components/gallery/PropertyGalleryManager"
export default function RealtorEditPropertyPage() {
  const params = useParams()
  const router = useRouter()

  const propertyId = Number(params.id)

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

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
        const property: Property = await getPropertyById(propertyId)

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

      const token = localStorage.getItem("access_token")

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
          status: "pending",
        },
        token
      )

      router.push("/realtor")
    } catch (error) {
      console.error(error)
      alert("Failed to update property")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <RealtorRoute>
      <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
        <div className="mx-auto max-w-md">
          <header className="mb-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
              Edit Property
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Update your listing details. Status and contacts are managed by Rento.
            </p>
          </header>

          {isLoading ? (
            <div className="space-y-4">
              <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-32 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-14 animate-pulse rounded-2xl bg-zinc-200" />
            </div>
          ) : (
            <>
             <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <textarea
                name="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <input
                type="number"
                name="rooms"
                placeholder="Rooms"
                required
                value={formData.rooms}
                onChange={handleChange}
                className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 outline-none"
              />

              <button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-2xl bg-blue-700 p-4 font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
           <div className="mt-6">
             <PropertyGalleryManager propertyId={propertyId} />
          </div>
         </>
         )}
        </div>
      </main>
    </RealtorRoute>
  )
}
