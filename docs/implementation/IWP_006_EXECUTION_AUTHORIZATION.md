# IWP-006 Execution Authorization Artifact

**Status:** PUBLISHED - EFFECTIVE (base instrument and subsequent published IWP-006 amendments through F-001 lifecycle) · CURRENT LIVE CONTINUITY CORRECTED LOCALLY - NOT A NEW PUBLICATION CLAIM
**Authority class:** IWP package authority artifact
**Base instrument binding authority:** ACTIVE - IWP-006 PACKAGE AUTHORITY INSTRUMENT
**Selection / activation / discovery:** EFFECTIVE per amendment publication `89f9af0539a1e2468c5c2f9139829894268947a7` and subsequent published discovery / F-001 lifecycle acts
**Independent review:** COMPLETED - PASS (base instrument)
**Second amendment independent review:** COMPLETED - PASS
**Second amendment review evidence:** `docs/implementation/reviews/IWP_006_SECTION_24_INDEPENDENT_REVIEW.md`
**Second amendment reviewed digest:** `70653a41d1ea92960837b8836a2004582b798c923a120e4c5db51392f43ff02e`
**Second amendment publication-readiness decision:** COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION
**Second amendment publication integration:** COMPLETED
**Review findings:** BLOCKING 0; NON-BLOCKING 0 (base instrument)
**Publication-readiness decision:** COMPLETED - PASS (base instrument)
**Selection/discovery readiness decision:** COMPLETED - PASS
**Pre-publication validation:** COMPLETED - PASS (base instrument)
**Approval integration:** COMPLETED - APPROVED FOR PUBLICATION CHECKPOINT (base instrument)
**Publication integration:** COMPLETED (base instrument)
**Publication checkpoint:** COMPLETED (base instrument)
**Publication date:** 2026-07-22
**Publication commit:** `fe64f2bce9bcf1e6b2df287593497c7e03c99827`
**Git checkpoint:** COMPLETED (base instrument)
**Amendment publication commit (selection/discovery):** `89f9af0539a1e2468c5c2f9139829894268947a7`
**F-001 implementation commit:** `084711f386a335e833311e85c38e1fbda1d452f9`
**Ninth amendment (§39 F-005 authorization):** PUBLISHED - EFFECTIVE (F-005 BOUNDED IMPLEMENTATION AUTHORIZATION ONLY)
**Ninth amendment independent review:** COMPLETED - PASS (Publication Readiness Review)
**Ninth amendment review evidence:** `docs/implementation/reviews/IWP_006_SECTION_39_PUBLICATION_READINESS_REVIEW.md`
**Ninth amendment publication-readiness decision:** COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION
**Ninth amendment publication integration:** COMPLETED BY THIS PUBLICATION COMMIT
**F-005 technical implementation execution:** NOT AUTHORIZED - NOT STARTED
**Continuity synchronization (historical):** COMPLETED at `d942e00ca0ae63fe5fd40aeedc3d7bd130c5f29c`
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 - Domain Implementation
**Target package:** IWP-006 - Frontend Auth And API Client Stabilization
**IWP-006 (current live posture):** SELECTED - ACTIVE - NOT ACCEPTED - NOT CLOSED
**Package selection (current live):** SELECTED
**Package activation (current live):** ACTIVE - ONLY SELECTED AND ACTIVE PACKAGE
**Read-only discovery:** COMPLETED - EVIDENCE ACCEPTED - does not equal IWP acceptance or closure
**Bounded F-001 technical implementation:** COMPLETED AND INDEPENDENTLY ACCEPTED
**F-001:** RESOLVED within bounded F-001 scope
**SR-F001-001 through SR-F001-007:** RESOLVED within bounded F-001 scope
**F-013:** deferred and outside completed F-001 scope
**Currently open authorized technical execution packages:** 0
**Exact technical write set (F-005):** ESTABLISHED BY PUBLISHED §39.3 — NOT EXECUTABLE UNTIL SEPARATELY INVOKED
**Exact technical write set (current open execution):** NONE OPEN — F-005 write set defined but not invoked
**Acceptance:** NOT GRANTED
**Closure:** NOT GRANTED
**Stage I4:** IN PROGRESS
**IWP-004:** ACCEPTED - CLOSED
**Active implementation packages (current live):** 1 - IWP-006
**Authorized technical implementation packages (currently open):** 0
**Push:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED
**Phase 4 Product Development Methodology:** NOT STARTED
**Exact next authorized action:** one separate bounded F-005 technical implementation invocation referencing published §39.3 (G1–G3); must not invoke automatically upon publication; must not accept or close IWP-006
**Historical note:** Earlier header draft labels and point-in-time section text below remain historical records of prior lifecycle states; current live posture is this status block plus §38 and published §39.

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

---

## 30. Fifth Amendment Draft — Bounded F-001 Backend Read-Only Validation Execution Authorization

**Amendment title:** IWP-006 Bounded F-001 Backend Read-Only Validation Execution Authorization

**Amendment status:** DRAFT - NOT REVIEWED - NOT PUBLISHED - NOT EFFECTIVE

**Independent review:** NOT RUN

**Publication-readiness decision:** NOT RUN

**Backend read-only validation execution:** NOT AUTHORIZED - NOT STARTED

**Technical correction-scope decision:** NOT AUTHORIZED - NOT STARTED

**Technical correction implementation:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED

**Exact technical write set:** NOT ESTABLISHED

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This fifth amendment draft defines only the **distinct execution-authorization gate** required by published §28.4 and §28.13 for one future bounded backend read-only validation of F-001. It does **not** authorize validation execution during draft preparation, review, or publication authoring; does **not** perform backend inspection; does **not** authorize application changes, remediation, technical implementation, a technical write set, F-001 resolution, IWP-006 acceptance or closure, push, release, deployment, or launch.

Drafting this amendment is not review, approval, publication, backend validation execution, evidence acceptance, correction-scope decision, implementation authorization, or acceptance.

### 30.1 Identity And Relationship

| Field | Value |
|-------|-------|
| Amendment identity | Fifth amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Bounded F-001 Backend Read-Only Validation Execution Authorization |
| Package relationship | Subordinate IWP-006 package-level bounded sub-activity |
| Finding relationship | F-001 only; informed by SR-F001-001 through SR-F001-007 |
| Precondition — discovery | F-001 VERIFIED in `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` |
| Precondition — frontend security review | Published evidence `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` @ commit `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |
| Precondition — security posture | `SECURITY CORRECTION REQUIRED BEFORE IMPLEMENTATION AUTHORIZATION` (§24.7) |
| Precondition — correction-scope authority | Published third amendment §26–§27 @ commit `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` |
| Precondition — validation-scope authority | Published fourth amendment §28–§29 @ commit `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` |
| Standalone governance lifecycle | **Not created** |
| IWP-006 posture preserved | SELECTED - ACTIVE |
| Stage I4 posture preserved | IN PROGRESS |

### 30.2 Authority Chain And Subordination

This draft is the **distinct execution-authorization act** required by §28.4 and §28.13. Published §28 @ `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` remains the controlling validation-scope authority for subjects, inspection classes, exclusions, and evidence rules.

| Authority or evidence | Role |
|-----------------------|------|
| This instrument §28–§29 @ `9a36e9b8…` | Published validation-scope authority; §28.5 subjects; §28.6 path discovery; §28.7 classes; §28.8 exclusions; §28.9 evidence requirements |
| This instrument §26–§27 @ `def29765e…` | Correction-scope path; §26.4 target architecture posture; §26.7 decision gates |
| `docs/implementation/IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md` | SR-F001-001 through SR-F001-007; frontend facts |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` F-001 | Original verified finding |
| `docs/engineering/SECURITY_STANDARDS.md` | Trust boundaries, credential governance, CSRF/session policy |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | AUTHN-SES-* session authority and reconciliation |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | AUTHZ-BND-3 server enforcement and client non-authority |
| `docs/engineering/API_STANDARDS.md` | Auth transport and error-contract discipline |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-GATE-5 | Security review before implementation when auth/trust boundaries implicated |
| `docs/engineering/REPOSITORY_STANDARDS.md` §11.6 | Targeted Validation for bounded sub-activities |

Draft authoring, independent review approval, and bounded publication of this amendment do **not** perform backend validation.

### 30.3 Preserved Current State

| Item | Value |
|------|-------|
| F-001 | UNRESOLVED |
| SR-F001-001 through SR-F001-007 | UNRESOLVED — no reclassification by this draft |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |
| Technical implementation authorization | NOT AUTHORIZED |
| Exact technical write set | NOT ESTABLISHED |
| Backend read-only validation execution | NOT AUTHORIZED BY THIS DRAFT |
| Backend read-only validation started | NO |
| Validation evidence artifact | NOT CREATED |
| Correction-scope decision | NOT AUTHORIZED |
| Correction implementation | NOT AUTHORIZED |
| Published §28 validation-scope authority | PUBLISHED @ `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2` |

### 30.4 Future Execution Objective

Upon future separate publication of this fifth amendment, one future separately **invoked** bounded execution task may perform repository-only, read-only backend validation under published §28 and this §30 execution authorization.

The future execution may determine repository facts only for:

1. token or session issuance;
2. access-token or session TTL;
3. refresh issuance and TTL, if present;
4. refresh rotation semantics, if present;
5. revocation capability;
6. logout endpoint and invalidation behavior;
7. cookie issuance or confirmed absence of cookie support;
8. credential extraction and authentication dependencies;
9. credentialed CORS policy relevant to cookie transport;
10. CSRF-relevant controls;
11. `/users/me` or equivalent session reconciliation;
12. server-side role and authorization enforcement;
13. safe session observability without credential disclosure.

