# TASK-015 — Realtor Workspace Shell Dark/Gold Visual Alignment

| Field | Value |
|-------|-------|
| ID | TASK-015 |
| TITLE | Realtor Workspace Shell Dark/Gold Visual Alignment |
| STATUS | VERIFYING |
| RISK | MEDIUM |
| CLASSIFICATION | Frontend presentation-only alignment / realtor workspace chrome |

> STATUS: VERIFYING means implementation and local verification are complete. Commit, push, deployment, and production acceptance are **not** authorized by this state.

**Implementation authorization:** YES — IMPLEMENTATION + LOCAL VERIFICATION ONLY gate (2026-08-19). No commit/push/deploy/production access authorized.

**Lifecycle:**

| Stage | State |
|-------|-------|
| Definition | COMPLETE |
| Implementation | COMPLETE |
| Local verification | PASS |
| Commit review | PASS — `D1_ACCEPTED`, `D2_ACCEPTED` |
| Commit | NOT YET |
| Push | NOT YET |
| Deployment | NOT YET |
| Production acceptance | NOT YET |
| Closure | NOT YET |
| Archive | NOT YET |

**Initiative reference:** Global dark/gold visual consistency audit — bounded increment selected 2026-08-19 (`NEXT_TASK_DISCOVERY_COMPLETE`).

**Repository baseline at definition (VERIFIED 2026-08-19):**

| Field | Value |
|-------|-------|
| HEAD | `76512775fee1a07b0ce70eeae296563d82491c20` |
| origin/main | `76512775fee1a07b0ce70eeae296563d82491c20` |
| divergence | `0 0` |
| Worktree | clean |
| Active tasks before creation | `docs/engineering/tasks/README.md` only |
| Prior task | TASK-014 — CLOSED / ARCHIVED / COMPLETE |
| TASK-015 identifier | free (only OUT OF SCOPE references inside archived TASK-014) |

**Runtime note:** Production frontend runtime is deployed at TASK-014 implementation SHA `0139d6760c22f2df8e5c2a1babc4cc65cc3d64d7`; repository HEAD additionally contains TASK-014 closure and archive documentation commits. This is expected and must not be treated as deployment drift.

---

## Product Direction

Rento uses a premium **DARK / GOLD** visual language. Dark/gold is the **target** design system, not legacy styling. The light Realtor Workspace chrome introduced by TASK-012 is therefore now classified as a **visual inconsistency**, while the architecture and product value delivered by TASK-012 remain correct and must be preserved.

TASK-015 is **presentation-only**. It is not a redesign of Realtor Workspace functionality.

---

## Problem

**User problem:** Every realtor route is wrapped in a light SaaS-style chrome (`bg-zinc-50` page, white sidebar/header, blue active navigation), while the majority of the content inside that chrome is already dark/gold. The realtor therefore moves between a generic light frame and premium dark Rento content within one workspace, which weakens brand coherence and makes the workspace feel like a different product from the rest of Rento.

**Measured inconsistency (VERIFIED 2026-08-19, `frontend/**/*.{tsx,ts,css}` occurrence counts):**

| Group | Values | Occurrences |
|-------|--------|-------------|
| Target dark/gold | `#DFC58A` / `#F5F5F5` / `#B8B8B8` / `#252525` / `#2D2D2D` / `#1B1B1B` | 354 / 290 / 257 / 173 / 158 / 145 |
| Light/blue inconsistency | `text-zinc-*` / `bg-zinc-*` / `border-zinc-*` / solid `bg-white` / `ring-blue-*` / `bg-blue-*` / `text-blue-*` | 62 / 39 / 20 / ~19 / 14 / 9 / 9 |

**Realtor area is internally mixed (VERIFIED):**

| Surface | Style |
|---------|-------|
| Workspace shell + layout skeleton | LIGHT |
| Dashboard top zone (`app/realtor/page.tsx:703–802`) | LIGHT |
| My Listings section (`app/realtor/page.tsx:58, 813`) | DARK |
| Viewing Requests inbox / detail wrapper | LIGHT |
| Realtor profile (`app/realtor/profile/page.tsx`) | DARK (74 dark vs 5 light matches) |
| Property create (`app/realtor/properties/create/page.tsx`) | DARK (69 vs 3) |
| Property edit (`app/realtor/properties/[id]/edit/page.tsx`) | DARK (31 vs 3) |
| `RealtorPropertyCard`, `RealtorPropertyGallery`, `PropertyBottomSheet`, `PropertyEmptyState`, `ConfirmDialog` | DARK |

Consequently the light shell is a minority style wrapping mostly dark content: aligning the shell reduces net inconsistency instead of introducing new mismatch.

---

## Current Behavior (VERIFIED 2026-08-19)

`frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx`:

