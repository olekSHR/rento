# Rento AI Collaboration Standards

**Status:** PUBLISHED - AI Collaboration Standards
**Authority class:** Authoritative AI collaboration engineering standards
**Binding authority:** Active - per REPOSITORY_STANDARDS.md section 7.6
**Publication:** COMPLETE
**Implementation:** NOT AUTHORIZED
**Program authorization:** Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A4, execution order position 8)
**Audience:** Engineering Architecture Program, Standards Authors, Engineering Leadership, AI Collaboration Reviewers, Security Reviewers, Implementation Reviewers
**Governance basis:** PROJECT_CONSTITUTION.md | ARCHITECTURE_PRINCIPLES.md | PLATFORM_ARCHITECTURE.md | SYSTEM_ARCHITECTURE.md | PRODUCT_ARCHITECTURE.md | BACKEND_ARCHITECTURE.md | FRONTEND_ARCHITECTURE.md | API_STANDARDS.md | DATABASE_ARCHITECTURE.md | DATABASE_STANDARDS.md | SECURITY_STANDARDS.md | INFRASTRUCTURE_STANDARDS.md | OBSERVABILITY_ARCHITECTURE.md | INTEGRATION_ARCHITECTURE.md | AUTHENTICATION_ARCHITECTURE.md | AUTHORIZATION_ARCHITECTURE.md | DEVELOPMENT_STANDARDS.md | ENGINEERING_RELEASE_STRATEGY.md | REPOSITORY_STANDARDS.md | ENGINEERING_HANDOFF.md | PHASE_3_AUTHORIZATION.md | PHASE_3_EVOLUTION_AUTHORIZATION.md | RENTO PRODUCT DESIGN STANDARD v1.0 (GD-016)

---

## 1. Purpose

This document defines **engineering standards for AI-assisted collaboration** in the Rento Engineering Architecture Program.

It establishes how AI tools, agents, prompts, generated suggestions, code edits, document edits, reviews, automation outputs, and tool-mediated reasoning may support engineering work without becoming repository authority, product authority, implementation authorization, review approval, security exception, publication act, release execution, or durable decision source.

This document answers:

- What AI Collaboration Standards own versus what Repository Standards, Development Standards, Security Standards, Product Authority, and future Implementation Governance own;
- How AI-assisted work must initialize from repository authority rather than chat memory, model memory, tool summaries, or prior-session assumptions;
- How AI-generated suggestions, code, documentation, reviews, and automation output are classified as subordinate artifacts;
- How AI collaboration preserves Product Authority, immutable domain rules, security boundaries, data classification, secrets, ownership, authorization, and implementation separation;
- How AI agents may use tools, shell commands, MCP resources, generated artifacts, and subagents without creating shadow governance or uncontrolled repository writes;
- What validation gates apply before AI-assisted outputs may be accepted by future authorized implementation or standards work;
- What invariants and prohibitions preserve repository truth, reviewability, safety, maintainability, and phase discipline.

AI Collaboration Standards are **collaboration governance** for engineering work. They are not AI product feature approval, not model selection policy, not prompt engineering methodology, not automation implementation, not development authorization, not release execution, and not Phase 4 methodology.

**Repository is the single source of truth.**

---

## 2. Authority Position

### 2.1 Position in engineering hierarchy

```
Strategic governance (MASTER_ROADMAP.md)
    -> Product governance (RENTO PRODUCT DESIGN STANDARD v1.0)
        -> Constitutional engineering authority (PROJECT_CONSTITUTION.md)
            -> Engineering principles (ARCHITECTURE_PRINCIPLES.md)
                -> Platform architecture (PLATFORM_ARCHITECTURE.md)
                    -> System architecture (SYSTEM_ARCHITECTURE.md)
                        |-- Published engineering authorities and standards
                        |-- Development Standards (DEVELOPMENT_STANDARDS.md)
                        |-- AI Collaboration Standards (this document)
                        `-- Implementation Governance (when published)
                            -> Implementation artifacts
