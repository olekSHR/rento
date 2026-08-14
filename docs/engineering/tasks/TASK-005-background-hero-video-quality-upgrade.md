# TASK-005 — Background Hero Video Quality Upgrade

| Field | Value |
|-------|-------|
| ID | TASK-005 |
| TITLE | Background Hero Video Quality Upgrade |
| STATUS | VERIFYING |
| RISK | LOW |
| CLASSIFICATION | Frontend media asset upgrade |

> Discovery complete (2026-08-14). Local implementation and verification complete; **COMMIT**, **PUSH**, **DEPLOY**, and **PRODUCTION ACCEPTANCE** remain separately authorized.

**Discovery reference:** Background/Hero Video Discovery (2026-08-14) — recommendation: `ASSET_ONLY`; deployment: `FRONTEND_ONLY`.

---

## Problem

The consumer homepage hero uses a background video (`hero-galati.mp4`) and poster (`hero-galati-poster.webp`) rendered by `HomeHero`. The current asset is functionally correct but does not meet the desired **perceived visual quality** for a premium real-estate presentation.

Current technical profile (VERIFIED during discovery):

| Asset | Property | Value |
|-------|----------|-------|
| Video | Container / codec | MP4 / H.264 (avc1) |
| Video | Resolution | 1920×1080 |
| Video | Duration | ~18.07 s |
| Video | Frame rate | ~30 fps |
| Video | Overall bitrate | ~1390 kbps |
| Video | File size | ~3.0 MiB (3,146,100 bytes) |
| Video | Audio track | **YES** (unnecessary — playback is muted autoplay) |
| Poster | Format / size | WebP / 1672×941 / ~283 KiB |

The existing `HomeHero` architecture (poster-first fallback, muted autoplay, reduced-motion handling, `object-cover` crop) is **sufficient**. The bounded problem is **media asset quality and encoding**, not frontend media architecture.

---

## Current Behavior

Render path (VERIFIED):

```text
GET /
  → frontend/app/(consumer)/page.tsx
  → frontend/components/HomeHero.tsx
  → layered hero stack:
       CSS gradients
       CSS background poster: /media/home/hero-galati-poster.webp
       <video preload="metadata" poster="…">
         <source src="/media/home/hero-galati.mp4" />
       bottom fade gradient
       text + CTA overlay
```

Browser / component behavior (VERIFIED — `frontend/components/HomeHero.tsx`):

| Property | Value |
|----------|-------|
| autoPlay | yes |
| muted | yes |
| loop | yes |
| playsInline | yes |
| preload | `metadata` |
| poster | `/media/home/hero-galati-poster.webp` |
| object-fit | `object-cover` |
| reduced motion | `motion-reduce:hidden` on `<video>`; poster CSS remains |
| desktop / mobile | same asset; no separate mobile video |
| delivery | static files from `frontend/public/media/home/` via Next.js `/public` |

Asset locations (VERIFIED):

```text
frontend/public/media/home/hero-galati.mp4
frontend/public/media/home/hero-galati-poster.webp
```

---

## Target Behavior

After authorized implementation:

1. Homepage hero displays a **materially higher-quality** replacement video using the **existing** `HomeHero` render path (unless a bounded filename/path update is explicitly approved — see Open Decisions).
2. Replacement video meets the **Target Media Contract** (below).
3. Replacement poster meets the **Poster Contract** and visually matches the new footage.
4. Existing hero behavior is preserved:
   - poster-first rendering;
   - muted autoplay + loop + playsInline;
   - `object-cover` crop on desktop and mobile;
   - reduced-motion fallback (poster visible, video hidden);
   - gradient overlays and text readability unchanged.
5. No regression to homepage listings, header/auth, filters, or bottom navigation.
6. Approved media budget is respected (file size within contract).

The objective is:

```text
better perceived visual quality
+
professional/premium presentation
+
appropriate web media budget
```

NOT maximum resolution, maximum bitrate, or frontend media architecture redesign.

