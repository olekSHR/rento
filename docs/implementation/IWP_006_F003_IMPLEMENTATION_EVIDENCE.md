# IWP-006 F-003 Frontend Error-Envelope Normalization Implementation Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_006_F003_IMPLEMENTATION_EVIDENCE.md` |
| Invocation | PASS — PUBLISHED §44 F-003 BOUNDED IMPLEMENTATION AUTHORIZATION INVOKED |
| §44 publication | `db106346e916448155c564416b54393e9b08ce4b` |
| Controlling authority | `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §44 |
| Finding scope | F-003 only — bounded frontend error-envelope normalization |
| F-003 implementation | COMPLETED — W1, W2, W3 |
| Independent final targeted review | **NOT RUN** — IMPL-GATE-5 pending separate review act |
| F-003 slice disposition | **IMPLEMENTED — PENDING IMPL-GATE-5 VALIDATION** |
| IWP-006 status | **SELECTED — ACTIVE — NOT ACCEPTED — NOT CLOSED** |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |

---

## 2. Starting Repository State (Implementation Execution)

| Item | Value |
|------|-------|
| HEAD at execution start | `db106346e916448155c564416b54393e9b08ce4b` |
| Branch | `main` |
| Divergence | 19 ahead / 0 behind `origin/main` |
| Staging | empty |
| §44 status at start | PUBLISHED — EFFECTIVE |
| F-003 implementation (pre-execution) | NOT STARTED |
| Authorized production paths (pre-execution) | clean — no uncommitted changes |
| Pre-existing unrelated dirty paths | Present in working tree (governance/docs surfaces); not used as authority; not modified by this invocation |

---

## 3. Published Authority and Writable / Read-Only Sets

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §44 | Primary bounded implementation authorization |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` §6.2, §11 F-003 | Error-envelope variance baseline (read-only) |
| `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md` M10, O7 | Caller graph — no caller edits required (read-only) |
| `docs/implementation/IWP_006_F002_PHASE1_IMPLEMENTATION_EVIDENCE.md` | F-002 Phase 1 transport — preserved except §44.4.5 envelope supersession |
| `docs/implementation/IWP_006_F006_IMPLEMENTATION_EVIDENCE.md` | F-006 R5 — not reopened |
| Committed `backend/app/core/handlers.py` | Application error envelope `{ success: false, message: string }` (read-only) |

**Production write set:** W1, W2, W3.

**Evidence write set:** E1 only.

---

## 4. Files Actually Changed

| ID | Path | Change class |
|----|------|--------------|
| **W1** | `frontend/lib/apiError.ts` | created |
| **W2** | `frontend/lib/authFetch.ts` | modified |
| **W3** | `frontend/services/api.ts` | modified |
| **E1** | `docs/implementation/IWP_006_F003_IMPLEMENTATION_EVIDENCE.md` | created |

**Scoped implementation diff:** W1 + W2 + W3 + E1 only for this invocation.

**Pre-existing unrelated dirty paths (not part of this invocation):** `docs/design/MASTER_ROADMAP.md`, `docs/design/releases/v1.0-admin-platform.md`, `docs/engineering/IMPLEMENTATION_GOVERNANCE.md`, `docs/engineering/REPOSITORY_STANDARDS.md`, `docs/implementation/IMPLEMENTATION_PROGRAM.md`, `docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`, `docs/engineering/GOVERNANCE_THRESHOLD_AMENDMENT.md`, `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md`, `docs/implementation/reviews/STAGE_I0_LIFECYCLE_EVIDENCE_RECONSTRUCTION.md`.

---

## 5. Implementation Summary

### 5.1 W1 — `frontend/lib/apiError.ts`

Added transport-agnostic helper `parseApiErrorMessage(response, fallback)`:

| Behavior | Implementation |
|----------|----------------|
| Precedence | non-empty string `message` → non-empty string `detail` → caller fallback |
| Empty body | fallback (JSON parse failure caught) |
| Invalid JSON | fallback |
| Array/object `detail` | ignored — fallback used |
| Throwing during parse | none — errors swallowed, fallback returned |
| Dependencies | none |
| Auth/session imports | none |

