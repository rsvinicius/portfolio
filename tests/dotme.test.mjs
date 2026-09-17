import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { DOTME_COMMAND, DOTME_PROMPT, DOTME_OUTPUT_LINES, DOTME_TIMINGS } from '../js/dotme-data.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

test('dotme terminal data and sequence verification', () => {
    // Verify prompt and command string
    assert.equal(DOTME_PROMPT, '[vinicius@CachyOS ~]$ ', 'Terminal prompt must match [vinicius@CachyOS ~]$ ');
    assert.equal(
        DOTME_COMMAND,
        'dotme --include=".config*" --exclude=".DS_Store" https://github.com/rsvinicius/dotfiles',
        'Command string must match exact autonomous execution specification'
    );

    // Verify output lines sequence
    assert.equal(DOTME_OUTPUT_LINES.length, 12, 'Must have exactly 12 streamed output lines');
    assert.equal(DOTME_OUTPUT_LINES[0].text, '🔄 Cloning repository: https://github.com/rsvinicius/dotfiles');
    assert.equal(DOTME_OUTPUT_LINES[1].text, '✅ Repository cloned, using branch: main');
    assert.equal(DOTME_OUTPUT_LINES[2].text, '📋 Scanning for dotfiles...');
    assert.equal(DOTME_OUTPUT_LINES[3].text, '📦 Summary:');
    assert.equal(DOTME_OUTPUT_LINES[4].text, '✅ Copied 1 item:');
    assert.ok(DOTME_OUTPUT_LINES[5].text.includes('.config'), 'Must list .config copied item');
    assert.equal(DOTME_OUTPUT_LINES[6].text, '❌ Ignored 7 items:');
    assert.ok(DOTME_OUTPUT_LINES[7].text.includes('disable_mouse_acceleration.sh'), 'Must list ignored scripts');
    assert.equal(DOTME_OUTPUT_LINES[8].text, '🔍 Active filters:');
    assert.ok(DOTME_OUTPUT_LINES[9].text.includes('Include patterns: [.config*]'), 'Must display include filter');
    assert.ok(DOTME_OUTPUT_LINES[10].text.includes('Exclude patterns: [.DS_Store]'), 'Must display exclude filter');
    assert.equal(DOTME_OUTPUT_LINES[11].text, '🎉 Done! Your dotfiles have been applied successfully.');

    // Verify timing parameters
    assert.equal(DOTME_TIMINGS.typewriterCadence, 35, 'Typewriter cadence must be ~35ms');
    assert.equal(DOTME_TIMINGS.streamingLineCadence, 120, 'Streaming cadence must be ~120ms');
    assert.equal(DOTME_TIMINGS.holdDuration, 5000, 'Hold duration must be 5000ms');
});

test('dotme HTML markup and accessibility attributes', () => {
    const projectsHtml = fs.readFileSync(path.join(projectRoot, 'components/projects.html'), 'utf-8');

    // Terminal container carries aria-hidden="true"
    assert.ok(
        projectsHtml.includes('id="dotme-terminal"') && projectsHtml.includes('aria-hidden="true"'),
        'Terminal container must have id="dotme-terminal" and aria-hidden="true"'
    );

    // Accessible screen-reader summary exists
    assert.ok(
        projectsHtml.includes('class="sr-only"') && projectsHtml.includes('data-i18n="dotmeSrSummary"'),
        'Screen reader accessible summary must exist with data-i18n="dotmeSrSummary"'
    );

    // Terminal code container has overflow-x-auto, tabindex="0", and aria-label
    assert.ok(
        projectsHtml.includes('overflow-x-auto'),
        'Terminal container must provide overflow-x-auto'
    );
    assert.ok(
        projectsHtml.includes('tabindex="0"'),
        'Terminal body must have tabindex="0" for keyboard scrollability'
    );
    assert.ok(
        projectsHtml.includes('aria-label="Terminal output scrollable area"'),
        'Terminal body must carry descriptive aria-label'
    );

    // Cursor carries motion-reduce:animate-none
    assert.ok(
        projectsHtml.includes('motion-reduce:animate-none'),
        'Cursor must include motion-reduce:animate-none'
    );

    // Output container preserves indentation whitespace
    assert.ok(
        projectsHtml.includes('whitespace-pre-wrap'),
        'Output container must have whitespace-pre-wrap for indentation fidelity'
    );

    // Dynamic target containers exist
    assert.ok(projectsHtml.includes('id="dotme-cmd"'), 'Must have id="dotme-cmd" target');
    assert.ok(projectsHtml.includes('id="dotme-cursor"'), 'Must have id="dotme-cursor" target');
    assert.ok(projectsHtml.includes('id="dotme-output"'), 'Must have id="dotme-output" target');

    // macOS window controls and title
    assert.ok(projectsHtml.includes('bg-[#FF5F56]'), 'Must have red close dot');
    assert.ok(projectsHtml.includes('bg-[#FFBD2E]'), 'Must have yellow minimize dot');
    assert.ok(projectsHtml.includes('bg-[#27C93F]'), 'Must have green maximize dot');
    assert.ok(projectsHtml.includes('dotme — bash/zsh — 80x24'), 'Must have terminal header title');
});

