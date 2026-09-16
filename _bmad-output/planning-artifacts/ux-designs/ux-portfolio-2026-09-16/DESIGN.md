---
name: Vinicius Silva Portfolio & Executive CV
description: High-signal Senior Software Engineer portfolio and executive CV showcase with verified scale metrics, interactive engineering simulations, and open-source contributions.
status: final
sources:
  - ../../../specs/spec-portfolio-cv-modernization/SPEC.md
updated: 2026-09-16
colors:
  # Base Surface & Canvas (Dark Mode is Primary)
  surface-base: '#0B0F19'
  surface-base-light: '#F8FAFC'
  surface-card: '#111827'
  surface-card-light: '#FFFFFF'
  surface-card-subtle: '#1F2937'
  surface-card-subtle-light: '#F1F5F9'
  surface-terminal: '#0D1117'
  surface-terminal-header: '#161B22'

  # Borders & Outlines
  border-subtle: '#1F2937'
  border-subtle-light: '#E2E8F0'
  border-medium: '#374151'
  border-medium-light: '#CBD5E1'
  border-highlight: '#4B5563'
  border-highlight-light: '#94A3B8'

  # Text & Content Hierarchy
  text-primary: '#F9FAFB'
  text-primary-light: '#0F172A'
  text-secondary: '#9CA3AF'
  text-secondary-light: '#475569'
  text-muted: '#6B7280'
  text-muted-light: '#64748B'

  # Brand & Interactive Accents
  accent-primary: '#3B82F6'
  accent-primary-hover: '#2563EB'
  accent-primary-light: '#2563EB'
  accent-primary-hover-light: '#1D4ED8'
  accent-cyan: '#06B6D4'

  # Semantic Status & Antifraud Badges (Dark Mode)
  status-approved: '#10B981'
  status-approved-bg: 'rgba(16, 185, 129, 0.15)'
  status-approved-border: '#059669'
  status-flagged: '#F59E0B'
  status-flagged-bg: 'rgba(245, 158, 11, 0.15)'
  status-flagged-border: '#D97706'
  status-rejected: '#EF4444'
  status-rejected-bg: 'rgba(239, 68, 68, 0.15)'
  status-rejected-border: '#DC2626'

  # Semantic Status & Antifraud Badges (Light Mode — WCAG AA Verified >= 4.5:1)
  status-approved-light: '#047857'
  status-approved-bg-light: 'rgba(4, 120, 87, 0.12)'
  status-approved-border-light: '#059669'
  status-flagged-light: '#B45309'
  status-flagged-bg-light: 'rgba(180, 83, 9, 0.12)'
  status-flagged-border-light: '#D97706'
  status-rejected-light: '#B91C1C'
  status-rejected-bg-light: 'rgba(185, 28, 28, 0.12)'
  status-rejected-border-light: '#DC2626'

  # Terminal & Code Accents
  terminal-prompt: '#58A6FF'
  terminal-success: '#3FB950'
  terminal-warn: '#D29922'
  terminal-text: '#C9D1D9'
  terminal-cursor: '#58A6FF'
  mac-dot-close: '#FF5F56'
  mac-dot-minimize: '#FFBD2E'
  mac-dot-maximize: '#27C93F'

typography:
  fontFamily:
    sans: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    mono: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace"
  display:
    fontFamily: "Inter, sans-serif"
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.15'
    letterSpacing: '-0.025em'
  display-mobile:
    fontFamily: "Inter, sans-serif"
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: '-0.02em'
  h1:
    fontFamily: "Inter, sans-serif"
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.25'
    letterSpacing: '-0.02em'
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: '-0.015em'
  h3:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: '-0.01em'
  body-lg:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  body-sm:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0.01em'
  code-lg:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 15px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: '-0.01em'
  code-md:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  code-sm:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
  metric-headline:
    fontFamily: "'JetBrains Mono', monospace"
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: '-0.03em'

rounded:
  none: '0px'
  xs: '3px'
  sm: '6px'
  md: '8px'
  lg: '12px'
  xl: '16px'
  full: '9999px'
  DEFAULT: '8px'

