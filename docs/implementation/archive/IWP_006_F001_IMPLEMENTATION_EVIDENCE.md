# IWP-006 F-001 Technical Implementation Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_006_F001_IMPLEMENTATION_EVIDENCE.md` |
| Invocation | PASS — PUBLISHED §34 F-001 TECHNICAL IMPLEMENTATION AUTHORIZATION INVOKED |
| §32 publication | `867694cb555fedb417832e58a0bddb2438858fdc` |
| §34 publication | `2257bf8512d1d3b412ddf61d9e00777239f805fe` |
| §36 publication | `649e024c3fb504fcab10a7fc0d42e438861dbc32` |
| Independent acceptance review | PASS — bounded F-001 implementation accepted |
| F-001 | RESOLVED — bounded scope only |
| SR-F001-001 through SR-F001-007 | RESOLVED — bounded scope only |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |

## 2. Starting Repository State (Implementation Invocation)

| Item | Value |
|------|-------|
| HEAD at invocation | `2257bf8512d1d3b412ddf61d9e00777239f805fe` |
| Branch | `main` |
| origin/main | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence at invocation | 8 ahead / 0 behind |
| Staging | empty |

## 3. Resolved Maximum Write Set (§32.11)

**24 paths modified/created** (maximum 34 authorized). Conditional unchanged: B4, B10, B11, B13, B14, B15, B18, F6, F7, F8.

Prior draft wording stated 25 paths; reconciliation of §32.11 anchors, §4 inventory, and Git diff confirms **24** distinct implementation paths. No additional §32.11 path was modified.

## 4. Files Actually Changed

### Backend — modified (B*, BN2)

- `backend/app/main.py` (B1)
- `backend/app/routers/auth.py` (B2)
- `backend/app/services/auth_service.py` (B3)
- `backend/app/core/config.py` (B5)
- `backend/app/core/security/dependencies.py` (B6)
- `backend/app/services/user_service.py` (B7)
- `backend/app/routers/users.py` (B8)
- `backend/app/schemas/user.py` (B9)
- `backend/app/services/account_status_service.py` (B12)
- `backend/app/core/rate_limit.py` (B16)
- `backend/app/routers/favorites.py` (B17)
- `backend/app/models/__init__.py` (BN2)

### Backend — created (BN*, BT1)

- `backend/app/models/auth_session.py` (BN1)
- `backend/app/services/session_service.py` (BN3)
- `backend/app/core/security/csrf.py` (BN4)
- `backend/alembic/versions/a1f006_session_auth_add_auth_sessions.py` (BN5)
- `backend/tests/test_iwp006_f001_session_auth.py` (BT1)

### Frontend — modified (F*)

- `frontend/lib/tokenStorage.ts` (F1)
- `frontend/lib/authFetch.ts` (F2)
- `frontend/context/AuthContext.tsx` (F3)
- `frontend/services/authApi.ts` (F4)
- `frontend/types/auth.ts` (F5)
- `frontend/components/RealtorRoute.tsx` (F9)

### Frontend — created (FN1)

- `frontend/lib/csrf.ts` (FN1)

### Conditional paths left unchanged

- B4 `jwt.py`, B10 `handlers.py`, B11 `exceptions.py`, B13 `user.py`, B14 `admin_users.py`, B15 `realtor_profiles.py`, B18 `properties.py`
- F6 `user.ts`, F7 `ProtectedRoute.tsx`, F8 `AdminRoute.tsx`

### Excluded (untouched)

- `frontend/services/api.ts`, F-013 surfaces, governance authorities

### §36 regression-test alignment (separate published authority)

- `backend/tests/test_iwp_003_domain_authorization.py` — `test_role_guard_denies_ordinary_user` only; both stale `BadRequestException` expectations aligned to `ForbiddenException`; production 403 role-guard behavior unchanged

## 5. Architecture Preservation

- Server-side persisted sessions with hashed token storage
- HttpOnly session cookie + non-HttpOnly CSRF cookie (double-submit)
- Sliding idle + absolute expiry
- No refresh tokens; no bearer in login response
- Logout revokes session and clears cookies
- CSRF middleware on mutating routes with auth bootstrap exempt paths
- 401 invalid session; 403 forbidden role/account/CSRF
- Single cookie session dependency
- Rate limit upload key uses session digest
- No dual bearer/cookie mode in authorized surfaces

## 6. Migration

