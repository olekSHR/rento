import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { formatDashboardDateTime } from "@/lib/realtorWorkspace"
import type { ViewingRequestRealtor } from "@/types/viewingRequest"

type DashboardRecentPendingRequestsProps = {
  items: ViewingRequestRealtor[]
  className?: string
}

const cardClassName =
  "h-full rounded-3xl border border-white/8 bg-[#2D2D2D] p-5"

const rowClassName =
  "flex items-center justify-between rounded-2xl border border-white/10 bg-[#252525] px-3 py-3 transition-transform active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

export default function DashboardRecentPendingRequests({
  items,
  className = "",
}: DashboardRecentPendingRequestsProps) {
  return (
    <div className={className}>
      <section className={cardClassName}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-[#F5F5F5]">
              Recent pending viewing requests
            </h2>
            <p className="mt-1 text-xs text-[#B8B8B8]">
              Latest requests waiting for your response.
            </p>
          </div>
          <Link
            href="/realtor/viewing-requests"
            className="shrink-0 rounded-sm text-xs font-semibold text-[#DFC58A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            View all
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-4">
            <div className="rounded-2xl bg-[#252525] p-4 text-center ring-1 ring-white/10">
              <h3 className="text-sm font-bold text-[#F5F5F5]">
                No pending viewing requests
              </h3>
              <p className="mt-1 text-sm text-[#B8B8B8]">
                New renter requests will appear here when they arrive.
              </p>
            </div>
          </div>
        ) : (
          <ul className="mt-4 space-y-2">
            {items.map((request) => (
              <li key={request.id}>
                <Link
                  href={`/realtor/viewing-requests/${request.id}`}
                  className={rowClassName}
                >
                  <div className="min-w-0 pr-3">
                    <p className="truncate text-sm font-semibold text-[#F5F5F5]">
                      {request.property.title}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-[#B8B8B8]">
                      {request.requester_email}
                    </p>
                    <p className="mt-1 text-[11px] text-[#B8B8B8]/80">
                      {formatDashboardDateTime(request.created_at)}
                    </p>
                  </div>
                  <ChevronRight
                    className="h-4 w-4 shrink-0 text-[#B8B8B8]"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
