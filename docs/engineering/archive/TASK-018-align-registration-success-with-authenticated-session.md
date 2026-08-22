# TASK-018 — Align Registration Success With Authenticated Session

| Field | Value |
|-------|-------|
| ID | TASK-018 |
| TITLE | Align Registration Success With Authenticated Session |
| STATUS | CLOSED |
| RISK | LOW |
| CLASSIFICATION | Frontend auth UX alignment / registration success vs existing session |

> STATUS: CLOSED means definition, implementation, local verification, commit review, commit, push, deployment preflight, rollback preservation, frontend-only deployment, production acceptance, and closure documentation are complete and recorded. Production acceptance result is **PASS** with documented observability limitations (see Accepted Observability Limitations). Archive is **NOT YET** performed.

**Final lifecycle (VERIFIED 2026-08-22):**

| Stage | State |
|-------|-------|
| Next-increment discovery | COMPLETE — `NEXT_INCREMENT_DISCOVERY_COMPLETE` |
| Definition | COMPLETE — this document |
| Implementation | COMPLETE — `frontend/app/register/page.tsx` |
| Local Verification | PASS — see "Implementation & Local Verification Evidence" |
| Commit Review | PASS |
| Commit | COMPLETE — `f4384f3fa0d71da95e295a424a0c07a910738c3b` |
| Push | COMPLETE — `origin/main` at `f4384f3fa0d71da95e295a424a0c07a910738c3b` |
| Deployment Preflight | PASS |
| Rollback Preservation | PASS — `rento-frontend:rollback-52f5a4a` |
| Deployment | PASS — FRONTEND_ONLY |
| Production Acceptance | PASS — `TASK_018_PRODUCTION_ACCEPTANCE_PASS` |
| Closure | COMPLETE |
| Archive | NOT YET |

**Initiative reference:** Next-increment discovery after TASK-017 (CLOSED + ARCHIVED + COMPLETE) selected registration success alignment over documents hub, viewing-lifecycle expansion, admin report queue, and residual D1 visual work.

**Repository baseline at definition (VERIFIED 2026-08-20):**

| Field | Value |
|-------|-------|
| HEAD | `8f4575bb8f9cbafdb8ec2b5220480a5c7c580682` |
| origin/main | `8f4575bb8f9cbafdb8ec2b5220480a5c7c580682` |
| divergence | `0 0` |
| Worktree before this document | clean |
| Active tasks before creation | `docs/engineering/tasks/README.md` only |
| Prior task | TASK-017 — CLOSED / ARCHIVED / COMPLETE |
| TASK-018 identifier | free (historical `TASK-018` / `OUT OF SCOPE` mentions inside archived TASK-017 are not a collision) |

**Production state at closure (VERIFIED 2026-08-22):** Production Git HEAD and deployed frontend runtime are at TASK-018 implementation SHA `f4384f3fa0d71da95e295a424a0c07a910738c3b`. Application identity is classified **INFERRED** — Docker image does not contain immutable Git SHA metadata (see Production Deployment Evidence).

---

## Product Direction

After TASK-015/016/017 the Realtor workspace visual migration is substantially complete. The next increment is **not** another visual alignment. It fixes a first-session auth UX contradiction: successful registration already creates a server session, but the register page treats the user as if they still need to sign in.

TASK-018 is **client alignment with the existing auth architecture**. It is not:

- an auth redesign;
- a session/CSRF/cookie change;
- an onboarding flow;
- a role-selection feature;
- a login/register route-guard project.

---

## Problem

**User problem:** A new renter (or any self-registering `user`) completes Create account and is told «Account created. You can now sign in» with a **Go to login** CTA. The server has already created an authenticated session. The page never hydrates `AuthContext`, so protected navigation still behaves as logged-out until a second login or a full restore-from-cookie cycle.

**Defect statement (VERIFIED):**

```text
Server session is created successfully,
but register page does not synchronize the existing client AuthContext
and presents the user as if authentication still needs to occur.
```

---

## Current Behavior

### Backend — `backend/app/routers/auth.py`

`POST /auth/register` (`response_model=UserResponse`, HTTP 201):

1. `auth_service.register_user(db, email, password)` — creates account; duplicate email → `BadRequestException("Email already registered")`.
2. `session_service.create_session(db, created_user.id)` — persists `auth_sessions` row; returns raw token.
3. `csrf.generate_csrf_token()` + `session_service.set_session_cookie` + `csrf.set_csrf_cookie`.
4. Returns created user (`id`, `email`, `role`, `account_status`).

Session cookie: `httponly=True`, `secure` / `samesite` from settings, `path="/"`. CSRF cookie: `httponly=False` (readable for header echo). `/auth/register` is CSRF-exempt (`csrf.py` `CSRF_EXEMPT_PATHS`).

`UserCreate` accepts only `email` + `password` (`min_length=6`). No role field. `User.role` defaults to `"user"`; `user_repository.create_user` does not set role. Self-registration cannot create `realtor` or `admin`.

### Frontend API — `frontend/services/authApi.ts`

`registerUser(data)` → `authFetch("/auth/register", { method: "POST", body: JSON.stringify(data) })` with `credentials: "include"`. Same payload as `RegisterRequest`: `{ email, password }`.

There is no `frontend/lib/api.ts` register helper. The page and `AuthContext` both use `authApi.ts`.

### AuthContext — `frontend/context/AuthContext.tsx`

Existing `register(data)` **already**:

1. `await registerUser(data)`;
2. `await getCurrentUser()` (`GET /users/me`);
3. `setUser(currentUser)`.

Returns `Promise<void>` (unlike `login`, which returns `User`). Fields: `user`, `isLoading`, `isAuthenticated` (`user !== null`), `isAdmin`, `isRealtor`, `login`, `register`, `logout`.

If `getCurrentUser()` fails after account/session creation, `register()` throws and **does not** `setUser`. That existing contract is the recovery rule for TASK-018: stay on the register page and show the error. Do **not** invent a second recovery path. A later refresh can restore the session via the existing `restoreSession` effect.