The execution must not choose implementation details, TTL values, endpoints, cookie names, database schema, or remediation design. It must not presume any mechanism exists until observed in authorized repository surfaces.

### 30.5 Inspection-Path Control

This draft does **not** enumerate actual backend paths. Future execution must follow published §28.6 and the controls below:

| Rule | Requirement |
|------|-------------|
| Entry-point discovery | Begin from narrow authentication/session entry-point discovery only |
| Pre-inspection inventory | Record pre-inspection candidate path inventory in the validation evidence artifact before inspection begins |
| Inspected-path inventory | Record every inspected path with validation subject linkage |
| Expansion basis | Expand only through directly linked imports, dependencies, configuration references, or authorization/session call chains |
| Expansion reason | Record the named validation subject and reason for every expansion before inspecting the additional path |
| Minimum depth | Keep tracing to the minimum required depth for one listed subject |
| Repository-wide prohibition | Prohibit repository-wide or whole-backend scanning, unbounded grep, or opportunistic directory review |
| F-001 bound | Stop with `BLOCKED` if F-001 auth/session transport boundaries cannot be maintained |

### 30.6 Permitted Read-Only Evidence Classes

Future execution may inspect only repository-tracked backend material directly necessary for named validation subjects in §30.4, limited to these evidence classes (not a discovered path list):

| Class | Permitted read-only surfaces |
|-------|------------------------------|
| Auth/session entry points | Login/register route handlers, auth router modules |
| Token/session services | Token/session creation, validation, and helper modules |
| Credential extraction | Authentication dependencies and middleware extracting credentials |
| Auth middleware | Authentication and authorization middleware or dependencies |
| Configuration declarations | Directly referenced configuration declarations (names/keys only; no secret values) |
| Logout and invalidation | Logout handlers, refresh, renewal, revocation, and invalidation paths if present |
| Cookie/CORS/CSRF | Cookie attribute, CORS credential policy, and CSRF-related declarations |
| Session reconciliation | `/users/me` or equivalent reconciliation path |
| Safe observability | Logging or event declarations related to session lifecycle without credential payload |
| Traced domain symbols | Directly traced domain symbols only where strictly required to establish one F-001 fact |

Exact paths within each class must be discovered, recorded, and justified under §30.5 before inspection.

### 30.7 Explicit Exclusions

Future execution under this authorization excludes:

1. reading `.env` files or secret stores;
2. reading, copying, printing, or exposing credential or token values;
3. production data or production systems;
4. runtime mutation or application/repository writes except the separately authorized evidence artifact;
5. frontend inspection;
6. database schema inspection beyond an unavoidable directly linked fact visible in authorized repository paths;
7. migrations and migration execution;
8. infrastructure and deployment inspection;
9. dependency installation;
10. network or external-service calls;
11. application tests unless separately authorized;
12. remediation, refactoring, implementation, or configuration changes;
13. creation of a technical correction write set during validation;
14. resolution or reclassification of findings by validation alone;
15. F-013 caller-graph resolution or `frontend/services/api.ts` inspection;
16. register, handoff, roadmap, or continuity synchronization unless separately authorized.

### 30.8 Validation Evidence Artifact

Future authorized execution must produce exactly one temporary subordinate evidence artifact at:

`docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md`

No conflicting artifact exists at draft preparation time. That artifact is IWP-006 package evidence only. It is not independent permanent Repository Authority.

Required contents:

1. verified repository baseline and authority at validation start;
2. pre-inspection candidate path inventory;
3. complete inspected-path inventory;
4. validation subject and reason for every path expansion;
5. exact relevant symbols, endpoints, dependency names, or configuration keys without secret values;
6. reproducible repository references (file paths and line ranges);
7. separated categories: **observed fact**, **absence of implementation**, **absence of evidence**, **ambiguity or conflict**, **inaccessible or unauthorized evidence**;
8. explicit fact versus inference separation;
9. finding-by-finding mapping to SR-F001-001 through SR-F001-007;
10. blockers and stop conditions encountered;
11. exactly one verdict from §30.10;
12. explicit confirmation that F-001 remains unresolved;
13. explicit confirmation that no technical write set was established;
14. explicit confirmation that no implementation was authorized.

This draft preparation action does **not** create the evidence artifact.

### 30.9 Finding Coverage

| Finding | Severity | Execution relevance | Resolved by validation alone? |
|---------|----------|---------------------|--------------------------------|
| SR-F001-001 | HIGH | Backend transport facts inform cookie-session correction scope | **NO** |
| SR-F001-002 | HIGH | Backend reconciliation and 401/403 contract facts required | **NO** |
| SR-F001-003 | MEDIUM | Server logout and invalidation facts required | **NO** |
| SR-F001-004 | MEDIUM | TTL, renewal, and rotation facts required | **NO** |
| SR-F001-005 | MEDIUM | Backend auth transport facts inform single transport model | **NO** |
| SR-F001-006 | LOW | Server role enforcement facts may inform guard alignment | **NO** |
| SR-F001-007 | LOW | Route guard UX remains frontend concern; backend facts ancillary | **NO** |

Unresolved HIGH findings are not themselves evidence-execution failures, but they must prevent any later acceptance or implementation-readiness conclusion until handled through the proper downstream correction-scope and implementation gates.

No finding may be marked resolved, reclassified, or closed by validation evidence alone.

### 30.10 Permitted Future Execution Verdicts

Future authorized execution must return exactly one verdict:

| Verdict | Meaning |
|---------|---------|
| `PASS — F-001 BACKEND READ-ONLY VALIDATION EVIDENCE PREPARED` | Bounded backend validation evidence artifact prepared; facts recorded honestly; ready for independent evidence review |
| `FAIL — F-001 BACKEND VALIDATION IDENTIFIED CORRECTABLE EVIDENCE DEFECTS` | Execution completed but evidence artifact contains correctable defects requiring bounded correction before evidence review |
| `BLOCKED — F-001 BACKEND READ-ONLY VALIDATION CANNOT BE COMPLETED` | Baseline, authority, scope, or evidence access prevents safe bounded completion |

A `PASS` verdict means evidence preparation only. It does **not**:

- resolve or reclassify F-001 or any SR-F001 finding;
- authorize remediation or implementation;
- create or approve a technical write set;
- accept or close IWP-006;
- authorize commit, push, release, deployment, or launch beyond the separately authorized evidence artifact.

### 30.11 Stop Conditions

Future execution must stop and return `BLOCKED` if:

1. repository baseline or authority materially differs from verified state;
2. scope expands beyond F-001 auth/session transport subjects;
3. session or token behavior cannot be determined without speculation;
4. secret values, credential values, or production data would be required;
5. runtime mutation or external calls would be required;
6. unauthorized frontend, database content, migration execution, infrastructure, deployment, or production inspection would be required;
7. repository implementation conflicts materially with published architecture and the conflict cannot be represented safely as evidence;
8. cross-origin cookie behavior would require unsupported assumptions;
9. CSRF posture cannot be determined within authorized scope;
10. logout, renewal, rotation, revocation, or invalidation semantics cannot be determined within authorized scope;
11. inspection cannot remain bounded under §30.5 and §28.6;
12. the evidence artifact cannot be isolated from a technical write set;
13. authority conflicts or superseding governance exist;
14. a downstream gate would need to be skipped;
15. remediation or implementation would be required to continue.

### 30.12 Lifecycle Separation

| Stage | Rule |
|-------|------|
| §30 draft authoring (this task) | Not review |
| Independent targeted review | Not publication |
| Bounded publication of §30 | Not validation execution |
| Separately invoked validation execution | Not evidence acceptance |
| Backend validation evidence review | Not correction-scope decision |
| Technical correction-scope decision (§26.7) | Not implementation authorization |
| Implementation authorization | Not implementation execution |
| Correction execution | Not F-001 resolution claim |
| F-001 resolution | Not IWP-006 acceptance |
| IWP-006 acceptance | Not closure |
| Merge | Not release |
| Push | Not authorized by this draft |

### 30.13 Publication And Invocation Boundary

| Boundary | Rule |
|----------|------|
| Draft authoring | Does **not** authorize execution |
| Independent review approval | Does **not** authorize execution |
| Bounded publication of §30 | Makes F-001 backend read-only validation **execution authorization effective** under published §28 scope only |
| Publication of §30 | Does **not** start validation automatically |
| Validation execution | Begins only through a **separate invoked bounded execution task** referencing published §28 and published §30 |
| Publication and execution | Must **not** be combined in one task |
| Implementation | Remains prohibited |

Upon future publication, this fifth amendment authorizes one bounded backend read-only validation execution under §28. It does **not** authorize implementation, correction-scope decision, write-set establishment, F-001 resolution, or IWP-006 acceptance or closure.

No additional authorization instrument is required after §30 publication before validation execution may be invoked. The invoked execution task itself remains separate from publication.

### 30.14 Explicit Non-Authorization

This fifth amendment draft does **not** authorize:

- backend read-only validation execution during draft preparation or review;
- backend code inspection during draft preparation or review;
- application changes or remediation;
- technical correction-scope decision;
- technical implementation or correction execution;
- establishment of a technical write set;
- F-001 resolution or SR-F001 finding resolution/reclassification;
- IWP-006 acceptance or closure;
- register, handoff, or continuity synchronization;
- staging, commit, push, merge, release, deployment, or launch beyond publication of a future approved amendment version and the separately authorized evidence artifact.

Each later gate requires separate Repository Authority except the invoked execution task authorized by published §30 under published §28.

