# Rento Master Roadmap

This document is the **highest-level planning document** for the Rento project. It defines the strategic order of all future architectural phases — from product design through engineering standards to reusable methodology.

**Current active phase:** **Rento Product Design Standard**

Only this phase is currently active. Nothing from future phases may begin until this phase is completed and formally approved.

### AI Session Initialization

Before continuing work, always read the official project documentation in the following order:

1. `docs/design/MASTER_ROADMAP.md`
2. `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`
3. `docs/design/CURSOR_HANDOFF.md`

Do not rely on previous chat memory.

Project documentation is the single source of truth.

If documentation conflicts with previous conversation context, documentation always takes precedence.

Do not begin authoring, reviewing, or modifying architecture until all three documents have been read and understood.

---

# Phase 1 — Product Design Standard

**Objective:** Complete the full RENTO PRODUCT DESIGN STANDARD — approximately **60–70 chapters** governing product philosophy, experience principles, and behavioral systems for all present and future design decisions.

This is **not** implementation documentation. It is the authoritative product design contract for Rento.

## Current status

| Item | Status |
|------|--------|
| **Approved chapters** | 1–62 |
| **Latest approved** | Chapter 62 — Accessibility & Internationalization Experience |
| **Latest approved chapter checkpoint** | `1ddbefe` — approve chapter 62 accessibility internationalization experience |
| **Latest repository continuity checkpoint / current HEAD** | `1ddbefe` — approve chapter 62 accessibility internationalization experience |
| **Pending checkpoint** | Accessibility & Internationalization macro-domain completion sign-off complete in working tree — commit checkpoint pending explicit authorization |
| **Current chapter** | None — Accessibility & Internationalization macro-domain COMPLETE (GD-011); Performance Experience not started; Future Product Evolution not started |
| **Admin Platform** | **COMPLETE** (Ch 51 foundation ✓ + Ch 52–55 named execution dimensions ✓ — **named Ch 51 §13.3 registry closed**) |
| **Admin Platform Phase 0** | **COMPLETE** (GD-008) |
| **Design System Governance** | **COMPLETE (GD-010)** (Ch 56 foundation ✓ + Ch 57 standards enforcement ✓ + Ch 58 standards evolution ✓ + Ch 59 exception policy experience ✓ + Ch 60 Product Review Checklist ✓ + Ch 61 Anti-Patterns Registry ✓; Ch 56 §10.3 named execution dimensions closed; Ch 56 §10.5 forward objects closed; additional specialized dimensions remain Design Council extension point only) |
| **Design System Governance Phase 0** | **COMPLETE** (PHASE_0_DESIGN_SYSTEM_GOVERNANCE) |
| **Accessibility & Internationalization** | **COMPLETE (GD-011)** (Ch 62 foundation ✓; no specialized execution chapters justified; additional dimensions remain Design Council extension point only) |
| **Accessibility & Internationalization Phase 0** | **COMPLETE** (PHASE_0_ACCESSIBILITY_INTERNATIONALIZATION) — one foundation chapter justified and approved as Chapter 62 |
| **Decision Experience** | **COMPLETE** (Chapters 31–37 — judgment progression) |
| **Housing Obligation** | **COMPLETE** (Chapters 38–40 — legal, financial, and occupancy execution readiness) |
| **Settled Tenancy** | **COMPLETE** (Ch 41 foundation + Ch 42–45 specialized dimensions — Ch 45 terminal dimension) |
| **Realtor Platform** | **COMPLETE** (Ch 46 foundation + Ch 47–50 specialized dimensions — named Ch 46 §13.3 registry closed) |
| **Standard version target** | RENTO PRODUCT DESIGN STANDARD v1.0 |

## Product architecture progression

