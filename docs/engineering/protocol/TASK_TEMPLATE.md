# Task Template

Copy into `docs/engineering/tasks/TASK-XXX-<slug>.md` for each bounded task.

> STATUS: DISCOVERY means application code must not be modified.

---

## Header

| Field | Value |
|-------|-------|
| ID | TASK-XXX |
| TITLE | |
| STATUS | DISCOVERY |
| RISK | LOW / MEDIUM / HIGH |

### Allowed STATUS values

```text
DISCOVERY
READY
IMPLEMENTING
VERIFYING
READY_TO_DEPLOY
PRODUCTION_VERIFICATION
BLOCKED
CLOSED
```

### Allowed RISK values

```text
LOW
MEDIUM
HIGH
```

---

## Problem

<!-- What is wrong, missing, or required? -->

## Current Behavior

<!-- Observed behavior with evidence labels where relevant. -->

## Target Behavior

<!-- Desired behavior after the bounded change. -->

## In Scope

<!-- Exact work authorized for this task. -->

## Out of Scope

<!-- Explicit exclusions. Unrelated findings go to Follow-up. -->

## Affected Layers

<!-- Map to reference layers / request lifecycle stages. -->

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| | VERIFIED / INFERRED / UNKNOWN / NOT APPLICABLE | |

## Proposed Change

<!-- Concise intended change. No opportunistic refactors. -->

## Risks

<!-- Security, data, auth, ops, rollback, user-visible impact. -->

## Verification Plan

<!-- Task-appropriate checks proving Current → Target. -->

## Rollback Impact

<!-- How to undo or contain if the change is wrong. -->

## Implementation Result

<!-- Filled during/after IMPLEMENTING. Files touched, key decisions. -->

## Final Verification

<!-- Commands/results before success claim. -->

## Commit

<!-- Hash/message only after an approved commit stage. -->

## Production Result

<!-- Filled only after deploy + production verification if applicable. -->

## Follow-up

<!-- Separate findings and future tasks. Do not expand this task. -->

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY
IMPLEMENTATION
VERIFICATION
COMMIT
PUSH
DEPLOY
PRODUCTION ACCEPTANCE
```
