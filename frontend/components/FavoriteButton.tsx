"use client";

import { Heart } from "lucide-react";

import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteButtonProps {
  propertyId: number;
}

export default function FavoriteButton({
  propertyId,
}: FavoriteButtonProps) {
  const {
    isFavorite,
    toggleFavorite,
    isLoading,
  } = useFavorites();

  const active = isFavorite(propertyId);

  const handleClick = async () => {
    if (isLoading) {
      return;
    }

    await toggleFavorite(propertyId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Toggle favorite"
      className="
        absolute
        right-3
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
        transition-all
        duration-200
        active:scale-90
      "
    >
      <Heart
        className={`
          h-6
          w-6
          transition-all
          duration-200
          ${
            active
              ? "fill-red-500 text-red-500"
              : "text-white"
          }
        `}
      />
    </button>
  );
}