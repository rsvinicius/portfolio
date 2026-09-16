---
title: 'Executive Hero, Direct Contact & SEO'
type: 'feature'
created: '2026-09-16'
status: 'done'
baseline_commit: '9ca6de76c019da25e7bd78d04a33828dda112563'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/specs/spec-portfolio-cv-modernization/SPEC.md'
  - '_bmad-output/specs/spec-portfolio-cv-modernization/component-mapping.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/EXPERIENCE.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/hero-and-experience.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current hero and contact sections present a generic, descriptive junior/mid profile ("Software Developer") without immediate quantitative scale metrics, active hiring status, or high-conversion executive outreach mechanisms.

**Approach:** Upgrade `index.html`, `components/hero.html`, `components/contact.html`, and `js/translations.js` following the exact visual tokens from `DESIGN.md` and behavioral rules from `EXPERIENCE.md`. Establish an authoritative senior engineering presence with verified scale metrics (+500M req/mo, +$100B volume, +500 TPS), an active pulsing availability beacon (`badge-status`), an ATS-friendly CV download trigger, a structured pre-filled mailto action, and complete OpenGraph/SEO meta tags.

## Boundaries & Constraints

**Always:**
- Keep typography aligned with Inter for UI text and JetBrains Mono for technical metrics per `DESIGN.md.typography`.
- Retain dark mode as default and support light mode using tokens from `DESIGN.md.colors` (WCAG AA verified $\ge 4.5:1$).
- Maintain bilingual parity between English (`en`) and Portuguese (`pt`) via `js/translations.js` and `data-i18n` attributes.
- Render scale metrics statically: **NO progressive count-up counter animations** per `EXPERIENCE.md` (recruiters scan and evaluate in $<30\text{s}$).
- Availability beacon must pulse with green color `{colors.status-approved}` (`#10B981` dark, `#047857` light).
- Reference visual composition and DOM structure in `mockups/hero-and-experience.html`.
- Use ATS CV PDF path `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` for downloads with `download` attribute and fallback `target="_blank"`.

**Never:**
- Do not introduce heavyweight external CSS/JS libraries or brittle contact form backends.
- Do not use marketing buzzwords, vague adjectives, or unverified claims.
- Do not break existing component loading sequence in `js/script.js`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Page Load (SEO & Meta) | Browser or crawler requests `index.html` | Renders title `Vinicius R. Silva \| Senior Software Engineer`, updated description, OpenGraph tags, and theme-color | Standard fallback defaults |
| Hero Metric Display | Hero section renders | Displays +500M req/mo, +$100B volume, and +500 TPS statically with no count-up animation | Graceful static text rendering |
| Availability Beacon | Hero section renders | Displays pulsing green dot + "Open to select senior/staff opportunities (Remote / Hybrid)" | Static CSS pulse animation |
| ATS CV Download | User clicks "Download ATS CV" CTA | Initiates download of `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` or opens in new tab | Fallback link target `_blank` |
| Direct Contact Action | User clicks Email CTA in hero or contact card | Opens default email client with pre-filled subject and body | Clean mailto URI encoding |
| Language Switch | User clicks language toggle | All hero and contact labels translate cleanly between EN and PT without layout shifts | Retain current language in localStorage |

</frozen-after-approval>

## Code Map

- `index.html` -- Root HTML shell; update `<title>` to "Vinicius R. Silva | Senior Software Engineer", add meta description, OpenGraph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:url`), Twitter meta tags, Google Fonts (Inter & JetBrains Mono), and configure Tailwind colors matching `DESIGN.md`. Do not alter component mount points (`#hero-container`, `#contact-container`, etc.) or script execution order.
- `components/hero.html` -- Hero component template; implement executive layout per `mockups/hero-and-experience.html` including:
  - Availability beacon (`.badge-availability`) with CSS pulse beacon dot (`#10B981`) and `data-i18n="availabilityBeacon"`.
  - Executive headline ("Vinicius R. Silva") and subtitle ("Senior Software Engineer • Backend & Distributed Systems" with `data-i18n="heroRole"`).
  - Specialization statement per `DESIGN.md` / `EXPERIENCE.md` with `data-i18n="heroDesc"`.
  - Primary CTA button "Download ATS CV (PDF)" linking to `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf`, secondary direct links for GitHub, LinkedIn, and pre-filled email.
  - Three static metric cards (+500M B2C Scale Throughput, +$100B B2B Financial Volume, +500 TPS Peak Backoffice Rate) with `JetBrains Mono` numbers and zero count-up animation.
- `components/contact.html` -- Contact section template; replace dummy form with direct executive contact card featuring pre-filled mailto link (`mailto:vrodrigues.code@gmail.com?subject=...`), direct CV download trigger, and LinkedIn/GitHub profiles.
- `js/translations.js` -- Localization dictionary; add and synchronize translation keys (`availabilityBeacon`, `heroRole`, `heroDesc`, `downloadCv`, `contactEmailSubject`, `contactEmailBody`, `metric1Num`, `metric1Label`, `metric1Sub`, `metric2Num`, `metric2Label`, `metric2Sub`, `metric3Num`, `metric3Label`, `metric3Sub`) across both `en` and `pt`.
- `js/script.js` -- Main client runtime; verify component loading and translation bindings without altering existing component lifecycle.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Update document title, description, OpenGraph/Twitter metadata, and Google Fonts -- Ensure executive positioning is crawlable and shareable per CAP-1.
- [x] `components/hero.html` -- Implement executive hero layout per `mockups/hero-and-experience.html` with headline, pulsing availability beacon, static metric cards (+500M, +$100B, +500 TPS), and primary/secondary CTAs -- Establish immediate senior authority per CAP-1.
- [x] `components/contact.html` -- Rebuild contact section with direct executive card, pre-filled structured mailto trigger, direct ATS CV download button, and profiles per DESIGN.md -- Lower friction for outreach per CAP-8.
- [x] `js/translations.js` -- Add and synchronize English and Portuguese localization keys for all new hero headlines, descriptions, metric cards, badges, and contact strings -- Ensure full bilingual parity per CAP-9.

