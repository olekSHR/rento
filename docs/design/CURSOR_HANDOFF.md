# PROJECT HANDOFF — RENTO PRODUCT DESIGN STANDARD v1.0

Copy this block into the next Cursor chat to continue work.

### AI Session Initialization

Before continuing work, always read the official project documentation in the following order:

1. `docs/design/MASTER_ROADMAP.md`
2. `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`
3. `docs/design/CURSOR_HANDOFF.md`

Do not rely on previous chat memory.

Project documentation is the single source of truth.

If documentation conflicts with previous conversation context, documentation always takes precedence.

Do not begin authoring, reviewing, or modifying architecture until all three documents have been read and understood.

--------------------------------------------------

## PROJECT

Rento — Mobile-first long-term rental marketplace (Romania)  
Production: https://rentonow.ro  
Repository: GitHub main branch  
Official document: `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`

Current workstream: **RENTO PRODUCT DESIGN STANDARD v1.0**  
Scope: Product Design Standard only — no implementation unless explicitly requested.

--------------------------------------------------

## CURRENT STATUS

Approved chapters: **1–41** (41 chapters total)  
Latest approved chapter: **Chapter 41 — Settled Tenancy Experience**  
Latest checkpoint: **a63cd8b** (Chapter 41 integration pending commit)

**Decision Experience judgment progression: COMPLETE** (Chapters 31–37)

**Housing Obligation execution trilogy: COMPLETE** (Chapters 38–40 — Legal, Financial, and Occupancy Readiness approved)

**Settled Tenancy block: IN PROGRESS** (Chapter 41 foundation approved; Chapter 42+ specialized chapters forward)

Chapter 41 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Required Architectural Amendments (N/A)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 41 location: after Chapter 40 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXVIII — Settled Tenancy**  
Status: **APPROVED**

Pending user action: Git commit(s). Suggested message:

```
approve chapter 41 settled tenancy experience
```

```
Foundation
↓
Search Experience ✓ COMPLETE
↓
Decision Experience ✓ COMPLETE
↓
Housing Obligation ✓ COMPLETE
  Legal Readiness ✓
  Financial Readiness ✓
  Occupancy Readiness ✓
↓
Settled Tenancy ← IN PROGRESS
  Ch 41 — Settled Tenancy Experience ✓ APPROVED (foundation)
  Ch 42+ — specialized tenancy chapters ← ACTIVE
```

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 41 — Settled Tenancy Experience** (Section XXXVIII)

Architectural role:
- Settled Tenancy macro-domain opening — foundation chapter after Occupancy Readiness Experience (Ch 40)
- Tenancy Lifecycle foundation — relationship lifecycle after occupancy commencement boundary
- Housing Journey separation preserved — Tenancy Lifecycle distinct from Housing Journey (Ch 23)
- Extends Occupancy Readiness Boundaries (Ch 40), Occupancy Boundary Clarity (Ch 40), Housing Continuity (Ch 30), Contact ethics (Ch 16)

Key concepts introduced in Chapter 41:
- Tenancy Lifecycle
- Settled Tenancy Environment
- Active Tenancy
- Settled Tenancy Boundaries
- Tenancy Boundary Clarity
- Tenancy Continuity

Secondary concepts:
- Settled Tenancy Integrity (parallel to Occupancy Readiness Integrity and prior integrity lineage)

Terminology bridge (approved):
- **Settled Tenancy** — macro-domain governing experience surrounding active tenancy; not Property Management
- **Tenancy Lifecycle** — official concept distinct from **Housing Journey** — must never be merged

Editorial themes (approved):
- Boundaries over tenancy theater — honest scope limits for ongoing relationship experience
- Marketplace over operations — Rento remains a marketplace, not a Property Management System
- The platform never operates settled tenancy — supports orientation and boundary clarity only
- Housing Journey and Tenancy Lifecycle remain separate — no merge, no Chapter 23 amendment
- Attend / defer attention / conclude context — all valid and equally dignified attention postures
- NOT another Readiness chapter — Housing Obligation trilogy complete (Ch 38–40)

