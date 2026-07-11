# Rento System Architecture

**Status:** PUBLISHED — Phase 3.4 System Architecture  
**Authority class:** Authoritative system architecture  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

**Does not authorize implementation.**

---

## 1. Document Purpose

This document defines the **authoritative system-level structure** of the Rento platform.

It transforms approved Platform Architecture into a coherent system architecture — describing how the platform exists as an organized system of components, boundaries, dependencies, and state ownership. It answers:

- What are the primary system components?
- What responsibility does each component own?
- How do components interact?
- What dependencies are permitted or prohibited?
- Where are system, trust, and state ownership boundaries?
- How do synchronous and asynchronous interactions differ architecturally?
- How does the system preserve product authority?
- How can the system evolve without architectural drift?
- How should future engineering standards consume System Architecture?

This document is **system architecture**, not implementation. It does not specify endpoints, schemas, frameworks, languages, infrastructure products, deployment topology, or coding conventions.

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
                    ├── System architecture (this document)
                    └── Repository standards (REPOSITORY_STANDARDS.md)
                        → Domain engineering standards (when published)
                            → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks structurally | Applies principles to system composition |
| PLATFORM_ARCHITECTURE.md | Platform domains and layers | Realizes domains as system components and boundaries |
| Product Design Standard | What product means | Preserves product meaning structurally; does not redefine |
| REPOSITORY_STANDARDS.md | Repository governance | Peer path — does not own repository organization |

### 2.3 What this document owns

- System context and system boundary;
- Primary logical system components and their responsibilities;
- System-level dependency direction and interaction categories;
- State ownership classification at system scope;
- Trust and security boundaries at system scope;
- External integration, storage, and operational boundaries;
- Scalability, failure containment, and observability responsibilities;
- System architecture invariants and prohibited coupling;
- Downstream standards consumption model.

### 2.4 What this document does not own

- Product behavior, experience meaning, or user workflows;
- Platform domain definitions (PLATFORM_ARCHITECTURE.md);
- Constitutional governance or general architectural principles;
- Repository organization and documentation lifecycle (REPOSITORY_STANDARDS.md);
- Backend, frontend, API, database, security implementation, or infrastructure standards;
- Technology selection, source-code layout, or development workflow.

---

## 3. System Context

### 3.1 System purpose

The Rento system exists to provide a **marketplace platform** that enables:

- **Renters (users)** — discover, evaluate, and pursue long-term housing opportunities;
- **Realtors** — participate professionally in the marketplace without the platform operating their business;
- **Administrators** — execute delegated marketplace governance only;
- **Operational actors** — engineering and support operators who maintain system integrity without redefining product authority.

The system serves approved product architecture. It does not redefine what Rento is.

### 3.2 External actors

| Actor | System relationship |
|-------|---------------------|
| **Renter (user)** | Consumer of public and authenticated marketplace capabilities |
| **Realtor** | Professional participant with owner-scoped inventory and profile participation |
| **Administrator** | Privileged actor executing delegated governance only |
| **Trusted external services** | Third-party capabilities invoked through governed integration boundaries |
| **Engineering operators** | Maintain and observe the system without becoming architectural authority |
| **Support operators** | Assist users within operational boundaries — not product authority |

### 3.3 External systems

External systems may include — when separately authorized — identity providers, communication delivery services, media processing services, payment-adjacent services (if ever authorized), and operational tooling. External systems are **not** part of the Rento system boundary. They interact only through declared integration boundaries.

### 3.4 Platform posture (inherited)

Rento remains a **marketplace platform**. The system must not structurally transform into property management, CRM, agency ERP, or organizational governance software. This posture is inherited from Product Design Standard and PLATFORM_ARCHITECTURE.md PLT-1.

---

## 4. System Boundary

### 4.1 Inside the system

The Rento system boundary includes all components responsible for:

- Marketplace truth ownership and governed mutation;
- Role-scoped capability access;
- Application coordination across platform domains;
- Authoritative persistence of domain state;
- Media storage and retrieval within marketplace scope;
- Notification and messaging orchestration;
- Background and asynchronous work owned by the platform;
- Observability of system behavior;
- Integration mediation with external systems.

### 4.2 Outside the system

The following are **outside** the Rento system boundary:

- Product meaning and experience authority (Product Design Standard);
- End-user devices and client runtime environments;
- External third-party services and their internal state;
- Organizational process, delivery methodology, and team rituals;
- Infrastructure provider control planes (governed at infrastructure standards layer).

### 4.3 Boundary rule

Nothing outside the system boundary may become a source of authoritative marketplace truth. External inputs are **facts or requests** — not ownership definitions.

---

## 5. Architectural Model

### 5.1 System as layered composition

The Rento system realizes PLATFORM_ARCHITECTURE.md layer model as a **composition of system components**:

```
┌─────────────────────────────────────────────────────────────┐
│  Experience Systems (Domain 10 — Experience Access)         │
│  Public · Professional · Governance                         │
├─────────────────────────────────────────────────────────────┤
│  Application Platform System                                │
│  Coordination Layer · Domain Realization (Domains 2–9)        │
│  Platform Foundation (contracts, invariants, extension)     │
├─────────────────────────────────────────────────────────────┤
│  Identity & Access System (Domain 1 — Identity & Role Context)│
├─────────────────────────────────────────────────────────────┤
│  Cross-Cutting Platform Services                            │
│  Persistence · Media · Messaging · Background               │
│  Integration · Observability                                │
└─────────────────────────────────────────────────────────────┘
```

Experience Systems do not own domain truth. Identity & Access System owns Domain 1 truth exclusively. Application Platform System owns Domains 2–9 truth through bounded domain realization units. Application Coordination within Application Platform System orchestrates use cases without owning semantic truth. Cross-cutting platform services provide shared capabilities without absorbing domain ownership.

### 5.2 Domain-to-system mapping principle

Each PLATFORM_ARCHITECTURE.md bounded domain maps to **exactly one** system component. Domains are not automatically equivalent to deployable units — deployment partitioning belongs to infrastructure standards. System components are defined by **responsibility**, not by current repository folders.

