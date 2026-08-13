# TASK-002 — Public property list filter query validation

| Field | Value |
|-------|-------|
| ID | TASK-002 |
| TITLE | Public property list filter query validation |
| STATUS | READY_TO_DEPLOY |
| RISK | MEDIUM |

> STATUS: DISCOVERY means application code must not be modified. Discovery for this task is complete; separate IMPLEMENTATION authorization is required before code changes.

---

## Problem

`GET /properties/` accepts out-of-domain numeric filter values such as:

```text
rooms=0
rooms=-1
min_price=0
min_price=-1
max_price=0
max_price=-1
```

because `rooms`, `min_price`, and `max_price` currently lack lower-bound `Query` validation in the public list route.

These requests can return HTTP 200 and execute semantically meaningless filters instead of being rejected at the API boundary.

---

## Current Behavior

Public property listing route: `GET /properties/` in `backend/app/routers/properties.py` → `get_properties()`.

| Parameter | Current router declaration | Bounds today |
|-----------|---------------------------|--------------|
| `limit` | `Query(default=10, ge=1, le=100)` | YES |
| `offset` | `Query(default=0, ge=0)` | YES |
| `city` | `str \| None = None` | N/A (string) |
| `min_price` | `int \| None = None` | **NO lower bound** |
| `max_price` | `int \| None = None` | **NO lower bound** |
| `rooms` | `int \| None = None` | **NO lower bound** |

When invalid values are supplied, FastAPI accepts the request and `property_service.get_all_properties()` → `property_repository.get_all_properties()` applies filters directly:

- `price >= min_price`
- `price <= max_price`
- `rooms >= rooms`

**Observed defect examples (VERIFIED in discovery):**

| Request | Current response | Semantic issue |
|---------|------------------|----------------|
| `GET /properties/?rooms=0` | 200 | `rooms >= 0` matches all listings with `rooms >= 1` |
| `GET /properties/?rooms=-1` | 200 | Meaningless lower bound |
| `GET /properties/?min_price=-1` | 200 | All listings match `price >= -1` |
| `GET /properties/?min_price=0` | 200 | Out of domain vs create/update schemas |
| `GET /properties/?max_price=0` | 200 | Out of domain vs create/update schemas |
| `GET /properties/?max_price=-1` | 200 | Meaningless upper bound |

**Consistency evidence elsewhere in the system:**

| Area | Constraint | Source |
|------|------------|--------|
| Property create/update | `rooms: Field(gt=0)`, `price: Field(gt=0)` | `backend/app/schemas/property.py` |
| Public filters UI | `min="1"` on rooms and min price inputs | `frontend/components/FiltersBar.tsx` |
| Existing rooms filter tests | Cover `rooms >= N` semantics only | `backend/tests/test_property_rooms_filter.py` |

Direct API/query-string access can bypass UI minimums.

---

## Target Behavior

Define the HTTP contract for `GET /properties/` filter parameters:

```text
rooms:
    optional integer
    when provided: >= 1

min_price:
    optional integer
    when provided: >= 1

max_price:
    optional integer
    when provided: >= 1
```

Invalid supplied values must be rejected by FastAPI request validation with **HTTP 422**.

Valid existing filter behavior must remain unchanged when parameters are omitted or valid.

**Examples that must remain valid:**

```text
rooms=1
rooms=2
rooms=3
min_price=1
max_price=1
normal positive price ranges
```

Parameter optionality is unchanged: all three remain optional; only supplied values are constrained.

Repository filtering semantics (`rooms >= N`, `price >= min_price`, `price <= max_price`) must not change.

---

## In Scope

1. Add lower-bound FastAPI `Query` validation for `rooms`, `min_price`, and `max_price` on `GET /properties/` only.
2. Add regression tests for invalid and boundary-valid query values (see Verification Plan).
3. Record implementation and verification evidence in this task file through lifecycle gates.

**Expected files (implementation phase only — not modified in definition phase):**

| File | Change |
|------|--------|
| `backend/app/routers/properties.py` | Add `Query(ge=1)` (or equivalent) to the three filter params in `get_properties()` |
| `backend/tests/test_property_list_filter_validation.py` | New dedicated regression tests (preferred) |

---

## Out of Scope

```text
frontend changes
property create/update behavior
repository filtering semantics
service-layer changes (unless unavoidable — not expected)
favorites
viewing requests
rental documents
authentication
authorization
admin endpoints
realtor endpoints
pagination validation on other routes
cross-field min_price <= max_price validation
min_price > max_price behavior specification or implementation
migrations
dependencies
Docker/Compose
nginx
deployment scripts
sort_by / order / city validation changes
unrelated query parameter refactors
```

