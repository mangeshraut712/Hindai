/**
 * Hind AI Service Worker
 * PWA features: Offline support, background sync, push notifications
 */

const CACHE_NAME = "hind-ai-v1";
const STATIC_ASSETS = [
  "/",
  "/contents/",
  "/ai-guide/",
  "/quiz/",
  "/structure/",
  "/preface/",
  "/icon-192x192.png",
  "/icon-512x512.png",
];

// Install: Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Cache-first strategy
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip API calls
  if (event.request.url.includes("/api/")) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch new
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          // Cache successful responses
          if (fetchResponse.ok) {
            const clone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return fetchResponse;
        })
      );
    })
  );
});

// Background Sync for offline messages
self.addEventListener("sync", (event) => {
  if (event.tag === "send-message") {
    event.waitUntil(sendOfflineMessages());
  }
});

// Push Notifications
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Hind AI", {
      body: data.body || "Your daily wisdom is ready",
      icon: "/icon-192x192.png",
      badge: "/icon-72x72.png",
      tag: data.tag || "daily-wisdom",
      requireInteraction: true,
      actions: [
        { action: "open", title: "Read" },
        { action: "dismiss", title: "Later" },
      ],
    })
  );
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open") {
    event.waitUntil(
      self.clients.openWindow("/daily")
    );
  }
});

async function sendOfflineMessages() {
  // Implementation for background sync
  console.log("Processing offline messages...");
}
