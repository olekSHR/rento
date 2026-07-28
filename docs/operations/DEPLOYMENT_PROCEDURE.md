# Deployment Procedure

**Status:** IWP-012 LAUNCH READINESS EVIDENCE — PROCEDURE ONLY
**Authority:** `docs/implementation/IWP_012_DISCOVERY_EVIDENCE_AND_EXECUTION_AUTHORIZATION.md`; `docs/engineering/INFRASTRUCTURE_STANDARDS.md`
**Work package:** IWP-012 — Launch Readiness Release And Rollback Evidence
**Deployment execution:** NOT AUTHORIZED
**Production operation:** NOT AUTHORIZED
**Release execution:** NOT AUTHORIZED

---

## 1. Purpose And Boundary

This document records an **operator deployment procedure** for the committed local Compose stack (`db`, `backend`, `frontend`). It satisfies IWP-012 scope items **R3, R4, and R6** without authorizing production deployment, release execution, or live migration in production.

Procedure is **readiness evidence only**.

---

## 2. Prerequisites

| Requirement | Detail |
|-------------|--------|
| Repository checkout | Committed `main` or authorized release tag — when separately authorized |
| Docker Engine | With Compose v2 (`docker compose`) |
| Shell environment | `POSTGRES_PASSWORD` set in shell or local non-committed env file |
| Backend secrets file | Local `backend/.env` with required backend variables — **not committed** |
| Network access | Localhost ports `5432`, `8000`, `3000` available |
| Operator authority | Local/disposable deployment only unless separate production authorization exists |

**Stop condition:** Stop if production credentials, production network access, or undeclared hosting platform is required.

---

## 3. Required Tools And Access Classes

| Tool / access | Purpose |
|---------------|---------|
| `git` | Verify repository state |
| `docker compose` | Render, build, and run stack |
| `docker compose run` | One-off Alembic migration against `db` |
| Local filesystem | Bind mount `./backend/uploads` |
| Secret store (local) | `backend/.env` and shell `POSTGRES_PASSWORD` — values **not** in repository |

No deployment scripts, CI/CD, or cloud provider tooling are defined in this repository.

---

## 4. Configuration Verification

Before deployment preparation:

1. Confirm `docker-compose.yml` defines services `db`, `backend`, `frontend`.
2. Confirm `POSTGRES_PASSWORD` is set — Compose fails render without it (`${POSTGRES_PASSWORD:?...}`).
3. Confirm local `backend/.env` exists with required backend variables per `PRODUCTION_CONFIGURATION_INVENTORY.md`.
4. Optionally verify compose syntax (non-modifying):

```bash
docker compose config
```

5. Confirm no secret values are committed to repository files.

**Stop condition:** Stop if required variables are missing or secret values would be committed.

---

## 5. Deployment Preparation Order

1. Record starting Git commit hash and branch.
2. Verify working tree excludes unrelated changes.
3. Set `POSTGRES_PASSWORD` in shell (or approved local secret source).
4. Ensure `backend/.env` contains required backend configuration.
5. Review `PRODUCTION_CONFIGURATION_INVENTORY.md` for variable completeness.
6. Confirm deployment authorization exists if target is not local/disposable.

---

## 6. Service Build And Start Order

Per `docker-compose.yml` dependency chain:

```text
db (healthy) → backend (healthy) → frontend (healthy)
```

### 6.1 Start database

```bash
docker compose up -d db
```

Wait until `db` healthcheck passes (`pg_isready`).

### 6.2 Database migration gate (required on fresh volume)

**Manual step — not automatic on container start.**

On a **fresh** PostgreSQL volume, run migrations before backend serves traffic:

```bash
docker compose run --rm backend alembic upgrade head
```

Requirements:

- `DATABASE_URL` is injected by Compose override: `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}`.
- Alembic reads `DATABASE_URL` from environment (`backend/alembic/env.py`).

**Stop condition:** Stop if migration fails or targets unintended database.

### 6.3 Start backend

```bash
docker compose up -d backend
```

