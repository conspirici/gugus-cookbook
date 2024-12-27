const CACHE_NAME = 'gugu-cookbook-cache-v1';
const urlsToCache = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './manifest.json',
    './assets/icon-192x192.png',
    './assets/icon-512x512.png',
    './assets/WhatsApp Image 2024-12-27 at 11.43.01 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.55 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.52 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.53 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.52 PM (1).jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.53 PM (1).jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.51 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.51 PM (1).jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.50 PM.jpeg',
    './assets/WhatsApp Image 2024-12-27 at 11.53.49 PM.jpeg'
];

// Install Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch and Cache Requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Update Service Worker
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
