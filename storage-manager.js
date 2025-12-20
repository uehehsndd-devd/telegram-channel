// ===== ADVANCED STORAGE MANAGEMENT MODULE =====

class StorageModule {
    constructor() {
        this.prefix = 'ge8_';
        this.cache = new Map();
        this.quota = 50 * 1024 * 1024; // 50MB limit
        this.init();
    }
    
    async init() {
        console.log('💾 Storage Module Initializing...');
        
        // Check storage availability
        this.checkStorageSupport();
        
        // Clean old data
        await this.cleanup();
        
        // Setup storage listener
        this.setupStorageListener();
        
        // Monitor storage usage
        this.monitorUsage();
        
        console.log('✅ Storage Module Initialized');
    }
    
    checkStorageSupport() {
        this.supports = {
            localStorage: this.testLocalStorage(),
            sessionStorage: this.testSessionStorage(),
            indexedDB: 'indexedDB' in window,
            cache: 'caches' in window
        };
        
        console.log('Storage Support:', this.supports);
    }
    
    testLocalStorage() {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    testSessionStorage() {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    }
    
    async set(key, value, options = {}) {
        const config = {
            ttl: options.ttl || 7 * 24 * 60 * 60 * 1000, // 7 days default
            priority: options.priority || 'medium',
            compress: options.compress !== false
        };
        
        const item = {
            value: this.compressData(value, config.compress),
            meta: {
                created: Date.now(),
                expires: Date.now() + config.ttl,
                priority: config.priority,
                size: this.calculateSize(value),
                version: '1.0'
            }
        };
        
        // Store in cache (always)
        this.cache.set(key, item);
        
        // Store in appropriate storage
        await this.persistData(key, item, config);
        
        return true;
    }
    
    async get(key) {
        // Check cache first
        if (this.cache.has(key)) {
            const cached = this.cache.get(key);
            if (!this.isExpired(cached)) {
                return this.decompressData(cached.value);
            }
            this.cache.delete(key);
        }
        
        // Try to load from storage
        const item = await this.retrieveData(key);
        
        if (!item) return null;
        
        if (this.isExpired(item)) {
            await this.delete(key);
            return null;
        }
        
        // Update cache
        this.cache.set(key, item);
        
        return this.decompressData(item.value);
    }
    
    async delete(key) {
        this.cache.delete(key);
        
        // Delete from all storage backends
        await Promise.all([
            this.deleteFromLocalStorage(key),
            this.deleteFromIndexedDB(key),
            this.deleteFromCacheAPI(key)
        ]);
    }
    
    async cleanup() {
        const now = Date.now();
        const toDelete = [];
        
        // Clean cache
        for (const [key, item] of this.cache) {
            if (this.isExpired(item)) {
                toDelete.push(key);
            }
        }
        
        // Clean localStorage
        if (this.supports.localStorage) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(this.prefix)) {
                    try {
                        const item = JSON.parse(localStorage.getItem(key));
                        if (item && this.isExpired(item)) {
                            toDelete.push(key.replace(this.prefix, ''));
                        }
                    } catch (e) {
                        // Invalid JSON, delete it
                        localStorage.removeItem(key);
                    }
                }
            }
        }
        
        // Delete expired items
        await Promise.all(toDelete.map(key => this.delete(key)));
        
        // Check quota and clean if needed
        await this.enforceQuota();
    }
    
    async enforceQuota() {
        const usage = await this.getUsage();
        
        if (usage.total > this.quota) {
            console.warn(`Storage quota exceeded: ${Math.round(usage.total / 1024 / 1024)}MB`);
            await this.cleanLowPriority();
        }
    }
    
    async cleanLowPriority() {
        const items = await this.getAllItems();
        
        // Sort by priority and age
        items.sort((a, b) => {
            const priorityOrder = { low: 0, medium: 1, high: 2 };
            const aScore = priorityOrder[a.meta.priority] + (Date.now() - a.meta.created) / (1000 * 60 * 60 * 24);
            const bScore = priorityOrder[b.meta.priority] + (Date.now() - b.meta.created) / (1000 * 60 * 60 * 24);
            return aScore - bScore;
        });
        
        // Delete low priority items until under quota
        let deletedSize = 0;
        const targetSize = this.quota * 0.8; // Target 80% of quota
        
        for (const item of items) {
            if (await this.getUsage().total <= targetSize) break;
            
            deletedSize += item.meta.size;
            await this.delete(item.key);
        }
        
        console.log(`Cleaned ${Math.round(deletedSize / 1024)}KB of low priority data`);
    }
    
    async getUsage() {
        let total = 0;
        const breakdown = {};
        
        // Calculate cache usage
        let cacheSize = 0;
        for (const item of this.cache.values()) {
            cacheSize += item.meta.size;
        }
        breakdown.cache = cacheSize;
        total += cacheSize;
        
        // Calculate localStorage usage
        if (this.supports.localStorage) {
            let lsSize = 0;
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(this.prefix)) {
                    lsSize += (localStorage.getItem(key) || '').length * 2; // Approx UTF-16
                }
            }
            breakdown.localStorage = lsSize;
            total += lsSize;
        }
        
        return { total, breakdown };
    }
    
    async getAllItems() {
        const items = [];
        
        // Get from cache
        for (const [key, item] of this.cache) {
            items.push({ key, ...item });
        }
        
        // Get from localStorage
        if (this.supports.localStorage) {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith(this.prefix)) {
                    try {
                        const item = JSON.parse(localStorage.getItem(key));
                        items.push({ 
                            key: key.replace(this.prefix, ''), 
                            ...item 
                        });
                    } catch (e) {
                        // Skip invalid items
                    }
                }
            }
        }
        
        return items;
    }
    
    // Storage backend methods
    async persistData(key, item, config) {
        const fullKey = this.prefix + key;
        
        // Always store in localStorage if available
        if (this.supports.localStorage) {
            try {
                localStorage.setItem(fullKey, JSON.stringify(item));
            } catch (e) {
                console.warn('localStorage full, falling back to other storage');
                await this.persistToIndexedDB(key, item);
            }
        }
        
        // Store high priority items in multiple backends
        if (config.priority === 'high') {
            await Promise.all([
                this.persistToIndexedDB(key, item),
                this.persistToCacheAPI(key, item)
            ]);
        }
    }
    
    async retrieveData(key) {
        const fullKey = this.prefix + key;
        
        // Try localStorage first
        if (this.supports.localStorage) {
            try {
                const data = localStorage.getItem(fullKey);
                if (data) return JSON.parse(data);
            } catch (e) {
                console.warn('Error reading from localStorage:', e);
            }
        }
        
        // Try indexedDB
        try {
            const data = await this.retrieveFromIndexedDB(key);
            if (data) return data;
        } catch (e) {
            console.warn('Error reading from indexedDB:', e);
        }
        
        return null;
    }
    
    async persistToIndexedDB(key, item) {
        if (!this.supports.indexedDB) return;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('G_E_8_Storage', 1);
            
            request.onerror = reject;
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('cache')) {
                    db.createObjectStore('cache', { keyPath: 'key' });
                }
            };
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                const transaction = db.transaction('cache', 'readwrite');
                const store = transaction.objectStore('cache');
                
                const dbItem = {
                    key: this.prefix + key,
                    data: item,
                    timestamp: Date.now()
                };
                
                const putRequest = store.put(dbItem);
                putRequest.onsuccess = resolve;
                putRequest.onerror = reject;
            };
        });
    }
    
    async retrieveFromIndexedDB(key) {
        if (!this.supports.indexedDB) return null;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('G_E_8_Storage', 1);
            
            request.onerror = reject;
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                
                // Check if store exists
                if (!db.objectStoreNames.contains('cache')) {
                    resolve(null);
                    return;
                }
                
                const transaction = db.transaction('cache', 'readonly');
                const store = transaction.objectStore('cache');
                const getRequest = store.get(this.prefix + key);
                
                getRequest.onsuccess = () => {
                    resolve(getRequest.result?.data || null);
                };
                
                getRequest.onerror = reject;
            };
        });
    }
    
    async deleteFromIndexedDB(key) {
        if (!this.supports.indexedDB) return;
        
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('G_E_8_Storage', 1);
            
            request.onerror = reject;
            
            request.onsuccess = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('cache')) {
                    resolve();
                    return;
                }
                
                const transaction = db.transaction('cache', 'readwrite');
                const store = transaction.objectStore('cache');
                const deleteRequest = store.delete(this.prefix + key);
                
                deleteRequest.onsuccess = resolve;
                deleteRequest.onerror = reject;
            };
        });
    }
    
    async persistToCacheAPI(key, item) {
        if (!this.supports.cache) return;
        
        try {
            const cache = await caches.open('G_E_8_Storage');
            const response = new Response(JSON.stringify(item));
            await cache.put(`/cache/${key}`, response);
        } catch (e) {
            console.warn('Error storing in Cache API:', e);
        }
    }
    
    async deleteFromCacheAPI(key) {
        if (!this.supports.cache) return;
        
        try {
            const cache = await caches.open('G_E_8_Storage');
            await cache.delete(`/cache/${key}`);
        } catch (e) {
            // Ignore errors
        }
    }
    
    // Utility methods
    compressData(data, shouldCompress) {
        if (!shouldCompress) return data;
        
        // Simple compression for strings
        if (typeof data === 'string' && data.length > 100) {
            try {
                return LZString.compressToUTF16(data);
            } catch (e) {
                return data;
            }
        }
        
        return data;
    }
    
    decompressData(data) {
        if (typeof data === 'string' && data.startsWith('Ỉ')) {
            try {
                return LZString.decompressFromUTF16(data);
            } catch (e) {
                return data;
            }
        }
        
        return data;
    }
    
    calculateSize(data) {
        if (typeof data === 'string') {
            return data.length * 2; // UTF-16
        }
        
        try {
            return JSON.stringify(data).length * 2;
        } catch (e) {
            return 1024; // Default 1KB
        }
    }
    
    isExpired(item) {
        return Date.now() > item.meta.expires;
    }
    
    setupStorageListener() {
        // Listen for storage events (cross-tab communication)
        window.addEventListener('storage', (event) => {
            if (event.key?.startsWith(this.prefix)) {
                const key = event.key.replace(this.prefix, '');
                
                if (event.newValue) {
                    try {
                        const item = JSON.parse(event.newValue);
                        this.cache.set(key, item);
                    } catch (e) {
                        this.cache.delete(key);
                    }
                } else {
                    this.cache.delete(key);
                }
                
                // Notify app about storage change
                document.dispatchEvent(new CustomEvent('storageChanged', {
                    detail: { key, value: event.newValue }
                }));
            }
        });
    }
    
    monitorUsage() {
        // Monitor storage usage periodically
        setInterval(async () => {
            const usage = await this.getUsage();
            const percent = (usage.total / this.quota) * 100;
            
            if (percent > 80) {
                console.warn(`Storage usage: ${percent.toFixed(1)}%`);
                await this.enforceQuota();
            }
        }, 60000); // Check every minute
    }
}