### Register page — `frontend/app/register/page.tsx`

Bypasses `useAuth().register`. Calls `registerUser` directly, then `setIsSuccess(true)`. Does **not** call `getCurrentUser` / `setUser`. Success branch:

- copy: `Account created. You can now sign in.`
- CTA: `Go to login` → `buildLoginHref(returnUrl)` or `/login`

`returnUrl` is already sanitized via `sanitizeReturnUrl` for the login CTA only — it is **not** used as a post-registration destination.

### Login page — `frontend/app/login/page.tsx` (contract to reuse, not modify)

```text
sanitizeReturnUrl(searchParams.get("returnUrl"))
→ login() hydrates AuthContext and returns User
→ router.push(getPostLoginPath(user.role, returnUrl))
```

`getPostLoginPath` (local to login, not exported):

```text
valid sanitized returnUrl → that path
else if role === "admin" → /admin
else if role === "realtor" → /realtor
else → /
```

Mechanism: `router.push` (not `replace`).

### Return URL safety — `frontend/lib/returnUrl.ts`

`sanitizeReturnUrl`:

- empty / missing → `null`
- must start with `/`
- must **not** start with `//` (protocol-relative / open-redirect)
- no host rewriting; relative internal path only

Unsafe/external values become `null`. Login then uses the role default. TASK-018 must use the same sanitizer and the same destination rule. Do not weaken it. Do not add a new helper.

### Why the UX is contradictory

| Layer | After successful register |
|-------|---------------------------|
| Server | Session + CSRF cookies set — VERIFIED |
| AuthContext | Unchanged (`user === null`) because page skipped `register()` — VERIFIED |
| UI | Instructs a second sign-in — VERIFIED |
| Protected routes | `isAuthenticated` is false until restore/login — VERIFIED |

---

## Target Behavior

```text
valid form submit
→ useAuth().register({ email, password })   // one registerUser + getCurrentUser + setUser
→ on success: router.push(same destination rule as login)
→ no "sign in again" screen
→ on failure: stay on /register, show error, do not navigate
```

Preferred success UX (no intermediate confirmation):

```text
successful registration
→ AuthContext synchronized
→ navigate directly to sanitized returnUrl or default authenticated destination
```

No celebratory/onboarding screen. Remove `isSuccess` / «Go to login» as the primary post-success path.

Because self-registration always creates `role=user`, login's destination function with role `"user"` is:

```text
sanitized returnUrl ?? "/"
```

Implementation must still **copy the existing `getPostLoginPath` algorithm locally** into the register page (same function body as login) and invoke it with the registered user's role `"user"`. Do not invent a different algorithm. Do not extract a shared helper in this task (would expand runtime scope). Do not modify `login/page.tsx`.

Client state that must be true after successful `register()` returns, before/with navigation (existing contract):

```text
AuthContext.setUser has been called with GET /users/me
isAuthenticated will be true after React commit
server session cookie already valid
GET /users/me succeeded
```

Same timing as login (`setUser` then `router.push` in the same turn). Do not add a new wait/flush mechanism.

---

## Exact Runtime File Scope

**Expected runtime files: 1**

1. `frontend/app/register/page.tsx`

| File | Modification required? | Why |
|------|------------------------|-----|
| `frontend/app/register/page.tsx` | **YES** | Bypass of AuthContext; false success UX; no post-auth navigation |
| `frontend/context/AuthContext.tsx` | **NO** | `register()` already hydrates; changing return type is unnecessary if destination uses known `user` role |
| `frontend/lib/returnUrl.ts` | **NO** | `sanitizeReturnUrl` is sufficient; no new helper |
| `frontend/app/login/page.tsx` | **NO** | Login contract reused by copy, not by edit |
| `frontend/services/authApi.ts` | **NO** | Payload and endpoint unchanged |
| `backend/app/routers/auth.py` | **NO** | Session-on-register already correct |

Inspected dependencies / contracts (unchanged):

```text
frontend/context/AuthContext.tsx
frontend/lib/returnUrl.ts
frontend/app/login/page.tsx
frontend/services/authApi.ts
backend/app/routers/auth.py
backend/app/services/auth_service.py
backend/app/services/session_service.py
```

Any fifth runtime file, AuthContext rewrite, or backend edit is **SCOPE EXPANSION → STOP**.

Task document (this file):

- `docs/engineering/tasks/TASK-018-align-registration-success-with-authenticated-session.md`

---

## Selected Implementation Option

**Option A — Register page only.**

Reuse unchanged: `useAuth().register`, `sanitizeReturnUrl`, login's `getPostLoginPath` algorithm (copied locally), `router.push`.

**Option B** (AuthContext return-`User` like `login`) is **not required**. Self-register role is always `user`; `register()` already hydrates. Wider auth blast radius without product gain.

**Option C** (new auth navigation service / route guards / session architecture) — **REJECT**.

---

## In Scope

1. Replace direct `registerUser` with `useAuth().register` so registration + `getCurrentUser` + `setUser` run once through the existing path.
2. Remove the post-success «sign in again» / «Go to login» primary flow (`isSuccess` branch).
3. After successful `register()`, `router.push(getPostLoginPath("user", sanitizeReturnUrl(...)))` using the login algorithm.
4. Keep the pre-submit «Already have an account? Sign in» link (form footer), including `returnUrl` via `buildLoginHref` if a sanitized returnUrl exists.
5. Preserve form fields, client validation, loading/disabled submit, error mapping, AuthField password visibility, accessibility (`role="alert"`, `aria-live`, `aria-busy`, labels).
6. Navigate **only** after `register()` resolves without throw.

---

## Out of Scope

