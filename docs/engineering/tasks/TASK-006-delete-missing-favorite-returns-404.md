# TASK-006 — DELETE Missing Favorite Returns 404

| Field | Value |
|-------|-------|
| ID | TASK-006 |
| TITLE | DELETE Missing Favorite Returns 404 |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Backend API correctness / error semantics |

> STATUS: CLOSED means implementation, deployment, and production acceptance are complete. Archive remains a separate authorization gate.

**Lifecycle (2026-08-16):**

| Gate | State |
|------|-------|
| Implementation | COMPLETE |
| Local verification | PASS |
| Commit | COMPLETE |
| Push | COMPLETE |
| Deployment | PASS |
| Production acceptance | PASS |
| Closure | COMPLETE |
| Archive | NOT YET |

**Discovery reference:** Post TASK-005 bounded discovery (2026-08-16) — recommendation: `DELETE missing favorite returns 404`; deployment: `BACKEND_ONLY`.

**API contract decision (Rento-specific, not universal REST doctrine):** When an authenticated user requests `DELETE /favorites/{property_id}` and no Favorite relation exists for that user/property pair, Rento SHALL return HTTP 404 via the existing `NotFoundException` handler. This models deletion of a specific user-resource relationship with explicit missing-resource semantics. DELETE idempotency or alternate status designs are intentionally not adopted in this task.

---

## Problem

**Resource:** Favorite relationship between an authenticated user and a property.

**Current:** `DELETE /favorites/{property_id}` when the Favorite relation does not exist returns HTTP **400 Bad Request** with message `"Favorite not found"`.

**Target:** The same request returns HTTP **404 Not Found** with the existing `NotFoundException` response structure.

This is a narrow API error-contract correction within the Favorites API. It does not redefine global DELETE semantics for the platform.

---

## Current Behavior

Route: `DELETE /favorites/{property_id}` in `backend/app/routers/favorites.py` → `favorite_service.remove_from_favorites()` → `favorite_repository.get_favorite()` → missing row branch.

| Step | Current behavior | Evidence |
|------|------------------|----------|
| Router | Authenticated DELETE; delegates to service; success returns `MessageResponse` | VERIFIED — `backend/app/routers/favorites.py` |
| Service lookup | `favorite_repository.get_favorite(db, user_id, property_id)` | VERIFIED — `backend/app/services/favorite_service.py` |
| Missing Favorite branch | `BadRequestException("Favorite not found")` | VERIFIED — `backend/app/services/favorite_service.py:55-59` |
| Exception mapping | `BadRequestException` → HTTP **400** via `bad_request_exception_handler` | VERIFIED — `backend/app/core/handlers.py:33-49` |
| Repository on missing case | No DB mutation; delete path not reached | VERIFIED — `delete_favorite()` only called when row exists |
| CSRF | DELETE is mutating; not CSRF-exempt | VERIFIED — `/favorites/*` absent from `CSRF_EXEMPT_PATHS` in `backend/app/core/security/csrf.py` |

**Observed defect example (VERIFIED from current service code):**

```text
DELETE /favorites/{property_id}
authenticated user has no Favorite(user_id, property_id)
→ HTTP 400 Bad Request
→ { "success": false, "message": "Favorite not found" }
```

**Existing behavior that must remain unchanged:**

| Case | Current response | Must remain |
|------|------------------|-------------|
| Valid Favorite exists | HTTP **200**, `{ "success": true, "message": "Favorite removed" }` | YES |
| Duplicate POST favorite | HTTP **400** `"Property already in favorites"` | YES |
| POST nonexistent property | HTTP **404** `"Property not found"` (TASK-004) | YES |
| POST valid new favorite | HTTP **201** + favorite payload | YES |
| Archived-property Favorite DELETE | HTTP **200**; relation removed from DB | YES |
| GET favorites list semantics | Available listings only in list output | YES |
| Unauthenticated access | Existing auth rejection behavior | YES |
| Cross-user Favorite isolation | User can only delete own Favorite rows via own session | YES |

Historical deferral (VERIFIED — TASK-004 archive Follow-up):

```text
DELETE missing favorite HTTP semantics (400 vs 404)
```

---

## Target Behavior

### Missing Favorite relation on DELETE

