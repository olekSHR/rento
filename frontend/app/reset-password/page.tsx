"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import { resetPassword } from "@/services/authApi"

const SUCCESS_MESSAGE = "Password updated. You can now sign in."

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
      <div className="space-y-4">
        <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 ring-1 ring-red-100">
          Reset link is invalid or missing. Request a new one.
        </p>

        <Link
          href="/forgot-password"
          className="flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
        >
          Request new reset link
        </Link>

        <p className="text-center text-sm text-zinc-600">
          <Link href="/login" className="font-semibold text-blue-700">
            Back to login
          </Link>
        </p>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="space-y-4">
        <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
          {SUCCESS_MESSAGE}
        </p>

        <Link
          href="/login"
          className="flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
        >
          Go to login
        </Link>
      </div>
    )
  }

  return (
  <>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="password"
        placeholder="New password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        autoComplete="new-password"
        className="h-12 rounded-2xl border border-zinc-300 px-4 outline-none"
      />

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
        autoComplete="new-password"
        className="h-12 rounded-2xl border border-zinc-300 px-4 outline-none"
      />

      {error && (
        <div className="space-y-3">
          <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
            {error}
          </p>

          <Link
            href="/forgot-password"
            className="block text-center text-sm font-semibold text-blue-700"
          >
            Request a new reset link
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="h-12 rounded-2xl bg-blue-700 font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? "Updating..." : "Update password"}
      </button>
    </form>

    <p className="mt-5 text-center text-sm text-zinc-600">
      <Link href="/login" className="font-semibold text-blue-700">
        Back to login
      </Link>
    </p>
  </>
  )
}

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Reset password</h1>

        <p className="mb-6 text-sm text-zinc-500">
          Choose a new password for your account.
        </p>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-12 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-12 animate-pulse rounded-2xl bg-zinc-200" />
              <div className="h-12 animate-pulse rounded-2xl bg-zinc-200" />
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </main>
  )
}
