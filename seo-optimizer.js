// ===== DYNAMIC SEO OPTIMIZATION MODULE =====

class SEOModule {
    constructor() {
        this.currentLang = 'ar';
        this.structuredData = {};
        this.init();
    }
    
    async init() {
        console.log('🔍 SEO Module Initializing...');
        
        // Load translations
        await this.loadTranslations();
        
        // Generate structured data
        this.generateStructuredData();
        
        // Update meta tags
        this.updateMetaTags();
        
        // Setup dynamic title/description
        this.setupDynamicMeta();
        
        // Monitor SEO elements
        this.monitorSEOElements();
        
        console.log('✅ SEO Module Initialized');
    }
    
    async loadTranslations() {
        try {
            const response = await fetch('/translations.json');
            this.translations = await response.json();
        } catch (error) {
            console.warn('Could not load translations, using default:', error);
            this.translations = {
                ar: require('./translations.json').ar,
                en: require('./translations.json').en
            };
        }
    }
    
    generateStructuredData() {
        const baseUrl = window.location.origin;
        
        this.structuredData = {
            website: {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "G_E_8 | أفلام كورية ومسلسلات Netflix",
                "alternateName": "G_E_8 Channel",
                "url": baseUrl,
                "description": this.getTranslation('meta.description'),
                "keywords": this.getKeywords(),
                "inLanguage": ["ar", "en"],
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/search?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            
            organization: {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "G_E_8 Channel",
                "url": baseUrl,
                "logo": `${baseUrl}/assets/images/logo-512x512.png`,
                "sameAs": [
                    "https://t.me/G_E_8",
                    "https://t.me/TOB1_M1"
                ],
                "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+966-555-123456",
                    "contactType": "customer support",
                    "availableLanguage": ["Arabic", "English"]
                }
            },
            
            breadcrumb: {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": this.generateBreadcrumbs()
            },
            
            faq: {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": this.generateFAQ()
            }
        };
        
        this.injectStructuredData();
    }
    
