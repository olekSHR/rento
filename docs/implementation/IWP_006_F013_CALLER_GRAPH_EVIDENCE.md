# IWP-006 F-013 Caller-Graph Discovery Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` |
| Invocation | PASS — PUBLISHED §41 F-013 BOUNDED READ-ONLY DISCOVERY INVOKED |
| Controlling authority | `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §41 |
| Finding scope | F-013 only — bounded caller-graph discovery |
| F-013 discovery execution | COMPLETED — read-only |
| F-013 posture | **VERIFIED WITHIN BOUNDED §41 CALLER-GRAPH READ SET — PENDING NECESSITY DETERMINATION** |
| IWP-006 status | **SELECTED — ACTIVE — NOT ACCEPTED — NOT CLOSED** |
| IWP-007 / IWP-008 | **NOT ACTIVATED** |

---

## O1 — Repository Baseline

| Item | Value |
|------|-------|
| Branch | `main` |
| Starting HEAD | `00cf0975c33270680ec936105d72c07d50b09847` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 24 ahead / 0 behind |
| Staging at start | empty |
| Read-set version | §41.3 R1–R23, C1–C10, A1–A4 @ `00cf097` |
| §41 status | PUBLISHED — EFFECTIVE |
| Source modification | none — read-only discovery |

Pre-existing unrelated dirty paths remained outside scope and were not used as authority.

---

## O2 — `api.ts` Export Inventory

Source: committed `frontend/services/api.ts` @ `00cf097`.

### O2.1 Exported functions

| Symbol | Transport class | Committed callers |
|--------|-----------------|-------------------|
| `getProperties` | Public raw `fetch` | **ACTIVE** — R2 |
| `getAdminProperties` | `sessionFetch` (cookie) | **ACTIVE** — R12 |
| `getPropertyById` | Optional-auth (`sessionFetch` if token arg provided; raw `fetch` if omitted) | **ACTIVE** — R3, R4, R10, R14, R15 |
| `createProperty` | `sessionFetch` | **ACTIVE** — R9, R13 |
| `uploadImage` | `sessionFetch` | **ACTIVE** — R7, R9, R13, R15, R20, R21 |
| `updateProperty` | `sessionFetch` | **ACTIVE** — R10, R15 |
| `deleteProperty` | `sessionFetch` | **ACTIVE** — R12 |
| `verifyProperty` | `sessionFetch` | **ACTIVE** — R12 |
| `archiveProperty` | `sessionFetch` | **ACTIVE** — R12 |
| `activateProperty` | `sessionFetch` | **ACTIVE** — R12 |
| `reportProperty` | Public raw `fetch` | **ACTIVE** — R19 |
| `getPropertyImages` | Optional-auth | **ACTIVE** — R3, R14, R20, R21 |
| `addPropertyImage` | `sessionFetch` | **ACTIVE** — R9, R13, R20, R21 |
| `setCoverImage` | `sessionFetch` | **ACTIVE** — R20, R21 |
| `deletePropertyImage` | `sessionFetch` | **ACTIVE** — R20, R21 |
| `updatePropertyImageSortOrder` | `sessionFetch` | **ACTIVE** — R20, R21 |
| `getMyRealtorProperties` | `sessionFetch` | **ACTIVE** — R7 |
| `getMyRealtorProfile` | `sessionFetch` | **ACTIVE** — R7, R8, R9 |
| `updateMyRealtorProfile` | `sessionFetch` | **ACTIVE** — R7, R8 |
| `generateAIListing` | `sessionFetch` | **ZERO COMMITTED CALLERS** |
| `registerUser` | Raw `fetch` (legacy duplicate) | **ZERO COMMITTED CALLERS** |
| `getMyRealtorApplication` | `sessionFetch` | **ACTIVE** — R6 |
| `createRealtorApplication` | `sessionFetch` | **ACTIVE** — R6 |
| `getRealtorApplications` | `sessionFetch` | **ACTIVE** — R16 |
| `reviewRealtorApplication` | `sessionFetch` | **ACTIVE** — R16 |
| `getAdminStats` | `sessionFetch` | **ACTIVE** — R11 |
| `getAdminUsers` | `sessionFetch` | **ACTIVE** — R17 |
| `getAdminUserById` | `sessionFetch` | **ACTIVE** — R18 |
| `updateUserRole` | `sessionFetch` | **ACTIVE** — R18 |
| `updateAdminUserAccountStatus` | `sessionFetch` | **ACTIVE** — R18 |

**Function export count:** 30  
**Zero-caller function exports:** 2 (`generateAIListing`, `registerUser`)

### O2.2 Exported types (selected)

| Symbol | External committed importers |
|--------|------------------------------|
| `PropertyImage` | R20, R21 (`type PropertyImage` from `@/services/api`) |
| `RealtorProfile` | R23 (type-only) |
| `AdminUserListItem` | R22 (type-only) |
| `AdminStats` | R11 |
| `ManageableUserRole`, `ManageableAccountStatus` | R18 |
| `AIListingRequest`, `AIListingResponse` | **ZERO** — only referenced inside `generateAIListing` |
| Other application/admin types | Used only within `api.ts` signatures for active callers |

### O2.3 Canonical auth/API surfaces (contrast)

| Surface | Role |
|---------|------|
| `frontend/lib/authFetch.ts` | Cookie-session auth stack client (C1) |
| `frontend/services/authApi.ts` | Canonical login/register/session auth entrypoints (C2) |
| `frontend/services/api.ts` | Domain/admin/realtor API client (R1) |
| `frontend/context/AuthContext.tsx` | Session state owner; uses `authApi` only (C3) |

---

## O3 — Caller Graph Table (R2–R23)

| Read path | Imported symbols from `@/services/api` | Call pattern |
|-----------|----------------------------------------|--------------|
| **R2** `frontend/app/page.tsx` | `getProperties` | Direct call — public listing |
| **R3** `frontend/app/properties/[id]/page.tsx` | `getPropertyById`, `getPropertyImages` | Direct calls — public read |
| **R4** `frontend/app/favorites/page.tsx` | `getPropertyById` | Direct call — no token arg |
| **R5** `frontend/app/register/page.tsx` | **none** | Uses `registerUser` from `@/services/authApi` only |
| **R6** `frontend/app/become-realtor/page.tsx` | `getMyRealtorApplication`, `createRealtorApplication` | Direct calls with legacy `getToken()` |
| **R7** `frontend/app/realtor/page.tsx` | `getMyRealtorProperties`, `getMyRealtorProfile`, `updateMyRealtorProfile`, `uploadImage` | Direct calls with legacy `getToken()` |
| **R8** `frontend/app/realtor/profile/page.tsx` | `getMyRealtorProfile`, `updateMyRealtorProfile` | Direct calls with legacy `localStorage` token read |
| **R9** `frontend/app/realtor/properties/create/page.tsx` | `createProperty`, `uploadImage`, `addPropertyImage`, `getMyRealtorProfile` | Direct calls with legacy `getToken()` |
| **R10** `frontend/app/realtor/properties/[id]/edit/page.tsx` | `getPropertyById`, `updateProperty` | Direct calls with legacy `getToken()` |
| **R11** `frontend/app/admin/page.tsx` | `getAdminStats`, `AdminStats` | Direct call with legacy `getToken()` |
| **R12** `frontend/app/admin/properties/page.tsx` | `getAdminProperties`, `deleteProperty`, `verifyProperty`, `activateProperty`, `archiveProperty` | Direct calls with legacy `localStorage` token read |
| **R13** `frontend/app/admin/properties/create/page.tsx` | `createProperty`, `uploadImage`, `addPropertyImage` | Direct calls with legacy `localStorage` token read |
| **R14** `frontend/app/admin/properties/[id]/page.tsx` | `getPropertyById`, `getPropertyImages` | Direct calls with legacy `getToken()` |
| **R15** `frontend/app/admin/properties/[id]/edit/page.tsx` | `getPropertyById`, `updateProperty`, `uploadImage` | Direct calls with mixed legacy token reads |
| **R16** `frontend/app/admin/realtor-applications/page.tsx` | `getRealtorApplications`, `reviewRealtorApplication` | Direct calls with legacy `getToken()` |
| **R17** `frontend/app/admin/users/page.tsx` | `getAdminUsers` | Direct call with legacy `getToken()` |
| **R18** `frontend/app/admin/users/[id]/page.tsx` | `getAdminUserById`, `updateUserRole`, `updateAdminUserAccountStatus`, related types | Direct calls with legacy `getToken()` |
| **R19** `frontend/components/ReportButton.tsx` | `reportProperty` | Direct call — public |
| **R20** `frontend/components/gallery/PropertyGalleryManager.tsx` | `getPropertyImages`, `uploadImage`, `addPropertyImage`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder`, `PropertyImage` | Direct calls with legacy `getToken()` |
| **R21** `frontend/components/realtor/RealtorPropertyGallery.tsx` | Same gallery function set + `PropertyImage` | Direct calls with legacy `getToken()` |
| **R22** `frontend/components/admin/AdminUserListCard.tsx` | `AdminUserListItem` (type-only) | Type import only |
| **R23** `frontend/lib/realtorWorkspace.ts` | `RealtorProfile` (type-only) | Type import only |