```
Foundation (Ch 1–12)
    ↓
Search Experience (Ch 13–30) ✓ COMPLETE
    ↓
Decision Experience (Ch 31–37) ✓ COMPLETE
    ↓
Housing Obligation (Ch 38–40) ✓ COMPLETE
    ↓
Settled Tenancy (Ch 41–45) ✓ COMPLETE
    Ch 41 — Settled Tenancy Experience ✓ APPROVED (foundation)
    Ch 42 — Rent Lifecycle Experience ✓ APPROVED (first specialized dimension)
    Ch 43 — Maintenance and Repair Experience ✓ APPROVED (second specialized dimension)
    Ch 44 — Tenancy Dispute and Escalation Experience ✓ APPROVED (third specialized dimension)
    Ch 45 — Tenancy Conclusion Experience ✓ APPROVED (terminal specialized dimension)
    ↓
Realtor Platform (Ch 46–50) ✓ COMPLETE
    Ch 46 — Realtor Platform Experience ✓ APPROVED (macro-domain foundation)
    Ch 47 — Listing Publication and Moderation Participation Experience ✓ APPROVED (first specialized dimension)
    Ch 48 — Professional Activation Experience ✓ APPROVED (second specialized dimension)
    Ch 49 — Professional Verification Participation Experience ✓ APPROVED (third specialized dimension)
    Ch 50 — Inquiry Stewardship Experience ✓ APPROVED (fourth specialized dimension)
    ↓
Admin Platform (Ch 51–55) ✓ COMPLETE
    Ch 51 — Admin Platform Experience ✓ APPROVED (macro-domain foundation)
    Ch 52 — Listing Moderation Decision Execution Experience ✓ APPROVED (first specialized dimension)
    Ch 53 — Role Grant and Revocation Execution Experience ✓ APPROVED (second specialized dimension)
    Ch 54 — Verification Program Execution Experience ✓ APPROVED (third specialized dimension)
    Ch 55 — Platform Policy Enforcement Experience ✓ APPROVED (fourth named specialized dimension)
    ↓
Design System Governance (Ch 56–61) ✓ COMPLETE
    Ch 56 — Design System Governance Experience ✓ APPROVED (macro-domain foundation)
    Ch 57 — Standards Enforcement Experience ✓ APPROVED (first specialized dimension)
    Ch 58 — Standards Evolution Experience ✓ APPROVED (second specialized dimension)
    Ch 59 — Exception Policy Experience ✓ APPROVED (third specialized dimension)
    Ch 60 — Product Review Checklist ✓ APPROVED (fourth specialized Design System Governance dimension)
    Ch 61 — Anti-Patterns Registry ✓ APPROVED (fifth specialized Design System Governance dimension; closes Ch 56 §10.5 Anti-Patterns Registry forward object)
    ↓
Accessibility & Internationalization ✓ COMPLETE
    Ch 62 — Accessibility & Internationalization Experience ✓ APPROVED (foundation; closes A&I macro-domain content boundary)
    ↓
Forward macro-domains
    Performance Experience, Future Product Evolution
```

