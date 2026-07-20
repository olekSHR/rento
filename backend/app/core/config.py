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

    ENABLE_API_DOCS: bool = False


    class Config:

        env_file = ".env"


settings = Settings()
