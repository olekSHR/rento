# TASK-017 — Realtor Viewing Requests Dark/Gold Visual Alignment

| Field | Value |
|-------|-------|
| ID | TASK-017 |
| TITLE | Realtor Viewing Requests Dark/Gold Visual Alignment |
| STATUS | VERIFYING |
| RISK | LOW-MEDIUM |
| CLASSIFICATION | Frontend presentation-only alignment / realtor Viewing Requests vertical slice |

> **COMMIT NOT AUTHORIZED.** Implementation and local verification are complete. Staging, commit, push, deploy, and production access require separate gates.

**Lifecycle (VERIFIED 2026-08-20):**

| Stage | State |
|-------|-------|
| Next-increment discovery | COMPLETE — `NEXT_INCREMENT_DISCOVERY_COMPLETE` |
| Definition | COMPLETE — `TASK_017_DEFINITION_COMPLETE` |
| Implementation | COMPLETE — 4 authorized runtime files, uncommitted |
| Local Verification | PASS — `TASK_017_IMPLEMENTATION_VERIFIED` |
| Commit | NOT AUTHORIZED |
| Push | NOT AUTHORIZED |
| Deployment | NOT AUTHORIZED |
| Production Acceptance | NOT AUTHORIZED |

**Initiative reference:** Next-increment discovery (2026-08-20) selected **OPTION B — Inbox + Realtor Detail Page Vertical Slice**. Prior closed increment: TASK-016 — Realtor Dashboard Dark/Gold Visual Alignment (CLOSED / ARCHIVED / COMPLETE).

**Repository baseline at definition (VERIFIED 2026-08-20):**

| Field | Value |
|-------|-------|
| HEAD | `12ff9b31b593165c1f1b0f6c494d35d255e62e38` |
| origin/main | `12ff9b31b593165c1f1b0f6c494d35d255e62e38` |
| divergence | `0 0` |
| Worktree before this document | clean |
| Active tasks before creation | `docs/engineering/tasks/README.md` only |
| Prior task | TASK-016 — CLOSED / ARCHIVED / COMPLETE |
| TASK-017 identifier | free (historical `TASK-017 NOT CREATED` / `OUT` mentions inside archived TASK-016 are not a collision) |
| Discovery HEAD typo | **DISCOVERY_HEAD_TYPO_CONFIRMED** — discovery report contained invalid SHA `12ff9b31…62e62e38`; actual Git output matches authoritative `12ff9b31b593165c1f1b0f6c494d35d255e62e38` |

**Production note:** Production frontend application commit remains `e19e78fd4fbae0f6aca82d3c02944fbdca8f3dff` (TASK-016 implementation). Repository HEAD additionally contains TASK-016 closure/archive documentation commits. This is expected and must not be treated as deployment drift.

---

## Product Direction

Rento uses a premium **DARK / GOLD** visual language. Dark/gold is the **target** design system, not legacy styling.

After TASK-015 (shell) and TASK-016 (Dashboard), the **Realtor Viewing Requests journey** is the primary remaining visual discontinuity inside the Realtor Workspace:

```text
dark/gold shell
→ dark/gold Dashboard
→ light/blue Viewing Requests inbox
→ mixed detail page shell around already-dark relationship content
```

TASK-017 is **presentation-only**. It is not:

- a global site recolor;
- a renter Viewing Requests redesign;
- a global shared UI migration;
- a design-system / token task;
- a shell rewrite;
- a backend / viewing-lifecycle change.

---

## Problem

**User problem:** A realtor navigating from the now-aligned Dashboard or shell nav into Viewing Requests encounters a light SaaS inbox (white cards, blue tabs, blue primary CTAs) on the inherited shell D1 surface (`bg-zinc-50`). On detail, the shared relationship UI is already dark/gold, but the page-level chrome (loading, unavailable, outer wrapper) remains light — producing a visible seam and inconsistent product experience within one primary workspace flow.

**Current surfaces that remain light/blue (VERIFIED 2026-08-20):**

| Surface | File | Current styling |
|---------|------|-----------------|
| Inbox page wrapper | `viewing-requests/page.tsx:191–199` | no dark wrapper; `text-zinc-900` / `text-zinc-500` headings |
| Inbox skeleton | `page.tsx:27–42` | `bg-zinc-200` / `bg-zinc-100` pulses |
| Inbox error | `page.tsx:24–25, 207–210` | `border-red-200 bg-red-50 text-red-700` |
| Inbox empty | `page.tsx:235–237` | light `SectionCard` + `EmptyState` |
| Inbox reload skeleton | `page.tsx:219–233` | `bg-zinc-100` card pulses |
| Filter tabs | `ViewingRequestStatusTabs.tsx:36–40` | active `bg-blue-700`; inactive `bg-white border-zinc-200` |
| List cards | `ViewingRequestListCard.tsx:68` | `bg-white border-zinc-200 shadow-sm`; zinc typography |
| Card actions | `ViewingRequestListCard.tsx` → `PrimaryButton` / `SecondaryButton` | blue primary; white secondary |
| Card status | `ViewingRequestListCard.tsx` → `StatusBadge` | light 50-tint semantic variants |
| Detail outer wrapper | `[id]/page.tsx:197–199` | `pb-6 md:pb-8` only; no dark ownership |
| Detail loading | `[id]/page.tsx:118–131` | `bg-zinc-100` pulse on light main |
| Detail unavailable | `[id]/page.tsx:28–46` | light `SectionCard`; `bg-blue-700` back CTA |
| Relationship detail content | `ViewingRequestRelationshipDetail.tsx` | **already dark/gold** — OUT OF SCOPE |

---

## Target Outcome

The **Realtor Viewing Requests inbox and detail page chrome** become visually aligned with the accepted dark/gold workspace system. All current Viewing Requests behavior is preserved.

Target palette (existing code — do not invent a second gold):

