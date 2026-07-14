# Rento Infrastructure Standards

**Status:** PUBLISHED — Infrastructure Standards  
**Authority class:** Authoritative infrastructure engineering standards  
**Binding authority:** Active — per REPOSITORY_STANDARDS.md §7.6  
**Publication:** COMPLETE  
**Implementation:** NOT AUTHORIZED  
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — execution order position 2)  
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, Infrastructure Reviewers, Design Council  
**Governance basis:** PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · REPOSITORY_STANDARDS.md · ENGINEERING_RELEASE_STRATEGY.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Purpose

This document defines **engineering governance for infrastructure implementation** in the Rento platform.

It establishes how runtime infrastructure is classified, bounded, configured, isolated, versioned, secured, observed, backed up, recovered, and evolved — without specifying cloud providers, orchestration products, container runtimes, infrastructure-as-code syntax, network appliance configuration, or operational runbooks.

This document answers:

- What infrastructure engineering standards own versus what system and security architecture own;
- How environments are classified and separated without conflating operational state with domain truth;
- How deployment environments, runtime consistency, and configuration governance preserve architectural boundaries;
- How secret, network, DNS, TLS, and reverse-proxy obligations are realized at infrastructure scope;
- How service execution, container discipline, and isolation protect trust boundaries;
- How infrastructure versioning, backup, and disaster recovery preserve marketplace integrity;
- What infrastructure security baseline and observability prerequisites apply before Observability Architecture publication;
- How infrastructure compliance and publication integrate with repository governance;
- What downstream standards may consume from this authority.

This document is **infrastructure engineering governance**, not deployment architecture redefinition, not security policy redefinition, and not implementation guidance.

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
                        ├── Security standards (SECURITY_STANDARDS.md)
                        ├── Database standards (DATABASE_STANDARDS.md)
                        └── Infrastructure standards (this document)
                            → Observability Architecture · Development Standards · Implementation Governance (when published)
                                → Implementation artifacts
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| SYSTEM_ARCHITECTURE.md | Infrastructure Boundary (Component 12); operational state vs domain truth | Specializes boundary into infrastructure engineering governance — does not redefine components |
| BACKEND_ARCHITECTURE.md | Backend ↔ infrastructure interaction (§14.6); prohibited policy encoding | Consumes interaction rules — defines infrastructure realization discipline |
| FRONTEND_ARCHITECTURE.md | Experience surface boundaries; client non-authority | Consumes edge delivery constraints — does not define presentation |
| API_STANDARDS.md | Contract trust boundaries; deferred gateway and rate-limit scope | Consumes access-boundary obligations at infrastructure edge — does not define contracts |
| DATABASE_ARCHITECTURE.md | Persistence ownership; backup policy at system scope | Consumes durability protection obligations — does not define persistence |
| DATABASE_STANDARDS.md | Persistence engineering discipline; defers backup execution | Consumes separation rules — defines backup governance at infrastructure scope |
| SECURITY_STANDARDS.md | Credential, secret, trust, and classification governance | Consumes SEC obligations — defines infrastructure realization without redefining security policy |
| PRODUCT_ARCHITECTURE.md | Capability truth classes; participation boundaries | Consumes product integrity obligations — does not redefine product meaning |
| REPOSITORY_STANDARDS.md | Document lifecycle and publication discipline | Consumed for governance placement and publication rules |
| ENGINEERING_RELEASE_STRATEGY.md | Engineering release lifecycle | Consumed for publication checkpoint alignment — does not govern architecture content |

### 2.3 What this document owns

- Infrastructure engineering scope and responsibility boundaries;
- Infrastructure principles (INF-PRIN-*);
- Environment classification and deployment environment governance;
- Runtime consistency governance across environments;
- Configuration governance at infrastructure scope;
- Secret management governance obligations at infrastructure realization layer;
- Network, DNS, TLS, and reverse-proxy governance standards;
- Service execution governance standards;
- Technology-neutral container governance discipline;
- Infrastructure isolation governance;
- Infrastructure versioning discipline;
- Backup governance at infrastructure scope;
- Disaster recovery governance at infrastructure scope;
- Infrastructure security baseline obligations;
- Infrastructure observability prerequisites;
- Infrastructure compliance governance;
- Infrastructure publication rules;
- Infrastructure invariants (INF-INV-*);
- Downstream consumption model;
- Prohibited infrastructure scope.

### 2.4 What this document does not own

- Product meaning, experience authority, or marketplace semantics;
- Platform domain definitions and PLT invariants (PLATFORM_ARCHITECTURE.md);
- System component responsibilities and SYS-INV invariants (SYSTEM_ARCHITECTURE.md);
- Backend layer structure, orchestration, or domain realization (BACKEND_ARCHITECTURE.md);
- Frontend presentation, navigation, or client runtime (FRONTEND_ARCHITECTURE.md);
- API contract specification (API_STANDARDS.md);
- Persistence architecture and aggregate boundaries (DATABASE_ARCHITECTURE.md);
- Persistence engineering discipline (DATABASE_STANDARDS.md);
- Enterprise security policy, data classification rules, or SEC-CRED principles (SECURITY_STANDARDS.md);
- Authentication mechanism design, authorization enforcement, or cryptographic policy;
- Observability architecture, signal taxonomy, or evidence governance (Observability Architecture — when published);
- Development workflow, coding conventions, or CI/CD pipeline configuration (Development Standards — when published);
- Cloud provider selection, product SKUs, region catalogs, or vendor pricing;
- Infrastructure-as-code modules, container images, orchestration manifests, or deployment scripts;
- Operational runbooks, on-call procedures, or incident response playbooks;
- Phase 4 Product Development Methodology;
- Implementation tasks when implementation is authorized.

### 2.5 Amendment

This document may be amended only through explicit governance review per REPOSITORY_STANDARDS.md. Amendments must preserve product authority supremacy, constitutional compliance, extension-not-replacement discipline, and non-contradiction with SYSTEM_ARCHITECTURE.md Infrastructure Boundary and SECURITY_STANDARDS.md trust governance.

---

## 3. Relationship to Upstream Authority

### 3.1 System architecture consumption

Infrastructure Standards **implements** SYSTEM_ARCHITECTURE.md Component 12 — Infrastructure Boundary at the engineering governance layer.

| System declaration | Infrastructure standards treatment |
|--------------------|-----------------------------------|
| Operational state ≠ domain truth (SYS §10.2) | Environment and runtime governance preserve separation |
| Infrastructure failure domain identification (Component 12 — §6; SYS §17.1) | Isolation, backup, and DR governance honor failure domains |
| Deployment partitioning is infrastructure concern (SYS §5.2) | Environment classification governs deployment separation — not domain decomposition |
| Infrastructure replaceable without trust boundary change (Component 12 — §6) | Versioning and isolation rules prevent architectural drift on replacement |
| Prohibited: infrastructure defining domain policy (SYS §21; Component 12 — §6) | Configuration governance blocks policy encoding (INF-INV-3) |

System component catalogs and trust boundary tables are **not** restated here. Reviewers consume SYSTEM_ARCHITECTURE.md for authoritative structure.

### 3.2 Backend architecture consumption

| Backend declaration | Infrastructure standards extension |
|---------------------|-----------------------------------|
| Backend runs within infrastructure boundary (BACKEND_ARCHITECTURE.md §14.6) | Service execution standards define runtime placement discipline |
| Infrastructure owns operational state; backend owns domain state | Configuration and secret injection must not become domain policy channels |
| Infrastructure failure → honest unavailability | DR and runtime consistency governance preserve honest failure posture |
| Prohibited: environment variables as business rules | Configuration governance enforces classification and scope |

