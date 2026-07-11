# Rento Product Architecture

**Status:** PUBLISHED — Product Architecture  
**Authority class:** Authoritative product architecture  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

**Does not authorize implementation.**

---

## 1. Document Purpose

This document defines the **engineering interpretation of approved product architecture** for the Rento project.

It establishes how product meaning from RENTO PRODUCT DESIGN STANDARD v1.0 is translated into durable engineering architectural concerns — without redefining product behavior, experience principles, or product authority.

This document answers:

- How does approved product architecture enter engineering authority?
- What product lifecycles and macro-domains must engineering preserve structurally?
- What product responsibilities require engineering translation?
- How are approved product capabilities decomposed for architectural ownership?
- What boundaries separate product meaning from platform structure and downstream realization?
- What invariants must all engineering standards inherit from product architecture?
- How do downstream engineering documents consume this translation layer?

This document is **product architecture for engineering**, not product design and not implementation. It does not specify user interfaces, endpoints, schemas, frameworks, languages, infrastructure, or deployment.

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
                    ├── System architecture (SYSTEM_ARCHITECTURE.md)
                    └── Repository standards (REPOSITORY_STANDARDS.md)
                        → Product architecture (this document)
                        → Domain engineering standards (Backend, Frontend, API, Database, Security, …)
                            → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| RENTO PRODUCT DESIGN STANDARD v1.0 | What product means | Translates meaning into engineering concerns — does not redefine |
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks structurally | Applies principles to product-to-engineering translation |
| PLATFORM_ARCHITECTURE.md | Platform domain structure and layers | Consumed upstream structural authority — does not duplicate domain catalog |
| Product Design Standard | Product behavior and experience authority | Preserves product authority — never overrides |

### 2.3 What this document owns

- Engineering interpretation rules for approved product architecture;
- Product lifecycle and macro-domain preservation model at engineering scope;
- Product architectural boundaries and mandatory concept separation for engineering;
- Product responsibility mapping to engineering translation concerns;
- Product capability decomposition for architectural ownership assignment;
- Translation-layer architectural ownership model;
- Product architecture invariants for downstream engineering inheritance;
- Engineering consumption model for product-derived constraints.

### 2.4 What this document does not own

- Product behavior, experience meaning, visual language, or UX decisions;
- Platform domain definitions, layer model, or domain dependency matrices (PLATFORM_ARCHITECTURE.md);
- System component model (SYSTEM_ARCHITECTURE.md);
- Backend, frontend, API, database, security, or infrastructure realization;
- Technology selection, coding conventions, or delivery methodology;
- Constitutional governance or general architectural principles already defined upstream;
- New product features, roles, lifecycles, or capability approval.

---

## 3. Relationship to Product Design

### 3.1 Authority supremacy

RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016) is the **highest authority for product decisions**. This document **consumes** approved product architecture. It may make product constraints more explicit for engineering consumption. It may **not** weaken, bypass, reinterpret, or replace product authority.

Engineering standards implement and extend product principles. They do not override them (ENGINEERING_HANDOFF.md §2.3, PHASE_3_AUTHORIZATION.md §6).

### 3.2 Consumption model

| Product authority class | Engineering treatment |
|------------------------|----------------------|
| **Product philosophy and experience principles** (Chapters 1–12) | Inherited as structural constraints on all engineering interpretation |
| **Journey and macro-domain chapters** (Chapters 13–64) | Mapped to lifecycle and capability decomposition — not re-authored |
| **Immutable domain rules** (distributed chapters + operational encoding) | Elevated to engineering invariants — not relaxed |
| **Cross-cutting product authorities** (Chapters 62–64) | Preserved as translation constraints — not expanded into implementation |
| **Governance and evolution discipline** (Chapters 56–61) | Governs product standard evolution only — not engineering document lifecycle |

### 3.3 Product macro-domain inventory

Approved Product Design Standard v1.0 contains the following **completed macro-domains**. Engineering must preserve each as a separable architectural concern:

