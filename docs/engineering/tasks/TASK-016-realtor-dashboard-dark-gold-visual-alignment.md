# TASK-016 — Realtor Dashboard Dark/Gold Visual Alignment

| Field | Value |
|-------|-------|
| ID | TASK-016 |
| TITLE | Realtor Dashboard Dark/Gold Visual Alignment |
| STATUS | VERIFYING |
| RISK | MEDIUM |
| CLASSIFICATION | Frontend presentation-only alignment / realtor operational Dashboard |

> STATUS: VERIFYING means implementation and local verification are complete and under review. **COMMIT NOT AUTHORIZED.** Nothing has been staged, committed, pushed, deployed, or accepted.

**Lifecycle at 2026-08-20 (implementation gate):**

| Stage | State |
|-------|-------|
| Discovery | COMPLETE — `NEXT_VISUAL_INCREMENT_DISCOVERY_COMPLETE` |
| Definition | COMPLETE — `TASK_016_DEFINITION_COMPLETE` |
| Implementation | COMPLETE (this gate) |
| Local Verification | COMPLETE (this gate) |
| Commit | NOT AUTHORIZED |
| Push | NOT AUTHORIZED |
| Deploy | NOT AUTHORIZED |
| Production Acceptance | NOT AUTHORIZED |

**Initiative reference:** Next visual increment discovery (2026-08-20) selected OPTION B — Dashboard vertical slice. Prior closed increment: TASK-015 — Realtor Workspace Shell Dark/Gold Visual Alignment (CLOSED / ARCHIVED / COMPLETE).

**Repository baseline at definition (VERIFIED 2026-08-20):**

| Field | Value |
|-------|-------|
| HEAD | `5814d7e644f3522031c9faeb1d5e096a4997b889` |
| origin/main | `5814d7e644f3522031c9faeb1d5e096a4997b889` |
| divergence | `0 0` |
| Worktree before this document | clean |
| Active tasks before creation | `docs/engineering/tasks/README.md` only |
| Prior task | TASK-015 — CLOSED / ARCHIVED / COMPLETE |
| TASK-016 identifier | free (historical “NOT CREATED” / “OUT OF SCOPE” mentions inside archived TASK-015 are not a collision) |

**Runtime note:** Production frontend runtime remains on the TASK-015 implementation SHA `264e478eae30cc18ca8d22701e77ae00876f6df8`. Repository HEAD additionally contains TASK-015 closure/archive documentation commits. This is expected and must not be treated as deployment drift. Production was not accessed during this definition gate.

---

## Product Direction

Rento uses a premium **DARK / GOLD** visual language. Dark/gold is the **target** design system, not legacy styling.

TASK-015 aligned the persistent Realtor Workspace **shell**. My Listings on `/realtor` is already dark/gold. The operational Dashboard top of `/realtor` remains the light/blue TASK-013 treatment.

TASK-016 is **presentation-only**. It is not:

- a full Realtor recolor;
- a whole-site dark mode;
- a design-system / token migration;
- a Viewing Requests migration;
- a My Listings redesign.

---

## Problem

**User problem:** A realtor opening `/realtor` currently moves through three stacked visual languages inside one primary workspace:

```text
dark/gold persistent shell   (TASK-015 — accepted)
→ light/blue operational Dashboard
→ dark/gold My Listings      (already aligned)
```

That sandwich is a product-level inconsistency. The home route of the realtor workspace no longer matches the accepted shell or the listings content that already uses the Rento palette.

**Current operational surfaces that remain light/blue (VERIFIED 2026-08-20):**

| Surface | File | Current styling |
|---------|------|-----------------|
| Operational wrapper | `frontend/app/realtor/page.tsx:54–55, 702` | no own background; inherits shell D1 `bg-zinc-50` |
| Loading skeleton (top) | `page.tsx:220–238` | `bg-zinc-200` pulse |
| Load error | `page.tsx:687–697` | `border-red-200 bg-red-50 text-red-700` |
| Welcome header | `page.tsx:703–790` | `border-zinc-200 bg-white shadow-sm`; zinc text |
| Avatar chrome | `page.tsx:715–739` | `bg-zinc-50`, `text-blue-700`, `ring-blue-700` |
| Verified badge | `page.tsx:68–69` | named gold; styled `bg-blue-50 text-blue-700` |
| Verification-soon badge | `page.tsx:71–72` | `bg-zinc-100 text-zinc-500` |
| Profile pencil | `page.tsx:74–75` | `bg-white` + `ring-blue-700` |
| Add Property / Complete Profile | `DashboardQuickActions.tsx` → `PrimaryButton` | `bg-blue-700 text-white` |
| Manage Listings / Review Viewing Requests | `DashboardQuickActions.tsx` → `SecondaryButton` | `bg-white border-zinc-200` |
| Metric cards | `DashboardMetrics.tsx:39–44` | `bg-white border-zinc-200` |
| Requires attention | `DashboardRequiresAttention.tsx` → `SectionCard` / `EmptyState` | white card; urgent rows `bg-amber-50/60`; `ring-blue-700` |
| Recent pending | `DashboardRecentPendingRequests.tsx` → `SectionCard` / `EmptyState` | white card; `text-blue-700` “View all”; `ring-blue-700` |

---

## Target Outcome

The **operational portion** of `/realtor` becomes visually aligned with the existing Rento dark/gold system. All current Dashboard behavior is preserved.

Target palette (existing code — do not invent a second gold):

```text
#1B1B1B     primary background
#252525     base surface
#2D2D2D     elevated surface
#DFC58A     gold brand / primary emphasis / focus
#F5F5F5     primary text
#B8B8B8     muted text
white/8
white/10    restrained borders
```

