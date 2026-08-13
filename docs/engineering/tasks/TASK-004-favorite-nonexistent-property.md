# TASK-004 — Favorite creation rejects nonexistent property

| Field | Value |
|-------|-------|
| ID | TASK-004 |
| TITLE | Favorite creation rejects nonexistent property |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / error semantics |

> STATUS: CLOSED means implementation, deployment, and production acceptance are complete.

---

## Problem

`POST /favorites/{property_id}` currently attempts to insert a `Favorite` row before verifying that the referenced `Property` exists.

For a nonexistent property ID, the database foreign key rejects the insert and the uncaught SQLAlchemy `IntegrityError` becomes **HTTP 500**.

This is incorrect API behavior because a client-controlled reference to a missing resource is an expected domain condition, not an internal server failure.

---

## Current Behavior

Route: `POST /favorites/{property_id}` in `backend/app/routers/favorites.py` → `favorite_service.add_to_favorites()` → `favorite_repository.create_favorite()` → `db.commit()`.

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Router | Passes `property_id` to service; no property lookup | VERIFIED — `routers/favorites.py` |
| Service duplicate check | Existing favorite → `BadRequestException("Property already in favorites")` → HTTP 400 | VERIFIED — `services/favorite_service.py` |
| Service property existence | **Not checked** | VERIFIED — `services/favorite_service.py` |
| Repository insert | Creates `Favorite(user_id, property_id)` and commits | VERIFIED — `repositories/favorite_repository.py` |
| Database constraint | `Favorite.property_id` FK → `properties.id` | VERIFIED — `models/favorite.py` |
| Missing property result | Uncaught `sqlalchemy.exc.IntegrityError` → HTTP **500** | VERIFIED — test-environment reproduction during discovery |

**Observed defect example (VERIFIED in discovery):**

```text
POST /favorites/99999
→ HTTP 500 Internal Server Error
```

**Existing behavior that must remain unchanged:**

| Case | Current response | Must remain |
|------|------------------|-------------|
| Valid property, not yet favorited | HTTP 201 + favorite payload | YES |
| Duplicate favorite | HTTP 400 `"Property already in favorites"` | YES |
| Favorite on archived property | HTTP 201; relation preserved; hidden from GET list until reactivated | YES |
| DELETE missing favorite | HTTP 400 `"Favorite not found"` | YES |

---

## Target Behavior

### Nonexistent property

```text
Request:
POST /favorites/{nonexistent_property_id}

Expected:
HTTP 404

Error semantics:
Property not found
```

Use the project's existing `NotFoundException` mechanism. The application already maps it to HTTP 404 via `not_found_exception_handler` in `backend/app/core/handlers.py`.

Where stable under the existing exception contract, the response body includes:

```json
{
  "success": false,
  "message": "Property not found"
}
```

No favorite row must be inserted.

### Existing valid behavior

Must remain unchanged:

- valid existing property + not already favorite → existing successful status/response unchanged
- duplicate favorite → existing controlled behavior unchanged
- existing archived-property behavior → unchanged
- DELETE favorite behavior → unchanged

---

## In Scope

1. Add service-level property existence validation in `favorite_service.add_to_favorites()` before favorite creation.
2. Raise `NotFoundException("Property not found")` when `property_repository.get_property_by_id()` returns no row.
3. Add regression test `test_add_favorite_nonexistent_property_returns_404`.
4. Record RED/GREEN evidence and verification results in this task file through lifecycle gates.

**Expected application file (implementation phase only):**

- `backend/app/services/favorite_service.py`

**Expected regression test file (implementation phase only):**

- `backend/tests/test_favorites_nonexistent_property.py`

Prefer a dedicated test file to keep the nonexistent-property contract isolated from archived-property semantics.

---

## Out of Scope

| Item | Status |
|------|--------|
| DELETE missing favorite 400 → 404 | OUT OF SCOPE |
| Favorites pagination | OUT OF SCOPE |
| Admin/realtor pagination | OUT OF SCOPE |
| Pending property favorite policy | OUT OF SCOPE |
| Archived property favorite semantics | OUT OF SCOPE |
| Frontend changes | OUT OF SCOPE |
| Global `IntegrityError` handling | OUT OF SCOPE |
| Database schema changes | OUT OF SCOPE |
| Migration | OUT OF SCOPE |
| Authentication redesign | OUT OF SCOPE |

