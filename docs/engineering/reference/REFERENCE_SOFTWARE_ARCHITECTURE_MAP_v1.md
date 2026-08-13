# Reference Software Architecture Map v1

**Status:** REFERENCE — reasoning baseline
**Authority:** Non-authoritative map for AI/human engineering reasoning
**Scope:** Technology-agnostic software systems

---

## Purpose

This map is a **reasoning baseline**, not an official universal folder standard.

Use it to:

- orient discovery and impact analysis;
- map a real project against common capability layers;
- classify gaps and adaptations honestly.

Do **not** rewrite this reference merely to make an existing project appear compliant.

---

## Mapping posture

Real projects are mapped **against** this reference.

Observed differences may be classified as:

| Classification | Meaning |
|----------------|---------|
| JUSTIFIED ADAPTATION | Valid project-specific shape that still covers the capability |
| TECHNICAL DEBT | Known shortfall that should be tracked |
| MISSING CAPABILITY | Required capability not present |
| NOT APPLICABLE | Capability does not apply to this system |
| DELIBERATE ARCHITECTURAL DECISION | Explicit chosen divergence with recorded rationale |

Project-specific technologies, frameworks, hosts, and folder layouts belong in `PROJECT_BASELINE.md`, not here.

---

## Canonical architecture / build reasoning map

Logical dependency and learning order — **not** a mandatory waterfall process.

Teams may iterate, parallelize, or start mid-map when evidence requires it. The map shows typical dependency direction for reasoning about impact.

```text
Requirements
    ↓
Domain
    ↓
Architecture
    ↓
Project Foundation
    ↓
Configuration
    ↓
Database
    ↓
Domain Models
    ↓
API Contracts
    ↓
Business Logic
    ↓
Security
    ↓
API / Transport
    ↓
Frontend / Client
    ↓
Tests
    ↓
Runtime / Containers
    ↓
Infrastructure
    ↓
CI/CD
    ↓
Production
    ↓
Observability
    ↓
Backup / Recovery
    ↓
Improvement Loop
```

---

## Capability layers (practical map)

| Layer | Questions this layer answers |
|-------|------------------------------|
| Requirements | What problem and constraints exist? |
| Domain | Actors, entities, relationships, lifecycle, invariants? |
| Architecture | Boundaries, trust zones, ownership of decisions? |
| Project Foundation | Repo layout, modules, build/tooling entrypoints? |
| Configuration | Environment, secrets handling, feature flags? |
| Database | Persistent schema, migrations, integrity rules? |
| Domain Models | In-code representation of domain meaning? |
| API Contracts | Request/response shapes and compatibility? |
| Business Logic | Use cases, rules, side effects? |
| Security | Authn, authz, validation, abuse controls? |
| API / Transport | Routing, middleware, protocol adapters? |
| Frontend / Client | User-visible flows and client state? |
| Tests | What proof exists for behavior and regression? |
| Runtime / Containers | How the app process is packaged and run? |
| Infrastructure | Hosts, network, storage, managed services? |
| CI/CD | Build, verify, promote, deploy path? |
| Production | Live release identity and operating posture? |
| Observability | Logs, metrics, traces, alerts, evidence? |
| Backup / Recovery | Restore path and rollback target? |
| Improvement Loop | Feedback into next bounded change? |

---

## Technology-agnostic request lifecycle

Use this path when tracing a user-visible result or failure:

```text
User / Client
    ↓
Frontend / Client
    ↓
API client / transport
    ↓
Network / TLS / proxy
    ↓
Application middleware
    ↓
Router / Controller
    ↓
Authentication
    ↓
Authorization
    ↓
Input validation
    ↓
Use case / Business logic
    ↓
Data access
    ↓
Database / persistent storage
    ↓
Response contract
    ↓
Client state
    ↓
User-visible result
```

Skip stages that are NOT APPLICABLE for the use case; do not invent stages that evidence does not support.

---

## Quality dimensions

Evaluate material changes against:

- Security
- Reliability
- Performance
- Operability
- Maintainability
- Testability
- Cost where relevant

These dimensions guide risk and verification planning. They are not a separate bureaucracy layer.

---

## How to use with a real project

1. Read this reference.
2. Fill or update `PROJECT_BASELINE.md` from repository and runtime evidence.
3. Classify each material difference using the mapping classifications above.
4. Bound work into tasks under `protocol/TASK_TEMPLATE.md`.

This file stays technology-agnostic on purpose.
