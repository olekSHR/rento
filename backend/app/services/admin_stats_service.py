from sqlalchemy.orm import Session

from app.repositories import admin_stats_repository


def get_admin_stats(db: Session) -> dict[str, int]:
    return admin_stats_repository.get_stats(db)