### 30.15 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Fifth amendment draft authored | YES — by this draft preparation action |
| Fifth amendment reviewed | NOT RUN |
| Fifth amendment published | NOT RUN |
| Fifth amendment effective | NOT RUN |
| Backend read-only validation execution authorized | NO |
| Backend read-only validation started | NO |
| Backend validation evidence prepared | NO |
| Correction-scope decision completed | NO |
| Technical write set established | NO |
| Technical implementation authorized | NO |
| F-001 resolved | NO |

---

## 31. Exact Next Lifecycle Action After F-001 Backend Validation Execution Authorization Draft Preparation

After preparation of this fifth amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only review of **Fifth Amendment Draft — Bounded F-001 Backend Read-Only Validation Execution Authorization** in §30 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against controlling Repository Authority, published §28 validation-scope authority @ `9a36e9b8efbbc1a3a79a3c36fcbbd9e71cbb8ec2`, published §26 correction-scope authority @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0`, published §24 evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`, F-001 discovery and security evidence, register posture, execution-gate clarity, inspection-path boundary, exclusions, evidence requirements, stop conditions, verdict semantics, publication/effectiveness semantics, lifecycle separation, and prohibition on premature validation execution or implementation authorization.

That review must not modify files; must not approve, publish, or make the amendment effective; must not authorize or perform backend validation; must not inspect backend or application code; must not create validation evidence; must not establish a technical write set; must not resolve or reclassify F-001 or any SR-F001 finding; must not authorize technical implementation; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; must not stage, commit, or push; and must not deploy, release, launch, or scale.

---

## 32. Sixth Amendment Draft — Consolidated F-001 Technical Correction-Scope Decision

**Amendment title:** IWP-006 Consolidated F-001 Technical Correction-Scope Decision (Cookie Session Architecture)

**Amendment status:** DRAFT - NOT REVIEWED - NOT PUBLISHED - NOT EFFECTIVE

**Independent review:** NOT RUN

**Publication-readiness decision:** NOT RUN

**Backend read-only validation:** COMPLETED — evidence published @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6`

**Technical correction-scope decision:** PREPARED IN THIS DRAFT — NOT PUBLISHED — NOT EFFECTIVE

**Technical correction implementation:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT STARTED

**Exact technical write set:** ESTABLISHED IN THIS DRAFT — NOT EFFECTIVE UNTIL SEPARATELY AUTHORIZED IMPLEMENTATION GATE

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED — OUT OF WRITE SET

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This sixth amendment draft completes the **consolidated technical correction-scope decision** required by published §26.7 after published backend validation evidence @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6` and published frontend security evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`. It records architecture decisions, bounded write set, required validation, finding coverage, stop conditions, and lifecycle separation.

This draft does **not** authorize implementation execution, validation execution, remediation, F-001 resolution, finding reclassification, IWP-006 acceptance or closure, register/handoff synchronization, staging, commit, push, merge, release, deployment, or launch.

Drafting this amendment is not review, approval, publication, implementation authorization, correction execution, or acceptance.

### 32.1 Identity And Relationship

| Field | Value |
|-------|-------|
| Amendment identity | Sixth amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Consolidated F-001 Technical Correction-Scope Decision (Cookie Session Architecture) |
| Package relationship | Subordinate IWP-006 package-level bounded sub-activity |
| Finding relationship | F-001 correction path only; SR-F001-001 through SR-F001-007 |
| Precondition — frontend security review | Published evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |
| Precondition — correction-scope framework | Published §26–§27 @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` |
| Precondition — backend validation | Published evidence @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6` |
| Precondition — backend validation execution gate | Published §30 @ `0a8127896b087dc240e53f7710b1de7258c59bf1` |
| IWP-006 posture preserved | SELECTED - ACTIVE |
| Stage I4 posture preserved | IN PROGRESS |

### 32.2 Purpose And Governing Basis

This draft completes §26.7 decision gates 1–5 and records gate 6 as a future mandatory prerequisite before implementation authorization. It consolidates the full bounded correction scope in one instrument. It does **not** defer scope definition to another artifact.

| Authority or evidence | Commit / role |
|-----------------------|---------------|
| This instrument §26.4, §26.7–§26.10 @ `def29765e…` | Target posture; decision gates; finding coverage; stop conditions |
| Published §24 frontend security evidence | SR-F001-001–007; nine-path frontend facts |
| Published backend validation evidence | Eighteen-path backend facts; subject and finding mapping |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` | F-001 trigger |
| `docs/engineering/SECURITY_STANDARDS.md` | Credential governance; CSRF/session policy consumption |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | AUTHN-SES-*; AUTHN-INV-* |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | AUTHZ-BND-3 presentation-only guards |
| `docs/engineering/API_STANDARDS.md` | Auth transport and error-contract discipline |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | IMPL-GATE-5; lifecycle gates |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Evidence integrity; targeted validation |

### 32.3 Preserved Current State

| Item | Value |
|------|-------|
| F-001 | UNRESOLVED |
| SR-F001-001 through SR-F001-007 | UNRESOLVED — severities unchanged |
| Backend validation | COMPLETED — evidence published |
| Correction-scope decision | PREPARED IN DRAFT ONLY |
| Technical write set | ESTABLISHED IN DRAFT — not executable |
| Technical implementation authorization | NOT AUTHORIZED |
| Correction implementation | NOT AUTHORIZED |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |

### 32.4 §26.7 Gate 1 — Compatibility Assessment

| Item | Decision |
|------|----------|
| Selected target posture | HttpOnly Secure SameSite cookie-based authenticated session transport (§26.4) |
| Observed backend posture | Stateless JWT bearer returned as JSON; `OAuth2PasswordBearer` header extraction; no cookies (backend evidence §10 subjects 1, 7, 8) |
| Observed frontend posture | `localStorage["access_token"]` with explicit `Authorization: Bearer` header (frontend evidence §4.1) |
| Compatibility verdict | **INCOMPATIBLE** — correction required before implementation authorization |
| CORS posture | Inspected backend enables `allow_credentials=True` for localhost origins (backend evidence subject 9); cookie transport feasible within bounded correction |
| Correction direction | Replace bearer-header client-managed credential with server-issued HttpOnly session cookie and server-side session authority |

### 32.5 §26.7 Gate 2 — Expiry And Renewal Model

| Item | Decision |
|------|----------|
| Session authority model | **Server-side persisted session records** with opaque session identifier transported in HttpOnly cookie |
| Access renewal | **Sliding idle timeout** extended on authenticated API activity within configured bounds |
| Absolute ceiling | Configurable maximum session lifetime enforced server-side (config key names only; numeric values remain env-backed and are not decided in this draft) |
| Refresh token | **Not in bounded initial correction scope** — re-authentication required after session expiry or invalidation |
| JWT access token in login response | **Removed** from authenticated session path after correction |
| Password-reset token subsystem | **Out of scope** — existing reset flow unchanged except where auth router shared wiring requires non-breaking import preservation |
| Numeric TTL | Not invented; implementation must consume existing or newly declared config keys without embedding secret values in repository artifacts |

**Configuration key names authorized for declaration (values not decided):**

- `SESSION_COOKIE_NAME`
- `SESSION_IDLE_TIMEOUT_MINUTES`
- `SESSION_ABSOLUTE_TIMEOUT_MINUTES`
- `SESSION_COOKIE_SECURE`
- `SESSION_COOKIE_SAMESITE`
- `CSRF_COOKIE_NAME`
- `CSRF_HEADER_NAME`

Existing `ACCESS_TOKEN_EXPIRE_MINUTES` must not be repurposed silently; migration to session timeout keys must be explicit in implementation.

### 32.6 §26.7 Gate 3 — Logout And Revocation Requirements

| Item | Decision |
|------|----------|
| Logout endpoint | **Required** — bounded under `backend/app/routers/auth.py` (e.g. `POST /auth/logout`) |
| Server invalidation | **Required** — delete or mark session record invalid in server-side session store |
| Cookie clearing | **Required** — response must clear session cookie and CSRF cookie |
| Client presentation | Frontend logout must invoke server logout before or atomically with local presentation reset |
| Bearer token revocation | **Not applicable after correction** — no client-retained bearer access token in corrected posture |
| Concurrent sessions | Not decided — implementation may allow multiple active sessions per user unless a stricter rule is separately authorized |

### 32.7 §26.7 Gate 4 — CSRF Strategy

| Item | Decision |
|------|----------|
| Session cookie SameSite | **`Lax` minimum** — evaluate `Strict` only if UX and API routing remain compatible within bounded write set |
| Session cookie attributes | `HttpOnly`; `Secure` in production; `SameSite` per config key |
| CSRF control | **Synchronizer token required** for cookie-authenticated **mutating** requests (`POST`, `PUT`, `PATCH`, `DELETE`) where SameSite alone is insufficient for cross-origin SPA API usage |
| CSRF transport | Double-submit or header-validated token pattern: CSRF token readable by client (non-HttpOnly cookie or login response contract) plus required custom header on mutating requests |
| Safe methods | `GET`, `HEAD`, `OPTIONS` exempt from CSRF validation |
| Bearer-header CSRF profile | **Deprecated** with bearer transport removal |

### 32.8 §26.7 Gate 5 — Authentication Failure And Status Normalization