Unrelated findings remain separate follow-up tasks.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Router | No change expected — thin delegation remains |
| Service | Primary fix boundary — property existence validation before insert |
| Repository | No change expected — reuse existing lookup only |
| Database | No schema change |
| Frontend | No change |
| Auth | No change — endpoint remains authenticated |

Request lifecycle after fix:

```text
POST /favorites/{property_id}
→ router
→ favorite_service.add_to_favorites()
→ property_repository.get_property_by_id()
→ if missing: NotFoundException
→ HTTP 404
→ no Favorite INSERT attempted

For existing property:
→ existing duplicate check
→ favorite_repository.create_favorite()
→ commit
→ HTTP 201 (unchanged success response)
```

---

## Architecture Decision

**Preferred fix boundary:** the favorite service performs property existence validation before attempting favorite creation.

**Precedent:** `viewing_request_service._get_eligible_property()` already uses `property_repository.get_property_by_id()` and raises `NotFoundException("Property not found")` when the property row is missing.

**Important distinction for TASK-004:** only missing property rows are in scope. Existing archived/pending favorite behavior must not be altered. The service check must be limited to existence (`property_item is None`), not property availability/status.

**Why not catch FK `IntegrityError` as the primary mechanism:**

- Resource existence is a domain precondition and should be validated before the database insert.
- A pre-insert lookup produces the correct HTTP semantics without relying on database exception translation.
- The project already has an established `NotFoundException` path for missing properties.

**Why not add a global `IntegrityError` handler:**

- Broader blast radius than this bounded defect requires.
- Explicitly out of scope for TASK-004.

**Router changes:** not necessary if the service validates existence.

**Repository changes:** not necessary — `property_repository.get_property_by_id()` already exists.

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| `add_to_favorites()` lives in `favorite_service.py` | VERIFIED | `backend/app/services/favorite_service.py` |
| Duplicate favorites return HTTP 400 via `BadRequestException` | VERIFIED | `backend/app/services/favorite_service.py` |
| Property lookup by ID exists as `property_repository.get_property_by_id()` | VERIFIED | `backend/app/repositories/property_repository.py` |
| Missing property insert hits FK on `favorites.property_id` | VERIFIED | `backend/app/models/favorite.py` |
| Uncaught FK violation currently yields HTTP 500 | VERIFIED | Discovery reproduction with TestClient |
| `NotFoundException` maps to HTTP 404 with `"success": false` JSON body | VERIFIED | `backend/app/core/handlers.py` |
| Viewing requests use pre-insert property lookup + `NotFoundException` | VERIFIED | `backend/app/services/viewing_request_service.py` |
| Archived favorite semantics are intentional and tested | VERIFIED | `backend/tests/test_favorites_archived_properties.py` |
| No regression test currently covers nonexistent property favorite add | VERIFIED | Repository test search during discovery |

---

## Proposed Change

In `favorite_service.add_to_favorites()`:

1. Import `property_repository` and `NotFoundException`.
2. Before duplicate-check or insert, call `property_repository.get_property_by_id(db, property_id)`.
3. If no property row exists, raise `NotFoundException("Property not found")`.
4. Otherwise continue with the existing duplicate check and `create_favorite()` flow unchanged.

No router, repository, model, migration, or global exception-handler changes are required for this bounded fix.

---

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| User-visible behavior change for invalid property IDs | LOW | Intended — 500 → 404 |
| Regression in valid favorite add | LOW | Preservation tests + existing archived favorites suite |
| Accidental change to archived/pending favorite policy | LOW | Existence-only check; do not add status filtering |
| Production deploy impact | LOW | Backend-only change; no migration |
| Auth/session impact | NOT APPLICABLE | Endpoint contract unchanged for valid requests |

Overall task risk: **LOW**.

---

## Verification Plan

### Regression tests (to be added in implementation phase)

**Primary RED/GREEN test:**

```text
test_add_favorite_nonexistent_property_returns_404
```

