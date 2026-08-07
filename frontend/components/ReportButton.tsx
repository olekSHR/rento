"use client"

import { useEffect, useState } from "react"

import { reportProperty } from "@/services/api"

type Props = {
  propertyId: number
}

const FEEDBACK_DURATION_MS = 3000

export default function ReportButton({ propertyId }: Props) {
  const [isReported, setIsReported] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!errorMessage) {
      return
    }

    const timer = window.setTimeout(() => {
      setErrorMessage(null)
    }, FEEDBACK_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [errorMessage])

  async function handleReport() {
    if (isLoading || isReported) {
      return
    }

    try {
      setIsLoading(true)
      setErrorMessage(null)

      await reportProperty(propertyId)

      setIsReported(true)
    } catch (error) {
      console.error(error)
      setErrorMessage("Couldn't report listing. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative mt-8">
      <button
        type="button"
        onClick={handleReport}
        disabled={isLoading || isReported}
        className="
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
        {isLoading
          ? "Reporting..."
          : isReported
            ? "Reported. Thank you."
            : "Report listing"}
      </button>

      {errorMessage ? (
        <p
          role="status"
          aria-live="polite"
          className="
            pointer-events-none
            absolute
            left-0
            right-0
            top-full
            mt-2
            truncate
            text-center
            text-xs
            font-medium
            text-[#E8A0A0]
          "
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
}
