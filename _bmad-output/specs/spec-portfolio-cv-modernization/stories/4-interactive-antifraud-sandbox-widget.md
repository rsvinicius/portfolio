---
title: 'Interactive Antifraud Sandbox Widget'
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

**Problem:** Project cards with only static descriptions fail to convincingly prove distributed systems and risk engineering competence to senior evaluators in $<2$ minutes.

**Approach:** Implement a 100% client-side, reactive Antifraud Sandbox simulation directly inside the Antifraud project card in `components/projects.html` and `js/script.js` per `EXPERIENCE.md.ComponentPatterns` and `mockups/interactive-showcase.html`. Provide 3 native sliders (Amount, Time Delta, Distance) that recalculate transaction risk heuristics and render dynamic decision status badges (APPROVED, FLAGGED, REJECTED) in real time ($<2\text{ms}$).

## Boundaries & Constraints

**Always:**
- Implement the exact mathematical formula from `EXPERIENCE.md`:
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
  - Score $40 \le S < 75$: `FLAGGED` badge with `{colors.status-flagged}` (`#F59E0B` dark, `#B45309` light).
  - Score $\ge 75$: `REJECTED` badge with `{colors.status-rejected}` (`#EF4444` dark, `#B91C1C` light).
- Ensure WCAG AA contrast compliance ($\ge 4.5:1$) in both dark and light modes per `DESIGN.md`.
- Pure vanilla JS: zero dependencies, zero backend calls, execution latency $< 2\text{ms}$.

**Never:**
- Do not make HTTP/API calls for risk calculation.
- Do not add debounce delays greater than 0ms; calculations are lightweight and must react instantly on `input` events.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Default Initial State | Card loads on page | Amount=450, Delta=15m, Distance=850km $\to$ Score ~66 $\to$ FLAGGED badge | Render initial values |
| Low Risk Transaction | Amount=50, Delta=120m, Distance=10km | Score $< 40$ $\to$ APPROVED badge in green | Fallback to Approved |
| Extreme Geo Jump | Amount=5000, Delta=5m, Distance=2500km ($v = 30,000$ km/h) | Score $\ge 75$ $\to$ REJECTED badge in red with speed alert | Clamp score to 100 |
| Slider Rapid Drag | User drags slider quickly | Real-time score updates smoothly without DOM lag or stutter | RequestAnimationFrame optimization if needed |
| Light / Dark Theme Switch | User toggles theme | Decision badge colors adapt seamlessly to light/dark tokens | Dynamic CSS classes |

</frozen-after-approval>

## Code Map

- `components/projects.html` -- Projects template; embed the Antifraud Sandbox markup (3 sliders, live score gauge bar, status badge, and inspection metrics breakdown) per `mockups/interactive-showcase.html`.
- `js/script.js` -- Client logic; attach `input` event listeners to sliders, compute heuristic formulas, update DOM elements (score value, gauge width, status badge class/text, inspection indicators).
- `js/translations.js` -- Bilingual dictionary; add translations for slider labels, status badges (Approved/Aprovado, Flagged/Sinalizado, Rejected/Rejeitado), and inspection metrics.

## Tasks & Acceptance

**Execution:**
- [ ] `components/projects.html` -- Implement the Antifraud interactive sandbox HTML structure per `mockups/interactive-showcase.html` with accessibility labels (`aria-label`, `aria-valuemin`, `aria-valuenow`).
- [ ] `js/script.js` -- Implement real-time risk engine executing the exact velocity, geo-jump, and amount formulas on slider input per CAP-3.
- [ ] `js/script.js` -- Implement dynamic status badge and score bar transitions with WCAG AA verified color tokens per `DESIGN.md`.
- [ ] `js/translations.js` -- Add localization for all sandbox slider titles, help texts, and decision states per CAP-9.

**Acceptance Criteria:**
- Given a visitor interacts with the Antifraud card, when adjusting the sliders, then the risk score and status badge update instantly ($< 2\text{ms}$) in the browser without server requests.
- Given a transaction with Distance=2500km and Time Delta=5min, when evaluated, then the system identifies supersonic geo-jump and marks the transaction as REJECTED.
- Given a visitor toggles the theme between dark and light modes, when rendered, then the APPROVED/FLAGGED/REJECTED badges maintain accessible contrast ($\ge 4.5:1$).
- Given a visitor toggles the language, when changed, then all slider labels and decision badges translate between English and Portuguese without breaking the calculation state.

## Verification

**Commands:**
- `grep -i "antifraud" components/projects.html js/script.js` -- expected: Sandbox markup and script listeners present.
- `grep -E "APPROVED|FLAGGED|REJECTED" js/script.js js/translations.js` -- expected: Semantic decision statuses present.