| Field | Value |
|-------|-------|
| Revision | `a1f006_session_auth` |
| down_revision | `b8c4e2f91a06` |
| Upgrade (isolated) | PASS |
| Downgrade (isolated) | PASS |
| Re-upgrade (isolated) | PASS |
| Full-chain SQLite upgrade | NOT RUN — legacy migrations incompatible with SQLite batch constraints |
| Alembic up/down/re-up rerun at acceptance | NOT RUN — prior isolated PASS retained |

`backend/alembic/env.py` not modified (hand-written BN5 sufficient).

## 7. Configuration Key Names (no values)

`SESSION_COOKIE_NAME`, `SESSION_IDLE_TIMEOUT_MINUTES`, `SESSION_ABSOLUTE_TIMEOUT_MINUTES`, `SESSION_COOKIE_SECURE`, `SESSION_COOKIE_SAMESITE`, `CSRF_COOKIE_NAME`, `CSRF_HEADER_NAME`

## 8. Finding Mapping

| Finding | Implementation | Validation | Bounded resolution |
|---------|----------------|------------|-------------------|
| SR-F001-001 | Session cookie; no bearer body; tokenStorage no-op | BT1; frontend build | RESOLVED — nine-path boundary |
| SR-F001-002 | 401/403 in dependencies; authFetch reconciliation | BT1; iwp_003 role guard | RESOLVED |
| SR-F001-003 | POST /auth/logout; session revoke | BT1 | RESOLVED |
| SR-F001-004 | session_service idle/absolute expiry | BT1 idle/absolute tests | RESOLVED |
| SR-F001-005 | cookie transport; unified authFetch | frontend typecheck/build | RESOLVED — nine-path boundary |
| SR-F001-006 | unified dependency; RealtorRoute isRealtor | BT1 admin 403; iwp_003 | RESOLVED |
| SR-F001-007 | RealtorRoute context alignment | frontend build | RESOLVED |

F-013 / `frontend/services/api.ts` bearer transport remains deferred and outside bounded F-001 scope.

## 9. Commands and Results

### Initial implementation validation (pre-§36)

| Command | Result |
|---------|--------|
| `pytest tests/test_iwp006_f001_session_auth.py -q` | PASS — 12/12 |
| `pytest tests/test_backend_smoke.py -q` | PASS — 3/3 |
| `pytest tests/test_iwp_003_domain_authorization.py -q` | **FAIL** — 1 failed, 28 passed (`test_role_guard_denies_ordinary_user` expected 400; implementation correctly returns 403 per §32.8) |
| Alembic BN5 isolated up/down/re-up | PASS |
| `npm run typecheck` (frontend) | PASS |
| `npm run lint` (frontend) | PASS |
| `npm run build` (frontend) | PASS |

Historical note: an earlier draft recorded this failure as `1/44`; module count at correction time was **29 tests** (28 passed, 1 failed).

### Post-§36 correction and acceptance validation (current)

| Command | Result |
|---------|--------|
| `pytest tests/test_iwp_003_domain_authorization.py::test_role_guard_denies_ordinary_user -q` | PASS — 1/1 |
| `pytest tests/test_iwp_003_domain_authorization.py -q` | PASS — 29/29 |
| `pytest tests/test_iwp006_f001_session_auth.py -q` | PASS — 12/12 |
| `pytest tests/test_backend_smoke.py -q` | PASS — 3/3 |
| `npm run typecheck` (frontend) | PASS |
| `npm run lint` (frontend) | PASS |
| `npm run build` (frontend) | PASS |
| scoped `git diff --check` | PASS |
| TestClient HTTP integration | NOT RUN — `httpx` not installed |
| Password-reset HTTP regression | NOT RUN |
| Full Alembic head on SQLite | NOT RUN — environment constraint |

## 10. Residual Risks

- F-013 / `frontend/services/api.ts` still uses bearer localStorage on some admin/realtor pages (outside nine-path write set)
- Excluded upload routes accept cookie auth; CSRF middleware is global but excluded routes were not in write set
- TestClient HTTP integration and password-reset HTTP regression not executed at acceptance

## 11. Final Git State (Pre-Commit Baseline for This Evidence Update)

| Item | Value |
|------|-------|
| HEAD before F-001 implementation commit | `649e024c3fb504fcab10a7fc0d42e438861dbc32` |
| Branch | `main` |
| origin/main | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 9 ahead / 0 behind |
| Staging | empty |

## 12. Lifecycle Boundary

F-001 and SR-F001-001–007 are **RESOLVED within bounded F-001 scope** per independent targeted acceptance review. This evidence records implementation and validation; it is **not** IWP-006 acceptance or closure. F-013 remains deferred. Push, release, deployment, and Work Package register synchronization require separate authority.