```text
#1B1B1B     primary page background
#252525     base dark surface
#2D2D2D     elevated dark surface
#DFC58A     gold brand / primary emphasis / focus
#F5F5F5     primary text
#B8B8B8     muted text
white/8
white/10    restrained borders
```

Gold expresses brand, primary contextual CTA, selected/active filter emphasis, and focus only. Semantic amber/red/green remain semantic. Gold must not replace status meaning. Gold-filled controls must use `#1B1B1B` text only.

---

## Discovery Decision

Selected: **OPTION B — Inbox + Realtor Detail Page Vertical Slice.**

Reason:

- completes the Realtor Viewing Requests user journey visually;
- bounded to four runtime files;
- avoids shared UI blast radius;
- avoids modifying cross-role `ViewingRequestRelationshipDetail` (already aligned);
- frontend-only;
- mirrors proven TASK-016 local-replacement strategy.

Rejected:

| Option | Reason |
|--------|--------|
| A — inbox only | incomplete journey; detail remains mixed (dark relationship on light page) |
| C — global shared UI recolor | contradicts TASK-016 precedent; unnecessary when consumers are replaceable locally |
| D — another increment | no higher-value in-workspace concrete gap identified at discovery |

---

## Current Behavior

### Inbox — `frontend/app/realtor/viewing-requests/page.tsx`

- Client page with no route-level dark wrapper; content inherits shell D1.
- `RealtorViewingRequestsContent` manages filter state, loading, error, items, and accept/decline confirmation.
- Default filter: `DEFAULT_VIEWING_REQUEST_INBOX_FILTER` from `lib/realtorWorkspace.ts` (logic OUT OF SCOPE).
- Loads via `getRealtorViewingRequests({ status?, limit: 100 })` with `getViewingRequestInboxApiStatus(filter)`.
- Race-safe loading via `loadSequenceRef`.
- After accept/decline, reloads active filter via `reloadActiveFilter`.
- Composes `ViewingRequestStatusTabs`, `ViewingRequestListCard`, `ConfirmDialog`, and light shared `SectionCard` / `EmptyState`.
- Grid: `grid-cols-1 lg:grid-cols-2`.
- Local `ViewingRequestsSkeleton` for initial load.

### Detail — `frontend/app/realtor/viewing-requests/[id]/page.tsx`

- Parses numeric route ID; invalid → `ViewingRequestUnavailable`.
- Loads via `getRealtorViewingRequest(id)`.
- Success renders `ViewingRequestRelationshipDetail role="realtor"` with `backHref="/realtor/viewing-requests"`.
- Accept/decline via `ConfirmDialog` + API update; updates local request state on success.
- Outer page wrapper is padding-only (`pb-6 md:pb-8`).
- Unavailable state uses light `SectionCard` and blue back link.

### List card — `ViewingRequestListCard.tsx`

- White elevated card with property thumbnail, status badge, renter email, timestamps, message preview.
- Status-dependent actions: pending (Review / Accept / Decline), accepted (Manage relationship / Email / Open property), declined/cancelled (View details).
- Uses shared `PrimaryButton`, `SecondaryButton`, `StatusBadge`.

### Filter tabs — `ViewingRequestStatusTabs.tsx`

- Horizontal scrollable tablist over `VIEWING_REQUEST_INBOX_FILTERS`.
- Blue active pill; white inactive pills; blue focus ring.

### Shared primitives consumed (implementations unchanged)

| Primitive | Realtor VR consumers |
|-----------|---------------------|
| `PrimaryButton` | `ViewingRequestListCard` only |
| `SecondaryButton` | `ViewingRequestListCard` only |
| `SectionCard` | inbox page; detail unavailable |
| `EmptyState` | inbox page only |
| `StatusBadge` | `ViewingRequestListCard` only |

Grep confirms no other frontend consumers of these primitives in realtor VR paths beyond the four scoped files.

### Cross-role shared (unchanged)

| Component | Realtor use | Renter use | Visual state |
|-----------|---------------|------------|--------------|
| `ViewingRequestRelationshipDetail` | detail success | `/viewing-requests/[id]` | already dark/gold |
| `RentalDocumentsSection` | via relationship detail | same | already dark/gold |
| `ConfirmDialog` | inbox + detail | N/A (realtor-specific) | already dark/gold |

---

## Target Behavior

Realtor Viewing Requests inbox and detail **page chrome** use the target palette. Both routes locally cover inherited D1 so no zinc-50 gutter remains. Shared relationship detail, documents section, confirm dialog, and `components/ui/*` implementations are unchanged.

Visual reference (existing code — copy established patterns, do not invent):

| Role | Reference |
|------|-----------|
| Page surface / D1 coverage | `frontend/app/realtor/page.tsx:56` (`dashboardShellClassName`: `min-h-full bg-[#1B1B1B] text-[#F5F5F5]`) |
| Elevated card | `frontend/app/realtor/profile/page.tsx:39–40` (`cardClassName`: `#2D2D2D`, `white/8`) |
| Base surface | `profile/page.tsx:42–43` (`#252525`) |
| Gold primary CTA + dark text | `profile/page.tsx:45–46`, `ConfirmDialog.tsx:18–19` |
| Dark secondary control | `ConfirmDialog.tsx:24–25` |
| Dark semantic error | `page.tsx:69–70` (`workspaceErrorClassName`), `profile/page.tsx:62–63` |
| Dark skeleton pulse | `realtor/layout.tsx:19–25`, TASK-016 dashboard pulses (`bg-white/10`) |
| Unavailable card + gold back CTA | `frontend/app/viewing-requests/[id]/page.tsx:14–18, 28–44` (renter pattern — presentation reference only; renter route OUT OF SCOPE) |

Inside the shell, prefer `min-h-full` over `min-h-screen` so the sticky header is not added on top of a second 100vh.

---

## Exact Runtime File Scope

