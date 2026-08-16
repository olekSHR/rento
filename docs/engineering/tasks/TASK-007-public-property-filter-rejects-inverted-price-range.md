# TASK-007 — Public Property Filter Rejects Inverted Price Range

| Field | Value |
|-------|-------|
| ID | TASK-007 |
| TITLE | Public Property Filter Rejects Inverted Price Range |
| STATUS | VERIFYING |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / query validation |

> STATUS: VERIFYING means local implementation and local verification are complete. Commit, push, deploy, production acceptance, and closure are **not** authorized by this update.

**Discovery reference:** Post TASK-006 bounded discovery (2026-08-16) — recommendation: `Public property filter rejects inverted price range`; deployment: `BACKEND_ONLY`.

**API contract decision (Rento-specific, locked for TASK-007):** When both `min_price` and `max_price` are supplied on public `GET /properties/` and `min_price > max_price`, Rento SHALL return HTTP **422**. Contradictory price ranges are invalid filter input, not a valid query that happens to match zero properties.

This is an explicit Rento API contract decision. TASK-002 left the case as “reject or define” and out of scope. TASK-007 locks the decision:

```text
min_price > max_price → HTTP 422
```

Do not treat 200 + empty results as acceptable for this case.

---

## Problem

**Resource:** Public property list query filters `min_price` and `max_price`.

**Current:** `GET /properties/?min_price=5000&max_price=1000` is accepted after independent `ge=1` checks. The repository applies `price >= 5000 AND price <= 1000`, which cannot match any listing, and the API returns HTTP **200** with an empty result.

**Target:** The same request is rejected at the API validation boundary with HTTP **422**. The inverted range must not be executed as a normal database filter.

This is a narrow public-list query-contract correction. It does not change valid-range repository semantics.

---

## Current Behavior

Route: `GET /properties/` in `backend/app/routers/properties.py` → `get_properties()` → `property_service.get_all_properties()` → `property_repository.get_all_properties()`.

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Router per-field bounds | `min_price` and `max_price` are `Query(default=None, ge=1)` independently | VERIFIED — `backend/app/routers/properties.py:59-60` |
| Cross-field check | **None** | VERIFIED — no comparison of min vs max in router, service, or repository |
| Service | Forwards filter arguments unchanged | VERIFIED — `backend/app/services/property_service.py:140-157` |
| Repository | `price >= min_price` and independently `price <= max_price` | VERIFIED — `backend/app/repositories/property_repository.py:34-44` |
| Inverted range result | No row can satisfy both predicates → empty `items`, HTTP **200** | VERIFIED from current filter logic |
| Frontend | `FiltersBar` forwards both fields without comparing them; HTML `min="1"` only | VERIFIED — `frontend/components/FiltersBar.tsx` |
| Existing tests | Reject `min_price=0/-1`, `max_price=0/-1` with **422**; do not cover `min > max` | VERIFIED — `backend/tests/test_property_list_filter_validation.py` |

**Observed defect example (VERIFIED from current code):**

```text
GET /properties/?min_price=5000&max_price=1000
→ both values pass ge=1
→ repository: price >= 5000 AND price <= 1000
→ HTTP 200
→ empty items
```

The empty result does not depend on fixture data. It is a logical consequence of contradictory predicates.

**Historical deferral (VERIFIED):**

| Source | Statement |
|--------|-----------|
| TASK-002 Follow-up | Cross-field validation: reject or define when `min_price > max_price` |
| TASK-003 Follow-up | Cross-field behavior explicitly out of scope per TASK-002 |
| TASK-006 Follow-up | Public filter cross-field `min_price <= max_price` validation |

---

## Target Behavior

### Locked contract

| Condition | Validity | HTTP |
|-----------|----------|------|
| `min_price` omitted, `max_price` omitted | VALID | not 422 due to price range |
| `min_price` only (`>= 1`) | VALID | not 422 due to price range |
| `max_price` only (`>= 1`) | VALID | not 422 due to price range |
| `min_price < max_price` (both `>= 1`) | VALID | not 422 due to price range |
| `min_price == max_price` (both `>= 1`) | VALID | not 422 due to price range |
| `min_price > max_price` (both supplied, both `>= 1`) | **INVALID** | **422** |
| `min_price=0` or `max_price=0` (or negative) | INVALID (TASK-002) | **422** unchanged |

Equal bounds remain valid: a listing priced exactly `N` matches `price >= N AND price <= N`.

### Error contract vs implementation mechanism

**API CONTRACT (fixed):** HTTP **422**.

**IMPLEMENTATION MECHANISM (not prescribed here):**

Existing per-field `Query(ge=1)` already produces FastAPI/Pydantic request-validation **422**. Tests assert status only, not a custom `{ "success": false, "message" }` body.

