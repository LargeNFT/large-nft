
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

    // Ignore not GET request.
    if (request.method !== 'GET') {
        if (DEBUG) console.log(`[SW] Ignore non GET request ${request.method}`)
        return
    }

    const requestUrl = new URL(request.url)

    // Ignore difference origin.
    if (requestUrl.origin !== location.origin) {
        if (DEBUG) console.log(`[SW] Ignore difference origin ${requestUrl.origin}`)
        return
    }

    const url = new URL(event.request.url)

    let process = false
    
    //Skip backup folder
    if (url.pathname.endsWith(`.html`)) process = true
    if (url.pathname.startsWith(`${baseURI}t`)) process = true
    if (url.pathname.startsWith(`${baseURI}s`)) process = true

    if (url.pathname.startsWith(`${baseURI}backup`)) process = false
    if (url.pathname.startsWith(`${baseURI}large`)) process = false
    if (url.pathname.startsWith(`${baseURI}sync`)) process = false
    if (url.pathname.startsWith(`${baseURI}t/`) && url.pathname.endsWith(`.json`)) process = false

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





