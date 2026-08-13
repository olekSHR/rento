# OPS-001 — Production acceptance test identity

| Field | Value |
|-------|-------|
| ID | OPS-001 |
| TITLE | Production acceptance test identity |
| CLASSIFICATION | Operations / engineering capability |
| STATUS | CLOSED |
| RISK | MEDIUM |

> STATUS: CLOSED means the dedicated production acceptance identity is provisioned, verified, documented, and consumed successfully by TASK-004 Production Acceptance.

**Related product task:** TASK-004 — Favorite creation rejects nonexistent property (blocked on authenticated Production Acceptance).

---

## Problem

Rento has no governed authenticated identity for production acceptance.

This blocks TASK-004 Production Acceptance even though:

- implementation is deployed;
- backend is healthy;
- automated regression tests pass.

Current operators correctly refuse to:

- use real customer/realtor/admin credentials;
- reset an existing user's password;
- forge sessions;
- insert a test user directly into PostgreSQL;
- create ad-hoc production accounts during individual task acceptance.

The missing capability is a controlled, reusable, least-privilege production acceptance identity.

---

## Goal

Establish **one persistent dedicated production acceptance identity** using the existing normal application authentication lifecycle.

| Characteristic | Requirement |
|----------------|-------------|
| role | `user` |
| account status | `active` |
| purpose | production acceptance only |
| credential storage | outside Git |
| authentication | normal login / session / CSRF flow |
| session end | normal logout / server-side revocation |

The account must **not** be a real business or customer account.

---

## V1 Architecture Decision

| Field | Decision |
|-------|----------|
| **ACCOUNT TYPE** | persistent dedicated acceptance user |
| **ROLE** | `user` |
| **CREATION PATH** | existing `POST /auth/register` (via production API prefix `/api/auth/register`) |
| **CREDENTIAL STORAGE** | operator-controlled secure store outside Git (password manager or existing secure operator secret mechanism) |
| **SESSION POLICY** | `GET /api/auth/csrf` → `POST /api/auth/login` → acceptance operations → `POST /api/auth/logout` |
| **ACCOUNT LIFETIME** | persistent |
| **DATA POLICY** | do not create production test data unless a specific acceptance explicitly requires and authorizes it |

**Do NOT use for creation:**

- raw SQL
- test fixtures
- forged session
- password reset of a real user

**Architecture alignment (VERIFIED from current code):**

- Session cookie: `rento_session`
- CSRF cookie/header: `rento_csrf` / `X-CSRF-Token`
- Session storage: PostgreSQL `auth_sessions`
- Registration creates `role=user`, `account_status=active` by default

No application-code change is required for OPS-001 v1.

---

## In Scope

1. Select a reserved non-personal acceptance email under operator control.
2. Generate a strong unique password.
3. Store credentials securely outside Git.
4. Perform one authorized registration through the normal API.
5. Verify created account: `role=user`, `account_status=active`.
6. Login using normal CSRF/session flow.
7. Perform one harmless authenticated smoke: `GET /api/favorites/`.
8. Logout normally.
9. Confirm session revocation where practical.
10. Record sanitized identity metadata necessary for future operators.
11. After implementation, add a concise **Authenticated Production Acceptance** section to `docs/engineering/protocol/PRODUCTION_ACCEPTANCE.md`.

---

## Out of Scope

| Item | Status |
|------|--------|
| Application auth redesign | OUT OF SCOPE |
| JWT changes | OUT OF SCOPE |
| Admin acceptance account | OUT OF SCOPE |
| Realtor acceptance account | OUT OF SCOPE |
| Multiple acceptance identities | OUT OF SCOPE |
| Automated production E2E suite | OUT OF SCOPE |
| GitHub Actions production acceptance | OUT OF SCOPE |
| CI/CD integration | OUT OF SCOPE |
| New secret-management platform | OUT OF SCOPE |
| Production test-data framework | OUT OF SCOPE |
| Provisioning CLI | OUT OF SCOPE |
| Provisioning shell script (v1) | OUT OF SCOPE |
| Automatic user suspension/reactivation | OUT OF SCOPE |
| Automatic password rotation | OUT OF SCOPE |
| Raw database provisioning | OUT OF SCOPE |
| TASK-004 implementation changes | OUT OF SCOPE |
| New standalone runbook file (v1) | OUT OF SCOPE |
| New protocol template | OUT OF SCOPE |
| New docs directory | OUT OF SCOPE |
| `.env` acceptance variables (v1) | OUT OF SCOPE |

Future realtor/admin identities require separate justification.

---

## Documentation-Sprawl Decision

