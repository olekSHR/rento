import { TELEGRAM_USERNAME_VALIDATION_MESSAGE } from "@/lib/telegram"

type ErrorEnvelope = {
  message?: unknown
  detail?: unknown
}

type ValidationDetailItem = {
  msg?: unknown
  loc?: unknown
}

function mapValidationDetailMessage(detail: unknown): string | null {
  if (!Array.isArray(detail) || detail.length === 0) {
    return null
  }

  for (const item of detail) {
    if (!item || typeof item !== "object") {
      continue
    }

    const entry = item as ValidationDetailItem
    const location = Array.isArray(entry.loc) ? entry.loc : []
    const message =
      typeof entry.msg === "string" ? entry.msg.trim() : ""

    if (!message) {
      continue
    }

    if (
      location.includes("telegram_username") ||
      message.includes("Invalid Telegram username")
    ) {
      return TELEGRAM_USERNAME_VALIDATION_MESSAGE
    }
  }

  return null
}

/**
 * Extract a safe user-facing message from a non-OK API response body.
 * Precedence: non-empty string message → mapped validation detail → non-empty string detail → fallback.
 * Never surfaces raw array/object validation structures.
 */
export async function parseApiErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = (await response.json()) as ErrorEnvelope

    if (typeof data.message === "string" && data.message.trim().length > 0) {
      return data.message
    }

    const validationMessage = mapValidationDetailMessage(data.detail)

    if (validationMessage) {
      return validationMessage
    }

    if (typeof data.detail === "string" && data.detail.trim().length > 0) {
      return data.detail
    }
  } catch {
    // Empty body or invalid JSON — use fallback.
  }

  return fallback
}

export class ApiHttpError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = "ApiHttpError"
    this.status = status
  }
}

export function isApiHttpError(error: unknown): error is ApiHttpError {
  return error instanceof ApiHttpError
}
