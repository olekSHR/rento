type ErrorEnvelope = {
  message?: unknown
  detail?: unknown
}

/**
 * Extract a safe user-facing message from a non-OK API response body.
 * Precedence: non-empty string message → non-empty string detail → fallback.
 * Never surfaces array/object validation structures.
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
