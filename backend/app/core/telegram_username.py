import re
from urllib.parse import urlparse

TELEGRAM_USERNAME_PATTERN = re.compile(r"^[a-zA-Z][a-zA-Z0-9_]{4,31}$")

_UNSAFE_SCHEMES = ("javascript:", "data:", "vbscript:")


def normalize_telegram_username(value: str | None) -> str | None:
    if value is None:
        return None

    raw = value.strip()
    if not raw:
        return None

    lower = raw.lower()
    if lower.startswith(_UNSAFE_SCHEMES):
        raise ValueError("Invalid Telegram username")

    username: str

    if "://" in raw or lower.startswith("t.me/"):
        parse_target = raw if "://" in raw else f"https://{raw.lstrip('/')}"
        if lower.startswith("t.me/"):
            parse_target = f"https://{raw}"

        parsed = urlparse(parse_target)
        if parsed.scheme not in ("http", "https"):
            raise ValueError("Invalid Telegram username")

        host = (parsed.hostname or "").lower()
        if host not in ("t.me", "www.t.me"):
            raise ValueError("Invalid Telegram username")

        if parsed.query or parsed.fragment:
            raise ValueError("Invalid Telegram username")

        path = parsed.path.strip("/")
        if not path or "/" in path:
            raise ValueError("Invalid Telegram username")

        username = path
    else:
        username = raw.lstrip("@")

    if not username or any(character in username for character in " /?#"):
        raise ValueError("Invalid Telegram username")

    if not TELEGRAM_USERNAME_PATTERN.match(username):
        raise ValueError("Invalid Telegram username")

    return username
