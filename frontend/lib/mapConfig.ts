export type MapCenter = {
  latitude: number
  longitude: number
}

export type MapTileConfig = {
  tileUrl: string | null
  attribution: string
  defaultZoom: number
  pickerDefaultCenter: MapCenter
}

const STADIA_PRODUCTION_TILE_URL =
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"

const STADIA_PRODUCTION_ATTRIBUTION =
  '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'

const PICKER_DEFAULT_CENTER: MapCenter = {
  latitude: 44.4268,
  longitude: 26.1025,
}

function isValidTileUrl(tileUrl: string): boolean {
  return (
    tileUrl.includes("{z}") &&
    tileUrl.includes("{x}") &&
    tileUrl.includes("{y}")
  )
}

export function isMapConfigured(config: MapTileConfig): boolean {
  return config.tileUrl !== null
}

export function getMapTileConfig(): MapTileConfig {
  const configuredTileUrl = process.env.NEXT_PUBLIC_MAP_TILE_URL?.trim()
  const configuredAttribution =
    process.env.NEXT_PUBLIC_MAP_ATTRIBUTION?.trim()

  const tileUrlCandidate =
    configuredTileUrl || STADIA_PRODUCTION_TILE_URL
  const tileUrl =
    tileUrlCandidate && isValidTileUrl(tileUrlCandidate)
      ? tileUrlCandidate
      : null

  const attribution =
    configuredAttribution || STADIA_PRODUCTION_ATTRIBUTION

  return {
    tileUrl,
    attribution,
    defaultZoom: 14,
    pickerDefaultCenter: PICKER_DEFAULT_CENTER,
  }
}

export function hasPropertyCoordinates(
  latitude?: number | null,
  longitude?: number | null
): boolean {
  return (
    typeof latitude === "number" &&
    Number.isFinite(latitude) &&
    typeof longitude === "number" &&
    Number.isFinite(longitude)
  )
}

export function getPropertyCoordinates(
  latitude?: number | null,
  longitude?: number | null
): MapCenter | null {
  if (
    typeof latitude !== "number" ||
    !Number.isFinite(latitude) ||
    typeof longitude !== "number" ||
    !Number.isFinite(longitude)
  ) {
    return null
  }

  return {
    latitude,
    longitude,
  }
}

export const APPROXIMATE_LOCATION_NOTICE =
  "Select an approximate public location for this listing. This point will be visible publicly. Do not mark the exact entrance or building number."
