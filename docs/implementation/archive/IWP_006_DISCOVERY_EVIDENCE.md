# IWP-006 Discovery Evidence Report

**Status:** COMPLETED - READ-ONLY DISCOVERY EVIDENCE ONLY
**Authority class:** IWP package discovery evidence artifact
**Binding authority:** NONE - OBSERVATIONS ONLY - NOT IMPLEMENTATION AUTHORIZATION
**Package:** IWP-006 - Frontend Auth And API Client Stabilization
**Stage:** I4 - Domain Implementation
**Discovery execution:** COMPLETED by this evidence artifact
**Technical implementation:** NOT AUTHORIZED - NOT STARTED
**Exact technical write set:** NOT ESTABLISHED
**Acceptance:** NOT GRANTED

**Repository baseline commit:** `d942e00ca0ae63fe5fd40aeedc3d7bd130c5f29c`
**Amendment publication commit:** `89f9af0539a1e2468c5c2f9139829894268947a7`
**Original instrument publication commit:** `fe64f2bce9bcf1e6b2df287593497c7e03c99827`
**Continuity synchronization commit:** `d942e00ca0ae63fe5fd40aeedc3d7bd130c5f29c`

**Authority basis:** `docs/implementation/IWP_006_EXECUTION_AUTHORIZATION.md` @ amendment publication commit `89f9af0539a1e2468c5c2f9139829894268947a7`; `docs/implementation/IMPLEMENTATION_WORK_PACKAGE_REGISTER.md`; `docs/design/CURSOR_HANDOFF.md`

**Informational continuity note:** The published instrument retains internal pre-publication draft labels. This evidence does not reconcile them. Effective publication authority is established by commit `89f9af0539a1e2468c5c2f9139829894268947a7`.

---

## 1. Discovery Scope And Boundary

### 1.1 Authorized discovery surfaces inspected

Discovery was read-only and limited strictly to instrument §10.1 surfaces:

| Surface | Files inspected | Count |
|---------|-----------------|------:|
| `frontend/context/` | `AuthContext.tsx`; `FavoritesContext.tsx` | 2 |
| `frontend/lib/` | `authFetch.ts`; `tokenStorage.ts`; `getImageUrl.ts`; `realtorWorkspace.ts`; `bottomNavLayout.ts` | 5 |
| `frontend/services/` | `authApi.ts`; `favoritesApi.ts`; `api.ts`; `api.ts.save` | 4 |
| `frontend/components/*Route.tsx` | `ProtectedRoute.tsx`; `AdminRoute.tsx`; `RealtorRoute.tsx` | 3 |
| `frontend/types/` | `auth.ts`; `user.ts`; `property.ts` | 3 |

**Total in-scope files inspected:** 17

### 1.2 Pattern resolution for route surfaces

`frontend/components/*Route.tsx` was interpreted narrowly as direct files matching `*Route.tsx` in `frontend/components/` root only. No recursive inspection of unrelated component directories was performed.

### 1.3 Import references outside permitted surfaces

The following import targets were observed by reference only and were **not** opened:

| In-scope file | External import reference |
|---------------|---------------------------|
| `AdminRoute.tsx` | `@/components/admin/AdminWorkspaceHeader` |

Caller graphs, app layout wiring, pages, hooks, tests, configuration, and backend code were **not** inspected because they lie outside §10.1.

### 1.4 Discovery exclusions obeyed

No source modification, refactoring, backend inspection, dependency inspection, runtime execution, test execution, continuity-surface modification, or write-set establishment was performed.

---

## 2. Instrument Discovery Question Coverage

| # | Instrument question (§10) | Coverage |
|---|---------------------------|----------|
| 1 | Frontend auth context and session-state inventory | COMPLETE - §3 |
| 2 | Route guard and protected-route behavior inventory | COMPLETE - §4 |
| 3 | Token handling, storage, refresh, logout, renewal posture | COMPLETE - §5 |
| 4 | API client construction, error handling, denial presentation | COMPLETE - §6 |
| 5 | Type definitions supporting auth and API client flows | COMPLETE - §7 |
| 6 | Alignment with Frontend/API/Authentication/Authorization Architecture | PARTIAL - repository-evidence only; architecture docs not re-opened in this task |
| 7 | Browser or session storage risks and security review triggers | COMPLETE - §8 |
| 8 | Overlap risk with IWP-007 and IWP-008 | COMPLETE - §9 |
| 9 | Exact future technical write set candidates | NOT ESTABLISHED - candidate themes only in §10; no authorized write set |
| 10 | Lint/build/test and evidence requirements | NOT RUN - outside task authorization |
| 11 | Backend, dependency, configuration, migration, CI, infrastructure, production impact | PARTIAL - endpoint and env references only from in-scope files |
| 12 | Unavailable evidence and stop conditions | COMPLETE - §11, §12 |