| Platform bounded domain | System component | Owns domain truth? |
|-----------------------|------------------|-------------------|
| **1 — Identity & Role Context** | Identity & Access System | Yes — identity context and role scope |
| **2 — Marketplace Inventory** | Application Platform System — Inventory unit | Yes |
| **3 — Housing Journey** | Application Platform System — Housing Journey unit | Yes |
| **4 — Tenancy Context** | Application Platform System — Tenancy Context unit | Yes |
| **5 — Professional Participation** | Application Platform System — Professional Participation unit | Yes |
| **6 — Inquiry & Communication** | Application Platform System — Inquiry unit | Yes |
| **7 — Trust & Integrity** | Application Platform System — Trust unit | Yes |
| **8 — Governance Execution** | Application Platform System — Governance unit | Yes |
| **9 — Engagement & Continuity** | Application Platform System — Continuity unit | Yes |
| **10 — Experience Access** | Experience Systems | No — access surfaces only |

Application Platform System hosts **eight** marketplace-truth-owning domain realization units (Domains 2–9), Application Coordination, and Platform Foundation. It does **not** realize Identity & Role Context (Domain 1) or Experience Access (Domain 10).

### 5.3 Separation preserved

| Platform concept | System realization |
|------------------|-------------------|
| Experience Access Layer | Experience Systems — Domain 10 realization |
| Application Coordination Layer | Application Platform System — coordination responsibility only |
| Bounded Domain Layer — Identity & Role Context | Identity & Access System — Domain 1 realization |
| Bounded Domain Layer — Domains 2–9 | Application Platform System — domain realization units |
| Platform Foundation Layer | Platform Foundation within Application Platform System |
| Cross-cutting concerns | Cross-Cutting Platform Services + architectural discipline |

---

## 6. System Components

Each component is technology-neutral. Current implementation technologies may exist as evidence but are not architectural mandates.

---

### Component 1 — Public Experience System

**Purpose:** Provide renter-facing access to publicly eligible and authenticated marketplace capabilities.

#### Owned responsibilities

- Public and authenticated consumer capability reachability;
- Presentation of publicly eligible marketplace state;
- Consumer session interaction boundary (not session authority);
- Mobile-first access posture at system scope.

#### Owned state

- **Session state** — transient client-side interaction context (non-authoritative);
- **Derived presentation state** — cached or computed views of authoritative domain state.

#### Allowed dependencies

- Application Platform System (via declared access contracts);
- Identity & Access System (authentication context consumption);
- Media Storage System (public media retrieval).

#### Prohibited dependencies

- Direct persistence access;
- Domain truth mutation outside Application Platform System;
- Governance execution paths;
- Authoritative business state ownership.

#### Upstream authorities consumed

- Housing Journey domain; Engagement & Continuity domain; Experience Access layer; Product Chapters 13–30.

#### Downstream standards expected

- Frontend Architecture; API access contracts; client security boundaries.

#### Replacement boundary

Replaceable as a whole without altering domain truth — provided access contracts and role boundaries are preserved.

---

### Component 2 — Professional Experience System

**Purpose:** Provide realtor-facing access to professional participation capabilities.

#### Owned responsibilities

- Realtor-scoped capability reachability;
- Owner-scoped listing management participation surfaces;
- Professional profile participation surfaces;
- Publication participation (not self-approval).

#### Owned state

- **Session state** — transient;
- **Derived presentation state** — non-authoritative views.

#### Allowed dependencies

- Application Platform System;
- Identity & Access System;
- Media Storage System.

#### Prohibited dependencies

- Governance execution internals;
- Direct moderation state mutation;
- CRM or business operations logic;
- Contact capture at listing creation.

#### Upstream authorities consumed

- Professional Participation domain; Marketplace Inventory domain; Product Chapters 46–50.

#### Downstream standards expected

- Frontend Architecture; API access contracts; realtor workspace standards.

#### Replacement boundary

Replaceable independently of Public Experience System — shared contracts must remain stable.

---

### Component 3 — Governance Experience System

**Purpose:** Provide administrator-facing access to delegated governance execution capabilities.

#### Owned responsibilities

- Admin-scoped capability reachability;
- Governance execution participation surfaces;
- Privileged action visibility boundaries.

#### Owned state

- **Session state** — transient;
- **Derived presentation state** — non-authoritative.

#### Allowed dependencies

- Application Platform System (governance execution contracts);
- Identity & Access System (elevated role context);
- Observability System (privileged action legibility).

#### Prohibited dependencies

- Domain meaning redefinition;
- Direct persistence mutation bypassing Application Platform System;
- Organizational governance, compliance program, or security operations ownership.

#### Upstream authorities consumed

- Governance Execution domain; Trust & Integrity domain; Product Chapters 51–55.

#### Downstream standards expected

- Frontend Architecture; admin access security standards; audit presentation standards.

#### Replacement boundary

Must remain strictly separated from Public and Professional Experience Systems at trust boundary level.

---

### Component 4 — Application Platform System

**Purpose:** Realize eight marketplace-truth-owning bounded domains (Domains 2–9) and coordinate multi-domain use cases.

This is the **authoritative system core for Domains 2–9** — it owns marketplace domain state and business invariants for inventory, journey, tenancy, participation, inquiry, trust, governance execution, and continuity. It does **not** own Identity & Role Context (Domain 1) — that domain is realized exclusively by Identity & Access System.

#### Owned responsibilities

- Platform domain realization for Domains 2–9 only (Marketplace Inventory through Engagement & Continuity);
- Application coordination across domains without absorbing foreign ownership or Identity & Role Context truth;
- Domain invariant enforcement within Domains 2–9;
- Governed state transitions within owning domain units;
- Cross-domain contract publication and consumption;
- Platform Foundation — invariants registry, extension points, architectural vocabulary.

