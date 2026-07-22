# Rento Implementation Governance

**Status:** PUBLISHED - Implementation Governance
**Authority class:** Authoritative implementation governance
**Binding authority:** Active - per REPOSITORY_STANDARDS.md section 7.6
**Publication:** COMPLETE
**Implementation:** NOT AUTHORIZED
**Phase 4:** NOT STARTED
**Program authorization:** Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A5, execution order position 9)
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Implementation Reviewers, Security Reviewers, Release Reviewers, Design Council
**Governance basis:** PROJECT_CONSTITUTION.md | ARCHITECTURE_PRINCIPLES.md | PLATFORM_ARCHITECTURE.md | SYSTEM_ARCHITECTURE.md | PRODUCT_ARCHITECTURE.md | BACKEND_ARCHITECTURE.md | FRONTEND_ARCHITECTURE.md | API_STANDARDS.md | DATABASE_ARCHITECTURE.md | DATABASE_STANDARDS.md | SECURITY_STANDARDS.md | INFRASTRUCTURE_STANDARDS.md | OBSERVABILITY_ARCHITECTURE.md | INTEGRATION_ARCHITECTURE.md | AUTHENTICATION_ARCHITECTURE.md | AUTHORIZATION_ARCHITECTURE.md | DEVELOPMENT_STANDARDS.md | AI_COLLABORATION_STANDARDS.md | ENGINEERING_RELEASE_STRATEGY.md | REPOSITORY_STANDARDS.md | ENGINEERING_HANDOFF.md | PHASE_3_AUTHORIZATION.md | PHASE_3_EVOLUTION_AUTHORIZATION.md | RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)

---

## 1. Purpose

This document defines **engineering governance for future implementation work** in the Rento platform.

It establishes how future implementation may be authorized, scoped, decomposed, classified, reviewed, verified, sequenced, stopped, and accepted against published product and engineering authority - without authorizing implementation now, selecting delivery methodology, defining sprint process, choosing tools or frameworks, creating runtime artifacts, changing architecture, executing releases, creating Git tags, or starting Phase 4.

This document answers:

- What Implementation Governance owns versus what Development Standards, Repository Standards, Engineering Release Strategy, AI Collaboration Standards, published architecture authorities, Product Authority, and future implementation artifacts own;
- How a future separate implementation authorization act must be interpreted before code, infrastructure, database, deployment, or runtime work begins;
- How implementation work packages must preserve product truth, immutable domain rules, architecture boundaries, security policy, data classification, and repository lifecycle;
- How change classes, gates, review routes, verification evidence, stop conditions, and acceptance criteria are selected for implementation-era work;
- How AI-assisted implementation must remain subordinate to repository authority and human-accountable review;
- How implementation governance distinguishes implementation authorization, implementation execution, release execution, Phase 3 completion, and Phase 4 methodology;
- What invariants and prohibitions preserve security, stability, maintainability, scalability, and product authority during future realization.

Implementation Governance is **execution-control governance** for future authorized implementation. It is not implementation authorization, not product development methodology, not project management process, not sprint workflow, not code architecture, not deployment automation, not release execution, and not Phase 4.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    -> Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        -> Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            -> Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                -> Platform and system architecture
                    -> Published engineering authorities and standards
                        |-- Development Standards
                        |-- AI Collaboration Standards
                        `-- Implementation Governance (this document)
                            -> Future implementation artifacts only when separately authorized
```

Implementation Governance sits below all published product, constitutional, architecture, repository, development, AI collaboration, security, infrastructure, observability, integration, authentication, authorization, API, backend, frontend, and persistence authorities. It converts those authorities into governance controls for future implementation execution.

Publication of this document would make its governance binding for downstream implementation planning and execution, but publication alone would still not authorize implementation.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Product authority supremacy, phase discipline, repository truth, implementation separation | Converts constitutional constraints into implementation governance controls |
| REPOSITORY_STANDARDS.md | Document lifecycle, publication, status honesty, working set, continuity, Review Type, and Validation Scope | Defines how implementation work preserves repository workflow and consumes validation-scope rules without changing them |
| DEVELOPMENT_STANDARDS.md | Development gates, code discipline, testing, review, dependency, configuration, evidence | Consumes DEV-GATE and DEV-INV obligations as implementation governance gates |
| AI_COLLABORATION_STANDARDS.md | AI-assisted work, AI output classification, tool use, review and safety obligations | Requires AI-assisted implementation to follow AIC gates and invariants |
| ENGINEERING_RELEASE_STRATEGY.md | Engineering release packaging and release execution boundary | Separates implementation acceptance from engineering release execution |
| PRODUCT_ARCHITECTURE.md | Product meaning, immutable domain rules, lifecycle separation, Performance Integrity | Makes product preservation mandatory for implementation acceptance |
| SECURITY_STANDARDS.md | Security policy, trust boundaries, classification, secrets, audit and security events | Makes security review and data handling mandatory implementation gates |
| AUTHENTICATION_ARCHITECTURE.md | Identity context establishment and session authority | Requires identity boundary preservation in implementation work |
| AUTHORIZATION_ARCHITECTURE.md | Authorization decision boundaries and domain-final mutation authority | Requires authorization and ownership validation gates |
| BACKEND_ARCHITECTURE.md | Backend layers, domain realization, orchestration, command/query ownership | Governs backend implementation package boundaries |
| FRONTEND_ARCHITECTURE.md | Experience surfaces, presentation boundaries, client non-authority | Governs frontend implementation package boundaries |
| API_STANDARDS.md | Access contract governance and command/query contract discipline | Governs API implementation package boundaries |
| DATABASE_ARCHITECTURE.md and DATABASE_STANDARDS.md | Persistence ownership, aggregate, migration, transaction, schema evolution discipline | Governs persistence implementation package gates |
| INFRASTRUCTURE_STANDARDS.md | Environment, configuration, secrets, runtime, backup, DR, infrastructure boundaries | Governs infrastructure implementation package gates |
| OBSERVABILITY_ARCHITECTURE.md | Evidence, proof, signal, health, failure visibility, Performance Integrity proof | Requires implementation proof obligations |
| INTEGRATION_ARCHITECTURE.md | External mediation, external fact lifecycle, provider replaceability, failure containment | Governs integration implementation package gates |

