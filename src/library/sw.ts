
//@ts-nocheck

import he from "he"

const DEBUG = false

const baseURI = new URL(location).searchParams.get('baseURI');


console.log(`[SW] Base Path: ${baseURI}`)

// When the service worker is first added to a computer.
self.addEventListener('install', event => {

    // Perform install steps.
    if (DEBUG) console.log('[SW] Install event!!')

    event.waitUntil(self.skipWaiting())

})

// After the install event.
self.addEventListener('activate', event => {

    if (DEBUG) console.log('[SW] Activate event')

    event.waitUntil(self.clients.claim())

})


self.addEventListener('fetch', event => {

    const request = event.request
    // console.log(request)
    // Ignore not GET request.
    if (request.method !== 'GET') {
        if (DEBUG) {
            console.log(`[SW] Ignore non GET request ${request.method}`)
        }
        return
    }

    const requestUrl = new URL(request.url)

    // Ignore difference origin.
    if (requestUrl.origin !== location.origin) {
        if (DEBUG) {
            console.log(`[SW] Ignore difference origin ${requestUrl.origin}`)
        }
        return
    }

    const url = new URL(event.request.url)

    const theURL = url.pathname.toString()

    let process = false
    
    // Skip backup folder
    if (theURL.endsWith(".html")) process = true;
    if (new RegExp(`/r/.*/t/.*`).test(theURL)) process = true;
    if (new RegExp(`/r/.*/s/.*`).test(theURL)) process = true;

    if (new RegExp(`/r/.*/backup.*`).test(theURL)) process = false;
    if (theURL.startsWith(`/large`)) process = false;
    if (new RegExp(`/r/.*/sync.*`).test(theURL)) process = false;
    if (new RegExp(`/r/.*/t/.*\.json$`).test(theURL)) process = false;


    // This is a navigation request, so respond with a complete HTML document.
    if (event.request.mode === 'navigate') process = false 

    if (DEBUG) {
        console.log(`[SW] Process URL ${url.pathname}: ${process} / Mode: ${event.request.mode}`)
    }

    if (process) {
        event.respondWith(getResponse(request))
    }
    
})


const getResponse = async (request:Request) => {

    let response = await fetch(request)

    let responseText = await response.text()

    const pageContent = responseText.substring(
        responseText.indexOf("<!--pageContent-->") + 19, 
        responseText.lastIndexOf("<!--/pageContent-->")
    )

    const scriptContent = responseText.substring(
        responseText.indexOf("//pageInitScripts") + 18, 
        responseText.lastIndexOf("///pageInitScripts")
    )

    let component = `
        <template>
            ${he.unescape(pageContent)}
        </template>

        <script>

            ${scriptContent}

            export default init
        </script>
    `

    return new Response(component, response)

}


