# Chapter 61 — Anti-Patterns Registry

**Section:** LVIII — Anti-Patterns Registry
**Status:** DRAFT — Phase 1 Authoring
**Audience:** Product Design, UX, Product Management, Content Design, Design Council, Engineering Leadership, Reviewers
**Authority:** Subordinate to Chapters 1–60; forward Design System Governance object assigned by Chapter 56 §10.5 and subsequent governance reconciliation; consumes Product Design Decision Framework and Exception Policy authority (Chapter 5), Component Philosophy & Component System authority (Chapter 11), Trust, Verification & Moderation meaning where applicable (Chapter 20), Design System Governance foundation (Chapter 56), Standard Compliance and Standards Enforcement distinctions (Chapter 57), Standards Evolution distinctions (Chapter 58), Exception Policy Experience distinctions (Chapter 59), and Product Review Checklist distinctions (Chapter 60) without redefinition; defines principles only — not implementation, UI, registry UI, forms, dashboards, tooling, automation, CI, linting, workflow, DesignOps, release management, project management, engineering standards, operational procedures, registry population, actual registry entries, Product Review Checklist content, Standard Compliance authority, enforcement authority, exception authority, standards evolution authority, component lifecycle authority, moderation execution, verification adjudication, or platform governance execution.

---

## 1. Purpose

This chapter defines the **Anti-Patterns Registry** as a Design System Governance-owned Product Design Standard governance object for preserving durable registry-level recurring product-design failure patterns as negative precedent.

Approved chapters already contain local incorrect examples, common mistakes, anti-patterns, misuse patterns, and common architectural failures. Those local references are useful inside their chapters, but they do not create a standard-wide governance object for preserving recurring failure patterns across the Product Design Standard. Without a registry chapter, negative precedent remains fragmented: a mistake can be recognized locally, repeated elsewhere, and still fail to become durable governance memory.

Anti-Patterns Registry exists to solve that narrow problem. It preserves **registry-level recurring product-design failure patterns within Product Design Standard governance** so future interpretation remains consistent across contexts. It does not create new product authority, does not enforce the standard, does not authorize exceptions, does not evolve the standard, and does not duplicate the Product Review Checklist.

Anti-Patterns Registry is not Product Design Decision Framework. Chapter 5 remains authoritative for decision hierarchy, conflict resolution, exception criteria, exception approval, severity, justification, rollback, escalation, and decision review discipline. This chapter may preserve negative precedent that helps future teams recognize failure patterns, but it does not decide conflicts or authorize exceptions.

Anti-Patterns Registry is not Component Philosophy & Component System. Chapter 11 remains authoritative for component philosophy, component lifecycle, component hierarchy, component governance, pattern stewardship, component adoption, evolution, deprecation, and retirement. This chapter may preserve a recurring cross-component or standard-level misuse pattern when independently eligible, but it does not approve, evolve, split, deprecate, retire, or govern components.

Anti-Patterns Registry is not Trust, Verification & Moderation Experience. Chapter 20 remains authoritative for trust, verification, moderation, appeals, fraud prevention, transparency, recovery, automation boundaries, and marketplace integrity meaning where applicable. This chapter may preserve a recurring failure pattern that affects trust meaning, but source-domain meaning remains Chapter 20 authority.

Anti-Patterns Registry is not Standards Enforcement. Chapter 57 remains authoritative for Standard Compliance and Standards Enforcement. Anti-pattern evidence may include drift, boundary breach, shadow standards, or non-compliance signals, but registry inclusion is not Standard Compliance failure and is not enforcement.

Anti-Patterns Registry is not Standards Evolution. Chapter 58 remains authoritative for Standards Evolution, Evolution Candidate, Evolution Candidate Identification, Evolution Candidate Evaluation, Product Design Standard Evolution Approval, and Continuous Architectural Lineage. Anti-pattern evidence may inform evolution attention, but it does not create evolution authority.

Anti-Patterns Registry is not Exception Policy Experience. Chapter 59 remains authoritative for Authorized Exception Status legibility, exception non-authority, no-normalization, and signal-not-decision semantics. Exceptions may provide evidence, but registry inclusion does not approve, reject, revoke, normalize, or classify an exception.

Anti-Patterns Registry is not Product Review Checklist. Chapter 60 remains authoritative for Product Review Checklist, Product Review Checklist Completion State, Architectural Finding, Governed Classification, checklist failure and incompletion semantics, and local checklist misuse patterns. Repeated Architectural Findings may provide evidence of a recurring anti-pattern, but evidence never automatically creates registry authority, registry eligibility, registry inclusion, enforcement consequence, exception consequence, or standards evolution consequence.

The product must help stakeholders answer five Anti-Patterns Registry questions:

1. What qualifies a recurring or structurally repeatable product-design failure pattern for registry-level negative precedent?
2. How does anti-pattern evidence remain useful without becoming automatic authority?
3. How are local issues, local anti-patterns, Architectural Findings, Standard Compliance failures, exceptions, Evolution Candidates, component problems, trust concerns, and registry-level anti-patterns kept distinct?
4. What minimum classification, lifecycle, and registry-entry semantics preserve registry integrity without taxonomy inflation or workflow mechanics?
5. How does the registry remain principles-only without becoming a defect log, issue tracker, checklist duplicate, enforcement list, exception register, component inventory, backlog, DesignOps artifact, or engineering standard?

This chapter governs Anti-Patterns Registry as a **principles-level negative precedent governance object**. It does not specify registry UI, registry format, registry operations, tooling, automation, approval workflow, registry population, actual registry entries, remediation mechanics, tickets, releases, implementation controls, or engineering architecture.

**Relationship to prior chapters:** Chapter 5 supplies decision and exception authority; Chapter 11 supplies component authority; Chapter 20 supplies trust, verification, and moderation meaning where applicable; Chapter 56 supplies Design System Governance foundation, registry ownership, Product Design Standard Lifecycle, Governance Subject Principle, DSG invariants, and Boundary Inheritance; Chapter 57 supplies Standard Compliance and Standards Enforcement meaning; Chapter 58 supplies Standards Evolution meaning; Chapter 59 supplies Authorized Exception Status meaning; Chapter 60 supplies Product Review Checklist, Architectural Finding, and Governed Classification meaning. This chapter defines **Anti-Patterns Registry**, **Registry-Level Anti-Pattern**, **Anti-Pattern Evidence**, **Registry Eligibility**, **Registry Classification Semantics**, **Registry Lifecycle Meaning**, **Anti-Patterns Registry Boundaries**, **Anti-Patterns Registry Boundary Clarity**, and **Anti-Patterns Registry Integrity**.

---

## Design Principles Summary

