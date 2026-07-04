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

Approved chapters: **1–39** (39 chapters total)  
Latest approved chapter: **Chapter 39 — Financial Readiness Experience**

**Decision Experience judgment progression: COMPLETE** (Chapters 31–37)

**Housing Obligation block: IN PROGRESS** (Chapters 38–39 — Legal Readiness and Financial Readiness approved)

Chapter 39 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED WITH MINOR CHANGES — integrated)
- ✓ Phase 3 — Editorial Pass (APPROVED)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 39 location: after Chapter 38 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXVI — Financial Readiness**  
Status: **APPROVED**

Pending user action: Git commit(s). Suggested message:

```
approve chapter 39 financial readiness experience
```

User may commit chapters separately or together.

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 39 — Financial Readiness Experience** (Section XXXVI)

Architectural role:
- Housing Obligation block progression — financial execution readiness gate after Legal Readiness Experience (Ch 38)
- Financial readiness boundary — after Legal Readiness (Ch 38), before Occupancy Readiness (Ch 40+, forward)
- Extends Legal Readiness Confidence and Legal Readiness Boundaries (Ch 38), Commitment Boundaries (Ch 37), Contact Readiness (Ch 31)

Key concepts introduced in Chapter 39:
- Financial Readiness Environment
- Financial Readiness
- Financial Readiness Preparation
- Financial Readiness Confidence
- Financial Readiness Boundaries
- Financial Boundary Clarity

Secondary concepts:
- Financial Readiness Integrity (parallel to Legal Readiness Integrity, Commitment Integrity, Application Integrity, Viewing Integrity, Assessment Integrity, Comparison Integrity)
- Financial Obligation Understanding Clarity

Terminology bridge (approved):
- Informal forward references to **payment readiness** (Chapters 37–38) subsumed under official **Financial Readiness** — not a separate architectural layer

Editorial themes (approved):
- Understanding over payment pressure — financial seriousness, not checkout completion
- Boundary clarity over settlement simulation — honest scope limits before financial engagement
- The platform never creates financial settlement — supports informed, voluntary financial readiness judgment
- Financial Readiness distinct from Legal Readiness — financial execution trust gate
- Financial readiness ≠ affordability judgment ≠ legal readiness ≠ commitment ≠ payment completion ≠ move-in
- proceed / defer / release — all valid and equally dignified outcomes

Housing Obligation flow (IN PROGRESS — Ch 38–39 approved):

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → Property Verification (Ch 34) → Viewing Experience (Ch 35) → Application Experience (Ch 36) → Commitment Experience (Ch 37) → Legal Readiness Experience (Ch 38) → **Financial Readiness Experience (Ch 39)** → occupancy readiness and settled tenancy chapters (forward)

```
Search
↓
Results
↓
Property Detail
↓
Media
↓
Comparison
↓
Verification
↓
Viewing
↓
Application
↓
Commitment ✓ COMPLETE (Decision Experience)
↓
Legal Readiness ✓ APPROVED
↓
Financial Readiness ✓ APPROVED (Housing Obligation — in progress)
↓
Occupancy readiness / settled tenancy (forward)
```

Extends (does not replace):
- Legal Readiness Confidence, Legal Readiness Boundaries, Legal Boundary Clarity (Chapter 38)
- Commitment Confidence, Commitment Boundaries, Mutual Expectation Clarity (Chapter 37)
- Application Confidence, Application Boundaries, Application Preparation (Chapter 36)
- Viewing Confidence, Viewing Boundaries (Chapter 35)
- Proceeding Readiness, Verification Boundaries (Chapter 34)
- Expected Property, Media Integrity (Chapter 32)
- Property Confidence, Contact Readiness, Listing Integrity (Chapter 31)
- Contact ethics (Chapter 16)
- Platform trust attestation (Chapter 20)

--------------------------------------------------

## CURRENT WORKFLOW

Current phase: **Pre-Authoring Analysis** (Chapter 40 — not yet started)

Next step: **Pre-Authoring Analysis** for Chapter 40 before Phase 1 Authoring.

Next chapter (not yet started): **Chapter 40**

Do NOT assume Chapter 40 theme. Determine architectural position from documentation authority.

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

Repository status: **Ready for Chapter 40 pre-authoring session** (after Chapter 39 git checkpoint)

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

Established vocabulary (reuse across chapters):
- Housing Journey
- Preview Integrity
- First Impression Integrity
- Cognitive Continuity
- Context Restoration
- Decision Readiness
- Housing Continuity
- Decision Persistence
- Search Confidence
- Comparison Confidence
- Returning Confidence
- Continuity Trust
- Respectful Silence

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

