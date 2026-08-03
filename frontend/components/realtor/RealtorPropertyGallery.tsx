"use client"

import Image from "next/image"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import { Upload } from "lucide-react"
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
import type { PropertyImage } from "@/types/property"
import {
  addPropertyImage,
  deletePropertyImage,
  getPropertyImages,
  setCoverImage,
  updatePropertyImageSortOrder,
  uploadImage,
} from "@/services/api"

type RealtorPropertyGalleryProps = {
  propertyId: number
}

const sectionClassName =
  "scroll-mt-24 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const uploadZoneClassName =
  "mb-4 flex min-h-11 cursor-pointer flex-col items-center justify-center rounded-[24px] border border-dashed border-[#DFC58A]/25 bg-[#252525] px-4 py-8 text-center transition-transform active:scale-[0.99] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#DFC58A] focus-within:ring-offset-2 focus-within:ring-offset-[#2D2D2D] disabled:cursor-not-allowed disabled:opacity-60"

const errorAlertClassName =
  "mb-4 rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const emptyStateClassName =
  "rounded-2xl border border-white/8 bg-[#252525] p-4 text-center text-sm leading-relaxed text-[#B8B8B8]"

const cardClassName =
  "overflow-hidden rounded-2xl border border-white/8 bg-[#252525]"

const coverBadgeClassName =
  "absolute left-2 top-2 rounded-full border border-[#DFC58A]/25 bg-[#1B1B1B]/80 px-2.5 py-1 text-[10px] font-bold text-[#DFC58A]"

const coverButtonClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-[#2D2D2D] px-2 text-[11px] font-bold text-[#F5F5F5] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] disabled:cursor-not-allowed disabled:opacity-50"

const mainPhotoClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-[#DFC58A]/25 bg-[#2A2820] px-2 text-[11px] font-bold text-[#DFC58A]"

const removeButtonClassName =
  "inline-flex min-h-11 items-center justify-center rounded-xl border border-red-400/20 bg-[#2A2222] px-3 text-[11px] font-bold text-red-100/90 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] disabled:cursor-not-allowed disabled:opacity-50"

const confirmPanelClassName =
  "rounded-xl border border-amber-400/15 bg-[#2A2720] p-2 text-[11px] leading-relaxed text-amber-100/90"

const confirmActionClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl bg-[#DFC58A] px-2 text-[11px] font-bold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

const cancelActionClassName =
  "inline-flex min-h-11 flex-1 items-center justify-center rounded-xl border border-white/10 bg-[#2D2D2D] px-2 text-[11px] font-bold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

const dragHandleClassName =
  "absolute left-2 top-2 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#1B1B1B]/80 text-[#F5F5F5] shadow backdrop-blur touch-none active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

const previewCloseClassName =
  "absolute right-4 top-4 z-10 inline-flex min-h-11 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1B]/80 px-4 text-sm font-semibold text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"

function GallerySkeleton() {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-2 gap-3">
      <span className="sr-only">Loading gallery images</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none"
        />
      ))}
    </div>
  )
}

