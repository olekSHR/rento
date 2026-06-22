"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuth } from "@/context/AuthContext"

type RealtorRouteProps = {
  children: React.ReactNode
}

export default function RealtorRoute({ children }: RealtorRouteProps) {
  const router = useRouter()

  const { isAuthenticated, isLoading, user } = useAuth()

  const isRealtor = user?.role === "realtor"

  useEffect(() => {
    if (isLoading) {
      return
    }

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (!isRealtor) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, isRealtor, router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 pt-6">
        <div className="mx-auto max-w-md space-y-4">
          <div className="h-12 w-48 animate-pulse rounded-xl bg-zinc-200" />
          <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
        </div>
      </main>
    )
  }

  if (!isAuthenticated || !isRealtor) {
    return null
  }

  return <>{children}</>
}
