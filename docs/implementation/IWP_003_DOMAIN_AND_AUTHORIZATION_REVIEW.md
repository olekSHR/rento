# IWP-003 Domain And Authorization Review

**Status:** IMPLEMENTATION REVIEW EVIDENCE - FINAL BLOCK REVIEW NOT PERFORMED
**Package:** IWP-003 - Backend Domain And Authorization Hardening
**Stage:** I4 - Domain Implementation
**Acceptance:** NOT GRANTED
**Release:** NOT AUTHORIZED
**Push:** NOT AUTHORIZED

---

## 1. Review Scope

This document records the implementation-level domain and authorization review for the bounded IWP-003 technical implementation.

Reviewed changed files:

- `backend/app/routers/properties.py`
- `backend/app/services/property_service.py`
- `backend/app/repositories/property_repository.py`
- `backend/app/schemas/property.py`
- `backend/app/services/realtor_application_service.py`
- `backend/tests/test_iwp_003_domain_authorization.py`
- `docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`
- `docs/implementation/IWP_003_DOMAIN_AND_AUTHORIZATION_REVIEW.md`

This is not a final block review and does not grant acceptance.

---

## 2. Authority Trace

Primary authority:

- `docs/implementation/IWP_003_EXECUTION_AUTHORIZATION.md`

IWP-003 authorized technical behavior:

- service-owned property ownership validation;
- service-owned realtor mutation rules;
- denial of cross-owner mutation before persistence;
- explicit admin moderation transition rules;
- valid property status transitions with invalid-transition denial;
- public property visibility restricted to authority-defined public state;
- contact-source enforcement from realtor profile data;
- removal or separation of client-writable `status`, `contact_name`, `phone`, and `whatsapp`;
- repository persistence without unrelated `last_verified_at` mutation;
- service-level realtor-application review validation;
- focused tests and evidence.

Out-of-scope authority remained excluded:

- models;
- Alembic revisions;
- dependency manifests and lockfiles;
- frontend;
- uploads/media;
- CI and infrastructure;
- register, handoff, roadmap, and authority updates;
- push, release, deployment, production, launch, scaling, Phase 4.

---

## 3. Property Service Ownership Review

Verdict: PASS.

Property mutation authorization is now service-owned through `property_service.ensure_property_mutation_allowed`.

Rules reviewed:

- admin may pass mutation authorization explicitly;
- realtor must own the property before mutation;
- non-realtor/non-admin mutation is denied;
- denial occurs before repository persistence;
- routers no longer own the core property ownership decision for create/update/image mutation access checks.

Cross-owner mutation is covered by `test_cross_owner_realtor_mutation_is_denied_before_persistence`.

---

## 4. Realtor Mutation Boundary Review

Verdict: PASS.

Create behavior:

- realtor `owner_id` is derived from `current_user.id`;
- realtor status is set to `pending`;
- realtor contact fields are sourced from the completed realtor profile;
- client-supplied owner/status/contact attributes do not grant authority.

Update behavior:

- generic update accepts only non-protected listing fields;
- protected `status`, `contact_name`, `phone`, and `whatsapp` are preserved;
- no owner transfer path is introduced.

Schema behavior:

- `PropertyCreate` and `PropertyUpdate` no longer define protected status/contact fields;
- response schemas retain protected fields for compatibility.

---

## 5. Admin Moderation Review

Verdict: PASS.

Explicit transitions reviewed:

- verify: `pending -> available`;
- archive: `available -> archived`;
- activate: `archived -> available`.

Invalid transition behavior:

- invalid verify/archive/activate sources raise `BadRequestException`;
- invalid transitions are denied before `update_property_status` is called.

No new product statuses were introduced.

---

## 6. Public Visibility Review

Verdict: PASS.

Public visibility rule:

- public property listing filter uses only `available`;
- unauthenticated and normal-user direct property view rejects non-available properties;
- `reserved` is no longer public.

Admin and owner-specific visibility remain separate from public visibility.

---

## 7. Contact-Source Review

Verdict: PASS.

General create/update request paths do not grant writable authority over:

- `contact_name`;
- `phone`;
- `whatsapp`.

For realtor-owned public data, contact values are sourced from the realtor profile and resolved through service-owned profile contact application.

No frontend changes were made.

---

## 8. Repository Side-Effect Review

Verdict: PASS.

Generic `property_repository.update_property` now updates only non-protected listing fields and optional image URL.

It does not mutate:

- `status`;
- `contact_name`;
- `phone`;
- `whatsapp`;
- `last_verified_at`.

`property_repository.update_property_status` is the explicit moderation persistence function. It updates `last_verified_at` only when the service explicitly requests it for verification/activation.

---

## 9. Realtor-Application Review

Verdict: PASS.

Service-level safeguards:

- requested result must be `approved` or `rejected`;
- source application must be `pending`;
- invalid status is rejected even if schema validation is bypassed;
- role promotion occurs only in the valid approval branch;
- rejected applications do not promote role.

No schema/model changes were required.

---

## 10. Security Review

Verdict: PASS.

Reviewed security properties:

- authorization is server-side;
- ownership checks precede mutation;
- denial occurs before repository writes;
- least privilege is preserved for realtor and admin paths;
- client-supplied owner, role, status, and contact values are not trusted;
- no secret, token, database URL, credential, or production data was printed;
- no live DB, external service, `.env`, secret store, production system, migration, deployment, or release action was used.

---

## 11. Package-Overlap Review

Verdict: PASS.

The implementation remains bounded to IWP-003.

Not implemented:

- IWP-004 API contract redesign;
- IWP-006;
- IWP-007;
- IWP-008 uploads/media work;
- frontend work;
- release/deployment/production/Phase 4 work.

No model, migration, dependency, CI, or infrastructure change was required.

---

## 12. Evidence And Validation Review

Validation evidence is recorded in `docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`.

Current evidence posture:

- Python compilation: PASS;
- focused IWP-003 tests: PASS;
- full backend suite from backend cwd: PASS;
- coverage without threshold: PASS;
- IDE diagnostics: PASS;
- Markdown diagnostics: PASS;
- static router protected-field search: PASS;
- scoped eight-file whitespace check: PASS;
- exact write-set scope verification: PASS;
- global working-tree whitespace check: FAIL due pre-existing unrelated release file left untouched and unstaged;
- root-cwd full backend suite: FAIL because existing static uploads directory expectation is cwd-sensitive and out of IWP-003 scope;
- implementation was staged within the authorized eight-file scope before commit `50286ca3042cb0aabd74f28f072557afd01773c5` (`docs(implementation): execute IWP-003 domain authorization hardening`);
- current targeted correction remains a separate later commit;
- acceptance remains NOT GRANTED.

---

## 13. Review Limitations

This document is implementation-level review evidence only.

It does not:

- grant IWP-003 acceptance;
- perform the independent final block review;
- activate another package;
- update register, handoff, roadmap, or authority;
- authorize push, release, deployment, production, launch, scaling, or Phase 4.

Exact next action after a passing implementation commit is one independent final block review of the committed IWP-003 implementation. Acceptance must not be granted during that review.

---

## 14. Targeted Final-Review Correction Record

Targeted findings under correction:

- `MAJOR-IWP003-FBR-001` - generic `create_property` verification timestamp initialization;
- `MINOR-IWP003-FBR-002` - focused role allow/deny and inactive-account denial evidence;
- `EDITORIAL-IWP003-FBR-003` - stale staged-validation wording in Section 12.

Targeted correction status:

- `MAJOR-IWP003-FBR-001`: CORRECTED - generic create no longer initializes `last_verified_at`; explicit verification transition remains the timestamp-setting path.
- `MINOR-IWP003-FBR-002`: CORRECTED - focused tests now cover role allow/deny, active/suspended/blocked account behavior, and denial before property mutation.
- `EDITORIAL-IWP003-FBR-003`: CORRECTED - Section 12 now records the existing implementation commit and correction separation.

Correction validation:

- Python compilation: PASS - `property_repository.py` and `test_iwp_003_domain_authorization.py`.
- Backend test collection from canonical backend context: PASS - 32 collected, 2 warnings.
- Focused IWP-003 tests: PASS - 29 passed, 2 warnings.
- Full backend tests from canonical backend context: PASS - 32 passed, 6 warnings.
- Coverage without threshold: PASS - 29 passed, 2 warnings, total coverage 38%.
- Static timestamp checks: PASS - generic create/update no longer set `last_verified_at`; explicit moderation status update remains the timestamp-setting path; verification and activation request timestamp updates through service-owned transitions.
- Markdown diagnostics: PASS - no linter diagnostics for this document.
- Scoped diff whitespace check: PASS - `git diff --check -- backend/app/repositories/property_repository.py backend/tests/test_iwp_003_domain_authorization.py docs/implementation/IWP_003_DOMAIN_AND_AUTHORIZATION_REVIEW.md`.
- Scope verification: PASS - changed correction files are the three authorized files, with the pre-existing unrelated release file and reviews directory remaining unstaged and excluded.

Corrected test evidence:

- pending property creation leaves `last_verified_at` absent;
- explicit valid verification sets `last_verified_at`;
- generic unrelated update preserves `last_verified_at`;
- ordinary user role is denied before property mutation;
- realtor/admin role guards allow only the applicable authority boundaries;
- active account remains eligible;
- suspended and blocked accounts are denied before property mutation.

Correction commit: UNAVAILABLE UNTIL LOCAL CORRECTIVE COMMIT IS CREATED.

Acceptance remains NOT GRANTED.
