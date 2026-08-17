# TASK-012 — Realtor Workspace Shell and Persistent Navigation

| Field | Value |
|-------|-------|
| ID | TASK-012 |
| TITLE | Realtor Workspace Shell and Persistent Navigation |
| STATUS | VERIFYING — local browser verification PASS |
| RISK | MEDIUM |
| CLASSIFICATION | Frontend workspace infrastructure / navigation |

> STATUS: VERIFYING means implementation is complete locally and verification evidence is recorded. Commit, push, deploy, production acceptance, closure, and archive are **not** authorized by this document.

**Initiative reference:** Realtor Workspace Evolution — Phase 1 discovery completed 2026-08-17 (`REALTOR_WORKSPACE_DISCOVERY_COMPLETE`).

**Repository baseline at definition (VERIFIED):**

| Field | Value |
|-------|-------|
| HEAD | `e08998e2159f932863a5b2567287d94bec5c3d3b` |
| origin/main | `e08998e2159f932863a5b2567287d94bec5c3d3b` |
| divergence | `0 0` |
| Active tasks before creation | none (`docs/engineering/tasks/README.md` only) |
| Prior task | TASK-011 — CLOSED / ARCHIVED / COMPLETE |

**Runtime note:** Production application runtime remains at implementation SHA `0c911ca4051f250f7d0a4c508656621f812f1d2a`. Repository HEAD and deployed application release identity must not be assumed identical. Docs-only commits ahead of production runtime are not deploy drift.

---

## Problem

**User problem:** A realtor moving through Rento currently experiences multiple disconnected pages rather than one coherent professional workspace.

**Structural defects (VERIFIED from repository inspection):**

1. No `frontend/app/realtor/layout.tsx` — each realtor page is self-contained.
2. No persistent workspace navigation across `/realtor/*`.
3. Global `BottomNav` is not rendered on `/realtor/*` routes (realtor tab leads in, but nav disappears inside workspace).
4. Navigation is fragmented across in-page links (dashboard cards, back links, header icons).
5. Frontend realtor access behavior is inconsistent:
   - `RealtorRoute` on profile, create, edit — redirect unauthenticated → `/login`, non-realtor → `/`
   - dashboard and viewing-requests — inline static “Login required” / “Access denied” cards without redirect
6. Realtor pages repeat dark/gold inline styling; accepted Workspace visual direction (light SaaS, Rento blue) is not applied at shell level.
7. Shared light UI primitives exist in `frontend/components/ui/*` but are unused in realtor area.

TASK-012 establishes one coherent Realtor Workspace **container** with persistent navigation and consistent access behavior. It does **not** redesign page contents.

---

## Current Behavior

### Existing realtor routes (VERIFIED)

| Route | File | Purpose |
|-------|------|---------|
| `/realtor` | `frontend/app/realtor/page.tsx` | Dashboard + listings hub |
| `/realtor/profile` | `frontend/app/realtor/profile/page.tsx` | Private profile editor |
| `/realtor/properties/create` | `frontend/app/realtor/properties/create/page.tsx` | Create listing wizard |
| `/realtor/properties/[id]/edit` | `frontend/app/realtor/properties/[id]/edit/page.tsx` | Edit listing + gallery |
| `/realtor/viewing-requests` | `frontend/app/realtor/viewing-requests/page.tsx` | Viewing inbox |
| `/realtor/viewing-requests/[id]` | `frontend/app/realtor/viewing-requests/[id]/page.tsx` | Relationship detail + documents |

**Related (outside workspace shell scope):**

| Route | Purpose |
|-------|---------|
| `/realtors/[userId]` | Public realtor profile |
| `/become-realtor` | Pre-role application flow |
| Post-login (`role=realtor`) | Redirect → `/realtor` (`frontend/app/login/page.tsx`) |

**No standalone route exists:** `/realtor/properties`.

### Layout hierarchy (VERIFIED)