export default function RealtorPropertyGallery({
  propertyId,
}: RealtorPropertyGalleryProps) {
  const uploadInputId = useId()
  const previewCloseRef = useRef<HTMLButtonElement>(null)

  const [images, setImages] = useState<PropertyImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [settingCoverId, setSettingCoverId] = useState<number | null>(null)
  const [deletingImageId, setDeletingImageId] = useState<number | null>(null)
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState("")
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const [activeImageId, setActiveImageId] = useState<number | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
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

    loadImages()
  }, [refreshImages])

  useEffect(() => {
    if (previewIndex === null) {
      return
    }

    previewCloseRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPreviewIndex(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [previewIndex])

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || [])
    event.target.value = ""

    if (files.length === 0) {
      return
    }

    try {
      setUploadError("")
      setIsUploading(true)

      for (const file of files) {
        const uploaded = await uploadImage(file)
        await addPropertyImage(propertyId, { url: uploaded.url })
      }

      await refreshImages()
    } catch (error) {
      console.error("Failed to upload images", error)
      setUploadError("Failed to upload images")
    } finally {
      setIsUploading(false)
    }
  }

  async function handleSetCover(imageId: number) {
    try {
      setSettingCoverId(imageId)
      await setCoverImage(propertyId, imageId)
      await refreshImages()
    } catch (error) {
      console.error("Failed to set cover image", error)
    } finally {
      setSettingCoverId(null)
    }
  }

  function handleRemoveClick(imageId: number) {
    setPendingDeleteId(imageId)
  }

  function handleCancelDelete() {
    setPendingDeleteId(null)
  }

  async function handleConfirmDelete(imageId: number) {
    try {
      setDeletingImageId(imageId)
      await deletePropertyImage(propertyId, imageId)
      await refreshImages()
      setPendingDeleteId(null)
    } catch (error) {
      console.error("Failed to delete image", error)
    } finally {
      setDeletingImageId(null)
    }
  }

  async function handleDragEnd(event: DragEndEvent) {
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
          updatePropertyImageSortOrder(propertyId, image.id, index)
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
    <section id="gallery" className={sectionClassName}>
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-[#F5F5F5]">Gallery</h2>
        <p className="mt-1 text-xs leading-relaxed text-[#B8B8B8]">
          Upload photos, set a cover image, and drag to reorder.
        </p>
      </div>

      {uploadError && (
        <p role="alert" aria-live="assertive" className={errorAlertClassName}>
          {uploadError}
        </p>
      )}

      <label
        htmlFor={uploadInputId}
        aria-busy={isUploading}
        className={uploadZoneClassName}
      >
        <input
          id={uploadInputId}
          type="file"
          accept="image/*"
          multiple
          disabled={isUploading}
          onChange={handleUpload}
          className="sr-only"
        />
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-[#DFC58A]/20 bg-[#2D2D2D] text-[#DFC58A]">
          {isUploading ? (
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[#DFC58A] border-t-transparent motion-reduce:animate-none" />
          ) : (
            <Upload className="h-6 w-6" aria-hidden="true" />
          )}
        </span>
        <span className="text-sm font-semibold text-[#F5F5F5]">
          {isUploading ? "Uploading photos..." : "Upload photos"}
        </span>
        <span className="mt-1 text-xs text-[#B8B8B8]">
          JPEG, PNG, or WebP
        </span>
      </label>

      {isLoading ? (
        <GallerySkeleton />
      ) : images.length === 0 ? (
        <p className={emptyStateClassName}>
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
                <SortableGalleryItem
                  key={image.id}
                  id={image.id}
                  dragHandleClassName={dragHandleClassName}
                >
                  <div className={cardClassName}>
                    <button
                      type="button"
                      onClick={() => setPreviewIndex(index)}
                      className="relative block h-36 w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#DFC58A]"
                    >
                      <Image
                        src={getImageUrl(image.url) || ""}
                        alt={`Uploaded photo ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                        sizes="(max-width: 448px) 50vw, 224px"
                      />
                      {image.is_cover && (
                        <span className={coverBadgeClassName}>Cover</span>
                      )}
                    </button>

                    <div className="space-y-2 p-2">
                      {pendingDeleteId === image.id ? (
                        <div
                          role="alertdialog"
                          aria-labelledby={`delete-photo-${image.id}-title`}
                          className={confirmPanelClassName}
                        >
                          <p
                            id={`delete-photo-${image.id}-title`}
                            className="mb-2 font-semibold"
                          >
                            Remove this photo?
                          </p>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              disabled={deletingImageId === image.id}
                              onClick={() => handleConfirmDelete(image.id)}
                              className={confirmActionClassName}
                            >
                              {deletingImageId === image.id
                                ? "Removing..."
                                : "Remove"}
                            </button>
                            <button
                              type="button"
                              disabled={deletingImageId === image.id}
                              onClick={handleCancelDelete}
                              className={cancelActionClassName}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          {!image.is_cover ? (
                            <button
                              type="button"
                              disabled={settingCoverId === image.id}
                              aria-busy={settingCoverId === image.id}
                              onClick={() => handleSetCover(image.id)}
                              className={coverButtonClassName}
                            >
                              {settingCoverId === image.id ? "..." : "Cover"}
                            </button>
                          ) : (
                            <span className={mainPhotoClassName}>
                              Main photo
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveClick(image.id)}
                            className={removeButtonClassName}
                          >
                            Remove
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
              <div className="relative h-36 w-28 overflow-hidden rounded-2xl border border-white/10 bg-[#252525] shadow-xl">
                <Image
                  src={
                    getImageUrl(
                      images.find((image) => image.id === activeImageId)?.url ||
                        ""
                    ) || ""
                  }
                  alt="Dragging property photo"
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
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo preview"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#1B1B1B]/90 p-4"
        >
          <button
            ref={previewCloseRef}
            type="button"
            onClick={() => setPreviewIndex(null)}
            className={previewCloseClassName}
          >
            Close
          </button>

          <div className="relative h-[70vh] w-full max-w-md">
            <Image
              src={getImageUrl(previewImage.url) || ""}
              alt={`Preview photo ${previewIndex + 1}`}
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>

          <p className="absolute bottom-6 text-sm font-semibold text-[#B8B8B8]">
            {previewIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  )
}
