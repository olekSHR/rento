# TASK-003 — Public max price filter

| Field | Value |
|-------|-------|
| ID | TASK-003 |
| TITLE | Public max price filter |
| STATUS | CLOSED |
| RISK | LOW |

> STATUS: DISCOVERY means application code must not be modified. Discovery for this task is complete; separate IMPLEMENTATION authorization is required before code changes.

**Classification:** UX GAP

**Discovery reference:** TASK-003 candidate discovery (2026-08-13) — VERIFIED root cause: `max_price` was never implemented in the frontend filter pipeline.

---

## Problem

The public Filters modal exposes:

- City
- Min price
- Rooms

but does **not** expose Max price.

Backend `GET /properties/` already supports:

```text
max_price >= 1
```

(TASK-002 closed — router validation `Query(default=None, ge=1)` on `max_price`.)

However the current frontend:

- has no `max_price` field in `FilterValues`;
- has no local max-price state;
- does not read `max_price` from `searchParams`;
- does not forward `max_price` through `getProperties()`;
- does not include `max_price` in Apply/Clear flow;
- does not display `max_price` in active-filter summary/chips.

Manual `?max_price=...` therefore does not reach the backend through the frontend pipeline.

---

## Current Behavior

Public filter UI path:

```text
(consumer)/page.tsx
    ↓ activeFilters (city, min_price, rooms only)
HomePageContent.tsx
    ↓ Modal + FiltersBar initialValues
FiltersBar.tsx
    ↓ Apply → router.push('/?city&min_price&rooms')
page.tsx
    ↓ getProperties({ city, min_price, rooms })
api.ts
    ↓ GET /properties/?city&min_price&rooms   (no max_price)
```

| Layer | `max_price` today | Source |
|-------|-------------------|--------|
| Filters modal UI | absent | `frontend/components/FiltersBar.tsx` |
| `FilterValues` type | absent | `FiltersBar.tsx` |
| URL read (`searchParams`) | not read | `frontend/app/(consumer)/page.tsx` |
| URL write (Apply) | not written | `FiltersBar.tsx` → `handleSearch()` |
| API client | not forwarded | `frontend/services/api.ts` → `getProperties()` |
| Active filter chips | not shown | `(consumer)/page.tsx` |
| Backend router | supported `ge=1` | `backend/app/routers/properties.py` |
| Service / repository | supported | `property_service.py`, `property_repository.py` |

**Layout today (VERIFIED):** `FiltersBar` uses a two-column row — Min price (flex) | Rooms (fixed width). Max price is not present in JSX; this is not CSS/responsive hiding.

**Desktop vs mobile:** single Modal + `FiltersBar` for all viewports via `HomePageContent` / `BottomNav`.

**Git history (VERIFIED):** `git log -S "max_price"` on frontend filter files returns empty — `max_price` was never in the frontend pipeline.

**Manual URL (VERIFIED):**

| Action | Result |
|--------|--------|
| Navigate to `/?max_price=500` | Param may appear in address bar |
| Server page reads `max_price` | NO — only `city`, `min_price`, `rooms` passed to `getProperties()` |
| Backend receives `max_price` | NO |
| Re-open Filters modal | Max price not prefilled |
| Apply filters from UI | URL rebuilt without `max_price` |
| Active filter summary | No upper-price indicator |

---

## Target Behavior

1. Filters modal includes a **Max price** field.
2. Max price is **optional**.
3. When provided, value must be **>= 1** at the input level (consistent with Min price / Rooms).
4. Apply filters writes `?max_price=N` when the field is filled.
5. `page.tsx` reads `max_price` from `searchParams`.
6. `getProperties()` forwards `max_price` to the backend.
7. Re-opening Filters pre-fills `max_price` from active URL state.
8. Clear filters removes `max_price`.
9. Active filter summary displays an upper-price indicator, e.g. `up to €500`.
10. Existing City / Min price / Rooms behavior remains unchanged.

**Approved layout decision:**

```text
Price row:   Min price | Max price
Rooms:       separate row/control below (next logical row)
```

Reason:

- mobile-first modal is narrow;
- symmetric Min/Max pairing is clearer;
- avoids forcing three numeric fields into one row;
- preserves readable control widths.

Do **not** redesign the entire Filters modal.

---

## In Scope

1. Extend public filter UI and frontend query plumbing so `max_price` flows:

```text
Filters modal → URL → page.tsx → getProperties() → GET /properties/?max_price=N
```

2. Extend active-filter summary/chips to show upper bound when set.
3. Preserve existing City / Min price / Rooms behavior.
4. Apply approved layout: Min | Max price row + Rooms on separate row.
5. Record implementation and verification evidence in this task file through lifecycle gates.

**Expected files (implementation phase only — confirm necessity during implementation):**

