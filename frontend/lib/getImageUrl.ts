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
