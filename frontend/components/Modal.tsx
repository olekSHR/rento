"use client"

import { useEffect } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Modal({
  isOpen,
  onClose,
  children,
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

  if (!isOpen) return null

  return (
    <div
      className="
        fixed
        inset-0
        z-50
      "
    >
      <div
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-black/40
          backdrop-blur-sm
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          bg-white
          rounded-t-3xl
          p-5
          animate-slide-up
          max-w-md
          mx-auto
          max-h-[85vh]
          overflow-y-auto
        "
      >
        <div
          className="
            w-14
            h-1.5
            bg-zinc-300
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