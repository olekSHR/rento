# IWP-006 F-001 Backend Read-Only Validation Evidence

## 1. Artifact Identity And Status

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md` |
| Package | IWP-006 |
| Finding | F-001 only |
| Activity | Bounded backend read-only validation execution under published §30 |
| Artifact status | PREPARED — NOT REVIEWED — NOT PUBLISHED — NOT COMMITTED |
| Validation execution | COMPLETED under bounded read-only scope |
| Backend modification | NONE |
| F-001 | UNRESOLVED |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |

---

## 2. Controlling Authority And Publication Commits

| Authority | Commit | Role |
|-----------|--------|------|
| §28–§29 validation-scope authority | `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` | Subjects, path discovery, exclusions, evidence rules |
| §30–§31 execution authorization | `0a8127896b087dc240e53f7710b1de7258c59bf1` | Invocation gate for this execution |
| §26 correction-scope authority | `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` | Target architecture posture input |
| §24 frontend security evidence | `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` | SR-F001 findings and frontend facts |

Supporting evidence (read-only, not amended):

- `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` — F-001
- `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` — SR-F001-001 through SR-F001-007

Engineering authorities consumed: SECURITY_STANDARDS, AUTHENTICATION_ARCHITECTURE, AUTHORIZATION_ARCHITECTURE, API_STANDARDS, IMPLEMENTATION_GOVERNANCE, REPOSITORY_STANDARDS (conceptual compliance assessment only; no override of §28/§30).

---

## 3. Starting Repository State

| Item | Verified value |
|------|----------------|
| Repository root | `C:/Users/Александр/Desktop/Projects/rento` |
| Branch | `main` |
| HEAD at validation start | `0a8127896b087dc240e53f7710b1de7258c59bf1` |
| HEAD parent | `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 5 ahead / 0 behind |
| Staging | empty |
| Evidence artifact before execution | absent |
| Technical correction write set | absent |

Unrelated local-only items present and untouched:

- `M docs/design/releases/v1.0-admin-platform.md`
- `M docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`
- `?? docs/implementation/reviews/STAGE_I0_LIFECYCLE_EVIDENCE_RECONSTRUCTION.md`

---

## 4. Authorized Scope

**Invocation:** Separate bounded execution task under published §30 @ `0a81278…` and published §28 @ `9a36e9b…`.

**Permitted activity:** Repository-only, read-only inspection of narrow backend auth/session transport surfaces for 13 F-001 validation subjects.

**Prohibited and not performed:** `.env` access, secret values, production/runtime access, frontend inspection, infrastructure/deployment inspection, migrations review, application execution, backend modification, remediation, implementation, finding resolution, register/handoff sync, commit, push.

---

## 5. Explicit Exclusions

All §30.7 exclusions were observed. No `.env` file, secret store, production system, runtime mutation, frontend code, infrastructure configuration, migration files, dependency installation, network calls (except authorized `git fetch origin main`), or application tests were accessed.

---

## 6. Pre-Inspection Candidate-Path Inventory

| # | Path | Validation subject | Why required | Inspected |
|---|------|-------------------|--------------|-----------|
| 1 | `backend/app/main.py` | 9 — CORS/credentials | Application CORS middleware registration | YES |
| 2 | `backend/app/routers/auth.py` | 1, 6 — issuance/logout | Auth route entry points | YES |
| 3 | `backend/app/services/auth_service.py` | 1 — issuance | Login/register service invoked by auth router | YES |
| 4 | `backend/app/core/security/jwt.py` | 1, 2 — issuance/TTL | Access token creation and verification | YES |
| 5 | `backend/app/core/config.py` | 2 — TTL config keys | Declares `ACCESS_TOKEN_EXPIRE_MINUTES`, `ALGORITHM`, `SECRET_KEY` keys | YES |
| 6 | `backend/app/core/security/dependencies.py` | 8, 12 — extraction/roles | Primary OAuth2 bearer dependencies and role guards | YES |
| 7 | `backend/app/services/user_service.py` | 8, 11 — extraction/`/users/me` | Alternate `get_current_user` used by `/users/me` | YES |
| 8 | `backend/app/routers/users.py` | 11 — reconciliation | `/users/me` endpoint | YES |
| 9 | `backend/app/schemas/user.py` | 1, 7 — response shape | `TokenResponse` documents bearer JSON contract | YES |
| 10 | `backend/app/core/handlers.py` | 11 — error contract | 401/403 JSON handlers | YES |
| 11 | `backend/app/core/exceptions.py` | 11 — error types | Exception classes used by auth paths | YES |
| 12 | `backend/app/services/account_status_service.py` | 1, 8, 12 | Account restriction checks on login/auth | YES |
| 13 | `backend/app/models/user.py` | 12 — role source | `User.role` persistence field | YES |
| 14 | `backend/app/routers/admin_users.py` | 12 — admin enforcement sample | Representative `require_admin` protected route | YES |
| 15 | `backend/app/routers/realtor_profiles.py` | 12 — realtor enforcement sample | Representative role guard using `ForbiddenException` | YES |
| 16 | `backend/app/core/rate_limit.py` | 13 — observability | Login rate limit and bearer digest key for uploads | YES |
| 17 | `backend/app/routers/favorites.py` | 8, 11 — dual auth path | Route using `user_service.get_current_user` | YES (dependency reference only) |
| 18 | `backend/app/routers/properties.py` | 12 — role enforcement sample | Representative `require_admin` / `require_admin_or_realtor` usage | YES (dependency reference only) |

