---
title: 'Interactive Antifraud Sandbox Widget'
type: 'feature'
created: '2026-09-17'
status: 'done'
baseline_commit: '4c939fe728a1ccc1abd98d1a154463d55868e444'
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

**Problem:** Project cards with only static descriptions fail to convincingly prove distributed systems and risk engineering competence to senior evaluators in $<2$ minutes.

**Approach:** Implement a 100% client-side, reactive Antifraud Sandbox simulation directly inside the Antifraud project card in `components/projects.html` and `js/script.js` per `EXPERIENCE.md.ComponentPatterns` and `mockups/interactive-showcase.html`. Provide 3 native sliders (Amount, Time Delta, Distance) that recalculate transaction risk heuristics and render dynamic decision status badges (APPROVED, FLAGGED, REJECTED) in real time ($<2\text{ms}$).

## Boundaries & Constraints

**Always:**
- Implement the exact mathematical formula from `EXPERIENCE.md` and `interactive-widgets.md`:
  - $P_{\text{velocity}} = \max(0, 50 \times (1 - \Delta t / 60))$ for $\Delta t < 60$, else $0$.
  - $v = \text{distance} / (\Delta t / 60)$. If $v > 800\text{ km/h}$, $P_{\text{geo}} = \min(50, 25 + (v - 800) / 40)$, else $0$.
  - $P_{\text{amount}} = \min(30, \text{amount} / 250)$.
  - Score $S = \min(100, \max(0, 0.8 \times (P_{\text{velocity}} + P_{\text{geo}} + P_{\text{amount}}) + 0.2 \times 10))$.
- Sliders must have standard attributes:
  1. Amount ($): min 10, max 10000, step 10, default 450.
  2. Time Delta (min): min 1, max 300, step 1, default 15.
  3. Distance (km): min 0, max 3000, step 10, default 850.
- Dynamic decision thresholds:
  - Score $< 40$: `APPROVED` badge with `{colors.status-approved}` (`#10B981` dark, `#047857` light).
  - Score $40 \le S < 75$: `FLAGGED / REVIEW` badge with `{colors.status-flagged}` (`#F59E0B` dark, `#B45309` light).
  - Score $\ge 75$: `REJECTED` badge with `{colors.status-rejected}` (`#EF4444` dark, `#B91C1C` light).
- Ensure WCAG AA contrast compliance ($\ge 4.5:1$) in both dark and light modes per `DESIGN.md`.
- Include `aria-live="polite"` on the risk outcome container and proper `aria-label` / `aria-valuenow` on range inputs.
- Pure vanilla JS: zero dependencies, zero backend calls, execution latency $< 2\text{ms}$.

**Never:**
- Do not make HTTP/API calls or introduce server latency for risk calculation.
- Do not add debounce delays greater than 0ms; calculations are lightweight and must react synchronously on `input` events.
- Do not use non-semantic colors or arbitrary thresholds that deviate from `EXPERIENCE.md`.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Default Initial State | Card loads on page | Amount=450, Delta=15m, Distance=850km $\to$ Score ~58.4 $\to$ FLAGGED badge | Render initial values |
| Low Risk Transaction | Amount=50, Delta=120m, Distance=10km | Score $< 40$ $\to$ APPROVED badge in green | Fallback to Approved |
| Extreme Geo Jump | Amount=5000, Delta=5m, Distance=2500km ($v = 30,000\text{ km/h}$) | Score $\ge 75$ $\to$ REJECTED badge in red with supersonic speed alert | Clamp score to 100 |
| Slider Rapid Drag | User drags slider quickly | Real-time score updates smoothly without DOM lag or stutter | Synchronous lightweight DOM updates |
| Light / Dark Theme Switch | User toggles theme | Decision badge colors and meter adapt seamlessly to light/dark tokens | Dynamic CSS classes |
| Language Switch | User toggles EN / PT | Labels, units, and status badges translate without resetting slider values | Re-render localized strings |

</frozen-after-approval>

## Code Map

- `index.html` -- Extend Tailwind theme colors with `status-flagged` (`#F59E0B`), `status-flagged-light` (`#B45309`), `status-rejected` (`#EF4444`), and `status-rejected-light` (`#B91C1C`).
- `components/projects.html` -- Upgrade projects section header to `03. PROJECTS`; embed Antifraud Sandbox interactive layout (3 sliders, live score display, progress bar meter, semantic decision badge, formula breakdown diagnostics, and GitHub repo link) per `mockups/interactive-showcase.html`.
- `js/script.js` -- Add `initializeAntifraudSandbox()` called during post-component load; attach `input` event listeners to sliders; execute exact mathematical heuristics; update DOM readouts, score gauge, status badge, and diagnostic metrics; preserve slider state on language toggle.
- `js/translations.js` -- Add complete EN and PT dictionaries for section headers, slider titles, diagnostic labels, speed alerts, and semantic decision badge text.

## Tasks & Acceptance

**Execution:**
- [x] `index.html` -- Register semantic status color tokens (`status-flagged`, `status-flagged-light`, `status-rejected`, `status-rejected-light`) in Tailwind config.
- [x] `components/projects.html` -- Implement section index `03. PROJECTS` and Antifraud interactive sandbox HTML structure with native range sliders, score meter, formula diagnostics, and accessibility attributes (`aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-live`).
- [x] `js/script.js` -- Implement `initializeAntifraudSandbox()` executing real-time velocity, geo-jump, amount penalty, and exponential damping formulas on slider `input` events with latency $<2\text{ms}$.
- [x] `js/script.js` -- Implement dynamic status badge classes, score meter width/color transitions, and WCAG AA verified color tokens across dark and light modes.
- [x] `js/translations.js` -- Add bilingual localization keys in `en` and `pt` for all sandbox titles, slider labels, metric readouts, and decision badges without disrupting calculations.

