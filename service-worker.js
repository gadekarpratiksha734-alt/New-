const CACHE_NAME = "pillcare-cache-v1";
const urlsToCache = [
"/",
"/index.html",
"/app.css",
"/app.js",
"/alarm_beep.wav",
"/alarm_chime.wav",
"/icon.png",
"/manifest.json"
];


// Install event: cache app shell
self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE_NAME)
.then(cache => cache.addAll(urlsToCache))
.then(() => self.skipWaiting())
);
});


// Activate event: clean old caches
self.addEventListener("activate", event => {
event.waitUntil(
caches.keys().then(cacheNames => {
return Promise.all(
cacheNames.map(name => {
if (name !== CACHE_NAME) return caches.delete(name);
})
);
})
);
});


// Fetch event: serve cached files
self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request);
})
);
});


// Listen for push messages (for notifications)
self.addEventListener("push", event => {
const data = event.data.json();
const options = {
body: data.body,
icon: "icon.png",
badge: "icon.png"
};
event.waitUntil(
self.registration.showNotification(data.title, options)
);
});


// Optional: notification click behavior
self.addEventListener("notificationclick", event => {
event.notification.close();
event.waitUntil(clients.openWindow("/"));
});