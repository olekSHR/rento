"use client"

import Link from "next/link"
import { useState } from "react"

import AuthField from "@/components/auth/AuthField"
import AuthShell, {
  authErrorClassName,
  authFormStackClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
  authSecondaryTextClassName,
  authSuccessClassName,
} from "@/components/auth/AuthShell"
import { requestPasswordReset } from "@/services/authApi"

const SUCCESS_MESSAGE =
  "If an account with that email exists, we sent password reset instructions."

const FORM_ERROR_ID = "forgot-password-form-error"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
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

    try {
      setIsLoading(true)

      await requestPasswordReset(email.trim())

      setIsSuccess(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to process request. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthShell
      title="Forgot password"
      description="Enter your email and we'll send reset instructions if an account exists."
    >
      {isSuccess ? (
        <div className="space-y-3">
          <p role="alert" aria-live="polite" className={authSuccessClassName}>
            {SUCCESS_MESSAGE}
          </p>

          <Link href="/login" className={authPrimaryButtonClassName}>
            Back to login
          </Link>
        </div>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={authFormStackClassName}>
            <AuthField
              id="forgot-password-email"
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
              {isLoading ? "Sending..." : "Send reset link"}
            </button>
          </form>

          <p className={`mt-4 text-center ${authSecondaryTextClassName}`}>
            Remember your password?{" "}
            <Link href="/login" className={authLinkClassName}>
              Sign in
            </Link>
          </p>
        </>
      )}
    </AuthShell>
  )
}