**Committed `@/services/api` import paths in bounded traversal:** 22 (R5 has zero `api.ts` imports).

No barrel re-exports discovered within R1–R23 traversal.

---

## O4 — Auth-Transport Classification

Post-F-002 Phase 1, authenticated `api.ts` exports use internal `sessionFetch` with `credentials: "include"` and CSRF on mutating methods. Legacy caller `token` arguments are retained in signatures but ignored via `void token` inside `api.ts`.

| Caller class | Paths | Caller-side transport signal | Effective transport |
|--------------|-------|------------------------------|---------------------|
| Public `api.ts` | R2, R3 (no token), R4, R19 | none | raw `fetch` |
| Optional-auth read | R3/R14 `getPropertyById`; R3/R14/R20/R21 `getPropertyImages` | sometimes token passed | cookie when token arg present; raw when omitted |
| Authenticated domain/admin/realtor | R6–R18, R20, R21 | `getToken()` and/or `localStorage.getItem("access_token")` | **cookie-session via `sessionFetch`** — legacy token plumbing only |
| Canonical auth stack | R5, C3 login/register | `authApi` / `authFetch` | cookie-session auth stack |
| Non-`api.ts` auth-adjacent | C9 favorites API | separate client | out of F-013 write set |

**Legacy bearer plumbing at callers:** VERIFIED — present at R6–R18, R20, R21, but **not consumed** by current `api.ts` transport after F-002 Phase 1.

