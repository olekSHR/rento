# Rento Development Standards

**Status:** PUBLISHED - Development Standards
**Authority class:** Authoritative development engineering standards
**Binding authority:** Active - per REPOSITORY_STANDARDS.md section 7.6
**Publication:** COMPLETE
**Implementation:** NOT AUTHORIZED
**Program authorization:** Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A3, execution order position 7)
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Development Reviewers, Security Reviewers, Implementation Reviewers
**Governance basis:** PROJECT_CONSTITUTION.md | ARCHITECTURE_PRINCIPLES.md | PLATFORM_ARCHITECTURE.md | SYSTEM_ARCHITECTURE.md | PRODUCT_ARCHITECTURE.md | BACKEND_ARCHITECTURE.md | FRONTEND_ARCHITECTURE.md | API_STANDARDS.md | DATABASE_ARCHITECTURE.md | DATABASE_STANDARDS.md | SECURITY_STANDARDS.md | INFRASTRUCTURE_STANDARDS.md | OBSERVABILITY_ARCHITECTURE.md | INTEGRATION_ARCHITECTURE.md | AUTHENTICATION_ARCHITECTURE.md | AUTHORIZATION_ARCHITECTURE.md | ENGINEERING_RELEASE_STRATEGY.md | REPOSITORY_STANDARDS.md | ENGINEERING_HANDOFF.md | PHASE_3_AUTHORIZATION.md | PHASE_3_EVOLUTION_AUTHORIZATION.md | RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)

---

## 1. Purpose

This document defines **engineering standards for development practice** in the Rento platform.

It establishes how future authorized implementation work must translate published architecture into code, tests, reviews, configuration, dependencies, migrations, contracts, security controls, observability evidence, and repository changes - without authorizing implementation, selecting frameworks, defining product behavior, creating delivery methodology, prescribing team rituals, choosing infrastructure products, or executing release operations.

This document answers:

- What Development Standards own versus what architecture, domain standards, implementation governance, release governance, and future implementation artifacts own;
- How implementation-era work must preserve Product Authority, Engineering Constitution compliance, Repository Authority, published architecture, and immutable domain rules;
- How backend, frontend, API, persistence, infrastructure, security, authentication, authorization, integration, and observability obligations become development gates;
- How changes are structured, reviewed, tested, documented, and traced before they may be accepted under future implementation authorization;
- What standards apply to code organization, dependency discipline, configuration, secrets, error handling, migration discipline, evidence, and review readiness;
- What validation requirements apply before downstream Implementation Governance or implementation artifacts may consume this authority;
- What invariants and prohibitions preserve product truth, security, stability, maintainability, scalability, and implementation independence.

Development Standards are **implementation discipline governance**. They are not implementation authorization, not development methodology, not sprint process, not coding task assignment, not technology selection, not product design, not architecture redefinition, and not release execution.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    -> Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        -> Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            -> Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                -> Platform architecture (PLATFORM_ARCHITECTURE.md)
                    -> System architecture (SYSTEM_ARCHITECTURE.md)
                        |-- Product architecture (PRODUCT_ARCHITECTURE.md)
                        |-- Backend architecture (BACKEND_ARCHITECTURE.md)
                        |-- Frontend architecture (FRONTEND_ARCHITECTURE.md)
                        |-- API standards (API_STANDARDS.md)
                        |-- Database architecture (DATABASE_ARCHITECTURE.md)
                        |-- Database standards (DATABASE_STANDARDS.md)
                        |-- Security standards (SECURITY_STANDARDS.md)
                        |-- Infrastructure standards (INFRASTRUCTURE_STANDARDS.md)
                        |-- Observability Architecture (OBSERVABILITY_ARCHITECTURE.md)
                        |-- Integration Architecture (INTEGRATION_ARCHITECTURE.md)
                        |-- Authentication Architecture (AUTHENTICATION_ARCHITECTURE.md)
                        |-- Authorization Architecture (AUTHORIZATION_ARCHITECTURE.md)
                        `-- Development Standards (this document)
                            -> AI Collaboration Standards (when published)
                            -> Implementation Governance (when published)
                                -> Implementation artifacts
```

Development Standards sit below published architecture and standards authorities. They convert already-published constraints into development-time obligations for future authorized implementation. They do not amend architecture, approve implementation, or create methodology.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Product authority supremacy, phase discipline, implementation separation, immutable domain fidelity | Converts constitutional constraints into development standards without restating governance |
| ARCHITECTURE_PRINCIPLES.md | Structural principles, maintainability, security by design, traceability, consistency, ownership clarity | Applies principle inheritance to development practice and review gates |
| PLATFORM_ARCHITECTURE.md | Bounded domains, layers, platform invariants, lifecycle mapping | Requires implementation changes to preserve platform boundaries and PLT invariants |
| SYSTEM_ARCHITECTURE.md | System components, trust boundaries, state ownership, dependency direction | Requires component and boundary compliance in implementation structure |
| PRODUCT_ARCHITECTURE.md | Product-to-engineering translation, lifecycle preservation, role responsibilities, Performance Integrity | Preserves product meaning and immutable domain rules in development gates |
| BACKEND_ARCHITECTURE.md | Backend layers, domain realization units, orchestration, contracts, persistence boundaries | Defines backend development discipline for future implementation |
| FRONTEND_ARCHITECTURE.md | Experience surfaces, access consumption, presentation boundaries, client non-authority | Defines frontend development discipline for future implementation |
| API_STANDARDS.md | Access contract governance, command/query separation, contract ownership, error/idempotency/read rules | Defines contract realization discipline without defining endpoint syntax |
| DATABASE_ARCHITECTURE.md | Persistence ownership, aggregate boundaries, transaction governance, evidence/truth separation | Consumes persistence architecture for development review gates |
| DATABASE_STANDARDS.md | Persistence engineering standards, migration governance, aggregate implementation discipline | Aligns development workflow with persistence engineering obligations |
| SECURITY_STANDARDS.md | Security policy, trust boundaries, classification, credentials, secure defaults, SEC-INV invariants | Requires security review gates and secure development constraints |
| INFRASTRUCTURE_STANDARDS.md | Environment, configuration, secrets, runtime, backup, infrastructure governance | Requires development artifacts to preserve infrastructure boundaries |
| OBSERVABILITY_ARCHITECTURE.md | Signal, evidence, traceability, health, failure visibility, proof obligations | Requires development changes to produce reviewable proof where material |
| INTEGRATION_ARCHITECTURE.md | External mediation, external fact lifecycle, provider replacement, integration failure containment | Requires integration implementation discipline without provider selection |
| AUTHENTICATION_ARCHITECTURE.md | Identity context establishment, session authority, authentication boundary governance | Requires authentication implementation changes to preserve identity-context boundaries |
| AUTHORIZATION_ARCHITECTURE.md | Authorization decision lifecycle, boundary classes, delegated scope, domain-final authority | Requires authorization implementation changes to preserve decision boundaries |
| ENGINEERING_RELEASE_STRATEGY.md | Engineering release packaging and release execution boundary | Prevents development authoring from implying release execution |
| REPOSITORY_STANDARDS.md | Repository lifecycle, publication, traceability, working set discipline | Governs document lifecycle and repository workflow |

