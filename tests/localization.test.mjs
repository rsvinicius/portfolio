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
// 3. Dynamic Script Keys & Section Index Coverage Tests
// ---------------------------------------------------------------------------
test('dynamic script keys and section indices adhere to spec', () => {
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

    // Section indices
    assert.equal(translations.en.experienceSectionIndex, '01. EXPERIENCE');
    assert.equal(translations.pt.experienceSectionIndex, '01. EXPERIÊNCIA');
    assert.equal(translations.en.projectsSectionIndex, '02. PROJECTS');
    assert.equal(translations.pt.projectsSectionIndex, '02. PROJETOS');
    assert.equal(translations.en.skillsSectionIndex, '03. SKILLS');
    assert.equal(translations.pt.skillsSectionIndex, '03. HABILIDADES');
    assert.equal(translations.en.educationSectionIndex, '04. EDUCATION');
    assert.equal(translations.pt.educationSectionIndex, '04. FORMAÇÃO');
    assert.equal(translations.en.contactSectionIndex, '05. CONTACT');
    assert.equal(translations.pt.contactSectionIndex, '05. CONTATO');

    // Section title
    assert.equal(translations.en.featuredProjects, 'Featured Projects');
    assert.equal(translations.pt.featuredProjects, 'Projetos em Destaque');
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

    hasAttribute(name) {
        return this.attributes.has(name);
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

    // Hero section elements
    addElement('hero-role', 'h2', { 'data-i18n': 'heroRole' }, 'Software Engineer • Backend');
    addElement('hero-beacon', 'span', { 'data-i18n': 'availabilityBeacon' }, 'Open to remote opportunities');
    addElement('hero-cv', 'span', { 'data-i18n': 'downloadCv' }, 'Download ATS CV (PDF)');

    // Experience elements with HTML markup
    addElement('trustly-bullet-1', 'span', { 'data-i18n': 'trustlyBullet1' },
        'Engineered and maintained B2B merchant billing and financial settlement pipelines processing multi-billion-dollar transaction volume (<strong class="font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]">+$100B</strong>), ensuring financial data integrity through automated reconciliation and robust batch execution.'
    );

    // Unified Project showcase cards elements
    addElement('antifraud-role', 'span', { 'data-i18n': 'antifraudRole' }, 'Production System');
    addElement('antifraud-cat', 'span', { 'data-i18n': 'antifraudCategory' }, 'Backend Security');
    addElement('antifraud-title', 'h3', { 'data-i18n': 'antifraudTitle' }, 'Antifraud System');

    addElement('mockk-role', 'span', { 'data-i18n': 'mockkRole' }, 'Contributor');
    addElement('mockk-cat', 'span', { 'data-i18n': 'mockkCategory' }, 'Testing Library');
    addElement('mockk-title', 'h3', { 'data-i18n': 'mockkTitle' }, 'MockK');

    addElement('dotme-role', 'span', { 'data-i18n': 'dotmeRole' }, 'Creator & Maintainer');
    addElement('dotme-cat', 'span', { 'data-i18n': 'dotmeCategory' }, 'Developer CLI');
    addElement('dotme-title', 'h3', { 'data-i18n': 'dotmeTitle' }, 'dotme');

    // Mailto link
    const mailtoLink = addElement('hero-mailto', 'a', {
        href: 'mailto:vrodrigues.code@gmail.com?subject=Software%20Engineering%20Opportunity%20-%20Vinicius%20Rodrigues%20Silva&body=Hi%20Vinicius,%0D%0A%0D%0AI%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20Software%20Engineer%20role%20at...'
    });

    // CV Download link
    const cvLink = addElement('hero-cv-link', 'a', {
        href: 'assets/Vinicius_Silva_CV_EN.pdf',
        download: 'Vinicius_Silva_CV_EN.pdf'
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
            if (selector.includes('Vinicius_Silva_CV_')) {
                return allNodes.filter(n => n.tagName === 'A' && (n.getAttribute('href') || '').includes('Vinicius_Silva_CV_'));
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
        initializeLanguageToggle: null,
        updateLanguage: null,
        updateMailtoLinks: null,
        updateCvLinks: null,
        updateToggleText: null
    };

    // Load production functions from js/script.js into our mock sandbox
    const scriptContent = fs.readFileSync(path.join(projectRoot, 'js/script.js'), 'utf-8');

    // Extract initializeLanguageToggle, updateLanguage, updateMailtoLinks, updateCvLinks, updateToggleText
    const runner = new Function(
        'window', 'document', 'localStorage',
        `
        ${scriptContent}
        return {
            initializeLanguageToggle,
            updateLanguage,
            updateMailtoLinks,
            updateCvLinks,
            updateToggleText
        };
        `
    );

    const fns = runner(windowMock, documentMock, localStorageMock);

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

    // CV link is in English
    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('href'), 'assets/Vinicius_Silva_CV_EN.pdf');
    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('download'), 'Vinicius_Silva_CV_EN.pdf');
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
    assert.equal(harness.elementsById['antifraud-cat'].textContent, 'Segurança Backend');
    assert.equal(harness.elementsById['antifraud-role'].textContent, 'Em Produção');

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

    // Verify CV download link adapted to Portuguese
    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('href'), 'assets/Vinicius_Silva_CV_PT.pdf');
    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('download'), 'Vinicius_Silva_CV_PT.pdf');
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
    assert.equal(typeof harness.windowMock.updateCvLinks, 'function', 'window.updateCvLinks must be exported');
    assert.equal(typeof harness.windowMock.updateToggleText, 'function', 'window.updateToggleText must be exported');
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

    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('href'), 'assets/Vinicius_Silva_CV_EN.pdf');
    assert.equal(harness.elementsById['hero-cv-link'].getAttribute('download'), 'Vinicius_Silva_CV_EN.pdf');

    const href = harness.elementsById['hero-mailto'].getAttribute('href');
    assert.ok(href.includes('Software%20Engineering%20Opportunity%20-%20Vinicius%20Rodrigues%20Silva'));
});

