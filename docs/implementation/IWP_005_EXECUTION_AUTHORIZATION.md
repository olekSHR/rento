# IWP-005 Selection, Activation, And Execution Authorization

**Status:** PUBLISHED - IWP-005 SELECTION, ACTIVATION, AND EXECUTION AUTHORIZATION
**Authority class:** IWP selection, activation, and execution decision
**Binding authority:** ACTIVE
**Publication:** COMPLETE - 2026-07-20
**Targeted Final Review:** COMPLETED - PASS
**Publication review:** NOT REQUIRED - COMPLETE AUTHORITY BLOCK FINAL REVIEW PASSED
**Publication evidence:** Targeted Final Review PASS - APPROVED FOR BOUNDED PUBLICATION
**Review findings:** BLOCKING 0; MAJOR 0; MINOR 0; EDITORIAL 0
**Program:** Implementation, Stabilization & Launch
**Stage:** I3 - Foundation Implementation
**Target package:** IWP-005 - Persistence And Migration Integrity
**IWP-005 selection:** SELECTED
**IWP-005 activation:** ACTIVE
**IWP-005 authorization:** AUTHORIZED
**IWP-005 execution:** AUTHORIZED - NOT STARTED
**IWP-005 executability:** EXECUTABLE WITHIN THE EXACT PUBLISHED IWP-005 BOUNDARY
**IWP-005 completion review:** NOT STARTED
**IWP-005 acceptance:** NOT GRANTED
**IWP-001 dependency:** SATISFIED
**IWP-002 predecessor:** ACCEPTED
**IWP-009:** UNSELECTED - INACTIVE - NOT EXECUTABLE
**Other IWPs:** UNSELECTED - INACTIVE - NOT EXECUTABLE
**Production migration execution:** NOT AUTHORIZED
**Database connection:** NOT AUTHORIZED
**Deployment:** NOT AUTHORIZED
**Release:** NOT AUTHORIZED
**Push:** NOT AUTHORIZED
**Public launch:** NOT AUTHORIZED
**Scaling:** NOT AUTHORIZED
**Phase 4 Product Development Methodology:** NOT STARTED

---

## 1. Publication Status And Authority Effect

This document is the published authority artifact for IWP-005 selection, activation, and execution.

It completed one Targeted Final Review with:

```text
PASS - APPROVED FOR BOUNDED PUBLICATION
```

Publication on 2026-07-20 makes this artifact active Repository Authority for IWP-005 only.

This publication:

1. selects IWP-005;
2. activates IWP-005;
3. makes IWP-005 executable only within the exact published IWP-005 boundary;
4. authorizes IWP-005 execution only within the exact published inspection and writable boundaries;
5. leaves IWP-005 execution NOT STARTED;
6. leaves IWP-005 completion review NOT STARTED;
7. leaves IWP-005 acceptance NOT GRANTED;
8. leaves IWP-009 and every other inactive IWP unselected, inactive, and not executable;
9. grants no production migration, production database, secret, push, deployment, release, launch, scaling, or Phase 4 authority;
10. leaves continuity synchronization as a separate next lifecycle action.

---

## 2. Authority Provenance

This publication consumes the following Repository Authority and evidence:

| Authority or evidence | Role |
|-----------------------|------|
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | Canonical IWP-005 identity, scope, dependencies, repository areas, evidence, stop conditions, release posture, and status vocabulary |
| `docs/implementation/IMPLEMENTATION_PROGRAM.md` | I0-I8 lifecycle, I3-GATE, acceptance separation, and release/deployment separation |
| `docs/implementation/IMPLEMENTATION_BASELINE.md` | Baseline technology stack, Alembic presence, and known persistence/configuration limitations |
| `docs/implementation/IWP_001_FINAL_ACCEPTANCE_REPORT.md` | Evidence that IWP-001 is ACCEPTED and the IWP-005 mandatory dependency is satisfied for future authorization consideration |
| `docs/implementation/IWP_002_FINAL_ACCEPTANCE_REPORT.md` | Evidence that IWP-002 is ACCEPTED and the recommended predecessor is satisfied |
| `docs/implementation/STAGE_I3_AUTHORIZATION.md` | Stage I3 Foundation Implementation instrument, validation level, gates, and stop conditions |
| `docs/implementation/STAGE_I3_EXECUTION_AUTHORIZATION.md` | Active Stage I3 execution boundary and package-separation rules |
| `docs/implementation/STAGE_I3_IMPLEMENTATION_AUTHORIZATION.md` | Prior Stage I3 implementation framework pattern and release/deployment separation history |
| `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` | Work package model, change classes, gates, evidence, review routing, stop conditions, acceptance model, and release separation |
| `docs/engineering/REPOSITORY_STANDARDS.md` | Repository lifecycle, naming, review, validation scope, publication, checkpoint, and Minimum Working Set rules |
| `docs/engineering/DEVELOPMENT_STANDARDS.md` | Development traceability, tests, persistence/migration development standards, security and repository hygiene gates |
| `docs/engineering/AI_COLLABORATION_STANDARDS.md` | AI-assisted work boundaries, generated output subordination, and secret-safe context use |
| `docs/engineering/DATABASE_ARCHITECTURE.md` | Persistence ownership, aggregate, transaction, schema evolution, migration, read/write, and evidence/truth boundaries |
| `docs/engineering/DATABASE_STANDARDS.md` | Persistence engineering, schema evolution, migration governance, transaction, compatibility, documentation, and review gates |
| `docs/engineering/BACKEND_ARCHITECTURE.md` | Backend domain ownership, Persistence Boundary, transaction ownership, and domain-final mutation authority |
| `docs/engineering/SECURITY_STANDARDS.md` | Data classification, credential/secret governance, storage boundary protection, audit/security evidence, and least privilege |
| `docs/engineering/INFRASTRUCTURE_STANDARDS.md` | Environment separation, secret injection, backup/restore and disaster recovery governance, and deployment separation |
| `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` | Migration/persistence proof, failure visibility, classification-before-correlation, and secret-free signal obligations |
| `docs/engineering/API_STANDARDS.md` | Contract compatibility and access-boundary separation where persistence changes affect contracts |
| `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | Identity context and credential/session persistence separation where identity records are affected |
| `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | Domain-final mutation authority, ownership validation, and authorization evidence where persistence changes affect protected records |
| `docs/engineering/INTEGRATION_ARCHITECTURE.md` | External fact and cached external state separation where future persistence changes touch integration state |
| `docs/design/CURSOR_HANDOFF.md` | Continuity state only; not normative authority |
| `docs/design/MASTER_ROADMAP.md` | Strategic state, Stage I3 in-progress state, IWP-005 next-action boundary, and Phase 4 separation |

