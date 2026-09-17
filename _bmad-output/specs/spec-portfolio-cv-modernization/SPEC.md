---
id: SPEC-portfolio-cv-modernization
companions:
  - architecture-diagrams.md
  - interactive-widgets.md
  - skills-matrix.md
  - component-mapping.md
  - ../../planning-artifacts/ux-designs/ux-portfolio-2026-09-16/DESIGN.md
  - ../../planning-artifacts/ux-designs/ux-portfolio-2026-09-16/EXPERIENCE.md
sources:
  - ../../brainstorming/brainstorm-portfolio-cv-modernization-2026-09-16/brainstorm-intent.md
---

> **Canonical contract.** This SPEC and the files in `companions:` are the complete, preservation-validated contract for what to build, test, and validate. Source documents listed in frontmatter are for traceability — consult them only if you need narrative rationale or prose color this contract intentionally omits.

# Portfolio & Executive CV Modernization

## Why

Reposition the digital portfolio and executive CV of Vinicius R. Silva from a traditional descriptive resume into a high-signal senior engineering showcase targeted at technical leaders, hiring managers, and Staff/Principal engineers at global scale-ups and fintechs. The project establishes immediate technical credibility by combining verified enterprise scale (+500M req/month, +$100B processed volume), live interactive browser demonstrations of engineering concepts, verified open-source impact, and concluded advanced academic credentials.

## Capabilities

- **CAP-1**
  - **intent:** Technical leaders can evaluate the engineer's core value proposition, scale metrics, current availability, and download an ATS-compliant resume immediately.
  - **success:** The hero section renders the verified headline, metrics (+500M req/mo, +$100B global volume), an active availability indicator, and working CTAs for CV download and direct channels.

- **CAP-2**
  - **intent:** Hiring managers can review the engineer's career evolution showing high-criticality B2B financial systems alongside massive B2C request throughput.
  - **success:** The experience section presents Trustly (B2B billing, batch processing, file streaming, +500 TPS) as the primary current role and Alelo as a consolidated 4+ year trajectory (+500M req/mo, 10M+ users).

- **CAP-3**
  - **intent:** Visitors can simulate fraud scoring on financial transactions to evaluate the engineer's understanding of risk algorithms and distributed security heuristics.
  - **success:** The Antifraud project card contains an interactive sandbox widget where adjusting transaction parameters recalculates risk score and updates the decision status (APPROVED, FLAGGED, REJECTED) in real time entirely in the browser.

- **CAP-4**
  - **intent:** Visitors can observe how the engineer's declarative CLI tooling handles configuration synchronization and atomic symlink validation without requiring visitor input.
  - **success:** The dotme project card runs an autonomous typewriter terminal loop demonstrating syntax verification, symlink reconciliation, and conflict reporting with smooth resets.

- **CAP-5**
  - **intent:** Technical evaluators can inspect verified contributions to global open-source projects and developer productivity tools.
  - **success:** A dedicated showcase displays MockK, dotme CLI, and n8n-docs with links to external proof repositories.

- **CAP-6**
  - **intent:** Engineering recruiters and managers can assess technical competencies structured by architectural concern and modern AI-augmented workflows.
  - **success:** The skills section groups proficiencies into four explicit layers: JVM Ecosystem, Distributed Systems & Scale, Cloud/DevOps/Security, and AI-Augmented Engineering.

- **CAP-7**
  - **intent:** Evaluators can verify academic credentials and formal engineering education.
  - **success:** The education section displays the Software Engineering MBA from USP/Esalq as concluded and the Computer Science degree from UNESP.

- **CAP-8**
  - **intent:** Prospective employers can initiate contact or review hiring availability with minimal friction.
  - **success:** The contact section provides a pre-formatted email link with structured subject and body templates, direct social profile links, and an ATS-friendly resume download.

- **CAP-9**
  - **intent:** International and domestic evaluators can read all portfolio sections in their preferred language.
  - **success:** Toggling the language selector translates all section copy, metric labels, and project descriptions seamlessly between English and Portuguese.

## Constraints

- Visual aesthetic must adhere to an ultra-sober minimalist slate/zinc color palette with first-class dark mode support, Inter body typography, and JetBrains Mono code typography.
- All interactive widgets (Antifraud sandbox, dotme terminal loop) must execute entirely in client-side vanilla JavaScript without backend server or third-party service dependencies.
- The dotme terminal simulation must operate in an autonomous loop and not depend on visitor keyboard input.
- Contact must rely on direct mailto links and static asset downloads rather than server-side or third-party form processors.
- Academic status for the USP/Esalq MBA must strictly be presented as concluded.

## Non-goals

- Interactive Git PR diff viewer inside the portfolio for the MockK contribution.
- Interactive manual-entry shell or command input for the dotme CLI terminal.
- Backend server API or database for storing fraud simulations or contact submissions.
- Unsubstantiated marketing slogans, subjective buzzwords, or unverified claims.

## Success signal

- An engineering manager can review the candidate's core technical profile, interact with the risk simulation, watch the CLI terminal demo, and download the resume in under two minutes without client-side errors.

## Assumptions

- Existing modular HTML architecture (`index.html` dynamically including `components/*.html`) and client scripts (`js/script.js`, `js/translations.js`) will be updated in place.
- Updated ATS-friendly CV PDF file will be hosted locally in `assets/`.
