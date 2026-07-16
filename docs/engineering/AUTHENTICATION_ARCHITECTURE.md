# Rento Authentication Architecture

**Status:** PUBLISHED — Authentication Architecture  
**Authority class:** Authoritative authentication engineering architecture  
**Binding authority:** Active — per REPOSITORY_STANDARDS.md §7.6  
**Publication:** COMPLETE  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — extension E3, execution order position 5)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Authentication Reviewers, Security Reviewers, Design Council  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · INFRASTRUCTURE_STANDARDS.md · OBSERVABILITY_ARCHITECTURE.md · INTEGRATION_ARCHITECTURE.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · PHASE_3_EVOLUTION_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)

---

## 1. Purpose

This document defines **engineering architecture for authentication** in the Rento platform.

It establishes how identity context is established, authenticated, session-bound, propagated, refreshed, failed, observed, and protected across the system — without selecting authentication products, identity providers, protocols, token formats, credential storage mechanisms, cryptographic algorithms, frontend implementation patterns, backend middleware, infrastructure products, or operational runbooks.

This document answers:

- What Authentication Architecture owns versus what Security Standards, System Architecture, Integration Architecture, API Standards, Backend Architecture, Frontend Architecture, Database Architecture, Infrastructure Standards, and Observability Architecture own;
- How authentication establishes identity context without redefining role scope, authorization policy, product meaning, or domain truth;
- How authentication mechanism governance remains subordinate to Security Standards and Identity & Access System boundaries;
- How session authority differs from client session presentation and from domain state;
- How authentication failures, credential events, and identity-context proof become visible without leaking secrets;
- What validation requirements apply before downstream standards or implementation may consume this authority;
- What invariants and prohibitions preserve product authority, repository authority, security authority, and implementation independence.

Authentication Architecture is **identity-context establishment governance**. It is not authorization policy, not role scope design, not credential taxonomy ownership, not product identity experience, not provider implementation, not token design, and not implementation guidance.

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
                        ├── Product architecture (PRODUCT_ARCHITECTURE.md)
                        ├── Backend architecture (BACKEND_ARCHITECTURE.md)
                        ├── Frontend architecture (FRONTEND_ARCHITECTURE.md)
                        ├── API standards (API_STANDARDS.md)
                        ├── Database architecture (DATABASE_ARCHITECTURE.md)
                        ├── Security standards (SECURITY_STANDARDS.md)
                        ├── Database standards (DATABASE_STANDARDS.md)
                        ├── Infrastructure standards (INFRASTRUCTURE_STANDARDS.md)
                        └── Peer specializations under System Architecture
                            ├── Observability architecture (OBSERVABILITY_ARCHITECTURE.md)
                            ├── Integration Architecture (INTEGRATION_ARCHITECTURE.md)
                            ├── Authentication Architecture (this document)
                            ├── Authorization Architecture (when published)
                            └── Development Standards · Implementation Governance (when published)
                                → Implementation artifacts
