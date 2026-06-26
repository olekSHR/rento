"use client"

import { useRouter } from "next/navigation"

import BottomNav from "@/components/BottomNav"
import ProtectedRoute from "@/components/ProtectedRoute"
import EmptyState from "@/components/ui/EmptyState"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import SecondaryButton from "@/components/ui/SecondaryButton"
import SectionCard from "@/components/ui/SectionCard"
import StatusBadge from "@/components/ui/StatusBadge"
import { useAuth } from "@/context/AuthContext"
import { useFavorites } from "@/context/FavoritesContext"

function getEmailInitials(email: string): string {
  const localPart = email.split("@")[0]?.trim()

  if (!localPart) {
    return "U"
  }

  const parts = localPart.split(/[._-]+/).filter(Boolean)

  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase()
  }

  return localPart.charAt(0).toUpperCase()
}

function ProfileSkeleton() {
  return (
    <PageShell>
      <div className="h-36 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-28 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-24 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-24 animate-pulse rounded-3xl bg-zinc-200" />
    </PageShell>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, logout, isRealtor, isAdmin } = useAuth()
  const { favorites, isLoading: favoritesLoading } = useFavorites()

  if (isLoading) {
    return (
      <>
        <ProfileSkeleton />
        <BottomNav />
      </>
    )
  }

  const favoritesCount = favorites.length
  const showRealtorPromo = !isRealtor && !isAdmin

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <ProtectedRoute>
      <PageShell>
        <SectionCard>
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-bold text-white ring-2 ring-blue-100">
              {user?.email ? getEmailInitials(user.email) : "U"}
            </div>

            <div className="min-w-0 flex-1">
              <StatusBadge variant="info">Your Rento account</StatusBadge>
              <h1 className="mt-2 truncate text-lg font-extrabold text-zinc-900">
                {user?.email ?? "Account"}
              </h1>
              <p className="mt-2 text-sm text-zinc-500">
                Member since{" "}
                <span className="font-medium text-zinc-700">
                  Recently joined
                </span>
              </p>
            </div>
          </div>
        </SectionCard>

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Saved properties</h2>

          {favoritesLoading ? (
            <div className="mt-3 h-5 w-32 animate-pulse rounded-lg bg-zinc-200" />
          ) : favoritesCount === 0 ? (
            <div className="mt-3">
              <EmptyState
                title="No saved properties yet."
                description="Save listings from the marketplace to find them here."
              />
            </div>
          ) : (
            <p className="mt-2 text-sm text-zinc-600">
              {favoritesCount} saved propert
              {favoritesCount === 1 ? "y" : "ies"}
            </p>
          )}

          <div className="mt-4">
            <PrimaryButton href="/favorites">View Favorites</PrimaryButton>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Recently viewed</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Pick up where you left off with listings you opened recently.
              </p>
            </div>
            <StatusBadge variant="neutral">Coming soon</StatusBadge>
          </div>
        </SectionCard>

        <SectionCard>
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-zinc-900">Saved searches</h2>
              <p className="mt-2 text-sm text-zinc-500">
                Get alerts when new listings match your filters.
              </p>
            </div>
            <StatusBadge variant="neutral">Coming soon</StatusBadge>
          </div>
        </SectionCard>

        {showRealtorPromo && (
          <SectionCard className="border-blue-200 bg-blue-50">
            <h2 className="text-sm font-bold text-blue-900">Become a Realtor</h2>
            <p className="mt-2 text-sm leading-6 text-blue-800">
              Want to advertise properties? Become a verified Realtor and manage
              your own listings.
            </p>
            <div className="mt-4">
              <PrimaryButton disabled>Request access — Coming soon</PrimaryButton>
            </div>
          </SectionCard>
        )}

        <SectionCard>
          <h2 className="text-sm font-bold text-zinc-900">Account</h2>
          <div className="mt-4">
            <SecondaryButton
              onClick={handleLogout}
              className="border-red-200 bg-red-50 text-red-600"
            >
              Logout
            </SecondaryButton>
          </div>
        </SectionCard>
      </PageShell>

      <BottomNav />
    </ProtectedRoute>
  )
}
