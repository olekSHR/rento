"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState, type ReactNode } from "react"
import { CalendarCheck } from "lucide-react"

import Modal from "@/components/Modal"
import { useAuth } from "@/context/AuthContext"
import { buildLoginHref } from "@/lib/returnUrl"
import {
  cancelViewingRequest,
  createViewingRequest,
  getMyViewingRequests,
} from "@/services/api"
import {
  canCancelViewingRequest,
  getViewingRequestStatusLabel,
  isActiveViewingRequest,
  type ViewingRequest,
} from "@/types/viewingRequest"

export type ViewingStickyActionsRenderProps = {
  openRequest: () => void
  canOpenRequest: boolean
}

type RequestViewingSectionProps = {
  propertyId: number
  canRequest: boolean
  renderStickyActions?: (
    actions: ViewingStickyActionsRenderProps
  ) => ReactNode
}

const MAX_MESSAGE_LENGTH = 500

const statusBadgeClassName =
  "inline-flex rounded-full border border-white/10 bg-[#252525] px-3 py-1 text-xs font-semibold text-[#F5F5F5]"

const primaryButtonClassName =
  "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-70"

const secondaryButtonClassName =
  "flex h-11 w-full items-center justify-center rounded-2xl border border-white/15 bg-[#252525] text-sm font-semibold text-[#F5F5F5] transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D] disabled:opacity-70"

const inputClassName =
  "min-h-24 w-full rounded-xl border border-white/[0.08] bg-[#252525] px-4 py-3 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

