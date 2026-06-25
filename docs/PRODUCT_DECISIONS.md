# Product Decisions

This document records important product and architecture decisions.

Each decision should include:

- Date
- Decision
- Reason
- Alternatives
- Status

---

## Decision 001

### Date

2026-06-25

### Decision

Admin grants realtor access, but does not maintain realtor profiles.

### Reason

Realtors know their own information better than administrators.

This reduces operational workload and allows the platform to scale.

### Alternatives

Admin manually edits realtor profiles.

### Decision

Rejected.

### Status

Accepted.

---

## Decision 002

### Date

2026-06-25

### Decision

Listings belong to realtor_id.

### Reason

Ownership enables secure self-service and clear authorization rules.

### Alternatives

Listings managed only by administrators.

### Decision

Rejected.

### Status

Accepted.

---

## Decision 003

### Date

2026-06-25

### Decision

Listing contact information is taken from realtor_profiles.

### Reason

Avoid duplicated contact information and keep a single source of truth.

### Alternatives

Store contact information inside every listing.

### Decision

Rejected.

### Status

Accepted.

---

## Decision 004

### Date

2026-06-25

### Decision

Development follows Architecture → Review → Implementation.

### Reason

Architecture-first development reduces technical debt and protects production stability.

### Status

Accepted.