Authorized expected runtime files — **exactly four**:

1. `frontend/app/realtor/viewing-requests/page.tsx`
2. `frontend/app/realtor/viewing-requests/[id]/page.tsx`
3. `frontend/components/realtor/viewing-requests/ViewingRequestListCard.tsx`
4. `frontend/components/realtor/viewing-requests/ViewingRequestStatusTabs.tsx`

No optional runtime files.

Any need for a fifth runtime file is **SCOPE EXPANSION**. Implementation must STOP.

**Scope reconfirmation (VERIFIED 2026-08-20):**

```text
fifth runtime file required: NO
```

| Candidate excluded file | Reason excluded |
|-------------------------|-----------------|
| `ViewingRequestRelationshipDetail.tsx` | already dark/gold; cross-role; no product value |
| `ConfirmDialog.tsx` | already dark/gold |
| `components/ui/*` | local replacement inside scoped files; do not edit implementations |
| `RealtorWorkspaceShell.tsx` | D1 remains transitional |
| `lib/realtorWorkspace.ts` | logic frozen |

Task document (this file):

- `docs/engineering/tasks/TASK-017-realtor-viewing-requests-dark-gold-visual-alignment.md`

---

## In Scope

### 1. `frontend/app/realtor/viewing-requests/page.tsx`

1. Local D1 dark coverage wrapper (`min-h-full bg-[#1B1B1B] text-[#F5F5F5]` or proven equivalent) on all render branches: initial skeleton, loaded content, inline reload, error.
2. Page heading/subheading presentation (`#F5F5F5` / `#B8B8B8`).
3. Loading presentation: `ViewingRequestsSkeleton` and inline reload skeleton → dark-compatible pulses (`bg-white/10` preferred).
4. Error presentation → dark semantic red (reuse `workspaceErrorClassName` / profile `errorAlertClassName` pattern). Copy and `role="alert"` unchanged.
5. Empty inbox presentation: stop using shared `SectionCard` / `EmptyState`; implement local dark empty surface. Preserve empty title from `getViewingRequestInboxEmptyTitle(activeFilter)`.
6. Result label presentation (`getViewingRequestInboxResultLabel`) — muted dark text.
7. Preserve grid `grid-cols-1 lg:grid-cols-2`, container width, spacing, and all handlers/fetches/state.

Do **not** alter filter values, API calls, accept/decline logic, `ConfirmDialog` props, or `loadSequenceRef` behavior.

### 2. `frontend/app/realtor/viewing-requests/[id]/page.tsx`

1. Local D1 dark coverage on all branches: loading, unavailable, success wrapper.
2. Loading presentation → dark full-route coverage with dark pulse.
3. Unavailable/not-found presentation: replace light `SectionCard`, zinc surfaces, and blue back CTA with bounded dark/gold local markup. Preserve message copy, `role="alert"`, and back destination `/realtor/viewing-requests`.
4. Success path: dark page wrapper around existing `ViewingRequestRelationshipDetail` only — do **not** restyle internal relationship UI.
5. Preserve numeric ID parsing, API load, accept/decline confirmation flow, and `ConfirmDialog` integration.

### 3. `frontend/components/realtor/viewing-requests/ViewingRequestListCard.tsx`

1. Card surface → dark elevated (`#252525` or `#2D2D2D`) with restrained `white/8` / `white/10` border. Remove white card and `shadow-sm`.
2. Typography → `#F5F5F5` primary, `#B8B8B8` muted.
3. Thumbnail placeholder ring → dark-compatible neutral.
4. Stop using shared `PrimaryButton`, `SecondaryButton`, `StatusBadge`; implement local presentation.
5. Status badges: preserve semantic mapping (`pending` → warning/amber, `accepted` → success/emerald, `declined` → danger/red, `cancelled` → neutral/muted) adapted for dark surfaces.
6. Actions by status:
   - **Review / Manage relationship / View details:** gold primary when appropriate (`#DFC58A` fill, `#1B1B1B` text).
   - **Accept:** retain positive secondary intent — dark surface or restrained semantic green/emerald accent; **not** gold if it blurs with primary Review.
   - **Decline:** retain destructive intent — semantic red border/text on dark; **not** gold.
   - **Email renter / Open property:** dark secondary controls.
7. Preserve hrefs, callbacks, `actionsDisabled`, truncation, message preview length, and responsive action stacking (`flex-col sm:flex-row`).

### 4. `frontend/components/realtor/viewing-requests/ViewingRequestStatusTabs.tsx`

1. Dark tab surfaces; inactive tabs muted/readable on dark with subtle borders.
2. Active filter: restrained gold emphasis (ring/border/text — avoid excessive solid-gold pill unless readability requires).
3. Gold `focus-visible` ring with dark offset.
4. Preserve `role="tablist"`, `role="tab"`, `aria-selected`, filter IDs from `VIEWING_REQUEST_INBOX_FILTERS`, disabled behavior, and horizontal scroll layout.

---

## Out of Scope

| Item | Status |
|------|--------|
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | OUT — D1 stays `bg-zinc-50 text-zinc-900` |
| `frontend/app/realtor/layout.tsx` | OUT |
| `frontend/components/ViewingRequestRelationshipDetail.tsx` | OUT — cross-role; already dark/gold |
| `frontend/components/RentalDocumentsSection.tsx` | OUT — cross-role; already dark/gold |
| `frontend/components/realtor/ConfirmDialog.tsx` | OUT — already dark/gold |
| `frontend/components/ui/*` implementations | OUT |
| `frontend/lib/realtorWorkspace.ts` | OUT |
| Dashboard / My Listings / profile / property create/edit | OUT |
| `frontend/app/viewing-requests/*` (renter routes) | OUT |
| Backend, API, database, Alembic migrations, auth/session | OUT |
| Viewing lifecycle / status semantics | OUT |
| Dependencies, Docker/Compose, nginx | OUT |
| `globals.css`, Tailwind theme, design tokens, new shared primitives | OUT |
| Global component extraction / design-system refactor | OUT |
| TASK-018 | OUT |
| Production deployment | OUT (separate gate) |