Gold expresses brand, primary CTA, Verified emphasis, and focus only. Semantic amber/red/green remain semantic. Gold must not replace status meaning.

---

## Discovery Decision

Selected: **OPTION B — Dashboard vertical slice.**

Reason:

- solves the complete operational Dashboard inconsistency;
- bounded to five runtime files;
- avoids shared UI blast radius;
- keeps Viewing Requests independent;
- keeps My Listings unchanged;
- frontend-only;
- no prerequisite refactor required.

Rejected:

| Option | Reason |
|--------|--------|
| A — page-only | insufficient: cards and CTAs are owned by dashboard components / shared primitives |
| C — shared UI changes | excessive blast radius into Viewing Requests |
| D — Dashboard + Viewing Requests | too broad for one production-ready task |

---

## Current Behavior

`frontend/app/realtor/page.tsx` orchestrates data, listing lifecycle, avatar crop, and two visual worlds in one file.

Operational Dashboard ends at the close of `dashboardContainerClassName` (`page.tsx:811`). My Listings begins at `<section className={listingsShellClassName}>` (`page.tsx:813`) and is already `bg-[#1B1B1B] text-[#F5F5F5]`.

The page currently has **no** full-bleed dark wrapper for the operational zone. The TASK-015 shell `main` remains `bg-zinc-50 text-zinc-900` (deviation D1). Viewing Requests still depends on that inherited light surface.

Dashboard components compose light shared primitives:

- `PrimaryButton` / `SecondaryButton` — also used by `ViewingRequestListCard`
- `SectionCard` / `EmptyState` — also used by Viewing Requests inbox and detail wrapper

Those primitives concatenate `className` without `twMerge`. Color override through `className` is unreliable. `EmptyState` has no `className` prop.

---

## Target Behavior

Operational Dashboard surfaces on `/realtor` use the target palette. The page locally covers inherited D1 so no zinc-50 gutter remains around Dashboard. My Listings internals, avatar crop modal, Viewing Requests routes, and `components/ui/*` implementations are unchanged.

Visual reference (existing code — copy established patterns, do not invent):

| Role | Reference |
|------|-----------|
| Page surface | `frontend/app/realtor/profile/page.tsx:34–40` (`bg-[#1B1B1B]`, elevated `#2D2D2D` cards, `#252525` surfaces) |
| Gold primary CTA + dark text | `profile/page.tsx:45–46`, `PropertyEmptyState.tsx:18–19`, `ConfirmDialog.tsx:18–19` |
| Dark secondary control | `ConfirmDialog.tsx:24–25` (`border-white/10 bg-[#252525] text-[#F5F5F5]`) |
| Gold / muted badges | `profile/page.tsx:56–60` |
| Dark semantic error | `page.tsx:65–66` (`workspaceErrorClassName`) and `profile/page.tsx:62–63` |
| Dark skeleton pulse | `frontend/app/realtor/layout.tsx:19–25`, `PropertyListSkeleton.tsx:11–18` (`bg-white/10`) |

Inside the shell, prefer `min-h-full` over `min-h-screen` so the sticky header is not added on top of a second 100vh.

---

## Exact Runtime File Scope

Authorized expected runtime files — **exactly five**:

1. `frontend/app/realtor/page.tsx`
2. `frontend/components/realtor/dashboard/DashboardQuickActions.tsx`
3. `frontend/components/realtor/dashboard/DashboardMetrics.tsx`
4. `frontend/components/realtor/dashboard/DashboardRequiresAttention.tsx`
5. `frontend/components/realtor/dashboard/DashboardRecentPendingRequests.tsx`

No optional runtime files.

Any need for a sixth runtime file is **SCOPE EXPANSION**. Implementation must STOP.

Task document (this file):

- `docs/engineering/tasks/TASK-016-realtor-dashboard-dark-gold-visual-alignment.md`

---

## In Scope

### `frontend/app/realtor/page.tsx` (presentation belonging to operational Dashboard only)

1. One local page wrapper that owns the content surface and covers D1:
   - `min-h-full bg-[#1B1B1B] text-[#F5F5F5]` (or equivalent proven local structure);
   - may surround operational Dashboard **and** My Listings **only** as a continuous background / D1-coverage wrapper;
   - must **not** restyle My Listings internals.
2. Loading-state visual treatment (top `bg-zinc-200` pulses → dark-compatible pulses). Preserve dimensions, `role="status"`, `aria-live`, reduced-motion, and loading semantics. My Listings loading (`PropertyListSkeleton` inside `listingsShellClassName`) remains unchanged unless the wrapper naturally surrounds it.
3. Load-error visual treatment: dark-compatible semantic red (reuse `workspaceErrorClassName` / profile `errorAlertClassName` pattern). Message and behavior unchanged. Short error branch must still cover D1 (`min-h-full` on that branch).
4. Welcome / operational header card, greeting text, supporting text.
5. Avatar frame/control and avatar loading chrome (not the crop modal).
6. Verified badge (brand → gold) and verification-soon badge (muted dark).
7. Profile pencil visual treatment and focus.
8. Operational layout surface (container padding/background continuity into My Listings).

Do **not** alter greeting logic, profile name, avatar upload/crop/zoom/pan/save/cancel/MIME behavior, profile-completion behavior, pencil destination, or labels/aria semantics.

### `DashboardQuickActions.tsx`

9. Stop using `PrimaryButton` / `SecondaryButton`. Replace Dashboard-only usage with local button/link styling.
10. Primary: Add Property **or** Complete Profile — gold fill `#DFC58A`, text `#1B1B1B`, gold/dark focus. Preserve href selection, `canCreateListing` condition, `h-12` / full-width mobile usability.
11. Secondary: Manage Listings and conditional Review Viewing Requests — dark surface, subtle border, `#F5F5F5` text, gold focus, no blue. Preserve hrefs, conditional render, and action hierarchy.

