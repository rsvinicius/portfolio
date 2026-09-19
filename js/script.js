// Component loading functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load all components
    loadComponent('header-container', 'components/header.html');
    loadComponent('hero-container', 'components/hero.html');
    loadComponent('experience-container', 'components/experience.html');
    loadComponent('projects-container', 'components/projects.html');
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
    // Import translations module
    import('./translations.js')
        .then(translationsModule => {
            const translations = translationsModule.default;
            initializeLanguageToggle(translations);
        })
        .catch(error => {
            console.error('Error loading translations module:', error);
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
        const rawLang = localStorage.getItem('language') || localStorage.getItem('lang') || 'en';
        savedLanguage = (translations && translations[rawLang]) ? rawLang : 'en';
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
    }
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', handleLanguageToggle);
    }
}

// Update all translatable elements on the page
function updateLanguage(lang, translations) {
    if (!translations || !translations[lang]) return;

    // Synchronize document language attribute
    document.documentElement.lang = lang;

    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key] !== undefined) {
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
        if (translations[lang][key] !== undefined) {
            element.placeholder = translations[lang][key];
        }
    });

    // Update all elements with data-i18n-aria-label
    document.querySelectorAll('[data-i18n-aria-label]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria-label');
        if (translations[lang][key] !== undefined) {
            element.setAttribute('aria-label', translations[lang][key]);
        }
    });
    
    // Synchronize pre-filled mailto URIs with localized subject and body
    updateMailtoLinks(lang, translations);

    // Synchronize CV download links with localized CV assets
    updateCvLinks(lang);

    // Update language toggle buttons
    const languageToggle = document.getElementById('language-toggle');
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    
    if (languageToggle) updateToggleText(languageToggle, lang, translations);
    if (mobileLanguageToggle) updateToggleText(mobileLanguageToggle, lang, translations);
}

// Update prefilled mailto links across components
function updateMailtoLinks(lang, translations) {
    const langDict = (translations && translations[lang]) ? translations[lang] : {};
    const defaultSubject = "Software Engineering Opportunity - Vinicius Rodrigues Silva";
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

// Synchronize CV download links with localized CV assets
function updateCvLinks(lang) {
    const cvFile = (lang === 'pt') ? 'Vinicius_Silva_CV_PT.pdf' : 'Vinicius_Silva_CV_EN.pdf';
    const cvPath = `assets/${cvFile}`;
    
    document.querySelectorAll('a[href*="Vinicius_Silva_CV_"]').forEach(link => {
        link.setAttribute('href', cvPath);
        if (link.getAttribute('download') !== null || (typeof link.hasAttribute === 'function' && link.hasAttribute('download'))) {
            link.setAttribute('download', cvFile);
        }
    });
}

// Update language toggle button text and accessible attributes
function updateToggleText(element, lang, translations) {
    if (!element || !translations) return;
    if (lang === 'en') {
        const label = (translations.en && translations.en.switchToPortuguese) ? translations.en.switchToPortuguese : 'PT';
        const ariaLabel = (translations.en && translations.en.switchToPortugueseAria) ? translations.en.switchToPortugueseAria : 'Switch language to Portuguese';
        element.textContent = label;
        element.setAttribute('aria-label', ariaLabel);
        element.setAttribute('title', ariaLabel);
    } else {
        const label = (translations.pt && translations.pt.switchToEnglish) ? translations.pt.switchToEnglish : 'EN';
        const ariaLabel = (translations.pt && translations.pt.switchToEnglishAria) ? translations.pt.switchToEnglishAria : 'Mudar idioma para inglês';
        element.textContent = label;
        element.setAttribute('aria-label', ariaLabel);
        element.setAttribute('title', ariaLabel);
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

window.initializeLanguageToggle = initializeLanguageToggle;
window.updateLanguage = updateLanguage;
window.updateMailtoLinks = updateMailtoLinks;
window.updateCvLinks = updateCvLinks;
window.updateToggleText = updateToggleText;