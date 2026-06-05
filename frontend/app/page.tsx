import BottomNav from "@/components/BottomNav"
import HomePageContent from "@/components/HomePageContent"
import PropertyCard from "@/components/PropertyCard"
import { getProperties } from "@/services/api"
import type { Property } from "@/types/property"

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
    <main className="min-h-screen pb-24 bg-zinc-100">
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
        <div className="max-w-md mx-auto px-4 h-16 flex items-center">
          <h1 className="text-2xl font-bold text-black">
            Real Estate
          </h1>
        </div>
      </header>

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
          <HomePageContent>
            {properties.items.map((property: Property) => (
              <PropertyCard
                key={property.id}
                id={property.id}
                title={property.title}
                price={property.price}
                city={property.city}
                rooms={property.rooms}
                image_url={property.image_url}
              />
            ))}
          </HomePageContent>
        )}
      </div>

      <BottomNav />
    </main>
  )
}