| Element | Current styling | Line |
|---------|-----------------|------|
| Active nav row | `bg-blue-50 text-blue-700 ring-1 ring-blue-100` | 47 |
| Inactive nav row | `text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900` | 50 |
| Nav focus ring | `focus-visible:ring-blue-700 focus-visible:ring-offset-2` | 116 |
| Nav group label | `text-zinc-400` | 94 |
| App background | `min-h-screen bg-zinc-50 text-zinc-900` | 165 |
| Desktop sidebar | `border-r border-zinc-200 bg-white` | 167 |
| Sidebar brand block | `border-b border-zinc-200`, `text-zinc-900`, `text-zinc-500` | 168, 181, 184 |
| Sticky header | `border-b border-zinc-200 bg-white/95 backdrop-blur` | 199 |
| Menu trigger | `border-zinc-200 text-zinc-700 hover:bg-zinc-50`, blue focus ring | 204 |
| Role badge | `bg-blue-50 text-blue-700 ring-1 ring-blue-100` | 222 |
| Drawer overlay | `bg-zinc-900/30` | 237 |
| Drawer panel | `border-r border-zinc-200 bg-white shadow-xl` | 244 |
| Drawer close control | `border-zinc-200 text-zinc-700 hover:bg-zinc-50`, blue focus ring | 258 |

`frontend/app/realtor/layout.tsx`:

| Element | Current styling | Line |
|---------|-----------------|------|
| Skeleton container | `min-h-screen bg-zinc-50` | 19 |
| Skeleton blocks | `bg-zinc-200` (three blocks) | 23–25 |

No dark/gold value is used anywhere in these two files.

---

## Target Behavior

The persistent Realtor Workspace chrome uses the existing Rento dark/gold visual system, while all navigation, authentication, responsive, accessibility, and routing behavior remains byte-for-byte equivalent in effect.

Desired hierarchy:

```text
application background      #1B1B1B
sidebar / sticky header     #252525 (established navigation surface)
elevated mobile drawer      #2D2D2D (established elevated surface)
primary text                #F5F5F5
muted text                  #B8B8B8
active navigation           dark elevated row + gold accent
inactive navigation         muted light text → #F5F5F5 on hover
hover                       subtle dark surface / border change
focus                       visible gold ring + dark ring offset
borders                     restrained white-opacity (white/8, white/10)
```

Gold expresses **active selection, key emphasis, focus/action accent** only. No decorative gradients. No blue primary accent in the shell. No second gold palette.

---

## Visual Reference (existing code — do not invent a new aesthetic)

| Role | Reference | Established pattern |
|------|-----------|---------------------|
| Workspace sticky chrome | `frontend/components/admin/AdminWorkspaceHeader.tsx:51` | `sticky top-0 border-b border-white/10 bg-[#252525]/95 backdrop-blur` |
| Nav base + focus | `AdminWorkspaceHeader.tsx:36–37` | `focus-visible:ring-2 focus-visible:ring-[#DFC58A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#252525]` |
| Nav active | `AdminWorkspaceHeader.tsx:41` | `bg-[#2D2D2D] text-[#DFC58A]` + `underline decoration-[#DFC58A] decoration-2 underline-offset-4` |
| Nav inactive | `AdminWorkspaceHeader.tsx:44` | `text-[#B8B8B8] hover:text-[#F5F5F5]` |
| Muted chrome label | `AdminWorkspaceHeader.tsx:54` | `text-xs font-bold uppercase tracking-wide text-[#B8B8B8]` |
| Page/app shell | `frontend/components/admin/AdminPageShell.tsx:14` | `min-h-screen bg-[#1B1B1B] text-[#F5F5F5]` |
| Elevated panel / drawer surface | `frontend/components/realtor/PropertyBottomSheet.tsx:63`, `ConfirmDialog.tsx:72` | `border border-white/8 bg-[#2D2D2D]` |
| Overlay | `ConfirmDialog.tsx:66`, `PropertyBottomSheet.tsx:55` | `bg-[#1B1B1B]/80` (optionally `backdrop-blur-[2px]`) |
| Icon-button on dark | `PropertyBottomSheet.tsx:87` | `border border-white/10 bg-[#252525] text-[#B8B8B8]` + gold focus ring |
| Dark skeleton | `frontend/app/properties/[id]/loading.tsx:4`, `frontend/components/AdminRoute.tsx:26–41` | pulse `bg-white/10` on `bg-[#2D2D2D]` surfaces |

`AdminWorkspaceHeader` + `AdminPageShell` are the closest functional analogue (internal workspace chrome with sticky header and navigation) and are already in the target palette.

---

## Accessibility Contract

Contrast computed from actual palette values (VERIFIED, WCAG relative luminance):

| Pair | Ratio | Verdict |
|------|-------|---------|
| `#F5F5F5` on `#1B1B1B` | 15.80 : 1 | excellent |
| `#F5F5F5` on `#2D2D2D` | 12.63 : 1 | excellent |
| `#DFC58A` on `#1B1B1B` | 10.25 : 1 | excellent |
| `#DFC58A` on `#252525` | 9.12 : 1 | excellent |
| `#DFC58A` on `#2D2D2D` | 8.19 : 1 | excellent |
| `#1B1B1B` on `#DFC58A` | 10.25 : 1 | excellent |
| `#B8B8B8` on `#1B1B1B` | 8.68 : 1 | acceptable |
| `#B8B8B8` on `#252525` | 7.73 : 1 | acceptable |
| `#B8B8B8` on `#2D2D2D` | 6.94 : 1 | acceptable (AA normal text) |
| `#F5F5F5` on `#DFC58A` | **1.54 : 1** | **NOT ALLOWED** |

