"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import AuthField from "@/components/auth/AuthField"
import AuthShell, {
  authErrorClassName,
  authFormStackClassName,
  authLinkClassName,
  authPrimaryButtonClassName,
  authSecondaryTextClassName,
  authSkeletonClassName,
  authSuccessClassName,
} from "@/components/auth/AuthShell"
import { resetPassword } from "@/services/authApi"

const SUCCESS_MESSAGE = "Password updated. You can now sign in."

const FORM_ERROR_ID = "reset-password-form-error"

function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get("token") ?? ""

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const hasToken = tokenFromUrl.trim().length > 0

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError("")

    if (!hasToken) {
      setError("Reset link is invalid or missing. Request a new one.")
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

      await resetPassword(tokenFromUrl, password)

      setIsSuccess(true)
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Invalid or expired reset token."
      )
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasToken && !isSuccess) {
    return (
      <div className="space-y-3">
        <p role="alert" aria-live="polite" className={authErrorClassName}>
          Reset link is invalid or missing. Request a new one.
        </p>

        <Link href="/forgot-password" className={authPrimaryButtonClassName}>
          Request new reset link
        </Link>

        <p className={`text-center ${authSecondaryTextClassName}`}>
          <Link href="/login" className={authLinkClassName}>
            Back to login
          </Link>
        </p>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="space-y-3">
        <p role="alert" aria-live="polite" className={authSuccessClassName}>
          {SUCCESS_MESSAGE}
        </p>

        <Link href="/login" className={authPrimaryButtonClassName}>
          Go to login
        </Link>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={authFormStackClassName}>
        <AuthField
          id="reset-password-new"
          label="New password"
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
          id="reset-password-confirm"
          label="Confirm new password"
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
          <div className="space-y-2">
            <p
              id={FORM_ERROR_ID}
              role="alert"
              aria-live="polite"
              className={authErrorClassName}
            >
              {error}
            </p>

            <p className="text-center">
              <Link href="/forgot-password" className={authLinkClassName}>
                Request a new reset link
              </Link>
            </p>
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className={authPrimaryButtonClassName}
        >
          {isLoading ? "Updating..." : "Update password"}
        </button>
      </form>

      <p className={`mt-4 text-center ${authSecondaryTextClassName}`}>
        <Link href="/login" className={authLinkClassName}>
          Back to login
        </Link>
      </p>
    </>
  )
}

export default function ResetPasswordPage() {
  return (
    <AuthShell
      title="Reset password"
      description="Choose a new password for your account."
    >
      <Suspense
        fallback={
          <div className="space-y-3" aria-hidden="true">
            <div className={authSkeletonClassName} />
            <div className={authSkeletonClassName} />
            <div className={authSkeletonClassName} />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  )
}
