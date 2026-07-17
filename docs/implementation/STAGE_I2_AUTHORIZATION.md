# Stage I2 Authorization Instrument

**Status:** PUBLISHED - Stage I2 Authorization Instrument
**Authority class:** Implementation program authorization instrument definition
**Binding authority:** Active - per REPOSITORY_STANDARDS.md section 7.6
**Publication:** COMPLETE
**Independent Governance Review:** COMPLETED - PASS
**Independent Publication Review:** COMPLETED - PASS
**Program:** Implementation, Stabilization & Launch
**Stage defined:** I2 - Work Package Definition
**Stage I0:** CLOSED
**Stage I1:** COMPLETION EVIDENCE REQUIRED BEFORE STAGE I2 EXECUTION
**Stage I2:** NOT AUTHORIZED
**Implementation:** NOT AUTHORIZED
**Implementation work packages:** NOT AUTHORIZED
**Work package execution:** NOT AUTHORIZED
**Work package activation:** NOT AUTHORIZED
**Phase 4 Product Development Methodology:** NOT STARTED
**Code-to-Architecture Audit:** NOT AUTHORIZED
**Implementation Gap Register:** NOT AUTHORIZED
**Migration:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED

---

## 1. Lifecycle Purpose And Position

Stage I2 exists to define implementation work packages as governance-ready proposals.

Stage I2 may determine how future work packages should be registered with owner authority, scope, repository areas, acceptance criteria, evidence, dependencies, status, verification expectations, and stop conditions.

This document defines the Stage I2 authorization instrument only. It does not publish active authority, authorize Stage I2 execution, modify the Work Package Register, authorize implementation, activate work packages, perform Code-to-Architecture Audit, create an Implementation Gap Register, start Phase 4, execute release, deploy, or change runtime behavior.

Stage I2 may be authorized only after this document completes its own independent review and publication lifecycle, and only through a separate explicit Stage I2 execution authorization.

---

## 2. Authority Basis

This instrument is subordinate to published Repository Authority:

| Authority | Required interpretation |
|-----------|-------------------------|
| `docs/design/MASTER_ROADMAP.md` | Strategic phase state and non-authorization boundaries control stage transitions |
| `docs/design/CURSOR_HANDOFF.md` | Operational continuity records current checkpoint and next authorized action without creating normative authority |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Document lifecycle, publication, working set, validation, checkpoint, and continuity rules govern this instrument |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Future implementation package governance, authorization separation, gates, evidence, and stop conditions govern Stage I2 content |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Future package evidence and development gate expectations must be selected without starting implementation |
| `docs/engineering/AI_COLLABORATION_STANDARDS.md` | AI-assisted authoring and review remain subordinate to Repository Authority |
| `docs/implementation/IMPLEMENTATION_PROGRAM.md` | Stage I2 is Work Package Definition and remains unauthorized until its gate is explicitly satisfied |
| `docs/implementation/PROGRAM_TRANSITION_HANDOFF.md` | Implementation remains separately unauthorized after program transition |
| `docs/implementation/IMPLEMENTATION_BASELINE.md` | Baseline limitations are constraints, not implementation gaps |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | Register schema, status vocabulary, and intake rules define what Stage I2 may prepare |
| `docs/implementation/STAGE_I1_AUTHORIZATION.md` | Stage I1 readiness model and restrictions remain preserved |
| `docs/implementation/STAGE_I1_EXECUTION_AUTHORIZATION.md` | Stage I1 execution authority does not authorize Stage I2, implementation, or work packages |

If any required authority is missing, unpublished, conflicting, or insufficient when Stage I2 execution is requested, Stage I2 execution must stop.

---

## 3. Authorization Boundary

This draft does not authorize Stage I2 execution.

After this document completes independent governance review, independent publication review, and publication as Repository Authority, it may authorize only the definition of Stage I2 Work Package Definition scope and rules. It still will not authorize execution of Stage I2 by itself unless a separate execution authorization explicitly does so.

