# Phase 0 — Accessibility & Internationalization Pre-Authoring Analysis

**Status:** APPROVED WITH CLARIFICATIONS — Phase 0 artifact integrated
**Macro-domain:** Accessibility & Internationalization
**Recommended entry:** one foundation chapter only — chapter number not assigned
**Governance:** GD-007 Macro-domain Development Lifecycle
**Audience:** Design Council, Product Design, Architecture Reviewers

---

## 1. Current State

| Item | Status |
|------|--------|
| **Approved chapters** | 1–61 |
| **Latest approved chapter** | Chapter 61 — Anti-Patterns Registry |
| **Latest macro-domain completion** | Design System Governance COMPLETE (GD-010) |
| **Product Design Standard** | IN PROGRESS toward v1.0 |
| **Accessibility & Internationalization Phase 0** | COMPLETE — this artifact |
| **Phase 1 authoring** | NOT STARTED |
| **Chapter number** | NOT ASSIGNED |

**Ecosystem position:** Accessibility & Internationalization is a repository-defined forward macro-domain per `MASTER_ROADMAP.md` remaining work. It follows Design System Governance completion and remains separate from Performance Experience and Future Product Evolution.

**Phase 0 outcome:** one cross-cutting foundation authority is required. No specialized execution chapters are currently justified.

---

## 2. Architectural Objective

This Phase 0 records why Accessibility & Internationalization exists as a Product Design Standard macro-domain, what approved Chapters 1–61 already govern, what material principles-level gap remains, and what smallest architectural treatment is justified before Phase 1 authoring may be considered.

This artifact does not author the future chapter, assign a chapter number, define chapter sections, approve Phase 1, complete the macro-domain, or declare Product Design Standard v1.0 complete.

---

## 3. Repository Evidence

| Evidence | Meaning |
|----------|---------|
| `MASTER_ROADMAP.md` remaining work | Accessibility & Internationalization is listed as inclusive and multilingual product experience |
| GD-007 | Every forward macro-domain follows Macro-domain Development Lifecycle, including Phase 0 |
| `RENTO_PRODUCT_DESIGN_STANDARD.md` macro-domain status | Accessibility & Internationalization is forward and not yet authored |
| Chapter 56 / DSG separation | Accessibility & Internationalization remains a separate forward block, not absorbed by Design System Governance |
| Chapter 60 review dimensions | Existing accessibility and language resilience are reviewable only within approved authority, not complete macro-domain depth |
| GD-010 | Design System Governance completion does not assign Chapter 62 or start the next macro-domain |

---

## 4. Existing Architectural Coverage

Approved Chapters 1–61 provide distributed baseline coverage:

| Coverage area | Existing authority | Phase 0 classification |
|---------------|-------------------|------------------------|
| Accessibility as product quality | Chapters 1 and 5 | Baseline only |
| Readability and typography resilience | Chapter 6 | Partially covered |
| Non-color-dependent meaning | Chapter 7 | Partially covered |
| Reduced motion and non-motion equivalents | Chapter 9 | Partially covered |
| Component accessibility inheritance | Chapter 11 | Partially covered |
| Labels, validation, and form recovery | Chapter 12 | Partially covered |
| Trust badge and status accessibility | Chapter 20 | Partially covered |
| Empty, loading, and error accessibility | Chapter 24 | Partially covered |
| System message comprehension | Chapter 25 | Partially covered |
| Legal, financial, occupancy, and tenancy comprehension | Chapters 38–45 | Local coverage only |
| Multilingual typography and expansion | Chapters 4 and 6 | Partially covered |
| Locale-sensitive formats | Chapters 6 and 12 | Baseline only |
| Localization and regional expression | Chapters 1, 3, 5, 7, 12, 20 | Baseline only |
| User-generated and realtor-generated multilingual content | Various local chapters | Not sufficiently covered |
| Admin and moderation language implications | Chapters 20 and 51–55 | Partially covered |

Existing coverage is valid and must be consumed. It is not sufficient as a unified cross-product authority for inclusive and multilingual access to meaning.

---

## 5. Identified Material Gap

Rento lacks a single durable Product Design Standard authority for inclusive and multilingual access to product meaning across all roles, journeys, states, and trust-critical decisions.

