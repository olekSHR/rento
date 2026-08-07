"use client"

import { Heart } from "lucide-react"

import { useFavorites } from "@/context/FavoritesContext"

interface FavoriteButtonProps {
  propertyId: number
  className?: string
}

const errorClassName =
  "rounded-lg border border-red-400/15 bg-[#2A2222] px-2 py-1 text-[11px] font-medium leading-snug text-red-100/90 shadow-[0_10px_25px_rgba(0,0,0,0.22)]"

export default function FavoriteButton({
  propertyId,
  className,
}: FavoriteButtonProps) {
  const {
    isFavorite,
    toggleFavorite,
    isLoading,
    isToggling,
    getToggleError,
  } = useFavorites()

  const active = isFavorite(propertyId)
  const pending = isToggling(propertyId)
  const toggleError = getToggleError(propertyId)
  const isDisabled = isLoading || pending

  const ariaLabel = active ? "Remove from favorites" : "Add to favorites"

  const handleClick = async () => {
    if (isDisabled) {
      return
    }

    await toggleFavorite(propertyId)
  }

  return (
    <div className={className ?? "absolute right-3 top-3"}>
      <button
        type="button"
        onClick={() => void handleClick()}
        aria-label={ariaLabel}
        aria-pressed={active}
        aria-busy={pending || undefined}
        aria-describedby={toggleError ? `favorite-error-${propertyId}` : undefined}
        disabled={isDisabled}
        className={`
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
          disabled:pointer-events-none
          disabled:opacity-60
          motion-reduce:transition-none
          ${toggleError ? "ring-2 ring-red-400/40" : ""}
        `}
      >
        <Heart
          aria-hidden="true"
          className={`
            h-5
            w-5
            transition
            motion-reduce:transition-none
            ${
              active
                ? "fill-red-500 text-red-500"
                : "text-[#F5F5F5]"
            }
            ${pending ? "scale-90 opacity-80" : ""}
          `}
        />
      </button>

      {toggleError ? (
        <p
          id={`favorite-error-${propertyId}`}
          role="alert"
          className={`absolute right-0 top-full z-20 mt-1 max-w-[11rem] ${errorClassName}`}
        >
          {toggleError}
        </p>
      ) : null}
    </div>
  )
}
