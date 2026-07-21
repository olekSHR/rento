from types import SimpleNamespace

import pytest

from app.core.exceptions import ForbiddenException, NotFoundException
from app.repositories import admin_user_repository, property_repository
from app.routers import (
    admin_users,
    favorites,
    properties,
    realtor_applications,
    realtor_profiles,
)
from app.schemas.favorite import FavoriteListResponse, FavoriteResponse
from app.schemas.property import PropertyImageResponse
from app.services import admin_user_service, property_service


def _route_by_path(router, path: str, method: str):
    for route in router.routes:
        if route.path == path and method in route.methods:
            return route

    raise AssertionError(f"Route {method} {path} not found")


def test_favorites_routes_declare_response_models():
    assert (
        _route_by_path(favorites.router, "/favorites/{property_id}", "POST").response_model
        is FavoriteResponse
    )
    assert (
        _route_by_path(favorites.router, "/favorites/", "GET").response_model
        is FavoriteListResponse
    )


def test_property_image_sort_route_declares_response_model():
    route = _route_by_path(
        properties.router,
        "/properties/{property_id}/images/{image_id}/sort-order",
        "PATCH",
    )

    assert route.response_model is PropertyImageResponse


def test_favorite_response_schema_serializes_orm_shape():
    favorite = SimpleNamespace(
        id=1,
        user_id=10,
        property_id=20,
    )

    result = FavoriteResponse.model_validate(favorite)

    assert result.model_dump() == {
        "id": 1,
        "user_id": 10,
        "property_id": 20,
    }


def test_realtor_applications_list_contract_uses_limit_offset(monkeypatch):
    applications = [
        SimpleNamespace(id=1),
        SimpleNamespace(id=2),
        SimpleNamespace(id=3),
    ]

    monkeypatch.setattr(
        realtor_applications.realtor_application_service,
        "list_applications",
        lambda db, status: applications,
    )

    result = realtor_applications.list_realtor_applications(
        status="pending",
        limit=1,
        offset=1,
        db=object(),
        current_user=SimpleNamespace(role="admin"),
    )

    assert result == {
        "items": [applications[1]],
        "total": 3,
        "limit": 1,
        "offset": 1,
    }


def test_admin_users_route_exposes_limit_offset_without_page():
    route = _route_by_path(
        admin_users.router,
        "/admin/users",
        "GET",
    )
    query_param_names = {
        param.name
        for param in route.dependant.query_params
    }

    assert "limit" in query_param_names
    assert "offset" in query_param_names
    assert "page" not in query_param_names


def test_admin_users_router_forwards_limit_offset_and_filters(monkeypatch):
    calls = []

    def fake_list_users(
        db,
        limit,
        offset,
        *,
        q=None,
        role=None,
        application_status=None,
    ):
        calls.append(
            {
                "limit": limit,
                "offset": offset,
                "q": q,
                "role": role,
                "application_status": application_status,
            }
        )
        return {
            "items": [],
            "total": 0,
            "limit": limit,
            "offset": offset,
        }

    monkeypatch.setattr(
        admin_users.admin_user_service,
        "list_users",
        fake_list_users,
    )

    result = admin_users.list_admin_users(
        limit=25,
        offset=50,
        q="alice",
        role="realtor",
        application_status="approved",
        db=object(),
        current_user=SimpleNamespace(role="admin"),
    )

    assert result == {
        "items": [],
        "total": 0,
        "limit": 25,
        "offset": 50,
    }
    assert calls == [
        {
            "limit": 25,
            "offset": 50,
            "q": "alice",
            "role": "realtor",
            "application_status": "approved",
        }
    ]
    assert "page" not in result


def test_admin_user_service_preserves_filters_and_offset_metadata(monkeypatch):
    calls = []
    row = SimpleNamespace(
        id=1,
        email="agent@example.com",
        role="realtor",
        profile_full_name="Agent Smith",
        application_full_name=None,
        application_status="approved",
        listings_count=2,
        is_verified=True,
        account_status="active",
    )

    def fake_list_users(
        db,
        limit,
        offset,
        *,
        q=None,
        role=None,
        application_status=None,
    ):
        calls.append(
            {
                "limit": limit,
                "offset": offset,
                "q": q,
                "role": role,
                "application_status": application_status,
            }
        )
        return {
            "rows": [row],
            "total": 1,
            "limit": limit,
            "offset": offset,
        }

    monkeypatch.setattr(
        admin_user_service.admin_user_repository,
        "list_users",
        fake_list_users,
    )

    result = admin_user_service.list_users(
        object(),
        10,
        20,
        q=" agent ",
        role="realtor",
        application_status="approved",
    )

    assert result["total"] == 1
    assert result["limit"] == 10
    assert result["offset"] == 20
    assert "page" not in result
    assert calls == [
        {
            "limit": 10,
            "offset": 20,
            "q": "agent",
            "role": "realtor",
            "application_status": "approved",
        }
    ]