### 2.3 What this document owns

- Development standards purpose and responsibility boundaries;
- Future implementation work intake discipline;
- Architecture-to-code traceability requirements;
- Backend, frontend, API, persistence, infrastructure, security, authentication, authorization, integration, and observability development gates;
- Code organization and dependency direction standards at authority level;
- Change classification and review routing standards;
- Test and verification standards;
- Configuration, secret, dependency, and data-handling development discipline;
- Error, denial, failure, and Performance Integrity development discipline;
- Documentation and repository hygiene requirements for implementation changes;
- Development validation gates;
- Development standards invariants (DEV-INV-*).

### 2.4 What this document does not own

- Product meaning, product roles, product lifecycle semantics, or Product Design Standard evolution;
- Platform, system, backend, frontend, API, database, security, infrastructure, observability, integration, authentication, or authorization architecture content;
- Implementation authorization, task approval, feature roadmap, deployment, operations, incident response, or production execution;
- Development methodology, team process, sprint cadence, estimation, organizational workflow, or staffing;
- Framework, programming language, package manager, database product, cloud provider, CI vendor, testing library, policy engine, monitoring product, or deployment tool selection;
- API endpoint paths, payload schemas, component trees, database schemas, migration scripts, runtime configuration values, or code artifacts;
- Engineering release execution, Git tag creation, GitHub Release creation, Phase 3 completion, or Phase 4 methodology.

### 2.5 Amendment

After publication, this document may be amended only through repository-governed review per `REPOSITORY_STANDARDS.md`. Amendments must preserve product authority supremacy, Engineering Constitution compliance, published architecture hierarchy, Security Standards policy supremacy, Authentication and Authorization boundaries, Infrastructure Standards environment discipline, Observability proof obligations, Integration mediation, implementation authorization separation, and repository workflow.

---

## 3. Relationship To Upstream Authority

### 3.1 Constitutional and principle inheritance

Development Standards implement PROJECT_CONSTITUTION.md and ARCHITECTURE_PRINCIPLES.md at development-practice level.

| Constitutional or principle obligation | Development Standards treatment |
|----------------------------------------|---------------------------------|
| Product Authority Supremacy | Development changes must trace product-affecting behavior to published product authority |
| Extension, not replacement | Implementation changes extend published architecture and must not silently replace it |
| Repository Truth | Development decisions require repository evidence, not chat memory or code convention alone |
| Phase Discipline | No implementation work is authorized by this document |
| Immutable Domain Rule Fidelity | Development gates protect roles, ownership, contact sourcing, moderation, and public visibility |
| Security Before Convenience | Security, authorization integrity, and ownership validation outrank developer ergonomics |
| Maintainability | Code changes must preserve local reasoning, bounded modules, and discoverable ownership |
| Traceability | Every architecture-significant implementation choice must name consumed authority |
| Security by Design | Security controls are structural gates, not optional hardening steps |
| Performance Integrity | Development must not encode false completion or deceptive responsiveness |

### 3.2 Product authority consumption

Development Standards consume Product Architecture and immutable domain rules without redefinition.

| Product constraint | Development treatment |
|--------------------|----------------------|
| Roles are `user`, `realtor`, and `admin` | No implementation artifact may introduce, infer, or expand roles without upstream authority |
| Realtor edits only own listings | Owner-scoped mutation checks are mandatory for future implementation paths |
| Contacts come from professional profiles | Listing creation implementation must not capture listing contacts |
| New realtor listing enters `pending` | Development gates must prevent direct public availability bypass |
| Public exposure shows eligible state only | Public reads and presentation must preserve visibility eligibility |
| Admin executes delegated governance only | Admin implementation paths must include delegated scope and target eligibility |
| Participation and execution are separate | Realtor participation code must not execute governance outcomes |
| Performance Integrity | UI, API, background, and persistence changes must not signal success before authoritative confirmation |

### 3.3 Architecture and standards consumption

Development Standards consume published authorities by assigning implementation-era gates. They do not restate full architecture catalogs or create new ownership.

| Authority area | Development consumption |
|----------------|-------------------------|
| Backend | Preserve Access Adaptation -> Application Orchestration -> Domain Logic -> Persistence Boundary -> Integration Boundary responsibilities |
| Frontend | Preserve Experience Surface, Access Consumption, Presentation, Interaction State, and Shared Presentation Discipline separation |
| API | Preserve governed access contracts, command/query separation, ownership, idempotency, errors, pagination/filter/sort discipline |
| Database | Preserve aggregate ownership, transaction scope, migration governance, evidence/truth separation |
| Security | Preserve SEC-INV invariants, classification, least privilege, secret exclusion, audit evidence discipline |
| Infrastructure | Preserve environment separation, configuration classification, secret injection, runtime parity, operational/domain state separation |
| Observability | Preserve proof chains, decision/transition/failure evidence, classification before correlation |
| Integration | Preserve mediation, external fact validation, failure containment, provider replaceability |
| Authentication | Preserve identity-context establishment, session authority, client non-authority, service identity distinction |
| Authorization | Preserve access/domain decision separation, domain-final mutation authority, delegated scope, ownership evidence |