### 2.3 What this document owns

- Implementation authorization interpretation requirements;
- Implementation work package intake standards;
- Implementation change classification and routing;
- Implementation governance gates and stop conditions;
- Authority traceability requirements for future implementation work;
- Cross-authority review routing;
- Acceptance evidence requirements;
- Security, data, auth, ownership, persistence, infrastructure, integration, observability, and AI-assisted implementation governance;
- Implementation sequencing and dependency controls;
- Implementation repository hygiene and branch/change boundary rules;
- Implementation governance invariants (IMPL-INV-*).

### 2.4 What this document does not own

- The act of authorizing implementation;
- Phase 3 program completion declaration;
- Phase 4 Product Development Methodology;
- Product roadmap, product capability approval, scope prioritization, delivery commitment, staffing, sprint process, estimation, or organizational workflow;
- Runtime architecture, framework selection, provider selection, package selection, code layout, API endpoint syntax, schema definitions, deployment manifests, CI/CD pipeline implementation, or operational runbooks;
- Engineering release execution, Git tag creation, GitHub Release creation, deployment, production operation, or incident response;
- Amendment of published Product Authority, Repository Authority, Development Standards, AI Collaboration Standards, Security Standards, or architecture authorities.

### 2.5 Amendment

After publication, this document may be amended only through repository-governed review per `REPOSITORY_STANDARDS.md`. Amendments must preserve product authority supremacy, Engineering Constitution compliance, published authority hierarchy, Security Standards supremacy, Development Standards gates, AI Collaboration Standards gates, implementation authorization separation, engineering release separation, and Phase 4 separation.

---

## 3. Relationship To Implementation Authorization

### 3.1 No implementation by publication

This document may define how future implementation must be governed. It does not authorize any implementation task.

Implementation may begin only after a separate repository-recognized governance act explicitly authorizes implementation scope, authority basis, permitted work types, validation expectations, and stop conditions.

### 3.2 Authorization act requirements

A future implementation authorization act must identify:

| Requirement | Meaning |
|-------------|---------|
| Authorized scope | Product, engineering, infrastructure, data, or operational scope permitted for implementation |
| Owning authority | Published document or governance act that owns each implemented meaning |
| Allowed artifact classes | Code, tests, migrations, configuration, infrastructure artifacts, documentation, or other artifacts permitted |
| Explicit exclusions | Work not authorized even if adjacent |
| Required gates | Development, security, data, auth, observability, AI, release, or repository gates |
| Review routing | Required reviewers or review classes |
| Verification level | Checks and evidence required before acceptance |
| Release boundary | Whether release execution is authorized or explicitly deferred |
| Stop conditions | Conditions requiring halt and governance escalation |

### 3.3 Authorization interpretation rules

| Rule | Requirement |
|------|-------------|
| **IMPL-AUTH-1** | If implementation authorization is absent, no implementation artifact may be created or modified |
| **IMPL-AUTH-2** | Ambiguous authorization is interpreted conservatively and requires clarification |
| **IMPL-AUTH-3** | Authorization for one work package does not authorize adjacent packages |
| **IMPL-AUTH-4** | Implementation authorization does not authorize product redesign |
| **IMPL-AUTH-5** | Implementation authorization does not authorize release execution unless explicitly stated |
| **IMPL-AUTH-6** | Implementation authorization does not start Phase 4 unless explicitly stated by strategic governance |
| **IMPL-AUTH-7** | Implementation authorization cannot override published authority without amendment |

### 3.4 Completion separation

The following are separate states:

| State | Meaning |
|-------|---------|
| Engineering authority authored | Draft created; not binding |
| Engineering authority published | Binding standard active |
| Phase 3 program complete | Separate governance declaration after required authorities and review |
| Implementation authorized | Separate act permits scoped implementation |
| Implementation accepted | Work package passes required gates |
| Engineering release executed | Release act completed under Engineering Release Strategy |
| Phase 4 started | Separate strategic governance transition |

No state implies another unless repository authority explicitly says so.

---

## 4. Implementation Governance Principles

### IMPL-PRIN-1 - Implementation Is Subordinate To Authority

Implementation realizes published authority. It does not create, replace, weaken, or reinterpret product or engineering authority.

### IMPL-PRIN-2 - Every Change Has An Owning Authority

Every implementation change must name the published authority that owns its meaning, state, boundary, security posture, and acceptance gate.

### IMPL-PRIN-3 - Product Meaning Is Stable Across Implementation

Implementation may change realization. It must not change role meaning, lifecycle meaning, trust meaning, moderation meaning, public visibility meaning, or marketplace posture.

### IMPL-PRIN-4 - Security Is A Gate, Not A Cleanup Task

Authentication, authorization, secrets, credentials, data classification, least privilege, trust boundary crossing, and ownership validation are blocking review concerns before acceptance.

### IMPL-PRIN-5 - Domain Final Authority Must Be Preserved

Access boundary approval, frontend reachability, API shape, persistence routing, background execution, and operational access never substitute for owning domain validation.

### IMPL-PRIN-6 - Evidence Must Prove Outcomes

Tests, review notes, observability evidence, migration evidence, security checks, and traceability must prove authority preservation for the implemented scope.

### IMPL-PRIN-7 - Release Is Separate From Implementation

Accepted implementation work is not a release. Release execution requires separate authorization under Engineering Release Strategy.

### IMPL-PRIN-8 - AI Assistance Remains Subordinate

AI-generated code, documentation, tests, reviews, and tool output require human-accountable review and repository evidence before acceptance.

### IMPL-PRIN-9 - Stop Beats Drift

When implementation exposes missing authority, conflicting authority, security risk, product ambiguity, or scope expansion, work stops and routes to governance review.

### IMPL-PRIN-10 - Phase 4 Is Not Implied

Implementation Governance does not create Product Development Methodology, sprint process, or organizational delivery model. Phase 4 remains separate.

### 4.11 Implementation-Driven Governance Posture

During an active Implementation, Stabilization & Launch Program governed by `docs/implementation/IMPLEMENTATION_PROGRAM.md`, the following posture applies in addition to sections 1–4 and all downstream gates in this document.

