# IWP-007 Execution Authorization

**Status:** PUBLISHED — EFFECTIVE (IWP-007 package implementation scope authorization only)
**Authority class:** IWP package authority artifact
**Binding authority:** ACTIVE — exact technical write set authorization only; not activation; not technical implementation execution
**Independent review:** NOT REQUIRED for this publication gate class
**Publication integration:** COMPLETED
**Publication checkpoint (git):** COMPLETED BY THIS PUBLICATION COMMIT
**Publication parent commit:** `805bc4c922c5a0e0418d1d024c31550af054ce7d`
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 — Domain Implementation
**Target package:** IWP-007 — Frontend Property And Realtor Workflow Stabilization
**Selection:** SELECTED — EFFECTIVE per `docs/implementation/IWP_007_SELECTION_AUTHORIZATION.md`
**Activation:** NOT ACTIVE — NOT EFFECTIVE — REQUIRES SEPARATE ACTIVATION ACT
**Package authority:** PUBLISHED — EFFECTIVE
**Read-only discovery basis:** COMPLETED — `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` (R2–R23); no new open-ended discovery authorized
**Technical implementation:** AUTHORIZED WITHIN EXACT WRITE SET BELOW — NOT STARTED — NOT EXECUTABLE UNTIL SEPARATE ACTIVATION
**Implementation write authority:** AUTHORIZED ONLY FOR THE EXACT PRODUCTION AND TEST WRITE SETS IN §9 — EXECUTABLE ONLY AFTER SEPARATE ACTIVATION
**Execution authorization:** AUTHORIZED FOR A LATER SEPARATE BOUNDED IWP-007 ACTIVATION AND TECHNICAL IMPLEMENTATION ACTION ONLY
**Acceptance:** NOT GRANTED
**Closure:** NOT GRANTED
**Current effective IWP-007 status:**

```text
SELECTED — NOT ACTIVE — EXACT TECHNICAL WRITE SET AUTHORIZED — TECHNICAL IMPLEMENTATION AUTHORIZED ONLY AFTER SEPARATE ACTIVATION — ACCEPTANCE NOT GRANTED
```

**Stage I4:** IN PROGRESS
**IWP-006:** ACCEPTED — CLOSED
**IWP-008:** PROPOSED — INACTIVE — NOT SELECTED — NOT IMPLEMENTATION-AUTHORIZED
**Active implementation packages:** 0
**Authorized technical implementation packages:** 0 — scope defined; execution blocked until activation
**Exact technical write set:** AUTHORIZED — NOT EXECUTABLE UNTIL SEPARATE ACTIVATION
**Migration authority:** NOT GRANTED
**Dependency authority:** NOT GRANTED
**Push:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED
**Phase 4:** NOT STARTED

---

## 1. Artifact Purpose And Authority Effect

This artifact publishes the **exact bounded technical implementation scope** for IWP-007.

It consumes completed caller-graph evidence from IWP-006 F-013 discovery and the published IWP-007 / IWP-008 coordination boundary. It does **not** activate IWP-007, execute technical implementation, authorize open-ended discovery, grant acceptance, authorize push, release, deployment, or Stage I4 completion.

Until a separate bounded **activation and technical implementation** act executes under this scope, IWP-007 remains:

```text
SELECTED — NOT ACTIVE — EXACT TECHNICAL WRITE SET AUTHORIZED — TECHNICAL IMPLEMENTATION AUTHORIZED ONLY AFTER SEPARATE ACTIVATION — ACCEPTANCE NOT GRANTED
```

Activation is a **separate later lifecycle act** under `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` step 3. Publication of this document alone does not set `Active implementation packages` to 1.

---

## 2. Authority Basis And Precedence

