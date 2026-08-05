"use client"

import { useEffect, useMemo, useState } from "react"
import {
  CircleMarker,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet"
import type { LatLngExpression } from "leaflet"

import "leaflet/dist/leaflet.css"

import {
  APPROXIMATE_LOCATION_NOTICE,
  getMapTileConfig,
  getPropertyCoordinates,
  type MapCenter,
} from "@/lib/mapConfig"

export type PropertyLocationValue = {
  latitude: number | null
  longitude: number | null
}

type PropertyLocationPickerProps = {
  value: PropertyLocationValue
  onChange: (value: PropertyLocationValue) => void
}

const mapShellClassName =
  "overflow-hidden rounded-2xl border border-white/8 bg-[#252525]"

const markerPathOptions = {
  color: "#DFC58A",
  fillColor: "#DFC58A",
  fillOpacity: 1,
  weight: 2,
}

function MapViewSync({
  center,
  zoom,
}: {
  center: LatLngExpression
  zoom: number
}) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, zoom, { animate: false })
  }, [center, map, zoom])

  return null
}

function MapClickHandler({
  onSelect,
}: {
  onSelect: (latitude: number, longitude: number) => void
}) {
  useMapEvents({
    click(event) {
      onSelect(event.latlng.lat, event.latlng.lng)
    },
  })

  return null
}

function MapUnavailablePanel({ message }: { message: string }) {
  return (
    <div
      className={`${mapShellClassName} flex h-56 items-center justify-center px-4 text-center text-sm text-[#B8B8B8] md:h-64`}
      role="status"
    >
      {message}
    </div>
  )
}

function resolvePickerCenter(
  value: PropertyLocationValue,
  fallbackCenter: MapCenter
): LatLngExpression {
  const selected = getPropertyCoordinates(value.latitude, value.longitude)

  if (selected) {
    return [selected.latitude, selected.longitude]
  }

  return [fallbackCenter.latitude, fallbackCenter.longitude]
}

export default function PropertyLocationPicker({
  value,
  onChange,
}: PropertyLocationPickerProps) {
  const mapConfig = useMemo(() => getMapTileConfig(), [])
  const [tileError, setTileError] = useState(false)

  const center = resolvePickerCenter(value, mapConfig.pickerDefaultCenter)
  const selectedCoordinates = getPropertyCoordinates(
    value.latitude,
    value.longitude
  )

  if (!mapConfig.tileUrl || tileError) {
    return (
      <div className="space-y-3">
        <p className="text-xs leading-relaxed text-[#B8B8B8]">
          {APPROXIMATE_LOCATION_NOTICE}
        </p>
        <MapUnavailablePanel message="Map is temporarily unavailable. You can still save the listing without a location." />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-[#B8B8B8]">
        {APPROXIMATE_LOCATION_NOTICE}
      </p>

      <div className={`${mapShellClassName} h-56 md:h-64`}>
        <MapContainer
          center={center}
          zoom={mapConfig.defaultZoom}
          scrollWheelZoom={false}
          className="h-full w-full"
          aria-label="Approximate property location map"
        >
          <TileLayer
            url={mapConfig.tileUrl}
            attribution={mapConfig.attribution}
            eventHandlers={{
              tileerror: () => setTileError(true),
            }}
          />
          <MapViewSync center={center} zoom={mapConfig.defaultZoom} />
          <MapClickHandler
            onSelect={(latitude, longitude) =>
              onChange({ latitude, longitude })
            }
          />
          {selectedCoordinates && (
            <CircleMarker
              center={[
                selectedCoordinates.latitude,
                selectedCoordinates.longitude,
              ]}
              radius={10}
              pathOptions={markerPathOptions}
            />
          )}
        </MapContainer>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[#B8B8B8]">
          {selectedCoordinates
            ? `Selected: ${selectedCoordinates.latitude.toFixed(5)}, ${selectedCoordinates.longitude.toFixed(5)}`
            : "Tap the map to place an approximate location marker."}
        </p>
        {selectedCoordinates && (
          <button
            type="button"
            onClick={() => onChange({ latitude: null, longitude: null })}
            className="inline-flex min-h-9 items-center rounded-xl border border-white/10 bg-[#252525] px-3 text-xs font-semibold text-[#F5F5F5] transition-colors hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#2D2D2D]"
          >
            Clear location
          </button>
        )}
      </div>
    </div>
  )
}