| Item | Status |
|------|--------|
| `backend/app/routers/auth.py` / session / CSRF / cookies | OUT |
| Database / Alembic / user model | OUT |
| Registration payload / password policy / hashing | OUT |
| Password visibility implementation (`AuthField`) | OUT — preserve TASK-001 behavior |
| Email verification | OUT |
| Role assignment / realtor application / admin auth | OUT |
| Login page changes | OUT |
| Already-authenticated `/register` or `/login` auto-redirect | OUT |
| Suspended/blocked dedicated UX | OUT |
| OAuth / social login | OUT |
| Onboarding / celebratory screens | OUT |
| Documents, viewing requests, admin report queue | OUT |
| CORS, rate-limit configuration, Docker, nginx | OUT |
| Extracting `getPostLoginPath` to a shared module | OUT |
| AuthContext architecture rewrite | OUT |
| TASK-019 | OUT |
| Production deployment | OUT (separate gate) |

---

## Functional Freeze

| Contract | Owner | Change |
|----------|-------|--------|
| Fields: email, password, confirm password | register page | UNCHANGED |
| Client: email required; password required; min 6; passwords match | register page | UNCHANGED |
| Server: `UserCreate` email + password min 6 | backend | UNCHANGED |
| Duplicate email | backend 400 `Email already registered`; page maps `Request failed: 400` → «This email is already registered.» and surfaces API `Error.message` | UNCHANGED mapping |
| Other API / network / 429 | `getRegistrationErrorMessage` → «Registration failed. Please try again.» when message starts with `Request failed:` | UNCHANGED |
| Rate-limit config `RATE_LIMIT_REGISTER` | backend | UNCHANGED |
| Password visibility | `AuthField` | UNCHANGED |
| Default role `user` | User model | UNCHANGED |
| `POST /auth/register` + session + CSRF cookies | auth router | UNCHANGED |
| CSRF exempt register | csrf.py | UNCHANGED |
| Realtor note footer copy | register page | UNCHANGED |
| No navigation on validation or API failure | register page | MUST HOLD |

---

## Security Boundary

Unchanged and must not be edited:

- session implementation, lifetime, idle/absolute timeouts
- cookie flags (`httponly`, `secure`, `samesite`)
- CSRF generation / validation
- password hashing
- account_status
- CORS
- rate-limit configuration
- open-redirect protection (`sanitizeReturnUrl`)

TASK-018 must not introduce open redirects. Unsafe returnUrl → `null` → `/` for a newly registered `user`.

---

## Existing-Session Edge Case

An already-authenticated user opening `/register` is **OUT OF SCOPE**. Do not add register-page auth guards. If they submit a new email, existing backend duplicate/create rules apply.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Register page presentation + client submit path | CHANGED |
| AuthContext implementation | UNCHANGED (consumed) |
| returnUrl sanitizer | UNCHANGED (consumed) |
| Login page | UNCHANGED |
| Auth API client | UNCHANGED |
| Backend auth / session / CSRF | UNCHANGED |
| Database / migrations | UNCHANGED |
| Request / use-case lifecycle except post-success UX | UNCHANGED |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Register creates session + CSRF cookies | VERIFIED | `backend/app/routers/auth.py:63–72` |
| Self-register role is `user` | VERIFIED | `User.role` default; `UserCreate` has no role; `create_user` does not set role |
| AuthContext.register hydrates via getCurrentUser | VERIFIED | `AuthContext.tsx:72–80` |
| Register page calls registerUser directly | VERIFIED | `register/page.tsx:17, 79–84` |
| Success UX tells user to sign in | VERIFIED | `register/page.tsx:102–110` |
| Login destination algorithm | VERIFIED | `login/page.tsx:22–36, 64` |
| sanitizeReturnUrl blocks `//` and non-`/` | VERIFIED | `returnUrl.ts:1–13` |
| Register CSRF-exempt | VERIFIED | `csrf.py:11–18` |
| TASK-018 identifier free at definition | VERIFIED | `tasks/` only README; archive mentions are OUT/not-created |

---

## Proposed Change

In `frontend/app/register/page.tsx` only: use `useAuth().register` instead of `registerUser`; on success `router.push` using a local copy of login's `getPostLoginPath` with role `"user"` and the already-sanitized `returnUrl`; delete the success-screen «sign in again» branch. Keep validation, errors, visibility, and form chrome.

---

## Risks

| Risk | Level | Mitigation |
|------|-------|------------|
| Redirect / open-redirect regression | LOW | Reuse `sanitizeReturnUrl`; copy login destination algorithm; no new helper |
| Duplicate `POST /auth/register` | LOW | Single `register()` call; remove direct `registerUser` |
| Extra login after register | LOW | Do not call `login()` |
| AuthContext not hydrated | LOW | Use existing `register()`; do not call `registerUser` alone |
| Navigate before setUser | LOW | Same order as login: await register/login then push |
| Failure path navigates | LOW | push only after register() resolves |
| getCurrentUser fails after session created | LOW | Existing AuthContext throw; stay on page; no invented recovery |
| Destination diverges from login for `user` | LOW | Identical `getPostLoginPath` body |
| AuthContext blast radius | NONE | AuthContext not modified |

**Task implementation risk:** LOW. **Production risk:** LOW.

---

## Verification Plan

Definition-gate plan only. Execution is not authorized until an implementation gate.

Prefer local/mock or local backend. Do **not** mutate production. Disposable local accounts only. Do not commit credentials or mock residue.

### Static

```bash
cd frontend
npm run lint
npm run typecheck
npm run build
git diff --check
```

Diff: exactly `frontend/app/register/page.tsx` plus this task document. No backend, AuthContext, login, returnUrl, lockfile, or dependency changes.

### Case A — register without returnUrl

`/register` → valid new account → `register()` succeeds → no «sign in again» → `router.push("/")`.

### Case B — safe returnUrl

`/register?returnUrl=/favorites` (or another real internal path such as `/viewing-requests`) → after success → that path. Protected route renders without a second login (`isAuthenticated` true).

### Case C — unsafe returnUrl

Examples: `https://evil.example`, `//evil.example`, `javascript:...` → sanitizer `null` → destination `/`. No off-site navigation.

### Case D — failure

Duplicate email / validation / API error → remain on `/register`; error visible; `user` stays null; no redirect.