```text
app/layout.tsx                    ← root only (AuthProvider, no nav shell)
└── app/realtor/**/page.tsx       ← NO layout.tsx, NO template.tsx
```

Each page defines its own `min-h-screen bg-[#1B1B1B]` shell inline.

### Auth patterns (VERIFIED)

| Pattern | Routes | Unauthenticated | Non-realtor |
|---------|--------|-----------------|-------------|
| `RealtorRoute` | profile, create, edit | redirect `/login` | redirect `/` |
| Inline cards | dashboard, viewing-requests list/detail | static card + link `/login` | static “Access denied” card |

Backend `require_realtor` on `/realtor/*` API routes remains authoritative regardless of frontend shell.

### Properties navigation anchor (VERIFIED)

Listings management hub lives on `/realtor`. Properties section has stable element id:

```text
id="realtor-properties-heading"   ← frontend/app/realtor/page.tsx
```

No `/realtor/properties` index route exists. Inventing one is **out of scope**.

### Reuse inventory (VERIFIED)

| Asset | Path | Relevance |
|-------|------|-----------|
| Light UI primitives | `frontend/components/ui/*` | SectionCard, PageHeader, StatusBadge, buttons — align with accepted light direction |
| RealtorRoute | `frontend/components/RealtorRoute.tsx` | Existing realtor guard; redirect semantics to preserve |
| ProtectedRoute + returnUrl | `frontend/components/ProtectedRoute.tsx`, `lib/returnUrl.ts` | Optional returnUrl enhancement using existing utilities |
| BottomNav | `frontend/components/BottomNav.tsx` | Consumer nav; **unsuitable** for workspace (not rendered on `/realtor/*`, wrong IA) |
| PageShell | `frontend/components/ui/PageShell.tsx` | Consumer mobile shell; max-width `max-w-md` — **not suitable** as workspace shell |
| realtorWorkspace utils | `frontend/lib/realtorWorkspace.ts` | Candidate for nav config export |
| lucide-react icons | dependency | Navigation icons |
| AuthContext | `frontend/context/AuthContext.tsx` | `user`, `isRealtor`, `isAuthenticated` |

**Frontend test infrastructure:** no `*.test.*` files under `frontend/` (VERIFIED). Meaningful unit-test RED is **NOT APPLICABLE**.

---

## Target Behavior

Introduce a shared Realtor Workspace shell wrapping all `/realtor/*` page content:

```text
RealtorWorkspaceShell
├── Desktop Sidebar (persistent)
├── Workspace Header
├── Mobile Navigation (drawer/sheet — no permanent wide sidebar)
└── {children} — existing page content unchanged functionally
```

### Visual shell (authorized)

Apply accepted visual direction to **shell only**:

- premium light SaaS workspace (`bg-zinc-50` / white surfaces)
- Rento blue primary accent (`blue-700` family — consistent with light BottomNav variant)
- subtle neutral borders, restrained shadows
- soft selected navigation states
- professional rounded cards in nav/header chrome
- clear typography hierarchy

**Page content inside `{children}` may retain current dark/gold internal styling temporarily.** TASK-012 must not expand into full content migration.

### Post-TASK-012 product state (explicit boundary)

```text
Professional Workspace shell: YES
Persistent navigation: YES
Accepted light shell direction: YES
Existing realtor functionality: preserved
Operational Dashboard v1 metrics: NOT YET
Properties full workspace redesign: NOT YET
Viewing Requests full redesign: NOT YET
Clients: NOT YET
Documents hub: NOT YET
Analytics: NOT YET
```

**Expected next product increment (not authorized here):** Operational Dashboard v1.

---

## Navigation Contract

### Navigation v1 — real destinations only