---

## O5 — Post-F-001 Mismatch Register

| ID | Observation | Classification |
|----|-------------|----------------|
| M1 | Callers still acquire/pass `getToken()` or `localStorage` access tokens | **DEFERRED BY AUTHORITY** — F-002 Phase 2 / IWP-007 |
| M2 | `api.ts::registerUser` duplicates `authApi::registerUser` | **ZERO COMMITTED CALLERS** on `api.ts` path; canonical auth is `authApi` (R5, C3) |
| M3 | `authApi.ts` retains local `parseApiErrorMessage` while domain client uses `@/lib/apiError` | **ACTIVE VARIANCE** — accepted residual outside F-003 scope |
| M4 | `PropertyImage` exported from `api.ts` while canonical type exists in `types/property.ts` | **DUPLICATE TYPE** — F-007 |
| M5 | `PropertyGallery.tsx` defines local `PropertyImage` unrelated to imports | **DUPLICATE TYPE** — F-007 adjacent |
| M6 | Four surfaces repeat `NEXT_PUBLIC_API_URL` fallback | **DUPLICATE CONFIG** — F-008 |
| M7 | `frontend/services/api.ts.save` backup file exists | **OPTIONAL CLEANUP** — F-010 |
| M8 | `generateAIListing` exported with zero committed callers | **ZERO COMMITTED CALLERS** — dead export / future hook |

F-001 cookie-session architecture and F-005 guards: **not reopened** — no transport regression observed in read set.

