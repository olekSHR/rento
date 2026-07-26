# IWP-010 Discovery Evidence

**Status:** PUBLISHED — DISCOVERY EXECUTION COMPLETE
**Authority class:** Bounded read-only discovery evidence only
**Binding authority:** ACTIVE — discovery outputs and proposed executable working set only; not implementation execution
**Program:** Implementation, Stabilization & Launch
**Stage:** I5 — Stabilization
**Work package:** IWP-010 — Observability And Audit Evidence Foundation
**Discovery authorization:** Part B — `docs/implementation/IWP_010_IMPLEMENTATION_AND_DISCOVERY_AUTHORIZATION.md`
**Package implementation authorization:** EFFECTIVE (Part A — same document)
**Implementation execution:** NOT STARTED
**Implementation execution authorization:** NOT AUTHORIZED
**Executable working set:** PROPOSED — pending separate implementation execution act
**Readiness decision:** **A — READY**
**Continuity synchronization:** NOT PERFORMED
**Push:** NOT AUTHORIZED
**Publication checkpoint:** THIS PUBLICATION COMMIT

---

## 1. Verified Repository Baseline

| Item | Value | Result |
|------|-------|--------|
| Repository | `C:/Users/Александр/Desktop/Projects/rento` | **PASS** |
| Branch | `main` | **PASS** |
| Pre-discovery HEAD | `aafaf7aca842378456f3dbf2c19298602e9831ad` | **PASS** |
| Pre-discovery parent | `ac499cda41bf3a0ea4996a611559a8d0e1b2615b` | **PASS** |
| Pre-discovery subject | `docs(iwp-010): authorize implementation boundary and discovery` | **PASS** |
| Pre-discovery commit inventory | `docs/implementation/IWP_010_IMPLEMENTATION_AND_DISCOVERY_AUTHORIZATION.md` | **PASS** |
| Staging (pre-discovery) | empty | **PASS** |
| IWP-010 lifecycle (pre-discovery) | SELECTED — ACTIVE — PACKAGE IMPLEMENTATION AUTHORIZED — BOUNDED DISCOVERY AUTHORIZED — NOT EXECUTABLE | **PASS** |
| Active implementation packages | 1 — IWP-010 ONLY | **PASS** |
| Discovery execution (pre-discovery) | NOT STARTED | **PASS** |

Unrelated working-tree items were preserved and not modified by this discovery act.

---

## 2. Authority And Discovery Boundary

### 2.1 Controlling authorities consumed

| Authority | Use |
|-----------|-----|
| `docs/implementation/IWP_010_IMPLEMENTATION_AND_DISCOVERY_AUTHORIZATION.md` | Part B discovery envelope and required outputs |
| `docs/implementation/IWP_010_SCOPE_AND_SELECTION_AUTHORIZATION.md` | S1–S5 stabilization scope |
| `docs/implementation/IWP_010_ACTIVATION_AUTHORIZATION.md` | Activation prerequisite |
| `docs/implementation/STAGE_I5_EXECUTION_AUTHORIZATION.md` | Stage boundary |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-010 register metadata |
| `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` | Signal classes, proof obligations, emission loci |
| `docs/engineering/SECURITY_STANDARDS.md` | Secret-free, classification constraints |
| `docs/engineering/BACKEND_ARCHITECTURE.md` | Service-layer emission discipline |
| `docs/engineering/API_STANDARDS.md` | Contract-visible failure honesty |

### 2.2 Discovery limits actually used

| Boundary | Applied |
|----------|---------|
| Read-only inspection | **YES** — no production, test, or config files modified |
| Backend `backend/app/` | **YES** — targeted files under core, services, routers |
| Backend `backend/tests/` | **YES** — existing IWP test files and `conftest.py` only |
| Frontend `frontend/app/` | **YES** — `error.tsx`, `lib/authFetch.ts`, `lib/apiError.ts` only for S3 assessment |
| Frontend `frontend/lib/` | **YES** — API error handling utilities |
| Alembic | **NOT INSPECTED** — no migration-related S1–S5 dependency discovered |
| CI / infrastructure-wide | **NOT INSPECTED** |
| `.env` / secrets / production runtime | **NOT ACCESSED** |
| Repository-wide audit | **NOT PERFORMED** |

