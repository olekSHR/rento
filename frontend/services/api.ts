import { normalizeImagePath } from "@/lib/getImageUrl"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000"

type PropertySearchParams = {
  city?: string
  min_price?: string
  rooms?: string
}

export async function getProperties(
  searchParams: PropertySearchParams = {}
) {
  const params = new URLSearchParams()

  if (searchParams.city) {
    params.set("city", searchParams.city)
  }

  if (searchParams.min_price) {
    params.set("min_price", searchParams.min_price)
  }

  if (searchParams.rooms) {
    params.set("rooms", searchParams.rooms)
  }

  const query = params.toString()

  const url = query
    ? `${API_URL}/properties/?${query}`
    : `${API_URL}/properties/`

  const response = await fetch(url, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Failed to fetch properties")
  }

  return response.json()
}

export async function getAdminProperties(
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/admin/all`,
    {
      cache: "no-store",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch admin properties")
  }

  return response.json()
}

export async function getPropertyById(id: number, token?: string) {
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_URL}/properties/${id}`, {
    cache: "no-store",
    headers,
  })

  if (!response.ok) {
    throw new Error("Failed to fetch property")
  }

  return response.json()
}

type CreatePropertyData = {
  title: string
  description: string
  price: number
  city: string
  rooms: number
  image_url?: string
  status?: string
  contact_name?: string
  phone?: string
  whatsapp?: string
}

export async function createProperty(
  data: CreatePropertyData,
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to create property")
  }

  return response.json()
}

type UploadImageResponse = {
  filename: string
  url: string
}

export async function uploadImage(
  file: File,
  token: string
): Promise<UploadImageResponse> {
  const formData = new FormData()

  formData.append("image", file)

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image")
  }

  const data: UploadImageResponse = await response.json()
  const storedUrl =
    normalizeImagePath(data.url) ??
    (data.filename ? `/uploads/${data.filename}` : null)

  if (!storedUrl) {
    throw new Error("Upload response missing image url")
  }

  return {
    filename: data.filename,
    url: storedUrl,
  }
}

type UpdatePropertyData = {
  title: string
  description: string
  price: number
  city: string
  rooms: number
  image_url?: string | null
  status: string
  contact_name?: string
  phone?: string
  whatsapp?: string
}

export async function updateProperty(
  id: number,
  data: UpdatePropertyData,
  token: string
) {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update property")
  }

  return response.json()
}

export async function deleteProperty(
  id: number,
  token: string
) {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to delete property")
  }

  return response.json()
}

export async function verifyProperty(
  id: number,
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/${id}/verify`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to verify property")
  }

  return response.json()
}

export async function archiveProperty(
  id: number,
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/${id}/archive`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to archive property")
  }

  return response.json()
}


export async function activateProperty(
  id: number,
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/${id}/activate`,
    {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to activate property")
  }

  return response.json()
}

export async function reportProperty(id: number) {
  const response = await fetch(
    `${API_URL}/properties/${id}/report`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error("Failed to report property")
  }

  return response.json()
}

/* =========================
   Property Gallery API
========================= */

export type PropertyImage = {
  id: number
  url: string
  is_cover: boolean
  sort_order: number
}

export type CreatePropertyImageData = {
  url: string
  is_cover?: boolean
  sort_order?: number
}

export async function getPropertyImages(
  propertyId: number,
  token?: string
): Promise<PropertyImage[]> {
  const headers: HeadersInit = {}

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images`,
    {
      cache: "no-store",
      headers,
    }
  )

  if (!response.ok) {
    throw new Error("Failed to fetch property images")
  }

  return response.json()
}

export async function addPropertyImage(
  propertyId: number,
  data: CreatePropertyImageData,
  token: string
): Promise<PropertyImage> {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error("Failed to add property image")
  }

  return response.json()
}

export async function setCoverImage(
  propertyId: number,
  imageId: number,
  token: string
): Promise<PropertyImage> {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images/${imageId}/cover`,
    {
      method: "PUT",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to set cover image")
  }

  return response.json()
}

export async function deletePropertyImage(
  propertyId: number,
  imageId: number,
  token: string
) {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images/${imageId}`,
    {
      method: "DELETE",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to delete property image")
  }

  return response.json()
}

export async function updatePropertyImageSortOrder(
  propertyId: number,
  imageId: number,
  sortOrder: number,
  token: string
): Promise<PropertyImage> {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images/${imageId}/sort-order?sort_order=${sortOrder}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (!response.ok) {
    throw new Error("Failed to update property image sort order")
  }

  return response.json()
}

export async function getMyRealtorProperties(token: string) {
  const response = await fetch(`${API_URL}/realtor/properties`, {
    cache: "no-store",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch realtor properties")
  }

  return response.json()
}

export type RealtorProfile = {
  id: number
  user_id: number
  full_name: string | null
  phone: string | null
  whatsapp: string | null
  agency_name: string | null
  avatar_url: string | null
  bio: string | null
  city: string | null
  is_completed: boolean
  is_verified: boolean
  created_at: string | null
  updated_at: string | null
}

export type RealtorProfileUpdate = {
  full_name?: string
  phone?: string
  whatsapp?: string
  agency_name?: string
  avatar_url?: string
  bio?: string
  city?: string
}

export async function getMyRealtorProfile(
  token: string
): Promise<RealtorProfile> {
  const response = await fetch(`${API_URL}/realtor/profile`, {
    cache: "no-store",

    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch realtor profile")
  }

  return response.json()
}

export async function updateMyRealtorProfile(
  data: RealtorProfileUpdate,
  token: string
): Promise<RealtorProfile> {
  const response = await fetch(`${API_URL}/realtor/profile`, {
    method: "PATCH",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to update realtor profile")
  }

  return response.json()
}

export type AIListingRequest = {
  city: string
  price: number
  rooms: number
  property_type: string
  features: string[]
  language: "ro" | "en"
}

export type AIListingResponse = {
  title: string
  description: string
  short_marketing_text: string
}

export async function generateAIListing(
  data: AIListingRequest,
  token: string
): Promise<AIListingResponse> {
  const response = await fetch(`${API_URL}/ai/listing-description`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to generate AI listing")
  }

  return response.json()
}