Publication evidence:

| Evidence | Value |
|----------|-------|
| Reviewed pre-publication raw SHA-256 | `05f0dbe601700b0ea98ece645d23881d4286066a657db530f4446e0086a6dd31` |
| Reviewed pre-publication Git blob | `fe6cebe9249e0ebc6fa3a584600b442d97e0b56f` |
| Reviewed pre-publication LF-normalized Git blob | `fe6cebe9249e0ebc6fa3a584600b442d97e0b56f` |
| Targeted Final Review result | PASS - APPROVED FOR BOUNDED PUBLICATION |
| Review findings | BLOCKING 0; MAJOR 0; MINOR 0; EDITORIAL 0 |
| Publication date | 2026-07-20 |

No runtime implementation content, migration content, model content, repository content, database content, `.env`, secret store, production environment, or shell history was inspected to publish this artifact.

---

## 3. Exact IWP-005 Identity And Purpose

| Field | Value |
|-------|-------|
| Identifier | IWP-005 |
| Title | Persistence And Migration Integrity |
| Registered objective | Verify and harden future model registration, migration lineage, schema ownership, rollback posture, and persistence constraints |
| Stage | I3 Foundation metadata |
| Owner Authority | `docs/engineering/DATABASE_ARCHITECTURE.md`; `docs/engineering/DATABASE_STANDARDS.md`; `docs/engineering/BACKEND_ARCHITECTURE.md`; `docs/engineering/SECURITY_STANDARDS.md` |
| Change Classes | Persistence; Security; Repository/governance |
| Registered scope | Alembic configuration, migration lineage, models, repositories, persistence tests, and rollback documentation if separately authorized |
| Registered out of scope | Stage I2 migration execution; production data changes; schema change without later package authority |
| Registered release posture | Release deferred; migration readiness is not deployment or production migration authority |
| Registered pre-publication status | PROPOSED - RESERVED IDENTIFIER ONLY - NOT ACTIVE - NOT EXECUTABLE - NOT IMPLEMENTATION AUTHORITY - NOT RELEASE AUTHORITY |

The package purpose is persistence and migration integrity. It is not production migration execution, deployment readiness, release readiness, runtime certification, schema redesign, or product meaning change.

---

## 4. Verified IWP-001 Dependency Satisfaction

IWP-001 is ACCEPTED by `docs/implementation/IWP_001_FINAL_ACCEPTANCE_REPORT.md`.

IWP-001 acceptance records that the registered mandatory IWP-001 dependency is satisfied for IWP-005 authorization consideration.

IWP-001 dependency satisfaction by itself does not select, activate, authorize, execute, or accept IWP-005. This published artifact is the separate authority that selects, activates, authorizes, and makes IWP-005 executable within the exact published boundary.

---

## 5. Verified IWP-002 Predecessor Status

IWP-002 is ACCEPTED by `docs/implementation/IWP_002_FINAL_ACCEPTANCE_REPORT.md`.

The IWP-005 register entry records IWP-002 as an accepted recommended prerequisite. IWP-002 acceptance by itself does not authorize IWP-005 and does not authorize migration execution, schema changes, production operation, deployment, release, or push.

---

## 6. Package Selection

Publication of this artifact selects IWP-005 only.

Selection basis:

1. Stage I3 remains IN PROGRESS.
2. IWP-001 is ACCEPTED and the IWP-005 mandatory IWP-001 dependency is satisfied.
3. IWP-002 is ACCEPTED and the recommended predecessor is satisfied.
4. IWP-005 is the next dependency-ready Stage I3 package by register sequence.
5. IWP-005 has a registered Stage I3 Foundation scope.

Selection does not execute work and does not imply acceptance.

---

## 7. Package Activation

Publication of this artifact activates IWP-005 only after publication validation verifies:

