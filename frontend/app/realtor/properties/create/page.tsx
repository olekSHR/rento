"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

import RealtorRoute from "@/components/RealtorRoute"
import { getImageUrl } from "@/lib/getImageUrl"

import {
  addPropertyImage,
  createProperty,
  generateAIListing,
  uploadImage,
} from "@/services/api"

export default function RealtorCreatePropertyPage() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
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
  })

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
      label: "At least 1 photo is uploaded",
      passed: galleryImages.length > 0,
    },
  ]

  const isQualityPassed = qualityChecks.every((check) => check.passed)

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }))
  }

async function handleGenerateAI() {
  if (!formData.city || !formData.price || !formData.rooms) {
    alert("Fill city, price and rooms before using AI.")
    return
  }

  try {
    setIsGeneratingAI(true)

    const token = localStorage.getItem("access_token")

    if (!token) {
      throw new Error("No token found")
    }

    const result = await generateAIListing(
      {
        city: formData.city,
        price: Number(formData.price),
        rooms: Number(formData.rooms),
        property_type: "apartment",
        features: [],
        language: "ro",
      },
      token
    )

    setFormData((prev) => ({
      ...prev,
      title: result.title,
      description: result.description,
    }))
  } catch (error) {
    console.error(error)
    alert("Failed to generate listing with AI")
  } finally {
    setIsGeneratingAI(false)
  }
}

  async function handleImageUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    try {
      const files = Array.from(event.target.files || [])

      if (files.length === 0) {
        return
      }

      const token = localStorage.getItem("access_token")

      if (!token) {
        throw new Error("No token")
      }

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

        setFormData((prev) => ({
          ...prev,
          image_url: prev.image_url || response.url,
        }))
      }

      event.target.value = ""
    } catch (error) {
      console.error(error)
      alert("Failed to upload images")
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!isQualityPassed) {
      alert("Please complete listing quality checks before submitting.")
      return
    }

    try {
      setIsLoading(true)

      const token = localStorage.getItem("access_token")

      if (!token) {
        throw new Error("No token found")
      }

      const createdProperty = await createProperty(
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

      await Promise.all(
        galleryImages.map((image) =>
          addPropertyImage(
            createdProperty.id,
            {
              url: image.url,
              is_cover: image.is_cover,
              sort_order: image.sort_order,
            },
            token
          )
        )
      )

      router.push("/realtor")
    } catch (error) {
      console.error(error)
      alert("Failed to create property")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <RealtorRoute>
      <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
        <div className="mx-auto max-w-md">
          <header className="mb-6">
            <p className="text-sm font-semibold text-blue-700">
              Realtor Workspace
            </p>

            <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">
              Create Property
            </h1>

            <p className="mt-2 text-sm text-zinc-500">
              Add a rental listing. It will be sent to admin review before publication.
            </p>
          </header>

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

            <button
              type="button"
              onClick={handleGenerateAI}
              disabled={isGeneratingAI || !formData.city || !formData.price || !formData.rooms}
              className="w-full rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm font-bold text-blue-700 transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
             >
              {isGeneratingAI ? "Generating..." : "✨ Generate with AI"}
            </button>

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

            <div>
              <label className="mb-2 block text-sm font-semibold text-zinc-900">
                Photos
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

                    <span className="text-sm">Add Photos</span>
                  </>
                )}
              </label>
            </div>

            <div className="rounded-3xl border border-zinc-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-zinc-900">
                    Listing Quality
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Complete these checks before submitting.
                  </p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isQualityPassed
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {qualityChecks.filter((check) => check.passed).length}/
                  {qualityChecks.length}
                </div>
              </div>

              <div className="space-y-2">
                {qualityChecks.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                        check.passed
                          ? "bg-emerald-500 text-white"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      {check.passed ? "✓" : "•"}
                    </span>

                    <span
                      className={
                        check.passed ? "text-zinc-700" : "text-zinc-400"
                      }
                    >
                      {check.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !isQualityPassed}
              className="w-full rounded-2xl bg-blue-700 p-4 font-semibold text-white transition-all duration-200 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Submit for Review"}
            </button>
          </form>
        </div>
      </main>
    </RealtorRoute>
  )
}
