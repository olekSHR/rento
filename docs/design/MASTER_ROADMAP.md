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
| **Approved chapters** | 1–42 |
| **Latest approved** | Chapter 42 — Rent Lifecycle Experience |
| **Latest checkpoint** | 0ed5451 (Chapter 42 integration pending commit) |
| **Current chapter** | Chapter 43 — not yet started |
| **Decision Experience** | **COMPLETE** (Chapters 31–37 — judgment progression) |
| **Housing Obligation** | **COMPLETE** (Chapters 38–40 — legal, financial, and occupancy execution readiness) |
| **Settled Tenancy** | **IN PROGRESS** (Ch 41 foundation + Ch 42 rent lifecycle approved; Ch 43+ specialized chapters forward) |
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
Settled Tenancy (Ch 41+) ← IN PROGRESS
    Ch 41 — Settled Tenancy Experience ✓ APPROVED (foundation)
    Ch 42 — Rent Lifecycle Experience ✓ APPROVED (first specialized dimension)
    Ch 43+ — maintenance, dispute, conclusion ← ACTIVE
    ↓
Platform & governance domains (forward)
```

**Architectural transition (Design Council approved):** Chapter 41 opens the Settled Tenancy macro-domain. Chapter 42 establishes the **first specialized dimension** — Rent Lifecycle Experience — governing recurring rent obligation experience during Active Tenancy. Chapter 43+ continues with maintenance, dispute, and conclusion dimensions per Chapters 41–42 forward deferrals.

**Concept separation (mandatory):**

| Concept | Scope |
|---------|-------|
| **Housing Journey** | User journey from search through housing decision and execution readiness (Chapters 13–40) — defined in Chapter 23 |
| **Tenancy Lifecycle** | Relationship lifecycle after occupancy begins — foundation in Chapter 41; rent lifecycle in Chapter 42; further dimensions in Chapter 43+ |

These concepts must **never** be merged. Housing Journey does not extend into ongoing tenancy. Tenancy Lifecycle does not subsume search or decision experience.

**Platform posture (Settled Tenancy block):** Rento remains a marketplace platform. Rento does **not** become a Property Management System.

## Remaining work

The following chapter domains remain to be authored, reviewed, and approved:

- **Settled Tenancy** *(IN PROGRESS — Ch 41 foundation + Ch 42 rent lifecycle approved; Ch 43+ maintenance, dispute, conclusion forward)* — experience surrounding an active tenancy; principles only — not property management operations
- **Realtor Platform** — realtor-facing product experience beyond existing foundation chapters
- **Admin Platform** — moderation, governance, and administrative experience
- **Design System Governance** — standards enforcement, evolution, and exception policy
- **Accessibility & Internationalization** — inclusive and multilingual product experience
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

**Document path:** `docs/design/MASTER_ROADMAP.md`  
**Related:** `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` · `docs/design/CURSOR_HANDOFF.md`
