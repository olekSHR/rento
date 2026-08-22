# TASK-020 — Home Price Range Filter Validation

| Field | Value |
|-------|-------|
| ID | TASK-020 |
| TITLE | Home Price Range Filter Validation |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Frontend UX / public home search filter correctness |

> STATUS: CLOSED means definition, implementation, local verification, commit, push, deployment preflight, rollback preservation, FRONTEND_ONLY deployment, production acceptance, and closure documentation are complete and recorded. Production acceptance result is **PASS** with documented observability limitations (see Production Acceptance Evidence and Accepted Limitations). Archive is **NOT YET** performed.

**Lifecycle (updated 2026-08-22):**

| Stage | State |
|-------|-------|
| Next-increment discovery | COMPLETE |
| Definition | COMPLETE |
| Implementation | COMPLETE |
| Local Verification | COMPLETE |
| Commit / Push | COMPLETE — `e1140b4` |
| Deployment Preflight + Deploy | COMPLETE — FRONTEND_ONLY |
| Production Acceptance | PASS — `TASK_020_PRODUCTION_ACCEPTANCE_PASS` |
| Closure | COMPLETE |
| Archive | NOT YET PERFORMED |

**Initiative reference:** Post TASK-019 (CLOSED + ARCHIVED + COMPLETE) discovery selected **Home Price Range Filter Validation** over admin lifecycle server filters, viewing-request discoverability, authenticated auth-page redirect, rental documents hub, and residual visual debt.

**Repository baseline at definition (VERIFIED 2026-08-22):**

| Field | Value |
|-------|-------|
| HEAD | `38c2513b376bf502a766a9882509e01206297af3` |
| origin/main | `38c2513b376bf502a766a9882509e01206297af3` |
| divergence | `0 0` |
| Worktree before this document | clean |
| Active tasks before creation | `docs/engineering/tasks/README.md` only |
| Prior task | TASK-019 — CLOSED + ARCHIVED + COMPLETE |
| TASK-020 identifier | free (historical `TASK-020 created: NO` mentions in archived TASK-019 are not a collision) |

**Production note:** Production application deployed at TASK-020 implementation SHA `e1140b4326262ba7656811114e397aaa82fabf26` — **INFERRED** (frontend image/container identity; no immutable Git SHA label on Docker image). Repository commits after deployment may include docs-only closure for TASK-020; that is **not** runtime production drift.

---

## Product Problem

Public home search lets renters filter listings by `min_price` and `max_price`. Backend correctly rejects inverted ranges with HTTP **422** (TASK-007). Frontend still forwards any min/max pair without comparison.

When both bounds are present and `min_price > max_price`, home SSR calls `getProperties()`, receives 422, throws, and the route falls through to generic `error.tsx` (“Something went wrong”) instead of a recoverable filter error.

This breaks the primary renter browse journey for an easy user mistake and for invalid deep-links such as `/?min_price=5000&max_price=1000`.

---

## User

**Renter** (and any visitor using home filters).

---

## Evidence (VERIFIED 2026-08-22)

| Layer | Finding |
|-------|---------|
| `frontend/components/FiltersBar.tsx` | `handleSearch()` writes `min_price` / `max_price` to URL with no cross-field check (L57–63) |
| `frontend/app/(consumer)/page.tsx` | Server component passes search params directly to `getProperties()` (L41–46) |
| `frontend/services/api.ts` | `getProperties()` throws on non-OK responses (L105–108) |
| `frontend/app/error.tsx` | Generic fatal error UI for thrown SSR errors |
| `backend/app/routers/properties.py` | Cross-field validation: `min_price > max_price` → 422 |
| `backend/tests/test_property_list_filter_validation.py` | Inverted range returns 422 |
| TASK-007 archive | Backend contract locked; frontend UX explicitly OUT OF SCOPE |

---

## Current Behavior

1. User enters min price greater than max price in Filters modal and applies.
2. URL updates with both params.
3. Home SSR fetches properties.
4. Backend returns **422**.
5. Fetch throws → Next.js error boundary → generic “Something went wrong”.
6. Same failure path for direct invalid URL without using the modal.

