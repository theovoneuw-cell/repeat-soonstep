/* Repeat by Soonstep — service worker : l'appli fonctionne sans connexion. */
const VERSION = "repeat-v1";
const SHELL = ["./","./index.html","./manifest.webmanifest",
  "./icons/soonstep-mark.svg","./icons/icon-192.png","./icons/icon-512.png",
  "./icons/icon-maskable-512.png","./icons/apple-touch-icon.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(k => Promise.all(k.filter(x => x !== VERSION).map(x => caches.delete(x))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  if(req.mode === "navigate"){
    e.respondWith(fetch(req)
      .then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put("./index.html", c)); return r; })
      .catch(() => caches.match("./index.html")));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if(r && (r.ok || r.type === "opaque")){ const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); }
    return r;
  }).catch(() => hit || Response.error())));
});
