# IWP-008 Execution Authorization

**Status:** PUBLISHED — EFFECTIVE (IWP-008 package implementation scope authorization only)
**Authority class:** IWP package authority artifact
**Binding authority:** ACTIVE — exact technical write set authorization only; not technical implementation execution; not acceptance
**Independent review:** NOT REQUIRED for this publication gate class
**Publication integration:** COMPLETED
**Publication checkpoint (git):** COMPLETED BY THIS PUBLICATION COMMIT
**Publication parent commit:** `7f0ba8c5880d7bff7d58e747ec5431ad378a3e21`
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 — Domain Implementation
**Target package:** IWP-008 — Uploads And Media Storage Hardening
**Selection:** SELECTED — EFFECTIVE per `docs/implementation/IWP_008_SELECTION_AUTHORIZATION.md`
**Activation:** ACTIVE — EFFECTIVE per `docs/implementation/IWP_008_ACTIVATION_AUTHORIZATION.md`
**Package authority:** PUBLISHED — EFFECTIVE
**Read-only discovery basis:** COMPLETED — bounded upload/media inspection @ HEAD `7f0ba8c`; no open-ended discovery authorized
**Technical implementation:** AUTHORIZED WITHIN EXACT WRITE SET BELOW — NOT STARTED
**Implementation write authority:** AUTHORIZED ONLY FOR THE EXACT PRODUCTION WRITE SET IN §9
**Acceptance:** NOT GRANTED
**Closure:** NOT GRANTED

**Current effective IWP-008 status:**

```text
SELECTED — ACTIVE — IMPLEMENTATION-AUTHORIZED — TECHNICAL IMPLEMENTATION NOT STARTED — ACCEPTANCE NOT GRANTED
```

**Stage I4:** IN PROGRESS
**IWP-007:** ACCEPTED — CLOSED — INACTIVE
**Active implementation packages:** 1 — IWP-008 ONLY
**Authorized technical implementation packages:** 1 — IWP-008 ONLY
**Push / release / deployment:** NOT AUTHORIZED

---

## 1. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at authoring start | `7f0ba8c5880d7bff7d58e747ec5431ad378a3e21` |
| Subject | `docs(iwp-008): activate work package` |
| Branch | `main` |
| IWP-008 | SELECTED — ACTIVE — NOT IMPLEMENTATION-AUTHORIZED (pre-publication) |
| Active implementation packages | 1 — IWP-008 ONLY |

---

## 2. Controlling Repository Authority

| Authority | Use |
|-----------|-----|
| `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` | §8–§10 lifecycle; step 4 implementation authorization |
| `docs/implementation/IWP_008_SELECTION_AUTHORIZATION.md` | Selection; ownership summary |
| `docs/implementation/IWP_008_ACTIVATION_AUTHORIZATION.md` | Active package gate |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Upload/media ownership; §10.3 bridge; O1–O5 satisfied |
| `docs/implementation/IWP_007_FINAL_ACCEPTANCE_REPORT.md` | Handoff evidence |
| `docs/implementation/IWP_007_PACKAGE_CLOSURE_REPORT.md` | IWP-007 closed |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-008 identity; full package objective (broader future scope) |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Gates and evidence model |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Publication discipline |

**Scope note:** Register IWP-008 includes backend upload hardening, storage review, and gallery functional hardening. **This authorization covers only the bounded upload/media API signature and caller-marker remediation slice** required to resolve the IWP-007 §10.3 bridge and obsolete token parameters on IWP-008-owned exports. Broader register scope remains for later separate authority.

---

## 3. Package Objective (This Authorization Only)

Complete **bounded upload/media API signature stabilization** and **§10.3 bridge removal** across the finite committed caller graph R1–R7, while preserving IWP-006 session transport, public read paths, and IWP-007 workflow export boundaries.

**In scope:** IWP-008-owned `api.ts` upload/media exports; direct caller token-parameter and marker removal.

**Out of scope:** backend mutation; `getImageUrl.ts` changes; auth stack; gallery UX redesign; upload validation hardening; storage provider decisions; release; deployment.

---

## 4. Current Technical-State Findings (Read-Only Inspection @ `7f0ba8c`)

### 4.1 IWP-008-owned exports in `frontend/services/api.ts`

