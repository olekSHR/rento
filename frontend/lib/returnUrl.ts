export function sanitizeReturnUrl(value: string | null | undefined): string | null {
  if (!value) {
    return null
  }

  const trimmed = value.trim()

  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return null
  }

  return trimmed
}

export function buildLoginHref(returnUrl: string): string {
  return `/login?returnUrl=${encodeURIComponent(returnUrl)}`
}
