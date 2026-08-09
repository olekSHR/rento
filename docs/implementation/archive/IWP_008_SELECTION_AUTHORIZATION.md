# IWP-008 Package Selection Authorization

**Status:** PUBLISHED — EFFECTIVE (package selection gate only)
**Authority class:** Package selection authorization gate only
**Binding authority:** ACTIVE — selection gate only; not activation; not implementation authority; not discovery authority
**Program:** Implementation, Stabilization & Launch
**Stage:** I4 — Domain Implementation
**Work package:** IWP-008 — Uploads And Media Storage Hardening
**IWP-008 lifecycle:** SELECTED — NOT ACTIVE — NOT IMPLEMENTATION-AUTHORIZED
**IWP-007 lifecycle:** ACCEPTED — CLOSED — INACTIVE
**Stage I4:** IN PROGRESS
**Active implementation packages:** 0
**Authorized technical implementation packages:** 0
**Technical implementation:** NOT STARTED
**Push / release / deployment:** NOT AUTHORIZED by this document
**Publication integration:** COMPLETED
**Publication checkpoint (git):** COMPLETED BY THIS PUBLICATION COMMIT
**Publication parent commit:** `c89d0065c201e95adfc534aaedf4db44fe493063`

---

## 1. Starting Repository Baseline

| Item | Value |
|------|-------|
| Repository | `C:/Users/Александр/Desktop/Projects/rento` |
| Branch | `main` |
| Pre-publication parent commit | `c89d0065c201e95adfc534aaedf4db44fe493063` |
| Pre-publication subject | `docs(iwp-007): close implementation package` |
| IWP-007 lifecycle | ACCEPTED — CLOSED — INACTIVE |
| IWP-008 (pre-publication) | PROPOSED — NOT SELECTED — INACTIVE |
| Stage I4 | IN PROGRESS |
| Active implementation packages | 0 |
| Open authorized technical execution packages | 0 |

---

## 2. Selection Scope

This document executes **package selection only** under `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` lifecycle step 2.

Selection scope is **identification of IWP-008 as the chosen Stage I4 package for possible later activation**. It does **not** activate IWP-008, authorize discovery, authorize implementation, establish a technical write set, grant acceptance, or complete Stage I4.

Register metadata in `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` defines the package identity consumed by this selection act. Detailed implementation scope remains for a later separate execution authorization.

---

## 3. Preconditions Verified At Publication

| # | Precondition | Result |
|---|--------------|--------|
| P1 | `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` published and effective | **SATISFIED** @ `c54b106` |
| P2 | IWP-002 dependency accepted | **SATISFIED** |
| P3 | IWP-003 dependency accepted | **SATISFIED** |
| P4 | IWP-005 dependency accepted | **SATISFIED** |
| P5 | IWP-007 coordination outputs O1–O5 satisfied | **SATISFIED** — `IWP_007_FINAL_ACCEPTANCE_REPORT.md` §6; closure @ `c89d006` |
| P6 | IWP-007 ACCEPTED — CLOSED — INACTIVE | **SATISFIED** — `IWP_007_PACKAGE_CLOSURE_REPORT.md` |
| P7 | Active implementation packages remain 0 | **SATISFIED** |
| P8 | Authorized technical implementation packages remain 0 | **SATISFIED** |
| P9 | No other package is selected, active, executable, implementation-authorized, or executing | **SATISFIED** |
| P10 | Stage I4 remains IN PROGRESS | **SATISFIED** |
| P11 | Execution order IWP-007 before IWP-008 preserved | **SATISFIED** |
| P12 | Continuity synchronization not required before selection | **SATISFIED** — coordination §11; IWP-007 selection precedent §9 |
| P13 | Register lag non-blocking | **SATISFIED** — coordination §11 |

No additional readiness review is required beyond these explicit selection prerequisites.

---

## 4. Package Identity And Bounded Objective

**IWP-008 — Uploads And Media Storage Hardening**

Objective (register): harden upload validation, media persistence, gallery consistency, file serving, and image URL handling.