### 2.3 Files inspected (read-only)

**Backend — core / security**

- `backend/app/main.py`
- `backend/app/core/config.py`
- `backend/app/core/exceptions.py`
- `backend/app/core/handlers.py`
- `backend/app/core/rate_limit.py`
- `backend/app/core/security/dependencies.py`
- `backend/app/core/security/csrf.py`
- `backend/app/core/security/jwt.py` (referenced; no S1–S5 emission surface)

**Backend — domain / admin / upload**

- `backend/app/services/property_service.py`
- `backend/app/services/realtor_application_service.py`
- `backend/app/services/admin_user_service.py`
- `backend/app/services/user_service.py`
- `backend/app/services/session_service.py`
- `backend/app/services/auth_service.py`
- `backend/app/services/account_status_service.py`
- `backend/app/repositories/property_repository.py` (transition persistence locus)
- `backend/app/routers/properties.py`
- `backend/app/routers/uploads.py`
- `backend/app/routers/admin_users.py`
- `backend/app/routers/realtor_applications.py`
- `backend/app/routers/users.py`
- `backend/app/routers/auth.py`

**Backend — tests / config**

- `backend/tests/conftest.py`
- `backend/tests/test_iwp_003_domain_authorization.py` (partial — scope confirmation)
- `backend/tests/test_iwp_004_api_contracts.py` (partial — contract baseline)
- `backend/tests/test_iwp_008_upload_validation.py` (partial — upload baseline)
- `backend/pytest.ini`

**Frontend — S3 presentation boundary only**

- `frontend/app/error.tsx`
- `frontend/lib/authFetch.ts`
- `frontend/lib/apiError.ts`

**Accepted dependency evidence (non-duplication minimum)**

- `docs/implementation/IWP_003_FINAL_ACCEPTANCE_REPORT.md` (accepted write set)
- `docs/implementation/IWP_004_FINAL_ACCEPTANCE_REPORT.md` (accepted write set)
- `docs/implementation/IWP_008_FINAL_ACCEPTANCE_REPORT.md` (accepted slice scope)
- `docs/implementation/IWP_009_FINAL_ACCEPTANCE_REPORT.md` (test foundation scope)

---

## 3. S1–S5 Traceability Matrix

| Item | Execution paths located | Current signal behavior | Status | Smallest correction |
|------|-------------------------|-------------------------|--------|---------------------|
| **S1** Domain transition signal legibility | `property_service.create_property` (→ `pending` for realtor); `property_service.verify_property` / `archive_property` / `activate_property`; `property_repository.update_property_status`; `realtor_application_service.review_application` (pending→approved/rejected + role change) | Domain transitions commit correctly (IWP-003) but emit **no classified transition signals** | **GAP** | Add secret-free transition signals at service transition loci after successful commit |
| **S2** Authentication and authorization decision signal legibility | `session_service.get_current_user_from_session`; `dependencies.require_admin` / `require_admin_or_realtor`; `account_status_service.assert_can_authenticate`; `auth_service.login_user`; `csrf.validate_csrf_request` | Partial ad-hoc logging: session create/revoke/expire, login success, CSRF failure. **Auth/authz denials and invalid sessions are largely silent** | **PARTIAL → GAP** | Classified decision signals at enforcement loci; reuse CSRF existing warning as no-change baseline |
| **S3** Failure visibility | `core/handlers.py` exception handlers; `rate_limit.rate_limit_exception_handler`; API `{success:false,message}` contract (IWP-004); `frontend/lib/apiError.ts` + `authFetch.ts`; `frontend/app/error.tsx` | Contract-visible failures **exist** (IWP-004). Handled backend failures and rate limits **do not emit failure signals** to logs. Unhandled route errors visible only via client `console.error` | **PARTIAL → GAP** | Backend failure signals in handlers and rate-limit handler; frontend excluded — backend contract + log emission satisfies architecture proof obligation |
| **S4** Upload-action proof obligations | `routers/uploads.py` `upload_image` (validation, size, save, collision paths) | Upload hardening present (IWP-008). **No upload success/denial proof signals** | **GAP** | Secret-free upload proof signals at upload decision loci (success, validation denial, save failure) |
| **S5** Privileged/admin-action proof obligations | `property_service.verify/archive/activate`; `properties.delete_property` (admin); `admin_user_service.update_account_status`; `realtor_application_service.review_application`; `user_service.update_user_role` | Privileged actions enforce rules (IWP-003) but **do not emit actor-scoped proof signals** | **GAP** | Privileged-action signals with bounded `actor_user_id`, target entity id, and outcome at service/router loci |

