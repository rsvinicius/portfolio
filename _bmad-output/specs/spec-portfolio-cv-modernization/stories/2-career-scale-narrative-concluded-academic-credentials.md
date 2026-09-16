---
title: 'Career Scale Narrative & Concluded Academic Credentials'
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
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/hero-and-experience.html'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current experience and education sections fragment 4+ years of work across disconnected progression titles without emphasizing high-criticality financial engineering scale (Trustly) or massive B2C volume (Alelo). Furthermore, the MBA degree is ambiguously or outdatedly marked.

**Approach:** Upgrade `components/experience.html`, `components/education.html`, and `js/translations.js` based on `EXPERIENCE.md.InformationArchitecture` and `mockups/hero-and-experience.html`. Present a dual enterprise scale narrative (Trustly B2B financial systems + Alelo 4+ year consolidated high-volume scale) and explicitly present the USP/Esalq Software Engineering MBA as **Concluded**.

## Boundaries & Constraints

**Always:**
- Use the `experience-card` visual specification from `DESIGN.md`: surface card styling, subtle 150ms border highlight on hover (`{colors.border-medium}`), and bold monospace metrics for numbers.
- Consolidate Alelo into a single authoritative 4+ year block (2020 - 2024) highlighting +500M req/mo and 10M+ users rather than repeating minor title jumps.
- Detail Trustly (Oct 2024 - Present) as the current primary role: high-criticality B2B billing, batch processing, file streaming, zero data loss, and +500 TPS scale.
- Strictly present the USP/Esalq Software Engineering MBA as **Concluded** (Concluído) per CAP-7 and constraints.
- Maintain full bilingual synchronization across all role descriptions, bullet points, and degree titles in `js/translations.js`.

**Never:**
- Do not mark the USP/Esalq MBA as "in progress" or "cursando".
- Do not use generic task descriptions ("participated in daily meetings", "maintained code"). Focus exclusively on architectural responsibility, throughput, and business criticality.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Experience Section Render | User scrolls to `#experience` | Renders Trustly and Alelo cards with quantitative bullet points and company links | Fallback static text |
| Card Hover | Mouse enters experience card | Subtle border transition to `{colors.border-medium}` within 150ms | CSS transition fallback |
| External Company Link | User clicks Trustly or Alelo title | Opens official company site in new tab with `rel="noopener noreferrer"` | Valid target `_blank` |
| Education Section Render | User scrolls to `#education` | Renders USP/Esalq MBA with status "Concluded" badge and UNESP CS degree | Static verified display |
| Language Toggle | User clicks language switcher | Translates all job titles, achievement bullets, and credential statuses without clipping | Retain layout structure |

</frozen-after-approval>

## Code Map

- `components/experience.html` -- Experience component template; restructure into dual enterprise narrative (Trustly B2B financial scale + Alelo consolidated 4+ year scale) with metric chips and verifiable bullet points per `mockups/hero-and-experience.html`.
- `components/education.html` -- Education component template; display USP/Esalq MBA with "Concluded" badge alongside UNESP Computer Science degree.
- `js/translations.js` -- Bilingual localization dictionary; add and synchronize translation keys for all role summaries, bullet points, and academic credentials in EN and PT.
- `js/script.js` -- Main client script; ensure smooth anchor scroll and intersection observer integration for `#experience` and `#education`.

## Tasks & Acceptance

**Execution:**
- [ ] `components/experience.html` -- Implement Trustly card with B2B billing, streaming, batch pipelines, and +500 TPS scale bullets per CAP-2.
- [ ] `components/experience.html` -- Consolidate Alelo into 4+ year block highlighting 500M+ req/mo, 10M+ users, and 99.99% availability per CAP-2.
- [ ] `components/education.html` -- Update USP/Esalq MBA status badge and text to "Concluded" (Concluído) per CAP-7.
- [ ] `js/translations.js` -- Add and synchronize English and Portuguese keys for all experience bullets, company descriptions, and degree details per CAP-9.

**Acceptance Criteria:**
- Given an evaluator views the experience section, when inspecting Trustly, then they see the focus on high-criticality B2B financial systems, batch processing, and +500 TPS scale.
- Given an evaluator inspects Alelo, when viewed, then they see a consolidated 4+ year trajectory highlighting +500M req/mo and 10M+ active users.
- Given an evaluator inspects education, when viewed, then the USP/Esalq MBA is explicitly marked as "Concluded" with graduation date.
- Given a visitor switches language, when toggled, then all experience and education entries translate completely with zero missing keys or layout breakage.

## Verification

**Commands:**
- `grep -i "Concluded\|Concluído" components/education.html js/translations.js` -- expected: Verified Concluded status present in template and dictionary.
- `grep -E "Trustly|Alelo" components/experience.html` -- expected: Both enterprise narrative anchors present.