If implementation appears to require any out-of-scope item: **STOP** and return to DISCOVERY.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend / Client | NONE — no expected change |
| Backend Router / API | YES — request validation on `GET /properties/` |
| Service | NONE — no expected change |
| Repository | NONE — no expected change |
| Database | NONE |
| Migration | NONE |
| Authentication | NONE |
| Authorization | NONE |
| Dependencies | NONE |
| Infrastructure / Production | NONE (deploy only if separately authorized) |

Reference map alignment: API / Transport boundary only.

---

## Request / use-case lifecycle

```text
Client GET /properties/?rooms=0 (or other invalid filter)
    ↓
FastAPI router parameter validation  ← TASK-002 change
    ↓
422 Unprocessable Entity (invalid values never reach service/repository)

Client GET /properties/?rooms=2&min_price=100 (valid)
    ↓
FastAPI validation passes
    ↓
property_service.get_all_properties()
    ↓
property_repository.get_all_properties()  (unchanged semantics)
    ↓
200 PropertyListResponse
```

| Impact | Result | Evidence |
|--------|--------|----------|
| DATA IMPACT | NONE | Validation only; no persistence change |
| AUTHENTICATION IMPACT | NONE | Public read endpoint |
| AUTHORIZATION IMPACT | NONE | Public read endpoint |
| API CONTRACT IMPACT | YES — invalid filter values now 422 instead of 200 |
| DATABASE IMPACT | NONE | No schema change |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| `min_price`, `max_price`, `rooms` lack `Query` lower bounds on `GET /properties/` | VERIFIED | `backend/app/routers/properties.py` → `get_properties()` |
| `limit`/`offset` already bounded on same route | VERIFIED | Same function |
| Invalid values return 200 today | VERIFIED | TASK-002 candidate discovery |
| Create/update schemas require `rooms > 0`, `price > 0` | VERIFIED | `backend/app/schemas/property.py` |
| Filters UI uses minimum 1 for rooms and min price | VERIFIED | `frontend/components/FiltersBar.tsx` |
| Repository applies filter values directly | VERIFIED | `backend/app/repositories/property_repository.py` → `get_all_properties()` |
| Existing tests cover `rooms >= N` only, not invalid bounds | VERIFIED | `backend/tests/test_property_rooms_filter.py` |
| Frontend sends filter params without server-side pre-validation | VERIFIED | `frontend/services/api.ts`, `(consumer)/page.tsx` |

---

## Proposed Change

**Smallest expected implementation:** add lower-bound validation on the three filter parameters in `get_properties()` only.

Conceptually (syntax must match project FastAPI/Python conventions at implementation time):

```python
min_price: int | None = Query(default=None, ge=1)
max_price: int | None = Query(default=None, ge=1)
rooms: int | None = Query(default=None, ge=1)
```

Keep existing declarations unchanged:

```python
limit: int = Query(default=10, ge=1, le=100)
offset: int = Query(default=0, ge=0)
```

Do **not** refactor unrelated query parameters (`city`, `sort_by`, `order`).

Do **not** add cross-field `min_price <= max_price` validation.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Breaking legitimate API clients sending `0` | Documented contract change; values were semantically invalid vs domain |
| Over-scoping into service/repository | Limit change to router `Query` constraints |
| Accidental cross-field validation | Explicitly out of scope; do not add `min_price > max_price` checks |
| Regression on valid `rooms >= N` semantics | Preserve and re-run `test_property_rooms_filter.py` |
| False PASS from HTTP 200 alone on valid cases | Valid-case tests assert non-422, not specific listing counts unless fixtures are deterministic |

**RISK: MEDIUM** — public API contract change; backend-only; no data/auth/migration impact.

---

## Verification Plan

### Regression-test contract (define before implementation)

**Required invalid cases — must return 422 after fix (should fail before fix):**

| Case | Expected |
|------|----------|
| `rooms=0` | 422 |
| `rooms=-1` | 422 |
| `min_price=0` | 422 |
| `min_price=-1` | 422 |
| `max_price=0` | 422 |
| `max_price=-1` | 422 |

**Required boundary-valid cases — must not be rejected by validation:**

| Case | Expected |
|------|----------|
| `rooms=1` | not 422 |
| `min_price=1` | not 422 |
| `max_price=1` | not 422 |

For valid cases: assert status is not 422. Do not require a specific result count unless fixtures make listing results deterministic. Purpose is to distinguish **validation accepted request** from **business query returned particular listings**.

**Preserve existing behavior:**

- Re-run `backend/tests/test_property_rooms_filter.py` — `rooms >= N` semantics unchanged.

### Implementation verification sequence (execute only after IMPLEMENTATION authorization)

