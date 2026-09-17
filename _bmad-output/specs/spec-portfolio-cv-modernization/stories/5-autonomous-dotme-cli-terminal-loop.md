---
title: 'Autonomous dotme CLI Terminal Loop'
type: 'feature'
created: '2026-09-16'
status: 'draft'
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

**Approach:** Implement a macOS-style dark terminal demo widget inside the dotme project card in `components/projects.html` and `js/script.js` per `EXPERIENCE.md.ComponentPatterns` and `mockups/interactive-showcase.html`. The terminal runs an autonomous typewriter loop typing `dotme --include=".git*,.zsh*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles`, outputs repository cloning, pattern-based filtering, dotfile distribution, and summary metrics, holds for 5 seconds, and cleanly resets without requiring visitor typing.

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

**Never:**
- Do not create an interactive input shell expecting user commands.
- Do not let the loop leak memory or duplicate intervals across component reloads.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Card in Viewport | IntersectionObserver enters view | Starts typewriter typing `dotme sync --verbose` | Graceful fallback |
| Output Streaming | Command finishes typing | Lines stream sequentially with colored badges ([INFO], [WARN], [SUCCESS]) | Clean line append |
| Loop Reset | 5-second hold completes | Terminal clears smoothly and restarts cycle | Reset timeout safety |
| Scroll Out of View | Terminal scrolls out of viewport | Timer pauses; resumes when scrolled back into view | Observer disconnect/reconnect |
| Reduced Motion | OS `prefers-reduced-motion` enabled | Skips typewriter typing and renders completed terminal state statically | Instant render |

</frozen-after-approval>

## Code Map

- `components/projects.html` -- Projects template; render macOS terminal frame (header dots, title bar "dotme — zsh", code body container) per `mockups/interactive-showcase.html`.
- `js/script.js` -- Client logic; typewriter timing engine, line streaming scheduler, viewport visibility observer, and loop reset logic.
- `js/translations.js` -- Bilingual dictionary; synchronize card descriptions, tags, and terminal summary notes.

## Tasks & Acceptance

**Execution:**
- [ ] `components/projects.html` -- Implement macOS terminal window container with traffic light dots and monospace font per `DESIGN.md`.
- [ ] `js/script.js` -- Implement typewriter loop engine for `dotme sync --verbose` with staggered line rendering per CAP-4.
- [ ] `js/script.js` -- Implement 5-second completion pause, smooth reset, and IntersectionObserver pause/resume hooks.
- [ ] `js/translations.js` -- Ensure dotme metadata, feature tags, and external repository links translate cleanly per CAP-9.

**Acceptance Criteria:**
- Given a visitor scrolls to the dotme card, when the card enters viewport, then the terminal autonomously types `dotme sync --verbose` and streams symlink reconciliation logs.
- Given the terminal run completes, when the final `[SUCCESS]` line appears, then the output holds statically for 5 seconds before clearing and restarting.
- Given the user scrolls away, when the terminal leaves viewport, then the timer loop pauses to preserve device resources.

## Verification

**Commands:**
- `grep -i "dotme" components/projects.html js/script.js` -- expected: Terminal DOM container and typewriter script present.
- `grep -E "mac-dot|surface-terminal" components/projects.html css/style.css` -- expected: Terminal styling classes present.
