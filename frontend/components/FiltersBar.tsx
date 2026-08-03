"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export type FilterValues = {
  city?: string
  min_price?: string
  rooms?: string
}

type Props = {
  onSearch?: () => void
  initialValues?: FilterValues
}

const fieldClassName =
  "h-12 w-full rounded-xl border border-white/10 bg-[#1B1B1B] px-4 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8]/70 outline-none transition focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-1 focus-visible:ring-offset-[#252525]"

export default function FiltersBar({ onSearch, initialValues }: Props) {
  const [city, setCity] = useState(initialValues?.city ?? "")
  const [minPrice, setMinPrice] = useState(initialValues?.min_price ?? "")
  const [rooms, setRooms] = useState(initialValues?.rooms ?? "")

  const router = useRouter()

  function handleSearch(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    const params = new URLSearchParams()

    if (city.trim()) {
      params.set("city", city.trim())
    }

    if (minPrice.trim()) {
      params.set("min_price", minPrice.trim())
    }

    if (rooms.trim()) {
      params.set("rooms", rooms.trim())
    }

    const query = params.toString()
    router.push(query ? `/?${query}` : "/")
    onSearch?.()
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSearch}>
      <div className="space-y-2">
        <label htmlFor="filter-city" className="text-sm font-medium text-[#B8B8B8]">
          City
        </label>
        <input
          id="filter-city"
          type="text"
          placeholder="e.g. Bucharest"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          autoComplete="address-level2"
          className={fieldClassName}
        />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_7rem] gap-3">
        <div className="space-y-2">
          <label
            htmlFor="filter-min-price"
            className="text-sm font-medium text-[#B8B8B8]"
          >
            Min price
          </label>
          <input
            id="filter-min-price"
            type="number"
            min="1"
            placeholder="€"
            value={minPrice}
            onChange={(event) => setMinPrice(event.target.value)}
            inputMode="numeric"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="filter-rooms" className="text-sm font-medium text-[#B8B8B8]">
            Rooms
          </label>
          <input
            id="filter-rooms"
            type="number"
            min="1"
            placeholder="2"
            value={rooms}
            onChange={(event) => {
              const value = Number(event.target.value)

              if (value < 1 && event.target.value !== "") {
                setRooms("1")
                return
              }

              setRooms(event.target.value)
            }}
            inputMode="numeric"
            className={fieldClassName}
          />
        </div>
      </div>

      <button
        type="submit"
        className="h-12 rounded-xl bg-[#DFC58A] text-sm font-medium text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]"
      >
        Apply filters
      </button>
    </form>
  )
}
