from types import SimpleNamespace

import pytest

from app.core.exceptions import BadRequestException, ForbiddenException, NotFoundException
from app.core.security import dependencies
from app.repositories import property_repository
from app.schemas.property import PropertyCreate, PropertyUpdate
from app.services import (
    account_status_service,
    property_service,
    realtor_application_service,
)


class FakeDb:
    def __init__(self):
        self.adds = []
        self.commits = 0
        self.refreshes = []
        self.rollbacks = 0

    def add(self, item):
        self.adds.append(item)

    def commit(self):
        self.commits += 1

    def refresh(self, item):
        self.refreshes.append(item)

    def rollback(self):
        self.rollbacks += 1


def make_property(**overrides):
    data = {
        "id": 1,
        "owner_id": 10,
        "title": "Old title",
        "description": "Old description",
        "price": 1000,
        "city": "City",
        "rooms": 2,
        "image_url": "old.jpg",
        "status": "pending",
        "contact_name": "Original Contact",
        "phone": "+100",
        "whatsapp": "+200",
        "avatar_url": None,
        "last_verified_at": "unchanged",
        "report_count": 0,
    }
    data.update(overrides)
    return SimpleNamespace(**data)


def make_property_data(**overrides):
    data = {
        "title": "New title",
        "description": "New description",
        "price": 2000,
        "city": "New City",
        "rooms": 3,
        "image_url": "new.jpg",
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


def test_role_guards_allow_realtor_boundary_and_admin_boundary():
    realtor = make_user(role="realtor")
    admin = make_user(id=1, role="admin")

    assert dependencies.require_admin_or_realtor(realtor) is realtor
    assert dependencies.require_admin(admin) is admin
    assert dependencies.require_admin_or_realtor(admin) is admin


def test_role_guard_denies_ordinary_user():
    ordinary_user = make_user(role="user")

    with pytest.raises(ForbiddenException):
        dependencies.require_admin_or_realtor(ordinary_user)

    with pytest.raises(ForbiddenException):
        dependencies.require_admin(ordinary_user)


def test_user_role_denied_before_property_mutation(monkeypatch):
    calls = []
    property_item = make_property(owner_id=10, status="pending")
    property_data = make_property_data()
    ordinary_user = make_user(id=10, role="user")

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        lambda *args, **kwargs: calls.append((args, kwargs)),
    )

    with pytest.raises(ForbiddenException):
        property_service.update_property(
            FakeDb(),
            property_item,
            property_data,
            ordinary_user,
        )

    assert calls == []


def test_active_account_remains_eligible_for_authorized_property_mutation(monkeypatch):
    calls = []
    property_item = make_property(owner_id=10, status="pending")
    property_data = make_property_data()
    realtor = make_user(id=10, role="realtor", account_status="active")

    def fake_update_property(db, item, title, description, price, city, rooms, image_url):
        calls.append((item, title, description, price, city, rooms, image_url))
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        fake_update_property,
    )

    account_status_service.assert_can_authenticate(realtor)
    property_service.update_property(
        FakeDb(),
        property_item,
        property_data,
        realtor,
    )

    assert len(calls) == 1


@pytest.mark.parametrize("account_status", ["suspended", "blocked"])
def test_inactive_account_denied_before_property_mutation(
    monkeypatch,
    account_status,
):
    calls = []
    property_item = make_property(owner_id=10, status="pending")
    property_data = make_property_data()
    realtor = make_user(
        id=10,
        role="realtor",
        account_status=account_status,
    )

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        lambda *args, **kwargs: calls.append((args, kwargs)),
    )

    with pytest.raises(ForbiddenException):
        account_status_service.assert_can_authenticate(realtor)
        property_service.update_property(
            FakeDb(),
            property_item,
            property_data,
            realtor,
        )

    assert calls == []


