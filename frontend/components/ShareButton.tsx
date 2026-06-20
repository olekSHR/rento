"use client"

import { Share2 } from "lucide-react"

type Props = {
  title: string
  url?: string
}

function isMobileDevice() {
  return /Android|iPhone|iPad|iPod/i.test(
    navigator.userAgent,
  )
}

export default function ShareButton({ title, url }: Props) {
  async function handleShare() {
    const shareUrl = url || window.location.href

    try {
      if (navigator.share && isMobileDevice()) {
        await navigator.share({
          title,
          text: `Check this property on Rento: ${title}`,
          url: shareUrl,
        })

        return
      }

      await navigator.clipboard.writeText(shareUrl)
          } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      aria-label="Share property"
      className="
        absolute
        right-16
        top-3
        z-10
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        bg-black/50
        backdrop-blur-md
        active:scale-90
      "
    >
      <Share2 className="h-5 w-5 text-white" />
    </button>
  )
}