| Group | Label | href | Exists | Notes |
|-------|-------|------|--------|-------|
| Overview | Dashboard | `/realtor` | YES | Default landing |
| Work | Properties | `/realtor#realtor-properties-heading` | YES | Anchor to listings section on dashboard; **do not invent** `/realtor/properties` |
| Work | Viewing Requests | `/realtor/viewing-requests` | YES | Inbox |
| Account | Profile | `/realtor/profile` | YES | Private editor |
| Account | Public Profile | `/realtors/{userId}` | YES | Uses authenticated `user.id`; external to `/realtor/*` prefix |

**Public Profile placement:** Account group in sidebar (secondary item). Opens public profile in same tab. Not a workspace route prefix — no persistent “active” state required when viewing public profile.

**Excluded navigation items (must NOT appear):** Messages, Tasks, Calendar, Clients, Documents hub, Reports, Performance, Leads, any metric-driven destinations.

### Active navigation rules

Route-group matching (not exact pathname equality only):

| Active nav item | Active when |
|-----------------|-------------|
| Dashboard | `pathname === "/realtor"` (including `/realtor#realtor-properties-heading`; hash scroll does not change active nav) |
| Properties | `pathname.startsWith("/realtor/properties/")` (e.g. create, edit) |
| Viewing Requests | `pathname === "/realtor/viewing-requests"` OR `pathname.startsWith("/realtor/viewing-requests/")` |
| Profile | `pathname === "/realtor/profile"` |
| Public Profile | never highlighted as workspace-active (external consumer route) |

Implementation uses `usePathname()` only. Properties hash navigation (`/realtor#realtor-properties-heading`) scrolls to the listings section; it does not activate Properties in the nav.

---

## Authorization Contract

Centralize realtor-area frontend access at `frontend/app/realtor/layout.tsx` (client boundary).

### Expected behavior

| Caller | Behavior |
|--------|----------|
| Authenticated realtor | Render workspace shell + `{children}` |
| Unauthenticated | Redirect to login using existing Rento semantics. **Baseline:** match `RealtorRoute` → `/login`. **Permitted enhancement:** use existing `buildLoginHref(pathname)` + `sanitizeReturnUrl` from `lib/returnUrl.ts` (same utilities as `ProtectedRoute`) — not a new URL invention |
| Authenticated non-realtor | Redirect to `/` (match `RealtorRoute`) |
| Loading | Skeleton consistent with workspace shell (not page-specific dark skeleton) |

### Implementation notes

- Layout owns auth guard; remove redundant `RealtorRoute` wrappers from profile, create, edit pages during implementation to avoid double-guarding.
- Dashboard and viewing-requests inline auth cards become unnecessary once layout guard is active — replace with layout redirect/skeleton; do not leave duplicate auth UI.
- **Backend authorization unchanged.** No API or `require_realtor` modifications.

---

## Responsive Contract

### Desktop (≥1024px)

- Persistent left sidebar with navigation groups (Overview, Work, Account)
- Workspace header above main content (identity area, optional public profile shortcut)
- Main content area constrained; existing page `max-w-[1280px]` content must not be obscured by sidebar
- Clear active navigation state

### Tablet (768px–1023px)

- Compact sidebar OR collapsible icon rail (implementation choice — prefer simplest bounded approach)
- Header remains visible
- Content usable without horizontal overflow

### Mobile (<768px)

- **No** permanent wide sidebar
- Navigation via drawer/sheet/menu trigger in header
- Touch targets ≥44px
- No horizontal page overflow caused by shell
- Existing page actions (fixed bottom bars on edit, bottom sheets) must remain reachable — shell must not block `z-index` stacking of existing overlays

**BottomNav:** do **not** force consumer BottomNav into workspace. Workspace owns its own mobile nav.

---

## In Scope

