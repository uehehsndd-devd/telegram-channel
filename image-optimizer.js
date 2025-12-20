// ===== IMAGE OPTIMIZATION MODULE =====

class ImageModule {
    constructor() {
        this.supportsWebP = null;
        this.observers = new Map();
        this.placeholderCache = new Map();
        this.init();
    }
    
    async init() {
        console.log('🖼️ Image Module Initializing...');
        
        // Check WebP support
        await this.checkWebPSupport();
        
        // Optimize existing images
        this.optimizeImages();
        
        // Setup lazy loading
        this.setupLazyLoading();
        
        // Generate placeholders
        this.generatePlaceholders();
        
        // Monitor image loading
        this.monitorImageLoading();
        
        console.log('✅ Image Module Initialized');
    }
    
    async checkWebPSupport() {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                this.supportsWebP = true;
                resolve(true);
            };
            img.onerror = () => {
                this.supportsWebP = false;
                resolve(false);
            };
            img.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
        });
    }
    
    optimizeImages() {
        const images = document.querySelectorAll('img:not([data-optimized])');
        
        images.forEach(img => {
            this.optimizeImage(img);
            img.dataset.optimized = 'true';
        });
    }
    
    optimizeImage(img) {
        // Skip if already optimized or is a data URL
        if (img.dataset.optimized || img.src.startsWith('data:')) return;
        
        const src = img.src || img.dataset.src;
        if (!src) return;
        
        // Add loading attribute if not present
        if (!img.loading) {
            img.loading = 'lazy';
        }
        
        // Add decoding attribute
        if (!img.decoding) {
            img.decoding = 'async';
        }
        
        // Add dimensions if missing
        if (!img.width || !img.height) {
            this.addImageDimensions(img);
        }
        
        // Convert to WebP if supported
        if (this.supportsWebP && this.shouldConvertToWebP(src)) {
            this.convertToWebP(img, src);
        }
        
        // Add srcset for responsive images
        if (!img.srcset && this.shouldAddSrcSet(img)) {
            this.addSrcSet(img, src);
        }
    }
    
    shouldConvertToWebP(src) {
        // Check if image is from Unsplash (supports WebP)
        if (src.includes('unsplash.com')) {
            return true;
        }
        
        // Check file extension
        const extensions = ['.jpg', '.jpeg', '.png'];
        return extensions.some(ext => src.toLowerCase().includes(ext));
    }
    
    convertToWebP(img, originalSrc) {
        // For Unsplash images, add WebP format
        if (originalSrc.includes('unsplash.com')) {
            const webpSrc = originalSrc.replace(/auto=format/, 'auto=webp');
            if (img.src === originalSrc) {
                img.src = webpSrc;
            }
            if (img.dataset.src === originalSrc) {
                img.dataset.src = webpSrc;
            }
        }
        
        // For other images, we could use a proxy service
        // This is just a placeholder for implementation
    }
    
    shouldAddSrcSet(img) {
        // Only add srcset for larger images
        const minWidth = 400;
        return img.naturalWidth > minWidth || 
               img.dataset.width > minWidth || 
               img.width > minWidth;
    }
    
    addSrcSet(img, src) {
        const srcset = [];
        const widths = [400, 800, 1200, 1600];
        
        widths.forEach(width => {
            if (width <= (img.naturalWidth || img.width)) {
                const url = this.generateResponsiveUrl(src, width);
                srcset.push(`${url} ${width}w`);
            }
        });
        
        if (srcset.length > 1) {
            img.srcset = srcset.join(', ');
            
            // Add sizes attribute
            if (!img.sizes) {
                img.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
            }
        }
    }
    
    generateResponsiveUrl(src, width) {
        // For Unsplash images
        if (src.includes('unsplash.com')) {
            const quality = width <= 800 ? 75 : 85;
            const params = new URLSearchParams({
                auto: 'format',
                fit: 'crop',
                w: width,
                q: quality
            });
            
            return `${src.split('?')[0]}?${params.toString()}`;
        }
        
        // For other images, could use a CDN or image processing service
        return src;
    }
    
    addImageDimensions(img) {
        // Try to extract from data attributes
        if (img.dataset.width && img.dataset.height) {
            img.width = parseInt(img.dataset.width);
            img.height = parseInt(img.dataset.height);
            return;
        }
        
        // Try to extract from natural dimensions
        if (img.naturalWidth && img.naturalHeight) {
            img.width = img.naturalWidth;
            img.height = img.naturalHeight;
            return;
        }
        
        // Set placeholder dimensions
        img.width = 400;
        img.height = 300;
    }
    
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            // Observe all lazy images
            document.querySelectorAll('img[data-src], img[loading="lazy"]').forEach(img => {
                imageObserver.observe(img);
            });
            
            this.observers.set('images', imageObserver);
        }
    }
    
    async loadImage(img) {
        const src = img.dataset.src || img.src;
        if (!src) return;
        
        // Show placeholder if available
        this.showPlaceholder(img);
        
        try {
            // Preload image
            await this.preloadImage(src);
            
            // Set src and remove data-src
            img.src = src;
            delete img.dataset.src;
            
            // Add loaded class for styling
            img.classList.add('loaded');
            
            // Fade in image
            this.fadeInImage(img);
            
            // Track image load
            this.trackImageLoad(img);
            
        } catch (error) {
            console.error('Error loading image:', src, error);
            this.handleImageError(img, error);
        }
    }
    
    async preloadImage(src) {
        return new Promise((resolve, reject) => {
            const preload = new Image();
            preload.src = src;
            
            preload.onload = () => resolve(preload);
            preload.onerror = reject;
        });
    }
    
    showPlaceholder(img) {
        // Check if we have a cached placeholder
        const placeholderKey = img.dataset.placeholderKey || img.src;
        
        if (this.placeholderCache.has(placeholderKey)) {
            const placeholder = this.placeholderCache.get(placeholderKey);
            img.style.backgroundImage = `url(${placeholder})`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
        } else {
            // Generate low-quality placeholder
            this.generateLowQualityPlaceholder(img);
        }
    }
    
    generateLowQualityPlaceholder(img) {
        // Create a tiny version of the image for placeholder
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = 10;
        canvas.height = 7;
        
        // Fill with average color or gradient
        ctx.fillStyle = '#1a1a2e';
        ctx.fillRect(0, 0, 10, 7);
        
        const placeholder = canvas.toDataURL('image/jpeg', 0.1);
        this.placeholderCache.set(img.src, placeholder);
        
        img.style.backgroundImage = `url(${placeholder})`;
        img.style.backgroundSize = 'cover';
        img.style.backgroundPosition = 'center';
    }
    
    fadeInImage(img) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            img.style.opacity = '1';
        }, 50);
    }
    
    trackImageLoad(img) {
        const loadTime = performance.now() - performance.getEntriesByName(img.src)[0]?.startTime || 0;
        
        // Log performance
        console.log(`Image loaded: ${img.src} (${Math.round(loadTime)}ms)`);
        
        // Send to analytics
        if (window.gtag) {
            gtag('event', 'image_load', {
                load_time: Math.round(loadTime),
                image_size: img.naturalWidth + 'x' + img.naturalHeight,
                event_category: 'Performance'
            });
        }
    }
    
    handleImageError(img, error) {
        img.classList.add('error');
        
        // Try fallback image
        if (img.dataset.fallback) {
            img.src = img.dataset.fallback;
        }
        
        // Show error icon
        const errorIcon = document.createElement('div');
        errorIcon.className = 'image-error';
        errorIcon.innerHTML = '<i class="fas fa-image"></i>';
        img.parentNode.insertBefore(errorIcon, img.nextSibling);
    }
    
    generatePlaceholders() {
        // Generate SVG placeholders for critical images
        const criticalImages = document.querySelectorAll('.hero-image, .movie-poster');
        
        criticalImages.forEach(img => {
            if (!img.src && !img.dataset.src) return;
            
            const placeholder = this.createSVGPlaceholder(img);
            img.style.backgroundImage = `url(${placeholder})`;
            img.style.backgroundSize = 'cover';
            img.style.backgroundPosition = 'center';
        });
    }
    
    createSVGPlaceholder(img) {
        const width = img.width || 400;
        const height = img.height || 300;
        
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
                <rect width="100%" height="100%" fill="#1a1a2e"/>
                <rect x="${width * 0.3}" y="${height * 0.4}" width="${width * 0.4}" height="2" fill="#08D9D6" opacity="0.5"/>
                <rect x="${width * 0.4}" y="${height * 0.45}" width="${width * 0.2}" height="2" fill="#FF2E63" opacity="0.5"/>
                <text x="50%" y="50%" text-anchor="middle" fill="white" opacity="0.3" font-family="Arial" font-size="20">G_E_8</text>
            </svg>
        `;
        
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    }
    
    monitorImageLoading() {
        // Monitor image loading performance
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.initiatorType === 'img') {
                        this.logImagePerformance(entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['resource'] });
            this.observers.set('performance', observer);
        }
    }
    
    logImagePerformance(entry) {
        const metrics = {
            name: entry.name,
            duration: entry.duration,
            transferSize: entry.transferSize,
            decodedBodySize: entry.decodedBodySize,
            startTime: entry.startTime
        };
        
        // Warn about large images
        if (entry.transferSize > 500000) { // > 500KB
            console.warn(`Large image: ${entry.name} (${Math.round(entry.transferSize / 1024)}KB)`);
        }
        
        // Store for analytics
        if (window.G_E_8_App?.modules?.analytics) {
            window.G_E_8_App.modules.analytics.trackImageLoad(metrics);
        }
    }
    
    checkVisibility() {
        // Check if any lazy images are now visible
        if (this.observers.has('images')) {
            // Force check (some browsers need this)
            this.observers.get('images').takeRecords();
        }
    }
    
    destroy() {
        // Clean up observers
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
    }
}