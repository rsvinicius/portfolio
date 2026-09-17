// Component loading functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponent('header-container', 'components/header.html');
    loadComponent('hero-container', 'components/hero.html');
    loadComponent('experience-container', 'components/experience.html');
    loadComponent('projects-container', 'components/projects.html');
    loadComponent('opensource-container', 'components/opensource.html');
    loadComponent('skills-container', 'components/skills.html');
    loadComponent('education-container', 'components/education.html');
    loadComponent('contact-container', 'components/contact.html');
    loadComponent('footer-container', 'components/footer.html');
});

// Function to load components
function loadComponent(containerId, componentPath) {
    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load component: ${componentPath}`);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(containerId).innerHTML = html;
            
            // Track loaded components
            if (!window.loadedComponents) {
                window.loadedComponents = new Set();
            }
            window.loadedComponents.add(containerId);

            // Check if all components are loaded
            const allComponents = [
                'header-container',
                'hero-container',
                'experience-container',
                'projects-container',
                'opensource-container',
                'skills-container',
                'education-container',
                'contact-container',
                'footer-container'
            ];

            if (allComponents.every(component => window.loadedComponents.has(component))) {
                initializePostLoadFunctionality();
            }
        })
        .catch(error => console.error('Error loading component:', error));
}

// Initialize functionality after all components are loaded
function initializePostLoadFunctionality() {
    // Import translations and antifraud calculator module
    Promise.all([
        import('./translations.js'),
        import('./antifraud-calculator.js')
    ])
        .then(([translationsModule, calculatorModule]) => {
            const translations = translationsModule.default;
            const calculateRisk = calculatorModule.calculateRisk;
            initializeLanguageToggle(translations);
            initializeAntifraudSandbox(translations, calculateRisk);
        })
        .catch(error => {
            console.error('Error loading modules:', error);
            initializeAntifraudSandbox(null, null);
        });

    // Theme switching functionality (Dark mode by default per DESIGN.md & EXPERIENCE.md)
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    let savedTheme = null;
    try {
        savedTheme = localStorage.getItem('theme');
    } catch (e) {
        console.warn('localStorage not accessible for theme', e);
    }

    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        try {
            localStorage.setItem('theme', 
                document.documentElement.classList.contains('dark') ? 'dark' : 'light'
            );
        } catch (e) {
            console.warn('localStorage not accessible for saving theme', e);
        }
    }

    // Add click handlers for theme toggles
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Close mobile menu when clicking a link
    const mobileMenuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('scale-0');
                backToTopButton.classList.add('scale-100');
            } else {
                backToTopButton.classList.remove('scale-100');
                backToTopButton.classList.add('scale-0');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize contact form if present
    initializeContactForm();
}

// Language toggle functionality
function initializeLanguageToggle(translations) {
    let savedLanguage = 'en';
    try {
        savedLanguage = localStorage.getItem('language') || 'en';
    } catch (e) {
        console.warn('localStorage not accessible for language', e);
    }
    
    // Set the initial language
    document.documentElement.lang = savedLanguage;
    updateLanguage(savedLanguage, translations);
    
    // Set up language toggle buttons
    const languageToggle = document.getElementById('language-toggle');
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    
    function handleLanguageToggle() {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'pt' : 'en';
        
        document.documentElement.lang = newLang;
        try {
            localStorage.setItem('language', newLang);
        } catch (e) {
            console.warn('localStorage not accessible for saving language', e);
        }
        
        updateLanguage(newLang, translations);
    }
    
    if (languageToggle) {
        languageToggle.addEventListener('click', handleLanguageToggle);
        updateToggleText(languageToggle, savedLanguage, translations);
    }
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', handleLanguageToggle);
        updateToggleText(mobileLanguageToggle, savedLanguage, translations);
    }
}

// Update all translatable elements on the page
function updateLanguage(lang, translations) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations && translations[lang] && translations[lang][key]) {
            const val = translations[lang][key];
            if (typeof val === 'string' && /<[a-z][\s\S]*>/i.test(val)) {
                element.innerHTML = val;
            } else {
                element.textContent = val;
            }
        }
    });
    
    // Update all input placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations && translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Synchronize pre-filled mailto URIs with localized subject and body
    updateMailtoLinks(lang, translations);

    // Update dynamic Antifraud Sandbox readouts preserving current slider positions
    if (typeof window.updateAntifraudSandbox === 'function') {
        window.updateAntifraudSandbox(lang, translations);
    }

    // Update language toggle buttons
    const languageToggle = document.getElementById('language-toggle');
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    
    if (languageToggle) updateToggleText(languageToggle, lang, translations);
    if (mobileLanguageToggle) updateToggleText(mobileLanguageToggle, lang, translations);
}

// Update prefilled mailto links across components
function updateMailtoLinks(lang, translations) {
    const langDict = (translations && translations[lang]) ? translations[lang] : {};
    const defaultSubject = "Software Engineering Opportunity - Vinicius R. Silva";
    const defaultBody = "Hi Vinicius,\r\n\r\nI reviewed your portfolio and would like to discuss a Software Engineer role at...";
    
    const subjectText = langDict.contactEmailSubject || defaultSubject;
    const bodyText = (langDict.contactEmailBody || defaultBody).replace(/\r?\n/g, '\r\n');
    
    const subject = encodeURIComponent(subjectText);
    const body = encodeURIComponent(bodyText);
    const mailtoUri = `mailto:vrodrigues.code@gmail.com?subject=${subject}&body=${body}`;
    
    document.querySelectorAll('a[href^="mailto:vrodrigues.code@gmail.com"]').forEach(link => {
        link.setAttribute('href', mailtoUri);
    });
}

// Update language toggle button text
function updateToggleText(element, lang, translations) {
    if (!translations) return;
    if (lang === 'en') {
        element.textContent = translations.en ? translations.en.switchToPortuguese : 'PT';
    } else {
        element.textContent = translations.pt ? translations.pt.switchToEnglish : 'EN';
    }
}

// Clipboard copy fallback function for direct email action
window.copyEmailToClipboard = function() {
    const email = 'vrodrigues.code@gmail.com';
    
    function showFeedback() {
        const feedback = document.getElementById('copy-feedback');
        if (feedback) {
            feedback.classList.remove('opacity-0', 'pointer-events-none');
            feedback.classList.add('opacity-100');
            
            if (window._copyTimeout) {
                clearTimeout(window._copyTimeout);
            }
            window._copyTimeout = setTimeout(() => {
                feedback.classList.remove('opacity-100');
                feedback.classList.add('opacity-0', 'pointer-events-none');
                window._copyTimeout = null;
            }, 2000);
        }
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email)
            .then(showFeedback)
            .catch(() => fallbackCopy(email));
    } else {
        fallbackCopy(email);
    }
    
    function fallbackCopy(text) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        let successful = false;
        try {
            successful = document.execCommand('copy');
        } catch (err) {
            console.error('Fallback copy error: ', err);
        }
        if (successful) {
            showFeedback();
        } else {
            console.error('Fallback copy command failed or unsupported');
        }
        document.body.removeChild(textArea);
    }
};

// Form handling (retained gracefully if a form exists)
function initializeContactForm() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const lang = document.documentElement.lang || 'en';
            
            import('./translations.js')
                .then(module => {
                    const translations = module.default;
                    let responseMsg = translations[lang].formResponse;
                    responseMsg = responseMsg.replace('{0}', name).replace('{1}', email);
                    alert(responseMsg);
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error loading translations:', error);
                    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
                    contactForm.reset();
                });
        });
    }
}

// Antifraud Sandbox Widget (Client-side real-time transaction risk heuristic engine)
// Uses modularized risk calculation engine imported from js/antifraud-calculator.js
function initializeAntifraudSandbox(translations, calculateRiskFn) {
    let calculateRisk = calculateRiskFn;
    if (typeof calculateRisk !== 'function') {
        import('./antifraud-calculator.js')
            .then(mod => {
                initializeAntifraudSandbox(translations, mod.calculateRisk);
            })
            .catch(err => {
                console.error('Failed to load antifraud calculator:', err);
            });
        return;
    }

    const amountSlider = document.getElementById('antifraud-amount');
    const deltaSlider = document.getElementById('antifraud-delta');
    const distanceSlider = document.getElementById('antifraud-distance');

    if (!amountSlider || !deltaSlider || !distanceSlider) {
        return;
    }

    const amountVal = document.getElementById('antifraud-amount-val');
    const deltaVal = document.getElementById('antifraud-delta-val');
    const distanceVal = document.getElementById('antifraud-distance-val');

    const scoreNum = document.getElementById('antifraud-score-num');
    const scoreBar = document.getElementById('antifraud-score-bar');
    const statusBadge = document.getElementById('antifraud-status-badge');

    const velocityVal = document.getElementById('antifraud-velocity-val');
    const pvelVal = document.getElementById('antifraud-pvel-val');
    const pgeoVal = document.getElementById('antifraud-pgeo-val');
    const pamountVal = document.getElementById('antifraud-pamount-val');

    // Semantic status color utility classes registered in Tailwind config (no arbitrary hex):
    // status-approved (#10B981) / status-approved-light (#047857) / status-approved-border (#059669)
    // status-flagged (#F59E0B) / status-flagged-light (#B45309) / status-flagged-border (#D97706)
    // status-rejected (#EF4444) / status-rejected-light (#B91C1C) / status-rejected-border (#DC2626)
    const BADGE_CLASSES = {
        approved: ['bg-status-approved-light/15', 'dark:bg-status-approved/15', 'text-status-approved-light', 'dark:text-status-approved', 'border-status-approved-border'],
        flagged: ['bg-status-flagged-light/15', 'dark:bg-status-flagged/15', 'text-status-flagged-light', 'dark:text-status-flagged', 'border-status-flagged-border'],
        rejected: ['bg-status-rejected-light/15', 'dark:bg-status-rejected/15', 'text-status-rejected-light', 'dark:text-status-rejected', 'border-status-rejected-border']
    };

    const METER_CLASSES = {
        approved: ['bg-status-approved-light', 'dark:bg-status-approved'],
        flagged: ['bg-status-flagged-light', 'dark:bg-status-flagged'],
        rejected: ['bg-status-rejected-light', 'dark:bg-status-rejected']
    };

    const TEXT_CLASSES = {
        approved: ['text-status-approved-light', 'dark:text-status-approved'],
        flagged: ['text-status-flagged-light', 'dark:text-status-flagged'],
        rejected: ['text-status-rejected-light', 'dark:text-status-rejected']
    };

    const ALL_BADGE_CLASSES = [
        ...BADGE_CLASSES.approved,
        ...BADGE_CLASSES.flagged,
        ...BADGE_CLASSES.rejected
    ];

    const ALL_METER_CLASSES = [
        ...METER_CLASSES.approved,
        ...METER_CLASSES.flagged,
        ...METER_CLASSES.rejected
    ];

    const ALL_TEXT_CLASSES = [
        ...TEXT_CLASSES.approved,
        ...TEXT_CLASSES.flagged,
        ...TEXT_CLASSES.rejected
    ];

    function update() {
        const lang = document.documentElement.lang || 'en';
        const locale = lang === 'pt' ? 'pt-BR' : 'en-US';
        const dict = (translations && translations[lang]) ? translations[lang] : {};

        const amount = parseFloat(amountSlider.value) || 0;
        const deltaT = parseFloat(deltaSlider.value) || 1;
        const distance = parseFloat(distanceSlider.value) || 0;

        // Localized unit strings
        const formattedAmount = `$${amount.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        const formattedDelta = `${deltaT.toLocaleString(locale)} min`;
        const formattedDistance = `${distance.toLocaleString(locale)} km`;

        // Synchronize ARIA attributes and valuetext with units
        amountSlider.setAttribute('aria-valuenow', amount);
        amountSlider.setAttribute('aria-valuetext', formattedAmount);

        deltaSlider.setAttribute('aria-valuenow', deltaT);
        deltaSlider.setAttribute('aria-valuetext', formattedDelta);

        distanceSlider.setAttribute('aria-valuenow', distance);
        distanceSlider.setAttribute('aria-valuetext', formattedDistance);

        // Update Slider Value Readouts in DOM
        if (amountVal) {
            amountVal.textContent = formattedAmount;
        }
        if (deltaVal) {
            deltaVal.textContent = formattedDelta;
        }
        if (distanceVal) {
            distanceVal.textContent = formattedDistance;
        }

        // Calculate risk score using the modularized calculation engine
        const { pVelocity, travelVelocity: v, pGeo, pAmount, score, tier } = calculateRisk(amount, deltaT, distance);

        let badgeKey = 'antifraudStatusFlagged';
        let defaultBadgeText = 'FLAGGED / REVIEW';

        if (tier === 'approved') {
            badgeKey = 'antifraudStatusApproved';
            defaultBadgeText = 'APPROVED';
        } else if (tier === 'rejected') {
            badgeKey = 'antifraudStatusRejected';
            defaultBadgeText = 'REJECTED';
        }

        const formattedScore = score.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

        // Update Score Number & Meter Bar (with role="meter" attributes)
        if (scoreNum) {
            scoreNum.textContent = formattedScore;
            scoreNum.classList.remove(...ALL_TEXT_CLASSES);
            scoreNum.classList.add(...TEXT_CLASSES[tier]);
        }
        if (scoreBar) {
            scoreBar.style.width = `${score.toFixed(1)}%`;
            scoreBar.setAttribute('aria-valuenow', score.toFixed(1));
            scoreBar.setAttribute('aria-valuetext', `${formattedScore} / 100`);
            scoreBar.classList.remove(...ALL_METER_CLASSES);
            scoreBar.classList.add(...METER_CLASSES[tier]);
        }

        // Update Decision Badge
        if (statusBadge) {
            statusBadge.textContent = dict[badgeKey] || defaultBadgeText;
            statusBadge.setAttribute('data-i18n', badgeKey);
            statusBadge.classList.remove(...ALL_BADGE_CLASSES);
            statusBadge.classList.add(...BADGE_CLASSES[tier]);
        }

        // Update Diagnostic Breakdown with active locale formatting
        if (velocityVal) {
            const vRounded = Math.round(v);
            const vFormatted = vRounded.toLocaleString(locale);
            let speedAlert = '';
            if (v > 1200) {
                speedAlert = ` (${dict.antifraudSupersonicAlert || 'Supersonic Geo-Jump'})`;
            } else if (v > 800) {
                speedAlert = ` (${dict.antifraudImpossibleSpeedAlert || 'High Speed Geo-Jump'})`;
            } else {
                speedAlert = ` (${dict.antifraudNormalSpeed || 'Normal Transit'})`;
            }
            velocityVal.textContent = `${vFormatted} km/h${speedAlert}`;
        }

        if (pvelVal) {
            pvelVal.textContent = `${pVelocity.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 50`;
        }
        if (pgeoVal) {
            pgeoVal.textContent = `${pGeo.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 50`;
        }
        if (pamountVal) {
            pamountVal.textContent = `${pAmount.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} / 30`;
        }
    }

    // Attach synchronous event listeners with latency < 2ms
    amountSlider.addEventListener('input', update);
    deltaSlider.addEventListener('input', update);
    distanceSlider.addEventListener('input', update);

    // Save global update hook for language switching
    window.updateAntifraudSandbox = function(newLang, newTranslations) {
        if (newTranslations) {
            translations = newTranslations;
        }
        update();
    };

    // Execute initial calculation
    update();
}