# TASK-008 — Admin/Realtor Property List Pagination Bounds

| Field | Value |
|-------|-------|
| ID | TASK-008 |
| TITLE | Admin/Realtor Property List Pagination Bounds |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / query validation |

> STATUS: CLOSED means implementation, local verification, commit, push, backend-only deployment, and production acceptance are complete. Archive remains a separate gate.

**Discovery reference:** Post TASK-007 bounded discovery (2026-08-16) — recommendation: `C1 — Bound admin and realtor property-list pagination`; deployment: `BACKEND_ONLY`.

**API contract decision (Rento-specific, locked for TASK-008):** Admin `GET /properties/admin/all` and realtor `GET /realtor/properties` SHALL use the same pagination domain as neighboring collection endpoints:

```text
limit:  default 100, ge=1, le=100
offset: default 0,   ge=0
```

Invalid `limit` or `offset` SHALL return HTTP **422**.

`le=100` is a locked TASK-008 contract, not an open unknown. Grounds:

- neighboring collection endpoints already use `le=100`;
- current frontend calls both endpoints with no query string and therefore already receives at most the default **100**;
- there is no evidence that admin or realtor clients must receive more than 100 rows in one request.

A later need for `limit > 100` is a separate API-contract change, not part of TASK-008.

---

## Problem

**Resource:** Authenticated property collection pagination on admin and realtor list routes.

**Current:** Public `GET /properties/` already validates `limit` (`ge=1, le=100`) and `offset` (`ge=0`). Admin and realtor list routes declare bare `int` parameters (`limit=100`, `offset=0`) and forward them to repository `.limit(limit)` / `.offset(offset)` without FastAPI bounds.

**Target:** The same invalid pagination values that public collections reject with **422** are also rejected on the two in-scope authenticated list routes. Valid default and in-range requests remain accepted. Repository list semantics for valid `limit`/`offset` stay unchanged.

This is a narrow collection-query contract alignment. It does not add frontend pagination UI and does not change default `limit=100`.

---

## Current Behavior

### Admin path

`GET /properties/admin/all` → `get_properties_admin()` → `property_service.get_all_properties_admin()` → `property_repository.get_all_properties_admin()`.

### Realtor path

`GET /realtor/properties` → `get_my_realtor_properties()` → `property_service.get_properties_by_owner_id()` → `property_repository.get_properties_by_owner_id()`.

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Public list bounds | `limit = Query(default=10, ge=1, le=100)`, `offset = Query(default=0, ge=0)` | VERIFIED — `backend/app/routers/properties.py:57-58` |
| Admin list bounds | `limit: int = 100`, `offset: int = 0` — no `Query` `ge`/`le` | VERIFIED — `backend/app/routers/properties.py:43-45` |
| Realtor list bounds | `limit: int = 100`, `offset: int = 0` — no `Query` `ge`/`le` | VERIFIED — `backend/app/routers/realtor_profiles.py:65-67` |
| Neighboring collections | viewing-requests, public realtor listings, admin users already `ge=1, le=100` | VERIFIED — `viewing_requests.py`, `public_realtors.py:20-21`, `admin_users.py:25-26` |
| Service | Forwards `limit`/`offset` unchanged | VERIFIED — `property_service.get_all_properties_admin`, `get_properties_by_owner_id` |
| Repository | `.limit(limit)` and `.offset(offset)` as supplied | VERIFIED — `property_repository.py:99-103` and owner-id list |
| Frontend | `getAdminProperties()` / `getMyRealtorProperties()` send no query params | VERIFIED — `frontend/services/api.ts` |
| Existing tests | No coverage of admin/realtor list `limit`/`offset` validation | VERIFIED — no matches in `backend/tests/` |

**Observed defect examples (VERIFIED from current declarations):**

```text
GET /properties/admin/all?limit=-1     → no FastAPI 422 from Query bounds
GET /properties/admin/all?limit=0      → no FastAPI 422 from Query bounds
GET /properties/admin/all?limit=1000000 → no FastAPI 422 from Query bounds
GET /realtor/properties?limit=-1       → same
```

