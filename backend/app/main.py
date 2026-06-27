from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware



from app.routers.properties import router
from app.routers.auth import router as auth_router
from app.routers.uploads import router as upload_router
from app.routers import users
from app.routers import favorites
from app.routers import realtor_profiles
from app.routers import realtor_applications
from app.routers import ai
from app.routers import admin_stats
from app.routers import admin_users
from app.database.database import Base, engine
from app.models import user, property, favorite, realtor_application
from app.core.exceptions import (
    NotFoundException,
    BadRequestException,
)

from app.core.handlers import (
    not_found_exception_handler,
    bad_request_exception_handler,
)

Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)

app.include_router(router)
app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(users.router)
app.include_router(favorites.router)
app.include_router(realtor_profiles.router)
app.include_router(realtor_applications.router)
app.include_router(ai.router)
app.include_router(admin_stats.router)
app.include_router(admin_users.router)
app.add_exception_handler(
    NotFoundException,
    not_found_exception_handler,
)

app.add_exception_handler(
    BadRequestException,
    bad_request_exception_handler,
)


@app.get("/")
def home():
    return {
        "message": "CRUD API"
    }
