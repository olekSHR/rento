# Rento Engineering Release Strategy

**Status:** PUBLISHED — Engineering Release Strategy; Retrospective Engineering Release Reconstruction amendment active
**Document class:** Engineering Governance Document — **not** Engineering Architecture Authority  
**Authority class:** Authoritative engineering release governance  
**Binding authority:** Active — Retrospective Engineering Release Reconstruction amendment published as release governance
**Publication:** COMPLETE — Retrospective Engineering Release Reconstruction amendment published
**Implementation:** NOT AUTHORIZED  
**Maintenance classification:** Repository Maintenance → Release Maintenance (`REPOSITORY_STANDARDS.md` §7.8)
**Program authorization:** Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md`)  
**Audience:** Engineering Architecture Program, Documentation Governance Board, Design Council, Engineering Leadership  
**Governance basis:** MASTER_ROADMAP.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · PHASE_3_EVOLUTION_AUTHORIZATION.md · PROJECT_CONSTITUTION.md · RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)  

---

## 1. Purpose

This document defines the **official release strategy for the Engineering Architecture Program**.

It governs **GitHub Releases for Engineering Architecture only** — naming, versioning, eligibility, scope, lifecycle, mandatory contents, release notes structure, and traceability to repository authority.

This document answers:

- Why Engineering Releases exist;
- How Engineering Releases differ from Git commits, Git tags, and Engineering Authority Publication;
- What naming and versioning conventions apply to engineering milestone releases;
- What authorities may be packaged into each release;
- What prerequisites must be satisfied before a release is created;
- What mandatory artifacts accompany each release;
- How engineering releases remain traceable to published repository authority.

This document is **release governance**, not architecture definition, not repository governance redefinition, and not Product Design release policy.

This document governs the **engineering release lifecycle** — eligibility, integrity, packaging, traceability, and evidence — rather than defining engineering architecture, platform structure, or domain standards.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    → Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        → Engineering handoff (ENGINEERING_HANDOFF.md)
            → Repository governance (REPOSITORY_STANDARDS.md)
                → Engineering release strategy (this document)
                    → Engineering release manifests (when created)
                        → Git tags and GitHub Releases (communication checkpoints)
```

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| REPOSITORY_STANDARDS.md | Repository structure, traceability chain, tag philosophy, publication checkpoints | Specializes release strategy for Engineering Architecture Program — does not redefine repository governance |
| MASTER_ROADMAP.md | Phase 3 program scope and strategic order | Consumes Phase 3 milestone structure — does not redefine phase authorization |
| ENGINEERING_HANDOFF.md | Product-to-engineering transfer constraints | Consumes handoff boundaries — does not modify handoff |
| PHASE_3_AUTHORIZATION.md | Original Phase 3 program authorization | Consumes authorization scope — does not amend authorization |
| PHASE_3_EVOLUTION_AUTHORIZATION.md | Extension scope and execution order | Consumes remaining authority catalog — does not amend evolution authorization |
| Product Design release manifests | Product macro-domain and standard completion releases | Defines separate engineering release lane — does not govern product releases |

### 2.3 What this document owns

- Engineering Architecture Program release policy;
- Engineering release naming and versioning conventions;
- Engineering release eligibility, integrity, and scope rules;
- Release Manifest governance (§9);
- Engineering release lifecycle and mandatory contents;
- Engineering release evidence requirements (§11);
- Engineering release notes structure;
- Official engineering release roadmap;
- Traceability requirements between releases and published authorities.

### 2.4 What this document does not own

- Product Design Standard releases (`docs/design/releases/v1.0-*.md`);
- Engineering authority content or architectural definitions;
- Repository structure, filename conventions, or publication checkpoint procedure (owned by `REPOSITORY_STANDARDS.md`);
- Implementation versioning, deployment, or package release policy;
- GitHub Release creation acts (execution is separate from this strategy).

### 2.5 Subordination rule

This document is **subordinate to** `REPOSITORY_STANDARDS.md` for all repository governance matters. Where this document specializes engineering release practice, it **extends** — never contradicts — repository standards.

### 2.6 Governance classification

| Classification | Applies to this document? |
|----------------|---------------------------|
| **Engineering Governance Document** | **Yes** — governs release lifecycle policy |
| **Engineering Architecture Authority** | **No** — does not define architecture, standards, or domain constraints |

This document is an **Engineering Governance Document**. It records how engineering milestone releases are named, scoped, verified, packaged, and traced — not what engineering architecture requires.

Engineering architecture authority resides in published engineering authority documents under `docs/engineering/`. Release governance **packages and communicates** that authority; it does **not** create, amend, or substitute for it.

Upon publication, this document becomes **active release governance** — still distinct from Engineering Architecture Authority. Consumers must not treat release policy as architectural constraint unless explicitly cross-referenced by a published architecture authority.

---

## 3. Why Engineering Releases Exist

Engineering Releases exist to provide **durable, externally legible milestone checkpoints** for the Engineering Architecture Program.

They serve four purposes:

| Purpose | Description |
|---------|-------------|
| **Milestone communication** | Signal completion of a declared engineering authority bundle to stakeholders outside day-to-day repository activity |
| **Traceability packaging** | Bind a named version identifier to a verified set of already-published authorities at known repository checkpoints |
| **Program continuity** | Preserve engineering program lineage distinct from Product Design macro-domain releases |
| **Consumption boundary** | Allow downstream programs to reference a stable engineering baseline without treating a GitHub Release as authority source |

Engineering Releases **do not** create, modify, or certify engineering authority. Authority exists only through repository publication per `REPOSITORY_STANDARDS.md`.

---

## 4. Artifact Distinctions

Four repository artifacts are frequently conflated. This strategy defines them as **distinct, non-interchangeable** concepts.

### 4.1 Git Commit

| Attribute | Definition |
|-----------|------------|
| **What it is** | A recorded repository state change in version history |
| **When used** | Per engineering authority publication, continuity synchronization, governance integration |
| **Authority effect** | None directly — commits are lineage evidence |
| **Release relationship** | Publication commits are prerequisites for release eligibility |

