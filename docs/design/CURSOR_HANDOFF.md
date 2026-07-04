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

Approved chapters: **1–34** (34 chapters total)  
Latest approved chapter: **Chapter 34 — Property Verification Experience**

Chapter 34 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Editorial Pass (APPROVED)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 34 location: after Chapter 33 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXI — Property Verification**  
Status: **APPROVED**

Chapter 33 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED WITH MINOR EDITORIAL CHANGES)
- ✓ Phase 3 — Editorial Pass
- ✓ Phase 4 — Final Design Council Review (APPROVED WITH MINOR EDITORIAL CHANGES)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint (prepared, NOT executed)

Pending user action: Git commit(s). Suggested messages:

```
approve chapter 34 property verification experience
```

User may commit chapters separately or together (Chapters 32–34 approval integrations remain uncommitted).

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 34 — Property Verification Experience** (Section XXXI)

Architectural role:
- Decision Experience continuation after Property Comparison (Ch 33)
- Pre-commitment trust assessment — proceeding judgment before viewing and commitment escalation
- Extends Property Confidence (Ch 31), evidence layers (Ch 32), Narrowing Confidence (Ch 33), platform attestation (Ch 20)

Key concepts introduced in Chapter 34:
- Verification Environment
- Verification Confidence
- Evidence Credibility
- Uncertainty Transparency
- Verification Boundaries
- Proceeding Readiness

Secondary concept:
- Assessment Integrity (§8.2 — parallel to Comparison Integrity)

Editorial themes (approved):
- Proceeding over pretending — honest unknowns, not simulated certainty
- Boundaries over overclaim — digital verification scope legible
- Proceeding Readiness distinct from Contact Readiness — escalation trust gate
- Verification ≠ moderation ≠ legal due diligence
- proceed / defer / release — all valid outcomes

Decision Experience flow:

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → **Property Verification (Ch 34)** → **Viewing Experience (Ch 35 — not yet authored)** → following Decision Experience chapters

Extends (does not replace):
- Property Confidence, Contact Readiness (Chapter 31)
- Media Integrity, Visual Confidence (Chapter 32)
- Narrowing Confidence (Chapter 33)
- Platform trust attestation (Chapter 20)

--------------------------------------------------

## CURRENT WORKFLOW

Next step: **Phase 6 — Git Checkpoint Preparation** for Chapter 34 (user-executed commit).

Next chapter (not yet started): **Chapter 35 — Viewing Experience**

Standard chapter workflow:
1. Phase 1 — Authoring
2. Phase 2 — Architecture Review (Design Council, outside Cursor)
3. Phase 3 — Editorial Pass (if Architecture Review requests it)
4. Phase 4 — Final Design Council Review
5. Phase 5 — Approval Integration (status, approval block, TOC, version history)
6. Phase 6 — Git Checkpoint Preparation → user-executed commit

Do NOT skip phases. Do NOT approve without explicit Design Council decision.  
Do NOT commit without explicit user request.

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
- Ch 35+: Viewing, application, commitment — forward

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed — property verification experience
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

No commit yet — awaiting user command.

Suggested commit message for Chapter 34:

```
approve chapter 34 property verification experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~34,200+ lines)

Chapter 34 location in document:
- After Chapter 33 — `## Chapter 34 — Property Verification Experience`
- End of document — End of Chapter 34

--------------------------------------------------

## NEXT CHAPTER

**Chapter 35 — Viewing Experience** — NOT YET STARTED

Expected domain:
- Physical viewing preparation and in-person decision boundary crossing
- Extends Verification Boundaries and Proceeding Readiness from Chapter 34
- Decision Experience continuation after property verification

Section numbering: Section XXXII — Viewing Experience (reserved for Ch 35)

Do NOT begin Chapter 35 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow 6-phase chapter workflow
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–34 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–34 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Milestone release for Decision Experience block: WAIT until core viewing/commitment chapters progress

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

Approved chapters per roadmap: **1–34**

--------------------------------------------------

**END HANDOFF**