Any fifth runtime file during implementation → **SCOPE EXPANSION → STOP**.

---

## D1 Contract

TASK-015/TASK-016 shell remains untouched. `RealtorWorkspaceShell` `main` keeps:

```text
bg-zinc-50 text-zinc-900
```

TASK-017 must **locally** cover D1 on both Realtor VR routes.

Required local approach:

- wrapper using `min-h-full bg-[#1B1B1B] text-[#F5F5F5]` on every render branch;
- loading, error, empty, and success branches all own the full local surface so short content cannot expose zinc-50;
- do **not** use `min-h-screen` if it produces header + 100vh double-height scrolling;
- do **not** remove D1 from the shell globally.

### Coverage requirements

| Route | Branches requiring dark ownership |
|-------|-----------------------------------|
| Inbox | initial skeleton; loaded; inline reload; error; empty |
| Detail | loading; unavailable/not-found; success wrapper around relationship detail |

Goal:

```text
no exposed zinc gutter around either Realtor VR route
```

Shell modification required: **NO**.

After TASK-017, D1 may remain in the shell for any future light routes. Removing D1 globally is **OUT OF SCOPE**.

---

## Shared UI Contract

Do **not** modify implementations under `frontend/components/ui/*`.

| Primitive | VR use today | Other consumers (repo) | Implementation change |
|-----------|--------------|------------------------|------------------------|
| `PrimaryButton` | `ViewingRequestListCard` | none outside scoped files | **NO** |
| `SecondaryButton` | `ViewingRequestListCard` | none outside scoped files | **NO** |
| `SectionCard` | inbox empty; detail unavailable | none outside scoped files after scoped replacement | **NO** |
| `EmptyState` | inbox empty | none outside scoped files | **NO** |
| `StatusBadge` | `ViewingRequestListCard` | none outside scoped files | **NO** |

**VR-local replacement strategy:** stop importing/using those primitives in the four scoped files and apply local classNames matching profile / TASK-016 dashboard / renter unavailable reference patterns. Do not introduce new shared primitives. Do not create design tokens. Do not rely on appending override classes to existing primitives (`className` concatenation without `twMerge`; `EmptyState` has no `className` prop).

---

## Cross-Role Safety

### `ViewingRequestRelationshipDetail`

Shared by:

- `frontend/app/realtor/viewing-requests/[id]/page.tsx` (`role="realtor"`)
- `frontend/app/viewing-requests/[id]/page.tsx` (`role="renter"`)

**Rule: DO NOT MODIFY.**

Reason:

- already satisfies dark/gold target;
- modifying would create unnecessary renter blast radius;
- TASK-017 achieves detail alignment via page chrome only.

### `RentalDocumentsSection`

Nested inside relationship detail. Already dark/gold. **DO NOT MODIFY.**

### `ConfirmDialog`

Realtor-specific. Already dark/gold. **DO NOT MODIFY.**

### Renter Viewing Requests

`/viewing-requests` and `/viewing-requests/[id]` must have **zero diff** from TASK-017 when shared components are untouched.

---

## Functional Contracts To Preserve

Presentation only. Any required change to these behaviours is **SCOPE EXPANSION** and must STOP.

### Inbox contracts

| ID | Contract | Current owner |
|----|----------|---------------|
| I1 | Default filter `DEFAULT_VIEWING_REQUEST_INBOX_FILTER` | `page.tsx` + `lib/realtorWorkspace.ts` |
| I2 | Filter → `getViewingRequestInboxApiStatus(filter)` | `page.tsx` |
| I3 | Load `getRealtorViewingRequests({ status?, limit: 100 })` | `page.tsx` |
| I4 | Race-safe load via `loadSequenceRef` | `page.tsx` |
| I5 | Result label via `getViewingRequestInboxResultLabel` | `page.tsx` |
| I6 | Empty title via `getViewingRequestInboxEmptyTitle` | `page.tsx` |
| I7 | Status filter tab behavior and disabled-while-working | `ViewingRequestStatusTabs` + `page.tsx` |
| I8 | Grid `grid-cols-1 lg:grid-cols-2` | `page.tsx` |
| I9 | Review → `/realtor/viewing-requests/{id}` | `ViewingRequestListCard` |
| I10 | Accept → `ConfirmDialog` → `acceptViewingRequest(id)` | `page.tsx` |
| I11 | Decline → `ConfirmDialog` → `declineViewingRequest(id)` | `page.tsx` |
| I12 | Reload active filter after successful mutation | `page.tsx` |
| I13 | Initial loading skeleton before first load | `page.tsx` |
| I14 | Error semantics/copy (`role="alert"`) | `page.tsx` |
| I15 | Status-dependent card actions (pending/accepted/declined/cancelled) | `ViewingRequestListCard` |

### Detail contracts

| ID | Contract | Current owner |
|----|----------|---------------|
| D1 | Numeric route ID parsing; invalid → unavailable | `[id]/page.tsx` |
| D2 | Load `getRealtorViewingRequest(id)` | `[id]/page.tsx` |
| D3 | Success → `ViewingRequestRelationshipDetail role="realtor"` | `[id]/page.tsx` |
| D4 | Back destination `/realtor/viewing-requests` | relationship detail props |
| D5 | Accept/Decline → `ConfirmDialog` → API update | `[id]/page.tsx` |
| D6 | Property archive/public relationship semantics | `ViewingRequestRelationshipDetail` — **unchanged** |
| D7 | `RentalDocumentsSection variant="relationship-page"` | relationship detail — **unchanged** |
| D8 | Loading `role="status"` / `aria-live="polite"` | `[id]/page.tsx` |
| D9 | Unavailable/not-found messaging | `[id]/page.tsx` |

