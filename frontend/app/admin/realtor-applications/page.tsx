"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

import AdminRealtorApplicationCard from "@/components/admin/AdminRealtorApplicationCard"
import AdminRoute from "@/components/AdminRoute"
import AdminPageShell from "@/components/admin/AdminPageShell"
import {
  getRealtorApplications,
  reviewRealtorApplication,
  type RealtorApplication,
} from "@/services/api"

function ApplicationsSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <span className="sr-only">Loading pending realtor applications</span>
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
        >
          <div className="space-y-3">
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div className="h-20 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
            <div className="grid grid-cols-2 gap-3">
              <div className="h-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
              <div className="h-11 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function getPendingSummary(count: number): string {
  if (count === 0) {
    return "No applications awaiting review"
  }

  if (count === 1) {
    return "1 application awaiting review"
  }

  return `${count.toLocaleString()} applications awaiting review`
}

export default function AdminRealtorApplicationsPage() {
  const [applications, setApplications] = useState<RealtorApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [reviewingId, setReviewingId] = useState<number | null>(null)
  const [cardErrors, setCardErrors] = useState<Record<number, string>>({})
  const [successMessage, setSuccessMessage] = useState("")

  const queueHeadingRef = useRef<HTMLHeadingElement>(null)
  const successMessageRef = useRef<HTMLDivElement>(null)
  const cardHeadingRefs = useRef<Map<number, HTMLHeadingElement>>(new Map())
  const reviewInFlightRef = useRef(false)

  const isQueueBusy = reviewingId !== null

  const loadApplications = useCallback(async () => {
    setLoadError("")

    try {
      const data = await getRealtorApplications("pending")
      setApplications(data.items)
    } catch (error) {
      setLoadError(
        error instanceof Error
          ? error.message
          : "Failed to load applications."
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadApplications()
  }, [loadApplications])

  useEffect(() => {
    if (!successMessage) {
      return
    }

    successMessageRef.current?.focus()

    const timer = window.setTimeout(() => setSuccessMessage(""), 3200)

    return () => window.clearTimeout(timer)
  }, [successMessage])

  function registerCardHeading(
    applicationId: number,
    element: HTMLHeadingElement | null
  ) {
    if (element) {
      cardHeadingRefs.current.set(applicationId, element)
      return
    }

    cardHeadingRefs.current.delete(applicationId)
  }

  function focusAfterRemoval(
    removedId: number,
    remainingApplications: RealtorApplication[]
  ) {
    if (remainingApplications.length === 0) {
      queueHeadingRef.current?.focus()
      return
    }

    const removedIndex = applications.findIndex(
      (application) => application.id === removedId
    )
    const focusIndex = Math.min(
      Math.max(removedIndex, 0),
      remainingApplications.length - 1
    )
    const nextApplication = remainingApplications[focusIndex]

    if (nextApplication) {
      cardHeadingRefs.current.get(nextApplication.id)?.focus()
    }
  }

  async function handleReview(
    application: RealtorApplication,
    status: "approved" | "rejected"
  ) {
    if (reviewInFlightRef.current) {
      return
    }

    reviewInFlightRef.current = true

    setCardErrors((previous) => {
      const next = { ...previous }
      delete next[application.id]
      return next
    })

    setReviewingId(application.id)

    try {
      await reviewRealtorApplication(application.id, status)

      const remainingApplications = applications.filter(
        (item) => item.id !== application.id
      )

      setApplications(remainingApplications)
      setSuccessMessage(
        status === "approved"
          ? `${application.full_name} was approved as a Realtor.`
          : `${application.full_name}'s application was rejected.`
      )

      window.requestAnimationFrame(() => {
        focusAfterRemoval(application.id, remainingApplications)
      })
    } catch (error) {
      setCardErrors((previous) => ({
        ...previous,
        [application.id]:
          error instanceof Error
            ? error.message
            : "Failed to update application.",
      }))
    } finally {
      reviewInFlightRef.current = false
      setReviewingId(null)
    }
  }

  function handleRetryLoad() {
    setIsLoading(true)
    void loadApplications()
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <Link
          href="/admin"
          className="inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-[#DFC58A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to admin
        </Link>

        <header>
          <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
            Realtor Applications
          </p>
          <h1
            ref={queueHeadingRef}
            tabIndex={-1}
            className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] md:text-3xl"
          >
            Realtor Applications
          </h1>
          <p className="mt-2 text-sm text-[#B8B8B8]">
            Review pending requests and grant or deny access to the Realtor
            workspace.
          </p>
          {!isLoading && !loadError && (
            <p className="mt-3 text-sm text-[#F5F5F5]">
              {getPendingSummary(applications.length)}
            </p>
          )}
        </header>

        {successMessage && (
          <div
            ref={successMessageRef}
            role="status"
            aria-live="polite"
            tabIndex={-1}
            className="rounded-[24px] border border-[#DFC58A]/30 bg-[#252525] px-4 py-3 text-sm font-semibold text-[#F5F5F5] outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
          >
            {successMessage}
          </div>
        )}

        {isLoading ? (
          <ApplicationsSkeleton />
        ) : loadError ? (
          <section
            role="alert"
            className="rounded-[24px] border border-red-400/20 bg-red-950/30 p-5"
          >
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              Unable to load applications
            </h2>
            <p className="mt-2 text-sm text-red-100">{loadError}</p>
            <button
              type="button"
              onClick={handleRetryLoad}
              className="mt-4 inline-flex h-11 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
            >
              Try again
            </button>
          </section>
        ) : applications.length === 0 ? (
          <section className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 text-center">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">
              No pending applications
            </h2>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              New Realtor requests will appear here.
            </p>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {applications.map((application) => (
              <li key={application.id}>
                <AdminRealtorApplicationCard
                  application={application}
                  isQueueBusy={isQueueBusy}
                  isCardBusy={reviewingId === application.id}
                  error={cardErrors[application.id]}
                  headingRef={(element) =>
                    registerCardHeading(application.id, element)
                  }
                  onConfirmApprove={() =>
                    void handleReview(application, "approved")
                  }
                  onReject={() => void handleReview(application, "rejected")}
                />
              </li>
            ))}
          </ul>
        )}
      </AdminPageShell>
    </AdminRoute>
  )
}