1. Create `frontend/app/realtor/layout.tsx` — shared workspace layout with auth boundary.
2. Create workspace shell component(s) under `frontend/components/realtor/workspace/` (exact count minimized — prefer one shell file + small nav config unless separation improves clarity).
3. Implement persistent desktop sidebar with navigation v1 (real routes only).
4. Implement mobile navigation (drawer/sheet).
5. Implement workspace header (light theme, Rento blue accent).
6. Apply accepted visual direction to shell chrome only.
7. Implement active route-group navigation highlighting.
8. Centralize realtor frontend auth guard at layout; remove duplicate page-level guards where safe.
9. Export navigation config from `frontend/lib/realtorWorkspace.ts` (or colocated config module).
10. Preserve all existing page business behavior and API usage.
11. Local verification: lint, typecheck, build, manual browser acceptance.

---

## Out of Scope

| Item | Status |
|------|--------|
| Dashboard metric redesign | OUT OF SCOPE |
| New viewing-request metrics / Requires Attention | OUT OF SCOPE |
| Recent activity sections | OUT OF SCOPE |
| New backend endpoints | OUT OF SCOPE |
| Backend / database / migration changes | OUT OF SCOPE |
| Clients / relationships page | OUT OF SCOPE |
| Standalone documents page | OUT OF SCOPE |
| Messages, Tasks, Calendar, Reports | OUT OF SCOPE |
| Performance analytics, property views, leads, revenue | OUT OF SCOPE |
| Fake metrics or placeholder data | OUT OF SCOPE |
| Full restyling of realtor page contents (dark → light) | OUT OF SCOPE |
| Property form redesign | OUT OF SCOPE |
| Viewing-request content redesign | OUT OF SCOPE |
| Profile editor content redesign | OUT OF SCOPE |
| Avatar crop deduplication | OUT OF SCOPE |
| Inventing `/realtor/properties` route | OUT OF SCOPE |
| BottomNav integration inside workspace | OUT OF SCOPE |
| New external UI library | OUT OF SCOPE |
| Production deployment | OUT OF SCOPE |

---

## Page Content Preservation (Acceptance-critical)

The shell wraps pages; it must **not** alter business contracts:

| Workflow | Must remain functional |
|----------|------------------------|
| Dashboard listings hub | search, tabs, archive/restore/delete, avatar upload |
| Property create wizard | all steps, profile gate |
| Property edit + gallery | save, DnD gallery, fixed bottom bar |
| Viewing-request list | accept/decline, navigation to detail |
| Viewing-request detail | relationship view, rental documents |
| Profile editor | all fields, avatar crop, save |
| Public profile link | `/realtors/{userId}` reachable |

---

## Affected Layers

| Layer | Role |
|-------|------|
| Frontend layout | `app/realtor/layout.tsx` (new) |
| Frontend components | workspace shell (new), possible nav config |
| Frontend pages | minor wrapper/guard removal only; **no business logic changes** |
| Frontend lib | nav config in `realtorWorkspace.ts` |
| Backend | **NOT touched** |
| Database | **NOT touched** |
| Tests | manual browser acceptance; no new test files required |

---

## Expected Implementation Surface

Likely files (expectation only — minimize component count):

| File | Expected change |
|------|-------------------|
| `frontend/app/realtor/layout.tsx` | **new** — layout + auth boundary |
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | **new** — shell, sidebar, header, mobile nav |
| `frontend/lib/realtorWorkspace.ts` | nav config + active-route helpers |
| `frontend/app/realtor/profile/page.tsx` | remove `RealtorRoute` wrapper |
| `frontend/app/realtor/properties/create/page.tsx` | remove `RealtorRoute` wrapper |
| `frontend/app/realtor/properties/[id]/edit/page.tsx` | remove `RealtorRoute` wrapper |
| `frontend/app/realtor/page.tsx` | remove inline auth cards if layout handles guard |
| `frontend/app/realtor/viewing-requests/page.tsx` | remove inline auth cards |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | remove inline auth cards |

Expected **not** changed:

- `backend/**`
- API client (`frontend/services/api.ts`) — unless trivial import unused after guard removal
- Business logic in page components
- `BottomNav`, consumer routes

---

## Reuse Strategy

Priority order:

1. **Reuse** — `components/ui/PageHeader`, `PrimaryButton`, `SecondaryButton`, `StatusBadge` styling patterns; `RealtorRoute` redirect semantics; `AuthContext`; `buildLoginHref` / `sanitizeReturnUrl`; lucide-react icons; Tailwind utilities already in project.
2. **Small extension** — nav config + active-route helpers in `realtorWorkspace.ts`.
3. **New component** — `RealtorWorkspaceShell` only where no existing primitive fits (sidebar + responsive drawer).

Do **not** adopt `PageShell` (consumer mobile max-width). Do **not** adopt `BottomNav` for workspace.

---

## RED / Pre-Implementation Evidence

No suitable frontend unit-test infrastructure exists. Valid RED for this task is **structural absence**, not failing pytest.

### RED conditions (VERIFIED — current state)

| Evidence | Status |
|----------|--------|
| `frontend/app/realtor/layout.tsx` exists | **FAIL** — file absent |
| Persistent navigation on all `/realtor/*` routes | **FAIL** — none |
| Navigation survives route changes within workspace | **FAIL** — only in-page links |
| Active workspace route context | **FAIL** — no nav component |
| Consistent frontend auth guard | **FAIL** — mixed RealtorRoute vs inline cards |
| Light workspace shell direction | **FAIL** — dark per-page shells only |

**RED result:** PASS — structural defects documented and reproducible by inspection.

### GREEN criteria (post-implementation)

- `layout.tsx` exists and wraps all `/realtor/*` pages
- Sidebar visible on desktop; mobile nav accessible
- All navigation v1 destinations reachable
- Active state correct per route-group rules
- Auth redirects work for unauthenticated and non-realtor
- Existing workflows unchanged (manual regression)
- lint + typecheck + build PASS

---

## Verification Plan

