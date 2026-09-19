---
title: 'Portfolio UI/UX Anti-Slop Refactoring'
type: 'refactor'
created: '2026-09-19'
status: 'done'
baseline_commit: '2ba6902f61283f0a72add3b04d400fb4b114863b'
route: 'dispatch'
review_loop_iteration: 0
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The portfolio currently features excessive visual vertical spacing (160–200px gaps) and superficial interactive widgets (slider heuristic sandbox, fake terminal typewriter loop) that add cognitive clutter rather than showcasing genuine backend engineering depth. Furthermore, projects and open-source contributions are split across two separate sections with duplicate entries for `dotme`.

**Approach:** Unify "Projects" and "Open Source" into a single, cohesive 3-card grid (Antifraud System, MockK, dotme) using the clean open-source card archetype. Completely decommission interactive widget scripts, normalize vertical section padding across all sections to `py-8 lg:py-12`, update the navigation and section numbering (01. Experience, 02. Projects/Showcase, 03. Skills, 04. Education, 05. Contact), and maintain 100% parity across English and Portuguese bilingual translations.

## Boundaries & Constraints

**Always:**
- Keep all 3 cards in the unified grid visually uniform using the archetype established in `components/opensource.html` (category/role badge, title, concise description, tech stack badges, repository/release links).
- Maintain 100% dictionary key parity between English (`en`) and Portuguese (`pt`) in `js/translations.js`.
- Ensure all existing tests in `tests/localization.test.mjs` pass cleanly without errors or warnings.
- Keep the **About** copy foundation and **Skills** section structure intact.
- Ensure full responsiveness across mobile (<640px), tablet (768px), and desktop (>=1024px) viewports.

**Never:**
- Do not keep the interactive slider calculator or typewriter terminal loops; both must be fully retired.
- Do not retain duplicate cards for `dotme` across sections.
- Do not leave dead script imports or unreferenced DOM IDs in `js/script.js`.
- Do not break existing anchor links from navigation.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Cold load default view | Page loaded with no `localStorage` override | English copy rendered, dark mode applied, unified 3-card showcase rendered with Antifraud, MockK, and dotme | Graceful fallback if `localStorage` is restricted |
| Language switch to Portuguese | Click PT language toggle button in header | All card descriptions, tags, section titles, and badges switch to Portuguese without page reload | Fallback to English dictionary string if key missing |
| Mobile navigation click | Click Projects in mobile hamburger menu | Smooth scroll to `#projects` unified showcase; menu closes | Normal anchor scroll behavior |
| Repository link click | Click "View Repository" or "Release Notes" | Opens target GitHub URL in new browser tab with `target="_blank" rel="noopener noreferrer"` | N/A (static link) |

**Decisions:**
- Section Heading & Navigation: Retain `Projects` (`#projects`) in desktop/mobile navigation and section title as "Featured Projects" (`data-i18n="featuredProjects"`).

</frozen-after-approval>

## Code Map

- `index.html` -- Main entry point; remove `#opensource-container`, retain `#projects-container`.
- `components/header.html` -- Top bar navigation; update nav links and mobile menu links (remove separate `#opensource` link).
- `components/projects.html` -- Unified showcase component; replace previous slider widget and terminal markup with 3 uniform cards (Antifraud System, MockK, dotme) in a 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- `components/opensource.html` -- Decommission / retire (merged into `components/projects.html`).
- `components/hero.html` -- Section wrapper padding adjusted to `pt-20 pb-8 lg:pt-28 lg:pb-12`.
- `components/experience.html` -- Section wrapper padding adjusted to `py-8 lg:py-12`.
- `components/skills.html` -- Section wrapper padding adjusted to `py-8 lg:py-12`; section index updated to `03. SKILLS`.
- `components/education.html` -- Section wrapper padding adjusted to `py-8 lg:py-12`; section index updated to `04. EDUCATION`.
- `components/contact.html` -- Section wrapper padding adjusted to `py-8 lg:py-12`; section index updated to `05. CONTACT`.
- `js/script.js` -- Remove widget initialization functions (`initializeAntifraudSandbox`, `initializeDotmeTerminal`), remove dynamic imports of `antifraud-calculator.js` and `dotme-data.js`, remove `opensource-container` from `loadComponent` and `allComponents` barrier.
- `js/translations.js` -- Add updated translation keys for the unified 3 cards, remove retired widget strings (slider labels, terminal output, calculation formulas), and renumber section indices (02 Projects, 03 Skills, 04 Education, 05 Contact).
- `js/antifraud-calculator.js` & `js/dotme-data.js` -- Retire / remove unused widget helper modules.
- `tests/localization.test.mjs` -- Update test assertions for active translation keys and removed widget keys.
- `tests/antifraud.test.mjs` & `tests/dotme.test.mjs` -- Remove or retire obsolete widget test suites.

## Tasks & Acceptance

**Execution:**
- [x] `components/projects.html` -- Consolidate Projects and Open Source into a single 3-card grid showcasing Antifraud System, MockK, and dotme with uniform open-source card archetypes -- Eliminates duplicate dotme representations and establishes visual consistency.
- [x] `index.html` -- Remove `#opensource-container` div from DOM structure -- Reflects consolidation into single container.
- [x] `components/header.html` -- Update desktop and mobile navigation menus to remove `#opensource` link and ensure proper navigation targets -- Aligns navigation with consolidated sections.
- [x] `components/hero.html`, `components/experience.html`, `components/skills.html`, `components/education.html`, `components/contact.html` -- Normalize section vertical padding to `py-8 lg:py-12` (and adjusted hero top/bottom padding) -- Calibrates vertical rhythm and eliminates scroll fatigue.
- [x] `js/script.js` -- Strip widget initialization functions, event listeners, and dynamic imports (`antifraud-calculator.js`, `dotme-data.js`), and update component loader array -- Reduces JS payload and runtime execution overhead.
- [x] `js/translations.js` -- Add unified card copy (problem, solution, impact, tech tags) in both EN and PT, renumber section indices, and clean up retired widget keys -- Ensures 100% bilingual parity.
- [x] `js/antifraud-calculator.js`, `js/dotme-data.js`, `components/opensource.html` -- Remove retired widget files and unused HTML component -- Cleans up obsolete assets and prevents dead code accumulation.
- [x] `tests/localization.test.mjs`, `tests/antifraud.test.mjs`, `tests/dotme.test.mjs` -- Remove obsolete widget test files and update `localization.test.mjs` to validate the updated dictionaries and component keys -- Guarantees automated test suite integrity.