### 3.3 Security standards consumption

| Security obligation | Infrastructure standards treatment |
|---------------------|-----------------------------------|
| SEC-CRED-* secret principles (SECURITY_STANDARDS.md §9) | Infrastructure realization honors injection, storage, and rotation boundaries — does not redefine principles |
| No trust by network location (SECURITY_STANDARDS.md §14.3) | Network governance treats connectivity as transport — not authorization |
| Data classification (SECURITY_STANDARDS.md §8) | Backup, logging egress, and environment separation respect classification |
| Internal trust rules (SECURITY_STANDARDS.md §14) | Service execution and isolation preserve contract-bound interaction |
| Infrastructure convenience does not bypass trust boundaries | INF-PRIN-6 and INF-INV-5 enforce architectural parity |

Security policy ownership remains in SECURITY_STANDARDS.md. This document defines **infrastructure-scope realization obligations** only.

### 3.4 Database standards consumption

| Database standards declaration | Infrastructure standards extension |
|--------------------------------|-----------------------------------|
| Backup execution deferred to Infrastructure Standards (DATABASE_STANDARDS.md §22) | Backup governance (§18) defines protection discipline |
| Storage realization honoring separation (DATABASE_STANDARDS.md §21) | Isolation and network governance protect persistence boundaries |
| Infrastructure configuration must not encode domain policy (DATABASE_STANDARDS.md §20.5) | Configuration governance inherits prohibition |

### 3.5 API and frontend consumption

| Upstream deferral | Infrastructure standards treatment |
|-------------------|-----------------------------------|
| API gateway products (API_STANDARDS.md) | Reverse proxy and edge governance standards — contract-neutral |
| Rate limiting products (API_STANDARDS.md) | Edge execution standards — enforcement mechanism deferred to implementation |
| CDN and edge deployment (FRONTEND_ARCHITECTURE.md) | DNS and TLS governance support edge delivery — presentation remains frontend scope |

### 3.6 Extension rule

Infrastructure governance **extends** upstream architecture. It does not **replace**, **redefine**, or **narrow** product authority, trust boundaries, or security policy. Where infrastructure convenience conflicts with upstream authority, upstream authority prevails.

---

## 4. Infrastructure Principles

Each principle states **why** the rule exists, **which authority** it implements, and **risk if violated**.

### INF-PRIN-1 — Operational State Is Not Domain Truth

**Why:** Marketplace integrity requires that deployment status, resource health, and environment configuration never substitute for authoritative domain state.

**Implements:** SYSTEM_ARCHITECTURE.md §10.2; BACKEND_ARCHITECTURE.md §14.6; PRODUCT_ARCHITECTURE.md capability truth classes.

**Rationale:** Conflating operational signals with product-visible truth produces false listings, hidden moderation failures, and irreversible trust damage.

**Governance implication:** Infrastructure artifacts classify state as operational or domain — never merge categories in configuration or monitoring defaults.

**Extension rule:** New operational signals require classification before infrastructure integration.

**Risk if violated:** False success during outages; domain corruption masked by cache or proxy; moderation bypass through stale operational views.

### INF-PRIN-2 — Environment Separation Is Mandatory

**Why:** Production marketplace truth must not share failure, credential, or configuration domains with non-production environments.

**Implements:** SYSTEM_ARCHITECTURE.md environment separation concept; SECURITY_STANDARDS.md §9.2 development/staging credential separation.

**Rationale:** Shared environments create irreversible data leakage, credential crossover, and ungoverned mutation of live marketplace state.

**Governance implication:** Every deployment environment has declared class, isolation boundary, and credential scope.

**Extension rule:** New environments require classification review before use.

**Risk if violated:** Production data in development; staging credentials granting production authority; unreviewed environment sprawl.

### INF-PRIN-3 — Replaceability Without Architectural Drift

**Why:** Infrastructure products and topologies change across implementation eras. Trust boundaries and domain responsibilities must remain stable.

**Implements:** ARCHITECTURE_PRINCIPLES.md AP-7; SYSTEM_ARCHITECTURE.md Component 12 replacement boundary.

**Rationale:** Vendor lock-in at the architecture layer traps product evolution and prevents honest infrastructure replacement.

**Governance implication:** Infrastructure versioning and isolation preserve component responsibilities independent of hosting choice.

**Extension rule:** Infrastructure replacement requires parity verification against INF-INV invariants — not feature parity alone.

**Risk if violated:** Domain policy encoded in provider-specific configuration; undeclared coupling to single vendor primitives.

### INF-PRIN-4 — Configuration Is Governed, Not Ad Hoc

**Why:** Ungoverned configuration becomes a hidden policy channel that bypasses domain services, security review, and repository traceability.

**Implements:** BACKEND_ARCHITECTURE.md §14.6; REPOSITORY_STANDARDS.md REP-4 single ownership.

**Rationale:** Environment-specific toggles frequently encode business rules without audit trail or ownership declaration.

**Governance implication:** Configuration entries require classification, owning authority, and permitted consumers.

**Extension rule:** New configuration surfaces require governance registration before environment promotion.

**Risk if violated:** Business rules in environment variables; irreproducible environments; undeclared feature flags altering marketplace behavior.

### INF-PRIN-5 — Secrets Never Live in Artifacts

**Why:** Version-controlled and build artifacts are durable disclosure surfaces. Secret material in artifacts violates repository and security governance.

**Implements:** SECURITY_STANDARDS.md SEC-CRED-1, SEC-CRED-4; REPOSITORY_STANDARDS.md §3.1.

**Rationale:** Committed secrets become permanent attack surface regardless of later rotation.

**Governance implication:** Infrastructure delivery pipelines and runtime mounts inject secrets — artifacts reference secret **identity**, not secret **value**.

**Extension rule:** Secret scope changes require SECURITY_STANDARDS-aligned review.

**Risk if violated:** Repository compromise; irreversible credential exposure; audit trail containing secret material.

### INF-PRIN-6 — Network Position Does Not Imply Trust

**Why:** Internal connectivity must not substitute for authentication, authorization, or contract-bound interaction.

**Implements:** SECURITY_STANDARDS.md §14.3 rule 1; SYSTEM_ARCHITECTURE.md trust boundaries.

**Rationale:** Flat internal networks create silent privilege expansion and undeclared cross-component mutation paths.

**Governance implication:** Network governance defines reachability classes — authorization remains in identity and domain layers.

**Extension rule:** New internal connectivity requires trust class declaration — not merely firewall approval.

**Risk if violated:** Background jobs bypassing authorization; observability paths gaining undeclared write access; lateral movement on compromise.

### INF-PRIN-7 — Honest Failure Over False Success

**Why:** Marketplace integrity requires users and realtors to see honest unavailability — not misleading success during infrastructure failure.

**Implements:** BACKEND_ARCHITECTURE.md §14.6; ARCHITECTURE_PRINCIPLES.md AP-18 observability honesty alignment.

**Rationale:** Proxies, caches, and health checks that mask failure erode trust and corrupt downstream state.

**Governance implication:** Reverse proxy, runtime, and DR governance preserve fail-closed or honestly degraded behavior at infrastructure edge.

**Extension rule:** Resilience patterns must declare failure visibility obligations before adoption.

**Risk if violated:** Silent data loss; users acting on stale success; moderation queues appearing healthy while failing.

### INF-PRIN-8 — Observability Prerequisites Before Observability Architecture

**Why:** Future observability governance requires infrastructure that can emit, route, and protect signals without violating classification or trust boundaries.

