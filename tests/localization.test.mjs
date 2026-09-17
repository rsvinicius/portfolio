import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Load translations module
const translationsModule = await import(path.join(projectRoot, 'js/translations.js'));
const translations = translationsModule.default;

// Load antifraud calculator
const calculatorModule = await import(path.join(projectRoot, 'js/antifraud-calculator.js'));
const calculateRisk = calculatorModule.calculateRisk;

// ---------------------------------------------------------------------------
// 1. Dictionary Key Parity Tests
// ---------------------------------------------------------------------------
test('100% dictionary key parity between English and Portuguese', () => {
    assert.ok(translations.en, 'translations.en must exist');
    assert.ok(translations.pt, 'translations.pt must exist');

    const enKeys = Object.keys(translations.en).sort();
    const ptKeys = Object.keys(translations.pt).sort();

    assert.equal(
        enKeys.length,
        ptKeys.length,
        `Dictionary key counts must be symmetric (EN: ${enKeys.length}, PT: ${ptKeys.length})`
    );

    const missingInPt = enKeys.filter(k => !translations.pt[k]);
    const missingInEn = ptKeys.filter(k => !translations.en[k]);

    assert.deepEqual(missingInPt, [], `Keys present in EN but missing or empty in PT: ${missingInPt.join(', ')}`);
    assert.deepEqual(missingInEn, [], `Keys present in PT but missing or empty in EN: ${missingInEn.join(', ')}`);

    // Verify all keys are non-empty strings and have no raw token leaks
    for (const key of enKeys) {
        const enVal = translations.en[key];
        const ptVal = translations.pt[key];

        assert.equal(typeof enVal, 'string', `en.${key} must be a string`);
        assert.equal(typeof ptVal, 'string', `pt.${key} must be a string`);
        assert.ok(enVal.trim().length > 0, `en.${key} must not be empty`);
        assert.ok(ptVal.trim().length > 0, `pt.${key} must not be empty`);

        // Check for raw token leaks or placeholder syntax
        assert.ok(!enVal.includes('[missing key]'), `en.${key} contains [missing key]`);
        assert.ok(!ptVal.includes('[missing key]'), `pt.${key} contains [missing key]`);
        assert.ok(!enVal.includes('{{'), `en.${key} contains unrendered mustache token`);
        assert.ok(!ptVal.includes('{{'), `pt.${key} contains unrendered mustache token`);
    }
});

// ---------------------------------------------------------------------------
// 2. HTML Markup Coverage Tests
// ---------------------------------------------------------------------------
test('all HTML data-i18n and data-i18n-placeholder references exist in dictionaries', () => {
    const htmlFiles = [
        'index.html',
        'components/header.html',
        'components/hero.html',
        'components/experience.html',
        'components/projects.html',
        'components/opensource.html',
        'components/skills.html',
        'components/education.html',
        'components/contact.html',
        'components/footer.html',
        'components/about.html'
    ];

    const referencedI18nKeys = new Set();
    const referencedPlaceholderKeys = new Set();
    const referencedAriaKeys = new Set();

    for (const relPath of htmlFiles) {
        const absPath = path.join(projectRoot, relPath);
        if (!fs.existsSync(absPath)) continue;

        const content = fs.readFileSync(absPath, 'utf-8');

        // Match data-i18n="..."
        for (const match of content.matchAll(/data-i18n=["']([^"']+)["']/g)) {
            referencedI18nKeys.add({ key: match[1], file: relPath });
        }

        // Match data-i18n-placeholder="..."
        for (const match of content.matchAll(/data-i18n-placeholder=["']([^"']+)["']/g)) {
            referencedPlaceholderKeys.add({ key: match[1], file: relPath });
        }

        // Match data-i18n-aria-label="..."
        for (const match of content.matchAll(/data-i18n-aria-label=["']([^"']+)["']/g)) {
            referencedAriaKeys.add({ key: match[1], file: relPath });
        }
    }

    assert.ok(referencedI18nKeys.size > 0, 'Must have found data-i18n references in HTML files');

    for (const { key, file } of referencedI18nKeys) {
        assert.ok(
            translations.en[key] !== undefined,
            `Orphaned data-i18n="${key}" found in ${file} - missing in translations.en`
        );
        assert.ok(
            translations.pt[key] !== undefined,
            `Orphaned data-i18n="${key}" found in ${file} - missing in translations.pt`
        );
    }

    for (const { key, file } of referencedPlaceholderKeys) {
        assert.ok(
            translations.en[key] !== undefined,
            `Orphaned data-i18n-placeholder="${key}" found in ${file} - missing in translations.en`
        );
        assert.ok(
            translations.pt[key] !== undefined,
            `Orphaned data-i18n-placeholder="${key}" found in ${file} - missing in translations.pt`
        );
    }

    for (const { key, file } of referencedAriaKeys) {
        assert.ok(
            translations.en[key] !== undefined,
            `Orphaned data-i18n-aria-label="${key}" found in ${file} - missing in translations.en`
        );
        assert.ok(
            translations.pt[key] !== undefined,
            `Orphaned data-i18n-aria-label="${key}" found in ${file} - missing in translations.pt`
        );
    }
});

