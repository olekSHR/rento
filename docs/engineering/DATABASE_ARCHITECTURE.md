# Rento Database Architecture

**Status:** PUBLISHED — Database Architecture  
**Authority class:** Authoritative persistence architecture  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Purpose

This document defines **enterprise persistence architecture governance** for the Rento platform.

It establishes how authoritative marketplace truth is durably represented, owned, evolved, and governed across the system — without specifying storage technology, data definition language, mapping frameworks, or operational implementation.

This document answers:

- What persistence architecture owns versus what upstream architecture owns;
- How authoritative data ownership maps to platform domains and system components;
- How aggregate boundaries, transaction scope, and consistency guarantees are governed;
- How read persistence and write persistence remain architecturally distinct;
- How schema evolution, migration, historical data, archive, and audit persistence are governed;
- How operational persistence differs from analytical persistence;
- How storage abstraction preserves replaceability and technology independence;
- What persistence invariants apply platform-wide;
- What downstream standards may consume from this authority.

This document is **persistence architecture governance**, not database design, ORM design, or storage implementation.

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
                        ├── Backend architecture (BACKEND_ARCHITECTURE.md)
                        └── Database architecture (this document)
                            → Database Standards · Infrastructure persistence standards (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | How engineering thinks structurally | Applies principles to persistence governance |
| PLATFORM_ARCHITECTURE.md | Bounded domains and platform invariants | Maps persistence ownership to domain boundaries |
| SYSTEM_ARCHITECTURE.md | System components and state classification | Specializes Data Persistence System governance |
| BACKEND_ARCHITECTURE.md | Persistence ownership declarations and transaction boundaries | Extends with persistence-specific governance — does not duplicate ownership map |
| PRODUCT_ARCHITECTURE.md | Product-to-engineering translation | Consumes capability truth classes — does not redefine |
| API Standards | Contract governance at access boundary | Consumes read/write separation — does not define persistence |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for governance placement — does not redefine |

### 2.3 What this document owns

- Enterprise persistence architecture governance;
- Authoritative data ownership model at persistence scope;
- Aggregate ownership and aggregate persistence boundaries;
- Storage responsibility classification;
- Transaction ownership and transaction boundary governance;
- Consistency governance and eventual consistency boundaries;
- Read persistence and write persistence governance;
- Schema evolution and migration governance at architectural level;
- Referential integrity governance principles;
- Historical data, archive, and audit persistence governance;
- Operational versus analytical data separation;
- Storage independence and abstraction governance;
- Persistence lifecycle governance;
- Database invariants and dependency direction;
- Downstream consumption model.

### 2.4 What this document does not own

- Product behavior, experience meaning, or user workflows;
- Platform domain definitions (PLATFORM_ARCHITECTURE.md);
- Backend layer structure and orchestration (BACKEND_ARCHITECTURE.md);
- API contract specification (API Standards);
- Authentication, authorization, or cryptographic policy (Security Standards);
- Infrastructure deployment, backup execution, or replication implementation (Infrastructure Standards);
- Storage technology selection, data definition syntax, mapping frameworks, or query languages;
- Physical schema design, indexes, partitions, sharding, or storage engine configuration;
- Implementation tasks, migration scripts, or delivery methodology.

### 2.5 Amendment

This document may be amended only through explicit governance review per REPOSITORY_STANDARDS.md. Amendments must preserve product authority supremacy, constitutional compliance, and extension-not-replacement discipline.

---

## 3. Relationship to Upstream Authority

### 3.1 Constitutional and principles consumption

Persistence architecture **implements** PROJECT_CONSTITUTION.md and ARCHITECTURE_PRINCIPLES.md at the durability layer. It honors:

- **EP-7 / AP-16** — ownership clarity and immutable domain rule fidelity;
- **AP-3** — separation of concerns between domain truth, persistence mechanics, and presentation;
- **AP-7** — replaceability of storage realization without product meaning change;
- **AP-20 / AP-21** — state legibility and Performance Integrity in durable representations;
- **AP-25** — governed evolution of persistence structure.

Constitutional governance gates and prohibited activities are not restated here.

### 3.2 Product authority consumption

Persistence architecture **consumes** approved product architecture without redefinition:

| Product constraint | Persistence governance treatment |
|--------------------|----------------------------------|
| Mandatory lifecycle separation (PRODUCT_ARCHITECTURE.md §5.1) | Persistence structures preserve lifecycle boundaries — no merged authoritative stores across lifecycles |
| Participation–execution separation (PRODUCT_ARCHITECTURE.md §6.3) | Participation records and governance execution records remain persistently separable |
| Immutable domain rules (ENGINEERING_HANDOFF.md §5.5) | Ownership, moderation flow, contact sourcing, and role model enforced at persistence authorization boundaries |
| Performance Integrity (Product Chapter 63) | Durable state must not encode false completion or hidden partial success |
| Marketplace posture (PLT-1) | Persistence must not structurally support PMS, CRM, or agency operations data models |

### 3.3 Platform and system consumption

Persistence architecture **realizes** PLATFORM_ARCHITECTURE.md and SYSTEM_ARCHITECTURE.md persistence responsibilities:

- Data Persistence System (SYSTEM_ARCHITECTURE.md §6 Component 6) provides durability mechanics;
- Application Platform System and Identity & Access System declare authoritative state ownership;
- State classification from SYSTEM_ARCHITECTURE.md §10 governs what may be persisted as truth versus evidence, cache, or operational state.

### 3.4 Backend consumption

BACKEND_ARCHITECTURE.md declares **which domain unit owns which authoritative state class** and **transaction boundary ownership**. This document **extends** those declarations with persistence governance — it does not replace the ownership map.

| Backend declaration | Database architecture extension |
|---------------------|--------------------------------|
| Persistence ownership map (BACKEND_ARCHITECTURE.md §11.2) | Aggregate boundaries, consistency scope, and lifecycle rules per state class |
| Transaction boundaries (BACKEND_ARCHITECTURE.md §10.6) | Consistency guarantees, compensation posture, and cross-aggregate coordination governance |
| Persistence boundary rules (BACKEND_ARCHITECTURE.md §11.3) | Referential integrity, read/write separation, and storage abstraction rules |
| L4 Persistence Boundary layer (BACKEND_ARCHITECTURE.md §6.5) | Architectural routing discipline — not implementation |

### 3.5 Non-duplication rule

Upstream documents own their definitions. This document **references and extends** — it does not restate platform domain catalogs, backend layer models, API contract rules, or product lifecycle tables.

---

## 4. Persistence Responsibility Boundaries

### 4.1 Persistence architecture scope

Persistence architecture governs **how durable state is authorized, bounded, evolved, and classified** across the platform. It governs structure of authority at the durability layer — not the mechanics of storage.

### 4.2 Responsibility matrix

| Responsibility | Owner | Persistence role |
|----------------|-------|------------------|
| Marketplace domain truth | Application Platform System — per domain unit | Authoritative durable records owned by declaring unit |
| Identity and role context truth | Identity & Access System | Authoritative durable identity records — outside Application Platform ownership |
| Durability mechanics | Data Persistence System | Provides storage and retrieval capability — does not decide domain ownership |
| Media bytes | Media Storage System | Object storage — references owned by domain units |
| Delivery and queue state | Notification & Messaging System | Transient and operational — not domain truth |
| Telemetry and audit evidence | Observability System | Evidence and operational legibility — not domain truth replacement |
| Domain invariants and transitions | Domain realization units (backend) | Enforce before persistence authorization |
| Persistence authorization routing | Persistence Boundary (backend L4) | Route writes to owning aggregate authority |
| Storage technology realization | Database Standards (future) | Implements governance defined here |

### 4.3 Boundary classes

| Boundary | Separates |
|----------|-----------|
| **Truth ↔ Durability** | Domain meaning from storage mechanism |
| **Authoritative ↔ Derived** | Owned records from computed projections |
| **Authoritative ↔ Evidence** | Domain state from audit and trace records |
| **Operational ↔ Analytical** | Runtime persistence from analysis-oriented copies |
| **Write ↔ Read** | Mutation authority from read optimization surfaces |
| **Domain ↔ Integration** | Owned aggregates from foreign subsystem state |

### 4.4 Prohibited boundary crossings

- Persistence layer defining product behavior or domain invariants;
- Storage schema dictating domain meaning (AP-3 inversion);
- Cross-domain write without owning aggregate authority;
- Analytical store treated as authoritative source;
- Audit or telemetry records replacing domain state;
- Client or API layer persisting authoritative truth directly.

---

## 5. Data Ownership

### 5.1 Single authoritative owner principle

Every persistently stored **authoritative record** has exactly **one owning authority** — the domain realization unit or system component that owns the corresponding state class per SYSTEM_ARCHITECTURE.md §10 and BACKEND_ARCHITECTURE.md §11.2.

No record class may have shared mutable ownership. Shared read access does not confer write authority.

### 5.2 Ownership classes

| Ownership class | Definition | Write authority |
|-----------------|------------|-----------------|
| **Domain authoritative** | Marketplace truth defining product-visible reality | Owning domain realization unit only |
| **Identity authoritative** | Identity and role binding truth | Identity & Access System only |
| **Evidence** | Record of action, decision, or observation | Producing authority — append-oriented; does not mutate domain truth |
| **Operational** | System health, deployment, queue, replication status | Owning cross-cutting component |
| **Derived projection** | Materialized view of authoritative state | Regenerable from authoritative sources — not independent truth |
| **Analytical copy** | Analysis-oriented duplicate | Never authoritative — subordinate to operational authoritative stores |

### 5.3 Ownership invariants

| ID | Invariant |
|----|-----------|
| **DB-OWN-1** | Every authoritative record class has exactly one declared owning authority |
| **DB-OWN-2** | Write authorization requires owning authority confirmation — not reader or consumer authority |
| **DB-OWN-3** | Ownership cannot transfer through persistence convenience, bulk import, or operational repair without governed domain path |
| **DB-OWN-4** | Foreign ownership fields are immutable outside governed domain transitions (aligned with PLT-2, PLT-7) |
| **DB-OWN-5** | Moderation and publication state ownership remains with Inventory domain — Governance Execution produces outcomes, not parallel truth (PLT-5) |

### 5.4 Consumption without ownership

Domains and components may **read** foreign authoritative state only through declared query contracts (BACKEND_ARCHITECTURE.md §10.4). Read consumption does not grant persistence write access to foreign aggregates.

---

## 6. Aggregate Ownership

### 6.1 Aggregate definition

An **aggregate** is the smallest persistence unit that:

1. Enforces a cohesive set of domain invariants together;
2. Defines a single consistency boundary for authoritative mutation;
3. Identifies one **aggregate root** as the sole entry point for governed changes;
4. Maps to exactly one owning domain realization unit or system component.

Aggregates are **architectural persistence boundaries**, not implementation collections.

### 6.2 Aggregate authority

| Concept | Owner |
|---------|-------|
| Aggregate identity and lifecycle | Owning domain realization unit |
| Aggregate root selection | Owning domain realization unit |
| Invariant enforcement before durability | Domain service — not persistence layer |
| Persistence routing to aggregate | Persistence Boundary |
| Cross-aggregate orchestration scope | Application Orchestration |

The persistence layer **stores** aggregate state. It does **not** define aggregate meaning or invariants.

### 6.3 Aggregate ownership map (architectural)

Aggregates align with BACKEND_ARCHITECTURE.md §11.2 state classes. Illustrative aggregate families — not schema definitions:

| Aggregate family | Owning authority | Root responsibility |
|------------------|------------------|---------------------|
| **Listing inventory** | Inventory Realization Unit | Listing entity with ownership binding and publication state |
| **Professional profile** | Professional Participation Realization Unit | Profile as contact source authority |
| **Inquiry artifact** | Inquiry Realization Unit | Inquiry record and communication continuity anchor |
| **Continuity artifact** | Continuity Realization Unit | Saved search or saved property reference aggregate |
| **Housing journey context** | Housing Journey Realization Unit | Journey progression anchor |
| **Tenancy context** | Tenancy Context Realization Unit | Tenancy relationship context — non-operational |
| **Trust meaning structure** | Trust Realization Unit | Integrity and trust-class records |
| **Governance execution record** | Governance Realization Unit | Delegated action outcome record |
| **Identity record** | Identity & Access System | Identity and role binding — outside backend domain units |

Aggregate boundaries must not merge participation records with governance execution records or collapse lifecycle-separated contexts into a single root.

### 6.4 Aggregate prohibitions

- Multi-domain aggregate roots;
- Shared mutable aggregate without single owner;
- Aggregate roots selected for storage convenience rather than invariant cohesion;
- Client-defined or API-defined aggregate boundaries;
- Persistence framework annotations or storage layout as aggregate authority.

---

## 7. Aggregate Persistence Boundaries

### 7.1 Intra-aggregate rule

All authoritative mutations within one aggregate occur within **one consistency scope** owned by the aggregate's domain unit. Partial intra-aggregate persistence without domain confirmation is prohibited.

### 7.2 Inter-aggregate rule

Mutations spanning aggregates require **explicit orchestration** with declared transaction ownership per BACKEND_ARCHITECTURE.md §10.6. Silent cross-aggregate writes through shared persistence access are prohibited.

### 7.3 Boundary interaction types

| Interaction | Permitted pattern | Prohibited pattern |
|-------------|-------------------|-------------------|
| **Reference by identity** | Aggregate holds foreign identifier — resolves via query contract | Foreign aggregate internal mutation |
| **Outcome fact** | Governance aggregate records outcome — target aggregate applies governed transition | Dual writable copies of same truth |
| **Derived enrichment** | Read-time composition | Persisting foreign truth as owned field without authority |
| **Event notification** | Post-commit signal after authoritative persistence | Pre-commit foreign mutation based on anticipated success |

### 7.4 Persistence boundary invariants

| ID | Invariant |
|----|-----------|
| **DB-AGG-1** | One aggregate root per aggregate — single mutation entry point |
| **DB-AGG-2** | Cross-aggregate consistency expectations are declared before integration — not inferred from storage layout |
| **DB-AGG-3** | No aggregate spans platform lifecycle boundaries (PROD-INV-2) |
| **DB-AGG-4** | Evidence aggregates (audit) do not mutate authoritative domain aggregates |
| **DB-AGG-5** | Derived projections are not aggregate roots |

---

## 8. Persistence Responsibilities

### 8.1 Data Persistence System responsibilities

Per SYSTEM_ARCHITECTURE.md §6 Component 6, the Data Persistence System:

| Responsibility | Architectural scope |
|----------------|---------------------|
| Durability | Persist and retrieve authorized aggregate state |
| Isolation support | Enforce ownership routing — not business rules |
| Transaction support | Provide consistency mechanism at infrastructure level — scope declared by orchestration |
| Recovery support | Enable restoration of authorized durable state — policy in infrastructure standards |
| Abstraction | Expose storage capability without exposing domain policy |

### 8.2 Domain unit persistence responsibilities

Each owning authority:

1. Declares its aggregate catalog and authoritative record classes;
2. Authorizes writes only through domain service confirmation;
3. Defines legitimate state transitions before durability;
4. Publishes query contracts for authorized foreign reads;
5. Declares lifecycle rules for its aggregates (mutable, append-only, immutable-after-commit);
6. Participates in orchestrated multi-aggregate consistency declarations.

### 8.3 Persistence Boundary responsibilities

The backend Persistence Boundary (L4):

1. Routes authorized writes to correct owning storage scope;
2. Rejects unauthorized cross-unit write attempts;
3. Separates command persistence from query projection persistence where architecturally required;
4. Ensures commit ordering honors Performance Integrity — no premature outward signals.

### 8.4 Non-responsibilities

Persistence architecture does **not**:

- Define domain invariants;
- Execute governance decisions;
- Perform authorization policy (consumes authorization outcomes);
- Own API response shape;
- Own analytical reporting semantics;
- Select storage products or define physical layout.

---

## 9. Transaction Governance

### 9.1 Transaction authority

**Transaction ownership** declares who defines consistency scope for a multi-step operation — not which storage mechanism implements it.

| Operation class | Transaction authority | Consistency expectation |
|-----------------|----------------------|-------------------------|
| **Single-aggregate mutation** | Owning domain unit | Atomic within aggregate boundary |
| **Multi-aggregate mutation** | Application Orchestration | Declared cross-aggregate consistency — all-or-none or declared compensation |
| **Governance execution flow** | Application Orchestration + Governance unit | Governance outcome and target transition — partial presentation prohibited (BCK-TXN-2) |
| **Read-only composition** | Application Orchestration | No mutation transaction scope |
| **Background deferred mutation** | Same as synchronous equivalent | Inherits identical ownership and scope (BCK-TXN-4) |

### 9.2 Transaction boundary rules

1. **Explicit declaration** — multi-domain mutations declare transaction ownership before integration (BCK-TXN-1);
2. **Honest failure** — failure does not present partial success as complete (BCK-TXN-2);
3. **Declared compensation** — partial completion recovery follows orchestration-declared posture (BCK-TXN-3);
4. **Commit before signal** — events, notifications, and user-visible outcomes follow authoritative persistence (BACKEND_ARCHITECTURE.md §15);
5. **No ambient transactions** — consistency scope is intentional, not framework-default.

### 9.3 Transaction prohibitions

- Distributed transaction scope declared without orchestration authority;
- Long-running interactive transactions holding authoritative locks across user wait time;
- Transaction boundaries spanning lifecycle boundaries without explicit governance approval;
- Persistence auto-commit bypassing domain confirmation;
- Background jobs with wider write scope than synchronous equivalent.

Implementation isolation levels, locking strategies, and timeout mechanics belong to Database Standards — not this document.

---

## 10. Consistency Governance

### 10.1 Consistency classes

| Class | Definition | When permitted |
|-------|------------|----------------|
| **Strong consistency** | All participants observe authoritative state change as one logical unit | Intra-aggregate mutations; orchestrated multi-aggregate mutations with declared atomic expectation |
| **Authoritative eventual consistency** | Temporary divergence between authoritative stores resolved by declared reconciliation | Cross-component propagation with explicit reconciliation owner and bounded staleness rules |
| **Derived eventual consistency** | Projections lag authoritative sources | Read models, search indexes, dashboards — must reconcile |
| **Operational eventual consistency** | Non-truth state converges | Telemetry, delivery status, queue depth |

### 10.2 Consistency authority

| Decision | Owner |
|----------|-------|
| Strong vs eventual for a flow | Application Orchestration with domain unit input |
| Reconciliation ownership | Owner of authoritative source — never projection consumer |
| Maximum staleness for derived reads | Declaring domain unit for visibility-sensitive reads |
| Public eligibility consistency | Inventory + Trust domains — public reads must not expose pre-moderation truth (PLT-3, PLT-11) |

### 10.3 Eventual consistency boundaries

Eventual consistency is **permitted only where explicitly declared**. Undeclared eventual consistency is prohibited for:

- Ownership and publication state visible publicly;
- Governance execution outcomes affecting role or moderation state;
- Financially or legally sensitive readiness records if ever persisted;
- Performance Integrity-sensitive completion signaling paths.

### 10.4 Consistency invariants

| ID | Invariant |
|----|-----------|
| **DB-CON-1** | Authoritative sources reconcile before derived projections claim truth |
| **DB-CON-2** | Eventual consistency requires named reconciliation owner and trigger |
| **DB-CON-3** | Public visibility reads honor authoritative eligibility — not projection lag excuses |
| **DB-CON-4** | Cross-domain strong consistency requires orchestration declaration — not implicit storage coupling |

---

## 11. Read Persistence Governance

### 11.1 Read authority model

Read persistence is governed separately from write persistence. **Query ownership** (BACKEND_ARCHITECTURE.md §10.5) defines who authorizes read semantics and visibility — not how reads are stored or cached.

### 11.2 Read persistence classes

| Class | Definition | Governance |
|-------|------------|------------|
| **Authoritative read** | Direct read of owning aggregate state | Visibility rules enforced by owning unit |
| **Contract read** | Cross-domain read via published query contract | Consumer honors visibility — no persistence bypass |
| **Composite read** | Orchestration aggregates multiple contracts | Orchestration does not redefine visibility |
| **Projection read** | Read from derived materialization | Must declare source aggregates and staleness rules |
| **Cache read** | Performance copy | Must reconcile — cache is never authoritative (SYS §10.2) |

### 11.3 Read persistence rules

1. **No persistence bypass** — cross-domain reads consume query contracts, not foreign storage internals (BCK-QRY-3);
2. **Visibility inheritance** — read surfaces inherit eligibility rules from owning domains and PRODUCT_ARCHITECTURE visibility constraints;
3. **Honest staleness** — projections and caches exposing user-visible state must declare reconciliation or freshness posture where product truth requires it;
4. **Read optimization subordination** — indexes, denormalization, and materializations serve authorized reads — they do not create alternate truth;
5. **Public read restriction** — only publicly eligible authoritative state may populate public read persistence paths.

### 11.4 Read prohibitions

- Shared read-write persistence surface without write authority check;
- Denormalized foreign fields writable without owning aggregate authority;
- Search or ranking persistence owning publication or moderation truth;
- Client-local persistence treated as authoritative for marketplace state.

---

## 12. Write Persistence Governance

### 12.1 Write authority model

Every authoritative write requires:

```
Actor context → Authorization validation → Domain service confirmation → Persistence authorization → Commit
```

Writes that skip domain confirmation are prohibited regardless of storage path.

### 12.2 Write persistence classes

| Class | Description | Authority |
|-------|-------------|-----------|
| **Domain mutation write** | Governed transition of authoritative aggregate | Owning domain unit |
| **Append-only evidence write** | Audit or trace record | Producing authority — append only |
| **Projection refresh write** | Regeneration from authoritative source | Projection owner — subordinate |
| **Operational write** | System health or deployment record | Cross-cutting component |
| **Reconciliation write** | Correction restoring authoritative truth | Owning domain unit via governed path — not ad hoc operations |

### 12.3 Mutable versus immutable records

| Record mutability | Governance |
|-------------------|------------|
| **Mutable authoritative** | State transitions through governed domain paths only |
| **Immutable-after-commit** | Corrections require compensating governed records — not silent overwrite |
| **Append-only** | Audit, governance evidence, historical event logs |
| **Regenerable** | Derived projections — may be rebuilt from authoritative sources |

Lifecycle ownership declares mutability class at aggregate level. Implementation storage layout does not determine mutability.

### 12.4 Write prohibitions

- Direct mutation of ownership, moderation status, or role binding outside governed paths (PLT-5, PLT-6, PLT-7);
- Bulk write tools that bypass domain authorization;
- Write-through cache treating cache as authoritative;
- Persistence triggers that mutate foreign aggregates;
- Contact capture at listing creation persistence (PLT-4, PROD-INV-10).

---

## 13. Schema Evolution Governance

### 13.1 Schema as architectural artifact

Persistent structure is an **architectural artifact** subject to governance — not an implementation detail exempt from review. Schema evolution extends platform capability through governed change.

### 13.2 Evolution authority

| Change class | Authority required |
|--------------|-------------------|
| Intra-aggregate field addition (non-breaking) | Domain standard review |
| New aggregate introduction | Platform or database architecture review |
| Cross-aggregate reference change | Owning units + orchestration review |
| Breaking persistence contract change | Explicit migration authority + lineage documentation |
| Lifecycle boundary affecting persistence | Product authority + platform architecture review |

### 13.3 Schema evolution principles

1. **Extension over replacement** — additive evolution preferred; breaking change requires justification (AP-8);
2. **Domain ownership preserved** — schema change does not transfer aggregate ownership;
3. **Product meaning stable** — persistence evolution does not redefine product truth (LP-5);
4. **Compatibility declaration** — each evolution declares backward compatibility posture;
5. **Dual-behavior prohibition** — implicit parallel schemas without migration authority are prohibited.

### 13.4 Schema evolution prohibitions

- Schema change that redefines moderation, ownership, or role semantics;
- Silent removal of audit legibility fields;
- Merging lifecycle-separated structures for storage convenience;
- Undocumented breaking change in production persistence;
- Product-driven behavior change smuggled through schema-only deployment.

Physical migration scripts, rollout sequencing, and rollback mechanics belong to Database Standards and Infrastructure Standards.

---

## 14. Migration Governance

### 14.1 Migration definition

A **migration** is any governed transformation of persistent structure or persistent data classification that affects authoritative truth, read surfaces, or reconciliation behavior.

### 14.2 Migration authority

| Migration type | Declaring authority | Approval |
|----------------|---------------------|----------|
| **Structural migration** | Owning domain unit + database architecture review | Independent review before execution authorization |
| **Data classification migration** | Owning domain unit | Domain + persistence governance review |
| **Projection rebuild** | Projection owner | Subordinate — must not alter authoritative truth |
| **Storage replacement** | Infrastructure + database architecture | Preservation of ownership map and invariants required |
| **Archive migration** | Owning domain unit + archive governance review | Product and legal retention constraints honored |

### 14.3 Migration principles

1. **Traceability** — every migration links to governance basis and version lineage;
2. **Ownership continuity** — migration does not orphan records without owner;
3. **Truth preservation** — migration validates authoritative integrity before cutover;
4. **Reversibility posture declared** — rollback or forward-fix strategy explicit for authoritative migrations;
5. **No implementation-without-authorization** — migration execution requires implementation authorization separate from architecture publication.

### 14.4 Migration prohibitions

- Production migration without approved persistence governance review;
- Cross-domain data merge migration without orchestration declaration;
- Migration that removes governance audit legibility;
- Migration driven solely by storage vendor defaults;
- Migration that conflates operational cleanup with authoritative truth correction without domain path.

---

## 15. Referential Integrity Governance

### 15.1 Integrity model

Referential integrity governs **relationship validity** between persistent records — at the architectural level. Enforcement may be realized through domain validation, storage constraints, or both — realization belongs to Database Standards.

### 15.2 Integrity classes

| Class | Definition | Primary enforcer |
|-------|------------|------------------|
| **Ownership integrity** | Owned records reference valid owner identity | Owning domain unit |
| **Lifecycle integrity** | State references valid for current lifecycle phase | Owning domain unit |
| **Cross-aggregate reference integrity** | Foreign identifiers resolve to existing authorized records | Source aggregate owner + contract |
| **Eligibility integrity** | Public references resolve only to publicly eligible records | Inventory + Trust domains |
| **Evidence integrity** | Audit records reference valid execution context | Governance + Observability |

### 15.3 Integrity rules

1. **Domain-first enforcement** — integrity rules originate from domain invariants, not storage convenience;
2. **No orphan authoritative records** — records without valid ownership classification are prohibited;
3. **Cascade governance** — cascading effects across aggregates require explicit orchestration — not implicit storage cascade defaults;
4. **Deletion governance** — authoritative record removal follows lifecycle and archive rules — not physical delete convenience;
5. **Reference-only cross-domain** — cross-domain relationships use identifiers and contracts — not writable embedded foreign truth.

### 15.4 Integrity prohibitions

- Storage-level cascade that mutates foreign domain aggregates without domain authorization;
- Nullable ownership fields on authoritative marketplace records;
- Hard delete of governance evidence without archive governance approval;
- Referential links that bypass visibility eligibility rules.

---

## 16. Historical Data Governance

### 16.1 Historical truth definition

**Historical data** is durable record of past authoritative state or past events retained for legibility, audit, reconciliation, or product continuity — distinct from current authoritative truth.

### 16.2 Historical record classes

| Class | Purpose | Mutability |
|-------|---------|------------|
| **State history** | Prior values of authoritative attributes | Append-only or version-chain — not silent overwrite |
| **Transition history** | Record of governed state changes | Append-only |
| **Governance evidence history** | Moderation, role grant, verification execution record | Append-only — SYS §10.2 rule 6 |
| **Participation history** | Realtor or user participation events | Append-oriented |
| **Superseded projection history** | Prior projection versions | Regenerable or append-only |

### 16.3 Historical truth rules

1. **Current truth separate** — historical records supplement — never replace — current authoritative state without governed transition;
2. **Historical legibility** — material domain transitions retain trace sufficient for moderation and ownership dispute reasoning;
3. **No historical rewrite** — correction adds compensating records — does not erase evidentiary chain without governed archive policy;
4. **Product continuity** — historical data supports honest stale-state comprehension (Product Chapter 63) — not deceptive presentation;
5. **Lifecycle-bound retention** — retention scope declared per aggregate family — indefinite retention is not default.

Implementation retention periods and storage tiering belong to Database Standards and Infrastructure Standards.

---

## 17. Archive Governance

### 17.1 Archive definition

**Archive** is the governed transition of persistent records from active operational access classification to retained-but-subordinate classification — preserving lineage without continuing to treat archived records as current authoritative truth.

### 17.2 Archive eligibility

| Eligible | Not eligible without explicit governance |
|----------|------------------------------------------|
| Superseded non-current authoritative versions | Current authoritative marketplace truth |
| Expired continuity artifacts past declared retention | Governance evidence within mandatory legibility window |
| Regenerable projection generations | Records under active dispute or moderation review |
| Operational logs past retention policy | Identity and role binding required for active authorization |

Archive eligibility is declared by **owning authority** per aggregate family — not by storage capacity pressure alone.

### 17.3 Archive rules

1. **Archive is classification change** — not ambiguous delete;
2. **Archive does not erase lineage** — trace to original record identity preserved;
3. **Restore requires governance** — reactivation from archive follows governed domain path;
4. **Public visibility exclusion** — archived records must not appear in public eligibility paths;
5. **Archive separation** — archived operational copies must not pollute analytical authoritative claims.

### 17.4 Archive prohibitions

- Archiving as substitute for governed deletion of current truth;
- Archive storage treated as writable authoritative source;
- Mandatory governance evidence archived below audit legibility requirements;
- Silent archive without owning authority declaration.

---

## 18. Operational vs Analytical Data

### 18.1 Classification

| Dimension | Operational data | Analytical data |
|-----------|------------------|-----------------|
| **Purpose** | Runtime marketplace and system operation | Measurement, reporting, aggregation, exploration |
| **Authority** | Authoritative or operational per SYS §10 | Never authoritative |
| **Mutability** | Governed by domain or component rules | Rebuildable from sources |
| **Consistency** | Strong or declared eventual for truth | Lagging copies acceptable with declared scope |
| **Product impact** | Direct — affects visible marketplace truth | Indirect — must not feed back as truth without governed promotion |
| **Examples** | Listing records, profiles, governance outcomes | Dashboard aggregates, trend reports, search analytics |

### 18.2 Separation rules

1. **One-way flow default** — operational authoritative stores feed analytical copies — not reverse;
2. **No analytical write-back** — analytical processing does not mutate authoritative aggregates without domain command path;
3. **Separate storage scope** — analytical persistence is logically separable from operational authoritative persistence;
4. **Labeling requirement** — analytical copies declare source authoritative aggregates and extraction time;
5. **Product metric boundary** — engineering metrics and analytical counts do not redefine product experience meaning (Constitution §6.4).

### 18.3 Operational data scope

Operational data includes:

- Authoritative domain records;
- Evidence and audit records;
- Session and transient process state (non-authoritative);
- Queue, delivery, and deployment state;
- Projection and cache materializations (derived).

### 18.4 Analytical prohibitions

- Analytical store as source for public API responses without governed projection path;
- BI or reporting pipeline owning moderation or ownership truth;
- Analytical deduplication that merges lifecycle-separated records;
- Product roadmap or feature decisions driven solely by analytical persistence artifacts.

---

## 19. Storage Independence

### 19.1 Abstraction principle

Persistence architecture is **technology-neutral and implementation-neutral**. Domain ownership, aggregate boundaries, and consistency rules must survive storage technology replacement (AP-7; SYSTEM_ARCHITECTURE.md §6 Component 6 replacement boundary).

### 19.2 Storage abstraction layers

| Layer | Responsibility | Replaceability |
|-------|----------------|----------------|
| **Domain persistence model** | Aggregate and record classification | Stable across implementation eras |
| **Persistence authorization** | Write routing and ownership enforcement | Stable |
| **Storage access abstraction** | Capability interface to durability | Replaceable |
| **Physical storage realization** | Vendor, engine, topology | Replaceable — subordinate to Database Standards |

### 19.3 Storage independence rules

1. **No domain logic in storage engine** — business rules remain in domain services;
2. **No product semantics in storage configuration** — infrastructure does not encode moderation or visibility policy;
3. **Contract-stable ownership map** — replacement preserves DB-OWN and DB-AGG invariants;
4. **Portable aggregate identity** — aggregate identity survives storage migration;
5. **Media separation** — byte storage (Media Storage System) remains separate from authoritative reference persistence.

### 19.4 Storage prohibitions

- Vendor-specific features as architectural requirements in this document;
- Storage engine selection mandating domain model shape inversion;
- Hard dependency on single-vendor proprietary persistence behavior at architecture level;
- Coupling analytical and operational storage without declared separation;
- Infrastructure topology defining aggregate boundaries.

---

## 20. Database Invariants

These invariants apply platform-wide at persistence scope. Database Standards and implementation must not contradict them.

| ID | Invariant |
|----|-----------|
| **DB-INV-1** | Every authoritative record has exactly one owning authority (DB-OWN-1) |
| **DB-INV-2** | Aggregates do not span lifecycle boundaries (DB-AGG-3) |
| **DB-INV-3** | Writes require domain authorization before durability |
| **DB-INV-4** | Cross-aggregate mutations declare transaction ownership (BCK-TXN-1) |
| **DB-INV-5** | Partial multi-step mutation does not present as complete (BCK-TXN-2) |
| **DB-INV-6** | Signals and user-visible outcomes follow authoritative commit |
| **DB-INV-7** | Derived and cached persistence is never authoritative (SYS §10.2) |
| **DB-INV-8** | Audit and evidence records do not replace domain truth (SYS §10.2 rule 6) |
| **DB-INV-9** | Public persistence paths expose only publicly eligible state (PLT-3) |
| **DB-INV-10** | Ownership and moderation fields mutate only through governed paths (PLT-5, PLT-7) |
| **DB-INV-11** | Contact sourcing persists from professional profiles — not listing creation (PLT-4) |
| **DB-INV-12** | Role elevation persists only through governance execution paths (PLT-6) |
| **DB-INV-13** | Analytical persistence is never authoritative (§18) |
| **DB-INV-14** | Eventual consistency is declared — never assumed (DB-CON-2) |
| **DB-INV-15** | Persistence layer does not define product behavior |
| **DB-INV-16** | Storage replacement preserves ownership map and aggregate boundaries |
| **DB-INV-17** | Schema evolution requires governed authority — not deployment convenience |

Platform invariants PLT-* and backend invariants BCK-TXN-* remain authoritative. DB-INV operationalizes them at persistence scope without replacing them.

---

## 21. Dependency Direction

### 21.1 Persistence dependency law

```
Domain services (authoritative logic)
    → Persistence authorization (L4 boundary)
        → Storage abstraction
            → Physical storage realization
```

Reverse dependencies — storage layout influencing domain meaning, query convenience driving aggregate design — are prohibited.

### 21.2 Component dependency alignment

Aligned with SYSTEM_ARCHITECTURE.md §9:

| Component | Persistence relationship |
|-----------|-------------------------|
| Application Platform System | Declares authoritative aggregates; consumes Data Persistence System |
| Identity & Access System | Owns identity authoritative records; consumes Data Persistence System |
| Data Persistence System | Provides durability — depends on Infrastructure; must not depend on Experience Systems |
| Experience Systems | Must not access authoritative persistence directly |
| Observability System | Reads operational and evidence signals — must not mutate domain truth |
| Media Storage System | Separate byte storage — domain holds references only |

### 21.3 Cross-domain persistence dependency

```
Owning aggregate authority
    → Orchestration (multi-aggregate scope only)
        → Foreign aggregate (via contract — read or governed outcome)
```

Foreign aggregate internals are not persistence dependencies.

### 21.4 Downstream dependency rule

Database Standards and implementation artifacts depend on this document. This document depends on upstream architecture — not on implementation.

---

## 22. Downstream Consumers

The following documents consume Database Architecture. Their content is **not defined here**.

| Consumer | Consumption relationship |
|----------|-------------------------|
| **Database Standards** (future) | Physical schema, access patterns, migration execution, query implementation |
| **Infrastructure Standards** (future) | Backup, replication, storage topology — honors separation rules |
| **Security Standards** (future) | Encryption, access control at storage boundary |
| **Development Standards** (future) | Implementation conventions within persistence governance |
| **Implementation Governance** (future) | Compliance verification against DB-INV invariants |
| **Observability Standards** (future) | Audit and telemetry persistence aligned to §16 and §18 |

### Consumption model

Downstream standards must:

1. Declare Database Architecture as consumed authority for persistence governance;
2. Preserve aggregate ownership map inherited from BACKEND_ARCHITECTURE.md §11.2;
3. Not redefine platform domain boundaries or product meaning;
4. Not contradict DB-INV invariants;
5. Reference — not duplicate — ownership, transaction, and consistency tables;
6. Remain technology-specific only at Database Standards layer — not in this document.

---

## 23. Prohibited Scope

This document must not define:

| Prohibited | Belongs to |
|------------|------------|
| Storage products, engines, or vendors | Database Standards · Infrastructure Standards |
| Data definition language or syntax | Database Standards |
| Mapping frameworks or ORM patterns | Database Standards · Development Standards |
| Table, collection, index, or partition design | Database Standards |
| Sharding, replication, or backup implementation | Infrastructure Standards |
| Query language or optimization tactics | Database Standards |
| Connection pooling, driver configuration | Implementation |
| Migration scripts or rollout runbooks | Database Standards · Implementation (when authorized) |
| API endpoints or payload schemas | API Standards |
| Domain invariants and transitions | BACKEND_ARCHITECTURE.md · domain services |
| Product behavior and experience meaning | Product Design Standard |
| Cloud provider selection | Infrastructure Standards |
| Cache product selection | Development Standards · Infrastructure Standards |
| Phase 4 Product Development Methodology | Phase 4 |

---

## 24. Terminology

| Term | Meaning |
|------|---------|
| **Persistence architecture** | Governance of durable state authority, boundaries, and evolution — not storage implementation |
| **Authoritative record** | Durable representation of marketplace or identity truth owned by declaring authority |
| **Aggregate** | Smallest cohesive persistence consistency unit with one root and one owner |
| **Aggregate root** | Sole governed entry point for mutations within an aggregate |
| **Persistence ownership** | Right to authorize writes to an authoritative record class |
| **Persistence Boundary** | Backend architectural layer routing durability to owning authority — BACKEND_ARCHITECTURE.md §6.5 |
| **Transaction ownership** | Declaration of consistency scope for multi-step operations — not a storage mechanism |
| **Strong consistency** | Logical atomicity within declared scope |
| **Eventual consistency** | Declared temporary divergence with named reconciliation |
| **Derived projection** | Materialized non-authoritative read surface built from authoritative sources |
| **Evidence record** | Append-oriented persistence of action or audit — not domain truth |
| **Operational data** | Runtime persistence including authoritative and system state |
| **Analytical data** | Non-authoritative copies for measurement and reporting |
| **Schema evolution** | Governed change to persistent structure classification |
| **Migration** | Governed transformation of structure or data classification |
| **Archive** | Governed deactivation from current operational truth classification |
| **Historical data** | Retained past state or event record — subordinate to current truth rules |
| **Storage abstraction** | Interface layer isolating domain persistence model from physical storage |
| **Reconciliation** | Process restoring alignment between derived or lagging copies and authoritative source |
| **Storage independence** | Capacity to replace storage realization without changing ownership or invariants |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 25. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Database Architecture |
| **Authority class** | Authoritative persistence architecture |
| **Phase** | Database Architecture — Phase 3 domain architecture (MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`) |
| **Implementation** | NOT AUTHORIZED |
| **Supersedes** | Informal persistence convention; undocumented storage assumptions |
| **Subordinate to** | PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · Product Design Standard |
| **Superior to** | Database Standards · Infrastructure persistence standards (on persistence governance matters) |
| **Does not authorize** | Implementation; storage technology selection; Phase 3 completion |
| **Prerequisites** | Phase 3 Authorization; Constitution; Principles; Platform Architecture; System Architecture; Backend Architecture published — satisfied |

---

**Document path:** `docs/engineering/DATABASE_ARCHITECTURE.md`  
**Related:** `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/PLATFORM_ARCHITECTURE.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
