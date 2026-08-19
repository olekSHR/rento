# TASK-014 — Realtor Viewing Requests Operational Inbox

| Field | Value |
|-------|-------|
| ID | TASK-014 |
| TITLE | Realtor Viewing Requests Operational Inbox |
| STATUS | CLOSED |
| RISK | MEDIUM |
| CLASSIFICATION | Frontend operational inbox / viewing-request workspace content |

> STATUS: CLOSED means definition, implementation, local verification, commit, push, deployment, and production acceptance are complete and recorded, and closure documentation is complete. Production acceptance result is **PASS WITH FIXTURE LIMITATIONS** (see Production Fixture Limitations). Archive is **NOT YET** performed.

**Final lifecycle (VERIFIED 2026-08-19):**

| Stage | State |
|-------|-------|
| Definition | COMPLETE |
| Implementation | COMPLETE |
| Local Verification | PASS |
| Commit | COMPLETE |
| Push | COMPLETE |
| Deployment | PASS |
| Production Acceptance | PASS WITH FIXTURE LIMITATIONS |
| Closure | COMPLETE |
| Archive | NOT YET |

**Initiative reference:** Realtor Workspace Evolution — next bounded increment selected 2026-08-19 (`NEXT_REALTOR_WORKSPACE_DISCOVERY_COMPLETE`).