```text
Request:
DELETE /favorites/{property_id}
authenticated user
no Favorite(user_id, property_id) row

Expected:
HTTP 404 Not Found

Error semantics:
Favorite not found
```

Use the project's existing `NotFoundException` mechanism. The application maps it to HTTP 404 via `not_found_exception_handler` in `backend/app/core/handlers.py`.

Where stable under the existing exception contract, the response body includes:

```json
{
  "success": false,
  "message": "Favorite not found"
}
```

No database mutation must occur on the missing-favorite path.

### Existing valid behavior

Must remain unchanged:

- valid Favorite exists → existing successful DELETE status/response unchanged
- duplicate POST favorite → HTTP 400 unchanged
- POST nonexistent property → HTTP 404 unchanged (TASK-004)
- archived/non-public favorite policy → unchanged
- favorite list behavior → unchanged
- authentication, authorization, CSRF, session behavior → unchanged

---

## In Scope

1. Change missing-Favorite branch in `favorite_service.remove_from_favorites()` from `BadRequestException` to `NotFoundException`.
2. Preserve message text `"Favorite not found"` unless repository conventions require otherwise (current `NotFoundException` uses `.message`; handler reads `exc.message`).
3. Add/adjust regression test proving missing Favorite DELETE → HTTP 404.
4. Run targeted favorites regression tests and record verification evidence through lifecycle gates.

**Expected application file (implementation phase only):**

- `backend/app/services/favorite_service.py`

**Expected regression test scope (implementation phase only):**

- Extend `backend/tests/test_favorites_nonexistent_property.py` **or** add one bounded new favorites test module following current test organization. Prefer extending the existing nonexistent/missing-resource favorites test module because TASK-004 already established that file for favorites HTTP contract fixes and shared helpers (`seed_user`, `seed_property`, `login_user`, `csrf_headers`).

---

## Out of Scope

| Item | Status |
|------|--------|
| Pending property favorite policy | OUT OF SCOPE |
| Archived property favorite policy redesign | OUT OF SCOPE |
| Favorite list behavior changes | OUT OF SCOPE |
| Favorite creation semantics except regression verification | OUT OF SCOPE |
| Pagination bounds | OUT OF SCOPE |
| Frontend changes | OUT OF SCOPE |
| Database schema changes | OUT OF SCOPE |
| Alembic migrations | OUT OF SCOPE |
| Authentication changes | OUT OF SCOPE |
| Authorization redesign | OUT OF SCOPE |
| Response schema redesign beyond existing NotFound handler contract | OUT OF SCOPE |
| Broad exception refactor | OUT OF SCOPE |
| Router/service/repository refactor | OUT OF SCOPE |
| Unrelated HTTP semantics changes | OUT OF SCOPE |
| Idempotent DELETE redesign (e.g. 204 on missing resource) | OUT OF SCOPE |
| Deployment during implementation gate | OUT OF SCOPE |

Unrelated findings remain separate follow-up tasks.

---

## Affected Layers

| Layer | Role in this task |
|-------|-------------------|
| FastAPI router | Unchanged delegation; no special-case status logic |
| Service | **Change point** — exception type for missing Favorite |
| Repository | Unchanged lookup/delete behavior |
| Exception handlers | Unchanged mapping; existing 404 handler used |
| Tests | Add primary RED/GREEN regression + rerun favorites suite |
| Frontend | Not touched |
| Database | Not touched |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| DELETE favorite endpoint exists at `DELETE /favorites/{property_id}` | VERIFIED | `backend/app/routers/favorites.py:39-58` |
| Router requires authenticated user via `get_current_user` | VERIFIED | `backend/app/routers/favorites.py:45-46` |
| Missing Favorite branch raised `BadRequestException("Favorite not found")` at pre-fix baseline; post-implementation raises `NotFoundException` | VERIFIED | `backend/app/services/favorite_service.py`; Implementation Result below |
| `BadRequestException` maps to HTTP 400 | VERIFIED | `backend/app/core/handlers.py:33-49` |
| `NotFoundException` maps to HTTP 404 with `{ success: false, message }` | VERIFIED | `backend/app/core/handlers.py:14-30` |
| Valid DELETE success returns HTTP 200 + success message | VERIFIED | `backend/app/routers/favorites.py:55-58`; `backend/tests/test_favorites_archived_properties.py:221-226` |
| Duplicate POST returns HTTP 400 | VERIFIED | `backend/tests/test_favorites_nonexistent_property.py:134-154` |
| POST nonexistent property returns HTTP 404 (TASK-004) | VERIFIED | `backend/tests/test_favorites_nonexistent_property.py:105-115` |
| Missing Favorite DELETE path performs no DB delete | VERIFIED | `favorite_service.remove_from_favorites()` returns before `delete_favorite()` |
| TASK-004 explicitly deferred DELETE 400→404 | VERIFIED | `docs/engineering/archive/TASK-004-favorite-nonexistent-property.md` Follow-up |
| Unauthenticated favorites DELETE returns HTTP 401 | INFERRED | `get_current_user` → `UnauthorizedException` when session invalid; no dedicated favorites DELETE auth test found |
| CSRF required on DELETE | VERIFIED | DELETE not in `CSRF_EXEMPT_PATHS`; existing favorites tests use `csrf_headers()` |

