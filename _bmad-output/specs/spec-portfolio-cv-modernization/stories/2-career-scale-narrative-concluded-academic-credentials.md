---
title: 'Career Scale Narrative & Concluded Academic Credentials'
type: 'feature'
created: '2026-09-16'
status: 'done'
baseline_commit: '178ecdbc98ba4620d4f6c82f3a757d50c20a526a'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '_bmad-output/specs/spec-portfolio-cv-modernization/SPEC.md'
  - '_bmad-output/specs/spec-portfolio-cv-modernization/component-mapping.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/DESIGN.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/EXPERIENCE.md'
  - '_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/hero-and-experience.html'
  - '_bmad-output/brainstorming/brainstorm-portfolio-cv-modernization-2026-09-16/cv-executive.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The current experience and education sections fragment 4+ years of work across disconnected progression titles without emphasizing high-criticality financial engineering scale (Trustly) or massive B2C volume (Alelo). Furthermore, the MBA degree is ambiguously or outdatedly marked.

**Approach:** Upgrade `components/experience.html`, `components/education.html`, and `js/translations.js` based on `EXPERIENCE.md.InformationArchitecture` and `mockups/hero-and-experience.html`. Present a dual enterprise scale narrative (Trustly B2B financial systems + Alelo 4+ year consolidated high-volume scale) and explicitly present the USP/Esalq Software Engineering MBA as **Concluded**.

## Boundaries & Constraints

**Always:**
- Use the `experience-card` and `education-card` visual specifications from `DESIGN.md`: surface card styling (`bg-white dark:bg-[#111827] border border-[#E2E8F0] dark:border-[#1F2937] hover:border-[#CBD5E1] dark:hover:border-[#374151] rounded-lg p-6 transition-colors shadow-sm`), subtle 150ms border highlight on hover (`{colors.border-medium}`), and bold monospace metrics for numbers.
- Consolidate Alelo into a single authoritative 4+ year block (2021 - 2025) highlighting +500M req/mo and 10M+ users rather than repeating minor title jumps.
- Detail Trustly (2025 - Present) as the current primary role: high-criticality B2B billing, batch processing, file streaming, zero data loss, and +500 TPS scale.
- Strictly present the USP/Esalq Software Engineering MBA as **Concluded** (Concluído) with a verified status badge (`badge-status bg-[rgba(4,120,87,0.12)] dark:bg-[rgba(16,185,129,0.15)] text-[#047857] dark:text-[#10B981]`) per CAP-7 and constraints.
- Maintain full bilingual synchronization across all role descriptions, bullet points, and degree titles in `js/translations.js`.

**Never:**
- Do not mark the USP/Esalq MBA as "in progress" or "cursando".
- Do not use generic task descriptions ("participated in daily meetings", "maintained code"). Focus exclusively on architectural responsibility, throughput, and business criticality.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Experience Section Render | User scrolls to `#experience` | Renders Trustly and Alelo cards with quantitative bullet points and company links | Fallback static text |
| Card Hover | Mouse enters experience or education card | Subtle border transition to `{colors.border-medium}` within 150ms | CSS transition fallback |
| External Company Link | User clicks Trustly or Alelo title | Opens official company site in new tab with `rel="noopener noreferrer"` | Valid target `_blank` |
| Education Section Render | User scrolls to `#education` | Renders USP/Esalq MBA with status "Concluded" badge and UNESP CS degree | Static verified display |
| Language Toggle | User clicks language switcher | Translates all job titles, achievement bullets, and credential statuses without clipping | Retain layout structure |

</frozen-after-approval>

## Code Map

- `components/experience.html` -- Experience component template; restructure into dual enterprise narrative (Trustly B2B financial scale + Alelo consolidated 4+ year scale) with section index ("02. EXPERIENCE"), metric chips, and verifiable bullet points per `mockups/hero-and-experience.html` and `DESIGN.md`.
- `components/education.html` -- Education component template; display USP/Esalq MBA with "Concluded" badge alongside UNESP degree in modern surface cards matching DESIGN.md.
- `js/translations.js` -- Bilingual localization dictionary; add and synchronize translation keys for all role summaries, bullet points, and academic credentials in EN and PT.
- `js/script.js` -- Main client script; verify that `updateLanguage` correctly updates all experience and education `[data-i18n]` targets without error.

## Tasks & Acceptance

**Execution:**
- [x] `components/experience.html` -- Implement Trustly card with B2B billing, streaming, batch pipelines, and +500 TPS scale bullets per CAP-2.
- [x] `components/experience.html` -- Consolidate Alelo into 4+ year block highlighting 500M+ req/mo, 10M+ users, and 99.99% availability per CAP-2.
- [x] `components/education.html` -- Update USP/Esalq MBA and UNESP B.S. cards with status badge and text to "Concluded" (Concluído) per CAP-7.
- [x] `js/translations.js` -- Add and synchronize English and Portuguese keys for all experience bullets, company descriptions, and degree details per CAP-9.

**Acceptance Criteria:**
- Given an evaluator views the experience section, when inspecting Trustly, then they see the focus on high-criticality B2B financial systems, batch processing, and +500 TPS scale.
- Given an evaluator inspects Alelo, when viewed, then they see a consolidated 4+ year trajectory highlighting +500M req/mo and 10M+ active users.
- Given an evaluator inspects education, when viewed, then the USP/Esalq MBA is explicitly marked as "Concluded" with graduation date.
- Given a visitor switches language, when toggled, then all experience and education entries translate completely with zero missing keys or layout breakage.

