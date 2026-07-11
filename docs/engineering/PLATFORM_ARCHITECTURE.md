# Rento Platform Architecture

**Status:** PUBLISHED — Phase 3.3 Platform Architecture  
**Authority class:** Authoritative platform architecture  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Document Purpose

This document defines the **overall engineering architecture** of the Rento platform.

It establishes the major architectural domains, their responsibilities, ownership boundaries, dependency direction, and interaction model. It answers how the platform is structurally organized — not how it is implemented.

This document is **architecture**, not implementation. It does not specify endpoints, schemas, infrastructure, frameworks, languages, deployment, or coding conventions.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance
    → Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        → Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            → Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                → Platform architecture (this document)
                    → Domain engineering standards (when approved)
                        → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks | Applies principles to platform structure |
| Product Design Standard | What product means | Preserves product meaning structurally; does not redefine |

### 2.3 What this document owns

- Major architectural building blocks and their boundaries;
- Domain ownership, consumption, and prohibition rules;
- Platform layering and dependency direction;
- Cross-domain interaction and information flow principles;
- Platform-level invariants, constraints, and anti-goals;
- Scalability, extensibility, and evolution philosophy at platform scope.

### 2.4 What this document does not own

- Product behavior and experience meaning;
- Frontend, backend, API, database, security implementation, or infrastructure standards;
- Technology selection, repository layout, or development workflow;
- Constitutional governance or general architectural principles already defined upstream.

---

## 3. Platform Mission

The Rento platform exists to provide a **structurally durable marketplace system** that:

1. Preserves approved product truth across all roles and lifecycles;
2. Enforces immutable domain rules at architectural boundaries;
3. Separates participation from governance execution;
4. Remains a marketplace — never a property management system, CRM, or agency operations platform;
5. Supports long-term evolution without structural degradation or lifecycle collapse.

Platform architecture serves product authority. It does not replace it.

---

## 4. Architectural Worldview

### 4.1 Platform as bounded composition

Rento is architecturally modeled as a **composition of bounded domains** connected through declared contracts — not as a single monolithic application core with attached features.

Each domain owns specific marketplace truth. No domain owns the entire system.

### 4.2 Marketplace-first structure

All domains exist to support marketplace participation:

- Consumers discover and evaluate housing opportunities;
- Realtors participate professionally without the platform operating their business;
- Administrators execute delegated governance only;
- Tenancy context is supported without the platform becoming a property manager.

### 4.3 Lifecycle-honest structure

Product lifecycles map to separable platform concerns. Structural integration across lifecycles is permitted. Structural merger of lifecycles is prohibited.

### 4.4 Truth-preserving structure

Platform structure must make it difficult — architecturally — to:

- expose non-public state publicly;
- mutate ownership or moderation outside governed paths;
- execute undelegated governance;
- present false completion or hidden failure.

---

## 5. Platform Layer Model

The platform is organized into four architectural layers.

### 5.1 Layer overview

| Layer | Purpose | Owns domain truth? |
|-------|---------|-------------------|
| **Experience Access** | Role-scoped exposure of platform capabilities | No |
| **Application Coordination** | Use-case orchestration across domains | No |
| **Bounded Domains** | Marketplace truth and domain rules | Yes — per domain |
| **Platform Foundation** | Contracts, invariants, extension registry | No — provides shared discipline only |

### 5.2 Experience Access Layer

**Purpose:** Define how roles access platform capabilities conceptually.

**Owns:** Access surfaces, role-context presentation boundaries, capability visibility rules.

**Does not own:** Domain truth, business rules, persistence, or product meaning.

**Rationale:** Separates how capabilities are reached from what those capabilities mean — enabling client architecture to evolve without domain erosion.

### 5.3 Application Coordination Layer

**Purpose:** Orchestrate multi-domain use cases without absorbing domain ownership.

**Owns:** Use-case flow composition, cross-domain invocation sequencing, transaction boundary declarations at architectural level.

