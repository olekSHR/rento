"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import ConsumerShell from "@/components/ConsumerShell"
import PropertyCard from "@/components/PropertyCard"
import ProtectedRoute from "@/components/ProtectedRoute"
import { BOTTOM_NAV_CONTENT_CLASS } from "@/lib/bottomNavLayout"
import { useFavorites } from "@/context/FavoritesContext"
import { getPropertyById } from "@/services/api"
import type { Property } from "@/types/property"

function FavoritesHeader() {
  return (
    <header className="mb-6 md:mb-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#B8B8B8]">
        Saved homes
      </p>

      <h1 className="mt-2 text-[1.625rem] font-semibold tracking-tight text-[#F5F5F5] md:text-[1.875rem]">
        Favorites
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#B8B8B8]">
        Keep the properties you want to review in one place.
      </p>
    </header>
  )
}

function FavoritesHeaderSkeleton() {
  return (
    <header aria-hidden="true" className="mb-6 md:mb-8">
      <div className="h-3 w-24 animate-pulse rounded-md bg-white/10 motion-reduce:animate-none" />
      <div className="mt-3 h-8 w-40 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
      <div className="mt-3 h-4 w-full max-w-md animate-pulse rounded-md bg-white/5 motion-reduce:animate-none" />
    </header>
  )
}

function FavoritesSkeletonGrid() {
  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} aria-hidden="true" className="min-w-0">
          <div className="overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D]">
            <div className="h-60 animate-pulse bg-white/5 motion-reduce:animate-none" />

            <div className="px-5 pb-5 pt-4">
              <div className="mb-3 h-5 w-4/5 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
              <div className="mb-4 h-4 w-32 animate-pulse rounded-lg bg-white/5 motion-reduce:animate-none" />

              <div className="flex items-end justify-between gap-4">
                <div className="space-y-2">
                  <div className="h-3 w-16 animate-pulse rounded bg-white/5 motion-reduce:animate-none" />
                  <div className="h-7 w-24 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none" />
                </div>
                <div className="h-10 w-24 animate-pulse rounded-xl bg-[#252525] ring-1 ring-white/10 motion-reduce:animate-none" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