#### IMPL-ID-1 - Implementation Is The Primary Development Stream

While the Implementation Program is active and implementation scope is separately authorized, authorized implementation work is the primary project-development stream. Repository Authority during the program exists to enable, protect, unblock, validate, and support safe, continuously progressing implementation while preserving architectural integrity, quality, security, lifecycle control, and repository integrity.

#### IMPL-ID-2 - Effectiveness Is Measured By Safe Implementation Progress

Implementation-era governance effectiveness is measured by the ability to support safe, predictable, and continuously progressing implementation within existing authorization boundaries while preserving mandatory governance quality and repository control. Governance artifact volume is not a measure of effectiveness.

#### IMPL-ID-3 - Governance Effort Must Stay Proportional To Risk

Governance effort and validation scope must remain proportional to implementation risk and authorized change scope. Validation scope selection, Review Type selection, and escalation rules are governed exclusively by `docs/engineering/REPOSITORY_STANDARDS.md` §11.6. Executors must select the smallest Validation Scope that guarantees correctness.

#### IMPL-ID-4 - Reuse Existing Authority Before Expansion

Existing published Repository Authority must be reused before creating new governance documents, instruments, workflows, lifecycle elements, or terminology. `docs/engineering/REPOSITORY_STANDARDS.md` REP-2 and REP-9 apply.

#### IMPL-ID-5 - Governance Expansion Requires Demonstrated Justification

New implementation-era governance work requires at least one demonstrated justification:

| Justification | Meaning |
|---------------|---------|
| Implementation blocker | Authorized implementation cannot proceed without the governance act |
| Material implementation risk | A risk to security, authority, data, ownership, migration, release, deployment, or lifecycle control requires governance response |
| Repository Authority gap | Required authority, evidence, or lifecycle rule is missing |
| Authority conflict or ambiguity | Published authorities conflict or cannot be applied conservatively |
| Mandatory lifecycle decision | A stage, package, review, publication, or acceptance decision required by Repository Authority cannot be made without the governance act |
| Required review or acceptance evidence | Independent review, acceptance, or verification evidence required by existing authority cannot be produced without the governance act |
| Existing authority prerequisite | A published prerequisite explicitly requires the governance act before later work may proceed |

Governance must not expand solely because additional governance is possible.

#### IMPL-ID-6 - Governance Must Not Become An Independent Workstream

Governance during the Implementation Program must not become an independent project-development stream without a demonstrated Repository Authority deficiency or mandatory lifecycle requirement.

#### IMPL-ID-7 - Every Governance Activity Needs An Implementation-Facing Outcome

Every implementation-era governance activity must have a defined outcome, including one or more of:

- removing an implementation blocker;
- reducing material implementation risk;
- resolving an authority conflict;
- closing a demonstrated authority gap;
- authorizing a bounded activity;
- validating implementation evidence;
- supporting an independent review;
- supporting an acceptance decision;
- supporting a mandatory lifecycle decision.

Governance work that changes no decision, satisfies no mandatory requirement, and does not materially reduce implementation uncertainty must not become an independent workstream.

#### IMPL-ID-8 - Absence Of Unnecessary Governance Is Not A Deficiency

The absence of unnecessary governance work is not a governance deficiency.

#### IMPL-ID-9 - Authorized Implementation Progress Must Not Be Delayed For Convenience

Implementation progress within already authorized boundaries must not be delayed solely to expand governance documentation or instruments unless existing Repository Authority identifies that governance activity as a prerequisite or blocking condition.

#### IMPL-ID-10 - Mandatory Controls Are Not Reduced

This posture does not bypass, weaken, or substitute for any applicable:

- Stage Gate under `docs/implementation/IMPLEMENTATION_PROGRAM.md`;
- Work Package selection, activation, execution authorization, or acceptance requirement;
- independent review, publication, or continuity requirement under `docs/engineering/REPOSITORY_STANDARDS.md`;
- security, migration, testing, quality, or observability gate under this document, `docs/engineering/DEVELOPMENT_STANDARDS.md`, or applicable published engineering authorities;
- release, deployment, or Phase 4 separation requirement;
- Full Verification trigger under `docs/engineering/REPOSITORY_STANDARDS.md` §11.6.11;
- lifecycle separation defined by Repository Authority.

Implementation enablement and acceleration operate only within existing authorization boundaries.

---

## 5. Implementation Work Package Model

### 5.1 Work package definition

An **implementation work package** is a bounded set of future implementation artifacts authorized together under one repository-recognized implementation authorization act.

Work packages are governance units. They are not sprint units, delivery tickets, branches, releases, deployments, or project management containers.

### 5.2 Work package minimum metadata

Each future implementation work package must declare:

| Metadata | Required content |
|----------|------------------|
| Work package ID | Stable identifier assigned by implementation authorization or repository workflow |
| Objective | Concrete implementation outcome, not product redesign |
| Authorized scope | Files, domains, components, or artifact classes permitted |
| Owning authorities | Published authorities consumed |
| Change classes | Classification per section 6 |
| Explicit non-goals | Adjacent work not authorized |
| Required gates | Gates from this document and upstream standards |
| Required reviewers | Review classes or owning authorities |
| Verification evidence | Tests, checks, review evidence, or proof obligations |
| Release posture | Release deferred or separately authorized |
| Stop conditions | Conditions requiring halt |

### 5.3 Work package boundaries

| Boundary | Requirement |
|----------|-------------|
| Product boundary | Product meaning cannot change inside implementation package |
| Domain boundary | Domain ownership and invariants remain with owning realization unit |
| Access boundary | Frontend/API reachability cannot authorize operations |
| Persistence boundary | Writes route through owning aggregate/domain authority |
| Security boundary | Identity, auth, secrets, classification, and least privilege gates block acceptance |
| Infrastructure boundary | Runtime/configuration cannot encode business policy |
| Integration boundary | External facts remain mediated and subordinate |
| Observability boundary | Evidence proves behavior but does not become truth |
| Repository boundary | Unrelated changes stay outside package |

### 5.4 Work package prohibitions

