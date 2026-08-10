"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import ConsumerShell from "@/components/ConsumerShell"
import ProtectedRoute from "@/components/ProtectedRoute"
import ViewingRequestsEmptyState from "@/components/ViewingRequestsEmptyState"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { getImageUrl } from "@/lib/getImageUrl"
import { cancelViewingRequest, getMyViewingRequests } from "@/services/api"
import {
  canCancelViewingRequest,
  getViewingRequestStatusLabel,
  isPropertyPubliclyAvailable,
  type ViewingRequest,
  type ViewingRequestStatus,
} from "@/types/viewingRequest"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const secondaryActionClassName =
  "inline-flex h-11 min-h-11 flex-1 items-center justify-center rounded-2xl border border-white/15 bg-[#252525] px-4 text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const primaryActionClassName =
  "inline-flex h-11 min-h-11 flex-1 items-center justify-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const cancelActionClassName =
  "inline-flex h-11 min-h-11 flex-1 items-center justify-center rounded-2xl border border-red-400/20 bg-[#2A2020] px-4 text-sm font-semibold text-red-200 transition active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function getViewingRequestStatusGuidance(
  status: ViewingRequestStatus
): string {
  switch (status) {
    case "pending":
      return "Your request is waiting for the listing realtor to respond."
    case "accepted":
      return "Your request was accepted. Contact the realtor to arrange the viewing time. Rental documents remain available if you decide to proceed afterward."
    case "declined":
      return "The realtor declined this viewing request."
    case "cancelled":
      return "This viewing request was cancelled."
    default:
      return ""
  }
}

function ViewingRequestsContent() {
  const [items, setItems] = useState<ViewingRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [cancelErrors, setCancelErrors] = useState<Record<number, string>>({})

  useEffect(() => {
    let cancelled = false

    async function loadRequests() {
      setIsLoading(true)
      setError("")

      try {
        const response = await getMyViewingRequests({ limit: 100 })
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
  }, [])

  async function handleCancel(requestId: number) {
    try {
      setCancellingId(requestId)
      setCancelErrors((current) => {
        const next = { ...current }
        delete next[requestId]
        return next
      })

      const updated = await cancelViewingRequest(requestId)
      setItems((current) =>
        current.map((item) => (item.id === requestId ? updated : item))
      )
    } catch (err) {
      setCancelErrors((current) => ({
        ...current,
        [requestId]:
          err instanceof Error ? err.message : "Unable to cancel request.",
      }))
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <ConsumerShell>
      <main
        className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
      >
        <div className="mx-auto max-w-[1280px] px-5 py-6 md:px-8 md:py-8">
          <header className="mb-6 md:mb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
              Your activity
            </p>
            <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
              Viewing requests
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8B8B8]">
              Track your submitted viewing requests and see what to do next.
            </p>
          </header>

          {isLoading ? (
            <div role="status" aria-live="polite" className="space-y-4">
              <span className="sr-only">Loading viewing requests</span>
              {[0, 1].map((item) => (
                <div
                  key={item}
                  aria-hidden="true"
                  className={`${cardClassName} h-40 animate-pulse bg-white/5 motion-reduce:animate-none`}
                />
              ))}
            </div>
          ) : error && items.length === 0 ? (
            <div className={cardClassName}>
              <p role="alert" className={errorClassName}>
                {error}
              </p>
            </div>
          ) : items.length === 0 ? (
            <ViewingRequestsEmptyState />
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const imageSrc = getImageUrl(item.property.image_url)
                const cancelError = cancelErrors[item.id]
                const isPublic = isPropertyPubliclyAvailable(item.property.status)

                return (
                  <li key={item.id} className={cardClassName}>
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#252525]">
                        {imageSrc ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={imageSrc}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                          {item.property.title}
                        </p>
                        <p className="mt-1 text-xs text-[#B8B8B8]">
                          {formatDate(item.created_at)}
                        </p>
                        <p className="mt-2 text-sm font-medium text-[#DFC58A]">
                          {getViewingRequestStatusLabel(item.status)}
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                      {getViewingRequestStatusGuidance(item.status)}
                    </p>

                    {item.message ? (
                      <p className="mt-3 text-sm leading-relaxed text-[#B8B8B8]">
                        <span className="font-medium text-[#F5F5F5]">
                          Your message:
                        </span>{" "}
                        {item.message}
                      </p>
                    ) : null}

                    {cancelError ? (
                      <p role="alert" className={`mt-4 ${errorClassName}`}>
                        {cancelError}
                      </p>
                    ) : null}

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Link
                        href={`/viewing-requests/${item.id}`}
                        className={primaryActionClassName}
                      >
                        View relationship
                      </Link>

                      {isPublic ? (
                        <Link
                          href={`/properties/${item.property_id}`}
                          className={secondaryActionClassName}
                        >
                          Open property
                        </Link>
                      ) : null}

                      {item.status === "accepted" ? (
                        <>
                          {isPublic ? (
                            <Link
                              href={`/properties/${item.property_id}#property-contact`}
                              className={secondaryActionClassName}
                            >
                              Arrange viewing
                            </Link>
                          ) : null}
                          <Link
                            href={`/viewing-requests/${item.id}#property-documents-heading`}
                            className={secondaryActionClassName}
                          >
                            View rental documents
                          </Link>
                        </>
                      ) : null}

                      {canCancelViewingRequest(item.status) ? (
                        <button
                          type="button"
                          onClick={() => void handleCancel(item.id)}
                          disabled={cancellingId === item.id}
                          aria-busy={cancellingId === item.id}
                          className={cancelActionClassName}
                        >
                          {cancellingId === item.id
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </main>
    </ConsumerShell>
  )
}

export default function ViewingRequestsPage() {
  return (
    <ProtectedRoute>
      <ViewingRequestsContent />
    </ProtectedRoute>
  )
}