**Architectural transition (Design Council approved):** Chapter 41 opens the Settled Tenancy macro-domain. Chapter 42 establishes the **first specialized dimension** — Rent Lifecycle Experience — governing recurring rent obligation experience during Active Tenancy. Chapter 43 establishes the **second specialized dimension** — Maintenance and Repair Experience — governing maintenance and repair context during Active Tenancy. Chapter 44 establishes the **third specialized dimension** — Tenancy Dispute and Escalation Experience — governing dispute and escalation context during Active Tenancy. Chapter 45 establishes the **terminal specialized dimension** — Tenancy Conclusion Experience — governing normal and expected tenancy conclusion during Active Tenancy. **Settled Tenancy macro-domain (Chapters 41–45) is architecturally complete** for Tenancy Lifecycle specialized dimension coverage. Chapter 46 opens the **Realtor Platform macro-domain** — macro-domain foundation consuming Chapters 18–19 antecedent layers. Chapter 47 establishes the **first specialized dimension** — Listing Publication and Moderation Participation Experience — governing the realtor's architectural relationship with Publication Integrity inside the marketplace. Chapter 48 establishes the **second specialized dimension** — Professional Activation Experience — governing orientation into legitimate marketplace professional participation. Chapter 49 establishes the **third specialized dimension** — Professional Verification Participation Experience — governing participation in platform attestation of professional standing. Chapter 50 establishes the **fourth specialized dimension** — Inquiry Stewardship Experience — governing professional responsibility toward consumer inquiries beyond contact initiation. **Realtor Platform macro-domain (Chapters 46–50) is architecturally complete** for named Ch 46 §13.3 specialized dimension coverage. Chapter 51 opens the **Admin Platform macro-domain** — macro-domain foundation consuming Chapter 20 as antecedent trust meaning layer, with Platform Governance Lifecycle, participation-execution separation from Chapters 46–50, and governance-execution-honors-delegated-authority-only posture per GD-008. Chapter 52 establishes the **first specialized dimension** — Listing Moderation Decision Execution Experience — governing execution of delegated listing moderation decisions. Chapter 53 establishes the **second specialized dimension** — Role Grant and Revocation Execution Experience — governing execution of delegated realtor role scope changes. Chapter 54 establishes the **third specialized dimension** — Verification Program Execution Experience — governing execution of delegated verification program adjudication. Chapter 55 establishes the **fourth named specialized dimension** — Platform Policy Enforcement Experience — governing residual delegated marketplace policy enforcement execution. **Admin Platform macro-domain (Chapters 51–55) is architecturally complete** for named Ch 51 §13.3 specialized dimension coverage. Additional Admin Platform specialized dimensions are not currently justified; future dimensions require a documented architectural gap and Design Council approval. Admin Platform completion does **not** imply Product Design Standard v1.0 completion. Chapter 56 opens the **Design System Governance macro-domain** — macro-domain foundation consuming Chapters 5 and 11 as antecedent layers, with Governance Subject Principle, Product Design Standard Lifecycle, architectural ownership levels (Product Experience / Platform Governance / Design System Governance), and standards governance-honors-product-design-standard-only posture per PHASE_0_DESIGN_SYSTEM_GOVERNANCE. Chapter 57 establishes the **first specialized dimension** — Standards Enforcement Experience — governing Standard Compliance as architectural state and protecting Product Design Standard authority without implementation, registry content, Chapter 5 redefinition, Chapter 11 redefinition, or Chapter 56 foundation rewrite. Chapter 58 establishes the **second specialized dimension** — Standards Evolution Experience — governing controlled Product Design Standard evolution with Evolution Candidate separation, Product Design Standard Evolution Approval discipline, Continuous Architectural Lineage, Chapter 5 / Chapter 11 / Chapter 56 / Chapter 57 ownership preservation, no implementation scope, and no registry content. Chapter 59 establishes the **third specialized dimension** — Exception Policy Experience — governing standard-level authorized exception status legibility with Chapter 5 / Chapter 11 / Chapter 56 / Chapter 57 / Chapter 58 authority preservation, no implementation scope, and no registry content. Design Council governance reconciliation assigns **Chapter 60 — Product Review Checklist** and **Chapter 61 — Anti-Patterns Registry** as forward Design System Governance registry objects. Chapter 60 establishes the **fourth specialized dimension** — Product Review Checklist — governing standard-wide product design review attention with Checklist Completion State, Architectural Finding, Governed Classification routing, PRC-1 through PRC-15, Chapter 5 / Chapter 11 / Chapter 20 / Chapter 56 / Chapter 57 / Chapter 58 / Chapter 59 authority preservation, principles-only scope, and Chapter 61 separation. Chapter 61 establishes the **fifth specialized dimension** — Anti-Patterns Registry — governing durable registry-level negative precedent for recurring or structurally repeatable product-design failure patterns, with Evidence-is-not-authority discipline, mandatory Registry Eligibility criteria, minimal lifecycle, APR-1 through APR-17, principles-only scope, no actual registry entries, and Chapter 5 / Chapter 11 / Chapter 20 / Chapter 56 / Chapter 57 / Chapter 58 / Chapter 59 / Chapter 60 authority preservation. Chapter 61 approval closes the Chapter 56 §10.5 Anti-Patterns Registry forward object. Chapter 61 approval does **not** populate Anti-Patterns Registry, does **not** close Design System Governance macro-domain, does **not** start Design System Governance macro-domain completion review, does **not** authorize additional specialized dimensions, and does **not** imply Product Design Standard v1.0 completion.

**Concept separation (mandatory):**

| Concept | Scope |
|---------|-------|
| **Housing Journey** | User journey from search through housing decision and execution readiness (Chapters 13–40) — defined in Chapter 23 |
| **Tenancy Lifecycle** | Relationship lifecycle after occupancy begins — foundation in Chapter 41; rent lifecycle in Chapter 42; maintenance and repair context in Chapter 43; dispute and escalation context in Chapter 44; tenancy conclusion in Chapter 45 |
| **Realtor Professional Lifecycle** | Supply-side professional marketplace participation — foundation in Chapter 46; publication participation in Chapter 47; professional activation in Chapter 48; professional verification participation in Chapter 49; inquiry stewardship in Chapter 50 |
| **Platform Governance Lifecycle** | Delegated marketplace governance execution — foundation in Chapter 51; moderation decision execution in Chapter 52; role grant and revocation execution in Chapter 53; verification program execution in Chapter 54; platform policy enforcement in Chapter 55 |
| **Product Design Standard Lifecycle** | Governance of the Product Design Standard itself — foundation in Chapter 56; standards enforcement in Chapter 57; standards evolution in Chapter 58; exception policy experience in Chapter 59; product review checklist in Chapter 60; anti-patterns registry in Chapter 61 |
| **Accessibility & Internationalization Experience** | Inclusive and multilingual access to Rento product meaning across abilities, languages, locales, roles, journeys, states, and trust-critical decisions — foundation in Chapter 62 |

