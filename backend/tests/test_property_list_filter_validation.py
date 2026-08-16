import pytest
from fastapi.testclient import TestClient
from sqlalchemy import event
from sqlalchemy.engine import Engine

from app.database.database import Base, SessionLocal, engine
from app.models.property import Property


@event.listens_for(Engine, "connect")
def _set_sqlite_foreign_keys(dbapi_connection, connection_record):
    if engine.url.get_backend_name() == "sqlite":
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()


@pytest.fixture(autouse=True)
def reset_database():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def api_client():
    from app.main import app

    with TestClient(app) as client:
        yield client


INVALID_FILTER_CASES = [
    pytest.param({"rooms": 0}, id="rooms=0"),
    pytest.param({"rooms": -1}, id="rooms=-1"),
    pytest.param({"min_price": 0}, id="min_price=0"),
    pytest.param({"min_price": -1}, id="min_price=-1"),
    pytest.param({"max_price": 0}, id="max_price=0"),
    pytest.param({"max_price": -1}, id="max_price=-1"),
]


BOUNDARY_VALID_FILTER_CASES = [
    pytest.param({"rooms": 1}, id="rooms=1"),
    pytest.param({"min_price": 1}, id="min_price=1"),
    pytest.param({"max_price": 1}, id="max_price=1"),
]


@pytest.mark.parametrize("params", INVALID_FILTER_CASES)
def test_public_properties_rejects_out_of_domain_filter_values(
    api_client,
    db_session,
    params,
):
    response = api_client.get("/properties/", params=params)

    assert response.status_code == 422


@pytest.mark.parametrize("params", BOUNDARY_VALID_FILTER_CASES)
def test_public_properties_accepts_boundary_valid_filter_values(
    api_client,
    db_session,
    params,
):
    response = api_client.get("/properties/", params=params)

    assert response.status_code != 422


def test_property_list_rejects_inverted_price_range(api_client, db_session):
    response = api_client.get(
        "/properties/",
        params={"min_price": 5000, "max_price": 1000},
    )

    assert response.status_code == 422


VALID_PRICE_RANGE_CASES = [
    pytest.param({"min_price": 1000, "max_price": 5000}, id="min<max"),
    pytest.param({"min_price": 1000, "max_price": 1000}, id="min==max"),
    pytest.param({"min_price": 1000}, id="min-only"),
    pytest.param({"max_price": 5000}, id="max-only"),
]


@pytest.mark.parametrize("params", VALID_PRICE_RANGE_CASES)
def test_public_properties_accepts_valid_price_ranges(
    api_client,
    db_session,
    params,
):
    response = api_client.get("/properties/", params=params)

    assert response.status_code == 200
