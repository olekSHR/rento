# TASK-009 — Viewing Request List Rejects Invalid Property ID Filter

| Field | Value |
|-------|-------|
| ID | TASK-009 |
| TITLE | Viewing Request List Rejects Invalid Property ID Filter |
| STATUS | VERIFYING |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / query validation |

> STATUS: VERIFYING means local implementation and local verification are complete. Commit, push, deploy, production acceptance, and closure are **not** authorized by this update.

**Discovery reference:** Post TASK-008 discovery (2026-08-16) — recommendation from TASK-008 archive follow-up: bound `property_id` lower bound on renter `GET /viewing-requests`; deployment class expected: `BACKEND_ONLY`.

**Repository baseline at definition (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `97e6d2ae14f8ce53041307d5a06599e0b9b1f9cb` |
| origin/main | `97e6d2ae14f8ce53041307d5a06599e0b9b1f9cb` |
| divergence | `0 0` |
| Active tasks before creation | none (`docs/engineering/tasks/README.md` only) |

**Runtime note:** TASK-008 application runtime was deployed and production-accepted at `f8b7d60220c76f662eaf39c2d330dfa3064611fa`. Later repository commits are documentation-only. Repository HEAD and deployed application release identity must not be assumed identical.

---

## Problem

**Resource:** Authenticated renter viewing-request collection filter `property_id` on `GET /viewing-requests`.

**Current:** The route declares `property_id: int | None = Query(default=None)` with **no lower bound**, while sibling query parameters on the same route already use FastAPI `Query(ge=…, le=…)` for pagination. Invalid non-positive identifiers (`0`, negative values) are accepted as syntactic integers and forwarded to the repository filter.

**Target:** When `property_id` is provided, it must satisfy `property_id >= 1`. Values `0` and negative integers must be rejected at the HTTP query-validation boundary with HTTP **422**. Omitted `property_id`, valid positive filters, and existing pagination behavior remain unchanged.

This is identifier **domain validation**, not resource-existence validation. A positive nonexistent `property_id` remains a valid filter and must not become 404 merely because no viewing request exists for that property.

---

## Current Behavior

### Request path

```text
GET /viewing-requests
  → list_my_viewing_requests()                    [viewing_requests.py]
  → viewing_request_service.list_my_viewing_requests()
  → viewing_request_repository.list_by_requester()
  → PostgreSQL ViewingRequest rows for requester
```

Production external prefix: `GET /api/viewing-requests`.

### Evidence table

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Router `property_id` | `int \| None = Query(default=None)` — no `ge`/`le` | VERIFIED — `backend/app/routers/viewing_requests.py:33` |
| Router `limit` | `Query(default=20, ge=1, le=100)` | VERIFIED — `viewing_requests.py:34` |
| Router `offset` | `Query(default=0, ge=0)` | VERIFIED — `viewing_requests.py:35` |
| Authentication | `current_user = Depends(get_current_user)` | VERIFIED — `viewing_requests.py:37` |
| Service | Forwards `property_id` unchanged; no lower-bound check | VERIFIED — `viewing_request_service.py:291-296` |
| Repository filter | `if property_id is not None: filter(ViewingRequest.property_id == property_id)` | VERIFIED — `viewing_request_repository.py:76-77` |
| Existing lower-bound elsewhere | No `ge=1` on `property_id` in backend | VERIFIED — repository search |
| Existing tests — valid filter | `test_list_my_viewing_requests` uses positive `property_id={listing.id}` → 200 | VERIFIED — `backend/tests/test_viewing_requests.py:406-411` |
| Existing tests — invalid `property_id` | none for `0` / negative | VERIFIED — no matches in `test_viewing_requests.py` |

### Observed defect semantics (VERIFIED FROM EXECUTION — pre-fix RED)

FastAPI accepted `property_id=0` and `property_id=-1` as valid `int` query values because no `Query` bound rejected them.

**VERIFIED pre-fix path for authenticated user (RED execution 2026-08-17):**

```text
GET /viewing-requests?property_id=0
  → HTTP 200 (expected 422)
GET /viewing-requests?property_id=-1
  → HTTP 200 (expected 422)
```

Post-fix: both return HTTP **422** with `loc: ["query", "property_id"]`.

### Authentication ordering note

The endpoint requires authentication via `get_current_user`. TASK-009's primary locked contract is for an **authenticated** normal user receiving **422** on invalid `property_id`.

Whether an **unauthenticated** request with `property_id=0` would return **401** or **422** depends on FastAPI/Starlette dependency and query-validation resolution order for this route signature.

**VERIFIED FROM EXECUTION (post-fix, local):** unauthenticated `GET /viewing-requests` → **401**; unauthenticated `GET /viewing-requests?property_id=0` → **401**. Authentication behavior unchanged.

---

## Contract Decision

### Locked API contract (Rento-specific)

Applies to:

```text
GET /viewing-requests
```

| Condition | Validity | HTTP |
|-----------|----------|------|
| `property_id` omitted | VALID | existing list behavior (not 422 due to `property_id`) |
| `property_id=1` | VALID | not 422 due to `property_id` |
| `property_id>1` | VALID | not 422 due to `property_id` |
| `property_id=0` | **INVALID** | **422** |
| `property_id<0` (e.g. `-1`) | **INVALID** | **422** |
| `property_id=999999` (positive, nonexistent) | VALID filter | **200** + empty collection if no matches — **not** 404 |

No upper bound on `property_id` is introduced by TASK-009.

Invalid responses SHALL use the standard FastAPI validation envelope:

```json
{"detail": [...]}
```

with `loc` referencing `query` / `property_id`.

### Validation mechanism (implementation phase — not authorized here)

Preferred mechanism:

```text
property_id: int | None = Query(default=None, ge=1)
```

Rationale:

- `property_id` is an HTTP query parameter;
- lower-bound validation belongs at the request boundary;
- sibling pagination params on the same route already use FastAPI `Query` bounds;
- standard FastAPI validation yields HTTP **422**;
- `BadRequestException` is **not** appropriate — existing project mapping yields HTTP **400**.

Service and repository must not be redesigned for this contract unless implementation review finds a concrete conflict.

---

## Architecture Contract

### Valid path (unchanged after fix)

```text
Authenticated client
  → GET /viewing-requests?property_id={positive_id}
  → FastAPI query parsing (property_id valid)
  → list_my_viewing_requests()
  → viewing_request_service.list_my_viewing_requests()
  → viewing_request_repository.list_by_requester(property_id=…)
  → HTTP 200 + list envelope
```

### Invalid path (desired)

```text
Authenticated client
  → GET /viewing-requests?property_id=0
  → FastAPI Query validation
  → HTTP 422
  → viewing-request list service/repository filter MUST NOT run
```

**Boundary claim (INFERRED FROM CONTROL FLOW):** invalid `property_id` must not reach `viewing_request_service.list_my_viewing_requests()` / repository list filter. FastAPI route body must not execute for out-of-domain values.

**DB dependency caveat:** `Depends(get_db)` and `Depends(get_current_user)` may still resolve depending on framework dependency order. Do **not** claim "database connection is never acquired" unless later instrumented evidence proves it. The meaningful contract is service/repository list logic is not invoked for invalid `property_id`.

---

## Acceptance Contract

Primary concern for authenticated renter list:

| Case | Request | Expected |
|------|---------|----------|
| **A** | authenticated, no `property_id` | VALID — HTTP **200** (existing behavior) |
| **B** | authenticated, `property_id=1` | VALID — HTTP **200** (not 422 due to `property_id`) |
| **C** | authenticated, `property_id={existing_listing_id}` with matching request | VALID — HTTP **200**, filtered results |
| **D** | authenticated, `property_id=999999` (positive, no matches) | VALID — HTTP **200**, empty collection |
| **E** | authenticated, `property_id=0` | INVALID — HTTP **422** |
| **F** | authenticated, `property_id=-1` | INVALID — HTTP **422** |
| **G** | authenticated, invalid `limit` / `offset` | existing pagination **422** unchanged |
| **H** | unauthenticated list | existing **401** unchanged (regression only) |

Do not require non-empty `items` for valid positive filters. Primary concern: invalid identifier domain rejected vs accepted.

---

## Test Contract

### Primary RED / GREEN

Preferred name:

```text
test_list_my_viewing_requests_rejects_invalid_property_id
```

**Primary RED request:**

```text
GET /viewing-requests?property_id=0
```

Authenticated as normal `role=user`.

| Field | Value |
|-------|-------|
| Expected (post-fix) | HTTP **422** |
| Current actual (pre-fix) | HTTP **200** with empty collection |
| Current actual evidence | **INFERRED FROM CONTROL FLOW** |

Secondary boundary: `property_id=-1` → **422**. A parametrized test covering `0` and `-1` is acceptable.

RED is valid only if it proves missing `property_id` domain validation. Do not fail RED because of unrelated fixture/auth setup.

### Regression

- `test_list_my_viewing_requests` positive filter remains **200**
- pagination invalid cases on same route remain **422**
- viewing-request create / cancel / accept / decline flows unchanged
- realtor viewing-request routes unchanged
- rental-document lifecycle unchanged

Implementation and RED test creation are **not** authorized by this definition.

---

## In Scope

1. Lower-bound contract on optional `property_id` for renter `GET /viewing-requests` only.
2. Invalid `property_id=0` and negative values → HTTP **422**.
3. Focused backend regression tests.
4. This task document lifecycle updates under separate gates.
5. Later backend-only deploy and production acceptance (separate authorization).

---

## Out of Scope

| Item | Status |
|------|--------|
| Realtor `GET /realtor/viewing-requests` redesign | OUT OF SCOPE |
| Viewing-request create / cancel / accept / decline | OUT OF SCOPE |
| `status` filter 400 vs 422 semantics | OUT OF SCOPE |
| Positive nonexistent `property_id` → 404 | OUT OF SCOPE |
| Service redesign | OUT OF SCOPE |
| Repository redesign | OUT OF SCOPE |
| Database schema / Alembic migration | OUT OF SCOPE |
| Indexes | OUT OF SCOPE |
| Favorites / favorites pagination | OUT OF SCOPE |
| Pending/archived favorite policy | OUT OF SCOPE |
| Frontend changes | OUT OF SCOPE |
| Authentication / authorization changes | OUT OF SCOPE |
| Session / CSRF changes | OUT OF SCOPE |
| Docker / Compose / Nginx changes | OUT OF SCOPE |
| Acceptance identity changes | OUT OF SCOPE |
| Generic validation refactor | OUT OF SCOPE |
| Deployment during definition gate | OUT OF SCOPE |

Unrelated findings remain separate follow-up tasks.

---

## Affected Layers

| Layer | Role in this task |
|-------|-------------------|
| FastAPI renter list route | Current unbounded optional `property_id`; validation-boundary change |
| Service | Must not change valid-range forwarding |
| Repository | Unchanged valid-filter query |
| Tests | Primary RED/GREEN + regression |
| Frontend | Not touched |
| Database | Not touched |

---

## Expected Implementation Surface

Likely files during a future implementation gate (expectation only — not permission to edit now):

| File | Expected change |
|------|-----------------|
| `backend/app/routers/viewing_requests.py` | Add `Query(ge=1)` to optional `property_id` |
| `backend/tests/test_viewing_requests.py` | Add invalid `property_id` RED/GREEN + regression |

Expected **not** changed:

- `viewing_request_service.py`
- `viewing_request_repository.py`
- models / schemas
- frontend
- Alembic
- Docker / Compose / Nginx

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
| Authentication | UNCHANGED — list still requires authenticated user |
| Authorization | UNCHANGED — renter sees own requests only via repository filter |
| CSRF | UNCHANGED — GET |
| Information disclosure | 422 does not leak viewing-request rows |

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

## Production Acceptance Concept

Not performed in this gate. Future acceptance should use dedicated normal-user identity (OPS-001 metadata only):

| Field | Value |
|-------|-------|
| Email | `acceptance@rentonow.ro` |
| User id | 27 |
| Role | `user` |

Credentials remain outside Git in operator-local store. Do not access credentials during definition.

### Future acceptance matrix (concept)

| Request | Expected |
|---------|----------|
| authenticated `GET /api/viewing-requests?property_id=0` | **422** |
| authenticated `GET /api/viewing-requests?property_id=-1` | **422** |
| authenticated `GET /api/viewing-requests` (no filter) | **200** |
| authenticated positive `property_id` filter | **200** under normal collection semantics |
| validation envelope | `detail` present; `loc` includes `query` / `property_id` |
| unauthenticated list | existing auth behavior (regression) |

No business-data mutation required.

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert TASK-009 runtime change and redeploy the previous verified backend image captured during pre-deploy preflight for TASK-009.

After rollback: `property_id <= 0` returns to current unvalidated behavior (INFERRED: **200** empty collection for authenticated user).

Do **not** assume a pre-existing rollback tag from an earlier task is automatically the correct pre-TASK-009 artifact. Rollback target must be determined from production preflight at deployment time.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | No schema/data change |
| Migration | NONE | |
| Authentication | NONE | |
| Authorization | NONE | |
| API compatibility | LOW but **NON-ZERO** | Clients sending `property_id<=0` receive **422** instead of previous collection response |
| Production | LOW | Backend-only |
| Rollback | LOW | Revert Query bound |
| Accidental status-filter change | LOW | Do not modify `status` handling |

---

## Definition of Done

TASK-009 is not complete because a task document exists.

Done requires:

1. Contract documented in this file (`property_id >= 1` when provided).
2. RED reproduced (expected **422**, actual not **422**).
3. Implementation bounded to in-scope files.
4. Primary tests PASS.
5. Regression PASS.
6. Diff reviewed.
7. Commit / push under separate authorization.
8. Backend-only deploy under separate authorization.
9. Production Acceptance: invalid `property_id` **422**; valid list **200**; auth unchanged.
10. Rollback posture confirmed.
11. Closure and archive as separate gates.

---

## Implementation Result

**Date:** 2026-08-17

**RED — invalid property_id:**

| Field | Value |
|-------|-------|
| Test | `test_list_my_viewing_requests_rejects_invalid_property_id` |
| Request | `GET /viewing-requests?property_id=0` and `property_id=-1` (authenticated user) |
| Expected | HTTP **422** |
| Actual (baseline) | HTTP **200** |
| Failure | `assert 200 == 422` |
| RED result | PASS — missing Query lower bound reproduced |

**MINIMAL FIX:**

| Route | Declaration |
|-------|-------------|
| `list_my_viewing_requests()` | `property_id: int \| None = Query(default=None, ge=1)` |

**GREEN:** primary invalid `property_id` tests PASS (HTTP **422**); validation `loc` includes `query` / `property_id`.

**Unchanged by design:** service, repository, models, schemas, frontend, auth dependencies, Alembic.

**Invalid request boundary:** INFERRED — FastAPI `Query` validation runs before route body; service/repository list filter not invoked for out-of-domain values. Not instrumented with mocks.

---

## Final Verification

**Commands executed (backend cwd):**

```bash
python -m pytest tests/test_viewing_requests.py::test_list_my_viewing_requests_rejects_invalid_property_id -v
python -m pytest tests/test_viewing_requests.py -v
python -m compileall app/routers/viewing_requests.py tests/test_viewing_requests.py -q
```

**Primary contract (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| authenticated `property_id=0` | PASS — HTTP **422** |
| authenticated `property_id=-1` | PASS — HTTP **422** |
| validation envelope `loc` | PASS — `["query", "property_id"]` |

**Positive boundary (VERIFIED FROM EXECUTION):**

| Case | Result |
|------|--------|
| `property_id` omitted | PASS — HTTP **200** |
| `property_id=1` | PASS — HTTP **200** (not 422) |
| positive existing filter | PASS — HTTP **200**, filtered total=1 |
| positive nonexistent `999999` | PASS — HTTP **200**, total=0 (not 404) |

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
| unauthenticated list | **401** |
| unauthenticated `property_id=0` | **401** |

**Viewing-request suite:**

| Module | Passed | Failed |
|--------|--------|--------|
| `test_viewing_requests.py` | 31 | 0 |

Create/cancel/accept/decline, realtor flows, and archived-listing lifecycle tests remain PASS within the same suite.

**Quality:** `python -m compileall` on changed files: PASS.

**Diff hygiene:** router + test module + this task document. `git diff --check`: clean. Not staged / not committed / not pushed.

---

## Commit

<!-- Hash/message only after an approved commit stage. -->

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE (local)
VERIFICATION            PASS (local)
COMMIT                  NOT YET
PUSH                    NOT YET
DEPLOY                  NOT YET
PRODUCTION ACCEPTANCE   NOT YET
CLOSURE                 NOT YET
ARCHIVE                 NOT YET
```

**Next gate:** COMMIT REVIEW. Do not stage, commit, push, or deploy from this update.