A Git commit records **what changed** and **when**. It does not constitute a milestone release.

### 4.2 Git Tag

| Attribute | Definition |
|-----------|------------|
| **What it is** | A named pointer to a specific commit |
| **When used** | After release eligibility is verified and release manifest is prepared |
| **Authority effect** | None — tags are evidence, not authority (`REPOSITORY_STANDARDS.md` §9.2) |
| **Release relationship** | Tag name must match declared engineering release identifier |

A Git tag marks a **checkpoint in history**. It does not publish or authorize content.

### 4.3 GitHub Release

| Attribute | Definition |
|-----------|------------|
| **What it is** | A repository-hosted release object referencing a Git tag, with release notes |
| **When used** | After engineering milestone bundle is complete and release manifest exists |
| **Authority effect** | None — communication checkpoint only |
| **Release relationship** | Packages already-published authority for external consumption |

A GitHub Release is a **communication and packaging checkpoint**. It never creates authority.

### 4.4 Engineering Authority Publication

| Attribute | Definition |
|-----------|------------|
| **What it is** | The act of publishing an engineering document as binding repository authority |
| **When used** | Per Phase 3 authority completion, independent review, and publication checkpoint |
| **Authority effect** | **Creates binding engineering authority** when publication metadata is active |
| **Release relationship** | Mandatory prerequisite for any authority included in a release bundle |

Engineering Authority Publication is the **only mechanism** that creates engineering authority.

### 4.5 Governing distinction

```
Engineering Authority Publication  ≠  GitHub Release
```

| Statement | Rule |
|-----------|------|
| A document becomes authoritative | After repository publication — status, binding authority, and publication checkpoint per owning document |
| A GitHub Release is created | Only after all bundled authorities are already published |
| Release never precedes publication | Prohibited |
| Publication never requires release | Publication is complete at publication checkpoint; release is optional milestone communication |

**Authority lives in documents. Releases package authority. Tags and commits provide lineage.**

---

## 5. Release Naming Policy

### 5.1 Engineering release identifier format

```
engineering-v{major}.{minor}-{milestone-name}
```

| Component | Rule |
|-----------|------|
| `engineering-` | Mandatory prefix — distinguishes engineering releases from product releases |
| `v{major}.{minor}` | Semantic milestone version |
| `{milestone-name}` | Lowercase kebab-case milestone descriptor |

### 5.2 Product release separation

| Release class | Prefix | Example | Governed by |
|---------------|--------|---------|-------------|
| Product Design | `v` (no engineering prefix) | `v1.0-product-design-standard` | Product Design Program / `MASTER_ROADMAP.md` |
| Product macro-domain | `v` | `v1.0-realtor-platform` | GD-007 macro-domain lifecycle |
| Engineering Architecture | `engineering-` | `engineering-v0.1-foundation` | This document |

Engineering and product release namespaces **must not collide**.

### 5.3 Tag identity rule

The Git tag name **must equal** the engineering release identifier exactly.

---

## 6. Versioning Strategy

### 6.1 Engineering program version model

| Version band | Meaning |
|--------------|---------|
| `v0.x` | Pre-complete Engineering Architecture Program milestones — incremental authority bundles |
| `v1.0` | Declared Engineering Architecture Program completion milestone |

`v0.x` releases document **progressive authority accumulation**. `v1.0` documents **program completion** — not implementation authorization.

### 6.2 Version increment rules

| Event | Version action |
|-------|----------------|
| New authority bundle release | Increment minor (`v0.1` → `v0.2` → `v0.3`) |
| Engineering Architecture Program completion | Advance to `v1.0` |
| Post-v1.0 evolution | Separate governance act required — not defined by this draft |

Minor version increments correspond to **planned release roadmap positions** (§15). Ad hoc version numbers are prohibited.

### 6.3 Authority document versioning

Individual engineering authority documents carry version identity in **document metadata and version history** — not in canonical filenames (`REPOSITORY_STANDARDS.md` §8.5, §9.1).

Release version (`engineering-v0.2-core-architecture`) is a **bundle identifier** — not a substitute for per-document version history.

---

## 7. Release Lifecycle

### 7.1 Lifecycle stages

```
PLANNED
    → ELIGIBLE (all bundled authorities published)
        → MANIFEST PREPARED
            → TAG CREATED
                → GITHUB RELEASE PUBLISHED
                    → CONTINUITY RECORDED
```

| Stage | Meaning |
|-------|---------|
| **PLANNED** | Release position declared; bundled authorities may remain unpublished |
| **ELIGIBLE** | All bundled authorities published; publication checkpoints verified |
| **MANIFEST PREPARED** | Release manifest authored at `docs/engineering/releases/` per §9 |
| **TAG CREATED** | Git tag applied to verified publication checkpoint commit |
| **GITHUB RELEASE PUBLISHED** | GitHub Release created with mandatory release notes |
| **CONTINUITY RECORDED** | `CURSOR_HANDOFF.md` and strategic governance updated per publication governance |

### 7.2 Lifecycle authority

| Stage | Creates authority? |
|-------|-------------------|
| PLANNED | No |
| ELIGIBLE | No |
| MANIFEST PREPARED | No |
| TAG CREATED | No |
| GITHUB RELEASE PUBLISHED | No |
| CONTINUITY RECORDED | No — records milestone only |

### 7.3 Release execution boundary

Creating a Git tag or GitHub Release is an **execution act** governed by this strategy. Execution requires:

1. Separate explicit authorization to perform release operations;
2. Verification that all eligibility conditions (§8) are satisfied;
3. Prepared release manifest (§9, §11).

This strategy document **does not execute** releases.

### 7.4 Retrospective Engineering Release reconstruction

This section defines a bounded exception for reconstructing missed Engineering Architecture releases. It applies only when a previously required Engineering Architecture milestone was achieved in repository history but the required Engineering Release was not executed at that time.

This draft amendment is classified as **Repository Maintenance → Release Maintenance** under `REPOSITORY_STANDARDS.md` §7.8. It does not reopen Phase 3, does not belong to Phase 4, does not authorize implementation, and does not authorize release reconstruction execution.

