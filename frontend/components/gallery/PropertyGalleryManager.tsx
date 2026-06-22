"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable"

import { getImageUrl } from "@/lib/getImageUrl"
import { getToken } from "@/lib/tokenStorage"

import {
  addPropertyImage,
  deletePropertyImage,
  getPropertyImages,
  setCoverImage,
  updatePropertyImageSortOrder,
  uploadImage,
  type PropertyImage,
} from "@/services/api"
import SortableGalleryItem from "../admin/SortableGalleryItem"


type PropertyGalleryManagerProps = {
  propertyId: number
}

export default function PropertyGalleryManager({
  propertyId,
}: PropertyGalleryManagerProps) {
  const [images, setImages] = useState<PropertyImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [settingCoverId, setSettingCoverId] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [activeImageId, setActiveImageId] =
  useState<number | null>(null)
  const selectedImage =
  selectedImageIndex !== null ? images[selectedImageIndex] : null

const selectedImageUrl = selectedImage
  ? getImageUrl(selectedImage.url)
  : null

const canGoPrevious =
  selectedImageIndex !== null && selectedImageIndex > 0

const canGoNext =
  selectedImageIndex !== null && selectedImageIndex < images.length - 1
  const [loadedImageIds, setLoadedImageIds] = useState<number[]>([])
  const sensors = useSensors(
  useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8,
    },
  })
)

  const refreshImages = useCallback(async () => {
  const updatedImages = await getPropertyImages(propertyId)

  const sortedImages = [...updatedImages].sort(
    (a, b) => a.sort_order - b.sort_order
  )

  setImages(sortedImages)
}, [propertyId])

  useEffect(() => {
    async function loadImages() {
      try {
        await refreshImages()
      } catch (error) {
        console.error("Failed to load property images", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadImages()
  }, [refreshImages])

  async function handleSetCover(imageId: number) {
    const token = getToken()
    if (!token) return

    try {
      setSettingCoverId(imageId)

      await setCoverImage(propertyId, imageId, token)

      setImages((prevImages) =>
        prevImages.map((image) => ({
          ...image,
          is_cover: image.id === imageId,
        }))
      )

      await refreshImages()
    } catch (error) {
      console.error("Failed to set cover image", error)
    } finally {
      setSettingCoverId(null)
    }
  }
  useEffect(() => {
  if (selectedImageIndex === null) return

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      setSelectedImageIndex(null)
    }

    if (event.key === "ArrowLeft") {
      setSelectedImageIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : prev
      )
    }

    if (event.key === "ArrowRight") {
      setSelectedImageIndex((prev) =>
        prev !== null && prev < images.length - 1 ? prev + 1 : prev
      )
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [selectedImageIndex, images.length])
  async function handleDeleteImage(imageId: number) {
    const token = getToken()
    if (!token) return

    const confirmed = window.confirm("Delete this image?")
    if (!confirmed) return

    try {
      await deletePropertyImage(propertyId, imageId, token)
      await refreshImages()
    } catch (error) {
      console.error("Failed to delete image", error)
    }
  }

  async function handleUploadImages(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const token = getToken()
    if (!token) return

    const files = Array.from(event.target.files || [])

    event.target.value = ""

    if (files.length === 0) return

    try {
      setIsUploading(true)

      for (const file of files) {
        const uploadedImage = await uploadImage(
          file,
          token
        )

        await addPropertyImage(
          propertyId,
          { url: uploadedImage.url },
          token
        )
      }

      await refreshImages()
      event.target.value = ""
    } catch (error) {
      console.error("Failed to upload images", error)
    } finally {
      setIsUploading(false)
    }
  }

  

async function handleDragEnd(event: DragEndEvent) {
  const token = getToken()
  if (!token) return

  const { active, over } = event

  if (!over || active.id === over.id) return

  const oldIndex = images.findIndex(
    (image) => image.id === active.id
  )

  const newIndex = images.findIndex(
    (image) => image.id === over.id
  )

  if (oldIndex === -1 || newIndex === -1) return

  const previousImages = images

  const reorderedImages = arrayMove(
    images,
    oldIndex,
    newIndex
  ).map((image, index) => ({
    ...image,
    sort_order: index,
  }))

  setImages(reorderedImages)

  try {
    await Promise.all(
      reorderedImages.map((image, index) =>
        updatePropertyImageSortOrder(
          propertyId,
          image.id,
          index,
          token
        )
      )
    )

    await refreshImages()
  } catch (error) {
    console.error("Failed to drag reorder images", error)

    setImages(previousImages)
  }
}
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <h2 className="text-xl font-bold text-white">
        Gallery Manager
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        Property ID: {propertyId}
      </p>

      <div className="mt-4">
        <label className="flex cursor-pointer items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900 px-4 py-6 transition hover:border-white">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadImages}
            className="hidden"
          />

          <span className="text-sm font-semibold text-slate-300">
            {isUploading ? "Uploading..." : "Upload Images"}
          </span>
        </label>
      </div>

      {isLoading ? (
  <div className="mt-4 grid grid-cols-2 gap-3">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="
          overflow-hidden
          rounded-xl
          border
          border-slate-800
          bg-slate-900
          animate-pulse
        "
      >
        <div className="h-32 w-full bg-slate-800" />

        <div className="space-y-2 p-2">
          <div className="h-5 w-20 rounded bg-slate-800" />

          <div className="flex gap-2">
            <div className="h-8 flex-1 rounded bg-slate-800" />

            <div className="h-8 flex-1 rounded bg-slate-800" />
          </div>
        </div>
      </div>
    ))}
  </div>
)
       : images.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          No gallery images yet.
        </p>
      ) : (
        <DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragStart={(event) => {
    setActiveImageId(Number(event.active.id))
  }}
  onDragEnd={(event) => {
    setActiveImageId(null)
    handleDragEnd(event)
  }}
  onDragCancel={() => {
    setActiveImageId(null)
  }}
>
  <SortableContext
    items={images.map((image) => image.id)}
    strategy={verticalListSortingStrategy}
  >
    <div className="mt-4 grid grid-cols-2 gap-3">
      {images.map((image, index) => {
              

            return (
  <SortableGalleryItem
    key={image.id}
    id={image.id}
  >
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
                <div className="relative h-32 w-full overflow-hidden bg-slate-800">
  {!loadedImageIds.includes(image.id) && (
    <div className="absolute inset-0 animate-pulse bg-slate-700" />
  )}

  <Image
  src={getImageUrl(image.url) || ""}
  unoptimized
  alt="Property image"
  fill
  sizes="(max-width: 768px) 50vw, 25vw"
  onClick={() => {
  setSelectedImageIndex(index)
}}
  onLoad={() => {
    setLoadedImageIds((prev) =>
      prev.includes(image.id)
        ? prev
        : [...prev, image.id]
    )
  }}
  className={`cursor-pointer object-cover transition-all duration-500 ${
    loadedImageIds.includes(image.id)
      ? "scale-100 opacity-100 blur-0"
      : "scale-105 opacity-0 blur-md"
  }`}
/>
</div>

                <div className="space-y-2 p-2">
                  <div className="flex items-center justify-between">
                    {image.is_cover ? (
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-black">
                        Cover
                      </span>
                    ) : (
                      <button
                        type="button"
                        disabled={settingCoverId === image.id}
                        onClick={() => handleSetCover(image.id)}
                        className="rounded-full border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-300 transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {settingCoverId === image.id
                          ? "Setting..."
                          : "Make Cover"}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteImage(image.id)}
                      className="text-xs font-semibold text-red-400 transition hover:text-red-300"
                    >
                      Delete
                    </button>
                  </div>

                  
                </div>
              </div>
            </SortableGalleryItem>
          )
        })}
      </div>
        </SortableContext>

    <DragOverlay>
      {activeImageId ? (
        <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
          <div className="relative h-32 w-40 overflow-hidden bg-slate-800">
            <Image
              src={
                getImageUrl(
                  images.find((image) => image.id === activeImageId)?.url || ""
                ) || ""
              }
              unoptimized
              alt="Dragging property image"
              fill
              sizes="160px"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
    </DragOverlay>
  </DndContext>
  
      )}
      {selectedImageUrl && selectedImageIndex !== null && (
  <div
    className="
  fixed
  inset-0
  z-[999]
  flex
  items-center
  justify-center
  bg-black/95
  p-4
  backdrop-blur-sm
  animate-in
  fade-in
  duration-200
"
    onClick={() => setSelectedImageIndex(null)}
  >
    <button
      type="button"
      onClick={() => setSelectedImageIndex(null)}
      className="
        absolute
        right-4
        top-4
        z-50
        rounded-full
        bg-white/10
        px-4
        py-2
        text-xl
        text-white
        backdrop-blur
        transition
        hover:bg-white/20
      "
    >
      ×
    </button>

    <button
      type="button"
      disabled={!canGoPrevious}
      onClick={(event) => {
        event.stopPropagation()
        setSelectedImageIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : prev
        )
      }}
      className="
        absolute
        left-4
        top-1/2
        z-50
        -translate-y-1/2
        rounded-full
        bg-white/10
        px-4
        py-3
        text-2xl
        text-white
        backdrop-blur
        transition
        hover:bg-white/20
        disabled:cursor-not-allowed
        disabled:opacity-30
      "
    >
      ←
    </button>

    <div
  className="
  relative
  h-[95vh]
  w-[95vw]
  max-w-7xl
  animate-in
  zoom-in-95
  duration-200
"
  onClick={(event) => event.stopPropagation()}
  onTouchStart={(event) => {
    setTouchStartX(event.touches[0].clientX)
  }}
  onTouchEnd={(event) => {
    if (touchStartX === null) return

    const touchEndX = event.changedTouches[0].clientX
    const distance = touchStartX - touchEndX

    if (distance > 50) {
      setSelectedImageIndex((prev) =>
        prev !== null && prev < images.length - 1 ? prev + 1 : prev
      )
    }

    if (distance < -50) {
      setSelectedImageIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : prev
      )
    }

    setTouchStartX(null)
  }}
>
      <Image
        src={selectedImageUrl}
        alt="Fullscreen property image"
        fill
        sizes="100vw"
        className="object-contain"
        priority
      />
    </div>

    <button
      type="button"
      disabled={!canGoNext}
      onClick={(event) => {
        event.stopPropagation()
        setSelectedImageIndex((prev) =>
          prev !== null && prev < images.length - 1 ? prev + 1 : prev
        )
      }}
      className="
        absolute
        right-4
        top-1/2
        z-50
        -translate-y-1/2
        rounded-full
        bg-white/10
        px-4
        py-3
        text-2xl
        text-white
        backdrop-blur
        transition
        hover:bg-white/20
        disabled:cursor-not-allowed
        disabled:opacity-30
      "
    >
      →
    </button>

    <div
      className="
        absolute
        bottom-4
        left-1/2
        z-50
        -translate-x-1/2
        rounded-full
        bg-white/10
        px-4
        py-2
        text-sm
        text-white
        backdrop-blur
      "
    >
      {selectedImageIndex + 1} / {images.length}
    </div>
  </div>
)}
    </section>
  )
}