| Item | Decision |
|------|----------|
| Missing or invalid session | **HTTP 401 Unauthorized** on all protected routes |
| Authenticated but forbidden role or account restriction | **HTTP 403 Forbidden** |
| Eliminate auth-failure 400 | **`BadRequestException` for invalid token/session in auth dependencies must not remain** — role-guard failures in `require_admin` / `require_admin_or_realtor` must use 403, not 400 (backend evidence subjects 8, 11, 12) |
| Unified extraction | **Single** cookie-session authentication dependency in `backend/app/core/security/dependencies.py`; duplicate bearer `get_current_user` in `user_service.py` removed or reduced to delegate |
| `/users/me` contract | Remains authoritative reconciliation endpoint; must use unified session dependency and normalized status semantics |
| Client reconciliation (SR-F001-002) | `authFetch` must distinguish **401** → clear session presentation and route to login; **403** → clear or downgrade presentation per product rule without retaining false authenticated state |
| Generic error collapse | In-session auth failures must trigger the same presentation reset as startup restore failure |

### 32.9 §26.7 Gate 5 — Authorization Dependency Consistency

| Item | Decision |
|------|----------|
| Server authority | Role and account-status enforcement remain server-side via dependencies (AUTHZ-BND-3) |
| Dependency source | All protected routes consume unified session-based dependencies from `dependencies.py` |
| Routes using `user_service.get_current_user` | Must migrate to unified dependency (`users.py`, `favorites.py` per backend evidence) |
| Local guards | `require_realtor` in `realtor_profiles.py` remains presentation-adjacent server guard; must use unified session dependency |
| Client guard alignment (SR-F001-006) | `RealtorRoute` must consume context `isRealtor` rather than recomputing `user?.role === "realtor"` |
| Route guard UX (SR-F001-007) | Loading/redirect flash reduction permitted within bounded frontend route components; not security-critical |

### 32.10 §26.7 Gate 5 — Security-Safe Observability And Audit

| Item | Decision |
|------|----------|
| AUTHN-SES-6 compliance | Record session lifecycle events **without credential payload** |
| Required event classes | Login success; login failure; logout; session invalidation; CSRF validation failure; session expiry |
| Prohibited log content | Raw session identifiers in full, JWT material, CSRF secrets, cookie values, passwords |
| Rate limiting | Login rate limit preserved; upload rate-limit key must migrate from bearer digest to session- or user-scoped key (`rate_limit.py`) |
| Dedicated audit store | Not required in bounded scope — structured application logging sufficient if classification rules satisfied |
| Metrics | Optional counters by event class; no credential-bearing labels |

### 32.11 §26.7 Gate 5 — Exact Bounded Technical Write Set

Write set is bounded to F-001 auth/session transport correction only. **F-013 / `frontend/services/api.ts` caller graph is excluded.**

#### 32.11.1 Backend — existing paths (published backend validation evidence §6–§7)

| # | Path | Correction purpose |
|---|------|-------------------|
| B1 | `backend/app/main.py` | CORS credential policy; CSRF middleware registration if applicable |
| B2 | `backend/app/routers/auth.py` | Cookie-setting login; logout route; CSRF token issuance contract |
| B3 | `backend/app/services/auth_service.py` | Session creation on login; remove JSON bearer issuance from session path |
| B4 | `backend/app/core/security/jwt.py` | Remove access-token creation from authenticated session path; preserve password-reset token utilities if still referenced |
| B5 | `backend/app/core/config.py` | Session and CSRF configuration keys |
| B6 | `backend/app/core/security/dependencies.py` | Unified cookie-session `get_current_user`; normalized 401/403; remove OAuth2 bearer scheme as primary auth |
| B7 | `backend/app/services/user_service.py` | Remove or delegate duplicate bearer `get_current_user` |
| B8 | `backend/app/routers/users.py` | `/users/me` dependency alignment |
| B9 | `backend/app/schemas/user.py` | Login/session response schema — no client bearer secret |
| B10 | `backend/app/core/handlers.py` | Consistent 401/403 handler behavior |
| B11 | `backend/app/core/exceptions.py` | Auth vs authorization exception mapping |
| B12 | `backend/app/services/account_status_service.py` | Preserve account restriction checks; 403 on restricted authenticate |
| B13 | `backend/app/models/user.py` | No schema change expected — reference only unless FK wiring requires docstring-only touch |
| B14 | `backend/app/routers/admin_users.py` | No direct edit required if dependencies normalize status codes — **included only if integration test gap requires route-level assertion** |
| B15 | `backend/app/routers/realtor_profiles.py` | Unified session dependency for `require_realtor` |
| B16 | `backend/app/core/rate_limit.py` | Session/user-scoped limiter key replacing bearer digest |
| B17 | `backend/app/routers/favorites.py` | Migrate from `user_service.get_current_user` to unified dependency |
| B18 | `backend/app/routers/properties.py` | Verify optional-auth paths operate under cookie model — **dependency-only; direct edit only if optional session extraction requires explicit change** |

#### 32.11.2 Backend — new paths (required by §26.4 server session authority; absence confirmed by repository search during draft preparation)

| # | Path | Correction purpose |
|---|------|-------------------|
| BN1 | `backend/app/models/auth_session.py` | Server-side session persistence model (precedent: `password_reset_token.py`) |
| BN2 | `backend/app/models/__init__.py` | Register `AuthSession` model |
| BN3 | `backend/app/services/session_service.py` | Create, validate, renew idle timeout, invalidate sessions |
| BN4 | `backend/app/core/security/csrf.py` | CSRF token generation and validation |
| BN5 | `backend/alembic/versions/<new_revision>_add_auth_sessions.py` | Persist `auth_sessions` table |

#### 32.11.3 Backend — validation artifact (implementation phase only)

| # | Path | Correction purpose |
|---|------|-------------------|
| BT1 | `backend/tests/test_iwp006_f001_session_auth.py` | Targeted tests for session, logout, CSRF, 401/403 normalization |

#### 32.11.4 Frontend — existing paths (published §24.4 nine-path boundary)

| # | Path | Correction purpose |
|---|------|-------------------|
| F1 | `frontend/lib/tokenStorage.ts` | Remove `localStorage` access-token persistence; eliminate JS-readable auth credential |
| F2 | `frontend/lib/authFetch.ts` | `credentials: 'include'`; remove bearer header; 401/403 reconciliation; CSRF header injection |
| F3 | `frontend/context/AuthContext.tsx` | Server-coordinated logout; session restore via cookie + `/users/me`; remove token save path |
| F4 | `frontend/services/authApi.ts` | Login/logout API contracts; align error handling with unified client |
| F5 | `frontend/types/auth.ts` | Remove bearer-token-centric response types from session path |
| F6 | `frontend/types/user.ts` | No role-model change — reference only unless type coupling requires adjustment |
| F7 | `frontend/components/ProtectedRoute.tsx` | Presentation guard under reconciled session state |
| F8 | `frontend/components/AdminRoute.tsx` | Presentation guard under reconciled session state |
| F9 | `frontend/components/RealtorRoute.tsx` | Use context `isRealtor`; reduce duplicated role derivation (SR-F001-006) |

#### 32.11.5 Frontend — new path

| # | Path | Correction purpose |
|---|------|-------------------|
| FN1 | `frontend/lib/csrf.ts` | CSRF token read and header helper for mutating requests |

#### 32.11.6 Explicit write-set exclusions

- `frontend/services/api.ts` and F-013 caller graph
- `backend/app/routers/ai.py`, `admin_stats.py`, `uploads.py`, `realtor_applications.py` — **excluded unless implementation discovers broken auth integration; any expansion requires separate authority**
- Infrastructure, CI/CD, deployment manifests
- Register, handoff, roadmap, unrelated IWP evidence
- `.env`, secrets, production configuration values

**Write-set cardinality:** 18 existing backend + 5 new backend + 1 new backend test + 9 existing frontend + 1 new frontend = **34 authorized paths maximum** (conditional paths B14/B18 may remain unchanged if dependency normalization suffices without edit).

### 32.12 Finding-To-Correction Mapping

| Finding | Severity | Required correction (governance level) | Write-set anchors | Resolved by this draft? |
|---------|----------|----------------------------------------|-------------------|-------------------------|
| SR-F001-001 | HIGH | Eliminate JS-readable bearer persistence; HttpOnly session cookie; no access token in login JSON body | F1, F2, F3, B2, B3, B6, B9 | **NO** |
| SR-F001-002 | HIGH | Unified 401/403 contract; in-session reconciliation in `authFetch` and `AuthContext` | F2, F3, B6, B8, B10, B11 | **NO** |
| SR-F001-003 | MEDIUM | Server logout endpoint; session invalidation; coordinated client logout | F3, F4, B2, B3, BN3 | **NO** |
| SR-F001-004 | MEDIUM | Bounded session lifetime; sliding idle timeout; no client-side bearer renewal | B3, B5, BN1, BN3, BN5, F3 | **NO** |
| SR-F001-005 | MEDIUM | Single cookie-session transport; remove dual bearer fetch models within nine-path boundary | F2, F4, F5, B6, B7 | **NO** |
| SR-F001-006 | LOW | Unified server dependency; align `RealtorRoute` with context role flags | B6, B7, B17, F9 | **NO** |
| SR-F001-007 | LOW | Optional guard UX improvement within route components | F7, F8, F9 | **NO** |

No finding may be marked resolved, reclassified, or closed by this draft.

### 32.13 Required Tests And Validation

Validation is required after separately authorized implementation. Application tests are **NOT RUN** by this draft-preparation task.