Release Maintenance may define and amend release governance. It may not itself create release manifests, Git tags, or GitHub Releases. Retrospective release reconstruction remains a separate Release Lifecycle requiring explicit release execution authorization.

The retrospective reconstruction amendment becomes binding only after independent review, publication, and required continuity synchronization. Draft and review-candidate text remains non-binding. Routing, STOP conditions, authority ownership, and current binding authority interpretation are governed by `REPOSITORY_STANDARDS.md` §7.8; current binding authority remains the latest published Repository Authority on `main`.

Normal forward Engineering Releases are unchanged:

1. The manifest exists in the release checkpoint.
2. The tag points to that release checkpoint.
3. The GitHub Release follows the tag.

Retrospective reconstructed Engineering Releases use a separate contract:

1. The manifest is committed and pushed on current synchronized `main`.
2. The tag points to the verified historical milestone boundary.
3. The GitHub Release is published at the actual reconstruction date.
4. Current binding authority remains the latest published Repository Authority on `main`.

#### 7.4.1 Definition

A **Retrospective Engineering Release** is a current, explicitly authorized publication act that reconstructs a previously achieved Engineering Architecture milestone whose required release was not executed at the time.

Retrospective reconstruction:

- Does not claim the release was historically published;
- Does not create Engineering Authority;
- Does not amend the historical milestone;
- Does not authorize implementation;
- Does not authorize the next engineering phase.

#### 7.4.2 Applicability

Retrospective reconstruction is permitted only when all conditions below are satisfied:

- The release was required by Repository Authority;
- The milestone scope is known;
- A deterministic historical milestone boundary can be proven;
- The release identifier is unambiguous;
- Reconstruction is explicitly authorized;
- All earlier release positions are complete or reconstructed;
- The working tree is clean at every execution checkpoint;
- Local and remote repository state are synchronized.

If any condition fails: **STOP. Do not guess.**

#### 7.4.3 Historical Milestone Boundary

A **Historical Milestone Boundary** is the exact Git commit that proves the repository state where the Engineering Architecture milestone scope was achieved.

Every reconstructed release must identify:

- Exact historical milestone boundary commit;
- Historical milestone date;
- Milestone scope;
- Authority inventory publication-complete at that boundary;
- Git evidence supporting the boundary.

The historical boundary is evidence of milestone completion. It is not evidence that the GitHub Release was published at that time.

#### 7.4.4 Tag semantic contract

The reconstructed engineering release tag:

- Points to the verified historical milestone boundary commit;
- Identifies the released historical repository content state;
- Must be annotated;
- Must use the authoritative release identifier;
- Must not be moved, recreated, overwritten, or force-pushed.

`git checkout <engineering-release-tag>` returns the historical milestone snapshot.

The tag is lineage and audit evidence. It does not reactivate obsolete authority and does not become the current source of truth.

#### 7.4.5 Manifest timing exception

The normal rule remains: Release Manifests exist before or with tag creation.

For an explicitly authorized retrospective Engineering Release reconstruction, the manifest must be committed and pushed to synchronized `main` before the tag is created, but the tag may point to the verified historical milestone boundary commit rather than the manifest commit.

This exception applies only to formally authorized retrospective reconstruction. It must not be used for normal forward release execution.

#### 7.4.6 Manifest classification

A retrospective release manifest is:

- Release evidence;
- Milestone governance metadata;
- Continuity evidence;
- Not Engineering Architecture Authority.

The manifest must not create, modify, replace, reinterpret, or supersede Engineering Authority.

#### 7.4.7 Mandatory retrospective manifest fields

Each retrospective release manifest must record at minimum:

- Release identifier;
- Release title;
- Release classification;
- Explicit `RETROSPECTIVELY RECONSTRUCTED` status;
- Milestone name;
- Milestone scope;
- Historical milestone boundary commit;
- Historical milestone date;
- Reconstruction manifest commit;
- Reconstruction publication date;
- Annotated tag;
- GitHub Release title;
- GitHub Release URL after publication;
- Included authority inventory;
- Publication status at historical boundary;
- Later corrections and amendments;
- Continuity-only changes;
- Current binding authority paths;
- Latest relevant current binding checkpoints;
- Repository branch;
- Repository synchronization status;
- Validation result;
- Supersession warning;
- Implementation status;
- Phase 4 status;
- Next required release position.

#### 7.4.8 Date semantics

Retrospective release records must distinguish:

- Historical milestone date;
- Manifest commit date;
- Annotated tag creation date;
- GitHub Release publication date;
- Continuity synchronization date.

Backdating is prohibited. The official release publication date is the actual GitHub Release publication date. The historical milestone date must be recorded separately.

#### 7.4.9 GitHub Release semantics

The GitHub Release for a retrospective reconstructed release must:

- Attach to the historical milestone tag;
- Be published on the actual reconstruction date;
- Be explicitly labeled `Retrospectively reconstructed release`;
- Reference the manifest commit;
- Disclose the historical boundary commit;
- Disclose later corrections;
- Reference current binding authorities;
- Warn that source archives represent historical lineage snapshots and may contain superseded authority;
- Contain no implementation binaries or deployment assets unless separately authorized.

#### 7.4.10 Current Binding Authority protection

Historical release tags are lineage and audit evidence. They do not reactivate obsolete authority and do not become the current source of truth.

Current binding authority is always determined from the latest published Repository Authority on `main`. Release manifests and GitHub Release notes must reference current binding authority paths and explicitly disclose later corrections and amendments.

#### 7.4.11 Release order

Retrospective reconstruction must preserve both semantic roadmap order and reconstruction publication order.

Mandatory sequence:

1. `engineering-v0.1-foundation`
2. `engineering-v0.2-core-architecture`
3. `engineering-v0.3-operations`
4. `engineering-v1.0`

Skipping, bundling, or parallel publication is prohibited.

#### 7.4.12 Independent checkpoints

Each reconstructed release is an independent checkpoint. Required lifecycle:

1. Repository initialization.
2. Clean working-tree verification.
3. Branch and remote synchronization verification.
4. Historical boundary verification.
5. Authority inventory verification.
6. Manifest authoring.
7. Independent manifest validation.
8. Manifest commit.
9. Push and synchronization verification.
10. Annotated historical tag creation.
11. Explicit tag push.
12. GitHub Release creation.
13. Release verification.
14. Continuity synchronization.
15. Authorization to proceed to the next release position.

#### 7.4.13 Continuity synchronization

Continuity synchronization is required after each GitHub Release is verified and before the next release begins.

Continuity must record:

- Release identifier;
- Tag;
- Historical boundary commit;
- Manifest commit;
- GitHub Release URL;
- Verification result;
- Next permitted release position.

A separate continuity synchronization commit is preferred unless existing Repository Authority requires another model.

#### 7.4.14 Failure and stop conditions

Retrospective reconstruction must stop immediately when:

- Historical boundary cannot be proven;
- Authority inventory does not match the proposed milestone;
- Manifest and Git evidence disagree;
- Working tree is not clean;
- Unrelated changes exist during execution;
- Local and remote branches diverge;
- Tag already exists;
- GitHub Release already exists;
- Prior release verification failed;
- Later corrections cannot be classified;
- Release order would be violated;
- Current binding authority cannot be identified.

Default: **STOP. Do not guess.**

#### 7.4.15 Prohibited actions

Retrospective reconstruction explicitly prohibits:

- Rewriting historical commits;
- Synthetic reconstruction of historical trees;
- Backdating;
- Tagging the current completion commit as every earlier release;
- Moving or overwriting tags;
- Force-pushing;
- Presenting a reconstructed release as historically published;
- Using historical tagged snapshots as current binding authority;
- Creating releases out of order;
- Creating manifests after tag creation;
- Modifying Engineering Authority during release reconstruction;
- Authorizing implementation or Phase 4 through a release.

#### 7.4.16 Scope limitation

This policy applies only to explicitly authorized retrospective Engineering Architecture release reconstruction.

It does not automatically apply to:

- Product Design releases;
- Implementation releases;
- Deployment releases;
- Future forward engineering releases;
- Post-v1.0 architecture evolution.

Broader application requires separate authorization or amendment.

---

## 8. Release Eligibility

A release may be created only when **all** eligibility conditions are satisfied. **No release may bypass these conditions.** Partial satisfaction is insufficient. Release execution must halt until every condition is verified.

### 8.1 Authority eligibility

| # | Condition |
|---|-----------|
| E-1 | Every authority listed in release scope is **PUBLISHED** with active binding authority |
| E-2 | Every bundled authority has **passed independent review** with outcome **APPROVED** where required |
| E-3 | **Publication checkpoint** for each bundled authority is **COMPLETE** per `REPOSITORY_STANDARDS.md` §7.6 |
| E-4 | No bundled authority remains in DRAFT or Review Candidate status |
| E-5 | All bundled authorities exist at canonical paths under `docs/engineering/` |

### 8.2 Repository eligibility

| # | Condition |
|---|-----------|
| E-6 | Publication commits for all bundled authorities are present in `main` history |
| E-7 | Local repository HEAD **equals** remote `origin/main` at release checkpoint — no divergence |
| E-8 | Repository **working tree is clean** at release execution checkpoint — no uncommitted changes |
| E-9 | Release manifest is prepared and committed before or with tag creation; retrospective reconstruction may use the bounded manifest timing exception in §7.4.5 |

### 8.3 Governance eligibility

| # | Condition |
|---|-----------|
| E-10 | Release scope matches an approved position in the official release roadmap (§15) |
| E-11 | Release does not bundle authorities from a future roadmap position |
| E-12 | **Roadmap synchronized** — `MASTER_ROADMAP.md` reflects current program status for the release milestone |
| E-13 | **Continuity synchronized** — `CURSOR_HANDOFF.md` reflects release checkpoint state, bundled authorities, and next authorized step; retrospective reconstruction records verified release results after GitHub Release publication per §7.4.13 |
| E-14 | Product Design Standard v1.0 remains frozen — engineering release does not modify product authority |
| E-15 | **Implementation remains NOT AUTHORIZED** — release does not imply implementation readiness |

### 8.4 Prohibited release conditions

| Condition | Prohibition |
|-----------|-------------|
| Unpublished authority in bundle | Release blocked |
| Partial bundle from future roadmap position | Release blocked |
| Release ahead of publication | Release blocked |
| Release substituting for publication | Release blocked |
| Product authority in engineering bundle | Release blocked |

### 8.5 Release integrity rules

Release integrity requires that milestone packaging reflects **exact repository truth** at a verified checkpoint. A release **must not** be created when any integrity violation exists.

| # | Integrity violation | Effect |
|---|---------------------|--------|
| I-1 | Unpublished authority exists in declared release scope | Release blocked |
| I-2 | Any bundled authority remains **Draft** or **Review Candidate** | Release blocked |
| I-3 | Any bundled authority lacks completed publication checkpoint | Release blocked |
| I-4 | **Repository divergence** — local HEAD does not equal `origin/main` | Release blocked |
| I-5 | **Uncommitted changes** exist in working tree at checkpoint | Release blocked |
| I-6 | **Implementation artifacts** included in release scope (source code, deployment config, operational runbooks) | Release blocked |
| I-7 | **Release scope inconsistent** with official roadmap position or manifest declaration | Release blocked |
| I-8 | **Roadmap inconsistent** — `MASTER_ROADMAP.md` contradicts release milestone claims | Release blocked |
| I-9 | **Continuity inconsistent** — `CURSOR_HANDOFF.md` stale, missing checkpoint, or contradicts repository state | Release blocked |
| I-10 | Tag target commit precedes publication commit for any bundled authority, except where a formally authorized retrospective release uses a verified historical milestone boundary under §7.4 | Release blocked |
| I-11 | Multiple release manifests for one engineering release identifier | Release blocked |
| I-12 | Release manifest missing for an executed engineering release | Release blocked |

Integrity rules are **technology-neutral**. They apply regardless of tooling, hosting platform, or release automation method.