1. this artifact is unchanged from the reviewed candidate or corrected through approved delta validation;
2. IWP-005 remains proposed, inactive, and not executable before publication;
3. IWP-001 remains ACCEPTED;
4. IWP-002 remains ACCEPTED;
5. no unrelated working-tree change overlaps the future IWP-005 boundary;
6. no database connection, migration execution, source-content inspection, or secret access is required for activation;
7. no IWP-009 or other IWP activation is bundled with IWP-005 activation.

Activation makes IWP-005 executable only within the exact boundary published in this artifact. Execution remains NOT STARTED until the next authorized lifecycle action begins the IWP-005 implementation block.

---

## 8. Execution Authorization

This artifact authorizes IWP-005 execution only for the following bounded work:

1. read-only inspection of exact registered persistence and migration paths;
2. metadata and content review of Alembic configuration, environment, version files, backup version files, model registration, repository boundaries, and persistence documentation inside the exact paths below;
3. bounded persistence and migration integrity changes inside exact writable paths listed in this artifact;
4. creation of IWP-005 execution evidence and rollback/persistence review documentation listed in this artifact;
5. non-production, secret-safe validation commands listed in this artifact;
6. unavailable-evidence reporting where safe checks cannot run;
7. one final block review and bounded corrections if required.

It does not authorize:

- production migration execution;
- database connection using real credentials;
- connection to production, staging, cloud, provider, or external databases;
- `.env` reading;
- secret value inspection;
- deployment;
- release;
- push;
- launch;
- scaling;
- Phase 4;
- IWP-009 or any other IWP.

---

## 9. Exact Read-Only Inspection Paths

Future IWP-005 execution may inspect content only under the exact paths below after this artifact is published.

| Path | Reason it belongs to IWP-005 | Owning authority | Permission | Prohibited effect | Required validation | Rollback requirement | Evidence requirement | Stop condition |
|------|------------------------------|------------------|------------|-------------------|---------------------|----------------------|---------------------|----------------|
| `backend/alembic.ini` | Registered IWP-005 repository area; Alembic configuration affects migration integrity | Database Standards; Infrastructure Standards; Security Standards | READ after publication | No secret value copying; no DB connection; no production config claim | Secret-safe review; config classification; no value exposure | Record whether rollback is NOT APPLICABLE for read-only inspection | Path reviewed, concerns by category only | Any credential value or real connection string must be read or exposed |
| `backend/alembic/env.py` | Registered IWP-005 repository area; migration environment controls model registration and migration execution context | Database Standards; Backend Architecture; Security Standards | READ after publication | No migration execution; no import side effects claimed without safe command authority | Model-registration review; migration-environment review | Read-only inspection has no rollback; future edits require file diff rollback plan | Reviewed path and authority trace | Inspection requires runtime execution or secret-bearing config |
| `backend/alembic/versions/` | Registered migration lineage area; contains current migration revisions | Database Architecture; Database Standards | READ after publication | No editing applied migration history by default; no execution | Revision continuity, ordering, single-head, upgrade/downgrade posture review | Record that history rewrites are prohibited; future edits require explicit justification | Version filenames, lineage map, hazards by category | Need to rewrite history, delete migration, or execute production migration |
| `backend/alembic/versions_backup/` | Registered backup migration file area; residual risk from IWP-001 notes; requires classification | Database Standards; Repository Standards; Security Standards | READ after publication | No treating backup files as active lineage without evidence; no deletion without authority | Backup-version classification; active-vs-backup posture | Future cleanup requires separate bounded decision if outside IWP-005 exact scope | Backup file inventory and classification | Classification cannot be resolved without broader repository/source inspection |
| `backend/app/models/` | Registered model area; model registration and schema ownership review | Database Architecture; Database Standards; Backend Architecture | READ after publication | No domain meaning redefinition; no schema change without owner trace | Model registration, aggregate ownership, schema correspondence review | Future edits require per-file rollback plan and compatibility note | Reviewed file list, affected model classes by name only if inspected later | Review reveals product/domain meaning change or ownership conflict |
| `backend/app/repositories/` | Registered repository area; persistence access boundary and aggregate routing review | Backend Architecture; Database Standards; Authorization Architecture | READ after publication | No authorization policy creation in repository layer; no cross-aggregate write expansion | Repository ownership, write routing, read/write separation review | Future edits require per-file rollback plan and affected invariant note | Reviewed repository list and boundary findings | Review requires domain/API changes outside exact scope |

Current draft authoring used metadata-only inventory for these paths: path names, directory names, filenames, extensions, and Git metadata only.

---

## 10. Exact Writable Artifact Paths And Closed Artifact Classes

If this artifact is later published, future IWP-005 execution may write only the exact paths below unless execution stops and obtains a bounded corrective scope decision.

