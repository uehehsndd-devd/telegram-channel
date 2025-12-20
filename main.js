// ===== MAIN APPLICATION CONTROLLER =====

class G_E_8App {
    constructor() {
        this.state = {
            currentLang: localStorage.getItem('preferred-language') || 'ar',
            currentFilter: 'all',
            currentTab: 'korean',
            isMenuOpen: false,
            isModalOpen: false,
            userPreferences: {},
            performanceMetrics: {}
        };
        
        this.modules = {};
        this.init();
    }
    
    async init() {
        console.log('🚀 G_E_8 App Initializing...');
        
        try {
            // Initialize core modules
            await this.loadModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize UI
            this.initializeUI();
            
            // Track performance
            this.trackPerformance();
            
            console.log('✅ G_E_8 App Initialized Successfully!');
            
        } catch (error) {
            console.error('❌ App Initialization Failed:', error);
            this.handleError(error);
        }
    }
    
    async loadModules() {
        // Load all modules in parallel
        const modules = [
            this.loadPerformanceModule(),
            this.loadSEOModule(),
            this.loadStorageModule(),
            this.loadImageModule(),
            this.loadAnalyticsModule()
        ];
        
        await Promise.all(modules);
    }
    
    async loadPerformanceModule() {
        this.modules.performance = new PerformanceModule();
        await this.modules.performance.init();
    }
    
    async loadSEOModule() {
        this.modules.seo = new SEOModule();
        await this.modules.seo.init();
    }
    
    async loadStorageModule() {
        this.modules.storage = new StorageModule();
        await this.modules.storage.init();
    }
    
    async loadImageModule() {
        this.modules.image = new ImageModule();
        await this.modules.image.init();
    }
    
    async loadAnalyticsModule() {
        this.modules.analytics = new AnalyticsModule();
        await this.modules.analytics.init();
    }
    
    setupEventListeners() {
        // Navigation
        document.addEventListener('click', this.handleNavigation.bind(this));
        
        // Scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));
        
        // Resize
        window.addEventListener('resize', this.handleResize.bind(this));
        
        // Form submissions
        document.addEventListener('submit', this.handleSubmit.bind(this));
        
        // Error handling
        window.addEventListener('error', this.handleError.bind(this));
        window.addEventListener('unhandledrejection', this.handlePromiseRejection.bind(this));
    }
    
    initializeUI() {
        // Update language
        this.updateLanguage(this.state.currentLang);
        
        // Initialize components
        this.initComponents();
        
        // Load initial data
        this.loadInitialData();
        
        // Hide loader
        this.hideLoader();
    }
    
    initComponents() {
        // Initialize all UI components
        this.components = {
            nav: new NavigationComponent(),
            hero: new HeroComponent(),
            movies: new MoviesComponent(),
            footer: new FooterComponent()
        };
        
        Object.values(this.components).forEach(component => {
            if (component.init) component.init();
        });
    }
    
    async loadInitialData() {
        try {
            // Load movies data
            const moviesData = await this.fetchData('/api/movies.json');
            this.state.moviesData = moviesData;
            
            // Load series data
            const seriesData = await this.fetchData('/api/series.json');
            this.state.seriesData = seriesData;
            
            // Update UI with data
            this.updateMoviesGrid();
            this.updateSeriesGrid();
            
        } catch (error) {
            console.warn('Could not load initial data:', error);
            // Use fallback data
            this.useFallbackData();
        }
    }
    