### Session persistence

After success, refresh: existing `restoreSession` recognizes the server session. Do not require a second login.

### Desktop / mobile

Register form remains usable at ~1280×900 and ~390×844. Do not restyle AuthShell.

---

## Test / Fixture Safety

Local verification may create a disposable local account. Production acceptance later must **not** silently register a permanent production user unless a later gate explicitly authorizes it. Call that out at deployment/acceptance planning; do not perform it in implementation.

---

## Deployment Classification

Expected when a later deploy gate is authorized: **FRONTEND_ONLY**.

| Component | Expected |
|-----------|----------|
| Runtime scope | FRONTEND_ONLY |
| Backend | NO |
| Database | NO |
| Migration | NONE |
| API contract | NO |
| Auth server contract | NO |
| Docker / Compose | NO |
| Nginx | NO |
| Dependencies | NO |

If implementation requires backend mutation → **STOP** and reconsider scope.

---

## Rollback Impact

**Database rollback:** NOT REQUIRED.

**Application rollback:** revert the register-page change; users again see «sign in again» after register. Existing sessions/accounts unaffected.

---

## Acceptance Criteria

1. Successful registration continues using existing `POST /auth/register`.
2. Registration payload remains `{ email, password }` only.
3. Backend session/CSRF contract remains unchanged.
4. Successful registration hydrates client AuthContext via existing `register()`.
5. `setUser` from `getCurrentUser()` has run before/with authenticated navigation, matching login timing.
6. User is not instructed to sign in again after successful registration.
7. «Go to login» is not the primary post-success path.
8. Registration without returnUrl navigates to `/` (login default for `user`).
9. Safe internal returnUrl is the post-success destination.
10. Unsafe/external returnUrl is rejected by existing `sanitizeReturnUrl`.
11. No new open-redirect behavior.
12. No duplicate registration request.
13. No `login()` / redundant login request after registration.
14. Registration failure remains on `/register`.
15. Duplicate-email error behavior remains intact.
16. Client validation behavior remains intact.
17. Rate-limit / generic API failure mapping remains intact.
18. Loading / disabled submit (`aria-busy`) remains intact.
19. Password visibility (`AuthField`) remains intact.
20. Existing accessibility semantics remain intact (`role="alert"`, `aria-live`, labels).
21. Default registration role remains `user`.
22. Realtor application flow remains unchanged.
23. Login page and login flow remain unchanged.
24. AuthContext architecture is not rewritten.
25. Backend code unchanged.
26. Database unchanged.
27. No migration.
28. API contract unchanged.
29. No dependency changes.
30. Safe returnUrl behavior matches login semantics (`sanitizeReturnUrl` + `getPostLoginPath`).
31. Browser refresh after successful registration recognizes the existing server session.
32. Protected authenticated navigation does not require a manual second login.
33. No console errors attributable to TASK-018.
34. No hydration errors attributable to TASK-018.
35. Mobile register form remains usable.
36. Desktop register form remains usable.
37. `npm run lint` PASS.
38. `npm run typecheck` PASS.
39. `npm run build` PASS.
40. `git diff --check` PASS.
41. No production mutation during implementation verification.
42. Scope remains the single authorized runtime file.
43. No credentials / test-account secrets committed.
44. No local test/mock residue committed.
45. Deployment classification remains FRONTEND_ONLY.

---

## Non-Goals

- Auth architecture migration
- Shared redirect-helper extraction
- Login/register authenticated-user guards
- Email verification
- Role picker
- Onboarding
- TASK-019

---

## Mutation Prohibitions (definition gate)

This definition gate modified no runtime code. The subsequent implementation gate modified exactly one runtime file. Commit, push, deploy, production access, AuthContext/backend edits, and TASK-019 creation remain unauthorized.

---

## Implementation & Local Verification Evidence

**Gate:** implementation + local verification, 2026-08-20. No commit, no push, no deploy, no production access.

### Baseline at implementation start (VERIFIED)

| Field | Value |
|-------|-------|
| HEAD | `8f4575bb8f9cbafdb8ec2b5220480a5c7c580682` |
| origin/main | `8f4575bb8f9cbafdb8ec2b5220480a5c7c580682` |
| divergence | `0 0` |
| Worktree | `?? docs/engineering/tasks/TASK-018-align-registration-success-with-authenticated-session.md` only |

### Contract reconfirmation (VERIFIED)

| Claim | Source |
|-------|--------|
| Register page called `registerUser` directly and set `isSuccess` | `register/page.tsx` before change |
| `AuthContext.register` = `registerUser` → `getCurrentUser` → `setUser`, returns `Promise<void>` | `AuthContext.tsx:72–81`, type at `:24` |
| Login uses `sanitizeReturnUrl` + local `getPostLoginPath` + `router.push` | `login/page.tsx:18, 22–36, 41, 64` |
| `getPostLoginPath` is not exported from login | `login/page.tsx:22` |
| Current-user endpoint is `GET /users/me` | `authApi.ts:76–78` |

### Exact runtime change — `frontend/app/register/page.tsx` (1 file, +91 / −85)

1. Import `useRouter` alongside `useSearchParams`; import `useAuth` from `@/context/AuthContext`; drop the `registerUser` import from `@/services/authApi`; drop the now-unused `authSuccessClassName` import.
2. Add `SELF_REGISTRATION_ROLE = "user"` (backend assigns `user` on self-registration; `UserCreate` has no role field).
3. Add `getPostLoginPath(role, returnUrl)` as a byte-identical copy of login's local function body (returnUrl → returnUrl; `admin` → `/admin`; `realtor` → `/realtor`; else `/`). No shared-helper extraction (would expand runtime scope); `login/page.tsx` untouched.
4. `RegisterForm`: add `const router = useRouter()` and `const { register } = useAuth()`; remove `isSuccess` state.
5. `handleSubmit`: `await registerUser({...})` → `await register({...})`; `setIsSuccess(true)` → `router.push(getPostLoginPath(SELF_REGISTRATION_ROLE, returnUrl))`. Validation guards, `try/catch/finally`, `getRegistrationErrorMessage`, and `setIsLoading` unchanged.
6. Remove the `isSuccess` success branch («Account created. You can now sign in.» + «Go to login» CTA) and unwrap the form/footer fragment. Form markup, field ids, `AuthField` usage, `role="alert"` / `aria-live` / `aria-busy`, labels, copy, and the pre-submit «Already have an account? Sign in» link (still `buildLoginHref(returnUrl)` aware) are unchanged.

