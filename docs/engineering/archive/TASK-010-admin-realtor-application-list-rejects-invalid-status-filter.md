# TASK-010 — Admin Realtor Application List Rejects Invalid Status Filter

| Field | Value |
|-------|-------|
| ID | TASK-010 |
| TITLE | Admin Realtor Application List Rejects Invalid Status Filter |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / query validation |

> STATUS: CLOSED means implementation, local verification, commit, push, backend-only deployment, and production acceptance are complete. Archive remains a separate gate.

**Discovery reference:** Post TASK-009 discovery (2026-08-17) — recommendation: reject invalid `status` query domain on admin `GET /realtor-applications`; deployment class expected: `BACKEND_ONLY`.

**Repository baseline at definition (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `3f055069da2720c598daa3fed5ca057c55730428` |
| origin/main | `3f055069da2720c598daa3fed5ca057c55730428` |
| divergence | `0 0` |
| Active tasks before creation | none (`docs/engineering/tasks/README.md` only) |

**Runtime note:** TASK-009 application runtime was deployed and production-accepted at `6f8db8d6155408eff0fff034b288c9665613f4eb`. Repository HEAD and deployed application release identity must not be assumed identical.

---

## Problem

**Resource:** Admin realtor-application collection filter `status` on `GET /realtor-applications`.

**Current:** The route declares `status: str | None = Query(default=None)` with **no domain validation**. The service forwards `status` unchanged to the repository, which filters `RealtorApplication.status == status` when truthy. Invalid status strings are accepted and produce a **successful empty collection**.

**Target:** When `status` is provided, it must be one of the valid application lifecycle statuses (`pending`, `approved`, `rejected`). Invalid values must be **rejected** with HTTP **400** via `BadRequestException`, matching sibling admin enum-like list filters. Omitted `status`, valid status filters, and pagination behavior remain unchanged.

This is filter **domain validation**, not resource-existence validation. A valid status with no matching rows remains **200** with an empty collection.

---

## Contract Decision

**SELECTED_STATUS_CONTRACT:** **400** (service-layer `BadRequestException`)

**Rationale (VERIFIED from current code):**

| Pattern | Endpoint / filter | Invalid handling |
|---------|-------------------|------------------|
| Admin user list | `GET /admin/users?role=` | Service `_validate_role` → **400** |
| Admin user list | `GET /admin/users?application_status=` | Service `_validate_application_status` → **400** |
| Viewing request list | `GET /viewing-requests?status=` | Service `VALID_STATUSES` check → **400** |
| Public property filters | numeric query params | FastAPI `Query(ge=…)` → **422** |
| TASK-009 | `property_id` numeric domain | FastAPI `Query(ge=1)` → **422** |

TASK-010 is an **enum-like string filter** on an **admin list endpoint**, consistent with `admin_user_service` and `viewing_request_service` — not a numeric FastAPI `Query` bound case. The narrowest coherent fix is service validation → **400**.

Implementation is **not** authorized in this gate.

---

## Current Behavior

### Request path

```text
GET /realtor-applications
  → list_realtor_applications()              [realtor_applications.py]
  → require_admin
  → realtor_application_service.list_applications()
  → realtor_application_repository.list_applications()
  → in-router slice [offset:offset+limit]
  → HTTP 200 + list envelope
```

Production external prefix: `GET /api/realtor-applications`.

### Valid status domain (VERIFIED from code)

| Status | Evidence |
|--------|----------|
| `pending` | Model default `RealtorApplication.status`; create path sets `"pending"` |
| `approved` | `REVIEW_STATUS_APPROVED` in service; review PATCH `Literal["approved", "rejected"]` |
| `rejected` | `REVIEW_STATUS_REJECTED` in service; review PATCH |

`ALLOWED_REVIEW_STATUSES` (`approved`, `rejected`) governs **review transitions only**, not the list filter domain. List filter domain is all stored lifecycle statuses: **`pending`**, **`approved`**, **`rejected`**.

### Evidence table

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Router `status` | `str \| None = Query(default=None)` — no pattern/enum | VERIFIED — `realtor_applications.py:57` |
| Router pagination | `limit` default 100, `ge=1`, `le=100`; `offset` `ge=0` | VERIFIED — `realtor_applications.py:58-59` |
| Authorization | `require_admin` | VERIFIED — `realtor_applications.py:61` |
| Service `list_applications` | Forwards `status` unchanged | VERIFIED — `realtor_application_service.py:81-88` |
| Repository filter | `if status: filter(status == status)` | VERIFIED — `realtor_application_repository.py:73-74` |
| Service status validation on list | none | VERIFIED — no validator in `list_applications` |
| Invalid status list tests | none | VERIFIED — no matches before TASK-010 RED file |

### Observed defect semantics (VERIFIED FROM EXECUTION — RED 2026-08-17)

With a pending application present in DB:

```text
GET /realtor-applications?status=not-a-valid-status
  → HTTP 200 (expected 400)
  → {"items": [], "total": 0, "limit": 100, "offset": 0}

GET /realtor-applications?status=bogus
  → HTTP 200 (expected 400)
```

Client cannot distinguish invalid filter input from a valid filter that matches zero rows.

---

## Contract Decision (locked for TASK-010)

Applies to:

```text
GET /realtor-applications
```

| Condition | Validity | HTTP |
|-----------|----------|------|
| `status` omitted | VALID | existing list behavior (all statuses) |
| `status=pending` | VALID | not 400 due to `status` |
| `status=approved` | VALID | not 400 due to `status` |
| `status=rejected` | VALID | not 400 due to `status` |
| `status=<invalid>` (e.g. `not-a-valid-status`, `bogus`) | **INVALID** | **400** |
| valid status, zero matches | VALID | **200** empty collection |

Invalid responses SHALL use existing `BadRequestException` envelope (`success: false`, `message`).

Pagination invalid params (`limit=0`, etc.) remain FastAPI **422** — unchanged.

---

## Architecture Contract

### Valid path (unchanged after fix)

```text
Authenticated admin
  → GET /realtor-applications?status=pending
  → require_admin
  → service validates status ∈ {pending, approved, rejected}
  → repository filter
  → HTTP 200 + list envelope
```

### Invalid path (desired)

```text
Authenticated admin
  → GET /realtor-applications?status=not-a-valid-status
  → require_admin
  → service status validation
  → HTTP 400
  → repository list filter MUST NOT run with invalid status
```

**Boundary claim (INFERRED FROM CONTROL FLOW):** invalid `status` must not reach `realtor_application_repository.list_applications()` with out-of-domain value. `Depends(get_db)` and auth deps may still resolve. Not instrumented with mocks.

---

## Acceptance Contract

| Case | Request | Expected |
|------|---------|----------|
| **A** | admin, no `status` | VALID — HTTP **200** (all applications) |
| **B** | admin, `status=pending` | VALID — HTTP **200** (filtered) |
| **C** | admin, `status=approved` | VALID — HTTP **200** (filtered) |
| **D** | admin, `status=rejected` | VALID — HTTP **200** (filtered) |
| **E** | admin, `status=not-a-valid-status` | INVALID — HTTP **400** |
| **F** | admin, `status=bogus` | INVALID — HTTP **400** |
| **G** | admin, valid status, zero matches | VALID — HTTP **200**, `total=0` |
| **H** | admin, invalid `limit` / `offset` | existing pagination **422** unchanged |
| **I** | unauthenticated | existing **401** unchanged |
| **J** | authenticated non-admin | existing **403** unchanged |

---

## Test Contract

### Primary RED / GREEN

```text
test_list_realtor_applications_rejects_invalid_status_filter
```

**Primary RED request:**

```text
GET /realtor-applications?status=not-a-valid-status
```

Authenticated as `role=admin`.

| Field | Value |
|-------|-------|
| Expected (post-fix) | HTTP **400** |
| Actual (pre-fix) | HTTP **200** with `total=0`, `items=[]` |
| RED result | **PASS** — missing status domain validation reproduced |
| Failure | `assert 200 == 400` |

Parametrized secondary: `status=bogus` — same failure.

### Regression (implementation gate)

- valid status filters remain **200**
- omitted `status` remains **200**
- pagination invalid cases remain **422**
- unauthenticated **401**, non-admin **403**
- create/review flows unchanged

---

## In Scope

1. Status domain validation on admin `GET /realtor-applications` list only.
2. Invalid `status` → HTTP **400**.
3. Focused backend regression tests.
4. This task document lifecycle updates under separate gates.
5. Later backend-only deploy and production acceptance (separate authorization).

---

## Out of Scope

| Item | Status |
|------|--------|
| Application create / review workflow redesign | OUT OF SCOPE |
| Approve/reject PATCH behavior | OUT OF SCOPE |
| Repository DB-level pagination redesign | OUT OF SCOPE |
| Viewing-request status 422 normalization | OUT OF SCOPE |
| Favorites | OUT OF SCOPE |
| Frontend changes | OUT OF SCOPE |
| Database schema / Alembic migration | OUT OF SCOPE |
| Authentication / authorization redesign | OUT OF SCOPE |
| Docker / Compose / Nginx changes | OUT OF SCOPE |
| Broad API error normalization | OUT OF SCOPE |
| Deployment during definition gate | OUT OF SCOPE |

---

## Affected Layers

| Layer | Role in this task |
|-------|-------------------|
| FastAPI admin list route | Unchanged declaration expected; validation in service |
| Service | Add list `status` domain validation |
| Repository | Unchanged valid-filter query |
| Tests | Primary RED/GREEN + regression |
| Frontend | Not touched |
| Database | Not touched |

---

## Expected Implementation Surface

Likely files during a future implementation gate (expectation only):

| File | Expected change |
|------|-----------------|
| `backend/app/services/realtor_application_service.py` | Validate `status` in `list_applications` |
| `backend/tests/test_realtor_applications_list_validation.py` | RED → GREEN + regression |

Expected **not** changed:

- `realtor_applications.py` router (unless implementation review prefers router-level validation)
- `realtor_application_repository.py`
- models / schemas (except tests)
- frontend
- Alembic

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
| Authentication | UNCHANGED — list still requires admin |
| Authorization | UNCHANGED — `require_admin` |
| CSRF | UNCHANGED — GET |
| Information disclosure | 400 does not leak application rows |

---

## Deployment Contract

| Component | Expected |
|-----------|----------|
| Runtime scope | BACKEND_ONLY |
| Frontend | NO |
| Database | NO |
| nginx | NO |
| Migration | NO |

---

## Production Acceptance Concept

Not performed in this gate. Future acceptance should use dedicated admin identity (metadata only):

| Field | Value |
|-------|-------|
| Email | `acceptance-admin@rentonow.ro` |
| User id | 28 |
| Role | `admin` |

Credentials remain outside Git in operator-local store. Do not access credentials during definition.

### Future acceptance matrix (concept)

| Request | Expected |
|---------|----------|
| authenticated `GET /api/realtor-applications?status=not-a-valid-status` | **400** |
| authenticated `GET /api/realtor-applications?status=pending` | **200** |
| authenticated `GET /api/realtor-applications` (no filter) | **200** |
| pagination bounds regression | unchanged **422** / **200** |
| unauthenticated | **401** |
| non-admin authenticated | **403** |
| logout + post-logout protected request | **401** |

No business-data mutation required.

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert TASK-010 runtime change and redeploy previous verified backend image captured during pre-deploy preflight.

After rollback: invalid `status` returns to current silent **200** empty collection behavior.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | No schema/data change |
| Migration | NONE | |
| Authentication | NONE | |
| Authorization | NONE | |
| API compatibility | LOW but **NON-ZERO** | Clients sending invalid `status` receive **400** instead of **200** empty |
| Production | LOW | Backend-only |
| Rollback | LOW | Remove validation guard |

---

## Definition of Done

TASK-010 is not complete because a task document and RED exist.

Done requires:

1. Contract documented (invalid `status` → **400**).
2. RED reproduced (expected **400**, actual **200**).
3. Implementation bounded to in-scope files.
4. Primary tests PASS.
5. Regression PASS.
6. Diff reviewed.
7. Commit / push under separate authorization.
8. Backend-only deploy under separate authorization.
9. Production Acceptance: invalid `status` **400**; valid list **200**; auth unchanged.
10. Rollback posture confirmed.
11. Closure and archive as separate gates.

---

## Implementation Result

**Date:** 2026-08-17

**RED — invalid status filter:**

| Field | Value |
|-------|-------|
| Test | `test_list_realtor_applications_rejects_invalid_status_filter` |
| Request | `GET /realtor-applications?status=not-a-valid-status` and `status=bogus` (authenticated admin) |
| Expected | HTTP **400** |
| Actual (baseline) | HTTP **200** with `total=0`, `items=[]` |
| Failure | `assert 200 == 400` |
| RED result | PASS — missing status domain validation reproduced |

**MINIMAL FIX:**

| Location | Change |
|----------|--------|
| `realtor_application_service.py` | Added `VALID_LIST_STATUSES` from existing status constants; `_validate_list_status()`; `list_applications()` validates before repository call |

**GREEN:** primary invalid status tests PASS (HTTP **400**); `success: false` + `message` envelope.

**Unchanged by design:** router, repository, models, schemas, frontend, auth dependencies, review/create flows, Alembic.

**Invalid request boundary:** INFERRED — service validation runs before `realtor_application_repository.list_applications()` with invalid status. Not instrumented with mocks.

---

## Final Verification

**Commands executed (backend cwd):**

```bash
python -m pytest tests/test_realtor_applications_list_validation.py -v
python -m pytest tests/test_iwp_003_domain_authorization.py -k "realtor_application" -v
python -m pytest tests/test_iwp_004_api_contracts.py -k "realtor_applications" -v
python -m compileall app/services/realtor_application_service.py tests/test_realtor_applications_list_validation.py -q
```

**Primary contract (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| admin `status=not-a-valid-status` | PASS — HTTP **400** |
| admin `status=bogus` | PASS — HTTP **400** |
| error envelope | PASS — `success: false`, `message` present |

**Valid status (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| `status=pending` | PASS — HTTP **200**, filtered match |
| `status=approved` | PASS — HTTP **200**, filtered match |
| `status=rejected` | PASS — HTTP **200**, filtered match |
| `status=approved` with only pending rows | PASS — HTTP **200**, `total=0` (not 400) |
| `status` omitted | PASS — HTTP **200**, all rows |

**Pagination regression (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| default | **200** |
| `limit=1` | **200** |
| `limit=100` | **200** |
| `limit=0` | **422** |
| `limit=101` | **422** |
| `offset=0` | **200** |
| `offset=-1` | **422** |

**Auth regression (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| unauthenticated | **401** |
| non-admin | **403** |

**Realtor application workflow regression:**

| Module | Passed | Failed |
|--------|--------|--------|
| `test_iwp_003_domain_authorization.py` (realtor_application) | 6 | 0 |
| `test_iwp_004_api_contracts.py` (realtor_applications list contract) | 1 | 0 |

**Suite totals (TASK-010 module):**

| Module | Passed | Failed |
|--------|--------|--------|
| `test_realtor_applications_list_validation.py` | 16 | 0 |

**Quality:** `python -m compileall` on changed files: PASS.

**Diff hygiene:** service + test module + this task document. `git diff --check`: clean. Implementation committed and pushed at `6589ead`.

---

## Commit

| Field | Value |
|-------|-------|
| SHA | `6589ead20613d0001e4f05eb256813b036cc39e1` |
| Message | `fix(realtor-applications): validate status filter` |

---

## Production Result

**Date:** 2026-08-17
**PRODUCTION_ACCEPTANCE:** **PASS**

### Deployment

| Field | Value |
|-------|-------|
| DEPLOYED_SHA | `6589ead20613d0001e4f05eb256813b036cc39e1` |
| Deployment scope | BACKEND_ONLY |
| Pre-deploy backend image | `sha256:f4720d1397ec3be55ee4966956b170322932903778db8d00d1cc6ab0acc276f0` |
| Post-deploy backend image | `sha256:7d7a544a20efc361d72c474a0f629bed6a9827f4f8c2f770396de05c2cf12398` |
| Backend rebuilt | YES |
| Backend recreated | YES |
| Backend after deploy | healthy |
| Backend RestartCount | **0** |
| Frontend recreated | NO |
| Database restarted | NO |
| Nginx recreated | NO |
| Migration | NONE |
| `https://rentonow.ro/` | **200** |
| `https://rentonow.ro/api/` | **200** |

### Final accepted API contract

For authenticated admin `GET /realtor-applications`:

```text
status: optional; when provided must be pending | approved | rejected
limit:  default 100, ge=1, le=100
offset: default 0,   ge=0
```

**BEFORE TASK-010 (authenticated admin):**

| Request | HTTP |
|---------|------|
| `GET /realtor-applications?status=not-a-valid-status` | **200** empty collection |
| `GET /realtor-applications?status=bogus` | **200** empty collection |

**AFTER TASK-010 (authenticated admin):**

| Condition | HTTP |
|-----------|------|
| invalid `status` (e.g. `not-a-valid-status`, `bogus`) | **400** |

**Preserved unchanged:**

| Condition | HTTP / semantics |
|-----------|------------------|
| `status` omitted | **200** — all applications |
| `status=pending` | **200** — filtered |
| `status=approved` | **200** — filtered |
| `status=rejected` | **200** — filtered |
| valid status, zero matches | **200** empty collection — not 400 |
| pagination `limit` / `offset` bounds | unchanged |
| unauthenticated request | **401** |
| authenticated non-admin | **403** |
| create / review workflows | unchanged |

Invalid responses use existing `BadRequestException` envelope (`success: false`, `message`).

### Production acceptance (dedicated admin identity)

Identity: `acceptance-admin@rentonow.ro` (id=28, role=`admin`, account_status=`active`). Credentials stored operator-local outside Git (`~/.rento-ops/`). Passwords, cookies, CSRF tokens, and session tokens are not recorded in this document.

Login: **PASS**. Current-user: id=**28**, role=**admin**, active. Logout: **PASS**.

| Request | Result |
|---------|--------|
| `GET /api/realtor-applications/?status=not-a-valid-status` | HTTP **400** — `success=false`, `message` present |
| `GET /api/realtor-applications/?status=bogus` | HTTP **400** — `success=false`, `message` present |
| `GET /api/realtor-applications/` (no filter) | HTTP **200** — `total=1`, `limit=100`, `offset=0` |
| `GET /api/realtor-applications/?status=pending` | HTTP **200** — `total=0` |
| `GET /api/realtor-applications/?status=approved` | HTTP **200** — `total=1` |
| `GET /api/realtor-applications/?status=rejected` | HTTP **200** — `total=0` |
| `GET /api/realtor-applications/?limit=1` | HTTP **200** |
| `GET /api/realtor-applications/?limit=100` | HTTP **200** |
| `GET /api/realtor-applications/?limit=0` | HTTP **422** |
| `GET /api/realtor-applications/?limit=101` | HTTP **422** |
| `GET /api/realtor-applications/?offset=0` | HTTP **200** |
| `GET /api/realtor-applications/?offset=-1` | HTTP **422** |

**Valid empty semantics:** PRESERVED — `status=pending` returned **200** with `total=0` and empty items while invalid status returned **400**.

Exact invalid-status message text was **not** asserted in production acceptance.

**Auth regression:** post-logout `GET /api/realtor-applications/` → **401**; post-logout `GET /api/realtor-applications/?status=bogus` → **401**. Observed behavior: unauthenticated auth failure wins before status validation.

No approve/reject/create endpoints were called. Acceptance was GET-only except normal auth/session lifecycle.

### Data non-mutation

| Check | Result |
|-------|--------|
| Admin identity (id=28) role/status | unchanged — `admin`, active |
| Applications created | **NO** |
| Application status changed | **NO** |
| User role changed | **NO** |
| Other business data changed | **NO** |
| Database schema changed | **NO** |

Safe aggregate evidence after acceptance: total applications **1** (approved **1**). **No business data mutation.**

Containers were not restarted during acceptance. Images were not rebuilt during acceptance. No deploy during acceptance.

### Backend / runtime evidence

| Check | Result |
|-------|--------|
| frontend | healthy |
| backend | healthy |
| db | healthy |
| nginx | healthy |
| backend RestartCount | **0** |
| `https://rentonow.ro/api/` | **200** |
| HTTP 500 during acceptance | **NO** |
| Traceback | **NO** |
| IntegrityError | **NO** |
| Unexpected exception | **NO** |

Expected acceptance statuses observed in backend logs: **200**, **400**, **401**, **422**.

### Rollback posture

| Field | Value |
|-------|-------|
| Tag | `rento-backend:rollback-6f8db8d` |
| Immutable image | `sha256:f4720d1397ec3be55ee4966956b170322932903778db8d00d1cc6ab0acc276f0` |
| Meaning | Verified pre-TASK-010 backend image (TASK-009 runtime at `6f8db8d`) |
| Still valid after deploy/acceptance | **YES** — PRESERVED |

Rollback requires backend image restoration + backend recreation only. Database rollback is **NOT REQUIRED**. Do not remove or retag this artifact during closure.

### Final risk

| Area | Assessment |
|------|------------|
| Database | NONE |
| Migration | NONE |
| Authentication | UNCHANGED |
| Authorization | UNCHANGED |
| API compatibility | LOW BUT NON-ZERO |
| Production | LOW |
| Rollback | LOW |

---

## Closure

**Date:** 2026-08-17
**Status:** COMPLETE

Lifecycle: definition COMPLETE; RED VERIFIED; implementation COMPLETE; local verification PASS; commit COMPLETE; push COMPLETE; deployment PASS; production acceptance PASS; closure COMPLETE; archive NOT YET.

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               ← completed
IMPLEMENTATION          ← completed
VERIFICATION            ← completed (local)
COMMIT                  ← completed (6589ead)
PUSH                    ← completed
DEPLOY                  ← completed (BACKEND_ONLY, PASS)
PRODUCTION ACCEPTANCE   ← completed (PASS)
CLOSED                  ← current stage
ARCHIVE                 ← NOT YET (separate authorization)
```

**Next gate:** ARCHIVE authorization (separate). Do not archive in this gate.
