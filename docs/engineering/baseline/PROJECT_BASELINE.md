# Project Baseline

**Status: POPULATED FROM CURRENT REPOSITORY EVIDENCE**

**Purpose:** Durable, evidence-labeled snapshot of the real project shape.
**Rule:** Record only what evidence supports. Do not invent compliance.

> Repository HEAD and deployed application release identity are separate facts and must not be assumed to be identical.

**Baseline captured at:** repository discovery on local `main` matching `origin/main`
**Capture HEAD:** `3f70cda929871ffd144acce264d9e6d333e53035`

---

## Evidence classification

Use exactly these labels:

| Label | Meaning |
|-------|---------|
| VERIFIED | Confirmed from repository, runtime, or operational evidence |
| INFERRED | Reasonable conclusion from partial evidence; not directly confirmed |
| UNKNOWN | Not established |
| NOT APPLICABLE | Does not apply to this project |

Every material baseline claim should carry one label.

**Evidence strength:** current code / config / migrations / tests / ops scripts > descriptive docs.
**Repo vs production:** repository presence proves configuration/code exists; it does **not** prove live production currently uses it successfully.

---

## Quick operational map

| Question | Short answer | Where to inspect first |
|----------|--------------|------------------------|
| What is this system? | Mobile-first rental marketplace (Romania / Galați focus in product docs) | `README.md`, `docs/ARCHITECTURE.md` (docs may drift) |
| Frontend responsibility | Next.js App Router UI + API client | `frontend/app/`, `frontend/services/` |
| Backend responsibility | FastAPI HTTP API + domain rules | `backend/app/routers/`, `services/`, `repositories/` |
| Persistent data | PostgreSQL via SQLAlchemy/Alembic | `backend/app/models/`, `backend/alembic/versions/` |
| Authn | Server-side session cookie + CSRF on mutating requests | `session_service.py`, `dependencies.py`, `csrf.py`, `routers/auth.py` |
| Authz | Role deps + service ownership/resource checks | `dependencies.py`, relevant `*_service.py` |
| How it runs (repo config) | Docker Compose: db, backend, frontend, nginx | `docker-compose.yml`, Dockerfiles, `nginx/default.conf` |
| How it is deployed (repo procedure) | Manual Compose + explicit Alembic; image rollback script | `docs/operations/DEPLOYMENT_PROCEDURE.md`, `scripts/ops/` |
| How verified | Backend pytest; FE lint/typecheck/build; compose healthchecks | `backend/tests/`, `frontend/package.json`, Compose |
| Backup/recovery (repo mechanisms) | Backup script + systemd unit files; restore plan docs | `scripts/ops/rento-backup.sh`, `deploy/systemd/`, ops docs |
| Live production state | Mostly UNKNOWN from repository alone | Do not invent from Git HEAD |

---

## Repository

| Field | Value | Evidence |
|-------|-------|----------|
| branch | `main` | VERIFIED — `git branch --show-current` |
| HEAD | `3f70cda929871ffd144acce264d9e6d333e53035` | VERIFIED — `git rev-parse HEAD` |
| origin/main | `3f70cda929871ffd144acce264d9e6d333e53035` | VERIFIED — `git rev-parse origin/main` |
| divergence | `0 0` (in sync at capture) | VERIFIED — `git rev-list --left-right --count origin/main...HEAD` |
| worktree | clean at discovery start | VERIFIED — empty `git status --short` |
| primary top-level | `backend/`, `frontend/`, `nginx/`, `deploy/`, `scripts/`, `docs/`, `docker-compose.yml` | VERIFIED — repository tree |

### Architecture boundaries

| Boundary | Location | Evidence |
|----------|----------|----------|
| Frontend | `frontend/` — Next.js App Router | VERIFIED — `package.json`, `app/` |
| Backend | `backend/app/` — FastAPI | VERIFIED — `main.py` |
| Database | PostgreSQL URL + SQLAlchemy models + Alembic | VERIFIED — Compose image, `database.py`, models, alembic |
| Infrastructure/ops | Compose, nginx, deploy units, ops scripts | VERIFIED — paths exist |
| Configured ingress (REPO CONFIG only) | nginx terminates HTTP/HTTPS in Compose; `/api/` → backend, `/` → frontend; Cloudflare IP allowlist in nginx geo | VERIFIED — `nginx/default.conf`, `docker-compose.yml` |
| Live edge / CDN / DNS behavior | UNKNOWN | Not established by repository inspection |

Do not treat the configured ingress path as proof of the live production network path.

---

## Backend

