import { precacheAndRoute } from 'workbox-precaching';

//@ts-ignore
self.__WB_DISABLE_DEV_LOGS = true

//@ts-ignore
let manifest = self.__WB_MANIFEST

manifest = manifest.map( i => {
  return {
    revision: i.revision,
    url: i.url.replace("large/", '')
  }
})

//@ts-ignore
precacheAndRoute(manifest)