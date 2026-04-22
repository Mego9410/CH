---
title: "Chronicle Health — Website Design Reference"
version: "v1"
last_updated: "2026-04-22"
inputs:
  copy_bundle: "content/copy/*"
  inspiration:
    - "https://incident.io/"
    - "https://www.clickup.com/"
---

## Purpose

This document is a **single reference** for designing and implementing the next Chronicle Health website template. It translates the strengths of `incident.io` (clarity, calm authority, modular product narrative) and `clickup.com` (conversion discipline, segmentation, metrics trust stack) into a **privacy-first, service-led** site.

## Brand stance (what the design must communicate)

- **Trust + sensitivity**: health data, privacy, control, deletion.
- **Service (not SaaS)**: a careful, high-touch process with clear boundaries.
- **Clarity over cleverness**: calm, legible, low-cognitive-load pages.
- **Premium minimalism**: restrained motion, strong hierarchy, generous spacing.

## Information architecture (IA)

Primary nav (top-level):

- Home (`content/copy/01-home.md`)
- For You? (`content/copy/02-for-you.md`)
- How It Works (`content/copy/03-how-it-works.md`)
- Privacy (`content/copy/04-privacy.md`)
- About (`content/copy/05-about.md`)
- Contact (`content/copy/06-contact.md`)

Global footer should always include:

- Global disclaimer + company compliance text (`content/copy/00-site-wide.shared.md`)
- Legal links (privacy/terms/how protected/etc.)

## Page flow principles (from inspirations)

### From incident.io (keep)

- **Pillars**: break the story into a few clear sections with consistent structure.
- **Trust interleaving**: put credibility cues *inside* sections, not only at the bottom.
- **Skimmability**: headings do the work; paragraphs are short; lists are used.
- **Calm motion**: mostly microinteractions and subtle reveals; no “party tricks.”

### From ClickUp (use selectively)

- **CTA repetition**: a clear primary CTA appears at multiple “decision points.”
- **Segmentation**: “is this for you?” style sections that let users self-select quickly.
- **Trust stack**: combine different trust modes (social proof, compliance, process).
- **Metrics**: if/when available, show quantified impact with cited sources.

### Where Chronicle Health should differ

- Avoid information overload: fewer simultaneous CTAs, fewer competing animations.
- Avoid heavy “product UI” theatrics: use real deliverable previews instead.
- Use motion to support reading and confidence, not to entertain.

## Component system (template building blocks)

All pages should be composable from a consistent set of sections. These names are intentionally generic so they map cleanly to any stack (Next.js, Astro, Webflow, etc.).

### 1) `Hero`

Contains:

- H1 + short subhead
- One primary CTA (button)
- Optional secondary CTA (link)
- Optional “trust chip” row (e.g. “Privacy-first”, “No data retention after delivery”)

Copy sources:

- Home hero (`content/copy/01-home.md`)
- Page headers per page documents

### 2) `ProblemStatement`

Contains:

- Strong H2
- 1–2 short paragraphs

Copy source:

- Home “Problem framing”

### 3) `ServicePillars` (3–5 cards or rows)

Contains:

- Pillar title + 1–2 sentence description each
- Optional “details” bullets (3–5 per pillar)

Mapping suggestion (Chronicle Health):

- Retrieve (SAR)
- Organise / structure
- Deliver files you own
- Delete after delivery

Copy sources:

- Home “What I do”
- How it works steps
- Privacy summary

### 4) `BenefitsGrid`

Contains:

- H2
- 3–6 benefit cards, each with short heading + 1–3 lines of body

Copy source:

- Home “Why it’s worth doing”

### 5) `Stepper`

Contains:

- Step number + title + short description
- Optional “what you need to provide” per step

Copy source:

- `content/copy/03-how-it-works.md`

### 6) `TrustAndPrivacy`

Contains:

- H2 + short lead
- 3–6 “trust bullets” (pseudonymisation, encrypted storage, deletion, etc.)
- Optional “processors” disclosure block
- Optional “no cookies” block

Copy sources:

- Home “Privacy and control”
- Privacy Notice page

### 7) `TestimonialQuote`

Contains:

- Quote + attribution

Copy source:

- Home testimonial

### 8) `AudienceSegments`

Contains:

- H1 or H2
- A list of segments (accordion, cards, or stacked sections)

Copy source:

- For You? page (`content/copy/02-for-you.md`)

### 9) `PricingBlock`

Contains:

- H2 + short pricing explanation
- Optional “fine print” (plain language)

Copy source:

- Home “Pricing”

### 10) `CTASection`

Contains:

- H2 + 1–2 lines
- Primary CTA button
- Optional “no commitment” reassurance line

Copy sources:

- Home final CTA
- How it works CTA
- For You? CTA

