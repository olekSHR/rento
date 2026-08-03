"use client"

import Image from "next/image"
import { useCallback, useEffect, useId, useRef, useState } from "react"
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
import type { PropertyImage } from "@/types/property"
import {
  addPropertyImage,
  deletePropertyImage,
  getPropertyImages,
  setCoverImage,
  updatePropertyImageSortOrder,
  uploadImage,
} from "@/services/api"
import SortableGalleryItem from "../admin/SortableGalleryItem"

type PropertyGalleryManagerProps = {
  propertyId: number
}

const actionButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-50"

const destructiveButtonClassName = `${actionButtonClassName} border border-red-400/30 bg-red-950/30 text-red-200 hover:bg-red-950/50`

export default function PropertyGalleryManager({
  propertyId,
}: PropertyGalleryManagerProps) {
  const uploadInputId = useId()
  const cancelDeleteRef = useRef<HTMLButtonElement>(null)

  const [images, setImages] = useState<PropertyImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [settingCoverId, setSettingCoverId] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  )
  const [touchStartX, setTouchStartX] = useState<number | null>(null)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)
  const [loadedImageIds, setLoadedImageIds] = useState<number[]>([])

  const selectedImage =
    selectedImageIndex !== null ? images[selectedImageIndex] : null

  const selectedImageUrl = selectedImage ? getImageUrl(selectedImage.url) : null

  const canGoPrevious =
    selectedImageIndex !== null && selectedImageIndex > 0

  const canGoNext =
    selectedImageIndex !== null && selectedImageIndex < images.length - 1

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  )

  const refreshImages = useCallback(async () => {
    const updatedImages = await getPropertyImages(propertyId, {
      authenticated: true,
    })

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

    void loadImages()
  }, [refreshImages])

  useEffect(() => {
    if (pendingDeleteId === null) {
      return
    }

    cancelDeleteRef.current?.focus()
  }, [pendingDeleteId])

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

  async function handleSetCover(imageId: number) {
    try {
      setSettingCoverId(imageId)

      await setCoverImage(propertyId, imageId)

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

  function handleDeleteClick(imageId: number) {
    if (isDeleting || isUploading) {
      return
    }

    setPendingDeleteId(imageId)
  }

  function handleDeleteCancel() {
    if (isDeleting) {
      return
    }

    setPendingDeleteId(null)
  }

  async function handleDeleteConfirm(imageId: number) {
    try {
      setIsDeleting(true)
      await deletePropertyImage(propertyId, imageId)
      await refreshImages()
      setPendingDeleteId(null)
    } catch (error) {
      console.error("Failed to delete image", error)
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleUploadImages(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(event.target.files || [])

    event.target.value = ""

    if (files.length === 0) return

    try {
      setIsUploading(true)

      for (const file of files) {
        const uploadedImage = await uploadImage(file)

        await addPropertyImage(propertyId, { url: uploadedImage.url })
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
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = images.findIndex((image) => image.id === active.id)
    const newIndex = images.findIndex((image) => image.id === over.id)

    if (oldIndex === -1 || newIndex === -1) return

    const previousImages = images

    const reorderedImages = arrayMove(images, oldIndex, newIndex).map(
      (image, index) => ({
        ...image,
        sort_order: index,
      })
    )

    setImages(reorderedImages)

    try {
      await Promise.all(
        reorderedImages.map((image, index) =>
          updatePropertyImageSortOrder(propertyId, image.id, index)
        )
      )

      await refreshImages()
    } catch (error) {
      console.error("Failed to drag reorder images", error)
      setImages(previousImages)
    }
  }

  const isBusy = isUploading || isDeleting || settingCoverId !== null

  return (
    <section
      aria-labelledby={`${uploadInputId}-gallery-heading`}
      className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"
      aria-busy={isBusy}
    >
      <h2
        id={`${uploadInputId}-gallery-heading`}
        className="text-lg font-bold text-[#F5F5F5]"
      >
        Gallery manager
      </h2>

      <p className="mt-1 text-sm text-[#B8B8B8]">
        Upload, reorder, set cover, and remove property images.
      </p>

      <div className="mt-4">
        <label
          htmlFor={uploadInputId}
          className="flex min-h-11 cursor-pointer items-center justify-center rounded-2xl border border-dashed border-white/15 bg-[#252525] px-4 py-4 transition-colors hover:border-[#DFC58A]/40 focus-within:ring-2 focus-within:ring-[#DFC58A] focus-within:ring-offset-2 focus-within:ring-offset-[#2D2D2D]"
        >
          <input
            id={uploadInputId}
            type="file"
            multiple
            accept="image/*"
            onChange={handleUploadImages}
            disabled={isUploading || isDeleting}
            className="sr-only"
          />

          <span className="text-sm font-semibold text-[#F5F5F5]">
            {isUploading ? "Uploading..." : "Upload images"}
          </span>
        </label>
      </div>

      {isLoading ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3"
        >
          <span className="sr-only">Loading gallery images</span>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-white/8 bg-[#252525]"
            >
              <div className="h-32 w-full animate-pulse bg-white/10 motion-reduce:animate-none" />
              <div className="space-y-2 p-3">
                <div className="h-5 w-20 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
                <div className="flex gap-2">
                  <div className="h-11 flex-1 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
                  <div className="h-11 flex-1 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-white/8 bg-[#252525] px-4 py-6 text-center text-sm text-[#B8B8B8]">
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
            void handleDragEnd(event)
          }}
          onDragCancel={() => {
            setActiveImageId(null)
          }}
        >
          <SortableContext
            items={images.map((image) => image.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3">
              {images.map((image, index) => (
                <SortableGalleryItem key={image.id} id={image.id}>
                  <div className="overflow-hidden rounded-2xl border border-white/8 bg-[#252525]">
                    <div className="relative h-32 w-full overflow-hidden bg-[#1B1B1B]">
                      {!loadedImageIds.includes(image.id) && (
                        <div className="absolute inset-0 animate-pulse bg-white/10 motion-reduce:animate-none" />
                      )}

                      <Image
                        src={getImageUrl(image.url) || ""}
                        unoptimized
                        alt={`Property image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        onClick={() => {
                          setSelectedImageIndex(index)
                        }}
                        onLoad={() => {
                          setLoadedImageIds((prev) =>
                            prev.includes(image.id) ? prev : [...prev, image.id]
                          )
                        }}
                        className={`cursor-pointer object-cover transition-all duration-500 ${
                          loadedImageIds.includes(image.id)
                            ? "scale-100 opacity-100 blur-0"
                            : "scale-105 opacity-0 blur-md"
                        }`}
                      />
                    </div>

                    <div className="space-y-2 p-3">
                      {pendingDeleteId === image.id ? (
                        <div
                          role="alertdialog"
                          aria-labelledby={`${uploadInputId}-delete-title-${image.id}`}
                          className="rounded-xl border border-red-400/20 bg-red-950/20 p-3"
                        >
                          <p
                            id={`${uploadInputId}-delete-title-${image.id}`}
                            className="text-sm text-[#F5F5F5]"
                          >
                            Delete image {index + 1}? This cannot be undone.
                          </p>
                          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                            <button
                              ref={cancelDeleteRef}
                              type="button"
                              disabled={isDeleting}
                              onClick={handleDeleteCancel}
                              className={`${actionButtonClassName} flex-1 border border-white/10 bg-[#2D2D2D] text-[#F5F5F5]`}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={isDeleting}
                              aria-busy={isDeleting}
                              onClick={() => void handleDeleteConfirm(image.id)}
                              className={`${destructiveButtonClassName} flex-1`}
                            >
                              {isDeleting ? "Deleting..." : "Confirm delete"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          {image.is_cover ? (
                            <span className="inline-flex min-h-11 items-center rounded-full border border-[#DFC58A]/30 bg-[#2A2720] px-3 text-xs font-semibold text-[#DFC58A]">
                              Cover
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={
                                settingCoverId === image.id ||
                                isDeleting ||
                                isUploading
                              }
                              onClick={() => void handleSetCover(image.id)}
                              className={`${actionButtonClassName} border border-white/10 bg-[#2D2D2D] text-[#F5F5F5] hover:text-[#DFC58A]`}
                            >
                              {settingCoverId === image.id
                                ? "Setting..."
                                : "Make cover"}
                            </button>
                          )}

                          <button
                            type="button"
                            disabled={isDeleting || isUploading}
                            aria-label={`Delete property image ${index + 1}`}
                            onClick={() => handleDeleteClick(image.id)}
                            className={destructiveButtonClassName}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </SortableGalleryItem>
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeImageId ? (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#252525] shadow-2xl">
                <div className="relative h-32 w-40 overflow-hidden bg-[#1B1B1B]">
                  <Image
                    src={
                      getImageUrl(
                        images.find((image) => image.id === activeImageId)?.url ||
                          ""
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
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#1B1B1B]/95 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImageIndex(null)}
        >
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setSelectedImageIndex(null)}
            className="absolute right-4 top-4 z-50 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-[#252525]/90 px-4 text-xl text-[#F5F5F5] backdrop-blur transition hover:bg-[#2D2D2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
          >
            ×
          </button>

          <button
            type="button"
            aria-label="Previous image"
            disabled={!canGoPrevious}
            onClick={(event) => {
              event.stopPropagation()
              setSelectedImageIndex((prev) =>
                prev !== null && prev > 0 ? prev - 1 : prev
              )
            }}
            className="absolute left-4 top-1/2 z-50 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#252525]/90 px-4 text-2xl text-[#F5F5F5] backdrop-blur transition hover:bg-[#2D2D2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] disabled:cursor-not-allowed disabled:opacity-30"
          >
            ←
          </button>

          <div
            className="relative h-[95vh] w-[95vw] max-w-7xl"
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
              alt={`Fullscreen property image ${selectedImageIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Next image"
            disabled={!canGoNext}
            onClick={(event) => {
              event.stopPropagation()
              setSelectedImageIndex((prev) =>
                prev !== null && prev < images.length - 1 ? prev + 1 : prev
              )
            }}
            className="absolute right-4 top-1/2 z-50 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#252525]/90 px-4 text-2xl text-[#F5F5F5] backdrop-blur transition hover:bg-[#2D2D2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] disabled:cursor-not-allowed disabled:opacity-30"
          >
            →
          </button>

          <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-[#252525]/90 px-4 py-2 text-sm text-[#F5F5F5] backdrop-blur">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  )
}