**Acceptance Criteria:**
- Given a visitor loads the portfolio on desktop or mobile, when scrolling through the page, then only one unified showcase section exists containing exactly three cards (Antifraud System, MockK, dotme) with identical structural layout.
- Given the portfolio page is loaded, when inspecting DOM elements, then no interactive sliders, score gauges, or terminal typewriter animations exist.
- Given a visitor toggles language between English and Portuguese, when viewing the unified showcase section, then all headings, badges, descriptions, and links are fully translated without missing key warnings or formatting glitches.
- Given a user clicks navigation links in the header, when selecting any section, then the viewport smoothly scrolls to the correct section without broken anchors.
- Given the automated test suite is run with `node tests/localization.test.mjs`, when executed, then all assertions pass with 100% dictionary parity and zero missing HTML `data-i18n` references.

## Implementation Notes

- Consolidated `components/projects.html` and `components/opensource.html` into a unified 3-card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) for Antifraud System, MockK, and dotme, adopting the clean open-source card archetype.
- Decommissioned interactive slider sandbox and autonomous terminal loop; removed `js/antifraud-calculator.js`, `js/dotme-data.js`, and associated test suites `tests/antifraud.test.mjs` and `tests/dotme.test.mjs`.
- Removed `components/opensource.html` and `#opensource-container` from `index.html`.
- Updated desktop and mobile navigation in `components/header.html` to eliminate the standalone open-source link and retain direct navigation to `#projects`.
- Audited and tightened section padding across `components/hero.html`, `components/experience.html`, `components/projects.html`, `components/skills.html`, `components/education.html`, and `components/contact.html` to `py-8 lg:py-12`.
- Renumbered section indices (01. Experience, 02. Projects, 03. Skills, 04. Education, 05. Contact) and synchronized bilingual dictionaries in `js/translations.js`.
- Verified `node tests/localization.test.mjs`: 11/11 tests passing with 100% dictionary key parity.

## Spec Change Log

## Review Triage Log

- `medium` (patch) -- `components/projects.html`: Missing `data-i18n="mockkTitle"` and `data-i18n="dotmeTitle"` on Card 2 & 3 headings; add attributes to enable runtime translation.
- `medium` (patch) -- `components/*.html`: Reduced section padding (`py-8 lg:py-12`) without `scroll-mt-16` / `scroll-mt-20` causes anchor navigation to scroll section headings behind fixed navbar; add `scroll-mt-16` / `scroll-mt-20`.
- `medium` (patch) -- `tests/localization.test.mjs`: Test suite lacks direct assertions verifying that the `allComponents` barrier in `js/script.js` matches `index.html` mounted containers, and tested mock card IDs rather than actual HTML `data-i18n` attributes.
- `low` (patch) -- `components/projects.html`: Inconsistent role badge border styling on Card 3 (`dotme`) lacks `dark:border-[#10B981]/30`; add class to match Card 1 and 2.
- `low` (patch) -- `components/projects.html`: Add semantic class `project-card` to each of the 3 showcase cards for discoverability.
- `low` (patch) -- `components/projects.html`: Align bottom CTA aria-label with visible copy ("View all repositories on GitHub (opens in new tab)").
- `low` (patch) -- `index.html`: Remove unused status color tokens (`status-approved`, `status-flagged`, `status-rejected`) from `tailwind.config`.
- `low` (defer) -- `js/script.js`: Pre-existing unused `initializeContactForm` and form translation strings; not part of showcase refactoring.
- `low` (defer) -- `components/about.html`: Pre-existing unmounted template file; already tracked in `deferred-work.md`.
- `low` (defer) -- `components/projects.html`: Hardcoded English `aria-label`s on repository links; pre-existing pattern across the site.
- `low` (defer) -- `components/projects.html`: Author PR #1367 direct link suggestion for MockK; card already links to repo and v1.14.0 release notes.

## Design Notes

The unified card archetype follows:
1. Card header: Role badge (e.g. "Production System" / "Contributor" / "Creator & Maintainer") and Category tag ("Backend Security", "Testing Library", "Developer CLI").
2. Title: Project Name (`<h3>` with `font-mono font-bold`).
3. Summary: Problem, architecture approach, and measurable impact (e.g., Spring Boot 4-tier RBAC + dynamic fraud limit heuristics; MockK hermetic state leak fix; dotme atomic symlink distribution).
4. Tech badges: 3-5 concise monospace tech tags.
5. Footer: GitHub repository link and relevant release/PR link.

## Verification

**Commands:**
- `node tests/localization.test.mjs` -- expected: 100% dictionary parity, all data-i18n references verified, all tests pass.
- `git status` -- expected: clean working directory reflecting only intended modifications and file retirements.

**Manual checks (if no CLI):**
- Verify responsiveness and uniform card height in desktop (3 columns), tablet (2 columns), and mobile (single column).
- Verify dark and light mode styling on all 3 cards.