| Macro-domain | Chapters | Engineering role |
|--------------|----------|------------------|
| Core Foundation | 1–12 | Baseline product constraints for all translation |
| Housing Journey | 13–40 | Consumer journey from search through housing obligation readiness |
| Settled Tenancy | 41–45 | Tenancy lifecycle context after occupancy begins |
| Realtor Platform | 46–50 | Supply-side professional marketplace participation |
| Admin Platform | 51–55 | Delegated platform governance execution |
| Design System Governance | 56–61 | Product Design Standard lifecycle — not engineering runtime |
| Accessibility & Internationalization | 62 | Inclusive and multilingual meaning integrity |
| Performance Experience | 63 | Performance Integrity and perceived-truth constraints |
| Future Product Evolution | 64 | Future capability evaluation discipline — not feature approval |

Macro-domains marked as product-governance-only (Design System Governance) do not create marketplace runtime domains. They constrain how product authority evolves — not how engineering implements marketplace behavior.

### 3.4 What engineering must not extract from Product Design

- Screen layouts, component tokens, or visual specifications;
- Copy, tone, or micro-interaction detail unless required for structural truth preservation;
- Implementation hints that may appear in chapters but are not product authority;
- Deferred or post-v1.0 capabilities unless explicitly approved by repository authority;
- Feature roadmaps, delivery commitments, or capability approval acts.

---

## 4. Relationship to Platform Architecture

### 4.1 Translation versus realization

| Concern | Product Architecture (this document) | Platform Architecture |
|---------|-----------------------------------|----------------------|
| **Primary question** | What approved product structure must engineering preserve? | How is the platform structurally organized? |
| **Owns** | Product-to-engineering translation rules | Bounded domains, layers, platform invariants |
| **Lifecycle mapping** | Declares translation preservation rules within Platform §8 | Owns structural lifecycle mapping as platform domains (§8) |
| **Domain catalog** | References realization targets | Owns full domain definitions |

Product Architecture is the **engineering translation standard** operating within Platform Architecture authority. Platform Architecture remains **structural authority** for bounded domains, layers, and platform invariants. Neither document redefines the other.

### 4.2 Alignment obligation

This document must remain **consistent** with published `PLATFORM_ARCHITECTURE.md` §8 Product Lifecycle Mapping. Platform Architecture owns structural lifecycle-to-domain assignment. Product Architecture formalizes engineering translation discipline within that published structure — it does not invent alternate domain ownership.

If future product evolution requires translation change, amendment flows through product authority first — then Platform Architecture review — then Product Architecture revision to conform.

### 4.3 Non-duplication rule

This document does **not** restate:

- Platform layer model (Experience Access, Application Coordination, Bounded Domains, Platform Foundation);
- Full bounded domain catalog and per-domain responsibility lists;
- Platform dependency matrices or PLT invariant registry;
- System component decomposition.

Downstream reviewers consume Platform Architecture for structural detail. This document supplies the **product-derived justification** for why that structure exists.

---

## 5. Engineering Interpretation of Product Lifecycles

### 5.1 Mandatory lifecycle concepts

The following official product concepts are **immutable separation boundaries** for engineering interpretation (MASTER_ROADMAP.md, ENGINEERING_HANDOFF.md §5.3). They must never be merged in engineering structure:

| Official concept | Product scope | Engineering interpretation |
|------------------|---------------|------------------------------|
| **Housing Journey** | Chapters 13–40 | Consumer journey from search through housing decision and execution readiness — not ongoing tenancy |
| **Tenancy Lifecycle** | Chapters 41–45 | Relationship lifecycle after occupancy begins — contextual, not operational property management |
| **Realtor Professional Lifecycle** | Chapters 46–50 | Supply-side professional participation — not CRM or agency operations |
| **Platform Governance Lifecycle** | Chapters 51–55 | Delegated governance execution only — not organizational governance |
| **Product Design Standard Lifecycle** | Chapters 56–61 | Governance of the product standard itself — not runtime marketplace behavior |
| **Accessibility & Internationalization Experience** | Chapter 62 | Meaning accessibility across abilities and languages — not localization implementation |
| **Performance Experience** | Chapter 63 | Perceived performance as trust-preserving experience — not engineering optimization |
| **Future Product Evolution** | Chapter 64 | Evaluation discipline for future capabilities — not feature authorization |

### 5.2 Lifecycle translation rules

1. **One product lifecycle → one or more declared engineering concerns** — never an undifferentiated "user features" module;
2. **Lifecycle boundaries are structural** — integration across lifecycles is permitted; merger is prohibited;
3. **Participation–execution separation** — product participation lifecycles (realtor, inquiry) remain separate from governance execution lifecycle;
4. **Meaning before execution** — trust and moderation meaning precede governance execution in translation order;
5. **Context before operations** — tenancy context is contextual support, not property management execution;
6. **Cross-cutting authorities are constraints** — Performance, A&I, and Future Evolution constrain translation; they do not subsume journey macro-domains.