Stage I2 definition may permit future register-ready proposed package metadata only after explicit Stage I2 execution authorization exists.

Every Stage I2 output remains proposed and non-active. No package receives `AUTHORIZED` status during Stage I2, no package is activated during Stage I2, and no package execution is authorized during Stage I2.

Package authorization requires a later separate governance decision. Package execution requires later explicit execution authority.

Stage I2 definition must not authorize implementation work, package execution, package activation, package status `AUTHORIZED`, Code-to-Architecture Audit, Implementation Gap Register creation, migrations, deployment, release, Git tags, GitHub Releases, production operations, or Phase 4.

---

## 4. Execution Working Set

If Stage I2 execution is later separately authorized, the minimum execution Working Set must include:

| Authority or evidence | Purpose in Stage I2 |
|-----------------------|---------------------|
| `docs/design/MASTER_ROADMAP.md` | Strategic state, phase boundaries, implementation and Phase 4 restrictions |
| `docs/design/CURSOR_HANDOFF.md` | Continuity state, latest checkpoint, current authorized task, and operational restrictions |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Repository lifecycle, publication rules, validation levels, checkpoint discipline, and continuity rules |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Work package model, authorization interpretation, change classes, gates, evidence, and stop conditions |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Future implementation evidence, testing, review, security, dependency, configuration, and repository hygiene expectations |
| `docs/engineering/AI_COLLABORATION_STANDARDS.md` | AI-assisted scope, generated-output classification, tool-use limits, and no-shadow-authority controls |
| `docs/engineering/ENGINEERING_RELEASE_STRATEGY.md` | Release and implementation separation |
| `docs/implementation/IMPLEMENTATION_PROGRAM.md` | Stage I0-I8 lifecycle, I2-GATE, escalation rules, and acceptance authority |
| `docs/implementation/PROGRAM_TRANSITION_HANDOFF.md` | Program transition boundaries and inherited authorities |
| `docs/implementation/IMPLEMENTATION_BASELINE.md` | Immutable baseline, known limitations, and non-gap treatment |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | Required package fields, ID policy, status vocabulary, schema, intake rules, evidence policy, and register stop conditions |
| `docs/implementation/STAGE_I1_AUTHORIZATION.md` | Stage I1 readiness restrictions and required boundary preservation |
| `docs/implementation/STAGE_I1_EXECUTION_AUTHORIZATION.md` | Stage I1 execution-only authority and remaining restrictions |
| Stage I1 completion evidence | Repository evidence that Stage I1 has completed and identified Stage I2 as the next separately authorized gate |
| Current read-only Git evidence | Branch, HEAD, origin relationship, divergence, working tree, changed-file scope, and unrelated change isolation |

The Working Set may be narrowed only if published Repository Authority explicitly permits a smaller set for the exact Stage I2 task.

The Working Set must exclude application source, migrations, infrastructure, runtime configuration, and deployment artifacts unless a later published authority explicitly authorizes a separate lifecycle. Stage I2 Work Package Definition does not require inspecting implementation code.

---

## 5. Validation Level

Stage I2 execution, if separately authorized, requires Scoped Validation.

Scoped Validation must verify:

1. live repository state;
2. Stage I0 CLOSED state;
3. Stage I1 completion evidence;
4. Stage I2 execution authorization existence and limits;
5. Implementation NOT AUTHORIZED state;
6. work package execution NOT AUTHORIZED state;
7. work package activation NOT AUTHORIZED state;
8. Phase 4 NOT STARTED state;
9. Code-to-Architecture Audit NOT AUTHORIZED state;
10. Implementation Gap Register NOT AUTHORIZED state;
11. Work Package Register schema and intake rules;
12. proposed package metadata completeness rules;
13. validation and evidence requirements for later package authorization decisions;
14. unrelated working-tree isolation;
15. final evidence completeness.

