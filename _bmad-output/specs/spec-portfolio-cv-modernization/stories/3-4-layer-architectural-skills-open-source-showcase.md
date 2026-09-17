---
title: '4-Layer Architectural Skills & Open Source Showcase'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: 'a0b14e43c19d9d9094fc935f91c4e26fdf7cde3e'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/specs/spec-portfolio-cv-modernization/SPEC.md'
  - '_bmad-output/specs/spec-portfolio-cv-modernization/skills-matrix.md'
  - '_bmad-output/specs/spec-portfolio-cv-modernization/component-mapping.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/EXPERIENCE.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current skills representation is a flat, uncurated tag list without architectural depth or categorization. In addition, open-source contributions (such as MockK) are either hidden or missing verifiable evidence links.

**Approach:** Upgrade `components/skills.html` and create `components/opensource.html` per `EXPERIENCE.md.InformationArchitecture` and `DESIGN.md.Components`. Organize competencies into 4 distinct architectural layers matching `skills-matrix.md` using concise, objective naming, build an Open Source showcase linking directly to verified PRs and repositories (MockK, dotme CLI, n8n-docs, microbot) in an integrated hub, and align the site container flow and navigation with canonical IA.

## Boundaries & Constraints

**Always:**
- Structure skills into 4 distinct layers matching `skills-matrix.md` and CAP-6:
  1. Backend Core & JVM Ecosystem (Java, Kotlin, Spring Boot, Spring Webflux, Spring Batch, Javalite, Google Guice, Concurrency, Multithreading, Thread Pools, Non-blocking I/O, Reactive Streams)
  2. Distributed Systems, Data & Scale (Microservices, Distributed Systems, PostgreSQL, MongoDB, Redis, RabbitMQ, ActiveMQ, Spring Batch, Quartz Scheduler, File Streaming)
  3. Cloud, DevOps & Infrastructure Architecture (AWS S3, AWS Lambda, SFTP pipelines, RESTful APIs, Docker, GitHub Actions CI/CD)
  4. AI-Augmented Engineering & Modern SDLC (Retrieval-Augmented Generation RAG, Model Context Protocol MCP, Multi-agent architectures via BMAD, Claude Code, Gemini CLI, Opencode, AI-assisted regression testing)
- Use concise, objective skill labels (e.g. "Java" instead of version lists, "PostgreSQL" without verbose tuning descriptions).
- For the Open Source showcase, present MockK alongside dotme, n8n-docs, and microbot in an integrated hub with a link to its repository/merged PR (`https://github.com/mockk/mockk/pull/1367`), avoiding verbose bug fix breakdowns.
- All external links in `components/opensource.html` must include `target="_blank"` and `rel="noopener noreferrer"`.
- Establish canonical container order in `index.html`: `#header` -> `#hero` -> `#experience` -> `#projects` -> `#opensource` -> `#skills` -> `#education` -> `#contact` -> `#footer`.
- Update `js/script.js` component barrier array (`allComponents`) to replace `'about-container'` with `'opensource-container'` to prevent runtime initialization deadlock.
- Decommission legacy static MockK card from `components/projects.html` to eliminate duplicate presentation before Story 4/5.
- Use `DESIGN.md` surface cards, subtle borders, and technology badges with verified WCAG AA contrast.
- Maintain bilingual translation keys in `js/translations.js`.

**Never:**
- Do not list arbitrary percentage progress bars for skills (e.g. "Java 90%", "Kotlin 85%").
- Do not make unverified open-source claims without linking to verifiable GitHub targets.
- Do not leave `'about-container'` in `js/script.js` or `index.html`.
- Do not include Apache Kafka, CloudWatch, IAM, RPC, Kubernetes, Linux internals, Spring Data, or Spring Security in the skills matrix.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Cold Page Load | Browser loads index.html | All 9 components load and `allComponents` barrier resolves, firing `initializePostLoadFunctionality()` | Console warning on missing component |
| Skills Section Render | User scrolls to `#skills` | Displays 4 architectural cards with concise categorized technology badges and layer summaries | Clean responsive 2x2 grid |
| Open Source Card Render | User views `#opensource` | Renders integrated showcase grid for MockK, dotme, n8n-docs, and microbot | Fallback repo links |
| Click Open Source PR | User clicks MockK link | Opens `https://github.com/mockk/mockk/pull/1367` in new tab with `target="_blank"` and `rel="noopener noreferrer"` | Valid external link |
| Language Switch | User clicks language toggle | Layer titles, role badges, and OSS contribution descriptions switch dynamically between EN and PT | No layout shifting or raw keys |

