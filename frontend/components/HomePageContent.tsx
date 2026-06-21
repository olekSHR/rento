"use client"

import { useState } from "react"

import BottomNav from "./BottomNav"
import Modal from "./Modal"
import FiltersBar from "./FiltersBar"

type Props = {
  children: React.ReactNode
}

export default function HomePageContent({ children }: Props) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      >
        <h2 className="mb-5 text-2xl font-bold">
          Filters
        </h2>

        <FiltersBar onSearch={() => setIsFiltersOpen(false)} />
      </Modal>

      {children}

      <BottomNav onOpenFilters={() => setIsFiltersOpen(true)} />
    </>
  )
}