- Bundling unrelated product meanings under one implementation package;
- Combining participation and governance execution without explicit authority;
- Mixing public, professional, and governance trust surfaces without review;
- Implementing a future capability not authorized by product and engineering authority;
- Treating release work as implementation work;
- Treating implementation work as Phase 4 methodology;
- Using dirty working tree changes as implicit scope expansion.

---

## 6. Change Classification

### 6.1 Classification purpose

Implementation changes must be classified before work begins so the correct authority, gate, reviewer, and verification evidence can be selected.

### 6.2 Change classes

| Class | Meaning | Required authority |
|-------|---------|--------------------|
| Product-impacting | Could affect product meaning, lifecycle, role, visibility, trust, or Performance Integrity | Product Authority and Product Architecture |
| Domain logic | Changes ownership, invariants, moderation, role grants, listing state, profile contact sourcing, or domain transitions | Backend Architecture, Product Architecture, Authorization Architecture |
| Access/API | Changes API contract behavior, command/query scope, errors, idempotency, pagination, filtering, sorting, or actor context | API Standards and owning domain authority |
| Frontend/presentation | Changes surface reachability, public/professional/governance display, client state, or interaction honesty | Frontend Architecture and Product Architecture |
| Authentication | Changes identity context establishment, session authority, credentials, or service identity consumption | Authentication Architecture and Security Standards |
| Authorization | Changes operation eligibility, ownership validation, delegated scope, denial, or access enforcement | Authorization Architecture and Security Standards |
| Persistence | Changes aggregate, transaction, schema, migration, read/write routing, evidence, or data classification | Database Architecture and Database Standards |
| Infrastructure/configuration | Changes environment, runtime, configuration, secret injection, backup, DR, DNS, TLS, or service execution | Infrastructure Standards and Security Standards |
| Integration | Changes external provider mediation, external facts, provider credentials, retries, degradation, or promotion paths | Integration Architecture and Security Standards |
| Observability | Changes signal, evidence, trace, health, failure visibility, audit legibility, or proof chain | Observability Architecture and Security Standards |
| AI-assisted | Uses AI-generated code, tests, reviews, documentation, or automation in material scope | AI Collaboration Standards |
| Repository/governance | Changes authority documents, lifecycle metadata, continuity, or repository workflow | Repository Standards |
| Local mechanical | Formatting, naming, or isolated refactor without authority-sensitive behavior | Development Standards, plus affected owner |

### 6.3 Multi-class rule

If a change fits multiple classes, all applicable gates apply. The highest-risk gate controls acceptance.

### 6.4 Misclassification rule

If review discovers a missed class, the work package must stop or be re-routed before acceptance. Misclassification cannot be fixed by post-hoc assertion.

---

## 7. Governance Gates

### 7.1 Gate purpose

Governance gates protect authority preservation before implementation work is accepted. Gates are selected by change classification, scope, and risk.

### 7.2 Core gates

| Gate | Applies when | Pass criteria |
|------|--------------|---------------|
| **IMPL-GATE-1 - Authorization** | Every implementation package | Separate implementation authorization exists and covers scope |
| **IMPL-GATE-2 - Authority trace** | Every implementation package | Owning published authorities are identified |
| **IMPL-GATE-3 - Scope control** | Every implementation package | Only authorized artifacts changed |
| **IMPL-GATE-4 - Product preservation** | Product-impacting or domain-visible changes | Product meaning and immutable rules preserved |
| **IMPL-GATE-5 - Security review** | Auth, authz, data, secrets, trust boundary, integration, admin, owner-scoped, or privileged changes | Security obligations satisfied |
| **IMPL-GATE-6 - Domain ownership** | Domain logic, persistence, API, background, or integration promotion changes | Owning domain validates mutation and truth |
| **IMPL-GATE-7 - Contract discipline** | API or frontend/backend boundary changes | Contracts preserve command/query and visibility rules |
| **IMPL-GATE-8 - Persistence discipline** | Data model, aggregate, migration, transaction, or schema changes | Persistence ownership and migration governance satisfied |
| **IMPL-GATE-9 - Infrastructure discipline** | Runtime, config, environment, secret, backup, or deployment artifact changes | Infrastructure boundaries and secret rules satisfied |
| **IMPL-GATE-10 - Observability proof** | Material behavior, security, failure, domain transition, or privileged action changes | Proof chain and signal obligations satisfied |
| **IMPL-GATE-11 - Integration mediation** | External provider or external fact changes | Mediation, validation, failure containment, and promotion rules satisfied |
| **IMPL-GATE-12 - AI collaboration** | AI-assisted implementation | AIC gates, output classification, and review evidence satisfied |
| **IMPL-GATE-13 - Test and verification** | Every material change | Required tests/checks run or explicitly reported as unavailable |
| **IMPL-GATE-14 - Release separation** | Any accepted work | Release execution remains separately authorized |
| **IMPL-GATE-15 - Repository hygiene** | Every implementation package | Unrelated changes preserved and not absorbed |

### 7.3 Gate failure handling

Gate failure blocks acceptance. A blocked package may proceed only after:

1. The defect is corrected within authorized scope;
2. Scope is narrowed to remove unauthorized work;
3. Missing authority is supplied by governance;
4. The package is cancelled or split.

### 7.4 Gate non-bypass rule

Convenience, prior code precedent, local tests passing, AI suggestion, reviewer preference, or delivery urgency cannot waive a governance gate.

---

## 8. Review Routing

### 8.1 Review purpose

Implementation review verifies that realization preserves authority. Review is not a search for style preferences; it is a governance check against published standards and the authorized package.

### 8.2 Review routes

| Change class | Required review route |
|--------------|-----------------------|
| Product-impacting | Product Authority review or governance escalation |
| Domain logic | Owning domain/architecture review |
| Access/API | API Standards and owning domain review |
| Frontend/presentation | Frontend Architecture and product preservation review |
| Authentication | Authentication Architecture and Security Standards review |
| Authorization | Authorization Architecture and Security Standards review |
| Persistence | Database Architecture/Standards review |
| Infrastructure/configuration | Infrastructure Standards and Security Standards review |
| Integration | Integration Architecture and Security Standards review |
| Observability | Observability Architecture review |
| AI-assisted | AI Collaboration Standards review, plus owning class review |
| Release-adjacent | Engineering Release Strategy review |
| Repository/governance | Repository Standards review |