**Repository baseline at definition (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `447167718cf69e10325072d99e2a31c41b17926c` |
| origin/main | `447167718cf69e10325072d99e2a31c41b17926c` |
| divergence | `0 0` |
| Active tasks before creation | TASK-012 task file in `docs/engineering/tasks/` (archived copy also exists) |
| Prior task | TASK-013 — CLOSED / ARCHIVED / COMPLETE |

**Repository baseline at implementation (VERIFIED 2026-08-19):**

| Field | Value |
|-------|-------|
| HEAD | `447167718cf69e10325072d99e2a31c41b17926c` |
| origin/main | `447167718cf69e10325072d99e2a31c41b17926c` |
| divergence | `0 0` |
| Worktree | TASK-014 frontend changes + this task document (uncommitted) |

**Runtime note:** Production frontend runtime deployed at TASK-013 implementation SHA `3e13437c0185c2ad5e290e264925f050b43b2341`. Repository HEAD includes TASK-013 documentation closure/archive commits only. This is expected and must not be treated as deployment drift.

**Implementation authorization:** YES — IMPLEMENTATION + LOCAL VERIFICATION ONLY gate (2026-08-19). No commit/push/deploy/production access authorized.

---

## Problem

**User problem:** After TASK-013, the Realtor dashboard surfaces pending viewing-request workload (metrics, Requires Attention, Recent Pending) and links into `/realtor/viewing-requests`, but the inbox itself remains a **legacy dark feature without operational triage**. The dashboard → inbox transition is inconsistent: operational light dashboard promises efficient request handling; the inbox does not deliver it.

**Structural defects (VERIFIED from repository inspection — 2026-08-19):**

1. List page loads all statuses in one call — `getRealtorViewingRequests({ limit: 100 })` with **no `status` filter** despite API support (`frontend/app/realtor/viewing-requests/page.tsx`, `frontend/services/api.ts`).
2. **No status-filter navigation** — All / Pending / Accepted / Declined / Cancelled tabs absent.
3. **Realtor-facing pending copy is incorrect** — shared `getViewingRequestStatusLabel()` returns `"Waiting for realtor response"` for `pending` to both renter and realtor (`frontend/types/viewingRequest.ts:47–48`).
4. **Terminal states are dead-end cards** — `declined` and `cancelled` list items render no action and no detail link (`frontend/app/realtor/viewing-requests/page.tsx` — actions only for `pending` / `accepted`).
5. **List lacks stronger property context** — no property thumbnail on realtor list; renter list shows thumbnail (comparison: `frontend/app/viewing-requests/page.tsx`).
6. **Visual language conflicts with TASK-012/TASK-013** — list and detail use full-page dark/gold styling (`bg-[#1B1B1B]`, `#DFC58A`) inside light `RealtorWorkspaceShell`.
7. **`responded_at` available in API/types but not shown** on list (`ViewingRequestRealtor` includes field; UI ignores it).
8. **Operational inefficiency** — mixed-status flat list at scale; no default triage focus on pending work.

This task solves a **workflow gap**, not merely “change colors.” Visual alignment is required because it supports operational clarity inside the accepted Workspace direction, but the primary justification is triage and request-state navigation.

---

## Product Objective

Evolve `/realtor/viewing-requests` and `/realtor/viewing-requests/[id]` into an **operational inbox** inside the accepted light Realtor Workspace so a realtor can quickly:

- identify pending requests
- filter requests by status
- understand requester and property context
- navigate **every** request state to detail
- process pending requests (review, accept, decline)
- continue accepted relationships (detail + documents)
- review terminal states (declined/cancelled) read-only
- use the inbox comfortably on mobile

Deliver using **truthful existing data** and existing backend endpoints. Preserve TASK-012 shell, auth, and rental-documents behavior.

---

## Visual Direction (accepted — do not reopen)

TASK-014 operates **inside** the TASK-012 Workspace shell (unchanged):

- light SaaS content zone for list and detail page chrome
- white/light surfaces, Rento blue primary accents
- neutral zinc/slate borders, restrained shadows
- clear operational hierarchy, semantic status badges
- responsive/mobile-first layout within existing shell

Do **not** introduce a new visual language. Do **not** retain dark/gold on these pages merely because the legacy page used it. Do **not** reopen design-direction discovery.

Reuse existing light UI primitives: `frontend/components/ui/*` (`SectionCard`, `EmptyState`, `StatusBadge`, `PrimaryButton`, `SecondaryButton`).

---

## Current Behavior

### List — `/realtor/viewing-requests` (VERIFIED)

| Aspect | Current state |
|--------|---------------|
| File | `frontend/app/realtor/viewing-requests/page.tsx` |
| Theme | Full-page dark (`bg-[#1B1B1B]`, dark cards `#2D2D2D`) |
| Data load | `getRealtorViewingRequests({ limit: 100 })` on mount — no status param |
| Card fields | property title, requester email, created_at, status badge, optional message |
| Thumbnail | **Not shown** |
| `responded_at` | **Not shown** |
| Pending actions | Review (detail link), Accept, Decline (with `ConfirmDialog`) |
| Accepted actions | Manage relationship, Email renter (`mailto:`), Open property (if available) |
| Declined / cancelled | Card only — **no actions, no detail link** |
| Empty state | Generic inline text in dark card — not filter-specific |
| Nav context | Inside `RealtorWorkspaceShell`; Viewing Requests nav item exists |

### Detail — `/realtor/viewing-requests/[id]` (VERIFIED)

| Aspect | Current state |
|--------|---------------|
| File | `frontend/app/realtor/viewing-requests/[id]/page.tsx` |
| Theme | Dark page wrapper + shared `ViewingRequestRelationshipDetail` |
| Data load | `getRealtorViewingRequest(id)` |
| Actions | Accept/Decline duplicated from list (pending only) |
| Relationship UI | `ViewingRequestRelationshipDetail` with `role="realtor"` |
| Documents | `RentalDocumentsSection` embedded in relationship detail (accepted workflow) |
| Padding | Potential double padding — page `main` + component internal padding |

### Dashboard integration (TASK-013 — preserve, do not modify)

| Asset | Behavior |
|-------|----------|
| `DashboardRecentPendingRequests` | Read-only preview; links to detail |
| Dashboard metrics / attention | Uses pending `total`; links to inbox |
| Quick action “Review Viewing Requests” | Links to `/realtor/viewing-requests` when pending > 0 |

TASK-014 must **not** change dashboard components or metrics.

### TASK-012 infrastructure to reuse (VERIFIED)

| Asset | Path | Reuse |
|-------|------|-------|
| Auth + shell | `frontend/app/realtor/layout.tsx`, `RealtorWorkspaceShell.tsx` | **Do not modify** |
| Nav config | `frontend/lib/realtorWorkspace.ts` | Extend helpers only |
| Shared detail | `ViewingRequestRelationshipDetail.tsx` | Preserve behavior; minimal theme/copy only |
| Documents | `RentalDocumentsSection.tsx` | **Do not modify semantics** |
| Confirm | `ConfirmDialog.tsx` | Reuse for accept/decline |

**Frontend test infrastructure:** no `*.test.*` under `frontend/` (VERIFIED). Unit-test RED is **NOT APPLICABLE**.

---

## Target Behavior

Replace legacy dark inbox with a **light operational inbox**:

```text
[Page header — title, short description]
[Status tabs: All | Pending | Accepted | Declined | Cancelled]
[Filter-specific list OR empty state]
  └── cards: thumbnail, property context, requester, status, timestamps, message preview, status-appropriate actions
[ConfirmDialog for accept/decline when triggered from list]
```

Detail route preserves relationship + documents; page chrome aligns to light Workspace.

### Post-TASK-014 product state (explicit boundary)

```text
Operational viewing-request inbox: YES
Status filter tabs: YES
Default triage focus on Pending: YES
Realtor-specific status copy: YES
Terminal state detail navigation: YES
Light inbox/detail inside shell: YES
Dashboard changes: NOT IN THIS TASK
My Listings light migration: NOT IN THIS TASK
Scheduling / notifications / decline reason: NOT IN THIS TASK
Backend/API changes: NOT IN THIS TASK
Full pagination redesign: NOT IN THIS TASK
```

---

## Status Filter Contract

### Tabs

| Tab | API call | Notes |
|-----|----------|-------|
| **All** | `GET /realtor/viewing-requests?limit=100` | Omit `status` parameter |
| **Pending** | `GET /realtor/viewing-requests?status=pending&limit=100` | |
| **Accepted** | `GET /realtor/viewing-requests?status=accepted&limit=100` | |
| **Declined** | `GET /realtor/viewing-requests?status=declined&limit=100` | |
| **Cancelled** | `GET /realtor/viewing-requests?status=cancelled&limit=100` | |

Use existing `getRealtorViewingRequests({ status?, limit?, offset? })` wrapper. Do **not** fetch all requests and filter client-side when API supports status filtering.

### Default / primary triage behavior

**Default active tab on first load: Pending.**

This is an **intentional UX delta** from current behavior (which loads all statuses mixed). Rationale: TASK-013 operational dashboard centers pending workload; inbox default should match triage intent. User may switch to All or other tabs explicitly.

Deep-link behavior: navigating from dashboard “Review Viewing Requests” or recent-pending links may land on inbox default (Pending) or detail directly — existing detail links unchanged; inbox quick action opens `/realtor/viewing-requests` which will open on **Pending** tab by default.

### Tab counts strategy (bounded v1)

**Status tabs without global per-tab counts.**

Do **not** issue five parallel API calls solely to decorate tab badges.

The active filter response may display its own **`total`** when useful (e.g. “3 pending viewing requests” above list). That total is truthful for the **current filter only**, not a global inbox summary across all statuses.

Future enhancement trigger: product need for global tab counts with acceptable API cost.

---

## List Card Contract

Each card shows **only existing truthful fields** from `ViewingRequestRealtor`:

| Field | Source | Display rule |
|-------|--------|--------------|
| Property thumbnail | `property.image_url` | Show when present; placeholder/fallback when absent — no fake image |
| Property title | `property.title` | Required |
| Property city | `property.city` | Show when non-null |
| Requester email | `requester_email` | Required |
| Status | `status` | Badge with **realtor-specific label** (see Copy Contract) |
| Created | `created_at` | Formatted datetime |
| Responded | `responded_at` | Show when present and semantically useful (accepted/declined after response) |
| Message preview | `message` | Truncated preview when present; omit block when null/empty |

**Excluded (not available / not justified):** renter phone, appointment time, lead score, unread state, revenue, conversion probability, CRM fields.

---

## Copy Contract — Realtor-Specific Status Labels

Shared helper today: `getViewingRequestStatusLabel(status)` — renter-oriented pending copy.

**Required approach (smallest safe change):** extend helper to accept optional **role/context** parameter, e.g. `getViewingRequestStatusLabel(status, { role: "realtor" | "renter" })`, defaulting to renter behavior for backward compatibility.

| Status | Renter label (unchanged) | Realtor label (new) |
|--------|--------------------------|---------------------|
| `pending` | Waiting for realtor response | **Awaiting your response** |
| `accepted` | Accepted | Accepted |
| `declined` | Declined | Declined |
| `cancelled` | Cancelled | Cancelled |

Realtor list and detail must use realtor mapping. Renter pages must **not** regress.

Alternative (if role param is rejected during implementation review): realtor-only mapping function in `realtorWorkspace.ts` used only by realtor routes — document choice in implementation evidence.

---

## Action Contract

Actions are **status-specific**. No terminal-state dead ends.

| Status | Primary action | Secondary / optional | Destination |
|--------|----------------|----------------------|-------------|
| **Pending** | **Review** | Accept, Decline (may remain on list) | Detail `/realtor/viewing-requests/{id}`; accept/decline via existing API + `ConfirmDialog` |
| **Accepted** | **Manage relationship** | Email renter (`mailto:`), Open property (if `property.status === "available"`) | Detail; external mailto; public property |
| **Declined** | **View details** | — (read-only) | Detail |
| **Cancelled** | **View details** | — (read-only) | Detail |

### Pending accept/decline on list

**Preserved in v1** if current product value holds: inline Accept/Decline on list cards with existing confirm/error behavior. Do **not** redesign backend semantics. Do **not** add new action types.

List responsibility = **triage + navigation + bounded pending actions**. Detail responsibility = full relationship context (see below).

---

## List vs Detail Responsibility

| Layer | Responsibility | Must NOT |
|-------|----------------|----------|
| **List** | Status filter; card summary; triage navigation; optional pending accept/decline; filter-specific empty states | Document upload/download; full message thread; relationship management UI; mini dashboards per row |
| **Detail** | Full `ViewingRequestRelationshipDetail`; property context; status; accept/decline (pending); accepted workflow; **Rental Documents**; mailto/property links | Replace documents subsystem; change upload/archive/download rules |

Do **not** move document management into list cards.

---

## Detail Page Scope

Route: `/realtor/viewing-requests/[id]`

### May change

- Page chrome / wrapper to light Workspace alignment
- Remove obvious dark/gold mismatch on page-level skeleton/error/unavailable states
- Fix unnecessary or double padding between page and relationship component
- Realtor-facing status copy via shared/role-aware helper
- Preserve Viewing Requests nav active context
- Improve readability (spacing, typography within accepted tokens)

### Must preserve

- `ViewingRequestRelationshipDetail` core behavior and layout semantics
- Accept/decline flow and error handling
- `RentalDocumentsSection` — upload eligibility, access, archive, download unchanged
- Accepted-relationship rules and property availability messaging
- Backend authorization unchanged

**Rewrite rule:** Do **not** rewrite `ViewingRequestRelationshipDetail` unless minimal changes required for theme/copy compatibility. Prefer wrapping/light chrome at page level first.

---

## Documents Preservation (acceptance-critical)

TASK-014 is inbox/detail UX evolution, **not** Documents v2.

Must remain unchanged:

- Upload eligibility (realtor on accepted requests)
- Document list/access/download/archive semantics
- Party-based authorization
- PDF upload constraints
- Integration inside relationship detail

---

## Empty State Contract

Distinct truthful copy per active filter:

| Filter | Empty message (example) |
|--------|-------------------------|
| All | No viewing requests yet. |
| Pending | No pending viewing requests. |
| Accepted | No accepted viewing requests. |
| Declined | No declined viewing requests. |
| Cancelled | No cancelled viewing requests. |

Use light `EmptyState` or equivalent — not generic dark card text.

---

## Loading / Error Contract

| State | Requirement |
|-------|-------------|
| Initial load | Visible loading skeleton/spinner — not blank page |
| API error | Shown explicitly — **not** silently rendered as empty list |
| Action error (accept/decline) | Inline alert preserved; dialog dismiss rules unchanged |
| Filter change | Triggers reload for new filter; **no stale cards** from previous filter |
| In-flight actions | Disable duplicate submits; preserve existing `isWorking` patterns |

Do not introduce speculative global state-management architecture.

---

## Data Fetch Strategy

Single request per active filter:

```text
getRealtorViewingRequests({
  status?: "pending" | "accepted" | "declined" | "cancelled",  // omitted for All
  limit: 100,
  offset?: 0,   // optional; full pagination UI not required in v1
})
```

- **One request** when user selects a tab
- **No multi-filter prefetch**
- **No new backend endpoint**
- Re-fetch on tab change; optional re-fetch after accept/decline updates local item state (existing pattern may map-update or refetch active filter)

Detail: `getRealtorViewingRequest(id)` — unchanged.

---

## Known Limitation — 100-Item Cap

Current list uses `limit=100`. Backend supports pagination (`total`, `limit`, `offset`) but UI may ignore `total` today.

TASK-014 **does not** require full pagination redesign in v1. Status filtering reduces practical list size for Pending/Accepted/etc.

**Future trigger:** real realtor inbox approaches or exceeds 100 requests per status filter.

Document active-filter `total` when displayed — it is exact for that filter query, not a guarantee of global inbox size across all statuses without All-tab load.

---

## Responsive Contract

### Desktop (≥1024px)

- Page header + horizontal status tabs
- List grid: 1 column mobile, 2 columns `lg+` (preserve reasonable card width)
- Actions wrap cleanly; no horizontal overflow

### Mobile (~390px)

- Single-column cards
- **No horizontal viewport overflow**
- Status tabs horizontally scrollable if needed
- Touch targets ≥ practical mobile size (~44px / `min-h-11` convention)
- Title, email, message wrap safely
- Thumbnail fixed size — must not destroy content width
- `ConfirmDialog` remains bottom-aligned usable pattern
- TASK-012 mobile drawer **unaffected**

Do not redesign global mobile shell.

---

## In Scope

1. Light operational restyle of `/realtor/viewing-requests` list content.
2. Status filter tabs: All, Pending, Accepted, Declined, Cancelled — API-driven.
3. Default tab **Pending** on first load (documented UX delta).
4. List cards with property thumbnail, context, timestamps, message preview.
5. Realtor-specific status labels (role-aware helper or realtor mapping).
6. Status-appropriate actions including terminal **View details** links.
7. Filter-specific empty states.
8. Loading/error/filter-reload semantics.
9. Light alignment of `/realtor/viewing-requests/[id]` page chrome; minimal detail/copy fixes.
10. Helpers in `realtorWorkspace.ts` as needed (VR labels, date formatting reuse, filter types).
11. Optional focused components under `frontend/components/realtor/viewing-requests/` if justified.
12. Local verification: lint, typecheck, build, browser acceptance.

---

## Out of Scope

| Item | Status |
|------|--------|
| TASK-012 shell / layout / nav changes | OUT OF SCOPE |
| Dashboard / TASK-013 metric or recent-panel changes | OUT OF SCOPE |
| My Listings light migration | OUT OF SCOPE |
| Backend / database / migrations | OUT OF SCOPE |
| New or changed API endpoints | OUT OF SCOPE |
| Full pagination UI redesign | OUT OF SCOPE |
| Scheduling / calendar / appointment fields | OUT OF SCOPE |
| In-app messaging / message threads | OUT OF SCOPE |
| Notifications / email automation | OUT OF SCOPE |
| Decline reason / realtor message field | OUT OF SCOPE |
| Realtor-initiated cancel | OUT OF SCOPE |
| Renter phone / additional PII exposure | OUT OF SCOPE |
| CRM / lead scoring / analytics | OUT OF SCOPE |
| Rental Documents redesign | OUT OF SCOPE |
| Rental/property lifecycle rule changes | OUT OF SCOPE |
| New role or auth logic | OUT OF SCOPE |
| TASK-015 | OUT OF SCOPE |
| Production deployment | OUT OF SCOPE (separate gate) |

If implementation discovers backend changes are required: **STOP** and return to decision gate.

---

## Expected Implementation Surface

Likely files (expectation only — minimize component count):

| File | Expected change |
|------|-------------------|
| `frontend/app/realtor/viewing-requests/page.tsx` | Light inbox, filters, cards, empty/loading/error |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | Light page chrome, padding/copy fixes |
| `frontend/types/viewingRequest.ts` | Role-aware status labels |
| `frontend/lib/realtorWorkspace.ts` | VR inbox helpers (filter types, optional label wrapper) |
| `frontend/components/ViewingRequestRelationshipDetail.tsx` | **Minimal** theme/copy only if page wrapper insufficient |
| `frontend/components/realtor/viewing-requests/ViewingRequestListCard.tsx` | **new** — optional |
| `frontend/components/realtor/viewing-requests/ViewingRequestStatusTabs.tsx` | **new** — optional |

Expected **not** changed:

- `frontend/app/realtor/layout.tsx`
- `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx`
- `frontend/app/realtor/page.tsx` (dashboard)
- `frontend/components/realtor/dashboard/*`
- `backend/**`
- Database / migrations
- `RentalDocumentsSection.tsx` semantics

Do **not** force both new components if one page-local implementation is simpler.

---

## RED / Pre-Implementation Evidence

Valid RED is **structural absence** and browser-verifiable defects (no frontend unit-test infra):

| Evidence | Current state |
|----------|---------------|
| Status filter UI on realtor inbox | **FAIL** — absent |
| API `status` param used by list page | **FAIL** — not used |
| Default triage focus on pending | **FAIL** — all statuses mixed |
| Realtor pending status copy | **FAIL** — renter-oriented label |
| Terminal state detail navigation | **FAIL** — declined/cancelled dead-end |
| Light inbox inside Workspace shell | **FAIL** — dark full-page styling |
| Property thumbnail on realtor list | **FAIL** — absent |
| `responded_at` on list | **FAIL** — absent |
| Dashboard → inbox coherence | **FAIL** — operational dashboard vs legacy inbox |
| Filter-specific empty states | **FAIL** — single generic message |

**RED result:** PASS — defects documented and reproducible by inspection / browser.

---

## Verification Plan

### Static / local

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
git diff --check
```

Review diff for: backend untouched, no new dependencies, shell/nav/dashboard unchanged, documents semantics preserved.

### Local data scenarios

Plan verification with existing local fixtures where possible:

| Scenario | Expected |
|----------|----------|
| Pending request(s) | Pending tab shows items; Review + Accept/Decline; realtor copy |
| Accepted request | Manage relationship → detail; documents accessible |
| Declined request | View details → detail read-only |
| Cancelled request | View details → detail read-only |
| Empty filter | Correct filter-specific empty state |
| All tab | Mixed statuses when fixtures exist |

Local dev/test mutation may be separately authorized later if fixtures insufficient. Production mutation **not** required for acceptance.

### Browser acceptance — Desktop (~1280×900)

| Check | Expected |
|-------|----------|
| Default tab Pending on first inbox load | YES |
| Each status tab loads correct subset via API | YES |
| Realtor pending label | “Awaiting your response” (or defined equivalent) |
| Renter pages unchanged | YES — regression spot-check |
| Thumbnail when `image_url` present | YES |
| Terminal states link to detail | YES |
| Pending accept/decline (if preserved) | Works with confirm + error display |
| Detail page light chrome | YES |
| Documents workflow on accepted detail | Unchanged |
| TASK-012 nav active on viewing-requests routes | YES |
| Dashboard links still valid | YES — no dashboard code change |

### Browser acceptance — Mobile (~390×844)

| Check | Expected |
|-------|----------|
| Status tabs usable (scroll if needed) | YES |
| Single-column cards readable | YES |
| No horizontal overflow | YES |
| Actions reachable | YES |
| ConfirmDialog usable | YES |
| Detail readable | YES |
| Mobile drawer unaffected | YES |

### Authorization

TASK-012 auth behavior unchanged — no new auth UI.

---

## Production Acceptance Boundary (future gate)

Predominantly GET/navigation-only where possible:

- Verify default Pending tab and filter behavior against API for acceptance identity
- Verify status copy, card fields, terminal detail links
- Verify empty states when fixture has zero requests per filter
- Verify detail page renders; documents section present on accepted fixture if available
- Verify dashboard → inbox navigation still coherent (no dashboard code change in TASK-014)

Do **not** require accept/decline mutations during production acceptance unless a safe non-production-destructive fixture exists. If action workflow must be verified and safe fixture unavailable, classify honestly — do not mutate production automatically.

Use existing production acceptance identities. Credentials not recorded in task evidence.

---

## Security

Reuse without change:

- TASK-012 frontend layout guard (`frontend/app/realtor/layout.tsx`)
- Backend `require_realtor` on `/realtor/*` viewing-request routes
- Realtor ownership checks on accept/decline/detail
- Renter-only cancel semantics
- CSRF/session auth on mutations
- Document party access rules

TASK-014 exposes **no additional PII**. `requester_email` remains the intentional realtor-visible contact field.

No new authorization rules in TASK-014.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | Frontend-only |
| Migration | NONE | |
| Backend | NONE | |
| API contract | LOW | Existing endpoints only |
| Authentication | UNCHANGED | TASK-012 guard reused |
| Authorization | LOW | No new data scopes |
| Frontend | MEDIUM | List + detail UI, filtering, copy, action presentation |
| Default Pending tab | LOW | Intentional UX delta — document in acceptance |
| 100-item cap | LOW | Mitigated by status filters for v1 |
| Production | MEDIUM–LOW | Frontend-only deploy; user-visible inbox change |
| Rollback | LOW | Revert frontend image; no data impact |

---

## Deployment Contract

| Component | Expected |
|-----------|----------|
| Runtime scope | FRONTEND_ONLY |
| Backend | NO |
| Database | NO |
| nginx | NO |
| Migration | NO |
| Auth | UNCHANGED |

Preserve exact pre-deploy frontend image as rollback artifact before rollout (separate deployment gate).

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert TASK-014 frontend change and redeploy previous verified frontend image. Inbox reverts to legacy dark mixed-status list.

---

## Definition of Done (TASK-014)

Per `docs/engineering/protocol/DEFINITION_OF_DONE.md` (future gates):

1. Scope held — viewing-request inbox/detail evolution only.
2. Target behavior evidenced — filters, copy, cards, actions, terminal navigation, light theme.
3. Verification recorded — lint, typecheck, build, browser acceptance.
4. Diff hygiene — frontend only; known limitations documented.
5. Gates respected — separate commit/push/deploy/acceptance authorization.

---

## Pre-implementation RED evidence (VERIFIED 2026-08-19)

Structural defects confirmed before code changes:

| Defect | Pre-change state |
|--------|------------------|
| No filter tabs | Single unfiltered list |
| All statuses mixed | `getRealtorViewingRequests({ limit: 100 })` only |
| Wrong realtor pending copy | Shared `"Waiting for realtor response"` on realtor list |
| Terminal cards without detail link | `declined` / `cancelled` had no action |
| Dark page mismatch | Full-page `#1B1B1B` / gold chrome inside light shell |
| Dashboard → legacy inbox disconnect | Operational dashboard linked into dark mixed inbox |

---

## Implementation evidence (VERIFIED 2026-08-19)

**Scope:** FRONTEND_ONLY. No backend, DB, migration, shell, dashboard, or My Listings changes.

### Changed runtime files

| File | Purpose |
|------|---------|
| `frontend/app/realtor/viewing-requests/page.tsx` | Operational inbox: default Pending filter, status tabs, API-filtered fetch, sequence-guarded loading, filter-specific empty/error states, Accept/Decline with refetch, synchronous filter-change loading |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | Light page wrapper; unavailable state via `SectionCard` |
| `frontend/types/viewingRequest.ts` | Added `getRealtorViewingRequestStatusLabel()` — pending → `"Awaiting your response"`; renter helper unchanged |
| `frontend/lib/realtorWorkspace.ts` | Inbox filter types/constants, API status mapping, empty/result label helpers |
| `frontend/components/ViewingRequestRelationshipDetail.tsx` | Role-aware status label; `responded_at` display for realtor |

### New runtime files

| File | Purpose |
|------|---------|
| `frontend/components/realtor/viewing-requests/ViewingRequestStatusTabs.tsx` | Horizontal status tab strip (labels only, no global counts) |
| `frontend/components/realtor/viewing-requests/ViewingRequestListCard.tsx` | Light list card: thumbnail, property context, realtor status copy, status-specific actions |

### Filter architecture

| Tab | API call |
|-----|----------|
| **Pending (default)** | `getRealtorViewingRequests({ status: "pending", limit: 100 })` |
| **All** | `getRealtorViewingRequests({ limit: 100 })` — `status` omitted |
| **Accepted** | `getRealtorViewingRequests({ status: "accepted", limit: 100 })` |
| **Declined** | `getRealtorViewingRequests({ status: "declined", limit: 100 })` |
| **Cancelled** | `getRealtorViewingRequests({ status: "cancelled", limit: 100 })` |

Filter state: page-local React state (no query-param sync). Stale-response protection: monotonic `loadSequenceRef` compared before applying fetch results; filter change also increments sequence synchronously via `handleFilterChange`.

### Copy boundary

- Realtor: `getRealtorViewingRequestStatusLabel()` — pending → **Awaiting your response**
- Renter: `getViewingRequestStatusLabel()` unchanged — pending → **Waiting for realtor response**
- `ViewingRequestRelationshipDetail` selects helper by `role` prop

### Post-implementation defect fixed during verification

| Defect | Fix |
|--------|-----|
| Filter tab switch briefly showed wrong empty state before fetch | `handleFilterChange` sets `isLoading=true` and clears items synchronously; initial full-page skeleton limited to first load via `hasLoadedOnce` |

---

## Local verification evidence (VERIFIED 2026-08-19)

**Environment:** `http://localhost:3000` frontend, `http://127.0.0.1:8000` backend, local SQLite `backend/local_test.db`.

**Identity:** `verify-realtor@example.com` (realtor session in browser). Renter copy verified via source inspection + renter API fixture (`verify-renter@example.com`).

**Local data mutation (bounded, local dev only — NOT in Git):**

| Change | Why |
|--------|-----|
| Created property id=2 (`Fixture Listing B`) via API | Needed second listing for accepted/cancelled fixtures |
| Set property id=2 `status=available` in local SQLite | Property create returns `pending`; viewing requests require `available` |
| Created pending VR id=2 on property 1 via API | Pending tab fixture |
| Inserted accepted VR id=4 and cancelled VR id=3 on property 2 via SQLite | Rate-limit blocked additional API logins; terminal fixtures seeded directly |
| Existing declined VR id=1 retained | Declined tab fixture from TASK-013 local state |

**Production touched:** NO

### Filter verification

| Filter | API `status` | Observed |
|--------|--------------|----------|
| Pending (default on load) | `pending` | 1 item; **Awaiting your response**; Review/Accept/Decline |
| All | omitted | 4 items; mixed statuses |
| Accepted | `accepted` | 1 item; Manage relationship |
| Declined | `declined` | 1 item; View details |
| Cancelled | `cancelled` | 1 item; View details |

Active-filter `response.total` displayed (e.g. “1 pending viewing request”, “4 viewing requests”). No tab count fanout.

### Action / detail verification

| Check | Result |
|-------|--------|
| Pending → Review | Opens `/realtor/viewing-requests/2`; detail shows **Awaiting your response** |
| Accepted → Manage relationship | Visible on list; detail `/realtor/viewing-requests/4` renders relationship + Rental Documents upload section |
| Declined / Cancelled → View details | Link present on list cards |
| Accept/Decline on list | Preserved with `ConfirmDialog` (not exercised destructively after fixture setup) |
| TASK-012 shell / drawer | Unchanged; workspace nav persists on list and detail |

### Renter regression

| Check | Result |
|-------|--------|
| `getViewingRequestStatusLabel("pending")` | Still **Waiting for realtor response** (source VERIFIED) |
| Renter list/detail callers | Still use renter helper only (`viewing-requests/page.tsx`, `RequestViewingSection.tsx`) |
| Renter API pending fixture | 1 pending request for `verify-renter@example.com` |

### Responsive verification

| Viewport | Result |
|----------|--------|
| Desktop ~1280×900 | Header, tabs, 1–2 column grid, light cards — PASS |
| Mobile ~390×844 | Tabs usable, single-column cards, drawer button present, `scrollWidth === clientWidth` (no horizontal overflow) — PASS |

### Static verification

| Command | Result |
|---------|--------|
| `npm run lint` | PASS (0 errors; 4 pre-existing warnings in unrelated files) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |

---

## Gate reminder

Approval of one stage does not approve later stages.

**Historical gate state at implementation verification (point-in-time, 2026-08-19 — preserved as history):**

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE (local, uncommitted)
LOCAL VERIFICATION      COMPLETE
COMMIT                  NOT YET
PUSH                    NOT YET
DEPLOY                  NOT YET
PRODUCTION ACCEPTANCE   NOT YET
CLOSURE                 NOT YET
ARCHIVE                 NOT YET
```

Gate at that time: `TASK_014_IMPLEMENTATION_VERIFIED` → next `READY_FOR_TASK_014_COMMIT_REVIEW`.

**Reconciled final gate history (VERIFIED 2026-08-19):**

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE (committed 0139d6760c22f2df8e5c2a1babc4cc65cc3d64d7)
LOCAL VERIFICATION      PASS
COMMIT                  COMPLETE
PUSH                    COMPLETE
DEPLOY                  PASS (FRONTEND_ONLY)
PRODUCTION ACCEPTANCE   PASS WITH FIXTURE LIMITATIONS
CLOSURE                 COMPLETE
ARCHIVE                 NOT YET
```

The earlier `COMMIT NOT YET` / `PUSH NOT YET` lines were factual when written and are retained as history above; they are superseded by the reconciled history in this closure section. The implementation commit did not exist before it was actually created.

---

## Commit review evidence (VERIFIED 2026-08-19)

**Gate:** COMMIT REVIEW (no commit performed)

### Post-action refresh retest (browser)

| Field | Value |
|-------|-------|
| Action | Pending → **Decline** (list card + `ConfirmDialog`) |
| Before API `pending total` | 1 (id=2) |
| After API `pending total` | 0 |
| After API `declined total` | 2 (ids 2, 1) |
| Filter after action | Pending (unchanged) |
| UI after action | Empty state “No pending viewing requests”; card removed |
| Stale card reappeared | NO |

### Static reverification at commit review

| Command | Result |
|---------|--------|
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |

**Commit review gate:** `TASK_014_COMMIT_REVIEW_PASS` → next `READY_FOR_TASK_014_COMMIT`

---

## Implementation identity (VERIFIED 2026-08-19)

| Field | Value |
|-------|-------|
| Implementation SHA | `0139d6760c22f2df8e5c2a1babc4cc65cc3d64d7` |
| Commit message | `feat(realtor): evolve viewing requests inbox` |
| Deployment class | `FRONTEND_ONLY` |
| Frontend production image | `sha256:c6c3ccb70f5dee8ad1aae043dc4ad153afc020b4c2d9a85c93b71e6e8fa0fcda` |
| Immediate rollback tag | `rento-frontend:rollback-3e13437` |
| Rollback image | `sha256:2cf0e45de1da1294be3d4e5b7032b71ac717c032f4a89adaab65d6df83474cf0` |
| Previous production application SHA | `3e13437c0185c2ad5e290e264925f050b43b2341` (TASK-013) |

**Explicit change boundary:**

| Area | Changed |
|------|---------|
| Backend | NO |
| Database | NO |
| Migration | NONE |
| Auth / session contract | NO |
| API contract | NO |
| Dependencies | NO |

---

## Delivered product contract (VERIFIED 2026-08-19)

TASK-014 delivered:

- operational Viewing Requests inbox
- Pending as intentional default filter
- All / Pending / Accepted / Declined / Cancelled filters
- server-side status filtering
- one request per active filter
- stale-response protection
- filter-specific empty states
- light Workspace-aligned list
- improved property/request context
- realtor-specific pending status copy
- terminal-state detail navigation
- preserved Accept/Decline actions
- accepted relationship navigation
- light detail wrapper
- preserved relationship/document semantics
- mobile usable status tabs

---

## Default filter contract — production evidence (VERIFIED 2026-08-19)

| Field | Value |
|-------|-------|
| Default filter | Pending |
| Production verified | YES |
| Observed production initial API request | `GET /api/realtor/viewing-requests?status=pending&limit=100` |
| Automatic fallback to All | NONE |
| Verdict | PASS |

This is an intentional UX delta from the previous mixed-status inbox.

---

## Production filter matrix (VERIFIED 2026-08-19)

| Filter | API `status` | API `total` | UI empty state | Verdict |
|--------|--------------|-------------|----------------|---------|
| Pending | `status=pending` | 0 | correct | PASS |
| All | omitted | 0 | correct | PASS |
| Accepted | `status=accepted` | 0 | correct | PASS |
| Declined | `status=declined` | 0 | correct | PASS |
| Cancelled | `status=cancelled` | 0 | correct | PASS |

| Check | Result |
|-------|--------|
| Every endpoint returned HTTP 200 | YES |
| Active tab state correct (`aria-selected`) | YES |
| Stale rows observed | NO |
| Automatic filter fallback observed | NO |
| Unexpected 500 | NONE |

---

## Empty-state production evidence (VERIFIED 2026-08-19)

| Filter | Production copy |
|--------|-----------------|
| Pending | No pending viewing requests |
| Accepted | No accepted viewing requests |
| Declined | No declined viewing requests |
| Cancelled | No cancelled viewing requests |
| All | No viewing requests yet |

All matched API `total=0`. API failure was not rendered as an empty success state.

**Production verdict:** PASS

---

## Production Fixture Limitations

**Production acceptance realtor identity (credentials not recorded):**

| Field | Value |
|-------|-------|
| Email | `acceptance-realtor@rentonow.ro` |
| User ID | `29` |
| Role | `realtor` |
| Account status | `active` |

**Production data for that identity:**

| Status | Total |
|--------|-------|
| Pending | 0 |
| Accepted | 0 |
| Declined | 0 |
| Cancelled | 0 |
| All | 0 |

Because no viewing-request data existed, the following TASK-014 branches were **not executable in production**:

| # | Criterion | Local | Production |
|---|-----------|-------|------------|
| 1 | Realtor pending copy (“Awaiting your response”) | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 2 | Renter pending copy (“Waiting for realtor response”) | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 3 | `ViewingRequestListCard` populated-data presentation | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 4 | Pending Review rendering | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 5 | Pending Accept/Decline rendering | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 6 | Accepted Manage relationship rendering | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 7 | Declined View details | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 8 | Cancelled View details | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 9 | Pending detail | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 10 | Accepted relationship detail | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |
| 11 | Rental Documents section through an accepted fixture | VERIFIED | NOT VERIFIED — FIXTURE UNAVAILABLE |

These criteria must not be reclassified as production verified. No production fixtures were manufactured.

---

## Why fixture limitations do not block closure

**Governance decision:** `ACCEPTED_FOR_CLOSURE`

Reasoning (factual):

- core deployed TASK-014 architecture executed successfully in production
- exact production bundle is healthy
- all five filtered API paths executed
- default Pending behavior executed
- empty-state branches executed
- shell/nav/auth/mobile paths executed
- frontend-only deployment introduced no server/domain delta
- fixture-dependent branches were exercised locally before commit
- final committed runtime remained unchanged from local verification
- manufacturing production requests solely for acceptance would require business-data mutation and disproportionate fixture infrastructure
- unavailable fixtures are recorded as limitations rather than falsely classified as production verified

**NO WAIVER WAS USED.**

Reason: no mandatory core acceptance criterion was waived. The production evidence classification remains truthful.

---

## Local evidence for fixture-dependent paths (VERIFIED 2026-08-19)

Preserved from local verification and commit review (no fixture credentials recorded):

| Path | Local result |
|------|--------------|
| Pending → Review → detail | PASS |
| Pending Accept/Decline | PASS |
| Post-action authoritative refetch | PASS |
| Accepted → Manage relationship | PASS |
| Declined → View details | PASS |
| Cancelled → View details | PASS |
| Realtor pending copy — “Awaiting your response” | PASS |
| Renter pending copy — “Waiting for realtor response” | PASS |
| Accepted relationship detail + Rental Documents | PASS locally |

**Targeted post-action test:**

| Field | Value |
|-------|-------|
| Pending total | 1 → 0 after Decline |
| Pending card | removed |
| Pending tab | remained active |
| Declined result | request present |

---

## Race / filter safety (VERIFIED 2026-08-19)

Final implementation evidence:

- page-local active filter state
- `loadSequenceRef` stale-response protection
- an older in-flight request cannot overwrite a newer active filter
- error and loading transitions are also sequence guarded
- no five-tab API count fanout
- API status filtering used instead of filtering one 100-item client result

| Check | Result |
|-------|--------|
| Local review | PASS |
| Production rapid filter switching | no stale behavior observed |

---

## Security / auth production evidence (VERIFIED 2026-08-19)

| Case | Observed | Verdict |
|------|----------|---------|
| Unauthenticated `/realtor/viewing-requests` | redirect to `/login?returnUrl=%2Frealtor%2Fviewing-requests` | PASS |
| Authenticated renter / non-realtor — realtor APIs | `403 Only realtor can access this resource` | PASS |
| Authenticated renter / non-realtor — Realtor Workspace | redirect away to `/` | PASS |
| Authenticated realtor — authorized list endpoints | `200` | PASS |
| Unexpected 401/403 under realtor session | none | PASS |

Server authorization unchanged by TASK-014.

---

## Responsive production evidence (VERIFIED 2026-08-19)

| Check | Result |
|-------|--------|
| Desktop ~1280×900 | PASS |
| Desktop horizontal overflow | none (`scrollWidth == clientWidth == 1280`) |
| Mobile ~390×844 | PASS |
| Mobile viewport overflow | none (`scrollWidth == clientWidth == 390`) |
| Status tab list | intentionally horizontally scrollable (`scrollWidth 472 > clientWidth 398`) |
| Workspace drawer | PASS |
| Viewing Requests navigation from drawer | PASS |
| Filter switching on mobile | PASS |

---

## Production runtime stability (VERIFIED 2026-08-19)

| Field | Value |
|-------|-------|
| Production Git SHA | `0139d6760c22f2df8e5c2a1babc4cc65cc3d64d7` |
| Frontend image | `sha256:c6c3ccb70f5dee8ad1aae043dc4ad153afc020b4c2d9a85c93b71e6e8fa0fcda` |
| Frontend container | `7c8a0be12bd3acd0fdf04c130608c218dcdb8eca80219bd615bfd6de9d5db097` |
| Frontend RestartCount | `0` |
| frontend | healthy |
| backend | healthy / unchanged (`1f63695435605ae683b694c6f73fed58c3d72ba298ac97fb5a75e905532b02da`) |
| db | healthy / unchanged |
| nginx | healthy / unchanged |
| Rollback artifact | intact (`rento-frontend:rollback-3e13437`) |
| Homepage HTTP | `200` |
| `/api/` HTTP | `200` |

Not observed: unexpected 500, uncaught JS exceptions, hydration errors, failed chunks, redirect loops. Expected `401 /api/users/me` occurred only on unauthenticated page loads and after logout.

**NO BUSINESS DATA MUTATION.**

---

## Session hygiene note

During an additional mobile acceptance pass, one or more auth sessions may have remained active because the logout control was not exercised/found in that specific pass. Sessions expire by idle/absolute timeout.

**Classification:** NON-BLOCKING ACCEPTANCE HYGIENE NOTE

It is not:

- business-data mutation
- a TASK-014 functional regression
- a security boundary failure proven by current evidence

No DB/session mutation was performed during closure. No follow-up task was created automatically.

---

## Known limitations (carried forward, not new production defects)

- list query capped at 100 items per filter
- no pagination redesign
- no URL filter persistence
- no global tab counts
- list/detail pending action duplication remains
- some internal shared relationship-detail styling may remain legacy
- production fixture-dependent populated paths not executed

---

## Out of scope / deferred (not delivered)

- Dashboard changes
- My Listings light migration
- scheduling
- calendar
- messaging
- notifications
- decline reason
- realtor cancel
- CRM
- analytics
- document redesign
- backend pagination redesign
- new API endpoints
- TASK-015

---

## Product result

TASK-014 evolves Viewing Requests from a legacy mixed-status dark page into an operational Realtor Workspace inbox.

The realtor now has:

- Pending-first triage
- status-specific views
- truthful server-side filtering
- clearer role-specific status semantics
- consistent empty/error states
- navigable terminal relationships
- stronger list context
- mobile-operational navigation

while preserving existing server-side viewing-request and document rules.

---

## Closure

| Field | Value |
|-------|-------|
| Production acceptance result | `PRODUCTION_ACCEPTANCE_PASS_WITH_FIXTURE_LIMITATIONS` |
| Governance decision | `ACCEPTED_FOR_CLOSURE` |
| Waiver used | NO |
| Closure gate | `TASK_014_CLOSURE_DOCUMENTATION_PASS` |
| Next gate | `READY_FOR_TASK_014_CLOSURE_COMMIT` |
| Archive | NOT YET |

Closure documentation changed documentation only. No runtime code change, no commit, no push, no archive, no deployment, and no production access were performed in the closure documentation gate.