| Principle | Meaning |
|-----------|---------|
| **Registry as negative precedent** | Anti-Patterns Registry preserves durable registry-level failure patterns as negative precedent for Product Design Standard interpretation |
| **Pattern-shaped, not incident-shaped** | A registry-level anti-pattern must be recurring or demonstrably structurally repeatable; a single severe incident is not enough |
| **Evidence is not authority** | Evidence may support eligibility assessment, but evidence never creates registry authority, registry eligibility, registry inclusion, or any downstream consequence |
| **Registry inclusion is not consequence** | Registry inclusion does not automatically establish Standard Compliance failure, enforcement, exception consequence, evolution candidacy, component action, trust decision, or implementation task |
| **Source meaning follows ownership** | Chapter 61 may govern registry inclusion semantics, but underlying subject meaning remains with the owning approved chapter |
| **Local remains local by default** | Isolated issues and local anti-patterns remain under local chapter authority unless registry eligibility is independently justified |
| **Chapter 60 separation** | Architectural Findings may provide evidence only; Product Review Checklist remains Chapter 60 authority |
| **Chapter 57 preservation** | Standard Compliance and Standards Enforcement remain Chapter 57 authority |
| **Chapter 5 / 59 preservation** | Exceptions remain Chapter 5 authority and Authorized Exception Status remains Chapter 59 authority |
| **Chapter 58 preservation** | Evolution Candidate, Evaluation, Approval, and Continuous Architectural Lineage remain Chapter 58 authority |
| **Chapter 11 preservation** | Component Lifecycle and Component Governance remain Chapter 11 authority |
| **Chapter 20 preservation** | Trust, verification, moderation, appeals, fraud, transparency, and marketplace integrity meaning remain Chapter 20 authority where applicable |
| **Taxonomy restraint** | Classification semantics exist only where they preserve distinction, interpretation, registry integrity, scalability, and maintainability |
| **Minimal lifecycle** | Lifecycle meaning exists only to prevent stale, obsolete, frozen, or superseded registry meaning |
| **Principles only** | Anti-Patterns Registry governance never becomes UI, tooling, automation, workflow, DesignOps, release management, project management, or engineering standards |
| **Anti-Patterns Registry Integrity goal** | Every registry use preserves approved authority, durable negative precedent, and boundary clarity without governance inflation |

---

## What This Chapter Is NOT

This chapter is **not**:

- A replacement for Chapter 5 Product Design Decision Framework or Exception Policy
- A new decision hierarchy, conflict resolution model, exception criteria model, approval path, severity model, rollback model, or escalation path
- A replacement for Chapter 11 Component Lifecycle, Component Governance, pattern stewardship, catalog health, or component approval
- A replacement for Chapter 20 trust, verification, moderation, appeals, fraud, transparency, recovery, or marketplace integrity meaning
- A replacement for Chapter 56 Design System Governance foundation, Product Design Standard Lifecycle, DSG invariants, registry ownership, Governance Subject Principle, or Boundary Inheritance
- A replacement for Chapter 57 Standard Compliance or Standards Enforcement
- A replacement for Chapter 58 Standards Evolution, Evolution Candidate, Evolution Candidate Evaluation, Product Design Standard Evolution Approval, or Continuous Architectural Lineage
- A replacement for Chapter 59 Exception Policy Experience or Authorized Exception Status legibility
- A replacement for Chapter 60 Product Review Checklist, Checklist Completion State, Architectural Finding, Governed Classification, checklist failure semantics, checklist incompletion semantics, or local checklist misuse patterns
- A registry population chapter, actual registry entry list, defect log, issue tracker, implementation backlog, enforcement list, exception register, Product Review Checklist duplicate, component inventory, release log, DesignOps artifact, or engineering standard
- A UI specification, registry UI, form, dashboard, review screen, component pattern, design token reference, or Figma structure
- A tool, automation, CI rule, lint rule, engineering control, implementation checklist, code review rule, release gate, ticket workflow, team ritual, delivery governance mechanism, project management mechanism, or operational procedure
- A numerical scoring model, recurrence threshold, severity matrix, risk score, or operational classification workflow

If the question is *what negative precedent should the Product Design Standard preserve so recurring failure patterns are not rediscovered locally*, this chapter answers it. If the question is *which authority decides compliance, exception, evolution, component action, trust meaning, moderation, checklist completion, implementation readiness, or release readiness*, this chapter points to the owning approved chapter.

---

## 2. Architectural Position

Anti-Patterns Registry sits within the Design System Governance macro-domain after Chapter 56 foundation, Chapter 57 Standards Enforcement, Chapter 58 Standards Evolution, Chapter 59 Exception Policy Experience, and Chapter 60 Product Review Checklist.

Chapter 56 assigns Anti-Patterns Registry ownership to Design System Governance. Chapter 57 makes clear that anti-pattern awareness is not registry content and that Standard Compliance remains a distinct architectural state. Chapter 58 makes clear that repeated drift, disconnected revisions, and exception permanence may become anti-pattern candidates only when a registry chapter is authorized. Chapter 59 makes clear that exception normalization and shadow authority can become anti-pattern candidates without becoming automatic evolution. Chapter 60 makes clear that Architectural Findings are signals routed for Governed Classification and that Product Review Checklist does not define Chapter 61 taxonomy or governance.

Anti-Patterns Registry specializes the remaining governance space: preserving durable negative precedent for recurring or structurally repeatable product-design failure patterns without collapsing evidence into authority.

| Layer | Governing chapter | Anti-Patterns Registry relationship |
|-------|-------------------|--------------------------------------|
| Product Design Decision Framework | Chapter 5 | Consumed; registry preserves negative precedent but does not decide conflicts or authorize exceptions |
| Component Governance | Chapter 11 | Consumed; registry may preserve cross-component misuse patterns but does not govern component lifecycle |
| Trust, Verification & Moderation Meaning | Chapter 20 | Consumed where applicable; registry may preserve trust-affecting failure patterns but does not redefine trust meaning |
| Design System Governance Foundation | Chapter 56 | Inherited; Anti-Patterns Registry owned by DSG per §10.5 |
| Standard Compliance / Enforcement | Chapter 57 | Preserved; registry inclusion is not Standard Compliance failure or enforcement |
| Standards Evolution | Chapter 58 | Preserved; registry evidence may inform attention but does not create evolution authority |
| Exception Policy Experience | Chapter 59 | Preserved; registry does not authorize, normalize, revoke, or classify exceptions |
| Product Review Checklist | Chapter 60 | Preserved; findings may provide evidence but do not populate registry automatically |
| Anti-Patterns Registry | **This chapter** | Durable registry-level negative precedent governance |

Anti-Patterns Registry succeeds through **governed negative precedent with authority humility**. Its value is not registry size, failure catalog volume, or classification complexity. Its value is preserving failure patterns that otherwise recur because the standard lacks a durable place to remember them.

---

## 3. Anti-Patterns Registry

**Anti-Patterns Registry** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Anti-Patterns Registry is the **Design System Governance-owned Product Design Standard governance object that preserves registry-level recurring or demonstrably structurally repeatable product-design failure patterns as durable negative precedent for consistent standard interpretation across contexts**.

Anti-Patterns Registry is:

- A principles-level negative precedent governance object
- A standard-wide memory layer for recurring failure patterns
- A way to preserve what the Product Design Standard has learned not to repeat
- A boundary-protected registry whose entries inherit source meaning from owning authorities
- A guard against fragmented local mistake memory, shadow standards, and repeated rediscovery

Anti-Patterns Registry is not:

- Standard Compliance
- Standards Enforcement
- Exception authorization
- Evolution Candidate identification by itself
- Product Design Standard Evolution Approval
- Component approval or component lifecycle governance
- Trust, verification, moderation, or policy enforcement decision
- Product Review Checklist
- Architectural Finding
- Defect log
- Implementation backlog
- Release readiness
- Tooling output
- Delivery milestone

### 3.1 Anti-Patterns Registry Invariant (APR-1)

**Anti-Patterns Registry preserves durable negative precedent under Design System Governance ownership; it never creates Product Design Standard authority, Standard Compliance, enforcement authority, exception authorization, evolution authority, component lifecycle authority, Product Review Checklist authority, implementation readiness, or release authority.**

Violation of APR-1 is an architectural integrity failure because it replaces approved chapter ownership with registry mechanics.

---

## 4. Governance Subject

Anti-Patterns Registry inherits the Chapter 56 Governance Subject Principle.

The governance subject of Anti-Patterns Registry is **registry-level recurring product-design failure patterns within Product Design Standard governance**.

The governance object is **Anti-Patterns Registry**.

The governed substance is **durable negative precedent that supports consistent Product Design Standard interpretation across contexts**.

Anti-Patterns Registry governs negative precedent about the standard. It does not govern:

- The product experience domain itself
- The component lifecycle itself
- The platform governance execution domain itself
- The implementation artifact itself
- The organizational process itself
- The Product Review Checklist review process itself

Anti-Patterns Registry applies only when Active Standards Governance Scope is legitimately in scope and the matter requires durable standard-level negative precedent rather than local chapter handling, checklist routing, enforcement classification, exception status, evolution consideration, component governance, trust meaning, or out-of-scope implementation treatment.

---

## 5. Registry-Level Anti-Pattern

**Registry-Level Anti-Pattern** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

A Registry-Level Anti-Pattern is a **durable, evidence-backed, recurring or demonstrably structurally repeatable product-design failure pattern with standard-level governance value whose preservation as negative precedent helps protect Product Design Standard integrity, product quality, user experience, governance clarity, or architectural consistency across contexts**.

A Registry-Level Anti-Pattern may threaten:

- Product Design Standard integrity
- Product quality
- User experience quality
- Governance clarity
- Architectural consistency
- Boundary clarity
- Long-term maintainability
- Consistent interpretation across future teams

A Registry-Level Anti-Pattern is not automatically:

- A defect
- An isolated issue
- A checklist failure
- An Architectural Finding
- A Standard Compliance failure
- Standards Enforcement
- An exception
- Authorized Exception Status
- An Evolution Candidate
- Evolution Candidate Evaluation
- Approved Product Design Standard evolution
- A component problem
- A trust concern
- An implementation task
- A release blocker

### 5.1 Pattern-Shaped, Not Incident-Shaped

A registry-level anti-pattern must be **pattern-shaped, not incident-shaped**.

Observed recurrence is the normal basis for registry-level treatment. Where observed recurrence is absent, registry candidacy may be architecturally possible only when all of the following are true:

- Structural repeatability is demonstrable
- The pattern has standard-level significance
- Future recurrence is architecturally plausible
- Preserving the negative precedent provides durable governance value

Severity alone is never sufficient. A single severe incident must not become a Registry-Level Anti-Pattern merely because its consequences are significant.

### 5.2 Registry-Level Anti-Pattern Invariant (APR-2)

**A Registry-Level Anti-Pattern must be recurring or demonstrably structurally repeatable, evidence-backed, and standard-level in governance value; severity alone never establishes registry eligibility.**

---

## Anti-Pattern Evidence

**Anti-Pattern Evidence** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Anti-Pattern Evidence is the **non-authoritative basis that may support assessment of whether a product-design failure pattern is eligible for registry-level treatment**.

Evidence may include:

- Repeated local chapter anti-patterns or common mistakes
- Repeated Architectural Findings from Chapter 60 review
- Repeated Standard Compliance ambiguity or drift signals
- Repeated or persistent exception pressure
- Repeated component misuse patterns across contexts
- Recurring trust, verification, moderation, or integrity meaning confusion
- Structural repeatability identified before observed recurrence, where all eligibility requirements remain satisfied

Evidence may support eligibility assessment. Evidence does not itself create:

- Registry authority
- Registry eligibility
- Registry inclusion
- Standard Compliance status
- Standards Enforcement consequence
- Exception consequence
- Evolution consequence
- Component lifecycle action
- Trust decision
- Product Review Checklist authority
- Implementation task

### Evidence Is Not Authority (APR-3)

**Evidence is not authority. Repetition, severity, Architectural Findings, checklist failures, Standard Compliance failures, exceptions, component problems, evolution pressure, or trust concerns may support eligibility assessment, but none automatically creates registry authority, registry eligibility, registry inclusion, enforcement consequence, exception consequence, or standards evolution consequence.**

---

## Registry Eligibility

**Registry Eligibility** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Registry Eligibility is the **principles-level determination that a failure pattern may belong in Anti-Patterns Registry because it has durable standard-level negative precedent value and is not sufficiently governed by local chapter treatment alone**.

Registry Eligibility requires all mandatory criteria below. A failure pattern is not eligible for registry-level treatment unless every criterion is satisfied without converting evidence into authority or introducing operational thresholds:

1. **Evidence basis** — there is credible, non-authoritative evidence of the failure pattern or demonstrable structural repeatability.
2. **Recurrence or structural repeatability** — observed recurrence exists, or recurrence is architecturally plausible because the structure can repeat.
3. **Standard-level significance or justified cross-context relevance** — the matter affects Product Design Standard integrity, product quality, UX quality, governance clarity, architectural consistency, or cross-context interpretation.
4. **Owning authority identification** — the source-domain meaning belongs to an identifiable approved chapter or authority.
5. **Consequence if repeated** — repeated occurrence would create meaningful architectural, product-quality, UX, or governance harm.
6. **Durable negative precedent value** — preserving the pattern helps future teams avoid repeating it.
7. **Local insufficiency** — the matter is not better owned solely by a local chapter, Chapter 5, Chapter 11, Chapter 20, Chapter 57, Chapter 58, Chapter 59, Chapter 60, another macro-domain, implementation, tooling, or operational process.

Registry Eligibility does not require or permit numerical recurrence thresholds, scoring systems, severity matrices, operational review procedures, approval workflows, or workflow states. Satisfying these criteria permits only eligibility assessment; it does not automatically create registry authority, registry inclusion, or downstream consequence.

### Registry Eligibility Invariant (APR-4)

**Registry Eligibility exists only when a failure pattern satisfies all mandatory eligibility criteria: evidence basis, recurrence or demonstrable structural repeatability, standard-level significance or justified cross-context relevance, owning-authority clarity, durable negative precedent value, and no better sole local owner.**

---

## 6. Local Issue, Local Anti-Pattern, and Registry-Level Anti-Pattern

The distinction between local issue, local anti-pattern, and Registry-Level Anti-Pattern is mandatory.