| Question | Decision | Rationale |
|----------|----------|-----------|
| OPS record as bounded engineering work? | **YES** | This file |
| New protocol required now? | **NO** | Extend existing `PRODUCTION_ACCEPTANCE.md` after implementation |
| New docs directory required now? | **NO** | `docs/engineering/tasks/` already exists |
| Provisioning script required now? | **NO** | Manual v1 is sufficient |
| CI/CD integration required now? | **NO** | No repeated automation demand yet |

**NEW_STANDALONE_RUNBOOK_REQUIRED:** **NO**

Preferred durable documentation location after implementation:

- extend `docs/engineering/protocol/PRODUCTION_ACCEPTANCE.md` with section **Authenticated Production Acceptance**

That section should contain:

- approved acceptance identity requirement
- credentials outside Git
- CSRF / login / logout flow
- least-privilege requirement
- no real-user credential usage
- no unnecessary production mutation

---

## Secret Handling Contract

**Repository may contain:**

- acceptance account purpose
- sanitized account identifier if policy permits (email convention or user id after provisioning)
- credential-location description (where operators store the password)
- procedure steps

**Repository must NOT contain:**

- password
- password hash
- session cookie
- CSRF token
- session token
- reset token

Do not create `.env` variables merely for manual v1 acceptance. Future automation may justify dedicated secret names later.

---

## Required Future Implementation Actions

Do **not** execute until IMPLEMENTATION is authorized.

1. Select reserved non-personal acceptance email under operator control.
2. Generate strong unique password.
3. Store credential securely outside Git.
4. Perform one authorized registration through normal API (`POST /api/auth/register`).
5. Verify created account: `role=user`, `account_status=active`.
6. Login using normal CSRF/session flow.
7. Perform harmless authenticated smoke: `GET /api/favorites/`.
8. Logout normally.
9. Confirm session revocation where practical.
10. Record sanitized identity metadata for future operators (user id, reserved email convention, credential storage location — not the password).
11. Update `docs/engineering/protocol/PRODUCTION_ACCEPTANCE.md` with **Authenticated Production Acceptance** section.
12. Mark OPS-001 implementation evidence in this file.

---

## TASK-004 Unblock Contract

After OPS-001 is implemented, TASK-004 Production Acceptance may resume:

1. Retrieve approved acceptance credentials securely.
2. `GET /api/auth/csrf`
3. `POST /api/auth/login`
4. Verify authenticated session.
5. Choose / read-only verify nonexistent property ID (must not exist in production).
6. Verify no favorite row exists for `(acceptance_user_id, nonexistent_property_id)`.
7. `POST /api/favorites/{nonexistent_id}`
8. Expect: HTTP **404**, message **"Property not found"**
9. Verify no favorite row was created.
10. Inspect backend logs: no IntegrityError, no traceback.
11. `GET /api/favorites/` → normal authenticated response.
12. `POST /api/auth/logout`
13. Record Production Acceptance in TASK-004.
14. Close TASK-004.

Do not execute this sequence during OPS-001 definition or implementation.

---

## Definition of Done

OPS-001 may become **CLOSED** when:

- dedicated acceptance user exists;
- user `role` = `user`;
- `account_status` = `active`;
- account purpose is clearly controlled;
- credentials are securely accessible to authorized operator;
- no credentials exist in Git;
- normal login succeeds;
- CSRF/session flow succeeds;
- harmless authenticated GET succeeds;
- logout succeeds;
- no unauthorized production data was created;
- minimal durable procedure is documented in `PRODUCTION_ACCEPTANCE.md`;
- TASK-004 is unblocked for authenticated Production Acceptance.

**Important:** OPS-001 closure does **not** require TASK-004 to be CLOSED. OPS-001 provides the capability; TASK-004 consumes it.

---

## Deferred Hardening

Not required for v1:

- idempotent provisioning script
- automatic secret injection
- acceptance identities for realtor/admin
- automatic session cleanup verification
- CI integration
- automated production smoke suite
- test-data cleanup framework

Implement only after repeated operational demand.

---

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| Credential exposure in Git or chat | MEDIUM | Secret handling contract; operator discipline |
| Accidental use of real user credentials | MEDIUM | Reserved acceptance identity policy |
| Public registration of reserved email by third party | LOW | Non-obvious reserved email; monitor registration |
| Acceptance account used for non-acceptance activity | LOW | Purpose documentation; optional future suspension policy |
| Application code change | NOT APPLICABLE | v1 uses existing register/login/logout paths |

Overall OPS-001 risk: **MEDIUM** (operations/credential handling, not application defect).

---

## Verification Plan (Implementation Phase)

