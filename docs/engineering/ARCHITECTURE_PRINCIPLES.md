# Rento Architecture Principles

**Status:** PUBLISHED — Phase 3.2 Engineering Principles  
**Authority class:** Authoritative engineering principles  
**Audience:** Engineering Architecture Program, Engineering Leadership, Standards Authors, Reviewers  
**Governance basis:** PROJECT_CONSTITUTION.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Document Purpose

This document is the **authoritative engineering principles document** for the Rento project.

It defines the enduring architectural principles that every future engineering standard must follow. It translates constitutional engineering authority into actionable architectural discipline — without specifying implementation, technology, or product behavior.

This document governs **how engineering thinks structurally**. It does not govern what the product means. Product meaning remains exclusively product authority.

**Repository is the single source of truth.** Principles exist only when recorded in approved repository documents.

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    → Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        → Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            → Engineering principles (this document)
                → Domain engineering standards (when approved)
                    → Implementation artifacts
```

### 2.2 What this document is

- The highest-level **architectural principles** authority in engineering;
- The structural philosophy all domain standards must inherit;
- The review baseline for architectural consistency across engineering documents.

### 2.3 What this document is not

- Constitutional authority — governance gates and program boundaries belong to PROJECT_CONSTITUTION.md;
- Product authority — experience meaning and behavioral product systems belong to the Product Design Standard;
- Domain standards — backend, frontend, API, database, security implementation, infrastructure, and development conventions belong to subordinate documents;
- Implementation guidance — code, frameworks, languages, and tooling are out of scope.

### 2.4 Amendment

Principles in this document may be amended only through explicit governance review. Amendments must preserve product authority supremacy and constitutional compliance.

---

## 3. Relationship to Upstream Authority

### 3.1 Constitution

This document **implements** PROJECT_CONSTITUTION.md. It does not restate constitutional governance. Where a topic is constitutional — authority hierarchy, prohibited activities, program gates, repository truth — the constitution prevails.

### 3.2 Product Design

This document **honors** approved product architecture. Engineering structure must preserve:

- Product truth and trust semantics;
- Mandatory lifecycle and macro-domain separation;
- Marketplace posture;
- Immutable domain rules;
- Participation and execution distinction;
- Performance Integrity and perceived-truth constraints inherited from product authority.

Engineering principles may make product constraints more structurally explicit. They may not weaken, bypass, or reinterpret them.

### 3.3 Inherited constraints

All principles in this document operate within inherited constraints from ENGINEERING_HANDOFF.md and PHASE_3_AUTHORIZATION.md. Inherited constraints are binding inputs, not optional context.

---

## 4. Engineering Philosophy

Rento engineering architecture exists to build **durable structures that preserve product truth under change**.

### 4.1 Core beliefs

1. **Structure serves truth** — architecture exists to protect approved meaning in production, not to showcase technical sophistication;
2. **Clarity beats cleverness** — understandable structure outperforms opaque optimization over the long term;
3. **Boundaries are assets** — explicit limits reduce drift, conflict, and accidental coupling;
4. **Simplicity is disciplined** — minimum sufficient structure is a design outcome, not an accident;
5. **Evolution is normal** — systems must change; architecture must make change governable;
6. **Reviewability is mandatory** — architecture that cannot be independently reviewed is not yet architecture.

### 4.2 Architectural posture

Rento engineering favors:

- Explicit over implicit;
- Owned over shared-by-default;
- Composed over monolithic;
- Traceable over anecdotal;
- Boring structure over novel pattern churn;
- Long-term maintainability over short-term delivery convenience.

### 4.3 Non-goals

Engineering architecture does not pursue:

- Maximum abstraction for its own sake;
- Technology uniformity as a goal independent of product fit;
- Structural complexity that mirrors organizational politics;
- Product reinterpretation through engineering convenience;
- Speed obtained by hiding failure, ownership ambiguity, or authority erosion.

---

## 5. Architectural Thinking Model

Every architectural decision should be evaluated through five persistent questions:

| Question | Tests |
|----------|-------|
| **What truth must survive?** | Product meaning, ownership, trust, lifecycle boundaries |
| **What must remain separable?** | Concerns, authorities, roles, participation vs execution |
| **What must remain replaceable?** | Components, adapters, realization strategies |
| **What must remain observable?** | State, failure, authority decisions, moderation outcomes |
| **What must remain governable?** | Evolution path, review surface, documentation trace |

A proposal that answers only the last question — governability of delivery — without the first four is incomplete architecture.

---

## 6. Structural Discipline Principles

### AP-1 — Simplicity

**Principle:** Prefer the minimum sufficient structure that preserves product truth, security, and maintainability.

**Why it exists:** Complexity is the default outcome of unmanaged growth. Unnecessary structure increases review cost, defect surface, and contributor onboarding burden.

**Problem it prevents:** Over-engineering, premature generalization, architecture that exists to justify itself, and systems that require oral tradition to operate.

**Standards inheritance:** Domain standards must justify additional structural layers by named product, security, or maintainability need — not by pattern preference.

**Long-term support:** Simple structures survive contributor turnover and technology change because their intent remains legible.

---

### AP-2 — Explicit Boundaries

**Principle:** Every architectural unit must have an explicit boundary — what it owns, what it consumes, and what it must never own.

**Why it exists:** Implicit boundaries erode under pressure. Drift begins where ownership is assumed rather than declared.

**Problem it prevents:** Scope creep, silent authority absorption, cross-domain mutations, and "utility" modules that become undeclared centers of gravity.

**Standards inheritance:** Domain standards must declare boundary tables: owned responsibilities, consumed authorities, explicit exclusions.

**Long-term support:** Explicit boundaries make scaling teams and systems parallelizable without reinterpretation wars.

---

### AP-3 — Separation of Concerns

**Principle:** Distinct concerns must remain architecturally separable even when operationally integrated.

**Why it exists:** Mixed concerns create change amplification — a local fix in one dimension breaks unrelated behavior in another.

**Problem it prevents:** Product logic embedded in presentation, authorization logic embedded in transport, persistence shape dictating domain meaning, and governance execution collapsing into participation flows.

**Standards inheritance:** Domain standards must identify concern layers and prohibit concern leakage across boundaries except through declared contracts.

**Long-term support:** Separated concerns allow independent evolution of product translation, access control, persistence, and operational realization.

---

### AP-4 — Modularity

**Principle:** The system must decompose into modules with stable identities and declared dependencies.

**Why it exists:** Monolithic structure turns every change into a system-wide risk. Modules create reviewable units of architectural responsibility.

**Problem it prevents:** Unbounded change blast radius, undeclared circular dependency, and modules that exist only as directory accidents.

**Standards inheritance:** Domain standards must define module classes, dependency direction, and forbidden dependency patterns at the architectural level.

**Long-term support:** Modularity enables incremental replacement, isolated testing of architectural intent, and controlled expansion.

---

### AP-5 — High Cohesion

**Principle:** Elements that change together for the same architectural reason must live together.

**Why it exists:** Low cohesion scatters related logic, producing inconsistent updates and hidden coupling through distant files.

**Problem it prevents:** Shotgun surgery, duplicated invariants, and architectural rules enforced in multiple unrelated places.

**Standards inheritance:** Domain standards must group responsibilities by cohesive architectural purpose — not by technical convenience alone.

**Long-term support:** High cohesion keeps invariants local, making product and security rules easier to audit and preserve.

---

### AP-6 — Loose Coupling

**Principle:** Modules must depend on stable contracts, not on internal realization details of other modules.

**Why it exists:** Tight coupling makes replacement expensive and propagates failure across boundaries.

**Problem it prevents:** Ripple refactors, fragile integrations, and architecture where one module's internal rename becomes a system-wide event.

**Standards inheritance:** Domain standards must define contract surfaces and prohibit reaching through boundaries into foreign internals.

**Long-term support:** Loose coupling preserves replaceability as implementation eras change.

---

### AP-7 — Replaceability

**Principle:** Major parts of the system must be replaceable without rewriting product meaning or constitutional constraints.

**Why it exists:** Technology, scale, and operational maturity change. Architecture must not trap the product in a single realization path.

**Problem it prevents:** Vendor lock-in as architecture, domain models shaped irreversibly by transient tooling, and "rewrite required" as the only evolution option.

**Standards inheritance:** Domain standards must identify replaceable units and the contracts that must survive replacement.

**Long-term support:** Replaceability extends system lifespan without product authority churn.

---

### AP-8 — Extension Over Replacement

**Principle:** Architectural evolution adds capability through governed extension rather than silent structural replacement.

**Why it exists:** Replacement without lineage breaks traceability and reopens settled authority decisions.

**Problem it prevents:** Shadow architectures, undeclared migrations of responsibility, and engineering drift that redefines inherited constraints.

**Standards inheritance:** Domain standards must document what they extend, what remains unchanged, and what migration authority is required for breaking structural change.

**Long-term support:** Extension preserves institutional memory and reduces regression risk across years of development.

---

## 7. Quality Architecture Principles

### AP-9 — Maintainability

**Principle:** Maintainability is a first-class architectural outcome, not a post-delivery cleanup activity.

**Why it exists:** Most system cost accrues after initial delivery. Architecture that ignores maintainability externalizes cost into incidents, slow change, and contributor attrition.

**Problem it prevents:** Write-only architecture, knowledge silos, and changes that require heroics.

**Standards inheritance:** Domain standards must specify maintainability expectations: local reasoning, bounded modules, discoverable ownership, and review surfaces.

**Long-term support:** Maintainable architecture compounds delivery speed instead of consuming it.

---

### AP-10 — Scalability

**Principle:** Scalability means architectural capacity to grow in users, data, contributors, and domain scope without structural collapse — not merely horizontal resource addition.

**Why it exists:** Growth stresses boundaries, ownership models, and consistency rules. Architecture must anticipate growth dimensions beyond traffic.

**Problem it prevents:** Scale surprises, emergency sharding of concepts that should have been separated, and performance fixes that compromise product truth.

**Standards inheritance:** Domain standards must identify growth axes relevant to their domain: volume, concurrency, contributor count, geographic expansion, and governance complexity.

**Long-term support:** Scalable structure avoids re-architecture at every growth milestone.

---

### AP-11 — Engineering Consistency

**Principle:** Equivalent architectural problems must receive equivalent structural treatment across the system.

**Why it exists:** Inconsistency forces contributors to relearn rules in every domain and hides defects behind local convention.

**Problem it prevents:** Pattern proliferation, incompatible error handling philosophies, and security rules applied unevenly across similar surfaces.

**Standards inheritance:** Domain standards must reference shared principle patterns and declare only justified domain-specific deviations.

**Long-term support:** Consistency reduces cognitive load and makes system behavior predictable for operators and reviewers.

---

### AP-12 — Reviewability

**Principle:** Architecture must be reviewable by an independent participant using repository documents alone.

**Why it exists:** Architecture that requires hidden context cannot be governed, taught, or audited.

**Problem it prevents:** Tacit architecture, unreviewable shortcuts, and decisions that exist only in implementation diffs.

**Standards inheritance:** Domain standards must be written so a reviewer can verify compliance without oral tradition or tool-specific knowledge.

**Long-term support:** Reviewability scales governance as the engineering program grows.

---

### AP-13 — Traceability

**Principle:** Structural decisions must be traceable to governing authority — product constraints, constitutional rules, or approved engineering standards.

**Why it exists:** Untraceable structure cannot be defended, amended, or safely evolved.

**Problem it prevents:** Orphan patterns, legacy behavior mistaken for authority, and accidental contradictions discovered only in production.

**Standards inheritance:** Domain standards must cite consumed authorities and record architectural decisions with governance basis.

**Long-term support:** Traceability turns architecture into durable institutional knowledge rather than individual memory.

---

## 8. Trust & Security Architecture Principles

### AP-14 — Security by Design

**Principle:** Security constraints must be embedded in architectural structure — not deferred to optional hardening steps.

**Why it exists:** Bolt-on security fails under feature pressure. Structural security survives because it is the default path.

**Problem it prevents:** Authorization gaps, ownership checks as afterthoughts, and sensitive operations reachable through unintended surfaces.

**Standards inheritance:** Domain standards must define security invariants at architectural boundaries: what must be validated, where validation belongs, and what mutations are forbidden.

**Long-term support:** Security by design reduces incident class size as features accumulate.

---

### AP-15 — Authority Integrity

**Principle:** Architectural structure must preserve role authority, delegated governance, and prohibition against privilege expansion.

**Why it exists:** Authority erosion often begins as structural convenience — a shared endpoint, a generic admin path, a bypass for testing that never leaves.

**Problem it prevents:** Realtor-to-admin escalation paths, governance execution beyond delegated scope, and cross-role operations without explicit architectural contracts.

**Standards inheritance:** Domain standards must map role capabilities to architectural surfaces and forbid ambient authority.

**Long-term support:** Authority integrity preserves marketplace trust as features and roles expand.

---

### AP-16 — Ownership Clarity

**Principle:** Every resource with ownership semantics must have exactly one authoritative ownership model in architecture.

**Why it exists:** Ambiguous ownership produces unauthorized mutation, moderation bypass, and inconsistent user-visible truth.

**Problem it prevents:** Shared mutable state without owner, indirect ownership mutation, and listing or profile edits outside owner boundary.

**Standards inheritance:** Domain standards must define ownership source, mutation paths, and forbidden direct mutation patterns — aligned with immutable domain rules.

**Long-term support:** Ownership clarity scales moderation, auditing, and dispute reasoning without structural rework.

---

### AP-17 — Failure Containment

**Principle:** Failures must be architecturally contained so localized defects do not corrupt unrelated product truth.

**Why it exists:** Uncontained failure propagates as false state, hidden partial success, or cross-domain data inconsistency.

**Problem it prevents:** Cascading corruption, ambiguous partial completion, and operational damage mistaken for product truth.

**Standards inheritance:** Domain standards must define failure boundaries, isolation expectations, and truth-preserving degradation posture at architectural level.

**Long-term support:** Failure containment protects trust during incidents and reduces recovery complexity.

---

## 9. Operational Clarity Principles

### AP-18 — Observability as Architectural Honesty

**Principle:** The system must be structurally capable of revealing its operational state, decisions, and failures without guessing.

**Why it exists:** Unobservable systems force debugging through code archaeology and production experimentation.

**Problem it prevents:** Hidden moderation outcomes, undiagnosable ownership violations, and performance problems visible only through user trust damage.

**Standards inheritance:** Domain standards must define what state transitions, authority decisions, and failure classes must be legible at the architectural level — without mandating specific tools.

**Long-term support:** Observability as principle enables operational maturity across technology generations.

---

### AP-19 — Predictable Behavior

**Principle:** Equivalent inputs and authority contexts must produce architecturally equivalent outcomes across the system.

**Why it exists:** Unpredictability reads as untrustworthiness to users and as ungovernability to engineering.

**Problem it prevents:** Divergent code paths for the same domain action, inconsistent moderation results, and behavior that depends on hidden execution order.

**Standards inheritance:** Domain standards must identify canonical paths for domain-significant actions and prohibit undeclared parallel paths.

**Long-term support:** Predictability stabilizes product experience and reduces regression risk.

---

### AP-20 — State Legibility

**Principle:** Domain-significant state must be architecturally legible — its meaning, ownership, and visibility rules must be structurally clear.

**Why it exists:** Illegible state produces stale truth, hidden pending work, and public visibility of non-public data.

**Problem it prevents:** Moderation state confusion, publication of non-available listings, and user-visible states that contradict product meaning.

**Standards inheritance:** Domain standards must model state classes, transitions, and visibility boundaries without collapsing participation and execution semantics.

**Long-term support:** State legibility preserves product truth from ingestion through public display and governance action.

---

### AP-21 — Performance Integrity

**Principle:** Architectural structure must not incentivize deceptive responsiveness or completion signaling that compromises product truth.

**Why it exists:** Performance shortcuts often become product lies — success shown before persistence, failure masked as success, stale state presented as current.

**Problem it prevents:** Speed theater, false completion, and structural patterns that trade perceived speed for truth.

**Standards inheritance:** Domain standards must require honest state progression and prohibit architectural patterns that misrepresent operation completion.

**Long-term support:** Performance integrity preserves trust as latency and load characteristics change.

---

## 10. Authority & Documentation Principles

### AP-22 — Authority Inheritance

**Principle:** Engineering structure must mirror authority inheritance — higher authority constraints flow downward; lower layers may not redefine upward meaning.

**Why it exists:** Inverted authority produces implementation-driven product change.

**Problem it prevents:** Code-level reinterpretation of product rules, local exceptions becoming global behavior, and shadow policy in modules without authority.

**Standards inheritance:** Domain standards must declare consumed authorities and show how constraints propagate into structural rules.

**Long-term support:** Authority inheritance keeps product and engineering programs aligned across years.

---

### AP-23 — Documentation as Architecture

**Principle:** Architectural documentation is part of the system, not a description after the fact.

**Why it exists:** Undocumented architecture is incomplete architecture. If structure cannot be named and reviewed, it is not yet governed.

**Problem it prevents:** Drift between docs and reality, onboarding dependency on individuals, and standards that nobody can verify.

**Standards inheritance:** Domain standards must be authored as durable artifacts with scope, exclusions, consumed authorities, and review criteria.

**Long-term support:** Documented architecture remains governable after original authors leave.

---

### AP-24 — Single Definition

**Principle:** Official engineering concepts must be defined once at owning authority and consumed elsewhere by reference.

**Why it exists:** Duplicate definitions diverge silently and produce incompatible implementations of the same concept.

**Problem it prevents:** Competing glossaries, ambiguous review outcomes, and standards that contradict each other without noticing.

**Standards inheritance:** Domain standards must reference owning definitions and avoid redefining concepts owned upstream.

**Long-term support:** Single definition preserves coherence as the standards corpus grows.

---

## 11. Evolution & Long-Term Architecture Principles

### AP-25 — Governed Evolution

**Principle:** Architectural change requires explicit impact assessment against product authority, constitutional rules, and existing standards.

**Why it exists:** Ungoverned change is how systems lose truth gradually and irreversibly.

**Problem it prevents:** Reactive patch architecture, breaking changes without migration authority, and accumulated exceptions that become the real system.

**Standards inheritance:** Domain standards must define what class of change is permitted locally and what requires escalation.

**Long-term support:** Governed evolution makes multi-year system life viable.

---

### AP-26 — Bounded Experimentation

**Principle:** Experimental structure must be explicitly bounded, identifiable, and non-authoritative until promoted through governance.

**Why it exists:** Experiments are necessary; silent permanence of experiments is architectural debt.

**Problem it prevents:** Prototype paths becoming production truth, trial patterns hardening without review, and experimental bypasses of security or ownership rules.

**Standards inheritance:** Domain standards must define how experimental structure is marked, isolated, and promoted or retired.

**Long-term support:** Bounded experimentation enables learning without compromising production authority.

---

### AP-27 — Long-Horizon Durability

**Principle:** Prefer architectural choices that remain valid across implementation eras, contributor generations, and operational maturity stages.

**Why it exists:** Short-horizon choices externalize cost into future rewrites and product-truth incidents.

**Problem it prevents:** Frequent structural resets, technology-driven redefinitions of stable domain concepts, and architecture that expires with the first toolchain.

**Standards inheritance:** Domain standards must separate durable invariants from replaceable realization choices.

**Long-term support:** Durability reduces total cost and protects user trust over the product lifetime.

---

### AP-28 — Marketplace Posture Preservation

**Principle:** Architectural structure must preserve Rento as a marketplace platform — not as property management, CRM, agency operations, or organizational governance software.

**Why it exists:** Feature pressure gradually turns marketplaces into operators of user businesses unless structure resists it.

**Problem it prevents:** Structural drift toward rent collection, maintenance execution, dispute adjudication, or realtor business management beyond delegated participation.

**Standards inheritance:** Domain standards must evaluate features and modules against marketplace posture and reject structural patterns that change platform class.

**Long-term support:** Posture preservation keeps product identity stable as capabilities grow.

---

### AP-29 — Lifecycle Separation Preservation

**Principle:** Official product lifecycles and macro-domains must remain architecturally separable even when user experiences connect them in product flows.

**Why it exists:** Lifecycle merging in engineering produces domain models that corrupt moderation, participation, governance, and journey semantics.

**Problem it prevents:** Housing Journey logic inside tenancy operations, governance execution inside realtor participation, and product evolution rules inside implementation modules.

**Standards inheritance:** Domain standards must map modules to lifecycle ownership and forbid cross-lifecycle authority absorption.

**Long-term support:** Lifecycle separation preserves clarity as domain scope expands.

---

## 12. Standards Inheritance Model

Every future engineering standard must declare:

| Declaration | Requirement |
|-------------|-------------|
| **Consumed authorities** | Product chapters, constitution, this document, upstream standards |
| **Principles applied** | Which AP-* principles govern the domain |
| **Owned architectural concerns** | What the standard structurally owns |
| **Explicit exclusions** | What the standard does not define |
| **Boundary contracts** | Inputs, outputs, and forbidden dependencies |
| **Review criteria** | How compliance is verified |

### Inheritance rule

```
If a domain standard contradicts this document → the standard is invalid.
If this document contradicts the constitution → this document is invalid.
If engineering structure contradicts product authority → engineering is invalid.
```

### Compliance expectation

Domain standards implement principles AP-1 through AP-29. They do not selectively ignore principles for delivery convenience.

---

## 13. Principles-Level Prohibitions

At the principles level, the following are forbidden:

1. **Product redefinition** — using engineering structure to change product meaning;
2. **Technology mandates** — prescribing frameworks, languages, or vendors in principles authority;
3. **Implementation leakage** — encoding code-level patterns where architectural rules suffice;
4. **Implicit architecture** — undeclared ownership, boundaries, or authority paths;
5. **Monolithic reasoning** — standards that require whole-system context for local verification;
6. **Security deferral** — treating ownership, role, and mutation rules as optional hardening;
7. **Observability denial** — systems that cannot expose domain-significant state and decisions in principle;
8. **False performance** — architectural reward for deceptive completion or hidden failure;
9. **Lifecycle collapse** — merging distinct product lifecycles into unified engineering domains without authority;
10. **Undocumented exception** — local architectural deviation without declared governance basis.

Constitutional prohibitions remain authoritative and are not duplicated here.

---

## 14. Terminology

| Term | Meaning |
|------|---------|
| **Architectural unit** | A module, boundary, or contract-bearing part of the system at principles level |
| **Boundary contract** | Declared interface between units — not a transport or API specification |
| **Concern** | A distinct architectural responsibility that must remain separable |
| **Cohesion** | Degree to which elements of a unit change together for one architectural reason |
| **Coupling** | Degree to which units depend on each other's internal details |
| **Replaceability** | Ability to substitute a unit without rewriting product meaning |
| **Authority inheritance** | Downward flow of binding constraints from higher authority |
| **State legibility** | Structural clarity of domain-significant state meaning and visibility |
| **Performance integrity** | Honest representation of operation progress and completion |
| **Reviewability** | Capacity for independent compliance verification from documentation |
| **Traceability** | Link from structural decision to governing authority |
| **Domain standard** | Approved engineering document subordinate to this principles document |
| **Experimental structure** | Bounded, non-authoritative architectural trial pending governance promotion |

Terms defined in the Product Design Standard or PROJECT_CONSTITUTION.md retain their upstream meaning.

---

## 15. Document Status

| Item | Status |
|------|--------|
| **Authority class** | Authoritative engineering principles |
| **Supersedes** | Informal architectural convention; ad hoc engineering preference |
| **Subordinate to** | PROJECT_CONSTITUTION.md; Product Design Standard for product meaning |
| **Superior to** | Domain engineering standards (when authored) |
| **Does not authorize** | Implementation; domain-specific technology choices |
| **Prerequisite** | PROJECT_CONSTITUTION.md publication recommended before approval |

---

**Document path:** `docs/engineering/ARCHITECTURE_PRINCIPLES.md`  
**Related:** `docs/engineering/PROJECT_CONSTITUTION.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_AUTHORIZATION.md` · `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`
