import type { RealtorProfile } from "@/services/api"
import type { Property } from "@/types/property"

export type PropertyFilter =
  | "all"
  | "active"
  | "pending"
  | "reserved"
  | "rented"
  | "archived"

export const PROPERTY_FILTER_OPTIONS: {
  id: PropertyFilter
  label: string
}[] = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "pending", label: "Pending" },
  { id: "reserved", label: "Reserved" },
  { id: "rented", label: "Rented" },
  { id: "archived", label: "Archived" },
]

export type WorkspaceAction = {
  id: string
  title: string
  description: string
  href: string
  tone: "urgent" | "default"
}

export function computeProfileCompletionPercent(
  profile: RealtorProfile | null
): number {
  if (!profile) {
    return 0
  }

  let percent = 0

  if ((profile.full_name?.trim().length ?? 0) >= 2) {
    percent += 34
  }

  if ((profile.city?.trim().length ?? 0) >= 2) {
    percent += 33
  }

  if (profile.phone?.trim() || profile.whatsapp?.trim()) {
    percent += 33
  }

  return percent
}

export function getWorkspaceGreetingName(
  profile: RealtorProfile | null,
  email?: string | null
): string {
  const firstName = profile?.full_name?.trim().split(/\s+/)[0]

  if (firstName) {
    return firstName
  }

  if (email) {
    return email.split("@")[0] ?? "there"
  }

  return "there"
}

export function filterProperties(
  properties: Property[],
  filter: PropertyFilter
): Property[] {
  switch (filter) {
    case "active":
      return properties.filter((property) => property.status === "available")
    case "pending":
      return properties.filter((property) => property.status === "pending")
    case "reserved":
      return properties.filter((property) => property.status === "reserved")
    case "rented":
      return properties.filter((property) => property.status === "rented")
    case "archived":
      return properties.filter((property) => property.status === "archived")
    default:
      return properties
  }
}

export function searchProperties(
  properties: Property[],
  query: string
): Property[] {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return properties
  }

  return properties.filter((property) => {
    const title = property.title.toLowerCase()
    const city = property.city?.toLowerCase() ?? ""
    const price = String(property.price ?? "")

    return (
      title.includes(normalizedQuery) ||
      city.includes(normalizedQuery) ||
      price.includes(normalizedQuery)
    )
  })
}

export function getPropertyUpdatedLabel(property: Property): string {
  if (property.last_verified_at) {
    const date = new Date(property.last_verified_at)

    if (!Number.isNaN(date.getTime())) {
      return date.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    }
  }

  // TODO: Replace with created_at / updated_at when API exposes it
  return "recently"
}

export function buildWorkspaceActions(
  profile: RealtorProfile | null,
  properties: Property[]
): WorkspaceAction[] {
  const actions: WorkspaceAction[] = []

  if (!profile?.is_completed) {
    actions.push({
      id: "complete-profile",
      title: "Complete profile",
      description: "Add your name, city, and contact details",
      href: "/realtor/profile",
      tone: "urgent",
    })
  }

  if (profile?.is_completed && properties.length === 0) {
    actions.push({
      id: "first-property",
      title: "Add first property",
      description: "Publish your first rental listing",
      href: "/realtor/properties/create",
      tone: "urgent",
    })
  }

  const missingPhotos = properties.filter((property) => !property.image_url)

  if (missingPhotos.length > 0) {
    actions.push({
      id: "missing-photos",
      title: "Add missing photos",
      description: `${missingPhotos.length} listing${
        missingPhotos.length === 1 ? "" : "s"
      } need photos`,
      href: `/realtor/properties/${missingPhotos[0].id}/edit`,
      tone: "urgent",
    })
  }

  return actions.slice(0, 4)
}

export function getContinueEditingProperty(
  properties: Property[]
): Property | null {
  return properties.find((property) => property.status === "pending") ?? null
}

export function getPropertyStatusLabel(status: Property["status"]): string {
  switch (status) {
    case "pending":
      return "Pending"
    case "available":
      return "Active"
    case "reserved":
      return "Reserved"
    case "rented":
      return "Rented"
    case "archived":
      return "Archived"
    default:
      return status
  }
}

export function getPropertyStatusTone(
  status: Property["status"]
): string {
  switch (status) {
    case "pending":
      return "bg-amber-50 text-amber-700 ring-amber-200"
    case "available":
      return "bg-emerald-50 text-emerald-700 ring-emerald-200"
    case "reserved":
      return "bg-blue-50 text-blue-700 ring-blue-200"
    case "rented":
      return "bg-violet-50 text-violet-700 ring-violet-200"
    case "archived":
      return "bg-zinc-100 text-zinc-600 ring-zinc-200"
    default:
      return "bg-zinc-100 text-zinc-600 ring-zinc-200"
  }
}
