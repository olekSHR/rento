from __future__ import annotations

from datetime import UTC, datetime, timedelta

from sqlalchemy.orm import Session

from app.clients.overpass_client import (
    CATEGORY_LABELS,
    CATEGORY_ORDER,
    OverpassPoint,
    fetch_overpass_points,
    format_distance_label,
    haversine_distance_m,
    select_nearest_by_category,
)
from app.core.config import settings
from app.models.property import Property
from app.repositories import property_repository
from app.schemas.nearby_infrastructure import (
    NearbyInfrastructureItem,
    NearbyInfrastructureResponse,
)
from app.services import property_service


def _has_coordinates(property_item: Property) -> bool:
    latitude = property_item.latitude
    longitude = property_item.longitude
    return (
        latitude is not None
        and longitude is not None
        and float(latitude) == float(latitude)
        and float(longitude) == float(longitude)
    )


def _ensure_utc(value: datetime) -> datetime:
    if value.tzinfo is None:
        return value.replace(tzinfo=UTC)
    return value.astimezone(UTC)


def _cache_is_valid(property_item: Property, now: datetime) -> bool:
    if property_item.nearby_infrastructure_at is None:
        return False

    ttl = timedelta(days=settings.NEARBY_CACHE_TTL_DAYS)
    cached_at = _ensure_utc(property_item.nearby_infrastructure_at)
    return cached_at >= now - ttl


def _empty_response(property_id: int) -> NearbyInfrastructureResponse:
    return NearbyInfrastructureResponse(
        property_id=property_id,
        available=False,
        fetched_at=None,
        items=[],
    )


def _point_to_item(
    category: str,
    point: OverpassPoint,
    origin_latitude: float,
    origin_longitude: float,
) -> NearbyInfrastructureItem:
    distance_m = haversine_distance_m(
        origin_latitude,
        origin_longitude,
        point.latitude,
        point.longitude,
    )
    rounded_distance = max(0, int(round(distance_m)))
    label = CATEGORY_LABELS[category]
    name = point.name or label

    return NearbyInfrastructureItem(
        category=category,
        label=label,
        name=name,
        distance_m=rounded_distance,
        distance_label=format_distance_label(distance_m),
    )


def _items_from_cache_payload(
    payload: dict,
    origin_latitude: float,
    origin_longitude: float,
) -> list[NearbyInfrastructureItem]:
    raw_items = payload.get("items")
    if not isinstance(raw_items, list):
        return []

    items: list[NearbyInfrastructureItem] = []
    for raw_item in raw_items:
        if not isinstance(raw_item, dict):
            continue
        try:
            items.append(NearbyInfrastructureItem.model_validate(raw_item))
        except Exception:
            category = raw_item.get("category")
            if category not in CATEGORY_LABELS:
                continue
            distance_m = raw_item.get("distance_m")
            if not isinstance(distance_m, int):
                continue
            items.append(
                NearbyInfrastructureItem(
                    category=category,
                    label=CATEGORY_LABELS[category],
                    name=str(raw_item.get("name") or CATEGORY_LABELS[category]),
                    distance_m=distance_m,
                    distance_label=str(
                        raw_item.get("distance_label")
                        or format_distance_label(distance_m)
                    ),
                )
            )

    items.sort(key=lambda item: CATEGORY_ORDER.index(item.category))
    return items


def _serialize_items(items: list[NearbyInfrastructureItem]) -> dict:
    return {
        "items": [item.model_dump() for item in items],
    }


def _build_response_from_cache(
    property_item: Property,
    payload: dict,
) -> NearbyInfrastructureResponse:
    latitude = float(property_item.latitude)
    longitude = float(property_item.longitude)
    items = _items_from_cache_payload(payload, latitude, longitude)

    if not items:
        return _empty_response(property_item.id)

    return NearbyInfrastructureResponse(
        property_id=property_item.id,
        available=True,
        fetched_at=property_item.nearby_infrastructure_at,
        items=items,
    )


def _build_items_from_points(
    nearest_by_category: dict[str, OverpassPoint],
    origin_latitude: float,
    origin_longitude: float,
) -> list[NearbyInfrastructureItem]:
    items: list[NearbyInfrastructureItem] = []

    for category in CATEGORY_ORDER:
        point = nearest_by_category.get(category)
        if point is None:
            continue
        items.append(
            _point_to_item(category, point, origin_latitude, origin_longitude)
        )

    return items


async def get_nearby_infrastructure_for_property(
    db: Session,
    property_id: int,
    current_user=None,
) -> NearbyInfrastructureResponse:
    property_item = property_service.get_property_by_id_for_viewer(
        db,
        property_id,
        current_user,
    )

    if not _has_coordinates(property_item):
        return _empty_response(property_id)

    now = datetime.now(UTC)

    if (
        isinstance(property_item.nearby_infrastructure, dict)
        and _cache_is_valid(property_item, now)
    ):
        return _build_response_from_cache(
            property_item,
            property_item.nearby_infrastructure,
        )

    latitude = float(property_item.latitude)
    longitude = float(property_item.longitude)

    try:
        points = await fetch_overpass_points(latitude, longitude)
    except Exception:
        if isinstance(property_item.nearby_infrastructure, dict):
            cached = _build_response_from_cache(
                property_item,
                property_item.nearby_infrastructure,
            )
            if cached.available:
                return cached
        return _empty_response(property_id)

    nearest_by_category = select_nearest_by_category(points, latitude, longitude)
    items = _build_items_from_points(nearest_by_category, latitude, longitude)

    if not items:
        property_repository.clear_nearby_infrastructure_cache(db, property_item)
        return _empty_response(property_id)

    payload = _serialize_items(items)
    property_repository.save_nearby_infrastructure_cache(
        db,
        property_item,
        payload,
        now,
    )

    return NearbyInfrastructureResponse(
        property_id=property_id,
        available=True,
        fetched_at=now,
        items=items,
    )