### `DashboardMetrics.tsx`

12. Align all four metric cards to dark surfaces (`#252525` or `#2D2D2D`), restrained `white/8` or `white/10` borders, `#F5F5F5` values, `#B8B8B8` labels. No blue. No semantic color inference. Preserve counts, labels, grid (`grid-cols-2` / `lg:grid-cols-4`), and calculations.

### `DashboardRequiresAttention.tsx`

13. Dark Dashboard-owned section/card. Stop using shared `SectionCard` / `EmptyState`; implement local presentation.
14. Preserve heading, item ordering, item count, empty behavior, links, and `urgent` / `default` classification.
15. Urgent: retain semantic amber, adapted to dark (muted amber border/surface, readable text). Default: neutral elevated dark row. Focus: gold + dark offset. Do not turn warnings into gold branding.

### `DashboardRecentPendingRequests.tsx`

16. Dark Dashboard summary card, rows, empty state, and “View all”. Stop using shared `SectionCard` / `EmptyState`.
17. Preserve pending-only semantics, maximum item count, empty copy, View all destination, row detail destination, displayed data, and ordering.
18. Remove blue from “View all” and row focus.

---

## Out of Scope

| Item | Status |
|------|--------|
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | OUT — do not reopen TASK-015; D1 stays |
| `frontend/app/realtor/layout.tsx` | OUT |
| My Listings internals (`page.tsx` from listings section onward: search, tabs, counts, cards, empty states, listing actions) | OUT |
| `frontend/components/realtor/RealtorPropertyCard.tsx` | OUT |
| `frontend/components/realtor/PropertyEmptyState.tsx` | OUT |
| `frontend/components/realtor/PropertyListSkeleton.tsx` | OUT |
| `frontend/components/realtor/PropertyBottomSheet.tsx` | OUT |
| `frontend/components/realtor/ConfirmDialog.tsx` | OUT |
| Avatar crop modal in `page.tsx` (already dark/gold) | OUT |
| `frontend/app/realtor/viewing-requests/page.tsx` | OUT |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | OUT |
| `frontend/components/realtor/viewing-requests/*` | OUT |
| `frontend/components/ui/*` implementations (`PrimaryButton`, `SecondaryButton`, `SectionCard`, `EmptyState`, `StatusBadge`, `PageShell`, `PageHeader`) | OUT |
| `frontend/lib/realtorWorkspace.ts` | OUT |
| `globals.css`, Tailwind theme, design tokens, new shared primitives | OUT |
| Backend, API, database, migrations, auth/session, nginx, Docker/Compose, dependencies | OUT |
| TASK-017 | OUT |
| Production deployment | OUT (separate gate) |

---

## My Listings Hard Boundary

My Listings is already dark/gold. **Classification: OUT OF SCOPE.**

Permitted: a page-level background wrapper may surround My Listings solely so `/realtor` fully covers inherited D1 and the operational zone transitions continuously into listings.

Prohibited: restyle of listings shell internals, search, tabs, counts, cards, empty states, listing actions, bottom sheet, archive/restore/delete UI, or `ConfirmDialog`.

If implementation appears to require changing those internals, classify as **SCOPE EXPANSION** and STOP.

---

## D1 Contract

TASK-015 shell remains untouched. `RealtorWorkspaceShell` `main` keeps:

```text
bg-zinc-50 text-zinc-900
```

That transitional surface remains because Viewing Requests still depends on it.

TASK-016 must **locally** cover D1 on `/realtor`.

Required local approach:

- one wrapper around success content (operational Dashboard **and** My Listings) using `min-h-full bg-[#1B1B1B] text-[#F5F5F5]`;
- loading and error branches get the same full-surface ownership so short content cannot expose zinc-50;
- do **not** put `min-h-full` on the operational sibling alone (that would stretch the top zone to the full `main` height *before* My Listings and create a large empty gap);
- do **not** use `min-h-screen` if it produces header + 100vh double-height scrolling;
- do **not** remove D1 from the shell.

After TASK-016, Viewing Requests continues to inherit D1. That is required and accepted.

Shell modification required: **NO**.

---

## Shared UI Contract

Do **not** modify implementations under `frontend/components/ui/*`.

| Primitive | Dashboard use today | Other consumers | Implementation change |
|-----------|---------------------|-----------------|------------------------|
| `PrimaryButton` | Quick Actions primary | `ViewingRequestListCard` (Review / Manage relationship) | **NO** |
| `SecondaryButton` | Quick Actions secondary | `ViewingRequestListCard` (Accept / Decline / Email / …) | **NO** |
| `SectionCard` | Attention + recent cards | VR inbox page; VR detail wrapper | **NO** |
| `EmptyState` | Attention + recent empty | VR inbox | **NO** |

Changing those implementations would partially recolor Viewing Requests without migrating that workflow, and would risk `text-zinc-900` headings on dark surfaces (the same class of contrast failure that forced TASK-015 D1).

**Dashboard-local replacement strategy:** stop composing those primitives in the four dashboard components and apply local classNames matching profile / `PropertyEmptyState` / `ConfirmDialog`. Do not introduce new shared primitives. Do not create design tokens. Do not rely on appending override classes to the existing primitives.

---

## Viewing Requests Hard Boundary

| Piece | Classification |
|-------|----------------|
| Dashboard “Recent pending viewing requests” summary | **IN** (presentation only; owned by Dashboard) |
| Dashboard “View all” / row links (destinations unchanged) | **IN** (color only) |
| `/realtor/viewing-requests` inbox | **OUT** |
| `/realtor/viewing-requests/[id]` detail | **OUT** |

