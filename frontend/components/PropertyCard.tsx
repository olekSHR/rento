import Image from "next/image"
import Link from "next/link"

import FavoriteButton from "./FavoriteButton"

import { getImageUrl } from "@/lib/getImageUrl"
import type { Property } from "@/types/property"

type PropertyCardProps = Pick<
  Property,
  "id" | "title" | "price" | "city" | "rooms" | "image_url" | "images"
>

export default function PropertyCard({
  id,
  title,
  price,
  city,
  rooms,
  image_url,
  images,
}: PropertyCardProps) {
  const coverImage =
    images?.find((image) => image.is_cover)?.url ??
    images?.[0]?.url ??
    image_url ??
    null

  return (
    <article className="relative mx-auto mb-4 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 active:scale-[0.98] md:max-w-lg">
      <FavoriteButton propertyId={id} />

      <Link href={`/properties/${id}`} className="block">
        <div className="relative h-52 w-full bg-zinc-200">
          {coverImage ? (
            <Image
              src={getImageUrl(coverImage) || ""}
              alt={title}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 512px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-zinc-500">
              No Image
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="text-xl font-semibold text-black">{title}</h2>

          <p className="mt-1 text-zinc-600">
            {city || "Unknown city"}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-lg font-bold text-black">
              ${price || 0}
            </span>

            <span className="text-zinc-500">{rooms || 0} rooms</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