**Does not own:** Listing ownership, moderation meaning, role grants, contact sourcing, or lifecycle state definitions.

**Rationale:** Prevents orchestration code from becoming an undeclared super-domain that silently owns all truth.

### 5.4 Bounded Domain Layer

**Purpose:** Own marketplace truth within declared boundaries.

**Owns:** Domain entities, domain state classes, domain transitions, domain invariants.

**Does not own:** Other domains' truth, presentation specifics, or infrastructure realization.

**Rationale:** Domain ownership creates reviewable units aligned with product lifecycles and immutable rules.

### 5.5 Platform Foundation Layer

**Purpose:** Provide shared architectural discipline across domains.

**Owns:** Inter-domain contracts, platform invariants registry, extension points, architectural vocabulary.

**Does not own:** Business logic, feature behavior, or product meaning.

**Rationale:** Foundation enables consistency without creating a monolithic shared-kernel that couples all domains.

---

## 6. Major Architectural Domains

The platform comprises **ten bounded domains** and **three cross-cutting concerns**. Each domain is technology-neutral and implementation-neutral.

---

### Domain 1 — Identity & Role Context

**Product alignment:** Role model across all product surfaces; Chapters 20, 46, 48, 51.

#### Purpose

Establish who is acting on the platform and within which role scope.

#### Owned responsibilities

- Identity context binding to platform actions;
- Role scope model: `user` | `realtor` | `admin`;
- Role-context propagation to downstream domains;
- Prohibition of ambient or implicit authority elevation.

#### Consumed responsibilities

- Trust & Integrity Domain — trust meaning for identity claims where applicable;
- Governance Execution Domain — role grant outcomes as delegated facts;
- Platform Foundation — authority invariants.

#### Prohibited responsibilities

- Listing ownership and publication state;
- Moderation decisions and verification adjudication;
- Contact content and inquiry stewardship;
- Product experience presentation.

#### Dependency rules

- Other domains consume role context; Identity Domain does not reach into foreign state;
- Role elevation paths exist only through Governance Execution Domain;
- Identity Domain must not embed domain-specific business rules.

#### Architectural rationale

Immutable role semantics require a single authoritative context domain. Without it, authorization leaks into every module.

---

### Domain 2 — Marketplace Inventory

**Product alignment:** Listing publication, ownership, visibility; Chapters 14–19, 47; immutable domain rules.

#### Purpose

Own marketplace listing entities, ownership binding, and publication lifecycle state.

#### Owned responsibilities

- Listing as marketplace inventory object;
- Ownership binding (`owner_id` → realtor);
- Publication state classes including `pending` and `available`;
- Owner-scoped mutation permission model;
- Public visibility eligibility rules.

#### Consumed responsibilities

- Identity & Role Context — actor and ownership validation;
- Trust & Integrity Domain — moderation meaning and publication integrity constraints;
- Professional Participation Domain — realtor as inventory owner source;
- Governance Execution Domain — moderation outcome as state transition authority.

#### Prohibited responsibilities

- Contact field capture at listing creation;
- Direct moderation status mutation by non-governance paths;
- Cross-owner editing;
- Search ranking meaning (Housing Journey Domain);
- Property management operations.

#### Dependency rules

- State transitions for moderation flow only through governed paths;
- Housing Journey and Discovery domains consume visibility; they do not own inventory;
- Inventory Domain does not depend on Experience Access.

#### Architectural rationale

Listing ownership and visibility are immutable domain rules. They require one authoritative domain to prevent moderation and ownership drift.

---

### Domain 3 — Housing Journey

**Product alignment:** Housing Journey (Chapters 13–40); search through housing obligation readiness.

#### Purpose

Support structural marketplace flows from discovery through housing decision and execution readiness.

#### Owned responsibilities

- Discovery and evaluation flow structures;
- Housing journey progression context;
- Decision and readiness coordination boundaries;
- Consumption of publicly visible inventory for journey purposes.

