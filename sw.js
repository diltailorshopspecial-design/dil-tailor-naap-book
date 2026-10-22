const CACHE_NAME = 'dil-tailor-V10-FINAL-5-EMAIL';
self.addEventListener('install', e=>{self.skipWaiting()});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(k=>Promise.all(k.map(x=>caches.delete(x)))));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));
});
