from datetime import datetime, UTC
from types import SimpleNamespace

import pytest

from app.core.telegram_username import normalize_telegram_username
from app.schemas.property import PropertyRealtorSummary, PropertyResponse
from app.schemas.realtor_profile import RealtorProfileUpdate
from app.services import property_service, realtor_profile_service


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
        "image_url": None,
        "status": "available",
        "contact_name": None,
        "phone": None,
        "whatsapp": None,
        "avatar_url": None,
        "last_verified_at": None,
        "report_count": 0,
        "latitude": None,
        "longitude": None,
        "images": [],
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def make_profile(**overrides):
    data = {
        "id": 1,
        "user_id": 10,
        "full_name": "Jane Agent",
        "phone": "+100",
        "whatsapp": "+200",
        "telegram_username": "janeagent",
        "agency_name": "Prime Realty",
        "avatar_url": "/uploads/avatar.jpg",
        "bio": None,
        "city": "City",
        "is_completed": True,
        "is_verified": True,
        "created_at": datetime(2024, 3, 15, tzinfo=UTC),
        "updated_at": datetime(2024, 3, 15, tzinfo=UTC),
    }
    data.update(overrides)
    return SimpleNamespace(**data)


@pytest.mark.parametrize(
    ("raw", "expected"),
    [
        ("username", "username"),
        ("@username", "username"),
        ("https://t.me/username", "username"),
        ("http://t.me/username", "username"),
        ("t.me/username", "username"),
        ("  @username  ", "username"),
        ("", None),
        (None, None),
    ],
)
def test_normalize_telegram_username_accepts_supported_forms(raw, expected):
    assert normalize_telegram_username(raw) == expected


@pytest.mark.parametrize(
    "raw",
    [
        "javascript:alert(1)",
        "https://evil.com/username",
        "https://t.me/user/name",
        "https://t.me/user?name=1",
        "https://t.me/user#frag",
        "user name",
        "usr",
        "1badstart",
    ],
)
def test_normalize_telegram_username_rejects_malformed_values(raw):
    with pytest.raises(ValueError):
        normalize_telegram_username(raw)


def test_realtor_profile_update_normalizes_telegram_username():
    update = RealtorProfileUpdate(telegram_username="@JaneAgent")

    assert update.telegram_username == "JaneAgent"


def test_realtor_profile_update_clears_empty_telegram_username():
    update = RealtorProfileUpdate(telegram_username="   ")

    assert update.telegram_username is None


def test_public_property_view_attaches_nested_realtor_summary(monkeypatch):
    property_item = make_property(owner_id=10, status="available")
    profile = make_profile()

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )
    monkeypatch.setattr(
        property_service.realtor_profile_repository,
        "get_by_user_id",
        lambda db, user_id: profile,
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "count_available_by_owner_id",
        lambda db, owner_id: 2,
    )

    result = property_service.get_property_by_id_for_viewer(
        FakeDb(),
        1,
        current_user=None,
    )

    assert result.contact_name == "Jane Agent"
    assert result.realtor.user_id == 10
    assert result.realtor.full_name == "Jane Agent"
    assert result.realtor.agency_name == "Prime Realty"
    assert result.realtor.is_verified is True
    assert result.realtor.active_listings_count == 2
    assert result.realtor.telegram_username == "janeagent"
    assert result.realtor.member_since == profile.created_at

    serialized = PropertyResponse.model_validate(result)
    assert serialized.realtor is not None
    assert serialized.realtor.agency_name == "Prime Realty"
    assert serialized.realtor.is_verified is True


def test_public_property_view_allows_null_agency(monkeypatch):
    property_item = make_property(owner_id=10, status="available")
    profile = make_profile(agency_name=None, is_verified=False)

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )
    monkeypatch.setattr(
        property_service.realtor_profile_repository,
        "get_by_user_id",
        lambda db, user_id: profile,
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "count_available_by_owner_id",
        lambda db, owner_id: 0,
    )

    result = property_service.get_property_by_id_for_viewer(
        FakeDb(),
        1,
        current_user=None,
    )

    assert result.realtor.agency_name is None
    assert result.realtor.is_verified is False
    assert result.realtor.active_listings_count == 0


def test_active_listings_count_uses_available_status_only(monkeypatch):
    captured = {}

    class FakeQuery:
        def filter(self, *args, **kwargs):
            captured["filters"] = args
            return self

        def count(self):
            return 3

    class FakeDbForCount:
        def query(self, model):
            captured["model"] = model
            return FakeQuery()

    from app.repositories import property_repository

    count = property_repository.count_available_by_owner_id(
        FakeDbForCount(),
        10,
    )

    assert count == 3
    assert captured["filters"][0].right.value == 10
    assert captured["filters"][1].right.value == "available"


def test_realtor_profile_update_uses_authenticated_user_id(monkeypatch):
    profile = make_profile(telegram_username=None)
    updates = []

    def fake_get_or_create(db, user_id):
        assert user_id == 42
        return profile

    def fake_update(db, current_profile, profile_update):
        updates.append((current_profile, profile_update))
        current_profile.telegram_username = profile_update.telegram_username
        return current_profile

    monkeypatch.setattr(
        realtor_profile_service,
        "get_or_create_profile",
        fake_get_or_create,
    )
    monkeypatch.setattr(
        realtor_profile_service.realtor_profile_repository,
        "update_profile",
        fake_update,
    )

    update = RealtorProfileUpdate(telegram_username="newagent")
    result = realtor_profile_service.update_profile(
        FakeDb(),
        42,
        update,
    )

    assert result.telegram_username == "newagent"
    assert updates


def test_property_realtor_summary_schema_serializes_expected_fields():
    summary = PropertyRealtorSummary.model_validate(
        SimpleNamespace(
            user_id=10,
            full_name="Jane Agent",
            agency_name=None,
            avatar_url="/uploads/avatar.jpg",
            is_verified=False,
            member_since=datetime(2024, 1, 1, tzinfo=UTC),
            active_listings_count=1,
            telegram_username=None,
        )
    )

    assert summary.user_id == 10
    assert summary.agency_name is None
    assert summary.is_verified is False
    assert summary.telegram_username is None