#### Consumed responsibilities

- Marketplace Inventory — publicly available listing visibility;
- Trust & Integrity — trust signals and integrity meaning;
- Engagement & Continuity — saved searches and continuity artifacts;
- Identity & Role Context — consumer actor scope.

#### Prohibited responsibilities

- Listing ownership or moderation state ownership;
- Tenancy operations (Tenancy Context Domain);
- Realtor business management;
- Governance execution;
- Housing journey does not extend into ongoing tenancy lifecycle ownership.

#### Dependency rules

- Must not mutate inventory ownership or publication state;
- Must not absorb Tenancy Context responsibilities;
- May integrate with Tenancy Context only through declared contracts for transition context.

#### Architectural rationale

Housing Journey is a distinct product lifecycle. Collapsing it into inventory or tenancy domains would corrupt marketplace boundaries.

---

### Domain 4 — Tenancy Context

**Product alignment:** Tenancy Lifecycle (Chapters 41–45); Settled Tenancy macro-domain.

#### Purpose

Provide structural support for experience surrounding active tenancy without becoming a property management system.

#### Owned responsibilities

- Tenancy relationship context within marketplace boundaries;
- Rent lifecycle context (not rent collection execution);
- Maintenance and repair context (not maintenance execution);
- Dispute and escalation context (not adjudication);
- Tenancy conclusion context (not move-out execution).

#### Consumed responsibilities

- Housing Journey — transition from decision/readiness context;
- Identity & Role Context — participant scope;
- Trust & Integrity — trust continuity meaning;
- Inquiry & Communication — communication context where applicable.

#### Prohibited responsibilities

- Rent collection, payment processing, or ledger operations;
- Maintenance work order execution;
- Dispute adjudication or legal resolution;
- Property management scheduling;
- Merging into Housing Journey or Marketplace Inventory ownership.

#### Dependency rules

- Tenancy Context must remain separable from Housing Journey;
- Must not acquire inventory or moderation ownership;
- Platform operations remain contextual — not executional.

#### Architectural rationale

Product posture explicitly forbids PMS transformation. Tenancy Context must exist as bounded context — not as operational property management.

---

### Domain 5 — Professional Participation

**Product alignment:** Realtor Professional Lifecycle (Chapters 46–50).

#### Purpose

Support realtor professional marketplace participation without operating the realtor's business.

#### Owned responsibilities

- Professional profile as participation anchor;
- Contact sourcing from professional profiles (not listing creation);
- Publication participation (not self-approval);
- Professional activation participation context;
- Verification participation context (not adjudication);
- Owner-scoped listing management participation.

#### Consumed responsibilities

- Identity & Role Context — realtor role scope;
- Marketplace Inventory — owned listings;
- Trust & Integrity — publication integrity and verification meaning;
- Governance Execution — role grant and verification outcomes as delegated facts.

#### Prohibited responsibilities

- CRM, agency ERP, or business operations for realtors;
- Moderation decision execution;
- Verification status determination;
- Contact entry at listing creation;
- Operating inquiry outcomes or lead management as business automation.

#### Dependency rules

- Participation only — execution belongs to Governance Execution Domain;
- Must not define moderation or verification adjudication meaning;
- Must not mutate inventory outside owner scope.

#### Architectural rationale

Realtor Platform product authority is participation-oriented. Platform structure must resist CRM/ERP absorption.

---

### Domain 6 — Inquiry & Communication

**Product alignment:** Chapters 16, 21, 50; inquiry stewardship participation.

#### Purpose

Own structural models for inquiries, contact initiation, and communication continuity within marketplace boundaries.

#### Owned responsibilities

- Inquiry as marketplace communication artifact;
- Contact initiation flow structure;
- Inquiry stewardship participation boundaries;
- Communication continuity context across roles.

#### Consumed responsibilities

