# Rento Architecture

## Project Overview

**Project:** Rento

**Type:** Mobile First Real Estate Marketplace

**Market:** Romania

**Launch City:** Galați

**Production:** https://rentonow.ro

---

# Mission

Build the simplest and most trusted platform for long-term real estate rentals.

The product is designed as a scalable commercial platform, not as a learning project.

---

# Architecture Principles

Every change must be evaluated through five criteria:

1. Security
2. Stability
3. Scalability
4. Maintainability
5. User Experience

Production stability always has higher priority than development speed.

---

# Backend Architecture

## Technology Stack

- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- Pydantic v2
- JWT Authentication

---

## Layered Architecture

Every backend feature follows the same structure.

```
HTTP Request
        │
        ▼
Router
        │
        ▼
Service
        │
        ▼
Repository
        │
        ▼
Database
```

---

## Responsibilities

### Router

Responsible for:

- HTTP endpoints
- Request validation
- Dependency injection
- Returning responses

Router must NOT contain business logic.

---

### Service

Responsible for:

- Business logic
- Authorization rules
- Validation
- Coordination between repositories

All business decisions belong here.

---

### Repository

Responsible for:

- Database queries
- CRUD operations
- SQLAlchemy interaction

Repositories must NOT contain business logic.

---

### Database

Responsible only for data storage.

Schema changes are performed through Alembic migrations.

---

## Dependency Rules

Allowed:

Router → Service

Service → Repository

Repository → Database

Forbidden:

Router → Repository

Router → Database

Repository → Router

Database → Service

No layer may bypass another without a justified architectural reason.

---

# Frontend Architecture

## Technology Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- App Router

---

## Design Philosophy

Rento is designed as an App-like Web Application.

The experience should feel similar to a native mobile application.

Priority:

1. Mobile
2. Tablet
3. Desktop

---

## UI Principles

Every screen should answer one question:

"What should the user do within the next 5 seconds?"

If the answer is not obvious, simplify the interface.

---

## Component Rules

Prefer:

- reusable components
- composition over duplication
- clear component boundaries
- isolated responsibilities

Avoid:

- large monolithic components
- duplicated UI
- duplicated business logic

---

## User Experience Rules

Every new feature should improve at least one of:

- Trust
- Speed
- Simplicity
- Retention
- Conversion

---

## Performance Rules

Prefer:

- lazy loading
- skeleton loading
- optimistic UI
- image optimization
- minimal client-side rendering

Avoid unnecessary re-renders.

---

## Navigation Rules

Navigation must remain predictable.

Important actions should be reachable within one or two taps.

Bottom navigation remains the primary navigation on mobile devices.

---

# Database Rules

## General Principles

The database is a long-term project asset.

Every schema change must be justified.

Before adding:

- table
- column
- relation

Always explain:

1. Why it is needed
2. How it will be used
3. Impact on scalability
4. Migration strategy
5. Rollback strategy

---

## Migration Rules

All schema changes must use Alembic.

Rules:

- Prefer additive migrations
- Never remove production columns without a migration plan
- Never modify production data manually
- Keep migrations small and focused
- One logical change per migration

---

## Data Integrity

Avoid duplicate business data.

Use foreign keys where appropriate.

Indexes should be added only when justified by performance requirements.

---

# API Standards

Every endpoint must follow the same structure.

```
Router
    ↓
Service
    ↓
Repository
```

---

## Endpoint Checklist

Each new endpoint should define:

- Route
- HTTP method
- Request schema
- Response schema
- Authorization
- Validation
- Error handling
- Manual verification steps

---

## Response Rules

Use consistent HTTP status codes.

Examples:

- 200 OK
- 201 Created
- 204 No Content
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found
- 409 Conflict

Avoid returning internal implementation details.

---

## Authorization Rules

Authorization must be explicit.

Possible access levels:

- Public
- Authenticated User
- Realtor Owner
- Admin

Never rely on frontend checks alone.

Authorization is always enforced on the backend.