---

## Architecture Contract

Expected request lifecycle after implementation:

```text
HTTP DELETE /favorites/{property_id}
  → CSRF middleware (unchanged)
  → FastAPI router remove_favorite()
  → Depends(get_current_user) (unchanged)
  → favorite_service.remove_from_favorites(db, user_id, property_id)
  → favorite_repository.get_favorite(db, user_id, property_id)
  → Favorite absent
  → NotFoundException("Favorite not found")
  → not_found_exception_handler
  → HTTP 404 JSON { success: false, message: "Favorite not found" }
```

**Why service layer, not router or frontend:**

Rento places domain/error semantics in services (`favorite_service.add_to_favorites()` already raises `NotFoundException` for missing property per TASK-004). Routers delegate without embedding HTTP status decisions. Frontend consumes API responses generically (`FavoritesContext` already treats non-success as error). Changing exception type in the service preserves architecture boundaries and reuses the global handler contract.

---

## Database Contract

| Item | Expected |
|------|----------|
| Schema change | NO |
| Alembic migration | NO |
| Data mutation on missing Favorite DELETE | NO |
| Data mutation on valid DELETE | Existing delete behavior only |

The missing-favorite path currently performs a lookup only and must continue to perform no write/delete operation.

---

## Auth / Security Contract

| Area | Contract |
|------|----------|
| Authentication | UNCHANGED |
| Authorization / ownership | UNCHANGED — lookup scoped to authenticated `user_id` |
| CSRF | UNCHANGED — mutating DELETE remains CSRF-protected |
| Session behavior | UNCHANGED |
| Information disclosure | No new cross-user enumeration beyond existing Favorite lookup scoped to current user; 404 message remains generic |

No security ambiguity requiring silent workaround was found for this bounded change.

---

## Deployment Contract

| Component | Expected |
|-----------|----------|
| Runtime scope | BACKEND_ONLY |
| Backend rebuild/recreate | YES (later, under separate DEPLOY authorization) |
| Frontend | NO |
| Database | NO |
| nginx | NO |
| Migration | NO |

Production deployment is **NOT** authorized by task definition alone.

---

## Proposed Change

In `backend/app/services/favorite_service.py`, change the missing-Favorite branch in `remove_from_favorites()`:

```python
# CURRENT
raise BadRequestException("Favorite not found")

# TARGET
raise NotFoundException("Favorite not found")
```

No router, repository, handler, schema, or frontend changes expected.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | No schema/data contract change |
| Authentication | NONE | Unchanged |
| Authorization | LOW / NONE | Unchanged ownership lookup |
| API compatibility | LOW but **NON-ZERO** | Any client depending on HTTP **400** for missing Favorite DELETE will observe **404** instead; semantically intended |
| Production | LOW | Single-line service change; backend-only deploy |
| Rollback | LOW | Revert exception type and redeploy prior backend image |
| Accidental scope expansion | LOW | Explicit out-of-scope guard for favorite policy/list/auth |
| Observability signal shift | LOW | Failure signal category may change from `bad_request` to `not_found` for this path |

---

## Acceptance Contract

Objective acceptance criteria:

| Case | Request / precondition | Expected result |
|------|------------------------|-----------------|
| **A — valid DELETE** | Authenticated user; Favorite relation exists for `{user_id, property_id}` | HTTP **200**; `{ "success": true, "message": "Favorite removed" }`; Favorite row removed |
| **B — missing Favorite DELETE** | Authenticated user; valid or invalid `property_id`; **no** Favorite relation for current user | HTTP **404**; `{ "success": false, "message": "Favorite not found" }`; no DB mutation |
| **C — unauthenticated** | No valid session | Existing authentication rejection unchanged (expected HTTP **401** per current auth stack — INFERRED) |
| **D — duplicate POST** | Authenticated user; Favorite already exists | HTTP **400**; `"Property already in favorites"` |
| **E — POST nonexistent property** | Authenticated user; property row absent | HTTP **404**; `"Property not found"` (TASK-004 preserved) |
| **F — ownership isolation** | User B cannot delete User A's Favorite via User B session | Existing isolation preserved; User B missing relation → HTTP **404** under new contract |

---

## Test Contract

### Primary RED / GREEN regression

**Test concept:** `test_remove_missing_favorite_returns_404`

**Setup:**

- seed authenticated user
- seed valid property (Favorite **not** created)
- login + CSRF headers

**Action:**

```text
DELETE /favorites/{property_id}
```

**Baseline (current code — expected RED before fix):**

- `response.status_code == 400`
- `response.json()["message"] == "Favorite not found"`

**Post-fix (expected GREEN):**

- `response.status_code == 404`
- `response.json()["success"] is False`
- `response.json()["message"] == "Favorite not found"`

**Preferred location:** extend `backend/tests/test_favorites_nonexistent_property.py` using existing helpers.

### Regression suite to rerun after implementation

Targeted first:

```bash
pytest backend/tests/test_favorites_nonexistent_property.py -v
pytest backend/tests/test_favorites_archived_properties.py -v
```

Broader favorites-related safety net if time permits:

```bash
pytest backend/tests/test_favorites_nonexistent_property.py backend/tests/test_favorites_archived_properties.py -v
```

Key existing tests that must remain PASS:

| Test | Preserves |
|------|-----------|
| `test_add_favorite_nonexistent_property_returns_404` | CASE E |
| `test_add_duplicate_favorite_preserves_400` | CASE D |
| `test_add_valid_favorite_returns_201` | POST create unchanged |
| `test_delete_archived_favorite_removes_relation` | CASE A on archived listing |
| `test_get_favorites_returns_only_current_user_visible_favorites` | CASE F list isolation |

Implementation must not be executed during task definition.

---

## Verification Plan

Future verification stages (separate gate approvals):

1. **Baseline proof** — primary test fails for expected reason: actual **400**, expected **404**.
2. **Implementation proof** — primary test PASS after bounded service change.
3. **Valid DELETE regression** — archived favorite delete remains HTTP **200**.
4. **Duplicate POST regression** — remains HTTP **400**.
5. **Nonexistent property POST regression** — remains HTTP **404**.
6. **Authentication regression** — unauthenticated DELETE behavior unchanged (manual or future dedicated test if added within scope only if needed to prove CASE C).
7. **Favorites targeted suite** — both favorites test modules PASS.
8. **Static checks** — run repository backend lint/static checks if available for touched paths.
9. **Diff review** — confirm only intended service + test files changed; no migration/frontend/docker drift.
10. **Production smoke (later)** — under separate DEPLOY / PRODUCTION ACCEPTANCE authorization: authenticated DELETE on non-favorited property returns HTTP **404**.

**Proof question for every stage:** How do we prove the contract changed only on missing Favorite DELETE and nowhere else?

Answer: compare targeted test matrix above + diff scope + unchanged POST/GET favorites behavior.

---

## Rollback Impact

**Application rollback:**

- Revert service exception change to prior commit / redeploy previous backend image per current Rento deployment procedure.

**Database rollback:**

- NOT REQUIRED — no migration or data transformation introduced.

**Behavior after rollback:**

- missing Favorite DELETE: **404 → previous 400**
- valid DELETE and all other favorites behavior: unchanged from pre-TASK-006 state

No database recovery procedure is required.

---

## Definition of Done

