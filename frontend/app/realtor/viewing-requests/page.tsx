"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ChevronLeft } from "lucide-react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import { useAuth } from "@/context/AuthContext"
import {
  acceptViewingRequest,
  declineViewingRequest,
  getRealtorViewingRequests,
} from "@/services/api"
import {
  getViewingRequestStatusLabel,
  type ViewingRequestRealtor,
} from "@/types/viewingRequest"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const acceptButtonClassName =
  "inline-flex h-11 flex-1 items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition active:scale-[0.98] disabled:opacity-70"

const declineButtonClassName =
  "inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-red-400/20 bg-[#2A2020] text-sm font-semibold text-red-200 transition active:scale-[0.98] disabled:opacity-70"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function ViewingRequestsSkeleton() {
  return (
    <main className="min-h-screen bg-[#1B1B1B] px-5 py-6 pb-24 text-[#F5F5F5] md:px-8 md:py-8">
      <div className="mx-auto max-w-[1280px] space-y-5">
        <div className="h-12 w-48 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
        <div className="space-y-4">
          {[0, 1].map((item) => (
            <div
              key={item}
              aria-hidden="true"
              className={`${cardClassName} h-44 animate-pulse bg-white/5`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function RealtorViewingRequestsContent() {
  const { isLoading: isAuthLoading, isAuthenticated, user } = useAuth()
  const isRealtor = user?.role === "realtor"

  const [items, setItems] = useState<ViewingRequestRealtor[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [pendingAction, setPendingAction] = useState<{
    request: ViewingRequestRealtor
    action: "accept" | "decline"
  } | null>(null)
  const [isWorking, setIsWorking] = useState(false)

  useEffect(() => {
    if (isAuthLoading || !isAuthenticated || !isRealtor) {
      return
    }

    let cancelled = false

    async function loadRequests() {
      setIsLoading(true)
      setError("")

      try {
        const response = await getRealtorViewingRequests({ limit: 100 })
        if (!cancelled) {
          setItems(response.items)
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load viewing requests."
          )
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadRequests()

    return () => {
      cancelled = true
    }
  }, [isAuthLoading, isAuthenticated, isRealtor])

  if (isAuthLoading || (isAuthenticated && isRealtor && isLoading)) {
    return <ViewingRequestsSkeleton />
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#1B1B1B] px-5 py-6 pb-24 text-[#F5F5F5] md:px-8 md:py-8">
        <div className={`mx-auto max-w-[1280px] ${cardClassName}`}>
          <h1 className="text-2xl font-semibold tracking-tight">Login required</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Sign in to review viewing requests for your listings.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B]"
          >
            Go to login
          </Link>
        </div>
      </main>
    )
  }

  if (!isRealtor) {
    return (
      <main className="min-h-screen bg-[#1B1B1B] px-5 py-6 pb-24 text-[#F5F5F5] md:px-8 md:py-8">
        <div className={`mx-auto max-w-[1280px] ${cardClassName}`}>
          <h1 className="text-2xl font-semibold tracking-tight">Access denied</h1>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Viewing requests are available only for realtor accounts.
          </p>
        </div>
      </main>
    )
  }

  async function handleConfirmAction() {
    if (!pendingAction) {
      return
    }

    try {
      setIsWorking(true)
      setError("")

      const updated =
        pendingAction.action === "accept"
          ? await acceptViewingRequest(pendingAction.request.id)
          : await declineViewingRequest(pendingAction.request.id)

      setItems((current) =>
        current.map((item) => (item.id === updated.id ? updated : item))
      )
      setPendingAction(null)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update viewing request."
      )
    } finally {
      setIsWorking(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#1B1B1B] px-5 py-6 pb-24 text-[#F5F5F5] md:px-8 md:py-8">
      <div className="mx-auto max-w-[1280px] space-y-5">
        <header className="flex items-center gap-3">
          <Link
            href="/realtor"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#2D2D2D] text-[#F5F5F5]"
            aria-label="Back to workspace"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Viewing requests
            </h1>
            <p className="mt-1 text-sm text-[#B8B8B8]">
              Review renter viewing requests for your listings.
            </p>
          </div>
        </header>

        {error ? (
          <p role="alert" className={errorClassName}>
            {error}
          </p>
        ) : null}

        {items.length === 0 ? (
          <div className={cardClassName}>
            <p className="text-sm leading-relaxed text-[#B8B8B8]">
              No viewing requests yet.
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <li key={item.id} className={cardClassName}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-base font-semibold text-[#F5F5F5]">
                      {item.property.title}
                    </p>
                    <p className="mt-1 text-sm text-[#B8B8B8]">
                      {item.requester_email}
                    </p>
                    <p className="mt-1 text-xs text-[#B8B8B8]">
                      {formatDate(item.created_at)}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-white/10 bg-[#252525] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#DFC58A]">
                    {getViewingRequestStatusLabel(item.status)}
                  </span>
                </div>

                {item.message ? (
                  <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                    {item.message}
                  </p>
                ) : null}

                {item.status === "accepted" ? (
                  <div className="mt-5">
                    <Link
                      href={`/properties/${item.property_id}#property-documents`}
                      className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98]"
                    >
                      Manage rental documents
                    </Link>
                  </div>
                ) : null}

                {item.status === "pending" ? (
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({ request: item, action: "accept" })
                      }
                      className={acceptButtonClassName}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setPendingAction({ request: item, action: "decline" })
                      }
                      className={declineButtonClassName}
                    >
                      Decline
                    </button>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        isOpen={pendingAction !== null}
        isPending={isWorking}
        titleId="viewing-request-action-title"
        title={
          pendingAction?.action === "accept"
            ? "Accept viewing request?"
            : "Decline viewing request?"
        }
        description={
          pendingAction?.action === "accept"
            ? "The renter will see that you accepted the request. Continue coordination through your existing contact methods."
            : "The renter will see that this viewing request was declined."
        }
        confirmLabel={
          pendingAction?.action === "accept" ? "Accept" : "Decline"
        }
        pendingLabel="Working..."
        destructive={pendingAction?.action === "decline"}
        onCancel={() => {
          if (!isWorking) {
            setPendingAction(null)
          }
        }}
        onConfirm={() => void handleConfirmAction()}
      />
    </main>
  )
}

export default function RealtorViewingRequestsPage() {
  return <RealtorViewingRequestsContent />
}
