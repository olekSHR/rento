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

---

## Authenticated Production Acceptance

Use this section when a task requires authenticated production verification.

1. Use the dedicated production acceptance identity only. Never use real customer, realtor, or admin credentials.
2. Store acceptance credentials outside Git in an operator-controlled secure store. The repository may record the reserved email/user id and credential-location description only.
3. Use the normal application lifecycle: `GET /api/auth/csrf` → `POST /api/auth/login` → authorized acceptance operations → `POST /api/auth/logout`.
4. Use the least-privilege role required by the acceptance case. Current approved identity is `role=user`.
5. Any production mutation must be explicitly authorized by the task being accepted.
6. Prefer read-only or non-persistent checks where possible.
7. Never document passwords, password hashes, session cookies, CSRF tokens, session tokens, or reset tokens in repository records.
8. Logout and revoke the session after acceptance, even when the check was read-only.

**Approved identity (OPS-001):**

| Field | Value |
|-------|-------|
| Email | `acceptance@rentonow.ro` |
| User ID | `27` |
| Role | `user` |
| Account status | `active` |
| Credential location | Operator-local store outside Git (`~/.rento-ops/production-acceptance-identity.json`) |

Production authenticated requests must use the HTTPS API path when secure session cookies are enabled.