### 3.4 Non-duplication rule

Upstream documents own architecture, product meaning, security policy, and lifecycle governance. Development Standards define how future implementation work must be structured, reviewed, and verified against those authorities. If a development rule appears to redefine upstream content, upstream authority prevails and this document must be amended.

### 3.5 Implementation boundary

This document may define standards that future implementation must satisfy. It does not authorize any implementation task, migration script, code change, deployment, release, push, tag, or production operation.

---

## 4. Development Standards Principles

### DEV-PRIN-1 - Implementation Is Subordinate

Implementation artifacts are subordinate to published Product Authority, Engineering Constitution, architecture, standards, and repository workflow. Code convention, existing behavior, and delivery urgency do not amend authority.

### DEV-PRIN-2 - Every Change Has An Owning Authority

Every implementation-era change must name the published authority that owns its meaning, boundary, state, security posture, and review gate. Orphan implementation patterns are prohibited.

### DEV-PRIN-3 - Architecture Boundaries Become Development Boundaries

Published layers, components, domains, contracts, and trust boundaries must be reflected in code organization, dependency direction, test scope, and review ownership when implementation is authorized.

### DEV-PRIN-4 - Domain Logic Stays With The Domain

Domain invariants, ownership validation, moderation transitions, eligibility checks, and governance execution rules belong to owning domain paths. They must not move into presentation, API syntax, persistence convenience, infrastructure configuration, external providers, or observability code.

### DEV-PRIN-5 - Security Is A Change Gate

Authentication, authorization, secrets, credentials, classification, least privilege, and boundary-crossing behavior are mandatory development review concerns. They are not optional follow-up hardening.

### DEV-PRIN-6 - Tests Prove Authority Preservation

Tests must demonstrate that the implemented behavior preserves product truth, authority boundaries, ownership, visibility, denial honesty, persistence ownership, and failure containment. Testing for happy-path function alone is insufficient.

### DEV-PRIN-7 - Configuration Is Not Policy

Runtime configuration may select environment-specific values and operational wiring. It must not encode product rules, domain policy, role scope, moderation behavior, or authorization shortcuts.

### DEV-PRIN-8 - Observability Is Part Of Definition Of Done

Development work that affects state transitions, authority decisions, trust boundaries, failure containment, background work, or external integration must include proof obligations before acceptance.

### DEV-PRIN-9 - Replaceability Must Survive Realization

Implementation choices must preserve provider, framework, storage, infrastructure, and tooling replaceability where upstream architecture declares replaceability.

### DEV-PRIN-10 - No Implementation By Implication

Published standards, authored drafts, review approvals, release strategy, or continuity metadata do not authorize implementation. Separate implementation authorization remains mandatory.

---

## 5. Development Responsibility Model

### 5.1 Core responsibility matrix

| Responsibility | Owner | Development Standards role |
|----------------|-------|----------------------------|
| Product meaning and immutable domain rules | Product Authority | Require development gates that preserve them |
| Engineering architecture | Published architecture authorities | Require implementation structure to conform |
| Security policy | Security Standards | Require secure development gates and review evidence |
| Authentication mechanism governance | Authentication Architecture | Require identity-context boundary preservation |
| Authorization decision governance | Authorization Architecture | Require decision-boundary preservation |
| Domain final mutation authority | Owning backend domain realization units | Require domain service validation before mutation |
| API contract governance | API Standards | Require contract realization discipline |
| Persistence implementation discipline | Database Standards | Require aggregate, transaction, and migration gates |
| Infrastructure realization discipline | Infrastructure Standards | Require environment/configuration/secret discipline |
| Observability proof obligations | Observability Architecture | Require evidence and signal readiness |
| External mediation | Integration Architecture | Require adapter and external fact containment |
| Implementation governance | Future Implementation Governance | Will consume DEV-INV and DEV-GATE requirements after publication |

### 5.2 Development Standards own

- Development-time compliance gates;
- Change classification and review routing standards;
- Implementation structure expectations at authority level;
- Testing and verification expectations;
- Documentation and traceability expectations;
- Cross-authority implementation readiness standards;
- Development anti-patterns and invariants.

### 5.3 Development Standards must not own

- Architecture definitions owned upstream;
- Product behavior or role semantics;
- Security policy or cryptographic policy;
- Database schema design or migration content;
- API schemas or transport syntax;
- Frontend component implementation or visual system;
- Backend framework pattern implementation;
- Infrastructure topology or deployment scripts;
- Release execution, implementation authorization, or methodology.

---

## 6. Change Classification Standards

### 6.1 Change classification purpose

Future implementation work must be classified before development begins so that authority, review, testing, and risk scope are explicit.

### 6.2 Change classes

| Change class | Meaning | Required posture |
|--------------|---------|------------------|
| Product-significant change | Affects product meaning, role behavior, visibility, moderation, participation, or governance execution | Requires product authority trace; may require upstream product review |
| Architecture-significant change | Affects component, domain, layer, contract, persistence, trust, or integration boundary | Requires published architecture trace and architecture review |
| Security-significant change | Affects authentication, authorization, secrets, classification, trust boundary, or privileged operation | Requires Security Standards trace and security review |
| Data-significant change | Affects authoritative, derived, evidence, operational, or cached state | Requires Database Architecture/Standards trace and migration review if persisted |
| Contract-significant change | Affects API contract, command/query behavior, error, idempotency, filtering, sorting, or pagination | Requires API Standards trace and compatibility review |
| Infrastructure-significant change | Affects environment, configuration, runtime, secret injection, network, backup, or deployment boundary | Requires Infrastructure Standards trace |
| Observability-significant change | Affects proof, evidence, signal, failure visibility, decision legibility, or audit support | Requires Observability Architecture trace |
| Integration-significant change | Affects external provider, external fact, mediation, trust handoff, cached external state, or integration failure | Requires Integration Architecture trace |
| Local implementation change | Internal realization within existing boundary with no authority change | Requires local tests and scope preservation evidence |

### 6.3 Classification rules