def test_realtor_own_property_mutation_is_allowed(monkeypatch):
    calls = []
    property_item = make_property(owner_id=10, status="pending")
    property_data = make_property_data()
    realtor = make_user(id=10, role="realtor")

    def fake_update_property(db, item, title, description, price, city, rooms, image_url):
        calls.append((item, title, description, price, city, rooms, image_url))
        item.title = title
        item.description = description
        item.price = price
        item.city = city
        item.rooms = rooms
        item.image_url = image_url
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        fake_update_property,
    )

    result = property_service.update_property(
        FakeDb(),
        property_item,
        property_data,
        realtor,
    )

    assert result.title == "New title"
    assert len(calls) == 1


def test_cross_owner_realtor_mutation_is_denied_before_persistence(monkeypatch):
    calls = []
    property_item = make_property(owner_id=99, status="pending")
    property_data = make_property_data()
    realtor = make_user(id=10, role="realtor")

    def fake_update_property(*args, **kwargs):
        calls.append((args, kwargs))

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        fake_update_property,
    )

    with pytest.raises(ForbiddenException):
        property_service.update_property(
            FakeDb(),
            property_item,
            property_data,
            realtor,
        )

    assert calls == []


def test_admin_authorized_property_mutation_remains_explicit(monkeypatch):
    calls = []
    property_item = make_property(owner_id=10, status="pending")
    property_data = make_property_data()
    admin = make_user(id=1, role="admin")

    def fake_update_property(db, item, title, description, price, city, rooms, image_url):
        calls.append((item, title, description, price, city, rooms, image_url))
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        fake_update_property,
    )

    property_service.update_property(
        FakeDb(),
        property_item,
        property_data,
        admin,
    )

    assert len(calls) == 1


def test_realtor_mutation_cannot_control_protected_status_or_contacts(monkeypatch):
    property_item = make_property(
        owner_id=10,
        status="pending",
        contact_name="Profile Contact",
        phone="+100",
        whatsapp="+200",
    )
    property_data = make_property_data(
        status="available",
        contact_name="Client Contact",
        phone="+999",
        whatsapp="+888",
    )
    realtor = make_user(id=10, role="realtor")

    def fake_update_property(db, item, title, description, price, city, rooms, image_url):
        item.title = title
        item.description = description
        item.price = price
        item.city = city
        item.rooms = rooms
        item.image_url = image_url
        return item

    monkeypatch.setattr(
        property_service.property_repository,
        "update_property",
        fake_update_property,
    )

    result = property_service.update_property(
        FakeDb(),
        property_item,
        property_data,
        realtor,
    )

    assert result.status == "pending"
    assert result.contact_name == "Profile Contact"
    assert result.phone == "+100"
    assert result.whatsapp == "+200"


def test_realtor_create_uses_current_user_profile_not_client_protected_fields(monkeypatch):
    calls = []
    realtor = make_user(id=10, role="realtor")
    property_data = make_property_data(
        status="available",
        owner_id=99,
        contact_name="Client Contact",
        phone="+999",
        whatsapp="+888",
    )
    profile = SimpleNamespace(
        is_completed=True,
        full_name="Profile Contact",
        phone="+100",
        whatsapp="+200",
    )

    monkeypatch.setattr(
        property_service.realtor_profile_repository,
        "get_by_user_id",
        lambda db, user_id: profile,
    )

    def fake_create_property(
        db,
        title,
        description,
        price,
        city,
        rooms,
        owner_id=None,
        image_url=None,
        status="available",
        contact_name=None,
        phone=None,
        whatsapp=None,
        latitude=None,
        longitude=None,
    ):
        calls.append(
            {
                "owner_id": owner_id,
                "status": status,
                "contact_name": contact_name,
                "phone": phone,
                "whatsapp": whatsapp,
            }
        )
        return make_property(
            owner_id=owner_id,
            status=status,
            contact_name=contact_name,
            phone=phone,
            whatsapp=whatsapp,
        )

    monkeypatch.setattr(
        property_service.property_repository,
        "create_property",
        fake_create_property,
    )

    result = property_service.create_property(
        FakeDb(),
        property_data,
        realtor,
    )

    assert result.owner_id == 10
    assert result.status == "pending"
    assert result.contact_name == "Profile Contact"
    assert result.phone == "+100"
    assert result.whatsapp == "+200"
    assert calls == [
        {
            "owner_id": 10,
            "status": "pending",
            "contact_name": "Profile Contact",
            "phone": "+100",
            "whatsapp": "+200",
        }
    ]