**Implements:** SYSTEM_ARCHITECTURE.md Observability System boundary; planning direction in non-authoritative observability vision — subordinate only.

**Rationale:** Retrofitting signal egress after deployment often forces classification violations or undeclared data harvesting.

**Governance implication:** Infrastructure must reserve signal egress, correlation, and retention **capacity** — taxonomy owned by Observability Architecture when published.

**Extension rule:** Observability Architecture may extend prerequisites — not contradict isolation or security baseline.

**Risk if violated:** Unclassifiable log streams; PII in operational stores; observability becoming mutation path.

### INF-PRIN-9 — Durability Protection Is Infrastructure-Owned Execution

**Why:** Persistence architecture declares what must survive failure; infrastructure governs how durability is protected at runtime.

**Implements:** DATABASE_ARCHITECTURE.md system-scope backup policy; DATABASE_STANDARDS.md deferral to Infrastructure Standards.

**Rationale:** Backup without governance produces unverified snapshots, untested recovery, and false durability claims.

**Governance implication:** Backup and DR governance define protection classes, ownership, and verification discipline — not backup scripts.

**Extension rule:** New stateful components require backup class assignment before production eligibility.

**Risk if violated:** Unrecoverable marketplace state; untested restore; backup stores with weaker classification than source data.

### INF-PRIN-10 — Technology Neutrality at Governance Layer

**Why:** Infrastructure standards must remain valid across provider, orchestration, and runtime generations.

**Implements:** REPOSITORY_STANDARDS.md §3.6; ARCHITECTURE_PRINCIPLES.md AP-7.

**Rationale:** Vendor-specific standards become obsolete authority and force architecture to follow tooling.

**Governance implication:** Rules state obligations and boundaries — not product names, manifest formats, or provider APIs.

**Extension rule:** Technology-specific guidance belongs in implementation artifacts after separate authorization — not in this document.

**Risk if violated:** Authority drift on migration; reviewers validating syntax instead of invariants; premature implementation mandate.

---

## 5. Environment Classification

### 5.1 Purpose

Environment classification defines **what class of operational risk and data sensitivity** each deployment environment carries — independent of hosting topology.

**Upstream:** SYSTEM_ARCHITECTURE.md environment separation concept; SECURITY_STANDARDS.md credential classes.

### 5.2 Environment classes

| Class | Purpose | Data sensitivity | Credential scope | Domain mutation authority |
|-------|---------|------------------|------------------|---------------------------|
| **Production** | Live marketplace operation | Highest — real user, realtor, and listing data | Production-scoped only | Full governed domain paths only |
| **Staging** | Pre-production verification | Production-like — must be treated as sensitive | Staging-scoped — must not grant production authority | Governed paths — no production data by default |
| **Development** | Authoring and integration | Synthetic or anonymized by default | Development-scoped — isolated | Limited — no production connectivity by default |
| **Disaster recovery** | Continuity verification target | Matches protected production class when active | DR-scoped — isolated until failover governance act | Declared failover posture only |
| **Ephemeral** | Short-lived validation | Minimal — disposable | Ephemeral-scoped — time-bound | Non-production — auto-expire |

### 5.3 Classification rules

| Rule | Requirement |
|------|-------------|
| **INF-ENV-1** | Every runtime environment declares exactly one primary class |
| **INF-ENV-2** | Production class environments require explicit governance approval for creation |
| **INF-ENV-3** | Lower classes must not receive production credential material |
| **INF-ENV-4** | Production data replication to non-production requires classification review |
| **INF-ENV-5** | Ephemeral environments must have declared maximum lifetime |
| **INF-ENV-6** | DR class environments remain isolated until controlled failover |

### 5.4 Governance implications

Environment classification drives isolation, backup class, secret scope, network reachability, and compliance obligations. Classification is **declarative governance** — not a hosting label.

### 5.5 Extension rules

New environment classes require governance amendment — not informal naming. Sub-environments (e.g., per-team development) inherit parent class constraints unless separately classified.

### 5.6 Risks if violated

Production data in development; staging treated as low sensitivity; unclassified environments bypassing review; DR environment accepting live traffic without governance act.

---

## 6. Deployment Environments

### 6.1 Purpose

Deployment environment governance defines **how classified environments are instantiated, promoted, and retired** — without prescribing deployment tooling.

**Upstream:** INF-PRIN-2; ENGINEERING_RELEASE_STRATEGY.md eligibility discipline (release environments separate from engineering authority publication).

### 6.2 Deployment environment model

| Concept | Definition |
|---------|------------|
| **Deployment environment** | Named operational instance of an environment class hosting declared system components |
| **Promotion** | Controlled movement of artifact version from lower to higher class |
| **Demotion** | Prohibited for production artifacts — rollback replaces demotion |
| **Retirement** | Declared decommission with data disposition per classification |

### 6.3 Deployment environment rules

| Rule | Requirement |
|------|-------------|
| **INF-DEP-1** | Each deployment environment maps to one environment class |
| **INF-DEP-2** | Production deployment requires verified artifact version identity |
| **INF-DEP-3** | Promotion path is linear: development → staging → production — no skip without governance act |
| **INF-DEP-4** | Deployment environment configuration is versioned independently from application artifact version |
| **INF-DEP-5** | Retirement requires credential revocation and data disposition record |
| **INF-DEP-6** | Engineering release tags do not substitute for deployment environment governance |

### 6.4 Component placement

Deployment environments host **system components** per SYSTEM_ARCHITECTURE.md — not arbitrary repository folders. Component presence in an environment must be declared; undeclared components are prohibited in production class.

### 6.5 Governance implications

Deployment records are operational evidence — subordinate to repository authority. Deployment promotion does not publish engineering authority (ENGINEERING_RELEASE_STRATEGY.md §4.5).

### 6.6 Extension rules

New component types in an environment require system architecture alignment review. Multi-region production requires DR governance alignment (§19).

### 6.7 Risks if violated

Skip-level promotion; untracked production drift; ghost environments with valid credentials; release confusion between GitHub Release and deployment promotion.

---

## 7. Runtime Consistency

### 7.1 Purpose

Runtime consistency governance ensures **equivalent architectural behavior** across environments of the same class — not identical infrastructure topology.

**Upstream:** ARCHITECTURE_PRINCIPLES.md AP-19 Predictable Behavior; BACKEND_ARCHITECTURE.md interaction rules.

### 7.2 Consistency dimensions

| Dimension | Consistency obligation |
|-----------|------------------------|
| **Trust boundary presence** | Same boundaries exist in staging and production — mechanism may differ |
| **Authorization path** | No environment removes authorization checks for convenience |
| **Configuration semantics** | Same configuration keys mean same behavioral class — values may differ |
| **Failure visibility** | Honest failure posture preserved across classes |
| **Secret scope** | Secret identity parity — values environment-scoped |
| **Observability egress** | Signal classes available in non-production before production reliance |

### 7.3 Runtime consistency rules

| Rule | Requirement |
|------|-------------|
| **INF-RTC-1** | Staging must exercise the same authorization paths as production |
| **INF-RTC-2** | Configuration key taxonomy is stable across environments |
| **INF-RTC-3** | Production-only code paths require explicit governance declaration — prohibited by default |
| **INF-RTC-4** | Runtime scaling differences must not alter domain ownership or trust boundaries |
| **INF-RTC-5** | Clock and timezone baseline declared per environment — domain time semantics remain product-owned |

### 7.4 Governance implications

Runtime consistency supports predictable verification — staging evidence must be architecturally relevant to production behavior.