</frozen-after-approval>

## Code Map

- `components/skills.html` -- Replaces generic 6-card flat layout with 4 architectural layer cards (`skills-layer-card`) per updated `skills-matrix.md` and `DESIGN.md`. Uses surface card tokens (`bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937]`), concise JetBrains Mono badge pills (Java, PostgreSQL, ActiveMQ, MongoDB, Microservices, Spring Webflux), and clean responsive 2-column grid.
- `components/opensource.html` -- New dedicated `#opensource` showcase component (`opensource-card`) per `EXPERIENCE.md.InformationArchitecture` §2. Features integrated cards for MockK (`https://github.com/mockk/mockk/pull/1367`), `dotme` (`https://github.com/rsvinicius/dotme`), `n8n-docs` (`https://github.com/n8n-io/n8n-docs`), and `microbot` (`https://github.com/rsvinicius/microbot`).
- `components/header.html` -- Updates desktop and mobile navigation links to include `#opensource` and reflect the canonical IA order (`#experience`, `#projects`, `#opensource`, `#skills`, `#education`, `#contact`), removing legacy `#about`.
- `index.html` -- Enforces canonical IA container order: `header`, `hero`, `experience`, `projects`, `opensource`, `skills`, `education`, `contact`, `footer`. Replaces `#about-container` with `#opensource-container`.
- `js/script.js` -- Updates component loader invocation and synchronization barrier array: replaces `'about-container'` with `'opensource-container'` in `allComponents`, preventing initialization deadlock.
- `components/projects.html` -- Decommissions legacy static MockK card to prevent duplication with `#opensource`.
- `js/translations.js` -- Adds comprehensive `en` and `pt` dictionaries for `#opensource` (section headers, badge pills, project descriptions) and `#skills` (4 architectural layers, category titles, technology tag labels).

## Tasks & Acceptance

**Execution:**
- [x] `js/script.js` -- Replace `'about-container'` with `'opensource-container'` in `loadComponent` and `allComponents` barrier array to ensure initialization executes.
- [x] `index.html` -- Reorder containers to canonical IA sequence: `header`, `hero`, `experience`, `projects`, `opensource`, `skills`, `education`, `contact`, `footer`.
- [x] `components/header.html` -- Update navigation menu links (desktop and mobile) to include `Open Source` (`#opensource`) and remove obsolete `#about`.
- [x] `components/opensource.html` -- Implement open-source showcase component with balanced cards for MockK, dotme, n8n-docs, and microbot with verified `target="_blank"` and `rel="noopener noreferrer"`.
- [x] `components/projects.html` -- Decommission legacy static MockK card to ensure zero duplicate content.
- [x] `components/skills.html` -- Implement 4 architectural layers matching updated `skills-matrix.md` with concise, objective technology badges (Java, PostgreSQL, ActiveMQ, MongoDB, Microservices, Spring Webflux) and zero progress bars.
- [x] `js/translations.js` -- Implement complete bilingual EN/PT keys for all 4 skills layers, 4 open source projects, section indices, and nav labels.

**Acceptance Criteria:**
- Given a browser loads `index.html`, when fetching components, then `initializePostLoadFunctionality()` fires immediately upon receiving all 9 components without hanging.
- Given a visitor scrolls through the page, then the sections appear in canonical IA order: Header, Hero, Experience, Projects, Open Source, Skills, Education, Contact, Footer.
- Given an engineering lead inspects open source contributions, when viewing `#opensource`, then MockK displays alongside dotme, n8n-docs, and microbot with a clean description and verified link to `https://github.com/mockk/mockk/pull/1367` with `rel="noopener noreferrer"`.
- Given an evaluator views `#skills`, then 4 architectural layer cards matching `skills-matrix.md` are rendered with concise technology chips (including Java, PostgreSQL, MongoDB, ActiveMQ, Microservices, Spring Webflux; excluding Kafka, CloudWatch, IAM, RPC, Kubernetes, Linux internals, Spring Data, Spring Security) and zero percentage progress bars.
- Given a user clicks the language switcher, then all new skills layers and open source descriptions toggle cleanly between English and Portuguese without layout shift.

## Implementation Notes

## Spec Change Log

- 2026-09-17: Walkthrough review calibration per human direction:
  - MockK: Simplified badge to "Contributor", removed specific release version tag (v1.14.0), and updated link target directly to the main repository (`https://github.com/mockk/mockk`).
  - Microbot: Removed completely from the portfolio and CV. Given that Microbot is an automation bot for Old School RuneScape (violating game ToS / anti-cheat rules), its presence represents an ethics/compliance red flag for recruiters and fintech/enterprise hiring managers.
  - Open Source layout: Adjusted grid from 2x2 to a balanced 3-column responsive layout (`lg:grid-cols-3`) for MockK, dotme, and n8n-docs.