| Export | Current signature | Transport | Shim |
|--------|-------------------|-----------|------|
| `uploadImage` | `(file, token: string)` | `sessionFetch` POST FormData | `void token` |
| `getPropertyImages` | `(propertyId, token?: string)` | `sessionFetch` if `token !== undefined`; else raw `fetch` | none |
| `addPropertyImage` | `(propertyId, data, token: string)` | `sessionFetch` | `void token` |
| `setCoverImage` | `(propertyId, imageId, token: string)` | `sessionFetch` | `void token` |
| `deletePropertyImage` | `(propertyId, imageId, token: string)` | `sessionFetch` | `void token` |
| `updatePropertyImageSortOrder` | `(propertyId, imageId, sortOrder, token: string)` | `sessionFetch` | `void token` |

All mutating upload/media bodies **already use `sessionFetch`**. Token parameters are legacy routing/discriminator plumbing only.

### 4.2 §10.3 marker callers (7 files)

| File | Marker | Symbols invoked with marker |
|------|--------|----------------------------|
| `frontend/app/realtor/page.tsx` | yes | `uploadImage` |
| `frontend/app/realtor/properties/create/page.tsx` | yes | `uploadImage`, `addPropertyImage` |
| `frontend/app/admin/properties/create/page.tsx` | yes | `uploadImage`, `addPropertyImage` |
| `frontend/app/admin/properties/[id]/page.tsx` | yes | `getPropertyImages` |
| `frontend/app/admin/properties/[id]/edit/page.tsx` | yes | `uploadImage` |
| `frontend/components/gallery/PropertyGalleryManager.tsx` | yes | all six media symbols |
| `frontend/components/realtor/RealtorPropertyGallery.tsx` | yes | all six media symbols |

### 4.3 Public / non-authenticated caller

| File | Call | Behavior |
|------|------|----------|
| `frontend/app/properties/[id]/page.tsx` | `getPropertyImages(propertyId)` | No second argument — raw public `fetch` today |

**Determination:** Public caller exists. `getPropertyImages` requires an explicit authenticated discriminator (§10.2) preserving no-options public behavior.

### 4.4 Supporting surfaces (inspected — not writable unless type-forced)

| Path | Classification |
|------|----------------|
| `frontend/components/admin/AdminGalleryManager.tsx` | READ-ONLY — wraps `PropertyGalleryManager`; no direct API calls |
| `frontend/components/PropertyGallery.tsx` | READ-ONLY — display only |
| `frontend/lib/getImageUrl.ts` | EXCLUDED — IWP-008 functional hardening not in this slice |
| `frontend/types/property.ts` | NOT APPLICABLE — `PropertyImage` import stable; no change expected |
| Backend / tests / CI | EXCLUDED — not in write set |

### 4.5 Determinations summary

| # | Determination | Result |
|---|---------------|--------|
| 1 | Upload/media exports accept caller token parameters | **Yes** — all six |
| 2 | `void token` shims present | **Yes** — five mutating exports |
| 3 | Bodies use session-authenticated transport | **Yes** |
| 4 | Callers pass `IWP_007_SESSION_ROUTE` | **Yes** — R1–R7 |
| 5 | Markers removable after signature cleanup | **Yes** — when exports no longer require second arg / use G2 discriminator |
| 6 | Public/non-authenticated callers exist | **Yes** — R8 |
| 7 | Options object required | **Yes** — for `getPropertyImages` G2 only |
| 8 | Shared types must change | **NOT APPLICABLE** expected |
| 9 | `getImageUrl` excluded | **Yes** |
| 10 | Auth/session infrastructure excluded | **Yes** |
| 11 | Dependencies/lockfiles unchanged | **Required** |
| 12 | Backend changes required | **No** for this slice |
| 13 | Browser/runtime QA | **RECOMMENDED — NON-BLOCKING** |
| 14 | Existing tests require updates | **NOT APPLICABLE** — no `frontend/**/*.test.*` |
| 15 | New regression tests required | **No** — T0; no test files authorized |

---

## 5. Implementation Subjects

| Subject | Intent |
|---------|--------|
| **S1 — Upload/media signature cleanup** | Remove obsolete required `token` parameters; remove `void token` shims; call `sessionFetch` directly |
| **S2 — `getPropertyImages` G2 discriminator** | Replace `token?: string` with `{ authenticated?: boolean }`; preserve public no-options behavior for R8 |
| **S3 — Caller marker removal** | Remove `IWP_007_SESSION_ROUTE` and token arguments at R1–R7 |
| **S4 — Transport preservation** | No bearer headers; no auth-stack changes; no backend contract changes |