function FavoritesEmptyState() {
  return (
    <div
      role="status"
      className="rounded-[24px] border border-white/8 bg-[#252525] px-6 py-12 text-center"
    >
      <h2 className="text-xl font-semibold tracking-tight text-[#F5F5F5]">
        No saved properties yet
      </h2>

      <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[#B8B8B8]">
        Save a rental to review it here later.
      </p>

      <Link
        href="/"
        className="mt-6 inline-flex h-11 min-w-[9.5rem] items-center justify-center rounded-full bg-[#DFC58A] px-6 text-sm font-semibold text-[#1B1B1B] transition hover:bg-[#e8d099] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
      >
        Browse listings
      </Link>
    </div>
  )
}

function FavoritesPartialWarning({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="mb-6 rounded-[24px] border border-[#DFC58A]/20 bg-[#2D2D2D] px-5 py-4 text-sm font-medium leading-relaxed text-[#F5F5F5]"
    >
      {message}
    </div>
  )
}

export default function FavoritesPage() {
  const { favorites, isLoading: favoritesLoading } = useFavorites()

  const [properties, setProperties] = useState<Property[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [partialWarning, setPartialWarning] = useState<string | null>(
    null
  )
  const initialLoadDoneRef = useRef(false)

  useEffect(() => {
    if (favoritesLoading) {
      return
    }

    let cancelled = false

    async function loadInitialProperties() {
      setIsInitialLoading(true)
      setError(null)
      setPartialWarning(null)

      if (favorites.length === 0) {
        setProperties([])
        initialLoadDoneRef.current = true
        setIsInitialLoading(false)
        return
      }

      try {
        const results = await Promise.allSettled(
          favorites.map((id) => getPropertyById(id))
        )

        if (cancelled) {
          return
        }

        const validProperties = results
          .filter(
            (result): result is PromiseFulfilledResult<Property> =>
              result.status === "fulfilled"
          )
          .map((result) => result.value)

        const failedCount = results.filter(
          (result) => result.status === "rejected"
        ).length

        setProperties(validProperties)

        if (failedCount > 0) {
          setPartialWarning(
            failedCount === 1
              ? "One saved property could not be loaded."
              : `${failedCount} saved properties could not be loaded.`
          )
        }
      } catch (loadError) {
        console.error(loadError)

        if (!cancelled) {
          setError("Failed to load saved properties.")
          setProperties([])
        }
      } finally {
        if (!cancelled) {
          initialLoadDoneRef.current = true
          setIsInitialLoading(false)
        }
      }
    }

    async function syncIncrementalProperties() {
      if (favorites.length === 0) {
        setProperties([])
        setPartialWarning(null)
        return
      }

      setProperties((prev) => {
        const filtered = prev.filter((property) =>
          favorites.includes(property.id)
        )
        const knownIds = new Set(filtered.map((property) => property.id))
        const missingIds = favorites.filter((id) => !knownIds.has(id))

        if (missingIds.length > 0) {
          void (async () => {
            const results = await Promise.allSettled(
              missingIds.map((id) => getPropertyById(id))
            )

            if (cancelled) {
              return
            }

            const validProperties = results
              .filter(
                (result): result is PromiseFulfilledResult<Property> =>
                  result.status === "fulfilled"
              )
              .map((result) => result.value)

            const failedCount = results.filter(
              (result) => result.status === "rejected"
            ).length

            if (validProperties.length > 0) {
              setProperties((current) => {
                const currentIds = new Set(
                  current.map((property) => property.id)
                )
                const additions = validProperties.filter(
                  (property) => !currentIds.has(property.id)
                )

                return additions.length > 0
                  ? [...current, ...additions]
                  : current
              })
            }

            if (failedCount > 0) {
              setPartialWarning(
                failedCount === 1
                  ? "One saved property could not be loaded."
                  : `${failedCount} saved properties could not be loaded.`
              )
            }
          })()
        }

        return filtered
      })
    }

    if (!initialLoadDoneRef.current) {
      void loadInitialProperties()
    } else {
      void syncIncrementalProperties()
    }

    return () => {
      cancelled = true
    }
  }, [favorites, favoritesLoading])

  const showInitialSkeleton = favoritesLoading || isInitialLoading

  return (
    <ProtectedRoute>
      <ConsumerShell>
        <main
          className={`min-h-screen bg-[#1B1B1B] text-[#F5F5F5] ${BOTTOM_NAV_CONTENT_CLASS}`}
        >
          <div className="mx-auto max-w-[1280px] px-5 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8 lg:px-10">
            {showInitialSkeleton ? (
              <div role="status" aria-live="polite">
                <span className="sr-only">Loading saved properties</span>
                <FavoritesHeaderSkeleton />
                <FavoritesSkeletonGrid />
              </div>
            ) : (
              <>
                <FavoritesHeader />

                {error && (
                  <div
                    role="alert"
                    className="mb-6 rounded-[24px] border border-red-400/20 bg-[#252525] px-5 py-4 text-sm font-medium text-[#F5F5F5]"
                  >
                    {error}
                  </div>
                )}

                {partialWarning && !error ? (
                  <FavoritesPartialWarning message={partialWarning} />
                ) : null}

                {!error && properties.length === 0 && <FavoritesEmptyState />}

                {properties.length > 0 && (
                  <section aria-labelledby="favorites-list-heading">
                    <h2 id="favorites-list-heading" className="sr-only">
                      Saved property listings
                    </h2>

                    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {properties.map((property) => (
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
                            contact_name={property.contact_name}
                            avatar_url={property.avatar_url}
                          />
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </>
            )}
          </div>
        </main>
      </ConsumerShell>
    </ProtectedRoute>
  )
}
