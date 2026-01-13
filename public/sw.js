const CACHE_NAME = "nextjs-pwa-cache-v1";
const urlsToCache = ["/", "/arfat", "/offline.html"];

self.addEventListener("install", (event) => {
  console.log("Service Worker: Installed");

  // caching web data in offline
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting(); // Activate immediately
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
      )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() =>
        caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          // Fallback for non-cached pages
          return caches.match("/offline.html");
        })
      )
  );
});
