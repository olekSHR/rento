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

Approved chapters: **1–42** (42 chapters total)  
Latest approved chapter: **Chapter 42 — Rent Lifecycle Experience**  
Latest checkpoint: **0ed5451**

**Decision Experience judgment progression: COMPLETE** (Chapters 31–37)

**Housing Obligation execution trilogy: COMPLETE** (Chapters 38–40 — Legal, Financial, and Occupancy Readiness approved)

**Settled Tenancy block: IN PROGRESS** (Ch 41 foundation + Ch 42 rent lifecycle approved; Ch 43+ specialized chapters forward)

Chapter 42 workflow — COMPLETE (Phase 6 Git Checkpoint pending user):
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED)
- ✓ Phase 3 — Required Architectural Amendments (N/A)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint Preparation (prepared, NOT executed)

Chapter 42 location: after Chapter 41 in `RENTO_PRODUCT_DESIGN_STANDARD.md`  
Section: **XXXIX — Rent Lifecycle**  
Status: **APPROVED**

Pending user action: Git commit(s). Suggested message:

```
approve chapter 42 rent lifecycle experience
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
  Ch 42 — Rent Lifecycle Experience ✓ APPROVED (first specialized dimension)
  Ch 43+ — maintenance, dispute, conclusion ← ACTIVE
```

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 42 — Rent Lifecycle Experience** (Section XXXIX)

Architectural role:
- First specialized Settled Tenancy dimension — recurring rent obligation experience during Active Tenancy
- Extends Settled Tenancy foundation (Ch 41) without redefining Chapter 41 official concepts
- Financial Readiness / Tenancy Lifecycle / Rent Lifecycle separation — mandatory
- Platform posture: **the platform never collects rent**

Key concepts introduced in Chapter 42:
- Rent Lifecycle Environment
- Rent Lifecycle
- Rent Obligation Awareness
- Rent Lifecycle Boundaries
- Rent Boundary Clarity

Secondary concepts:
- Rent Lifecycle Integrity (parallel to Settled Tenancy Integrity and prior integrity lineage)

Terminology bridge (approved):
- **Rent Lifecycle** — recurring rent obligation dimension within Tenancy Lifecycle — distinct from Financial Readiness (Ch 39)
- **Rent Obligation Awareness** — orientation to recurring rent obligations — not payment execution

Editorial themes (approved):
- Awareness over collection — orientation, not payment processing
- Boundaries over rent theater — honest scope limits for recurring rent experience
- Financial Readiness separation — no re-gate, no Part II
- The platform never collects rent — marketplace posture preserved
- Attend / defer attention / conclude rent context — dignified attention postures
- NOT another Readiness chapter — NOT rent collection

Settled Tenancy flow (Ch 41–42 approved):

Search Architecture (Ch 26–30) → … → Occupancy Readiness (Ch 40) → Settled Tenancy (Ch 41) → **Rent Lifecycle (Ch 42)** → maintenance, dispute, conclusion (forward)

Extends (does not replace):
- Settled Tenancy Boundaries, Tenancy Boundary Clarity, Tenancy Continuity (Chapter 41)
- Financial Readiness Boundaries, Financial Boundary Clarity (Chapter 39) — inherited, not re-adjudicated
- Occupancy Readiness Boundaries (Chapter 40)
- Contact ethics (Chapter 16)
- Platform trust attestation (Chapter 20)
- Notifications posture (Chapter 21)

--------------------------------------------------

## DESIGN COUNCIL DECISION — CHAPTER 42

**Status:** APPROVED  
**Governance reference:** Chapter 42 Final Design Council Review (Approval)

### Approved architectural conclusions

1. Chapter 42 is the **first specialized dimension** within the Settled Tenancy macro-domain.
2. Chapter 42 governs **Rent Lifecycle Experience** — recurring rent obligation experience during Active Tenancy.
3. Chapter 42 is **NOT** Financial Readiness continuation, rent collection, payment processing, or Property Management.
4. **Financial Readiness** (Ch 39), **Tenancy Lifecycle** (Ch 41), and **Rent Lifecycle** (Ch 42) remain distinct — **must never be merged**.
5. **The platform never collects rent** — specialization of Ch 41 marketplace posture.

### Deferred to Chapter 43+ (Ch 42 §11.3)

- Maintenance and repair experience during tenancy
- Tenancy dispute and escalation experience (depth)
- Tenancy conclusion experience

--------------------------------------------------

## CURRENT WORKFLOW

Current phase: **Chapter 43 — not yet started**

Next step: **Pre-Authoring Analysis** for Chapter 43 before Phase 1 Authoring (when authorized).

Do NOT assume Chapter 43 theme. Determine architectural position from Ch 41–42 forward deferrals and documentation authority.

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

Repository status: **Chapter 42 approval integration complete** — uncommitted changes pending user commit

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