def test_pending_property_create_does_not_set_last_verified_at():
    db = FakeDb()

    result = property_repository.create_property(
        db,
        "Pending listing",
        "Pending listing description",
        1000,
        "City",
        2,
        owner_id=10,
        status="pending",
    )

    assert result.last_verified_at is None
    assert db.adds == [result]
    assert db.commits == 1
    assert db.refreshes == [result]


def test_explicit_valid_verification_sets_last_verified_at(monkeypatch):
    property_item = make_property(
        status="pending",
        last_verified_at=None,
    )

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )

    result = property_service.verify_property(FakeDb(), 1)

    assert result.status == "available"
    assert result.last_verified_at is not None


@pytest.mark.parametrize(
    ("operation", "source_status", "target_status"),
    [
        (property_service.verify_property, "pending", "available"),
        (property_service.archive_property, "available", "archived"),
        (property_service.activate_property, "archived", "available"),
    ],
)
def test_valid_moderation_transitions_succeed(
    monkeypatch,
    operation,
    source_status,
    target_status,
):
    property_item = make_property(status=source_status)

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

    result = operation(FakeDb(), 1)

    assert result.status == target_status


@pytest.mark.parametrize(
    ("operation", "invalid_status"),
    [
        (property_service.verify_property, "available"),
        (property_service.archive_property, "pending"),
        (property_service.activate_property, "pending"),
    ],
)
def test_invalid_moderation_transitions_are_denied(monkeypatch, operation, invalid_status):
    property_item = make_property(status=invalid_status)
    calls = []

    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: property_item,
    )
    monkeypatch.setattr(
        property_service.property_repository,
        "update_property_status",
        lambda *args, **kwargs: calls.append((args, kwargs)),
    )

    with pytest.raises(BadRequestException):
        operation(FakeDb(), 1)

    assert calls == []


def test_public_property_view_is_available_only(monkeypatch):
    monkeypatch.setattr(
        property_service.property_repository,
        "get_property_by_id",
        lambda db, property_id: make_property(status="reserved"),
    )

    with pytest.raises(NotFoundException):
        property_service.get_property_by_id_for_viewer(
            FakeDb(),
            1,
            current_user=None,
        )


def test_public_listing_repository_filters_available_only(monkeypatch):
    filters = []

    class FakeColumn:
        def __init__(self, name):
            self.name = name

        def __eq__(self, other):
            return ("eq", self.name, other)

        def ilike(self, value):
            return ("ilike", self.name, value)

        def desc(self):
            return ("desc", self.name)

        def asc(self):
            return ("asc", self.name)

    class FakeQuery:
        def filter(self, expression):
            filters.append(expression)
            return self

        def order_by(self, expression):
            return self

        def count(self):
            return 0

        def limit(self, value):
            return self

        def offset(self, value):
            return self

        def all(self):
            return []

    class FakeDbForListing:
        def query(self, model):
            return FakeQuery()

    fake_models = SimpleNamespace(
        Property=SimpleNamespace(
            status=FakeColumn("status"),
            city=FakeColumn("city"),
            price=FakeColumn("price"),
            rooms=FakeColumn("rooms"),
            created_at=FakeColumn("created_at"),
        )
    )

    monkeypatch.setattr(property_repository, "models", fake_models)

    result = property_repository.get_all_properties(FakeDbForListing())

    assert result["items"] == []
    assert ("eq", "status", "available") in filters
    assert ("eq", "status", "reserved") not in filters


def test_generic_property_update_does_not_alter_last_verified_at():
    db = FakeDb()
    property_item = make_property(last_verified_at="original")

    property_repository.update_property(
        db,
        property_item,
        "New title",
        "New description",
        2000,
        "New City",
        3,
        "new.jpg",
    )

    assert property_item.last_verified_at == "original"
    assert db.commits == 1
    assert db.refreshes == [property_item]


