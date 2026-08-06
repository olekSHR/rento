export type PublicRealtorProfile = {
  user_id: number
  full_name?: string | null
  agency_name?: string | null
  avatar_url?: string | null
  is_verified: boolean
  member_since?: string | null
  active_listings_count: number
  phone?: string | null
  whatsapp?: string | null
  telegram_username?: string | null
}

export type PublicRealtorProfilePage = {
  realtor: PublicRealtorProfile
  properties: {
    items: Array<{
      id: number
      title: string
      price: number | null
      city: string | null
      rooms: number | null
      image_url: string | null
      status: string
      last_verified_at?: string | null
    }>
    total: number
    limit: number
    offset: number
  }
}
