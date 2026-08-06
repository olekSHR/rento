import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { BadgeCheck } from "lucide-react"

import BackButton from "@/components/BackButton"
import ConsumerShell from "@/components/ConsumerShell"
import PropertyCard from "@/components/PropertyCard"
import { PropertyTrustCard } from "@/components/PropertyTrustCard"
import { RealtorAvatarEnlargeTrigger } from "@/components/RealtorAvatarLightbox"
import { RealtorContactActions } from "@/components/RealtorContactActions"
import { SAFE_BOTTOM_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { getImageUrl } from "@/lib/getImageUrl"
import { isApiHttpError } from "@/lib/apiError"
import { getPublicRealtorProfile } from "@/services/api"
import type { PublicRealtorProfilePage } from "@/types/publicRealtor"
import type { PropertyRealtorSummary } from "@/types/property"

type Props = {
  params: Promise<{
    userId: string
  }>
}

function getContactInitials(fullName?: string | null): string {
  const name = fullName?.trim()

  if (!name) {
    return "R"
  }

  const parts = name.split(/\s+/).filter(Boolean)

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase()
  }

  return (
    parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
  ).toUpperCase()
}

function buildListingsDescription(
  agencyName: string | null | undefined,
  activeListingsCount: number
): string {
  const agency = agencyName?.trim()
  const listingsLabel =
    activeListingsCount === 1
      ? "1 active listing"
      : `${activeListingsCount} active listings`

  if (agency) {
    return `${agency} · ${listingsLabel}`
  }

  return listingsLabel
}

function toTrustCardRealtor(
  realtor: PublicRealtorProfilePage["realtor"]
): PropertyRealtorSummary {
  return {
    user_id: realtor.user_id,
    full_name: realtor.full_name,
    agency_name: realtor.agency_name,
    avatar_url: realtor.avatar_url,
    is_verified: realtor.is_verified,
    member_since: realtor.member_since,
    active_listings_count: realtor.active_listings_count,
    telegram_username: realtor.telegram_username,
  }
}

function handlePublicRealtorProfileError(error: unknown): never {
  if (isApiHttpError(error) && error.status === 404) {
    notFound()
  }

  throw error
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { userId } = await params
  const parsedUserId = Number(userId)
  const canonicalPath = Number.isFinite(parsedUserId)
    ? `/realtors/${parsedUserId}`
    : `/realtors/${encodeURIComponent(userId)}`

  if (!Number.isFinite(parsedUserId)) {
    notFound()
  }

  try {
    const data = await getPublicRealtorProfile(parsedUserId)
    const displayName = data.realtor.full_name?.trim() || "Realtor"

    return {
      title: {
        absolute: `${displayName} · Rento`,
      },
      description: buildListingsDescription(
        data.realtor.agency_name,
        data.realtor.active_listings_count
      ),
      alternates: {
        canonical: canonicalPath,
      },
      robots: {
        index: true,
        follow: true,
      },
    }
  } catch (error) {
    handlePublicRealtorProfileError(error)
  }
}

export default async function PublicRealtorProfilePage({ params }: Props) {
  const { userId } = await params
  const parsedUserId = Number(userId)

  if (!Number.isFinite(parsedUserId)) {
    notFound()
  }

  let profile: PublicRealtorProfilePage

  try {
    profile = await getPublicRealtorProfile(parsedUserId)
  } catch (error) {
    handlePublicRealtorProfileError(error)
  }

  const { realtor, properties } = profile
  const displayName = realtor.full_name?.trim() || "Realtor"
  const agencyName = realtor.agency_name?.trim()
  const avatarUrl = realtor.avatar_url ? getImageUrl(realtor.avatar_url) : null
  const trustCardRealtor = toTrustCardRealtor(realtor)
  const hasListings = properties.items.length > 0

  return (
    <ConsumerShell hideBottomNav>
      <main
        className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${SAFE_BOTTOM_CONTENT_CLASS}`}
      >
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-4 md:px-8">
          <BackButton />

          <section aria-labelledby="realtor-identity-heading" className="mt-6">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
              Realtor profile
            </p>

            <div className="mt-4 flex items-start gap-4">
              {avatarUrl ? (
                <RealtorAvatarEnlargeTrigger
                  imageUrl={avatarUrl}
                  alt={displayName}
                  className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A]"
                >
                  <Image
                    src={avatarUrl}
                    alt={displayName}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="80px"
                  />
                </RealtorAvatarEnlargeTrigger>
              ) : (
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#252525] ring-1 ring-[#DFC58A]/30">
                  <span className="text-lg font-semibold text-[#DFC58A]">
                    {getContactInitials(realtor.full_name)}
                  </span>
                </div>
              )}

              <div className="min-w-0 flex-1">
                <h1
                  id="realtor-identity-heading"
                  className="text-[1.75rem] font-semibold leading-tight tracking-tight text-[#F5F5F5]"
                >
                  {displayName}
                </h1>

                {agencyName && (
                  <p className="mt-1 text-sm text-[#B8B8B8]">{agencyName}</p>
                )}

                {realtor.is_verified && (
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#252525] px-3 py-1.5 text-xs font-medium text-[#DFC58A] ring-1 ring-white/15">
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Verified realtor
                  </div>
                )}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="realtor-trust-heading"
            className="mt-8"
          >
            <h2
              id="realtor-trust-heading"
              className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]"
            >
              Trust information
            </h2>

            <div className="mt-4">
              <PropertyTrustCard realtor={trustCardRealtor} trustOnly />
            </div>
          </section>

          <section
            aria-labelledby="realtor-contact-heading"
            className="mt-8 rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"
          >
            <h2
              id="realtor-contact-heading"
              className="text-xs font-medium uppercase tracking-[0.12em] text-[#B8B8B8]"
            >
              Contact
            </h2>

            <RealtorContactActions
              displayName={displayName}
              phone={realtor.phone}
              whatsapp={realtor.whatsapp}
              telegramUsername={realtor.telegram_username}
            />
          </section>

          <section
            aria-labelledby="realtor-listings-heading"
            className="mt-10"
          >
            <h2
              id="realtor-listings-heading"
              className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
            >
              Active listings
            </h2>

            {hasListings ? (
              <ul className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {properties.items.map((listing) => (
                  <li key={listing.id} className="min-w-0">
                    <PropertyCard
                      id={listing.id}
                      title={listing.title}
                      price={listing.price}
                      city={listing.city}
                      rooms={listing.rooms}
                      image_url={listing.image_url}
                      last_verified_at={listing.last_verified_at}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-[#252525] px-5 py-8 text-center">
                <p className="text-sm font-medium text-[#F5F5F5]">
                  No active listings right now
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
                  {displayName} does not have any available rentals on Rento at
                  the moment. You can still use the contact options above to
                  reach out directly.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </ConsumerShell>
  )
}