Viewing Requests may remain light after TASK-016. Success does **not** require recoloring that route. Visiting `/realtor/viewing-requests` during verification must show the unchanged light inbox, proving shared primitives were not mutated.

---

## Avatar Crop Modal

Current avatar crop modal is already dark/gold. **OUT OF SCOPE.**

Preserve crop, zoom, pan, save, cancel, upload, and MIME validation. Line movement in `page.tsx` caused by wrapper changes is acceptable; presentation of the modal must remain unchanged.

---

## Functional Contracts To Preserve

Presentation only. Any required change to these behaviours is **SCOPE EXPANSION** and must STOP.

| ID | Contract | Current owner |
|----|----------|---------------|
| 1 | Parallel load of properties, profile, pending viewing requests (`status: "pending", limit: 5`), and accepted viewing-request count (`status: "accepted", limit: 1`) | `page.tsx` + `services/api` |
| 2 | Current loading behavior, including `role="status"` skeleton | `page.tsx` `WorkspaceSkeleton` |
| 3 | Current workspace load error behavior and copy (`"Failed to load your workspace"`) | `page.tsx` |
| 4 | Greeting via `getTimeGreeting` and `getWorkspaceGreetingName` | `page.tsx` / `lib/realtorWorkspace.ts` |
| 5 | Avatar pick / crop / zoom / pan / save / cancel / MIME validation / `uploadImage` / `updateMyRealtorProfile` | `page.tsx` |
| 6 | Listing creation guard: `profile.is_completed` | `page.tsx` |
| 7 | Add Property vs Complete Profile CTA selection and hrefs | `DashboardQuickActions.tsx` |
| 8 | Profile pencil destination `/realtor/profile` and aria labels | `page.tsx` |
| 9 | Dashboard metrics calculations (`available` / `pending` / VR totals) | `computeDashboardMetrics` — **do not modify** `lib/realtorWorkspace.ts` |
| 10 | Requires-attention construction, ordering, hrefs, tones | `buildRequiresAttentionItems` — **do not modify** |
| 11 | Recent pending query and limit | `page.tsx` |
| 12 | Conditional Review Viewing Requests CTA when `pendingViewingRequestTotal > 0` | `DashboardQuickActions.tsx` |
| 13 | Manage Listings hash destination `REALTOR_PROPERTIES_HREF` | `DashboardQuickActions.tsx` / `lib/realtorWorkspace.ts` |
| 14 | My Listings search, tabs, counts, cards, empty states, actions, archive, restore, delete, hash scroll | `page.tsx` + listing components |
| 15 | Responsive ordering: mobile Attention → Metrics → Recent; desktop Metrics full-width then Attention \| Recent | dashboard `className` order utilities |
| 16 | No API / auth / session / business-logic change | — |

---

## Semantic Color Contract

| Meaning | Treatment |
|---------|-----------|
| Brand / primary CTA / Verified / focus | Gold `#DFC58A` |
| Gold-filled control text | `#1B1B1B` only — white/light on gold is forbidden |
| Secondary CTA | Dark surface, not a second gold fill |
| Attention `urgent` (incomplete profile, pending VR) | Semantic amber, dark-adapted; **not** gold |
| Attention `default` (missing photos) | Neutral elevated dark; **not** gold |
| Load / avatar errors | Semantic red, dark-adapted (`workspaceErrorClassName` pattern); **not** gold |
| Metric values | Neutral informational — do not color pending metrics amber/gold because the label contains “Pending” |
| Recent pending rows | Neutral list rows, not status badges (`StatusBadge` is not used here) |

---

## Accessibility Contract

Contrast from TASK-015 (VERIFIED, WCAG relative luminance) remains binding:

| Pair | Ratio | Verdict |
|------|-------|---------|
| `#F5F5F5` on `#1B1B1B` | 15.80 : 1 | excellent |
| `#F5F5F5` on `#2D2D2D` | 12.63 : 1 | excellent |
| `#DFC58A` on `#1B1B1B` | 10.25 : 1 | excellent |
| `#1B1B1B` on `#DFC58A` | 10.25 : 1 | excellent |
| `#B8B8B8` on `#2D2D2D` | 6.94 : 1 | AA normal text; avoid for small muted copy on `#2D2D2D` |
| `#F5F5F5` on `#DFC58A` | **1.54 : 1** | **NOT ALLOWED** |

Required:

1. Primary gold CTA uses dark text `#1B1B1B`. No white/light text on gold.
2. Focus: visible gold ring plus dark `ring-offset` matching the actual surface (`#1B1B1B`, `#252525`, or `#2D2D2D`).
3. Touch targets preserve current `h-11` / `min-h-11` / `h-12` behavior.
4. Semantic amber/red remain readable on dark surfaces.
5. Do not lower font sizes for aesthetics.
6. Do not communicate warning / verified / active meaning through color alone where existing text/icon/`aria-*` semantics exist.
7. Re-check disabled opacity on dark surfaces if any remain (`PrimaryButton` currently uses `disabled:opacity-50`).
8. Preserve existing `aria-label`, `role="status"`, `role="alert"`, and heading structure.

---

## Mobile Contract (~390 × 844)

Preserve current responsive layout. Do **not** perform a responsive redesign.

- CTA stack (primary full width; secondaries `sm:grid-cols-2`)
- 2-column metric layout
- attention / recent stacking
- text truncation already present on greeting and recent rows
- wrapping of long metric labels
- touch target sizing

Acceptance must verify: no horizontal overflow; no clipped metric labels; no CTA overflow; no exposed D1 light gutter; continuous dark transition into My Listings.

---

## Desktop Contract (~1280 × 900)

