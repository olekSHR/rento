# TASK-001 — Password visibility toggle

| Field | Value |
|-------|-------|
| ID | TASK-001 |
| TITLE | Password visibility toggle |
| STATUS | READY_TO_DEPLOY |
| RISK | LOW |

> STATUS: DISCOVERY means application code must not be modified. This task completed discovery and is ready for a separate IMPLEMENTATION authorization.

---

## Problem

Password inputs currently hide entered characters and do not provide an explicit user-controlled way to temporarily reveal them.

This makes password entry harder to verify, especially on mobile or when entering long passwords.

---

## Current Behavior

All password inputs render as standard `<input type="password">` fields with no visibility control.

| Purpose | Page / component | Fields | Current implementation |
|---------|------------------|--------|------------------------|
| Login | `frontend/app/login/page.tsx` → `AuthField` | 1 (`password`) | Controlled input; `type="password"` fixed via prop |
| Registration | `frontend/app/register/page.tsx` → `AuthField` | 2 (`password`, `confirmPassword`) | Same pattern; client-side match validation |
| Reset password | `frontend/app/reset-password/page.tsx` → `AuthField` | 2 (`password`, `confirmPassword`) | Same pattern; token from URL + client validation |
| Forgot password | `frontend/app/forgot-password/page.tsx` | 0 | Email only — no password field |

**Total in-scope password inputs:** 5 across 3 pages.

**Shared component:** all password fields use `frontend/components/auth/AuthField.tsx`.

**Reusable UI assets (VERIFIED):**

| Asset | Status | Evidence |
|-------|--------|----------|
| Shared auth input component | Present — `AuthField` | `frontend/components/auth/AuthField.tsx` |
| Auth styling tokens | Present — `AuthShell` exports `authInputClassName`, etc. | `frontend/components/auth/AuthShell.tsx` |
| Icon library | Present — `lucide-react` `^1.16.0` | `frontend/package.json`; used across app |
| Eye / EyeOff icon usage | Absent | No `Eye` / `EyeOff` imports in project source |
| Generic shared `Input` UI primitive | Absent | No `components/ui/*Input*` |

**Evidence labels:** field inventory VERIFIED via repository search (`type="password"`); no admin/change-password/profile password forms found.

---

## Target Behavior

A user can explicitly toggle each password input between:

```text
type="password"   (hidden)
type="text"       (visible)
```

without changing:

- password value;
- validation;
- form submission;
- authentication behavior;
- backend contract.

This is a presentation/accessibility UX change only.

---

## In Scope

Add a modern password visibility toggle to **every existing auth password field**:

1. Login — `login-password`
2. Register — `register-password`, `register-confirm-password`
3. Reset password — `reset-password-new`, `reset-password-confirm`

Implementation boundary (see Proposed Change): extend `AuthField` when `type="password"`.

---

## Out of Scope

```text
backend authentication
session handling
CSRF
password hashing
password policy
API contracts
database
password reset business logic
new icon dependency (lucide-react already present)
unrelated auth UI redesign
forgot-password page (no password input)
admin / realtor / profile password-change flows (none exist today)
analytics, logging, persistence, URL state, localStorage, sessionStorage for visibility
```

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend / Client | YES — bounded UI in auth password fields |
| API / Transport | NONE |
| Authentication logic | NONE |
| Authorization | NONE |
| Business logic | NONE |
| Data access / Database | NONE |
| Infrastructure / Production | NONE |

Reference map alignment: Frontend / Client only.

---

## Request / use-case lifecycle

```text
User enters password
    ↓
frontend password input state (unchanged controlled value)
    ↓
visibility toggle affects input type rendering only (password ↔ text)
    ↓
existing form submit handler
    ↓
existing auth API call (login / register / reset-password)
    ↓
backend auth unchanged
```

| Impact | Result | Evidence |
|--------|--------|----------|
| DATA IMPACT | NONE | Toggle is local UI state only |
| AUTHENTICATION LOGIC IMPACT | NONE | No backend or auth service changes |
| AUTHORIZATION IMPACT | NONE | Pre-auth public forms only |
| API CONTRACT IMPACT | NONE | Same payloads (`password`, `new_password`) |
| DATABASE IMPACT | NONE | No schema or persistence |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| 5 password inputs, 3 pages, all via `AuthField` | VERIFIED | `login/page.tsx`, `register/page.tsx`, `reset-password/page.tsx`, grep `type="password"` |
| No other password inputs in frontend source | VERIFIED | Repository search excluding `node_modules` |
| `lucide-react` already installed | VERIFIED | `frontend/package.json` |
| No Eye/EyeOff usage yet | VERIFIED | Import search |
| Auth uses session cookie + CSRF (unchanged by this task) | VERIFIED | `PROJECT_BASELINE.md`, `session_service.py` |
| Frontend verification scripts | VERIFIED | `npm run lint`, `npm run typecheck`, `npm run build` in `package.json` |

