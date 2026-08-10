import { getServerApiBaseUrl } from "@/lib/apiBaseUrl"
import { getCsrfHeaderValue } from "@/lib/csrf"
import { parseApiErrorMessage, ApiHttpError } from "@/lib/apiError"
import { dispatchAuthUnauthorized } from "@/lib/authSessionEvents"
import { normalizeImagePath } from "@/lib/getImageUrl"
import type { NearbyInfrastructureResponse } from "@/types/nearbyInfrastructure"
import type { PublicRealtorProfilePage } from "@/types/publicRealtor"
import type { PropertyImage } from "@/types/property"
import type {
  RentalDocument,
  RentalDocumentListResponse,
  RentalDocumentType,
} from "@/types/rentalDocument"
import type {
  ViewingRequest,
  ViewingRequestListResponse,
  ViewingRequestRealtor,
  ViewingRequestRealtorListResponse,
} from "@/types/viewingRequest"

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"])

function buildSessionHeaders(
  initHeaders?: HeadersInit,
  method = "GET",
  jsonBody = false
): Headers {
  const headers = new Headers(initHeaders)

  if (jsonBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (MUTATING_METHODS.has(method.toUpperCase())) {
    const csrfToken = getCsrfHeaderValue()

    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken)
    }
  }

  return headers
}

async function sessionFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const method = (options.method ?? "GET").toUpperCase()
  const hasJsonBody =
    options.body !== undefined && typeof options.body === "string"

  const response = await fetch(url, {
    ...options,
    method,
    headers: buildSessionHeaders(options.headers, method, hasJsonBody),
    credentials: "include",
  })

  if (response.status === 401) {
    dispatchAuthUnauthorized()
  }

  return response
}

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
    ? `${getServerApiBaseUrl()}/properties/?${query}`
    : `${getServerApiBaseUrl()}/properties/`

  const response = await fetch(url, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch properties")
    )
  }

  return response.json()
}

export async function getAdminProperties() {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/properties/admin/all`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch admin properties")
    )
  }

  return response.json()
}

export type PropertyFetchOptions = {
  authenticated?: boolean
}

export async function getPropertyById(
  id: number,
  options?: PropertyFetchOptions
) {
  const url = `${getServerApiBaseUrl()}/properties/${id}`

  const response = options?.authenticated
    ? await sessionFetch(url, { cache: "no-store" })
    : await fetch(url, {
        cache: "no-store",
      })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch property")
    )
  }

  return response.json()
}

export async function getPublicRealtorProfile(
  userId: number
): Promise<PublicRealtorProfilePage> {
  const url = `${getServerApiBaseUrl()}/realtors/${userId}`

  const response = await fetch(url, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new ApiHttpError(
      await parseApiErrorMessage(response, "Failed to fetch realtor profile"),
      response.status
    )
  }

  return response.json()
}

export async function getPropertyNearby(
  propertyId: number
): Promise<NearbyInfrastructureResponse> {
  const url = `${getServerApiBaseUrl()}/properties/${propertyId}/nearby`

  const response = await fetch(url, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch nearby places")
    )
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
  latitude?: number | null
  longitude?: number | null
}

export async function createProperty(data: CreatePropertyData) {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/properties/`, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to create property")
    )
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

  const response = await sessionFetch(`${getServerApiBaseUrl()}/upload/`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to upload image")
    )
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
  latitude?: number | null
  longitude?: number | null
}

export async function updateProperty(
  id: number,
  data: UpdatePropertyData
) {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/properties/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to update property")
    )
  }

  return response.json()
}

export async function deleteProperty(id: number) {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/properties/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to delete property")
    )
  }

  return response.json()
}

export async function verifyProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${id}/verify`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to verify property")
    )
  }

  return response.json()
}

export async function archiveProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${id}/archive`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to archive property")
    )
  }

  return response.json()
}


