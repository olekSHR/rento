"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

function getPostLoginPath(role: string): string {
  if (role === "admin") {
    return "/admin"
  }

  if (role === "realtor") {
    return "/realtor"
  }

  return "/"
}

export default function LoginPage() {
  const router = useRouter()

  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [isLoading, setIsLoading] = useState(false)

  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      setError("")
      setIsLoading(true)

      const user = await login({
        email,
        password,
      })

      router.push(getPostLoginPath(user.role))
    } catch (err) {
      if (err instanceof Error && err.message) {
        setError(err.message)
      } else {
        setError("Invalid email or password")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-100 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">Login</h1>

        <p className="mb-6 text-sm text-zinc-500">
          Sign in to save favorites and access your account.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="h-12 rounded-2xl border border-zinc-300 px-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
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
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-600">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-700"
          >
            Create account
          </Link>
        </p>

        <p className="mt-4 rounded-2xl bg-zinc-50 p-3 text-center text-xs leading-5 text-zinc-500 ring-1 ring-zinc-100">
          Are you a realtor? Contact Rento to request workspace access.
        </p>
      </div>
    </main>
  )
}