| Path or class | Reason it belongs to IWP-005 | Owning authority | Write permission | Allowed change | Prohibited effect | Required validation | Rollback requirement | Evidence requirement | Stop condition |
|---------------|------------------------------|------------------|------------------|----------------|-------------------|---------------------|----------------------|---------------------|----------------|
| `backend/alembic.ini` | Registered IWP-005 area; Alembic configuration integrity may require safe placeholder or configuration correction | Database Standards; Infrastructure Standards; Security Standards | CONDITIONAL WRITE after publication | Secret-free config hygiene only if required for safe migration validation | No real credential; no DB topology decision; no production config; no migration execution | Config parse or unavailable evidence; count-only secret scan; diff review | Revert file diff; document previous behavior category without secret values | Changed-file diff; check result; security classification | Any real value, production credential, or deployment config is needed |
| `backend/alembic/env.py` | Registered IWP-005 area; model registration and migration environment integrity | Database Standards; Backend Architecture; Security Standards | CONDITIONAL WRITE after publication | Correct model import/registration or migration environment wiring only within IWP-005 | No domain behavior change; no runtime startup redesign; no secret access | Alembic history/current or unavailable evidence; import safety review; static check | Revert file diff; document failed check recovery | Changed-file diff; command output or unavailable evidence | Fix requires broad backend source changes outside registered paths |
| `backend/alembic/versions/` | Registered active migration lineage area | Database Architecture; Database Standards | CONDITIONAL WRITE after publication | Add new corrective migration or bounded migration metadata correction only when separately justified by IWP-005 evidence | No history rewrite by default; no deletion; no silent data loss; no production execution | Revision continuity; single-head check; upgrade check; downgrade/irreversible posture; data-loss review | New migration must define downgrade or documented irreversible posture; revert by removing unapplied new revision only before acceptance | Revision ID, parent, purpose, upgrade/downgrade result or unavailable evidence | Existing applied migration edit, destructive operation, or multi-head conflict appears |
| `backend/alembic/versions_backup/` | Registered backup migration file area requiring classification | Database Standards; Repository Standards | CONDITIONAL WRITE after publication | Documentation/classification marker only if represented as code comment or metadata inside existing backup files is explicitly justified | No deletion, no activation as current lineage, no history rewrite | Backup classification review; active lineage separation | Revert file diff; no production effect | Classification evidence | Cleanup or deletion appears necessary |
| `backend/app/models/` | Registered model area | Database Architecture; Database Standards; Backend Architecture; Security Standards | CONDITIONAL WRITE after publication | Model registration or persistence constraint correction tied to migration integrity | No product meaning change; no owner/status/contact rule weakening; no schema change without migration evidence | Static check; model/migration alignment; ownership and data classification review | Revert file diff; pair with compatible migration if schema-affecting | Changed model file, authority trace, migration relationship | Change requires unregistered domain/API/frontend work |
| `backend/app/repositories/` | Registered repository area | Backend Architecture; Database Standards; Authorization Architecture | CONDITIONAL WRITE after publication | Persistence access routing, transaction, or repository boundary correction only | No business logic ownership; no authorization policy in repository layer; no cross-owner mutation | Static check; repository boundary review; ownership/authorization negative tests or unavailable evidence | Revert file diff; record affected write paths | Changed repository file, review evidence, tests/unavailable evidence | Change requires service/router/API changes outside exact scope |
| `docs/implementation/IWP_005_EXECUTION_EVIDENCE.md` | Required execution evidence for IWP-005 completion review | Implementation Governance; Repository Standards | WRITE after publication | Record execution state, path boundary, checks, unavailable evidence, residual risk, and next action | No acceptance before review; no findings register; no secret values | Markdown diagnostics; evidence completeness; secret scan | Documentation diff rollback | Evidence artifact | Evidence cannot be made honest without broader authority |
| `docs/implementation/IWP_005_PERSISTENCE_AND_MIGRATION_REVIEW.md` | Registered deliverables include migration graph review, model inclusion review, rollback notes, persistence checks, unavailable-evidence report | Database Standards; Implementation Governance; Repository Standards | WRITE after publication | Record migration graph, model inclusion, rollback posture, destructive-operation classification, and unavailable evidence | No real data; no assessment outside IWP-005; no implementation gap register | Markdown diagnostics; path citations; secret scan | Documentation diff rollback | Review artifact | Review discovers production-impacting, security-critical, or cross-package evidence |

No vague path classes such as related files, necessary migrations, supporting code, or other affected files are authorized.

If exact safe scope cannot be preserved after read-only inspection, future execution must stop and request a bounded corrective scope decision before any write outside the table above.

---

## 11. Persistence-Model Boundary

Future IWP-005 may verify and harden model registration and persistence constraints only within `backend/app/models/` and only where tied to Database Architecture, Database Standards, Backend Architecture, and Security Standards.

Required future model-boundary checks:

1. every changed model artifact has an owning persistence authority;
2. aggregate ownership is preserved;
3. schema convenience does not redefine product or domain meaning;
4. owner, status, contact-source, role, and visibility domain rules are not weakened;
5. evidence and telemetry structures do not become domain truth;
6. model changes map to migration or documented no-migration rationale.

Stop if model correctness requires changes outside `backend/app/models/`, `backend/alembic/`, or registered documentation paths.

---

## 12. Database-Schema Boundary

Future IWP-005 may address schema integrity only through registered models, Alembic configuration, and migration artifacts.

The future schema boundary must preserve:

1. one authoritative owner per record class;
2. aggregate and lifecycle separation;
3. additive evolution preference;
4. backward compatibility declaration for schema changes;
5. no implicit parallel schemas;
6. no lifecycle boundary merger for storage convenience;
7. no product meaning change by schema layout.

