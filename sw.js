// ===== SERVICE WORKER FOR G_E_8 PWA =====

const CACHE_NAME = 'g-e-8-v2.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js',
  '/translations.json',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Service Worker
self.addEventListener('install', event => {
  console.log('🛠️ Service Worker Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('✅ Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('✅ Service Worker Installed');
        return self.skipWaiting();
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  console.log('🚀 Service Worker Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log(`🗑️ Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Service Worker Activated');
      return self.clients.claim();
    })
  );
});

// Fetch Strategy: Cache First, Network Fallback
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip Chrome extensions
  if (event.request.url.startsWith('chrome-extension://')) return;
  
  // Skip analytics
  if (event.request.url.includes('google-analytics.com')) return;
  
  // Handle different strategies based on URL
  const url = new URL(event.request.url);
  
  // API requests: Network First
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Static assets: Cache First
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cacheFirstStrategy(event.request));
    return;
  }
  
  // HTML pages: Network First
  if (event.request.headers.get('Accept')?.includes('text/html')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // Default: Cache First
  event.respondWith(cacheFirstStrategy(event.request));
});

// Cache First Strategy
async function cacheFirstStrategy(request) {
  const cache = await caches.open(CACHE_NAME);
  
  // Try cache first
  const cachedResponse = await cache.match(request);
  if (cachedResponse) {
    // Update cache in background
    updateCache(request);
    return cachedResponse;
  }
  
  // Try network
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, return offline page
    return createOfflineResponse(request);
  }
}

// Network First Strategy
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Update cache with fresh response
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cache, return offline page
    return createOfflineResponse(request);
  }
}

// Update cache in background
async function updateCache(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse);
    }
  } catch (error) {
    // Silently fail, keep cached version
  }
}

// Create offline response
function createOfflineResponse(request) {
  if (request.headers.get('Accept')?.includes('text/html')) {
    return caches.match('/offline.html')
      .then(response => response || new Response('You are offline'));
  }
  
  return new Response('Network error', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Background Sync
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('🔄 Background sync started');
    event.waitUntil(syncData());
  }
});

async function syncData() {
  // Implement background sync logic
  // This can sync form submissions, analytics, etc.
}

// Push Notifications
self.addEventListener('push', event => {
  const data = event.data?.json() || {
    title: 'G_E_8',
    body: 'محتوى جديد متاح!',
    icon: '/assets/icons/icon-192x192.png'
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: '/assets/icons/badge-72x72.png',
      vibrate: [200, 100, 200],
      data: data.data || {}
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Focus existing window or open new one
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});