# IWP-007 F-002 Phase 2 Caller Migration Implementation Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_007_F002_PHASE2_IMPLEMENTATION_EVIDENCE.md` |
| Package | IWP-007 — Frontend Property And Realtor Workflow Stabilization |
| Finding scope | F-002 Phase 2 only — caller-side legacy token argument removal |
| F-002 Phase 2 disposition | **COMPLETED — bounded W1–W16 scope** |
| F-002 full closure | **NOT GRANTED — Phase 2 slice only** |
| IWP-007 acceptance | **NOT GRANTED** |
| IWP-007 closure | **NOT GRANTED** |

---

## 2. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at implementation start | `3766bd915649b2b8e7854064179cdd3502e213ce` |
| Subject | `docs(iwp-007): activate work package` |
| Branch | `main` |
| Stage | I4 — IN PROGRESS |
| IWP-007 | SELECTED — ACTIVE |
| IWP-008 | PROPOSED — NOT SELECTED |

---

## 3. Controlling Authorities

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_007_EXECUTION_AUTHORIZATION.md` §9–§10, §12 | Primary write set and validation |
| `docs/implementation/IWP_007_ACTIVATION_AUTHORIZATION.md` | Package activation gate |
| `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` | Phase 1 transport baseline (read-only) |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` | Caller graph R6–R21 (read-only) |

---

## 4. Production Files Modified (W1–W16)

| W | Path |
|---|------|
| W1 | `frontend/services/api.ts` |
| W2 | `frontend/app/become-realtor/page.tsx` |
| W3 | `frontend/app/realtor/page.tsx` |
| W4 | `frontend/app/realtor/profile/page.tsx` |
| W5 | `frontend/app/realtor/properties/create/page.tsx` |
| W6 | `frontend/app/realtor/properties/[id]/edit/page.tsx` |
| W7 | `frontend/app/admin/page.tsx` |
| W8 | `frontend/app/admin/properties/page.tsx` |
| W9 | `frontend/app/admin/properties/create/page.tsx` |
| W10 | `frontend/app/admin/properties/[id]/page.tsx` |
| W11 | `frontend/app/admin/properties/[id]/edit/page.tsx` |
| W12 | `frontend/app/admin/realtor-applications/page.tsx` |
| W13 | `frontend/app/admin/users/page.tsx` |
| W14 | `frontend/app/admin/users/[id]/page.tsx` |
| W15 | `frontend/components/gallery/PropertyGalleryManager.tsx` |
| W16 | `frontend/components/realtor/RealtorPropertyGallery.tsx` |

| W | Path | Disposition |
|---|------|-------------|
| W17 | `frontend/lib/realtorWorkspace.ts` | **NOT APPLICABLE** — no type-import adjustment required after G1/G2 signature changes |
| W18 | `frontend/types/property.ts` | **NOT APPLICABLE** — no import/reference adjustment required |

---

## 5. W1 G1/G2 `api.ts` Changes

### G1 — token parameter removed

`getAdminProperties`, `createProperty`, `updateProperty`, `deleteProperty`, `verifyProperty`, `archiveProperty`, `activateProperty`, `getMyRealtorProperties`, `getMyRealtorProfile`, `updateMyRealtorProfile`, `getMyRealtorApplication`, `createRealtorApplication`, `getRealtorApplications`, `reviewRealtorApplication`, `getAdminStats`, `getAdminUsers`, `getAdminUserById`, `updateUserRole`, `updateAdminUserAccountStatus` — all call `sessionFetch` directly without a `token` parameter.

### G2 — explicit authenticated discriminator

`getPropertyById(id, options?: { authenticated?: boolean })`:

- Public R3/R4: no-options call → raw `fetch`
- Workflow W6, W10, W11: `{ authenticated: true }` → `sessionFetch`

### IWP-008 symbols preserved (W1 bodies unchanged)

`uploadImage`, `addPropertyImage`, `getPropertyImages`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder` — signatures and bodies unchanged; `void token` shims retained.

`sessionFetch`, `buildSessionHeaders`, auth stack, and `getImageUrl` import path unchanged.

---

## 6. W2–W16 Caller Migration (§10.1)

Legacy `getToken()` imports and `localStorage.getItem("access_token")` removed from all W2–W16 surfaces. Token variables and token arguments removed from G1/G2 API calls. Control flow and route-guard assumptions preserved.

### §10.3 session-route marker locations

`IWP_007_SESSION_ROUTE = true as unknown as string` passed as second argument to IWP-008-owned upload/media symbols:

| File | Symbols |
|------|---------|
| `frontend/app/realtor/page.tsx` | `uploadImage` |
| `frontend/app/realtor/properties/create/page.tsx` | `uploadImage`, `addPropertyImage` |
| `frontend/app/admin/properties/create/page.tsx` | `uploadImage`, `addPropertyImage` |
| `frontend/app/admin/properties/[id]/page.tsx` | `getPropertyImages` |
| `frontend/app/admin/properties/[id]/edit/page.tsx` | `uploadImage` |
| `frontend/components/gallery/PropertyGalleryManager.tsx` | `getPropertyImages`, `uploadImage`, `addPropertyImage`, `setCoverImage`, `deletePropertyImage`, `updatePropertyImageSortOrder` |
| `frontend/components/realtor/RealtorPropertyGallery.tsx` | same gallery set |

R3 (`frontend/app/properties/[id]/page.tsx`) unchanged — public no-options `getPropertyById` preserved.

---

## 7. Validation Results

| Check | Result |
|-------|--------|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |
| Static V4 — no `getToken` / `access_token` in W2–W16 | **PASS** |
| Static V5 — no `Authorization` / `Bearer` in W1–W18 | **PASS** |
| Static V6 — IWP-008 symbol bodies unchanged in W1 | **PASS** |
| Manual trace R6–R18 (V7) | **PASS** — code inspection; workflow routes consume G1/G2 via cookie-session transport |
| Manual trace R20–R21 (V8) | **PASS** — gallery call sites free of token acquisition; §10.3 marker only |
| Browser/runtime QA | **NOT RUN** |
| Backend pytest | **NOT APPLICABLE** |

---

## 8. Stop-Condition Disposition

SC1–SC11: **none triggered**. No modification outside W1–W18. No auth-stack, backend, or IWP-008 body changes.

---

## 9. Residual Risk

§10.3 `IWP_007_SESSION_ROUTE` is a **temporary caller-side bridge** until IWP-008 signature stabilization. Risk is bounded and expected per coordination authority.

---

## 10. Acceptance Posture

This evidence records F-002 Phase 2 implementation only. **IWP-007 package acceptance is NOT GRANTED** by this artifact.