| Rule | Requirement |
|------|-------------|
| **DEV-CLS-1** | Every implementation task must declare change class before work begins |
| **DEV-CLS-2** | Highest-risk applicable class controls review routing |
| **DEV-CLS-3** | Multiple classes may apply; none may be hidden for convenience |
| **DEV-CLS-4** | Unclear classification escalates to architecture review before implementation |
| **DEV-CLS-5** | Local implementation classification is invalid when boundary, security, data, or product behavior changes |

---

## 7. Authority Traceability Standards

### 7.1 Traceability purpose

Development work must be reviewable against repository authority without relying on oral tradition, chat context, or existing implementation behavior.

### 7.2 Required trace record

Every future implementation change must be able to identify:

- Owning product or engineering authority;
- Affected platform domain or system component;
- Affected backend/frontend/API/persistence/infrastructure/security/integration/observability boundary;
- Applicable invariants (`PLT-*`, `SYS-*`, `BCK-*`, `FRT-*`, `API-*`, `DB-*`, `DBS-*`, `SEC-*`, `INF-*`, `OBS-*`, `INT-*`, `AUTHN-*`, `AUTHZ-*`, `DEV-*`);
- Change class and review route;
- Test and verification evidence;
- Migration, compatibility, or rollback posture where applicable.

### 7.3 Traceability rules

| Rule | Requirement |
|------|-------------|
| **DEV-TRC-1** | Implementation changes cite repository authority, not chat memory or code precedent |
| **DEV-TRC-2** | Authority-sensitive code paths identify the owning boundary in review evidence |
| **DEV-TRC-3** | Tests map to invariants where product, security, ownership, or data truth is affected |
| **DEV-TRC-4** | Undocumented authority assumptions block acceptance |
| **DEV-TRC-5** | Existing implementation behavior is evidence only; it is not authority |

---

## 8. Backend Development Standards

### 8.1 Backend posture

Backend implementation must preserve BACKEND_ARCHITECTURE.md layer responsibilities and domain realization boundaries. Development Standards do not mandate framework structure; they require responsibility separation and dependency direction.

### 8.2 Backend layer discipline

| Backend layer | Development obligation | Prohibited drift |
|---------------|------------------------|------------------|
| Access Adaptation | Adapt API requests, attach consumed context, reject missing protected context | Domain business rules, persistence writes, authorization policy definition |
| Application Orchestration | Coordinate multi-domain use cases, preserve context, declare transaction ownership | Domain truth ownership, listing ownership, role grants, contact sourcing |
| Domain Logic | Enforce domain invariants, ownership, eligibility, state transitions | Transport syntax, persistence mechanics, frontend presentation |
| Persistence Boundary | Route authorized state to owning persistence scope | Domain meaning or authorization policy |
| Integration Boundary | Consume cross-cutting platform services through declared contracts | Domain truth mutation or external provider authority |

### 8.3 Backend rules

| Rule | Requirement |
|------|-------------|
| **DEV-BCK-1** | Domain-significant mutation must route through owning domain logic |
| **DEV-BCK-2** | Access adaptation must remain thin and non-owning |
| **DEV-BCK-3** | Orchestration must not become a super-domain |
| **DEV-BCK-4** | Domain services validate ownership and invariants before mutation |
| **DEV-BCK-5** | Cross-domain access occurs through declared contracts only |
| **DEV-BCK-6** | Background work uses equivalent domain paths and authorization posture |
| **DEV-BCK-7** | Backend changes affecting role, ownership, moderation, or visibility require security and domain tests |

---

## 9. Frontend Development Standards

### 9.1 Frontend posture

Frontend implementation must preserve FRONTEND_ARCHITECTURE.md surface separation, client non-authority, role-scoped reachability, access consumption discipline, and presentation honesty.

### 9.2 Frontend layer discipline

| Frontend layer | Development obligation | Prohibited drift |
|----------------|------------------------|------------------|
| Access Consumption | Invoke declared contracts and consume authoritative responses | Domain truth ownership or authorization policy |
| Application Composition | Compose presentation flow within surface | Backend orchestration semantics or domain transition ownership |
| Presentation | Render eligible state honestly and preserve surface boundary | Product meaning redefinition or backend mutation authority |
| Interaction State | Hold transient UI context with reconciliation | Permanent authoritative state or session authority |
| Shared Presentation Discipline | Apply cross-surface visibility and Performance Integrity rules | Cross-surface domain owner or trust-boundary collapse |

### 9.3 Frontend rules

| Rule | Requirement |
|------|-------------|
| **DEV-FRT-1** | Client state is never authoritative marketplace, identity, session, or authorization truth |
| **DEV-FRT-2** | Presentation gates do not replace backend authorization |
| **DEV-FRT-3** | Public, Professional, and Governance surfaces remain isolatable |
| **DEV-FRT-4** | Non-public state must not be displayed through public surfaces |
| **DEV-FRT-5** | Optimistic or pending UI must not signal false completion |
| **DEV-FRT-6** | Frontend changes must preserve accessibility and multilingual meaning handoff where user-visible |
| **DEV-FRT-7** | Frontend implementation must not capture listing contacts at listing creation |

---

## 10. API Contract Development Standards

### 10.1 API posture

API implementation must realize API_STANDARDS.md contract governance without turning endpoint syntax, payload shape, or transport mechanics into product or domain authority.

### 10.2 Contract realization discipline

| Contract concern | Development obligation |
|------------------|------------------------|
| Ownership | Contract publisher maps to owning authority |
| Command/query separation | Mutations and reads remain distinct |
| Preconditions | Role, ownership, visibility, context, and eligibility are declared and tested |
| Error honesty | Errors do not leak ineligible state or mask false success |
| Idempotency | Mutation retries preserve domain truth and do not duplicate governed transitions |
| Pagination/filtering/sorting | Read controls preserve eligibility and do not expose hidden state |
| Compatibility | Contract changes declare compatibility and migration posture |

### 10.3 API rules

| Rule | Requirement |
|------|-------------|
| **DEV-API-1** | API realization must map to a declared contract family |
| **DEV-API-2** | Mutation contracts route to exactly one primary command owner |
| **DEV-API-3** | Query contracts enforce visibility before response construction |
| **DEV-API-4** | Error responses preserve security and eligibility restraint |
| **DEV-API-5** | Contract changes require compatibility and migration evidence |
| **DEV-API-6** | API syntax must not define authentication, authorization, or domain policy |

