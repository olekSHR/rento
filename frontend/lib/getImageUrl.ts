import { API_BASE_URL } from "@/lib/apiBaseUrl"

const API_URL = API_BASE_URL.replace(/\/$/, "")

export function normalizeImagePath(
  imageUrl: string | null | undefined
): string | null {
  if (!imageUrl) {
    return null
  }

  const trimmed = imageUrl.trim()

  if (!trimmed) {
    return null
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`
}

export function getImageUrl(
  imageUrl: string | null | undefined
): string | null {
  const normalized = normalizeImagePath(imageUrl)

  if (!normalized) {
    return null
  }

  if (normalized.startsWith("http://") || normalized.startsWith("https://")) {
    return normalized
  }

  return `${API_URL}${normalized}`
}

type PropertyImageSource = {
  image_url?: string | null
  images?: Array<{ url: string; is_cover?: boolean }> | null
}

/** Resolves the best listing image path for photography-first surfaces. */
export function resolvePropertyListingImage(
  property: PropertyImageSource
): string | null {
  const candidates = [
    property.images?.find((image) => image.is_cover)?.url,
    property.images?.[0]?.url,
    property.image_url,
  ]

  for (const candidate of candidates) {
    const normalized = normalizeImagePath(candidate)

    if (normalized) {
      return normalized
    }
  }

  return null
}

export function hasPropertyListingImage(
  property: PropertyImageSource
): boolean {
  return resolvePropertyListingImage(property) !== null
}
