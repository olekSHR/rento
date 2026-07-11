# Rento Database Standards

**Status:** PUBLISHED — Database Standards  
**Authority class:** Authoritative persistence engineering standards  
**Binding authority:** Active — per REPOSITORY_STANDARDS.md §7.6  
**Publication:** COMPLETE  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Persistence Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · DATABASE_ARCHITECTURE.md · API_STANDARDS.md · SECURITY_STANDARDS.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Purpose

This document defines **engineering standards for persistence implementation** in the Rento platform.

It establishes how durable state is realized in engineering practice — aggregate discipline, persistence access structure, transaction scope, consistency behavior, schema evolution workflow, migration governance, validation, testing, documentation, review, and quality gates — without specifying storage technology, data definition language, mapping frameworks, or operational infrastructure.

This document answers:

- What persistence engineering standards own versus what persistence architecture owns;
- How aggregate boundaries from DATABASE_ARCHITECTURE.md are enforced in implementation structure;
- How persistence access abstractions honor ownership and dependency direction;
- How transaction and consistency declarations from upstream architecture are realized in engineering discipline;
- How schema evolution and migrations are governed as engineering artifacts;
- How persistence validation, testing, documentation, and review preserve DB-INV invariants;
- What quality gates apply before persistence changes enter implementation scope;
- What downstream standards and implementation may consume from this authority.

