var CACHE_NAME='dil-tailor-v19';
var URLS_TO_CACHE=['./','./index.html','./logo.jpg','./manifest.json'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE_NAME).then(function(c){return c.addAll(URLS_TO_CACHE);}).then(function(){return self.skipWaiting();}));});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(keys){return Promise.all(keys.map(function(k){if(k!==CACHE_NAME)return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(function(res){var copy=res.clone();caches.open(CACHE_NAME).then(function(c){c.put(e.request,copy);});return res;}).catch(function(){return caches.match(e.request);}));});