### 5.3 Lifecycle-to-realization mapping

Engineering translation assigns each product lifecycle to **platform realization targets**. Domain names and ownership belong to PLATFORM_ARCHITECTURE.md. This table declares **translation alignment only**:

| Product lifecycle | Engineering translation concern | Platform realization target (reference) |
|-------------------|--------------------------------|----------------------------------------|
| Housing Journey | Consumer discovery, evaluation, decision, housing obligation readiness | Housing Journey Domain |
| Tenancy Lifecycle | Tenancy relationship context during active occupancy | Tenancy Context Domain |
| Realtor Professional Lifecycle | Professional profile, publication participation, inquiry stewardship | Professional Participation Domain; Inquiry & Communication Domain |
| Platform Governance Lifecycle | Delegated moderation, role grant, verification, policy enforcement execution | Governance Execution Domain |
| Listing ownership & publication integrity | Inventory truth, ownership binding, visibility eligibility | Marketplace Inventory Domain; Trust & Integrity Domain |
| Trust & moderation meaning | Publication integrity, verification meaning, honesty invariants | Trust & Integrity Domain |
| Cross-session continuity | Saved searches, saved properties, re-engagement context | Engagement & Continuity Domain |
| Role-scoped access | Actor identity and role context consumption | Identity & Role Context Domain |
| Experience exposure | Role-scoped capability access without truth ownership | Experience Access Layer |

### 5.4 Lifecycle transition boundaries

| Transition | Permitted engineering posture | Prohibited engineering posture |
|------------|--------------------------------|-------------------------------|
| Housing Journey → Tenancy Context | Declared context handoff; readiness toward occupancy context | Housing journey owns tenancy operations; single lifecycle module |
| Professional Participation → Governance Execution | Participation requests; governance executes on delegated authority | Realtor domain executes moderation; governance redefines trust meaning |
| Trust meaning → Governance Execution | Meaning constraints precede execution | Execution domain defines moderation semantics |
| Inventory → Public visibility | Visibility eligibility enforced before exposure | Public surfaces define inventory truth |
| Product Design → Engineering structure | Translation preserves meaning | Engineering convenience redefines product behavior |

---

## 6. Product Architectural Boundaries

### 6.1 Marketplace posture boundary

Rento remains a **marketplace platform** at product architecture level. Engineering interpretation must preserve:

- Consumers discover and evaluate housing opportunities;
- Realtors participate professionally without the platform operating their business;
- Administrators execute **delegated** governance only;
- Tenancy is supported as **context** without property management transformation.

Engineering structure must resist absorption into PMS, CRM, agency ERP, or organizational governance software (ENGINEERING_HANDOFF.md §5.4).

### 6.2 Product versus engineering boundary

| Inside product architecture translation | Outside product authority — downstream engineering only |
|----------------------------------------|------------------------------------------------------|
| Lifecycle preservation rules | API contracts and transport |
| Capability decomposition and ownership assignment | Database schemas and persistence mechanics |
| Role-scoped responsibility interpretation | Authentication mechanisms and token formats |
| Trust-critical meaning preservation | Infrastructure topology and deployment |
| Performance Integrity as structural constraint | SLO/SLA, profiling, benchmarking |
| Immutable domain rule elevation | Frameworks, languages, coding conventions |

### 6.3 Participation versus execution boundary

| Class | Product examples | Engineering translation |
|-------|------------------|------------------------|
| **Participation** | Realtor listing management participation; inquiry stewardship; professional profile maintenance | Domains that enable role engagement without execution authority |
| **Meaning** | Trust signals; moderation semantics; publication integrity constraints | Domains that define what states mean — not who executes transitions |
| **Execution** | Admin moderation decision execution; role grant; verification program execution | Single governance execution concern — delegated authority only |

Participation domains must not absorb execution. Execution domains must not redefine meaning or participation semantics.

### 6.4 Visibility and honesty boundary

Public engineering surfaces may expose only **publicly eligible** marketplace state per product authority. Engineering interpretation must treat the following as structural requirements:

- New realtor listings enter moderated publication path (`pending` → governed transition → `available`);
- Public display exposes `available` (and product-authorized public states) only;
- Performance Integrity: no structural pattern that presents incomplete operations as complete;
- Latency and waiting must not compromise product truth (Chapter 63).

### 6.5 Future capability boundary

Future capabilities — including AI assistance, maps, live updates, chat, push synchronization, real-time collaboration — do **not** automatically expand product architecture scope. Each requires independent evaluation per Chapters 63 and 64 before receiving translation placement.

Existing implementation artifacts do not constitute product architectural authority.

---

## 7. Product Responsibility Mapping

### 7.1 Responsibility classification

Product responsibilities are classified for engineering translation into four architectural responsibility types:

| Type | Definition | Translation outcome |
|------|------------|---------------------|
| **Product meaning ownership** | What the product defines as true, eligible, or meaningful | Consumed from Product Design Standard — never re-owned by engineering |
| **Translation ownership** | How product meaning becomes engineering concern | Owned by Product Architecture |
| **Structural realization ownership** | How concerns become platform domains and system components | Owned by Platform and System Architecture |
| **Implementation ownership** | How structure becomes code and infrastructure | Owned by downstream standards and implementation — not authorized here |

### 7.2 Role-scoped product responsibilities

| Role | Product responsibilities (interpreted) | Must not acquire |
|------|--------------------------------------|------------------|
| **user** | Discover housing; evaluate listings; maintain continuity artifacts; initiate inquiry participation | Listing ownership; moderation execution; role grant |
| **realtor** | Maintain professional profile; manage own listings; participate in publication and inquiry stewardship | Others' listings; moderation execution; admin governance; CRM operations |
| **admin** | Execute delegated governance decisions; role grant and revocation; verification program execution; residual policy enforcement within scope | Product meaning redefinition; arbitrary ownership mutation; organizational governance |

Role semantics are consumed from product authority and immutable domain rules. Engineering may not introduce roles or expand scope.

### 7.3 Domain-critical product responsibilities

| Product responsibility | Meaning owner | Translation concern | Realization reference |
|------------------------|---------------|---------------------|----------------------|
| Listing truth and ownership | Product + immutable rules | Owner-scoped inventory; publication state classes | Marketplace Inventory Domain |
| Contact sourcing | Product Chapters 18–19, 46–50 | Contacts from professional profiles — never listing creation capture | Professional Participation Domain |
| Moderation meaning | Product Chapter 20, 51–55 | Trust and integrity semantics | Trust & Integrity Domain |
| Moderation execution | Product Chapter 51–55 | Delegated state transitions only | Governance Execution Domain |
| Public visibility eligibility | Product + immutable rules | Honest exposure of eligible state only | Inventory + Experience Access |
| Inquiry stewardship | Product Chapter 50 | Participation beyond contact initiation — not CRM pipeline | Inquiry & Communication Domain |
| Tenancy context | Product Chapters 41–45 | Relationship context — not rent collection or PMS | Tenancy Context Domain |
| Governance audit legibility | Product Admin Platform | Evidence of delegated execution — not organizational audit | Governance Execution Domain |

### 7.4 Cross-cutting product responsibilities

| Cross-cutting authority | Engineering translation constraint |
|------------------------|-----------------------------------|
| **Accessibility & Internationalization** (Ch 62) | Meaning must remain comprehensible across abilities and languages at architectural handoff points |
| **Performance Experience** (Ch 63) | Performance Integrity and honest progress representation are structural requirements |
| **Future Product Evolution** (Ch 64) | New capabilities require explicit translation evaluation before engineering placement |
| **Trust, Verification & Moderation** (Ch 20) | Trust meaning precedes governance execution in all translation paths |

---

## 8. Product Capability Decomposition

### 8.1 Decomposition principles

1. **Capabilities derive from approved product macro-domains** — not from implementation modules or feature backlogs;
2. **Each capability has declared lifecycle membership** — no capability without lifecycle context;
3. **Capabilities declare participation, meaning, or execution posture** — never ambiguous dual posture;
4. **Capabilities map to translation concerns before mapping to platform domains** — two-step discipline prevents implementation-driven decomposition;
5. **Equivalent product problems receive equivalent translation treatment** — consistency over local convenience.

### 8.2 Core marketplace capabilities