Physical schema optimization, indexes, partitioning, sharding, storage engine settings, production topology, and deployment configuration remain outside IWP-005 unless later separate authority explicitly adds them.

---

## 13. Alembic And Migration Boundary

Future IWP-005 may inspect and conditionally modify Alembic artifacts only under:

1. `backend/alembic.ini`;
2. `backend/alembic/env.py`;
3. `backend/alembic/versions/`;
4. `backend/alembic/versions_backup/`.

The future migration boundary prohibits by default:

- production migration execution;
- migration execution against any database using real credentials;
- history rewrite;
- deletion of active revisions;
- editing previously applied migrations unless explicitly justified by evidence and separately authorized;
- bypassing Alembic;
- silent data deletion;
- schema changes outside registered IWP-005 scope;
- release or deployment action.

Migration files are engineering artifacts subject to independent review and completion evidence.

---

## 14. Migration-History Integrity Method

Future IWP-005 execution must build a migration-history integrity record from authorized inspection and safe commands only.

Required method:

1. inventory active revision files by filename and revision metadata;
2. identify parent/child continuity;
3. verify single-head posture or record multi-head evidence;
4. distinguish active `versions/` lineage from `versions_backup/` files;
5. record whether backup files are inactive, ambiguous, or require separate classification;
6. record whether previously applied migrations are untouched;
7. stop if migration history rewrite or active deletion appears necessary.

Evidence may include safe Alembic history/current commands only when no real credential, production database, or `.env` access is required. Otherwise unavailable evidence must be recorded.

---

## 15. Upgrade Validation

Future IWP-005 must define and run, or honestly mark unavailable, safe upgrade validation:

| Validation | Requirement |
|------------|-------------|
| Alembic history | Verify lineage is readable without production access |
| Alembic current | Verify current revision only against isolated local/test database if safe credentials are available |
| Upgrade head | Run only against isolated local/test database with safe placeholders or synthetic data |
| Migration SQL preview | Allowed only if it does not require secret values or production connection |
| Model import/registration | Allowed only if it does not load `.env`, connect to production, or execute runtime side effects |

Any upgrade validation requiring production data, production credentials, `.env`, secret stores, or deployment environments is prohibited and must be recorded as unavailable evidence.

---

## 16. Downgrade And Rollback Validation

Future IWP-005 must define rollback posture before acceptance.

Required rollback checks:

1. every new migration has a downgrade path or explicitly documented irreversible posture;
2. irreversible posture must explain why reversal is unsafe and what forward-recovery route exists;
3. rollback validation must use isolated local/test databases only;
4. rollback must not delete real data silently;
5. rollback must not weaken audit/evidence legibility;
6. downgrade failure must block acceptance unless risk acceptance is explicitly permitted by authority.

Production rollback execution is not authorized.

---

## 17. Empty-Database And Bootstrap Validation

Future IWP-005 must verify, or record unavailable evidence for, empty-database bootstrap:

1. migrations can create schema from an empty local/test database;
2. model registration is complete for migration discovery;
3. active migration lineage reaches head;
4. bootstrap does not require production data;
5. bootstrap does not require real credentials;
6. bootstrap failure is recorded as BLOCKED or corrected within authorized scope.

Empty-database validation may not connect to production, staging, cloud, provider, or external databases.

---

## 18. Existing-Database Compatibility Validation

Future IWP-005 must verify, or record unavailable evidence for, representative existing-database compatibility.

Allowed existing-database validation requires:

1. isolated local/test database;
2. synthetic or non-production fixture data;
3. no personal, production, or copied live data;
4. documented starting revision;
5. upgrade result;
6. downgrade or forward-recovery result;
7. data integrity checks scoped to changed structures.

If representative existing-database validation cannot be performed safely, the evidence must classify it as unavailable and record residual risk.

---

## 19. Data-Loss And Destructive-Operation Controls

Future IWP-005 must treat destructive operations as blocked unless explicitly evidenced and authorized.

Destructive operation classes include:

1. dropping tables;
2. dropping columns;
3. deleting rows;
4. truncating data;
5. changing column type with possible data loss;
6. altering nullability with possible invalid rows;
7. removing audit/evidence legibility fields;
8. rewriting migration history;
9. deleting or collapsing revision lineage.

Mandatory controls:

| Control | Requirement |
|---------|-------------|
| Destructive classification | Every potentially destructive operation is named by category |
| Authority trace | Owning domain and Database Standards review required |
| Data classification | Security Standards classification required before exposure or deletion |
| Backup/restore dependency | Infrastructure Standards review required if real data protection would be needed |
| Dry-run evidence | Only local/test dry-run allowed under this authority |
| Stop rule | Production or real-data destructive operation requires separate authority |

Silent data deletion is prohibited.

---

## 20. Transaction And Consistency Requirements

Future IWP-005 must preserve transaction and consistency requirements from Database Architecture, Database Standards, and Backend Architecture:

1. transaction scope must match declared operation class;
2. multi-aggregate mutations require explicit orchestration authority;
3. no ambient transactions as substitute for declared ownership;
4. domain confirmation occurs before durability;
5. failure must not persist partial state presented as complete;
6. commit precedes outward signals;
7. background work inherits the same authorization and transaction discipline as synchronous work;
8. long-running interactive transactions holding authoritative locks are prohibited.

