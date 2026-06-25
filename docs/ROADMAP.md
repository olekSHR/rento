# Rento Roadmap

## Product Vision

Rento is a mobile-first marketplace for long-term real estate rentals.

Our mission is to become the most trusted and easiest platform for renters and realtors in Romania.

The platform focuses on:

- verified listings
- simple realtor workflow
- excellent mobile experience
- scalable architecture
- long-term business growth

---

# North Star Goal

Build a platform where:

- renters find only relevant and up-to-date listings;
- realtors can publish and manage properties with minimal effort;
- the marketplace scales without increasing operational complexity.

Every major feature should move the product closer to this goal.

---

# Product Strategy

Development priorities:

1. Stability
2. Trust
3. Realtor productivity
4. User growth
5. Monetization
6. Automation
7. Scaling

New features should be implemented only when they support these priorities.

---

# Current Status

Production is stable.

Current objective:

Complete Phase 1 (Backend Foundation) before expanding Realtor Platform features.

Current remaining task:

- Security fix for GET /properties/{id}


---

# Development Phases

## Phase 1 — Backend Foundation

Status: 95%

Goal:

Build a stable, secure and scalable backend foundation.

Completed:

- Authentication
- Authorization
- Property CRUD
- Property Images
- Favorites
- Uploads
- Property Status
- Realtor ownership foundation
- Admin role management

Remaining:

- Secure GET /properties/{id}

Definition of Done:

- Public users cannot access private listings.
- Admin access is fully verified.
- Realtor ownership rules are enforced.
- Backend passes local verification.

---

## Phase 2 — Realtor Profile Foundation

Goal:

Allow realtors to create and maintain a complete professional profile.

Planned:

- Avatar
- Agency
- Biography
- Contact information
- Profile completion indicator
- Public realtor profile

Definition of Done:

- Realtors manage their own profile.
- Listings automatically display realtor information.
- No duplicate contact data inside listings.

---

## Phase 3 — Realtor Dashboard

Goal:

Provide a complete self-service dashboard.

Planned:

- Create listing
- Edit listing
- Manage gallery
- Listing status
- Moderation status
- Dashboard improvements

Definition of Done:

- Realtor works independently without admin assistance.

---

## Phase 4 — Listing Quality

Goal:

Increase trust and listing quality.

Planned:

- Listing quality score
- Required field validation
- Better image guidance
- Duplicate listing detection
- Outdated listing reminders
- Automatic quality recommendations

Definition of Done:

- Realtors receive quality feedback before publishing.
- Duplicate listings are detected.
- Outdated listings are reduced.

---

## Phase 5 — AI Features

Goal:

Help realtors create better listings in less time.

Planned:

- AI title generation
- AI description generation
- Romanian language support
- English language support
- Listing improvement suggestions
- AI quality recommendations

Definition of Done:

- Realtors can generate professional listings with one click.
- AI suggestions improve listing quality without replacing user control.

---

## Phase 6 — Monetization

Goal:

Introduce sustainable revenue streams.

Planned:

- Premium realtor accounts
- Promoted listings
- Agency subscriptions
- Featured properties
- Advertising options

Definition of Done:

- First paid feature is available.
- Revenue model does not reduce user trust.

---

## Phase 7 — PWA

Goal:

Transform Rento into an installable web application.

Planned:

- Web App Manifest
- Install prompt
- Push notifications
- Offline support
- Background updates

Definition of Done:

- Rento can be installed on mobile devices.
- Core functionality works as a Progressive Web App.

---

## Phase 8 — Scaling

Goal:

Prepare the platform for national growth.

Planned:

- Multi-city support
- Agency management
- Advanced analytics
- Performance optimization
- Operational dashboards

Definition of Done:

- Platform supports multiple cities and agencies without architectural changes.

---

# Product Backlog

Ideas for future evaluation:

- Saved searches
- Push alerts
- Realtor verification badge
- AI photo enhancement
- AI property translation
- Appointment scheduling
- In-app messaging
- Reviews and ratings
- Mortgage calculator
- Market statistics

Backlog items are not implementation commitments.

Each idea must be evaluated for:

- Business value
- User impact
- Technical complexity
- Maintenance cost

---

# Technical Debt

Technical debt should be tracked explicitly.

Rules:

- Do not accumulate unnecessary complexity.
- Prefer small refactoring over large rewrites.
- Production stability has priority.
- Refactoring must have measurable value.

Technical debt should be reviewed regularly.

---

# Success Metrics

The success of Rento is measured by product outcomes, not by lines of code.

Primary KPIs:

- Active listings
- Verified realtors
- Monthly active users (MAU)
- Returning users
- Listing conversion rate
- Realtor retention
- Platform uptime

Business KPIs:

- Premium subscriptions
- Promoted listings sold
- Agency accounts
- Monthly recurring revenue (MRR)

Engineering KPIs:

- Deployment success rate
- Production incidents
- Average API response time
- Build stability

---

# Roadmap Version

Version: 1.0

Status: Active

This roadmap defines the strategic development plan for the Rento platform.

New features should be evaluated against this roadmap before implementation.