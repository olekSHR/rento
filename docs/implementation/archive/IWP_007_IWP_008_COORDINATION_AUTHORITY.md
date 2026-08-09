# IWP-007 / IWP-008 Package Coordination Authority

**Status:** PUBLISHED — EFFECTIVE (package coordination authority gate only)
**Authority class:** Package coordination authority gate only
**Binding authority:** ACTIVE — coordination boundary only; not package selection; not package activation; not implementation authority
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 — Domain Implementation
**Work packages:** IWP-007 — Frontend Property And Realtor Workflow Stabilization; IWP-008 — Uploads And Media Storage Hardening
**IWP-007 lifecycle:** PROPOSED — NOT SELECTED — NOT IMPLEMENTATION-AUTHORIZED
**IWP-008 lifecycle:** PROPOSED — INACTIVE — NOT IMPLEMENTATION-AUTHORIZED
**Stage I4:** IN PROGRESS
**Push / release / deployment:** NOT AUTHORIZED by this document
**Publication integration:** COMPLETED
**Publication checkpoint (git):** COMPLETED BY THIS PUBLICATION COMMIT
**Publication parent commit:** `3423feead26e6692d34bb8f03a13673109599910`

---

## 1. Starting Repository Baseline

| Item | Value |
|------|-------|
| Repository | `C:/Users/Александр/Desktop/Projects/rento` |
| Branch | `main` |
| Pre-publication parent commit | `3423feead26e6692d34bb8f03a13673109599910` |
| Pre-publication subject | `docs(iwp-006): synchronize closure continuity` |
| IWP-006 lifecycle | ACCEPTED — CLOSED — CONTINUITY SYNCHRONIZED |
| Stage I4 | IN PROGRESS |
| Active implementation packages | 0 |
| Open authorized technical execution packages | 0 |
| IWP-007 ↔ IWP-008 coordination (pre-publication) | UNRESOLVED |

This baseline records the coordination gate anchor only. Package metadata, discovery evidence, and deferral records remain in referenced authority.

---

## 2. Coordination Scope

This document resolves the package-specific coordination boundary required by:

- `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` §6 constraint 5
- `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` — IWP-007 and IWP-008 dependency fields

Coordination scope is **boundary definition only**. It does **not** select, activate, authorize, or execute either package.

---

## 3. Execution Order

| Order | Package | Posture |
|-------|---------|---------|
| 1 | **IWP-007** | Must complete its authorized implementation scope (including deferred F-002 Phase 2 and F-013 M1 disposition) and reach package acceptance under separate execution and acceptance authority before IWP-008 may be selected or activated on shared surfaces |
| 2 | **IWP-008** | Executes only after IWP-007 coordination outputs in §6 are satisfied |

**Bounded parallel execution:** **NOT PERMITTED** on shared boundaries listed in §4. Disjoint backend-only IWP-008 preparation remains **NOT AUTHORIZED** by this document and requires separate package authority.

---

## 4. Shared Boundary Ownership

### 4.1 `frontend/services/api.ts`