// Mock DOM element and harness factory for runtime unit verification
class MockElement {
    constructor(id = '', tagName = 'div') {
        this.id = id;
        this.tagName = tagName;
        this.textContent = '';
        this.innerHTML = '';
        this.children = [];
        this.scrollLeft = 0;
        this.style = {};
        const classes = new Set();
        this.classList = {
            add: (...cls) => cls.forEach(c => classes.add(c)),
            remove: (...cls) => cls.forEach(c => classes.delete(c)),
            contains: (c) => classes.has(c)
        };
        this.eventListeners = {};
    }

    addEventListener(event, handler) {
        if (!this.eventListeners[event]) this.eventListeners[event] = [];
        this.eventListeners[event].push(handler);
    }

    removeEventListener(event, handler) {
        if (this.eventListeners[event]) {
            this.eventListeners[event] = this.eventListeners[event].filter(h => h !== handler);
        }
    }

    appendChild(child) {
        this.children.push(child);
    }
}

function createMockHarness(prefersReducedMotion = false) {
    const elements = {
        'dotme-terminal': new MockElement('dotme-terminal'),
        'dotme-terminal-body': new MockElement('dotme-terminal-body'),
        'dotme-cmd': new MockElement('dotme-cmd'),
        'dotme-cursor': new MockElement('dotme-cursor'),
        'dotme-output': new MockElement('dotme-output')
    };

    let observerCallback = null;
    let isDisconnected = false;

    class MockIntersectionObserver {
        constructor(callback) {
            observerCallback = callback;
        }
        observe() {}
        disconnect() {
            isDisconnected = true;
        }
    }

    let timerQueue = [];
    let nextTimerId = 1;
    const mockSetTimeout = (fn, delay) => {
        const id = nextTimerId++;
        timerQueue.push({ id, fn, delay });
        return id;
    };
    const mockClearTimeout = (id) => {
        timerQueue = timerQueue.filter(t => t.id !== id);
    };

    const mockWindow = {
        _dotmeTerminalCleanup: null,
        matchMedia: (query) => ({
            matches: query.includes('prefers-reduced-motion') ? prefersReducedMotion : false
        })
    };

    const mockDocument = {
        getElementById: (id) => elements[id] !== undefined ? elements[id] : null,
        createElement: (tag) => new MockElement('', tag)
    };

    // Instantiate initializeDotmeTerminal extracted from production js/script.js
    const scriptContent = fs.readFileSync(path.join(projectRoot, 'js/script.js'), 'utf-8');
    const startIdx = scriptContent.indexOf('function initializeDotmeTerminal(');
    const endIdx = scriptContent.lastIndexOf('window.initializeDotmeTerminal = initializeDotmeTerminal;');
    assert.ok(startIdx !== -1 && endIdx !== -1, 'initializeDotmeTerminal definition must be present in js/script.js');
    const fnBody = scriptContent.slice(startIdx, endIdx) + '\nreturn initializeDotmeTerminal;';
    const factory = new Function(
        'window', 'document', 'IntersectionObserver', 'setTimeout', 'clearTimeout', 'Date',
        fnBody
    );
    const initializeDotmeTerminal = factory(
        mockWindow, mockDocument, MockIntersectionObserver, mockSetTimeout, mockClearTimeout, Date
    );

    return {
        elements,
        mockWindow,
        initializeDotmeTerminal,
        triggerIntersection: (isIntersecting) => {
            if (observerCallback) {
                observerCallback([{ isIntersecting }]);
            }
        },
        stepNextTimer: () => {
            if (timerQueue.length > 0) {
                const next = timerQueue.shift();
                next.fn();
                return true;
            }
            return false;
        },
        getTimerQueueLength: () => timerQueue.length,
        isObserverDisconnected: () => isDisconnected
    };
}

