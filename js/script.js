// Language and theme switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Import translations
    import('./translations.js')
        .then(module => {
            const translations = module.default;
            initializeLanguageToggle(translations);
        })
        .catch(error => console.error('Error loading translations:', error));

    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    // Check for saved theme preference, default to light theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', 
            document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
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
        // Show/hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('scale-0');
                backToTopButton.classList.add('scale-100');
            } else {
                backToTopButton.classList.remove('scale-100');
                backToTopButton.classList.add('scale-0');
            }
        });
        
        // Scroll to top when clicked
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
            
            if (href !== '#') {
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
});

// Language toggle functionality
function initializeLanguageToggle(translations) {
    // Get the saved language or default to English
    const savedLanguage = localStorage.getItem('language') || 'en';
    
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
        localStorage.setItem('language', newLang);
        
        updateLanguage(newLang, translations);
    }
    
    if (languageToggle) {
        languageToggle.addEventListener('click', handleLanguageToggle);
        // Update the toggle text based on current language
        updateToggleText(languageToggle, savedLanguage, translations);
    }
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', handleLanguageToggle);
        // Update the toggle text based on current language
        updateToggleText(mobileLanguageToggle, savedLanguage, translations);
    }
}

// Update all translatable elements on the page
function updateLanguage(lang, translations) {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Update all input placeholders with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Update language toggle buttons
    const languageToggle = document.getElementById('language-toggle');
    const mobileLanguageToggle = document.getElementById('mobile-language-toggle');
    
    if (languageToggle) updateToggleText(languageToggle, lang, translations);
    if (mobileLanguageToggle) updateToggleText(mobileLanguageToggle, lang, translations);
}

// Update language toggle button text
function updateToggleText(element, lang, translations) {
    const nextLang = lang === 'en' ? 'pt' : 'en';
    
    if (lang === 'en') {
        element.textContent = translations.en.switchToPortuguese;
    } else {
        element.textContent = translations.pt.switchToEnglish;
    }
}

// Simple form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;
            
            // Get the current language
            const lang = document.documentElement.lang || 'en';
            
            // Import translations for the form response
            import('./translations.js')
                .then(module => {
                    const translations = module.default;
                    let responseMsg = translations[lang].formResponse;
                    
                    // Replace placeholders with actual values
                    responseMsg = responseMsg.replace('{0}', name).replace('{1}', email);
                    
                    // Show the response
                    alert(responseMsg);
                    
                    // Reset the form
                    contactForm.reset();
                })
                .catch(error => {
                    console.error('Error loading translations:', error);
                    // Fallback to English if translations fail to load
                    alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
                    contactForm.reset();
                });
        });
    }
});