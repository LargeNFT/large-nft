import { Dom7, Template7 } from "framework7/js/framework7.bundle"
const Framework7: any = require('framework7/js/framework7.bundle')


import routes from "./reader-routes"
import { ReaderGlobal } from "./reader-global"

const moment = require('moment')


module.exports = async function () {

  //Template7 helpers

  Template7.registerHelper('shortDate', function (date) {
    return moment(date).format('MMM D, YYYY')
  })



  Template7.registerPartial("mobileBars", `
    <a href="#" class="link icon-only panel-open small-only" data-panel=".panel-left"><i class="icon f7-icons">bars</i></a>
  `)



  //Detect page root
  // @ts-ignore
  const rootUrl = new URL(window.location)


  // Framework7 App main instance
  ReaderGlobal.app = new Framework7({
    root: '#app', // App root element
    id: 'large-reaer', // App bundle ID
    name: 'Large Reader', // App name
    theme: 'auto', // Automatic theme detection

    // App routes
    routes: routes(rootUrl.pathname)

  })

  try {
    await ReaderGlobal.init()
  } catch (ex) {
    console.log(ex)
  }

  ReaderGlobal.initializeControllers()




  // Init/Create main view
  const mainView = ReaderGlobal.app.views.create('.view-main', {
    pushState: true
  })


  window['Global'] = ReaderGlobal;


}