| Meaning | Governing location | Registry relationship |
|---------|--------------------|-----------------------|
| **Isolated issue** | Owning local chapter, review context, or applicable authority | Local by default; may provide evidence only if a pattern later emerges |
| **Architectural Finding** | Chapter 60 | Review-discovered signal; may provide evidence but remains Chapter 60 concept |
| **Checklist failure** | Chapter 60 | Produces Architectural Finding; does not create registry inclusion |
| **Standard Compliance failure** | Chapter 57 | May provide evidence; registry does not classify compliance |
| **Authorized exception** | Chapter 5 and Chapter 59 | May coexist with or evidence a pattern; registry does not authorize or revoke it |
| **Evolution Candidate** | Chapter 58 | Separate state; registry evidence does not create it automatically |
| **Component-specific problem** | Chapter 11 | Component-local by default; cross-component standard-level pattern may become eligible only independently |
| **Trust concern** | Chapter 20 where applicable | Source meaning remains Chapter 20; registry may preserve recurring pattern only if eligible |
| **Local anti-pattern** | Local approved chapter | Local negative guidance by default; registry inclusion requires independent eligibility |
| **Registry-Level Anti-Pattern** | Chapter 61 | Durable standard-level negative precedent after eligibility is justified |

Local issue remains local by default. Local anti-pattern remains under local chapter authority by default. Component-specific problem remains Chapter 11 by default. Architectural Finding remains Chapter 60. Standard Compliance remains Chapter 57. Exceptions remain Chapter 5 and Chapter 59. Standards Evolution remains Chapter 58.

### Local Default Invariant (APR-5)

**Local issues, local anti-patterns, component-specific problems, checklist findings, compliance failures, exceptions, evolution pressure, and trust concerns remain under their owning authorities by default; registry-level treatment requires independent Registry Eligibility.**

---

## 7. Registry Classification Semantics

**Registry Classification Semantics** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Registry Classification Semantics is the **minimal principles-level meaning needed to keep registry entries interpretable, distinguishable, maintainable, and non-duplicative without creating a rigid taxonomy**.

Classification is necessary only to answer:

- What kind of standard-level failure pattern is being preserved?
- Which approved authority owns the source-domain meaning?
- What boundary or semantic distinction does the registry entry protect?
- Why is registry-level preservation more appropriate than local-only treatment?

Classification is not:

- A normative exhaustive taxonomy
- A severity system
- A scoring model
- A workflow
- A routing substitute for Chapter 60 Governed Classification
- A replacement for owning chapter meaning

The registry may use restrained classification dimensions where justified by interpretation and maintainability. Classification dimensions should remain extensible and may include broad meaning such as authority conflict, boundary confusion, semantic collapse, lifecycle confusion, governance inflation, local substitute authority, or implementation substitution only when the dimension solves a specific registry integrity problem.

These analytical dimensions are not exhaustive categories and must not be treated as mandatory taxonomy. No category belongs in the registry merely because classification is possible.

### Taxonomy Restraint Invariant (APR-6)

**Anti-Patterns Registry may use only the minimum classification semantics required for interpretation, distinction, registry integrity, scalability, maintainability, and avoidance of duplication; it must never create exhaustive taxonomy, severity scoring, or classification for its own sake.**

---

## Registry Lifecycle Meaning

**Registry Lifecycle Meaning** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Registry Lifecycle Meaning is the **minimal principles-level meaning that keeps recognized registry entries aligned with current approved architecture over time**.

Lifecycle meaning is necessary only to prevent registry entries from becoming stale, obsolete, frozen, or contradictory after approved standards evolve. It is not an operational workflow, approval procedure, ticket state, or release process.

The minimum lifecycle meanings are:

| Lifecycle meaning | Purpose | Does not establish |
|-------------------|---------|--------------------|
| **Recognized** | The registry entry currently functions as durable registry-level negative precedent under current approved architecture | Compliance failure, enforcement, exception consequence, evolution candidacy, implementation task, or release consequence |
| **Retired** | The registry entry no longer applies as negative precedent because approved architecture has changed, the pattern is no longer meaningful, or preserving it would mislead future interpretation | Erasure of historical reasoning, retroactive compliance, or automatic standard change |
| **Superseded** | The registry entry has been replaced by newer approved registry meaning or approved standard architecture that better preserves the negative precedent | Automatic Standards Evolution, deletion of source authority, or invalidation of related evidence |

Candidate evidence is not a registry lifecycle state because candidate evidence has no registry authority. A possible pattern may be discussed, reviewed, or evidenced outside registry authority, but it is not part of the authoritative Anti-Patterns Registry until recognized as registry content through approved governance.

Deprecated is not required as a separate lifecycle meaning in this chapter. Where a registry entry should no longer guide current interpretation, **Retired** is sufficient. Where its meaning is replaced by another approved registry or standard meaning, **Superseded** is sufficient. Additional lifecycle meanings would create avoidable governance inflation.

### Minimal Lifecycle Invariant (APR-7)

**Registry lifecycle meaning is limited to Recognized, Retired, and Superseded because these are sufficient to prevent stale, obsolete, frozen, or replaced registry meaning; candidate evidence has no registry authority and is not a registry lifecycle state.**

---

## 8. Registry-Entry Semantics

**Registry-Entry Semantics** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Registry-Entry Semantics is the **minimum principles-level information architecture required for a future registry entry to preserve negative precedent without becoming an issue, checklist item, enforcement record, exception record, component record, or implementation task**.

A future registry entry requires only the following semantic elements:

| Entry semantic | Purpose |
|----------------|---------|
| **Canonical identity** | Stable name for the failure pattern so teams recognize the same negative precedent across contexts |
| **Definition** | Product-design failure pattern meaning, stated as negative precedent |
| **Evidence basis** | Non-authoritative basis that justified registry-level treatment |
| **Applicability scope** | Contexts where the negative precedent helps interpretation |
| **Architectural consequence** | Why repetition or structural repeatability harms Product Design Standard integrity, product quality, UX quality, governance clarity, or architectural consistency |
| **Source authority** | Approved chapter or authority that owns the underlying meaning |
| **Registry lifecycle meaning** | Recognized, Retired, or Superseded as current registry meaning |
| **Related standards** | Relevant approved chapters whose meaning must be consumed without redefinition |

Registry-entry semantics do not include:

- Remediation task
- Owner assignment
- Deadline
- Ticket link
- Implementation status
- Release status
- Severity score
- Numerical recurrence count
- Enforcement consequence
- Exception decision
- Evolution approval
- Checklist status
- Component migration plan

This chapter does not create actual registry entries. Any example-like wording in future work must not be treated as registry content unless it is explicitly authored and approved as a registry entry under Chapter 61 authority.

### Registry-Entry Semantics Invariant (APR-8)

**A registry entry preserves negative precedent through canonical identity, definition, evidence basis, applicability scope, architectural consequence, source authority, lifecycle meaning, and related standards; it never becomes remediation, enforcement, exception, evolution, checklist, component, implementation, release, or project-management content.**

---

## 9. Relationship With Standard Compliance and Standards Enforcement

Chapter 57 establishes Standard Compliance as the architectural state of alignment with the approved Product Design Standard and Standards Enforcement as the product-design governance responsibility of protecting that state.

Anti-pattern evidence may include:

- Repeated drift
- Boundary breach
- Local substitute rule
- Shadow standard
- Standard Compliance ambiguity
- Possible non-compliance

Anti-Patterns Registry supports standards enforcement clarity by preserving recurring failure patterns as negative precedent. It does not establish Standard Compliance, non-compliance, Standards Enforcement, escalation, remediation, or enforcement consequence.

Registry inclusion may help future teams recognize a pattern that often leads to non-compliance, but Chapter 57 remains the authority for whether a specific matter is in Standard Compliance or not.

### Standard Compliance Relationship Invariant (APR-9)

**Anti-Pattern Evidence and registry inclusion are never Standard Compliance, non-compliance, or Standards Enforcement; Chapter 57 alone governs Standard Compliance and Standards Enforcement meaning.**

---

## 10. Relationship With Exceptions

Chapter 5 remains authoritative for whether an exception may be considered, what justification is required, who reviews it, severity, expiry, rollback, and escalation.

Chapter 59 remains authoritative for Authorized Exception Status legibility, exception non-authority, no-normalization, and signal-not-decision semantics.

An approved exception may coexist with a Registry-Level Anti-Pattern. Exception evidence may contribute to understanding recurrence, structural repeatability, or durable negative precedent value. Repeated exceptions may reveal pressure that helps identify a failure pattern.

But:

- An exception does not automatically create an anti-pattern
- Repeated exceptions do not automatically create an anti-pattern
- An anti-pattern does not automatically invalidate an exception
- Registry inclusion does not approve, reject, revoke, normalize, or classify an exception
- Registry inclusion does not change Chapter 5 scope, duration, justification, severity, expiry, or rollback expectations

### Exception Relationship Invariant (APR-10)

**Exceptions may provide evidence for anti-pattern assessment, but exception authority remains Chapter 5 and Authorized Exception Status semantics remain Chapter 59; registry inclusion never approves, rejects, revokes, normalizes, or reclassifies exceptions.**

---

## 11. Relationship With Standards Evolution

Chapter 58 remains authoritative for Standards Evolution, Evolution Candidate, Evolution Candidate Identification, Evolution Candidate Evaluation, Product Design Standard Evolution Approval, and Continuous Architectural Lineage.

Anti-pattern evidence may inform Standards Evolution when a recurring or structurally repeatable failure pattern suggests current approved authority may be insufficient, obsolete, ambiguous, structurally inconsistent, or repeatedly unable to govern legitimate product-design needs without harm.

Registry inclusion does not:

- Create Evolution Candidate status automatically
- Perform Evolution Candidate Evaluation
- Approve Product Design Standard evolution
- Modify Product Design Standard authority
- Suspend current Standard Compliance
- Replace Continuous Architectural Lineage requirements

When approved standards evolve, Anti-Patterns Registry must keep registry meaning aligned with current approved architecture. That alignment may require a registry entry to remain Recognized, become Retired, or become Superseded. Chapter 58 owns the standards evolution; Chapter 61 owns only registry integrity against stale or obsolete negative precedent.

### Standards Evolution Relationship Invariant (APR-11)

**Anti-pattern evidence and registry inclusion may inform Chapter 58 attention, but Chapter 58 alone governs Evolution Candidate Identification, Evolution Candidate Evaluation, Product Design Standard Evolution Approval, and authority change.**

---

## 12. Relationship With Product Review Checklist

Chapter 60 remains authoritative for Product Review Checklist, Product Review Checklist Completion State, Architectural Finding, Governed Classification, checklist semantics, failure semantics, incompletion semantics, and local checklist misuse patterns.

Chapter 60 asks whether review attention revealed a finding and where classification should be routed.

Chapter 61 asks whether a recurring or structurally repeatable failure pattern deserves durable registry-level negative precedent.

Architectural Findings may provide Anti-Pattern Evidence when similar concerns recur across reviews or reveal demonstrable structural repeatability. That evidence remains non-authoritative until Registry Eligibility is independently established and the underlying subject meaning is understood through its owning authority.

Repeated Architectural Findings may provide evidence of a recurring anti-pattern, but evidence never automatically creates:

- Registry authority
- Registry eligibility
- Registry inclusion
- Standard Compliance status
- Standards Enforcement consequence
- Exception consequence
- Evolution consequence
- Component lifecycle action
- Trust decision
- Implementation task

### Chapter 60 Separation Invariant (APR-12)

**Repeated Architectural Findings may provide evidence of a recurring anti-pattern, but evidence never automatically creates registry authority, registry eligibility, registry inclusion, enforcement consequence, exception consequence, or standards evolution consequence; Chapter 60 owns findings and routing, while Chapter 61 owns only registry-level negative precedent governance.**

---

## 13. Relationship With Component Governance

Chapter 11 remains authoritative for Component Philosophy, Component Lifecycle, Component Governance, pattern stewardship, catalog health, component approval, component evolution, component deprecation, component retirement, and component documentation.

Component-local problems remain local by default. A component-specific misuse, lifecycle issue, variant problem, or catalog health concern does not become registry-level merely because it is important.

A recurring cross-component or standard-level failure pattern may become eligible for Anti-Patterns Registry only when Registry Eligibility is independently met. Even then, Chapter 61 preserves the failure pattern as negative precedent; it does not approve, evolve, split, deprecate, retire, replace, or govern components.

### Component Governance Relationship Invariant (APR-13)

**Anti-Patterns Registry may preserve eligible cross-component or standard-level misuse patterns as negative precedent, but Chapter 11 remains the sole authority for component lifecycle and component governance.**

---

## 14. Relationship With Platform Governance and Trust

Chapter 20 remains authoritative for trust, verification, moderation, appeals, fraud prevention, transparency, recovery, automation boundaries, and marketplace integrity meaning where applicable.

Admin Platform chapters remain authoritative for delegated platform governance execution within their approved scopes.

Where a failure pattern affects trust, verification, moderation, user safety, marketplace integrity, or platform governance meaning, Anti-Patterns Registry may preserve the recurring or structurally repeatable failure pattern as negative precedent if Registry Eligibility is independently met. Source-domain meaning remains with Chapter 20 or another owning approved authority.

Registry inclusion creates no platform governance execution authority. It does not moderate listings, grant roles, adjudicate verification, execute policy enforcement, decide appeals, detect fraud, or define trust operations.

### Platform Governance and Trust Relationship Invariant (APR-14)

**Anti-Patterns Registry may preserve eligible trust-affecting failure patterns as negative precedent, but Chapter 20 and applicable platform governance authorities retain meaning and execution authority.**

---

## Anti-Patterns Registry Boundaries

**Anti-Patterns Registry Boundaries** is an official product concept in the RENTO PRODUCT DESIGN STANDARD.

Anti-Patterns Registry Boundaries define what Anti-Patterns Registry can and cannot establish within Design System Governance.

Anti-Patterns Registry can establish:

- Whether a failure pattern qualifies as registry-level negative precedent
- Whether evidence supports registry eligibility assessment
- Whether observed recurrence or demonstrable structural repeatability exists at principles level
- Whether severity alone is insufficient
- Whether source-domain authority is identifiable
- Whether local treatment is insufficient for standard-level governance memory
- Whether a registry entry should remain Recognized, Retired, or Superseded
- Whether registry meaning remains aligned with current approved architecture