These concepts must **never** be merged. Housing Journey does not extend into ongoing tenancy. Tenancy Lifecycle does not subsume search or decision experience. Realtor Professional Lifecycle does not subsume Housing Journey or Tenancy Lifecycle. Platform Governance Lifecycle does not subsume Housing Journey, Tenancy Lifecycle, or Realtor Professional Lifecycle. Product Design Standard Lifecycle does not subsume Platform Governance Lifecycle, component lifecycle (Chapter 11), or experience macro-domains. Accessibility & Internationalization Experience does not subsume Performance Experience, Future Product Evolution, Project Architecture & Standards, Product Development Methodology, Design System Governance, or source-domain chapter authority.

**Platform posture (Settled Tenancy block):** Rento remains a marketplace platform. Rento does **not** become a Property Management System.

**Platform posture (Realtor Platform block):** Rento remains a marketplace platform. Rento does **not** become CRM, agency ERP, or property management for realtors. **The platform never operates the realtor's professional business.**

**Platform posture (Admin Platform block):** Rento remains a marketplace platform. Rento does **not** become CRM, agency ERP, property management, or organizational governance software. **Governance execution honors delegated authority only.**

**Platform posture (Design System Governance block):** Rento remains a marketplace platform. Design System Governance governs **the Product Design Standard itself** — not DesignOps, organizational process, delivery governance, or implementation artifacts.

**Design System Governance completion (GD-010):** Chapters 56–61 complete the **Design System Governance macro-domain**. Chapter 56 foundation is sufficient; standards enforcement, standards evolution, and exception policy execution dimensions are closed by Chapters 57–59; Product Review Checklist and Anti-Patterns Registry forward objects are closed by Chapters 60–61. Additional specialized dimensions remain an intentional Design Council extension point only. Design System Governance completion does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion, does **not** assign Chapter 62, and does **not** start the next macro-domain.

**Accessibility & Internationalization chapter approval:** Chapter 62 approves the **Accessibility & Internationalization Experience** foundation chapter. It establishes inclusive and multilingual access to Rento product meaning as a principles-level Product Design Standard authority, preserves Chapters 1–61 without redefinition, excludes implementation and operational process, and keeps Performance Experience and Future Product Evolution separate. Chapter 62 approval does **not** declare Accessibility & Internationalization macro-domain completion, does **not** authorize specialized Accessibility & Internationalization execution chapters, does **not** complete RENTO PRODUCT DESIGN STANDARD v1.0, and does **not** start Performance Experience or Future Product Evolution.

**Accessibility & Internationalization completion (GD-011):** Chapter 62 is sufficient to complete the **Accessibility & Internationalization macro-domain**. Phase 0 required one foundation chapter only; Chapter 62 satisfies the complete minimum architecture, covers all mandatory A&I subjects, preserves Chapters 1–61 without redefinition, and keeps implementation, operations, Performance Experience, and Future Product Evolution outside A&I scope. Additional specialized Accessibility & Internationalization execution chapters are not currently justified and require a future documented architectural gap plus explicit Design Council approval. Accessibility & Internationalization completion does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion and does **not** start Performance Experience or Future Product Evolution.

## Remaining work

The following chapter domains remain to be authored, reviewed, and approved:

- **Performance Experience** — perceived performance as a product trust dimension
- **Future Product Evolution** — forward-looking product capability and evolution principles

## End goal

Formal Design Council approval and publication of:

**RENTO PRODUCT DESIGN STANDARD v1.0**

No Phase 2 work begins until this deliverable is complete and approved.

---

# Phase 2 — Architectural Audit

**Prerequisite:** Phase 1 complete — all Product Design Standard chapters authored and individually approved.

After the final chapter is approved, a **comprehensive architectural audit** is required before declaring RENTO PRODUCT DESIGN STANDARD v1.0 officially complete.

