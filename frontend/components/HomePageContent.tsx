"use client"

import { useState } from "react"

import Modal from "./Modal"
import FiltersBar from "./FiltersBar"

type Props = {
  children: React.ReactNode
}

export default function HomePageContent({
  children
}: Props) {

  const [isFiltersOpen, setIsFiltersOpen] =
    useState(false)

  return (

    <>

      <button
        onClick={() => setIsFiltersOpen(true)}
        className="
          fixed
          bottom-24
          right-5
          z-40
          w-16
          h-16
          rounded-full
          bg-black
          text-white
          text-2xl
          shadow-xl
          active:scale-90
          transition
          flex
          items-center
          justify-center
        "
      >
        ⚙️
      </button>

      <Modal
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
      >

        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">
          Filters
        </h2>

        <FiltersBar
  onSearch={() => setIsFiltersOpen(false)}
/>

      </Modal>

      {children}

    </>

  )
}