# Project Baseline

**Status: TEMPLATE — not yet filled from repository evidence.**

**Purpose:** Durable, evidence-labeled snapshot of the real project shape.
**Rule:** Record only what evidence supports. Do not invent compliance.

> Repository HEAD and deployed application release identity are separate facts and must not be assumed to be identical.

---

## Evidence classification

Use exactly these labels:

| Label | Meaning |
|-------|---------|
| VERIFIED | Confirmed from repository, runtime, or operational evidence |
| INFERRED | Reasonable conclusion from partial evidence; not directly confirmed |
| UNKNOWN | Not established |
| NOT APPLICABLE | Does not apply to this project |

Every material baseline claim should carry one label.

---

## Repository

| Field | Value | Evidence |
|-------|-------|----------|
| branch | _TBD_ | UNKNOWN |
| HEAD | _TBD_ | UNKNOWN |
| origin/main | _TBD_ | UNKNOWN |
| divergence | _TBD_ | UNKNOWN |
| worktree | _TBD_ | UNKNOWN |

---

## Backend

| Field | Value | Evidence |
|-------|-------|----------|
| entrypoint | _TBD_ | UNKNOWN |
| API | _TBD_ | UNKNOWN |
| application/business logic | _TBD_ | UNKNOWN |
| data access | _TBD_ | UNKNOWN |
| authentication | _TBD_ | UNKNOWN |
| authorization | _TBD_ | UNKNOWN |

---

## Database

| Field | Value | Evidence |
|-------|-------|----------|
| engine | _TBD_ | UNKNOWN |
| migrations | _TBD_ | UNKNOWN |
| current migration revision/state | _TBD_ | UNKNOWN |
| primary entities | _TBD_ | UNKNOWN |

---

## Runtime / Infrastructure

| Field | Value | Evidence |
|-------|-------|----------|
| runtime/containers | _TBD_ | UNKNOWN |
| networking | _TBD_ | UNKNOWN |
| reverse proxy | _TBD_ | UNKNOWN |
| TLS | _TBD_ | UNKNOWN |
| external edge/proxy if applicable | _TBD_ | UNKNOWN |

---

## Production

| Field | Value | Evidence |
|-------|-------|----------|
| hosting | _TBD_ | UNKNOWN |
| production repository revision where relevant | _TBD_ | UNKNOWN |
| deployed application release identity | _TBD_ | UNKNOWN |
| deployment method | _TBD_ | UNKNOWN |
| health verification | _TBD_ | UNKNOWN |

Notes:

- Production repository revision (if observable) is not automatically the deployed application release identity.
- Do not treat local or remote Git HEAD as proof of what production is running.

---

## Operations

| Field | Value | Evidence |
|-------|-------|----------|
| logs | _TBD_ | UNKNOWN |
| backups | _TBD_ | UNKNOWN |
| rollback | _TBD_ | UNKNOWN |
| recovery | _TBD_ | UNKNOWN |

---

## Mapping vs reference

Record material differences from `REFERENCE_SOFTWARE_ARCHITECTURE_MAP_v1.md`:

| Area | Classification | Notes | Evidence |
|------|----------------|-------|----------|
| _TBD_ | JUSTIFIED ADAPTATION / TECHNICAL DEBT / MISSING CAPABILITY / NOT APPLICABLE / DELIBERATE ARCHITECTURAL DECISION | _TBD_ | UNKNOWN |

---

## Baseline hygiene

- Prefer short factual entries over narrative.
- Update when repository or production evidence changes.
- Keep UNKNOWN visible until evidence exists.
- Do not rewrite the reference map to hide project differences.
