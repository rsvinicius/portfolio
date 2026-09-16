---
name: Vinicius Silva Portfolio & Executive CV
status: final
sources:
  - ../../../specs/spec-portfolio-cv-modernization/SPEC.md
updated: 2026-09-16
---

# Vinicius Silva Portfolio & Executive CV — Experience Spine

> **Canonical Behavioral & Flow Contract.** Defines information architecture, behavioral component rules, interaction states, accessibility standards, and named-evaluator journeys. Cross-references visual tokens in `DESIGN.md` using `{path.to.token}` syntax. Implements and validates all source capabilities `[CAP-1]` through `[CAP-9]` from `SPEC.md`.

---

## 1. Foundation

- **Platform & Form Factor:** Single-surface responsive web application accessible across modern desktop, tablet, and mobile browsers.
- **UI Architecture:** Pure vanilla HTML5, modern CSS3 (Custom Properties), and zero-dependency client-side JavaScript (`script.js`, `translations.js`). Zero React/Vue runtime, zero client-side hydration overhead.
- **Visual Identity Reference:** `DESIGN.md` owns all visual tokens, colors, typography ramps, and elevations. This spine owns behavior, information hierarchy, state machines, and evaluator journeys.
- **Theme & Localization Baseline:**
  - Dark mode is default, persisted via `localStorage.getItem('theme')`.
  - English is default (`en`), with Portuguese (`pt`) selectable via in-place DOM translation attributes (`data-i18n`) `[CAP-9]`.
  - [ASSUMPTION] ATS resume PDF is statically hosted at `assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf` for direct one-click download without form gatekeeping `[CAP-1], [CAP-8]`.

---

## 2. Information Architecture

All content is structured sequentially on a single scrollable page to optimize scanning speed for evaluators with tight time constraints.

| Surface Anchor | Reached From | Primary Purpose | Source Capabilities | Key Content & Interactive Elements |
|---|---|---|---|---|
| `#header` | Initial page load / Sticky | Brand identity, primary section jump links, global controls | `[CAP-8], [CAP-9]` | Monogram logo, nav anchors, `EN/PT` toggle, Theme switch, ATS CV link |
| `#hero` | Page load / Nav "Home" | Instant senior positioning and proof of scale | `[CAP-1]` | Executive headline, value prop, live availability beacon, ATS CV CTA, metric cards |
| `#experience` | Scroll / Nav "Experience" | Dual enterprise career narrative | `[CAP-2]` | Trustly B2B financial scale + Alelo B2C high-volume throughput narrative blocks |
| `#projects` | Scroll / Nav "Projects" | Active engineering proof ("Show, Don't Tell") | `[CAP-3], [CAP-4]` | Interactive Antifraud Real-Time Sandbox + Autonomous dotme Terminal loop |
| `#opensource` | Scroll / Nav "Open Source" | Proof of community citizenship & rigorous craft | `[CAP-5]` | MockK v1.14.0 merged bug fix, dotme CLI, n8n-docs, microbot cards |
| `#skills` | Scroll / Nav "Skills" | 4-layer architectural taxonomy | `[CAP-6]` | JVM Core, Distributed Systems/Scale, Cloud/DevOps, AI-Augmented SDLC |
| `#education` | Scroll / Nav "Education" | Formal academic credentials | `[CAP-7]` | Concluded USP/Esalq Software Engineering MBA + UNESP CS degree |
| `#contact` | Scroll / Nav "Contact" | Zero-friction conversion & direct communication | `[CAP-8]` | Pre-formatted `mailto:` trigger, verified LinkedIn & GitHub profiles, ATS PDF download |