export default function RequestViewingSection({
  propertyId,
  canRequest,
  renderStickyActions,
}: RequestViewingSectionProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()

  const [latestRequest, setLatestRequest] = useState<ViewingRequest | null>(null)
  const [activeRequest, setActiveRequest] = useState<ViewingRequest | null>(null)
  const [isFetching, setIsFetching] = useState(false)
  const [fetchError, setFetchError] = useState("")
  const [reloadNonce, setReloadNonce] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCancelling, setIsCancelling] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!canRequest || !isAuthenticated || isLoading) {
      return
    }

    let cancelled = false

    async function loadViewingRequests() {
      setIsFetching(true)
      setFetchError("")

      try {
        const response = await getMyViewingRequests({ propertyId })
        const latest = response.items[0] ?? null
        const active =
          response.items.find((item) =>
            isActiveViewingRequest(item.status)
          ) ?? null

        if (!cancelled) {
          setLatestRequest(latest)
          setActiveRequest(active)
        }
      } catch (err) {
        if (!cancelled) {
          setFetchError(
            err instanceof Error
              ? err.message
              : "Unable to determine your viewing request for this property."
          )
        }
      } finally {
        if (!cancelled) {
          setIsFetching(false)
        }
      }
    }

    void loadViewingRequests()

    return () => {
      cancelled = true
    }
  }, [canRequest, isAuthenticated, isLoading, propertyId, reloadNonce])

  const openRequest = useCallback(() => {
    if (!isAuthenticated) {
      router.push(buildLoginHref(`/properties/${propertyId}`))
      return
    }

    setError("")
    setIsModalOpen(true)
  }, [isAuthenticated, propertyId, router])

  const showRequestStatus = Boolean(latestRequest)
  const showFetchFailure =
    Boolean(fetchError) && !isFetching && !showRequestStatus
  const showNoRequestCta =
    isAuthenticated &&
    !isLoading &&
    !isFetching &&
    !fetchError &&
    !activeRequest
  const showRequestButton =
    !isLoading &&
    !isFetching &&
    !showFetchFailure &&
    !activeRequest &&
    (showNoRequestCta || !isAuthenticated)

  if (!canRequest) {
    return null
  }

  async function handleSubmit() {
    try {
      setError("")
      setIsSubmitting(true)

      const created = await createViewingRequest(
        propertyId,
        message.trim() ? message.trim() : null
      )

      setLatestRequest(created)
      setActiveRequest(created)
      setFetchError("")
      setMessage("")
      setIsModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit request.")
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleCancel() {
    if (!activeRequest) {
      return
    }

    try {
      setError("")
      setIsCancelling(true)

      const updated = await cancelViewingRequest(activeRequest.id)
      setLatestRequest(updated)
      setActiveRequest(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to cancel request.")
    } finally {
      setIsCancelling(false)
    }
  }

  function handleRetryLoad() {
    setReloadNonce((current) => current + 1)
  }

  return (
    <div className="mt-5 border-t border-white/8 pt-5">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DFC58A]/20 bg-[#252525] text-[#DFC58A]">
          <CalendarCheck className="h-4 w-4" aria-hidden="true" />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-[#F5F5F5]">
            Request a viewing
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#B8B8B8]">
            Send a structured viewing request to the listing realtor.
          </p>

          {error ? (
            <p role="alert" className={`mt-3 ${errorClassName}`}>
              {error}
            </p>
          ) : null}

          {fetchError && showRequestStatus ? (
            <p role="alert" className={`mt-3 ${errorClassName}`}>
              {fetchError}
            </p>
          ) : null}

          {isLoading || isFetching ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-4 space-y-2"
            >
              <span className="sr-only">Loading viewing request status</span>
              <div
                aria-hidden="true"
                className="h-12 animate-pulse rounded-2xl bg-white/5 motion-reduce:animate-none"
              />
            </div>
          ) : showFetchFailure ? (
            <div className="mt-4 space-y-3">
              <p role="alert" className={errorClassName}>
                {fetchError}
              </p>
              <p className="text-sm leading-relaxed text-[#B8B8B8]">
                We could not determine your viewing request for this property.
                Please try again.
              </p>
              <button
                type="button"
                onClick={handleRetryLoad}
                className={secondaryButtonClassName}
              >
                Retry
              </button>
            </div>
          ) : showRequestStatus && latestRequest ? (
            <div className="mt-4 space-y-3">
              <span className={statusBadgeClassName}>
                {getViewingRequestStatusLabel(latestRequest.status)}
              </span>

              {latestRequest.message ? (
                <p className="text-sm leading-relaxed text-[#B8B8B8]">
                  {latestRequest.message}
                </p>
              ) : null}

              {activeRequest &&
              canCancelViewingRequest(activeRequest.status) ? (
                <button
                  type="button"
                  onClick={() => void handleCancel()}
                  disabled={isCancelling}
                  className={secondaryButtonClassName}
                >
                  {isCancelling ? "Cancelling..." : "Cancel request"}
                </button>
              ) : null}

              <p className="text-xs text-[#B8B8B8]">
                <Link
                  href="/viewing-requests"
                  className="font-semibold text-[#DFC58A] underline-offset-4 hover:underline"
                >
                  View all requests
                </Link>
              </p>
            </div>
          ) : null}

          {showRequestButton ? (
            <button
              type="button"
              onClick={openRequest}
              className={`mt-4 ${primaryButtonClassName}`}
            >
              Request a viewing
            </button>
          ) : null}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsModalOpen(false)
          }
        }}
        labelledBy="request-viewing-title"
      >
        <div className="px-5 pb-6 pt-2">
          <h2
            id="request-viewing-title"
            className="text-lg font-semibold text-[#F5F5F5]"
          >
            Request a viewing
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Add an optional message for the realtor. Detailed scheduling can
            continue through phone, WhatsApp, or Telegram.
          </p>

          <label htmlFor="viewing-request-message" className="mt-5 block">
            <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]">
              Message (optional)
            </span>
            <textarea
              id="viewing-request-message"
              value={message}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(event) => setMessage(event.target.value)}
              className={`mt-2 ${inputClassName}`}
              placeholder="Share availability or questions for the viewing."
            />
          </label>

          {error ? (
            <p role="alert" className={`mt-4 ${errorClassName}`}>
              {error}
            </p>
          ) : null}

          <div className="mt-5 grid grid-cols-1 gap-3">
            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={isSubmitting}
              className={primaryButtonClassName}
            >
              {isSubmitting ? "Submitting..." : "Submit request"}
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
              className={secondaryButtonClassName}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>

      {renderStickyActions?.({
        openRequest,
        canOpenRequest: showRequestButton,
      })}
    </div>
  )
}