Default no-query requests remain `limit=100`, `offset=0` and are valid under the locked contract.

**Negative `limit` runtime on PostgreSQL:** INFERRED — PostgreSQL `LIMIT` expects a non-negative count; a negative value may surface as a driver/server error rather than a validation 422. Do not require a production probe to lock the contract. TASK-008 rejects the value at the API boundary.

**Historical deferral (VERIFIED):**

| Source | Statement |
|--------|-----------|
| TASK-004 Follow-up | Admin/realtor collection pagination bounds |
| TASK-006 Follow-up | Admin/realtor collection pagination bounds |
| TASK-007 Follow-up / Out of Scope | Admin `GET /properties/admin/all` and realtor `GET /realtor/properties` pagination |

---

## Target Behavior

### Locked contract

| Condition | Validity | HTTP |
|-----------|----------|------|
| no `limit` / no `offset` (defaults 100 / 0) | VALID | not 422 due to pagination |
| `limit=1` | VALID | not 422 due to pagination |
| `limit=100` | VALID | not 422 due to pagination |
| `offset=0` | VALID | not 422 due to pagination |
| `limit=0` | **INVALID** | **422** |
| `limit=-1` | **INVALID** | **422** |
| `limit=101` | **INVALID** | **422** |
| `offset=-1` | **INVALID** | **422** |

Applies independently to both:

```text
GET /properties/admin/all
GET /realtor/properties
```

Authentication and authorization remain unchanged:

| Request | Existing contract (unchanged) |
|---------|-------------------------------|
| Unauthenticated admin or realtor list | existing 401 |
| Non-admin on admin list | existing 403 |
| Non-realtor on realtor list | existing 403 |

### Error contract vs implementation mechanism

**API CONTRACT (fixed):** HTTP **422**.

**IMPLEMENTATION MECHANISM:**

The existing public-list and neighboring-collection pattern is FastAPI `Query(ge=…, le=…)`, which already produces request-validation **422**.

Rento domain exceptions (`BadRequestException`) currently map to HTTP **400**, not 422.

Therefore TASK-008:

- **Must** return HTTP **422** for out-of-domain `limit`/`offset`.
- **Must** keep default `limit=100` on both in-scope routes (do not change it to the public-list default of 10).
- **Must not** use `BadRequestException` for this bound (would yield 400).
- **Should** use the existing `Query(ge=1, le=100)` / `Query(ge=0)` pattern unless implementation review finds a smaller equivalent that still yields 422.
- **Must not** invent a new error payload. Tests assert status; do not over-assert unstable framework body fields unless existing suite convention requires it.

Likely files to inspect during implementation (not a mandate to change all of them):

- `backend/app/routers/properties.py`
- `backend/app/routers/realtor_profiles.py`
- a focused test module under `backend/tests/` (new file is acceptable if no existing admin/realtor list-validation suite exists)

### Repository semantics (unchanged for valid input)

```text
.limit(limit)
.offset(offset)
```

Do not redesign admin or owner-list queries. Invalid pagination must be rejected before it is treated as a normal database page size.

---

## In Scope

1. Pagination bounds on `GET /properties/admin/all` only (among admin property routes).
2. Pagination bounds on `GET /realtor/properties` only (among realtor property routes).
3. Locked domain: `limit` default 100, `ge=1`, `le=100`; `offset` default 0, `ge=0`.
4. Invalid values → HTTP **422**.
5. Regression tests proving invalid bounds reject and valid/default requests remain accepted.
6. Preserve existing authn/authz on both routes.
7. Preserve repository list filtering/ordering for valid pages.

**Expected test home (implementation phase only):**

- Prefer a dedicated focused module if no current suite covers these two list endpoints.
- Reuse existing admin/realtor login helpers from current tests where they already exist.

---

## Out of Scope

