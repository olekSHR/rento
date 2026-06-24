from sqlalchemy.orm import Session

from app.models.user import User


def get_user_by_email(
    db: Session,
    email: str
):

    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: int
):

    return (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )


def update_user_role(
    db: Session,
    user: User,
    role: str
):

    user.role = role

    db.commit()

    db.refresh(user)

    return user


def create_user(
    db: Session,
    email: str,
    hashed_password: str
):

    new_user = User(
        email=email,
        hashed_password=hashed_password
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user