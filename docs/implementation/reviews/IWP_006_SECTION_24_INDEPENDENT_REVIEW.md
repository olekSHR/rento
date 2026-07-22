# Independent Targeted Review — IWP-006 §24 Amendment Draft

**Review title:** IWP-006 Second Amendment Draft — Bounded Token-Storage Security Review For F-001  
**Review date:** 2026-07-22  
**Review Type:** Independent Review  
**Validation Scope:** Targeted Validation  
**Artifact class:** IWP package amendment review evidence  
**Binding authority:** None — review evidence only; not publication, not effectiveness, not implementation authorization  
**Decision label:** READY FOR PUBLICATION DECISION

---

## 1. Repository state at review start

| Item | Verified value |
|------|----------------|
| Repository root | `C:/Users/Александр/Desktop/Projects/rento` |
| Branch | `main` |
| HEAD | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| `origin/main` | `59ea460935f0d418d12ec0d6b7ffd333a2a0fd04` |
| Divergence | 0 ahead / 0 behind |
| Staging | empty |

**Verification command:** `git fetch origin main`; `git rev-parse HEAD`; `git rev-parse origin/main`; `git status --porcelain`; `git rev-list --left-right --count HEAD...origin/main` — all PASS.

---

## 2. Exact target and reviewed sections