| Item | Status |
|------|--------|
| Frontend pagination UI / infinite scroll | OUT OF SCOPE |
| Changing default `limit` away from 100 | OUT OF SCOPE |
| Raising `le` above 100 | OUT OF SCOPE |
| Public `GET /properties/` pagination (already bounded) | OUT OF SCOPE |
| Favorites list pagination | OUT OF SCOPE |
| Viewing-request `property_id` bounds | OUT OF SCOPE |
| Favorite pending/archived POST policy | OUT OF SCOPE |
| Admin users / public realtor / viewing-request pagination (already bounded) | OUT OF SCOPE |
| Repository query redesign | OUT OF SCOPE |
| Database schema / Alembic migration | OUT OF SCOPE |
| Authentication / authorization changes | OUT OF SCOPE |
| Custom error-body redesign | OUT OF SCOPE |
| Deployment during definition / implementation gate | OUT OF SCOPE |

Unrelated findings remain separate follow-up tasks.

---

## Affected Layers

| Layer | Role in this task |
|-------|-------------------|
| FastAPI admin/realtor list routes | Current unbounded `int` params; validation-boundary change |
| Service | Must not change valid-range forwarding |
| Repository | Unchanged valid-page `.limit` / `.offset` |
| Tests | Primary RED/GREEN + valid-bound regression |
| Frontend | Not touched; current no-query callers remain compatible |
| Database | Not touched |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Public list already `ge=1, le=100` | VERIFIED | `backend/app/routers/properties.py:57-58` |
| Admin list has no Query bounds | VERIFIED | `backend/app/routers/properties.py:43-45` |
| Realtor list has no Query bounds | VERIFIED | `backend/app/routers/realtor_profiles.py:65-67` |
| Repository applies supplied limit/offset | VERIFIED | `property_repository.get_all_properties_admin`, `get_properties_by_owner_id` |
| Neighboring collections already `le=100` | VERIFIED | viewing-requests, public realtors, admin users |
| Frontend sends no limit query | VERIFIED | `frontend/services/api.ts` `getAdminProperties`, `getMyRealtorProperties` |
| No existing pagination-validation tests for these two routes | VERIFIED | `backend/tests/` search |
| TASK-004/006/007 deferred this case | VERIFIED | archive Follow-up |
| `BadRequestException` maps to HTTP 400 | VERIFIED | `backend/app/core/handlers.py` |
| FastAPI `Query(ge/le)` maps to HTTP 422 | VERIFIED | public filter tests / TASK-002/007 |
| Negative LIMIT causes PostgreSQL 500 | INFERRED | dialect/`LIMIT` semantics; not production-probed |

---

## Architecture Contract

Current **valid** path (unchanged after fix):

```text
Client
  → GET /api/properties/admin/all          (admin session, no query)
  → FastAPI binds limit=100, offset=0
  → property_service.get_all_properties_admin()
  → property_repository: LIMIT 100 OFFSET 0
  → HTTP 200 + page
```

Desired **invalid** path:

```text
Client
  → GET /api/properties/admin/all?limit=-1
  → FastAPI Query validation
  → HTTP 422
  → service/repository page query is not treated as a normal unbounded/invalid LIMIT
```

Same invalid path for `GET /realtor/properties` with a realtor session.

**Why not change repository `.limit` clamping:** valid-page SQL is already correct. The defect is accepting out-of-domain page size as a successful query parameter.

---

## Database Contract

| Item | Expected |
|------|----------|
| Schema change | NO |
| Alembic migration | NO |
| Data mutation | NO |

---

## Auth / Security Contract

| Area | Contract |
|------|----------|
| Authentication | UNCHANGED — admin list still requires admin; realtor list still requires realtor |
| Authorization | UNCHANGED |
| CSRF | UNCHANGED — GET |
| Information disclosure | 422 does not leak listing rows |

---

## Deployment Contract

| Component | Expected |
|-----------|----------|
| Runtime scope | BACKEND_ONLY |
| Frontend | NO |
| Database | NO |
| nginx | NO |
| Migration | NO |