## Audit scope

- **Full consistency review** — principles, tone, and posture aligned across all chapters
- **Cross-reference validation** — chapter relationships, forward/back references, and dependency integrity
- **Vocabulary validation** — official concepts defined once, used consistently, not duplicated or contradicted
- **Duplicate detection** — overlapping guidance consolidated or explicitly scoped
- **Governance review** — approval workflow, authority order, and amendment criteria
- **Missing architecture review** — gaps in product coverage identified before v1.0 sign-off
- **Final approval** — Design Council sign-off on the complete standard as a single artifact

## Result

Official approval of **RENTO PRODUCT DESIGN STANDARD v1.0** as the completed, audited product design authority for Rento.

---

# Phase 3 — Project Architecture & Standards

**Prerequisite:** Phase 2 complete — RENTO PRODUCT DESIGN STANDARD v1.0 formally approved.

This phase starts **only after** Product Design Standard v1.0 has been approved. It translates approved product architecture into engineering and platform standards.

## Deliverable

**PROJECT ARCHITECTURE & STANDARDS** — the engineering counterpart to the Product Design Standard.

## Scope

- Product Architecture
- Platform Architecture
- Frontend Architecture
- Backend Architecture
- API Standards
- Database Standards
- Security Standards
- Infrastructure Standards
- Development Standards
- Repository Standards
- AI Collaboration Standards
- Implementation Governance

The Product Design Standard remains the **highest authority for product decisions**. Engineering standards implement and extend — they do not override approved product principles.

---

# Phase 4 — Product Development Methodology

**Prerequisite:** Phase 3 complete — PROJECT ARCHITECTURE & STANDARDS approved.

This phase transforms all prior work — product design standard and engineering standards — into a **reusable methodology** applicable to future products beyond Rento.

## Deliverable

**Product Development Methodology v1.0**

A transferable framework for how Rento (and future products) move from product philosophy through standards to disciplined implementation — without skipping phases or conflating product design with engineering documentation.

---

# Project Principles

These principles govern all phases of the Master Roadmap:

- **Never skip phases.** Each phase produces an approved artifact before the next begins.
- **Never redesign approved chapters** without objective architectural justification and explicit Design Council approval.
- **Product Design Standard remains the highest authority** for product decisions throughout all phases.
- **Architecture evolves through extension rather than replacement.** New work builds on approved foundations; it does not silently rewrite them.
- **Prioritize consistency, scalability, maintainability, clarity, accessibility, and long-term evolution** over speed of delivery or scope expansion.

---

# Governance Decisions

## Governance Decision 001

**Status:** APPROVED

**Title:**
MASTER_ROADMAP

**Decision:**

MASTER_ROADMAP.md becomes the official strategic planning document for the Rento project.

---

## Governance Decision 002

**Status:** APPROVED

**Title:**  
AI Session Initialization Policy

**Decision:**

Every new AI session must read documentation in the following order:

1. MASTER_ROADMAP.md
2. RENTO_PRODUCT_DESIGN_STANDARD.md
3. CURSOR_HANDOFF.md

Documentation is the single source of truth.

---

## Governance Decision 003

**Status:** APPROVED

**Title:**  
Documentation Governance Model

**Decision:**

Project documentation is divided into independent governance documents with clearly separated responsibilities.

---

## Governance Decision 004

**Status:** APPROVED

**Title:**  
Three-level Documentation Hierarchy

**Decision:**

**Level 1**  
Strategic Governance  

MASTER_ROADMAP.md

**Level 2**  
Product Governance  

RENTO_PRODUCT_DESIGN_STANDARD.md

**Level 3**  
Operational Continuity  

CURSOR_HANDOFF.md

---

## Governance Decision 005

**Status:** APPROVED

**Title:**  
Chapter 41 Pre-Authoring Analysis — Settled Tenancy Block Opening

**Decision:**

1. Chapter 40 completes the Housing Obligation macro-domain.
2. The next macro-domain is **Settled Tenancy**.
3. **Chapter 41** opens the Settled Tenancy architectural block.
4. Chapter 41 is **not** another Readiness chapter, Property Management, Realtor Platform, Admin Platform, or implementation guidance.
5. Settled Tenancy governs the experience surrounding an active tenancy.
6. Rento remains a marketplace platform and does **not** become a Property Management System.
7. **Housing Journey** (user journey) and **Tenancy Lifecycle** (relationship lifecycle after occupancy begins) are distinct official concepts and must never be merged.
8. Phase 1 Authoring of Chapter 41 may begin only after explicit Design Council authorization following this preparation phase.

