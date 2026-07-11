# Rento Backend Architecture

**Status:** PUBLISHED — Phase 3.6 Backend Architecture  
**Authority class:** Authoritative backend architecture  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

**Does not authorize implementation.**

---

## 1. Document Purpose

This document defines the **architectural responsibilities of the Rento backend**.

It explains how the backend is organized as an architectural subsystem — its position within the overall system, its internal structure, its responsibility boundaries, and its interaction model with adjacent subsystems.

This document answers:

- What is the backend's position within the Rento system?
- What architectural responsibilities does the backend own?
- How is the backend decomposed into components and layers?
- How are platform domains realized on the server side?
- Where do application services, domain services, and orchestration belong?
- How does the backend consume identity and authorization?
- How does the backend interact with frontend, API, storage, messaging, infrastructure, and observability?
- What state does the backend own?
- What invariants and prohibited coupling apply?

This document is **backend architecture**, not implementation. It does not specify endpoints, schemas, frameworks, languages, persistence mechanisms, or deployment.

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
                        → Backend architecture (this document)
                            → API Standards · Database Standards · Security Standards (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks structurally | Applies principles to backend organization |
| PLATFORM_ARCHITECTURE.md | Platform domains and layers | Realizes Application Coordination and Bounded Domains on the server |
| SYSTEM_ARCHITECTURE.md | System components and boundaries | Specializes Application Platform System as backend subsystem |
| REPOSITORY_STANDARDS.md | Repository governance | Consumed for placement — does not own repository organization |
| Product Design Standard | What product means | Preserves product meaning structurally; does not redefine |

### 2.3 What this document owns

- Backend position and responsibility boundaries within the system;
- Backend component model and internal architectural layers;
- Domain realization model aligned with platform bounded domains;
- Application service and domain service responsibility classification;
- Command ownership and query ownership per domain realization unit;
- Orchestration responsibilities, transaction boundaries, and persistence ownership boundaries;
- Backend contracts and module ownership boundaries;
- Identity consumption and authorization consumption posture;
- Backend interaction model with adjacent subsystems;
- Backend dependency direction and state ownership;
- Backend architectural invariants and prohibited coupling;
- Scalability, replaceability, extensibility, and maintainability responsibilities at backend scope;
- Downstream standards consumption model.

### 2.4 What this document does not own

- Product behavior, experience meaning, or user workflows;
- Platform domain definitions (PLATFORM_ARCHITECTURE.md);
- System component definitions (SYSTEM_ARCHITECTURE.md);
- Experience Systems and client architecture (Frontend Architecture);
- API contract specification (API Standards);
- Persistence implementation (Database Standards);
- Authentication and authorization implementation (Security Standards);
- Infrastructure, deployment, observability tooling, or development workflow;
- Constitutional governance or general architectural principles already defined upstream.

---

## 3. Backend Position Within the System

### 3.1 System role

The backend is the **server-side realization of the Application Platform System** defined in SYSTEM_ARCHITECTURE.md §6 Component 4.

It is the **authoritative marketplace truth engine** on the server — the subsystem responsible for:

- Owning and enforcing marketplace domain state;
- Coordinating multi-domain use cases;
- Publishing and consuming cross-domain contracts;
- Enforcing platform invariants and immutable domain rules;
- Routing all governed mutations through owning-domain paths.

The backend does **not** own client presentation, session presentation state, or user-visible layout. Those belong to Experience Systems (Frontend Architecture).

### 3.2 Architectural boundary

| Inside backend architectural scope | Outside backend architectural scope |
|-----------------------------------|-------------------------------------|
| Domain truth ownership and governed mutation | Product meaning and experience authority |
| Application coordination across domains | Client runtime and presentation |
| Domain invariant enforcement | End-user device state |
| Cross-domain contract realization | External third-party internal state |
| Consumption of identity and authorization context | Organizational process and delivery methodology |
| Persistence ownership declarations | Infrastructure provider control planes |

### 3.3 Marketplace posture (inherited)

The backend must preserve Rento as a **marketplace platform**. It must not structurally support transformation into property management, CRM, agency ERP, or organizational governance software. This posture is inherited from Product Design Standard and PLATFORM_ARCHITECTURE.md PLT-1.

### 3.4 Relationship to peer subsystems

| Subsystem | Relationship to backend |
|-----------|------------------------|
| **Experience Systems** (frontend) | Backend serves capabilities; frontend consumes through API boundary — never owns authoritative state |
| **Identity & Access System** | Backend consumes authenticated identity and role context — does not redefine role semantics |
| **Data Persistence System** | Backend declares persistence ownership per domain; durability realized through persistence subsystem |
| **Media Storage System** | Backend owns media references in domain truth; bytes owned by media subsystem |
| **Notification & Messaging System** | Backend emits domain events and triggers; delivery owned by messaging subsystem |
| **Background Processing System** | Backend dispatches deferred domain work; workers execute through domain contracts |
| **External Integration System** | Backend promotes external facts through domain paths — external systems are never authoritative |
| **Observability System** | Backend emits operational signals; observability does not define domain behavior |
| **Infrastructure Boundary** | Backend runs within infrastructure; infrastructure does not define domain policy |

---

## 4. Backend Responsibility Boundaries

### 4.1 Owned responsibilities

The backend **owns**:

1. **Marketplace domain truth** — all authoritative domain state within Application Platform System scope;
2. **Domain invariant enforcement** — immutable domain rules, PLT invariants, and SYS invariants at server scope;
3. **Governed state transitions** — publication, moderation, role grant effects, and other domain-significant changes;
4. **Application orchestration** — multi-domain use-case composition without absorbing foreign ownership;
5. **Cross-domain contract publication** — stable interfaces between domain realization units;
6. **Platform Foundation realization** — invariants registry, extension points, and architectural vocabulary within the backend;
7. **Persistence ownership mapping** — which domain owns which authoritative state classes;
8. **Honest operation outcomes** — Performance Integrity in synchronous and asynchronous server paths.

### 4.2 Consumed responsibilities

The backend **consumes** but does **not own**:

| Responsibility | Source |
|----------------|--------|
| Product meaning and lifecycle semantics | Product Design Standard |
| Platform domain boundaries and layer model | PLATFORM_ARCHITECTURE.md |
| System component boundaries and trust model | SYSTEM_ARCHITECTURE.md |
| Authenticated identity and role context | Identity & Access System |
| Authorization policy enforcement | Authorization Architecture (when published) |
| Durability mechanics | Data Persistence System |
| Media byte storage | Media Storage System |
| Message and notification delivery | Notification & Messaging System |
| Deferred execution infrastructure | Background Processing System |
| External service mediation | External Integration System |
| Operational telemetry collection | Observability System |

### 4.3 Prohibited responsibilities

The backend must **never**:

- Own client presentation state as authoritative truth;
- Redefine product meaning, lifecycle semantics, or marketplace posture;
- Execute governance beyond delegated authority scope;
- Accept external system state as authoritative without domain promotion;
- Permit domain truth mutation outside owning-domain paths;
- Embed CRM, property management, or agency operations logic;
- Define authentication mechanisms, token formats, or cryptographic policy;
- Define persistence schema, query language, or ORM structure;
- Define API transport, endpoint layout, or payload schemas;
- Become operational authority through observability or infrastructure configuration.

---

## 5. Backend Component Model

The backend is architecturally decomposed into **domain realization units**, **coordination units**, and **boundary adapters** — not into technical modules or deployable artifacts.

### 5.1 Component overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Access Boundary Adapter                                        │
│  (external request adaptation — no domain truth ownership)      │
├─────────────────────────────────────────────────────────────────┤
│  Application Orchestration                                      │
│  (multi-domain use-case composition — no domain truth ownership)│
├─────────────────────────────────────────────────────────────────┤
│  Domain Realization Units (bounded domains)                     │
│  Identity consumption · Inventory · Housing Journey ·           │
│  Tenancy Context · Professional Participation ·                   │
│  Inquiry & Communication · Trust & Integrity ·                  │
│  Governance Execution · Engagement & Continuity                   │
├─────────────────────────────────────────────────────────────────┤
│  Platform Foundation                                            │
│  (invariants registry · extension points · vocabulary)          │
├─────────────────────────────────────────────────────────────────┤
│  Integration Consumption Layer                                  │
│  (persistence · media · messaging · background · external ·     │
│   observability — consumed, not domain-owned)                   │
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Component classification

| Component class | Owns domain truth? | Purpose |
|-----------------|-------------------|---------|
| **Access Boundary Adapter** | No | Adapt external actor actions into internal use-case invocations |
| **Application Orchestration** | No | Compose multi-domain flows; declare transaction boundaries |
| **Domain Realization Unit** | Yes — per domain | Own marketplace truth within declared domain boundary |
| **Platform Foundation** | No | Shared invariants, extension registry, architectural vocabulary |
| **Integration Consumption Layer** | No | Consume cross-cutting platform services through declared boundaries |

### 5.3 Domain realization unit mapping

Each PLATFORM_ARCHITECTURE.md bounded domain maps to one **domain realization unit** within the backend. Units are logically separable regardless of runtime packaging.

| Platform domain | Backend realization unit | Authoritative state owned |
|-----------------|-------------------------|---------------------------|
| Identity & Role Context | Identity Context Consumption Unit | None — consumes Identity & Access System context |
| Marketplace Inventory | Inventory Realization Unit | Listing entities, ownership binding, publication state classes |
| Housing Journey | Housing Journey Realization Unit | Journey progression context, discovery coordination state |
| Tenancy Context | Tenancy Context Realization Unit | Tenancy relationship context (non-operational) |
| Professional Participation | Professional Participation Realization Unit | Professional profile, contact sourcing authority |
| Inquiry & Communication | Inquiry Realization Unit | Inquiry artifacts, communication continuity structures |
| Trust & Integrity | Trust Realization Unit | Trust, moderation, and verification meaning structures |
| Governance Execution | Governance Realization Unit | Governance execution records, delegated action outcomes |
| Engagement & Continuity | Continuity Realization Unit | Saved searches, saved properties, engagement artifacts |
| Experience Access | Access Boundary Adapter | None — adapts access; does not own truth |

Platform Foundation is realized as a **cross-cutting unit** within the backend, not as a domain truth owner.

### 5.4 Component dependency rule

```
Access Boundary Adapter → Application Orchestration → Domain Realization Units → Integration Consumption Layer
```

Domain realization units may consume peer units **only through published domain contracts**. Direct internal access across unit boundaries is prohibited.

### 5.5 Backend contracts and module ownership

**Module ownership:** Each domain realization unit owns exactly one backend module boundary — the architectural unit accountable for all commands, queries, invariants, and contracts within its declared domain scope. No shared module may own marketplace truth across domain boundaries.

**Backend contracts** are declared interfaces between units. They are **not** transport specifications — format and protocol belong to API Standards and downstream implementation standards.

| Contract class | Published by | Consumed by | Purpose |
|----------------|--------------|-------------|---------|
| **Command contract** | Owning domain unit | Application Orchestration, peer units (via orchestration) | Governed mutation intent with preconditions and outcome semantics |
| **Query contract** | Unit owning authoritative state | Application Orchestration, Access Adaptation (via orchestration) | Read surface with visibility scope and honesty constraints |
| **Event contract** | Unit after authoritative transition | Integration Boundary, peer units | Domain-significant state change notification after commit |

**Contract rules:**

1. Contracts are published by the unit that owns the underlying truth or transition;
2. Contract breaking changes require governance review per §19.2;
3. Undeclared cross-unit access — bypassing published contracts — is prohibited;
4. Platform Foundation maintains contract templates and vocabulary — not business command or query semantics.

---

## 6. Internal Architectural Layers

The backend organizes responsibilities into five internal layers. Layers are **architectural**, not implementation tiers.

### 6.1 Layer model

| Layer | Architectural role | Owns domain truth? |
|-------|-------------------|-------------------|
| **L1 — Access Adaptation** | Translate external actor actions into internal commands | No |
| **L2 — Application Orchestration** | Compose multi-domain use cases; sequence cross-domain operations | No |
| **L3 — Domain Logic** | Enforce domain invariants; execute governed transitions | Yes — per domain unit |
| **L4 — Persistence Boundary** | Declare and route authoritative state durability | No — ownership only |
| **L5 — Integration Boundary** | Consume cross-cutting platform services | No |

### 6.2 L1 — Access Adaptation

**Purpose:** Receive actor-initiated operations from the API boundary and adapt them for internal processing.

**Owns:**

- Request context binding to actor identity (via consumption);
- Input structural validation at architectural boundary (not domain validation);
- Outcome adaptation for external consumption (honest state only).

**Does not own:**

- Domain business rules;
- Authorization policy definition;
- Persistence operations;
- Domain state mutation logic.

**Rationale:** Separates transport-facing adaptation from domain truth ownership. API Standards will define transport; this layer defines architectural limits on what adaptation may do.

### 6.3 L2 — Application Orchestration

**Purpose:** Realize PLATFORM_ARCHITECTURE.md Application Coordination Layer on the server.

**Owns:**

- Multi-domain use-case flow composition;
- Cross-domain invocation sequencing;
- Transaction boundary declarations at architectural level;
- Coordination-level failure handling posture.

**Does not own:**

- Domain entities, state classes, or transitions;
- Listing ownership, moderation meaning, role grants, or contact sourcing;
- Persistence schema or storage decisions.

**Rationale:** Prevents orchestration from becoming an undeclared super-domain that silently owns all marketplace truth.

### 6.4 L3 — Domain Logic

**Purpose:** Realize PLATFORM_ARCHITECTURE.md Bounded Domain Layer on the server.

**Owns:**

- Domain entities and state classes within unit boundary;
- Domain invariants and governed transitions;
- Domain-significant validation;
- Domain contract publication for peer consumption.

**Does not own:**

- Foreign domain truth;
- Presentation specifics;
- Infrastructure realization;
- Transport or API format decisions.

**Rationale:** Domain ownership creates reviewable units aligned with product lifecycles and immutable rules.

### 6.5 L4 — Persistence Boundary

**Purpose:** Declare which domain unit owns durable state and route persistence operations accordingly.

**Owns:**

- Persistence ownership map — which authoritative state class belongs to which domain unit;
- Persistence access routing rules;
- Prohibition of cross-domain persistence mutation without contract.

**Does not own:**

- Storage technology, schema, indexes, or query language;
- Business rule definition;
- Backup, replication, or migration mechanics.

**Rationale:** Separates what must be durable and who owns it from how durability is implemented. Database Standards will define implementation.

### 6.6 L5 — Integration Boundary

**Purpose:** Consume cross-cutting platform services without absorbing their responsibilities.

**Owns:**

- Integration invocation routing;
- Event emission for downstream subsystems;
- External fact reception for domain promotion;
- Observability signal emission contracts.

**Does not own:**

- Message delivery, media bytes, background worker mechanics, or external service internals;
- Domain truth in any cross-cutting subsystem.

**Rationale:** Keeps cross-cutting concerns replaceable without domain erosion.

---

## 7. Domain Realization Model

### 7.1 Realization principles

1. **One platform domain → one realization unit** — domain boundaries in PLATFORM_ARCHITECTURE.md map directly to backend units;
2. **Lifecycle honesty** — units preserve product lifecycle separation; no unit merges Housing Journey with Tenancy Context or Participation with Governance Execution;
3. **Participation–execution separation** — Professional Participation and Inquiry units participate; Governance Execution unit executes only on delegated authority;
4. **Meaning before execution** — Trust Realization Unit defines meaning; Governance Realization Unit executes against that meaning without redefining it;
5. **Contract-only peer access** — units interact through declared contracts, never through shared mutable internals.

### 7.2 Domain realization unit responsibilities

#### Inventory Realization Unit

**Owns:** Listing entities, ownership binding, publication state classes (`pending`, `available`, and related), owner-scoped mutation permission model, public visibility eligibility.

**Consumes:** Identity context, Trust meaning, Governance moderation outcomes, Professional Participation as owner source.

**Prohibited:** Contact capture at listing creation; direct moderation status mutation by non-governance paths; cross-owner editing.

#### Professional Participation Realization Unit

**Owns:** Professional profile as participation anchor, contact sourcing authority, publication participation context, owner-scoped listing management participation.

**Consumes:** Identity context, Inventory ownership, Trust integrity constraints, Governance role grant outcomes.

**Prohibited:** CRM or business operations; moderation execution; contact entry at listing creation.

#### Governance Realization Unit

**Owns:** Listing moderation decision execution, role grant and revocation execution, verification program execution, residual policy enforcement within delegated scope, governance audit legibility.

**Consumes:** Trust meaning, Inventory state transition targets, Identity role mutation targets, Professional Participation context.

**Prohibited:** Redefining trust or moderation meaning; expanding beyond delegated authority; arbitrary ownership mutation.

#### Trust Realization Unit

**Owns:** Trust, verification, and moderation meaning; publication integrity constraints; visibility and honesty invariants.

**Consumes:** Product trust principles, Governance execution outcomes as facts.

**Prohibited:** Governance decision execution; product experience presentation.

#### Housing Journey Realization Unit

**Owns:** Discovery and evaluation flow structures, housing journey progression context, decision and readiness coordination boundaries.

**Consumes:** Publicly available inventory visibility, Trust signals, Engagement continuity, Identity context.

**Prohibited:** Inventory ownership; tenancy operations; governance execution.

#### Continuity Realization Unit

**Owns:** Saved properties, saved search continuity, re-engagement context structures, engagement state legibility.

**Consumes:** Identity context, inventory visibility references, Housing Journey context.

**Prohibited:** Inventory ownership; misrepresenting current inventory truth; false completion of continuity restoration.

#### Inquiry Realization Unit

**Owns:** Inquiry artifacts, contact initiation flow structure, inquiry stewardship participation boundaries.

**Consumes:** Professional Participation contact source, Identity context, Trust meaning.

**Prohibited:** CRM pipeline logic; contact capture at listing creation; outcome determination beyond marketplace scope.

#### Tenancy Context Realization Unit

**Owns:** Tenancy relationship context, rent lifecycle context, maintenance and repair context, dispute and escalation context, tenancy conclusion context — all contextual, not executional.

**Consumes:** Housing Journey transition context, Identity context, Trust meaning.

**Prohibited:** Rent collection, maintenance execution, dispute adjudication, property management operations.

#### Identity Context Consumption Unit

**Owns:** Nothing authoritative — consumes and propagates role context.

**Consumes:** Identity & Access System authenticated identity and role scope.

**Prohibited:** Domain business rules; role elevation outside Governance paths; embedding inventory or moderation logic.

#### Platform Foundation Unit

**Owns:** Invariants registry, extension point registry, architectural vocabulary, cross-unit contract templates.

**Prohibited:** Business logic, feature behavior, domain state ownership.

### 7.3 Lifecycle mapping preservation

| Product lifecycle | Primary realization unit(s) | Must not merge with |
|-------------------|----------------------------|---------------------|
| Housing Journey | Housing Journey | Tenancy Context, Governance Execution |
| Tenancy Lifecycle | Tenancy Context | Housing Journey, Inventory |
| Realtor Professional Lifecycle | Professional Participation, Inquiry | Governance Execution |
| Platform Governance Lifecycle | Governance Execution | Professional Participation, Trust meaning |
| Trust & Moderation meaning | Trust | Governance Execution |
| Listing ownership & visibility | Inventory | Housing Journey, Professional Participation |
| Cross-cutting continuity | Continuity | Inventory ownership |

---

## 8. Application Services

### 8.1 Definition

An **application service** is an architectural responsibility within the **Application Orchestration** layer that composes one or more domain operations into a complete use case.

Application services **coordinate** — they do not own domain truth.

### 8.2 Owned responsibilities

- Use-case entry and exit boundaries;
- Actor context verification before domain invocation (via Identity consumption);
- Sequencing of domain operations across units;
- Transaction boundary declaration for multi-domain operations;
- Cross-domain error containment and honest outcome assembly;
- Performance Integrity — no false completion across composed steps.

### 8.3 Prohibited responsibilities

- Domain invariant definition (belongs to domain services);
- Direct persistence access bypassing domain units;
- Authorization policy definition (belongs to Authorization Architecture);
- Foreign domain state mutation without owning-unit contract;
- Absorption of domain logic over time ("orchestration creep").

### 8.4 Application service categories

| Category | Scope | Example use-case patterns |
|----------|-------|--------------------------|
| **Read composition** | Aggregate public reads across domains | Public listing discovery with trust signals and profile contacts |
| **Participation composition** | Realtor participation flows | Listing creation with ownership binding and pending publication |
| **Governance composition** | Admin delegated execution | Moderation decision applying inventory state transition |
| **Continuity composition** | Cross-session persistence | Saved search restoration reconciled with current inventory |
| **Transition composition** | Lifecycle handoffs | Housing readiness context toward tenancy context |

### 8.5 Orchestration invariants

| ID | Invariant |
|----|-----------|
| **BCK-ORCH-1** | Application services never own authoritative domain state |
| **BCK-ORCH-2** | Multi-domain mutations declare transaction ownership explicitly |
| **BCK-ORCH-3** | Orchestration failure does not present partial success as complete success |
| **BCK-ORCH-4** | Orchestration does not accumulate domain rules — repeated logic signals misplaced domain ownership |

---

## 9. Domain Services

### 9.1 Definition

A **domain service** is an architectural responsibility within a **Domain Realization Unit** that enforces domain invariants and executes governed transitions for a single bounded domain.

Domain services **own domain truth** within their unit boundary.

### 9.2 Owned responsibilities

- Domain entity lifecycle within unit boundary;
- Domain state class definitions and legal transitions;
- Domain invariant enforcement aligned with PLT invariants and immutable domain rules;
- Owner-scoped and role-scoped operation validation at domain level;
- Domain contract implementation for peer consumption;
- Domain-significant validation before persistence routing.

### 9.3 Prohibited responsibilities

- Foreign domain state ownership or mutation;
- Transport or API adaptation;
- Persistence implementation details;
- Authorization mechanism definition;
- Presentation or client-specific logic;
- Governance execution meaning redefinition.

### 9.4 Domain service placement rules

1. **Single domain ownership** — a domain service belongs to exactly one realization unit;
2. **Invariant locality** — domain rules enforced where they are owned, not scattered across orchestration;
3. **No shared domain kernel** — shared logic across domains belongs in Platform Foundation as contracts, not as a business logic repository;
4. **Participation vs execution** — domain services in participation units do not execute governance; domain services in governance unit execute only on delegated authority.

### 9.5 Domain service invariants

| ID | Invariant |
|----|-----------|
| **BCK-DOM-1** | Every domain service has exactly one realization unit owner |
| **BCK-DOM-2** | Domain state transitions are defined and enforced within the owning unit |
| **BCK-DOM-3** | Domain services reject operations that violate immutable domain rules regardless of caller layer |
| **BCK-DOM-4** | Cross-unit needs are expressed as contract consumption — not as shared mutable state |

### 9.6 Command ownership

A **command** is an actor-initiated intent to perform a governed state transition within marketplace domain scope. Command ownership defines **who may authorize and execute** a mutation — not how it is transported or persisted.

| Rule | Requirement |
|------|-------------|
| **Single owner** | Every command category has exactly one owning domain realization unit |
| **Domain execution** | Only the owning unit's domain service may authorize and execute the command |
| **Orchestration invokes** | Application Orchestration may sequence commands — it never owns command semantics |
| **Access routes** | Access Adaptation receives external mutation requests and routes them through orchestration — never executes domain transitions |

**Command ownership map (architectural):**

| Command category | Owning unit |
|------------------|-------------|
| Listing create, update, delete (owner-scoped) | Inventory |
| Publication state transition (governed) | Inventory — triggered only via Governance contract |
| Professional profile mutation (owner-scoped) | Professional Participation |
| Inquiry artifact creation | Inquiry |
| Continuity artifact mutation (user-scoped) | Continuity |
| Housing journey progression mutation | Housing Journey |
| Tenancy context mutation | Tenancy Context |
| Trust meaning structure mutation | Trust |
| Moderation, role grant, verification execution | Governance |
| Role binding mutation | Identity & Access System — on Governance delegated outcome only |

Commands that span units are composed by Application Orchestration invoking multiple command contracts in declared sequence — not by merging ownership.

### 9.7 Query ownership

A **query** is a read operation that exposes domain state or legitimately derived views **without mutation**. Query ownership defines **who authorizes read semantics and visibility** — not storage access patterns.

| Rule | Requirement |
|------|-------------|
| **Source ownership** | Query contracts for authoritative state are published by the unit that owns that state |
| **Composite reads** | Application Orchestration aggregates query contracts — it does not redefine visibility rules |
| **Visibility enforcement** | Visibility eligibility is enforced at the domain query boundary of the owning unit |
| **Derived honesty** | Derived queries (contact resolution, composite views, enriched reads) must reconcile with authoritative state and must not present stale or ineligible state as current truth |
| **No persistence bypass** | Cross-domain reads consume query contracts — not foreign persistence internals |

**Query ownership map (architectural):**

| Query category | Owning unit |
|----------------|-------------|
| Public listing discovery and detail | Inventory — with Trust and Professional Participation consumption |
| Owner-scoped inventory reads | Inventory |
| Professional profile reads | Professional Participation |
| Inquiry reads (participant-scoped) | Inquiry |
| Continuity reads (user-scoped) | Continuity |
| Housing journey context reads | Housing Journey |
| Tenancy context reads | Tenancy Context |
| Trust signal reads | Trust |
| Governance audit and execution reads | Governance |
| Actor and role context reads | Identity & Access System — consumed, not re-owned |

Read-heavy paths remain architecturally separable from write-sensitive paths per §18.3. Query optimization must not weaken visibility rules or Performance Integrity.

---

## 10. Orchestration Responsibilities

### 10.1 Purpose

Orchestration bridges actor intent (from Access Adaptation) and domain truth (in Domain Logic). It is the **only** layer permitted to compose operations across multiple realization units in a single use case.

### 10.2 Orchestration owns

| Responsibility | Description |
|----------------|-------------|
| **Flow composition** | Ordered invocation of domain contracts for a use case |
| **Context propagation** | Actor identity and role context passed to each domain invocation |
| **Compensation posture** | Architectural declaration of how multi-step failure is handled |
| **Read aggregation** | Combining domain read contracts for composite views |
| **Event dispatch declaration** | Signaling downstream subsystems after authoritative state commit |

### 10.3 Orchestration does not own

- Domain state definitions;
- Moderation meaning or trust semantics;
- Persistence schema or query construction;
- Notification content or delivery;
- Authorization policy.

### 10.4 Standard orchestration flows

**Governed mutation flow:**

```
Actor context (consumed) → Orchestration → Owning domain service → Persistence boundary → [Event emission]
```

**Cross-domain mutation flow:**

```
Actor context → Orchestration → Domain A service → Domain B service (via contract) → Persistence boundary → [Event emission]
```

**Governance execution flow:**

```
Admin context → Orchestration → Governance domain service → Target domain service (governed transition) → Persistence boundary → Observability emission
```

### 10.5 Prohibited orchestration patterns

- Orchestration bypassing domain services to reach persistence directly;
- Orchestration embedding domain invariants that belong in domain services;
- Orchestration growing into a "god service" that owns all marketplace rules;
- Orchestration presenting success before authoritative state confirms completion.

### 10.6 Transaction boundaries

Transaction boundaries declare **architectural consistency scope** for multi-step operations. They do not specify isolation levels, locking, or persistence mechanics — those belong to Database Standards.

| Boundary type | Owner | Architectural rule |
|---------------|-------|-------------------|
| **Single-domain mutation** | Owning domain unit | One unit owns consistency scope for its command |
| **Multi-domain mutation** | Application Orchestration | Orchestration declares which units participate and the consistency expectation across steps |
| **Governance execution** | Application Orchestration + Governance unit | Governance command precedes target domain transition; partial application is prohibited from presenting as complete |
| **Read-only composition** | Application Orchestration | Reads do not participate in mutation transaction scope unless explicitly composed with a mutation use case |
| **Event emission** | Integration Boundary | Signals emit only after authoritative commit boundary — never before domain confirmation |

**Transaction invariants:**

| ID | Invariant |
|----|-----------|
| **BCK-TXN-1** | Multi-domain mutations declare transaction ownership explicitly before integration |
| **BCK-TXN-2** | Failure in a multi-step mutation does not present partial success as complete success |
| **BCK-TXN-3** | Compensation posture is declared at orchestration level — not ad hoc per implementation path |
| **BCK-TXN-4** | Background deferred mutations inherit the same ownership and transaction discipline as synchronous paths |

---

## 11. Persistence Responsibilities

### 11.1 Ownership model

Persistence responsibility in backend architecture is **ownership declaration only** — which domain unit owns which authoritative state class. Implementation belongs to Database Standards.

### 11.2 Persistence ownership map

| Authoritative state class | Owning realization unit |
|---------------------------|------------------------|
| Listing entities and ownership binding | Inventory |
| Publication state classes | Inventory |
| Professional profiles and contact source data | Professional Participation |
| Inquiry artifacts | Inquiry |
| Continuity artifacts (saved searches, saved properties) | Continuity |
| Housing journey progression context | Housing Journey |
| Tenancy relationship context | Tenancy Context |
| Trust and integrity meaning structures | Trust |
| Governance execution records | Governance |
| Identity and role binding records | Identity & Access System (outside backend domain ownership) |

### 11.3 Persistence boundary rules

1. **Domain-owned persistence** — only the owning realization unit may authorize writes to its state class;
2. **No shared tables as coupling** — persistence sharing across units requires explicit contract, not implicit schema access;
3. **Read across domains** — permitted through domain read contracts, not through persistence layer bypass;
4. **Derived state is not persisted as truth** — computed views, contact resolution, and presentation enrichment are derived;
5. **Audit is evidence** — governance audit records support review; they do not replace domain state.

### 11.4 Persistence prohibitions

- Persistence schema defining product behavior;
- Repository layer containing domain invariants (invariant belongs in domain service);
- Cross-unit write access without owning-domain authorization;
- Persistence of client presentation state as authoritative truth.

---

## 12. Identity Responsibilities

### 12.1 Architectural posture

The backend **consumes** identity — it does not architecturally own identity records. Identity record ownership belongs to Identity & Access System per SYSTEM_ARCHITECTURE.md.

Within the backend, the **Identity Context Consumption Unit** propagates authenticated actor context to all domain operations.

### 12.2 Backend identity responsibilities

| Responsibility | Owner |
|----------------|-------|
| Identity record storage | Identity & Access System |
| Authentication mechanism | Authentication Architecture (future) |
| Role scope model (`user` \| `realtor` \| `admin`) | Consumed from Identity & Access System — not redefined |
| Actor context binding to operations | Backend — all layers require context before domain mutation |
| Role context propagation to domain services | Application Orchestration and domain services |
| Role elevation | Governance Realization Unit only — via delegated paths |

### 12.3 Identity consumption rules

1. No domain operation proceeds without established actor context;
2. Role scope is consumed, not inferred from client claims alone;
3. Backend must not embed authentication mechanism in domain logic;
4. Session authority is system-scoped — client session state is not authoritative;
5. Identity consumption unit must not accumulate domain business rules.

### 12.4 Identity prohibitions

- Backend redefining role semantics;
- Domain services performing authentication;
- Client-side role interpretation accepted as system truth;
- Realtor-to-admin escalation paths outside Governance Execution.

---

## 13. Authorization Consumption

### 13.1 Architectural posture

The backend **consumes** authorization policy — it does not define authorization architecture. Authorization Architecture and Security Standards will define enforcement mechanisms.

Backend architecture declares **where** authorization must be enforced and **what** must be validated — not **how**.

### 13.2 Authorization enforcement points

| Enforcement point | What must be validated |
|-------------------|------------------------|
| **Access Adaptation** | Actor authentication presence for protected operations |
| **Application Orchestration** | Role scope sufficient for use-case invocation |
| **Domain Services** | Ownership scope, operation eligibility, mutation authority |
| **Governance Realization Unit** | Delegated authority scope for execution operations |
| **Persistence Boundary** | Write authorization matches owning domain |

### 13.3 Authorization consumption rules

1. **Defense in depth** — authorization validated at access boundary and domain boundary;
2. **Domain is final authority** — even if access boundary permits, domain service must reject unauthorized mutations;
3. **Ownership validation is domain responsibility** — Inventory unit validates owner scope; Governance unit validates delegated scope;
4. **No ambient authority** — no role gains capabilities without explicit architectural path;
5. **Forbidden mutations blocked at domain level** — direct `owner_id` change, direct moderation status change, cross-owner edit, and privilege escalation must be structurally impossible through domain invariants.

### 13.4 Immutable domain rule enforcement

The following rules must be enforced within domain services regardless of authorization mechanism:

| Rule | Enforcing unit |
|------|----------------|
| Realtors edit only own listings | Inventory |
| New realtor listings enter `pending` | Inventory |
| Public display only `available` (and product-authorized states) | Inventory + Access Adaptation |
| Contacts sourced from professional profiles | Professional Participation + Inventory (consumption) |
| Moderation transitions only through governance | Governance → Inventory |
| Role grants only through governance | Governance → Identity & Access System |
| Admin executes only delegated governance | Governance |

---

## 14. Interaction Model

### 14.1 Interaction with frontend (Experience Systems)

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Frontend initiates; backend responds with honest authoritative or derived state |
| **Truth ownership** | Backend owns authoritative state; frontend owns presentation state only |
| **Contract** | Interaction occurs through API boundary — defined by API Standards |
| **Prohibited** | Frontend-driven domain mutation; authoritative state cached as truth without reconciliation |
| **Performance Integrity** | Backend does not signal completion that frontend displays before authoritative commit |

Frontend Architecture will define client-side rules. Backend Architecture defines that frontend is never a source of marketplace truth.

### 14.2 Interaction with API layer

The API layer is the **transport boundary** between Experience Systems and backend Access Adaptation.

| Backend declares | API Standards will define |
|------------------|--------------------------|
| API layer must not own domain truth | Endpoint layout, methods, payload schemas |
| API layer must not bypass orchestration | Versioning, error format, transport protocol |
| API layer must propagate actor context | Authentication header conventions |
| API layer must return honest outcomes | Response envelope structure |

Backend architecture requires that no API surface permits domain mutation without passing through Application Orchestration into owning domain services.

### 14.3 Interaction with storage (Data Persistence System)

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Domain services route through Persistence Boundary; persistence subsystem provides durability |
| **Ownership** | Backend declares which unit owns which state class; persistence subsystem does not decide ownership |
| **Prohibited** | Persistence schema influencing domain behavior; cross-unit writes without domain authorization |
| **Replacement** | Storage technology replaceable without changing domain ownership map |

Database Standards will define schema, migration, and query implementation.

### 14.4 Interaction with messaging (Notification & Messaging System)

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Backend emits domain events after authoritative commit; messaging subsystem handles delivery |
| **Ownership** | Backend owns event semantics; messaging owns delivery state |
| **Prohibited** | Messaging subsystem owning inquiry meaning; notification delivery mutating domain state |
| **Performance Integrity** | User-visible notification of completion only after authoritative state confirms |

Messaging Architecture will define delivery implementation.

### 14.5 Interaction with background processing (Background Processing System)

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Backend dispatches deferred work; workers invoke domain contracts |
| **Ownership** | Backend owns what work means; background subsystem owns execution state |
| **Prohibited** | Background workers bypassing domain ownership for mutations; silent failure |
| **Idempotency** | Deferred domain mutations must be architecturally idempotent |

Background processing standards will define worker implementation.

### 14.6 Interaction with infrastructure

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Backend runs within infrastructure boundary; infrastructure provides runtime resources |
| **Ownership** | Infrastructure owns operational state; backend owns domain state |
| **Prohibited** | Infrastructure configuration encoding domain policy; environment variables as business rules |
| **Failure** | Infrastructure failure produces honest unavailability — not false success |

Infrastructure Standards will define deployment and environment realization.

### 14.7 Interaction with observability

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Backend emits signals; observability subsystem collects and presents |
| **Ownership** | Observability owns telemetry; backend owns domain truth |
| **Required signals** | State transitions, governance actions, ownership violations, operation failures, background job outcomes |
| **Prohibited** | Observability mutating domain state; observability becoming product authority |

Observability Architecture will define tooling and collection implementation.

---

## 15. Dependency Direction

### 15.1 Internal dependency law

```
L1 Access Adaptation → L2 Application Orchestration → L3 Domain Logic → L4 Persistence Boundary → L5 Integration Boundary
```

Reverse dependencies are prohibited unless explicitly declared as consumption of published contracts.

### 15.2 External dependency law

```
Backend (Application Platform realization) → Cross-Cutting Platform Services → Infrastructure Boundary
```

Experience Systems are **never** dependencies of the backend. Backend does not depend on frontend state.

### 15.3 Domain unit dependency matrix

Inherited from PLATFORM_ARCHITECTURE.md §9.2 — backend realization units follow the same dependency rules:

| Unit | May consume | Must not depend on |
|------|-------------|-------------------|
| Inventory | Identity context, Trust, Governance outcomes, Professional Participation | Access Adaptation internals, Housing Journey ranking |
| Housing Journey | Inventory visibility, Trust, Continuity, Identity context | Tenancy operations, Governance execution |
| Tenancy Context | Housing Journey context, Identity, Trust, Inquiry | Inventory ownership, PMS operations |
| Professional Participation | Identity, Inventory, Trust, Governance outcomes | Governance execution internals |
| Inquiry | Professional Participation, Identity, Trust, Continuity | CRM operations, Governance execution |
| Trust | Platform Foundation, Governance facts | Governance execution definitions |
| Governance | Trust, Inventory, Identity, Professional Participation | Access Adaptation |
| Continuity | Identity, Inventory visibility, Housing Journey | Inventory ownership |
| Identity Context Consumption | Identity & Access System, Governance role outcomes | Domain business logic |

### 15.4 Participation–execution dependency rule

```
Trust (meaning) → Professional Participation (participation) → Governance Execution (execution only)
```

Execution units must never appear upstream of meaning or participation units in dependency graphs.

---

## 16. State Ownership

### 16.1 State classification (backend scope)

| State class | Backend owner | Authoritative? |
|-------------|---------------|----------------|
| **Authoritative domain state** | Domain Realization Units | Yes |
| **Derived state** | Access Adaptation / Orchestration | No — must reconcile with authoritative |
| **Cached state** | Any layer — must reconcile | No |
| **Coordination transient state** | Application Orchestration | No — defined lifetime |
| **Integration operational state** | Integration Boundary | No — subsystem scoped |
| **Audit evidence** | Governance Unit + Observability consumption | Evidence only — not truth |

### 16.2 Source-of-truth rules

1. **Single authoritative source** — each marketplace truth class has exactly one owning realization unit;
2. **Derived never overrides authoritative** — contact resolution from profiles, public filters, and composite views are derived;
3. **Cache must reconcile** — cached inventory or profile data must not outlive authoritative state without invalidation;
4. **External facts require promotion** — external inputs become authoritative only through domain service path;
5. **Commit before signal** — events, notifications, and user-visible outcomes follow authoritative persistence.

### 16.3 Visibility state rules

| Visibility scope | State source | Backend enforcement point |
|------------------|--------------|--------------------------|
| Public | Publicly eligible inventory only | Inventory unit + Access Adaptation |
| Authenticated user | User-scoped continuity artifacts | Continuity unit |
| Realtor | Owner-scoped inventory and profile | Inventory + Professional Participation units |
| Administrator | Governance-authorized state | Governance unit |

---

## 17. Backend Architectural Invariants

These invariants apply backend-wide. Domain standards and implementation must not contradict them.

| ID | Invariant |
|----|-----------|
| **BCK-INV-1** | Backend realizes Application Platform System — authoritative marketplace truth owner on the server |
| **BCK-INV-2** | Backend preserves marketplace platform posture — not PMS, CRM, or agency operations |
| **BCK-INV-3** | All domain truth owned by exactly one realization unit |
| **BCK-INV-4** | All mutations route through owning domain service paths |
| **BCK-INV-5** | Application Orchestration never owns authoritative domain state |
| **BCK-INV-6** | Access Adaptation never bypasses Orchestration for domain mutations |
| **BCK-INV-7** | Identity context required before domain mutation |
| **BCK-INV-8** | Authorization consumed at access and domain boundaries — domain is final gate |
| **BCK-INV-9** | Public visibility exposes only publicly eligible state |
| **BCK-INV-10** | Contact sourcing originates from professional profiles — never listing creation |
| **BCK-INV-11** | Moderation state mutation occurs only through Governance Execution paths |
| **BCK-INV-12** | Role elevation occurs only through Governance Execution paths |
| **BCK-INV-13** | Realtors mutate only owner-scoped inventory |
| **BCK-INV-14** | Governance Execution honors delegated authority only |
| **BCK-INV-15** | Product lifecycles remain separable in backend structure |
| **BCK-INV-16** | Units interact only through declared contracts |
| **BCK-INV-17** | Performance Integrity preserved in all server paths |
| **BCK-INV-18** | External systems are never authoritative for marketplace truth |
| **BCK-INV-19** | Background processing does not bypass ownership or governance validation |
| **BCK-INV-20** | Observability emission does not mutate domain state |
| **BCK-INV-21** | Future capabilities require explicit backend placement before integration |

PLT-1 through PLT-17 and SYS-INV-1 through SYS-INV-14 remain authoritative. BCK-INV invariants specialize them for backend scope.

---

## 18. Scalability Responsibilities

### 18.1 Scalability definition (backend scope)

Backend scalability is architectural capacity to grow in domain scope, operation volume, and contributor count without structural collapse — not merely horizontal resource addition.

### 18.2 Scaling dimensions

| Dimension | Backend architectural response |
|-----------|-------------------------------|
| **Listing and user volume** | Domain unit isolation; read path separation from write-sensitive governance paths |
| **Domain scope growth** | New realization units or governed extension points — not monolith absorption |
| **Contributor count** | Bounded units with clear ownership enable parallel development |
| **Geographic expansion** | Foundation contracts stable; units extend without merger |
| **Governance complexity** | Governance unit isolation; audit legibility preserved |

### 18.3 Read-heavy vs write-sensitive separation

- **Read-heavy paths** (public discovery, search consumption) must be architecturally separable from **write-sensitive paths** (moderation, role grant, ownership mutation);
- Read optimization must not compromise visibility rules or Performance Integrity;
- Governance and mutation paths require strict audit legibility regardless of scale.

### 18.4 Stateless vs stateful (backend)

| Layer / Unit | Stateful? | Note |
|--------------|-----------|------|
| Access Adaptation | No — per-request | Horizontally scalable |
| Application Orchestration | Transient coordination only | No durable truth |
| Domain Realization Units | Authoritative state owners | Scale via persistence and unit isolation |
| Integration Boundary | Delegates to subsystems | Scale per subsystem |

---

## 19. Replaceability

### 19.1 Replaceable units

| Unit | Replaceable when | Must preserve |
|------|------------------|---------------|
| Access Adaptation | API transport changes | Orchestration entry contracts |
| Individual domain realization unit | Domain refactor | Domain contract surface and owned state classes |
| Application Orchestration | Use-case restructuring | Domain contracts and invariants |
| Integration Boundary adapters | Subsystem technology change | Domain event and persistence routing semantics |
| Entire backend runtime | Technology era change | Domain ownership map, PLT/BCK invariants, published contracts |

### 19.2 Non-replaceable without governance

| Element | Authority required |
|---------|-------------------|
| Domain ownership map | Backend Architecture amendment |
| Lifecycle boundary placement | Product authority + Backend Architecture review |
| PLT/BCK invariant changes | Constitutional or product authority review |
| Cross-domain contract breaking change | System Architecture + affected domain standards review |

---

## 20. Extensibility

### 20.1 Extension model

New backend capability extends through:

1. Documented architectural gap;
2. Impact assessment against product authority, PLT invariants, and BCK invariants;
3. Placement decision: new realization unit, new domain contract, or Platform Foundation extension point;
4. Explicit approval before structural integration.

### 20.2 Extension points

Platform Foundation Unit maintains the extension registry. Undeclared extension — adding behavior without placement decision — is prohibited.

### 20.3 Future capability discipline

Future capabilities (AI assistance, maps, live updates, chat, push synchronization, real-time collaboration) require independent architectural evaluation per Product Chapters 63 and 64 before receiving backend placement. They do not automatically create new realization units.

Current implementation evidence of AI listing assistance exists as a subordinate artifact — it does not constitute backend architectural authority and requires independent evaluation before formal placement.

### 20.4 Extension anti-patterns

- Feature-as-module without domain placement;
- Shared utility unit absorbing all new behavior;
- Extension through foreign unit internals;
- Product lifecycle expansion without lifecycle separation review;
- Orchestration growth absorbing domain rules from new features.

---

## 21. Maintainability Responsibilities

### 21.1 Maintainability outcomes

Backend architecture must enable:

- **Local reasoning** — domain invariants understandable within unit boundary;
- **Bounded change** — modification in one unit does not require whole-backend context;
- **Discoverable ownership** — every marketplace rule traceable to a realization unit;
- **Reviewable structure** — independent reviewer can verify compliance from documentation;
- **Teachable organization** — new contributors understand layers and units without oral tradition;
- **Architectural testability** — domain invariants and ownership rules verifiable within unit boundaries without whole-system context.

### 21.2 Maintainability rules

1. Equivalent domain problems receive equivalent structural treatment across units;
2. Domain invariants live in domain services — not duplicated in orchestration or access layers;
3. Cross-cutting concerns consumed through Integration Boundary — not embedded in domain logic;
4. Platform Foundation vocabulary used consistently across units;
5. Technical debt recognized and bounded — not normalized through silence.

### 21.3 Testability responsibilities

Backend architecture must remain **testable** at the architectural level — without mandating test frameworks, tools, or implementation patterns.

| Responsibility | Architectural enabler |
|----------------|----------------------|
| **Isolated domain verification** | Domain services enforce invariants within a single unit — verifiable through command and query contract surfaces |
| **Orchestration verification** | Application Orchestration composes through declared contracts — peer units substitutable at contract boundary |
| **Ownership traceability** | Every command and query maps to an owning unit — compliance reviewable from documentation alone |
| **Invariant explicitness** | BCK-INV, BCK-DOM, BCK-ORCH, and BCK-TXN invariants provide reviewable compliance criteria |
| **No hidden coupling** | Prohibited coupling patterns (§23) prevent untestable cross-layer bypass |

Testability is an architectural outcome — not a technology choice. Development Standards will define implementation-level testing conventions within this structure.

---

## 22. Architectural Boundaries

### 22.1 Boundary summary

| Boundary | Backend side | Other side |
|----------|-------------|------------|
| **Product ↔ Backend** | Realizes product constraints | Defines product meaning |
| **Backend ↔ Frontend** | Owns authoritative state | Owns presentation |
| **Backend ↔ API layer** | Defines architectural limits | Defines transport (API Standards) |
| **Backend ↔ Persistence** | Owns state class map | Owns durability implementation |
| **Backend ↔ Identity** | Consumes context | Owns identity records |
| **Backend ↔ Authorization** | Enforces at declared points | Defines policy (Security Standards) |
| **Domain unit ↔ Domain unit** | Published contracts only | No shared mutable internals |
| **Backend ↔ Infrastructure** | Domain policy independent | Runtime resources |
| **Backend ↔ Observability** | Emits signals | Collects and presents |

### 22.2 Boundary crossing rules

Every boundary crossing requires:

- Declared contract or consumption model;
- Actor context where applicable;
- Authorization validation where applicable;
- Honest failure reporting;
- Owning unit identified for any state mutation.

---

## 23. Prohibited Coupling

| Prohibited coupling | Reason |
|---------------------|--------|
| Access Adaptation → Domain Logic (bypassing Orchestration) | Breaks use-case composition and authorization sequencing |
| Access Adaptation → Persistence Boundary | Bypasses domain ownership and invariants |
| Orchestration → Persistence Boundary (bypassing Domain Logic) | Orchestration creep; invariant erosion |
| Domain unit → foreign unit internals | Violates contract-only access |
| Backend → Experience System dependency | Presentation-driven domain model |
| Persistence implementation → Domain Logic definition | Infrastructure-driven product change |
| Messaging → Inquiry meaning ownership | CRM transformation risk |
| Background worker → Domain Logic bypass | Ownership and governance violation |
| External integration → Authoritative state without promotion | External authority erosion |
| Observability → Domain state mutation | Operational tool becomes business logic |
| Shared mutable state without owning unit | Ownership ambiguity |
| Implementation artifact → Architectural authority | Implementation-driven architecture |

---

## 24. Downstream Standards

The following future documents will consume Backend Architecture. Their content is **not defined here**.

| Future standard | Consumption relationship |
|-----------------|-------------------------|
| **API Standards** | Access Adaptation boundary; Experience ↔ Backend contracts |
| **Database Standards** | Persistence Boundary; domain-to-storage ownership mapping |
| **Authentication Architecture** | Identity & Access System interaction with backend |
| **Authorization Architecture** | Authorization enforcement points declared in §13 |
| **Security Standards** | Trust boundary realization at backend scope |
| **Messaging Architecture** | Integration Boundary event emission |
| **Background Processing Standards** | Deferred domain work dispatch model |
| **Development Standards** | Implementation conventions within backend structure |
| **Implementation Governance** | Compliance verification against BCK invariants |

### Consumption model

Downstream standards must:

1. Declare Backend Architecture as consumed authority;
2. Operate within layers and units defined here;
3. Not redefine backend responsibilities;
4. Not contradict BCK-INV invariants;
5. Reference — not duplicate — backend structure definitions.

---

## 25. Prohibited Scope

This document must not define:

- REST endpoints, GraphQL, OpenAPI, or transport protocols;
- Request formats, response formats, or DTO structures;
- Database schema, SQL, ORM models, or migrations;
- Repository implementation patterns;
- FastAPI, Python, or any programming language;
- Dependency injection implementation;
- Caching implementation or products;
- Background worker implementation or products;
- Message broker implementation or products;
- Docker, Kubernetes, or container configuration;
- CI/CD pipelines or deployment topology;
- Monitoring products, logging frameworks, or alerting tools;
- Code style, naming conventions, or source-code folder layout;
- Implementation tasks, migration plans, or delivery methodology;
- Phase 4 Product Development Methodology.

---

## 26. Terminology

| Term | Meaning |
|------|---------|
| **Backend** | Server-side realization of Application Platform System |
| **Access Boundary Adapter** | Layer adapting external operations to internal use-case invocations |
| **Application Orchestration** | Multi-domain use-case composition without truth ownership |
| **Domain Realization Unit** | Bounded backend component owning marketplace truth for one platform domain |
| **Domain Service** | Single-domain invariant enforcement and transition execution |
| **Application Service** | Cross-domain use-case coordination within Orchestration layer |
| **Persistence Boundary** | Architectural declaration of durable state ownership per domain |
| **Integration Boundary** | Consumption layer for cross-cutting platform services |
| **Identity Context Consumption** | Propagation of authenticated actor and role scope without identity ownership |
| **Authorization Consumption** | Enforcement of externally defined policy at declared backend points |
| **Contract** | Declared interface between units — not a transport specification |
| **Derived state** | Non-authoritative state computed from authoritative domain state |
| **Authoritative domain state** | Marketplace truth owned by a realization unit |
| **Governed transition** | Domain state change executed through owning unit with invariant checks |
| **Performance Integrity** | Honest representation of operation progress and completion on the server |
| **Command** | Actor-initiated governed mutation intent — owned by exactly one domain realization unit |
| **Query** | Read operation exposing domain state or derived views — visibility owned by authoritative state unit |
| **Transaction boundary** | Architectural consistency scope for single- or multi-domain operations — not a persistence mechanism |
| **Backend contract** | Declared command, query, or event interface between units — not a transport specification |
| **Module ownership** | Accountability of a domain realization unit for all commands, queries, and invariants within its boundary |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 27. Document Status

| Item | Value |
|------|-------|
| **Authority class** | Authoritative backend architecture |
| **Phase** | 3.6 — Backend Architecture |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Supersedes** | `docs/ARCHITECTURE.md` §Backend Architecture as structural authority (remains subordinate implementation notes) |
| **Subordinate to** | PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · Product Design Standard |
| **Superior to** | API Standards · Database Standards · Security Standards · Development Standards (on backend structure matters) |
| **Does not authorize** | Implementation; technology selection; Phase 3 completion |
| **Prerequisites** | Constitution, Principles, Platform Architecture, System Architecture, Repository Standards published — satisfied |

---

**Document path:** `docs/engineering/BACKEND_ARCHITECTURE.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
