# IWP-006 Execution Authorization Artifact

**Status:** PUBLISHED - EFFECTIVE (base instrument) · AMENDMENT DRAFT - NOT REVIEWED - NOT APPROVED - NOT PUBLISHED - NOT EFFECTIVE
**Authority class:** IWP package authority artifact
**Base instrument binding authority:** ACTIVE - IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY - NOT SELECTION - NOT ACTIVATION - NOT DISCOVERY EXECUTION - NOT IMPLEMENTATION AUTHORIZATION
**Proposed amendment binding authority (DRAFT - NOT EFFECTIVE):** ACTIVE - IWP-006 SELECTION, ACTIVATION, AND READ-ONLY DISCOVERY AUTHORIZATION ONLY
**Effectiveness:** EFFECTIVE AS IWP-006 PACKAGE AUTHORITY INSTRUMENT ONLY — amendment draft is NOT EFFECTIVE
**Independent review:** COMPLETED - PASS (base instrument)
**Second amendment independent review:** COMPLETED - PASS
**Second amendment review evidence:** `docs/implementation/reviews/IWP_006_SECTION_24_INDEPENDENT_REVIEW.md`
**Second amendment reviewed digest:** `70653a41d1ea92960837b8836a2004582b798c923a120e4c5db51392f43ff02e`
**Second amendment publication-readiness decision:** COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION
**Second amendment publication integration:** COMPLETED
**Second amendment effectiveness:** EFFECTIVE AS F-001 SECURITY REVIEW AUTHORIZATION ONLY — NOT SECURITY REVIEW EXECUTION — NOT IMPLEMENTATION AUTHORIZATION
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

---

## 24. Second Amendment — Bounded Token-Storage Security Review For F-001

**Amendment title:** IWP-006 Bounded Token-Storage Security Review Amendment (F-001)

**Amendment status:** PUBLISHED - EFFECTIVE (F-001 SECURITY REVIEW AUTHORIZATION ONLY)

**Independent review:** COMPLETED - PASS — evidence `docs/implementation/reviews/IWP_006_SECTION_24_INDEPENDENT_REVIEW.md`

**Publication-readiness decision:** COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION

**Security review execution:** NOT AUTHORIZED BY THIS PUBLICATION — NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED

**Exact technical write set:** NOT ESTABLISHED

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This second amendment is effective only as authorization for a separately executed bounded read-only token-storage security review under §24. It does **not** execute that review, select a storage or transport architecture, authorize technical implementation, establish a technical write set, accept or close IWP-006, or authorize push, release, deployment, or launch.

Publication of this amendment is not review execution, security decision acceptance, implementation authorization, or acceptance.

### 24.1 Identity And Relationship

| Field | Value |
|-------|-------|
| Amendment identity | Second amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Bounded Token-Storage Security Review Amendment (F-001) |
| Package relationship | Subordinate IWP-006 package-level bounded sub-activity |
| Finding relationship | Addresses F-001 only from accepted `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` |
| Standalone governance lifecycle | **Not created** — no separate permanent authorization instrument |
| Precondition | Accepted discovery evidence publication at commit `34f1d7c6520274ceacbcea12bb92806f58fce48e` |
| IWP-006 posture preserved | SELECTED - ACTIVE |
| Stage I4 posture preserved | IN PROGRESS |
| Phase 4 posture preserved | NOT STARTED |

This amendment draft is a bounded package sub-activity authorization proposal only. It does not create a standalone governance lifecycle, program, stage, or permanent Repository Authority entity.

### 24.2 Authority Basis

The future token-storage security review requirement is traced only to the authorities below:

| Authority or evidence | Role |
|-----------------------|------|
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` F-001 | VERIFIED finding: access token persisted in browser-accessible storage; requires storage posture review before implementation authorization |
| This instrument §12 | Token persistence or browser storage of authentication material requires separate security review before any later authority |
| This instrument §13.6 | Browser or session storage changes require explicit security review before implementation authorization |
| This instrument §14.8 | Security review evidence required where token or session storage is implicated |
| This instrument §18 | Security triggers and mandatory stop conditions for token persistence and browser storage |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | Records mandatory token-storage security review before separate technical implementation authorization; IWP-006 SELECTED - ACTIVE - READ-ONLY DISCOVERY COMPLETED |
| `docs/design/CURSOR_HANDOFF.md` | Records same mandatory precondition and IWP-006 active posture |
| `docs/engineering/SECURITY_STANDARDS.md` | Security policy, trust boundaries, credential and secret governance consumed for review assessment |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | Identity context, session authority, and client non-authority consumed for review assessment |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | Client non-authority and authorization decision boundaries consumed for review assessment |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-GATE-5 | Security review is a blocking gate before acceptance when auth, secrets, or trust boundaries are implicated |
| `docs/implementation/IWP_002_SECURITY_LIFECYCLE_DECISION.md` | Structural precedent for bounded security sub-activity evidence/decision within package lifecycle — not a mandate for standalone authorization instrument |
| `docs/engineering/REPOSITORY_STANDARDS.md` §11.6 | Targeted Validation applies to bounded sub-activities |

No authority above mandates a standalone permanent authorization artifact for this review.

### 24.3 Review Objective

Upon future separate publication of this amendment and a later separately authorized bounded execution action, the future independent read-only token-storage security review must produce a solution-neutral security decision covering:

1. browser-accessible bearer-token persistence posture;
2. browser and session trust boundaries applicable to the observed token path;
3. exposure consequences within the current authentication model recorded by accepted discovery evidence;
4. token creation, retrieval, attachment, removal, and logout boundaries within permitted surfaces;
5. missing, expired, invalid, or rejected token behavior observable within permitted surfaces;
6. unauthorized-session recovery behavior observable within permitted surfaces;
7. client-side route guard assumptions versus server authority;
8. whether the current posture may be retained within published authority, must be corrected before technical implementation authorization, or requires additional bounded evidence before technical implementation authorization may be considered;
9. CSRF trust-boundary consequences of the observed bearer-header transport pattern compared with hypothetical cookie-based transport, as comparative analysis only;
10. HttpOnly, Secure, and SameSite cookie properties as a comparative trust-boundary analysis only, without selecting a transport or storage mechanism;
11. access-token lifetime, expiry, and session-duration behavior observable within permitted surfaces, including bounded limitations where lifetime semantics cannot be fully verified without excluded paths;
12. presence or absence of refresh-token and rotation behavior within permitted surfaces, including resulting governance or security implications observable from permitted evidence only.

The review must not select a remediation mechanism, storage product, token format, cookie policy, or exact code change.

### 24.4 Exact Future Evidence Boundary

Future token-storage security review execution, if separately authorized after amendment publication, is read-only and limited to **exactly** the nine paths below. Each path is justified only by accepted discovery evidence. No additional path may be opened without a separate scope amendment.

| Exact path | Review purpose | Discovery evidence basis |
|------------|----------------|--------------------------|
| `frontend/lib/tokenStorage.ts` | Primary F-001 surface: token key, storage medium, save/get/remove/hasToken API, SSR guard | F-001; discovery §5.1 |
| `frontend/lib/authFetch.ts` | Token retrieval via `getToken()`, bearer attachment, non-OK response handling including absence of 401 recovery | Discovery §5.1, §6.1 Pattern A |
| `frontend/context/AuthContext.tsx` | Login, logout, session restore, `saveToken`/`removeToken` coupling, client session truth derivation | Discovery §3.1, §5.1 |
| `frontend/services/authApi.ts` | Auth entrypoints using `authFetch` and raw `fetch`, login/logout-adjacent flows, structured vs generic error handling | Discovery §3.1, §6.1 Pattern C |
| `frontend/types/auth.ts` | Auth request/response and token-adjacent type definitions supporting reviewed flows | Discovery §7.1 |
| `frontend/types/user.ts` | Role and user shape used by auth context and route guards | Discovery §3.1, §4.1, §7.1 |
| `frontend/components/ProtectedRoute.tsx` | Authentication-only guard behavior and denied-session routing | Discovery §4.1 |
| `frontend/components/AdminRoute.tsx` | Authentication plus admin role guard behavior and denied-session routing | Discovery §4.1 |
| `frontend/components/RealtorRoute.tsx` | Authentication plus realtor role guard behavior and local role recompute | Discovery §4.1, F-004 |

**Explicitly excluded from this boundary:**

- `frontend/services/api.ts` and caller graph resolution (F-013 deferred);
- `frontend/services/favoritesApi.ts`, `frontend/context/FavoritesContext.tsx`, and other auth-adjacent but non-F-001 surfaces;
- imports, callers, pages, hooks, layouts, tests, configuration, backend, infrastructure, runtime, production, and secrets outside the exact list above.

Following imports, callers, or adjacent files outside this exact list is prohibited. Any additional surface requires a separate scope amendment.

### 24.5 Security-Review Questions

The future reviewer must answer precisely:

1. What authentication token material is persisted, and where?
2. Which browser contexts or scripts can access persisted token material?
3. How are tokens created, stored, retrieved, attached to requests, removed, and cleared on logout?
4. What happens when a token is missing, expired, invalid, or rejected within permitted surfaces?
5. What 401 and 403 behavior is observable within permitted surfaces, and is denial handling honest and bounded?
6. Do client-side route guards treat client state as authorization authority contrary to Authorization Architecture?
7. What visible role and account-state assumptions depend on client-side persisted or derived state?
8. Does the observed posture comply with published Security Standards, Authentication Architecture, and Authorization Architecture?
9. Is repository evidence sufficient for a security decision, or is additional bounded evidence required before technical implementation authorization may be considered?
10. Which conclusions are verified facts, evidence-based inferences, and unresolved uncertainties?
11. What CSRF trust-boundary consequences apply to the observed bearer-token-in-header pattern compared with hypothetical cookie-based transport, and how do those consequences differ, without selecting either mechanism?
12. How do HttpOnly, Secure, and SameSite properties compare as trust-boundary controls relative to the observed browser-accessible storage posture, as comparative analysis only?
13. What access-token lifetime, expiry, and session-duration behavior is observable within permitted surfaces, and where lifetime semantics cannot be fully verified within the nine-path boundary, what bounded limitation or missing evidence must be recorded instead of expanding scope?
14. Is refresh-token issuance, storage, rotation, or renewal behavior present within permitted surfaces; if absent, what governance or security implications follow from that absence within the observable client session model?

The reviewer must answer questions 11 through 14 analytically and read-only only. They must not select a target storage or transport mechanism, prescribe implementation, authorize cookie migration, authorize refresh-token implementation, expand inspection into backend or excluded paths, or require reading secrets. Where a topic cannot be fully verified within the nine permitted paths, the reviewer must record it as missing evidence or a bounded limitation instead of expanding scope.

The reviewer must not choose a remediation or storage mechanism.

### 24.6 Required Future Output

Future authorized review execution must produce exactly one temporary subordinate evidence artifact at:

`docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md`

That artifact is IWP-006 package evidence only. It is not independent permanent Repository Authority.

Required contents:

1. verified repository baseline at review start;
2. evidence inventory listing only exact permitted paths inspected;
3. per-question assessment mapped to §24.5;
4. separated facts, inferences, and uncertainties;
5. stable finding IDs and severity classifications;
6. authority-compliance assessment against Security Standards, Authentication Architecture, and Authorization Architecture;
7. residual risks;
8. blockers and stop conditions triggered or not triggered;
9. exactly one decision posture from §24.7;
10. explicit confirmation that no technical write set was established;
11. explicit confirmation that no implementation was authorized.

Publication of review evidence does not accept or close IWP-006 and does not authorize technical implementation.

### 24.7 Decision Postures

The future evidence artifact must record exactly one posture:

| Posture | Meaning |
|---------|---------|
| `CURRENT POSTURE ACCEPTABLE WITHIN PUBLISHED AUTHORITY` | Observed token-storage posture may remain for governance purposes pending separate technical implementation authorization |
| `SECURITY CORRECTION REQUIRED BEFORE IMPLEMENTATION AUTHORIZATION` | Technical implementation authorization must remain blocked until a separately authorized correction scope exists |
| `ADDITIONAL BOUNDED EVIDENCE REQUIRED` | Current exact boundary is insufficient; more bounded read-only evidence is required before a security decision can be finalized |
| `BLOCKED` | Review cannot proceed safely under current authority or repository state |

No posture may automatically:

- establish a technical write set;
- authorize implementation;
- accept or close IWP-006;
- complete Stage I4;
- start Phase 4.

### 24.8 Exclusions

This second amendment draft and any future authorized review under it exclude:

1. implementation changes;
2. exact remediation or storage-mechanism selection;
3. technical write-set definition;
4. F-013 caller-graph resolution;
5. backend implementation inspection;
6. database, migrations, and persistence inspection;
7. tests and fixtures;
8. dependencies and lockfiles;
9. runtime secrets and production data access;
10. infrastructure, CI/CD, and deployment;
11. release, launch, and scale decisions;
12. register, handoff, or roadmap updates unless separately authorized;
13. amendment publication, approval, or effectiveness by this draft preparation action.

### 24.9 Stop Conditions

The future reviewer must stop if:

1. repository baseline materially differs from verified authority state;
2. required authority is unavailable or contradictory;
3. necessary evidence lies outside the exact nine-path list in §24.4;
4. unrelated working-tree changes overlap an evidence source;
5. isolated read-only review cannot be guaranteed;
6. technical mutation becomes necessary to answer a review question;
7. runtime execution, production access, or secret-store access would be required;
8. the work would establish a write set or authorize implementation;
9. F-013 resolution or `frontend/services/api.ts` caller-graph analysis becomes necessary — route to separate scope amendment or IWP-007 coordination instead;
10. scope expansion beyond F-001 token-storage security posture is requested without separate authority.

### 24.10 Lifecycle Separation

The following separations are mandatory for this second amendment draft and any future authorized review under it:

| Transition | Rule |
|------------|------|
| Draft | Not publication |
| Publication | Not review execution |
| Review execution | Not acceptance |
| Accepted review evidence | Not a technical write set |
| Security decision | Not implementation authorization |
| Implementation authorization | Not implementation execution |
| Implementation completion | Not IWP acceptance |
| IWP closure | Not Stage I4 completion |
| Stage completion | Not Phase 4 commencement |
| Merge | Not release |
| Release | Not deployment |
| Deployment | Not launch |
| Launch | Not authorization to scale |

### 24.11 Future Review Controls

Any future token-storage security review execution authorized by publication of this amendment must:

1. remain independent and read-only;
2. verify a fresh remote baseline before inspection;
3. inspect only the exact nine permitted files in §24.4;
4. install no tools and run no applications;
5. preserve unrelated working-tree items untouched;
6. make no repository mutation during review execution;
7. return one evidence-backed verdict using exactly one posture from §24.7;
8. stop after review and reporting.

Independent review of the future evidence artifact is required before the security decision may be treated as accepted package evidence. That acceptance does not authorize implementation.

### 24.12 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Second amendment draft authored | YES — by draft preparation action |
| Second amendment reviewed | COMPLETED - PASS — `docs/implementation/reviews/IWP_006_SECTION_24_INDEPENDENT_REVIEW.md` |
| Second amendment publication-readiness decision | COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION |
| Second amendment approved | COMPLETED - APPROVED FOR BOUNDED PUBLICATION |
| Second amendment published | YES — by this publication execution |
| Second amendment effective | YES — AS F-001 SECURITY REVIEW AUTHORIZATION ONLY |
| Token-storage security review execution authorized by this publication | NO — separate bounded execution authorization required |
| Token-storage security review execution started | NO |
| Technical implementation authorized | NO |
| Exact technical write set established | NO |
| F-001 resolved | NO |
| F-013 deferred | YES |
| IWP-006 accepted or closed | NO |

Publication of this second amendment makes the bounded read-only token-storage security review scope in §24 effective as a permitted lifecycle authorization only. It does **not** authorize security-review execution by itself, does not authorize implementation, does not establish a technical write set, and does not accept or close IWP-006.

Any token-storage security review execution authorized after this publication must re-verify live Git evidence before inspection begins.

### 24.13 Validation Requirements

| Phase | Validation scope |
|-------|------------------|
| Second amendment draft review | COMPLETED - PASS |
| Second amendment publication review | COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION |
| Future token-storage security review evidence | Targeted Validation of evidence boundary, question coverage, posture honesty, and prohibition on remediation selection |
| Future technical implementation authorization | Separate later authority only; not authorized by this draft |

Second amendment draft preparation alone does not satisfy review, publication, security review execution, implementation, or acceptance validation gates.

---

## 25. Exact Next Lifecycle Action After Second Amendment Publication

After publication of the second amendment in §24, the exact next authorized action is:

Prepare and execute a separately authorized bounded read-only token-storage security review under §24, using the nine permitted inspection paths in §24.4, producing evidence at `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` as defined in §24.6.

That execution must verify a fresh repository baseline before inspection; must not expand beyond §24.4; must not select a remediation or storage mechanism; must not authorize technical implementation; must not establish a technical write set; must not resolve F-001 or accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; and must not deploy, release, launch, or scale.

Push of this publication commit remains NOT AUTHORIZED unless separately authorized.

---

## 26. Third Amendment Draft — Bounded F-001 Correction-Scope Authorization

**Amendment title:** IWP-006 Bounded F-001 Correction-Scope Authorization (Cookie Session Architecture)

**Amendment status:** DRAFT - NOT REVIEWED - NOT PUBLISHED - NOT EFFECTIVE

**Independent review:** NOT RUN

**Publication-readiness decision:** NOT RUN

**Backend read-only validation:** NOT AUTHORIZED - NOT STARTED

**Technical correction implementation:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED

**Exact technical write set:** NOT ESTABLISHED

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

**Target architecture posture:** SELECTED — HttpOnly Secure SameSite cookie-based authenticated session transport (architecture-decision report; not yet published in Repository Authority)

This third amendment draft defines only the **governed path** for F-001 correction-scope authorization. It does **not** authorize backend inspection, backend validation execution, application changes, remediation, technical implementation, a technical write set, F-001 resolution, IWP-006 acceptance or closure, push, release, deployment, or launch.

Drafting this amendment is not review, approval, publication, backend validation, correction execution, implementation authorization, or acceptance.

### 26.1 Identity And Relationship

| Field | Value |
|-------|-------|
| Amendment identity | Third amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Bounded F-001 Correction-Scope Authorization (Cookie Session Architecture) |
| Package relationship | Subordinate IWP-006 package-level bounded sub-activity |
| Finding relationship | Addresses F-001 correction path only; informed by SR-F001-001 through SR-F001-007 |
| Precondition — discovery | F-001 VERIFIED in `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` |
| Precondition — security review | Published evidence `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` @ commit `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |
| Precondition — security posture | `SECURITY CORRECTION REQUIRED BEFORE IMPLEMENTATION AUTHORIZATION` (§24.7) |
| Precondition — architecture decision | HttpOnly Secure SameSite cookie-based authenticated session transport (accepted architecture-decision report; not repository-published) |
| Standalone governance lifecycle | **Not created** |
| IWP-006 posture preserved | SELECTED - ACTIVE |
| Stage I4 posture preserved | IN PROGRESS |