// ---------------------------------------------------------------------------
// 3. Dynamic Script Keys Coverage Tests
// ---------------------------------------------------------------------------
test('dynamic script keys and Antifraud decision badges adhere to spec', () => {
    // Dynamic Antifraud decision badges per story spec lines 30, 45, 70:
    // APPROVED / APROVADO, FLAGGED / SINALIZADO, REJECTED / REJEITADO
    assert.equal(translations.en.antifraudStatusApproved, 'APPROVED');
    assert.equal(translations.pt.antifraudStatusApproved, 'APROVADO');

    assert.ok(
        translations.en.antifraudStatusFlagged === 'FLAGGED / REVIEW' ||
        translations.en.antifraudStatusFlagged === 'FLAGGED',
        `en.antifraudStatusFlagged must be FLAGGED / REVIEW or FLAGGED, got ${translations.en.antifraudStatusFlagged}`
    );
    assert.equal(translations.pt.antifraudStatusFlagged, 'SINALIZADO');

    assert.equal(translations.en.antifraudStatusRejected, 'REJECTED');
    assert.equal(translations.pt.antifraudStatusRejected, 'REJEITADO');

    // Dynamic velocity alerts
    assert.equal(translations.en.antifraudSupersonicAlert, 'Supersonic Geo-Jump');
    assert.equal(translations.pt.antifraudSupersonicAlert, 'Salto Geográfico Supersônico');
    assert.equal(translations.en.antifraudImpossibleSpeedAlert, 'High Speed Geo-Jump');
    assert.equal(translations.pt.antifraudImpossibleSpeedAlert, 'Salto em Alta Velocidade');
    assert.equal(translations.en.antifraudNormalSpeed, 'Normal Transit');
    assert.equal(translations.pt.antifraudNormalSpeed, 'Trânsito Normal');

    // Dynamic contact mailto strings
    assert.equal(translations.en.contactEmailSubject, 'Software Engineering Opportunity - Vinicius Rodrigues Silva');
    assert.equal(translations.pt.contactEmailSubject, 'Oportunidade Engenharia de Software - Vinicius Rodrigues Silva');
    assert.ok(translations.en.contactEmailBody.includes('Hi Vinicius'));
    assert.ok(translations.pt.contactEmailBody.includes('Olá Vinicius'));

    // Language switcher labels
    assert.equal(translations.en.switchToEnglish, 'EN');
    assert.equal(translations.en.switchToPortuguese, 'PT');
    assert.equal(translations.pt.switchToEnglish, 'EN');
    assert.equal(translations.pt.switchToPortuguese, 'PT');
    assert.ok(translations.en.switchToPortugueseAria);
    assert.ok(translations.pt.switchToEnglishAria);
});

