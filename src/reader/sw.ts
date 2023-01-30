
//@ts-nocheck
const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')

import he from 'he'



const DEBUG = false
const RUNTIME = 'runtime'

let parser = new DOMParser()

const baseURI = new URL(location).searchParams.get('baseURI');


console.log(`[SW] Base Path: ${baseURI}`)

// When the service worker is first added to a computer.
self.addEventListener('install', event => {

    // Perform install steps.
    if (DEBUG) {
        console.log('[SW] Install event!!')
    }

    event.waitUntil(self.skipWaiting())

})

// After the install event.
self.addEventListener('activate', event => {
    if (DEBUG) {
        console.log('[SW] Activate event')
    }

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


    let process = false
    
    // console.log(url.pathname)

    //Skip backup folder
    if (url.pathname.endsWith(`.html`)) process = true
    if (url.pathname.startsWith(`${baseURI}t`)) process = true

    if (url.pathname.startsWith(`${baseURI}backup`)) process = false
    if (url.pathname.startsWith(`${baseURI}large`)) process = false
    if (url.pathname.startsWith(`${baseURI}sync`)) process = false
    if (url.pathname.startsWith(`${baseURI}t/`) && url.pathname.endsWith(`.json`)) process = false


    // if (url.pathname.startsWith(`${baseURL}/index`)) process = true
    // if (url.pathname.startsWith(`${baseURL}/mint`)) process = true

    // This is a navigation request, so respond with a complete HTML document.
    if (event.request.mode === 'navigate') process = false 

    if (DEBUG) {
        console.log(`[SW] Process URL ${url.pathname}: ${process} / Mode: ${event.request.mode}`)
    }

    if (process) {
        event.respondWith(getResource(request))
    }
    
})


const getResource = async (request:Request) => {

    let response = await fetch(request)

    let updatedResponse = await updateResponse(response)

    return updatedResponse

}



const updateResponse = async (response:Response) => {

    let responseText = await response.text()

    let page

    try {
        page = parser.parseFromString(responseText, 'text/html')
    } catch(ex) {}
    
 
    let pageElement = page.getElementsByClassName('page')[0]

    let script = page.getElementById('page-init-scripts')
 
    let content = he.unescape(new XMLSerializer().serializeToString(pageElement))
 
    let component = `
        <template>
            ${content}
        </template>

        <script>

            ${script.textContent}

            export default init
        </script>
    `

    return new Response(component, response)



}



