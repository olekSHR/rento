# Rento Integration Architecture

**Status:** PUBLISHED — Integration Architecture  
**Authority class:** Authoritative integration engineering architecture  
**Binding authority:** Active — per REPOSITORY_STANDARDS.md §7.6  
**Publication:** COMPLETE  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — extension E2, execution order position 4)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Integration Reviewers, Security Reviewers, Design Council  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · INFRASTRUCTURE_STANDARDS.md · OBSERVABILITY_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · PHASE_3_EVOLUTION_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)

---

## 1. Purpose

This document defines **engineering architecture for external integrations** in the Rento platform.

It establishes how Rento mediates external service interaction, ingests external facts, preserves trust boundaries, contains integration failure, protects domain truth, and makes integration behavior reviewable — without selecting providers, protocols, SDKs, gateways, queue products, webhook formats, retry algorithms, API payloads, storage schemas, secret stores, or implementation runbooks.

This document answers:

- What Integration Architecture owns versus what System Architecture, Security Standards, API Standards, Backend Architecture, Database Architecture, Infrastructure Standards, and Observability Architecture own;
- How external systems interact with Rento without becoming sources of marketplace truth;
- How external facts are validated, normalized, classified, cached, promoted, rejected, or discarded;
- How integration failures remain contained and honest;
- How integration trust, credentials, observability, and persistence boundaries are governed at architecture level;
- What validation requirements apply before downstream standards or implementation may consume this authority;
- What invariants and prohibitions preserve product authority, repository authority, and implementation independence.

Integration Architecture is **external mediation governance**. It is not provider integration implementation, not API contract syntax, not security policy, not authentication or authorization mechanism design, not infrastructure topology, and not delivery guidance.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    → Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        → Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            → Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                → Platform architecture (PLATFORM_ARCHITECTURE.md)
                    → System architecture (SYSTEM_ARCHITECTURE.md)
                        ├── Product architecture (PRODUCT_ARCHITECTURE.md)
                        ├── Backend architecture (BACKEND_ARCHITECTURE.md)
                        ├── Frontend architecture (FRONTEND_ARCHITECTURE.md)
                        ├── API standards (API_STANDARDS.md)
                        ├── Database architecture (DATABASE_ARCHITECTURE.md)
                        ├── Security standards (SECURITY_STANDARDS.md)
                        ├── Database standards (DATABASE_STANDARDS.md)
                        ├── Infrastructure standards (INFRASTRUCTURE_STANDARDS.md)
                        └── Peer specializations under System Architecture
                            ├── Observability architecture (OBSERVABILITY_ARCHITECTURE.md)
                            ├── Integration Architecture (this document)
                            ├── Authentication Architecture (when published)
                            ├── Authorization Architecture (when published)
                            └── Development Standards · Implementation Governance (when published)
                                → Implementation artifacts