---

# Security Rules

Security has higher priority than development speed.

Every feature must be secure by default.

---

## Authentication

Authentication is based on JWT.

Protected endpoints require a valid access token.

Anonymous users only have access to public resources.

---

## Authorization

Authorization is role-based and ownership-based.

Supported roles:

- Anonymous
- User
- Realtor
- Admin

Rules:

- Admin has full access.
- Realtors manage only their own resources.
- Public users can access only public data.
- Ownership must always be verified on the backend.

---

## Input Validation

All incoming data must be validated using Pydantic schemas.

Never trust client input.

---

## File Uploads

Uploaded files must be validated.

Allowed file types should be explicitly defined.

Never trust uploaded filenames.

Generate unique filenames on the server.

---

## Secrets

Never commit:

- .env
- API keys
- passwords
- tokens
- private certificates

Secrets belong only in environment variables.

---

# Development Workflow

Every task follows the same process.

## Step 1

Business analysis

↓

Architecture review

↓

Implementation plan

↓

Risk analysis

---

## Step 2

Implementation

Follow existing architecture.

Prefer the smallest production-safe solution.

Avoid unnecessary refactoring.

---

## Step 3

Local verification

Frontend

- npm run lint
- npm run build

Backend

- python -c "from app.main import app"

Git

- git diff
- git status

---

## Step 4

Commit

↓

Push

↓

Deploy

Only after successful verification.

---

# Deployment Rules

Production deployments must be predictable.

Rules:

- Verify locally before deployment.
- Keep commits small.
- One logical change per commit.
- Prefer reversible changes.
- Keep production running during development.

Infrastructure:

- Hetzner VPS
- Ubuntu
- Nginx
- Cloudflare
- GitHub

Deployment Checklist:

- Frontend build passes
- Backend imports successfully
- Database migrations verified
- Git working tree clean
- Production smoke test completed

---

---

# Product Principles

Rento is not just a CRUD application.

Every feature should improve at least one of the following:

- Trust
- Retention
- Conversion
- Realtor Productivity
- Scalability
- Monetization

If a feature does not improve at least one of these goals, its implementation should be reconsidered.

---


---

# Future Architecture

The platform is designed to evolve gradually.

Planned evolution:

Phase 1

Backend Foundation

↓

Phase 2

Realtor Platform

↓

Phase 3

Marketplace Optimization

↓

Phase 4

AI Features

↓

Phase 5

Monetization

↓

Phase 6

PWA

↓

Phase 7

Scaling

Architecture should always support future growth without requiring large rewrites.


## MVP Principle

Always choose the smallest solution that solves the business problem.

Prefer:

- simple implementation
- production-safe implementation
- backward compatibility

Only increase complexity when justified by business needs.

---

---

# Product Principles

Rento is not just a CRUD application.

Every feature should improve at least one of the following:

- Trust
- Retention
- Conversion
- Realtor Productivity
- Scalability
- Monetization

If a feature does not improve at least one of these goals, its implementation should be reconsidered.

---

## MVP Principle

Always choose the smallest solution that solves the business problem.

Prefer:

- simple implementation
- production-safe implementation
- backward compatibility

Only increase complexity when justified by business needs.

---

---

# Product Principles

Rento is not just a CRUD application.

Every feature should improve at least one of the following:

- Trust
- Retention
- Conversion
- Realtor Productivity
- Scalability
- Monetization

If a feature does not improve at least one of these goals, its implementation should be reconsidered.

---

## MVP Principle

Always choose the smallest solution that solves the business problem.

Prefer:

- simple implementation
- production-safe implementation
- backward compatibility

Only increase complexity when justified by business needs.

---

## Product Philosophy

Rento is designed for long-term maintainability.

Architecture decisions should favor simplicity over cleverness.

Consistency is more valuable than novelty.


# Architecture Version

Version: 1.0

Status:

Active

This document defines the baseline architecture for the Rento platform.

Any major architectural change should update this document first.