- Professional Participation — contact source from profiles;
- Identity & Role Context — participant scope;
- Trust & Integrity — communication honesty and trust meaning;
- Engagement & Continuity — notification and re-engagement handoff.

#### Prohibited responsibilities

- Contact field capture at listing creation;
- CRM pipeline management or outcome determination;
- Operating realtor business communications;
- Governance execution.

#### Dependency rules

- Contact origin remains Professional Participation / profile authority;
- Inquiry stewardship participates in responsibility; it does not determine outcomes;
- Must not absorb notification delivery implementation (deferred to domain standards).

#### Architectural rationale

Communication is cross-cutting in product experience but requires bounded ownership to prevent CRM transformation.

---

### Domain 7 — Trust & Integrity

**Product alignment:** Chapter 20; publication integrity (Ch 47); verification meaning; moderation meaning.

#### Purpose

Own marketplace trust meaning, integrity constraints, and the semantic foundation for moderation and verification — without executing governance decisions.

#### Owned responsibilities

- Trust, verification, and moderation **meaning**;
- Publication integrity constraints;
- Visibility and honesty invariants at domain level;
- Verification participation vs adjudication separation;
- Integrity constraints consumed by other domains.

#### Consumed responsibilities

- Product authority — trust principles from Product Design Standard;
- Platform Foundation — platform invariants;
- Governance Execution — execution outcomes as facts for integrity state updates.

#### Prohibited responsibilities

- Moderation decision execution;
- Role grant execution;
- Verification adjudication execution;
- Policy enforcement execution;
- Defining product experience copy or visual trust presentation.

#### Dependency rules

- Governance Execution consumes Trust & Integrity meaning; never redefines it;
- Professional Participation consumes integrity constraints; does not own trust meaning;
- Trust & Integrity does not depend on Experience Access.

#### Architectural rationale

Separating trust meaning from governance execution preserves participation-execution product architecture in engineering structure.

---

### Domain 8 — Governance Execution

**Product alignment:** Platform Governance Lifecycle (Chapters 51–55).

#### Purpose

Execute delegated marketplace governance decisions — only where authority has already been delegated by upstream product architecture.

#### Owned responsibilities

- Listing moderation decision execution;
- Role grant and revocation execution;
- Verification program execution;
- Residual platform policy enforcement execution within delegated scope;
- Governance execution audit legibility.

#### Consumed responsibilities

- Trust & Integrity — moderation and verification meaning;
- Professional Participation — participation context;
- Marketplace Inventory — state transition targets;
- Identity & Role Context — role mutation targets;
- Platform Foundation — delegated-authority-only invariant.

#### Prohibited responsibilities

- Redefining trust, moderation, or verification meaning;
- Expanding governance scope beyond delegated authority;
- Operating organizational governance, compliance programs, or security operations;
- Realtor business management;
- Arbitrary ownership or status mutation outside governed flows.

#### Dependency rules

- Strictly downstream of meaning domains;
- Must not be depended upon for product meaning definitions;
- All mutations require delegated authority path.

#### Architectural rationale

Admin Platform product authority is execution-oriented and delegated. Engineering structure must prevent governance from becoming omnipotent operations software.

---

### Domain 9 — Engagement & Continuity

**Product alignment:** Chapters 17, 21, 30; saved searches and continuity.

#### Purpose

Own structural models for user engagement persistence and marketplace continuity across sessions and journeys.

#### Owned responsibilities

- Saved properties and saved search continuity structures;
- Re-engagement context and notification trigger architecture;
- Continuity artifacts that preserve user intent across interruption;
- Engagement state legibility.

#### Consumed responsibilities

- Housing Journey — journey continuity consumption;
- Marketplace Inventory — referenced inventory visibility;
- Identity & Role Context — owner of continuity artifacts;
- Inquiry & Communication — handoff to communication flows.

#### Prohibited responsibilities

