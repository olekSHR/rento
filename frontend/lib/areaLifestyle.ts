import type { NearbyInfrastructureItem } from "@/types/nearbyInfrastructure"

export const LIFESTYLE_CATEGORY_ORDER = [
  "park",
  "supermarket",
  "bus_stop",
  "hospital",
  "school",
] as const

export const LIFESTYLE_LABELS: Record<
  (typeof LIFESTYLE_CATEGORY_ORDER)[number],
  string
> = {
  park: "Park nearby",
  supermarket: "Grocery nearby",
  bus_stop: "Public transport nearby",
  hospital: "Healthcare nearby",
  school: "School nearby",
}

export type AreaLifestyleItem = {
  category: string
  label: string
}

export function buildAreaLifestyleItems(
  items: NearbyInfrastructureItem[]
): AreaLifestyleItem[] {
  const categories = new Set(items.map((item) => item.category))

  return LIFESTYLE_CATEGORY_ORDER.filter((category) =>
    categories.has(category)
  ).map((category) => ({
    category,
    label: LIFESTYLE_LABELS[category],
  }))
}