| File | Expected change |
|------|-----------------|
| `frontend/components/FiltersBar.tsx` | `FilterValues`, state, Max price input, Apply/Clear URL, layout |
| `frontend/app/(consumer)/page.tsx` | `searchParams`, `getProperties()`, `activeFilters`, chip label |
| `frontend/services/api.ts` | `PropertySearchParams`, query string forwarding |
| `frontend/components/HomePageContent.tsx` | Only if required for `FilterValues` / `activeFilters` typing or key plumbing |

---

## Out of Scope

```text
backend max_price implementation
backend validation changes
min_price > max_price cross-field validation
new filter dimensions
sorting changes
generic filter refactor
URL architecture redesign
new state-management library
new UI library
frontend automated test harness creation
unrelated responsive redesign
service changes
repository changes
database / migrations
dependencies
Docker / Compose / nginx
deployment scripts
production access (unless separately authorized for acceptance)
```

If implementation appears to require any out-of-scope item: **STOP** and return to DISCOVERY.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend / Client | YES — filter UI, URL sync, API client, active-filter display |
| Backend Router / API | NONE — `max_price` already supported |
| Service | NONE |
| Repository | NONE |
| Database | NONE |
| Migration | NONE |
| Authentication | NONE |
| Authorization | NONE |
| Dependencies | NONE |
| Infrastructure / Production | NONE (frontend-only deploy if separately authorized) |

Reference map alignment: Presentation + client query composition only.

---

## Request / use-case lifecycle

```text
User opens Filters modal
    ↓
Sets Max price (optional, >= 1)
    ↓
Apply filters
    ↓
router.push('/?...&max_price=N')
    ↓
(consumer)/page.tsx reads searchParams.max_price
    ↓
getProperties({ ..., max_price })
    ↓
GET /properties/?...&max_price=N
    ↓
Existing backend validation (ge=1) + repository price <= max_price
    ↓
200 PropertyListResponse
```

| Impact | Result | Evidence |
|--------|--------|----------|
| DATA IMPACT | NONE | Read-only public listing filter |
| AUTHENTICATION IMPACT | NONE | Public read |
| AUTHORIZATION IMPACT | NONE | Public read |
| API CONTRACT IMPACT | NONE on backend | Uses existing `max_price` param |
| DATABASE IMPACT | NONE | No schema change |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Backend supports `max_price` with `ge=1` on `GET /properties/` | VERIFIED | `backend/app/routers/properties.py` → `get_properties()` |
| Repository applies `price <= max_price` | VERIFIED | `backend/app/repositories/property_repository.py` |
| Filters modal has City, Min price, Rooms only | VERIFIED | `frontend/components/FiltersBar.tsx` |
| `FilterValues` lacks `max_price` | VERIFIED | `FiltersBar.tsx` |
| `page.tsx` does not read/pass `max_price` | VERIFIED | `frontend/app/(consumer)/page.tsx` |
| `getProperties()` does not forward `max_price` | VERIFIED | `frontend/services/api.ts` |
| Active filter chips omit upper bound | VERIFIED | `(consumer)/page.tsx` |
| Manual `?max_price=...` does not reach backend via frontend | VERIFIED | Discovery trace |
| `max_price` never existed in frontend filter git history | VERIFIED | `git log -S "max_price"` on frontend filter files |
| Not CSS/responsive hiding — field absent from JSX | VERIFIED | `FiltersBar.tsx` grid layout |

---

## Proposed Change

**Smallest expected implementation:** mirror existing `min_price` plumbing for `max_price` across the four frontend files listed above.

### FiltersBar.tsx

- extend `FilterValues` with `max_price?: string`
- add `maxPrice` state; initialize from `initialValues?.max_price`
- add Max price input (`type="number"`, `min="1"`, optional)
- include `max_price` in Apply URL when filled
- reset `maxPrice` on Clear
- update layout: price row Min \| Max; Rooms on separate row

### page.tsx

- read `max_price` from `searchParams`
- pass `max_price` to `getProperties()`
- include `max_price` in `activeFilters` and `hasActiveFilters`
- add upper-price label/chip, e.g. `up to €{max_price}`

### api.ts

- extend `PropertySearchParams` with `max_price?: string`
- append `max_price` to backend query string when present

### HomePageContent.tsx

Change only if required for `FilterValues` typing, `hasActiveFilters`, or `FiltersBar` key — do not force a change if current propagation already works after type extension.

Do **not** refactor unrelated filter logic or modal structure.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Layout crowding on narrow modal | Approved Min \| Max row + Rooms separate row |
| Breaking existing City / Min / Rooms flows | Explicit regression in manual verification matrix |
| Accidental backend change | Out of scope; diff review |
| Cross-field min > max confusion | Out of scope; document as follow-up if needed |
| URL param dropped on Apply | Test re-open prefill and manual URL cases |

