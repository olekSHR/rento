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

Approved chapters: **1–38** (38 chapters total)  
Latest approved chapter: **Chapter 38 — Legal Readiness Experience**

**Decision Experience judgment progression: COMPLETE** (Chapters 31–37)

**Housing Obligation block: STARTED** (Chapter 38 — Legal Readiness Experience)

Chapter 38 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Editorial Pass (APPROVED)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 38 location: after Chapter 37 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXV — Legal Readiness**  
Status: **APPROVED**

Pending user action: Git commit(s). Suggested message:

```
approve chapter 38 legal readiness experience
```

User may commit chapters separately or together (Chapters 37–38 approval integrations may remain uncommitted).

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 38 — Legal Readiness Experience** (Section XXXV)

Architectural role:
- Housing Obligation block opening — legal execution readiness gate after Decision Experience completion
- Legal readiness boundary — after Commitment Experience (Ch 37), before Financial Readiness (Ch 39, forward)
- Extends Commitment Confidence and Commitment Boundaries (Ch 37), Application Boundaries (Ch 36), Contact Readiness (Ch 31)

Key concepts introduced in Chapter 38:
- Legal Readiness Environment
- Legal Readiness
- Legal Readiness Preparation
- Legal Readiness Confidence
- Legal Readiness Boundaries
- Legal Boundary Clarity

Secondary concepts:
- Legal Readiness Integrity (parallel to Commitment Integrity, Application Integrity, Viewing Integrity, Assessment Integrity, Comparison Integrity)
- Contract Understanding Clarity

Editorial themes (approved):
- Preparation over signing theater — legal seriousness, not funnel completion
- Boundary clarity over agreement simulation — honest scope limits before contract engagement
- The platform never creates legal agreement — supports informed, voluntary legal readiness judgment
- Legal Readiness distinct from Commitment Readiness — legal execution trust gate
- Legal readiness ≠ commitment ≠ application ≠ verification ≠ lease execution ≠ payment ≠ move-in
- proceed / defer / release — all valid and equally dignified outcomes

Housing Obligation flow (STARTED — Ch 38 approved):

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → Property Verification (Ch 34) → Viewing Experience (Ch 35) → Application Experience (Ch 36) → Commitment Experience (Ch 37) → **Legal Readiness Experience (Ch 38)** → Financial Readiness Experience (Ch 39, forward) → occupancy readiness and settled tenancy chapters (forward)

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
Legal Readiness ✓ APPROVED (Housing Obligation — started)
↓
Financial Readiness (forward)
↓
Occupancy readiness / settled tenancy (forward)
```

Extends (does not replace):
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

Current phase: **Phase 6 — Git Checkpoint Preparation** (Chapter 38 — user-executed commit)

Next step: **Phase 1 — Authoring** for Chapter 39 (not yet started).

Next chapter (not yet started): **Chapter 39 — Financial Readiness Experience**

Standard chapter workflow:
1. Phase 1 — Authoring
2. Phase 2 — Architecture Review (Design Council, outside Cursor)
3. Phase 3 — Editorial Pass (if Architecture Review requests it)
4. Phase 4 — Final Design Council Review
5. Phase 5 — Approval Integration (status, approval block, TOC, version history)
6. Phase 6 — Git Checkpoint Preparation → user-executed commit

Do NOT skip phases. Do NOT approve without explicit Design Council decision.  
Do NOT commit without explicit user request.

Repository status: **Ready for Chapter 39 authoring session** (after Chapter 38 git checkpoint)

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

Housing Obligation block (**STARTED**, Ch 38+):
- Ch 38: Legal readiness — Legal Readiness, Legal Readiness Preparation, Legal Readiness Boundaries, Legal Boundary Clarity, legal execution readiness gate
- Ch 39+ (forward): Financial Readiness, occupancy readiness, settled tenancy — principles only

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed digitally — property verification experience
- Ch 35: what in-person visit reveals — viewing experience
- Ch 36: how formal interest is expressed — application experience
- Ch 37: how housing obligation intensification is judged — commitment experience
- Ch 38: how legal execution readiness is judged — legal readiness experience
- Verification ≠ moderation ≠ legal due diligence

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

Design standard scope:
- Principles only — no implementation leakage in chapter content
- No frontend/backend/API/database/CDN/upload pipeline specs in chapters
- No UI component or interaction specifications in chapters

--------------------------------------------------

## GIT STATUS

Branch: main (assumed)  
Latest commit:

```
d600f94 approve chapter 36 application experience
```

Uncommitted changes:

```
M docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md
M docs/design/CURSOR_HANDOFF.md
```

Includes Chapter 38 Phases 1–5 (authoring + approval integration) — uncommitted.
Earlier chapter integrations (Chapters 37–38) may also remain uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 38:

```
approve chapter 38 legal readiness experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~37,500+ lines)

Chapter 38 location in document:
- After Chapter 37 — `## Chapter 38 — Legal Readiness Experience`
- End of document — End of Chapter 38

--------------------------------------------------

## NEXT CHAPTER

**Chapter 39 — Financial Readiness Experience** — NOT YET STARTED

Expected domain (per Housing Obligation arc and Chapter 38 §11 handoff):
- Financial execution readiness gate after Legal Readiness Experience (Ch 38)
- Deposit handling, rent payment, guarantor requirements, payment schedules, financial settlement — principles only
- Extends Legal Readiness Boundaries (Ch 38), Commitment Boundaries (Ch 37), and prior Decision Experience readiness ethics

Do NOT begin Chapter 39 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow 6-phase chapter workflow
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–38 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–38 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters

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

Approved chapters per roadmap: **1–38**  
Decision Experience: **COMPLETE** (judgment progression, Ch 31–37)  
Housing Obligation: **STARTED** (Ch 38 — Legal Readiness Experience approved)  
Current chapter: **39 — Financial Readiness Experience (not yet started)**

--------------------------------------------------

**END HANDOFF**
