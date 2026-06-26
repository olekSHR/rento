"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import BottomNav from "@/components/BottomNav"
import ProtectedRoute from "@/components/ProtectedRoute"
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
    <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
      <div className="mx-auto max-w-md space-y-4">
        <div className="h-36 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="h-28 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="h-24 animate-pulse rounded-3xl bg-zinc-200" />
        <div className="h-24 animate-pulse rounded-3xl bg-zinc-200" />
      </div>
    </main>
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
      <main className="min-h-screen bg-zinc-100 px-4 pb-24 pt-6">
        <div className="mx-auto max-w-md space-y-4">
          <header className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-lg font-bold text-white ring-2 ring-blue-100">
                {user?.email ? getEmailInitials(user.email) : "U"}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                  Your Rento account
                </p>
                <h1 className="mt-1 truncate text-lg font-extrabold text-zinc-900">
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
          </header>

          <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-900">Saved properties</h2>

            {favoritesLoading ? (
              <div className="mt-3 h-5 w-32 animate-pulse rounded-lg bg-zinc-200" />
            ) : favoritesCount === 0 ? (
              <p className="mt-2 text-sm text-zinc-500">
                No saved properties yet.
              </p>
            ) : (
              <p className="mt-2 text-sm text-zinc-600">
                {favoritesCount} saved propert
                {favoritesCount === 1 ? "y" : "ies"}
              </p>
            )}

            <Link
              href="/favorites"
              className="mt-4 flex h-11 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white active:scale-[0.98]"
            >
              View Favorites
            </Link>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-zinc-900">
                  Recently viewed
                </h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Pick up where you left off with listings you opened recently.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                Coming soon
              </span>
            </div>
          </section>

          <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-zinc-900">Saved searches</h2>
                <p className="mt-2 text-sm text-zinc-500">
                  Get alerts when new listings match your filters.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-zinc-500">
                Coming soon
              </span>
            </div>
          </section>

          {showRealtorPromo && (
            <section className="rounded-3xl border border-blue-200 bg-blue-50 p-5 shadow-sm">
              <h2 className="text-sm font-bold text-blue-900">
                Become a Realtor
              </h2>
              <p className="mt-2 text-sm leading-6 text-blue-800">
                Want to advertise properties? Become a verified Realtor and
                manage your own listings.
              </p>
              <button
                type="button"
                disabled
                className="mt-4 flex h-11 w-full items-center justify-center rounded-2xl bg-blue-700/50 text-sm font-bold text-white"
              >
                Request access — Coming soon
              </button>
            </section>
          )}

          <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold text-zinc-900">Account</h2>
            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex h-11 w-full items-center justify-center rounded-2xl border border-red-200 bg-red-50 text-sm font-bold text-red-600 active:scale-[0.98]"
            >
              Logout
            </button>
          </section>
        </div>
      </main>

      <BottomNav />
    </ProtectedRoute>
  )
}