Settled Tenancy flow (foundation approved — Ch 41):

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → Property Verification (Ch 34) → Viewing Experience (Ch 35) → Application Experience (Ch 36) → Commitment Experience (Ch 37) → Legal Readiness Experience (Ch 38) → Financial Readiness Experience (Ch 39) → Occupancy Readiness Experience (Ch 40) → **Settled Tenancy Experience (Ch 41)** → specialized tenancy chapters (forward)

Extends (does not replace):
- Occupancy Readiness Confidence, Occupancy Readiness Boundaries, Occupancy Boundary Clarity (Chapter 40)
- Financial Readiness Boundaries, Financial Boundary Clarity (Chapter 39)
- Legal Readiness Boundaries, Legal Boundary Clarity (Chapter 38)
- Commitment Boundaries, Mutual Expectation Clarity (Chapter 37)
- Housing Continuity, Decision Persistence (Chapter 30)
- Housing Journey definition (Chapter 23) — consumed, not redefined
- Contact ethics (Chapter 16)
- Platform trust attestation (Chapter 20)

--------------------------------------------------

## DESIGN COUNCIL DECISION — CHAPTER 41

**Status:** APPROVED  
**Governance reference:** MASTER_ROADMAP — Governance Decision 005 (Pre-Authoring); Chapter 41 Final Design Council Review (Approval)

### Approved architectural conclusions (retained)

1. Chapter 40 completes the **Housing Obligation** macro-domain.
2. **Chapter 41** opens the **Settled Tenancy** macro-domain.
3. Chapter 41 is **NOT** another Readiness chapter, Property Management, Realtor Platform, or Admin Platform.
4. **Housing Journey** and **Tenancy Lifecycle** are distinct — **must never be merged**.
5. Rento remains a **marketplace platform** — does **NOT** become a Property Management System.
6. **The platform never operates settled tenancy.**

### Deferred to Chapter 42+ (Ch 41 §11.3)

- Rent lifecycle management experience beyond occupancy commencement
- Maintenance and repair experience during tenancy
- Tenancy dispute and escalation experience
- Tenancy conclusion experience
- Specialized ongoing landlord-tenant relationship dimensions

--------------------------------------------------

## CURRENT WORKFLOW

Current phase: **Chapter 42 — not yet started**

Next step: **Pre-Authoring Analysis** for Chapter 42 before Phase 1 Authoring (when authorized).

Do NOT assume Chapter 42 theme. Determine architectural position from documentation authority and Ch 41 §11.3 deferral.

Standard chapter workflow:
1. Pre-Authoring Analysis (Design Council approval required before authoring)
2. Phase 1 — Authoring
3. Phase 2 — Architecture Review (Design Council, outside Cursor)
4. Phase 3 — Editorial Pass (if Architecture Review requests it)
5. Phase 4 — Final Design Council Review
6. Phase 5 — Approval Integration (status, approval block, TOC, version history)
7. Phase 6 — Git Checkpoint Preparation → user-executed commit

Do NOT skip phases. Do NOT approve without explicit Design Council decision.  
Do NOT commit without explicit user request.

Repository status: **Chapter 41 approval integration complete** — uncommitted changes pending user commit

--------------------------------------------------

## PRODUCT VOCABULARY

Preserve — do not rename.

From Chapter 31:
- Decision Environment
- Property Confidence
- Listing Integrity
- Information Confidence
- Property Transparency
- Contact Readiness

From Chapter 32:
- Media Integrity
- Visual Confidence
- Evidence Continuity
- Spatial Understanding

From Chapter 33:
- Comparison Environment
- Evaluation Parity
- Evidence Parity
- Differentiation Clarity
- Comparison Integrity
- Narrowing Confidence

From Chapter 34:
- Verification Environment
- Verification Confidence
- Evidence Credibility
- Uncertainty Transparency
- Verification Boundaries
- Proceeding Readiness

From Chapter 35:
- Viewing Environment
- Viewing Readiness
- Viewing Preparation
- Viewing Confidence
- Viewing Boundaries

From Chapter 36:
- Application Environment
- Application Readiness
- Application Preparation
- Application Confidence
- Application Boundaries

