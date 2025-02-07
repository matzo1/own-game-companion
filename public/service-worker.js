//service-worker.js
const CACHE_NAME = 'own-cache-v1';
const CONTENT_CACHE = 'own-content-cache-v1';

// Archivos base de la aplicación que se cachearán para funcionamiento offline
const APP_SHELL = [
  '/',
  '/index.html',
  '/manifest.json',
  '/static/js/main.bundle.js',
  '/static/css/main.css',
  '/assets/contenido/images/*',
  '/assets/contenido/videos/*'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache opened');
      return cache.addAll(APP_SHELL);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Limpiar caches antiguos
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return (
                cacheName !== CACHE_NAME &&
                cacheName !== CONTENT_CACHE
              );
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      }),
      // Limpiar contenido antiguo (más de 1 mes)
      caches.open(CONTENT_CACHE).then((cache) => {
        return cache.keys().then((keys) => {
          return Promise.all(
            keys.map((request) => {
              return cache.match(request).then((response) => {
                if (response) {
                  const fetchDate = new Date(response.headers.get('date'));
                  const monthAgo = new Date();
                  monthAgo.setMonth(monthAgo.getMonth() - 1);
                  
                  if (fetchDate < monthAgo) {
                    console.log('Deleting old content:', request.url);
                    return cache.delete(request);
                  }
                }
              });
            })
          );
        });
      })
    ])
  );
});

// Interceptar peticiones
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Manejar peticiones a la API
  if (url.pathname.startsWith('/assets/contenido/')) {
    event.respondWith(
      caches.open(CONTENT_CACHE).then((cache) => {
        return cache.match(event.request).then((response) => {
          // Comprobar si la respuesta cacheada es válida
          if (response) {
            const fetchDate = new Date(response.headers.get('date'));
            const monthAgo = new Date();
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            
            if (fetchDate > monthAgo) {
              console.log('Serving from cache:', url.pathname);
              return response;
            }
          }
          
          // Si no hay cache o expiró, buscar en la red
          return fetch(event.request).then((networkResponse) => {
            // Cachear la nueva respuesta
            cache.put(event.request, networkResponse.clone());
            console.log('Fetching and caching new content:', url.pathname);
            return networkResponse;
          }).catch(error => {
            console.error('Fetch error:', error);
            // Si hay un error de red y no hay cache, mostrar error
            if (!response) {
              throw error;
            }
            // Si hay error de red pero tenemos cache, usar cache aunque esté viejo
            console.log('Network error, serving stale cache:', url.pathname);
            return response;
          });
        });
      })
    );
  } else {
    // Manejar assets estáticos
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          console.log('Serving from cache:', url.pathname);
          return response;
        }

        return fetch(event.request).then((networkResponse) => {
          // Cachear otros recursos que no están en APP_SHELL
          if (event.request.method === 'GET') {
            return caches.open(CACHE_NAME).then((cache) => {
              console.log('Caching new resource:', url.pathname);
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          }
          return networkResponse;
        });
      })
    );
  }
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
