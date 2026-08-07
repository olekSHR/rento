"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"

import ConsumerShell from "@/components/ConsumerShell"
import ProtectedRoute from "@/components/ProtectedRoute"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { useAuth } from "@/context/AuthContext"
import { useFavorites } from "@/context/FavoritesContext"

const profileCardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const profilePrimaryCtaClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

const profileBadgeClassName =
  "inline-flex shrink-0 rounded-full border border-[#DFC58A]/20 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#DFC58A]"

const comingSoonBadgeClassName =
  "inline-flex shrink-0 rounded-full border border-white/10 bg-[#252525] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#B8B8B8]"

const profileLogoutClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl border border-red-400/20 bg-[#252525] text-sm font-semibold text-red-200 transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

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

function ProfileHeader() {
  return (
    <header className="mb-6 md:mb-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
        Your account
      </p>

      <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
        Profile
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8B8B8]">
        Manage your account and saved activity.
      </p>
    </header>
  )
}

function ProfileHeaderSkeleton() {
  return (
    <header aria-hidden="true" className="mb-6 md:mb-8">
      <div className="h-3 w-24 animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
      <div className="mt-3 h-8 w-32 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
      <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded-md bg-white/5 motion-reduce:animate-none" />
    </header>
  )
}

function ProfileSkeleton() {
  return (
    <main
      className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
    >
      <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-10">
        <div role="status" aria-live="polite">
          <span className="sr-only">Loading profile</span>
          <ProfileHeaderSkeleton />
          <div className="space-y-4">
            <div className="h-36 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
            <div className="h-28 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-24 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
              <div className="h-24 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
            </div>
            <div className="h-24 animate-pulse rounded-[24px] bg-white/10 motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </main>
  )
}

function SavedPropertiesEmptyState() {
  return (
    <div
      role="status"
      className="mt-4 rounded-[20px] border border-white/8 bg-[#252525] px-4 py-5 text-center"
    >
      <p className="text-sm font-semibold text-[#F5F5F5]">
        No saved properties yet.
      </p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
        Save listings from the marketplace to find them here.
      </p>
    </div>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading, logout, isRealtor, isAdmin } = useAuth()
  const { favorites, isLoading: favoritesLoading } = useFavorites()

  if (isLoading) {
    return (
      <ConsumerShell>
        <ProfileSkeleton />
      </ConsumerShell>
    )
  }

  const favoritesCount = favorites.length
  const showRealtorPromo = !isRealtor && !isAdmin
  const accountInitials = user?.email ? getEmailInitials(user.email) : "U"

  function handleLogout() {
    logout()
    router.push("/")
  }

  return (
    <ProtectedRoute>
      <ConsumerShell>
        <main
          className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
        >
          <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-10">
            <ProfileHeader />

            <div className="space-y-4 md:space-y-6">
              <section
                aria-labelledby="profile-account-heading"
                className={profileCardClassName}
              >
                <h2 id="profile-account-heading" className="sr-only">
                  Account summary
                </h2>

                <div className="flex items-start gap-4">
                  <div
                    aria-label={
                      user?.email
                        ? `Account avatar for ${user.email}`
                        : "Account avatar"
                    }
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#DFC58A]/25 bg-[#252525] text-lg font-semibold text-[#DFC58A]"
                  >
                    {accountInitials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className={profileBadgeClassName}>
                      Your Rento account
                    </span>

                    <p className="mt-2 truncate text-base font-semibold text-[#F5F5F5] md:text-lg">
                      {user?.email ?? "Account"}
                    </p>

                    <p className="mt-2 text-sm text-[#B8B8B8]">
                      Member since{" "}
                      <span className="font-medium text-[#F5F5F5]">
                        Recently joined
                      </span>
                    </p>
                  </div>
                </div>
              </section>

              {isAdmin && (
                <section
                  aria-labelledby="profile-admin-heading"
                  className={profileCardClassName}
                >
                  <h2
                    id="profile-admin-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Admin Workspace
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#B8B8B8]">
                    Manage users, listings, and moderation.
                  </p>
                  <div className="mt-4">
                    <Link href="/admin" className={profilePrimaryCtaClassName}>
                      Open Admin Workspace
                    </Link>
                  </div>
                </section>
              )}

              <section
                aria-labelledby="profile-saved-heading"
                className={profileCardClassName}
              >
                <h2
                  id="profile-saved-heading"
                  className="text-sm font-semibold text-[#F5F5F5]"
                >
                  Saved properties
                </h2>

                {favoritesLoading ? (
                  <div
                    aria-hidden="true"
                    className="mt-3 h-5 w-32 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none"
                  />
                ) : favoritesCount === 0 ? (
                  <SavedPropertiesEmptyState />
                ) : (
                  <p className="mt-3 text-sm text-[#B8B8B8]">
                    <span className="font-semibold text-[#F5F5F5]">
                      {favoritesCount}
                    </span>{" "}
                    saved propert{favoritesCount === 1 ? "y" : "ies"}
                  </p>
                )}

                <div className="mt-4">
                  <Link href="/favorites" className={profilePrimaryCtaClassName}>
                    View Favorites
                  </Link>
                </div>
              </section>

              <section
                aria-labelledby="profile-viewing-heading"
                className={profileCardClassName}
              >
                <h2
                  id="profile-viewing-heading"
                  className="text-sm font-semibold text-[#F5F5F5]"
                >
                  Viewing requests
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  Track submitted viewing requests and follow next steps for
                  accepted listings.
                </p>

                <div className="mt-4">
                  <Link
                    href="/viewing-requests"
                    className={profilePrimaryCtaClassName}
                  >
                    View Viewing Requests
                  </Link>
                </div>
              </section>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <section
                  aria-labelledby="profile-recent-heading"
                  className={profileCardClassName}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2
                        id="profile-recent-heading"
                        className="text-sm font-semibold text-[#F5F5F5]"
                      >
                        Recently viewed
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                        Pick up where you left off with listings you opened
                        recently.
                      </p>
                    </div>
                    <span className={comingSoonBadgeClassName}>Coming soon</span>
                  </div>
                </section>

                <section
                  aria-labelledby="profile-searches-heading"
                  className={profileCardClassName}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2
                        id="profile-searches-heading"
                        className="text-sm font-semibold text-[#F5F5F5]"
                      >
                        Saved searches
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                        Get alerts when new listings match your filters.
                      </p>
                    </div>
                    <span className={comingSoonBadgeClassName}>Coming soon</span>
                  </div>
                </section>
              </div>

              {showRealtorPromo && (
                <section
                  aria-labelledby="profile-realtor-heading"
                  className={`${profileCardClassName} border-[#DFC58A]/15`}
                >
                  <h2
                    id="profile-realtor-heading"
                    className="text-sm font-semibold text-[#F5F5F5]"
                  >
                    Become a Realtor
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#B8B8B8]">
                    Want to advertise properties? Become a verified Realtor and
                    manage your own listings.
                  </p>
                  <div className="mt-4">
                    <Link
                      href="/become-realtor"
                      className={profilePrimaryCtaClassName}
                    >
                      Become a Realtor
                    </Link>
                  </div>
                </section>
              )}

              <section
                aria-labelledby="profile-logout-heading"
                className={profileCardClassName}
              >
                <h2
                  id="profile-logout-heading"
                  className="text-sm font-semibold text-[#F5F5F5]"
                >
                  Account
                </h2>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={profileLogoutClassName}
                  >
                    Logout
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
