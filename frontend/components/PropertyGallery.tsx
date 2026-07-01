"use client"

import { useEffect, useRef, useState } from "react"

import { getImageUrl } from "@/lib/getImageUrl"

import Image from "next/image"

type PropertyImage = {
  id: number
  url: string
  is_cover: boolean
  sort_order: number
}

type Props = {
  title: string
  images: PropertyImage[]
}

export default function PropertyGallery({
  title,
  images,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)

  function handleScroll() {
    if (!containerRef.current) {
      return
    }

    const scrollLeft = containerRef.current.scrollLeft

    const width = containerRef.current.clientWidth

    const index = Math.round(scrollLeft / width)

    setActiveIndex(index)
  }

 useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (!isFullscreen) {
      return
    }

    if (event.key === "Escape") {
      setIsFullscreen(false)
    }

    if (event.key === "ArrowLeft") {
      setActiveIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
      )
    }

    if (event.key === "ArrowRight") {
      setActiveIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      )
    }
  }

  window.addEventListener("keydown", handleKeyDown)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
  }
}, [isFullscreen, images.length])

  return (
    <div className="relative h-72 overflow-hidden bg-zinc-200">
      {images.length > 0 ? (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          {images.map((image, index) => (
            <div
  key={`${image.id}-${index}`}
  className="relative h-full w-full shrink-0 snap-center overflow-hidden"
>
  {!loadedImages.includes(index) && (
    <div className="absolute inset-0 animate-pulse bg-zinc-300 blur-xl" />
  )}

  <Image
    src={getImageUrl(image.url) || ""}
    unoptimized
    alt={`${title} image ${index + 1}`}
    onClick={() => {
      setActiveIndex(index)
      setIsFullscreen(true)
    }}
    onLoad={() => {
  setLoadedImages((prev) =>
    prev.includes(index) ? prev : [...prev, index]
  )
}}
    width={1200}
    height={800}
    priority={index === 0}
    className={`h-full w-full object-cover cursor-pointer transition-opacity duration-500 ${
      loadedImages.includes(index)
        ? "opacity-100"
        : "opacity-0"
    }`}
  />
</div>
          ))}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center text-zinc-500">
          No Image
        </div>
      )}

      {images.length > 1 && (
        <>
          <div className="absolute bottom-10 right-4 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white">
            {activeIndex + 1} / {images.length}
          </div>
          
          {isFullscreen && (
  <div className="fixed inset-0 z-50 bg-black">
    <button
      onClick={() => setIsFullscreen(false)}
      className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-black"
    >
      Close
    </button>

    {images.length > 1 && (
      <>
        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === 0 ? images.length - 1 : prev - 1
            )
          }
          className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-black"
        >
          ‹
        </button>

        <button
          onClick={() =>
            setActiveIndex((prev) =>
              prev === images.length - 1 ? 0 : prev + 1
            )
          }
          className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl font-bold text-black"
        >
          ›
        </button>
      </>
    )}

    <div className="flex h-full w-full items-center justify-center">
      <Image
        src={getImageUrl(images[activeIndex]?.url) || ""}
        unoptimized
        alt={`${title} fullscreen image ${activeIndex + 1}`}
        width={1600}
        height={1200}
        className="max-h-full max-w-full object-contain"
      />
    </div>

    {images.length > 1 && (
      <div className="absolute bottom-6 left-0 right-0 text-center text-sm font-medium text-white">
        {activeIndex + 1} / {images.length}
      </div>
    )}
  </div>
)}
          
          <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!containerRef.current) {
                    return
                  }

                  const width =
                    containerRef.current.clientWidth

                  containerRef.current.scrollTo({
                    left: width * index,
                    behavior: "smooth",
                  })
                }}
                className={`h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