### 8.3 Review evidence

Review must record:

- Scope reviewed;
- Review Type and Validation Scope selected under `REPOSITORY_STANDARDS.md`;
- Authorities consumed;
- Findings or explicit no-finding result;
- Tests/checks reviewed;
- Unavailable evidence;
- Residual risk;
- Whether acceptance is blocked.

### 8.4 Independent review preservation

AI review, self-review, passing tests, or tool output cannot replace required independent review when authority-sensitive scope requires it.

---

## 9. Verification Evidence

### 9.1 Evidence purpose

Verification evidence proves that implementation preserved authority. Evidence must be concrete, reproducible where applicable, and scoped to the work package.

### 9.2 Evidence classes

| Evidence class | Examples |
|----------------|----------|
| Static checks | Type checks, lint, formatting, dependency checks |
| Unit tests | Domain invariant, service, utility, adapter tests |
| Integration tests | API, persistence, cross-boundary, external mediation tests |
| Security tests | Authn/authz denial, ownership, privilege, secret, classification tests |
| Migration checks | Forward migration, rollback posture, data compatibility, ownership validation |
| Observability proof | Signal, audit/evidence, trace, failure, commit-order proof |
| Manual review evidence | Diff review, authority trace, review findings |
| Runtime smoke evidence | Future environment-specific smoke checks when authorized |
| Unavailable evidence report | Explicit statement of checks not run and why |

### 9.3 Evidence honesty rules

| Rule | Requirement |
|------|-------------|
| **IMPL-EVD-1** | Tests must not be claimed as passed unless run or otherwise verified |
| **IMPL-EVD-2** | Unrun checks must be reported |
| **IMPL-EVD-3** | Evidence must map to change classes |
| **IMPL-EVD-4** | Observability evidence is proof, not domain truth |
| **IMPL-EVD-5** | Generated or AI-created tests require review and execution before evidence claims |
| **IMPL-EVD-6** | Manual reasoning cannot substitute for required automated checks unless unavailable and justified |

### 9.4 Acceptance evidence minimum

Before future implementation acceptance, every package must provide:

- Final changed artifact list;
- Authority trace;
- Gate checklist result;
- Review result;
- Selected Validation Scope per `REPOSITORY_STANDARDS.md`;
- Verification commands or check evidence;
- Unrun checks and residual risk;
- Confirmation that release execution was not performed unless separately authorized.

---

## 10. Product And Domain Rule Preservation

### 10.1 Product preservation rule

Implementation must preserve Product Authority exactly. Product meaning cannot be inferred from code, convenience, data schema, UI layout, external provider behavior, or AI output.

### 10.2 Immutable domain rules

Future implementation gates must preserve:

| Domain rule | Implementation governance requirement |
|-------------|----------------------------------------|
| Roles are `user`, `realtor`, and `admin` | No additional roles, role aliases, or expanded role meanings without product authority |
| Admin grants realtor access | Realtor role transitions route through delegated governance authority only |
| Realtor edits only own listings | Owner-scoped mutation validation required in domain path |
| `owner_id` is not user-controlled | Ownership cannot be overwritten from client/API/persistence convenience |
| Contacts come from realtor profiles | Listing creation cannot capture listing-specific contacts |
| New realtor listing enters `pending` | Direct availability bypass prohibited |
| Public exposure only eligible state | Public reads and frontend presentation must enforce visibility eligibility |
| Admin is delegated, not omniscient | Admin operations require delegated scope and target eligibility |
| Participation and execution are separate | Professional participation cannot execute governance outcomes |
| Performance Integrity | Success cannot be signaled before authoritative confirmation |

### 10.3 Future capability restraint

AI product features, maps, live updates, chat, push synchronization, real-time collaboration, analytics, or other future capabilities require independent product and engineering authorization before implementation. Implementation Governance cannot bootstrap future capability approval.

---

## 11. Architecture Boundary Governance

### 11.1 Backend implementation governance

Backend implementation packages must preserve:

- Access Adaptation without domain truth ownership;
- Application Orchestration without domain invariant ownership;
- Domain Realization Units as final owners of domain truth;
- Persistence Boundary as routing discipline, not policy owner;
- Integration Consumption as mediated and non-authoritative;
- Domain contracts as owned by declaring domain units;
- Governed mutations through owning-domain paths.

Backend packages must not place business logic, ownership mutation, moderation status changes, authentication mechanisms, or authorization policy in unauthorized layers.

### 11.2 Frontend implementation governance

Frontend implementation packages must preserve:

- Public, Professional, and Governance surface separation;
- Client non-authority for marketplace state, session authority, role truth, and authorization;
- Capability reachability as presentation gate only;
- Honest pending/success/failure representation;
- Public display of eligible state only;
- No realtor contact capture at listing creation surfaces.

Frontend packages must not become product authority through presentation convenience.

### 11.3 API implementation governance

API implementation packages must preserve:

- API contracts as governed access surfaces;
- Command/query separation;
- Actor context attachment without identity truth ownership;
- Role scope, ownership, and eligibility preconditions;
- Honest error, denial, pending, and success outcomes;
- Idempotency for contract-exposed mutations where required;
- Pagination, filtering, and sorting discipline for reads.

API packages must not become domain logic, authorization policy, or persistence owner.

### 11.4 Persistence implementation governance

Persistence implementation packages must preserve:

- One authoritative owner per record class;
- Aggregate root and consistency boundaries;
- Transaction ownership;
- Schema evolution and migration review;
- Evidence/truth separation;
- Derived projection subordination;
- Append-oriented audit/evidence posture;
- Owner-confirmed write authorization before durability.

Persistence packages must not use schema layout as product or domain authority.

### 11.5 Security, authentication, and authorization governance

Security-sensitive implementation packages must preserve:

- System-established identity context;
- Session authority as system-scoped, not client-scoped;
- Client claims as input only;
- Authorization separate from authentication;
- Policy separate from enforcement site;
- Domain-final mutation authority;
- Least privilege and deny-by-default posture;
- Delegated governance scope for admin operations;
- Secret exclusion from source, logs, errors, tests, and generated artifacts.

