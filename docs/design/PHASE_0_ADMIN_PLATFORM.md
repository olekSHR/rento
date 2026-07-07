# Phase 0 — Admin Platform Pre-Authoring Analysis

**Status:** APPROVED WITH CLARIFICATIONS — Approval Integration complete  
**Macro-domain:** Admin Platform  
**Recommended entry chapter:** Chapter 51 — Admin Platform Experience (macro-domain foundation)  
**Governance:** GD-007 Macro-domain Development Lifecycle  
**Audience:** Design Council, Product Design, Architecture Reviewers  

---

## 1. Current State

| Item | Status |
|------|--------|
| **Approved chapters** | 1–50 |
| **Latest approved chapter** | Chapter 50 — Inquiry Stewardship Experience |
| **Latest Git checkpoint** | `e98de10` — add governance decision gd-007 macro-domain lifecycle |
| **Latest GitHub Release** | `v1.0-realtor-platform` |
| **Product Design Standard** | Architecture Ready — **IN PROGRESS** toward v1.0 |
| **Completed macro-domains** | Housing Journey (Ch 13–40), Settled Tenancy (Ch 41–45), Realtor Platform (Ch 46–50) |
| **Realtor Platform registry** | Ch 46 §13.3 named deferrals **CLOSED** (GD-006) |
| **Governance lifecycle** | **GD-007 APPROVED** — mandatory for Admin Platform |
| **Phase 0** | Pre-Authoring Analysis complete; Design Council clarifications integrated |

**Ecosystem position:** Consumer-side architecture and Realtor Platform are complete. Admin Platform is the **next forward macro-domain** per `MASTER_ROADMAP.md` remaining work and GD-006/GD-007.

**Documented deferral debt:** Chapters 46–50 and Chapter 20 explicitly defer **execution authority** to Admin Platform — moderation decision execution, role grant/revocation, verification program adjudication, governance operations, and administrative experience.

---

## 2. Architectural Analysis

### 2.1 Admin Platform Architectural Role

Admin Platform is the **third role-governed macro-domain** in the marketplace ecosystem. It governs how Rento **executes platform governance** — the administrative experience surrounding `admin` role authority.

Per `MASTER_ROADMAP.md`: **Admin Platform** — moderation, governance, and administrative experience.

**Platform posture (derived):** Parallel to Settled Tenancy and Realtor Platform postures, Admin Platform governs **governance execution** — it does **not** become agency ERP, property management, tenancy administration, CRM, or consumer/realtor journey substitute.

### 2.2 Relationship to Completed Macro-Domains

| Completed domain | Relationship to Admin Platform |
|------------------|-------------------------------|
| **Housing Journey** | **Mandatory separation.** Admin does not subsume consumer journey architecture |
| **Settled Tenancy** | **Mandatory separation.** Tenancy administration remains outside platform scope (Ch 41) |
| **Realtor Platform** | **Complementary execution/participation split.** Ch 46–50 govern participation; Admin Platform governs execution |
| **Trust layer (Ch 20)** | **Consumption contract.** Meaning cross-role; execution forward to Admin Platform |

### 2.3 Authority Ownership

| Authority | Owner | Notes |
|-----------|-------|-------|
| Trust/moderation **meaning** | Chapter 20 | Attestation scope, communication ethics |
| Moderation **execution** | Admin Platform (forward) | Deferred from Ch 46 §8, Ch 47–50 |
| Realtor role **grant/revocation** | Admin only | Immutable domain + Ch 46 §9 |
| Listing `status` transitions via moderation | Admin Platform (forward) | Realtors cannot self-approve to `available` |
| Verification program **adjudication** | Admin Platform (forward) | Ch 49 governs realtor participation only |
| Admin role experience philosophy | **Admin Platform macro-domain** | Foundation chapter |

#### Governance Execution Ownership Principle (Design Council Clarification)

**Admin Platform owns governance execution only where execution authority has already been delegated by authoritative upstream chapters.**

- Admin Platform **consumes** authority — it does **not** create new authority.
- Admin Platform **never redefines** authority established in immutable domain rules, Chapter 20, or approved separation contracts in Chapters 46–50.

### 2.4 Lifecycle Ownership

Documentation does not yet name an Admin Platform parent lifecycle concept. **Lifecycle ownership** belongs to the foundation chapter.

