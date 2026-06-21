"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"


type Props = {
  onSearch?: () => void
}

export default function FiltersBar({
  onSearch
}: Props) {

  const [city, setCity] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [rooms, setRooms] = useState("")

  const router = useRouter()

  function handleSearch() {

  const params = new URLSearchParams()

  if (city) {
    params.set("city", city)
  }

  if (minPrice) {
    params.set("min_price", minPrice)
  }

  if (rooms) {
    params.set("rooms", rooms)
  }

  router.push(`/?${params.toString()}`)
   onSearch?.()
}

  return (

    <div
      className="
        sticky
        top-16
        z-40
        bg-zinc-100
        pb-3
      "
    >

      <div
        className="
          bg-white
          rounded-2xl
          p-4
          shadow-sm
          mb-4
        "
      >

        <div className="flex flex-col gap-3">

          <input
            type="text"
            placeholder="Search city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="
              h-12
              px-4
              rounded-xl
              border
              border-zinc-200
              outline-none
              focus:border-black
            "
          />

          <div className="grid grid-cols-[minmax(0,1fr)_7rem] gap-3">

            <input
              type="number"
              min="1"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="
                min-w-0
                w-full
                h-12
                px-4
                rounded-xl
                border
                border-zinc-200
                outline-none
                focus:border-black
              "
            />

            <input
              type="number"
              placeholder="Rooms"
              value={rooms}
              onChange={(e) => {
  const value = Number(e.target.value)

  if (value < 1 && e.target.value !== "") {
    setRooms("1")
    return
  }

  setRooms(e.target.value)
}}
              className="
                w-full
                min-w-0
                h-12
                px-4
                rounded-xl
                border
                border-zinc-200
                outline-none
                focus:border-black
              "
            />

          </div>

          <button
            onClick={handleSearch}
            className="
              h-12
              rounded-xl
              bg-black
              text-white
              font-medium
              active:scale-[0.98]
              transition-transform
            "
          >
            Search
          </button>

        </div>

      </div>

    </div>
  )
}