| Authority or evidence | Use |
|-----------------------|-----|
| `docs/implementation/IWP_007_SELECTION_AUTHORIZATION.md` | Selection prerequisite |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Shared-boundary ownership; execution order |
| `docs/implementation/IWP_006_FINAL_ACCEPTANCE_REPORT.md` | F-002 Phase 2 / F-013 M1 deferrals |
| `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` | Phase 1 transport baseline; Phase 2 scope |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` | Finite caller graph R2–R23; export inventory |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-007 metadata and acceptance criteria |
| `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` | Lifecycle separation; single-package rule |
| `docs/engineering/FRONTEND_ARCHITECTURE.md` | Owner authority |
| `docs/engineering/PRODUCT_ARCHITECTURE.md` | Owner authority |
| `docs/engineering/API_STANDARDS.md` | Owner authority |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Owner authority |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Gates and evidence model |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Publication and validation scope |

If this artifact conflicts with published Repository Authority, published Repository Authority controls.

---

## 3. Dependency And Coordination Verification

| Prerequisite | Status |
|--------------|--------|
| IWP-003 accepted | **SATISFIED** |
| IWP-004 accepted and closed | **SATISFIED** |
| IWP-006 accepted and closed | **SATISFIED** |
| IWP-007 / IWP-008 coordination published | **SATISFIED** @ `c54b106` |
| IWP-007 selected | **SATISFIED** @ `805bc4c` |
| Active implementation packages = 0 | **SATISFIED** |
| No other package selected/active/executing | **SATISFIED** |
| F-002 Phase 2 assigned to IWP-007 | **SATISFIED** |
| F-013 M1 assigned to IWP-007 | **SATISFIED** |
| IWP-007 before IWP-008 execution order | **SATISFIED** |

---

## 4. Package Objective

Complete **F-002 Phase 2 caller migration** and **F-013 M1 caller-token plumbing remediation** across the finite committed caller graph R6–R21, stabilize workflow-page consumption of existing backend contracts, and remove legacy bearer-token acquisition from IWP-007-owned surfaces — while preserving IWP-006 session transport, moderation truth, role visibility boundaries, and IWP-008 upload/media ownership.

**In scope:** caller-side migration only; honest workflow API consumption; non-upload `api.ts` signature stabilization.

**Out of scope:** product redesign; visual UX restructuring; gallery/upload hardening; backend mutation; auth-stack changes; release; deployment.

---

## 5. Implementation Subjects

| Subject | Authority | Implementation intent |
|---------|-----------|----------------------|
| **S1 — F-002 Phase 2** | `IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` §11 | Remove legacy `token` arguments at committed call sites R6–R21; remove `getToken()` / `localStorage.getItem("access_token")` acquisition from those paths |
| **S2 — F-013 M1** | `IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` O5 M1 | Eliminate caller-side legacy token plumbing at R6–R21 |
| **S3 — Workflow contract consumption** | Register acceptance criteria; coordination §4.5 | Ensure realtor/admin/governance workflow pages consume existing API contracts via cookie-session transport without client-side authority drift |
| **S4 — Non-upload `api.ts` signatures** | Coordination §4.1 | Remove obsolete required/optional `token` parameters from IWP-007-owned exports; preserve IWP-006 `sessionFetch` / CSRF foundation |
| **S5 — Caller-token plumbing at gallery call sites** | Coordination §4.2 R20/R21 | Remove legacy token acquisition at `PropertyGalleryManager.tsx` and `RealtorPropertyGallery.tsx` call sites only — **not** gallery functional hardening |

---

## 6. Auth And Session Baseline

| Surface | Rule |
|---------|------|
| `frontend/lib/authFetch.ts` | **READ-ONLY — IWP-006 CLOSED** |
| `frontend/services/authApi.ts` | **READ-ONLY — IWP-006 CLOSED** |
| `frontend/context/AuthContext.tsx` | **READ-ONLY — IWP-006 CLOSED** |
| `frontend/lib/tokenStorage.ts` | **READ-ONLY — IWP-006 CLOSED** — remove imports/usages from W2–W17; do not modify this file |
| Route guards (`ProtectedRoute`, `AdminRoute`, `RealtorRoute`) | **READ-ONLY — IWP-006 CLOSED** |
| `frontend/lib/csrf.ts`, `frontend/lib/authSessionEvents.ts` | **READ-ONLY — IWP-006 CLOSED** |
| `frontend/services/api.ts` private helpers (`sessionFetch`, `buildSessionHeaders`) | **READ-ONLY — IWP-006 CLOSED** — no transport rewrite |

**Default determination:** no auth/session architecture modification is authorized. IWP-006 cookie-session transport supports caller migration without reopening the auth stack.

**Authorized exception:** remove dead `@/lib/tokenStorage` imports and token-acquisition statements from W2–W17 only.

---

## 7. Read-Only Supporting Set

| Path | Use |
|------|-----|
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` | Caller graph authority |
| `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` | Transport baseline |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Boundary ownership |
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` | Historical IWP-006 scope reference |
| `frontend/app/page.tsx` (R2) | Contrast only — not writable |
| `frontend/app/properties/[id]/page.tsx` (R3) | Contrast only — not writable unless optional-auth token arg removal is required without routing regression |
| `frontend/app/favorites/page.tsx` (R4) | Not writable |
| `frontend/components/ReportButton.tsx` (R19) | Not writable |

No open-ended repository scan is authorized beyond this set and the exact production write set in §9.

---

## 8. Explicit Exclusions

### 8.1 IWP-008-owned surfaces — not writable

| Path / symbol class | Reason |
|---------------------|--------|
| `backend/app/routers/uploads.py` | Upload backend — IWP-008 |
| `backend/uploads/` | Upload backend — IWP-008 |
| `frontend/lib/getImageUrl.ts` | Image URL — IWP-008 |
| `frontend/components/gallery/PropertyGallery.tsx` | Gallery UX — IWP-008 |
| Gallery functional behavior in `PropertyGalleryManager.tsx` beyond caller-token removal | IWP-008 |
| Gallery functional behavior in `RealtorPropertyGallery.tsx` beyond caller-token removal | IWP-008 |
| `api.ts` upload/media **function bodies** for: `uploadImage`, `addPropertyImage`, `getPropertyImages`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder` | IWP-008 body ownership |
| `api.ts` upload/media **signatures** for symbols above | IWP-008 signature ownership — caller sites use §10.3 session-route marker only |