// ---------------------------------------------------------------------------
// 4. Mock DOM Harness & Simulated Runtime Translation
// ---------------------------------------------------------------------------

class MockDOMNode {
    constructor(tagName = 'div', id = '') {
        this.tagName = tagName.toUpperCase();
        this.id = id;
        this.attributes = new Map();
        this.textContent = '';
        this.innerHTML = '';
        this.placeholder = '';
        this.children = [];
        this.style = {};
        const classes = new Set();
        this.classList = {
            add: (...cls) => cls.forEach(c => classes.add(c)),
            remove: (...cls) => cls.forEach(c => classes.delete(c)),
            contains: (c) => classes.has(c),
            toggle: (c) => classes.has(c) ? classes.delete(c) : classes.add(c)
        };
        this.eventListeners = {};
    }

    setAttribute(name, value) {
        this.attributes.set(name, String(value));
        if (name === 'id') this.id = String(value);
        if (name === 'placeholder') this.placeholder = String(value);
    }

    getAttribute(name) {
        return this.attributes.get(name) || null;
    }

    removeAttribute(name) {
        this.attributes.delete(name);
    }

    addEventListener(event, handler) {
        if (!this.eventListeners[event]) this.eventListeners[event] = [];
        this.eventListeners[event].push(handler);
    }

    dispatchEvent(event) {
        const type = typeof event === 'string' ? event : event.type;
        if (this.eventListeners[type]) {
            this.eventListeners[type].forEach(fn => fn(event));
        }
    }

    appendChild(child) {
        this.children.push(child);
    }
}