    injectStructuredData() {
        // Remove existing structured data
        document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
            if (script.textContent.includes('schema.org')) {
                script.remove();
            }
        });
        
        // Inject new structured data
        Object.values(this.structuredData).forEach(data => {
            const script = document.createElement('script');
            script.type = 'application/ld+json';
            script.textContent = JSON.stringify(data, null, 2);
            document.head.appendChild(script);
        });
    }
    
    generateBreadcrumbs() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        const breadcrumbs = [
            {
                "@type": "ListItem",
                "position": 1,
                "name": this.getTranslation('nav.home'),
                "item": window.location.origin
            }
        ];
        
        let currentUrl = window.location.origin;
        segments.forEach((segment, index) => {
            currentUrl += `/${segment}`;
            breadcrumbs.push({
                "@type": "ListItem",
                "position": index + 2,
                "name": this.formatSegmentName(segment),
                "item": currentUrl
            });
        });
        
        return breadcrumbs;
    }
    
    generateFAQ() {
        return [
            {
                "@type": "Question",
                "name": this.getTranslation('faq.q1'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": this.getTranslation('faq.a1')
                }
            },
            {
                "@type": "Question",
                "name": this.getTranslation('faq.q2'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": this.getTranslation('faq.a2')
                }
            },
            {
                "@type": "Question",
                "name": this.getTranslation('faq.q3'),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": this.getTranslation('faq.a3')
                }
            }
        ];
    }
    
    updateMetaTags() {
        const page = this.getCurrentPage();
        const translations = this.translations[this.currentLang];
        
        if (translations?.pages?.[page]) {
            const pageMeta = translations.pages[page];
            
            // Update title
            document.title = pageMeta.title;
            
            // Update meta description
            this.updateMetaTag('description', pageMeta.description);
            
            // Update keywords
            this.updateMetaTag('keywords', this.getKeywords());
            
            // Update Open Graph
            this.updateOpenGraph(pageMeta);
            
            // Update Twitter Cards
            this.updateTwitterCards(pageMeta);
            
            // Update canonical URL
            this.updateCanonicalUrl();
        }
    }
    
    updateMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }
    
    updateOpenGraph(meta) {
        const ogTags = {
            'og:title': meta.title,
            'og:description': meta.description,
            'og:url': window.location.href,
            'og:image': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1200&h=630',
            'og:image:width': '1200',
            'og:image:height': '630',
            'og:type': 'website',
            'og:locale': this.currentLang === 'ar' ? 'ar_SA' : 'en_US',
            'og:site_name': 'G_E_8 Channel'
        };
        
        Object.entries(ogTags).forEach(([property, content]) => {
            let meta = document.querySelector(`meta[property="${property}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.setAttribute('property', property);
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }
    
    updateTwitterCards(meta) {
        const twitterTags = {
            'twitter:card': 'summary_large_image',
            'twitter:title': meta.title,
            'twitter:description': meta.description.substring(0, 200),
            'twitter:image': 'https://images.unsplash.com/photo-1535016120720-40c646be5580?auto=format&fit=crop&w=1200&h=600',
            'twitter:site': '@TOB1_M1',
            'twitter:creator': '@TOB1_M1'
        };
        
        Object.entries(twitterTags).forEach(([name, content]) => {
            let meta = document.querySelector(`meta[name="${name}"]`);
            if (!meta) {
                meta = document.createElement('meta');
                meta.name = name;
                document.head.appendChild(meta);
            }
            meta.content = content;
        });
    }
    
    updateCanonicalUrl() {
        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = window.location.href.split('?')[0]; // Remove query params
    }
    
    setupDynamicMeta() {
        // Update meta on hash change (SPA-like navigation)
        window.addEventListener('hashchange', () => {
            this.updateMetaTags();
            this.generateStructuredData();
        });
        
        // Update on language change
        document.addEventListener('languageChanged', (event) => {
            this.currentLang = event.detail.lang;
            this.updateMetaTags();
            this.generateStructuredData();
        });
        
        // Update on scroll (for infinite scroll)
        let lastScrollUpdate = 0;
        window.addEventListener('scroll', () => {
            const now = Date.now();
            if (now - lastScrollUpdate > 1000) { // Throttle to 1 second
                lastScrollUpdate = now;
                this.updateDynamicTitle();
            }
        });
    }
    
    updateDynamicTitle() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const sectionId = section.id;
                const sectionName = this.getSectionName(sectionId);
                
                // Update title with section name
                if (sectionName) {
                    document.title = `${sectionName} | G_E_8`;
                }
            }
        });
    }
    
    monitorSEOElements() {
        // Monitor images for alt attributes
        this.monitorImageAlts();
        
        // Monitor links for proper attributes
        this.monitorLinks();
        
        // Monitor headings hierarchy
        this.monitorHeadings();
    }
    
    monitorImageAlts() {
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            console.warn('Image missing alt attribute:', img.src);
            // Try to generate alt text from filename or context
            const alt = this.generateAltText(img);
            if (alt) {
                img.alt = alt;
            }
        });
    }
    
    monitorLinks() {
        const links = document.querySelectorAll('a[href^="http"]:not([rel])');
        links.forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.rel = 'noopener noreferrer';
            }
        });
    }
    
    monitorHeadings() {
        // Check for proper heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const headingLevels = [];
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1));
            headingLevels.push(level);
        });
        
        // Check if there's only one h1
        const h1Count = headingLevels.filter(level => level === 1).length;
        if (h1Count !== 1) {
            console.warn(`Found ${h1Count} h1 elements. Should be exactly 1.`);
        }
    }
    
    // Helper methods
    getCurrentPage() {
        const path = window.location.pathname;
        if (path === '/' || path === '') return 'home';
        
        const page = path.split('/').pop().replace('.html', '');
        return page || 'home';
    }
    
    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // Fallback to key
            }
        }
        
        return value || key;
    }
    
    getKeywords() {
        const baseKeywords = [
            'أفلام كورية 2024',
            'مسلسلات Netflix',
            'كيدراما',
            'دراما آسيوية',
            'مشاهدة أونلاين',
            'تحميل مباشر',
            'تليجرام أفلام',
            'قناة ماركو',
            'TOB1_M1',
            'G_E_8'
        ];
        
        // Add page-specific keywords
        const page = this.getCurrentPage();
        const pageKeywords = {
            home: ['القناة الرسمية', 'أكبر مكتبة'],
            movies: ['أفلام أكشن', 'أفلام رومانسية', 'أفلام رعب'],
            series: ['Netflix أصلية', 'مسلسلات أجنبية']
        };
        
        return [...baseKeywords, ...(pageKeywords[page] || [])].join(', ');
    }
    
    formatSegmentName(segment) {
        const names = {
            'movies': 'الأفلام',
            'series': 'المسلسلات',
            'kdrama': 'الكيدراما',
            'about': 'عن القناة',
            'contact': 'اتصل بنا'
        };
        
        return names[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    }
    
    getSectionName(sectionId) {
        const sections = {
            'home': 'الرئيسية',
            'movies': 'الأفلام الكورية',
            'series': 'مسلسلات Netflix',
            'kdrama': 'كيدراما',
            'about': 'عن القناة',
            'contact': 'اتصل بنا'
        };
        
        return sections[sectionId] || null;
    }
    
    generateAltText(img) {
        // Extract from data-alt attribute
        if (img.dataset.alt) return img.dataset.alt;
        
        // Extract from filename
        const filename = img.src.split('/').pop().split('?')[0];
        const name = filename.replace(/[-_]/g, ' ').replace(/\.[^/.]+$/, '');
        
        // Add context based on parent element
        const context = img.closest('[class*="movie"], [class*="hero"], [class*="card"]');
        if (context) {
            const contextClass = Array.from(context.classList)
                .find(cls => cls.includes('movie') || cls.includes('hero') || cls.includes('card'));
            
            if (contextClass) {
                return `${name} - ${this.getTranslation(`alt.${contextClass}`)}`;
            }
        }
        
        return name;
    }
}