**RISK: LOW** — frontend-only; no data/auth/migration/backend contract change.

---

## Verification Plan

### Static (from `frontend/` — scripts in `package.json`)

```bash
npm run lint
npm run typecheck
npm run build
```

### Manual UI matrix

Verify filter combinations:

| Case | Expected |
|------|----------|
| City only | unchanged behavior |
| Min price only | unchanged behavior |
| Max price only | filters by upper bound |
| Rooms only | unchanged behavior |
| Min + Max | both params in URL and request |
| Min + Max + Rooms | all params present |
| Mobile/narrow modal | layout readable; Min \| Max + Rooms usable |
| Desktop modal | same modal path; layout readable |

### URL

| Check | Expected |
|-------|----------|
| Apply with Max price 500 | URL contains `max_price=500` |
| Reload / navigation | `max_price` preserved in URL |
| Re-open Filters modal | Max price prefilled with 500 |
| Clear filters | `max_price` removed from URL |

### Network / API

Confirm frontend request reaches:

```text
GET /properties/?...&max_price=N
```

Use browser devtools or equivalent local observation.

### Backend contract (no changes)

Existing TASK-002 behavior must remain:

| Case | Expected |
|------|----------|
| `max_price=0` (direct API) | 422 |
| Valid positive `max_price` | accepted |

Do not change backend semantics in this task.

### Diff hygiene (before success claim)

```bash
git status --short
git diff --stat
git diff --check
```

Review for unexpected files, backend changes, dependency changes.

---

## Rollback Impact

| Aspect | Impact |
|--------|--------|
| Rollback method | Revert frontend commit(s); redeploy frontend only |
| Data | NONE |
| Backend | unchanged — no rollback needed |
| User-visible | Filters revert to City / Min / Rooms only; manual `max_price` URL stops working again |

---

## Definition of Done

TASK-003 is **CLOSED** only when all applicable items are true:

1. **Scope held** — only in-scope frontend filter plumbing; no backend change.
2. **Target behavior** — `max_price` visible in Filters UI and flows UI → URL → API client → backend.
3. **Active filter display** — upper bound shown when set (e.g. `up to €500`).
4. **Re-open / prefill** — modal reflects active URL `max_price`.
5. **Clear** — removes `max_price` from URL and state.
6. **Existing behavior** — City, Min price, Rooms unchanged.
7. **Mobile layout** — approved Min \| Max + Rooms layout verified on narrow viewport.
8. **Verification** — `npm run lint`, `npm run typecheck`, `npm run build` PASS; manual matrix recorded.
9. **Diff hygiene** — no backend, migration, or unrelated changes.
10. **Deployment** — frontend deploy successful (if separately authorized).
11. **Production acceptance** — production behavior verified read-only (if deploy authorized).

Hard distinctions (per `DEFINITION_OF_DONE.md`):

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
```

---

## Implementation Result

**Implemented:** 2026-08-13

| File | Change |
|------|--------|
| `frontend/components/FiltersBar.tsx` | Extended `FilterValues` with `max_price`; added `maxPrice` state; Max price input; Apply/Clear URL wiring; layout Min \| Max row + Rooms below |
| `frontend/app/(consumer)/page.tsx` | Read `max_price` from `searchParams`; pass to `getProperties()` and `activeFilters`; active chip `up to €{max_price}` |
| `frontend/services/api.ts` | Extended `PropertySearchParams`; forward `max_price` in backend query string |
| `frontend/components/HomePageContent.tsx` | Include `max_price` in `hasActiveFilters` and `FiltersBar` remount key |

**Backend:** unchanged.

**Dependencies:** none added.

**Cross-field validation:** not added (`min_price > max_price` remains out of scope).

---

## Final Verification

**Static verification (frontend/, 2026-08-13):**

| Check | Command | Result | Exit code |
|-------|---------|--------|-----------|
| lint | `npm run lint` | PASS (0 errors; 4 pre-existing warnings in unrelated files) | 0 |
| typecheck | `npm run typecheck` | PASS | 0 |
| build | `npm run build` | PASS | 0 |

**Manual/runtime verification (local dev: Next.js `http://localhost:3000`, backend `http://127.0.0.1:8000`):**

