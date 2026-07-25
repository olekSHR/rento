# IWP-006 F-009 Session-Failure Reconciliation Implementation Evidence

## 1. Artifact Identity

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_006_F009_IMPLEMENTATION_EVIDENCE.md` |
| Invocation | PASS — PUBLISHED §45 F-009 BOUNDED IMPLEMENTATION AUTHORIZATION INVOKED |
| §45 publication | `b201919bdaf57f88cc6899c41078aad2de82fe19` |
| Controlling authority | `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §45 |
| Finding scope | F-009 only — bounded session-failure reconciliation |
| F-009 implementation | COMPLETED — W1, W2, W3 |
| Independent final targeted review | **NOT RUN** — IMPL-GATE-5 deferred |
| F-009 slice disposition | **IMPLEMENTED — PENDING IMPL-GATE-5 VALIDATION** |
| IWP-006 status | **SELECTED — ACTIVE — NOT ACCEPTED — NOT CLOSED** |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |

---

## 2. Starting Repository State (Implementation Execution)

| Item | Value |
|------|-------|
| HEAD at execution start | `b201919bdaf57f88cc6899c41078aad2de82fe19` |
| Branch | `main` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 22 ahead / 0 behind |
| Staging | empty |
| §45 status at start | PUBLISHED — EFFECTIVE |
| F-009 implementation (pre-execution) | NOT STARTED |
| Authorized production paths (pre-execution) | clean — no uncommitted changes |
| Pre-existing unrelated dirty paths | Present in working tree (governance/docs surfaces); not used as authority; not modified by this invocation |

---

