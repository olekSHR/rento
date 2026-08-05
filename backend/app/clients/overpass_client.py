from __future__ import annotations

import json
import logging
import math
from dataclasses import dataclass
from urllib.parse import urlparse

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


@dataclass(frozen=True)
class OverpassPoint:
    latitude: float
    longitude: float
    name: str | None
    category: str


CATEGORY_ORDER = (
    "supermarket",
    "park",
    "school",
    "hospital",
    "bus_stop",
)

CATEGORY_LABELS = {
    "supermarket": "Supermarket",
    "park": "Park",
    "school": "School",
    "hospital": "Hospital",
    "bus_stop": "Bus stop",
}


def get_overpass_provider_host(api_url: str | None = None) -> str:
    parsed = urlparse(api_url or settings.OVERPASS_API_URL)
    return parsed.netloc or "overpass"


def classify_overpass_failure(exc: BaseException) -> tuple[str, int | None]:
    if isinstance(exc, httpx.HTTPStatusError):
        return "http_error", exc.response.status_code

    if isinstance(exc, httpx.TimeoutException):
        return "timeout", None

    if isinstance(exc, httpx.RequestError):
        return "connection_failure", None

    if isinstance(exc, json.JSONDecodeError):
        return "invalid_json", None

    return "provider_error", None


def _log_overpass_fetch_failure(
    *,
    failure: str,
    status_code: int | None = None,
) -> None:
    fields = [
        f"operation=nearby_infrastructure_fetch",
        f"provider={get_overpass_provider_host()}",
        f"failure={failure}",
    ]

    if status_code is not None:
        fields.append(f"status_code={status_code}")

    logger.warning(
        "Nearby infrastructure Overpass fetch failed %s",
        " ".join(fields),
    )


def _build_overpass_query(
    latitude: float,
    longitude: float,
    radius_m: int,
    timeout_s: float,
) -> str:
    timeout_value = max(1, int(timeout_s))
    return f"""
[out:json][timeout:{timeout_value}];
(
  node["shop"="supermarket"](around:{radius_m},{latitude},{longitude});
  way["shop"="supermarket"](around:{radius_m},{latitude},{longitude});
  node["shop"="convenience"](around:{radius_m},{latitude},{longitude});
  way["shop"="convenience"](around:{radius_m},{latitude},{longitude});
  node["leisure"="park"](around:{radius_m},{latitude},{longitude});
  way["leisure"="park"](around:{radius_m},{latitude},{longitude});
  node["amenity"="school"](around:{radius_m},{latitude},{longitude});
  way["amenity"="school"](around:{radius_m},{latitude},{longitude});
  node["amenity"="hospital"](around:{radius_m},{latitude},{longitude});
  way["amenity"="hospital"](around:{radius_m},{latitude},{longitude});
  node["highway"="bus_stop"](around:{radius_m},{latitude},{longitude});
);
out center;
""".strip()


def _resolve_name(tags: dict) -> str | None:
    for key in ("name", "name:ro", "brand", "operator"):
        value = tags.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return None


def _resolve_category(tags: dict) -> str | None:
    shop = tags.get("shop")
    if shop == "supermarket" or shop == "convenience":
        return "supermarket"

    leisure = tags.get("leisure")
    if leisure == "park":
        return "park"

    amenity = tags.get("amenity")
    if amenity == "school":
        return "school"
    if amenity == "hospital":
        return "hospital"

    if tags.get("highway") == "bus_stop":
        return "bus_stop"

    return None


def _element_coordinates(element: dict) -> tuple[float, float] | None:
    if element.get("type") == "node":
        lat = element.get("lat")
        lon = element.get("lon")
        if isinstance(lat, (int, float)) and isinstance(lon, (int, float)):
            return float(lat), float(lon)

    center = element.get("center")
    if isinstance(center, dict):
        lat = center.get("lat")
        lon = center.get("lon")
        if isinstance(lat, (int, float)) and isinstance(lon, (int, float)):
            return float(lat), float(lon)

    return None


def haversine_distance_m(
    latitude_a: float,
    longitude_a: float,
    latitude_b: float,
    longitude_b: float,
) -> float:
    radius_earth_m = 6371000.0
    phi_1 = math.radians(latitude_a)
    phi_2 = math.radians(latitude_b)
    delta_phi = math.radians(latitude_b - latitude_a)
    delta_lambda = math.radians(longitude_b - longitude_a)

    a = (
        math.sin(delta_phi / 2) ** 2
        + math.cos(phi_1) * math.cos(phi_2) * math.sin(delta_lambda / 2) ** 2
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return radius_earth_m * c


def format_distance_label(distance_m: float) -> str:
    rounded = max(0, int(round(distance_m)))
    if rounded < 1000:
        return f"{rounded} m"
    kilometers = rounded / 1000
    return f"{kilometers:.1f} km"


def parse_overpass_elements(
    elements: list[dict],
    origin_latitude: float,
    origin_longitude: float,
) -> list[OverpassPoint]:
    points: list[OverpassPoint] = []

    for element in elements:
        tags = element.get("tags")
        if not isinstance(tags, dict):
            continue

        category = _resolve_category(tags)
        if category is None:
            continue

        coordinates = _element_coordinates(element)
        if coordinates is None:
            continue

        points.append(
            OverpassPoint(
                latitude=coordinates[0],
                longitude=coordinates[1],
                name=_resolve_name(tags),
                category=category,
            )
        )

    return points


def select_nearest_by_category(
    points: list[OverpassPoint],
    origin_latitude: float,
    origin_longitude: float,
) -> dict[str, OverpassPoint]:
    nearest: dict[str, OverpassPoint] = {}

    for point in points:
        distance_m = haversine_distance_m(
            origin_latitude,
            origin_longitude,
            point.latitude,
            point.longitude,
        )

        existing = nearest.get(point.category)
        if existing is None:
            nearest[point.category] = point
            continue

        existing_distance = haversine_distance_m(
            origin_latitude,
            origin_longitude,
            existing.latitude,
            existing.longitude,
        )
        if distance_m < existing_distance:
            nearest[point.category] = point

    return nearest


async def fetch_overpass_points(
    latitude: float,
    longitude: float,
    *,
    radius_m: int | None = None,
    timeout_s: float | None = None,
    api_url: str | None = None,
    user_agent: str | None = None,
) -> list[OverpassPoint]:
    query = _build_overpass_query(
        latitude,
        longitude,
        radius_m or settings.NEARBY_SEARCH_RADIUS_M,
        timeout_s or settings.OVERPASS_TIMEOUT_S,
    )

    headers = {
        "User-Agent": user_agent or settings.OVERPASS_USER_AGENT,
        "Accept": "application/json",
    }

    timeout = httpx.Timeout(timeout_s or settings.OVERPASS_TIMEOUT_S)

    async with httpx.AsyncClient(timeout=timeout) as client:
        response = await client.post(
            api_url or settings.OVERPASS_API_URL,
            data={"data": query},
            headers=headers,
        )
        response.raise_for_status()
        payload = response.json()

    elements = payload.get("elements")
    if not isinstance(elements, list):
        _log_overpass_fetch_failure(failure="malformed_response")
        return []

    return parse_overpass_elements(elements, latitude, longitude)
