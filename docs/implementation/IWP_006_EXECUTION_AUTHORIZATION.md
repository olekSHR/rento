# IWP-006 Execution Authorization Artifact

**Status:** PUBLISHED - EFFECTIVE (base instrument) · AMENDMENT DRAFT - NOT REVIEWED - NOT APPROVED - NOT PUBLISHED - NOT EFFECTIVE
**Authority class:** IWP package authority artifact
**Base instrument binding authority:** ACTIVE - IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY - NOT SELECTION - NOT ACTIVATION - NOT DISCOVERY EXECUTION - NOT IMPLEMENTATION AUTHORIZATION
**Proposed amendment binding authority (DRAFT - NOT EFFECTIVE):** ACTIVE - IWP-006 SELECTION, ACTIVATION, AND READ-ONLY DISCOVERY AUTHORIZATION ONLY
**Effectiveness:** EFFECTIVE AS IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY — amendment draft is NOT EFFECTIVE
**Independent review:** COMPLETED - PASS (base instrument)
**Amendment independent review:** NOT RUN
**Review findings:** BLOCKING 0; NON-BLOCKING 0 (base instrument)
**Amendment review findings:** NOT RUN
**Publication-readiness decision:** COMPLETED - PASS (base instrument)
**Selection/discovery readiness decision:** COMPLETED - PASS
**Pre-publication validation:** COMPLETED - PASS (base instrument)
**Approval integration:** COMPLETED - APPROVED FOR PUBLICATION CHECKPOINT (base instrument)
**Amendment approval integration:** NOT RUN
**Publication integration:** COMPLETED (base instrument)
**Amendment publication integration:** NOT RUN
**Publication checkpoint:** COMPLETED (base instrument)
**Amendment publication checkpoint:** NOT RUN
**Publication date:** 2026-07-22
**Publication commit:** `fe64f2bce9bcf1e6b2df287593497c7e03c99827`
**Git checkpoint:** COMPLETED (base instrument)
**Amendment commit:** NOT APPLICABLE until separately authorized publication action
**Continuity synchronization:** COMPLETED at `74de50e64751e89bb9c51855e5a3688d8072bde4`
**Amendment continuity synchronization:** NOT RUN
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 - Domain Implementation
**Target package:** IWP-006 - Frontend Auth And API Client Stabilization
**IWP-006 (current live posture):** PROPOSED - INACTIVE - NOT SELECTED - NOT ACTIVATED - NOT AUTHORIZED - NOT EXECUTABLE
**IWP-006 (proposed amendment posture — DRAFT - NOT EFFECTIVE):** SELECTED - ACTIVE - READ-ONLY DISCOVERY AUTHORIZED - TECHNICAL IMPLEMENTATION NOT AUTHORIZED
**Package selection (current live):** NOT SELECTED
**Package selection (proposed amendment — DRAFT):** SELECTED
**Package activation (current live):** NOT ACTIVATED
**Package activation (proposed amendment — DRAFT):** ACTIVE - ONLY SELECTED AND ACTIVE PACKAGE
**Read-only discovery authorization (current live):** NOT AUTHORIZED - NOT STARTED
**Read-only discovery authorization (proposed amendment — DRAFT):** AUTHORIZED - NOT STARTED
**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED
**Execution authorization (current live):** NOT AUTHORIZED
**Execution authorization (proposed amendment — DRAFT):** READ-ONLY DISCOVERY MAY OCCUR ONLY IN A LATER SEPARATE BOUNDED ACTION
**Discovery (current live):** NOT AUTHORIZED - NOT STARTED
**Discovery (proposed amendment — DRAFT):** AUTHORIZED - NOT STARTED
**Technical implementation:** NOT AUTHORIZED - NOT STARTED
**Exact technical write set:** NOT ESTABLISHED
**Acceptance:** NOT GRANTED
**Stage I4:** IN PROGRESS
**IWP-004:** ACCEPTED - CLOSED
**Active implementation packages (current live):** 0
**Active implementation packages (proposed amendment — DRAFT):** 1 - IWP-006
**Authorized technical implementation packages:** 0
**Push:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED
**Phase 4 Product Development Methodology:** NOT STARTED

---

## 1. Artifact Purpose And Authority Effect

This artifact contains two distinct authority layers:

1. **Published base instrument** — effective IWP-006 package authority instrument boundaries only.
2. **Amendment draft** — non-effective draft publication amendment prepared to record proposed selection, activation, and bounded read-only discovery authorization upon future separate publication.

The published base instrument defines package-level boundaries for selection, activation, and bounded read-only discovery. The base publication does **not** select IWP-006, activate IWP-006, authorize discovery execution, establish an exact technical write set, authorize technical implementation, grant acceptance, authorize push, authorize release, authorize deployment, authorize production access, or start Phase 4.

The amendment draft prepared in this document does **not** make selection, activation, or read-only discovery authorization effective. Drafting is not approval, approval is not publication, and publication is not discovery execution.