```

Authentication Architecture is a **peer specialization** under System Architecture. It is subordinate to Security Standards on authentication policy, credential governance, data classification, and security event governance. It is peer to Integration Architecture and future Authorization Architecture. Phase 3 execution order governs publication sequencing only; it does not create authority inheritance between peer authorities.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| SYSTEM_ARCHITECTURE.md | Identity & Access System component; Domain 1 ownership; session authority state; authentication boundary enforcement | Specializes authentication mechanism governance inside the Identity & Access System boundary |
| SECURITY_STANDARDS.md | Authentication boundary policy, identity propagation governance, credential and secret governance, security event classification | Consumes security policy — does not redefine security policy or credential taxonomy |
| INTEGRATION_ARCHITECTURE.md | External mediation boundaries and external provider trust handoff | Consumes external identity provider mediation rules where future external identity sources are authorized |
| API_STANDARDS.md | Access contract governance and actor context attachment | Defines authentication context establishment requirements without defining API schemas |
| BACKEND_ARCHITECTURE.md | Backend identity consumption posture and prohibition on domain-service authentication | Defines authentication boundary obligations consumed by backend access adaptation |
| FRONTEND_ARCHITECTURE.md | Client session presentation copy, access consumption, authentication-gated composition | Defines system session authority boundaries without owning frontend presentation |
| DATABASE_ARCHITECTURE.md | Identity data and session state persistence ownership separation | Consumes persistence ownership — does not define schema or storage |
| INFRASTRUCTURE_STANDARDS.md | Secret injection, runtime identity, environment separation, operational boundary | Consumes infrastructure prerequisites — does not define infrastructure implementation |
| OBSERVABILITY_ARCHITECTURE.md | Authentication outcome evidence, identity-context proof, security event legibility | Consumes observability obligations for proof and failure visibility |
| PRODUCT_ARCHITECTURE.md | Product role meaning, participation/execution separation, trust semantics | Preserves product meaning — does not redefine roles or experience |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for status honesty and repository workflow |

### 2.3 What this document owns

- Authentication architecture purpose and responsibility boundaries;
- Identity context establishment governance;
- Authentication boundary model;
- Session authority lifecycle at architecture level;
- Credential presentation and verification posture at architecture level;
- Authentication factor and credential consumption boundaries without taxonomy ownership;
- Authentication state classification;
- Authentication failure and recovery posture;
- Authentication observability and audit legibility obligations;
- External identity source mediation rules;
- Peer authority interaction model;
- Authentication validation gates;
- Authentication extension rules;
- Authentication architecture invariants (AUTHN-INV-*).

### 2.4 What this document does not own

- Product meaning, role semantics, realtor/admin participation meaning, or Product Design Standard evolution;
- Role model definition (`user` | `realtor` | `admin`) or role binding governance;
- Authorization policy, permission model, entitlement evaluation, access control decisions, or least-privilege policy;
- Domain mutation authority, ownership validation, moderation state, listing truth, or governance execution authority;
- Credential taxonomy, secret governance, cryptographic policy, data classification, security event taxonomy, or audit evidence taxonomy;
- Identity provider selection, authentication protocol, token format, password rules, MFA product, session store, cryptographic algorithm, or storage mechanism;
- API endpoint, payload schema, header format, status code, transport protocol, or frontend route design;
- Database schema, index, identity table design, session storage design, migration script, or persistence product;
- Infrastructure topology, secret manager product, TLS configuration, deployment configuration, or operational runbook;
- Engineering release execution, implementation, Phase 3 completion, or Phase 4 methodology.

### 2.5 Amendment

After publication, this document may be amended only through repository-governed review per `REPOSITORY_STANDARDS.md`. Amendments must preserve product authority supremacy, Engineering Constitution compliance, Identity & Access System ownership, Security Standards policy supremacy, Integration Architecture mediation boundaries, Observability Architecture proof obligations, and implementation independence.

---

## 3. Relationship To Upstream Authority

### 3.1 System architecture consumption

Authentication Architecture specializes SYSTEM_ARCHITECTURE.md Component 5 — Identity & Access System.

| System declaration | Authentication Architecture treatment |
|--------------------|---------------------------------------|
| Identity & Access System owns Identity & Role Context domain truth | Authentication establishes identity context inside this owner boundary |
| Authentication boundary enforcement is Identity & Access System responsibility | Defines authentication boundary governance and validation gates |
| Session authority state is system-scoped, not client-scoped | Defines session authority lifecycle and client-copy prohibitions |
| Credential state is owned by Identity & Access System; format belongs to security standards | Consumes credential governance without defining formats |
| Authentication mechanism is replaceable | Defines stable mechanism obligations independent of product or provider choice |
| Role binding transitions occur from delegated governance outcomes | Preserves role binding governance; does not redefine role grants |

### 3.2 Security standards consumption

Security Standards remains authoritative for authentication boundary policy, credential and secret governance, data classification, security events, and secure defaults.

| Security obligation | Authentication treatment |
|---------------------|--------------------------|
| Authentication establishes actor identity context | Defines architecture-level establishment lifecycle and proof obligations |
| Client claims are not authoritative | Requires system validation before protected operation consumption |
| Session authority is system-scoped | Defines client session copies as presentation state only |
| Credential classes and secret governance are security-owned | Consumes classes and scope; does not redefine taxonomy |
| Authentication failures are security-relevant events where applicable | Requires event eligibility without redefining event taxonomy |
| Authentication mechanism must not embed in domain business logic | Defines separation between authentication boundary and domain services |

### 3.3 Integration architecture consumption

Integration Architecture is published and binding. Authentication Architecture consumes it where external identity sources, identity providers, or external credential verification paths are introduced by future implementation or standards.

| Integration obligation | Authentication treatment |
|------------------------|--------------------------|
| External providers are untrusted until validated and normalized | External identity assertions require integration mediation before authentication consumption |
| Provider replacement preserves mediation and trust boundaries | Authentication provider mechanisms must remain replaceable |
| External trust evidence must be observable | External identity-source validation outcomes require traceability |
| Integration credentials are scoped | External identity provider credentials remain integration-scoped and security-governed |
| External facts are subordinate until accepted by owning authority | External identity assertions do not become identity truth without Identity & Access System acceptance |

### 3.4 API, backend, and frontend consumption

Authentication Architecture defines identity context establishment. API, backend, and frontend authorities define their own boundary responsibilities.

| Authority | Authentication treatment |
|-----------|--------------------------|
| API_STANDARDS.md | Protected requests require established actor context; authentication does not define contract syntax |
| BACKEND_ARCHITECTURE.md | Backend consumes authenticated identity context; domain services must not perform authentication |
| FRONTEND_ARCHITECTURE.md | Frontend holds session presentation copy only; system session authority remains Identity & Access System |
| DATABASE_ARCHITECTURE.md | Identity and session persistence ownership remains persistence-governed; authentication does not define schema |

### 3.5 Observability and infrastructure consumption

| Authority | Authentication treatment |
|-----------|--------------------------|
| OBSERVABILITY_ARCHITECTURE.md | Authentication outcome evidence and identity-context proof must be reconstructible |
| INFRASTRUCTURE_STANDARDS.md | Runtime secret handling, environment separation, and operational boundaries must support authentication without redefining it |

### 3.6 Extension rule

Authentication Architecture extends upstream authority. It must not replace, narrow, or reinterpret product meaning, role semantics, security policy, authorization policy, domain ownership, API governance, persistence architecture, integration mediation, infrastructure prerequisites, observability obligations, or repository workflow.

---

## 4. Authentication Principles

### AUTHN-PRIN-1 — Authentication Establishes Identity Context

Authentication exists to establish system-trusted identity context for protected operations. It does not decide what the actor is allowed to do; that belongs to authorization and domain governance.

### AUTHN-PRIN-2 — Identity Truth Has One Owner

Identity records, role binding facts, and session authority state belong to Identity & Access System. Frontend, backend domain services, API contracts, external providers, and infrastructure must not become parallel identity authorities.

### AUTHN-PRIN-3 — Client Claims Are Never Authority

Client-presented identity, role, session, or capability claims are input only. They become trusted context only after system validation.

### AUTHN-PRIN-4 — Mechanisms Are Replaceable

Authentication obligations are stable architecture. Providers, protocols, token formats, session stores, credential types, and user interface implementations are replaceable implementation choices.

### AUTHN-PRIN-5 — Authentication Is Separate From Authorization

Authentication establishes who the actor is. Authorization determines whether that actor may perform an operation. Authentication Architecture must not define permission, entitlement, ownership, or delegated authority decisions.

### AUTHN-PRIN-6 — Failure Must Be Honest

Authentication failure, expiry, uncertainty, degradation, and pending re-establishment must not masquerade as successful identity context or domain authorization.

### AUTHN-PRIN-7 — Authentication Must Be Observable Without Leaking Secrets

Authentication outcomes must be legible enough for security review, audit support, and failure diagnosis while excluding credentials, secrets, sensitive payloads, and ineligible identity data.

---

## 5. Responsibility Boundaries

### 5.1 Core responsibility model

| Responsibility | Owner | Authentication role |
|----------------|-------|---------------------|
| Identity record truth | Identity & Access System | Establish and bind authenticated context to identity truth |
| Role model and role binding facts | Identity & Access System + delegated Governance Execution outcomes | Consume role facts; do not redefine role semantics |
| Authentication boundary policy | Security Standards | Implement architectural mechanism governance subordinate to policy |
| Credential and secret taxonomy | Security Standards | Consume taxonomy; do not define credential classes |
| Session authority state | Identity & Access System | Own lifecycle posture; distinguish from client copy |
| Client session presentation | Frontend Architecture | Client copy only; not authority |
| Protected request actor context | API Standards + Identity & Access System | Require established context before protected contract invocation |
| Backend identity consumption | Backend Architecture | Consume context; do not authenticate in domain services |
| Authorization decisions | Authorization Architecture + Security Standards + domain authorities | Out of scope; authentication supplies identity context only |
| Authentication observability | Authentication Architecture + Observability Architecture | Define proof and signal obligations without tool selection |
| External identity source mediation | Integration Architecture | Consume mediated assertions; do not bypass integration boundary |

### 5.2 Authentication owns

- Identity context establishment lifecycle;
- Authentication boundary classes;
- Session authority lifecycle posture;
- Authentication state classification;
- Credential presentation and verification boundaries;
- Authentication failure classification;
- Authentication proof-chain requirements;
- Authentication invariants and validation gates.

### 5.3 Authentication must not own

- Authorization policy or permission model;
- Role scope definitions or role grant authority;
- Domain ownership and eligibility decisions;
- Product identity experience meaning;
- Credential taxonomy or cryptographic policy;
- External provider mediation;
- API schema or transport design;
- Persistence schema or session store implementation;
- Infrastructure topology or secret manager implementation.

---

## 6. Authentication Boundary Model

### 6.1 Boundary definition

An **authentication boundary** is the governed architectural boundary where an untrusted, unauthenticated, expired, or uncertain actor claim is evaluated and, if valid, becomes system-recognized identity context.

Authentication boundaries exist for human actors, service identities, external identity assertions, session continuation, and future mechanism extensions. This document does not define implementation mechanisms for any boundary.

### 6.2 Boundary classes

| Boundary class | Purpose | Architectural posture |
|----------------|---------|------------------------|
| Initial actor authentication | Establish identity context from unauthenticated actor | Security policy applies; system validation required |
| Session continuation | Continue prior authenticated context | Session authority remains system-scoped |
| Session renewal | Re-establish or refresh context after expiry/degradation | No false continuation; failure is honest |
| Privileged re-authentication | Reconfirm identity context for sensitive governance paths | Does not grant authorization; only strengthens context |
| Service identity authentication | Establish non-human component identity | Service identity distinct from human actor identity |
| External identity assertion | Consume externally mediated identity information | Integration mediation and Security Standards apply |

### 6.3 Boundary rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-BND-1** | Every protected operation path declares where identity context is established or consumed |
| **AUTHN-BND-2** | Unauthenticated actor claims must not cross into protected operation authority |
| **AUTHN-BND-3** | Client session presentation must be validated against system session authority |
| **AUTHN-BND-4** | Authentication mechanism must not live inside domain business logic |
| **AUTHN-BND-5** | Authentication boundary failures are distinct from authorization denials and domain rejections |
| **AUTHN-BND-6** | External identity assertions pass through Integration Architecture mediation before trust consumption |
| **AUTHN-BND-7** | Boundary crossing must be observable where security- or governance-sensitive |

### 6.4 Boundary prohibitions

- Domain service performing authentication;
- Frontend route or UI state serving as authentication authority;
- API contract syntax defining authentication mechanism;
- External identity provider assertion becoming Rento identity truth without Identity & Access System acceptance;
- Authentication success implying authorization;
- Authentication bypass for convenience or testing becoming durable path.

---

## 7. Identity Context Lifecycle

### 7.1 Lifecycle purpose

Identity context lifecycle governs how authenticated actor context becomes available to protected operations and how that context expires, degrades, renews, or terminates.

### 7.2 Lifecycle stages

```
Claim → Verification → Context establishment → Session authority binding → Propagation → Renewal / Degradation / Termination → Evidence
```

### 7.3 Lifecycle states

| State | Meaning | Authority posture |
|-------|---------|-------------------|
| Unauthenticated | No system-trusted identity context exists | Public-only capability posture |
| Authentication pending | Verification is in progress or requires continuation | No protected success implied |
| Authenticated | Identity context established and system-bound | May be consumed by protected paths |
| Degraded | Context exists but requires renewal, revalidation, or constrained handling | Must not silently present full confidence |
| Expired | Session authority no longer valid | Protected operation requires re-establishment |
| Terminated | Context deliberately ended or revoked | No further protected use |
| Rejected | Claim failed verification or policy boundary | Security event eligibility where applicable |

### 7.4 Lifecycle rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-LIF-1** | Protected operations require established authenticated context |
| **AUTHN-LIF-2** | Pending authentication must not be treated as authenticated |
| **AUTHN-LIF-3** | Expired or terminated context must not be consumed for protected operations |
| **AUTHN-LIF-4** | Degraded context must be explicit and constrained |
| **AUTHN-LIF-5** | Session authority changes must be traceable where architecturally material |
| **AUTHN-LIF-6** | Context renewal must not bypass authentication boundary validation |
| **AUTHN-LIF-7** | Lifecycle evidence must not contain credential or secret material |

---

## 8. Session Authority Governance

### 8.1 Session authority definition

**Session authority** is the system-scoped authentication state that binds an established identity context to a continuing operation context.

Session authority is not the same as frontend session presentation, browser/client storage, route reachability, API payload structure, or authorization scope.

### 8.2 Session state classes

| State class | Meaning | Owner |
|-------------|---------|-------|
| System session authority | Authoritative authenticated session lifecycle | Identity & Access System |
| Client session presentation copy | Client-side reflection of session posture | Frontend Architecture; non-authoritative |
| API actor context attachment | Contract-level attachment of established context | API Standards + Identity & Access System consumption |
| Backend actor context | Consumed context for orchestration/domain invocation | Backend Architecture consumption |
| Session evidence | Record of establishment, renewal, termination, failure | Observability + Security governance |

### 8.3 Session rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-SES-1** | System session authority is the only authoritative session posture |
| **AUTHN-SES-2** | Client session copy must reconcile with system session authority |
| **AUTHN-SES-3** | Session continuation requires valid system authority |
| **AUTHN-SES-4** | Session termination invalidates protected operation consumption |
| **AUTHN-SES-5** | Session state must not define domain truth or authorization outcome |
| **AUTHN-SES-6** | Session lifecycle evidence must preserve classification and exclude secrets |

---

## 9. Credential And Factor Governance

### 9.1 Governance posture

Authentication Architecture governs how credential or factor presentation participates in identity context establishment. Security Standards owns credential classes, secret governance, classification, and security policy. Implementation owns mechanism details only after authorization.

### 9.2 Authentication factor categories

This document may refer to factor categories only as architecture placeholders. It does not define credential taxonomy, product requirements, or implementation mechanisms.

| Category | Architecture posture |
|----------|----------------------|
| Human authentication factor | Consumed under Security Standards; never domain-accessible |
| Service identity credential | Non-human identity context; distinct from human actor |
| External identity assertion | Consumed only after Integration Architecture mediation |
| Recovery or renewal factor | Re-establishes context; does not grant authorization by itself |
| Operational credential | Operational boundary only; no default domain mutation authority |

### 9.3 Credential rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-CRED-1** | Credential material must not appear in repository artifacts, client-distributed artifacts, logs, events, or audit evidence |
| **AUTHN-CRED-2** | Credential verification result establishes authentication posture only, not authorization |
| **AUTHN-CRED-3** | Credential presentation must be scoped to declared authentication boundary |
| **AUTHN-CRED-4** | Authentication factors must not be consumed by domain services |
| **AUTHN-CRED-5** | External identity credentials remain integration-mediated and security-governed |
| **AUTHN-CRED-6** | Credential lifecycle events preserve Security Standards event governance |

---

## 10. Identity Propagation

### 10.1 Propagation purpose

Identity propagation carries established identity context from the authentication boundary into API, backend, domain, background, integration, and observability paths that require actor context.

Propagation is not authorization. It supplies who the actor is; authorization and domains decide what may happen.

### 10.2 Propagation paths

| Path | Requirement |
|------|-------------|
| Experience → API | Protected requests attach established actor context without client authority over identity truth |
| API → Backend | Access Adaptation consumes context and rejects missing context for protected operations |
| Backend orchestration → Domain service | Actor and role context propagate to each domain invocation |
| Background equivalent | Deferred work preserves equivalent actor or service identity context where required |
| Integration equivalent | External identity assertions remain mediated; outbound identity use follows minimum necessary disclosure |
| Observability path | Authentication context proof is reconstructible without secret leakage |

### 10.3 Propagation rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-CTX-1** | Identity context must be explicit for protected operations |
| **AUTHN-CTX-2** | Role context is consumed from Identity & Access System and must not be inferred from client claims |
| **AUTHN-CTX-3** | Context propagation must survive orchestration boundaries without substitution |
| **AUTHN-CTX-4** | Background paths must preserve equivalent context or declare service identity |
| **AUTHN-CTX-5** | Service identity must remain distinct from human actor identity |
| **AUTHN-CTX-6** | Context loss in protected paths is a high-severity architecture defect |

---

## 11. Authentication Failure Governance

### 11.1 Failure purpose

Authentication failure governance ensures identity uncertainty is honest, contained, observable, and not confused with authorization denial, domain rejection, or system success.

### 11.2 Failure classes

| Failure class | Meaning | Required posture |
|---------------|---------|------------------|
| Missing identity context | Protected operation lacks authenticated context | Reject before protected action |
| Invalid claim | Actor claim fails verification | Security event eligibility |
| Expired session | Session authority no longer valid | Re-establishment required |
| Terminated session | Session deliberately ended or revoked | No protected operation continuation |
| Degraded identity context | Context exists but confidence is constrained | Honest constrained posture |
| Credential lifecycle failure | Credential unavailable, revoked, compromised, or unusable | Security Standards event governance |
| External identity source failure | Mediated external assertion unavailable or invalid | Integration failure containment |
| Observability gap | Authentication outcome cannot be reconstructed | Architecture defect |

### 11.3 Failure rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-FAL-1** | Authentication failure must not be represented as authorization denial where distinction matters |
| **AUTHN-FAL-2** | Authentication failure must not become domain mutation |
| **AUTHN-FAL-3** | Expiry and termination must be distinguishable |
| **AUTHN-FAL-4** | External identity source failure must remain contained to authentication/integration path |
| **AUTHN-FAL-5** | Credential failures must not expose credential material |
| **AUTHN-FAL-6** | Protected operation failure due to missing context must be observable where material |

---

## 12. Security And Audit Integration

### 12.1 Security consumption

Authentication Architecture consumes Security Standards for policy and taxonomy.

| Security concern | Owner | Authentication role |
|------------------|-------|---------------------|
| Authentication boundary policy | Security Standards | Apply mechanism governance without redefining policy |
| Credential and secret governance | Security Standards | Consume classes and prohibitions |
| Security event classification | Security Standards | Produce eligible event evidence without defining taxonomy |
| Data classification | Security Standards | Preserve classification across identity lifecycle |
| Audit governance | Security Standards + producing authority | Provide reconstructible authentication proof where required |

### 12.2 Audit and evidence rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-AUD-1** | Authentication outcomes must be reconstructible for protected and governance-sensitive paths |
| **AUTHN-AUD-2** | Authentication evidence must not contain credential material |
| **AUTHN-AUD-3** | Session authority changes must produce evidence where governance-sensitive |
| **AUTHN-AUD-4** | Authentication evidence is not identity truth; Identity & Access System remains truth owner |
| **AUTHN-AUD-5** | Audit and security event classification remain governed by Security Standards |

---

## 13. Interaction With Peer Authorities

### 13.1 Security Standards

| Security authority | Authentication interaction |
|--------------------|----------------------------|
| Authentication boundary policy | Authentication applies mechanism governance subordinate to policy |
| Credential and secret governance | Authentication consumes classes and prohibitions |
| Identity propagation rules | Authentication establishes context; propagation preserves it |
| Security event governance | Authentication produces eligible evidence without redefining taxonomy |

### 13.2 Integration Architecture

| Integration authority | Authentication interaction |
|-----------------------|----------------------------|
| External provider mediation | External identity assertions pass through integration boundary |
| External trust evidence | Authentication consumes only validated and normalized external identity inputs |
| Provider replacement | Authentication mechanism remains provider-replaceable |
| Integration credential scope | External identity provider credentials remain integration-scoped |

### 13.3 API Standards

| API authority | Authentication interaction |
|---------------|----------------------------|
| Protected request actor context | Authentication establishes context; API attaches and transports within governance |
| Contract syntax | API or implementation owns syntax; Authentication owns context requirement |
| Error honesty | Authentication failures remain distinguishable from authorization and domain failures |

### 13.4 Backend Architecture

| Backend authority | Authentication interaction |
|-------------------|----------------------------|
| Access Adaptation | Consumes established context and rejects missing context for protected operations |
| Application Orchestration | Propagates actor context without substituting identity truth |
| Domain Services | Consume context; must not authenticate |
| Governance Realization Unit | Consumes admin context; role grant remains delegated governance outcome |

### 13.5 Frontend Architecture

| Frontend authority | Authentication interaction |
|--------------------|----------------------------|
| Access Consumption | Invokes protected capabilities only with consumed identity context |
| Session presentation copy | Non-authoritative reflection of system session authority |
| Authentication-gated composition | Capability reachability follows identity context, not local role truth |
| Presentation layer | Must not define authentication mechanism or role semantics |

### 13.6 Authorization Architecture

Authorization Architecture is a future peer authority. Authentication Architecture supplies identity context to it after publication. Authentication must not predefine authorization policy, enforcement point mechanics, permission taxonomy, entitlement evaluation, or domain final mutation authority.

### 13.7 Observability Architecture

| Observability authority | Authentication interaction |
|-------------------------|----------------------------|
| Authentication outcome evidence | Authentication outcomes must be signal-visible where material |
| Identity-context proof | Proof chains must show context establishment before protected operation |
| Security event separability | Authentication signals preserve classification and separability |
| Failure visibility | Authentication failure classes must be legible without secret leakage |

### 13.8 Infrastructure Standards And Database Architecture

| Authority | Authentication interaction |
|-----------|----------------------------|
| Infrastructure Standards | Runtime secret handling, environment separation, and operational boundaries support authentication without defining it |
| Database Architecture | Identity/session persistence ownership remains governed by persistence architecture; Authentication does not define schema |

---

## 14. Validation Requirements

### 14.1 Validation purpose

Authentication validation verifies that a future architecture, standard, or implementation plan establishes identity context without weakening Security Standards, role truth, domain ownership, authorization boundaries, or implementation independence.

Validation does not authorize implementation.

### 14.2 Validation dimensions

| Dimension | Question |
|-----------|----------|
| Authority placement | Does authentication remain within Identity & Access System mechanism layer and Phase 3 extension scope? |
| Scope honesty | Does it avoid authorization policy, role semantics, provider selection, token format, and session store ownership? |
| Security compliance | Does it consume Security Standards policy and credential governance without redefining them? |
| System compliance | Does it preserve Domain 1 exclusive ownership and session authority boundaries? |
| Integration compliance | Are external identity assertions mediated through Integration Architecture? |
| API/backend/frontend compliance | Are protected paths, context propagation, and client non-authority preserved? |
| Observability compliance | Are authentication outcomes reconstructible without secrets? |
| Persistence/infrastructure compliance | Are schema, storage, and secret realization deferred to owning authorities? |
| Technology neutrality | Are no providers, protocols, token formats, algorithms, stores, or products mandated? |

### 14.3 Quality gates

| Gate | Trigger | Pass criteria |
|------|---------|---------------|
| **AUTHN-GATE-1 — Boundary declaration** | New protected operation path | Authentication boundary and context source declared |
| **AUTHN-GATE-2 — Context establishment** | Actor becomes authenticated | Identity context establishment path declared |
| **AUTHN-GATE-3 — Session authority** | Session continuation or renewal | System authority and client-copy separation preserved |
| **AUTHN-GATE-4 — Credential handling** | Credential or factor is involved | Security Standards scope consumed; no secret exposure |
| **AUTHN-GATE-5 — External identity source** | External assertion or provider used | Integration mediation and trust validation declared |
| **AUTHN-GATE-6 — Failure honesty** | Authentication can fail, expire, or degrade | Failure class and containment declared |
| **AUTHN-GATE-7 — Observability proof** | Protected or governance-sensitive path | Proof chain can reconstruct authentication outcome |
| **AUTHN-GATE-8 — Authorization separation** | Protected action evaluated | Authentication does not decide authorization |

### 14.4 Review requirement

Material authentication changes require independent review before publication or downstream implementation consumption. Review must verify scope honesty, security policy preservation, Identity & Access System ownership, session authority boundaries, authorization separation, observability obligations, integration mediation, and implementation independence.

---

## 15. Extension Rules

### 15.1 Extension principle

Authentication Architecture evolves by governed extension. New authentication boundary classes, context lifecycle states, external identity source categories, session authority states, or validation gates require explicit authority review.

### 15.2 Extension triggers

Extension review is required when:

- A new authentication boundary class is introduced;
- A new external identity source category is introduced;
- A new credential or factor category is consumed;
- Session authority lifecycle semantics change;
- Authentication state becomes visible in a new product or governance surface;
- Background or service identity paths require authentication context;
- Authentication failure semantics affect product-visible completion;
- Authentication evidence requirements change materially;
- Authentication starts interacting with a future Authorization Architecture mechanism.

### 15.3 Extension rules

| Rule | Requirement |
|------|-------------|
| **AUTHN-EXT-1** | New authentication obligations must name boundary owner, context consumer, and security policy basis |
| **AUTHN-EXT-2** | New credential or factor consumption requires Security Standards alignment |
| **AUTHN-EXT-3** | New external identity sources require Integration Architecture mediation |
| **AUTHN-EXT-4** | New session authority states require Identity & Access System ownership preservation |
| **AUTHN-EXT-5** | New protected path classes require API/backend/frontend context propagation review |
| **AUTHN-EXT-6** | New observability obligations require classification before correlation |
| **AUTHN-EXT-7** | Authentication extensions must not bypass Phase 3 execution order |

---

## 16. Authentication Invariants

These invariants are mandatory for downstream standards and implementation artifacts after publication.

| ID | Invariant |
|----|-----------|
| **AUTHN-INV-1** | Authentication establishes identity context; it does not authorize actions |
| **AUTHN-INV-2** | Identity & Access System is the sole owner of identity truth and session authority |
| **AUTHN-INV-3** | Client claims, route state, and session presentation copies are not authentication authority |
| **AUTHN-INV-4** | Protected operations require established authenticated context |
| **AUTHN-INV-5** | Authentication mechanisms must not reside in domain business logic |
| **AUTHN-INV-6** | Role semantics and role binding governance are consumed, not redefined |
| **AUTHN-INV-7** | Authentication Architecture must not define authorization policy or permission taxonomy |
| **AUTHN-INV-8** | Credential taxonomy, secret governance, and security event taxonomy remain owned by Security Standards |
| **AUTHN-INV-9** | Credential material must not appear in repository artifacts, logs, events, audit evidence, or client-distributed artifacts |
| **AUTHN-INV-10** | External identity assertions require Integration Architecture mediation before trust consumption |
| **AUTHN-INV-11** | Session expiry, termination, degradation, and failure are distinct states |
| **AUTHN-INV-12** | Authentication failure must not become domain mutation or false protected success |
| **AUTHN-INV-13** | Service identity remains distinct from human actor identity |
| **AUTHN-INV-14** | Authentication outcomes must be observable where material without leaking secrets |
| **AUTHN-INV-15** | Authentication mechanisms are replaceable without changing product meaning, role model, or domain ownership |
| **AUTHN-INV-16** | Authentication paths preserve Product Authority, Security Standards, Integration Architecture, Observability Architecture, and Repository Authority boundaries |

---

## 17. Downstream Consumers

The following future documents and artifacts may consume Authentication Architecture after publication:

| Consumer | Consumption relationship |
|----------|--------------------------|
| Authorization Architecture | Consumes established identity context and session authority posture; does not inherit permission policy from Authentication |
| Development Standards | Authentication implementation discipline, secret exclusion, context propagation conventions |
| AI Collaboration Standards | Future AI-assisted identity-sensitive workflows, if authorized, must preserve authentication boundaries |
| Implementation Governance | AUTHN-INV and AUTHN-GATE compliance verification |
| Backend implementation | Access Adaptation context consumption and domain-service authentication prohibition |
| Frontend implementation | Client session presentation and authentication-gated capability reachability |
| Infrastructure implementation | Secret injection, environment separation, and runtime identity support |
| Security review processes | Credential handling, event classification, and boundary verification |
| Observability review processes | Authentication outcome evidence and proof-chain completeness |

Downstream consumers must cite this document by reference. They must not duplicate, narrow, or replace AUTHN-INV invariants.

---

## 18. Prohibited Scope

This document and authentication architecture must not specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Authentication provider, protocol, token format, cookie/session mechanism, password rule, MFA product, SDK, library, or cryptographic algorithm | Implementation / Security Standards / Development Standards when authorized |
| Permission taxonomy, authorization policy, entitlement model, access-control matrix, policy engine, or enforcement middleware | Authorization Architecture / Security Standards / implementation |
| Role model changes, realtor/admin semantics, role grant process, or delegated governance scope | Product Authority / Security Standards / Governance Execution / Authorization Architecture |
| API endpoint, payload schema, header format, status code, transport protocol, or authentication response envelope | API_STANDARDS.md / implementation |
| Database schema, identity table, credential table, session store, index, collection, or migration script | DATABASE_ARCHITECTURE.md / DATABASE_STANDARDS.md / implementation |
| Frontend route design, login UI, session storage implementation, component structure, or product copy | FRONTEND_ARCHITECTURE.md / Product Design Standard / implementation |
| Infrastructure topology, secret manager, TLS configuration, runtime deployment, environment configuration, or operational runbook | INFRASTRUCTURE_STANDARDS.md / implementation |
| External identity provider mediation, provider trust validation, or external assertion normalization | INTEGRATION_ARCHITECTURE.md / implementation |
| Observability tool, log format, metric name, trace attribute, dashboard, or alerting product | OBSERVABILITY_ARCHITECTURE.md / implementation |
| Engineering release execution, Git tag, GitHub Release, or release manifest | ENGINEERING_RELEASE_STRATEGY.md |

**Architecture only.** Implementation proceeds only under separate implementation authorization after applicable standards publication.

---

## 19. Terminology

| Term | Meaning |
|------|---------|
| **Authentication Architecture** | Architecture-level governance for establishing identity context and session authority |
| **Authentication** | Process of establishing that an actor is who they claim to be and binding identity context to operation paths |
| **Identity context** | System-trusted actor identity and role context consumed by protected operation paths |
| **Session authority** | System-scoped authentication state binding identity context to continuing operation context |
| **Client session presentation copy** | Non-authoritative client-side reflection of session posture |
| **Credential** | Material used to prove identity or authorize access — taxonomy governed by Security Standards |
| **Authentication boundary** | Boundary where untrusted actor claims are evaluated and may become system-trusted context |
| **External identity assertion** | Identity-related information originating outside Rento; mediated by Integration Architecture before consumption |
| **Service identity** | Non-human actor identity for system component interaction |
| **Authentication failure** | Failure to establish, continue, renew, or trust identity context |

Terms defined in upstream authorities retain upstream meaning.

---

## 20. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Authentication Architecture |
| **Authority class** | Authoritative authentication engineering architecture |
| **Binding authority** | Active — per REPOSITORY_STANDARDS.md §7.6 |
| **Publication** | COMPLETE |
| **Phase** | Authentication Architecture — Phase 3 extension authority (E3; execution order position 5 per PHASE_3_EVOLUTION_AUTHORIZATION.md §6) |
| **Engineering authoring** | COMPLETE |
| **Independent review** | APPROVED |
| **Publication review** | APPROVED FOR PUBLICATION |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — extension E3, execution order position 5) |
| **Implementation** | NOT AUTHORIZED |
| **Phase 4** | NOT STARTED |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · INFRASTRUCTURE_STANDARDS.md · OBSERVABILITY_ARCHITECTURE.md · INTEGRATION_ARCHITECTURE.md · REPOSITORY_STANDARDS.md |
| **Superior to** | Authentication implementation conventions · Development Standards and Implementation Governance on authentication matters |
| **Does not authorize** | Implementation; provider selection; token or credential format selection; authorization policy; infrastructure implementation; engineering release execution; Phase 3 completion; Phase 4 |
| **Prerequisites** | Security Standards published — satisfied; Integration Architecture published — satisfied; Observability Architecture published — satisfied; System Architecture published — satisfied; Phase 3 Evolution AUTHORIZED — satisfied |

---

**Document path:** `docs/engineering/AUTHENTICATION_ARCHITECTURE.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/SECURITY_STANDARDS.md` · `docs/engineering/INTEGRATION_ARCHITECTURE.md` · `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