Any required transaction behavior change outside `backend/app/repositories/`, `backend/app/models/`, or `backend/alembic/` requires stop and scope escalation.

---

## 21. Security And Secret-Safe Database Handling

Future IWP-005 must preserve secret-safe database handling:

1. do not read `.env`;
2. do not expose database credentials;
3. do not print connection strings;
4. do not access production databases;
5. do not commit secret values;
6. do not store secrets in evidence;
7. do not copy live data;
8. do not use personal or production data in tests;
9. use safe placeholders;
10. use isolated local/test databases only;
11. use synthetic or non-production fixtures;
12. redact evidence;
13. use count-only secret scans;
14. escalate security-critical or potentially destructive findings.

Credential rotation, production revocation, production backup, and operational database access remain separate security or infrastructure lifecycles.

---

## 22. Test Requirements

Future IWP-005 must define required checks before execution begins.

Minimum required checks:

| Check | Required result |
|-------|-----------------|
| Git state and unrelated-change isolation | PASS before and after future work |
| Python syntax/static check for changed Python files | PASS or unavailable evidence |
| Alembic history/current | PASS or unavailable evidence |
| Upgrade validation | PASS on isolated local/test database or unavailable evidence |
| Downgrade/rollback validation | PASS or documented irreversible posture with review |
| Empty-database bootstrap | PASS or unavailable evidence |
| Existing-database compatibility | PASS on synthetic/non-production data or unavailable evidence |
| Secret scan | PASS - count-only, no values |
| Markdown diagnostics | PASS for documentation |
| Persistence review | PASS or findings resolved |
| Security review | PASS or findings resolved |
| Database Standards review | PASS or findings resolved |

Implementation tests must not be claimed as passed unless run. Unrun checks must be reported honestly.

---

## 23. Observability And Migration Telemetry Requirements

Future IWP-005 must define proof obligations where migration or persistence behavior materially changes.

Required observability posture:

1. migration execution evidence is proof, not domain truth;
2. logs, signals, traces, and evidence must not contain secrets;
3. migration failure, rollback failure, data-loss risk, and destructive-operation classification must be legible;
4. commit-before-signal discipline must be preserved;
5. observability must not mutate authoritative state;
6. production monitoring, vendor selection, dashboards, alerting, or operational runbooks are not authorized.

If observability proof cannot be produced without production access, record unavailable evidence and residual risk.

---

## 24. Documentation Requirements

Future IWP-005 must produce documentation evidence sufficient for completion review:

1. `docs/implementation/IWP_005_EXECUTION_EVIDENCE.md`;
2. `docs/implementation/IWP_005_PERSISTENCE_AND_MIGRATION_REVIEW.md`;
3. migration graph review;
4. model inclusion review;
5. rollback notes;
6. destructive-operation classification;
7. persistence checks run or unavailable;
8. security and data-classification review;
9. residual risk;
10. confirmation that release, deployment, push, launch, scaling, Phase 4, IWP-009, and other IWPs were not performed.

Documentation must not create an Implementation Gap Register or assessment findings.

---

## 25. Execution Evidence Requirements

Future IWP-005 execution evidence must include:

1. starting repository state;
2. verified IWP-005 selection, activation, and executable status after publication;
3. IWP-001 acceptance and dependency-satisfaction evidence;
4. IWP-002 acceptance evidence;
5. authority working set and justified expansions;
6. exact read/write boundary used;
7. metadata inventory and content-inspection record after publication;
8. changed file list;
9. migration lineage evidence;
10. model registration evidence;
11. rollback/downgrade evidence;
12. destructive-operation classification;
13. tests and checks run;
14. unavailable evidence;
15. secret-safe verification;
16. review findings and disposition;
17. residual risks;
18. final execution verdict;
19. exact next authorized action.

Evidence must not rely on chat memory, model memory, or unreviewed summaries as authority.

---

## 26. Unavailable-Evidence Handling

Future IWP-005 may record unavailable evidence only when a check cannot be run safely or authority does not permit it.

Unavailable evidence must state:

1. evidence class;
2. required check;
3. why it was not run;
4. whether authority, tool, environment, safety, or secret risk blocked it;
5. residual risk;
6. whether acceptance is blocked or risk-acceptable;
7. exact future route to obtain evidence.

Unavailable evidence must not hide failed checks.

---

## 27. Stop Conditions

Future IWP-005 draft authoring, review, publication, or execution must stop if:

1. repository state, branch, HEAD, or unrelated-change isolation cannot be verified;
2. IWP-001 acceptance or dependency satisfaction cannot be verified;
3. IWP-002 acceptance cannot be verified;
4. IWP-005 status cannot be verified as proposed/inactive before publication;
5. exact path boundary is insufficient;
6. source inspection is requested before publication;
7. persistence or migration work requires paths outside this artifact;
8. production migration execution is requested;
9. database connection with real credentials is required;
10. `.env`, secret store, shell history, cloud/provider credentials, or production access is required;
11. destructive operation lacks explicit evidence and authority;
12. previously applied migrations must be edited without separate authority;
13. migration history rewrite is required;
14. schema authority conflicts with Product Authority, Backend Architecture, Database Architecture, or Database Standards;
15. IWP-009 or another IWP is needed;
16. deployment, release, push, launch, scaling, or Phase 4 is requested;
17. Implementation Gap Register creation or Code-to-Architecture Assessment becomes necessary;
18. required evidence cannot be recorded honestly.

