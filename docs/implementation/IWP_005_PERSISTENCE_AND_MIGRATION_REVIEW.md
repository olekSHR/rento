# IWP-005 Persistence And Migration Review

**Status:** REVIEW EVIDENCE CREATED - COMPLETION REVIEW NOT YET COMPLETED - ACCEPTANCE NOT GRANTED
**Package:** IWP-005 - Persistence And Migration Integrity
**Authority artifact:** `docs/implementation/IWP_005_EXECUTION_AUTHORIZATION.md`
**Execution evidence:** `docs/implementation/IWP_005_EXECUTION_EVIDENCE.md`
**Implementation date:** 2026-07-20

---

## 1. Scope

This review records the persistence and migration integrity state inspected under IWP-005.

Inspected surfaces:

1. `backend/alembic.ini`
2. `backend/alembic/env.py`
3. `backend/alembic/versions/`
4. `backend/alembic/versions_backup/`
5. `backend/app/models/`
6. `backend/app/repositories/`

This review did not inspect routers, services, frontend code, CI implementation, deployment configuration, release state, `.env`, secret stores, production databases, production data, or unrelated governance files.

---

## 2. Alembic Configuration Review

| Item | Finding |
|------|---------|
| Script location | `%(here)s/alembic` |
| Path separator | `os` |
| Database URL posture | `sqlalchemy.url = ${DATABASE_URL}` placeholder with process-environment resolution in `backend/alembic/env.py` after targeted correction |
| Secret posture | No real credential was copied into evidence. |
| Production posture | No production config was read or used. |

Configuration parsing through Alembic `Config` and `ScriptDirectory` succeeded.

Final block review reproduced normal repository-config offline SQL preview and found that the original IWP-005 implementation did not resolve `${DATABASE_URL}` when Alembic was invoked through `python -m alembic -c backend/alembic.ini ...`.

Targeted correction updates `backend/alembic/env.py` to read `DATABASE_URL` from the process environment and apply it to Alembic configuration before offline or online migration setup parses the URL or creates an engine. Corrective validation confirmed normal repository-config offline SQL preview succeeds with a safe placeholder process environment value and without `cfg.set_main_option(...)`.

---

## 3. Alembic Environment Review

Before IWP-005 implementation, `backend/alembic/env.py` imported only a partial model set before assigning `target_metadata = Base.metadata`.

Corrected posture:

1. `backend/alembic/env.py` imports all current model classes from `app.models`.
2. The imports are bound in `_registered_models` to make the metadata registration explicit.
3. `target_metadata` remains `Base.metadata`.
4. `DATABASE_URL` is resolved from the process environment for normal Alembic CLI operation.
5. `%` characters are escaped before applying the value to Alembic `ConfigParser`.
6. No runtime startup, domain behavior, authentication behavior, or API contract changed.

Validated metadata tables after the correction:

1. `favorites`
2. `password_reset_tokens`
3. `properties`
4. `property_images`
5. `realtor_applications`
6. `realtor_profiles`
7. `users`

---

## 4. Active Migration Revision Graph

Active migration directory: `backend/alembic/versions/`

| Order | Revision | Parent | File |
|-------|----------|--------|------|
| 1 | `d1b885e3c526` | base | `d1b885e3c526_initial_schema.py` |
| 2 | `136f31bdc8aa` | `d1b885e3c526` | `136f31bdc8aa_add_property_status.py` |
| 3 | `9401b1cf15b2` | `136f31bdc8aa` | `9401b1cf15b2_add_property_contacts.py` |
| 4 | `bd3db6563d5d` | `9401b1cf15b2` | `bd3db6563d5d_add_last_verified_at_to_properties.py` |
| 5 | `2803c6ee0796` | `bd3db6563d5d` | `2803c6ee0796_add_report_count_to_properties.py` |
| 6 | `46c9d35a00b0` | `2803c6ee0796` | `46c9d35a00b0_add_owner_id_to_properties.py` |
| 7 | `67a35089df97` | `46c9d35a00b0` | `67a35089df97_add_realtor_profiles.py` |
| 8 | `c4e8a1f92b03` | `67a35089df97` | `c4e8a1f92b03_add_realtor_applications.py` |
| 9 | `e7f2a8b91c04` | `c4e8a1f92b03` | `e7f2a8b91c04_add_account_status_to_users.py` |
| 10 | `f3a9c2d81e05` | `e7f2a8b91c04` | `f3a9c2d81e05_add_password_reset_tokens.py` |
| 11 | `b8c4e2f91a06` | `f3a9c2d81e05` | `b8c4e2f91a06_database_hardening.py` |