spacing:
  '0': '0px'
  '1': '4px'
  '2': '8px'
  '3': '12px'
  '4': '16px'
  '5': '20px'
  '6': '24px'
  '8': '32px'
  '10': '40px'
  '12': '48px'
  '16': '64px'
  '20': '80px'
  '24': '96px'
  container-max: '1200px'
  gutter-desktop: '32px'
  gutter-mobile: '16px'

components:
  navigation-bar:
    background: 'rgba(11, 15, 25, 0.85)'
    background-light: 'rgba(248, 250, 252, 0.85)'
    backdropBlur: '12px'
    borderBottom: '{colors.border-subtle}'
    borderBottom-light: '{colors.border-subtle-light}'
    height: '64px'
  mobile-menu-drawer:
    background: '{colors.surface-base}'
    background-light: '{colors.surface-base-light}'
    borderBottom: '{colors.border-subtle}'
    padding: '{spacing.6}'
    zIndex: '40'
  hero-section:
    paddingTop: '{spacing.16}'
    paddingBottom: '{spacing.12}'
    headlineColor: '{colors.text-primary}'
    subheadlineColor: '{colors.text-secondary}'
  metric-stat-card:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    borderColor-light: '{colors.border-subtle-light}'
    rounded: '{rounded.md}'
    padding: '{spacing.6}'
    numberFont: '{typography.metric-headline.fontFamily}'
    numberColor: '{colors.text-primary}'
  experience-card:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    borderColor-light: '{colors.border-subtle-light}'
    rounded: '{rounded.lg}'
    padding: '{spacing.6}'
  antifraud-sandbox:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-medium}'
    rounded: '{rounded.lg}'
    padding: '{spacing.6}'
    sliderTrack: '{colors.surface-card-subtle}'
    sliderThumb: '{colors.accent-primary}'
  dotme-terminal:
    background: '{colors.surface-terminal}'
    headerBackground: '{colors.surface-terminal-header}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.lg}'
    codeFont: '{typography.code-md.fontFamily}'
    textColor: '{colors.terminal-text}'
  opensource-card:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.md}'
    padding: '{spacing.5}'
  skills-layer-card:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.md}'
    padding: '{spacing.5}'
  education-card:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.md}'
    padding: '{spacing.5}'
  contact-section:
    background: '{colors.surface-card}'
    background-light: '{colors.surface-card-light}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.lg}'
    padding: '{spacing.8}'
  cta-button-primary:
    background: '{colors.accent-primary}'
    color: '#FFFFFF'
    background-hover: '{colors.accent-primary-hover}'
    rounded: '{rounded.sm}'
    paddingX: '{spacing.5}'
    paddingY: '{spacing.3}'
    fontSize: '{typography.body-md.fontSize}'
    fontWeight: '600'
  cta-button-secondary:
    background: 'transparent'
    color: '{colors.text-primary}'
    color-light: '{colors.text-primary-light}'
    borderColor: '{colors.border-medium}'
    rounded: '{rounded.sm}'
    paddingX: '{spacing.4}'
    paddingY: '{spacing.3}'
    fontSize: '{typography.body-md.fontSize}'
    fontWeight: '500'
  badge-status:
    rounded: '{rounded.full}'
    paddingX: '{spacing.3}'
    paddingY: '{spacing.1}'
    fontSize: '{typography.code-sm.fontSize}'
    fontWeight: '600'
  language-theme-toggle:
    background: '{colors.surface-card-subtle}'
    background-light: '{colors.surface-card-subtle-light}'
    borderColor: '{colors.border-subtle}'
    rounded: '{rounded.sm}'
    height: '36px'
---

# Vinicius Silva Portfolio & Executive CV — Design Spine

> **Canonical Visual Identity Reference.** Conforms to Google Labs DESIGN.md specification. Defines visual design tokens, aesthetic posture, color hierarchies, typography ramps, and component styling. Paired with `EXPERIENCE.md`.

---

## 1. Brand & Style

The visual identity embodies **ultra-sober developer platform minimalism**, taking aesthetic cues from high-signal engineering products such as Linear, Stripe, and Vercel.