Required rules:

1. Gold-filled controls must use dark text (`#1B1B1B`). Light/white text on gold is prohibited.
2. Gold must not be the only semantic signal — active navigation must also carry a non-colour cue (elevated dark row, underline/marker, and existing `aria-current="page"`).
3. Focus ring must remain visible on dark surfaces: gold ring plus a dark-compatible `ring-offset` matching the underlying surface (`#1B1B1B`, `#252525`, or `#2D2D2D`).
4. Muted text at small sizes should prefer `#F5F5F5`, or `#252525`/`#1B1B1B` backgrounds, rather than `#B8B8B8` on `#2D2D2D`.
5. Touch targets remain at least the current effective size (`min-h-11`, `h-11 w-11` controls).
6. Disabled controls must remain legible on dark surfaces — plain `opacity-50` inherited from light styling must be re-checked.
7. Destructive/status colours, if present in the shell, must use dark-compatible variants; the shell itself introduces no new status semantics.
8. Mobile drawer controls remain keyboard and focus usable, with focus visible against the drawer surface.

---

## Functional Contracts To Preserve (TASK-012 — VERIFIED current behavior)

| ID | Contract | Current implementation |
|----|----------|------------------------|
| A | `/realtor` layout is the shared auth boundary | `frontend/app/realtor/layout.tsx:31–59` |
| B | Unauthenticated users are redirected to login with `returnUrl` | `layout.tsx:40–48` via `sanitizeReturnUrl` + `buildLoginHref` |
| C | Authenticated non-realtor users are redirected to `/` | `layout.tsx:50–52` |
| D | Sidebar navigation structure remains identical | `RealtorWorkspaceShell.tsx:66` groups `Overview`, `Work`, `Account` |
| E | Nav items unchanged: Dashboard, Properties, Viewing Requests, Profile, Public Profile | `frontend/lib/realtorWorkspace.ts` `buildWorkspaceNavItems` |
| F | Active route indication remains correct, including `aria-current="page"` | `RealtorWorkspaceShell.tsx:100, 117` |
| G | Mobile drawer opens, closes via overlay and close button, closes on Escape, and navigating closes it | `RealtorWorkspaceShell.tsx:138, 146–159, 208, 235–271` |
| H | Properties nav hash behavior unchanged (`#realtor-properties-heading`, `history.replaceState`, scroll helper) | `RealtorWorkspaceShell.tsx:68–81` |
| I | No API/data-fetching behavior changes | shell performs no data fetch; only `useAuth()` consumption |
| J | No business logic added | presentation-only change |

Any required change to these behaviours is **scope expansion** and must stop for a separate decision.

---

## Expected File Scope

| File | Expected change |
|------|-----------------|
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | Dark/gold styling of chrome, navigation states, header, drawer, borders, text hierarchy |
| `frontend/app/realtor/layout.tsx` | Skeleton colour alignment only |

No other runtime file is authorized. If implementation appears to require dashboard components, Viewing Requests components, shared `components/ui/*`, `globals.css`, Tailwind configuration, auth logic, navigation structure, or backend/API changes, classify as **scope expansion** and STOP.

---

## In Scope

### `RealtorWorkspaceShell.tsx`

1. Overall application background.
2. Desktop sidebar surface and border.
3. Sidebar brand/logo block presentation, only as needed for palette alignment.
4. Navigation group labels.
5. Navigation inactive state.
6. Navigation active state (styling of the existing active computation only).
7. Navigation hover state.
8. Navigation focus state with dark-compatible ring offset.
9. Role badge.
10. Desktop/mobile sticky header chrome.
11. Mobile menu trigger.
12. Drawer overlay.
13. Drawer panel surface and border.
14. Drawer navigation presentation.
15. Drawer close control.
16. Dark-compatible borders throughout the shell.
17. Text hierarchy (primary/muted).

### `frontend/app/realtor/layout.tsx`

18. Loading/skeleton colours only: outer background, skeleton surfaces, skeleton contrast.

Structure, dimensions, loading behaviour, auth timing, and redirects remain unchanged.

---

## Out of Scope

| Item | Status |
|------|--------|
| `frontend/app/realtor/page.tsx` (dashboard page) | OUT OF SCOPE |
| Dashboard cards/components (`components/realtor/dashboard/*`) | OUT OF SCOPE |
| My Listings content and property cards | OUT OF SCOPE |
| Viewing Requests inbox and its components | OUT OF SCOPE |
| Viewing Request detail route | OUT OF SCOPE |
| Realtor profile content | OUT OF SCOPE |
| Property create/edit forms | OUT OF SCOPE |
| Image gallery, bottom sheet, `ConfirmDialog` | OUT OF SCOPE |
| `ViewingRequestRelationshipDetail`, `RentalDocumentsSection` | OUT OF SCOPE |
| Shared `frontend/components/ui/*` primitives | OUT OF SCOPE |
| Renter/public navigation, `BottomNav` | OUT OF SCOPE |
| Admin area | OUT OF SCOPE |
| Auth screens | OUT OF SCOPE |
| `globals.css` token migration, Tailwind theme redesign, design-token foundation | OUT OF SCOPE |
| Backend, API, database, migrations, dependencies | OUT OF SCOPE |
| TASK-016 | OUT OF SCOPE |
| Production deployment | OUT OF SCOPE (separate gate) |