| Field | Value |
|-------|-------|
| Target file | `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Reviewed sections | §24 — Bounded Token-Storage Security Review For F-001 (L751–L1015); §25 inspected for lifecycle separation only (L1019–L1025) |
| File state vs HEAD | Local unstaged amendment draft; `+278` lines vs HEAD (HEAD ends §23) |
| SHA-256 digest (full file) | `70653a41d1ea92960837b8836a2004582b798c923a120e4c5db51392f43ff02e` |

**Digest method:** `certutil -hashfile docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md SHA256` on Windows at review time.

The digest identifies the exact reviewed file content. It does not publish or approve the amendment.

---

## 3. Authoritative working set

| Authority | Consumption |
|-----------|-------------|
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` §4.11, IMPL-GATE-5 | Proportional validation; security review gate |
| `docs/engineering/REPOSITORY_STANDARDS.md` §7, §11.6, L740 | Review evidence; targeted validation; unavailable evidence blocks progression |
| `docs/implementation/IMPLEMENTATION_PROGRAM.md` | Stage I4 program context |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` §3, IWP-006 (L362–374) | Mandatory token-storage security review before technical implementation |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` F-001 (L285) | VERIFIED trigger |
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` @ HEAD §12, §13.6, §14.8, §18 | Security-review prerequisite in published instrument |
| `docs/engineering/SECURITY_STANDARDS.md` | Consumed for future review assessment (§24.2) |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | Consumed for future review assessment (§24.2) |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | Consumed for future review assessment (§24.2) |
| `docs/design/CURSOR_HANDOFF.md` §CURRENT AUTHORIZED ENGINEERING TASK | IWP-006 active posture |

---

## 4. Review boundaries and explicit non-goals

This review assessed the **amendment instrument only**.

It did **not**:

- modify `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md`;
- publish or make §24 effective;
- execute the token-storage security review described by §24;
- select a token-storage or transport architecture;
- authorize technical implementation or establish a technical write set;
- inspect backend code, secrets, or private environment files;
- change IWP or Stage status;
- update the Work Package Register or continuity surfaces.

Creating this artifact records review completion. It does **not** synchronize amendment metadata inside the target instrument (§24 L755, §24.12 L991 remain `NOT RUN` until a later separately authorized publication-preparation act).

---

## 5. F-001 prerequisite assessment

| Check | Result | Evidence |
|-------|--------|----------|
| F-001 accepted discovery finding | PASS | `IWP_006_DISCOVERY_EVIDENCE.md` L285 — SECURITY, VERIFIED |
| Observed condition | PASS | Access token in `localStorage` key `access_token` |
| Published prerequisite for security review | PASS | Register L373–374; instrument §12 L376, §13.6 L399, §14.8 L417, §18 L576–577 |
| §24 bounded to F-001 | PASS | §24.1 L778; F-013 deferred L765; `api.ts` excluded §24.4 L846 |
| Improper package expansion | NOT OBSERVED | Nine paths match discovery §10.1 auth surfaces |

---

## 6. Diff-scope and draft-identity assessment

| Check | Result |
|-------|--------|
| Complete §24–§25 visible in local diff | PASS — single hunk `+278` lines from HEAD line 745 |
| RD-001 correction (CSRF) | PASS — §24.3 obj. 9 (L821); §24.5 Q11 (L866) |
| RD-002 correction (HttpOnly/Secure/SameSite) | PASS — §24.3 obj. 10 (L822); §24.5 Q12 (L867) |
| RD-003 correction (lifetime / refresh) | PASS — §24.3 obj. 11–12 (L823–824); §24.5 Q13–Q14 (L868–869) |
| Corrections confined to | §24.3, §24.5 |
| §24.4 nine-path list unchanged by correction | PASS — L832–842 |
| §24.6–§24.13 unchanged by correction | PASS — structure intact |
| Unrelated content in amendment block | NOT OBSERVED |
| Unique draft identity | PASS — path + HEAD + digest above |

---

## 7. §24.3 objective assessment

| Objective | Topic | Analytical / bounded |
|-----------|-------|----------------------|
| 1–3 | Persistence, trust boundaries, exposure | PASS |
| 4–7 | Token lifecycle, expiry, guards | PASS |
| 8 | Retain / correct / more evidence decision | PASS |
| 9 | CSRF bearer-header vs hypothetical cookie | PASS — comparative only |
| 10 | HttpOnly / Secure / SameSite | PASS — no mechanism selection |
| 11 | Lifetime / expiry / session duration + limitations | PASS |
| 12 | Refresh-token / rotation presence or absence | PASS |
| L826 prohibition | No remediation selection | PASS |

**RD-001 through RD-003:** fully resolved in §24.3.

---

## 8. §24.5 security-question assessment

| Mandatory topic | §24.5 coverage |
|-----------------|----------------|
| localStorage bearer-token exposure | Q1 |
| XSS / script access | Q2 |
| Bearer-header trust boundary | Q3, Q11 |
| CSRF vs hypothetical cookie transport | Q11 |
| HttpOnly / Secure / SameSite | Q12 |
| Access-token lifetime / expiry / session duration | Q4, Q13 |
| Refresh-token / rotation | Q14 |
| Logout / invalidation (client-observable) | Q3, Q4 |
| 401 / session-expiry handling | Q4, Q5 |
| Role / account-status enforcement | Q6, Q7 |
| Duplicated auth paths (within boundary) | Partial — `authApi.ts` dual-pattern in §24.4 L837; Q3, Q8 |
| Missing-evidence handling | Q9, Q10, Q13, guard L871 |
| No architecture selection | L871–873 | PASS |
| No technical write set | Explicit throughout §24.6–§24.7 | PASS |

Questions 11–14 remain comparative, read-only, and answerable within the nine-path boundary with bounded limitations where backend TTL is unavailable.

---

## 9. Inspection-boundary assessment

| Control | Location | Result |
|---------|----------|--------|
| Read-only review | §24.4 L830; §24.11 L975–980 | PASS |
| Nine exact paths | §24.4 L832–842 | PASS |
| Backend excluded | §24.4 L848; §24.8.5 | PASS |
| Secrets excluded | §24.4 L848; §24.8.9; §24.9.7 | PASS |
| Missing evidence → limitation | §24.5 L871; §24.9.3 | PASS |
| F-013 / api.ts deferred | §24.4 L846; §24.9.9 | PASS |
| Safe execution within boundaries | §24.11 controls | PASS |

---

## 10. Lifecycle and authority-separation assessment

| Separation | Evidence | Result |
|------------|----------|--------|
| This review ↔ publication decision | §4 non-goals; this artifact | PASS |
| Publication decision ↔ publication execution | §24.10 L957 | PASS |
| Publication ↔ security-review execution | §24.3 L811; §24.12 L1004 | PASS — two-step model |
| Security review ↔ implementation | §24.7 L910–916; §24.12 L997 | PASS |
| Implementation ↔ acceptance / Stage I4 | §24.10 L963–964 | PASS |
| This artifact ↔ instrument metadata | §24 L755, §24.12 L991 still NOT RUN — intentional; sync deferred | PASS |

**Note on §25 (L1021–L1023):** The instrument text still declares targeted independent review as the next action from the draft-preparation baseline. This artifact satisfies that review requirement at the repository-evidence layer. Updating §25, header metadata, or §24.12 review flags belongs to a later separately authorized publication-preparation task — not this review task.

**Note on §24.12 L1004:** Wording *"Publication alone would authorize only the bounded read-only review scope"* is deferrably ambiguous but mitigated by §24.3 requiring a separate bounded execution action and L1004 stating review execution is not authorized by the draft alone.

---

## 11. Findings

### Blocking defects

**None.**

### Non-blocking observations

| ID | Severity | Path / section | Observed condition | Authority | Publication readiness effect | Smallest correction |
|----|----------|----------------|-------------------|-----------|------------------------------|---------------------|
| IR4-001 | LOW | §24.5 | No dedicated question for intra-boundary duplicated auth clients (`authFetch` vs raw `fetch` in `authApi.ts`) | Discovery §6.1 Pattern C | None for F-001 scope | Optional dedicated question at publication integration |
| IR4-002 | LOW | §24.12 L1004 | Publication-scope wording could be read as execution authorization | §24.3 L811 | Mitigated by adjacent prohibitions | Clarify at publication integration |
| IR4-003 | LOW | Header L3–6; §22; §23 | Stale first-amendment metadata vs live register posture | Register L373 informational note | None — metadata sync deferred | Update at publication-preparation act |
| IR4-004 | LOW | §25 L1021–L1023 | Next-action text predates this review artifact | §25 draft baseline | Satisfied by this artifact; text sync deferred | Update §25 at publication-preparation act |

Prior diagnostic findings PD-001 and PD-002 from the blocked publication-decision report are **resolved** by creation of this repository-backed review evidence artifact.

---

## 12. Tests and checks

| Check | Exit | Result |
|-------|------|--------|
| `git fetch origin main` | 0 | PASS |
| HEAD / origin/main match | 0 | PASS — `59ea460…` |
| Divergence | 0 | PASS — `0 0` |
| Staging empty at review start | 0 | PASS |
| Target file SHA-256 | 0 | `70653a41d1ea92960837b8836a2004582b798c923a120e4c5db51392f43ff02e` |
| `git diff HEAD --stat` IWP-006 | 0 | `+278` lines |
| `git diff --check` on review artifact | 0 | PASS (post-creation validation) |
| Application tests | NOT RUN | Out of scope |
| Backend / secrets inspection | NOT RUN | Out of scope per §24 and review boundary |

---

## 13. Risks and unresolved observations

1. **Instrument metadata lag:** §24 L755 and §24.12 L991 still show `NOT REVIEWED` / `NOT RUN` until publication-preparation synchronizes metadata — expected and not a blocker for publication decision when this artifact and digest are used.
2. **Digest drift:** A later publication decision must re-verify SHA-256 matches before proceeding.
3. **Publication ≠ security-review execution:** Even after amendment publication, token-storage security review requires a separate bounded execution authorization per §24.3.
4. **IR4-001–IR4-004:** Deferrable; do not block publication decision.

---

## 14. Decision

**Decision label:** READY FOR PUBLICATION DECISION

**Rationale:** The current §24 amendment draft defines a complete, bounded, read-only, non-implementing security-review instrument for F-001. RD-001 through RD-003 are fully resolved. No blocking defect remains. Inspection boundaries and lifecycle separations are explicit and enforceable.

This decision does **not** publish §24, make it effective, authorize security-review execution, select an architecture, or authorize technical implementation.

---

## 15. Exact next authorized action

Perform a **separately authorized bounded publication decision** for the reviewed §24–§25 amendment in `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md`, using this artifact and verifying that the target-file SHA-256 digest still equals:

`70653a41d1ea92960837b8836a2004582b798c923a120e4c5db51392f43ff02e`

That publication decision must not itself publish, commit, push, execute the security review, or authorize technical implementation.
