# PROJECT HANDOFF — RENTO PRODUCT DESIGN STANDARD v1.0

Copy this block into the next Cursor chat to continue work.

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

Approved chapters: **1–32** (32 chapters total)  
Latest approved chapter: **Chapter 32 — Media Experience**  
Section: **XXIX — Media Experience**  
Status: **APPROVED**

Chapter 32 workflow — COMPLETE:
- ✓ Phase 1 — Authoring
- ✓ Phase 2 — Architecture Review (APPROVED WITH MINOR EDITORIAL RECOMMENDATIONS)
- ✓ Phase 3 — Editorial Pass (4 recommendations applied)
- ✓ Phase 4 — Final Design Council Review (APPROVED)
- ✓ Phase 5 — Approval Integration
- ⏳ Phase 6 — Git Checkpoint (prepared, NOT executed)

Pending user action: Git commit with message:

```
approve chapter 32 media experience
```

--------------------------------------------------

## LATEST APPROVED CHAPTER

**Chapter 32 — Media Experience** (Section XXIX)

Architectural role:
- Primary architectural definition of the Evidence Layer (Chapter 31)
- Chapter 31: Information Layer + Evidence Layer
- Chapter 32: Media Experience = core spec of Evidence Layer

Key concepts introduced in Chapter 32:
- Media Integrity
- Visual Confidence
- Evidence Continuity
- Spatial Understanding

Editorial themes (approved):
- Evidence serves truth — not marketing
- Media may validate, challenge, or contradict Information
- Expected Property → Visited Property gap reduction
- Visual Confidence vs Spatial Understanding (complement, no overlap)
- Selective Omission anti-pattern

Decision Experience flow:

Search Architecture (Ch 26–30) → Property Detail Experience (Ch 31) → Media Experience (Ch 32) → Decision Experience chapters (Ch 33+) — NOT YET AUTHORED

--------------------------------------------------

## CURRENT WORKFLOW

Next chapter authoring begins at **Phase 1 — Authoring**.

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
- Ch 33+: Comparison, shortlist, verification — forward

Information ↔ Evidence cooperation:
- Information states governed facts
- Evidence validates, challenges, or contradicts those claims
- Neither layer substitutes for the other
- Rich media does not excuse missing facts; complete facts do not excuse misleading media

Media principles (Chapter 32):
- Evidence over aesthetics
- Trust over polish
- Continuity over surprise (Evidence Continuity)
- Reduce Expected Property → Visited Property gap
- Selective Omission is forbidden anti-pattern

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
```

Includes Chapter 32 Phase 3 editorial pass and Phase 5 approval integration (TOC, Version History).

No commit for Chapter 32 yet — awaiting user command.

--------------------------------------------------

## FILES

Primary:

- `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md` (~32,878 lines)

Chapter 32 location in document:
- Line ~32237 — `## Chapter 32 — Media Experience`
- Line ~32876 — End of Chapter 32

--------------------------------------------------

## NEXT CHAPTER

**Chapter 33 — NOT YET AUTHORED**

Expected domain: Decision Experience block continuation

Forward references from Chapters 31–32:
- Comparison
- Shortlist
- Verification
- Application (housing commitment arc)

Chapter 17 (Favorites & Saved Properties) already covers shortlist/comparison principles at collection level — Chapter 33+ should extend Decision Experience at evaluation/commitment depth without contradicting Chapter 17.

Suggested starting point for Phase 1 — Authoring:
- Define Chapter 33 title and scope with Design Council alignment (likely Comparison Experience or next Decision Experience surface)

Section numbering: Section XXX (Roman numeral after XXIX)

--------------------------------------------------

## IMPORTANT RULES

**DO:**
- Follow 6-phase chapter workflow
- Preserve approved vocabulary
- Keep chapters principles-only (no implementation leakage)
- Match approval block format of Chapters 30–32 for future chapters
- Update TOC and Version History on approval integration
- Commit only when user explicitly requests
- Explain in Russian; code/identifiers/commits in English

**DO NOT:**
- Implement product features in code during design standard work
- Modify approved chapters 1–32 without explicit approval
- Mark chapters APPROVED without Design Council decision
- Create git commits without user request
- Rename or redefine established product concepts
- Add API/UI/CDN/database specifications to design standard chapters

Release strategy (design standard document):
- Per-chapter git checkpoints: YES (continue pattern)
- Milestone release for Decision Experience block: WAIT until core comparison/shortlist chapters are complete

--------------------------------------------------

## SCOPE NOTE

This handoff is intentionally limited to the **RENTO PRODUCT DESIGN STANDARD**.

Engineering architecture, coding standards, deployment rules, infrastructure, development workflow, and AI governance will be maintained separately inside:

**PROJECT ARCHITECTURE & STANDARDS**

This separation is intentional and must be preserved.

--------------------------------------------------

**END HANDOFF**
