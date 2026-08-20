"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import ViewingRequestRelationshipDetail from "@/components/ViewingRequestRelationshipDetail"
import {
  acceptViewingRequest,
  declineViewingRequest,
  getRealtorViewingRequest,
} from "@/services/api"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

// The workspace shell content surface is still light (TASK-015 deviation D1),
// so this route owns its own dark surface. The relationship detail supplies its
// own horizontal padding, therefore the shell wrapper only owns the background.
const pageShellClassName = "min-h-full bg-[#1B1B1B] pb-6 text-[#F5F5F5] md:pb-8"

const routeContainerClassName =
  "mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8"

const cardClassName = "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const backActionClassName =
  "mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

function parseRequestId(rawId: string | string[] | undefined): number | null {
  if (typeof rawId !== "string" || !/^\d+$/.test(rawId)) {
    return null
  }

  return Number(rawId)
}

function ViewingRequestUnavailable({ message }: { message: string }) {
  return (
    <div className={routeContainerClassName}>
      <section className={cardClassName}>
        <h1 className="text-xl font-semibold tracking-tight text-[#F5F5F5]">
          Viewing request unavailable
        </h1>
        <p role="alert" className={`mt-4 ${errorClassName}`}>
          {message}
        </p>
        <Link href="/realtor/viewing-requests" className={backActionClassName}>
          Back to viewing requests
        </Link>
      </section>
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
      <div role="status" aria-live="polite" className={routeContainerClassName}>
        <span className="sr-only">Loading viewing request</span>
        <div
          aria-hidden="true"
          className="h-56 animate-pulse rounded-[24px] border border-white/8 bg-white/5 motion-reduce:animate-none"
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
    <div className={pageShellClassName}>
      <RealtorViewingRequestDetailPageContent />
    </div>
  )
}
