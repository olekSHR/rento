/** Session transport uses HttpOnly cookies; no JS-readable auth credentials. */

export function saveToken(): void {
  // Deprecated: bearer tokens are no longer stored client-side.
}

export function getToken(): string | null {
  return null;
}

export function removeToken(): void {
  // Deprecated: session cookies are cleared server-side on logout.
}

export function hasToken(): boolean {
  return false;
}
