import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst, NetworkFirst } from 'workbox-strategies'

const DEBUG = false

//@ts-ignore
self.__WB_DISABLE_DEV_LOGS = true

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



//@ts-ignore
const baseURI = new URL(location).searchParams.get('baseURI')

//On-chain data we should prefer network copy.
registerRoute( ({ url }) => url.pathname.startsWith(`${baseURI}sync`), new NetworkFirst() )

registerRoute(/\.(?:js.*|css.*|webmanifest|eot|ttf|woff|woff2)$/, new CacheFirst({ cacheName: 'static-resources' }))

//Backup doesn't change
registerRoute( ({ url }) => url.pathname.startsWith(`${baseURI}backup`), new CacheFirst() )


//HTML and Large should serve stale but revalidate for next request
registerRoute( ({event}) => event.request.destination === 'image', new StaleWhileRevalidate() )
registerRoute( ({event}) => event.request.destination === 'document', new StaleWhileRevalidate() )

registerRoute( ({ url }) => url.pathname.endsWith(`.html`), new StaleWhileRevalidate() )


registerRoute( ({ url }) => url.pathname.startsWith(`${baseURI}t`), new StaleWhileRevalidate() )
registerRoute( ({ url }) => url.pathname.startsWith(`${baseURI}s`), new StaleWhileRevalidate() )