### 11.6 Infrastructure implementation governance

Infrastructure implementation packages must preserve:

- Environment separation;
- Operational state not domain truth;
- Configuration classification and ownership;
- Secrets outside version-controlled artifacts;
- Runtime parity where required by Infrastructure Standards;
- Backup and disaster recovery classification obligations;
- Infrastructure as mechanism, not business policy.

Infrastructure packages must not authorize deployment or release unless separately authorized.

### 11.7 Integration implementation governance

Integration implementation packages must preserve:

- External mediation boundary;
- External systems as non-authoritative;
- Validate before normalize, normalize before promote;
- External facts subordinate until owning-domain acceptance;
- Integration-scoped credentials;
- Failure containment and honest degradation;
- Provider replaceability.

Integration packages must not directly mutate domain truth from provider responses.

### 11.8 Observability implementation governance

Observability implementation packages must preserve:

- Evidence is not truth;
- Collection is read-only;
- Classification before correlation;
- Failure legibility;
- Commit-order proof for material user-visible, contract-visible, or governance-sensitive outcomes;
- Secret-free signals, logs, traces, and events;
- Replaceable tooling.

Observability packages must not become product analytics authority, security policy, or mutation path.

---

## 12. AI-Assisted Implementation Governance

### 12.1 AI posture

AI may assist future implementation only when implementation is separately authorized and AI-assisted work remains governed by AI Collaboration Standards.

### 12.2 AI-assisted package rules

| Rule | Requirement |
|------|-------------|
| **IMPL-AI-1** | AI-generated implementation artifacts require implementation authorization before repository modification |
| **IMPL-AI-2** | AI output must be classified before use |
| **IMPL-AI-3** | AI-generated code requires human-accountable review |
| **IMPL-AI-4** | AI-generated tests require execution or explicit review before evidence claims |
| **IMPL-AI-5** | AI tools must not receive secrets or classified data without explicit authorization |
| **IMPL-AI-6** | AI review assists but does not approve |
| **IMPL-AI-7** | AI must preserve unrelated working-tree changes and authorized scope |

### 12.3 AI stop conditions

AI-assisted implementation must stop when:

- Required authority is missing;
- Prompt or tool output conflicts with repository authority;
- Secret or classified data exposure is detected;
- AI suggests product behavior not authorized by Product Authority;
- AI suggests bypassing tests, review, auth, ownership, migration, or security gates;
- AI cannot verify material claims from repository evidence.

---

## 13. Repository And Change Hygiene

### 13.1 Repository hygiene purpose

Implementation work must remain reviewable. Repository state must not hide scope expansion, generated noise, unrelated user edits, or accidental governance changes.

### 13.2 Hygiene rules

| Rule | Requirement |
|------|-------------|
| **IMPL-REP-1** | Inspect live Git status before implementation work |
| **IMPL-REP-2** | Record pre-existing modified and untracked files |
| **IMPL-REP-3** | Do not absorb unrelated changes |
| **IMPL-REP-4** | Stage only authorized files |
| **IMPL-REP-5** | Generated artifacts require explicit scope and review |
| **IMPL-REP-6** | Authority documents must not be modified from implementation work unless explicitly authorized |
| **IMPL-REP-7** | Commit, push, tag, release, deploy, and destructive operations require explicit authorization |
| **IMPL-REP-8** | Failed hooks, checks, or tests must be fixed or reported honestly |

### 13.3 Artifact classes

| Artifact class | Governance posture |
|----------------|--------------------|
| Source code | Requires implementation authorization and Development Standards gates |
| Tests | Required evidence where material; must not encode false authority |
| Migrations | Require persistence gates and compatibility review |
| Configuration | Requires classification and owning authority |
| Infrastructure artifacts | Require infrastructure gates and deployment separation |
| Generated files | Require declared generator/source and review |
| Documentation | Must not amend authority unless authorized |
| Release artifacts | Require Engineering Release Strategy authorization |

---

## 14. Sequencing And Dependency Governance

### 14.1 Sequencing purpose

Implementation sequencing prevents downstream artifacts from depending on missing authority, unreviewed contracts, or unstable boundary assumptions.

### 14.2 Sequencing rules

| Rule | Requirement |
|------|-------------|
| **IMPL-SEQ-1** | Authority-sensitive implementation waits for required published authority |
| **IMPL-SEQ-2** | Domain models precede dependent API, frontend, persistence, and observability surfaces |
| **IMPL-SEQ-3** | Authentication and authorization boundaries precede protected operations |
| **IMPL-SEQ-4** | Persistence ownership and migration plan precede durable write implementation |
| **IMPL-SEQ-5** | Contract declaration precedes consumer implementation |
| **IMPL-SEQ-6** | Observability proof obligations are planned before acceptance |
| **IMPL-SEQ-7** | Integration mediation precedes external provider dependence |
| **IMPL-SEQ-8** | Infrastructure environment and secret boundaries precede deployment work |
| **IMPL-SEQ-9** | Release packaging waits for accepted implementation and release authorization |

### 14.3 Dependency inversion blocker

If frontend, API, persistence, infrastructure, external provider, or AI-generated artifact begins defining product or domain truth before owning authority is implemented or declared, the work package is blocked.

---

## 15. Stop Conditions And Escalation

### 15.1 Stop condition purpose

Stop conditions prevent implementation drift from becoming normalized.

### 15.2 Mandatory stop conditions

Implementation work must stop and route to governance review when:

- Implementation authorization is absent, ambiguous, expired, or insufficient;
- Product meaning appears unclear or would change;
- Scope expands beyond authorized package;
- Published authorities conflict;
- Required upstream authority is missing;
- A security boundary, secret, credential, classification, auth, or privilege concern is discovered;
- Owner-scoped mutation, moderation, role grant, public visibility, or contact sourcing rule is at risk;
- Persistence ownership, migration, or aggregate boundary is unclear;
- External provider behavior would define Rento truth;
- Observability cannot prove a material transition or failure boundary;
- AI output cannot be verified or suggests unauthorized behavior;
- Release, deployment, tag, push, Phase 4, or methodology work becomes necessary but is not authorized.