- **Signal Over Noise:** Every pixel exists to communicate verifiable engineering depth. No gratuitous decorative illustrations, no generic 3D floating shapes, and no hyperbolic marketing copy.
- **Auditable Rigor:** High data density balanced by disciplined negative space. Metrics are set in razor-sharp monospace typography to convey computational precision.
- **First-Class Dark Mode:** Engineered natively for a dark-first presentation (`{colors.surface-base}` slate base), which honors engineering culture and guarantees maximum contrast for code, terminals, and interactive widgets. A clean, crisp light mode (`{colors.surface-base-light}`) is fully supported with WCAG AA compliant text and status tokens for print fidelity and traditional recruiter preferences.

---

## 2. Colors

The color system relies on a neutral slate/zinc foundation paired with precise, semantic status indicators.

### Base Canvases & Hierarchy
- `{colors.surface-base}` (`#0B0F19`): Deep slate canvas providing the resting backdrop in dark mode. Eliminates eye fatigue while creating high contrast against card borders. Light mode twin: `{colors.surface-base-light}` (`#F8FAFC`).
- `{colors.surface-card}` (`#111827`): Elevated surface for content modules, work history items, and skill containers. Distinct from the canvas via 1px `{colors.border-subtle}` borders rather than heavy drop shadows. Light mode twin: `{colors.surface-card-light}` (`#FFFFFF`).
- `{colors.surface-terminal}` (`#0D1117`): Specialized terminal canvas mirroring GitHub/macOS terminal environments for the autonomous dotme simulator.

### Semantic Status Tokens
- **Approved / Positive:** Dark mode: `{colors.status-approved}` (`#10B981`) paired with `{colors.status-approved-bg}`. Light mode: `{colors.status-approved-light}` (`#047857`, contrast ratio $\ge 4.5:1$ against white/card). Used exclusively for clean antifraud scores ($S < 40$), the live availability beacon, and verified status checks.
- **Review / Warning:** Dark mode: `{colors.status-flagged}` (`#F59E0B`) with `{colors.status-flagged-bg}`. Light mode: `{colors.status-flagged-light}` (`#B45309`, contrast ratio $\ge 4.5:1$). Used for intermediate risk thresholds ($40 \le S < 75$) and terminal cautionary warnings.
- **Rejected / Danger:** Dark mode: `{colors.status-rejected}` (`#EF4444`) with `{colors.status-rejected-bg}`. Light mode: `{colors.status-rejected-light}` (`#B91C1C`, contrast ratio $\ge 4.5:1$). Used for high-risk antifraud evaluation ($S \ge 75$) and critical failures.

### Interactive Accents
- `{colors.accent-primary}` (`#3B82F6`): Precision royal blue used for key calls to action (ATS CV Download) and interactive slider thumbs. Never used decoratively in backgrounds.
- `{colors.accent-cyan}` (`#06B6D4`): Technical syntax token used for parameter highlights and shell flags in code snippets and terminal summaries.

---

## 3. Typography

A strict dual-font typographic architecture guarantees editorial legibility and technical credibility.

- **UI & Editorial Voice:** **Inter**. Selected for its optical clarity, neutral character, and tall x-height at small sizes. Powers headlines, narrative copy, and navigational items.
- **Data, Metrics & Code:** **JetBrains Mono**. Selected for clear distinction between similar glyphs (`0` vs `O`, `1` vs `l`), consistent tabular figures for numbers, and authenticity in the terminal loop.

### Typographic Ramp
1. **Hero Display:** `{typography.display}` ({typography.display.fontSize}, {typography.display.fontWeight} weight, {typography.display.letterSpacing} tracking) on desktop; shifts to `{typography.display-mobile}` ({typography.display-mobile.fontSize}) on mobile viewports.
2. **Section Titles (H2):** `{typography.h2}` ({typography.h2.fontSize}, {typography.h2.fontWeight} weight, {typography.h2.letterSpacing} tracking). Accompanied by a subtle monospace section index (`01. EXPERIENCE`, `02. ARCHITECTURE & CODE`).
3. **Card Headlines (H3):** `{typography.h3}` ({typography.h3.fontSize}, {typography.h3.fontWeight} weight). Used for role titles, project names, and skill categories.
4. **Body Prose:** `{typography.body-md}` ({typography.body-md.fontSize}, {typography.body-md.fontWeight} weight, {typography.body-md.lineHeight} line height) for dense, auditable project notes and technical achievements.
5. **Key Scale Figures:** `{typography.metric-headline}` ({typography.metric-headline.fontSize}, {typography.metric-headline.fontWeight} weight, JetBrains Mono) ensuring numbers like `+500M` and `+$100B` stand out instantly.