Full Verification is required if Stage I2 execution reveals missing Stage I1 completion evidence, conflicting Repository Authority, ambiguous implementation authorization, a need to inspect application code, a need to perform Code-to-Architecture Audit, or any need to change Product Authority or published Engineering Authority.

Targeted Validation is insufficient for Stage I2 execution because Work Package Definition affects multiple governance surfaces and future implementation intake.

---

## 6. Entry Criteria

Stage I2 execution may begin only if all entry criteria are satisfied:

1. Repository branch, `HEAD`, `origin/main`, divergence, and working-tree state are verified.
2. Stage I0 is confirmed CLOSED.
3. Stage I1 completion evidence exists in Repository Authority or approved Stage I1 execution evidence.
4. This document is PUBLISHED and active after independent governance review and independent publication review.
5. A separate explicit Stage I2 execution authorization exists.
6. Implementation is confirmed NOT AUTHORIZED.
7. Implementation work packages are confirmed NOT AUTHORIZED for execution.
8. Work package activation is confirmed NOT AUTHORIZED.
9. Phase 4 is confirmed NOT STARTED.
10. Code-to-Architecture Audit is confirmed NOT AUTHORIZED.
11. Implementation Gap Register is confirmed NOT AUTHORIZED.
12. Migration, deployment, release, tag, GitHub Release, and production operation are confirmed NOT AUTHORIZED.
13. Required Working Set documents exist at their canonical repository paths.
14. Unrelated working-tree changes, if present, are identified and isolated.
15. Stage I2 scope can be completed without inspecting or modifying application code.

Failure of any entry criterion blocks Stage I2 execution.

---

## 7. Permitted Activities

If separately authorized, Stage I2 may perform only the following activity classes:

| Activity class | Permitted scope |
|----------------|-----------------|
| Repository state verification | Read-only Git branch, HEAD, origin, divergence, status, and changed-file evidence |
| Authority working set inventory | Confirm the active authority documents required for Stage I2 Work Package Definition |
| Stage I1 completion verification | Confirm that Stage I1 completed and routed to Stage I2 |
| Register readiness verification | Verify Work Package Register schema, status vocabulary, intake rules, and evidence policy without editing the register unless separately authorized |
| Package definition model selection | Define metadata required for proposed work packages |
| Proposed package metadata authoring | Draft register-ready proposed package metadata only after Stage I2 execution is explicitly authorized |
| Owner authority mapping | Identify published authority surfaces that would own future package scope |
| Repository area scoping | Identify future allowed repository areas as metadata, without inspecting or modifying implementation files |
| Change class routing | Assign future governance and development change classes without executing changes |
| Evidence planning | Define tests, reviews, checks, unavailable evidence handling, and residual risk requirements for later package authorization |
| Dependency mapping | Identify authority, sequencing, package, environment, review, or evidence dependencies |
| Stop condition definition | Record package-level and stage-level conditions requiring halt |
| Remaining restrictions register | Record restrictions preserved after Stage I2 execution |
| Stage I2 definition report | Record working set, validation, proposed metadata, findings, and decision |
| Continuity synchronization recommendation | Identify whether continuity documents require update after Stage I2 execution |

Permitted activities are governance and documentation activities only.

---

## 8. Prohibited Activities

Stage I2 definition and any future Stage I2 execution must not:

- authorize implementation;
- execute implementation work packages;
- activate implementation work packages;
- set any package status to `AUTHORIZED`;
- set any package status to `IN PROGRESS`;
- begin implementation work;
- inspect application source code unless a later published authority explicitly authorizes another lifecycle;
- modify source code;
- modify database schemas or migrations;
- modify runtime configuration;
- modify infrastructure or deployment artifacts;
- perform Code-to-Architecture Audit;
- create or populate an Implementation Gap Register;
- create implementation gap findings;
- treat known limitations as implementation gaps;
- perform security remediation;
- execute release;
- create Git tags;
- create GitHub Releases;
- deploy;
- perform production operations;
- start Phase 4 Product Development Methodology;
- modify Product Authority;
- redesign published Engineering Authority;
- bypass Repository Standards review or publication rules;
- treat Stage I1 completion as implementation authorization;
- treat proposed package metadata as package execution authorization.