### 7.5 Extension rules

Exceptions to INF-RTC-1 require SECURITY_STANDARDS and SYSTEM_ARCHITECTURE coordinated review.

### 7.6 Risks if violated

Staging passes but production fails on authorization; environment-specific business logic; unreproducible production defects.

---

## 8. Configuration Governance

### 8.1 Purpose

Configuration governance prevents infrastructure and runtime settings from becoming **undeclared policy channels**.

**Upstream:** INF-PRIN-4; BACKEND_ARCHITECTURE.md §14.6; REPOSITORY_STANDARDS.md REP-4.

### 8.2 Configuration classes

| Class | Description | Owning authority | Example governance concern |
|-------|-------------|------------------|----------------------------|
| **Operational** | Runtime resource limits, connectivity endpoints, feature availability switches with no domain semantics | Infrastructure / operations governance | Scaling, timeouts, pool sizes |
| **Integration** | External system endpoints and integration identifiers | External Integration System scope | Partner API base URLs — not secrets |
| **Security** | References to secret identity, trust store location, TLS policy identifiers | SECURITY_STANDARDS alignment | Certificate identity — not private key |
| **Domain-adjacent** | Settings that alter marketplace behavior | Owning domain authority | **Prohibited in infrastructure configuration by default** |

### 8.3 Configuration governance rules

| Rule | Requirement |
|------|-------------|
| **INF-CFG-1** | Every configuration entry has declared class, owner, and consumer list |
| **INF-CFG-2** | Domain-adjacent configuration requires owning-domain governance act — not infrastructure default |
| **INF-CFG-3** | Configuration changes in production class require traceable change record |
| **INF-CFG-4** | Default configuration must be secure-by-default per SECURITY_STANDARDS secure defaults |
| **INF-CFG-5** | Configuration artifacts must not contain secret values (SEC-CRED-1) |
| **INF-CFG-6** | Feature toggles affecting product-visible behavior are domain-adjacent — not operational |

### 8.4 Configuration lifecycle

```
Declared → Registered → Environment-bound → Change-reviewed → Retired
```

Retired keys must remain documented until no environment references them.

### 8.5 Governance implications

Configuration registry is operational evidence — subordinate to repository authority for domain policy.

### 8.6 Extension rules

New configuration classes require infrastructure governance review. Bulk import from provider consoles without registration is prohibited.

### 8.7 Risks if violated

Hidden moderation rules in environment variables; irreproducible production; security defaults overridden silently.

---

## 9. Secret Management Governance

### 9.1 Purpose

This section defines **infrastructure-scope obligations** for secret injection, storage, rotation, and scope — without redefining SECURITY_STANDARDS.md SEC-CRED principles.

**Upstream:** SECURITY_STANDARDS.md §9; INF-PRIN-5.

### 9.2 Scope boundary

| SECURITY_STANDARDS owns | Infrastructure Standards owns |
|-------------------------|------------------------------|
| Secret classification and SEC-CRED principles | Runtime injection surface discipline |
| Credential scope and consumer declaration | Environment-bound secret mount governance |
| Prohibition on secrets in repository artifacts | Build and deployment artifact scanning obligations |
| Rotation as security lifecycle event | Rotation execution coordination without defining automation products |

### 9.3 Infrastructure secret rules

| Rule | Requirement |
|------|-------------|
| **INF-SEC-1** | Secret values exist only in declared secret stores or runtime mounts — never in configuration artifacts |
| **INF-SEC-2** | Each secret mount declares environment class compatibility |
| **INF-SEC-3** | Production secrets must not be mountable in development class without governance act |
| **INF-SEC-4** | Secret access is service-scoped — not platform-wide mount by default |
| **INF-SEC-5** | Rotation events preserve availability without exposing values in logs or events |
| **INF-SEC-6** | Backup and DR copies of secret stores inherit classification and isolation of source |

### 9.4 Secret injection surfaces

Permitted injection surfaces are **declared at infrastructure scope**:

- Runtime mount available only to declared service identity;
- Ephemeral injection at process start — not baked into image layers;
- Integration secrets scoped to External Integration System runtime only.

Experience Systems must not receive backend, integration, or operational secrets (SECURITY_STANDARDS.md §9.5).

### 9.5 Governance implications

Secret governance violations are security incidents — not infrastructure maintenance items.

### 9.6 Extension rules

New secret consumers require SEC-CRED scope declaration update before mount authorization.

### 9.7 Risks if violated

Committed credentials; shared database password across services; production secrets in developer laptops via mount misconfiguration.

---

## 10. Network Governance

### 10.1 Purpose

Network governance defines **reachability classes and connectivity discipline** — not firewall product syntax.

**Upstream:** INF-PRIN-6; SECURITY_STANDARDS.md §14; SYSTEM_ARCHITECTURE.md trust boundaries.

### 10.2 Network zones

| Zone | Purpose | Typical occupants | Default posture |
|------|---------|-------------------|-----------------|
| **Public edge** | External client and partner entry | Reverse proxy, public API edge | Authenticated access required beyond edge for mutations |
| **Application** | Service execution | Backend, workers, internal APIs | Deny by default — allow declared contracts only |
| **Data** | Persistence and durable stores | Data Persistence System resources | No direct Experience System access |
| **Integration** | Outbound and inbound partner connectivity | External Integration System | Scoped egress and ingress |
| **Operations** | Engineering and support access | Operational tooling | No default domain mutation authority |
| **Management** | Infrastructure control | Control plane interfaces | Separated from application data paths |

### 10.3 Network governance rules

| Rule | Requirement |
|------|-------------|
| **INF-NET-1** | Connectivity follows zone model — flat networks prohibited in production class |
| **INF-NET-2** | Cross-zone connectivity requires declared consumer and purpose |
| **INF-NET-3** | Data zone not reachable from public edge without application layer |
| **INF-NET-4** | Management zone does not share credentials with application runtime |
| **INF-NET-5** | Egress from integration zone is integration-scoped — not platform-wide internet |
| **INF-NET-6** | Network reachability never substitutes for authorization (SEC §14.3) |

### 10.4 Governance implications

Network diagrams are evidence of zone discipline — not authority documents.

### 10.5 Extension rules

New cross-zone paths require trust class review. Temporary debug connectivity requires time-bound governance record.

### 10.6 Risks if violated

Database exposed to public network; lateral movement; integration server as open relay.

---

## 11. DNS Governance

### 11.1 Purpose

DNS governance defines **naming authority, resolution integrity, and environment separation** for platform endpoints.

**Upstream:** API_STANDARDS.md access surfaces; FRONTEND_ARCHITECTURE.md delivery boundaries.

### 11.2 DNS record classes

| Class | Purpose | Governance |
|-------|---------|------------|
| **Public service** | User-facing API and experience entry | Production class — change-reviewed |
| **Internal service** | Inter-component resolution | Private zone — not public resolvable |
| **Integration endpoint** | Partner-facing or outbound identity | Integration-scoped |
| **Operational** | Management and support entry | Operations zone — restricted |

### 11.3 DNS governance rules

| Rule | Requirement |
|------|-------------|
| **INF-DNS-1** | Every public name maps to declared service owner |
| **INF-DNS-2** | Internal names must not be resolvable from untrusted networks |
| **INF-DNS-3** | DNS changes in production class require traceable record |
| **INF-DNS-4** | Staging and production names are namespace-separated |
| **INF-DNS-5** | CNAME and alias chains must preserve TLS identity alignment (§12) |

### 11.4 Governance implications

DNS is part of trust surface — hijack equals boundary breach.

