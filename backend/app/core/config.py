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


    class Config:

        env_file = ".env"


settings = Settings()
