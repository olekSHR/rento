"use client"

import Link from "next/link"
import { useState } from "react"

import { registerUser } from "@/services/api"

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

      await registerUser(email.trim(), password)

      setIsSuccess(true)
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : "Registration failed. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Create account</h1>

        <p className="mb-6 text-sm text-zinc-500">
          Register to save favorites and use Rento across devices.
        </p>

        {isSuccess ? (
          <div className="space-y-4">
            <p className="rounded-2xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700 ring-1 ring-emerald-100">
              Account created. You can now sign in.
            </p>

            <Link
              href="/login"
              className="flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
            >
              Go to login
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

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="new-password"
              className="h-12 rounded-2xl border border-zinc-300 px-4 outline-none"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
              autoComplete="new-password"
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
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>
        )}

        {!isSuccess && (
          <p className="mt-5 text-center text-sm text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-700">
              Sign in
            </Link>
          </p>
        )}

        <p className="mt-4 rounded-2xl bg-zinc-50 p-3 text-center text-xs leading-5 text-zinc-500 ring-1 ring-zinc-100">
          Are you a realtor? Contact Rento to request workspace access.
        </p>
      </div>
    </main>
  )
}
