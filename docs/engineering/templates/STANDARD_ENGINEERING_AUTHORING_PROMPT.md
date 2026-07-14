# Standard Engineering Authoring Prompt

Repository Authority is the only source of truth.

Use this prompt as the standard authoring entry point for repository-authorized Engineering Authority documents.

This prompt is procedural. It does not create repository authority, approve document content, replace Engineering Decision, replace Governance Review, replace Independent Review, replace Publication, or authorize implementation.

Implementation remains:

NOT AUTHORIZED

==================================================
1. REPOSITORY AUTHORITY
==================================================

Follow the engineering workflow defined in:

`docs/engineering/REPOSITORY_STANDARDS.md`

Use the repository continuity entry point:

`docs/design/CURSOR_HANDOFF.md`

Preserve:

- Repository Authority;
- Product Authority;
- Engineering Constitution compliance;
- Phase authorization boundaries;
- published authority hierarchy;
- extension-not-replacement discipline.

Do not use chat memory, tool state, assumptions, or generated summaries as repository authority.

==================================================
2. REPOSITORY INITIALIZATION
==================================================

Use Incremental Context by default.

Do not perform Full Repository Initialization unless `docs/engineering/REPOSITORY_STANDARDS.md` requires it or repository correctness cannot be guaranteed from the Minimum Working Set.

Construct the Minimum Working Set before authoring begins.

The Minimum Working Set must include:

- `docs/design/CURSOR_HANDOFF.md`;
- `docs/engineering/REPOSITORY_STANDARDS.md`;
- the governing phase authorization document;
- the approved Engineering Decision or authoring authorization for the target authority;
- directly required upstream published authorities;
- directly required review or decision evidence.

Exclude unrelated repository materials unless Working Set escalation is required for correctness.

==================================================
3. REPOSITORY STATE
==================================================

Before authoring, inspect and record:

- current branch;
- runtime Git HEAD;
- remote tracking state;
- working-tree status;
- pre-existing modified files;
- pre-existing untracked files;
- relevant continuity checkpoint from `docs/design/CURSOR_HANDOFF.md`.

Do not absorb unrelated working-tree changes into the authoring task.

Stop if repository state contradicts the authoring authorization or if required continuity evidence is missing.

==================================================
4. AUTHORIZATION VERIFICATION
==================================================

Before authoring, verify that repository authority explicitly authorizes:

- the Engineering Authority document being authored;
- its canonical path;
- its position in the phase execution order;
- its upstream dependencies;
- the authoring scope;
- the expected output;
- the validation level or validation selection rule.

Confirm that the task does not authorize:

- software implementation;
- infrastructure implementation;
- deployment;
- engineering release execution;
- Git tag creation;
- push;
- Phase 4;
- modification of unrelated published authorities.

If authorization is incomplete or conflicting, stop and report the exact blocker.

==================================================
5. AUTHORITY BEING AUTHORED
==================================================

Identify the target Engineering Authority before writing content:

- title;
- canonical repository path;
- authority class;
- document lifecycle state;
- phase or program authorization basis;
- upstream authorities consumed;
- downstream consumers, if known from repository authority;
- explicit non-goals;
- implementation boundary.

The authored document must consume upstream authority by reference and constraint inheritance. It must not redefine Product Authority, Repository Authority, Engineering Constitution principles, or published engineering authorities.

==================================================
6. WORKING SET CONSTRUCTION
==================================================

Build the Working Set from repository evidence only.

For each included document, record why it is required:

- governing authority;
- upstream dependency;
- continuity metadata;
- active review or decision evidence;
- target document context;
- validation evidence.

Escalate the Working Set only when required by `docs/engineering/REPOSITORY_STANDARDS.md` §11.6.4.

When escalating, identify:

- missing document or evidence;
- reason it is required;
- scope impact;
- validation impact.

Do not replace targeted escalation with automatic Full Repository Initialization.

==================================================
7. AUTHORING RULES
==================================================

Author only the approved scope.

The document must:

- remain within its assigned authority class;
- remain procedural, architectural, or standards-oriented according to its authorization;
- preserve Product Authority supremacy;
- preserve Engineering Constitution compliance;
- preserve Repository Authority and workflow rules;
- avoid duplicate ownership of concepts;
- avoid implementation instructions unless explicitly authorized;
- avoid vendor, product, framework, or deployment choices unless explicitly within scope;
- define inherited constraints by reference rather than restating upstream authority;
- distinguish authoring, review, approval, publication, release, and implementation.

Do not:

- redesign repository workflow;
- redesign Product Authority;
- redesign Engineering Constitution;
- change phase scope;
- modify published authorities unless explicitly authorized;
- create additional authority documents;
- begin downstream authority authoring;
- perform implementation.

==================================================
8. INTERNAL VERIFICATION
==================================================

Before completion, verify:

- terminology consistency;
- repository authority references;
- workflow consistency;
- section completeness;
- dependency consistency;
- scope preservation;
- non-duplication of authority responsibilities;
- implementation boundary preservation;
- Product Authority preservation;
- Engineering Constitution compliance;
- consistency with the approved Engineering Decision;
- absence of unauthorized publication, release execution, push, tag, or Phase 4 work.

Run applicable document lint and repository checks for the changed files.

Inspect the complete diff of every changed file before reporting completion.

==================================================
9. EXPECTED OUTPUT
==================================================

Return an Engineering Authoring Report containing:

1. Repository Initialization Summary
2. Working Set
3. Authorization Verification
4. Authoring Summary
5. Internal Verification
6. Files Created
7. Files Modified
8. Repository Consistency
9. Ready for Independent Review

If authoring is blocked, return the blocker with exact repository evidence and do not partially author the target document.

==================================================
10. COMPLETION RULES
==================================================

Completion of authoring means only that the target Engineering Authority draft is ready for the next repository-authorized lifecycle step.

Authoring completion does not imply:

- Independent Review approval;
- Governance Review approval;
- Publication;
- active binding authority;
- engineering release eligibility;
- implementation authorization;
- deployment authorization;
- Phase 3 completion;
- Phase 4 start.

After authoring:

- leave publication status honest;
- preserve continuity requirements defined by repository authority;
- report final repository status;
- do not create commits unless explicitly authorized;
- do not push;
- do not create tags;
- do not execute releases.

==================================================
CONFIRMATIONS
==================================================

Confirm:

- Repository Authority was used as the source of truth.
- Incremental Context was used unless escalation was required.
- Minimum Working Set was constructed.
- Authorization was verified before authoring.
- Scope Protection was preserved.
- Internal verification was performed.
- No unauthorized implementation occurred.
- No unauthorized publication occurred.
- No release execution occurred.
- No push occurred.
- No tag was created.
