"use client"

import { useEffect, useMemo, useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  Bus,
  GraduationCap,
  Hospital,
  ShoppingCart,
  Trees,
} from "lucide-react"

import { AreaLifestyleCard } from "@/components/nearby/AreaLifestyleCard"
import { buildAreaLifestyleItems } from "@/lib/areaLifestyle"
import { getPropertyNearby } from "@/services/api"
import type { NearbyInfrastructureItem } from "@/types/nearbyInfrastructure"

type NearbyInfrastructureSectionProps = {
  propertyId: number
}

const shellClassName =
  "rounded-[24px] border border-white/8 bg-[#2D2D2D] p-5"

const iconByCategory: Record<NearbyInfrastructureItem["category"], LucideIcon> =
  {
    supermarket: ShoppingCart,
    park: Trees,
    school: GraduationCap,
    hospital: Hospital,
    bus_stop: Bus,
  }

function NearbyRow({ item }: { item: NearbyInfrastructureItem }) {
  const Icon = iconByCategory[item.category] ?? ShoppingCart

  return (
    <li className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <div className="flex min-w-0 items-start gap-3">
        <Icon
          className="mt-0.5 h-4 w-4 shrink-0 text-[#DFC58A]"
          aria-hidden={true}
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#F5F5F5]">{item.label}</p>
          <p className="mt-0.5 truncate text-sm text-[#B8B8B8]">{item.name}</p>
        </div>
      </div>
      <p className="shrink-0 text-sm text-[#B8B8B8]">{item.distance_label}</p>
    </li>
  )
}

function LifestyleSkeleton() {
  return (
    <div className={`${shellClassName} mt-4 space-y-2.5`}>
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="h-5 animate-pulse rounded-lg bg-white/10 motion-reduce:animate-none"
        />
      ))}
    </div>
  )
}

function NearbySkeleton() {
  return (
    <div className={`${shellClassName} mt-4 space-y-3`}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-10 animate-pulse rounded-xl bg-white/10 motion-reduce:animate-none"
        />
      ))}
    </div>
  )
}

export default function NearbyInfrastructureSection({
  propertyId,
}: NearbyInfrastructureSectionProps) {
  const [items, setItems] = useState<NearbyInfrastructureItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const lifestyleItems = useMemo(
    () => buildAreaLifestyleItems(items),
    [items]
  )

  useEffect(() => {
    let cancelled = false

    async function loadNearby() {
      try {
        const data = await getPropertyNearby(propertyId)

        if (cancelled) {
          return
        }

        if (data.available && data.items.length > 0) {
          setItems(data.items)
          setIsVisible(true)
        } else {
          setItems([])
          setIsVisible(false)
        }
      } catch {
        if (!cancelled) {
          setItems([])
          setIsVisible(false)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadNearby()

    return () => {
      cancelled = true
    }
  }, [propertyId])

  if (!isLoading && !isVisible) {
    return null
  }

  return (
    <>
      <section
        aria-labelledby="property-area-lifestyle-heading"
        className="mt-8"
      >
        <h2
          id="property-area-lifestyle-heading"
          className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
        >
          Area at a glance
        </h2>

        {isLoading ? (
          <div role="status" aria-live="polite">
            <span className="sr-only">Loading area summary</span>
            <LifestyleSkeleton />
          </div>
        ) : (
          <AreaLifestyleCard items={lifestyleItems} />
        )}
      </section>

      <section aria-labelledby="property-nearby-heading" className="mt-6">
        <h2
          id="property-nearby-heading"
          className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
        >
          Nearby
        </h2>

        {isLoading ? (
          <div role="status" aria-live="polite">
            <span className="sr-only">Loading nearby places</span>
            <NearbySkeleton />
          </div>
        ) : (
          <div className={`${shellClassName} mt-4`}>
            <ul className="divide-y divide-white/8">
              {items.map((item) => (
                <NearbyRow key={item.category} item={item} />
              ))}
            </ul>
            <p className="mt-4 text-[11px] leading-relaxed text-[#B8B8B8]">
              Straight-line distances from the approximate map point. Data from
              OpenStreetMap contributors.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