### 26.2 Purpose And Governing Basis

This draft authorizes **neither** backend validation **nor** correction implementation.

Its purpose is to record:

1. the accepted target architecture posture for F-001 correction;
2. mandatory backend read-only validation subjects required before any technical write set or implementation authorization may be established;
3. decision gates that translate validated backend facts into a bounded future correction scope;
4. finding coverage, stop conditions, and lifecycle separation for the correction path.

| Authority or evidence | Role |
|-----------------------|------|
| This instrument §24 and published §24 evidence @ `fe73288…` | Completed frontend security review; §24.7 correction posture |
| `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` | SR-F001-001 through SR-F001-007; evidence limitations §6 |
| Accepted architecture-decision report | Target posture selection input (not controlling until separately published if required) |
| This instrument §12, §13.6, §14.8, §18 | Conditional security and storage-change gates |
| `docs/engineering/SECURITY_STANDARDS.md` | Trust boundaries, credential governance, CSRF/session policy consumption |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | AUTHN-SES-* session authority and client-copy reconciliation |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | AUTHZ-BND-3 client non-authority |
| `docs/engineering/API_STANDARDS.md` | Auth transport and error-contract discipline |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-GATE-5 | Security review before implementation when auth/trust boundaries implicated |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Evidence integrity; targeted validation |

