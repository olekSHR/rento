export type ViewingRequestStatus =
  | "pending"
  | "accepted"
  | "declined"
  | "cancelled"

export type ViewingRequestPropertySummary = {
  id: number
  title: string
  city: string | null
  image_url: string | null
  status: string
}

export type ViewingRequest = {
  id: number
  property_id: number
  property: ViewingRequestPropertySummary
  status: ViewingRequestStatus
  message: string | null
  created_at: string
  updated_at: string
  responded_at: string | null
}

export type ViewingRequestRealtor = ViewingRequest & {
  requester_id: number
  requester_email: string
}

export type ViewingRequestListResponse = {
  items: ViewingRequest[]
  total: number
  limit: number
  offset: number
}

export type ViewingRequestRealtorListResponse = {
  items: ViewingRequestRealtor[]
  total: number
  limit: number
  offset: number
}

export function getViewingRequestStatusLabel(status: ViewingRequestStatus): string {
  switch (status) {
    case "pending":
      return "Waiting for realtor response"
    case "accepted":
      return "Accepted"
    case "declined":
      return "Declined"
    case "cancelled":
      return "Cancelled"
    default:
      return status
  }
}

export function isActiveViewingRequest(status: ViewingRequestStatus): boolean {
  return status === "pending" || status === "accepted"
}

export function canCancelViewingRequest(status: ViewingRequestStatus): boolean {
  return isActiveViewingRequest(status)
}

export function isPropertyPubliclyAvailable(
  propertyStatus: string | null | undefined
): boolean {
  return propertyStatus === "available"
}
