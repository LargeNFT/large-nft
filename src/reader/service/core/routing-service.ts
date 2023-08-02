class RoutingService {

    static async resolveWithSpinner(resolve, url, options?) {

        if (!globalThis.app) return 

        globalThis.app.preloader.show()

        resolve({ 
          componentUrl: url, 
          options: options
        })
        

        globalThis.app.preloader.hide()

    }

    static getReaderRoutes (baseURI) {

        const routes = []

        //Map the base route without a slash if it's longer than just a slash
        // if (baseURI != "/" && baseURI.endsWith("/")) {
    
        //   routes.push({
        //     path: `${baseURI.substring(0, baseURI.length -1)}`,
        //     async async({ resolve, reject, to }) {
        //       console.log("HERE")
        //       await RoutingService.resolveWithSpinner(resolve, 'index.html')
        //     }
        //   })
    
        // }
    
        RoutingService.addSharedRoutes(routes, baseURI)
    
          
        return routes


    }

    static getLibraryRoutes (libraryURL) {

        libraryURL += "partial/"

        const routes = [
          {
            path: `${libraryURL}`,
            async async({ resolve, reject, to }) {
              await RoutingService.resolveWithSpinner(resolve, `${libraryURL}/index.html`)
            }
          },

          {
            path: `${libraryURL}/`,
            async async({ resolve, reject, to }) {
              await RoutingService.resolveWithSpinner(resolve, `${libraryURL}/index.html`)
            }
          },


          {
            path: `${libraryURL}/index.html`,
            async async({ resolve, reject, to }) {
              await RoutingService.resolveWithSpinner(resolve,`${libraryURL}/index.html`)
            }
          }

        ]
    
        RoutingService.addSharedRoutes(routes, "/r/:reader_slug/")
    
        return routes
    }

    private static addSharedRoutes(routes, baseURI) {
            
        let resolvedBaseURI

        if (baseURI.indexOf(':reader_slug') > 0) {
          resolvedBaseURI = baseURI.replace(":reader_slug", "{{reader_slug}}")
        } else {
          resolvedBaseURI = baseURI
        }

        resolvedBaseURI += "partial/"


        routes.push(...[
            {
              path: `${baseURI}`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`)
              }
            },
            {
              path: `${baseURI}index.html`,
              async async({ resolve, reject, to }) {
                console.log()
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}index.html`)
              }
            },
      
      
            {
              path: `${baseURI}mint.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}mint.html`)
              }
            },
      
            {
              path: `${baseURI}search.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}search.html`)
              }
            },      
            {
              path: `${baseURI}explore.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}explore.html`)
              }
            },
            {
              path: `${baseURI}activity`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`)
              }
            },
            {
              path: `${baseURI}activity/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}activity/index.html`)
              }
            },
            {
              path: `${baseURI}leaderboard`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}leaderboard/index.html`)
              }
            },
            {
              path: `${baseURI}leaderboard/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve,`${resolvedBaseURI}leaderboard/index.html`)
              }
            },
            {
              path: `${baseURI}sales`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`)
              }
            },
            {
              path: `${baseURI}sales/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}sales/index.html`)
              }
            },
            {
              path: `${baseURI}attributes`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`)
              }
            },
            {
              path: `${baseURI}attributes/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attributes/index.html`)
              }
            },
            {
              path: `${baseURI}attribute`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`)
              }
            },
            {
              path: `${baseURI}attribute/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}attribute/index.html`)
              }
            },
            {
              path: `${baseURI}u`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`)
              }
            },
            {
              path: `${baseURI}u/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/index.html`)
              }
            },
            {
              path: `${baseURI}u/activity`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`)
              }
            },
            {
              path: `${baseURI}u/activity/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}u/activity/index.html`)
              }
            },
            {
              path: `${baseURI}list-:page.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}list-{{page}}.html`)
              }
            },
            {
              path: `${baseURI}t/:tokenId`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true })
              }
            },
            {
              path: `${baseURI}t/:tokenId/index.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve,`${resolvedBaseURI}t/{{tokenId}}/index.html`, { force: true })
              }
            },
            {
              path: `${baseURI}s/:slug.html`,
              async async({ resolve, reject, to }) {
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}s/{{slug}}.html`)
              }
            },

            {
              path: '(.*)',
              //@ts-ignore
              async async({ resolve, reject, to }) {
                console.log(`404 error: ${to.path}`)
                await RoutingService.resolveWithSpinner(resolve, `${resolvedBaseURI}/404.html`)
              }
            }
      
        ])

    }


}


export { RoutingService }