### 26.3 Preserved Current State

| Item | Value |
|------|-------|
| F-001 | UNRESOLVED |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |
| Technical implementation authorization | NOT AUTHORIZED |
| Exact technical write set | NOT ESTABLISHED |
| Backend read-only validation | NOT AUTHORIZED BY THIS DRAFT |
| Correction implementation | NOT AUTHORIZED |
| Architecture posture in Repository Authority | **Not yet published** — selected only by accepted architecture-decision report |
| Published §24 security evidence | PUBLISHED @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |

### 26.4 Selected Target Architecture Posture

The governed correction target for F-001 is:

**HttpOnly Secure SameSite cookie-based authenticated session transport**

Architecture requirements (decision input only; not implementation authorization):

| Requirement | Architecture-level rule |
|-------------|-------------------------|
| Credential storage | **No** authentication material in JavaScript-readable persistent storage (`localStorage`, `sessionStorage`, or equivalent) |
| Browser session persistence | HttpOnly session and/or refresh cookie(s) within bounded lifetime |
| Authenticated request transport | Browser-managed cookie attachment to same-site API requests; no client-managed bearer secret in JS |
| Cookie attributes | `HttpOnly`; `Secure` in production; `SameSite=Lax` minimum (evaluate `Strict` during correction-scope decision) |
| CSRF | Explicit CSRF controls for cookie-authenticated mutating requests where SameSite alone is insufficient |
| Expiry | Bounded session lifetime mandatory |
| Renewal | Defined server renewal policy — sliding session and/or HttpOnly refresh credential with rotation (exact model decided after backend validation) |
| Logout | Server-coordinated session termination and cookie clearing |
| 401/403 reconciliation | Authoritative auth failure clears client presentation state and triggers re-establishment or login path |
| Role handling | Server-derived role facts only; client route guards remain presentation-only |
| Observability | Session lifecycle evidence without credential payload |

This draft does **not** select exact TTL values, refresh implementation details, endpoints, or file-level changes.

### 26.5 Mandatory Backend Read-Only Validation

Future separately authorized backend read-only validation **must** inspect only paths established in a validation authorization act and recorded in a validation evidence artifact before inspection begins.

This draft defines **validation subjects only**. It does **not** authorize inspection and does **not** name an executable path list.

#### 26.5.1 Mandatory validation subjects

| # | Subject | Validation purpose |
|---|---------|-------------------|
| 1 | Token or session issuance | Determine how authenticated sessions are created at login/register |
| 2 | Access-token TTL | Record bounded access/session lifetime semantics |
| 3 | Refresh-token issuance and TTL | Determine whether refresh exists; record lifetime if present |
| 4 | Refresh rotation semantics | Determine rotation/reuse detection if refresh exists |
| 5 | Revocation capability | Determine whether sessions/tokens can be invalidated server-side |
| 6 | Logout endpoint and invalidation behavior | Determine server logout contract and cookie clearing support |
| 7 | Cookie issuance or current lack thereof | Determine whether backend already sets HttpOnly/Secure/SameSite cookies |
| 8 | Authentication dependencies and request extraction | Determine how protected routes obtain actor context (header vs cookie) |
| 9 | CORS and credential policy | Determine compatibility with cookie `credentials` transport |
| 10 | CSRF-relevant backend controls | Determine existing CSRF mitigations applicable to cookie auth |
| 11 | `/users/me` or equivalent reconciliation contract | Determine session truth contract for client presentation sync |
| 12 | Server-side role and authorization enforcement | Confirm server enforcement exists independent of client guards |
| 13 | Observable session events | Confirm lifecycle events can be recorded without credential exposure |

