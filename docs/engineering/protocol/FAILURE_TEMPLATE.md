# Failure Template

Evidence-first investigation record for defects and incidents.

> Root cause must not be declared before evidence confirms the hypothesis.

---

## Failure identity

| Field | Value |
|-------|-------|
| ID | FAIL-XXX |
| TITLE | |
| STATUS | INVESTIGATING / HYPOTHESIS / CONFIRMED / FIXING / VERIFYING / CLOSED |
| RISK | LOW / MEDIUM / HIGH |
| Linked task | TASK-XXX if created |

---

## Investigation sequence

Complete in order. Do not skip to “Confirmed root cause”.

### Symptom

<!-- What users/operators observe. -->

### Reproduction

<!-- Steps, environment, frequency. UNKNOWN if not yet reproducible. -->

### Evidence

| Claim | Label | Source |
|-------|-------|--------|
| | VERIFIED / INFERRED / UNKNOWN / NOT APPLICABLE | |

### User-visible layer

<!-- Where the symptom appears to the user/client. -->

### Request lifecycle

<!-- Trace through the technology-agnostic lifecycle; mark N/A where unused. -->

### Authentication

### Authorization

### Validation

### Business logic

### Data access

### Database

### Infrastructure

### Root-cause hypothesis

<!-- Candidate explanation only. -->

### Hypothesis test

<!-- What evidence would confirm or reject it; results. -->

### Confirmed root cause

<!-- Fill only after hypothesis test confirms. -->

### Fix

<!-- Bound fix via task template; no opportunistic cleanup. -->

### Verification

<!-- Proof that symptom is gone and target behavior holds. -->

### Regression surface

<!-- Nearby behaviors that could break. -->

### Prevention/follow-up

<!-- Separate follow-up tasks if needed. -->

---

## Discipline

- Prefer VERIFIED evidence over narrative certainty.
- Keep INFERRED and UNKNOWN visible.
- One failure record may spawn multiple bounded tasks; do not conflate investigation with unrelated refactors.
