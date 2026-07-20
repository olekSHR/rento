# IWP-003 Execution Evidence

**Status:** IMPLEMENTATION EXECUTED - ACCEPTANCE NOT GRANTED
**Package:** IWP-003 - Backend Domain And Authorization Hardening
**Stage:** I4 - Domain Implementation
**Branch:** main
**Starting HEAD:** `88746a40aa51ca71e326b14266fa0581ba34e20f`
**Starting HEAD subject:** `docs(implementation): authorize IWP-003 implementation scope`
**Starting origin/main:** `54da2fab4a4e35e04288ebfd9902c2de5aa376f2`
**Starting divergence:** 0 behind / 5 ahead
**Push:** NOT AUTHORIZED
**Acceptance:** NOT GRANTED
**Implementation commit:** UNAVAILABLE UNTIL LOCAL IMPLEMENTATION COMMIT IS CREATED

---

## 1. Authority And Baseline

Primary controlling authority:

- `docs/implementation/IWP_003_EXECUTION_AUTHORIZATION.md`

Supporting authority used only where directly required by IWP-003:

- `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md`
- `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md`
- Backend Architecture
- Authorization Architecture
- Security Standards
- Product Architecture
- API Standards
- Database Standards
- Implementation Governance
- Development Standards
- AI Collaboration Standards

Baseline verification command:

```text
git status --short --branch; git rev-parse HEAD; git log -1 --format=%s; git rev-parse origin/main; git rev-list --left-right --count origin/main...HEAD; git diff --cached --name-only
```

Result:

```text
## main...origin/main [ahead 5]
 M docs/design/releases/v1.0-admin-platform.md
?? docs/implementation/reviews/
88746a40aa51ca71e326b14266fa0581ba34e20f
docs(implementation): authorize IWP-003 implementation scope
54da2fab4a4e35e04288ebfd9902c2de5aa376f2
0	5
```

Baseline verdict: PASS.

Unrelated items were preserved and not inspected for content, modified, staged, deleted, or included.

---

## 2. Exact Files Changed

Implementation files:

- `backend/app/routers/properties.py`
- `backend/app/services/property_service.py`
- `backend/app/repositories/property_repository.py`
- `backend/app/schemas/property.py`
- `backend/app/services/realtor_application_service.py`

Test file:

- `backend/tests/test_iwp_003_domain_authorization.py`

Evidence files:

- `docs/implementation/IWP_003_EXECUTION_EVIDENCE.md`
- `docs/implementation/IWP_003_DOMAIN_AND_AUTHORIZATION_REVIEW.md`

No other file was intentionally modified for IWP-003 implementation.

---

## 3. Discovery Gaps Addressed

The implementation addressed the authorized discovery gaps:

- router-owned property ownership checks were moved to service-owned checks;
- realtor mutation now uses the authenticated user as canonical owner;
- realtor mutation cannot change protected status or contact fields;
- general property create/update schemas no longer expose protected status/contact write fields;
- explicit moderation transitions now validate source and target states;
- public property visibility is restricted to `available`;
- generic property update no longer mutates `last_verified_at`;
- realtor-application review validates source status and target outcome at service level.

---

## 4. Implemented Domain And Authorization Behavior

Property authorization:

- `property_service.ensure_property_mutation_allowed` owns mutation authorization.
- Realtors can mutate only properties where `owner_id == current_user.id`.
- Cross-owner realtor mutation raises `ForbiddenException` before repository persistence.
- Admin mutation remains explicit through admin dependencies and service calls.

Realtor mutation boundary:

- realtor create uses `current_user.id` as canonical `owner_id`;
- realtor create sets status to `pending`;
- realtor create sources contact fields from the realtor profile;
- realtor update preserves protected status/contact state because generic repository update no longer writes those fields.

Admin moderation boundary:

- `verify_property`: `pending -> available`;
- `archive_property`: `available -> archived`;
- `activate_property`: `archived -> available`;
- invalid source states raise `BadRequestException` before persistence.

Public visibility:

- public listing repository filter is `status == "available"`;
- direct public property view accepts only `available`.

Repository side-effect correction:

- generic `update_property` no longer changes `status`, `contact_name`, `phone`, `whatsapp`, or `last_verified_at`;
- `update_property_status` is the explicit moderation persistence path;
- `last_verified_at` updates only when a service-owned moderation transition requests it.

Realtor-application review validation:

- allowed review outcomes are only `approved` and `rejected`;
- source application must be `pending`;
- invalid outcomes are rejected even if schema validation is bypassed;
- role promotion to `realtor` occurs only after the valid approval transition.

---

## 5. Schema And Contact-Source Posture

`PropertyCreate` and `PropertyUpdate` preserve non-protected property fields:

- `title`
- `description`
- `price`
- `city`
- `rooms`
- `image_url`

They no longer expose general writable authority over:

- `status`
- `contact_name`
- `phone`
- `whatsapp`

Response schemas were preserved for compatibility.

Canonical public contact source remains realtor profile data, resolved through service/repository access to `realtor_profiles`.

---

## 6. Commands And Results

Python compilation:

```text
python -m py_compile "backend/app/routers/properties.py" "backend/app/services/property_service.py" "backend/app/repositories/property_repository.py" "backend/app/schemas/property.py" "backend/app/services/realtor_application_service.py" "backend/tests/test_iwp_003_domain_authorization.py"
```