#### 26.5.2 Permitted backend inspection classes (to be enumerated at validation authorization)

Future validation may inspect **read-only** backend surfaces limited to:

- authentication and login issuance modules;
- token/session configuration and lifetime settings;
- logout and revocation handlers;
- authentication middleware and dependency extraction;
- CORS and credential policy configuration (no secret values);
- CSRF-related middleware or settings;
- current-user/session reconciliation endpoints;
- role enforcement on protected routes (representative samples only).

Exact file paths must be listed in the validation evidence artifact **before** inspection begins. This draft does not enumerate paths.

#### 26.5.3 Explicit backend validation exclusions

- secrets, `.env`, credentials, production data, runtime execution, database contents;
- unrelated domain modules outside auth/session transport;
- frontend application code (already covered by published §24 evidence);
- infrastructure, CI/CD, deployment, migrations execution;
- implementation changes during validation.

### 26.6 Evidence Rules For Future Backend Validation

| Rule | Requirement |
|------|-------------|
| Observed vs absent | Distinguish observed backend facts from absence of evidence |
| No secrets | No secret values, credential material, or production data in evidence |
| Exact paths | Record exact inspected paths in validation evidence before and during review |
| Unavailable facts | Unavailable facts remain blockers — not assumptions |
| Architecture conflict | Backend facts incompatible with §26.4 posture must stop correction-scope progression |
| Non-prescriptive during validation | Validation records facts only; does not authorize implementation |

Future validation evidence artifact (path to be defined at validation authorization): temporary IWP-006 package evidence only; not permanent Repository Authority.

### 26.7 Decision Gates After Backend Validation

After separately authorized backend read-only validation and independent review of its evidence, a future correction-scope decision must:

| Gate | Decision output |
|------|-----------------|
| 1 | Compatibility assessment — selected cookie-session posture vs observed backend capability |
| 2 | Exact expiry/renewal model — sliding session vs refresh rotation vs re-auth-only |
| 3 | Logout and revocation requirements — server invalidation contract |
| 4 | CSRF strategy — SameSite sufficiency vs additional token requirement |
| 5 | Bounded technical write set — exact authorized correction surfaces only |
| 6 | Independent review — before any implementation authorization |

No gate may be combined. Validation alone does not establish a write set or authorize implementation.

### 26.8 Finding Coverage

| Finding | Severity | Draft disposition | Resolved by draft? |
|---------|----------|-------------------|--------------------|
| SR-F001-001 | HIGH | Target architecture eliminates JS-readable storage in correction scope | **NO** |
| SR-F001-002 | HIGH | Mandates authoritative 401/403 reconciliation in correction scope | **NO** |
| SR-F001-003 | MEDIUM | Requires server-coordinated logout in correction scope | **NO** |
| SR-F001-004 | MEDIUM | Requires bounded expiry/renewal architecture in correction scope | **NO** |
| SR-F001-005 | MEDIUM | Requires single cookie-based auth transport model in correction scope | **NO** |
| SR-F001-006 | LOW | Guard/context alignment may be addressed within bounded correction scope | **NO** |
| SR-F001-007 | LOW | Route guard UX may be addressed within bounded correction scope | **NO** |

No finding may be marked resolved, reclassified, or closed by this draft.

### 26.9 Stop Conditions

Future correction-scope progression must stop if:

1. repository baseline or authority materially differs from verified state;
2. backend session/token behavior remains ambiguous after bounded validation;
3. secret, credential, or production-data access would be required;
4. selected architecture posture conflicts with published Security, Authentication, or Authorization Architecture;
5. scope expands beyond F-001 cookie-session correction (including F-013 caller graph without separate authority);
6. future technical write set cannot be isolated and bounded;
7. cross-origin cookie requirements cannot be satisfied within published authority;
8. CSRF posture for cookie transport cannot be defined;
9. SR-F001-001 or SR-F001-002 remain unresolved at implementation authorization gate;
10. this draft conflicts with published Repository Authority;
11. backend validation or evidence review is skipped;
12. implementation authorization is requested before write set establishment.

### 26.10 Lifecycle Separation

| Stage | Rule |
|-------|------|
| Draft authoring (this task) | Not review |
| Independent targeted review | Not publication |
| Bounded publication | Not backend validation |
| Separately authorized backend validation | Not correction-scope decision |
| Backend validation evidence review | Not implementation authorization |
| Technical correction-scope decision | Not implementation execution |
| Implementation authorization | Not implementation execution |
| Correction execution | Not F-001 resolution claim |
| F-001 resolution | Not IWP-006 acceptance |
| IWP-006 acceptance | Not closure |
| Merge | Not release |
| Push | Not authorized by this draft |

### 26.11 Explicit Non-Authorization

This third amendment draft does **not** authorize:

- backend read-only validation execution;
- backend or frontend code inspection under this draft;
- application changes or remediation;
- technical implementation or correction execution;
- establishment of a technical write set;
- F-001 resolution;
- IWP-006 acceptance or closure;
- register, handoff, or continuity synchronization;
- staging, commit, push, merge, release, deployment, or launch beyond publication of a future approved amendment version.

Each later gate requires separate Repository Authority.

### 26.12 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Third amendment draft authored | YES — by this draft preparation action |
| Third amendment reviewed | NOT RUN |
| Third amendment published | NOT RUN |
| Third amendment effective | NOT RUN |
| Target architecture posture recorded | YES — as decision input in §26.4 |
| Backend read-only validation authorized | NO |
| Backend read-only validation started | NO |
| Correction-scope decision completed | NO |
| Technical write set established | NO |
| Technical implementation authorized | NO |
| F-001 resolved | NO |