---

## O6 — Cross-Package Overlap Matrix

| Surface / caller group | Primary package | Notes |
|------------------------|-----------------|-------|
| Auth stack (`authFetch`, `authApi`, `AuthContext`, guards C1/C3/C6–C8) | **IWP-006** | Core auth/client stabilization |
| Public listing/detail/report (R2, R3, R19) | **IWP-006** with **IWP-007** workflow overlap | Public property presentation |
| Realtor/admin workflow pages (R6–R18) | **IWP-007** coordination | Property/realtor/admin workflow surfaces |
| Gallery managers (R20, R21) | **IWP-008** coordination | Image/gallery workflow overlap |
| `getImageUrl.ts` URL constant (C10) | **IWP-008** / F-008 observation | Not an `api.ts` caller |
| `realtorWorkspace.ts` type import (R23) | **IWP-007**-adjacent helper | Type-only import |

Discovery does **not** select, activate, or authorize IWP-007 or IWP-008.

---

## O7 — F-002 / F-003 Boundary Input (Non-Binding)

**Disclaimer:** Non-binding input only. Does not authorize implementation, IWP-007 activation, or `api.ts` boundary expansion.

| Topic | Bounded read-set conclusion |
|-------|----------------------------|
| F-002 Phase 2 | Caller-side legacy token plumbing removal appears to require **IWP-007** page/component edits across R6–R18, R20, R21 — not confined to `frontend/lib/` alone |
| F-003 | **Already RESOLVED** in bounded envelope scope; remaining authApi parser variance is outside completed F-003 write set |
| F-007 type dedup | Appears confinable to **IWP-006** register areas (`api.ts` type re-export removal + gallery import alignment) — requires separate amendment |
| F-008 config dedup | Appears confinable to **IWP-006** lib/services surfaces — requires separate amendment |
| F-010 hygiene | Single-file deletion — optional IWP-006 hygiene slice |
| Dead `registerUser` / `generateAIListing` | Zero-caller exports in `api.ts` — optional IWP-006 hygiene slice |

---

## O8 — Unavailable Evidence

| Item | Status | Reason |
|------|--------|--------|
| Runtime login/session flows | **NOT INSPECTED** | §41 read-only; no browser execution |
| Backend auth contract truth | **NOT INSPECTED** | Outside §41 mandatory read set |
| Production/staging `NEXT_PUBLIC_API_URL` values | **UNRESOLVED** | Environment not inspected |
| Frontend lint / typecheck / build | **NOT RUN** | Not required by §41.6 for read-only discovery |
| Automated frontend tests | **NOT APPLICABLE** | No test inspection authorized |
| Dynamic import / runtime-only callers | **NOT DETECTED** in R1–R23 traversal | Static import graph only |

---

## O9 — Findings Disposition Input

| Finding | Prior status | Post-discovery status |
|---------|--------------|----------------------|
| **F-013** | UNCERTAIN — caller graph unknown | **VERIFIED WITHIN BOUNDED §41 READ SET** |
| F-002 | PARTIALLY RESOLVED (Phase 1) | **Remains UNRESOLVED** — Phase 2 deferred |
| F-003 | RESOLVED | **Not reopened** |
| F-006 | RESOLVED (R5 canonical `authApi`) | **Confirmed** — R5 bypasses `api.ts::registerUser` |
| F-007 | UNRESOLVED | **Remains UNRESOLVED** — duplicate `PropertyImage` confirmed |
| F-008 | UNRESOLVED | **Remains UNRESOLVED** — duplicate API URL constants confirmed |
| F-009 | RESOLVED | **Not reopened** |
| F-010 | Optional | **Remains OPTIONAL CLEANUP** — `api.ts.save` exists |
| Dead `api.ts::registerUser` | Deferred | **ZERO COMMITTED CALLERS** — optional cleanup |
| authApi parser variance | Accepted residual | **ACTIVE VARIANCE** — non-blocking for F-013 |

F-013 discovery does **not** close F-002, F-007, F-008, or F-010 and does **not** authorize implementation.

---

## O10 — Stop-Condition Log