- operational Dashboard fully dark/gold
- shell + Dashboard visually continuous
- Dashboard + My Listings visually continuous
- no light outer gutter
- no blue primary action
- semantic warnings still distinguishable
- metrics remain readable and layout-unchanged (`lg:grid-cols-4`, attention \| recent)
- no horizontal overflow

---

## Intermediate State After TASK-016

Expected and **explicitly accepted**:

**Dark/gold:** Realtor shell; operational Dashboard; My Listings; existing dark profile/property pages.

**Still light:** Viewing Requests inbox; VR detail outer wrapper; some shared `components/ui/*` primitives.

D1 remains in the shell specifically to support remaining light routes.

Do not expand TASK-016 to eliminate all remaining light Realtor surfaces.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend presentation (operational Dashboard) | CHANGED |
| Frontend routing / navigation logic | UNCHANGED |
| Frontend auth guard | UNCHANGED |
| API client / services | UNCHANGED |
| `lib/realtorWorkspace.ts` calculations | UNCHANGED |
| Shared `components/ui/*` implementations | UNCHANGED |
| Backend, database, migrations | UNCHANGED |
| Request / use-case lifecycle | UNCHANGED |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Operational Dashboard is light/blue; My Listings is already dark/gold | VERIFIED | `page.tsx:54–75, 702–811` vs `page.tsx:57–58, 813–912` |
| Shell D1 `main` is `bg-zinc-50 text-zinc-900` | VERIFIED | `RealtorWorkspaceShell.tsx:232–236` |
| Dashboard uses shared `PrimaryButton`, `SecondaryButton`, `SectionCard`, `EmptyState` | VERIFIED | dashboard component imports |
| Those primitives are also consumed by Viewing Requests | VERIFIED | `ViewingRequestListCard.tsx`, `viewing-requests/page.tsx`, `[id]/page.tsx` |
| Primitive `className` is concatenated without `twMerge`; `EmptyState` has no `className` | VERIFIED | `frontend/components/ui/*.tsx` |
| Established dark/gold CTA and error patterns exist | VERIFIED | `profile/page.tsx`, `PropertyEmptyState.tsx`, `ConfirmDialog.tsx`, `page.tsx` `workspaceErrorClassName` |
| White-on-gold contrast is 1.54:1 and forbidden | VERIFIED | TASK-015 accessibility contract |
| TASK-016 identifier was free at definition | VERIFIED | `docs/engineering/tasks/` only `README.md`; archive TASK-001…015; TASK-016 only as historical “NOT CREATED” in TASK-015 |
| Frontend unit-test infrastructure absent | VERIFIED | no `*.test.*` under `frontend/` (TASK-015 evidence; not re-litigated) |

---

## Proposed Change

Restyle the five authorized files to the existing dark/gold system using established local patterns. Cover D1 with a local `min-h-full` page wrapper. Replace Dashboard usage of light shared primitives with local markup. Do not change handlers, fetches, memos, routes, or My Listings internals.

---

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| Incomplete D1 coverage (light seam / gutter) | MEDIUM | one `min-h-full` wrapper on success; same ownership on loading/error; desktop + mobile visual check |
| Accidental My Listings restyle in large `page.tsx` | MEDIUM | hard line at listings section; diff review; listings internals listed OUT |
| Accidental shared UI modification | MEDIUM | primitives listed OUT; VR inbox regression visit |
| Unreliable Tailwind override if primitives retained | MEDIUM | local replacement required, not className overrides |
| Amber semantic contrast on dark | MEDIUM | muted amber surface + readable `#F5F5F5` / `#B8B8B8` text; do not use gold |
| White/light text on gold primary CTA | MEDIUM | `#1B1B1B` on `#DFC58A` required |
| `min-h-screen` double-height scroll | LOW-MEDIUM | use `min-h-full`; never `min-h-full` on operational sibling alone |
| Mobile metric wrap / overflow | LOW | preserve current grid; verify ~390×844 |
| Functional changes in `page.tsx` | MEDIUM | presentation-only; full diff review of handlers |
| Database / migration / backend / API / auth | NONE | frontend presentation only |
| Production | LOW | FRONTEND_ONLY when later authorized |

**Task implementation risk:** LOW-MEDIUM. **Production risk:** LOW.

---

## Verification Plan

Definition-gate plan only. Execution is not authorized until an implementation gate.

