"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

import ConsumerShell from "@/components/ConsumerShell"
import ProtectedRoute from "@/components/ProtectedRoute"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { getImageUrl } from "@/lib/getImageUrl"
import { cancelViewingRequest, getMyViewingRequests } from "@/services/api"
import {
  canCancelViewingRequest,
  getViewingRequestStatusLabel,
  type ViewingRequest,
} from "@/types/viewingRequest"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const errorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-4 py-3 text-sm font-medium leading-relaxed text-red-100/90"

function formatDate(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value))
}

function ViewingRequestsContent() {
  const [items, setItems] = useState<ViewingRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [cancellingId, setCancellingId] = useState<number | null>(null)

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
      const updated = await cancelViewingRequest(requestId)
      setItems((current) =>
        current.map((item) => (item.id === requestId ? updated : item))
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to cancel request.")
    } finally {
      setCancellingId(null)
    }
  }

  return (
    <ConsumerShell>
      <main className={`mx-auto max-w-md px-5 py-6 ${BOTTOM_NAV_CONTENT_CLASS}`}>
        <header className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F5F5F5]">
            Viewing requests
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
            Track your submitted viewing requests in one place.
          </p>
        </header>

        {error ? (
          <p role="alert" className={`mb-4 ${errorClassName}`}>
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <div className="space-y-4">
            {[0, 1].map((item) => (
              <div
                key={item}
                aria-hidden="true"
                className={`${cardClassName} h-40 animate-pulse bg-white/5`}
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className={cardClassName}>
            <p className="text-sm leading-relaxed text-[#B8B8B8]">
              You have not submitted any viewing requests yet.
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex text-sm font-semibold text-[#DFC58A] underline-offset-4 hover:underline"
            >
              Browse listings
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              const imageSrc = getImageUrl(item.property.image_url)

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

                {item.message ? (
                  <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                    {item.message}
                  </p>
                ) : null}

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/properties/${item.property_id}`}
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-white/15 bg-[#252525] text-sm font-semibold text-[#F5F5F5]"
                  >
                    Open property
                  </Link>

                  {canCancelViewingRequest(item.status) ? (
                    <button
                      type="button"
                      onClick={() => void handleCancel(item.id)}
                      disabled={cancellingId === item.id}
                      className="inline-flex h-11 flex-1 items-center justify-center rounded-2xl border border-red-400/20 bg-[#2A2020] text-sm font-semibold text-red-200 disabled:opacity-70"
                    >
                      {cancellingId === item.id ? "Cancelling..." : "Cancel"}
                    </button>
                  ) : null}
                </div>
              </li>
              )
            })}
          </ul>
        )}
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
