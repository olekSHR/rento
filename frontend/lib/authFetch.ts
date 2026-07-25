import { getCsrfHeaderValue } from "./csrf";
import { parseApiErrorMessage } from "./apiError";
import { dispatchAuthUnauthorized } from "./authSessionEvents";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export async function authFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  const csrfToken = getCsrfHeaderValue();

  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (response.status === 401) {
    dispatchAuthUnauthorized();
    throw new UnauthorizedError("Session expired or invalid");
  }

  if (response.status === 403) {
    throw new ForbiddenError("Access forbidden");
  }

  if (!response.ok) {
    const message = await parseApiErrorMessage(
      response,
      `Request failed: ${response.status}`
    );
    throw new Error(message);
  }

  return response.json();
}
