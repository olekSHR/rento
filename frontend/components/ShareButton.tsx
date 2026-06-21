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
  right-[4.25rem]
  top-3
  z-10
  flex
  h-12
  w-12
  items-center
  justify-center
  rounded-full
  border
  border-white/70
  bg-white/90
  text-zinc-900
  shadow-[0_10px_25px_rgba(15,23,42,0.18)]
  backdrop-blur-xl
  transition-all
  duration-200
  active:scale-90
"
    >
      <Share2 className="h-5 w-5 text-zinc-800" />
    </button>
  )
}