test('dotme script logic and runtime DOM mutation harness', () => {
    // 1. Reduced Motion Test: Bypasses typewriter loop and renders static completed state
    const harnessReduced = createMockHarness(true);
    harnessReduced.initializeDotmeTerminal(null, { DOTME_COMMAND, DOTME_OUTPUT_LINES, DOTME_TIMINGS });

    assert.equal(
        harnessReduced.elements['dotme-cmd'].textContent,
        DOTME_COMMAND,
        'Reduced motion must immediately render full command string statically'
    );
    assert.ok(
        harnessReduced.elements['dotme-cursor'].classList.contains('hidden'),
        'Reduced motion must hide typewriter cursor'
    );
    assert.equal(
        harnessReduced.elements['dotme-output'].children.length,
        12,
        'Reduced motion must immediately render all 12 output lines'
    );
    assert.equal(
        harnessReduced.getTimerQueueLength(),
        0,
        'Reduced motion must not schedule animation timers'
    );

    // 2. Standard Motion Test: Starts typewriter, updates scrollLeft, streams lines, and handles reset
    const harnessStandard = createMockHarness(false);
    // Simulate pre-scrolled container
    harnessStandard.elements['dotme-terminal-body'].scrollLeft = 140;

    harnessStandard.initializeDotmeTerminal(null, { DOTME_COMMAND, DOTME_OUTPUT_LINES, DOTME_TIMINGS });
    // Card enters viewport
    harnessStandard.triggerIntersection(true);

    // Initial cycle: resets scrollLeft, clears command and output buffer
    assert.equal(harnessStandard.elements['dotme-terminal-body'].scrollLeft, 0, 'startCycle must reset scrollLeft to 0');
    assert.equal(harnessStandard.elements['dotme-cmd'].textContent, '', 'startCycle must clear command text');
    assert.equal(harnessStandard.elements['dotme-output'].innerHTML, '', 'startCycle must clear output HTML');

    // Advance 5 typewriter character steps
    for (let i = 0; i < 5; i++) {
        harnessStandard.stepNextTimer();
    }
    assert.equal(
        harnessStandard.elements['dotme-cmd'].textContent,
        DOTME_COMMAND.slice(0, 5),
        'Typewriter must append characters sequentially'
    );

    // Complete command typing
    while (harnessStandard.elements['dotme-cmd'].textContent.length < DOTME_COMMAND.length) {
        harnessStandard.stepNextTimer();
    }
    assert.equal(harnessStandard.elements['dotme-cmd'].textContent, DOTME_COMMAND);

    // Transition from typing to streaming, then stream line 0
    harnessStandard.stepNextTimer(); // completes typing phase, transitions to streaming
    harnessStandard.stepNextTimer(); // streams line 0
    assert.equal(harnessStandard.elements['dotme-output'].children.length, 1);
    assert.equal(harnessStandard.elements['dotme-output'].children[0].textContent, DOTME_OUTPUT_LINES[0].text);

    // Stream remaining lines until all 12 lines are output
    while (harnessStandard.elements['dotme-output'].children.length < 12) {
        harnessStandard.stepNextTimer();
    }
    assert.equal(harnessStandard.elements['dotme-output'].children.length, 12);

    // Transition to hold phase
    harnessStandard.stepNextTimer(); // completes streaming, enters holding phase (5000ms hold timer)

    // Trigger hold timeout expiration to test executeReset opacity fade-out
    harnessStandard.stepNextTimer(); // hold timer expires -> executeReset runs
    assert.equal(
        harnessStandard.elements['dotme-output'].style.opacity,
        '0',
        'executeReset must fade out opacity before clearing'
    );
    assert.ok(
        harnessStandard.elements['dotme-output'].style.transition.includes('opacity'),
        'executeReset must apply opacity transition'
    );

    // Step reset timer to start next cycle and verify opacity restoration
    harnessStandard.stepNextTimer();
    assert.equal(
        harnessStandard.elements['dotme-output'].style.opacity,
        '1',
        'startCycle must restore opacity to 1'
    );

    // 3. Cleanup Test: Disconnects observer and removes listeners
    assert.equal(typeof harnessStandard.mockWindow._dotmeTerminalCleanup, 'function');
    harnessStandard.mockWindow._dotmeTerminalCleanup();
    assert.ok(harnessStandard.isObserverDisconnected(), 'Cleanup must disconnect IntersectionObserver');
    assert.equal(harnessStandard.elements['dotme-terminal'].eventListeners['mouseenter'].length, 0);
    assert.equal(harnessStandard.elements['dotme-terminal'].eventListeners['mouseleave'].length, 0);

    // 4. Guard & Leak Prevention Test: Cleanup is invoked before element presence guard
    let cleanupInvoked = false;
    const harnessGuard = createMockHarness(false);
    harnessGuard.mockWindow._dotmeTerminalCleanup = () => { cleanupInvoked = true; };
    // Force missing terminal element to trigger early return
    harnessGuard.elements['dotme-terminal'] = null;
    harnessGuard.initializeDotmeTerminal(null, { DOTME_COMMAND, DOTME_OUTPUT_LINES, DOTME_TIMINGS });
    assert.ok(cleanupInvoked, 'Cleanup must run at the very beginning of initializeDotmeTerminal before element guards');
});

test('dotme bilingual translation parity across en and pt', async () => {
    const translationsModule = await import(path.join(projectRoot, 'js/translations.js'));
    const translations = translationsModule.default;

    const dotmeKeys = [
        'dotmeTitle',
        'dotmeSubtitle',
        'dotmeRole',
        'dotmeDesc',
        'dotmeLinkText',
        'dotmeSrSummary'
    ];

    for (const key of dotmeKeys) {
        assert.ok(translations.en[key], `Missing English key: ${key}`);
        assert.ok(translations.pt[key], `Missing Portuguese key: ${key}`);
        assert.ok(typeof translations.en[key] === 'string' && translations.en[key].length > 0);
        assert.ok(typeof translations.pt[key] === 'string' && translations.pt[key].length > 0);
    }
});
