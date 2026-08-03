"use client"

import Link from "next/link"
import { useState } from "react"

import AuthField from "@/components/auth/AuthField"
import AuthShell, {
  authErrorClassName,
  authFormStackClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
  authRealtorNoteClassName,
  authSecondaryTextClassName,
  authSuccessClassName,
} from "@/components/auth/AuthShell"
import { registerUser } from "@/services/authApi"

const FORM_ERROR_ID = "register-form-error"

function getRegistrationErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) {
    return "Registration failed. Please try again."
  }

  if (error.message === "Request failed: 400") {
    return "This email is already registered."
  }

  if (error.message.startsWith("Request failed:")) {
    return "Registration failed. Please try again."
  }

  return error.message || "Registration failed. Please try again."
}

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (!email.trim()) {
      setError("Email is required.")
      return
    }

    if (!password) {
      setError("Password is required.")
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    try {
      setIsLoading(true)

      await registerUser({
        email: email.trim(),
        password,
      })

      setIsSuccess(true)
    } catch (registerError) {
      setError(getRegistrationErrorMessage(registerError))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell
      title="Create account"
      description="Register to save favorites and use Rento across devices."
      footer={
        <p className={authRealtorNoteClassName}>
          Are you a realtor? Contact Rento to request workspace access.
        </p>
      }
    >
      {isSuccess ? (
        <div className="space-y-3">
          <p role="alert" aria-live="polite" className={authSuccessClassName}>
            Account created. You can now sign in.
          </p>

          <Link href="/login" className={authPrimaryButtonClassName}>
            Go to login
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={authFormStackClassName}>
            <AuthField
              id="register-email"
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              invalid={Boolean(error)}
              errorDescribedBy={error ? FORM_ERROR_ID : undefined}
            />

            <AuthField
              id="register-password"
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
              required
              invalid={Boolean(error)}
              errorDescribedBy={error ? FORM_ERROR_ID : undefined}
            />

            <AuthField
              id="register-confirm-password"
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              autoComplete="new-password"
              required
              invalid={Boolean(error)}
              errorDescribedBy={error ? FORM_ERROR_ID : undefined}
            />

            {error ? (
              <p
                id={FORM_ERROR_ID}
                role="alert"
                aria-live="polite"
                className={authErrorClassName}
              >
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className={authPrimaryButtonClassName}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className={`mt-4 text-center ${authSecondaryTextClassName}`}>
            Already have an account?{" "}
            <Link href="/login" className={authLinkClassName}>
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
