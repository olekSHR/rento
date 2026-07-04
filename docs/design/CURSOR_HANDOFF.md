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

Approved chapters: **1–37** (37 chapters total)  
Latest approved chapter: **Chapter 37 — Commitment Experience**

**Decision Experience judgment progression: COMPLETE** (Chapters 31–37)

Chapter 37 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Editorial Pass (APPROVED)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 37 location: after Chapter 36 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXIV — Commitment Experience**  
Status: **APPROVED**

Pending user action: Git commit(s). Suggested message:

```
approve chapter 37 commitment experience
```

User may commit chapters separately or together (Chapters 32–37 approval integrations may remain uncommitted).

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 37 — Commitment Experience** (Section XXXIV)

Architectural role:
- Decision Experience completion — formal interest to housing obligation intensification judgment
- Housing obligation boundary — after Application Experience (Ch 36), before forward housing obligation execution chapters
- Extends Application Confidence and Application Boundaries (Ch 36), Proceeding Readiness (Ch 34), Contact Readiness (Ch 31)

Key concepts introduced in Chapter 37:
- Commitment Environment
- Commitment Readiness
- Commitment Preparation
- Commitment Confidence
- Commitment Boundaries
- Mutual Expectation Clarity

Secondary concept:
- Commitment Integrity (§10 — parallel to Application Integrity, Viewing Integrity, Assessment Integrity, Comparison Integrity)

Editorial themes (approved):
- Obligation awareness over conversion — housing seriousness, not funnel completion
- Alignment over urgency — mutual expectation clarity before escalation pressure
- The platform never creates commitment — supports informed, voluntary, mutually understandable escalation
- Commitment Readiness distinct from Application Readiness — housing obligation trust gate
- Commitment ≠ application ≠ viewing ≠ verification ≠ lease execution ≠ payment
- proceed / defer / release — all valid and equally dignified outcomes

Decision Experience flow (COMPLETE — judgment progression):

Search Architecture (Ch 26–30) → Property Detail (Ch 31) → Media (Ch 32) → Comparison (Ch 33) → Property Verification (Ch 34) → Viewing Experience (Ch 35) → Application Experience (Ch 36) → **Commitment Experience (Ch 37)** → forward housing obligation chapters

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
Commitment ✓ COMPLETE
↓
Housing Obligation (forward)
```

Extends (does not replace):
- Application Confidence, Application Boundaries, Application Preparation (Chapter 36)
- Viewing Confidence, Viewing Boundaries (Chapter 35)
- Proceeding Readiness, Verification Boundaries (Chapter 34)
- Expected Property, Media Integrity (Chapter 32)
- Property Confidence, Contact Readiness, Listing Integrity (Chapter 31)
- Contact ethics (Chapter 16)
- Platform trust attestation (Chapter 20)

--------------------------------------------------

## CURRENT WORKFLOW

Current phase: **Phase 1 — Authoring** (next chapter)

Next step: **Phase 6 — Git Checkpoint Preparation** for Chapter 37 (user-executed commit).

Next chapter (not yet started): **Chapter 38**

Standard chapter workflow:
1. Phase 1 — Authoring
2. Phase 2 — Architecture Review (Design Council, outside Cursor)
3. Phase 3 — Editorial Pass (if Architecture Review requests it)
4. Phase 4 — Final Design Council Review
5. Phase 5 — Approval Integration (status, approval block, TOC, version history)
6. Phase 6 — Git Checkpoint Preparation → user-executed commit

Do NOT skip phases. Do NOT approve without explicit Design Council decision.  
Do NOT commit without explicit user request.

Repository status: **Ready for Chapter 38 authoring session**

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

Verification vs platform trust (Ch 20):
- Ch 20: what Rento attests — platform trust contract
- Ch 34: whether user can proceed digitally — property verification experience
- Ch 35: what in-person visit reveals — viewing experience
- Ch 36: how formal interest is expressed — application experience
- Ch 37: how housing obligation intensification is judged — commitment experience
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
M docs/design/MASTER_ROADMAP.md
```

Includes Chapter 37 Phases 1–5 (authoring + approval integration) — uncommitted.
Earlier chapter integrations (Chapters 32–36) may also remain uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 37:

```
approve chapter 37 commitment experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~37,000+ lines)

Chapter 37 location in document:
- After Chapter 36 — `## Chapter 37 — Commitment Experience`
- End of document — End of Chapter 37

--------------------------------------------------

## NEXT CHAPTER

**Chapter 38** — NOT YET STARTED

Expected domain (per MASTER_ROADMAP remaining work):
- First forward chapter after Decision Experience completion — likely Housing Obligation execution domain extending Chapter 37 §15 handoff (legal, financial, move-in — principles only)
- Or next roadmap domain per Design Council prioritization (Realtor Platform, Admin Platform, etc.)

Do NOT begin Chapter 38 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow 6-phase chapter workflow
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–37 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–37 without explicit approval
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

Approved chapters per roadmap: **1–37**  
Decision Experience: **COMPLETE** (judgment progression, Ch 31–37)  
Current chapter: **38 — not yet started**

--------------------------------------------------

**END HANDOFF**