Valid ranges and single-sided bounds (`min` only or `max` only) behave normally.

---

## Expected Behavior

Smallest useful improvement:

1. **Prevent** inverted ranges at filter submit when both numeric bounds are present.
2. Show a **clear inline validation message** in the filters UI (not a route-level crash).
3. **Do not navigate** to an invalid query when client validation fails.
4. For invalid filter URLs already in the address bar, **avoid SSR crash** — show recoverable empty/filter-error state and keep filters editable.
5. Preserve existing backend **422** contract unchanged.

---

## Selected Solution

**Frontend-only client validation + safe SSR handling for invalid URL params.**

| Area | Change |
|------|--------|
| `FiltersBar` | Before `router.push`, when both min and max are numeric, require `min <= max`; show inline error; block navigation |
| Home page | Before calling `getProperties()`, detect invalid inverted pair in `searchParams`; skip API call; render recoverable filter-error/empty state with existing filter UI |
| Backend | **No change** |

Do not rewrite filter architecture, chip system, or backend validation.

---

## Alternatives Rejected

| Alternative | Reason |
|-------------|--------|
| Backend revert to 200 + empty list | Violates TASK-007 locked contract |
| New backend error code/shape | Unnecessary; 422 already correct |
| Global API error middleware | Over-broad for one filter case |
| Admin lifecycle server-side status filter (TASK-019 follow-on) | Real at scale but not user-visible now; production inventory ≈ 3 listings; FULLSTACK; accepted limitation |
| Auth-page redirect for logged-in users | Low harm polish; does not fix browse crash |
| Viewing-request BottomNav item | Discoverability only; feature reachable via Profile |
| Rental documents hub | Relationship-scoped model is intentional; disproportionate scope |

---

## IN

- Client-side inverted-range validation in `FiltersBar`
- Inline user-visible validation copy for inverted min/max
- Home SSR guard for invalid price params in URL (no throw / no generic error page)
- Recoverable UI state when URL contains invalid range
- Preserve valid filter behavior (city, rooms, single-sided price bounds)
- Frontend lint / typecheck / build verification

---

## OUT

- Backend API or validation changes
- Filter chip redesign
- URL sync architecture refactor
- Admin lifecycle server filters / pagination UI
- Viewing-request navigation redesign
- Auth-page guest redirect
- Documents hub
- DB migration
- Dependency changes

---

## Runtime Scope Hypothesis

| File | Modify | Reason |
|------|--------|--------|
| `frontend/components/FiltersBar.tsx` | **YES** | Block invalid submit; inline error |
| `frontend/app/(consumer)/page.tsx` | **YES** | Guard invalid URL params before SSR fetch |
| Other runtime files | **NO** unless review finds unavoidable shared helper (prefer inline, minimal) |

**Expected runtime files: 2.**

---

## Protected Behavior

| Area | Must remain unchanged |
|------|----------------------|
| Backend `GET /properties/` contract | 422 when `min_price > max_price` |
| Valid filter queries | Same results as today |
| Filters modal fields | city, min, max, rooms semantics |
| Property card/list rendering | Unchanged for valid data |
| Admin/realtor/auth flows | Untouched |

---

## API / DB / Auth Impact

| Area | Impact |
|------|--------|
| API contract | **NONE** (frontend adapts to existing 422) |
| DB | **NONE** |
| Auth | **NONE** |

---

## Test Plan

| Check | Method |
|-------|--------|
| Inverted min/max in modal blocked | Manual / component behavior |
| Inline error visible; no navigation | Manual |
| Valid range still searches | Manual |
| Min-only / max-only unchanged | Manual |
| Direct URL `/?min_price=5000&max_price=1000` no crash | Manual browser |
| Invalid URL shows recoverable state | Manual |
| `npm run lint`, `typecheck`, `build` | CI-local commands |

No new backend tests required unless implementation accidentally touches backend (not authorized).

---

## Acceptance Criteria