### Business-data-changing actions

Future implementation may retain mutating controls, but verification and production acceptance must distinguish them.

| Action | Route | Acceptance guidance |
|--------|-------|---------------------|
| Accept viewing request | inbox + detail | Prefer read-only validation in production; do not mutate production status for visual proof |
| Decline viewing request | inbox + detail | Same |
| Document upload/archive | relationship UI | Avoid triggering during acceptance |

If production data lacks pending cards or action branches:

```text
NOT DIRECTLY OBSERVED — CURRENT PRODUCTION DATA
```

Record honestly; rely on local verification for those branches.

---

## Semantic Color Contract

| Meaning | Treatment |
|---------|-----------|
| Brand / primary contextual CTA / active filter emphasis / focus | Gold `#DFC58A` |
| Gold-filled control text | `#1B1B1B` only — white/light on gold is forbidden |
| Pending status | Semantic amber/warning on dark — **not** gold branding |
| Accepted status | Semantic green/emerald on dark |
| Declined status | Semantic red on dark |
| Cancelled status | Neutral/muted on dark |
| Accept action (pending cards) | Positive secondary — not destructive red; not gold primary |
| Decline action | Destructive red emphasis on dark secondary — **not** gold |
| Inbox/detail errors | Semantic red, dark-adapted — **not** gold |

Do not flatten all status semantics into gold.

---

## Accessibility Contract

Contrast from TASK-015/TASK-016 remains binding:

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
3. Touch targets preserve current `min-h-11` / `h-11` behavior.
4. Semantic amber/red/green remain readable on dark surfaces.
5. Do not lower font sizes for aesthetics.
6. Do not communicate status meaning through color alone where text labels already exist.
7. Preserve existing `role`, `aria-*`, headings, `role="status"`, and `role="alert"` semantics.

---

## Responsive Contract

Future verification targets:

```text
desktop ≈ 1280×900
mobile  ≈ 390×844
```

Preserve existing responsive behavior. Do **not** perform a responsive redesign.

### Inbox

- one column mobile; two columns at current `lg` breakpoint;
- filter tablist remains horizontally scrollable (`overflow-x-auto`);
- cards stack without horizontal overflow;
- long property title truncates; renter email truncates;
- action buttons stack `flex-col` → `sm:flex-row`;
- touch targets remain ≥ ~44px.

### Detail

- shared relationship detail responsive structure unchanged;
- page wrapper must not introduce horizontal overflow;
- unavailable/loading states fit mobile width.

---

## Inbox Presentation Target

| Element | Target |
|---------|--------|
| Route background | Dark local wrapper; no D1 gutter |
| Heading | `#F5F5F5` |
| Description | `#B8B8B8` |
| Filter tabs | Dark surfaces; active filter obvious with restrained gold; inactive muted; gold focus |
| Cards | `#252525` / `#2D2D2D`; no white surfaces |
| Status labels | Semantic on dark |
| Primary contextual actions | Gold with dark text where appropriate |
| Accept / Decline | Semantic intent preserved |
| Empty state | Dark local presentation |
| Error state | Dark semantic red |
| Loading | Dark coverage; `white/10` pulses |

No blue primary visual language remains on inbox surfaces.

---

## Detail Presentation Target

| Branch | Target |
|--------|--------|
| Success | Dark page wrapper only; relationship detail internals unchanged |
| Loading | Dark full-route coverage |
| Unavailable / not found | Dark elevated card; dark semantic error; gold back CTA with `#1B1B1B` text; destination unchanged |

No light page-level seam around dark relationship content.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend presentation (Realtor VR inbox + detail chrome) | CHANGED |
| Frontend routing / navigation logic | UNCHANGED |
| Frontend auth guard | UNCHANGED |
| API client / services | UNCHANGED |
| `lib/realtorWorkspace.ts` | UNCHANGED |
| `ViewingRequestRelationshipDetail` | UNCHANGED |
| Shared `components/ui/*` implementations | UNCHANGED |
| Backend, database, migrations | UNCHANGED |
| Request / use-case lifecycle | UNCHANGED |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| VR inbox is light/blue on inherited D1 | VERIFIED | `viewing-requests/page.tsx`, `ViewingRequestListCard.tsx`, `ViewingRequestStatusTabs.tsx` |
| VR detail page chrome is light/mixed | VERIFIED | `[id]/page.tsx:118–131, 28–46, 197–199` |
| Relationship detail is already dark/gold | VERIFIED | `ViewingRequestRelationshipDetail.tsx` |
| Shell D1 `main` is `bg-zinc-50 text-zinc-900` | VERIFIED | `RealtorWorkspaceShell.tsx:235` |
| Shared UI primitives used only in scoped VR files | VERIFIED | grep `frontend/` imports |
| TASK-016 established local replacement + `min-h-full` D1 pattern | VERIFIED | archived TASK-016 + `page.tsx:56` |
| Renter unavailable dark pattern exists as reference | VERIFIED | `app/viewing-requests/[id]/page.tsx:14–44` |
| TASK-017 identifier free at definition | VERIFIED | `docs/engineering/tasks/` only `README.md`; no TASK-017 archive |
| Fifth runtime file not required | VERIFIED | scope reconfirmation above |
| White-on-gold contrast 1.54:1 forbidden | VERIFIED | TASK-015/TASK-016 accessibility contract |

---

## Proposed Change

Restyle the four authorized files to the existing dark/gold system using established local patterns. Cover D1 with local `min-h-full` page wrappers on both routes and all branches. Replace VR usage of light shared primitives with local markup in scoped files only. Do not change handlers, fetches, routes, filter logic, or cross-role components.