---

## 3. Auth Context And Session-State Inventory

### 3.1 Verified facts

**`frontend/context/AuthContext.tsx`**

- Exposes `user`, `isLoading`, `isAuthenticated`, `isAdmin`, `isRealtor`, `login`, `register`, `logout`.
- Session restore on mount calls `getCurrentUser()` from `authApi`; on any failure removes token and clears user.
- `login` flow: `loginUser` → `saveToken(response.access_token)` → `getCurrentUser()` → `setUser`.
- `register` flow: `registerUser` from `authApi` then reuses `login`.
- `logout` removes token from storage and clears user only; no server-side logout call observed in permitted surfaces.
- Role flags are derived client-side from `user.role === "admin"` and `user.role === "realtor"`.

**`frontend/context/FavoritesContext.tsx`**

- Depends on `useAuth()` for `isAuthenticated` and auth loading gate.
- Authenticated favorites use `favoritesApi` (`authFetch`-backed).
- Unauthenticated favorites use browser `localStorage` key `"favorites"`.
- Not part of core auth/token path, but couples auth state to client persistence behavior.

### 3.2 Evidence-based inferences

- Client session truth is `user !== null` plus persisted bearer token in `localStorage`.
- There is no explicit token-expiry or refresh lifecycle in permitted surfaces.
- Auth loading and favorites loading are separate state machines coordinated only by `authLoading` gate in `FavoritesContext`.

### 3.3 Unresolved questions

- Whether callers outside permitted surfaces rely on `AuthContext.isRealtor` vs recomputing role locally (see F-004).
- Whether any global 401 handler exists outside permitted surfaces.

---

## 4. Route Guard And Protected-Route Inventory

### 4.1 Verified facts

| Component | Auth check | Role check | Denied behavior | Loading behavior |
|-----------|------------|------------|-----------------|------------------|
| `ProtectedRoute.tsx` | `isAuthenticated` | none | redirect `/login` | skeleton main |
| `AdminRoute.tsx` | `isAuthenticated` | `isAdmin` from context | unauthenticated → `/login`; non-admin → `/` | skeleton main |
| `RealtorRoute.tsx` | `isAuthenticated` | local `user?.role === "realtor"` | unauthenticated → `/login`; non-realtor → `/` | skeleton main |

All three guards use `useEffect` redirects and render `null` while redirecting after loading completes.

### 4.2 Findings

See F-003, F-004, F-005.

---

## 5. Token Handling, Storage, Refresh, Logout, Renewal

### 5.1 Verified facts

**`frontend/lib/tokenStorage.ts`**

- Token key: `"access_token"`.
- Storage medium: `window.localStorage`.
- API: `saveToken`, `getToken`, `removeToken`, `hasToken`.
- SSR guard: no-op/read null when `window` undefined.

**Token lifecycle within permitted surfaces**

| Event | Action |
|-------|--------|
| Login success | `saveToken(access_token)` |
| Session restore failure | `removeToken()` |
| Logout | `removeToken()` |
| Refresh / renewal | not implemented in permitted surfaces |
| 401 response handling | not implemented in `authFetch` |

No refresh token, session rotation, or secure/httpOnly cookie storage appears in permitted surfaces.

---

## 6. API Client Construction, Error Handling, Denial Presentation

### 6.1 Verified facts — dual client pattern

Two distinct authenticated-client patterns coexist:

**Pattern A — centralized bearer injection**

- `authFetch.ts` reads token via `getToken()`, sets `Authorization: Bearer`, JSON content type, throws `Error(\`Request failed: ${status}\`)` on non-OK.
- Used by `authApi.ts` (`registerUser`, `getCurrentUser`) and `favoritesApi.ts`.

**Pattern B — explicit token parameter + raw `fetch`**

- `api.ts` defines local `API_URL` and numerous functions accepting `token: string`, manually setting `Authorization` headers.
- Public/unauthenticated calls also use raw `fetch` (`getProperties`, `reportProperty`, etc.).

