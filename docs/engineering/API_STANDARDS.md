# Rento API Standards

**Status:** PUBLISHED — API Standards  
**Authority class:** Authoritative API governance  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

**Does not authorize implementation.**

---

## 1. API Purpose

### 1.1 Document purpose

This document defines **architectural governance for API contracts** in the Rento platform.

It establishes how capability access between Experience Systems and the Application Platform System is expressed, owned, evolved, and governed — without specifying transport protocols, endpoint layouts, payload schemas, or implementation technology.

This document answers:

- Why API contracts exist in the Rento architecture;
- What API governance owns versus what upstream architecture owns;
- How requests and responses relate to command and query ownership;
- How contracts preserve product truth, lifecycle separation, and marketplace posture;
- How API contracts evolve, version, and remain compatible;
- How error, idempotency, pagination, filtering, and sorting are governed at contract level;
- What downstream standards and implementation may consume from this authority.

This document is **API governance**, not API implementation.

**Repository is the single source of truth.**

### 1.2 API architectural role

API contracts exist to realize the **access boundary** between:

- **Experience Systems** (frontend realization of Experience Access — SYSTEM_ARCHITECTURE.md §6 Components 1–3);
- **Backend Access Adaptation** (L1 layer — BACKEND_ARCHITECTURE.md §6.2);
- **Frontend Access Consumption** (L1 layer — FRONTEND_ARCHITECTURE.md §6.2).

API contracts are the **sole governed surface** through which experience subsystems invoke backend capabilities without owning marketplace domain truth.

### 1.3 What API contracts accomplish

API governance ensures that capability access:

1. **Preserves product truth** — responses reflect authoritative domain state or honestly derived views;
2. **Honors ownership boundaries** — mutations route to owning domain paths; reads respect visibility eligibility;
3. **Separates participation from execution** — participation capabilities do not expose governance execution semantics;
4. **Maintains command/query discipline** — governed mutations and reads remain architecturally distinct;
5. **Supports replaceability** — transport and serialization may change without rewriting domain meaning;
6. **Enables reviewability** — contracts are verifiable against product, platform, and system invariants independently of code.

### 1.4 What API contracts are not

API contracts are **not**:

- Product experience definitions;
- Backend domain logic;
- Frontend presentation logic;
- Persistence schemas;
- Authentication or authorization mechanisms;
- Infrastructure or deployment configuration.

