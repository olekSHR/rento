# IWP-010 Implementation Execution Authorization

**Status:** PUBLISHED — EFFECTIVE
**Authority class:** Package-level implementation execution authorization only
**Binding authority:** ACTIVE — authorized working set and validation route only; not acceptance or closure
**Program:** Implementation, Stabilization & Launch
**Stage:** I5 — Stabilization
**Work package:** IWP-010 — Observability And Audit Evidence Foundation
**Package implementation authorization:** EFFECTIVE (Part A — `IWP_010_IMPLEMENTATION_AND_DISCOVERY_AUTHORIZATION.md`)
**Bounded discovery authorization:** CONSUMED
**Discovery execution:** COMPLETE
**Discovery readiness:** A — READY
**Discovery evidence:** `docs/implementation/IWP_010_DISCOVERY_EVIDENCE.md`
**Implementation execution authorization:** EFFECTIVE
**IWP-010 lifecycle:** SELECTED — ACTIVE — IMPLEMENTATION EXECUTION AUTHORIZED — NOT ACCEPTED
**Active implementation packages:** 1 — IWP-010 ONLY
**Stage I6:** NOT AUTHORIZED
**Continuity synchronization:** NOT PERFORMED
**Push:** NOT AUTHORIZED
**Publication checkpoint:** THIS PUBLICATION COMMIT

---

## 1. Starting Repository Baseline

| Item | Value |
|------|-------|
| Repository | `C:/Users/Александр/Desktop/Projects/rento` |
| Branch | `main` |
| Pre-publication HEAD | `7eaf1456a33eb73aeea94d2884b52d48537b1e1e` |
| Pre-publication parent | `aafaf7aca842378456f3dbf2c19298602e9831ad` |
| Pre-publication subject | `docs(iwp-010): record bounded discovery evidence` |
| Pre-publication commit inventory | `docs/implementation/IWP_010_DISCOVERY_EVIDENCE.md` |
| Discovery readiness | **A — READY** |
| Executable working set | **ESTABLISHED** — discovery evidence §14 |
| Implementation execution (pre-publication) | **NOT STARTED** |

---

## 2. Effective Authorities

| Authority | Use |
|-----------|-----|
| `docs/implementation/IWP_010_DISCOVERY_EVIDENCE.md` | Controlling executable working set §14; validation §15; function-level changes §13 |
| `docs/implementation/IWP_010_IMPLEMENTATION_AND_DISCOVERY_AUTHORIZATION.md` | Part A package scope; Part B consumed |
| `docs/implementation/IWP_010_SCOPE_AND_SELECTION_AUTHORIZATION.md` | S1–S5 stabilization scope |
| `docs/implementation/IWP_010_ACTIVATION_AUTHORIZATION.md` | Activation prerequisite |
| `docs/implementation/STAGE_I5_EXECUTION_AUTHORIZATION.md` | Stage lifecycle |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-010 register metadata |
| `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` | Signal classes and proof obligations |
| `docs/engineering/SECURITY_STANDARDS.md` | Secret-free constraints |
| `docs/engineering/BACKEND_ARCHITECTURE.md` | Emission loci |
| `docs/engineering/API_STANDARDS.md` | Contract preservation |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Implementation discipline |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Evidence model |

---

## 3. Discovery Baseline Verification

| # | Precondition | Result |
|---|--------------|--------|
| E1 | Discovery evidence published @ `7eaf145` | **PASS** |
| E2 | Readiness decision A — READY | **PASS** |
| E3 | Executable working set §14 — 16 files | **PASS** |
| E4 | Package implementation authorization effective | **PASS** |
| E5 | IWP-010 SELECTED — ACTIVE | **PASS** |
| E6 | Active implementation packages = 1 — IWP-010 ONLY | **PASS** |
| E7 | S1–S5 scope unchanged | **PASS** |
| E8 | No conflicting lifecycle state | **PASS** |

All mandatory prerequisites **PASS**.

---

## 4. Authorized Writable File Set

Reproduced exactly from `IWP_010_DISCOVERY_EVIDENCE.md` §14:

| # | Path | Action | S1–S5 |
|---|------|--------|-------|
| 1 | `backend/app/core/observability/__init__.py` | CREATE | ALL |
| 2 | `backend/app/core/observability/signals.py` | CREATE | ALL |
| 3 | `backend/app/core/handlers.py` | MODIFY | S2, S3 |
| 4 | `backend/app/core/rate_limit.py` | MODIFY | S3 |
| 5 | `backend/app/core/security/dependencies.py` | MODIFY | S2 |
| 6 | `backend/app/services/session_service.py` | MODIFY | S2 |
| 7 | `backend/app/services/auth_service.py` | MODIFY | S2 |
| 8 | `backend/app/services/account_status_service.py` | MODIFY | S2 |
| 9 | `backend/app/services/property_service.py` | MODIFY | S1, S5 |
| 10 | `backend/app/services/realtor_application_service.py` | MODIFY | S1, S5 |
| 11 | `backend/app/services/admin_user_service.py` | MODIFY | S5 |
| 12 | `backend/app/services/user_service.py` | MODIFY | S5 |
| 13 | `backend/app/routers/uploads.py` | MODIFY | S4 |
| 14 | `backend/app/routers/properties.py` | MODIFY | S5 |
| 15 | `backend/app/routers/users.py` | MODIFY | S5 |
| 16 | `backend/tests/test_iwp_010_observability_signals.py` | CREATE | S1–S5 |

