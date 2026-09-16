---
title: '4-Layer Architectural Skills & Open Source Showcase'
type: 'feature'
created: '2026-09-16'
status: 'draft'
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

**Problem:** The current skills representation is a flat, uncurated tag list without architectural depth or categorization. In addition, significant open-source contributions (such as the merged MockK core bug fix) are either hidden or missing verifiable evidence links.

**Approach:** Upgrade `components/skills.html` and create/update `components/opensource.html` (or integrate into `components/about.html` and `components/projects.html`) per `EXPERIENCE.md.InformationArchitecture` and `DESIGN.md.Components`. Organize competencies into 4 distinct architectural layers and build an Open Source showcase linking directly to verified PRs and repositories (MockK v1.14.0, dotme CLI, n8n-docs, microbot).

## Boundaries & Constraints

**Always:**
- Structure skills into 4 distinct layers per CAP-6 and `skills-matrix.md`:
  1. JVM Core & Modern Runtimes (Kotlin, Java 17/21, Spring Boot, Coroutines)
  2. Distributed Systems & High-Scale (Kafka, RabbitMQ, Event-Driven Architecture, Redis, Batch Pipelines)
  3. Cloud, Data & DevOps (AWS, Docker, Kubernetes, Terraform, PostgreSQL, CI/CD)
  4. AI-Augmented SDLC & Tooling (Agentic engineering, LLM-assisted workflows, Developer CLI tooling)
- For the Open Source showcase, prominently feature MockK with its exact contribution ("Fixed state leak in `confirmVerified` for hermetic test isolation in v1.14.0") and link directly to the merged GitHub PR.
- Use `DESIGN.md` surface cards, subtle borders, and technology badges with verified WCAG AA contrast.
- Maintain bilingual translation keys in `js/translations.js`.

**Never:**
- Do not list arbitrary percentage progress bars for skills (e.g. "Java 90%", "Kotlin 85%").
- Do not make unverified open-source claims without linking to verifiable GitHub targets.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Skills Section Render | User navigates to `#skills` | Displays 4 architectural cards with categorized badges and layer summaries | Clean responsive grid |
| Open Source Card Render | User views `#opensource` | Renders cards for MockK, dotme, n8n-docs, and microbot with PR/repo tags | Fallback link display |
| Click Open Source PR | User clicks MockK PR badge | Opens merged GitHub pull request in new tab with `target="_blank"` | Valid external link |
| Language Switch | User clicks language toggle | Layer titles, role context, and OSS contribution descriptions switch dynamically | No layout shifting |

</frozen-after-approval>

## Code Map

- `components/skills.html` -- Skills component template; implement the 4-layer architectural taxonomy cards with clear layer descriptions and badge groupings per `skills-matrix.md` and `DESIGN.md`.
- `components/opensource.html` (or dedicated section in `index.html` / `components/about.html`) -- Open-source showcase component; highlight MockK v1.14.0 merged PR, dotme, n8n-docs, and microbot with direct links to repositories and PR diffs per CAP-5.
- `js/translations.js` -- Bilingual dictionary; add layer titles, skill descriptions, and open-source contribution narratives in EN and PT.
- `js/script.js` -- Client script; ensure component loading and link accessibility hooks.

## Tasks & Acceptance

**Execution:**
- [ ] `components/skills.html` -- Implement 4 architectural layers (JVM Core, Distributed Systems, Cloud/DevOps, AI-Augmented SDLC) per CAP-6.
- [ ] `components/opensource.html` -- Build Open Source showcase highlighting MockK v1.14.0 PR, dotme CLI, n8n-docs, and microbot per CAP-5.
- [ ] `js/translations.js` -- Add localization keys for 4 skill layers and open-source contribution descriptions per CAP-9.

**Acceptance Criteria:**
- Given an evaluator views the skills section, when scrolling through `#skills`, then they see the 4 explicit architectural layers with categorized technology badges (zero arbitrary percentage bars).
- Given an engineering lead inspects open source contributions, when clicking the MockK card, then they are directed to the merged PR on GitHub for v1.14.0.
- Given a visitor toggles language, when switched, then layer descriptions and open-source summaries update cleanly between English and Portuguese.

## Verification

**Commands:**
- `grep -i "MockK" components/*.html js/translations.js` -- expected: MockK contribution highlighted and translated.
- `grep -E "JVM Core|Distributed Systems|Cloud, Data|AI-Augmented" components/skills.html js/translations.js` -- expected: 4 architectural layers defined.