### 8.2 Other exclusions

| Item | Excluded |
|------|----------|
| Public listing/report surfaces R2, R4, R19 | No mandatory migration — no legacy token plumbing in evidence |
| `generateAIListing`, `registerUser` dead-export cleanup | Optional IWP-006 hygiene — not IWP-007 |
| F-007 type deduplication | Separate authority — not IWP-007 |
| F-008 config deduplication | Separate authority — not IWP-007 |
| F-010 `api.ts.save` deletion | Optional hygiene — not IWP-007 |
| Backend source | Not authorized |
| Migrations, lockfiles, dependencies, CI, environment files | Not authorized |
| Product redesign, layout changes, new components | Not authorized |
| `frontend/context/FavoritesContext.tsx` | Out of caller graph scope |

---

## 9. Exact Production Write Set

### 9.1 Workflow pages — W2–W14

| ID | Path | Allowed changes |
|----|------|-----------------|
| W2 | `frontend/app/become-realtor/page.tsx` | Remove `getToken` import/usage; remove token args from `getMyRealtorApplication`, `createRealtorApplication` calls; preserve workflow logic |
| W3 | `frontend/app/realtor/page.tsx` | Remove `getToken` import/usage; remove token args from `getMyRealtorProperties`, `getMyRealtorProfile`, `updateMyRealtorProfile`, `uploadImage` calls per §10.3 |
| W4 | `frontend/app/realtor/profile/page.tsx` | Remove `localStorage.getItem("access_token")`; remove token args from `getMyRealtorProfile`, `updateMyRealtorProfile` |
| W5 | `frontend/app/realtor/properties/create/page.tsx` | Remove `getToken` import/usage; remove token args from `createProperty`, `getMyRealtorProfile`; apply §10.3 to `uploadImage`, `addPropertyImage` |
| W6 | `frontend/app/realtor/properties/[id]/edit/page.tsx` | Remove `getToken` import/usage; remove token args from `getPropertyById`, `updateProperty` |
| W7 | `frontend/app/admin/page.tsx` | Remove `getToken` import/usage; remove token arg from `getAdminStats` |
| W8 | `frontend/app/admin/properties/page.tsx` | Remove `localStorage.getItem("access_token")`; remove token args from admin property mutations |
| W9 | `frontend/app/admin/properties/create/page.tsx` | Remove `localStorage.getItem("access_token")`; remove token args from `createProperty`; apply §10.3 to `uploadImage`, `addPropertyImage` |
| W10 | `frontend/app/admin/properties/[id]/page.tsx` | Remove `getToken` import/usage; migrate `getPropertyById` per §10.2; apply §10.3 to `getPropertyImages` |
| W11 | `frontend/app/admin/properties/[id]/edit/page.tsx` | Remove `getToken` / `localStorage` token reads; migrate `getPropertyById`, `updateProperty`; apply §10.3 to `uploadImage` |
| W12 | `frontend/app/admin/realtor-applications/page.tsx` | Remove `getToken` import/usage; remove token args from realtor application calls |
| W13 | `frontend/app/admin/users/page.tsx` | Remove `getToken` import/usage; remove token arg from `getAdminUsers` |
| W14 | `frontend/app/admin/users/[id]/page.tsx` | Remove `getToken` import/usage; remove token args from admin user mutations |