The material problem is not lack of local accessibility reminders. The problem is that accessibility, internationalization, localization, translation boundaries, content expansion, locale-sensitive meaning, and multilingual trust comprehension are distributed across local chapters without a unified macro-domain contract.

Without this authority, teams may preserve local readability while still fragmenting cross-product meaning across:

- property status;
- verification status;
- moderation outcomes;
- legal, financial, and occupancy readiness;
- settled tenancy boundaries;
- realtor-generated listing content;
- admin and policy enforcement communication;
- multilingual and locale-sensitive contexts.

Classification: **Material Architectural Gap**.

---

## 6. Macro-domain Boundaries

Accessibility & Internationalization governs:

- inclusive access to product meaning as a product invariant;
- perceivable, operable, understandable, and robust experience at principles level;
- language-resilient information architecture;
- content expansion and translated string resilience;
- locale-sensitive meaning for dates, numbers, currency, measurements, addresses, names, and phone numbers at principles level;
- trust-critical comprehension across abilities, languages, and locales;
- product-level translation boundaries where meaning affects user trust or obligation;
- user-generated and realtor-generated multilingual content principles;
- moderation and admin language comprehension boundaries;
- AI translation deferral posture.

Accessibility & Internationalization does not govern:

- technical accessibility implementation;
- exact HTML semantics or ARIA mechanics;
- framework-specific focus management;
- automated accessibility testing configuration;
- translation file structure;
- i18n libraries;
- locale routing;
- database localization schemas;
- machine translation infrastructure;
- delivery workflows or localization operations.

---

## 7. Product Design Standard Authority

The Product Design Standard owns the principles-level experience contract:

- what product meaning must remain accessible;
- what trust-critical information must remain understandable;
- how localization may adapt expression without changing product truth;
- how translation affects user comprehension and trust;
- how multilingual content must preserve hierarchy, source of truth, and moderation clarity.

This authority consumes Chapters 1–61 without redefining them.

---

## 8. Project Architecture & Standards Boundary

The following belong to future Project Architecture & Standards:

- semantic HTML and ARIA implementation rules;
- keyboard event handling mechanics;
- browser and platform accessibility behavior;
- automated accessibility testing, linting, and CI gates;
- i18n library selection;
- translation file structure;
- ICU message syntax;
- locale routing and negotiation;
- database localization schemas;
- caching and translation pipeline architecture;
- machine translation infrastructure.

Product requirements may inform those standards later, but this Phase 0 does not define them.

---

## 9. Product Development Methodology Boundary

The following belong to future Product Development Methodology:

- localization operations;
- translation review workflow;
- accessibility audit process;
- team roles and delivery rituals;
- release sequencing;
- vendor coordination;
- recurring review cadence;
- process templates and checklists beyond Product Design Standard governance.

This macro-domain may define what must be preserved in product experience, but not how teams operationally deliver that preservation.

---

## 10. Localization, Translation, and AI Translation

Localization belongs inside this macro-domain only at product-principles level: local rental vocabulary, cultural expression, locale-sensitive formats, and preservation of product meaning across markets.

Translation requires product-level authority when mistranslation can change trust, status, legal, financial, tenancy, verification, moderation, or obligation meaning.

Translation implementation belongs to Project Architecture & Standards.

AI translation is not required for Product Design Standard v1.0. If introduced later, it must remain disclosed, reviewable, and human-accountable. AI translation is deferred post-v1.0 unless future repository authority explicitly requires it.

---

## 11. Architectural Economy Assessment

A new architectural object is justified only if it solves a real unresolved Product Design Standard problem.

| Test | Result |
|------|--------|
| Genuine architectural problem exists | PASS |
| Chapters 1–61 do not already own it sufficiently | PASS |
| Durable principles-level authority is required | PASS |
| Belongs inside Product Design Standard | PASS |
| Belongs specifically inside Accessibility & Internationalization | PASS |
| Mandatory for intended v1.0 scope | PASS — repository-defined remaining work |
| Leaving unresolved creates material trust/comprehension risk | PASS |
| Cannot be handled by implementation, methodology, or existing local chapters alone | PASS |

Conclusion: one foundation chapter is architecturally justified.

