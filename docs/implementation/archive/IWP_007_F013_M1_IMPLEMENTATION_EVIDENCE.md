# IWP-007 F-013 M1 Caller-Token Plumbing Remediation Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_007_F013_M1_IMPLEMENTATION_EVIDENCE.md` |
| Package | IWP-007 — Frontend Property And Realtor Workflow Stabilization |
| Finding scope | F-013 M1 only — eliminate caller-side legacy token plumbing at R6–R21 |
| F-013 M1 disposition | **COMPLETED — bounded R6–R21 caller scope** |
| F-013 full closure | **NOT GRANTED — M1 slice only** |
| IWP-007 acceptance | **NOT GRANTED** |
| IWP-007 closure | **NOT GRANTED** |

---

## 2. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at implementation start | `3766bd915649b2b8e7854064179cdd3502e213ce` |
| Subject | `docs(iwp-007): activate work package` |
| Branch | `main` |
| Discovery basis | `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` (read-only) |

---

## 3. Controlling Authorities

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_007_EXECUTION_AUTHORIZATION.md` §9–§10, §12 | M1 remediation scope S2/S5 |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Upload/media ownership boundary |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` | R6–R21 caller inventory |

---

## 4. M1 Remediation Summary

Per F-013 evidence O5 M1: legacy `getToken()` / `localStorage.getItem("access_token")` at committed call sites R6–R21 was **non-functional plumbing** after F-002 Phase 1 (`api.ts` ignored token values). M1 removes acquisition and token arguments without changing transport semantics.

---

## 5. Caller Graph R6–R21 Disposition

| Route | Path | Remediation |
|-------|------|-------------|
| R6 | `frontend/app/become-realtor/page.tsx` | Removed `getToken`; G1 calls without token arg |
| R7 | `frontend/app/realtor/page.tsx` | Removed `getToken`; §10.3 for `uploadImage` |
| R8 | `frontend/app/realtor/profile/page.tsx` | Removed `localStorage` token read; G1 calls |
| R9 | `frontend/app/realtor/properties/create/page.tsx` | Removed `getToken`; §10.3 upload/media |
| R10 | `frontend/app/realtor/properties/[id]/edit/page.tsx` | Removed `getToken`; G2 `{ authenticated: true }` |
| R11 | `frontend/app/admin/page.tsx` | Removed `getToken`; `getAdminStats()` |
| R12 | `frontend/app/admin/properties/page.tsx` | Removed `localStorage` token read; G1 calls |
| R13 | `frontend/app/admin/properties/create/page.tsx` | Removed `localStorage` token read; §10.3 upload/media |
| R14 | `frontend/app/admin/properties/[id]/page.tsx` | Removed `getToken`; G2 + §10.3 `getPropertyImages` |
| R15 | `frontend/app/admin/properties/[id]/edit/page.tsx` | Removed mixed token reads; G2 + §10.3 `uploadImage` |
| R16 | `frontend/app/admin/realtor-applications/page.tsx` | Removed `getToken`; G1 calls |
| R17 | `frontend/app/admin/users/page.tsx` | Removed `getToken`; `getAdminUsers(query)` |
| R18 | `frontend/app/admin/users/[id]/page.tsx` | Removed `getToken`; G1 admin user calls |
| R20 | `frontend/components/gallery/PropertyGalleryManager.tsx` | Removed `getToken`; §10.3 all media calls |
| R21 | `frontend/components/realtor/RealtorPropertyGallery.tsx` | Removed `getToken`; §10.3 all media calls |

R3/R4 public paths not in mandatory migration set — unchanged.

---

## 6. Static Verification (M1-specific)

| Check | Result |
|-------|--------|
| `getToken` absent from W2–W16 | **PASS** |
| `access_token` / `localStorage.getItem("access_token")` absent from W2–W16 | **PASS** |
| No new `Authorization` / `Bearer` in W1–W18 | **PASS** |
| IWP-008 upload/media API signatures and bodies unchanged | **PASS** |
| `tokenStorage.ts` not modified | **PASS** |
| Auth stack files not modified | **PASS** |

---

## 7. Manual Trace R6–R21

| Trace | Scope | Result |
|-------|-------|--------|
| V7 | R6–R18 workflow pages | **PASS** — no client-side token acquisition; G1/G2 route through existing cookie-session transport |
| V8 | R20–R21 gallery managers | **PASS** — token acquisition removed; §10.3 marker preserves session routing for IWP-008-owned symbols |

Browser/runtime QA: **NOT RUN**. Backend tests: **NOT APPLICABLE**.

---

## 8. Executable Validation (commit candidate)

| Command | Result |
|---------|--------|
| `npm run lint` | **PASS** |
| `npm run typecheck` | **PASS** |
| `npm run build` | **PASS** |

---

## 9. Stop-Condition Disposition

SC1–SC11: **none triggered**. Gallery remediation limited to caller-token plumbing per coordination §4.2 — no UX, validation, or layout changes.

---

## 10. Residual Risk

§10.3 session-route marker remains until IWP-008 owns signature stabilization. This is an expected temporary bridge, not unresolved M1 scope.

---

## 11. Acceptance Posture

This evidence records F-013 M1 remediation only. **IWP-007 package acceptance is NOT GRANTED** by this artifact.