---

## Governance Decision 006

**Status:** APPROVED

**Title:**  
Realtor Platform Macro-domain Completion Sign-off

**Decision:**

1. Chapters 46–50 complete the **Realtor Platform macro-domain** — foundation (Ch 46) plus four specialized dimensions (Ch 47–50).
2. All **named deferred dimensions** from Chapter 46 §13.3 are **closed** — publication participation, professional activation, professional verification participation, inquiry stewardship.
3. **No documented architectural gap** remains inside Realtor Platform at this time.
4. **Additional Realtor Platform specialized dimensions are not currently justified.** Future dimensions require a documented architectural gap and explicit Design Council approval.
5. **Realtor Platform macro-domain status is COMPLETE.** This does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion.
6. **Admin Platform** is the next forward macro-domain per MASTER_ROADMAP remaining work — Phase 0 Pre-Authoring may begin only after explicit Design Council authorization.
7. Rento remains a marketplace platform — Realtor Platform completion does **not** change platform posture (no CRM, agency ERP, or property management for realtors).

---

## Governance Decision 007

**Status:** APPROVED

**Title:**  
Macro-domain Development Lifecycle

**Decision:**

The following **Macro-domain Development Lifecycle** is the standard governance process for every Product Design Standard macro-domain — proven during Realtor Platform (Chapters 46–50) and mandatory for all forward macro-domains including Admin Platform, Design System Governance, Accessibility & Internationalization, Performance Experience, and Future Product Evolution.

### Why this lifecycle exists

Macro-domains are architectural units larger than individual chapters. A single macro-domain may require a foundation chapter, multiple specialized dimensions, cross-chapter consumption contracts, and explicit boundary separation from sibling domains. Chapter-by-chapter approval alone does not guarantee macro-domain coherence, registry closure, or release discipline. This lifecycle formalizes the process that produced Realtor Platform without ad hoc variation.

### Standard lifecycle

```
Repository Initialization
    (MASTER_ROADMAP → RENTO_PRODUCT_DESIGN_STANDARD → CURSOR_HANDOFF)
        ↓
Phase 0 — Pre-Authoring Analysis
        ↓
Design Council Review (Phase 0 authorization)
        ↓
Phase 1 — Authoring (per chapter)
        ↓
Phase 2 — Architecture Review (per chapter)
        ↓
Phase 3 — Approval Integration (per chapter)
        ↓
Git Commit (per chapter approval)
        ↓
Git Push (per chapter approval)
        ↓
[Repeat Phase 0–3 through final chapter in macro-domain]
        ↓
Macro-domain Completion Review
        ↓
Macro-domain Completion Sign-off (Design Council governance act)
        ↓
Git Commit (macro-domain completion)
        ↓
Git Push (macro-domain completion)
        ↓
GitHub Release (macro-domain milestone — user-managed)
        ↓
Next Macro-domain (Design Council authorization required)
```

### Governance benefits

| Benefit | Outcome |
|---------|---------|
| **Predictability** | Every macro-domain follows the same governance stages |
| **Authorization gates** | Design Council reviews at Phase 0 and completion sign-off |
| **Traceability** | Git checkpoints and releases map to architectural milestones |
| **Session continuity** | Repository initialization prevents chat-history drift |
| **Registry honesty** | Completion review verifies named deferrals are closed before sign-off |

### Architectural consistency

- Phase 0 evaluates all remaining candidates objectively (RC-4: non-sequential registry order is not authority).
- Each chapter consumes upstream authorities — no silent redefinition.
- Specialized dimensions follow established patterns (participation/stewardship over execution, boundary clarity, invariants where architecturally necessary).
- Macro-domain Completion Review verifies integrity before the block is declared complete.

### Scalability

- Lifecycle scales to macro-domains of varying dimension count — no forced symmetry with prior blocks (Lifecycle Completion Pattern is governance principle, not rigid template).
- Per-chapter git discipline keeps review units manageable as the standard grows toward 60–70 chapters.
- GitHub Releases per macro-domain provide durable milestones without requiring a release per chapter.

### Documentation integrity