### 15.3 Escalation routes

| Blocker | Escalation route |
|---------|------------------|
| Product meaning ambiguity | Product Authority / Design Council route |
| Published authority conflict | Repository-governed architecture review |
| Security or data exposure | Security Standards review |
| Ownership or mutation ambiguity | Owning domain and Authorization Architecture review |
| Persistence ambiguity | Database Architecture / Database Standards review |
| Infrastructure ambiguity | Infrastructure Standards review |
| Integration ambiguity | Integration Architecture review |
| Observability proof gap | Observability Architecture review |
| Release requirement | Engineering Release Strategy review |
| Phase 4 or methodology question | Strategic governance route |

---

## 16. Acceptance Model

### 16.1 Acceptance definition

Implementation acceptance means a scoped implementation work package has satisfied all required gates and is ready for the next authorized lifecycle step. Acceptance does not mean release, deployment, tag creation, product approval, or Phase 4 start.

### 16.2 Acceptance checklist

| Item | Required result |
|------|-----------------|
| Authorization | Present and covers scope |
| Scope | Only authorized artifacts changed |
| Authority trace | Complete and reviewable |
| Product preservation | Verified or escalated |
| Security gates | Passed or blocked |
| Domain ownership | Preserved |
| API/frontend/backend boundaries | Preserved where applicable |
| Persistence/migration gates | Passed where applicable |
| Infrastructure/config gates | Passed where applicable |
| Integration gates | Passed where applicable |
| Observability proof | Satisfied where applicable |
| AI gates | Satisfied where applicable |
| Tests/checks | Run or honestly reported |
| Review | Findings resolved or accepted by authority |
| Release boundary | Release not executed unless separately authorized |
| Residual risk | Recorded |

### 16.3 Acceptance outcomes

| Outcome | Meaning |
|---------|---------|
| Accepted | All required gates satisfied |
| Accepted with recorded residual risk | Gates satisfied; non-blocking risk recorded |
| Blocked | One or more required gates failed |
| Split required | Scope contains separable unrelated packages |
| Governance escalation required | Authority missing, conflicting, or ambiguous |
| Cancelled | Package no longer valid or authorized |

---

## 17. Relationship To Release, Deployment, And Phase 4

### 17.1 Release separation

Implementation acceptance is not release execution. Engineering Release Strategy governs release packaging, Git tags, GitHub releases, release naming, and release execution authorization.

### 17.2 Deployment separation

Deployment and production operation require explicit authorization. Infrastructure artifacts, code readiness, passing tests, or accepted implementation packages do not imply deployment permission.

### 17.3 Phase 4 separation

Phase 4 Product Development Methodology remains not started unless strategic governance explicitly starts it. This document does not define:

- Sprint process;
- Team rituals;
- Estimation;
- Delivery management;
- Staffing;
- Roadmap commitment;
- Product development methodology.

### 17.4 Phase 3 completion separation

Authoring or publication of this document does not itself complete Phase 3. Phase 3 completion requires the repository-defined completion path, including publication of required authorities and separate Design Council approval of Project Architecture & Standards as a unified artifact where required by repository authority.

---

## 18. Implementation Governance Invariants

These invariants are mandatory after publication for future implementation authorization, planning, review, and acceptance.

| ID | Invariant |
|----|-----------|
| **IMPL-INV-1** | Implementation requires separate explicit authorization before any implementation artifact is created or modified |
| **IMPL-INV-2** | Implementation realizes published authority and never creates product or engineering authority by itself |
| **IMPL-INV-3** | Product Authority and immutable domain rules prevail over code precedent, convenience, tool output, and AI suggestions |
| **IMPL-INV-4** | Every implementation change must identify an owning published authority |
| **IMPL-INV-5** | Implementation scope must remain bounded to the authorized work package |
| **IMPL-INV-6** | Security, authentication, authorization, ownership, data classification, and secret gates block acceptance when applicable |
| **IMPL-INV-7** | Domain services remain final mutation authority for domain truth |
| **IMPL-INV-8** | Frontend, API, persistence, infrastructure, observability, integration, and AI tools must not become domain truth owners |
| **IMPL-INV-9** | Public exposure must preserve visibility eligibility |
| **IMPL-INV-10** | Realtor ownership, contact sourcing, moderation flow, and delegated admin scope must be preserved |
| **IMPL-INV-11** | Evidence and observability prove behavior but do not replace authoritative state |
| **IMPL-INV-12** | External provider facts remain mediated and subordinate until accepted by owning domain path |
| **IMPL-INV-13** | Secrets and credentials must not appear in source, logs, tests, generated artifacts, prompts, or commits |
| **IMPL-INV-14** | AI-assisted implementation remains subordinate to AI Collaboration Standards and human-accountable review |
| **IMPL-INV-15** | Release, deployment, push, tag, and GitHub Release execution require explicit authorization |
| **IMPL-INV-16** | Phase 4 is not started by implementation governance, implementation authorization, or implementation acceptance |
| **IMPL-INV-17** | Missing, conflicting, or ambiguous authority requires stop and escalation |
| **IMPL-INV-18** | Tests and checks must be reported honestly, including failures and unrun verification |
| **IMPL-INV-19** | Unrelated working tree changes must be preserved and excluded from implementation packages |
| **IMPL-INV-20** | Accepted implementation work remains subordinate to future release, deployment, and operational authorization gates |

---

## 19. Downstream Consumers

The following future artifacts may consume this document after publication and separate implementation authorization:

| Consumer | Consumption relationship |
|----------|--------------------------|
| Implementation authorization acts | Use this document to define required package metadata, gates, and stop conditions |
| Implementation work packages | Consume classification, review, verification, and acceptance model |
| Backend implementation artifacts | Consume backend boundary and domain ownership governance |
| Frontend implementation artifacts | Consume surface separation and client non-authority governance |
| API implementation artifacts | Consume contract, command/query, and access boundary governance |
| Persistence and migration artifacts | Consume persistence and migration governance gates |
| Infrastructure artifacts | Consume environment, configuration, secret, and deployment separation gates |
| Integration artifacts | Consume external mediation and failure containment gates |
| Observability artifacts | Consume proof, signal, evidence, and failure visibility gates |
| AI-assisted implementation workflows | Consume AI-assisted implementation rules and AIC gate inheritance |
| Release preparation artifacts | Consume release separation but defer execution to Engineering Release Strategy |