- Inventory ownership or publication state;
- Notification delivery implementation;
- Product copy or campaign management;
- Search ranking meaning ownership.

#### Dependency rules

- Continuity references inventory; does not own it;
- Must preserve intent without misrepresenting current inventory truth;
- Performance Integrity applies — no false completion of continuity restoration.

#### Architectural rationale

Continuity is a distinct concern that must not be embedded in inventory or journey domains as secondary logic.

---

### Domain 10 — Experience Access

**Product alignment:** Cross-cutting role surfaces; mobile-first access posture.

#### Purpose

Define role-scoped capability access to the platform — independent of any client technology.

#### Owned responsibilities

- Role-scoped capability matrix;
- Access boundary between public, realtor, and admin surfaces;
- Capability reachability rules;
- Access-level visibility of domain operations (not domain truth ownership).

#### Consumed responsibilities

- All bounded domains — through Application Coordination only;
- Identity & Role Context — access authorization scope;
- Platform Foundation — access invariants.

#### Prohibited responsibilities

- Domain truth ownership;
- Business rule definition;
- Product experience meaning;
- Client framework or transport decisions.

#### Dependency rules

- Depends inward on coordination and domains;
- Domains must not depend on Experience Access;
- Access changes must not force domain changes.

#### Architectural rationale

Separating access from domain truth enables client architecture evolution and prevents presentation-driven domain models.

---

## 7. Cross-Cutting Concerns

Cross-cutting concerns are not domains. They are architectural disciplines that every domain must honor.

### 7.1 State & Lifecycle Legibility

**Purpose:** Ensure domain-significant state is structurally classifiable, transition-bounded, and visibility-aware.

**Applies to:** All domains owning state.

**Inherited from:** Architecture Principles AP-20; Product Chapters 24, 25.

### 7.2 Performance Integrity

**Purpose:** Ensure platform structure does not incentivize false completion, hidden failure, or stale truth for apparent responsiveness.

**Applies to:** Application Coordination, Experience Access, Engagement & Continuity, all state-owning domains.

**Inherited from:** Product Chapter 63; Architecture Principles AP-21.

### 7.3 Operational Clarity

**Purpose:** Ensure domain actions, authority decisions, and failure classes are architecturally legible for operation and review.

**Applies to:** All domains, especially Governance Execution and Trust & Integrity.

**Inherited from:** Architecture Principles AP-18.

### 7.4 Accessibility & Meaning Integrity

**Purpose:** Ensure platform structure preserves accessible and multilingual meaning handoff between domains — without owning localization implementation.

**Applies to:** Experience Access, all domains producing user-visible meaning.

**Inherited from:** Product Chapter 62.

---

## 8. Product Lifecycle Mapping

Platform domains preserve product lifecycle separation.

| Product lifecycle | Primary platform domain(s) | Must not merge with |
|-------------------|---------------------------|---------------------|
| Housing Journey | Housing Journey | Tenancy Context, Governance Execution |
| Tenancy Lifecycle | Tenancy Context | Housing Journey, Marketplace Inventory |
| Realtor Professional Lifecycle | Professional Participation, Inquiry & Communication | Governance Execution, Tenancy Context |
| Platform Governance Lifecycle | Governance Execution | Professional Participation, Trust meaning |
| Trust & Moderation meaning | Trust & Integrity | Governance Execution |
| Listing ownership & visibility | Marketplace Inventory | Housing Journey, Professional Participation |
| Cross-cutting continuity | Engagement & Continuity | Inventory ownership |

Product Design Standard Lifecycle, Future Product Evolution, and Performance Experience remain product authorities — not platform runtime domains.

---

## 9. Dependency Direction

### 9.1 Global dependency law

```
Experience Access → Application Coordination → Bounded Domains → Platform Foundation
```

Reverse dependencies are prohibited unless explicitly declared as consumption of published contracts.

### 9.2 Domain dependency matrix

