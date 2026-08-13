# Definition of Done

**Purpose:** Prevent premature “done” claims for engineering tasks.

## Hard distinctions

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
HTTP 200 != BUSINESS CORRECTNESS
TEST PASS != PRODUCTION CORRECTNESS
```

---

## Done means

A task is DONE / CLOSED only when all applicable items below are true:

1. **Scope held** — only in-scope work was performed; unrelated findings are in Follow-up.
2. **Target behavior** — Current → Target is evidenced.
3. **Verification** — task-appropriate verification ran and is recorded.
4. **Diff hygiene** — unexpected files, deletions, formatting, dependency, migration, secret, and debug artifacts were reviewed.
5. **Gates respected** — DISCOVERY, IMPLEMENTATION, VERIFICATION, COMMIT, PUSH, DEPLOY, PRODUCTION ACCEPTANCE were treated as separate approvals.
6. **Production** — if the task changed production, Production Acceptance is ACCEPTED (or an explicit NOT ACCEPTED path with containment is recorded).
7. **Rollback awareness** — rollback impact remains understood for the change class.

## Explicitly not done

- Code exists locally but task verification is incomplete
- Commit exists but deploy was not authorized
- Deploy occurred but production acceptance was not completed
- Health endpoint or smoke HTTP success without business-correctness check when behavior changed
- Test suite pass without addressing the task’s target behavior

## Non-production tasks

If a task never changes production, DEPLOY and PRODUCTION ACCEPTANCE may be NOT APPLICABLE. All other applicable Done criteria still apply.