| Concern | Required validation |
|---------|---------------------|
| Session issuance | Login sets HttpOnly session cookie; response body contains no bearer access token |
| Session extraction | Protected route accepts valid session cookie without `Authorization` header |
| Session expiry | Expired or idle-timeout session returns 401 |
| Logout | Logout invalidates server session and clears cookies; subsequent protected request returns 401 |
| CSRF | Mutating request without valid CSRF token rejected; safe methods unaffected |
| 401 normalization | Invalid or missing session returns 401 on `/users/me` and representative protected routes |
| 403 normalization | Restricted account and insufficient role return 403, not 400 |
| Dependency consistency | `favorites` and `/users/me` paths use same session dependency behavior |
| Frontend reconciliation | Simulated 401 from API clears client session presentation |
| Frontend storage | No `localStorage` / `sessionStorage` auth credential after login |
| Rate limit | Upload limiter operates without raw bearer token in key material |
| Observability | Login/logout/failure events log without credential payload |
| Regression | Existing password-reset flow unaffected within auth router scope |

**Validation mode:** targeted backend tests (BT1) plus bounded manual or automated frontend verification within nine-path surfaces; full runtime validation authorized only under future implementation gate.

### 32.14 Migration, Configuration, Security, Compatibility, And Rollback

| Dimension | Assessment |
|-----------|------------|
| **Migration** | One new Alembic revision (BN5) creating `auth_sessions` table; no data backfill from JWT; existing users re-authenticate after deployment |
| **Configuration** | New session/CSRF config keys (§32.5); production origin list for CORS remains env-backed — not decided here |
| **Security** | Removes XSS-readable bearer credential; introduces CSRF surface requiring synchronizer token; server-side revocation enabled |
| **Compatibility** | **Breaking** for any client expecting JSON bearer token — bounded to IWP-006 frontend write set; external clients out of scope |
| **Rollback** | Revert BN5 migration and code changes in single bounded rollback; active sessions invalidated on rollback; users re-authenticate under restored or interim posture |
| **Dual-mode bearer/cookie** | **Not authorized** — single cookie-session posture only |

### 32.15 §26.7 Gate 6 — Independent Review Before Implementation

| Item | Requirement |
|------|-------------|
| Review target | This sixth amendment draft (§32) |
| Review basis | Published §26 @ `def29765e…`; published frontend evidence @ `fe73288…`; published backend evidence @ `7395ced…`; write-set bounds; stop conditions |
| Review outcome | Must occur before any **implementation authorization** amendment |
| Review does not authorize | Implementation, validation execution, publication, or finding resolution |

### 32.16 Stop Conditions

Correction-scope progression or future implementation must stop if:

1. repository baseline or authority materially differs from verified state;
2. write-set execution expands beyond §32.11 without separate authority;
3. F-013 / `api.ts` consolidation is introduced without separate authority;
4. CSRF strategy cannot be implemented within bounded write set;
5. session store migration cannot be isolated to BN5;
6. SR-F001-001 or SR-F001-002 would remain unresolved at implementation authorization gate;
7. secret, credential, or production-data access would be required to complete correction;
8. dual bearer-and-cookie auth mode would be introduced;
9. this draft conflicts with published Repository Authority;
10. independent review of this draft is skipped before implementation authorization;
11. implementation authorization is requested before bounded publication of this amendment.

### 32.17 Lifecycle Separation

| Stage | Rule |
|-------|------|
| §32 draft authoring (this task) | Not review |
| Independent targeted review | Not publication |
| Bounded publication of §32 | Not implementation authorization |
| Implementation authorization (future amendment) | Not implementation execution |
| Correction execution | Not post-correction validation |
| Post-correction validation | Not F-001 resolution claim |
| F-001 resolution | Not IWP-006 acceptance |
| IWP-006 acceptance | Not closure |
| Merge | Not release |
| Push | Not authorized by this draft |

### 32.18 Explicit Non-Authorization

This sixth amendment draft does **not** authorize:

- technical implementation or correction execution;
- post-correction validation execution;
- F-001 resolution or SR-F001 finding resolution/reclassification;
- IWP-006 acceptance or closure;
- register, handoff, or continuity synchronization;
- staging, commit, push, merge, release, deployment, or launch beyond future separately authorized publication of an approved amendment version;
- automatic effectiveness of the write set — write set is **defined** but **not executable** until a future implementation authorization gate.

Each later gate requires separate Repository Authority.

### 32.19 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Sixth amendment draft authored | YES — by this draft preparation action |
| Sixth amendment reviewed | NOT RUN |
| Sixth amendment published | NOT RUN |
| Sixth amendment effective | NOT RUN |
| §26.7 gates 1–5 decided in draft | YES |
| §26.7 gate 6 (pre-implementation review) | REQUIRED — NOT RUN |
| Exact technical write set | ESTABLISHED IN DRAFT — NOT EFFECTIVE |
| Technical implementation authorized | NO |
| Backend validation | COMPLETED — evidence published @ `7395ced…` |
| F-001 resolved | NO |

---

## 33. Exact Next Lifecycle Action After F-001 Consolidated Correction-Scope Draft Preparation