Production deployment is **NOT** authorized by task definition.

---

## Proposed Change

Add FastAPI `Query` bounds on the two in-scope list routes so that `limit` is `1..100` (default 100) and `offset` is `>= 0` (default 0), returning HTTP **422** for out-of-domain values.

Do not change repository valid-page queries. Do not change frontend. Do not raise `le` above 100.

Exact router edits are applied only after RED in a separate IMPLEMENTATION authorization.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | No schema/data change |
| Migration | NONE | |
| Authentication | NONE | |
| Authorization | NONE | |
| API compatibility | LOW but **NON-ZERO** | Clients that previously sent `limit<=0`, `limit>100`, or `offset<0` will receive **422** instead of a page or a possible DB error |
| Frontend compatibility | NONE for current callers | No-query requests keep default 100 |
| Production | LOW | Backend-only |
| Rollback | LOW | Revert validation; prior backend image |
| Accidental default-limit change | LOW | Default must remain 100, not 10 |

---

## Acceptance Contract

| Case | Request | Expected |
|------|---------|----------|
| **A** | admin list, no query | VALID — HTTP **200** (not 422 for pagination) |
| **B** | admin `limit=100` | VALID — HTTP **200** |
| **C** | admin `limit=1` | VALID — HTTP **200** |
| **D** | admin `limit=0` | INVALID — HTTP **422** |
| **E** | admin `limit=-1` | INVALID — HTTP **422** |
| **F** | admin `limit=101` | INVALID — HTTP **422** |
| **G** | admin `offset=-1` | INVALID — HTTP **422** |
| **H** | realtor list, no query | VALID — HTTP **200** |
| **I** | realtor `limit=100` | VALID — HTTP **200** |
| **J** | realtor `limit=0` / `-1` / `101` | INVALID — HTTP **422** |
| **K** | realtor `offset=-1` | INVALID — HTTP **422** |
| **L** | unauthenticated either list | existing **401** unchanged |
| **M** | non-admin on admin list | existing **403** unchanged |

Do not require non-empty `items`. Primary concern: request accepted vs rejected.

---

## Test Contract

### Primary RED / GREEN

Preferred names:

- `test_admin_property_list_rejects_out_of_domain_limit`
- `test_realtor_property_list_rejects_out_of_domain_limit`

**Primary RED request (admin):**

```text
GET /properties/admin/all?limit=-1
```

Authenticated as admin.

**Baseline (current code — expected RED):**

- expected HTTP **422**
- actual not 422 (200, or another non-422 if the database rejects `LIMIT -1`)

RED is valid only if it proves missing pagination-domain validation. Do not fail the RED test because of unrelated fixture/auth setup. If the failure is 401/403/500-from-fixture, fix only test setup.

**Post-fix (GREEN):** HTTP **422**.

Do not over-assert FastAPI validation body fields unless implementation review adopts a documented payload.

Cover at least one realtor invalid `limit` the same way.

### Regression

- default / `limit=100` / `limit=1` accepted on both routes
- existing realtor listing lifecycle (archive/restore) unchanged
- public `GET /properties/` pagination and TASK-007 price-range contract unchanged where existing tests already cover them

Implementation and RED test creation are **not** authorized by this definition.

---

## Verification Plan

1. **RED** — focused invalid-limit tests fail: expected 422, actual not 422.
2. **Implementation** — smallest Query-bound change on the two routes.
3. **GREEN** — primary tests PASS.
4. **Regression** — valid defaults, authz, public list, realtor lifecycle.
5. **Diff review** — no frontend/migration/auth drift.
6. **Production smoke (later)** — authenticated invalid `limit` → 422; default list → 200.

**Proof question:** Did only admin/realtor list pagination validation change?

---

## Rollback Impact

**Application rollback:** revert TASK-008 runtime change and redeploy previous backend image.

**Database rollback:** NOT REQUIRED.