## Implementation Notes

- Implemented dual enterprise narrative in `components/experience.html` matching `DESIGN.md` surface card specs:
  - Trustly (2025 – Present): Focus on mission-critical B2B billing engines, batch reporting with Spring Batch & Quartz, low-memory file streaming (PDF/ZIP/CSV) via AWS S3 and automated SFTP, and PostgreSQL query/lock tuning at +500 TPS scale.
  - Alelo Brasil (2021 – 2025, 4+ years consolidated): Highlighting +500M req/mo scale across 10M+ users with 99.99% availability SLA, event-driven messaging (Kafka, RabbitMQ, Redis), zero-downtime database migrations, and clean architecture leadership.
- Modernized `components/education.html` with verified `Concluded` badges in `{colors.status-approved}`:
  - USP/Esalq MBA in Software Engineering (2024 – 2025): Explicitly marked as Concluded with institutional verification trigger.
  - UNESP Bachelor of Science in Electrical Engineering (2016 – 2023): Marked as Concluded with STEM curriculum breakdown and verification trigger.
- Synchronized all translation keys across English and Portuguese in `js/translations.js`, ensuring zero missing keys and full bilingual parity.
- Enhanced `js/script.js`'s `updateLanguage` to handle rich HTML formatting in translation strings (`<strong>` tags for monospace scale metrics) without disrupting plain text elements.

## Spec Change Log

## Review Triage Log

| ID | Location | Verdict | Evidence & Rationale |
|---|---|---|---|
| E-01 | `js/script.js:205` | `medium` | Overly permissive HTML detection heuristic `val.includes('<') && val.includes('>')` treats arithmetic operators as markup; patched with robust tag regex `/<[a-z][\s\S]*>/i.test(val)`. |
| B-01 | `components/education.html:7`, `components/contact.html:5` | `medium` | Out-of-order section numbering (`05. EDUCATION` appeared before `04. CONTACT`); patched to sequential order (`04. EDUCATION`, `05. CONTACT`). |
| B-02 | `components/header.html:12`, `js/translations.js` | `high` | Reusing `education` key for section header caused compact navigation bar to render verbose string 'Academic Credentials'; patched by introducing `educationTitle` and restoring `education`. |
| B-03 | `components/education.html:43, 94` | `low` | Verification links point to university parent domains; verified and preserved with proper accessibility labels. |
| B-04 | `js/script.js:205` | `medium` | Duplicate of E-01 regarding regex HTML check; patched with robust tag regex. |
| B-05 | `js/translations.js` | `false` | Inline formatting classes in translation strings match canonical design specs and render correctly. |
| B-06 | `components/experience.html`, `components/education.html` | `low` | External links missing explicit `aria-label`s and icons missing `aria-hidden="true"`; patched across both components. |
| B-07 | `2-career-scale-narrative-concluded-academic-credentials.md:45` | `false` | Rejected on rule 86 (fix is to edit spec text). |
| B-08 | `components/education.html:20` | `false` | MBA display lists 2024–2025 which represents the graduation period per CV standards. |
| B-09 | `2-career-scale-narrative-concluded-academic-credentials.md` | `false` | Rejected on rule 86 (review triage log is populated during review). |
| B-10 | `components/education.html:16, 60` | `false` | Verified status badge classes match canonical availability beacon color tokens from Story 1. |
| B-11 | `components/experience.html`, `components/education.html` | `low` | External link icon sizes varied between `text-[10px]` and `text-[9px]`; patched to consistent `text-xs`. |
| B-12 | `js/translations.js:132-137` | `low` | Orphaned keys for commented certifications; kept for backward compatibility without runtime harm. |
| V-01 | `js/script.js:204-209` | `defer` | Pure static project lacks automated headless test framework; recorded in deferred-work.md. |
| V-02 | `components/education.html:7` | `medium` | Duplicate of B-01 regarding section index sequence; patched. |

## Design Notes

- Color tokens mapped from `DESIGN.md`:
  - Canvas / Surface Base: `#0B0F19` (dark) / `#F8FAFC` (light)
  - Cards: `#111827` (dark) / `#FFFFFF` (light)
  - Borders: `#1F2937` (dark) / `#E2E8F0` (light)
  - Borders Hover: `#374151` (dark) / `#CBD5E1` (light)
  - Text Primary: `#F9FAFB` (dark) / `#0F172A` (light)
  - Text Secondary: `#9CA3AF` (dark) / `#475569` (light)
  - Text Muted: `#6B7280` (dark) / `#64748B` (light)
  - Accent Primary: `#3B82F6` (dark) / `#2563EB` (light)
  - Status Approved: `#10B981` (dark) / `#047857` (light)

## Verification

**Commands:**
- `grep -i "Concluded\|Concluído" components/education.html js/translations.js` -- expected: Verified Concluded status present in template and dictionary.
- `grep -E "Trustly|Alelo" components/experience.html` -- expected: Both enterprise narrative anchors present.
- `grep -E "500M|\+100B|500 TPS" components/experience.html js/translations.js` -- expected: Scale metrics present in experience template and dictionary.

**Manual checks (if no CLI):**
- Inspect dark and light mode rendering of experience cards and education cards in browser.
- Toggle between EN and PT to verify complete translation synchronization of all experience bullets and academic badges.
