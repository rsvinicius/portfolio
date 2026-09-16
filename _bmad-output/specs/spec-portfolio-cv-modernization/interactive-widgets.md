# Interactive Widgets Specification

Detailed execution algorithms, mathematical heuristics, and UX behavior for interactive project demonstrations.

---

## 1. Antifraud Sandbox Widget (Financial Security Engine)

### 1.1. Purpose & Client-Side Architecture
Simulates a real-time risk assessment engine inside the project card. Runs entirely in vanilla JavaScript with no backend API calls.

### 1.2. Input Controls
- **Amount Slider / Field (`amount`):** Currency value ($10 to $10,000+).
- **Time Delta Slider / Field (`delta_t`):** Minutes elapsed since the user's preceding transaction (1 to 300 minutes).
- **Geographical Distance Slider / Field (`distance_km`):** Distance in kilometers from previous transaction location (0 to 3,000 km).
- **Action Trigger:** `Simulate Transaction` button (or dynamic reactive update on input change).

### 1.3. Evaluation Heuristics & Scoring Formulation
The engine computes a composite risk score ($S \in [0, 100]$):

1. **Velocity Check (60-minute Sliding Window):**
   - Improbable frequency penalty: $P_{\text{velocity}} = \max\left(0, 50 \times \left(1 - \frac{\Delta t}{60}\right)\right)$ for $\Delta t < 60$.
2. **Geographical Jump Penalty (Impossible Travel Velocity):**
   - Speed calculation: $v_{\text{travel}} = \frac{\text{distance\_km}}{(\Delta t / 60)}$.
   - Penalty: If $v_{\text{travel}} > 800 \text{ km/h}$, $P_{\text{geo}} = \min\left(50, 25 + \frac{v_{\text{travel}} - 800}{40}\right)$; otherwise $P_{\text{geo}} = 0$.
3. **Amount Deviation:**
   - Base penalty for large amounts: $P_{\text{amount}} = \min\left(30, \frac{\text{amount}}{250}\right)$.
4. **Exponential Damping Calibration (*Human-in-the-loop*):**
   - Damping factor: $\alpha = 0.8$ (historical baseline weight), $1 - \alpha = 0.2$ (human corrective adjustment).
   - Raw score: $S_{\text{raw}} = P_{\text{velocity}} + P_{\text{geo}} + P_{\text{amount}}$.
   - Calibrated score: $S = \min\left(100, \max\left(0, 0.8 \times S_{\text{raw}} + 0.2 \times \text{BaseHumanOffset}\right)\right)$ (default $\text{BaseHumanOffset} = 10$).

### 1.4. Visual State Output & Inspection Box
- **Status Badges:**
  - $S < 40$: `APPROVED` (Emerald Green `#10B981`)
  - $40 \le S < 75$: `FLAGGED / REVIEW` (Amber Yellow `#F59E0B`)
  - $S \ge 75$: `REJECTED` (Crimson Red `#EF4444`)
- **Inspection Metrics Display:**
  - Composite Risk Score: `0 - 100` numeric display with progress indicator.
  - Diagnostic breakdown: Velocity factor value, travel speed (km/h) + jump penalty, and active damping ratio (`0.8 / 0.2`).

---

## 2. dotme Autonomous Animated Loop Terminal

### 2.1. Purpose & Styling
Visualizes a live Unix terminal session demonstrating the `dotme` CLI tool.
- **Font:** `JetBrains Mono`, monospace.
- **Window Chrome:** Minimal macOS-style window header with red, yellow, and green status dots.
- **Color Palette:** Pure dark slate background (`#0d1117`), muted command prompts (`#58a6ff`), success tokens (`#3fb950`).

### 2.2. Autonomous Typewriter Loop Lifecycle
Zero visitor input required. Operates as an autonomous asynchronous cycle:

1. **Phase 1: Command Prompt Typing (Duration: ~1.2s)**
   - Typewriter typing simulation of: `dotme sync --verbose`.
2. **Phase 2: Execution & Atomic Checks (Duration: ~1.5s)**
   - Display: `[info] Scanning configuration manifest...`
   - Display: `[verify] Checking atomic symlink graph for collisions...`
3. **Phase 3: File Linking Outputs (Duration: ~1.0s)**
   - Display: `[link] ~/.zshrc -> ~/.dotfiles/zsh/zshrc [OK]`
   - Display: `[link] ~/.gitconfig -> ~/.dotfiles/git/gitconfig [OK]`
   - Display: `[success] 0 conflicts detected. State safely reconciled.`
4. **Phase 4: Hold & Reset (Duration: 4.0s)**
   - Terminal holds finalized output for 4 seconds.
   - Smoothly clears content and repeats from Phase 1.