> **Composition References:**
> - [`mockups/hero-and-experience.html`](file:///home/vinicius/Documents/github/portfolio/_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/hero-and-experience.html) illustrates `#header`, `#hero`, and `#experience`.
> - [`mockups/interactive-showcase.html`](file:///home/vinicius/Documents/github/portfolio/_bmad-output/planning-artifacts/ux-designs/ux-portfolio-2026-09-16/mockups/interactive-showcase.html) illustrates `#projects` (Antifraud Sandbox and dotme Autonomous Terminal).
> - **Spine-only Implementations:** Surfaces `#opensource`, `#skills`, `#education`, and `#contact` are implemented directly from the token and pattern tables in `DESIGN.md` and this spine without separate mockups.
> - **Authority:** These spines win on conflict with any mockup or wireframe.

---

## 3. Voice and Tone

Microcopy adheres to an auditable, high-signal engineering standard. Claims must be grounded in observable facts and verifiable metrics.

| Do (Auditable Engineering Signal) | Don't (Marketing Fluff / Generic Resume Copy) |
|---|---|
| "+500M req/mo across microservices; +$100B processed billing volume." | "Passionate developer building cutting-edge high-scale solutions." |
| "Fixed MockK state leak in `confirmVerified` for hermetic test isolation (v1.14.0)." | "Contributed to popular open-source software libraries." |
| "Client-side heuristic risk score computed using velocity and geo-jump formulas." | "AI-powered revolutionary fraud detection algorithm." |
| "Software Engineering MBA — Concluded (USP / Esalq)." | "Pursuing lifelong learning and continuous academic improvement." |
| "Open to select senior/staff opportunities (Remote / Hybrid)." | "Hire me! Looking for exciting new challenges in tech." |

---

## 4. Component Patterns

Behavioral rules governing each component defined in `DESIGN.md.Components`.

### Navigation Bar (`navigation-bar`) — `[CAP-8], [CAP-9]`
- **Behavior:** Sticks to viewport top on scroll (`position: sticky; top: 0; z-index: 50`).
- **Scroll Sync:** Highlights the active section anchor as the user scrolls past corresponding section headings (IntersectionObserver with 20% viewport threshold).

### Mobile Menu Drawer (`mobile-menu-drawer`) — `[CAP-8], [CAP-9]`
- **Behavior:** On screens `< 768px`, desktop anchor links collapse into an accessible hamburger button (`aria-expanded="false"`, `aria-controls="mobile-menu-drawer"`). Tapping opens a full-width drawer containing navigation links, language toggle, and theme switch.
- **Dismissal:** Tapping any link, clicking outside the drawer, or pressing `Esc` closes the drawer and restores background body scroll.

### Hero Section (`hero-section`) — `[CAP-1]`
- **Behavior:** Loads immediately on page mount with zero render-blocking scripts.
- **Availability Beacon (`badge-status`):** Renders a pulsing green indicator (`{colors.status-approved}` in dark mode, `{colors.status-approved-light}` in light mode) alongside text indicating current job availability status.

### Metric Stat Card (`metric-stat-card`) — `[CAP-1], [CAP-2]`
- **Behavior:** Displays static, pre-rendered scale numbers (+500M, +$100B, +500 TPS) immediately.
- **Rule:** No progressive count-up counter animations. Numbers must be immediately legible to recruiters and evaluators who scan and leave within 30 seconds.

### Experience Card (`experience-card`) — `[CAP-2]`
- **Behavior:** Presents structured enterprise work history (Trustly B2B financial backoffice and Alelo B2C scale).
- **Interactivity:** Subtle 150ms border highlight on hover (`{colors.border-medium}`). Card headings link to verified corporate domains with `rel="noopener noreferrer"` and external link indicators. Bullet items emphasize verifiable scale metrics in bold monospace text.

### Antifraud Sandbox Widget (`antifraud-sandbox`) — `[CAP-3]`
- **Behavior:** 100% client-side reactive simulation.
- **Inputs:** 3 native range sliders:
  1. `Amount ($)`: Range 10 to 10,000, step 10, default 450.
  2. `Time Delta (min)`: Range 1 to 300, step 1, default 15.
  3. `Distance (km)`: Range 0 to 3,000, step 10, default 850.
- **Reactive Computation:** Every `input` event on any slider recalculates the risk formula in real time ($< 2\text{ms}$):
  - $P_{\text{velocity}} = \max(0, 50 \times (1 - \Delta t / 60))$ for $\Delta t < 60$, else $0$.
  - $v = \text{distance} / (\Delta t / 60)$. If $v > 800\text{ km/h}$, $P_{\text{geo}} = \min(50, 25 + (v - 800) / 40)$, else $0$.
  - $P_{\text{amount}} = \min(30, \text{amount} / 250)$.
  - $S = \min(100, \max(0, 0.8 \times (P_{\text{velocity}} + P_{\text{geo}} + P_{\text{amount}}) + 0.2 \times 10))$.
- **Visual Feedback (`badge-status`):**
  - $S < 40$: Badge displays `APPROVED` in `{colors.status-approved}` / `{colors.status-approved-light}`.
  - $40 \le S < 75$: Badge displays `FLAGGED / REVIEW` in `{colors.status-flagged}` / `{colors.status-flagged-light}`.
  - $S \ge 75$: Badge displays `REJECTED` in `{colors.status-rejected}` / `{colors.status-rejected-light}`.
  - Score progress meter dynamically updates width and background color to match the decision tier.

### Autonomous dotme Terminal (`dotme-terminal`) — `[CAP-4]`
- **Behavior:** Completely autonomous animated loop. **Zero visitor input or typing required.**
- **Animation Cycle:**
  1. *Typewriter Step (~1.2s):* Types `dotme sync --verbose` character-by-character into the active command line.
  2. *Scanning Step (~1.0s):* Emits manifest discovery and symlink graph validation output.
  3. *Reconciliation Step (~1.2s):* Emits symlink mapping confirmations (`~/.zshrc -> ~/.dotfiles/zsh/zshrc [OK]`) and zero-conflict affirmation.
  4. *Hold State (4.0s):* Freezes output so visitors can inspect the terminal logs.
  5. *Reset Step:* Clears terminal buffer cleanly and restarts from Step 1.
- **Inspection Pause:** Hovering over the terminal pauses the 4.0s hold timer to allow extended reading.

### Open Source Card (`opensource-card`) — `[CAP-5]`
- **Behavior:** Renders verified open-source contributions (MockK, dotme, n8n-docs, microbot).
- **Interactivity:** Entire card links directly to the specific merged pull request or repository on GitHub using `rel="noopener noreferrer"`. Hover triggers a 150ms border transition to `{colors.border-medium}`.

### Skills Layer Card (`skills-layer-card`) — `[CAP-6]`
- **Behavior:** 4 architectural categories displayed in a structured grid.
- **Accessibility:** Tag chips have clear semantic separation. No hover-hidden descriptions; all core keywords are visible for rapid scanning and ATS matching.

### Education Card (`education-card`) — `[CAP-7]`
- **Behavior:** Displays formal academic credentials. Both degrees explicitly show concluded status via a verified `CONCLUDED` badge (`{colors.status-approved}` / `{colors.status-approved-light}`).
- **Verification:** Includes direct links to institutional verification registries (USP/Esalq certification portal) opening in new tabs.

### Contact Section (`contact-section`) — `[CAP-8]`
- **Behavior:** Concluding high-conversion module. Features a prominent `mailto:` action with pre-structured subject and body parameters: `mailto:vinicius.r.silva@outlook.com?subject=Senior%20Engineering%20Opportunity&body=Hi%20Vinicius,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Senior/Staff%20Software%20Engineer%20role%20at...`.
- **Fallback:** Clicking a secondary "Copy Email" button copies `vinicius.r.silva@outlook.com` to the clipboard and shows a transient 2-second confirmation tooltip (`Email copied to clipboard`).

### CTA Buttons (`cta-button-primary` & `cta-button-secondary`) — `[CAP-1], [CAP-8]`
- **`cta-button-primary`:** Direct download trigger for the ATS CV PDF (`assets/Vinicius_Silva_Senior_Software_Engineer_CV.pdf`). Uses the HTML5 `download` attribute.
- **`cta-button-secondary`:** External navigation buttons (GitHub, LinkedIn) configured with `target="_blank"` and `rel="noopener noreferrer"`.

### Status Badges (`badge-status`) — `[CAP-1], [CAP-3], [CAP-7]`
- **Behavior:** Non-interactive status pill indicator. Used for the availability beacon, Antifraud risk outcome, and academic degree conclusion state. Renders distinct text and border/background combinations matching current theme and severity.

### Language & Theme Toggles (`language-theme-toggle`) — `[CAP-9]`
- **Language Toggle:** Tapping `EN` or `PT` updates all DOM nodes containing `data-i18n` attributes using preloaded JSON dictionaries from `translations.js`. Updates `document.documentElement.lang`. Persists selection to `localStorage.setItem('lang', '...')`.
- **Theme Toggle:** Tapping cycles between dark and light modes by toggling the `.light-theme` class on `document.body` and updating the theme icon. Persists selection to `localStorage.setItem('theme', '...')`.

---

## 5. State Patterns

| Surface / Component | State | User Treatment & UI Behavior | Source Capabilities |
|---|---|---|---|
| **Global Page** | Cold Load | Renders HTML shell immediately with critical CSS; applies theme preference prior to paint to prevent flash of unstyled content (FOUC). | `[CAP-1]` |
| **Global Page** | Offline | Content remains 100% accessible; static assets served from cache if loaded previously. | All |
| **Widgets** | No-JS / Degraded Script | If JavaScript is disabled or fails, render static fallback cards: Antifraud displays a pre-calculated heuristic card ($450, 15m, 850km $\rightarrow$ FLAGGED); dotme displays a static syntax-highlighted code block of `dotme sync --verbose`. | `[CAP-3], [CAP-4]` |
| **Antifraud Widget** | Default Resting | Pre-populated with realistic values ($450, 15 min, 850 km) yielding a `FLAGGED` state that invites user interaction. | `[CAP-3]` |
| **Antifraud Widget** | Slider Drag | Immediate reactive calculation on every input tick; updates numeric display, progress bar width, and decision tag synchronously ($<2\text{ms}$). | `[CAP-3]` |
| **dotme Terminal** | Active Typewriter | Displays blinking block cursor (`█`) moving rightward as characters are appended. | `[CAP-4]` |
| **dotme Terminal** | Hold Phase | Terminal text static; blinking cursor pulses; hover pauses the reset timer. | `[CAP-4]` |
| **Mobile Menu** | Closed | Hamburger icon visible; drawer hidden off-screen (`display: none` / `transform: translateY(-100%)`). | `[CAP-8], [CAP-9]` |
| **Mobile Menu** | Open | Full-screen or sliding drawer visible; background body scroll locked (`overflow: hidden`); pressing `Esc` closes menu. | `[CAP-8], [CAP-9]` |
| **Interactive Cards** | Hover / Focus-Visible | 150ms smooth transition to `{colors.border-medium}`; keyboard focus displays 2px solid `{colors.accent-primary}` ring. | All |
| **ATS CV CTA** | Click / Download | Direct download begins immediately. If network fails, prompt offers direct link to view resume in new tab. | `[CAP-1], [CAP-8]` |
| **Contact Action** | Mailto Trigger | Executes OS mail protocol. If unhandled, triggers clipboard copy fallback with confirmation toast. | `[CAP-8]` |

---

## 6. Interaction Primitives

- **Navigation:** Standard smooth scrolling for anchor links (`scroll-behavior: smooth`).
- **Sliders:** High-precision touch and drag handles with a minimum touch hit target of $44 \times 44\text{px}$ on mobile devices.
- **Copy / External Links:** External links (GitHub, LinkedIn, USP verification) open in a new tab with `rel="noopener noreferrer"`.
- **Banned Interactions:**
  - No modal popups or gatekeeper email capture walls.
  - No auto-playing sound or background video.
  - No animated scroll hijacking (native scroll physics must remain untouched).
  - No typing prompts demanding user input in the terminal widget.

---

## 7. Accessibility Floor

- **Color Contrast:** All text pairings against `{colors.surface-base}` / `{colors.surface-base-light}` and `{colors.surface-card}` / `{colors.surface-card-light}` strictly exceed WCAG AA minimums (contrast ratio $\ge 4.5:1$ for body text, $\ge 3.0:1$ for large headings and UI borders) in both dark and light modes.
- **Keyboard Navigation:** Every link, button, and slider element is reachable via `Tab` with a prominent visible focus ring (`outline: 2px solid {colors.accent-primary}; outline-offset: 2px`).
- **Screen Readers (ARIA):**
  - Section landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) with explicit `aria-label` attributes.
  - Antifraud result container uses `aria-live="polite"` so screen reader users are notified of score changes when adjusting sliders.
  - dotme typewriter terminal carries `aria-hidden="true"` with a hidden screen-reader summary paragraph describing the dotfiles manager tool, preventing repetitive auditory announcements during loop playback.
  - Mobile hamburger toggle uses `aria-expanded="false/true"` and `aria-controls="mobile-menu-drawer"`.

---

## 8. Key Flows

### Flow 1: High-Signal Technical Evaluation `[CAP-1], [CAP-2], [CAP-3], [CAP-8]`
- **Protagonist:** Alex, VP of Engineering at a US Scale-Up Fintech.
- **Step 1:** Alex opens the portfolio from a high-signal candidate submission. The page mounts immediately in dark mode. Within 5 seconds, Alex reads the headline: *Senior Software Engineer \| Backend & Distributed Systems* and notes the verified metrics: `+500M req/mo` and `+$100B volume` `[CAP-1]`.
- **Step 2:** Alex scrolls to `#experience`, reading the Trustly narrative: Spring Batch, financial reconciliation, reactive PDF/ZIP streaming, and multi-tenant backoffice scale `[CAP-2]`.
- **Step 3:** Alex scrolls to `#projects` and spots the Antifraud Sandbox. Alex drags the *Distance* slider to 1,500 km while leaving *Time Delta* at 10 minutes. The widget recalculates immediately to a travel velocity of 9,000 km/h, triggering a $P_{\text{geo}}$ penalty that pushes the total score to $S = 88$ (`REJECTED`) `[CAP-3]`.
- **Step 4 (Climax Beat):** Alex recognizes that the engineer did not just list keywords, but built a mathematically authentic distributed fraud heuristic right in the browser with zero external bloat. Alex clicks the `Download ATS CV` button in the sticky nav `[CAP-8]`.
- **Outcome:** Resume opens in under 1 second; Alex routes candidate directly to the Staff-level interview loop.
- **Failure Path & Recovery:** If the ATS PDF download fails due to an intermittent network error, a subtle inline recovery banner appears offering an alternative: *"Download interrupted — [Click here to view resume directly in browser]"*, ensuring the hiring manager is never blocked.

### Flow 2: Rapid Candidate Screening `[CAP-1], [CAP-7], [CAP-8], [CAP-9]`
- **Protagonist:** Samantha, Senior Technical Recruiter at an EU Scale-Up.
- **Step 1:** Samantha lands on the page via a LinkedIn referral. She immediately observes the pulsing green availability beacon: `Open to select senior/staff opportunities (Remote / Hybrid)` `[CAP-1]`.
- **Step 2:** Samantha prefers reading Portuguese summaries for regional alignment; she clicks `PT` in the navigation bar. The entire interface transitions instantly to Portuguese without a page reload or layout shift `[CAP-9]`.
- **Step 3:** Samantha scans down to `#education` and verifies the completed MBA at USP/Esalq (`Concluído`) and the CS degree at UNESP `[CAP-7]`.
- **Step 4 (Climax Beat):** Rather than navigating a complex portal or filling out a contact form, Samantha clicks the primary CTA `Download ATS CV (PDF)`. The clean, 2-page ATS-formatted PDF downloads instantly `[CAP-8]`.
- **Outcome:** Samantha clicks the direct email button, opening her mail client with a pre-filled template to propose an intro call.
- **Failure Path & Recovery:** If Samantha's operating system does not have a default email client registered for the `mailto:` link, the system detects protocol dismissal and automatically copies `vinicius.r.silva@outlook.com` to the clipboard with a 2-second confirmation toast: *"Email copied to clipboard for direct contact"*.

### Flow 3: Architectural Craft & Open-Source Verification `[CAP-4], [CAP-5], [CAP-6]`
- **Protagonist:** Marcus, Principal Engineer and Open Source Maintainer.
- **Step 1:** Marcus lands on the site seeking proof of deep systems knowledge and open-source hygiene.
- **Step 2:** Marcus navigates to `#opensource` and reviews the MockK v1.14.0 card. He clicks the external link directly to GitHub and validates the merged pull request fixing a hermetic verification leak in `confirmVerified` `[CAP-5]`.
- **Step 3:** Marcus scrolls to the `dotme` project card. He watches the autonomous typewriter loop cycle through manifest scanning, collision detection, and zero-conflict atomic symlinking. He hovers over the terminal to freeze the log and reviews the flag structure `[CAP-4]`.
- **Step 4:** Marcus inspects the 4-layer skills matrix, noting JVM internals (Java 21, virtual threads, Javalite), PostgreSQL lock tuning, and AI-augmented workflows (BMAD, MCP, multi-agent orchestration) `[CAP-6]`.
- **Step 5 (Climax Beat):** Marcus notes that the entire portfolio is written in clean, dependency-free vanilla JS with exceptional performance and semantic HTML markup.
- **Outcome:** Marcus leaves a glowing recommendation for the hiring committee: *"Strong Principal/Senior engineering craft. Verified open-source citizenship and rock-solid systems intuition."*
- **Failure Path & Recovery:** If Marcus opens the site with JavaScript disabled in developer mode, the static fallback architecture seamlessly displays pre-calculated Antifraud scorecards and a static terminal snippet, preserving 100% technical signal without broken UI elements.

---

## 9. Responsive & Platform

| Viewport Category | Width Range | Layout Behavior & Touch Accommodations |
|---|---|---|
| **Desktop** | $\ge 1024\text{px}$ | 3-column metric cards; 2-column interactive showcase (Antifraud and dotme side-by-side or stacked prominent cards); 4-column skills matrix; full horizontal sticky nav bar. |
| **Tablet** | $768\text{px} - 1023\text{px}$ | 2-column metric cards; full-width stacked project showcases; 2-column skills matrix; compact nav bar. |
| **Mobile** | $< 768\text{px}$ | 1-column stacked layout; hamburger navigation drawer; sliders enlarge touch bounds ($44\text{px}$ touch targets); dotme terminal enforces `overflow-x: auto` to eliminate viewport blowout; metric headlines downscale to $24\text{px}$. |

---

## 10. Inspiration & Anti-patterns

### Architectural Inspirations
- **Linear:** High information density balanced by disciplined negative space; subtle 1px border lighting (`{colors.border-subtle}` to `{colors.border-medium}`); instant keyboard accessibility.
- **Stripe:** Monospace metrics and data tables set against clean typographic hierarchy; neutral slate foundations; uncompromising microcopy precision.
- **Vercel:** Monochromatic canvas with dark-first developer appeal; terminal realism with authentic macOS status indicators.

### Anti-patterns & Explicit Rejects (Banned)
- **No Spinning Numbers / Count-up Animations:** Numbers must be immediately legible on cold page mount. Evaluators scanning for 15 seconds should never wait for an odometer animation.
- **No Gamified Skill Bars:** Banned visual patterns like "Java 90%" or arbitrary proficiency bars. The 4-layer skills matrix uses semantic taxonomy and verifiable keywords instead.
- **No Mandatory Gatekeeper Contact Forms:** No CAPTCHAs, no server-side PHP forms that break, and no email collection walls prior to CV download.
- **No Interactive Typing Demands in Terminal:** The dotme terminal widget is an autonomous demonstration loop. Evaluators are not asked to type commands or navigate mock shells.
- **No Degree Status Ambiguity:** No vague "studied at" or incomplete education states. Concluded academic degrees are explicitly flagged with `{colors.status-approved}` badges.