---

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| Incomplete D1 coverage (light seam / gutter) | MEDIUM | dark wrapper on every branch; desktop + mobile visual check |
| Accidental accept/decline behavior change | MEDIUM | presentation-only diff review; preserve handlers/dialog props |
| Incorrect status semantics (gold replaces amber/red/green) | MEDIUM | semantic color contract; card/tab review |
| Accidental shared UI / cross-role modification | MEDIUM | hard OUT list; renter route diff must be empty on shared files |
| White/light text on gold primary CTA | MEDIUM | `#1B1B1B` on `#DFC58A` required |
| Responsive card/action regression | LOW-MEDIUM | preserve current grid/stack classes; verify ~390×844 |
| `min-h-screen` double-height scroll | LOW | use `min-h-full` |
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

Diff review: exactly the four runtime files plus this task document; no dependency, shared UI implementation, shell, dashboard, My Listings, renter route, `lib/realtorWorkspace.ts`, backend, or cross-role component changes.

### Browser — desktop ~1280 × 900 — inbox `/realtor/viewing-requests`

- route fully dark; no D1 gutter;
- heading/description readable;
- tabs dark/gold; active filter distinct;
- cards dark; semantic statuses preserved;
- no blue primary language;
- empty/error/loading dark where observable;
- no horizontal overflow.

### Browser — desktop — detail `/realtor/viewing-requests/[id]`

- surrounding page fully dark on all observable branches;
- shared relationship content unchanged internally;
- no light gutter around relationship detail;
- loading/unavailable dark;
- back destination unchanged.

### Browser — mobile ~390 × 844

- full dark coverage on inbox and detail;
- filters usable; cards stack; actions fit;
- touch sizing retained; no overflow.

### Cross-role regression

- `/realtor` Dashboard dark/gold unchanged;
- `/realtor/profile`, `/realtor/properties/*` unchanged;
- `/viewing-requests/*` renter routes unchanged;
- `frontend/components/ui/*` implementations unchanged;
- `ViewingRequestRelationshipDetail` unchanged.

No production access during implementation verification. Prefer read-only navigation in production acceptance; do not mutate viewing request status for visual proof.

---

## Security

Security scope: **UNCHANGED**. No changes to session handling, CSRF, role enforcement, API authorization, ownership rules, or realtor/renter access boundaries. Any security/auth code change is **blocking scope expansion**.

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
| Shared cross-role runtime changes | NO |
| Shared UI implementation | NO |

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert the TASK-017 frontend change and redeploy the previously verified frontend image; Realtor Viewing Requests returns to the light presentation inside the dark shell. No data impact.

Rollback image identity is not defined at definition time. A later deployment gate must preserve the then-current frontend production image before build.

---

## Acceptance Criteria

Outcome after a later authorized implementation + verification. All 45 must pass.

1. Realtor Viewing Requests inbox has full local dark background.
2. No D1 zinc gutter is visible on the inbox route.
3. Page title/description are dark-theme readable.
4. Filter tabs use dark/gold presentation.
5. Active filter remains obvious.
6. Filter behavior is unchanged.
7. Request cards are dark.
8. White card surfaces are removed from inbox cards.
9. Status labels retain semantic distinctions.
10. Pending semantics are not replaced indiscriminately with gold.
11. Accepted semantics remain green/emerald where applicable.
12. Declined/destructive semantics remain red where applicable.
13. Primary brand emphasis uses gold appropriately.
14. Gold-filled controls use dark text `#1B1B1B`.
15. Focus rings are gold with dark offsets.
16. Empty inbox state is dark.
17. Inbox loading state is dark.
18. Inbox error state is dark with semantic red.
19. Detail route has full local dark background on all branches.
20. Successful detail retains existing `ViewingRequestRelationshipDetail` rendering.
21. Shared relationship component is not modified.
22. `RentalDocumentsSection` is not modified.
23. Detail loading state is dark.
24. Detail unavailable/not-found state is dark.
25. Detail return/back destination is unchanged (`/realtor/viewing-requests`).
26. Accept behavior is unchanged.
27. Decline behavior is unchanged.
28. Confirmation dialog behavior is unchanged.
29. API paths/methods/query parameters are unchanged.
30. Inbox reload-after-action behavior is unchanged.
31. Race-safe loading behavior (`loadSequenceRef`) is unchanged.
32. Desktop layout remains intact (~1280 × 900).
33. Mobile card stacking remains intact (~390 × 844).
34. Mobile controls fit without horizontal overflow.
35. Touch targets remain approximately ≥ 44px.
36. No global shared UI implementation under `frontend/components/ui/*` is modified.
37. Renter Viewing Requests routes are unchanged.
38. `RealtorWorkspaceShell` is unchanged.
39. Dashboard and My Listings are unchanged.
40. No backend/API/DB/auth/dependency changes occur.
41. `npm run lint` PASS.
42. `npm run typecheck` PASS.
43. `npm run build` PASS.
44. `git diff --check` PASS.
45. No production mutation during local implementation/verification.

---

## Non-Goals

- Global site recolor
- Renter Viewing Requests redesign
- Shared primitive restyle under `components/ui/*`
- Design token system
- TASK-015 shell D1 global removal
- Modifying `ViewingRequestRelationshipDetail`
- Backend / API / DB / viewing lifecycle changes
- Responsive redesign
- TASK-018

---

## Mutation Prohibitions (definition gate)

The definition gate itself modified no runtime code. Implementation, commit, push, deploy, production access, shared-primitive implementation change, shell change, cross-role component change, and TASK-018 creation remain unauthorized.

---

## Implementation Result (implementation gate — 2026-08-20)

Baseline at implementation start (VERIFIED): HEAD `12ff9b31b593165c1f1b0f6c494d35d255e62e38`, `origin/main` identical, divergence `0 0`, worktree containing only this untracked document.

### Files changed

