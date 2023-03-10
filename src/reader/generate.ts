import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import * as Eta from 'eta'

import { Container } from "inversify"

import excerptHtml from 'excerpt-html'
import he from 'he'


import { getMainContainer, GetMainContainerCommand } from "../sync/inversify.config.js"
import { ItemWebService } from "./service/web/item-web-service.js"

let channelId

import tokenEjs from './ejs/pages/token.ejs'
import indexEjs from './ejs/index.ejs'
import _initEjs from './ejs/template/_init.ejs'

import mintEjs from './ejs/mint.ejs'
import searchEjs from './ejs/search.ejs'
import fourOhFourEjs from './ejs/404.ejs'
import footerEjs from './ejs/footer.ejs'

import attributesEjs from './ejs/pages/attributes.ejs'
import attributeEjs from './ejs/pages/attribute.ejs'
import exploreEjs from './ejs/pages/explore.ejs'
import staticPageEjs from './ejs/pages/static-page.ejs'
import activityEjs from './ejs/pages/activity.ejs'
import userEjs from './ejs/pages/user.ejs'
import userActivityEjs from './ejs/pages/user-activity.ejs'
import transactionEjs from './ejs/pages/transaction.ejs'

import leaderboardEjs from './ejs/pages/leaderboard.ejs'
import largestSalesEjs from './ejs/pages/sales.ejs'


import { GenerateService, GenerateViewModel } from "./service/core/generate-service.js"
import { ProcessConfig } from "./util/process-config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"
import { ItemViewModel } from "./dto/viewmodel/item-view-model.js"

import pkg from 'convert-svg-to-png';
import { StaticPage } from "./dto/static-page.js"
import { SpawnService } from "../sync/service/spawn-service.js"
import { ItemService } from "./service/item-service.js"
import path from "path"


const { convert } = pkg;



