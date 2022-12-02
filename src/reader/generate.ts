import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'
import * as Eta from 'eta'

import { Container } from "inversify"

// import PouchDB from 'pouchdb-node';
import excerptHtml from 'excerpt-html'
import he from 'he'

import pkg from 'convert-svg-to-png';
const { convert } = pkg;

import { getMainContainer } from "./node-inversify.config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"
import { ChannelService } from "./service/channel-service.js"
import { ItemWebService } from "./service/web/item-web-service.js"
import { StaticPageService } from "./service/static-page-service.js"

let channelId

import tokenEjs from './ejs/pages/token.ejs'
import indexEjs from './ejs/index.ejs'
import mintEjs from './ejs/mint.ejs'
import searchEjs from './ejs/search.ejs'
import fourOhFourEjs from './ejs/404.ejs'

import attributesEjs from './ejs/pages/attributes.ejs'
import exploreEjs from './ejs/pages/explore.ejs'
import staticPageEjs from './ejs/pages/static-page.ejs'

import baseConfig from './base-config.json'
import packageConfig from "../../package.json"

function parseArgumentsIntoOptions(rawArgs) {

  const args = arg(
    {
      '--dir': String,
      '--env': String
    },
    {
      argv: rawArgs.slice(2),
    }
  )

  return {
    dir: args['--dir'] || "",
    env: args['--env'] || "production"
  }

}