---

## No Shared Token Refactor

Semantic colour tokens are **not** a prerequisite for TASK-015. Only two files are expected, the palette values already exist in code, and user-visible value is direct, whereas a global token refactor would touch ~1250 existing occurrences and enlarge the regression surface for no user benefit. If obvious local duplication appears inside the shell, a local `const` className may be used only where consistent with current code style (as already done in `AdminWorkspaceHeader.tsx:36–37`). No global architecture for hypothetical future needs.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend presentation (realtor workspace chrome) | CHANGED |
| Frontend routing / navigation logic | UNCHANGED |
| Frontend auth guard | UNCHANGED |
| API client / services | UNCHANGED |
| Backend, database, migrations | UNCHANGED |
| Request/use-case lifecycle | UNCHANGED |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Shell is light/blue: `bg-zinc-50`, white sidebar/header, `bg-blue-50 text-blue-700`, `ring-blue-700` | VERIFIED | `RealtorWorkspaceShell.tsx:47, 50, 116, 165, 167, 199, 204, 222, 237, 244, 258` |
| Layout skeleton is light | VERIFIED | `app/realtor/layout.tsx:19, 23–25` |
| Dark/gold dominates the codebase (`#DFC58A` 354, `#F5F5F5` 290, `#B8B8B8` 257, `#252525` 173, `#2D2D2D` 158, `#1B1B1B` 145) | VERIFIED | ripgrep occurrence counts over `frontend/**/*.{tsx,ts,css}` |
| Most realtor content is already dark (profile 74/5, create 69/3, edit 31/3, listings section, cards, dialogs) | VERIFIED | per-file class counts, `app/realtor/**`, `components/realtor/**` |
| Established dark workspace chrome reference exists | VERIFIED | `AdminWorkspaceHeader.tsx:36–60`, `AdminPageShell.tsx:14` |
| Shell does not import shared `components/ui/*` | VERIFIED | import list of `RealtorWorkspaceShell.tsx:1–27` |
| `components/ui/*` primitives are consumed only by realtor dashboard and Viewing Requests | VERIFIED | import search across `frontend/` |
| Contrast ratios for target palette, incl. white-on-gold failure at 1.54:1 | VERIFIED | WCAG computation over actual palette values |
| Shell performs no data fetching | VERIFIED | `RealtorWorkspaceShell.tsx` uses only `usePathname`, `useAuth`, local state |
| Frontend test infrastructure absent (no `*.test.*` under `frontend/`) | VERIFIED | repository inspection during TASK-014 |

Unit-test RED is **NOT APPLICABLE**; valid pre-implementation evidence is the structural/visual inconsistency documented above plus browser inspection.

---

## Proposed Change

Restyle the two files to the existing dark/gold system using the referenced established patterns: dark application background, `#252525` navigation surfaces with `white/10` borders, `#2D2D2D` elevated drawer, gold active navigation with a non-colour cue, muted `#B8B8B8` inactive text brightening to `#F5F5F5`, gold focus rings with dark ring offsets, `#1B1B1B/80` drawer overlay, and dark-compatible skeleton surfaces. No structural JSX changes beyond className values; no changes to hooks, handlers, navigation config, or auth logic.

---

## Intermediate State (accepted, temporary)

After TASK-015 the following inner surfaces intentionally remain light until later bounded tasks:

- operational Dashboard top section (`app/realtor/page.tsx:703–802`, `components/realtor/dashboard/*`)
- Viewing Requests inbox (`app/realtor/viewing-requests/page.tsx`, its two components)
- Viewing Request detail light wrapper (`app/realtor/viewing-requests/[id]/page.tsx`)
- shared light primitives in `components/ui/*`

This mixed state is **accepted**. TASK-015 must not expand to recolour these areas merely to remove all contrast in one release. Its purpose is limited to establishing the correct persistent shell. Follow-up candidates (not authorized here): Dashboard alignment, Viewing Requests alignment, `BottomNav` dark theme on renter viewing-request routes, admin property detail alignment.

---

## Responsive Contract

### Desktop (~1280 × 900)

- Sidebar, header, and content region keep current geometry.
- No layout shift versus current implementation.
- No horizontal overflow (`scrollWidth === clientWidth`).

### Mobile (~390 × 844)

- No page-level horizontal overflow.
- Menu trigger remains reachable and touch-friendly.
- Drawer width remains usable (`w-[min(100%,20rem)]`).
- Nav rows remain touch-friendly (`min-h-11`).
- Close action remains obvious against the dark drawer surface.
- Focus remains visible on dark surfaces.
- Long email/name text does not overflow (truncation preserved).
- Overlay sufficiently separates page from drawer; content behind drawer remains visually subordinate.