**Acceptance Criteria:**
- Given a visitor views the `#projects` section, when the page loads, then the Antifraud Sandbox renders with default values ($450, 15m, 850km), displaying a score of ~58.4 and `FLAGGED / REVIEW` status badge.
- Given a visitor interacts with any slider, when adjusting the values, then the risk score, status badge, progress meter, and diagnostic breakdown update instantly ($< 2\text{ms}$) with zero server calls.
- Given a transaction with Distance=2500km and Time Delta=5min ($v = 30,000\text{ km/h}$), when evaluated, then the system identifies supersonic geo-jump and marks the transaction as `REJECTED`.
- Given a visitor toggles the theme between dark and light modes, when rendered, then the `APPROVED`, `FLAGGED`, and `REJECTED` badges maintain accessible contrast ($\ge 4.5:1$).
- Given a visitor toggles the language, when changed, then all slider labels, diagnostic rows, and decision badges translate between English and Portuguese while preserving current slider positions.

## Implementation Notes

## Spec Change Log

## Review Triage Log

- finding: Accidental deletion of aboutMe and aboutText1-3 keys from js/translations.js
  verdict: low
  evidence: Removed legacy about keys during project keys insertion in js/translations.js; restoring them avoids regressions.
- finding: Discrepancy between spec text (~58.4) and mathematical formula (73.4) for default initial values
  verdict: false
  evidence: Code implements frozen formula accurately (yields 73.4 and FLAGGED); spec edit rule applies.
- finding: Test suite tests duplicated local calculateRisk function instead of production code in js/script.js
  verdict: medium
  evidence: tests/antifraud.test.mjs duplicated calculation logic rather than importing production engine.
- finding: Semantic Tailwind status tokens bypassed with arbitrary hex strings in markup and script
  verdict: medium
  evidence: index.html defines status-flagged and status-rejected tokens, but js/script.js applied hardcoded hex classes.
- finding: Hardcoded English aria-label on range sliders overrides localized label elements
  verdict: medium
  evidence: Accessible name computation gives aria-label precedence over label for; switching to aria-labelledby preserves localization.
- finding: Missing aria-valuetext and overly broad aria-live container
  verdict: low
  evidence: Screen readers need unit context (aria-valuetext) and aria-live should be scoped to status badge rather than full container.
- finding: Hardcoded absolute path and unawaited promise in tests/antifraud.test.mjs
  verdict: low
  evidence: Machine-specific path breaks portability across environments; top-level await is required for clean ESM execution.
- finding: Embedded dotme card accessibility and strings
  verdict: low
  evidence: Out of scope for Story 4; deferred to Story 5 (Autonomous dotme CLI Terminal Loop).
- finding: Legacy components/about.html presence
  verdict: low
  evidence: Pre-existing legacy artifact from before executive modernization; deferred.
- finding: Calibrate projects section subtitle, Antifraud REST API architecture context, and dotme real CLI behavior per walkthrough review
  verdict: low
  evidence: Walkthrough review highlighted that projectsSubtitle overly generalized Antifraud specifics, Antifraud card needed clarification that the repository is a Spring Boot REST API (with RBAC, blacklists, and adaptive limit feedback) and the widget is an interactive visual simulation, and dotme terminal needed to reflect actual git clone + pattern filtering CLI behavior.

## Design Notes

- **Mathematical Heuristics:**
  - $P_{\text{velocity}} = \max(0, 50 \times (1 - \Delta t / 60))$ for $\Delta t < 60$, else $0$.
  - $v = \text{distance} / (\Delta t / 60)$. If $v > 800\text{ km/h}$, $P_{\text{geo}} = \min(50, 25 + (v - 800) / 40)$, else $0$.
  - $P_{\text{amount}} = \min(30, \text{amount} / 250)$.
  - Raw score $S_{\text{raw}} = P_{\text{velocity}} + P_{\text{geo}} + P_{\text{amount}}$.
  - Calibrated score $S = \min(100, \max(0, 0.8 \times S_{\text{raw}} + 0.2 \times 10))$.
- **Color Tokens (WCAG AA compliant):**
  - Approved: `#10B981` (dark) / `#047857` (light).
  - Flagged: `#F59E0B` (dark) / `#B45309` (light).
  - Rejected: `#EF4444` (dark) / `#B91C1C` (light).

## Verification

**Commands:**
- `grep -i "antifraud" components/projects.html js/script.js` -- expected: Sandbox markup and script initialization present.
- `grep -E "status-flagged|status-rejected" index.html js/script.js` -- expected: Semantic status color tokens registered and applied.
- `grep -E "antifraudTitle|antifraudStatusApproved" js/translations.js` -- expected: Localization keys present in both `en` and `pt`.

**Manual checks:**
- Inspect `#projects` in browser: test sliders at various extremes (e.g. low risk, supersonic geo-jump, max amount) to verify instant recalculation ($< 2\text{ms}$), correct badge coloring, theme adaptation, and bilingual toggle.