### 11) `ContactForm`

Contains:

- Email form fields
- Success/error copy
- Secondary channel block (WhatsApp)
- “Security note” block

Copy source:

- `content/copy/06-contact.md`

## Layout & typographic rules

These are implementation-agnostic; a developer can translate into CSS/Tailwind/etc.

- **Grid**: 12-col desktop, 6-col tablet, 1–2-col mobile.
- **Max width**: keep primary text blocks to a comfortable measure (avoid ultra-wide paragraphs).
- **Vertical rhythm**: large section padding; consistent spacing scale.
- **Hierarchy**:
  - H1: big, confident, not long.
  - H2: one idea per section.
  - Paragraphs: short; use lists where possible.
- **Links vs buttons**:
  - 1 primary button per section.
  - Secondary actions are text links (less visual weight).

## Motion & interaction system (animated features)

Chronicle Health should feel **alive but calm**. Aim for “incident.io-level restraint”, not “ClickUp-level spectacle.”

### Motion principles

- **Purposeful**: motion must clarify structure, indicate interactivity, or reduce uncertainty.
- **Subtle**: prefer small transforms/opacity changes; avoid large parallax shifts.
- **Accessible**: support reduced motion; never rely on animation for meaning.
- **Consistent**: use a small set of durations/easings everywhere.

### Recommended motion patterns

1) **Scroll reveal (section entrance)**
- Sections fade/translate in slightly as they enter viewport, with small stagger for child cards.
- Use for: BenefitsGrid cards, ServicePillars cards, Stepper steps.
- Avoid on: long legal/privacy text (let it be static and readable).

2) **Hover microinteractions**
- Buttons: subtle lift + shadow change.
- Cards: border/outline emphasis + slight elevation.
- Links: animated underline or color shift.

3) **Anchor navigation / in-page TOC (optional)**
- For long pages (How It Works, Privacy), provide a mini “jump to section” bar.
- Active state updates on scroll.

4) **Accordion for segments (optional)**
- For You? segments can be accordions to reduce scroll length.
- Use open/close animation with small height transition and opacity.

5) **Video modal (optional)**
- If you add a short “what you receive” walkthrough, use a modal with background dim + focus trap.

### Reduced motion requirements

If user preference indicates reduced motion:

- Disable scroll-reveal and large transforms.
- Keep hover states as color/border changes only.

## Page-by-page blueprint (wireframe-level)

Each page below lists the recommended section order using the component system above, and where the copy comes from.

### Home (`/`)

Recommended order:

1. `Hero` (H1/subhead/CTA) — from `content/copy/01-home.md`
2. `ProblemStatement` — from Home “Problem framing”
3. `ServicePillars` — map “What I do” into 3–5 pillars
4. `BenefitsGrid` — from “Why it’s worth doing”
5. `Stepper` (compact) — summary steps from “How it works (summary)”
6. `PricingBlock` — from “Pricing”
7. `TrustAndPrivacy` — from “Privacy and control” + short version of key points
8. `TestimonialQuote`
9. `CTASection` — “See what your health record could look like”

### For You? (`/for-you/`)

Recommended order:

1. `Hero` (page H1 + intro + CTA)
2. `AudienceSegments` (cards or accordion) — the six segments
3. `CTASection` — “Get in Touch”

### How It Works (`/how-it-works/`)

Recommended order:

1. `Hero` (H1 + intro + CTA)
2. `Stepper` (full) — steps 0–4
3. `TrustAndPrivacy` (short, reassurance) — deletion + privacy stance
4. `CTASection`

### Privacy (`/privacy/`)

Recommended order:

1. `Hero` (H1 only, calm)
2. `TrustAndPrivacy` (full) — summary bullets + processors
3. Longform sections (static) — rights, sharing, contact, ICO, etc.

Motion note: **minimal animation** on this page.

### About (`/about/`)

Recommended order:

1. `Hero` (short intro)
2. Longform story sections (static)
3. `TrustAndPrivacy` (short) — “one person start-to-finish”
4. `CTASection` (Get in touch)

### Contact (`/contact/`)

Recommended order:

1. `Hero` (H1 + short reassurance)
2. `ContactForm`
3. `CTASection` (optional, gentle) — “I’ll respond ASAP”

## Design QA checklist (what “good” looks like)

- **Clarity**: user can answer “what is this?” in 5 seconds.
- **Confidence**: privacy promises are visible early and repeated calmly.
- **Consistency**: CTAs and section templates repeat predictably.
- **Skimmability**: each section has one job; headings carry meaning.
- **Motion restraint**: animation never competes with sensitive content.

## References

- Inspiration: `https://incident.io/`
- Inspiration: `https://www.clickup.com/`
- Copy bundle: `content/copy/*`