### Static

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
git diff --check
```

Diff review: exactly the five runtime files plus this task document; no dependency, shared UI, shell, VR route, `lib/realtorWorkspace.ts`, backend, or My Listings-internal changes.

### Browser — desktop ~1280 × 900 — `/realtor`

- operational Dashboard dark/gold
- no blue primary CTA
- greeting/header dark
- metrics dark and semantically neutral
- attention dark; urgent amber preserved
- recent pending dark; “View all” not blue
- My Listings presentation unchanged
- continuous dark background; no exposed D1 gutter
- no horizontal overflow
- avatar crop modal unchanged

### Browser — mobile ~390 × 844 — `/realtor`

- full operational Dashboard dark
- CTAs stack correctly
- metrics readable
- attention/recent stack correctly
- no overflow
- dark transition into My Listings
- touch targets preserved

### Functional regression (behavior unchanged)

- Add Property / Complete Profile destination
- Manage Listings hash
- Review Viewing Requests route
- recent row detail route
- profile pencil
- data loads
- avatar pick/crop/save/cancel
- My Listings search/tabs/actions/archive/restore/delete/hash scroll

### Shared-primitive non-regression

Visit `/realtor/viewing-requests`. Expected: **unchanged light route**. Confirms `components/ui/*` implementations were not recolored.

No production access during implementation verification.

---

## Security

Security scope: **UNCHANGED**. No changes to session handling, CSRF, role enforcement, API authorization, ownership rules, or `returnUrl` semantics. Any security/auth code change is **blocking scope expansion**.

---

## Deployment Classification

Expected when a later deploy gate is authorized: **FRONTEND_ONLY**.

| Component | Expected |
|-----------|----------|
| Runtime scope | FRONTEND_ONLY |
| Backend | NO |
| Database | NO |
| Migration | NONE |
| API | NO |
| Auth / session | NO |
| Nginx | NO |
| Docker / Compose | NO |
| Dependencies | NO |
| Shared UI implementation | NO |

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert the TASK-016 frontend change and redeploy the previously verified frontend image; operational Dashboard returns to the light TASK-013 treatment inside the dark TASK-015 shell. No data impact.

Rollback image identity is not defined at definition time. A later deployment gate must preserve the then-current frontend production image before build.

---

## Acceptance Criteria

Outcome after a later authorized implementation + verification. All 40 must pass.

1. `/realtor` operational Dashboard uses the dark/gold system.
2. No exposed light D1 gutter around Dashboard.
3. Welcome/header card is dark.
4. Avatar chrome is dark/gold.
5. Verified badge is gold-aligned.
6. No blue Dashboard primary CTA.
7. Primary CTA is gold with dark text `#1B1B1B`.
8. Secondary CTAs are dark.
9. Dashboard focus rings are gold with dark offset.
10. Metric cards are dark and readable.
11. Metrics remain semantically neutral.
12. Requires Attention is dark.
13. Urgent semantic amber is preserved.
14. Recent pending card is dark.
15. Recent rows are dark.
16. Dashboard empty states are dark.
17. `View all` is no longer blue.
18. My Listings presentation is unchanged.
19. Avatar crop modal is unchanged.
20. Viewing Requests route is unchanged/light.
21. Shared `components/ui/*` implementations are unchanged.
22. Add Property / Complete Profile behavior is unchanged.
23. Manage Listings hash behavior is unchanged.
24. Review Viewing Requests route is unchanged.
25. Recent row destinations are unchanged.
26. Metrics / data-fetch logic is unchanged.
27. Attention ordering/logic is unchanged.
28. Desktop (~1280 × 900): no horizontal overflow.
29. Mobile (~390 × 844): no horizontal overflow.
30. Mobile stacking is preserved.
31. Touch targets are preserved.
32. No white/light text on gold.
33. Loading state is dark with no white/light flash.
34. Error state is dark-compatible semantic red.
35. `npm run lint` PASS.
36. `npm run typecheck` PASS.
37. `npm run build` PASS.
38. `git diff --check` PASS.
39. No backend / API / DB / auth / dependency changes.
40. No business-logic changes.

---

## Non-Goals

- Full Realtor Workspace recolor
- Viewing Requests migration
- My Listings redesign
- Global theme switch or user-selectable dark mode
- Design token system
- Shared primitive restyle
- TASK-015 shell D1 removal
- New navigation, routes, or features
- Responsive redesign
- Backend changes
- TASK-017

---

## Mutation Prohibitions (definition gate — historical)

The definition gate itself modified no runtime code. Implementation was authorized separately and is recorded under **Implementation Result** below. Commit, push, deploy, production access, shared-primitive change, token introduction, dependency change, shell change, My Listings restyle, Viewing Requests recolor, and TASK-017 creation remain unauthorized.

---

## Implementation Result

Implemented 2026-08-20 under the TASK-016 implementation authorization gate. Baseline at implementation start (VERIFIED): HEAD `5814d7e644f3522031c9faeb1d5e096a4997b889`, origin/main identical, divergence `0 0`, worktree containing only this untracked task document.

**Runtime files changed — exactly the five authorized, no sixth (VERIFIED via `git diff --name-status`):**

| File | Change |
|------|--------|
| `frontend/app/realtor/page.tsx` | Added `dashboardShellClassName` (`min-h-full bg-[#1B1B1B] text-[#F5F5F5]`) and applied it to the loading, error, and success branches; dark loading pulses; error branch reuses existing `workspaceErrorClassName`; welcome header, avatar chrome, badges, pencil, greeting text recolored |
| `DashboardQuickActions.tsx` | Dropped `PrimaryButton` / `SecondaryButton` imports; local `next/link` markup with gold primary (`#DFC58A` on `#1B1B1B` text) and dark secondaries |
| `DashboardMetrics.tsx` | Metric cards to `#252525` / `white/8`, value `#F5F5F5`, label `#B8B8B8`, `shadow-sm` dropped |
| `DashboardRequiresAttention.tsx` | Dropped `SectionCard` / `EmptyState` imports; local dark `#2D2D2D` card, dark empty state, urgent rows semantic amber on dark (`#2A2718` + `amber-400/30`), default rows `#252525` |
| `DashboardRecentPendingRequests.tsx` | Dropped `SectionCard` / `EmptyState` imports; local dark card, dark rows, dark empty state, gold “View all” with added gold focus ring |

**Structural RED removed (light/blue patterns no longer present in Dashboard scope):** `bg-white` welcome header + `shadow-sm`; `bg-zinc-200` loading pulses (×8); `border-red-200 bg-red-50 text-red-700` load error; `bg-blue-50 text-blue-700` Verified badge; `bg-zinc-100 text-zinc-500` verification-soon badge; `bg-white` + `ring-blue-700` pencil; `bg-zinc-50` + `text-blue-700` + `ring-blue-700` avatar chrome; `bg-white/70` + `border-blue-700` avatar spinner; `text-red-600` avatar error; `bg-blue-700 text-white` primary CTA (via `PrimaryButton`); `bg-white border-zinc-200` secondary CTAs (via `SecondaryButton`); `bg-white border-zinc-200 shadow-sm` metric cards; white `SectionCard` + `bg-zinc-50 ring-zinc-100` `EmptyState`; `border-amber-200 bg-amber-50/60` urgent rows; `text-blue-700` “View all”; `border-zinc-200 bg-zinc-50` recent rows; `ring-blue-700` row focus.

**Smallest-diff discipline:** 199 insertions / 149 deletions across five files. No state, hook, handler, memo, fetch, route, prop-contract, or variable-name change. The success-branch wrapper was added without re-indenting the existing subtree, matching the file's existing nesting style, to keep the diff minimal.

## Final Verification

Local verification only. No production access.

### Static (VERIFIED)

| Check | Result |
|-------|--------|
| `npm run lint` | PASS — 0 errors, 4 warnings |
| `npm run typecheck` | PASS — `tsc --noEmit` clean |
| `npm run build` | PASS — Next.js 16.2.6, compiled in 6.7s, 23/23 static pages |
| `git diff --check` | PASS — no whitespace errors |

The 4 lint warnings are pre-existing `@next/next/no-img-element` in `app/apple-icon.tsx`, `app/icon.tsx`, `app/opengraph-image.tsx`, `components/RentoLogo.tsx`. None is in TASK-016 scope and none was introduced by this task.

### D1 local coverage (VERIFIED)

Shell `main` remains light — measured `background-color: lab(98.26 0 0)` (`bg-zinc-50`), confirming `RealtorWorkspaceShell` was not modified. The page wrapper `min-h-full bg-[#1B1B1B]` resolved to `min-height: 100%` and covered the content region exactly in every branch:

| Branch | Viewport | Wrapper height | `main` height | Covers `main` | Document height vs viewport |
|--------|----------|----------------|---------------|---------------|------------------------------|
| Success | 1280 × 900 | 1949.58 px | 1949.58 px | YES | 1998 px doc, no double-height |
| Success | 390 × 844 | 2760.00 px | 2760.00 px | YES | no double-height |
| Loading | 1280 × 900 | 1526.67 px | 1526.67 px | YES | 1575 px doc |
| Error | 1280 × 900 | 851.33 px | 851.33 px | YES | wrapper bottom 900 px == viewport bottom; doc 900 px |
| Error | 390 × 844 | 775.33 px | 775.33 px | YES | wrapper bottom 844 px == viewport bottom; doc 844 px |

No zinc-50 gutter remained in any branch. `min-h-screen` was not used, so no header + 100vh double-height scrolling was introduced. A DOM scan for `rgb(255,255,255)` / `rgb(250,250,250)` / `rgb(244,244,245)` / `rgb(228,228,231)` backgrounds inside `main` returned **empty** in success, loading, and error states; a scan for blue `rgb(29,78,216)` / `rgb(37,99,235)` / `rgb(239,246,255)` also returned **empty**.

### Desktop ~1280 × 900 (VERIFIED)

Measured computed styles: welcome header `rgb(45,45,45)` + `white/0.08` border + `box-shadow: none` + 24 px radius; `h1` `rgb(245,245,245)`; avatar button `rgb(37,37,37)`; Verified badge `rgb(37,37,37)` surface with `rgb(223,197,138)` text; pencil `rgb(37,37,37)` / `rgb(184,184,184)`; primary CTA `rgb(223,197,138)` background with `rgb(27,27,27)` text; both secondary CTAs `rgb(37,37,37)` / `rgb(245,245,245)` / `white/0.1`; all four metric cards `rgb(37,37,37)`, `white/0.08`, `box-shadow: none`, value `rgb(245,245,245)`, label `rgb(184,184,184)`; attention and recent cards `rgb(45,45,45)`; urgent attention rows `rgb(42,39,24)` with `amber-400/0.3` border; default attention row and recent rows `rgb(37,37,37)`; “View all” `rgb(223,197,138)`. Listings section `rgb(27,27,27)` and visually continuous with the operational zone. Layout and order unchanged (`grid-cols-2 lg:grid-cols-4`, attention | recent). No horizontal overflow (`scrollWidth` 1265 == `clientWidth` 1265).

### Mobile ~390 × 844 (VERIFIED)

No horizontal overflow (`scrollWidth` 390 == `clientWidth` 390; zero elements extending past the viewport). Primary and secondary CTAs full width 358 px at 48 px height. Metrics grid stayed 2-column (`175.7px 175.7px`); the long labels “Pending Viewing Requests” and “Accepted Viewing Requests” wrapped to two lines (32 px) with no clipping (`scrollHeight`/`scrollWidth` within client box). Touch targets preserved: avatar 56 px, pencil 44 × 44 px. Mobile stacking order preserved — Requires attention at y=524 before Dashboard metrics at y=783.

### Loading / error (VERIFIED — browser-observed)

Loading state was observed by holding the dashboard fetches pending. Result: full dark surface, `role="status"` + `aria-live="polite"` + sr-only “Loading workspace” preserved; 26 pulse elements, all with `motion-reduce:animate-none`; pulse backgrounds only `white/0.1` and `white/0.05` (the latter from unchanged `PropertyListSkeleton`) with no zinc; original dimensions preserved (144, 48, 80 × 4, 224 × 2). No white flash and no light gutter.

Error state was observed by forcing a 500 on a dashboard fetch. Result: message text unchanged (“Failed to load your workspace”), `role="alert"` preserved, alert rendered `rgb(42,34,34)` surface with `red-400/0.15` border and `red-100/0.9` text — semantic red, not gold — on a fully dark surface.

### Focus rings (VERIFIED)

Forced `:focus-visible` via CDP (synthetic key events do not trigger the browser heuristic). Primary CTA resolved `--tw-ring-color: #dfc58a`, `--tw-ring-offset-color: #1b1b1b`, box-shadow `rgb(27,27,27) 0 0 0 2px, rgb(223,197,138) 0 0 0 4px`. Attention row resolved `--tw-ring-color: #dfc58a` with `--tw-ring-offset-color: #2d2d2d`, matching its actual `#2D2D2D` card surface. Gold ring with dark offset confirmed; no blue ring remains.

### Functional regression (VERIFIED)

| Contract | Result |
|----------|--------|
| Parallel data load (properties, profile, pending VR `limit=5`, accepted VR `limit=1`) | unchanged — all four requests observed with original query parameters |
| Add Property CTA | `/realtor/properties/create` when profile complete |
| Complete Profile CTA | `/realtor/profile` when `is_completed` false — conditional label and href both preserved |
| Review Viewing Requests CTA | `/realtor/viewing-requests`, rendered only when pending total > 0; correctly absent at 0 |
| Manage Listings hash | click set `#realtor-properties-heading`, scrolled to 871 px, heading at `top: 0` |
| Recent row destinations | `/realtor/viewing-requests/9001`, `/realtor/viewing-requests/9002` |
| “View all” destination | `/realtor/viewing-requests` |
| Profile pencil | `/realtor/profile`; conditional `aria-label` preserved (“Edit Profile” / “Complete Profile”) |
| Metrics values | 2 / 1 / 2 / 3 computed from fixtures, matching `computeDashboardMetrics` |
| Attention construction and ordering | Complete profile (urgent) → Review viewing requests (urgent) → Add missing photos (default), hrefs unchanged |
| Dashboard empty states | dark, copy verbatim unchanged |
| Avatar pipeline | accept `image/jpeg,image/png,image/webp` preserved; crop modal opened on file selection, rendered unchanged dark/gold `#2D2D2D`; Cancel closed it; zero `/upload` calls and no profile PATCH — nothing persisted |
| My Listings search | typing “studio” filtered to the single matching listing |
| My Listings tabs | switched to Archived (1) with search retained and “No matches found” empty state |
| Auth guard | unauthenticated `/realtor` still redirects to `/login?returnUrl=%2Frealtor` |

### Shared-primitive non-regression (VERIFIED)

`/realtor/viewing-requests` was visited after the change and remains the unchanged light inbox: blue `PrimaryButton` “Review”, white `SecondaryButton` Accept/Decline, white `SectionCard` list cards, light inherited D1 background. This confirms `components/ui/*` implementations were not recolored and that dropping the imports from Dashboard produced no blast radius.

### Verification method note

No local realtor credentials exist in the repository, so the authenticated dashboard was exercised with browser-local API fixtures injected into the page (`window.fetch` shim serving `/users/me`, `/realtor/profile`, `/realtor/properties`, `/realtor/viewing-requests`). No request reached the backend for those endpoints, no business data was created, read, or mutated, and no production system was contacted. The shim, its `localStorage` mode flag, and the viewport emulation were removed afterwards; the browser was confirmed back to the unauthenticated state with the shim absent.

### Sanitation (VERIFIED)

The five changed files were scanned for `password`, `secret`, `token`, `cookie`, `.env`, private keys, fixture credentials, `AppData`, temp paths, screenshot paths, `console.log`, and `debugger`. Result: **none**.

### Defects

**NONE.** No blocking defect from the defect policy was observed, and no corrective iteration was required.

## Commit

Not started. **COMMIT NOT AUTHORIZED.** Nothing staged, committed, or pushed.

## Production Result

Not started. NOT APPLICABLE at this gate. Production was not accessed. `CODE WRITTEN != DONE`; `COMMITTED != DEPLOYED`; `DEPLOYED != ACCEPTED`.

---

## Follow-up (recorded, not authorized)

- Realtor Viewing Requests dark/gold alignment (inbox + detail wrapper)
- Unused light primitives `components/ui/PageShell.tsx`, `PageHeader.tsx` — remove or migrate decision
- Later D1 removal from `RealtorWorkspaceShell` **only after** remaining light inner routes are migrated
- `BottomNav` dark theme on renter viewing-request routes
- `app/admin/properties/[id]/page.tsx` dark/gold alignment

---

## Acceptance Criteria Result

All 40 criteria pass against local verification evidence. Criteria 1–34 were confirmed by browser measurement and diff review; 35–38 by the static checks above; 39–40 by the full diff (no backend, API, DB, auth, dependency, or business-logic change).

Production acceptance is **not** claimed. `DEPLOYED != ACCEPTED`.

---

## Definition of Done (TASK-016)

Not claimed. CODE WRITTEN ≠ DONE. Implementation and local verification are complete; commit, push, deploy, and production acceptance remain separate unauthorized gates.

---

## Mutation Statement (implementation gate, 2026-08-20)

| Action | State |
|--------|-------|
| Runtime code changed | YES — exactly the five authorized files |
| Task document changed | YES — this file |
| Shared UI primitive implementations changed | NO — imports dropped from Dashboard only |
| Shell / D1 changed | NO |
| My Listings internals changed | NO — page-level background wrapper only |
| Avatar crop modal changed | NO |
| Viewing Requests changed | NO |
| `globals.css` / Tailwind config / design tokens | NO |
| Backend / API / DB / schema / migration | NO |
| Auth / session / security | NO |
| Dependencies changed | NO |
| Business data created or mutated | NO |
| Commit created | NO |
| Staged | NO |
| Push performed | NO |
| Deployment performed | NO |
| Production accessed | NO |
| TASK-017 created | NO |

---

## Next Gate

```text
TASK_016_IMPLEMENTATION_VERIFIED
Next:
READY_FOR_TASK_016_COMMIT_REVIEW
```

Do not commit until a separate commit authorization is recorded.