### 11.5 Extension rules

New public zones require security baseline review. Wildcard public records require explicit justification.

### 11.6 Risks if violated

Phishing via DNS takeover; staging name serving production; internal service enumeration.

---

## 12. TLS Governance

### 12.1 Purpose

TLS governance defines **transport integrity and identity presentation** obligations at infrastructure edge and internal contract boundaries.

**Upstream:** SECURITY_STANDARDS.md transport and trust obligations; API_STANDARDS.md contract trust.

### 12.2 TLS scope classes

| Scope | Minimum obligation |
|-------|-------------------|
| **Public edge** | Encrypted transport; validated server identity; modern protocol baseline |
| **Internal service** | Encrypted transport unless governance-approved exception with compensating controls |
| **Integration** | Mutual trust alignment with integration contract |
| **Data path** | Encryption in transit to data zone — not optional in production class |

### 12.3 TLS governance rules

| Rule | Requirement |
|------|-------------|
| **INF-TLS-1** | Public endpoints require TLS — cleartext prohibited for production class |
| **INF-TLS-2** | Certificate identity must match declared DNS identity |
| **INF-TLS-3** | Private key material is secret class — INF-SEC-* applies |
| **INF-TLS-4** | Certificate lifecycle is governed event — not expiry surprise |
| **INF-TLS-5** | Deprecated protocol versions prohibited in production class |
| **INF-TLS-6** | TLS termination point declared — end-to-end path documented |

### 12.4 Governance implications

TLS configuration is security-sensitive operational data — classification per SECURITY_STANDARDS.md §8.

### 12.5 Extension rules

Internal cleartext exception requires SECURITY_STANDARDS review with time boundary.

### 12.6 Risks if violated

Credential interception; persona confusion via wrong certificate; silent downgrade attacks.

---

## 13. Reverse Proxy Standards

### 13.1 Purpose

Reverse proxy governance defines **edge request handling discipline** — routing, termination, and failure behavior — without mandating proxy products.

**Upstream:** API_STANDARDS.md deferred gateway scope; INF-PRIN-7; BACKEND_ARCHITECTURE.md §14.6.

### 13.2 Reverse proxy responsibilities

| Responsibility | Owner at edge | Must not own |
|----------------|---------------|--------------|
| TLS termination | Infrastructure edge | Domain authorization decisions |
| Request routing | Infrastructure edge | Business rule selection |
| Rate limiting enforcement surface | Infrastructure edge — policy from governance | Rate limit policy definition in proxy config as business rules |
| Health check aggregation | Infrastructure edge | Domain truth synthesis |
| Static asset delivery | Edge or CDN — presentation scope | Marketplace domain state |

### 13.3 Reverse proxy rules

| Rule | Requirement |
|------|-------------|
| **INF-RPX-1** | Proxy forwards actor context — does not invent identity |
| **INF-RPX-2** | Proxy errors distinguish unreachable upstream from authorized denial |
| **INF-RPX-3** | Proxy must not cache mutation responses as success by default |
| **INF-RPX-4** | Request size and timeout limits declared — abuse containment |
| **INF-RPX-5** | Health checks reflect upstream honesty — no forced healthy during domain failure |
| **INF-RPX-6** | Proxy configuration is operational class — not domain-adjacent |

### 13.4 Governance implications

Reverse proxy is Infrastructure Boundary realization — not Application Platform System component.

### 13.5 Extension rules

New routed surfaces require API_STANDARDS alignment for contract exposure.

### 13.6 Risks if violated

Cached stale listings; hidden backend failures; authorization bypass via header injection if proxy invents context.

---

## 14. Service Execution Standards

### 14.1 Purpose

Service execution standards govern **how runnable system components are hosted, scaled, and lifecycle-managed** — independent of orchestration technology.

**Upstream:** SYSTEM_ARCHITECTURE.md components; BACKEND_ARCHITECTURE.md §14.6.

### 14.2 Service execution model

| Concept | Definition |
|---------|------------|
| **Service unit** | Declared runtime instance of one system component or subordinate worker |
| **Execution identity** | Service-scoped identity for internal trust — not human admin |
| **Execution lifecycle** | Start, health, scale, stop, replace — operational state only |
| **Execution boundary** | Resource and network scope of one service unit |

### 14.3 Service execution rules

| Rule | Requirement |
|------|-------------|
| **INF-SVC-1** | Each service unit maps to declared system component |
| **INF-SVC-2** | Service identity scoped per INF-SEC-4 — no shared platform super-credential |
| **INF-SVC-3** | Graceful shutdown preserves in-flight governed mutations — honest failure if impossible |
| **INF-SVC-4** | Horizontal scale does not partition domain ownership |
| **INF-SVC-5** | Background workers are service units — same authorization path as synchronous (SYS-INV-13) |
| **INF-SVC-6** | Single service unit must not host conflicting trust boundaries without declared isolation |

### 14.4 Resource governance

Resource limits are operational configuration — must not encode domain thresholds (e.g., max listing price) in CPU or memory settings.

### 14.5 Governance implications

Service inventory is operational evidence required for compliance review (§22).

### 14.6 Extension rules

New service unit types require SYSTEM_ARCHITECTURE component mapping.

### 14.7 Risks if violated

Workers bypassing domain ownership; runaway resource starvation; mixed trust levels in one process.

---

## 15. Container Governance

### 15.1 Purpose

Container governance defines **technology-neutral discipline** for image-bound runtime packaging — without mandating containers or specifying image formats.

**Upstream:** INF-PRIN-3; INF-PRIN-10; INF-PRIN-5.

**Note:** "Container" here means **immutable runtime package abstraction** — applicable whether implementation uses containers, virtual machines, or static binaries.

### 15.2 Container abstraction rules

| Rule | Requirement |
|------|-------------|
| **INF-CTR-1** | Runtime packages must not embed secret values |
| **INF-CTR-2** | Runtime packages must declare component identity and version |
| **INF-CTR-3** | Base composition is traceable — supply chain evidence required |
| **INF-CTR-4** | Immutable tag/version promoted — floating references prohibited in production class |
| **INF-CTR-5** | Runtime package does not include environment-specific domain configuration |
| **INF-CTR-6** | One primary component responsibility per runtime package — no multi-boundary bundling by default |

### 15.3 Governance implications

Container registry is operational artifact store — not authority surface.

### 15.4 Extension rules

Multi-process packages require isolation review. Privileged execution mode prohibited in production class by default.

### 15.5 Risks if violated

Secrets baked in layers; untraceable production images; domain rules in image env defaults.

---

## 16. Infrastructure Isolation

### 16.1 Purpose

Infrastructure isolation governance ensures **failure, credential, and data domains remain separable** across environments, zones, and tenants.

**Upstream:** INF-PRIN-2; SYSTEM_ARCHITECTURE.md failure domains; SECURITY_STANDARDS.md classification.

### 16.2 Isolation dimensions

| Dimension | Isolation obligation |
|-----------|---------------------|
| **Environment** | Production vs non-production — INF-ENV-* |
| **Network** | Zone separation — INF-NET-* |
| **Credential** | Secret scope — INF-SEC-* |
| **Data** | Persistence boundary — no cross-environment ungoverned copy |
| **Operational access** | Support access separated from runtime credentials |
| **Release** | Engineering release artifacts do not blur environment boundaries |

### 16.3 Isolation rules

