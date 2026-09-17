import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { calculateRisk } from '../js/antifraud-calculator.js';

// Dynamic relative path resolution for portability across environments
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// 1. Audit I/O & Edge-Case Matrix Formula Logic using Production Engine
// Matrix Row 1: Default Initial State
const defaultRes = calculateRisk(450, 15, 850);
assert.equal(defaultRes.tier, 'flagged', 'Default state must be FLAGGED');
assert.equal(defaultRes.score, 73.4, 'Default state score must be 73.4');
console.log('✔ Matrix Row 1: Default Initial State PASS');

// Matrix Row 2: Low Risk Transaction
const lowRiskRes = calculateRisk(50, 120, 10);
assert.equal(lowRiskRes.tier, 'approved', 'Low risk must be APPROVED');
assert.ok(lowRiskRes.score < 40, 'Low risk score must be < 40');
console.log('✔ Matrix Row 2: Low Risk Transaction PASS');

// Matrix Row 3: Extreme Geo Jump
const extremeRes = calculateRisk(5000, 5, 2500);
assert.equal(extremeRes.tier, 'rejected', 'Extreme geo-jump must be REJECTED');
assert.ok(extremeRes.travelVelocity >= 30000, 'Velocity must be >= 30,000 km/h');
assert.ok(extremeRes.score >= 75, 'Score must be >= 75');
console.log('✔ Matrix Row 3: Extreme Geo Jump PASS');

// Matrix Row 4: Boundary & Clamping
const clampedMax = calculateRisk(10000, 1, 3000);
assert.equal(clampedMax.score, 100, 'Score must be clamped at 100');
assert.equal(clampedMax.tier, 'rejected');
console.log('✔ Matrix Row 4: Boundary & Clamping PASS');

// 2. Audit HTML Markup & Accessibility Attributes
const htmlContent = fs.readFileSync(path.join(projectRoot, 'components/projects.html'), 'utf-8');
assert.ok(htmlContent.includes('id="antifraud-amount"'), 'Amount slider must exist');
assert.ok(htmlContent.includes('id="antifraud-delta"'), 'Delta slider must exist');
assert.ok(htmlContent.includes('id="antifraud-distance"'), 'Distance slider must exist');

// Verify aria-labelledby referencing localized labels
assert.ok(htmlContent.includes('aria-labelledby="antifraud-amount-label"'), 'Amount slider must use aria-labelledby');
assert.ok(htmlContent.includes('aria-labelledby="antifraud-delta-label"'), 'Delta slider must use aria-labelledby');
assert.ok(htmlContent.includes('aria-labelledby="antifraud-distance-label"'), 'Distance slider must use aria-labelledby');

// Verify aria-valuetext and units on sliders
assert.ok(htmlContent.includes('aria-valuetext="$450.00"'), 'Amount slider must have aria-valuetext');
assert.ok(htmlContent.includes('aria-valuetext="15 min"'), 'Delta slider must have aria-valuetext');
assert.ok(htmlContent.includes('aria-valuetext="850 km"'), 'Distance slider must have aria-valuetext');

// Verify scoped aria-live on status badge and score
assert.ok(htmlContent.includes('id="antifraud-status-badge" aria-live="polite"'), 'Status badge must have scoped aria-live');
assert.ok(htmlContent.includes('id="antifraud-score-num" aria-live="polite"'), 'Score number must have scoped aria-live');

// Verify role="meter" on score bar
assert.ok(htmlContent.includes('id="antifraud-score-bar" role="meter"'), 'Score bar must have role="meter"');

// Verify semantic classes in projects.html (no arbitrary hex for status tokens)
assert.ok(htmlContent.includes('text-status-flagged-light dark:text-status-flagged'), 'Score number must use semantic status tokens');
assert.ok(htmlContent.includes('bg-status-flagged-light dark:bg-status-flagged'), 'Score bar must use semantic status tokens');
assert.ok(htmlContent.includes('border-status-flagged-border'), 'Status badge must use semantic border token');
console.log('✔ HTML Markup & Accessibility Audit PASS');

// 3. Audit Tailwind Semantic Color Registration in index.html
const indexContent = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
assert.ok(indexContent.includes("'status-flagged': '#F59E0B'"), 'status-flagged must be in index.html');
assert.ok(indexContent.includes("'status-flagged-light': '#B45309'"), 'status-flagged-light must be in index.html');
assert.ok(indexContent.includes("'status-rejected': '#EF4444'"), 'status-rejected must be in index.html');
assert.ok(indexContent.includes("'status-rejected-light': '#B91C1C'"), 'status-rejected-light must be in index.html');
assert.ok(indexContent.includes("'status-approved-border': '#059669'"), 'status-approved-border must be in index.html');
assert.ok(indexContent.includes("'status-flagged-border': '#D97706'"), 'status-flagged-border must be in index.html');
assert.ok(indexContent.includes("'status-rejected-border': '#DC2626'"), 'status-rejected-border must be in index.html');
console.log('✔ Tailwind Color Tokens Audit PASS');

// 4. Audit Translations Dictionary Parity using top-level await
const translationsPath = path.join(projectRoot, 'js/translations.js');
const translationsModule = await import(translationsPath);
const translations = translationsModule.default;

const requiredKeys = [
    // Restored about section keys
    'aboutMe',
    'aboutText1',
    'aboutText2',
    'aboutText3',

    // Projects & Antifraud section keys
    'projectsSectionIndex',
    'featuredProjects',
    'projectsSubtitle',
    'antifraudTitle',
    'antifraudSubtitle',
    'antifraudAmountLabel',
    'antifraudDeltaLabel',
    'antifraudDistanceLabel',
    'antifraudRiskIndex',
    'antifraudStatusApproved',
    'antifraudStatusFlagged',
    'antifraudStatusRejected',
    'antifraudTravelVelocity',
    'antifraudVelocityPenalty',
    'antifraudGeoPenalty',
    'antifraudAmountPenalty',
    'antifraudDampingRatio',
    'antifraudDampingVal',
    'antifraudSupersonicAlert',
    'antifraudImpossibleSpeedAlert',
    'antifraudNormalSpeed',
    'antifraudRepoLink'
];

for (const key of requiredKeys) {
    assert.ok(translations.en[key], `Missing en key: ${key}`);
    assert.ok(translations.pt[key], `Missing pt key: ${key}`);
}
console.log('✔ Bilingual Translation Parity PASS');
console.log('\nAll matrix rows and acceptance criteria verified successfully!');