Application Coordination owns use-case flow composition only. It does **not** own listing ownership, moderation meaning, role binding facts, contact sourcing, or lifecycle state definitions — per PLATFORM_ARCHITECTURE.md §5.3.

#### Owned state

- **Authoritative domain state (Domains 2–9)** — inventory, ownership binding, publication state classes, professional profiles, inquiry artifacts, continuity artifacts, trust meaning structures, governance execution records;
- **Transient process state** — in-flight coordination context with defined lifetime.

Role scope and identity binding facts are **not** owned here — they belong to Identity & Access System as Domain 1 realization.

#### Allowed dependencies

- Identity & Access System (actor context);
- Data Persistence System (durability);
- Media Storage System (media references);
- Notification & Messaging System (event handoff);
- Background Processing System (deferred work dispatch);
- External Integration System (external facts);
- Observability System (telemetry emission).

#### Prohibited dependencies

- Experience Systems (reverse dependency prohibited);
- Presentation-layer state as truth source;
- External systems as ownership authority;
- Infrastructure defining domain policy;
- Identity & Role Context authoritative state ownership (Domain 1 belongs to Identity & Access System).

#### Upstream authorities consumed

- All PLATFORM_ARCHITECTURE.md domains; PLT invariants; immutable domain rules.

#### Downstream standards expected

- Backend Architecture; API Standards; Database Standards; domain module standards.

#### Replacement boundary

Domain units may be refactored internally. Domain ownership boundaries and PLT invariants must survive replacement.

---

### Component 5 — Identity & Access System

**Purpose:** Realize Identity & Role Context bounded domain (Domain 1) — establish and propagate authenticated identity and role context for all system actions.

This component is the **sole authoritative owner** of Identity & Role Context domain truth. Application Platform System consumes role context from here; it does not own or duplicate identity binding or role scope state.

#### Owned responsibilities

- Identity context binding to platform actions;
- Role scope model: `user` | `realtor` | `admin`;
- Authentication boundary enforcement at system scope;
- Role context propagation to Application Platform System and Experience Systems;
- Prohibition of ambient authority elevation;
- Governed role binding transitions upon receiving delegated governance outcomes.

#### Owned state

- **Authoritative identity context state** — identity records and role binding facts (Domain 1 truth);
- **Session authority state** — authenticated session lifecycle (system-scoped, not client-scoped);
- **Credential state** — authentication material (owned here; format belongs to security standards).

#### Allowed dependencies

- Data Persistence System;
- Application Platform System (Governance Execution domain contract — role grant and revocation outcomes as delegated facts);
- Observability System.

#### Prohibited dependencies

- Domain business logic;
- Listing, moderation, or contact ownership;
- Experience System internals;
- Direct client-side authority interpretation as system truth.

#### Upstream authorities consumed

- Identity & Role Context domain; Product Chapters 20, 46, 48, 51.

#### Downstream standards expected

- Authentication Architecture; Authorization Architecture; Security Standards.

#### Replacement boundary

Authentication mechanism replaceable — role model and authority propagation contracts must remain stable.

---

### Component 6 — Data Persistence System

**Purpose:** Provide durable storage and retrieval for authoritative domain state.

#### Owned responsibilities

- Durability of authoritative domain state;
- Transaction boundary support at infrastructure level;
- Persistence isolation per domain ownership;
- Backup and recovery support at system scope (policy in infrastructure standards).

#### Owned state

- **Stored authoritative state** — physical persistence of domain records;
- **Operational state** — replication, backup, migration execution status.

#### Allowed dependencies

- Infrastructure boundary (compute, storage, network);
- Observability System.

#### Prohibited dependencies

- Business rule definition;
- Domain policy decisions;
- Experience System access;
- Public exposure of non-eligible state.

#### Upstream authorities consumed

- Application Platform System domain ownership map; Database architecture constraints (when published).

#### Downstream standards expected

- Database Architecture; Database Standards; migration governance.

#### Replacement boundary

Storage technology replaceable — domain ownership mapping and authoritative state classification must be preserved across replacement.

---

### Component 7 — Media Storage System

**Purpose:** Store, serve, and manage marketplace media assets within governed boundaries.

#### Owned responsibilities

- Media asset storage and retrieval;
- Media access authorization enforcement at storage boundary;
- Media lifecycle (upload, reference, deletion) at system scope;
- Separation of media bytes from domain truth (media references owned by Application Platform System).

#### Owned state

- **Media object state** — stored asset bytes and metadata;
- **Derived state** — transformed renditions if applicable.

#### Allowed dependencies

- Infrastructure boundary;
- Identity & Access System (access authorization context);
- Observability System.

#### Prohibited dependencies

- Domain business logic;
- Direct Experience System write access bypassing Application Platform System;
- Public unauthenticated access to non-public media.

#### Upstream authorities consumed

- Marketplace Inventory domain (media references); Professional Participation domain.

#### Downstream standards expected

- Storage Architecture; media upload standards; CDN and delivery standards.

#### Replacement boundary

Storage backend replaceable — access authorization boundary and reference model must remain stable.

---

### Component 8 — Notification & Messaging System

**Purpose:** Orchestrate notification delivery and messaging handoffs without owning inquiry meaning or domain truth.

#### Owned responsibilities

- Notification dispatch orchestration;
- Delivery channel mediation;
- Messaging transport for inquiry and communication flows;
- Re-engagement trigger execution (not campaign management).

#### Owned state

- **Delivery state** — dispatch status, delivery attempts;
- **Transient queue state** — in-flight messages;
- **Operational state** — channel health.

#### Allowed dependencies

- Application Platform System (event and trigger sources);
- External Integration System (delivery providers);
- Identity & Access System (recipient context);
- Observability System.

#### Prohibited dependencies

- Inquiry meaning ownership;
- CRM pipeline logic;
- Domain state mutation;
- Product copy or campaign strategy ownership.

#### Upstream authorities consumed

- Inquiry & Communication domain; Engagement & Continuity domain; Product Chapters 16, 21, 50.

#### Downstream standards expected