---

## 7. Actual Inspected-Path Inventory

All paths marked YES in Section 6 were read. No additional backend paths were opened beyond the candidate inventory.

Total inspected backend paths: **18**

---

## 8. Expansion Log

| From | To | Subject | Direct-link reason |
|------|-----|---------|-------------------|
| `backend/app/routers/auth.py` | `backend/app/services/auth_service.py` | 1 | Router calls `auth_service.login_user` / `register_user` |
| `backend/app/services/auth_service.py` | `backend/app/core/security/jwt.py` | 1, 2 | Service calls `create_access_token` |
| `backend/app/core/security/jwt.py` | `backend/app/core/config.py` | 2 | JWT module reads `settings.ACCESS_TOKEN_EXPIRE_MINUTES`, `SECRET_KEY`, `ALGORITHM` |
| `backend/app/services/auth_service.py` | `backend/app/services/account_status_service.py` | 1, 12 | Login calls `assert_can_login` |
| `backend/app/routers/users.py` | `backend/app/services/user_service.py` | 11 | `/users/me` depends on `user_service.get_current_user` |
| `backend/app/services/user_service.py` | `backend/app/core/security/jwt.py` | 8, 11 | Uses `verify_access_token` |
| `backend/app/core/security/dependencies.py` | `backend/app/models/user.py` | 12 | Role checks use `current_user.role` from authenticated user model |
| `backend/app/routers/realtor_profiles.py` | `backend/app/core/security/dependencies.py` | 12 | `require_realtor` wraps `get_current_user` |

No expansion required repository-wide search, migration inspection, or database content access.

---

## 9. Validation Method And Evidence Classifications

**Method:** Read-only review of committed backend source under §30.5 path control. No runtime execution. No secret values read from environment.

**Classifications used:**

- **CONFIRMED FACT** — direct repository evidence
- **CONFIRMED ABSENCE** — bounded inspection of linked auth chain sufficient to state absence within inspected scope
- **INFERENCE** — explicitly labeled; not presented as certainty
- **AMBIGUITY** — cannot determine within authorized scope without `.env`/runtime
- **BLOCKER** — none triggered

---

## 10. Subject-By-Subject Validation Results

### Subject 1 — Token or session issuance

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `POST /auth/login` (`backend/app/routers/auth.py` L48–L64) calls `auth_service.login_user`. |
| CONFIRMED FACT | `login_user` (`backend/app/services/auth_service.py` L50–L57) creates JWT via `create_access_token({"sub": user.email})` and returns JSON `{"access_token", "token_type": "bearer"}`. |
| CONFIRMED FACT | `POST /auth/register` creates user only; no session/token issued on register. |
| CONFIRMED ABSENCE | No server-side session record or cookie issuance in inspected login chain. |

### Subject 2 — Access-token or session TTL

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `create_access_token` (`backend/app/core/security/jwt.py` L16–L18) sets JWT `exp` to `now + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)`. |
| CONFIRMED FACT | Config key `ACCESS_TOKEN_EXPIRE_MINUTES: int` declared in `backend/app/core/config.py` L13 (required env-backed setting). |
| AMBIGUITY | Numeric TTL minutes value not present in repository; loaded from `.env` at runtime (not inspected per §30.7). |

### Subject 3 — Refresh issuance and TTL

| Classification | Evidence |
|----------------|----------|
| CONFIRMED ABSENCE | No refresh token creation, storage, or response field in inspected auth router, auth service, or jwt modules. |

### Subject 4 — Refresh rotation

| Classification | Evidence |
|----------------|----------|
| CONFIRMED ABSENCE | No refresh token or rotation logic in inspected auth chain. |

