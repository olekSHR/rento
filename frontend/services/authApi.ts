import type {
  AuthResponse,
  CurrentUserResponse,
  LoginRequest,
  MessageResponse,
  RegisterRequest,
} from "@/types/auth";
import { authFetch } from "@/lib/authFetch";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function parseApiErrorMessage(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = (await response.json()) as { message?: unknown };

    if (typeof data.message === "string" && data.message.trim()) {
      return data.message;
    }
  } catch {
    // Keep fallback message
  }

  return fallback;
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const formData = new URLSearchParams();

  formData.append("username", data.email);
  formData.append("password", data.password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    try {
      const data = (await response.json()) as { message?: unknown };
      if (typeof data.message === "string" && data.message.trim()) {
        throw new Error(data.message);
      }
    } catch {
      // Ignore parse errors and fall back to generic message
    }

    throw new Error("Invalid email or password");
  }

  return response.json();
}

export async function registerUser(
  data: RegisterRequest
): Promise<CurrentUserResponse> {
  return authFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  return authFetch("/users/me");
}

export async function requestPasswordReset(
  email: string
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const message = await parseApiErrorMessage(
      response,
      "Unable to process request. Please try again."
    );
    throw new Error(message);
  }

  return response.json();
}

export async function resetPassword(
  token: string,
  newPassword: string
): Promise<MessageResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      new_password: newPassword,
    }),
  });

  if (!response.ok) {
    const message = await parseApiErrorMessage(
      response,
      "Invalid or expired reset token."
    );
    throw new Error(message);
  }

  return response.json();
}