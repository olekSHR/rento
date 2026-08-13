# Production Acceptance

**Purpose:** Decide whether a deployed candidate is accepted as production-correct.

## Hard distinctions

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
HTTP 200 != BUSINESS CORRECTNESS
TEST PASS != PRODUCTION CORRECTNESS
```

A successful deploy is not acceptance.

---

## Acceptance checks

Record each with evidence:

| Check | Result | Evidence |
|-------|--------|----------|
| Deployed application release identity matches candidate | PASS / FAIL / UNKNOWN | |
| Runtime health is acceptable | PASS / FAIL / UNKNOWN | |
| User-visible target behavior holds in production | PASS / FAIL / UNKNOWN | |
| Authn/authz boundaries still hold where relevant | PASS / FAIL / UNKNOWN / NOT APPLICABLE | |
| Data/migration state is consistent | PASS / FAIL / UNKNOWN / NOT APPLICABLE | |
| Rollback target remains known | PASS / FAIL / UNKNOWN | |

## Non-acceptance signals

- Only transport success (for example HTTP 200) without business-correctness proof
- Only pre-deploy tests without production behavior confirmation
- Ambiguous release identity
- Unknown migration or rollback posture for production-changing work

## Outcomes

| Outcome | Next step |
|---------|-----------|
| ACCEPTED | Task may move to CLOSED after records are complete |
| NOT ACCEPTED | Contain/rollback as needed; open follow-up or keep BLOCKED |
| NOT APPLICABLE | No production change occurred |