### 8.6 Eligibility attestation

Before tag creation, the release executor must attest that conditions E-1 through E-15 and integrity rules I-1 through I-12 are satisfied. Attestation is recorded in the release manifest. Attestation without verification is prohibited.

---

## 9. Release Manifest Governance

Every Engineering Release **must have exactly one Release Manifest**. Zero manifests or multiple manifests for the same release identifier are integrity violations (§8.5 I-11, I-12).

### 9.1 Purpose

The Release Manifest is the **authoritative repository record** of a declared engineering milestone bundle at release time.

It exists to:

| Purpose | Description |
|---------|-------------|
| **Scope declaration** | Record the closed set of bundled authorities for a named release |
| **Checkpoint evidence** | Bind release identifier to verified commit, publication evidence, and eligibility attestation |
| **Lineage preservation** | Preserve durable milestone record distinct from GitHub Release presentation |
| **Consumption reference** | Allow downstream programs to identify bundled engineering baseline without treating GitHub as authority source |

The Release Manifest **does not** create engineering authority. It **records** packaging of already-published authority.

### 9.2 Mandatory location

| Attribute | Rule |
|-----------|------|
| **Directory** | `docs/engineering/releases/` |
| **Filename pattern** | `{release-identifier}.md` |
| **Example** | `docs/engineering/releases/engineering-v0.1-foundation.md` |

Release manifest filenames **may** encode version numbers — mirroring product release manifest convention (`REPOSITORY_STANDARDS.md` §8.3).

Each engineering release identifier maps to **exactly one** manifest file at this location. Manifest relocation or duplication without governance amendment is prohibited.

### 9.3 Relationship to Git Tag

| Aspect | Rule |
|--------|------|
| **Identity binding** | Manifest release identifier **must equal** Git tag name |
| **Commit binding** | Manifest records commit SHA that tag will reference; retrospective manifests also record the reconstruction manifest commit (§7.4.7) |
| **Precedence** | Manifest is prepared **before or with** tag creation; retrospective reconstruction requires the manifest to be committed and pushed to synchronized `main` before historical tag creation (§7.4.5) |
| **Authority effect** | Git tag provides immutable checkpoint evidence — manifest provides scope and attestation context |

Git tag alone does not satisfy release governance. Tag plus manifest together satisfy checkpoint packaging requirements.

### 9.4 Relationship to GitHub Release

| Aspect | Rule |
|--------|------|
| **Dependency** | GitHub Release references Git tag created for the same release identifier |
| **Manifest primacy** | Repository manifest is authoritative for scope and evidence — GitHub Release is external presentation |
| **Content alignment** | GitHub Release notes must align with manifest claims — contradictions are integrity defects |
| **Authority effect** | GitHub Release is communication checkpoint only — never authority source |

GitHub Release **never replaces** Release Manifest. External release UI is subordinate to repository manifest record.

### 9.5 Relationship to Publication

| Aspect | Rule |
|--------|------|
| **Prerequisite** | Every authority in manifest scope must be **published before** manifest attests release eligibility |
| **Evidence** | Manifest records publication commit per bundled authority |
| **Non-substitution** | Manifest creation does not publish authority — publication completes independently per `REPOSITORY_STANDARDS.md` §7.6 |
| **Ordering** | Publication → eligibility verification → manifest preparation → tag → GitHub Release |

Publication creates authority. Manifest records that authority was already published and packaged at milestone.

### 9.6 Relationship to repository authority

| Statement | Rule |
|-----------|------|
| Authority source | Published engineering documents at canonical paths — not manifest, tag, or GitHub Release |
| Manifest role | Governance artifact recording milestone packaging — subordinate to published authorities |
| Downstream consumption | Consumers cite **published authority documents** for binding constraints; manifest identifies bundle membership only |
| Release never replaces authority | Prohibited — manifest, tag, and GitHub Release are evidence and communication layers only |

Repository authority remains in published documents. Release Manifest is **traceability and packaging evidence**, not a new authority tier.

### 9.7 One manifest rule

| Rule | Requirement |
|------|-------------|
| **Exactly one** | Each engineering release identifier has exactly one Release Manifest |
| **Immutable scope** | Published manifest scope is immutable — corrections require new governance act |
| **Committed record** | Manifest exists as committed repository artifact before release execution completes |

---

## 10. Release Scope

### 10.1 Scope definition

Release scope is the **closed set of published engineering authorities** packaged at a milestone. Scope is declared in:

1. This document (official roadmap — §15);
2. Per-release manifest at `docs/engineering/releases/{release-identifier}.md` (§9).

### 10.2 Scope rules

| Rule | Description |
|------|-------------|
| **Closed bundle** | Each release packages a complete declared bundle — no partial authority |
| **No retroactive scope change** | Published release scope is immutable; corrections require new governance act |
| **No authority splitting** | A single authority document appears in exactly one release bundle |
| **Ordered accumulation** | Later releases include only new authorities — they do not re-package prior bundles |
| **Product exclusion** | Product Design documents are never included in engineering releases |

### 10.3 Scope boundary

Engineering release scope covers **engineering authority documents only**:

- Constitutional and architectural authorities;
- Domain architecture and standards authorities;
- Implementation governance authorities (when published).

Engineering release scope **excludes**:

- Product Design Standard and chapters;
- Phase 0 analysis artifacts;
- Draft documents;
- Implementation code;
- Operational runbooks;
- Non-authoritative design notes.

---

## 11. Mandatory Release Contents and Release Evidence

Every executed engineering release **must** include the artifacts below and the **mandatory information** in §11.2. Release evidence must be complete, factual, and verifiable from repository state.

### 11.1 Required artifacts

| # | Artifact | Location / form |
|---|----------|-----------------|
| C-1 | **Release manifest** | `docs/engineering/releases/{release-identifier}.md` — exactly one per release (§9) |
| C-2 | **Git tag** | Tag name equals release identifier |
| C-3 | **GitHub Release** | Repository release object with structured release notes |
| C-4 | **Publication checkpoint reference** | Manifest records commit SHA for tag target |
| C-5 | **Bundled authority inventory** | Manifest lists every included authority with publication status |
| C-6 | **Traceability chain** | Manifest references governance basis and publication evidence |

