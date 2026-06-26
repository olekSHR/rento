"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core"
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable"

import SortableGalleryItem from "@/components/admin/SortableGalleryItem"
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

type RealtorPropertyGalleryProps = {
  propertyId: number
}

export default function RealtorPropertyGallery({
  propertyId,
}: RealtorPropertyGalleryProps) {
  const [images, setImages] = useState<PropertyImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [settingCoverId, setSettingCoverId] = useState<number | null>(null)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
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

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const token = getToken()
    const files = Array.from(event.target.files || [])
    event.target.value = ""

    if (!token || files.length === 0) {
      return
    }

    try {
      setIsUploading(true)

      for (const file of files) {
        const uploaded = await uploadImage(file, token)
        await addPropertyImage(propertyId, { url: uploaded.url }, token)
      }

      await refreshImages()
    } catch (error) {
      console.error("Failed to upload images", error)
      alert("Failed to upload images")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSetCover(imageId: number) {
    const token = getToken()
    if (!token) return

    try {
      setSettingCoverId(imageId)
      await setCoverImage(propertyId, imageId, token)
      await refreshImages()
    } catch (error) {
      console.error("Failed to set cover image", error)
    } finally {
      setSettingCoverId(null)
    }
  }

  async function handleDelete(imageId: number) {
    const token = getToken()
    if (!token) return

    const confirmed = window.confirm("Remove this photo?")
    if (!confirmed) return

    try {
      await deletePropertyImage(propertyId, imageId, token)
      await refreshImages()
    } catch (error) {
      console.error("Failed to delete image", error)
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
    const token = getToken()
    if (!token) return

    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = images.findIndex((image) => image.id === active.id)
    const newIndex = images.findIndex((image) => image.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    const previousImages = images
    const reordered = arrayMove(images, oldIndex, newIndex).map(
      (image, index) => ({
        ...image,
        sort_order: index,
      })
    )

    setImages(reordered)

    try {
      await Promise.all(
        reordered.map((image, index) =>
          updatePropertyImageSortOrder(propertyId, image.id, index, token)
        )
      )
      await refreshImages()
    } catch (error) {
      console.error("Failed to reorder images", error)
      setImages(previousImages)
    }
  }

  const previewImage =
    previewIndex !== null ? images[previewIndex] : null

  return (
    <section
      id="gallery"
      className="rounded-3xl border border-zinc-200 bg-white p-4 shadow-sm"
    >
      <div className="mb-4">
        <h2 className="text-lg font-bold text-zinc-900">Gallery</h2>
        <p className="mt-1 text-sm text-zinc-500">
          Upload photos, set a cover image, and drag to reorder.
        </p>
      </div>

      <label className="mb-4 flex min-h-[88px] cursor-pointer items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 text-sm font-semibold text-zinc-500 active:scale-[0.99]">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          className="hidden"
        />
        {isUploading ? "Uploading photos..." : "+ Upload photos"}
      </label>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-36 animate-pulse rounded-2xl bg-zinc-200"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="rounded-2xl bg-zinc-50 p-4 text-center text-sm text-zinc-500">
          No photos yet. Upload at least one image for a stronger listing.
        </p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={(event) => setActiveImageId(Number(event.active.id))}
          onDragEnd={(event) => {
            setActiveImageId(null)
            handleDragEnd(event)
          }}
          onDragCancel={() => setActiveImageId(null)}
        >
          <SortableContext
            items={images.map((image) => image.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-3">
              {images.map((image, index) => (
                <SortableGalleryItem key={image.id} id={image.id}>
                  <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                    <button
                      type="button"
                      onClick={() => setPreviewIndex(index)}
                      className="relative block h-36 w-full"
                    >
                      <Image
                        src={getImageUrl(image.url) || ""}
                        alt="Property"
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 448px) 50vw, 224px"
                      />
                      {image.is_cover && (
                        <span className="absolute left-2 top-2 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white">
                          Cover
                        </span>
                      )}
                    </button>

                    <div className="flex gap-2 p-2">
                      {!image.is_cover ? (
                        <button
                          type="button"
                          disabled={settingCoverId === image.id}
                          onClick={() => handleSetCover(image.id)}
                          className="flex-1 rounded-xl bg-zinc-100 py-2 text-[11px] font-bold text-zinc-700 disabled:opacity-50"
                        >
                          {settingCoverId === image.id ? "..." : "Cover"}
                        </button>
                      ) : (
                        <span className="flex flex-1 items-center justify-center rounded-xl bg-emerald-50 py-2 text-[11px] font-bold text-emerald-700">
                          Main photo
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(image.id)}
                        className="rounded-xl bg-red-50 px-3 py-2 text-[11px] font-bold text-red-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </SortableGalleryItem>
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeImageId ? (
              <div className="relative h-36 w-28 overflow-hidden rounded-2xl border border-zinc-200 shadow-xl">
                <Image
                  src={
                    getImageUrl(
                      images.find((image) => image.id === activeImageId)?.url ||
                        ""
                    ) || ""
                  }
                  alt="Dragging"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {previewImage && previewIndex !== null && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setPreviewIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white"
          >
            Close
          </button>

          <div className="relative h-[70vh] w-full max-w-md">
            <Image
              src={getImageUrl(previewImage.url) || ""}
              alt="Preview"
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-6 text-sm font-semibold text-white/80">
            {previewIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  )
}