### Subject 5 — Revocation and invalidation

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | Access tokens are stateless JWTs verified cryptographically (`verify_access_token`, `jwt.py` L32–L48). |
| CONFIRMED ABSENCE | No access-token blacklist, session store, or server-side invalidation mechanism in inspected auth chain. |
| CONFIRMED ABSENCE | No logout endpoint to invalidate active bearer tokens. |

### Subject 6 — Logout and invalidation behavior

| Classification | Evidence |
|----------------|----------|
| CONFIRMED ABSENCE | No `/auth/logout` or equivalent route in `backend/app/routers/auth.py`. Inspected routes: `/register`, `/login`, `/forgot-password`, `/reset-password` only. |
| CONFIRMED ABSENCE | No cookie clearing or token revocation handler in inspected auth modules. |

### Subject 7 — Cookie issuance or confirmed absence

| Classification | Evidence |
|----------------|----------|
| CONFIRMED ABSENCE | Login handler does not accept `Response` cookie mutation for auth success path beyond rate-limit middleware signature; `auth_service.login_user` returns dict only. |
| CONFIRMED ABSENCE | No `set_cookie`, `Set-Cookie`, or session cookie configuration in inspected auth, jwt, dependencies, or main modules. |
| CONFIRMED FACT | `TokenResponse` schema (`backend/app/schemas/user.py` L42–L46) defines JSON `access_token` and `token_type` fields only. |

### Subject 8 — Credential extraction and authentication dependencies

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `OAuth2PasswordBearer(tokenUrl="/auth/login")` in `dependencies.py` L18–L20 and `user_service.py` L17–L19 extracts bearer token from `Authorization` header. |
| CONFIRMED FACT | Two parallel `get_current_user` implementations exist: `dependencies.get_current_user` and `user_service.get_current_user`. |
| CONFIRMED FACT | Invalid/expired token in `dependencies.get_current_user` raises `BadRequestException` → HTTP 400 (`dependencies.py` L37–L38). |
| CONFIRMED FACT | Invalid/expired token in `user_service.get_current_user` raises `UnauthorizedException` → HTTP 401 (`user_service.py` L36–L38). |
| INFERENCE | Missing bearer header behavior is delegated to FastAPI `OAuth2PasswordBearer` auto-error handling; exact status/body for missing credentials not redefined in inspected app handlers. |

### Subject 9 — Credentialed CORS policy relevant to cookie transport

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `CORSMiddleware` in `backend/app/main.py` L42–L51 sets `allow_credentials=True` and allows origins `http://localhost:3000`, `http://127.0.0.1:3000`. |
| CONFIRMED FACT | Current auth transport is bearer header JSON, not cookies; CORS credential flag is configured but cookie auth is not implemented in inspected backend. |
| AMBIGUITY | Production/staging origin list not defined in inspected code beyond localhost entries. |

### Subject 10 — CSRF-relevant controls

| Classification | Evidence |
|----------------|----------|
| CONFIRMED ABSENCE | No CSRF middleware, token validation, or CSRF-related symbols in inspected backend auth/main modules (bounded search within inspected paths only). |
| CONFIRMED FACT | Mutating auth endpoints (`/auth/login`, `/auth/register`) accept form/JSON without CSRF token requirement in inspected router definitions. |

### Subject 11 — `/users/me` or equivalent reconciliation

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `GET /users/me` exists at `backend/app/routers/users.py` L16–L24. |
| CONFIRMED FACT | Depends on `user_service.get_current_user`; returns `UserResponse` with `id`, `email`, `role`, `account_status`. |
| CONFIRMED FACT | Restricted account during auth raises `ForbiddenException` → HTTP 403 via `account_status_service.assert_can_authenticate` (`account_status_service.py` L23–L27). |
| CONFIRMED FACT | Invalid token on `/users/me` path uses 401 handler (`UnauthorizedException`). |

### Subject 12 — Server-side role and authorization enforcement

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | `User.role` persisted on model (`backend/app/models/user.py` L24–L27). |
| CONFIRMED FACT | `require_admin` / `require_admin_or_realtor` in `dependencies.py` enforce role checks server-side (L64–L128). |
| CONFIRMED FACT | Role failure in `require_admin` / `require_admin_or_realtor` raises `BadRequestException` → HTTP 400, not 403. |
| CONFIRMED FACT | `require_realtor` in `realtor_profiles.py` L21–L27 raises `ForbiddenException` → HTTP 403 for non-realtor. |
| CONFIRMED FACT | Representative protected routes use server dependencies: e.g. `admin_users.py` L34 (`require_admin`), `properties.py` L35 (`require_admin`). |