Default result is BLOCKED.

---

## 28. Failure And Corrective Lifecycle

Allowed future IWP-005 outcomes are:

| Outcome | Meaning |
|---------|---------|
| PASS | IWP-005 execution completed within boundary and required validation passed |
| FAIL | Targeted correction required within authorized IWP-005 boundary |
| BLOCKED | Authority, evidence, safety, dependency, or scope blocker prevents completion |
| SPLIT REQUIRED | Required work separates into another package or authority |
| ESCALATED | Routed to owning authority or security/persistence/infrastructure review |
| CANCELLED | IWP-005 stopped without acceptance |

Corrections must remain bounded to the finding and authorized paths. Correction-delta validation covers only corrected findings, changed files, directly affected authorities, stale references, invalidated gates, and required escalation results.

---

## 29. Completion Review And Acceptance Criteria

Future IWP-005 completion review may occur only after authorized execution finishes.

Completion review must verify:

1. this artifact was published and effective before execution;
2. IWP-005 was selected, active, authorized, and executable only by published authority;
3. only authorized paths changed;
4. no production migration, production access, deployment, release, push, launch, scaling, or Phase 4 occurred;
5. no `.env` or secret values were accessed or exposed;
6. migration lineage is reviewable;
7. model registration and persistence ownership are preserved;
8. rollback posture is documented;
9. destructive-operation controls are satisfied;
10. tests/checks passed or unavailable evidence is honest;
11. security and persistence review findings are resolved or validly risk-accepted;
12. unrelated items were preserved;
13. exact next lifecycle action is stated.

Acceptance must not authorize deployment, release, production migration, IWP-009, Stage I3 closure, or Phase 4.

---

## 30. Commit Authority

This draft does not authorize any commit.

If this artifact later passes Targeted Final Review and bounded publication, that publication task may authorize one isolated local publication commit for this artifact only.

Future IWP-005 execution may create one isolated local execution checkpoint commit only if:

1. this artifact is published and effective;
2. execution validation passes;
3. staged files are exactly authorized IWP-005 execution files;
4. unrelated items are excluded;
5. the commit message is explicitly authorized by the execution task.

Amend, rebase, squash, reset, tag, merge, push, and destructive Git operations are not authorized by this draft.

---

## 31. Push Boundary

Push is NOT AUTHORIZED.

Draft creation, review, publication, execution, validation, completion review, or acceptance of IWP-005 must not imply push authority.

---

## 32. Deployment And Release Separation

IWP-005 migration readiness is not deployment readiness and not production migration authority.

This draft and any future publication do not authorize:

- deployment;
- production operation;
- production migration;
- production rollback;
- release manifest creation;
- engineering release execution;
- implementation release execution;
- Git tag creation;
- GitHub Release creation;
- public launch;
- scaling;
- Phase 4 Product Development Methodology.

---

## 33. Full Verification Triggers

Current draft authoring uses Targeted Validation because it creates exactly one draft authority artifact and does not modify existing files.

Future IWP-005 execution should use Scoped Validation because it touches persistence and migration integrity across package-level implementation, tests, evidence, and review surfaces.

Full Verification is required if any trigger applies:

1. Full Repository Initialization criteria apply;
2. published Repository Authority explicitly requires Full Verification;
3. a new engineering phase begins;
4. a new top-level authority document is created;
5. Repository Authority changes with broad impact;
6. repository structure changes;
7. engineering continuity is lost;
8. correctness cannot be guaranteed from the Minimum Working Set;
9. Product Authority or published Engineering Authority may change;
10. Code-to-Architecture Assessment or Implementation Gap Register creation becomes necessary;
11. security-critical evidence is disputed or insufficient;
12. production-impacting evidence is disputed or insufficient;
13. migration, rollback, data-loss, destructive-operation, deployment, release, operations, or launch evidence is disputed or insufficient;
14. migration history rewrite, applied-migration edit, or destructive schema operation appears necessary;
15. real data, production data, or production credentials would be required.

Full Verification must not be repeated automatically after bounded correction when risk has not expanded.

---

## 34. Required One Final Review

Before publication, this complete unchanged draft received one Targeted Final Review.

The review verified:

1. draft status and non-effectiveness;
2. IWP-005 register fidelity;
3. IWP-001 dependency satisfaction;
4. IWP-002 predecessor status;
5. exact future selection, activation, and execution effect;
6. exact read-only and writable boundaries;
7. migration safety completeness;
8. rollback and destructive-operation controls;
9. secret-safe database boundary;
10. validation strategy and Full Verification triggers;
11. IWP-009 and other-IWP non-activation;
12. push, deployment, release, launch, scaling, and Phase 4 separation.

Review result:

```text
PASS - APPROVED FOR BOUNDED PUBLICATION
```

Review finding counts:

| Finding class | Open count |
|---------------|------------|
| BLOCKING | 0 |
| MAJOR | 0 |
| MINOR | 0 |
| EDITORIAL | 0 |

No separate readiness, framework, selection, activation, or execution document is required by this published artifact.

