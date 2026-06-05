# Rento — Mobile First Real Estate Marketplace

Rento is a mobile-first real estate marketplace built as an app-like web application.

The project is designed for rental property listings, favorites, admin property management, image galleries, multiple image uploads, cover images, and drag-and-drop image ordering.

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* TailwindCSS
* App Router
* next/image

### Backend

* FastAPI
* PostgreSQL
* SQLAlchemy
* JWT Authentication

---

## Current Status

Production Ready Candidate.

### Verified

* `npm run build`: PASS
* TypeScript: PASS
* `npm run lint`: 0 errors / 0 warnings
* Manual QA: PASS
* Environment audit: PASS
* Git security audit: PASS

---

## Main Features

### Public

* Home page
* Property details page
* Favorites page
* Login page
* Mobile-first UI
* Property filters
* Image gallery
* Fullscreen image viewer
* Skeleton loading

### Admin

* Admin dashboard
* Create property
* Edit property
* Delete property
* Upload property images
* Multiple image upload
* Set cover image
* Drag-and-drop image ordering

---

## Routes

### Public Routes

```text
/
 /favorites
 /login
 /properties/[id]
```

### Admin Routes

```text
/admin
/admin/properties
/admin/properties/create
/admin/properties/[id]
/admin/properties/[id]/edit
```

---

## Database Structure

### users

```text
id
email
hashed_password
role
```

### properties

```text
id
title
description
price
city
rooms
image_url
created_at
```

### property_images

```text
id
property_id
url
is_cover
sort_order
created_at
```

### favorites

```text
user_id
property_id
```

---

## Environment Variables

### Frontend

File:

```text
frontend/.env.local
```

Local development:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Production example:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

### Backend

File:

```text
backend/.env
```

Local development:

```env
DATABASE_URL=postgresql://postgres:4321@localhost/backend_db
SECRET_KEY=supersecretkey123
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

Production example:

```env
DATABASE_URL=postgresql://user:strong_password@db:5432/rento_db
SECRET_KEY=replace_with_strong_random_64_character_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Security Notes

Before production deployment:

* Replace `SECRET_KEY` with a strong random 64+ character key.
* Replace local `DATABASE_URL` with production database URL.
* Replace `NEXT_PUBLIC_API_URL` with production backend URL.
* Keep all `.env` files out of Git.
* Use HTTPS only.
* Add backend CORS rules for the production frontend domain.
* Use strong database passwords.
* Disable debug behavior in production.

---

## Git Ignore Rules

The project must not commit:

```text
node_modules
.next
.env
.env.local
build
logs
.vercel
TypeScript cache files
```

---

## Production Architecture

Recommended production structure:

```text
User
  ↓
Cloudflare
  ↓
Nginx / Reverse Proxy
  ↓
Frontend: Next.js
  ↓
Backend: FastAPI
  ↓
PostgreSQL Database
```

Optional later:

```text
Redis
Object Storage
Background Workers
Monitoring
PWA
Push Notifications
Offline Mode
```

---

## Deployment Strategy

Recommended deployment path:

1. Prepare README.md
2. Prepare production environment variables
3. Prepare Docker configuration
4. Prepare PostgreSQL production database
5. Prepare backend deployment
6. Prepare frontend deployment
7. Configure Nginx reverse proxy
8. Connect domain
9. Enable HTTPS
10. Run production QA checklist

---

## Current Phase

```text
05_DEPLOYMENT_PREPARATION
```

Current priorities:

1. README.md
2. Production architecture
3. Docker readiness
4. VPS strategy
5. Domain strategy
6. HTTPS strategy
7. Production environment variables
8. Final deployment checklist

---

## Not Started Yet

Do not start these phases yet:

* PWA
* Push Notifications
* Offline Mode

These should be added only after stable production deployment.