1. New regression tests demonstrate current defect before fix (invalid cases return 200 today).
2. Apply minimal router validation.
3. Regression tests PASS.
4. Existing property filter tests PASS.
5. Relevant backend test suite PASS (`pytest` for affected modules / full backend suite per project practice).
6. Static/project checks required by current backend workflow PASS.
7. Diff contains only approved files.
8. No DB/migration/frontend/runtime config changes.
9. Later production acceptance: invalid query → 422; valid query still works.

### Production acceptance (later gate — not executed in definition phase)

```text
GET https://rentonow.ro/api/properties/?rooms=0        → 422
GET https://rentonow.ro/api/properties/?rooms=2        → 200 (or valid non-422)
GET https://rentonow.ro/api/properties/?min_price=-1   → 422
```

Exact public URL path follows nginx `/api/` prefix in repository config.

---

## Rollback Impact

**LOW** — revert router `Query` constraints and regression tests restores prior behavior (invalid values accepted again).

No migration, deploy config, or frontend rollback required.

Rollback artifact for production deploy (when authorized): standard frontend/backend image rollback per ops procedure; this task is backend-only.

---

## Definition of Done

TASK-002 may become **CLOSED** only when evidence demonstrates:

- invalid `rooms <= 0` rejected with **422**
- invalid `min_price <= 0` rejected with **422**
- invalid `max_price <= 0` rejected with **422**
- boundary value **1** accepted for each parameter
- existing `rooms >= N` minimum semantics preserved
- no unnecessary service/repository behavior change
- no frontend change
- no migration
- deployment successful (if production deploy authorized)
- production API behavior verified (if applicable)