### 11.2 Mandatory release evidence

Every engineering release — in manifest and aligned GitHub Release notes — **must** record the following information. This section governs **information content only**; formatting is not prescribed here.

| # | Evidence element | Required content |
|---|------------------|----------------|
| R-1 | **Summary** | Factual milestone description — what authority bundle this release packages |
| R-2 | **Included authorities** | Complete closed list of bundled engineering authorities with canonical paths |
| R-3 | **Publication commits** | Commit SHA for each bundled authority's publication checkpoint |
| R-4 | **Review status** | Independent review outcome per bundled authority — APPROVED where required |
| R-5 | **Publication status** | PUBLISHED confirmation per bundled authority at tag target commit |
| R-6 | **Repository state** | Tag identifier, tag target commit SHA, branch (`main`), working tree clean attestation, local HEAD equals `origin/main` confirmation |
| R-7 | **Roadmap position** | Official release roadmap identifier and milestone name (§15) |
| R-8 | **Known limitations** | Explicit statement of what bundled authorities do not cover; draft or unpublished authorities outside scope |
| R-9 | **Next milestone** | Next authorized roadmap position or program step — factual only, no forward commitments |

Missing mandatory evidence invalidates release integrity. Release execution must not proceed until all elements R-1 through R-9 are prepared.

Retrospective reconstructed releases must also record the additional evidence required by §7.4.7, including `RETROSPECTIVELY RECONSTRUCTED` status, historical milestone boundary, reconstruction manifest commit, reconstruction publication date, later corrections, current binding authority paths, supersession warning, implementation status, Phase 4 status, and next required release position.

### 11.3 Release manifest minimum structure

Each manifest must contain information satisfying §11.2. At minimum:

| Section | Content |
|---------|---------|
| Release identifier | Tag name and version |
| Release date | ISO date of GitHub Release creation |
| Governance basis | Authorizing governance documents |
| Scope statement | What this release packages |
| Bundled authorities | Table of documents with publication and review status |
| Repository checkpoint | Commit SHA at tag target; repository state attestation |
| Eligibility attestation | Confirmation that §8 conditions and §8.5 integrity rules are satisfied |
| Known limitations | Scope boundaries and exclusions |
| Next milestone | Subsequent roadmap position |
| Explicit non-implications | Implementation NOT AUTHORIZED; no product authority change |
| Related releases | Prior engineering releases in sequence |

### 11.4 Manifest naming convention

```
docs/engineering/releases/{release-identifier}.md
```

Example: `docs/engineering/releases/engineering-v0.1-foundation.md`

---

## 12. Release Notes Structure

GitHub Release notes must follow this structure.

### 12.1 Required sections

```markdown
# {release-identifier}

## Summary
One-paragraph milestone description.

## Engineering Authority Bundle
Table of included authorities with document paths.

## Repository Checkpoint
- Tag: `{release-identifier}`
- Commit: `{sha}`
- Branch: `main`

## Governance Basis
Upstream authorization references.

## What This Release Is
Communication checkpoint packaging already-published engineering authority.

## What This Release Is Not
- Does not create authority
- Does not authorize implementation
- Does not modify Product Design Standard
- Does not supersede repository documents

## Prior Engineering Releases
Ordered list of preceding engineering releases, or "First engineering release" for v0.1.

## Traceability
Publication commits for each bundled authority.
```

### 12.2 Release notes discipline

| Rule | Requirement |
|------|-------------|
| Factual only | Notes describe repository state — no forward commitments |
| No authority restatement | Notes reference documents — do not reproduce authority content |
| Explicit boundary | "What This Release Is Not" section is mandatory |
| Checkpoint precision | Commit SHA must be exact |

For retrospective reconstructed releases, GitHub Release notes must also satisfy §7.4.9 and explicitly disclose that the release is reconstructed, that its source archives represent the historical milestone snapshot, and that current binding authority is determined from latest published Repository Authority on `main`.

---

## 13. Release Traceability

### 13.1 End-to-end traceability model

Engineering releases extend the repository traceability chain (`REPOSITORY_STANDARDS.md` §10.1). The complete release traceability model is:

```
Repository Authority (published engineering documents)
    ↓
Publication (binding-authority transition per §7.6)
    ↓
Publication Commit (git checkpoint per authority)
    ↓
Release Manifest (exactly one — milestone scope and attestation)
    ↓
Git Tag (immutable checkpoint pointer)
    ↓
GitHub Release (external communication checkpoint)
    ↓
Repository Continuity (CURSOR_HANDOFF.md checkpoint integration)
    ↓
Roadmap (MASTER_ROADMAP.md program position when materially affected)
```

Each layer has a distinct role. **Release never replaces authority.** Authority terminates at published repository documents. All downstream layers are evidence, packaging, or continuity — not authority sources.

| Layer | Creates authority? | Role |
|-------|-------------------|------|
| Repository Authority | **Yes** — when published | Binding engineering governance |
| Publication | Completes authority transition | Integrates approved content into active authority |
| Publication Commit | No | Lineage evidence for publication act |
| Release Manifest | No | Milestone scope and eligibility attestation |
| Git Tag | No | Immutable checkpoint marker |
| GitHub Release | No | External milestone communication |
| Repository Continuity | No | Session and program state record |
| Roadmap | No — strategic record | Program position and phase status |

### 13.2 Traceability chain (operational view)

```
Governance basis
    → authority authoring
        → independent review
            → publication checkpoint
                → git publication commit
                    → release eligibility verification
                        → release manifest
                            → git tag
                                → GitHub Release
                                    → continuity synchronization
                                        → roadmap synchronization (when applicable)
```

### 13.3 Required traceability evidence