| Capability ID | Capability name | Lifecycle | Posture | Translation concern |
|---------------|-----------------|-----------|---------|---------------------|
| **PC-01** | Housing discovery and search | Housing Journey | Participation | Discovery coordination without inventory ownership |
| **PC-02** | Listing evaluation and comparison | Housing Journey | Participation | Evaluation context without tenancy operations |
| **PC-03** | Housing obligation readiness | Housing Journey | Participation | Readiness context toward housing execution |
| **PC-04** | Listing publication participation | Realtor Professional | Participation | Owner-scoped listing management without contact capture at creation |
| **PC-05** | Professional profile and contact authority | Realtor Professional | Participation | Profile as contact source — not CRM |
| **PC-06** | Inquiry initiation and stewardship | Realtor Professional | Participation | Inquiry artifacts without outcome determination beyond marketplace |
| **PC-07** | Listing inventory truth | Listing ownership | Meaning + ownership | Authoritative listing entities, ownership binding, publication state |
| **PC-08** | Trust and publication integrity | Trust & Moderation | Meaning | Verification and moderation semantics |
| **PC-09** | Moderation and role execution | Platform Governance | Execution | Delegated transitions only |
| **PC-10** | Tenancy relationship context | Tenancy Lifecycle | Context | Non-operational tenancy support |
| **PC-11** | Engagement continuity | Cross-cutting | Participation | Saved searches and properties without inventory ownership |
| **PC-12** | Role-scoped experience access | Cross-cutting | Access | Exposure without domain truth ownership |

### 8.3 Governance capability cluster

| Capability ID | Capability name | Execution scope | Prohibited expansion |
|---------------|-----------------|-----------------|---------------------|
| **PC-09a** | Listing moderation decision execution | Inventory state transition on delegated outcome | Redefining moderation meaning |
| **PC-09b** | Role grant and revocation execution | Identity role binding on delegated outcome | Realtor self-elevation |
| **PC-09c** | Verification program execution | Trust state update on delegated outcome | Product verification meaning rewrite |
| **PC-09d** | Residual policy enforcement | Within delegated policy scope only | Organizational compliance operations |

### 8.4 Capability dependency discipline

```
Trust meaning (PC-08) → Participation capabilities (PC-04–PC-06) → Governance execution (PC-09*)
Inventory truth (PC-07) → Visibility and discovery consumption (PC-01, PC-11)
Housing Journey (PC-01–PC-03) → Tenancy context (PC-10) via declared transition only
```

Capabilities must not form circular ownership. Execution capabilities are strictly downstream of meaning and participation capabilities.

---

## 9. Architectural Ownership Model

### 9.1 Ownership layers

| Layer | Owner | Accountable for |
|-------|-------|-----------------|
| **L0 — Product authority** | RENTO PRODUCT DESIGN STANDARD v1.0 | Product meaning, behavior, experience principles |
| **L1 — Platform structure** | PLATFORM_ARCHITECTURE.md | Bounded domains, layers, platform invariants |
| **L2 — Product architecture translation** | This document | Lifecycle preservation, capability decomposition, translation invariants |
| **L3 — System composition** | SYSTEM_ARCHITECTURE.md | System components, trust boundaries, component interactions |
| **L4 — Domain realization** | Backend, Frontend, API, Database, Security standards | Subsystem and contract specialization |
| **L5 — Implementation** | Application artifacts | Runtime behavior — not authorized by this document |

### 9.2 Translation ownership rules

1. **Product meaning has exactly one authority** — Product Design Standard;
2. **Translation rules have exactly one authority** — Product Architecture;
3. **Platform domain structure has exactly one authority** — Platform Architecture;
4. **No layer may silently absorb the layer above** — upward absorption is prohibited;
5. **Downward consumption is explicit** — each layer declares consumed upstream constraints.

### 9.3 Capability ownership assignment

| Capability class | Translation owner | Structural owner | Implementation owner |
|------------------|-------------------|------------------|---------------------|
| Lifecycle preservation rules | Product Architecture | Platform + System Architecture | Domain standards |
| Marketplace truth capabilities (PC-07) | Product Architecture (interpretation) | Platform Inventory Domain | Backend Architecture unit |
| Trust meaning capabilities (PC-08) | Product Architecture (interpretation) | Platform Trust Domain | Backend Trust unit |
| Governance execution (PC-09*) | Product Architecture (scope boundary) | Platform Governance Domain | Backend Governance unit |
| Experience access (PC-12) | Product Architecture (eligibility rules) | Platform Experience Access Layer | Frontend Architecture (future) |
| Cross-cutting constraints (A&I, Performance) | Product Architecture (constraint declaration) | All layers (consumption) | Development Standards (future) |

