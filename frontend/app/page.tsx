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

  return (
    <main className={`min-h-screen bg-zinc-100 ${BOTTOM_NAV_CONTENT_CLASS}`}>
      <header
        className="
          sticky
          top-0
          z-50
          backdrop-blur-md
          bg-white/80
          border-b
          border-zinc-200
        "
      >
                <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
  <div
    className="
      flex
      h-10
      w-10
      items-center
      justify-center
      rounded-2xl
      bg-blue-700
      text-lg
      font-black
      text-white
      shadow-[0_10px_25px_rgba(29,78,216,0.28)]
    "
  >
    R
  </div>

  <div className="leading-none">
    <h1
      className="
        text-3xl
        font-black
        tracking-[-0.04em]
        text-zinc-950
      "
    >
      Rento
    </h1>

    <p
      className="
        mt-1
        text-[11px]
        font-semibold
        uppercase
        tracking-[0.18em]
        text-zinc-400
      "
    >
      Rentals
    </p>
  </div>
</div>

         <HeaderAuthButton />
        </div>
      </header>

      <HomePageContent>
        <div className="max-w-md mx-auto p-4 pt-6">
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
              <div className="text-6xl mb-4">
                🏠
              </div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-black
                  mb-2
                "
              >
                No properties found
              </h2>

              <p
                className="
                  text-zinc-500
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