**Pattern C — hybrid auth endpoints in `authApi.ts`**

- `loginUser` uses raw `fetch` to `/auth/login` with `application/x-www-form-urlencoded`.
- Password reset endpoints use raw `fetch` with structured error parsing via `parseApiErrorMessage`.
- `registerUser`/`getCurrentUser` use `authFetch`.

### 6.2 Verified facts — error and denial handling variance

| Client/function | Error parsing | Typical failure surface |
|-----------------|---------------|-------------------------|
| `authFetch` | status code only | generic `Request failed: N` |
| `authApi.loginUser` | tries JSON `message` | user-facing invalid credentials message |
| `authApi.register/getCurrentUser` | inherits `authFetch` generic error | generic status message |
| `api.ts` most mutations | generic `Failed to ...` strings | limited backend message propagation |
| `api.ts` selected admin/realtor flows | `message` / `detail` parsing helpers | richer user-facing text |

No centralized denial taxonomy, status-to-UX mapping, or auth failure recovery is present in permitted surfaces.

### 6.3 Verified facts — duplicate symbols in permitted surfaces

| Symbol | Location A | Location B |
|--------|------------|------------|
| `registerUser` | `authApi.ts` — typed `RegisterRequest`, uses `authFetch("/auth/register")` | `api.ts` — `(email, password)` raw fetch to `/auth/register` |
| `PropertyImage` type | `types/property.ts` | `api.ts` exported duplicate |
| API base URL constant | `authFetch.ts`, `authApi.ts`, `api.ts` | repeated env fallback `NEXT_PUBLIC_API_URL \|\| http://127.0.0.1:8000` |

Within permitted surfaces, `AuthContext` imports auth flows from `authApi`, not `api.ts`.

### 6.4 Artifact note

- `frontend/services/api.ts.save` exists as a backup copy of an older/smaller `api.ts` variant. It is in the permitted services surface and was inventoried but not used as primary evidence beyond existence.

---

## 7. Shared Types Supporting Auth And API Flows

### 7.1 Verified facts

**`frontend/types/user.ts`**

- `UserRole = "user" | "admin" | "realtor"`
- `User { id, email, role }`

**`frontend/types/auth.ts`**

- Request/response types for login, register, current user, password reset flows.
- `CurrentUserResponse = User`.

**Cross-surface typing observations**

- `api.ts` defines many domain/admin types inline rather than under `frontend/types/`.
- `realtorWorkspace.ts` imports `RealtorProfile` from `services/api` and `Property` from `types/property`, mixing service-owned and types-owned models.

---

## 8. Security-Boundary And Storage Assessment

### 8.1 Verified repository facts

- Bearer access token persisted in `localStorage` under fixed key `access_token`.
- Unauthenticated favorites persisted in `localStorage` under key `favorites`.
- Client route authorization relies on role string returned from `/users/me` and stored in React state.
- No token refresh, no automatic logout on 401 inside `authFetch`, no CSRF/session hardening logic in permitted surfaces.

### 8.2 Instrument stop-condition relevance

These observations trigger instrument §12/§18 security review deferral for any future implementation touching token persistence or browser storage semantics. This evidence does **not** perform that review and does **not** choose a storage solution.

---

## 9. Overlap With IWP-007 And IWP-008

| Area | IWP-006 relevance | Overlap note |
|------|-------------------|--------------|
| `authApi.ts`, `authFetch.ts`, `tokenStorage.ts`, `AuthContext.tsx`, route guards, auth types | Core IWP-006 scope | Primary |
| `favoritesApi.ts`, favorites auth/local split | Auth-adjacent client behavior | Secondary |
| `api.ts` property/admin/realtor/admin-user surfaces | Uses auth token pattern but mostly workflow/domain API | High overlap with IWP-007 |
| `getImageUrl.ts`, upload helpers in `api.ts` | Media URL handling | Potential IWP-008 coordination |
| `realtorWorkspace.ts` | Realtor workspace presentation helpers | IWP-007-adjacent, not auth core |

No package sequencing decision is made here.

---

## 10. Candidate Stabilization Themes (Not An Authorized Write Set)

The following themes emerged from discovery evidence only. They are **not** an approved implementation write set and do **not** authorize modification.