From Chapter 42:
- Rent Lifecycle Environment
- Rent Lifecycle
- Rent Obligation Awareness
- Rent Lifecycle Boundaries
- Rent Boundary Clarity

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

Secondary from Chapter 42:
- Rent Lifecycle Integrity

### Concept separation (mandatory)

| Concept | Chapter | Phase |
|---------|---------|-------|
| Financial Readiness | 39 | Pre-commencement financial judgment |
| Tenancy Lifecycle | 41 | Post-commencement relationship foundation |
| Rent Lifecycle | 42 | Active Tenancy — recurring rent dimension |

Never merge these concepts.

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

Settled Tenancy block (**IN PROGRESS — Ch 41–42 approved**, Ch 43+ forward):
- Ch 41: Settled Tenancy foundation — Tenancy Lifecycle, marketplace posture, platform never operates settled tenancy
- Ch 42: Rent Lifecycle — recurring rent obligation experience; platform never collects rent; Financial Readiness separation
- Ch 43+: Maintenance, dispute, conclusion — per Ch 41 §11.3 and Ch 42 §11.3 deferral

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
- Ch 42: how recurring rent obligation experience is governed — Rent Lifecycle, rent boundaries
- Ch 43+ (forward): maintenance, dispute, conclusion dimensions
- Verification ≠ moderation ≠ financial qualification ≠ rent collection ≠ settled tenancy operations

Housing Journey vs Tenancy Lifecycle vs Rent Lifecycle:
- Housing Journey (Ch 23): search → decision → execution readiness
- Tenancy Lifecycle (Ch 41): relationship lifecycle after occupancy begins
- Rent Lifecycle (Ch 42): recurring rent dimension within Active Tenancy
- Never merge these concepts

Settled tenancy principles (Ch 41 — approved):
- Boundaries over tenancy theater
- Marketplace over operations
- The platform never operates settled tenancy
- Tenancy Lifecycle distinct from Housing Journey

Rent lifecycle principles (Ch 42 — approved):
- Awareness over collection
- Boundaries over rent theater
- Financial Readiness separation — no re-gate
- The platform never collects rent
- Attend / defer attention / conclude rent context — dignified postures

Design standard scope:
- Principles only — no implementation leakage in chapter content
- No frontend/backend/API/database/CDN/upload pipeline specs in chapters
- No UI component or interaction specifications in chapters

--------------------------------------------------

## GIT STATUS

Branch: main  
Latest commit:

```
0ed5451 approve chapter 41 settled tenancy experience
```

Uncommitted changes:

```
M docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md
M docs/design/MASTER_ROADMAP.md
M docs/design/CURSOR_HANDOFF.md
```

Includes Chapter 42 Phase 5 approval integration — uncommitted.

No commit yet — awaiting user command.

Suggested commit message for Chapter 42:

```
approve chapter 42 rent lifecycle experience
```

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~40,150+ lines)

Chapter 42 location in document:
- After Chapter 41 — `## Chapter 42 — Rent Lifecycle Experience`
- End of document — End of Chapter 42

--------------------------------------------------

## NEXT CHAPTER

**Chapter 43** — NOT YET STARTED

Do NOT assume Chapter 43 theme.

Begin with **Pre-Authoring Analysis** — determine architectural position from Ch 41 §11.3 and Ch 42 §11.3 deferrals before Phase 1 Authoring.

Forward specialized domains (candidates for Ch 43+):
- Maintenance and repair experience during tenancy
- Tenancy dispute and escalation experience
- Tenancy conclusion experience

Do NOT begin Chapter 43 until explicitly authorized in a new session.

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow chapter workflow including Pre-Authoring Analysis for Ch 43+
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–42 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English
- Maintain Financial Readiness / Tenancy Lifecycle / Rent Lifecycle separation

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–42 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters
- Merge Financial Readiness with Rent Lifecycle
- Assume Chapter 43 theme without documentation authority

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Decision Experience judgment progression milestone: **COMPLETE** (Ch 31–37)
- Housing Obligation execution trilogy milestone: **COMPLETE** (Ch 38–40)
- Settled Tenancy block milestone: **IN PROGRESS** (Ch 41–42 approved; Ch 43+ forward)

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

Approved chapters per roadmap: **1–42**  
Decision Experience: **COMPLETE** (judgment progression, Ch 31–37)  
Housing Obligation: **COMPLETE** (execution trilogy, Ch 38–40)  
Settled Tenancy: **IN PROGRESS** (Ch 41–42 approved; Ch 43+ active)  
Current chapter: **43 — not yet started (Pre-Authoring Analysis next)**

Governance Decision 005: Chapter 41 opens Settled Tenancy block — see MASTER_ROADMAP.

--------------------------------------------------

**END HANDOFF**
