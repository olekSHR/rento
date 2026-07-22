export const CSRF_COOKIE_NAME = "rento_csrf";

export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const prefix = `${CSRF_COOKIE_NAME}=`;
  const cookies = document.cookie.split(";");

  for (const entry of cookies) {
    const trimmed = entry.trim();

    if (trimmed.startsWith(prefix)) {
      return decodeURIComponent(trimmed.slice(prefix.length));
    }
  }

  return null;
}

export function getCsrfHeaderValue(): string | null {
  return getCsrfTokenFromCookie();
}