| Rule | Requirement |
|------|-------------|
| **INF-ISO-1** | Blast radius of single credential compromise is bounded by scope |
| **INF-ISO-2** | Single infrastructure failure domain must not silently corrupt domain truth |
| **INF-ISO-3** | Noisy neighbor resource contention must not bypass authorization |
| **INF-ISO-4** | DR environment isolated until failover governance act |
| **INF-ISO-5** | Shared infrastructure tenancy requires declared risk acceptance for production class |

### 16.4 Governance implications

Isolation evidence required for production class eligibility review.

### 16.5 Extension rules

Relaxed isolation requires documented compensating controls and time boundary.

### 16.6 Risks if violated

Cross-environment data bleed; total platform compromise from single secret; DR split-brain.

---

## 17. Infrastructure Versioning

### 17.1 Purpose

Infrastructure versioning governs **identity and traceability** of infrastructure artifacts, configuration baselines, and deployment units — distinct from application semver and engineering release identifiers.

**Upstream:** REPOSITORY_STANDARDS.md §9; ENGINEERING_RELEASE_STRATEGY.md release identifier separation.

### 17.2 Version identity classes

| Class | Version identity | Authority relationship |
|-------|------------------|------------------------|
| **Application artifact** | Application release version | Subordinate to implementation governance |
| **Runtime package** | Immutable package version (INF-CTR-4) | Operational evidence |
| **Configuration baseline** | Declared configuration registry version | Operational evidence |
| **Infrastructure baseline** | Environment infrastructure snapshot identity | Operational evidence |
| **Engineering release** | `engineering-v*` identifier | Governance packaging — not deployment version |

### 17.3 Infrastructure versioning rules

| Rule | Requirement |
|------|-------------|
| **INF-VER-1** | Production deployments reference immutable version identities |
| **INF-VER-2** | Configuration and infrastructure baselines versioned independently from application |
| **INF-VER-3** | Rollback target identity must be pre-declared and verified |
| **INF-VER-4** | Engineering release tag must not substitute for deployment version identity |
| **INF-VER-5** | Version lineage traceable from deployment record to artifact identity |

### 17.4 Governance implications

Version confusion between GitHub Release, Git tag, and deployment promotion is an integrity defect (ENGINEERING_RELEASE_STRATEGY.md §4).

### 17.5 Extension rules

New version identity classes require registry entry before use.

### 17.6 Risks if violated

Un reproducible production; accidental rollback to wrong artifact; release/ deployment conflation.

---

## 18. Backup Governance

### 18.1 Purpose

Backup governance defines **protection discipline** for durable state and critical operational configuration — without specifying backup products or schedules as implementation mandates.

**Upstream:** DATABASE_ARCHITECTURE.md system-scope backup policy; DATABASE_STANDARDS.md deferral; INF-PRIN-9.

### 18.2 Backup classes

| Class | Protected material | Minimum governance |
|-------|-------------------|-------------------|
| **Authoritative persistence** | Domain truth stores — Data Persistence System | Integrity-verified; classification-matched storage; retention declared |
| **Media storage** | Media Storage System objects | Durability aligned to listing integrity requirements |
| **Evidence stores** | Audit and security evidence | Append integrity; tamper awareness |
| **Configuration baseline** | Registered operational configuration | Recovery independent of application artifact |
| **Secret metadata** | Secret identity and scope records — not values | Recovery without value exposure in backup logs |

### 18.3 Backup governance rules

| Rule | Requirement |
|------|-------------|
| **INF-BAK-1** | Every authoritative persistence scope has declared backup class |
| **INF-BAK-2** | Backup storage classification must not be lower than source |
| **INF-BAK-3** | Backup access scoped — not publicly reachable |
| **INF-BAK-4** | Backup success failure must be observable (§21 prerequisites) |
| **INF-BAK-5** | Restore verification is governed discipline — not optional assumption |
| **INF-BAK-6** | Non-production must not rely on production backup mounts without governance act |

### 18.4 Governance implications

Backup existence without verified restore is false durability claim — violates AP-18 honesty alignment.

### 18.5 Extension rules

New stateful components require backup class assignment in same governance act as production eligibility.

### 18.6 Risks if violated

Total listing loss; unrecoverable moderation history; backup ransomware exposure via flat network.

---

## 19. Disaster Recovery Governance

### 19.1 Purpose

Disaster recovery governance defines **continuity discipline** when infrastructure failure domains exceed normal resilience — without prescribing failover products or runbooks.

**Upstream:** SYSTEM_ARCHITECTURE.md failure modes; INF-PRIN-7; DATABASE_ARCHITECTURE.md durability expectations.

### 19.2 DR concepts

| Concept | Definition |
|---------|------------|
| **Recovery objective (governance)** | Declared maximum acceptable gap in operational availability — not numeric SLA in this document |
| **Data integrity objective** | Declared requirement that recovered domain truth matches pre-failure integrity class |
| **Failover** | Governed act switching production traffic to DR environment |
| **Failback** | Governed return to primary with integrity verification |

### 19.3 DR governance rules

| Rule | Requirement |
|------|-------------|
| **INF-DR-1** | DR posture declared before production class eligibility |
| **INF-DR-2** | Failover is governance act — not automatic silent default unless pre-approved and documented |
| **INF-DR-3** | DR must preserve honest failure — no synthetic success during partial recovery |
| **INF-DR-4** | DR environment credentials and data paths isolated until failover (INF-ENV-6) |
| **INF-DR-5** | DR verification exercises recorded — untested DR is PLANNED only |
| **INF-DR-6** | Recovery must honor domain ownership — no restore path bypassing authorization retrospective |

### 19.4 Relationship to backup

Backup governance (§18) provides material for recovery; DR governance governs **when and how** recovery activates across failure domains.

### 19.5 Governance implications

DR claims in continuity documents must match verified posture — REPOSITORY_STANDARDS.md registry honesty (GP-7).

### 19.6 Extension rules

Multi-region production requires DR governance amendment with failure domain map.

### 19.7 Risks if violated

Split-brain listings; silent partial recovery; expired DR credentials at failover time.

---

## 20. Infrastructure Security Baseline

### 20.1 Purpose

Infrastructure security baseline defines **minimum infrastructure-scope security obligations** — consuming SECURITY_STANDARDS.md without redefining enterprise security policy.

**Upstream:** SECURITY_STANDARDS.md; INF-PRIN-5, INF-PRIN-6; SYSTEM_ARCHITECTURE.md §18.

### 20.2 Baseline domains

| Domain | Baseline obligation |
|--------|---------------------|
| **Edge protection** | TLS (§12); reverse proxy discipline (§13); abuse limits |
| **Zone separation** | Network zones (§10); no flat production |
| **Secret handling** | INF-SEC-*; no secrets in artifacts |
| **Identity at runtime** | Service identity — not shared admin |
| **Vulnerability surface** | Traceable runtime packages (INF-CTR-3) |
| **Operational access** | Separated from application runtime credentials |
| **Audit support** | Infrastructure events available for security event governance |
| **Default deny** | Secure defaults — SEC secure default principles |

### 20.3 Baseline rules

| Rule | Requirement |
|------|-------------|
| **INF-BSL-1** | Production class fails baseline review → not eligible |
| **INF-BSL-2** | Baseline exceptions require SECURITY_STANDARDS-aligned review |
| **INF-BSL-3** | Infrastructure must not weaken API or persistence authorization paths |
| **INF-BSL-4** | Security-sensitive operational data protected per classification |
| **INF-BSL-5** | Baseline reviewed on material infrastructure architecture change |

### 20.4 Governance implications

Baseline compliance is precondition for production class — not substitute for security review of domain changes.

### 20.5 Extension rules

New baseline controls extend via governance review — not silent accumulation in checklists.