Rento domain exceptions (`BadRequestException`) currently map to HTTP **400**, not 422.

Therefore TASK-007:

- **Must** return HTTP **422** for inverted ranges.
- **Must not** invent a new error payload unless the chosen mechanism already requires one.
- **Must not** pre-select FastAPI query-model vs router/service check in this definition.
- Implementation location is decided in the RED / minimal-fix gate after examining the smallest change that preserves current architecture.

Likely files to inspect during implementation (not a mandate to change all of them):

- `backend/app/routers/properties.py`
- `backend/app/services/property_service.py`
- `backend/tests/test_property_list_filter_validation.py`

### Repository semantics (unchanged for valid input)

```text
price >= min_price
price <= max_price
```

Do not redesign repository filtering. Invalid inverted input must be rejected before it is treated as a normal database query.

---

## In Scope

1. Cross-field validation on public `GET /properties/` only.
2. When both prices are present and `min_price > max_price` → HTTP **422**.
3. Add/adjust regression test proving inverted range → 422.
4. Preserve valid combinations (`min < max`, `min == max`, min-only, max-only) and TASK-002 per-field 422.
5. Preserve public listing status filter (`available` only), pagination, `city`, `rooms`, `sort_by`, `order`.

**Expected test home (implementation phase only):**

- Extend `backend/tests/test_property_list_filter_validation.py` — existing public filter 422 suite and helpers.

---

## Out of Scope

| Item | Status |
|------|--------|
| Frontend client-side min/max comparison | OUT OF SCOPE |
| `FiltersBar` UX / chip / URL rewrite | OUT OF SCOPE |
| Admin `GET /properties/admin/all` pagination | OUT OF SCOPE |
| Realtor `GET /realtor/properties` pagination | OUT OF SCOPE |
| Favorite pending/archived policy | OUT OF SCOPE |
| Viewing-request query validation | OUT OF SCOPE |
| Rental documents | OUT OF SCOPE |
| Repository redesign for valid ranges | OUT OF SCOPE |
| Database schema / Alembic migration | OUT OF SCOPE |
| Authentication / authorization | OUT OF SCOPE |
| Generic filter refactor | OUT OF SCOPE |
| Custom error-body redesign | OUT OF SCOPE |
| Deployment during implementation gate | OUT OF SCOPE |

Unrelated findings remain separate follow-up tasks.

---

## Affected Layers

| Layer | Role in this task |
|-------|-------------------|
| FastAPI public list route | Current per-field validation; likely validation-boundary change |
| Service | May host explicit check; must not change valid-range forwarding |
| Repository | Unchanged valid-range predicates |
| Tests | Primary RED/GREEN + existing filter suite |
| Frontend | Not touched |
| Database | Not touched |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Public list declares independent `ge=1` on min/max | VERIFIED | `backend/app/routers/properties.py:59-60` |
| No cross-field min/max comparison exists | VERIFIED | router, `property_service.get_all_properties`, `property_repository.get_all_properties` |
| Repository applies both predicates with AND | VERIFIED | `backend/app/repositories/property_repository.py:34-44` |
| Inverted range cannot match any price | VERIFIED | logical consequence of AND predicates |
| Per-field out-of-domain values already return 422 | VERIFIED | `backend/tests/test_property_list_filter_validation.py` |
| Inverted range is not covered by tests | VERIFIED | same file — no `min_price > max_price` case |
| Frontend does not compare min vs max | VERIFIED | `frontend/components/FiltersBar.tsx:57-63` |
| TASK-002 deferred this case | VERIFIED | archive Follow-up |
| `BadRequestException` maps to HTTP 400, not 422 | VERIFIED | `backend/app/core/handlers.py` |
| FastAPI `Query(ge=1)` maps to HTTP 422 | VERIFIED | TASK-002 tests / current suite |

---

## Architecture Contract

Current **valid** path:

```text
Client
  → GET /api/properties/?min_price=1000&max_price=5000
  → FastAPI router get_properties()
  → per-field Query(ge=1) PASS
  → property_service.get_all_properties()
  → property_repository.get_all_properties()
  → SQLAlchemy: status=available AND price>=1000 AND price<=5000
  → HTTP 200 + matching items
```

Desired **invalid** path:

```text
Client
  → GET /api/properties/?min_price=5000&max_price=1000
  → API validation boundary
  → HTTP 422
  → contradictory filter is not treated as a normal database query
```

**Why not change repository predicates:** they are correct for valid input. The defect is accepting an impossible range as a successful query.

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
| Authentication | UNCHANGED — public list remains unauthenticated |
| Authorization | UNCHANGED |
| CSRF | UNCHANGED — GET |
| Information disclosure | NONE — 422 does not leak listing data |

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

