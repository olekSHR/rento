"use client"

import { useState, type ReactNode } from "react"
import Image from "next/image"
import { X } from "lucide-react"

type RealtorAvatarLightboxProps = {
  imageUrl: string
  alt: string
  isOpen: boolean
  onClose: () => void
}

export function RealtorAvatarLightbox({
  imageUrl,
  alt,
  isOpen,
  onClose,
}: RealtorAvatarLightboxProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} photo`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close photo preview"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/20 active:scale-95"
      >
        <X className="h-5 w-5" />
      </button>

      <div
        className="relative h-[min(70vw,320px)] w-[min(70vw,320px)] shrink-0 overflow-hidden rounded-full ring-4 ring-white/25"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt={alt}
          fill
          unoptimized
          className="object-cover"
          sizes="320px"
        />
      </div>
    </div>
  )
}

type RealtorAvatarEnlargeTriggerProps = {
  imageUrl: string
  alt: string
  className?: string
  children: ReactNode
}

export function RealtorAvatarEnlargeTrigger({
  imageUrl,
  alt,
  className = "",
  children,
}: RealtorAvatarEnlargeTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`View ${alt} photo`}
        className={className}
      >
        {children}
      </button>

      <RealtorAvatarLightbox
        imageUrl={imageUrl}
        alt={alt}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  )
}
