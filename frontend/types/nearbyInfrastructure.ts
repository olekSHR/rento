export type NearbyInfrastructureItem = {
  category: string
  label: string
  name: string
  distance_m: number
  distance_label: string
}

export type NearbyInfrastructureResponse = {
  property_id: number
  available: boolean
  source: string
  fetched_at: string | null
  items: NearbyInfrastructureItem[]
}