```

Integration Architecture is a **peer specialization** under System Architecture. It consumes Observability Architecture as a published peer authority and remains peer to future Authentication Architecture and Authorization Architecture. Phase 3 execution order governs publication sequencing only; it does not create authority ownership, inheritance, or hierarchical subordination.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| SYSTEM_ARCHITECTURE.md | External Integration System component; allowed and prohibited dependencies; external state posture | Specializes external integration responsibilities into architecture-level governance |
| SECURITY_STANDARDS.md | External integration trust zone, credential and secret governance, integration trust events | Consumes security policy and trust rules — does not redefine security policy |
| OBSERVABILITY_ARCHITECTURE.md | External trust evidence, dependency degradation, contained integration failure visibility | Consumes observability obligations for integration proof and failure legibility |
| INFRASTRUCTURE_STANDARDS.md | Integration network zone, secret injection, runtime configuration, connectivity boundaries | Consumes infrastructure prerequisites — does not define infrastructure topology |
| BACKEND_ARCHITECTURE.md | Backend orchestration, domain ownership, command/query ownership, integration interaction posture | Defines integration mediation boundaries without owning backend domain transitions |
| API_STANDARDS.md | Internal Rento access contract governance and truth posture | Aligns integration-mediated facts with contract honesty — does not define API schemas |
| DATABASE_ARCHITECTURE.md | Persistence ownership, authoritative state, operational state, cached external state separation | Consumes persistence classifications — does not define schema or storage layout |
| PRODUCT_ARCHITECTURE.md | Product truth, lifecycle separation, Performance Integrity, future capability evaluation | Preserves product meaning and future capability discipline |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for status honesty and repository workflow |

### 2.3 What this document owns

- Integration architecture purpose and responsibility boundaries;
- External Integration System specialization;
- External mediation responsibility model;
- External fact lifecycle governance;
- Integration trust handoff rules;
- Integration state and cached external state classification;
- Outbound invocation and inbound external input governance;
- Integration failure containment and degradation rules;
- Integration observability and traceability obligations;
- Peer authority interaction model;
- Integration validation gates;
- Integration extension rules;
- Integration architecture invariants (INT-INV-*).

### 2.4 What this document does not own

- Product meaning, marketplace truth, lifecycle semantics, or Product Design Standard evolution;
- Domain state transition ownership, moderation meaning, listing ownership, role truth, or governance execution authority;
- Security policy, authentication policy, authorization policy, credential class taxonomy, or data classification definitions;
- API endpoint structures, payload schemas, status codes, transport protocols, provider API mappings, or serialization formats;
- Backend orchestration implementation, domain service design, provider adapter code, retry algorithms, or worker implementation;
- Database schemas, tables, indexes, external reference storage designs, migration scripts, or storage products;
- Infrastructure topology, network appliances, secret manager products, gateway products, deployment configuration, or operational runbooks;
- Observability tooling, log formats, metric names, dashboard design, or alerting products;
- Engineering release execution, implementation, Phase 3 completion, or Phase 4 methodology.

### 2.5 Amendment

After publication, this document may be amended only through repository-governed review per `REPOSITORY_STANDARDS.md`. Amendments must preserve product authority supremacy, Engineering Constitution compliance, System Architecture External Integration System boundaries, Security Standards external trust governance, Observability Architecture proof obligations, Infrastructure Standards prerequisites, and implementation independence.

---

## 3. Relationship To Upstream Authority

### 3.1 System architecture consumption

Integration Architecture specializes SYSTEM_ARCHITECTURE.md Component 10 — External Integration System.

| System declaration | Integration Architecture treatment |
|--------------------|------------------------------------|
| External Integration System mediates all interaction with trusted external services | Defines mediation as mandatory boundary governance |
| Owned responsibilities include external invocation, fact ingestion, normalization, failure containment, and credential/secret boundary | Converts responsibilities into architectural rules and validation gates |
| Integration state includes connection health and external reference mappings | Classifies integration state as operational or reference state, not marketplace truth |
| Cached external state is time-bounded and non-authoritative unless promoted through domain path | Defines promotion, rejection, and cache honesty requirements |
| Allowed dependencies: Application Platform System, Observability System, Infrastructure boundary | Preserves allowed dependencies and prohibits direct Experience exposure |
| Prohibited dependencies: domain truth ownership, direct Experience exposure, external state as authoritative without domain promotion | Converts prohibitions into integration invariants |

### 3.2 Security standards consumption

Security Standards remains authoritative for trust boundaries, credential and secret governance, integration trust events, and security policy.

| Security obligation | Integration treatment |
|---------------------|----------------------|
| External systems are untrusted until validated and normalized | Integration mediation must validate before any domain promotion |
| Integration secrets are integration-scoped | Integration Architecture requires declared secret consumers without defining secret storage |
| External integration boundary is a trust boundary | Integration paths must classify external inputs before use |
| Integration trust failures produce security events | Integration Architecture requires event eligibility and observability correlation |
| External providers never hold authoritative marketplace truth | Integration facts remain subordinate until owning domain promotion |

### 3.3 Observability architecture consumption

Observability Architecture is published and binding. Integration Architecture consumes its proof obligations.

| Observability obligation | Integration treatment |
|--------------------------|----------------------|
| External trust evidence | Integration trust validation outcomes must be reconstructible |
| Dependency degradation visibility | External dependency health and degradation must be signal-visible |
| Contained integration failure visibility | Integration failure containment must be provable without false success |
| Traceability identity | Integration paths require correlation across external invocation, validation, and domain promotion |
| Classification before correlation | Integration signals and evidence preserve classification before cross-boundary correlation |

### 3.4 API, backend, and persistence consumption

Integration Architecture mediates external systems but does not replace internal Rento access, backend, or persistence governance.

| Authority | Integration treatment |
|-----------|----------------------|
| API_STANDARDS.md | Internal Rento access contracts remain API-governed; provider APIs are external mediation concerns, not Rento access contracts |
| BACKEND_ARCHITECTURE.md | Domain mutations route through owning backend domain paths; integration adapters do not mutate domain truth directly |
| DATABASE_ARCHITECTURE.md | External reference mappings and cached facts remain subordinate to persistence ownership and classification |
| DATABASE_STANDARDS.md | Persistence realization of integration evidence or mappings remains downstream implementation discipline |

### 3.5 Infrastructure standards consumption

Infrastructure Standards defines runtime prerequisites. Integration Architecture defines the architectural obligations those prerequisites enable.

| Infrastructure prerequisite | Integration treatment |
|-----------------------------|----------------------|
| Integration network zone | Integration reachability must remain scoped to declared integration paths |
| Secret injection boundaries | Integration secret consumption is declared by scope; values are never architecture artifacts |
| Runtime configuration classification | External endpoints and integration identifiers are configuration, not secret values or domain policy |
| Failure visibility prerequisites | Integration failure and degradation must be visible without becoming domain truth |
| Signal egress and correlation capacity | Integration proof chains must be observable after publication |

### 3.6 Extension rule

Integration Architecture extends upstream authority. It must not replace, narrow, or reinterpret product meaning, domain ownership, security policy, authentication policy, authorization policy, API contract governance, persistence architecture, infrastructure prerequisites, observability obligations, or repository workflow.

---

## 4. Integration Principles

### INT-PRIN-1 — External Systems Are Never Product Authority

External systems may supply facts, signals, references, or execution outcomes. They do not define Rento product meaning, marketplace truth, listing lifecycle state, ownership, moderation meaning, identity truth, or governance execution authority.

### INT-PRIN-2 — Mediation Is Mandatory

All external interaction must pass through the External Integration System boundary. Direct Experience System exposure to external providers and direct domain mutation from provider responses are prohibited.

### INT-PRIN-3 — Validate Before Normalize, Normalize Before Promote

External input must be validated at the integration boundary, normalized into Rento-understood categories, and promoted only through the owning domain path when promotion is architecturally valid.

### INT-PRIN-4 — External Facts Are Subordinate

External facts are evidence or inputs. They become authoritative only if an owning Rento domain accepts them through governed domain logic.

### INT-PRIN-5 — Failure Is Contained

Integration failure, timeout, provider degradation, invalid input, or partial external outcome must remain contained to the integration path and must not masquerade as successful domain transition.

### INT-PRIN-6 — Trust Is Explicit

Integration trust depends on declared boundary, validation, credential scope, classification, observability, and failure containment. Network reachability, provider reputation, or previous success does not create trust authority.

### INT-PRIN-7 — Providers Are Replaceable

Integration obligations are stable architecture. Providers, SDKs, protocols, gateways, queues, transport encodings, and operational tooling are replaceable implementation choices.

---

## 5. Responsibility Boundaries

### 5.1 Core responsibility model

| Responsibility | Owner | Integration role |
|----------------|-------|------------------|
| External interaction mediation | Integration Architecture / External Integration System | Own boundary governance and mediation rules |
| External provider trust policy | Security Standards | Consume trust rules; do not redefine |
| Integration credential class and secret governance | Security Standards + Infrastructure Standards realization | Declare integration scope; do not store or define secret mechanisms |
| Domain truth mutation | Owning backend domain realization unit | Request promotion through owning path; never mutate directly |
| Internal Rento API contract governance | API Standards | Preserve internal access contract boundaries |
| External provider request/response encoding | Implementation / downstream integration standards | Not governed at architecture level |
| External reference mapping persistence | Database Architecture / owning persistence boundary | Classify and consume persistence ownership rules |
| Cached external facts | External Integration System + persistence owner | Keep subordinate, time-bounded, and classed |
| Integration failure visibility | Integration Architecture + Observability Architecture | Define failure containment and proof obligations |
| Integration network/runtime boundaries | Infrastructure Standards | Consume runtime prerequisites without defining topology |

### 5.2 Integration owns

- External mediation boundary governance;
- External fact classification and lifecycle rules;
- External reference and cached fact architecture posture;
- Integration trust handoff obligations;
- Integration failure containment;
- Integration dependency degradation classification;
- Integration proof-chain requirements;
- Integration invariants and validation gates.

### 5.3 Integration must not own

- Domain mutation authority;
- Product meaning or marketplace truth;
- Identity or role truth;
- Security policy or credential taxonomy;
- Authentication or authorization mechanisms;
- API contract schemas or transport syntax;
- Persistence schema or storage layout;
- Infrastructure topology or secret store implementation;
- Observability tooling or signal encoding.

---

## 6. Integration Boundary Model

### 6.1 Boundary definition

An **integration boundary** is the governed architectural boundary through which Rento sends information to, receives information from, validates, normalizes, and contains behavior from an external trust zone.

The boundary exists whether the integration is synchronous, asynchronous, provider-initiated, Rento-initiated, batch-oriented, event-oriented, or manually reconciled in future implementation.

### 6.2 Boundary classes

| Boundary class | Purpose | Architectural posture |
|----------------|---------|------------------------|
| Outbound invocation boundary | Rento initiates interaction with external provider | Declared purpose, credential scope, observability, and failure containment required |
| Inbound external input boundary | External provider sends input to Rento | Validate, classify, normalize, and route without direct domain mutation |
| External reference boundary | Rento stores or consumes provider identifiers | Reference is subordinate; mapping does not become domain truth |
| Cached external fact boundary | Rento temporarily retains external fact | Time-bounded, classed, non-authoritative unless promoted |
| External dependency health boundary | Rento observes provider availability or degradation | Operational state only; does not redefine domain success |
| Integration trust boundary | Rento determines whether external input is eligible for processing | Security Standards governs trust policy; Integration applies mediation |

### 6.3 Boundary rules

| Rule | Requirement |
|------|-------------|
| **INT-BND-1** | Every external interaction declares integration boundary class before implementation |
| **INT-BND-2** | Experience Systems must not interact directly with external providers |
| **INT-BND-3** | External input must not bypass validation and normalization |
| **INT-BND-4** | Integration boundary crossing must be observable where architecturally material |
| **INT-BND-5** | Integration credentials remain scoped to declared integration boundary |
| **INT-BND-6** | Integration boundary failure must not become false domain success |
| **INT-BND-7** | External provider replacement must preserve declared boundary obligations |

### 6.4 Boundary prohibitions

- Provider response directly mutating authoritative domain state;
- Provider identifiers exposed as product meaning without domain context;
- Experience-facing flows depending on provider internals;
- External dependency availability treated as Rento capability success;
- Integration boundary used as a generic escape hatch for domain or API governance.

---

## 7. External Fact Lifecycle

### 7.1 External fact definition

An **external fact** is information originating outside Rento that may support diagnosis, decision support, reconciliation, enrichment, verification, notification, or future capability evaluation.

External facts are not Rento truth by default.

### 7.2 Lifecycle stages

```
Receipt → Boundary validation → Classification → Normalization → Eligibility decision → Routing → Promotion / Rejection / Cache / Disposal → Evidence
```

### 7.3 Lifecycle outcomes

| Outcome | Meaning | Authority boundary |
|---------|---------|--------------------|
| Promotion | Owning Rento domain accepts external fact into authoritative path | Owning domain authority |
| Rejection | Fact fails validation, eligibility, trust, or domain constraints | Integration boundary + owning domain where applicable |
| Cache | Fact retained temporarily for subordinate use | Integration state / persistence boundary |
| Reference mapping | External identifier linked to internal context | Non-authoritative unless owning domain defines meaning |
| Evidence only | Fact retained for audit, diagnosis, or traceability | Observability / Security / Database governance |
| Disposal | Fact not retained after classification or policy boundary | Owning lifecycle authority |

### 7.4 Fact governance rules

| Rule | Requirement |
|------|-------------|
| **INT-FCT-1** | External facts must declare source boundary and producing provider scope |
| **INT-FCT-2** | External facts must be classified before normalization or correlation |
| **INT-FCT-3** | Normalization translates representation, not product meaning |
| **INT-FCT-4** | Promotion requires owning Rento domain acceptance |
| **INT-FCT-5** | Cached external facts must be time-bounded and visibly subordinate |
| **INT-FCT-6** | Rejected facts may become evidence but not domain truth |
| **INT-FCT-7** | External reference mappings do not grant provider ownership over Rento records |
| **INT-FCT-8** | Fact lifecycle gaps in governed paths are architecture defects |

---

## 8. Outbound Invocation Governance

### 8.1 Purpose

Outbound invocation governs Rento-initiated interaction with external services.

Outbound invocation is not API contract publication, not provider SDK selection, not transport design, and not implementation retry policy. It is architecture-level governance for why, where, and under which constraints Rento may call an external system.

### 8.2 Invocation classes

| Invocation class | Purpose | Required architecture posture |
|------------------|---------|-------------------------------|
| Verification invocation | Request external evidence supporting trust or eligibility | Security and domain eligibility declared |
| Notification invocation | Send message or signal through external service | No product truth delegation; failure visible |
| Enrichment invocation | Request supplemental external information | Subordinate fact classification required |
| Dependency invocation | Consume external capability required by future feature | Future capability placement required |
| Operational invocation | Check integration health or provider status | Operational state only |

### 8.3 Invocation rules

| Rule | Requirement |
|------|-------------|
| **INT-OUT-1** | Each outbound invocation has declared purpose, owner, and trust boundary |
| **INT-OUT-2** | Outbound payloads must follow minimum necessary disclosure |
| **INT-OUT-3** | Secret material must not appear in invocation payloads unless governed by Security Standards and implementation authorization |
| **INT-OUT-4** | Invocation success does not imply Rento domain success |
| **INT-OUT-5** | Provider timeout or degradation must be classified distinctly from domain rejection |
| **INT-OUT-6** | Invocation side effects outside Rento must be traceable where architecturally material |

---

## 9. Inbound External Input Governance

### 9.1 Purpose

Inbound external input governs provider-originated information entering Rento.

Inbound paths include any future callback, webhook, batch import, provider event, manual import equivalent, or asynchronous external signal. This document does not define transport or payload form.

### 9.2 Inbound rules

| Rule | Requirement |
|------|-------------|
| **INT-IN-1** | Provider-originated input is untrusted until boundary validation succeeds |
| **INT-IN-2** | Inbound input must declare source, integration boundary, and intended routing scope |
| **INT-IN-3** | Inbound input must not reach Experience Systems directly |
| **INT-IN-4** | Inbound input must not mutate persistence directly |
| **INT-IN-5** | Inbound input must not create or change domain truth without owning domain acceptance |
| **INT-IN-6** | Invalid, duplicate, stale, or unexpected input must be contained and observable |
| **INT-IN-7** | Inbound trust failures route to Security Standards event governance where applicable |

### 9.3 Inbound outcome classes

| Outcome class | Meaning |
|---------------|---------|
| Accepted for routing | Boundary-valid input may be routed to an owning domain or process |
| Accepted as evidence | Input retained for traceability but not domain mutation |
| Rejected | Input fails validation, trust, classification, or eligibility |
| Deferred | Input cannot be evaluated without additional authoritative context |
| Duplicate | Input matches already processed provider fact or reference |
| Stale | Input no longer matches current Rento authoritative context |

---

## 10. Integration State Governance

### 10.1 Integration state classes

| State class | Definition | Truth posture |
|-------------|------------|---------------|
| Connection health | Provider reachability, availability, latency, degradation posture | Operational only |
| External reference mapping | Link between provider identifier and Rento context | Reference only |
| Cached external fact | Temporary retained external information | Non-authoritative unless promoted |
| Provider processing state | Known external lifecycle state for a request or exchange | External state only |
| Integration evidence | Record of invocation, validation, routing, failure, or provider response | Evidence only |
| Integration configuration identity | Declared integration endpoint or provider identity reference | Operational/configuration, not domain policy |

### 10.2 State rules

| Rule | Requirement |
|------|-------------|
| **INT-STA-1** | Integration state must be separable from domain state |
| **INT-STA-2** | Cached external state must declare freshness or staleness posture |
| **INT-STA-3** | External reference mapping must not imply domain ownership transfer |
| **INT-STA-4** | Provider processing state must not be presented as Rento completion |
| **INT-STA-5** | Integration configuration identity must not encode domain policy |
| **INT-STA-6** | Integration evidence must remain subordinate to truth and classified before access |

---

## 11. Failure Containment

### 11.1 Failure purpose

Integration failure containment ensures that external dependency failures do not corrupt Rento truth, bypass governance, leak secrets, or create misleading completion.

### 11.2 Failure classes

| Failure class | Containment obligation |
|---------------|------------------------|
| Provider unavailable | Visible as external dependency degradation, not domain rejection |
| Provider timeout | Does not become authoritative success |
| Invalid provider input | Rejected or quarantined before domain routing |
| Provider conflict | Routed to owning domain reconciliation; provider does not decide truth |
| Credential failure | Security event eligibility; no secret exposure |
| Trust validation failure | Security-governed boundary violation evidence |
| Partial external completion | Declared partial posture; no false Rento completion |
| Stale external fact | Subordinate stale state; no promotion without reconciliation |
| Integration observability gap | Architecture defect when material path cannot be reconstructed |

### 11.3 Failure rules

| Rule | Requirement |
|------|-------------|
| **INT-FAL-1** | Integration failure must be classifiable |
| **INT-FAL-2** | External dependency failure must not mutate domain truth |
| **INT-FAL-3** | Partial provider success must not be represented as complete Rento success |
| **INT-FAL-4** | Integration retry or compensation semantics are implementation concerns unless architecture requires declared pending posture |
| **INT-FAL-5** | Security-relevant integration failures must preserve Security Standards event governance |
| **INT-FAL-6** | Failure containment must be observable for governed integration paths |

---

## 12. Security And Trust Integration

### 12.1 Security consumption

Integration Architecture consumes Security Standards for external integration trust governance.

| Security concern | Owner | Integration role |
|------------------|-------|------------------|
| External integration trust zone | Security Standards + System Architecture | Apply boundary validation and normalization |
| Credential and secret taxonomy | Security Standards | Consume classes; do not redefine |
| Secret injection realization | Infrastructure Standards | Declare integration consumer scope; do not define mechanism |
| Integration trust event | Security Standards | Produce eligible event evidence without secret payload |
| Data classification | Security Standards | Preserve classification across integration lifecycle |
| Authentication / authorization mechanisms | Future peer authorities + Security Standards | Do not design mechanisms in this document |

### 12.2 Trust rules

| Rule | Requirement |
|------|-------------|
| **INT-SEC-1** | External providers are untrusted until validation succeeds |
| **INT-SEC-2** | Integration credentials are scoped to declared integration boundaries |
| **INT-SEC-3** | Integration secrets must not appear in repository artifacts, client artifacts, logs, evidence, or error payloads |
| **INT-SEC-4** | Integration trust failures remain security-relevant evidence, not domain truth |
| **INT-SEC-5** | Integration Architecture must not define authentication or authorization mechanisms |
| **INT-SEC-6** | New integration trust categories require Security Standards-aligned review |

---

## 13. Interaction With Peer Authorities

### 13.1 Backend Architecture

| Backend authority | Integration interaction |
|-------------------|-------------------------|
| Domain units own truth and transitions | Integration requests promotion through owning paths |
| Application Orchestration coordinates multi-step work | Integration participates as external dependency, not owner of orchestration |
| Backend emits signals at decision and transition loci | Integration adds external boundary and provider outcome signals |
| Domain services enforce invariants | Integration cannot bypass domain validation |

### 13.2 API Standards

| API authority | Integration interaction |
|---------------|-------------------------|
| Rento access contracts govern Experience ↔ Platform boundary | Integration provider interactions are external mediation, not Rento API contracts |
| Contract ownership follows truth ownership | Integration must not publish shadow contracts that bypass owning domain |
| Response honesty distinguishes success, failure, pending, partial | Integration outcomes must preserve honest contract posture where surfaced |

### 13.3 Database Architecture And Database Standards

| Persistence authority | Integration interaction |
|-----------------------|-------------------------|
| Authoritative persistence belongs to owning domains | Integration facts enter authoritative state only through owning paths |
| Operational and external cached state are not domain truth | Integration state remains classed and subordinate |
| Evidence is append-oriented where required | Integration evidence preserves audit and traceability posture |
| Persistence implementation belongs downstream | Integration Architecture does not define schema or migration mechanics |

### 13.4 Security Standards

| Security authority | Integration interaction |
|--------------------|-------------------------|
| External integration boundary is untrusted until validation | Integration validates and normalizes before routing |
| Credential and secret governance | Integration declares scope without defining secret mechanisms |
| Integration trust event classification | Integration produces eligible events without redefining taxonomy |
| Data classification | Integration preserves classification through fact lifecycle |

### 13.5 Infrastructure Standards

| Infrastructure authority | Integration interaction |
|--------------------------|-------------------------|
| Integration zone and scoped egress | Integration declares boundary and reachability needs |
| Secret injection surfaces | Integration declares secret consumer scope |
| Runtime configuration classes | Integration identifiers remain operational/configuration state |
| Failure visibility prerequisites | Integration declares material degradation and failure classes |

### 13.6 Observability Architecture

| Observability authority | Integration interaction |
|-------------------------|-------------------------|
| Dependency and integration trust signals | Integration emits or requires evidence at material boundaries |
| Failure visibility | Integration failure containment must be reconstructible |
| Traceability | Integration proof chains link invocation, provider response, validation, and promotion outcome |
| Classification preservation | Integration evidence remains classed before correlation |

### 13.7 Frontend Architecture

| Frontend authority | Integration interaction |
|--------------------|-------------------------|
| Frontend owns presentation and client state only | Frontend must not directly consume provider internals |
| Access Consumption invokes Rento contracts | External provider mediation remains behind Rento platform boundary |
| Presentation honesty | Integration pending, failure, and stale states surface only through governed Rento contracts |

---

## 14. Validation Requirements

### 14.1 Validation purpose

Integration validation verifies that a future architecture, standard, or implementation plan preserves external mediation boundaries without weakening upstream authority.

Validation does not authorize implementation.

### 14.2 Validation dimensions

| Dimension | Question |
|-----------|----------|
| Authority placement | Does integration remain within External Integration System and Phase 3 extension scope? |
| Scope honesty | Does it avoid security policy, domain truth, provider implementation, API schemas, and infrastructure topology ownership? |
| Product compliance | Does it preserve product truth, lifecycle separation, and Performance Integrity? |
| System compliance | Does it preserve Component 10 allowed and prohibited dependencies? |
| Security compliance | Are trust, credential, classification, and event rules consumed without redefinition? |
| Observability compliance | Are dependency degradation, trust evidence, and failure containment visible? |
| Persistence compliance | Are external reference and cached facts subordinate to persistence ownership? |
| API/backend compliance | Do domain mutations route through owning backend paths and Rento access contracts? |
| Technology neutrality | Are no providers, protocols, frameworks, products, or transport encodings mandated? |

### 14.3 Quality gates

| Gate | Trigger | Pass criteria |
|------|---------|---------------|
| **INT-GATE-1 — Boundary declaration** | New external interaction | Integration boundary class declared |
| **INT-GATE-2 — Trust validation** | External input or provider response | Validation and classification path declared |
| **INT-GATE-3 — Promotion ownership** | External fact may affect domain truth | Owning domain promotion path declared |
| **INT-GATE-4 — Secret scope** | Integration needs credential or secret | Security scope and infrastructure consumer declared without secret value |
| **INT-GATE-5 — Failure containment** | External dependency can fail | Failure class and containment outcome declared |
| **INT-GATE-6 — Observability proof** | Material integration path | Traceability and signal/evidence obligations declared |
| **INT-GATE-7 — Cache honesty** | External facts retained | Freshness, staleness, and non-authoritative posture declared |
| **INT-GATE-8 — Replacement safety** | Provider or integration mechanism changes | Boundary obligations remain stable |

### 14.4 Review requirement

Material integration changes require independent review before publication or downstream implementation consumption. Review must verify scope honesty, product preservation, security trust boundaries, observability obligations, persistence separation, failure containment, and implementation independence.

---

## 15. Extension Rules

### 15.1 Extension principle

Integration Architecture evolves by governed extension. New integration boundary classes, external fact classes, trust categories, promotion paths, or validation gates require explicit authority review.

### 15.2 Extension triggers

Extension review is required when:

- A new external provider category is introduced;
- A new external fact class may affect domain truth;
- A new inbound external input path is introduced;
- A new outbound invocation class is introduced;
- External provider state becomes user-visible, contract-visible, or governance-visible;
- Integration credentials change scope;
- External dependency failure can affect product-visible completion;
- Cached external state is retained beyond a subordinate operational purpose;
- A future capability depends on external service behavior.

### 15.3 Extension rules

| Rule | Requirement |
|------|-------------|
| **INT-EXT-1** | New integration obligations must name boundary owner, producing provider scope, and consuming Rento authority |
| **INT-EXT-2** | New external fact classes require classification before implementation |
| **INT-EXT-3** | New promotion paths require owning domain acceptance and persistence alignment |
| **INT-EXT-4** | New trust categories require Security Standards-aligned review |
| **INT-EXT-5** | New material integration paths require Observability Architecture gate evaluation |
| **INT-EXT-6** | Provider replacement must preserve INT-INV invariants |
| **INT-EXT-7** | Integration extensions must not bypass Phase 3 execution order |

---

## 16. Integration Invariants

These invariants are mandatory for downstream standards and implementation artifacts after publication.

| ID | Invariant |
|----|-----------|
| **INT-INV-1** | All external interaction passes through the External Integration System boundary |
| **INT-INV-2** | External systems never own Rento marketplace truth |
| **INT-INV-3** | External facts are validated, classified, and normalized before routing |
| **INT-INV-4** | Domain promotion occurs only through owning Rento domain paths |
| **INT-INV-5** | Integration failure does not become false domain success |
| **INT-INV-6** | Provider processing state is not Rento completion state |
| **INT-INV-7** | Cached external facts remain subordinate and time-bounded |
| **INT-INV-8** | External reference mappings do not transfer ownership |
| **INT-INV-9** | Integration credentials are scoped and never embedded in artifacts |
| **INT-INV-10** | Integration trust failures remain observable and security-classed where applicable |
| **INT-INV-11** | Experience Systems do not directly consume provider internals |
| **INT-INV-12** | Integration Architecture does not define security policy, authentication mechanisms, or authorization mechanisms |
| **INT-INV-13** | Integration Architecture does not define API schemas, provider payloads, or transport protocols |
| **INT-INV-14** | Integration state remains separable from domain state |
| **INT-INV-15** | Integration evidence is not domain truth |
| **INT-INV-16** | External dependency degradation is visible without redefining product meaning |
| **INT-INV-17** | Provider replacement preserves mediation, validation, failure, and observability obligations |
| **INT-INV-18** | Integration paths preserve Product Authority, Security Standards, Observability Architecture, and Repository Authority boundaries |

---

## 17. Downstream Consumers

The following future documents and artifacts may consume Integration Architecture after publication:

| Consumer | Consumption relationship |
|----------|--------------------------|
| Authentication Architecture | External identity provider or credential source boundaries, if authorized, without redefining integration mediation |
| Authorization Architecture | External entitlement or policy input boundaries, if authorized, without external provider authority over Rento decisions |
| Development Standards | Provider adapter discipline, external fact validation practices, and secret exclusion conventions |
| AI Collaboration Standards | Future external AI service mediation boundaries, if authorized by future capability evaluation |
| Implementation Governance | INT-INV and INT-GATE compliance verification |
| Backend implementation | External mediation adapters and domain promotion routing |
| Infrastructure implementation | Integration zone, egress, secret injection, and connectivity realization |
| Security review processes | External trust, credential scope, and integration event verification |
| Observability review processes | Dependency degradation, trust evidence, and integration failure containment verification |

Downstream consumers must cite this document by reference. They must not duplicate, narrow, or replace INT-INV invariants.

---

## 18. Prohibited Scope

This document and integration architecture must not specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Provider selection, SDK selection, protocol selection, gateway product, queue product, or integration platform | Implementation / Infrastructure implementation |
| Provider endpoint, provider payload schema, webhook format, retry algorithm, timeout values, or rate-limit configuration | Implementation / Development Standards when authorized |
| Rento API endpoint, payload schema, status code, or transport protocol | API_STANDARDS.md / implementation |
| Database schema, external reference table, cache store, index, collection, or migration script | DATABASE_ARCHITECTURE.md / DATABASE_STANDARDS.md / implementation |
| Security policy, credential taxonomy, secret store, authentication mechanism, or authorization mechanism | SECURITY_STANDARDS.md / Authentication Architecture / Authorization Architecture / implementation |
| Domain state transition, listing truth, moderation meaning, ownership rule, or role truth | Product Authority / Backend Architecture / Security Standards |
| Frontend presentation, provider UI embedding, UI analytics, or product copy | FRONTEND_ARCHITECTURE.md / Product Design Standard |
| Infrastructure topology, network appliance, DNS, TLS, secret manager, or runtime deployment configuration | INFRASTRUCTURE_STANDARDS.md / implementation |
| Observability tool, log format, metric name, trace attribute, dashboard, or alerting product | OBSERVABILITY_ARCHITECTURE.md / implementation |
| Engineering release execution, Git tag, GitHub Release, or release manifest | ENGINEERING_RELEASE_STRATEGY.md |

**Architecture only.** Implementation proceeds only under separate implementation authorization after applicable standards publication.

---

## 19. Terminology

| Term | Meaning |
|------|---------|
| **Integration Architecture** | Architecture-level governance for external mediation, external fact lifecycle, trust handoff, and failure containment |
| **External Integration System** | System component mediating all interaction with trusted external services through governed boundaries |
| **Integration boundary** | Governed architectural boundary through which Rento sends to or receives from an external trust zone |
| **External fact** | Information originating outside Rento; subordinate until accepted through an owning domain path |
| **Promotion** | Owning Rento domain acceptance of an external fact into authoritative state or governed workflow |
| **Normalization** | Translation of external representation into Rento-understood categories without redefining meaning |
| **External reference mapping** | Link between provider identifier and Rento context; reference only unless an owning authority gives meaning |
| **Cached external fact** | Time-bounded retained external information; not authoritative by default |
| **Integration trust event** | Security-relevant event involving external validation, provider behavior, credential lifecycle, or boundary failure |
| **Integration failure containment** | Architectural requirement that external failures remain classed, contained, and honest |

Terms defined in upstream authorities retain upstream meaning.

---

## 20. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Integration Architecture |
| **Authority class** | Authoritative integration engineering architecture |
| **Binding authority** | Active — per REPOSITORY_STANDARDS.md §7.6 |
| **Publication** | COMPLETE |
| **Phase** | Integration Architecture — Phase 3 extension authority (E2; execution order position 4 per PHASE_3_EVOLUTION_AUTHORIZATION.md §6) |
| **Engineering authoring** | COMPLETE |
| **Independent review** | APPROVED |
| **Publication review** | APPROVED FOR PUBLICATION |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — extension E2, execution order position 4) |
| **Implementation** | NOT AUTHORIZED |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · INFRASTRUCTURE_STANDARDS.md · OBSERVABILITY_ARCHITECTURE.md · REPOSITORY_STANDARDS.md |
| **Superior to** | External service standards · integration implementation conventions · Development Standards and Implementation Governance on integration matters |
| **Does not authorize** | Implementation; provider selection; technology selection; infrastructure implementation; engineering release execution; Phase 3 completion; Phase 4 |
| **Prerequisites** | Observability Architecture published — satisfied; Infrastructure Standards published — satisfied; Security Standards published — satisfied; System Architecture published — satisfied; Phase 3 Evolution AUTHORIZED — satisfied |

---

**Document path:** `docs/engineering/INTEGRATION_ARCHITECTURE.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/SECURITY_STANDARDS.md` · `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` · `docs/engineering/INFRASTRUCTURE_STANDARDS.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