| Field | Value | Evidence |
|-------|-------|----------|
| entrypoint | `backend/app/main.py` (`FastAPI`); container CMD `uvicorn app.main:app --host 0.0.0.0 --port 8000` | VERIFIED — `main.py`, `backend/Dockerfile` |
| configuration | `backend/app/core/config.py` Pydantic `Settings` + `.env`; Compose sets `DATABASE_URL` | VERIFIED |
| API | Routers in `backend/app/routers/` included from `main.py`; no global `/api/v1` app prefix | VERIFIED — `main.py` |
| `/api` prefix at edge | Stripped by nginx `location /api/` → backend root in **repository nginx config** | VERIFIED as REPO CONFIG — live use UNKNOWN |
| business logic | Primarily `backend/app/services/*` | VERIFIED — routers call services (see layering) |
| data access | Primarily `backend/app/repositories/*` + `get_db` | VERIFIED — with exceptions below |
| authentication | Session cookie auth on request path | VERIFIED — see Authentication |
| authorization | Role deps + service resource checks | VERIFIED — `dependencies.py`, services |
| middleware | CSRF, CORS, SlowAPI rate limiting | VERIFIED — `main.py`, `rate_limit.py` |
| error handling | `core/exceptions.py` + `core/handlers.py` | VERIFIED |
| integrations | Overpass; OpenAI listing assist; email console/Resend; local uploads | VERIFIED — clients/services/upload router |
| tests | `backend/tests/` pytest | VERIFIED |

### Layering (Router → Service → Repository)

**Verdict: dominant architecture with exceptions.**

| Pattern | Status | Evidence |
|---------|--------|----------|
| Routers call services (not repositories) | Dominant | VERIFIED — no `repositories` imports under `routers/` |
| Services call repositories for persistence | Dominant for domain modules | VERIFIED — property, favorites, viewing, realtor, admin, etc. |
| Upload image route | Exception — validation/filesystem write in router | VERIFIED — `routers/uploads.py` |
| Auth session persistence | Exception — `session_service` uses ORM directly on `AuthSession` (users via `user_repository`) | VERIFIED — `session_service.py` |
| AI listing | Router → service → external HTTP (no repository) | VERIFIED — `routers/ai.py`, `ai_listing_service.py` |

AI implication: do not assume every endpoint has a repository; inspect the concrete router/service before changing a path.

### Router prefixes (repository)

| Prefix / area | Router module | Evidence |
|---------------|---------------|----------|
| `/properties` | `routers/properties.py` | VERIFIED |
| `/auth` | `routers/auth.py` | VERIFIED |
| `/upload` | `routers/uploads.py` | VERIFIED |
| `/users` | `routers/users.py` | VERIFIED |
| `/favorites` | `routers/favorites.py` | VERIFIED |
| `/realtor`, `/realtor-applications` | realtor routers | VERIFIED |
| `/realtors` | `public_realtors.py` | VERIFIED |
| `/viewing-requests`, `/realtor/viewing-requests` | `viewing_requests.py` | VERIFIED |
| `/admin` | admin routers | VERIFIED |
| `/ai` | `ai.py` | VERIFIED |
| rental documents | path-based routes in `rental_documents.py` | VERIFIED |

---

## Frontend

| Field | Value | Evidence |
|-------|-------|----------|
| framework | Next.js `16.2.6`, React `19.2.4` | VERIFIED — `frontend/package.json` |
| routing model | App Router under `frontend/app/` | VERIFIED |
| main routes | `(consumer)/` home; `properties/[id]`; `favorites`; auth pages; `realtor/*`; `admin/*`; `viewing-requests`; `realtors/[userId]` | VERIFIED |
| API client | `frontend/services/api.ts` (+ `authApi.ts`, `favoritesApi.ts`); `credentials: "include"`; CSRF header on mutations | VERIFIED |
| auth/session (client) | No bearer token storage; session via HttpOnly cookie; restore `/users/me` in `AuthContext` | VERIFIED — `tokenStorage.ts`, `AuthContext.tsx` |
| state | `AuthProvider`, `FavoritesProvider`; guest favorites in `localStorage` | VERIFIED |
| FE↔BE URLs | `NEXT_PUBLIC_API_URL` (Compose default `http://localhost/api`); SSR `INTERNAL_API_URL=http://backend:8000` | VERIFIED — `apiBaseUrl.ts`, Compose (**REPO CONFIG**) |
| build/runtime | `frontend/Dockerfile` Node 22; `lint` / `typecheck` / `build` / `start` | VERIFIED |
| frontend automated behavioral/E2E tests | None found in project source (ignore `node_modules`) | VERIFIED |

---

## Database

