"use client"

import Link from "next/link"
import {
  Building2,
  ClipboardList,
  Flag,
  Home,
  PlusCircle,
  Users,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
import { getAdminStats, type AdminStats } from "@/services/api"

type MetricKey = keyof Pick<
  AdminStats,
  | "total_users"
  | "total_realtors"
  | "pending_realtor_applications"
  | "active_listings"
  | "reported_listings"
>

type MetricColor = "blue" | "purple" | "orange" | "green" | "red"

type MetricConfig = {
  key: MetricKey
  label: string
  description: string
  icon: LucideIcon
  color: MetricColor
  href?: string
  comingSoon?: boolean
  showActionBadge?: (value: number) => boolean
}

const METRIC_CONFIG: MetricConfig[] = [
  {
    key: "total_users",
    label: "Total Users",
    description: "Registered accounts",
    icon: Users,
    color: "blue",
    href: "/admin/users",
  },
  {
    key: "total_realtors",
    label: "Realtors",
    description: "Verified realtor accounts",
    icon: Building2,
    color: "purple",
    href: "/admin/users",
  },
  {
    key: "pending_realtor_applications",
    label: "Pending Applications",
    description: "Awaiting admin review",
    icon: ClipboardList,
    color: "orange",
    href: "/admin/realtor-applications",
    showActionBadge: (value) => value > 0,
  },
  {
    key: "active_listings",
    label: "Active Listings",
    description: "Published on marketplace",
    icon: Home,
    color: "green",
    href: "/admin/properties",
  },
  {
    key: "reported_listings",
    label: "Reports",
    description: "Listings with user reports",
    icon: Flag,
    color: "red",
    href: "/admin/properties",
    showActionBadge: (value) => value > 0,
  },
]

type QuickAction =
  | {
      href: string
      icon: LucideIcon
      title: string
      description: string
    }
  | {
      icon: LucideIcon
      title: string
      description: string
      comingSoon: true
    }

const QUICK_ACTIONS: QuickAction[] = [
  {
    href: "/admin/properties",
    icon: Home,
    title: "Manage Properties",
    description: "View, edit, and moderate listings.",
  },
  {
    href: "/admin/properties/create",
    icon: PlusCircle,
    title: "Create Property",
    description: "Add a new listing to the platform.",
  },
  {
    href: "/admin/realtor-applications",
    icon: ClipboardList,
    title: "Realtor Applications",
    description: "Review and approve realtor access requests.",
  },
  {
    href: "/admin/users",
    icon: Users,
    title: "Users",
    description: "Manage platform accounts and roles.",
  },
]

const ICON_COLOR_CLASSES: Record<MetricColor, string> = {
  blue: "bg-blue-700 text-white",
  purple: "bg-violet-700 text-white",
  orange: "bg-amber-600 text-white",
  green: "bg-emerald-700 text-white",
  red: "bg-red-600 text-white",
}

const CARD_INTERACTIVE_CLASSES =
  "transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-2xl bg-zinc-200"
        />
      ))}
    </div>
  )
}

function PlatformStatusSkeleton() {
  return <div className="h-28 animate-pulse rounded-3xl bg-zinc-200" />
}

function formatCountLabel(count: number, singular: string, plural: string) {
  return `${count.toLocaleString()} ${count === 1 ? singular : plural}`
}

function PlatformStatus({ stats }: { stats: AdminStats }) {
  const pending = stats.pending_realtor_applications
  const reports = stats.reported_listings
  const isHealthy = pending === 0 && reports === 0

  if (isHealthy) {
    return (
      <SectionCard className="border-emerald-100 bg-emerald-50">
        <div className="space-y-1">
          <p className="text-sm font-bold text-zinc-900">
            🟢 Platform Status
          </p>
          <p className="text-sm font-semibold text-emerald-800">
            Everything is operating normally.
          </p>
          <p className="text-sm text-emerald-700">All systems look healthy.</p>
        </div>
      </SectionCard>
    )
  }

  return (
    <SectionCard className="border-amber-100 bg-amber-50">
      <div className="space-y-3">
        {pending > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-900">
              🟠 Attention required
            </p>
            <p className="text-sm text-amber-900">
              {formatCountLabel(
                pending,
                "realtor application awaiting review.",
                "realtor applications awaiting review."
              )}
            </p>
          </div>
        )}

        {reports > 0 && (
          <div className="space-y-1">
            <p className="text-sm font-bold text-zinc-900">
              🔴 Moderation required
            </p>
            <p className="text-sm text-red-800">
              {formatCountLabel(
                reports,
                "reported listing requires attention.",
                "reported listings require attention."
              )}
            </p>
          </div>
        )}
      </div>
    </SectionCard>
  )
}