Housing Obligation block (**IN PROGRESS**, Ch 38–39 approved):
- Ch 38: Legal readiness — Legal Readiness, Legal Readiness Preparation, Legal Readiness Boundaries, Legal Boundary Clarity, legal execution readiness gate
- Ch 39: Financial readiness — Financial Readiness, Financial Readiness Preparation, Financial Readiness Boundaries, Financial Boundary Clarity, financial execution readiness gate
- Ch 40+ (forward): Occupancy readiness, settled tenancy — principles only

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed digitally — property verification experience
- Ch 35: what in-person visit reveals — viewing experience
- Ch 36: how formal interest is expressed — application experience
- Ch 37: how housing obligation intensification is judged — commitment experience
- Ch 38: how legal execution readiness is judged — legal readiness experience
- Ch 39: how financial execution readiness is judged — financial readiness experience
- Verification ≠ moderation ≠ legal due diligence ≠ financial qualification

Information ↔ Evidence cooperation:
- Information states governed facts
- Evidence validates, challenges, or contradicts those claims
- Neither layer substitutes for the other
- Rich media does not excuse missing facts; complete facts do not excuse misleading media
- Evaluation Parity (information) and Evidence Parity (evidence) both required in comparison

Comparison principles (Chapter 33):
- Narrowing over browsing
- Parity over persuasion
- Comparison never replaces detail depth
- No winner framing among homes
- Per-listing confidence preserved

Verification principles (Chapter 34):
- Proceeding over pretending
- Credibility over completeness theater
- Boundaries over overclaim
- Proceeding Readiness as trust gate — not funnel stage

Viewing principles (Chapter 35):
- Preparation over surprise
- Physical truth over digital completion
- Respect over urgency
- Viewing Readiness as physical trust gate — not funnel stage

Application principles (Chapter 36):
- Intent over conversion
- Consent over submission theater
- Prepared over impulse
- Application Readiness as formal-interest trust gate — not funnel stage

Commitment principles (Chapter 37):
- Obligation awareness over conversion
- Alignment over urgency
- Mutual over unilateral
- Voluntary over manufactured
- Commitment Readiness as housing obligation trust gate — not funnel stage
- The platform never creates commitment

Legal readiness principles (Chapter 38):
- Preparation over signing theater
- Boundary clarity over agreement simulation
- Honest scope over legal advice theater
- Legal Readiness as legal execution trust gate — not funnel stage
- The platform never creates legal agreement

Financial readiness principles (Chapter 39):
- Understanding over payment pressure
- Boundary clarity over settlement simulation
- Obligation comprehension over affordability judgment
- Financial Readiness as financial execution trust gate — not funnel stage
- The platform never creates financial settlement
- Payment readiness (informal) subsumed under Financial Readiness (official)

Design standard scope:
- Principles only — no implementation leakage in chapter content
- No frontend/backend/API/database/CDN/upload pipeline specs in chapters
- No UI component or interaction specifications in chapters

--------------------------------------------------

## GIT STATUS

Branch: main (assumed)  
Latest commit:

```
86da46b approve chapter 38 legal readiness experience
```

Uncommitted changes:

```
M docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md
M docs/design/CURSOR_HANDOFF.md
M docs/design/MASTER_ROADMAP.md
```

Includes Chapter 39 Phases 1–5 (authoring + approval integration) — uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 39:

```
approve chapter 39 financial readiness experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~38,400+ lines)

Chapter 39 location in document:
- After Chapter 38 — `## Chapter 39 — Financial Readiness Experience`
- End of document — End of Chapter 39

--------------------------------------------------

## NEXT CHAPTER

**Chapter 40** — NOT YET STARTED

Do NOT assume Chapter 40 theme.

Begin with **Pre-Authoring Analysis** — determine architectural position from documentation authority before Phase 1 Authoring.

Forward domain (per Housing Obligation arc and Chapter 39 §11 handoff):
- Occupancy readiness / move-in execution gate after Financial Readiness Experience (Ch 39)
- Principles only — no implementation

Do NOT begin Chapter 40 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow chapter workflow including Pre-Authoring Analysis for Ch 40+
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–39 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–39 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters
- Assume Chapter 40 theme without documentation authority

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Decision Experience judgment progression milestone: **COMPLETE** (Ch 31–37)

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

Approved chapters per roadmap: **1–39**  
Decision Experience: **COMPLETE** (judgment progression, Ch 31–37)  
Housing Obligation: **IN PROGRESS** (Ch 38–39 approved)  
Current chapter: **40 — not yet started (Pre-Authoring Analysis next)**

--------------------------------------------------

**END HANDOFF**