**Total authorized writable files:** 16 (3 create, 13 modify)

No other production, test, config, migration, dependency, frontend, or documentation file is authorized for modification in the implementation execution act except:

- `docs/implementation/IWP_010_IMPLEMENTATION_EVIDENCE.md` — **CREATE** in a separate implementation commit after execution

---

## 5. Authorized Function-Level Changes

Per discovery evidence §13 — implementation may perform **only** these changes:

### 5.1 New observability module

- Classified signal helpers: `emit_transition_signal`, `emit_decision_signal`, `emit_failure_signal`, `emit_upload_signal`, `emit_privileged_signal`
- Python stdlib logging only; secret-free bounded fields

### 5.2 Service-layer (S1, S5)

- `property_service`: transition signals; optional `actor_user_id` on admin transitions and delete
- `realtor_application_service`: transition + privileged signals on review
- `admin_user_service`: privileged signal on account-status change
- `user_service`: accept `actor_user_id`; privileged signal on role change

### 5.3 Enforcement-layer (S2)

- `dependencies`: authorization decision signals on denial
- `session_service`: invalid-session decision signal
- `auth_service`: login-failure decision signal (no email/credential content)
- `account_status_service`: restricted-account decision signal

### 5.4 Failure visibility (S3)

- `handlers.py`: failure signals per mapped exception handler
- `rate_limit.py`: failure signal on 429

### 5.5 Upload proof (S4)

- `uploads.py`: bounded upload success/denial signals

### 5.6 Router actor pass-through (S5)

- `properties.py`: pass `current_user.id` to verify/archive/activate/delete service calls
- `users.py`: pass `current_user.id` to `update_user_role`

---

## 6. Authorized Tests And Validation

### 6.1 Authorized test file

| Path | Action |
|------|--------|
| `backend/tests/test_iwp_010_observability_signals.py` | CREATE |

Tests must validate: signal classification, bounded fields, forbidden sensitive fields absent, transition/decision/failure/upload/privileged emission, unchanged API/domain outcomes. Use existing `caplog` — no new test dependencies.

### 6.2 Authorized validation commands

```bash
cd backend && pytest tests/test_iwp_010_observability_signals.py -v
cd backend && pytest tests/test_iwp_003_domain_authorization.py tests/test_iwp_004_api_contracts.py tests/test_iwp_008_upload_validation.py -v
```

IWP-009 validation: **NOT AUTHORIZED** unless directly required by scoped test failure — discovery evidence does not mandate separate IWP-009 command.

---

## 7. Preservation Requirements

Implementation must preserve without semantic change:

- Accepted IWP-003 domain transitions, ownership, moderation, and authorization rules
- Accepted IWP-004 API error envelope and response contracts
- Accepted IWP-008 upload validation and denial behavior
- Accepted IWP-009 test harness patterns

Changes are **additive observability signals only**.

---

## 8. Security And Privacy Constraints

| Constraint | Requirement |
|------------|-------------|
| No secrets | No passwords, hashes, tokens, cookies, CSRF values, API keys in signals |
| No raw personal data | No email, phone, names, message bodies |
| No payload logging | No request/response bodies or uncontrolled exception detail |
| Bounded identifiers | Numeric ids, signal class, outcome class, path, status code only |
| Observability ≠ truth | Signals do not mutate domain state |

---

## 9. Explicit Prohibitions

This authorization does **not** permit:

- working-set expansion beyond §4 without new authority;
- migrations, dependency changes, infrastructure changes;
- frontend modifications;
- durable observability storage or external logging vendors;
- public API contract changes;
- domain transition, auth permission, or upload rule changes;
- acceptance, closure, Stage I6, push, release, or deployment;
- register/program/roadmap/handoff synchronization.

---

## 10. Stop Conditions

Implementation execution must stop when:

1. any file outside §4 requires modification;
2. signal emission requires secrets or personal data;
3. scoped regression fails due to domain semantic change;
4. correction requires working-set expansion;
5. durable storage or vendor selection becomes necessary.

---

## 11. Resulting Lifecycle State

Upon effectiveness of this document:

| Field | Value |
|-------|-------|
| Implementation execution authorization | **EFFECTIVE** |
| IWP-010 | **SELECTED — ACTIVE — IMPLEMENTATION EXECUTION AUTHORIZED — NOT ACCEPTED** |
| Implementation execution | **AUTHORIZED** — one bounded act |
| Acceptance | **NOT GRANTED** |
| Closure | **NOT GRANTED** |
| Stage I6 | **NOT AUTHORIZED** |

Package acceptance and closure remain **separate** governance acts.

---

## 12. Exact Next Action

**One bounded IWP-010 implementation execution act** that:

1. modifies only §4 files;
2. runs §6.2 validation;
3. produces `docs/implementation/IWP_010_IMPLEMENTATION_EVIDENCE.md`;
4. commits implementation in a **separate** commit from this authorization.

Must **not** include this authorization file in the implementation commit.

---

## 13. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IWP_010_IMPLEMENTATION_EXECUTION_AUTHORIZATION.md` |
| Status | PUBLISHED — EFFECTIVE |
| Implementation execution authorization | **EFFECTIVE** |
| IWP-010 | **SELECTED — ACTIVE — IMPLEMENTATION EXECUTION AUTHORIZED — NOT ACCEPTED** |
| Publication checkpoint | THIS PUBLICATION COMMIT |