export async function activateProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${id}/activate`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to activate property")
    )
  }

  return response.json()
}

export async function reportProperty(id: number) {
  const response = await fetch(
    `${getServerApiBaseUrl()}/properties/${id}/report`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to report property")
    )
  }

  return response.json()
}

/* =========================
   Property Gallery API
========================= */

export type CreatePropertyImageData = {
  url: string
  is_cover?: boolean
  sort_order?: number
}

export type PropertyImageFetchOptions = {
  authenticated?: boolean
}

export async function getPropertyImages(
  propertyId: number,
  options?: PropertyImageFetchOptions
): Promise<PropertyImage[]> {
  const url = `${getServerApiBaseUrl()}/properties/${propertyId}/images`

  const response = options?.authenticated
    ? await sessionFetch(url, { cache: "no-store" })
    : await fetch(url, {
        cache: "no-store",
      })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch property images")
    )
  }

  return response.json()
}

export async function addPropertyImage(
  propertyId: number,
  data: CreatePropertyImageData
): Promise<PropertyImage> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${propertyId}/images`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to add property image")
    )
  }

  return response.json()
}

export async function setCoverImage(
  propertyId: number,
  imageId: number
): Promise<PropertyImage> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${propertyId}/images/${imageId}/cover`,
    {
      method: "PUT",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to set cover image")
    )
  }

  return response.json()
}

export async function deletePropertyImage(
  propertyId: number,
  imageId: number
) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${propertyId}/images/${imageId}`,
    {
      method: "DELETE",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to delete property image")
    )
  }

  return response.json()
}

export async function updatePropertyImageSortOrder(
  propertyId: number,
  imageId: number,
  sortOrder: number
): Promise<PropertyImage> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${propertyId}/images/${imageId}/sort-order?sort_order=${sortOrder}`,
    {
      method: "PATCH",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(
        response,
        "Failed to update property image sort order"
      )
    )
  }

  return response.json()
}

export async function getMyRealtorProperties() {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/realtor/properties`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch realtor properties")
    )
  }

  return response.json()
}

export async function archiveMyRealtorProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/properties/${id}/archive`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to archive property")
    )
  }

  return response.json()
}

export async function restoreMyRealtorProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/properties/${id}/restore`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to restore property")
    )
  }

  return response.json()
}

export async function deleteMyArchivedRealtorProperty(id: number) {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/properties/${id}`,
    {
      method: "DELETE",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to delete property")
    )
  }

  return response.json()
}

export type RealtorProfile = {
  id: number
  user_id: number
  full_name: string | null
  phone: string | null
  whatsapp: string | null
  telegram_username: string | null
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
  telegram_username?: string
  agency_name?: string
  avatar_url?: string
  bio?: string
  city?: string
}

export async function getMyRealtorProfile(): Promise<RealtorProfile> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/realtor/profile`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to fetch realtor profile")
    )
  }

  return response.json()
}

export async function updateMyRealtorProfile(
  data: RealtorProfileUpdate
): Promise<RealtorProfile> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/realtor/profile`, {
    method: "PATCH",
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to update realtor profile")
    )
  }

  return response.json()
}

export type RealtorApplication = {
  id: number
  user_id: number
  full_name: string
  phone: string
  agency_name: string | null
  message: string | null
  status: string
  created_at: string
  reviewed_at: string | null
  reviewed_by: number | null
}

export type RealtorApplicationCreateData = {
  full_name: string
  phone: string
  agency_name?: string
  message?: string
}

export async function getMyRealtorApplication(): Promise<RealtorApplication | null> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/realtor-applications/me`, {
    cache: "no-store",
  })

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to load your application.")
    )
  }

  return response.json()
}

export async function createRealtorApplication(
  data: RealtorApplicationCreateData
): Promise<RealtorApplication> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/realtor-applications/`, {
    method: "POST",
    body: JSON.stringify(data),
  })

  if (response.status === 401) {
    throw new Error("Please sign in to submit your application.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(
        response,
        "Something went wrong. Please try again later."
      )
    )
  }

  return response.json()
}

export type RealtorApplicationListResponse = {
  items: RealtorApplication[]
  total: number
}

export async function getRealtorApplications(
  status?: string
): Promise<RealtorApplicationListResponse> {
  const url = status
    ? `${getServerApiBaseUrl()}/realtor-applications/?status=${encodeURIComponent(status)}`
    : `${getServerApiBaseUrl()}/realtor-applications/`

  const response = await sessionFetch(url, {
    cache: "no-store",
  })

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to load applications.")
    )
  }

  return response.json()
}

export async function reviewRealtorApplication(
  applicationId: number,
  status: "approved" | "rejected"
): Promise<RealtorApplication> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor-applications/${applicationId}/review`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Failed to update application.")
    )
  }

  return response.json()
}

