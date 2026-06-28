from app.core.exceptions import BadRequestException, ForbiddenException
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
        raise BadRequestException(
            "Account restricted"
        )


def assert_can_authenticate(user: User) -> None:
    if user.account_status != ACCOUNT_STATUS_ACTIVE:
        raise ForbiddenException(
            "Account restricted"
        )