From Chapter 37:
- Commitment Environment
- Commitment Readiness
- Commitment Preparation
- Commitment Confidence
- Commitment Boundaries
- Mutual Expectation Clarity

From Chapter 38:
- Legal Readiness Environment
- Legal Readiness
- Legal Readiness Preparation
- Legal Readiness Confidence
- Legal Readiness Boundaries
- Legal Boundary Clarity

From Chapter 39:
- Financial Readiness Environment
- Financial Readiness
- Financial Readiness Preparation
- Financial Readiness Confidence
- Financial Readiness Boundaries
- Financial Boundary Clarity

From Chapter 40:
- Occupancy Readiness Environment
- Occupancy Readiness
- Occupancy Readiness Preparation
- Occupancy Readiness Confidence
- Occupancy Readiness Boundaries
- Occupancy Boundary Clarity

From Chapter 41:
- Tenancy Lifecycle
- Settled Tenancy Environment
- Active Tenancy
- Settled Tenancy Boundaries
- Tenancy Boundary Clarity
- Tenancy Continuity

Established vocabulary (reuse across chapters):
- Housing Journey (Ch 23 — user journey; do not merge with Tenancy Lifecycle)
- Preview Integrity
- First Impression Integrity
- Cognitive Continuity
- Context Restoration
- Decision Readiness
- Housing Continuity (Ch 30 — distinct from Tenancy Continuity)
- Decision Persistence
- Search Confidence
- Comparison Confidence
- Returning Confidence
- Continuity Trust
- Respectful Silence

Secondary from Chapter 41:
- Settled Tenancy Integrity

--------------------------------------------------

## PRODUCT ARCHITECTURE RULES

Decision Experience block (**COMPLETE — judgment progression**, Ch 31–37):
- Ch 31: Property detail as calm decision environment; Information + Evidence layers
- Ch 32: Media as evidence — not decoration, not engagement bait
- Ch 33: Property comparison — narrowing, Evaluation Parity, Comparison Integrity
- Ch 34: Property verification — Verification Confidence, Verification Boundaries, Proceeding Readiness
- Ch 35: Property viewing — Viewing Readiness, Viewing Preparation, Viewing Boundaries, physical reconciliation
- Ch 36: Property application — Application Readiness, Application Preparation, Application Boundaries, formal interest expression
- Ch 37: Property commitment — Commitment Readiness, Commitment Preparation, Commitment Boundaries, Mutual Expectation Clarity, housing obligation intensification judgment

Housing Obligation block (**COMPLETE — execution trilogy**, Ch 38–40 approved):
- Ch 38: Legal readiness — Legal Readiness, Legal Readiness Preparation, Legal Readiness Boundaries, Legal Boundary Clarity, legal execution readiness gate
- Ch 39: Financial readiness — Financial Readiness, Financial Readiness Preparation, Financial Readiness Boundaries, Financial Boundary Clarity, financial execution readiness gate
- Ch 40: Occupancy readiness — Occupancy Readiness, Occupancy Readiness Preparation, Occupancy Readiness Boundaries, Occupancy Boundary Clarity, occupancy execution readiness gate

Settled Tenancy block (**IN PROGRESS — Ch 41 foundation approved**, Ch 42+ forward):
- Ch 41: Settled Tenancy foundation — Tenancy Lifecycle, marketplace posture, platform never operates settled tenancy; NOT another Readiness chapter
- Ch 42+: Specialized settled tenancy dimensions forward (rent lifecycle, maintenance, dispute, conclusion — per Ch 41 §11.3)

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed digitally — property verification experience
- Ch 35: what in-person visit reveals — viewing experience
- Ch 36: how formal interest is expressed — application experience
- Ch 37: how housing obligation intensification is judged — commitment experience
- Ch 38: how legal execution readiness is judged — legal readiness experience
- Ch 39: how financial execution readiness is judged — financial readiness experience
- Ch 40: how occupancy execution readiness is judged — occupancy readiness experience
- Ch 41: how settled tenancy foundation is governed — Tenancy Lifecycle, marketplace boundaries
- Ch 42+ (forward): specialized settled tenancy experience dimensions
- Verification ≠ moderation ≠ legal due diligence ≠ financial qualification ≠ move-in completion ≠ settled tenancy operations

