const staticCacheName = "ankit-kumar-Jha-static-v4.0.0";
const assets = [
  "/play-connect/",
  "/play-connect/play-connect.png",
  "/play-connect/vibration.mp3",
  "/play-connect/image/SOS.png",
  "/play-connect/image/cancel.png",
  "/play-connect/image/chain reaction.png",
  "/play-connect/image/create-room.png",
  "/play-connect/image/join-room.png",
  "/play-connect/image/CR-image/g-1",
  "/play-connect/image/CR-image/g-2",
  "/play-connect/image/CR-image/g-3",
  "/play-connect/image/CR-image/g-4",
  "/play-connect/image/CR-image/g-5",
  "/play-connect/image/CR-image/r-1",
  "/play-connect/image/CR-image/r-2",
  "/play-connect/image/CR-image/r-3",
  "/play-connect/image/CR-image/r-4",
  "/play-connect/image/CR-image/r-5",
  "/play-connect/manifest-icon/play-connect-144x144.png",
  "/play-connect/manifest-icon/play-connect-192x192.png",
  "/play-connect/manifest-icon/play-connect-36x36.png",
  "/play-connect/manifest-icon/play-connect-48x48.png",
  "/play-connect/manifest-icon/play-connect-512x512.png",
  "/play-connect/manifest-icon/play-connect-72x72.png",
  "/play-connect/manifest-icon/play-connect-96x96.png",
  "/play-connect/screenshot/SS_CR.png",
  "/play-connect/screenshot/SS_MAIN_PAGE.png",
  "/play-connect/screenshot/SS_SOS.png",
  "/play-connect/static/js/main.f0380d43.js",
  "/play-connect/static/js/main.f0380d43.js.LICENSE.txt",
  "/play-connect/static/js/main.f0380d43.js.map",
  "/play-connect/static/css/main.fd0d39c0.css",
  "/play-connect/static/css/main.fd0d39c0.css.map",
];

// install event
self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      return cache.addAll(assets).catch((err) => {
        console.error("Error adding files to cache", err);
      });
    })
  );
  console.info("SW installed");
  self.skipWaiting();
});

// activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
  return self.clients.claim();
});

// fetch event
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});