After preparation of this sixth amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only review of **Sixth Amendment Draft — Consolidated F-001 Technical Correction-Scope Decision** in §32 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against controlling Repository Authority, published §26 correction-scope framework @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0`, published §24 frontend evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`, published backend validation evidence @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6`, §26.7 gate completeness, write-set bounds and exclusions, finding coverage, CSRF and session decisions, stop conditions, lifecycle separation, and prohibition on premature implementation authorization.

That review must not modify files; must not approve, publish, or make the amendment effective; must not authorize or perform implementation; must not execute the write set; must not resolve or reclassify F-001 or any SR-F001 finding; must not authorize technical implementation; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; must not stage, commit, or push; and must not deploy, release, launch, or scale.

---

## 34. Seventh Amendment Draft — Bounded F-001 Technical Implementation Execution Authorization

**Amendment title:** IWP-006 Bounded F-001 Technical Implementation Execution Authorization

**Amendment status:** DRAFT - NOT REVIEWED - NOT PUBLISHED - NOT EFFECTIVE

**Independent review:** NOT RUN

**Publication-readiness decision:** NOT RUN

**Technical correction-scope decision:** PUBLISHED @ `867694cb555fedb417832e58a0bddb2438858fdc` (§32–§33)

**F-001 technical implementation execution:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT EFFECTIVE

**Exact technical write set:** ESTABLISHED BY PUBLISHED §32.11 — NOT EXECUTABLE UNTIL THIS AMENDMENT IS PUBLISHED AND SEPARATELY INVOKED

**F-001:** UNRESOLVED

**F-013:** UNCERTAIN - DEFERRED — OUT OF WRITE SET

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This seventh amendment draft defines the **distinct execution-authorization gate** for one future bounded F-001 technical implementation pass directly subordinate to published §32 @ `867694cb555fedb417832e58a0bddb2438858fdc`. It does **not** authorize implementation during draft preparation, review, or publication authoring; does **not** execute the write set; does **not** resolve findings; and does **not** accept or close IWP-006.

Drafting this amendment is not review, approval, publication, implementation execution, post-implementation validation, finding resolution, or acceptance.

### 34.1 Identity And Authority Chain

| Field | Value |
|-------|-------|
| Amendment identity | Seventh amendment draft within `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` |
| Stable title | IWP-006 Bounded F-001 Technical Implementation Execution Authorization |
| Controlling correction scope | Published §32–§33 @ `867694cb555fedb417832e58a0bddb2438858fdc` |
| Correction-scope review | COMPLETED - PASS — F-001 CONSOLIDATED CORRECTION SCOPE APPROVED FOR PUBLICATION |
| Backend validation evidence | Published @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6` |
| Frontend security evidence | Published @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49` |
| Prior correction-scope framework | Published §26–§27 @ `def29765e7bdafdb3ce4d0f2687df6e4822c5ca0` |
| Package | IWP-006 — SELECTED - ACTIVE |
| Finding scope | F-001 only; SR-F001-001 through SR-F001-007 |

| Authority | Role |
|-----------|------|
| Published §32.4–§32.14 | Architecture, write set, validation, migration, stop conditions — **not reinterpreted** |
| Published §32.11 | Maximum 34-path write set — incorporated by reference |
| Published §32.13 | Required validation set — incorporated by reference |
| Published §32.16 | Stop conditions — incorporated by reference |
| SECURITY_STANDARDS, AUTHENTICATION_ARCHITECTURE, AUTHORIZATION_ARCHITECTURE, API_STANDARDS | Compliance consumption |
| IMPLEMENTATION_GOVERNANCE, REPOSITORY_STANDARDS | Lifecycle and evidence gates |
| OBSERVABILITY_ARCHITECTURE | Credential-safe lifecycle evidence (AUTHN-SES-6 alignment) |

### 34.2 Execution Authorization Boundary

| Boundary | Rule |
|----------|------|
| Draft authoring (this task) | Does **not** authorize implementation |
| Independent targeted review | Required before publication |
| Bounded publication of §34 | Makes F-001 technical implementation **execution authorization effective** under published §32 only |
| Publication of §34 | Does **not** start implementation automatically |
| Implementation execution | Begins only through a **separate invoked bounded execution task** referencing published §32 and published §34 |
| Unreviewed working-tree draft | Must **not** be treated as authorization to implement |
| Post-implementation validation | Separate from this authorization |
| Finding resolution / IWP-006 acceptance | Separate gates — not authorized here |

Upon future publication, this amendment authorizes **one coordinated F-001 implementation pass**. No additional scope-definition artifact is required before invocation.

### 34.3 Preserved Architecture (No Redesign)

Future authorized execution must implement published §32 decisions without architectural reinterpretation:

- server-side persisted session authority;
- opaque session identifier in HttpOnly Secure SameSite cookie;
- sliding idle timeout plus absolute expiry;
- **no refresh-token mechanism** in this bounded scope;
- server logout, session invalidation, and cookie clearing;
- synchronizer-token CSRF protection on mutating requests;
- normalized **401** (missing/invalid/expired/revoked session) and **403** (forbidden role/account);
- single cookie-session authentication dependency;
- credential-safe observability;
- **no bearer/cookie dual mode** and no partial production bearer posture.

### 34.4 Write Set Incorporation

| Rule | Requirement |
|------|-------------|
| Authoritative list | Published §32.11 only |
| Maximum paths | **34** — no additional path implied |
| Conditional paths | B14/B18 may remain unchanged if dependency normalization suffices |
| Exclusions | F-013 and `frontend/services/api.ts` remain **excluded** |
| Expansion | Any required path beyond §32.11 → **immediate stop** per §32.16 and §34.9 |
| env.py | `backend/alembic/env.py` is **not** in the published 34-path maximum; add AuthSession to env.py model imports **only if** hand-written migration BN5 cannot be validated safely without it — treat as bounded sub-decision within BN5/BN2, not write-set expansion |

### 34.5 Implementation-Time Constraints (From Correction-Scope Review)

These are execution constraints carried forward from the independent targeted review; they are **not** new findings and do **not** reopen discovery or correction-scope design:

| Constraint | Requirement |
|------------|-------------|
| Gate semantics | Published §26.7 gate 5 = bounded write set (§32.11); gate 6 = independent review before implementation authorization — satisfied by correction-scope review for scope; **this §34 review** satisfies pre-publication review of implementation authorization |
| CSRF bootstrap | Define safe bootstrap inside approved design: issue CSRF token via bounded auth-surface contract (e.g. login-page load, dedicated safe GET, or login-response pairing) before first mutating authenticated request; unauthenticated login/register POST policy must be explicit in implementation |
| Alembic discovery | Confirm whether BN5 upgrade/downgrade requires `env.py` model registration before editing; prefer hand-written BN5 if sufficient |
| Migration validation | **Explicitly** run Alembic upgrade and downgrade validation as part of required checks |
| F-013 deferral | `frontend/services/api.ts` and caller graph remain deferred; partial bearer surface outside nine-path boundary is a known residual until separate authority |

### 34.6 Coordinated Implementation Pass

Future authorized execution must complete **one coordinated pass** covering:

1. backend session, CSRF, auth dependency, and status-normalization changes within §32.11;
2. Alembic migration BN5 (auth_sessions table);
3. frontend migration from bearer storage/transport within nine-path boundary;
4. targeted backend test artifact BT1;
5. configuration key integration (names only in repository artifacts);
6. **no** partial bearer/cookie production posture at completion.

Execution must not land backend-only or frontend-only cookie session in a deployable intermediate state within this authorized pass.

### 34.7 Required Validation

Future execution must satisfy **all** of published §32.13 plus:

| Additional check | Requirement |
|------------------|-------------|
| Idle vs absolute expiry | Distinct verification that idle timeout and absolute ceiling both enforce 401 |
| Revoked session | Session invalidated by logout or server revocation rejected on subsequent protected access |
| CSRF positive case | Valid CSRF token accepted on representative mutating request |
| Alembic upgrade | BN5 applies cleanly |
| Alembic downgrade | BN5 rolls back cleanly |
| Regression | Relevant backend and frontend regression checks for auth router password-reset path and nine-path surfaces |

Application tests and runtime validation are required **during the future execution task**, not during this authorization draft.

### 34.8 Evidence Requirements

Future execution must produce a bounded evidence artifact (path to be defined at invocation) containing at minimum:

1. exact files changed mapped to §32.11 paths;
2. per-finding mapping: SR-F001-001 through SR-F001-007 → implementation surface → validation performed;
3. commands executed with complete pass/fail results;
4. migration revision identity and upgrade/downgrade evidence;
5. security-sensitive configuration **key names** only — no secret values;
6. residual risks including F-013 deferred surface;
7. final Git state;
8. explicit statement that **no finding is resolved** unless and until separate acceptance authority supports closure.

Evidence alone does not resolve F-001 or any SR-F001 finding.

### 34.9 Stop Conditions

In addition to published §32.16, future execution must stop if:

1. write-set expansion beyond §32.11 would be required;
2. implementation conflicts with published SECURITY, AUTHENTICATION, or AUTHORIZATION architecture;
3. dual bearer/cookie authentication mode would be introduced;
4. CSRF or session persistence cannot be isolated within the 34-path maximum;
5. migration upgrade or downgrade fails or cannot be rolled back safely;
6. SR-F001-001 or SR-F001-002 behavior remains unresolved after implementation;
7. required validation cannot be completed;
8. secret exposure or production-data dependency is discovered;
9. F-013 / `api.ts` scope expansion is attempted without separate authority;
10. repository baseline or controlling authority materially differs from verified state.

### 34.10 Lifecycle Separation

| Stage | Rule |
|-------|------|
| §34 draft authoring (this task) | Not review |
| Independent targeted review | Not publication |
| Bounded publication of §34 | Not implementation execution |
| Separately invoked implementation execution | Not evidence acceptance |
| Post-implementation validation evidence | Not finding resolution |
| Finding resolution | Not IWP-006 acceptance |
| IWP-006 acceptance | Not closure |
| Push | Not authorized by this draft |

### 34.11 Explicit Non-Authorization

This seventh amendment draft does **not** authorize:

- technical implementation during draft preparation or review;
- backend or frontend code changes during draft preparation;
- migration creation or execution during draft preparation;
- post-implementation validation during draft preparation;
- F-001 resolution or SR-F001 finding resolution/reclassification;
- IWP-006 acceptance or closure;
- register, handoff, or continuity synchronization;
- staging, commit, push, merge, release, deployment, or launch beyond future separately authorized publication and invocation.

### 34.12 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Seventh amendment draft authored | YES — by this draft preparation action |
| Seventh amendment reviewed | NOT RUN |
| Seventh amendment published | NOT RUN |
| Seventh amendment effective | NOT RUN |
| F-001 implementation execution authorized | NO |
| Write set executable | NO — pending publication and invocation |
| F-001 resolved | NO |

---

## 35. Exact Next Lifecycle Action After F-001 Technical Implementation Execution Authorization Draft Preparation

After preparation of this seventh amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only targeted review of **Seventh Amendment Draft — Bounded F-001 Technical Implementation Execution Authorization** in §34 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against published §32 @ `867694cb555fedb417832e58a0bddb2438858fdc`, correction-scope review PASS, published backend evidence @ `7395ced7925903ccec9d1a8dcd413f80f2b0b7c6`, published frontend evidence @ `fe73288e2881147d7b7e4dc8e5f51ccc673ced49`, write-set incorporation by reference, architecture preservation, implementation-time constraints, coordinated-pass requirements, validation and evidence requirements, stop conditions, lifecycle separation, and prohibition on premature implementation execution.

That review must not modify files; must not approve, publish, or make the amendment effective; must not authorize or perform implementation; must not execute the write set; must not resolve or reclassify F-001 or any SR-F001 finding; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; must not stage, commit, or push; and must not deploy, release, launch, or scale.

---

## 36. Eighth Amendment Draft — Bounded F-001 Regression-Test Alignment Authorization

**DRAFT — NOT REVIEWED — NOT PUBLISHED — NOT EFFECTIVE**

This eighth amendment draft authorizes a later bounded correction of one legacy regression test whose expectation conflicts with published F-001 authentication-failure and status-normalization semantics. Draft preparation does not modify tests, production code, or findings posture.

### 36.1 Trigger

F-001 technical implementation execution (invoked under published §34 @ `2257bf8512d1d3b412ddf61d9e00777239f805fe`) produced one backend regression failure:

| Item | Verified value |
|------|----------------|
| Command | `pytest tests/test_iwp_003_domain_authorization.py -q` |
| Result | **FAIL** — 1 failed, 28 passed |
| Failing test | `test_role_guard_denies_ordinary_user` |
| Current test expectation | `pytest.raises(BadRequestException)` for `dependencies.require_admin_or_realtor(ordinary_user)` and `dependencies.require_admin(ordinary_user)` |
| Implemented behavior | `ForbiddenException("Admin or realtor access required")` and `ForbiddenException("Admin access required")` in `backend/app/core/security/dependencies.py` |
| HTTP semantics | Authenticated ordinary user denied by role guard → **403 Forbidden**, not 400 Bad Request |

The failure is a test-expectation drift against published correction scope, not a defect in the implemented role-guard behavior required by §32.

### 36.2 Authority Hierarchy

Published Repository Authority controls over the obsolete test expectation:

| Authority | Requirement |
|-----------|-------------|
| Published §32.8 @ `867694cb555fedb417832e58a0bddb2438858fdc` | Missing or invalid session → **HTTP 401**; authenticated but forbidden role or account restriction → **HTTP 403**; role-guard failures in `require_admin` / `require_admin_or_realtor` must use **403, not 400** |
| Published §32.9 | Role enforcement remains server-side via unified session-based dependencies in `dependencies.py` |
| AUTHORIZATION_ARCHITECTURE.md | Insufficient role scope → deny without domain mutation; authorization denial when required role or scope is absent |
| F-001 implementation evidence | Documents the same single-test regression; implementation behavior matches §32 |

Reverting production role-guard behavior to `BadRequestException` / HTTP 400 would violate published §32.8 and the F-001 correction scope. Test alignment is the smallest valid correction.

### 36.3 Authorized Later Correction

When this amendment is independently reviewed, published, and separately invoked, it authorizes **only**:

- align the affected expectation in `test_role_guard_denies_ordinary_user` from `BadRequestException` to `ForbiddenException`;
- update directly associated assertion text or comments within that test function if needed for honesty;
- preserve all other tests in the module unchanged unless diagnostic evidence during later execution proves an additional assertion in the same function still encodes the obsolete 400 role-guard expectation.

No other test function, module, or assertion surface is authorized by this draft.

### 36.4 Production-Code Prohibition

The later correction authorized by this draft must **not**:

- modify `backend/app/core/security/dependencies.py` or any other production module;
- change `require_admin`, `require_admin_or_realtor`, or unified session authentication behavior;
- change exception classes, HTTP status mapping, handlers, or middleware;
- revert 403 role-guard semantics to 400;
- modify the uncommitted F-001 implementation diff;
- modify migrations, configuration, frontend, or F-013 surfaces.

### 36.5 Maximum Write Set

Exactly **one** path:

| Path | Purpose |
|------|---------|
| `backend/tests/test_iwp_003_domain_authorization.py` | Align obsolete role-guard denial expectation with published 403 semantics |

No other path may be created, modified, deleted, renamed, or generated under this amendment.

### 36.6 Required Later Validation

Future execution under this amendment must run at minimum:

| Check | Purpose |
|-------|---------|
| `pytest tests/test_iwp_003_domain_authorization.py::test_role_guard_denies_ordinary_user -q` | Previously failing targeted test |
| `pytest tests/test_iwp_003_domain_authorization.py -q` | Complete module regression |
| `pytest tests/test_iwp006_f001_session_auth.py -q` | F-001 targeted session-auth tests |
| `pytest tests/test_backend_smoke.py -q` | Backend smoke tests |
| `git diff --check` | Whitespace and conflict-marker integrity |

Passing these checks does not resolve or accept F-001.

### 36.7 Lifecycle Boundary

| Stage | Rule |
|-------|------|
| §36 draft authoring (this task) | Not review; not test modification |
| Independent targeted review | Not publication |
| Bounded publication of §36 | Not corrective execution |
| Separately invoked corrective execution | Not finding resolution |
| Passing regression tests | Not F-001 acceptance |

Draft preparation does not authorize test modification, publication, or invocation of this amendment.

### 36.8 Findings Posture

| Item | Status |
|------|--------|
| F-001 | **UNRESOLVED** |
| SR-F001-001 through SR-F001-007 | **UNRESOLVED** |
| IWP-006 | Not accepted; not closed |

Test alignment alone does not resolve, accept, reclassify, or close any finding.

### 36.9 Stop Conditions

Later correction must stop without expanding scope if:

1. production-code modification would be required to make the test pass;
2. another test file, application path, or assertion outside `test_role_guard_denies_ordinary_user` must change;
3. published 401/403 semantics are ambiguous or conflict with corrected expectations;
4. the failing behavior cannot be reproduced;
5. unrelated working-tree interference prevents safe isolation of the one-file correction;
6. write-set expansion beyond the single authorized path would be required.

On stop: preserve diagnostics; do not commit or push; do not resolve findings.

### 36.10 Amendment Status And Effectiveness Boundary

| State | Current value |
|-------|---------------|
| Eighth amendment draft authored | YES — by this draft preparation action |
| Eighth amendment reviewed | NOT RUN |
| Eighth amendment published | NOT RUN |
| Eighth amendment effective | NOT RUN |
| Regression-test correction authorized | NO |
| Write set executable | NO — pending publication and invocation |
| F-001 resolved | NO |

---

## 37. Exact Next Lifecycle Action After F-001 Regression-Test Alignment Authorization Draft Preparation

After preparation of this eighth amendment draft, the exact next authorized action is:

Perform one bounded, independent, read-only targeted review of **Eighth Amendment Draft — Bounded F-001 Regression-Test Alignment Authorization** in §36 of `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` against published §32.8 @ `867694cb555fedb417832e58a0bddb2438858fdc`, the verified regression diagnostic (`test_role_guard_denies_ordinary_user` expecting `BadRequestException` while implementation raises `ForbiddenException`), one-file maximum write set, production-code prohibition, required later validation, stop conditions, lifecycle separation, and prohibition on premature corrective execution.

That review must not modify files; must not approve, publish, or make the amendment effective; must not authorize or perform test correction; must not resolve or reclassify F-001 or any SR-F001 finding; must not accept or close IWP-006; must not update the Work Package Register or continuity surfaces unless separately authorized; must not stage, commit, or push; and must not deploy, release, launch, or scale.

---

## 38. Current Disposition — Governance Threshold Continuity Correction (2026-07-24)

**Disposition class:** Current live continuity correction only
**Publication claim:** NONE — local authoring pending independent Scoped Validation
**Historical sections §1–§37:** retained as point-in-time records; not rewritten

### 38.1 Current live posture

| Item | Current live value |
|------|--------------------|
| Stage I4 | IN PROGRESS |
| IWP-006 | SELECTED - ACTIVE - NOT ACCEPTED - NOT CLOSED |
| Active implementation packages | 1 - IWP-006 |
| Currently open authorized technical execution packages | 0 |
| Bounded F-001 implementation | COMPLETED AND INDEPENDENTLY ACCEPTED |
| F-001 | RESOLVED within bounded F-001 scope |
| SR-F001-001 through SR-F001-007 | RESOLVED within bounded F-001 scope |
| F-013 | deferred and outside completed F-001 scope |
| Phase 4 | NOT STARTED |
| IWP-006 acceptance | NOT GRANTED |
| IWP-006 closure | NOT GRANTED |
| Stage I4 completion | NOT COMPLETED |

Evidence consumed for F-001 disposition (not modified by this correction):

- `docs/implementation/IWP_006_F001_IMPLEMENTATION_EVIDENCE.md`
- `docs/implementation/IWP_006_F001_BACKEND_VALIDATION_EVIDENCE.md`
- F-001 implementation commit `084711f386a335e833311e85c38e1fbda1d452f9`

### 38.2 Governance threshold consumption

This disposition consumes the Authorization Continuity Threshold integrated into:

- `docs/engineering/REPOSITORY_STANDARDS.md` §11.6.10A
- `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-ID-11