function createLocalizationHarness(initialLocalStorage = {}) {
    const store = { ...initialLocalStorage };
    const localStorageMock = {
        getItem: (k) => store[k] !== undefined ? store[k] : null,
        setItem: (k, v) => { store[k] = String(v); },
        removeItem: (k) => { delete store[k]; },
        clear: () => { for (const k in store) delete store[k]; }
    };

    const documentElement = new MockDOMNode('html');
    documentElement.lang = 'en';

    const allNodes = [];

    function registerNode(node) {
        allNodes.push(node);
        return node;
    }

    const elementsById = {};

    function addElement(id, tagName = 'div', attrs = {}, initialText = '') {
        const node = new MockDOMNode(tagName, id);
        node.id = id;
        elementsById[id] = node;
        for (const [k, v] of Object.entries(attrs)) {
            node.setAttribute(k, v);
        }
        if (initialText) {
            node.textContent = initialText;
            node.innerHTML = initialText;
        }
        registerNode(node);
        return node;
    }

    // Build mock DOM elements matching production components
    const langToggle = addElement('language-toggle', 'button', {
        'aria-label': 'Switch language to Portuguese'
    }, 'PT');

    const mobileLangToggle = addElement('mobile-language-toggle', 'button', {
        'aria-label': 'Switch language to Portuguese'
    }, 'PT');

    // Navigation links
    addElement('nav-exp', 'a', { 'data-i18n': 'experience', href: '#experience' }, 'Experience');
    addElement('nav-proj', 'a', { 'data-i18n': 'projects', href: '#projects' }, 'Projects');
    addElement('nav-open', 'a', { 'data-i18n': 'opensource', href: '#opensource' }, 'Open Source');

    // Hero section elements
    addElement('hero-role', 'h2', { 'data-i18n': 'heroRole' }, 'Software Engineer • Backend');
    addElement('hero-beacon', 'span', { 'data-i18n': 'availabilityBeacon' }, 'Open to remote opportunities');
    addElement('hero-cv', 'span', { 'data-i18n': 'downloadCv' }, 'Download ATS CV (PDF)');

    // Experience elements with HTML markup
    addElement('trustly-bullet-1', 'span', { 'data-i18n': 'trustlyBullet1' },
        'Architected and maintained high-criticality B2B merchant billing and financial settlement pipelines handling <strong class="font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]">+500 TPS</strong> and multi-billion-dollar transaction volume with zero ledger discrepancy.'
    );

    // Open source category badges
    addElement('mockk-cat', 'span', { 'data-i18n': 'mockkCategory' }, 'Testing Library');
    addElement('dotme-cat', 'span', { 'data-i18n': 'dotmeCategory' }, 'CLI Tool');

    // Antifraud Sandbox elements
    const amountSlider = addElement('antifraud-amount', 'input', {
        type: 'range',
        min: '10',
        max: '10000',
        step: '10',
        value: '450',
        'aria-valuetext': '$450.00'
    });
    amountSlider.value = '450';

    const deltaSlider = addElement('antifraud-delta', 'input', {
        type: 'range',
        min: '1',
        max: '300',
        step: '1',
        value: '15',
        'aria-valuetext': '15 min'
    });
    deltaSlider.value = '15';

    const distanceSlider = addElement('antifraud-distance', 'input', {
        type: 'range',
        min: '0',
        max: '3000',
        step: '10',
        value: '850',
        'aria-valuetext': '850 km'
    });
    distanceSlider.value = '850';

    const amountVal = addElement('antifraud-amount-val', 'span', {}, '$450.00');
    const deltaVal = addElement('antifraud-delta-val', 'span', {}, '15 min');
    const distanceVal = addElement('antifraud-distance-val', 'span', {}, '850 km');

    const scoreNum = addElement('antifraud-score-num', 'span', {}, '73.4');
    const scoreBar = addElement('antifraud-score-bar', 'div', {
        role: 'meter',
        'aria-valuenow': '73.4',
        'aria-valuetext': '73.4 / 100'
    });
    const statusBadge = addElement('antifraud-status-badge', 'div', {
        'data-i18n': 'antifraudStatusFlagged'
    }, 'FLAGGED / REVIEW');

    const velocityVal = addElement('antifraud-velocity-val', 'span', {}, '3,400 km/h (Supersonic Geo-Jump)');
    const pvelVal = addElement('antifraud-pvel-val', 'span', {}, '37.5 / 50');
    const pgeoVal = addElement('antifraud-pgeo-val', 'span', {}, '50.0 / 50');
    const pamountVal = addElement('antifraud-pamount-val', 'span', {}, '1.8 / 30');

    // Mailto link
    const mailtoLink = addElement('hero-mailto', 'a', {
        href: 'mailto:vrodrigues.code@gmail.com?subject=Software%20Engineering%20Opportunity%20-%20Vinicius%20Rodrigues%20Silva&body=Hi%20Vinicius,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Software%20Engineer%20role%20at...'
    });

    const documentMock = {
        documentElement,
        getElementById: (id) => elementsById[id] || null,
        addEventListener: () => {},
        removeEventListener: () => {},
        querySelector: (selector) => {
            if (selector.startsWith('#')) {
                const id = selector.slice(1);
                return elementsById[id] || null;
            }
            return null;
        },
        createElement: (tag) => new MockDOMNode(tag),
        querySelectorAll: (selector) => {
            if (selector === '[data-i18n]') {
                return allNodes.filter(n => n.getAttribute('data-i18n') !== null);
            }
            if (selector === '[data-i18n-placeholder]') {
                return allNodes.filter(n => n.getAttribute('data-i18n-placeholder') !== null);
            }
            if (selector === '[data-i18n-aria-label]') {
                return allNodes.filter(n => n.getAttribute('data-i18n-aria-label') !== null);
            }
            if (selector.startsWith('a[href^="mailto:vrodrigues.code@gmail.com"]')) {
                return allNodes.filter(n => n.tagName === 'A' && (n.getAttribute('href') || '').startsWith('mailto:vrodrigues.code@gmail.com'));
            }
            return [];
        }
    };

    let reloadsTriggered = 0;
    const windowMock = {
        localStorage: localStorageMock,
        location: {
            reload: () => { reloadsTriggered++; }
        },
        updateAntifraudSandbox: null,
        initializeLanguageToggle: null,
        updateLanguage: null,
        updateMailtoLinks: null,
        updateToggleText: null
    };

    // Load production functions from js/script.js into our mock sandbox
    const scriptContent = fs.readFileSync(path.join(projectRoot, 'js/script.js'), 'utf-8');

    // Extract initializeLanguageToggle, updateLanguage, updateMailtoLinks, updateToggleText, initializeAntifraudSandbox
    const runner = new Function(
        'window', 'document', 'localStorage', 'calculateRiskModule',
        `
        ${scriptContent}
        return {
            initializeLanguageToggle,
            updateLanguage,
            updateMailtoLinks,
            updateToggleText,
            initializeAntifraudSandbox
        };
        `
    );

    const fns = runner(windowMock, documentMock, localStorageMock, { calculateRisk });

    return {
        store,
        documentMock,
        windowMock,
        elementsById,
        allNodes,
        fns,
        getReloadsTriggered: () => reloadsTriggered
    };
}