- Messaging Architecture; notification standards; communication delivery standards.

#### Replacement boundary

Delivery providers replaceable — orchestration contracts and domain event sources must remain stable.

---

### Component 9 — Background Processing System

**Purpose:** Execute deferred, scheduled, and asynchronous work without violating domain ownership or Performance Integrity.

#### Owned responsibilities

- Asynchronous task execution;
- Scheduled processing;
- Retry and dead-letter handling at architectural level;
- Work isolation from synchronous request path.

#### Owned state

- **Job state** — task lifecycle, execution status;
- **Transient process state** — worker execution context.

#### Allowed dependencies

- Application Platform System (domain operations via contracts);
- Data Persistence System;
- Notification & Messaging System;
- Media Storage System;
- Observability System.

#### Prohibited dependencies

- Experience System direct coupling;
- Bypass of domain ownership for mutations;
- Silent failure or false completion signaling.

#### Upstream authorities consumed

- Performance Integrity cross-cutting concern; Product Chapter 63.

#### Downstream standards expected

- Background processing standards; job scheduling standards; async interaction standards.

#### Replacement boundary

Processing engine replaceable — domain mutation must always route through the system component that realizes and owns the corresponding bounded domain.

---

### Component 10 — External Integration System

**Purpose:** Mediate all interaction with trusted external services through governed boundaries.

#### Owned responsibilities

- External service invocation mediation;
- External fact ingestion and normalization;
- Integration failure containment;
- Credential and secret boundary at system scope (mechanism in security standards).

#### Owned state

- **Integration state** — connection health, external reference mappings;
- **Cached external state** — time-bounded external facts (non-authoritative unless promoted through domain path).

#### Allowed dependencies

- Application Platform System;
- Observability System;
- Infrastructure boundary.

#### Prohibited dependencies

- Domain truth ownership;
- Direct Experience System exposure;
- External state as authoritative without domain promotion.

#### Upstream authorities consumed

- Future Product Evolution evaluation discipline; Product Chapter 64.

#### Downstream standards expected

- Integration Architecture; external service standards; secret management standards.

#### Replacement boundary

Individual integrations replaceable — mediation boundary and fact promotion rules must remain stable.

---

### Component 11 — Observability System

**Purpose:** Make system behavior, health, decisions, and failures legible for operation and review.

#### Owned responsibilities

- Health signal collection;
- Request and operation flow visibility;
- Failure and degradation detection;
- Privileged action logging at system scope;
- State transition legibility;
- Background processing visibility;
- External integration behavior monitoring.

#### Owned state

- **Telemetry state** — logs, metrics, traces (operational — not domain truth);
- **Audit and traceability state** — privileged action records, governance execution evidence.

#### Allowed dependencies

- All system components (read-only observation);
- Infrastructure boundary.

#### Prohibited dependencies

- Domain truth mutation;
- Product meaning definition;
- Becoming architectural authority (operational tools do not define product behavior).

#### Upstream authorities consumed

- Operational Clarity cross-cutting concern; Architecture Principles AP-18.

#### Downstream standards expected

- Observability Architecture; logging standards; monitoring standards; alerting standards.

#### Replacement boundary

Observability tooling replaceable — required observability responsibilities must remain satisfied across replacement.

---

### Component 12 — Infrastructure Boundary

**Purpose:** Define the conceptual boundary between Rento system components and runtime infrastructure realization.

#### Owned responsibilities

- Compute, network, and storage resource boundary;
- Environment separation concept (production, staging, development);
- Deployment unit boundary definition at architectural level;
- Infrastructure failure domain identification.

#### Owned state

- **Operational state** — deployment status, resource provisioning, environment configuration (not domain truth).

#### Allowed dependencies

- External infrastructure providers.

#### Prohibited dependencies

- Domain policy definition;
- Product behavior specification;
- Bypass of trust boundaries through infrastructure convenience.

#### Upstream authorities consumed

- Infrastructure standards (when published); constitutional stability principles.

#### Downstream standards expected

- Infrastructure Architecture; Deployment Architecture; environment governance standards.

#### Replacement boundary

Infrastructure products and topology replaceable — system component responsibilities and trust boundaries must not change with infrastructure replacement.

---

## 7. Responsibility Ownership Summary

| Responsibility | Owning component | Must not own |
|----------------|------------------|--------------|
| Identity & Role Context domain truth (Domain 1) | Identity & Access System | Experience Systems; Application Platform System |
| Marketplace domain truth (Domains 2–9) | Application Platform System — per domain unit | Experience Systems; Identity & Access System |
| Application coordination (orchestration only) | Application Platform System — coordination layer | Domain truth; Identity & Role Context state |
| Experience Access (Domain 10) | Experience Systems | Domain truth |
| Role context consumption | Application Platform System; Experience Systems | Role binding authoritative state |
| Public consumer access | Public Experience System | Domain truth |
| Realtor participation access | Professional Experience System | Governance execution |
| Governance execution access | Governance Experience System | Domain meaning |
| Durability | Data Persistence System | Business rules |
| Media bytes | Media Storage System | Listing ownership |
| Notification delivery | Notification & Messaging System | Inquiry meaning |
| Deferred work | Background Processing System | Synchronous user truth |
| External mediation | External Integration System | Domain authority |
| Operational legibility | Observability System | Product authority |
| Runtime resources | Infrastructure Boundary | Domain policy |

---

## 8. Component Interaction Model

### 8.1 Interaction categories

| Category | Architectural character | System use |
|----------|------------------------|------------|
| **Synchronous request-response** | Actor initiates action; system responds with outcome or error in same interaction context | Experience System → Application Platform System; read operations; governed mutations with immediate feedback |
| **Asynchronous work** | Actor or system initiates work; completion occurs in separate process context | Background Processing System tasks; notification dispatch; media processing |
| **Event propagation** | State change in owning component signals downstream consumers | Domain transition → notification trigger; moderation outcome → inventory state update |
| **Scheduled processing** | Time-based initiation of system work | Continuity reconciliation; cleanup; verification of stale state |
| **External integration calls** | System mediates outbound or inbound external communication | Communication delivery; external verification; future authorized capabilities |
| **File and media transfer** | Binary content crosses storage boundary | Upload via Application Platform System → Media Storage System; retrieval via authorized access path |
| **Administrative operations** | Privileged actor executes delegated governance | Governance Experience System → Application Platform System governance execution paths |

