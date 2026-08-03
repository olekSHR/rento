"use client"

import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  return (
    <button
      type="button"
      onClick={() => router.back()}
      aria-label="Go back"
      className="
        absolute
        left-4
        top-4
        z-30
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-[#1B1B1B]/55
        text-xl
        text-[#F5F5F5]
        ring-1
        ring-white/15
        backdrop-blur-md
        transition
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#DFC58A]
      "
    >
      ←
    </button>
  )
}