---

## 4. Layout & Spacing

A structured grid based on an 8pt increment scale (`{spacing.1}`, `{spacing.2}`, `{spacing.4}`, `{spacing.6}`, `{spacing.8}`, `{spacing.12}`, `{spacing.16}`).

- **Max Container Width:** Fixed at `{spacing.container-max}` (`1200px`), centered with auto margins to maintain comfortable scanning lines on ultra-wide displays.
- **Desktop Gutter:** `{spacing.gutter-desktop}` (`32px`) lateral padding on desktop screens.
- **Mobile Gutter:** `{spacing.gutter-mobile}` (`16px`) padding on mobile viewports (`< 768px`).
- **Section Rhythm:** Major sections separated by `{spacing.16}` (`64px`) to `{spacing.20}` (`80px`) vertical rhythm, preventing visual crowding while keeping the scroll compact.

---

## 5. Elevation & Depth

Modern developer platforms avoid heavy drop shadows in favor of **border luminescence and subtle background contrast**.

- **Level 0 (Canvas):** Flat `{colors.surface-base}`.
- **Level 1 (Cards & Modules):** `{colors.surface-card}` with 1px border of `{colors.border-subtle}`. On hover, border transitions smoothly (150ms) to `{colors.border-medium}`.
- **Level 2 (Active Widgets & Sandboxes):** Elevated card with 1px `{colors.border-medium}` and a restrained, diffused glow (`box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4)`).
- **Level 3 (Sticky Navigation & Modals):** `{components.navigation-bar.background}` with `backdrop-filter: blur({components.navigation-bar.backdropBlur})` and a bottom border dividing navigation from page content.

---

## 6. Shapes

- **Corners:**
  - Cards and interactive modules use `{rounded.lg}` (`12px`) or `{rounded.md}` (`8px`), providing modern polish without playful bubble aesthetics.
  - Buttons and inputs use `{rounded.sm}` (`6px`) for architectural precision.
  - Status badges and tag chips use `{rounded.full}` (`9999px`) to distinguish pill metadata from rectangular cards.
- **Terminal Frame:** Terminal window uses `{rounded.lg}` (`12px`) with three distinct window action dots (`12px` diameter, `{colors.mac-dot-close}`, `{colors.mac-dot-minimize}`, `{colors.mac-dot-maximize}`).

---

## 7. Components

