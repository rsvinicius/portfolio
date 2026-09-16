# Spine Pair Review — portfolio

## Overall verdict
The spine pair establishes a coherent, high-fidelity contract for the portfolio modernization, with clean token hierarchy, disciplined layout constraints, and realistic evaluator journeys. However, it falls short of being immediately consumable downstream due to a critical break in requirement traceability (`CAP-1`–`CAP-9` IDs omitted), incomplete behavioral specs for 6 declared components, and unaddressed light-mode status contrast and no-JS resilience. Addressing these targeted gaps will elevate the contract to a fully locked specification ready for architecture and story implementation.

## 1. Flow coverage — adequate
Evaluated Key Flows in `EXPERIENCE.md` against the 9 capabilities defined in `SPEC.md` (`CAP-1` to `CAP-9`) and target evaluator personas in `.memlog.md`. Evaluated protagonist naming, step progression, climax beats, and failure handling.
### Findings
- **[medium]** Failure paths missing across all key flows (`EXPERIENCE.md` §8 Key Flows). Neither Flow 1 (Alex), Flow 2 (Samantha), nor Flow 3 (Marcus) specifies system or user failure handling (e.g. CV PDF download timeout/network failure, unregistered `mailto:` OS protocol handler, or script execution error). *Fix:* Add explicit `Failure:` outcomes to each flow (e.g. PDF network failure falls back to print/HTML view; unhandled `mailto:` copies email address to clipboard with confirmation toast).
- **[medium]** Implicit capability coverage without explicit requirement IDs (`EXPERIENCE.md` §8 Key Flows, §2 IA). While the narrative steps functionally address all 9 capabilities, downstream consumers (architecture, story-dev, QA test generators) cannot automatically trace which flow step validates which source capability. *Fix:* Annotate each flow step and IA table row with corresponding source capability tags (`[CAP-1]` through `[CAP-9]`).

## 2. Token completeness — adequate
Extracted all tokens in `DESIGN.md` frontmatter (`colors`, `typography`, `rounded`, `spacing`, `components`) and verified all `{path.to.token}` expressions across both `DESIGN.md` and `EXPERIENCE.md`. Verified dark/light mode pairs and WCAG AA contrast compliance.
### Findings
- **[high]** Missing light-mode semantic status tokens violates WCAG AA contrast (`DESIGN.md` frontmatter lines 43–52, §2 Colors). `status-approved` (`#10B981`) and `status-flagged` (`#F59E0B`) are defined without light-mode variants. In light mode, `#10B981` text on `#FFFFFF` or `rgba(16, 185, 129, 0.15)` produces a contrast ratio of ~2.5:1, failing WCAG AA (minimum 4.5:1 for body/badge text). *Fix:* Define dedicated light-mode status text tokens (e.g., `status-approved-light: '#047857'`, `status-flagged-light: '#B45309'`, `status-rejected-light: '#B91C1C'`).
- **[low]** Orphaned token `accent-cyan` in frontmatter (`DESIGN.md` line 40). `accent-cyan: '#06B6D4'` is declared in frontmatter but never referenced in `DESIGN.md` prose, component tokens, or `EXPERIENCE.md`. *Fix:* Remove `accent-cyan` or define its specific role (e.g. secondary terminal accent or syntax token).

## 3. Component coverage — thin
Cross-referenced component definitions in `DESIGN.md` frontmatter `components:` and §7 against `EXPERIENCE.md` §4 (`Component Patterns`) and §2 (Information Architecture).
### Findings
- **[high]** Asymmetric component coverage between spines (`DESIGN.md` frontmatter, `EXPERIENCE.md` §4). Six components declared in `DESIGN.md` frontmatter (`experience-card`, `opensource-card`, `education-card`, `cta-button-primary`, `cta-button-secondary`, `badge-status`) have NO behavioral rules defined in `EXPERIENCE.md.Component Patterns`. Downstream developers receive no behavioral guidance on card hover transitions, external link routing, or button interaction states. Furthermore, `DESIGN.md` §7 omits these components from its descriptive prose. *Fix:* Add dedicated behavioral pattern entries for these six components in `EXPERIENCE.md` §4 and provide corresponding anatomy descriptions in `DESIGN.md` §7.
- **[medium]** Missing component tokens for `#contact` and mobile navigation drawer (`DESIGN.md` frontmatter, `EXPERIENCE.md` §2, §4). The `#contact` IA section (delivering `CAP-8`) and the mobile drawer (`aria-expanded`, slide-in behavior) are behaviorally specified in `EXPERIENCE.md`, but neither `contact-section`/`contact-card` nor `mobile-menu-drawer` exists in `DESIGN.md.components`. *Fix:* Add `contact-section` and `mobile-menu-drawer` to `DESIGN.md.components` tokens and cross-reference them in both spines.