**Behavior after rollback:** out-of-domain `limit`/`offset` on the two routes return to unvalidated binding.

---

## AI-generated code control

Before accepting implementation, the developer must answer:

1. Where are pagination bounds declared?
2. Why is the router the correct layer?
3. Why is repository `.limit` itself not broken for valid pages?
4. Why is 422 returned (not 400)?
5. Why does default `limit` remain 100 (not 10)?
6. Why is `le=100` locked?
7. Does invalid input reach repository/database?
8. What existing list/lifecycle behavior could regress?
9. Which files changed and why?
10. How is it rolled back?

---

## Definition of Done

TASK-008 is not complete because a `Query` constraint exists.

Done requires:

1. Contract documented in this file (`le=100` locked).
2. RED reproduced (expected 422, actual not 422).
3. Implementation bounded to in-scope files.
4. Primary tests PASS.
5. Regression PASS.
6. Diff reviewed.
7. Commit / push under separate authorization.
8. Backend-only deploy under separate authorization.
9. Production Acceptance: invalid limit 422; default list 200; authz unchanged.
10. Rollback posture confirmed.
11. Closure and archive as separate gates.

---

## Implementation Result

**Date:** 2026-08-16

**RED — admin:**

| Field | Value |
|-------|-------|
| Test | `test_admin_property_list_rejects_out_of_domain_limit` |
| Request | `GET /properties/admin/all?limit=0` (admin session) |
| Expected | HTTP **422** |
| Actual (baseline) | HTTP **200** |
| Failure | `assert 200 == 422` |
| RED result | PASS — missing Query bounds reproduced |

**RED — realtor:**

| Field | Value |
|-------|-------|
| Test | `test_realtor_property_list_rejects_out_of_domain_limit` |
| Request | `GET /realtor/properties?limit=0` (realtor session) |
| Expected | HTTP **422** |
| Actual (baseline) | HTTP **200** |
| Failure | `assert 200 == 422` |
| RED result | PASS — missing Query bounds reproduced |

**MINIMAL FIX:**

| Route | Declaration |
|-------|-------------|
| `get_properties_admin()` | `limit = Query(default=100, ge=1, le=100)`, `offset = Query(default=0, ge=0)` |
| `get_my_realtor_properties()` | `limit = Query(default=100, ge=1, le=100)`, `offset = Query(default=0, ge=0)` |

`Query` was already imported in `properties.py`. `realtor_profiles.py` gained `Query` import only.

**GREEN:** both primary invalid-limit tests PASS (HTTP **422**).

**Unchanged by design:** service, repository, frontend, auth dependencies, models, schemas, Alembic.

**Invalid request boundary:** INFERRED — FastAPI `Query` validation runs before the route body; `property_service` / repository `.limit()` are not called for out-of-domain values. `Depends(get_db)` and auth deps may still resolve. Not instrumented with mocks.

---

## Final Verification

**Commands executed (backend cwd):**

```bash
python -m pytest tests/test_admin_realtor_property_list_pagination.py::test_admin_property_list_rejects_out_of_domain_limit tests/test_admin_realtor_property_list_pagination.py::test_realtor_property_list_rejects_out_of_domain_limit -v
python -m pytest tests/test_admin_realtor_property_list_pagination.py tests/test_property_list_filter_validation.py -v
python -m compileall app/routers/properties.py app/routers/realtor_profiles.py tests/test_admin_realtor_property_list_pagination.py -q
```

**Boundary / default:**

| Contract | Result |
|----------|--------|
| admin/realtor `limit=1` | PASS (HTTP **200**) |
| admin/realtor `limit=100` | PASS (HTTP **200**) |
| admin/realtor `limit=101` | PASS (HTTP **422**) |
| admin/realtor `offset=0` | PASS (HTTP **200**) |
| admin/realtor `offset=-1` | PASS (HTTP **422**) |
| admin/realtor default (no query) | PASS (HTTP **200**, `limit=100`, `offset=0`) |

