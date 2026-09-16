---
title: 'Executive Hero, Direct Contact & SEO'
type: 'feature'
created: '2026-09-16'
status: 'draft'
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

**Approach:** Upgrade `index.html`, `components/hero.html`, `components/contact.html`, and `js/translations.js` following the exact visual tokens from `DESIGN.md` and behavioral rules from `EXPERIENCE.md`. Establish an authoritative senior engineering presence with verified scale metrics (+500M req/mo, +$100B volume), an active pulsing availability beacon (`badge-status`), an ATS-friendly CV download trigger, a structured pre-filled mailto action, and complete OpenGraph/SEO meta tags.

## Boundaries & Constraints

**Always:**
- Keep typography aligned with Inter for UI text and JetBrains Mono for technical metrics per `DESIGN.md.typography`.
- Retain dark mode as default and support light mode using tokens from `DESIGN.md.colors` (WCAG AA verified $\ge 4.5:1$).
- Maintain bilingual parity between English (`en`) and Portuguese (`pt`) via `js/translations.js` and `data-i18n` attributes.
- Render scale metrics statically: **NO progressive count-up counter animations** per `EXPERIENCE.md` (recruiters scan and evaluate in $<30\text{s}$).
- Availability beacon must pulse with green color `{colors.status-approved}` (`#10B981` dark, `#047857` light).
- Reference visual composition and DOM structure in `mockups/hero-and-experience.html`.

**Never:**
- Do not introduce heavyweight external CSS/JS libraries or brittle contact form backends.
- Do not use marketing buzzwords, vague adjectives, or unverified claims.
- Do not break existing component loading sequence in `js/script.js`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Page Load (SEO & Meta) | Browser or crawler requests `index.html` | Renders title `Vinicius R. Silva \| Senior Software Engineer`, updated description, OpenGraph tags, and theme-color | Standard fallback defaults |
| Hero Metric Display | Hero section renders | Displays +500M req/mo and +$100B processed volume statically with no count-up animation | Graceful static text rendering |
| Availability Beacon | Hero section renders | Displays pulsing green dot + "Open to select senior/staff opportunities (Remote / Hybrid)" | Static CSS pulse animation |
| ATS CV Download | User clicks "Download CV" CTA | Initiates download or opens ATS CV PDF in new tab | Fallback link target `_blank` |
| Direct Contact Action | User clicks Email CTA in hero or contact card | Opens default email client with pre-filled subject and body | Clean mailto URI encoding |
| Language Switch | User clicks language toggle | All hero and contact labels translate cleanly between EN and PT without layout shifts | Retain current language in localStorage |

</frozen-after-approval>

## Code Map

- `index.html` -- Root HTML shell; update document `<title>`, `<meta name="description">`, OpenGraph (`og:title`, `og:description`, `og:image`, `og:type`), Twitter meta tags, and favicon/meta settings.
- `components/hero.html` -- Hero component template; implement executive headline ("Vinicius R. Silva - Senior Software Engineer | Backend & Distributed Systems"), factual scale metrics bar, pulsing availability beacon, primary CV CTA, and social/contact shortcuts per `mockups/hero-and-experience.html`.
- `components/contact.html` -- Contact section template; implement direct executive contact card with structured mailto trigger, direct LinkedIn and GitHub channels, and direct ATS CV download option.
- `js/translations.js` -- Bilingual localization dictionary; add and synchronize translation keys for executive headline, specialization statement, scale metrics labels, availability badge, CTA buttons, and structured email subject/body strings.
- `js/script.js` -- Main client script; maintain component loading cycle and post-load translation hooks.

## Tasks & Acceptance

**Execution:**
- [ ] `index.html` -- Update document title, description, and OpenGraph/SEO metadata -- Ensure executive positioning is crawlable and shareable.
- [ ] `components/hero.html` -- Refactor hero layout per `mockups/hero-and-experience.html` with headline, availability beacon, static metric highlights (+500M req/mo, +$100B volume), and primary/secondary CTAs -- Establish immediate senior authority per CAP-1.
- [ ] `components/contact.html` -- Rebuild contact card with pre-filled structured mailto link, ATS CV download button, and direct profiles per DESIGN.md tokens -- Lower friction for executive outreach per CAP-8.
- [ ] `js/translations.js` -- Add and synchronize English and Portuguese localization keys for all new hero, metric, badge, and contact strings -- Ensure full bilingual parity per CAP-9.

**Acceptance Criteria:**
- Given a visitor lands on the homepage, when the hero loads, then they see the headline "Vinicius R. Silva", the role "Senior Software Engineer | Backend & Distributed Systems", static scale metrics for "+500M req/mo" and "+$100B volume" (no count-up delay), and an active availability beacon.
- Given a hiring manager clicks the primary CTA "Download CV", when clicked, then the ATS-compliant resume PDF is triggered.
- Given a recruiter clicks the direct email CTA, when clicked, then the default mail client opens with a pre-populated subject line ("Senior Engineering Opportunity - Vinicius R. Silva") and polite inquiry template.
- Given a visitor toggles the language switch between English and Portuguese, when toggled, then all hero headlines, metric descriptions, badges, and contact CTAs switch language without layout clipping or unrendered placeholder keys.

## Implementation Notes
- Design Tokens: Use `{colors.surface-card}`, `{colors.border-subtle}`, `{colors.text-primary}`, `{colors.status-approved}` as defined in `DESIGN.md`.

## Verification

**Commands:**
- `grep -E "500M|\+100B" components/hero.html js/translations.js` -- expected: Matches present in both template and localization dictionary.
- `grep -E "mailto:vrodrigues.code@gmail.com\?subject=" components/contact.html components/hero.html` -- expected: Structured mailto URI present.

**Manual checks:**
- Verify dark mode and light mode contrast for hero metrics cards and availability beacon.
- Verify that clicking the language toggle updates all text elements dynamically via `data-i18n`.
