import type { PropertyLocationValue } from "@/components/map/PropertyLocationPickerLazy"

export function buildCoordinatePayload(
  value: PropertyLocationValue
): Pick<PropertyLocationValue, "latitude" | "longitude"> {
  if (value.latitude != null && value.longitude != null) {
    return {
      latitude: value.latitude,
      longitude: value.longitude,
    }
  }

  return {
    latitude: null,
    longitude: null,
  }
}

export function coordinatesFromProperty(property: {
  latitude?: number | null
  longitude?: number | null
}): PropertyLocationValue {
  if (
    typeof property.latitude === "number" &&
    typeof property.longitude === "number"
  ) {
    return {
      latitude: property.latitude,
      longitude: property.longitude,
    }
  }

  return {
    latitude: null,
    longitude: null,
  }
}

export const EMPTY_PROPERTY_LOCATION: PropertyLocationValue = {
  latitude: null,
  longitude: null,
}