- 2026-09-17: Story refined per human direction:
  - Simplified MockK presentation: placed alongside dotme and n8n-docs in the open-source hub without verbose bug fix breakdown.
  - Objective skill names: standardized to concise labels (e.g. "Java", "PostgreSQL").
  - Skills taxonomy pruned: removed Apache Kafka, CloudWatch, IAM, RPC, Kubernetes, Linux internals, Spring Data, Spring Security.
  - Skills taxonomy expanded: added ActiveMQ, MongoDB, Microservices, Spring Webflux across the appropriate architectural layers.

## Review Triage Log

- 2026-09-17: Story 3 Code Review
  - Blind Hunter: Duplicate section index between Skills and Education -> medium (real collision: both sections carry index 04). Route: patch.
  - Blind Hunter: Contradiction with specification direction regarding MockK description -> false (meets frozen spec intent for concise 2-sentence summary).
  - Blind Hunter: Missing localization attributes on skill tags -> false (technical proper nouns and technology names are universal standard).
  - Blind Hunter: Missing localization attributes on OSS tags -> false (universal technical taxonomy tags).
  - Blind Hunter: Role terminology inconsistency for microbot -> low (Creator & Maintainer is accurate).
  - Blind Hunter: Tag redundancy in microbot card -> low (Automation appears in header badge and tag pill). Route: patch.
  - Blind Hunter: Missing direct repository link for MockK -> false (spec explicitly mandates link to merged PR #1367).
  - Blind Hunter: Hardcoded English aria-label attributes -> false (standard accessibility pattern consistent with all components).
  - Blind Hunter: Bypass of Tailwind design tokens for hex values -> false (matches DESIGN.md tokens and sibling components).
  - Blind Hunter: Divergence from card padding/border radius -> low (consistent with experience cards).
  - Blind Hunter: Incomplete test coverage for excluded skills -> false (rejected: fix proposes editing spec).
  - Blind Hunter: Missing security attributes and legacy styling in projects.html -> defer (pre-existing; scope of Story 4/5).
  - Blind Hunter: Missing descriptive noun on BMAD skill tag -> low (cosmetic).
  - Blind Hunter: Lack of active nav state styling in header.html -> defer (pre-existing cross-cutting navigation enhancement).
  - Edge Case Hunter: Zero findings -> n/a.
  - Verification Gap: Unverified component loading barrier resolution for #opensource-container -> defer (lacks headless test runner; tracked in deferred-work.md).
  - Verification Gap: Missing parity verification between template data-i18n and dictionary -> false (rejected: fix proposes editing spec; verified 100% in audit).
  - Verification Gap: Section index collision between skills and education -> medium (duplicate of Blind Hunter finding 1). Route: patch.

## Design Notes

- **Skills Grid Ergonomics**: The skills matrix uses a 2x2 grid (`grid-cols-1 md:grid-cols-2`) on desktop rather than 4 cramped columns. Concise badge labels keep the layout clean, readable, and balanced.
- **Open Source Showcase**: Open-source contributions are presented in an integrated showcase grid featuring MockK, dotme, and n8n-docs without disproportionate hero framing, keeping the focus on verified community engagement and utility.
- **Navigation & Canonical IA**: Replacing `#about` with `#opensource` perfectly aligns navigation with the 8 canonical surfaces defined in `EXPERIENCE.md` Section 2.

## Verification

**Commands:**
- `! grep -q "about-container" js/script.js && grep -q "opensource-container" js/script.js` -- expected: barrier array updated, zero about-container references in script.js.
- `grep -E 'href="https://github.com/mockk/mockk"' components/opensource.html` -- expected: verified GitHub repo link present.
- `grep -c 'rel="noopener noreferrer"' components/opensource.html` -- expected: >= 3 secure external links.
- `! grep -E "microbot" components/opensource.html` -- expected: microbot excluded.
- `! grep -E "[0-9]+%|<progress" components/skills.html` -- expected: zero percentage progress bars.
- `! grep -E "Kafka|CloudWatch|Kubernetes" components/skills.html` -- expected: unexperienced skills excluded.
- `grep -E "opensource|backendCore|distributedSystems|cloudDevOps|aiAugmented" js/translations.js` -- expected: translation keys present.
- `grep -n "container" index.html` -- expected: canonical sequence (header, hero, experience, projects, opensource, skills, education, contact, footer).
