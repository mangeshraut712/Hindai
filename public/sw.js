/**
 * Hind AI Service Worker
 * PWA features: Offline support, background sync, push notifications
 * Optimized for performance with aggressive caching
 */

const CACHE_NAME = "hind-ai-v3";
const STATIC_CACHE = "hind-ai-static-v3";
const DYNAMIC_CACHE = "hind-ai-dynamic-v3";

const STATIC_ASSETS = [
  "/",
  "/contents/",
  "/ai-guide/",
  "/vision/",
  "/dharma/",
  "/sanskrit-nova/",
  "/sanskrit-tools/",
  "/learning/",
  "/philosophies/",
  "/frameworks/",
  "/stotras/",
  "/panchanga/",
  "/pilgrimage/",
  "/audio/",
  "/daily/",
  "/quiz/",
  "/structure/",
  "/preface/",
  "/logo.png",
  "/manifest.json",
];

// Install: Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS.map((url) => new Request(url, { cache: "reload" })));
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
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch: Network-first for HTML, Cache-first for assets
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip API calls
  if (event.request.url.includes("/api/")) return;

  const url = new URL(event.request.url);

  // Stale-while-revalidate for HTML pages
  if (url.pathname.endsWith(".html") || url.pathname === "/" || url.pathname.includes("/")) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return response;
        });
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Cache-first for static assets with network fallback
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Update cache in background
        fetch(event.request).then((fetchResponse) => {
          if (fetchResponse.ok) {
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, fetchResponse);
            });
          }
        });
        return response;
      }

      return fetch(event.request).then((fetchResponse) => {
        // Cache successful responses
        if (fetchResponse.ok) {
          const clone = fetchResponse.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return fetchResponse;
      });
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
      icon: "/logo.png",
      badge: "/logo.png",
      tag: data.tag || "daily-wisdom",
      requireInteraction: false,
      actions: [
        { action: "open", title: "Read" },
        { action: "dismiss", title: "Later" },
      ],
      data: {
        url: data.url || "/daily",
      },
    })
  );
});

// Notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const url = event.notification.data?.url || "/daily";
    event.waitUntil(self.clients.openWindow(url));
  }
});

async function sendOfflineMessages() {
  // Implementation for background sync
  console.log("Processing offline messages...");
}