Result: PASS.

Focused IWP-003 tests:

```text
python -m pytest "backend/tests/test_iwp_003_domain_authorization.py" -q
```

Result: PASS - 21 passed, 2 warnings.

Complete backend pytest suite from repository root:

```text
python -m pytest backend -q
```

Result: FAIL - 1 failed, 23 passed, 6 warnings. Failure was `RuntimeError: Directory 'uploads' does not exist` when importing `app.main` from repository root. This was not corrected because uploads/media behavior and `test_backend_smoke.py` are outside IWP-003 authority.

Complete backend pytest suite from backend working directory:

```text
python -m pytest tests -q
```

Result: PASS - 24 passed, 6 warnings.

Coverage without threshold:

```text
python -m pytest tests/test_iwp_003_domain_authorization.py --cov=app --cov-report=term-missing -q
```

Result: PASS - 21 passed, 2 warnings, total coverage 36%.

IDE diagnostics:

```text
ReadLints on changed Python files
```

Result: PASS - no linter errors found.

Markdown diagnostics:

```text
ReadLints on docs/implementation/IWP_003_EXECUTION_EVIDENCE.md and docs/implementation/IWP_003_DOMAIN_AND_AUTHORIZATION_REVIEW.md
```

Result: PASS - no linter errors found.

Static router policy search:

```text
rg "property\.(status|contact_name|phone|whatsapp|owner_id)|ensure_property_access|realtor_profile_service" backend/app/routers/properties.py
```

Result: PASS - no matches found.

Secret-safety search over the exact eight-file write set:

```text
rg "(password|secret|token|api[_-]?key|database_url|DATABASE_URL|PRIVATE_KEY|BEGIN RSA|BEGIN OPENSSH)" <exact eight-file write set>
```

Result: PASS - matches were only the evidence documents' negative secret-safety statements; no secret values were present or printed.

Scoped whitespace check over the exact eight-file write set:

```text
git diff --check -- <exact eight-file write set>
```

Result: PASS.

Global working-tree whitespace check:

```text
git diff --check
```

Result: FAIL - diagnostics were limited to the pre-existing unrelated `docs/design/releases/v1.0-admin-platform.md` working-tree item. That file was not modified, staged, deleted, or included in this implementation.

Scope verification:

```text
git status --short
```

Result: PASS - IWP-003 changes are limited to the exact eight-file write set; unrelated baseline items remain unstaged.

---

## 7. Test Coverage Summary

Focused IWP-003 test coverage includes:

- realtor own-property mutation allowed;
- cross-owner realtor mutation denied before persistence;
- admin-authorized mutation remains explicit;
- realtor update cannot control protected status/contact state;
- realtor create ignores client-supplied owner/status/contact data and uses current user/profile;
- valid verify/archive/activate moderation transitions;
- invalid verify/archive/activate transitions denied before persistence;
- public direct view rejects non-available state;
- public listing repository filters available only;
- generic update does not alter `last_verified_at`;
- property create/update schemas ignore protected fields;
- pending realtor application approval promotes role;
- pending realtor application rejection does not promote role;
- invalid realtor-application target denied;
- non-pending realtor-application source denied.

---

## 8. Security Evidence

Security checks performed through code inspection, tests, static search, and validation:

- server-side authorization is enforced in service functions;
- ownership checks precede mutation and repository writes;
- protected owner/status/contact/role state is not trusted from request objects;
- public visibility is available-only;
- role promotion is service-owned and limited to valid application approval;
- no secret, token, database URL, credential, production data, or personal data value was printed as evidence;
- no live database, migration, external service, production system, `.env`, or secret store was accessed.

Secret-safety result: PASS.

---

## 9. Migration, Dependency, And Package Posture

Migration authority: NOT GRANTED and not used.

Dependency authority: NOT GRANTED and not used.

No backend models, Alembic revisions, backend requirements, lockfiles, pytest configuration, shared fixtures, frontend files, uploads/media files, CI, infrastructure, register, handoff, roadmap, release, deployment, launch, scaling, production, or Phase 4 surfaces were modified.

Package-overlap assessment: PASS. Changes remain inside IWP-003 and do not implement IWP-004, IWP-006, IWP-007, or IWP-008.

---

## 10. Unavailable Evidence

- Root-cwd complete backend pytest pass is unavailable because the existing smoke import expects an `uploads` directory relative to the current working directory. Correcting that would require out-of-scope uploads/media or smoke-test setup changes.
- Implementation commit hash is unavailable until after the local implementation commit is created.
- Acceptance evidence is unavailable because acceptance is not authorized and not granted.

---

## 11. Residual Risks

- The existing application still has formatting and duplicate-import debt outside IWP-003 scope.
- The full suite must be run from `backend/` unless the out-of-scope static uploads path behavior is addressed separately.
- Final block review remains required before any acceptance decision.

---

## 12. Release And Deployment Separation

This implementation does not authorize or perform:

- push;
- tag creation;
- GitHub Release creation;
- deployment;
- launch;
- scaling;
- production access;
- production migration;
- Phase 4.

Acceptance remains NOT GRANTED.
