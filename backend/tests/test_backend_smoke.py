from sqlalchemy.engine import Engine
from sqlalchemy.orm import sessionmaker


def test_backend_settings_load_from_safe_placeholders():
    from app.core.config import settings

    assert settings.ALGORITHM == "HS256"
    assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 30
    assert settings.DATABASE_URL.startswith("sqlite://")


def test_database_module_is_structurally_available_without_connection():
    from app.database.database import Base, SessionLocal, engine, get_db

    assert isinstance(engine, Engine)
    assert engine.url.get_backend_name() == "sqlite"
    assert engine.url.database == ":memory:"
    assert isinstance(SessionLocal, sessionmaker)
    assert SessionLocal.kw["bind"] is engine
    assert Base.metadata is not None
    assert callable(get_db)
