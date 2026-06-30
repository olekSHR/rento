from datetime import datetime

from sqlalchemy.orm import Session

from app.models.password_reset_token import PasswordResetToken


def invalidate_unused_tokens_for_user(
    db: Session,
    user_id: int,
    *,
    used_at: datetime,
    commit: bool = True,
) -> None:

    (
        db.query(PasswordResetToken)
        .filter(
            PasswordResetToken.user_id == user_id,
            PasswordResetToken.used_at.is_(None),
        )
        .update(
            {PasswordResetToken.used_at: used_at},
            synchronize_session=False,
        )
    )

    if commit:
        db.commit()


def create_token(
    db: Session,
    user_id: int,
    token_hash: str,
    expires_at: datetime,
    *,
    commit: bool = True,
) -> PasswordResetToken:

    token = PasswordResetToken(
        user_id=user_id,
        token_hash=token_hash,
        expires_at=expires_at,
    )

    db.add(token)

    if commit:
        db.commit()
        db.refresh(token)

    return token


def get_by_token_hash(
    db: Session,
    token_hash: str,
) -> PasswordResetToken | None:

    return (
        db.query(PasswordResetToken)
        .filter(PasswordResetToken.token_hash == token_hash)
        .first()
    )


def mark_token_used(
    db: Session,
    token: PasswordResetToken,
    *,
    used_at: datetime,
    commit: bool = True,
) -> PasswordResetToken:

    token.used_at = used_at

    if commit:
        db.commit()
        db.refresh(token)

    return token
