from app.core.exceptions import BadRequestException, ForbiddenException
from app.core.observability.signals import emit_decision_signal
from app.models.user import User

ACCOUNT_STATUS_ACTIVE = "active"
ACCOUNT_STATUS_SUSPENDED = "suspended"
ACCOUNT_STATUS_BLOCKED = "blocked"

RESTRICTED_ACCOUNT_STATUSES = frozenset(
    {
        ACCOUNT_STATUS_SUSPENDED,
        ACCOUNT_STATUS_BLOCKED,
    }
)


def assert_can_login(user: User) -> None:
    if user.account_status != ACCOUNT_STATUS_ACTIVE:
        emit_decision_signal(
            "authentication",
            "deny",
            actor_user_id=user.id,
            reason_code="account_restricted",
        )
        raise ForbiddenException(
            "Account restricted"
        )


def assert_can_authenticate(user: User) -> None:
    if user.account_status != ACCOUNT_STATUS_ACTIVE:
        emit_decision_signal(
            "authentication",
            "deny",
            actor_user_id=user.id,
            reason_code="account_restricted",
        )
        raise ForbiddenException(
            "Account restricted"
        )
