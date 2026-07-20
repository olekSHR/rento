# IWP-002 Environment Documentation

**Status:** IWP-002 EXECUTION DOCUMENTATION
**Package:** IWP-002 - Configuration And Secrets Hygiene
**Authority:** `docs/implementation/IWP_002_EXECUTION_AUTHORIZATION.md`
**Implementation state:** EXECUTED - PENDING FINAL BLOCK REVIEW
**Secrets:** REAL VALUES MUST NOT BE COMMITTED
**Push:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED

---

## 1. Purpose

This document records the secret-free environment contract for the authorized IWP-002 configuration surfaces:

- `backend/alembic.ini`
- `backend/app/core/config.py`
- `docker-compose.yml`

It documents variable names, ownership, classification, injection method, consumer, failure behavior, and rotation responsibility without exposing real credentials, tokens, keys, passwords, or production connection strings.

---

## 2. Secret Handling Rules

1. Real secret values must never be committed to repository files.
2. Examples must use placeholders only.
3. Secret-bearing values must be supplied through local environment files, shell environment, or an approved secret-injection mechanism.
4. Evidence must report secret scans by count and classification only.
5. Production values must not be used for local validation evidence.
6. Rotation or compromised-credential response remains a separate security lifecycle event.

---

## 3. Environment Variable Contract

| Variable | Purpose | Classification | Required | Environment | Safe placeholder/example form | Source / injection method | Consumer | Failure behavior | Ownership / rotation note |
|----------|---------|----------------|----------|-------------|-------------------------------|---------------------------|----------|------------------|---------------------------|
| `DATABASE_URL` | Backend database connection URL | Secret-bearing operational configuration | Required | Local, development, staging, production | `${DATABASE_URL}` or `<database-url>` | Environment variable or local non-committed environment file | `backend/app/core/config.py`; Alembic runtime configuration path | Backend configuration initialization fails when absent; Alembic placeholder is not a runnable credential | Owned by infrastructure/security configuration; rotate if exposed |
| `SECRET_KEY` | Application signing secret | Secret-bearing security configuration | Required | Local, development, staging, production | `<secret-key>` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Backend configuration initialization fails when absent | Owned by security configuration; rotate if exposed |
| `ALGORITHM` | Token/signing algorithm identifier | Public operational configuration | Required | Local, development, staging, production | `HS256` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Backend configuration initialization fails when absent | Owned by security configuration; not a secret value |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | Access token lifetime in minutes | Public operational configuration | Required | Local, development, staging, production | `30` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Backend configuration initialization fails when absent or invalid | Owned by security configuration; not a secret value |
| `OPENAI_API_KEY` | Optional external AI provider credential | Secret-bearing integration configuration | Optional | Development, staging, production if feature is separately authorized | `<openai-api-key>` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Optional feature remains unavailable when absent | Owned by integration/security configuration; rotate if exposed |
| `PASSWORD_RESET_EXPIRE_MINUTES` | Password reset token lifetime in minutes | Public operational configuration | Optional with default | Local, development, staging, production | `30` | Environment variable or default | `backend/app/core/config.py` | Uses safe default when absent | Owned by security configuration; not a secret value |
| `FRONTEND_URL` | Frontend origin used by backend workflows | Public operational configuration | Optional with local default | Local, development, staging, production | `http://localhost:3000` | Environment variable or default | `backend/app/core/config.py` | Uses local default when absent | Owned by infrastructure/configuration |
| `EMAIL_PROVIDER` | Email delivery provider selector | Public operational configuration | Optional with default | Local, development, staging, production | `console` | Environment variable or default | `backend/app/core/config.py` | Uses console provider when absent | Owned by infrastructure/configuration |
| `RESEND_API_KEY` | Optional email provider credential | Secret-bearing integration configuration | Optional | Development, staging, production if provider is used | `<resend-api-key>` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Email provider integration remains unavailable when absent | Owned by integration/security configuration; rotate if exposed |
| `RESEND_FROM_EMAIL` | Email sender address | Operational configuration | Optional | Local, development, staging, production | `noreply@example.invalid` | Environment variable or local non-committed environment file | `backend/app/core/config.py` | Provider-specific send flow may be unavailable when absent | Owned by infrastructure/configuration |
| `RESEND_FROM_NAME` | Email sender display name | Public operational configuration | Optional with default | Local, development, staging, production | `Rento` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/configuration |
| `RATE_LIMIT_ENABLED` | Enables rate limiting | Public operational configuration | Optional with default | Local, development, staging, production | `true` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `RATE_LIMIT_TRUST_PROXY_HEADERS` | Controls proxy-header trust posture for rate limiting | Operational security configuration | Optional with default | Local, development, staging, production | `true` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `RATE_LIMIT_STORAGE_URI` | Rate-limit storage URI | Potentially secret-bearing operational configuration | Optional with default | Local, development, staging, production | `memory://` or `<rate-limit-storage-uri>` | Environment variable or default | `backend/app/core/config.py` | Uses in-memory local default when absent | Treat as secret-bearing if it contains credentials; rotate if exposed |
| `RATE_LIMIT_LOGIN` | Login rate-limit policy | Public operational configuration | Optional with default | Local, development, staging, production | `5/minute` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `RATE_LIMIT_FORGOT_PASSWORD` | Password-reset request rate-limit policy | Public operational configuration | Optional with default | Local, development, staging, production | `3/15minute` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `RATE_LIMIT_UPLOAD` | Upload request rate-limit policy | Public operational configuration | Optional with default | Local, development, staging, production | `20/minute` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `ENABLE_API_DOCS` | Enables API documentation surface | Public operational configuration | Optional with default | Local, development, staging, production | `false` | Environment variable or default | `backend/app/core/config.py` | Uses default when absent | Owned by infrastructure/security configuration |
| `POSTGRES_DB` | Local container database name | Non-secret local/container configuration | Optional with local default | Local/development container only | `rento_db` | Shell environment, project environment, or compose default | `docker-compose.yml` db service | Uses safe local default when absent | Owned by local infrastructure configuration |
| `POSTGRES_USER` | Local container database user name | Non-secret local/container configuration | Optional with local default | Local/development container only | `rento_user` | Shell environment, project environment, or compose default | `docker-compose.yml` db service | Uses safe local default when absent | Owned by local infrastructure configuration |
| `POSTGRES_PASSWORD` | Local container database password | Secret-bearing local/container configuration | Required | Local/development container only | `<postgres-password>` | Shell environment or local non-committed environment file | `docker-compose.yml` db service | Docker Compose rendering fails when absent | Owned by local infrastructure/security configuration; rotate if exposed |

---

## 4. Authorized File Behavior

| File | Behavior |
|------|----------|
| `backend/alembic.ini` | Stores only a `DATABASE_URL` placeholder. It does not contain a runnable credential or production connection string. |
| `backend/app/core/config.py` | Loads configuration from environment and `.env`; required fields remain required; secret-bearing fields are excluded from object representation. |
| `docker-compose.yml` | Uses environment substitution for local database settings and requires `POSTGRES_PASSWORD` rather than committing a password value. |

---

## 5. Prohibited Content

The following must not be committed:

- real database passwords;
- production connection strings;
- API keys;
- signing secrets;
- tokens;
- private keys;
- certificates;
- cloud credentials;
- production environment values;
- rendered Docker Compose output containing secret values.

---

## 6. Unavailable Evidence

Production environment values, real secret stores, local `.env` files, shell history, cloud credentials, and external secret managers were intentionally not inspected.

This is required by the IWP-002 security boundary. Their absence from this evidence does not certify production readiness.