1. Submitting inverted min/max in FiltersBar does not change the URL.
2. User sees specific validation feedback (not generic route error).
3. Valid price ranges behave as before.
4. Single-sided price bound (min only or max only) behaves as before.
5. Direct invalid price URL does not trigger generic `error.tsx`.
6. Invalid URL state is recoverable (user can adjust filters and retry).
7. Backend 422 contract for inverted range remains unchanged.
8. No unrelated runtime files changed.
9. Frontend lint, typecheck, and build pass.

---

## Deployment Classification

| Component | Expected |
|-----------|----------|
| Classification | **FRONTEND_ONLY** |
| Backend | NO |
| DB migration | NONE |
| Nginx / Docker / dependencies | NO |

---

## Risk

**LOW**

| Risk | Mitigation |
|------|------------|
| Over-validation blocking edge cases | Only compare when both bounds parse as positive numbers |
| SSR/client mismatch | Keep rule identical in FiltersBar and page guard |
| Hiding real API failures | Guard only inverted-range case; other errors unchanged |

---

## Rollback Implications

Revert frontend validation/guard. Backend unchanged. No data rollback.

---

## Production Data Impact

**NONE.** Read-only filter UX change.

---

## Known Limitations

1. Does not add filter chips or broader home filter UX polish.
2. Does not fix admin lifecycle client-side filtering over first 100 listings (separate, scale-dependent issue).
3. Does not improve viewing-request global discoverability.
4. Client validation can be bypassed only by manual URL crafting — home page guard covers that path.

---

## Implementation Authorization

**YES — implementation gate completed; commit/push NOT authorized**

```text
TASK_020_IMPLEMENTATION_VERIFIED
Next:
READY_FOR_TASK_020_COMMIT_AND_PUSH
```

---

## Implementation Evidence (2026-08-22)

### Baseline at implementation start (VERIFIED)

| Field | Value |
|-------|-------|
| HEAD | `38c2513b376bf502a766a9882509e01206297af3` |
| origin/main | `38c2513b376bf502a766a9882509e01206297af3` |
| divergence | `0 0` |
| Worktree before runtime edits | `?? docs/engineering/tasks/TASK-020-home-price-range-filter-validation.md` only |

### Defect reproduction (VERIFIED from code path before fix)

| Path | Chain |
|------|-------|
| Interactive | `FiltersBar.handleSearch()` pushed inverted min/max to URL → home SSR `getProperties()` → backend 422 → `api.ts` throw → generic `error.tsx` |
| Direct URL | `/?min_price=1000&max_price=500` → same SSR chain |
| Backend | HTTP **422** — `min_price must be less than or equal to max_price` (`backend/app/routers/properties.py` L70–84) |
| Frontend before fix | Generic “Something went wrong” error boundary |

### Authoritative validity rule (aligned with backend)

| Case | Rule |
|------|------|
| Both bounds present as positive integers | Require `min_price <= max_price` |
| Equal values (`500` / `500`) | Valid |
| Min only | Valid — unchanged |
| Max only | Valid — unchanged |
| Empty / non-parsing values | Not compared (non-numeric URL values remain OUT OF SCOPE) |

Parsing mirrors backend `Query(ge=1)` intent: positive integers only (`>= 1`).

### Selected recovery behavior

| Layer | Behavior |
|-------|----------|
| `FiltersBar` | Block `router.push` when inverted; show inline `role="alert"` message; `aria-invalid` on price inputs; clear error on edit or clear |
| Home SSR (`page.tsx`) | Detect inverted pair before `getProperties()`; skip API call; render recoverable “Invalid price range” state; preserve filter chips and modal access |

Both layers use identical rule: compare only when both values parse as positive integers and reject when `min > max`. No silent swap or discard.

### Actual runtime files changed

| File | Change |
|------|--------|
| `frontend/components/FiltersBar.tsx` | Client validation + inline error |
| `frontend/app/(consumer)/page.tsx` | SSR guard + recoverable invalid-range UI |

No third runtime file required. Validation helpers duplicated minimally in both files to stay within 2-file scope.

### Tests

No existing FiltersBar/search-param test infrastructure found. **No test files changed.**

### Frontend verification

