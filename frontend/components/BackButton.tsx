"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {

  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="
        absolute
        z-30
        top-4
        left-4
        w-11
        h-11
        rounded-full
        bg-white/90
        backdrop-blur
        shadow-md
        flex
        items-center
        justify-center
        text-xl
        active:scale-90
        transition-transform
      "
      aria-label="Go back"
    >
      ←
    </button>
  )
}