"use client"

import Link from "next/link"
import { useState } from "react"

import { requestPasswordReset } from "@/services/authApi"

const SUCCESS_MESSAGE =
  "If an account with that email exists, we sent password reset instructions."

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
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Forgot password</h1>

        <p className="mb-6 text-sm text-zinc-500">
          Enter your email and we&apos;ll send reset instructions if an account
          exists.
        </p>

        {isSuccess ? (
          <div className="space-y-4">
            <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
              {SUCCESS_MESSAGE}
            </p>

            <Link
              href="/login"
              className="flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
            >
              Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="h-12 rounded-2xl border border-zinc-300 px-4 outline-none"
            />

            {error && (
              <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="h-12 rounded-2xl bg-blue-700 font-medium text-white transition-transform active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        {!isSuccess && (
          <p className="mt-5 text-center text-sm text-zinc-600">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-blue-700">
              Sign in
            </Link>
          </p>
        )}
      </div>
    </main>
  )
}