| Check | Result |
|-------|--------|
| `npm run lint` | PASS (0 errors; 4 pre-existing `<img>` warnings in unrelated files) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |

### Local functional verification

| Check | Result |
|-------|--------|
| Interactive inverted range | Static/code verified — submit blocked before navigation; **NOT DIRECTLY OBSERVED** (no browser automation in commit gate) |
| Direct inverted URL | **PASS — locally observed** (`GET /?min_price=1000&max_price=500` → HTTP 200, “Invalid price range” rendered, no “Something went wrong”) |
| Backend on inverted URL | **PASS — locally observed** — no `GET /properties/?min_price=1000&max_price=500` in backend access log |
| Valid range (`500`/`1000`) | **PASS — locally observed** — HTTP 200, backend `GET /properties/?min_price=500&max_price=1000` 200 OK |
| Equal (`500`/`500`) | **PASS — locally observed** — HTTP 200, backend 200 OK |
| Min only / max only | **PASS — locally observed** — HTTP 200, backend 200 OK |
| Generic error boundary on inverted URL | **NO** — locally observed |

**Commit-gate smoke (2026-08-22):** local backend (`uvicorn` `:8099`, sqlite) + frontend (`next dev` `:3000`, `INTERNAL_API_URL=http://localhost:8099`). Direct URL regression cases observed via HTTP; interactive FiltersBar submit not directly observed (Browser MCP unavailable; no Playwright in project).

### Backend / API / auth

| Area | Changed |
|------|---------|
| `backend/` | NO |
| API contract | NO |
| Auth | NO |
| DB / migrations | NO |

### Diff review

| Check | Result |
|-------|--------|
| Runtime files | 2 (expected) |
| Backend files | 0 |
| `git diff --check` | PASS |
| Debug residue | None |

### Production acceptance

**PASS — 2026-08-22**

---

## Production Deployment Evidence (2026-08-22)

| Field | Value |
|-------|-------|
| Release candidate | `e1140b4326262ba7656811114e397aaa82fabf26` |
| Pre-deploy CURRENT_APP_SHA | `bcc4dd23ef8a7207ae55af7b56d008d2e23b4b73` — INFERRED |
| PRODUCTION_GIT_HEAD (post-deploy) | `e1140b4326262ba7656811114e397aaa82fabf26` — VERIFIED |
| CURRENT_APP_SHA (post-deploy) | `e1140b4326262ba7656811114e397aaa82fabf26` — INFERRED |
| Classification | FRONTEND_ONLY |
| Pre-deploy frontend image | `sha256:706c58484d08162d8b3f8fe90dcfbf45d563f7f6f688454a7c74ea65670ca492` |
| Post-deploy frontend image | `sha256:d068f8488fc9dd5e5dbdeeb8c540d1a7c8f6e385599f3bcfad26a41d386965ab` |
| Post-deploy frontend container | `a24d49aeb1bfb96292c1db996200dc2c5ecab8102b1b5edf0020154bf2507a11` |
| Backend | UNCHANGED — `sha256:91ed80a479dd57c378640564cec7f0cafaf71a4fbe3adc062c6faf43532787dd` |
| Rollback tag | `rento-frontend:rollback-bcc4dd2` → pre-TASK-020 frontend image |
| db / nginx | UNCHANGED, healthy |

Deployment steps: rollback preservation via `scripts/ops/rento-preserve-rollback-images.sh bcc4dd23…`, fetch + detached checkout of `e1140b4`, `docker compose build frontend` only, `docker compose up -d --no-deps frontend` only. Post-deploy HTTP smoke: `/`, valid range, inverted range, `/api/` all **200**. Inverted URL body contained recoverable copy; no generic crash text.

---

## Production Acceptance Evidence (2026-08-22)

### Production baseline (VERIFIED)

| Field | Value |
|-------|-------|
| PRODUCTION_GIT_HEAD | `e1140b4326262ba7656811114e397aaa82fabf26` (DETACHED_HEAD, clean worktree) |
| Frontend image | `sha256:d068f8488fc9dd5e5dbdeeb8c540d1a7c8f6e385599f3bcfad26a41d386965ab` |
| Frontend container | `a24d49aeb1bf…`, RC=0, healthy |
| Backend / db / nginx | UNCHANGED from TASK-019 deploy, all healthy, RC=0 |

