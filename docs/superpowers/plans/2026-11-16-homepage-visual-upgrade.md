# Homepage Visual Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the homepage look and interactivity (cinematic hero with breathing logo, scroll-lit text, live service cards, testimonial marquee, reveal-on-scroll, delayed newsletter) without changing copy, then make it the root of makom-linshom.com.

**Architecture:** Homepage sections stay server components where possible. Motion lives in small client components under `src/components/motion/` (Reveal, ScrollWords, ParallaxImage) that only touch `transform`/`opacity` via refs (no React state on scroll, no new dependencies). All motion is disabled under `prefers-reduced-motion`. Pages render fully visible without JS; JS only *adds* the hidden-until-in-view state.

**Tech Stack:** Next.js 16.2.6 (App Router, `next/image` uses `preload` not `priority`), React 19, Tailwind v4 (`@theme` in `globals.css`), Resend for email.

**Spec:** `docs/superpowers/specs/2026-11-16-homepage-visual-upgrade-design.md`

**Branch:** `homepage-visual-upgrade` (never push to `main` before approval — Vercel deploys `main` to production).

**Testing approach:** This is visual UI with no existing test suite. Verification per task = `npm run lint` + `npm run build` clean, plus headless-Chrome screenshots at 1440×900 and 390×844 checked by eye, plus reduced-motion emulation for the motion tasks.

---

### Task 1: Assets and design tokens
**Files:** Create `public/logo-cream.png`; Modify `src/app/globals.css`
- [ ] Crop `public/logo.png` to its alpha bounding box and recolor every opaque pixel to cream `#f7f1e6` (alpha kept) → `public/logo-cream.png` (Python/PIL one-off).
- [ ] Add tokens `--color-gold: hsl(38 45% 62%)`, `--color-gold-hover: hsl(38 45% 54%)`, `--color-ink-warm: hsl(30 25% 12%)`.
- [ ] Add keyframes + classes: `hero-kenburns` (scale 1.08→1, 22s alternate), `hero-logo` (breathe 1→1.045, 9s), `scroll-cue`, `marquee` (translateX 0→50%), `.reveal`/`.reveal-hidden`, `.sw-active .sw-word` (opacity .15 → `.on` 1), `.cta-gold`, service-card classes, marquee classes.
- [ ] One `@media (prefers-reduced-motion: reduce)` block that disables every animation/transition above, shows all words, and turns the marquee into a static wrapped grid with duplicates hidden.
- [ ] Increase `.section-padding` vertical rhythm to `py-24 md:py-32`; divider line uses `--color-gold`.
- [ ] `npm run build` passes. Commit.

### Task 2: Motion primitives
**Files:** Create `src/lib/motion.ts`, `src/components/motion/Reveal.tsx`, `src/components/motion/ScrollWords.tsx`, `src/components/motion/ParallaxImage.tsx`
- [ ] `prefersReducedMotion()` helper (SSR-safe).
- [ ] `Reveal`: client wrapper; on mount, if below 90% of viewport and motion allowed, add `reveal-hidden` via `classList`, remove it when IntersectionObserver fires (rootMargin `0px 0px -10% 0px`), then disconnect. Props: `children`, `className`, `delay` (ms).
- [ ] `ScrollWords`: props `paragraphs: Segment[][]` where `Segment = { text: string; bold?: boolean }`. Splits on `/(\s+)/`, words as `<span class="sw-word">`, whitespace as text; segment boundaries add no space. On mount (motion allowed) add `sw-active` to the container; a passive scroll listener + rAF toggles `on` for words whose top < 62% of viewport height.
- [ ] `ParallaxImage`: `next/image` fill inside an inner layer 120% tall, translated by `(elementCenter − viewportCenter) × −0.12` on scroll via rAF.
- [ ] lint + build pass. Commit.