`docs/engineering/GOVERNANCE_THRESHOLD_AMENDMENT.md` remains subordinate rationale/integration record only and is not binding.

### 38.3 Exact next authorized action

Independent read-only Scoped Validation of this exact governance threshold integration and continuity correction before publication.

This disposition does **not** publish the integration, declare ACTIVE AUTHORITY, accept or close IWP-006, complete Stage I4, start Phase 4, authorize F-013, or authorize push, release, deployment, launch, or scaling.

---

## 39. Ninth Amendment — Bounded F-005 Route Guard Presentation Stabilization

**Amendment title:** IWP-006 Bounded F-005 Route Guard Presentation Stabilization

**Amendment status:** PUBLISHED - EFFECTIVE (F-005 BOUNDED IMPLEMENTATION AUTHORIZATION ONLY)

**Independent review:** COMPLETED - PASS (Publication Readiness Review) — evidence `docs/implementation/reviews/IWP_006_SECTION_39_PUBLICATION_READINESS_REVIEW.md`

**Publication-readiness decision:** COMPLETED - PASS - APPROVED FOR BOUNDED PUBLICATION

**Publication integration:** COMPLETED BY THIS PUBLICATION COMMIT

**F-005 technical implementation execution:** NOT AUTHORIZED - NOT STARTED

**Technical implementation authorization:** NOT AUTHORIZED - NOT EFFECTIVE UNTIL SEPARATELY INVOKED

**Exact technical write set:** ESTABLISHED BY §39.3 — NOT EXECUTABLE UNTIL SEPARATELY INVOKED

**F-001:** RESOLVED within bounded F-001 scope — NOT REOPENED by this amendment

**F-002:** UNRESOLVED — EXPLICITLY DEFERRED (F-013 / `api.ts` boundary)

**F-013:** UNCERTAIN - DEFERRED — OUT OF WRITE SET

**IWP-006 acceptance:** NOT GRANTED

**IWP-006 closure:** NOT GRANTED

This ninth amendment is effective only as authorization for one future bounded F-005 technical implementation pass under §39.3 (G1–G3). It does **not** authorize implementation during publication integration; does **not** execute the write set; does **not** resolve IWP-006 acceptance or closure; and does **not** authorize push, release, deployment, or launch.

Publication of this amendment is not implementation execution, slice disposition, or IWP-006 acceptance.

### 39.1 Identity and authority chain