Any request crossing these boundaries must stop and route to the owning published authority process.

---

## 9. Required Deliverables

If Stage I2 execution is separately authorized, required deliverables are:

| Deliverable | Purpose |
|-------------|---------|
| Stage I2 Repository State Evidence | Records branch, HEAD, origin, divergence, working tree, and changed-file scope |
| Stage I2 Working Set Inventory | Lists authority documents and evidence surfaces used |
| Stage I1 Completion Evidence Check | Records whether Stage I1 completion evidence exists and supports Stage I2 entry |
| Stage I2 Validation Results | Records checks, skipped checks, unavailable evidence, and validation level |
| Work Package Definition Model | Defines required metadata for proposed implementation work packages |
| Proposed Package Metadata Set | Records proposed, non-executable package metadata if Stage I2 execution authorization permits drafting it |
| Owner Authority Map | Links each proposed package area to published authority without redefining authority |
| Evidence Requirements Matrix | Defines required tests, reviews, checks, and unavailable evidence handling for later authorization |
| Dependency And Sequencing Map | Records package, authority, evidence, environment, review, or lifecycle dependencies |
| Remaining Restrictions Register | Records implementation, package execution, package activation, audit, gap, migration, deployment, release, and Phase 4 restrictions |
| Stage I2 Work Package Definition Report | Records findings, decisions, acceptance results, blocked areas, and exact next authorized action |
| Continuity Synchronization Recommendation | Records whether continuity documents require update after Stage I2 execution |

No deliverable may be treated as implementation evidence, package authorization, or package execution permission unless later published authority explicitly authorizes that interpretation.

---

## 10. Acceptance Criteria

Stage I2 Work Package Definition may be accepted only if all criteria below are satisfied:

1. Repository state evidence is recorded.
2. Stage I0 CLOSED state is preserved.
3. Stage I1 completion evidence is recorded.
4. Stage I2 execution authorization scope is recorded.
5. Working Set inventory is complete.
6. Validation results are recorded.
7. Work Package Register schema and status rules are preserved.
8. Any proposed package metadata is register-ready, proposed, non-active, and non-executable.
9. No work package is activated.
10. No work package is marked `AUTHORIZED` during Stage I2.
11. Owner authority is identified for each proposed package metadata item.
12. Repository areas are identified as proposed metadata only.
13. Evidence requirements are defined for later package authorization.
14. Dependencies and sequencing are recorded.
15. Stop conditions are evaluated.
16. Implementation remains NOT AUTHORIZED.
17. Work package execution remains NOT AUTHORIZED.
18. Code-to-Architecture Audit remains NOT AUTHORIZED.
19. Implementation Gap Register remains NOT AUTHORIZED.
20. Migration, deployment, release, tag, GitHub Release, and production operation remain NOT AUTHORIZED.
21. Phase 4 remains NOT STARTED.
22. No application, infrastructure, deployment, migration, release, tag, or runtime behavior changes occur.
23. Exact next authorized action is stated.

Failure of any acceptance criterion blocks Stage I2 acceptance.

---

## 11. Stop Conditions

Stage I2 definition or future Stage I2 execution must stop immediately when:

- repository state cannot be verified;
- Stage I1 completion evidence is missing, unpublished, or conflicting;
- Stage I2 execution authorization is absent or ambiguous;
- required authority is missing, unpublished, or conflicting;
- implementation authorization is requested or implied;
- work package execution is requested or implied;
- work package activation is requested or implied;
- package status `AUTHORIZED` is requested without separate package authorization;
- application code inspection becomes necessary;
- source code or runtime behavior changes are requested;
- Code-to-Architecture Audit becomes necessary;
- Implementation Gap Register creation becomes necessary;
- migration, deployment, release, tag, GitHub Release, or production operation becomes necessary;
- Phase 4 work is requested or implied;
- Product Authority or Engineering Authority meaning would change;
- Work Package Register modification is required but not separately authorized;
- unrelated working-tree changes cannot be isolated;
- required evidence is unavailable;
- scope crosses into another lifecycle.

Default rule: stop and do not guess.

---

## 12. Evidence Requirements

Stage I2 evidence must be repository-derived and path-scoped.

Required evidence includes:

1. Git branch, `HEAD`, `origin/main`, divergence, and working-tree status.
2. List of authority documents inspected.
3. Confirmation of canonical path for `docs/engineering/IMPLEMENTATION_GOVERNANCE.md`.
4. Stage I0 closure evidence.
5. Stage I1 completion evidence.
6. Stage I2 execution authorization evidence.
7. Work Package Register schema and status vocabulary evidence.
8. Proposed package metadata completeness evidence, if proposed metadata authoring is permitted by Stage I2 execution authorization.
9. Evidence requirements selected for later package authorization decisions.
10. Stop condition evaluation.
11. Final changed-file inventory.
12. Path-scoped validation results.
13. Unavailable evidence report for any required check not run.

Evidence must distinguish:

| Evidence type | Interpretation |
|---------------|----------------|
| Repository authority evidence | Published or otherwise authorized repository document content |
| Git evidence | Branch, commit, divergence, status, diff, and file inventory facts |
| Draft metadata evidence | Non-binding proposed package metadata created under Stage I2 execution authorization |
| Validation evidence | Checks performed, checks skipped, and unavailable evidence |
| Restriction evidence | Confirmation that prohibited activities did not occur |

Chat memory, summaries, tool assumptions, generated plans, and code precedent are not Repository Authority.

---

## 13. Completion Conditions

Stage I2 execution may complete only when:

1. all required deliverables are produced or explicitly blocked;
2. all acceptance criteria are evaluated;
3. all stop conditions are evaluated;
4. unresolved findings are recorded;
5. proposed package metadata, if created, remains non-executable;
6. no package is activated;
7. no implementation begins;
8. no audit, gap register, migration, deployment, release, tag, production operation, or Phase 4 work occurs;
9. continuity synchronization need is identified;
10. exact next authorized action is stated.

Stage I2 completion does not authorize implementation. It may only identify a later governance route for package authorization or revision.

---

## 14. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/STAGE_I2_AUTHORIZATION.md` |
| Status | PUBLISHED - Stage I2 Authorization Instrument |
| Binding authority | Active - per REPOSITORY_STANDARDS.md section 7.6 |
| Publication | COMPLETE |
| Independent Governance Review | COMPLETED - PASS |
| Independent Publication Review | COMPLETED - PASS |
| Program | Implementation, Stabilization & Launch |
| Stage defined | I2 - Work Package Definition |
| Stage I0 | CLOSED |
| Stage I1 | COMPLETION EVIDENCE REQUIRED BEFORE STAGE I2 EXECUTION |
| Stage I2 | NOT AUTHORIZED |
| Implementation | NOT AUTHORIZED |
| Implementation work packages | NOT AUTHORIZED |
| Work package execution | NOT AUTHORIZED |
| Work package activation | NOT AUTHORIZED |
| Code-to-Architecture Audit | NOT AUTHORIZED |
| Implementation Gap Register | NOT AUTHORIZED |
| Migration | NOT AUTHORIZED |
| Deployment | NOT AUTHORIZED |
| Release | NOT AUTHORIZED |
| Phase 4 | NOT STARTED |
| Related authority | `docs/implementation/IMPLEMENTATION_PROGRAM.md`, `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md`, `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` |
