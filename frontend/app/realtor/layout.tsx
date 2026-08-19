"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import RealtorWorkspaceShell from "@/components/realtor/workspace/RealtorWorkspaceShell"
import { useAuth } from "@/context/AuthContext"
import { buildLoginHref, sanitizeReturnUrl } from "@/lib/returnUrl"

type RealtorLayoutProps = {
  children: React.ReactNode
}

function RealtorWorkspaceSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#1B1B1B] px-4 py-6 md:px-8"
    >
      <span className="sr-only">Loading realtor workspace</span>
      <div className="mx-auto max-w-[1280px] space-y-4">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
        <div className="h-64 animate-pulse rounded-3xl bg-white/10 motion-reduce:animate-none" />
        <div className="h-64 animate-pulse rounded-3xl bg-white/10 motion-reduce:animate-none" />
      </div>
    </div>
  )
}

export default function RealtorLayout({ children }: RealtorLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, isLoading, isRealtor } = useAuth()

  const isUnauthenticated = !isLoading && !isAuthenticated
  const isUnauthorized = !isLoading && isAuthenticated && !isRealtor
  const isDenied = isUnauthenticated || isUnauthorized

  useEffect(() => {
    if (isUnauthenticated) {
      const search = window.location.search
      const requestedPath = search ? `${pathname}${search}` : pathname
      const returnPath = sanitizeReturnUrl(requestedPath) ?? pathname

      router.push(buildLoginHref(returnPath))
      return
    }

    if (isUnauthorized) {
      router.push("/")
    }
  }, [isUnauthenticated, isUnauthorized, pathname, router])

  if (isLoading || isDenied) {
    return <RealtorWorkspaceSkeleton />
  }

  return <RealtorWorkspaceShell>{children}</RealtorWorkspaceShell>
}
