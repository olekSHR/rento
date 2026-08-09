export function buildTelegramUrl(username: string): string {
  return `https://t.me/${username}`
}

const TELEGRAM_USERNAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9_]{4,31}$/

const UNSAFE_SCHEMES = ["javascript:", "data:", "vbscript:"]

export const TELEGRAM_USERNAME_VALIDATION_MESSAGE =
  "Telegram username must contain 5–32 characters and start with a letter."

function extractTelegramUsername(raw: string): string | null {
  const trimmed = raw.trim()

  if (!trimmed) {
    return null
  }

  const lower = trimmed.toLowerCase()

  if (UNSAFE_SCHEMES.some((scheme) => lower.startsWith(scheme))) {
    return null
  }

  let username: string

  if (trimmed.includes("://") || lower.startsWith("t.me/")) {
    let parseTarget = trimmed

    if (lower.startsWith("t.me/")) {
      parseTarget = `https://${trimmed}`
    }

    let parsed: URL

    try {
      parsed = new URL(parseTarget)
    } catch {
      return null
    }

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null
    }

    const host = parsed.hostname.toLowerCase()

    if (host !== "t.me" && host !== "www.t.me") {
      return null
    }

    if (parsed.search || parsed.hash) {
      return null
    }

    const path = parsed.pathname.replace(/^\/+|\/+$/g, "")

    if (!path || path.includes("/")) {
      return null
    }

    username = path
  } else {
    username = trimmed.replace(/^@+/, "")
  }

  if (!username || /[ /?#]/.test(username)) {
    return null
  }

  if (!TELEGRAM_USERNAME_PATTERN.test(username)) {
    return null
  }

  return username
}

export function getTelegramUsernameInputError(value: string): string | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  return extractTelegramUsername(trimmed) === null
    ? TELEGRAM_USERNAME_VALIDATION_MESSAGE
    : null
}