---

## 35. Publication Requirements

Bounded publication occurred only after Targeted Final Review returned PASS.

Publication completed the following authority transition:

1. updated this artifact status from DRAFT to PUBLISHED;
2. marked binding authority ACTIVE;
3. selected IWP-005;
4. activated IWP-005;
5. made IWP-005 executable only within the published boundary;
6. preserved all exclusions;
7. requires result validation before publication checkpoint completion;
8. permits one isolated local publication checkpoint commit if validation passes.

Publication does not:

- execute or accept IWP-005 automatically;
- activate IWP-009 or another package;
- authorize production migrations;
- authorize database access using real credentials;
- authorize deployment, release, push, launch, scaling, or Phase 4.

---

## 36. Final Non-Authorization Declaration

```text
THIS DOCUMENT IS PUBLISHED IWP-005 SELECTION, ACTIVATION, AND EXECUTION AUTHORIZATION.

STATUS: PUBLISHED - ACTIVE.
BINDING AUTHORITY: ACTIVE.
TARGETED FINAL REVIEW: COMPLETED - PASS.
PUBLICATION: COMPLETE - 2026-07-20.
IWP-005 SELECTION: SELECTED.
IWP-005 ACTIVATION: ACTIVE.
IWP-005 AUTHORIZATION: AUTHORIZED.
IWP-005 EXECUTABILITY: EXECUTABLE WITHIN THE EXACT PUBLISHED IWP-005 BOUNDARY.
IWP-005 EXECUTION: AUTHORIZED - NOT STARTED.
IWP-005 COMPLETION REVIEW: NOT STARTED.
IWP-005 ACCEPTANCE: NOT GRANTED.
PERSISTENCE SOURCE INSPECTION: AUTHORIZED ONLY WITHIN THE EXACT PUBLISHED IWP-005 INSPECTION BOUNDARY.
MIGRATION SOURCE INSPECTION: AUTHORIZED ONLY WITHIN THE EXACT PUBLISHED IWP-005 INSPECTION BOUNDARY.
MIGRATION EXECUTION: AUTHORIZED ONLY FOR SECRET-SAFE NON-PRODUCTION VALIDATION WITHIN THE EXACT PUBLISHED IWP-005 BOUNDARY.
DATABASE CONNECTION: AUTHORIZED ONLY FOR ISOLATED LOCAL/TEST DATABASES WITH SAFE PLACEHOLDERS.
PRODUCTION MIGRATION: NOT AUTHORIZED.
MODEL OR SCHEMA MODIFICATION: AUTHORIZED ONLY WITHIN THE EXACT PUBLISHED IWP-005 WRITABLE BOUNDARY.
TEST MODIFICATION OR EXECUTION: AUTHORIZED ONLY AS DEFINED BY THE EXACT PUBLISHED IWP-005 VALIDATION BOUNDARY.
IWP-009: UNSELECTED - INACTIVE - NOT EXECUTABLE.
OTHER IWP ACTIVATION: NOT AUTHORIZED.
CODE-TO-ARCHITECTURE ASSESSMENT: NOT AUTHORIZED.
IMPLEMENTATION GAP REGISTER: NOT AUTHORIZED.
CONTINUITY SYNCHRONIZATION: NOT PERFORMED - SEPARATE NEXT LIFECYCLE ACTION.
PUSH: NOT AUTHORIZED.
DEPLOYMENT: NOT AUTHORIZED.
RELEASE: NOT AUTHORIZED.
PUBLIC LAUNCH: NOT AUTHORIZED.
SCALING: NOT AUTHORIZED.
PHASE 4: NOT STARTED.
```

---

## 37. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IWP_005_EXECUTION_AUTHORIZATION.md` |
| Status | PUBLISHED - IWP-005 SELECTION, ACTIVATION, AND EXECUTION AUTHORIZATION |
| Binding authority | ACTIVE |
| Program | Implementation, Stabilization & Launch |
| Stage | I3 - Foundation Implementation |
| Target package | IWP-005 - Persistence And Migration Integrity |
| Canonical path basis | Existing IWP execution authorization convention: `docs/implementation/IWP_###_EXECUTION_AUTHORIZATION.md` |
| Result validation | REQUIRED BEFORE PUBLICATION CHECKPOINT COMMIT |
| Targeted Final Review | COMPLETED - PASS |
| Review findings | BLOCKING 0; MAJOR 0; MINOR 0; EDITORIAL 0 |
| Publication | COMPLETE - 2026-07-20 |
| Publication evidence | Targeted Final Review PASS - APPROVED FOR BOUNDED PUBLICATION |
| IWP-005 selection | SELECTED |
| IWP-005 activation | ACTIVE |
| IWP-005 authorization | AUTHORIZED |
| IWP-005 execution | AUTHORIZED - NOT STARTED |
| IWP-005 executability | EXECUTABLE WITHIN THE EXACT PUBLISHED IWP-005 BOUNDARY |
| IWP-005 completion review | NOT STARTED |
| IWP-005 acceptance | NOT GRANTED |
| Commit | AUTHORIZED FOR ONE ISOLATED LOCAL PUBLICATION CHECKPOINT AFTER RESULT VALIDATION PASSES |
| Push | NOT AUTHORIZED |
