# TASK-018 — Align Registration Success With Authenticated Session

| Field | Value |
|-------|-------|
| ID | TASK-018 |
| TITLE | Align Registration Success With Authenticated Session |
| STATUS | VERIFYING |
| RISK | LOW |
| CLASSIFICATION | Frontend auth UX alignment / registration success vs existing session |

> **IMPLEMENTATION COMPLETE AND LOCALLY VERIFIED. NOT COMMITTED.** Staging, commit, push, deploy, and production access require separate gates.

**Lifecycle (updated 2026-08-20, implementation gate):**

| Stage | State |
|-------|-------|
| Next-increment discovery | COMPLETE — `NEXT_INCREMENT_DISCOVERY_COMPLETE` |
| Definition | COMPLETE — this document |
| Implementation | COMPLETE — `frontend/app/register/page.tsx` (uncommitted) |
| Local Verification | COMPLETE — see "Implementation & Local Verification Evidence" |
| Commit | NOT AUTHORIZED |
| Push | NOT AUTHORIZED |
| Deployment | NOT AUTHORIZED |
| Production Acceptance | NOT AUTHORIZED |

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

**Production note:** Production application remains `52f5a4a410e4518f4d76b6312a83d9828855dd5b` (TASK-017 implementation). Repository HEAD is ahead only by TASK-017 closure/archive documentation commits. This is **not** production drift.

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

## Gate Decision

```text
TASK_018_IMPLEMENTATION_VERIFIED
Next:
READY_FOR_TASK_018_COMMIT_REVIEW
```

Superseded: `TASK_018_DEFINITION_COMPLETE` (definition gate, 2026-08-20).