Backend healthcheck probes `http://127.0.0.1:8000/` inside container.

### 6.4 Start frontend

```bash
docker compose up -d frontend
```

Frontend healthcheck probes `http://127.0.0.1:3000/` inside container.

### 6.5 Full stack (after migration on fresh volume)

```bash
docker compose up -d
```

Use only after §6.2 completed when `postgres_data` volume is new.

---

## 7. Health Verification

| Service | Healthcheck (from compose) | Operator verification |
|---------|---------------------------|----------------------|
| `db` | `pg_isready -U ${POSTGRES_USER} -d ${POSTGRES_DB}` | `docker compose ps` shows healthy |
| `backend` | Python `urllib` GET `http://127.0.0.1:8000/` | Container healthy; optional browser/curl to host `:8000` |
| `frontend` | Node `fetch` GET `http://127.0.0.1:3000/` | Container healthy; optional browser to host `:3000` |

SSR internal API routing uses `INTERNAL_API_URL=http://backend:8000` (server-side only).

---

## 8. Stop Conditions

Stop deployment preparation or execution when:

1. authorization for target environment is missing;
2. migration fails or revision is unknown;
3. healthchecks fail after retry window;
4. secret values would be logged or committed;
5. production access is required without authorization;
6. scope exceeds local Compose stack;
7. automatic database downgrade is requested — **not supported**.

---

## 9. Failure Handling

| Failure | Operator action |
|---------|-----------------|
| `db` not healthy | Inspect logs: `docker compose logs db`; verify `POSTGRES_PASSWORD` |
| Migration failure | Do not start backend; inspect Alembic output; verify `DATABASE_URL` host is `db` |
| Backend not healthy | Inspect logs: `docker compose logs backend`; verify `.env` and migration state |
| Frontend not healthy | Inspect logs: `docker compose logs frontend`; verify backend reachable |
| Port conflict | Stop conflicting process or adjust host port mapping under separate authorization |

Record failure, unavailable evidence, and residual risk. Do not claim successful deployment.

---

## 10. Application / Image Rollback Procedure (R4)

**Release rollback** (application/image level) — procedure only:

1. Stop affected services: `docker compose stop frontend backend`.
2. Check out previous **authorized** repository commit or deploy previous **authorized** image tag — when release authority exists.
3. Rebuild if needed: `docker compose build backend frontend`.
4. Ensure database migration state is compatible — **Alembic downgrade is not automatic and may not be safe**; assess separately.
5. Restart services in order: `db` → migration check if needed → `backend` → `frontend`.
6. Re-run health verification (§7).

**Limitations:**

- No automatic database schema downgrade is defined in this repository.
- Rollback may require forward-only migration remediation under DBA/operations authority.
- Image/tag rollback requires separate release authorization.

---

## 11. Database Recovery Boundary

Database **restore** is **not** application rollback.

| Concern | Procedure | Authority |
|---------|-----------|-----------|
| Application/image rollback | §10 above | Release/deployment when authorized |
| Database restore / PITR | `docs/operations/BACKUP_AND_RECOVERY_PLAN.md` §4 | Separate operations authority |
| Live restore execution | Not defined for execution here | **NOT RUN — NOT AUTHORIZED** |

Do not conflate redeploying containers with restoring database backups.

---

## 12. Production-Only NOT RUN

| Action | Status |
|--------|--------|
| Production deployment | **NOT RUN — NOT AUTHORIZED** |
| Production migration | **NOT RUN — NOT AUTHORIZED** |
| Production rollback | **NOT RUN — NOT AUTHORIZED** |
| DNS / TLS / load balancer changes | **NOT RUN — NOT AUTHORIZED** |
| Cloud registry push | **NOT RUN — NOT AUTHORIZED** |

---

## 13. Post-Deployment Evidence To Collect

When deployment is separately authorized, record:

1. Git commit hash and branch;
2. Compose config render result (if run);
3. Migration command and exit code;
4. Service health status;
5. Unavailable checks declared honestly;
6. Residual risks and rollback notes.

This IWP-012 act does not collect live deployment evidence.
