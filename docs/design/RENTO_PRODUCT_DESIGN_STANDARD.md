# RENTO PRODUCT DESIGN STANDARD

**Version:** 1.0  
**Status:** APPROVED — Official Internal Standard  
**Product:** Rento — Mobile-first long-term rental marketplace (Romania)  
**Production:** https://rentonow.ro  
**Document path:** `docs/design/RENTO_PRODUCT_DESIGN_STANDARD.md`  
**Effective date:** 2026-07-03  
**Governance:** Design Council  

---

## Document Purpose

This document is the **official internal Product Design Standard** for Rento. It defines long-term product philosophy, experience principles, visual language, structure, governance, and behavioral systems that govern all present and future design decisions.

This standard is **not** implementation documentation. It does not specify code, frameworks, APIs, or visual tokens. Implementation artifacts must comply with this standard.

**Authority order:** Immutable domain rules (documented in product architecture) → this standard → pattern specifications → screen-level exceptions (Chapter 5 Exception Policy).

---

## Table of Contents

### Approved Chapters (v1.0)

| Ch. | Title | Section | Status |
|-----|-------|---------|--------|
| 1 | [Product Philosophy](#chapter-1--product-philosophy) | Foundation | APPROVED |
| 2 | [Experience Principles](#chapter-2--experience-principles) | Foundation | APPROVED |
| 3 | [Brand Experience & Visual Identity](#chapter-3--brand-experience--visual-identity) | Brand Experience | APPROVED |
| 4 | [Layout & Information Architecture](#chapter-4--layout--information-architecture) | Structure | APPROVED |
| 5 | [Product Design Decision Framework](#chapter-5--product-design-decision-framework) | Governance | APPROVED |
| 6 | [Typography & Reading System](#chapter-6--typography--reading-system) | Visual Language | APPROVED |
| 7 | [Color Meaning & Semantic Color System](#chapter-7--color-meaning--semantic-color-system) | Visual Language | APPROVED |
| 8 | [Spatial System & Layout Rhythm](#chapter-8--spatial-system--layout-rhythm) | Visual Language | APPROVED |
| 9 | [Motion & Interaction System](#chapter-9--motion--interaction-system) | Motion & Interaction | APPROVED |
| 10 | [Navigation System](#chapter-10--navigation-system) | Navigation | APPROVED |
| 11 | [Component Philosophy & Component System](#chapter-11--component-philosophy--component-system) | Design System | APPROVED |
| 12 | [Form System & Data Collection Experience](#chapter-12--form-system--data-collection-experience) | Forms & Data Collection | APPROVED |

### Planned (not yet authored)

| Ch. | Title |
|-----|-------|
| 13+ | Future chapters per design standard roadmap (e.g., Search Experience System) |

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-03 | Initial consolidation — Chapters 1–12 approved and assembled |

---

---

# RENTO PRODUCT DESIGN STANDARD v1.0 — Approved Chapters

## Chapter 1 — Product Philosophy

**Section:** I — Foundation  
**Status:** APPROVED
**Audience:** Product Design, UX, Product Management, Leadership, Reviewers

---

## 1. Purpose

This chapter defines why Rento exists as a product and what every experience decision must serve. It is the highest authority in the design standard after immutable domain rules (see Chapter 4). When teams disagree on layout, copy, features, or priority, this chapter resolves the conflict.

Rento is a **mobile-first marketplace for long-term residential rentals**, operating primarily in Romania with a European outlook. The product connects people seeking stable housing with professional realtors who publish and manage listings. Rento is not a short-term travel platform, not a generic classifieds board, and not a social network.

The purpose of Rento’s experience is to help users make **confident housing decisions** in a category where anxiety, fraud risk, and information overload are common. Every surface must reduce uncertainty, respect the user’s time, and reflect the seriousness of long-term rental commitments.

Product philosophy precedes visual style, interaction patterns, and feature roadmaps. A beautiful interface that erodes trust fails the standard. A minimal interface that builds trust succeeds.

---

## 2. Core Principles

The following principles are non-negotiable. They apply to all roles, all surfaces, and all phases of product evolution.

### 2.1 Only What Is Real

Rento’s central product promise is **actual availability**. The marketplace must favor listings that are current, reviewed, and honestly represented. Design must never create the impression of abundance at the expense of accuracy. Empty or honest states are preferable to misleading fullness.

### 2.2 Trust Before Conversion

Contact, inquiry, and engagement matter — but not at the cost of user confidence. Users must understand who they are dealing with, what has been verified, and what has not. Conversion without trust produces churn, complaints, and reputational harm in a local rental market.

### 2.3 Calm Over Stimulation

Long-term rental decisions are deliberate. The experience must feel **calm, professional, and unhurried**. Visual noise, urgency manipulation, and attention-grabbing patterns appropriate to impulse purchases are out of scope. Rento should feel closer to a trusted advisor than a clearance sale.

### 2.4 Mobile-First, Not Mobile-Only

The primary context of use is a phone: commuting, messaging landlords, sharing listings with partners, checking favorites before a viewing. Design decisions must hold on small screens first. Larger viewports may add space and clarity; they must not introduce a separate product logic.

### 2.5 Clarity Without Instruction

Users should understand where they are, what they are looking at, and what they can do next **without onboarding tutorials**. Hierarchy, labeling, and consistent patterns replace explanation. If a surface requires a tooltip to be understood, the surface has failed.

### 2.6 Professional Marketplace, Human Presence

Rento is a platform, not an anonymous bulletin board. Realtors are visible, accountable participants. Renters interact with real people behind listings. Design must humanize without casualizing — warmth within professional boundaries.

### 2.7 One Honest Primary Action

Each context should present **one clear primary action**. Secondary actions remain available but visually subordinate. Competing calls to action create hesitation in high-stakes decisions.

### 2.8 Consistency Builds Confidence

Familiar patterns across browsing, detail, saved items, and realtor tools reduce cognitive load. Users who learn the product once should recognize it everywhere. Inconsistency reads as instability; stability reads as trustworthiness.

### 2.9 Accessible Is Premium

Inclusive design is not a compliance checkbox. Readable type, sufficient contrast, generous touch targets, and predictable behavior are markers of quality. A product that excludes users undermines its own credibility.

### 2.10 Restraint Scales

The product will grow in features, roles, and markets. Philosophy favors **restraint today** so that tomorrow’s additions do not collapse under visual or behavioral debt. What is not shown is often as important as what is shown.

### 2.11 One Source of Truth

Every piece of information within Rento must have a **single authoritative source**. Realtor identity, contact information, listing status, verification, pricing, and availability each originate from one governed origin — not from parallel displays that may drift apart.

Design must **reinforce** that source, not duplicate or fragment it. When the same fact appears in more than one place, it must remain consistent in meaning and must not compete for user attention. Fragmented information erodes trust faster than missing information.

### 2.12 Human-Centered Marketplace

Rento connects people through homes. Users do not build trust with interfaces — they build trust with **real people**. The product must always make the human relationship visible while preserving professionalism.

Realtors are not anonymous system accounts. Listings represent real people providing real housing opportunities. Design serves the relationship between renter and realtor; the platform facilitates that relationship — it does not replace it.

### 2.13 Respect User Time

Every interaction should help users make decisions **faster**, not slower. Unnecessary steps, duplicate actions, repeated information, and interactions that delay understanding are philosophical failures — not merely usability inconveniences.

Time is part of the user experience. A product that wastes time in a high-stakes category signals disrespect and reduces confidence in everything it presents.

---

## 3. Design Standards

Standards in this chapter are philosophical. Tactical standards appear in later chapters. All downstream standards must align with this section.

### 3.1 Marketplace Integrity

- Public discovery surfaces show only listings appropriate for public viewing under product rules.
- Listing state (available, pending review, reserved, and similar) must be honestly reflected or withheld — never obscured for engagement.
- Removed, outdated, or unverified content must not be presented as equally trustworthy as verified content.

### 3.2 Truthful Representation

- Photography, price, location, and description are material facts. Design must not embellish or bury them.
- Missing information is shown as missing — not invented, not hidden behind interaction.
- Price and rental terms must remain visually primary in evaluation flows.
- Pricing and availability must not be restated in ways that could contradict their authoritative source elsewhere in the product.

### 3.3 Role Respect

- **Renters** need discovery, evaluation, comparison, and safe contact.
- **Realtors** need efficient listing management, profile completeness, and clear status of their portfolio.
- **Administrators** need moderation clarity — outside consumer-facing polish but governed by the same honesty principles.
- No role’s interface should privilege business metrics over user understanding in consumer paths.

### 3.4 Contact Transparency

- Contact pathways must be explicit: users know they are reaching a realtor, not an abstract platform intermediary posing as the landlord unless that is factually true.
- Contact details originate from authorized profile sources; design reinforces **one source of truth** for identity and contact data.
- Contact actions must be deliberate, not accidental.

### 3.5 Moderation Visibility

- Where moderation affects visibility, affected parties receive understandable status communication.
- Consumer-facing design does not expose internal admin mechanics unnecessarily, but must not pretend all listings are equivalent when they are not.

### 3.6 European Sensibility

- Tone and visual restraint align with European expectations: privacy-aware, professional, understated premium.
- Aggressive growth patterns common in other regions or categories are not the reference model for Rento.

### 3.7 Premium Without Excess

- Premium quality is expressed through spacing, typography discipline, consistency, and calm — not through ornament, luxury signifiers, or decorative complexity.
- The product should feel trustworthy to a first-time renter in Bucharest and credible to an experienced realtor in Cluj.

### 3.8 Scarcity and Urgency

- Artificial urgency (“only 1 left,” countdown timers on rentals) is prohibited unless tied to factual, user-relevant state.
- Favor relevance and freshness over manufactured pressure.

---

## 4. Decision Rules

When evaluating any proposal — feature, copy change, new surface, or visual treatment — apply these rules in order.

### Rule 1 — Domain First

If a design conflicts with immutable product rules (ownership, moderation, contact sourcing, visibility), the design is rejected regardless of aesthetic merit. See Chapter 4.

### Rule 2 — Trust Impact

Ask: *Does this increase or decrease user confidence in the listing, the realtor, or the platform?*  
If decrease or ambiguous, revise or reject.

### Rule 3 — Mobile Comprehension

Ask: *Can a user on a phone understand the primary message and action within five seconds?*  
If no, simplify hierarchy before adding elements.

### Rule 4 — Cognitive Load

Ask: *Does this add a new concept, label, or action that users must learn?*  
If yes, justify against an existing pattern. Prefer reuse.

### Rule 5 — Progressive Disclosure

Ask: *Is information revealed in the right order — essentials first, supporting details second, advanced information only when needed?*  
If everything is shown at once, restructure into layers. Users should never receive the full complexity of a listing or workflow before they need it. Progressive disclosure reduces cognitive load while improving confidence.

### Rule 6 — Calm Test

Ask: *Does this make the experience feel more anxious or more settled?*  
If more anxious, remove or soften unless required by factual urgency (e.g., genuine error).

### Rule 7 — Honesty Test

Ask: *Would we be comfortable if this screen were screenshot and shared publicly?*  
If embarrassment or misinterpretation is likely, redesign.

### Rule 8 — Long-Term Fit

Ask: *Does this still make sense when listings, cities, languages, and features multiply?*  
If it only works at current scale, it is a shortcut — not a standard.

### Rule 9 — No Dead Ends

Ask: *Does this screen or state offer a clear next step?*  
If the user could reasonably ask “what now?”, the design is incomplete. Empty states, error states, search without results, moderation states, and success states must all provide a constructive path forward. Users should never wonder what to do next.

### Rule 10 — Escalation

Unresolved tension between conversion and trust defaults to **trust**.  
Unresolved tension between novelty and consistency defaults to **consistency**.  
Unresolved tension between density and clarity defaults to **clarity**.

---

## 5. Correct and Incorrect Examples

Examples illustrate philosophy application. They are behavioral and experiential — not implementation references.

### 5.1 Listing Discovery

**Correct:** A renter opens the marketplace and sees a scannable feed of listings with clear price, location, room count, and a visible trust indicator where applicable. The user immediately understands these are long-term rentals.

**Incorrect:** A feed optimized for visual thrill with hidden prices, ambiguous location, or promotional badges that do not communicate verifiable status. The user cannot tell what is real or current.

### 5.2 Property Evaluation

**Correct:** On a listing detail view, price and essential facts appear early. The realtor is identifiable. Verification and freshness are communicated in plain language. Supporting details follow without repeating the same facts. Contact is available when appropriate but does not hijack comprehension.

**Incorrect:** A detail view that buries price beneath marketing copy, duplicates the same facts in multiple blocks, or presents verification language so vague it sounds like marketing rather than fact.

### 5.3 Contact Intent

**Correct:** A renter initiates contact knowing the realtor’s name and role, with a clear path to message or call. The action feels intentional.

**Incorrect:** Contact buttons that appear before the user understands the listing, or contact flows that obscure who will respond.

### 5.4 Realtor Workspace

**Correct:** A realtor sees portfolio status at a glance: what is live, what awaits review, what needs attention. The next recommended action is obvious. The workspace feels operational and professional.

**Incorrect:** A dashboard that celebrates vanity metrics while hiding moderation status, or duplicates the same guidance in multiple competing blocks.

### 5.5 Empty and Error States

**Correct:** No results after search explains why and offers a constructive next step (adjust filters, try another city). Tone is helpful, not apologetic theater. The user is never left without a path forward.

**Incorrect:** Empty states that blame the user, use playful chaos inappropriate to housing search, suggest listings that do not exist, or end the experience with no actionable next step.

### 5.6 Saved Properties

**Correct:** Saved listings remain easy to revisit, compare mentally, and act upon. Removal is clear. Stale listings are handled honestly.

**Incorrect:** Favorites treated as an afterthought with no path back to evaluation or contact.

---

## 6. Common Mistakes

Teams must watch for these recurring failures against product philosophy.

| Mistake | Why It Violates Philosophy |
|--------|-----------------------------|
| Treating Rento like short-term booking | Different decision cycle, trust model, and content depth |
| Maximizing clicks over comprehension | Breaks calm, erodes trust in housing |
| Hiding price or location to increase scroll | Dishonest representation |
| Duplicating trust badges for visual effect | Creates noise; dilutes meaning |
| Showing the same fact in multiple competing formats | Violates One Source of Truth; wastes user time |
| Presenting all listing information at once | Violates Progressive Disclosure; increases cognitive load |
| Leaving users without a next step | Violates No Dead Ends; signals abandonment |
| Over-dashboarding the realtor workspace | Operational clarity lost to metric display |
| Using urgency and scarcity language by default | Manipulative in long-term rental context |
| Designing desktop first, mobile as compromise | Violates mobile-first principle |
| Adding features without simplifying existing paths | Increases load; reduces clarity |
| Equating premium with decorative luxury | Premium on Rento is restraint and quality |
| Shipping “good enough” empty and error states | Signals abandonment; damages trust |
| Conflating platform verification with realtor identity | Misleading trust signals |
| Letting business KPIs override user understanding | Short-term gain, long-term reputational loss |
| Hiding the human behind the listing | Violates Human-Centered Marketplace |

---

## 7. Future Scalability

Product philosophy must remain valid as Rento evolves across years, markets, and capabilities.

### 7.1 Geographic Expansion

New cities and countries introduce language, currency, and cultural norms. Philosophy does not change: honesty, calm, and mobile clarity remain fixed. Local adaptation affects expression, not principles.

### 7.2 Feature Growth

Search refinement, saved searches, agency profiles, monetized placement, and assisted content generation may arrive in later phases. Each must pass the trust and calm tests. Features that cannot be explained simply do not belong in core flows. New capabilities must adopt progressive disclosure — not expand every surface to full complexity by default.

### 7.3 AI-Assisted Experiences

When artificial intelligence assists listing creation, search, or recommendations, users must always understand what is machine-generated, what is editable, and what is human-reviewed. AI serves accuracy and efficiency — it does not replace accountability. See Chapter 53.

### 7.4 Monetization

Revenue features must not degrade the renter’s ability to evaluate listings honestly. Paid visibility must be disclosed where material to user trust. The marketplace must not become pay-to-mislead.

### 7.5 Multi-Role Complexity

As roles and permissions grow, consumer paths must remain simpler than internal paths. Complexity is absorbed by the product — not exported to renters.

### 7.6 Performance and Perceived Quality

Scale increases data and media volume. Fast, stable, progressive experiences are part of philosophical commitment to respect. Slowness reads as unreliability. See Chapter 20.

### 7.7 Standard Evolution

This chapter changes rarely. Proposed amendments require Design Director review and explicit documentation of why a principle-level shift is necessary. Tactical course corrections belong in downstream chapters.

---

## 8. Design Director Review

**Chapter:** 1 — Product Philosophy  
**Section:** I — Foundation  
**Review type:** Editorial revision — APPROVED

### 8.1 Approval Statement

This chapter is approved as the foundational philosophical contract for Rento experience design. All subsequent chapters, patterns, and reviews must align with it. No surface ships in conflict with this chapter.

### 8.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 2 — Design Principles | Operationalizes this philosophy into repeatable principles |
| Chapter 4 — Domain Constraints | Defines immutable rules this philosophy cannot override |
| Chapter 5 — Trust Architecture | Extends trust as a strategic system |
| Chapter 12 — Marketplace Experience | Applies philosophy to core renter flows |
| Chapter 13 — Information Hierarchy | Operationalizes Progressive Disclosure |
| Chapter 19 — Trust Signals | Applies philosophy to specific indicators; enforces One Source of Truth |
| Chapter 60 — Product Review Checklist | Enforces philosophical compliance at ship gate |

### 8.3 Review Criteria for Future Amendments

Any proposed change to Chapter 1 must answer:

1. What long-term user or business harm does the current principle fail to prevent?
2. Why cannot the issue be solved in a downstream chapter?
3. What is the trust, clarity, or calmness impact of the change?
4. Does the change remain valid across markets and product phases?

If these questions cannot be answered with evidence and council agreement, the amendment is deferred.

### 8.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on principle changes |
| Head of Product Design | Coherence across chapters and patterns |
| Head of Product | Alignment with business model and domain |
| Mobile UX Architect | Mobile-first fidelity of philosophical intent |

### 8.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new work immediately. Existing surfaces should be brought into alignment during scheduled improvement cycles — not used as justification for new violations.

### 8.6 Design Director Closing Note

Rento wins in a crowded rental market not by being the loudest product, but by being the most **believed** product. Belief is earned through accurate listings, visible professionalism, and experiences that respect the weight of finding a home. Every designer, writer, and product decision-maker shares responsibility for that belief. This chapter exists so that responsibility has a single, durable reference.

---

**End of Chapter 1**

---

## Chapter 2 — Experience Principles

**Section:** I — Foundation  
**Status:** APPROVED
**Audience:** Product Design, UX, Product Management, Content Design, Reviewers  
**Authority:** Subordinate to Chapter 1 (Product Philosophy) and Chapter 4 (Domain Constraints); superior to visual and pattern chapters.

---

## 1. Purpose

This chapter translates Product Philosophy into **practical experience rules** that govern every interaction in Rento. Where Chapter 1 defines what the product believes, this chapter defines how those beliefs appear in user behavior, comprehension, and confidence.

Experience principles apply before visual language, before pattern libraries, and before individual screen design. They answer: *How should it feel to browse, evaluate, save, contact, publish, and recover from failure on Rento?*

These principles are universal. They apply to renters, realtors, and any future role. They apply to current surfaces and surfaces not yet designed. They are the bridge between philosophy and execution.

No team may treat visual polish as a substitute for experience quality. A calm layout that violates these principles still fails the standard.

---

## 2. Core Principles

The following experience principles operationalize Chapter 1. They are non-negotiable in design review.

### 2.1 Trust-First Interaction

Every interaction must increase or preserve user confidence in the listing, the realtor, and the platform. Users must never be surprised by who they are contacting, what status a listing holds, or what verification means. Trust is the default filter for approving any interaction pattern.

### 2.2 Mobile-First Thinking

Experience is conceived for one-handed phone use in real-world contexts: commuting, messaging, comparing with a partner, checking before a viewing. Thumb reach, scroll depth, and glance comprehension take priority. Larger screens extend clarity; they do not redefine the experience.

### 2.3 Cognitive Load Reduction

Users are making significant life decisions. Each surface must minimize what the user must remember, parse, or decide simultaneously. Remove, merge, or defer anything that does not serve the current task. Simplicity is not minimalism for aesthetics — it is respect for mental effort.

### 2.4 Progressive Disclosure in Practice

Information is revealed in layers: **essentials first**, supporting details second, advanced information only when requested or contextually needed. Users receive enough to act with confidence — not everything the product knows. Disclosure is a discipline, not an accident of layout.

### 2.5 User Confidence

Confidence is the feeling that the user understands the situation and can act without regret. Design builds confidence through honest states, predictable behavior, visible human presence, and recoverable mistakes. Anxiety, ambiguity, and surprise destroy confidence faster than missing features.

### 2.6 Information Hierarchy

Every screen has a single primary message and a clear reading order. Price, location, availability, and trust signals compete only by design intent — never by accident. Hierarchy is tested by the five-second rule: the user must grasp the primary purpose of the screen within five seconds on a phone.

### 2.7 One Primary Action

Each context offers one dominant action aligned with user intent. Secondary actions remain available but visually and cognitively subordinate. Multiple competing primaries create hesitation in a category where hesitation already exists.

### 2.8 Human-Centered Marketplace

Interactions reinforce that listings represent real housing opportunities offered by real professionals. The human relationship is visible at the right moments — not buried, not theatrical. Users build trust with people; the product makes those people legible.

### 2.9 Calm Interaction Model

Interactions are deliberate, unhurried, and free of manufactured urgency. Feedback is clear but restrained. Motion and emphasis serve orientation — not stimulation. The product must never feel like it is shouting for attention.

### 2.10 Respect for User Time

Every step, repetition, and delay must earn its place. Duplicate information, redundant confirmations, and circular paths are experience defects. Faster comprehension is a feature; wasted time is a failure.

### 2.11 Predictability

Users should anticipate what will happen before they act. Similar inputs produce similar outcomes. Similar states look and behave similarly. Predictability reduces fear of error and supports repeat use.

### 2.12 Consistency

Patterns learned on one surface apply on all surfaces within a role. Terminology, action placement, status language, and trust indicators maintain stable meaning. Consistency is how a growing product remains learnable.

### 2.13 Ethical Conversion

Moving users toward contact, save, or publish is legitimate when it follows comprehension and trust. Conversion must never rely on deception, hidden cost, obscured identity, or pressure tactics inappropriate to long-term rental. Ethical conversion converts informed intent — not confusion.

### 2.14 Error Prevention

Design prevents mistakes before they occur: clear labels, constrained choices, confirmation only where irreversible harm exists, and guardrails on high-stakes actions. Prevention is preferable to apology.

### 2.15 Recovery Experience

When errors occur, users receive plain explanation, preserved context, and a constructive next step. Recovery is calm, blameless, and fast. A user who fails should leave with more understanding — not less confidence.

---

## 3. Experience Standards

Standards below define minimum acceptable experience quality. Detailed pattern standards appear in later chapters.

### 3.1 Comprehension Standards

- Primary purpose of any screen is identifiable within five seconds on a mobile device.
- Labels and headings use plain language; jargon requires justification.
- Status language is factual, not promotional.
- Users always know which role they are operating in (renter, realtor, or other).

### 3.2 Hierarchy Standards

- Material facts — price, location, room count, listing status where relevant — appear before secondary narrative.
- Trust signals appear where they inform decision-making — not as decorative repetition.
- The same fact must not compete with itself across multiple zones on one screen (see Chapter 1, One Source of Truth).

### 3.3 Action Standards

- One primary action per context; secondary actions grouped and subordinate.
- Destructive actions require clear intent and recoverable context where possible.
- Contact actions appear after sufficient listing comprehension — not before identity and material facts are understood.

### 3.4 Disclosure Standards

- First layer: what the listing is, where it is, what it costs, who offers it, whether it is trustworthy enough to continue.
- Second layer: description, supporting attributes, comparison-friendly detail.
- Third layer: administrative, historical, or edge-case information — only when needed.
- Layers may be revisited; they must not be collapsed into undifferentiated blocks.

### 3.5 Trust Experience Standards

- Verification and moderation language must be understandable without insider knowledge.
- Realtor identity is visible before or alongside contact — never only after contact is initiated.
- Absence of verification is communicated honestly — not hidden, not exaggerated.

### 3.6 Calm and Pace Standards

- No artificial urgency unless tied to factual, user-relevant state.
- Success and confirmation feedback is brief and clear — not celebratory excess.
- Loading and waiting are acknowledged; indefinite silence is unacceptable (see Chapter 20).

### 3.7 Predictability and Consistency Standards

- Navigation behavior is stable across consumer surfaces.
- Empty, error, loading, and success states follow shared behavioral conventions (see Chapter 17).
- Terminology for listing states, roles, and trust signals is stable across the product (see Chapter 8).

### 3.8 Ethical Conversion Standards

- Save and contact actions are never disguised as other actions.
- Users can evaluate a listing without creating an account where product rules allow.
- Prompts to register, complete profile, or contact appear at moments of genuine user value — not as barriers to comprehension.

### 3.9 Error and Recovery Standards

- Errors state what happened, what it means for the user, and what to do next.
- User-entered data is preserved where possible after failure.
- Moderation and rejection states explain status without exposing unnecessary internal process.
- No screen ends without a path forward (see Chapter 1, No Dead Ends).

---

## 4. Decision Rules

Apply these rules when evaluating flows, copy, states, and interaction proposals.

### Rule 1 — Philosophy Alignment

If a proposal conflicts with Chapter 1, reject or revise before further review.

### Rule 2 — Trust Delta

Ask: *After this interaction, does the user trust the listing, realtor, or platform more, less, or the same?*  
If less or unclear, reject.

### Rule 3 — Five-Second Hierarchy

Ask: *What is the primary message and primary action? Are both obvious on a phone within five seconds?*  
If not, restructure before adding elements.

### Rule 4 — Load Budget

Ask: *How many new concepts, decisions, or facts does this surface introduce at once?*  
If more than the task requires, apply progressive disclosure or remove.

### Rule 5 — Primary Action Clarity

Ask: *Is there exactly one dominant action aligned with user intent in this context?*  
If multiple actions compete equally, resolve hierarchy before ship.

### Rule 6 — Human Legibility

Ask: *Does the user know who they are dealing with at the point of decision?*  
If not, surface human identity and role appropriately.

### Rule 7 — Time Respect

Ask: *Does this add steps, repetition, or delay without improving confidence?*  
If yes, simplify.

### Rule 8 — Predictability Check

Ask: *Will a returning user correctly predict the outcome of this action?*  
If not, align with established patterns or document a justified exception.

### Rule 9 — Conversion Ethics

Ask: *Would we defend this conversion pattern if explained publicly to a renter?*  
If not, redesign.

### Rule 10 — Prevention Before Recovery

Ask: *Can this error be prevented with clearer design?*  
If yes, prevent first; then design recovery.

### Rule 11 — Dead End Test

Ask: *What is the user’s next step from this state — including empty, error, and success?*  
If none exists, the surface is incomplete.

### Rule 12 — Escalation

When principles conflict: **trust** over conversion, **clarity** over density, **consistency** over novelty, **prevention** over clever recovery copy.

---

## 5. Correct and Incorrect Examples

Examples describe experience outcomes — not implementation.

### 5.1 Browsing and Evaluation

**Correct:** A renter scans listings with immediate access to price, city, and room count. Opening a listing reveals essentials in the first layer; description and contact follow in clear order. The user feels oriented, not overwhelmed.

**Incorrect:** A feed or detail view that requires expansion, guessing, or scrolling through repeated facts before the user understands whether the listing is worth attention.

### 5.2 Progressive Disclosure

**Correct:** A listing detail presents price, location, realtor identity, and trust status early. Full description and contact options appear in subsequent layers once context is established.

**Incorrect:** A detail view that dumps verification badges, duplicate fact grids, realtor blocks, and contact buttons into the first screenful with no reading order.

### 5.3 One Primary Action

**Correct:** On a listing evaluation screen, the user’s dominant path is clear: continue reading, save, or contact — with one action visually primary for the screen’s moment in the journey.

**Incorrect:** WhatsApp, call, share, favorite, and report presented with equal visual weight above essential listing facts.

### 5.4 Human-Centered Contact

**Correct:** Before contacting, the user knows the realtor’s name and role. Contact feels like reaching a person about a specific home.

**Incorrect:** Generic “Contact” with no identity, or contact flows that feel like messaging a black box.

### 5.5 Ethical Conversion

**Correct:** A user saves a listing after understanding price and location. Contact is offered when the user is ready to inquire — not as a trap to unlock basic information.

**Incorrect:** Hiding price or location behind contact, registration, or share actions.

### 5.6 Error Prevention and Recovery

**Correct:** A filter search with no results explains why, suggests adjustments, and preserves entered criteria. A failed save shows what went wrong and offers retry without losing context.

**Incorrect:** “Something went wrong” with no explanation, no retry, and cleared user input.

### 5.7 Moderation and Status States

**Correct:** A realtor sees that a listing is pending review, what that means for visibility, and what happens next. Tone is factual and professional.

**Incorrect:** A listing silently fails to appear with no status, or a consumer sees internal moderation language that creates confusion or false confidence.

### 5.8 Calm Under Load

**Correct:** While content loads, the user sees stable structure and honest progress. The interface does not jump, flash, or shift in ways that feel unstable.

**Incorrect:** Blank screens, layout collapse, or aggressive loading theatrics that increase anxiety.

---

## 6. Common Mistakes

| Mistake | Experience harm |
|--------|------------------|
| Designing for desktop first | Mobile comprehension fails where most users live |
| Treating all facts as equally important | Hierarchy collapses; cognitive load rises |
| Repeating price, city, or status for visual filler | Violates One Source of Truth; wastes time |
| Multiple primary buttons per screen | Hesitation; abandoned contact |
| Contact before comprehension | Low-quality leads; trust erosion |
| Urgency language on rentals | Calm model broken; feels manipulative |
| Inconsistent status words across surfaces | Predictability and consistency broken |
| Empty states with no next step | Dead end; user abandonment |
| Error messages without recovery path | Confidence destroyed |
| Over-confirming low-stakes actions | Time disrespect; annoyance |
| Under-confirming irreversible actions | Error not prevented |
| Hiding human identity until late | Human-centered model fails |
| Novel interaction for common tasks | Learning burden without justification |
| Conversion metrics driving dark patterns | Ethical conversion violated |
| Loading treated as engineering-only | Perceived quality and trust suffer |

---

## 7. Future Scalability

### 7.1 New Surfaces and Roles

As Rento adds surfaces, each must inherit these experience principles before receiving unique treatment. Role-specific complexity stays within role boundaries — consumer paths do not absorb realtor or admin complexity.

### 7.2 Marketplace Growth

More listings, cities, and filters increase discovery complexity. Principles of hierarchy, progressive disclosure, and cognitive load reduction become more critical — not less. Search and filter experiences must scale without turning the home experience into a control panel.

### 7.3 Saved Properties and Return Visits

Favorites, saved searches, and return sessions depend on predictability and consistency. Users who return after days or weeks must reorient instantly. Experience principles protect re-entry clarity.

### 7.4 Assisted and Automated Features

AI-assisted search, descriptions, or recommendations must remain editable, disclosable, and human-accountable (see Chapter 53). Automation must not bypass trust-first interaction or ethical conversion.

### 7.5 Monetization and Prominence

Paid placement and premium realtor features must remain legible to users without corrupting hierarchy or trust. Experience principles apply equally to organic and promoted content.

### 7.6 Performance at Scale

As media and data volume grow, perceived performance becomes part of experience quality (see Chapter 20). Slowness and layout instability violate calm interaction and user confidence.

### 7.7 Principle Stability

Experience principles change less frequently than patterns. Amendments require Design Director approval and demonstrated failure of Chapter 1 or current principles to address a new category of harm.

---

## 8. Design Director Review

**Chapter:** 2 — Experience Principles  
**Section:** I — Foundation  
**Review type:** Initial standard adoption

### 8.1 Approval Statement

This chapter is approved as the operational experience contract for Rento. It translates Chapter 1 into reviewable interaction standards. All surfaces, flows, and states must comply before visual polish is considered sufficient.

### 8.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Parent authority; this chapter operationalizes it |
| Chapter 4 — Domain Constraints | Immutable rules that bound experience options |
| Chapter 12 — Marketplace Experience | Applies these principles to renter discovery flows |
| Chapter 13 — Information Hierarchy | Extends §2.6 and §3.2 into structural rules |
| Chapter 15 — Conversion & Contact Design | Extends §2.13 and §3.8 |
| Chapter 17 — States & Feedback | Extends §2.14, §2.15, and §3.9 |
| Chapter 19 — Trust Signals | Extends §2.1, §2.8, and §3.5 |
| Chapter 20 — Performance Experience | Extends calm and confidence under load |
| Chapter 60 — Product Review Checklist | Enforces compliance at ship gate |

### 8.3 Review Criteria for Future Amendments

Any proposed change must answer:

1. What experience failure does the current principle not prevent?
2. Can the issue be solved in a downstream chapter without elevating to principle?
3. Does the change preserve trust-first, calm, and mobile-first intent?
4. Will the principle remain valid across roles, markets, and product phases?

Amendments without council agreement are deferred.

### 8.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on principle changes |
| Head of Product Design | Coherence with Chapter 1 and pattern chapters |
| Senior UX Designer | Flow-level compliance and review quality |
| Mobile UX Architect | Mobile-first fidelity of all principles |
| Content Design Lead | Plain language, hierarchy, and recovery copy alignment |

### 8.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new experience work immediately. Existing flows align during scheduled improvement cycles.

### 8.6 Design Director Closing Note

Product Philosophy tells us what Rento believes. Experience Principles tell us how belief feels in the hand. Users will not quote our principles — they will feel them as confidence or doubt, calm or noise, respect or waste. This chapter exists so those feelings are designed intentionally, reviewed consistently, and preserved as the product grows.

---

**End of Chapter 2**


---

## Chapter 3 — Brand Experience & Visual Identity

**Section:** II — Brand Experience  
**Status:** APPROVED
**Audience:** Product Design, Brand, UX, Content Design, Marketing, Leadership, Reviewers  
**Authority:** Subordinate to Chapter 1 (Product Philosophy) and Chapter 2 (Experience Principles); foundational to Section V (Visual Language) and Section VI (Design System).

---

## 1. Purpose

This chapter defines how Rento should be **emotionally perceived** and **visually recognized** across the entire product. It establishes personality, emotional tone, visual character, and recognition principles before typography scales, color specifications, layout grids, or interface patterns are introduced.

Brand experience is not marketing decoration applied to a product. It is the **felt quality** of every visual and verbal encounter: browsing a listing, reading a status message, viewing a realtor’s identity, or waiting for content to appear. Users form judgment about trustworthiness, professionalism, and relevance long before they read detailed copy.

This chapter explains not only how Rento should look, but **why** it should look that way. Visual choices must trace back to product philosophy: calm, trust, clarity, human presence, and respect for the seriousness of long-term rental decisions.

Where Chapter 1 defines belief and Chapter 2 defines interaction quality, Chapter 3 defines **character** — the emotional and visual soul of the product as experienced over years of use.

---

## 2. Core Principles

### 2.1 Recognizable Without the Logo

Rento must be identifiable through **consistent visual behavior** — spacing, tone, card language, photography treatment, trust presentation, and calm hierarchy — not through repeated logo placement alone. A user who has used Rento once should recognize it again without seeing the mark. Recognition is earned through discipline across surfaces, not through branding overload.

### 2.2 Consistency Over Decoration

Visual identity is built through **repeated, restrained choices** applied everywhere: same hierarchy logic, same trust language, same proportional calm, same respect for content. Decoration that does not strengthen trust, clarity, or comprehension is out of scope. Ornament is not a substitute for system.

### 2.3 Photography Is Product

Listing photography is not an accessory to the interface — it **is** the product for many users. Imagery carries truth, aspiration, and risk simultaneously. Visual identity must honor photography as primary evidence of a home, not as wallpaper behind interface chrome.

### 2.4 Premium Through Discipline

Premium quality on Rento comes from **restraint, alignment, and care** — not from luxury signifiers, gold accents, excessive shadow, or visual theatrics. Discipline signals professionalism. Excess signals insecurity in a trust-sensitive category.

### 2.5 Every Element Must Earn Its Place

Every visual element — color, image, badge, line, animation, emphasis — must strengthen **trust, clarity, or comprehension**. If it does none of these, it does not belong. Visual identity is intentional subtraction as much as addition.

### 2.6 White Space Is Active

Whitespace is not empty leftover area. It is an **active design element** that separates importance, reduces anxiety, and signals respect for the user’s attention. Crowded interfaces feel cheap and hurried; generous space feels confident and European in sensibility.

### 2.7 Communication Over Entertainment

Motion, color, and imagery exist to **support communication** — orientation, status, hierarchy, human presence — not to entertain. The product must never feel like it is performing for attention. Calm is the default emotional mode.

### 2.8 Trust Through Visual Restraint

Restraint communicates honesty. Loud visual treatment suggests selling; quiet visual treatment suggests presenting. In long-term rentals, users trust presentation that does not shout. Visual restraint is a trust strategy, not a aesthetic preference alone.

### 2.9 Human-Centered Identity

Rento’s visual identity must make **people legible** — realtors, renters, the relationship between them — without turning the product into a social network. Human warmth lives inside professional boundaries. Faces, names, and agency identity appear with purpose, not as decoration.

### 2.10 Authenticity

Visual identity must never imply what the product cannot substantiate. Verification, freshness, availability, and professional status must look **exactly as trustworthy as they are** — neither inflated nor hidden. Authenticity is the alignment of appearance and fact.

### 2.11 Confidence Through Design

Visual confidence is the user’s sense that the product knows what it is doing. Confidence comes from stable hierarchy, honest states, consistent patterns, and absence of visual panic — not from boldness for its own sake.

### 2.12 Content Over Decoration

**Content leads; chrome follows.** Listings, prices, locations, people, and status are the hero. Interface exists to frame content, not compete with it. When content and decoration conflict, content wins.

### 2.13 European Product Aesthetics

Rento aligns with European expectations: privacy-aware presentation, professional understatement, quality without ostentation, respect for the user’s intelligence. Visual identity avoids the aggressive promotional aesthetic common in other regions and categories.

### 2.14 Long-Term Visual Evolution

Identity must evolve slowly and deliberately. Trends pass; trust compounds. Visual changes that chase fashion erode recognition. Evolution favors refinement over reinvention.

---

## 3. Brand Experience Standards

Standards below define minimum brand and visual character quality. Detailed visual specifications appear in later chapters.

### 3.1 Brand Personality Standards

Rento’s personality is:

| Dimension | Expression |
|-----------|------------|
| **Calm** | Unhurried, clear, never alarmist without cause |
| **Professional** | Serious about housing, respectful of all roles |
| **Warm** | Human without casual excess |
| **Direct** | Plain language, honest states, no euphemism for material facts |
| **Modern** | Contemporary clarity, not nostalgic clutter |
| **Confident** | Quiet assurance, not loud self-promotion |

Personality is consistent across renter and realtor experiences. Realtor surfaces may be more operational in tone; they remain calm, professional, and human.

### 3.2 Emotional Goals

Every major surface should leave the user with one or more of these emotional outcomes:

- **Oriented** — I know where I am and what this is.
- **Confident** — I can trust what I am seeing enough to continue.
- **Respected** — My time and intelligence are valued.
- **Calm** — I am not being pressured or manipulated.
- **Connected** — I see the human professional behind the listing when it matters.

Surfaces that produce anxiety, confusion, cheapness, or skepticism fail brand experience standards.

### 3.3 Calmness Standards

- Visual emphasis is proportional to factual importance.
- Urgency styling is reserved for genuine user-relevant urgency.
- Success, error, and status feedback are clear but not theatrical.
- Density increases only when task complexity requires it — never by default.

### 3.4 Trust Presentation Standards

- Trust indicators use consistent visual language with stable meaning everywhere.
- Trust styling must not mimic marketing promotion.
- Absence of trust must be as visually honest as presence of trust.
- Trust and identity information obey One Source of Truth (Chapter 1).

### 3.5 Premium Simplicity Standards

- Premium is expressed through proportion, alignment, spacing, and typographic discipline.
- Luxury signifiers, ornamental frames, and gratuitous depth are prohibited in core flows.
- Simplicity is sophisticated, not bare — bare without care reads as unfinished, not premium.

### 3.6 Visual Recognition Standards

- Consumer and realtor surfaces feel like one product family.
- Repeated patterns create recognition: card proportion, corner language, trust pill treatment, navigation behavior, photography framing.
- Third-party or white-label aesthetics must not appear within core product surfaces.

### 3.7 Photography Philosophy Standards

- Listing photography is shown at highest practical fidelity within performance constraints.
- Cropping preserves spatial honesty; misleading crop is a trust violation.
- Placeholder and missing-image states are neutral and professional — never comic or chaotic.
- Photography on cards and detail views receives visual priority over secondary chrome.
- User-generated listing imagery is never treated as lower class than interface design.

### 3.8 Realtor Identity Standards

- Realtor identity is visually distinct from listing content but subordinate to listing facts in renter evaluation flows.
- Avatar, name, and agency presentation are consistent wherever identity appears.
- Identity presentation reinforces accountability — real person, real professional role.
- Identity must not be anonymous, cartoonish, or interchangeable across listings.

### 3.9 Marketplace Identity Standards

- The marketplace feels like a **curated housing environment**, not a bulletin board.
- Browse experiences emphasize quality of listings over quantity signaling.
- Empty and sparse states maintain marketplace dignity — the product does not look abandoned when inventory is low.

### 3.10 Motion, Color, and Imagery Coordination

- Motion supports transitions and feedback — not delight for its own sake (see Section VIII).
- Color carries semantic meaning — status, trust, warning — not decoration (see Chapter 24).
- Imagery and color never combine to imply false urgency or false luxury.

### 3.11 Verbal-Visual Alignment

- Visual tone and written tone must match. Playful copy on a calm surface — or severe copy on a warm surface — breaks brand experience.
- Verbal identity standards are defined in Chapter 8; this chapter requires alignment, not duplication.

---

## 4. Decision Rules

Apply these rules when evaluating visual character, imagery, brand expression, and emotional tone.

### Rule 1 — Philosophical Alignment

If a visual proposal conflicts with Chapters 1 or 2, reject or revise.

### Rule 2 — Recognition Test

Ask: *Would a returning user recognize this as Rento without seeing the logo?*  
If not, align with established character before introducing novelty.

### Rule 3 — Trust Delta

Ask: *Does this visual treatment increase honest trust or merely increase attention?*  
If attention without trust, reject.

### Rule 4 — Earning Test

Ask: *Does this element strengthen trust, clarity, or comprehension?*  
If none, remove.

### Rule 5 — Restraint Test

Ask: *Does this make the product feel calmer or louder?*  
If louder without factual justification, soften.

### Rule 6 — Content Primacy

Ask: *Does content remain visually dominant?*  
If chrome, badge, or decoration competes with listing facts, revise hierarchy.

### Rule 7 — Authenticity Test

Ask: *Does this visual imply a claim the product cannot support?*  
If yes, reject.

### Rule 8 — Human Legibility

Ask: *Is human identity presented with professionalism and purpose?*  
If anonymous, gimmicky, or theatrical, revise.

### Rule 9 — Photography Respect

Ask: *Does this treatment honor the listing imagery as primary evidence?*  
If imagery is cropped, dimmed, or framed to mislead, reject.

### Rule 10 — European Sensibility

Ask: *Would this feel appropriate for a serious European housing product?*  
If it feels like impulse commerce or attention media, reject.

### Rule 11 — Evolution Discipline

Ask: *Is this change refinement of identity or reinvention for trend?*  
Reinvention requires council approval.

### Rule 12 — Escalation

When in conflict: **authenticity** over impressiveness, **restraint** over expression, **content** over decoration, **consistency** over novelty.

---

## 5. Correct and Incorrect Examples

Examples describe brand and visual experience — not implementation.

### 5.1 Marketplace Browse

**Correct:** A calm feed where listing photography leads, price and location are immediately legible, and trust signals are subtle but clear. The experience feels like a serious housing product in Bucharest or Cluj — modern, unhurried, credible.

**Incorrect:** A feed that feels like a promotional catalog — flashing emphasis, competing badges, prices hidden for engagement, photography treated as background texture.

### 5.2 Listing Detail Character

**Correct:** A detail experience where the home is the hero, facts are honest and hierarchically clear, and the realtor appears as a professional human presence at the appropriate moment. White space separates importance; nothing shouts.

**Incorrect:** A detail view cluttered with duplicate facts, decorative trust language, and contact calls that visually dominate before the user understands the listing.

### 5.3 Realtor Identity

**Correct:** A renter sees a realtor’s name and face presented consistently — professional, approachable, accountable. Agency identity appears when relevant without crowding listing facts.

**Incorrect:** Generic “Agent” labels, inconsistent avatar treatment, or identity so prominent it feels like influencer marketing rather than housing professionalism.

### 5.4 Photography Presentation

**Correct:** Listing photos are large, honest, and central to evaluation. Missing photos use a neutral, respectful placeholder. Fullscreen viewing feels like inspecting a home — not viewing an ad.

**Incorrect:** Heavy overlays that obscure property condition, misleading hero crops, or comic placeholders that undermine seriousness.

### 5.5 Trust Visual Language

**Correct:** Verification and freshness use calm, factual styling shared across cards and detail. Users understand status without reading marketing copy.

**Incorrect:** Gold shields, exaggerated seals, or multiple competing trust badges that sound impressive but mean little.

### 5.6 Empty and Sparse States

**Correct:** Low inventory or no search results still feel like a maintained marketplace — clear explanation, constructive tone, visual dignity preserved.

**Incorrect:** Broken-looking emptiness, blame-oriented copy, or visual chaos that suggests the product is unfinished.

### 5.7 Realtor Workspace Character

**Correct:** Operational surfaces feel like the same brand family — professional blue identity, calm hierarchy, human greeting — without consumer marketing theatrics.

**Incorrect:** A realtor dashboard that looks like a different company: harsh admin aesthetic, metric carnival, or consumer decorative language applied to B2B tasks.

### 5.8 Motion and Emphasis

**Correct:** Subtle transitions orient the user; emphasis highlights price change, error, or success briefly and clearly.

**Incorrect:** Bouncy animations, celebratory confetti, or color flashes that treat rental search like casual entertainment.

---

## 6. Common Mistakes

| Mistake | Brand harm |
|--------|------------|
| Relying on logo repetition for identity | Weak recognition; visual noise |
| Adding decorative elements without purpose | Cheapens premium positioning |
| Treating photography as secondary | Breaks marketplace truth |
| Using luxury visual clichés | Wrong category signal; trust suspicion |
| Inconsistent trust badge styling | Recognition and meaning erode |
| Loud color for non-critical information | Breaks calm model |
| Hiding identity or over-celebrating identity | Human-centered balance lost |
| Chasing UI trends annually | Long-term recognition destroyed |
| Playful brand voice on serious states | Emotional dissonance |
| Dense layouts to “show more features” | Anxiety; time disrespect |
| Stock-photo aesthetic for people | Inauthentic; trust erosion |
| Different visual personality per role | Product feels fragmented |
| Motion as entertainment | Undermines professional tone |
| White space treated as waste | Crowding; loss of confidence |
| Visual claims stronger than product truth | Authenticity violation |

---

## 7. Future Scalability

### 7.1 Geographic and Cultural Expansion

Visual identity must adapt to local languages and cultural nuance without abandoning calm, restraint, and European professionalism. Localization affects expression — not core character.

### 7.2 New Roles and Surfaces

Agency accounts, admin tools, and partner surfaces inherit marketplace identity. Internal tools may reduce decoration further but must not feel like a different brand.

### 7.3 Monetization and Promoted Listings

Paid prominence must remain visually honest. Promotion may increase visibility; it must not mimic organic trust signals or mislead about verification or availability.

### 7.4 Media Richness

More photos, video, virtual tours, and maps increase visual complexity. Photography philosophy scales by keeping **housing truth** primary — richer media must not become spectacle.

### 7.5 AI-Generated Content

AI-assisted descriptions and imagery require disclosure and visual honesty (see Chapter 53). Generated content must not be styled identically to verified human-submitted facts without distinction where material.

### 7.6 Brand Extensions

Marketing sites, email, notifications, and print inherit this chapter’s personality and restraint. Fragmented brand experience outside the product weakens recognition inside it.

### 7.7 Identity Governance

Visual identity changes are versioned and rare. Design Council approves character-level shifts. Tactical refinement happens within downstream visual language chapters without altering this chapter’s principles.

### 7.8 Long-Term Visual Evolution

Evolution favors:

- Sharper hierarchy discipline
- Clearer trust language
- More consistent photography treatment
- Refined spacing and typographic calm

Evolution does not favor:

- Periodic full visual rebrands without product reason
- Trend-driven color or motion shifts
- Decoration increases to “refresh” the product

---

## 8. Design Director Review

**Chapter:** 3 — Brand Experience & Visual Identity  
**Section:** II — Brand Experience  
**Review type:** Initial standard adoption

### 8.1 Approval Statement

This chapter is approved as the brand and visual character contract for Rento. It governs emotional perception and recognition before detailed visual specifications. No surface may ship with visual character that conflicts with this chapter.

### 8.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Parent authority on trust, calm, human presence |
| Chapter 2 — Experience Principles | Parent authority on interaction quality and hierarchy |
| Chapter 6 — Brand Purpose & Positioning | Extends market positioning where split in later editions |
| Chapter 7 — Brand Personality & Voice | Extends verbal personality; must align with §3.1 |
| Chapter 8 — Verbal Identity | Terminology and tone; must align with §3.11 |
| Chapter 21 — Visual Philosophy | Operationalizes visual restraint and premium simplicity |
| Chapter 25 — Photography & Imagery | Extends §3.7 into detailed standards |
| Chapter 19 — Trust Signals | Visual application of trust presentation |
| Chapter 43 — Motion Philosophy | Extends §2.7 and §3.10 |
| Chapter 60 — Product Review Checklist | Enforces brand character at ship gate |

### 8.3 Review Criteria for Future Amendments

Any proposed change must answer:

1. What recognition, trust, or emotional harm does the current standard fail to prevent?
2. Can the issue be addressed in Visual Language chapters without changing character principles?
3. Does the change preserve calm, authenticity, and European professionalism?
4. Will the principle remain valid across markets, media types, and product phases?

Amendments without council agreement are deferred.

### 8.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on brand character changes |
| Brand Designer | Coherence of personality, recognition, and authenticity |
| Head of Product Design | Alignment across consumer and realtor surfaces |
| Senior Product Designer | Application in review and pattern approval |
| Content Design Lead | Verbal-visual alignment |

### 8.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new visual and brand experience work immediately. Existing surfaces align during scheduled improvement cycles.

### 8.6 Design Director Closing Note

Users do not experience Rento as a logo, a color, or a typeface. They experience it as a feeling: *Can I trust this? Does this respect me? Does this look like a place where serious people find serious homes?* This chapter exists so that feeling is designed with the same rigor as any feature — and preserved as Rento grows across years, cities, and screens.

---

**End of Chapter 3**


---

## Chapter 4 — Layout & Information Architecture

**Section:** III — Structure  
**Status:** APPROVED
**Audience:** Product Design, UX, Content Design, Product Management, Reviewers  
**Authority:** Subordinate to Chapters 1–3; foundational to Information Hierarchy (Chapter 13), Marketplace Experience (Chapter 12), and Layout & Spatial System (Chapter 22).

---

## 1. Purpose

This chapter defines the **structural rules** that govern every screen in Rento before typography, color, or interface patterns are specified. It establishes how information is organized, prioritized, grouped, and progressively revealed across the product.

Layout is not decoration. Layout is **comprehension architecture**. The same facts arranged differently produce different understanding, different confidence, and different outcomes. In a long-term rental marketplace, structural mistakes — buried price, duplicated status, competing actions, dead-end states — erode trust as surely as dishonest content.

The goal of this chapter is to ensure that every screen follows the same architectural thinking, regardless of feature, role, platform, or future growth. A realtor workspace, a listing detail view, and an empty search result must all obey the same hierarchy logic even when their content differs.

Where Chapter 1 defines belief, Chapter 2 defines interaction quality, and Chapter 3 defines brand character, Chapter 4 defines **structure** — the invisible skeleton that holds the product together.

---

## 2. Core Principles

### 2.1 Content Before Decoration

Structure exists to present listing facts, human identity, status, and actions — not to frame them as marketing. The layout serves content; content does not serve the layout.

### 2.2 Layout Serves Comprehension

Every structural choice must answer: *Does this help the user understand faster?* If a grouping, separation, or sequence does not improve comprehension, it is removed or revised.

### 2.3 Layout Reduces Cognitive Load

Structure minimizes what the user must hold in memory at once. Related information is grouped; unrelated information is separated; deferrable information is deferred. Load reduction is a layout responsibility, not only a copy responsibility.

### 2.4 One Primary Purpose Per Screen

Every screen has **one primary purpose** — browse listings, evaluate a property, contact a realtor, manage a portfolio, complete a profile. Secondary purposes may exist but must not compete for structural dominance.

### 2.5 One Dominant Action Per Screen

Each screen presents **one dominant action** aligned with its primary purpose. Other actions remain available in subordinate positions. Structural hierarchy enforces action hierarchy.

### 2.6 Hierarchy Is Structural, Not Decorative

Primary, secondary, and supporting information differ by **position, grouping, and sequence** — not by ornament alone. Visual treatment in later chapters must follow structural hierarchy defined here.

### 2.7 One Source of Truth in Structure

The same fact must not occupy multiple competing structural zones on one screen. Structure reinforces a single authoritative placement for price, status, identity, and verification.

### 2.8 Progressive Disclosure by Default

Screens reveal information in layers — essentials first, depth on demand. Structure must not collapse all layers into one undifferentiated block.

### 2.9 No Dead Ends in Structure

Every state — populated, empty, loading, error, success, pending — must reserve structural space for orientation and a next step. Layout must never leave the user facing a wall.

### 2.10 Mobile Structure First

Structural order is designed for vertical, one-handed, interrupted mobile reading first. Wider viewports may add horizontal breathing room; they must not reorder hierarchy.

---

## 3. Layout Standards

### 3.1 Layout Philosophy Standards

- The primary subject of any screen is identifiable from structure alone — before color or type weight are applied.
- Decorative framing never reduces space allocated to material facts.
- Structural density increases only when task complexity requires it.
- Parallel blocks of equal visual weight are reserved for genuinely parallel choices — not for facts of unequal importance.

### 3.2 Screen Purpose Standards

| Screen type | Primary structural purpose |
|-------------|---------------------------|
| Discovery / browse | Compare listings quickly |
| Listing detail | Evaluate one home with confidence |
| Saved items | Revisit and act on prior interest |
| Contact | Initiate inquiry deliberately |
| Realtor workspace | Understand portfolio status and next task |
| Profile / settings | Complete or maintain identity data |
| System states | Preserve orientation and recovery |

If a proposed screen cannot name its primary purpose in one sentence, its structure is undefined.

### 3.3 Action Placement Standards

- The dominant action appears after the user has enough structural context to act with confidence — not before.
- Destructive or irreversible actions are structurally separated from primary paths.
- Contact actions on listing surfaces appear in a dedicated structural zone — not scattered across the screen.

### 3.4 Vertical Rhythm Standards

- Screens follow a consistent top-to-bottom reading order aligned with decision sequence.
- Major sections are separated by deliberate spatial breaks — not by arbitrary dividers.
- Rhythm is steady: no chaotic alternation of dense and empty zones without purpose.

### 3.5 Horizontal Containment Standards

- Content width supports comfortable mobile reading; line length and block width are constrained for scannability.
- Full-bleed media (listing photography) is an intentional exception with defined transition into reading zones.

### 3.6 Overlay and Sheet Standards

- Sheets and overlays present **one structural task** — filters, actions, confirmation — without duplicating the full hierarchy of the screen beneath.
- When a sheet is open, the underlying screen’s primary purpose is suspended; the sheet’s purpose becomes primary.

### 3.7 Scroll Behavior Standards

- Essential decision information appears in the first viewport where possible — not buried beneath repeated or decorative blocks.
- Long screens remain scannable through section headers and consistent grouping.
- Sticky or persistent zones are reserved for orientation or primary action — not for secondary metadata.

---

## 4. Information Architecture Standards

### 4.1 Information Hierarchy Levels

All information on Rento belongs to one of five levels. Structure must reflect these levels without mixing them arbitrarily.

| Level | Definition | Structural treatment |
|-------|------------|---------------------|
| **Primary** | Required to understand what this screen is about and whether to continue | Top of screen, largest structural zone, first in scroll order |
| **Secondary** | Required to make an informed decision or complete the screen’s primary task | Follows primary, clearly grouped, still above fold when possible on mobile |
| **Supporting** | Helpful context that improves confidence but is not required for initial decision | Below secondary, own section, progressive disclosure |
| **Contextual** | Information relevant only in specific states or roles | Appears when context is active — not by default on every screen |
| **Metadata** | System, administrative, or low-frequency facts | Lowest priority, smallest structural presence, never competes with primary facts |

**Relational rules:**

- Primary never competes with metadata for position.
- Secondary may not duplicate primary in a separate zone.
- Supporting must not be structurally elevated to mask weak primary hierarchy.
- Contextual information must not appear as primary on the wrong screen or in the wrong state.

### 4.2 Primary Information on Rento

On consumer listing surfaces, primary information typically includes:

- What the listing is (title or equivalent identifier)
- Where it is (city / location level appropriate to product)
- What it costs (price for the stated rental period)
- Whether it is worth continued attention (availability and trust enough to proceed)

Exact composition may vary by screen type; hierarchy level rules do not.

### 4.3 Secondary Information

Secondary information typically includes:

- Room count and key physical attributes
- Realtor identity summary
- Verification and freshness signals
- Primary action affordances once context is established

### 4.4 Supporting Information

Supporting information typically includes:

- Full description
- Additional attributes
- Policy or process explanation
- Secondary actions (share, save, report)

### 4.5 Visual Grouping Standards

**Logical grouping**  
Facts that answer the same user question live in the same structural group. Price and rental period belong together; identity and contact belong together; status and moderation belong together.

**Proximity**  
Related items are placed nearer than unrelated items. Proximity communicates relationship more reliably than labels alone.

**Section separation**  
Distinct user questions receive distinct sections with clear boundaries — spatial separation, not excessive divider decoration.

**Visual rhythm**  
Sections repeat a predictable internal order where possible: label context → core fact → action. Rhythm speeds re-scanning across screens.

**Spacing as hierarchy**  
More important groups receive more surrounding space. Tight packing signals equal importance; generous separation signals primary zones.

**Relationship between blocks**  
- Parent block contains the decision context.  
- Child blocks elaborate — they do not repeat the parent.  
- Sibling blocks are parallel in importance only when the user’s decision is genuinely parallel.

### 4.6 Progressive Disclosure Layers

Information must appear in four structural layers. Layers may be on one scrollable screen but must remain **legible as layers** — not merged into noise.

| Layer | User mode | Typical content | Structural rule |
|-------|-----------|-----------------|-----------------|
| **First glance** | 3-second scan | Identity of listing, price, location, trust enough to continue | Highest on screen; no competing blocks |
| **Decision layer** | 10-second understanding | Key attributes, realtor identity, verification, save/contact readiness | Follows first glance; one coherent group |
| **Detailed layer** | Reading | Description, expanded facts, comparison detail | Own section; clearly subordinate |
| **Advanced layer** | Edge need | Administrative detail, edge-case status, infrequent actions | Lowest position; hidden or collapsed when appropriate |

Users may skip layers. Structure must allow **entry at any layer** without forcing re-reading of duplicated facts above.

### 4.7 Scanning Behavior Standards

**3-second scan**  
User answers: *What is this? Is it relevant?*  
Structure must surface primary level information without scroll on typical mobile viewports where achievable.

**10-second understanding**  
User answers: *Do I want to keep considering this?*  
Decision layer must be reachable within one natural scroll gesture from first glance.

**Detailed reading**  
User answers: *What are the specifics?*  
Detailed layer is available without structural penalty — no traps, no artificial gates.

### 4.8 Mobile Reading Pattern Standards

**Thumb reach**  
Dominant actions sit within comfortable one-handed reach on primary mobile sizes. Repeated actions used during scroll may use persistent lower zones — sparingly.

**Vertical rhythm**  
Reading flows top to bottom in decision order. Side-by-side competition is minimized on narrow widths.

**One-handed use**  
Critical paths do not require two-handed precision for comprehension or primary action.

**Scrolling behavior**  
Scroll is predictable: content does not shift identity while loading; sections do not reorder without user cause.

**Interruption recovery**  
When the user returns after interruption, structure re-orients instantly: screen purpose, primary subject, and position in flow are obvious without re-learning.

### 4.9 Marketplace Information Architecture

Structural rules for core marketplace surfaces:

**Property listings (browse / feed)**  
- One listing = one scannable unit.  
- Photography leads; primary facts follow in fixed order.  
- Trust signal is present but subordinate to price and location.  
- Identity summary is optional at card level — never required to understand the listing unit.

**Property details**  
- Media zone → reading zone transition is explicit.  
- First glance layer lives at top of reading zone.  
- Price, location, and trust share one decision group.  
- Realtor identity sits in decision layer — not buried below all description.  
- Contact actions live in a dedicated zone after decision context.  
- Supporting description follows; metadata and safety actions last.

**Realtor identity**  
- Name and role appear before contact initiation structurally.  
- Identity appears once per decision path — not duplicated in competing zones.  
- Agency identity is supporting or contextual — not primary over listing facts on renter surfaces.

**Pricing**  
- Price is primary on all evaluation surfaces.  
- Price appears once in the decision group.  
- Period clarity (e.g., monthly) is part of the price group — not a distant footnote.

**Verification**  
- Verification is secondary in decision layer — visible, factual, not decorative repetition.  
- Verification does not occupy the same structural slot as unrelated “status” facts.

**Contact actions**  
- Grouped together.  
- Subordinate to comprehension on first glance.  
- Dominant among actions in the contact zone — not on the entire screen until appropriate.

### 4.10 Empty State Standards

Empty states preserve **orientation**:

- User knows which screen they are on and why it is empty.  
- Explanation is brief and factual.  
- One dominant next step is structurally obvious.  
- Empty states use the same section rhythm as populated states — the screen does not look broken or abandoned.

### 4.11 Error State Standards

Error layout reduces stress:

- Error message appears in context — near the failed task, not disconnected.  
- Explanation precedes recovery action.  
- User input and progress are preserved structurally where possible.  
- Tone space is calm; error zones are not visually chaotic.  
- Recovery action is the dominant action in the error zone.

### 4.12 Loading State Standards

Loading preserves **perceived continuity**:

- Structure appears before full content — skeleton or placeholder follows final layout shape.  
- Primary zones reserve space; layout does not jump when content arrives.  
- Loading does not remove orientation (screen title, purpose, back path).  
- Placeholders are neutral — not comic, not empty void.  
- Perceived performance is part of layout ethics (see Chapter 20).

### 4.13 Decision Hierarchy for Layout

Every layout decision must answer, in order:

1. **What is the user trying to accomplish on this screen?**  
2. **What information is required first to pursue that goal?**  
3. **What can wait until after the first decision point?**  
4. **What should never compete for attention with primary information?**

If question 4 includes price, identity, verification, or primary action on a listing screen, the layout fails review.

---

## 5. Decision Rules

### Rule 1 — Foundation Alignment

Reject structures that conflict with Chapters 1–3.

### Rule 2 — Purpose Clarity

Ask: *Can the primary purpose of this screen be stated in one sentence, and does structure reflect it?*  
If not, redefine before detailing.

### Rule 3 — Hierarchy Integrity

Ask: *Is every piece of information assigned to primary, secondary, supporting, contextual, or metadata — and placed accordingly?*  
If levels are mixed, regroup.

### Rule 4 — Duplication Test

Ask: *Does the same fact appear in more than one structural zone?*  
If yes, consolidate unless layers are genuinely different in purpose.

### Rule 5 — Layer Discipline

Ask: *Are first glance, decision, detailed, and advanced layers distinguishable?*  
If collapsed into one block, apply progressive disclosure.

### Rule 6 — Scan Test

Ask: *What is visible in 3 seconds and 10 seconds on a phone?*  
If primary or decision layers fail, reorder.

### Rule 7 — Action Sequencing

Ask: *Does dominant action appear after sufficient structural context?*  
If contact or publish dominates before comprehension, reorder.

### Rule 8 — Group Logic

Ask: *Does proximity reflect real user questions?*  
If unrelated facts share a group for visual balance, split.

### Rule 9 — State Completeness

Ask: *Do empty, error, and loading states preserve purpose and next step?*  
If not, incomplete.

### Rule 10 — Mobile First

Ask: *Does order change meaning on a narrow viewport?*  
If desktop logic dictates order, revise.

### Rule 11 — Escalation

**Comprehension** over density. **Primary purpose** over feature exposure. **Single truth** over repetition. **Calm recovery** over dramatic error emphasis.

---

## 6. Correct and Incorrect Examples

### 6.1 Listing Detail Hierarchy

**Correct:** Photography → first glance (title, price, location, trust) → decision group (attributes, realtor) → description → contact zone → metadata actions.

**Incorrect:** Photography → description → duplicate fact grid → price buried → contact above identity → verification repeated three times.

### 6.2 Browse Card Structure

**Correct:** Image → price and location prominent → minimal trust → optional identity footnote. One scannable unit.

**Incorrect:** Image → badge cluster → title → hidden price → multiple trust stickers → identity competing with price.

### 6.3 Progressive Disclosure

**Correct:** User sees enough to decide whether to keep reading in one scroll. Description and advanced detail follow without repeating price or city.

**Incorrect:** All facts in equal-weight tiles across the first screenful.

### 6.4 Realtor Workspace Dashboard

**Correct:** Greeting and status → one next-action block → portfolio list with clear filters. Purpose: operate portfolio.

**Incorrect:** Greeting → duplicate stat grids → three competing “next step” blocks → list pushed below fold.

### 6.5 Empty Search Results

**Correct:** “No listings match these filters” → preserved filter context → dominant action: adjust filters or change city.

**Incorrect:** Blank area, generic message, no next step, user unsure if product failed.

### 6.6 Error During Save

**Correct:** Error inline near saved item context → explanation → retry dominant → data preserved.

**Incorrect:** Full-screen alert, context lost, user must navigate back and start over.

### 6.7 Loading Listing Feed

**Correct:** Card-shaped placeholders mirror final structure; screen title and filter entry remain stable.

**Incorrect:** Blank white screen, then content pops in rearranging layout.

### 6.8 Filter Sheet

**Correct:** Sheet contains filter task only — inputs, clear, apply — with one dominant apply action.

**Incorrect:** Sheet duplicates browse hierarchy, competes with navigation beneath, obscures primary apply path.

---

## 7. Common Mistakes

| Mistake | Structural harm |
|--------|------------------|
| Equal-weight grids for unequal facts | Hierarchy collapse |
| Price below fold on detail | Primary failure |
| Duplicate city, rooms, status zones | One Source of Truth violated |
| Contact before identity | Trust and comprehension failure |
| Multiple “next step” blocks | Purpose dilution |
| Metadata styled as primary | Wrong decision signals |
| Empty state with no action | Dead end |
| Error without recovery zone | Confidence loss |
| Loading without shape continuity | Perceived instability |
| Desktop multi-column first | Mobile scan failure |
| Sections divided by decoration only | Weak grouping logic |
| Sticky bars for secondary facts | Attention theft from primary |
| Feature lists above listing facts | Cognitive load |
| Advanced info in first glance | Progressive disclosure failure |
| Inconsistent card internal order | Recognition and scan speed suffer |

---

## 8. Future Scalability

### 8.1 Feature Growth

New attributes, filters, and roles attach to existing hierarchy levels — they do not create new primary zones by default. Structure scales by **layer discipline**, not by adding tiles.

### 8.2 Marketplace Density

More listings and cities increase browse complexity. IA scales through consistent card structure and filter sheets — not through denser cards or more badges per card.

### 8.3 Multi-Role Surfaces

Realtor and admin surfaces may carry more contextual and metadata levels. Consumer surfaces remain stricter: fewer levels visible, stronger progressive disclosure.

### 8.4 Rich Media

Video, tours, and map contexts extend the media zone — they do not reorder price and trust below promotional media.

### 8.5 Personalization

Recommended or promoted listings obey the same structural hierarchy as organic listings. Promotion may not reassign primary zones.

### 8.6 Internationalization

Longer copy and translated labels must not break grouping logic. Structure anticipates text expansion without reordering hierarchy.

### 8.7 Standard Stability

Layout and IA principles change rarely. Pattern-level adjustments belong in downstream chapters. Structural amendments require Design Director approval.

---

## 9. Design Director Review

**Chapter:** 4 — Layout & Information Architecture  
**Section:** III — Structure  
**Review type:** Initial standard adoption

### 9.1 Approval Statement

This chapter is approved as the structural contract for all Rento screens. No surface may ship with hierarchy, grouping, or state structure that conflicts with it. Visual and pattern chapters must implement this architecture — not replace it.

### 9.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Parent authority on One Source of Truth, No Dead Ends, Progressive Disclosure |
| Chapter 2 — Experience Principles | Parent authority on hierarchy, cognitive load, primary action |
| Chapter 3 — Brand Experience & Visual Identity | Content before decoration; spacing as confidence |
| Chapter 12 — Marketplace Experience | Applies §4.9 to renter flows |
| Chapter 13 — Information Hierarchy | Extends §4.1–§4.6 in detail |
| Chapter 17 — States & Feedback | Extends §4.10–§4.12 |
| Chapter 20 — Performance Experience | Extends §4.12 perceived continuity |
| Chapter 22 — Layout & Spatial System | Spatial expression of this chapter |
| Chapter 60 — Product Review Checklist | Structural compliance at ship gate |

### 9.3 Review Criteria for Future Amendments

Any proposed change must answer:

1. What comprehension or hierarchy failure is not prevented today?  
2. Can the issue be solved in a downstream chapter without changing structural principles?  
3. Does the change preserve mobile-first scan behavior and progressive disclosure?  
4. Will the rule remain valid as features and markets grow?

Amendments without council agreement are deferred.

### 9.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on structural principle changes |
| Mobile UX Architect | Mobile scan, thumb reach, and scroll fidelity |
| Senior UX Designer | Flow-level IA and state structure |
| Head of Product Design | Cross-surface consistency |
| Content Design Lead | Alignment of copy blocks to hierarchy levels |

### 9.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new screens and structural changes immediately. Existing surfaces align during scheduled improvement cycles.

### 9.6 Design Director Closing Note

Users never name information architecture — they feel it as clarity or confusion, speed or friction, trust or doubt. Structure is the most invisible and most powerful part of the product. When structure is right, every future feature has a place. When structure is wrong, every new feature becomes noise. This chapter exists so Rento grows in content without growing in chaos.

---

**End of Chapter 4**


---

## Chapter 5 — Product Design Decision Framework

**Section:** IV — Governance  
**Status:** APPROVED
**Audience:** Product Design, UX, Product Management, Engineering Leadership, Brand, Reviewers  
**Authority:** Equal to foundational chapters for **resolution of conflicts**; subordinate to Chapters 1 and 4 when facts are clear; invoked whenever teams disagree or exceptions are requested.

---

## 1. Purpose

This chapter creates the **official decision-making framework** that governs every future product and design decision in Rento. It defines how conflicts between business goals, user experience, visual design, trust, performance, accessibility, and scalability must be resolved.

Rento will be built and maintained by different people across many years. Without a shared framework, each team optimizes locally: conversion in one surface, density in another, novelty in a third. The product fragments. Users feel inconsistency. Trust erodes in ways no single feature owner intended.

This chapter ensures that **different designers and product teams make consistent decisions even years apart**. It is not a substitute for Chapters 1–4 — it is how those chapters are **applied under pressure**, when trade-offs are real and deadlines are present.

Every design review, product proposal, exception request, and ship decision must be traceable to this framework. When two valid arguments conflict, this chapter decides the winner.

---

## 2. Core Principles

### 2.1 Decisions Serve Users First, Business Through Trust

Business goals are legitimate. They are achieved sustainably only when user trust, clarity, and confidence are preserved. Decisions that sacrifice trust for short-term gain are rejected unless explicitly waived through Exception Policy (§4.4).

### 2.2 The Standard Is the Default

Approved principles, hierarchy rules, and patterns are the default outcome of any review. Deviation requires justification — not the reverse.

### 2.3 Disagreement Is Resolved by Hierarchy, Not by Seniority Alone

Role authority matters for final sign-off, but **substantive conflict** is resolved by the decision hierarchy (§3), not by who speaks loudest or who owns the deadline.

### 2.4 Simplicity Is a Decision Outcome, Not a Preference

Simpler solutions are preferred when they meet the same user and business need. Complexity must justify itself against cognitive load, maintenance, and long-term clarity.

### 2.5 Documentation Preserves Institutional Memory

Decisions that bend or extend the standard must be recorded so future teams understand **why** — not only **what** changed.

### 2.6 Reversibility Matters

Reversible decisions may move faster. Irreversible or high-visibility decisions require higher review rigor. Exception Policy (§4.4) applies stricter gates to decisions that are hard to undo.

### 2.7 Five-Year Test

Every significant decision must remain defensible in five years: still correct for users, still aligned with identity, still maintainable without embarrassment if public.

### 2.8 Review Is Part of the Work

Shipping without framework review is not efficiency — it is deferred cost. Product Review Checklist (Chapter 60) operationalizes this chapter at ship gate.

---

## 3. Decision Hierarchy

When principles or goals conflict, resolve them in **strict priority order**. Higher levels override lower levels. Do not balance them as equals.

### Level 1 — Immutable Domain Truth

Facts and rules the product must not misrepresent: listing ownership, moderation, contact sourcing, public visibility, honest status, authorized identity. No business goal overrides this level. See Chapter 4 (Domain Constraints) in full standard; philosophy in Chapter 1.

If a proposal violates domain truth, **stop** — do not proceed to lower-level trade-offs.

### Level 2 — Trust and Safety

User confidence in listings, realtors, and the platform. Includes honest verification presentation, contact transparency, authentic imagery, ethical conversion, and safety-related reporting paths.

**Trust vs conversion:** Trust wins. Informed contact beats manipulated contact.

### Level 3 — Clarity and Comprehension

Users understand where they are, what they see, and what happens next. Includes information hierarchy, progressive disclosure, One Source of Truth, and No Dead Ends.

**Clarity vs feature density:** Clarity wins. Features that cannot be understood are not shipped in core paths — they are deferred, simplified, or moved to advanced layers.

### Level 4 — Experience Quality

Calm interaction, respect for user time, predictable behavior, recovery from error, mobile-first comprehension. See Chapter 2.

**Human experience vs system convenience:** Human experience wins in consumer paths. Internal convenience may shape realtor or admin tools only where it does not export confusion to renters.

### Level 5 — Consistency and Recognition

Stable patterns, terminology, and structural behavior across surfaces and time. See Chapters 3 and 4.

**Consistency vs innovation:** Consistency wins unless innovation solves a validated user problem that existing patterns cannot solve. Innovation then becomes a candidate for standard update — not a one-off exception.

### Level 6 — Accessibility and Inclusion

Perceivable, operable, understandable, robust experience for all users. Accessibility conflicts with visual novelty are resolved in favor of accessibility in consumer paths.

### Level 7 — Performance Experience

Perceived speed, continuity during load, and stability of layout. Performance supports trust and calm — it is not traded for decorative richness.

**Speed vs completeness:** Speed of comprehension wins over completeness in first glance layers. Completeness belongs in detailed layers — not as initial overload.

### Level 8 — Scalability and Maintainability

Decisions that remain correct as listings, cities, roles, and features multiply. One-off patterns that do not scale are deprioritized.

**Simplicity vs flexibility:** Simplicity wins in consumer paths. Flexibility is earned in operational surfaces with explicit justification.

### Level 9 — Commercial and Growth Goals

Monetization, conversion optimization, acquisition, and revenue features — **legitimate only within the bounds of Levels 1–8**.

**Marketplace integrity vs commercial pressure:** Marketplace integrity wins. Commercial features must be disclosed where material and must not misrepresent organic trust or availability.

### Level 10 — Aesthetic Preference

Visual taste, trend, or personal style — lowest priority. Aesthetic choices must already satisfy Levels 1–9.

---

## 4. Conflict Resolution Framework

### 4.1 Standard Resolution Process

For any proposed change, apply in order:

1. **Classify** — Feature, pattern change, copy change, exception, or emergency fix.  
2. **Locate** — Which chapters and hierarchy levels apply.  
3. **Question** — Complete Design Review Questions (§4.2).  
4. **Test** — Apply Product Decision Rules (§4.3).  
5. **Resolve** — Use Decision Hierarchy (§3) for remaining conflict.  
6. **Record** — Document outcome; invoke Exception Policy (§4.4) if standard is bent.  
7. **Review** — Design Director or delegate sign-off per severity.

### 4.2 Design Review Questions

Every proposed change must answer the following. Incomplete answers defer approval.

| Question | Intent |
|----------|--------|
| **What user problem is being solved?** | Prevents solution-first design |
| **For whom and in what context?** | Prevents wrong-role optimization |
| **Is this necessary?** | Prevents feature accretion |
| **Can the interface become simpler?** | Forces subtraction first |
| **Does this improve trust — or only engagement?** | Separates trust from manipulation |
| **Does it increase cognitive load?** | Load must be justified |
| **Does it duplicate information or actions?** | One Source of Truth check |
| **Does it introduce inconsistency?** | Pattern reuse check |
| **Does it preserve mobile-first comprehension?** | Structural and scan check |
| **What is the primary purpose and dominant action of the affected screen?** | Chapter 4 alignment |
| **What happens in empty, error, and loading states?** | No Dead Ends check |
| **Does it remain honest if screenshot and shared publicly?** | Authenticity check |
| **Will this still be correct in five years?** | Long-term test |
| **What is the rollback or reversal plan if wrong?** | Reversibility check |

Optional for major changes:

- What is explicitly **not** being built, and why?  
- What metric indicates success without harming trust proxies (complaints, report rate, contact quality)?

### 4.3 Product Decision Rules

These rules apply during review after questions are answered. They are applied in order when shaping the solution.

| Rule | Meaning |
|------|---------|
| **Remove before adding** | Subtract confusion, duplication, and noise before introducing new elements |
| **Reuse before creating** | Existing patterns and terminology win unless proven inadequate |
| **Clarify before decorating** | Hierarchy and copy must work before visual emphasis |
| **Simplify before optimizing** | Do not A/B optimize a flow that should not exist |
| **Verify before shipping** | Manual and checklist review against Chapters 1–4 and Chapter 60 — not assumption |

Additional operational rules:

- **Defer before diluting** — If a feature overcrowds core hierarchy, move it to a later layer or phase.  
- **Disclose before promoting** — Paid or privileged placement must not mimic organic trust.  
- **Prevent before recovering** — Fix error-prone structure before writing recovery copy.

### 4.4 Exception Policy

Breaking an existing design rule is **discouraged but sometimes necessary**. Exceptions are intentional, time-bound, and documented — not silent drift.

**When exceptions may be considered**

- Validated user need that current standard cannot meet without harm  
- Regulatory or legal requirement  
- Emergency remediation of trust or safety harm  
- Time-limited experiment with defined success and rollback criteria  

**When exceptions are not acceptable**

- Deadline pressure alone  
- Competitive imitation without user validation  
- Personal aesthetic preference  
- Local optimization that harms global consistency without migration plan  
- Violations of Level 1 (domain truth) or Level 2 (trust) — these are not exceptions; they are rejections  

**Required justification**

Every exception request must include:

1. Rule or chapter being excepted  
2. User or business problem  
3. Why hierarchy resolution still favors the exception  
4. Alternatives considered and why rejected  
5. Scope (single screen, flow, or product area)  
6. Duration (time-bound or until standard is updated)  
7. Success criteria and harm indicators  
8. Rollback trigger and owner  

**Review process**

| Exception severity | Reviewer |
|--------------------|----------|
| Minor (cosmetic, single surface, low risk) | Senior Product Designer + Product owner |
| Moderate (pattern deviation, multi-surface) | Head of Product Design |
| Major (trust, hierarchy, identity, monetization) | Design Director + Head of Product |
| Critical (domain or safety adjacent) | Design Council; no ship without explicit approval |

**Documentation requirements**

- Exception logged in design decision register with date, owner, and expiry  
- Linked to relevant chapter sections  
- Noted in Product Review Checklist sign-off when shipping  
- If exception persists beyond expiry, it must become **standard change** or be removed  

**Rollback expectations**

- Every exception has a named owner and rollback plan  
- If harm indicators worsen (trust complaints, report increase, support themes), rollback is default — not renegotiation  
- Experiments that fail rollback within agreed window; learnings documented  

### 4.5 Escalation Path

1. Designer and PM resolve using this framework.  
2. Unresolved → Head of Product Design mediation.  
3. Still unresolved → Design Director ruling documented as precedent.  
4. Precedent may inform future standard updates — not permanent shadow policy.

---

## 5. Decision Rules

Quick-reference rules for reviewers. Full hierarchy in §3.

### Rule 1 — Domain Stop Rule

If it misrepresents listing truth, identity, or status → **reject**.

### Rule 2 — Trust Default

Unresolved trust vs conversion → **trust**.

### Rule 3 — Clarity Default

Unresolved clarity vs density → **clarity**.

### Rule 4 — Consistency Default

Unresolved consistency vs novelty → **consistency** unless novelty case is documented and approved as exception or standard update.

### Rule 5 — Subtraction Default

If simplification meets the user need → **simplify**; do not add.

### Rule 6 — Layer Default

If information overload → **move to lower disclosure layer**; do not shrink type and add tiles.

### Rule 7 — Consumer Path Protection

Consumer paths receive stricter hierarchy than internal tools. Never export admin or growth complexity to renters.

### Rule 8 — Commercial Disclosure

If commercial influence is material to user judgment → **disclose** or reject.

### Rule 9 — Five-Year Defensibility

If not defensible in five years → **reject or redesign**.

### Rule 10 — Exception Discipline

If breaking a rule → **exception process**; no informal drift.

### Rule 11 — Checklist Gate

If Chapter 60 checklist incomplete → **do not ship**.

---

## 6. Correct and Incorrect Examples

### 6.1 Trust vs Conversion

**Correct:** Listing detail shows price, location, and realtor identity before contact actions are structurally dominant. Contact rate may be lower initially; lead quality and trust are higher.

**Incorrect:** Hiding price until contact to increase inquiry volume. Conversion metric rises; trust and lead quality fall.

### 6.2 Clarity vs Feature Density

**Correct:** A new filter is added inside the filter sheet layer — browse cards remain scannable. Power users gain capability without browse overload.

**Incorrect:** Six new badges per card to expose every new attribute. Feed becomes unreadable.

### 6.3 Consistency vs Innovation

**Correct:** A validated need for a new trust indicator is designed using existing trust visual language, then proposed as standard update in Chapter 19.

**Incorrect:** One team invents a gold “premium verified” badge for a single campaign without shared meaning.

### 6.4 Simplicity vs Flexibility

**Correct:** Realtor profile uses grouped sections with required fields clear. Advanced fields live in supporting sections.

**Incorrect:** Exposing every profile field at once because “realtors might need them someday.”

### 6.5 Marketplace Integrity vs Commercial Pressure

**Correct:** Promoted listings are labeled where material; organic and promoted listings share honest status presentation.

**Incorrect:** Paid listings display stronger verification styling than organic listings without factual basis.

### 6.6 Human Experience vs System Convenience

**Correct:** Moderation status shown to realtor in plain language with next step.

**Incorrect:** Internal status codes surfaced to realtors because they match the admin database.

### 6.7 Exception Handled Properly

**Correct:** Time-bound experiment to test sticky contact bar on detail documented with trust monitoring, expiry date, and rollback owner. Approved as moderate exception.

**Incorrect:** Team ships sticky bar permanently because “conversion went up” with no trust monitoring or standard update.

### 6.8 Review Questions Applied

**Correct:** Proposal doc answers user problem, simplification considered, five-year test passed, empty/error states defined. Approved in one review.

**Incorrect:** Proposal says “add feature X because competitor has it.” Review deferred pending problem definition.

---

## 7. Common Mistakes

| Mistake | Why it fails the framework |
|--------|----------------------------|
| Optimizing metrics without trust indicators | Violates Level 2 and §4.3 |
| Treating exceptions as permanent workarounds | Institutional drift |
| Resolving conflict by deadline | Not a hierarchy level |
| Skipping review for “small” UI changes | Small inconsistencies compound |
| Adding before removing | Violates Product Decision Rules |
| Local pattern invention without reuse attempt | Violates consistency |
| Shipping without empty/error/load decision | Violates Chapter 4 |
| Conflating engagement with comprehension | Wrong success metric |
| Senior override without documented precedent | Breaks cross-year consistency |
| Five-year test never asked | Short-term thinking baked in |
| Commercial goals cited without disclosure plan | Violates Level 9 bounds |
| Accessibility deferred to “later phase” on consumer paths | Violates Level 6 |
| Failed experiment not rolled back | Exception policy violated |
| Decision register not maintained | Future teams repeat mistakes |

---

## 8. Future Scalability

### 8.1 Growing Teams

As design, product, and engineering headcount grows, this framework becomes **more** necessary — not less. New hires onboard through Chapters 1–5 before pattern chapters. Decision register becomes shared history.

### 8.2 New Markets and Languages

Localization and regional launch decisions still obey hierarchy. Cultural adaptation is not an exception to trust or clarity — it is expression within them.

### 8.3 New Roles and Surfaces

Each new role (agency, partner, insurer, etc.) receives IA and review discipline before visual polish. Framework prevents role sprawl from redefining consumer truth.

### 8.4 Monetization Maturity

As revenue models grow, Level 9 decisions increase in frequency. Framework ensures they remain subordinate to integrity and trust — with disclosure as non-negotiable.

### 8.5 AI and Automation

AI-assisted features require heightened review: trust, disclosure, editability, human accountability (Chapter 53). Default hierarchy: trust and clarity before automation convenience.

### 8.6 Standard Updates vs Exceptions

Persistent exceptions must converge into **standard revisions** or be removed. A product with fifty exceptions has no standard. Design Council periodically audits exception register.

### 8.7 Long-Term Evolution Without Identity Loss

Rento evolves by:

- Refining hierarchy discipline  
- Extending patterns with documented need  
- Retiring anti-patterns (Chapter 59)  
- Versioning the standard with changelog (Appendix I)  

Rento does not evolve by:

- Periodic ungoverned visual reinvention  
- Metric-driven trust trade-offs without rollback  
- Unchecked exception accumulation  

Identity is preserved when **decision hierarchy** is preserved — not when pixels stay frozen.

---

## 9. Design Director Review

**Chapter:** 5 — Product Design Decision Framework  
**Section:** IV — Governance  
**Review type:** Initial standard adoption

### 9.1 Approval Statement

This chapter is approved as the **binding resolution framework** for all product and design decisions in Rento. When teams disagree, this chapter governs. When exceptions occur, this chapter governs. No ship decision is complete without traceability to this framework and Chapter 60.

### 9.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Levels 1–2 authority source |
| Chapter 2 — Experience Principles | Level 4 authority source |
| Chapter 3 — Brand Experience & Visual Identity | Level 5 aesthetic bounds |
| Chapter 4 — Layout & Information Architecture | Level 3 structural authority |
| Chapter 4 (Domain Constraints) — full standard numbering | Level 1 immutable rules |
| Chapter 53 — AI Assisted Experience | Heightened review under §4.4 |
| Chapter 59 — Anti-Patterns Registry | Negative precedents |
| Chapter 60 — Product Review Checklist | Operationalizes §4.2 and §5 |

### 9.3 Review Criteria for Future Amendments

Amendments to this chapter require Design Council approval because they change how all other chapters are enforced. Proposals must demonstrate:

1. Repeated decision deadlock under current hierarchy  
2. New category of conflict not resolvable by existing levels  
3. No reduction in trust or clarity priority  
4. Migration plan for existing exceptions and precedents  

### 9.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final authority on framework interpretation and major exceptions |
| Head of Product | Commercial decisions within hierarchy bounds |
| Head of Product Design | Review quality and precedent consistency |
| Senior UX Designer | Facilitation of review questions and documentation |
| Product Management | Problem definition and success criteria integrity |

### 9.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Mandatory for all design and product reviews immediately. Existing in-flight work should be checked against this framework before ship.

### 9.6 Design Director Closing Note

Standards mean little if teams abandon them under pressure. This chapter exists so pressure has a defined outlet: hierarchy, questions, rules, exceptions, documentation — not silent compromise. Rento will be built by many hands over many years. Consistency will not come from shared taste. It will come from **shared decisions**. This framework is how those decisions are made.

---

**End of Chapter 5**


---

## Chapter 6 — Typography & Reading System

**Section:** V — Visual Language  
**Status:** APPROVED
**Audience:** Product Design, UX, Content Design, Brand, Reviewers  
**Authority:** Subordinate to Chapters 1–5; foundational to Color System (Chapter 24) and Layout & Spatial System (Chapter 22); governs all written communication in the product.

---

## 1. Purpose

This chapter defines the complete **reading and typography system** for Rento.

Typography is not treated as visual decoration. Typography is the **primary communication system** of the product. Before color, imagery, or structure receive attention, users read — or attempt to read — words. If type fails, the product fails, regardless of how refined the surrounding experience appears.

The purpose of this chapter is to establish how information is **read, scanned, prioritized, and understood** across every Rento surface. It defines not what font files are installed, but **what each text role means**, how roles relate, and how reading behavior changes by context.

The typography system must support:

- **Trust** — honest, stable, professional presentation of facts  
- **Clarity** — immediate comprehension of hierarchy  
- **Calmness** — no shouting, no theatrical emphasis  
- **Readability** — comfortable mobile reading over time  
- **Mobile-first usage** — glance, scan, and read on phones  
- **Long-term scalability** — valid across redesigns, languages, and features  

This chapter remains valid regardless of future visual refresh. Roles, responsibilities, and reading logic outlive individual style choices.

---

## 2. Core Principles

### 2.1 Typography Communicates First

Type carries meaning before ornament. Weight, size, and role tell the user what matters. Typography must communicate hierarchy and intent without relying on color or decoration to do the work.

### 2.2 Reading Speed Over Visual Novelty

Users are searching for homes, not admiring type trends. Reading speed and scan efficiency take priority over distinctive or expressive letterforms in core product surfaces.

### 2.3 Calm Type Builds Trust

Aggressive emphasis, excessive contrast between styles, and shouty promotional typography undermine trust in a housing marketplace. Calm, consistent typography signals professionalism and honesty.

### 2.4 Fewer Styles, Stronger Hierarchy

Every additional text style dilutes hierarchy. The system favors a **limited set of roles** applied with discipline. Differentiation comes from role and position — not from proliferating sizes and weights.

### 2.5 Typography Should Disappear

When typography is working, users read **content** — not type. The system succeeds when price, location, and description are understood without awareness of stylistic craft.

### 2.6 Type Serves Structure

Typography follows layout and information architecture (Chapter 4). Type must not compensate for poor grouping, duplication, or wrong sequence.

### 2.7 One Role, One Responsibility

Each text role has a single job. Mixing roles — using caption styling for primary facts, or display styling for metadata — breaks comprehension and trust.

### 2.8 Numbers Are First-Class Information

Prices, counts, dates, and statistics are decision-critical. They receive dedicated typographic treatment — not generic body styling.

### 2.9 Multilingual by Design

Typography principles anticipate Romanian, English, Ukrainian, and future languages without reordering hierarchy or breaking rhythm.

### 2.10 Accessible Reading Is Premium

Readable size, sufficient contrast, comfortable line length, and clear labels are quality markers — not optional enhancements.

---

## 3. Typography Philosophy

### 3.1 Typography Before Decoration

Decoration may support hierarchy; it may not replace it. If a fact requires a badge, icon, and three type styles to be noticed, hierarchy has already failed.

### 3.2 Reading as the Primary Task

On most Rento surfaces, the user’s task is to **read and decide**. Typography optimizes for that task — not for brand spectacle in the body of the product.

### 3.3 Trust Through Restraint

Restrained typography communicates that the product is not trying to sell aggressively. Listing facts are presented; they are not marketed through type.

### 3.4 Discipline Over Expression

Brand personality (Chapter 3) expresses through calm confidence in type — not through decorative display treatments in functional zones.

### 3.5 Content Before Typography

Words matter more than their styling. Clear, honest copy in the correct role beats clever copy in the wrong role.

### 3.6 Stability Over Trend

Type trends date quickly. Role discipline and reading logic endure. Major typographic shifts require Design Council approval and migration planning.

### 3.7 Alignment with Experience Principles

Typography must support progressive disclosure, One Source of Truth, respect for user time, and ethical conversion (Chapters 1–2). Repeated facts in multiple type treatments violate both structure and type philosophy.

---

## 4. Reading System

Users do not read every screen the same way. Typography must support **distinct reading modes** aligned with Chapter 4 scanning standards.

### 4.1 First Glance

**User intent:** *What is this? Is it relevant?*  
**Duration:** Approximately 3 seconds.  
**Typographic support:**

- Primary information uses the strongest appropriate roles — not the largest possible styles.  
- One dominant subject per screen (listing title, screen title, or equivalent).  
- Price and location readable without squinting or scrolling on typical mobile viewports.  
- Minimal role variety in the first viewport — glance requires simplicity.

### 4.2 Quick Scan

**User intent:** *What are my options? What differs between items?*  
**Duration:** Seconds per item in a list.  
**Typographic support:**

- Consistent role order within repeated units (cards, rows).  
- Predictable placement: price, location, and title in the same structural positions.  
- Scan-friendly line breaks; titles truncate gracefully without ambiguous ellipsis.  
- Supporting and metadata roles visually subordinate — never competing during scan.

### 4.3 Decision Reading

**User intent:** *Should I keep considering this? Can I trust it?*  
**Duration:** Approximately 10 seconds to one natural scroll.  
**Typographic support:**

- Decision-layer facts grouped typographically: price group, identity group, trust group.  
- Verification and status use dedicated status roles — factual, not promotional.  
- Realtor name and role clear before contact language intensifies.  
- One primary action label reads as dominant among action roles.

### 4.4 Detailed Reading

**User intent:** *What are the specifics?*  
**Duration:** Extended, intentional reading.  
**Typographic support:**

- Body role optimized for continuous reading: comfortable line length, adequate line spacing, left-aligned.  
- Section titles mark transitions without shouting.  
- Long descriptions broken into readable paragraphs — not dense blocks.  
- Supporting information visually separated from body without duplicate headlines.

### 4.5 Reference Reading

**User intent:** *I need to find a specific fact again.*  
**Duration:** Return visits, comparison, sharing with partner.  
**Typographic support:**

- Labels and values paired consistently (label role + primary or metadata value).  
- Reference facts (dates, reference numbers, status history) use metadata or caption roles — findable, not dominant.  
- Stable terminology and role placement across sessions — re-finding facts does not require re-learning.

### 4.6 Reading Mode Transitions

Typography must signal mode transitions through **section structure and role change** — not through decorative breaks. A user moving from scan to decision to detailed reading should feel a natural deepening of information, not a visual reset.

---

## 5. Type Hierarchy

This section defines **text roles by responsibility** — not by implementation values. Each role has one job. Roles map to information hierarchy levels in Chapter 4.

### 5.1 Role Overview

| Role | Hierarchy level | Primary responsibility |
|------|-----------------|----------------------|
| Display | Primary (rare) | Brand or campaign moments only — not listing facts |
| Page Title | Primary | Names the screen’s purpose |
| Section Title | Secondary | Names a major content section |
| Card Title | Primary / Secondary | Names a listing or unit in browse context |
| Primary Information | Primary | Material facts required for relevance |
| Supporting Information | Supporting | Context that improves confidence |
| Body | Supporting / Detailed | Continuous descriptive text |
| Caption | Metadata / Supporting | Short explanatory text subordinate to a fact |
| Metadata | Metadata | Low-frequency, administrative, or system facts |
| Labels | Supporting | Names a field or group — never the fact itself |
| Status | Secondary / Contextual | Factual state communication |
| Actions | Contextual | Names what will happen when user acts |
| Numbers | Primary / Secondary | Quantities and counts for decision |
| Prices | Primary | Rental cost — highest numeric priority |
| Dates | Secondary / Metadata | Time context — freshness, availability, verification |
| Verification | Secondary | Trust facts — restrained, factual |
| Error Messages | Contextual | What went wrong and what it means |
| Success Messages | Contextual | Brief confirmation — not celebration |
| Empty States | Contextual | Why empty and what to do |
| Loading Text | Contextual | Optional brief orientation — structure carries load |
| Legal Text | Metadata | Compliance, terms — readable but subordinate |

### 5.2 Role Definitions

**Display**  
Reserved for rare brand-forward moments outside core evaluation flows. Must not carry listing price, verification, or contact. Overuse destroys hierarchy.

**Page Title**  
Answers: *Where am I?* One per screen. Stable, calm, not competing with listing primary facts on detail surfaces.

**Section Title**  
Answers: *What is this block about?* Introduces description, contact, filters, portfolio sections. Not used for individual facts.

**Card Title**  
Answers: *Which listing is this?* Scannable, concise, consistent across feed. May truncate; must remain recognizable.

**Primary Information**  
Answers: *What must I know to continue?* Price, city-level location, room count when decision-critical, availability when material. Highest reading priority after page context.

**Supporting Information**  
Answers: *What helps me decide?* Secondary attributes, agency name, extended location detail. Subordinate to primary information.

**Body**  
Answers: *What is the full story?* Listing descriptions, explanations, profile bios. Optimized for reading — not scanning.

**Caption**  
Answers: *What does the fact above mean?* Short, subordinate. Example: helper under a field, explanation under a price period.

**Metadata**  
Answers: *What system fact exists if I need it?* Updated timestamps, internal references, low-priority counts. Never styled as primary.

**Labels**  
Answers: *What is this field called?* Always paired with a value. Labels are not substitutes for values. Required for forms and reference pairs.

**Status**  
Answers: *What state is this in?* Pending, available, reserved, incomplete profile. Factual tone — not marketing.

**Actions**  
Answers: *What happens if I tap this?* Verbs clear and honest. One dominant action label per context. No clever ambiguity.

**Numbers (general)**  
Quantities and counts for comparison: rooms, results count, portfolio statistics. Distinct from prose — scannable, aligned, stable width where possible for comparison.

**Prices**  
The most important numbers in the product. Always primary in evaluation context. Period clarity (e.g., monthly) is part of price communication — caption or inline supporting role, not distant footnote.

**Dates**  
Freshness, verification timing, availability windows. Honest and specific. Must not imply false precision or false urgency.

**Verification**  
Dedicated factual role for trust statements. Consistent wording and treatment everywhere. Must not sound promotional.

**Error Messages**  
Plain language. States problem and implication. Calm — not alarmist unless safety requires emphasis.

**Success Messages**  
Brief confirmation. Acknowledges completion without theatrical praise.

**Empty States**  
Title role for situation + supporting role for next step. Helpful, dignified — not blaming.

**Loading Text**  
Minimal. Prefer structural skeleton over verbose loading copy. When used, orient — do not entertain.

**Legal Text**  
Readable minimum. Subordinate. Never blocks comprehension of primary task without legal necessity.

### 5.3 Numeric Typography

Numbers deserve different treatment than paragraphs because users **compare** numbers — they do not read them as prose.

**Principles:**

- Numbers align visually when compared in lists or tables.  
- Prices dominate numeric hierarchy on consumer evaluation surfaces.  
- Room counts and area appear scannable near price or in consistent card positions — not buried in prose.  
- Phone numbers and contact digits are legible, grouped for reading, and copy-friendly in presentation.  
- Verification dates state factually how fresh trust is — not as vague marketing.  
- Statistics in realtor workspace are operational — readable, not dashboard theatre.  
- Numbers are never stretched, condensed, or styled for decorative effect.  
- Leading zeros, currency, and unit clarity follow locale standards when localization is active — hierarchy roles remain stable across locales.

### 5.4 Marketplace Typography

**Property titles** — Card title or primary identification role. Honest, specific, scannable. Not keyword-stuffed visually through excessive weight.

**Property descriptions** — Body role. Paragraph discipline. No fake urgency in copy styling.

**Pricing** — Price role primary in decision layer. Never duplicated in competing styles on the same screen.

**Realtor names** — Primary or supporting in identity group — always human-readable, never anonymous system labels in consumer paths.

**Verification labels** — Verification role. Shared vocabulary across cards and detail. Factual.

**Search results** — Consistent card internal type order. Result count uses metadata or supporting role — not display.

**Filters** — Labels on inputs; applied filter summary uses supporting or status role. Filter sheet title uses section or page title appropriately.

**Contact information** — Labels + values; phone and messaging actions use action role. Contact blocks subordinate to comprehension on first glance.

**Admin information** — May use denser metadata and status roles. Must not leak admin typographic density into consumer surfaces.

---

## 5.5 Multilingual Principles

Rento is Romania-first with European expansion. Typography must support **Romanian, English, Ukrainian**, and future languages without breaking hierarchy.

**Line length**  
Body text maintains comfortable reading length regardless of language. Structure constrains width — not assumption about English word length.

**Expansion**  
Translated strings often expand. Labels, buttons, and titles must tolerate longer text without truncation that hides meaning. Hierarchy roles stay fixed; containers adapt structurally.

**Translation stability**  
Each role maps to translatable string types. Status and verification terms use controlled glossary (Chapter 8). Typography does not change role by language.

**Reading rhythm**  
Section order and role sequence remain constant across locales. Rhythm comes from structure and role — not from language-specific styling.

**Character sets**  
Type selection (defined outside this chapter) must fully support diacritics and Cyrillic where Ukrainian is offered — without fallback to smaller or lighter rendering that weakens hierarchy.

---

## 6. Decision Rules

### Rule 1 — Foundation Alignment

Type proposals conflicting with Chapters 1–5 are rejected.

### Rule 2 — Never Compensate for Layout

Ask: *Is type being used to fix grouping or order problems?*  
If yes, fix structure first.

### Rule 3 — Reduce Styles Before Size

Ask: *Can hierarchy improve by removing a role instead of shrinking text?*  
Prefer role consolidation over smaller type.

### Rule 4 — Hierarchy Before Emphasis

Ask: *Is emphasis (weight, scale) applied only after correct role assignment?*  
Emphasis without role is decoration.

### Rule 5 — Consistency Before Originality

Ask: *Does this fact use the same role as the same fact elsewhere?*  
If not, justify or reject.

### Rule 6 — Content Before Typography

Ask: *Is the copy honest and plain in the correct role?*  
Rewrite copy before adding type tricks.

### Rule 7 — Price Integrity

Ask: *Is price in the price role, once, in the decision layer?*  
If duplicated or buried, reject.

### Rule 8 — Scan Test

Ask: *Can a user scan three listings and compare price and location typographically?*  
If not, align card roles.

### Rule 9 — Read Test

Ask: *Can a user read a full description comfortably on a phone?*  
If not, fix body role and paragraph structure.

### Rule 10 — Multilingual Test

Ask: *Does longest supported translation break role or hierarchy?*  
If yes, adjust structure — not role discipline.

### Rule 11 — Escalation

**Clarity** over expression. **Role discipline** over new styles. **Calm** over emphasis. **Content** over decoration.

---

## 7. Correct and Incorrect Examples

### 7.1 Listing Card Scan

**Correct:** Title, price, and city use consistent roles in fixed order across all cards. User compares listings in seconds.

**Incorrect:** Each card uses different emphasis patterns; price sometimes bold, sometimes small; scan fails.

### 7.2 Listing Detail Price

**Correct:** Price in primary numeric role at decision layer; monthly period in caption or supporting pairing; no duplicate price elsewhere in competing style.

**Incorrect:** Price appears in header, chip, grid, and footer — all styled as important.

### 7.3 Verification Label

**Correct:** “Verified within the last week” in verification role — same vocabulary as cards, calm and factual.

**Incorrect:** “PREMIUM VERIFIED!!!” in display weight with promotional tone.

### 7.4 Description Reading

**Correct:** Body role, left-aligned, paragraph breaks, section title introduces block.

**Incorrect:** Center-aligned dense block, same size as metadata, unreadable on mobile.

### 7.5 Filter Sheet

**Correct:** Page/section title, field labels, primary action label clear. Applied filters summarized in supporting role.

**Incorrect:** Unlabeled fields, black promotional button copy as only hierarchy signal.

### 7.6 Error State

**Correct:** Error message in error role — what happened, what to do. Calm headline + recovery action label.

**Incorrect:** Technical jargon in display weight; user intimidated.

### 7.7 Empty Search

**Correct:** Empty state title explains situation; supporting text offers next step; action role on dominant button.

**Incorrect:** Single word “Nothing” in large type with no guidance.

### 7.8 Realtor Workspace Stats

**Correct:** Statistics scannable; labels and numbers paired; operational tone.

**Incorrect:** Vanity metrics in display sizes; portfolio list pushed below decorative numbers.

### 7.9 Multilingual Button

**Correct:** Action role accommodates longer Romanian or Ukrainian string without truncation of meaning.

**Incorrect:** Fixed narrow button crops translation; user unsure what will happen.

---

## 8. Common Mistakes

| Mistake | Harm |
|--------|------|
| Too many font weights | Weak hierarchy; visual noise |
| Too many font sizes | Scan failure; amateur appearance |
| Long unreadable paragraphs | Decision delay; abandonment |
| Center-aligned body text | Poor mobile readability |
| Decorative typography on facts | Trust erosion; distraction |
| Typography replacing layout hierarchy | Duplication; confusion |
| Display role on prices or status | Shouting; promotional feel |
| Caption role for primary facts | Undermining material information |
| Metadata styled as primary | Wrong decision signals |
| Inconsistent verification wording | Recognition and trust loss |
| Bolding random words in body | Breaks reading flow |
| All caps for non-label text | Aggressive tone; harder reading |
| Truncation hiding price or location | Dishonest compression |
| Loading paragraphs instead of structure | Anxiety; perceived slowness |
| Different type order per card | Scan inconsistency |
| English-only line length assumptions | Localization failure |
| Admin density in consumer surfaces | Calm model broken |

---

## 9. Future Scalability

### 9.1 Future Features

New attributes, filters, and roles attach to **existing text roles** — supporting, metadata, or status — before inventing new styles. Feature growth increases role discipline, not role count.

### 9.2 AI-Assisted Content

AI-generated descriptions and suggestions use the same body and label roles as human content. Disclosure copy uses supporting or metadata role — distinct when material (Chapter 53). Typography does not make AI content look more authoritative than human-verified facts.

### 9.3 Progressive Web and Offline

Reading roles remain stable when content loads progressively. Partial content uses same hierarchy as complete content — no temporary “loading sizes” that reorder importance.

### 9.4 Admin and Operations

Admin surfaces may introduce denser metadata patterns within the same role system. Consumer typography is not diluted to match admin density.

### 9.5 Marketplace Growth

More listings and cities increase scan volume. Card role consistency becomes more valuable — not less. Typography scales through **repetition of roles**, not new emphasis per campaign.

### 9.6 Localization Expansion

Additional languages adopt glossary-controlled status and verification terms. Role map unchanged. Structural tolerance for expansion is designed in Chapter 4; typography inherits it.

### 9.7 Visual Redesign Survival

When visual refresh occurs, **roles and reading modes** in this chapter remain. Implementation of roles may change; responsibilities may not. Redesign proposals must map old surfaces to role compliance before ship.

### 9.8 Standard Evolution

New roles require Design Council approval and demonstration that existing roles cannot serve the need. Role count should grow slowly — if at all.

---

## 10. Design Director Review

**Chapter:** 6 — Typography & Reading System  
**Section:** V — Visual Language  
**Review type:** Initial standard adoption

### 10.1 Approval Statement

This chapter is approved as the **reading and typography contract** for Rento. All written information in the product must comply with defined roles and reading modes. Visual treatment in later chapters implements this system — it does not redefine it.

### 10.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Calm, trust, One Source of Truth |
| Chapter 2 — Experience Principles | Cognitive load, hierarchy, respect for time |
| Chapter 3 — Brand Experience & Visual Identity | Restraint, content before decoration |
| Chapter 4 — Layout & Information Architecture | Structural hierarchy; scan timing |
| Chapter 5 — Product Design Decision Framework | Conflict resolution for type vs density |
| Chapter 8 — Verbal Identity | Glossary alignment for status and verification roles |
| Chapter 13 — Information Hierarchy | Structural expression of type roles |
| Chapter 23 — Typography (implementation) | Visual specification of roles — subordinate to this chapter |
| Chapter 60 — Product Review Checklist | Type role compliance at ship gate |

### 10.3 Review Criteria for Future Amendments

Proposals must answer:

1. What reading or hierarchy failure is not prevented by current roles?  
2. Can an existing role be extended instead of adding a new one?  
3. Does the change preserve calm, trust, and multilingual stability?  
4. Will the role map remain learnable across markets and years?

Amendments without council agreement are deferred.

### 10.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on role system changes |
| Content Design Lead | Copy and role pairing integrity |
| Head of Product Design | Cross-surface consistency |
| Senior Product Designer | Card and detail role compliance |
| Brand Designer | Alignment with brand restraint |

### 10.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new copy presentation and typographic decisions immediately. Existing surfaces align during scheduled improvement cycles.

### 10.6 Design Director Closing Note

Users do not experience typography — they experience **understanding**. When price is instantly found, when verification is believable, when a description is readable on a bus, typography has done its job. This chapter exists so that understanding is designed systematically, not accidentally, and survives every future screen and every future language.

---

**End of Chapter 6**


---

## Chapter 7 — Color Meaning & Semantic Color System

**Section:** V — Visual Language  
**Status:** APPROVED
**Audience:** Product Design, Brand, UX, Content Design, Reviewers  
**Authority:** Subordinate to Chapters 1–6; defines meaning layer that any future palette must implement; pairs with Typography & Reading System (Chapter 6) and Layout & Information Architecture (Chapter 4).

---

## 1. Purpose

This chapter defines the **semantic meaning of color** throughout the Rento product.

It does **not** define a visual palette. It does not specify values, shades, or implementation tokens. It defines **what color is allowed to communicate** — and what it must never communicate alone.

Color is treated as a **language of meaning**, not decoration. In a housing marketplace, color signals trust, status, risk, availability, and action. Misused color creates false confidence, hidden urgency, or decorative noise that erodes the calm professionalism Rento requires.

The objective is to ensure that every future visual design, regardless of brand refresh or redesign, uses color **consistently** to reinforce:

- **Trust** — honest, stable signaling  
- **Comprehension** — hierarchy supported, not replaced  
- **Accessibility** — meaning available beyond hue alone  
- **Decision-making** — clear action and status without manipulation  

This chapter remains valid **independently of specific color values**. A complete visual redesign may change appearance; it may not change semantic roles without Design Council approval.

---

## 2. Core Principles

### 2.1 Meaning Before Aesthetics

Color choices must answer *what does this communicate?* before *does this look good?* Aesthetic preference is the lowest priority in the decision hierarchy (Chapter 5).

### 2.2 Color Supports Hierarchy; It Does Not Create Hierarchy

Information level is established by structure and typography (Chapters 4 and 6). Color may reinforce position — it may not rescue poor layout or duplicate facts.

### 2.3 Never Rely on Color Alone

Status, trust, errors, and actions must be communicated through **text, position, and iconography** in addition to color. Color is a reinforcing channel — not the only channel.

### 2.4 Calm Color Builds Trust

Restrained, predictable color behavior signals honesty. Aggressive saturation, flashing emphasis, and promotional color bursts undermine long-term rental credibility.

### 2.5 Restraint Creates Premium Perception

Premium on Rento is expressed through disciplined color use — not through luxury palettes or gold-accent clichés. Less color produces stronger meaning.

### 2.6 Reduce Cognitive Load

Each new semantic color role increases what users must learn. The system favors **few roles, stable meaning**. Color should clarify — not decorate.

### 2.7 One Meaning Per Role

Each semantic role maps to one meaning everywhere. Reusing a role for a second meaning is prohibited without standard update.

### 2.8 Authenticity

Color must not imply verification, availability, or premium status that the product cannot substantiate. Appearance and fact must align (Chapter 3).

### 2.9 Consumer Paths Are Stricter

Consumer marketplace surfaces use fewer accent roles and stricter trust rules than internal admin or operational workspaces. Internal density must not leak into renter paths.

### 2.10 Survive Redesign

Semantic roles outlive palette refreshes. Implementation changes; meaning does not.

---

## 3. Color Philosophy

### 3.1 Color Communicates Before Aesthetics

Users interpret color subconsciously before reading copy. Semantic discipline prevents misinterpretation — especially for status, trust, and urgency.

### 3.2 Hierarchy Partnership

Color works **after** role assignment (Chapter 6) and structural placement (Chapter 4). Applying trust color to metadata because it “needs attention” inverts the system.

### 3.3 Multimodal Communication

Meaning must survive color blindness, bright sunlight, low-quality screens, and desaturated display modes. Shape, label, and position carry equal responsibility.

### 3.4 Calm as Default

The default product atmosphere is **neutral and quiet**. Semantic color appears where meaning requires emphasis — not to fill empty space.

### 3.5 Premium Through Discipline

A mostly neutral interface with precise semantic accents reads as professional. A multi-accent interface reads as promotional or chaotic.

### 3.6 Campaign Resistance

Marketing campaigns do not receive independent color languages inside core product flows. Campaign expression belongs in controlled, disclosed contexts — not in trust or status roles.

### 3.7 European Sensibility

Color restraint aligns with European professional expectations: privacy-aware, understated, credible — not impulse-commerce intensity.

### 3.8 Time and Trust

Color associated with freshness, verification, or availability must remain **factual**. Color must not simulate urgency that data does not support.

---

## 4. Semantic Color Roles

This section defines **roles by meaning** — not by hue. Any future palette assigns values to these roles; it does not invent new meanings without council approval.

For each role: **meaning**, **when allowed**, **when prohibited**, and **relationships**.

---

### 4.1 Action and Brand Roles

**Primary**  
*Meaning:* The main brand-endorsed action path in a context (e.g., save profile, apply filters, continue flow).  
*Allowed:* One dominant consumer or realtor action per context when aligned with Chapter 4.  
*Prohibited:* Multiple competing primary treatments; use for static facts or status.  
*Relationships:* Subordinate to trust roles on evaluation screens; dominant in task-completion flows.

**Secondary**  
*Meaning:* Alternative or supporting action — cancel, back, secondary path.  
*Allowed:* Non-destructive alternatives to primary.  
*Prohibited:* Visually competing with primary; disguising destructive actions.  
*Relationships:* Paired with Primary; never identical in emphasis.

**Interactive**  
*Meaning:* Affordance that something responds to input — links, tappable rows, controls.  
*Allowed:* Consistent treatment for discoverable interactivity.  
*Prohibited:* Entire screens treated as interactive decoration; static facts styled as links.  
*Relationships:* Distinct from Primary action fill — not every tap is the primary action.

**Disabled**  
*Meaning:* Action or control unavailable — with reason recoverable elsewhere if possible.  
*Allowed:* Reduced emphasis; clear non-interactive state.  
*Prohibited:* Disabled styling on critical facts; hiding information through disable appearance.  
*Relationships:* Must not be confused with metadata or loading.

**Focus**  
*Meaning:* Current keyboard or accessibility focus — orientation for input navigation.  
*Allowed:* Visible focus for operable elements.  
*Prohibited:* Decorative focus rings on static content; focus as brand animation.  
*Relationships:* Independent of selection; both may coexist with distinct meaning.

**Selection**  
*Meaning:* User has chosen an item, filter, or option.  
*Allowed:* Active filter chips, selected list row, chosen tab.  
*Prohibited:* Selection styling on trust or status without selection semantics.  
*Relationships:* Distinct from Primary action — selection ≠ submission.

---

### 4.2 Neutral and Structural Roles

**Neutral**  
*Meaning:* Default product atmosphere — no special semantic claim.  
*Allowed:* Majority of surfaces, body content, chrome.  
*Prohibited:* Neutral used to hide warnings or errors; grey-washing trust failures.  
*Relationships:* Canvas for all other roles.

**Background**  
*Meaning:* Base layer behind content — orienting, not signaling.  
*Allowed:* Page and app backdrop.  
*Prohibited:* Background hue that reduces text contrast or mimics status.  
*Relationships:* Parent of Surface.

**Surface**  
*Meaning:* Container for grouped content — cards, sheets, panels.  
*Allowed:* Listing cards, form sections, reading zones.  
*Prohibited:* Every surface a different hue; surface color as status substitute.  
*Relationships:* Slight elevation from Background; below Overlay.

**Overlay**  
*Meaning:* Temporary layer above content — sheets, modals, scrims.  
*Allowed:* Dimming content beneath to focus task layer.  
*Prohibited:* Overlay so heavy comprehension is lost; overlay color as emotional alarm without cause.  
*Relationships:* Paired with sheet content on Surface.

**Border**  
*Meaning:* Boundary of a container or control — structural separation.  
*Allowed:* Cards, inputs, dividers when separation needs definition.  
*Prohibited:* Border color as primary status signal without label.  
*Relationships:* Lighter than semantic status; subordinate to Divider when both exist.

**Divider**  
*Meaning:* Separation within a group — related items, not new sections.  
*Allowed:* Within price group, within identity block.  
*Prohibited:* Dividers between unrelated hierarchy levels that should be separate sections.  
*Relationships:* Subordinate to section structure.

**Typography Support**  
*Meaning:* Color applied to text roles (Chapter 6) for hierarchy — not new semantics.  
*Allowed:* Primary text, supporting text, muted metadata text.  
*Prohibited:* Typography color inventing new status meanings; rainbow body text.  
*Relationships:* Implements type hierarchy; does not replace Verification or Critical roles on labels.

**Skeleton**  
*Meaning:* Placeholder shape during load — structure without content.  
*Allowed:* Loading cards and text blocks matching final layout.  
*Prohibited:* Skeleton hues that imply success, error, or trust; animated skeleton as entertainment.  
*Relationships:* Paired with Loading role; transitions to Neutral/Surface when complete.

**Loading**  
*Meaning:* Activity in progress — system working.  
*Allowed:* Brief progress indication where structure alone is insufficient.  
*Prohibited:* Loading color implying outcome (success/error); indefinite alarming load states.  
*Relationships:* Subordinate to content; never blocks orientation text.

---

### 4.3 Feedback Roles

**Success**  
*Meaning:* Action completed as intended — save confirmed, submission received.  
*Allowed:* Brief confirmation contexts.  
*Prohibited:* Success styling on listings, prices, or trust; celebratory excess; permanent success tint on screens.  
*Relationships:* Distinct from Verification — success is event, verification is fact.

**Warning**  
*Meaning:* Caution — attention needed, outcome uncertain, data incomplete.  
*Allowed:* Incomplete profile, stale listing, missing optional data, reversible risk.  
*Prohibited:* Warnings for normal browsing; warning as marketing urgency; warning without explanation.  
*Relationships:* Less severe than Critical; may precede moderation states.

**Critical**  
*Meaning:* Serious problem, failure, or destructive consequence — error, failed save, blocked action.  
*Allowed:* Error messages, destructive confirm, safety-related alerts.  
*Prohibited:* Critical styling for promotions, sales, or “act now” messaging; critical on report/safety buttons as default idle state.  
*Relationships:* Rare; never decorative; always paired with plain language.

**Information**  
*Meaning:* Neutral guidance — tips, first-time explanation, non-urgent notice.  
*Allowed:* Helper copy, process explanation, new feature orientation.  
*Prohibited:* Information role carrying trust or status claims; info styled as warning to increase clicks.  
*Relationships:* Subordinate to content; not competing with Primary action.

**Notifications**  
*Meaning:* System or product message requiring awareness outside current screen context.  
*Allowed:* Account notices, moderation updates, saved search alerts — with clear copy.  
*Prohibited:* Notification color mimicking verification or availability; notification barrage desensitizing Critical role.  
*Relationships:* Severity maps to Success, Warning, Critical, or Information — not independent rainbow.

---

### 4.4 Trust and Marketplace Status Roles

**Verification**  
*Meaning:* Factual trust signal about listing freshness or realtor/platform verification state — as defined by product rules.  
*Allowed:* Verification labels and icons with text (Chapter 19).  
*Prohibited:* Verification styling on unverified content; gold/luxury verification clichés; verification color on paid placement.  
*Relationships:* Distinct from Success, Premium, and Primary; stable vocabulary with typography.

**Trust**  
*Meaning:* General confidence reinforcement — human identity presentation, platform safety, report availability.  
*Allowed:* Subtle reinforcement paired with identity blocks.  
*Prohibited:* Trust color on every element; trust without factual basis.  
*Relationships:* Parent concept; Verification is specific trust subtype.

**Availability**  
*Meaning:* Listing is publicly available for inquiry under product rules.  
*Allowed:* Factual availability indicators where material to renter.  
*Prohibited:* Availability color on pending or unavailable listings; green implying available when status is not available.  
*Relationships:* Distinct from Reserved, Rented, and moderation pending.

**Reserved**  
*Meaning:* Listing no longer openly available — reserved under product rules.  
*Allowed:* Status communication to relevant roles.  
*Prohibited:* Reserved styling on browse cards meant to imply urgency to “act now.”  
*Relationships:* Mutually exclusive with Availability for same listing state.

**Rented**  
*Meaning:* Listing fulfilled — rented under product rules.  
*Allowed:* Realtor workspace and historical views.  
*Prohibited:* Rented listings presented in consumer discovery with availability signaling.  
*Relationships:* Terminal state for consumer discovery paths.

**Moderation**  
*Meaning:* Listing or content under review, rejected, or awaiting admin action.  
*Allowed:* Realtor-facing status; admin tools.  
*Prohibited:* Consumer-facing moderation styling that exposes internal process confusingly or falsely implies public availability.  
*Relationships:* Warning or Information often appropriate; not Verification.

---

### 4.5 Commercial and Identity Roles

**Premium**  
*Meaning:* Paid tier, enhanced realtor capability, or subscription benefit — **disclosed** where material.  
*Allowed:* Realtor account surfaces, pricing pages, disclosed badges.  
*Prohibited:* Premium styling mimicking Verification or Availability; renters misled about organic trust.  
*Relationships:* Subordinate to Trust roles; never overrides factual status colors.

**Agency**  
*Meaning:* Organizational identity distinct from individual realtor — agency name, branding zone.  
*Allowed:* Identity blocks, profile headers, agency-level portfolio.  
*Prohibited:* Agency color competing with listing facts on renter evaluation; agency styling implying platform endorsement without basis.  
*Relationships:* Supporting identity on consumer paths; stronger on agency-managed surfaces.

**Featured**  
*Meaning:* Paid or algorithmic prominence — visibility increase, **not** trust increase.  
*Allowed:* Disclosed featured label in browse where product rules require.  
*Prohibited:* Featured styling identical to Verification; featured without disclosure.  
*Relationships:* Distinct from Premium account branding and from Availability.

**AI Assistance**  
*Meaning:* Content or suggestion generated or assisted by automated systems — requires disclosure (Chapter 53).  
*Allowed:* Distinct, calm treatment paired with edit and review affordances.  
*Prohibited:* AI content styled identically to human-verified facts; AI color implying official verification.  
*Relationships:* Information or dedicated subdued accent — never Verification.

---

### 4.6 Data Visualization Roles

**Charts**  
*Meaning:* Comparative data in realtor or admin analytics.  
*Allowed:* Operational dashboards with accessible differentiation beyond hue.  
*Prohibited:* Chart palettes leaking into consumer listing semantics; chart colors reused for listing status.  
*Relationships:* Uses Statistics role family; not browse status colors.

**Statistics**  
*Meaning:* Numeric operational summaries — counts, trends, portfolio metrics.  
*Allowed:* Workspace dashboards.  
*Prohibited:* Vanity metrics in Critical or Verification hues; statistic color implying renter-facing trust.  
*Relationships:* Typography for numbers (Chapter 6) leads; color supports comparison only.

---

### 4.7 Role Relationships Summary

| Priority (high to low) | Role family |
|------------------------|-------------|
| 1 | Factual status: Availability, Reserved, Rented, Moderation |
| 2 | Trust: Verification, Trust |
| 3 | Feedback: Critical, Warning, Success, Information |
| 4 | Action: Primary, Secondary, Interactive |
| 5 | Commercial (disclosed): Featured, Premium |
| 6 | Structural: Neutral, Surface, Background, Border, Divider |
| 7 | AI Assistance (disclosed) | |

When roles conflict visually, **factual status and trust beat commercial and decorative treatment** (Chapter 5).

---

## 5. Marketplace Color System

Semantic meaning for domain-specific concepts. Stable across features and redesigns.

### 5.1 Property Status

Color communicates **inventory state factually** — available, reserved, rented, pending moderation, archived.  
Consumer discovery shows only states appropriate to public rules. Color never implies a more favorable state than data supports.  
Realtor workspace may show fuller status palette; consumer browse remains strict.

### 5.2 Verification

Verification color means **documented check within product rules** — not “high quality listing,” not “recommended,” not “popular.”  
Same verification meaning on cards, detail, and realtor identity. Absence of verification uses Warning or neutral factual treatment — never shame styling.

### 5.3 Trust

Trust color appears in **identity and platform safety contexts** — realtor presence, report path, honest moderation communication.  
Not applied to price, photos, or decorative chrome.

### 5.4 Price

Price uses **typographic hierarchy first** (Chapter 6). Color on price is minimal — primary text emphasis, not promotional highlight.  
Price is never success-colored (“deal!”) or critical-colored (“hurry!”) without factual basis.

### 5.5 Availability

Distinct from verification. A listing may be verified yet reserved. Availability color applies only when publicly available under rules.

### 5.6 Moderation

Pending review uses moderation or warning semantics for **realtor-facing** surfaces. Consumers do not see misleading availability while pending. Color supports clarity of wait state — not anxiety.

### 5.7 Contact Actions

Contact actions (message, call) use **Primary or dedicated contact semantic** — calm, intentional, distinct from save/favorite.  
Contact color does not imply platform guarantee of response time or outcome.

### 5.8 Favorites

Saved/favorited state uses **Selection** semantic — personal bookmark, not trust or availability.  
Distinct from Verification green; distinct from Critical red on unsave if destructive confirm required.

### 5.9 Saved Searches

Selection or Information semantics — user-defined alert, not listing status. Notifications for saved search use Notification roles with proportional severity.

### 5.10 Premium Listings

If product offers listing-level paid enhancement, **Featured** semantic applies with disclosure. Must not borrow Verification hue or Availability hue.

### 5.11 Featured Listings

Visibility promotion only. Label and color mean **“shown prominently”** — not “verified,” not “available sooner,” not “better home.”

### 5.12 Realtor Identity

Human identity blocks use **Trust-neutral professional** treatment — photography and name lead; color frames, does not celebrity-highlight.  
Consistent across card footers, detail trust blocks, contact zones.

### 5.13 Agency Identity

Agency semantic subordinate to realtor and listing facts on renter paths. Stronger agency treatment on agency profile or portfolio surfaces — not on first glance listing evaluation.

### 5.14 Admin Workspace

Broader use of status, warning, and statistics semantics permitted. **Admin palette does not migrate to consumer** without semantic review. Admin critical and warning density is operational — not consumer alarmist.

### 5.15 Consumer Workspace

Strictest restraint. Fewest accent roles. Trust and status semantics dominate over commercial accents. Calm neutral majority.

### 5.16 AI-Generated Content

AI Assistance semantic always paired with disclosure text. Editable AI uses Interactive cues. Human-reviewed content transitions to standard body/trust treatment after review. AI never receives Verification styling.

### 5.17 Cross-Feature Stability

New features map to **existing roles** before proposing new semantics. Saved collections, comparisons, tours, and chat inherit Selection, Information, Primary, Trust — not new rainbow accents per feature.

---

## 6. Decision Rules

### Rule 1 — Foundation Alignment

Conflicts with Chapters 1–6 → reject.

### Rule 2 — Meaning Before Beauty

Ask: *What semantic role is this?* If undefined, do not ship.

### Rule 3 — Consistency Before Campaign

Ask: *Does this role mean the same as elsewhere?* Campaign exceptions require Exception Policy (Chapter 5).

### Rule 4 — One Meaning Per Role

Ask: *Is this role reused for a second meaning?* If yes, reject or rename role through council.

### Rule 5 — No Decorative Alerts

Ask: *Is Warning or Critical used without factual cause?* If yes, remove.

### Rule 6 — Status Colors Are Factual

Ask: *Does color match data state?* If not, reject — highest severity.

### Rule 7 — Marketing Never Overrides Trust

Ask: *Does commercial color compete with verification or availability?* Commercial must yield or disclose.

### Rule 8 — Primary Before Promotional

Ask: *Is user’s task action clearer than promotion?* Promotion subordinate.

### Rule 9 — No Urgency Through Color Alone

Ask: *Would this still feel urgent without hue?* If no, revise copy and structure — not saturation.

### Rule 10 — Multimodal Check

Ask: *Is meaning clear without color?* If no, add text/icon/position.

### Rule 11 — Hierarchy Check

Ask: *Is color compensating for layout?* Fix structure first.

### Rule 12 — Escalation

**Factual status** over promotion. **Trust** over conversion. **Neutral calm** over accent proliferation. **Accessibility** over aesthetic contrast tricks.

---

## 7. Correct and Incorrect Examples

### 7.1 Verification on Listing Card

**Correct:** Verification role on small label with icon and factual text — same role on detail.  
**Incorrect:** Gold “verified” styling on paid listings without verification; different verification hues on card vs detail.

### 7.2 Price Presentation

**Correct:** Price in primary text emphasis; neutral or typography support only.  
**Incorrect:** Price in success color implying “great deal”; red price implying false discount urgency.

### 7.3 Pending Moderation

**Correct:** Realtor sees moderation/warning semantic with plain status copy; listing hidden or marked per rules on consumer side.  
**Incorrect:** Consumer sees green availability on pending listing.

### 7.4 Contact Button

**Correct:** Contact action uses consistent Primary or contact semantic after comprehension layer.  
**Incorrect:** Pulsing critical-colored contact button before user reads listing.

### 7.5 Favorite Icon

**Correct:** Selection semantic on active favorite; neutral idle state.  
**Incorrect:** Favorite heart uses verification green when saved.

### 7.6 Featured Listing

**Correct:** Featured label with disclosed semantic distinct from verification.  
**Incorrect:** Featured listings use same color as verified listings.

### 7.7 Error Saving Favorite

**Correct:** Critical or warning on inline error with recovery action; message explains.  
**Incorrect:** Full screen red flash; error only as red border with no text.

### 7.8 AI Description

**Correct:** AI Assistance subtle treatment + disclosure; after human review, standard body styling.  
**Incorrect:** AI description in verification color implying platform certifies accuracy.

### 7.9 Admin Rejection

**Correct:** Critical or warning in realtor notification with clear next step.  
**Incorrect:** Same critical styling used for marketing banners in consumer app.

### 7.10 Empty State

**Correct:** Neutral surface, clear typography roles, primary action for next step.  
**Incorrect:** Warning-colored empty browse implying product failure.

---

## 8. Common Mistakes

| Mistake | Harm |
|--------|------|
| Too many accent colors | Weak semantics; amateur feel |
| Red for marketing | Critical role devalued; alarm fatigue |
| Green for decoration | Availability/verification meaning diluted |
| Status colors changing between screens | Recognition and trust loss |
| Color compensating for poor hierarchy | Duplication; confusion |
| Color-only communication | Accessibility failure; misread states |
| Verification color on promotions | False trust; regulatory reputational risk |
| Featured identical to verified | Deceptive prominence |
| Success color on listing cards | Misleading “winner” framing |
| Warning on every incomplete field | Warning role meaningless |
| Neon contact buttons | Calm model broken; cheap urgency |
| Dark mode inverted without role review | Meaning drift; contrast failure |
| Chart colors on listing badges | Semantic collision |
| Per-team campaign hues in product core | Consistency destroyed |
| Disabled styling on text facts | Information hidden |
| Skeleton in success hue | False load completion signal |

---

## 9. Future Scalability

### 9.1 Complete Visual Redesign

New palette assigns values to **existing roles**. Designers produce role mapping document before ship. No new consumer semantics without council approval.

### 9.2 Dark Mode

Dark mode is an **implementation variant** — not a new semantic language. Each role maintains meaning; contrast and non-hue cues are revalidated. Critical and Warning remain distinguishable without relying on hue alone.

### 9.3 Localization

Color semantics do not change by locale. Cultural associations are considered in copy — not in inventing new hues per country.

### 9.4 AI Expansion

More AI features extend **AI Assistance** role family — disclosure, editability, review state. AI must not accumulate trust colors as features multiply.

### 9.5 Premium and Advertising

Monetization increases **Featured** and **Premium** use — never merges with Verification. Advertising in product requires disclosure standards (Chapter 48). Semantic system scales by **disclosed roles**, not recolored trust.

### 9.6 Enterprise and Agency

Agency and enterprise tiers may expand **Agency** and operational dashboard roles. Consumer evaluation paths remain protected.

### 9.7 White-Label and Partner Marketplaces

If white-label variants exist, **semantic roles are invariant**; only palette values and brand Primary may change. Trust, status, and availability meanings cannot be redefined per partner.

### 9.8 New Marketplaces and Categories

Future property types or adjacent markets map to same status and trust roles. New categories do not justify new traffic-light systems without council review.

### 9.9 Accessibility Evolution

As standards evolve, contrast and multimodal requirements tighten — semantic discipline makes migration easier because meaning is documented independently of hex values.

### 9.10 Role Governance

Proposals for new semantic roles require: user problem, failed existing role mapping, accessibility plan, five-year test, and migration from any exceptions.

---

## 10. Design Director Review

**Chapter:** 7 — Color Meaning & Semantic Color System  
**Section:** V — Visual Language  
**Review type:** Initial standard adoption

### 10.1 Approval Statement

This chapter is approved as the **semantic color contract** for Rento. All color use in the product must map to defined roles. Palette specifications in later documentation implement this chapter — they do not redefine meaning. No surface ships with decorative, ambiguous, or misleading color semantics.

### 10.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Trust, calm, authenticity |
| Chapter 3 — Brand Experience & Visual Identity | Restraint, communication over entertainment |
| Chapter 5 — Product Design Decision Framework | Trust vs conversion; commercial bounds |
| Chapter 6 — Typography & Reading System | Hierarchy partnership; price and status labels |
| Chapter 19 — Trust Signals | Application of Verification and Trust roles |
| Chapter 24 — Color System (implementation) | Palette values assigned to roles herein |
| Chapter 37–41 — Accessibility | Multimodal and contrast requirements |
| Chapter 48 — Monetization | Featured and Premium disclosure |
| Chapter 53 — AI Assisted Experience | AI Assistance role |
| Appendix C — Trust Signal Matrix | Quick reference companion |
| Chapter 60 — Product Review Checklist | Semantic compliance at ship gate |

### 10.3 Review Criteria for Future Amendments

Amendments must answer:

1. What meaning failure is not prevented by current roles?  
2. Can an existing role extend instead of adding a new one?  
3. Does the change preserve trust, calm, and multimodal comprehension?  
4. Will meaning remain stable across redesign, dark mode, and locales?

Semantic role changes require Design Council approval.

### 10.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on semantic role changes |
| Brand Designer | Palette alignment to roles without meaning drift |
| Head of Product Design | Cross-surface semantic consistency |
| Accessibility Specialist | Multimodal and contrast validation |
| Senior Product Designer | Marketplace and status application |

### 10.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new color decisions immediately. Existing surfaces align during scheduled improvement cycles and any palette refresh must publish role mapping first.

### 10.6 Design Director Closing Note

Color is the fastest language in the interface — and the easiest to abuse. Users who learn that green means available will feel betrayed when green means “sponsored.” Users who learn that calm neutrals mean professionalism will feel alarmed when every screen screams accent. This chapter exists so color **means one thing**, everywhere, for years — regardless of which palette Rento wears tomorrow.

---

**End of Chapter 7**


---

## Chapter 8 — Spatial System & Layout Rhythm

**Section:** V — Visual Language  
**Status:** APPROVED
**Audience:** Product Design, UX, Brand, Reviewers  
**Authority:** Subordinate to Chapters 1–7; implements structural hierarchy from Chapter 4; partners with Typography (Chapter 6) and Color Meaning (Chapter 7); defines relationships, not measurements.

---

## 1. Purpose

This chapter defines the **spatial language** of Rento.

Space is treated as a **design material**, not empty area left over after content is placed. Spacing, rhythm, grouping, alignment, density, and breathing room are primary tools for comprehension — equal in importance to typography and semantic color.

The goal is to ensure that every future screen **feels visually related** regardless of feature, role, or redesign. Users should sense one product family through consistent spatial behavior before they notice any specific visual style.

This chapter establishes **relationships**, not measurements. It does not define spacing scales, pixel values, or implementation tokens. Those belong in downstream specification. What belongs here is **why** elements are near or far, grouped or separated, dense or calm — and **how** spatial decisions support trust, clarity, and premium perception.

Space that is designed well disappears into understanding. Space that is designed poorly creates anxiety, mistrust, and fatigue.

---

## 2. Core Principles

### 2.1 Space Communicates Meaning

Distance, grouping, and pause tell the user what belongs together and what matters more. Space is semantic — not neutral filler.

### 2.2 Empty Space Is Active

Whitespace is an intentional design decision. It signals importance, separates decisions, and reduces cognitive load. Unused space is not waste — it is structure.

### 2.3 Layout Must Breathe

Screens require rhythm: moments of density and moments of pause. Continuous crowding violates calm interaction principles (Chapters 1–2).

### 2.4 Visual Silence Improves Comprehension

Silence between sections allows the eye and mind to complete one question before the next. Noise is spatial as well as visual.

### 2.5 Premium Feels Calm Because of Spacing

Premium perception on Rento comes from generous, disciplined spacing — not from ornamental frames. Calm spatial rhythm signals professionalism and trust.

### 2.6 Distance Communicates Relationship

Related facts are nearer. Unrelated facts are farther. Proximity is the primary grouping language before borders or color.

### 2.7 Density Communicates Importance

Primary information receives more surrounding space and structural prominence. Metadata may be denser. Density is hierarchy expressed spatially.

### 2.8 Mobile Spatial Logic First

Spatial rhythm is designed for vertical, one-handed, interrupted mobile reading. Wider viewports add horizontal breath — they do not invent new spatial logic.

### 2.9 Alignment Creates Confidence

Consistent edges and predictable flow signal craft and reliability. Misalignment signals carelessness — and carelessness reads as untrustworthiness in housing.

### 2.10 Spatial Discipline Scales

A restrained spatial system grows with features. Proliferating containers, gaps, and zones creates fragmentation. Few spatial patterns, applied consistently, scale for years.

---

## 3. Spatial Philosophy

### 3.1 Space Before Decoration

When separation is needed, prefer spatial separation before borders, dividers, or background shifts. Decoration may reinforce — it may not replace proximity logic.

### 3.2 Content Before Containers

Containers exist to group meaning — not to decorate pages. Each container must answer a user question. Containers without questions are removed.

### 3.3 Whitespace Reduces Cognitive Load

Crowding forces simultaneous parsing. Breathing room allows sequential understanding — aligned with progressive disclosure (Chapters 1 and 4).

### 3.4 Macro and Micro Whitespace

**Macro whitespace** separates major sections, screen purposes, and decision layers — pauses between glance, decision, and detail.  
**Micro whitespace** separates related items within a group — label from value, price from period, icon from text.

Both are required. Macro without micro feels empty; micro without macro feels muddy.

### 3.5 Breathing Zones

Breathing zones are deliberate areas of reduced density around:

- Primary facts (price, title, identity)  
- Dominant actions  
- State transitions (media to reading zone, list to detail)  
- Error and recovery paths  

Breathing zones are not arbitrary margins — they mark hierarchy.

### 3.6 Safe Areas and Physical Device Respect

Spatial system respects device edges, system gestures, and thumb reach. Content and actions are not placed where they fight physical interaction or feel clipped. Safe-area awareness is spatial ethics for mobile — implementation details belong elsewhere; principle belongs here.

### 3.7 Visual Pauses

Pauses are short spatial breaks that signal: *new question begins here*. Pauses are stronger than divider lines when hierarchy is clear. Over-dividing without pausing creates visual fragmentation.

### 3.8 Partnership with Typography and Color

Space establishes groups; typography names them; color reinforces meaning (Chapters 6–7). Space must not be used to compensate for wrong type roles or misleading color.

---

## 4. Layout Rhythm

Rhythm is the **predictable pattern of spacing and pacing** across a screen and across the product. Users feel rhythm before they analyze it. Good rhythm guides attention without announcement.

### 4.1 Visual Rhythm

The repeating pattern of section spacing, card proportion, and edge alignment across screens. Visual rhythm creates family resemblance — browse, detail, profile, and workspace feel related through similar spatial cadence.

**Principles:**

- Major sections repeat similar top and bottom breathing.  
- Cards repeat similar internal order and internal spacing logic.  
- Abrupt spatial changes signal new screen purpose — not random design.

### 4.2 Reading Rhythm

Vertical pacing aligned with Chapter 6 reading modes:

- **First glance:** tight, focused cluster of primary facts with breathing only between distinct questions.  
- **Decision reading:** steady section cadence — not accelerating density.  
- **Detailed reading:** wider line breathing in body zones; section pauses before long text.

Reading rhythm prevents the user from running out of breath — visually or cognitively.

### 4.3 Scrolling Rhythm

Scroll should feel like **progress through questions**, not wading through clutter.

**Principles:**

- First viewport answers first questions without scroll where achievable.  
- Each scroll segment introduces one major new topic.  
- Sticky zones are sparse — sticky everything destroys scroll rhythm.  
- Media-to-content transitions (gallery to reading sheet) are deliberate spatial beats — a clear inhale before text begins.

### 4.4 Interaction Rhythm

Spacing around tappable targets supports confident action:

- Actions are not cramped against unrelated text.  
- Primary action has spatial prominence — surrounding breath, not just size.  
- Destructive actions are separated spatially from primary paths.  
- Large touch spacing is mandatory in consumer paths — density never sacrifices confident tap.

### 4.5 Section Rhythm

Within a screen, sections follow a cadence:

**orient → decide → deepen → act → reference**

Spatial pauses mark transitions. Section titles sit consistently relative to content above and below — not floating arbitrarily.

### 4.6 Card Rhythm

Listing cards are the heartbeat of the marketplace. Card rhythm requires:

- Consistent external spacing between cards — scan-friendly vertical beat.  
- Consistent internal zones: media, primary facts, supporting facts, identity foot.  
- Equal external spacing does not mean equal internal density — primary zone may breathe more than metadata foot.

### 4.7 Marketplace Rhythm

Browse flows emphasize **vertical scan rhythm** — one card per beat, predictable gap, no horizontal clutter breaking scan.  
Detail flows emphasize **layer rhythm** — media beat, decision cluster beat, description beat, contact beat.  
Filter sheets emphasize **task rhythm** — title, fields, pause, dominant apply — without competing with navigation beneath.

Rhythm guides attention without users noticing they are being guided.

---

## 5. Grouping System

Grouping answers: *What belongs together?* Separation answers: *What must not be confused?*

### 5.1 Proximity

Items that answer the same user question are placed nearer than items that answer different questions.

**Belong together:** price and rental period; realtor name and role; verification label and its explanation; contact actions with each other.  
**Must separate:** price group and unrelated metadata grid; identity and unrelated promotional content; primary facts and legal footnotes.

Proximity is the default grouping tool — tried before containers or dividers.

### 5.2 Containment

Containers (cards, sheets, panels) wrap groups that move as one unit through the experience — a listing, a contact block, a filter task.

**When to contain:**

- User thinks of it as one object (a listing card).  
- Group may be moved, saved, or acted on as a unit.  
- Group needs visual boundary on busy backgrounds.

**When not to contain:**

- Single facts that belong to a larger section already defined.  
- Nested containers that duplicate the same question.  
- Container per fact — visual fragmentation.

### 5.3 Alignment

Alignment creates trust through predictability.

**Principles:**

- Consistent left edge for reading flow in LTR locales.  
- Numeric facts align for comparison where scanned in lists.  
- Icons and labels align to invisible grids — not drifting per row.  
- Misaligned edges create subconscious uncertainty — “this product is sloppy.”

**Grid discipline:** Content respects a small number of alignment columns. Arbitrary inset per block breaks grid discipline.

### 5.4 Separation

Separation is stronger than proximity when questions differ materially.

**Separate when:**

- Moving from evaluation to action (comprehension before contact).  
- Moving from public listing facts to safety/report actions.  
- Moving from consumer content to admin-only density.  
- Moving from human identity to system metadata.

Separation uses spatial pause first; divider or surface shift second.

### 5.5 Continuity

Continuity preserves orientation across transitions.

**Principles:**

- Detail view spatially echoes card internal order — recognition speeds comprehension.  
- Filter sheet field spacing echoes form spacing elsewhere — one form language.  
- Loading skeleton matches final spacing — continuity under load (Chapter 4).

Continuity is grouping across time — not only on one screen.

### 5.6 Group Before Decorating

If two items are not proximate enough to read as related, a border will not fix the relationship. Group spatially first.

### 5.7 Separate Before Coloring

If two groups require different semantic color roles (Chapter 7), they must be spatially distinct first. Color must not be the only separator.

---

## 6. Density Model

Density is the **amount of information per unit of space**. Rento uses role-appropriate density — not one density everywhere.

### 6.1 Density Principles

- Consumer evaluation paths: **low to medium** — calm, scannable, premium.  
- Consumer task completion (filters, save, contact): **medium** — clear fields, adequate touch spacing.  
- Realtor operational workspace: **medium** — more facts visible, still sectioned.  
- Admin and analytics: **medium to high** — operational efficiency, never exported to renters.  
- Forms: **medium** — grouped fields, not single dense slab.  
- Lists: **low per item, steady rhythm** — many items, each breathable.

Identity is preserved across densities through **same grouping logic, alignment discipline, and rhythm** — not same pixel tightness.

### 6.2 Consumer Marketplace

**Goal:** Compare listings quickly without fatigue.  
**Spatial character:** Generous card gaps; primary facts breathe; trust signals compact but not crammed; identity foot separated from price cluster.  
**Avoid:** Badge stacks, equal-weight tiles, multiple internal containers per card.

### 6.3 Property Detail

**Goal:** Evaluate one home with confidence.  
**Spatial character:** Strong media-to-reading transition; decision cluster grouped with internal hierarchy; description in own breathing zone; contact separated as action chapter; metadata last and compact.  
**Avoid:** Duplicate fact grids; contact zone competing with first glance cluster.

### 6.4 Search and Filters

**Goal:** Refine discovery without leaving browse context.  
**Spatial character:** Sheet rhythm — clear title pause, field grouping, dominant apply separated from fields; results return to marketplace card rhythm.  
**Avoid:** Filter UI denser than the listings it serves; nested containers fighting thumb reach.

### 6.5 Realtor Workspace

**Goal:** Operate portfolio — status, next action, list.  
**Spatial character:** Hero or status zone breathes; one next-action block; list maintains card rhythm; stats compact but not micro-type dense.  
**Avoid:** Dashboard walls of equal tiles pushing list below fold; duplicate stat zones.

### 6.6 Admin Workspace

**Goal:** Moderate, review, resolve.  
**Spatial character:** Higher information density permitted; tables and metadata tighter; still aligned and sectioned.  
**Avoid:** Leaking admin compactness into consumer surfaces.

### 6.7 Forms

**Goal:** Complete profile or listing data accurately.  
**Spatial character:** Label-value proximity; section pauses between logical groups; primary submit separated from last field; errors inline near field.  
**Avoid:** Long undifferentiated field stack; tiny touch spacing.

### 6.8 Lists and Analytics

**Lists:** Repeated units with identical spatial grammar — scan rhythm.  
**Analytics:** Charts and statistics grouped; operational density; chart zones separated from consumer trust language spatially and semantically.

### 6.9 Marketplace Spatial Principles (Summary)

| Surface | Spatial priority |
|---------|------------------|
| Property cards | Scan rhythm; media lead; price cluster breath; identity foot |
| Listing detail | Layer rhythm; decision group; contact separation |
| Pricing | Proximity with period; no duplicate price zones |
| Realtor identity | Grouped name, role, avatar; breathing before contact |
| Gallery | Full-bleed media beat; counter within media, not fighting reading sheet |
| Contact section | Separated action chapter; actions grouped together |
| Filters | Task sheet rhythm; field groups; apply pause |
| Search results | Return to card rhythm; result count compact metadata |
| Favorite actions | Selection affordance spaced from trust badges — no cramming |
| Verification | Compact factual group — not sprawling promotional zone |

---

## 7. Decision Rules

### Rule 1 — Foundation Alignment

Spatial proposals conflicting with Chapters 1–7 → reject.

### Rule 2 — Group Before Decorating

Ask: *Are related items proximate enough to read as one group?*  
If not, adjust spacing before adding borders or surfaces.

### Rule 3 — Separate Before Coloring

Ask: *Are groups that need different meaning spatially distinct?*  
If not, separate before applying semantic color.

### Rule 4 — Whitespace Before Borders

Ask: *Can pause alone separate these sections?*  
Prefer breathing over dividers.

### Rule 5 — Rhythm Before Effects

Ask: *Does spacing cadence guide the eye correctly without shadow or color tricks?*  
If not, fix rhythm first.

### Rule 6 — Alignment Before Ornament

Ask: *Do edges align to grid discipline?*  
Misalignment must be intentional and rare — not accidental.

### Rule 7 — Content Before Containers

Ask: *Does this container wrap a real user question?*  
If not, remove container.

### Rule 8 — Density Match Context

Ask: *Is density appropriate to role and task?*  
Consumer evaluation must not inherit admin compactness.

### Rule 9 — Mobile Touch Test

Ask: *Are actions spaced for confident one-handed use?*  
If cramped, increase interaction rhythm spacing.

### Rule 10 — Duplication Test

Ask: *Does spatial layout duplicate the same fact in separate zones?*  
If yes, consolidate (One Source of Truth).

### Rule 11 — Scroll Segment Test

Ask: *Does each scroll segment introduce one major topic?*  
If multiple topics compete in one segment, restructure.

### Rule 12 — Escalation

**Breathing** over crowding. **Proximity logic** over containers. **Alignment** over ornament. **Consumer calm** over operational density in renter paths.

---

## 8. Correct and Incorrect Examples

### 8.1 Property Card

**Correct:** Media zone, pause, price-location cluster with micro spacing, pause, optional identity foot — steady external gap to next card.  
**Incorrect:** Badges, title, price, rooms, verification crammed with equal tiny gaps; no scan beat.

### 8.2 Listing Detail Layers

**Correct:** Gallery beat → reading sheet inhale → decision group with macro pause → description section → separated contact chapter.  
**Incorrect:** Price, grid, description, contact, and report in one dense screenful with no pauses.

### 8.3 Price Group

**Correct:** Price and period in one proximity group with supporting micro space; single authoritative placement.  
**Incorrect:** Price repeated in header, chip row, and grid with equal containers.

### 8.4 Realtor Identity

**Correct:** Avatar, name, role grouped; breathing before chevron or contact jump; identity once per decision path.  
**Incorrect:** Identity duplicated in three zones with different spacing logic.

### 8.5 Filter Sheet

**Correct:** Title pause, field groups with label proximity, macro pause before apply action.  
**Incorrect:** Fields flush against sheet bottom; apply action competing with system navigation spatially.

### 8.6 Empty Search

**Correct:** Centered or top-weighted empty content with macro pause, explanation, dominant next step — screen still feels structured.  
**Incorrect:** Tiny message lost in vast void or cramped at top with no action breath.

### 8.7 Realtor Dashboard

**Correct:** Status hero breathes; one next-action block; portfolio list maintains marketplace card discipline at appropriate density.  
**Incorrect:** Four stat rows, action center, and continue-editing blocks with identical spacing pushing list away.

### 8.8 Form Profile

**Correct:** Sections with macro pauses; consistent field rhythm; submit separated from last field.  
**Incorrect:** Eight fields with identical tight spacing and no grouping.

### 8.9 Gallery to Content

**Correct:** Clear transition — media ends, reading sheet overlaps with intentional beat; counters live in media zone not reading zone.  
**Incorrect:** Sheet covers counters; first text line crammed under gallery edge.

### 8.10 Loading State

**Correct:** Skeleton preserves card and section spacing; orientation text or header stable.  
**Incorrect:** Collapsed layout that expands on load — rhythm broken.

---

## 9. Common Mistakes

| Mistake | Spatial harm |
|--------|----------------|
| Overcrowded cards | Scan failure; cheap feel |
| Equal spacing everywhere | Hierarchy collapse |
| Random margins per block | Misalignment; distrust |
| Too many containers | Fragmentation; noise |
| Tiny gaps within groups | Facts read as unrelated |
| Massive gaps without purpose | Wasted scroll; disorientation |
| Visual fragmentation | One screen feels like five apps |
| Dense mobile layouts | Tap errors; anxiety |
| Decorative spacing | No semantic relationship |
| Borders instead of proximity | Noise without grouping |
| Sticky everything | Scroll rhythm destroyed |
| Admin density on consumer | Calm model broken |
| Duplicate zones for same fact | Spatial lies |
| No pause before primary action | Accidental taps; hesitation |
| Ignoring safe areas | Clipped content; unprofessional |
| Horizontal clutter on mobile | Breaks vertical marketplace rhythm |
| Nested sheets with duplicate spacing systems | Disorientation |
| Equal containers for unequal facts | Wrong importance signals |

---

## 10. Future Scalability

### 10.1 Future Features

New features inherit **existing rhythm families** — card, detail layer, sheet task, form section — before inventing new spatial dialects per feature.

### 10.2 AI-Assisted Surfaces

AI suggestions appear in grouped zones with disclosure — spatially distinct from verified fact clusters. AI must not compress into primary breathing zones without review.

### 10.3 PWA and Offline

Spatial rhythm remains stable when content is cached or partial. Offline states use same section and pause grammar — not collapsed emergency layouts.

### 10.4 Desktop and Tablet

Wider viewports add **horizontal margin and optional secondary columns** — not reordered hierarchy. Reading flow remains vertical-primary for marketplace evaluation. Desktop must not become a different spatial product.

### 10.5 Localization

Longer copy expands within groups; macro rhythm and group logic unchanged. Spacing tolerates expansion without breaking alignment discipline (Chapter 6).

### 10.6 Future Redesigns

Redesigns may change surface treatment; they must preserve:

- Card rhythm  
- Detail layer beats  
- Grouping questions  
- Density model by role  
- Consumer breathing priority  

Spacing values may change; relationships may not — without council approval.

### 10.7 Enterprise and Analytics

Operational surfaces may increase density within admin family. Enterprise dashboards do not redefine consumer marketplace rhythm.

### 10.8 Marketplace Growth

More listings increase the importance of **consistent inter-card rhythm** — not tighter cards. Growth scales through repetition of calm units, not compression.

### 10.9 Governance

New spatial patterns (e.g., new container type) require documentation of user question, density context, and alignment to existing rhythm family.

---

## 11. Design Director Review

**Chapter:** 8 — Spatial System & Layout Rhythm  
**Section:** V — Visual Language  
**Review type:** Initial standard adoption

### 11.1 Approval Statement

This chapter is approved as the **spatial contract** for Rento. All layouts must comply with grouping, rhythm, density, and alignment principles herein. Measurement specifications implement these relationships — they do not replace them.

### 11.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 4 — Layout & Information Architecture | Structural hierarchy parent |
| Chapter 5 — Product Design Decision Framework | Clarity vs density resolution |
| Chapter 6 — Typography & Reading System | Reading rhythm partnership |
| Chapter 7 — Color Meaning & Semantic Color System | Separate before coloring |
| Chapter 12 — Marketplace Experience | Application to renter flows |
| Chapter 22 — Layout & Spatial System (implementation) | Measurement layer — subordinate |
| Chapter 33 — Navigation Standards | Sheet and nav spatial coordination |
| Chapter 60 — Product Review Checklist | Spatial compliance at ship gate |

### 11.3 Review Criteria for Future Amendments

Amendments must answer:

1. What comprehension or rhythm failure is not prevented today?  
2. Can existing rhythm families extend instead of new spatial dialects?  
3. Does change preserve consumer calm and mobile-first pacing?  
4. Will relationships remain valid across redesign and density contexts?

Amendments require Design Director approval.

### 11.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on spatial principle changes |
| Mobile UX Architect | Thumb reach, scroll, and safe-area fidelity |
| Head of Product Design | Cross-surface rhythm consistency |
| Senior Product Designer | Card and detail spatial compliance |
| Senior UX Designer | Form, sheet, and state spacing |

### 11.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new layout work immediately. Existing surfaces align during scheduled improvement cycles.

### 11.6 Design Director Closing Note

Users rarely say “good spacing.” They say “this feels clear,” “this feels calm,” “this feels trustworthy.” Poor spacing they feel as exhaustion, doubt, or cheapness — often without naming the cause. This chapter exists so spatial relationships are **designed, not accumulated** — and so every future screen feels like the same home, even when everything else is refreshed.

---

**End of Chapter 8**


---

## Chapter 9 — Motion & Interaction System

**Section:** VI — Motion & Interaction  
**Status:** APPROVED
**Audience:** Product Design, UX, Content Design, Engineering Leadership, Reviewers  
**Authority:** Subordinate to Chapters 1–8; implements calm interaction and performance experience principles; behavioral layer only — no timing or implementation specification.

---

## 1. Purpose

This chapter defines how **movement and interaction** communicate meaning throughout the Rento product.

Motion is not visual decoration. Motion exists to improve **understanding, orientation, continuity, confidence, and perceived performance**. Every animation, transition, state change, and interaction must help users answer:

- **What changed?**  
- **Why did it change?**  
- **What can I do now?**

When motion fails, users feel lost, anxious, or delayed — even if the underlying task succeeded. In a housing marketplace, that feeling translates directly into mistrust.

This chapter defines **behavioral principles**, not implementation details. It does not specify durations, easing curves, frameworks, or technical mechanisms. Those belong in downstream specification. What belongs here is **when motion is appropriate**, **what it must communicate**, and **when stillness is the correct choice**.

Motion must reinforce Product Philosophy (Chapter 1), Experience Principles (Chapter 2), Layout Rhythm (Chapter 8), Typography (Chapter 6), and Semantic Color (Chapter 7). Motion never overrides trust, hierarchy, or calm.

---

## 2. Core Principles

### 2.1 Motion Communicates Change

Movement signals that something in the system state has changed. If nothing meaningful changed, motion is unnecessary.

### 2.2 Motion Preserves Orientation

Users must understand where they came from, where they are, and how to return. Transitions maintain spatial and contextual continuity — not spectacle.

### 2.3 Motion Reduces Uncertainty

Appropriate feedback after tap, save, filter, or navigation confirms that the product heard the user. Uncertainty during or after action erodes confidence.

### 2.4 Motion Supports Trust

Calm, predictable movement signals a controlled, professional product. Chaotic, theatrical, or deceptive motion signals the opposite.

### 2.5 Motion Should Disappear Behind Understanding

When motion works, users understand the outcome — not the animation. The best motion is noticed only when absent and needed.

### 2.6 Calm Movement Creates Premium Perception

Restrained motion aligns with European professional sensibility and Rento brand character (Chapter 3). Premium is smooth and intentional — not bouncy or showy.

### 2.7 No Decorative Animation

Motion without informational purpose is prohibited in core product flows. Delight is never a substitute for clarity.

### 2.8 Motion Never Delays Task Completion

Motion may accompany task completion — it may not unnecessarily postpone it. Respect for user time (Chapter 1) applies to interaction latency.

### 2.9 One Interaction, One Response

Each user action receives one clear system response. Competing animations, overlapping transitions, or ambiguous feedback violate predictability (Chapter 2).

### 2.10 Accessibility Is Non-Negotiable

Motion must have non-motion equivalents. Reduced-motion preferences are honored without losing meaning (see §7 and Accessibility section within Decision Rules context).

### 2.11 Instant When Appropriate

Not every action needs animation. Frequent, low-stakes actions may remain instant when motion would add noise without orientation benefit.

---

## 3. Motion Philosophy

### 3.1 Meaning Before Animation

Every proposed motion must name the **user question** it answers. If it answers none, it is removed.

### 3.2 Continuity Before Novelty

Familiar transition patterns across the product beat novel one-off animations. Consistency builds predictability; predictability builds trust.

### 3.3 Motion Supports Hierarchy

Motion may draw attention to **primary outcomes** — not to secondary metadata. Animation does not fix weak hierarchy (Chapters 4, 6, 8).

### 3.4 Animation Must Reduce Uncertainty

Acceptable motion leaves the user more certain than before. Motion that creates suspense, surprise, or confusion in housing flows is rejected.

### 3.5 The Three Questions

Every animation must answer:

| Question | Motion must clarify |
|----------|---------------------|
| What changed? | State, screen, layer, or content |
| Why? | User action, system process, or result |
| What now? | Next step, recovery, or continuation |

If any answer is missing, the motion is incomplete.

### 3.6 Partnership with Spatial System

Motion respects spatial rhythm (Chapter 8). Sheets rise from logical edges; content does not teleport without transition; skeletons match final layout rhythm.

### 3.7 Partnership with Semantic Color

State motion pairs with semantic roles (Chapter 7) — success, warning, critical — but **never relies on color alone**. Text and structure carry equal weight.

### 3.8 Performance Is Perceived Through Motion

How movement behaves during load, save, and navigation affects perceived quality (Chapter 20). Jank, jump, and stall read as unreliability.

---

## 4. Interaction Principles

Interaction is the contract between user intent and system response. Motion is one form of response — not the only form.

### 4.1 When Motion Supports Interaction

Motion is appropriate when it:

- Confirms input was received  
- Shows where new content came from  
- Explains layer changes (sheet, modal, fullscreen)  
- Preserves context during navigation  
- Smooths state change that would otherwise feel abrupt  
- Indicates ongoing process without blocking orientation  

### 4.2 When Interaction Should Remain Instant

Instant response is preferred when:

- Action is high-frequency and low-stakes (toggle, chip select)  
- Motion would repeat annoyingly across many items  
- User is comparing many listings rapidly  
- Delay would feel like system lag, not orientation  
- Reduced-motion mode is active  

Instant does not mean silent — non-motion feedback (state change, label, icon, haptic where available) still applies.

### 4.3 Tap and Press

**Tap** selects, activates, or navigates.  
**Press** state (where used) confirms affordance before release — brief, subtle, not theatrical.

Motion on press is minimal — enough to confirm touch, not enough to feel elastic or game-like. Primary actions and destructive actions receive equally clear press feedback — not equally loud.

### 4.4 Swipe and Drag

**Swipe** on gallery and media: navigates content within a bounded container; direction matches content flow.  
**Drag** on crop, reorder, or dismiss: direct manipulation — object follows intent; release commits or cancels clearly.

Swipe must not trigger unexpected navigation away from evaluation context. Drag must not fight scroll without clear affordance.

### 4.5 Scroll

Scroll is the primary marketplace motion. It must feel **natural, continuous, and respectful** — not hijacked. See §6 Scroll Experience.

### 4.6 Expand and Collapse

Expand reveals **advanced or detailed layer** (Chapter 4). Collapse returns to simpler layer without losing parent context.

Motion direction implies hierarchy: deeper content expands from its parent group; collapse returns upward in the information stack.

### 4.7 Bottom Sheets

Sheets present **one task layer** above paused context. Entry motion rises from bottom — task focus; exit returns context visibly.

Sheet motion must not expose navigation or actions beneath that compete with sheet primary task. Sheet open suspends underlying primary purpose until sheet closes.

### 4.8 Gallery

Gallery motion supports **inspection of housing evidence** — swipe between images, enter fullscreen for detail, exit returns to same image and scroll position.

Gallery motion is functional, not cinematic. No auto-advance slideshow on rental evaluation surfaces.

### 4.9 Search and Filters

Search: results update with continuity — user understands criteria changed and what differs.  
Filters: sheet open/close orients task; apply transition returns to browse with visible result of filter action.

Filter apply must answer: *What changed in results and why?*

### 4.10 Forms

Form interaction feedback is **inline and local** — field focus, validation, save state near the field or section.

Form success does not use celebration theatrics. Save confirmation is brief and clear.

### 4.11 Navigation

Navigation motion maintains **back stack mental model** — forward enters new context; back returns to prior context with position preserved where possible.

Role-based navigation (consumer, realtor) uses consistent transition family within each role.

---

## 5. Transition System

Transitions connect states. They must preserve continuity between previous and next state.

### 5.1 Screen Transitions

**Purpose:** Orient user to new screen purpose without disorientation.

**Principles:**

- Forward navigation: new context enters with clear direction; user understands progression.  
- Back navigation: prior context returns — not a unrelated slide from arbitrary direction.  
- Shared elements (listing image, title) may bridge card-to-detail continuity when they reinforce same-object identity.  
- Full screen replacement without continuity is reserved for role changes or auth gates — not casual browse.

### 5.2 Modal Transitions

Modals interrupt for **short, bounded tasks** — confirm, alert, single decision.

Entry: focus narrows to modal purpose.  
Exit: focus returns to trigger context.  
Background dimming signals pause — not deletion — of underlying content.

### 5.3 Bottom Sheet Transitions

Sheets are the default mobile pattern for filters, actions, and secondary tasks.

Entry: sheet and scrim together signal layered task.  
Exit: dismiss gesture or explicit close returns to underlying screen unchanged unless apply committed change.  
Partial height sheets expose that more content exists — without forcing scroll surprise.

### 5.4 Navigation Transitions

Bottom navigation switches major destinations. Transition is **subtle or instant** — user understands tab switch, not journey into new app.

Active destination state is clear without animated celebration on each switch.

### 5.5 Gallery and Image Preview

Enter preview: expansion from source image preserves object continuity.  
Exit preview: return to same image index and gallery position.  
Swipe within preview: horizontal content navigation only — not confused with back navigation.

### 5.6 Search Results Transitions

When query or filters change, results transition in a way that signals **set replacement or update** — not random reshuffle.

Empty-to-populated and populated-to-empty both orient user to cause (criteria, not system failure).

### 5.7 Loading Transitions

Load begins with **structure continuity** — skeleton or stable header — not blank void.

Content arrival fills prepared structure without layout jump. Loading transition answers: *something is coming in this shape*.

### 5.8 Skeletons

Skeleton motion (if any) is subtle pulse or static shape — not playful shimmer entertainment.

Skeleton grammar matches final spacing rhythm (Chapter 8).

### 5.9 Filtering and Sorting

Filter apply: sheet closes or updates; browse reflects new criteria with clear change in result set.  
Sort: order changes with stable card identity — user can track items where possible.

User must not wonder whether filters applied.

### 5.10 General Continuity Rules

- Outgoing state remains mentally available during short transitions.  
- Incoming state declares purpose immediately — within first glance timing (Chapter 4).  
- No chained transitions without user action between them.  
- Transition direction is consistent within a pattern family.

---

## 6. State Changes

State changes are moments of highest user anxiety. Motion must communicate confidence without creating unnecessary attention.

### 6.1 Loading

**Communicates:** System is working; structure is preserved; wait is bounded.  
**Motion character:** Calm progress or skeleton continuity — not indefinite spinner theater.  
**Prohibited:** Blank screen; layout collapse; loading that hides screen purpose.

### 6.2 Success

**Communicates:** Action completed.  
**Motion character:** Brief acknowledgment — then user continues.  
**Prohibited:** Confetti, prolonged celebration, success animation blocking next task on consumer paths.

### 6.3 Error

**Communicates:** Something failed; what it means; how to recover.  
**Motion character:** Stable, calm — error appears in context without violent shake or flash unless safety-critical.  
**Prohibited:** Alarm animation without recovery path; error motion that scares or blames.

### 6.4 Warning

**Communicates:** Attention needed; action may still be possible.  
**Motion character:** Subtle emphasis — not critical alarm.  
**Prohibited:** Warning animation loops that demand attention indefinitely.

### 6.5 Offline and Degraded Connectivity

**Communicates:** Connectivity limited; what still works; what is delayed.  
**Motion character:** Honest, non-alarming banner or inline state — not repeated modal interruption.  
**Prohibited:** Fake offline success; silent failure.

### 6.6 Empty States

**Communicates:** No content for this criteria; not product failure.  
**Motion character:** Static or gentle appear — dignity preserved.  
**Prohibited:** Bouncy empty illustrations that trivialize housing search.

### 6.7 Refreshing

**Communicates:** Content is updating; prior content may remain visible.  
**Motion character:** Pull-to-refresh or inline refresh indicator with clear completion.  
**Prohibited:** Full screen flash on refresh; losing scroll position without cause.

### 6.8 Saving

**Communicates:** Data is being stored; then saved or failed.  
**Motion character:** Inline on control or section — user not ripped from context.  
**Prohibited:** Blocking save animation on every keystroke; ambiguous saved state.

### 6.9 Uploading

**Communicates:** Media upload progress for listings or avatar.  
**Motion character:** Progress tied to upload object — image slot, profile area.  
**Prohibited:** Upload progress disconnected from what is uploading.

### 6.10 Deleting

**Communicates:** Removal is intentional; may be irreversible.  
**Motion character:** Confirm for destructive delete; removal motion exits object from its group clearly.  
**Prohibited:** Surprise delete without confirm; playful delete animation.

### 6.11 Verification

**Communicates:** Trust status changed or displayed.  
**Motion character:** Factual appear — not reward animation.  
**Prohibited:** Verification badge “celebration” on browse cards.

### 6.12 Moderation

**Communicates:** Listing state changed under review rules.  
**Motion character:** Clear status update for realtor; consumer paths avoid exposing confusing moderation theater.  
**Prohibited:** Consumer animation implying listing available when pending.

### 6.13 AI Responses

**Communicates:** Content is generating, editable, or awaiting review.  
**Motion character:** Distinct from verified fact appearance; streaming text does not mimic human verification.  
**Prohibited:** AI typing theatrics that imply human realtor is live responding unless true.

### 6.14 Scroll Experience

**Natural scrolling:** Content moves with finger; no scroll-jacking on evaluation paths.  
**Context preservation:** Back from detail returns to list position unless user explicitly refreshed.  
**Return position:** Scroll restoration is default for browse → detail → back.  
**Sticky elements:** Minimal — orientation or single primary action only; sticky excess breaks reading continuity.  
**Reading continuity:** Description and long content scroll without elements jumping under finger.  
**Momentum:** Native feel — not artificially accelerated or damped without cause.  
**Infinite scrolling:** If used, loading at end is calm; user understands more is loading — not that list restarted.  
**Section transitions:** Section boundaries felt through spacing rhythm (Chapter 8) — not snap traps mid-gesture.

---

## 7. Marketplace Interactions

Domain-specific motion principles. Semantic meaning stable across features.

### 7.1 Property Cards

Card tap navigates to detail with **continuity** from card image/title where possible.  
Press feedback subtle.  
No card auto-animation drawing attention while user scans feed.

### 7.2 Favorites

Favorite toggle: **instant state change** with clear selected vs unselected state — motion minimal.  
User comparing many listings must not wait per heart animation.

### 7.3 Gallery

Swipe between photos; tap for fullscreen inspect; exit returns to index.  
Counter and dots update in sync with swipe — no lagging identity.

### 7.4 Property Details

Layer transition from media to reading zone is deliberate spatial beat — not jarring jump.  
Trust block and price appear stable on load — no sequential “reveal” theatrics.  
Anchor jump to contact is smooth scroll — not disorienting teleport.

### 7.5 Contact Actions

Contact tap initiates external app or dial — system handoff is instant; in-app motion ends cleanly.  
No pre-contact animation delaying call or message.

### 7.6 Filters

Sheet motion; apply returns to feed with clear result change.  
Clear filters resets with same continuity grammar as apply.

### 7.7 Saved Searches

Creation and alert confirmation: brief success — then orient to where searches live.  
No motion implying listing availability changed.

### 7.8 Realtor Dashboard

Task blocks stable; list updates on status change with inline clarity — not full dashboard reload theater.  
Portfolio filter chips: instant selection feedback.

### 7.9 Admin Moderation

Operational state changes may use clearer transition — still calm.  
Approve/reject returns moderator to queue position with orientation preserved.

### 7.10 AI Suggestions

Generate, stream, edit, accept — each state visually distinct from published listing fact.  
Acceptance motion moves content from suggestion zone to canonical field — communicates One Source of Truth update.

### 7.11 Premium and Featured Listings

Promotion may not use motion that mimics verification or availability pulses.  
Featured appearance is static or subtly labeled — not animated “look at me” in feed.

---

## 8. Decision Rules

### Rule 1 — Foundation Alignment

Motion conflicting with Chapters 1–8 → reject.

### Rule 2 — Meaning Before Animation

Ask: *What user question does this motion answer?*  
If none → remove.

### Rule 3 — Continuity Before Novelty

Ask: *Does this match an existing transition family?*  
If not, justify or reject.

### Rule 4 — Hierarchy Respect

Ask: *Does motion draw attention to primary outcome only?*  
If it spotlights metadata → revise.

### Rule 5 — Uncertainty Reduction

Ask: *Is the user more certain after the motion?*  
If not → revise or remove.

### Rule 6 — One Interaction, One Response

Ask: *Is exactly one clear response visible?*  
If multiple compete → simplify.

### Rule 7 — Task Completion

Ask: *Does motion delay completion without orientation benefit?*  
If yes → shorten or remove.

### Rule 8 — Three Questions Test

Ask: *What changed? Why? What now?*  
Incomplete → incomplete motion.

### Rule 9 — Reduced Motion

Ask: *Is meaning preserved with reduced or no motion?*  
If not → add non-motion cues.

### Rule 10 — Accessibility Multimodal

Ask: *Is outcome clear without animation?*  
If not → fix.

### Rule 11 — Escalation

**Understanding** over delight. **Calm** over energy. **Instant** over animated for high-frequency actions. **Continuity** over spectacle.

---

## 9. Correct and Incorrect Examples

### 9.1 Card to Detail

**Correct:** Shared image bridges transition; user feels same listing; back returns to list position.  
**Incorrect:** Unrelated slide direction; back lands at list top always; user loses place.

### 9.2 Filter Sheet

**Correct:** Sheet rises; apply closes; results visibly reflect filters; nav does not compete during sheet.  
**Incorrect:** Sheet opens but apply hidden; results reshuffle with no apparent cause.

### 9.3 Favorite Toggle

**Correct:** Heart state changes instantly; optional subtle scale — no blocking animation.  
**Incorrect:** One-second heart burst on every toggle while scanning twenty cards.

### 9.4 Gallery Fullscreen

**Correct:** Expand from tapped image; swipe inside; close returns to same index.  
**Incorrect:** Random image shown on close; different crop disorients.

### 9.5 Save Profile

**Correct:** Inline saving indicator on button; brief saved confirmation; user stays in form context.  
**Incorrect:** Full-screen success confetti; form scroll reset.

### 9.6 Loading Feed

**Correct:** Card skeletons with stable rhythm; content fills without jump.  
**Incorrect:** Spinner only; cards pop in rearranging layout.

### 9.7 Error Network

**Correct:** Calm inline error with retry; scroll position preserved.  
**Incorrect:** Modal shake animation; data cleared.

### 9.8 AI Description Generate

**Correct:** Distinct generating state in suggestion zone; editable result; accept moves to description field clearly.  
**Incorrect:** AI text appears with verification styling; user unsure what is official.

### 9.9 Moderation Pending

**Correct:** Realtor sees status update calmly; consumer does not see false availability animation.  
**Incorrect:** Listing pulses “available” while pending.

### 9.10 Reduced Motion Mode

**Correct:** Sheet still opens/closes understandably with fade or instant; all outcomes labeled.  
**Incorrect:** Essential state change only visible through animation.

---

## 10. Common Mistakes

| Mistake | Harm |
|--------|------|
| Animation without meaning | Noise; distrust |
| Overlapping transitions | Disorientation |
| Slow interfaces | Time disrespect; abandonment |
| Motion replacing hierarchy | Comprehension failure |
| Unexpected movement | Anxiety; loss of control |
| Auto-playing attention seekers | Calm model broken |
| Excessive parallax | Cheap promotional feel |
| Competing animations | Uncertainty |
| Scroll hijacking | Reading continuity destroyed |
| Bouncy primary buttons | Non-premium; game-like |
| Celebration on routine success | Fatigue |
| No scroll position restore | Browse frustration |
| Gallery auto-play | Wrong category signal |
| Filter motion without result clarity | User distrusts apply |
| AI streaming mimicking live chat | False human presence |
| Featured listing pulse | Mimics urgency/verification |
| Ignoring reduced motion | Accessibility failure |
| Motion-only error signal | Invisible to many users |
| Layout jump on load | Perceived broken product |
| Chained animations on navigation | Delay; circus feel |

---

## 11. Future Scalability

### 11.1 AI Expansion

More AI features extend **distinct state grammar** — generate, review, accept — without new animation vocabulary per feature. AI must not become the loudest motion on screen.

### 11.2 PWA and Offline

Offline transitions are honest and calm — cached content appears with same continuity rules; sync states labeled without alarm.

### 11.3 Desktop and Tablet

Transition families may gain subtle spatial depth — not different logic. Hover states on desktop do not introduce motion consumer mobile users never see in testing.

### 11.4 Localization

Motion direction respects reading direction in locales — structure and meaning invariant; implementation adapts.

### 11.5 Enterprise and Admin

Admin may use slightly more explicit state transition for batch operations — still governed by calm principles; never imported to consumer browse.

### 11.6 Future Redesigns

Visual refresh may change motion **style** — not **grammar**. Sheet, navigation, gallery, and state families persist. Redesign documents motion pattern mapping before ship.

### 11.7 Marketplace Growth

Larger feeds increase need for **instant high-frequency interactions** and **stable scroll restoration** — not more card entrance animation.

### 11.8 Performance Evolution

Faster devices do not justify longer animations. Performance gains should shorten perceived wait — not lengthen shows.

### 11.9 Governance

New motion patterns require: user question answered, pattern family named, reduced-motion alternative, three-questions test pass, and Design Director approval for new families.

---

## 12. Design Director Review

**Chapter:** 9 — Motion & Interaction System  
**Section:** VI — Motion & Interaction  
**Review type:** Initial standard adoption

### 12.1 Approval Statement

This chapter is approved as the **motion and interaction behavior contract** for Rento. All movement, transitions, and interaction feedback must comply. Implementation specifications are subordinate to this chapter.

### 12.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Calm, respect for time, trust |
| Chapter 2 — Experience Principles | Predictability, recovery, cognitive load |
| Chapter 5 — Product Design Decision Framework | Conflict resolution under pressure |
| Chapter 7 — Color Meaning | State semantics paired with motion |
| Chapter 8 — Spatial System & Layout Rhythm | Continuity, sheet rhythm, scroll |
| Chapter 17 — States & Feedback | Extended state copy and structure |
| Chapter 20 — Performance Experience | Perceived performance through motion |
| Chapter 43 — Motion Philosophy (legacy numbering in full standard) | Merged into this chapter in v1 structure |
| Chapter 53 — AI Assisted Experience | AI motion boundaries |
| Chapter 60 — Product Review Checklist | Motion compliance at ship gate |

### 12.3 Review Criteria for Future Amendments

Amendments must answer:

1. What orientation or uncertainty failure is not prevented?  
2. Can existing transition family extend instead of new vocabulary?  
3. Does change preserve calm, accessibility, and task completion?  
4. Will behavior remain valid across platforms and redesigns?

New motion families require Design Council approval.

### 12.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on motion grammar changes |
| Mobile UX Architect | Scroll, sheet, and gesture fidelity |
| Senior UX Designer | State change and recovery behavior |
| Accessibility Specialist | Reduced motion and multimodal feedback |
| Head of Product Design | Cross-surface pattern consistency |

### 12.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new interaction and motion work immediately. Existing motion aligns during scheduled improvement cycles.

### 12.6 Design Director Closing Note

Users should never leave an interaction wondering whether the product heard them, whether the listing is still the same listing, or whether they are lost. Motion is how the product speaks between states — and in housing, that voice must be calm, honest, and brief. This chapter exists so movement earns trust instead of spending it.

---

**End of Chapter 9**


---

## Chapter 10 — Navigation System

**Section:** VII — Navigation  
**Status:** APPROVED
**Audience:** Product Design, UX, Product Management, Content Design, Reviewers  
**Authority:** Subordinate to Chapters 1–9; implements Information Architecture (Chapter 4); partners with Motion & Interaction (Chapter 9) and Spatial System (Chapter 8); defines principles only — not implementation.

---

## 1. Purpose

This chapter defines the complete **navigation philosophy and navigation architecture** for Rento.

Navigation is not a collection of menus. Navigation is the user’s **mental model of the product** — how they understand where they are, what they can do, and how they move toward goals.

At every moment, users must be able to answer:

- **Where am I?**  
- **How did I get here?**  
- **What can I do here?**  
- **Where can I go next?**  
- **How do I return?**

When navigation fails, users feel lost, anxious, or trapped — even on a screen that is visually polished. In long-term rental decisions, disorientation reads as untrustworthiness.

Navigation must **reduce cognitive effort** while **increasing confidence and orientation**. It must reflect information architecture (Chapter 4), respect role boundaries (Chapter 1), support calm interaction (Chapters 2 and 9), and remain valid regardless of future visual redesign.

This chapter defines **how users move through Rento as a product** — not how menus are built.

---

## 2. Core Principles

### 2.1 Navigation Provides Orientation

The primary job of navigation is orientation — not feature exposure. Every navigation element must help users answer the five orientation questions.

### 2.2 Navigation Must Not Compete With Content

On evaluation and conversion surfaces, **content leads** — listings, facts, people, actions. Navigation supports; it does not dominate first glance hierarchy.

### 2.3 Users Navigate Toward Goals, Not Pages

Navigation is organized around user intent — find a home, save a listing, contact a realtor, publish a property — not around internal page names or org charts.

### 2.4 Navigation Reduces Uncertainty

Predictable paths, visible current location, and reliable return behavior reduce anxiety. Uncertain navigation increases abandonment.

### 2.5 Navigation Reflects Information Architecture

Navigation structure mirrors IA (Chapter 4). If navigation and architecture disagree, users learn a false model of the product.

### 2.6 Navigation Disappears Behind Intention

When navigation works, users pursue goals without thinking about chrome. Navigation is felt only when it fails or when role context changes.

### 2.7 One Primary Path Per Goal

For each user goal in a context, there is one obvious primary path. Alternate paths exist but are subordinate — not competing highways.

### 2.8 Role Clarity

Users always know which role context they operate in — visitor, consumer, realtor, administrator. Navigation must not blur roles or expose irrelevant destinations.

### 2.9 Return Is a First-Class Journey

Back is not an afterthought. Return paths preserve context, position, and task state wherever product rules allow.

### 2.10 No Hidden Destinations

Core destinations and escape paths are discoverable without secret gestures or undocumented entry points. Efficiency shortcuts may exist for experts — they do not replace discoverable structure.

### 2.11 Navigation Scales Through Consistency

New features attach to existing navigation families before inventing new top-level models.

---

## 3. Navigation Philosophy

### 3.1 Orientation Over Feature Catalog

Navigation exposes **what users need for their current role and task** — not every capability the product has ever shipped.

### 3.2 Content Before Menus

Menus, bars, and switches are justified only when they accelerate orientation or goal completion. Menus must not replace clear content hierarchy.

### 3.3 Goals, Not Screens

Design reviews name user goals: *evaluate listing*, *refine search*, *complete profile* — not *go to screen X*. Navigation serves goals.

### 3.4 Uncertainty Is a Defect

If users hesitate about where they are or how to return, navigation has failed — regardless of visual quality.

### 3.5 IA Is the Skeleton; Navigation Is the Map

Chapter 4 defines structure. This chapter defines how users **move through** that structure without getting lost.

### 3.6 Calm Navigation

Navigation does not shout. Active state is clear but restrained (Chapters 3, 7, 9). Urgency in navigation is reserved for genuine user-relevant states — not growth hacks.

### 3.7 Search Is Navigation

Search, filters, and saved criteria are navigation mechanisms — not separate from the product model. They must integrate with browse and return behavior coherently.

### 3.8 Deep Links Respect Mental Model

External entry to a listing or profile must still allow users to orient — where they are, what product area they are in, how to explore outward.

---

## 4. Navigation Architecture

Rento’s navigation architecture is **mobile-first, goal-oriented, and role-aware**. It consists of layered navigation types that cooperate — never compete at the same hierarchy level.

### 4.1 Architecture Overview

| Layer | Function |
|-------|----------|
| **Global** | Cross-product orientation — major destinations, role home |
| **Primary** | Main movement within a role’s daily use |
| **Secondary** | Supporting destinations within a section |
| **Contextual** | Actions and movement tied to current object (listing, profile) |
| **Task** | Temporary focus on one job (filters, contact, edit) |
| **Emergency** | Escape from error, auth gate, or blocked state |

Only one layer may be **dominant** at a time. Task navigation suspends primary navigation dominance until task completes.

### 4.2 Consumer Architecture

**Home base:** Browse / discovery  
**Persistent primary destinations:** Home, Favorites, Profile (and Filters entry on home)  
**Object depth:** Listing detail — entered from browse, favorites, or link  
**Task layers:** Filter sheet, share, report, contact handoff  
**Conversion surfaces:** Detail may hide global primary nav to prioritize evaluation and contact — user still orients via back and screen purpose

### 4.3 Realtor Architecture

**Home base:** Workspace dashboard  
**Persistent access:** Return to workspace from profile, listing edit, create flows  
**Object depth:** Listing edit, gallery management, property detail preview  
**Task layers:** Create listing, avatar upload, bottom action sheets  
**Separation:** Realtor operational navigation does not replace consumer browse model — role switch is explicit

### 4.4 Admin Architecture

**Home base:** Moderation / operations entry appropriate to admin role  
**Density:** Higher destination count permitted — not exported to consumer  
**Return:** Queue position and filter context preserved after item action

### 4.5 Visitor Architecture

**Limited destinations:** Browse, listing detail, authentication entry  
**No false affordances:** Features requiring account do not navigate into dead ends — they orient to sign-in with return context

### 4.6 Cross-Architecture Rules

- Same object (listing) may be reached from multiple parents — return behavior respects parent context.  
- Role change is always explicit — never accidental via navigation alone.  
- Authentication gates preserve intended destination after success where product rules allow.

---

## 5. Navigation Hierarchy

### 5.1 Global Navigation

**Purpose:** Orient user to major product territories.  
**When appropriate:** Persistent on consumer browse paths; role-aware entries (e.g., realtor workspace when role applies).  
**When not appropriate:** Dominating conversion-focused detail where evaluation and contact are primary — global nav may yield if orientation via back remains clear.

**Rules:** Few destinations; stable positions; labels match mental model (Home, Favorites, Profile — not internal jargon).

### 5.2 Primary Navigation

**Purpose:** Daily movement within active role.  
**When appropriate:** Consumer main tabs; realtor entry to workspace from consumer shell when dual-role.  
**Rules:** One active destination clear; switching primary destination resets section context intentionally — user understands tab switch.

### 5.3 Secondary Navigation

**Purpose:** Movement within a section — filters, sort, workspace sub-areas.  
**When appropriate:** Filter chips, section links, “back to dashboard” from profile.  
**Rules:** Subordinate visual and structural weight to section content.

### 5.4 Contextual Navigation

**Purpose:** Movement tied to current listing or object — view photos, contact realtor, edit listing.  
**When appropriate:** On detail, card actions, workspace card edit.  
**Rules:** Contextual actions do not redefine global location; user still knows parent screen.

### 5.5 Inline Navigation

**Purpose:** Within-content links — jump to contact, complete profile, suggested next step.  
**When appropriate:** Trust block to contact zone; profile completion link from workspace.  
**Rules:** Target is clear before tap; anchor jumps preserve scroll context where possible (Chapter 9).

### 5.6 Temporary Navigation

**Purpose:** Sheets, modals, overlays for bounded tasks.  
**When appropriate:** Filters, action menus, confirmations.  
**Rules:** Underlying location paused but not forgotten; dismiss returns to prior context; task nav hidden while sheet open when conflict would occur (Chapter 9).

### 5.7 Task Navigation

**Purpose:** Complete one job — apply filters, save profile, publish listing.  
**When appropriate:** Filter apply, form submit, multi-step create.  
**Rules:** One dominant task action; clear completion or cancel; no competing primary paths inside task.

### 5.8 Emergency Navigation

**Purpose:** Recovery from error, auth requirement, permission denial.  
**When appropriate:** Access denied, session expired, network failure blocking task.  
**Rules:** Always offers next step — retry, sign in, go home, contact support path if defined. No dead ends (Chapter 1).

---

## 6. Navigation Behaviors

### 6.1 Mental Model Formation

Users build mental model from:

| Element | What user learns |
|---------|------------------|
| **Current location** | Which product area and role context |
| **Previous location** | Where back will return |
| **Next possible actions** | What goals this screen enables |
| **Navigation history** | Stack of objects explored (listings viewed) |
| **Role awareness** | Consumer vs realtor vs visitor |
| **Context awareness** | Which listing, which filter set, which draft |
| **Destination confidence** | Predicting outcome before tap |

Navigation design must reinforce all seven — not only current location.

### 6.2 Location Signaling

Location is communicated through:

- Screen title and primary heading (Chapter 6)  
- Active primary destination state  
- Breadcrumb logic in user’s head — back stack, not necessarily visible breadcrumb UI  
- Object identity on detail (listing title, realtor name)

Location is never communicated by decoration alone.

### 6.3 Forward Navigation

Forward movement deepens context (browse → detail → contact) or switches primary destination (home → favorites).  
User must predict depth: *am I leaving the list or adding to it?*

### 6.4 Back Navigation

**Return behavior:** Back returns to logical parent — list from detail, dashboard from profile, prior step in wizard.  
**Scroll restoration:** Browse position restored on list → detail → back unless user refreshed or criteria changed.  
**Context restoration:** Active filters, search query, and draft form state preserved per product rules.  
**Interrupted tasks:** Sheet dismissed returns to paused screen; partial form work preserved where possible.  
**Deep links:** Entry from external link orients to listing with path outward to browse and home — user not trapped in orphan screen.  
**External return:** Handoff to phone, messaging, or browser returns user to Rento with session and context intact where OS allows.

Back must never surprise by skipping levels or landing on wrong role home without cause.

### 6.5 Search Navigation

**Search as navigation:** Changing criteria navigates to a new result set — user understands they are still in browse territory with different lens.  
**Filters:** Filter sheet is task navigation; apply returns to browse with updated set.  
**Saved searches:** Saved criteria are **bookmarked navigation states** — user returns to same lens intentionally.  
**History:** Recent searches (if offered) accelerate return to prior navigation states — clearly labeled, not confused with saved intent.  
**Recent activity:** Recently viewed listings are navigation memory — distinct from favorites (intent to save).  
**Recommendations:** If offered, recommendations are discovery navigation — disclosed if algorithmic or promoted; do not masquerade as organic browse.

### 6.6 Role Transitions

Visitor → consumer: authentication with optional return destination.  
Consumer → realtor: explicit “become realtor” or workspace entry when role granted — not hidden in profile settings alone.  
Realtor → consumer browse: user may view marketplace as renter; role context clear when switching to workspace.  
Admin: separate entry; consumers never land in admin via normal navigation.

### 6.7 Accessibility Behaviors

**Keyboard navigation:** Logical focus order follows visual reading order; all destinations operable without pointer where platform supports.  
**Screen readers:** Current location and role announced; navigation landmarks meaningful — not “button button.”  
**Focus order:** Enters task layers trap focus appropriately; exit restores focus to trigger.  
**Reduced cognitive load:** Few primary destinations; consistent labels; no duplicate paths to same goal with different names.  
**Large touch targets:** Navigation actions meet comfortable touch spacing (Chapter 8) — navigation must not be the smallest tap on screen.  
**Predictable navigation:** Same gesture, same outcome across product — back always back, primary switch always switch.

---

## 7. Marketplace Navigation

Natural movement patterns between major areas.

### 7.1 Browse

**Entry:** App open, home, post-auth.  
**Movement outward:** Detail, filters, favorites (save), profile/auth.  
**Mental model:** “I am scanning the market.”  
**Rules:** Primary nav visible; filter as task; card tap deepens without losing list memory on return.

### 7.2 Search and Filters

**Entry:** Filter control from browse.  
**Movement:** Apply → browse with criteria; clear → broader set; close without apply → prior set unchanged.  
**Mental model:** “I am refining what I see.”  
**Rules:** Criteria visible on return where material; no silent filter state.

### 7.3 Property Detail

**Entry:** Card, favorite, link, share URL.  
**Movement:** Back to parent; contact handoff; favorite; share; report; optional jump to contact zone.  
**Mental model:** “I am evaluating one home.”  
**Rules:** Global primary nav may yield; back and title orient; contact after comprehension; deep link orients outward paths.

### 7.4 Gallery

**Entry:** From detail media.  
**Movement:** Swipe within gallery; fullscreen inspect; exit to same detail position.  
**Mental model:** “I am inspecting photos — still on this listing.”  
**Rules:** Gallery is depth within detail — not separate product area; exit does not land on wrong listing.

### 7.5 Favorites

**Entry:** Primary nav.  
**Movement:** To detail; back to favorites list; empty state to browse.  
**Mental model:** “I am reviewing saved options.”  
**Rules:** Same detail grammar as browse; return to favorites list position where possible.

### 7.6 Profile

**Entry:** Primary nav (authenticated) or auth entry (visitor).  
**Movement:** Logout to home; realtor promo to become realtor; settings sub-areas.  
**Mental model:** “I am managing my account.”  
**Rules:** Distinct from realtor workspace; role-appropriate links only.

### 7.7 Realtor Workspace

**Entry:** Primary nav when realtor role; post-role grant.  
**Movement:** Profile edit, create listing, edit listing, preview public detail, back to workspace.  
**Mental model:** “I am operating my business on Rento.”  
**Rules:** Dashboard as home; next-action blocks are inline navigation — not competing global models.

### 7.8 Admin Workspace

**Entry:** Admin auth only.  
**Movement:** Queue → item → action → return to queue; user management parallel pattern.  
**Mental model:** “I am moderating or operating the platform.”  
**Rules:** Never linked from consumer primary nav; return preserves queue context.

### 7.9 Become Realtor

**Entry:** Profile promo, marketing entry, post-application.  
**Movement:** Application flow → pending state → workspace when approved.  
**Mental model:** “I am joining as a professional.”  
**Rules:** Clear status at each step; no false workspace access before grant.

### 7.10 Authentication

**Entry:** Gated action or profile tab when logged out.  
**Movement:** Success → return destination or sensible default home; cancel → prior public context.  
**Mental model:** “I am signing in to continue.”  
**Rules:** Auth is gate navigation — not a maze; destination after login communicated.

---

## 8. Decision Rules

### Rule 1 — Foundation Alignment

Navigation conflicting with Chapters 1–9 → reject.

### Rule 2 — Navigation Before Shortcuts

Ask: *Is the primary path discoverable without hidden gesture?*  
Shortcuts are additive — not replacement.

### Rule 3 — Orientation Before Speed

Ask: *Does faster path reduce user’s ability to know where they are?*  
If yes, slow slightly with clarity — not disorientation.

### Rule 4 — One Primary Path

Ask: *Is there one obvious path for this goal in this context?*  
If multiple compete equally, resolve hierarchy.

### Rule 5 — No Hidden Destinations

Ask: *Can a new user find this destination within two logical steps from a home base?*  
If core feature, must be yes or explicitly phased with documentation.

### Rule 6 — Consistency Before Optimization

Ask: *Does this match established navigation family?*  
Local optimization that breaks model → reject or exception (Chapter 5).

### Rule 7 — Role Clarity Before Flexibility

Ask: *Is role context obvious?*  
Flexible multi-role access must not blur responsibility surfaces.

### Rule 8 — Content Before Menus

Ask: *Does navigation steal first-glance from content?*  
On evaluation screens, yield if back orients.

### Rule 9 — Back Integrity

Ask: *Where does back go — and will user predict it?*  
Surprise → fix.

### Rule 10 — Task Suspension

Ask: *When task layer opens, does underlying nav conflict?*  
If yes, suspend competing nav until task completes.

### Rule 11 — Search Integration

Ask: *Does filter/search change feel like navigation within browse — not teleport?*  
If not, clarify state.

### Rule 12 — Escalation

**Orientation** over feature count. **Predictability** over novelty. **Return context** over shallow stacks. **Role clarity** over unified mega-menu.

---

## 9. Correct and Incorrect Examples

### 9.1 Browse to Detail to Back

**Correct:** User opens listing, evaluates, back returns to same scroll position in same filter context.  
**Incorrect:** Back lands on home reset or loses filters silently.

### 9.2 Filter Sheet

**Correct:** Open filters, apply, return to browse with visible criteria effect; nav hidden during sheet if it competed with apply.  
**Incorrect:** Filters open but user unsure if applied; nav overlaps apply.

### 9.3 Detail Without Bottom Nav

**Correct:** User orients via title and back; evaluation uninterrupted; path to favorites/share clear.  
**Incorrect:** User trapped — no back, no home path, no orientation.

### 9.4 Deep Link to Listing

**Correct:** Listing opens; user can reach browse and home; understands they are on one property.  
**Incorrect:** Orphan listing with no outward navigation.

### 9.5 Realtor Role

**Correct:** Consumer sees realtor tab only when role exists; workspace distinct from profile; “back to dashboard” from profile edit.  
**Incorrect:** Realtor tools scattered in consumer profile without workspace home.

### 9.6 Auth Gate

**Correct:** Save favorite while logged out → sign in → return to listing or favorites intent.  
**Incorrect:** Sign in → generic home with lost listing context.

### 9.7 Favorites Empty

**Correct:** Empty favorites explains; dominant path to browse.  
**Incorrect:** Dead end with no navigation forward.

### 9.8 Admin Moderation

**Correct:** Approve item → return to queue at prior position; filters intact.  
**Incorrect:** Random admin home after each action.

### 9.9 Inline Jump to Contact

**Correct:** Trust block jump scrolls to contact zone; user still on same listing; back still returns to list parent.  
**Incorrect:** Jump opens new mystery layer or loses scroll context irrecoverably.

### 9.10 Become Realtor

**Correct:** Application status clear; approved users guided to workspace; pending users know wait state and return path.  
**Incorrect:** Pending users see full workspace nav without access.

---

## 10. Common Mistakes

| Mistake | Navigation harm |
|--------|------------------|
| Too many navigation levels | Cognitive overload |
| Changing menu locations between releases | Model destruction |
| Multiple primary paths to same goal | Hesitation |
| Unexpected back behavior | Anxiety; distrust |
| Hidden navigation | Discoverability failure |
| Context loss on return | Browse fatigue |
| Duplicate destinations with different labels | Model fracture |
| Role confusion | Wrong actions; trust loss |
| Navigation replacing search clarity | Users lost in criteria |
| Global nav on conversion detail without back clarity | Orientation failure |
| Sheet without dismiss path | Trapped user |
| Auth without return destination | Abandonment |
| Deep link without outward paths | Orphan screens |
| Recommendations undifferentiated from browse | False mental model |
| Admin links in consumer nav | Role violation |
| Breadcrumb theater without working back | False orientation |
| Gestures as only back path | Accessibility and discoverability fail |
| Tab switch losing unsaved work without warning | Task betrayal |
| Filter state invisible after apply | Navigation uncertainty |
| Workspace stats as navigation substitute | Portfolio list buried |

---

## 11. Future Scalability

### 11.1 AI Features

AI entry points are **task or contextual navigation** — search assist, description help — not new global territory unless product phase justifies. AI must not hijack primary nav with persistent “assistant” that obscures orientation.

### 11.2 PWA and Install

Installed app uses same mental model as browser — home, browse, detail, back. Launch screen orients to last sensible home — not random deep state without context.

### 11.3 Offline

Offline mode clarifies which navigation destinations work — browse cached, contact delayed. Navigation labels honest about limits.

### 11.4 Desktop and Tablet

Additional horizontal space may expose secondary navigation — **same hierarchy**, not new product map. Primary destinations remain stable.

### 11.5 Enterprise and Agency

Agency dashboards may add secondary nav density — subordinate to workspace family; consumer map unchanged.

### 11.6 Localization

Destination labels translate; navigation **structure and count** remain stable. RTL locales mirror flow logic — goals invariant.

### 11.7 Marketplace Expansion

New cities, categories, or adjacent markets attach to browse and detail patterns — not new top-level nav per city.

### 11.8 Future Modules

Chat, scheduling, payments — each maps to contextual or task navigation first. New global tabs require council approval and IA update.

### 11.9 White-Label

Partner variants may change labels and branding — **navigation architecture and role model invariant**. Partners may not redefine consumer/realtor/admin separation.

### 11.10 Governance

New primary destinations require: user goal, role, IA placement, back behavior, accessibility review, and five-year test.

---

## 12. Design Director Review

**Chapter:** 10 — Navigation System  
**Section:** VII — Navigation  
**Review type:** Initial standard adoption

### 12.1 Approval Statement

This chapter is approved as the **navigation philosophy and architecture contract** for Rento. All movement between product areas must comply. Visual navigation patterns implement this chapter — they do not redefine mental model.

### 12.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | No dead ends; role respect |
| Chapter 4 — Layout & Information Architecture | IA parent of navigation map |
| Chapter 5 — Product Design Decision Framework | Conflict and exception resolution |
| Chapter 8 — Spatial System & Layout Rhythm | Sheet and section coordination |
| Chapter 9 — Motion & Interaction System | Transition and back continuity |
| Chapter 11 — Information Architecture (extended) | Detailed IA when split in full standard |
| Chapter 12 — Marketplace Experience | Consumer flow application |
| Chapter 16 — Realtor Workspace UX | B2B navigation application |
| Chapter 33 — Navigation Standards | Pattern implementation — subordinate |
| Chapter 60 — Product Review Checklist | Navigation compliance at ship gate |

### 12.3 Review Criteria for Future Amendments

Amendments must answer:

1. What orientation failure is not prevented?  
2. Can existing navigation family absorb the destination?  
3. Does change preserve role clarity and back integrity?  
4. Will mental model remain valid across platforms and years?

New primary destinations or architecture changes require Design Council approval.

### 12.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on architecture changes |
| Mobile UX Architect | Back, scroll, sheet, and thumb-path fidelity |
| Head of Product Design | Cross-role consistency |
| Senior UX Designer | Flow and mental model review |
| Accessibility Specialist | Focus order and landmark quality |

### 12.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new navigation design immediately. Existing flows align during scheduled improvement cycles.

### 12.6 Design Director Closing Note

Users do not memorize Rento’s menu structure. They memorize **how it feels to move** — whether return works, whether filters stick, whether detail feels like depth or a trap. Navigation is the product’s geography. This chapter exists so that geography stays coherent as features, roles, and markets multiply — and so every team builds the same map, years apart.

---

**End of Chapter 10**


---

## Chapter 11 — Component Philosophy & Component System

**Section:** VIII — Design System  
**Status:** APPROVED
**Audience:** Product Design, UX, Engineering Leadership, Brand, Reviewers  
**Authority:** Subordinate to Chapters 1–10; governs how reusable product behaviors are created and maintained; does not specify implementation, APIs, or visual tokens.

---

## 1. Purpose

This chapter defines the **philosophy, lifecycle, hierarchy, and governance** of UI components in Rento.

Components are not visual widgets. Components are **reusable product behaviors** that express the design language established in Chapters 1–10 — philosophy, experience, brand character, structure, typography, color meaning, spatial rhythm, motion, and navigation.

A button is not defined here as a rectangle with text. It is defined as a **predictable action affordance** with one semantic purpose, inheriting hierarchy, calm motion, and accessible feedback. A listing card is not a layout box — it is a **scannable housing unit** with stable reading order and marketplace rhythm.

This chapter defines how components are **created, evaluated, reused, evolved, and retired**. The goal is long-term consistency while the product grows **without component proliferation** — parallel solutions, variant explosion, and decorative duplication.

Implementation belongs elsewhere. This chapter belongs to **product language governance**.

---

## 2. Core Principles

### 2.1 Components Express Product Language

Every component must embody Chapters 1–10. A component that looks correct but violates trust, hierarchy, or navigation model is non-compliant.

### 2.2 Components Reduce Cognitive Load

Reuse teaches users once. Familiar components accelerate comprehension on new screens and features.

### 2.3 Components Solve Recurring Problems

A component exists because the same user problem appears repeatedly — not because a screen needed a one-off visual solution.

### 2.4 Components Are Behaviors, Not Decorations

Components communicate state, enable action, and preserve orientation. Ornament without responsibility is not a component — it is noise.

### 2.5 One Primary Responsibility

Each component answers one primary user question or enables one primary job in its context. Secondary capabilities are subordinate.

### 2.6 Components Evolve Rather Than Multiply

When needs change, existing components **evolve** through controlled versions. New parallel components are the last resort — not the first response.

### 2.7 Composition Over Proliferation

Complex surfaces are built by composing governed components — not by inventing screen-specific hybrids that never generalize.

### 2.8 Inheritance of Standards

Every component inherits accessibility, typography roles, semantic color, spatial rhythm, motion grammar, and navigation behavior — none are optional overlays.

### 2.9 Predictability Is a Feature

Users predict component behavior from prior encounters. Unpredictable “special” variants erode trust.

### 2.10 Retirement Is Healthy

Obsolete components are deprecated and retired — not left alongside replacements indefinitely.

---

## 3. Component Philosophy

### 3.1 Language, Not Library

The component system is how Rento **speaks consistently** across marketplace, workspace, and admin. The library is an implementation artifact; the language is the standard.

### 3.2 Problem-First Creation

Components are proposed by naming:

- The **recurring user problem**  
- The **hierarchy level** of information involved (Chapter 4)  
- The **navigation layer** they belong to (Chapter 10)  
- The **semantic roles** they use (Chapters 6–7)  

Visual appearance follows responsibility — not the reverse.

### 3.3 Single Semantic Purpose

Each component maps to one semantic purpose in context: select, confirm, display primary fact, indicate trust, navigate back, filter set, etc. Multi-purpose chameleon components are rejected.

### 3.4 Behavioral Contract

Users expect:

- Same input → same outcome  
- Same state → same meaning  
- Same role → same position in reading order  

Behavioral contract matters more than visual refresh.

### 3.5 Customization Boundaries

Components allow variation only along **documented axes** — density context, role, state — not arbitrary per-screen styling. Consistency before customization (Chapter 5).

### 3.6 Screen-Specific Logic Stays Out of Components

Business rules and role permissions live in product logic layers — not embedded invisibly inside presentation components in ways that create hidden variants.

### 3.7 Components Serve Screens; Screens Do Not Invent Language

Screens compose components. Screens do not introduce one-off typography, color, spacing, or motion dialects that bypass the system.

### 3.8 Documentation Is Part of the Component

A component without documented responsibility, states, accessibility expectations, and chapter alignment is not approved — it is a draft.

---

## 4. Component Hierarchy

Conceptual levels from atomic standards to full experiences. Higher levels compose lower levels; lower levels never embed screen-specific orchestration.

### 4.1 Foundation

**Responsibility:** Non-visual and minimally visual primitives of the language — typography roles, semantic color roles, spacing relationships, motion families, navigation layers.

**Examples (conceptual):** Primary text role, verification semantic, card rhythm unit, sheet transition family.

**Rule:** Foundation is defined in Chapters 6–10. Components must reference foundation — not redefine it.

### 4.2 Primitive

**Responsibility:** Smallest reusable interactive or presentational unit with one job — label, value pair, icon affordance, single action trigger, status indicator, media frame.

**Characteristics:** Highly reused; strict behavioral contract; minimal configuration.

**Rule:** Primitives do not contain marketplace-specific copy or layout orchestration.

### 4.3 Composite

**Responsibility:** Primitives combined to answer one grouped user question — price group, identity row, verification pill with label, field with validation message.

**Characteristics:** Stable internal proximity (Chapter 8); one semantic group.

**Rule:** Composites are the main unit of reuse on cards and forms.

### 4.4 Pattern

**Responsibility:** Recurring product construct with known behavior across contexts — listing card, filter sheet, empty state block, contact action group, trust block, moderation status banner.

**Characteristics:** Cross-screen reuse; defines reading order and state set.

**Rule:** New screens adopt patterns before proposing pattern variants.

### 4.5 Section

**Responsibility:** Major content region on a screen — decision group, description block, contact chapter, dashboard hero, portfolio list header.

**Characteristics:** Maps to IA layers (Chapter 4); section rhythm (Chapter 8).

**Rule:** Sections compose patterns; they are not one-off layouts.

### 4.6 Template

**Responsibility:** Ordered assembly of sections for a screen type — browse feed template, listing detail template, workspace dashboard template, profile form template.

**Characteristics:** Defines layer order: glance → decision → detail → action.

**Rule:** Templates change rarely; patterns within evolve.

### 4.7 Screen

**Responsibility:** Specific instance with real data, role context, and edge states — not a new language.

**Characteristics:** Fills template; does not invent parallel components for standard jobs.

**Rule:** Screen review checks template compliance and exception register (Chapter 5).

### 4.8 Hierarchy Discipline

| Level | May compose | May not |
|-------|-------------|---------|
| Foundation | — | Contain screen logic |
| Primitive | Foundation | Orchestrate sections |
| Composite | Primitives | Define new patterns without approval |
| Pattern | Composites, primitives | Redefine templates ad hoc |
| Section | Patterns | Invent new primitives casually |
| Template | Sections | Break IA without council |
| Screen | Template | Bypass system silently |

---

## 5. Component Lifecycle

### 5.1 Creation

**When:** A recurring problem appears on **three or more** surfaces or **two or more** teams independently solve the same problem — or one surface’s solution is clearly generalizable.

**Requirements before creation:**

- Problem statement and user goal  
- Proposed hierarchy level and navigation layer  
- Foundation alignment checklist (Chapters 6–10)  
- Accessibility inheritance plan  
- Naming that matches verbal identity (Chapter 8)  

**Output:** Draft component specification — responsibility, states, relationships — not visual mockup alone.

### 5.2 Validation

**When:** Before adoption beyond originating team.

**Validation includes:**

- Design review against Chapters 1–10  
- Behavioral predictability test  
- State completeness (loading, empty, error, success)  
- Reduced-motion and non-color meaning check  
- Multilingual expansion tolerance  
- Five-year scalability test (Chapter 5)  

**Outcomes:** Approve, revise, merge with existing component, or reject.

### 5.3 Adoption

**When:** Validation passed; documented in component catalog.

**Adoption rules:**

- New work must search catalog first  
- Adoption preferred over local duplication  
- Adoption may require minor screen refactor — acceptable cost for consistency  

### 5.4 Evolution

**When:** User need changes, foundation chapter updates, or accessibility standard tightens.

**Evolution rules:**

- Version philosophy: **compatible evolution** preferred — existing screens migrate on schedule  
- Breaking behavior change requires migration plan and council notice  
- Visual refresh may change style — not semantic purpose without approval  

### 5.5 Deprecation

**When:** Superior component replaces function; pattern violates updated standard; variant unused across product for defined review cycle.

**Deprecation rules:**

- Deprecated components marked — no new adoption  
- Existing uses scheduled for migration  
- Deprecation reason documented  

### 5.6 Retirement

**When:** Migration complete; no production surface depends on deprecated component.

**Retirement rules:**

- Removed from catalog active list; archived for reference  
- Anti-pattern registered if misuse was common (Chapter 59)  

---

## 6. Reuse Strategy

### 6.1 Reuse Before Create

Teams must demonstrate catalog search and why existing pattern, composite, or primitive cannot serve the need.

### 6.2 Extend Before Duplicate

If gap is small, extend documented variant axis — not fork new component.

### 6.3 Compose Before Invent

Build sections from patterns and composites. Invent new pattern only when composition honestly fails.

### 6.4 Split Only When Responsibility Diverges

Split one component into two when:

- Two primary responsibilities emerged  
- Role contexts have incompatible behavioral contracts  
- Configuration flags multiply — signal of wrong abstraction  

Split requires council review.

### 6.5 Retire Obsolete Variants

When evolution supersedes a variant, retire variant — do not maintain parallel “legacy card v1.”

### 6.6 Avoid Parallel Solutions

Forbidden without exception:

- Two listing card patterns in consumer browse  
- Two filter sheet behaviors  
- Two verification presentations with different meaning  
- Two empty state grammars  

Parallel solutions fracture mental model (Chapter 10).

### 6.7 Marketplace Component Families (Conceptual)

Relationships between families — not implementation.

| Family | Primary responsibility | Relates to |
|--------|------------------------|------------|
| **Property** | Present one listing as scannable or evaluable unit | Gallery, Price, Verification composites |
| **Gallery** | Inspect listing media with continuity | Property detail template; motion family |
| **Price** | Communicate rental cost authoritatively | Typography numeric role; primary information |
| **Realtor** | Human identity and accountability | Trust semantics; contact family |
| **Verification** | Factual trust state | Must not merge with Featured or Premium |
| **Search** | Navigate result sets via criteria | Filter family; browse template |
| **Filters** | Task navigation for criteria change | Sheet pattern; temporary nav layer |
| **Forms** | Collect accurate profile and listing data | Label-value composites; error inline |
| **Admin** | Operational review and moderation | Higher density; distinct from consumer |
| **Workspace** | Realtor portfolio operation | Dashboard template; status patterns |
| **AI** | Disclosed assistive generation and edit | Distinct from Verification; editable states |

Families **compose** on screens — Property + Realtor + Verification on detail; Property alone on browse card. Families **do not inherit** each other’s semantic purpose.

---

## 7. Component Governance

### 7.1 Ownership

| Role | Owns |
|------|------|
| **Design Council** | New patterns, splits, retirements, exceptions |
| **Head of Product Design** | Catalog health, adoption enforcement |
| **Component steward (assigned per pattern)** | Evolution, documentation, migration tracking |
| **Product teams** | Correct use; exception requests — not silent forks |

### 7.2 Documentation

Every approved pattern documents:

- Primary responsibility and semantic purpose  
- Hierarchy and navigation layer  
- States and transitions  
- Foundation chapter references  
- Allowed variant axes  
- Anti-patterns and confused-with notes  
- Deprecation status if applicable  

### 7.3 Review

- **New pattern:** Council review  
- **Evolution:** Steward + Head of Product Design  
- **Screen ship:** Chapter 60 checklist includes component compliance  

### 7.4 Approval

Approval requires behavioral spec — not only visual approval. Engineering feasibility is consulted — not driver of semantic purpose.

### 7.5 Versioning Philosophy

Versions describe **behavioral contract** changes:

- **Patch:** Visual only; behavior unchanged  
- **Minor:** Additive states or optional axes; backward compatible  
- **Major:** Behavior or meaning change — migration required  

Semantic meaning change is always major — regardless of visual scope.

### 7.6 Design Council Responsibilities

- Approve new patterns and pattern splits  
- Audit parallel solutions quarterly  
- Resolve reuse disputes via Chapter 5 hierarchy  
- Align catalog with standard chapter updates  

---

## 8. Decision Rules

### Rule 1 — Foundation Alignment

Component must map to Chapters 1–10. Unmapped → reject.

### Rule 2 — One Responsibility

Ask: *What is the one primary job?*  
If answer has “and” connecting unrelated jobs → split or reject.

### Rule 3 — One Semantic Purpose

Ask: *What single meaning does this carry in context?*  
If meaning shifts by screen without state change → reject.

### Rule 4 — Predictable Behavior

Ask: *Will users predict outcome from prior use?*  
If not → align or new pattern with migration plan.

### Rule 5 — Consistency Before Customization

Ask: *Is customization required or convenience?*  
Convenience → reject.

### Rule 6 — Evolution Before Replacement

Ask: *Can existing pattern evolve?*  
If yes → do not create parallel.

### Rule 7 — Composition Before Inheritance

Ask: *Can composites build this without subclassing behavior?*  
Prefer compose.

### Rule 8 — Reuse Gate

Ask: *What existing pattern was considered and why rejected?*  
Undocumented → defer creation.

### Rule 9 — State Completeness

Ask: *Are loading, empty, error, success defined?*  
If not → incomplete.

### Rule 10 — Accessibility Inheritance

Ask: *Does component document non-color, reduced-motion, and focus behavior?*  
If not → incomplete.

### Rule 11 — Escalation

**Reuse** over create. **Merge** over multiply. **Retire** over accumulate. **Council** over team-local language.

---

## 9. Correct and Incorrect Examples

### 9.1 Listing Card

**Correct:** One property pattern — image, price group, location, optional verification, optional identity foot — reused on home and favorites.  
**Incorrect:** Home card and favorites card with different internal order and different trust meaning.

### 9.2 Filter Experience

**Correct:** One filter task pattern — sheet, field groups, apply, clear — shared across browse entry points.  
**Incorrect:** Inline filters on one screen and sheet on another with different apply behavior.

### 9.3 Verification Display

**Correct:** One verification composite — factual label, consistent semantics, typography role — card and detail.  
**Incorrect:** Gold badge variant for campaigns sharing verification shape.

### 9.4 Empty State

**Correct:** Empty pattern — situation title, explanation, dominant next action — search, favorites, workspace list.  
**Incorrect:** Emoji-only empty with no shared grammar per screen.

### 9.5 Contact Actions

**Correct:** Contact group pattern — grouped actions after comprehension layer; handoff behavior consistent.  
**Incorrect:** Floating contact on detail and buried contact on another template with no structural logic.

### 9.6 Form Fields

**Correct:** Field composite — label, input, error inline — profile and listing create.  
**Incorrect:** Profile uses placeholder-only fields; listing create uses labeled fields — parallel form languages.

### 9.7 AI Suggestion Block

**Correct:** AI family pattern — disclosure, generate, edit, accept — distinct from verification and body text.  
**Incorrect:** AI output reuses verification composite.

### 9.8 Admin Queue Row

**Correct:** Admin operational row pattern — denser, metadata-rich — not reused as consumer card.  
**Incorrect:** Consumer listing card squeezed into admin with trust colors on internal IDs.

### 9.9 Component Evolution

**Correct:** Trust block evolves to include chevron to contact — single pattern version migration scheduled.  
**Incorrect:** TrustBlockV2 added alongside old block indefinitely.

### 9.10 Over-Configuration

**Correct:** Listing card allows density context consumer vs realtor preview — two documented axes.  
**Incorrect:** Twelve boolean props producing unreviewed visual combinations — variant explosion.

---

## 10. Common Mistakes

| Mistake | System harm |
|--------|-------------|
| Creating similar components | Proliferation; scan failure |
| Variant explosion | Unpredictability; maintenance debt |
| Component-specific UX | Breaks templates |
| Duplicated patterns | Mental model fracture |
| Over-configurable components | Untested combinations |
| Visual inconsistency | Trust erosion |
| Premature abstraction | Wrong split before problem repeats |
| Screen-local “components” | Catalog fiction |
| Skipping lifecycle retirement | Legacy shadow system |
| Engineering-driven component split | Wrong responsibility boundaries |
| Marketing variants in core patterns | Semantic pollution |
| Ignoring state sets | Broken edge experience |
| Documentation after ship | Adoption failure |
| Parallel admin/consumer twins | Unnecessary duplication |
| Props as configuration escape hatch | Governance bypass |
| Decorative “components” | Noise |
| Split without council | Fragmentation |
| Merge incompatible meanings | User distrust |

---

## 11. Future Scalability

### 11.1 AI

AI family grows as assistive patterns — not duplication of Property or Verification families. New AI capabilities extend AI pattern states — not new top-level families per feature.

### 11.2 PWA and Offline

Components define honest offline states — same patterns, additional contextual states documented once.

### 11.3 Enterprise and Agency

Enterprise may add workspace section patterns — composed from existing families; consumer catalog unchanged.

### 11.4 Localization

Components tolerate text expansion without behavioral change. Variant axes do not include per-locale layout forks without council approval.

### 11.5 Dark Mode

Semantic roles invariant; visual implementation variant — not second component per pattern.

### 11.6 White-Label

Brand primary may shift; pattern responsibilities and semantic map invariant. White-label does not authorize parallel pattern forks.

### 11.7 Future Redesigns

Redesign remaps visual skin onto **same pattern catalog**. Retirement of visual-only legacy — not behavioral fork.

### 11.8 Marketplace Expansion

New listing attributes attach via composites inside Property family — not new card species per attribute.

### 11.9 Feature Modules

Chat, payments, scheduling — propose new patterns only after reuse gate. Default: contextual composite inside existing templates.

### 11.10 Catalog Health

Quarterly council audit: count patterns, deprecated unmigrated uses, parallel solutions, exception register overlap.

---

## 12. Design Director Review

**Chapter:** 11 — Component Philosophy & Component System  
**Section:** VIII — Design System  
**Review type:** Initial standard adoption

### 12.1 Approval Statement

This chapter is approved as the **component philosophy and governance contract** for Rento. All reusable product behaviors must lifecycle through this system. Implementation catalogs and tools are subordinate to documented responsibilities and hierarchy herein.

### 12.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapters 1–5 | Authority for trust, hierarchy, decisions, exceptions |
| Chapters 6–10 | Foundation inheritance for all components |
| Chapter 30 — Components & Patterns Catalog | Implementation index — subordinate |
| Chapter 35 — Trust & Status Indicators | Verification family application |
| Chapter 48 — Deprecation & Legacy Patterns | Retirement alignment |
| Chapter 51 — New Surface Introduction | Adoption gate for new screens |
| Chapter 59 — Anti-Patterns Registry | Misuse documentation |
| Chapter 60 — Product Review Checklist | Component compliance at ship |

### 12.3 Review Criteria for Future Amendments

Amendments must answer:

1. What proliferation or inconsistency is not prevented?  
2. Can lifecycle stage change solve without new principles?  
3. Does change preserve one-responsibility and reuse strategy?  
4. Will governance remain operable at larger team scale?

Hierarchy level or lifecycle changes require Design Council approval.

### 12.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on pattern system changes |
| Head of Product Design | Catalog governance and adoption |
| Design System Architect | Hierarchy integrity and documentation |
| Senior Product Designer | Pattern stewardship |
| Accessibility Specialist | Inherited accessibility contract |

### 12.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new component proposals immediately. Legacy parallel solutions migrate on published schedule.

### 12.6 Design Director Closing Note

Components are where standards become habit. Without governance, every sprint invents a new dialect — and users feel the product changing under their feet. This chapter exists so Rento grows by **composition and evolution**, not by accumulation — and so the language spoken on day one thousand is still the same language, spoken more fluently.

---

**End of Chapter 11**


---

## Chapter 12 — Form System & Data Collection Experience

**Section:** IX — Forms & Data Collection  
**Status:** APPROVED
**Audience:** Product Design, UX, Content Design, Product Management, Reviewers  
**Authority:** Subordinate to Chapters 1–11; implements Experience Principles (Chapter 2), Layout & IA (Chapter 4), Typography (Chapter 6), Spatial Rhythm (Chapter 8), Motion (Chapter 9), Navigation (Chapter 10), and Component governance (Chapter 11).

---

## 1. Purpose

This chapter defines the complete **philosophy, behavior, structure, and governance** of forms throughout the Rento product.

Forms are not collections of fields. Forms are **guided conversations** between the product and the user — structured requests for information that must earn trust, respect time, and produce accurate outcomes.

Every form should:

- **Reduce uncertainty** — user knows what is asked and why  
- **Increase confidence** — user trusts how data will be used  
- **Minimize effort** — only necessary input, smart grouping, preserved progress  
- **Collect accurate information** — validation teaches, does not punish  
- **Respect user time** — no redundant steps, no surprise loss of work  

The goal is **one unified system** for all present and future forms across marketplace, realtor workspace, admin, and future modules (payments, agency onboarding, enterprise workflows).

This chapter remains valid independently of implementation or visual redesign. It defines **how Rento asks** — not which controls render on screen.

---

## 2. Core Principles

### 2.1 Forms Are Conversations

Each form has a narrative: purpose, sequence, tone, and completion. The product speaks plainly; the user responds step by step.

### 2.2 Ask Only What Is Necessary

Every field must justify existence against user value and domain rules (Chapter 4). Unnecessary questions erode trust and completion rates.

### 2.3 Every Field Has a Purpose

No field exists for “might need later” without documented product reason. Purpose is visible or inferable to the user.

### 2.4 Users Know Why Information Is Requested

Sensitive data — contact, identity, agency, pricing — requires clear rationale tied to listing quality, contact transparency, or legal obligation.

### 2.5 Forms Build Confidence

Completion should leave the user feeling the product is professional and their data is handled responsibly — not that they survived an interrogation.

### 2.6 Forms Reduce Friction

Friction is minimized through grouping, defaults, recognition over recall, preserved progress, and respectful validation — not through hiding requirements.

### 2.7 Forms Guide Toward Successful Completion

Orientation, progress signals, and constructive errors steer users to done — not to abandonment.

### 2.8 One Form Language

All forms share architecture, validation tone, grouping logic, and recovery behavior — regardless of domain (auth, listing, profile, filters).

### 2.9 Data Ownership Is Honest

Users understand who owns listing data, profile data, and account data. Realtors control their profile; listings follow domain ownership rules — forms never imply false control.

### 2.10 Validation Serves Users

Validation prevents mistakes and teaches correction — it does not blame, surprise, or humiliate.

---

## 3. Form Philosophy

### 3.1 Conversation Structure

A form answers sequentially:

1. **Why am I here?** — screen purpose, role context  
2. **What will I gain?** — outcome of completion  
3. **What is needed now?** — current group only  
4. **What happens next?** — submit, review, moderation, return path  

### 3.2 Respectful Request

Rento requests information because the marketplace depends on accuracy — contacts from profiles, honest pricing, real availability. Tone is direct and professional, never demanding or casual about serious data.

### 3.3 Confidence Through Clarity

Labels, grouping, and error messages use plain language (Chapter 6). Users are never asked to interpret internal jargon or moderation codes without translation.

### 3.4 Friction Is Designed Out, Requirements Are Not

Required fields stay required. Friction removed by better order, fewer fields, and preserved input — not by obscuring what is needed.

### 3.5 Forms Inherit Product Language

Typography roles, semantic color for errors and warnings, spatial rhythm between groups, calm motion on save, and task navigation on multi-step flows (Chapters 6–10) apply uniformly.

### 3.6 Forms Do Not Replace Hierarchy

Forms collect data; they do not restructure listing evaluation or navigation model. Filter forms refine browse — they do not become alternate product areas.

### 3.7 Completion Is a Navigation Event

Successful submit orients user to **what changed and where to go next** — workspace, listing status, return to browse — per Chapter 10.

### 3.8 Incomplete Is a Valid State

Incomplete profile or draft listing is communicated honestly with clear path to completion — not shame styling.

---

## 4. Data Collection Principles

### 4.1 Required vs Optional

**Required:** Without this, the product cannot fulfill its promise — publish listing, contact renter, authenticate, moderate honestly.  
**Optional:** Improves quality but does not block core integrity.  
**Rule:** Mark requirement honestly before user invests effort. Optional must not be disguised as required via dark patterns.

### 4.2 Progressive Disclosure in Forms

Collect **minimum viable set** first; advanced or rare fields in later groups or steps. Aligns with Chapter 4 disclosure layers — not one intimidating slab.

### 4.3 Context-Aware Questions

Ask questions when context makes purpose obvious — contact fields on profile because “this appears on your listings”; price on listing because “renters decide here.”  
Avoid context-free data mining.

### 4.4 Grouping Related Fields

Fields that answer one user question live in one group with macro pause between groups (Chapter 8):

- Identity (name, agency)  
- Contact (phone, messaging)  
- Location (city, service area)  
- Listing facts (price, rooms, description)  
- Media (images)  

### 4.5 Minimizing Cognitive Load

- One primary decision per group  
- Stable field order across similar forms  
- No duplicate asks for same fact (One Source of Truth)  
- Summary before irreversible submit where appropriate  

### 4.6 Reducing Typing

Prefer selection, toggles, and recognition when accuracy is equal or higher — city selection, room count, filter chips. Typing reserved when necessary — descriptions, unique addresses, names.

### 4.7 Recognition Over Recall

Show current values on edit; show applied filters on return; show profile completeness status — user recognizes state, does not reconstruct from memory.

### 4.8 Smart Defaults

Defaults speed completion when **safe and honest** — last city, sensible rental period label, remember me with consent. Defaults must not misrepresent availability or price.

### 4.9 Future Editing

Data collected is editable through same form language — profile edit, listing edit. Users are not trapped by one-shot forms unless domain requires immutability (with explanation).

### 4.10 Data Ownership and Use

Forms communicate:

- What appears publicly on listings  
- What is shared with renters at contact  
- What is internal (moderation, admin)  
- What is never sold or repurposed without consent  

Contact on listings comes from realtor profile — forms reinforce that model, never imply per-listing contact entry where domain forbids it.

### 4.11 Respectful Collection Summary

| Principle | User feels |
|-----------|------------|
| Necessity | “This is worth my time.” |
| Transparency | “I know how this will be used.” |
| Control | “I can fix mistakes.” |
| Progress | “I won’t lose work.” |
| Tone | “This product respects me.” |

---

## 5. Form Architecture

One common language across form families. Families differ in **content and steps** — not in conversational grammar.

### 5.1 Shared Form Grammar

Every form family includes where applicable:

- **Orientation** — title, purpose, role context  
- **Grouping** — logical sections with spatial rhythm  
- **Labeling** — visible labels, not placeholder-only identification  
- **Input feedback** — focus, validation, saving states  
- **Primary action** — one dominant submit/apply/save  
- **Secondary actions** — cancel, back, clear — subordinate  
- **Recovery** — errors inline, progress preserved  
- **Completion** — confirmation and next navigation  

### 5.2 Authentication Forms

**Purpose:** Establish identity to continue gated journey.  
**Architecture:** Minimal fields; clear outcome; return destination after success; no unnecessary registration fields.  
**Tone:** Security-conscious, calm — not alarming.

### 5.3 Registration

**Purpose:** Create account with minimum needed to operate.  
**Architecture:** Short path; defer non-essential profile data to profile conversation.  
**Rule:** Do not duplicate full realtor profile at registration unless domain requires.

### 5.4 Forgot Password and Reset Password

**Purpose:** Recover access.  
**Architecture:** Explain process; email or identifier; reset with clear success and sign-in path.  
**Rule:** Never reveal whether account exists in ways that harm security — messaging follows security policy without hostile UX.

### 5.5 Consumer Profile

**Purpose:** Manage account settings relevant to consumer role.  
**Architecture:** Light density; distinct from realtor professional profile.

### 5.6 Become Realtor

**Purpose:** Apply for professional role.  
**Architecture:** Step clarity — application, pending, approved; status at each stage; no false workspace access.  
**Rule:** Application is conversation about eligibility — not full listing creation.

### 5.7 Realtor Profile

**Purpose:** Source of truth for identity and contact on listings.  
**Architecture:** Grouped identity, contact, agency, location, bio; completeness indicator; explains automatic use on listings.  
**Rule:** No raw technical identifiers exposed as user-facing fields (e.g., URL paste for avatar) where guided upload exists elsewhere — one dignified path per data type.

### 5.8 Create Listing

**Purpose:** Publish new property through moderation.  
**Architecture:** Progressive groups or steps — facts, media, description, review; moderation outcome explained.  
**Rule:** Contacts not collected here if domain sources from profile — form reinforces.

### 5.9 Edit Listing

**Purpose:** Update owned listing; may re-trigger moderation per rules.  
**Architecture:** Recognition over recall — current values shown; same grammar as create.  
**Rule:** Ownership and status change not offered as editable fields where domain forbids.

### 5.10 Search Filters

**Purpose:** Navigate browse via criteria — task form, not account data.  
**Architecture:** Sheet or focused task layer; apply/clear dominant; criteria visible after apply.  
**Rule:** Filter form grammar shared across entry points — not parallel filter dialects.

### 5.11 AI-Assisted Content Generation

**Purpose:** Help draft descriptions or fields — editable, disclosed, human-accountable.  
**Architecture:** Distinct from manual entry — generate, review, edit, accept; never auto-publish without review where required.  
**Rule:** AI Assistance semantic and conversational tone — not verification language (Chapters 7, 11).

### 5.12 Future Payment Forms

**Purpose:** Collect payment with maximum trust.  
**Architecture:** Will inherit this chapter — clear amounts, disclosure, confirmation, error recovery; no housing-form casualness for money.

### 5.13 Future Agency and Enterprise Onboarding

**Purpose:** Onboard organizations with higher field count.  
**Architecture:** Higher density permitted with **same validation tone and grouping grammar** — not admin hostility imported to consumer paths.

### 5.14 Cross-Family Rules

- Same error message style everywhere  
- Same save/progress philosophy within risk class  
- Same label-value relationship  
- Same primary action placement logic within task type  

---

## 6. Validation Philosophy

### 6.1 Preventing Mistakes

Prevent before correct: clear labels, constraints on impossible values, confirm only on irreversible harm. Listing price, room count, and contact formats guided early.

### 6.2 Real-Time Guidance

Inline guidance when it **helps** — format hints, character guidance — without scolding on every keystroke. Validation timing must not feel surveillance-heavy.

### 6.3 Post-Submission Validation

Server-side truth wins. Client guidance never promises success if server will reject. Post-submit errors map to fields or form summary with recovery path.

### 6.4 Error Recovery

Errors state what happened, what it means, what to do — blameless tone (Chapter 2). User input preserved. Focus moves to first fixable issue in logical order.

### 6.5 Confirmation

Success confirmation brief — then orient to next step. Multi-step forms confirm step completion without carnival.

### 6.6 Warnings

Warnings for incomplete but submittable states, or reversible risk — distinct from errors. Warning semantic role (Chapter 7) — not critical alarm.

### 6.7 Incomplete States

Profile incomplete, listing draft, application pending — factual status with constructive link to completion. Incomplete is not error unless user attempted invalid submit.

### 6.8 Saving Drafts

Long forms support draft persistence where product rules allow — create listing, lengthy profile. User must trust return later.

### 6.9 Auto-Save Philosophy

Auto-save reduces loss anxiety on high-effort forms when:

- Saves are silent and calm  
- User sees honest saved state  
- Conflicts handled without silent overwrite surprise  

Auto-save is not substitute for clear submit on publish actions.

### 6.10 Recovery After Interruption

Session loss, app backgrounding, connectivity drop — user returns to preserved state or honest explanation of loss with recovery path. Never silent data wipe.

### 6.11 Trust During Validation

Validation messages never imply user is dishonest. System errors never masquerade as user fault. Moderation rejection explains professionally — not punitively.

---

## 7. Marketplace Forms (Domain Application)

Conceptual application of form system to marketplace domains.

| Domain | Form conversation focus |
|--------|-------------------------|
| **Property creation** | Accurate facts, honest price, media evidence, moderation expectation |
| **Property editing** | Same language as create; status awareness |
| **Image upload** | Progress, failure recovery, cover selection — media as evidence |
| **Availability** | Factual status; no false available state |
| **Pricing** | Clear period; numeric honesty; no manipulative framing |
| **Verification** | Display is not form — but realtor/listing forms collect what enables verification |
| **Realtor profile** | Contact source of truth; completeness drives publish ability |
| **Contact information** | Phone and messaging grouped; explains renter visibility |
| **Agency information** | Optional identity enrichment; subordinate to realtor on consumer paths |
| **Future scheduling** | Appointment forms will use task grammar + confirmation |
| **Future messaging** | Compose forms — distinct from listing create; anti-spam tone |
| **Future AI assistance** | Generate-edit-accept loop; disclosure mandatory |

---

## 8. Decision Rules

### Rule 1 — Foundation Alignment

Form conflicts with Chapters 1–11 → reject.

### Rule 2 — Ask Only If Valuable

Ask: *Does this field improve trust, accuracy, or required outcome?*  
If no → remove.

### Rule 3 — Guide Before Correcting

Ask: *Can labeling or grouping prevent this error?*  
If yes → guide first.

### Rule 4 — Explain Before Requesting

Ask: *Does user know why this field exists?*  
If no → add explanation.

### Rule 5 — Group Before Splitting

Ask: *Are related fields proximate in one conversation group?*  
If not → regroup before adding steps.

### Rule 6 — Reduce Typing Before Automation

Ask: *Can selection or default replace typing safely?*  
Prefer recognition.

### Rule 7 — Preserve Progress Before Restarting

Ask: *Is work preserved on error, back, or interrupt?*  
If no → fix before ship.

### Rule 8 — Validate Respectfully

Ask: *Would we say this error message to a professional client in person?*  
If no → rewrite.

### Rule 9 — Errors Must Teach

Ask: *Does error tell user how to fix?*  
If not → incomplete.

### Rule 10 — Never Surprise the User

Ask: *Will submit do what user expects — including moderation, visibility, contact use?*  
Surprise → reject.

### Rule 11 — One Primary Action

Ask: *Is submit/apply/save clearly dominant?*  
If competing → resolve.

### Rule 12 — Escalation

**User dignity** over data greed. **Accuracy** over speed. **Preserved progress** over clean reset. **One form language** over local dialect.

---

## 9. Correct and Incorrect Examples

### 9.1 Realtor Profile

**Correct:** Grouped sections, labels visible, explains contacts appear on listings, completeness status, save with preserved fields on error.  
**Incorrect:** Eight identical boxes, placeholder-only, avatar URL field, no use explanation.

### 9.2 Create Listing

**Correct:** Progressive groups, price and rooms early, media with upload progress, review step, pending moderation explained.  
**Incorrect:** Single long scroll, contact fields duplicated from profile, submit with no outcome clarity.

### 9.3 Edit Listing

**Correct:** Pre-filled values, same grammar as create, cannot edit forbidden ownership/status.  
**Incorrect:** Empty form on edit, different validation rules than create without reason.

### 9.4 Filters

**Correct:** Task sheet, labeled fields, apply returns to browse with visible criteria effect, clear resets honestly.  
**Incorrect:** Unlabeled inputs, apply uncertain, different filter behavior per screen.

### 9.5 Registration

**Correct:** Minimum fields, path to profile completion later.  
**Incorrect:** Full realtor questionnaire at signup.

### 9.6 Validation Error

**Correct:** “Enter a valid phone number so renters can reach you.” Field preserved.  
**Incorrect:** “Invalid input.” All fields cleared.

### 9.7 AI Description Help

**Correct:** “Suggested description — review and edit before publishing.” Accept moves text to description field.  
**Incorrect:** AI text auto-published with verification styling.

### 9.8 Become Realtor

**Correct:** Application status visible; pending explains wait; approved orients to workspace.  
**Incorrect:** Full workspace access while pending.

### 9.9 Interrupted Draft

**Correct:** User returns to draft listing with saved fields.  
**Incorrect:** Silent loss; user restarts from zero.

### 9.10 Auth Return

**Correct:** Sign-in returns to intended listing or action.  
**Incorrect:** Sign-in dumps to home with lost intent.

---

## 10. Common Mistakes

| Mistake | Harm |
|--------|------|
| Long intimidating forms | Abandonment; trust loss |
| Unnecessary questions | Time disrespect; suspicion |
| Placeholder-only labels | Accessibility; memory burden |
| Multiple validation styles | Unpredictability |
| Unexpected data loss | Confidence destruction |
| Aggressive error messages | Shame; churn |
| Restarting progress on error | Rage quit |
| Inconsistent grouping | Learning burden |
| Over-automation without review | Accuracy and trust risk |
| Duplicate contact per listing | Domain violation; confusion |
| Hidden required fields | Surprise failure on submit |
| Validation only on submit for fixable fields | Late frustration |
| No incomplete state guidance | Stuck users |
| Filter form unlike other forms | Navigation uncertainty |
| Technical errors as user fault | Distrust |
| Celebratory submit on serious data | Tone mismatch |
| Per-screen form dialect | System fracture |
| AI output indistinguishable from user facts | False confidence |

---

## 11. Future Scalability

### 11.1 AI-Assisted Completion

More assisted fields extend generate-review-accept grammar — not new validation tone per feature. Human review states documented in form lifecycle.

### 11.2 PWA and Offline

Forms define offline behavior honestly — what can be edited offline, what syncs, conflict resolution messaging. Same conversational grammar.

### 11.3 Localization

Labels and errors translate; field order and grouping stable. Expansion tolerance in layout (Chapters 6, 8). Locale-specific formats for phone and currency without changing form architecture.

### 11.4 Enterprise and Agency Workflows

Additional steps and density — same error tone, grouping, and progress preservation. Enterprise onboarding does not redefine consumer profile forms.

### 11.5 Marketplace Growth

New listing attributes attach as new **groups** inside create/edit architecture — not new form species per attribute.

### 11.6 Future Verification

Verification may require additional evidence fields — grouped under trust conversation with clear moderation path — not mixed with marketing questions.

### 11.7 Future Payments

Payment forms add disclosure and confirmation layers — inherit validation respect and progress rules; stricter confirm on irreversible commit.

### 11.8 Future Onboarding

Each onboarding module maps to form family template — auth, profile, application, create — before inventing “onboarding UI” as separate language.

### 11.9 Governance

New form families require: user goal, field necessity audit, shared grammar mapping, validation spec, accessibility review, council approval if new family.

---

## 12. Design Director Review

**Chapter:** 12 — Form System & Data Collection Experience  
**Section:** IX — Forms & Data Collection  
**Review type:** Initial standard adoption

### 12.1 Approval Statement

This chapter is approved as the **form and data collection contract** for Rento. All present and future forms must comply with conversational grammar, data collection principles, and validation philosophy herein.

### 12.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 1 — Product Philosophy | Respect time, trust, One Source of Truth |
| Chapter 2 — Experience Principles | Error prevention, recovery, ethical conversion |
| Chapter 4 — Layout & Information Architecture | Grouping, disclosure layers |
| Chapter 5 — Product Design Decision Framework | Field necessity and exceptions |
| Chapter 6 — Typography & Reading System | Labels, errors, helper text roles |
| Chapter 7 — Color Meaning | Error, warning, success semantics |
| Chapter 8 — Spatial System | Form section rhythm |
| Chapter 9 — Motion & Interaction | Save, submit, sheet behavior |
| Chapter 10 — Navigation System | Auth return, task forms, completion paths |
| Chapter 11 — Component Philosophy | Form composites and patterns |
| Chapter 34 — Forms & Input Standards | Extended pattern detail when split in full standard |
| Chapter 53 — AI Assisted Experience | AI form loops |
| Chapter 60 — Product Review Checklist | Form compliance at ship gate |

### 12.3 Review Criteria for Future Amendments

Amendments must answer:

1. What collection or validation harm is not prevented?  
2. Can existing form family extend instead of new dialect?  
3. Does change preserve respectful tone and progress preservation?  
4. Will grammar remain valid across locales and future modules?

New form families require Design Council approval.

### 12.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on form system changes |
| Content Design Lead | Labels, errors, explanatory copy |
| Head of Product Design | Cross-form consistency |
| Senior UX Designer | Flow and validation behavior |
| Accessibility Specialist | Label, error, and keyboard discoverability |

### 12.5 Effective Date

Effective upon publication of RENTO PRODUCT DESIGN STANDARD v1.0. Applies to all new and revised forms immediately. Legacy forms align during scheduled improvement cycles.

### 12.6 Design Director Closing Note

Every field is a question the product asks of a human being. In housing, those answers affect real viewings, real calls, and real homes. Forms that respect the person collect better data. Forms that bully or confuse produce errors, abandonment, and mistrust. This chapter exists so every question Rento asks — now and years from now — is **necessary, clear, recoverable, and part of one conversation**.

---

**End of Chapter 12**