### Direct URL acceptance (PRODUCTION VERIFIED)

| URL | HTTP | Result |
|-----|------|--------|
| `/?min_price=1000&max_price=500` | **200** | “Invalid price range” + “Minimum price cannot…” visible; “Something went wrong” **absent** |
| `/?min_price=500&max_price=1000` | **200** | “Matching your search”; normal browse |
| `/?min_price=500&max_price=500` | **200** | Valid — backend `GET /properties/?min_price=500&max_price=500` 200 OK |
| `/?min_price=500` | **200** | Valid — backend 200 OK |
| `/?max_price=1000` | **200** | Valid — backend 200 OK |

**Backend invalid inverted request sent:** **NO** — backend access log during acceptance contained valid-range requests only; no `GET /properties/?min_price=1000&max_price=500`.

### Interactive FiltersBar (classification)

| Check | Result |
|-------|--------|
| Inverted submit blocked | **NOT DIRECTLY OBSERVED IN PRODUCTION** |
| Inline validation message | **STATIC CONTRACT: VERIFIED** (deployed `FiltersBar.tsx`) |
| Valid submit after correction | **NOT DIRECTLY OBSERVED IN PRODUCTION** |
| Clear filters / error recovery | **STATIC CONTRACT: VERIFIED** |

**Reason:** browser automation/tooling unavailable. **Classification:** ACCEPTED VERIFICATION LIMITATION.

**Supporting evidence:** direct URL SSR guard production-verified; no production error/log evidence contradicting interactive contract; lint/typecheck/build PASS at implementation.

### Regression / health

| Area | Result |
|------|--------|
| Other filters (city, rooms) | No TASK-020 regression observed in page render/static contract |
| Backend | UNCHANGED — image/container identity preserved |
| Auth / DB / API | NO changes |
| Frontend logs | NO fatal/chunk/unhandled matches |
| Backend logs | NO TASK-020-attributable failures |
| HTTP smoke | `/`, inverted, valid, `/api/` all **200** |
| Rollback | `rento-frontend:rollback-bcc4dd2` intact; **not executed** |
| Business data mutation | **NONE** |

---

## Closure Summary

**Before:** An inverted home price range (`min_price > max_price`) could reach the backend via FiltersBar navigation or direct URL, trigger HTTP **422**, and turn the primary renter browse route into a generic “Something went wrong” error page.

**After:** FiltersBar blocks inverted submit with inline validation (static contract verified). Consumer SSR intercepts inverted URL params before `getProperties()`, rendering a recoverable “Invalid price range” state while preserving filter UI access. Backend validation contract unchanged.

**Production Acceptance:** **PASS**

**Accepted verification limitation:** Interactive FiltersBar submit was **not directly observed in production** (browser automation unavailable). Direct URL protection and all regression paths were production-verified.

```text
TASK_020_PRODUCTION_ACCEPTANCE_AND_CLOSURE_PASS
Next:
READY_FOR_TASK_020_ARCHIVE_AND_PUSH
```

---

## Mutation Statement (closure gate, 2026-08-22)

| Item | Value |
|------|-------|
| Runtime code changed | NO |
| Test code changed | NO |
| Task document changed | YES — STATUS VERIFYING → CLOSED; acceptance + closure evidence |
| Production accessed | YES — read-only acceptance |
| Business data mutated | NO |
| Deployment performed | NO |
| Closure commit created | YES — exactly 1 |
| Closure pushed | YES |
| Archive performed | NO |
| TASK-021 created | NO |

---

## Mutation Statement (implementation gate)

| Item | Value |
|------|-------|
| Runtime code changed | YES — 2 frontend files |
| Test code changed | NO |
| Task document changed | YES — status VERIFYING + evidence |
| Files staged | NO |
| Commit created | NO |
| Push performed | NO |
| Production accessed | NO |
| Production mutated | NO |
| TASK-021 created | NO |
