"use client"

import Link from "next/link"
import { ClipboardList, Home, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import AdminPageShell from "@/components/admin/AdminPageShell"
import { getAdminStats, type AdminStats } from "@/services/api"

type SecondaryMetricKey = keyof Pick<
  AdminStats,
  "total_users" | "total_realtors" | "active_listings"
>

type SecondaryMetricConfig = {
  key: SecondaryMetricKey
  label: string
  description: string
  href: string
}

const SECONDARY_METRICS: SecondaryMetricConfig[] = [
  {
    key: "total_users",
    label: "Total users",
    description: "Registered accounts",
    href: "/admin/users",
  },
  {
    key: "total_realtors",
    label: "Realtor accounts",
    description: "Users with the realtor role",
    href: "/admin/users?role=realtor",
  },
  {
    key: "active_listings",
    label: "Available listings",
    description: "Listings with available status",
    href: "/admin/properties",
  },
]

const focusRingClassName =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

function DashboardHeader() {
  return (
    <header>
      <p className="text-xs font-bold uppercase tracking-wide text-[#DFC58A]">
        Admin dashboard
      </p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
        Admin Dashboard
      </h1>
      <p className="mt-2 text-sm text-[#B8B8B8]">
        Review platform totals, check priority moderation queues, and move
        directly into the workflows that need attention.
      </p>
    </header>
  )
}

function DashboardSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="space-y-4"
    >
      <span className="sr-only">Loading admin dashboard</span>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div className="space-y-4">
          <div className="h-40 animate-pulse rounded-[24px] border border-white/8 bg-[#2D2D2D] motion-reduce:animate-none" />
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-[24px] border border-white/8 bg-[#2D2D2D] motion-reduce:animate-none"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-[24px] border border-white/8 bg-[#2D2D2D] motion-reduce:animate-none"
              />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-20 animate-pulse rounded-[24px] border border-white/8 bg-[#2D2D2D] motion-reduce:animate-none"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardErrorPanel({
  message,
  onRetry,
}: {
  message: string
  onRetry: () => void
}) {
  return (
    <div
      role="alert"
      className={`${cardClassName} border-red-500/30 bg-[#252525]`}
    >
      <p className="text-sm font-semibold text-[#F5F5F5]">
        Unable to load dashboard stats
      </p>
      <p className="mt-2 text-sm text-[#B8B8B8]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className={`mt-4 inline-flex min-h-11 items-center rounded-xl border border-white/10 bg-[#2D2D2D] px-4 text-sm font-semibold text-[#F5F5F5] transition-colors hover:text-[#DFC58A] ${focusRingClassName}`}
      >
        Retry
      </button>
    </div>
  )
}

function PlatformStatusCard({ stats }: { stats: AdminStats }) {
  const pendingApplications = stats.pending_realtor_applications
  const reportedListings = stats.reported_listings
  const needsAttention = pendingApplications > 0 || reportedListings > 0

  const statusLabel = needsAttention ? "Attention required" : "All clear"
  const statusDescription = needsAttention
    ? "Review the priority queues below before moving on to other admin work."
    : "No pending realtor applications or reported listings require action from dashboard stats."

  return (
    <section aria-labelledby="platform-status-heading" className={cardClassName}>
      <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
        Platform status
      </p>
      <h2
        id="platform-status-heading"
        className="mt-2 text-lg font-bold text-[#F5F5F5]"
      >
        {statusLabel}
      </h2>
      <p className="mt-2 text-sm text-[#B8B8B8]">{statusDescription}</p>

      <ul className="mt-4 space-y-2 text-sm text-[#F5F5F5]">
        <li>
          {pendingApplications > 0 ? (
            <>
              <span className="font-semibold text-[#DFC58A]">
                {pendingApplications.toLocaleString()}
              </span>{" "}
              {pendingApplications === 1
                ? "realtor application awaiting review."
                : "realtor applications awaiting review."}
            </>
          ) : (
            "No pending realtor applications."
          )}
        </li>
        <li>
          {reportedListings > 0 ? (
            <>
              <span className="font-semibold text-[#DFC58A]">
                {reportedListings.toLocaleString()}
              </span>{" "}
              {reportedListings === 1
                ? "reported listing recorded in platform stats."
                : "reported listings recorded in platform stats."}
            </>
          ) : (
            "No reported listings recorded in platform stats."
          )}
        </li>
      </ul>

      <p className="mt-4 text-sm text-[#B8B8B8]">
        Property moderation has a separate queue. Review it directly for pending
        listings.
      </p>
      <Link
        href="/admin/properties"
        className={`mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A] transition-colors hover:text-[#F5F5F5] ${focusRingClassName}`}
      >
        Review properties
      </Link>
    </section>
  )
}

function PriorityQueuesSection({ stats }: { stats: AdminStats }) {
  const pendingApplications = stats.pending_realtor_applications
  const reportedListings = stats.reported_listings

  return (
    <section aria-labelledby="priority-queues-heading" className="space-y-3">
      <h2
        id="priority-queues-heading"
        className="text-sm font-bold uppercase tracking-wide text-[#B8B8B8]"
      >
        Priority queues
      </h2>

      <Link
        href="/admin/realtor-applications"
        className={`block ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
          Pending realtor applications
        </p>
        <p
          className={`mt-2 text-2xl font-extrabold tracking-tight ${
            pendingApplications > 0 ? "text-[#DFC58A]" : "text-[#F5F5F5]"
          }`}
        >
          {pendingApplications.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-[#B8B8B8]">
          {pendingApplications > 0
            ? "Open the applications queue to approve or reject access requests."
            : "No applications are waiting for review right now."}
        </p>
        <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A]">
          Review applications
        </span>
      </Link>

      <Link
        href="/admin/properties?filter=reported"
        className={`block ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
          Reported listings
        </p>
        <p
          className={`mt-2 text-2xl font-extrabold tracking-tight ${
            reportedListings > 0 ? "text-[#DFC58A]" : "text-[#F5F5F5]"
          }`}
        >
          {reportedListings.toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-[#B8B8B8]">
          {reportedListings > 0
            ? "Open the reported queue to review every listing users have reported."
            : "No reported listings are recorded in platform stats."}
        </p>
        <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A]">
          Open reported queue
        </span>
      </Link>

      <Link
        href="/admin/properties"
        className={`block ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
      >
        <p className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
          Property moderation
        </p>
        <p className="mt-2 text-sm text-[#F5F5F5]">
          Pending listing counts are not included in dashboard stats. Review the
          property moderation queue directly.
        </p>
        <span className="mt-3 inline-flex min-h-11 items-center text-sm font-semibold text-[#DFC58A]">
          Open property moderation
        </span>
      </Link>
    </section>
  )
}

function SecondaryMetricsSection({ stats }: { stats: AdminStats }) {
  return (
    <section aria-labelledby="secondary-metrics-heading">
      <h2
        id="secondary-metrics-heading"
        className="text-sm font-bold uppercase tracking-wide text-[#B8B8B8]"
      >
        Platform totals
      </h2>

      <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {SECONDARY_METRICS.map((metric) => (
          <div key={metric.key}>
            <Link
              href={metric.href}
              className={`block ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
            >
              <dt className="text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
                {metric.label}
              </dt>
              <dd className="mt-2 text-2xl font-extrabold tracking-tight text-[#F5F5F5]">
                {stats[metric.key].toLocaleString()}
              </dd>
              <dd className="mt-2 text-sm text-[#B8B8B8]">{metric.description}</dd>
            </Link>
          </div>
        ))}
      </dl>
    </section>
  )
}

function QuickActionsSection() {
  return (
    <section aria-labelledby="quick-actions-heading">
      <h2
        id="quick-actions-heading"
        className="text-sm font-bold uppercase tracking-wide text-[#B8B8B8]"
      >
        Quick actions
      </h2>

      <div className="mt-3 space-y-3">
        <Link
          href="/admin/properties/create"
          className={`flex min-h-11 items-start gap-3 rounded-[24px] border border-[#DFC58A]/30 bg-[#252525] p-5 transition-colors hover:border-[#DFC58A]/50 ${focusRingClassName}`}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DFC58A]/15 text-[#DFC58A]">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#F5F5F5]">
              Create property
            </span>
            <span className="mt-1 block text-sm text-[#B8B8B8]">
              Add a new listing to the platform.
            </span>
          </span>
        </Link>

        <Link
          href="/admin/realtor-applications"
          className={`flex min-h-11 items-start gap-3 ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-[#DFC58A]">
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#F5F5F5]">
              Review applications
            </span>
            <span className="mt-1 block text-sm text-[#B8B8B8]">
              Open the realtor application review queue.
            </span>
          </span>
        </Link>

        <Link
          href="/admin/properties"
          className={`flex min-h-11 items-start gap-3 ${cardClassName} transition-colors hover:border-[#DFC58A]/30 ${focusRingClassName}`}
        >
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#252525] text-[#DFC58A]">
            <Home className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold text-[#F5F5F5]">
              Review properties
            </span>
            <span className="mt-1 block text-sm text-[#B8B8B8]">
              Moderate listings and manage marketplace availability.
            </span>
          </span>
        </Link>
      </div>
    </section>
  )
}

function DashboardContent({ stats }: { stats: AdminStats }) {
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="space-y-4">
        <PlatformStatusCard stats={stats} />
        <PriorityQueuesSection stats={stats} />
      </div>

      <div className="flex flex-col gap-4">
        <div className="order-1 lg:order-2">
          <QuickActionsSection />
        </div>
        <div className="order-2 lg:order-1">
          <SecondaryMetricsSection stats={stats} />
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    let isMounted = true

    async function loadStats() {
      try {
        const data = await getAdminStats()

        if (!isMounted) {
          return
        }

        setStats(data)
        setError("")
      } catch (loadError) {
        if (!isMounted) {
          return
        }

        setStats(null)
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load dashboard stats."
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadStats()

    return () => {
      isMounted = false
    }
  }, [reloadKey])

  function handleRetry() {
    setIsLoading(true)
    setError("")
    setStats(null)
    setReloadKey((current) => current + 1)
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <DashboardHeader />

        {isLoading ? (
          <DashboardSkeleton />
        ) : stats ? (
          <DashboardContent stats={stats} />
        ) : (
          <DashboardErrorPanel message={error} onRetry={handleRetry} />
        )}
      </AdminPageShell>
    </AdminRoute>
  )
}
