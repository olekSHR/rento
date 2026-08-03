"use client"

import { useState } from "react"

import { reportProperty } from "@/services/api"

type Props = {
  propertyId: number
}

export default function ReportButton({ propertyId }: Props) {
  const [isReported, setIsReported] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function handleReport() {
    if (isLoading || isReported) {
      return
    }

    try {
      setIsLoading(true)

      await reportProperty(propertyId)

      setIsReported(true)
    } catch (error) {
      console.error(error)
      alert("Failed to report listing")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleReport}
      disabled={isLoading || isReported}
      className="
        mt-8
        w-full
        rounded-2xl
        border
        border-white/10
        bg-[#252525]
        px-4
        py-3.5
        text-sm
        font-medium
        text-[#B8B8B8]
        transition
        hover:border-white/15
        hover:text-[#F5F5F5]
        disabled:opacity-60
        active:scale-[0.99]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-[#DFC58A]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#1B1B1B]
      "
    >
      {isReported ? "Reported. Thank you." : "Report listing"}
    </button>
  )
}