**Ownership inherited from coordination authority (summary only):**

- Upload/media `api.ts` functions, `getImageUrl.ts`, gallery components, upload router and backend media surfaces — **IWP-008**
- Session transport, auth stack, workflow caller migration — **excluded** (IWP-006 / IWP-007 closed)
- §10.3 session-route bridge and upload/media signature stabilization — **in IWP-008 scope**

**Explicit exclusions:** F-002 Phase 2; F-013 M1; auth-stack modification; workflow UX outside gallery paths; release; deployment; external storage selection; production file migration.

---

## 5. Selection Decision

**Decision:** IWP-008 is **SELECTED — EFFECTIVE**.

**Exact selected lifecycle status:**

```text
SELECTED — NOT ACTIVE — NOT IMPLEMENTATION-AUTHORIZED
```

Selection basis:

1. `docs/implementation/IWP_007_PACKAGE_CLOSURE_REPORT.md` §8 identifies IWP-008 selection as the next permitted act.
2. Coordination outputs O1–O5 are satisfied per `docs/implementation/IWP_007_FINAL_ACCEPTANCE_REPORT.md` §6.
3. All register dependencies and single-package constraints are satisfied.
4. Only IWP-008 is selected; IWP-007 remains closed and inactive.

**Selection does not authorize:** activation, bounded read-only discovery, technical implementation, execution against implementation files, package acceptance, push, release, deployment, or Stage I4 completion.

---

## 6. Lifecycle Preservation

After publication of this document:

| Item | Required state |
|------|----------------|
| IWP-008 | **SELECTED — NOT ACTIVE — NOT IMPLEMENTATION-AUTHORIZED** |
| IWP-008 technical implementation | **NOT STARTED** |
| IWP-007 | ACCEPTED — CLOSED — INACTIVE |
| Stage I4 | IN PROGRESS |
| Active implementation packages | **0** |
| Authorized technical implementation packages | **0** |

---

## 7. Prohibitions

This selection authority does **not**:

- activate IWP-008;
- publish IWP-008 execution authorization;
- authorize discovery or implementation;
- modify upload/media API signatures or bodies;
- resolve the §10.3 session-route bridge;
- reopen or modify IWP-007;
- complete Stage I4;
- synchronize register, roadmap, or handoff;
- authorize push, release, deployment, or Phase 4;
- supersede `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md`.

---

## 8. Next Authorized Action

**Exact next authorized action:** One bounded **IWP-008 execution-authorization determination or authoring act** under separate Repository Authority.

That act may address activation, bounded read-only discovery when explicitly authorized, and package implementation scope. It must **not** authorize technical implementation unless the published execution authorization explicitly does so within an exact bounded scope. It must **not** complete Stage I4.

---

## 9. Authority Basis

| Source | Use |
|--------|-----|
| `docs/implementation/STAGE_I4_EXECUTION_AUTHORIZATION.md` | §8 single-active-package rule; §9 step 2; §10 lifecycle separation |
| `docs/implementation/IWP_007_PACKAGE_CLOSURE_REPORT.md` | IWP-007 closure; next-act authorization |
| `docs/implementation/IWP_007_IWP_008_COORDINATION_AUTHORITY.md` | Execution order; O1–O5; ownership boundaries |
| `docs/implementation/IWP_007_FINAL_ACCEPTANCE_REPORT.md` | O1–O5 completion evidence |
| `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md` | IWP-008 package definition and dependencies |
| `docs/engineering/REPOSITORY_STANDARDS.md` §7.6 | Publication checkpoint requirement |

---

## 10. Continuity And Publication Record

| Field | Value |
|-------|-------|
| Artifact | `docs/implementation/IWP_008_SELECTION_AUTHORIZATION.md` |
| Register synchronization | **NOT PERFORMED** — separate continuity act if required |
| Handoff synchronization | **NOT PERFORMED** — separate continuity act if required |
| Independent review | NOT REQUIRED for this selection gate class |
| Authority conferred | IWP-008 selection — EFFECTIVE upon publication commit |