Add cross-field rejection for public `GET /properties/` when both prices are present and `min_price > max_price`, returning HTTP **422**.

Do not change repository valid-range filters. Do not change frontend. Do not add a new exception type unless implementation review proves it is the smallest correct path to 422.

Exact mechanism is selected during IMPLEMENTATION after RED.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | No schema/data change |
| Migration | NONE | |
| Authentication | NONE | |
| Authorization | NONE | |
| API compatibility | LOW but **NON-ZERO** | Previously `min_price > max_price` returned **200** + empty; now **422** |
| Production | LOW | Backend-only |
| Rollback | LOW | Revert validation; prior backend image |
| Accidental valid-range breakage | LOW | Equal bounds and single-sided filters must stay valid |

---

## Acceptance Contract

| Case | Request | Expected |
|------|---------|----------|
| **A** | `min_price=1000&max_price=5000` | VALID — HTTP **200** (not 422 for range) |
| **B** | `min_price=5000&max_price=1000` | INVALID — HTTP **422** |
| **C** | `min_price=1000&max_price=1000` | VALID — HTTP **200** (not 422 for range) |
| **D** | `min_price=1000` (max omitted) | VALID — HTTP **200** (not 422 for range) |
| **E** | `max_price=5000` (min omitted) | VALID — HTTP **200** (not 422 for range) |
| **F** | `min_price=0` | HTTP **422** (TASK-002 unchanged) |
| **G** | `max_price=0` | HTTP **422** (TASK-002 unchanged) |

Also preserve:

- `rooms=0` / `rooms=-1` → 422
- `rooms=1` accepted
- public list remains `available` only
- `limit` / `offset` / `city` / `sort_by` / `order` unchanged

---

## Test Contract

### Primary RED / GREEN

**Test name:** `test_property_list_rejects_inverted_price_range`

**Preferred location:** `backend/tests/test_property_list_filter_validation.py`

**Request:**

```text
GET /properties/?min_price=5000&max_price=1000
```

**Baseline (current code — expected RED):**

- actual HTTP **200**
- expected HTTP **422**

RED is valid only if this failure proves missing cross-field validation. Do not seed properties in a way that could make 200 vs 422 depend on matching listings. The inverted range is invalid regardless of catalog contents.

**Post-fix (GREEN):**

- HTTP **422**

Do not over-assert FastAPI validation body fields unless implementation review adopts a documented payload.

### Regression suite

Rerun at minimum:

```bash
pytest backend/tests/test_property_list_filter_validation.py -v
pytest backend/tests/test_property_rooms_filter.py -v
```

Cover or reuse cases for:

- min < max
- min == max
- min only
- max only
- existing `min_price >= 1` / `max_price >= 1`
- rooms validation

Do not create a new test module unless the existing validation suite cannot host the case.

Implementation and RED test creation are **not** authorized by this definition.

---

## Verification Plan

1. **RED** — primary test fails: actual **200**, expected **422**.
2. **Implementation** — smallest justified change; HTTP **422** for inverted range.
3. **GREEN** — primary test PASS.
4. **Regression** — Cases A, C–G and rooms/pagination/public-status behavior.
5. **Diff review** — no frontend/migration/auth drift.
6. **Production smoke (later)** — unauthenticated `GET /api/properties/?min_price=5000&max_price=1000` → 422; a valid range → 200.

**Proof question:** Did only inverted-range handling change?

---

## Rollback Impact

**Application rollback:** revert TASK-007 runtime change and redeploy previous backend image.

**Database rollback:** NOT REQUIRED.

**Behavior after rollback:** `min_price > max_price` returns to HTTP **200** + empty result.

---

## AI-generated code control

Before accepting implementation, the developer must answer:

1. Where is cross-field validation performed?
2. Why is that layer appropriate?
3. Why is repository filtering itself not broken?
4. Why is 422 returned (not 400)?
5. Does invalid input reach repository/database?
6. What happens when `min_price == max_price`?
7. What existing filter behavior could regress?
8. Which files changed and why?
9. How is the behavior verified?
10. How is it rolled back?

---

## Definition of Done

TASK-007 is not complete because a validation line exists.

Done requires:

1. Contract documented in this file.
2. RED reproduced (200 vs 422).
3. Implementation bounded to in-scope files.
4. Primary test PASS.
5. Filter regression PASS.
6. Diff reviewed.
7. Commit / push under separate authorization.
8. Backend-only deploy under separate authorization.
9. Production Acceptance: inverted range 422; valid range 200.
10. Rollback posture confirmed.
11. Closure and archive as separate gates.

---

## Implementation Result