Anti-Patterns Registry cannot establish:

- New Product Design Standard authority
- Standard Compliance
- Standards Enforcement
- Exception authorization
- Authorized Exception Status
- Evolution Candidate status
- Evolution Candidate Evaluation
- Product Design Standard Evolution Approval
- Component lifecycle action
- Component approval, deprecation, or retirement
- Trust, verification, moderation, appeal, fraud, transparency, or marketplace integrity decision
- Product Review Checklist Completion State
- Architectural Finding
- Governed Classification routing
- Platform governance execution
- Implementation readiness
- Release readiness
- Operational remediation

---

## Anti-Patterns Registry Boundary Clarity

**Anti-Patterns Registry Boundary Clarity** is the shared legibility of what Anti-Patterns Registry owns, what Chapter 5 owns, what Chapter 11 owns, what Chapter 20 owns where applicable, what Chapter 56 owns, what Chapter 57 owns, what Chapter 58 owns, what Chapter 59 owns, and what Chapter 60 owns.

Anti-Patterns Registry Boundary Clarity requires:

- **Registry clarity** — registry-level anti-pattern means durable negative precedent, not automatic consequence
- **Evidence clarity** — evidence supports assessment but creates no authority
- **Recurrence clarity** — recurrence or structural repeatability is required; severity alone is insufficient
- **Source authority clarity** — underlying meaning remains with the owning approved chapter
- **Local clarity** — local issues and local anti-patterns remain local by default
- **Chapter 5 clarity** — decisions and exceptions remain Chapter 5 authority
- **Chapter 11 clarity** — component governance remains Chapter 11 authority
- **Chapter 20 clarity** — trust, verification, moderation, and integrity meaning remains Chapter 20 authority where applicable
- **Chapter 56 clarity** — DSG foundation remains inherited, not reopened
- **Chapter 57 clarity** — Standard Compliance and Standards Enforcement are not registry outcomes
- **Chapter 58 clarity** — registry evidence is not automatic evolution candidacy or approval
- **Chapter 59 clarity** — authorized exceptions remain visible but non-authoritative
- **Chapter 60 clarity** — findings and checklist routing remain Product Review Checklist authority
- **Implementation clarity** — tools and formats do not substitute for registry governance authority

---

## Anti-Patterns Registry Integrity

**Anti-Patterns Registry Integrity** is the honesty of Anti-Patterns Registry governance itself — no isolated incident treated as registry-level pattern, no severity treated as sufficient eligibility, no evidence treated as authority, no registry inclusion treated as compliance failure or enforcement, no registry entry treated as exception decision or evolution approval, no registry as component lifecycle authority, no trust decision by registry, no Product Review Checklist duplication, no tooling substitution, no workflow substitution, no implementation leakage, no release-management expansion, no DesignOps theater, and no registry population without approved registry content authority.

Anti-Patterns Registry Integrity is preserved when:

- Registry entries remain pattern-shaped, not incident-shaped
- Evidence remains distinct from authority
- Registry Eligibility remains distinct from registry inclusion
- Registry inclusion remains distinct from downstream consequences
- Source-domain meaning follows owning authority
- Local issues remain local by default
- Classification semantics remain minimal and non-exhaustive
- Lifecycle meaning prevents stale or superseded precedent without becoming workflow
- Registry entries remain negative precedent, not operational work
- Chapter 60 remains separate
- The registry helps future teams remember failure patterns, not stop thinking

---

## 15. Boundary Inheritance

Anti-Patterns Registry inherits all Chapter 56 boundaries.

It may extend within those boundaries by defining:

- Anti-Patterns Registry
- Registry-Level Anti-Pattern
- Anti-Pattern Evidence
- Registry Eligibility
- Registry Classification Semantics
- Registry Lifecycle Meaning
- Registry-Entry Semantics
- Anti-Patterns Registry Boundaries
- Anti-Patterns Registry Boundary Clarity
- Anti-Patterns Registry Integrity
- Registry-specific principles and invariants
- Registry relationship to Standard Compliance, enforcement, exceptions, evolution, component governance, trust meaning, Product Review Checklist, and Architectural Findings

It may never:

- Redefine Governance Subject
- Redefine Product Design Standard Lifecycle
- Redefine Chapter 5
- Redefine Chapter 11
- Redefine Chapter 20
- Redefine Chapter 56
- Redefine Chapter 57
- Redefine Chapter 58
- Redefine Chapter 59
- Redefine Chapter 60
- Populate actual registry entries in this chapter
- Absorb Admin Platform execution
- Absorb Accessibility & Internationalization
- Absorb Performance Experience
- Absorb Future Product Evolution
- Define implementation, tooling, workflow, DesignOps, delivery governance, release mechanics, project management, operational procedures, or engineering standards

---

## 16. Architectural Invariants

The following invariants are mandatory across Anti-Patterns Registry. All inherit DSG-1 through DSG-10.

| ID | Invariant | Statement |
|----|-----------|-----------|
| **APR-1** | **Negative Precedent Only** | Anti-Patterns Registry preserves durable negative precedent and never creates Product Design Standard authority or downstream governance consequence |
| **APR-2** | **Pattern-Shaped Requirement** | A Registry-Level Anti-Pattern must be recurring or demonstrably structurally repeatable, evidence-backed, and standard-level in governance value; severity alone is insufficient |
| **APR-3** | **Evidence Is Not Authority** | Evidence may support assessment but never creates registry authority, eligibility, inclusion, or compliance, enforcement, exception, evolution, component, trust, implementation, or release consequence |
| **APR-4** | **Registry Eligibility Discipline** | Registry Eligibility requires evidence basis, recurrence or structural repeatability, standard-level significance, source authority clarity, durable negative precedent value, and no better sole local owner |
| **APR-5** | **Local Default** | Local issues, local anti-patterns, component-specific problems, findings, compliance failures, exceptions, evolution pressure, and trust concerns remain under owning authorities by default |
| **APR-6** | **Taxonomy Restraint** | Classification semantics must remain minimal, extensible, justified, and non-exhaustive; no severity scoring or classification for its own sake |
| **APR-7** | **Minimal Lifecycle** | Registry lifecycle meaning is limited to Recognized, Retired, and Superseded; candidate evidence has no registry authority and is not a lifecycle state |
| **APR-8** | **Entry Semantics Discipline** | Registry entries preserve negative precedent through minimal semantic fields and never become remediation, enforcement, exception, evolution, checklist, component, implementation, release, or project-management content |
| **APR-9** | **Chapter 57 Preservation** | Registry evidence and inclusion are not Standard Compliance, non-compliance, or Standards Enforcement |
| **APR-10** | **Chapter 5 / 59 Preservation** | Registry evidence and inclusion never approve, reject, revoke, normalize, or reclassify exceptions |
| **APR-11** | **Chapter 58 Preservation** | Registry evidence and inclusion never create Evolution Candidate status, evaluation, approval, or Product Design Standard authority change |
| **APR-12** | **Chapter 60 Separation** | Architectural Findings may provide evidence only; Chapter 60 owns findings and routing, while Chapter 61 owns registry-level negative precedent governance |
| **APR-13** | **Chapter 11 Preservation** | Registry may preserve eligible cross-component failure patterns but never governs Component Lifecycle or Component Governance |
| **APR-14** | **Chapter 20 Preservation** | Registry may preserve eligible trust-affecting failure patterns but never redefines trust, verification, moderation, appeals, fraud, transparency, or marketplace integrity meaning |
| **APR-15** | **Chapter 56 Inheritance** | Anti-Patterns Registry inherits DSG foundation, boundaries, registry ownership, Governance Subject Principle, Product Design Standard Lifecycle, and DSG invariants without reopening them |
| **APR-16** | **No Implementation Registry Governance** | Anti-Patterns Registry does not specify UI, code, APIs, databases, tooling, automation, tokens, Figma, CI, lint, workflow, release mechanics, DesignOps, project management, operational procedures, or engineering standards |
| **APR-17** | **No Governance Inflation** | Anti-Patterns Registry must never become defect log, issue tracker, implementation backlog, enforcement list, exception register, checklist duplicate, component inventory, release log, DesignOps artifact, or engineering standard |