**Auth / authz (new focused tests):**

| Check | Result |
|-------|--------|
| admin unauthenticated | PASS (HTTP **401**) |
| admin non-admin (`role=user`) | PASS (HTTP **403**) |
| realtor unauthenticated | PASS (HTTP **401**) |
| realtor non-realtor (`role=user`) | PASS (HTTP **403**) |

**Public route:** `test_property_list_filter_validation.py` 14 PASS — public filter/pagination contract not modified.

**Suite totals:**

| Module | Passed | Failed |
|--------|--------|--------|
| `test_admin_realtor_property_list_pagination.py` | 18 | 0 |
| `test_property_list_filter_validation.py` | 14 | 0 |
| **Combined** | **32** | **0** |

**Quality:** `python -m compileall` on changed files: PASS. No established ruff/mypy gate beyond pytest.

**Diff hygiene:** routers + new test module + this task document. `git diff --check`: clean. Committed and pushed at `f8b7d602`.

---

## Commit

| Field | Value |
|-------|-------|
| SHA | `f8b7d60220c76f662eaf39c2d330dfa3064611fa` |
| Message | `fix(pagination): bound admin and realtor property lists` |

---

## Production Result

**Date:** 2026-08-16
**PRODUCTION_ACCEPTANCE:** **PASS**

### Deployment

| Field | Value |
|-------|-------|
| DEPLOYED_SHA | `f8b7d60220c76f662eaf39c2d330dfa3064611fa` |
| Deployment scope | BACKEND_ONLY |
| Backend rebuilt | YES |
| Backend recreated | YES |
| Frontend recreated | NO |
| Database restarted | NO |
| Nginx recreated | NO |
| Migration | NONE |
| Post-deploy backend image | `sha256:3cd9a3f9526dcf91bc91e30ddd6f3c9fdc6453cbad4a521fea98a13c6a4d58ef` |

### Final accepted API contract

For authenticated authorized **admin** (`GET /properties/admin/all`) and **realtor** (`GET /realtor/properties`) property-list endpoints:

```text
limit:  default 100, ge=1, le=100
offset: default 0,   ge=0
```

Invalid authorized query:

| Condition | HTTP |
|-----------|------|
| `limit < 1` | **422** |
| `limit > 100` | **422** |
| `offset < 0` | **422** |

Invalid responses use standard FastAPI validation envelope `{"detail":[...]}` with `loc` referencing `query/limit` or `query/offset`.

Preserved unchanged:

- **401** unauthenticated
- **403** wrong role
- default `limit=100`, `offset=0`
- valid `limit` in `1..100`
- service/repository behavior for valid pages
- public `GET /properties/` pagination contract

### Admin production acceptance

Identity: `acceptance-admin@rentonow.ro` (id=28, role=`admin`, account_status=`active`). Login: **PASS**. Logout: **PASS**. Post-logout protected request: **401**.

| Request | Result |
|---------|--------|
| `GET /api/properties/admin/all?limit=0` | HTTP **422** |
| `GET /api/properties/admin/all?limit=1` | HTTP **200** |
| `GET /api/properties/admin/all?limit=100` | HTTP **200** |
| `GET /api/properties/admin/all?limit=101` | HTTP **422** |
| `GET /api/properties/admin/all?offset=-1` | HTTP **422** |
| `GET /api/properties/admin/all` (default) | HTTP **200** — metadata `limit=100`, `offset=0` |

Validation envelope on invalid admin requests: `detail` present; loc includes `query/limit` or `query/offset`.

### Realtor production acceptance

Identity: `acceptance-realtor@rentonow.ro` (id=29, role=`realtor`, account_status=`active`). Login: **PASS**. Logout: **PASS**. Post-logout protected request: **401**.

