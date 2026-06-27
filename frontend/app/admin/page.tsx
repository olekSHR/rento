"use client"

import Link from "next/link"
import {
  Building2,
  ClipboardList,
  Flag,
  Home,
  PlusCircle,
  Users,
} from "lucide-react"
import { useEffect, useState } from "react"

import AdminRoute from "@/components/AdminRoute"
import PageHeader from "@/components/ui/PageHeader"
import PageShell from "@/components/ui/PageShell"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { getToken } from "@/lib/tokenStorage"
import { getAdminStats, type AdminStats } from "@/services/api"

const METRIC_CONFIG = [
  {
    key: "total_users" as const,
    label: "Total Users",
    icon: Users,
  },
  {
    key: "total_realtors" as const,
    label: "Realtors",
    icon: Building2,
  },
  {
    key: "pending_realtor_applications" as const,
    label: "Pending Applications",
    icon: ClipboardList,
    highlight: true,
  },
  {
    key: "active_listings" as const,
    label: "Active Listings",
    icon: Home,
  },
  {
    key: "reported_listings" as const,
    label: "Reports",
    icon: Flag,
    highlight: true,
  },
]

const QUICK_ACTIONS = [
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
] as const

function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-2xl bg-zinc-200"
        />
      ))}
    </div>
  )
}

function MetricCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string
  value: number
  icon: typeof Users
  highlight?: boolean
}) {
  return (
    <div className="rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
          <Icon className="h-4 w-4" />
        </div>
        {highlight && value > 0 && (
          <StatusBadge variant="warning">Action</StatusBadge>
        )}
      </div>
      <p className="mt-3 text-2xl font-extrabold tracking-tight text-zinc-900">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs font-semibold text-zinc-500">{label}</p>
    </div>
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
                value={stats[metric.key]}
                icon={metric.icon}
                highlight={metric.highlight}
              />
            ))}
          </div>
        ) : null}
      </div>
    </SectionCard>
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

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-start gap-3 rounded-2xl bg-zinc-50 p-4 ring-1 ring-zinc-100 transition-transform active:scale-[0.98]"
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