---

## Verification Plan

### Static

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
git diff --check
```

Review the diff for: exactly two changed files, no dependency changes, no structural JSX/logic changes, no shared primitive changes, no backend changes.

### Browser — desktop (~1280 × 900)

| Check | Expected |
|-------|----------|
| Shell chrome | dark/gold, no blue accent, no white sidebar/header |
| Sidebar surface and borders | dark surface with restrained white-opacity borders |
| Active nav | clearly visible, gold accent plus non-colour cue, `aria-current="page"` intact |
| Inactive nav / hover | readable muted text, visible hover feedback |
| Focus ring | visible gold ring with dark offset on all interactive chrome |
| Each nav route | navigates correctly (Dashboard, Properties, Viewing Requests, Profile, Public Profile) |
| Inner pages | both currently light (dashboard top, VR inbox) and dark (profile, property forms, My Listings) render correctly inside the new shell |
| Layout | no layout shift, no horizontal overflow |

### Browser — mobile (~390 × 844)

| Check | Expected |
|-------|----------|
| Mobile sticky header | dark/gold |
| Drawer open/close | works via trigger, overlay, close button, Escape |
| Drawer navigation | routes work and drawer closes on navigate |
| Active state in drawer | clearly visible |
| Focus | visible on dark surfaces |
| Overflow | none at 390px |

### Regression routes (local browser)

```text
/realtor
/realtor/viewing-requests
/realtor/profile
/realtor/properties/create
```

Plus My Listings anchor/hash behaviour (`/realtor#realtor-properties-heading`) and Public Profile navigation (`/realtors/{id}`). Purpose: prove the shell works around both light and dark inner content. Those pages must not be redesigned.

### Auth

| Case | Expected |
|------|----------|
| Unauthenticated `/realtor` and `/realtor/viewing-requests` | login redirect preserving `returnUrl` |
| Authenticated realtor | workspace renders |
| Authenticated non-realtor | redirected to `/` |

No production access during implementation verification.

---

## Security

Security scope: **UNCHANGED**. No changes to session handling, CSRF, role enforcement, API authorization, `returnUrl` semantics, or ownership rules. Any security/auth code change is **blocking scope expansion**.

---

## Deployment Classification

| Component | Expected |
|-----------|----------|
| Runtime scope | FRONTEND_ONLY |
| Backend | NO |
| Database | NO |
| Migration | NONE |
| Nginx | NO |
| Docker / Compose | NO |
| Dependencies | NO |
| Auth / session | NO |
| API | NO |

Production risk: **LOW**. Implementation risk: **LOW-MEDIUM**.

---

## Risks

| Risk | Level | Notes |
|------|-------|-------|
| Database | NONE | Frontend-only |
| Migration | NONE | |
| Backend | NONE | |
| API contract | NONE | No data access change |
| Authentication / authorization | UNCHANGED | Guard untouched |
| Navigation contrast | MEDIUM | Active/inactive distinction must stay obvious on dark |
| Mobile drawer | MEDIUM | Overlay/surface separation and close affordance on dark |
| Focus states | MEDIUM | Blue rings become invisible on dark; gold ring + offset required |
| Active route styling | MEDIUM | Must style existing computation only, not routing logic |
| Interaction with still-light inner pages | MEDIUM | Dark chrome around light dashboard/inbox is an accepted interim contrast |
| Layout shift | LOW | Only colour-level changes intended |
| Production | LOW | Frontend-only deploy, user-visible chrome change |
| Rollback | LOW | Revert frontend image; no data impact |

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert the TASK-015 frontend change and redeploy the previously verified frontend image; the workspace chrome returns to the light TASK-012 presentation with no data impact.

If deployment is later authorized, that gate must preserve the then-current frontend production image as an exact rollback artifact **before** build. Production must not be inspected now, and the rollback image ID must not be defined at definition time — it belongs to deployment preflight.

---

## Acceptance Criteria

1. Realtor Workspace persistent chrome uses the target dark/gold visual language.
2. No blue primary Workspace accent remains in the shell.
3. No white/light primary sidebar or drawer surface remains.
4. Active navigation is clearly visible on desktop sidebar and mobile drawer.
5. Inactive navigation remains readable.
6. Focus state is visible on dark surfaces with a dark-compatible ring offset.
7. Gold-filled elements use dark text; light text on gold is absent.
8. Desktop navigation works unchanged for all five nav items.
9. Mobile drawer opens, closes, and navigates unchanged.
10. Escape/close behaviour remains unchanged.
11. Current nav structure and grouping remain unchanged.
12. Auth behaviour remains unchanged (login redirect with `returnUrl`, non-realtor redirect).
13. Properties/hash navigation behaviour remains unchanged.
14. Layout works correctly around both light and dark inner content.
15. No horizontal overflow at ~1280 × 900 and ~390 × 844.
16. Skeleton/loading state aligned to the dark system while remaining structurally identical.
17. No shared UI primitive (`components/ui/*`) changes.
18. No backend, API, schema, or dependency changes.
19. `npm run lint` PASS.
20. `npm run typecheck` PASS.
21. `npm run build` PASS.
22. `git diff --check` PASS.

