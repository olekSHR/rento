# Engineering Control

Navigation entry point for the AI Engineering Control foundation.

> The repository is durable engineering memory. Chat sessions are temporary working tools.

Published architecture and standards documents elsewhere under `docs/engineering/` remain in place. This README does not reorganize them.

---

## Control flow

```text
REFERENCE
    ↓
PROJECT BASELINE
    ↓
CURRENT TASK
    ↓
DISCOVERY
    ↓
IMPLEMENTATION
    ↓
VERIFICATION
    ↓
DEPLOYMENT
    ↓
PRODUCTION ACCEPTANCE
    ↓
ARCHIVE
```

---

## Structure

| Path | Role |
|------|------|
| `reference/REFERENCE_SOFTWARE_ARCHITECTURE_MAP_v1.md` | Technology-agnostic reasoning baseline |
| `baseline/PROJECT_BASELINE.md` | Real project evidence snapshot (template until filled) |
| `protocol/` | Task/feature/failure templates and gates |
| `tasks/` | Active and recent bounded task files |
| `archive/` | Closed task/failure records retained for memory |
| `.cursor/rules/engineering-control.mdc` | Operational AI control rule |

---

## Protocol index

- `protocol/TASK_TEMPLATE.md`
- `protocol/FEATURE_TEMPLATE.md`
- `protocol/FAILURE_TEMPLATE.md`
- `protocol/DEPLOYMENT_GATE.md`
- `protocol/PRODUCTION_ACCEPTANCE.md`
- `protocol/DEFINITION_OF_DONE.md`

---

## Operating reminders

- One bounded task at a time.
- `STATUS: DISCOVERY` prohibits application code modification.
- Approval of one gate does not approve later gates.
- Repository HEAD ≠ deployed application release identity unless separately verified.
