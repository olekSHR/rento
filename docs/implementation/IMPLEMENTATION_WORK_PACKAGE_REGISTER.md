# Rento Implementation Work Package Register

**Status:** PUBLISHED - Stage I0 Implementation Work Package Register
**Authority class:** Implementation work package governance
**Binding authority:** Active - per REPOSITORY_STANDARDS.md section 7.6
**Publication:** COMPLETE
**Independent Governance Review:** COMPLETED - APPROVED FOR PUBLICATION REVIEW
**Independent Publication Review:** COMPLETED - APPROVED
**Program:** Implementation, Stabilization & Launch
**Stage:** I0 - Program Initialization
**Implementation:** NOT AUTHORIZED
**Stage I1:** NOT AUTHORIZED
**Runtime Git HEAD at register creation:** `84c51da42f504c390720523c4b1868c52eeda28d`
**Latest repository checkpoint:** `84c51da`

---

## 1. Purpose

This document is the governing register for all future Rento implementation work packages.

No implementation work may exist outside this register after the implementation program is accepted. A work package entry alone does not authorize implementation. Each package also requires separate implementation authorization and required gates from Repository Authority.

Stage I0 creates the register only. It does not authorize any implementation work package.

---

## 2. Register Authority

This register consumes:

- `docs/implementation/IMPLEMENTATION_PROGRAM.md`
- `docs/implementation/PROGRAM_TRANSITION_HANDOFF.md`
- `docs/implementation/IMPLEMENTATION_BASELINE.md`
- `docs/engineering/IMPLEMENTATION_GOVERNANCE.md`
- `docs/engineering/DEVELOPMENT_STANDARDS.md`
- `docs/engineering/AI_COLLABORATION_STANDARDS.md`
- `docs/engineering/REPOSITORY_STANDARDS.md`
- applicable published engineering authorities for each future package.

The register is subordinate to published Repository Authority and cannot override implementation authorization requirements.

---

## 3. Current Register State

| Field | Value |
|-------|-------|
| Active implementation packages | 0 |
| Authorized implementation packages | 0 |
| Pending implementation packages | 0 |
| Completed implementation packages | 0 |
| Cancelled implementation packages | 0 |
| Stage I1 packages | None authorized |
| Implementation status | NOT AUTHORIZED |

There are no implementation work packages at Stage I0.

---

## 4. Required Work Package Fields

Every future implementation work package must include all fields below before it may be considered for authorization.

| Field | Required content |
|-------|------------------|
| Work Package ID | Stable identifier in `IWP-###` format |
| Owner Authority | Published product, engineering, repository, security, or implementation authority owning the work |
| Scope | Exact authorized objective and artifact classes |
| Repository Areas | Paths or areas permitted for modification |
| Acceptance Criteria | Concrete conditions required for package acceptance |
| Required Evidence | Tests, checks, review, security, migration, observability, or unavailable evidence report |
| Dependencies | Prior work packages, authorities, reviews, data, environment, or release prerequisites |
| Status | Lifecycle state from this register |
| Completion Verification | Final evidence proving acceptance, cancellation, split, or escalation outcome |

Entries missing any required field are invalid and cannot authorize work.

---

## 5. Work Package ID Policy

| Rule | Requirement |
|------|-------------|
| ID format | `IWP-###` |
| ID assignment | Sequential after authorization intake begins |
| ID reuse | Prohibited |
| Deleted IDs | Prohibited; cancelled entries remain for lineage |
| Placeholder IDs | Prohibited unless explicitly authorized by repository governance |

Stage I0 reserves no package IDs.

---

## 6. Status Vocabulary

| Status | Meaning |
|--------|---------|
| `PROPOSED` | Candidate package recorded for review; no implementation authorization |
| `AUTHORIZATION REQUIRED` | Package cannot proceed until separate authorization exists |
| `AUTHORIZED` | Separate authorization exists and covers exact scope |
| `IN PROGRESS` | Authorized implementation work has begun |
| `IN REVIEW` | Work completed by author and under required review gates |
| `BLOCKED` | Gate, authority, evidence, security, dependency, or scope issue blocks progress |
| `SPLIT REQUIRED` | Scope contains separable or unrelated work and must be divided |
| `ACCEPTED` | Required gates and completion verification are satisfied |
| `ACCEPTED WITH RISK` | Required gates satisfied with accepted residual risk recorded |
| `CANCELLED` | Package terminated without acceptance |
| `ESCALATED` | Routed to owning authority or another lifecycle |

Only `AUTHORIZED` or later statuses may contain implementation activity, and only when separate authorization exists.

