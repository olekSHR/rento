from pydantic_settings import BaseSettings


class Settings(BaseSettings):

    DATABASE_URL: str

    SECRET_KEY: str

    ALGORITHM: str

    ACCESS_TOKEN_EXPIRE_MINUTES: int

    OPENAI_API_KEY: str | None = None

    PASSWORD_RESET_EXPIRE_MINUTES: int = 30

    FRONTEND_URL: str = "http://localhost:3000"

    EMAIL_PROVIDER: str = "console"

    SMTP_HOST: str | None = None

    SMTP_PORT: int = 587

    SMTP_USERNAME: str | None = None

    SMTP_PASSWORD: str | None = None

    SMTP_FROM_EMAIL: str | None = None

    SMTP_FROM_NAME: str = "Rento"


    class Config:

        env_file = ".env"


settings = Settings()