---

## 27. Exact Next Lifecycle Action After F-001 Correction-Scope Authorization Draft Preparation

After preparation of this third amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only review of **Third Amendment Draft — Bounded F-001 Correction-Scope Authorization** in §26 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against controlling Repository Authority, published §24 evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`, accepted architecture-decision input, register posture, lifecycle separation, backend validation boundary, stop conditions, and prohibition on premature implementation authorization.

That review must not approve, publish, or make the amendment effective; must not authorize or perform backend validation; must not authorize technical implementation; must not establish a technical write set; must not resolve F-001; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; and must not deploy, release, launch, or scale.

---

## 28. Fourth Amendment Draft — Bounded F-001 Backend Read-Only Validation Authorization

**Amendment title:** IWP-006 Bounded F-001 Backend Read-Only Validation Authorization

**Amendment status:** DRAFT - NOT REVIEWED - NOT PUBLISHED - NOT EFFECTIVE

**Independent review:** NOT RUN

**Publication-readiness decision:** NOT RUN

**Backend read-only validation:** NOT AUTHORIZED - NOT STARTED

**Technical correction-scope decision:** NOT AUTHORIZED - NOT STARTED

**Technical correction implementation:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED

**Exact technical write set:** NOT ESTABLISHED

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This fourth amendment draft defines only the **governed authorization surface** for one future bounded backend read-only validation of F-001 session and token transport facts. It does **not** authorize backend inspection, backend validation execution, application changes, remediation, technical implementation, a technical write set, F-001 resolution, IWP-006 acceptance or closure, push, release, deployment, or launch.

Drafting this amendment is not review, approval, publication, backend validation execution, correction-scope decision, implementation authorization, or acceptance.

### 28.1 Identity And Relationship

| Field | Value |
|-------|-------|
| Amendment identity | Fourth amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Bounded F-001 Backend Read-Only Validation Authorization |
| Package relationship | Subordinate IWP-006 package-level bounded sub-activity |
| Finding relationship | F-001 only; informed by SR-F001-001 through SR-F001-007 |
| Precondition — discovery | F-001 VERIFIED in `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` |
| Precondition — frontend security review | Published evidence `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` @ commit `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |
| Precondition — security posture | `SECURITY CORRECTION REQUIRED BEFORE IMPLEMENTATION AUTHORIZATION` (§24.7) |
| Precondition — correction-scope authority | Published third amendment §26–§27 @ commit `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` |
| Precondition — target architecture posture | HttpOnly Secure SameSite cookie-based authenticated session transport (§26.4 decision input) |
| Standalone governance lifecycle | **Not created** |
| IWP-006 posture preserved | SELECTED - ACTIVE |
| Stage I4 posture preserved | IN PROGRESS |

### 28.2 Purpose And Governing Basis

This draft authorizes **neither** backend validation execution **nor** correction implementation.

Its purpose is to define, for one future separately authorized validation task:

1. the repository-backed backend facts required before any technical correction-scope decision under §26.7;
2. bounded read-only inspection classes and path-discovery rules;
3. evidence requirements, exclusions, stop conditions, and verdicts for that validation;
4. finding coverage and lifecycle separation preserving all later gates.

| Authority or evidence | Role |
|-----------------------|------|
| This instrument §26–§27 @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` | Published correction-scope authority; mandatory validation subjects §26.5.1; inspection classes §26.5.2; exclusions §26.5.3; evidence rules §26.6 |
| `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` | SR-F001-001 through SR-F001-007; frontend facts; evidence limitations |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` F-001 | Original verified finding |
| This instrument §12, §13.6, §14.8, §18 | Conditional security and storage-change gates |
| `docs/engineering/SECURITY_STANDARDS.md` | Trust boundaries, credential governance, CSRF/session policy consumption |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | AUTHN-SES-* session authority and reconciliation requirements |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | AUTHZ-BND-3 server enforcement and client non-authority |
| `docs/engineering/API_STANDARDS.md` | Auth transport and error-contract discipline |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-GATE-5 | Security review before implementation when auth/trust boundaries implicated |
| `docs/engineering/REPOSITORY_STANDARDS.md` §11.6 | Targeted Validation for bounded sub-activities |

No external conversation, summary, or chat transcript is Repository Authority.

### 28.3 Preserved Current State