| Evidence type | Purpose |
|---------------|---------|
| Publication commit SHA per authority | Proves authority was published before release |
| Publication metadata in committed tree | Proves PUBLISHED status at release checkpoint |
| Release manifest in repository | Proves declared scope and mandatory evidence (§11.2) at release time |
| Tag-to-commit binding | Proves immutable checkpoint |
| GitHub Release record | Proves external communication checkpoint |
| Continuity checkpoint in `CURSOR_HANDOFF.md` | Proves post-release program state integration |
| Roadmap alignment in `MASTER_ROADMAP.md` | Proves strategic program position when milestone affects phase status |

### 13.4 Traceability verification

Before tag creation, release executor must verify:

1. `git show {sha}:{path}` returns PUBLISHED metadata for each bundled authority;
2. Publication commit for each authority is ancestor of tag target commit;
3. Release manifest accurately lists all bundled authorities and satisfies §11.2;
4. No bundled authority was modified after its publication commit without governance approval;
5. `CURSOR_HANDOFF.md` reflects tag target and release milestone;
6. `MASTER_ROADMAP.md` is consistent with release roadmap position (§15).

For retrospective reconstructed releases, the executor must additionally verify the historical milestone boundary, reconstruction manifest commit, date separation, later correction classification, current binding authority references, and release order requirements defined in §7.4 before tag creation.

### 13.5 Authority preservation rule

**Release never replaces authority.**

| Prohibited | Permitted |
|------------|-----------|
| Treating GitHub Release as binding engineering authority | Referencing published documents for binding constraints |
| Treating Release Manifest as architecture definition | Using manifest to identify bundled milestone scope |
| Treating Git tag as publication substitute | Using tag as checkpoint evidence |
| Inferring authority from release notes alone | Tracing authority through publication commits to published documents |

---

## 14. Publication Prerequisites

### 14.1 Per-authority prerequisites

Each authority must complete its own publication lifecycle before release eligibility:

| Prerequisite | Source |
|--------------|--------|
| Phase 3 program authorization | `PHASE_3_AUTHORIZATION.md` |
| Phase 3 evolution authorization (where applicable) | `PHASE_3_EVOLUTION_AUTHORIZATION.md` |
| Independent review approval | Per authority governance |
| Publication checkpoint complete | Per authority document status |
| Continuity integration | `CURSOR_HANDOFF.md` updated per `REPOSITORY_STANDARDS.md` |

### 14.2 Per-release prerequisites

| Prerequisite | Applies to |
|--------------|------------|
| All bundled authorities published | Every release |
| Release manifest prepared | Every release |
| Official roadmap position declared | Every release |
| Engineering release strategy published | Before first release execution |
| Repository synchronized | Before tag creation |

### 14.3 First release execution prerequisites

Before `engineering-v0.1-foundation` may be executed:

| # | Prerequisite | Current basis |
|---|--------------|---------------|
| P-1 | This document published as active governance | **Satisfied** — published as active release governance |
| P-2 | All Release 1 authorities published | Satisfied — five foundation authorities published |
| P-3 | Release manifest path convention established | Declared by this document — §9.2 |
| P-4 | Explicit release execution authorization | Not performed |

---

## 15. Official Release Roadmap

This section defines the **binding engineering release roadmap**. Release scope and ordering are fixed unless amended by future governance act.

### 15.1 Release 1 — `engineering-v0.1-foundation`

| Attribute | Value |
|-----------|-------|
| **Identifier** | `engineering-v0.1-foundation` |
| **Milestone** | Engineering foundation authorities |
| **Roadmap status** | ELIGIBLE — all bundled authorities published; release not executed |
| **Implementation implication** | None — NOT AUTHORIZED |

**Bundled authorities:**

| # | Document | Canonical path |
|---|----------|----------------|
| 1 | PROJECT_CONSTITUTION | `docs/engineering/PROJECT_CONSTITUTION.md` |
| 2 | ARCHITECTURE_PRINCIPLES | `docs/engineering/ARCHITECTURE_PRINCIPLES.md` |
| 3 | PLATFORM_ARCHITECTURE | `docs/engineering/PLATFORM_ARCHITECTURE.md` |
| 4 | SYSTEM_ARCHITECTURE | `docs/engineering/SYSTEM_ARCHITECTURE.md` |
| 5 | REPOSITORY_STANDARDS | `docs/engineering/REPOSITORY_STANDARDS.md` |

---

### 15.2 Release 2 — `engineering-v0.2-core-architecture`

| Attribute | Value |
|-----------|-------|
| **Identifier** | `engineering-v0.2-core-architecture` |
| **Milestone** | Core domain architecture and standards |
| **Roadmap status** | ELIGIBLE — all bundled authorities published; release not executed |
| **Implementation implication** | None — NOT AUTHORIZED |

**Bundled authorities:**

| # | Document | Canonical path |
|---|----------|----------------|
| 1 | PRODUCT_ARCHITECTURE | `docs/engineering/PRODUCT_ARCHITECTURE.md` |
| 2 | BACKEND_ARCHITECTURE | `docs/engineering/BACKEND_ARCHITECTURE.md` |
| 3 | FRONTEND_ARCHITECTURE | `docs/engineering/FRONTEND_ARCHITECTURE.md` |
| 4 | API_STANDARDS | `docs/engineering/API_STANDARDS.md` |
| 5 | DATABASE_ARCHITECTURE | `docs/engineering/DATABASE_ARCHITECTURE.md` |
| 6 | SECURITY_STANDARDS | `docs/engineering/SECURITY_STANDARDS.md` |
| 7 | DATABASE_STANDARDS | `docs/engineering/DATABASE_STANDARDS.md` |

---

### 15.3 Release 3 — `engineering-v0.3-operations`

| Attribute | Value |
|-----------|-------|
| **Identifier** | `engineering-v0.3-operations` |
| **Milestone** | Operations and cross-cutting mechanism architecture |
| **Roadmap status** | **PLANNED** |
| **Implementation implication** | None — NOT AUTHORIZED |

**Planned bundled authorities:**

