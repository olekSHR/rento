import Link from "next/link"

import HomeHero from "@/components/HomeHero"
import HomePageContent from "@/components/HomePageContent"
import PropertyCard from "@/components/PropertyCard"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { getProperties } from "@/services/api"
import type { Property } from "@/types/property"
import HeaderAuthButton from "@/components/HeaderAuthButton"

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

  return (
    <main className={`min-h-screen bg-[#1B1B1B] ${BOTTOM_NAV_CONTENT_CLASS}`}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#252525]/95 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-[4rem] max-w-md items-center justify-between px-5">
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
        <div
          id="home-properties"
          className="mx-auto max-w-md scroll-mt-20 px-5 pb-6 pt-8"
        >
          {hasActiveFilters && (
            <div className="mb-5 flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-[#252525] px-3.5 py-2.5">
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

          {properties.items.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-20
                text-center
              "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  text-[#F5F5F5]
                  mb-2
                "
              >
                No properties found
              </h2>

              <p
                className="
                  text-[#B8B8B8]
                  max-w-xs
                "
              >
                Try changing filters or search another city
              </p>
            </div>
          ) : (
            properties.items.map((property: Property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                city={property.city}
                rooms={property.rooms}
                image_url={property.image_url}
                images={property.images}
                last_verified_at={property.last_verified_at}
              />
            ))
          )}
        </div>
      </HomePageContent>
    </main>
  )
}
