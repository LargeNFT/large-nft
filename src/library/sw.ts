import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'

const DEBUG = false

// When the service worker is first added to a computer.
self.addEventListener('install', event => {

  // Perform install steps.
  if (DEBUG) {
      console.log('[SW] Install event!!')
  }

  //@ts-ignore
  event.waitUntil(self.skipWaiting())

})

// After the install event.
self.addEventListener('activate', event => {

  if (DEBUG) {
      console.log('[SW] Activate event')
  }

  //@ts-ignore
  event.waitUntil(self.clients.claim())

})


//On-chain data we should prefer network copy.
registerRoute( ({ url }) => new RegExp(`/r/.*/sync.*`).test(url.pathname), new NetworkFirst() )

registerRoute(/\.(?:js.*|css.*|webmanifest|eot|ttf|woff|woff2)$/, new CacheFirst({ cacheName: 'static-resources' }))

//Backup doesn't change
registerRoute( ({ url }) => new RegExp(`/r/.*/backup.*`).test(url.pathname), new CacheFirst() )



//HTML and Large should serve stale but revalidate for next request
registerRoute( ({event}) => event.request.destination === 'image', new StaleWhileRevalidate() )
registerRoute( ({event}) => event.request.destination === 'document', new StaleWhileRevalidate() )

registerRoute( ({ url }) => url.pathname.endsWith(`.html`), new StaleWhileRevalidate() )


registerRoute( ({ url }) => new RegExp(`/r/.*/t/.*`).test(url.pathname), new StaleWhileRevalidate() )
registerRoute( ({ url }) => new RegExp(`/r/.*/s/.*`).test(url.pathname), new StaleWhileRevalidate() )






