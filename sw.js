const CACHE_NAME = "app-cache-v2026-04-16-1";
const urlsToCache = ['./index.html'];

self.addEventListener("install", (event) => {
self.skipWaiting();
});

self.addEventListener("activate", (event) => {
event.waitUntil(
caches.keys().then((keys) =>
Promise.all(
keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : Promise.resolve()))
)
).then(() => self.clients.claim())
);
});

self.addEventListener("fetch", (event) => {
if (event.request.mode === "navigate") {
event.respondWith(
fetch(event.request).catch(() => caches.match(event.request))
);
}
});
