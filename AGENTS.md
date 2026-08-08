# AGENTS.md

Rento is a mobile-first real estate rental marketplace: a Next.js frontend (`frontend/`) talking to a FastAPI backend (`backend/`) backed by PostgreSQL. See `README.md` for product/route/schema details.

## Cursor Cloud specific instructions

### Services

| Service | Dir | Run command | Port |
| --- | --- | --- | --- |
| PostgreSQL 16 | n/a (system) | `sudo pg_ctlcluster 16 main start` | 5432 |
| Backend (FastAPI) | `backend/` | `. .venv/bin/activate && uvicorn app.main:app --host 0.0.0.0 --port 8000` | 8000 |
| Frontend (Next.js) | `frontend/` | `npm run dev` | 3000 |

### Startup notes (non-obvious)

- **PostgreSQL is not auto-started on boot.** Start it each session with `sudo pg_ctlcluster 16 main start` before running the backend. The cluster data (roles + `rento_db`) persists in the VM snapshot, so you do not need to recreate the DB or re-run migrations on a fresh boot.
- **Backend Python deps live in `backend/.venv`** (created by the update script). Always `source backend/.venv/bin/activate` before running `uvicorn`/`alembic`.
- **`alembic.ini` hardcodes its own `sqlalchemy.url`** pointing at role `rento_user` (password committed in `alembic.ini`). A matching Postgres role `rento_user` owns `rento_db`. `backend/.env` (gitignored) uses that same role so the app and Alembic agree. If you ever recreate the DB, create `rento_user` with the password from `alembic.ini` line ~89, then `alembic upgrade head` from `backend/`.
- **`backend/.env` and `frontend/.env.local` are gitignored** and must exist for the stack to run. Backend requires `DATABASE_URL`, `SECRET_KEY`, `ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES` (the last two have no defaults; the app won't start without them). Set `ENABLE_API_DOCS=true` to expose Swagger at `/docs`. Frontend needs `NEXT_PUBLIC_API_URL=http://127.0.0.1:8000`.
- **Backend CORS only allows `localhost:3000` / `127.0.0.1:3000`**, so run the frontend on port 3000.
- **Admin/realtor-only actions** (e.g. creating a property) require a user whose `role` is `admin` or `realtor`. Registration always creates a plain `user`; promote via SQL: `UPDATE users SET role='admin' WHERE email='...';`.
- **Email and AI are optional.** `EMAIL_PROVIDER` defaults to `console` (password-reset links are printed to logs, no external service needed). AI listing generation needs `OPENAI_API_KEY` and returns 503 without it.

### Lint / build

- Frontend lint: `npm run lint` in `frontend/`. Build: `npm run build`. There is no Python linter configured for the backend.
