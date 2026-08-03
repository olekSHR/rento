"use client"

import { Heart } from "lucide-react"

import { useFavorites } from "@/context/FavoritesContext"

interface FavoriteButtonProps {
  propertyId: number
  className?: string
}

export default function FavoriteButton({
  propertyId,
  className,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoading } = useFavorites()

  const active = isFavorite(propertyId)

  const handleClick = async () => {
    if (isLoading) {
      return
    }

    await toggleFavorite(propertyId)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle favorite"
      aria-pressed={active}
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
        ${className ?? "absolute right-3 top-3"}
      `}
    >
      <Heart
        className={`
          h-5
          w-5
          transition
          ${
            active
              ? "fill-red-500 text-red-500"
              : "text-[#F5F5F5]"
          }
        `}
      />
    </button>
  )
}