| Field | Value | Evidence |
|-------|-------|----------|
| engine (repo runtime config) | Compose service `postgres:16`; app uses SQLAlchemy `create_engine(settings.DATABASE_URL)` | VERIFIED — Compose, `database.py` |
| live DB engine/host | UNKNOWN | Not established |
| ORM/data layer | SQLAlchemy models in `backend/app/models/` | VERIFIED |
| migrations | Alembic under `backend/alembic/` | VERIFIED |
| repository migration head | `a2b3c4d5e6f7` (`add_rental_documents`, parent `f1a2b3c4d5e6`) | VERIFIED — migration file |
| live DB applied revision | UNKNOWN | Repository head ≠ applied production revision |
| primary entities | `User`, `Property`, `PropertyImage` (in `property.py`), `Favorite`, `RealtorProfile`, `RealtorApplication`, `PasswordResetToken`, `AuthSession`, `ViewingRequest`, `RentalDocument` | VERIFIED — models |
| key relationships | `Property.owner_id → users`; favorites; viewing_request actors; rental_document links | VERIFIED |
| session mechanism | `Depends(get_db)` / `SessionLocal` | VERIFIED |

---

## Authentication and Authorization

### Authentication path (request path)

```text
login/register (auth router)
  → auth_service credential check
  → session_service.create_session (hash stored in auth_sessions)
  → session_service.set_session_cookie (HttpOnly cookie, default name rento_session)
  → csrf.set_csrf_cookie (readable cookie rento_csrf)
authenticated request
  → cookie SESSION_COOKIE_NAME
  → dependencies.get_current_user
  → session_service.get_current_user_from_session
  → account_status_service.assert_can_authenticate
state-changing request (POST/PUT/PATCH/DELETE) with session cookie
  → CSRFMiddleware / validate_csrf_request
  → require cookie rento_csrf == header X-CSRF-Token
  → (exemptions: login/register/forgot/reset password)
```

| Concern | Model | Evidence |
|---------|-------|----------|
| Authentication (who?) | Server-side session cookie; SHA-256 token hash in `auth_sessions` | VERIFIED — `session_service.py`, `models/auth_session.py`, `routers/auth.py` |
| CSRF | Double-submit cookie/header when session cookie present on mutating methods | VERIFIED — `csrf.py`, middleware in `main.py` |
| Account status | Gate on authenticate/login | VERIFIED — `account_status_service.py` |
| Authorization (what?) | Roles `user` / `realtor` / `admin` via deps | VERIFIED — `dependencies.py`, `User.role` |
| Ownership/policy (which resource?) | Service-level checks | VERIFIED — e.g. property/viewing services |
| JWT on request auth path | NOT APPLICABLE — helpers only in `core/security/jwt.py`, unused elsewhere | VERIFIED — import/usage search |
| Docs claiming JWT auth | Stale relative to code | VERIFIED — `docs/ARCHITECTURE.md` mentions JWT |

---

## Representative request flows

### Flow A — public listing read

```text
frontend app/(consumer)/page.tsx
  → services/api.getProperties → GET {API}/properties/
  → [REPO CONFIG edge] nginx /api/ → backend
  → routers/properties.get_properties
  → property_service.get_all_properties
  → property_repository.get_all_properties (status == "available")
  → models.Property (+ realtor contact resolution)
  → response → frontend render
```

Source path: VERIFIED. Live production network traversal: UNKNOWN.

### Flow B — authenticated state change (create viewing request)

```text
RequestViewingSection
  → api.createViewingRequest → POST /properties/{id}/viewing-requests
  → CSRF validation (session present)
  → get_current_user (session cookie)
  → viewing_request_service.create_viewing_request
  → viewing_request_repository.create_request
  → response → frontend state
```

Source path: VERIFIED. Live production behavior: UNKNOWN.

---

## Runtime / Infrastructure

All rows below are **REPOSITORY CONFIGURATION** unless marked otherwise.

| Field | Value | Evidence |
|-------|-------|----------|
| runtime/containers | Compose: `db`, `backend`, `frontend`, `nginx` | VERIFIED — `docker-compose.yml` |
| networking | Only nginx publishes host ports `80`/`443` in Compose | VERIFIED |
| reverse proxy | `nginx/default.conf` routes `/api/` and `/` | VERIFIED |
| TLS | Origin cert paths `/etc/ssl/cloudflare/...` mounted into nginx | VERIFIED config; host cert presence/validity UNKNOWN |
| external edge | Cloudflare IP ranges encoded in nginx `geo`; product docs name Cloudflare | VERIFIED repo config/docs; live zone/CDN UNKNOWN |
| env model | `backend/.env` + Compose env; frontend public/internal API URLs | VERIFIED config; secret values UNKNOWN |
| volumes | `postgres_data`; `./backend/uploads`; SSL host mount | VERIFIED |
| health checks | db `pg_isready`; backend GET `/`; frontend GET `/`; nginx `/healthz` | VERIFIED Compose/nginx |
| live container health | UNKNOWN | PROD FACT |
| CI/CD workflows in repo | Absent | VERIFIED — no `.github/workflows` |

