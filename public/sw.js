/**
 * Hind AI Service Worker
 * PWA features: Offline support for the static GitHub Pages export.
 */

const STATIC_CACHE = "hind-ai-static-v7";
const DYNAMIC_CACHE = "hind-ai-dynamic-v7";

const SCOPE_BASE = self.location.pathname.replace(/\/sw\.js$/, "") || "";

const STATIC_ASSETS = [
  `${SCOPE_BASE}/`,
  `${SCOPE_BASE}/contents/`,
  `${SCOPE_BASE}/ai-guide/`,
  `${SCOPE_BASE}/vision/`,
  `${SCOPE_BASE}/dharma/`,
  `${SCOPE_BASE}/sanskrit-nova/`,
  `${SCOPE_BASE}/sanskrit-tools/`,
  `${SCOPE_BASE}/learning/`,
  `${SCOPE_BASE}/philosophies/`,
  `${SCOPE_BASE}/frameworks/`,
  `${SCOPE_BASE}/stotras/`,
  `${SCOPE_BASE}/panchanga/`,
  `${SCOPE_BASE}/pilgrimage/`,
  `${SCOPE_BASE}/festivals/`,
  `${SCOPE_BASE}/katha/`,
  `${SCOPE_BASE}/sadhana/`,
  `${SCOPE_BASE}/audio/`,
  `${SCOPE_BASE}/daily/`,
  `${SCOPE_BASE}/quiz/`,
  `${SCOPE_BASE}/structure/`,
  `${SCOPE_BASE}/preface/`,
  `${SCOPE_BASE}/logo.webp`,
  `${SCOPE_BASE}/manifest.json`,
  `${SCOPE_BASE}/ganeshotsav/`,
  `${SCOPE_BASE}/satyanarayan-puja/`,
  `${SCOPE_BASE}/offline-manifest.json`,
];

function cacheStaticAssets(cache) {
  return Promise.all(
    STATIC_ASSETS.map((url) =>
      cache.add(new Request(url, { cache: "reload" })).catch(() => undefined)
    )
  );
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(STATIC_CACHE).then(cacheStaticAssets));
  self.skipWaiting();
});

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

self.addEventListener("message", (event) => {
  if (event.data?.type !== "SAVE_OFFLINE_LIBRARY") return;
  event.waitUntil(
    (async () => {
      const client = event.source;
      const send = (payload) =>
        client?.postMessage({ type: "OFFLINE_LIBRARY_PROGRESS", ...payload });
      try {
        const response = await fetch(SCOPE_BASE + "/offline-manifest.json", { cache: "no-store" });
        if (!response.ok) throw new Error("The offline manifest is unavailable.");
        const manifest = await response.json();
        if (!Array.isArray(manifest.entries) || manifest.entries.length === 0) {
          throw new Error("The offline manifest is invalid.");
        }
        const cache = await caches.open(STATIC_CACHE);
        let cursor = 0;
        let saved = 0;
        let failed = 0;
        let full = false;
        const total = manifest.entries.length;
        send({ saved, failed, total, done: false });
        const worker = async () => {
          while (cursor < total && !full) {
            const entry = manifest.entries[cursor++];
            try {
              await cache.add(new Request(entry.url, { cache: "reload" }));
              saved += 1;
            } catch (error) {
              failed += 1;
              if (error?.name === "QuotaExceededError") full = true;
            }
            if ((saved + failed) % 10 === 0 || saved + failed === total || full) {
              send({ saved, failed, total, done: false, storageFull: full });
            }
          }
        };
        await Promise.all(Array.from({ length: 4 }, worker));
        send({ saved, failed, total, done: true, storageFull: full });
      } catch (error) {
        send({ saved: 0, failed: 0, total: 0, done: true, error: String(error) });
      }
    })()
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);
  if (url.pathname.includes("/api/")) return;
  if (url.origin !== self.location.origin) return;

  if (url.searchParams.has("_rsc")) {
    const rscPath = url.pathname.endsWith(".txt")
      ? url.pathname
      : url.pathname.replace(/\/$/, "") + "/index.txt";
    event.respondWith(
      fetch(new Request(rscPath, { cache: "no-store" }))
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            event.waitUntil(caches.open(STATIC_CACHE).then((cache) => cache.put(rscPath, clone)));
          }
          return response;
        })
        .catch(() =>
          caches
            .match(rscPath)
            .then(
              (cached) => cached ?? new Response("Offline", { status: 503, statusText: "Offline" })
            )
        )
    );
    return;
  }

  const isDocument = event.request.mode === "navigate" || event.request.destination === "document";

  if (isDocument) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            void caches.open(DYNAMIC_CACHE).then((cache) => {
              void cache.put(event.request, clone);
            });
          }
          return response;
        })
        .catch(() =>
          caches
            .match(event.request)
            .then(
              (cached) => cached ?? new Response("Offline", { status: 503, statusText: "Offline" })
            )
        )
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        void fetch(event.request)
          .then((fetchResponse) => {
            if (fetchResponse.ok) {
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(event.request, fetchResponse);
              });
            }
          })
          .catch(() => undefined);
        return response;
      }

      return fetch(event.request)
        .then((fetchResponse) => {
          if (fetchResponse.ok) {
            const clone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(event.request, clone);
            });
          }
          return fetchResponse;
        })
        .catch(() => new Response("Offline", { status: 503, statusText: "Offline" }));
    })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag === "send-message") {
    event.waitUntil(Promise.resolve());
  }
});

self.addEventListener("push", (event) => {
  const data = event.data?.json() || {};

  event.waitUntil(
    self.registration.showNotification(data.title || "Hind AI", {
      body: data.body || "Your daily wisdom is ready",
      icon: `${SCOPE_BASE}/logo.webp`,
      badge: `${SCOPE_BASE}/logo.webp`,
      tag: data.tag || "daily-wisdom",
      requireInteraction: false,
      actions: [
        { action: "open", title: "Read" },
        { action: "dismiss", title: "Later" },
      ],
      data: {
        url: data.url || `${SCOPE_BASE}/daily/`,
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "open" || !event.action) {
    const url = event.notification.data?.url || `${SCOPE_BASE}/daily/`;
    event.waitUntil(self.clients.openWindow(url));
  }
});