let generate = async () => {

  let config:any = await ProcessConfig.getConfig() 

  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })
  container.bind('sequelize').toConstantValue({})


  container.bind("contracts").toConstantValue([])
  container.bind("convert-svg-to-png").toConstantValue(convert)


  let command:GetMainContainerCommand = {
    customContainer: container,
    baseDir: config.baseDir,
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: undefined
  }

  container = await getMainContainer(command)







  const PER_PAGE = 40

  //Not great to get the impl here. Maybe load should be part of interface. 
  let itemRepository = container.get("ItemRepository")
  //@ts-ignore
  await itemRepository.load()

  let staticPageRepository = container.get("StaticPageRepository")
  //@ts-ignore
  await staticPageRepository.load()

  //Get data services.
  let itemWebService:ItemWebService = container.get("ItemWebService")
  let itemService:ItemService = container.get("ItemService")
  let channelWebService:ChannelWebService = container.get("ChannelWebService")
  let spawnService:SpawnService = container.get("SpawnService")
  let generateService:GenerateService = container.get("GenerateService")


  //Create public path.
  await fs.promises.mkdir(`${config.publicPath}`, { recursive: true })



  //Load any additional static pages.
  let additionalStaticPages:StaticPage[] 

  if (config.additionalStaticPages) {
    try {
      let contents = await fs.promises.readFile(config.additionalStaticPages)
      additionalStaticPages = JSON.parse(contents.toString())
    } catch(ex) {}
  }


  //Look up channel and items.
  let channelViewModel = await channelWebService.get(0, additionalStaticPages)
  let itemViewModels:ItemViewModel[] = await itemWebService.list(0, config.maxItems)
  let itemPages = await itemWebService.buildItemPages(itemViewModels, PER_PAGE)



  //Attribute report. Write to file.
  let attributeTotals = await itemWebService.buildAttributeTotals(channelViewModel.channel)
  await fs.promises.writeFile(`${config.publicPath}/attributeTotals.json`, JSON.stringify(attributeTotals))



  channelId = channelViewModel.channel._id


  //Write item pages to files
  let pageCount = 0
  await fs.promises.mkdir(`${config.publicPath}/itemPages`, { recursive: true })

  for (let itemPage of itemPages) {
    // console.log(`Writing item page: public/itemPages/${pageCount}.json`)
    await fs.promises.writeFile(`${config.publicPath}/itemPages/${pageCount}.json`, JSON.stringify(itemPage))
    pageCount++
  }




  let generateViewModel:GenerateViewModel = await generateService.getGenerateViewModel(config, additionalStaticPages)


  if (!config.externalLinks) {
    config.externalLinks = []
  }









  let headEndContents = `
  <script defer src="${config.baseURL}large/reader/browser/js/runtime-${config.VERSION}.reader.js"></script>
  <script defer src="${config.baseURL}large/reader/browser/js/vendors-${config.VERSION}.reader.js"></script>
  <script defer src="${config.baseURL}large/reader/browser/js/main-${config.VERSION}.reader.js"></script>
    `
  let bodyContents = ``



  //Load init eta template
  Eta.templates.define("_init", Eta.compile(_initEjs))




  //Template hooks.
  //TODO: This idea needs work and this mechanism is likely temporary.

  /** Hook: headStart */
  let headStartContents

  try {
    headStartContents = await fs.promises.readFile(config.headStart)
  } catch(ex) {}

  Eta.templates.define("headStart", Eta.compile(headStartContents ? headStartContents?.toString() : ''))






  //Load the default footer or use a configured template.
  /** Hook: footer */
  let footer

  try {
    footer = await fs.promises.readFile(config.footer)
  } catch(ex) {}

  Eta.templates.define("footer", Eta.compile(footer ? footer?.toString() : footerEjs))






  //Footer for the admin
  let adminFooter

  try {
    adminFooter = await fs.promises.readFile(config.adminFooter)
  } catch(ex) {}



  // let contract
  // let contractABI

  // try {

  //   contract = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract.json`, 'utf8'))
  //   contractABI = JSON.parse(fs.readFileSync(`${config.baseDir}/backup/contract/contract-abi.json`, 'utf8'))

  // } catch(ex) {}




  let baseViewModel = {
    channelViewModel: channelViewModel,
    attributeReport: attributeTotals,
    routablePages: generateViewModel.routablePages,
    baseURL: config.baseURL,
    hostname: config.hostname,
    marketplaces: config.marketplaces,
    externalLinks: config.externalLinks,
    base64Version: generateViewModel.base64Version,
    channelId: channelViewModel.channel._id,
    showMintPage: config.showMintPage,
    showActivityPage: config.showActivityPage,
    headEndContents: headEndContents,
    bodyContents: bodyContents,
    excerptHtml: excerptHtml,
    he: he,
    baseDir: config.baseDir,
    logo: config.logo,
    largeURL: config.largeURL,
    // contract: contract,
    // contractABI: contractABI
  }



  console.log("Copying backup and Large Admin...")

  fs.cpSync(`${config.baseDir}/backup`, `${config.publicPath}/backup`, { recursive: true })

  if (fs.existsSync(`${config.publicPath}/large`)) {
    fs.rmSync(`${config.publicPath}/large`, { recursive: true })
  }

  fs.cpSync(`${config.baseDir}/node_modules/large-nft/public`, `${config.publicPath}/large`, { recursive: true })


  //Read app.html and index.html from Large and update the paths.
  let indexBuffer = fs.readFileSync(`${config.publicPath}/large/index.html`)

  let indexContents = indexBuffer.toString()

  indexContents = indexContents.replace(`../admin/app/js/runtime-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/runtime-${config.VERSION}.admin.js`)
  indexContents = indexContents.replace(`../admin/app/js/vendors-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/vendors-${config.VERSION}.admin.js`)
  indexContents = indexContents.replace(`../admin/app/js/main-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/main-${config.VERSION}.admin.js`)


  //Inject admin footer template.
  if (adminFooter?.length > 0) {

    let footerTemplate = Eta.render(adminFooter.toString(), { 
      baseURL: config.baseURL,
      version: config.VERSION
    })

    indexContents = indexContents.replace(`<div id="app"></div>`, `
    
    <div id="app"></div>

    <template id="footer-template">
    ${footerTemplate}
    </template>
    
    `)

  }

  //Copy logo
  if (config.logo?.src) {

    //Get ext 
    let logoExt = config.logo?.src.split('.').pop()

    //Logo location
    let logoPath = path.resolve(config.baseDir, config.logo.src)

    fs.cpSync(`${logoPath}`, `${config.publicPath}/logo.${logoExt}`, { recursive: true })

  }


  fs.writeFileSync(`${config.publicPath}/large/index.html`, indexContents)



  //Move SW
  fs.renameSync(`${config.publicPath}/large/reader/browser/sw-${config.VERSION}.js`, `${config.publicPath}/sw-${config.VERSION}.js`)
  fs.mkdirSync(config.publicPath, { recursive: true })

  // console.log(`Adding ${generateViewModel.firstPageExploreItems.length} items to index.`)


  const indexResult = Eta.render(indexEjs, {
    title: channelViewModel.channel.title,
    // firstPageExploreItems: generateViewModel.firstPageExploreItems,
    firstPost: itemViewModels[0],
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/index.html`, indexResult)


  //Mint page
  if (config.showMintPage) {

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

  fs.mkdirSync(`${config.publicPath}/attributes`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/attributes/index.html`, attributesResult)






  //Attribute page
  const attributeResult = Eta.render(attributeEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/attribute`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/attribute/index.html`, attributeResult)




  //Explore
  const exploreResult = Eta.render(exploreEjs, {
    title: channelViewModel.channel.title,
    firstPageExploreItems: generateViewModel.firstPageExploreItems,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/explore.html`, exploreResult)


  //Activity page
  const activityResult = Eta.render(activityEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/activity`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/activity/index.html`, activityResult)

  //Leaderboard page
  const leaderboardResult = Eta.render(leaderboardEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/leaderboard`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/leaderboard/index.html`, leaderboardResult)


  //Largest Sales page
  const largestSalesResult = Eta.render(largestSalesEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/sales`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/sales/index.html`, largestSalesResult)



  //Token Owner page
  const userResult = Eta.render(userEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/u`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/u/index.html`, userResult)

  //Token Owner activity page
  const userActivityResult = Eta.render(userActivityEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/u/activity`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/u/activity/index.html`, userActivityResult)


  //Transaction page
  const transactionResult = Eta.render(transactionEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.mkdirSync(`${config.publicPath}/transaction`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/transaction/index.html`, transactionResult)



  //404 page
  const fourOhFourResult = Eta.render(fourOhFourEjs, {
    title: channelViewModel.channel.title,
    baseViewModel: baseViewModel
  })

  fs.writeFileSync(`${config.publicPath}/404.html`, fourOhFourResult)


  //Build static pages

  //links
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

  //"none"
  if (channelViewModel.staticPagesViewModel?.none?.length > 0) {
    for (let staticPage of channelViewModel.staticPagesViewModel?.none) {

      const staticPagesResult = Eta.render(staticPageEjs, {
        title: channelViewModel.channel.title,
        staticPage: staticPage,
        baseViewModel: baseViewModel
      })

      fs.writeFileSync(`${config.publicPath}/${staticPage.slug}.html`, staticPagesResult)
    }
  }





  //Generate token pages
  let minTokenId = Math.min(...itemViewModels.map(i => i.item.tokenId))
  let maxTokenId = Math.max(...itemViewModels.map(i => i.item.tokenId))


  //Read the template file 
  for (let itemViewModel of itemViewModels) {

    let rowItemViewModel = itemWebService.translateRowItemViewModel(itemViewModel.item, itemViewModel.coverImage)

    let previous 
    let next 

    if (itemViewModel.item.tokenId != minTokenId) {
      previous = itemViewModels.filter( ivm => ivm.item.tokenId == itemViewModel.item.tokenId - 1)[0]
    }

    if (itemViewModel.item.tokenId != maxTokenId) {
      next = itemViewModels.filter( ivm => ivm.item.tokenId == itemViewModel.item.tokenId + 1)[0]
    }


    //Generate the token page
    console.time(`Generating /t/${itemViewModel.item.tokenId}`)

    const result = Eta.render(tokenEjs, {
      title: itemViewModel.item.title,
      itemViewModel: itemViewModel,
      baseViewModel: baseViewModel,
      previous: previous,
      next: next
    })


    fs.mkdirSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}`, { recursive: true })

    //Write the HTML page
    fs.writeFileSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}/index.html`, result)

    //Write rowItemViewModel
    fs.writeFileSync(`${config.publicPath}/t/${itemViewModel.item.tokenId}/rowItemViewModel.json`, Buffer.from(JSON.stringify(rowItemViewModel)))

    //Generate any images we need
    await generateService.generateImages(config, itemViewModel)


    console.timeEnd(`Generating /t/${itemViewModel.item.tokenId}`)

  }


  //Generate webp version of channel cover image
  await generateService.generateWebp(config, `${config.baseDir}/backup/export/images/${channelViewModel.channel.coverImageId}.jpg` , channelViewModel.channel.coverImageId)
  await generateService.generateWebp(config, `${config.baseDir}/backup/export/images/${channelViewModel.channel.coverBannerId}.jpg` , channelViewModel.channel.coverBannerId)



  //Write row items for each attribute
  for (let attributeTotal of attributeTotals) {

    let rowItemViewModels = await itemService.getRowItemViewModelsByTokenIds(attributeTotal.tokenIds)

    await writeAttributeRowItems(
      attributeTotal.traitType, 
      attributeTotal.value, 
      rowItemViewModels,  
      `${config.publicPath}/attributes/items`)
  }




  //Generate  webp version of channel profile pic


  await spawnService.spawnGenerateAfter(config.baseDir)

  console.log("Generation complete")

}


async function writeAttributeRowItems(traitType:string, value:string, rowItemViewModels:any[], filepath:string) {

  const escape = (s) => {
    return s.replace(/[^a-z0-9]/gi, '_').toLowerCase()
  }


  let dir = `${filepath}/${escape(traitType)}/${escape(value)}`

  fs.mkdirSync(dir, { recursive: true })

  //Write rowItemViewModels in pages 
  let perPage = 35

  let chunks = []

  //Break into rows
  for (let i = 0; i < rowItemViewModels.length; i += perPage) {
    let chunk = rowItemViewModels.slice(i, i + perPage)
    chunks.push(chunk)
  }

  let i = 1
  for (let chunk of chunks) {

    fs.writeFileSync(`${dir}/${i}.json`, Buffer.from(JSON.stringify({
      items: chunk,
      totalMatches: rowItemViewModels.length
    })))

    i++

  }

}


generate()

export {
  generate
}