---

## 7. Register Schema

Future package entries must use this schema:

| Field | Value |
|-------|-------|
| Work Package ID | `IWP-###` |
| Title | TBD |
| Owner Authority | TBD |
| Stage | I1-I8, as authorized |
| Scope | TBD |
| Non-Goals | TBD |
| Repository Areas | TBD |
| Change Classes | TBD |
| Acceptance Criteria | TBD |
| Required Evidence | TBD |
| Dependencies | TBD |
| Required Review Routes | TBD |
| Status | `PROPOSED` / `AUTHORIZATION REQUIRED` / other allowed status |
| Completion Verification | TBD |
| Residual Risk | TBD |

---

## 8. Active Work Packages

No active implementation work packages exist.

| Work Package ID | Owner Authority | Scope | Repository Areas | Acceptance Criteria | Required Evidence | Dependencies | Status | Completion Verification |
|-----------------|-----------------|-------|------------------|---------------------|-------------------|--------------|--------|-------------------------|
| None | None | None | None | None | None | None | NOT AUTHORIZED | None |

---

## 9. Future Package Intake Rules

Before a future package can be added as anything beyond `PROPOSED` or `AUTHORIZATION REQUIRED`, the following must be true:

1. The relevant stage is authorized.
2. Implementation authorization exists and identifies permitted artifact classes.
3. Owner Authority is published and active.
4. Scope is bounded and excludes adjacent work.
5. Repository areas are explicit.
6. Required Development, Implementation Governance, Security, AI, Repository, and Release gates are selected.
7. Verification evidence is defined before work begins.
8. Stop conditions are recorded.
9. Existing unrelated working tree changes are excluded.

---

## 10. Acceptance Criteria Policy

Acceptance criteria must be:

- tied to owner authority;
- observable through evidence;
- scoped to the registered work package;
- explicit about forbidden behavior where authority-sensitive;
- independent of release or deployment unless those are separately authorized;
- sufficient for `IMPLEMENTATION_GOVERNANCE.md` acceptance model.

Acceptance criteria must not redefine product meaning or architecture authority.

---

## 11. Required Evidence Policy

Required evidence may include:

| Evidence type | Applies when |
|---------------|--------------|
| Static checks | Material source or configuration changes |
| Unit tests | Domain, service, utility, or invariant logic |
| Contract tests | API or cross-boundary behavior |
| Authorization and ownership tests | Role, owner, delegated scope, protected operation, or visibility changes |
| Migration checks | Persistence structure or migration behavior |
| Security review | Auth, authz, secrets, data, privileged operations, trust boundaries |
| Observability proof | State transitions, failures, decisions, privileged actions, external mediation |
| AI review evidence | AI-assisted material work |
| Manual review evidence | Authority trace, diff review, residual risk |
| Unavailable evidence report | Checks not run, why, and residual risk |

Evidence must be recorded before acceptance. Passing tests alone cannot override missing authority.

---

## 12. Completion Verification

Completion verification must record:

1. final changed artifact list;
2. authority trace;
3. gate results;
4. review outcome;
5. verification commands/checks and outcomes;
6. unrun checks or unavailable evidence;
7. residual risks;
8. confirmation that release, deployment, tag, push, Phase 4, and adjacent implementation were not performed unless explicitly authorized.

---

## 13. Register Stop Conditions

The register must stop intake or package progression when:

- Stage authorization is missing;
- implementation authorization is missing or ambiguous;
- Owner Authority is missing, unpublished, or conflicting;
- scope requires Code-to-Architecture Audit or Implementation Gap creation not authorized by the task;
- repository areas include unrelated files;
- security or data classification risk cannot be routed;
- work would modify Product Authority or published Engineering Authority without explicit authorization;
- release, deployment, tag, push, or Phase 4 work is required but unauthorized.

---

## 14. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` |
| Status | PUBLISHED - Stage I0 Implementation Work Package Register |
| Binding authority | Active - per REPOSITORY_STANDARDS.md section 7.6 |
| Publication | COMPLETE |
| Independent Governance Review | COMPLETED - APPROVED FOR PUBLICATION REVIEW |
| Independent Publication Review | COMPLETED - APPROVED |
| Active implementation packages | 0 |
| Authorized implementation packages | 0 |
| Implementation | NOT AUTHORIZED |
| Stage I1 | NOT AUTHORIZED |
| Related documents | `IMPLEMENTATION_PROGRAM.md`, `PROGRAM_TRANSITION_HANDOFF.md`, `IMPLEMENTATION_BASELINE.md` |