def test_property_schemas_ignore_client_supplied_protected_fields():
    create_schema = PropertyCreate(
        title="Valid title",
        description="Valid long description",
        price=1000,
        city="City",
        rooms=2,
        status="available",
        contact_name="Client Contact",
        phone="+999",
        whatsapp="+888",
    )
    update_schema = PropertyUpdate(
        title="Valid title",
        description="Valid long description",
        price=1000,
        city="City",
        rooms=2,
        status="available",
        contact_name="Client Contact",
        phone="+999",
        whatsapp="+888",
    )

    assert not hasattr(create_schema, "status")
    assert not hasattr(create_schema, "contact_name")
    assert not hasattr(create_schema, "phone")
    assert not hasattr(create_schema, "whatsapp")
    assert not hasattr(update_schema, "status")
    assert not hasattr(update_schema, "contact_name")
    assert not hasattr(update_schema, "phone")
    assert not hasattr(update_schema, "whatsapp")


def test_realtor_application_pending_approved_promotes_role(monkeypatch):
    application = SimpleNamespace(id=1, user_id=10, status="pending")
    admin = make_user(id=1, role="admin")
    calls = []
    db = FakeDb()

    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "get_by_id",
        lambda db, application_id: application,
    )
    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "update_review",
        lambda *args, **kwargs: calls.append(("review", args, kwargs)),
    )
    monkeypatch.setattr(
        realtor_application_service.user_service,
        "update_user_role",
        lambda *args, **kwargs: calls.append(("role", args, kwargs)),
    )

    result = realtor_application_service.review_application(
        db,
        1,
        "approved",
        admin,
    )

    assert result is application
    assert calls[0][0] == "review"
    assert calls[1][0] == "role"
    assert calls[1][1][2] == "realtor"
    assert db.commits == 1
    assert db.refreshes == [application]


def test_realtor_application_pending_rejected_does_not_promote_role(monkeypatch):
    application = SimpleNamespace(id=1, user_id=10, status="pending")
    admin = make_user(id=1, role="admin")
    calls = []

    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "get_by_id",
        lambda db, application_id: application,
    )

    def fake_update_review(db, item, status, admin_user_id, reviewed_at):
        calls.append(("review", status, admin_user_id))
        item.status = status
        return item

    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "update_review",
        fake_update_review,
    )
    monkeypatch.setattr(
        realtor_application_service.user_service,
        "update_user_role",
        lambda *args, **kwargs: calls.append(("role", args, kwargs)),
    )

    result = realtor_application_service.review_application(
        FakeDb(),
        1,
        "rejected",
        admin,
    )

    assert result.status == "rejected"
    assert calls == [("review", "rejected", 1)]


@pytest.mark.parametrize("target_status", ["pending", "blocked", "realtor"])
def test_realtor_application_invalid_target_is_denied(monkeypatch, target_status):
    application = SimpleNamespace(id=1, user_id=10, status="pending")
    calls = []

    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "get_by_id",
        lambda db, application_id: application,
    )
    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "update_review",
        lambda *args, **kwargs: calls.append(("review", args, kwargs)),
    )
    monkeypatch.setattr(
        realtor_application_service.user_service,
        "update_user_role",
        lambda *args, **kwargs: calls.append(("role", args, kwargs)),
    )

    with pytest.raises(BadRequestException):
        realtor_application_service.review_application(
            FakeDb(),
            1,
            target_status,
            make_user(id=1, role="admin"),
        )

    assert calls == []


def test_realtor_application_non_pending_source_is_denied(monkeypatch):
    application = SimpleNamespace(id=1, user_id=10, status="approved")
    calls = []

    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "get_by_id",
        lambda db, application_id: application,
    )
    monkeypatch.setattr(
        realtor_application_service.realtor_application_repository,
        "update_review",
        lambda *args, **kwargs: calls.append(("review", args, kwargs)),
    )
    monkeypatch.setattr(
        realtor_application_service.user_service,
        "update_user_role",
        lambda *args, **kwargs: calls.append(("role", args, kwargs)),
    )

    with pytest.raises(BadRequestException):
        realtor_application_service.review_application(
            FakeDb(),
            1,
            "approved",
            make_user(id=1, role="admin"),
        )

    assert calls == []
