# IWP-006 F-008 API URL Fallback Consolidation Implementation Evidence

## 1. Starting Repository State

| Item | Value |
|------|-------|
| HEAD at execution start | `440b090653dbb98780be9dd9ec03185e0f442fbf` |
| Branch | `main` |
| Subject | `docs(iwp-006): publish F-008 API URL fallback authority` |
| Parent | `8abf8c508765b1a12f7512b722d4716a364cab0b` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 31 ahead / 0 behind |
| Staging | empty |
| §47 status at start | PUBLISHED — EFFECTIVE (F-008 BOUNDED IMPLEMENTATION AUTHORIZATION ONLY) |
| Pre-existing unrelated dirty paths | Present; not modified by this invocation |

---

## 2. Effective Authority

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §47 | Primary bounded F-008 implementation authorization |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` §11 F-008 | Original finding (read-only) |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` M6 | Duplicate config evidence (read-only) |

---

## 3. Exact Production Write Set

| ID | Path |
|----|------|
| W1 | `frontend/lib/apiBaseUrl.ts` (new) |
| W2 | `frontend/lib/authFetch.ts` |
| W3 | `frontend/services/api.ts` |
| W4 | `frontend/services/authApi.ts` |
| W5 | `frontend/lib/getImageUrl.ts` |
| E1 | `docs/implementation/IWP_006_F008_IMPLEMENTATION_EVIDENCE.md` |

---

## 4. Defect Before Implementation

Four surfaces duplicated `process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"`:

| Surface | Path | Composition |
|---------|------|-------------|
| Auth transport | `frontend/lib/authFetch.ts:5–6` | `${API_BASE_URL}${endpoint}` |
| Domain API | `frontend/services/api.ts:7–9` | `${API_URL}/...` |
| Auth raw-fetch | `frontend/services/authApi.ts:10–11` | `${API_BASE_URL}/auth/...` |
| Image URLs | `frontend/lib/getImageUrl.ts:1–3` | base `.replace(/\/$/, "")` then `${API_URL}${normalized}` |

No shared canonical owner existed in `frontend/lib/`.

---

## 5. Canonical-Owner Decision

**Single canonical owner:** `frontend/lib/apiBaseUrl.ts`

```typescript
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
```

No trailing-slash normalization in W1. W5 retains local `.replace(/\/$/, "")`.

---

## 6. Implementation Performed

### W1 — `frontend/lib/apiBaseUrl.ts`

- Created canonical exported constant `API_BASE_URL` with one env read and development fallback.

### W2 — `frontend/lib/authFetch.ts`

- Removed local fallback declaration.
- Added `import { API_BASE_URL } from "./apiBaseUrl"`.
- Preserved fetch URL template `${API_BASE_URL}${endpoint}` and all transport/error behavior.

### W3 — `frontend/services/api.ts`

- Removed local fallback declaration.
- Added `import { API_BASE_URL as API_URL } from "@/lib/apiBaseUrl"`.
- Preserved all endpoint paths and request construction.

### W4 — `frontend/services/authApi.ts`

- Removed local fallback declaration.
- Added `import { API_BASE_URL } from "@/lib/apiBaseUrl"`.
- Preserved raw `fetch` auth endpoints and parsing behavior.

### W5 — `frontend/lib/getImageUrl.ts`

- Removed local env/fallback expression.
- Added `import { API_BASE_URL } from "@/lib/apiBaseUrl"`.
- Preserved `const API_URL = API_BASE_URL.replace(/\/$/, "")` at image composition layer.

---

## 7. Runtime Semantics Preserved

| Behavior | Status |
|----------|--------|
| Auth transport URL templates | Unchanged |
| CSRF / credentials / session transport | Unchanged |
| Domain API endpoint paths | Unchanged |
| Raw auth fetch paths (`/auth/login`, etc.) | Unchanged |
| Image URL composition with W5-only trailing-slash strip | Unchanged |
| Development fallback `http://127.0.0.1:8000` | Unchanged |
| Env key `NEXT_PUBLIC_API_URL` | Unchanged |
| No `/api` suffix introduced or removed | Confirmed |

---

## 8. Targeted Search Results

| Pattern | Result |
|---------|--------|
| `NEXT_PUBLIC_API_URL` in W1–W5 | W1 only (`apiBaseUrl.ts:2`) |
| `"http://127.0.0.1:8000"` in W1–W5 | W1 only |
| `@/lib/apiBaseUrl` / `./apiBaseUrl` imports | W2–W5 import canonical value |
| Local fallback in W2–W5 | None |
| `.replace(/\/$/, "")` | W5 only (`getImageUrl.ts:3`) |
| `API_BASE_URL` usage | W1 export; W2/W4 direct; W3 aliased as `API_URL`; W5 import + local strip |

Out-of-scope note: `frontend/services/api.ts.save` retains legacy duplicate (not in authorized write set; not modified).

---

## 9. Typecheck

| Item | Value |
|------|-------|
| Command | `npm run typecheck` (from `frontend/`) |
| Result | **PASS** — exit code 0 |

---

## 10. Lint

| Item | Value |
|------|-------|
| Command | `npm run lint` (from `frontend/`) |
| Result | **PASS** — exit code 0 |

---

## 11. Scoped `git diff --check`

| Scope | Result |
|-------|--------|
| W1–W5 paths | **PASS** — no whitespace errors |
| Repository-wide | Pre-existing unrelated trailing-whitespace warnings in untouched docs paths only |

Production diff summary: 1 new file + 4 modified files; net −7 lines in modified files.

---

## 12. Remaining Risks

| Risk | Status |
|------|--------|
| Production/staging `NEXT_PUBLIC_API_URL` runtime values | UNRESOLVED — env not inspected |
| `api.ts.save` legacy duplicate | UNRESOLVED — out of F-008 scope (F-010) |
| Implementation not yet committed | Present — §47 does not grant commit authority in this invocation |
| IWP-006 acceptance | NOT GRANTED |

---

## 13. F-008 Disposition

**F-008 — RESOLVED — BOUNDED API URL FALLBACK CONSOLIDATION SCOPE**

Implementation complete within W1–W5. Required validation PASS. Evidence recorded in E1.

Disposition recording in `IWP_006_EXECUTION_AUTHORIZATION.md` requires a separately authorized governance act if required by Repository Authority.

---

## 14. Explicit Non-Modification Statements

| Item | Status |
|------|--------|
| F-007 | NOT MODIFIED |
| F-010 | NOT MODIFIED |
| F-002 Phase 2 | NOT MODIFIED |
| IWP-006 acceptance / closure | NOT GRANTED — NOT CLOSED |
| Push | NOT PERFORMED |
| Implementation commit | NOT CREATED — commit authority not explicit in §47 implementation invocation |

---

## 15. Implementation Commit

NOT APPLICABLE — no commit performed in this invocation.
