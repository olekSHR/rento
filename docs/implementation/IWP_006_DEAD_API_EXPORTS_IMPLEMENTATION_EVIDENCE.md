# IWP-006 Dead API Exports Implementation Evidence

## 1. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at execution start | `d72496eed2e10083292ffb230860e9624789825d` |
| Branch | `main` |
| Subject | `docs(iwp-006): publish unused API export removal authority` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 37 ahead / 0 behind |
| Staging | empty |
| §49 status at start | PUBLISHED — EFFECTIVE (BOUNDED UNUSED API EXPORT REMOVAL AUTHORIZATION ONLY) |
| Pre-existing unrelated dirty paths | Present; not modified |

---

## 2. Effective Authority

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §49 | Bounded dead-export removal authorization |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` M2/M8 | Zero-caller evidence (read-only) |

---

## 3. Exact Target Declarations Removed

| Declaration | Former location |
|-------------|-----------------|
| `export type AIListingRequest` | `api.ts:553–560` |
| `export type AIListingResponse` | `api.ts:562–566` |
| `export async function generateAIListing` | `api.ts:568–586` |
| `type RegisterUserResponse` | `api.ts:588–592` |
| `export async function registerUser` | `api.ts:594–628` |

---

## 4. Pre-Removal Caller and Compatibility Determination

| Search | Result |
|--------|--------|
| `registerUser` from `@/services/api` | **zero** imports |
| `generateAIListing` / AI types outside `api.ts` | **zero** |
| Namespace `* as` / dynamic / test / mock refs | **none** |
| Re-exports / barrels | **none** |
| Repository Authority compatibility obligation | **none** for AI types or dead `registerUser` |

---

## 5. Canonical Live Registration API

**`frontend/services/authApi.ts::registerUser`** — unchanged.

Live callers: `frontend/app/register/page.tsx`, `frontend/context/AuthContext.tsx` — both use `@/services/authApi`.

---

## 6. Exact Code Removed

Single contiguous deletion (~77 lines) from `frontend/services/api.ts`: five named declarations and their bodies only.

---

## 7. Import Removal Determination

**NOT APPLICABLE** — no top-level import was used exclusively by deleted declarations. `sessionFetch`, `parseApiErrorMessage`, and shared helpers remain in use by surviving exports.

---

## 8. Surviving api.ts Behavior

All surviving exports, endpoint strings, request construction, response parsing, auth transport, property, image, and error behavior unchanged. Diff: deletion-only block; no other edits.

---

## 9. Unmodified Surfaces

| Path | Status |
|------|--------|
| `frontend/services/authApi.ts` | NOT MODIFIED |
| `frontend/app/register/page.tsx` | NOT MODIFIED |
| `frontend/context/AuthContext.tsx` | NOT MODIFIED |

---

## 10. Post-Removal Symbol Search

| Symbol | Result in `frontend/` |
|--------|----------------------|
| `AIListingRequest` | absent |
| `AIListingResponse` | absent |
| `generateAIListing` | absent |
| `RegisterUserResponse` | absent |
| `registerUser` in `api.ts` | absent — `authApi.registerUser` remains |

---

## 11. Typecheck

| Item | Value |
|------|-------|
| Command | `npm run typecheck` (from `frontend/`) |
| Result | **PASS** — exit code 0 |

---

## 12. Lint

| Item | Value |
|------|-------|
| Command | `npm run lint` (from `frontend/`) |
| Result | **PASS** — exit code 0 |

---

## 13. Scoped Diff and Whitespace Validation

| Check | Result |
|-------|--------|
| `git diff --check` on W1 | PASS |
| Production diff | 1 file, −77 lines, deletion-only |

---

## 14. Remaining Risks

| Risk | Status |
|------|--------|
| Hidden dynamic reference | none observed — typecheck/lint PASS |
| F-002 Phase 2 | deferred |
| IWP-006 acceptance | NOT GRANTED |

---

## 15. Disposition

**F-013 M2 / M8 — RESOLVED — BOUNDED UNUSED API EXPORT REMOVAL SCOPE**

---

## 16. Explicit Non-Modification Statements

| Item | Status |
|------|--------|
| F-007 | NOT MODIFIED |
| F-008 | NOT MODIFIED |
| F-010 | NOT MODIFIED |
| F-002 Phase 2 | NOT MODIFIED |
| Unrelated `api.ts` exports | NOT MODIFIED |
| §49 authority instrument | NOT MODIFIED |
| IWP-006 acceptance / closure | NOT GRANTED — NOT CLOSED |
| Push | NOT PERFORMED |

---

## 17. Implementation Commit

NOT APPLICABLE — recorded after commit if required by separate lifecycle act.