---

## 6. Exact Production Write Set

### 6.1 Partial API client — W1

**File:** `frontend/services/api.ts`

**Writable symbol groups:**

| Group | Symbols | Allowed changes |
|-------|---------|-----------------|
| G1 — strictly authenticated upload/media exports | `uploadImage`, `addPropertyImage`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder` | Remove `token` parameter; remove `void token`; call `sessionFetch` directly; preserve URLs, methods, bodies, error handling, FormData behavior |
| G2 — optional-auth gallery read | `getPropertyImages` | Replace `token?: string` with `{ authenticated?: boolean }` or equivalent bounded discriminator preserving public no-options behavior for R8 and session behavior for authenticated callers |
| G3 — co-located type | `CreatePropertyImageData` | Signature-only adjustments required by G1 |

**Explicitly not writable in W1:**

| Symbol / area | Owner |
|---------------|-------|
| All IWP-007 G1/G2 workflow exports | IWP-007 — CLOSED |
| `sessionFetch`, `buildSessionHeaders`, `MUTATING_METHODS` | IWP-006 transport — read-only |
| `getProperties`, `getPropertyById`, `reportProperty`, workflow/admin/realtor exports | Out of slice |
| Import of `normalizeImagePath` from `getImageUrl.ts` | No path or logic change |
| Unrelated refactors | Prohibited |

### 6.2 Caller surfaces — W2–W8

| ID | Path | Allowed changes |
|----|------|-----------------|
| W2 | `frontend/app/realtor/page.tsx` | Remove `IWP_007_SESSION_ROUTE`; remove token arg from `uploadImage` |
| W3 | `frontend/app/realtor/properties/create/page.tsx` | Remove marker; remove token args from `uploadImage`, `addPropertyImage` |
| W4 | `frontend/app/admin/properties/create/page.tsx` | Remove marker; remove token args from `uploadImage`, `addPropertyImage` |
| W5 | `frontend/app/admin/properties/[id]/page.tsx` | Remove marker; migrate `getPropertyImages` to G2 `{ authenticated: true }` |
| W6 | `frontend/app/admin/properties/[id]/edit/page.tsx` | Remove marker; remove token arg from `uploadImage` only |
| W7 | `frontend/components/gallery/PropertyGalleryManager.tsx` | Remove marker; remove token args from all media calls; G2 for `getPropertyImages` |
| W8 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | Same as W7 |

### 6.3 Types — W9

| Path | Disposition |
|------|-------------|
| `frontend/types/property.ts` | **NOT APPLICABLE** unless typecheck strictly requires import/reference adjustment |

### 6.4 Optional public path — R8

`frontend/app/properties/[id]/page.tsx` (R8) is **not** in the mandatory migration set. Modify R8 only if W1 G2 forces a no-behavior-change call-site adjustment. Public no-options `getPropertyImages(propertyId)` must remain public raw `fetch`.

---

## 7. Caller Graph R1–R8

| Route | Path | Symbols | Migration |
|-------|------|---------|-----------|
| R1 | `frontend/app/realtor/page.tsx` | `uploadImage` | G1 — no token arg |
| R2 | `frontend/app/realtor/properties/create/page.tsx` | `uploadImage`, `addPropertyImage` | G1 — no token arg |
| R3 | `frontend/app/admin/properties/create/page.tsx` | `uploadImage`, `addPropertyImage` | G1 — no token arg |
| R4 | `frontend/app/admin/properties/[id]/page.tsx` | `getPropertyImages` | G2 `{ authenticated: true }` |
| R5 | `frontend/app/admin/properties/[id]/edit/page.tsx` | `uploadImage` | G1 — no token arg |
| R6 | `frontend/components/gallery/PropertyGalleryManager.tsx` | all six media symbols | G1 + G2 |
| R7 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | all six media symbols | G1 + G2 |
| R8 | `frontend/app/properties/[id]/page.tsx` | `getPropertyImages` | **Preserve** public no-options call |

---

## 8. Caller Migration Rules (§10)

### 10.1 G1 caller migration

1. Remove `const IWP_007_SESSION_ROUTE = …` where no longer used.
2. Remove token arguments from G1 symbol calls.
3. Preserve control flow, loading/error handling, and route-guard assumptions.

### 10.2 `getPropertyImages` G2 migration — W5, W7

Authenticated workflow/gallery callers use `{ authenticated: true }`. Public R8 remains no-options.

Unauthorized: bearer headers; backend changes; auth-stack changes.

---

## 9. Cross-Package Boundaries

| Surface | Owner | Rule |
|---------|-------|------|
| Upload/media `api.ts` exports | **IWP-008** — this slice | Writable per §6 |
| Workflow `api.ts` exports | **IWP-007 — CLOSED** | Not writable |
| Auth stack | **IWP-006 — CLOSED** | Not writable |
| `getImageUrl.ts` | **IWP-008 future scope** | Not writable in this slice |
| Backend upload router | **IWP-008 future scope** | Not writable |

---

## 10. Test Write Set

| Set | Rule |
|-----|------|
| **T0** | **No new test files authorized** |

---

## 11. Required Validation (§12)

| Check | Command / method | Required result |
|-------|------------------|-----------------|
| V1 | `npm run lint` (from `frontend/`) | PASS |
| V2 | `npm run typecheck` (from `frontend/`) | PASS |
| V3 | `npm run build` (from `frontend/`) | PASS |
| V4 | Static: no `token` parameter on G1 exports in W1 | PASS |
| V5 | Static: no `void token` in W1 G1 exports | PASS |
| V6 | Static: no `IWP_007_SESSION_ROUTE` in W2–W8 | PASS |
| V7 | Static: no `Authorization` / `Bearer` introduced in W1–W9 | PASS |
| V8 | Static: W1 diff excludes IWP-007 workflow symbol bodies | PASS |
| V9 | Manual caller trace R1–R8 | PASS — authenticated paths use session transport; R8 public |
| V10 | Browser/runtime upload/gallery QA | RECOMMENDED — NON-BLOCKING; record honestly if unavailable |

Backend pytest: **NOT REQUIRED** — no backend write set.

---

## 12. Evidence Write Set (future implementation act)

| ID | Path | When |
|----|------|------|
| E1 | `docs/implementation/IWP_008_UPLOAD_MEDIA_SIGNATURE_IMPLEMENTATION_EVIDENCE.md` | During bounded implementation act |

---

## 13. Stop Conditions

| # | Condition |
|---|-----------|
| SC1 | Modification required outside W1–W9 |
| SC2 | Modification required to auth stack |
| SC3 | Modification required to IWP-007 workflow export bodies |
| SC4 | `getPropertyImages` G2 cannot preserve public R8 and authenticated W5/W7 behavior |
| SC5 | Undocumented direct media caller discovered outside R1–R8 |
| SC6 | Backend contract change appears necessary |
| SC7 | `getImageUrl.ts` functional change appears necessary |
| SC8 | Gallery UX/layout redesign appears necessary |
| SC9 | New frontend test files appear necessary |
| SC10 | Dependency, lockfile, CI, or environment change appears necessary |
| SC11 | Cross-package regression with IWP-007-closed surfaces |

---

## 14. Lifecycle Result After Publication

| Item | State |
|------|-------|
| IWP-008 | **SELECTED — ACTIVE — IMPLEMENTATION-AUTHORIZED — TECHNICAL IMPLEMENTATION NOT STARTED** |
| Active implementation packages | **1 — IWP-008 ONLY** |
| Authorized technical implementation packages | **1 — IWP-008 ONLY** |
| Stage I4 | IN PROGRESS |
| Acceptance | NOT GRANTED |

Publication does **not** execute implementation, grant acceptance, or authorize push/release/deployment.

---

## 15. Next Authorized Action

**Exact next authorized action:** One bounded **IWP-008 technical implementation** act under this document §6–§11.

That act must:

1. modify only W1–W9 within the published write set;
2. produce E1 implementation evidence;
3. satisfy §11 validation;
4. stop on SC1–SC11 rather than expand scope.

It must **not** complete Stage I4, push, release, or deploy.

---

## 16. Publication Record

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_008_EXECUTION_AUTHORIZATION.md` |
| Inspected production paths | W1–W8; R8 read-only; `AdminGalleryManager.tsx`; `PropertyGallery.tsx`; `getImageUrl.ts` (excluded) |
| Authority conferred | IWP-008 exact technical write set — EFFECTIVE upon publication commit |