| Authority | Role |
|-----------|------|
| `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` §38 | Current live IWP-006 disposition; F-001 complete |
| `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` §11 | F-005 findings register — sole in-scope finding for this slice |
| `docs/implementation/IWP_006_F001_IMPLEMENTATION_EVIDENCE.md` §4 | F7 `ProtectedRoute.tsx`, F8 `AdminRoute.tsx` left unchanged; F-013 / `api.ts` excluded |
| Published §32.9 @ `867694cb555fedb417832e58a0bddb2438858fdc` | SR-F001-007: route-guard UX / flash reduction permitted in bounded route components |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` IWP-006 entry | Package scope includes route guards; deliverable includes protected route behavior |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` IMPL-ID-11; `REPOSITORY_STANDARDS.md` §11.6.10A | One authorization → implementation → bounded corrections → one final review → slice disposition |
| `docs/engineering/FRONTEND_ARCHITECTURE.md` | Owner — route guards, client presentation |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` AUTHZ-BND-3 | Client guards remain presentation-only; server authority unchanged |

**Finding scope for this amendment:**

| Finding | Treatment |
|---------|-----------|
| **F-005** | **Primary — IN SCOPE — sole implementation target** |
| F-001 | CLOSED — not reopened |
| F-002 | UNRESOLVED — **deferred** (requires `frontend/services/api.ts`; F-013 boundary) |
| F-003 | OUT OF SCOPE — requires `api.ts` for complete resolution |
| F-004 | Substantially addressed in F-001; G3 touch limited to F-005 presentation consistency only |
| F-006, F-007 | OUT OF SCOPE — require `api.ts` |
| F-008, F-009 | OUT OF SCOPE — deferred to later IWP-006 slices |
| F-010–F-012 | OUT OF SCOPE |
| F-013 | DEFERRED — OUT OF SCOPE |

**Slice selection rationale:** F-005 is the smallest open finding **fully resolvable without `frontend/services/api.ts`**, within IWP-006 register areas. F-002 and F-003 remain HIGH severity but are **boundary-deferred**, not abandoned, because discovery and F-001 exclusions prohibit `api.ts` modification in this slice (discovery F-013 → IWP-007 coordination).

### 39.2 Objectives (exact)

Future authorized execution must achieve **only** the following:

**F-005 — Route guard presentation normalization**

Normalize loading, unauthenticated, and unauthorized presentation across `ProtectedRoute`, `AdminRoute`, and `RealtorRoute` so that:

- guards do not render `null` briefly after loading completes before redirect;
- denied-state UX is consistent across the three route surfaces;
- guards consume reconciled cookie-session auth state from F-001 via `useAuth()` without adding client-side authorization authority.

**Non-objectives (explicit):**

- Dual-client consolidation (F-002)
- Error envelope unification (F-003)
- Shared API config extraction (F-008)
- Session-failure transport redesign (F-009)
- Any `authFetch`, `authApi`, `AuthContext`, `tokenStorage`, or `csrf` modification
- Backend, migration, or session-model changes
- IWP-006 package acceptance or closure

### 39.3 Exact bounded technical write set

**Maximum paths: 3.** No path beyond this list may be modified. No new paths may be created.

#### 39.3.1 Authorized modifications

| # | Path | Purpose |
|---|------|---------|
| G1 | `frontend/components/ProtectedRoute.tsx` | F-005 — loading/denied presentation normalization |
| G2 | `frontend/components/AdminRoute.tsx` | F-005 — loading/denied presentation normalization |
| G3 | `frontend/components/RealtorRoute.tsx` | F-005 — loading/denied presentation normalization; preserve F-001 `isRealtor` usage |

#### 39.3.2 Explicit exclusions — prohibited modifications

- `frontend/lib/authFetch.ts`
- `frontend/services/authApi.ts`
- `frontend/context/AuthContext.tsx`
- `frontend/lib/tokenStorage.ts`
- `frontend/lib/csrf.ts`
- `frontend/types/auth.ts` and all other `frontend/types/**`
- `frontend/services/api.ts` and all F-013 surfaces
- All backend paths, migrations, tests, dependency manifests, CI, infrastructure, deployment artifacts
- `docs/**` governance and continuity surfaces (unless separately authorized)
- Any F-001 write-set path not listed in §39.3.1

### 39.4 Preserved architecture (F-001 non-reopening)

Future execution must **preserve** all F-001 decisions without modification to any excluded path:

- HttpOnly cookie session + CSRF double-submit
- `authFetch` with `credentials: 'include'`; no bearer reintroduction
- Server-side session authority; client guards remain presentation-only (AUTHZ-BND-3)
- No refresh-token mechanism
- No backend/router/service/schema/migration edits
- Login/register/logout transport contracts in `authApi.ts` unchanged
- F-013 bearer residual on excluded `api.ts` surfaces remains known accepted residual

Any requirement touching session transport, CSRF, cookie names, login/logout backend contracts, auth client modules, or Alembic → **STOP** — out of slice scope.

### 39.5 Implementation authorization boundary

| Boundary | Rule |
|----------|------|
| Publication of §39 | Makes F-005 bounded write set **defined and invokable**; does **not** auto-start execution |
| Implementation invocation | One separate bounded execution task referencing published §39 |
| Bounded corrections | Permitted under **this same §39 authorization** per IMPL-ID-11 / §11.6.10A |
| Final review | One targeted review of implementation evidence before slice disposition |
| Slice disposition | Records F-005 resolution within bounded scope |
| IWP-006 acceptance | Separate gate — **not authorized here** |

### 39.6 Required validation

| Check | Requirement |
|-------|-------------|
| Frontend typecheck | `npm run typecheck` — PASS or recorded stop |
| Frontend lint | `npm run lint` — PASS or recorded stop |
| Frontend build | `npm run build` — PASS or recorded stop |
| Route guard tests | **UNAVAILABLE** — no frontend test tooling in repository; record unavailable-evidence justification per register IWP-006 Validation Requirements |
| Manual guard-flow review | **Required** — document loading, unauthenticated redirect, and wrong-role redirect for Protected, Admin, and Realtor routes |
| Authority trace | Map G1–G3 to F-005 and register deliverable "protected route behavior" |
| Scoped `git diff --check` | PASS on exact write set (G1–G3 only) |
| Backend pytest | NOT REQUIRED — no backend paths authorized |
| Migration checks | NOT REQUIRED — no migration paths authorized |

**Evidence artifact (future, not authorized by publication):** `docs/implementation/IWP_006_F005_IMPLEMENTATION_EVIDENCE.md`

### 39.7 Security review requirements

| Gate | Application |
|------|-------------|
| **IMPL-GATE-5** | Applies — route guard presentation surfaces touched |
| Review type | Targeted validation — presentation-layer only |
| Review focus | Confirm guards do not become authorization authority (AUTHZ-BND-3); confirm no auth transport or storage changes; confirm no `api.ts` expansion |
| Controlling prior evidence | `IWP_006_TOKEN_STORAGE_SECURITY_REVIEW_EVIDENCE.md`; F-001 implementation evidence |
| Separate token-storage review | **NOT REQUIRED** — no storage or transport change authorized |

Security review is part of the **final review** gate after implementation, not a separate pre-authorization cascade.

### 39.8 Stop conditions

Execution must **STOP** and escalate if:

1. Modification of any path outside §39.3.1
2. Any edit to `frontend/services/api.ts` or F-013 caller-graph work
3. Any edit to `authFetch.ts`, `authApi.ts`, `AuthContext.tsx`, `tokenStorage.ts`, `csrf.ts`, or other F-001 auth-layer paths
4. **Login/logout/register transport change** — including request shape, credentials mode, form-login path, or cookie issuance/consumption behavior
5. **CSRF or session contract change** — including cookie names, CSRF header/cookie semantics, or session-restore/logout coordination
6. **`authApi` transport redesign** — including routing login through `authFetch` or altering F-001-established auth bootstrap
7. **Authorization logic inside route guards** — guards must not enforce decisions beyond presentation routing derived from server-reconciled `useAuth()` state (AUTHZ-BND-3)
8. Backend, migration, config, CI, infrastructure, or deployment change required
9. F-001 session architecture reopening required
10. Scope expands to F-002, F-003, F-006, F-007, F-008, F-009, or F-013
11. Unrelated repository files absorbed into the change set
12. IWP-006 acceptance, closure, Stage I4 completion, or Phase 4 start attempted
13. IWP-007 or IWP-008 selection/activation requested
14. New file creation required (write set is closed at G1–G3)

### 39.9 Slice acceptance criteria (not IWP-006 package acceptance)

This slice is **disposition-complete** when all are satisfied:

| Criterion | Evidence |
|-----------|----------|
| F-005 | Guards present consistent loading and denied UX; post-loading `null` flash eliminated or bounded limitation documented with discovery trace |
| F-001 preserved | No regression in session transport; G1–G3 only changed |
| F-002 / F-013 preserved | `api.ts` untouched; F-002 remains explicitly deferred |
| AUTHZ-BND-3 | Guards remain presentation-only |
| Validation | typecheck, lint, build PASS; route-guard test unavailability documented; manual guard review recorded |
| Security | Targeted review PASS — presentation-only guards |
| Lifecycle | Implementation evidence recorded; bounded corrections (if any) under same §39; one final review complete |

**IWP-006 register acceptance criteria** remain **open** — F-002, F-003, and other findings prevent package acceptance after this slice alone.

### 39.10 Explicit out-of-scope items

- F-001 and all SR-F001-* — closed; not reopened
- **F-002** — dual auth client models (`api.ts` required) — **deferred per F-013 boundary**
- F-003, F-008, F-009 — not bundled; deferred to later IWP-006 slices
- F-006, F-007 — require `api.ts`
- F-010–F-012 — not in scope
- F-013 — `api.ts` caller graph; IWP-007 coordination route
- IWP-007, IWP-008 — not selected; not authorized
- Package acceptance, package closure, Stage I4 completion
- Push, tag, release, deployment, production access, Phase 4

### 39.11 Lifecycle separation

```text
§39 publication (one authorization act)
    → bounded F-005 implementation invocation
        → bounded corrections under §39 (if required)
            → one final targeted review
                → slice disposition in implementation evidence
                    → IWP-006 remains NOT ACCEPTED — NOT CLOSED
```

### 39.12 Publication readiness review record

Independent publication readiness review: **COMPLETED - PASS** — evidence `docs/implementation/reviews/IWP_006_SECTION_39_PUBLICATION_READINESS_REVIEW.md`.

That review verified publication readiness only. It did not authorize implementation execution.

---

## 40. Exact Next Lifecycle Action After Ninth Amendment Publication

Perform one separate bounded F-005 technical implementation invocation referencing published §39.3 (G1–G3).

That invocation must not accept or close IWP-006; must not complete Stage I4; must not start Phase 4; must not authorize F-013; must not modify paths outside §39.3.1; must not invoke automatically upon publication; must not update the Work Package Register or continuity surfaces unless separately authorized; and must not push, release, deploy, launch, or scale.