| Case | Result | Evidence |
|------|--------|----------|
| Max only (manual URL `/?max_price=500`) | PASS | URL preserved; chip `up to €500`; backend log `GET /properties/?max_price=500` 200 |
| Min + Max (Apply UI + URL) | PASS | URL `?min_price=100&max_price=500`; chip `from €100 · up to €500`; backend log 200 |
| Full combination | PASS | URL `?city=Galati&min_price=100&max_price=500&rooms=2`; chip all four labels; backend log 200 |
| Clear | PASS | Clear navigates to `/`; active summary removed; filters button inactive |
| Manual URL prefill | PASS | Modal Max price = 500 on `/?max_price=500`; full combo prefills all fields |
| API request forwarding | PASS | Backend access logs show `max_price` in server-side `GET /properties/` requests |
| Active summary | PASS | `up to €500` shown independently; combines with min/city/rooms |
| Invalid backend contract (`max_price=0`) | PASS | Direct API `GET /properties/?max_price=0` → 422 (TASK-002 unchanged) |
| Desktop layout | PASS | Min \| Max row + Rooms below; labels readable |
| Mobile/narrow (~375 px) | PASS | Modal layout coherent; no overlap; Apply/Clear usable (screenshot captured) |

**Diff hygiene:**

```text
 M frontend/app/(consumer)/page.tsx
 M frontend/components/FiltersBar.tsx
 M frontend/components/HomePageContent.tsx
 M frontend/services/api.ts
?? docs/engineering/tasks/TASK-003-public-max-price-filter.md
```

No backend, `package.json`, or lockfile changes.

**Pending gates (completed):** COMMIT · PUSH · DEPLOY · PRODUCTION ACCEPTANCE

## Commit

| Field | Value |
|-------|-------|
| SHA | `aa7bca6ea5a163e8a2a7fa168c022346c48b0518` |
| Message | `feat(filters): add public max price filter` |

## Production Result

**PRODUCTION_ACCEPTANCE:** PASS

**Deployed application release (VERIFIED):**

| Field | Value | Evidence |
|-------|-------|----------|
| Candidate SHA | `aa7bca6ea5a163e8a2a7fa168c022346c48b0518` | production `git rev-parse HEAD` after deploy |
| Deploy scope | FRONTEND_ONLY | backend/nginx/db image + StartedAt unchanged |
| Pre-deploy frontend image | `sha256:d925419eca7e07a333334ecc5ab61ee2064b0b51f7d54f786318cf9ff5b3f96e` | docker inspect pre-deploy |
| Post-deploy frontend image | `sha256:6f959a71da230b51da29c31715e67752b49c01e8f5598c079255559266dda1ed` | docker inspect post-deploy |
| Rollback artifact | `rento-frontend:rollback-3e812bb` → `sha256:d925419eca7e…` | preserved pre-deploy |

**Production acceptance evidence (2026-08-13, `https://rentonow.ro`):**

| Case | Result | Evidence |
|------|--------|----------|
| Max only (`max_price=500`) | PASS | URL `?max_price=500`; chip `up to €500`; backend `GET /properties/?max_price=500` 200; modal prefill 500; reload persistence |
| Min + Max (`100` / `500`) | PASS | URL both params; chip `from €100 · up to €500`; backend log 200; prefill both |
| Full combination | PASS | URL `?city=Galati&min_price=100&max_price=500&rooms=2`; chip all four; backend log 200; modal prefills all fields |
| Filter result semantics | PASS | `max_price=500` excludes €750 listing; `max_price=200` shows only €100 listing |
| Manual URL `/?max_price=500` | PASS | searchParams read; API forwarded; prefill; active summary |
| Clear | PASS | Clear → `/`; max_price removed from URL/summary; backend `GET /properties/` without max_price |
| Existing Min price only | PASS | `/?min_price=100`; chip `from €100`; listings unchanged behavior |
| Existing Rooms only | PASS | `/?rooms=2`; chip `2+ rooms`; listings unchanged behavior |
| Backend validation `max_price=0` | PASS | `curl https://rentonow.ro/api/properties/?max_price=0` → **422** (TASK-002 contract intact) |
| Responsive mobile (~375 px) | PASS | Min \| Max row + Rooms readable; Apply/Clear usable |
| Responsive desktop | PASS | Same modal; labels/inputs readable |
| Runtime health | PASS | all services healthy; frontend logs clean (`Ready in 169ms`); no backend 500s on max_price requests |

**Remaining NOT VERIFIED:** none for TASK-003 scope.

**Backend / data impact:** NONE (frontend-only deploy; no migration; no intentional data mutation).

## Follow-up

Separate findings — do not expand this task:

- Cross-field behavior when `min_price > max_price` on `GET /properties/` (explicitly out of scope per TASK-002).
- Frontend automated test harness for Filters (out of scope).
- Additional filter dimensions (sort UI, etc.).

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY        (complete)
READY            (complete)
IMPLEMENTATION   (complete)
VERIFICATION     (complete — local)
READY_TO_DEPLOY  (complete)
COMMIT           (complete — aa7bca6)
PUSH             (complete)
DEPLOY           (complete — frontend-only)
PRODUCTION ACCEPTANCE (PASS — CLOSED)
```