// ---------------------------------------------------------------------------
// 5. Simulated Runtime Tests
// ---------------------------------------------------------------------------

test('Cold Load: initializes to English by default when no preference in localStorage', () => {
    const harness = createLocalizationHarness();
    assert.equal(harness.store.language, undefined, 'Initial localStorage has no language');

    // Initialize
    harness.fns.initializeLanguageToggle(translations);

    assert.equal(harness.documentMock.documentElement.lang, 'en', 'Cold load lang must be "en"');
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experience');
    assert.equal(harness.elementsById['hero-role'].textContent, 'Software Engineer • Backend');
    assert.equal(harness.elementsById['language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['language-toggle'].getAttribute('aria-label'), 'Switch language to Portuguese');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['mobile-language-toggle'].getAttribute('aria-label'), 'Switch language to Portuguese');

    // Mailto link is in English
    const href = harness.elementsById['hero-mailto'].getAttribute('href');
    assert.ok(href.includes('Software%20Engineering%20Opportunity'));
    assert.ok(href.includes('Hi%20Vinicius'));
});

test('Language Toggle to PT updates DOM in <50ms without page reload', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);

    const startTime = performance.now();

    // Trigger click on language-toggle button
    harness.elementsById['language-toggle'].dispatchEvent('click');

    const duration = performance.now() - startTime;
    assert.ok(duration < 50, `Language toggle must complete in <50ms, took ${duration.toFixed(2)}ms`);

    // Verify zero page reloads
    assert.equal(harness.getReloadsTriggered(), 0, 'Language toggle must NEVER trigger page reload');

    // Verify document language and localStorage persistence
    assert.equal(harness.documentMock.documentElement.lang, 'pt', 'Document lang must update to "pt"');
    assert.equal(harness.store.language, 'pt', 'Preference must be saved to localStorage as "pt"');

    // Verify DOM updates in-place
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experiência');
    assert.equal(harness.elementsById['hero-role'].textContent, 'Engenheiro de Software • Backend');
    assert.equal(harness.elementsById['hero-beacon'].textContent, 'Disponível para oportunidades remotas');
    assert.equal(harness.elementsById['hero-cv'].textContent, 'Baixar CV ATS (PDF)');
    assert.equal(harness.elementsById['mockk-cat'].textContent, 'Biblioteca de Testes');
    assert.equal(harness.elementsById['dotme-cat'].textContent, 'Ferramenta CLI');

    // Verify both desktop and mobile buttons switch indicator to EN
    assert.equal(harness.elementsById['language-toggle'].textContent, 'EN');
    assert.equal(harness.elementsById['language-toggle'].getAttribute('aria-label'), 'Mudar idioma para inglês');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'EN');
    assert.equal(harness.elementsById['mobile-language-toggle'].getAttribute('aria-label'), 'Mudar idioma para inglês');

    // Verify mailto URI adapted to Portuguese
    const href = harness.elementsById['hero-mailto'].getAttribute('href');
    assert.ok(
        href.includes('Oportunidade%20Engenharia%20de%20Software%20-%20Vinicius%20Rodrigues%20Silva'),
        'Mailto must contain localized Portuguese subject'
    );
    assert.ok(href.includes('Ol%C3%A1%20Vinicius'), 'Mailto must contain localized Portuguese body');
});