---

## 11. Persistence And Migration Development Standards

### 11.1 Persistence posture

Persistence-related implementation must preserve DATABASE_ARCHITECTURE.md and DATABASE_STANDARDS.md ownership, aggregate, transaction, schema evolution, and migration discipline.

### 11.2 Persistence change obligations

| Persistence concern | Development obligation |
|---------------------|------------------------|
| Aggregate ownership | One owner, one aggregate scope, one mutation entry point |
| Write routing | Owning domain confirms mutation before durability |
| Transaction scope | Declared before multi-aggregate or multi-domain change |
| Read persistence | Queries preserve visibility and source ownership |
| Evidence persistence | Append-oriented and separate from authoritative mutation |
| Migration | Traceable, reversible or forward-recoverable posture declared |
| Classification | Data classification declared before persistence exposure |

### 11.3 Persistence rules

| Rule | Requirement |
|------|-------------|
| **DEV-DB-1** | Persistence implementation must not define domain meaning |
| **DEV-DB-2** | Schema convenience must not alter aggregate boundaries |
| **DEV-DB-3** | Migrations require owning authority, compatibility, and data classification review |
| **DEV-DB-4** | Foreign ownership fields are not mutable outside governed paths |
| **DEV-DB-5** | Evidence and telemetry stores must not become domain truth |
| **DEV-DB-6** | Persistence tests must cover ownership, visibility, transaction, and migration constraints where affected |

---

## 12. Security Development Standards

### 12.1 Security posture

Security is a mandatory development gate. Implementation changes must preserve SECURITY_STANDARDS.md, AUTHENTICATION_ARCHITECTURE.md, and AUTHORIZATION_ARCHITECTURE.md obligations.

### 12.2 Security-sensitive development areas

| Area | Required development treatment |
|------|--------------------------------|
| Authentication | Identity context established at declared boundary; no domain-service authentication |
| Authorization | Access and domain boundaries both validated; domain final authority preserved |
| Secrets and credentials | Values excluded from repository, logs, client artifacts, and generated evidence |
| Data classification | Classification before exposure, persistence, logging, or correlation |
| Privileged operations | Admin role plus delegated scope; evidence required |
| Service identity | Distinct from human actor; minimum necessary scope |
| Error and denial | No secret, credential, or ineligible state leakage |
| Dependencies | New dependencies require trust, scope, and replacement review |

### 12.3 Security rules

| Rule | Requirement |
|------|-------------|
| **DEV-SEC-1** | Security-sensitive changes require security review before acceptance |
| **DEV-SEC-2** | Protected operations require established identity context |
| **DEV-SEC-3** | Authorization denial must not mutate domain state |
| **DEV-SEC-4** | Secrets must never be committed, generated into artifacts, logged, or exposed to clients |
| **DEV-SEC-5** | Dependencies must not silently introduce new trust boundaries or authority paths |
| **DEV-SEC-6** | Test or development bypasses must not persist into durable implementation paths |
| **DEV-SEC-7** | Operational access does not imply domain mutation or governance execution authority |

---

## 13. Infrastructure And Configuration Development Standards

### 13.1 Infrastructure posture

Development artifacts must preserve INFRASTRUCTURE_STANDARDS.md environment, configuration, runtime, secret, and operational/domain state separation.

### 13.2 Configuration classification

| Configuration class | Development treatment |
|---------------------|-----------------------|
| Environment identity | Declared per environment; not product behavior |
| Runtime endpoint/reference | Configuration; not authoritative domain state |
| Feature or capability exposure | Requires product/architecture authority before use |
| Secret reference | References identity only; value injected outside repository artifact |
| Operational tuning | Must not change product truth, visibility, moderation, ownership, or authorization |
| Integration reference | Mediated through Integration Architecture and classified before use |

### 13.3 Infrastructure/configuration rules

| Rule | Requirement |
|------|-------------|
| **DEV-INF-1** | Configuration must not encode domain policy or product behavior |
| **DEV-INF-2** | Environment-specific values must preserve environment separation |
| **DEV-INF-3** | Secret values must not live in repository, build, test, or client-distributed artifacts |
| **DEV-INF-4** | Runtime changes must preserve trust boundary and classification parity |
| **DEV-INF-5** | Infrastructure convenience must not bypass application or domain authorization |
| **DEV-INF-6** | Development and staging credentials must not grant production authority |

---

## 14. Integration Development Standards

### 14.1 Integration posture

External integration implementation must preserve INTEGRATION_ARCHITECTURE.md mediation, external fact subordination, validation, normalization, failure containment, trust evidence, and provider replaceability.

### 14.2 Integration rules

| Rule | Requirement |
|------|-------------|
| **DEV-INT-1** | External systems must not become product or domain authority |
| **DEV-INT-2** | External interaction routes through declared mediation boundary |
| **DEV-INT-3** | Validate before normalize; normalize before domain promotion |
| **DEV-INT-4** | External facts remain subordinate until accepted by owning authority |
| **DEV-INT-5** | Provider failure must not masquerade as domain success |
| **DEV-INT-6** | Provider-specific code must remain replaceable behind declared boundary |
| **DEV-INT-7** | Integration credentials remain scoped and secret values excluded from artifacts |

---

## 15. Observability Development Standards

### 15.1 Observability posture

Development work must satisfy OBSERVABILITY_ARCHITECTURE.md proof obligations where behavior, health, decisions, transitions, failures, dependencies, security outcomes, background work, or external integrations are affected.

### 15.2 Required proof classes

| Proof class | Development obligation |
|-------------|------------------------|
| Flow proof | Actor path through access, orchestration, domain, persistence, and integration boundaries is reconstructible |
| Decision proof | Authorization, ownership, eligibility, and governance decisions are reconstructible where material |
| Transition proof | Domain-significant state transition occurs after owning authority confirmation |
| Failure proof | Failure class and containment boundary are legible |
| Security proof | Authentication, authorization, boundary violation, and privileged actions produce eligible evidence |
| Integration proof | External validation, normalization, promotion, rejection, and failure are traceable |
| Background proof | Deferred work lifecycle, retry, completion, and failure are observable |