Arrange:

- authenticated normal user
- nonexistent property ID (e.g. `99999`)

Act:

- `POST /favorites/{nonexistent_id}` with CSRF headers

Assert:

- `status_code == 404`
- where stable under existing exception contract: response indicates `"Property not found"`

**Preservation checks:**

1. valid existing property can still be favorited successfully (`HTTP 201`)
2. duplicate favorite behavior remains unchanged (`HTTP 400`)
3. existing archived-favorite tests remain green (`backend/tests/test_favorites_archived_properties.py`)

### RED/GREEN execution plan

Do **not** execute until IMPLEMENTATION is authorized.

1. Create regression test only.
2. Run focused test.
3. Confirm RED:
   - expected: `404`
   - actual: `500`
4. STOP and record RED evidence in this task file.
5. Separate authorization for minimal application fix.
6. Add service-level property existence validation.
7. Run focused regression test.
8. Confirm GREEN.
9. Run existing favorite regression tests.
10. Perform broader relevant backend verification.
11. Review diff.
12. Commit only after verification.

Suggested focused commands for later phases:

```bash
cd backend
pytest tests/test_favorites_nonexistent_property.py -q
pytest tests/test_favorites_archived_properties.py -q
pytest -q
```

---

## RED / Regression Evidence

Regression test added before application fix. Application code unchanged.

| Field | Value |
|-------|-------|
| Regression test path | `backend/tests/test_favorites_nonexistent_property.py` |
| Test name | `test_add_favorite_nonexistent_property_returns_404` |
| Command | `cd backend && pytest tests/test_favorites_nonexistent_property.py -q` |
| Expected (target contract) | HTTP **404**, message `"Property not found"` |
| Actual (pre-fix) | HTTP **500** |
| RED confirmed | **YES** |
| Application fix implemented | **NO** |

**Pytest failure (VERIFIED):**

```text
assert response.status_code == 404
E       assert 500 == 404
E        +  where 500 = <Response [500 Internal Server Error]>.status_code
```

**TestClient note:** `raise_server_exceptions=False` is required in this regression module so pytest observes the HTTP **500** response instead of re-raising the unhandled server exception. No repository mocking; end-to-end `POST /favorites/{id}` at the API boundary.

**Failure mechanism (VERIFIED):**

```text
POST /favorites/99999
→ favorite_service.add_to_favorites()
→ favorite_repository.create_favorite()
→ db.commit()
→ sqlalchemy.exc.IntegrityError (FOREIGN KEY constraint failed)
→ HTTP 500
```

With default `TestClient` (`raise_server_exceptions=True`), the same request re-raises `IntegrityError` from the commit path instead of returning a controlled HTTP response.

**Preservation baseline (pre-fix, application unchanged):**

| Command | Result |
|---------|--------|
| `pytest tests/test_favorites_archived_properties.py -q` | **7 passed** |

Observed via existing archived favorites suite (not duplicate-specific coverage):

- valid favorite add on available property → **HTTP 201** (`add_favorite_via_api` helper assertion)
- archived favorite list visibility semantics → existing tests **green**
- duplicate favorite behavior → **not covered** by a dedicated favorites test module in this baseline run

---

## GREEN / Verification Evidence

| Field | Value |
|-------|-------|
| Application fix | Property existence lookup added in `favorite_service.add_to_favorites()` |
| Exception used | `NotFoundException("Property not found")` |
| Router changed | **NO** |
| Repository changed | **NO** (reuse `property_repository.get_property_by_id()` only) |
| Schema / migration changed | **NO** |
| Global IntegrityError handler | **NO** |
| Archived behavior preserved | **YES** — `pytest tests/test_favorites_archived_properties.py -q` → **7 passed** |

**Service ordering (chosen):**

1. property existence lookup → missing → `NotFoundException` → HTTP **404**
2. duplicate favorite check → existing → `BadRequestException` → HTTP **400**
3. `create_favorite()` → HTTP **201**

**RED → GREEN:**

| Phase | Expected | Actual |
|-------|----------|--------|
| RED | HTTP **404** | HTTP **500** |
| GREEN | HTTP **404** | HTTP **404**, message `"Property not found"` |

