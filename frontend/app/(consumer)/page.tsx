import Link from "next/link"

import HomeHero from "@/components/HomeHero"
import HomePageContent from "@/components/HomePageContent"
import PropertyCard from "@/components/PropertyCard"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { hasPropertyListingImage } from "@/lib/getImageUrl"
import { getProperties } from "@/services/api"
import type { Property } from "@/types/property"
import HeaderAuthButton from "@/components/HeaderAuthButton"

function PhotographedListingsEmptyState() {
  return (
    <div
      role="status"
      className="rounded-[24px] border border-white/8 bg-[#252525] px-6 py-12 text-center"
    >
      <h3 className="text-xl font-semibold tracking-tight text-[#F5F5F5]">
        No photographed rentals available
      </h3>
      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
        New verified listings will appear here.
      </p>
    </div>
  )
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{
    city?: string
    min_price?: string
    rooms?: string
  }>
}) {
  const params = await searchParams

  const properties = await getProperties({
    city: params.city,
    min_price: params.min_price,
    rooms: params.rooms,
  })

  const activeFilters = {
    city: params.city ?? "",
    min_price: params.min_price ?? "",
    rooms: params.rooms ?? "",
  }

  const hasActiveFilters = Boolean(
    activeFilters.city || activeFilters.min_price || activeFilters.rooms
  )

  const activeFilterLabels: string[] = []

  if (activeFilters.city.trim()) {
    activeFilterLabels.push(activeFilters.city.trim())
  }

  if (activeFilters.min_price.trim()) {
    activeFilterLabels.push(`from €${activeFilters.min_price.trim()}`)
  }

  if (activeFilters.rooms.trim()) {
    activeFilterLabels.push(`${activeFilters.rooms.trim()}+ rooms`)
  }

  const photographedProperties = properties.items.filter((property: Property) =>
    hasPropertyListingImage(property)
  )

  const showFilteredEmptyState =
    properties.items.length === 0 && hasActiveFilters

  const showPhotographedEmptyState =
    !showFilteredEmptyState && photographedProperties.length === 0

  return (
    <main className={`min-h-screen bg-[#1B1B1B] ${BOTTOM_NAV_CONTENT_CLASS}`}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#252525]/95 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-[4rem] max-w-[1280px] items-center justify-between px-5 md:px-8 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] shadow-[0_4px_14px_rgba(223,197,138,0.18)]">
              R
            </div>

            <div className="min-w-0 leading-none">
              <h1 className="truncate text-[1.375rem] font-semibold tracking-tight text-[#F5F5F5]">
                Rento
              </h1>

              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
                Rentals
              </p>
            </div>
          </div>

          <HeaderAuthButton />
        </div>
      </header>

      <HomeHero />

      <HomePageContent activeFilters={activeFilters}>
        <section
          id="home-properties"
          aria-labelledby="home-listings-heading"
          className="mx-auto max-w-[1280px] scroll-mt-20 px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-10"
        >
          <div className="mb-6 md:mb-8">
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
              Available now in Galați
            </p>

            <h2
              id="home-listings-heading"
              className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]"
            >
              Latest available rentals
            </h2>
          </div>

          {hasActiveFilters && (
            <div className="mb-6 flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-[#252525] px-3.5 py-2.5">
              <p className="min-w-0 text-sm leading-snug text-[#B8B8B8]">
                <span className="font-medium text-[#F5F5F5]">Filtered:</span>{" "}
                {activeFilterLabels.join(" · ")}
              </p>
              <Link
                href="/"
                className="shrink-0 text-sm font-medium text-[#DFC58A] underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
              >
                Clear all
              </Link>
            </div>
          )}

          {showFilteredEmptyState ? (
            <div className="flex flex-col items-center justify-center py-16 text-center md:py-20">
              <h3 className="mb-2 text-2xl font-bold text-[#F5F5F5]">
                No properties found
              </h3>

              <p className="max-w-xs text-[#B8B8B8]">
                Try changing filters or search another city
              </p>
            </div>
          ) : showPhotographedEmptyState ? (
            <PhotographedListingsEmptyState />
          ) : (
            <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {photographedProperties.map((property: Property) => (
                <li key={property.id} className="min-w-0">
                  <PropertyCard
                    id={property.id}
                    title={property.title}
                    price={property.price}
                    city={property.city}
                    rooms={property.rooms}
                    image_url={property.image_url}
                    images={property.images}
                    last_verified_at={property.last_verified_at}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </HomePageContent>
    </main>
  )
}
