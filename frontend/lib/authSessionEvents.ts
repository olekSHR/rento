export function dispatchAuthUnauthorized(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth:unauthorized"));
  }
}