### 9.2 Components and lib — W15–W17

| ID | Path | Allowed changes |
|----|------|-----------------|
| W15 | `frontend/components/gallery/PropertyGalleryManager.tsx` | **Caller-token plumbing only:** remove `getToken` import/usage; apply §10.3 to upload/media API calls; **no** gallery UX, validation, or layout changes |
| W16 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | **Caller-token plumbing only:** same constraints as W15 |
| W17 | `frontend/lib/realtorWorkspace.ts` | Type-import adjustments only if required by W1 signature changes to exported types |

### 9.3 Partial API client — W1

**File:** `frontend/services/api.ts`

**Writable symbol groups:**

| Group | Symbols | Allowed changes |
|-------|---------|-----------------|
| G1 — strictly authenticated workflow exports | `getAdminProperties`, `createProperty`, `updateProperty`, `deleteProperty`, `verifyProperty`, `archiveProperty`, `activateProperty`, `getMyRealtorProperties`, `getMyRealtorProfile`, `updateMyRealtorProfile`, `getMyRealtorApplication`, `createRealtorApplication`, `getRealtorApplications`, `reviewRealtorApplication`, `getAdminStats`, `getAdminUsers`, `getAdminUserById`, `updateUserRole`, `updateAdminUserAccountStatus` | Remove `token` parameter from signatures; remove `void token` shims; call `sessionFetch` directly |
| G2 — optional-auth workflow read | `getPropertyById` | Replace optional `token?: string` discriminator with explicit `{ authenticated?: boolean }` options object **or** equivalent bounded discriminator that preserves public no-options behavior for R3/R4 and session behavior for W6, W10, W11; **no** URL or response-shape changes |
| G3 — workflow types co-located in W1 | `RealtorProfile`, `RealtorProfileUpdate`, `RealtorApplication`, `RealtorApplicationCreateData`, `RealtorApplicationListResponse`, `AdminStats`, `AdminUserListItem`, `AdminUsersResponse`, `AdminUsersQuery`, `AdminUserDetail`, `ManageableUserRole`, `ManageableAccountStatus`, `CreatePropertyImageData` | Signature-only adjustments required by G1/G2 migrations |

