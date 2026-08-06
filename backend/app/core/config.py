from pydantic import Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str = Field(..., repr=False)

    SECRET_KEY: str = Field(..., repr=False)

    ALGORITHM: str = Field(...)

    ACCESS_TOKEN_EXPIRE_MINUTES: int = Field(...)

    OPENAI_API_KEY: str | None = Field(default=None, repr=False)

    PASSWORD_RESET_EXPIRE_MINUTES: int = 30

    FRONTEND_URL: str = "http://localhost:3000"

    EMAIL_PROVIDER: str = "console"

    RESEND_API_KEY: str | None = Field(default=None, repr=False)

    RESEND_FROM_EMAIL: str | None = None

    RESEND_FROM_NAME: str = "Rento"

    RATE_LIMIT_ENABLED: bool = True

    RATE_LIMIT_TRUST_PROXY_HEADERS: bool = True

    RATE_LIMIT_STORAGE_URI: str = Field(default="memory://", repr=False)

    RATE_LIMIT_LOGIN: str = "5/minute"

    RATE_LIMIT_FORGOT_PASSWORD: str = "3/15minute"

    RATE_LIMIT_UPLOAD: str = "20/minute"

    RATE_LIMIT_VIEWING_REQUEST: str = "10/hour"

    MAX_DOCUMENT_UPLOAD_BYTES: int = 15 * 1024 * 1024

    ENABLE_API_DOCS: bool = False

    SESSION_COOKIE_NAME: str = "rento_session"

    SESSION_IDLE_TIMEOUT_MINUTES: int = 30

    SESSION_ABSOLUTE_TIMEOUT_MINUTES: int = 1440

    SESSION_COOKIE_SECURE: bool = False

    SESSION_COOKIE_SAMESITE: str = "lax"

    CSRF_COOKIE_NAME: str = "rento_csrf"

    CSRF_HEADER_NAME: str = "X-CSRF-Token"

    OVERPASS_API_URL: str = "https://overpass-api.de/api/interpreter"

    OVERPASS_USER_AGENT: str = (
        "Rento/1.0 (https://rentonow.ro; nearby-infrastructure)"
    )

    NEARBY_CACHE_TTL_DAYS: int = 30

    NEARBY_SEARCH_RADIUS_M: int = 1500

    OVERPASS_TIMEOUT_S: float = 8.0


    class Config:

        env_file = ".env"


settings = Settings()