test('Mobile language toggle button click interaction switches language seamlessly', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);

    assert.equal(harness.documentMock.documentElement.lang, 'en');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'PT');

    // Dispatch click on mobile-language-toggle
    harness.elementsById['mobile-language-toggle'].dispatchEvent('click');

    assert.equal(harness.documentMock.documentElement.lang, 'pt');
    assert.equal(harness.store.language, 'pt');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'EN');
    assert.equal(harness.elementsById['language-toggle'].textContent, 'EN');
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experiência');

    // Dispatch click again to toggle back to English
    harness.elementsById['mobile-language-toggle'].dispatchEvent('click');

    assert.equal(harness.documentMock.documentElement.lang, 'en');
    assert.equal(harness.store.language, 'en');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experience');
});

test('Fallback and sanitization: handles localStorage.getItem("lang") and invalid languages', () => {
    // 1. Fallback to localStorage.getItem('lang') when language key is absent
    const harnessLang = createLocalizationHarness({ lang: 'pt' });
    harnessLang.fns.initializeLanguageToggle(translations);
    assert.equal(harnessLang.documentMock.documentElement.lang, 'pt', 'Must initialize to "pt" when lang="pt" in localStorage');
    assert.equal(harnessLang.elementsById['nav-exp'].textContent, 'Experiência');
    assert.equal(harnessLang.elementsById['language-toggle'].textContent, 'EN');

    // 2. Unsanitized/invalid language in localStorage falls back safely to "en"
    const harnessInvalid = createLocalizationHarness({ language: 'fr-FR', lang: 'de' });
    harnessInvalid.fns.initializeLanguageToggle(translations);
    assert.equal(harnessInvalid.documentMock.documentElement.lang, 'en', 'Invalid language must safely fall back to "en"');
    assert.equal(harnessInvalid.elementsById['nav-exp'].textContent, 'Experience');
    assert.equal(harnessInvalid.elementsById['language-toggle'].textContent, 'PT');
});

test('Global window exports are verified', () => {
    const harness = createLocalizationHarness();
    assert.equal(typeof harness.windowMock.initializeLanguageToggle, 'function', 'window.initializeLanguageToggle must be exported');
    assert.equal(typeof harness.windowMock.updateLanguage, 'function', 'window.updateLanguage must be exported');
    assert.equal(typeof harness.windowMock.updateMailtoLinks, 'function', 'window.updateMailtoLinks must be exported');
    assert.equal(typeof harness.windowMock.updateToggleText, 'function', 'window.updateToggleText must be exported');
    assert.equal(typeof harness.windowMock.initializeDotmeTerminal, 'function', 'window.initializeDotmeTerminal must be exported');
});

