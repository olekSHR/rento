# Production Configuration Inventory

**Status:** IWP-012 LAUNCH READINESS EVIDENCE — PLACEHOLDERS ONLY
**Authority:** `docs/implementation/IWP_012_DISCOVERY_EVIDENCE_AND_EXECUTION_AUTHORIZATION.md`; `docs/implementation/IWP_002_ENVIRONMENT_DOCUMENTATION.md`
**Work package:** IWP-012 — Launch Readiness Release And Rollback Evidence
**Secrets:** REAL VALUES MUST NOT BE COMMITTED
**Deployment:** NOT AUTHORIZED

---

## 1. Purpose

Consolidated **variable-name contract** for launch-readiness configuration review (IWP-012 **R5**). Documents names, classification, and validation approach only.

Browser-visible `NEXT_PUBLIC_*` variables must **never** contain secrets.

---

## 2. Backend Application Variables

Source: `backend/app/core/config.py`; consumed via environment or local `backend/.env` (not committed).

| Variable | Service | Purpose | Required | Classification | Safe placeholder | Source | Production owner | Validation |
|----------|---------|---------|----------|----------------|------------------|--------|------------------|------------|
| `DATABASE_URL` | backend | Database connection URL | Yes | Secret-bearing | `<database-url>` | env / `.env` | Infrastructure | App startup; Alembic |
| `SECRET_KEY` | backend | Signing secret | Yes | Secret-bearing | `<secret-key>` | env / `.env` | Security | App startup |
| `ALGORITHM` | backend | Token algorithm | Yes | Public | `HS256` | env / `.env` | Security | App startup |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | backend | Access token TTL | Yes | Public | `30` | env / `.env` | Security | App startup |
| `OPENAI_API_KEY` | backend | Optional AI integration | No | Secret-bearing | `<openai-api-key>` | env / `.env` | Integration | Feature-gated |
| `PASSWORD_RESET_EXPIRE_MINUTES` | backend | Reset token TTL | No | Public | `30` | env / default | Security | App startup |
| `FRONTEND_URL` | backend | Frontend origin for backend workflows | No | Public | `http://localhost:3000` | env / default | Infrastructure | URL format |
| `EMAIL_PROVIDER` | backend | Email provider selector | No | Public | `console` | env / default | Infrastructure | App startup |
| `RESEND_API_KEY` | backend | Email provider credential | No | Secret-bearing | `<resend-api-key>` | env / `.env` | Integration | Provider config |
| `RESEND_FROM_EMAIL` | backend | Sender email address | No | Operational | `noreply@example.invalid` | env / `.env` | Infrastructure | Format check |
| `RESEND_FROM_NAME` | backend | Sender display name | No | Public | `Rento` | env / default | Infrastructure | App startup |
| `RATE_LIMIT_ENABLED` | backend | Rate limiting toggle | No | Public | `true` | env / default | Security | App startup |
| `RATE_LIMIT_TRUST_PROXY_HEADERS` | backend | Proxy header trust | No | Operational | `true` | env / default | Security | App startup |
| `RATE_LIMIT_STORAGE_URI` | backend | Rate-limit storage URI | No | Potentially secret | `memory://` or `<uri>` | env / default | Infrastructure | URI scheme |
| `RATE_LIMIT_LOGIN` | backend | Login rate limit | No | Public | `5/minute` | env / default | Security | App startup |
| `RATE_LIMIT_FORGOT_PASSWORD` | backend | Password reset rate limit | No | Public | `3/15minute` | env / default | Security | App startup |
| `RATE_LIMIT_UPLOAD` | backend | Upload rate limit | No | Public | `20/minute` | env / default | Security | App startup |
| `ENABLE_API_DOCS` | backend | API docs exposure | No | Public | `false` | env / default | Security | App startup |
| `SESSION_COOKIE_NAME` | backend | Session cookie name | No | Public | `rento_session` | env / default | Security | App startup |
| `SESSION_IDLE_TIMEOUT_MINUTES` | backend | Session idle timeout | No | Public | `30` | env / default | Security | App startup |
| `SESSION_ABSOLUTE_TIMEOUT_MINUTES` | backend | Session absolute timeout | No | Public | `1440` | env / default | Security | App startup |
| `SESSION_COOKIE_SECURE` | backend | Secure cookie flag | No | Public | `false` | env / default | Security | Must be `true` in HTTPS production |
| `SESSION_COOKIE_SAMESITE` | backend | SameSite policy | No | Public | `lax` | env / default | Security | App startup |
| `CSRF_COOKIE_NAME` | backend | CSRF cookie name | No | Public | `rento_csrf` | env / default | Security | App startup |
| `CSRF_HEADER_NAME` | backend | CSRF header name | No | Public | `X-CSRF-Token` | env / default | Security | App startup |

Extended IWP-002 contract: `docs/implementation/IWP_002_ENVIRONMENT_DOCUMENTATION.md`.

---

## 3. Compose And PostgreSQL Variables

Source: `docker-compose.yml` — local/disposable stack.

| Variable | Service | Purpose | Required | Classification | Safe placeholder | Source | Production owner | Validation |
|----------|---------|---------|----------|----------------|------------------|--------|------------------|------------|
| `POSTGRES_DB` | db | Database name | No | Public | `rento_db` | env / default | Infrastructure | Compose render |
| `POSTGRES_USER` | db | Database user | No | Public | `rento_user` | env / default | Infrastructure | Compose render |
| `POSTGRES_PASSWORD` | db | Database password | Yes (compose) | Secret-bearing | `<postgres-password>` | shell / local env | Infrastructure | Compose render gate |
| `DATABASE_URL` | backend | Compose override to PostgreSQL service | Yes (in compose) | Secret-bearing | `postgresql://<user>:<password>@db:5432/<db>` | compose `environment` | Infrastructure | Injected at runtime |

---

## 4. Frontend Variables

Source: `docker-compose.yml`; `frontend/lib/apiBaseUrl.ts`.

| Variable | Service | Purpose | Required | Classification | Safe placeholder | Source | Production owner | Validation |
|----------|---------|---------|----------|----------------|------------------|--------|------------------|------------|
| `NEXT_PUBLIC_API_URL` | frontend | Browser-visible API base URL | No | **Public — browser exposed** | `http://localhost:8000` | compose `environment` | Infrastructure | Must not contain secrets |
| `INTERNAL_API_URL` | frontend | Server-side SSR API base URL | No | Public (internal network) | `http://backend:8000` | compose `environment` | Infrastructure | SSR routing only |

**Rule:** Never place secrets in `NEXT_PUBLIC_*` variables — they are embedded in client bundles.

---

## 5. Environment Scope Summary

| Environment | Variables typically supplied |
|-------------|---------------------------|
| Local Compose | `POSTGRES_*`, `backend/.env`, compose overrides |
| Production | All backend required vars + environment-specific public URLs — **values not in repository** |

Production hostnames, tokens, and URLs are **not** recorded here.

---

## 6. Validation Approach

| Check | Method |
|-------|--------|
| Variable completeness | Compare runtime env against this inventory |
| Secret absence in repo | Secret-pattern scan on committed files |
| Browser exposure | Confirm secrets are not in `NEXT_PUBLIC_*` |
| Compose substitution | Optional non-modifying `docker compose config` |
| Production values | **NOT RUN** — supplied only via approved secret store |

---

## 7. Explicit Exclusions

- no real credentials, tokens, or production URLs in repository files;
- no local `.env` inspection in this inventory act;
- no `.env.example` creation (optional Category B — not required);
- no production configuration mutation.
