self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("mgnrega-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/locales/en.json",
        "/locales/hi.json",
        "/index.html",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