1. Consolidate authenticated fetch/token injection paths (`authFetch` vs token-parameter `api.ts`).
2. Normalize auth and API error/denial presentation across clients.
3. Align route-guard role checks with `AuthContext` role helpers.
4. Resolve duplicate auth entrypoints/types (`registerUser`, `PropertyImage`, API URL constants).
5. Define explicit session-failure behavior for expired/invalid bearer tokens.
6. Review browser storage posture for access tokens and local favorites persistence.

Future implementation authorization must record an exact write set separately.

---

## 11. Findings Register

Severity legend used in this evidence:

| Class | Meaning |
|-------|---------|
| SECURITY | Security-boundary or storage posture relevant to instrument stop conditions |
| HIGH | Material inconsistency affecting auth/API stabilization objective |
| MEDIUM | Consistency or maintainability risk within IWP-006 scope |
| LOW | Minor duplication or hygiene item |
| INFORMATIONAL | Observed fact without immediate stabilization requirement |
| UNCERTAIN | Cannot be fully resolved within permitted surfaces |

| ID | Class | Location | Observed fact | Why it matters to IWP-006 | Evidence status | Authority / boundary | Future decision required |
|----|-------|----------|---------------|---------------------------|-----------------|----------------------|-------------------------|
| F-001 | SECURITY | `frontend/lib/tokenStorage.ts` | Access token stored in `localStorage` key `access_token` | Instrument flags browser storage of authentication material for separate security review before implementation authorization | VERIFIED | Authentication Architecture; Security Standards; instrument §12/§18 | Yes - storage posture review before implementation |
| F-002 | HIGH | `frontend/lib/authFetch.ts`; `frontend/services/api.ts` | Two authenticated client models: centralized `authFetch` vs explicit `token` parameters across large `api.ts` surface | Violates single client auth/API discipline targeted by IWP-006 | VERIFIED | API Standards; Frontend Architecture | Yes - consolidation strategy in future authorized implementation |
| F-003 | HIGH | `frontend/lib/authFetch.ts`; `frontend/services/authApi.ts`; `frontend/services/api.ts` | Error handling differs: generic status errors vs parsed backend messages vs domain-specific helpers | Inconsistent denial/failure presentation undermines API client stabilization | VERIFIED | API Standards | Yes - contract/error envelope strategy |
| F-004 | MEDIUM | `frontend/components/RealtorRoute.tsx`; `frontend/context/AuthContext.tsx` | Realtor guard computes `user?.role === "realtor"` while context already exposes `isRealtor` | Duplicated role logic increases drift risk between guards and auth state | VERIFIED | Authorization Architecture; Frontend Architecture | Yes - guard/context alignment |
| F-005 | MEDIUM | `frontend/components/ProtectedRoute.tsx`; `AdminRoute.tsx`; `RealtorRoute.tsx` | Guards redirect after render via `useEffect`; unauthenticated/unauthorized state renders `null` briefly | Route reachability and denial UX may flash or differ by role surface | VERIFIED | Frontend Architecture | Yes - route guard behavior normalization |
| F-006 | MEDIUM | `frontend/services/authApi.ts`; `frontend/services/api.ts` | Duplicate `registerUser` implementations with different signatures/clients | Conflicting auth entrypoints within frontend services layer | VERIFIED in permitted surfaces; caller usage outside surfaces UNCERTAIN | API Standards; Authentication Architecture | Yes - canonical register client selection |
| F-007 | MEDIUM | `frontend/types/property.ts`; `frontend/services/api.ts` | Duplicate `PropertyImage` type definitions | Type drift risk across auth/API adjacent flows | VERIFIED | Development Standards | Yes - canonical type ownership |
| F-008 | MEDIUM | `frontend/lib/authFetch.ts`; `frontend/services/authApi.ts`; `frontend/services/api.ts` | Repeated `NEXT_PUBLIC_API_URL` fallback constants | Configuration divergence risk for auth/API clients | VERIFIED | API Standards | Yes - shared client config surface |
| F-009 | MEDIUM | `frontend/context/AuthContext.tsx`; `frontend/lib/tokenStorage.ts` | No refresh/renewal and no 401 recovery in `authFetch`; logout is local-only | Session lifecycle incomplete for stabilization objective | VERIFIED | Authentication Architecture | Yes - session failure semantics |
| F-010 | LOW | `frontend/services/api.ts.save` | Backup file coexists with `api.ts` in services surface | Hygiene/noise risk during future client stabilization | VERIFIED | Repository hygiene | Optional cleanup in future authorized scope |
| F-011 | INFORMATIONAL | `frontend/context/FavoritesContext.tsx` | Unauthenticated favorites persisted in `localStorage` key `favorites` | Auth-adjacent browser persistence outside token module | VERIFIED | Product/presentation boundary | Monitor during auth stabilization; not core token path |
| F-012 | INFORMATIONAL | `frontend/lib/realtorWorkspace.ts` | Non-auth workspace helpers live in `frontend/lib/` alongside auth client utilities | Surface mixes auth-stabilization and workflow helper concerns | VERIFIED | Frontend Architecture | Boundary clarity in future packaging decisions |
| F-013 | UNCERTAIN | `frontend/services/api.ts` | Many authenticated domain/admin functions exist beyond auth/core client scope | Caller graph and runtime usage outside permitted surfaces unknown | PARTIAL | IWP-007 coordination | Requires future scoped analysis or separate package evidence |