TASK-006 is **not** complete merely because one line changes.

Done requires all applicable items:

1. Contract documented in this task file.
2. Baseline RED reproduced and recorded.
3. Implementation bounded to in-scope files only.
4. Primary regression test PASS.
5. Relevant favorites regression tests PASS.
6. Diff reviewed for scope hygiene.
7. Commit created under separate COMMIT authorization.
8. Backend-only deployment performed under separate DEPLOY authorization.
9. Production behavior verified under separate PRODUCTION ACCEPTANCE authorization.
10. Rollback posture confirmed (backend image revert only).
11. Production acceptance PASS recorded.
12. Closure completed.
13. Archive completed.

Approval of one stage does not approve later stages.

---

## Implementation Result

**Date:** 2026-08-16

**Files touched:**

| File | Change |
|------|--------|
| `backend/app/services/favorite_service.py` | Missing Favorite branch: `BadRequestException` → `NotFoundException` |
| `backend/tests/test_favorites_nonexistent_property.py` | Added `test_remove_missing_favorite_returns_404` |

**Semantic change:**

```python
# remove_from_favorites() missing Favorite branch
raise NotFoundException("Favorite not found")  # was BadRequestException
```

**Unchanged by design:** router, repository, models, schemas, handlers, frontend, auth, CSRF, message text.

**RED evidence:**

| Field | Value |
|-------|-------|
| Test | `test_remove_missing_favorite_returns_404` |
| Command | `python -m pytest tests/test_favorites_nonexistent_property.py::test_remove_missing_favorite_returns_404 -v` |
| Expected | HTTP **404** |
| Actual (baseline) | HTTP **400** |
| Failure | `assert 400 == 404` |
| RED result | PASS — defect reproduced |

Observed baseline response body: `{ "success": false, "message": "Favorite not found" }` with status **400**. Observability signal: `failure_class=bad_request`.

**GREEN evidence:**

| Field | Value |
|-------|-------|
| Test | `test_remove_missing_favorite_returns_404` |
| Command | same as RED, after fix |
| Result | PASS |
| HTTP status | **404** |
| Response message | `"Favorite not found"` |
| Response success | `false` |

Missing-Favorite path performs no repository delete — `delete_favorite()` remains unreachable when lookup returns no row.

---

## Final Verification

**Commands executed (backend cwd):**

```bash
python -m pytest tests/test_favorites_nonexistent_property.py::test_remove_missing_favorite_returns_404 -v   # RED then GREEN
python -m pytest tests/test_favorites_nonexistent_property.py -v
python -m pytest tests/test_favorites_archived_properties.py -v
python -m compileall app/services/favorite_service.py tests/test_favorites_nonexistent_property.py -q
```

**Regression matrix:**

| Contract | Test evidence | Result |
|----------|---------------|--------|
| A — valid DELETE | `test_delete_archived_favorite_removes_relation` | PASS (HTTP **200**) |
| B — duplicate POST | `test_add_duplicate_favorite_preserves_400` | PASS (HTTP **400**) |
| C — POST nonexistent property | `test_add_favorite_nonexistent_property_returns_404` | PASS (HTTP **404**) |
| D — archived favorite behavior | full `test_favorites_archived_properties.py` (7 tests) | PASS |
| E — current-user isolation | `test_get_favorites_returns_only_current_user_visible_favorites` | PASS |
| F — auth/CSRF on DELETE | existing tests use `login_user` + `csrf_headers`; no dedicated unauthenticated DELETE test | NOT APPLICABLE — no dedicated test; CSRF path exercised by new DELETE test |

**Favorites suite totals:**

| Module | Passed | Failed | Skipped |
|--------|--------|--------|---------|
| `test_favorites_nonexistent_property.py` | 4 | 0 | 0 |
| `test_favorites_archived_properties.py` | 7 | 0 | 0 |
| **Total favorites tests** | **11** | **0** | **0** |

**Diff hygiene:**

- Only `favorite_service.py` (1 line) and `test_favorites_nonexistent_property.py` (+17 lines) modified in application code.
- `git diff --check`: clean.

**Quality checks:**

- `python -m compileall` on modified files: PASS
- No established project ruff/flake8/mypy/pyright command found for routine backend gate beyond pytest.