### Static / local

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
```

Review diff for:

- backend files untouched
- no new dependencies
- no API contract changes
- no unrelated page content restyling

### Browser acceptance — Desktop

| Check | Expected |
|-------|----------|
| Sidebar visible on `/realtor` | YES |
| Navigate Dashboard → Properties anchor → Viewing Requests → Profile | all reachable |
| Active state updates correctly | per route-group rules |
| Header renders with identity area | YES |
| Page content not obscured by sidebar | YES |
| Public Profile link uses `/realtors/{userId}` | YES |

### Browser acceptance — Mobile

| Check | Expected |
|-------|----------|
| No permanent wide sidebar | YES |
| Menu opens/closes | YES |
| Route navigation works from mobile menu | YES |
| No horizontal overflow from shell | YES |
| Edit page fixed bottom Save bar still usable | YES |

### Authorization

| Scenario | Expected |
|----------|----------|
| Authenticated realtor | workspace renders |
| Unauthenticated direct URL to `/realtor/*` | redirect login (not static card) |
| Authenticated `role=user` on `/realtor/*` | redirect `/` |

### Regression routes (minimum)

- `/realtor`
- `/realtor/profile`
- `/realtor/properties/create`
- `/realtor/properties/[id]/edit` (use accessible fixture id)
- `/realtor/viewing-requests`
- `/realtor/viewing-requests/[id]` (use accessible fixture id)

No business-data mutation required for navigation verification.

---

## Acceptance Contract

TASK-012 is successful when all are true:

1. All current `/realtor/*` pages render inside one consistent Workspace shell.
2. Persistent desktop navigation exists with navigation v1 items only.
3. Mobile navigation exists (drawer/sheet).
4. Current route is visibly identified (active state).
5. Existing routes remain reachable without new routes invented.
6. Existing page business behavior is unchanged.
7. Workspace shell follows accepted light / Rento-blue visual direction.
8. No unsupported navigation items are shown.
9. No fake metrics or data are introduced.
10. Backend/API contracts unchanged; backend files untouched.
11. No migration required.
12. Mobile has no horizontal overflow caused by shell.
13. Frontend auth guard is consistent at layout boundary.
14. `npm run lint`, `npm run typecheck`, `npm run build` PASS.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | Frontend-only |
| Migration | NONE | |
| Backend | NONE | |
| API | NONE | |
| Authentication | LOW–MEDIUM | Frontend redirect normalization; must verify unauthenticated and non-realtor paths |
| Authorization | LOW | Backend unchanged; layout guard must not expose workspace chrome to denied users |
| Frontend | MEDIUM | Shell affects all realtor routes; z-index/padding conflicts with fixed bars and modals |
| Production | MEDIUM–LOW | Frontend-only deploy when authorized; visual shell change is user-visible |
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

**Application rollback:** revert TASK-012 frontend change and redeploy previous verified frontend image. Workspace reverts to per-page dark shells without persistent nav.

---

## Definition of Done (TASK-012)

Per `docs/engineering/protocol/DEFINITION_OF_DONE.md`:

1. Scope held — shell + nav only.
2. Target behavior evidenced — layout exists, nav persistent, auth unified.
3. Verification recorded — lint, typecheck, build, browser acceptance.
4. Diff hygiene reviewed — frontend only, no backend/migration/deps.
5. Gates respected — separate commit/push/deploy/acceptance authorization.

Production acceptance applies only after authorized frontend deploy.

---

## Follow-up (explicitly not TASK-012)

| Item | Notes |
|------|-------|
| Operational Dashboard v1 | Pending viewing-request metrics, Requires Attention — next product increment |
| Properties page light-theme migration | Phase 2 |
| Viewing Requests inbox redesign | Phase 3 |
| Clients / Documents hub | Later phases |
| Avatar crop deduplication | Separate refactor |
| `rento-phases.mdc` phase marker update | Governance — stale relative to implemented realtor dashboard |

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE (local)
VERIFICATION            COMPLETE (local static + browser)
COMMIT                  NOT YET
PUSH                    NOT YET
DEPLOY                  NOT YET
PRODUCTION ACCEPTANCE   NOT YET
CLOSURE                 NOT YET
ARCHIVE                 NOT YET
```

**Current gate:** `TASK_012_LOCAL_BROWSER_VERIFICATION_PASS`

**Next gate:** `READY_FOR_TASK_012_COMMIT`. Do not stage, commit, push, or deploy from this update.

---

## Implementation Result

**Date:** 2026-08-17

### Files created (VERIFIED)

| File | Purpose |
|------|---------|
| `frontend/app/realtor/layout.tsx` | Shared layout with auth boundary + workspace shell wrapper |
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | Light workspace chrome: desktop sidebar, header, mobile drawer nav |

### Files modified (VERIFIED)

| File | Change |
|------|--------|
| `frontend/lib/realtorWorkspace.ts` | Nav config, active-route helper, properties anchor helpers |
| `frontend/app/realtor/page.tsx` | Removed inline auth cards; properties hash scroll on load |
| `frontend/app/realtor/profile/page.tsx` | Removed `RealtorRoute` wrapper |
| `frontend/app/realtor/properties/create/page.tsx` | Removed `RealtorRoute` wrapper |
| `frontend/app/realtor/properties/[id]/edit/page.tsx` | Removed `RealtorRoute` wrapper |
| `frontend/app/realtor/viewing-requests/page.tsx` | Removed inline auth cards |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | Removed inline auth cards |

### Auth boundary (VERIFIED FROM CODE)

Centralized in `frontend/app/realtor/layout.tsx`:

| Caller | Behavior |
|--------|----------|
| Authenticated realtor | Workspace shell + children |
| Unauthenticated | Redirect via `buildLoginHref(pathname)` + `sanitizeReturnUrl` |
| Authenticated non-realtor | Redirect `/` |
| Loading / denied | Light workspace skeleton |

Matches `RealtorRoute` semantics with returnUrl enhancement (existing `lib/returnUrl.ts` utilities).

### Navigation v1 (VERIFIED FROM CODE)

| Item | Target |
|------|--------|
| Dashboard | `/realtor` |
| Properties | `/realtor#realtor-properties-heading` (scroll on same-page click) |
| Viewing Requests | `/realtor/viewing-requests` |
| Profile | `/realtor/profile` |
| Public Profile | `/realtors/{user.id}` when user id available |

### Active navigation (VERIFIED FROM CODE)

| Route pattern | Active item |
|---------------|-------------|
| `/realtor` | Dashboard |
| `/realtor/properties/*` | Properties |
| `/realtor/viewing-requests` (+ descendants) | Viewing Requests |
| `/realtor/profile` | Profile |

Properties anchor on root dashboard does **not** persist Properties active state (deterministic rule per implementation gate).

### Local verification (VERIFIED FROM EXECUTION)

```bash
cd frontend
npm run lint      # PASS — 0 errors (4 pre-existing warnings in unrelated files)
npm run typecheck # PASS
npm run build     # PASS
git diff --check  # clean
```

### Scope audit (VERIFIED)

Runtime files changed: **9** (2 new, 7 modified frontend)

Unchanged: backend, database, migrations, API client contracts, consumer BottomNav, dashboard metrics content.

### Browser verification

**Status:** VERIFIED — local browser gate executed 2026-08-17.

#### Local runtime

| Field | Value |
|-------|-------|
| Frontend URL | `http://localhost:3000` |
| Backend/API URL | `http://localhost:8000` |
| Startup | Backend: `python -m uvicorn app.main:app --host 127.0.0.1 --port 8000`; Frontend: `NEXT_PUBLIC_API_URL=http://localhost:8000 npm run dev -- --port 3000` |
| DB | Local dev (via `backend/.env`) |
| Cookie alignment | Frontend and browser on `localhost`; API on `localhost:8000` (required for session cookies in dev) |

#### Fixtures

Local realtor fixture:

- Email: `verify-realtor@example.com`
- ID: 1
- Role: realtor
- Fixture routes: property edit `/realtor/properties/1/edit`; viewing detail `/realtor/viewing-requests/1`

Local renter fixture:

- Email: `verify-renter@example.com`
- ID: 2
- Role: user
- Purpose: auth boundary test

Credentials: local development fixtures; passwords intentionally not recorded in repository evidence.

Current-user API (realtor session): `GET /users/me` → 200, `role=realtor`, `id=1`, `email=verify-realtor@example.com`.

#### Viewports tested

| Viewport | Size | Result |
|----------|------|--------|
| Desktop | 1280×900 | PASS — persistent sidebar, header, content not obscured, light shell + dark inner pages |
| Tablet | 900×900 (768–1023 band) | PASS — desktop sidebar hidden; mobile menu trigger; content readable; no shell overlap |
| Mobile | 390×844 | PASS — menu trigger, drawer, nav items, close on route select; no horizontal overflow (`docWidth === viewportWidth === 390`) |

#### Route matrix (authenticated realtor)

| Route | Result | Evidence |
|-------|--------|----------|
| `/realtor` | PASS | Shell + sidebar + header; Dashboard active; dashboard/listings content rendered |
| `/realtor/profile` | PASS | Shell persists; Profile active; profile form controls reachable |
| `/realtor/properties/create` | PASS | Shell persists; Properties active (post-fix); create form + map render |
| `/realtor/properties/1/edit` | PASS | Shell persists; Properties active (post-fix); edit form + gallery upload reachable |
| `/realtor/viewing-requests` | PASS | Shell persists; Viewing Requests active; list + Accept/Decline visible |
| `/realtor/viewing-requests/1` | PASS | Shell persists; Viewing Requests active; detail + Open property + Accept/Decline reachable |

#### Navigation

| Item | Result | Notes |
|------|--------|-------|
| Dashboard | PASS | From property edit → `/realtor`, Dashboard active |
| Properties | PASS | Same-page + cross-route hash navigation (see below) |
| Viewing Requests | PASS | Reachable from shell; active on list + detail |
| Profile | PASS | Reachable; active on `/realtor/profile`; mobile drawer closes on select |
| Public Profile | PASS | Nav href `/realtors/1` (dynamic user id); destination reachable (`Jane Agent · Rento`) |

#### Active states

| Route | Expected | Observed |
|-------|----------|----------|
| `/realtor` | Dashboard | PASS |
| `/realtor#realtor-properties-heading` | Dashboard (hash does not persist Properties active) | PASS |
| `/realtor/profile` | Profile | PASS |
| `/realtor/viewing-requests` | Viewing Requests | PASS |
| `/realtor/viewing-requests/1` | Viewing Requests | PASS |
| `/realtor/properties/create` | Properties | PASS (after fix) |
| `/realtor/properties/1/edit` | Properties | PASS (after fix) |

No double-active state observed.

#### Properties anchor (mandatory)

| Case | Start | Result | URL | Scroll |
|------|-------|--------|-----|--------|
| A — same-page | `/realtor` | PASS | `/realtor#realtor-properties-heading` | Section scrolled into view; Dashboard remains active |
| B — cross-route (profile) | `/realtor/profile` | PASS | `/realtor#realtor-properties-heading` | Scroll after data load |
| B — cross-route (viewing-requests) | `/realtor/viewing-requests` | PASS | `/realtor#realtor-properties-heading` | `scrollY≈456`, section visible post-load |

#### Authorization

| Scenario | Result | Observed destination |
|----------|--------|----------------------|
| Authenticated realtor | VERIFIED | Workspace renders on all `/realtor/*` routes tested |
| Unauthenticated `/realtor` | VERIFIED | `/login?returnUrl=%2Frealtor` — no workspace content |
| Unauthenticated `/realtor/viewing-requests` | VERIFIED | `/login?returnUrl=%2Frealtor%2Fviewing-requests` |
| Authenticated non-realtor (`role=user`) | VERIFIED | Redirect `/` — no workspace content |

#### Console / network

| Check | Result |
|-------|--------|
| Uncaught frontend exceptions | None observed during realtor route matrix |
| Hydration errors | None observed on `localhost:3000` with aligned API host |
| Unexpected 500 responses | None during authenticated realtor flows |
| Redirect loops | None |
| Expected 401 on logout/unauthenticated | Semantically correct |

**Dev note:** Session cookies fail when browser is on `localhost:3000` but `NEXT_PUBLIC_API_URL` points to `127.0.0.1:8000`. Local verification used matching `localhost` hosts.

#### Workflow preservation

PASS — profile form, property create/edit forms, viewing list/detail controls, and action buttons remain reachable; shell does not cover fixed actions or disable controls. No business mutations performed for layout verification.

#### Defects found and fixed (browser gate)

| # | Symptom | Root cause | Fix | Retest |
|---|---------|------------|-----|--------|
| 1 | Properties nav never active on `/realtor/properties/*` | `isActive` excluded Properties hash link unconditionally | Remove `!isPropertiesLink` guard in `RealtorWorkspaceShell.tsx` | PASS on create + edit |
| 2 | Same-page Properties click did not set URL hash | `preventDefault` without history update | `history.replaceState` to `REALTOR_PROPERTIES_HREF` on same-page click | PASS — URL includes hash |
| 3 | Cross-route Properties navigation did not scroll to section | Hash scroll `useEffect` ran before dashboard data loaded | Defer scroll until `isDataLoading === false` in `page.tsx` | PASS from profile + viewing-requests |

#### Post-fix static reverification (VERIFIED)

```bash
cd frontend
npm run lint      # PASS — 0 errors (4 pre-existing warnings)
npm run typecheck # PASS
npm run build     # PASS
git diff --check  # PASS
```

#### Browser gate verdict

**`TASK_012_LOCAL_BROWSER_VERIFICATION_PASS`**

**Next gate:** `READY_FOR_TASK_012_COMMIT`
