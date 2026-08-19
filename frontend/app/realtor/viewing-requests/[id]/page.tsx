"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import ViewingRequestRelationshipDetail from "@/components/ViewingRequestRelationshipDetail"
import SectionCard from "@/components/ui/SectionCard"
import {
  acceptViewingRequest,
  declineViewingRequest,
  getRealtorViewingRequest,
} from "@/services/api"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

const errorClassName =
  "rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-relaxed text-red-700"

function parseRequestId(rawId: string | string[] | undefined): number | null {
  if (typeof rawId !== "string" || !/^\d+$/.test(rawId)) {
    return null
  }

  return Number(rawId)
}

function ViewingRequestUnavailable({ message }: { message: string }) {
  return (
    <div className="mx-auto max-w-[1280px]">
      <SectionCard>
        <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
          Viewing request unavailable
        </h1>
        <p role="alert" className={`mt-4 ${errorClassName}`}>
          {message}
        </p>
        <Link
          href="/realtor/viewing-requests"
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-blue-700 px-5 text-sm font-semibold text-white transition active:scale-[0.98]"
        >
          Back to viewing requests
        </Link>
      </SectionCard>
    </div>
  )
}

function RealtorViewingRequestDetailContent({ requestId }: { requestId: number }) {
  const [request, setRequest] = useState<ViewingRequestRealtor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [pendingAction, setPendingAction] = useState<"accept" | "decline" | null>(
    null
  )
  const [isWorking, setIsWorking] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadRequest() {
      setIsLoading(true)
      setError("")

      try {
        const data = await getRealtorViewingRequest(requestId)
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

  async function handleConfirmAction() {
    if (!request || !pendingAction) {
      return
    }

    try {
      setIsWorking(true)
      setError("")

      const updated =
        pendingAction === "accept"
          ? await acceptViewingRequest(request.id)
          : await declineViewingRequest(request.id)

      setRequest(updated)
      setPendingAction(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update viewing request."
      )
    } finally {
      setIsWorking(false)
    }
  }

  if (isLoading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto max-w-[1280px]"
      >
        <span className="sr-only">Loading viewing request</span>
        <div
          aria-hidden="true"
          className="h-56 animate-pulse rounded-2xl bg-zinc-100 motion-reduce:animate-none"
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
    <>
      <ViewingRequestRelationshipDetail
        request={request}
        role="realtor"
        backHref="/realtor/viewing-requests"
        backLabel="Back to viewing requests"
        onAccept={() => setPendingAction("accept")}
        onDecline={() => setPendingAction("decline")}
        isWorking={isWorking}
      />

      <ConfirmDialog
        isOpen={pendingAction !== null}
        isPending={isWorking}
        titleId="viewing-request-detail-action-title"
        title={
          pendingAction === "accept"
            ? "Accept viewing request?"
            : "Decline viewing request?"
        }
        description={
          pendingAction === "accept"
            ? "The renter will see that you accepted the request. Continue coordination through your existing contact methods."
            : "The renter will see that this viewing request was declined."
        }
        confirmLabel={pendingAction === "accept" ? "Accept" : "Decline"}
        pendingLabel="Working..."
        destructive={pendingAction === "decline"}
        onCancel={() => {
          if (!isWorking) {
            setPendingAction(null)
          }
        }}
        onConfirm={() => void handleConfirmAction()}
      />
    </>
  )
}

function RealtorViewingRequestDetailPageContent() {
  const params = useParams()
  const requestId = parseRequestId(params?.id)

  if (requestId === null) {
    return (
      <ViewingRequestUnavailable message="This viewing request could not be found." />
    )
  }

  return <RealtorViewingRequestDetailContent requestId={requestId} />
}

export default function RealtorViewingRequestDetailPage() {
  return (
    <div className="pb-6 md:pb-8">
      <RealtorViewingRequestDetailPageContent />
    </div>
  )
}