| # | Document | Canonical path |
|---|----------|----------------|
| 1 | INFRASTRUCTURE_STANDARDS | `docs/engineering/INFRASTRUCTURE_STANDARDS.md` |
| 2 | OBSERVABILITY_ARCHITECTURE | `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` |
| 3 | INTEGRATION_ARCHITECTURE | `docs/engineering/INTEGRATION_ARCHITECTURE.md` |
| 4 | AUTHENTICATION_ARCHITECTURE | `docs/engineering/AUTHENTICATION_ARCHITECTURE.md` |
| 5 | AUTHORIZATION_ARCHITECTURE | `docs/engineering/AUTHORIZATION_ARCHITECTURE.md` |

Release 3 eligibility requires all five authorities to be published per `PHASE_3_EVOLUTION_AUTHORIZATION.md` §6 execution order.

---

### 15.4 Release 4 — `engineering-v1.0`

| Attribute | Value |
|-----------|-------|
| **Identifier** | `engineering-v1.0` |
| **Milestone** | Engineering Architecture Program completion |
| **Roadmap status** | **PLANNED** |
| **Implementation implication** | None — NOT AUTHORIZED; Phase 4 remains separate |

**Planned bundled authorities:**

| # | Document | Canonical path |
|---|----------|----------------|
| 1 | DEVELOPMENT_STANDARDS | `docs/engineering/DEVELOPMENT_STANDARDS.md` |
| 2 | AI_COLLABORATION_STANDARDS | `docs/engineering/AI_COLLABORATION_STANDARDS.md` |
| 3 | IMPLEMENTATION_GOVERNANCE | `docs/engineering/IMPLEMENTATION_GOVERNANCE.md` |

Release 4 eligibility requires all three authorities to be published and Phase 3 program completion governance act — separate from this release.

### 15.5 Roadmap ordering rule

Releases **must** be executed in roadmap order. Skipping a release position is prohibited. Combining release positions into a single tag is prohibited.

### 15.6 Cumulative authority coverage

| Release | New authorities | Cumulative published authorities |
|---------|-----------------|--------------------------------|
| v0.1 | 5 | 5 |
| v0.2 | 7 | 12 |
| v0.3 | 5 | 17 |
| v1.0 | 3 | 20 |

Cumulative count assumes full Phase 3 Evolution scope per `PHASE_3_EVOLUTION_AUTHORIZATION.md` §6.

---

## 16. Non-Goals

This strategy and engineering releases governed by it **explicitly do not**:

| # | Non-goal |
|---|----------|
| NG-1 | Create or modify engineering authority |
| NG-2 | Replace repository publication checkpoints |
| NG-3 | Redefine repository governance (`REPOSITORY_STANDARDS.md`) |
| NG-4 | Govern Product Design Standard releases |
| NG-5 | Authorize implementation, coding, deployment, or operations |
| NG-6 | Define implementation versioning or package release policy |
| NG-7 | Require a GitHub Release per authority publication |
| NG-8 | Substitute GitHub Release for independent review or publication approval |
| NG-9 | Modify Product Design Standard content or governance |
| NG-10 | Start Phase 4 — Product Development Methodology |
| NG-11 | Bundle product and engineering documents in a single release |
| NG-12 | Encode authority version identity in canonical authority filenames |

---

## 17. Future Evolution Policy

### 17.1 Strategy document evolution

Changes to this document require:

1. Impact assessment against `REPOSITORY_STANDARDS.md` and Phase 3 governance;
2. Independent governance review;
3. Publication checkpoint per repository standards;
4. Visible lineage in document version history.

### 17.2 Roadmap evolution

Changes to the official release roadmap (§15) require:

1. Explicit governance amendment — not silent edit;
2. Assessment of impact on ELIGIBLE and PLANNED release positions;
3. Continuity integration in strategic governance documents.

Retroactive re-bundling of already-released authority is prohibited.

### 17.3 Post-v1.0 engineering releases

Engineering releases beyond `engineering-v1.0` are **not defined** by this document. Any post-completion release policy requires a separate governance act after Phase 3 program completion.

### 17.4 Relationship to implementation releases

When implementation is authorized in a future phase, application deployment releases remain **separate** from engineering architecture releases. Engineering releases package **documentation authority** — not deployable artifacts.

---

## 18. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED — Engineering Release Strategy; Retrospective Engineering Release Reconstruction amendment active |
| **Document class** | Engineering Governance Document — not Engineering Architecture Authority |
| **Authority class** | Authoritative engineering release governance |
| **Binding authority** | Active — Retrospective Engineering Release Reconstruction amendment published as release governance |
| **Publication** | COMPLETE — Retrospective Engineering Release Reconstruction amendment published |
| **Phase** | Engineering Release Strategy — Phase 3 governance artifact |
| **Maintenance classification** | Repository Maintenance → Release Maintenance (`REPOSITORY_STANDARDS.md` §7.8) |
| **Independent review** | APPROVED — Retrospective Engineering Release Reconstruction amendment governance review and publication review complete |
| **Publication checkpoint** | COMPLETE — Retrospective Engineering Release Reconstruction amendment publication checkpoint recorded |
| **Program authorization** | Phase 3 authoring authorized (`PHASE_3_AUTHORIZATION.md`); Phase 3 evolution authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md`) |
| **Implementation** | NOT AUTHORIZED |
| **Supersedes** | Informal engineering release convention |
| **Subordinate to** | MASTER_ROADMAP.md · REPOSITORY_STANDARDS.md · ENGINEERING_HANDOFF.md · PHASE_3_AUTHORIZATION.md · PHASE_3_EVOLUTION_AUTHORIZATION.md |
| **Superior to** | Ad hoc release operations |
| **Does not authorize** | Git tag creation; GitHub Release creation; release manifest creation; engineering release execution; retrospective reconstruction execution; implementation; Phase 3 reopening; Phase 4 |
| **Prerequisites** | REPOSITORY_STANDARDS.md published, including Repository Maintenance Lifecycle §7.8 — satisfied |

---

**Document path:** `docs/engineering/ENGINEERING_RELEASE_STRATEGY.md`  
**Related:** `docs/engineering/REPOSITORY_STANDARDS.md` · `docs/design/MASTER_ROADMAP.md` · `docs/design/ENGINEERING_HANDOFF.md` · `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