**Acceptance Criteria:**
- Given a visitor lands on the homepage, when the hero loads, then they see the headline "Vinicius R. Silva", the role "Senior Software Engineer • Backend & Distributed Systems", static scale metrics for "+500M req/mo", "+$100B volume", and "+500 TPS" (with zero count-up animation delay), and an active pulsing availability beacon.
- Given a hiring manager clicks "Download ATS CV", when clicked, then the ATS-compliant resume PDF `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` is triggered with download attribute and `_blank` target fallback.
- Given a recruiter clicks the direct email CTA, when clicked, then the default mail client opens with a pre-populated subject line ("Senior Engineering Opportunity - Vinicius R. Silva") and inquiry body.
- Given a visitor toggles the language switch between English and Portuguese, when toggled, then all hero headlines, metric descriptions, badges, and contact CTAs switch language without layout clipping or unrendered placeholder keys.

## Implementation Notes

## Spec Change Log

## Review Triage Log

| ID | Location | Verdict | Evidence & Rationale |
|---|---|---|---|
| F-01 | `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` | `high` | Stream string contains `+00B` instead of `+$100B` due to bash string interpolation drop of `$1`, and stream length mismatch. |
| F-02 | `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` | `medium` | PDF stub lacks substantive ATS sections (skills, work history, education); expand content to match executive profile. |
| F-03 | `components/contact.html:36,44` | `medium` | Contact social cards hardcode English subtitles 'Connect' and 'Inspect Code' without `data-i18n` attributes. |
| F-04 | `index.html:15,22` | `medium` | OpenGraph and Twitter images use relative paths (`assets/profile-photo.jpg`); social preview crawlers require absolute URL `https://viniciussilva.dev/assets/profile-photo.jpg`. |
| F-05 | `js/script.js:210-218` | `low` | Verification gap: dynamic mailto URI updates on language switch lack automated test assertion. |
| F-06 | `js/script.js:230-264` | `low` | Verification gap: clipboard copy fallback and feedback toast lack automated test assertion. |
| F-07 | `js/script.js:211-212` | `low` | Unhandled fallback if translations dictionary or key is undefined when updating mailto links. |
| F-08 | `js/script.js:260-264` | `low` | `document.execCommand('copy')` return value not checked before displaying success feedback. |
| F-09 | `js/script.js:233-241` | `low` | Rapid repeated clicks on copy button can cause earlier timeout to hide feedback prematurely. |
| F-10 | `index.html:92-96` | `low` | Head theme initialization lacks `try...catch` around `localStorage.getItem` for restricted environments. |
| F-11 | `index.html:81-88` | `low` | Missing `@media (prefers-reduced-motion: reduce)` override to disable beacon pulse animation for sensitive users. |
| F-12 | `components/hero.html:7`, `components/contact.html:28` | `low` | Missing ARIA attributes: `.badge-availability` needs `role="status"` and `#copy-feedback` needs `aria-live="polite"`. |
| F-13 | `js/script.js:215-216` | `low` | Mailto CRLF newline encoding `%0D%0A` should be used consistently instead of plain LF `%0A` for desktop mail clients. |
| F-14 | `components/contact.html:28` | `low` | Email copy toast causes minor CLS when unhidden; reserve layout height or position to prevent shift. |
| F-15 | `index.html:8` | `low` | Missing `<link rel="canonical" href="https://viniciussilva.dev/">` for SEO best practice. |

## Design Notes

- Color tokens mapped from `DESIGN.md`:
  - Canvas / Surface Base: `#0B0F19` (dark) / `#F8FAFC` (light)
  - Cards: `#111827` (dark) / `#FFFFFF` (light)
  - Borders: `#1F2937` (dark) / `#E2E8F0` (light)
  - Text Primary: `#F9FAFB` (dark) / `#0F172A` (light)
  - Text Secondary: `#9CA3AF` (dark) / `#475569` (light)
  - Status Approved: `#10B981` (dark) / `#047857` (light)
  - Accent Primary: `#3B82F6` (dark) / `#2563EB` (light)
- Beacon Pulse CSS:
  ```css
  @keyframes beacon-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.85); }
  }
  ```

## Verification

**Commands:**
- `grep -E "500M|\+100B|500 TPS" components/hero.html js/translations.js` -- expected: Matches present in both template and localization dictionary.
- `grep -E "mailto:vrodrigues.code@gmail.com\?subject=" components/contact.html components/hero.html` -- expected: Structured mailto URI present.
- `grep -E "Vinicius_Silva_Senior_Software_Engineer_CV.pdf" components/hero.html components/contact.html` -- expected: Download link present in both components.

**Manual checks (if no CLI):**
- Verify dark mode and light mode contrast for hero metrics cards and availability beacon.
- Verify that clicking the language toggle updates all text elements dynamically via `data-i18n`.