---

## UX / accessibility requirements (implementation must follow)

### Explicit control
Button/control associated with each password field.

### No value mutation
Toggle must not clear, replace, or alter form state; must not submit the form.

### Button semantics
```text
type="button"
```

### Accessible name
Meaningful label reflecting current state:

```text
Show password
Hide password
```

Do not rely on icon alone.

### State semantics
Use `aria-pressed={isVisible}` on the toggle button — matches toggle-button pattern and existing focusable control style in auth forms. Icon remains decorative (`aria-hidden="true"`).

### Keyboard
Toggle reachable via Tab; activatable via Enter/Space.

### Focus
Toggle must not move focus away from input unless user explicitly focuses the button; toggling while focused in input should preserve input focus.

### Visual placement
Trailing control inside field wrapper; input gains right padding so text does not overlap icon; preserve mobile touch target (min ~44px height already on inputs).

### Browser / password-manager compatibility
Preserve existing on each field:

```text
name
id
autoComplete
value
onChange
required
aria-invalid / aria-describedby
```

Do not add/remove autocomplete attributes.

### Security interpretation
Visibility toggle does **not** weaken password storage or authentication security.

Shoulder-surfing risk while visible is accepted tradeoff for user-initiated, reversible, local UI state only.

No logging, persistence, analytics, URL, `localStorage`, or `sessionStorage` for visibility state.

### Multi-field forms
Register and reset-password: **independent visibility state per field** (each `AuthField` instance owns its own toggle state).

---

## Proposed Change

**Decision: Option C — extend existing shared `AuthField` component.**

| Option | Assessment |
|--------|------------|
| A. Local state per page | Rejected — duplicates toggle UI/logic across 3 pages / 5 fields |
| B. New `PasswordInput` wrapper | Rejected — extra abstraction; all fields already use `AuthField` |
| C. Extend `AuthField` for `type="password"` | **Selected** — single bounded change covers all 5 fields; matches current auth-field pattern |
| D. Other | Not justified |

**Expected files to change:**

| File | Change |
|------|--------|
| `frontend/components/auth/AuthField.tsx` | Add `"use client"`; local `isVisible` state when `type="password"`; wrapper with toggle button; switch input `type` between `password` / `text` |
| `frontend/components/auth/AuthShell.tsx` | Optional: export wrapper/toggle padding class constants (e.g. relative container, `pr-11` on input) |

**Expected unchanged:**

```text
frontend/app/login/page.tsx          (behavior preserved via AuthField)
frontend/app/register/page.tsx
frontend/app/reset-password/page.tsx
frontend/services/authApi.ts
backend/**
```

**Icon reuse:** `Eye` / `EyeOff` from existing `lucide-react` dependency — no new package.

**State:** `useState(false)` inside each `AuthField` instance (independent per field).

---

## Risks

| Risk | Mitigation |
|------|------------|
| Toggle accidentally submits form | `type="button"` on control |
| Password value resets on toggle | Only change input `type`; keep same `value` / `onChange` |
| Focus loss | Toggle from input focus without refocusing away |
| Text overlaps icon | Relative wrapper + trailing padding on input |
| Screen reader lacks label | Dynamic `aria-label` + `aria-pressed` |
| Shared state reveals wrong field | Per-instance state inside `AuthField` |
| Mobile layout regression | Reuse existing `h-11` / touch-friendly button sizing |
| Autofill regression | Do not change `name`, `id`, `autoComplete` |
| Broad unintended impact | Limit to `AuthField` when `type="password"` only |

**RISK: LOW** — frontend-only, single shared auth component, no API/auth/data changes.

---

## Verification Plan

### Static / build (from `frontend/`)

```bash
npm run lint
npm run typecheck
npm run build
```

### Manual behavior (each in-scope field)

```text
password hidden by default
Show password → value readable, same characters preserved
control shows Hide password state (label + aria-pressed)
Hide password → masked again
typing continues normally after toggle
form submits successfully (login, register, reset-password happy paths)
Enter in input still submits form as today
toggle does not submit form
keyboard Tab to toggle + Enter/Space works
focus in input remains usable after toggle
accessible name reflects Show/Hide state
register/reset: password and confirm fields toggle independently
```

### Regression

```text
login/register/reset API payloads unchanged
client validation messages unchanged
autocomplete attributes unchanged
no backend files changed
no new dependencies
```

---

## Rollback Impact

**LOW** — frontend-only revert of bounded `AuthField` (+ optional `AuthShell` class) changes restores prior always-hidden password inputs.

No migration, deploy config, or API rollback required.

---

## Implementation Result

