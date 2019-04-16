/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');


self.toolbox.options.cache = {
  name: 'magic-message-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.css',
    './build/main.js',
    './build/vendor.js',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;


// self.addEventListener('fetch', (event) => {
//   const requestProcessor = (idToken) => {
//     let req = event.request;
//     // For same origin https requests, append idToken to header.
//     if (self.location.origin == getOriginFromUrl(event.request.url) &&
//         (self.location.protocol == 'https:' ||
//          self.location.hostname == 'localhost') &&
//         idToken) {
//       // Clone headers as request headers are immutable.
//       const headers = new Headers();
//       for (let entry of req.headers.entries()) {
//         headers.append(entry[0], entry[1]);
//       }
//       // Add ID token to header.
//       headers.append('Authorization', 'Bearer ' + idToken);
//       try {
//         req = new Request(req.url, {
//           method: req.method,
//           headers: headers,
//           mode: 'same-origin',
//           credentials: req.credentials,
//           cache: req.cache,
//           redirect: req.redirect,
//           referrer: req.referrer,
//           body: req.body,
//           bodyUsed: req.bodyUsed,
//           context: req.context
//         });
//       } catch (e) {
//         // This will fail for CORS requests. We just continue with the
//         // fetch caching logic below and do not pass the ID token.
//       }
//     }
//     return fetch(req);
//   };
//   // Fetch the resource after checking for the ID token.
//   // This can also be integrated with existing logic to serve cached files
//   // in offline mode.
//   event.respondWith(getIdToken().then(requestProcessor, requestProcessor));
// });

// In service worker script.
self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

