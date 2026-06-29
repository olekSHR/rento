"use client"

import { useEffect, useState } from "react"

import ConsumerShell from "@/components/ConsumerShell"
import PropertyCard from "@/components/PropertyCard"
import ProtectedRoute from "@/components/ProtectedRoute"
import EmptyState from "@/components/ui/EmptyState"
import PageShell from "@/components/ui/PageShell"
import PrimaryButton from "@/components/ui/PrimaryButton"
import { useFavorites } from "@/context/FavoritesContext"
import { getPropertyById } from "@/services/api"
import type { Property } from "@/types/property"

function FavoritesHeader() {
  return (
    <header>
      <h1 className="text-2xl font-extrabold tracking-tight text-zinc-950">
        Favorites
      </h1>
      <p className="mt-2 text-sm text-zinc-500">
        All saved properties appear here.
      </p>
    </header>
  )
}

function FavoritesSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
      <div className="h-64 animate-pulse rounded-3xl bg-zinc-200" />
    </div>
  )
}

export default function FavoritesPage() {
  const { favorites, isLoading: favoritesLoading } = useFavorites()

  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadProperties() {
      try {
        setIsLoading(true)
        setError(null)

        if (favorites.length === 0) {
          setProperties([])
          return
        }

        const results = await Promise.allSettled(
          favorites.map((id) => getPropertyById(id))
        )

        const validProperties = results
          .filter(
            (result): result is PromiseFulfilledResult<Property> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value)

        setProperties(validProperties)
      } catch (loadError) {
        console.error(loadError)

        setError("Failed to load saved properties.")

        setProperties([])
      } finally {
        setIsLoading(false)
      }
    }

    if (!favoritesLoading) {
      loadProperties()
    }
  }, [favorites, favoritesLoading])

  const isPageLoading = favoritesLoading || isLoading

  return (
    <ProtectedRoute>
      <ConsumerShell>
      <PageShell>
        <FavoritesHeader />

        {isPageLoading ? (
          <FavoritesSkeleton />
        ) : (
          <>
            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            {!error && properties.length === 0 && (
              <EmptyState
                title="No saved properties yet"
                description="Tap the heart on listings to save them here."
                action={
                  <PrimaryButton href="/">Browse listings</PrimaryButton>
                }
              />
            )}

            {properties.length > 0 && (
              <section className="space-y-4">
                {properties.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </section>
            )}
          </>
        )}
      </PageShell>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
