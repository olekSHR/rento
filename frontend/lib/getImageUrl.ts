const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"
).replace(/\/$/, "")

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
