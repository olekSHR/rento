"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  labelledBy?: string
}

export default function Modal({
  isOpen,
  onClose,
  children,
  labelledBy,
}: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-[60]
      "
    >
      <div
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-[#1B1B1B]/70
          backdrop-blur-sm
        "
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="
          absolute
          bottom-0
          left-0
          right-0
          bg-[#252525]
          rounded-t-3xl
          px-5
          pt-5
          pb-sheet-bottom
          animate-slide-up
          max-w-md
          mx-auto
          max-h-[85vh]
          overflow-y-auto
          border-t
          border-white/10
        "
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close filters"
          className="
            absolute
            right-4
            top-4
            z-10
            inline-flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/12
            bg-[#2D2D2D]/80
            text-[#F5F5F5]
            transition-colors
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#DFC58A]
            focus-visible:ring-offset-2
            focus-visible:ring-offset-[#252525]
          "
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div
          aria-hidden="true"
          className="
            w-14
            h-1.5
            bg-[#B8B8B8]/35
            rounded-full
            mx-auto
            mb-5
          "
        />

        {children}
      </div>
    </div>
  )
}