def test_admin_user_repository_applies_offset_limit_filters_and_ordering(
    monkeypatch,
):
    calls = {
        "filters": [],
        "row_order_by": [],
        "row_offset": [],
        "row_limit": [],
    }

    class FakeCountQuery:
        def order_by(self, value):
            return self

        def with_entities(self, value):
            return self

        def scalar(self):
            return 3

    class FakeRowsQuery:
        def order_by(self, value):
            calls["row_order_by"].append(value)
            return self

        def offset(self, value):
            calls["row_offset"].append(value)
            return self

        def limit(self, value):
            calls["row_limit"].append(value)
            return self

        def all(self):
            return ["row"]

    build_calls = []

    def fake_build_list_users_query(db):
        build_calls.append(db)

        if len(build_calls) == 1:
            return FakeCountQuery(), "LatestApplication"

        return FakeRowsQuery(), "LatestApplication"

    def fake_apply_filters(query, latest_application, **filters):
        calls["filters"].append(filters)
        return query

    monkeypatch.setattr(
        admin_user_repository,
        "_build_list_users_query",
        fake_build_list_users_query,
    )
    monkeypatch.setattr(
        admin_user_repository,
        "_apply_filters",
        fake_apply_filters,
    )

    result = admin_user_repository.list_users(
        object(),
        10,
        20,
        q="agent",
        role="realtor",
        application_status="approved",
    )

    assert result == {
        "rows": ["row"],
        "total": 3,
        "limit": 10,
        "offset": 20,
    }
    assert calls["filters"] == [
        {
            "q": "agent",
            "role": "realtor",
            "application_status": "approved",
        },
        {
            "q": "agent",
            "role": "realtor",
            "application_status": "approved",
        },
    ]
    assert len(calls["row_order_by"]) == 1
    assert calls["row_offset"] == [20]
    assert calls["row_limit"] == [10]


def test_require_realtor_uses_project_error_envelope_path():
    with pytest.raises(ForbiddenException):
        realtor_profiles.require_realtor(
            SimpleNamespace(role="user")
        )


def test_property_image_create_uses_service_and_repository(monkeypatch):
    calls = []
    property_item = SimpleNamespace(id=1, owner_id=10)
    image_data = SimpleNamespace(
        url="/uploads/image.jpg",
        is_cover=True,
        sort_order=2,
    )

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    def fake_create_property_image(db, property_id, url, is_cover, sort_order):
        calls.append((property_id, url, is_cover, sort_order))
        return SimpleNamespace(id=5)

    monkeypatch.setattr(
        property_service.property_repository,
        "create_property_image",
        fake_create_property_image,
    )

    result = property_service.add_property_image(
        object(),
        1,
        image_data,
        SimpleNamespace(id=10, role="realtor"),
    )

    assert result.id == 5
    assert calls == [(1, "/uploads/image.jpg", True, 2)]


def test_property_image_missing_raises_project_not_found(monkeypatch):
    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: SimpleNamespace(id=1, owner_id=10),
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_image",
        lambda db, property_id, image_id: None,
    )

    with pytest.raises(NotFoundException):
        property_service.update_property_image_sort_order(
            object(),
            1,
            99,
            3,
            SimpleNamespace(id=10, role="realtor"),
        )


def test_property_image_repository_rolls_back_failed_create():
    class FakeQuery:
        def filter(self, *args):
            return self

        def update(self, values):
            return None

    class FakeDb:
        def __init__(self):
            self.rolled_back = False

        def query(self, model):
            return FakeQuery()

        def add(self, item):
            return None

        def commit(self):
            raise RuntimeError("commit failed")

        def rollback(self):
            self.rolled_back = True

    db = FakeDb()

    with pytest.raises(RuntimeError):
        property_repository.create_property_image(
            db,
            1,
            "/uploads/image.jpg",
            True,
            0,
        )

    assert db.rolled_back is True