## 3. Published Authority and Writable / Read-Only Sets

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §45 | Primary bounded implementation authorization |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` §5, §11 F-009 | Original finding — session-failure semantics (read-only) |
| `docs/implementation/IWP_006_F001_IMPLEMENTATION_EVIDENCE.md` | F-001 cookie-session model — preserved (read-only) |
| `docs/implementation/IWP_006_F003_IMPLEMENTATION_EVIDENCE.md` | F-003 envelope parsing — preserved (read-only) |
| Committed `frontend/lib/authFetch.ts`, `frontend/context/AuthContext.tsx`, `frontend/services/api.ts` @ `b201919` | Implementation surfaces (read-only baseline) |

**Production write set:** W1, W2, W3.

**Evidence write set:** E1 only.

---

## 4. Verified Pre-Implementation Defects

| Gap | Pre-implementation behavior | Required correction |
|-----|----------------------------|---------------------|
| **Gap A** | `authFetch` called local `notifyUnauthorized()` on both **401** and **403** | Emit shared signal on **401** only; **403** throws `ForbiddenError` without session invalidation |
| **Gap B** | `api.ts` `sessionFetch` returned **401** responses without reconciliation signal | Emit shared signal on **401** before returning the same `Response`; **403** unchanged |

---

## 5. Files Actually Changed

| ID | Path | Change class |
|----|------|--------------|
| **W1** | `frontend/lib/authSessionEvents.ts` | created |
| **W2** | `frontend/lib/authFetch.ts` | modified |
| **W3** | `frontend/services/api.ts` | modified |
| **E1** | `docs/implementation/IWP_006_F009_IMPLEMENTATION_EVIDENCE.md` | created |

**Scoped implementation diff:** W1 + W2 + W3 + E1 only for this invocation.

**Pre-existing unrelated dirty paths (not part of this invocation):** `docs/design/MASTER_ROADMAP.md`, `docs/design/releases/v1.0-admin-platform.md`, `docs/engineering/IMPLEMENTATION_GOVERNANCE.md`, `docs/engineering/REPOSITORY_STANDARDS.md`, `docs/implementation/IMPLEMENTATION_PROGRAM.md`, `docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`, `docs/engineering/GOVERNANCE_THRESHOLD_AMENDMENT.md`, `docs/implementation/IWP_006_F013_CALLER_GRAPH_EVIDENCE.md`, `docs/implementation/reviews/STAGE_I0_LIFECYCLE_EVIDENCE_RECONSTRUCTION.md`.

---

## 6. Implementation Summary

### 6.1 W1 — `frontend/lib/authSessionEvents.ts`

Added transport-agnostic helper `dispatchAuthUnauthorized()`:

| Behavior | Implementation |
|----------|----------------|
| Event name | `auth:unauthorized` (canonical, unchanged) |
| Runtime guard | dispatches only when `typeof window !== "undefined"` |
| Side effects | event dispatch only — no navigation, logout, storage, or retry |
| Dependencies | none |
| React / AuthContext / router / API imports | none |

### 6.2 W2 — `frontend/lib/authFetch.ts`

| Element | Result |
|---------|--------|
| Local `notifyUnauthorized()` | removed — replaced by W1 import |
| `401` handling | W1 dispatch + `UnauthorizedError("Session expired or invalid")` |
| `403` handling | **no W1 dispatch** — `ForbiddenError("Access forbidden")` only |
| Request construction, CSRF, credentials | unchanged |
| F-003 `parseApiErrorMessage` on other non-OK | unchanged |
| Success path | unchanged — `response.json()` |
| Exported interfaces | unchanged |

### 6.3 W3 — `frontend/services/api.ts`

| Element | Result |
|---------|--------|
| Import | `@/lib/authSessionEvents` only — **zero** `authFetch` import |
| `sessionFetch` on **401** | W1 dispatch before returning original `Response` |
| `sessionFetch` on **403** | no W1 dispatch |
| Response body | not consumed inside `sessionFetch` |
| Callers, domain-specific `401`/`404` branches | unchanged |
| F-003 `parseApiErrorMessage` usage | unchanged |
| `registerUser` dead export | unchanged |
| Transport (CSRF, credentials, headers) | unchanged |

---

## 7. Preservation Verification

| Boundary | Verdict | Evidence |
|----------|---------|----------|
| F-001 cookie-session model | PASS | No transport/header/credential changes |
| F-002 Phase 1 transport | PASS | `sessionFetch` transport unchanged except 401 signal |
| F-003 error-envelope parsing | PASS | `parseApiErrorMessage` paths unchanged |
| F-005 route guards | PASS | No guard files touched |
| F-006 register flow | PASS | No register surfaces touched |
| AuthContext | PASS | Unchanged — existing listener retained |
| authApi.ts | PASS | Unchanged |
| Callers | PASS | No export signature changes |
| Backend | PASS | No backend files touched |
| IWP-007 | NOT ACTIVATED | No caller migration |

---

## 8. Static Event-Flow Verification (§45.5)

| Case | Expected | Result |
|------|----------|--------|
| (a) authFetch **401** → W1 | emit `auth:unauthorized` | PASS |
| (b) authFetch **403** → no W1 | no session invalidation | PASS |
| (c) sessionFetch **401** → W1 | emit before return | PASS |
| (d) sessionFetch **403** → no W1 | authorization denial only | PASS |
| sessionFetch returns original `Response` | same object returned | PASS |
| W1 forbidden imports | none | PASS |
| Zero `api.ts` → `authFetch` import | grep confirms | PASS |

---

## 9. Validation Commands and Exact Results

Implementation-time checks executed from `frontend/`.

| Check | Result | Notes |
|-------|--------|-------|
| `npm run typecheck` | **PASS** | exit code 0 |
| `npm run lint` | **PASS** | exit code 0 |
| `git diff --check` (W1–W3) | **PASS** | exit code 0 |
| Scoped diff inspection | **PASS** | W1 + W2 + W3 + E1 only |
| Targeted automated frontend tests | **NOT APPLICABLE** | no frontend test infrastructure per §45 |
| Manual runtime browser QA | **NOT RUN** | not required by §45 |
| Repository-wide validation | **NOT RUN** | not required |
| IMPL-GATE-5 | **NOT RUN** | deferred by invocation scope |

---

## 10. Scope Exclusions and Remaining Findings

| Item | Status |
|------|--------|
| Dead `api.ts::registerUser` removal | EXPLICITLY EXCLUDED — deferred |
| F-002 Phase 2 caller migration | DEFERRED — IWP-007 |
| Refresh tokens / silent renewal | EXPLICITLY EXCLUDED |
| authApi.ts deduplication | EXPLICITLY EXCLUDED |
| F-007–F-008, F-010–F-012 | OUT OF SCOPE |

---

## 11. Stop-Condition Assessment (§45.6)

| Condition | Status |
|-----------|--------|
| Write set expansion | NOT TRIGGERED |
| AuthContext / authApi edits required | NOT TRIGGERED |
| Caller or route-guard edits required | NOT TRIGGERED |
| Backend / refresh / retry changes required | NOT TRIGGERED |
| Dependency / lockfile change | NOT TRIGGERED |
| IWP-007 activation | NOT TRIGGERED |

---

## 12. Risks and Unresolved Limitations

| Risk | Severity | Notes |
|------|----------|-------|
| Concurrent **401** responses may emit multiple events | Low | Idempotent AuthContext clear; §45 excludes deduplication infrastructure |
| No automated frontend tests | Medium | Static event-flow cases recorded; IMPL-GATE-5 pending |
| Pre-existing unrelated dirty working tree | Low | Isolated at commit staging |

---

## 13. Implementation Commit Record

| Field | Value |
|-------|-------|
| Commit hash | Locate via `git log -1 --grep='fix(iwp-006): reconcile F-009 session failures'` on parent `b201919` |
| Parent | `b201919bdaf57f88cc6899c41078aad2de82fe19` |
| Subject | `fix(iwp-006): reconcile F-009 session failures` |
| Paths committed | W1 + W2 + W3 + E1 only |

---

## 14. Final Git State

| Item | Value |
|------|-------|
| Push | NOT PERFORMED — not authorized |

---

## 15. Posture

| Field | Value |
|-------|-------|
| F-009 | **IMPLEMENTED — PENDING IMPL-GATE-5 VALIDATION** |
| IWP-006 | **SELECTED — ACTIVE — NOT ACCEPTED — NOT CLOSED** |
| IWP-007 | **NOT ACTIVATED** |

Does **not** claim F-009 RESOLVED, IMPL-GATE-5 PASS, IWP-006 acceptance/closure, continuity synchronization, release readiness, deployment, or push authorization.

---

## 16. Acceptance Verdicts (Implementation Only)

| Gate | Verdict |
|------|---------|
| §45 write set compliance | **PASS** |
| W1/W2/W3 contract | **PASS** |
| Validation (typecheck/lint) | **PASS** |
| Preservation boundaries | **PASS** |
| IMPL-GATE-5 | **NOT RUN** |
| F-009 RESOLVED disposition | **NOT RECORDED** |
| IWP-006 acceptance/closure | **NOT GRANTED** |
| Push | **NOT RUN** |

---

## 17. Exact Next Authorized Action

**One separate bounded IMPL-GATE-5 targeted read-only review of F-009 implementation against published §45 — without recording F-009 as RESOLVED unless review PASS and disposition separately authorized; without accepting or closing IWP-006; without activating IWP-007; without push.**
