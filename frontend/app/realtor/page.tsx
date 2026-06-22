"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"

import { useAuth } from "@/context/AuthContext"
import { getToken } from "@/lib/tokenStorage"
import {
  getMyRealtorProfile,
  getMyRealtorProperties,
  type RealtorProfile,
} from "@/services/api"
import type { Property } from "@/types/property"

export default function RealtorDashboardPage() {
  const { isLoading, isAuthenticated, user } = useAuth()

  const [properties, setProperties] = useState<Property[]>([])
  const [profile, setProfile] = useState<RealtorProfile | null>(null)
  const [isDataLoading, setIsDataLoading] = useState(false)
  const [error, setError] = useState("")

  const isRealtor = user?.role === "realtor"

  useEffect(() => {
    async function loadProperties() {
      try {
        const token = getToken()

        if (!token) {
          setIsDataLoading(false)
          return
        }

  const [propertiesData, profileData] = await Promise.all([
    getMyRealtorProperties(token),
    getMyRealtorProfile(token),
  ])

  setProperties(propertiesData.items || [])
  setProfile(profileData)

      } catch {
        setError("Failed to load your properties")
      } finally {
        setIsDataLoading(false)
      }
    }
 
      if (!isLoading && isAuthenticated && isRealtor) {
        loadProperties()
      }
  }, [isLoading, isAuthenticated, isRealtor])

  const stats = useMemo(() => {
    return {
      pending: properties.filter((property) => property.status === "pending").length,
      available: properties.filter((property) => property.status === "available").length,
      archived: properties.filter((property) => property.status === "archived").length,
    }
  }, [properties])

  if (isLoading || isDataLoading) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md">
          <div className="h-8 w-40 rounded-2xl bg-zinc-200" />
          <div className="mt-6 h-28 rounded-3xl bg-zinc-200" />
          <div className="mt-4 h-40 rounded-3xl bg-zinc-200" />
        </div>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Login required</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Please login to access your realtor dashboard.
          </p>

          <Link
            href="/login"
            className="mt-6 flex h-12 items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
          >
            Go to login
          </Link>
        </div>
      </main>
    )
  }

  if (!isRealtor) {
    return (
      <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Access denied</h1>
          <p className="mt-2 text-sm text-zinc-500">
            This page is available only for realtor accounts.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-zinc-100 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md">
        <header>
          <p className="text-sm font-semibold text-blue-700">
            Realtor Dashboard
          </p>

          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-zinc-900">
            My Properties
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Manage your own rental listings from one mobile-first workspace.
          </p>
        </header>

        <Link
          href="/realtor/profile"
          className={`
          mt-6
          flex
          h-12
          items-center
          justify-center
          rounded-2xl
          border
          text-sm
          font-bold
          ${
            profile?.is_completed
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
          }
        `}
       >
  {profile?.is_completed
    ? "Profile Complete ✓"
    : "Complete Realtor Profile"}
</Link>

        <section className="mt-6 grid grid-cols-3 gap-3">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-2xl font-extrabold text-zinc-900">
              {stats.pending}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              Pending
            </p>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-2xl font-extrabold text-zinc-900">
              {stats.available}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              Available
            </p>
          </div>

          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-2xl font-extrabold text-zinc-900">
              {stats.archived}
            </p>
            <p className="mt-1 text-xs font-semibold text-zinc-500">
              Archived
            </p>
          </div>
        </section>

        <Link
          href="/realtor/properties/create"
          className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white active:scale-[0.98]"
        >
          + Create Property
        </Link>

        {error && (
          <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        <section className="mt-6 space-y-4">
          {properties.length === 0 ? (
            <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
              <h2 className="text-lg font-bold text-zinc-900">
                No properties yet
              </h2>
              <p className="mt-2 text-sm text-zinc-500">
                Your listings will appear here after creation.
              </p>
            </div>
          ) : (
            properties.map((property) => (
              <article
                key={property.id}
                className="rounded-3xl bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-zinc-900">
                      {property.title}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {property.city || "No city"} · {property.rooms || 0} rooms
                    </p>
                  </div>

                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-600">
                    {property.status}
                  </span>
                </div>

                <p className="mt-4 text-2xl font-extrabold text-zinc-900">
                  €{property.price || 0}
                </p>
              </article>
            ))
          )}
        </section>
      </div>
    </main>
  )
}