API governance defines **contract discipline**. Implementation standards define **contract realization**.

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
                        ├── Backend architecture (BACKEND_ARCHITECTURE.md)
                        ├── Frontend architecture (FRONTEND_ARCHITECTURE.md)
                        └── API standards (this document)
                            → Development Standards · Implementation Governance (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| RENTO PRODUCT DESIGN STANDARD v1.0 | Product meaning and experience authority | Consumes product constraints — does not redefine |
| PRODUCT_ARCHITECTURE.md | Product-to-engineering translation | Consumes lifecycle, capability, and visibility constraints |
| PROJECT_CONSTITUTION.md | Engineering program boundaries | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | Structural engineering discipline | Applies principles to contract governance |
| PLATFORM_ARCHITECTURE.md | Bounded domains, stable interfaces, cross-domain contracts | Specializes platform contracts for access boundary |
| SYSTEM_ARCHITECTURE.md | System components and Experience ↔ Platform interaction | Realizes inter-component access contracts at system scope |
| BACKEND_ARCHITECTURE.md | Server-side layers, command/query ownership, Access Adaptation | Defines backend-side contract limits — does not duplicate |
| FRONTEND_ARCHITECTURE.md | Client-side surfaces, Access Consumption, presentation boundaries | Defines frontend-side contract limits — does not duplicate |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for governance placement — does not redefine |

### 2.3 What this document owns

- API contract purpose and governance scope;
- API responsibility boundaries between experience, access, and domain layers;
- Request and response ownership classification;
- Command and query contract separation governance;
- Contract ownership, publication, and consumption rules;
- Versioning, compatibility, and evolution governance for API contracts;
- Error contract governance at architectural level;
- Idempotency governance for contract-exposed mutations;
- Pagination, filtering, and sorting governance for contract-exposed reads;
- API contract invariants;
- Dependency direction across the API boundary;
- Downstream consumption model;
- Prohibited API scope.

### 2.4 What this document does not own

- Product behavior, experience meaning, or UX decisions;
- Platform domain definitions and PLT invariants (PLATFORM_ARCHITECTURE.md);
- System component responsibilities (SYSTEM_ARCHITECTURE.md);
- Backend domain realization, orchestration, or persistence ownership (BACKEND_ARCHITECTURE.md);
- Frontend presentation, navigation, or client state (FRONTEND_ARCHITECTURE.md);
- Transport protocols, endpoint paths, HTTP methods, or serialization formats;
- Authentication, authorization, cryptographic, or session mechanisms (Security Standards);
- Database schemas, persistence, or migration (Database Standards);
- Infrastructure, deployment, observability tooling, or development workflow;
- OpenAPI, Swagger, or schema generation artifacts.

### 2.5 Amendment

This document may be amended only through explicit governance review per REPOSITORY_STANDARDS.md. Amendments must preserve product authority supremacy, constitutional compliance, and extension-not-replacement discipline.

---

## 3. Relationship to Upstream Authority

### 3.1 Product authority consumption

API governance **consumes** approved product architecture without redefinition:

| Product constraint | API governance treatment |
|--------------------|-------------------------|
| Mandatory lifecycle separation (PRODUCT_ARCHITECTURE.md §5.1) | Contract surfaces preserve lifecycle boundaries — no merged capability namespaces |
| Participation–execution separation (PRODUCT_ARCHITECTURE.md §6.3) | Participation contracts do not expose execution semantics; governance contracts are role-scoped |
| Visibility and honesty (PRODUCT_ARCHITECTURE.md §6.4) | Public contracts expose only publicly eligible state |
| Immutable domain rules (ENGINEERING_HANDOFF.md §5.5) | Contract invariants enforce ownership, moderation, and contact sourcing rules |
| Performance Integrity (Product Chapter 63) | Contracts do not permit false completion signaling |
| Future capability discipline (Product Chapter 64) | New contract families require explicit architectural placement before integration |

### 3.2 Platform architecture consumption

API governance realizes PLATFORM_ARCHITECTURE.md **Stable Interfaces Philosophy** (§12) and **Cross-Domain Interaction Model** (§10) at the experience access boundary:

| Platform concept | API governance realization |
|------------------|---------------------------|
| **Contract** | Governed access surface between experience and platform |
| **Command** | Governed mutation intent crossing access boundary |
| **Consumption** | Read contract exposing published domain output |
| **Fact** | Recorded outcome delivered through response semantics |
| **Context** | Non-owning handoff information in contract payloads |
| **Visibility eligibility** | Query contract scope rules |

Platform domain catalogs, dependency matrices, and PLT invariants are **not** restated here. Downstream reviewers consume PLATFORM_ARCHITECTURE.md for platform structure.

### 3.3 System architecture consumption

API governance specializes SYSTEM_ARCHITECTURE.md interaction categories (§8.1) for the Experience ↔ Application Platform boundary:

- Synchronous request-response interactions between Experience Systems and Application Platform System;
- Honest outcome propagation preserving Performance Integrity;
- Role context propagation through Identity & Access System consumption;
- Prohibition of Experience System direct persistence or domain bypass.

### 3.4 Backend and frontend architecture consumption

| Architecture document | API boundary role |
|----------------------|-------------------|
| BACKEND_ARCHITECTURE.md §6.2 L1 Access Adaptation | Backend-side contract adapter — receives external operations, routes to orchestration |
| FRONTEND_ARCHITECTURE.md §6.2 L1 Access Consumption | Frontend-side contract consumer — invokes contracts, adapts responses for presentation |
| BACKEND_ARCHITECTURE.md §5.5 Backend contracts | Internal command/query/event contracts — API contracts are the external projection of governed access, not a replacement for internal domain contracts |
| BACKEND_ARCHITECTURE.md §9.6–9.7 Command/query ownership | Command and query contract ownership inherits domain ownership map |

Backend and frontend architecture documents define **architectural limits** on what each side may do at the API boundary. This document defines **contract governance** that both sides must honor.

### 3.5 Non-duplication rule

This document does **not** restate:

- Full platform domain catalogs;
- Backend layer models or domain realization unit responsibilities;
- Frontend experience surface decomposition;
- System component inventories;
- Product capability tables (PC-*).

Upstream documents remain authoritative for structure. This document governs **how access contracts behave** at the boundary between experience and platform.

---

## 4. API Responsibility Boundaries

### 4.1 Boundary overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Experience Systems (Frontend — presentation, not truth)          │
├─────────────────────────────────────────────────────────────────┤
│  API Contract Boundary (THIS DOCUMENT — access governance)      │
│  Request adaptation · Response honesty · Contract discipline    │
├─────────────────────────────────────────────────────────────────┤
│  Backend Access Adaptation (transport adaptation — not truth)   │
├─────────────────────────────────────────────────────────────────┤
│  Application Orchestration (composition — not truth)            │
├─────────────────────────────────────────────────────────────────┤
│  Domain Realization Units (authoritative marketplace truth)     │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Owned responsibilities

API governance **owns**:

1. **Access contract taxonomy** — classification of contract types and their governance rules;
2. **Contract ownership assignment** — which authority publishes each contract family;
3. **Request semantics governance** — what requests may express without owning domain truth;
4. **Response semantics governance** — honest authoritative and derived outcome representation;
5. **Command/query separation discipline** at the access boundary;
6. **Cross-surface contract scope rules** — Public, Professional, and Governance contract eligibility;
7. **Versioning and compatibility governance** for published contracts;
8. **Error, idempotency, pagination, filtering, and sorting governance** at contract level;
9. **Contract invariant registry** (API-INV-*);
10. **Evolution and deprecation discipline** for contract families.

### 4.3 Consumed responsibilities

API governance **consumes** but does **not own**:

| Responsibility | Source |
|----------------|--------|
| Product meaning and lifecycle semantics | Product Design Standard |
| Product-derived visibility and capability constraints | PRODUCT_ARCHITECTURE.md |
| Platform domain boundaries and stable interface philosophy | PLATFORM_ARCHITECTURE.md |
| System component interaction model | SYSTEM_ARCHITECTURE.md |
| Command and query ownership maps | BACKEND_ARCHITECTURE.md §9.6–9.7 |
| Domain invariant enforcement | Domain realization units |
| Actor identity and role context | Identity & Access System |
| Authorization policy | Security Standards (when published) |
| Transport realization | Development Standards / implementation (subordinate) |

### 4.4 Prohibited responsibilities

API governance must **never**:

- Own authoritative marketplace domain state;
- Redefine product meaning, lifecycle semantics, or marketplace posture;
- Bypass Application Orchestration for governed mutations;
- Permit domain truth mutation outside owning-domain paths;
- Expose governance execution capabilities on public contract surfaces;
- Present non-public state as publicly eligible;
- Encode authentication, authorization, or persistence implementation;
- Become a parallel domain logic layer;
- Authorize implementation or technology selection.

---

## 5. Contract Ownership

### 5.1 Ownership principle

**Every API contract is published by the authority that owns the underlying truth, transition, or visibility scope.**

Consumers depend on contracts. Contracts depend on domain ownership maps. Ownership inversion is prohibited.

### 5.2 Ownership layers

| Layer | Contract authority | Accountable for |
|-------|-------------------|-----------------|
| **Product meaning** | Product Design Standard | What states mean — not API shape |
| **Translation** | PRODUCT_ARCHITECTURE.md | Capability and lifecycle constraints on contract scope |
| **Platform structure** | PLATFORM_ARCHITECTURE.md | Domain boundaries informing contract placement |
| **Access governance** | API Standards (this document) | Contract taxonomy, invariants, evolution discipline |
| **Command/query ownership** | BACKEND_ARCHITECTURE.md domain units | Which unit publishes mutation and read contracts |
| **Transport realization** | Implementation standards (future) | How contracts are encoded and delivered |

### 5.3 Contract publisher map

Command and query ownership maps in BACKEND_ARCHITECTURE.md §9.6–9.7 are authoritative for **which domain realization unit publishes** corresponding API contracts. API governance adds **access-boundary scope rules** without altering domain ownership.

| Contract family | Publishing authority | Consumption scope |
|-----------------|---------------------|-------------------|
| Public listing discovery and detail reads | Inventory unit | Public Experience Surface |
| Owner-scoped inventory reads and mutations | Inventory unit | Professional Experience Surface |
| Professional profile reads and mutations | Professional Participation unit | Professional Experience Surface |
| Inquiry reads and mutations | Inquiry unit | Public / Professional surfaces (participant-scoped) |
| Continuity reads and mutations | Continuity unit | Public Experience Surface (user-scoped) |
| Housing journey reads and mutations | Housing Journey unit | Public Experience Surface |
| Tenancy context reads and mutations | Tenancy Context unit | Authorized surfaces per product scope |
| Trust signal reads | Trust unit | All surfaces (read-only meaning consumption) |
| Governance execution mutations and audit reads | Governance unit | Governance Experience Surface only |
| Actor and role context reads | Identity & Access System | All protected surfaces (consumed — not re-owned by API layer) |

### 5.4 Contract publication rules

1. **Single publisher** — each contract has exactly one publishing authority;
2. **Published before consumption** — undeclared contracts are prohibited;
3. **Scope declaration required** — every contract declares role scope, lifecycle membership, and visibility eligibility;
4. **Breaking change governance** — contract breaking changes require explicit migration authority (§12);
5. **No shadow contracts** — implementation-only surfaces do not become authoritative contracts without governance publication.

### 5.5 Contract consumption rules

1. Experience surfaces consume only contracts within their trust boundary;
2. Frontend Access Consumption invokes; backend Access Adaptation receives — neither owns domain truth;
3. Composite read contracts aggregate query contracts — they do not redefine visibility rules;
4. Cross-domain composite contracts declare all source contracts explicitly;
5. Contract consumers depend on stable contract identity — not on publisher internals.

---

## 6. Request and Response Ownership

### 6.1 Request ownership model

| Request element | Owner | Governance rule |
|-----------------|-------|-----------------|
| **Actor intent** | Initiating experience surface | Requests express governed intent — not domain truth |
| **Actor context attachment** | Access Consumption / Access Adaptation | Identity context consumed from Identity & Access System |
| **Structural validity** | API contract publisher | Requests must conform to declared contract preconditions |
| **Domain authorization** | Owning domain service | Request acceptance requires domain-level eligibility |
| **Transport encoding** | Implementation (subordinate) | Not governed by this document |

**Request ownership principle:** Requests are **intent carriers**. They do not define marketplace truth. A valid request may still be rejected by domain invariants.

### 6.2 Response ownership model

| Response element | Owner | Governance rule |
|------------------|-------|-----------------|
| **Authoritative state payload** | Owning domain realization unit | Responses reflect domain truth classes honestly |
| **Derived view payload** | Contract publisher (derived) | Must declare derivation sources; must reconcile with authoritative state |
| **Outcome classification** | Contract publisher + domain outcome | Success, failure, pending, and partial states must be honest |
| **Visibility-filtered fields** | Owning unit query boundary | Ineligible fields must not appear in scoped responses |
| **Error semantics** | API governance (§13) | Failure classes are contract-governed — not ad hoc per implementation |
| **Transport encoding** | Implementation (subordinate) | Not governed by this document |

**Response ownership principle:** Responses are **truth presentations**. They must not misrepresent authoritative state, completion, or eligibility.

### 6.3 Request–response invariants

| ID | Invariant |
|----|-----------|
| **API-REQ-1** | Requests never carry authoritative domain truth as input authority |
| **API-REQ-2** | Protected requests require established actor context |
| **API-REQ-3** | Mutation requests route to exactly one primary command owner per command category |
| **API-RES-1** | Responses reflect authoritative outcome — not assumed client state |
| **API-RES-2** | Pending operations respond as pending — not as complete |
| **API-RES-3** | Derived response fields must not contradict authoritative fields in the same response |
| **API-RES-4** | Public contract responses expose only publicly eligible state |
| **API-RES-5** | Failure responses preserve sufficient semantics for honest client reconciliation |

### 6.4 Performance Integrity at request–response boundary

Per PRODUCT_ARCHITECTURE.md PROD-INV-14 and PLATFORM_ARCHITECTURE.md PLT-16:

- Responses must not signal completion before authoritative domain confirmation;
- Pending publication states must not be presented as publicly available;
- Optimistic client presentation is a frontend concern — API responses remain honest regardless;
- Timeout and degradation responses must not masquerade as successful completion.

---

## 7. Command and Query Separation

### 7.1 Separation principle

API contracts **separate governed mutations from reads** at the access boundary. Command and query contract families are architecturally distinct — they do not share ambiguous dual semantics.

This separation inherits BACKEND_ARCHITECTURE.md §9.6–9.7 and PLATFORM_ARCHITECTURE.md cross-domain interaction types (§10.1).

### 7.2 Command contracts

**Definition:** A command contract expresses **actor-initiated governed mutation intent** crossing the API boundary.

| Governance rule | Requirement |
|-----------------|-------------|
| **Single owner** | Each command category maps to exactly one domain realization unit |
| **Preconditions declared** | Authority, ownership, and eligibility preconditions are contract-visible |
| **Orchestration routing** | Commands enter through Access Adaptation → Orchestration → owning domain service |
| **No bypass** | Command contracts must not permit direct persistence or foreign-domain mutation |
| **Outcome honesty** | Command responses reflect authoritative transition outcome |
| **Participation–execution** | Governance command contracts are restricted to Governance Experience Surface |

### 7.3 Query contracts

**Definition:** A query contract expresses **read access** to domain state or legitimately derived views **without mutation**.

| Governance rule | Requirement |
|-----------------|-------------|
| **Source ownership** | Query contracts for authoritative state are published by the owning unit |
| **Visibility enforcement** | Eligibility rules enforced at query boundary — not deferred to client |
| **Derived honesty** | Composite and enriched queries declare authoritative sources |
| **No side effects** | Query contract invocation must not mutate domain state |
| **Read path separation** | Read-heavy public contracts architecturally separable from write-sensitive governance contracts |

### 7.4 Command–query prohibitions

| Prohibited pattern | Reason |
|--------------------|--------|
| **Ambiguous read-write contract** | Violates separation; hides mutation in read paths |
| **Query-triggered mutation** | Side-effect reads corrupt predictability |
| **Command response as authoritative read substitute** | Clients must use query contracts for durable state verification |
| **Public command surface for governance actions** | Violates trust boundary |
| **Cross-owner command without governance path** | Violates immutable domain rules |

### 7.5 Command–query mapping obligation

Every published API contract must declare:

| Declaration | Required content |
|-------------|------------------|
| **Contract class** | Command or Query |
| **Owning publisher** | Domain realization unit or Identity & Access System |
| **Lifecycle membership** | Product lifecycle context |
| **Role scope** | Public, user, realtor, admin eligibility |
| **Visibility scope** | Public eligibility, owner scope, or governance scope |
| **Authoritative state classes affected** | For commands — transitioned state; for queries — exposed state |

---

## 8. Contract Taxonomy

### 8.1 Contract classes

| Class | Purpose | Mutation | Primary surfaces |
|-------|---------|----------|------------------|
| **Public query** | Publicly eligible marketplace reads | No | Public Experience Surface |
| **Authenticated query** | Role-scoped reads | No | Surface matching role scope |
| **Participation command** | Owner-scoped or participant-scoped mutations | Yes | Public / Professional surfaces |
| **Governance command** | Delegated governance execution mutations | Yes | Governance Experience Surface only |
| **Composite query** | Multi-source read aggregation | No | Declaring surface scope |
| **Composite command** | Multi-domain orchestrated mutation | Yes | Declaring surface scope |
| **Context handoff** | Non-owning lifecycle transition context | No | Declared transition surfaces |

Event contracts at the platform level (BACKEND_ARCHITECTURE.md §5.5) are **internal domain notifications**. API governance covers **access-boundary contracts** only. Event delivery to clients — if ever authorized — requires separate architectural evaluation per Product Chapter 64.

### 8.2 Surface–contract eligibility matrix

| Experience surface | Permitted contract classes | Prohibited contract classes |
|--------------------|---------------------------|----------------------------|
| **Public Experience Surface** | Public query, authenticated query, participation command (consumer scope), composite query (public scope) | Governance command, governance audit reads, owner-scoped mutations |
| **Professional Experience Surface** | Authenticated query, participation command (realtor scope), composite query (professional scope) | Governance command, public-only anonymous reads where identity required |
| **Governance Experience Surface** | Governance command, governance query, composite command (governance scope) | Participation commands framed as governance, omniscient unscoped reads beyond delegated authority |

### 8.3 Composite contract governance

Composite contracts **compose** underlying command or query contracts. They do not create new ownership.

| Rule | Requirement |
|------|-------------|
| **Source declaration** | All composed contracts explicitly listed |
| **Visibility inheritance** | Most restrictive visibility rule applies |
| **Failure containment** | Partial composite failure follows §13 error governance |
| **No ownership merger** | Composition does not merge domain ownership maps |

---

## 9. API Contract Invariants

These invariants apply platform-wide at the API governance layer. Implementation must not contradict them.

| ID | Invariant |
|----|-----------|
| **API-INV-1** | API contracts are the sole governed access surface between Experience Systems and Application Platform System |
| **API-INV-2** | API contracts do not own authoritative marketplace domain state |
| **API-INV-3** | Every command contract maps to exactly one primary owning domain realization unit |
| **API-INV-4** | Every query contract for authoritative state is published by the unit that owns that state |
| **API-INV-5** | Command and query contract classes remain architecturally separable |
| **API-INV-6** | Governed mutations do not bypass Application Orchestration |
| **API-INV-7** | Public query contracts expose only publicly eligible state |
| **API-INV-8** | Governance command contracts are restricted to Governance Experience Surface scope |
| **API-INV-9** | Participation contracts do not expose governance execution semantics |
| **API-INV-10** | Contact-related contracts source contacts from professional profiles — never listing creation capture |
| **API-INV-11** | Listing mutation contracts enforce owner scope — cross-owner mutation prohibited |
| **API-INV-12** | Publication state transitions in command contracts follow governed moderation paths only |
| **API-INV-13** | Role elevation commands exist only through governance execution contract families |
| **API-INV-14** | Responses honor Performance Integrity — no false completion signaling |
| **API-INV-15** | Product lifecycles remain separable in contract namespace and scope |
| **API-INV-16** | Breaking contract changes require explicit migration authority |
| **API-INV-17** | Future capability contracts require explicit architectural placement before publication |

PLT-1 through PLT-17, PROD-INV-1 through PROD-INV-17, BCK-INV-1 through BCK-INV-21, and FRN-INV-1 through FRN-INV-20 remain authoritative upstream. API-INV invariants specialize them for access contract scope.

---

## 10. Dependency Direction

### 10.1 Global dependency law

```
Experience Systems → API Contract Boundary → Backend Access Adaptation
    → Application Orchestration → Domain Realization Units
```

Reverse dependencies are prohibited: domain units, orchestration, and backend layers must not depend on experience presentation or client-specific contract consumers.

### 10.2 Dependency matrix

| Dependent | May depend on | Must not depend on |
|-----------|---------------|-------------------|
| **Frontend Access Consumption** | Published API contracts, identity context | Backend domain internals, persistence, orchestration internals |
| **API contract definitions** | Domain ownership maps, product constraints, platform invariants | Frontend presentation modules, client frameworks |
| **Backend Access Adaptation** | API contract definitions, orchestration entry | Experience System internals |
| **Application Orchestration** | Domain command/query contracts | API transport encoding |
| **Domain realization units** | Internal domain contracts, identity context | Experience Systems, API consumer presentation logic |

### 10.3 Participation–execution dependency rule

```
Trust meaning (query contracts) → Participation contracts → Governance command contracts
```

Governance command contracts must never appear upstream of participation contracts in capability dependency graphs. Public query contracts must not depend on governance command availability.

### 10.4 Authority flow

Authority flows **downward** from product and platform constraints into contract invariants. Client convenience must not flow **upward** to weaken contract invariants.

---

## 11. Versioning Governance

### 11.1 Versioning purpose

API contract versioning exists to preserve **consumer stability** while permitting governed evolution. Versioning is an architectural governance concern — not a transport header implementation detail.

### 11.2 Version identity

| Concept | Governance rule |
|---------|-----------------|
| **Contract identity** | Stable logical identifier independent of implementation encoding |
| **Contract version** | Declared version lineage attached to contract identity |
| **Publisher version** | Domain unit version does not automatically version all contracts |
| **Implementation version** | Deployment versioning is subordinate — not contract authority |

Version identity is recorded in contract governance metadata and version history — not inferred from implementation artifacts alone.

### 11.3 Version classes

| Class | Stability expectation | Change authority |
|-------|----------------------|------------------|
| **Core marketplace contracts** | Highest stability — ownership, visibility, role scope | API governance + domain owner review |
| **Lifecycle contracts** | High stability — journey and tenancy boundaries | API governance + product constraint review |
| **Participation contracts** | High stability — realtor participation surfaces | API governance + domain owner review |
| **Governance contracts** | High stability — delegated execution inputs and outcomes | API governance + security review |
| **Extension contracts** | Explicitly versioned — future capability integration | Independent architectural evaluation required |

This classification inherits PLATFORM_ARCHITECTURE.md §12.3 interface classes.

### 11.4 Versioning rules

1. **Explicit versioning** — published contracts declare version lineage;
2. **Consumer-facing stability** — core marketplace contracts favor additive evolution;
3. **No silent breaking change** — breaking changes require migration authority (§11.5);
4. **Version honesty** — deprecated contract versions remain documented until succession is complete;
5. **Single definition** — contract identity defined once at publishing authority (AP-24).

### 11.5 Breaking change authority

| Change type | Authority required |
|-------------|-------------------|
| Additive query field (optional, non-semantic) | Contract publisher review |
| Additive command precondition (stricter) | Contract publisher + API governance review |
| Visibility scope restriction | API governance + product constraint review |
| Command ownership transfer | Backend Architecture amendment |
| Response semantic change affecting truth classification | API governance + domain owner review |
| Contract removal or identity rename | API governance + migration authority + continuity integration |

Breaking changes require visible lineage per REPOSITORY_STANDARDS.md §9.4.

---

## 12. Compatibility Rules

### 12.1 Compatibility purpose

Compatibility rules ensure that contract consumers — experience surfaces and downstream implementation — continue to interpret product truth correctly across contract versions.

### 12.2 Backward compatibility principles

| Principle | Rule |
|-----------|------|
| **Truth preservation** | New contract versions must not change product meaning |
| **Additive preference** | Prefer additive fields and optional capabilities over semantic replacement |
| **Consumer protection** | Stricter preconditions require explicit version bump and migration path |
| **Dual-behavior prohibition** | Undocumented parallel contract behavior is prohibited |
| **Deprecation honesty** | Deprecated contracts remain callable for declared migration window — not silently altered |

### 12.3 Forward compatibility principles

| Principle | Rule |
|-----------|------|
| **Unknown field tolerance** | Contract evolution should permit consumers to ignore unknown additive response elements — governance declares tolerance policy per contract class |
| **Strict mutation tolerance** | Command contracts do not accept ambiguous optional mutations without explicit version |
| **Extension registration** | New contract families register through Platform Foundation extension discipline |

### 12.4 Cross-surface compatibility

Contract changes must preserve trust-boundary separation:

- Public consumers must not receive governance-scoped response fields through version drift;
- Professional consumers must not gain governance capabilities through additive commands without explicit governance review;
- Governance consumers must not lose audit legibility through compatibility changes.

### 12.5 Compatibility verification

Contract compatibility must be verifiable by independent review against:

- API-INV invariants;
- Command/query ownership maps;
- Surface–contract eligibility matrix (§8.2);
- Product visibility and immutable domain rules.

---

## 13. Evolution Rules

### 13.1 Governed evolution model

API contract evolution follows Architecture Principles AP-8 and AP-25 — **extension over replacement** with explicit governance.

```
Identified need
    → Impact assessment (product, platform, system, surface)
    → Contract proposal at correct publisher
    → API governance review
    → Version and compatibility classification
    → Publication integration
    → Continuity synchronization (if milestone affected)
```

### 13.2 Permitted evolution paths

| Evolution path | When permitted |
|----------------|----------------|
| **Additive extension** | New optional fields, new query filters, new non-breaking commands within existing ownership |
| **New contract publication** | New capability with documented architectural gap and placement decision |
| **Contract deprecation** | Successor contract published; migration window declared |
| **Contract scope restriction** | Security or product constraint tightening — with migration authority |
| **Contract retirement** | Deprecation window complete; consumers verified migrated |

### 13.3 Prohibited evolution paths

| Prohibited path | Reason |
|-----------------|--------|
| **Silent semantic rewrite** | Violates lineage and consumer trust |
| **Ownership drift through versioning** | Command/query ownership map is authoritative |
| **Client-driven contract mutation** | Implementation convenience must not redefine contracts |
| **Lifecycle merger via contract consolidation** | Violates PROD-INV-2 |
| **Governance scope expansion via additive command** | Violates delegated authority model |
| **Retroactive product meaning change** | Product authority is supreme |

### 13.4 Future capability contract discipline

Future capabilities — AI assistance, maps, live updates, chat, push synchronization, real-time collaboration — require independent architectural evaluation per Product Chapters 63 and 64 before API contract publication. Existing implementation artifacts do not constitute contract authority.

### 13.5 Deprecation governance

Deprecated contracts:

1. Remain documented with successor mapping;
2. Declare migration window and consumer obligations;
3. Do not receive semantic enhancements — maintenance only;
4. Retire only after governance verification of consumer migration;
5. Leave visible lineage in version history.

---

## 14. Error Contract Governance

### 14.1 Error contract purpose

Error contracts govern **how failure is communicated** across the API boundary — preserving honest outcomes, failure containment, and client reconciliation capability.

Error contract governance is architectural. Error encoding formats belong to implementation standards.

### 14.2 Failure class taxonomy

| Failure class | Meaning | Client reconciliation expectation |
|-------------|---------|--------------------------------|
| **Validation failure** | Request structurally or precondition-invalid | Correct request; no truth mutation occurred |
| **Authorization failure** | Actor context insufficient for contract scope | No truth mutation occurred |
| **Ownership failure** | Actor not owner or not within delegated scope | No truth mutation occurred |
| **Conflict failure** | Request valid but conflicts with current authoritative state | Reconcile with authoritative query |
| **Pending failure** | Operation not yet complete — not a terminal error | Treat as pending — not success |
| **Domain rejection** | Domain invariant rejected mutation | No partial truth mutation presented as success |
| **Containment failure** | Upstream subsystem unavailable | Honest degradation — no false completion |
| **Governance scope failure** | Delegated authority insufficient | No governance mutation occurred |

### 14.3 Error contract rules

1. **Honest classification** — errors must not masquerade as success;
2. **No false completion** — pending and partial states use distinct failure/pending classes;
3. **Mutation clarity** — validation and authorization failures imply no domain mutation;
4. **Partial failure honesty** — composite operations declare partial failure semantics explicitly;
5. **Security restraint** — error responses must not leak ineligible state across trust boundaries;
6. **Reconciliation support** — errors include sufficient semantic class for client retry or query decisions — without mandating payload format;
7. **Observability alignment** — failure classes map to observability responsibilities (SYSTEM_ARCHITECTURE.md §15).

### 14.4 Error contract prohibitions

| Prohibited | Reason |
|------------|--------|
| Generic success on partial mutation | Violates Performance Integrity |
| Authorization failure with sensitive state leakage | Violates trust boundary |
| Domain rejection without mutation clarity | Client cannot reconcile |
| Timeout presented as success | Violates API-INV-14 |
| Different failure classes for equivalent domain rejections | Violates AP-11 consistency |

### 14.5 Error ownership

| Concern | Owner |
|---------|-------|
| Failure class taxonomy | API governance (this document) |
| Domain-specific rejection semantics | Owning domain realization unit |
| Error encoding and transport mapping | Implementation standards (subordinate) |
| Client presentation of errors | Frontend Architecture scope |

---

## 15. Idempotency Governance

### 15.1 Idempotency purpose

Idempotency governance ensures that **contract-exposed mutations** produce predictable outcomes under retry, duplicate delivery, and asynchronous completion — without corrupting marketplace truth.

Idempotency governance is architectural. Idempotency key formats and storage mechanisms belong to implementation standards.

### 15.2 Idempotency scope

| Scope | Requirement |
|-------|-------------|
| **Governance commands** | Must be architecturally idempotent — duplicate execution does not double-apply transitions |
| **Owner-scoped listing mutations** | Must be idempotent or provide explicit deduplication semantics |
| **Participation commands with side effects** | Must declare idempotency posture |
| **Composite commands** | Inherit strictest idempotency requirement among composed commands |
| **Read-only queries** | Inherently idempotent — must remain side-effect free |

### 15.3 Idempotency rules

1. **Declaration required** — command contracts declare idempotency expectation;
2. **Retry safety** — idempotent commands produce equivalent authoritative outcome on safe retry;
3. **Duplicate detection** — non-idempotent commands declare duplicate handling posture;
4. **Asynchronous alignment** — deferred mutations inherit BACKEND_ARCHITECTURE.md §14.5 and SYSTEM_ARCHITECTURE.md §8.2 idempotency expectations;
5. **No silent duplication** — duplicate governance execution must not produce ambiguous state;
6. **Reconciliation path** — non-idempotent commands provide query contract for outcome verification.

### 15.4 Idempotency prohibitions

- Undeclared non-idempotent governance commands;
- Retry-unsafe ownership mutations without explicit contract warning;
- Client-generated idempotency as substitute for domain ownership validation;
- Idempotency bypassing moderation or governance paths.

---

## 16. Pagination Governance

### 16.1 Pagination purpose

Pagination governance defines **how large authoritative result sets are exposed** through query contracts — preserving visibility eligibility, honest completeness signaling, and stable consumer expectations.

Pagination governance is architectural. Cursor encoding, page size defaults, and transport parameters belong to implementation standards.

### 16.2 Pagination principles

| Principle | Rule |
|-----------|------|
| **Visibility preservation** | Paginated results obey same eligibility rules as non-paginated queries |
| **Honest completeness** | Pagination must not imply end-of-results when additional eligible results exist — unless explicitly complete |
| **Stable ordering contract** | Paginated queries declare ordering semantics (§18) |
| **Authoritative source** | Pagination slices authoritative or honestly derived query results — not client caches |
| **Performance Integrity** | Pagination must not hide loading state as empty result |

### 16.3 Pagination ownership

| Concern | Owner |
|---------|-------|
| Pagination eligibility per query contract | Query contract publisher |
| Visibility rules within pages | Owning domain unit |
| Pagination semantic model (cursor, offset, keyset — conceptual) | API governance declares requirements; implementation chooses encoding |
| Default page scope for public discovery | API governance + Inventory/Housing Journey publishers |

### 16.4 Pagination rules

1. **Declared pagination** — high-volume query contracts declare pagination capability;
2. **Consistent eligibility** — page boundaries do not leak ineligible records;
3. **Continuation honesty** — continuation tokens (conceptual) indicate more results when they exist;
4. **No phantom pages** — empty pages due to filtering differ semantically from end-of-set;
5. **Cross-surface restriction** — governance query pagination does not expose public-ineligible fields.

### 16.5 Pagination prohibitions

- Pagination as authorization bypass;
- Unbounded public queries without governance review;
- Pagination over derived views that contradict authoritative ordering without declaration;
- Client-side pagination substituting for authoritative public eligibility enforcement.

---

## 17. Filtering Governance

### 17.1 Filtering purpose

Filtering governance defines **how query contracts narrow exposed result sets** — without redefining domain ownership, visibility eligibility, or product meaning.

### 17.2 Filtering principles

| Principle | Rule |
|-----------|------|
| **Eligibility first** | Filters apply only within contract visibility scope |
| **Publisher authority** | Filter dimensions are declared by query contract publisher |
| **No hidden mutation** | Filters never trigger state changes |
| **Honest emptiness** | Zero results reflect filter semantics — not false completion |
| **Public restraint** | Public filters expose only product-authorized dimensions |

### 17.3 Filter ownership

| Filter domain | Owning publisher |
|---------------|------------------|
| Public listing eligibility filters | Inventory + Housing Journey query contracts |
| Owner-scoped inventory filters | Inventory query contracts |
| Participant-scoped inquiry filters | Inquiry query contracts |
| Governance audit filters | Governance query contracts |
| Trust signal filters | Trust query contracts |

### 17.4 Filtering rules

1. **Declared filter vocabulary** — contracts publish allowed filter dimensions;
2. **No cross-scope filters** — realtor filters do not access foreign ownership data;
3. **Filter composition** — multiple filters combine under most restrictive visibility;
4. **Derived filter honesty** — filters on derived views declare authoritative source reconciliation;
5. **Future filter dimensions** — require contract version or new contract publication.

### 17.5 Filtering prohibitions

- Filters exposing non-public moderation state on public contracts;
- Filters redefining ownership scope;
- Client-side filters substituting for server eligibility enforcement on public surfaces;
- Filters encoding governance capabilities on participation contracts.

---

## 18. Sorting Governance

### 18.1 Sorting purpose

Sorting governance defines **how query contracts order exposed results** — preserving honest presentation, visibility eligibility, and predictable pagination behavior.

### 18.2 Sorting principles

| Principle | Rule |
|-----------|------|
| **Declared sort dimensions** | Contracts publish allowed sort keys |
| **Visibility consistency** | Sorting does not reveal ineligible records into view |
| **Pagination coupling** | Paginated queries declare sort stability across pages |
| **Meaning preservation** | Sort keys do not reinterpret product meaning |
| **Public restraint** | Public sort options expose only product-authorized dimensions |

### 18.3 Sort ownership

Sort vocabulary ownership follows query contract publisher — same ownership as filtering (§17.3).

### 18.4 Sorting rules

1. **Default sort declaration** — query contracts declare default ordering semantics;
2. **Stable pagination sort** — paginated queries require deterministic ordering contract;
3. **No implicit ranking authority** — search ranking meaning belongs to Housing Journey domain — not generic API convenience;
4. **Governance sort restraint** — governance queries sort within delegated visibility scope only.

### 18.5 Sorting prohibitions

- Undeclared sort dimensions affecting trust or moderation semantics;
- Sort keys leaking private fields into public ordering;
- Client-side sort substituting for contract-declared public eligibility;
- Sort semantics that present stale authoritative state as current without reconciliation.

---

## 19. Downstream Consumers

The following documents and artifacts will consume API Standards. Their content is **not defined here**.

| Consumer | Consumption relationship |
|----------|-------------------------|
| **Development Standards** | Implementation conventions for contract realization |
| **Security Standards** | Authentication and authorization attachment to contract invocation |
| **Implementation Governance** | Compliance verification against API-INV invariants |
| **Backend implementation** | Access Adaptation contract routing and orchestration entry |
| **Frontend implementation** | Access Consumption contract invocation and response reconciliation |
| **Contract documentation artifacts** | Subordinate encodings of published contracts — not authority |

### 19.1 Consumption model

Downstream standards and implementation must:

1. Declare API Standards as consumed authority for access contract discipline;
2. Operate within command/query ownership maps from BACKEND_ARCHITECTURE.md;
3. Honor surface–contract eligibility matrix (§8.2);
4. Not contradict API-INV invariants;
5. Not publish undeclared contracts as authoritative;
6. Reference — not duplicate — contract governance definitions.

### 19.2 Subordinate artifact rule

Machine-readable contract artifacts (including generated schema documents) are **subordinate encodings**. They do not supersede API governance authority. Where artifact conflicts with governed contract semantics, governance prevails.

---

## 20. Prohibited Scope

This document and API governance **must not** define:

| Prohibited | Belongs to |
|------------|------------|
| REST endpoints, URL paths, resource naming | Implementation standards |
| HTTP methods, status codes, headers | Implementation standards |
| GraphQL, gRPC, WebSocket, or transport protocols | Implementation standards |
| OpenAPI, Swagger, or schema generation | Subordinate artifacts |
| JSON, Protobuf, or serialization formats | Implementation standards |
| Request DTOs, response DTOs, or field types | Implementation standards |
| FastAPI, Express, or framework routing | Implementation artifacts |
| Authentication mechanisms, token formats, session stores | Security Standards |
| Authorization middleware, policy engines | Security Standards |
| Database queries, indexes, or ORM models | Database Standards |
| Caching products, CDN configuration | Infrastructure Standards |
| Rate limiting products or configuration | Infrastructure / Security Standards |
| API gateway products or deployment | Infrastructure Standards |
| Client SDK structure or framework hooks | Development Standards |
| Product features, roles, or UX decisions | Product Design Standard |
| New marketplace capabilities without product authority | Product / Future Evolution evaluation |
| Phase 4 Product Development Methodology | Phase 4 |

---

## 21. Terminology

| Term | Meaning |
|------|---------|
| **API contract** | Governed access surface between experience and platform — not a transport specification |
| **API boundary** | Architectural seam between Experience Systems and Backend Access Adaptation |
| **Access contract** | Synonym for API contract at governance level |
| **Command contract** | Contract expressing governed mutation intent |
| **Query contract** | Contract expressing read access without mutation |
| **Composite contract** | Contract composing multiple underlying command or query contracts |
| **Contract publisher** | Authority that owns and publishes a contract family |
| **Contract consumer** | Experience surface or subordinate implementation invoking a contract |
| **Request semantics** | Governed meaning of actor intent crossing the API boundary |
| **Response semantics** | Governed presentation of authoritative or derived outcomes |
| **Authoritative response payload** | Response content reflecting domain truth classes |
| **Derived response payload** | Response content computed from authoritative sources — non-authoritative |
| **Visibility eligibility** | Structural rule determining what state a contract may expose per scope |
| **Failure class** | Architectural error category for honest client reconciliation |
| **Idempotency posture** | Declared retry and duplicate safety expectation for a command contract |
| **Pagination contract** | Declared semantics for partial result set exposure |
| **Filter vocabulary** | Declared narrowing dimensions for a query contract |
| **Sort vocabulary** | Declared ordering dimensions for a query contract |
| **Breaking change** | Contract change requiring explicit migration authority |
| **Contract identity** | Stable logical identifier for a contract family |
| **Contract version** | Declared lineage marker for evolution tracking |
| **Trust boundary** | Separation between Public, Professional, and Governance contract scopes |
| **Performance Integrity** | Honest operation progress and completion — inherited from Product Chapter 63 |

Terms defined in RENTO PRODUCT DESIGN STANDARD v1.0, PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, PRODUCT_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, FRONTEND_ARCHITECTURE.md, or REPOSITORY_STANDARDS.md retain upstream meaning. This document does not redefine them.

---

## 22. Document Status

| Item | Value |
|------|-------|
| **Authority class** | Authoritative API governance |
| **Phase** | API Standards — Phase 3 domain standard (MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`) |
| **Supersedes** | Informal API convention; undocumented contract practice |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md |
| **Superior to** | Implementation artifacts · Subordinate contract encodings · Legacy API notes |
| **Does not authorize** | Implementation; technology selection; transport definition; Phase 3 completion |
| **Prerequisites** | Constitution, Principles, Platform Architecture, Product Architecture, System Architecture, Backend Architecture, Frontend Architecture, Repository Standards — satisfied |

---

**Document path:** `docs/engineering/API_STANDARDS.md`  
**Related:** `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/FRONTEND_ARCHITECTURE.md` · `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/engineering/PRODUCT_ARCHITECTURE.md` · `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