**Focused verification commands:**

```bash
cd backend
pytest tests/test_favorites_nonexistent_property.py -q
# 3 passed

pytest tests/test_favorites_archived_properties.py -q
# 7 passed
```

**Preservation (verified):**

| Behavior | Result |
|----------|--------|
| valid add | **PASS** — `test_add_valid_favorite_returns_201` → HTTP **201** |
| duplicate | **PASS** — `test_add_duplicate_favorite_preserves_400` → HTTP **400** |
| archived semantics | **PASS** — archived suite **7 passed** |

---

## Rollback Impact

| Area | Impact |
|------|--------|
| Code rollback | Revert service change and optional new test file |
| Database | No migration; no persistent schema impact |
| Data | No backfill required |
| Deploy | Standard backend-only redeploy of previous image/commit |
| Production symptom if rollback needed | Nonexistent property favorite add would return 500 again (known pre-fix defect) |

Rollback is straightforward because the change is confined to service validation logic with no schema dependency.

---

## Production Acceptance Plan

Do **not** execute during definition. Execute only after approved deploy.

Because the endpoint requires authentication, acceptance must use an approved production test account/session.

**Primary check:**

```text
POST /api/favorites/{clearly_nonexistent_id}
```

Expected:

- HTTP 404
- not HTTP 500
- controlled error response
- backend remains healthy
- no traceback / `IntegrityError` from this request
- no favorite row is created

**Preservation smoke:**

- normal favorite add still works
- duplicate behavior remains controlled
- favorite removal still works if needed for cleanup

Record deploy identity, request evidence, and PASS/FAIL in this task file during the production verification gate.

---

## Deployment Considerations

| Item | Value |
|------|-------|
| Deploy surface | Backend only |
| Migration required | NO |
| Frontend rebuild required | NO |
| Expected downtime | None beyond normal backend rollout |
| Pre-deploy check | Focused pytest green on backend |
| Post-deploy check | Authenticated production acceptance above |

---

## Implementation Result

| Item | Detail |
|------|--------|
| Files touched | `backend/app/services/favorite_service.py` |
| Change | Added `property_repository.get_property_by_id()` existence check before favorite insert |
| Exception | `NotFoundException("Property not found")` for missing property rows |
| Ordering | existence → duplicate → create |
| Router | unchanged |
| Favorite repository | unchanged |
| Property repository | unchanged (lookup reused via import only) |
| Global IntegrityError handling | not added |
| Archived/pending favorite policy | unchanged — existence-only validation |
| Regression tests | `backend/tests/test_favorites_nonexistent_property.py` (404, valid 201, duplicate 400) |

## Final Verification

Final verification completed without additional code changes during this gate.

### Diff review

| File | Scope | Unrelated changes |
|------|-------|-------------------|
| `backend/app/services/favorite_service.py` | **13 insertions / 2 deletions** — imports + existence block only | **NO** |

Service diff breakdown:

- **2 deletions:** replace single-import lines with expanded imports (`property_repository`, `NotFoundException`)
- **13 insertions:** 11 lines for existence lookup + `NotFoundException`; 2 lines from import expansion net effect in git count

No changes to `remove_from_favorites()`, `get_user_favorites()`, duplicate logic, or `create_favorite()` call semantics.

### Focused test results

| Command | Result |
|---------|--------|
| `pytest tests/test_favorites_nonexistent_property.py tests/test_favorites_archived_properties.py -q` | **10 passed** |

| Module | Count |
|--------|-------|
| `test_favorites_nonexistent_property.py` | **3 passed** |
| `test_favorites_archived_properties.py` | **7 passed** |

**Additional favorites tests:** `test_iwp_004_api_contracts.py` and `test_iwp006_f001_session_auth.py` reference favorites routes/contracts only; no additional end-to-end favorites behavior modules found. **NOT RUN** — not required for TASK-004 contract proof.

### RED → GREEN

| Case | Pre-fix | Post-fix |
|------|---------|----------|
| nonexistent property | HTTP **500** | HTTP **404**, `"Property not found"` |
| valid add | HTTP **201** | HTTP **201** (**PASS**) |
| duplicate | HTTP **400** | HTTP **400** (**PASS**) |
| archived semantics | green | **7 passed** (**PASS**) |