function MetricCard({
  label,
  description,
  value,
  icon: Icon,
  color,
  href,
  comingSoon = false,
  showActionBadge,
}: {
  label: string
  description: string
  value: number
  icon: LucideIcon
  color: MetricColor
  href?: string
  comingSoon?: boolean
  showActionBadge?: (value: number) => boolean
}) {
  const badge = comingSoon ? (
    <StatusBadge variant="neutral">Coming Soon</StatusBadge>
  ) : showActionBadge?.(value) ? (
    <StatusBadge variant="warning">Action</StatusBadge>
  ) : null

  const content = (
    <>
      <div className="flex items-start justify-between gap-2">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${ICON_COLOR_CLASSES[color]}`}
        >
          <Icon className="h-4 w-4" />
        </div>
        {badge}
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-900">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs font-bold text-zinc-900">{label}</p>
      <p className="mt-0.5 text-xs text-zinc-500">{description}</p>
    </>
  )

  const baseClassName = `rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100 ${comingSoon ? "cursor-default opacity-90" : CARD_INTERACTIVE_CLASSES}`

  if (comingSoon || !href) {
    return <div className={baseClassName}>{content}</div>
  }

  return (
    <Link href={href} className={`block ${baseClassName}`}>
      {content}
    </Link>
  )
}

function PlatformOverview({
  stats,
  isLoading,
  error,
}: {
  stats: AdminStats | null
  isLoading: boolean
  error: string
}) {
  return (
    <>
      {isLoading ? (
        <PlatformStatusSkeleton />
      ) : stats && !error ? (
        <PlatformStatus stats={stats} />
      ) : null}

      <SectionCard>
        <h2 className="text-sm font-bold text-zinc-900">Platform Overview</h2>

        <div className="mt-4">
          {isLoading ? (
            <StatsSkeleton />
          ) : error ? (
            <p className="rounded-2xl bg-red-50 p-3 text-sm font-medium text-red-600 ring-1 ring-red-100">
              {error}
            </p>
          ) : stats ? (
            <div className="grid grid-cols-2 gap-3">
              {METRIC_CONFIG.map((metric) => (
                <MetricCard
                  key={metric.key}
                  label={metric.label}
                  description={metric.description}
                  value={stats[metric.key]}
                  icon={metric.icon}
                  color={metric.color}
                  href={metric.href}
                  comingSoon={metric.comingSoon}
                  showActionBadge={metric.showActionBadge}
                />
              ))}
            </div>
          ) : null}
        </div>
      </SectionCard>
    </>
  )
}

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadStats() {
      try {
        const token = getToken()

        if (!token) {
          throw new Error("Unable to load dashboard stats.")
        }

        const data = await getAdminStats(token)
        setStats(data)
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load dashboard stats."
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadStats()
  }, [])

  return (
    <AdminRoute>
      <PageShell>
        <PageHeader
          title="Admin Dashboard"
          subtitle="Platform management and moderation overview."
        />

        <PlatformOverview stats={stats} isLoading={isLoading} error={error} />

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Quick Actions</h2>

          <div className="mt-4 space-y-3">
            {QUICK_ACTIONS.map((action) => {
              const Icon = action.icon

              if ("comingSoon" in action) {
                return (
                  <div
                    key={action.title}
                    className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-zinc-900">
                          {action.title}
                        </h3>
                        <StatusBadge variant="neutral">Coming Soon</StatusBadge>
                      </div>
                      <p className="mt-1 text-sm text-zinc-500">
                        {action.description}
                      </p>
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100 ${CARD_INTERACTIVE_CLASSES}`}
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-zinc-900">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500">
                      {action.description}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        </SectionCard>
      </PageShell>
    </AdminRoute>
  )
}