### Subject 13 — Safe session observability without credential disclosure

| Classification | Evidence |
|----------------|----------|
| CONFIRMED FACT | Login endpoint rate-limited via `@limiter.limit(settings.RATE_LIMIT_LOGIN)` (`auth.py` L52). |
| CONFIRMED FACT | Rate limiter logs configuration at startup without secrets (`rate_limit.py` L96–L100). |
| CONFIRMED FACT | Upload rate-limit key uses SHA-256 digest prefix of bearer token, not raw token (`rate_limit.py` L38–L46). |
| CONFIRMED ABSENCE | No dedicated auth/session audit event log or structured session lifecycle telemetry in inspected auth modules. |

---

## 11. Relevant Routes, Symbols, Dependencies, And Configuration Keys

**Routes (inspected):**

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /users/me`

**Key symbols:**

- `create_access_token`, `verify_access_token`
- `oauth2_scheme`, `get_current_user`, `require_admin`, `require_admin_or_realtor`
- `user_service.get_current_user`
- `TokenResponse`
- `UnauthorizedException`, `ForbiddenException`, `BadRequestException`

**Configuration keys (names only; no values):**

- `SECRET_KEY`
- `ALGORITHM`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `RATE_LIMIT_LOGIN`
- `RATE_LIMIT_ENABLED`
- `RATE_LIMIT_STORAGE_URI`

---

## 12. Confirmed Facts

1. Backend login issues a stateless JWT access token returned as JSON bearer credentials.
2. JWT expiry is computed from `ACCESS_TOKEN_EXPIRE_MINUTES` configuration key.
3. Protected routes extract bearer tokens via `OAuth2PasswordBearer`.
4. Server-side role enforcement exists through dependency guards on protected routes.
5. `GET /users/me` provides authenticated user identity including `role` and `account_status`.
6. CORS middleware enables `allow_credentials=True` for localhost frontend origins.
7. Two different `get_current_user` implementations produce different HTTP status codes for invalid tokens on different routes (400 vs 401).
8. No backend logout, refresh, cookie auth, CSRF control, or access-token revocation mechanism exists in the inspected auth chain.

---

## 13. Confirmed Absences (Within Inspected Scope)

1. HttpOnly/Secure/SameSite authentication cookies.
2. Refresh token issuance, TTL, and rotation.
3. Server-side access-token revocation or logout invalidation endpoint.
4. CSRF protections for cookie-authenticated mutating requests.
5. Dedicated session lifecycle observability beyond rate-limit logging.

---

## 14. Ambiguities And Blockers

**Ambiguities:**

| Item | Reason |
|------|--------|
| Exact `ACCESS_TOKEN_EXPIRE_MINUTES` numeric value | Value supplied via `.env`; file not inspected |
| Exact `ALGORITHM` value | Env-backed; file not inspected |
| Missing `Authorization` header behavior on all routes | Delegated to FastAPI OAuth2 scheme defaults; not fully overridden in inspected handlers |
| Non-localhost CORS origins | Not declared in inspected `main.py` |

**Blockers:** None. Validation completed within bounded scope.

---

## 15. Fact Versus Inference Separation

All items in Sections 12–13 are **CONFIRMED FACT** or **CONFIRMED ABSENCE** unless labeled otherwise in Section 14.

The only **INFERENCE** recorded: missing bearer header handling follows FastAPI `OAuth2PasswordBearer` default behavior because inspected code does not define a custom missing-credentials handler for the scheme.

---

## 16. SR-F001 Finding Mapping

| Finding | Severity | Subjects examined | Key backend evidence | Confirmed facts | Confirmed absences | Ambiguity | Remediation evidence needed later | Disposition | Resolved by validation alone |
|---------|----------|-------------------|----------------------|-----------------|-------------------|-----------|-----------------------------------|-------------|-------------------------------|
| SR-F001-001 | HIGH | 1, 7, 8 | Bearer JWT JSON response; no cookies | Bearer token in JSON body | HttpOnly cookie transport | TTL numeric value | Yes — cookie-session correction scope | Backend confirms header/bearer model incompatible with §26.4 target without correction | **NO** |
| SR-F001-002 | HIGH | 8, 11 | Dual `get_current_user`; 400 vs 401 | `/users/me` uses 401; many routes use 400 for invalid token | N/A | Missing-auth scheme defaults | Yes — unified reconciliation contract | Inconsistent auth failure semantics across routes | **NO** |
| SR-F001-003 | MEDIUM | 5, 6 | No logout route | N/A | Server logout/invalidation | N/A | Yes — logout invalidation in correction scope | Client-only logout implied by backend absence | **NO** |
| SR-F001-004 | MEDIUM | 2, 3, 4 | JWT TTL key; no refresh | TTL mechanism via JWT exp | Refresh/rotation | Exact minute value | Yes — renewal model in correction scope | Stateless JWT expiry only | **NO** |
| SR-F001-005 | MEDIUM | 1, 7, 8 | Bearer OAuth2 transport | Single bearer-header model | Cookie transport | N/A | Yes — transport unification in correction scope | Backend aligns with frontend bearer pattern | **NO** |
| SR-F001-006 | LOW | 11, 12 | Server role on user; guards | Server-side role enforcement exists | N/A | 400 vs 403 on role failures | Possibly in correction scope | Server authority present; status-code consistency varies | **NO** |
| SR-F001-007 | LOW | 11 | `/users/me` contract | Reconciliation endpoint exists | N/A | N/A | Frontend UX primarily | Backend provides identity endpoint | **NO** |

---

## 17. Security And Secret-Handling Confirmation

- No `.env` file was read.
- No secret values, tokens, credential material, hashes, or API keys were copied into this artifact.
- Only configuration **key names** are recorded.
- Upload rate limiting uses SHA-256 digest prefix, not raw bearer token in key material description.
- Validation did not modify backend code or configuration.

---

## 18. Evidence Limitations

1. Numeric env-backed settings (`ACCESS_TOKEN_EXPIRE_MINUTES`, `ALGORITHM`) not verified without `.env` access.
2. Password-reset token subsystem exists in auth router imports but was not expanded beyond F-001 session transport scope; it does not establish access-token revocation.
3. Inspection limited to 18 bounded backend paths; repository-wide nonexistence beyond inspected/directly linked scope is not claimed.
4. No runtime verification of HTTP status bodies or OpenAPI security scheme behavior.
5. Frontend code intentionally excluded per §30.7.

---

## 19. Validation Verdict

**PASS — F-001 BACKEND READ-ONLY VALIDATION EVIDENCE PREPARED**

Bounded backend validation evidence artifact prepared from repository-only inspection under published §28 and invoked §30. All 13 subjects addressed. All seven SR-F001 findings mapped. No §30 stop condition triggered.

---

## 20. Explicit Non-Resolution And Non-Authorization Statements

- Validation evidence does **not** modify the backend.
- Validation alone does **not** resolve or reclassify F-001 or any SR-F001 finding.
- No technical correction write set was created.
- Technical implementation remains **NOT AUTHORIZED**.
- IWP-006 remains **not accepted** and **not closed**.
- Commit and push remain **NOT AUTHORIZED** and were **NOT RUN** by this task.
- This artifact is package evidence only; it is not independent permanent Repository Authority until separately reviewed and published if required.

---

## 21. Files Changed

| File | Action |
|------|--------|
| `docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md` | CREATED (this artifact) |

No backend file, configuration file, migration, or unrelated repository file was modified.

---

## 22. Checks Performed

| Check | Result |
|-------|--------|
| `git fetch origin main` | PASS |
| Baseline and publication commit verification | PASS |
| §28/§30 authority identity | PASS |
| Bounded read-only backend inspection (18 paths) | PASS |
| Evidence artifact creation | PASS |
| `git diff --check` on evidence artifact | PASS (post-create) |
| Staging empty | PASS |
| Unrelated local items preserved | PASS |
| Application tests | NOT RUN |
| Runtime validation | NOT RUN |
| Backend modification | NOT APPLICABLE |
| Commit | NOT RUN |
| Push | NOT RUN |

---

## 23. Final Git State

```
HEAD:        0a8127896b087dc240e53f7710b1de7258c59bf1
origin/main: 59ea460935f0d418d12ec0d6b7ffd333a2a0fd04
Divergence:  5 ahead / 0 behind
Staging:     empty

New untracked artifact (this task):
?? docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md

Preserved unrelated:
 M docs/design/releases/v1.0-admin-platform.md
 M docs/implementation/IWP_003_EXECUTION_EVIDENCE.md
?? docs/implementation/reviews/STAGE_I0_LIFECYCLE_EVIDENCE_RECONSTRUCTION.md
```

---

## 24. Exact Next Authorized Action

Perform an independent targeted read-only review of `docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md` against published §28 @ `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` and published §30 @ `0a8127896b087dc240e53f7710b1de7258c59bf1`.

Do not modify or publish the evidence, remediate backend code, create a technical correction write set, resolve findings, synchronize lifecycle records, stage, commit, or push.