#### Lifecycle Necessity Principle (Design Council Clarification)

A parent lifecycle concept may be introduced **only when it represents an objectively independent architectural domain.**

- Structural symmetry with Tenancy Lifecycle (Ch 41) or Realtor Professional Lifecycle (Ch 46) is **never sufficient justification**.
- If no parent lifecycle is objectively necessary, the foundation chapter must state that explicitly and anchor specialized dimensions through boundaries and deferred registry alone.

### 2.5 Governance Responsibilities

Admin Platform macro-domain owns **product-design governance of administrative experience** — orientation to governance responsibility, execution authority without role leakage, honoring Chapter 20 meaning, and registry closure per GD-007.

### 2.6 Architectural Dependencies

**Mandatory upstream consumption:** Ch 1, 4, 5, 10, 11, **Ch 20** (primary antecedent), Ch 46 §8–§9, Ch 47–50 separation contracts, Ch 45 §11.3, MASTER_ROADMAP, GD-006, GD-007.

Unlike Realtor Platform, Admin Platform has **no Ch 18/Ch 19 antecedent foundation chapters**. Chapter 20 is the primary pre-macro-domain trust layer.

### 2.7 Architectural Boundaries

| Boundary | Rule |
|----------|------|
| **Admin ≠ Realtor** | No capability leakage bidirectionally (Ch 46 §8.3, §9.1) |
| **Admin ≠ Consumer journey** | Admin operations not exported to consumer paths (Ch 1 §3.3) |
| **Admin ≠ Tenancy operations** | No rent, maintenance, dispute, or conclusion administration |
| **Admin ≠ Agency/CRM/PMS** | Marketplace governance only |
| **Execution ≠ Participation** | Admin = execution; inverse of Ch 47–50 |
| **Meaning ≠ Execution** | Chapter 20 stable; Admin Platform governs execution experience only |
| **Admin Platform ≠ Design System Governance** | Separate MASTER_ROADMAP macro-domains |

### 2.8 Macro-Domain Governance Principles (Design Council Clarifications)

The following principles are **mandatory** for Admin Platform authoring and all forward specialized chapters within this block:

| Principle | Statement |
|-----------|-------------|
| **Lifecycle Necessity** | A parent lifecycle concept may only be introduced when it represents an objectively independent architectural domain. Structural symmetry with previous macro-domains is never sufficient justification. |
| **Governance Execution Ownership** | Admin Platform owns governance execution only where execution authority has already been delegated by authoritative upstream chapters. It consumes authority. It never redefines authority. |
| **Governance Continuity Scope** | Governance Continuity governs continuity of **governance execution within the Admin Platform macro-domain only**. It does **not** include organizational governance, compliance programs, audit operations, security operations, or incident management. |
| **Boundary Inheritance** | All future specialized Admin Platform chapters **inherit** the boundaries established by the foundation chapter. Specialized chapters may **extend** within those boundaries but may **never redefine** them. |

---

## 3. Candidate Entry Chapters

Per GD-007 RC-4: non-sequential registry order is not authority.

### Recommended: Candidate A — Admin Platform Experience (Macro-Domain Foundation)

**Architectural question:** *Why does Admin Platform exist as an independent macro-domain — and what does Rento own in admin scope versus what consumer, realtor, and external process must own?*

Rejected alternatives: specialized-dimension-first entries (moderation, role grant, verification), Chapter 20 extension, Design System Governance as wrong macro-domain position.

**Objective comparison conclusion:** Foundation-first entry is the only candidate satisfying macro-domain opening requirements without approved-chapter collision or lifecycle bypass.

---

## 4. Recommended Chapter Position

**Chapter 51 — Admin Platform Experience** (Macro-Domain Foundation)

Foundation-first per Ch 41/Ch 46 pattern; closes Ch 46–50 execution deferral at block level; enables deferred registry before specialization; RC-4 compliant.

---

## 5. Dependencies

### Mandatory Upstream Authorities

Immutable domain rules → Ch 1, 4, 5, 10 → **Ch 20** → Ch 46–50 → Ch 45 §11.3 / MASTER_ROADMAP → GD-006, GD-007.

### Probable specialized dimensions (registry placeholders — order subject to Design Council)

- Listing moderation decision execution experience
- Role grant and revocation execution experience
- Verification program execution experience
- Platform policy enforcement / governance operations experience

---