---

## 4. Existing Reusable Observability Mechanisms

| Mechanism | Location | Reusable for IWP-010 |
|-----------|----------|----------------------|
| Python stdlib `logging` | Scattered `logging.getLogger(__name__)` | **YES** — base transport; no central config required for minimal proof |
| Session lifecycle logs | `backend/app/services/session_service.py` | **YES** — pattern for bounded id-only info logs |
| Auth success logs | `backend/app/routers/auth.py` | **YES** — pattern only; do not duplicate success semantics |
| CSRF failure warning | `backend/app/core/security/csrf.py` | **YES** — partial S2 evidence; optional later alignment to shared helper |
| Rate-limit startup info | `backend/app/core/rate_limit.py` | **YES** — module logger exists; extend to 429 handler |
| Structured API error envelope | `backend/app/core/handlers.py` + IWP-004 contract | **YES** — S3 contract layer; add parallel failure signal emission |
| Frontend API error parsing | `frontend/lib/apiError.ts`, `authFetch.ts` | **NO CHANGE** — presentation boundary; not authoritative proof |
| Global route error UI | `frontend/app/error.tsx` | **NO CHANGE** — client presentation only |
| Dedicated observability module | — | **MISSING** — smallest new artifact: classified signal helper module |
| Audit persistence / event bus | — | **OUT OF SCOPE** — no durable storage or vendor selection authorized |

**Reuse strategy:** Introduce one small classified signal helper module; extend existing log call sites and exception handlers; prefer service-layer emission per Backend Architecture and OBS-INV-16.

---

## 5. Exact Affected Production-File Candidates

| # | Path | S1–S5 | Required change summary |
|---|------|-------|-------------------------|
| P1 | `backend/app/core/observability/__init__.py` | ALL | **CREATE** — package surface for signal helpers |
| P2 | `backend/app/core/observability/signals.py` | ALL | **CREATE** — classified, secret-free signal emission helpers (`transition`, `decision`, `failure`, `upload`, `privileged`) |
| P3 | `backend/app/core/handlers.py` | S2, S3 | Emit failure/decision signals when mapping domain exceptions to HTTP responses |
| P4 | `backend/app/core/rate_limit.py` | S3 | Emit failure signal on rate-limit denial (429 path) |
| P5 | `backend/app/core/security/dependencies.py` | S2 | Emit authorization decision signals on role enforcement denial |
| P6 | `backend/app/services/session_service.py` | S2 | Emit decision signal on invalid/expired session rejection |
| P7 | `backend/app/services/auth_service.py` | S2 | Emit decision signal on login failure (no credential or email content) |
| P8 | `backend/app/services/account_status_service.py` | S2 | Emit decision signal on restricted-account auth denial |
| P9 | `backend/app/services/property_service.py` | S1, S5 | Emit transition signals on status changes; privileged signals on admin moderation transitions |
| P10 | `backend/app/services/realtor_application_service.py` | S1, S5 | Emit transition + privileged signals on application review |
| P11 | `backend/app/services/admin_user_service.py` | S5 | Emit privileged signal on account-status change |
| P12 | `backend/app/services/user_service.py` | S5 | Emit privileged signal on admin role change |
| P13 | `backend/app/routers/uploads.py` | S4 | Emit upload proof signals (success and bounded denial classes) |
| P14 | `backend/app/routers/properties.py` | S5 | Pass `actor_user_id` into admin moderation/delete service calls for traceability |
| P15 | `backend/app/routers/users.py` | S5 | Pass admin actor into role-update service call for traceability |

