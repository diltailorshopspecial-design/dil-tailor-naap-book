// Dil Tailor Shop - Service Worker - MUKAMMAL FINAL V17
// Ye file offline ke liye hai - Is me HTML nahi likhna

var CACHE_NAME = 'dil-tailor-v17';
var FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './logo.jpg'
];

// 1. Install - Pehli baar app ko save karo
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_TO_CACHE);
    }).then(function() {
      return self.skipWaiting();
    }).catch(function(err) {
      console.log('Cache fail, phir bhi app chalega: ' + err);
    })
  );
});

// 2. Activate - Purana V16 wala cache delete karo
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.map(function(key) {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// 3. Fetch - Net ho to net se, net na ho to cache se
self.addEventListener('fetch', function(event) {
  if (event.request.method !== 'GET') {
    return;
  }
  // Drive / Google wali request ko cache mat karo
  if (event.request.url.indexOf('script.google.com') !== -1) {
    return;
  }
  if (event.request.url.indexOf('googleapis') !== -1) {
    return;
  }

  event.respondWith(
    fetch(event.request).then(function(response) {
      var copy = response.clone();
      if (response.status === 200) {
        caches.open(CACHE_NAME).then(function(cache) {
          cache.put(event.request, copy);
        });
      }
      return response;
    }).catch(function() {
      return caches.match(event.request).then(function(cached) {
        if (cached) {
          return cached;
        }
        return caches.match('./index.html');
      });
    })
  );
});
