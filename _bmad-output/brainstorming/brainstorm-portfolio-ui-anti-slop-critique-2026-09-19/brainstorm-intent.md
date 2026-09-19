# Brainstorm Intent: Portfolio UI/UX Anti-Slop Refactoring

## 1. Executive Summary & Objective
Transform the portfolio by stripping away generic "AI UI slop" (superficial interactive showcases, fake terminal typewriter loops, slider simulators, and cognitive bloat) in favor of authentic, grounded mid-level backend engineering depth. The objective is to establish an immediate narrative rhythm, cut visual dead space, and showcase real engineering impact with clean, uniform components.

## 2. Key Architectural & UI Decisions

- **Unify Projects & Open Source Sections**:
  - Merge the disparate "Projects" and "Open Source" sections into a single, cohesive 3-card grid.
  - Curate exactly three high-impact highlights:
    1. **Antifraud System** (Backend API / Production System)
    2. **MockK** (Open Source Contribution)
    3. **dotme** (CLI Tool / Creator)
- **Adopt Clean Open-Source Card Archetype**:
  - Standardize all 3 showcase items using the existing clean open-source card pattern (problem-solution-impact summary, tech stack badges, direct GitHub/PR links).
  - Refactor Antifraud System into this card format to achieve visual and structural uniformity.
- **Decommission Superficial Interactive Widgets**:
  - Completely remove client-side interactive telemetry simulators, slider calculators, and fake terminal typewriter loops.
  - Eliminate duplicate entries (e.g. duplicate dotme representations) and purge associated JavaScript widget modules to accelerate load times.
- **Calibrate Vertical Rhythm & Section Spacing**:
  - Tighten cumulative excessive spacing (previously reaching 160–200px gaps) down to consistent `py-8` or `py-12` section padding to eliminate scroll fatigue.
- **Preserve Solid Foundations**:
  - Keep the **About** and **Skills** sections intact without modifications; their current calibration and balance are already aligned with target positioning.

## 3. Concrete Action Checklist / Implementation Tasks

- [ ] **Section Consolidation**:
  - [ ] Merge the markup/components of `Projects` and `Open Source` into a single unified showcase section.
  - [ ] Configure the grid layout for 3 uniform cards (Antifraud System, MockK, dotme).
- [ ] **Card Standardization**:
  - [ ] Apply the existing open-source card pattern to the Antifraud System entry.
  - [ ] Ensure all 3 cards consistently display problem-solution-impact summaries, tech stack tags, and direct repository/PR links.
- [ ] **Widget & Asset Decommissioning**:
  - [ ] Remove terminal simulator / typewriter loop scripts and components.
  - [ ] Remove slider calculators and interactive sandbox telemetry modules.
  - [ ] Clean up redundant assets, styles, and dead JS dependencies previously used by retired widgets.
- [ ] **Spacing & Padding Calibration**:
  - [ ] Audit vertical padding across all section wrappers (Hero, Experience, Showcase, etc.).
  - [ ] Normalize section vertical padding to `py-8` / `py-12` (avoiding cumulative stacking like `pb-16` + `py-24`).
- [ ] **Verification & Sanity Check**:
  - [ ] Verify that About and Skills sections remain untouched.
  - [ ] Validate responsive layout on mobile, tablet, and desktop breakpoints.
  - [ ] Check console and build bundle for zero missing imports or broken script references.
