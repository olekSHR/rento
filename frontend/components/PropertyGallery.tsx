"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Home } from "lucide-react"

import { getImageUrl } from "@/lib/getImageUrl"
import type { PropertyImage } from "@/types/property"

type Props = {
  title: string
  images: PropertyImage[]
}

export default function PropertyGallery({ title, images }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadedImages, setLoadedImages] = useState<number[]>([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  function handleScroll() {
    if (!containerRef.current) {
      return
    }

    const scrollLeft = containerRef.current.scrollLeft
    const width = containerRef.current.clientWidth

    if (width <= 0) {
      return
    }

    setActiveIndex(Math.round(scrollLeft / width))
  }

  function scrollToIndex(index: number) {
    if (!containerRef.current) {
      return
    }

    const width = containerRef.current.clientWidth

    containerRef.current.scrollTo({
      left: width * index,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    })
  }

  function openFullscreen(index: number) {
    setActiveIndex(index)
    setIsFullscreen(true)
  }

  function goToPrevious() {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  function goToNext() {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function syncPreference() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    syncPreference()
    mediaQuery.addEventListener("change", syncPreference)

    return () => {
      mediaQuery.removeEventListener("change", syncPreference)
    }
  }, [])

  useEffect(() => {
    if (!isFullscreen) {
      return
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsFullscreen(false)
        return
      }

      if (images.length <= 1) {
        return
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setActiveIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        )
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        setActiveIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen, images.length])

  return (
    <section
      aria-roledescription="carousel"
      aria-label={`${title} photo gallery`}
      className="relative aspect-[4/3] w-full overflow-hidden bg-[#252525] sm:aspect-[16/10] md:rounded-[28px]"
    >
      {images.length > 0 ? (
        <div
          ref={containerRef}
          onScroll={handleScroll}
          className={`hide-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto ${
            prefersReducedMotion ? "" : "scroll-smooth"
          }`}
        >
          {images.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="relative h-full w-full shrink-0 snap-center overflow-hidden"
            >
              {!loadedImages.includes(index) && (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 animate-pulse bg-[#2D2D2D]"
                />
              )}

              <Image
                src={getImageUrl(image.url) || ""}
                unoptimized
                alt={`${title} image ${index + 1}`}
                width={1600}
                height={1200}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 60vw, 720px"
                onLoad={() => {
                  setLoadedImages((prev) =>
                    prev.includes(index) ? prev : [...prev, index]
                  )
                }}
                className={`h-full w-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${
                  loadedImages.includes(index) ? "opacity-100" : "opacity-0"
                }`}
              />

              <button
                type="button"
                onClick={() => openFullscreen(index)}
                aria-label={`Open ${title} image ${index + 1} fullscreen`}
                className="absolute inset-0 z-[1] cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#DFC58A]"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          role="img"
          aria-label="Photos are not available"
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#252525] px-6 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2D2D2D] ring-1 ring-white/10">
            <Home className="h-6 w-6 text-[#B8B8B8]" aria-hidden="true" />
          </div>
          <p className="text-sm font-medium text-[#B8B8B8]">
            Photos are not available
          </p>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#1B1B1B]/80 via-[#1B1B1B]/25 to-transparent"
      />

      {images.length > 0 && (
        <div className="absolute bottom-4 right-4 z-[2] rounded-full bg-[#1B1B1B]/55 px-3 py-1.5 text-sm font-medium text-[#F5F5F5] backdrop-blur-md ring-1 ring-white/10">
          {activeIndex + 1} / {images.length}
        </div>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 z-[2] flex justify-center gap-1">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollToIndex(index)}
              aria-label={`Go to image ${index + 1} of ${images.length}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
            >
              <span
                aria-hidden="true"
                className={`block h-2 rounded-full transition-all motion-reduce:transition-none ${
                  index === activeIndex
                    ? "w-6 bg-[#F5F5F5]"
                    : "w-2 bg-[#F5F5F5]/45"
                }`}
              />
            </button>
          ))}
        </div>
      )}

      {isFullscreen && images.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-[#1B1B1B]"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} fullscreen gallery`}
        >
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen gallery"
            className="absolute right-4 top-4 z-10 flex h-11 min-w-11 items-center justify-center rounded-full bg-[#252525]/90 px-4 text-sm font-medium text-[#F5F5F5] ring-1 ring-white/15 backdrop-blur-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
          >
            Close
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#252525]/90 text-2xl font-semibold text-[#F5F5F5] ring-1 ring-white/15 backdrop-blur-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
              >
                ‹
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#252525]/90 text-2xl font-semibold text-[#F5F5F5] ring-1 ring-white/15 backdrop-blur-md transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
              >
                ›
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center p-4">
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
            <div className="absolute bottom-6 left-0 right-0 text-center text-sm font-medium text-[#F5F5F5]">
              {activeIndex + 1} / {images.length}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
