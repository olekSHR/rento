"use client"

import { Share2 } from "lucide-react"

type Props = {
  url?: string
  className?: string
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export default function ShareButton({ url, className }: Props) {
  async function handleShare() {
    const shareUrl = url || window.location.href
    const shareText = "Discover homes on Rento"

    try {
      if (navigator.share && isMobileDevice()) {
        await navigator.share({
          title: "Rento",
          text: shareText,
          url: shareUrl,
        })

        return
      }

      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share property"
      className={`
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
        ${className ?? "absolute right-[4.25rem] top-3"}
      `}
    >
      <Share2 className="h-5 w-5 text-[#F5F5F5]" aria-hidden="true" />
    </button>
  )
}
