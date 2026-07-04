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

Approved chapters: **1–36** (36 chapters total)  
Latest approved chapter: **Chapter 36 — Application Experience**

Chapter 36 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Editorial Pass (APPROVED)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 36 location: after Chapter 35 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXIII — Application Experience**  
Status: **APPROVED**

Chapter 35 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Editorial Pass (APPROVED WITH MINOR EDITORIAL CORRECTIONS)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Pending user action: Git commit(s). Suggested messages:

```
approve chapter 36 application experience
```

User may commit chapters separately or together (Chapters 32–36 approval integrations remain uncommitted).

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 36 — Application Experience** (Section XXXIII)

Architectural role:
- Decision Experience continuation after Viewing Experience (Ch 35)
- Formal-interest boundary — physical assessment to formal housing interest before commitment escalation
- Extends Viewing Confidence and Viewing Boundaries (Ch 35), Proceeding Readiness (Ch 34), Contact Readiness (Ch 31)

Key concepts introduced in Chapter 36:
- Application Environment
- Application Readiness
- Application Preparation
- Application Confidence
- Application Boundaries

Secondary concept:
- Application Integrity (§8.2 — parallel to Viewing Integrity, Assessment Integrity, Comparison Integrity)

Editorial themes (approved):
- Intent over conversion — formal interest, not funnel completion
- Consent over submission theater — informed consent before expression
- Application Readiness distinct from Viewing Readiness — formal-interest trust gate
- Application ≠ viewing ≠ verification ≠ commitment ≠ legal tenancy procedure
- express / defer expression / withdraw / post-expression proceed, defer, release — all valid outcomes

Decision Experience flow:

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → Property Verification (Ch 34) → Viewing Experience (Ch 35) → **Application Experience (Ch 36)** → **Commitment Experience (Ch 37 — not yet authored)**

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
Commitment ← CURRENT
```

Extends (does not replace):
- Viewing Confidence, Viewing Boundaries, Viewing Preparation (Chapter 35)
- Proceeding Readiness, Verification Boundaries (Chapter 34)
- Expected Property, Media Integrity (Chapter 32)
- Property Confidence, Contact Readiness, Listing Integrity (Chapter 31)
- Contact ethics (Chapter 16)
- Platform trust attestation (Chapter 20)

--------------------------------------------------

## CURRENT WORKFLOW

Current phase: **Phase 1 — Authoring** (next chapter)

Next step: **Phase 6 — Git Checkpoint Preparation** for Chapter 36 (user-executed commit).

Next chapter (not yet started): **Chapter 37 — Commitment Experience**

Standard chapter workflow:
1. Phase 1 — Authoring
2. Phase 2 — Architecture Review (Design Council, outside Cursor)
3. Phase 3 — Editorial Pass (if Architecture Review requests it)
4. Phase 4 — Final Design Council Review
5. Phase 5 — Approval Integration (status, approval block, TOC, version history)
6. Phase 6 — Git Checkpoint Preparation → user-executed commit

Do NOT skip phases. Do NOT approve without explicit Design Council decision.  
Do NOT commit without explicit user request.

Repository status: **Ready for next authoring session**

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

Decision Experience block (in progress):
- Ch 31: Property detail as calm decision environment; Information + Evidence layers
- Ch 32: Media as evidence — not decoration, not engagement bait
- Ch 33: Property comparison — narrowing, Evaluation Parity, Comparison Integrity
- Ch 34: Property verification — Verification Confidence, Verification Boundaries, Proceeding Readiness
- Ch 35: Property viewing — Viewing Readiness, Viewing Preparation, Viewing Boundaries, physical reconciliation
- Ch 36: Property application — Application Readiness, Application Preparation, Application Boundaries, formal interest expression
- Ch 37+: Commitment — forward

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed digitally — property verification experience
- Ch 35: what in-person visit reveals — viewing experience
- Ch 36: how formal interest is expressed — application experience
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

Design standard scope:
- Principles only — no implementation leakage in chapter content
- No frontend/backend/API/database/CDN/upload pipeline specs in chapters
- No UI component or interaction specifications in chapters

--------------------------------------------------

## GIT STATUS

Branch: main (assumed)  
Latest commit:

```
0d336a7 approve chapter 31 property detail experience
```

Uncommitted changes:

```
M docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md
M docs/design/CURSOR_HANDOFF.md
M docs/design/MASTER_ROADMAP.md
```

Includes Chapter 32 Phase 5 approval integration (TOC, Version History) — uncommitted.
Includes Chapter 33 Phase 5 approval integration — uncommitted.
Includes Chapter 34 Phases 1–5 (authoring + approval integration) — uncommitted.
Includes Chapter 35 Phases 1–5 (authoring + approval integration) — uncommitted.
Includes Chapter 36 Phases 1–5 (authoring + approval integration) — uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 36:

```
approve chapter 36 application experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~36,000+ lines)

Chapter 36 location in document:
- After Chapter 35 — `## Chapter 36 — Application Experience`
- End of document — End of Chapter 36

--------------------------------------------------

## NEXT CHAPTER

**Chapter 37 — Commitment Experience** — NOT YET STARTED

Architectural question:

*"How should users transition from formal interest to meaningful commitment while preserving informed decision making, trust, mutual expectations and long-term platform integrity?"*

Expected domain:
- Housing commitment escalation after formal interest expression
- Extends Application Boundaries and Application Confidence from Chapter 36
- Decision Experience continuation after property application

Section numbering: Section XXXIV — Commitment Experience (reserved for Ch 37)

Do NOT begin Chapter 37 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow 6-phase chapter workflow
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–36 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–36 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Milestone release for Decision Experience block: WAIT until core commitment chapters progress

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

Approved chapters per roadmap: **1–36** (update MASTER_ROADMAP on next integration pass if not yet synced)

--------------------------------------------------

**END HANDOFF**