export type AdminStats = {
  total_users: number
  total_realtors: number
  pending_realtor_applications: number
  active_listings: number
  reported_listings: number
}

export async function getAdminStats(): Promise<AdminStats> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/admin/stats`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load dashboard stats.")
    )
  }

  return response.json()
}

export type AdminUserListItem = {
  id: number
  email: string
  role: string
  display_name: string
  application_status: string | null
  listings_count: number
  is_verified_realtor: boolean
  registered_at: string | null
  account_status: string
}

export type AdminUsersResponse = {
  items: AdminUserListItem[]
  total: number
  limit: number
  offset: number
}

export type AdminUsersQuery = {
  page?: number
  limit?: number
  q?: string
  role?: string
  application_status?: string
}

export async function getAdminUsers(
  pageOrQuery: number | AdminUsersQuery = 1,
  limit = 20
): Promise<AdminUsersResponse> {
  const query: AdminUsersQuery =
    typeof pageOrQuery === "number"
      ? { page: pageOrQuery, limit }
      : { page: 1, limit: 20, ...pageOrQuery }

  const rawPage = query.page ?? 1
  const page =
    Number.isFinite(rawPage) && rawPage >= 1 ? Math.floor(rawPage) : 1
  const limitValue = query.limit ?? 20
  const offset = (page - 1) * limitValue

  const params = new URLSearchParams({
    limit: String(limitValue),
    offset: String(offset),
  })

  const normalizedQuery = query.q?.trim()

  if (normalizedQuery && normalizedQuery.length >= 2) {
    params.set("q", normalizedQuery)
  }

  if (query.role) {
    params.set("role", query.role)
  }

  if (query.application_status) {
    params.set("application_status", query.application_status)
  }

  const response = await sessionFetch(`${getServerApiBaseUrl()}/admin/users?${params}`, {
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load users.")
    )
  }

  return response.json()
}

export type AdminUserDetail = AdminUserListItem & {
  phone: string | null
  agency_name: string | null
}

export async function getAdminUserById(
  userId: number
): Promise<AdminUserDetail> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/admin/users/${userId}`, {
    cache: "no-store",
  })

  if (response.status === 404) {
    throw new Error("User not found.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load user.")
    )
  }

  return response.json()
}

export type ManageableUserRole = "user" | "realtor"

export async function updateUserRole(
  userId: number,
  role: ManageableUserRole
): Promise<{ id: number; email: string; role: string }> {
  const response = await sessionFetch(`${getServerApiBaseUrl()}/users/${userId}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  })

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (response.status === 404) {
    throw new Error("User not found.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to update user role.")
    )
  }

  return response.json()
}

export type ManageableAccountStatus = "active" | "suspended" | "blocked"

export async function updateAdminUserAccountStatus(
  userId: number,
  accountStatus: ManageableAccountStatus
): Promise<AdminUserDetail> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/admin/users/${userId}/account-status`,
    {
      method: "PATCH",
      body: JSON.stringify({ account_status: accountStatus }),
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (response.status === 404) {
    throw new Error("User not found.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to update account status.")
    )
  }

  return response.json()
}

export async function createViewingRequest(
  propertyId: number,
  message?: string | null
): Promise<ViewingRequest> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/properties/${propertyId}/viewing-requests`,
    {
      method: "POST",
      body: JSON.stringify({ message: message ?? null }),
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in to request a viewing.")
  }

  if (response.status === 409) {
    throw new Error(
      await parseApiErrorMessage(
        response,
        "You already have an active viewing request for this property."
      )
    )
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to submit viewing request.")
    )
  }

  return response.json()
}

export async function getMyViewingRequests(options?: {
  propertyId?: number
  status?: string
  limit?: number
  offset?: number
}): Promise<ViewingRequestListResponse> {
  const params = new URLSearchParams()

  if (options?.propertyId !== undefined) {
    params.set("property_id", String(options.propertyId))
  }

  if (options?.status) {
    params.set("status", options.status)
  }

  if (options?.limit !== undefined) {
    params.set("limit", String(options.limit))
  }

  if (options?.offset !== undefined) {
    params.set("offset", String(options.offset))
  }

  const query = params.toString()
  const url = query
    ? `${getServerApiBaseUrl()}/viewing-requests?${query}`
    : `${getServerApiBaseUrl()}/viewing-requests`

  const response = await sessionFetch(url, {
    cache: "no-store",
  })

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load viewing requests.")
    )
  }

  return response.json()
}

export async function getMyViewingRequest(
  requestId: number
): Promise<ViewingRequest> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/viewing-requests/${requestId}`,
    {
      cache: "no-store",
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load viewing request.")
    )
  }

  return response.json()
}