### 9.4 Ownership prohibitions

- Translation layer must not own product meaning;
- Translation layer must not own platform domain definitions;
- Translation layer must not own implementation artifacts;
- No shared "product utilities" module may own capabilities across lifecycle boundaries;
- No engineering document may claim product approval for new capabilities.

---

## 10. Engineering Consumption Model

### 10.1 Consumption obligations

Every downstream engineering standard **must**:

1. Declare PLATFORM_ARCHITECTURE.md as consumed upstream structural authority;
2. Declare Product Architecture as consumed authority when interpreting product-derived constraints;
3. Declare Product Design Standard as supreme product authority;
4. Preserve mandatory lifecycle separation from §5.1;
5. Honor immutable domain rules from §11;
6. Operate within capability decomposition from §8 — not invent undeclared capabilities;
7. Reference — not duplicate — lifecycle mapping tables;
8. Submit translation conflicts to product authority — not resolve through engineering convenience.

### 10.2 Consumption by document class

| Document class | Primary consumption from Product Architecture |
|----------------|---------------------------------------------|
| **System Architecture** | Component boundaries honoring lifecycle separation |
| **Backend Architecture** | Domain realization honoring capability ownership and immutable rules |
| **Frontend Architecture** | Experience access honoring visibility and Performance Integrity |
| **API Standards** | Contract surfaces honoring participation–execution separation |
| **Database Standards** | Persistence ownership aligned to capability truth classes |
| **Security Standards** | Role scope and authorization points aligned to role responsibilities |
| **Infrastructure Standards** | No product policy encoding in operational configuration |
| **Development Standards** | Implementation conventions within translated structure |
| **Implementation Governance** | Compliance verification against PROD-INV invariants |

### 10.3 Conflict resolution

| Conflict type | Resolution authority |
|-------------|---------------------|
| Product meaning vs engineering structure | Product Design Standard prevails |
| Translation vs platform structure | Platform Architecture prevails on platform and domain structure; Product Architecture interprets Product Design for engineering without overriding Platform Architecture |
| Platform vs system realization | Platform Architecture prevails on domain matters |
| Engineering standard vs implementation artifact | Engineering standard prevails |

Chat memory, informal consensus, and implementation precedent are not resolution authorities (PROJECT_CONSTITUTION.md, REPOSITORY_STANDARDS.md).

---

## 11. Architectural Invariants

These invariants apply product-wide at the translation layer. Downstream engineering must not contradict them.

| ID | Invariant |
|----|-----------|
| **PROD-INV-1** | Product Design Standard remains highest authority for product meaning |
| **PROD-INV-2** | Mandatory lifecycle concepts from §5.1 remain separable in all engineering structure |
| **PROD-INV-3** | Housing Journey does not extend into ongoing tenancy ownership |
| **PROD-INV-4** | Tenancy Lifecycle remains contextual — not property management execution |
| **PROD-INV-5** | Realtor Professional Lifecycle remains participation-oriented — not CRM or agency operations |
| **PROD-INV-6** | Platform Governance Lifecycle honors delegated authority only |
| **PROD-INV-7** | Participation capabilities do not absorb governance execution |
| **PROD-INV-8** | Governance execution does not redefine trust or moderation meaning |
| **PROD-INV-9** | Listing ownership is realtor-scoped — cross-owner mutation is prohibited |
| **PROD-INV-10** | Contacts are sourced from professional profiles — not captured at listing creation |
| **PROD-INV-11** | New realtor listings enter moderated publication path before public eligibility |
| **PROD-INV-12** | Public visibility exposes only publicly eligible state |
| **PROD-INV-13** | Role elevation occurs only through governance execution paths |
| **PROD-INV-14** | Performance Integrity is a structural constraint — not an optimization preference |
| **PROD-INV-15** | Future capabilities require explicit translation evaluation before placement |
| **PROD-INV-16** | Product architecture translation does not authorize implementation |
| **PROD-INV-17** | Engineering interpretation must not introduce new product features or roles |

