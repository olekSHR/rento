"use client"

import {
  VIEWING_REQUEST_INBOX_FILTERS,
  type ViewingRequestInboxFilter,
} from "@/lib/realtorWorkspace"

type ViewingRequestStatusTabsProps = {
  activeFilter: ViewingRequestInboxFilter
  onFilterChange: (filter: ViewingRequestInboxFilter) => void
  disabled?: boolean
}

export default function ViewingRequestStatusTabs({
  activeFilter,
  onFilterChange,
  disabled = false,
}: ViewingRequestStatusTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Viewing request status filters"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {VIEWING_REQUEST_INBOX_FILTERS.map((filter) => {
        const isActive = activeFilter === filter.id

        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onFilterChange(filter.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:opacity-60 ${
              isActive
                ? "bg-blue-700 text-white"
                : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
