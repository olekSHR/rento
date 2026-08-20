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

// The tabs sit directly on the route background, so the focus ring offset uses
// the page surface rather than an elevated card surface.
const tabBaseClassName =
  "inline-flex min-h-11 shrink-0 items-center rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B] disabled:opacity-60"

const tabActiveClassName = "border-[#DFC58A] bg-[#DFC58A] text-[#1B1B1B]"

const tabInactiveClassName =
  "border-white/10 bg-[#252525] text-[#B8B8B8] hover:bg-white/5 hover:text-[#F5F5F5]"

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
            className={`${tabBaseClassName} ${
              isActive ? tabActiveClassName : tabInactiveClassName
            }`}
          >
            {filter.label}
          </button>
        )
      })}
    </div>
  )
}
