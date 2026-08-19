# TASK-013 — Realtor Operational Dashboard Top Section

| Field | Value |
|-------|-------|
| ID | TASK-013 |
| TITLE | Realtor Operational Dashboard Top Section |
| STATUS | CLOSED |
| RISK | MEDIUM |
| CLASSIFICATION | Frontend operational dashboard / dashboard content |

> STATUS: CLOSED means implementation, local verification, commit, push, deployment, production acceptance, and closure documentation are complete. Archive is **not** yet performed.

**Initiative reference:** Realtor Workspace Evolution — Operational Dashboard v1 discovery completed 2026-08-19 (`OPERATIONAL_DASHBOARD_V1_DISCOVERY_COMPLETE`).

**Repository baseline at definition (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `f897eda5b515af7ff545323a12f2566c96208ab6` |
| origin/main | `f897eda5b515af7ff545323a12f2566c96208ab6` |
| divergence | `0 0` |
| Active tasks before creation | none (`docs/engineering/tasks/README.md` only) |
| Prior task | TASK-012 — CLOSED / ARCHIVED / COMPLETE |

**Runtime note:** Production frontend runtime deployed at TASK-012 implementation SHA `076b888eb01946cbdbf67b0c71582cb41432b959`. Repository HEAD and deployed application release identity must not be assumed identical without verification.

---

## Problem

**User problem:** After TASK-012, `/realtor` still behaves primarily as a listings-oriented hub. A realtor landing on the dashboard cannot quickly see what requires attention now (pending viewing requests, profile gaps, listing issues) in one coherent operational view aligned with the accepted light Workspace shell.

**Structural defects (VERIFIED from repository inspection — 2026-08-19):**

1. Dashboard loads only `GET /realtor/profile` and `GET /realtor/properties` — **no viewing-request data** on `/realtor`.
2. Operational information is scattered across dark/gold blocks: header stat tiles, inbox card, suggested next step, action center, and a 4-stat grid (Active / Pending / **Rented** / Archived).
3. Duplicate metrics: header shows Active/Pending; listing totals grid repeats and adds unsupported **Rented** count.
4. Dashboard does not answer: *What should this realtor know or act on right now?*
5. Top content remains dark/gold inside the TASK-012 light shell — no operational light content zone yet.
6. Backend property lifecycle supports only `pending`, `available`, `archived` — **not** `rented` or `reserved`; dashboard still displays Rented metric.

TASK-013 evolves the **top operational area** of `/realtor` only. It does **not** rewrite the Workspace shell, backend, or full listings section.

---

## Product Objective

Evolve the top of `/realtor` from a listings hub into a professional **operational dashboard** that answers:

> What should this realtor know or act on right now?

Deliver visible dashboard value using **truthful existing data** and the TASK-012 Workspace shell. Preserve My Listings business behavior.

---

## Visual Direction (accepted — do not reopen)

TASK-013 operates **inside** the TASK-012 Workspace shell:

- light SaaS content zone for the operational top section
- white/light surfaces, Rento blue primary accents
- restrained borders/shadows, clear hierarchy, compact operational cards
- responsive/mobile-first layout within existing shell

**My Listings** section may remain visually unchanged (dark/gold) in this task. Do **not** migrate the whole realtor area to light theme.

Reuse existing light UI primitives where appropriate: `frontend/components/ui/*` (SectionCard, PageHeader, StatusBadge, PrimaryButton, SecondaryButton).

---

## Current Behavior

### `/realtor` page (VERIFIED)

| Aspect | Current state |
|--------|---------------|
| File | `frontend/app/realtor/page.tsx` (~1180 lines, client component) |
| Data on mount | `Promise.all([getMyRealtorProperties(), getMyRealtorProfile()])` |
| Viewing requests | **Not fetched** |
| Loading | Full-page dark skeleton until both calls complete |
| Error | Single message: "Failed to load your workspace" |
| Top UI | Dark header (greeting, avatar, 2 stats, suggested step, profile bar), primary CTA, inbox card, continue-editing link, action center, 4-stat grid |
| Listings | Search, current/archived tabs, cards, bottom sheet, archive/restore/delete |
| Avatar | Upload/crop on dashboard (preserve) |
| Hash | `#realtor-properties-heading` scroll after load (TASK-012) |

### TASK-012 infrastructure to reuse (VERIFIED)

| Asset | Path | Reuse |
|-------|------|-------|
| Auth + shell | `frontend/app/realtor/layout.tsx`, `RealtorWorkspaceShell.tsx` | **Do not modify** |
| Nav config | `frontend/lib/realtorWorkspace.ts` | Extend helpers only |
| Properties anchor | `REALTOR_PROPERTIES_SECTION_ID`, `scrollToRealtorPropertiesSection()` | Preserve |

### Existing helpers (VERIFIED)

| Helper | Location | Notes |
|--------|----------|-------|
| `buildWorkspaceActions()` | `realtorWorkspace.ts` | Profile, first property, missing photos — candidate for Requires Attention consolidation |
| `computeProfileCompletionPercent()` | `realtorWorkspace.ts` | Client heuristic; **not** authoritative vs `is_completed` |
| `getContinueEditingProperty()` | `realtorWorkspace.ts` | First `pending` property |

**Frontend test infrastructure:** no `*.test.*` under `frontend/` (VERIFIED). Unit-test RED is **NOT APPLICABLE**.

---

## Target Behavior

Replace/consolidate the scattered dark operational top blocks with one **light operational dashboard zone**:

```text
[Greeting / identity / primary CTA]
[Summary metric cards — max 4]
[Requires Attention | Recent Pending Viewing Requests]
[My Listings — preserved, visually unchanged]
```

### Post-TASK-013 product state (explicit boundary)

```text
Operational dashboard top section: YES
Viewing-request metrics on dashboard: YES
Requires Attention panel: YES
Recent pending viewing requests: YES
Light operational content zone: YES
My Listings full light migration: NOT YET
Recent Listings panel: NOT YET
Backend aggregation endpoint: NOT YET
Clients / Documents / Analytics: NOT YET
```

---

## Metric Contract

Maximum **four** summary cards. Exact domain terminology — no CRM renaming.

| Card label | Source API | Computation | Failure semantics |
|------------|------------|-------------|-------------------|
| **Active Listings** | `GET /realtor/properties` | Count loaded items where `status === "available"` | If properties fetch fails → page-level error; **do not show 0** |
| **Pending Moderation** | `GET /realtor/properties` | Count loaded items where `status === "pending"` | Same |
| **Pending Viewing Requests** | `GET /realtor/viewing-requests?status=pending&limit=5` | Use response **`total`** (not `items.length`) | If pending VR fetch fails → page-level error |
| **Accepted Viewing Requests** | `GET /realtor/viewing-requests?status=accepted&limit=1` | Use response **`total`** (not `items.length`) | If accepted VR fetch fails → page-level error |

**Label rule:** Use **Accepted Viewing Requests** — not Clients, Relationships, Rentals, or Revenue. This matches current viewing-request domain semantics (`pending` / `accepted` / `declined` / `cancelled`).

**Excluded metrics:** `rented`, `reserved`, views, leads, revenue, conversion, archived (as primary dashboard card in v1).

### Known limitation — property stats ceiling

`GET /realtor/properties` has **max limit = 100** (default 100). Frontend currently loads without explicit limit and receives up to 100 items.

Client-derived **Active Listings** and **Pending Moderation** counts are **exact only when the realtor owns ≤100 properties**. For portfolios above 100, counts may be **incomplete**.

TASK-013 **does not** fix this. No backend aggregation in this increment.

**Future trigger for backend work:** real portfolios approach/exceed 100 and dashboard property metrics require strict accuracy at scale.

### Known limitation — viewing-request totals

Pending and Accepted card values must use API response **`total`** from filtered list calls. Do not infer totals from returned `items` when `limit` is less than `total`.

Viewing-request list max limit = 100 per status; `total` from API remains authoritative for counts.

---

## Requires Attention Contract

Bounded panel showing **actionable** items only. Ordered by priority.

| # | Trigger | Condition | Action | Priority |
|---|---------|-----------|--------|----------|
| 1 | Incomplete profile | `profile.is_completed === false` | `/realtor/profile` | High |
| 2 | Pending viewing requests | pending viewing-request `total > 0` | `/realtor/viewing-requests` | High |
| 3 | Properties missing photos | any loaded property with falsy `image_url` | `/realtor/properties/{id}/edit` for first such property | Medium |

### Pending Moderation — explicit exclusion from Requires Attention

**Pending Moderation** appears as a **summary metric card only**.

It is **omitted** from Requires Attention because:

- `status === "pending"` means awaiting **admin moderation**, not a realtor-initiated workflow step.
- The realtor cannot approve their own listing from the dashboard.
- Waiting for review is informational; there is no distinct dashboard action beyond what existing edit/missing-photo flows already cover.

If implementation discovers a concrete, existing realtor action tied to pending moderation that is not covered by missing-photos or continue-editing flows, **STOP** and return to decision gate — do not expand scope silently.

**Empty state:** When no triggers apply, show a concise empty state (e.g. "Nothing requires attention right now") — not an error.

---

## Recent Pending Viewing Requests Contract

| Field | Value |
|-------|-------|
| Source | `GET /realtor/viewing-requests?status=pending&limit=5` |
| Ordering | Backend `created_at DESC` (repository) — preserve |
| Display limit | Up to 5 items from response `items` |
| Fields shown | request id, property title (from property summary), requester email, status, `created_at`; message optional if space allows |
| Row action | Link to `/realtor/viewing-requests/{id}` or inbox — navigation only |
| Mutations | **None** — Accept/Decline remain on viewing-requests pages |
| Empty state | Clear copy when pending `total === 0` |

---

## Quick Actions Contract

Small bounded set. Avoid duplicating persistent sidebar nav without operational value.

| Action | Condition | Target |
|--------|-----------|--------|
| **Complete Profile** (primary) | `!profile.is_completed` | `/realtor/profile` |
| **Add Property** (primary) | `profile.is_completed` | `/realtor/properties/create` |
| **Review Viewing Requests** (secondary) | pending viewing-request `total > 0` | `/realtor/viewing-requests` |
| **Manage Listings** (secondary) | always available | `/realtor#realtor-properties-heading` (same-page scroll when on `/realtor`) |

Do **not** add Public Profile, Dashboard, or Viewing Requests as redundant quick actions when they duplicate sidebar without added operational value.

---

## Remove / Consolidate Old Top UI

TASK-013 may remove or consolidate redundant top blocks **after** mapping behavior into the new operational zone:

| Current block | Disposition |
|---------------|-------------|
| Header duplicate stat tiles (Active/Pending) | **Remove** — replaced by summary cards |
| 4-stat grid (Active/Pending/Rented/Archived) | **Remove** — Rented unsupported; metrics moved to cards |
| Standalone inbox card | **Remove** — covered by Pending Viewing Requests metric + recent list + quick action |
| Suggested next step (isolated) | **Consolidate** into Requires Attention / primary CTA |
| Action center (duplicate of above) | **Consolidate** into Requires Attention |
| Continue editing link | **Evaluate** — merge into Requires Attention if pending property has clear edit action; otherwise preserve if still unique |

Do not remove avatar upload, greeting identity, or primary CTA semantics.

---

## My Listings Preservation (acceptance-critical)

The My Listings section and its workflows are **explicitly preserved**. TASK-013 must **not** change business behavior:

| Workflow | Must remain functional |
|----------|------------------------|
| Search listings | YES |
| Current / Archived tabs | YES |
| Listing cards + bottom sheet | YES |
| Archive / restore / delete | YES |
| Create property CTA (profile-gated) | YES |
| Hash anchor `#realtor-properties-heading` | YES |
| Properties hash scroll on load (TASK-012) | YES |
| Lifecycle loading/errors for listing actions | YES |
| Dark/gold listing visual styling | YES (no full light migration) |

---

## Avatar Workflow

Current dashboard avatar upload/crop behavior is **preserved**. TASK-013 may reposition identity/avatar within the new light top section but must not refactor or remove the workflow. Avatar deduplication remains out of scope.

---

## Data Loading Strategy

### API calls (existing endpoints only)

Parallel load on mount via `Promise.all`:

```text
1. GET /realtor/profile           → getMyRealtorProfile()
2. GET /realtor/properties        → getMyRealtorProperties()
3. GET /realtor/viewing-requests?status=pending&limit=5   → getRealtorViewingRequests({ status: "pending", limit: 5 })
4. GET /realtor/viewing-requests?status=accepted&limit=1  → getRealtorViewingRequests({ status: "accepted", limit: 1 })
```

No new backend endpoint. No aggregation service.

### Loading state

- Unified loading skeleton for operational top + listings (v1).
- Do not render metric cards with zero placeholders while loading.

### Error state

- If **any** required parallel fetch fails → single bounded page-level error (e.g. "Failed to load your workspace").
- **Do not** silently render `0` for metrics when the underlying API failed.
- Do not introduce partial-loading infrastructure in v1 unless implementation evidence proves necessary.

---

## Responsive Contract

### Desktop (≥1024px)

Preferred information architecture:

```text
Greeting / Primary CTA
[Active] [Pending Moderation] [Pending Viewing Requests] [Accepted Viewing Requests]
[Requires Attention] [Recent Pending Viewing Requests]
My Listings
```

Two-column layout for Requires Attention + Recent Pending Requests when space allows.

### Tablet (768px–1023px)

- Metric cards wrap 2×2
- Panels stack as needed
- No horizontal overflow
- Operational hierarchy preserved

### Mobile (<768px)

Priority order:

1. Greeting / primary CTA
2. Requires Attention
3. Summary metrics (2×2)
4. Recent Pending Viewing Requests
5. My Listings

Requirements:

- No horizontal overflow from operational zone
- Touch targets usable inside TASK-012 mobile shell
- Content readable; no tiny unusable cards

---

## In Scope

1. Light operational dashboard top section on `/realtor`.
2. Four summary metric cards per Metric Contract.
3. Requires Attention panel per contract (Pending Moderation excluded).
4. Recent Pending Viewing Requests list (≤5).
5. Quick actions per contract.
6. Consolidate/remove redundant dark top blocks listed above.
7. Extend `frontend/lib/realtorWorkspace.ts` with dashboard helpers (metrics, attention items).
8. Add focused components under `frontend/components/realtor/dashboard/` (minimal count).
9. Parallel data loading with unified loading/error semantics.
10. Local verification: lint, typecheck, build, browser acceptance.

---

## Out of Scope

| Item | Status |
|------|--------|
| Workspace shell / sidebar / mobile drawer changes | OUT OF SCOPE |
| Auth guard / layout changes | OUT OF SCOPE |
| Backend / database / migrations | OUT OF SCOPE |
| New or aggregate API endpoints | OUT OF SCOPE |
| My Listings full light-theme migration | OUT OF SCOPE |
| Listing card redesign | OUT OF SCOPE |
| Recent Listings panel | OUT OF SCOPE |
| Documents panel / realtor-wide document feed | OUT OF SCOPE |
| Clients / Messages / Tasks / Calendar | OUT OF SCOPE |
| Analytics / property views / leads / revenue | OUT OF SCOPE |
| Rented / Reserved metrics | OUT OF SCOPE |
| Avatar refactor / deduplication | OUT OF SCOPE |
| Full `/realtor` page rewrite | OUT OF SCOPE |
| Viewing inbox page redesign | OUT OF SCOPE |
| Profile / property editor redesign | OUT OF SCOPE |
| Production deployment | OUT OF SCOPE (separate gate) |

If implementation discovers backend changes are required: **STOP** and return to decision gate.

---

## Expected Implementation Surface

Likely files (expectation only — minimize component count):

| File | Expected change |
|------|-------------------|
| `frontend/app/realtor/page.tsx` | Refactor top section; extend data loading; preserve listings + avatar |
| `frontend/components/realtor/dashboard/*` | **new** — metric cards, attention panel, recent requests (minimal set) |
| `frontend/lib/realtorWorkspace.ts` | Dashboard metric/attention helpers |
| `frontend/services/api.ts` | Change only if wrappers cannot pass `status`/`limit` cleanly |

Expected **not** changed:

- `frontend/app/realtor/layout.tsx`
- `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx`
- `backend/**`
- Database / migrations

---

## RED / Pre-Implementation Evidence

Valid RED for this task is **structural absence** (no suitable frontend unit-test infra):

| Evidence | Current state |
|----------|---------------|
| Viewing-request data on `/realtor` | **FAIL** — not fetched |
| Pending viewing request count on dashboard | **FAIL** — absent |
| Recent pending viewing requests panel | **FAIL** — absent |
| Requires Attention operational panel | **FAIL** — scattered action center only |
| Unified light operational top zone | **FAIL** — dark/gold blocks |
| Rented metric on dashboard | **FAIL** — unsupported lifecycle displayed |
| Dashboard answers "what requires attention now?" | **FAIL** |

**RED result:** PASS — defects documented and reproducible by inspection / browser.

---

## Implementation Evidence (2026-08-19)

**Implementation baseline (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `f897eda5b515af7ff545323a12f2566c96208ab6` |
| origin/main | `f897eda5b515af7ff545323a12f2566c96208ab6` |
| divergence | `0 0` |
| Initial worktree | untracked task document only |
| Post-implementation worktree | modified `page.tsx`, `realtorWorkspace.ts`; new `dashboard/*`; task document updated |

**Runtime files changed/created:**

| File | Purpose |
|------|---------|
| `frontend/app/realtor/page.tsx` | Extended parallel data loading; light operational top zone; preserved dark My Listings + avatar workflow |
| `frontend/lib/realtorWorkspace.ts` | `computeDashboardMetrics`, `buildRequiresAttentionItems`, `formatDashboardDateTime` |
| `frontend/components/realtor/dashboard/DashboardMetrics.tsx` | Four summary metric cards |
| `frontend/components/realtor/dashboard/DashboardRequiresAttention.tsx` | Actionable attention panel |
| `frontend/components/realtor/dashboard/DashboardRecentPendingRequests.tsx` | Recent pending viewing requests (≤5) |
| `frontend/components/realtor/dashboard/DashboardQuickActions.tsx` | Primary/secondary quick actions |

**Not changed:** `frontend/services/api.ts` (existing `getRealtorViewingRequests({ status, limit })` sufficient), `frontend/app/realtor/layout.tsx`, shell/nav/backend.

**Data loading (VERIFIED in code + local API):**

```text
Promise.all([
  getMyRealtorProfile(),
  getMyRealtorProperties(),
  getRealtorViewingRequests({ status: "pending", limit: 5 }),
  getRealtorViewingRequests({ status: "accepted", limit: 1 }),
])
```

- Property metrics derived client-side from loaded properties (`available` / `pending`).
- Viewing-request metrics use API `total` (not client-side counting).
- Unified loading skeleton; any required fetch failure → page-level error (no silent zeros).

**Local realtor fixture:** `verify-realtor@example.com` (id=1, role=`realtor`, `is_completed=true`).

**Credentials:** local development fixture; password intentionally not recorded in repository evidence.

**Local API observed values (2026-08-19):**

| Metric | Source | Expected | Observed |
|--------|--------|----------|----------|
| Active Listings | properties `status === "available"` | 1 | 1 |
| Pending Moderation | properties `status === "pending"` | 0 | 0 |
| Pending Viewing Requests | `pendingResponse.total` | 1 | 1 |
| Accepted Viewing Requests | `acceptedResponse.total` | 0 | 0 |

**Requires Attention (Scenario B — pending > 0):**

| Trigger | Condition | Observed |
|---------|-----------|----------|
| Pending viewing requests | `total > 0` | Item shown → `/realtor/viewing-requests` |
| Incomplete profile | `!is_completed` | Not shown (profile complete on fixture) |
| Missing photos | `!image_url` | Not shown (listing has image) |
| Pending Moderation | — | Excluded (metric only) |

**Recent Pending Viewing Requests:**

- Count rendered: 1 (from `pendingResponse.items`, max 5)
- Fields: property title, requester email, formatted `created_at`
- Link: `/realtor/viewing-requests/{id}`
- Empty state: implemented (not exercised on current fixture)

**Quick actions (fixture):**

- Primary: Add Property (`/realtor/properties/create`)
- Secondary: Review Viewing Requests (shown when pending > 0)
- Secondary: Manage Listings → `#realtor-properties-heading` (hash navigation verified)

**My Listings regression (local browser):**

| Check | Result |
|-------|--------|
| Search input | PASS |
| Tab switching (Archived empty state) | PASS |
| Listing card visible | PASS |
| Hash navigation | PASS (`#realtor-properties-heading`) |
| Dark listings styling preserved | PASS |
| Avatar upload button present | PASS |

**Responsive (local browser):**

| Viewport | Result |
|----------|--------|
| Desktop ~1280×900 | PASS — light top zone, 4 metrics, two-column panels, dark listings below |
| Mobile ~390×844 | PASS — operational order preserved, no horizontal overflow observed, shell drawer button present |

**Scenario A (zero pending VR):** VERIFIED 2026-08-19 — see Empty-State Verification Evidence below.

**Static verification (VERIFIED 2026-08-19):**

| Command | Result |
|---------|--------|
| `npm run lint` | PASS (4 pre-existing unrelated warnings) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |

**Diff scope:** TASK-013 frontend only. No unexpected files.

**Commit (VERIFIED 2026-08-19):**

| Field | Value |
|-------|-------|
| Implementation SHA | `3e13437c0185c2ad5e290e264925f050b43b2341` |
| Commit message | `feat(realtor): add operational dashboard` |
| origin/main | synced to implementation SHA |
| divergence | `0 0` |

**False future lifecycle claims:** NO — commit/push/deploy/production acceptance recorded in Closure Evidence below.

---

## Empty-State Verification Evidence — Scenario A (2026-08-19)

**Gate:** `TASK_013_EMPTY_STATE_VERIFICATION_PASS`

**Fixture:**

| Field | Value |
|-------|-------|
| Existing zero-pending fixture | NO — only local realtor `verify-realtor@example.com` (id=1) existed with `pending total = 1` |
| Local mutation required | YES |
| Production touched | NO |

**Local data mutation (bounded, local dev only):**

1. `PATCH /realtor/viewing-requests/1/decline` — moved request id=1 from `pending` → `declined` to achieve zero-pending state.
2. For stale-state transition test: SQLite restore `viewing_requests.id=1` to `status=pending`, dashboard loaded with pending=1, then decline repeated and hard reload performed.
3. Final local fixture state after gate: request id=1 remains `declined` (pending total = 0). Original pending fixture not restored to avoid duplicate-request constraints if re-created via API.

**API evidence (authenticated local session):**

```text
GET /realtor/viewing-requests?status=pending&limit=5
→ 200
→ total = 0
→ items = []
```

**Dashboard empty-state evidence (`http://localhost:3000/realtor`):**

| Check | Expected | Observed |
|-------|----------|----------|
| Pending Viewing Requests metric | `0` | `0` |
| Pending-viewing-request attention item | absent | absent (`Nothing requires attention`) |
| Review Viewing Requests quick action | hidden when pending=0 | hidden |
| Recent pending section | empty state | `No pending viewing requests` — no stale row |
| Loading spinner after load | none | none |

**Stale-state transition (VERIFIED):**

1. Restored pending=1 → dashboard showed metric `1`, attention item, recent row.
2. Declined via API → hard reload `/realtor`.
3. Metric `0`, attention item gone, recent empty state — no stale request persisted.

**Mobile (~390×844):**

| Check | Result |
|-------|--------|
| Empty state readable | PASS |
| Horizontal overflow | PASS (`scrollWidth === clientWidth === 390`) |
| Layout | PASS — no broken cards or excessive blank height observed |

**Browser / network:**

| Check | Result |
|-------|--------|
| Uncaught JS errors | none observed |
| Hydration errors | none observed |
| Pending API | 200 (resource timing entries present) |
| Unexpected 500 | none |

**Runtime code changes in this gate:** NO

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

Review diff for: backend untouched, no new dependencies, no shell/nav changes, listings behavior preserved.

### Browser acceptance — Desktop (~1280×900)

| Check | Expected |
|-------|----------|
| Four summary cards show truthful values | Per Metric Contract |
| Pending/Accepted VR cards use API `total` | YES |
| Requires Attention triggers | Profile incomplete, pending VR, missing photos only |
| Pending Moderation **not** in Requires Attention | YES |
| Recent pending viewing requests (≤5) | Ordered, linked, empty state when none |
| Quick actions | Contextual primary + secondary per contract |
| My Listings regression | Search, tabs, cards, lifecycle actions |
| Properties hash navigation | `#realtor-properties-heading` still works |
| Rented metric removed | YES |
| Light operational zone | YES; listings section may remain dark |
| API failure | Page error — not silent zeros |

### Browser acceptance — Mobile (~390×844)

| Check | Expected |
|-------|----------|
| Content priority order | Per Responsive Contract |
| No horizontal overflow | YES |
| TASK-012 shell/drawer unaffected | YES |

### Authorization

TASK-012 auth behavior unchanged — no new auth UI on dashboard.

No business-data mutation required for dashboard verification (GET/navigation only).

---

## Deployment Evidence (2026-08-19)

**Gate:** `TASK_013_FRONTEND_DEPLOYMENT_PASS`

| Field | Value |
|-------|-------|
| Production deployed SHA | `3e13437c0185c2ad5e290e264925f050b43b2341` |
| Deployment class | FRONTEND_ONLY |
| Frontend image | `sha256:2cf0e45de1da1294be3d4e5b7032b71ac717c032f4a89adaab65d6df83474cf0` |
| Frontend container | `7fe63bcf06115f7c1491fff1f42c24b1ade0e93fc388271b1661b201291ca320` |
| Frontend StartedAt | `2026-08-19T16:59:10Z` |
| Frontend RestartCount | `0` |
| Rollback tag | `rento-frontend:rollback-076b888` |
| Rollback image | `sha256:5c2592b6c77dc246aaa41df52d926b2ffe67100dfeaaa1ff78d2f089799efeac` |

**Runtime scope deployed:**

- `/realtor` operational dashboard top section
- 4 summary metrics
- Requires Attention
- recent pending viewing requests
- quick actions
- dashboard helpers
- existing My Listings preserved

**Explicitly unchanged:**

| Component | Changed |
|-----------|---------|
| Backend | NO |
| Database | NO |
| Migrations | NONE |
| Auth/shell | NO |
| Dependencies | NO |
| nginx | NO |

**Deploy method:** frontend-only build/recreate. Backend, DB, and nginx containers not recreated. All services healthy post-deploy.

---

## Production Acceptance Evidence (2026-08-19)

**Gate:** `PRODUCTION_ACCEPTANCE_PASS`

**Mode:** authenticated production acceptance only — no deploy, no business-data mutation.

**Acceptance identity (credentials not recorded):**

| Field | Value |
|-------|-------|
| Email | `acceptance-realtor@rentonow.ro` |
| User ID | `29` |
| Role | `realtor` |
| Account status | `active` |
| Login | PASS → redirect to `/realtor` |
| `GET /api/users/me` | PASS — matches expected identity |

**Production API truth during acceptance (authenticated GET only):**

| Field | Value |
|-------|-------|
| `profile.is_completed` | `false` |
| Properties `total` | `0` |
| Active listings (`status=available`) | `0` |
| Pending moderation (`status=pending`) | `0` |
| Pending viewing requests `total` | `0` |
| Accepted viewing requests `total` | `0` |
| Pending viewing requests `items.length` | `0` |
| Missing-photo condition | none (no properties) |

**Metric acceptance:**

| Card | Expected | UI | Verdict |
|------|----------|-----|---------|
| Active Listings | 0 | 0 | PASS |
| Pending Moderation | 0 | 0 | PASS |
| Pending Viewing Requests | 0 | 0 | PASS |
| Accepted Viewing Requests | 0 | 0 | PASS |

Forbidden speculative cards absent: Rented, Reserved, Revenue, Leads, Views — **PASS**.

**Requires Attention acceptance:**

| Trigger | Expected | Observed | Verdict |
|---------|----------|----------|---------|
| Incomplete profile | present | present | PASS |
| Pending viewing requests | absent (`total=0`) | absent | PASS |
| Missing photos | absent (no properties) | absent | PASS |
| Pending Moderation in attention | must be absent | absent | PASS |

**Recent pending viewing requests:**

| Check | Expected | Observed | Verdict |
|-------|----------|----------|---------|
| State | empty (`total=0`) | “No pending viewing requests” | PASS |
| Row count | 0 | 0 | PASS |
| Stale rows | none | none | PASS |
| Accept/Decline controls | absent | absent | PASS |

**Quick actions:**

| Action | Expected | Observed | Verdict |
|--------|----------|----------|---------|
| Primary | Complete Profile → `/realtor/profile` | PASS | PASS |
| Review Viewing Requests | absent (`pending total=0`) | absent | PASS |
| Manage Listings | hash → `#realtor-properties-heading`, section visible | PASS | PASS |

Add Property production behavior **not exercised** — acceptance fixture has incomplete profile; expected, not a TASK-013 defect.

**Regression (production):**

| Check | Verdict |
|-------|---------|
| My Listings heading, search, tabs, empty state | PASS |
| Avatar upload entry point present (no upload performed) | PASS |
| TASK-012 shell, sidebar, workspace header | PASS |
| Dashboard nav active on `/realtor` | PASS |
| Viewing Requests nav | PASS |
| Profile nav | PASS |
| Mobile drawer | PASS |
| Desktop ~1280×900 — no horizontal overflow | PASS |
| Mobile ~390×844 — no horizontal overflow | PASS |
| Unauthenticated `/realtor` → login redirect | PASS |
| Unauthenticated `/realtor/viewing-requests` → login redirect | PASS |
| Authenticated non-realtor `acceptance@rentonow.ro` → redirect away from `/realtor` | PASS |

**Browser / network / stability:**

| Check | Result |
|-------|--------|
| Uncaught JS / React / hydration errors | none observed |
| Unexpected 500 | none |
| Unexpected auth errors while authenticated on allowed data | none |
| Redirect loops | none |
| All services healthy post-acceptance | PASS |
| Frontend RestartCount | `0` |
| Frontend image unchanged | PASS |
| Backend unchanged | PASS |
| Rollback artifact intact | PASS |
| Homepage HTTP | 200 |
| `/api/` HTTP | 200 |
| Business data mutation | **NO** |

Auth session storage may change because login/logout occurred during acceptance.

---

## Security

Reuse without change:

- TASK-012 frontend layout guard (`frontend/app/realtor/layout.tsx`)
- Backend `require_realtor` on `/realtor/*` API routes
- Realtor-scoped property and viewing-request endpoints
- Own profile endpoint

All proposed metrics aggregate **own** realtor data only. No cross-realtor aggregation. No security policy changes.

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
| Frontend | MEDIUM | Large page top-section refactor + 2 additional API calls |
| Property stats >100 inaccuracy | LOW–MEDIUM | Documented known limitation |
| Production | MEDIUM–LOW | Frontend-only deploy; user-visible dashboard change |
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

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert TASK-013 frontend change and redeploy previous verified frontend image. Dashboard reverts to pre-TASK-013 scattered dark top + listings hub layout.

---

## Definition of Done (TASK-013)

Per `docs/engineering/protocol/DEFINITION_OF_DONE.md`:

1. Scope held — operational top section only.
2. Target behavior evidenced — metrics, attention, recent requests, quick actions, listings preserved.
3. Verification recorded — lint, typecheck, build, browser acceptance.
4. Diff hygiene — frontend only; known limitations documented.
5. Gates respected — separate commit/push/deploy/acceptance authorization.

---

## Closure Evidence (2026-08-19)

**Gate:** `TASK_013_CLOSURE_DOCUMENTATION_PASS`

**Closure baseline (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `3e13437c0185c2ad5e290e264925f050b43b2341` |
| origin/main | `3e13437c0185c2ad5e290e264925f050b43b2341` |
| divergence | `0 0` |
| Worktree | clean |

### Lifecycle (final)

| Stage | Status |
|-------|--------|
| Definition | COMPLETE |
| Implementation | COMPLETE |
| Local Verification | PASS |
| Commit | COMPLETE |
| Push | COMPLETE |
| Deployment | PASS |
| Production Acceptance | PASS |
| Closure | COMPLETE |
| Archive | NOT YET |

### Final implementation evidence

| Field | Value |
|-------|-------|
| Implementation SHA | `3e13437c0185c2ad5e290e264925f050b43b2341` |
| Commit message | `feat(realtor): add operational dashboard` |
| Deployment class | FRONTEND_ONLY |

**Runtime files (7 files in commit):**

- `frontend/app/realtor/page.tsx`
- `frontend/lib/realtorWorkspace.ts`
- `frontend/components/realtor/dashboard/DashboardMetrics.tsx`
- `frontend/components/realtor/dashboard/DashboardQuickActions.tsx`
- `frontend/components/realtor/dashboard/DashboardRecentPendingRequests.tsx`
- `frontend/components/realtor/dashboard/DashboardRequiresAttention.tsx`
- `docs/engineering/tasks/TASK-013-realtor-operational-dashboard-top-section.md`

### Metric contract — final evidence

TASK-013 delivers exactly four truthful metrics:

1. **Active Listings** — count loaded properties with `status === "available"`
2. **Pending Moderation** — count loaded properties with `status === "pending"`
3. **Pending Viewing Requests** — filtered API response **`total`**
4. **Accepted Viewing Requests** — filtered API response **`total`**

Explicit exclusions:

- no Rented metric
- no Reserved metric
- no fake leads/views/revenue metrics
- viewing-request totals are **not** derived from `items.length`

### Known property limitation (preserved)

`GET /realtor/properties` is capped at 100 items. Client-derived listing metrics are exact only within the loaded property set. TASK-013 intentionally did **not** introduce backend aggregation. This is a documented limitation, not a defect.

### Requires Attention — final contract

Supported actionable triggers:

- incomplete profile
- pending viewing requests
- missing property photos

**Pending Moderation is NOT a Requires Attention trigger.** It is informational/admin-moderated state without a dedicated dashboard action.

### Recent pending viewing requests — final contract

| Field | Value |
|-------|-------|
| Source | `GET /realtor/viewing-requests?status=pending&limit=5` |
| Display | up to 5 items, real backend order |
| Fields | property title, requester email, created date |
| Navigation | request detail link |
| Mutations | none — no Accept/Decline controls |
| Empty state | explicit when `total = 0` |

Local verification branches:

| Scenario | Result |
|----------|--------|
| Scenario B — pending > 0 | PASS |
| Scenario A — pending = 0 | PASS |
| Stale-state transition | PASS |

### Quick actions — final behavior

| Action | Condition | Target |
|--------|-----------|--------|
| Complete Profile (primary) | `!profile.is_completed` | `/realtor/profile` |
| Add Property (primary) | `profile.is_completed` | `/realtor/properties/create` |
| Review Viewing Requests (secondary) | pending VR `total > 0` | `/realtor/viewing-requests` |
| Manage Listings (secondary) | always | `/realtor#realtor-properties-heading` |

No unsupported destinations.

### Preserved workflows

TASK-013 preserved without business-logic rewrite:

- My Listings section
- search
- current/archived tabs
- listing cards
- bottom sheet
- archive / restore / delete
- lifecycle errors/loading
- listings hash anchor `#realtor-properties-heading`
- avatar upload/crop workflow
- TASK-012 shared shell
- TASK-012 nav/auth boundary

### Local verification evidence (summary)

| Category | Result |
|----------|--------|
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run build` | PASS |
| `git diff --check` | PASS |
| Desktop browser | PASS |
| Mobile browser | PASS |
| No horizontal overflow | PASS |
| Pending > 0 (Scenario B) | PASS |
| Pending = 0 (Scenario A) | PASS |
| Stale-state transition | PASS |
| My Listings regression | PASS |
| Avatar preservation | PASS |
| TASK-012 integration | PASS |

Local test/dev data mutation used only to create zero-pending scenario. **Production was not touched during local verification.**

### Scope result

TASK-013 converts the top of `/realtor` from a fragmented listings-oriented header into an operational dashboard using real Rento data. It now surfaces:

- operational listing state
- pending realtor workload
- accepted viewing-request volume
- actionable attention conditions
- recent pending requests
- contextual quick actions

without introducing unsupported analytics.

### Deferred / out of scope (preserved)

| Item | Status |
|------|--------|
| Full My Listings light-theme migration | NOT YET |
| Backend dashboard aggregation endpoint | NOT YET |
| Exact metrics beyond 100 properties | NOT YET |
| Recent listings panel | NOT YET |
| Clients / CRM | NOT YET |
| Documents dashboard | NOT YET |
| Messages | NOT YET |
| Tasks | NOT YET |
| Calendar | NOT YET |
| Analytics / revenue / leads / views / conversion | NOT YET |
| Avatar refactor | NOT YET |

TASK-014 was **not** created.

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE
LOCAL VERIFICATION      PASS
COMMIT                  COMPLETE
PUSH                    COMPLETE
DEPLOY                  PASS
PRODUCTION ACCEPTANCE   PASS
CLOSURE                 COMPLETE
ARCHIVE                 NOT YET
```

**Previous lifecycle:** VERIFYING (implementation + local verification recorded; commit/deploy/acceptance pending)

**Current gate:** `TASK_013_CLOSURE_DOCUMENTATION_PASS`

**Next gate:** `READY_FOR_TASK_013_CLOSURE_COMMIT`

Do not commit, push, archive, or deploy from this gate without separate authorization.