> **Visual Reference:** See promoted mockups [`mockups/hero-and-experience.html`](file:///home/vinicius/Documents/github/portfolio/_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/hero-and-experience.html) and [`mockups/interactive-showcase.html`](file:///home/vinicius/Documents/github/portfolio/_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/interactive-showcase.html). These spines win on conflict with any mockup or wireframe.

### Navigation Bar (`navigation-bar`)
- **Anatomy:** Left: Monospace brand monogram (`VRS / Senior SWE`); Center: Quick anchors (`Experience`, `Projects`, `Skills`, `Education`); Right: Bilingual toggle (`EN | PT`), Theme switch (`Dark / Light`), and ATS CV button.
- **Visuals:** Height `{components.navigation-bar.height}`, semi-transparent background with `{components.navigation-bar.backdropBlur}` blur, 1px bottom border `{colors.border-subtle}`.

### Mobile Menu Drawer (`mobile-menu-drawer`)
- **Anatomy:** Full-width slide-down panel below sticky navigation on mobile viewports (< 768px). Contains stacked navigation anchors, explicit bilingual language switchers, theme switcher, and primary ATS CV download button.
- **Visuals:** Background `{components.mobile-menu-drawer.background}`, padding `{components.mobile-menu-drawer.padding}`, border bottom `{components.mobile-menu-drawer.borderBottom}`.

### Hero Section (`hero-section`)
- **Anatomy:** Live availability badge (pulsing green dot + text); H1 headline with engineer name and executive specialization; 2-line value proposition; primary CTA button (`Download ATS CV`); secondary link buttons (`LinkedIn`, `GitHub`, `Direct Email`); scale metric strip.
- **Availability Beacon:** Circular 8px dot with CSS pulse animation (`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); } 70% { box-shadow: 0 0 0 8px rgba(16, 185, 129, 0); } 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); } }`).

### Metric Stat Cards (`metric-stat-card`)
- **Anatomy:** 3-column grid on desktop, 1-column on mobile. Large monospace number (`+500M`, `+$100B`, `+500 TPS`), small uppercase label (`MONTHLY REQUEST VOLUME`, `PROCESSED BILLING VOLUME`, `PEAK B2B THROUGHPUT`), brief technical descriptor.

### Experience Cards (`experience-card`)
- **Anatomy:** Prominent enterprise trajectory card. Top row: Role headline and duration period; Subhead: Organization name and sector; Body: Unordered list of verifiable achievements with emphasized metrics; Footer: Technology chip tags (e.g. `Java 21`, `Spring Batch`, `PostgreSQL`).

### Antifraud Sandbox (`antifraud-sandbox`)
- **Anatomy:** Left/Top panel: 3 interactive sliders (Amount `$10 - $10,000`, Delta T `1 - 300 min`, Distance `0 - 3,000 km`) with numeric readouts; Right/Bottom panel: Output diagnostic card with animated risk meter (`0–100`), semantic decision badge (`APPROVED`, `FLAGGED`, `REJECTED`), and formula decomposition tags (`Velocity penalty`, `Geo-jump penalty`, `Damping ratio`).

### Autonomous dotme Terminal (`dotme-terminal`)
- **Anatomy:** Window header bar with macOS control dots and title `dotme — zsh — 80x24`; Terminal canvas in `{colors.surface-terminal}` (`#0D1117`); Monospace buffer with distinct colored tokens: blue prompt (`$`), white commands, green link affirmations, and blinking cursor (`█`).

### Open Source Cards (`opensource-card`)
- **Anatomy:** Grid card displaying library name (e.g., `MockK`), contribution scope badge (`Merged PR / Author`), concise architectural summary of the bug fix/feature, and a direct external GitHub link with verified SVG icon.

### Skills Matrix Cards (`skills-layer-card`)
- **Anatomy:** 4 architectural categories in a responsive grid. Each card displays layer title, architectural intent, and a dense tag-cloud of specific technologies (e.g., `Java 21`, `Kotlin`, `Spring Batch`, `PostgreSQL`, `Kafka`).

### Education Cards (`education-card`)
- **Anatomy:** Two structured credential modules. Institution name (USP / Esalq, UNESP), formal degree title, conclusion date, and an explicit verified badge (`CONCLUDED` / `Concluído`) in `{colors.status-approved}`.

### Contact Section (`contact-section`)
- **Anatomy:** Full-width concluding module. High-conversion direct contact headline, pre-formatted mailto trigger with explicit subject/body preview, direct LinkedIn and GitHub profile triggers, and direct ATS CV download button.

### CTA Buttons (`cta-button-primary` & `cta-button-secondary`)
- **Primary:** Solid `{colors.accent-primary}` background, bold white text, subtle hover lift and color transition (`150ms`).
- **Secondary:** Transparent background with `{colors.border-medium}` border, primary text color, hover background `{colors.surface-card-subtle}`.

### Status & Decision Badges (`badge-status`)
- **Anatomy:** Pill badge with `{rounded.full}` radius. 1px border matching status tone, semi-transparent background (`0.15` opacity), bold monospace label text.

---

## 8. Do's and Don'ts

### Do
- **Do** preserve high contrast ratios (WCAG AA $\ge 4.5:1$ for normal text, $\ge 3:1$ for large text and UI borders) in both dark and light modes.
- **Do** use JetBrains Mono for all numeric metrics, code snippets, and terminal output.
- **Do** use subtle 1px border lines to delineate surfaces rather than heavy drop shadows.
- **Do** format technical achievements with verifiable enterprise metrics.

### Don't
- **Don't** use decorative gradients, neon glow effects, or playful animations that distract from technical credibility.
- **Don't** use carousel sliders or accordion tabs that conceal key career achievements or skills behind extra clicks.
- **Don't** use low-contrast muted text below `#9CA3AF` in dark mode or `#64748B` in light mode for critical data.
- **Don't** include spinning counter animations or gamified progress bars. Numbers must be instantly legible upon page load.
