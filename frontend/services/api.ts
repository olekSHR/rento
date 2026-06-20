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

export async function getPropertyById(id: number) {
  const response = await fetch(
    `${API_URL}/properties/${id}`,
    {
      cache: "no-store",
    }
  )

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
  image_url: string
  status: string
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
  file: File
): Promise<UploadImageResponse> {
  const formData = new FormData()

  formData.append("image", file)

  const response = await fetch(`${API_URL}/upload/`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to upload image")
  }

  return response.json()
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
  propertyId: number
): Promise<PropertyImage[]> {
  const response = await fetch(
    `${API_URL}/properties/${propertyId}/images`,
    {
      cache: "no-store",
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