### 8.2 Synchronous vs asynchronous architectural rules

**Synchronous interactions** must:

- Preserve Performance Integrity — no false completion;
- Return honest state reflecting authoritative outcome;
- Propagate role context through Identity & Access System;
- Route mutations through owning domain paths.

**Asynchronous interactions** must:

- Identify the authoritative owner of any deferred mutation;
- Maintain idempotency expectation at architectural level;
- Preserve failure legibility — silent loss prohibited;
- Not present completion to users until authoritative state confirms it;
- Be isolatable — background failure must not corrupt unrelated domain truth.

### 8.3 Standard interaction flow

**Read flow:**

```
Actor → Experience System → Identity & Access System (context)
    → Application Platform System (domain read contract)
        → Data Persistence System (if required)
    → Experience System (derived presentation)
```

**Governed mutation flow:**

```
Actor → Experience System → Identity & Access System (context)
    → Application Platform System (coordination → owning domain)
        → Data Persistence System (durability)
        → [Event propagation → Background / Notification]
    → Experience System (honest outcome state)
```

**Governance execution flow:**

```
Administrator → Governance Experience System → Identity & Access System (admin context)
    → Application Platform System (Governance Execution domain)
        → Identity & Access System (role binding governed transition — when role grant/revocation)
        → Target domain unit (other governed transitions — e.g., Inventory moderation)
        → Data Persistence System
        → Observability System (audit legibility)
```

### 8.4 Prohibited interaction patterns

- Experience System → Data Persistence System direct access;
- Background Processing → domain state mutation without owning domain contract;
- External Integration → Experience System direct exposure;
- Observability → domain state mutation;
- Any component → reverse dependency on Experience Systems;
- Presentation-driven mutation outside Application Platform System coordination.

---

## 9. Dependency Direction

### 9.1 Global dependency law

```
Experience Systems → Application Platform System → Cross-Cutting Platform Services → Infrastructure Boundary
```

Identity & Access System is consumed by all actor-facing paths and by Application Platform System for role context. Identity & Access System may consume governance outcomes from Application Platform System for role binding transitions. Data Persistence System is consumed by Application Platform System, Identity & Access System, and authorized cross-cutting services. Experience Systems never appear as dependencies of Application Platform System or Identity & Access System.

### 9.2 Dependency matrix

| Component | May depend on | Must not depend on |
|-----------|---------------|-------------------|
| Public Experience System | Application Platform, Identity & Access, Media Storage | Data Persistence, Background Processing internals |
| Professional Experience System | Application Platform, Identity & Access, Media Storage | Governance Execution internals |
| Governance Experience System | Application Platform, Identity & Access, Observability | Domain meaning definitions |
| Application Platform System | Identity & Access, Data Persistence, Media Storage, Notification, Background, External Integration, Observability | Experience Systems |
| Identity & Access System | Data Persistence, Application Platform System (Governance Execution contract), Observability | Experience Systems, domain business logic |
| Data Persistence System | Infrastructure, Observability | Application logic, Experience Systems |
| Media Storage System | Infrastructure, Identity & Access, Observability | Domain business logic |
| Notification & Messaging System | Application Platform, External Integration, Identity & Access, Observability | Domain truth ownership |
| Background Processing System | Application Platform, Data Persistence, Notification, Media Storage, Observability | Experience Systems |
| External Integration System | Application Platform, Infrastructure, Observability | Experience Systems |
| Observability System | Infrastructure | Domain mutation authority |
| Infrastructure Boundary | External providers | All application components |

### 9.3 Prohibited coupling summary

- Circular component dependencies;
- Frontend ownership of authoritative business state;
- Persistence defining product behavior;
- Infrastructure defining domain policy;
- Operational tools becoming architectural authority;
- Cross-domain state mutation without owning-boundary authorization;
- Implementation details leaking into product authority.

---

## 10. State Ownership

### 10.1 State classification

| State class | Definition | Authoritative owner | Examples |
|-------------|------------|---------------------|----------|
| **Authoritative domain state (Domain 1)** | Identity context and role scope truth | Identity & Access System | Identity records, role binding facts (`user` \| `realtor` \| `admin`) |
| **Authoritative domain state (Domains 2–9)** | Marketplace truth that defines product-visible reality | Application Platform System — per domain unit | Listing ownership, publication state, professional profiles, inquiry artifacts, governance execution records |
| **Derived state** | Computed or aggregated from authoritative state | Component that produces it — never authoritative | Filter results, search views, dashboard summaries, presentation models |
| **Cached state** | Performance optimization copy of authoritative state | Cache holder — must reconcile | Client-side listing cache, API response cache |
| **Session state** | Transient actor interaction context | Identity & Access System (authority); Experience Systems (client copy) | Authentication session, UI navigation context |
| **Transient process state** | In-flight operation context | Executing component | Coordination transaction context, job execution state |
| **Operational state** | System health and deployment status | Respective cross-cutting component | Backup status, queue depth, deployment health |
| **Audit and traceability state** | Evidence of privileged actions and governance | Observability System + Governance Execution records | Moderation decision evidence, role grant execution evidence |

### 10.2 Source-of-truth rules

1. **Single authoritative source** — each platform bounded domain has exactly one system component owner; each state class within a domain has exactly one owning unit;
2. **Derived never overrides authoritative** — reconciliation always favors authoritative domain state;
3. **Cache invalidation is mandatory** — cached state must not outlive authoritative state without reconciliation;
4. **Session is not truth** — client session state must not define marketplace reality;
5. **External facts require promotion** — external system state becomes authoritative only through the owning system component's domain path;
6. **Audit is evidence, not truth** — audit records document actions; they do not define domain state;
7. **Domain 1 exclusive ownership** — Identity & Role Context authoritative state is owned exclusively by Identity & Access System; Application Platform System consumes role context but must not duplicate or become authoritative for Domain 1 truth.