**Explicitly not writable in W1:**

| Symbol / area | Owner |
|---------------|-------|
| `getProperties`, `reportProperty` | Public — unchanged |
| `uploadImage`, `addPropertyImage`, `getPropertyImages`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder` | IWP-008 — signatures and bodies |
| `sessionFetch`, `buildSessionHeaders`, `MUTATING_METHODS` | IWP-006 transport — read-only |
| Import of `normalizeImagePath` from `getImageUrl.ts` | No change to import path or image URL logic |
| Unrelated refactors, dead-export removal, error-envelope changes | Prohibited |

### 9.4 Types directory — W18

| Path | Allowed changes |
|------|-----------------|
| `frontend/types/property.ts` | Import/reference adjustments only if strictly required by W1/G3 — **no** F-007 dedup scope |
| `frontend/types/auth.ts` | **Not writable** |
| `frontend/types/user.ts` | **Not writable** |

### 9.5 Evidence write set (future implementation acts only — not authorized by publication alone)

| ID | Path | When |
|----|------|------|
| E1 | `docs/implementation/IWP_007_F002_PHASE2_IMPLEMENTATION_EVIDENCE.md` | Created during bounded F-002 Phase 2 implementation act |
| E2 | `docs/implementation/IWP_007_F013_M1_IMPLEMENTATION_EVIDENCE.md` | Created during bounded F-013 M1 implementation act |

Combined evidence is permitted if one implementation act covers S1–S5 together under activation.

---

## 10. Caller Migration Rules

### 10.1 Required migration pattern — IWP-007-owned symbols (G1, G2)

1. Remove `import { getToken } from "@/lib/tokenStorage"` where no longer used.
2. Remove `localStorage.getItem("access_token")` token acquisition.
3. Remove token variables and token arguments from calls to G1/G2 symbols.
4. Preserve existing control flow, loading/error handling, and route-guard assumptions.
5. Do **not** introduce client-side authorization decisions.

### 10.2 `getPropertyById` migration — W6, W10, W11

Authenticated workflow pages must retain cookie-session reads after token removal.

Authorized approaches (choose one during implementation; stop if neither preserves behavior):

- **A:** W1 G2 options object with `{ authenticated: true }` for workflow pages; public R3/R4 remain no-options calls.
- **B:** Split call pattern using existing session transport without expanding write set beyond W1 + listed pages.

Unauthorized: reverting to bearer headers; modifying backend; modifying auth stack.

### 10.3 Session-route marker — IWP-008-owned upload/media symbols at call sites

Where W2–W16 still invoke IWP-008-owned symbols whose committed signatures retain a second parameter and Phase 1 routing uses `parameter !== undefined` to select `sessionFetch`:

- Remove `getToken` / `localStorage` acquisition.
- Pass the package constant **`IWP_007_SESSION_ROUTE = true`** as the second argument at the call site only.
- Do **not** modify upload/media function signatures or bodies in W1.

This marker is a **temporary caller-side bridge** until IWP-008 signature stabilization. It is not optional cleanup and not dead-export removal.

### 10.4 Optional public path — R3

`frontend/app/properties/[id]/page.tsx` (R3) is **not** in the mandatory migration set. Modify R3 only if a type error from W1 G2 forces a no-behavior-change call-site adjustment. Visual or UX changes at R3 are prohibited.

---

## 11. Exact Test Write Set

| Set | Paths | Rule |
|-----|-------|------|
| **T0** | — | **No new test files authorized** by this publication |

Existing repository contains no `frontend/**/*.test.*` or `frontend/**/*.spec.*` files. Test file creation requires a separate authority amendment.

---

## 12. Required Validation Commands And Evidence

Future implementation acts under activation must produce:

| Check | Command / method | Required result |
|-------|------------------|-----------------|
| V1 | `npm run lint` (from `frontend/`) | PASS or documented unavailable |
| V2 | `npm run typecheck` (from `frontend/`) | PASS |
| V3 | `npm run build` (from `frontend/`) | PASS |
| V4 | Static inspection: `getToken` / `access_token` / `localStorage.getItem("access_token")` absent from W2–W16 | PASS |
| V5 | Static inspection: no `Authorization` / `Bearer` introduced in W1–W18 | PASS |
| V6 | Static inspection: W1 diff excludes IWP-008 symbol bodies in §8.1 | PASS |
| V7 | Manual workflow trace R6–R18 | Realtor/admin/governance routes reachable; no client-side authority drift |
| V8 | Manual caller trace R20–R21 | Gallery call sites free of token acquisition; gallery behavior unchanged beyond transport call pattern |

Backend pytest: **NOT REQUIRED** — no backend write set.

Browser/runtime QA: recommended; record honestly if unavailable.

---

## 13. Acceptance Criteria Mapping

Register acceptance criterion:

> Public, professional, and governance surfaces preserve role, visibility, and moderation boundaries.

Implementation under this scope satisfies the package acceptance **input** only when:

1. F-002 Phase 2 disposition recorded in E1;
2. F-013 M1 disposition recorded in E2;
3. V1–V8 satisfied or honestly unavailable;
4. coordination outputs O1–O4 satisfied;
5. separate package acceptance authority executed later.

Publication of this document does **not** grant acceptance.

---

## 14. Stop Conditions

Stop and escalate with a **new authority amendment** — do not expand scope silently — if any of the following occur during implementation:

| # | Condition |
|---|-----------|
| SC1 | Modification required outside W1–W18 |
| SC2 | Modification required to auth stack files in §6 |
| SC3 | Modification required to IWP-008 upload/media symbol signatures or bodies in W1 |
| SC4 | `getPropertyById` migration cannot preserve public R3 and authenticated W6/W10/W11 behavior within G2 |
| SC5 | Session-route marker (§10.3) insufficient and upload/media signature change appears necessary |
| SC6 | Backend contract or domain rule change appears necessary |
| SC7 | Product meaning, moderation rule, or role visibility change appears necessary |
| SC8 | Visual redesign or component restructuring appears necessary to complete migration |
| SC9 | New frontend test files appear necessary — requires separate amendment |
| SC10 | Dependency, migration, CI, or environment change appears necessary |
| SC11 | Cross-package regression with IWP-008-owned surfaces |

---

## 15. Release Posture

Release, deployment, push, tag, GitHub Release, production access, launch, scaling, and Phase 4 remain **NOT AUTHORIZED**.

---

## 16. Lifecycle Preservation

| Item | Required state after publication |
|------|----------------------------------|
| IWP-007 | SELECTED — NOT ACTIVE — EXACT TECHNICAL WRITE SET AUTHORIZED |
| IWP-008 | PROPOSED — INACTIVE — NOT SELECTED |
| F-002 Phase 2 | Assigned to IWP-007 |
| F-013 M1 | Assigned to IWP-007 |
| Execution order | IWP-007 before IWP-008 |
| Stage I4 | IN PROGRESS |
| Active implementation packages | 0 |

Register, program, roadmap, and handoff synchronization are **NOT PERFORMED** by this act.

---

## 17. Next Authorized Action

**Exact next authorized action:** One bounded **IWP-007 activation and technical implementation** act under this published scope.

That act must:

1. activate IWP-007 under separate publication;
2. set active implementation packages to 1 — IWP-007 only;
3. execute only W1–W18 within §9–§10;
4. produce E1/E2 evidence;
5. satisfy §12 validation.

It must **not** select or activate IWP-008, complete Stage I4, push, release, or deploy.

---

## 18. Publication Record

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_007_EXECUTION_AUTHORIZATION.md` |
| Authority conferred | IWP-007 exact technical write set — EFFECTIVE upon publication commit |
| Activation | NOT PERFORMED |
| Continuity synchronization | NOT PERFORMED |
