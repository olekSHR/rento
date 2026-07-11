# Rento Frontend Architecture

**Status:** PUBLISHED — Frontend Architecture  
**Authority class:** Authoritative frontend architecture  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

**Does not authorize implementation.**

---

## 1. Document Purpose

This document defines the **architectural responsibilities of the Rento frontend**.

It explains how the frontend is organized as an architectural subsystem — its position within the overall system, its internal structure, its responsibility boundaries, and its interaction model with adjacent subsystems.

This document answers:

- What is the frontend's position within the Rento system?
- How does the frontend realize Experience Systems defined in System Architecture?
- What architectural responsibilities does the frontend own on the client?
- How is the frontend decomposed into experience surfaces, layers, and composition units?
- Where do presentation, navigation, capability access, and client state belong?
- How does the frontend consume backend capabilities without owning domain truth?
- What state does the frontend own versus merely present?
- What invariants and prohibited coupling apply at frontend scope?

This document is **frontend architecture**, not implementation. It does not specify frameworks, languages, components, styles, endpoints, schemas, or deployment.

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
                        → Frontend architecture (this document)
                            → API Standards · Security Standards · Development Standards (when published)
                                → Implementation artifacts
```

Product Architecture is consumed as upstream authority for product-derived structural constraints. It does not sit above Platform or System Architecture on structural matters.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks structurally | Applies principles to frontend organization |
| PLATFORM_ARCHITECTURE.md | Platform domains and Experience Access layer | Realizes Experience Access on the client |
| PRODUCT_ARCHITECTURE.md | Product-to-engineering translation | Consumes visibility, lifecycle, and capability constraints |
| SYSTEM_ARCHITECTURE.md | System components and Experience Systems | Specializes Experience Systems as frontend subsystem |
| BACKEND_ARCHITECTURE.md | Server-side domain realization | Consumed for frontend/backend boundary only |
| REPOSITORY_STANDARDS.md | Repository governance | Consumed for placement — does not own repository organization |
| Product Design Standard | What product means | Preserves product meaning structurally; does not redefine |

### 2.3 What this document owns

- Frontend position and responsibility boundaries within the system;
- Experience System realization model on the client;
- Frontend component model and internal architectural layers;
- Experience surface decomposition aligned with role-scoped access;
- Presentation, navigation, and capability reachability ownership;
- Client-side state classification and ownership rules;
- Rendering and composition boundaries;
- Backend and identity consumption posture on the client;
- Frontend interaction model with adjacent subsystems;
- Frontend dependency direction and prohibited coupling;
- Frontend architectural invariants;
- Scalability, replaceability, extensibility, and maintainability responsibilities at frontend scope;
- Downstream standards consumption model.

### 2.4 What this document does not own

- Product behavior, experience meaning, visual language, or UX decisions;
- Platform domain definitions (PLATFORM_ARCHITECTURE.md);
- System component definitions beyond Experience Systems specialization (SYSTEM_ARCHITECTURE.md);
- Backend domain realization, orchestration, or persistence (BACKEND_ARCHITECTURE.md);
- API contract specification (API Standards);
- Authentication and authorization implementation (Security Standards);
- Design system implementation, component libraries, or visual tokens;
- Infrastructure, deployment, observability tooling, or development workflow;
- Constitutional governance or general architectural principles already defined upstream.

---

## 3. System Position

### 3.1 System role

The frontend is the **client-side realization of Experience Systems** defined in SYSTEM_ARCHITECTURE.md §6 Components 1–3.

It is the **role-scoped access and presentation subsystem** — responsible for:

- Realizing Public, Professional, and Governance Experience Systems on the client;
- Providing capability reachability without owning marketplace domain truth;
- Presenting publicly eligible and role-authorized state honestly;
- Maintaining strict trust-boundary separation between experience surfaces;
- Consuming authoritative state exclusively through declared backend access contracts.

The frontend does **not** own authoritative marketplace state, domain invariants, persistence, or session authority. Those belong to Application Platform System, Identity & Access System, and backend realization units.

### 3.2 Experience System mapping

| System Architecture component | Frontend realization | Trust boundary |
|------------------------------|---------------------|----------------|
| **Component 1 — Public Experience System** | Consumer experience surface | Public / authenticated consumer |
| **Component 2 — Professional Experience System** | Realtor experience surface | Professional participation |
| **Component 3 — Governance Experience System** | Administrator experience surface | Privileged governance |

Each surface realizes PLATFORM_ARCHITECTURE.md Experience Access Layer (Domain 10) for its role scope. Surfaces are logically separable regardless of runtime packaging.

### 3.3 Platform layer alignment

| Platform layer | Frontend architectural posture |
|----------------|-------------------------------|
| **Experience Access** | Primary realization scope — capability reachability and access boundaries |
| **Application Coordination** | Not realized on client — consumed through backend contracts only |
| **Bounded Domains** | Not realized on client — authoritative truth consumed, never owned |
| **Platform Foundation** | Inherited constraints only — invariants honored at presentation boundary |

### 3.4 Marketplace posture (inherited)

The frontend must preserve Rento as a **marketplace platform** at presentation scope. It must not structurally support transformation into property management, CRM, agency operations, or organizational governance software. This posture is inherited from Product Design Standard, PRODUCT_ARCHITECTURE.md, and PLATFORM_ARCHITECTURE.md PLT-1.

---

## 4. Responsibility Boundaries

### 4.1 Owned responsibilities

The frontend **owns**:

1. **Experience surface realization** — Public, Professional, and Governance access surfaces on the client;
2. **Presentation composition** — assembling views from authoritative and derived backend state;
3. **Client interaction boundary** — actor-initiated operations adapted for backend contract invocation;
4. **Navigation and routing ownership** — role-scoped reachability structure at architectural level;
5. **Derived presentation state** — non-authoritative views, filters, and UI coordination state;
6. **Transient client interaction state** — navigation context, form interaction context, optimistic UI posture declarations;
7. **Capability visibility enforcement at presentation boundary** — honoring role scope and visibility eligibility before display;
8. **Performance Integrity at client scope** — honest progress and completion representation;
9. **Trust-boundary separation** — strict isolation between Public, Professional, and Governance surfaces;
10. **Mobile-first access posture** — inherited structural constraint on experience realization.

### 4.2 Consumed responsibilities

The frontend **consumes** but does **not own**:

| Responsibility | Source |
|----------------|--------|
| Product meaning and lifecycle semantics | Product Design Standard |
| Product-derived visibility and capability constraints | PRODUCT_ARCHITECTURE.md |
| Platform Experience Access boundaries | PLATFORM_ARCHITECTURE.md |
| Experience System component boundaries | SYSTEM_ARCHITECTURE.md |
| Authoritative marketplace state | Backend via API boundary |
| Session authority and role binding truth | Identity & Access System |
| Authentication and authorization enforcement | Security Standards (when published) |
| API transport and contract shape | API Standards (when published) |
| Media retrieval authorization | Media Storage System via backend |
| Product visual language and design meaning | Product Design Standard — not implemented here |

### 4.3 Prohibited responsibilities

The frontend must **never**:

- Own authoritative marketplace domain state;
- Redefine product meaning, lifecycle semantics, or marketplace posture;
- Execute governance beyond delegated presentation of governance capabilities;
- Mutate domain truth outside backend contract paths;
- Cache authoritative state as permanent truth without reconciliation;
- Embed backend business rules as client-side authority;
- Capture realtor contacts at listing creation surfaces;
- Present non-public inventory as publicly available;
- Define authentication mechanisms, token formats, or cryptographic policy;
- Define API endpoints, payload schemas, or transport protocols;
- Define persistence, infrastructure, or deployment;
- Merge Public, Professional, and Governance trust boundaries;
- Become product authority through presentation convenience.

---

## 5. Component Model

The frontend is architecturally decomposed into **experience surfaces**, **composition units**, **access boundary adapters**, and **shared presentation discipline** — not into pages, frameworks, or deployable artifacts.

### 5.1 Component overview

```
┌─────────────────────────────────────────────────────────────────┐
│  Governance Experience Surface                                  │
│  (administrator-scoped capability reachability)                 │
├─────────────────────────────────────────────────────────────────┤
│  Professional Experience Surface                                │
│  (realtor-scoped participation reachability)                    │
├─────────────────────────────────────────────────────────────────┤
│  Public Experience Surface                                      │
│  (consumer public and authenticated reachability)               │
├─────────────────────────────────────────────────────────────────┤
│  Shared Presentation Discipline                                 │
│  (cross-surface invariants, access posture — not domain truth)  │
├─────────────────────────────────────────────────────────────────┤
│  Access Consumption Layer                                       │
│  (backend contracts, identity context, media retrieval — consumed)│
└─────────────────────────────────────────────────────────────────┘
```

### 5.2 Component classification

| Component class | Owns domain truth? | Purpose |
|-----------------|-------------------|---------|
| **Public Experience Surface** | No | Consumer discovery, evaluation, and housing journey participation access |
| **Professional Experience Surface** | No | Realtor profile, listing participation, and inquiry stewardship access |
| **Governance Experience Surface** | No | Administrator delegated governance execution access |
| **Shared Presentation Discipline** | No | Cross-surface invariants, Performance Integrity, visibility discipline |
| **Access Consumption Layer** | No | Consume backend, identity, and media access through declared boundaries |

### 5.3 Experience surface mapping

Each SYSTEM_ARCHITECTURE.md Experience System component maps to one **experience surface** within the frontend. Surfaces are logically separable regardless of runtime packaging.

| Experience System | Frontend surface | Primary capability scope |
|-------------------|------------------|-------------------------|
| Public Experience System | Public Experience Surface | Housing Journey consumption; public and authenticated consumer access |
| Professional Experience System | Professional Experience Surface | Professional Participation; owner-scoped listing management participation |
| Governance Experience System | Governance Experience Surface | Governance Execution participation; privileged visibility only |

Shared Presentation Discipline spans all surfaces without owning marketplace truth.

### 5.4 Component dependency rule

```
Experience Surface → Application Composition → Presentation Layer → Access Consumption Layer
```

Experience surfaces must not reach into foreign surface internals. Cross-surface shared behavior belongs in Shared Presentation Discipline as constraints — not as a domain truth owner.

### 5.5 Surface isolation rule

Public, Professional, and Governance surfaces must remain **architecturally isolatable** at trust-boundary level per SYSTEM_ARCHITECTURE.md §6 Components 1–3. Shared runtime packaging must not collapse trust boundaries.

---

## 6. Frontend Layers

The frontend organizes responsibilities into five internal layers. Layers are **architectural**, not implementation tiers.

### 6.1 Layer model

| Layer | Architectural role | Owns domain truth? |
|-------|-------------------|-------------------|
| **L1 — Access Consumption** | Invoke backend and identity contracts; receive authoritative responses | No |
| **L2 — Application Composition** | Compose use-case flows across presentation units within a surface | No |
| **L3 — Presentation** | Render role-scoped views; enforce visibility at display boundary | No |
| **L4 — Interaction State** | Hold transient UI and navigation context | No — must reconcile |
| **L5 — Shared Presentation Discipline** | Cross-cutting presentation invariants and capability gates | No |

### 6.2 L1 — Access Consumption

**Purpose:** Consume backend access contracts and identity context without owning response semantics.

**Owns:**

- Contract invocation routing to backend API boundary;
- Actor context attachment for protected operations;
- Response reception and structural adaptation for presentation;
- Honest error and outcome propagation from backend.

**Does not own:**

- Domain business rules;
- Authoritative state classification;
- Authorization policy definition;
- Transport protocol or endpoint layout.

**Rationale:** Separates backend contract consumption from presentation ownership. API Standards will define transport; this layer defines architectural limits on what consumption may do.

### 6.3 L2 — Application Composition

**Purpose:** Compose multi-step presentation flows within an experience surface without absorbing domain ownership.

**Owns:**

- Use-case presentation flow sequencing;
- Cross-presentation-unit coordination within a surface;
- Composite view assembly from multiple backend read contracts;
- Composition-level Performance Integrity posture.

**Does not own:**

- Domain entities, invariants, or transitions;
- Authoritative state persistence;
- Foreign surface presentation logic;
- Backend orchestration semantics.

**Rationale:** Prevents presentation composition from becoming an undeclared client-side domain owner.

### 6.4 L3 — Presentation

**Purpose:** Realize role-scoped capability presentation for each experience surface.

**Owns:**

- View structure and presentation boundaries per surface;
- Visibility eligibility enforcement at display boundary;
- Role-scoped capability reachability presentation;
- Honest rendering of backend-provided state classes.

**Does not own:**

- Product visual design tokens or copy authority;
- Domain truth definitions;
- Moderation meaning or governance semantics;
- Backend mutation authority.

**Rationale:** Presentation renders meaning consumed from backend — it does not define marketplace truth.

### 6.5 L4 — Interaction State

**Purpose:** Hold transient client interaction context with defined lifetime.

**Owns:**

- Navigation context within a surface;
- In-form interaction context;
- Transient UI expansion, selection, and focus state;
- Client-side optimistic presentation posture declarations.

**Does not own:**

- Session authority;
- Role binding facts;
- Authoritative domain records;
- Permanent marketplace truth.

**Rationale:** Interaction state improves usability but must never substitute for authoritative backend state.

### 6.6 L5 — Shared Presentation Discipline

**Purpose:** Provide shared architectural discipline across all experience surfaces.

**Owns:**

- Cross-surface visibility invariants;
- Performance Integrity presentation rules;
- Role-scope gate declarations at architectural level;
- Capability reachability vocabulary.

**Does not own:**

- Business logic;
- Domain state;
- Product design implementation;
- Backend contract semantics.

**Rationale:** Shared discipline enables consistency without creating a monolithic client kernel that owns truth.

---

## 7. Experience Realization

### 7.1 Realization principles

1. **One Experience System → one experience surface** — SYSTEM_ARCHITECTURE.md component boundaries map directly to frontend surfaces;
2. **Access without ownership** — surfaces reach capabilities; they do not own domain truth;
3. **Role-scoped isolation** — each surface honors its trust boundary exclusively;
4. **Visibility before display** — eligibility rules precede presentation;
5. **Honest state classes** — publication, moderation, and role states presented as backend defines them;
6. **Participation–execution separation** — Professional surfaces participate; Governance surfaces execute only within delegated presentation scope;
7. **Product constraint inheritance** — PROD-INV and PC-* constraints honored at presentation boundary.

### 7.2 Public Experience Surface

**Realizes:** Public Experience System (SYSTEM_ARCHITECTURE.md §6 Component 1).

**Owns presentation access to:**

- Publicly eligible listing discovery and evaluation;
- Authenticated consumer housing journey participation;
- Engagement continuity artifacts (saved searches, saved properties);
- Consumer inquiry initiation participation.

**Consumes:** Housing Journey, Inventory visibility, Engagement & Continuity, Inquiry participation contracts.

**Prohibited:** Owner-scoped inventory mutation; governance paths; non-public state exposure; tenancy operations presentation as PMS.

### 7.3 Professional Experience Surface

**Realizes:** Professional Experience System (SYSTEM_ARCHITECTURE.md §6 Component 2).

**Owns presentation access to:**

- Owner-scoped listing management participation;
- Professional profile participation;
- Publication participation (not self-approval);
- Inquiry stewardship participation.

**Consumes:** Professional Participation, Inventory ownership visibility, Trust integrity signals.

**Prohibited:** Contact capture at listing creation; moderation execution; governance internals; CRM or business operations presentation.

### 7.4 Governance Experience Surface

**Realizes:** Governance Experience System (SYSTEM_ARCHITECTURE.md §6 Component 3).

**Owns presentation access to:**

- Delegated governance execution participation;
- Moderation decision participation surfaces;
- Role grant and verification program participation surfaces;
- Privileged action visibility within delegated scope.

**Consumes:** Governance Execution, Trust meaning display, Inventory state transition outcomes.

**Prohibited:** Domain meaning redefinition; organizational governance presentation; omniscient admin presentation beyond delegated scope.

### 7.5 Lifecycle mapping preservation

| Product lifecycle | Primary presentation surface | Must not merge with |
|-------------------|-----------------------------|---------------------|
| Housing Journey | Public Experience Surface | Professional operations, Governance |
| Realtor Professional Lifecycle | Professional Experience Surface | Governance execution presentation |
| Platform Governance Lifecycle | Governance Experience Surface | Professional participation semantics |
| Cross-cutting continuity | Public Experience Surface | Inventory ownership presentation |

---

## 8. Application Composition

### 8.1 Definition

**Application composition** is the architectural responsibility within L2 that assembles one or more presentation units and backend read contracts into a complete client-side use-case presentation flow.

Application composition **coordinates presentation** — it does not own domain truth.

### 8.2 Owned responsibilities

- Presentation flow entry and exit within a surface;
- Actor context verification before protected presentation (via identity consumption);
- Sequencing of backend read and mutation contract invocations for a use case;
- Composite view assembly from multiple authoritative sources;
- Cross-unit presentation error containment;
- Performance Integrity — no false completion across composed presentation steps.

### 8.3 Prohibited responsibilities

- Domain invariant definition;
- Direct authoritative state ownership;
- Authorization policy definition;
- Foreign surface flow absorption;
- Embedding backend business rules as client authority;
- Bypassing Access Consumption layer for backend invocation.

### 8.4 Composition categories

| Category | Surface | Example presentation patterns |
|----------|---------|------------------------------|
| **Public read composition** | Public | Listing discovery with trust signals and eligibility filtering |
| **Participation composition** | Professional | Listing creation flow presenting pending publication outcome |
| **Governance composition** | Governance | Moderation decision presentation applying inventory state outcome |
| **Continuity composition** | Public | Saved search restoration reconciled with current inventory |
| **Authentication-gated composition** | All protected surfaces | Capability reachability after identity context establishment |

### 8.5 Composition invariants

| ID | Invariant |
|----|-----------|
| **FRN-COMP-1** | Application composition never owns authoritative domain state |
| **FRN-COMP-2** | Multi-contract presentation declares data sources explicitly |
| **FRN-COMP-3** | Composition failure does not present partial backend success as complete |
| **FRN-COMP-4** | Composition does not accumulate domain rules — repeated logic signals misplaced ownership |

---

## 9. State Ownership

### 9.1 State classification (frontend scope)

| State class | Frontend owner | Authoritative? |
|-------------|----------------|----------------|
| **Authoritative domain state** | None — backend only | No — consumed, never owned |
| **Derived presentation state** | Presentation / Composition layers | No — must reconcile with backend |
| **Cached presentation copy** | Surface holding cache | No — must reconcile |
| **Interaction state** | Interaction State layer | No — transient only |
| **Navigation state** | Interaction State layer | No — routing context only |
| **Session presentation copy** | Access Consumption (client copy) | No — Identity & Access System owns session authority |
| **Optimistic presentation posture** | Interaction State layer | No — must reconcile on backend response |

### 9.2 Source-of-truth rules

1. **Backend is authoritative** — every marketplace truth class originates from backend contracts;
2. **Derived never overrides authoritative** — presentation reconciles toward backend responses;
3. **Cache must reconcile** — cached listings, profiles, or governance views must not outlive authoritative state without invalidation;
4. **Interaction state is not truth** — UI state must not define marketplace reality;
5. **Optimistic presentation must reconcile** — optimistic UI must correct on backend denial or failure;
6. **Session copy is not authority** — client session presentation must not substitute for Identity & Access System truth;
7. **Cross-surface state must not leak** — Professional or Governance state must not appear in Public surface without authorization.

### 9.3 Visibility state rules

| Visibility scope | Permitted presentation source | Frontend enforcement point |
|------------------|------------------------------|---------------------------|
| Public | Publicly eligible inventory and marketplace state only | Public Experience Surface — Presentation layer |
| Authenticated user | User-scoped continuity and engagement artifacts | Public Experience Surface |
| Realtor | Owner-scoped inventory and professional profile | Professional Experience Surface |
| Administrator | Governance-authorized state for delegated execution | Governance Experience Surface |

---

## 10. Rendering Boundaries

### 10.1 Rendering ownership

Rendering is owned by the **Presentation layer (L3)** within each experience surface. Rendering translates consumed backend state into role-scoped views — it does not classify domain truth.

### 10.2 Rendering rules

1. **Eligibility before render** — visibility rules evaluated before display;
2. **Honest state rendering** — `pending`, `available`, and role-scoped states rendered without semantic alteration;
3. **No false completion** — loading and progress presentation must not imply completion before backend confirmation;
4. **Stale reconciliation** — rendered views must reconcile when authoritative state changes;
5. **Surface-local rendering** — Governance rendering must not leak into Public surface;
6. **Media via authorized paths** — media presentation consumes eligibility from backend and storage contracts only.

### 10.3 Rendering prohibitions

- Rendering defining ownership, moderation, or role semantics;
- Rendering from undeclared authoritative sources;
- Rendering non-eligible inventory in public contexts;
- Rendering backend denial as success;
- Rendering product meaning not present in consumed contracts.

### 10.4 Performance Integrity at render boundary

Presentation must honor PRODUCT_ARCHITECTURE.md PROD-INV-14 and PLATFORM_ARCHITECTURE.md PLT-16:

- Incomplete operations must not render as complete;
- Hidden failure must not render as success;
- Latency must not compromise honest state representation.

---

## 11. Navigation and Routing Ownership

### 11.1 Architectural posture

Navigation and routing structure is an **architectural responsibility** of each experience surface. It defines **capability reachability** — not domain truth, authorization policy, or API layout.

### 11.2 Routing ownership model

| Routing concern | Owner | Architectural rule |
|-----------------|-------|---------------------|
| **Public consumer routes** | Public Experience Surface | Public and authenticated consumer capability reachability |
| **Professional routes** | Professional Experience Surface | Realtor-scoped capability reachability |
| **Governance routes** | Governance Experience Surface | Admin-scoped capability reachability |
| **Cross-surface entry points** | Shared Presentation Discipline | Declared transitions only — no ambient authority bleed |
| **Authentication-gated entry** | Access Consumption + surface gate | Protected routes require established identity context |

### 11.3 Routing invariants

| ID | Invariant |
|----|-----------|
| **FRN-NAV-1** | Routes realize capability reachability — not domain ownership |
| **FRN-NAV-2** | Role-scoped routes remain within owning surface trust boundary |
| **FRN-NAV-3** | Navigation must not grant capabilities without backend authorization |
| **FRN-NAV-4** | Public routes must not reach Professional or Governance capabilities |
| **FRN-NAV-5** | Routing structure must remain replaceable without altering backend contracts |

### 11.4 Routing prohibitions

- Routing as authorization policy definition;
- Routing that embeds domain business rules;
- Routing that merges trust boundaries;
- Routing that exposes governance capabilities on public paths;
- Routing that defines API endpoints or transport.

---

## 12. Client Capability Ownership

### 12.1 Capability definition

A **client capability** is a role-scoped presentation reachability unit — the frontend architectural obligation to make an approved marketplace capability accessible within an experience surface without owning its truth.

### 12.2 Capability ownership map

| Capability class | Owning surface | Truth owner (backend) |
|------------------|----------------|----------------------|
| Housing discovery presentation | Public | Housing Journey + Inventory (read) |
| Listing evaluation presentation | Public | Housing Journey + Inventory (read) |
| Continuity artifact presentation | Public | Engagement & Continuity |
| Inquiry initiation presentation | Public / Professional | Inquiry & Communication |
| Owner-scoped listing participation presentation | Professional | Professional Participation + Inventory |
| Professional profile presentation | Professional | Professional Participation |
| Publication participation presentation | Professional | Professional Participation + Inventory |
| Governance execution presentation | Governance | Governance Execution |
| Privileged audit presentation | Governance | Governance Execution + Observability consumption |

### 12.3 Capability rules

1. **Capabilities derive from approved product capabilities (PC-*)** — not from UI modules or feature backlogs;
2. **Each capability declares surface membership** — no capability without surface context;
3. **Capabilities consume backend contracts** — presentation does not invent capability semantics;
4. **Participation and execution remain separated** — Professional capabilities do not include governance execution presentation;
5. **Public capabilities expose only eligible state** — PROD-INV-12 enforced at presentation boundary.

### 12.4 Capability prohibitions

- Client capabilities redefining product meaning;
- Client capabilities owning authoritative state;
- Client capabilities bypassing backend contracts;
- Client capabilities merging lifecycle boundaries in presentation.

---

## 13. Backend Consumption Model

### 13.1 Architectural posture

The frontend **consumes** backend capabilities exclusively through the **API boundary** between Experience Systems and Backend Access Adaptation (BACKEND_ARCHITECTURE.md §14.1–§14.2).

The frontend never depends on backend internal structure — only on declared access contracts.

### 13.2 Consumption rules

| Rule | Requirement |
|------|-------------|
| **Contract-only access** | All reads and mutations invoke backend through declared contracts |
| **No persistence bypass** | Frontend must not access Data Persistence System |
| **No orchestration ownership** | Frontend does not perform Application Orchestration — it requests outcomes |
| **Honest outcomes** | Presentation reflects backend response state — not assumed state |
| **Mutation through contracts** | All governed mutations route through backend owning-domain paths |
| **Identity context attachment** | Protected operations attach consumed identity context per Security Standards |

### 13.3 Consumption by operation class

| Operation class | Frontend posture | Backend owner |
|-----------------|------------------|---------------|
| **Public reads** | Public Experience Surface consumes read contracts | Owning domain units |
| **Authenticated reads** | Surface consumes role-scoped read contracts | Owning domain units |
| **Participation mutations** | Professional Surface invokes mutation contracts | Owning domain services |
| **Governance mutations** | Governance Surface invokes governance contracts | Governance Realization Unit |
| **Media retrieval** | Surfaces consume authorized media access paths | Media Storage via backend |

### 13.4 Backend consumption prohibitions

- Frontend embedding domain invariants as client authority;
- Frontend caching mutations as truth without reconciliation;
- Frontend invoking backend internals or foreign persistence;
- Frontend presenting success before backend confirmation;
- Frontend redefining API contract semantics locally.

---

## 14. Interaction Model

### 14.1 Interaction with backend

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Frontend initiates; backend responds with honest authoritative or derived state |
| **Truth ownership** | Backend owns authoritative state; frontend owns presentation state only |
| **Contract** | Interaction occurs through API boundary — defined by API Standards |
| **Prohibited** | Frontend-driven domain mutation; authoritative state cached as truth without reconciliation |
| **Performance Integrity** | Frontend must not display completion before backend confirms authoritative outcome |

### 14.2 Interaction with identity and access

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Frontend consumes identity context; Identity & Access System owns session authority |
| **Ownership** | Frontend holds session presentation copy only |
| **Prohibited** | Client-side role interpretation as system truth; ambient authority elevation |
| **Gate points** | Access Consumption and surface entry require identity context for protected capabilities |

### 14.3 Interaction with API layer

The API layer is the **sole transport boundary** between frontend Access Consumption and backend Access Adaptation.

| Frontend declares | API Standards will define |
|-------------------|--------------------------|
| Frontend must not own domain truth | Endpoint layout, methods, payload schemas |
| Frontend must not bypass backend orchestration | Versioning, error format, transport protocol |
| Frontend must attach actor context | Authentication header conventions |
| Frontend must honor honest outcomes | Response envelope structure |

### 14.4 Interaction with media

| Aspect | Architectural rule |
|--------|-------------------|
| **Direction** | Frontend retrieves media through authorized backend or storage access paths |
| **Ownership** | Frontend presents media bytes; eligibility from backend contracts |
| **Prohibited** | Public media presentation without eligibility validation |

### 14.5 Standard interaction flows

**Read presentation flow:**

```
Actor → Experience Surface → Access Consumption (read contract)
    → Backend (authoritative response) → Presentation (derived view)
