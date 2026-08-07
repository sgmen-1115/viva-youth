const CACHE_NAME = "app-cache-v2026-07-22-2";
const urlsToCache = [
	"./",
	"./index.html",
	"./believe-project.html",
	"./manifest.json",
	"./icon192.jpg",
	"./icon512.jpg",
];

self.addEventListener("install", (event) => {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then((cache) => cache.addAll(urlsToCache))
			.then(() => self.skipWaiting())
	);
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
			fetch(event.request).catch(() => caches.match("./index.html"))
		);
	}
});