| §41.8 condition | Triggered |
|-----------------|-----------|
| Any frontend source modification | **NO** |
| F-002 / F-003 activated for implementation | **NO** |
| IWP-007 / IWP-008 activated | **NO** |
| Read set expanded beyond §41.3 | **NO** |
| Uncommitted working-tree content used as authority | **NO** |
| IWP-006 acceptance / closure claimed | **NO** |

**Stop conditions triggered:** none.

---

## Finding-Level Conclusions (Bounded)

### F-002 Phase 2
- **Status:** DEFERRED BY AUTHORITY
- **Evidence:** Legacy `getToken()` / `localStorage` at R6–R18, R20, R21; `api.ts` ignores token args
- **Risk class:** Technical debt / presentation inconsistency — not active transport defect after Phase 1

### F-007 duplicate `PropertyImage`
- **Status:** DUPLICATE TYPE OR CONFIG — ACTIVE
- **Evidence:** `types/property.ts:8`, `api.ts:350`, local type in `PropertyGallery.tsx:9`; R20/R21 import type from `api.ts`
- **Risk class:** Type drift — MEDIUM

### F-008 API URL constants
- **Status:** DUPLICATE TYPE OR CONFIG — ACTIVE
- **Evidence:** Identical fallback in `authFetch.ts:6`, `api.ts:7`, `authApi.ts:11`, `getImageUrl.ts:2`
- **Risk class:** Config divergence — MEDIUM

### F-010 `api.ts.save`
- **Status:** OPTIONAL CLEANUP
- **Evidence:** File exists at `frontend/services/api.ts.save`; not imported anywhere in R1–R23

### Dead `api.ts::registerUser`
- **Status:** ZERO COMMITTED CALLERS
- **Evidence:** R5 and C3 use `authApi::registerUser`; ripgrep finds no `@/services/api` import of `registerUser`

### authApi parser variance
- **Status:** ACTIVE VARIANCE — accepted residual
- **Evidence:** `authApi.ts:13-28` local parser vs shared `@/lib/apiError`; login/forgot-password raw-fetch paths excluded from F-003

### Additional zero-caller export
- **`generateAIListing`:** ZERO COMMITTED CALLERS — dead export / future feature hook

---

## Preservation and Scope Verification

| Boundary | Result |
|----------|--------|
| Read-only integrity | PASS — no production/test/authority modifications |
| F-001 / F-005 preserved | PASS — not reopened |
| F-002 / F-003 not activated | PASS |
| IWP-007 / IWP-008 not activated | PASS |
| Write set isolated to E1 | PASS |

---

## Validation Record

| Check | Result |
|-------|--------|
| Mandatory read set R1–R23, C1–C10, A1–A4 | PASS |
| O1–O10 completeness | PASS |
| Zero-caller search (`registerUser`, `generateAIListing`) | PASS |
| Scoped changed-path inventory | E1 only (pending commit) |
| Frontend tests | NOT RUN — not required |
| Independent discovery evidence review | NOT RUN — separate act per §41.6 |

---

## F-013 Bounded Posture

**F-013 — VERIFIED WITHIN BOUNDED §41 CALLER-GRAPH READ SET — PENDING NECESSITY DETERMINATION**

Caller graph for committed `@/services/api` imports is enumerated. Two function exports have zero committed callers. Canonical auth registration path is `authApi`, not `api.ts`. Remaining open items (F-002 Phase 2, F-007, F-008, F-010, dead exports) require separate bounded authority acts.

Does **not** claim F-007/F-008/F-010 resolved, F-002 Phase 2 implemented, IWP-007 activated, IWP-006 accepted/closed, continuity synchronized, or push authorization.

---

## Exact Next Authorized Action

Per §41.6 and §41.11, one separate **independent read-only discovery evidence review** of this artifact against §41 — without activating IWP-007/IWP-008, without implementation, and without IWP-006 acceptance or closure.

After review PASS, one separate **IWP-006 lifecycle necessity determination** may select the smallest next bounded implementation or hygiene slice (for example F-007 type deduplication or dead-export cleanup) under new or existing authority as applicable.