---

## Non-Goals

- Full Realtor Workspace recolour
- Dashboard migration
- Viewing Requests migration
- My Listings redesign
- Global theme switch
- User-selectable dark mode
- Design token system
- New navigation, routes, or features
- Animation redesign
- Backend changes

---

## Mutation Prohibitions (definition gate — historical record)

At the definition gate no runtime code was modified. No implementation, commit, push, deploy, production access, shared-primitive change, token introduction, dependency change, dashboard/Viewing Requests recolouring, or TASK-016 creation occurred or is authorized by this document.

---

## Implementation Result

**Baseline before implementation:** HEAD `76512775fee1a07b0ce70eeae296563d82491c20`, origin/main identical, divergence `0 0`, worktree containing only this untracked task document.

**Files changed (exactly the authorized scope):**

| File | Change |
|------|--------|
| `frontend/components/realtor/workspace/RealtorWorkspaceShell.tsx` | Dark/gold chrome: root background, sidebar, brand block, group labels, nav states, focus rings, sticky header, menu trigger, role badge, drawer overlay/panel/header/close control, text hierarchy |
| `frontend/app/realtor/layout.tsx` | Loading skeleton colours only (background + three pulse blocks) |

No third runtime file was required. No shared UI primitive, `globals.css`, Tailwind config, dependency, auth, routing, or API change.

### Applied styling

| Element | Before | After |
|---------|--------|-------|
| App root | `bg-zinc-50 text-zinc-900` | `bg-[#1B1B1B] text-[#F5F5F5]` |
| Content region (`main`) | inherited light surface | explicit `bg-zinc-50 text-zinc-900` (see deviation D1) |
| Desktop sidebar | `border-zinc-200 bg-white` | `border-white/10 bg-[#252525]` |
| Sidebar brand block | `border-zinc-200`, `text-zinc-900`, `text-zinc-500`, blue focus ring | `border-white/10`, `text-[#F5F5F5]`, `text-[#B8B8B8]`, gold ring + `ring-offset-[#252525]` |
| Nav group label | `text-zinc-400` | `text-[#B8B8B8]` |
| Nav active | `bg-blue-50 text-blue-700 ring-1 ring-blue-100` | `bg-[#2D2D2D] font-semibold text-[#DFC58A] ring-1 ring-[#DFC58A]/40` |
| Nav inactive | `text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900` | `font-medium text-[#B8B8B8] hover:bg-white/5 hover:text-[#F5F5F5]` |
| Nav focus | `ring-blue-700 ring-offset-2` (white offset) | `ring-[#DFC58A] ring-offset-2 ring-offset-[#252525]` |
| Sticky header | `border-zinc-200 bg-white/95 backdrop-blur` | `border-white/10 bg-[#252525]/95 backdrop-blur` |
| Menu trigger | `border-zinc-200 text-zinc-700 hover:bg-zinc-50`, blue ring | `border-white/10 text-[#B8B8B8] hover:bg-white/5 hover:text-[#F5F5F5]`, gold ring + dark offset |
| Mobile header text | `text-zinc-900` / `text-zinc-500` | `text-[#F5F5F5]` / `text-[#B8B8B8]` |
| Role badge | `bg-blue-50 text-blue-700 ring-blue-100` | `bg-[#2D2D2D] text-[#DFC58A] ring-1 ring-[#DFC58A]/25` |
| Drawer overlay | `bg-zinc-900/30` | `bg-[#1B1B1B]/80 backdrop-blur-[2px]` |
| Drawer panel | `border-zinc-200 bg-white shadow-xl` | `border-white/10 bg-[#252525] shadow-xl` (see deviation D2) |
| Drawer header / texts | `border-zinc-200`, zinc text | `border-white/10`, `text-[#F5F5F5]` / `text-[#B8B8B8]` |
| Drawer close control | `border-zinc-200 text-zinc-700 hover:bg-zinc-50`, blue ring | `border-white/10 bg-[#2D2D2D] text-[#B8B8B8] hover:text-[#F5F5F5]`, gold ring + dark offset |
| Layout skeleton | `bg-zinc-50` + `bg-zinc-200` blocks | `bg-[#1B1B1B]` + `bg-white/10` blocks |

Only one structural adjustment was made: the nav font weight moved out of the shared base class into the active/inactive state classes (`font-semibold` / `font-medium`). This adds a non-colour reinforcement to the active row and avoids two conflicting Tailwind weight utilities on the same element. No JSX restructuring, no new component, no new abstraction, no token layer.

### Deviations from the definition's recommended values

**D1 — content region intentionally remains light.** The definition recommended `#1B1B1B` as the overall application background. Implementation applies `#1B1B1B` to the root and all chrome, but keeps `bg-zinc-50 text-zinc-900` on the content region.