| Domain | May consume | Must not depend on |
|--------|-------------|-------------------|
| Identity & Role Context | Platform Foundation, Governance Execution outcomes | Experience Access, Housing Journey internals |
| Marketplace Inventory | Identity, Trust & Integrity, Governance outcomes, Professional Participation | Experience Access, Housing Journey ranking |
| Housing Journey | Inventory visibility, Trust, Engagement, Identity | Tenancy operations, Governance execution |
| Tenancy Context | Housing Journey context, Identity, Trust, Inquiry | Inventory ownership, PMS operations |
| Professional Participation | Identity, Inventory, Trust, Governance outcomes | Governance execution internals |
| Inquiry & Communication | Professional Participation, Identity, Trust, Engagement | CRM operations, Governance execution |
| Trust & Integrity | Platform Foundation, Governance facts | Governance execution definitions |
| Governance Execution | Trust, Inventory, Identity, Professional Participation | Experience Access |
| Engagement & Continuity | Identity, Inventory visibility, Housing Journey | Inventory ownership |
| Experience Access | All domains via coordination | — |

### 9.3 Participation–execution dependency rule

```
Trust & Integrity (meaning)
    → Professional Participation (participation)
        → Governance Execution (execution only)
```

Execution domains must never appear upstream of meaning or participation domains in dependency graphs.

---

## 10. Cross-Domain Interaction Model

### 10.1 Interaction types

| Type | Description | Example |
|------|-------------|---------|
| **Consumption** | Domain reads another's published contract or state class | Housing Journey reads `available` inventory |
| **Command** | Domain requests governed transition in owner domain | Professional Participation requests listing creation in Inventory |
| **Fact** | Domain receives recorded outcome from authority domain | Inventory receives moderation outcome from Governance Execution |
| **Context** | Domain passes non-owning context | Housing Journey passes readiness context toward Tenancy Context |

### 10.2 Prohibited interaction types

- **Direct internal access** — reaching into foreign domain internals;
- **Shadow mutation** — changing another domain's owned state without contract;
- **Meaning override** — execution domain redefining trust or participation meaning;
- **Ambient coupling** — shared mutable state without owner;
- **Presentation-driven mutation** — Experience Access triggering domain truth changes outside coordination.

### 10.3 Contract requirement

Every cross-domain interaction must be expressible as a **stable interface** at the architectural level:

- declared inputs;
- declared outputs;
- declared authority prerequisites;
- declared failure classes;
- owning domain identified.

Transport and serialization belong to subordinate standards.

---

## 11. Information Flow Principles

### 11.1 Visibility flow

Information flows outward only through visibility rules:

- Public surfaces receive publicly eligible state only;
- Role-scoped surfaces receive role-authorized state only;
- Governance surfaces receive governance-authorized state only.

Non-public state must not leak through convenience paths.

### 11.2 Authority flow

Authority flows downward from product and constitutional constraints into domain invariants — never upward from implementation convenience.

### 11.3 Mutation flow

Mutations flow to the owning domain through governed paths:

```
Actor → Role Context → Coordination → Owning Domain → Governed Transition
```

Bypass paths are architecturally prohibited.

### 11.4 Truth flow

Product truth flows as constraints into platform structure. Platform structure must not generate product truth as a side effect of engineering convenience.

### 11.5 Continuity flow

Continuity artifacts reference current truth; they do not substitute for it. Restoration of continuity must reconcile with current inventory and state legibility.

---

## 12. Stable Interfaces Philosophy

### 12.1 Purpose

Stable interfaces are the primary scalability mechanism of the platform. Domains evolve internally while honoring published contracts.

### 12.2 Interface stability rules

1. Interfaces are owned by the domain that owns the underlying truth;
2. Consumers depend on interfaces — not implementations;
3. Breaking interface change requires explicit migration authority;
4. Interfaces express architectural intent — not transport detail;
5. Interface contracts must be reviewable independently of code.

### 12.3 Interface classes