This document is **persistence engineering standards**, not persistence architecture governance, not physical database design, and not storage operations.

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
                        ├── Database architecture (DATABASE_ARCHITECTURE.md)
                        └── Database standards (this document)
                            → Development Standards · Infrastructure Standards · Implementation Governance (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| DATABASE_ARCHITECTURE.md | Persistence architecture governance; ownership; aggregate boundaries; DB-INV invariants | Specializes governance into engineering implementation discipline — does not redefine |
| BACKEND_ARCHITECTURE.md | Persistence ownership map; L4 Persistence Boundary; transaction ownership declarations | Consumes ownership map — defines implementation routing discipline |
| SECURITY_STANDARDS.md | Data classification; persistence authorization policy; audit evidence governance | Consumes classification obligations at persistence scope — does not redefine security policy |
| API_STANDARDS.md | Access contract governance | Consumes read/write separation — does not define persistence |
| FRONTEND_ARCHITECTURE.md | Experience surface boundaries; client non-authority for marketplace truth | Consumes persistence bypass prohibitions — does not define persistence |
| SYSTEM_ARCHITECTURE.md | Data Persistence System responsibilities; state classification | Consumes component boundaries — does not redefine system structure |
| PRODUCT_ARCHITECTURE.md | Capability truth classes; lifecycle constraints | Consumes persistence alignment obligations — does not redefine product meaning |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for governance placement — does not redefine repository governance |

### 2.3 What this document owns

- Persistence engineering scope and responsibility boundaries;
- Aggregate implementation discipline;
- Persistence access abstraction standards (repository discipline);
- Transaction implementation discipline;
- Consistency implementation rules;
- Schema management and evolution engineering standards;
- Migration governance principles at engineering artifact level;
- Persistence naming conventions;
- Persistence versioning discipline;
- Persistence validation standards;
- Persistence testing standards;
- Persistence review standards;
- Persistence quality gates;
- Persistence documentation standards;
- Persistence evolution rules;
- Read persistence implementation standards;
- Referential integrity implementation standards;
- Historical data and archive engineering standards;
- Scope boundary and deferral map;
- Persistence engineering invariants (DBS-INV-*);
- Downstream consumption model;
- Prohibited persistence engineering scope.

### 2.4 What this document does not own

- Persistence architecture governance (DATABASE_ARCHITECTURE.md);
- Platform domain definitions (PLATFORM_ARCHITECTURE.md);
- Backend layer structure and orchestration (BACKEND_ARCHITECTURE.md);
- API contract specification (API_STANDARDS.md);
- Authentication, authorization, or cryptographic policy (SECURITY_STANDARDS.md);
- Infrastructure deployment, backup execution, replication, or storage topology (Infrastructure Standards);
- Storage technology selection, data definition syntax, mapping framework choice, or query language;
- Physical layout design, indexing strategy, partitioning, sharding, or storage engine configuration;
- Implementation tasks, migration scripts, or delivery methodology when implementation is authorized;
- Product behavior, experience meaning, or user workflows.

### 2.5 Amendment

This document may be amended only through explicit governance review per REPOSITORY_STANDARDS.md after publication. While in draft status, amendments follow Phase 3 authoring discipline. Amendments must preserve product authority supremacy, constitutional compliance, extension-not-replacement discipline, and non-contradiction with DATABASE_ARCHITECTURE.md DB-INV invariants.

---

## 3. Relationship to Upstream Authority

### 3.1 Database architecture consumption

Database Standards **implements** DATABASE_ARCHITECTURE.md at the engineering discipline layer. It honors without restating:

| Architectural governance | Engineering standards treatment |
|--------------------------|--------------------------------|
| Single authoritative owner (DB-OWN-*) | Persistence access scoped to owning unit only |
| Aggregate boundaries (DB-AGG-*) | One aggregate implementation scope per consistency unit |
| Transaction ownership (§9) | Explicit transaction scope in implementation structure |
| Consistency classes (§10) | Declared consistency behavior in read and write paths |
| Read persistence governance (§11) | Read implementation surfaces per §9 — separate from write persistence |
| Write persistence governance (§12) | Write routing discipline inherited via §6–§7 — not restated |
| Referential integrity governance (§15) | Integrity implementation discipline per §10 |
| Historical data governance (§16) | Historical engineering obligations per §11 |
| Archive governance (§17) | Archive engineering discipline per §11 |
| Schema evolution governance (§13) | Governed evolution workflow and compatibility declaration |
| Migration governance (§14) | Traceable migration artifacts with review gates |
| DB-INV invariants (§20) | Non-negotiable compliance criteria for all persistence engineering |

Architectural ownership maps, aggregate catalogs, and consistency tables are **not** restated here. Reviewers consume DATABASE_ARCHITECTURE.md and BACKEND_ARCHITECTURE.md §11.2 for authoritative structure.

### 3.2 Backend architecture consumption

| Backend declaration | Database standards extension |
|---------------------|------------------------------|
| Persistence ownership map (BACKEND_ARCHITECTURE.md §11.2) | Each authoritative state class maps to exactly one persistence access scope |
| L4 Persistence Boundary (BACKEND_ARCHITECTURE.md §6.5) | Write routing discipline — domain confirmation before durability |
| Transaction boundaries (BACKEND_ARCHITECTURE.md §10.6) | Implementation transaction scope matches declared ownership |
| BCK-TXN-* invariants | Engineering transaction discipline inherits architectural expectations |

### 3.3 Security standards consumption

| Security obligation | Persistence engineering treatment |
|---------------------|-----------------------------------|
| Data classification (SECURITY_STANDARDS.md §8) | Persistence artifacts declare classification per record scope |
| Persistence authorization (SECURITY_STANDARDS.md §7.2) | Writes permitted only after owning-domain authorization confirmed |
| Audit evidence governance (SECURITY_STANDARDS.md §11) | Evidence persistence is append-oriented — separate from domain mutation paths |
| SEC-INV-16 | Audit evidence implementation does not mutate authoritative aggregates |

### 3.4 Product authority consumption

Database Standards **consumes** approved product constraints without redefinition:

| Product constraint | Persistence engineering treatment |
|--------------------|-----------------------------------|
| Immutable domain rules (ENGINEERING_HANDOFF.md §5.5) | Persistence validation blocks forbidden field mutations at engineering gate |
| Mandatory lifecycle separation (PRODUCT_ARCHITECTURE.md §5.1) | No shared persistence scope across lifecycle boundaries |
| Participation–execution separation (PRODUCT_ARCHITECTURE.md §6.3) | Separate persistence scopes for participation and governance execution records |
| Performance Integrity (Product Chapter 63) | Commit ordering honors honest completion — no premature persistence signals |
| Contact sourcing (PLT-4) | Listing persistence scope excludes contact capture at creation |

### 3.5 Frontend architecture consumption

| Frontend declaration | Persistence engineering treatment |
|----------------------|-----------------------------------|
| No authoritative marketplace state on client (FRONTEND_ARCHITECTURE.md §3) | Client-local persistence prohibited as authoritative source — §9.5 |
| No persistence bypass (FRONTEND_ARCHITECTURE.md §14.3) | Experience Systems do not access Data Persistence System directly |
| Cache must reconcile (FRONTEND_ARCHITECTURE.md §16.2) | Client cache is non-authoritative — aligns with §9 projection and cache read discipline |
| Backend is authoritative (FRONTEND_ARCHITECTURE.md §16.2) | Persistence read surfaces serve owning-domain query boundaries — not client presentation state |

Frontend architecture defines presentation boundaries. Database Standards governs persistence engineering obligations that backend and persistence layers must honor — client presentation remains outside persistence ownership.

### 3.6 Non-duplication rule

Upstream documents own their definitions. This document **references and specializes** — it does not restate platform domain catalogs, backend layer models, API contract rules, security policy tables, or persistence architecture governance tables.

---

## 4. Persistence Engineering Scope

### 4.1 Engineering scope definition

Persistence engineering governs **how authorized durable state is structured, accessed, evolved, verified, and reviewed** in implementation — subordinate to persistence architecture governance and superior to ad hoc implementation convention.

### 4.2 Scope matrix

| Engineering responsibility | Owner | Architectural source |
|---------------------------|-------|---------------------|
| Aggregate implementation structure | Owning domain realization unit | DATABASE_ARCHITECTURE.md §6–7 |
| Persistence access abstraction | Owning domain realization unit — L4 routing | BACKEND_ARCHITECTURE.md §6.5 |
| Transaction scope realization | Declaring authority per operation class | DATABASE_ARCHITECTURE.md §9 |
| Consistency behavior realization | Declaring authority with orchestration input | DATABASE_ARCHITECTURE.md §10 |
| Schema evolution artifacts | Owning domain unit + persistence governance review | DATABASE_ARCHITECTURE.md §13 |
| Migration artifacts | Owning domain unit + independent review | DATABASE_ARCHITECTURE.md §14 |
| Integrity validation before commit | Domain service — persistence validates routing | DATABASE_ARCHITECTURE.md §15 |
| Evidence persistence | Producing authority — append-oriented | DATABASE_ARCHITECTURE.md §16 |
| Derived projection persistence | Projection owner — subordinate | DATABASE_ARCHITECTURE.md §11.2 |
| Read persistence implementation | Owning domain query boundary | DATABASE_ARCHITECTURE.md §11 |
| Referential integrity implementation | Owning domain unit — domain-first | DATABASE_ARCHITECTURE.md §15 |
| Historical and archive engineering | Owning domain unit | DATABASE_ARCHITECTURE.md §16–17 |
| Storage capability consumption | Data Persistence System via abstraction | SYSTEM_ARCHITECTURE.md §6 Component 6 |

### 4.3 Engineering boundary classes

| Boundary | Separates |
|----------|-----------|
| **Architecture ↔ Engineering** | Governance declarations from implementation discipline |
| **Domain logic ↔ Persistence access** | Invariant enforcement from durability routing |
| **Authoritative ↔ Derived persistence** | Owned writes from projection refresh |
| **Operational ↔ Analytical persistence** | Runtime authoritative stores from analysis copies |
| **Engineering ↔ Infrastructure** | Persistence discipline from backup, replication, topology |

### 4.4 Engineering scope prohibitions

- Persistence engineering defining product behavior or domain invariants;
- Storage layout dictating aggregate boundaries;
- Cross-domain persistence access without owning authority;
- Analytical persistence implementation treated as authoritative write target;
- Client or API layer implementing authoritative persistence directly;
- Infrastructure configuration encoding domain policy.

---

## 5. Aggregate Standards

### 5.1 Aggregate implementation principle

An aggregate implementation is the **engineering realization** of one architectural aggregate — one consistency scope, one root entry point, one owning authority. Aggregate implementation follows DATABASE_ARCHITECTURE.md §6 — it does not redefine aggregate meaning.

### 5.2 Aggregate implementation rules

| Rule | Requirement |
|------|-------------|
| **DBS-AGG-1** | One aggregate root per aggregate — sole mutation entry point in implementation structure |
| **DBS-AGG-2** | Aggregate implementation scope maps to exactly one owning domain realization unit or system component |
| **DBS-AGG-3** | Intra-aggregate mutations occur within one declared consistency scope |
| **DBS-AGG-4** | Inter-aggregate mutations require explicit orchestration — not implicit shared persistence access |
| **DBS-AGG-5** | Aggregate implementation does not span lifecycle boundaries (DB-AGG-3) |
| **DBS-AGG-6** | Evidence persistence scopes do not mutate authoritative aggregate implementations |
| **DBS-AGG-7** | Derived projections are not implemented as aggregate roots |

### 5.3 Aggregate root discipline

| Discipline | Obligation |
|------------|------------|
| **Root identification** | Aggregate root is declared in domain aggregate catalog — not inferred from storage layout |
| **Mutation routing** | All governed mutations enter through aggregate root scope |
| **Invariant locality** | Domain invariants enforced before root persistence authorization |
| **Reference-only cross-aggregate** | Foreign relationships use identifiers — not writable embedded foreign truth |
| **Mutability declaration** | Each aggregate declares mutability class: mutable, immutable-after-commit, append-only, regenerable |

### 5.4 Aggregate catalog obligation

Each owning authority maintains a **declared aggregate catalog** documenting:

| Catalog element | Required content |
|-----------------|------------------|
| Aggregate identity | Stable logical identifier |
| Aggregate root | Root entity or record class |
| Owning authority | Domain realization unit or system component |
| Authoritative record classes | State classes within boundary |
| Mutability class | Per §5.3 |
| Consistency scope | Intra-aggregate strong; inter-aggregate per orchestration declaration |
| Foreign references | Identifier-only cross-aggregate relationships |
| Lifecycle membership | Product lifecycle context |

Aggregate catalog is an engineering documentation artifact — not a schema definition.

### 5.5 Aggregate implementation prohibitions

- Multi-domain aggregate roots in one implementation scope;
- Shared mutable persistence scope without single owner;
- Aggregate roots selected for storage convenience rather than invariant cohesion;
- Framework annotations or storage layout as aggregate authority;
- Client-defined or API-defined aggregate boundaries;
- Merging participation records with governance execution records in one root scope.

---

## 6. Repository Standards

### 6.1 Repository definition

A **persistence repository** is the engineering abstraction that routes durability operations for one aggregate scope — it **stores and retrieves** authorized state. It does **not** define domain meaning, invariants, or authorization policy.

This section governs **persistence access abstraction discipline**. It does not govern `REPOSITORY_STANDARDS.md` document lifecycle.

### 6.2 Repository ownership

| Concern | Owner |
|---------|-------|
| Repository scope definition | Owning domain realization unit |
| Write authorization routing | Persistence Boundary — after domain service confirmation |
| Read visibility enforcement | Owning domain query boundary |
| Repository interface publication | Owning unit — for authorized foreign reads via contracts only |
| Storage mechanism realization | Subordinate implementation — replaceable |

### 6.3 Repository discipline rules

| ID | Rule |
|----|------|
| **DBS-REP-1** | One primary repository scope per aggregate — no shared mutable repository across owners |
| **DBS-REP-2** | Repositories accept writes only after domain service confirmation |
| **DBS-REP-3** | Repositories do not enforce business invariants — domain services enforce; repositories validate routing |
| **DBS-REP-4** | Cross-aggregate writes through one repository scope are prohibited |
| **DBS-REP-5** | Foreign aggregate state is accessed via query contracts — not repository internals |
| **DBS-REP-6** | Command persistence and query projection persistence remain separable where architecturally required |
| **DBS-REP-7** | Repository layer does not perform authorization policy — consumes authorization outcomes |

### 6.4 Repository operation classes

| Operation class | Authority | Repository role |
|-----------------|-----------|-----------------|
| **Authoritative mutation** | Owning domain service | Persist root state after confirmation |
| **Append-only evidence** | Producing authority | Append record — no domain aggregate mutation |
| **Projection refresh** | Projection owner | Regenerate from authoritative source |
| **Authoritative read** | Owning domain query boundary | Retrieve with visibility enforcement |
| **Contract read** | Contract publisher | Serve declared query scope only |
| **Reconciliation write** | Owning domain via governed path | Restore authoritative alignment — not ad hoc repair |

### 6.5 Repository naming conventions

| Artifact | Convention |
|----------|------------|
| Repository identity | `{AggregateName}Repository` or equivalent — scoped to one aggregate |
| Operation naming | Verb reflects persistence action — `save`, `append`, `findById` — not domain transition names |
| Scope prefix | Owner unit prefix where solution structure requires disambiguation |
| Foreign access | Named as contract consumption — not as foreign repository injection |

Naming conventions are structural discipline — not technology-specific syntax.

### 6.6 Repository prohibitions

- Repository containing domain invariant logic;
- Generic repository spanning multiple domain owners;
- Repository exposing cross-owner write operations;
- Repository bypassing Persistence Boundary routing;
- Repository as authorization enforcement point;
- Direct repository access from Access Adaptation or Orchestration layers.

---

## 7. Transaction Standards

### 7.1 Transaction implementation principle

Transaction implementation realizes **declared consistency scope** from DATABASE_ARCHITECTURE.md §9 and BACKEND_ARCHITECTURE.md §10.6. Transaction scope is intentional — not framework-default ambient scope.

### 7.2 Transaction scope mapping

| Operation class | Transaction authority | Implementation discipline |
|-----------------|----------------------|---------------------------|
| **Single-aggregate mutation** | Owning domain unit | One consistency scope within aggregate boundary |
| **Multi-aggregate mutation** | Application Orchestration | Explicit scope declaration before integration |
| **Governance execution flow** | Orchestration + Governance unit | Atomic expectation — no partial presentation |
| **Read-only composition** | Application Orchestration | No mutation transaction scope |
| **Background deferred mutation** | Same as synchronous equivalent | Identical scope — no expansion (BCK-TXN-4) |

### 7.3 Transaction implementation rules

| ID | Rule |
|----|------|
| **DBS-TXN-1** | Multi-domain mutations declare transaction ownership before implementation integration |
| **DBS-TXN-2** | Failure does not persist partial state presented as complete |
| **DBS-TXN-3** | Compensation posture is explicit — not per-path ad hoc handling |
| **DBS-TXN-4** | Commit precedes outward signals — events and notifications follow authoritative persistence |
| **DBS-TXN-5** | No ambient transactions — scope matches declared operation class |
| **DBS-TXN-6** | Background jobs inherit synchronous transaction discipline — no wider write scope |
| **DBS-TXN-7** | Long-running interactive transactions holding authoritative locks across user wait time are prohibited |

### 7.4 Transaction boundary placement

```
Domain service confirmation
    → Transaction scope opening (when required)
        → Persistence operations within scope
            → Commit or declared rollback/compensation
                → Post-commit signals (if applicable)
```

Transaction opening before domain confirmation is prohibited. Post-commit signals before commit are prohibited.

### 7.5 Transaction implementation prohibitions

- Distributed transaction scope without orchestration authority declaration;
- Transaction boundaries spanning lifecycle boundaries without governance approval;
- Auto-commit persistence bypassing domain confirmation;
- Framework-default transaction scope substituting for declared ownership;
- Interactive user-wait holding authoritative mutation locks.

---

## 8. Consistency Standards

### 8.1 Consistency implementation principle

Consistency implementation realizes **declared consistency classes** from DATABASE_ARCHITECTURE.md §10. Undeclared eventual consistency is prohibited for governance-sensitive paths.

### 8.2 Consistency class implementation

| Class | Implementation obligation |
|-------|--------------------------|
| **Strong consistency** | All participants within scope observe mutation as one logical unit |
| **Authoritative eventual consistency** | Named reconciliation owner; bounded staleness rules documented |
| **Derived eventual consistency** | Projections declare source aggregates and refresh trigger |
| **Operational eventual consistency** | Non-truth state convergence — never substitutes for authoritative reads on eligibility-sensitive paths |

### 8.3 Consistency implementation rules

| ID | Rule |
|----|------|
| **DBS-CON-1** | Authoritative sources reconcile before derived projections claim truth |
| **DBS-CON-2** | Eventual consistency requires named reconciliation owner and trigger in engineering documentation |
| **DBS-CON-3** | Public visibility reads honor authoritative eligibility — projection lag is not an excuse |
| **DBS-CON-4** | Cross-domain strong consistency requires orchestration declaration — not implicit storage coupling |
| **DBS-CON-5** | Cache and materialized copies declare reconciliation or invalidation posture |
| **DBS-CON-6** | Read optimization artifacts do not become alternate writable truth |

### 8.4 Reconciliation discipline

| Reconciliation type | Owner | Trigger |
|--------------------|-------|---------|
| **Projection refresh** | Projection owner | Authoritative source change or scheduled regeneration |
| **Cache invalidation** | Cache owner | Authoritative mutation or declared TTL |
| **Cross-store alignment** | Authoritative source owner | Detected divergence or declared schedule |
| **Governance-sensitive state** | Owning domain unit | Synchronous or declared strong consistency only |

### 8.5 Consistency prohibitions

- Undeclared eventual consistency for ownership, publication, or governance outcomes;
- Projection read serving public eligibility without authoritative reconciliation path;
- Writable denormalized foreign fields without owning aggregate authority;
- Search or ranking persistence owning publication or moderation truth;
- Client-local persistence as authoritative marketplace source.

---

## 9. Read Persistence Implementation Standards

### 9.1 Read implementation principle

Read persistence implementation realizes **read persistence governance** from DATABASE_ARCHITECTURE.md §11 at the engineering discipline layer. Read persistence is **separate** from write persistence. Query ownership (BACKEND_ARCHITECTURE.md §9.7) defines read semantics and visibility — this section governs how read paths are structured in engineering practice without specifying storage or caching technology.

### 9.2 Read implementation classes

| Class | Engineering obligation | Owning authority |
|-------|------------------------|------------------|
| **Authoritative read** | Direct read of owning aggregate state through repository scope; visibility enforced at query boundary | Owning domain unit |
| **Contract read** | Cross-domain read via published query contract only — no foreign repository access | Contract publisher |
| **Composite read** | Orchestration aggregates contract reads — visibility rules not redefined | Application Orchestration |
| **Projection read** | Read from derived materialization — source aggregates and staleness declared | Projection owner |
| **Cache read** | Performance copy — reconciliation or invalidation posture declared; never authoritative | Cache holder |

### 9.3 Read implementation rules

| ID | Rule |
|----|------|
| **DBS-RD-1** | Command and query persistence surfaces remain separable where architecturally required (DBS-REP-6) |
| **DBS-RD-2** | Authoritative reads enforce visibility eligibility at owning domain query boundary |
| **DBS-RD-3** | Contract reads consume published query contracts — no persistence bypass (BCK-QRY-3) |
| **DBS-RD-4** | Projection reads declare source authoritative aggregates and reconciliation trigger |
| **DBS-RD-5** | Cache reads declare invalidation or reconciliation posture — cache is never authoritative |
| **DBS-RD-6** | Public read persistence paths expose only publicly eligible state (DB-INV-9) |
| **DBS-RD-7** | Read paths do not mutate authoritative domain state |

### 9.4 Read visibility engineering

Read visibility engineering inherits eligibility rules from owning domains and PRODUCT_ARCHITECTURE.md visibility constraints:

1. **Visibility inheritance** — read surfaces inherit most restrictive eligibility from source aggregates;
2. **Scope enforcement** — public, owner-scoped, participant-scoped, and governance-scoped reads remain separable at persistence boundary;
3. **Field filtering** — ineligible fields must not appear in scoped read results;
4. **Cross-surface restraint** — read optimization does not expose governance or professional scope through public read paths.

### 9.5 Persistence bypass prohibition

The following read paths are **prohibited** at persistence engineering scope:

- Cross-domain reads via foreign aggregate repository internals;
- Experience System direct access to Data Persistence System (FRONTEND_ARCHITECTURE.md §14.3);
- Client-local persistence treated as authoritative marketplace state;
- Shared read-write persistence surface without write authority check;
- Query path side effects mutating authoritative aggregates.

### 9.6 Projection honesty and stale-read declaration

Projections and caches exposing user-visible or contract-visible state must honor **honest staleness** per DATABASE_ARCHITECTURE.md §11.3:

| Obligation | Requirement |
|------------|-------------|
| **Source declaration** | Projection owner documents authoritative source aggregates |
| **Staleness declaration** | Reconciliation trigger and maximum acceptable lag documented where product truth requires |
| **Honesty under lag** | Projection lag does not excuse public eligibility violations (DBS-CON-3) |
| **Derived non-authority** | Projection read must not contradict authoritative read in the same composition without declared reconciliation |
| **Performance Integrity** | Stale projection must not present pending or non-eligible state as current truth |

Stale-read declaration is an engineering documentation artifact — not a transport header or cache product configuration.

### 9.7 Read persistence prohibitions

- Denormalized foreign fields writable without owning aggregate authority;
- Search or ranking persistence owning publication or moderation truth;
- Read optimization creating alternate writable truth;
- Undeclared projection serving public eligibility without reconciliation path;
- Composite read redefining visibility rules of source contracts.

---

## 10. Referential Integrity Implementation Standards

### 10.1 Integrity implementation principle

Referential integrity implementation realizes **relationship validity governance** from DATABASE_ARCHITECTURE.md §15 at the engineering discipline layer. Integrity rules originate from domain invariants — persistence engineering governs how validity is enforced and documented without mandating storage constraints or data definition syntax.

### 10.2 Engineering responsibilities

| Responsibility | Owner | Discipline |
|----------------|-------|------------|
| Integrity rule definition | Domain service | Domain invariants — primary authority |
| Pre-persistence validation | Domain service + repository routing validation | Domain-first enforcement |
| Cross-aggregate reference validation | Source aggregate owner | Identifier resolution — not foreign mutation |
| Cascade effect declaration | Application Orchestration | Explicit scope — not implicit defaults |
| Deletion and archive path | Owning domain unit | Lifecycle governance — not physical delete convenience |
| Integrity documentation | Owning domain unit | Per §10.3 |

### 10.3 Documentation obligations

Each aggregate catalog entry (§5.4) must document referential integrity posture:

| Element | Required content |
|---------|------------------|
| Ownership references | Valid owner identity requirements |
| Lifecycle references | Valid state references for current lifecycle phase |
| Cross-aggregate references | Foreign identifiers and resolving contracts |
| Eligibility references | Public reference eligibility rules where applicable |
| Cascade declaration | Cross-aggregate effects — explicit orchestration scope or none |
| Deletion posture | Governed removal, archive, or compensating record path |

### 10.4 Ownership integrity implementation

- Authoritative marketplace records require valid ownership classification — no nullable ownership fields;
- Ownership field mutability restricted to governed domain transitions (DBS-VAL-2);
- Orphan authoritative records are prohibited at validation and documentation level.

### 10.5 Lifecycle-aware integrity

- References must remain valid for the aggregate's declared lifecycle phase;
- Lifecycle boundary crossings require governed transition — not storage convenience merge;
- Integrity validation rejects references that violate lifecycle separation (DBS-AGG-5).

### 10.6 Cascade and cross-aggregate discipline

Per DATABASE_ARCHITECTURE.md §15.3 rules 3 and 5:

1. **Explicit cascade declaration** — cascading effects across aggregates require orchestration declaration before integration;
2. **No implicit cross-aggregate mutation** — storage-level or repository-level cascade into foreign domain aggregates is prohibited without domain authorization;
3. **Reference-only cross-domain** — cross-domain relationships use identifiers and contracts — not writable embedded foreign truth;
4. **Evidence separation** — integrity operations on evidence records do not cascade into authoritative domain aggregates.

### 10.7 Archive and delete discipline

Authoritative record removal follows **lifecycle and archive rules** — not physical delete convenience:

| Action | Engineering discipline |
|--------|------------------------|
| **Governed transition** | Removal through owning domain service path |
| **Archive** | Classification change per §11 — lineage preserved |
| **Hard delete** | Prohibited for governance evidence without archive governance approval |
| **Compensating record** | Immutable-after-commit corrections via governed path — not silent overwrite |

### 10.8 Integrity implementation rules

| ID | Rule |
|----|------|
| **DBS-INT-1** | Domain-first enforcement — integrity originates from domain invariants |
| **DBS-INT-2** | No orphan authoritative records without valid ownership classification |
| **DBS-INT-3** | Cross-aggregate cascade requires explicit orchestration declaration |
| **DBS-INT-4** | Cross-domain relationships are reference-only at persistence scope |
| **DBS-INT-5** | Deletion and archive paths documented per aggregate catalog |
| **DBS-INT-6** | Public eligibility references resolve only to publicly eligible records |
| **DBS-INT-7** | Evidence integrity references valid execution context — append-only |

### 10.9 Integrity implementation prohibitions

- Storage-level cascade mutating foreign domain aggregates without domain authorization;
- Nullable ownership on authoritative marketplace records;
- Hard delete of governance evidence without archive governance approval;
- Referential links bypassing visibility eligibility rules;
- Integrity enforcement relocated entirely to persistence layer without domain validation.

---

## 11. Historical Data and Archive Engineering Standards

### 11.1 Historical and archive implementation principle

Historical data and archive engineering realizes DATABASE_ARCHITECTURE.md §16–17 at the engineering discipline layer. Historical records supplement — never replace — current authoritative truth. Archive is a **classification change** — not ambiguous delete.

### 11.2 Historical record engineering obligations

| Record class | Engineering mutability | Documentation obligation |
|--------------|------------------------|--------------------------|
| **State history** | Append-only or version-chain — not silent overwrite | Prior values traceable to aggregate identity |
| **Transition history** | Append-only | Governed state change reference |
| **Governance evidence history** | Append-only | Execution context per SEC-AUD-5 |
| **Participation history** | Append-oriented | Participant scope declared |
| **Superseded projection history** | Regenerable or append-only | Source aggregate reference |

### 11.3 Historical documentation artifacts

Owning authorities maintain historical posture in aggregate catalog (§5.4) or supplementary registry:

| Artifact element | Required content |
|------------------|------------------|
| Historical record classes | Which classes exist per aggregate |
| Mutability posture | Append-only, version-chain, or regenerable |
| Legibility scope | Transitions requiring historical trace |
| Correction path | Compensating record — not erase |
| Retention obligation | Declared scope per aggregate family — indefinite not default |

### 11.4 Archive engineering discipline

| Rule | Obligation |
|------|------------|
| **DBS-ARC-1** | Archive eligibility declared by owning authority per aggregate family — not storage capacity pressure |
| **DBS-ARC-2** | Archive is classification change — lineage to original record identity preserved |
| **DBS-ARC-3** | Archived records excluded from public eligibility read paths |
| **DBS-ARC-4** | Restore from archive requires governed domain path |
| **DBS-ARC-5** | Archive storage is not writable authoritative source |
| **DBS-ARC-6** | Mandatory governance evidence not archived below audit legibility requirements |

### 11.5 Mutability enforcement

Historical and archive engineering honors mutability classes (§5.3):

- **Mutable authoritative** — governed transitions only;
- **Immutable-after-commit** — compensating records — not silent overwrite;
- **Append-only** — historical and evidence paths reject update and delete (DBS-VAL-8);
- **Regenerable** — projections may rebuild from authoritative sources.

### 11.6 Retention responsibilities

| Responsibility | Owner | Scope |
|----------------|-------|-------|
| Retention obligation declaration | Owning domain unit | Per aggregate family in engineering documentation |
| Retention governance alignment | Owning unit + security governance where classified | Honors SEC-AUD-6 and product legibility |
| Storage tiering realization | Infrastructure Standards (when published) | Subordinate to declared retention obligations |
| Disposal as governed event | Owning authority | Documented lifecycle act — not ad hoc deletion |

Database Standards governs **retention obligation documentation** at engineering level. Physical retention periods and storage tiering belong to Infrastructure Standards — not this document.

### 11.7 Historical data rules

| ID | Rule |
|----|------|
| **DBS-HIS-1** | Current authoritative truth separate from historical records |
| **DBS-HIS-2** | Material domain transitions retain sufficient historical legibility |
| **DBS-HIS-3** | Historical correction adds compensating records — no silent rewrite |
| **DBS-HIS-4** | Historical data supports honest stale-state comprehension — not deceptive presentation |
| **DBS-HIS-5** | Lifecycle-bound retention declared — indefinite retention not default |

### 11.8 Historical and archive prohibitions

- Archiving as substitute for governed deletion of current truth;
- Silent archive without owning authority declaration;
- Historical rewrite erasing evidentiary chain without governed archive policy;
- Archive migration destroying mandatory governance evidence legibility;
- Client or presentation layer owning historical truth independently of persistence discipline.

---

## 12. Scope Boundary and Deferral Map

### 12.1 Scope reconciliation purpose

This section reconciles DATABASE_STANDARDS.md engineering scope with DATABASE_ARCHITECTURE.md §22 downstream consumer expectations. Database Standards governs **persistence engineering discipline** — not physical storage realization.

Intentional technology-neutral narrowing honors PROJECT_CONSTITUTION.md EP-15 (Timelessness Over Trend) and REPOSITORY_STANDARDS.md §3.6 (Technology Neutrality). Physical and vendor-specific concerns defer to subordinate standards without weakening DB-INV or DBS-INV obligations.

### 12.2 Governed by Database Standards (this document)

| Topic | Governance layer |
|-------|------------------|
| Aggregate implementation discipline | Engineering structure |
| Repository abstraction discipline | Engineering routing |
| Transaction and consistency implementation scope | Engineering scope declaration |
| Read persistence implementation surfaces | Engineering read path discipline |
| Referential integrity implementation posture | Domain-first engineering enforcement |
| Historical and archive engineering obligations | Documentation and mutability discipline |
| Schema evolution and migration artifact governance | Engineering workflow |
| Validation, testing, documentation, review, quality gates | Engineering compliance |
| DBS-INV invariants | Engineering compliance registry |

### 12.3 Deferred to Development Standards (when published)

| Topic | Reason for deferral |
|-------|---------------------|
| Mapping framework and ORM patterns | Technology-specific realization |
| Data access pattern encoding | Implementation convention |
| Physical schema layout conventions | Implementation structure |
| Query construction patterns | Implementation technique |
| Repository interface encoding | Language and framework specific |
| Migration script format and execution mechanics | Implementation artifact |
| Test framework and fixture conventions | Development tooling |

Development Standards must consume Database Standards and preserve DBS-INV / DB-INV compliance.

### 12.4 Deferred to Infrastructure Standards (when published)

| Topic | Reason for deferral |
|-------|---------------------|
| Storage products, engines, and vendors | Infrastructure selection |
| Backup, replication, and storage topology | Operational infrastructure |
| Retention period enforcement and storage tiering | Infrastructure realization of declared obligations |
| Connection pooling and driver configuration | Runtime infrastructure |
| Sharding, partitioning, and engine configuration | Physical storage operations |
| Environment-specific persistence deployment | Infrastructure boundary |

Infrastructure Standards must honor DATABASE_ARCHITECTURE.md separation rules and declared retention obligations from §11.6.

### 12.5 Deferred to Implementation Governance (when published)

| Topic | Reason for deferral |
|-------|---------------------|
| Compliance verification procedures | Implementation-phase enforcement |
| Persistence change approval workflow execution | Operational governance process |
| Migration execution authorization gates | Post-standards publication act |
| Engineering metrics and delivery compliance | Implementation program |

Implementation Governance verifies DBS-INV and DB-INV — it does not redefine persistence engineering standards.

### 12.6 DATABASE_ARCHITECTURE.md §22 alignment statement

DATABASE_ARCHITECTURE.md §22 anticipates Database Standards may include physical schema, access patterns, migration execution, and query implementation. This document **intentionally limits** its authority to technology-neutral engineering discipline. Physical schema, query language, migration scripts, isolation levels, locking strategies, and timeout mechanics defer to Development Standards, Infrastructure Standards, or implementation artifacts when authorized — while **engineering obligations** (ownership, gates, documentation, invariants) remain binding here.

No scope deferral weakens DB-INV invariants or immutable domain rule enforcement.

---

## 13. Schema Evolution Standards

### 13.1 Schema management principle

Persistent structure is a **governed engineering artifact** — subject to the same review discipline as domain logic. Schema evolution extends capability through governed change per DATABASE_ARCHITECTURE.md §13.

### 13.2 Schema change classes

| Change class | Engineering authority | Review requirement |
|--------------|----------------------|-------------------|
| Intra-aggregate additive field (non-breaking) | Owning domain unit | Owning Domain Unit Review |
| New aggregate introduction | Owning domain unit | Database architecture alignment review |
| Cross-aggregate reference change | Owning units + orchestration | Joint review |
| Breaking persistence contract change | Owning domain unit | Migration authority + lineage documentation |
| Lifecycle boundary affecting change | Owning domain unit | Product constraint + platform architecture review |
| Mutability class change | Owning domain unit | Database architecture + domain review |

### 13.3 Schema evolution rules

| ID | Rule |
|----|------|
| **DBS-SCH-1** | Extension over replacement — additive evolution preferred (AP-8) |
| **DBS-SCH-2** | Schema change does not transfer aggregate ownership |
| **DBS-SCH-3** | Each evolution declares backward compatibility posture |
| **DBS-SCH-4** | Implicit parallel schemas without migration authority are prohibited |
| **DBS-SCH-5** | Schema evolution does not redefine product meaning (LP-5) |
| **DBS-SCH-6** | Audit legibility fields are not silently removed |
| **DBS-SCH-7** | Lifecycle-separated structures are not merged for storage convenience |

### 13.4 Schema versioning discipline

| Version element | Governance |
|-----------------|------------|
| **Schema identity** | Stable logical identifier per aggregate scope |
| **Schema version** | Declared lineage attached to evolution artifact |
| **Compatibility declaration** | Required per change — backward, forward, or breaking |
| **Succession mapping** | Breaking changes document predecessor relationship |

Schema version identity is recorded in governance metadata — not inferred from deployment artifacts alone.

### 13.5 Schema evolution prohibitions

- Schema change redefining moderation, ownership, or role semantics;
- Undocumented breaking change;
- Product behavior change smuggled through schema-only deployment;
- Storage convenience driving lifecycle boundary merger;
- Schema evolution without owning authority participation.

### 13.6 Persistence evolution rules

Persistence engineering evolves through **governed extension** — consistent with AP-8, AP-25, and REPOSITORY_STANDARDS.md extension discipline.

```
Identified persistence need
    → Impact assessment (architecture, domain, security, product constraints)
    → Engineering proposal at owning authority
    → Review per §18 class
    → Quality gates per §19
    → Documentation integration per §17
    → Continuity synchronization (if milestone affected)
```

| Permitted path | When permitted |
|----------------|----------------|
| Additive aggregate field | Non-breaking; owning unit review |
| New aggregate implementation | Architectural placement verified; catalog updated |
| New projection | Source declaration; derived non-authority confirmed |
| Consistency declaration update | Orchestration and owning units agree |
| Migration artifact publication | Independent review complete |
| Standards clarification | No invariant weakening |

| Prohibited path | Reason |
|-----------------|--------|
| Ownership drift through engineering convenience | Ownership map is authoritative |
| Lifecycle merger in persistence scope | Violates PROD-INV-2 |
| Silent parallel persistence behavior | Violates AP-11 and DBS-INV-18 |
| Invariant weakening without governance | Violates constitutional compliance |
| Implementation-driven standards bypass | Violates authority hierarchy |
| Undeclared eventual consistency expansion | Violates DB-CON-2 |

Deprecated persistence scopes remain documented with successor mapping, declare migration windows, receive no new authoritative write paths, and retire only after governance verification.

---

## 14. Migration Standards

### 14.1 Migration artifact principle

A **migration** is any governed engineering artifact transforming persistent structure or data classification that affects authoritative truth, read surfaces, or reconciliation behavior — per DATABASE_ARCHITECTURE.md §14.

Migration standards govern **artifact discipline**. Migration execution requires separate implementation authorization.

### 14.2 Migration classes

| Migration type | Declaring authority | Approval |
|----------------|---------------------|----------|
| **Structural migration** | Owning domain unit | Independent review before execution authorization |
| **Data classification migration** | Owning domain unit | Domain + persistence governance review |
| **Projection rebuild** | Projection owner | Subordinate — must not alter authoritative truth |
| **Storage replacement** | Infrastructure + database architecture alignment | Ownership map and invariants preserved |
| **Archive migration** | Owning domain unit | Retention and archive governance honored |

### 14.3 Migration artifact requirements

Every migration artifact must document:

| Element | Required content |
|---------|------------------|
| **Governance basis** | Architectural authority and change class |
| **Owning authority** | Domain unit or component accountable |
| **Scope** | Affected aggregates and record classes |
| **Compatibility posture** | Backward, forward, or breaking |
| **Truth preservation validation** | How authoritative integrity is verified before cutover |
| **Reversibility posture** | Rollback or forward-fix strategy for authoritative migrations |
| **Ownership continuity** | No orphaned records without owner |
| **Lineage reference** | Version succession and related schema evolution identity |

### 14.4 Migration governance rules

| ID | Rule |
|----|------|
| **DBS-MIG-1** | Every migration links to governance basis and version lineage |
| **DBS-MIG-2** | Migration does not orphan records without declared owner |
| **DBS-MIG-3** | Authoritative integrity validated before cutover |
| **DBS-MIG-4** | Reversibility posture declared for authoritative migrations |
| **DBS-MIG-5** | Migration execution requires implementation authorization separate from standards publication |
| **DBS-MIG-6** | Cross-domain data merge requires orchestration declaration |
| **DBS-MIG-7** | Migration must not remove governance audit legibility |

### 14.5 Migration prohibitions

- Production migration without approved persistence governance review;
- Migration driven solely by storage vendor defaults;
- Migration conflating operational cleanup with authoritative truth correction without domain path;
- Migration execution treating draft standards as authorization;
- Migration that bypasses ownership map from BACKEND_ARCHITECTURE.md §11.2.

---

## 15. Validation Standards

### 15.1 Validation principle

Persistence validation ensures **only authorized, structurally valid state** reaches durability — after domain invariant enforcement and before commit. Validation originates from domain invariants; persistence validation confirms routing and structural integrity.

### 15.2 Validation layers

| Layer | Validates | Owner |
|-------|-----------|-------|
| **Domain validation** | Invariants, transitions, eligibility | Domain service |
| **Authorization validation** | Write authority, ownership scope | Domain service + consumed authorization outcomes |
| **Routing validation** | Correct aggregate scope and owner | Persistence Boundary / repository |
| **Structural validation** | Required fields, type conformance, referential shape | Persistence layer — subordinate to domain |
| **Integrity validation** | Cross-record validity within aggregate scope | Domain-first; storage-assisted where declared |

### 15.3 Validation rules

| ID | Rule |
|----|------|
| **DBS-VAL-1** | Domain validation precedes persistence authorization — no bypass |
| **DBS-VAL-2** | Ownership fields are immutable outside governed domain transitions |
| **DBS-VAL-3** | Moderation and publication state mutations validate governance path |
| **DBS-VAL-4** | No orphan authoritative records — valid ownership classification required |
| **DBS-VAL-5** | Cross-aggregate references validate identifier resolution — not foreign mutation |
| **DBS-VAL-6** | Public eligibility references resolve only to publicly eligible records |
| **DBS-VAL-7** | Contact fields on listing scope reject listing-creation capture |
| **DBS-VAL-8** | Append-only evidence rejects update and delete operations |

### 15.4 Forbidden mutation validation

The following mutations must be **structurally rejected** at persistence validation regardless of caller path:

| Forbidden mutation | Validation outcome |
|--------------------|-------------------|
| Direct `owner_id` change outside governed transition | Reject |
| Direct moderation status change outside Governance Execution | Reject |
| Direct role binding change outside Governance Execution | Reject |
| Cross-owner authoritative record mutation | Reject |
| Contact injection at listing creation persistence | Reject |
| Evidence record mutation after append | Reject |

### 15.5 Validation prohibitions

- Persistence validation substituting for domain invariant enforcement;
- Nullable ownership on authoritative marketplace records;
- Storage-level cascade mutating foreign domain aggregates without domain authorization;
- Validation bypass for bulk operations or operational tools;
- Client-supplied authority fields accepted without domain confirmation.

---

## 16. Testing Standards

### 16.1 Testing principle

Persistence testing verifies that **engineering discipline honors architectural governance** — ownership, aggregate boundaries, transaction scope, consistency declarations, and DB-INV / DBS-INV invariants.

Testing standards are architectural — they do not mandate frameworks, tools, or test syntax.

### 16.2 Required verification categories

| Category | What must be verifiable |
|----------|------------------------|
| **Ownership enforcement** | Only owning authority writes to authoritative record class |
| **Aggregate boundary** | Mutations enter through root; no cross-aggregate silent writes |
| **Forbidden mutation rejection** | §15.4 mutations are rejected |
| **Transaction scope** | Multi-step operations honor declared atomicity or compensation |
| **Consistency behavior** | Projections reconcile; public reads honor eligibility |
| **Evidence separation** | Append-only evidence does not mutate domain aggregates |
| **Migration integrity** | Post-migration ownership map and invariants preserved |
| **Read/write separation** | Query paths do not mutate authoritative state |
| **Read persistence discipline** | Visibility, bypass prohibition, and stale-read obligations per §9 |
| **Referential integrity discipline** | Domain-first integrity and cascade declaration per §10 |

### 16.3 Testing scope rules

| Rule | Requirement |
|------|-------------|
| **DBS-TST-1** | Aggregate boundary tests are scoped to owning unit — locally reasoned |
| **DBS-TST-2** | Cross-aggregate scenarios verify orchestration-declared scope — not storage coupling |
| **DBS-TST-3** | Migration tests validate ownership continuity and invariant preservation |
| **DBS-TST-4** | Governance-sensitive paths test strong consistency — not assumed |
| **DBS-TST-5** | Background path tests inherit synchronous authorization and scope discipline |
| **DBS-TST-6** | Test fixtures do not become authoritative truth in non-test environments |

### 16.4 Testing ownership

| Test concern | Accountable authority |
|--------------|----------------------|
| Domain persistence behavior | Owning domain realization unit |
| Cross-domain orchestration persistence | Application Orchestration + participating units |
| Migration verification | Owning domain unit + migration reviewer |
| Projection reconciliation | Projection owner |

### 16.5 Testing prohibitions

- Tests that bypass domain confirmation to reach persistence;
- Shared mutable test state across owner boundaries without declaration;
- Migration tests that do not verify ownership continuity;
- Tests asserting projection truth without authoritative source;
- Test-only authorization bypass persisting into production paths.

---

## 17. Documentation Standards

### 17.1 Documentation principle

Persistence engineering artifacts must be **reviewable from documentation alone** — enabling independent compliance verification against DATABASE_ARCHITECTURE.md and this document.

### 17.2 Required documentation artifacts

| Artifact | Owner | Required content |
|----------|-------|------------------|
| **Aggregate catalog** | Owning domain unit | Per §5.4 |
| **Persistence ownership map** | Backend architecture reference + unit supplement | State class to aggregate mapping |
| **Consistency declarations** | Owning unit + orchestration for cross-domain | Class, reconciliation owner, staleness rules |
| **Schema evolution record** | Owning domain unit | Change class, compatibility, lineage |
| **Migration artifact** | Owning domain unit | Per §14.3 |
| **Projection source declaration** | Projection owner | Source aggregates, refresh trigger, staleness |
| **Referential integrity posture** | Owning domain unit | Per §10.3 |
| **Historical and archive posture** | Owning domain unit | Per §11.3 |
| **Stale-read declaration** | Projection owner | Per §9.6 |
| **Mutability class registry** | Owning domain unit | Per aggregate — §5.3 |

### 17.3 Documentation rules

| ID | Rule |
|----|------|
| **DBS-DOC-1** | Every authoritative record class has declared owning authority in documentation |
| **DBS-DOC-2** | Undeclared persistence scope is prohibited — documentation precedes integration |
| **DBS-DOC-3** | Breaking changes document succession and migration authority |
| **DBS-DOC-4** | Eventual consistency documentation includes reconciliation owner and trigger |
| **DBS-DOC-5** | Documentation does not embed product behavior definitions — references upstream |
| **DBS-DOC-6** | Documentation lineage traceable to governance basis |

### 17.4 Documentation prohibitions

- Oral tradition substituting for aggregate catalog;
- Implementation-only persistence scope without documentation;
- Documentation redefining platform domain boundaries;
- Schema documentation without compatibility declaration;
- Undocumented parallel persistence behavior.

---

## 18. Review Standards

### 18.1 Review principle

Persistence changes require **independent review** proportional to impact — verifying compliance with DATABASE_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, SECURITY_STANDARDS.md, and DBS-INV invariants.

### 18.2 Review classes

| Change class | Minimum reviewers | Review focus |
|--------------|-------------------|--------------|
| Intra-aggregate additive change | Owning domain reviewer | Ownership, mutability, compatibility |
| New aggregate introduction | Domain reviewer + persistence governance reviewer | DB-AGG, ownership map, lifecycle |
| Cross-aggregate reference change | Owning units + orchestration reviewer | Transaction, consistency, integrity |
| Breaking persistence change | Domain reviewer + independent persistence reviewer | Migration, lineage, invariant preservation |
| Migration artifact | Independent reviewer before execution authorization | §14.3 completeness, ownership continuity |
| Governance-sensitive path change | Domain + security-aware reviewer | Strong consistency, audit legibility |
| Projection introduction | Projection owner + source aggregate owner | Derived non-authority, reconciliation |

### 18.3 Review checklist (mandatory verification)

Reviewers must verify:

1. Owning authority matches BACKEND_ARCHITECTURE.md §11.2 and DATABASE_ARCHITECTURE.md §5;
2. Aggregate scope does not span lifecycle boundaries;
3. No forbidden mutations become structurally possible;
4. Transaction scope matches declared operation class;
5. Consistency class is declared — not assumed;
6. Read/write separation preserved where required;
7. DB-INV and DBS-INV invariants are not weakened;
8. Security classification obligations honored;
9. Documentation artifacts complete per §17;
10. Migration artifacts complete per §14 when applicable.

### 18.4 Review prohibitions

- Self-review only for breaking or cross-domain changes;
- Review bypass for operational urgency;
- Review substituting product authority decisions;
- Approval without documentation artifact verification;
- Review focused on storage convenience over ownership discipline.

---

## 19. Quality Gates

### 19.1 Quality gate principle

Quality gates are **mandatory checkpoints** before persistence engineering artifacts advance toward implementation integration. Gate passage does not authorize implementation.

### 19.2 Gate catalog

| Gate | Trigger | Pass criteria |
|------|---------|---------------|
| **G1 — Scope declaration** | New persistence scope introduced | Aggregate catalog entry; owning authority declared |
| **G2 — Ownership alignment** | Any authoritative write path | Matches ownership map; DBS-REP-1 satisfied |
| **G3 — Invariant compliance** | Any persistence change | DB-INV and DBS-INV verified |
| **G4 — Schema evolution** | Schema change proposed | Compatibility declared; review class satisfied |
| **G5 — Migration readiness** | Migration artifact submitted | §14.3 complete; independent review approved |
| **G6 — Cross-domain integrity** | Multi-aggregate change | Orchestration transaction declaration; consistency documented |
| **G7 — Security alignment** | Classification-affecting change | SECURITY_STANDARDS.md obligations verified |
| **G8 — Documentation completeness** | Pre-integration | §17 artifacts present and current |
| **G9 — Test verification** | Pre-integration | §16 categories addressed for change scope |

### 19.3 Gate sequencing

```
G1 Scope declaration
    → G2 Ownership alignment
        → G3 Invariant compliance
            → G4 / G5 / G6 (as applicable)
                → G7 Security alignment
                    → G8 Documentation completeness
                        → G9 Test verification
```

Skipping gates requires explicit governance exception — not implementation convenience.

### 19.4 Quality gate prohibitions

- Gate passage treated as implementation authorization;
- Gate bypass for bulk or operational changes;
- G3 skipped for "small" changes affecting authoritative records;
- G5 skipped for data-affecting structural changes;
- Gate criteria weakened locally without standards amendment.

### 19.5 Persistence engineering invariants

These invariants apply at persistence engineering scope. Implementation must not contradict them or DATABASE_ARCHITECTURE.md DB-INV invariants.

| ID | Invariant |
|----|-----------|
| **DBS-INV-1** | Every persistence access scope has exactly one owning authority (DB-OWN-1) |
| **DBS-INV-2** | Aggregate implementations do not span lifecycle boundaries (DB-AGG-3) |
| **DBS-INV-3** | Writes require domain confirmation before repository persistence |
| **DBS-INV-4** | Multi-aggregate mutations declare transaction ownership before integration (BCK-TXN-1) |
| **DBS-INV-5** | Partial multi-step mutation does not persist as complete (BCK-TXN-2) |
| **DBS-INV-6** | Post-commit signals follow authoritative persistence — not precede |
| **DBS-INV-7** | Derived and cached persistence is never authoritative (DB-INV-7) |
| **DBS-INV-8** | Evidence persistence does not mutate authoritative aggregates (DB-INV-8) |
| **DBS-INV-9** | Public persistence paths expose only publicly eligible state (DB-INV-9) |
| **DBS-INV-10** | Ownership and moderation fields mutate only through governed paths (DB-INV-10) |
| **DBS-INV-11** | Contact sourcing persists from professional profiles — not listing creation (DB-INV-11) |
| **DBS-INV-12** | Role elevation persists only through governance execution paths (DB-INV-12) |
| **DBS-INV-13** | Analytical persistence is never authoritative (DB-INV-13) |
| **DBS-INV-14** | Eventual consistency is declared in engineering documentation — never assumed (DB-CON-2) |
| **DBS-INV-15** | Persistence engineering does not define product behavior (DB-INV-15) |
| **DBS-INV-16** | Schema evolution requires governed authority — not deployment convenience (DB-INV-17) |
| **DBS-INV-17** | Migration artifacts require independent review before execution authorization |
| **DBS-INV-18** | Undeclared persistence scope is prohibited |
| **DBS-INV-19** | Repository layer does not contain domain invariant logic |
| **DBS-INV-20** | Quality gate passage does not authorize implementation |

DB-INV, BCK-TXN-*, PLT-*, and SEC-INV-* remain authoritative at their respective scopes. DBS-INV operationalizes persistence engineering discipline without replacing upstream invariants.

---

## 20. Dependency Direction

### 20.1 Persistence engineering dependency law

```
Domain services (authoritative logic and invariant enforcement)
    → Persistence authorization (L4 boundary)
        → Persistence access abstraction (repository discipline)
            → Storage access abstraction
                → Physical storage realization (Infrastructure Standards — when published)
```

Reverse dependencies are prohibited: storage layout influencing domain meaning, query convenience driving aggregate design, repository logic defining invariants.

### 20.2 Layer dependency matrix

| Layer | May depend on | Must not depend on |
|-------|---------------|-------------------|
| **Domain service** | Domain contracts, identity context | Repository internals of foreign owners; storage layout |
| **Persistence access abstraction** | Domain service confirmation, storage abstraction | Domain invariant definitions; API contracts |
| **Storage access abstraction** | Infrastructure capability interface | Domain policy; product meaning |
| **Projection layer** | Authoritative source aggregates | Foreign writable aggregates |
| **Evidence layer** | Producing authority context | Domain aggregate mutation paths |

### 20.3 Cross-domain dependency

```
Owning aggregate authority
    → Orchestration (multi-aggregate scope only)
        → Foreign aggregate (via contract — read or governed outcome)
```

Foreign aggregate persistence internals are not implementation dependencies.

### 20.4 Upstream dependency

Database Standards **depends on** DATABASE_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, SECURITY_STANDARDS.md, and upstream architecture — not on implementation artifacts.

### 20.5 Dependency prohibitions

- Repository → Domain service inversion (domain logic in repository);
- Storage schema → Aggregate boundary inversion;
- Projection → Authoritative truth inversion;
- Implementation artifact → Standards authority inversion;
- Infrastructure configuration → Domain policy encoding.

---

## 21. Downstream Consumers

The following documents and artifacts will consume Database Standards. Their content is **not defined here**.

| Consumer | Consumption relationship |
|----------|-------------------------|
| **Development Standards** | Implementation conventions within persistence engineering discipline |
| **Infrastructure Standards** | Storage realization honoring separation and abstraction rules |
| **Implementation Governance** | Compliance verification against DBS-INV and DB-INV invariants |
| **Observability Architecture** | Audit and telemetry persistence aligned to evidence discipline |
| **Backend implementation** | L4 Persistence Boundary realization; repository discipline |
| **Authorization Architecture** | Persistence write gate aligned to authorization outcomes |
| **Migration execution** (when authorized) | Migration artifact requirements from §14 |

### 21.1 Consumption model

Downstream standards and implementation must:

1. Declare Database Standards as consumed authority for persistence engineering discipline;
2. Preserve aggregate ownership map inherited from BACKEND_ARCHITECTURE.md §11.2;
3. Honor DATABASE_ARCHITECTURE.md DB-INV invariants without contradiction;
4. Not redefine platform domain boundaries or product meaning;
5. Reference — not duplicate — aggregate, transaction, and consistency governance;
6. Remain technology-specific only at implementation layer — not in this document;
7. Treat gate passage as discipline compliance — not implementation authorization.

### 21.2 Subordinate artifact rule

Generated persistence artifacts (including mapping definitions and migration scripts when implementation is authorized) are **subordinate encodings**. They do not supersede Database Standards or DATABASE_ARCHITECTURE.md authority. Where artifact conflicts with governed persistence semantics, governance prevails.

---

## 22. Prohibited Scope

This document and persistence engineering standards **must not** specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Storage products, engines, or vendors | Infrastructure Standards |
| Data definition language syntax or scripts | Implementation (when authorized) |
| Mapping framework selection or ORM patterns | Development Standards / implementation |
| Table, collection, index, or partition design | Implementation (when authorized) |
| Sharding, replication, or backup implementation | Infrastructure Standards |
| Query language or optimization tactics | Implementation (when authorized) |
| Connection pooling, driver configuration | Implementation |
| Migration tool commands or rollout runbooks | Implementation (when authorized) |
| API endpoints or payload schemas | API_STANDARDS.md |
| Domain invariants and transitions | BACKEND_ARCHITECTURE.md · domain services |
| Product behavior and experience meaning | Product Design Standard |
| Authentication, authorization mechanisms | SECURITY_STANDARDS.md · Authentication/Authorization Architecture |
| Cloud provider, container, or orchestration configuration | Infrastructure Standards |
| Cache product selection | Development Standards · Infrastructure Standards |
| Phase 4 Product Development Methodology | Phase 4 |
| Persistence architecture governance redefinition | DATABASE_ARCHITECTURE.md |

**Standards only.** Implementation proceeds only under separate implementation authorization after applicable standards publication.

---

## 23. Terminology

| Term | Meaning |
|------|---------|
| **Persistence engineering** | Implementation discipline for realizing durable state — subordinate to persistence architecture |
| **Persistence access abstraction** | Repository-scoped interface routing authorized durability operations |
| **Persistence repository** | Engineering abstraction storing and retrieving one aggregate scope — not `REPOSITORY_STANDARDS.md` |
| **Aggregate catalog** | Declared registry of aggregate implementations per owning authority |
| **Mutability class** | Governed record change posture: mutable, immutable-after-commit, append-only, regenerable |
| **Transaction scope** | Engineering realization of declared consistency boundary for an operation |
| **Migration artifact** | Governed engineering document describing persistent structure or classification transformation |
| **Schema evolution record** | Documented governed change to persistent structure with compatibility declaration |
| **Reconciliation** | Process restoring alignment between derived or lagging copies and authoritative source |
| **Projection refresh** | Regeneration of derived persistence from authoritative sources |
| **Quality gate** | Mandatory checkpoint before persistence artifact integration |
| **Validation layer** | Domain, authorization, routing, or structural check before commit |
| **Consistency declaration** | Documented consistency class with reconciliation owner and trigger |
| **Ownership map** | Authoritative assignment of state class to owning unit — BACKEND_ARCHITECTURE.md §11.2 |
| **Persistence versioning** | Declared lineage of schema and migration artifacts |
| **Subordinate encoding** | Generated or executable artifact subordinate to standards authority |
| **DBS-INV** | Persistence engineering invariant defined in this document |
| **DB-INV** | Persistence architecture invariant defined in DATABASE_ARCHITECTURE.md — authoritative, not redefined here |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, DATABASE_ARCHITECTURE.md, SECURITY_STANDARDS.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 24. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Database Standards |
| **Authority class** | Authoritative persistence engineering standards |
| **Binding authority** | Active — per REPOSITORY_STANDARDS.md §7.6 |
| **Publication** | COMPLETE |
| **Phase** | Database Standards — Phase 3 domain standard (MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — execution order position 1) |
| **Implementation** | NOT AUTHORIZED |
| **Supersedes** | Informal persistence implementation convention |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · DATABASE_ARCHITECTURE.md · API_STANDARDS.md · SECURITY_STANDARDS.md |
| **Superior to** | Development persistence conventions · Implementation artifacts · Subordinate persistence encodings (on persistence engineering matters — upon publication) |
| **Does not authorize** | Implementation; storage technology selection; migration execution; Phase 3 completion |
| **Prerequisites** | DATABASE_ARCHITECTURE.md published; SECURITY_STANDARDS.md published; Phase 3 Evolution AUTHORIZED — satisfied |

---

**Document path:** `docs/engineering/DATABASE_STANDARDS.md`  
**Related:** `docs/engineering/DATABASE_ARCHITECTURE.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/SECURITY_STANDARDS.md` · `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
