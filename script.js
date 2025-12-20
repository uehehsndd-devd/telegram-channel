// === MAIN SCRIPT FOR G_E_8 LEGENDS SITE ===

class SiteManager {
    constructor() {
        this.translations = {};
        this.currentLang = 'ar';
        this.init();
    }
    
    async init() {
        // Load translations
        await this.loadTranslations();
        
        // Initialize all modules
        this.initLoader();
        this.initNavbar();
        this.initLanguageSwitcher();
        this.initAnimations();
        this.initStatsCounter();
        this.initTiltEffects();
        this.initGallery();
        this.initSmoothScroll();
        this.initMobileMenu();
        
        // Set initial language
        this.setLanguage(this.currentLang);
        
        console.log('🚀 G_E_8 Legends Website Initialized');
    }
    
    async loadTranslations() {
        try {
            const response = await fetch('translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.error('Failed to load translations:', error);
        }
    }
    
    // === LOADER ===
    initLoader() {
        const loader = document.querySelector('.loader');
        if (!loader) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Remove loader from DOM after animation
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 1500);
        });
    }
    
    // === NAVBAR SCROLL EFFECT ===
    initNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 100) {
                navbar.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                // Scrolling down
                navbar.classList.add('hidden');
            } else {
                // Scrolling up
                navbar.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // === LANGUAGE SWITCHER ===
    initLanguageSwitcher() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.currentTarget.dataset.lang;
                this.setLanguage(lang);
                
                // Update active button
                langButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                // Save preference
                localStorage.setItem('preferred-language', lang);
            });
        });
        
        // Load saved language
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang && this.translations[savedLang]) {
            this.currentLang = savedLang;
            langButtons.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.lang === savedLang);
            });
        }
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.title = lang === 'ar' 
            ? 'أساطير الشاشة | مسلسلات أجنبية | أفلام كورية | نتفلكس'
            : 'Screen Legends | Foreign Series | Korean Movies | Netflix';
        
        this.updateTexts();
    }
    
    updateTexts() {
        const texts = this.translations[this.currentLang];
        if (!texts) return;
        
        // Update all elements with data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (texts[key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = texts[key];
                } else {
                    element.textContent = texts[key];
                }
            }
        });
        
        // Update subscriber count format
        const subCount = document.getElementById('subscriberCount');
        if (subCount) {
            subCount.textContent = this.currentLang === 'ar' ? '230,000' : '230K';
        }
    }
    
    // === ANIMATIONS ON SCROLL ===
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special animation for stats
                    if (entry.target.classList.contains('stat-box')) {
                        this.animateStats();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe elements
        document.querySelectorAll('.category-card, .stat-box, .gallery-item, .section-header').forEach(el => {
            observer.observe(el);
        });
    }
    
    // === ANIMATED STATS COUNTER ===
    initStatsCounter() {
        this.statsAnimated = false;
    }
    
    animateStats() {
        if (this.statsAnimated) return;
        
        const counters = document.querySelectorAll('[data-count]');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const increment = target / speed;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, 10);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            
            updateCounter();
        });
        
        this.statsAnimated = true;
    }
    
    // === TILT EFFECTS ===
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            VanillaTilt.init(element, {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.2,
                scale: element.dataset.tiltScale || 1.1
            });
        });
    }
    
    // === GALLERY INTERACTIONS ===
    initGallery() {
        const playButtons = document.querySelectorAll('.play-btn');
        
        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                `;
                
                button.appendChild(ripple);
                
                // Remove ripple after animation
                setTimeout(() => ripple.remove(), 600);
                
                // Telegram redirect simulation
                setTimeout(() => {
                    window.open('https://t.me/G_E_8', '_blank');
                }, 300);
            });
        });
        
        // Add ripple animation style
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // === SMOOTH SCROLL ===
    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#' || !document.querySelector(href)) return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                const menuToggle = document.querySelector('.menu-toggle');
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
    
    // === MOBILE MENU ===
    initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!menuToggle || !navMenu) return;
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// === INITIALIZE SITE WHEN DOM IS LOADED ===
document.addEventListener('DOMContentLoaded', () => {
    window.siteManager = new SiteManager();
});

// === ADDITIONAL EFFECTS ===
// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        const rate = scrolled * -0.5;
        heroBg.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effect to category cards
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Telegram FAB hover effect
const telegramFab = document.querySelector('.fab-telegram');
if (telegramFab) {
    telegramFab.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
    
    telegramFab.addEventListener('mouseleave', function() {
        this.style.animation = 'pulse 2s infinite';
    });
}