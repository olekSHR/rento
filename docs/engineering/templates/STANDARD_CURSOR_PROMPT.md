# Standard Cursor Prompt Template

Repository Authority is the only source of truth.

Follow the engineering workflow defined in:

`docs/engineering/REPOSITORY_STANDARDS.md`

Repository Entry Point:

`docs/design/CURSOR_HANDOFF.md`

==================================================
OBJECTIVE
==================================================

<Describe the engineering task to be performed.>

==================================================
AUTHORIZED SCOPE
==================================================

<List the files, directories, documents, or decisions that are in scope.>

<List any explicitly prohibited actions or out-of-scope areas.>

==================================================
EXPECTED OUTPUT
==================================================

<Describe the expected report, artifact, patch, review, or decision.>

==================================================
REPOSITORY WORKFLOW
==================================================

Use the repository workflow defined by `docs/engineering/REPOSITORY_STANDARDS.md`.

Use `docs/design/CURSOR_HANDOFF.md` as the repository continuity entry point.

Do not duplicate repository workflow policy in this prompt. If task-specific constraints are required, state only the narrower constraint or approved exception.

==================================================
EXECUTION RULES
==================================================

- Treat repository authority as binding.
- Keep work within the authorized scope.
- Load additional repository context only when required by `docs/engineering/REPOSITORY_STANDARDS.md`.
- Preserve unrelated working-tree changes.
- Do not perform implementation, publication, release execution, push, tag, or authority modification unless explicitly authorized by this prompt and repository authority.

==================================================
REQUIRED OUTPUT
==================================================

Return:

<Required output title>

Structure:

1. <Section>
2. <Section>
3. <Section>

==================================================
CONFIRMATIONS
==================================================

Confirm:

- Repository workflow from `docs/engineering/REPOSITORY_STANDARDS.md` used.
- Repository Entry Point `docs/design/CURSOR_HANDOFF.md` used.
- Work stayed within authorized scope.
- No unauthorized repository initialization.
- No unauthorized authority changes.
- No unauthorized implementation.
- No push.
- No tag.