**Security / data boundary (post-implementation):**

| Check | Result |
|-------|--------|
| Database schema changed | NO |
| Migration | NO |
| Authentication changed | NO |
| Authorization logic changed | NO |
| CSRF changed | NO |
| Frontend changed | NO |
| Missing-Favorite DB mutation | NO |
| API delta | ONLY missing Favorite DELETE: **400 → 404**, message unchanged |

---

## Commit

| Field | Value |
|-------|-------|
| SHA | `dec96016f8464f04c5f884f5075d2e5f58d3bc6a` |
| Message | `fix(favorites): return 404 when favorite is missing` |

---

## Production Result

**Date:** 2026-08-16
**PRODUCTION_ACCEPTANCE:** **PASS**

### Deployment

| Field | Value |
|-------|-------|
| DEPLOYED_SHA | `dec96016f8464f04c5f884f5075d2e5f58d3bc6a` |
| Deployment scope | BACKEND_ONLY |
| Backend rebuilt | YES |
| Backend recreated | YES |
| Frontend recreated | NO |
| Database restarted | NO |
| Nginx recreated | NO |
| Migration | NONE |
| Post-deploy backend image | `sha256:fdc6ed9d0dafb07edb4282ea60ec544057f25971daaff901546a6630c5cc1e3d` |

### Final accepted API contract

Rento-specific decision (not a universal REST rule):

```text
DELETE /favorites/{property_id}
authenticated user
+ Favorite relation absent
→ HTTP 404
→ { "success": false, "message": "Favorite not found" }
```

Preserved contracts (local regression; not re-mutated in production):

| Case | Contract |
|------|----------|
| Valid Favorite DELETE | HTTP **200** |
| Duplicate POST favorite | HTTP **400** |
| POST nonexistent property | HTTP **404** (TASK-004) |

### Primary production contract

| Check | Result |
|-------|--------|
| Acceptance identity | `acceptance@rentonow.ro`, user id `27`, `role=user` (OPS-001) |
| Credentials exposed | **NO** |
| Selected property | id `3`, exists, `available` |
| Favorite rows before | **0** |
| `DELETE /api/favorites/3` | HTTP **404** |
| Response | `{ "success": false, "message": "Favorite not found" }` |
| Favorite rows after | **0** |
| Favorite mutation | **NO** (`before = 0`, `after = 0`) |
| HTTP 500 | **NO** |
| IntegrityError | **NO** |
| Traceback | **NO** |
| Unexpected exception | **NO** |
| Observability | `failure_class=not_found`, `status_code=404` |

### Authenticated session flow

| Step | Result |
|------|--------|
| Login | **PASS** |
| Session | **PASS** |
| Logout | **PASS** |
| Post-logout `GET /api/favorites/` | **401** |

### Runtime (post-acceptance)

| Service | Result |
|---------|--------|
| backend | healthy |
| frontend | healthy |
| db | healthy |
| nginx | healthy |
| backend RestartCount | **0** |
| `https://rentonow.ro/api/` | **200** |

### Rollback posture

| Field | Value |
|-------|-------|
| Tag | `rento-backend:rollback-aa7bca6` |
| Immutable image | `sha256:78d43a404a7eff11aae857fe2107b94f31b1c880abd1da1b0ee7f8a586a25090` |
| Still valid after deploy/acceptance | **YES** |
| Naming | Historically imprecise (`aa7bca6` is not the backend release SHA); immutable ID matches the pre-deploy running backend |

Do not remove or retag this artifact during closure.

---

## Follow-up

Possible separate future tasks (not part of TASK-006):

- Pending property favorite policy review
- Admin/realtor collection pagination bounds
- Public filter cross-field `min_price <= max_price` validation

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               ← completed
IMPLEMENTATION          ← completed
VERIFICATION            ← completed
COMMIT                  ← completed (dec9601)
PUSH                    ← completed
DEPLOY                  ← completed (BACKEND_ONLY, PASS)
PRODUCTION ACCEPTANCE   ← completed (PASS)
CLOSED                  ← current stage
ARCHIVE                 ← NOT YET (separate authorization)
```

**Next gate:** ARCHIVE authorization (separate). Do not create TASK-007 in this document.
