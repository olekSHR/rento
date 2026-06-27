"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import EmptyState from "@/components/ui/EmptyState"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
import {
  getRealtorApplications,
  reviewRealtorApplication,
  type RealtorApplication,
} from "@/services/api"

function formatCreatedAt(value: string): string {
  return new Date(value).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

function getStatusVariant(
  status: string
): "success" | "warning" | "danger" | "neutral" {
  if (status === "approved") {
    return "success"
  }

  if (status === "rejected") {
    return "danger"
  }

  if (status === "pending") {
    return "warning"
  }

  return "neutral"
}

function ApplicationsSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-48 animate-pulse rounded-3xl bg-zinc-200" />
    </div>
  )
}

function ApplicationCard({
  application,
  isReviewing,
  errorMessage,
  onApprove,
  onReject,
}: {
  application: RealtorApplication
  isReviewing: boolean
  errorMessage?: string
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <SectionCard>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-zinc-900">
            {application.full_name}
          </h2>
          <p className="mt-1 text-sm text-zinc-500">{application.phone}</p>
        </div>
        <StatusBadge variant={getStatusVariant(application.status)}>
          {application.status}
        </StatusBadge>
      </div>

      <dl className="mt-4 space-y-3 text-sm">
        <div>
          <dt className="font-semibold text-zinc-700">Agency</dt>
          <dd className="mt-0.5 text-zinc-500">
            {application.agency_name || "—"}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-zinc-700">Message</dt>
          <dd className="mt-0.5 whitespace-pre-wrap text-zinc-500">
            {application.message || "—"}
          </dd>
        </div>

        <div>
          <dt className="font-semibold text-zinc-700">Submitted</dt>
          <dd className="mt-0.5 text-zinc-500">
            {formatCreatedAt(application.created_at)}
          </dd>
        </div>
      </dl>

      {errorMessage && (
        <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
          {errorMessage}
        </p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-2">
        <PrimaryButton disabled={isReviewing} onClick={onApprove}>
          {isReviewing ? "..." : "Approve"}
        </PrimaryButton>
        <SecondaryButton disabled={isReviewing} onClick={onReject}>
          Reject
        </SecondaryButton>
      </div>
    </SectionCard>
  )
}

export default function AdminRealtorApplicationsPage() {
  const [applications, setApplications] = useState<RealtorApplication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [reviewingId, setReviewingId] = useState<number | null>(null)
  const [cardErrors, setCardErrors] = useState<Record<number, string>>({})

  const loadApplications = useCallback(async () => {
    setLoadError("")

    try {
      const token = getToken()

      if (!token) {
        throw new Error("Please sign in again.")
      }

      const data = await getRealtorApplications(token, "pending")
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

  async function handleReview(
    application: RealtorApplication,
    status: "approved" | "rejected"
  ) {
    const previousApplications = applications

    setCardErrors((prev) => {
      const next = { ...prev }
      delete next[application.id]
      return next
    })

    setApplications((prev) =>
      prev.filter((item) => item.id !== application.id)
    )

    try {
      setReviewingId(application.id)

      const token = getToken()

      if (!token) {
        throw new Error("Please sign in again.")
      }

      await reviewRealtorApplication(application.id, status, token)
    } catch (error) {
      setApplications(previousApplications)
      setCardErrors((prev) => ({
        ...prev,
        [application.id]:
          error instanceof Error
            ? error.message
            : "Failed to update application.",
      }))
    } finally {
      setReviewingId(null)
    }
  }

  return (
    <AdminRoute>
      <PageShell>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to admin
        </Link>

        <PageHeader
          title="Realtor Applications"
          subtitle="Review and approve realtor access requests."
        />

        {isLoading ? (
          <ApplicationsSkeleton />
        ) : loadError ? (
          <SectionCard>
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
              {loadError}
            </p>
            <div className="mt-4">
              <PrimaryButton
                onClick={() => {
                  setIsLoading(true)
                  void loadApplications()
                }}
              >
                Try again
              </PrimaryButton>
            </div>
          </SectionCard>
        ) : applications.length === 0 ? (
          <EmptyState
            title="No pending applications"
            description="New realtor requests will appear here."
          />
        ) : (
          <div className="space-y-3">
            {applications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                isReviewing={reviewingId === application.id}
                errorMessage={cardErrors[application.id]}
                onApprove={() => handleReview(application, "approved")}
                onReject={() => handleReview(application, "rejected")}
              />
            ))}
          </div>
        )}
      </PageShell>
    </AdminRoute>
  )
}
