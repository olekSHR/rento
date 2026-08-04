from types import SimpleNamespace

import pytest

from app.core.exceptions import BadRequestException, ForbiddenException
from app.services import property_service


class FakeDb:
    pass


def make_property(**overrides):
    data = {
        "id": 1,
        "owner_id": 10,
        "title": "Test listing",
        "description": "Description",
        "price": 1000,
        "city": "City",
        "rooms": 2,
        "image_url": "/uploads/test.jpg",
        "status": "available",
        "contact_name": "Contact",
        "phone": "+100",
        "whatsapp": "+200",
        "last_verified_at": None,
        "report_count": 0,
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def make_user(**overrides):
    data = {
        "id": 10,
        "role": "realtor",
        "account_status": "active",
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def test_realtor_can_archive_own_available_listing(monkeypatch):
    property_item = make_property(status="available", owner_id=10)
    realtor = make_user(id=10, role="realtor")

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    def fake_update_status(db, item, status, *, update_verified_at=False):
        item.status = status
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        fake_update_status,
    )

    property_service.ensure_property_mutation_allowed(property_item, realtor)
    result = property_service.archive_property(FakeDb(), 1, actor_user_id=10)

    assert result.status == "archived"


def test_realtor_cannot_archive_other_realtor_listing():
    property_item = make_property(status="available", owner_id=99)
    realtor = make_user(id=10, role="realtor")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, realtor)


def test_user_role_cannot_mutate_listing():
    property_item = make_property(status="available", owner_id=10)
    user = make_user(id=10, role="user")

    with pytest.raises(ForbiddenException):
        property_service.ensure_property_mutation_allowed(property_item, user)


def test_realtor_can_restore_own_archived_listing(monkeypatch):
    property_item = make_property(status="archived", owner_id=10)
    realtor = make_user(id=10, role="realtor")

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    def fake_update_status(db, item, status, *, update_verified_at=False):
        item.status = status
        if update_verified_at:
            item.last_verified_at = "verified-now"
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        fake_update_status,
    )

    property_service.ensure_property_mutation_allowed(property_item, realtor)
    result = property_service.activate_property(FakeDb(), 1, actor_user_id=10)

    assert result.status == "available"
    assert result.last_verified_at == "verified-now"


def test_non_archived_delete_is_rejected():
    property_item = make_property(status="available", owner_id=10)
    realtor = make_user(id=10, role="realtor")

    property_service.ensure_property_mutation_allowed(property_item, realtor)

    with pytest.raises(BadRequestException, match="Only archived listings"):
        if property_item.status != property_service.PROPERTY_STATUS_ARCHIVED:
            raise BadRequestException(
                "Only archived listings can be permanently deleted"
            )


def test_archived_delete_allowed_for_owner(monkeypatch):
    property_item = make_property(status="archived", owner_id=10)
    realtor = make_user(id=10, role="realtor")
    delete_calls = []

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "delete_property",
        lambda db, item: delete_calls.append(item),
    )

    property_service.ensure_property_mutation_allowed(property_item, realtor)

    assert property_item.status == property_service.PROPERTY_STATUS_ARCHIVED
    property_service.delete_property(FakeDb(), 1, actor_user_id=10)

    assert delete_calls == [property_item]


def test_archive_rejects_non_available_listing(monkeypatch):
    property_item = make_property(status="pending", owner_id=10)

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    with pytest.raises(BadRequestException, match="Only available listings"):
        property_service.archive_property(FakeDb(), 1)