### Task 3: Cinematic hero
**Files:** Modify `src/components/HeroSection.tsx`, `src/app/page.tsx`
- [ ] Client component. `h-[100svh] min-h-[560px]`, dark warm base color, Ken Burns layer with `hero-flower.jpg` (`preload`, `sizes="100vw"`, same object-positions as today), warm shade gradient (.28/.15/.62).
- [ ] `<h1 className="sr-only">מקום לנשום — עידן פלג</h1>`; cream logo (`logo-cream.png`, `preload`, `hero-logo` class, drop-shadow); subtitle "מרחב לריפוי, התפתחות ושיבה הביתה." fades up.
- [ ] Mobile: content in lower part of screen (below the flower); desktop: centered.
- [ ] Scroll cue link to `#manifesto`.
- [ ] Scroll parallax via rAF: bg `translateY(y*0.35)`, content `opacity 1−y/(0.6h)` and `translateY(−0.15y)`; skipped under reduced motion.
- [ ] `page.tsx`: wrap everything after the hero in a `relative z-10 -mt-10 rounded-t-[2.5rem]` cream sheet so content rises over the image.
- [ ] Screenshot desktop + mobile; logo legible, not overlapping the flower on mobile. lint + build. Commit.

### Task 4: Sections — Manifesto, CoreLogic, Video
**Files:** Modify `src/components/ManifestoSection.tsx`, `CoreLogicSection.tsx`, `VideoSection.tsx`
- [ ] Manifesto: `id="manifesto"`, text in `Reveal`, `space.jpg` via `ParallaxImage` in a rounded frame.
- [ ] CoreLogic: both paragraphs through `ScrollWords`, bold segments preserved, larger display-font text; copy identical.
- [ ] Video: phone frame (dark bezel, `rounded-[2.5rem]`, `max-w-[340px]`), iframe `loading="lazy"`; heading in `Reveal`.
- [ ] Screenshots + lint + build. Commit.

### Task 5: Services cards
**Files:** Modify `src/components/ServicesSection.tsx`
- [ ] Overlay cards (`svc-card`): image fill, gradient, title on image, description revealed on hover; always visible on `(hover: none)`; keyboard focus (`tabIndex=0`) behaves like hover. Cards wrapped in `Reveal` with 0/120/240ms delays.
- [ ] Screenshots + lint + build. Commit.

### Task 6: About + Contact + footer
**Files:** Modify `src/components/AboutSection.tsx`, `ContactSection.tsx`, `src/app/page.tsx`
- [ ] About: arch-shaped portrait (`rounded-t-[999px] rounded-b-3xl`) with an offset accent arch behind it; second paragraph's sentence "המטרה שלי…" rendered as a display-font blockquote (same words).
- [ ] Contact: dark-green rounded card, cream text, faint cream logo watermark, `.cta-gold` WhatsApp button (same link).
- [ ] Footer: small green logo above the copyright line.
- [ ] Screenshots + lint + build. Commit.

### Task 7: Testimonials marquee
**Files:** Modify `src/components/TestimonialsSection.tsx`, `src/components/ui/dialog.tsx`
- [ ] Two rows (first 6 / remaining 5), each list rendered twice (second copy `aria-hidden`, buttons `tabIndex={-1}`), opposite directions, 60s loop, pause on hover/focus-within. Click opens existing Dialog.
- [ ] Dialog content `max-h-[90vh] overflow-y-auto` so tall screenshots fit.
- [ ] Reduced motion → static wrapped grid, duplicates hidden.
- [ ] Screenshots + lint + build. Commit.

### Task 8: Newsletter popup (timing + real submission)
**Files:** Create `src/app/api/newsletter-signup/route.ts`; Modify `src/components/NewsletterPopup.tsx`
- [ ] Bug found during design: the popup shows "נרשמת בהצלחה" but sends nothing. Add API route (same pattern as `challenge-waitlist`: honeypot, email validation, Resend to the existing inbox) and POST to it; show success only on `success: true`, error text otherwise.
- [ ] Open when scroll passes 50% of the page (not on a timer); remember dismissal in `localStorage` (try/catch).
- [ ] lint + build. Commit.

### Task 9: Verification, preview, go-live
- [ ] Full-page screenshots desktop + mobile; reduced-motion screenshot; check no horizontal scroll at 390px.
- [ ] Independent review agent checks spec coverage and code quality.
- [ ] `vercel deploy` (preview, not `--prod`) from the branch; send link to user.
- [ ] After approval only: remove the `/` → `/in-out` redirect from `next.config.ts`, merge to `main`, deploy production, verify `makom-linshom.com` shows the homepage and `/in-out` + its form still work.