| File | Change |
|------|--------|
| `frontend/app/realtor/viewing-requests/page.tsx` | Route-local dark shell on both render paths, dark heading/copy/result label, dark skeleton pulses, dark semantic error, route-local dark empty state replacing `SectionCard` + `EmptyState` |
| `frontend/app/realtor/viewing-requests/[id]/page.tsx` | Route-local dark shell on all branches, dark loading skeleton, dark/gold unavailable card replacing `SectionCard` + blue CTA |
| `frontend/components/realtor/viewing-requests/ViewingRequestListCard.tsx` | Dark elevated card, dark typography, route-local semantic status badge and action classes replacing `StatusBadge` / `PrimaryButton` / `SecondaryButton` |
| `frontend/components/realtor/viewing-requests/ViewingRequestStatusTabs.tsx` | Dark inactive tabs, gold active tab, gold focus ring with page-surface offset, `min-h-11` touch target |

`git diff --stat`: 4 files, 232 insertions, 160 deletions. No fifth runtime file. Protected paths (`frontend/components/ui/`, `ViewingRequestRelationshipDetail.tsx`, `RentalDocumentsSection.tsx`, `realtor/ConfirmDialog.tsx`, `realtor/workspace/`, `app/realtor/layout.tsx`, `app/viewing-requests/`, `frontend/lib/`, `backend/`) have an empty diff (VERIFIED).

### Structural RED patterns removed

`bg-white` card surface, `border-zinc-200`, `bg-zinc-100` / `bg-zinc-200` pulses, `text-zinc-900` / `text-zinc-700` / `text-zinc-600` / `text-zinc-500` / `text-zinc-400`, `bg-blue-700 text-white` (tab active, primary buttons, detail back CTA), `ring-blue-700` focus, `border-red-200 bg-red-50 text-red-700` error, light `SectionCard` / `EmptyState` / `StatusBadge` usage inside the four files.

### Approved-scope deviation recorded

**D3 — route padding added to the inbox route and to the detail page's loading/unavailable branches.**
The workspace shell `main` carries no padding; every other realtor route owns its own (`/realtor` uses `px-4 py-6 md:px-8 md:py-8`, the relationship detail uses `px-5 py-6 md:px-8 md:py-8`). The Viewing Requests inbox container had none since commit `0139d67`, so content sat flush against the sidebar border and the viewport edge. Because the route now owns a dark surface, the flush edge becomes structurally visible. Padding matching the established realtor pattern was added inside the authorized files only. Measured result: card right edge `374 px` at a `390 px` mobile viewport (16 px gutter). No grid, container width, or breakpoint changed.

Also recorded as intentional presentational adjustments inside the authorized files: filter tabs moved from `py-2` (≈36 px) to `min-h-11` (44 px measured) to satisfy the touch-target contract, and disabled opacity moved from `50` to `60` for legibility on dark surfaces.

---

## Local Verification (implementation gate — 2026-08-20)

### Static

| Check | Result |
|-------|--------|
| `npm run lint` | PASS — 0 errors, 4 warnings, all pre-existing `@next/next/no-img-element` in `app/apple-icon.tsx`, `app/icon.tsx`, `app/opengraph-image.tsx`, `components/RentoLogo.tsx`; none in TASK-017 scope |
| `npm run typecheck` | PASS — clean |
| `npm run build` | PASS — compiled in 3.6 s, TypeScript in 4.4 s, 23/23 static pages, both `/realtor/viewing-requests` routes present |
| `git diff --check` | PASS — exit 0 |

### Verification method and business-data safety

Local dev server (`next dev`, port 3000) was pointed at a throwaway mock API outside the repository (`%TEMP%`) exposing `/users/me`, `/realtor/viewing-requests`, `/realtor/viewing-requests/{id}`, the accept/decline actions, and the renter equivalents, with fixtures covering pending / accepted / declined / cancelled, an archived-property relationship, a very long title and a very long renter email. No production access occurred, no production request status changed, and the harness was deleted after verification — no verification code exists in the repository (VERIFIED).

### D1 coverage (measured, `main` is light `lab(98.26 0 0)`)

| Route / branch | Dark shell height | `main` height | Result |
|----------------|-------------------|---------------|--------|
| Inbox — initial skeleton | 851 px | 851 px | no zinc gutter |
| Inbox — inline loading | 851 px | 851 px | no zinc gutter |
| Inbox — loaded (desktop) | 851 px | 851 px | no zinc gutter |
| Inbox — empty | 851 px | 851 px | no zinc gutter |
| Inbox — error | 851 px | 851 px | no zinc gutter |
| Inbox — loaded (mobile) | 2265 px | 2265 px | no zinc gutter |
| Detail — loading | 851 px | 851 px | no zinc gutter |
| Detail — unavailable / not-found | 851 px | 851 px | no zinc gutter |
| Detail — success (desktop) | 888 px | 888 px | no zinc gutter |
| Detail — success (mobile) | 949 px | 949 px | no zinc gutter |

`min-h-full` was used on every branch; no `min-h-screen` double-height behavior was introduced.

### Measured presentation contract

| Element | Measured |
|---------|----------|
| Route background | `rgb(27,27,27)` |
| Card surface / text | `rgb(45,45,45)` / `rgb(245,245,245)` |
| Active tab | `rgb(223,197,138)` background, `rgb(27,27,27)` text, 44 px |
| Inactive tab | `rgb(37,37,37)`, `rgb(184,184,184)`, 44 px, `overflow-x: auto` preserved (scrollWidth 470 > clientWidth 366 on mobile) |
| Review / Manage relationship | `rgb(223,197,138)` on `rgb(27,27,27)` text, 48 px |
| Accept / Email renter / Open property / View details | `rgb(37,37,37)`, `rgb(245,245,245)`, 48 px |
| Decline | `rgb(42,32,32)` with `red-400/20` border and `red-200` text, 48 px |
| Detail back CTA | `rgb(223,197,138)` with `rgb(27,27,27)` text, 44 px |
| Error (inbox and detail) | `rgb(42,34,34)`, `red-400/15` border, `red-100/90` text, `role="alert"` preserved |
| Loading | `role="status"`, `aria-live="polite"`, sr-only text preserved, pulses `white/5` on `white/8` border, heights 208 px (inbox) and 224 px (detail) unchanged |
| Empty | `#2D2D2D` shell over `#252525` panel, `#F5F5F5` `h3`, copy `No cancelled viewing requests` from `getViewingRequestInboxEmptyTitle` |

