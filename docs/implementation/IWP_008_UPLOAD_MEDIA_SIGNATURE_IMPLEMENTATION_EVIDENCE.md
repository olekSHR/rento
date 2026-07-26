# IWP-008 Upload/Media Signature Implementation Evidence

## 1. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at implementation start | `8636ea135d2188305254e10b0e2e87aa19ac34f1` |
| Subject | `docs(iwp-008): authorize package execution` |
| Branch | `main` |
| IWP-008 pre-implementation | SELECTED — ACTIVE — IMPLEMENTATION-AUTHORIZED — TECHNICAL IMPLEMENTATION NOT STARTED |

---

## 2. Applied Authority

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_008_EXECUTION_AUTHORIZATION.md` | Primary — W1–W9, R1–R8, G1–G3, V1–V10, SC1–SC11 |
| `docs/implementation/IWP_008_ACTIVATION_AUTHORIZATION.md` | Supporting — active package gate |
| `docs/implementation/IWP_008_SELECTION_AUTHORIZATION.md` | Supporting — package selection |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Supporting — upload/media ownership; §10.3 bridge removal |

---

## 3. Exact Modified Paths

| Path | Write set |
|------|-----------|
| `frontend/services/api.ts` | W1 |
| `frontend/app/realtor/page.tsx` | W2 |
| `frontend/app/realtor/properties/create/page.tsx` | W3 |
| `frontend/app/admin/properties/create/page.tsx` | W4 |
| `frontend/app/admin/properties/[id]/page.tsx` | W5 |
| `frontend/app/admin/properties/[id]/edit/page.tsx` | W6 |
| `frontend/components/gallery/PropertyGalleryManager.tsx` | W7 |
| `frontend/components/realtor/RealtorPropertyGallery.tsx` | W8 |

No other production paths modified.

---

## 4. W1–W9 Disposition

| ID | Path | Disposition |
|----|------|-------------|
| W1 | `frontend/services/api.ts` | **APPLIED** — G1/G2/G3 on six upload/media exports |
| W2 | `frontend/app/realtor/page.tsx` | **APPLIED** — marker removed; tokenless `uploadImage` |
| W3 | `frontend/app/realtor/properties/create/page.tsx` | **APPLIED** — marker removed; tokenless upload/media |
| W4 | `frontend/app/admin/properties/create/page.tsx` | **APPLIED** — marker removed; tokenless upload/media |
| W5 | `frontend/app/admin/properties/[id]/page.tsx` | **APPLIED** — marker removed; G2 `{ authenticated: true }` |
| W6 | `frontend/app/admin/properties/[id]/edit/page.tsx` | **APPLIED** — marker removed; tokenless `uploadImage` |
| W7 | `frontend/components/gallery/PropertyGalleryManager.tsx` | **APPLIED** — marker removed; G1 + G2 all media calls |
| W8 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | **APPLIED** — marker removed; G1 + G2 all media calls |
| W9 | `frontend/types/property.ts` | **NOT APPLICABLE** — typecheck passed without modification |

---

## 5. Signature Before/After Summary

| Export | Before | After |
|--------|--------|-------|
| `uploadImage` | `(file: File, token: string)` + `void token` | `(file: File)` |
| `getPropertyImages` | `(propertyId: number, token?: string)` | `(propertyId: number, options?: PropertyImageFetchOptions)` where `{ authenticated?: boolean }` |
| `addPropertyImage` | `(propertyId, data, token: string)` + `void token` | `(propertyId, data)` |
| `setCoverImage` | `(propertyId, imageId, token: string)` + `void token` | `(propertyId, imageId)` |
| `deletePropertyImage` | `(propertyId, imageId, token: string)` + `void token` | `(propertyId, imageId)` |
| `updatePropertyImageSortOrder` | `(propertyId, imageId, sortOrder, token: string)` + `void token` | `(propertyId, imageId, sortOrder)` |

Transport behavior preserved: mutating exports use `sessionFetch`; `getPropertyImages` uses `sessionFetch` when `options?.authenticated`, else raw `fetch`.

---

## 6. R1–R8 Disposition

| Route | Path | Disposition |
|-------|------|-------------|
| R1 | `frontend/app/realtor/page.tsx` | **MIGRATED** — G1 `uploadImage(file)` |
| R2 | `frontend/app/realtor/properties/create/page.tsx` | **MIGRATED** — G1 tokenless `uploadImage`, `addPropertyImage` |
| R3 | `frontend/app/admin/properties/create/page.tsx` | **MIGRATED** — G1 tokenless `uploadImage`, `addPropertyImage` |
| R4 | `frontend/app/admin/properties/[id]/page.tsx` | **MIGRATED** — G2 `getPropertyImages(id, { authenticated: true })` |
| R5 | `frontend/app/admin/properties/[id]/edit/page.tsx` | **MIGRATED** — G1 tokenless `uploadImage` |
| R6 | `frontend/components/gallery/PropertyGalleryManager.tsx` | **MIGRATED** — G1 all mutating media; G2 authenticated read |
| R7 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | **MIGRATED** — G1 all mutating media; G2 authenticated read |
| R8 | `frontend/app/properties/[id]/page.tsx` | **PRESERVED** — public `getPropertyImages(propertyId)` unchanged |

---

## 7. Public R8 Preservation

R8 (`frontend/app/properties/[id]/page.tsx`) continues to call `getPropertyImages(propertyId)` with no second argument. No `{ authenticated: true }` added. File not modified.

---

## 8. Authorized Marker Removal

All `IWP_007_SESSION_ROUTE` declarations removed from W2–W8. Repository grep confirms zero matches under `frontend/` after implementation.

---

## 9. Token / Bearer Confirmation

| Check | Result |
|-------|--------|
| Caller-supplied tokens removed from W2–W8 | **PASS** |
| No new `getToken` / `access_token` in W2–W8 | **PASS** |
| No `Authorization` / `Bearer` construction added in W1–W8 | **PASS** |
| Auth/session infrastructure unchanged | **PASS** |

---

## 10. Validation Commands and Results

Executed from `frontend/`:

| Check | Command | Result |
|-------|---------|--------|
| V1 | `npm run lint` | **PASS** |
| V2 | `npm run typecheck` | **PASS** |
| V3 | `npm run build` | **PASS** |

Backend pytest: **NOT APPLICABLE** — no backend write set.

---

## 11. Static-Check Results (V4–V8)

| Check | Method | Result |
|-------|--------|--------|
| V4 | No `token` parameter on G1 exports in W1 | **PASS** |
| V5 | No `void token` in W1 G1 exports | **PASS** |
| V6 | No `IWP_007_SESSION_ROUTE` in W2–W8 | **PASS** |
| V7 | No `Authorization` / `Bearer` in W1–W8 | **PASS** |
| V8 | W1 diff limited to upload/media exports; IWP-007 workflow bodies unchanged | **PASS** |
| V9 | Manual R1–R8 trace | **PASS** |

Excluded surfaces verified read-only: `getImageUrl.ts`, auth stack, backend — unchanged.

---

## 12. Browser QA Disposition

| Check | Result |
|-------|--------|
| V10 Browser/runtime upload/gallery QA | **NOT RUN** |

---

## 13. Stop-Condition Disposition

SC1–SC11: **none triggered**.

---

## 14. Final Implementation Status

| Item | State |
|------|-------|
| IWP-008 technical implementation | **COMPLETED** |
| Implementation evidence E1 | **COMMITTED** (this artifact) |
| IWP-008 package acceptance | **NOT GRANTED** |
| IWP-008 package closure | **NOT GRANTED** |
| Active implementation packages | 1 — IWP-008 ONLY |
| Stage I4 | **IN PROGRESS** |
| Push / release / deployment | **NOT AUTHORIZED** |

---

## 15. Residual Risks

- Browser/runtime upload and gallery flows not manually exercised (V10 NOT RUN).
- Broader IWP-008 register scope (backend hardening, `getImageUrl`, gallery UX) remains for future separate authority.

---

## 16. Exact Next Lifecycle Act

**Package acceptance review** under `docs/implementation/IWP_008_EXECUTION_AUTHORIZATION.md` and governing Stage I4 acceptance gates — not authorized by this implementation act.

Acceptance must not be granted until separate acceptance authority is satisfied.
