const CACHE_NAME = 'dil-tailor-v8-final-offline';
const urlsToCache = [
  './',
  './index.html',
  './logo.jpg',
  './manifest.json'
];

// Install - Cache sab files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching files');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Fetch - Offline se serve karo
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Agar cache mein hai to cache se do
        if (response) {
          return response;
        }
        // Nahi to internet se lao
        return fetch(event.request);
      }
    )
  );
});

// Activate - Purane cache delete karo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