**Date:** 2026-08-16

**RED:**

| Field | Value |
|-------|-------|
| Test | `test_property_list_rejects_inverted_price_range` |
| Command | `python -m pytest tests/test_property_list_filter_validation.py::test_property_list_rejects_inverted_price_range -v` |
| Expected | HTTP **422** |
| Actual (baseline) | HTTP **200** |
| Failure | `assert 200 == 422` |
| RED result | PASS — cross-field defect reproduced |

**MINIMAL FIX:**

| Field | Value |
|-------|-------|
| Location | `backend/app/routers/properties.py` — `get_properties()` |
| Mechanism | After independent `Query(ge=1)` binding, if both prices are present and `min_price > max_price`, raise FastAPI `RequestValidationError` |
| Why this layer | Public list already validates query params at the router; this is the smallest cross-field check on the same surface |
| Why not repository | Valid-range predicates (`price >= min` AND `price <= max`) are correct; the defect is accepting an impossible range as a successful query |
| Why not `BadRequestException` | Current handler maps it to HTTP **400**, not **422** |
| How 422 is produced | FastAPI default `RequestValidationError` handler (same family as `Query(ge=1)`) |

**GREEN:**

| Field | Value |
|-------|-------|
| Test | `test_property_list_rejects_inverted_price_range` |
| Command | same as RED, after fix |
| Result | PASS |
| HTTP status | **422** |

**Files touched:**

| File | Change |
|------|--------|
| `backend/app/routers/properties.py` | Cross-field inverted-range check in `get_properties()` |
| `backend/tests/test_property_list_filter_validation.py` | Primary RED/GREEN test + valid-range cases A/C/D/E |
| `docs/engineering/tasks/TASK-007-public-property-filter-rejects-inverted-price-range.md` | Evidence update |

**Unchanged by design:** `property_service`, `property_repository` valid-range filters, frontend, admin/realtor routes, favorites, viewing, models, Alembic, auth.

**Invalid request boundary:** INFERRED — raise occurs in the router before `property_service.get_all_properties()`. FastAPI still resolves `Depends(get_db)` before the route body; no property-list repository query is issued. Not instrumented with mocks.

---

## Final Verification

**Commands executed (backend cwd):**

```bash
python -m pytest tests/test_property_list_filter_validation.py::test_property_list_rejects_inverted_price_range -v
python -m pytest tests/test_property_list_filter_validation.py tests/test_property_rooms_filter.py -v
python -m compileall app/routers/properties.py tests/test_property_list_filter_validation.py -q
```

**Regression:**

| Contract | Test evidence | Result |
|----------|---------------|--------|
| A — min < max | `test_public_properties_accepts_valid_price_ranges[min<max]` | PASS (HTTP **200**) |
| B — inverted | `test_property_list_rejects_inverted_price_range` | PASS (HTTP **422**) |
| C — min == max | `test_public_properties_accepts_valid_price_ranges[min==max]` | PASS (HTTP **200**) |
| D — min only | `test_public_properties_accepts_valid_price_ranges[min-only]` | PASS (HTTP **200**) |
| E — max only | `test_public_properties_accepts_valid_price_ranges[max-only]` | PASS (HTTP **200**) |
| F — min_price=0 | `test_public_properties_rejects_out_of_domain_filter_values[min_price=0]` | PASS (HTTP **422**) |
| G — max_price=0 | `test_public_properties_rejects_out_of_domain_filter_values[max_price=0]` | PASS (HTTP **422**) |
| rooms lower-bound | existing rooms cases in both suites | PASS |

**Suite totals:**

| Module | Passed | Failed | Skipped |
|--------|--------|--------|---------|
| `test_property_list_filter_validation.py` | 14 | 0 | 0 |
| `test_property_rooms_filter.py` | 2 | 0 | 0 |
| **Combined focused suites** | **16** | **0** | **0** |

**Quality:**

- `python -m compileall` on modified Python files: PASS
- No established project ruff/flake8/mypy/pyright command found for routine backend gate beyond pytest.

**Diff hygiene:**

- Application: `backend/app/routers/properties.py` only
- Tests: `backend/tests/test_property_list_filter_validation.py` only
- Task document updated
- `git diff --check`: clean
- Not staged / not committed / not pushed

---

## Commit

<!-- Hash/message only after an approved commit stage. -->

---

## Production Result

<!-- Filled only after deploy + production verification if applicable. -->

---

## Follow-up

Possible separate future tasks (not part of TASK-007):

- Frontend client-side min/max comparison
- Admin/realtor collection pagination bounds
- Pending property favorite policy review

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
```

**Next gate:** COMMIT REVIEW. Do not stage, commit, push, or deploy from this update.