| Item | Value |
|------|-------|
| F-001 | UNRESOLVED |
| SR-F001-001 through SR-F001-007 | UNRESOLVED — no reclassification by this draft |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |
| Technical implementation authorization | NOT AUTHORIZED |
| Exact technical write set | NOT ESTABLISHED |
| Backend read-only validation | NOT AUTHORIZED BY THIS DRAFT |
| Backend read-only validation started | NO |
| Correction-scope decision | NOT AUTHORIZED |
| Correction implementation | NOT AUTHORIZED |
| Published §26 correction-scope authority | PUBLISHED @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` |

### 28.4 Validation Objective

Upon future separate publication of this amendment and a later separately authorized bounded execution action, the future backend read-only validation must establish repository-backed facts needed for the later technical correction-scope decision under §26.7.

The validation must answer, from authorized backend surfaces only:

1. how authenticated sessions or tokens are issued at login/register;
2. what access-token or session TTL semantics exist;
3. whether refresh credentials exist, their TTL, and rotation semantics if present;
4. whether server-side revocation exists;
5. what logout endpoint and invalidation behavior exist;
6. whether HttpOnly/Secure/SameSite cookies are issued or absent;
7. how protected routes extract credentials and establish actor context;
8. what CORS and credential policy applies to cookie transport;
9. what CSRF-relevant controls exist for cookie-authenticated mutating requests;
10. what `/users/me` or equivalent reconciliation contract exists;
11. whether server-side role and authorization enforcement exists independent of client guards;
12. whether session lifecycle events can be observed safely without credential disclosure.

The validation must not select remediation, TTL values, endpoints, cookie names, database schema, or implementation design.

### 28.5 Mandatory Validation Subjects

Future authorized validation is bounded to repository evidence for the subjects below. These mirror §26.5.1 and may not expand beyond them without separate authority.

| # | Subject | Validation purpose |
|---|---------|-------------------|
| 1 | Token or session issuance | Determine how authenticated sessions are created at login/register |
| 2 | Access-token or session TTL | Record bounded access/session lifetime semantics |
| 3 | Refresh issuance and TTL | Determine whether refresh exists; record lifetime if present |
| 4 | Refresh rotation semantics | Determine rotation/reuse detection if refresh exists |
| 5 | Revocation capability | Determine whether sessions/tokens can be invalidated server-side |
| 6 | Logout endpoint and invalidation behavior | Determine server logout contract and cookie clearing support |
| 7 | Cookie issuance or absence | Determine whether backend sets HttpOnly/Secure/SameSite cookies |
| 8 | Authentication dependencies and credential extraction | Determine how protected routes obtain actor context |
| 9 | CORS and credential policy | Determine compatibility with cookie `credentials` transport |
| 10 | CSRF-relevant backend controls | Determine existing CSRF mitigations applicable to cookie auth |
| 11 | `/users/me` or equivalent reconciliation contract | Determine session truth contract for client presentation sync |
| 12 | Server-side role and authorization enforcement | Confirm server enforcement exists independent of client guards |
| 13 | Safe observability of session events | Confirm lifecycle events can be recorded without credential exposure |

### 28.6 Inspection-Path Discovery And Boundary

This draft does **not** enumerate executable backend paths. Path discovery occurs only during future separately authorized validation execution under this amendment after publication.

Future validation must use the discovery rules below to avoid unbounded repository review:

| Rule | Requirement |
|------|-------------|
| Entry-point start | Begin from narrow auth/session entry-point searches only (login/register handlers, auth router modules, session/token configuration, auth middleware, logout handlers) |
| Path inventory | Record every inspected path before and during review in the validation evidence artifact |
| Justified expansion | Expand to additional paths only when directly required to trace one subject in §28.5 |
| Expansion reason | Record the subject linkage and reason for each expansion before inspecting the additional path |
| Single-hop tracing | Follow imports/calls only along the minimum chain needed for one listed subject; no unrelated module traversal |
| F-001 bound | Stop expansion if inspection would leave F-001 auth/session transport scope |
| Pre-inspection listing | List intended starting paths and any planned expansion classes in the evidence artifact before inspection begins |
| No repository-wide search | Prohibited: unbounded grep, whole-backend scans, or opportunistic directory review outside traced chains |

If exact paths cannot be bounded using these rules, validation must return `BLOCKED` rather than expand scope.

### 28.7 Permitted Backend Inspection Classes

Future validation may inspect **read-only** backend repository surfaces limited to the classes below. Exact paths within each class must be discovered and recorded under §28.6 before inspection.

| Class | Permitted read-only surfaces |
|-------|------------------------------|
| Issuance | Login/register route handlers, auth service modules, token/session creation logic |
| Lifetime configuration | Token/session TTL settings, expiry constants, refresh lifetime configuration (names only; no secret values) |
| Refresh and rotation | Refresh issuance, rotation, and reuse-detection logic if present |
| Revocation and logout | Logout handlers, session invalidation, token blacklist or revocation modules if present |
| Cookie transport | Response cookie setting, cookie attribute configuration, absence-of-cookie evidence |
| Request authentication | Authentication middleware, dependencies, credential extraction from headers or cookies |
| CORS and credentials | CORS middleware/settings, allowed origins, credential policy flags (no secret values) |
| CSRF controls | CSRF middleware, token validation, SameSite-related settings |
| Session reconciliation | Current-user/session endpoints (`/users/me` or equivalent) |
| Authorization enforcement | Server-side role checks on representative protected routes (minimum samples only) |
| Observability hooks | Logging or event surfaces related to session lifecycle without credential payload |

Frontend application code is excluded (already covered by published §24 evidence). Unrelated domain modules, tests, migrations, infrastructure, and deployment surfaces are excluded unless a traced chain from an entry point requires one directly auth-linked file.

### 28.8 Explicit Exclusions

This draft and any future authorized validation under it exclude:

1. `.env` files, secret stores, and credential or token values;
2. production data and runtime database contents;
3. runtime mutation, application writes, or configuration changes;
4. migrations, schema changes, and migration execution;
5. infrastructure, CI/CD, deployment, and hosting configuration changes;
6. frontend inspection unless a later authority separately permits it;
7. test execution unless separately authorized;
8. dependency installation or package manager mutations;
9. network calls to production, staging, or external services;
10. remediation, implementation, or technical write-set definition;
11. F-013 caller-graph resolution or `frontend/services/api.ts` inspection;
12. register, handoff, roadmap, or continuity synchronization unless separately authorized;
13. amendment publication, approval, or effectiveness by this draft preparation action.

### 28.9 Evidence Requirements

Future authorized validation must produce exactly one temporary subordinate evidence artifact at:

`docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md`

That artifact is IWP-006 package evidence only. It is not independent permanent Repository Authority.

Required contents:

1. verified repository baseline at validation start;
2. exact inspected paths inventory, including expansion reasons;
3. per-subject assessment mapped to §28.5;
4. separated categories: **observed fact**, **absence of implementation**, **absence of evidence**, **ambiguity or conflict**, **inaccessible or unauthorized evidence**;
5. relevant symbols and configuration key names without secret values;
6. reproducible repository evidence references (file paths and line ranges);
7. finding-by-finding mapping to SR-F001-001 through SR-F001-007;
8. no inference presented as verified fact;
9. explicit blockers where facts cannot be established;
10. exactly one verdict from §28.12;
11. explicit confirmation that no technical write set was established;
12. explicit confirmation that no implementation was authorized;
13. explicit confirmation that F-001 remains unresolved.

Publication of validation evidence does not resolve F-001, does not authorize implementation, and does not accept or close IWP-006.

### 28.10 Finding Coverage

| Finding | Severity | Validation relevance | Resolved by validation alone? |
|---------|----------|----------------------|-------------------------------|
| SR-F001-001 | HIGH | Backend facts inform cookie-session correction scope; frontend storage fact already verified | **NO** |
| SR-F001-002 | HIGH | Backend reconciliation and 401/403 contract facts required for correction scope | **NO** |
| SR-F001-003 | MEDIUM | Server logout and invalidation facts required for correction scope | **NO** |
| SR-F001-004 | MEDIUM | TTL, renewal, and rotation facts required for correction scope | **NO** |
| SR-F001-005 | MEDIUM | Backend auth transport facts inform single transport model correction | **NO** |
| SR-F001-006 | LOW | Server role enforcement facts may inform guard alignment in later correction scope | **NO** |
| SR-F001-007 | LOW | Route guard UX remains frontend concern; backend facts ancillary only | **NO** |

No finding may be marked resolved, reclassified, or closed by validation evidence alone.

### 28.11 Stop Conditions

Future validation must stop and return `BLOCKED` if:

1. repository baseline or authority materially differs from verified state;
2. scope expands beyond F-001 auth/session transport subjects in §28.5;
3. session, token, logout, renewal, rotation, or revocation semantics remain ambiguous after bounded tracing;
4. secret values, credential material, `.env` contents, or production data access would be required;
5. runtime mutation, external service calls, or test execution would be required;
6. unauthorized frontend, database content, migration execution, infrastructure, deployment, or production inspection would be required;
7. selected architecture posture in §26.4 conflicts with observed backend facts within authorized paths;
8. cross-origin cookie assumptions required for correction cannot be supported within published authority;
9. CSRF posture for cookie transport cannot be determined from authorized paths;
10. logout, renewal, rotation, or revocation semantics cannot be determined within bounded inspection;
11. a future technical write set cannot be isolated from validation facts alone;
12. SR-F001-001 or SR-F001-002 would remain unaddressable at the correction-scope decision boundary;
13. inspection cannot remain bounded under §28.6 path-discovery rules;
14. this draft conflicts with published Repository Authority;
15. validation evidence review or correction-scope decision is skipped;
16. implementation authorization is requested before correction-scope decision and write set establishment.

### 28.12 Future Validation Verdicts

Future authorized validation must return exactly one verdict:

| Verdict | Meaning |
|---------|---------|
| `PASS — F-001 BACKEND READ-ONLY VALIDATION EVIDENCE PREPARED` | Bounded backend validation evidence artifact prepared; facts recorded honestly; ready for independent evidence review |
| `FAIL — F-001 BACKEND VALIDATION IDENTIFIED CORRECTABLE EVIDENCE DEFECTS` | Validation completed but evidence artifact contains correctable defects requiring bounded correction before evidence review |
| `BLOCKED — F-001 BACKEND READ-ONLY VALIDATION CANNOT BE COMPLETED` | Baseline, authority, scope, or evidence access prevents safe bounded completion |

A `PASS` verdict means evidence was prepared only. It does **not** resolve F-001, establish a technical write set, authorize implementation, or accept or close IWP-006.

### 28.13 Lifecycle Separation

| Stage | Rule |
|-------|------|
| Draft authoring (this task) | Not review |
| Independent targeted review | Not publication |
| Bounded publication | Not backend validation execution |
| Backend read-only validation execution | Not evidence acceptance |
| Backend validation evidence review | Not correction-scope decision |
| Technical correction-scope decision (§26.7) | Not implementation authorization |
| Implementation authorization | Not implementation execution |
| Correction execution | Not F-001 resolution claim |
| F-001 resolution | Not IWP-006 acceptance |
| IWP-006 acceptance | Not closure |
| Merge | Not release |
| Push | Not authorized by this draft |

Publication of this fourth amendment, if later approved, is the prerequisite for backend validation execution. Publication alone does **not** authorize validation execution, implementation, finding resolution, or write-set establishment.

### 28.14 Explicit Non-Authorization

This fourth amendment draft does **not** authorize:

- backend read-only validation execution;
- backend code inspection during draft preparation or review;
- application changes or remediation;
- technical correction-scope decision;
- technical implementation or correction execution;
- establishment of a technical write set;
- F-001 resolution or SR-F001 finding resolution/reclassification;
- IWP-006 acceptance or closure;
- register, handoff, or continuity synchronization;
- staging, commit, push, merge, release, deployment, or launch beyond publication of a future approved amendment version.

Each later gate requires separate Repository Authority.

### 28.15 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Fourth amendment draft authored | YES — by this draft preparation action |
| Fourth amendment reviewed | NOT RUN |
| Fourth amendment published | NOT RUN |
| Fourth amendment effective | NOT RUN |
| Backend read-only validation authorized | NO |
| Backend read-only validation started | NO |
| Backend validation evidence prepared | NO |
| Correction-scope decision completed | NO |
| Technical write set established | NO |
| Technical implementation authorized | NO |
| F-001 resolved | NO |

---

## 29. Exact Next Lifecycle Action After F-001 Backend Validation Authorization Draft Preparation

After preparation of this fourth amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only review of **Fourth Amendment Draft — Bounded F-001 Backend Read-Only Validation Authorization** in §28 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against controlling Repository Authority, published §26 authority @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0`, published §24 evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`, F-001 discovery and security evidence, register posture, lifecycle separation, inspection-path boundary, stop conditions, evidence requirements, and prohibition on premature validation execution or implementation authorization.

That review must not modify files; must not approve, publish, or make the amendment effective; must not authorize or perform backend validation; must not inspect backend or application code; must not authorize technical implementation; must not establish a technical write set; must not resolve F-001; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; must not stage, commit, or push; and must not deploy, release, launch, or scale.
