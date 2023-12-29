const CACHE_NAME = "sesc-votes";
const urlsToCache = [
  "/",
  "/index.html",
  "/404.html",
  "/presentation",
  "/docs/about-us",
  "/docs/environment",
  "/docs/vote",
  "/docs/teacher",
  "/assets/logo.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request)
          .then((fetchResponse) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          })
          .catch(() => {
            return caches.match("/offline.html");
          })
      );
    })
  );
});