---

## 17. Common Registry Misuse Patterns

The following are chapter-local review risks for Anti-Patterns Registry governance. They do not populate the Anti-Patterns Registry.

| Misuse pattern | Why it harms |
|----------------|--------------|
| **Incident as Anti-Pattern** | Promotes isolated issue into durable registry meaning without pattern-shaped justification |
| **Severity as Eligibility** | Treats consequence size as sufficient even when structural repeatability is not demonstrated |
| **Evidence as Authority** | Converts evidence into registry inclusion or downstream consequence without eligibility discipline |
| **Finding as Registry Entry** | Treats Chapter 60 Architectural Findings as automatic registry content |
| **Compliance Failure as Anti-Pattern** | Duplicates Chapter 57 instead of preserving negative precedent only where independently eligible |
| **Exception as Anti-Pattern** | Treats Chapter 5 authorized exception status as automatic registry content |
| **Registry as Evolution Candidate** | Uses registry inclusion to bypass Chapter 58 candidate, evaluation, and approval discipline |
| **Component Lifecycle Takeover** | Uses registry meaning to approve, split, deprecate, retire, or replace components outside Chapter 11 |
| **Trust Meaning Takeover** | Uses registry language to redefine trust, verification, moderation, or marketplace integrity outside Chapter 20 |
| **Checklist Duplicate** | Recreates Product Review Checklist questions or findings under registry labels |
| **Taxonomy Inflation** | Creates categories because classification is possible, not because it preserves registry integrity |
| **Lifecycle Workflow Creep** | Converts registry lifecycle meaning into operational statuses, tickets, approvals, or release steps |
| **Defect Log Drift** | Accumulates issues rather than durable negative precedent |
| **Stale Precedent Freeze** | Keeps obsolete registry meaning active after approved standards evolve |
| **Implementation Backlog Drift** | Turns negative precedent into tasks, owners, deadlines, or engineering work |

---

## 18. Completion Criteria

Chapter 61 closes its architectural responsibility when it establishes:

1. Anti-Patterns Registry as a Design System Governance-owned negative precedent governance object
2. Registry-Level Anti-Pattern as recurring or demonstrably structurally repeatable product-design failure pattern with standard-level governance value
3. Anti-Pattern Evidence as non-authoritative
4. Registry Eligibility requiring all mandatory criteria without numeric thresholds, scoring, severity matrices, approval workflow, or operational workflow
5. Severity-alone rejection and pattern-shaped requirement
6. Local issue, local anti-pattern, and registry-level anti-pattern distinction
7. Authority ownership and inheritance without source-domain redefinition
8. Relationship to Standard Compliance and Standards Enforcement without redefining Chapter 57
9. Relationship to exceptions without redefining Chapter 5 or Chapter 59
10. Relationship to Standards Evolution without redefining Chapter 58
11. Relationship to Product Review Checklist and Architectural Findings without redefining Chapter 60
12. Relationship to Component Governance without redefining Chapter 11
13. Relationship to Platform Governance and trust meaning without redefining Chapter 20
14. Minimal classification semantics without normative exhaustive taxonomy
15. Minimal lifecycle meaning limited to Recognized, Retired, and Superseded
16. Registry-entry semantics without actual registry entries
17. Registry integrity protections against defect log, issue tracker, backlog, checklist duplicate, exception register, enforcement list, component inventory, release log, DesignOps artifact, and engineering standard drift
18. Boundary inheritance from Chapter 56
19. APR-1 through APR-17
20. Principles-only scope with no implementation, workflow, tooling, DesignOps, release management, project management, operational procedure, scoring, or engineering standards

Chapter 61 approval would close the Chapter 56 §10.5 Anti-Patterns Registry forward object, but only upon Design Council approval and Approval Integration. This draft does **not** approve Chapter 61, does **not** integrate Chapter 61 into the RENTO PRODUCT DESIGN STANDARD, does **not** update approved chapter count, does **not** populate Anti-Patterns Registry, does **not** complete Design System Governance macro-domain, does **not** begin Design System Governance macro-domain completion review, does **not** complete Product Design Standard v1.0, and does **not** imply implementation readiness.

---

## 19. Product Development Methodology Bridge

When Product Development Methodology v1.0 is authored, Anti-Patterns Registry initiatives must trace to this chapter and upstream contracts — demonstrating preservation of **Anti-Patterns Registry**, **Registry-Level Anti-Pattern**, **Anti-Pattern Evidence**, **Registry Eligibility**, **Registry Classification Semantics**, **Registry Lifecycle Meaning**, **Registry-Entry Semantics**, **Anti-Patterns Registry Boundaries**, **Anti-Patterns Registry Boundary Clarity**, **Anti-Patterns Registry Integrity**, Chapter 5 preservation, Chapter 11 preservation, Chapter 20 preservation where applicable, Chapter 56 inheritance, Chapter 57 Standard Compliance preservation, Chapter 58 evolution authority preservation, Chapter 59 exception status preservation, Chapter 60 finding and checklist authority preservation, and APR-1 through APR-17.

**Governance note:** No Anti-Patterns Registry work may claim Product Design Standard authority without preserving the evidence-is-not-authority rule, Registry Eligibility discipline, source-authority ownership, minimal taxonomy, minimal lifecycle, and all upstream ownership contracts.

---

## 20. Chapter Summary

Anti-Patterns Registry converts Chapter 56 registry ownership into a principles-level negative precedent governance object for standard-wide Product Design Standard memory.

This chapter establishes **Anti-Patterns Registry** as the Design System Governance-owned Product Design Standard governance object that preserves registry-level recurring or demonstrably structurally repeatable product-design failure patterns as durable negative precedent. It defines **Registry-Level Anti-Pattern**, **Anti-Pattern Evidence**, **Registry Eligibility**, **Registry Classification Semantics**, **Registry Lifecycle Meaning**, **Registry-Entry Semantics**, **Anti-Patterns Registry Boundaries**, **Anti-Patterns Registry Boundary Clarity**, and **Anti-Patterns Registry Integrity**.

