"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import ConsumerShell from "@/components/ConsumerShell"
import ProtectedRoute from "@/components/ProtectedRoute"
import ViewingRequestRelationshipDetail from "@/components/ViewingRequestRelationshipDetail"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { cancelViewingRequest, getMyViewingRequest } from "@/services/api"
import type { ViewingRequest } from "@/types/viewingRequest"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

function parseRequestId(rawId: string | string[] | undefined): number | null {
  if (typeof rawId !== "string" || !/^\d+$/.test(rawId)) {
    return null
  }

  return Number(rawId)
}

function ViewingRequestUnavailable({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
      <div className={cardClassName}>
        <h1 className="text-xl font-semibold tracking-tight">
          Viewing request unavailable
        </h1>
        <p role="alert" className={`mt-4 ${errorClassName}`}>
          {message}
        </p>
        <Link
          href="/viewing-requests"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B]"
        >
          Back to viewing requests
        </Link>
      </div>
    </div>
  )
}

function ViewingRequestDetailContent({ requestId }: { requestId: number }) {
  const [request, setRequest] = useState<ViewingRequest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelError, setCancelError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadRequest() {
      setIsLoading(true)
      setError("")

      try {
        const data = await getMyViewingRequest(requestId)
        if (!cancelled) {
          setRequest(data)
        }
      } catch (err) {
        if (!cancelled) {
          setRequest(null)
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load viewing request."
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadRequest()

    return () => {
      cancelled = true
    }
  }, [requestId])

  async function handleCancel() {
    if (!request) {
      return
    }

    try {
      setIsCancelling(true)
      setCancelError("")
      const updated = await cancelViewingRequest(request.id)
      setRequest(updated)
    } catch (err) {
      setCancelError(
        err instanceof Error ? err.message : "Unable to cancel request."
      )
    } finally {
      setIsCancelling(false)
    }
  }

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8"
      >
        <span className="sr-only">Loading viewing request</span>
        <div
          aria-hidden="true"
          className={`${cardClassName} h-56 animate-pulse bg-white/5 motion-reduce:animate-none`}
        />
      </div>
    )
  }

  if (error || !request) {
    return (
      <ViewingRequestUnavailable
        message={error || "This viewing request could not be found."}
      />
    )
  }

  return (
    <ViewingRequestRelationshipDetail
      request={request}
      role="renter"
      backHref="/viewing-requests"
      backLabel="Back to viewing requests"
      onCancel={() => void handleCancel()}
      isCancelling={isCancelling}
      cancelError={cancelError}
    />
  )
}

function ViewingRequestDetailPageContent() {
  const params = useParams()
  const requestId = parseRequestId(params?.id)

  if (requestId === null) {
    return (
      <ViewingRequestUnavailable message="This viewing request could not be found." />
    )
  }

  return <ViewingRequestDetailContent requestId={requestId} />
}

export default function ViewingRequestDetailPage() {
  return (
    <ProtectedRoute>
      <ConsumerShell>
        <main
          className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
        >
          <ViewingRequestDetailPageContent />
        </main>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
