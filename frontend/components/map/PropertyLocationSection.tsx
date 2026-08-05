"use client"

import { useMemo, useState } from "react"
import { CircleMarker, MapContainer, TileLayer } from "react-leaflet"
import { MapPin } from "lucide-react"

import "leaflet/dist/leaflet.css"

import {
  getMapTileConfig,
  getPropertyCoordinates,
  hasPropertyCoordinates,
} from "@/lib/mapConfig"

type PropertyLocationMapProps = {
  latitude: number
  longitude: number
  city?: string | null
}

const mapShellClassName =
  "overflow-hidden rounded-[24px] border border-white/8 bg-[#2D2D2D]"

const markerPathOptions = {
  color: "#DFC58A",
  fillColor: "#DFC58A",
  fillOpacity: 1,
  weight: 2,
}

function MapAttribution({ attributionHtml }: { attributionHtml: string }) {
  return (
    <p
      className="mt-2 text-[11px] leading-relaxed text-[#B8B8B8]"
      dangerouslySetInnerHTML={{ __html: attributionHtml }}
    />
  )
}

function LocationFallback({
  city,
  message,
}: {
  city?: string | null
  message: string
}) {
  return (
    <div className={`${mapShellClassName} px-5 py-5`}>
      <div className="flex items-start gap-3">
        <MapPin
          className="mt-0.5 h-4 w-4 shrink-0 text-[#DFC58A]"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-medium text-[#F5F5F5]">
            {city?.trim() || "Unknown city"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[#B8B8B8]">
            {message}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function PropertyLocationMap({
  latitude,
  longitude,
  city,
}: PropertyLocationMapProps) {
  const mapConfig = useMemo(() => getMapTileConfig(), [])
  const [tileError, setTileError] = useState(false)

  if (!hasPropertyCoordinates(latitude, longitude)) {
    return (
      <LocationFallback
        city={city}
        message="Map location is not available for this listing yet."
      />
    )
  }

  if (!mapConfig.tileUrl || tileError) {
    return (
      <LocationFallback
        city={city}
        message="Map preview is temporarily unavailable."
      />
    )
  }

  return (
    <div>
      <div className={`${mapShellClassName} h-56 sm:h-64 md:h-72`}>
        <MapContainer
          center={[latitude, longitude]}
          zoom={mapConfig.defaultZoom}
          scrollWheelZoom={false}
          dragging={true}
          touchZoom={true}
          doubleClickZoom={false}
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
          <CircleMarker
            center={[latitude, longitude]}
            radius={10}
            pathOptions={markerPathOptions}
          />
        </MapContainer>
      </div>
      <MapAttribution attributionHtml={mapConfig.attribution} />
    </div>
  )
}

type PropertyLocationSectionProps = {
  latitude?: number | null
  longitude?: number | null
  city?: string | null
}

export function PropertyLocationSection({
  latitude,
  longitude,
  city,
}: PropertyLocationSectionProps) {
  const coordinates = getPropertyCoordinates(latitude, longitude)

  return (
    <section aria-labelledby="property-location-heading" className="mt-8">
      <h2
        id="property-location-heading"
        className="text-xl font-semibold tracking-tight text-[#F5F5F5]"
      >
        Location
      </h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#B8B8B8]">
        {coordinates
          ? "Approximate area around this rental."
          : "City information is available, but a public map point has not been added yet."}
      </p>
      <div className="mt-4">
        {coordinates ? (
          <PropertyLocationMap
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
            city={city}
          />
        ) : (
          <LocationFallback
            city={city}
            message="Map location is not available for this listing yet."
          />
        )}
      </div>
    </section>
  )
}