- **Documentation is the single source of truth** — repository initialization is mandatory at every session.
- Approval Integration synchronizes `RENTO_PRODUCT_DESIGN_STANDARD.md`, `MASTER_ROADMAP.md`, and `CURSOR_HANDOFF.md`.
- Macro-domain Completion Sign-off is recorded as a Governance Decision in `MASTER_ROADMAP.md`.
- `CURSOR_HANDOFF.md` carries operational state; it must reflect latest checkpoint after each integration.

### Release discipline

- **Git commit** — per approved chapter and per macro-domain completion sign-off.
- **Git push** — after each commit that integrates approved governance state.
- **GitHub Release** — after macro-domain completion sign-off only (not per chapter, not per Phase 0).
- Release tags document macro-domain milestones (e.g. `v1.0-realtor-platform`) — not Product Design Standard v1.0 completion.

### Completion separation (mandatory)

Three completion levels must **never** be conflated:

| Level | Meaning | Does NOT imply |
|-------|---------|----------------|
| **Chapter approval** | Individual chapter APPROVED and integrated into the standard | Macro-domain complete |
| **Macro-domain completion** | Foundation + all named specialized dimensions closed; Completion Review and Sign-off passed | Product Design Standard v1.0 complete |
| **Product Design Standard v1.0 completion** | All macro-domains authored; Phase 2 comprehensive audit passed; Design Council final sign-off | Engineering implementation ready |

**Chapter approval ≠ Macro-domain completion.**

**Macro-domain completion ≠ Product Design Standard completion.**

### Application to forward macro-domains

1. **Design System Governance** — next forward macro-domain per MASTER_ROADMAP remaining work — Phase 0 Pre-Authoring may begin only after explicit Design Council authorization.
2. Each subsequent macro-domain in MASTER_ROADMAP remaining work follows this lifecycle.
3. Additional specialized dimensions within a completed macro-domain require documented architectural gap and Design Council approval — not lifecycle bypass.

### Reference implementation

Realtor Platform (Chapters 46–50) and Admin Platform (Chapters 51–55) are reference implementations of this lifecycle — including GD-006 / `v1.0-realtor-platform` and GD-009 / `v1.0-admin-platform` Macro-domain Completion Sign-off.

---

## Governance Decision 008

**Status:** COMPLETE

**Title:**  
Admin Platform Phase 0 Pre-Authoring Analysis — Entry Chapter Authorization

**Decision:**

1. Admin Platform Phase 0 Pre-Authoring Analysis is **APPROVED WITH CLARIFICATIONS** per `docs/design/PHASE_0_ADMIN_PLATFORM.md`.
2. **Chapter 51 — Admin Platform Experience** is the authorized macro-domain **foundation** entry chapter — not a specialized execution dimension.
3. The following **macro-domain governance principles** are mandatory for Admin Platform authoring:
   - **Lifecycle Necessity Principle** — a parent lifecycle concept may only be introduced when it represents an objectively independent architectural domain; structural symmetry with prior macro-domains is never sufficient justification.
   - **Governance Continuity Scope** — Governance Continuity governs continuity of governance execution within the Admin Platform macro-domain only; it does not include organizational governance, compliance, audit, security operations, or incident management.
   - **Governance Execution Ownership Principle** — Admin Platform owns governance execution only where execution authority has already been delegated by authoritative upstream chapters; it consumes authority and never redefines authority.
   - **Boundary Inheritance Principle** — all future specialized Admin Platform chapters inherit foundation boundaries; they may extend within those boundaries but may never redefine them.
4. **Chapter 51 — Admin Platform Experience** — APPROVED and integrated into RENTO PRODUCT DESIGN STANDARD (Approval Integration complete).
5. Chapters 1–50, Chapter 20 consumption contract, GD-006, GD-007, and all approved separation contracts remain unchanged.
6. **Next forward work:** Chapter 52 Phase 0 Pre-Authoring Analysis — first specialized governance execution dimension within Admin Platform block (Design Council authorization required).

---

## Governance Decision 009

**Status:** APPROVED

**Title:**  
Admin Platform Macro-domain Completion Sign-off

**Decision:**