### 20.6 Risks if violated

Production launch on insecure baseline; gradual erosion via exceptions; security theater without SEC alignment.

---

## 21. Infrastructure Observability Prerequisites

### 21.1 Purpose

Infrastructure observability prerequisites define **capacity and boundary obligations** that enable future Observability Architecture — without defining signal taxonomy, tooling, or evidence governance.

**Upstream:** INF-PRIN-8; SYSTEM_ARCHITECTURE.md Observability System; non-authoritative `design-notes/OBSERVABILITY_ARCHITECTURE_VISION.md` — orientation only.

**Authority rule:** Observability Architecture when published supersedes planning vision. Prerequisites here must not contradict published observability authority.

### 21.2 Prerequisite categories

| Category | Infrastructure obligation |
|----------|---------------------------|
| **Signal egress** | Runtimes can emit operational signals to declared collection boundary |
| **Correlation capacity** | Request and operation correlation identifiers can propagate across service units |
| **Classification preservation** | Signal paths do not downgrade data classification |
| **Failure visibility** | Infrastructure failures generate distinct signals — not masked as success |
| **Security event transport** | Security-relevant infrastructure events reachable by security event governance |
| **Retention boundary** | Operational signal storage is bounded — not unbounded harvest by default |

### 21.3 Prerequisites rules

| Rule | Requirement |
|------|-------------|
| **INF-OBS-1** | Production class environments implement prerequisites before observability tooling dependence |
| **INF-OBS-2** | Signal paths must not traverse trust boundaries without classification review |
| **INF-OBS-3** | Infrastructure logs must not contain secret material (SEC-CRED-4) |
| **INF-OBS-4** | Prerequisites do not authorize observability mutation of domain state (SYS-INV-17) |
| **INF-OBS-5** | Observability Architecture may extend — not reduce — prerequisite obligations |

### 21.4 Governance implications

Prerequisites are necessary — not sufficient — for operational maturity. Full observability governance awaits Observability Architecture publication.

### 21.5 Extension rules

New signal types require classification review before infrastructure routing.

### 21.6 Risks if violated

Unobservable production; PII in infrastructure logs; observability agents with excessive privilege.

---

## 22. Infrastructure Compliance

### 22.1 Purpose

Infrastructure compliance governance defines **how infrastructure posture is verified against INF invariants** — without implementing audit automation.

**Upstream:** REPOSITORY_STANDARDS.md review requirements; SECURITY_STANDARDS.md audit relationship.

### 22.2 Compliance surfaces

| Surface | Compliance evidence |
|---------|-------------------|
| **Environment registry** | Class, isolation, and ownership declarations |
| **Configuration registry** | INF-CFG-* compliance |
| **Service inventory** | INF-SVC-* mapping to system components |
| **Secret scope registry** | INF-SEC-* alignment with SEC-CRED |
| **Network zone map** | INF-NET-* |
| **Backup and DR posture** | INF-BAK-* and INF-DR-* |
| **Baseline review record** | INF-BSL-* |

### 22.3 Compliance rules

| Rule | Requirement |
|------|-------------|
| **INF-CMP-1** | Production class requires compliance review before traffic authorization |
| **INF-CMP-2** | Material infrastructure change triggers compliance re-review |
| **INF-CMP-3** | Compliance gaps are honest defects — not hidden by partial checklists |
| **INF-CMP-4** | Compliance does not authorize implementation — standards compliance ≠ coding authorization |
| **INF-CMP-5** | Compliance records are operational evidence — subordinate to repository authority |

### 22.4 Review dimensions

Independent review verifies:

- Non-contradiction with SYSTEM_ARCHITECTURE.md and SECURITY_STANDARDS.md;
- Technology neutrality preserved;
- No domain policy encoded in infrastructure configuration;
- Prerequisites for Observability Architecture not blocked;
- Backup and DR claims match declared posture.

### 22.5 Governance implications

Compliance is governance gate for production **infrastructure posture** — separate from implementation authorization.

### 22.6 Extension rules

New compliance surfaces require registry entry in same amendment as new rules.

### 22.7 Risks if violated

Production on unreviewed infrastructure; checkbox compliance without invariant verification.

---

## 23. Infrastructure Publication Rules

### 23.1 Purpose

Infrastructure publication rules define **how changes to infrastructure governance and operational registries integrate with repository publication discipline**.

**Upstream:** REPOSITORY_STANDARDS.md §7; ENGINEERING_RELEASE_STRATEGY.md.

### 23.2 Publication scope

| Material | Publication surface |
|----------|---------------------|
| **Infrastructure Standards document** | Repository publication checkpoint per §7.6 |
| **Environment and configuration registries** | Operational evidence — updated with traceable commits when implementation authorized |
| **Infrastructure baseline declarations** | Continuity integration in CURSOR_HANDOFF when materially affects program status |

### 23.3 Publication rules

| Rule | Requirement |
|------|-------------|
| **INF-PUB-1** | This document follows REPOSITORY_STANDARDS.md lifecycle — DRAFT → review → APPROVED → PUBLISHED |
| **INF-PUB-2** | Publication confers active infrastructure governance — not implementation authorization |
| **INF-PUB-3** | Infrastructure Standards publication does not execute engineering release |
| **INF-PUB-4** | Operational registry changes do not amend product or domain authority |
| **INF-PUB-5** | Continuity synchronization required after publication checkpoint |

### 23.4 Relationship to engineering releases

Infrastructure Standards is **not** bundled retroactively into executed releases without governance amendment. Future release roadmap positions govern bundle membership (ENGINEERING_RELEASE_STRATEGY.md §15).

### 23.5 Governance implications

Repository publication creates binding infrastructure governance. Deployment promotion is separate operational act.

### 23.6 Extension rules

Infrastructure governance amendments require independent review and visible version history.

### 23.7 Risks if violated

Informal infrastructure convention overriding standards; release/deployment conflation; unpublished governance treated as active.

---

## 24. Infrastructure Invariants

Non-negotiable compliance criteria for all infrastructure engineering. Violation requires explicit governance remediation — not silent override.

### INF-INV-1 — Domain Truth Independence

Infrastructure operational state must never be treated as authoritative marketplace or identity domain truth.

**Implements:** SYSTEM_ARCHITECTURE.md §10.2; INF-PRIN-1.

### INF-INV-2 — Environment Credential Separation

Production credential material must not be usable in non-production environment classes without explicit governance act.

**Implements:** SECURITY_STANDARDS.md §9.2; INF-ENV-3.

### INF-INV-3 — No Domain Policy in Configuration

Infrastructure configuration must not encode domain-adjacent marketplace behavior without owning-domain governance act.

**Implements:** BACKEND_ARCHITECTURE.md §14.6; INF-CFG-2.

### INF-INV-4 — No Secrets in Artifacts

Secret values must not appear in version-controlled artifacts, runtime package layers, or public operational logs.

**Implements:** SEC-CRED-1, SEC-CRED-4; INF-SEC-1.

### INF-INV-5 — Trust Boundaries Survive Infrastructure

Infrastructure convenience must not bypass authentication, authorization, or ownership validation paths.

**Implements:** SECURITY_STANDARDS.md §14.3; SYS §18.

### INF-INV-6 — Honest Failure

Infrastructure must not present false success when upstream governed paths are unavailable.

**Implements:** BACKEND_ARCHITECTURE.md §14.6; INF-PRIN-7.

### INF-INV-7 — Backup Classification Parity

Backup storage classification must not be lower than source material classification.

**Implements:** SECURITY_STANDARDS.md §8; INF-BAK-2.

