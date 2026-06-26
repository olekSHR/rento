"use client"

import Link from "next/link"

type PropertyEmptyStateProps = {
  variant: "no-listings" | "no-results" | "no-filter-results"
  filterLabel?: string
  canCreateListing: boolean
}

export default function PropertyEmptyState({
  variant,
  filterLabel,
  canCreateListing,
}: PropertyEmptyStateProps) {
  if (variant === "no-listings") {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900">No listings yet</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Publish your first property to start managing rentals from this
          workspace.
        </p>

        <ol className="mt-5 space-y-3">
          {[
            "Complete your realtor profile",
            "Add photos to your listing",
            "Submit for admin review",
          ].map((step, index) => (
            <li
              key={step}
              className="flex gap-3 rounded-2xl bg-zinc-50 p-3 ring-1 ring-zinc-100"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-bold text-white">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-zinc-800">{step}</p>
            </li>
          ))}
        </ol>

        <Link
          href={
            canCreateListing
              ? "/realtor/properties/create"
              : "/realtor/profile"
          }
          className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-blue-700 text-sm font-bold text-white"
        >
          Create first property
        </Link>
      </div>
    )
  }

  if (variant === "no-results") {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
        <h3 className="text-base font-bold text-zinc-900">No matches found</h3>
        <p className="mt-2 text-sm text-zinc-500">
          Try a different search by title, city, or price.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
      <h3 className="text-base font-bold text-zinc-900">
        No {filterLabel?.toLowerCase()} listings
      </h3>
      <p className="mt-2 text-sm text-zinc-500">
        Switch to another filter or publish a new property.
      </p>
      <Link
        href="/realtor/properties/create"
        className="mt-5 inline-flex h-11 items-center justify-center rounded-2xl bg-zinc-900 px-5 text-sm font-bold text-white"
      >
        Add property
      </Link>
    </div>
  )
}