```

**Governed mutation presentation flow:**

```
Actor → Experience Surface → Access Consumption (mutation contract)
    → Backend (governed outcome) → Presentation (honest outcome state)
```

**Authentication-gated flow:**

```
Actor → Access Consumption (identity context) → Surface gate
    → Protected capability presentation
```

### 14.6 Prohibited interaction patterns

- Experience Surface → persistence direct access;
- Presentation → backend internal module access;
- Governance Surface → domain meaning redefinition;
- Public Surface → non-eligible state presentation;
- Cross-surface capability bleed without declared transition;
- Optimistic UI without reconciliation path.

---

## 15. Dependency Direction

### 15.1 Internal dependency law

```
L3 Presentation → L2 Application Composition → L1 Access Consumption
```

Interaction State (L4) and Shared Presentation Discipline (L5) constrain layers — they do not own domain truth or bypass Access Consumption for backend invocation.

### 15.2 External dependency law

```
Experience Surfaces → API Boundary → Backend (Application Platform System)
Experience Surfaces → Identity Consumption → Identity & Access System
```

Backend and Identity & Access System are **never** dependencies of frontend internal presentation modules in reverse. Frontend does not appear in backend dependency graphs.

### 15.3 Surface dependency matrix

| Surface | May consume | Must not depend on |
|---------|-------------|-------------------|
| Public Experience Surface | Backend public contracts, identity context, authorized media | Governance internals, persistence, foreign surface internals |
| Professional Experience Surface | Backend participation contracts, identity context, authorized media | Governance execution internals, CRM logic |
| Governance Experience Surface | Backend governance contracts, identity context, observability presentation | Domain meaning definitions, foreign surface internals |
| Shared Presentation Discipline | Surface contracts | Domain truth, backend internals |

### 15.4 Cross-surface dependency rule

```
Public (consumer) · Professional (participation) · Governance (execution presentation)
```

Surfaces must not form circular presentation dependencies. Governance presentation must not appear upstream of Professional participation presentation in capability reachability graphs.

---

## 16. Frontend State Principles

### 16.1 Core principles

1. **Presentation is not authority** — all marketplace truth originates from backend;
2. **Reconciliation is mandatory** — client state yields to backend on conflict;
3. **Minimize authoritative duplication** — cache only with declared invalidation discipline;
4. **Surface-local interaction state** — navigation and UI context remain within surface boundary;
5. **Explicit optimistic posture** — optimistic presentation must declare reconciliation expectation;
6. **Session presentation ≠ session authority** — Identity & Access System remains authoritative;
7. **Visibility is structural** — eligibility rules apply before state enters presentation pipeline.

### 16.2 State transition principles

| Transition | Frontend posture |
|------------|------------------|
| Backend success → presentation update | Render honest outcome state |
| Backend failure → presentation update | Render honest failure — no false completion |
| Backend pending → presentation update | Render pending state — not available |
| Cache stale → authoritative refresh | Reconcile presentation toward backend |
| Role change → surface transition | Re-evaluate capability reachability |

### 16.3 State principles inherited from product

| Inherited constraint | Frontend treatment |
|---------------------|-------------------|
| PROD-INV-11 | New realtor listings present moderated path — not public eligibility |
| PROD-INV-12 | Public presentation exposes only publicly eligible state |
| PROD-INV-14 | Performance Integrity at all presentation paths |
| PROD-INV-10 | Contact presentation sourced from profile contracts — not listing creation |

---

## 17. Frontend Architectural Invariants

These invariants apply frontend-wide. Implementation must not contradict them.

| ID | Invariant |
|----|-----------|
| **FRN-INV-1** | Frontend realizes Experience Systems — never authoritative marketplace truth owner |
| **FRN-INV-2** | Frontend preserves marketplace platform posture — not PMS, CRM, or agency operations |
| **FRN-INV-3** | Public, Professional, and Governance surfaces remain trust-boundary separable |
| **FRN-INV-4** | All authoritative state consumed from backend — never owned on client |
| **FRN-INV-5** | All mutations route through backend access contracts |
| **FRN-INV-6** | Presentation never bypasses Access Consumption for backend invocation |
| **FRN-INV-7** | Identity context required before protected capability presentation |
| **FRN-INV-8** | Public visibility exposes only publicly eligible state |
| **FRN-INV-9** | Contact presentation originates from professional profile contracts — never listing creation capture |
| **FRN-INV-10** | New realtor listings present moderated publication path before public eligibility |
| **FRN-INV-11** | Governance presentation honors delegated authority only |
| **FRN-INV-12** | Professional surfaces do not present governance execution semantics as participation |
| **FRN-INV-13** | Performance Integrity preserved in all client presentation paths |
| **FRN-INV-14** | Cached presentation reconciles with authoritative backend state |
| **FRN-INV-15** | Optimistic presentation reconciles on backend outcome |
| **FRN-INV-16** | Session presentation copy is not session authority |
| **FRN-INV-17** | Product lifecycles remain separable in frontend structure |
| **FRN-INV-18** | Surfaces interact with backend only through declared contracts |
| **FRN-INV-19** | Backend is never a dependency of frontend presentation internals in reverse |
| **FRN-INV-20** | Future capabilities require explicit frontend placement before integration |

PLT-1 through PLT-17, PROD-INV-1 through PROD-INV-17, and SYS-INV-6 remain authoritative upstream. FRN-INV invariants specialize them for frontend scope.

---

## 18. Scalability

### 18.1 Scalability definition (frontend scope)

Frontend scalability is architectural capacity to grow in surface scope, actor volume, and presentation complexity without structural collapse — not merely client resource scaling.

### 18.2 Scaling dimensions

| Dimension | Frontend architectural response |
|-----------|--------------------------------|
| **User traffic and presentation load** | Surface isolation; presentation scales independently of backend domain core |
| **Surface scope growth** | New presentation surfaces or governed extension points — not monolith absorption |
| **Contributor count** | Bounded surfaces with clear ownership enable parallel development |
| **Capability growth** | New client capabilities mapped to surfaces — not shared presentation kernel growth |
| **Geographic expansion** | Capability contracts stable; surfaces extend without merger |

### 18.3 Read-heavy vs mutation-sensitive separation

- **Read-heavy presentation paths** (public discovery, search consumption) must be architecturally separable from **mutation-sensitive paths** (listing participation, governance presentation);
- Read optimization must not compromise visibility rules or Performance Integrity;
- Governance presentation requires strict honesty regardless of scale.

### 18.4 Stateless vs stateful (frontend)

| Layer / Surface | Stateful? | Note |
|-----------------|-----------|------|
| Access Consumption | No — per-request | Horizontally scalable |
| Application Composition | Transient coordination only | No durable truth |
| Presentation | Derived state only | Reconciles with backend |
| Interaction State | Transient UI context | Must not become authoritative |
| Experience Surfaces | Presentation state only | Scale via surface isolation |

---

## 19. Maintainability

### 19.1 Maintainability outcomes

Frontend architecture must enable:

- **Local reasoning** — surface presentation rules understandable within surface boundary;
- **Bounded change** — modification in one surface does not require whole-frontend context;
- **Discoverable ownership** — every presentation rule traceable to a surface or layer;
- **Reviewable structure** — independent reviewer can verify compliance from documentation;
- **Teachable organization** — new contributors understand surfaces and layers without oral tradition;
- **Architectural testability** — presentation invariants verifiable within surface boundaries.

### 19.2 Maintainability rules

1. Equivalent presentation problems receive equivalent structural treatment across surfaces;
2. Visibility invariants live at Presentation boundary — not duplicated in Access Consumption as business rules;
3. Cross-cutting concerns flow through Shared Presentation Discipline — not embedded in surface domain logic;
4. Product Architecture and Platform vocabulary used consistently;
5. Technical debt recognized and bounded — not normalized through silence.

---

## 20. Replaceability

### 20.1 Replaceable units

| Unit | Replaceable when | Must preserve |
|------|------------------|---------------|
| Individual experience surface | Surface refactor | Surface capability reachability and trust boundary |
| Application Composition | Flow restructuring | Backend contract consumption and invariants |
| Access Consumption adapters | API transport change | Contract invocation semantics |
| Entire frontend runtime | Technology era change | Surface map, FRN invariants, trust boundaries |

### 20.2 Non-replaceable without governance

| Element | Authority required |
|---------|-------------------|
| Experience surface map | Frontend Architecture amendment |
| Trust boundary placement | Frontend Architecture + Security Architecture review |
| FRN invariant changes | Constitutional or product authority review where product meaning affected |
| Cross-surface contract breaking change | System Architecture + API Standards review |

---

## 21. Extensibility

### 21.1 Extension model

New frontend capability extends through:

1. Documented architectural gap;
2. Impact assessment against product authority, PROD-INV, PLT invariants, and FRN invariants;
3. Placement decision: new surface capability, new composition flow, or Shared Presentation Discipline extension;
4. Explicit approval before structural integration.

### 21.2 Extension points

Shared Presentation Discipline maintains extension registry for declared presentation extension points. Undeclared extension is prohibited.

### 21.3 Future capability discipline

Future capabilities (AI assistance, maps, live updates, chat, push synchronization, real-time collaboration) require independent architectural evaluation per Product Chapters 63 and 64 before receiving frontend placement. They do not automatically create new experience surfaces.

Current implementation artifacts do not constitute frontend architectural authority and require independent evaluation before formal placement.

### 21.4 Extension anti-patterns

- Feature-as-screen without surface placement;
- Shared presentation module absorbing all new behavior;
- Extension through foreign surface internals;
- Product lifecycle expansion without lifecycle separation review;
- Presentation growth absorbing backend domain rules.

---

## 22. Downstream Consumers

The following future documents will consume Frontend Architecture. Their content is **not defined here**.

| Future standard | Consumption relationship |
|-----------------|-------------------------|
| **API Standards** | Transport contracts between Access Consumption and backend Access Adaptation |
| **Security Standards** | Identity context consumption; surface gate enforcement |
| **Development Standards** | Implementation conventions within frontend structure |
| **Implementation Governance** | Compliance verification against FRN invariants |

### Consumption model

Downstream standards must:

1. Declare Frontend Architecture as consumed authority;
2. Operate within surfaces and layers defined here;
3. Not redefine frontend responsibilities;
4. Not contradict FRN-INV invariants;
5. Reference — not duplicate — frontend structure definitions.

---

## 23. Prohibited Scope

This document must not define:

- React, Vue, Angular, Svelte, or any UI framework;
- Next.js, Remix, or any meta-framework;
- TypeScript, JavaScript, or any programming language;
- HTML, CSS, Tailwind, or styling implementation;
- Component libraries, design tokens, or visual specifications;
- Screen layouts, wireframes, or interaction micro-specifications;
- REST, GraphQL, HTTP, WebSocket, or transport protocols;
- Endpoint paths, request formats, response DTOs, or OpenAPI;
- Database schemas, persistence, or caching products;
- Authentication mechanisms, token formats, or cryptographic policy;
- Docker, CDN, edge deployment, or infrastructure topology;
- CI/CD pipelines, testing frameworks, or lint tools;
- Browser APIs, service workers, or platform-specific implementation;
- Product features, roles, journeys, or UX decisions;
- Phase 4 Product Development Methodology.

---

## 24. Terminology

| Term | Meaning |
|------|---------|
| **Frontend** | Client-side realization of Experience Systems |
| **Experience Surface** | Role-scoped presentation subsystem — Public, Professional, or Governance |
| **Experience System** | SYSTEM_ARCHITECTURE.md component realizing Experience Access domain |
| **Access Consumption** | Layer invoking backend contracts without owning response semantics |
| **Application Composition** | Multi-step presentation flow coordination within a surface |
| **Presentation** | Role-scoped view rendering without domain truth ownership |
| **Interaction State** | Transient UI and navigation context — non-authoritative |
| **Shared Presentation Discipline** | Cross-surface invariants and capability gates |
| **Derived presentation state** | Non-authoritative state computed from backend responses |
| **Capability reachability** | Structural rule determining which capabilities a surface may present |
| **Trust boundary** | Security perimeter between Public, Professional, and Governance surfaces |
| **API boundary** | Transport contract surface between frontend and backend — not defined here |
| **Performance Integrity** | Honest representation of operation progress and completion on the client |
| **Visibility eligibility** | Structural rule determining what state may enter presentation pipeline |
| **Optimistic presentation posture** | Temporary UI state awaiting backend reconciliation |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, PRODUCT_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 25. Document Status

| Item | Value |
|------|-------|
| **Authority class** | Authoritative frontend architecture |
| **Phase** | Frontend Architecture — Phase 3 domain standard (unnumbered step per MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`) |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md (structural matters) · SYSTEM_ARCHITECTURE.md (Experience Systems) |
| **Compatible with** | PRODUCT_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md |
| **Does not authorize** | Implementation; technology selection; Phase 3 completion; product modification |
| **Prerequisites** | Constitution, Principles, Platform Architecture, Product Architecture, System Architecture, Backend Architecture, Repository Standards — satisfied |

---

**Document path:** `docs/engineering/FRONTEND_ARCHITECTURE.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/PRODUCT_ARCHITECTURE.md` · `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/engineering/ARCHITECTURE_PRINCIPLES.md` · `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