## 4. State coverage — adequate
Walked all IA surfaces (`#header`, `#hero`, `#experience`, `#projects`, `#opensource`, `#skills`, `#education`, `#contact`) and evaluated coverage of cold load, interaction, degraded, offline, and error states.
### Findings
- **[high]** Missing degraded / no-JavaScript fallback state for interactive widgets (`EXPERIENCE.md` §5 State Patterns, `SPEC.md` CAP-3, CAP-4). Both primary showcase widgets (`antifraud-sandbox` and `dotme-terminal`) depend entirely on client-side JavaScript. If JavaScript is disabled or fails to execute, no resting/fallback state is specified for evaluators. *Fix:* Add a `No-JS / Degraded Script` state row in §5 defining static fallback cards (pre-calculated heuristic risk card and static terminal code snapshot).
- **[medium]** Missing error and recovery states for external contact and file download (`EXPERIENCE.md` §5 State Patterns). ATS CV download and `mailto:` links are single points of failure with no error states defined if network requests fail or protocol handlers are absent. *Fix:* Add state specifications for download retry and clipboard email copy fallback.
- **[low]** Card hover and focus-visible states omitted from State Patterns table (`EXPERIENCE.md` §5 State Patterns). While 150ms border transitions are described in `DESIGN.md` §5 and focus rings in `EXPERIENCE.md` §7, these interactive states are omitted from the consolidated §5 State Patterns table. *Fix:* Add an `Interactive Card (Hover / Focus-Visible)` row to §5.

## 5. Visual reference coverage — strong
Checked all visual artifacts in `mockups/` (`hero-and-experience.html`, `interactive-showcase.html`), `wireframes/`, and `imports/`. Verified inline linking, descriptive captions, and authority clauses.
### Findings
- **[low]** Unmocked IA surfaces not explicitly designated as spine-only (`DESIGN.md` §7, `EXPERIENCE.md` §2). While `hero-and-experience.html` and `interactive-showcase.html` are cleanly linked and established as subordinate to the spines, the remaining surfaces (`#opensource`, `#skills`, `#education`, `#contact`) are not explicitly classified as "spine-only implementations." *Fix:* Add a note in `EXPERIENCE.md` §2 clarifying that unmocked surfaces are spine-only contracts built directly from tables and tokens.

## 6. Bloat & overspecification — strong
Evaluated token discipline, prose efficiency, absence of redundant source copy-pasting, and separation between editorial voice (`DESIGN.md`) and behavioral neutrality (`EXPERIENCE.md`).
### Findings
- **[low]** Minor token redundancy in component prose (`DESIGN.md` §6 Shapes, §7 Components). Hardcoded pixel values (`12px`, `64px`) appear in prose descriptions where tokens (`{spacing.3}`, `{components.navigation-bar.height}`) are already formally declared. *Fix:* Replace literal pixel values in prose with `{path.to.token}` syntax.

## 7. Inheritance discipline — adequate
Verified source path resolution, requirement name alignment, glossary consistency, and token cross-referencing between files.
### Findings
- **[critical]** Complete absence of source requirement IDs (`CAP-1` to `CAP-9`) in `EXPERIENCE.md` (`EXPERIENCE.md` §2, §4, §8). `SPEC.md` establishes 9 numbered capabilities (`CAP-1` through `CAP-9`). `EXPERIENCE.md` implements these features substantively but never mentions the `CAP-` identifiers in its Information Architecture, Component Patterns, or Key Flows. This breaks automated requirement tracing and downstream epic/story generation. *Fix:* Directly cross-reference `[CAP-1]` through `[CAP-9]` in the IA table, Component Patterns, and Key Flow headers.
- **[medium]** Component glossary divergence between spines (`DESIGN.md` §7, `EXPERIENCE.md` §4). Primary and secondary buttons are tokenized as `cta-button-primary` and `cta-button-secondary` in `DESIGN.md`, but referenced in `EXPERIENCE.md` as "Primary Action" or "CTA button" without referencing the exact tokenized component names. *Fix:* Use the canonical token names (`cta-button-primary`, `cta-button-secondary`, `badge-status`) consistently across both spines.

## 8. Shape fit — adequate
Verified structural compliance against the BMad UX specification. Checked section order in `DESIGN.md` and required default / triggered sections in `EXPERIENCE.md`.
### Findings
- **[medium]** Triggered section `Inspiration & Anti-patterns` omitted from `EXPERIENCE.md` (`EXPERIENCE.md`). `DESIGN.md` §1 and `.memlog.md` explicitly reference Linear, Stripe, and Vercel as architectural reference products, while `SPEC.md` enumerates explicit non-goals (anti-patterns). Per the BMad UX specification, when reference products and anti-patterns exist, `Inspiration & Anti-patterns` is a required section in `EXPERIENCE.md`. *Fix:* Add Section 10 `Inspiration & Anti-patterns` to `EXPERIENCE.md` capturing architectural borrowings (monospace density, instant keyboard response) and explicit rejects (no gamification, no manual terminal prompt, no client-side route hydration).

## Mechanical notes
- **Source Paths:** Both files correctly declare `sources:` pointing to `../../../specs/spec-portfolio-cv-modernization/SPEC.md`, which resolves cleanly to the canonical spec file.
- **Mockup Links:** Both `mockups/hero-and-experience.html` and `mockups/interactive-showcase.html` exist, are referenced with relative markdown links, and carry the required "spines win on conflict" clause.
- **Frontmatter Validity:** YAML frontmatter parses cleanly in both files. `DESIGN.md` includes all required token groups (`colors`, `typography`, `rounded`, `spacing`, `components`). Both files are currently marked `status: draft`.
- **Token Resolution:** Every `{path.to.token}` reference in `DESIGN.md` and `EXPERIENCE.md` resolves to a declared token.
- **Mermaid Syntax:** No Mermaid diagrams are present in either spine; information architecture, states, and responsive breakpoints are cleanly documented in Markdown tables.
