const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"

export function getImageUrl(
  imageUrl: string | null
) {

  if (!imageUrl) {
    return null
  }

  return `${API_URL}${imageUrl}`
}