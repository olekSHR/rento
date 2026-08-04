"use client"

import Link from "next/link"

type PropertyEmptyStateProps = {
  variant:
    | "no-listings"
    | "no-results"
    | "no-filter-results"
    | "no-archived"
  filterLabel?: string
  canCreateListing: boolean
}

const cardClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5 md:p-6"

const primaryCtaClassName =
  "flex h-12 w-full items-center justify-center rounded-2xl bg-[#DFC58A] text-sm font-semibold text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"

export default function PropertyEmptyState({
  variant,
  filterLabel,
  canCreateListing,
}: PropertyEmptyStateProps) {
  if (variant === "no-listings") {
    return (
      <div role="status" className={cardClassName}>
        <h3 className="text-lg font-semibold text-[#F5F5F5]">No listings yet</h3>
        <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
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
              className="flex gap-3 rounded-2xl border border-white/8 bg-[#252525] p-3"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#DFC58A]/25 bg-[#2D2D2D] text-xs font-bold text-[#DFC58A]">
                {index + 1}
              </span>
              <p className="text-sm font-medium text-[#F5F5F5]">{step}</p>
            </li>
          ))}
        </ol>

        <Link
          href={
            canCreateListing
              ? "/realtor/properties/create"
              : "/realtor/profile"
          }
          className={`mt-6 ${primaryCtaClassName}`}
        >
          Create first property
        </Link>
      </div>
    )
  }

  if (variant === "no-results") {
    return (
      <div role="status" className={`${cardClassName} text-center`}>
        <h3 className="text-base font-semibold text-[#F5F5F5]">
          No matches found
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
          Try a different search by title, city, or price.
        </p>
      </div>
    )
  }

  if (variant === "no-archived") {
    return (
      <div role="status" className={`${cardClassName} text-center`}>
        <h3 className="text-base font-semibold text-[#F5F5F5]">
          No archived listings
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
          Archived listings will appear here after you archive them from your
          current listings.
        </p>
      </div>
    )
  }

  return (
    <div role="status" className={`${cardClassName} text-center`}>
      <h3 className="text-base font-semibold text-[#F5F5F5]">
        No {filterLabel?.toLowerCase()} listings
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">
        Switch to another filter or publish a new property.
      </p>
      <Link href="/realtor/properties/create" className={`mt-5 ${primaryCtaClassName}`}>
        Add property
      </Link>
    </div>
  )
}