### 10.3 State visibility boundaries

| Visibility scope | Permitted state source | Prohibited |
|------------------|------------------------|------------|
| Public | Publicly eligible inventory and marketplace state only | Non-available listings, private profile data, pending moderation state |
| Authenticated user | User-scoped continuity and engagement artifacts | Other users' private data, admin-only governance state |
| Realtor | Owner-scoped inventory and professional profile | Other realtors' inventory, governance internals |
| Administrator | Governance-authorized state for delegated execution | Unbounded platform omniscience beyond delegated scope |

---

## 11. Trust Boundaries

### 11.1 Boundary model

| Boundary | Trust level | Components involved |
|----------|-------------|---------------------|
| **Public boundary** | Untrusted actor | Public Experience System, public media access, public API surface |
| **Authenticated boundary** | Identity-verified actor | Identity & Access System, authenticated Experience System paths |
| **Privileged administrative boundary** | Delegated governance actor | Governance Experience System, Governance Execution domain |
| **Internal service boundary** | System component to system component | Application Platform System, cross-cutting services |
| **External integration boundary** | Third-party trust zone | External Integration System, external providers |
| **Storage boundary** | Data at rest and in transit protection | Data Persistence System, Media Storage System |
| **Operational boundary** | Engineering and support access | Observability System, Infrastructure Boundary |

### 11.2 Trust rules

1. Trust increases inward — each boundary crossing requires explicit validation;
2. Role context must be established before domain mutation;
3. Privileged boundary crossing requires admin role context and delegated authority scope;
4. External inputs are untrusted until validated and normalized;
5. Storage access requires authorization matching data classification;
6. Operational access does not grant domain mutation authority by default.

### 11.3 Security architecture scope boundary

This document defines **system-level security structure** only. The following belong to future standards:

- Cryptographic algorithms and key management implementation;
- Token formats and session mechanism;
- Password policy;
- Authentication and authorization middleware;
- Firewall rules and network segmentation products;
- Secret management products and configuration.

---

## 12. External Integrations

### 12.1 Integration philosophy

All external interaction passes through External Integration System. No component may invoke external services directly without mediation.

### 12.2 Permitted integration categories

| Category | Architectural role | Domain impact |
|----------|-------------------|---------------|
| Communication delivery | Notification & Messaging System transport | None — delivery only |
| Media processing | Media Storage System enhancement | Reference update through domain path |
| Identity verification (if authorized) | External fact ingestion | Promotion through Trust & Integrity / Governance domains |
| Future capabilities (AI, maps, etc.) | Independent evaluation required per Product Chapter 64 | Domain placement before integration |

### 12.3 Integration constraints

- External systems never hold authoritative marketplace truth;
- Integration failure must be contained — no domain corruption;
- External dependency degradation must be observable;
- Future capabilities require explicit architectural placement (PLT-17).

---

## 13. Background and Asynchronous Processing

### 13.1 Architectural role

Background Processing System isolates deferred work from synchronous user interaction paths — preserving Performance Integrity and failure containment.

### 13.2 Work categories

| Work type | Initiation | Ownership |
|-----------|------------|-----------|
| Domain-deferred mutation | Application Platform System dispatch | Owning domain via Application Platform System |
| Notification dispatch | Event propagation | Notification & Messaging System |
| Media processing | Upload completion event | Media Storage System with domain reference update |
| Scheduled reconciliation | Time-based trigger | Application Platform System domain contract |
| Cleanup and hygiene | Scheduled | Application Platform System or cross-cutting service |

### 13.3 Architectural constraints

- No user-visible completion without authoritative confirmation;
- Failed background work must be observable and recoverable at architectural level;
- Background workload must be isolatable from synchronous path;
- Background processing must not bypass governance or ownership validation.

---

## 14. Storage and Media Boundary

### 14.1 Separation principle

Domain truth (what media belongs to which listing, visibility rules) is owned by Application Platform System. Media bytes are owned by Media Storage System. References connect them — bytes do not define domain meaning.

### 14.2 Access model

| Access path | Authorization source |
|-------------|---------------------|
| Public listing media | Public eligibility rules from Marketplace Inventory domain |
| Owner-scoped media | Identity & Access System + ownership validation |
| Admin media access | Governance authorization scope |
| System internal | Service identity — not human actor |

### 14.3 Prohibited patterns

- Public media access without eligibility validation;
- Media metadata defining ownership or moderation state independently of domain;
- Experience System direct storage mutation.

---

## 15. Observability Responsibilities

### 15.1 Required observability surfaces

| Surface | What must be observable |
|---------|------------------------|
| Component health | Availability and degradation of all system components |
| Request and operation flow | Actor action paths through Experience → Platform → Persistence |
| Failures | Error classes, containment boundaries, recovery status |
| Dependency degradation | External integration and cross-service failure impact |
| Privileged actions | Admin governance execution, role changes, moderation decisions |
| State transitions | Domain-significant state changes (publication, moderation, role grant) |
| Background processing | Job lifecycle, failure, retry, completion |
| External integration behavior | Outbound call outcomes, latency degradation, failure patterns |

### 15.2 Observability constraints

- Observability must not mutate domain state;
- Audit records must support governance review without exposing unauthorized data across trust boundaries;
- Observability tooling selection belongs to Observability Architecture standards — not this document.

---

## 16. Scalability Model

### 16.1 Independent scaling boundaries

| Boundary | Scaling dimension | Isolation rationale |
|----------|-------------------|---------------------|
| Experience Systems | Client traffic, presentation load | Presentation scales independently of domain core |
| Application Platform System | Domain workload, business logic (Domains 2–9) | Domain units may scale independently where contracts allow |
| Data Persistence System | Data volume, read/write patterns | Persistence scales without Experience System changes |
| Media Storage System | Media volume, transfer bandwidth | Media workload isolated from transactional path |
| Background Processing System | Async job volume | Background load isolated from synchronous path |
| Notification & Messaging System | Dispatch volume | Delivery scales independently of domain logic |

