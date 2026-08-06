export type RentalDocumentType =
  | "lease_agreement"
  | "inventory"
  | "move_in_report"
  | "payment_instructions"
  | "house_rules"
  | "other"

export type RentalDocumentStatus = "active" | "archived"

export type RentalDocument = {
  id: number
  viewing_request_id: number | null
  property_id: number
  renter_id: number
  realtor_id: number
  document_type: RentalDocumentType
  display_name: string
  title: string | null
  original_filename: string | null
  mime_type: string
  size_bytes: number
  uploaded_by_user_id: number
  status: RentalDocumentStatus
  can_download: boolean
  can_archive: boolean
  created_at: string
  updated_at: string
  archived_at: string | null
}

export type RentalDocumentListResponse = {
  items: RentalDocument[]
  total: number
}

export const RENTAL_DOCUMENT_TYPE_OPTIONS: Array<{
  value: RentalDocumentType
  label: string
}> = [
  { value: "lease_agreement", label: "Lease Agreement" },
  { value: "inventory", label: "Inventory" },
  { value: "move_in_report", label: "Move-in Report" },
  { value: "payment_instructions", label: "Payment Instructions" },
  { value: "house_rules", label: "House Rules" },
  { value: "other", label: "Other" },
]

export function formatDocumentSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function getRentalDocumentStatusLabel(status: RentalDocumentStatus): string {
  if (status === "archived") {
    return "Archived"
  }

  return "Active"
}