**Production file count:** 15 (2 create, 13 modify)

---

## 6. Exact Affected Test-File Candidates

| # | Path | Covers | Required change summary |
|---|------|--------|-------------------------|
| T1 | `backend/tests/test_iwp_010_observability_signals.py` | S1–S5 | **CREATE** — `caplog` tests asserting classified signal emission at representative loci; secret-free field checks |

**Regression scope (not in writable working set — run only for validation):**

- `backend/tests/test_iwp_003_domain_authorization.py`
- `backend/tests/test_iwp_004_api_contracts.py`
- `backend/tests/test_iwp_008_upload_validation.py`

---

## 7. Per-File Reason For Inclusion

| File | Reason | Why necessary | Why no smaller alternative |
|------|--------|---------------|----------------------------|
| P1–P2 | Single reusable classification surface | Avoids duplicating signal format across 10+ call sites; satisfies OBS-SIG-2 | Inline log strings at every locus would duplicate format, risk secret leakage, and violate maintainability |
| P3 | Exception handler is failure visibility locus for all mapped domain errors | Handlers currently return JSON only with zero log emission | Logging only in services misses handler-normalized failures |
| P4 | Rate-limit denial is material failure path | 429 handler returns JSON only | Cannot reuse property/auth services |
| P5–P8 | Auth/authz enforcement loci | Denials occur before handlers in some paths; need decision signals at enforcement point | Handler-only logging loses denial class context |
| P9–P12 | Domain and privileged transition loci per IWP-003 | Transitions commit in services; OBS-INV-16 requires emission at decision/transition locus | Repository layer must not own proof semantics; routers alone miss transition truth |
| P13 | Upload logic resides in router (IWP-008) | Upload proof obligation attaches to upload action path | Moving upload logic to service would expand scope beyond observability |
| P14–P15 | Actor context available in routers, not always in services | S5 proof chain requires bounded actor id | Service-only changes cannot reconstruct admin actor without signature extension |

---

## 8. Files Inspected But Excluded From Executable Working Set

| Path | Reason for exclusion |
|------|---------------------|
| `backend/app/main.py` | No S1–S5 change required; default logging sufficient for proof emission; static mount unchanged |
| `backend/app/core/config.py` | Settings only; no signal behavior |
| `backend/app/core/exceptions.py` | Exception types stable; handlers/services emit signals |
| `backend/app/core/security/csrf.py` | **No-change candidate** — existing CSRF failure warning partially satisfies S2 |
| `backend/app/core/security/jwt.py` | Not on session-auth path for material S1–S5 flows |
| `backend/app/repositories/*.py` | Persistence loci; IWP-003 accepted; observability emits at service layer after commit |
| `backend/app/models/*.py` | No domain truth change authorized |
| `backend/app/schemas/*.py` | IWP-004 accepted contracts; no observability schema required |
| `backend/app/routers/auth.py` | Login success already logged; login failure covered via P7; logout/session covered via session_service |
| `backend/app/routers/admin_users.py` | Thin router; service P11 receives `admin_user` already |
| `backend/app/routers/realtor_applications.py` | Thin router; service P10 receives `admin_user` already |
| `backend/app/routers/favorites.py`, `realtor_profiles.py`, `ai.py`, `admin_stats.py` | Not material to S1–S5 proof obligations |
| `backend/app/services/email_service.py`, `password_reset_service.py` | Out of S1–S5 authorized stabilization scope |
| `backend/alembic/**` | No schema change required |
| `frontend/app/**` | Backend contract + failure signals satisfy S3 architecture proof; client signals are presentation-only per Observability Architecture |
| `frontend/lib/**` (except inspected) | No change required for bounded backend proof foundation |
| `backend/tests/test_iwp_003_*.py`, `test_iwp_004_*.py`, `test_iwp_008_*.py` | Regression only — not modified unless implementation breaks them |
| `backend/tests/test_backend_smoke.py`, `test_iwp006_*.py` | Outside IWP-010 S1–S5 envelope |

