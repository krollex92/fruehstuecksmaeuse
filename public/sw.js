// Minimal service worker for PWA installability
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Online only, just pass through
  event.respondWith(fetch(event.request));
});
