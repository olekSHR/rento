import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import { REALTOR_PROPERTIES_HREF } from "@/lib/realtorWorkspace"

type DashboardQuickActionsProps = {
  canCreateListing: boolean
  pendingViewingRequestTotal: number
}

export default function DashboardQuickActions({
  canCreateListing,
  pendingViewingRequestTotal,
}: DashboardQuickActionsProps) {
  return (
    <section aria-label="Quick actions" className="space-y-3">
      {canCreateListing ? (
        <PrimaryButton href="/realtor/properties/create">
          Add Property
        </PrimaryButton>
      ) : (
        <PrimaryButton href="/realtor/profile">Complete Profile</PrimaryButton>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {pendingViewingRequestTotal > 0 && (
          <SecondaryButton href="/realtor/viewing-requests">
            Review Viewing Requests
          </SecondaryButton>
        )}
        <SecondaryButton href={REALTOR_PROPERTIES_HREF}>Manage Listings</SecondaryButton>
      </div>
    </section>
  )
}
