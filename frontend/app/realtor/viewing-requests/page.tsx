"use client"

import { useEffect, useRef, useState } from "react"

import ConfirmDialog from "@/components/realtor/ConfirmDialog"
import ViewingRequestListCard from "@/components/realtor/viewing-requests/ViewingRequestListCard"
import ViewingRequestStatusTabs from "@/components/realtor/viewing-requests/ViewingRequestStatusTabs"
import {
  DEFAULT_VIEWING_REQUEST_INBOX_FILTER,
  getViewingRequestInboxApiStatus,
  getViewingRequestInboxEmptyTitle,
  getViewingRequestInboxResultLabel,
  type ViewingRequestInboxFilter,
} from "@/lib/realtorWorkspace"
import {
  acceptViewingRequest,
  declineViewingRequest,
  getRealtorViewingRequests,
} from "@/services/api"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

// The workspace shell content surface is still light (TASK-015 deviation D1)
// because it is shared with any remaining light route, so this route owns its
// own dark surface.
const pageShellClassName = "min-h-full bg-[#1B1B1B] text-[#F5F5F5]"

const pageContainerClassName =
  "mx-auto max-w-[1280px] space-y-5 px-4 py-6 md:px-8 md:py-8"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

const emptyStateShellClassName =
  "rounded-3xl border border-white/8 bg-[#2D2D2D] p-5"

const emptyStateClassName =
  "rounded-2xl border border-white/10 bg-[#252525] p-4 text-center"

const cardSkeletonClassName =
  "h-52 animate-pulse rounded-2xl border border-white/8 bg-white/5 motion-reduce:animate-none"

function ViewingRequestsSkeleton() {
  return (
    <div className={pageShellClassName}>
      <div className={pageContainerClassName}>
        <div className="h-10 w-56 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none" />
        <div className="h-11 w-full max-w-xl animate-pulse rounded-full bg-white/10 motion-reduce:animate-none" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {[0, 1].map((item) => (
            <div
              key={item}
              aria-hidden="true"
              className={cardSkeletonClassName}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function RealtorViewingRequestsContent() {
  const [activeFilter, setActiveFilter] = useState<ViewingRequestInboxFilter>(
    DEFAULT_VIEWING_REQUEST_INBOX_FILTER
  )
  const [items, setItems] = useState<ViewingRequestRealtor[]>([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false)
  const [error, setError] = useState("")
  const [pendingAction, setPendingAction] = useState<{
    request: ViewingRequestRealtor
    action: "accept" | "decline"
  } | null>(null)
  const [isWorking, setIsWorking] = useState(false)
  const loadSequenceRef = useRef(0)

  function handleFilterChange(filter: ViewingRequestInboxFilter) {
    if (filter === activeFilter) {
      return
    }

    loadSequenceRef.current += 1
    setActiveFilter(filter)
    setIsLoading(true)
    setError("")
    setItems([])
    setTotal(0)
  }

  useEffect(() => {
    let cancelled = false
    const filter = activeFilter
    const requestSequence = ++loadSequenceRef.current

    async function loadRequests() {
      setIsLoading(true)
      setError("")
      setItems([])

      try {
        const status = getViewingRequestInboxApiStatus(filter)
        const response = await getRealtorViewingRequests({
          ...(status ? { status } : {}),
          limit: 100,
        })

        if (cancelled || requestSequence !== loadSequenceRef.current) {
          return
        }

        setItems(response.items)
        setTotal(response.total)
      } catch (err) {
        if (cancelled || requestSequence !== loadSequenceRef.current) {
          return
        }

        setItems([])
        setTotal(0)
        setError(
          err instanceof Error ? err.message : "Unable to load viewing requests."
        )
      } finally {
        if (!cancelled && requestSequence === loadSequenceRef.current) {
          setIsLoading(false)
          setHasLoadedOnce(true)
        }
      }
    }

    void loadRequests()

    return () => {
      cancelled = true
    }
  }, [activeFilter])

  async function reloadActiveFilter(filter: ViewingRequestInboxFilter) {
    const requestSequence = ++loadSequenceRef.current

    setIsLoading(true)
    setError("")
    setItems([])

    try {
      const status = getViewingRequestInboxApiStatus(filter)
      const response = await getRealtorViewingRequests({
        ...(status ? { status } : {}),
        limit: 100,
      })

      if (requestSequence !== loadSequenceRef.current) {
        return
      }

      setItems(response.items)
      setTotal(response.total)
    } catch (err) {
      if (requestSequence !== loadSequenceRef.current) {
        return
      }

      setItems([])
      setTotal(0)
      setError(
        err instanceof Error ? err.message : "Unable to load viewing requests."
      )
    } finally {
      if (requestSequence === loadSequenceRef.current) {
        setIsLoading(false)
        setHasLoadedOnce(true)
      }
    }
  }

  async function handleConfirmAction() {
    if (!pendingAction) {
      return
    }

    try {
      setIsWorking(true)
      setError("")

      if (pendingAction.action === "accept") {
        await acceptViewingRequest(pendingAction.request.id)
      } else {
        await declineViewingRequest(pendingAction.request.id)
      }

      setPendingAction(null)
      await reloadActiveFilter(activeFilter)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update viewing request."
      )
    } finally {
      setIsWorking(false)
    }
  }

  if (!hasLoadedOnce && isLoading && items.length === 0 && !error) {
    return <ViewingRequestsSkeleton />
  }

  return (
    <div className={pageShellClassName}>
      <div className={pageContainerClassName}>
        <header>
          <h1 className="text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Viewing requests
          </h1>
          <p className="mt-1 text-sm text-[#B8B8B8]">
            Review and respond to renter viewing requests for your listings.
          </p>
        </header>

        <ViewingRequestStatusTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          disabled={isWorking}
        />

        {error ? (
          <p role="alert" className={errorClassName}>
            {error}
          </p>
        ) : null}

        {!error && !isLoading && total > 0 ? (
          <p className="text-sm font-medium text-[#B8B8B8]">
            {getViewingRequestInboxResultLabel(activeFilter, total)}
          </p>
        ) : null}

        {isLoading ? (
          <div
            role="status"
            aria-live="polite"
            className="grid grid-cols-1 gap-4 lg:grid-cols-2"
          >
            <span className="sr-only">Loading viewing requests</span>
            {[0, 1].map((item) => (
              <div
                key={item}
                aria-hidden="true"
                className={cardSkeletonClassName}
              />
            ))}
          </div>
        ) : error ? null : items.length === 0 ? (
          <section className={emptyStateShellClassName}>
            <div className={emptyStateClassName}>
              <h3 className="text-sm font-bold text-[#F5F5F5]">
                {getViewingRequestInboxEmptyTitle(activeFilter)}
              </h3>
            </div>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {items.map((item) => (
              <li key={item.id}>
                <ViewingRequestListCard
                  item={item}
                  onAccept={(request) =>
                    setPendingAction({ request, action: "accept" })
                  }
                  onDecline={(request) =>
                    setPendingAction({ request, action: "decline" })
                  }
                  actionsDisabled={isWorking}
                />
              </li>
            ))}
          </ul>
        )}

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
      </div>
    </div>
  )
}

export default function RealtorViewingRequestsPage() {
  return <RealtorViewingRequestsContent />
}