### Runtime scope (VERIFIED)

```text
frontend/app/register/page.tsx changed: YES
frontend/context/AuthContext.tsx changed: NO
frontend/lib/returnUrl.ts changed: NO
frontend/services/authApi.ts changed: NO
frontend/app/login/page.tsx changed: NO
backend/ changed: NO
```

`git diff --stat` for the protected paths returns empty output.

### Local verification environment

| Item | Value |
|------|-------|
| Backend | local `uvicorn app.main:app` on `:8099`, `DATABASE_URL=sqlite:///./local_test.db` |
| Frontend | `next dev` on `localhost:3000`, `NEXT_PUBLIC_API_URL=http://localhost:8099` |
| Production | NOT ACCESSED |
| Accounts | disposable local sqlite accounts (`t018-*@example.com`), not committed |

Environment findings (not defects, recorded for reproducibility):

- Browsing `localhost:3000` against `127.0.0.1:8099` is cross-site, so `SameSite=Lax` session cookies are not delivered and `GET /users/me` returns 401. Frontend and API must share the same host locally.
- `next dev` blocks cross-origin dev resources from `127.0.0.1` (`allowedDevOrigins` not configured), so the page never hydrates on that origin. Verification therefore used `localhost` for both frontend and API.

### Case A — no returnUrl (VERIFIED)

`/register` → new account → submit.

| Observation | Result |
|-------------|--------|
| `POST /auth/register` | 1 |
| `GET /users/me` | 2 total = 1 AuthProvider bootstrap + 1 from `AuthContext.register` |
| `POST /auth/login` | 0 |
| «sign in again» / «Go to login» present | NO |
| Destination | `/` |
| AuthContext hydrated | YES — header renders `Logout`; authenticated-only `GET /favorites/` fires |
| Submit loading state | `Creating account...`, `disabled`, `aria-busy` observed during request |
| console errors / unhandled rejections | 0 / 0 |

Refresh of `/` afterwards: `Logout` still rendered, single `GET /users/me` from `restoreSession`, no manual login. Server session recognized.

### Case B — safe returnUrl (VERIFIED)

`/register?returnUrl=%2Ffavorites` → new account → submit.

| Observation | Result |
|-------------|--------|
| Destination | `/favorites` |
| `POST /auth/register` | 1 |
| `POST /auth/login` | 0 |
| Error shown | none |
| Auth boundary | authenticated Favorites view rendered (no redirect to `/login`) |

### Case C — unsafe returnUrl (VERIFIED)

`/register?returnUrl=https%3A%2F%2Fexample.com` → new account → submit.

| Observation | Result |
|-------------|--------|
| Destination | `/` (fallback) |
| Origin after navigation | `http://localhost:3000` — no off-site navigation |
| `POST /auth/register` | 1 |
| `POST /auth/login` | 0 |
| AuthContext hydrated | YES (`Logout` rendered) |

`sanitizeReturnUrl` (unchanged) rejects both non-`/` values (`https://…`) and protocol-relative `//…` at `returnUrl.ts:8`. Open-redirect protection not weakened.

### Case D — failure paths (VERIFIED)

Duplicate email (`t018-a-3@example.com`, already registered):

| Observation | Result |
|-------------|--------|
| Path after failure | `/register` |
| Error text | `Email already registered` (backend `detail` surfaced through the unchanged `getRegistrationErrorMessage` / `authFetch` mapping) |
| `POST /auth/register` | 1 |
| `GET /users/me` | 1 (bootstrap only — no hydration) |
| `POST /auth/login` | 0 |
| AuthContext falsely hydrated | NO |
| Submit re-enabled after failure | YES |

Rate limit (repeated submits until `RATE_LIMIT_REGISTER` tripped): error text `Too many requests. Please try again later.`, still on `/register`, 0 login requests, no navigation.

Auth-hydration failure after successful registration was also observed directly during the cross-site environment stage: `AuthContext.register` rejected because `GET /users/me` returned 401; the page stayed on `/register`, rendered the existing error (`Session expired or invalid`), performed no navigation and no login request. Existing `AuthContext` rejection behavior preserved; no custom recovery added.

### Client validation freeze (VERIFIED)

Short password → «Password must be at least 6 characters.»; mismatched confirm → «Passwords do not match.»; `POST /auth/register` requests added during validation failures: **0**; path stayed `/register`.

### Password visibility regression — TASK-001 (VERIFIED)

Both toggles flip `type` `password` → `text` → `password`, `aria-label` flips `Show password` / `Hide password`, and both field values are preserved across toggling. `AuthField` not modified.

### Desktop / mobile (VERIFIED)

| Viewport | Result |
|----------|--------|
| 1280×900 | `scrollWidth` 1280, no horizontal overflow, card centred at 460px max width, heading `Create account`, 3 inputs, submit 48px tall |
| 390×844 | `scrollWidth` 390, no horizontal overflow, all three fields 37→353px inside viewport, both password toggles 36×36 at 313→349px, submit 48px tall |

No AuthShell or AuthField restyling. Visual structure unchanged.

### Console / network health (VERIFIED)

| Check | Result |
|-------|--------|
| Successful flow `POST /auth/register` | 1 |
| Successful flow current-user hydration (`GET /users/me`) | 1 (plus the pre-existing bootstrap call) |
| Successful flow `POST /auth/login` | 0 |
| `console.error` during full successful flow | 0 |
| Unhandled rejections | 0 |
| Hydration errors on clean loads of `/register` and `/login` | 0 |
| Failed requests attributable to TASK-018 | 0 |

