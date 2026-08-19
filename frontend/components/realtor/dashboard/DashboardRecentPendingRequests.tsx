import Link from "next/link"
import { ChevronRight } from "lucide-react"

import EmptyState from "@/components/ui/EmptyState"
import SectionCard from "@/components/ui/SectionCard"
import { formatDashboardDateTime } from "@/lib/realtorWorkspace"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

type DashboardRecentPendingRequestsProps = {
  items: ViewingRequestRealtor[]
  className?: string
}

export default function DashboardRecentPendingRequests({
  items,
  className = "",
}: DashboardRecentPendingRequestsProps) {
  return (
    <div className={className}>
      <SectionCard className="h-full">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">
            Recent pending viewing requests
          </h2>
          <p className="mt-1 text-xs text-zinc-500">
            Latest requests waiting for your response.
          </p>
        </div>
        <Link
          href="/realtor/viewing-requests"
          className="shrink-0 text-xs font-semibold text-blue-700 underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No pending viewing requests"
            description="New renter requests will appear here when they arrive."
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-2">
          {items.map((request) => (
            <li key={request.id}>
              <Link
                href={`/realtor/viewing-requests/${request.id}`}
                className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
              >
                <div className="min-w-0 pr-3">
                  <p className="truncate text-sm font-semibold text-zinc-900">
                    {request.property.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {request.requester_email}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-400">
                    {formatDashboardDateTime(request.created_at)}
                  </p>
                </div>
                <ChevronRight
                  className="h-4 w-4 shrink-0 text-zinc-400"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
      </SectionCard>
    </div>
  )
}
