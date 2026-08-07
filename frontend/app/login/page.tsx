"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"

import AuthField from "@/components/auth/AuthField"
import AuthShell, {
  authErrorClassName,
  authLinkClassName,
  authFormStackClassName,
  authPrimaryButtonClassName,
  authRealtorNoteClassName,
  authSecondaryTextClassName,
  authSkeletonClassName,
} from "@/components/auth/AuthShell"
import { useAuth } from "@/context/AuthContext"
import { sanitizeReturnUrl } from "@/lib/returnUrl"

const FORM_ERROR_ID = "login-form-error"

function getPostLoginPath(role: string, returnUrl: string | null): string {
  if (returnUrl) {
    return returnUrl
  }

  if (role === "admin") {
    return "/admin"
  }

  if (role === "realtor") {
    return "/realtor"
  }

  return "/"
}

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = sanitizeReturnUrl(searchParams.get("returnUrl"))

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

      router.push(getPostLoginPath(user.role, returnUrl))
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
    <AuthShell
      title="Login"
      description="Sign in to save favorites and access your account."
      footer={
        <p className={authRealtorNoteClassName}>
          Are you a realtor? Contact Rento to request workspace access.
        </p>
      }
    >
      <form onSubmit={handleSubmit} className={authFormStackClassName}>
        <AuthField
          id="login-email"
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
          id="login-password"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          invalid={Boolean(error)}
          errorDescribedBy={error ? FORM_ERROR_ID : undefined}
        />

        <p className="-mt-1 text-right">
          <Link href="/forgot-password" className={authLinkClassName}>
            Forgot password?
          </Link>
        </p>

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
          {isLoading ? "Signing in..." : "Login"}
        </button>
      </form>

      <p className={`mt-4 text-center ${authSecondaryTextClassName}`}>
        Don&apos;t have an account?{" "}
        <Link
          href={
            returnUrl
              ? `/register?returnUrl=${encodeURIComponent(returnUrl)}`
              : "/register"
          }
          className={authLinkClassName}
        >
          Create account
        </Link>
      </p>
    </AuthShell>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <AuthShell
          title="Login"
          description="Sign in to save favorites and access your account."
        >
          <div className="space-y-3" role="status" aria-live="polite">
            <span className="sr-only">Loading login</span>
            <div className={authSkeletonClassName} aria-hidden="true" />
            <div className={authSkeletonClassName} aria-hidden="true" />
            <div className={authSkeletonClassName} aria-hidden="true" />
          </div>
        </AuthShell>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