A `react-hydration-error` overlay pointing at the untouched server component `components/RentoBrandMark.tsx` appeared only after the harness mutated input values through the native `HTMLInputElement.value` setter. It did not reproduce on clean loads of either `/register` or `/login`. Classified as a verification-harness artifact, NOT attributable to TASK-018.

### Static verification (VERIFIED)

| Command | Result |
|---------|--------|
| `npm run lint` | PASS — 0 errors, 4 pre-existing `@next/next/no-img-element` warnings in `apple-icon.tsx`, `icon.tsx`, `opengraph-image.tsx`, `RentoLogo.tsx` (unrelated to TASK-018) |
| `npm run typecheck` | PASS |
| `npm run build` | PASS — compiled, TypeScript OK, 23 static pages generated, `/register` still static |
| `git diff --check` | PASS |

### Diff scope (VERIFIED)

```text
 M frontend/app/register/page.tsx
?? docs/engineering/tasks/TASK-018-align-registration-success-with-authenticated-session.md
```

Runtime files changed: 1. No unexpected files, deletions, dependency, lockfile, migration, secret, or debug-artifact changes.

### Limitations

- Verified against a local sqlite backend and `next dev`, not a production-parity build or production data.
- Screenshot capture does not honour CDP viewport emulation in this browser view, so desktop/mobile evidence is numeric geometry (viewport width, `scrollWidth`, element rects) plus a native-width screenshot rather than emulated screenshots.
- `RATE_LIMIT_REGISTER` behaviour was exercised locally with `memory://` storage; production rate-limit configuration was not touched or tested.
- Local verification created disposable accounts in `backend/local_test.db` (untracked). Production acceptance must not silently create a permanent production user without an explicit later gate.
- No production access, commit, push, or deployment was performed in this gate.

---

## Commit and Push Evidence

| Field | Value |
|-------|-------|
| Commit | `f4384f3fa0d71da95e295a424a0c07a910738c3b` |
| Message | `fix(auth): align registration with authenticated session` |
| Parent | `8f4575bb8f9cbafdb8ec2b5220480a5c7c580682` |
| Scope | 2 files — 1 runtime, 1 task document |
| Whitespace | `git diff HEAD^ HEAD --check` PASS |
| Push | `8f4575b..f4384f3  main -> main`, fast-forward, no force, no tags |
| Post-push | HEAD == `origin/main` == `f4384f3…`, divergence `0 0`, worktree clean |

Committed runtime scope: exactly the one authorized register page file. `LOCAL getPostLoginPath DUPLICATION` classified as **ACCEPTED BOUNDED IMPLEMENTATION** at commit review.

---

## Production Deployment Evidence

**Deployment class:** FRONTEND_ONLY. Deployed 2026-08-20 (UTC) from the exact implementation SHA.

| Component | Result |
|-----------|--------|
| backend deployed | NO |
| database mutated at deploy | NO |
| migration executed | NONE |
| nginx changed | NO |
| dependencies changed | NO |
| auth server contract changed | NO |
| API contract changed | NO |

| Field | Value |
|-------|-------|
| Implementation SHA | `f4384f3fa0d71da95e295a424a0c07a910738c3b` |
| Production Git HEAD | `f4384f3fa0d71da95e295a424a0c07a910738c3b` (detached), worktree clean — **VERIFIED** |
| Previous application SHA | `52f5a4a410e4518f4d76b6312a83d9828855dd5b` (TASK-017) — **INFERRED** |
| CURRENT_APP_SHA | `f4384f3fa0d71da95e295a424a0c07a910738c3b` — **INFERRED** |
| Frontend container before | `65e5f1cc51e07bca7e61b179fbf3042f9eb2f1ba1263a91e93181df29e21f9fe` |
| Frontend image before | `sha256:84fe7eddaa4f52d47243bde2a0e5575edf9222b98194c1dcb1d110a92af6e4d8` |
| Frontend container after | `468f6277d697bbd676bca2d28a7234ef5538003279557e99bd3fa760e8525b8d` |
| Frontend image after | `sha256:b2d6969626c3edad324472a0178b235496df4ea20dbfcb8b4a6e39a060567428` |
| StartedAt | `2026-08-20T20:09:19.922039335Z` |
| RestartCount | `0` |
| Health | healthy |
| Backend | UNCHANGED — `1f63695435605ae683b694c6f73fed58c3d72ba298ac97fb5a75e905532b02da`, `sha256:78b4b60bbb4b71d20226b90f8f485577163e827e599c2fedd59a1c3cd5e12bfd`, StartedAt `2026-08-17T09:54:28.171472284Z` |
| DB | UNCHANGED — `c682d3268990049d941f2f5ccb4b7909d43f2e9057701217442148807e2a3b77`, StartedAt `2026-07-29T11:33:03.086550421Z` |
| Nginx | UNCHANGED — `cf97dbc1786d05955ba75c4e9597e428f8871ebf06e52b58ea7f5642c9a6ae68`, StartedAt `2026-08-09T21:48:15.711102691Z` |

**Application identity classification — INFERRED, not VERIFIED:** Docker image labels contain only Compose metadata; no immutable Git SHA label exists.

Deployment steps: rollback preservation via `scripts/ops/rento-preserve-rollback-images.sh 52f5a4a…`, detached checkout of `f4384f3…`, `docker compose build frontend` only, `docker compose up -d --no-deps frontend` only. Runtime delta vs TASK-017: `frontend/app/register/page.tsx` only. Unauthenticated HTTP smoke after deploy: `/`, `/register`, `/login`, `/api/` all 200.

**Gate:** `TASK_018_DEPLOYMENT_PASS` → `READY_FOR_TASK_018_PRODUCTION_ACCEPTANCE`.

---

## Rollback Evidence

