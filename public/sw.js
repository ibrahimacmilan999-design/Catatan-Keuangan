const CACHE_NAME = "ckp-cache-v1";
const OFFLINE_URL = "/index.html";

// Saat pertama kali install, langsung aktif (tidak nunggu tab lama ditutup)
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(OFFLINE_URL).catch(() => {}))
  );
});

// Bersihkan cache versi lama saat ada update
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// Strategi: coba jaringan dulu, simpan ke cache; kalau offline, pakai cache.
// Untuk navigasi (buka halaman), fallback ke index.html yang tersimpan di cache.
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  // Permintaan navigasi (buka/refresh halaman)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          caches.open(CACHE_NAME).then((cache) => cache.put(OFFLINE_URL, response.clone()));
          return response;
        })
        .catch(() => caches.match(OFFLINE_URL))
    );
    return;
  }

  // Aset lain (JS, CSS, ikon, dll): cache-first, lalu update di background
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => cached);
      return cached || networkFetch;
    })
  );
});