Reason (VERIFIED): the still-light inner pages define **no background of their own** and place text directly on the shell surface — `app/realtor/viewing-requests/page.tsx:191–199` (`h1 text-zinc-900`, `p text-zinc-500`), `:214` (`text-zinc-600`), `app/realtor/page.tsx:54–55` (dashboard container), `app/realtor/viewing-requests/[id]/page.tsx:30, 123`. Rendered computed values show the inbox heading at `lab(8.31)` (zinc-900). Against `#1B1B1B` (`lab(9.77)`) that yields ≈1.01 : 1 — the heading would be invisible. Fixing those pages requires editing OUT-OF-SCOPE files, which this gate prohibits. Keeping the content surface light preserves the verified contrast (heading ≈17 : 1, subtitle ≈4.6 : 1 by L\* computation) and leaves those pages exactly as production shows them today. The seam is documented in code so it is not "cleaned up" before the dashboard and inbox are migrated.

Dark inner pages are unaffected: they paint their own `min-h-screen bg-[#1B1B1B]` and were measured to cover the content region exactly (profile 1122.33 px child == 1122.33 px main; create 1415.5 px == 1415.5 px), so no light strip appears.

**D2 — drawer panel uses `#252525` rather than `#2D2D2D`.** The drawer is the mobile instance of the same navigation surface as the sidebar. Using `#252525` keeps the active row's `#2D2D2D` elevation visible on both desktop and mobile and lets one `ring-offset-[#252525]` serve both, avoiding per-surface nav variants. Separation from the page is provided by the `#1B1B1B/80` overlay with `blur(2px)`, the `white/10` border, and `shadow-xl`.

## Final Verification

### Static

| Check | Command | Result |
|-------|---------|--------|
| Lint | `npm run lint` | PASS — 0 errors, 4 warnings |
| Typecheck | `npm run typecheck` (`tsc --noEmit`) | PASS — no output |
| Build | `npm run build` | PASS — compiled in 2.9 s, 23/23 static pages, all realtor routes present |
| Whitespace | `git diff --check` | PASS |

The 4 lint warnings are pre-existing `@next/next/no-img-element` warnings in `app/apple-icon.tsx`, `app/icon.tsx`, `app/opengraph-image.tsx`, `components/RentoLogo.tsx` — untouched by TASK-015. No new warning was introduced.

### Rendered evidence — desktop ~1280 × 900

| Element | Computed value | Verdict |
|---------|----------------|---------|
| Root | `rgb(27,27,27)` bg, `rgb(245,245,245)` text | PASS |
| Sidebar | `rgb(37,37,37)`, right border `white/0.1` | PASS |
| Sticky header | `#252525` at 0.95 alpha, bottom border `white/0.1` | PASS |
| Nav active (`Dashboard`) | `rgb(223,197,138)` on `rgb(45,45,45)`, weight 600, gold ring 0.4, height 44 px | PASS |
| Nav inactive (`Properties`) | `rgb(184,184,184)`, weight 500 | PASS |
| Nav focus (forced `:focus-visible`) | box-shadow `rgb(37,37,37) 0 0 0 2px, rgb(223,197,138) 0 0 0 4px` | PASS — gold ring on dark offset |
| Role badge | gold text on `rgb(45,45,45)` with gold ring 0.25, visible | PASS |
| Menu trigger at desktop | `display:none` (`lg:hidden`) | unchanged |
| Horizontal overflow | `scrollWidth` 1265 == `clientWidth` 1265 (1280 on inbox) | PASS |

Route checks: `/realtor` (light dashboard top + dark My listings), `/realtor/viewing-requests` (light inbox, active nav `Viewing Requests`), `/realtor/profile` (dark, active `Profile`), `/realtor/properties/create` (dark, active `Properties`). All rendered correctly inside the dark shell with no layout shift and no overflow.

### Rendered evidence — mobile ~390 × 844

| Check | Observed | Verdict |
|-------|----------|---------|
| Sidebar hidden | `display:none` | PASS |
| Mobile header | `#252525`/0.95, height 68.67 px, brand + email readable | PASS |
| Page overflow | `scrollWidth` 390 == `clientWidth` 390 (also with drawer open) | PASS |
| Content coverage | main bottom 844 == root height 844 == document height 844 — no seam | PASS |
| Drawer panel | `rgb(37,37,37)`, `white/0.1` border, width 320 px, `role="dialog"`, `aria-modal="true"` | PASS |
| Drawer overlay | `#1B1B1B` at 0.8 with `blur(2px)`, labelled | PASS |
| Drawer active nav | gold on `rgb(45,45,45)`, weight 600, height 44 px | PASS |
| Drawer inactive nav | `rgb(184,184,184)`, height 44 px | PASS |
| Drawer close control | 44 × 44, `#2D2D2D`, `#B8B8B8`, `aria-label="Close workspace navigation"` | PASS |
| Open via trigger | drawer mounts, `aria-expanded="true"` | PASS |
| Close via Escape | drawer unmounts, `aria-expanded="false"` | PASS |
| Close via overlay click | overlay button hit at (382, 412) → drawer unmounts | PASS |
| Close via X control | drawer unmounts | PASS |
| Navigate from drawer | `Profile` → `/realtor/profile`, active nav `Profile`, drawer auto-closed | PASS |

### Navigation, hash and routing

