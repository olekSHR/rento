"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

import { Share2 } from "lucide-react"

type Props = {
  url?: string
  className?: string
}

type FeedbackState = {
  message: string
  anchor: DOMRect
}

const FEEDBACK_DURATION_MS = 2500

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

function isShareCancelled(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError"
}

function shouldUseNativeShare() {
  return typeof navigator.share === "function" && isMobileDevice()
}

export default function ShareButton({ url, className }: Props) {
  const [feedback, setFeedback] = useState<FeedbackState | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!feedback) {
      return
    }

    const timer = window.setTimeout(() => {
      setFeedback(null)
    }, FEEDBACK_DURATION_MS)

    return () => {
      window.clearTimeout(timer)
    }
  }, [feedback])

  function showFeedback(message: string) {
    const anchor = buttonRef.current?.getBoundingClientRect()
    if (!anchor) {
      return
    }

    setFeedback({ message, anchor })
  }

  async function handleShare() {
    const shareUrl = url || window.location.href
    const shareText = "Discover homes on Rento"
    const clipboardText = `${shareText}\n${shareUrl}`

    if (shouldUseNativeShare()) {
      try {
        await navigator.share({
          title: "Rento",
          text: shareText,
          url: shareUrl,
        })

        showFeedback("Shared")
        return
      } catch (error) {
        if (isShareCancelled(error)) {
          return
        }
      }
    }

    try {
      await navigator.clipboard.writeText(clipboardText)
      showFeedback("Link copied")
    } catch (error) {
      console.error(error)
    }
  }

  const feedbackNode =
    feedback && typeof document !== "undefined"
      ? createPortal(
          <span
            role="status"
            aria-live="polite"
            style={{
              position: "fixed",
              top: feedback.anchor.bottom + 8,
              right: window.innerWidth - feedback.anchor.right,
              zIndex: 1000,
            }}
            className="
              pointer-events-none
              max-w-[calc(100vw-2rem)]
              truncate
              whitespace-nowrap
              rounded-full
              border
              border-white/10
              bg-[#1B1B1B]/90
              px-2.5
              py-1
              text-[11px]
              font-medium
              text-[#DFC58A]
              shadow-[0_8px_20px_rgba(0,0,0,0.24)]
              backdrop-blur-sm
            "
          >
            {feedback.message}
          </span>,
          document.body,
        )
      : null

  return (
    <>
      <div className={className ?? "absolute right-[4.25rem] top-3"}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => void handleShare()}
          aria-label="Share property"
          className="
            relative
            z-10
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-[#1B1B1B]/55
            text-[#F5F5F5]
            shadow-[0_10px_25px_rgba(0,0,0,0.22)]
            backdrop-blur-md
            transition
            active:scale-95
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#DFC58A]
          "
        >
          <Share2 className="h-5 w-5 text-[#F5F5F5]" aria-hidden="true" />
        </button>
      </div>
      {feedbackNode}
    </>
  )
}
