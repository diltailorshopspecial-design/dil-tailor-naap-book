var CACHE = 'dil-tailor-v12-final-offline';
var FILES = ['./', './index.html', './manifest.json', './logo.jpg'];
self.addEventListener('install', function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(FILES); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.map(function(k){ if(k !== CACHE) return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener('fetch', function(e){
  e.respondWith(caches.match(e.request).then(function(r){ return r || fetch(e.request); }));
});