---

## 9. Concrete Gaps Against S1–S5

| Gap ID | Scope | Description | Severity |
|--------|-------|-------------|----------|
| G1 | S1 | Property status transitions (`pending`/`available`/`archived`) commit without transition signals | HIGH |
| G2 | S1 | Realtor application review transitions commit without transition signals | HIGH |
| G3 | S2 | Invalid session, role enforcement, and restricted-account denials largely silent in logs | HIGH |
| G4 | S2 | Login failure emits no classified decision signal (only generic exception path) | MEDIUM |
| G5 | S3 | Registered exception handlers emit HTTP JSON but no failure signals | HIGH |
| G6 | S3 | Rate-limit 429 responses emit no failure signal | MEDIUM |
| G7 | S4 | Upload success and denial paths emit no upload proof signals | HIGH |
| G8 | S5 | Admin moderation, account-status, role, and application-review actions lack actor-scoped privileged proof | HIGH |
| G9 | ALL | No shared signal classification helper — inconsistent ad-hoc logging | MEDIUM |

---

## 10. No-Change Findings (Already Satisfied Or Partial)

| Item | Evidence | Disposition |
|------|----------|-------------|
| API failure contract visibility | IWP-004 — `handlers.py` returns `{success:false,message}` for 400/401/403/404 | **S3 contract layer satisfied** — additive log emission only |
| CSRF validation failure visibility | `csrf.py` line 58 — `logger.warning("CSRF validation failed for path=%s", ...)` | **S2 partial no-change** — optional alignment to shared helper later |
| Session lifecycle visibility | `session_service.py` — create, expire, revoke info logs | **Partial S2** — extend for invalid-session denial only |
| Upload validation rules | IWP-008 accepted — magic-byte, size, content-type enforcement in `uploads.py` | **No rework** — proof signals only |
| Domain transition rules | IWP-003 accepted — valid transitions enforced in services | **No rework** — proof signals only |
| Frontend user-visible error messages | `apiError.ts` extracts safe message string | **No frontend change required** for architecture proof foundation |

---

## 11. Non-Duplication Proof Against Accepted Packages

| Package | Accepted scope (evidence) | IWP-010 proposed changes | Duplication assessment |
|---------|----------------------------|--------------------------|------------------------|
| **IWP-003** | Domain/authorization hardening — ownership, status transitions, moderation rules, realtor review validation (`IWP_003_FINAL_ACCEPTANCE_REPORT.md` §3) | Add **read-only proof signals** after existing transitions; optional `actor_user_id` pass-through for traceability | **PASS — additive only** — does not alter transition rules, ownership checks, or visibility semantics |
| **IWP-004** | API contract stabilization — response models, error envelope, router contracts (`IWP_004_FINAL_ACCEPTANCE_REPORT.md` §3) | Parallel log emission in handlers; **does not change** response shapes or status codes | **PASS — additive only** |
| **IWP-008** | Upload validation/denial hardening — `uploads.py` (`IWP_008_FINAL_ACCEPTANCE_REPORT.md`) | Upload proof **signals only**; no validation rule changes | **PASS — additive only** |
| **IWP-009** | Test/quality gate foundation — pytest harness, placeholder env (`IWP_009_FINAL_ACCEPTANCE_REPORT.md` §3) | New focused test file using existing `conftest.py` pattern | **PASS — extends foundation** without modifying IWP-009 accepted artifacts |

**Overlap files note:** `property_service.py`, `handlers.py`, `uploads.py`, and `properties.py` appear in prior accepted write sets. IWP-010 changes are strictly observability emissions and actor pass-through parameters — not domain or contract rework.