### 15.3 Observability rules

| Rule | Requirement |
|------|-------------|
| **DEV-OBS-1** | Signals and evidence must not contain secrets, credentials, or ineligible sensitive state |
| **DEV-OBS-2** | Classification precedes correlation |
| **DEV-OBS-3** | Outward success must follow authoritative confirmation for material operations |
| **DEV-OBS-4** | Observability code must remain read-only relative to domain truth |
| **DEV-OBS-5** | Development review must identify proof gaps for material behavior |

---

## 16. Testing And Verification Standards

### 16.1 Testing posture

Testing is the development proof that implementation preserves repository authority. Test scope follows risk, authority impact, and affected boundaries.

### 16.2 Test classes

| Test class | Required when |
|------------|---------------|
| Unit-level invariant test | Local logic enforces domain, security, or state rule |
| Contract test | API or internal contract behavior changes |
| Integration-boundary test | External, infrastructure, persistence, media, messaging, or service boundary is affected |
| Authorization/ownership test | Role, owner, delegated scope, visibility, or protected operation changes |
| Migration/data test | Persistence structure or migration behavior changes |
| Failure/denial test | Error, denial, timeout, partial, retry, or degradation path changes |
| Observability/evidence test | Proof obligations or emitted evidence changes |
| Regression test | Fix closes a defect or prevents authority drift recurrence |

### 16.3 Verification rules

| Rule | Requirement |
|------|-------------|
| **DEV-TST-1** | Tests must cover forbidden behavior as well as permitted behavior where authority is involved |
| **DEV-TST-2** | Ownership, authorization, moderation, and visibility changes require negative tests |
| **DEV-TST-3** | Public exposure changes require ineligible-state tests |
| **DEV-TST-4** | Migration changes require compatibility and data integrity verification |
| **DEV-TST-5** | Background and retry behavior require idempotency and authorization-context verification |
| **DEV-TST-6** | Missing tests for material authority paths must be recorded as blocker or explicit risk |

---

## 17. Review Standards

### 17.1 Review purpose

Development review verifies that a future implementation change preserves authority, security, stability, maintainability, observability, and repository traceability.

### 17.2 Review routing

| Change class | Required review posture |
|--------------|-------------------------|
| Product-significant | Product Authority impact review before acceptance |
| Architecture-significant | Architecture review against owning published authority |
| Security-significant | Security review against SECURITY_STANDARDS.md and applicable AUTHN/AUTHZ invariants |
| Data-significant | Persistence/database review against DB/DBS invariants |
| Contract-significant | API review against contract ownership and compatibility |
| Infrastructure-significant | Infrastructure review against INF invariants |
| Observability-significant | Observability review against proof obligations |
| Integration-significant | Integration review against mediation and failure containment |
| Local implementation | Peer engineering review plus affected invariant verification |

### 17.3 Review rules

| Rule | Requirement |
|------|-------------|
| **DEV-REV-1** | Review must start with authority and scope, not code preference |
| **DEV-REV-2** | Review must identify affected boundaries and invariants |
| **DEV-REV-3** | Review must reject hidden ownership transfer or policy drift |
| **DEV-REV-4** | Review must verify tests match risk and authority impact |
| **DEV-REV-5** | Review must record unresolved risk before acceptance |
| **DEV-REV-6** | Review cannot waive Product Authority, Security Standards, or immutable domain rules |

---

## 18. Documentation And Repository Hygiene

### 18.1 Documentation posture

Development artifacts must leave repository evidence sufficient for future contributors to understand authority, scope, tests, migrations, and risks.

### 18.2 Required documentation surfaces

| Surface | Required content |
|---------|------------------|
| Change description | What authority path and behavior are affected |
| Test evidence | Commands or checks run and relevant outcomes |
| Migration note | Compatibility, rollback/forward recovery, ownership, and data classification when persistence changes |
| Security note | Auth/authz/secret/classification impact where applicable |
| Observability note | Proof obligations added, changed, or intentionally unaffected |
| Risk note | Residual risk and reason if tests or proof are incomplete |
| Authority note | Upstream standards consumed for material changes |

### 18.3 Repository hygiene rules

| Rule | Requirement |
|------|-------------|
| **DEV-DOC-1** | Authority-significant changes require repository evidence, not only code comments |
| **DEV-DOC-2** | Generated artifacts must not obscure authored authority changes |
| **DEV-DOC-3** | Unrelated working-tree changes must not be absorbed into implementation changes |
| **DEV-DOC-4** | Secrets, credentials, private data, and environment-specific values must not appear in repository artifacts |
| **DEV-DOC-5** | TODOs may not substitute for required authority, security, or data gates |

---

## 19. Dependency And Tooling Standards

### 19.1 Dependency posture

Dependencies and tools are implementation choices. They must remain subordinate to architecture, security, infrastructure, and repository authority.

### 19.2 Dependency rules

| Rule | Requirement |
|------|-------------|
| **DEV-DEP-1** | New dependencies require declared purpose, owner, trust boundary, and replacement posture |
| **DEV-DEP-2** | Dependencies must not define product meaning, domain policy, or authorization behavior by default |
| **DEV-DEP-3** | Dependency use must preserve data classification and secret handling |
| **DEV-DEP-4** | Generated code or configuration remains subordinate to repository authority |
| **DEV-DEP-5** | Tooling convenience must not bypass review, tests, migrations, or security gates |
| **DEV-DEP-6** | Abandoned, unnecessary, or duplicative dependencies require removal or explicit justification when touched |

### 19.3 Tooling boundary

Development tooling may support validation, formatting, generation, local execution, and review. Tool output is evidence only. Tooling does not create repository authority or implementation authorization.

---

## 20. Prohibited Development Patterns

Development Standards prohibit future implementation patterns that undermine published authority:

| Prohibited pattern | Reason |
|--------------------|--------|
| Business logic in access adaptation or presentation | Violates backend/frontend boundary ownership |
| Authorization policy in API syntax or persistence schema | Violates Security and Authorization authority |
| Authentication inside domain service | Violates Authentication boundary |
| Client state as source of identity, role, authorization, or marketplace truth | Violates system and frontend authority |
| Direct `owner_id` mutation outside governed domain path | Violates immutable domain rules |
| Direct publication status mutation outside moderation/governance path | Violates product and domain authority |
| Realtor privilege escalation or admin capability reuse | Violates delegated governance and least privilege |
| Contact capture at listing creation | Violates product authority |
| Public exposure of non-eligible state | Violates visibility and trust boundaries |
| Configuration as business rule | Violates Infrastructure Standards and domain ownership |
| External provider response directly mutating domain truth | Violates Integration Architecture |
| Observability evidence mutating authoritative state | Violates Observability and Database authority |
| Test bypass persisting into durable implementation path | Violates Security Standards |
| Generated artifact treated as authority | Violates Repository Standards |

---

## 21. Development Validation Requirements

### 21.1 Validation purpose

Development validation verifies that future implementation plans and code changes preserve published authority before acceptance. Validation does not authorize implementation.

### 21.2 Validation dimensions

| Dimension | Question |
|-----------|----------|
| Authority trace | Does the change cite owning repository authority? |
| Product preservation | Does it preserve product meaning, roles, lifecycle separation, and immutable domain rules? |
| Architecture compliance | Does it preserve components, layers, domains, contracts, and dependency direction? |
| Security compliance | Does it preserve authentication, authorization, secrets, classification, and least privilege? |
| Data compliance | Does it preserve aggregate ownership, write routing, migration governance, and evidence/truth separation? |
| API compliance | Does it preserve contract ownership, command/query separation, compatibility, and error honesty? |
| Frontend compliance | Does it preserve client non-authority, surface separation, and presentation honesty? |
| Backend compliance | Does it preserve domain logic ownership, orchestration boundaries, and persistence routing? |
| Infrastructure compliance | Does it preserve environment, configuration, secret, and operational/domain separation? |
| Integration compliance | Does it preserve mediation, validation, failure containment, and provider replaceability? |
| Observability compliance | Does it provide proof for material decisions, transitions, failures, and security outcomes? |
| Test adequacy | Do tests cover permitted and forbidden behavior proportionate to risk? |
| Repository hygiene | Are unrelated changes, secrets, generated noise, and undocumented assumptions excluded? |

### 21.3 Quality gates

| Gate | Trigger | Pass criteria |
|------|---------|---------------|
| **DEV-GATE-1 - Authority trace** | Any implementation change | Owning authority and affected invariants identified |
| **DEV-GATE-2 - Change classification** | Before development starts | Highest-risk class and review route declared |
| **DEV-GATE-3 - Product preservation** | Product-visible or role-visible change | Product authority and immutable domain rules preserved |
| **DEV-GATE-4 - Boundary preservation** | Layer/component/domain/surface/API change | Published boundary and dependency direction preserved |
| **DEV-GATE-5 - Security review** | Auth/authz/secret/classification/trust change | Security obligations and negative tests satisfied |
| **DEV-GATE-6 - Data and migration review** | Persistence or migration change | Ownership, compatibility, classification, and integrity verified |
| **DEV-GATE-7 - Contract review** | API or internal contract change | Ownership, compatibility, preconditions, errors, and idempotency verified |
| **DEV-GATE-8 - Observability proof** | Decision, transition, failure, background, or integration change | Required proof classes present or risk recorded |
| **DEV-GATE-9 - Test adequacy** | Any material implementation change | Tests match risk and include forbidden-path coverage where needed |
| **DEV-GATE-10 - Repository hygiene** | Before merge or acceptance | Unrelated changes excluded; secrets and unauthorized artifacts absent |

### 21.4 Review requirement

Material development standards changes require independent review before publication or downstream implementation consumption. Review must verify scope honesty, non-duplication of upstream authority, implementation authorization separation, product authority preservation, security coverage, architecture compliance, test adequacy, and repository workflow compliance.

---

## 22. Development Standards Invariants

These invariants are mandatory for downstream Implementation Governance and implementation artifacts after publication.

| ID | Invariant |
|----|-----------|
| **DEV-INV-1** | Development Standards do not authorize implementation |
| **DEV-INV-2** | Product Authority and immutable domain rules remain supreme over code convention |
| **DEV-INV-3** | Every implementation change must trace to owning repository authority |
| **DEV-INV-4** | Existing implementation behavior is not authority |
| **DEV-INV-5** | Architecture boundaries must be preserved in code organization and dependency direction |
| **DEV-INV-6** | Domain logic remains with owning domain paths |
| **DEV-INV-7** | Access, presentation, persistence, infrastructure, and observability layers must not own domain truth |
| **DEV-INV-8** | Authentication and authorization boundaries remain separate and explicit |
| **DEV-INV-9** | Domain final mutation authority cannot be bypassed by access permission, client state, persistence convenience, or external provider response |
| **DEV-INV-10** | Realtor operations remain owner-scoped and cross-owner mutation is prohibited |
| **DEV-INV-11** | Admin operations require delegated governance scope and are not ambient authority |
| **DEV-INV-12** | Contacts are sourced from professional profiles, not listing creation |
| **DEV-INV-13** | Public exposure is limited to eligible state |
| **DEV-INV-14** | Secrets and credentials must not enter repository, logs, generated artifacts, or client-distributed artifacts |
| **DEV-INV-15** | Configuration must not encode product or domain policy |
| **DEV-INV-16** | External integrations remain mediated and subordinate to owning domain acceptance |
| **DEV-INV-17** | Evidence and telemetry are not domain truth and must not mutate authoritative state |
| **DEV-INV-18** | Tests must cover authority-sensitive forbidden paths where applicable |
| **DEV-INV-19** | Development tooling and generated artifacts remain subordinate to repository authority |
| **DEV-INV-20** | Release execution, tags, deployment, Phase 3 completion, Phase 4, and implementation authorization require separate governance acts |

---

## 23. Downstream Consumers

The following future documents and artifacts may consume Development Standards after publication:

