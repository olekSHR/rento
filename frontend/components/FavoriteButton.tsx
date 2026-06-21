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
      <Heart
        className={`
          h-6
          w-6
          transition-all
          duration-200
          ${
            active
              ? "fill-red-500 text-red-500"
              : "text-zinc-800"
          }
        `}
      />
    </button>
  );
}