Graph result:

| Check | Result |
|-------|--------|
| Active revision count | 11 |
| Base count | 1 |
| Base revision | `d1b885e3c526` |
| Head count | 1 |
| Head revision | `b8c4e2f91a06` |
| Missing parent count | 0 |
| Branch point count | 0 |
| Duplicate revision count | 0 |

---

## 5. Backup Migration Lineage

Backup migration directory: `backend/alembic/versions_backup/`

| Order | Revision | Parent | File |
|-------|----------|--------|------|
| 1 | `a84171f98e18` | base | `a84171f98e18_create_properties_table.py` |
| 2 | `89d22c47107a` | `a84171f98e18` | `89d22c47107a_create_users_table.py` |
| 3 | `64ce82815687` | `89d22c47107a` | `64ce82815687_add_role_to_users.py` |
| 4 | `2e5387c04a1f` | `64ce82815687` | `2e5387c04a1f_add_image_url_to_properties.py` |
| 5 | `06195f15651b` | `2e5387c04a1f` | `06195f15651b_add_image_url_to_properties.py` |
| 6 | `8c936852fc7f` | `06195f15651b` | `8c936852fc7f_expand_property_model.py` |
| 7 | `212d2754a6be` | `8c936852fc7f` | `212d2754a6be_update_property_fields.py` |

Backup classification:

| Check | Result |
|-------|--------|
| Backup revision count | 7 |
| Backup base count | 1 |
| Backup head count | 1 |
| Missing parent count | 0 |
| Branch point count | 0 |
| Active lineage relationship | Separate from active `versions/` lineage |
| IWP-005 action | Classification only; no deletion, activation, move, or rewrite |

---

## 6. Model Inclusion Review

| Model class | Table | Included after IWP-005 env fix | Active migration coverage |
|-------------|-------|--------------------------------|---------------------------|
| `User` | `users` | yes | initial schema plus account status |
| `Property` | `properties` | yes | initial schema plus status, contacts, verification, reporting, owner, hardening |
| `PropertyImage` | `property_images` | yes | initial schema plus hardening index |
| `Favorite` | `favorites` | yes | initial schema plus hardening constraints/indexes |
| `RealtorProfile` | `realtor_profiles` | yes | `67a35089df97` |
| `RealtorApplication` | `realtor_applications` | yes | `c4e8a1f92b03` |
| `PasswordResetToken` | `password_reset_tokens` | yes | `f3a9c2d81e05` plus hardening index |

No model file was changed. No schema-changing migration was created because the integrity issue was metadata discovery in Alembic environment wiring, not missing schema history.

---

## 7. Repository Persistence Assumptions

Inspected repositories use SQLAlchemy `Session` directly and keep persistence access in repository files.

Observed assumptions:

1. repository functions perform direct queries and persistence writes;
2. many write functions call `commit()` and `refresh()` directly;
3. selected functions expose `commit: bool = True` for service-level orchestration;
4. repository files contain persistence access, not router logic;
5. no IWP-005 change added business logic, authorization policy, owner mutation policy, or API behavior to repositories.

IWP-005 did not change repository files because the inspected assumptions did not require migration-integrity correction within the authorized scope.

---

## 8. Upgrade Safety Assessment

Safe checks completed:

1. active graph construction;
2. `alembic history`;
3. `alembic heads`;
4. programmatic Alembic script directory load;
5. original offline PostgreSQL SQL preview generation through a programmatic Alembic config override;
6. explicit disposable SQLite upgrade attempt.

Upgrade execution to head on a live database remains unavailable because no safe disposable PostgreSQL database was established. SQLite was not an adequate substitute for this chain because it cannot alter FK constraints in the required way.

The original offline PostgreSQL SQL preview generated all active migrations to head without connecting to a database, but final review found that this evidence did not exercise normal repository configuration. Targeted correction reran normal repository-config offline SQL preview with a safe placeholder `DATABASE_URL` supplied through the process environment and without `cfg.set_main_option(...)`; the command exited successfully and produced non-empty SQL without connecting to a database.

---

## 9. Downgrade, Rollback, And Forward-Recovery Posture

Migration files define downgrade functions, but successful downgrade execution was not proven on a database because upgrade to head was unavailable in SQLite and no disposable PostgreSQL target was available.

Rollback posture:

1. new IWP-005 implementation change can be reverted by reverting `backend/alembic/env.py`;
2. no new migration was created;
3. no active migration was edited;
4. existing destructive cleanup in `b8c4e2f91a06` cannot be fully reversed by downgrade without backup because deleted rows are not recreated;
5. forward-recovery for real environments requires backup/restore prerequisites and a disposable PostgreSQL rehearsal before production migration authority is considered.

---

## 10. Empty-Database Behavior

Evidence:

| Check | Result |
|-------|--------|
| Active lineage reaches one head | PASS |
| Offline SQL can be generated to head | PASS |
| Empty SQLite upgrade | UNAVAILABLE/FAIL due SQLite FK alter limitation |
| Empty PostgreSQL upgrade | UNAVAILABLE - no safe disposable PostgreSQL target established |

No claim is made that empty database upgrade passed on a live database.

---

## 11. Representative Existing-Database Behavior

Representative existing-database validation was not run.

Reason:

1. it requires a safe isolated local/test database;
2. it requires synthetic fixture data and a controlled starting revision;
3. no such PostgreSQL target was established without credentials or production risk;
4. SQLite cannot execute the active chain to head because of dialect limitations.

Residual risk is recorded in `docs/implementation/IWP_005_EXECUTION_EVIDENCE.md`.

---

## 12. Transaction And Partial-Failure Behavior

Offline PostgreSQL SQL generation reported transactional DDL posture for the PostgreSQL dialect.

No live PostgreSQL transaction or partial-failure drill was executed.

Residual risk:

1. transaction behavior remains empirically unverified;
2. existing destructive cleanup should be rehearsed on disposable PostgreSQL with synthetic invalid and duplicate favorite rows;
3. production execution remains outside IWP-005.

---

## 13. Destructive And Irreversible Operation Review

Existing active migration `b8c4e2f91a06_database_hardening.py` contains destructive cleanup before adding constraints.

| Operation | Purpose | Data-loss class | IWP-005 action |
|-----------|---------|-----------------|----------------|
| Delete favorites with null `user_id` or `property_id` | Enforce non-null FK posture | Deletes invalid rows | Classified only |
| Delete duplicate favorites | Enforce unique `(user_id, property_id)` posture | Deletes duplicate rows | Classified only |

IWP-005 did not edit this migration because editing applied migration history is prohibited by default. Production execution remains not authorized.

Required future safety before real migration execution:

1. backup/restore plan;
2. count and classification of affected rows in the target environment without exposing personal data;
3. disposable PostgreSQL rehearsal with synthetic data;
4. explicit production migration authority.

---

## 14. Data Preservation And Backfill Requirements

No new data transformation or backfill was introduced by IWP-005.

Existing migration risk remains limited to the active hardening migration's cleanup statements. Those statements need environment-specific row counts and backup/restore prerequisites before any real execution authority.

---

## 15. Security And Environment Safety

Security posture:

1. no `.env` read;
2. no secret-store access;
3. no real credential use;
4. no production database access;
5. no staging, cloud, provider, or external database access;
6. placeholder values only;
7. count-only secret scan required after evidence creation;
8. no personal or production data copied.

---

## 16. Review Findings

| Finding | Severity | Disposition |
|---------|----------|-------------|
| Partial Alembic model registration in `env.py` | Material within IWP-005 | Corrected by centralized model import from `app.models`. |
| Normal Alembic CLI did not resolve `${DATABASE_URL}` from process environment | MAJOR in final block review | Targeted correction implemented in `backend/alembic/env.py`; corrective validation completed successfully. |
| SQLite cannot validate full active chain because FK constraint alter is unsupported | Limitation | Recorded as unavailable database evidence. |
| Existing hardening migration performs destructive cleanup | Residual risk | Classified; not executed; production migration remains unauthorized. |

---

## 17. Final Review Posture

This review is evidence for execution only.

It does not:

1. accept IWP-005;
2. close IWP-005;
3. complete Stage I3;
4. activate IWP-009;
5. authorize push;
6. authorize deployment;
7. authorize release;
8. authorize launch or scaling;
9. start Phase 4.

---

## 18. Corrective Checkpoint Treatment

The corrective checkpoint identity is intentionally not embedded in this file before commit creation. Embedding the hash of the commit that contains this file would require an impossible self-reference or a second commit. The exact corrective checkpoint must be verified from Git metadata after commit creation.

---

## 19. Exact Next Authorized Action

Read-only delta validation of only the corrected DATABASE_URL injection MAJOR finding.

Push remains NOT AUTHORIZED.