Client-side walk through every nav item with the console collector active:

| Clicked | Resulting URL | Active nav | Overflow | Shell |
|---------|---------------|------------|----------|-------|
| Viewing Requests | `/realtor/viewing-requests` | Viewing Requests | 0 | present |
| Profile | `/realtor/profile` | Profile | 0 | present |
| Dashboard | `/realtor` | Dashboard | 0 | present |
| Properties (on `/realtor`) | `/realtor#realtor-properties-heading` | Dashboard | 0 | present |

Properties hash behaviour preserved: route stayed `/realtor`, hash written via `history.replaceState`, page scrolled (`scrollY` 575), active detection unchanged. Public Profile: `href="/realtors/1"`, no `target`/`rel` change, navigated to the public realtor page ("Jane Agent").

Console during the walk: `[]` — no console errors, uncaught exceptions, or unhandled rejections.

### Loading skeleton

Captured with the auth request paused via CDP interception: container `rgb(27,27,27)`, three `white/0.1` pulse blocks, first block still 48 px tall, `role="status" aria-live="polite"` with sr-only text "Loading realtor workspace" — structure, dimensions and behaviour unchanged, no bright flashing.

### Auth (local, no production access)

| Case | Identity | Observed | Verdict |
|------|----------|----------|---------|
| Unauthenticated `/realtor` | none | `→ /login?returnUrl=%2Frealtor` | PASS |
| Login honours `returnUrl` | local realtor fixture (id 1, role `realtor`) | landed back on `/realtor` with workspace nav | PASS |
| Realtor access | same | workspace renders on all routes | PASS |
| Non-realtor access | local renter fixture (id 2, role `user`) | `/realtor` → `/`, no workspace nav | PASS |

No user, role, or business data was modified. Only login/logout session state changed. Local fixture credentials are deliberately not recorded here.

## Defects Found / Fixed

No functional defect was introduced or found. One implementation constraint was identified before editing and resolved by design inside the authorized scope: a fully dark content region would have made the OUT-OF-SCOPE light inner pages' headings invisible (≈1.01 : 1). Resolved as deviation **D1** rather than by editing unauthorized files.

Two verification artefacts, not product defects: the browser window is narrower than the emulated viewport, so full-width screenshots are clipped or tiled (measurements were taken programmatically instead); and the first overlay-click attempt was reported as "intercepted" because the overlay's centre point lies behind the drawer panel — clicking the overlay outside the 320 px panel closed the drawer correctly.

## Approved Deviations

Both deviations were reviewed and approved at the COMMIT REVIEW gate (2026-08-19): `D1_ACCEPTED`, `D2_ACCEPTED`.

| ID | Deviation | Status | Nature |
|----|-----------|--------|--------|
| D1 | Content region keeps `bg-zinc-50 text-zinc-900` while root and all persistent chrome are dark | ACCEPTED | Transitional — removal expected with the follow-up Dashboard and Viewing Requests alignment tasks |
| D2 | Drawer panel uses `#252525` instead of the suggested `#2D2D2D`, keeping `#2D2D2D` as the active-row elevation | ACCEPTED | Permanent design decision within the dark system |

D1 is limited to the inner content container (`RealtorWorkspaceShell.tsx:235`) and does not leak into the sidebar, sticky header, drawer, or skeleton. No new light design language was introduced.

## Mutation Statement (implementation gate)

| Action | State |
|--------|-------|
| Runtime code changed | YES — 2 authorized files |
| Task document changed | YES |
| Shared UI primitives changed | NO |
| Dashboard / Viewing Requests / My Listings changed | NO |
| `globals.css` / Tailwind config changed | NO |
| Backend / DB / schema / migration | NO |
| Dependencies changed | NO |
| Auth / routing logic changed | NO |
| Commit created | NO |
| Push performed | NO |
| Production accessed | NO |
| Deployment performed | NO |
| TASK-016 created | NO |

## Follow-up (recorded, not authorized)

- Realtor Dashboard dark/gold alignment (top zone + `components/realtor/dashboard/*`, requires a decision on `components/ui/*`)
- Realtor Viewing Requests dark/gold alignment (inbox + detail wrapper)
- `BottomNav` dark theme on renter viewing-request routes (`components/BottomNav.tsx:56–85`)
- `app/admin/properties/[id]/page.tsx` dark/gold alignment (light admin outlier)
- Unused light primitives `components/ui/PageShell.tsx`, `components/ui/PageHeader.tsx` — remove or migrate decision

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY               COMPLETE
IMPLEMENTATION          COMPLETE
VERIFICATION            LOCAL PASS
COMMIT REVIEW           PASS
COMMIT                  NOT YET
PUSH                    NOT YET
DEPLOY                  NOT YET
PRODUCTION ACCEPTANCE   NOT YET
CLOSURE                 NOT YET
ARCHIVE                 NOT YET
```

**Current gate:** `TASK_015_COMMIT_REVIEW_PASS`

**Next gate:** `READY_FOR_TASK_015_COMMIT`. Nothing is staged or committed; commit, push, deployment, and production acceptance each require separate authorization.