test('Language Toggle from PT back to EN reverts all copy cleanly', () => {
    const harness = createLocalizationHarness({ language: 'pt' });
    harness.fns.initializeLanguageToggle(translations);

    assert.equal(harness.documentMock.documentElement.lang, 'pt');
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experiência');
    assert.equal(harness.elementsById['language-toggle'].textContent, 'EN');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'EN');

    // User clicks EN button
    harness.elementsById['language-toggle'].dispatchEvent('click');

    assert.equal(harness.documentMock.documentElement.lang, 'en');
    assert.equal(harness.store.language, 'en');
    assert.equal(harness.elementsById['nav-exp'].textContent, 'Experience');
    assert.equal(harness.elementsById['hero-role'].textContent, 'Software Engineer • Backend');
    assert.equal(harness.elementsById['language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['language-toggle'].getAttribute('aria-label'), 'Switch language to Portuguese');
    assert.equal(harness.elementsById['mobile-language-toggle'].textContent, 'PT');
    assert.equal(harness.elementsById['mobile-language-toggle'].getAttribute('aria-label'), 'Switch language to Portuguese');

    const href = harness.elementsById['hero-mailto'].getAttribute('href');
    assert.ok(href.includes('Software%20Engineering%20Opportunity%20-%20Vinicius%20Rodrigues%20Silva'));
});

test('Antifraud sandbox simulation displays localized badges and velocity alerts in PT', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);
    harness.fns.initializeAntifraudSandbox(translations, calculateRisk);

    // Switch to Portuguese
    harness.elementsById['language-toggle'].dispatchEvent('click');
    assert.equal(harness.documentMock.documentElement.lang, 'pt');

    // Initial default state: 450, 15, 850 -> FLAGGED tier
    // In PT mode, must display "SINALIZADO"
    assert.equal(
        harness.elementsById['antifraud-status-badge'].textContent,
        'SINALIZADO',
        'Default initial state in PT mode must display "SINALIZADO"'
    );
    assert.ok(
        harness.elementsById['antifraud-velocity-val'].textContent.includes('Salto Geográfico Supersônico'),
        'Supersonic velocity must be translated in PT'
    );

    // Test Scenario A: Low risk -> APPROVED -> "APROVADO" in PT
    harness.elementsById['antifraud-amount'].value = '50';
    harness.elementsById['antifraud-delta'].value = '120';
    harness.elementsById['antifraud-distance'].value = '10';
    harness.elementsById['antifraud-amount'].dispatchEvent('input');

    assert.equal(
        harness.elementsById['antifraud-status-badge'].textContent,
        'APROVADO',
        'Low-risk simulation in PT mode must display "APROVADO"'
    );
    assert.ok(
        harness.elementsById['antifraud-velocity-val'].textContent.includes('Trânsito Normal'),
        'Normal speed transit must be translated in PT'
    );

    // Test Scenario B: High speed jump (e.g. 900 km/h) -> "Salto em Alta Velocidade"
    harness.elementsById['antifraud-amount'].value = '100';
    harness.elementsById['antifraud-delta'].value = '60';
    harness.elementsById['antifraud-distance'].value = '900'; // 900 km/h
    harness.elementsById['antifraud-amount'].dispatchEvent('input');

    assert.ok(
        harness.elementsById['antifraud-velocity-val'].textContent.includes('Salto em Alta Velocidade'),
        'High speed jump must display "Salto em Alta Velocidade" in PT'
    );

    // Test Scenario C: Extreme risk -> REJECTED -> "REJEITADO" in PT
    harness.elementsById['antifraud-amount'].value = '8000';
    harness.elementsById['antifraud-delta'].value = '5';
    harness.elementsById['antifraud-distance'].value = '2500';
    harness.elementsById['antifraud-amount'].dispatchEvent('input');

    assert.equal(
        harness.elementsById['antifraud-status-badge'].textContent,
        'REJEITADO',
        'Extreme risk simulation in PT mode must display "REJEITADO"'
    );
});

test('HTML strings update via innerHTML preserving strong tags, plain text via textContent', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);

    // Switch to PT
    harness.elementsById['language-toggle'].dispatchEvent('click');

    const trustlyElem = harness.elementsById['trustly-bullet-1'];
    assert.ok(
        trustlyElem.innerHTML.includes('<strong class="font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]">+500 TPS</strong>'),
        'HTML markup must be preserved via innerHTML when string contains HTML tags'
    );
    assert.ok(
        trustlyElem.innerHTML.includes('Engenharia e sustentação de pipelines de faturamento B2B'),
        'Portuguese text must be rendered inside HTML-preserving node'
    );
});