---

## Production

| Field | Value | Evidence |
|-------|-------|----------|
| hosting | Docs/scripts refer to Hetzner-style VPS and `/opt/rento` | INFERRED from docs/scripts — live host UNKNOWN |
| production repository revision | UNKNOWN | Distinct from local/origin Git HEAD |
| deployed application / image identity | UNKNOWN | Distinct from repository revision; not proven by Git HEAD |
| deployment method (repo procedure) | Manual `docker compose` + explicit Alembic upgrade; rollback image tagging script exists | VERIFIED as repository artifacts; procedure text also marks execution NOT AUTHORIZED / readiness-oriented; live practice UNKNOWN |
| health verification (repo mechanisms) | Compose healthchecks + operator logs; nginx `/healthz` | VERIFIED mechanisms; last production result UNKNOWN |

Identity rule for engineering control:

```text
Repository HEAD
  != production repository revision (if any)
  != deployed application / image identity
```

---

## Operations

| Field | Value | Evidence |
|-------|-------|----------|
| logs | Operator `docker compose logs`; backup unit journal identifiers in systemd units | VERIFIED as repo mechanisms; central log platform UNKNOWN / not required by this baseline |
| backups | `scripts/ops/rento-backup.sh` + `deploy/systemd/rento-backup.timer` | VERIFIED scripts/units exist; installed/succeeding on host UNKNOWN |
| rollback | `scripts/ops/rento-preserve-rollback-images.sh` + procedure text | VERIFIED scripts/docs; available host tags UNKNOWN |
| recovery | Restore/plan documentation exists | INFERRED from docs; live restore evidence UNKNOWN |

---

## Tests and verification

| Area | Value | Evidence |
|------|-------|----------|
| Backend tests | `backend/tests/` pytest (auth, authz, contracts, viewing, favorites, uploads, smoke, etc.) | VERIFIED |
| Frontend checks | `npm run lint`, `typecheck`, `build` | VERIFIED |
| Frontend behavioral/E2E automation | Absent in project source | VERIFIED |
| Ops smoke automation | No dedicated production smoke script under `scripts/ops/` | VERIFIED |
| Process gates | `docs/engineering/protocol/DEPLOYMENT_GATE.md`, `PRODUCTION_ACCEPTANCE.md` | VERIFIED |

---

## Mapping vs reference

| Area | Classification | Notes | Evidence |
|------|----------------|-------|----------|
| Dominant Router → Service → Repository | JUSTIFIED ADAPTATION | Dominant pattern; exceptions: uploads router I/O, session ORM, AI external call | VERIFIED |
| Session-cookie auth + CSRF | DELIBERATE ARCHITECTURAL DECISION | Current request auth path; JWT helpers unused | VERIFIED |
| `docs/ARCHITECTURE.md` JWT wording | TECHNICAL DEBT | Documentation drift vs implementation | VERIFIED |
| Manual Compose deploy (no in-repo CI/CD) | DELIBERATE ARCHITECTURAL DECISION | Documented manual procedure; absence of CI workflows verified; not treated as missing unless automation need is demonstrated | VERIFIED |
| Frontend behavioral/E2E tests | MISSING CAPABILITY | FE behavior changes lack automated FE verification; residual risk after lint/typecheck/build | VERIFIED (absence) + engineering-control gap |
| Deployed application identity proof | MISSING CAPABILITY | Cannot prove running image/release identity from repo alone; Git HEAD must not be used as substitute | VERIFIED limitation / live values UNKNOWN |
| Cloudflare + nginx origin config | JUSTIFIED ADAPTATION | Present as repository ingress configuration | VERIFIED REPO CONFIG |
| Full APM/metrics platform in Compose | NOT APPLICABLE | Not required merely because reference mentions observability; app logging/signals exist separately | INFERRED |
| Backup/rollback scripts | JUSTIFIED ADAPTATION | Mechanisms encoded in repo; live effectiveness UNKNOWN | VERIFIED scripts / UNKNOWN prod |
| Ops procedure vs current Compose (nginx / published ports) | TECHNICAL DEBT | `DEPLOYMENT_PROCEDURE.md` still describes older local port assumptions in places | VERIFIED doc vs Compose drift |

---

## Baseline hygiene

- Prefer short factual entries over narrative.
- Update when repository or production evidence changes.
- Keep UNKNOWN visible until evidence exists.
- Do not rewrite the reference map to hide project differences.
- Re-verify production fields with explicit production evidence before deploy/acceptance claims.
- Before changing a layer, inspect the concrete files in the quick map — do not rely on folder names alone.
