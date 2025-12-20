// ===== PERFORMANCE OPTIMIZATION MODULE =====

class PerformanceModule {
    constructor() {
        this.metrics = new Map();
        this.observers = [];
        this.init();
    }
    
    async init() {
        console.log('⚡ Performance Module Initializing...');
        
        // Setup performance monitoring
        this.setupPerformanceObserver();
        
        // Optimize critical resources
        this.optimizeCriticalResources();
        
        // Setup resource timing
        this.setupResourceTiming();
        
        // Monitor memory usage
        this.monitorMemory();
        
        console.log('✅ Performance Module Initialized');
    }
    
    setupPerformanceObserver() {
        if ('PerformanceObserver' in window) {
            // LCP (Largest Contentful Paint)
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.metrics.set('lcp', lastEntry.startTime);
                this.logMetric('LCP', lastEntry.startTime);
            });
            lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
            this.observers.push(lcpObserver);
            
            // FID (First Input Delay)
            const fidObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                entries.forEach(entry => {
                    this.metrics.set('fid', entry.processingStart - entry.startTime);
                    this.logMetric('FID', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ type: 'first-input', buffered: true });
            this.observers.push(fidObserver);
            
            // CLS (Cumulative Layout Shift)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((entryList) => {
                entryList.getEntries().forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                });
                this.metrics.set('cls', clsValue);
                this.logMetric('CLS', clsValue);
            });
            clsObserver.observe({ type: 'layout-shift', buffered: true });
            this.observers.push(clsObserver);
            
            // FCP (First Contentful Paint)
            const fcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                const fcp = entries[0].startTime;
                this.metrics.set('fcp', fcp);
                this.logMetric('FCP', fcp);
            });
            fcpObserver.observe({ type: 'paint', buffered: true });
            this.observers.push(fcpObserver);
        }
    }
    
    optimizeCriticalResources() {
        // Preconnect to critical origins
        this.preconnectOrigins([
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://images.unsplash.com',
            'https://cdnjs.cloudflare.com'
        ]);
        
        // Preload critical resources
        this.preloadResources([
            { href: '/assets/css/critical.css', as: 'style' },
            { href: 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap', as: 'style', crossorigin: true },
            { href: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800', as: 'image', crossorigin: true }
        ]);
        
        // Lazy load non-critical resources
        this.lazyLoadNonCritical();
    }
    
    preconnectOrigins(origins) {
        origins.forEach(origin => {
            const link = document.createElement('link');
            link.rel = 'preconnect';
            link.href = origin;
            if (origin.includes('fonts.gstatic.com')) {
                link.crossOrigin = 'anonymous';
            }
            document.head.appendChild(link);
        });
    }
    
    preloadResources(resources) {
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.crossorigin) link.crossOrigin = 'anonymous';
            if (resource.type) link.type = resource.type;
            document.head.appendChild(link);
        });
    }
    
    lazyLoadNonCritical() {
        // Images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Scripts
        const lazyScripts = [
            'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.0/vanilla-tilt.min.js',
            'https://unpkg.com/aos@2.3.1/dist/aos.js'
        ];
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                lazyScripts.forEach(src => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.crossOrigin = 'anonymous';
                    script.defer = true;
                    document.body.appendChild(script);
                });
            }, 2000);
        });
    }
    
    setupResourceTiming() {
        // Monitor resource loading times
        if ('PerformanceObserver' in window) {
            const resourceObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.initiatorType === 'script' || entry.initiatorType === 'css') {
                        this.logResourceTiming(entry);
                    }
                });
            });
            resourceObserver.observe({ entryTypes: ['resource'] });
            this.observers.push(resourceObserver);
        }
    }
    
    monitorMemory() {
        // Browser memory monitoring (Chrome only)
        if (performance.memory) {
            setInterval(() => {
                const memory = performance.memory;
                this.metrics.set('memory_used', memory.usedJSHeapSize);
                this.metrics.set('memory_total', memory.totalJSHeapSize);
                this.metrics.set('memory_limit', memory.jsHeapSizeLimit);
                
                // Warn if memory usage is high
                const usagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
                if (usagePercent > 80) {
                    console.warn(`High memory usage: ${usagePercent.toFixed(1)}%`);
                    this.triggerMemoryCleanup();
                }
            }, 10000); // Check every 10 seconds
        }
    }
    
    triggerMemoryCleanup() {
        // Clean up cached data
        if (window.G_E_8_App?.modules?.storage) {
            window.G_E_8_App.modules.storage.cleanup();
        }
        
        // Force garbage collection (if available)
        if (window.gc) {
            window.gc();
        }
    }
    
    logMetric(name, value) {
        console.log(`📊 ${name}: ${value.toFixed(2)}ms`);
        
        // Send to analytics
        if (window.gtag) {
            gtag('event', 'performance_metric', {
                metric_name: name.toLowerCase(),
                metric_value: Math.round(value),
                event_category: 'Performance'
            });
        }
        
        // Store in localStorage for debugging
        const metrics = JSON.parse(localStorage.getItem('performance_metrics') || '{}');
        metrics[name.toLowerCase()] = {
            value: Math.round(value),
            timestamp: Date.now()
        };
        localStorage.setItem('performance_metrics', JSON.stringify(metrics));
    }
    
    logResourceTiming(entry) {
        const timing = {
            name: entry.name,
            duration: entry.duration,
            initiatorType: entry.initiatorType,
            transferSize: entry.transferSize,
            decodedBodySize: entry.decodedBodySize
        };
        
        // Log large resources
        if (entry.transferSize > 100000) { // > 100KB
            console.warn(`Large resource loaded: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
        }
        
        this.metrics.set(`resource_${entry.name}`, timing);
    }
    
    getMetrics() {
        return Object.fromEntries(this.metrics);
    }
    
    getScore() {
        const scores = {
            lcp: this.getLCPScore(),
            fid: this.getFIDScore(),
            cls: this.getCLSScore()
        };
        
        return {
            scores,
            overall: Math.round((scores.lcp + scores.fid + scores.cls) / 3)
        };
    }
    
    getLCPScore() {
        const lcp = this.metrics.get('lcp') || 0;
        if (lcp < 2500) return 100;
        if (lcp < 4000) return 75;
        if (lcp < 6000) return 50;
        return 25;
    }
    
    getFIDScore() {
        const fid = this.metrics.get('fid') || 0;
        if (fid < 100) return 100;
        if (fid < 300) return 75;
        if (fid < 500) return 50;
        return 25;
    }
    
    getCLSScore() {
        const cls = this.metrics.get('cls') || 0;
        if (cls < 0.1) return 100;
        if (cls < 0.25) return 75;
        if (cls < 0.4) return 50;
        return 25;
    }
    
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}