---

## 12. Security And Privacy Constraints

Implementation must preserve:

| Constraint | Application |
|------------|-------------|
| No secrets in signals | Never log session tokens, passwords, reset tokens, CSRF tokens, API keys, cookie values |
| No raw personal data | Do not log email, phone, names, message bodies, or upload binary content |
| Bounded identifiers only | Permitted: numeric `user_id`, `property_id`, `application_id`, `session_id`, HTTP status, signal class, outcome class, path (no query strings with sensitive data) |
| No uncontrolled payload logging | Do not log request/response bodies or exception `detail` when it may echo user input |
| Deny outcomes without ineligible state leakage | Authorization logs use outcome class + role requirement — not protected resource internals |
| Observability ≠ domain truth | Signals are evidence only; no state mutation via logging |
| Hashing already used for rate-limit keys | Reuse `sha256` digest pattern from `rate_limit.py` if session-derived keys needed |

---

## 13. Required Implementation Changes (Function / Module Level)

### 13.1 New module — `core/observability/signals.py`

Provide minimal helpers (names illustrative — implementation must match conventions):

- `emit_transition_signal(entity_type, entity_id, from_status, to_status, *, actor_user_id=None)`
- `emit_decision_signal(decision_class, outcome, *, actor_user_id=None, reason_code=None)`
- `emit_failure_signal(failure_class, *, path=None, status_code=None)`
- `emit_upload_signal(outcome, *, actor_user_id=None, reason_code=None)`
- `emit_privileged_signal(action, *, actor_user_id, target_type, target_id, outcome)`

All helpers: single logger, fixed prefix or structured key pattern, INFO/WARNING levels per class, no user-supplied free text.

### 13.2 Service-layer transitions (S1, S5)

- `property_service.create_property` — log transition to `pending` (realtor) or creation outcome
- `property_service.verify_property` / `archive_property` / `activate_property` — log transition with `actor_user_id`
- `property_service.delete_property` — accept optional `actor_user_id`; log privileged delete
- `realtor_application_service.review_application` — log transition + privileged review outcome
- `admin_user_service.update_account_status` — log privileged account-status change
- `user_service.update_user_role` — accept `actor_user_id`; log privileged role change

### 13.3 Enforcement-layer decisions (S2)

- `dependencies.require_admin` / `require_admin_or_realtor` — log deny before `ForbiddenException`
- `session_service.get_current_user_from_session` — log invalid session denial
- `auth_service.login_user` — log failed login decision (generic outcome, no email)
- `account_status_service` — log restricted-account denial

### 13.4 Failure visibility (S3)

- `handlers.py` — log failure signal per handler with status code and exception class
- `rate_limit.py` — log failure signal on 429

### 13.5 Upload proof (S4)

- `uploads.py` — log success with filename hash or uuid only; log denials by reason code enum

### 13.6 Router actor pass-through (S5 traceability)

- `properties.py` — pass `current_user.id` to verify/archive/activate/delete service calls
- `users.py` — pass `current_user.id` to `update_user_role`

---

## 14. Exact Proposed Executable Working Set

| # | Path | Action | S1–S5 | Associated test |
|---|------|--------|-------|-----------------|
| 1 | `backend/app/core/observability/__init__.py` | CREATE | ALL | T1 |
| 2 | `backend/app/core/observability/signals.py` | CREATE | ALL | T1 |
| 3 | `backend/app/core/handlers.py` | MODIFY | S2, S3 | T1 |
| 4 | `backend/app/core/rate_limit.py` | MODIFY | S3 | T1 |
| 5 | `backend/app/core/security/dependencies.py` | MODIFY | S2 | T1 |
| 6 | `backend/app/services/session_service.py` | MODIFY | S2 | T1 |
| 7 | `backend/app/services/auth_service.py` | MODIFY | S2 | T1 |
| 8 | `backend/app/services/account_status_service.py` | MODIFY | S2 | T1 |
| 9 | `backend/app/services/property_service.py` | MODIFY | S1, S5 | T1 + regression `test_iwp_003_*` |
| 10 | `backend/app/services/realtor_application_service.py` | MODIFY | S1, S5 | T1 + regression `test_iwp_003_*` |
| 11 | `backend/app/services/admin_user_service.py` | MODIFY | S5 | T1 |
| 12 | `backend/app/services/user_service.py` | MODIFY | S5 | T1 |
| 13 | `backend/app/routers/uploads.py` | MODIFY | S4 | T1 + regression `test_iwp_008_*` |
| 14 | `backend/app/routers/properties.py` | MODIFY | S5 | T1 + regression `test_iwp_003_*`, `test_iwp_004_*` |
| 15 | `backend/app/routers/users.py` | MODIFY | S5 | T1 |
| 16 | `backend/tests/test_iwp_010_observability_signals.py` | CREATE | S1–S5 | — |