Downstream consumers must cite this document by reference. They must not duplicate, narrow, or replace IMPL-INV invariants.

---

## 20. Prohibited Scope

This document and Implementation Governance must not specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Product feature scope, roadmap, priority, user experience changes, or capability approval | Product Authority and strategic governance |
| Implementation authorization act | Separate repository-recognized governance act |
| Code architecture, endpoint paths, schemas, migrations, package layout, framework choice, or tool selection | Future implementation artifacts when authorized |
| Sprint process, delivery methodology, estimation, staffing, team rituals, or product development methodology | Phase 4 or organizational methodology when authorized |
| Release execution, Git tags, GitHub Releases, release manifests, release cadence, or deployment packaging | Engineering Release Strategy and explicit release authorization |
| Deployment, production operations, incident response, on-call procedure, or operational runbooks | Future operations authority |
| Security policy, credential taxonomy, data classification, or trust boundary redefinition | Security Standards and owning architecture |
| Repository lifecycle, publication workflow, or continuity workflow changes | Repository Standards |
| AI model/vendor/tool selection or AI product feature approval | AI Collaboration Standards for collaboration rules; Product Authority for product features |

**Governance only.** Future implementation proceeds only after separate authorization and must remain subordinate to published authority.

---

## 21. Terminology

| Term | Meaning |
|------|---------|
| **Implementation Governance** | Standards governing how future authorized implementation work is scoped, gated, reviewed, verified, accepted, stopped, and escalated |
| **Implementation authorization** | Separate repository-recognized act that permits specified implementation work |
| **Implementation work package** | Bounded governance unit of authorized implementation artifacts |
| **Change class** | Classification that determines gates, reviewers, and verification evidence |
| **Governance gate** | Required check that protects authority preservation before acceptance |
| **Acceptance** | Governance result that a work package satisfied required gates; not release or deployment |
| **Stop condition** | Circumstance requiring work to halt and route to governance review |
| **Authority trace** | Mapping from implementation change to owning published repository authority |
| **Release separation** | Rule that implementation acceptance does not execute release |
| **Phase 4 separation** | Rule that implementation governance does not start Product Development Methodology |

Terms defined in upstream authorities retain upstream meaning.

---

## 22. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED - Implementation Governance |
| **Authority class** | Authoritative implementation governance |
| **Binding authority** | Active - per REPOSITORY_STANDARDS.md section 7.6 |
| **Publication** | COMPLETE |
| **Phase** | Implementation Governance - Phase 3 original authority (A5; execution order position 9 per PHASE_3_EVOLUTION_AUTHORIZATION.md section 6) |
| **Engineering authoring** | COMPLETE |
| **Independent review** | APPROVED |
| **Publication review** | APPROVED FOR PUBLICATION |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A5, execution order position 9) |
| **Implementation** | NOT AUTHORIZED |
| **Phase 4** | NOT STARTED |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0, PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, PRODUCT_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, FRONTEND_ARCHITECTURE.md, API_STANDARDS.md, DATABASE_ARCHITECTURE.md, DATABASE_STANDARDS.md, SECURITY_STANDARDS.md, INFRASTRUCTURE_STANDARDS.md, OBSERVABILITY_ARCHITECTURE.md, INTEGRATION_ARCHITECTURE.md, AUTHENTICATION_ARCHITECTURE.md, AUTHORIZATION_ARCHITECTURE.md, DEVELOPMENT_STANDARDS.md, AI_COLLABORATION_STANDARDS.md, ENGINEERING_RELEASE_STRATEGY.md, REPOSITORY_STANDARDS.md |
| **Superior to** | Future implementation authorization packages and implementation artifacts on implementation governance matters (upon publication and separate implementation authorization) |
| **Does not authorize** | Implementation; product feature scope; product development methodology; Phase 4; release execution; Git tag creation; GitHub Release creation; deployment; operations; code changes; migrations; infrastructure changes; AI product features; provider selection; framework selection |
| **Prerequisites** | AI Collaboration Standards published - satisfied; Development Standards published - satisfied; Authorization Architecture published - satisfied; Authentication Architecture published - satisfied; Security Standards published - satisfied; Infrastructure Standards published - satisfied; Observability Architecture published - satisfied; Integration Architecture published - satisfied; Database Standards published - satisfied; Phase 3 Evolution AUTHORIZED - satisfied |
| **§4.11 amendment (Governance Maintenance)** | §4.11 Implementation-Driven Governance Posture (IMPL-ID-1 through IMPL-ID-10) — PUBLISHED — EFFECTIVE |
| **§4.11 maintenance lifecycle** | Repository Maintenance · Governance Maintenance · state PUBLISHED per REPOSITORY_STANDARDS.md §7.8.4 |
| **§4.11 independent review** | COMPLETED — APPROVED — Review Type Independent Review — Validation Scope Targeted Validation |
| **§4.11 review evidence** | `docs/implementation/reviews/IMPLEMENTATION_GOVERNANCE_4_11_INDEPENDENT_REVIEW.md` |
| **§4.11 findings** | BLOCKING NONE · NON-BLOCKING NONE · OBSERVATIONS O-1 through O-3 — correction NOT REQUIRED |
| **§4.11 publication checkpoint** | EXECUTED BY THE SCOPED PUBLICATION COMMIT CREATED BY THIS TASK — §4.11 binding authority ACTIVE |

---

**Document path:** `docs/engineering/IMPLEMENTATION_GOVERNANCE.md`
**Related:** `docs/engineering/PROJECT_CONSTITUTION.md` | `docs/engineering/REPOSITORY_STANDARDS.md` | `docs/engineering/DEVELOPMENT_STANDARDS.md` | `docs/engineering/AI_COLLABORATION_STANDARDS.md` | `docs/engineering/SECURITY_STANDARDS.md` | `docs/engineering/ENGINEERING_RELEASE_STRATEGY.md` | `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