Implemented password visibility toggle in `frontend/components/auth/AuthField.tsx` only.

| Item | Result |
|------|--------|
| Files changed | `frontend/components/auth/AuthField.tsx` |
| State | Per-instance `useState(false)` when `type="password"` |
| Input type | Toggles `password` ↔ `text`; value/onChange unchanged |
| Toggle control | Native `<button type="button">` in trailing position |
| Icons | `Eye` / `EyeOff` from existing `lucide-react` |
| Accessibility | `aria-label` Show/Hide password; `aria-pressed={isVisible}`; icons `aria-hidden` |
| Layout | Relative wrapper; input `pr-11`; 36px toggle hit area |
| Pages changed | None — login/register/reset-password unchanged |
| Backend/API | None |

Behavior applies automatically to all 5 in-scope password fields via shared `AuthField`.

---

## Final Verification

**Verified at:** local repository HEAD `96e895ff4cee8dde5789d2514fa6a52ac148240d`

### Automated checks (from `frontend/`)

| Check | Command | Result | Exit code |
|-------|---------|--------|-----------|
| Lint | `npm run lint` | PASS — 0 errors; 4 pre-existing warnings in unrelated files (`apple-icon.tsx`, `icon.tsx`, `opengraph-image.tsx`, `RentoLogo.tsx`) | 0 |
| Typecheck | `npm run typecheck` | PASS | 0 |
| Build | `npm run build` | PASS — Next.js 16.2.6 compiled; `/login`, `/register`, `/reset-password` routes present | 0 |

### Implementation review (code/diff)

| Area | Result | Evidence |
|------|--------|----------|
| Hidden by default | PASS | `useState(false)`; renders `type="password"` initially |
| Per-instance state | PASS | State inside each `AuthField` when `type="password"` |
| Value preservation | PASS | Same `value` / `onChange`; only `type` toggles |
| Form contract | PASS | `name`, `id`, `autoComplete`, `required`, `aria-invalid`, `aria-describedby` unchanged via `sharedInputProps` |
| Button semantics | PASS | `<button type="button">` |
| Icons | PASS | Existing `lucide-react` `Eye` / `EyeOff`; no package changes |
| Accessibility | PASS | State-dependent `aria-label`; `aria-pressed`; decorative icons; focus ring on button |
| Layout | PASS | Relative wrapper only for password; `pr-11` padding; non-password fields unchanged |
| Scope | PASS | Only `AuthField.tsx` + task doc modified |

### Manual / runtime checks (local dev server `http://localhost:3000`)

| Flow | Result | Observations |
|------|--------|--------------|
| Login password | PASS | Default masked; Show/Hide toggles `input.type` `password`↔`text`; value `SecretTest123` preserved; toggle did not navigate/submit |
| Register password | PASS | Independent toggle; confirm remained masked when password revealed |
| Register confirm | PASS | Independent toggle; password visibility unchanged when confirm revealed |
| Reset new password | PASS | Form rendered with `?token=test-token-for-ui`; toggle reveals/hides new password field only |
| Reset confirm | PASS | Independent toggle from new-password field |
| Keyboard | PASS | Tab order reaches toggle button after password input on `/login` snapshot |
| Mobile/narrow (375px) | PASS | Toggle 36×36px; input `padding-right: 44px`; control usable at narrow width |

**Not verified in this session:**

| Item | Status | Reason |
|------|--------|--------|
| End-to-end login submission smoke | NOT VERIFIED | Local backend not running on `127.0.0.1:8000` |
| Enter-key submit after toggle | NOT VERIFIED | No form-handler changes; not exercised interactively |
| Password-manager autofill in live browser | NOT VERIFIED | Attributes unchanged by inspection; no manager-specific runtime test |

### Regression boundary (diff inspection)

| Layer | Result |
|-------|--------|
| Backend | unchanged |
| API / auth payloads | unchanged |
| Session / CSRF | unchanged |
| Auth pages (`login`, `register`, `reset-password`) | unchanged |
| Dependencies | unchanged |

**Verification conclusion:** TASK-001 implementation satisfies approved scope. Ready for commit stage (does not authorize commit/push/deploy).

---

## Commit

_Not started._

---

## Production Result

_Not started — frontend UX only; standard deploy path if separately authorized._

---

## Follow-up

- If future password fields are added outside `AuthField`, they will not get the toggle automatically — document reuse of `AuthField` for auth passwords.
- If admin/profile change-password flows are added later, evaluate extending the same pattern in a new task.

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY        ← completed
IMPLEMENTATION   ← completed
VERIFICATION     ← completed
READY_TO_DEPLOY  ← current stage (does not authorize commit/push/deploy)
COMMIT
PUSH
DEPLOY
PRODUCTION ACCEPTANCE
```
