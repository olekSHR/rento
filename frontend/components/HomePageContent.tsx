"use client"

import { useState } from "react"

import ConsumerShell from "./ConsumerShell"
import Modal from "./Modal"
import FiltersBar, { type FilterValues } from "./FiltersBar"

type Props = {
  children: React.ReactNode
  activeFilters?: FilterValues
}

export default function HomePageContent({ children, activeFilters }: Props) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  const hasActiveFilters = Boolean(
    activeFilters?.city?.trim() ||
      activeFilters?.min_price?.trim() ||
      activeFilters?.rooms?.trim()
  )

  return (
    <>
      <Modal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        labelledBy="home-filters-modal-title"
      >
        <h2
          id="home-filters-modal-title"
          className="mb-5 pr-12 text-xl font-semibold tracking-tight text-[#F5F5F5]"
        >
          Filters
        </h2>

        <FiltersBar
          key={`${activeFilters?.city ?? ""}:${activeFilters?.min_price ?? ""}:${activeFilters?.rooms ?? ""}`}
          initialValues={activeFilters}
          onSearch={() => setIsFiltersOpen(false)}
        />
      </Modal>

      <ConsumerShell
        hideBottomNav={isFiltersOpen}
        hasActiveFilters={hasActiveFilters}
        onOpenFilters={() => setIsFiltersOpen(true)}
      >
        {children}
      </ConsumerShell>
    </>
  )
}
