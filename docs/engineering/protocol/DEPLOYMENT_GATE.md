# Deployment Gate

**Purpose:** Separate verified repository work from production-changing action.

## Hard distinctions

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
HTTP 200 != BUSINESS CORRECTNESS
TEST PASS != PRODUCTION CORRECTNESS
```

Approval of verification or commit does **not** approve deploy.

---

## Preconditions

Before any production-changing deploy:

1. Task STATUS is `READY_TO_DEPLOY` (or equivalent explicit deploy authorization).
2. Final verification for the candidate is recorded.
3. The following are established with evidence labels:

| Fact | Value | Evidence |
|------|-------|----------|
| current application release | | VERIFIED / INFERRED / UNKNOWN / NOT APPLICABLE |
| candidate release | | |
| migration state | | |
| runtime health | | |
| rollback target | | |
| backup relevance | | |

## Prohibitions

- Do not assume `production Git HEAD == deployed application release`.
- Do not treat local HEAD, remote branch tip, or CI green alone as deploy authority.
- Do not deploy unrelated changes bundled opportunistically with the candidate.

## Gate result

| Result | Meaning |
|--------|---------|
| PASS | Deploy may proceed under explicit authorization |
| FAIL | Deploy blocked; record reason and required evidence |
| NOT APPLICABLE | No production-changing action in this task |
