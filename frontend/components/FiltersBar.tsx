"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export type FilterValues = {
  city?: string
  min_price?: string
  max_price?: string
  rooms?: string
}

type Props = {
  onSearch?: () => void
  initialValues?: FilterValues
}

const fieldClassName =
  "h-12 w-full rounded-xl border border-white/10 bg-[#1B1B1B] px-4 text-sm text-[#F5F5F5] placeholder:text-[#B8B8B8]/70 outline-none transition focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-1 focus-visible:ring-offset-[#252525]"

const primaryButtonClassName =
  "h-12 rounded-xl bg-[#DFC58A] text-sm font-medium text-[#1B1B1B] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525] disabled:cursor-not-allowed disabled:opacity-70"

const secondaryButtonClassName =
  "h-12 rounded-xl border border-white/10 bg-transparent text-sm font-medium text-[#B8B8B8] transition active:scale-[0.98] hover:border-white/15 hover:text-[#F5F5F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525] disabled:cursor-not-allowed disabled:opacity-60"

const priceRangeErrorClassName =
  "rounded-xl border border-red-400/15 bg-[#2A2222] px-3 py-2.5 text-sm leading-relaxed text-red-100/90"

export const INVERTED_PRICE_RANGE_MESSAGE =
  "Minimum price cannot be greater than maximum price."

function parsePositivePrice(value: string): number | null {
  const trimmed = value.trim()

  if (!trimmed) {
    return null
  }

  const parsed = Number(trimmed)

  if (!Number.isInteger(parsed) || parsed < 1) {
    return null
  }

  return parsed
}

function hasInvertedPriceRange(minPrice: string, maxPrice: string): boolean {
  const min = parsePositivePrice(minPrice)
  const max = parsePositivePrice(maxPrice)

  return min !== null && max !== null && min > max
}

export default function FiltersBar({ onSearch, initialValues }: Props) {
  const [city, setCity] = useState(initialValues?.city ?? "")
  const [minPrice, setMinPrice] = useState(initialValues?.min_price ?? "")
  const [maxPrice, setMaxPrice] = useState(initialValues?.max_price ?? "")
  const [rooms, setRooms] = useState(initialValues?.rooms ?? "")
  const [priceRangeError, setPriceRangeError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const shouldCloseAfterTransitionRef = useRef(false)

  const router = useRouter()

  useEffect(() => {
    if (shouldCloseAfterTransitionRef.current && !isPending) {
      shouldCloseAfterTransitionRef.current = false
      onSearch?.()
    }
  }, [isPending, onSearch])

  function handleSearch(event?: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault()

    if (isPending) {
      return
    }

    if (hasInvertedPriceRange(minPrice, maxPrice)) {
      setPriceRangeError(INVERTED_PRICE_RANGE_MESSAGE)
      return
    }

    setPriceRangeError(null)

    const params = new URLSearchParams()

    if (city.trim()) {
      params.set("city", city.trim())
    }

    if (minPrice.trim()) {
      params.set("min_price", minPrice.trim())
    }

    if (maxPrice.trim()) {
      params.set("max_price", maxPrice.trim())
    }

    if (rooms.trim()) {
      params.set("rooms", rooms.trim())
    }

    const query = params.toString()

    shouldCloseAfterTransitionRef.current = true
    startTransition(() => {
      router.push(query ? `/?${query}` : "/")
    })
  }

  function handleClear() {
    if (isPending) {
      return
    }

    setCity("")
    setMinPrice("")
    setMaxPrice("")
    setRooms("")
    setPriceRangeError(null)

    shouldCloseAfterTransitionRef.current = true
    startTransition(() => {
      router.push("/")
    })
  }

  const hasAppliedFilters = Boolean(
    initialValues?.city?.trim() ||
      initialValues?.min_price?.trim() ||
      initialValues?.max_price?.trim() ||
      initialValues?.rooms?.trim()
  )
  const hasFormValues = Boolean(
    city.trim() || minPrice.trim() || maxPrice.trim() || rooms.trim()
  )
  const canClear = hasFormValues || hasAppliedFilters
  const hasPriceRangeError = Boolean(priceRangeError)

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSearch}>
      <div className="space-y-2">
        <label htmlFor="filter-city" className="text-sm font-medium text-[#B8B8B8]">
          City
        </label>
        <input
          id="filter-city"
          type="text"
          placeholder="e.g. Galați"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          autoComplete="address-level2"
          disabled={isPending}
          className={fieldClassName}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
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
            onChange={(event) => {
              setMinPrice(event.target.value)
              if (priceRangeError) {
                setPriceRangeError(null)
              }
            }}
            inputMode="numeric"
            disabled={isPending}
            aria-invalid={hasPriceRangeError}
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="filter-max-price"
            className="text-sm font-medium text-[#B8B8B8]"
          >
            Max price
          </label>
          <input
            id="filter-max-price"
            type="number"
            min="1"
            placeholder="€"
            value={maxPrice}
            onChange={(event) => {
              setMaxPrice(event.target.value)
              if (priceRangeError) {
                setPriceRangeError(null)
              }
            }}
            inputMode="numeric"
            disabled={isPending}
            aria-invalid={hasPriceRangeError}
            className={fieldClassName}
          />
        </div>
      </div>

      {priceRangeError ? (
        <p role="alert" className={priceRangeErrorClassName}>
          {priceRangeError}
        </p>
      ) : null}

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
          disabled={isPending}
          className={fieldClassName}
        />
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={primaryButtonClassName}
        >
          {isPending ? "Applying…" : "Apply filters"}
        </button>

        <button
          type="button"
          onClick={handleClear}
          disabled={isPending || !canClear}
          className={secondaryButtonClassName}
        >
          Clear filters
        </button>
      </div>
    </form>
  )
}