export async function getRealtorViewingRequest(
  requestId: number
): Promise<ViewingRequestRealtor> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/viewing-requests/${requestId}`,
    {
      cache: "no-store",
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (response.status === 403) {
    throw new Error("Only realtors can access viewing requests.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load viewing request.")
    )
  }

  return response.json()
}

export async function cancelViewingRequest(
  requestId: number
): Promise<ViewingRequest> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/viewing-requests/${requestId}/cancel`,
    {
      method: "PATCH",
    }
  )

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to cancel viewing request.")
    )
  }

  return response.json()
}

export async function getRealtorViewingRequests(options?: {
  status?: string
  limit?: number
  offset?: number
}): Promise<ViewingRequestRealtorListResponse> {
  const params = new URLSearchParams()

  if (options?.status) {
    params.set("status", options.status)
  }

  if (options?.limit !== undefined) {
    params.set("limit", String(options.limit))
  }

  if (options?.offset !== undefined) {
    params.set("offset", String(options.offset))
  }

  const query = params.toString()
  const url = query
    ? `${getServerApiBaseUrl()}/realtor/viewing-requests?${query}`
    : `${getServerApiBaseUrl()}/realtor/viewing-requests`

  const response = await sessionFetch(url, {
    cache: "no-store",
  })

  if (response.status === 401) {
    throw new Error("Please sign in again.")
  }

  if (response.status === 403) {
    throw new Error("Only realtors can access viewing requests.")
  }

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load viewing requests.")
    )
  }

  return response.json()
}

export async function acceptViewingRequest(
  requestId: number
): Promise<ViewingRequestRealtor> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/viewing-requests/${requestId}/accept`,
    {
      method: "PATCH",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to accept viewing request.")
    )
  }

  return response.json()
}

export async function declineViewingRequest(
  requestId: number
): Promise<ViewingRequestRealtor> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/realtor/viewing-requests/${requestId}/decline`,
    {
      method: "PATCH",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to decline viewing request.")
    )
  }

  return response.json()
}

export async function getRentalDocuments(
  viewingRequestId: number
): Promise<RentalDocumentListResponse> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/viewing-requests/${viewingRequestId}/rental-documents`
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to load rental documents.")
    )
  }

  return response.json()
}

export async function uploadRentalDocument(
  viewingRequestId: number,
  file: File,
  documentType: RentalDocumentType,
  title?: string
): Promise<RentalDocument> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("document_type", documentType)

  if (title?.trim()) {
    formData.append("title", title.trim())
  }

  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/viewing-requests/${viewingRequestId}/rental-documents`,
    {
      method: "POST",
      body: formData,
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to upload rental document.")
    )
  }

  return response.json()
}

export async function archiveRentalDocument(
  documentId: number
): Promise<RentalDocument> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/rental-documents/${documentId}/archive`,
    {
      method: "POST",
    }
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to archive rental document.")
    )
  }

  return response.json()
}

export async function downloadRentalDocument(documentId: number): Promise<void> {
  const response = await sessionFetch(
    `${getServerApiBaseUrl()}/rental-documents/${documentId}/download`
  )

  if (!response.ok) {
    throw new Error(
      await parseApiErrorMessage(response, "Unable to download rental document.")
    )
  }

  const blob = await response.blob()
  const disposition = response.headers.get("Content-Disposition") ?? ""
  const filenameMatch = disposition.match(/filename="?([^"]+)"?/)
  const filename = filenameMatch?.[1] ?? "document.pdf"
  const objectUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = objectUrl
  link.download = filename
  link.click()
  URL.revokeObjectURL(objectUrl)
}