Housing Journey vs Tenancy Lifecycle:
- Housing Journey (Ch 23): search → decision → execution readiness — ends at occupancy commencement boundary
- Tenancy Lifecycle (Ch 41): relationship lifecycle after occupancy begins — separate macro-domain
- Never merge these concepts

Settled tenancy principles (Chapter 41 — approved):
- Boundaries over tenancy theater
- Marketplace over operations — Rento does not become a Property Management System
- Tenancy Lifecycle distinct from Housing Journey
- The platform never operates settled tenancy
- Attend / defer attention / conclude context — dignified attention postures
- Inherits Occupancy Readiness Boundaries and Tenancy Continuity where appropriate

Design standard scope:
- Principles only — no implementation leakage in chapter content
- No frontend/backend/API/database/CDN/upload pipeline specs in chapters
- No UI component or interaction specifications in chapters

--------------------------------------------------

## GIT STATUS

Branch: main  
Latest commit:

```
a63cd8b approve chapter 40 occupancy readiness experience
```

Uncommitted changes:

```
M docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md
M docs/design/MASTER_ROADMAP.md
M docs/design/CURSOR_HANDOFF.md
```

Includes Chapter 41 Phase 5 approval integration — uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 41:

```
approve chapter 41 settled tenancy experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~39,600+ lines)

Chapter 41 location in document:
- After Chapter 40 — `## Chapter 41 — Settled Tenancy Experience`
- End of document — End of Chapter 41

--------------------------------------------------

## NEXT CHAPTER

**Chapter 42** — NOT YET STARTED

Do NOT assume Chapter 42 theme.

Begin with **Pre-Authoring Analysis** — determine architectural position from Ch 41 §11.3 deferral and documentation authority before Phase 1 Authoring.

Forward specialized domains (per Ch 41 §11.3 — candidates for Ch 42+):
- Rent lifecycle management experience beyond occupancy commencement
- Maintenance and repair experience during tenancy
- Tenancy dispute and escalation experience
- Tenancy conclusion experience

Do NOT begin Chapter 42 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow chapter workflow including Pre-Authoring Analysis for Ch 42+
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–41 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English
- Maintain Housing Journey / Tenancy Lifecycle separation

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–41 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters
- Merge Housing Journey with Tenancy Lifecycle
- Assume Chapter 42 theme without documentation authority

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Decision Experience judgment progression milestone: **COMPLETE** (Ch 31–37)
- Housing Obligation execution trilogy milestone: **COMPLETE** (Ch 38–40)
- Settled Tenancy block milestone: **IN PROGRESS** (Ch 41 foundation approved; Ch 42+ forward)

--------------------------------------------------

## SCOPE NOTE

This handoff is intentionally limited to the **RENTO PRODUCT DESIGN STANDARD**.

Engineering architecture, coding standards, deployment rules, infrastructure, development workflow, and AI governance will be maintained separately inside:

**PROJECT ARCHITECTURE & STANDARDS**

This separation is intentional and must be preserved.

--------------------------------------------------

## MASTER ROADMAP

Official long-term roadmap: `docs/design/MASTER_ROADMAP.md`

See **AI Session Initialization** at the top of this document.

Current active phase: **Rento Product Design Standard** (Phase 1). Future phases must not begin until this phase is completed and formally approved.

Approved chapters per roadmap: **1–41**  
Decision Experience: **COMPLETE** (judgment progression, Ch 31–37)  
Housing Obligation: **COMPLETE** (execution trilogy, Ch 38–40)  
Settled Tenancy: **IN PROGRESS** (Ch 41 foundation approved; Ch 42+ active)  
Current chapter: **42 — not yet started (Pre-Authoring Analysis next)**

Governance Decision 005: Chapter 41 opens Settled Tenancy block — see MASTER_ROADMAP.

--------------------------------------------------

**END HANDOFF**