### INF-INV-8 — Service Identity Scope

Service execution identity must not carry platform-wide domain mutation authority by default.

**Implements:** SECURITY_STANDARDS.md §14.2; INF-SVC-2.

### INF-INV-9 — Observability Read-Only

Infrastructure-enabled observability paths must not grant domain mutation authority.

**Implements:** SYSTEM_ARCHITECTURE.md SYS-INV-17; INF-OBS-4.

### INF-INV-10 — Replaceability Preservation

Infrastructure replacement must not alter system component responsibilities or trust boundaries.

**Implements:** SYSTEM_ARCHITECTURE.md Component 12; INF-PRIN-3.

---

## 25. Review Standards

### 25.1 Review principle

Infrastructure changes require **independent review** proportional to impact — verifying compliance with SYSTEM_ARCHITECTURE.md, SECURITY_STANDARDS.md, and INF-INV invariants.

### 25.2 Review classes

| Change class | Minimum review focus |
|--------------|---------------------|
| New environment class or production environment | Full baseline and isolation review |
| Network zone or cross-zone path change | Trust boundary and SEC §14 alignment |
| Secret scope expansion | SEC-CRED alignment |
| Configuration registry addition — domain-adjacent | Owning domain authority review |
| DR posture change | INF-DR-* and backup class verification |
| Production class promotion | INF-CMP-1 full compliance review |
| Infrastructure Standards amendment | REPOSITORY_STANDARDS.md §16 dimensions |

### 25.3 Review outcome

Independent review concludes with **APPROVED** or **REQUIRES REVISION** per REPOSITORY_STANDARDS.md §16.3. Review outcome does not authorize implementation.

---

## 26. Downstream Consumers

The following documents and artifacts will consume Infrastructure Standards. Their content is **not defined here**.

| Consumer | Consumption relationship |
|----------|-------------------------|
| **Observability Architecture** | Signal collection honoring INF-OBS prerequisites |
| **Development Standards** | Implementation conventions within infrastructure discipline |
| **Implementation Governance** | Compliance verification against INF-INV invariants |
| **Authentication Architecture** | Runtime identity mount and edge alignment |
| **Authorization Architecture** | Enforcement path preservation at infrastructure edge |
| **Backend implementation** | Service execution within declared boundaries |
| **Frontend delivery** | DNS, TLS, and edge delivery constraints |
| **External integrations** | Integration zone and egress discipline |

### 26.1 Consumption model

Downstream standards and implementation must:

1. Declare Infrastructure Standards as consumed authority for infrastructure engineering discipline;
2. Preserve SYSTEM_ARCHITECTURE.md Infrastructure Boundary without contradiction;
3. Honor SECURITY_STANDARDS.md — not redefine SEC-CRED principles;
4. Not encode domain policy in infrastructure configuration;
5. Reference — not duplicate — environment, network, and isolation governance;
6. Remain technology-specific only at implementation layer;
7. Treat gate passage as discipline compliance — not implementation authorization.

---

## 27. Prohibited Scope

This document and infrastructure engineering governance **must not** specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| Cloud provider, region, or SKU selection | Implementation (when authorized) |
| Container images, orchestration manifests, Helm charts | Implementation (when authorized) |
| Terraform, Ansible, CloudFormation, or IaC modules | Implementation (when authorized) |
| Docker, Kubernetes, or vendor-specific APIs | Implementation (when authorized) |
| Firewall rule syntax, WAF SKU configuration | Implementation (when authorized) |
| Secret manager product setup guides | Implementation (when authorized) |
| Backup job schedules, cron expressions, runbooks | Implementation (when authorized) |
| CI/CD pipeline configuration | Development Standards / implementation |
| Domain invariants and marketplace rules | BACKEND_ARCHITECTURE.md · domain services |
| API contracts and error schemas | API_STANDARDS.md |
| Persistence aggregate boundaries | DATABASE_ARCHITECTURE.md |
| Security policy and SEC-CRED principles | SECURITY_STANDARDS.md |
| Observability signal taxonomy and evidence governance | Observability Architecture |
| Product behavior and experience meaning | Product Design Standard |
| Engineering release execution | ENGINEERING_RELEASE_STRATEGY.md — separate authorization |
| Phase 4 Product Development Methodology | Phase 4 |

**Standards only.** Implementation proceeds only under separate implementation authorization after applicable standards publication.

---

## 28. Terminology

| Term | Meaning |
|------|---------|
| **Infrastructure engineering governance** | This document's discipline — runtime realization boundaries subordinate to system architecture |
| **Infrastructure Boundary** | SYSTEM_ARCHITECTURE.md Component 12 — conceptual limit between components and runtime |
| **Operational state** | Deployment, health, and resource state — not domain truth |
| **Environment class** | Declared risk and sensitivity category — INF §5 |
| **Deployment environment** | Named instance of an environment class hosting declared components |
| **Service unit** | Runnable instance of a declared system component |
| **Runtime package** | Immutable deployable unit abstraction — technology-neutral container discipline |
| **Network zone** | Reachability class with default deny posture |
| **Configuration class** | Governance category determining ownership and change rules |
| **Backup class** | Declared protection discipline for a material category |
| **Infrastructure baseline** | Reviewed minimum security and isolation posture for production class |
| **Observability prerequisite** | Infrastructure capacity obligation — not observability architecture |
| **Promotion** | Controlled artifact movement across environment classes |
| **Failover** | Governed DR act — not silent default |

Terms defined in PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, SYSTEM_ARCHITECTURE.md, or SECURITY_STANDARDS.md retain upstream meaning.

---

## 29. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Infrastructure Standards |
| **Authority class** | Authoritative infrastructure engineering standards |
| **Binding authority** | Active — per REPOSITORY_STANDARDS.md §7.6 |
| **Publication** | COMPLETE |
| **Phase** | Infrastructure Standards — Phase 3 domain standard (MASTER_ROADMAP Scope; execution order position 2 per PHASE_3_EVOLUTION_AUTHORIZATION.md §6) |
| **Independent review** | APPROVED |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` — execution order position 2) |
| **Implementation** | NOT AUTHORIZED |
| **Supersedes** | Informal infrastructure convention |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0 · PROJECT_CONSTITUTION.md · ARCHITECTURE_PRINCIPLES.md · PLATFORM_ARCHITECTURE.md · SYSTEM_ARCHITECTURE.md · BACKEND_ARCHITECTURE.md · FRONTEND_ARCHITECTURE.md · PRODUCT_ARCHITECTURE.md · API_STANDARDS.md · DATABASE_ARCHITECTURE.md · SECURITY_STANDARDS.md · DATABASE_STANDARDS.md · REPOSITORY_STANDARDS.md · ENGINEERING_RELEASE_STRATEGY.md |
| **Superior to** | Ad hoc infrastructure operations · Implementation artifacts · Subordinate infrastructure encodings (on infrastructure engineering matters) |
| **Does not authorize** | Implementation; cloud or product selection; engineering release execution; Phase 3 completion |
| **Prerequisites** | DATABASE_STANDARDS.md published — satisfied; SECURITY_STANDARDS.md published — satisfied; Phase 3 Evolution AUTHORIZED — satisfied |

---

**Document path:** `docs/engineering/INFRASTRUCTURE_STANDARDS.md`  
**Related:** `docs/engineering/SYSTEM_ARCHITECTURE.md` · `docs/engineering/SECURITY_STANDARDS.md` · `docs/engineering/DATABASE_STANDARDS.md` · `docs/engineering/BACKEND_ARCHITECTURE.md` · `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
