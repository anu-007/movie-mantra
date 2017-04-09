var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  'src/css/style.css',
  'src/images/icons/icon-72x72.png',
  'src/images/icons/icon-96x96.png',
  'src/images/icons/icon-128x128.png',
  'src/images/icons/icon-144x144.png',
  'src/images/icons/icon-152x152.png',
  'src/images/icons/icon-192x192.png',
  'src/images/icons/icon-384x384.png',
  'src/images/icons/icon-512x512.png',
  'src/js/jquery-3.1.0.js',
  'src/js/main.js'
];

self.addEventListener('install', function(event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        var fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          function(response) {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
