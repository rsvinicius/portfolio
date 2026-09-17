---
title: 'Autonomous dotme CLI Terminal Loop'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: 'b25aef054e2dd18b88bbb9d43c42f10550022a6a'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/specs/spec-portfolio-cv-modernization/SPEC.md'
  - '_bmad-output/specs/spec-portfolio-cv-modernization/interactive-widgets.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/EXPERIENCE.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/interactive-showcase.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Describing a declarative CLI tool and developer environment manager through bulleted text alone fails to convey craft, execution velocity, and reliability to systems engineering leaders.

**Approach:** Implement a macOS-style dark terminal demo widget inside the dotme project card in `components/projects.html` and `js/script.js` per `EXPERIENCE.md.ComponentPatterns` and `mockups/interactive-showcase.html`. The terminal runs an autonomous typewriter loop typing `dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles`, outputs repository cloning, pattern-based filtering, dotfile distribution, and summary metrics, holds for 5 seconds, and cleanly resets without requiring visitor typing.

## Boundaries & Constraints

**Always:**
- Use the terminal styling from `DESIGN.md`: surface `{colors.surface-terminal}` (`#0D1117`), header `{colors.surface-terminal-header}` (`#161B22`), and JetBrains Mono monospace font.
- Include macOS window controls (traffic light dots: `#FF5F56`, `#FFBD2E`, `#27C93F`).
- Autonomous execution cycle:
  1. Prompt: `[vinicius@CachyOS ~]$ `
  2. Typewriter typing `dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles` at ~35ms/character.
  3. Output lines streamed with realistic terminal delay (~120ms/line):
     - `🔄 Cloning repository: https://github.com/rsvinicius/dotfiles`
     - `✅ Repository cloned, using branch: main`
     - `📋 Scanning for dotfiles...`
     - `📦 Summary:`
     - `✅ Copied 1 item:`
     - `   - .config`
     - `❌ Ignored 7 items:`
     - `   - disable_mouse_acceleration.sh, firewall.sh, fonts, install.sh (+3 scripts)`
     - `🔍 Active filters:`
     - `   Include patterns: [.config*]`
     - `   Exclude patterns: [.DS_Store]`
     - `🎉 Done! Your dotfiles have been applied successfully.`
  4. Hold terminal display for 5000ms.
  5. Clear and smoothly repeat loop.
- Use `IntersectionObserver` to pause typewriter loop when terminal is outside the viewport to prevent background battery/CPU drain.
- Fully autonomous: does not block or require visitor typing.
- Terminal typewriter canvas carries `aria-hidden="true"`, accompanied by a semantic `.sr-only` paragraph describing dotme's Git-based dotfile management capabilities to screen readers without audio loop chatter.
- Provide `overflow-x-auto` on terminal code container to prevent horizontal blowout on mobile viewports (<768px).

**Never:**
- Do not create an interactive input shell expecting user commands.
- Do not let the loop leak memory, orphan timeouts, or duplicate intervals across tab/component reloads.
- Do not use external libraries or heavyweight dependencies for terminal emulation.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Card in Viewport | IntersectionObserver enters view | Starts typewriter typing `dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles` | Graceful fallback |
| Output Streaming | Command finishes typing | Lines stream sequentially with colored badges and realistic line stagger (~120ms/line) | Clean line append |
| Loop Reset | 5-second hold completes | Terminal clears smoothly and restarts cycle | Reset timeout safety |
| Hover During Hold | Mouse cursor enters terminal container | Pause 5s hold timer; resume hold countdown on mouseleave | Hover event listeners |
| Scroll Out of View | Terminal scrolls out of viewport | Timer pauses; resumes when scrolled back into view | Observer disconnect/reconnect |
| Reduced Motion | OS `prefers-reduced-motion` enabled | Skips typewriter typing and renders completed terminal state statically | Instant render |
| Screen Reader Access | Assistive tech encounters terminal | Reads `.sr-only` description; ignores typewriter animation loop via `aria-hidden="true"` | Semantic accessibility |

