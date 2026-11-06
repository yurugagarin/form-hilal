/* FORM (kişisel) · service worker
   1) Çevrimdışı açılış: salonda internet çekmezse uygulama son sürümüyle açılır.
      Strateji "önce ağ": internet varsa her açılışta sunucudaki en güncel sürüm gelir,
      önbellek yalnız ağ yoksa (ya da 4 sn içinde cevap gelmezse) devreye girer.
   2) Dinlenme bildirimi: uygulama kapalıyken ya da ekran kilitliyken gelen push'u gösterir. */
var CACHE = 'form-kardes-v1';
var CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './logo.svg'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(CORE); }).catch(function () {}));
});
self.addEventListener('activate', function (e) {
  /* yalnız bu uygulamanın eski önbellekleri silinir (aynı adresteki başka uygulamalara dokunulmaz) */
  e.waitUntil(caches.keys().then(function (ks) {
    return Promise.all(ks.filter(function (k) { return k.indexOf('form-kardes-') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  var r = e.request;
  if (r.method !== 'GET') return;
  var u = new URL(r.url);
  var mine = r.url.indexOf(self.registration.scope) === 0;
  var font = u.hostname === 'fonts.googleapis.com' || u.hostname === 'fonts.gstatic.com';
  if (!mine && !font) return;           /* GitHub API, bildirim sunucusu: hiç dokunma */
  e.respondWith(netFirst(r));
});
function netFirst(r) {
  return new Promise(function (resolve) {
    var done = false;
    function fromCache(fallback) {
      return caches.match(r, { ignoreSearch: true }).then(function (m) {
        if (done) return;
        if (m) { done = true; resolve(m); } else if (fallback) { done = true; resolve(fallback); }
      });
    }
    var t = setTimeout(function () { fromCache(null); }, 4000);
    fetch(r).then(function (resp) {
      clearTimeout(t);
      if (resp && (resp.ok || resp.type === 'opaque')) {
        var cp = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(r, cp); });
      }
      if (!done) { done = true; resolve(resp); }
    }).catch(function () {
      clearTimeout(t);
      fromCache(Response.error());
    });
  });
}

self.addEventListener('push', function (e) {
  var d = {};
  try { d = e.data ? e.data.json() : {}; } catch (_) { d = {}; }
  e.waitUntil(self.registration.showNotification(d.title || 'Dinlenme bitti', {
    body: d.body || 'Sıradaki set',
    tag: 'rest',
    renotify: true,
    icon: 'icon-180.png',
    badge: 'icon-180.png'
  }));
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (cs) {
    for (var i = 0; i < cs.length; i++) if ('focus' in cs[i]) return cs[i].focus();
    return self.clients.openWindow('./');
  }));
});