### Architecture boundary (verified)

Missing property path:

```text
POST /favorites/{id}
→ router
→ favorite_service.add_to_favorites()
→ property_repository.get_property_by_id()
→ None
→ NotFoundException
→ not_found_exception_handler
→ HTTP 404
```

Nonexistent property **does not reach** `favorite_repository.create_favorite()` / `db.commit()` / FK `IntegrityError`.

Existing property path unchanged: existence → duplicate check → create → **201**.

Duplicate path unchanged: existence → duplicate → `BadRequestException` → **400**.

Global `IntegrityError` handler: **not added**.

### Deployment impact

| Area | Impact |
|------|--------|
| Backend runtime | **YES** — service validation only |
| Frontend runtime | **NO** |
| API contract | **YES** — missing resource **500 → 404** |
| Database schema | **NO** |
| Migration | **NO** |
| Dependencies | **NO** |
| Runtime config | **NO** |
| Expected deploy scope | **BACKEND_ONLY** |

Rollback note: preserve current running backend image before rebuild; do not assume an existing rollback tag is current without deployment preflight verification.

### Remaining NOT VERIFIED (non-blocking)

| Item | Status | Notes |
|------|--------|-------|
| Duplicate favorite production behavior | **NOT VERIFIED** | Automated regression covers duplicate 400 |
| Valid add production behavior | **NOT VERIFIED IN PRODUCTION** | Automated regression covers 201 |
| Archived favorite production semantics | **NOT VERIFIED IN THIS ACCEPTANCE** | Existing archived suite passed pre-deploy |

These items were not required for the primary TASK-004 acceptance contract.

## Commit

| Field | Value |
|-------|-------|
| SHA | `c5c9de631ed560848fe00dd2246e60a697c062b4` |
| Message | `fix(favorites): return 404 for missing property` |

## Production Result

**Date:** 2026-08-13
**PRODUCTION_ACCEPTANCE:** **PASS**

| Field | Value |
|-------|-------|
| DEPLOYED_SHA | `c5c9de631ed560848fe00dd2246e60a697c062b4` |
| Backend image | `sha256:78d43a404a7eff11aae857fe2107b94f31b1c880abd1da1b0ee7f8a586a25090` |
| Deployment scope | BACKEND_ONLY |
| Production acceptance identity | user id `27`, `role=user` (OPS-001 dedicated acceptance user) |

**Primary production contract:**

| Check | Result |
|-------|--------|
| Nonexistent property ID | `100012` (verified absent; max property id was `12`) |
| Favorite row before | `0` |
| `POST /api/favorites/100012` | HTTP **404** |
| Message | `"Property not found"` |
| HTTP 500 | **NO** |
| IntegrityError | **NO** |
| Traceback | **NO** |
| Favorite row after | `0` |
| Persistent favorite created | **NO** |

**Authenticated session flow:**

| Step | Result |
|------|--------|
| Login | **200** |
| `GET /api/favorites/` (authenticated) | **200** |
| Logout | **200** |
| `GET /api/favorites/` after logout | **401** |

**Runtime (post-acceptance):**

| Service | Result |
|---------|--------|
| backend | healthy |
| frontend | healthy |
| nginx | healthy |
| db | healthy |
| `https://rentonow.ro/` | **200** |
| `https://rentonow.ro/login` | **200** |

**Preservation evidence (non-blocking):**

| Check | Result |
|-------|--------|
| Duplicate favorite production behavior | **NOT VERIFIED** |
| Valid add production behavior | **NOT VERIFIED IN PRODUCTION** |
| Archived favorite production semantics | **NOT VERIFIED IN THIS ACCEPTANCE** |

## Follow-up

Possible separate future tasks (not part of TASK-004):

- Admin/realtor collection pagination bounds
- DELETE missing favorite HTTP semantics (400 vs 404)
- Pending property favorite policy review

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY
TASK DEFINITION
IMPLEMENTATION
VERIFICATION
COMMIT
PUSH
DEPLOY
PRODUCTION ACCEPTANCE
```