Immutable domain rules from operational encoding (`.cursor/rules/rento-domain.mdc`) and distributed Product Design chapters reinforce PROD-INV-9 through PROD-INV-13. Where substance conflicts, Product Design Standard chapters prevail (ENGINEERING_HANDOFF.md §2.6).

---

## 12. Downstream Consumers

The following documents consume Product Architecture. Their content is **not defined here**.

| Consumer | Consumption relationship |
|----------|-------------------------|
| **SYSTEM_ARCHITECTURE.md** | Composes system components without lifecycle merger |
| **BACKEND_ARCHITECTURE.md** | Realizes domain capabilities with immutable rule enforcement |
| **Frontend Architecture** (future) | Experience access honoring visibility and Performance Integrity |
| **API Standards** (future) | Contracts preserving participation–execution separation |
| **Database Standards** (future) | Persistence aligned to capability truth ownership |
| **Security Standards** (future) | Role and authorization alignment to §7.2 |
| **Infrastructure Standards** (future) | Operational realization without product policy encoding |
| **Development Standards** (future) | Implementation within translated capability boundaries |
| **Implementation Governance** (future) | Compliance verification against PROD-INV invariants |

### Consumption model

Downstream standards must:

1. Declare Product Architecture as consumed authority for product-derived structural constraints;
2. Preserve lifecycle separation from §5;
3. Not redefine product meaning or capability decomposition;
4. Not contradict PROD-INV invariants;
5. Reference — not duplicate — translation tables and ownership rules.

---

## 13. Prohibited Scope

This document must not define:

- User interface layouts, components, or visual design;
- Screen flows, wireframes, or interaction specifications;
- REST endpoints, GraphQL, transport protocols, or payload schemas;
- Database schemas, SQL, ORM models, or migrations;
- Authentication mechanisms, token formats, or cryptographic policy;
- Authorization implementation or security tooling;
- Frontend frameworks, state management, or client architecture;
- Backend modules, services, repositories, or runtime packaging;
- Message brokers, caches, or background worker products;
- Docker, Kubernetes, cloud services, or deployment topology;
- CI/CD pipelines, observability products, or SLO/SLA targets;
- Programming languages, frameworks, or coding conventions;
- New product features, roles, journeys, or macro-domains;
- Feature roadmaps, delivery plans, or implementation tasks;
- Phase 4 Product Development Methodology.

---

## 14. Terminology

| Term | Meaning |
|------|---------|
| **Product Architecture** | Engineering interpretation layer between Product Design Standard and platform structure |
| **Product meaning** | What the product defines as true, eligible, meaningful, or authoritative for users |
| **Engineering translation** | Structural preservation of product meaning without redefinition |
| **Macro-domain** | Completed product architectural block within Product Design Standard v1.0 |
| **Lifecycle** | Official product concept governing a phase of marketplace participation or relationship |
| **Capability** | Approved product responsibility unit decomposed for architectural ownership (PC-*) |
| **Translation concern** | Engineering architectural obligation derived from product capability |
| **Realization target** | Platform domain or layer that structurally implements a translation concern |
| **Participation** | Role engagement with marketplace processes without execution authority |
| **Meaning** | Semantic definition of trust, integrity, eligibility, or state significance |
| **Execution** | Governed action on delegated authority — governance scope only |
| **Context** | Non-owning relationship information — especially tenancy context |
| **Performance Integrity** | Honest representation of operation progress and completion — inherited from Chapter 63 |
| **Immutable domain rule** | Non-negotiable marketplace rule elevated from product authority |
| **Visibility eligibility** | Structural rule determining what state may appear in a given access scope |

Terms defined in RENTO PRODUCT DESIGN STANDARD v1.0, PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, or PLATFORM_ARCHITECTURE.md retain upstream meaning. This document does not redefine them.

---

## 15. Document Status

| Item | Value |
|------|-------|
| **Authority class** | Authoritative product architecture |
| **Phase** | Product Architecture — Phase 3 domain standard (unnumbered step per MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`) |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md (structural matters) |
| **Compatible with** | SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md |
| **Does not authorize** | Implementation; technology selection; Phase 3 completion; product modification |
| **Prerequisites** | Product Design Standard v1.0; Constitution; Principles; Platform Architecture; System Architecture; Backend Architecture; Repository Standards — satisfied |

---

**Document path:** `docs/engineering/PRODUCT_ARCHITECTURE.md`  
**Related:** `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` · `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