| Field | Value |
|-------|-------|
| Immediate frontend rollback tag | `rento-frontend:rollback-52f5a4a` |
| Points to | `sha256:84fe7eddaa4f52d47243bde2a0e5575edf9222b98194c1dcb1d110a92af6e4d8` |
| Backend rollback tag | `rento-backend:rollback-52f5a4a` → `sha256:78b4b60bbb4b71d20226b90f8f485577163e827e599c2fedd59a1c3cd5e12bfd` |
| Verified | before build, after build, after recreate, after production acceptance, and during reconciliation gate (2026-08-22) |
| Historical rollback tags | `rollback-e19e78f`, `rollback-264e478`, `rollback-0139d67` — intact |

**Rollback was NOT executed.** Database rollback is NOT REQUIRED.

---

## Production Acceptance Evidence

**Result:** `TASK_018_PRODUCTION_ACCEPTANCE_PASS` (evidence reconciliation completed 2026-08-22).

**Authorized production mutation:** exactly one successful self-registration for a dedicated TASK-018 acceptance account. Credentials were not recorded in this document. Cleanup: **NOT PERFORMED**.

### Principal production E2E — no returnUrl (2026-08-20 acceptance gate session)

Observations below from the original production acceptance gate session unless marked as reconciliation reconfirmation. Durable network HAR was not archived; reconciliation gate reconfirmed account/session/runtime read-only without re-executing registration.

| Observation | Classification |
|-------------|----------------|
| Exactly one successful production registration | **PRODUCTION VERIFIED** — dedicated TASK-018 acceptance account exists; read-only count = 1 (reconciliation gate) |
| Registration endpoint | `POST https://rentonow.ro/api/auth/register` — **PRODUCTION VERIFIED** (acceptance session) |
| Registration POST count | 1 — **PRODUCTION VERIFIED** (acceptance session) |
| Registration response | HTTP 201 — **PRODUCTION VERIFIED** (acceptance session) |
| Server auth session created | **PRODUCTION VERIFIED** — read-only `auth_sessions` row count = 1 for acceptance account (reconciliation gate) |
| Post-registration current-user hydration | `GET https://rentonow.ro/api/users/me` after register — **PRODUCTION VERIFIED** (acceptance session); bootstrap `/users/me` may precede separately |
| Login POST count after registration | 0 — **PRODUCTION VERIFIED** (acceptance session) |
| Obsolete success copy («Account created. You can now sign in.») | not observed — **PRODUCTION VERIFIED** (acceptance session) |
| «Go to login» required step | not observed — **PRODUCTION VERIFIED** (acceptance session) |
| Navigation destination (no returnUrl) | `/` — **PRODUCTION VERIFIED** (acceptance session); matches `getPostLoginPath("user", null)` |
| Login page navigation after success | none — **PRODUCTION VERIFIED** (acceptance session) |
| Authenticated UI (`Logout` visible) | **PRODUCTION VERIFIED** (acceptance session) |
| Refresh session persistence | authenticated UI restored — **PRODUCTION VERIFIED** (acceptance session) |
| Protected route `/favorites` after refresh | loaded without login redirect — **PRODUCTION VERIFIED** (acceptance session) |
| Manual second login required | NO — **PRODUCTION VERIFIED** (acceptance session) |
| Account role | `user` — **PRODUCTION VERIFIED** (read-only DB, reconciliation gate) |
| Account status | `active` — **PRODUCTION VERIFIED** (read-only DB, reconciliation gate) |

### Pre-registration UI — desktop (~1280 × 900) — acceptance session

Form structure unchanged: email, password, confirm password, password visibility toggles, submit control. No obsolete success UI before submit. No horizontal overflow observed. No console/hydration errors on clean load.

### Desktop success transition — acceptance session

Direct transition to authenticated destination observed; no obsolete success screen flash observed; no login screen flash observed.

### Mobile regression (~390 × 844) — reconciliation gate (2026-08-22)

| Check | Result |
|-------|--------|
| `/register` loads | YES — form fields, toggles, submit present |
| Horizontal overflow | `scrollWidth = clientWidth = 390` — **PRODUCTION VERIFIED** |
| Client validation (password mismatch) | exercised without API request — **PRODUCTION VERIFIED** |
| Successful mobile registration | **NOT REPEATED** — expected |

### Safe returnUrl — `/register?returnUrl=%2Ffavorites`

| Classification | Result |
|----------------|--------|
| Page loads in unauthenticated context | **PRODUCTION VERIFIED** (reconciliation gate) |
| `sanitizeReturnUrl("/favorites")` → `"/favorites"` | **LOCAL VERIFIED** + **STATIC/DEPLOYED CONTRACT VERIFIED** (`frontend/lib/returnUrl.ts`) |
| Full production E2E with second account | **NOT RE-EXECUTED AS SECOND PRODUCTION REGISTRATION** |

### Unsafe returnUrl

| Input | Contract |
|-------|----------|
| `https://example.com`, `//example.com`, `javascript:...` | `sanitizeReturnUrl` → `null`; fallback internal default — **LOCAL VERIFIED** + **STATIC/DEPLOYED CONTRACT VERIFIED** |
| Production E2E with second account | **NOT RE-EXECUTED AS SECOND PRODUCTION REGISTRATION** |
| Open redirect introduced | NO according to deployed contract |

### Error branches

| Branch | Classification |
|--------|----------------|
| Duplicate email | **LOCAL VERIFIED** + **STATIC CONTRACT VERIFIED** — **NOT DIRECTLY RE-EXECUTED IN PRODUCTION** |
| Rate limit | **LOCAL VERIFIED** + **STATIC CONTRACT VERIFIED** — **NOT DIRECTLY RE-EXECUTED IN PRODUCTION** |
| Hydration failure after register | **LOCAL VERIFIED** + **STATIC CONTRACT VERIFIED** — **NOT FORCED IN PRODUCTION** |
| Client-side validation | **LOCAL VERIFIED** + **PRODUCTION VERIFIED** (mobile mismatch test, reconciliation gate) — zero registration POST |

### Console / network health