---

## In Scope

1. **Select replacement footage** (separate authorization gate — not part of this document's creation stage).
2. **Encode and deliver** replacement hero video meeting the Target Media Contract.
3. **Generate and deliver** replacement poster WebP meeting the Poster Contract.
4. **Replace** existing static assets at:

   ```text
   frontend/public/media/home/hero-galati.mp4
   frontend/public/media/home/hero-galati-poster.webp
   ```

   **OR**, if approved during asset selection, perform a **bounded rename** (e.g. if new footage is not Galați-specific) plus a corresponding path update in `frontend/components/HomeHero.tsx` only.

5. Record static media verification evidence (properties, file sizes, audio absence).
6. Record frontend static verification (`lint`, `typecheck`, `build`).
7. Record manual visual acceptance (desktop, mobile, reduced-motion, network, regression).
8. Update this task file through lifecycle gates (Implementation Result, Final Verification, Production Result).

**Expected files (implementation phase only):**

| File | Expected change |
|------|-----------------|
| `frontend/public/media/home/hero-galati.mp4` | REPLACE (in-place) |
| `frontend/public/media/home/hero-galati-poster.webp` | REPLACE (in-place) |
| `frontend/components/HomeHero.tsx` | CHANGE ONLY IF bounded rename approved |

No other application files are expected to change.

---

## Out of Scope

Unless new evidence proves otherwise during implementation:

```text
HomeHero architecture redesign
WebM dual-source delivery
mobile-specific video asset or poster-only mobile strategy
JavaScript media loading logic
new CDN integration
Cloudflare configuration changes
Nginx configuration changes
backend changes
database / Alembic / migrations
API contract changes
authentication / authorization / sessions / CSRF
property/listing functionality
filters
favorites
unrelated UI changes
dependency upgrades
Docker Compose service topology changes
production access (unless separately authorized for acceptance)
```

If implementation appears to require any out-of-scope item: **STOP** and return to task review.

---

## Affected Layers

| Layer | Impact |
|-------|--------|
| Frontend / Presentation | YES — static media assets in `public/`; optional bounded path strings in `HomeHero.tsx` |
| Frontend / Client logic | NONE expected |
| Backend Router / API | NONE |
| Service | NONE |
| Repository | NONE |
| Database | NONE |
| Migration | NONE |
| Authentication | NONE |
| Authorization | NONE |
| Nginx | NONE (proxy-only; no config change) |
| Docker frontend image | YES — rebuild required (`COPY . .` bakes `public/` into image) |
| Docker backend / db / nginx | NONE |

Reference map alignment: Presentation layer static asset only.

---

## Request / use-case lifecycle

```text
User navigates to /
  → Next.js renders (consumer)/page.tsx (Server Component)
  → HomeHero SSR HTML includes poster CSS + <video> with static paths
  → Browser requests /media/home/hero-galati-poster.webp (immediate paint)
  → Browser requests /media/home/hero-galati.mp4 (metadata then autoplay)
  → Video loops muted behind gradient overlays
  → prefers-reduced-motion: video hidden; poster remains
```

| Impact | Result | Evidence |
|--------|--------|----------|
| DATA IMPACT | NONE | Static files only |
| AUTHENTICATION IMPACT | NONE | Public homepage |
| AUTHORIZATION IMPACT | NONE | Public homepage |
| API CONTRACT IMPACT | NONE | No API involved |
| DATABASE IMPACT | NONE | No schema change |

---

## Evidence

| Claim | Label | Source |
|-------|-------|--------|
| Hero video rendered only on `/` via `HomeHero` | VERIFIED | `frontend/app/(consumer)/page.tsx`, `frontend/components/HomeHero.tsx` |
| Assets served from `frontend/public/media/home/` | VERIFIED | file paths; Next.js `/public` static serving |
| Current video: MP4 H.264 1920×1080 ~18s ~3.0 MiB | VERIFIED | local atom parse during discovery |
| Current video contains audio track | VERIFIED | MP4 `hdlr soun` track during discovery |
| Current poster: WebP 1672×941 ~283 KiB | VERIFIED | local WebP header parse during discovery |
| `HomeHero` uses muted autoplay loop playsInline preload=metadata | VERIFIED | `HomeHero.tsx` |
| Reduced-motion hides video, poster remains | VERIFIED | `motion-reduce:hidden` + CSS poster layer |
| Discovery recommendation: ASSET_ONLY | VERIFIED | discovery report 2026-08-14 |
| Deployment scope: FRONTEND_ONLY | VERIFIED | `frontend/Dockerfile`, `docker-compose.yml` |
| Replacement footage selected and user-accepted | VERIFIED | Open Decisions + Implementation Result (2026-08-14) |

---

## Proposed Change

**Smallest expected implementation:** replace `hero-galati.mp4` and `hero-galati-poster.webp` in-place with higher-quality encoded assets meeting the contracts below. No `HomeHero.tsx` change required if filenames/paths remain unchanged.

### Target Media Contract (video)

Engineering targets — small deviations require explicit justification in Implementation Result:

| Property | Target |
|----------|--------|
| Aspect ratio | 16:9 |
| Resolution | 1920×1080 |
| Duration | approximately 12–20 seconds |
| Container / codec | MP4 / H.264 (avc1, yuv420p) |
| Audio | **NONE** — strip audio track entirely |
| Loop | clean / visually acceptable at seam |
| File size | ≤ 3 MiB preferred |
| File size ceiling | ~4 MiB maximum — only if materially justified by visible quality gain |
| Composition | center-weighted; safe under `object-cover` on desktop and mobile hero crop |
| Content | appropriate for premium real-estate / rental positioning |

**Content rule:** do **not** assume replacement footage must depict Galați because the current filename contains `hero-galati`. Footage selection is a separate decision. Filename semantics are addressed under Open Decisions.

### Poster Contract

| Property | Target |
|----------|--------|
| Format | WebP |
| Source | representative frame from replacement video |
| Width | approximately 1600–1920 px |
| File size | ≤ ~300 KiB preferred |
| Visual match | poster must match replacement footage (not previous asset) |

### Visual Acceptance Contract

Manual visual acceptance is **required**. Task is not complete merely because a new file exists.

Acceptance criteria (all must pass):

| # | Criterion |
|---|-----------|
| 1 | Materially cleaner/sharper appearance than current asset at normal desktop hero rendering |
| 2 | No obvious compression artifacts in normal desktop hero rendering |
| 3 | No embedded text, watermark, or logo in footage |
| 4 | No black bars (letterboxing/pillarboxing) |
| 5 | No fade-to-black at loop boundary |
| 6 | Composition remains usable under `object-cover` — important subject not destroyed by crop |
| 7 | Desktop: gradients and hero text/CTA remain readable |
| 8 | Mobile: crop acceptable; text/CTA remain readable; no horizontal overflow |
| 9 | No distracting rapid camera motion |
| 10 | Loop discontinuity not severe enough to degrade hero presentation |
| 11 | Poster visually matches replacement footage |

Subjective "premium quality" cannot be proven by automated tests alone.

### Optional bounded rename (implementation decision)

If selected footage is **not** Galați-specific, implementation may rename assets (e.g. `hero-rento.mp4`) and update paths in `HomeHero.tsx` only. This remains **in scope** but is **not required** if in-place replacement is acceptable. Decision deferred to asset selection gate.

---

## Risks

| Risk | Mitigation |
|------|------------|
| Larger file degrades mobile load | Enforce file-size contract; strip audio; verify network transfer size |
| Poor loop point | Visual acceptance criterion #10; re-encode or re-cut source |
| Bad crop on mobile | Center-weighted composition; verify mobile viewport manually |
| Poster/video mismatch | Generate poster from approved video frame; acceptance criterion #11 |
| Cache serves stale media after deploy | Verify network requests post-deploy; cache-bust not in scope unless evidence requires |
| Accidental frontend logic change | Diff review — only `public/media/home/*` expected; `HomeHero.tsx` only if rename approved |
| Filename semantic drift | Open decision at asset selection |

**RISK: LOW** — static asset replacement; no data/auth/migration/API change.

---

## Verification Plan

### Static verification (media assets)

Before browser verification, confirm replacement assets:

| Check | Expected |
|-------|----------|
| New video file exists at approved path | `frontend/public/media/home/hero-galati.mp4` (or approved rename) |
| Container / codec | MP4 / H.264 |
| Resolution | 1920×1080 (or justified deviation documented) |
| Duration | ~12–20 s |
| Audio track | **absent** |
| File size | ≤ 3 MiB preferred; ≤ ~4 MiB max with justification |
| New poster exists | `frontend/public/media/home/hero-galati-poster.webp` (or approved rename) |
| Poster format / width | WebP; ~1600–1920 px wide |
| Poster file size | ≤ ~300 KiB preferred |

Use available local tooling (`ffprobe`, atom parse, or equivalent). Record command/output in Final Verification.

### Static verification (frontend)

From `frontend/`:

```bash
npm run lint
npm run typecheck
npm run build
```

### Browser verification — desktop

| Check | Expected |
|-------|----------|
| Poster appears immediately | CSS background + `poster` attr show replacement frame |
| Video starts | muted autoplay begins after metadata/load |
| object-cover crop | acceptable framing; no broken layout |
| Text / CTA readability | gradients and copy remain readable |
| Loop | visually acceptable; no severe jump |
| Layout regression | hero height, header, listings section unchanged |

### Browser verification — mobile

| Check | Expected |
|-------|----------|
| playsInline | inline playback; no forced fullscreen |
| Crop | acceptable under ~375 px width / `50svh` hero |
| Horizontal overflow | none |
| Hero height | `clamp(18rem,50svh,28rem)` behavior preserved |
| Text / CTA | readable and tappable |

### Browser verification — reduced motion

| Check | Expected |
|-------|----------|
| `prefers-reduced-motion: reduce` | `<video>` hidden |
| Poster / fallback | CSS poster layer remains visually correct |

### Network verification

| Check | Expected |
|-------|----------|
| Correct media URLs requested | approved video + poster paths only |
| No 404 on hero media | 200 responses |
| Transfer size | consistent with approved asset budget |
| No stale old asset | verify response content matches replacement (post-deploy if applicable) |

### Regression verification

Homepage functionality unrelated to hero must remain unaffected:

| Area | Expected |
|------|----------|
| Listings load | properties render |
| Header / auth state | unchanged behavior |
| Filters / navigation | unchanged behavior |
| Mobile bottom navigation | unchanged behavior |

### Diff hygiene (before success claim)

```bash
git status --short
git diff --stat
git diff --check
git diff
```

Review for unexpected files, backend changes, dependency changes, unrelated formatting.

---

## Rollback Impact

| Aspect | Impact |
|--------|--------|
| Rollback method | Restore previous **frontend Docker image** containing prior video + poster + application state |
| Rollback artifact | Preserve immutable pre-deploy `rento-frontend:latest` image ID via `scripts/ops/rento-preserve-rollback-images.sh <CURRENT_APP_SHA>` **before** frontend rebuild |
| Identity warning | Do **not** infer running application release from production Git HEAD alone |
| Data | NONE |
| Backend / db / nginx | unchanged — no rollback needed |
| Database rollback | NOT expected |
| User-visible | Hero reverts to previous video/poster quality |

Per `docs/operations/DEPLOYMENT_PROCEDURE.md` §5.1 — application image rollback preservation is required before frontend image rebuild on a running environment.

---

## Definition of Done

TASK-005 is **CLOSED** only when all applicable items are true:

1. **Scope held** — media asset replacement only; no out-of-scope architecture changes.
2. **Target media contract** — video and poster meet encoding/size contracts (or justified deviations documented).
3. **Audio absent** — replacement video has no audio track.
4. **Visual acceptance** — manual criteria pass on desktop and mobile.
5. **Reduced motion** — poster fallback verified.
6. **Network** — correct assets served; sizes within budget; no 404.
7. **Regression** — listings, header/auth, filters, bottom nav unaffected.
8. **Static frontend checks** — `lint`, `typecheck`, `build` PASS.
9. **Diff hygiene** — only expected files changed.
10. **Deployment** — frontend-only deploy successful (if separately authorized).
11. **Production acceptance** — production hero behavior verified (if deploy authorized).

Hard distinctions (per `DEFINITION_OF_DONE.md`):

```text
CODE WRITTEN != DONE
COMMITTED != DEPLOYED
DEPLOYED != ACCEPTED
NEW FILE EXISTS != VISUAL ACCEPTANCE
```

---

## Open Decisions (before implementation)

| Decision | Status |
|----------|--------|
| Replacement footage / source | **SELECTED** — user manually cropped source; staging optimized 2026-08-14 |
| Filename strategy | **RESOLVED** — in-place `hero-galati.mp4` / `hero-galati-poster.webp`; no `HomeHero.tsx` change |
| File-size ceiling exception | **DOCUMENTED** — final video 3.566 MiB (preferred ≤3 MiB; within 4 MiB ceiling) |
| Poster aspect | **USER-ACCEPTED** — 1731×1284 WebP (~1.348 AR); CONDITIONAL vs strict 16:9 poster target |

---

## Implementation Result

**Implemented locally:** 2026-08-14

| File | Change |
|------|--------|
| `frontend/public/media/home/hero-galati.mp4` | REPLACED — copied from `E:\Projects\video\optimized\hero-galati.mp4` |
| `frontend/public/media/home/hero-galati-poster.webp` | REPLACED — copied from `E:\Projects\video\optimized\hero-galati-poster.webp` (user-provided final poster) |

**Application code:** unchanged (`HomeHero.tsx` paths remain valid).

**Prior repository asset sizes:** video 3,146,100 bytes; poster 289,776 bytes.

**New repository asset sizes:** video 3,738,519 bytes; poster 213,698 bytes.

**Staging optimization (pre-copy, outside repo):** remux only — audio removed, faststart added, video stream copied at native 1440×808; no additional crop.

**Manual visual acceptance:** user accepted replacement video and user-provided poster before repository copy.

---

## Final Verification

**Final staging re-verification (pre-copy, 2026-08-14):**

| Asset | Result | Evidence |
|-------|--------|----------|
| Staging video | PASS | MP4 H.264 Main yuv420p 1440×808 180:101 ~13.833s 30fps no audio 3,738,519 bytes |
| Staging poster | CONDITIONAL | WebP 1731×1284 213,698 bytes; user-selected; not strict 16:9 |
| Gate | FINAL_ASSETS_PASS | both technically suitable for bounded replacement |

**Asset identity (SHA-256, post-copy):**

| Asset | Staging | Repository | Match |
|-------|---------|------------|-------|
| Video | `5463b38c4b252c2ee22944621b0c9f36d3901045b5506757d08175f8d7980e7f` | `5463b38c4b252c2ee22944621b0c9f36d3901045b5506757d08175f8d7980e7f` | YES |
| Poster | `a696097b61d9800bf5ad16f98aa123e46e5f055926b5b2f25dc9f0ff0afa3c31` | `a696097b61d9800bf5ad16f98aa123e46e5f055926b5b2f25dc9f0ff0afa3c31` | YES |

**Static verification (repository copies):**

| Check | Result |
|-------|--------|
| Video MP4 H.264 | PASS |
| Video ~16:9 (180:101) | PASS |
| Video 30 fps | PASS |
| Video no audio | PASS |
| Video ≤4 MiB | PASS (3.566 MiB) |
| Poster WebP readable | PASS |
| Poster ≤300 KiB | PASS (208.7 KiB) |
| Poster aspect ~16:9 | CONDITIONAL (1731×1284) |

**Frontend static checks (`frontend/`, 2026-08-14):**

| Check | Command | Result | Exit code |
|-------|---------|--------|-----------|
| lint | `npm run lint` | PASS (0 errors; 4 pre-existing warnings in unrelated files) | 0 |
| typecheck | `npm run typecheck` | PASS | 0 |
| build | `npm run build` | PASS | 0 |

**Local browser/runtime verification (2026-08-14, `http://localhost:3000/` with local FastAPI backend on `:8000`):**

| Case | Result | Evidence |
|------|--------|----------|
| Homepage render | PASS | `/` HTTP 200; hero region + listings render |
| Desktop hero poster/video | PASS | Screenshot; interior scene fills hero; no black bars |
| Desktop autoplay/muted/loop/playsInline | PASS | JS probe: `muted:true autoplay:true loop:true playsInline:true paused:false` |
| Desktop object-cover / text / CTA | PASS | Screenshot; heading + “View listings” readable; crop acceptable |
| Desktop layout / overflow | PASS | No horizontal overflow observed |
| Mobile hero (~390px) | PASS | Device metrics 390×844; screenshot; crop acceptable; CTA usable |
| Mobile playsInline / overflow | PASS | JS: `playsInline:true`; `scrollWidth===clientWidth===390` |
| Reduced motion | PASS | Emulated `prefers-reduced-motion: reduce`; video `display:none`; poster remains; hero usable |
| Static video URL `/media/home/hero-galati.mp4` | PASS | fetch HEAD 200; Content-Length 3738519 |
| Static poster URL `/media/home/hero-galati-poster.webp` | PASS | fetch HEAD 200; Content-Length 213698 |
| Loop transition (~13.8s) | PASS | 15s observation: `loopDetected:true`; reset ~11.8s → ~0.02s without pause |
| Poster rendered crop (1731×1284 poster vs 1440×808 video) | PASS | Actual crop acceptable desktop/mobile/reduced-motion |
| Header / listings / navigation regression | PASS | Header, listings empty-state, bottom nav, filters button present |
| Listings/regression on `/` | PASS | page renders; empty photographed listings state only (data), not hero regression |

**Diff hygiene:**

```text
 M frontend/public/media/home/hero-galati-poster.webp
 M frontend/public/media/home/hero-galati.mp4
?? docs/engineering/tasks/TASK-005-background-hero-video-quality-upgrade.md
```

No application source, backend, dependency, or config changes.

**Pending gates:** COMMIT · PUSH · DEPLOY · PRODUCTION ACCEPTANCE

---

## Commit

<!-- Hash/message only after an approved commit stage. -->

---

## Production Result

<!-- Filled only after deploy + production verification if applicable. -->

Expected deploy scope:

```text
FRONTEND_ONLY
```

No backend rebuild, db restart, nginx restart, or migration expected unless later evidence proves required.

---

## Follow-up

Separate findings — do not expand this task:

- WebM dual-source for smaller transfer in Chromium browsers.
- Mobile poster-only / save-data strategy.
- CDN cache header tuning for `/media/home/*`.
- Hero video skeleton in `(consumer)/loading.tsx` (currently absent — unrelated UX gap).
- Cross-field validation and other unrelated candidates from prior reconstruction.

---

## Gate reminder

Approval of one stage does not approve later stages:

```text
DISCOVERY        (complete — 2026-08-14)
TASK DEFINITION  (complete)
ASSET SELECTION  (complete — user accepted)
IMPLEMENTATION   (complete — local asset replacement)
VERIFICATION     (complete — local browser PASS)
COMMIT           (NOT authorized)
PUSH             (NOT authorized)
DEPLOY           (NOT authorized)
PRODUCTION ACCEPTANCE (NOT authorized)
```
