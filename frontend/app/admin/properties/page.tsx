"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"

import AdminPropertyModerationCard from "@/components/admin/AdminPropertyModerationCard"
import AdminPageShell from "@/components/admin/AdminPageShell"
import AdminRoute from "@/components/AdminRoute"
import {
  activateProperty,
  archiveProperty,
  deleteProperty,
  getAdminProperties,
  verifyProperty,
} from "@/services/api"
import type { Property } from "@/types/property"

type StatusFilter = "all" | "active" | "pending" | "archived"

type ModerationAction = "verify" | "archive" | "activate" | "delete"

type BusyState = {
  propertyId: number
  action: ModerationAction
}

const ACTIVE_PROPERTY_STATUSES: Property["status"][] = [
  "available",
  "reserved",
  "rented",
]

const FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "archived", label: "Archived" },
]

const filterButtonClassName =
  "inline-flex h-11 shrink-0 items-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"

function getFilterButtonClassName(isActive: boolean): string {
  if (isActive) {
    return `${filterButtonClassName} bg-[#2D2D2D] text-[#DFC58A] underline decoration-[#DFC58A] decoration-2 underline-offset-4`
  }

  return `${filterButtonClassName} border border-white/10 bg-[#252525] text-[#B8B8B8] hover:text-[#F5F5F5]`
}

function PropertiesSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <span className="sr-only">Loading property moderation queue</span>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D]"
        >
          <div className="h-44 animate-pulse bg-[#252525] motion-reduce:animate-none" />
          <div className="space-y-3 p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div className="h-4 w-1/2 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
            <div className="h-10 animate-pulse rounded-2xl bg-white/10 motion-reduce:animate-none" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [filter, setFilter] = useState<StatusFilter>("all")
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState("")
  const [reloadKey, setReloadKey] = useState(0)
  const [busyState, setBusyState] = useState<BusyState | null>(null)
  const [cardErrors, setCardErrors] = useState<Record<number, string>>({})
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadProperties() {
      try {
        const data = await getAdminProperties()

        if (!isMounted) {
          return
        }

        setProperties(data.items || [])
        setLoadError("")
      } catch (error) {
        if (!isMounted) {
          return
        }

        setProperties([])
        setLoadError(
          error instanceof Error
            ? error.message
            : "Failed to fetch admin properties"
        )
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    void loadProperties()

    return () => {
      isMounted = false
    }
  }, [reloadKey])

  function handleRetryLoad() {
    setIsLoading(true)
    setReloadKey((current) => current + 1)
  }

  const pendingCount = useMemo(
    () => properties.filter((property) => property.status === "pending").length,
    [properties]
  )

  const filteredProperties = useMemo(() => {
    if (filter === "all") {
      return properties
    }

    if (filter === "pending") {
      return properties.filter((property) => property.status === "pending")
    }

    if (filter === "archived") {
      return properties.filter((property) => property.status === "archived")
    }

    return properties.filter((property) =>
      ACTIVE_PROPERTY_STATUSES.includes(property.status)
    )
  }, [filter, properties])

  function clearCardError(propertyId: number) {
    setCardErrors((previous) => {
      if (!previous[propertyId]) {
        return previous
      }

      const next = { ...previous }
      delete next[propertyId]
      return next
    })
  }

  function setCardError(propertyId: number, message: string) {
    setCardErrors((previous) => ({
      ...previous,
      [propertyId]: message,
    }))
  }

  async function handleVerify(id: number) {
    clearCardError(id)
    setBusyState({ propertyId: id, action: "verify" })

    try {
      const updatedProperty = await verifyProperty(id)

      setProperties((previous) =>
        previous.map((property) =>
          property.id === id
            ? {
                ...property,
                status: updatedProperty.status,
                last_verified_at: updatedProperty.last_verified_at,
              }
            : property
        )
      )
    } catch (error) {
      setCardError(
        id,
        error instanceof Error
          ? error.message
          : "Failed to verify property"
      )
    } finally {
      setBusyState(null)
    }
  }

  async function handleArchive(id: number) {
    clearCardError(id)
    setBusyState({ propertyId: id, action: "archive" })

    try {
      const updatedProperty = await archiveProperty(id)

      setProperties((previous) =>
        previous.map((property) =>
          property.id === id
            ? {
                ...property,
                status: updatedProperty.status,
                last_verified_at: updatedProperty.last_verified_at,
              }
            : property
        )
      )
    } catch (error) {
      setCardError(
        id,
        error instanceof Error
          ? error.message
          : "Failed to update property status"
      )
    } finally {
      setBusyState(null)
    }
  }

  async function handleActivate(id: number) {
    clearCardError(id)
    setBusyState({ propertyId: id, action: "activate" })

    try {
      const updatedProperty = await activateProperty(id)

      setProperties((previous) =>
        previous.map((property) =>
          property.id === id
            ? {
                ...property,
                status: updatedProperty.status,
                last_verified_at: updatedProperty.last_verified_at,
              }
            : property
        )
      )
    } catch (error) {
      setCardError(
        id,
        error instanceof Error
          ? error.message
          : "Failed to update property status"
      )
    } finally {
      setBusyState(null)
    }
  }

  function handleDeleteClick(id: number) {
    clearCardError(id)
    setPendingDeleteId(id)
  }

  function handleDeleteCancel() {
    setPendingDeleteId(null)
  }

  async function handleDeleteConfirm(id: number) {
    clearCardError(id)
    setBusyState({ propertyId: id, action: "delete" })

    try {
      await deleteProperty(id)

      setProperties((previous) =>
        previous.filter((property) => property.id !== id)
      )
      setPendingDeleteId(null)
    } catch (error) {
      setCardError(
        id,
        error instanceof Error
          ? error.message
          : "Failed to delete property"
      )
    } finally {
      setBusyState(null)
    }
  }

  return (
    <AdminRoute>
      <AdminPageShell>
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-[#F5F5F5] md:text-3xl">
              Property Moderation
            </h1>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              Review listings, approve pending submissions, and manage
              marketplace availability.
            </p>
            {!isLoading && !loadError && (
              <p className="mt-3 text-sm text-[#F5F5F5]">
                <span className="font-semibold text-[#DFC58A]">
                  {pendingCount.toLocaleString()}
                </span>{" "}
                {pendingCount === 1
                  ? "listing awaiting review"
                  : "listings awaiting review"}
              </p>
            )}
          </div>

          <Link
            href="/admin/properties/create"
            className="inline-flex h-11 shrink-0 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
          >
            Add listing
          </Link>
        </header>

        <section aria-label="Status filters">
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#B8B8B8]">
            Status
          </p>
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {FILTER_OPTIONS.map((option) => {
              const isActive = filter === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setFilter(option.value)}
                  className={getFilterButtonClassName(isActive)}
                >
                  {option.label}
                  {option.value === "pending" && pendingCount > 0
                    ? ` (${pendingCount})`
                    : ""}
                </button>
              )
            })}
          </div>
        </section>

        {isLoading ? (
          <PropertiesSkeleton />
        ) : loadError ? (
          <section
            role="alert"
            className="rounded-[24px] border border-red-400/20 bg-red-950/30 p-5"
          >
            <h2 className="text-base font-semibold text-[#F5F5F5]">
              Unable to load properties
            </h2>
            <p className="mt-2 text-sm text-red-100">{loadError}</p>
            <button
              type="button"
              onClick={handleRetryLoad}
              className="mt-4 inline-flex h-11 items-center rounded-2xl bg-[#DFC58A] px-4 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1B1B]"
            >
              Retry
            </button>
          </section>
        ) : properties.length === 0 ? (
          <section className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 text-center">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">
              No properties yet
            </h2>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              Create the first listing to start filling the marketplace.
            </p>
            <Link
              href="/admin/properties/create"
              className="mt-6 inline-flex h-11 items-center rounded-2xl bg-[#DFC58A] px-5 text-sm font-semibold text-[#1B1B1B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
            >
              Add listing
            </Link>
          </section>
        ) : filteredProperties.length === 0 ? (
          <section className="rounded-[24px] border border-white/8 bg-[#2D2D2D] p-6 text-center">
            <h2 className="text-lg font-semibold text-[#F5F5F5]">
              No listings match this filter
            </h2>
            <p className="mt-2 text-sm text-[#B8B8B8]">
              Try another status filter to view different listings.
            </p>
          </section>
        ) : (
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filteredProperties.map((property) => {
              const isBusy = busyState?.propertyId === property.id
              const busyAction = isBusy ? busyState.action : null

              return (
                <li key={property.id}>
                  <AdminPropertyModerationCard
                    property={property}
                    isBusy={isBusy}
                    busyAction={busyAction}
                    errorMessage={cardErrors[property.id]}
                    showDeleteConfirm={pendingDeleteId === property.id}
                    onVerify={() => void handleVerify(property.id)}
                    onArchive={() => void handleArchive(property.id)}
                    onActivate={() => void handleActivate(property.id)}
                    onDeleteClick={() => handleDeleteClick(property.id)}
                    onDeleteConfirm={() =>
                      void handleDeleteConfirm(property.id)
                    }
                    onDeleteCancel={handleDeleteCancel}
                  />
                </li>
              )
            })}
          </ul>
        )}
      </AdminPageShell>
    </AdminRoute>
  )
}