### 16.2 Stateless vs stateful

| Component | Stateful? | Architectural note |
|-----------|-----------|-------------------|
| Experience Systems | Presentation state only (non-authoritative) | Horizontally scalable when session authority externalized |
| Application Platform System | Authoritative state owner (Domains 2–9) | Scale through domain isolation and persistence scaling |
| Identity & Access System | Authoritative state owner (Domain 1) + session authority | Session affinity or shared session store — implementation detail |
| Data Persistence System | Inherently stateful | Scale through replication, partitioning — infrastructure standards |
| Media Storage System | Inherently stateful | Scale through distributed storage |
| Background Processing System | Job state | Worker scaling with job queue — implementation detail |
| Observability System | Telemetry state | Scale independently; not on critical path |

### 16.3 Read-heavy vs write-sensitive paths

- **Read-heavy paths** (public listing discovery, search consumption) must be architecturally separable from write-sensitive governance and mutation paths;
- **Write-sensitive paths** (moderation, role grant, ownership mutation) require strict ownership validation and audit legibility;
- Read path optimization must not compromise visibility rules or Performance Integrity.

---

## 17. Failure Containment

### 17.1 Failure domains

| Failure domain | Containment boundary | Degradation expectation |
|----------------|---------------------|------------------------|
| Experience System failure | Client presentation unavailable | Domain truth unaffected |
| Application Platform System failure | Marketplace operations unavailable | No partial truth corruption |
| Identity & Access System failure | Authentication unavailable | No unauthorized access fallback |
| Data Persistence System failure | Durability operations fail | No silent data loss; honest failure |
| Media Storage System failure | Media unavailable | Listing truth preserved; media degraded |
| Notification failure | Delivery unavailable | Domain truth committed; delivery retried |
| Background Processing failure | Deferred work stalled | Synchronous truth preserved; recovery required |
| External Integration failure | External capability unavailable | Contained; domain truth not corrupted |
| Infrastructure failure | Component unavailable | Failover or honest unavailability |

### 17.2 Containment rules

1. Failure in one component must not corrupt authoritative state in another;
2. Partial success must not present as complete success (Performance Integrity);
3. External dependency failure must degrade gracefully without domain corruption;
4. Background failure must be recoverable without manual domain repair where possible;
5. Cascading failure propagation across trust boundaries requires architectural isolation.

---

## 18. Security Architecture Boundary

System-level security structure is defined by trust boundaries (§11) and dependency rules (§9). Security implementation belongs to future Authentication Architecture, Authorization Architecture, and Security Standards.

System-level security invariants inherited from platform and domain rules:

| ID | Invariant |
|----|-----------|
| **SYS-1** | No realtor privilege escalation to admin |
| **SYS-2** | No direct ownership mutation outside governed paths |
| **SYS-3** | No direct moderation status mutation outside Governance Execution paths |
| **SYS-4** | No cross-owner resource editing |
| **SYS-5** | Public boundary exposes only publicly eligible state |
| **SYS-6** | Administrative boundary requires explicit role context |
| **SYS-7** | External inputs validated before domain promotion |
| **SYS-8** | Operational access does not imply domain mutation authority |

Platform invariants PLT-1 through PLT-17 remain authoritative. SYS invariants operationalize them at system scope without replacing them.

---

## 19. Evolution and Extensibility

### 19.1 Governed system evolution

System architecture evolves through governed extension — consistent with Architecture Principles AP-8 and AP-25.

| Change class | Authority required |
|--------------|-------------------|
| Internal component refinement | System Architecture review + affected domain standards |
| New cross-component contract | System Architecture review |
| New system component | System Architecture amendment |
| Trust boundary change | System Architecture + Security Architecture review |
| New external integration category | System Architecture + Integration Architecture review |
| Lifecycle boundary change | Product authority + System Architecture review |

### 19.2 Extension points

New capabilities extend the system through:

1. Documented architectural gap;
2. Impact assessment against product authority and SYS/PLT invariants;
3. Placement decision: new component, new contract, or extension within existing component;
4. Explicit approval before integration.

Future capabilities (AI assistance, maps, live updates, chat, push synchronization, real-time collaboration) require independent architectural evaluation per Product Chapters 63 and 64 before receiving system placement.

### 19.3 Backward compatibility

Published system contracts must evolve with visible lineage. Breaking contract changes require explicit migration authority and traceability per REPOSITORY_STANDARDS.md §9.4.

### 19.4 Product authority preservation during evolution

System evolution must not:

- Redefine product meaning;
- Merge product lifecycles;
- Change marketplace posture;
- Introduce capabilities without product authority where product meaning is affected.

---

## 20. System Architecture Invariants

| ID | Invariant |
|----|-----------|
| **SYS-INV-1** | Rento system remains a marketplace platform structurally |
| **SYS-INV-2** | Each platform bounded domain has exactly one authoritative system owner per §5.2 domain-to-system mapping |
| **SYS-INV-3** | Identity & Role Context domain truth is owned exclusively by Identity & Access System — not by Application Platform System |
| **SYS-INV-4** | Application Platform System owns marketplace domain truth for Domains 2–9 only — not Identity & Role Context or Experience Access |
| **SYS-INV-5** | Application Coordination orchestrates use cases without owning domain truth or Identity & Role Context state |
| **SYS-INV-6** | Experience Systems never own authoritative business state |
| **SYS-INV-7** | All mutations route through the system component realizing the owning bounded domain |
| **SYS-INV-8** | Identity & Access System establishes role context before Application Platform System domain operations |
| **SYS-INV-9** | Public visibility exposes only publicly eligible state |
| **SYS-INV-10** | Governance execution honors delegated authority only |
| **SYS-INV-11** | Role binding transitions occur only via Governance Execution outcome applied to Identity & Access System |
| **SYS-INV-12** | External systems are never authoritative for marketplace truth |
| **SYS-INV-13** | Background processing does not bypass ownership or governance validation |
| **SYS-INV-14** | Performance Integrity preserved across synchronous and asynchronous paths |
| **SYS-INV-15** | Product lifecycles remain structurally separable at system level |
| **SYS-INV-16** | Components interact only through declared contracts |
| **SYS-INV-17** | Observability does not mutate domain state |
| **SYS-INV-18** | Future capabilities require explicit system placement before integration |