    updateLanguage(lang) {
        this.state.currentLang = lang;
        localStorage.setItem('preferred-language', lang);
        
        // Update translations
        if (this.modules.seo) {
            this.modules.seo.updateLanguage(lang);
        }
        
        // Update UI elements
        this.updateUITexts();
        
        // Dispatch event
        document.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { lang } 
        }));
    }
    
    updateMoviesGrid() {
        if (!this.components.movies) return;
        
        const filteredMovies = this.state.moviesData?.filter(movie => {
            if (this.state.currentFilter === 'all') return true;
            return movie.category === this.state.currentFilter;
        }) || [];
        
        this.components.movies.update(filteredMovies);
    }
    
    handleNavigation(event) {
        const target = event.target;
        
        // Handle nav links
        if (target.closest('.nav-link')) {
            event.preventDefault();
            this.handleNavClick(target.closest('.nav-link'));
        }
        
        // Handle filter buttons
        if (target.closest('.filter-btn')) {
            this.handleFilterClick(target.closest('.filter-btn'));
        }
        
        // Handle tab buttons
        if (target.closest('.tab-btn')) {
            this.handleTabClick(target.closest('.tab-btn'));
        }
        
        // Handle modal close
        if (target.closest('.modal-close') || target.closest('.modal-overlay')) {
            this.closeModal();
        }
    }
    
    handleNavClick(link) {
        const href = link.getAttribute('href');
        
        if (href.startsWith('#')) {
            this.scrollToSection(href);
        } else if (href.startsWith('http')) {
            this.trackExternalLink(href);
        }
        
        // Update active nav
        this.updateActiveNav(link);
        
        // Close mobile menu if open
        if (this.state.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }
    
    scrollToSection(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
            // Track analytics
            if (this.modules.analytics) {
                this.modules.analytics.trackEvent('navigation', {
                    section: selector.replace('#', '')
                });
            }
        }
    }
    
    handleFilterClick(button) {
        const filter = button.dataset.filter;
        this.state.currentFilter = filter;
        
        // Update UI
        this.updateFilterButtons(button);
        this.updateMoviesGrid();
        
        // Track analytics
        if (this.modules.analytics) {
            this.modules.analytics.trackEvent('filter', { filter });
        }
    }
    
    handleTabClick(button) {
        const tab = button.dataset.tab;
        this.state.currentTab = tab;
        
        // Update UI
        this.updateTabButtons(button);
        this.updateTabContent(tab);
        
        // Track analytics
        if (this.modules.analytics) {
            this.modules.analytics.trackEvent('tab_switch', { tab });
        }
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Update progress bar
        this.updateProgressBar(scrollY);
        
        // Show/hide back to top button
        this.toggleBackToTop(scrollY);
        
        // Update active nav based on scroll
        this.updateActiveNavOnScroll(scrollY);
        
        // Lazy load images when scrolled into view
        if (this.modules.image) {
            this.modules.image.checkVisibility();
        }
    }
    
    updateProgressBar(scrollY) {
        const progressBar = document.querySelector('.progress-bar');
        if (!progressBar) return;
        
        const winScroll = scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }
    
    toggleBackToTop(scrollY) {
        const toTopBtn = document.getElementById('toTop');
        if (!toTopBtn) return;
        
        if (scrollY > 500) {
            toTopBtn.classList.add('visible');
        } else {
            toTopBtn.classList.remove('visible');
        }
    }
    
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            this.updateResponsiveElements();
            
            if (window.innerWidth > 992 && this.state.isMenuOpen) {
                this.toggleMobileMenu();
            }
        }, 250);
    }
    
    updateResponsiveElements() {
        // Update any responsive elements
        const screenWidth = window.innerWidth;
        
        // Update grid columns based on screen size
        this.updateGridColumns(screenWidth);
        
        // Update font sizes
        this.updateFontSizes(screenWidth);
    }
    
    updateGridColumns(screenWidth) {
        const moviesGrid = document.querySelector('.movies-grid');
        if (!moviesGrid) return;
        
        let columns = 4;
        if (screenWidth < 992) columns = 3;
        if (screenWidth < 768) columns = 2;
        if (screenWidth < 576) columns = 1;
        
        moviesGrid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    }
    
    handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        
        // Validate form
        if (!this.validateForm(form)) return;
        
        // Submit form
        this.submitForm(form);
    }
    
    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                this.showError(input, 'هذا الحقل مطلوب');
                isValid = false;
            } else {
                this.clearError(input);
            }
        });
        
        return isValid;
    }
    
    async submitForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
            // Show loading state
            this.setFormLoading(form, true);
            
            // Submit to server (or simulate)
            await this.sendFormData(form.action, data);
            
            // Show success message
            this.showFormSuccess(form);
            
            // Reset form
            form.reset();
            
            // Track analytics
            if (this.modules.analytics) {
                this.modules.analytics.trackEvent('form_submit', {
                    form_id: form.id || form.className,
                    ...data
                });
            }
            
        } catch (error) {
            this.showFormError(form, error.message);
        } finally {
            this.setFormLoading(form, false);
        }
    }
    
    toggleMobileMenu() {
        this.state.isMenuOpen = !this.state.isMenuOpen;
        const menu = document.getElementById('mobileMenu');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (menu && toggle) {
            if (this.state.isMenuOpen) {
                menu.style.display = 'block';
                menu.setAttribute('aria-hidden', 'false');
                toggle.setAttribute('aria-expanded', 'true');
                setTimeout(() => {
                    menu.style.transform = 'translateX(0)';
                }, 10);
            } else {
                menu.style.transform = 'translateX(100%)';
                menu.setAttribute('aria-hidden', 'true');
                toggle.setAttribute('aria-expanded', 'false');
                setTimeout(() => {
                    menu.style.display = 'none';
                }, 300);
            }
        }
    }
    
    openModal(content) {
        this.state.isModalOpen = true;
        const modal = document.getElementById('movieModal');
        
        if (modal) {
            modal.style.display = 'flex';
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            // Set content
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody && content) {
                modalBody.innerHTML = content;
            }
            
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        }
    }
    
    closeModal() {
        this.state.isModalOpen = false;
        const modal = document.getElementById('movieModal');
        
        if (modal) {
            modal.style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                modal.setAttribute('aria-hidden', 'true');
            }, 300);
        }
    }
    
    hideLoader() {
        const loader = document.getElementById('criticalLoader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }
    
    trackPerformance() {
        // Collect performance metrics
        this.state.performanceMetrics = {
            loadTime: performance.now(),
            memory: performance.memory,
            timing: performance.timing
        };
        
        // Send to analytics
        if (this.modules.analytics) {
            this.modules.analytics.trackPerformance(this.state.performanceMetrics);
        }
    }
    
    handleError(error) {
        console.error('Application Error:', error);
        
        // Send to error tracking
        if (this.modules.analytics) {
            this.modules.analytics.trackError(error);
        }
        
        // Show user-friendly error message
        this.showErrorMessage('حدث خطأ غير متوقع. يرجى تحديث الصفحة.');
    }
    
    handlePromiseRejection(event) {
        console.error('Unhandled Promise Rejection:', event.reason);
        this.handleError(event.reason);
    }
    
    // Utility methods
    async fetchData(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return await response.json();
    }
    
    showError(element, message) {
        // Add error class
        element.classList.add('error');
        
        // Show error message
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }
        errorElement.textContent = message;
    }
    
    clearError(element) {
        element.classList.remove('error');
        const errorElement = element.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }
    
    setFormLoading(form, isLoading) {
        const button = form.querySelector('button[type="submit"]');
        if (button) {
            button.disabled = isLoading;
            button.innerHTML = isLoading ? 
                '<span class="spinner"></span> جاري الإرسال...' : 
                button.dataset.originalText || button.textContent;
        }
    }
    
    showFormSuccess(form) {
        const successElement = document.createElement('div');
        successElement.className = 'alert alert-success';
        successElement.innerHTML = '<i class="fas fa-check-circle"></i> تم الإرسال بنجاح!';
        form.prepend(successElement);
        
        setTimeout(() => {
            successElement.remove();
        }, 5000);
    }
    
    showFormError(form, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'alert alert-error';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        form.prepend(errorElement);
        
        setTimeout(() => {
            errorElement.remove();
        }, 5000);
    }
    
    showErrorMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'notification notification-error';
        notification.textContent = message;
        notification.setAttribute('role', 'alert');
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.G_E_8_App = new G_E_8App();
});