Hard distinctions (from `DEFINITION_OF_DONE.md`):

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
HTTP 200 != BUSINESS CORRECTNESS
TEST PASS != PRODUCTION CORRECTNESS
```

---

## RED / Regression Evidence

**Verified at:** local repository — regression tests added; implementation not applied.

```text
RED STATE: CONFIRMED
```

### Test file

| Item | Value |
|------|-------|
| File | `backend/tests/test_property_list_filter_validation.py` |
| Structure | Shared fixtures aligned with `test_property_rooms_filter.py`; parametrized invalid (6) and boundary-valid (3) cases |
| Harness note | `Property` model import required so `reset_database` creates `properties` table before API requests |

### Commands

```bash
cd backend
pytest tests/test_property_list_filter_validation.py -q
pytest tests/test_property_rooms_filter.py -q
```

### Pre-fix regression results (`test_property_list_filter_validation.py`)

| Case | Expected | Actual | Result |
|------|----------|--------|--------|
| `rooms=0` | 422 | 200 | FAIL |
| `rooms=-1` | 422 | 200 | FAIL |
| `min_price=0` | 422 | 200 | FAIL |
| `min_price=-1` | 422 | 200 | FAIL |
| `max_price=0` | 422 | 200 | FAIL |
| `max_price=-1` | 422 | 200 | FAIL |
| `rooms=1` | not 422 | 200 | PASS |
| `min_price=1` | not 422 | 200 | PASS |
| `max_price=1` | not 422 | 200 | PASS |

**Summary:** `6 failed, 3 passed` — invalid-case failures are `assert 200 == 422` (missing lower-bound FastAPI validation).

### Existing rooms semantics (`test_property_rooms_filter.py`)

| Result |
|--------|
| PASS — `2 passed` |

Confirms `rooms >= N` business semantics intact before router validation fix.

### Root cause (VERIFIED)

Invalid filter requests reach `property_service` / `property_repository` because `get_properties()` declares `rooms`, `min_price`, and `max_price` without `Query(ge=1)`. FastAPI accepts out-of-domain values and returns HTTP 200.

---

## Implementation Result

Implemented independent lower-bound FastAPI `Query` validation on `GET /properties/` only.

| Item | Result |
|------|--------|
| File changed | `backend/app/routers/properties.py` |
| Function | `get_properties()` |
| `min_price` | `int \| None = Query(default=None, ge=1)` |
| `max_price` | `int \| None = Query(default=None, ge=1)` |
| `rooms` | `int \| None = Query(default=None, ge=1)` |
| Unchanged params | `limit`, `offset`, `city`, `sort_by`, `order` |
| Service | unchanged |
| Repository | unchanged |
| Frontend | unchanged |
| Database / migration | unchanged |
| Cross-field validation | not added |

---

## GREEN / Regression Evidence

**Verified at:** local repository — focused pytest after router fix.

```text
GREEN STATE: CONFIRMED
```

| Phase | Test file | Result |
|-------|-----------|--------|
| RED (pre-fix) | `test_property_list_filter_validation.py` | 6 failed, 3 passed |
| GREEN (post-fix) | `test_property_list_filter_validation.py` | **9 passed** |
| Semantics preserved | `test_property_rooms_filter.py` | **2 passed** |
| Related property tests | `test_property_coordinates.py` | **21 passed** |

**Command:**

```bash
cd backend
pytest tests/test_property_list_filter_validation.py tests/test_property_rooms_filter.py tests/test_property_coordinates.py -q
```

**Result:** `32 passed`

Invalid filter values now return **422** at FastAPI boundary before service/repository execution.

---

## Final Verification

**Verified at:** local repository HEAD `5901920ffb97f2d88372c2040b7f16a3a56a4d9e` (uncommitted TASK-002 changes)

### Diff review (application)

| Check | Result | Evidence |
|-------|--------|----------|
| Only router filter validation changed | PASS | `git diff -- backend/app/routers/properties.py` — 3 lines: `Query(default=None, ge=1)` on `min_price`, `max_price`, `rooms` |
| `limit`, `offset`, `city`, `sort_by`, `order` unchanged | PASS | Same diff |
| Service / repository / schemas / auth unchanged | PASS | No diff outside router + tests + task doc |

### Core contract gate

| Command | Result |
|---------|--------|
| `pytest tests/test_property_list_filter_validation.py tests/test_property_rooms_filter.py -q` | **11 passed** |

### Broader relevant regression

| Module | Result |
|--------|--------|
| `test_property_coordinates.py` | 21 passed |
| `test_property_image_cover_sync.py` | 5 passed |

**Command:**

```bash
cd backend
pytest tests/test_property_coordinates.py tests/test_property_image_cover_sync.py -q
```

**Result:** `26 passed`

**Combined task-relevant property tests:** `37 passed` (11 core + 26 broader)

### Static / project checks

| Tool | Result |
|------|--------|
| Backend dedicated lint/typecheck (ruff/mypy/etc.) | **NOT APPLICABLE** — repository provides `pytest` via `backend/pytest.ini` only |
| `git diff --check` | PASS — clean |

### OpenAPI contract (`GET /properties/`)

| Parameter | OpenAPI constraint | Result |
|-----------|-------------------|--------|
| `rooms` | `integer`, `minimum: 1`, nullable | **VERIFIED** — generated schema |
| `min_price` | `integer`, `minimum: 1`, nullable | **VERIFIED** |
| `max_price` | `integer`, `minimum: 1`, nullable | **VERIFIED** |

Inspection method: `app.openapi()` from `app.main`.

### Behavioral edge verification

| Case | Expected | Actual | Result |
|------|----------|--------|--------|
| params omitted | not 422 | 200 | PASS |
| `rooms=1` | not 422 | 200 | PASS |
| `min_price=1` | not 422 | 200 | PASS |
| `max_price=1` | not 422 | 200 | PASS |
| `rooms=0` | 422 | 422 | PASS |
| `min_price=0` | 422 | 422 | PASS |
| `max_price=0` | 422 | 422 | PASS |
| `rooms=2&min_price=1&max_price=5000` | not 422 | 200 | PASS |

Also covered by parametrized regression tests for invalid/boundary cases.

### Architectural stop point

Invalid filter values are rejected by FastAPI `Query(ge=1)` on the router **before** `property_service.get_all_properties()` is invoked. Evidence: 422 responses with no business-logic mutation; route-level validation + OpenAPI constraints.

### RED → GREEN summary

| Phase | Result |
|-------|--------|
| RED | 6 failed, 3 passed |
| GREEN | 9 passed |
| Rooms semantics | 2 passed |

### Remaining NOT VERIFIED

| Item | Status | Reason |
|------|--------|--------|
| Production API behavior | NOT VERIFIED | No production access in this phase |
| `min_price > max_price` behavior | NOT APPLICABLE | Explicitly out of scope |
| Full backend pytest suite | NOT VERIFIED | Task-relevant property subset passed; full suite not required for this gate |

**Verification conclusion:** TASK-002 satisfies approved scope and is ready for separate **COMMIT** authorization. Does not authorize push/deploy/production acceptance.

---

## Commit

_Not started._

---

## Production Result

_Not started._

---

## Follow-up

**Follow-up candidate (not TASK-002):**

- Cross-field validation: reject or define behavior when `min_price > max_price` on `GET /properties/`.
- Pagination bounds parity on `GET /properties/admin/all` and `GET /realtor/properties` (separate task).
- Frontend client-side validation parity optional; not required for API correctness.

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY        ← completed (candidate discovery)
READY            ← completed (task defined)
IMPLEMENTING     ← completed (router validation)
VERIFYING        ← completed (final verification)
READY_TO_DEPLOY  ← current stage (does not authorize commit/push/deploy)
COMMIT
PUSH
DEPLOY
PRODUCTION ACCEPTANCE
CLOSED
```