| Request | Result |
|---------|--------|
| `GET /api/realtor/properties?limit=0` | HTTP **422** |
| `GET /api/realtor/properties?limit=1` | HTTP **200** |
| `GET /api/realtor/properties?limit=100` | HTTP **200** |
| `GET /api/realtor/properties?limit=101` | HTTP **422** |
| `GET /api/realtor/properties?offset=-1` | HTTP **422** |
| `GET /api/realtor/properties` (default) | HTTP **200** — metadata `limit=100`, `offset=0`, empty list valid |

Validation envelope on invalid realtor requests: `detail` present; loc includes `query/limit` or `query/offset`.

### Authorization regression

| Check | Result |
|-------|--------|
| Unauthenticated `GET /api/properties/admin/all` | HTTP **401** |
| Unauthenticated `GET /api/realtor/properties` | HTTP **401** |
| OPS-001 (`acceptance@rentonow.ro`, id=27, role=`user`) admin list | HTTP **403** |
| OPS-001 realtor list | HTTP **403** |
| OPS-001 role/status after acceptance | unchanged — id=27, role=`user`, active |

No role mutation occurred during TASK-008 Production Acceptance.

### Data non-mutation

| Check | Result |
|-------|--------|
| Admin identity (id=28) role/status | unchanged — `admin`, active |
| Realtor identity (id=29) role/status | unchanged — `realtor`, active |
| OPS-001 (id=27) | unchanged |
| Realtor id=29 `realtor_profiles` | **0** |
| Realtor id=29 `realtor_applications` | **0** |
| Realtor id=29 `properties` | **0** |
| Business rows created during acceptance | **NO** |
| Database schema changed | **NO** |

### Backend / runtime evidence

| Check | Result |
|-------|--------|
| frontend | healthy |
| backend | healthy |
| db | healthy |
| nginx | healthy |
| backend RestartCount | **0** |
| `https://rentonow.ro/` | **200** |
| `https://rentonow.ro/api/` | **200** |
| HTTP 500 during acceptance | **NO** |
| Traceback | **NO** |
| IntegrityError | **NO** |
| Unexpected exception | **NO** |

Expected acceptance statuses observed in backend logs: 200, 401, 403, 422.

### Rollback posture

| Field | Value |
|-------|-------|
| Tag | `rento-backend:rollback-ac683df` |
| Immutable image | `sha256:17bec3f8c81fafb72a5805b1238e0e25da6f5e28a98dac78f4b9fd244685b0c7` |
| Still valid after deploy/acceptance | **YES** |
| Meaning | Verified pre-TASK-008 backend image (TASK-007 runtime) |

Do not remove or retag this artifact during closure. Database rollback is **NOT REQUIRED**.

### Acceptance identity note

TASK-008 Production Acceptance required dedicated production acceptance identities (supporting OPS provisioning gate, not an application runtime change):

| Identity | Email | User id | Role | Status |
|----------|-------|---------|------|--------|
| Admin acceptance | `acceptance-admin@rentonow.ro` | 28 | `admin` | active |
| Realtor acceptance | `acceptance-realtor@rentonow.ro` | 29 | `realtor` | active |
| OPS-001 (unchanged) | `acceptance@rentonow.ro` | 27 | `user` | active |

Credentials stored operator-local outside Git (`~/.rento-ops/`). Passwords, cookies, CSRF tokens, and session tokens are not recorded in this document.

---

## Follow-up

Possible separate future tasks (not part of TASK-008):

- Favorite pending/archived POST policy (needs product decision)
- Viewing-request `property_id` query lower bound
- Frontend client-side min/max comparison
- Raising collection `le` above 100, if a real client need appears

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               ← completed
IMPLEMENTATION          ← completed
VERIFICATION            ← completed (local)
COMMIT                  ← completed (f8b7d60)
PUSH                    ← completed
DEPLOY                  ← completed (BACKEND_ONLY, PASS)
PRODUCTION ACCEPTANCE   ← completed (PASS)
CLOSED                  ← current stage
ARCHIVE                 ← NOT YET (separate authorization)
```

**Next gate:** ARCHIVE authorization (separate). Do not create TASK-009 in this document.
