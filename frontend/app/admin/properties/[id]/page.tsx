"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"

import {
  getPropertyById,
  getPropertyImages,
} from "@/services/api"
import { getImageUrl } from "@/lib/getImageUrl"
import { getToken } from "@/lib/tokenStorage"
import type { Property } from "@/types/property"
import Image from "next/image"

export default function PropertyDetailsPage() {
  const params = useParams()
  const router = useRouter()

  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const propertyId = Number(params.id)

  useEffect(() => {
 

  async function loadProperty() {
    try {
      const token = getToken()

      if (!token) {
        throw new Error("No token")
      }

      const data = await getPropertyById(propertyId, token)
      const images = await getPropertyImages(propertyId, token)

    

      setProperty({
        ...data,
        images,
      })
    } catch (error) {
      console.error("FAILED TO LOAD PROPERTY:", error)
    } finally {
      setLoading(false)
    }
  }

  if (Number.isFinite(propertyId)) {
    loadProperty()
  }
}, [propertyId])

  const galleryImages = useMemo(() => {
    if (!property) {
      return []
    }

    const imagesFromGallery =
      property.images
        ?.sort((a, b) => a.sort_order - b.sort_order)
        .map((image) => image.url) || []

    if (imagesFromGallery.length > 0) {
      return imagesFromGallery
    }

    return property.image_url ? [property.image_url] : []
  }, [property])

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md animate-pulse">
          <div className="h-72 rounded-3xl bg-zinc-300" />
          <div className="mt-6 h-8 w-3/4 rounded bg-zinc-300" />
          <div className="mt-3 h-5 w-1/2 rounded bg-zinc-300" />
          <div className="mt-6 h-32 rounded bg-zinc-300" />
        </div>
      </main>
    )
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 text-center">
          <h1 className="text-xl font-semibold text-black">
            Property not found
          </h1>

          <button
            onClick={() => router.push("/")}
            className="mt-4 rounded-xl bg-black px-5 py-3 text-white"
          >
            Back to home
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-100 pb-24">
      <section className="relative bg-black">
  {galleryImages.length > 0 ? (
    <div className="relative h-80 overflow-hidden">
      <Image
  src={getImageUrl(galleryImages[activeImageIndex]) || ""}
  alt={`${property.title} image ${activeImageIndex + 1}`}
  fill
  sizes="100vw"
  className="object-cover"
/>

      {galleryImages.length > 1 && (
        <>
          <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev === 0 ? galleryImages.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-black shadow"
          >
            ‹
          </button>

          <button
            onClick={() =>
              setActiveImageIndex((prev) =>
                prev === galleryImages.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl font-bold text-black shadow"
          >
            ›
          </button>
        </>
      )}
    </div>
  ) : (
    <div className="flex h-80 items-center justify-center bg-zinc-300 text-zinc-600">
      No Image
    </div>
  )}

  <button
    onClick={() => router.back()}
    className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black shadow"
  >
    ← Back
  </button>

  {galleryImages.length > 1 && (
    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
      {galleryImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setActiveImageIndex(index)}
          className={`h-2 rounded-full transition-all ${
            index === activeImageIndex
              ? "w-6 bg-white"
              : "w-2 bg-white/50"
          }`}
        />
      ))}
    </div>
  )}
</section>

      <section className="mx-auto max-w-md px-4 pt-5">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-black">
            {property.title}
          </h1>

          <p className="mt-2 text-zinc-600">
            {property.city || "Unknown city"}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="text-2xl font-bold text-black">
              ${property.price || 0}
            </span>

            <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
              {property.rooms || 0} rooms
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold text-black">
              Description
            </h2>

            <p className="mt-2 leading-7 text-zinc-700">
              {property.description || "No description"}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}