| Surface class | Owning package | Notes |
|---------------|----------------|-------|
| Session transport foundation (F-002 Phase 1) | **IWP-006 — CLOSED** | Read-only baseline; neither package may reopen auth transport |
| Workflow and domain caller signatures; removal of legacy `token` parameters; non-upload authenticated domain functions | **IWP-007** | Includes F-002 Phase 2 / F-013 M1 caller-side disposition |
| Upload and media API functions (`uploadImage`, `addPropertyImage`, `getPropertyImages`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder`, and adjacent upload/media exports) | **IWP-008** | May modify upload/media function bodies and upload contract consumption only after §6 outputs are satisfied; must not reopen IWP-007 caller migration |

**Duplicate implementation prohibition:** Neither package may implement the other's owned surface class. Silent scope transfer between packages is forbidden.

### 4.2 Frontend pages and components

| Surface | Owning package | Notes |
|---------|----------------|-------|
| `frontend/app/` workflow pages (caller graph R6–R18) | **IWP-007** | Realtor, admin, and governance workflow reachability |
| `frontend/components/` except gallery-specific paths below | **IWP-007** | Workflow presentation components |
| `frontend/types/` workflow types | **IWP-007** | |
| `frontend/lib/getImageUrl.ts` | **IWP-008** | Image URL handling |
| `frontend/components/gallery/` | **IWP-008** | Gallery presentation and manager behavior |
| `frontend/components/realtor/RealtorPropertyGallery.tsx` | **IWP-008** | Gallery behavior hardening |
| Caller-token plumbing at R20/R21 (`PropertyGalleryManager.tsx`, `RealtorPropertyGallery.tsx`) | **IWP-007** | F-002 Phase 2 / F-013 M1 only — remove `getToken()` / `localStorage` token acquisition and dead bearer arguments; does not authorize gallery functional hardening |

### 4.3 Backend

| Surface | Owning package | Notes |
|---------|----------------|-------|
| Domain, moderation, ownership, contact-source routers and services | **IWP-003 / IWP-004 — ACCEPTED or CLOSED** | Consumption only unless separately authorized |
| `backend/app/routers/uploads.py`, `backend/uploads/`, upload-related `property.py` persistence surfaces | **IWP-008** | Upload validation, media persistence, file serving |
| Backend mutation outside upload/media scope | **EXCLUDED from both packages** unless a later package authority explicitly authorizes it |

### 4.4 Authentication and authorization

| Boundary | Owner | Rule |
|----------|-------|------|
| Session cookie transport, CSRF on mutating client calls | **IWP-006 — CLOSED** | Baseline only |
| `authApi.ts`, `AuthContext.tsx`, `tokenStorage.ts`, route guards | **IWP-006 — CLOSED** unless IWP-007 execution authority explicitly names a bounded amendment | IWP-008 must not modify auth stack |
| Workflow route reachability and client-side non-authoritative consumption | **IWP-007** | Must preserve backend/domain authority |
| Upload ownership and denial handling at media surfaces | **IWP-008** | Must preserve security and ownership authority |

### 4.5 Frontend/backend contract consumption

| Concern | Owning package |
|---------|----------------|
| Workflow surfaces consuming existing API contracts | **IWP-007** |
| Upload/media contract consumption and gallery truth | **IWP-008** |
| API contract discipline changes (errors, pagination, router/service ownership) | **EXCLUDED** — **IWP-004 CLOSED** baseline |

---

## 5. Deferred Finding Ownership

Committed deferrals from IWP-006 closure remain assigned as follows:

| Finding | Owner | Scope |
|---------|-------|-------|
| **F-002 Phase 2** — caller migration; remove `token` arguments at call sites; remove `getToken()` / `localStorage` reads at pages **R6–R21** | **IWP-007** | Per `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` §11 and `docs/implementation/IWP_006_FINAL_ACCEPTANCE_REPORT.md` |
| **F-013 M1** — caller-side legacy token plumbing | **IWP-007** | Per `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` |

IWP-008 is **explicitly excluded** from F-002 Phase 2 and F-013 M1 implementation.

---

## 6. Dependency Outputs (IWP-007 → IWP-008)

IWP-008 selection or activation on shared surfaces requires **all** of the following outputs from IWP-007:

| # | Output |
|---|--------|
| O1 | F-002 Phase 2 disposition recorded in published IWP-007 implementation evidence |
| O2 | F-013 M1 disposition recorded in published IWP-007 implementation evidence |
| O3 | Caller graph R6–R21 free of legacy token acquisition and dead bearer argument plumbing at call sites |
| O4 | `frontend/services/api.ts` workflow caller signatures stabilized under IWP-007 authority without pending caller-migration debt |
| O5 | IWP-007 package acceptance under separate acceptance authority |

Until O1–O5 are satisfied, IWP-008 must not modify `frontend/services/api.ts` upload/media exports or gallery caller surfaces beyond read-only discovery authorized elsewhere.

---

## 7. Explicit Exclusions

### 7.1 IWP-007 exclusions

- Upload router and backend upload persistence hardening
- `getImageUrl.ts` functional hardening
- Gallery functional hardening beyond caller-token plumbing at R20/R21
- External storage provider selection, deployment, production file migration
- Backend mutation unless separately authorized in IWP-007 execution authority
- Product redesign, client-side authorization authority, release, deployment

### 7.2 IWP-008 exclusions

- F-002 Phase 2 and F-013 M1 caller migration
- Workflow page and admin/realtor workflow UX outside gallery-specific components
- Auth stack modification (`authApi.ts`, `AuthContext.tsx`, `tokenStorage.ts`, route guards)
- Reopening IWP-006 session transport foundation
- Backend domain redesign outside upload/media scope
- Release, deployment, external storage selection, production file migration

---

## 8. Regression Responsibility

| Package | Owns regression proof for |
|---------|---------------------------|
| **IWP-007** | Workflow reachability; role, visibility, and moderation presentation boundaries; F-002 Phase 2 / F-013 M1 caller migration; non-upload `api.ts` workflow integration |
| **IWP-008** | Upload validation and denial; media persistence; gallery consistency; image URL handling; file serving; upload/media `api.ts` functions |

**Package boundary rule:** The modifying package owns regression proof for its owned surfaces. Cross-boundary regressions require stop, explicit coordination review, and a new authority act — not silent scope absorption or duplicate fixes in the peer package.

---

## 9. Stop Conditions

Stop and escalate without implementation if any of the following occur:

1. Work would select, activate, or authorize either package without separate Repository Authority.
2. Work would implement F-002 Phase 2 or F-013 M1 outside IWP-007.
3. Work would modify auth transport or auth stack under IWP-008.
4. IWP-008 begins shared-surface work before §6 outputs are satisfied.
5. Either package implements surfaces owned by the other per §4.
6. Scope is silently moved between packages without a new authority act.
7. Work would complete Stage I4, push, release, or deploy.

---

## 10. Prohibitions

This coordination authority does **not**:

- select or activate IWP-007 or IWP-008;
- publish execution authorization for either package;
- authorize implementation, push, release, deployment, or Stage I4 completion;
- transfer F-002 Phase 2 or F-013 M1 ownership away from IWP-007;
- permit duplicate caller migration or upload hardening across both packages;
- supersede closed IWP-006, IWP-004, or IWP-003 authority.

---

## 11. Lifecycle Preservation

After publication of this document:

| Item | Required state |
|------|----------------|
| IWP-007 | PROPOSED — NOT SELECTED — NOT IMPLEMENTATION-AUTHORIZED |
| IWP-008 | PROPOSED — INACTIVE — NOT IMPLEMENTATION-AUTHORIZED |
| F-002 Phase 2 | Deferred to IWP-007 |
| F-013 M1 | Deferred to IWP-007 |
| Stage I4 | IN PROGRESS |
| Active implementation packages | 0 |

Register and continuity surfaces may lag this publication until a separate bounded continuity synchronization act; lag does not weaken this coordination boundary once published.

---

## 12. Next Authorized Action

**Exact next authorized action:** One bounded **IWP-007 selection or authority-path readiness determination** act under separate Repository Authority.

That act may proceed only because this coordination boundary is now published. It must **not** activate, authorize, or execute IWP-007 without a separate execution authorization. It must **not** select or activate IWP-008. It must **not** complete Stage I4.

---

## 13. Authority Basis

| Source | Use |
|--------|-----|
| `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` | Stage boundary; §6 coordination constraint |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-007 and IWP-008 metadata |
| `docs/implementation/IWP_006_FINAL_ACCEPTANCE_REPORT.md` | F-002 Phase 2 and F-013 M1 deferrals |
| `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` | Phase 2 caller scope R6–R21 |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` | Caller graph and surface classification |
| `docs/engineering/REPOSITORY_STANDARDS.md` §7.6 | Publication checkpoint requirement |

---

## 14. Publication Record

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` |
| Authority conferred | IWP-007 ↔ IWP-008 coordination boundary — EFFECTIVE upon publication commit |
| Independent review | NOT REQUIRED for this coordination gate class |
| Continuity synchronization | NOT PERFORMED by this act |