**Total writable files:** 16 (3 create, 13 modify)

---

## 15. Exact Validation Commands

Run from repository root:

```bash
cd backend && pytest tests/test_iwp_010_observability_signals.py -v
```

Scoped regression (recommended after implementation; not full suite):

```bash
cd backend && pytest tests/test_iwp_003_domain_authorization.py tests/test_iwp_004_api_contracts.py tests/test_iwp_008_upload_validation.py -v
```

**Not authorized in discovery or implied implementation act:**

- Full repository pytest from root cwd
- Frontend typecheck/lint (no frontend files in working set)
- Application runtime / Docker build
- Migrations

---

## 16. Stop Conditions

Implementation must stop and escalate if:

1. Scope expands beyond the 16-file working set without new authority
2. Signal emission requires secrets, credentials, tokens, or personal data fields
3. Domain transition rules, auth rules, upload validation, or API contracts would change
4. Durable observability storage, vendor selection, or analytics product scope emerges
5. Repository or model schema changes become necessary
6. Regression tests outside scoped commands fail due to domain behavior change (not additive logging)
7. Frontend changes become mandatory — indicates S3 authority gap requiring separate act

---

## 17. Implementation Readiness Determination

**Decision: A — READY**

A file-exact bounded executable working set is established (§14). All S1–S5 gaps map to specific files and function-level changes. No blocking authority gap remains. No separate diagnostic act required before implementation execution authorization.

**Not applicable:** B (partially ready), C (no implementation required), D (blocked).

---

## 18. Exact Next Gate

The exact next authorized action is **one separate IWP-010 implementation execution act** that:

1. consumes Part A package implementation authorization (effective);
2. implements **only** the 16-file working set in §14;
3. produces implementation evidence per Part A §A.6;
4. runs validation commands in §15;
5. does **not** accept, close, or synchronize continuity unless separately authorized.

Implementation execution remains **NOT AUTHORIZED** until that separate act is published.

---

## 19. Discovery Execution Resulting Lifecycle State

| Field | Value |
|-------|-------|
| Bounded discovery execution | **COMPLETE** |
| Discovery evidence | **PUBLISHED** (this document) |
| Executable working set | **PROPOSED** — 16 files (§14) |
| Package implementation authorization | **EFFECTIVE** (unchanged) |
| Implementation execution | **NOT STARTED** |
| Implementation execution authorization | **NOT AUTHORIZED** |
| IWP-010 lifecycle | **SELECTED — ACTIVE — PACKAGE IMPLEMENTATION AUTHORIZED — DISCOVERY COMPLETE — NOT EXECUTABLE** |
| Active implementation packages | **1 — IWP-010 ONLY** |
| Stage I6 | **NOT AUTHORIZED** |
| Push | **NOT AUTHORIZED** |

---

## 20. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IWP_010_DISCOVERY_EVIDENCE.md` |
| Status | PUBLISHED — DISCOVERY EXECUTION COMPLETE |
| Readiness decision | **A — READY** |
| Implementation execution | **NOT AUTHORIZED** |
| Publication checkpoint | THIS PUBLICATION COMMIT |