| Class | Stability expectation |
|-------|----------------------|
| **Core marketplace contracts** | Highest stability — ownership, visibility, role scope |
| **Lifecycle contracts** | High stability — journey and tenancy context boundaries |
| **Participation contracts** | High stability — realtor participation surfaces |
| **Governance contracts** | High stability — delegated execution inputs and outcomes |
| **Extension contracts** | Explicitly versioned — future capability integration |

---

## 13. Platform Scalability Philosophy

Platform scalability means capacity to grow across:

| Axis | Architectural response |
|------|------------------------|
| **Users and listings** | Domain isolation; inventory ownership locality |
| **Contributors** | Bounded domains with clear ownership |
| **Geographic expansion** | Foundation contracts; not domain merger |
| **Feature scope** | New domains or extensions — not monolith growth |
| **Governance complexity** | Delegated execution isolation |

Scalability is not defined as infrastructure scale-out. Scale-out belongs to infrastructure standards. Platform architecture ensures structure does not collapse before infrastructure can scale.

---

## 14. Platform Extensibility Philosophy

### 14.1 Extension model

New capability extends the platform through:

1. Documented architectural gap;
2. Impact assessment against product authority and platform invariants;
3. Choice of: new domain, new contract in existing domain, or governed extension point;
4. Explicit approval before structural integration.

### 14.2 Extension points

Platform Foundation maintains an extension registry for declared extension points. Undeclared extension is prohibited.

### 14.3 Future capability discipline

Future capabilities — AI assistance, maps, live updates, chat, push synchronization, real-time collaboration — require independent architectural evaluation before receiving domain placement. They do not automatically create new platform domains.

### 14.4 Anti-patterns

- Feature-as-module without domain placement;
- Shared utility domain absorbing all new behavior;
- Extension through foreign domain internals;
- Product lifecycle expansion without lifecycle separation review.

---

## 15. Evolution Philosophy

### 15.1 Governed platform evolution

Platform structure evolves through governed extension per Architecture Principles AP-8 and AP-25 — not through silent structural replacement.

### 15.2 Domain evolution rules

| Change class | Authority required |
|--------------|-------------------|
| Internal domain refinement | Domain standard review |
| New cross-domain contract | Platform architecture review |
| New bounded domain | Platform architecture amendment |
| Lifecycle boundary change | Product authority + platform architecture review |
| Invariant change | Constitutional or product authority review |

### 15.3 Long-horizon durability

Platform architecture prefers:

- contract stability over internal optimization;
- domain clarity over shared convenience;
- explicit migration over implicit dual-behavior;
- durable invariants over era-specific structure.

---

## 16. Architectural Invariants

These invariants apply platform-wide. Domain standards must not contradict them.

| ID | Invariant |
|----|-----------|
| **PLT-1** | Rento remains a marketplace platform structurally |
| **PLT-2** | Every listing has exactly one ownership authority in Marketplace Inventory Domain |
| **PLT-3** | Public visibility includes only publicly eligible inventory state |
| **PLT-4** | Contact sourcing originates from professional profiles — never listing creation |
| **PLT-5** | Moderation state mutation occurs only through Governance Execution paths |
| **PLT-6** | Role elevation occurs only through Governance Execution paths |
| **PLT-7** | Realtors mutate only owner-scoped inventory |
| **PLT-8** | Governance Execution honors delegated authority only |
| **PLT-9** | Housing Journey does not own tenancy operations |
| **PLT-10** | Tenancy Context does not execute property management |
| **PLT-11** | Professional Participation does not execute governance |
| **PLT-12** | Trust & Integrity does not execute governance |
| **PLT-13** | Product lifecycles remain structurally separable |
| **PLT-14** | Domains interact only through declared contracts |
| **PLT-15** | Experience Access does not own domain truth |
| **PLT-16** | Performance Integrity is preserved in coordination and continuity paths |
| **PLT-17** | Future capabilities require explicit architectural placement before integration |