1. Chapters 51–55 complete the **Admin Platform macro-domain** — foundation (Ch 51) plus four named specialized governance execution dimensions (Ch 52–55).
2. All **named deferred dimensions** from Chapter 51 §13.3 are **closed** — listing moderation decision execution, role grant and revocation execution, verification program execution, platform policy enforcement.
3. **No documented architectural gap** remains inside Admin Platform at this time.
4. **Additional Admin Platform specialized dimensions are not currently justified.** Future dimensions require a documented architectural gap and explicit Design Council approval. **Additional Specialized Dimensions** remains an intentional Design Council extension point per Chapter 51 §13.4 — not architectural debt.
5. **Admin Platform macro-domain status is COMPLETE.** This does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion.
6. **Design System Governance** is the next forward macro-domain per MASTER_ROADMAP remaining work — Phase 0 Pre-Authoring may begin only after explicit Design Council authorization.
7. Rento remains a marketplace platform — Admin Platform completion does **not** change platform posture (no CRM, agency ERP, property management, or organizational governance software). **Governance execution honors delegated authority only.**
8. **Boundary Inheritance**, **Governance Execution Ownership**, **Governance Continuity Scope**, and **Chapter 20** meaning authority remain preserved across the completed block.

---

## Governance Decision 010

**Status:** APPROVED

**Title:**
Design System Governance Macro-domain Completion Sign-off

**Decision:**

1. Chapters 56–61 complete the **Design System Governance macro-domain** — foundation (Ch 56), standards enforcement (Ch 57), standards evolution (Ch 58), exception policy experience (Ch 59), Product Review Checklist (Ch 60), and Anti-Patterns Registry (Ch 61).
2. All **named execution dimensions** from Chapter 56 §10.3 are **closed** — standards enforcement, standards evolution, and exception policy experience.
3. All **named forward objects** from Chapter 56 §10.5 are **closed** — Product Review Checklist and Anti-Patterns Registry.
4. **No documented architectural gap** remains inside Design System Governance at this time.
5. **Additional Design System Governance specialized dimensions are not currently justified.** Future dimensions require a documented architectural gap and explicit Design Council approval. **Additional specialized dimensions** remains an intentional extension point — not architectural debt.
6. **Design System Governance macro-domain status is COMPLETE.** This does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion.
7. Chapter 62 is **not assigned** by this sign-off, and no next macro-domain is started by this decision.
8. Chapter 5, Chapter 11, Chapter 20, and Chapters 56–61 authority boundaries remain preserved.
9. Anti-Patterns Registry population is not required for macro-domain completion; Chapter 61 establishes registry architecture without creating actual registry entries.
10. Product Design Standard v1.0 completion requires separate repository-derived review, Phase 2 comprehensive audit, and final Design Council sign-off.

---

## Governance Decision 011

**Status:** APPROVED

**Title:**
Accessibility & Internationalization Macro-domain Completion Sign-off

**Decision:**

1. Chapter 62 completes the **Accessibility & Internationalization macro-domain** — foundation chapter only, as authorized by `PHASE_0_ACCESSIBILITY_INTERNATIONALIZATION`.
2. Every Phase 0 minimum architecture requirement is satisfied by Chapter 62: macro-domain purpose, inclusive product access invariant, multilingual meaning integrity, locale-sensitive comprehension, localization and translation boundaries, AI translation deferral, content resilience, trust-critical comprehension, user-generated and realtor-generated multilingual content boundaries, admin and moderation language boundaries, Project Architecture & Standards separation, Product Development Methodology separation, and cross-macro-domain consumption without redefinition.
3. **No documented architectural gap** remains inside Accessibility & Internationalization at this time.
4. **Additional Accessibility & Internationalization specialized execution chapters are not currently justified.** Future dimensions require a documented architectural gap and explicit Design Council approval. Additional specialized dimensions remain an intentional Design Council extension point — not architectural debt.
5. **Accessibility & Internationalization macro-domain status is COMPLETE.** This does **not** imply RENTO PRODUCT DESIGN STANDARD v1.0 completion.
6. Performance Experience and Future Product Evolution remain separate forward macro-domains and are not started by this decision.
7. Project Architecture & Standards and Product Development Methodology boundaries remain preserved; implementation standards and operational localization/accessibility process remain outside Product Design Standard scope.
8. Chapters 1–62 authority boundaries remain preserved.
9. AI translation remains deferred post-v1.0 unless future repository authority explicitly introduces it.
10. Product Design Standard v1.0 completion requires remaining forward macro-domains, Phase 2 comprehensive audit, and final Design Council sign-off.

---

**Document path:** `docs/design/MASTER_ROADMAP.md`  
**Related:** `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` · `docs/design/CURSOR_HANDOFF.md`