PLT-1 through PLT-17 from PLATFORM_ARCHITECTURE.md remain authoritative at platform scope. SYS-INV invariants apply them at system component scope.

---

## 21. Prohibited Coupling

| Prohibited coupling | Reason |
|---------------------|--------|
| Application Platform System → Identity & Role Context truth ownership | Duplicates Domain 1 ownership assigned to Identity & Access System |
| Application Coordination → domain semantic ownership | Orchestration creep; violates PLATFORM_ARCHITECTURE.md §5.3 |
| Experience System → Data Persistence System | Bypasses domain ownership and authorization |
| Application Platform System → Experience System (reverse dependency) | Presentation-driven domain model |
| Background Processing → Experience System direct write | Violates truth ownership |
| External Integration → Domain truth ownership | External authority erosion |
| Observability → Domain mutation | Operational tool becomes business logic |
| Persistence schema → Product behavior definition | Infrastructure-driven product change |
| Shared mutable state without owner | Ownership ambiguity |
| Notification System → Inquiry meaning ownership | CRM transformation risk |
| Media Storage → Listing ownership definition | Domain boundary violation |
| Infrastructure configuration → Domain policy | Accidental policy encoding |
| Implementation artifact → Product authority | Implementation-driven product change |

---

## 22. Downstream Standards

The following future documents will consume System Architecture. Their content is **not defined here**.

| Future standard | Consumption relationship |
|-----------------|-------------------------|
| **Backend Architecture** | Application Platform System structure; domain realization patterns |
| **Frontend Architecture** | Experience Systems; client-side boundary and state rules |
| **API Architecture / API Standards** | Inter-component contracts; Experience ↔ Platform access contracts |
| **Database Architecture / Database Standards** | Data Persistence System; domain-to-persistence ownership mapping |
| **Authentication Architecture** | Identity & Access System — authentication mechanism |
| **Authorization Architecture** | Identity & Access System — role and permission enforcement |
| **Messaging Architecture** | Notification & Messaging System |
| **Storage Architecture** | Media Storage System |
| **Infrastructure Architecture** | Infrastructure Boundary |
| **Security Architecture** | Trust boundaries; SYS security invariants |
| **Observability Architecture** | Observability System responsibilities |
| **Deployment Architecture** | Infrastructure Boundary; component deployment mapping |
| **Engineering Standards / Development Standards** | Cross-cutting implementation conventions |
| **Implementation Governance** | Compliance verification against SYS and PLT invariants |

### Consumption model

Downstream standards must:

1. Declare System Architecture as consumed authority;
2. Operate within component boundaries defined here;
3. Not redefine system component responsibilities;
4. Not contradict SYS-INV invariants;
5. Reference — not duplicate — system structure definitions.

System-structure standards require System Architecture publication as binding prerequisite per REPOSITORY_STANDARDS.md §17.1.

---

## 23. Prohibited Scope

This document must not define:

- Product behavior, user experience, or product workflows;
- New product roles or lifecycle semantics;
- Backend, frontend, or client frameworks;
- Programming languages;
- API endpoints, payload schemas, or transport protocols;
- Database tables, indexes, or ORM models;
- Infrastructure products, cloud providers, or deployment topology;
- Container configuration, CI/CD pipelines, or build systems;
- Coding conventions or source-code folder layout;
- Authentication, authorization, or cryptographic implementation;
- Monitoring tools, logging libraries, caching products, or messaging products;
- Implementation tasks, migration plans, or delivery methodology;
- Phase 4 Product Development Methodology.

---

## 24. Terminology

| Term | Meaning |
|------|---------|
| **System boundary** | Outer limit of Rento platform responsibility |
| **System component** | Logical unit of system responsibility — not necessarily a deployable unit |
| **Experience System** | Role-scoped access surface — Public, Professional, or Governance; realizes Experience Access domain (Domain 10) |
| **Application Platform System** | Authoritative core realizing Domains 2–9 and Application Coordination; does not own Domain 1 |
| **Identity & Access System** | Sole realization of Identity & Role Context domain (Domain 1) |
| **Cross-Cutting Platform Service** | Shared capability without domain truth ownership |
| **Authoritative domain state** | Truth owned by exactly one system component per bounded domain |
| **Derived state** | Non-authoritative computed or presented state |
| **Trust boundary** | Security perimeter requiring validation on crossing |
| **Contract** | Declared inter-component interface — not a transport specification |
| **Fact promotion** | Process by which external input becomes authoritative domain state |
| **Failure domain** | Scope of impact when a component fails |
| **Infrastructure Boundary** | Conceptual limit between system components and runtime infrastructure |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 25. Document Status

| Item | Status |
|------|--------|
| **Authority class** | Authoritative system architecture |
| **Phase** | 3.4 — System Architecture |
| **Supersedes** | `docs/ARCHITECTURE.md` as system-level structural authority (remains subordinate implementation notes) |
| **Subordinate to** | PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · Product Design Standard |
| **Peer to** | REPOSITORY_STANDARDS.md (repository governance — separate responsibility path) |
| **Superior to** | Domain engineering standards (on system structure matters) |
| **Does not authorize** | Implementation; technology selection; Phase 3 completion |
| **Prerequisites** | Constitution, Principles, and Platform Architecture published — satisfied |

---

**Document path:** `docs/engineering/SYSTEM_ARCHITECTURE.md`  
**Related:** `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
