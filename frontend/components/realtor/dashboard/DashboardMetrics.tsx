import type { DashboardMetrics as DashboardMetricsData } from "@/lib/realtorWorkspace"

type DashboardMetricsProps = {
  metrics: DashboardMetricsData
  className?: string
}

const metricCards = [
  {
    key: "activeListings" as const,
    label: "Active Listings",
  },
  {
    key: "pendingModeration" as const,
    label: "Pending Moderation",
  },
  {
    key: "pendingViewingRequests" as const,
    label: "Pending Viewing Requests",
  },
  {
    key: "acceptedViewingRequests" as const,
    label: "Accepted Viewing Requests",
  },
]

export default function DashboardMetrics({
  metrics,
  className = "",
}: DashboardMetricsProps) {
  return (
    <section
      aria-label="Dashboard metrics"
      className={`grid grid-cols-2 gap-3 lg:grid-cols-4 ${className}`.trim()}
    >
      {metricCards.map((card) => (
        <div
          key={card.key}
          className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 shadow-sm"
        >
          <p className="text-2xl font-semibold leading-none text-zinc-900">
            {metrics[card.key]}
          </p>
          <p className="mt-1.5 text-xs font-semibold text-zinc-500">{card.label}</p>
        </div>
      ))}
    </section>
  )
}
