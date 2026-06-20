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
        mt-6
        w-full
        rounded-2xl
        border
        border-red-200
        bg-red-50
        p-4
        text-sm
        font-semibold
        text-red-700
        disabled:opacity-60
        active:scale-[0.98]
      "
    >
      {isReported
        ? "Reported. Thank you."
        : "⚠ Report Listing"}
    </button>
  )
}