---

## 12. Minimum Required Architecture

The minimum required architecture is a single foundation chapter for Accessibility & Internationalization.

The foundation must establish:

- macro-domain purpose;
- inclusive product access invariant;
- multilingual meaning integrity;
- locale-sensitive comprehension principles;
- localization and translation boundaries;
- AI translation deferral;
- content resilience principles;
- trust-critical comprehension requirements;
- user-generated and realtor-generated multilingual content boundaries;
- admin and moderation language boundaries;
- Project Architecture & Standards separation;
- Product Development Methodology separation;
- cross-macro-domain consumption and non-redefinition.

No specialized execution chapters are currently justified.

---

## 13. Rejected Alternatives

| Alternative | Rejection reason |
|-------------|------------------|
| Zero new chapters | Conflicts with repository-defined forward macro-domain and material gap finding |
| Separate accessibility and internationalization chapters | Not justified; the shared architectural subject is access to product meaning across abilities, languages, and locales |
| Specialized execution chapters now | No independent durable execution dimensions proven during Phase 0 |
| Chapter 5 amendment | Would overload decision framework and duplicate local authority |
| Chapter 11 amendment | Component governance cannot own full cross-product A&I meaning |
| Design System Governance absorption | Violates DSG forward macro-domain separation |
| Project Architecture & Standards absorption | Would move product meaning into implementation authority |
| Product Development Methodology absorption | Would treat product authority as process workflow |

---

## 14. Completion Criteria for Phase 1 Authorization

Design Council may authorize Phase 1 authoring only after confirming:

1. This Phase 0 artifact is accepted as the official pre-authoring record.
2. The future chapter remains a foundation authority only.
3. No chapter number is assigned until explicit authorization.
4. Accessibility and Internationalization remain one macro-domain.
5. No specialized execution chapter is authorized.
6. AI translation remains deferred post-v1.0.
7. Technical implementation remains outside Product Design Standard.
8. Product Development Methodology process remains outside Product Design Standard.
9. Chapters 1–61 remain unchanged and consumed, not redefined.
10. Performance Experience and Future Product Evolution remain separate forward macro-domains.

---

## 15. Risks

| Risk | Mitigation |
|------|------------|
| Chapter authoring begins during Phase 0 | This artifact explicitly prohibits Phase 1 start |
| Chapter 62 assigned prematurely | Chapter number remains not assigned |
| Accessibility becomes implementation checklist | Project Architecture & Standards boundary explicit |
| Internationalization becomes translation infrastructure | Product vs implementation boundary explicit |
| AI translation pulled into v1.0 | Deferred post-v1.0 |
| Specialized chapters created by symmetry | Architectural economy rejects symmetry-driven splitting |
| Existing local coverage duplicated | Future foundation must consume Chapters 1–61 |
| Performance absorbed into A&I | Performance Experience remains separate forward macro-domain |

---

## 16. Recommended Decision

**APPROVE Phase 0 Accessibility & Internationalization integration as a foundation-only macro-domain pre-authoring artifact.**

Recommended future subject name: **Accessibility & Internationalization Experience**.

Recommended architecture: **one foundation chapter only**.

Not authorized:

- Chapter number assignment;
- Phase 1 authoring;
- chapter outline creation;
- specialized execution chapters;
- modification of approved Chapters 1–61;
- Performance Experience start;
- Future Product Evolution start;
- Product Design Standard v1.0 completion declaration.

---

## Approval Integration Record

| Field | Value |
|-------|-------|
| **Design Council decision** | APPROVED WITH CLARIFICATIONS |
| **Integration date** | 2026-07-10 |
| **Clarifications applied** | One foundation chapter only; no specialized execution chapters; no chapter number assigned; AI translation deferred post-v1.0; implementation belongs to Project Architecture & Standards; operational process belongs to Product Development Methodology |
| **Artifact path** | `docs/design/PHASE_0_ACCESSIBILITY_INTERNATIONALIZATION.md` |
| **Governance reference** | GD-007 Macro-domain Development Lifecycle |
| **Phase 1 authoring** | NOT STARTED |

---

**End of Phase 0 — Accessibility & Internationalization Pre-Authoring Analysis**
