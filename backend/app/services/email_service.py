import json
import logging
import urllib.error
import urllib.request

from app.core.config import settings

logger = logging.getLogger(__name__)

RESET_SUBJECT = "Reset your Rento password"
RESEND_API_URL = "https://api.resend.com/emails"


def _build_plain_text_body(reset_url: str, expire_minutes: int) -> str:
    return (
        "Reset your Rento password\n\n"
        f"Use this link to choose a new password (expires in {expire_minutes} minutes):\n"
        f"{reset_url}\n\n"
        "If you did not request a password reset, you can safely ignore this email.\n\n"
        "— Rento"
    )


def _build_html_body(reset_url: str, expire_minutes: int) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{RESET_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f4f4f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:480px;background-color:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="padding:32px 28px 8px;text-align:center;">
              <p style="margin:0;font-size:24px;font-weight:700;color:#18181b;letter-spacing:-0.02em;">Rento</p>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 28px 24px;text-align:center;">
              <h1 style="margin:0 0 12px;font-size:20px;font-weight:700;color:#18181b;">Reset your password</h1>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#52525b;">
                We received a request to reset your Rento account password.
                Click the button below to choose a new one.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;text-align:center;">
              <a href="{reset_url}"
                 style="display:inline-block;padding:14px 28px;background-color:#1d4ed8;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;border-radius:16px;">
                Reset Password
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#71717a;text-align:center;">
                This link expires in <strong>{expire_minutes} minutes</strong>.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 28px 24px;">
              <p style="margin:0;font-size:13px;line-height:1.6;color:#a1a1aa;text-align:center;">
                If you did not request a password reset, you can safely ignore this email.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 28px 28px;border-top:1px solid #f4f4f5;text-align:center;">
              <p style="margin:0;font-size:12px;color:#a1a1aa;">
                &copy; Rento &mdash; Mobile First Real Estate Marketplace
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>"""


def _build_from_address() -> str:
    return f"{settings.RESEND_FROM_NAME} <{settings.RESEND_FROM_EMAIL}>"


def _send_via_resend(email: str, reset_url: str) -> None:
    if not settings.RESEND_API_KEY:
        raise ValueError("RESEND_API_KEY is not configured")

    if not settings.RESEND_FROM_EMAIL:
        raise ValueError("RESEND_FROM_EMAIL is not configured")

    expire_minutes = settings.PASSWORD_RESET_EXPIRE_MINUTES

    payload = {
        "from": _build_from_address(),
        "to": [email],
        "subject": RESET_SUBJECT,
        "html": _build_html_body(reset_url, expire_minutes),
        "text": _build_plain_text_body(reset_url, expire_minutes),
    }

    request = urllib.request.Request(
        RESEND_API_URL,
        data=json.dumps(payload).encode("utf-8"),
        method="POST",
        headers={
            "Authorization": f"Bearer {settings.RESEND_API_KEY}",
            "Content-Type": "application/json",
        },
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            if response.status >= 400:
                error_body = response.read().decode("utf-8", errors="replace")
                raise RuntimeError(
                    f"Resend API returned status {response.status}: {error_body}"
                )
    except urllib.error.HTTPError as exc:
        error_body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(
            f"Resend API HTTP error {exc.code}: {error_body}"
        ) from exc


def send_password_reset_email(
    email: str,
    reset_url: str,
) -> None:

    if settings.EMAIL_PROVIDER == "console":
        print(
            f"[password-reset] email={email} reset_url={reset_url}",
            flush=True,
        )
        return

    if settings.EMAIL_PROVIDER == "resend":
        _send_via_resend(email, reset_url)
        return

    logger.warning(
        "Unknown EMAIL_PROVIDER=%s; password reset email not sent",
        settings.EMAIL_PROVIDER,
    )