---

## 17. Structural Constraints

### 17.1 Ownership constraints

- One domain owns each class of marketplace truth;
- Shared mutable state without owner is prohibited;
- Ownership cannot transfer through presentation or coordination layers.

### 17.2 Mutation constraints

- Forbidden mutations: direct `owner_id` change; direct moderation status change; cross-owner inventory edit; realtor-to-admin escalation;
- All mutations require actor context, authority validation, and owning-domain path.

### 17.3 Visibility constraints

- Public access surfaces consume public eligibility rules from Inventory and Trust domains;
- Non-available inventory must not appear as publicly available;
- Role-scoped data must not leak across role boundaries.

### 17.4 Dependency constraints

- No domain depends on Experience Access;
- Governance Execution is never upstream of Trust & Integrity in meaning definition;
- Application Coordination must not accumulate domain ownership over time.

### 17.5 Structural simplicity constraint

- Prefer ten bounded domains with clear contracts over fewer domains with mixed lifecycles;
- Additional domains require documented gap — not convenience splits.

---

## 18. Architectural Anti-Goals

The platform architecture explicitly rejects:

| Anti-goal | Why rejected |
|-----------|--------------|
| **Monolithic core** | Unreviewable; lifecycle collapse; change amplification |
| **Shared business kernel** | Couples all domains; prevents replaceability |
| **CRM / ERP transformation** | Violates marketplace posture |
| **Property management platform** | Violates Tenancy Context boundaries |
| **Governance omnipotence** | Violates delegated authority model |
| **Presentation-driven domain model** | Violates separation of concerns |
| **Inventory-as-communication** | Violates contact sourcing rules |
| **Participation-as-execution** | Violates Admin/Realtor separation |
| **Speed over truth** | Violates Performance Integrity |
| **Implicit cross-domain mutation** | Violates ownership and auditability |

---

## 19. Domain Standards Placement

Subordinate engineering standards must map to platform domains without redefining this architecture.

| Future standard | Primary domain alignment |
|-----------------|-------------------------|
| Product Architecture | Lifecycle mapping and product-to-platform translation |
| Frontend Architecture | Experience Access Layer |
| Backend Architecture | Application Coordination + Bounded Domains |
| API Standards | Inter-domain and access contracts |
| Database Standards | Per-domain persistence ownership |
| Security Standards | Identity & Role Context + Platform invariants |
| Infrastructure Standards | Operational realization — subordinate to all domains |
| Implementation Governance | Cross-cutting compliance with PLT invariants |

---

## 20. Terminology

| Term | Meaning |
|------|---------|
| **Bounded domain** | Architecturally owned unit of marketplace truth |
| **Platform layer** | Structural tier with defined dependency direction |
| **Contract** | Declared cross-domain interface — not a transport specification |
| **Consumption** | Reading another domain's published output without internal access |
| **Participation** | Role engagement with marketplace processes without execution authority |
| **Execution** | Governed action on delegated authority — Governance Execution Domain only |
| **Visibility eligibility** | Structural rule determining what state may appear in a given access scope |
| **Coordination** | Multi-domain use-case composition without truth ownership |
| **Extension point** | Declared location for governed future capability integration |
| **Platform invariant** | Non-negotiable structural rule (PLT-*) |

Product Design Standard terms retain upstream meaning.

---

## 21. Document Status

| Item | Status |
|------|--------|
| **Authority class** | Authoritative platform architecture |
| **Supersedes** | `docs/ARCHITECTURE.md` as structural authority (remains subordinate implementation notes) |
| **Subordinate to** | PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · Product Design Standard |
| **Superior to** | Domain engineering standards (when authored) |
| **Does not authorize** | Implementation; technology selection |
| **Prerequisites** | Constitution and Principles publication recommended before approval |

---

**Document path:** `docs/engineering/PLATFORM_ARCHITECTURE.md`  
**Related:** `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
