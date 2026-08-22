/**
 * SERVICE WORKER — offline-ready, deliberately small.
 *
 * Strategy by request type:
 *   navigations  → network-first, fall back to cache, then to /offline
 *   static asset → stale-while-revalidate (fonts, CSS, JS, images)
 *   everything else → straight to the network, uncached
 *
 * Notes:
 *  · Only same-origin requests are ever touched. There is nothing
 *    cross-origin on this site, and this guarantees it stays that way.
 *  · The dotLottie wasm is NOT precached — it is ~1.2MB and most visitors
 *    never need it. It lands in the runtime cache only if actually fetched.
 *  · Bump CACHE_VERSION to force a clean sweep on the next deploy.
 */

const CACHE_VERSION = 'v1';
const PRECACHE = `precache-${CACHE_VERSION}`;
const RUNTIME = `runtime-${CACHE_VERSION}`;

/** The minimum needed to render something useful with no network at all. */
const CORE = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/fonts/bricolage-grotesque-var-latin.woff2',
  '/fonts/inter-var-latin.woff2',
  '/fonts/jetbrains-mono-var-latin.woff2',
];

const STATIC_RE = /\.(?:css|js|woff2?|png|jpe?g|webp|avif|svg|lottie|json)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(PRECACHE)
      // addAll is atomic: one 404 would reject the whole install, so each
      // entry is added independently and failures are tolerated.
      .then((cache) =>
        Promise.all(CORE.map((url) => cache.add(url).catch(() => undefined))),
      )
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k !== PRECACHE && k !== RUNTIME)
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  if (STATIC_RE.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = (await cache.match(request)) ?? (await caches.match(request));
    if (cached) return cached;
    const offline = await caches.match('/offline');
    return (
      offline ??
      new Response('Offline', { status: 503, headers: { 'Content-Type': 'text/plain' } })
    );
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME);
  const cached = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);

  return cached ?? (await network) ?? Response.error();
}