It preserves Chapter 5 as Product Design Decision Framework and Exception Policy authority; preserves Chapter 11 as Component Lifecycle and Component Governance authority; preserves Chapter 20 as trust, verification, moderation, appeals, fraud, transparency, and marketplace integrity meaning authority where applicable; inherits Chapter 56 foundation and DSG-1 through DSG-10; preserves Chapter 57 Standard Compliance and Standards Enforcement; preserves Chapter 58 Standards Evolution, Evolution Candidate, Evaluation, Approval, and Continuous Architectural Lineage; preserves Chapter 59 Authorized Exception Status legibility, non-authority, no-normalization, and signal-not-decision semantics; preserves Chapter 60 Product Review Checklist, Architectural Finding, and Governed Classification authority; introduces APR-1 through APR-17; and does not create actual registry entries.

**Design System Governance flow (non-sequential — authoring order shown, not operational mandate):**

Design System Governance Foundation (Ch 56) → Standards Enforcement (Ch 57) + Standards Evolution (Ch 58) + Exception Policy Experience (Ch 59) + Product Review Checklist (Ch 60) + **Anti-Patterns Registry (Ch 61 draft)**

**Macro-domain status upon this draft:** Anti-Patterns Registry is authored as a draft only. Design System Governance macro-domain remains **IN PROGRESS**. Product Design Standard v1.0 remains **IN PROGRESS**.

---

## 21. Design Director Review

**Chapter:** 61 — Anti-Patterns Registry
**Section:** LVIII — Anti-Patterns Registry
**Review type:** Phase 1 Authoring draft

### 21.1 Review Statement

- **Phase 0 Architectural Positioning** — APPROVED WITH CLARIFICATIONS
- **Phase 1 Authoring** — DRAFT COMPLETE
- **Architecture Review** — PENDING
- **Editorial Pass** — PENDING
- **Final Design Council Review** — PENDING
- **Approval Integration** — NOT STARTED
- **Official Status** — DRAFT ONLY
- **Ready for permanent inclusion** — NO

This chapter is authored as the Anti-Patterns Registry governance draft for Rento — a Design System Governance-owned negative precedent object for registry-level recurring product-design failure patterns. Implementation patterns are subordinate to the principles herein.

**Status:** DRAFT

### 21.2 Relationship to Other Chapters

| Chapter | Relationship |
|---------|--------------|
| Chapter 5 — Product Design Decision Framework | Decision hierarchy, exceptions, escalation, and decision authority — consumed, not redefined |
| Chapter 11 — Component Philosophy & Component System | Component Lifecycle and Component Governance authority — consumed, not redefined |
| Chapter 20 — Trust, Verification & Moderation Experience | Trust, verification, moderation, appeals, fraud, transparency, and integrity meaning — consumed where applicable, not redefined |
| Chapter 56 — Design System Governance Experience | Macro-domain foundation, registry ownership, Boundary Inheritance, and DSG invariants — inherited, not reopened |
| Chapter 57 — Standards Enforcement Experience | Standard Compliance and Standards Enforcement authority — preserved |
| Chapter 58 — Standards Evolution Experience | Evolution Candidate, Evaluation, Approval, and Continuous Architectural Lineage authority — preserved |
| Chapter 59 — Exception Policy Experience | Authorized Exception Status legibility, non-authority, no-normalization, and signal-not-decision semantics — preserved |
| Chapter 60 — Product Review Checklist | Checklist Completion State, Architectural Finding, Governed Classification, failure semantics, incompletion semantics, and local checklist misuse patterns — preserved |
| Forward macro-domains | Accessibility & Internationalization, Performance Experience, and Future Product Evolution remain separate |

### 21.3 Review Criteria for Architecture Review

Council should verify:

1. Anti-Patterns Registry is positioned as DSG-owned negative precedent governance object, not Standard Compliance, enforcement, exception, evolution, implementation, checklist, or release authority
2. Canonical governance subject remains registry-level recurring product-design failure patterns within Product Design Standard governance
3. Registry-Level Anti-Pattern remains pattern-shaped, not incident-shaped
4. Severity alone remains insufficient
5. Structural repeatability is required where observed recurrence is absent
6. Evidence is not authority
7. Candidate evidence has no registry authority and is not a registry lifecycle state
8. Registry inclusion creates no automatic compliance, enforcement, exception, evolution, component, trust, implementation, or release consequence
9. Chapter 5 authority remains preserved
10. Chapter 11 component lifecycle and component governance remain preserved
11. Chapter 20 trust, verification, and moderation meaning remains preserved where applicable
12. Chapter 56 Governance Subject Principle, Product Design Standard Lifecycle, DSG invariants, and Boundary Inheritance are inherited
13. Chapter 57 Standard Compliance is not reduced to registry result
14. Chapter 58 Evolution Candidate / Evaluation / Approval separation remains intact
15. Chapter 59 Authorized Exception Status remains visible, bounded, non-authoritative, and not normalized
16. Chapter 60 Product Review Checklist, Architectural Finding, and Governed Classification remain distinct and preserved
17. Classification semantics remain minimal, justified, extensible, and non-exhaustive
18. No Phase 0 analytical category is automatically promoted into normative taxonomy
19. Lifecycle remains minimal and every lifecycle meaning has independent governance necessity
20. No actual registry entries are created
21. No implementation, UI, tooling, automation, workflow, DesignOps, release management, project management, operational procedure, scoring, severity matrix, or engineering standard is introduced
22. APR-1 through APR-17 remain intact

### 21.4 Sign-Off Requirements

| Role | Responsibility |
|------|----------------|
| Design Director | Final approval on Anti-Patterns Registry governance philosophy |
| Head of Product Design | Chapter 5 / Chapter 11 / Chapter 56 / Chapter 57 / Chapter 58 / Chapter 59 / Chapter 60 consumption integrity |
| Design Council | Evidence-is-not-authority discipline, registry eligibility, minimal taxonomy, minimal lifecycle, Chapter 56 §10.5 closure decision |
| Design System Architect | Standard-level vs component-level vs checklist-level vs registry-level separation |
| Senior Product Designer | Negative precedent clarity and registry-entry semantics |
| Product Management | Scope discipline; no backlog, workflow, delivery governance, or release management creep |
| Engineering Leadership | Implementation and engineering standards boundary preservation |

### 21.5 Effective Date

Not effective. This draft does not approve Chapter 61, does not update approved chapter count, and does not integrate Chapter 61 into the RENTO PRODUCT DESIGN STANDARD.

### 21.6 Design Director Closing Note

A standard needs memory for what it must not become. Local mistakes teach within a chapter; durable negative precedent teaches across the standard. Anti-Patterns Registry exists so Rento can preserve recurring failure patterns without turning evidence into authority, severity into eligibility, findings into consequences, exceptions into standards, or registry entries into work items. The registry is useful only while it stays humble: it remembers patterns, inherits meaning, and protects the standard from repeating avoidable failures.

---

**End of Chapter 61 — Anti-Patterns Registry**