test('Unified showcase cards localize cleanly between EN and PT', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);

    // Initial state is EN
    assert.equal(harness.elementsById['antifraud-role'].textContent, 'Production System');
    assert.equal(harness.elementsById['antifraud-cat'].textContent, 'Backend Security');
    assert.equal(harness.elementsById['antifraud-title'].textContent, 'Antifraud System');
    assert.equal(harness.elementsById['mockk-role'].textContent, 'Contributor');
    assert.equal(harness.elementsById['mockk-title'].textContent, 'MockK');
    assert.equal(harness.elementsById['dotme-role'].textContent, 'Creator & Maintainer');
    assert.equal(harness.elementsById['dotme-title'].textContent, 'dotme');

    // Switch to PT
    harness.elementsById['language-toggle'].dispatchEvent('click');
    assert.equal(harness.documentMock.documentElement.lang, 'pt');
    assert.equal(harness.elementsById['antifraud-role'].textContent, 'Em Produção');
    assert.equal(harness.elementsById['antifraud-cat'].textContent, 'Segurança Backend');
    assert.equal(harness.elementsById['antifraud-title'].textContent, 'Sistema Antifraude');
    assert.equal(harness.elementsById['mockk-role'].textContent, 'Contribuidor');
    assert.equal(harness.elementsById['mockk-title'].textContent, 'MockK');
    assert.equal(harness.elementsById['dotme-role'].textContent, 'Criador & Mantenedor');
    assert.equal(harness.elementsById['dotme-title'].textContent, 'dotme');

    // Switch back to EN
    harness.elementsById['language-toggle'].dispatchEvent('click');
    assert.equal(harness.documentMock.documentElement.lang, 'en');
    assert.equal(harness.elementsById['antifraud-role'].textContent, 'Production System');
    assert.equal(harness.elementsById['antifraud-cat'].textContent, 'Backend Security');
    assert.equal(harness.elementsById['antifraud-title'].textContent, 'Antifraud System');
    assert.equal(harness.elementsById['mockk-title'].textContent, 'MockK');
    assert.equal(harness.elementsById['dotme-title'].textContent, 'dotme');
});

test('HTML strings update via innerHTML preserving strong tags, plain text via textContent', () => {
    const harness = createLocalizationHarness();
    harness.fns.initializeLanguageToggle(translations);

    // Switch to PT
    harness.elementsById['language-toggle'].dispatchEvent('click');

    const trustlyElem = harness.elementsById['trustly-bullet-1'];
    assert.ok(
        trustlyElem.innerHTML.includes('<strong class="font-mono font-bold text-[#0F172A] dark:text-[#F9FAFB]">+$100B</strong>'),
        'HTML markup must be preserved via innerHTML when string contains HTML tags'
    );
    assert.ok(
        trustlyElem.innerHTML.includes('Engenharia e sustentação de pipelines de faturamento B2B'),
        'Portuguese text must be rendered inside HTML-preserving node'
    );
});

test('allComponents barrier in js/script.js exactly matches mounted containers in index.html', () => {
    const indexHtml = fs.readFileSync(path.join(projectRoot, 'index.html'), 'utf-8');
    const scriptJs = fs.readFileSync(path.join(projectRoot, 'js/script.js'), 'utf-8');

    // Extract mounted container IDs in index.html
    const mountedContainers = [];
    for (const match of indexHtml.matchAll(/<div\s+id="([^"]+-container)"/g)) {
        mountedContainers.push(match[1]);
    }

    // Extract allComponents barrier in js/script.js
    const arrayMatch = scriptJs.match(/const\s+allComponents\s*=\s*\[([\s\S]*?)\];/);
    assert.ok(arrayMatch, 'allComponents array must exist in js/script.js');

    const barrierComponents = Array.from(arrayMatch[1].matchAll(/['"]([^'"]+)['"]/g)).map(m => m[1]);

    assert.ok(mountedContainers.length > 0, 'index.html must have mounted containers');
    assert.deepEqual(
        barrierComponents,
        mountedContainers,
        `allComponents barrier array (${barrierComponents.join(', ')}) must match index.html containers (${mountedContainers.join(', ')})`
    );
});

test('projects.html contains required production data-i18n attributes for all 3 cards', () => {
    const projectsHtml = fs.readFileSync(path.join(projectRoot, 'components/projects.html'), 'utf-8');
    const requiredKeys = [
        'projectsSectionIndex',
        'featuredProjects',
        'projectsSubtitle',
        'antifraudRole',
        'antifraudCategory',
        'antifraudTitle',
        'antifraudDesc',
        'antifraudRepoLink',
        'mockkRole',
        'mockkCategory',
        'mockkTitle',
        'mockkDesc',
        'mockkLinkText',
        'mockkReleaseText',
        'dotmeRole',
        'dotmeCategory',
        'dotmeTitle',
        'dotmeDesc',
        'dotmeLinkText',
        'viewAllProjects'
    ];

    for (const key of requiredKeys) {
        const regex = new RegExp(`data-i18n=["']${key}["']`);
        assert.ok(
            regex.test(projectsHtml),
            `components/projects.html must contain data-i18n="${key}" attribute`
        );
        assert.ok(
            translations.en[key] && translations.pt[key],
            `Key "${key}" must exist in both translations.en and translations.pt`
        );
    }
});