```

AI Collaboration Standards sit below published product, constitutional, architecture, security, repository, and development authorities. They govern how AI assistance participates in engineering work. They do not grant authority to AI-generated content, authorize implementation, amend published documents, or create product capability approval.

### 2.2 Document role

| Upstream document | Defines | This document |
|-------------------|---------|---------------|
| PROJECT_CONSTITUTION.md | Repository truth, product authority supremacy, phase discipline, AI-assisted development as engineering scope only where authorized | Converts constitutional constraints into AI collaboration rules |
| ARCHITECTURE_PRINCIPLES.md | Traceability, reviewability, security by design, authority inheritance, documentation as architecture | Applies principles to AI-assisted work and generated outputs |
| REPOSITORY_STANDARDS.md | Repository lifecycle, working set construction, status honesty, publication workflow, non-authoritative sources, Review Type, and Validation Scope | Governs AI context initialization, repository truth discipline, and validation-scope selection |
| DEVELOPMENT_STANDARDS.md | Development gates, change classification, traceability, testing, review, repository hygiene | Specializes development discipline for AI-assisted collaboration |
| SECURITY_STANDARDS.md | Secrets, credentials, classification, security events, trust boundaries, least privilege | Governs AI tool use, context sharing, generated output, and data exposure |
| PRODUCT_ARCHITECTURE.md | Product meaning, immutable domain rules, future capability restraint, Performance Integrity | Prevents AI assistance from redefining product behavior or authorizing AI product features |
| AUTHENTICATION_ARCHITECTURE.md | Identity context establishment and client non-authority | Prevents AI outputs from weakening identity-context boundaries |
| AUTHORIZATION_ARCHITECTURE.md | Authorization decision boundaries, delegated scope, domain final authority | Prevents AI outputs from bypassing authorization and ownership rules |
| OBSERVABILITY_ARCHITECTURE.md | Evidence, proof chains, classification, failure visibility | Defines proof obligations for AI-assisted changes where material |
| INTEGRATION_ARCHITECTURE.md | External mediation and external fact subordination | Treats AI tools and external model services as non-authoritative external support unless separately governed |
| ENGINEERING_RELEASE_STRATEGY.md | Release execution boundary | Prevents AI-assisted work from creating tags, releases, or release authority |

### 2.3 What this document owns

- AI collaboration purpose and responsibility boundaries;
- AI context initialization and Minimum Working Set discipline;
- AI-generated output classification;
- Prompt, instruction, and tool-use governance at standards level;
- AI-assisted authoring, editing, review, and verification rules;
- AI-assisted code and documentation change gates;
- AI safety, security, data exposure, and secret-exclusion rules;
- AI use of shell tools, MCP tools, subagents, generated artifacts, and automation outputs;
- Human accountability and review obligations for AI-assisted work;
- AI collaboration validation gates;
- AI collaboration invariants (AIC-INV-*).

### 2.4 What this document does not own

- Product AI features, AI listing features, AI chat, recommendations, analytics, personalization, or marketplace-facing AI capabilities;
- Product meaning, role semantics, lifecycle meaning, moderation meaning, trust meaning, or Product Design Standard evolution;
- Engineering implementation authorization, coding tasks, deployment, release execution, Git tag creation, or production operations;
- Model provider selection, model ranking, prompt optimization methodology, evaluation benchmark selection, AI SDK selection, token policy, or vendor contract policy;
- AI runtime architecture, AI data pipeline design, AI observability implementation, AI infrastructure topology, or AI operational runbooks;
- Repository Standards, Development Standards, Security Standards, or Implementation Governance replacement;
- Legal, HR, procurement, vendor management, privacy policy, or organizational AI-use policy outside engineering repository governance.

### 2.5 Amendment

After publication, this document may be amended only through repository-governed review per `REPOSITORY_STANDARDS.md`. Amendments must preserve product authority supremacy, Engineering Constitution compliance, Repository Authority, Security Standards data and secret governance, Development Standards gates, Integration Architecture mediation, implementation authorization separation, and Phase 3 discipline.

---

## 3. Relationship To Upstream Authority

### 3.1 Repository Authority consumption

AI collaboration must initialize from repository authority. Chat memory, model memory, transcript summaries, generated plans, tool output, and prior AI responses are not authority.

| Repository obligation | AI collaboration treatment |
|-----------------------|----------------------------|
| Repository is the single source of truth | AI agents must read required repository documents before authoring authority-sensitive work |
| Minimum Working Set | AI context is limited to documents required for correctness |
| Status honesty | AI must not claim DRAFT, APPROVED, PUBLISHED, ACTIVE, or COMPLETE without repository basis |
| Non-authoritative sources | Chat, model memory, issue comments, tool output, and generated summaries inform only |
| Publication workflow | AI must not perform publication, commit, push, tag, or release unless explicitly authorized |
| Continuity metadata | AI must preserve current checkpoint and next authorized step without creating shadow authority |

### 3.2 Development Standards consumption

Development Standards are published and binding. AI Collaboration Standards specialize them for AI-assisted work.

| Development Standards obligation | AI collaboration treatment |
|----------------------------------|----------------------------|
| Every implementation change traces to authority | AI-generated edits must cite owning repository authority |
| Change class declared before work | AI-assisted work must classify product, architecture, security, data, contract, infrastructure, integration, observability, or local scope |
| Tests prove authority preservation | AI-generated code or docs must include appropriate verification evidence when implementation is authorized |
| Repository hygiene | AI must not absorb unrelated working tree changes or generated noise |
| Secrets excluded | AI must not expose, request, infer, emit, log, or commit secrets |
| Existing implementation is not authority | AI must not treat code precedent as higher authority than repository standards |

### 3.3 Product Authority consumption

AI assistance must preserve product meaning and future capability restraint. AI collaboration governance does not approve AI product features.

| Product constraint | AI collaboration treatment |
|--------------------|----------------------------|
| Future capabilities require independent evaluation | AI product features remain out of scope unless separately authorized |
| Roles are user, realtor, admin | AI outputs must not add roles or expand role meaning |
| Realtor owns only own listings | AI outputs must preserve owner-scoped mutation |
| Admin executes delegated governance only | AI outputs must not create ambient admin authority |
| Public exposure only eligible state | AI outputs must preserve visibility eligibility |
| Performance Integrity | AI suggestions must not encode false completion or misleading responsiveness |

### 3.4 Security Standards consumption

AI collaboration introduces additional exposure and trust risks. Security Standards remain authoritative.

| Security obligation | AI collaboration treatment |
|---------------------|----------------------------|
| Secrets never live in artifacts | AI prompts, generated output, logs, diffs, and commits must exclude secret values |
| Classification before exposure | AI context shared with tools or agents must respect data classification |
| External systems are untrusted until validated | External AI tools are support systems, not authority |
| Least privilege | AI tool access must be scoped to task need |
| Security event eligibility | AI-assisted boundary violations or secret exposure risks require security routing |
| Evidence is not truth | AI-generated summaries and review notes are evidence candidates, not authoritative state |

### 3.5 Architecture consumption

AI collaboration must preserve architecture boundaries. AI suggestions must not silently move responsibilities across frontend, backend, API, persistence, infrastructure, integration, authentication, authorization, observability, or domain boundaries.

### 3.6 Implementation boundary

This document governs AI-assisted collaboration. It does not authorize AI implementation, AI product features, code generation into production, deployment automation, release execution, or Phase 4 methodology.

---

## 4. AI Collaboration Principles

### AIC-PRIN-1 - Repository Authority Before Model Output

AI output is subordinate to repository authority. If model output conflicts with repository documents, repository authority prevails.

### AIC-PRIN-2 - AI Assistance Is Not Governance

AI tools may propose, summarize, transform, search, or edit under instruction. They do not approve content, authorize implementation, complete reviews, publish documents, or grant binding authority.

### AIC-PRIN-3 - Context Must Be Constructed, Not Assumed

AI agents must build a Minimum Working Set from repository evidence. Prior chat context, memory, and generated summaries cannot replace repository reading.

### AIC-PRIN-4 - Generated Output Requires Human-Accountable Review

AI-generated code, documentation, plans, reports, reviews, and tool outputs require accountable review against repository authority before acceptance.

### AIC-PRIN-5 - Security And Classification Boundaries Apply To AI Context

AI prompts, attachments, tool calls, generated outputs, logs, and transcripts must preserve secrets, credentials, classification, privacy, and trust boundaries.

### AIC-PRIN-6 - AI Must Preserve Ownership Boundaries

AI assistance must not relocate product meaning, domain truth, ownership validation, moderation, authorization policy, session authority, persistence ownership, or integration mediation to unauthorized layers.

### AIC-PRIN-7 - AI Cannot Bypass Phase Discipline

AI assistance must not treat standards authoring, review approval, or publication as implementation authorization. Implementation remains separately authorized.

### AIC-PRIN-8 - AI Output Must Be Traceable

Material AI-assisted claims and changes must identify repository evidence, affected authority, changed files, verification performed, and residual risks.

### AIC-PRIN-9 - AI Tooling Must Remain Replaceable

AI tools, models, agents, prompts, and automation workflows are replaceable support mechanisms. Standards must not depend on a specific model or vendor for authority.

### AIC-PRIN-10 - AI Must Not Create Shadow Systems Of Record

AI transcripts, generated reports, embeddings, caches, memories, or external tool state must not become parallel product, engineering, security, repository, or implementation authority.

---

## 5. Responsibility Boundaries

### 5.1 Core responsibility model

| Responsibility | Owner | AI collaboration role |
|----------------|-------|-----------------------|
| Product meaning | Product Authority | Consume and preserve; never redefine |
| Repository lifecycle | Repository Standards | Follow status, working set, publication, and traceability workflow |
| Development discipline | Development Standards | Apply gates to AI-assisted work |
| Security policy and data classification | Security Standards | Preserve classification, secrets, least privilege, and trust boundaries |
| Architecture boundaries | Published engineering authorities | Consume and preserve; never silently amend |
| AI-generated suggestions | AI tool or agent as subordinate support | Inform only; require review and repository trace |
| AI-assisted edits | Human accountable contributor or authorized agent task | Must remain within authorized scope |
| Tool output | Tool-specific evidence | Validate before use; not authority by itself |
| Review decision | Independent reviewer or owning governance process | AI review may assist but not approve |
| Publication, commit, push, tag, release | Repository workflow under explicit authorization | AI may execute only when explicitly authorized |

### 5.2 AI Collaboration Standards own

- AI assistance boundaries;
- AI context construction discipline;
- AI-generated output classification;
- AI tool-use and prompt-use standards;
- AI-assisted review and verification obligations;
- AI collaboration security and repository hygiene gates;
- AI collaboration invariants and prohibited patterns.

### 5.3 AI Collaboration Standards must not own

- Product AI capability approval;
- AI implementation architecture;
- AI model/vendor/tool selection;
- Repository lifecycle definitions;
- Development gates outside AI-specific specialization;
- Security policy redefinition;
- Product, domain, architecture, implementation, or release authority.

---

## 6. AI Output Classification

### 6.1 Classification purpose

AI outputs must be classified before they are used so reviewers know whether the output is a suggestion, evidence, draft, edit, or attempted authority claim.

### 6.2 Output classes

| Output class | Meaning | Authority posture |
|--------------|---------|-------------------|
| Suggestion | Proposed text, code, plan, or approach | Non-authoritative until reviewed |
| Search summary | AI or tool summary of repository evidence | Must be verified against source files |
| Draft artifact | AI-authored document or code under authorized scope | DRAFT until reviewed and accepted |
| Review assistance | AI-generated findings or risks | Informational; reviewer decides |
| Transformation | Formatting, refactor, migration, or mechanical edit | Must preserve source meaning and be diff-reviewed |
| Generated test | AI-created verification artifact | Must be run or reviewed before treated as evidence |
| Tool execution output | Shell, MCP, lint, test, or generated result | Evidence only; must be scoped and interpreted |
| Memory or transcript | Prior chat, model memory, or session history | Non-authoritative; cannot replace repository |

### 6.3 Output rules

| Rule | Requirement |
|------|-------------|
| **AIC-OUT-1** | AI output must not be treated as authority without repository-backed review |
| **AIC-OUT-2** | AI summaries must cite or be checked against source repository documents |
| **AIC-OUT-3** | AI-generated edits require diff review before completion |
| **AIC-OUT-4** | AI-generated tests require execution or explicit review before evidence claims |
| **AIC-OUT-5** | AI-generated review findings do not approve or reject documents by themselves |
| **AIC-OUT-6** | AI output that cannot be traced to repository evidence is advisory only |

---

## 7. Context Initialization Standards

### 7.1 Context purpose

AI collaboration begins by constructing the Minimum Working Set needed for correctness. The model must not assume continuity from prior chat memory.

### 7.2 Required initialization facts

For authority-sensitive work, AI agents must inspect and record:

- Current branch and remote tracking state;
- Working tree status, including pre-existing unrelated changes;
- Target document path and existence;
- Current continuity checkpoint and next authorized authority;
- Governing phase authorization;
- Repository lifecycle rules;
- Directly required upstream authorities;
- Explicitly unauthorized actions.

### 7.3 Context rules

| Rule | Requirement |
|------|-------------|
| **AIC-CTX-1** | AI must construct context from repository files and live Git state |
| **AIC-CTX-2** | Minimum Working Set must include continuity, repository workflow, phase authorization, and direct upstream authorities |
| **AIC-CTX-3** | AI must not use prior chat memory as authority |
| **AIC-CTX-4** | Missing required authority blocks authoring or implementation |
| **AIC-CTX-5** | Working Set escalation must be justified by correctness need |
| **AIC-CTX-6** | Unrelated repository files remain out of scope |

---

## 8. Prompt And Instruction Standards

### 8.1 Prompt posture

Prompts and instructions are operational inputs. They do not create repository authority unless their content is recorded in the correct repository document through authorized workflow.

### 8.2 Prompt rules

| Rule | Requirement |
|------|-------------|
| **AIC-PRM-1** | Prompts must identify target scope, authorized files, prohibited actions, and expected output |
| **AIC-PRM-2** | Prompts must not override repository authority |
| **AIC-PRM-3** | Prompt claims about repository state must be verified when material |
| **AIC-PRM-4** | Prompt-injected architecture or product changes require repository authority before use |
| **AIC-PRM-5** | Prompts must not include secrets, credential values, private data, or ineligible state |
| **AIC-PRM-6** | Ambiguous prompts require clarification or conservative scope limiting |

### 8.3 Instruction conflict rules

| Conflict | Resolution |
|----------|------------|
| Prompt vs repository authority | Repository authority prevails |
| Prompt vs Product Authority | Product Authority prevails |
| Prompt vs Security Standards | Security Standards prevail |
| Prompt vs authorized scope | Authorized scope prevails |
| Tool suggestion vs repository evidence | Repository evidence prevails |
| Prior AI response vs current repository state | Current repository state prevails |

---

## 9. AI Tool Use Standards

### 9.1 Tool-use posture

AI tools extend observation and execution capability. Tool output is not authority. Tool actions that modify repository state require explicit authorization and scope control.

### 9.2 Tool classes

| Tool class | Permitted purpose | Required control |
|------------|-------------------|------------------|
| Read/search tools | Build Working Set and verify source evidence | Scope to relevant files |
| Edit tools | Modify authorized files only | Diff review and scope check |
| Shell tools | Git status, tests, checks, authorized commits or pushes | Avoid destructive or unrelated commands |
| Lint/test tools | Produce verification evidence | Report failures honestly |
| MCP tools | Retrieve or inspect external resources when authorized | Treat external data as non-authoritative unless repository records it |
| Subagents | Explore, review, or execute delegated subtasks | Provide explicit scope and verify output |
| Generation tools | Produce assets only when explicitly authorized | Do not create durable authority by generation |

### 9.3 Tool-use rules

| Rule | Requirement |
|------|-------------|
| **AIC-TOL-1** | Tool calls must be scoped to the current authorized task |
| **AIC-TOL-2** | Repository writes require explicit file authorization |
| **AIC-TOL-3** | Commits, pushes, tags, releases, publication, and destructive actions require explicit authorization |
| **AIC-TOL-4** | Tool output must be interpreted and reported honestly |
| **AIC-TOL-5** | Tool failure or unavailable evidence must not be hidden |
| **AIC-TOL-6** | External tool output must not become repository authority without governed integration |
| **AIC-TOL-7** | AI must preserve unrelated user changes and dirty working tree state |

---

## 10. AI-Assisted Authoring Standards

### 10.1 Authoring posture

AI may draft, edit, reorganize, or correct repository documents only within explicit authorization. AI authoring does not complete independent review, publication, or binding authority activation.

### 10.2 Authoring rules

| Rule | Requirement |
|------|-------------|
| **AIC-AUT-1** | AI-authored documents must declare honest lifecycle metadata |
| **AIC-AUT-2** | AI authoring must consume upstream authority by reference and inheritance |
| **AIC-AUT-3** | AI must not redesign Product Authority, Repository Authority, or published architecture unless explicitly authorized |
| **AIC-AUT-4** | AI must not duplicate authoritative definitions owned upstream |
| **AIC-AUT-5** | AI must preserve implementation, publication, release, and Phase 4 boundaries |
| **AIC-AUT-6** | AI must not create additional authority documents beyond the target |
| **AIC-AUT-7** | AI must leave the document ready for independent review, not self-approved |

### 10.3 Targeted correction rules

When AI performs targeted corrections:

- Correction scope must be enumerated before editing;
- Only identified lifecycle, publication, terminology, or consistency defects may be changed;
- Architectural content must remain unchanged unless explicitly authorized;
- Duplicated metadata must be synchronized consistently;
- Final report must distinguish correction from publication.

---

## 11. AI-Assisted Code And Implementation Standards

### 11.1 Implementation posture

AI-generated code remains implementation artifact. It may be created only when implementation is separately authorized. This document does not authorize code generation into production or feature work.

### 11.2 Code assistance rules

| Rule | Requirement |
|------|-------------|
| **AIC-COD-1** | AI-generated code requires implementation authorization before repository modification |
| **AIC-COD-2** | AI-generated code must satisfy Development Standards gates |
| **AIC-COD-3** | AI must not infer product behavior from code precedent |
| **AIC-COD-4** | AI must preserve backend, frontend, API, persistence, security, auth, integration, and observability boundaries |
| **AIC-COD-5** | AI must not introduce dependencies without declared purpose and trust review |
| **AIC-COD-6** | AI-generated tests must cover authority-sensitive forbidden paths where applicable |
| **AIC-COD-7** | AI must report unrun tests and unverified assumptions |

### 11.3 Code assistance prohibitions

- Business logic moved into routers, API syntax, frontend presentation, persistence, infrastructure, or observability;
- Ownership checks omitted or inferred from client state;
- Authorization bypasses added for convenience;
- Secrets embedded in source, tests, generated output, or logs;
- External provider responses directly mutating domain truth;
- AI-generated migrations without ownership, compatibility, and data classification review;
- AI-generated code accepted without human-accountable review.

---

## 12. AI-Assisted Review Standards

### 12.1 Review posture

AI may assist review by identifying possible issues, summarizing diffs, mapping changes to authority, or proposing tests. AI review does not replace independent review or governance approval.

### 12.2 Review rules

| Rule | Requirement |
|------|-------------|
| **AIC-REV-1** | AI review findings must be grounded in repository evidence and changed files |
| **AIC-REV-2** | AI review must prioritize correctness, security, authority preservation, and test gaps |
| **AIC-REV-3** | AI review must distinguish findings from questions and residual risk |
| **AIC-REV-4** | AI review must not approve publication or implementation by itself |
| **AIC-REV-5** | AI review must not fabricate test results or repository evidence |
| **AIC-REV-6** | AI review must identify when required evidence is unavailable |
| **AIC-REV-7** | AI-assisted review must use Validation Scope selected under `REPOSITORY_STANDARDS.md` and must escalate uncertainty rather than silently narrow scope |

### 12.3 Review result classification

| Result | Meaning |
|--------|---------|
| Finding | Concrete defect or risk grounded in file evidence |
| Open question | Required human or governance decision |
| Residual risk | Known uncertainty after review |
| No issue found | AI did not identify issue; not an approval by itself |
| Evidence unavailable | Review cannot verify a required claim |

---

## 13. AI Security And Data Handling Standards

### 13.1 Security posture

AI collaboration must apply Security Standards to prompt content, attached files, tool output, generated edits, logs, transcripts, and external AI services.

### 13.2 Data handling rules

| Rule | Requirement |
|------|-------------|
| **AIC-DAT-1** | Secret values must not be included in prompts, outputs, commits, logs, or generated artifacts |
| **AIC-DAT-2** | Sensitive or classified data must not be shared with external AI tools unless authorized and classified |
| **AIC-DAT-3** | AI must not request production credentials, private keys, tokens, or service secrets |
| **AIC-DAT-4** | AI must not transform sensitive data into less protected outputs |
| **AIC-DAT-5** | AI-generated examples must use synthetic data |
| **AIC-DAT-6** | Error messages and summaries must not leak ineligible state |
| **AIC-DAT-7** | Transcripts and generated summaries are evidence candidates, not secure stores |

### 13.3 Security event posture

If AI collaboration exposes, proposes exposing, or detects secret material, privilege bypass, data leakage, or trust boundary violation, the work must stop or be routed to Security Standards-aligned review. The AI agent must not silently redact and continue if repository state may already contain exposed material.

---

## 14. AI Collaboration With External Tools And Services

### 14.1 External tool posture

External AI services, MCP servers, hosted agents, model APIs, search tools, and external automation are external support systems. They are not Rento authority and must not become unmediated sources of product or engineering truth.

### 14.2 External tool rules

| Rule | Requirement |
|------|-------------|
| **AIC-EXT-1** | External tool output must be validated against repository authority before use |
| **AIC-EXT-2** | External tools must not receive secrets or classified data without explicit authorization |
| **AIC-EXT-3** | External AI-generated facts about repository state must be checked against local repository files |
| **AIC-EXT-4** | External services must not directly mutate repository state outside authorized tool workflow |
| **AIC-EXT-5** | External provider failure, stale output, or hallucination must be treated as contained failure |
| **AIC-EXT-6** | AI tool replacement must not change repository authority or product meaning |

---

## 15. AI Automation And Agent Standards

### 15.1 Agent posture

AI agents and automations may execute bounded tasks only under explicit scope. They must preserve authority hierarchy, working tree safety, and repository lifecycle.

### 15.2 Agent task rules

| Rule | Requirement |
|------|-------------|
| **AIC-AGT-1** | Agent task prompts must specify repository path, allowed files, prohibited actions, and expected output |
| **AIC-AGT-2** | Agents must not self-expand scope to adjacent authorities |
| **AIC-AGT-3** | Agents must not start implementation, publication, release, push, tag, or next authority without explicit authorization |
| **AIC-AGT-4** | Agents must preserve unrelated working-tree changes |
| **AIC-AGT-5** | Agents must report blockers rather than invent authority |
| **AIC-AGT-6** | Agent output must be reviewed before durable repository acceptance |

### 15.3 Background agent rules

Long-running or background AI agents must have:

- Clear task scope;
- Authorized repository access level;
- Stop condition;
- Reporting expectation;
- Verification expectation;
- No implicit authority to commit, push, publish, tag, release, or deploy.

---

## 16. AI Traceability And Evidence Standards

### 16.1 Traceability purpose

AI-assisted work must leave enough evidence for independent reviewers to verify what was changed, why, under which authority, and with what checks.

### 16.2 Required evidence for AI-assisted changes

| Evidence | Required when |
|----------|---------------|
| Working Set | Authority-sensitive authoring, review, or implementation |
| Scope declaration | Any AI-assisted repository modification |
| Changed files list | Any edit |
| Authority trace | Product, architecture, security, data, or repository-significant work |
| Verification commands or checks | Any material edit |
| Unrun checks | When checks are skipped, fail, or are unavailable |
| Residual risk | When uncertainty remains |
| User/unrelated changes | When dirty working tree exists |

### 16.3 Evidence rules

| Rule | Requirement |
|------|-------------|
| **AIC-EVD-1** | AI must report checks performed and checks not performed |
| **AIC-EVD-2** | AI must not claim tests passed unless they were run or verified |
| **AIC-EVD-3** | AI must distinguish repository evidence from inference |
| **AIC-EVD-4** | AI must record unrelated dirty state without absorbing it |
| **AIC-EVD-5** | AI must not use transcript links as substitute for repository evidence |

---

## 17. AI Collaboration Validation Requirements

### 17.1 Validation purpose

AI collaboration validation verifies that AI-assisted work preserves repository authority, product meaning, security, architecture boundaries, implementation separation, and reviewability.

Validation does not authorize implementation.

Validation Scope for AI-assisted review follows `REPOSITORY_STANDARDS.md`. AI Collaboration Standards govern AI-specific evidence, tool safety, and lifecycle honesty; they do not redefine repository validation-scope governance.

### 17.2 Validation dimensions

| Dimension | Question |
|-----------|----------|
| Authority initialization | Did AI build context from repository authority and live Git state? |
| Scope preservation | Did AI modify only authorized files and avoid adjacent authorities? |
| Product preservation | Did AI avoid product meaning changes and future AI feature approval? |
| Security preservation | Did AI avoid secrets, classification leaks, and trust boundary violations? |
| Architecture preservation | Did AI avoid moving responsibilities across published boundaries? |
| Development compliance | Did AI follow Development Standards gates where applicable? |
| Evidence honesty | Did AI report actual checks and uncertainties? |
| Tool safety | Were tool calls scoped, non-destructive, and authorized? |
| Repository hygiene | Were unrelated changes preserved and generated noise avoided? |
| Lifecycle honesty | Did AI avoid false publication, approval, implementation, release, or completion claims? |

### 17.3 Quality gates

| Gate | Trigger | Pass criteria |
|------|---------|---------------|
| **AIC-GATE-1 - Repository initialization** | Authority-sensitive AI task | Minimum Working Set constructed from repository authority |
| **AIC-GATE-2 - Scope control** | Any AI edit | Only authorized files modified |
| **AIC-GATE-3 - Output classification** | AI produces suggestion, draft, review, or code | Output class and authority posture understood |
| **AIC-GATE-4 - Security check** | Prompt, tool use, generated output, or edit | No secrets, credential leakage, or classification violation |
| **AIC-GATE-5 - Authority trace** | Material claim or change | Repository evidence identified |
| **AIC-GATE-6 - Diff review** | AI edits repository files | Complete diff inspected before completion |
| **AIC-GATE-7 - Verification honesty** | AI reports completion | Checks run and checks not run reported |
| **AIC-GATE-8 - Lifecycle honesty** | AI changes governance documents | DRAFT, APPROVED, PUBLISHED, ACTIVE, and COMPLETE claims have repository basis |
| **AIC-GATE-9 - Tool safety** | AI invokes tools | Tool use is scoped and non-destructive unless explicitly authorized |
| **AIC-GATE-10 - No shadow authority** | AI creates summaries, memory, or artifacts | Output remains subordinate to repository authority |

### 17.4 Review requirement

Material AI collaboration standards changes require independent review before publication or downstream consumption. Review must verify repository authority preservation, security/data handling, output classification, tool-use safety, Development Standards alignment, non-authorization of AI product features, and implementation boundary preservation.

---

## 18. AI Collaboration Invariants

These invariants are mandatory for downstream Implementation Governance and AI-assisted engineering work after publication.

| ID | Invariant |
|----|-----------|
| **AIC-INV-1** | Repository authority is the only durable authority for AI-assisted engineering work |
| **AIC-INV-2** | AI output is not product, engineering, security, repository, review, publication, release, or implementation authority |
| **AIC-INV-3** | AI must initialize authority-sensitive work from the Minimum Working Set |
| **AIC-INV-4** | Chat memory, model memory, transcripts, generated summaries, and tool output are non-authoritative |
| **AIC-INV-5** | AI must not authorize implementation, publication, release, push, tag, deployment, Phase 3 completion, or Phase 4 |
| **AIC-INV-6** | AI collaboration standards do not approve AI product features |
| **AIC-INV-7** | AI-generated edits require accountable review and verification |
| **AIC-INV-8** | AI must preserve Product Authority and immutable domain rules |
| **AIC-INV-9** | AI must preserve published architecture, Development Standards, and security boundaries |
| **AIC-INV-10** | AI must not expose secrets, credentials, classified data, or ineligible state |
| **AIC-INV-11** | AI must not create shadow governance in prompts, transcripts, memories, summaries, issues, or tool configuration |
| **AIC-INV-12** | AI tools and models are replaceable support mechanisms, not authority sources |
| **AIC-INV-13** | AI-assisted code requires separate implementation authorization |
| **AIC-INV-14** | AI-assisted review informs reviewers but does not approve or reject by itself |
| **AIC-INV-15** | AI must preserve unrelated working-tree changes and authorized scope |
| **AIC-INV-16** | AI must report unavailable evidence, failed checks, and unrun tests honestly |
| **AIC-INV-17** | External AI services are external support systems and must not define Rento truth |
| **AIC-INV-18** | AI-generated examples must use synthetic data |
| **AIC-INV-19** | AI automation must have explicit scope, stop conditions, and no implicit repository write authority |
| **AIC-INV-20** | AI collaboration must remain subordinate to Repository Standards, Development Standards, Security Standards, and Product Authority |

---

## 19. Downstream Consumers

The following future documents and artifacts may consume AI Collaboration Standards after publication:

| Consumer | Consumption relationship |
|----------|--------------------------|
| Implementation Governance | Consumes AIC-INV and AIC-GATE requirements for AI-assisted implementation controls |
| AI-assisted development tasks | Must follow context, scope, review, security, and verification gates |
| AI-assisted documentation tasks | Must preserve lifecycle honesty and repository authority |
| AI-assisted review workflows | Must classify AI findings as assistance, not approval |
| AI-assisted testing workflows | Must report generated tests, executed checks, and unverified assumptions |
| Security review | Consumes AI data handling, prompt, tool-use, and secret-exclusion rules |
| Repository governance review | Consumes no-shadow-authority and lifecycle honesty rules |
| Future implementation artifacts | May consume AI collaboration gates only after implementation authorization |

Downstream consumers must cite this document by reference. They must not duplicate, narrow, or replace AIC-INV invariants.

---

## 20. Prohibited Scope

This document and AI Collaboration Standards must not specify:

| Prohibited content | Belongs to |
|--------------------|------------|
| AI product features, AI listing assistance, AI chat, AI recommendations, analytics, personalization, or marketplace-facing AI behavior | Product Authority and future explicitly authorized product evaluation |
| AI implementation architecture, AI data pipelines, embeddings, vector stores, model serving, inference runtime, or prompt runtime design | Future architecture or implementation authority when authorized |
| Model provider, model family, model ranking, model evaluation benchmark, AI SDK, agent framework, or vendor selection | Future implementation or procurement authority when authorized |
| Security policy changes, data classification taxonomy, credential policy, or privacy policy | Security Standards and owning governance |
| Repository lifecycle, publication workflow, status taxonomy, or continuity workflow changes | Repository Standards |
| Development gates not specific to AI collaboration | Development Standards |
| Implementation tasks, code generation into production, deployment, release execution, Git tag creation, or GitHub Release creation | Future implementation or release authorization |
| Product Development Methodology, delivery process, sprint rituals, estimation, staffing, or organizational policy | Phase 4 or organizational methodology |

**Collaboration standards only.** AI-assisted implementation proceeds only under separate implementation authorization after applicable standards publication and governance approval.

---

## 21. Terminology

| Term | Meaning |
|------|---------|
| **AI Collaboration Standards** | Engineering standards governing AI-assisted work, output classification, context construction, tool use, review, and safety |
| **AI output** | Text, code, diff, plan, summary, review, test, command, or artifact produced with AI assistance |
| **AI-assisted work** | Engineering work where an AI tool contributes suggestions, edits, analysis, generation, or execution |
| **Model memory** | Stored or inferred context outside repository authority; non-authoritative |
| **Prompt** | Operational instruction to an AI tool; non-authoritative unless integrated through repository workflow |
| **Tool output** | Result from shell, MCP, search, lint, test, generation, or automation tools; evidence only |
| **Shadow authority** | Any non-repository source treated as binding governance |
| **Output classification** | Assignment of AI output type and authority posture before use |
| **Human-accountable review** | Review where an accountable contributor or authorized reviewer validates AI output against repository authority |
| **External AI service** | AI model, hosted agent, MCP server, search service, or automation outside repository authority boundary |

Terms defined in upstream authorities retain upstream meaning.

---

## 22. Document Status

| Item | Value |
|------|-------|
| **Status** | PUBLISHED - AI Collaboration Standards |
| **Authority class** | Authoritative AI collaboration engineering standards |
| **Binding authority** | Active - per REPOSITORY_STANDARDS.md section 7.6 |
| **Publication** | COMPLETE |
| **Phase** | AI Collaboration Standards - Phase 3 original authority (A4; execution order position 8 per PHASE_3_EVOLUTION_AUTHORIZATION.md section 6) |
| **Engineering authoring** | COMPLETE |
| **Independent review** | APPROVED |
| **Publication review** | APPROVED FOR PUBLICATION |
| **Publication checkpoint** | COMPLETE |
| **Program authorization** | Phase 3 evolution authoring authorized (`PHASE_3_EVOLUTION_AUTHORIZATION.md` - original authority A4, execution order position 8) |
| **Implementation** | NOT AUTHORIZED |
| **Subordinate to** | RENTO PRODUCT DESIGN STANDARD v1.0, PROJECT_CONSTITUTION.md, ARCHITECTURE_PRINCIPLES.md, PLATFORM_ARCHITECTURE.md, SYSTEM_ARCHITECTURE.md, PRODUCT_ARCHITECTURE.md, BACKEND_ARCHITECTURE.md, FRONTEND_ARCHITECTURE.md, API_STANDARDS.md, DATABASE_ARCHITECTURE.md, DATABASE_STANDARDS.md, SECURITY_STANDARDS.md, INFRASTRUCTURE_STANDARDS.md, OBSERVABILITY_ARCHITECTURE.md, INTEGRATION_ARCHITECTURE.md, AUTHENTICATION_ARCHITECTURE.md, AUTHORIZATION_ARCHITECTURE.md, DEVELOPMENT_STANDARDS.md, ENGINEERING_RELEASE_STRATEGY.md, REPOSITORY_STANDARDS.md |
| **Superior to** | Implementation Governance and AI-assisted implementation artifacts on AI collaboration matters (upon publication) |
| **Does not authorize** | Implementation; AI product features; model selection; provider selection; AI runtime design; deployment; release execution; Git tag creation; engineering release execution; Phase 3 completion; Phase 4 |
| **Prerequisites** | Development Standards published - satisfied; Authorization Architecture published - satisfied; Authentication Architecture published - satisfied; Security Standards published - satisfied; Integration Architecture published - satisfied; Observability Architecture published - satisfied; Phase 3 Evolution AUTHORIZED - satisfied |

---

**Document path:** `docs/engineering/AI_COLLABORATION_STANDARDS.md`
**Related:** `docs/engineering/PROJECT_CONSTITUTION.md` | `docs/engineering/REPOSITORY_STANDARDS.md` | `docs/engineering/DEVELOPMENT_STANDARDS.md` | `docs/engineering/SECURITY_STANDARDS.md` | `docs/engineering/PRODUCT_ARCHITECTURE.md` | `docs/engineering/OBSERVABILITY_ARCHITECTURE.md` | `docs/engineering/INTEGRATION_ARCHITECTURE.md` | `docs/design/PHASE_3_EVOLUTION_AUTHORIZATION.md`
