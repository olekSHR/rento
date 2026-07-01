export type PropertyStatus =
  | "pending"
  | "available"
  | "reserved"
  | "rented"
  | "archived"

export type PropertyImage = {
  id: number
  url: string
  is_cover: boolean
  sort_order: number
}

export type Property = {
  id: number
  owner_id?: number | null
  title: string
  description: string | null
  price: number | null
  city: string | null
  rooms: number | null
  image_url: string | null
  status: PropertyStatus
  images?: PropertyImage[]
  contact_name?: string | null
  phone?: string | null
  whatsapp?: string | null
  avatar_url?: string | null
  last_verified_at?: string | null
  report_count?: number
}