---

## 12. Stop-Condition Assessment

| Stop condition (instrument §18 summary) | Triggered during discovery? |
|---------------------------------------|----------------------------|
| Token persistence / browser storage change required | NO - observed only |
| Token semantic change | NO |
| Frontend becomes authorization authority | OBSERVED RISK ONLY - client role gating exists; no implementation change performed |
| Backend/API-contract change required to answer all questions | NO for bounded discovery; some runtime behavior unresolved |
| Dependency/config/migration/infra/production expansion | NO |
| Expansion beyond §10.1 surfaces | NO |
| Parallel package execution | NO |
| Exact write set unbounded | NOT ESTABLISHED - intentionally not defined here |

No instrument stop condition blocked completion of this bounded read-only discovery within authorized surfaces.

---

## 13. Unavailable Evidence

| Evidence | Status | Reason |
|----------|--------|--------|
| Frontend lint/build/test results | NOT RUN | Task forbids installing/running tooling |
| Runtime login/logout/401 behavior | NOT RUN | No app execution authorized |
| Caller graph for `api.ts` exports | UNRESOLVED | Call sites outside permitted surfaces not inspected |
| Backend auth contract truth | UNRESOLVED | Backend not inspected |
| Architecture doc re-validation line-by-line | NOT RUN | Only repository code evidence collected in this task |
| Production/staging env values for `NEXT_PUBLIC_API_URL` | UNRESOLVED | Runtime configuration not inspected |

---

## 14. Out-Of-Scope Observations

The following were intentionally excluded from inspection:

- Backend routers/schemas/services
- Frontend pages, hooks, non-route components (except import references noted above)
- Tests and fixtures
- Dependency manifests, lockfiles, CI, infrastructure, deployment
- Register, handoff, roadmap, and authorization instrument mutation

---

## 15. Discovery Conclusion

**Discovery evidence status:** SUFFICIENT FOR SEPARATE DISCOVERY REVIEW

Bounded read-only discovery within instrument §10.1 produced a complete in-scope inventory, verified auth/context/route/token/client/type observations, classified material findings, and separated facts, inferences, uncertainties, and out-of-scope limits.

This evidence does **not**:

- authorize technical implementation;
- establish an exact technical write set;
- approve corrections;
- select or activate any package beyond existing repository authority;
- complete Stage I4 or start Phase 4.

**Exact next authorized action after separate discovery review:** A future separate decision may authorize implementation preparation only if discovery review passes and a distinct implementation authorization act records an exact write set. Until then, technical implementation remains NOT AUTHORIZED - NOT STARTED.

---

## 16. Document Status

| Item | Value |
|------|-------|
| Document path | `docs/implementation/IWP_006_DISCOVERY_EVIDENCE.md` |
| Discovery execution | COMPLETED - READ-ONLY |
| Technical implementation | NOT AUTHORIZED - NOT STARTED |
| Exact technical write set | NOT ESTABLISHED |
| IWP-006 package posture (repository authority) | SELECTED - ACTIVE - READ-ONLY DISCOVERY AUTHORIZED - TECHNICAL IMPLEMENTATION NOT AUTHORIZED |
| Stage I4 | IN PROGRESS |
| IWP-004 | ACCEPTED - CLOSED |
| Phase 4 | NOT STARTED |
| Active implementation packages | 1 - IWP-006 |
| Authorized technical implementation packages | 0 |