| Consumer | Consumption relationship |
|----------|--------------------------|
| AI Collaboration Standards | Must preserve development gates when AI-assisted work is governed |
| Implementation Governance | Consumes DEV-INV and DEV-GATE requirements for implementation authorization and verification |
| Backend implementation | Consumes backend layer, domain, testing, security, and observability development gates |
| Frontend implementation | Consumes surface, presentation, client state, access, testing, and visibility gates |
| API implementation | Consumes contract realization, compatibility, error, idempotency, and security gates |
| Database implementation | Consumes aggregate, migration, transaction, data classification, and evidence gates |
| Infrastructure implementation | Consumes configuration, secret, environment, runtime, and operational boundary gates |
| Security review | Consumes secure development rules and DEV-SEC gates |
| Observability review | Consumes proof and evidence readiness gates |
| Integration implementation | Consumes external mediation and provider replaceability gates |

Downstream consumers must cite this document by reference. They must not duplicate, narrow, or replace DEV-INV invariants.

---

## 24. Prohibited Scope

This document and Development Standards must not specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Product role changes, product behavior, marketplace semantics, or product lifecycle changes | Product Authority |
| New platform domains, system components, backend architecture, frontend architecture, API governance, persistence architecture, security policy, infrastructure governance, observability architecture, integration architecture, authentication architecture, or authorization architecture | Owning published authority |
| Frameworks, programming languages, package managers, ORMs, UI libraries, API tooling, test runners, CI systems, cloud providers, monitoring products, policy engines, or deployment tools | Future implementation / Implementation Governance when authorized |
| API endpoint paths, payload schemas, header formats, status codes, generated OpenAPI artifacts, or transport protocols | API implementation under API Standards |
| Database schemas, migration scripts, table designs, index definitions, seed data, storage products, or physical layout | Database implementation under Database Standards |
| Frontend component trees, route files, styling systems, design tokens, copy, or visual implementation | Frontend implementation / Product Authority where applicable |
| Backend file layout, framework-specific layer code, service classes, repository classes, handlers, decorators, or dependency injection wiring | Backend implementation under Backend Architecture |
| Infrastructure manifests, CI/CD pipelines, deployment scripts, runtime values, secret values, network configuration, or operational runbooks | Infrastructure implementation / operations when authorized |
| Engineering release manifests, Git tags, GitHub Releases, or release execution | ENGINEERING_RELEASE_STRATEGY.md |
| Delivery methodology, sprint workflow, team rituals, estimation, roadmap management, or Phase 4 methodology | Phase 4 / organizational methodology |

**Standards only.** Implementation proceeds only under separate implementation authorization after applicable standards publication and governance approval.

---

## 25. Terminology

| Term | Meaning |
|------|---------|
| **Development Standards** | Engineering standards governing future implementation discipline, review, testing, traceability, and repository hygiene |
| **Implementation artifact** | Code, configuration, migration, generated artifact, test, script, or runtime file subordinate to published authority |
| **Development gate** | Required check that future implementation work must satisfy before acceptance |
| **Change class** | Risk and authority category assigned to a future implementation change before work begins |
| **Authority trace** | Repository evidence linking implementation change to owning product or engineering authority |
| **Forbidden-path test** | Test proving prohibited behavior remains denied or impossible |
| **Boundary preservation** | Development discipline that keeps code structure aligned with published component, layer, domain, trust, and ownership boundaries |
| **Repository hygiene** | Discipline that keeps unrelated changes, secrets, generated noise, and undocumented assumptions out of governed work |
| **Implementation authorization** | Separate governance act permitting code or infrastructure implementation work; not conferred by this document |

Terms defined in upstream authorities retain upstream meaning.

---

## 26. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED - Development Standards |
| **Authority class** | Authoritative development engineering standards |
| **Binding authority** | Active - per REPOSITORY_STANDARDS.md section 7.6 |
| **Publication** | COMPLETE |
| **Phase** | Development Standards - Phase 3 original authority (A3; execution order position 7 per PHASE_3_EVOLUTION_AUTHORIZATION.md section 6) |
| **Engineering authoring** | COMPLETE |
| **Independent review** | APPROVED |
| **Publication review** | APPROVED FOR PUBLICATION |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A3, execution order position 7) |
| **Implementation** | NOT AUTHORIZED |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0, PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, PRODUCT_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, FRONTEND_ARCHITECTURE.md, API_STANDARDS.md, DATABASE_ARCHITECTURE.md, DATABASE_STANDARDS.md, SECURITY_STANDARDS.md, INFRASTRUCTURE_STANDARDS.md, OBSERVABILITY_ARCHITECTURE.md, INTEGRATION_ARCHITECTURE.md, AUTHENTICATION_ARCHITECTURE.md, AUTHORIZATION_ARCHITECTURE.md, ENGINEERING_RELEASE_STRATEGY.md, REPOSITORY_STANDARDS.md |
| **Superior to** | AI Collaboration Standards, Implementation Governance, and implementation artifacts on development discipline matters |
| **Does not authorize** | Implementation; feature development; provider selection; framework selection; deployment; release execution; Git tag creation; engineering release execution; Phase 3 completion; Phase 4 |
| **Prerequisites** | Authorization Architecture published - satisfied; Authentication Architecture published - satisfied; Security Standards published - satisfied; Database Standards published - satisfied; Infrastructure Standards published - satisfied; Integration Architecture published - satisfied; Observability Architecture published - satisfied; Phase 3 Evolution AUTHORIZED - satisfied |

---

**Document path:** `docs/engineering/DEVELOPMENT_STANDARDS.md`
**Related:** `docs/engineering/PROJECT_CONSTITUTION.md` | `docs/engineering/ARCHITECTURE_PRINCIPLES.md` | `docs/engineering/BACKEND_ARCHITECTURE.md` | `docs/engineering/FRONTEND_ARCHITECTURE.md` | `docs/engineering/API_STANDARDS.md` | `docs/engineering/DATABASE_STANDARDS.md` | `docs/engineering/SECURITY_STANDARDS.md` | `docs/engineering/INFRASTRUCTURE_STANDARDS.md` | `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` | `docs/engineering/INTEGRATION_ARCHITECTURE.md` | `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` | `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` | `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