### 5.2 W2 — `frontend/lib/authFetch.ts`

| Element | Result |
|---------|--------|
| Request construction | unchanged |
| CSRF header attachment | unchanged |
| `credentials: "include"` | unchanged |
| `401` handling | unchanged — `UnauthorizedError("Session expired or invalid")` + `notifyUnauthorized()` |
| `403` handling | unchanged — `ForbiddenError("Access forbidden")` + `notifyUnauthorized()` |
| Other non-OK responses | W1 parser with fallback `` `Request failed: ${response.status}` `` |
| Success path | unchanged — `response.json()` |
| Exported interfaces | unchanged |

### 5.3 W3 — `frontend/services/api.ts`

| Element | Result |
|---------|--------|
| Import | `@/lib/apiError` only — **zero** `authFetch` import |
| Generic session/public failure paths | 30 paths now use `parseApiErrorMessage` with operation-specific fallback preserved |
| Local parsers removed | `parseRealtorApplicationError`, `parseUserRoleError` consolidated into W1 |
| Domain-specific status branches | preserved — api.ts `401`/`404` custom messages unchanged |
| `registerUser` | **unchanged** — dead export retained; custom duplicate-email mapping preserved (explicitly excluded domain behavior) |
| `uploadImage` success validation | unchanged — `"Upload response missing image url"` remains success-path check |
| Export signatures | unchanged |
| Transport (sessionFetch, CSRF, credentials, no bearer) | unchanged |

---

## 6. Parser Precedence and Fallback Behavior

Deterministic source-level validation cases (§44.6):

| Case | Expected behavior | W1 |
|------|-------------------|-----|
| (a) `{ message: "Not allowed" }` | returns `"Not allowed"` | PASS |
| (b) `{ detail: "Bad request" }` (no message) | returns `"Bad request"` | PASS |
| (c) `{ detail: [{ loc: [], msg: "x" }] }` | returns fallback | PASS — typeof check excludes arrays |
| (d) W2 `401`/`403` | specialized errors before W1 | PASS — static inspection |

---

## 7. api.ts Failure-Path Inventory

### 7.1 Normalized via W1 (30 paths)

All generic `!response.ok` throws on session/authenticated and public fetch failure paths now call `parseApiErrorMessage` with the prior operation-specific fallback string.

Realtor-application and admin user-role failure paths previously using local parsers now call W1 directly.

### 7.2 Explicitly preserved outside W1 normalization

| Path / throw | Classification | Reason |
|--------------|----------------|--------|
| `registerUser` custom catch block | Domain-specific — excluded | Duplicate-email mapping + F-006-adjacent heuristic; dead export cleanup deferred |
| `createRealtorApplication` / admin flows `401` | Domain-specific status branch | Custom sign-in copy — not authFetch envelope |
| `updateUserRole` / account status `401`, `404` | Domain-specific status branch | Preserved pre-slice behavior |
| `getMyRealtorApplication` `404 → null` | Success-path semantics | Not an error throw |
| `getAdminUserById` `404` | Domain-specific status branch | Fixed `"User not found."` copy |
| `uploadImage` missing url after OK | Success-path validation | Not HTTP error envelope |

### 7.3 Remaining generic `Failed to` / `Unable to` strings

All remaining occurrences are **fallback arguments** to `parseApiErrorMessage`, not blind static throws.

---

## 8. Preservation Verification

| Boundary | Verdict | Evidence |
|----------|---------|----------|
| F-001 cookie-session model | PASS | No transport/header/credential changes in W2/W3 |
| F-002 Phase 1 transport | PASS | sessionFetch, CSRF, bearer elimination unchanged |
| F-002 Phase 1 error supersession | PASS | Only error message content class changed per §44.4.5 |
| F-005 route guards | PASS | No caller/guard files touched |
| F-006 register flow | PASS | `register/page.tsx` untouched; `registerUser` heuristic untouched |
| F-009 session semantics | PASS | No refresh/global 401 recovery added |
| Caller signatures | PASS | No export signature changes |
| IWP-007 | NOT ACTIVATED | No caller migration |

---

## 9. Validation Commands and Exact Results