| Check | Result |
|-------|--------|
| Uncaught JS errors during acceptance flow | 0 observed — **PRODUCTION VERIFIED** (acceptance session) |
| Unhandled rejections | 0 observed |
| Hydration errors on clean `/register` load | 0 observed |
| Failed JS/CSS chunks | 0 observed |
| TASK-018-attributable `console.error` | 0 observed |
| Relevant 5xx during acceptance | 0 observed |
| Expected auth bootstrap 401 before login | not classified as regression |

### Post-acceptance runtime health — reconciliation gate (2026-08-22)

| Component | Result |
|-----------|--------|
| PRODUCTION_GIT_HEAD | `f4384f3fa0d71da95e295a424a0c07a910738c3b`, worktree clean — **VERIFIED** |
| Frontend container | `468f6277d697bbd676bca2d28a7234ef5538003279557e99bd3fa760e8525b8d` — unchanged |
| Frontend image | `sha256:b2d6969626c3edad324472a0178b235496df4ea20dbfcb8b4a6e39a060567428` — unchanged |
| RestartCount | 0 |
| Health | healthy |
| Backend / DB / Nginx | unchanged and healthy |
| HTTP `/`, `/register`, `/login`, `/api/` | all 200 |
| Frontend/backend fatal logs attributable to TASK-018 | none observed in recent log tail |

```text
CURRENT_APP_SHA: f4384f3fa0d71da95e295a424a0c07a910738c3b — INFERRED
```

---

## Production Data Mutation Statement (acceptance)

```text
production account created: YES — exactly 1 dedicated TASK-018 acceptance account
additional accounts created: NO
account role modified: NO
account status modified: NO
favorites created: NO
viewing requests created: NO
properties created: NO
documents created: NO
database modified manually: NO
acceptance fixture deleted: NO
other business data modified: NO
TASK-018 acceptance fixture cleanup: NOT PERFORMED
```

---

## Accepted Observability Limitations

| # | Branch | Supporting evidence |
|---|--------|---------------------|
| 1 | Safe returnUrl success E2E (`/register?returnUrl=/favorites` → `/favorites`) | LOCAL VERIFIED + STATIC/DEPLOYED CONTRACT VERIFIED; **NOT RE-EXECUTED AS SECOND PRODUCTION REGISTRATION** |
| 2 | Unsafe returnUrl success E2E (off-site navigation attempt) | LOCAL VERIFIED + STATIC/DEPLOYED CONTRACT VERIFIED; **NOT RE-EXECUTED AS SECOND PRODUCTION REGISTRATION** |
| 3 | Duplicate-email production error path | LOCAL VERIFIED + STATIC CONTRACT VERIFIED |
| 4 | Rate-limit production error path | LOCAL VERIFIED + STATIC CONTRACT VERIFIED |
| 5 | Forced hydration-failure production path | LOCAL VERIFIED + STATIC CONTRACT VERIFIED |
| 6 | Durable archived network HAR for the single registration trace | **NOT ARCHIVED** — acceptance session observations reconstructed; read-only DB/session/runtime reconfirmation performed during reconciliation gate |
| 7 | Second successful mobile registration E2E | **NOT REPEATED** — mobile layout/client validation only |

---

## Closure

### Product Result

**Before:** `POST /auth/register` already established a server-side authenticated session, but the register page bypassed `AuthContext.register()`, left client auth state unsynchronized, and required the user to sign in again.

**After:** the register page uses the existing `AuthContext.register()` path, hydrates the registered user, and navigates directly to the sanitized authenticated destination without a redundant login step.

**Runtime scope at closure:** exactly one file — `frontend/app/register/page.tsx`.

**Implementation SHA:** `f4384f3fa0d71da95e295a424a0c07a910738c3b`.

**Deployment:** FRONTEND_ONLY — `TASK_018_DEPLOYMENT_PASS`.

**Production acceptance:** `TASK_018_PRODUCTION_ACCEPTANCE_PASS` — exactly one dedicated acceptance account created under explicit authorization; cleanup **NOT PERFORMED**.

```text
LOCAL getPostLoginPath DUPLICATION:
ACCEPTED BOUNDED IMPLEMENTATION
```

Reason: TASK-018 authorized exactly one runtime file; extracting a shared helper would widen scope; behavior matches login; refactor not required for the defect.

**CURRENT_APP_SHA:** `f4384f3fa0d71da95e295a424a0c07a910738c3b` — **INFERRED** (not upgraded to VERIFIED — frontend image lacks immutable Git SHA label).

**Rollback readiness:** `rento-frontend:rollback-52f5a4a` → `sha256:84fe7eddaa4f52d47243bde2a0e5575edf9222b98194c1dcb1d110a92af6e4d8`; `rento-backend:rollback-52f5a4a` → `sha256:78b4b60bbb4b71d20226b90f8f485577163e827e599c2fedd59a1c3cd5e12bfd`. Backend, DB, and nginx unchanged. Rollback **NOT executed**.

**Closure rationale:** implementation complete; local verification passed; commit and push complete; rollback preserved; frontend-only production deployment passed; production acceptance passed with honestly recorded observability limitations; no blocking defects; authorized production mutation limited to exactly one acceptance account; no cleanup performed.

**Final gate state:**

```text
DEFINED
→ IMPLEMENTED
→ LOCALLY VERIFIED
→ COMMIT REVIEWED
→ COMMITTED
→ PUSHED
→ DEPLOYMENT PREFLIGHT PASS
→ ROLLBACK PRESERVATION PASS
→ DEPLOYED
→ PRODUCTION ACCEPTED
→ CLOSED
```

```text
TASK-018 = CLOSED
Archive: NO / NOT YET
```

```text
TASK_018_CLOSURE_COMMIT_CREATED
Next:
READY_FOR_TASK_018_CLOSURE_PUSH_AUTHORIZATION
```

Superseded: `TASK_018_PRODUCTION_ACCEPTANCE_PASS`, `READY_FOR_TASK_018_CLOSURE`.