**Current live posture under Repository Authority remains unchanged until a separately authorized amendment publication act:**

```text
PROPOSED - INACTIVE - NOT SELECTED - NOT ACTIVATED - NOT AUTHORIZED - NOT EXECUTABLE
```

**Proposed amendment posture upon future publication (DRAFT - NOT EFFECTIVE):**

```text
SELECTED - ACTIVE - READ-ONLY DISCOVERY AUTHORIZED - TECHNICAL IMPLEMENTATION NOT AUTHORIZED
```

Completed base-instrument lifecycle:

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Independent targeted read-only review | COMPLETE - PASS |
| 2 | Targeted correction if required | NOT REQUIRED |
| 3 | Targeted correction delta review if corrections are made | NOT APPLICABLE |
| 4 | Approval integration if review approves | COMPLETE - APPROVED FOR PUBLICATION CHECKPOINT |
| 5 | Publication integration and publication checkpoint per `docs/engineering/REPOSITORY_STANDARDS.md` §7 | COMPLETE |
| 6 | Applicable continuity synchronization if required by Repository Authority | COMPLETE at `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| 7 | Selection/discovery readiness decision | COMPLETE - PASS |
| 8 | Amendment draft preparation | COMPLETE - DRAFT ONLY |

Amendment lifecycle (not yet started for effectiveness):

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Independent targeted read-only review of amendment draft | NOT RUN |
| 2 | Targeted correction if required | NOT RUN |
| 3 | Targeted correction delta review if corrections are made | NOT APPLICABLE |
| 4 | Approval integration if review approves | NOT RUN |
| 5 | Publication integration and publication checkpoint per `docs/engineering/REPOSITORY_STANDARDS.md` §7 | NOT RUN |
| 6 | Applicable continuity synchronization if required by Repository Authority | NOT RUN |
| 7 | Separate explicit bounded read-only discovery execution action | NOT RUN |
| 8 | Separate explicit authorization for any later technical implementation action | NOT RUN |

---

## 2. Repository And Lifecycle Baseline

This amendment draft is authored against the following repository baseline observed at amendment draft preparation time:

| Item | Baseline value |
|------|----------------|
| Repository | `https://github.com/olekSHR/rento.git` |
| Branch | `main` |
| Repository baseline commit | `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| `origin/main` | `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| Divergence | 0 behind / 0 ahead |
| Base instrument publication commit | `fe64f2bce9bcf1e6b2df287593497c7e03c99827` |
| Base instrument continuity synchronization commit | `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| Base instrument post-publication verification | PASS |
| Selection/discovery readiness decision | PASS — IWP-006 READY FOR SEPARATE SELECTION AND BOUNDED READ-ONLY DISCOVERY AUTHORIZATION — NO EXECUTION AUTHORIZED |
| Stage I4 | IN PROGRESS |
| Stage I4 execution authorization boundary | PUBLISHED - EFFECTIVE AS BOUNDARY ONLY - publication commit `dee540af3a6e02d2e8d2e360fa282a4eb52968e5` |
| IWP-004 | ACCEPTED - CLOSED |
| IWP-004 accepted implementation checkpoint | `0d524257daf8bc44724022a725f05a5c329f67a7` |
| IWP-004 durable closure checkpoint | `b4294eff295e835dc4d3e36afbdacda5be9ccbf6` |
| IWP-004 post-push synchronization point | `f73e4ff3e32bca4a9819e57083c93a14c3d0d548` |
| Active implementation packages (current live) | 0 |
| Active implementation packages (proposed amendment — DRAFT) | 1 - IWP-006 |
| Authorized technical implementation packages | 0 |
| Phase 4 | NOT STARTED |

Publication of a future approved amendment version must re-verify live Git evidence before any selection, activation, or discovery authorization transition takes effect.

---

## 3. Authority Basis And Precedence

This draft consumes only Repository Authority and accepted dependency evidence:

| Authority or evidence | Use in this draft |
|-----------------------|-------------------|
| `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` | Stage I4 execution boundary, lifecycle separation, single-package sequencing, and IWP-006 read/write boundary declarations |
| `docs/implementation/STAGE_I4_AUTHORIZATION.md` | Stage I4 instrument; separate package implementation authorization requirement |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | Canonical IWP-006 metadata, dependencies, evidence, status, repository areas, and release posture |
| `docs/implementation/IWP_004_FINAL_ACCEPTANCE_REPORT.md` | Evidence that IWP-004 dependency is accepted and closed |
| `docs/implementation/IWP_004_EXECUTION_AUTHORIZATION.md` | Structural package authority precedent only where compatible with current Repository Authority |
| `docs/implementation/IWP_003_EXECUTION_AUTHORIZATION.md` | Structural package authority precedent only where compatible with current Repository Authority |
| `docs/engineering/FRONTEND_ARCHITECTURE.md` | Owner authority for frontend auth state, route guards, and client presentation boundaries |
| `docs/engineering/API_STANDARDS.md` | Owner authority for API client contract and denial handling discipline |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | Owner authority for authentication boundaries and token/session posture |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | Owner authority for authorization decision boundaries and client non-authority |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Owner authority for future development discipline, tests, review, security gates, and implementation traceability |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Required authority for work package model, authorization act requirements, gates, evidence, and stop conditions |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Draft lifecycle, review, publication, validation scope, checkpoint, and continuity requirements |
| Git metadata | Repository state, branch, HEAD, origin, divergence, staged files, and unrelated-change isolation evidence |

If this draft conflicts with published Repository Authority, published Repository Authority controls and this draft must be corrected or rejected.

---

## 4. Canonical IWP-006 Metadata

| Field | Value |
|-------|-------|
| Identifier | IWP-006 |
| Title | Frontend Auth And API Client Stabilization |
| Stage | I4 Domain metadata |
| Objective | Align future client auth state, route guards, token handling, API clients, and denial handling with frontend/auth/API authority |
| Owner Authorities | Frontend Architecture; API Standards; Authentication Architecture; Authorization Architecture |
| Required Authorities | Frontend Architecture; API Standards; Authentication Architecture; Authorization Architecture; Implementation Governance |
| Dependencies | IWP-004 |
| Proposed repository areas | `frontend/context/`; `frontend/lib/`; `frontend/services/`; `frontend/components/*Route.tsx`; `frontend/types/` |
| Change classes | Frontend/presentation; Authentication; Authorization; Access/API |
| Scope | Frontend auth context, API clients, route guards, types, and tests if separately authorized |
| Out of scope | Backend implementation; role taxonomy changes; client-side authorization authority; release or deployment |
| Required evidence | Lint/build/test evidence or unavailable report, authority trace, security review where required |
| Acceptance conditions | Client remains non-authoritative and route reachability matches backend/domain authority |
| Stop conditions | Stop if client state becomes authority, auth boundary conflicts, token storage risk lacks review, or backend scope is required without authority |
| Release posture | Release deferred; client stabilization is not release, deployment, or production authority |
| Residual risk | Browser/session storage posture may require security review |
| Current status | PROPOSED - INACTIVE - IWP-004 DEPENDENCY SATISFIED BY ACCEPTANCE - NOT SELECTED - NOT EXECUTABLE - NOT IMPLEMENTATION AUTHORITY - NOT RELEASE AUTHORITY |
| Proposed amendment status (DRAFT - NOT EFFECTIVE) | SELECTED - ACTIVE - READ-ONLY DISCOVERY AUTHORIZED - TECHNICAL IMPLEMENTATION NOT AUTHORIZED - ACCEPTANCE NOT GRANTED - RELEASE DEFERRED |

Owner Authorities and Required Authorities are distinct. Frontend Architecture, API Standards, Authentication Architecture, and Authorization Architecture own the package meaning and review boundary. Implementation Governance is required authority for the work package model, authorization act requirements, evidence, gates, and stop conditions.

---

## 5. Dependency Verification

IWP-006 hard dependency is satisfied for future package-level governance consideration:

| Dependency | Evidence | Status |
|------------|----------|--------|
| IWP-004 | `docs/implementation/IWP_004_FINAL_ACCEPTANCE_REPORT.md`; accepted implementation checkpoint `0d524257daf8bc44724022a725f05a5c329f67a7`; closure and post-push continuity synchronized | ACCEPTED - CLOSED |

Dependency satisfaction alone does **not** select, activate, authorize, or make IWP-006 executable.

IWP-004 closure, required continuity synchronization, and authorized fast-forward push to `origin/main` are complete as recorded by Repository Authority at continuity commit `74de50e64751e89bb9c51855e5a3688d8072bde4`.

No other register-recorded hard dependency applies to IWP-006.

---

## 6. Candidate Posture

IWP-006 is candidate-eligible for future package-level selection governance because:

1. IWP-004 is accepted and closed;
2. the IWP-004 dependency is satisfied by acceptance;
3. active implementation packages are 0;
4. authorized technical implementation packages are 0;
5. Stage I4 remains IN PROGRESS;
6. the Stage I4 execution authorization boundary is published and effective as a boundary only;
7. required owner authorities for IWP-006 are published;
8. IWP-007 remains inactive under its IWP-003, IWP-004, IWP-006, and IWP-008 coordination dependencies;
9. IWP-008 remains inactive under its coordination and prerequisite dependencies;
10. no Stage I5 or Stage I6 package is selected, active, executable, implementation-authorized, or executing.

Candidate posture is not selection, activation, discovery authorization, implementation authorization, or execution.

---

## 7. Proposed Selection Boundary — Amendment Draft

This section records the proposed selection boundary for publication of this amendment draft. **Selection is NOT EFFECTIVE until amendment publication.**

Publication-time selection would occur only if all conditions below are verified from fresh live Git evidence at amendment publication time:

1. this amendment draft has completed independent review with outcome APPROVED or equivalent published review route;
2. amendment approval integration is complete;
3. amendment publication integration and publication checkpoint are complete;
4. the base instrument remains published and effective as the IWP-006 package authority instrument;
5. base instrument continuity synchronization remains complete at `74de50e64751e89bb9c51855e5a3688d8072bde4`;
6. Stage I4 remains authorized and IN PROGRESS;
7. IWP-004 remains ACCEPTED - CLOSED;
8. IWP-006 register dependencies remain satisfied;
9. the repository baseline remains valid and synchronized as required;
10. no conflicting package is selected, active, executable, implementation-authorized, or executing;
11. active implementation packages remain 0 immediately before selection effect;
12. authorized technical implementation packages remain 0 immediately before selection effect;
13. no unresolved blocker recorded by Repository Authority prevents selection;
14. unrelated working-tree changes are isolated and excluded from the publication act;
15. selection/discovery readiness decision remains PASS or is re-verified at publication time.

**Proposed amendment records IWP-006 as SELECTED upon future publication.** This amendment draft does **not** select IWP-006.

Selection would identify IWP-006 as the chosen package for activation and bounded read-only discovery authorization. Selection alone would not authorize discovery execution, technical implementation, acceptance, push, release, deployment, production access, or Phase 4.

---

## 8. Proposed Activation Boundary — Amendment Draft

This section records the proposed activation boundary for publication of this amendment draft. **Activation is NOT EFFECTIVE until amendment publication.**

Publication-time activation would occur only if all conditions below are verified from fresh live Git evidence at amendment publication time:

1. all proposed selection boundary conditions in §7 are satisfied;
2. IWP-006 is recorded as SELECTED by this same published amendment or an explicitly linked prior effective selection act permitted by Repository Authority;
3. active implementation packages remain 0 immediately before activation effect;
4. authorized technical implementation packages remain 0 immediately before activation effect;
5. IWP-006 would become the only selected and active implementation package;
6. no parallel package execution condition exists;
7. single-active-package enforcement per `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` §8 is preserved;
8. applicable continuity synchronization requirements are satisfied if Repository Authority requires them for the publication act.

**Proposed amendment records IWP-006 as ACTIVE — ONLY SELECTED AND ACTIVE PACKAGE upon future publication.** This amendment draft does **not** activate IWP-006.

Activation would open the IWP-006 package lifecycle for bounded read-only discovery authorization contained in this same published amendment. Activation alone would not authorize discovery execution, technical implementation, exact write set establishment, acceptance, push, release, deployment, production access, or Phase 4.

---

## 9. Proposed Lifecycle Decisions Upon Amendment Publication

This section records separate ordered lifecycle decisions proposed for publication of this amendment draft. **No decision below is effective from this draft preparation.** Effectiveness requires amendment review, approval, publication, and fresh Git re-verification.

| Decision | Proposed posture upon amendment publication | Does not authorize |
|----------|---------------------------------------------|--------------------|
| Package selection | SELECTED | Another package, technical implementation, acceptance |
| Package activation | ACTIVE - ONLY SELECTED AND ACTIVE PACKAGE | Another active package, technical implementation, acceptance |
| Read-only discovery authorization | AUTHORIZED - NOT STARTED | File modification, implementation, tests, technical execution |
| Technical implementation authorization | NOT AUTHORIZED - NOT STARTED | Exact write set, execution, acceptance, push, release, deployment |
| Execution and acceptance | Discovery execution may occur only in a later separate bounded action; acceptance NOT GRANTED | Technical execution, acceptance, push, release, deployment, production, Phase 4 |

Technical implementation authority remains absent from this amendment draft. The exact technical write set is NOT ESTABLISHED.

Upon future amendment publication, IWP-006 would become the only selected and active implementation package. Active implementation packages would become 1 - IWP-006. Authorized technical implementation packages would remain 0.

---

## 10. Bounded Read-Only Discovery Boundary — Amendment Draft

This section records the bounded read-only discovery authority proposed for publication of this amendment draft.

**This amendment draft does not authorize or start discovery.** Discovery execution remains NOT STARTED and may occur only in a later separate bounded action after amendment publication.

Upon future amendment publication, bounded read-only discovery would be authorized within this published discovery boundary. A later separate bounded read-only discovery action must determine without changing files:

1. current frontend auth context and session-state inventory;
2. route guard and protected-route behavior inventory;
3. token handling, storage, refresh, logout, and renewal posture;
4. API client construction, error handling, and denial presentation behavior;
5. type definitions supporting auth and API client flows;
6. alignment with Frontend Architecture, API Standards, Authentication Architecture, and Authorization Architecture;
7. browser or session storage risks and security review triggers;
8. overlap risk with IWP-007 and IWP-008;
9. exact future technical write set candidates;
10. lint/build/test and evidence requirements;
11. backend, dependency, configuration, migration, CI, infrastructure, and production impact;
12. unavailable evidence and stop conditions.

### 10.1 Exact discovery surfaces

Discovery, if later authorized by amendment publication and executed in a separate bounded action, would be read-only and limited to these register-derived surfaces only:

1. `frontend/context/`
2. `frontend/lib/`
3. `frontend/services/`
4. `frontend/components/*Route.tsx`
5. `frontend/types/`

These surfaces are register-derived boundaries. They do not authorize inspection, modification, execution, or acceptance in this amendment draft.

### 10.2 Discovery exclusions

Discovery must not:

1. modify source code, tests, migrations, manifests, lockfiles, configuration, CI, infrastructure, or release artifacts;
2. perform refactoring, bug fixes, or normalization;
3. establish technical implementation authority;
4. establish an exact technical write set as authorized;
5. alter Git history, staging, commits, tags, or remote refs;
6. inspect or modify backend, database, deployment, or production systems unless separate authority exists;
7. change the Work Package Register or continuity surfaces;
8. select, activate, or accept IWP-006 by itself.

Discovery must produce a separate discovery evidence report for later assessment. A separate decision is required after discovery evidence is reviewed before any implementation authorization may be considered.

This amendment draft must not claim that discovery has occurred or is authorized for execution.

---

## 11. Future Technical Boundary — Explicitly Not Authorized

This amendment draft does not authorize technical implementation.

The register-derived future technical areas for IWP-006 are:

1. `frontend/context/`
2. `frontend/lib/`
3. `frontend/services/`
4. `frontend/components/*Route.tsx`
5. `frontend/types/`

These are proposed repository areas only. They are not an exact future write set and do not authorize inspection, modification, execution, or acceptance in this amendment draft.

Exact technical writes require, in separate later actions:

1. completed and authorized read-only discovery;
2. a separately recorded exact technical write set;
3. explicit technical implementation authorization for that exact write set;
4. a later separately authorized implementation action.

This amendment draft must not be interpreted as authorization to change frontend auth surfaces, API clients, route guards, types, tests, backend files, migrations, models, dependency files, lockfiles, CI, runtime configuration, infrastructure, production systems, deployment artifacts, release artifacts, or Phase 4 surfaces.

---

## 12. Conditional Authority Rules

Conditional authority requirements for future IWP-006 work:

| Condition discovered later | Required route |
|----------------------------|----------------|
| Token persistence or browser storage of authentication material change | Stop; require separate security review before any later authority |
| Access-token, refresh-token, session, logout, or renewal semantic change | Stop; require separate authentication/security review |
| Frontend state becoming authentication or authorization authority | Stop; route to product, authorization, and security authority |
| Backend, API-contract, or domain-behavior change required | Stop; route to separate backend or API authority |
| Dependency, manifest, lockfile, package manager, or runtime configuration change | Stop; route to separate dependency/configuration authority |
| Database migration or persistence change | Stop; route to separate migration/persistence authority |
| Infrastructure, CI/CD, deployment, production, release, launch, or scaling need | Stop; route to separate operational authority |
| IWP-007 or IWP-008 overlap | Stop; route to split, sequencing, or coordination authority |
| Code-to-Architecture Audit or Implementation Gap Register need | Stop; route to separate governance authority |

No conditional authority is granted by this amendment draft.

---

## 13. Frontend, Authentication, And API Requirements For Future Implementation

Future IWP-006 implementation, if separately authorized after discovery and explicit implementation authorization, must preserve published authority requirements at a governance level:

1. the client remains non-authoritative for authorization decisions;
2. route reachability and denial presentation must match backend and domain authority;
3. token and session handling must not weaken Authentication Architecture or Authorization Architecture boundaries;
4. API client behavior must preserve API Standards error, denial, and contract discipline;
5. frontend presentation must preserve Frontend Architecture ownership boundaries;
6. browser or session storage changes require explicit security review before implementation authorization;
7. contact-source, role, visibility, and moderation truth must not be redefined by client state.

This amendment draft does not authorize future implementation and does not inspect implementation surfaces.

---

## 14. Evidence And Reporting Requirements

Future IWP-006 package evidence must include, where applicable and separately authorized:

1. starting repository state and authority trace;
2. exact discovery or implementation surfaces reviewed or changed;
3. exact changed-file scope if implementation is later authorized;
4. frontend lint/build/test evidence or honest unavailable evidence;
5. route guard and auth-flow review evidence;
6. API client and denial-handling review evidence;
7. authentication and authorization boundary review evidence;
8. security review evidence where token or session storage is implicated;
9. overlap assessment with IWP-007 and IWP-008;
10. residual risks and release separation;
11. one final block review if implementation occurs;
12. targeted correction of concrete findings only;
13. delta validation after corrections;
14. separate formal acceptance action.

Evidence must report unrun checks honestly as NOT RUN or unavailable. Passing checks alone cannot override missing authority.

For this amendment draft only, the required output of amendment draft preparation is this non-effective amendment draft within the instrument. No discovery or implementation evidence is created by amendment draft preparation.

---

## 15. Validation Requirements

Validation for this draft and any future publication route must use the smallest Repository Standards validation scope that guarantees correctness:

| Phase | Proposed validation scope |
|-------|---------------------------|
| Amendment draft review | Targeted Validation of this amendment draft against register metadata, Stage I4 boundary, owner authorities, dependency evidence, lifecycle separation, single-active-package rule, and security stop conditions |
| Amendment publication review | Targeted Validation or Scoped Validation as required by Repository Authority |
| Future discovery | Targeted Validation of discovery evidence and boundary preservation |
| Future implementation | Scoped Validation at minimum for frontend/auth/API/security surfaces |

Amendment draft preparation alone does not satisfy review, publication, discovery, implementation, or acceptance validation gates.

---

## 16. Publication And Effectiveness Boundary

### 16.1 Base instrument — published and effective

The base instrument is published and effective as the IWP-006 package authority instrument only. It is not selection, activation, discovery execution, or implementation authorization.

| State | Current value |
|-------|---------------|
| Draft authored | YES |
| Reviewed | YES - INDEPENDENT REVIEW PASS |
| Approved | YES - APPROVAL INTEGRATION COMPLETE |
| Published | YES |
| Effective | YES - AS IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY |
| Binding | YES - PACKAGE AUTHORITY INSTRUMENT BOUNDARY ONLY |
| IWP-006 package selected | NO |
| IWP-006 package activated | NO |
| Discovery execution authorized | NO |
| Technical implementation authorized | NO |

Completed base-instrument lifecycle:

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Independent targeted read-only review | COMPLETE - PASS |
| 2 | Targeted correction if required | NOT REQUIRED |
| 3 | Targeted correction delta review if corrections are made | NOT APPLICABLE |
| 4 | Approval integration if review approves | COMPLETE - APPROVED FOR PUBLICATION CHECKPOINT |
| 5 | Publication integration and publication checkpoint | COMPLETE |
| 6 | Local Git checkpoint with traceable message | COMPLETE at `fe64f2bce9bcf1e6b2df287593497c7e03c99827` |
| 7 | Continuity synchronization if required by Repository Authority | COMPLETE at `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| 8 | Post-publication verification | COMPLETE - PASS |
| 9 | Selection/discovery readiness decision | COMPLETE - PASS |

### 16.2 Amendment draft — not published and not effective

The amendment draft prepared in this document is **NOT REVIEWED, NOT APPROVED, NOT PUBLISHED, and NOT EFFECTIVE.**

| State | Current value |
|-------|---------------|
| Amendment draft authored | YES |
| Amendment reviewed | NO |
| Amendment approved | NO |
| Amendment published | NO |
| Amendment effective | NO |
| Proposed IWP-006 package selected | DRAFT ONLY — NOT EFFECTIVE |
| Proposed IWP-006 package activated | DRAFT ONLY — NOT EFFECTIVE |
| Proposed discovery authorization | DRAFT ONLY — NOT EFFECTIVE |
| Discovery execution authorized | NO |
| Technical implementation authorized | NO |

Amendment lifecycle:

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Amendment draft preparation | COMPLETE - DRAFT ONLY |
| 2 | Independent targeted read-only review of amendment draft | NOT RUN |
| 3 | Targeted correction if required | NOT RUN |
| 4 | Targeted correction delta review if corrections are made | NOT APPLICABLE |
| 5 | Amendment approval integration if review approves | NOT RUN |
| 6 | Amendment publication integration and publication checkpoint | NOT RUN |
| 7 | Local Git checkpoint with traceable message | NOT APPLICABLE until separately authorized publication action |
| 8 | Separate continuity synchronization if required by Repository Authority | NOT RUN |
| 9 | Separate bounded read-only discovery execution action | NOT RUN |
| 10 | Separate explicit authorization for any later technical implementation action | NOT RUN |

Amendment publication is separate from amendment draft preparation. Git checkpoint is separate from continuity synchronization. Push beyond any future amendment publication commit is a separate explicitly authorized act and is not authorized by this amendment draft.

### 16.3 Base instrument publication integration checklist

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Independent review PASS | COMPLETE |
| 2 | Publication-readiness decision PASS | COMPLETE |
| 3 | Approval integration complete | COMPLETE |
| 4 | Fresh Git baseline re-verification at publication time | COMPLETE |
| 5 | Unrelated working-tree isolation at publication time | COMPLETE |
| 6 | Stage I4 remains IN PROGRESS | VERIFIED |
| 7 | IWP-004 remains ACCEPTED - CLOSED | VERIFIED |
| 8 | Active implementation packages remain 0 immediately before publication | VERIFIED |
| 9 | Authorized technical implementation packages remain 0 immediately before publication | VERIFIED |
| 10 | Publication integration | COMPLETE |
| 11 | Publication checkpoint per `docs/engineering/REPOSITORY_STANDARDS.md` §7.6 | COMPLETE |
| 12 | Git checkpoint with traceable message | COMPLETE at `fe64f2bce9bcf1e6b2df287593497c7e03c99827` |
| 13 | Continuity synchronization if required by Repository Authority | COMPLETE at `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| 14 | Post-publication verification | COMPLETE - PASS |

### 16.4 Amendment publication integration checklist

| Step | Requirement | Status |
|------|-------------|--------|
| 1 | Selection/discovery readiness decision PASS | COMPLETE |
| 2 | Amendment draft preparation complete | COMPLETE - DRAFT ONLY |
| 3 | Independent review of amendment draft | NOT RUN |
| 4 | Amendment approval integration complete | NOT RUN |
| 5 | Fresh Git baseline re-verification at amendment publication time | NOT RUN |
| 6 | Unrelated working-tree isolation at amendment publication time | NOT RUN |
| 7 | Stage I4 remains IN PROGRESS | TO BE VERIFIED AT PUBLICATION |
| 8 | IWP-004 remains ACCEPTED - CLOSED | TO BE VERIFIED AT PUBLICATION |
| 9 | Active implementation packages remain 0 immediately before selection/activation effect | TO BE VERIFIED AT PUBLICATION |
| 10 | Authorized technical implementation packages remain 0 immediately before selection/activation effect | TO BE VERIFIED AT PUBLICATION |
| 11 | Amendment publication integration | NOT RUN |
| 12 | Amendment publication checkpoint per `docs/engineering/REPOSITORY_STANDARDS.md` §7.6 | NOT RUN |
| 13 | Git checkpoint with traceable message | NOT APPLICABLE until separately authorized publication action |
| 14 | Continuity synchronization if required by Repository Authority | NOT RUN |

---

## 17. Single-Active-Package Enforcement

Only one implementation package may be selected, activated, implementation-authorized, or executing at a time unless published Repository Authority later explicitly authorizes a different model.

Before any future amendment activation effect, publication must verify:

1. active implementation packages remain 0;
2. authorized technical implementation packages remain 0;
3. no other package is selected, active, executable, implementation-authorized, or executing;
4. unrelated working-tree changes are isolated and excluded;
5. IWP-007, IWP-008, Stage I5 packages, and Stage I6 packages remain inactive;
6. IWP-006 would become the only selected and active implementation package.

Upon future amendment publication, active implementation packages would become 1 - IWP-006. Authorized technical implementation packages would remain 0.

Parallel package execution is a stop condition.

---

## 18. Security Triggers And Mandatory Stop Conditions

Work must stop and require separate review before any future IWP-006-related action if any condition applies:

1. introduction or change of token persistence;
2. change to browser storage of authentication material;
3. change to access-token, refresh-token, session, logout, or renewal semantics;
4. weakening of authentication or authorization boundaries;
5. frontend state becoming an authentication or authorization authority;
6. requirement for backend or API-contract modification;
7. introduction or change of a dependency or lockfile;
8. modification of runtime configuration;
9. requirement for a database migration;
10. effect on infrastructure, CI/CD, deployment, or production;
11. expansion beyond the registered IWP-006 surfaces in §10.1;
12. conflict with published Frontend Architecture, API Standards, Authentication Architecture, Authorization Architecture, Security Standards, or Implementation Governance;
13. requirement to execute another Work Package without separate authority;
14. revelation of a material repository-state or authority contradiction;
15. repository baseline differs from expected authority state;
16. staged or unrelated working-tree items cannot be isolated;
17. scope is ambiguous;
18. owner or required authority is missing, unpublished, conflicting, or insufficient;
19. package overlap with IWP-007 or IWP-008 is identified;
20. parallel package execution would occur;
21. exact future write set is unbounded;
22. implementation would exceed a later authorized write set;
23. Code-to-Architecture Audit or Implementation Gap Register creation becomes necessary;
24. push, tag, GitHub Release, deployment, release, public launch, scaling, production access, or Phase 4 is requested without separate authority.

This amendment draft does not perform the security review and does not choose a token-storage solution.

---

## 19. Technical Implementation Prohibition

This amendment draft explicitly prohibits:

1. technical implementation;
2. source-code changes;
3. refactoring;
4. bug fixes;
5. test creation or modification;
6. dependency or lockfile changes;
7. backend or API changes;
8. migration changes;
9. configuration changes;
10. CI/CD or infrastructure changes;
11. establishment of an exact technical write set;
12. acceptance or closure of IWP-006;
13. discovery execution;
14. effective selection or activation of IWP-006 by this draft preparation action.

Technical implementation may be considered only through a later separate authority after bounded discovery evidence has been produced and assessed.

Publication of a future approved amendment version would not by itself authorize technical implementation unless that future published text explicitly and separately authorizes an exact write set in a manner permitted by Repository Authority. This amendment draft does not contain such authorization.

---

## 20. Lifecycle Separation

The following separations must be preserved:

| Transition | Rule |
|------------|------|
| Draft | Not publication |
| Publication | Not discovery execution |
| Discovery | Not implementation authorization |
| Implementation | Not acceptance |
| Acceptance | Not closure |
| Closure | Not push |
| Push | Not a GitHub Release |
| Release | Not deployment |
| Deployment | Not public launch |
| Public launch | Not authorization to scale |

This amendment draft must not:

1. complete Stage I4;
2. start Phase 4;
3. create release authority;
4. create deployment, production, launch, or scaling authority;
5. alter IWP-007 or IWP-008;
6. reopen IWP-004 or IWP-005;
7. modify the Work Package Register or continuity surfaces;
8. make selection, activation, or read-only discovery authorization effective.

---

## 21. Explicit Exclusions

This amendment draft does not authorize:

1. effective IWP-006 selection;
2. effective IWP-006 activation;
3. IWP-006 discovery execution;
4. IWP-006 technical implementation;
5. IWP-006 technical write set establishment;
6. IWP-006 acceptance;
7. another package;
8. implementation files;
9. tests;
10. migrations, models, schemas, or persistence changes;
11. dependency manifests or lockfiles;
12. backend work;
13. CI, runtime configuration, or infrastructure work;
14. secret or production access;
15. deployment;
16. release;
17. tag creation;
18. GitHub Release creation;
19. launch;
20. scaling;
21. push;
22. Phase 4 Product Development Methodology;
23. modification of any repository file other than this instrument during amendment draft preparation;
24. amendment publication, approval, or effectiveness;
25. register or continuity surface updates.

---

## 22. Exact Next Lifecycle Action After Amendment Draft Preparation

After preparation of this amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only review of this amendment draft in `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against controlling Repository Authority, register metadata, Stage I4 boundary, IWP-004 dependency evidence, single-active-package rule, discovery boundary, and security stop conditions.

That review must not approve, publish, or make the amendment effective; must not select or activate IWP-006; must not authorize or perform discovery or implementation; must not update the Work Package Register or continuity surfaces unless separately authorized; and must not deploy, release, launch, or scale.

---

## 23. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Base instrument status | PUBLISHED - EFFECTIVE |
| Base instrument effectiveness | EFFECTIVE AS IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY |
| Base instrument binding authority | ACTIVE - IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY - NOT SELECTION - NOT ACTIVATION - NOT DISCOVERY EXECUTION - NOT IMPLEMENTATION AUTHORIZATION |
| Amendment status | DRAFT - NOT REVIEWED - NOT APPROVED - NOT PUBLISHED - NOT EFFECTIVE |
| Proposed amendment binding authority | ACTIVE - IWP-006 SELECTION, ACTIVATION, AND READ-ONLY DISCOVERY AUTHORIZATION ONLY (DRAFT ONLY) |
| Base instrument publication date | 2026-07-22 |
| Base instrument publication commit | `fe64f2bce9bcf1e6b2df287593497c7e03c99827` |
| Base instrument continuity synchronization | COMPLETED at `74de50e64751e89bb9c51855e5a3688d8072bde4` |
| Amendment commit | NOT APPLICABLE until separately authorized publication action |
| IWP-006 (current live posture) | PROPOSED - INACTIVE - NOT SELECTED - NOT ACTIVATED - NOT AUTHORIZED - NOT EXECUTABLE |
| IWP-006 (proposed amendment posture — DRAFT) | SELECTED - ACTIVE - READ-ONLY DISCOVERY AUTHORIZED - TECHNICAL IMPLEMENTATION NOT AUTHORIZED |
| Discovery (current live) | NOT AUTHORIZED - NOT STARTED |
| Discovery (proposed amendment — DRAFT) | AUTHORIZED - NOT STARTED |
| Technical implementation | NOT AUTHORIZED - NOT STARTED |
| Exact technical write set | NOT ESTABLISHED |
| Acceptance | NOT GRANTED |
| Base instrument independent review | COMPLETED - PASS |
| Base instrument review findings | BLOCKING 0; NON-BLOCKING 0 |
| Amendment independent review | NOT RUN |
| Amendment review findings | NOT RUN |
| Selection/discovery readiness decision | COMPLETED - PASS |
| Base instrument publication-readiness decision | COMPLETED - PASS |
| Base instrument pre-publication validation | COMPLETED - PASS |
| Base instrument approval integration | COMPLETED - APPROVED FOR PUBLICATION CHECKPOINT |
| Amendment approval integration | NOT RUN |
| Base instrument publication integration | COMPLETED |
| Amendment publication integration | NOT RUN |
| Base instrument publication checkpoint | COMPLETED |
| Amendment publication checkpoint | NOT RUN |
| Base instrument Git checkpoint | COMPLETED at `fe64f2bce9bcf1e6b2df287593497c7e03c99827` |
| Base instrument post-publication verification | COMPLETE - PASS |
| Amendment continuity synchronization | NOT RUN |
| Stage I4 | IN PROGRESS |
| IWP-004 | ACCEPTED - CLOSED |
| Active implementation packages (current live) | 0 |
| Active implementation packages (proposed amendment — DRAFT) | 1 - IWP-006 |
| Authorized technical implementation packages | 0 |
| Push beyond any future amendment publication checkpoint | NOT AUTHORIZED |
| Deployment | NOT AUTHORIZED |
| Release | NOT AUTHORIZED |
| Phase 4 | NOT STARTED |
