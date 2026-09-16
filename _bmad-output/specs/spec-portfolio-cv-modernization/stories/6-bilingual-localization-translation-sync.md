---
title: 'Bilingual Localization & Translation Sync'
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
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Adding extensive executive metrics, new career descriptions, 4-layer architectural taxonomy, and interactive widget labels creates a risk of translation key desynchronization, raw key leaks (`[missing key]`), or visual layout breakage when toggling between languages.

**Approach:** Upgrade and audit `js/translations.js` and `js/script.js` to ensure complete bilingual parity between English (`en`, default) and Portuguese (`pt`) across all sections, interactive widgets, status badges, and direct contact templates per CAP-9 and `EXPERIENCE.md`.

## Boundaries & Constraints

**Always:**
- Keep English as default language (`en`), with immediate in-place DOM translation to Portuguese (`pt`) upon user toggle.
- Persist user choice in `localStorage.getItem('language')`.
- Ensure 100% key parity: every key in `translations.en` must have a direct counterpart in `translations.pt`.
- Translate all dynamic widget states (Antifraud decision badges: APPROVED/APROVADO, FLAGGED/SINALIZADO, REJECTED/REJEITADO, slider labels, metric tooltips).
- Ensure mailto subject and pre-filled inquiry body adapt to current selected language.
- Zero layout shifts or element overflows when switching languages.

**Never:**
- Do not reload the page or force a full page refresh on language toggle.
- Do not leave untranslated raw key strings in the DOM.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| First Page Load | No previous language in localStorage | Loads in English (`en`) by default | Fallback to English |
| Language Toggle to PT | User clicks `PT` button | All DOM nodes with `data-i18n` update to Portuguese instantly; active toggle indicator switches | In-place DOM update |
| Language Toggle to EN | User clicks `EN` button | All text nodes revert to English; preference saved to localStorage | In-place DOM update |
| Widget State Update | Antifraud slider moves while language is `PT` | Decision badge displays `APROVADO`, `SINALIZADO`, or `REJEITADO` | Correct locale lookup |
| Dynamic Mailto Trigger | Recruiter clicks email CTA in PT mode | Subject line opens with "Oportunidade de Engenharia Sênior - Vinicius R. Silva" | Locale-sensitive mailto |

</frozen-after-approval>

## Code Map

- `js/translations.js` -- Localization dictionaries; define matching key-value pairs for `en` and `pt` across all new components, metrics, skills, and interactive widgets.
- `js/script.js` -- Localization engine; handle language switch events, traverse elements with `data-i18n`, update inner text and placeholder attributes, and trigger widget re-translations.
- `components/header.html` -- Language toggle button (`EN / PT`) with accessibility attributes (`aria-label`, active states).

## Tasks & Acceptance

**Execution:**
- [ ] `js/translations.js` -- Populate dictionary with complete keys for Hero, Experience (Trustly/Alelo), Skills (4 layers), Projects (Antifraud & dotme), Open Source, Education, and Contact per CAP-9.
- [ ] `js/script.js` -- Ensure translation updater handles nested text, slider labels, and dynamic widget decision badges without layout shifts.
- [ ] `js/translations.js` -- Verify exact 1:1 key parity between `translations.en` and `translations.pt`.

**Acceptance Criteria:**
- Given a visitor loads the site, when looking at any component, then all text is rendered in the active language without untranslated placeholder keys.
- Given a visitor switches from English to Portuguese, when toggled, then the entire page updates within $<50\text{ms}$ without page refresh or layout jitter.
- Given the Antifraud simulation is active in Portuguese mode, when sliders trigger a status change, then the badge displays "APROVADO", "SINALIZADO", or "REJEITADO" accurately.

## Verification

**Commands:**
- `python3 -c "import json; f = open('js/translations.js').read(); print('Translation file readable')"` -- expected: Syntax valid.
- `grep -E "APROVADO|SINALIZADO|REJEITADO" js/translations.js` -- expected: Portuguese widget statuses present.
