import Link from "next/link"

import { REALTOR_PROPERTIES_HREF } from "@/lib/realtorWorkspace"

type DashboardQuickActionsProps = {
  canCreateListing: boolean
  pendingViewingRequestTotal: number
}

const primaryActionClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

const secondaryActionClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl border border-white/10 bg-[#252525] text-sm font-semibold text-[#F5F5F5] transition-transform active:scale-[0.98] hover:bg-[#2D2D2D] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

export default function DashboardQuickActions({
  canCreateListing,
  pendingViewingRequestTotal,
}: DashboardQuickActionsProps) {
  return (
    <section aria-label="Quick actions" className="space-y-3">
      {canCreateListing ? (
        <Link
          href="/realtor/properties/create"
          className={primaryActionClassName}
        >
          Add Property
        </Link>
      ) : (
        <Link href="/realtor/profile" className={primaryActionClassName}>
          Complete Profile
        </Link>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {pendingViewingRequestTotal > 0 && (
          <Link
            href="/realtor/viewing-requests"
            className={secondaryActionClassName}
          >
            Review Viewing Requests
          </Link>
        )}
        <Link href={REALTOR_PROPERTIES_HREF} className={secondaryActionClassName}>
          Manage Listings
        </Link>
      </div>
    </section>
  )
}