## 6. Ownership

| Owner | Responsibility |
|-------|----------------|
| **Design Council** | Phase 0 final sign-off; foundation approval; macro-domain completion sign-off |
| **Admin Platform foundation (Ch 51)** | Parent lifecycle (if objectively justified), environment, scope gate, boundaries, boundary clarity, integrity, **Governance Continuity**, deferred registry |
| **Chapter 20** | Retains trust/moderation **meaning** — unchanged |
| **Chapters 46–50** | Retain participation-layer authority — unchanged |

#### Governance Continuity — Scope Constraint (Design Council Clarification)

**Governance Continuity** is an official concept scoped **exclusively** to persistence of governance execution context across admin sessions **within the Admin Platform macro-domain**.

Governance Continuity **does not** govern, subsume, or imply:

- Organizational governance or corporate policy administration
- Compliance program management
- Audit operations or audit trail product design
- Security operations or security incident response
- Incident management workflows

If broader platform governance topics require product-design authority, they belong to **separate forward macro-domains** per MASTER_ROADMAP (e.g., Design System Governance) — not Admin Platform Governance Continuity.

---

## 7. Scope

### In Scope (Chapter 51 foundation)

Macro-domain opening, boundaries, Chapter 20 consumption, Ch 46–50 separation reinforcement, deferred registry, principles only.

### Out of Scope

Implementation, queues, consoles, APIs; consumer/realtor/tenancy journeys; other forward macro-domains; engineering standards.

### Mandatory Guardrails

1. **Consumption over redefinition** — Ch 20 and Ch 46–50 consumed, not amended
2. **Governance Execution Ownership** — consume delegated authority only; never redefine
3. **Execution over participation** — admin execution posture; inverse of Ch 47–50
4. **Role separation invariant** — Admin ≠ realtor ≠ consumer
5. **Marketplace posture** — not agency ERP, CRM, or PMS
6. **Lifecycle Necessity** — parent lifecycle only if objectively independent domain
7. **Governance Continuity scope** — governance execution within macro-domain only
8. **Boundary Inheritance** — specialized chapters inherit foundation boundaries; extend only, never redefine
9. **Registry honesty** — deferred dimensions as placeholders
10. **No implementation leakage**
11. **Completion separation** — per GD-007
12. **Chapter 11 forward-reference reconciliation** at Approval Integration when Ch 51 is approved

---

## 8. Terminology Planning

### Reuse

Moderation, verification/attestation, Publication Integrity, role grant/revocation, participation vs execution, boundary clarity, integrity lineage, Active Realtor Participation (referenced), Listing lifecycle, marketplace posture, Housing Journey / Tenancy Lifecycle / Realtor Professional Lifecycle separation.

### New concepts (minimize — justify only if necessary)

- Parent lifecycle anchor (only if Lifecycle Necessity Principle satisfied)
- Admin Platform Environment
- Active governance scope gate
- Admin Platform Boundaries / Boundary Clarity / Integrity
- **Governance Continuity** — scoped per §6; not organizational/compliance/audit/security/incident governance

---

## 9. Risks

Ch 20 redefinition; admin ↔ realtor leakage; foundation skip pressure; PMS/CRM creep; participation/execution inversion; forced dimensional symmetry; stale Ch 11 forward reference; Design System Governance conflation; registry dishonesty; implementation leakage; parent lifecycle without objective justification.

---

## 10. Recommended Decision

**AUTHORIZE Phase 1 Authoring of Chapter 51 as Admin Platform Experience (Macro-Domain Foundation)** — subject to Design Council **final** Phase 0 sign-off after this Approval Integration.

**Not authorized:** Chapter 51 content authoring until final sign-off; specialized dimensions; documentation modification of Chapters 1–50; macro-domain completion.

---

## Approval Integration Record

| Field | Value |
|-------|-------|
| **Design Council decision** | APPROVED WITH CLARIFICATIONS |
| **Integration date** | 2026-07-07 |
| **Clarifications applied** | Lifecycle Necessity; Governance Continuity Scope; Governance Execution Ownership; Boundary Inheritance |
| **Artifact path** | `docs/design/PHASE_0_ADMIN_PLATFORM.md` |
| **Governance reference** | GD-008 (MASTER_ROADMAP.md) |

---

**End of Phase 0 — Admin Platform Pre-Authoring Analysis**