Executed from `frontend/` at implementation time.

| Check | Result | Notes |
|-------|--------|-------|
| `npm run typecheck` | **PASS** | `tsc --noEmit` exit 0 |
| `npm run lint` | **PASS** | `eslint` exit 0 |
| `git diff --check` (W1–W3) | **PASS** | no whitespace errors |
| W2 401/403 preservation | **PASS** | static inspection |
| Non-string `detail` safety | **PASS** | typeof string guard only |
| Zero `api.ts` → `authFetch` import | **PASS** | grep confirms |
| W1 transport-agnostic | **PASS** | no auth/session imports |
| Scoped path verification | **PASS** | W1, W2, W3, E1 only |
| Targeted automated frontend tests | **NOT APPLICABLE** | no frontend test infrastructure |
| Manual runtime browser QA | **NOT RUN** | optional per §44.6 |
| Repository-wide validation | **NOT RUN** | not required |

---

## 10. Stop-Condition Assessment (§44.8)

| Condition | Status |
|-----------|--------|
| Write set expansion | NOT TRIGGERED |
| Caller edits required | NOT TRIGGERED |
| authApi.ts edits required | NOT TRIGGERED |
| Backend changes required | NOT TRIGGERED |
| Session/CSRF semantics change | NOT TRIGGERED |
| Dependency/lockfile change | NOT TRIGGERED |
| IWP-007 activation | NOT TRIGGERED |

---

## 11. Risks and Unresolved Limitations

| Risk | Severity | Notes |
|------|----------|-------|
| `authApi.ts` login/password-reset raw-fetch parsers | Low | Out of scope — inherit W2 for `authFetch` paths only |
| `registerUser` dead export + custom parser | Low | Deferred separate slice |
| No automated frontend tests | Medium | Deterministic source-level cases recorded; IMPL-GATE-5 review required |
| Pre-existing unrelated dirty working tree | Low | Isolate at commit staging |

---

## 12. Deferred Work

| Item | Owner |
|------|-------|
| IMPL-GATE-5 targeted review | Separate review act |
| F-003 disposition RESOLVED | After IMPL-GATE-5 PASS |
| `authApi.ts` parser deduplication | Optional future slice |
| Dead `api.ts::registerUser` removal | Separate deferred slice |
| F-002 Phase 2 caller migration | IWP-007 |
| IWP-006 package acceptance | Blocked by open findings |

---

## 13. Final Git State

| Item | Value |
|------|-------|
| F-003 commit | Recorded at commit finalization (see §13.1) |
| Push | NOT PERFORMED |

### 13.1 Commit record (post-finalization)

| Field | Value |
|-------|-------|
| Commit hash | Recorded after scoped commit |
| Subject | `fix(iwp-006): normalize F-003 frontend API errors` |
| Paths committed | W1 + W2 + W3 + E1 only |

---

## 14. Disposition Recommendation

**F-003 — IMPLEMENTED — PENDING IMPL-GATE-5 VALIDATION**

Implementation alone does **not** establish F-003 acceptance, IWP-006 acceptance, or IWP-006 closure.

Maximum disposition after this evidence: bounded implementation complete pending targeted security/error-presentation review per §44.7.

---

## 15. Acceptance Verdicts

| Gate | Verdict |
|------|---------|
| §44 write set compliance | **PASS** |
| W1/W2/W3 contract | **PASS** |
| Validation (typecheck/lint) | **PASS** |
| Preservation boundaries | **PASS** |
| IMPL-GATE-5 review | **NOT RUN** |
| F-003 RESOLVED disposition | **NOT GRANTED** — pending review |
| IWP-006 acceptance/closure | **NOT GRANTED** |

---

## 16. Exact Next Authorized Action

**One bounded IMPL-GATE-5 targeted final review** of W1–W3 per §44.7 — envelope parsing, 401/403 preservation, no validation-structure leakage, no transport regression — without accepting or closing IWP-006, without activating IWP-007, and without push unless separately authorized.

After review PASS: record F-003 disposition **RESOLVED — BOUNDED FRONTEND ERROR-ENVELOPE SCOPE** per §44.9.
