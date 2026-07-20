import os
import sys
from pathlib import Path

from pydantic_settings.sources.providers.dotenv import DotEnvSettingsSource


BACKEND_ROOT = Path(__file__).resolve().parents[1]

if str(BACKEND_ROOT) not in sys.path:
    sys.path.insert(0, str(BACKEND_ROOT))


PLACEHOLDER_ENV = {
    "DATABASE_URL": "sqlite:///:memory:",
    "SECRET_KEY": "iwp009-placeholder-secret-key-not-real",
    "ALGORITHM": "HS256",
    "ACCESS_TOKEN_EXPIRE_MINUTES": "30",
}


def _disable_dotenv_settings_source() -> None:
    def empty_dotenv_source(self):
        return {}

    DotEnvSettingsSource._read_env_files = empty_dotenv_source
    DotEnvSettingsSource.__call__ = empty_dotenv_source


_disable_dotenv_settings_source()


for key, value in PLACEHOLDER_ENV.items():
    os.environ[key] = value