</frozen-after-approval>

## Code Map

- `components/projects.html` -- Dotme project card markup: terminal frame with macOS control dots, title `dotme — bash/zsh — 80x24`, dynamic command/output container with fallback static markup, `overflow-x-auto`, `aria-hidden="true"` on terminal display, and `.sr-only` accessible summary.
- `js/script.js` -- Client logic: `initializeDotmeTerminal(translations)` function handling typewriter text appending, cursor pulse element, line streaming scheduler, 5s hold timer with mouseenter/mouseleave hover freeze, `IntersectionObserver` pause/resume, and `prefers-reduced-motion` check.
- `js/translations.js` -- Localization dictionary: verify dotme copy (`dotmeTitle`, `dotmeSubtitle`, `dotmeRole`, `dotmeDesc`, `dotmeLinkText`, plus screen-reader summary key `dotmeSrSummary`) across `en` and `pt`.
- `tests/dotme.test.mjs` -- Unit test suite: verify command string, output lines sequence, HTML markup accessibility (`aria-hidden="true"`, `.sr-only`), and translation keys parity.

## Tasks & Acceptance

**Execution:**
- [x] `components/projects.html` -- Ensure terminal container has `overflow-x-auto`, `aria-hidden="true"`, dynamic command/output target containers, and accessible screen-reader summary per `EXPERIENCE.md`.
- [x] `js/script.js` -- Implement `initializeDotmeTerminal()` engine with typewriter character loop, streaming line generator, 5000ms hold with hover freeze, IntersectionObserver viewport handling, and prefers-reduced-motion fallback.
- [x] `js/translations.js` -- Ensure all dotme card and terminal accessibility strings maintain full bilingual parity in EN and PT per CAP-9.
- [x] `tests/dotme.test.mjs` -- Implement automated unit and DOM assertion tests for dotme terminal data sequences, accessibility attributes, and bilingual translation completeness.

**Acceptance Criteria:**
- Given a visitor scrolls to the dotme card, when the card enters viewport, then the terminal autonomously types `dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles` with a blinking cursor and streams clone, filtering, and summary outputs.
- Given the terminal output sequence completes, when the final success line appears, then the output holds for 5 seconds before smoothly clearing and restarting; hovering over the terminal freezes the hold timer.
- Given a visitor leaves the viewport, when the dotme terminal exits view, then the loop pauses to conserve CPU and battery resources, resuming upon re-entry.
- Given a screen reader or user with `prefers-reduced-motion`, when accessing the page, then the terminal provides an accessible `.sr-only` summary and skips typewriter typing to render the complete terminal output immediately.

## Implementation Notes

- Implemented `initializeDotmeTerminal(translations, dotmeDataModule)` in `js/script.js` with complete autonomous execution lifecycle:
  - Typewriter typing at 35ms/char.
  - Sequential log streaming at 120ms/line.
  - 5000ms hold pause with mouseenter/mouseleave hover freeze and countdown restoration.
  - IntersectionObserver viewport observer that pauses timeouts when scrolled out of view and resumes on re-entry.
  - `prefers-reduced-motion` detection rendering full static state immediately without animation.
  - Cleanup handler `_dotmeTerminalCleanup` preventing duplicate timers or memory leaks across reloads.
- Extracted constants and sequence data to `js/dotme-data.js` for clean modular sharing between runtime and test suites.
- Updated `components/projects.html` with macOS terminal chrome, `overflow-x-auto`, `aria-hidden="true"` on terminal display, `#dotme-cmd`, `#dotme-cursor`, `#dotme-output`, and accessible `.sr-only` description paragraph.
- Added `dotmeSrSummary` translation key to both `en` and `pt` dictionaries in `js/translations.js`.
- Created automated test suite `tests/dotme.test.mjs` with Node.js built-in test runner verifying data sequence, HTML markup accessibility attributes, client script logic, and bilingual translation parity. All 4 tests pass.