### Semantic status contract (measured)

| Status | Surface | Text | Result |
|--------|---------|------|--------|
| pending | `rgb(42,38,32)` | `amber-200` | amber preserved, not gold |
| accepted | `rgb(34,42,36)` | `emerald-200` | green preserved |
| declined | `rgb(42,32,32)` | `red-200` | red preserved |
| cancelled | `rgb(37,37,37)` | `rgb(184,184,184)` | neutral/muted |

Textual labels remain (`Awaiting your response`, `Accepted`, `Declined`, `Cancelled`) so status is not conveyed by color alone. Gold is used only for the active filter, primary actions, the unavailable back CTA, and focus rings.

### Functional preservation (observed)

- Default filter `pending`; filter switch updates `aria-selected` and refetches with the mapped status; `all` sends no status.
- Result label logic intact: `2 pending viewing requests` → `1 pending viewing request` after an accept (singular/plural preserved).
- Accept flow: card button → `ConfirmDialog` (`Accept viewing request?`) → confirm → list reloads, pending count 2 → 1, active filter preserved.
- Decline flow: dialog opens (`Decline viewing request?`), Cancel dismisses it with no mutation (2 → 2).
- `ConfirmDialog` unmodified and already dark (`rgb(45,45,45)`).
- Conditional actions preserved: the archived-property accepted request correctly omits `Open property`.
- Detail: numeric ID parsing preserved — `/abc` renders `Viewing request unavailable` with `This viewing request could not be found.`; `/999` renders the API message `Viewing request not found`; both keep the `/realtor/viewing-requests` back destination.
- Detail success renders `ViewingRequestRelationshipDetail` with its own padding, gold/dark styling untouched, and `#property-documents-heading` (rental documents integration) present.

### Desktop (1280 × 900) and mobile (390 × 844)

Desktop: `scrollWidth` 1280 = `clientWidth` 1280 (and 1265 = 1265 when the scrollbar is present) on inbox and detail — no horizontal overflow. Mobile: `documentElement.scrollWidth` 390, `body.scrollWidth` 390, `clientWidth` 390 on inbox and detail — no horizontal overflow. Mobile cards are single-column at 358 px inside a 390 px viewport; long titles and renter emails truncate with `text-overflow: ellipsis` as before; action buttons are full-width 48 px.

### Accessibility

Focus rings verified with forced `:focus-visible`:

| Control | Measured box-shadow |
|---------|---------------------|
| Filter tab | `rgb(27,27,27)` 2 px offset then `rgb(223,197,138)` 2 px ring |
| Card `Review` | `rgb(45,45,45)` 2 px offset then `rgb(223,197,138)` 2 px ring |
| Card `Decline` | `rgb(45,45,45)` 2 px offset then `rgb(223,197,138)` 2 px ring |

Gold-filled controls use `#1B1B1B` text (no white-on-gold). Touch targets: tabs 44 px, card actions 48 px, back CTA 44 px. Font sizes unchanged. `role="status"` / `aria-live` / `role="alert"` / `aria-hidden` / `sr-only` / `aria-selected` / `aria-current` all preserved. Reference contrast (TASK-015 table): `#F5F5F5` on `#2D2D2D` 12.63:1, `#B8B8B8` on `#2D2D2D` 6.94:1, `#1B1B1B` on `#DFC58A` 10.25:1; semantic text uses Tailwind `*-200` tints on near-black tinted surfaces.

### Cross-role and other-realtor regression

| Check | Result |
|-------|--------|
| `frontend/components/ViewingRequestRelationshipDetail.tsx` | no diff |
| `frontend/components/RentalDocumentsSection.tsx` | no diff |
| `frontend/app/viewing-requests/*` | no diff |
| `frontend/components/ui/*` | no diff |
| `frontend/components/realtor/ConfirmDialog.tsx` | no diff |
| `frontend/components/realtor/workspace/*`, `app/realtor/layout.tsx` | no diff |
| Renter `/viewing-requests/103` rendered locally | own `min-h-screen bg-[#1B1B1B]` main, back href `/viewing-requests`, rental documents present — unchanged |
| `/realtor` dashboard rendered locally | route-local dark shell `min-h-full bg-[#1B1B1B]` intact, covering `main` exactly |

### Defects found and fixed during implementation

Pre-existing missing route padding on the inbox (and on the detail loading/unavailable branches) was corrected inside the authorized files — see deviation D3. No other defects were found.

### Verification limitations

- Full-viewport desktop screenshots tile in this environment because the capture surface is narrower than the emulated viewport; desktop conclusions rest on computed-style and geometry measurements plus mobile screenshots. Same limitation recorded for TASK-015/TASK-016.
- Synthetic key events did not reach the page in this embedded browser, so focus rings were verified through forced `:focus-visible` pseudo-state rather than physical Tab traversal.
- Contrast ratios for the semantic amber/emerald/red tints were not numerically recomputed; they use light Tailwind `*-200` tints on near-black surfaces and the established dark palette ratios.
- The realtor dashboard regression check ran against a mock lacking dashboard endpoints, so it confirms dark shell integrity rather than full dashboard content.
- No production access, no commit, no push, no deployment.

---

## Gate Decision

```text
TASK_017_IMPLEMENTATION_VERIFIED
Next:
READY_FOR_TASK_017_COMMIT_REVIEW
```
