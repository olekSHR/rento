# Rento Security Standards

**Status:** PUBLISHED — Security Standards  
**Authority class:** Authoritative security governance  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Security Reviewers, Design Council  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Purpose

This document defines **enterprise security governance** for the Rento platform.

It establishes how security architecture is owned, bounded, propagated, classified, audited, and evolved across all implementation technologies — without specifying authentication mechanisms, cryptographic implementations, infrastructure products, or operational security procedures.

This document answers:

- What security governance owns versus what upstream architecture owns;
- How trust boundaries, identity propagation, and authorization boundaries are governed;
- How least privilege, data classification, and security ownership are assigned;
- How credentials, secrets, security events, and audit evidence are governed at architectural level;
- How privacy boundaries, external integration trust, and internal service trust are preserved;
- What secure defaults and security invariants apply platform-wide;
- How security architecture evolves without authority drift;
- What downstream standards may consume from this authority.

This document is **security governance**, not cybersecurity operations, not OWASP documentation, and not implementation guidance.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    → Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        → Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            → Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                → Platform architecture (PLATFORM_ARCHITECTURE.md)
                    → System architecture (SYSTEM_ARCHITECTURE.md)
                        ├── Backend architecture (BACKEND_ARCHITECTURE.md)
                        ├── Frontend architecture (FRONTEND_ARCHITECTURE.md)
                        ├── API standards (API_STANDARDS.md)
                        ├── Database architecture (DATABASE_ARCHITECTURE.md)
                        └── Security standards (this document)
                            → Authentication Architecture · Authorization Architecture · Infrastructure security standards (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Why engineering exists; EP-7, EP-8, EP-9 security posture | Does not restate constitutional governance |
| ARCHITECTURE_PRINCIPLES.md | AP-14 through AP-17 trust and security principles | Specializes principles into security governance |
| PLATFORM_ARCHITECTURE.md | Identity & Role Context domain; PLT invariants | Applies platform security structure — does not redefine domains |
| SYSTEM_ARCHITECTURE.md | System trust boundaries (§11); security scope boundary (§18); SYS invariants | Extends with enterprise security governance — does not duplicate boundary catalog |
| BACKEND_ARCHITECTURE.md | Identity consumption; authorization enforcement points | Defines security policy ownership — does not duplicate enforcement point table |
| FRONTEND_ARCHITECTURE.md | Surface trust boundaries; presentation security consumption | Defines client-side security governance — does not duplicate surface model |
| API_STANDARDS.md | Contract trust boundaries; security restraint in errors | Defines access-boundary security governance — does not define contracts |
| DATABASE_ARCHITECTURE.md | Persistence authorization; evidence records | Defines data-protection governance at persistence scope — does not define persistence |
| PRODUCT_ARCHITECTURE.md | Role responsibilities; participation–execution separation | Consumes product security meaning — does not redefine trust experience |
| Product Design Standard | Trust, verification, moderation meaning (Chapter 20) | Consumes product trust semantics — does not redefine |

### 2.3 What this document owns

- Enterprise security governance scope and responsibility model;
- Security ownership assignment across platform and system components;
- Trust boundary governance beyond system-level catalog;
- Identity propagation and authentication boundary governance;
- Authorization boundary governance and least-privilege discipline;
- Data classification governance and protection obligations;
- Credential and secret governance at architectural level;
- Security event governance and security signal classification;
- Audit governance relationship to observability and domain evidence;
- Privacy boundary governance;
- External integration trust governance;
- Internal service trust governance;
- Secure default principles;
- Security invariants (SEC-INV-*);
- Security lifecycle governance;
- Dependency trust governance;
- Downstream consumption model;
- Prohibited security scope.

### 2.4 What this document does not own

- Product trust meaning, moderation semantics, or verification experience;
- Platform domain definitions and PLT invariants (PLATFORM_ARCHITECTURE.md);
- System component responsibilities and SYS-INV invariants (SYSTEM_ARCHITECTURE.md);
- Backend layer structure, domain realization, or orchestration (BACKEND_ARCHITECTURE.md);
- Frontend presentation, navigation, or client state (FRONTEND_ARCHITECTURE.md);
- API contract specification (API_STANDARDS.md);
- Persistence ownership and aggregate boundaries (DATABASE_ARCHITECTURE.md);
- Authentication mechanism design, token formats, session stores, or cryptographic policy;
- Authorization middleware, policy engine products, or enforcement implementation;
- Network segmentation, firewall rules, WAF configuration, or transport-layer configuration;
- Secret management products, key management services, or credential storage implementation;
- SIEM products, alerting runbooks, incident response procedures, or security operations;
- Infrastructure deployment, environment hardening, or cloud security service configuration;
- Dependency vulnerability scanning tools or supply-chain automation;
- Phase 4 Product Development Methodology;
- Implementation tasks, security test suites, or delivery methodology.

### 2.5 Amendment

This document may be amended only through explicit governance review per REPOSITORY_STANDARDS.md. Amendments must preserve product authority supremacy, constitutional compliance, and extension-not-replacement discipline. Trust boundary changes require coordinated review with SYSTEM_ARCHITECTURE.md per SYS §19.1.

---

## 3. Relationship to Upstream Authority

### 3.1 Constitutional and principles consumption

Security governance **implements** PROJECT_CONSTITUTION.md and ARCHITECTURE_PRINCIPLES.md at the security layer. It honors:

- **EP-7** — immutable domain rule fidelity at security boundaries;
- **EP-8** — delegated governance only — no ambient administrative authority;
- **EP-9** — security before convenience;
- **AP-14** — security by design — constraints embedded in structure;
- **AP-15** — authority integrity — no privilege expansion paths;
- **AP-16** — ownership clarity — single authoritative ownership model;
- **AP-17** — failure containment — security failures do not corrupt unrelated truth.

Constitutional governance gates and prohibited activities are not restated here.

### 3.2 Product authority consumption

Security governance **consumes** approved product architecture without redefinition:

| Product constraint | Security governance treatment |
|--------------------|------------------------------|
| Trust, verification, and moderation meaning (Product Chapter 20) | Security honors trust semantics — does not redefine moderation meaning |
| Role grant and revocation execution (Product Chapters 51, 53) | Role transitions occur only through governed governance paths |
| Publication integrity and moderation participation (Product Chapters 47, 52) | Security preserves participation–execution separation at access boundaries |
| Performance Integrity (Product Chapter 63) | Security responses must not signal false completion or leak ineligible state |
| Marketplace posture (PLT-1) | Security architecture must not enable PMS, CRM, or agency operations transformation |
| Immutable domain rules (ENGINEERING_HANDOFF.md §5.5) | Security invariants enforce ownership, moderation, contact sourcing, and role model |

### 3.3 Platform and system consumption

Security governance **realizes** PLATFORM_ARCHITECTURE.md and SYSTEM_ARCHITECTURE.md security structure:

- Identity & Role Context Domain (Platform Domain 1) is the authoritative security context domain;
- SYSTEM_ARCHITECTURE.md §11 trust boundary model is the baseline perimeter catalog;
- SYSTEM_ARCHITECTURE.md §18 SYS-1 through SYS-8 operationalize platform security invariants at system scope;
- SYS-INV-8 through SYS-INV-13 extend identity, visibility, governance, and external-input rules;
- External Integration System owns integration mediation — security governs trust posture, not integration implementation.

### 3.4 Domain standards consumption

| Standard | Security relationship |
|----------|----------------------|
| BACKEND_ARCHITECTURE.md §12–13 | Declares identity consumption and authorization enforcement points — this document owns policy governance |
| FRONTEND_ARCHITECTURE.md §3–4 | Declares surface trust boundaries — this document owns cross-surface security governance |
| API_STANDARDS.md §10–11 | Declares contract trust boundaries and security restraint — this document owns access-boundary security policy |
| DATABASE_ARCHITECTURE.md §6–8 | Declares persistence authorization and evidence records — this document owns data-protection classification |

### 3.5 Non-duplication rule

Upstream documents own their definitions. This document **references and extends** — it does not restate platform domain catalogs, system component inventories, backend layer models, API contract rules, persistence ownership maps, or product lifecycle tables.

---

## 4. Security Responsibility Boundaries

### 4.1 Security governance scope

Security governance governs **architectural security discipline** — who must protect what, at which boundary, with which invariants — across all technologies that may eventually implement Rento.

Security governance does **not** govern security operations, tooling selection, or incident response execution.

### 4.2 Responsibility ownership model

| Responsibility class | Owning authority | Must not own |
|--------------------|------------------|--------------|
| **Identity truth** | Identity & Access System (SYSTEM_ARCHITECTURE.md) | Application Platform System; Experience Systems |
| **Role scope model** | Identity & Role Context Domain — consumed, not redefined | Backend domain units; frontend surfaces |
| **Authentication boundary policy** | Security Standards (this document) | Domain business logic; presentation logic |
| **Authorization policy** | Security Standards (this document) | Domain invariants (domain services enforce); product meaning |
| **Trust boundary definition** | SYSTEM_ARCHITECTURE.md — specialized by Security Standards | Implementation encoding |
| **Domain ownership enforcement** | Owning domain realization units (BACKEND_ARCHITECTURE.md) | Security Standards (declares obligation, not domain logic) |
| **Contract access security** | Security Standards + API Standards joint consumption | Transport implementation |
| **Data classification policy** | Security Standards (this document) | Physical storage design |
| **Credential and secret governance** | Security Standards (this document) | Secret storage products |
| **Security event classification** | Security Standards (this document) | SIEM configuration |
| **Audit evidence governance** | Security Standards + DATABASE_ARCHITECTURE.md + Observability System | Domain truth |
| **Privacy boundary policy** | Security Standards (this document) | Product experience copy |
| **External integration trust** | Security Standards + External Integration System | External provider internals |
| **Internal service trust** | Security Standards (this document) | Infrastructure product selection |
| **Security invariant registry** | Security Standards (this document) | Platform PLT-* definitions |

### 4.3 Security ownership principles

1. **Single context authority** — identity and role context have one authoritative source (Identity & Access System);
2. **Policy separate from enforcement site** — Security Standards define policy; declared enforcement points apply policy (BACKEND_ARCHITECTURE.md §13.2);
3. **Domain is final mutation authority** — authorization at access boundary never substitutes for domain-level ownership validation;
4. **Evidence is not truth** — audit and security events record actions — they do not replace authoritative domain state;
5. **Surface isolation** — Public, Professional, and Governance experience surfaces maintain separable security postures;
6. **Delegated governance only** — administrative capabilities require explicit role context and delegated scope — never ambient omniscience.

### 4.4 Security responsibility prohibitions

| Prohibited assignment | Reason |
|-----------------------|--------|
| Frontend owning session authority | Client runtime is not authoritative for identity or role |
| API layer defining authorization policy | Contracts transport capability — policy belongs to Security Standards |
| Persistence layer performing authorization policy | Persistence routes writes — policy consumption only |
| Observability mutating domain state | Evidence collection must not become mutation path |
| External systems defining marketplace truth | External inputs are facts — not ownership |
| Operational access implying domain mutation | Engineering operator access is operational boundary — not governance execution |
| Security Standards redefining product trust meaning | Product Chapter 20 retains meaning authority |

---

## 5. Trust Boundaries

### 5.1 Inherited boundary catalog

SYSTEM_ARCHITECTURE.md §11 defines the authoritative system-level trust boundary catalog:

| Boundary | Architectural trust posture |
|----------|----------------------------|
| **Public boundary** | Untrusted actor — highest exposure restraint |
| **Authenticated boundary** | Identity-verified actor — role context required for protected operations |
| **Privileged administrative boundary** | Delegated governance actor — narrowest operational scope |
| **Internal service boundary** | System component to system component — mutual authentication required |
| **External integration boundary** | Third-party trust zone — untrusted until validated and normalized |
| **Storage boundary** | Data at rest and in transit — classification-matched protection |
| **Operational boundary** | Engineering and support access — no default domain mutation authority |

This document **extends** the catalog with governance obligations. It does not replace boundary definitions.

### 5.2 Experience surface trust boundaries

Experience Systems realize three separable trust perimeters (FRONTEND_ARCHITECTURE.md §3.2):

| Surface | Trust perimeter | Permitted capability class |
|---------|-----------------|---------------------------|
| **Public Experience Surface** | Public / authenticated consumer | Public reads; consumer-scoped participation |
| **Professional Experience Surface** | Professional participation | Owner-scoped inventory and profile operations |
| **Governance Experience Surface** | Privileged governance | Delegated governance execution only |

**Governance rules:**

1. Capabilities must not cross surface trust boundaries without explicit architectural authorization;
2. Navigation reachability does not imply authorization — backend validation is mandatory;
3. Cross-surface state must not leak — Professional or Governance state must not appear in Public surface without authorization;
4. Each surface honors visibility eligibility independently.

### 5.3 Boundary crossing governance

| Crossing | Required validation |
|----------|---------------------|
| Public → Authenticated | Identity context establishment |
| Authenticated → Domain mutation | Role scope + operation eligibility + ownership where applicable |
| Any → Governance execution | Admin role context + delegated authority scope |
| External → Internal | Input validation, normalization, failure containment |
| Internal service → Domain mutation | Service identity + owning-domain authorization path |
| Operational → Production data | Operational boundary policy — separate from user authorization |
| Storage read/write | Data classification match + authorization outcome |

### 5.4 Trust increases inward

Trust level increases toward authoritative domain operations. Each outward-to-inward crossing requires explicit validation. Inward-to-outward data flow requires visibility eligibility and classification review.

Assumed trust is prohibited. Implicit boundary crossing is prohibited.

### 5.5 Trust boundary change governance

Trust boundary modification is a **high-impact architectural change** requiring:

1. Documented architectural justification;
2. Impact assessment against SEC-INV invariants, SYS-INV invariants, and PLT invariants;
3. Coordinated review with SYSTEM_ARCHITECTURE.md;
4. Explicit governance approval before publication;
5. Downstream standards alignment before implementation authorization.

---

## 6. Identity and Authentication Governance

### 6.1 Identity architectural posture

Identity record truth is owned exclusively by **Identity & Access System** (SYS-INV-3). All other components **consume** identity context.

The role scope model (`user` | `realtor` | `admin`) is defined by Identity & Role Context Domain and **must not be redefined** by security governance or implementation.

### 6.2 Authentication boundary governance

**Authentication** establishes that an actor is who they claim to be and binds an identity context to subsequent operations.

| Governance element | Rule |
|--------------------|------|
| **Authentication ownership** | Identity & Access System — mechanism defined in future Authentication Architecture |
| **Authentication boundary location** | Between untrusted actor and authenticated operation paths |
| **Protected operation rule** | No protected operation proceeds without established identity context (BACKEND_ARCHITECTURE.md §12.3) |
| **Client claim rule** | Client-presented identity claims are not authoritative — system identity context prevails |
| **Session authority** | Session authority is system-scoped — client session state is not authoritative |
| **Mechanism isolation** | Authentication mechanism must not embed in domain business logic |

### 6.3 Identity propagation governance

**Identity propagation** is the architectural discipline of carrying authenticated actor context and role scope through all operation paths that require it.

| Propagation rule | Obligation |
|------------------|------------|
| **SEC-ID-1** | Actor context must be established before Application Platform System domain operations (SYS-INV-8) |
| **SEC-ID-2** | Role context propagates through orchestration to each domain invocation |
| **SEC-ID-3** | Background and asynchronous paths carry equivalent identity context — no anonymous domain mutation |
| **SEC-ID-4** | API contract invocation attaches identity context per Security Standards — format belongs to Authentication Architecture |
| **SEC-ID-5** | Internal service invocations carry service identity distinct from human actor identity |
| **SEC-ID-6** | Identity propagation must survive orchestration boundaries without loss or substitution |

### 6.4 Authentication boundary prohibitions

- Authentication performed inside domain services;
- Role scope inferred from client claims without system validation;
- Shared authentication bypass for testing that persists into production paths;
- Authentication mechanism selection driven by presentation convenience;
- Identity context optional for mutations "temporarily" during development.

### 6.5 Role elevation governance

Role binding transitions occur **only** via Governance Execution outcome applied to Identity & Access System (SYS-INV-11).

Realtor-to-admin escalation paths outside Governance Execution are architecturally prohibited (SYS-1, SEC-INV-1).

---

## 7. Authorization Governance

### 7.1 Authorization architectural posture

**Authorization** determines whether an authenticated actor with established role context may perform a specific operation on a specific resource.

Security Standards own **authorization policy governance**. Domain services own **operation eligibility enforcement** within domain invariants. Implementation standards own **enforcement mechanism**.

### 7.2 Authorization enforcement point governance

BACKEND_ARCHITECTURE.md §13.2 declares architectural enforcement points. Security governance assigns policy obligations:

| Enforcement point | Policy obligation |
|-------------------|-------------------|
| **Access Adaptation** | Reject protected operations without authentication presence; enforce surface-appropriate contract scope |
| **Application Orchestration** | Validate role scope sufficient for use-case invocation; sequence authorization before domain calls |
| **Domain Services** | Enforce ownership scope, operation eligibility, mutation authority — final rejection authority |
| **Governance Realization Unit** | Validate delegated authority scope for every governance execution operation |
| **Persistence Boundary** | Permit writes only when owning-domain authorization confirmed (DATABASE_ARCHITECTURE.md DB-OWN-2) |
| **Frontend presentation boundary** | Enforce capability visibility before display — presentation gate, not policy definition |
| **API contract boundary** | Restrict contract exposure to trust-boundary-appropriate capability classes (API_STANDARDS.md) |

### 7.3 Defense in depth governance

Authorization must be validated at **access boundary** and **domain boundary**. Access boundary permission does not substitute for domain-level rejection.

| Layer | Validates |
|-------|-----------|
| Surface / contract | Actor presence, contract scope, trust boundary appropriateness |
| Orchestration | Role scope for use-case, cross-domain sequencing integrity |
| Domain | Ownership, eligibility, forbidden mutations, delegated scope |
| Persistence | Write routing matches owning authority |

### 7.4 Least privilege governance

**Least privilege** requires that every actor, service, and operational identity receives the minimum capability set required for its declared architectural role — no more.

| Actor class | Privilege posture |
|-------------|-------------------|
| **Anonymous public actor** | Public eligibility reads only — no mutation |
| **Authenticated user** | User-scoped continuity and engagement — no foreign private data |
| **Realtor** | Owner-scoped inventory and professional profile — no other owners' inventory, no governance internals |
| **Administrator** | Delegated governance execution scope — no unbounded platform omniscience |
| **Internal service identity** | Declared service contract scope — no human-admin equivalent by default |
| **Operational identity** | Operational boundary access — no default domain mutation authority (SYS-8) |

**Least privilege rules:**

1. Capabilities are granted by architectural role — not by implementation convenience;
2. New capabilities require explicit authorization policy entry — not implicit endpoint exposure;
3. Privilege expansion requires governance review — not incremental accumulation;
4. Cross-role capability reuse is prohibited without explicit architectural contract;
5. Temporary privilege elevation must be time-bounded, scoped, and auditable when authorized.

### 7.5 Immutable domain authorization rules

The following authorization outcomes are **architecturally required** regardless of enforcement mechanism (BACKEND_ARCHITECTURE.md §13.4):

| Rule | Authorization outcome |
|------|----------------------|
| Realtors edit only own listings | Deny cross-owner mutation |
| New realtor listings enter `pending` | Deny direct `available` publication by realtor |
| Public display only publicly eligible state | Deny exposure of pending moderation or non-available inventory |
| Contacts sourced from professional profiles | Deny listing-level contact injection |
| Moderation transitions only through governance | Deny direct status mutation outside Governance Execution |
| Role grants only through governance | Deny direct role assignment outside Governance Execution |
| Admin executes only delegated governance | Deny operations beyond delegated scope |

### 7.6 Authorization prohibitions

- Ambient authority — capabilities available without explicit architectural path;
- Authorization policy defined in API contracts or persistence schemas;
- Generic admin endpoints spanning undeclared governance scope;
- Authorization bypass for background jobs;
- Client-side authorization accepted as system truth.

---

## 8. Data Classification Governance

### 8.1 Classification purpose

Data classification governs **protection obligations** based on sensitivity, visibility eligibility, and regulatory exposure — independent of storage technology.

Classification drives authorization requirements, boundary crossing rules, retention posture, and privacy obligations.

### 8.2 Classification taxonomy

| Class | Definition | Examples (architectural) |
|-------|------------|--------------------------|
| **Public marketplace data** | State eligible for anonymous or general public access | Publicly available listings, public profile fields designated public |
| **Authenticated participant data** | State visible only to authenticated actors within permitted scope | User favorites, saved searches, inquiry threads within participant scope |
| **Professional scope data** | State visible within owner or professional participation boundary | Owner inventory drafts, pending listings, professional profile management |
| **Governance scope data** | State visible only within delegated administrative scope | Moderation queue, role grant records, verification adjudication context |
| **Identity and credential data** | Identity records, authentication factors, session binding metadata | Identity records — Identity & Access System scope |
| **Security-sensitive operational data** | Credentials, secrets, integration keys, service identity material | Classified per §9 — highest protection obligation |
| **Audit and evidence data** | Append-oriented records of privileged actions and security events | Governance execution evidence, security event records |
| **Derived and cache data** | Non-authoritative copies built from authoritative sources | Read projections, cached external facts — subordinate to source classification |

### 8.3 Classification ownership

| Class | Classification authority | Protection obligation owner |
|-------|------------------------|----------------------------|
| Domain marketplace data | Owning domain realization unit | Security Standards + owning domain |
| Identity data | Identity & Access System | Security Standards |
| Credential and secret material | Security Standards | Security Standards |
| Audit and evidence | Producing authority + Security Standards | Security Standards + Observability System |
| Derived projections | Deriving authority | Source classification inherited |

### 8.4 Protection obligation governance

| Obligation | Applies when |
|------------|--------------|
| **Visibility eligibility enforcement** | Any read crossing trust boundary |
| **Mutation authorization** | Any write to authoritative record |
| **Minimum necessary disclosure** | Any response composition across trust boundaries |
| **Classification-matched storage access** | Any storage boundary crossing |
| **Retention alignment** | Lifecycle transition, archive, and disposal governance |
| **Evidence separation** | Audit records must not replace domain truth (DATABASE_ARCHITECTURE.md DB-INV-8) |

### 8.5 Data classification prohibitions

- Public classification by default for ambiguous data;
- Classification inferred from convenience of implementation;
- Derived cache treated as authoritative without reconciliation;
- Audit records promoted to domain truth;
- Cross-classification leakage in error responses (API_STANDARDS.md security restraint).

---

## 9. Credential and Secret Governance

### 9.1 Governance scope

This section governs **architectural treatment** of credentials and secrets — not storage products, rotation automation, or cryptographic algorithms.

**Credential** — material used to prove identity or authorize access.
**Secret** — material whose disclosure would compromise system integrity, integration trust, or data protection.

### 9.2 Credential classes

| Class | Architectural treatment |
|-------|--------------------------|
| **Human authentication factors** | Identity & Access System scope — highest protection; never domain-accessible |
| **Service identity credentials** | Scoped to declared internal service contract — not human-equivalent |
| **Integration credentials** | External Integration System boundary — scoped per integration |
| **Operational access credentials** | Operational boundary — no default domain mutation authority |
| **Development and staging credentials** | Environment-separated — must not grant production authority |

### 9.3 Secret management governance principles

| Principle | Rule |
|-----------|------|
| **SEC-CRED-1** | Secrets must not be embedded in domain logic, presentation code, or contract definitions |
| **SEC-CRED-2** | Secrets must not traverse trust boundaries in cleartext |
| **SEC-CRED-3** | Each secret has declared scope, owning authority, and permitted consumers |
| **SEC-CRED-4** | Secret material must not appear in audit records, error responses, or public logs |
| **SEC-CRED-5** | Integration secrets are integration-scoped — not platform-wide |
| **SEC-CRED-6** | Credential rotation is a governed lifecycle event — not ad hoc replacement |
| **SEC-CRED-7** | Compromised credential response is a security lifecycle event — not routine maintenance |

### 9.4 Secret boundary placement

| Boundary | Secret governance |
|----------|-------------------|
| **External integration boundary** | Integration credentials consumed only by External Integration System |
| **Internal service boundary** | Service identity credentials scoped to inter-service contract |
| **Storage boundary** | Encryption and access control obligations match data classification — mechanism in implementation standards |
| **Operational boundary** | Operational credentials separated from application runtime credentials |
| **Repository boundary** | No secret material in version-controlled artifacts |

### 9.5 Credential governance prohibitions

- Secrets in source repository, contract schemas, or client-distributed artifacts;
- Shared platform-wide integration credential across unrelated integrations;
- Production credentials in non-production environments;
- Secret retrieval by Experience Systems;
- Credential scope expansion without governance review.

---

## 10. Security Event Governance

### 10.1 Security event purpose

**Security events** are architecturally classified signals indicating authentication outcomes, authorization decisions, boundary violations, credential lifecycle changes, integration trust failures, and suspected policy violations.

Security event governance defines **what must be signal-visible** — not how events are collected, stored, or alerted upon.

### 10.2 Security event classes

| Class | Architectural significance |
|-------|---------------------------|
| **Authentication event** | Identity context establishment, failure, or termination |
| **Authorization decision event** | Permit or deny at declared enforcement point |
| **Boundary violation event** | Attempted crossing without required validation |
| **Privilege change event** | Role binding transition via governance path |
| **Credential lifecycle event** | Issuance, rotation, revocation, compromise declaration |
| **Integration trust event** | External validation failure, abnormal external behavior |
| **Data protection event** | Classification violation attempt, abnormal access pattern at governance level |
| **Operational access event** | Engineering or support access crossing operational boundary |

### 10.3 Security event ownership

| Event class | Producing authority | Consumption |
|-------------|---------------------|-------------|
| Authentication events | Identity & Access System | Observability System; Security governance review |
| Authorization decisions | Enforcement point owner | Observability System; audit evidence where required |
| Boundary violations | Detecting boundary authority | Observability System; security review |
| Privilege changes | Governance Execution → Identity & Access System | Audit evidence; Observability System |
| Credential lifecycle | Credential owning authority | Security governance; restricted operational access |
| Integration trust | External Integration System | Observability System; domain failure containment |

### 10.4 Security event governance rules

1. **Material events must be legible** — security-relevant outcomes must not be silent;
2. **Events are evidence** — security events do not mutate domain truth;
3. **Classification-appropriate retention** — retention governed by audit and privacy policy — not implementation default;
4. **No sensitive payload in events** — secrets, credentials, and ineligible state must not appear in event records;
5. **Correlation without omniscience** — events may correlate across boundaries — operational access does not grant unrestricted correlation by default;
6. **Failure visibility** — authentication and authorization failures at governance scope must be distinguishable from system errors where architecturally required.

### 10.5 Security event prohibitions

- Security events as domain mutation triggers without domain authorization path;
- Complete absence of authorization decision legibility at governance scope;
- Public exposure of security event streams;
- Security event content that leaks cross-trust-boundary state.

---

## 11. Audit Governance

### 11.1 Audit architectural role

**Audit** provides durable, append-oriented evidence of privileged actions and governance execution — supporting legibility, accountability, and reconciliation.

Audit governance is distinct from:

- **Domain truth** — authoritative marketplace state;
- **Security events** — real-time security signals;
- **Operational telemetry** — system health and performance legibility;
- **Product trust meaning** — moderation semantics (Product Chapter 20).

### 11.2 Audit evidence classes

| Class | Source | Persistence governance |
|-------|--------|------------------------|
| **Governance execution evidence** | Governance Realization Unit | Append-only; DATABASE_ARCHITECTURE.md evidence aggregates |
| **Privileged administrative action evidence** | Governance Experience Surface operations | Append-only; governance scope classification |
| **Role grant and revocation evidence** | Governance Execution → Identity transition | Append-only; identity classification |
| **Security policy violation evidence** | Security boundary authorities | Append-only; security classification |
| **Operational access evidence** | Operational boundary crossings | Append-only; operational classification |

### 11.3 Audit governance rules

| Rule | Obligation |
|------|------------|
| **SEC-AUD-1** | Governance execution must produce audit legibility — per Product Admin Platform and DATABASE_ARCHITECTURE.md |
| **SEC-AUD-2** | Audit records are append-oriented — no retroactive mutation of evidence |
| **SEC-AUD-3** | Audit records do not replace authoritative domain state |
| **SEC-AUD-4** | Audit access requires governance or security scope — not public |
| **SEC-AUD-5** | Audit lineage must reference valid execution context — actor, delegated scope, operation class |
| **SEC-AUD-6** | Audit retention must satisfy governance legibility requirements — disposal is governed lifecycle event |
| **SEC-AUD-7** | Audit and security event streams remain separable — correlation permitted, merger prohibited |

### 11.4 Audit versus observability boundary

| Concern | Owner | Purpose |
|---------|-------|---------|
| **Audit evidence** | Security Standards + DATABASE_ARCHITECTURE.md + producing authority | Accountability and governance legibility |
| **Operational telemetry** | Observability System | System health, failure detection, operational diagnosis |
| **Security events** | Security Standards | Security policy visibility |

Observability System collects across components read-only (SYS-INV-17). Observability must not become undeclared audit authority.

### 11.5 Audit prohibitions

- Audit records mutating domain aggregates;
- Governance execution without audit legibility;
- Migration or archive that destroys mandatory governance evidence below legibility requirements;
- Audit access granting domain mutation authority;
- Organizational compliance audit scope conflation with platform governance audit scope (Product Chapter 51 Governance Continuity Scope).

---

## 12. Privacy Governance

### 12.1 Privacy boundary purpose

**Privacy governance** defines architectural boundaries for personal and sensitive participant data — independent of jurisdiction-specific legal implementation.

Privacy governance honors Product Design Standard accessibility and trust principles without redefining product experience.

### 12.2 Privacy scope

| Data subject | Privacy boundary |
|--------------|------------------|
| **Renters (users)** | User-scoped data not disclosed across user boundaries |
| **Realtors** | Professional data disclosed only within permitted marketplace context |
| **Administrators** | Governance access does not imply unrestricted personal data harvesting |
| **Inquiry participants** | Communication content scoped to thread participants |

### 12.3 Privacy governance rules

1. **Purpose limitation** — participant data collected only for declared marketplace capability;
2. **Scope limitation** — data access matches role scope and operation purpose;
3. **Minimum necessary** — responses contain minimum data required for authorized capability;
4. **No cross-participant leakage** — error responses, logs, and events must not expose foreign private data;
5. **Professional contact integrity** — contacts sourced from professional profiles — not arbitrary listing injection (immutable domain rule);
6. **Governance proportionality** — administrative access limited to delegated governance purpose — not surveillance beyond scope;
7. **Retention alignment** — privacy classification informs retention and archive governance.

### 12.4 Privacy and data classification relationship

Privacy-sensitive data receives classification no lower than **authenticated participant data**. Identity and credential data receive highest classification.

De-identification, anonymization, and lawful basis implementation belong to implementation standards — privacy **boundaries** are architectural.

### 12.5 Privacy prohibitions

- Cross-user private data in public API responses;
- Administrative browsing beyond delegated governance purpose;
- Participant data in client artifacts beyond authorized scope;
- Privacy boundary relaxation for analytics without governance review;
- Product trust meaning redefined as privacy implementation convenience.

---

## 13. External Integration Governance

### 13.1 Integration trust posture

All external interaction passes through **External Integration System** (SYSTEM_ARCHITECTURE.md §12). External systems reside in the **external integration trust zone** — untrusted until validated and normalized.

External systems **never** hold authoritative marketplace truth (SYS-INV-12).

### 13.2 External trust governance rules

| Rule | Obligation |
|------|------------|
| **SEC-EXT-1** | No direct external invocation bypassing External Integration System |
| **SEC-EXT-2** | External inputs validated before domain promotion (SYS-7) |
| **SEC-EXT-3** | Integration failure contained — no domain corruption |
| **SEC-EXT-4** | External dependency degradation observable |
| **SEC-EXT-5** | Integration credentials scoped per integration — not platform-wide |
| **SEC-EXT-6** | Cached external facts are non-authoritative until promoted through domain path |
| **SEC-EXT-7** | Future capabilities require explicit architectural placement before integration (PLT-17, Product Chapter 64) |

### 13.3 Permitted integration categories (security posture)

| Category | Trust treatment |
|----------|-----------------|
| **Communication delivery** | Transport only — no domain truth from provider |
| **Media processing** | Reference update through domain path — bytes do not define meaning |
| **Identity verification (if authorized)** | External fact ingestion — promotion through Trust & Integrity / Governance domains |
| **Future capabilities** | Independent evaluation — security placement before authorization |

### 13.4 External integration prohibitions

- External provider as source of ownership or moderation state;
- Experience System direct external service invocation;
- External state cached as authoritative without reconciliation;
- Integration scope expansion without security and system architecture review;
- Third-party trust zone treated as internal service trust.

---

## 14. Internal Trust Governance

### 14.1 Internal trust purpose

**Internal trust governance** defines how system components authenticate and authorize interaction with each other — distinct from human actor authentication.

### 14.2 Internal trust classes

| Relationship | Trust posture |
|--------------|---------------|
| **Experience System → Backend** | Contract-bound; actor context attached; backend validates all mutations |
| **Backend domain unit → domain unit** | Declared inter-domain contract only — no direct foreign state mutation |
| **Backend → Identity & Access System** | Identity consumption — not identity redefinition |
| **Backend → Persistence** | Write routing through Persistence Boundary — owning authority required |
| **Cross-cutting service → domain** | Observed or invoked through declared contract — no domain truth ownership |
| **Background processor → domain** | Equivalent authorization path to synchronous — no bypass |
| **Internal service → internal service** | Mutual service identity — scoped to contract |

### 14.3 Internal trust governance rules

1. **No trust by network location** — internal network position does not imply authorization;
2. **Service identity is not admin identity** — automation does not receive human governance scope by default;
3. **Component coupling through contracts** — SYS-INV-16; no undeclared direct access;
4. **Background path parity** — SYS-INV-13; asynchronous work honors same ownership and governance validation;
5. **Observability is read-only** — SYS-INV-17; observation does not grant mutation;
6. **Infrastructure convenience does not bypass trust boundaries** — SYS §18 boundary rule.

### 14.4 Internal trust prohibitions

- Domain mutation from background jobs without authorization path;
- Cross-unit write access without owning-domain authorization;
- Service identity with platform-wide mutation authority;
- Observability tooling with undeclared write access to domain state;
- Shared internal credentials across unrelated components.

---

## 15. Security Lifecycle Governance

### 15.1 Lifecycle scope

Security architecture evolves through **governed extension** — consistent with AP-8, AP-25, and REPOSITORY_STANDARDS.md extension discipline.

Security lifecycle governs how security policy, boundaries, classifications, and invariants change over time.

### 15.2 Security change classes

| Change class | Governance requirement |
|--------------|------------------------|
| **Invariant clarification** | Security Standards review |
| **New enforcement point** | Security Standards + affected domain standard review |
| **Trust boundary modification** | Security Standards + SYSTEM_ARCHITECTURE.md review |
| **New data classification** | Security Standards + owning domain + DATABASE_ARCHITECTURE.md review |
| **New integration trust category** | Security Standards + SYSTEM_ARCHITECTURE.md + integration review |
| **Credential scope change** | Security Standards review + producing authority |
| **Security policy relaxation** | Explicit governance approval — default is not relaxation |
| **New actor class or role scope change** | Product authority + Security Standards + Identity domain review |

### 15.3 Security lifecycle rules

1. **No silent policy drift** — security policy changes require documented governance act;
2. **Extension not replacement** — upstream security structure consumed, not rewritten;
3. **Implementation follows authorization** — security implementation requires implementation authorization separate from this document;
4. **Deprecation with lineage** — retired security policy remains traceable in version history;
5. **Incident-driven change** — production incidents may inform policy amendment — incidents do not authorize emergency policy bypass without governance;
6. **Future capability gate** — new capabilities evaluated per Product Chapter 64 before security placement.

### 15.4 Security lifecycle prohibitions

- Temporary security bypass becoming permanent;
- Undocumented trust boundary changes during implementation;
- Security policy modification to accommodate single feature without review;
- Retroactive reduction of audit legibility;
- Security lifecycle conflation with security operations incident response.

---

## 16. Secure Default Principles

### 16.1 Default posture

When architectural choice is ambiguous, security governance defaults to the **more restrictive** posture consistent with EP-9 and AP-14.

### 16.2 Secure default catalog

| Default | Rule |
|---------|------|
| **Deny by default** | Operations require explicit authorization policy — not implicit permission |
| **Authenticate by default** | Protected capabilities require identity context — not anonymous access |
| **Classify before expose** | Data receives classification before crossing trust boundary |
| **Validate before promote** | External inputs validated before becoming domain facts |
| **Scope by role** | Capabilities match role scope — not global access |
| **Delegate explicitly** | Governance capabilities require delegated scope — not ambient admin |
| **Separate surfaces** | Experience surfaces remain trust-isolated by default |
| **Evidence not truth** | Audit and events record — do not replace domain state |
| **Fail contained** | Security failures do not corrupt unrelated authoritative state |
| **No secret in artifact** | Repository and contract artifacts exclude secret material by default |
| **Honest errors** | Error responses do not leak ineligible state (API_STANDARDS.md) |
| **Least duration** | Temporary elevation is time-bounded when permitted |

### 16.3 Secure default prohibitions

- Opt-out security for developer convenience;
- Public-by-default for new data classes;
- Open contract scope until restricted;
- Implicit trust for internal components;
- Security controls marked optional in architectural standards.

---

## 17. Security Invariants

Security invariants apply at security governance scope. They specialize SYS-1 through SYS-8 and SYS-INV invariants without replacing PLT-* or SYS-INV-* definitions.

| ID | Invariant |
|----|-----------|
| **SEC-INV-1** | No realtor privilege escalation to admin outside Governance Execution path |
| **SEC-INV-2** | No direct ownership mutation outside governed domain paths |
| **SEC-INV-3** | No direct moderation status mutation outside Governance Execution path |
| **SEC-INV-4** | No cross-owner resource editing |
| **SEC-INV-5** | Public trust boundary exposes only publicly eligible state |
| **SEC-INV-6** | Administrative operations require explicit admin role context and delegated scope |
| **SEC-INV-7** | External inputs validated before domain promotion |
| **SEC-INV-8** | Operational access does not imply domain mutation authority |
| **SEC-INV-9** | Identity context established before domain mutation |
| **SEC-INV-10** | Role scope consumed from Identity & Access System — not client claims alone |
| **SEC-INV-11** | Authorization validated at access boundary and domain boundary |
| **SEC-INV-12** | Domain service is final mutation authority — access permission does not override domain rejection |
| **SEC-INV-13** | Experience surfaces remain trust-boundary separated |
| **SEC-INV-14** | Secrets and credentials excluded from repository artifacts and contract definitions |
| **SEC-INV-15** | Background and asynchronous paths honor equivalent authorization requirements |
| **SEC-INV-16** | Audit evidence does not mutate authoritative domain state |
| **SEC-INV-17** | Security events and error responses do not leak ineligible cross-boundary state |
| **SEC-INV-18** | Integration interaction mediated through External Integration System only |
| **SEC-INV-19** | Service identity does not receive human governance scope by default |
| **SEC-INV-20** | Security policy changes require governed lifecycle act — no silent drift |

PLT-1 through PLT-17, SYS-INV-1 through SYS-INV-18, and immutable domain rules remain authoritative at their respective scopes.

---

## 18. Dependency Direction

### 18.1 Upstream dependency

Security Standards **depends on** and **consumes**:

```
MASTER_ROADMAP.md
    → RENTO PRODUCT DESIGN STANDARD v1.0
        → ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md
            → PROJECT_CONSTITUTION.md
                → ARCHITECTURE_PRINCIPLES.md
                    → PLATFORM_ARCHITECTURE.md
                        → SYSTEM_ARCHITECTURE.md
                            → PRODUCT_ARCHITECTURE.md
                            → BACKEND_ARCHITECTURE.md
                            → FRONTEND_ARCHITECTURE.md
                            → API_STANDARDS.md
                            → DATABASE_ARCHITECTURE.md
                                → SECURITY_STANDARDS.md (this document)
```

Security Standards must not contradict upstream authority. Product authority prevails on product meaning conflicts.

### 18.2 Downstream dependency

The following **depend on** Security Standards for security policy governance:

| Downstream | Consumes |
|------------|----------|
| **Authentication Architecture** (future) | Authentication boundary policy; identity propagation rules |
| **Authorization Architecture** (future) | Authorization policy; enforcement point obligations; least privilege model |
| **Development Standards** (future) | Secure defaults; secret exclusion; dependency trust rules |
| **Infrastructure security standards** (future) | Trust boundary realization; environment separation; operational boundary |
| **Integration standards** (future) | External trust governance; credential scope |
| **Implementation artifacts** (when authorized) | SEC-INV invariants; classification and boundary obligations |

### 18.3 Horizontal consumption

| Peer standard | Joint governance surface |
|---------------|-------------------------|
| API_STANDARDS.md | Contract trust boundaries; actor context attachment; error restraint |
| BACKEND_ARCHITECTURE.md | Enforcement points; identity consumption; domain final authority |
| FRONTEND_ARCHITECTURE.md | Surface trust boundaries; presentation gate; client non-authority |
| DATABASE_ARCHITECTURE.md | Persistence authorization; evidence classification; retention alignment |

Conflicts between peer standards require explicit governance resolution — silent override prohibited.

### 18.4 Dependency prohibitions

- Implementation artifacts defining security policy independently of Security Standards;
- Authentication Architecture redefining role scope model;
- Infrastructure standards expanding trust boundaries without Security Standards amendment;
- Domain standards declaring security policy ownership.

---

## 19. Downstream Consumers

### 19.1 Consumption model

Downstream standards and implementation **consume** Security Standards by:

1. Referencing applicable SEC-INV invariants;
2. Implementing enforcement at declared enforcement points;
3. Honoring data classification obligations;
4. Preserving trust boundary separation;
5. Producing required security events and audit evidence;
6. Excluding secrets from artifacts under their ownership;
7. Submitting security-impacting changes to security lifecycle governance.

### 19.2 Expected downstream documents

| Document | Expected consumption |
|----------|---------------------|
| **Authentication Architecture** | SEC-ID-* propagation rules; authentication boundary; SEC-INV-9, SEC-INV-10 |
| **Authorization Architecture** | §7 enforcement points; least privilege; SEC-INV-11, SEC-INV-12 |
| **Development Standards** | §16 secure defaults; §9 credential prohibitions; dependency trust |
| **Infrastructure Standards** | §5 trust boundaries at infrastructure scope; operational boundary |
| **Database Standards** | §8 classification; §11 audit; persistence authorization alignment |
| **API implementation standards** | Contract trust boundaries; actor context; error restraint |
| **Frontend implementation standards** | Surface trust boundaries; presentation gate |
| **Backend implementation standards** | Enforcement point realization; domain final authority |
| **Implementation Governance** | SEC-INV compliance verification |

### 19.3 Consumption prohibitions

Downstream consumers must not:

- Redefine trust boundaries without Security Standards amendment;
- Weaken SEC-INV invariants through local convention;
- Introduce authentication or authorization mechanisms not traceable to Security Standards policy;
- Treat this document as implementation authorization.

---

## 20. Prohibited Scope

This document explicitly **does not** specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| OAuth, OpenID Connect, or social login flows | Authentication Architecture / implementation |
| Token formats, JWT structure, or session store design | Authentication Architecture |
| Password hashing algorithms or credential storage format | Authentication Architecture / implementation |
| TLS configuration, cipher suites, or certificate management | Infrastructure security standards |
| Encryption algorithms, key lengths, or key rotation automation | Implementation standards |
| Firewall rules, network ACLs, or security group configuration | Infrastructure security standards |
| WAF configuration or DDoS mitigation products | Infrastructure security standards |
| Kubernetes security policies, pod security, or container hardening | Infrastructure security standards |
| Operating system hardening procedures | Infrastructure / operations |
| IAM product configuration or cloud security service setup | Infrastructure security standards |
| SIEM product selection, alert rules, or runbooks | Security operations |
| Secrets manager products or vault configuration | Implementation standards |
| Vulnerability scanning tools or dependency audit automation | Development / security operations |
| Penetration testing procedures or red team operations | Security operations |
| Incident response playbooks or breach notification procedures | Security operations |
| Compliance certification procedures (SOC, ISO, etc.) | Organizational governance |
| Concrete security libraries, frameworks, or middleware products | Implementation |
| Rate limiting product configuration | Infrastructure / Security implementation |
| Security test case catalogs | Implementation (when authorized) |
| Product trust experience design | Product Design Standard Chapter 20 |

**Governance only.** Implementation proceeds only under separate implementation authorization after applicable standards publication.

---

## 21. Terminology

| Term | Meaning |
|------|---------|
| **Security governance** | Architectural discipline defining security ownership, boundaries, policy, and invariants — not operations |
| **Trust boundary** | Security perimeter requiring validation on crossing — SYSTEM_ARCHITECTURE.md §11 |
| **Identity context** | Established binding of authenticated actor to subsequent operations |
| **Role scope** | Permitted capability class for actor: `user`, `realtor`, or `admin` |
| **Identity propagation** | Carrying identity context and role scope through operation paths |
| **Authentication boundary** | Perimeter where identity context is established before protected operations |
| **Authorization boundary** | Perimeter where operation eligibility is determined against policy |
| **Least privilege** | Minimum capability set required for declared architectural role |
| **Data classification** | Sensitivity and visibility category determining protection obligations |
| **Credential** | Material proving identity or authorizing access |
| **Secret** | Material whose disclosure compromises integrity, integration trust, or data protection |
| **Security event** | Architecturally classified signal of security-relevant outcome |
| **Audit evidence** | Append-oriented durable record of privileged or governance action |
| **Privacy boundary** | Architectural limit on participant data disclosure and purpose |
| **External integration trust zone** | Third-party trust perimeter — untrusted until validated |
| **Internal service trust** | Component-to-component trust distinct from human actor trust |
| **Service identity** | Non-human actor identity for automated inter-component operations |
| **Operational boundary** | Engineering and support access perimeter — SYS §11 |
| **Secure default** | Restrictive architectural posture applied when choice is ambiguous |
| **Security invariant** | Non-negotiable security rule (SEC-INV-*) |
| **Enforcement point** | Architectural location where authorization policy must be applied |
| **Delegated scope** | Governance authority explicitly granted — not ambient admin power |
| **Evidence** | Append-oriented record — not authoritative domain truth |
| **Dependency trust** | Governance of trust posture for software and service dependencies |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, FRONTEND_ARCHITECTURE.md, API_STANDARDS.md, DATABASE_ARCHITECTURE.md, or Product Design Standard retain upstream meaning. This document does not redefine them.

---

## 22. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Security Standards |
| **Authority class** | Authoritative security governance |
| **Phase** | Security Standards — Phase 3 domain standards (MASTER_ROADMAP Scope) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`) |
| **Implementation** | NOT AUTHORIZED |
| **Supersedes** | Informal security convention; undocumented authorization assumptions |
| **Subordinate to** | PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · Product Design Standard |
| **Superior to** | Authentication Architecture · Authorization Architecture · Infrastructure security standards · Development security conventions (on security governance matters — when published) |
| **Does not authorize** | Implementation; authentication mechanism selection; Phase 3 completion |
| **Prerequisites** | Phase 3 Authorization; Constitution; Principles; Platform Architecture; System Architecture; Backend Architecture; Frontend Architecture; API Standards; Database Architecture published — satisfied |

---

**Document path:** `docs/engineering/SECURITY_STANDARDS.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/engineering/API_STANDARDS.md` · `docs/design/PHASE_3_AUTHORIZATION.md`