## Spec Change Log

## Review Triage Log

- finding: Source-text assertion in dotme.test.mjs does not execute initializeDotmeTerminal lifecycle logic
  verdict: medium
  evidence: tests/dotme.test.mjs test 3 loaded js/script.js as text with fs.readFileSync and checked substring tokens rather than executing initializeDotmeTerminal in a mock DOM environment to verify mutations and lifecycle states.
- finding: Missing DOM elements on reinitialization causes early return before invoking existing cleanup handler
  verdict: low
  evidence: js/script.js checked element presence before window._dotmeTerminalCleanup(), risking leaked timers if elements were removed during partial re-render.
- finding: Absence of smooth clearing transition and horizontal auto-scroll on reset
  verdict: low
  evidence: Loop reset instantly wiped content without opacity fade, and scrollLeft was not restored to 0 on startCycle.
- finding: HTML whitespace collapsing on indented list lines in terminal output
  verdict: low
  evidence: Streamed log items with leading spaces collapsed in DOM without whitespace-pre-wrap styling.
- finding: Unconditional cursor animation and missing motion-reduce class
  verdict: low
  evidence: components/projects.html included animate-pulse on #dotme-cursor without motion-reduce:animate-none fallback.
- finding: Duplicate inline fallback arrays and unused translations parameter in initializeDotmeTerminal
  verdict: low
  evidence: js/script.js maintained duplicate hardcoded arrays of command and output lines alongside dotme-data.js.
- finding: Keyboard operability of overflow container
  verdict: low
  evidence: components/projects.html terminal body has overflow-x-auto but lacked tabindex="0" for keyboard scrolling.
- finding: Touch and pointer event support for hold pause on touchscreens
  verdict: false
  evidence: EXPERIENCE.md and spec explicitly specify hover-based pause for terminal inspection, which is standard for autonomous background animation widgets.
- finding: Visual flash of prerendered static content on first intersection
  verdict: false
  evidence: Prerendered markup in projects.html is intentional progressive enhancement fallback for no-JS environments; resetting to prompt upon entering viewport matches the autonomous execution specification.
- finding: Unused DOTME_PROMPT export
  verdict: low
  evidence: Prompt is rendered directly in components/projects.html; dotme-data.js export can be utilized in DOM rendering or test assertions.
- finding: Empty Review and Spec Change Log sections
  verdict: false
  evidence: Template specification explicitly mandates these sections remain empty until review pass and bad_spec loopbacks occur.

## Design Notes

- **Terminal Color Tokens:**
  - Background: `#0D1117` (`surface-terminal`)
  - Header: `#161B22` (`surface-terminal-header`)
  - Window dots: Close `#FF5F56`, Minimize `#FFBD2E`, Maximize `#27C93F`
  - Prompt: `#58A6FF` (blue)
  - Success text & checkmarks: `#3FB950` (green)
  - Warning/Ignore text: `#F85149` (red/coral)
  - Muted text: `#8B949E` (gray)
  - Primary output text: `#F9FAFB` / `#C9D1D9`
- **Timing Parameters:**
  - Typewriter cadence: ~35ms per character.
  - Streaming line cadence: ~120ms between lines.
  - Hold duration: 5000ms static hold before clean restart.

## Verification

**Commands:**
- `grep -i "dotme" components/projects.html js/script.js` -- expected: Terminal DOM container and typewriter script initialization present.
- `grep -E "aria-hidden=\"true\"" components/projects.html` -- expected: Terminal animation container marked aria-hidden.
- `grep -E "dotmeTitle|dotmeSrSummary" js/translations.js` -- expected: Localization keys present in both `en` and `pt`.
- `node --test tests/dotme.test.mjs` -- expected: All automated terminal assertions pass.

**Manual checks:**
- Inspect `#projects` in browser: observe autonomous typing of `dotme` command, staggered log streaming, 5-second completion hold, hover freeze, viewport scroll pause, and instant render with `prefers-reduced-motion`.