let generate = async () => {

  let theArgs = parseArgumentsIntoOptions(process.argv)

  let baseDir = theArgs.dir ? theArgs.dir : process.env.INIT_CWD

  if (!baseDir) baseDir = "."

  // console.log(theArgs)
  // console.log(baseDir)

  let config = JSON.parse(fs.readFileSync(`${baseDir}/large-config.json`, 'utf8'))

  config.publicPath = `${baseDir}/public`
  config.VERSION = packageConfig.version


  if (theArgs.env == "dev") {

    config.hostname = baseConfig.hostname
    config.baseURL = baseConfig.baseURL
    config.maxItems = baseConfig.maxItems

  } else {

    //Set base URL
    if (!config.baseURL) {
      config.baseURL = baseConfig.baseURL
    }

    //Set hostname
    if (!config.hostname) {
      config.hostname = baseConfig.hostname
    }

    //Set max items
    if (!config.maxItems) {
      config.maxItems = baseConfig.maxItems
    }
  }

  //Create marketplace config from base config + anything set in config
  if (config.marketplaces?.length > 0) {
    for (let marketplace of config.marketplaces) {

      //Look it up in base config
      let matches = baseConfig.marketplaces.filter(m => m.name == marketplace.name)

      if (matches?.length > 0) {

        //Set asset link
        if (!marketplace.assetLink) {
          marketplace.assetLink = matches[0].assetLink
        }

        if (!marketplace.link) {
          marketplace.link = matches[0].link
        }

      }

    }
  }

  console.log(config)

  let showMintPage = config?.showMintPage



  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })

  // container.bind("PouchDB").toConstantValue(PouchDB)
  container.bind("PouchDB").toConstantValue({})
  container.bind("contracts").toConstantValue([])

  container = await getMainContainer(container, config.baseURL, config.hostname, baseDir)

  const PER_PAGE = 35

  let channelWebService: ChannelWebService = container.get("ChannelWebService")
  let channelService: ChannelService = container.get("ChannelService")
  let itemWebService: ItemWebService = container.get("ItemWebService")
  let staticPageService: StaticPageService = container.get("StaticPageService")


  //Not great to get the impl here. Maybe load should be part of interface. 
  let itemRepository = container.get("ItemRepository")
  //@ts-ignore
  await itemRepository.load()

  let staticPageRepository = container.get("StaticPageRepository")
  //@ts-ignore
  await staticPageRepository.load()

  //Attribute report
  let attributeTotals = await channelWebService.buildAttributeTotals()
  await fs.promises.writeFile(`${config.publicPath}/attributeTotals.json`, JSON.stringify(attributeTotals))

  //Get channel
  let channel = await channelService.get()
  let channelViewModel = await channelWebService.get(0)


  channelId = channelViewModel.channel._id

  //Get items
  let itemViewModels = await itemWebService.list(0, config.maxItems)

  //Build item pages
  let itemPages = await itemWebService.buildItemPages(itemViewModels, PER_PAGE)

  //Write these to files
  let pageCount = 0

  await fs.promises.mkdir(`${config.publicPath}/itemPages`, { recursive: true })

  for (let itemPage of itemPages) {
    // console.log(`Writing item page: public/itemPages/${pageCount}.json`)
    await fs.promises.writeFile(`${config.publicPath}/itemPages/${pageCount}.json`, JSON.stringify(itemPage))
    pageCount++
  }


  //Get first page of items for explore page
  let itemResults = await itemWebService.exploreList({}, 0, PER_PAGE)
  let firstPageExploreItems = itemResults.items

  //Get svg images to convert to png
  let svgItems = itemViewModels.filter(i => i.coverImage.generated)

  //Convert images
  console.log(`Converting ${svgItems.length} images`)

  for (let item of svgItems) {

    await fs.promises.mkdir(`${config.publicPath}/backup/generated/images`, { recursive: true })

    let path = `${config.publicPath}/backup/generated/images/${item.coverImage._id}.png`

    if (!fs.existsSync(path)) {

      console.log(`Converting SVG to PNG: ${path}`)

      let png = await convert(item.coverImage.svg, {
        height: 1200,
        width: 1200
      })

      await fs.promises.writeFile(path, png)
    } else {
      console.log(`Skipping ${item.coverImage._id}.png`)
    }

  }


  //The list of routable pages to generate.
  let routablePages = await staticPageService.listRoutablePages()

  //Some pages have trouble passing the 0.0.0 format of the version string (gets confused as weird number) so also
  //create a base64Encoded copy
  let base64Version = Buffer.from(JSON.stringify(config.VERSION)).toString('base64')


  if (!config.externalLinks) {
    config.externalLinks = []
  }


  let headContents = `
        <script defer src="${config.baseURL}large/reader/browser/js/runtime.reader.js"></script>
        <script defer src="${config.baseURL}large/reader/browser/js/vendors.reader.js"></script>
        <script defer src="${config.baseURL}large/reader/browser/js/main.reader.js"></script>
    `
  let bodyContents = ``


  let baseViewModel = {
    channelViewModel: channelViewModel,
    attributeReport: attributeTotals,
    routablePages: routablePages,
    baseURL: config.baseURL,
    hostname: config.hostname,
    marketplaces: config.marketplaces,
    externalLinks: config.externalLinks,
    base64Version: base64Version,
    channelId: channelViewModel.channel._id,
    showMintPage: showMintPage,
    headContents: headContents,
    bodyContents: bodyContents,
    excerptHtml: excerptHtml,
    he: he
  }



  console.log("Copying backup and Large Admin...")

  fs.cpSync(`${baseDir}/backup`, `${config.publicPath}/backup`, { recursive: true })
  fs.cpSync(`${baseDir}/node_modules/large-nft/public`, `${config.publicPath}/large`, { recursive: true })

  //Read app.html and index.html from Large and update the paths.
  let indexBuffer = fs.readFileSync(`${config.publicPath}/large/index.html`)
  let appBuffer = fs.readFileSync(`${config.publicPath}/large/admin/app.html`)

  let indexContents = indexBuffer.toString()
  let appContents = appBuffer.toString()

  indexContents = indexContents.replace("../admin/app/js/runtime.admin.js", `${config.baseURL}large/admin/app/js/runtime.admin.js`)
  indexContents = indexContents.replace("../admin/app/js/vendors.admin.js", `${config.baseURL}large/admin/app/js/vendors.admin.js`)
  indexContents = indexContents.replace("../admin/app/js/main.admin.js", `${config.baseURL}large/admin/app/js/main.admin.js`)

  appContents = appContents.replace("../admin/app/js/runtime.admin.js", `${config.baseURL}large/admin/app/js/runtime.admin.js`)
  appContents = appContents.replace("../admin/app/js/vendors.admin.js", `${config.baseURL}large/admin/app/js/vendors.admin.js`)
  appContents = appContents.replace("../admin/app/js/main.admin.js", `${config.baseURL}large/admin/app/js/main.admin.js`)


  fs.writeFileSync(`${config.publicPath}/large/index.html`, indexContents)
  fs.writeFileSync(`${config.publicPath}/large/admin/app.html`, appContents)


  // <script defer="defer" src="../admin/app/js/runtime.admin.js"></script>
  // <script defer="defer" src="../admin/app/js/vendors.admin.js"></script>
  // <script defer="defer" src="../admin/app/js/main.admin.js"></script>




  //Move SW
  fs.renameSync(`${config.publicPath}/large/reader/browser/sw-${config.VERSION}.js`, `${config.publicPath}/sw-${config.VERSION}.js`)

  fs.mkdirSync(config.publicPath, { recursive: true })

  const indexResult = Eta.render(indexEjs, {
    title: channelViewModel.channel.title,
    firstPageExploreItems: firstPageExploreItems,
    firstPost: itemViewModels[0],
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/index.html`, indexResult)


  //Mint page
  if (showMintPage) {

    const mintResult = Eta.render(mintEjs, {
      title: channelViewModel.channel.title,
      baseViewModel: baseViewModel
    })

    fs.writeFileSync(`${config.publicPath}/mint.html`, mintResult)

  }


  //Search page
  const searchResult = Eta.render(searchEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/search.html`, searchResult)


  //Attribute Report
  const attributesResult = Eta.render(attributesEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/attributes.html`, attributesResult)

  //Explore
  const exploreResult = Eta.render(exploreEjs, {
    title: channelViewModel.channel.title,
    firstPageExploreItems: firstPageExploreItems,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/explore.html`, exploreResult)


  //404 page
  const fourOhFourResult = Eta.render(fourOhFourEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/404.html`, fourOhFourResult)



  //Build static pages
  if (channelViewModel.staticPagesViewModel?.links?.length > 0) {
    for (let staticPage of channelViewModel.staticPagesViewModel?.links) {

      const staticPagesResult = Eta.render(staticPageEjs, {
        title: channelViewModel.channel.title,
        staticPage: staticPage,
        baseViewModel: baseViewModel
      })

      fs.writeFileSync(`${config.publicPath}/${staticPage.slug}.html`, staticPagesResult)
    }
  }


  //Generate token pages

  //Read the template file 
  for (let itemViewModel of itemViewModels) {

    let rowItemViewModel = itemWebService.translateRowItemViewModel(itemViewModel.item, itemViewModel.coverImage)

    //Generate the token page
    console.time(`Generating /t/${itemViewModel.item.tokenId}`)

    const result = Eta.render(tokenEjs, {
      title: itemViewModel.item.title,
      itemViewModel: itemViewModel,
      baseViewModel: baseViewModel
    })


    fs.mkdirSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}`, { recursive: true })

    //Write the HTML page
    fs.writeFileSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}/index.html`, result)

    //Write rowItemViewModel
    fs.writeFileSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}/rowItemViewModel.json`, Buffer.from(JSON.stringify(rowItemViewModel)))


    console.timeEnd(`Generating /t/${itemViewModel.item.tokenId}`)






  }

}



generate()




// export default () => {
//   console.log(process)

//   console.log('HERE')
// }