| Step | Check |
|------|-------|
| Registration | `POST /api/auth/register` succeeds once for reserved email |
| Account state | `role=user`, `account_status=active` |
| Login | `GET /api/auth/csrf` + `POST /api/auth/login` succeeds |
| Authenticated read | `GET /api/favorites/` returns 200 |
| Logout | `POST /api/auth/logout` succeeds |
| Secret hygiene | password not present in repository, logs, or task evidence |
| Documentation | `PRODUCTION_ACCEPTANCE.md` updated with authenticated section |

---

## Implementation Result

**Date:** 2026-08-13
**Production HEAD:** `c5c9de631ed560848fe00dd2246e60a697c062b4`

| Field | Value |
|-------|-------|
| Acceptance identity provisioned | YES |
| Acceptance user ID | `27` |
| Acceptance email | `acceptance@rentonow.ro` |
| Role | `user` |
| Account status | `active` |
| Creation method | `POST /auth/register` (application HTTP lifecycle); controlled credential recovery via `POST /auth/reset-password` on the same dedicated account after failed automation left credentials outside operator store |
| Credential storage | Operator-local secure store outside Git: `~/.rento-ops/production-acceptance-identity.json` |
| Password recorded in Git | NO |
| Session cookie / CSRF token recorded | NO |

**Verified auth contract (from code + production smoke):**

| Step | Endpoint | CSRF required |
|------|----------|---------------|
| Register | `POST /api/auth/register` JSON `{ email, password }` | NO |
| CSRF issue | `GET /api/auth/csrf` | NO |
| Login | `POST /api/auth/login` form `username`, `password` | NO |
| Logout | `POST /api/auth/logout` | YES (`X-CSRF-Token` + session cookie) |

Default registration result: `role=user`, `account_status=active`.

**Authentication smoke (production HTTPS API):**

| Check | Result |
|-------|--------|
| Login | PASS (`200`) |
| Session / `GET /api/favorites/` | PASS (`200`) |
| Logout | PASS (`200`) |
| Session revocation / `GET /api/favorites/` after logout | PASS (`401`) |

**Production data boundary:**

| Data | Created |
|------|---------|
| Dedicated acceptance `users` row | 1 |
| Favorites | 0 |
| Properties | 0 |
| Viewing requests | 0 |
| Rental documents | 0 |
| Realtor profiles | 0 |
| Realtor applications | 0 |

**Notes:**

- Authenticated smoke must use the production HTTPS API path because `SESSION_COOKIE_SECURE` is enabled in production.
- No TASK-004 Production Acceptance sequence was executed in this phase.

## Final Verification

| Check | Result |
|-------|--------|
| Dedicated account exists | PASS |
| `role=user`, `account_status=active` | PASS |
| Credentials outside Git | PASS |
| Login / CSRF / session / logout smoke | PASS |
| No unauthorized business data | PASS |
| `PRODUCTION_ACCEPTANCE.md` updated | PASS |
| Secret leak check on repository diff | PASS |

## Production Result

**Date:** 2026-08-13
**OPS-001 implementation:** **PASS**
**OPS-001 status:** **CLOSED**

| Field | Value |
|-------|-------|
| ACCOUNT_CREATED | YES |
| ACCEPTANCE_USER_ID | `27` |
| ACCEPTANCE_EMAIL | `acceptance@rentonow.ro` |
| ROLE | `user` |
| ACCOUNT_STATUS | `active` |
| CREATION | normal application registration lifecycle |
| CREDENTIALS | stored outside Git (`~/.rento-ops/production-acceptance-identity.json`) |
| Password in Git | NO |
| Password hash in Git | NO |
| Cookie/token values in Git | NO |

**Capability verification:**

| Check | Result |
|-------|--------|
| Login | PASS |
| CSRF/session | PASS |
| `GET /api/favorites/` | PASS |
| TASK-004 protected authenticated acceptance | PASS |
| Logout | PASS |
| Session revocation | PASS |
| Business data created by capability verification | NO |
| Credentials exposed | NO |

**TASK-004:** UNBLOCKED AND ACCEPTANCE COMPLETED

**OPS-001 Definition of Done:** PASS

**Deferred (unchanged):**

- idempotent provisioning script
- CI automation
- realtor/admin acceptance identities
- automated secret injection
- production E2E framework

## Follow-up

- Future realtor/admin acceptance identities — separate OPS decision
- Idempotent provisioning script — deferred until repeated use justifies it

---

## Gate Reminder

Approval of one stage does not approve later stages:

```text
DEFINITION
IMPLEMENTATION
VERIFICATION
DOCUMENTATION UPDATE
CLOSURE
```

Provisioning a production user is a separate authorization from TASK-004 Production Acceptance.
