export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function getServerApiBaseUrl(): string {
  if (typeof window !== "undefined") {
    return API_BASE_URL;
  }

  return process.env.INTERNAL_API_URL || API_BASE_URL;
}
