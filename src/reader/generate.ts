import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import arg from 'arg'
import * as Eta from 'eta'

import { Container } from "inversify"

import excerptHtml from 'excerpt-html'
import he from 'he'



import { getMainContainer, GetMainContainerCommand } from "./node-inversify.config.js"
import { ItemWebService } from "./service/web/item-web-service.js"

let channelId

import tokenEjs from './ejs/pages/token.ejs'
import indexEjs from './ejs/index.ejs'
import mintEjs from './ejs/mint.ejs'
import searchEjs from './ejs/search.ejs'
import fourOhFourEjs from './ejs/404.ejs'

import attributesEjs from './ejs/pages/attributes.ejs'
import exploreEjs from './ejs/pages/explore.ejs'
import staticPageEjs from './ejs/pages/static-page.ejs'
import activityEjs from './ejs/pages/activity.ejs'
import userEjs from './ejs/pages/user.ejs'
import userActivityEjs from './ejs/pages/user-activity.ejs'
import transactionEjs from './ejs/pages/transaction.ejs'

import leaderboardEjs from './ejs/pages/leaderboard.ejs'

import { GenerateService, GenerateViewModel } from "./service/core/generate-service.js"
import { ProcessConfig } from "./util/process-config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"
import { ItemViewModel } from "./dto/viewmodel/item-view-model.js"

import pkg from 'convert-svg-to-png';
const { convert } = pkg;

// import sharp from "sharp"


let generate = async () => {

  let config:any = await ProcessConfig.getConfig() 


  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })

  container.bind("PouchDB").toConstantValue({})
  container.bind("contracts").toConstantValue([])
  container.bind("convert-svg-to-png").toConstantValue(convert)
  // container.bind("sharp").toConstantValue(sharp)


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
  let channelWebService:ChannelWebService = container.get("ChannelWebService")
  let generateService:GenerateService = container.get("GenerateService")

  //Create public path.
  await fs.promises.mkdir(`${config.publicPath}`, { recursive: true })


  //Look up channel and items.
  let channelViewModel = await channelWebService.get(0)
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


  let generateViewModel:GenerateViewModel = await generateService.getGenerateViewModel(config)

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
    routablePages: generateViewModel.routablePages,
    baseURL: config.baseURL,
    hostname: config.hostname,
    marketplaces: config.marketplaces,
    externalLinks: config.externalLinks,
    base64Version: generateViewModel.base64Version,
    channelId: channelViewModel.channel._id,
    showMintPage: config.showMintPage,
    showActivityPage: config.showActivityPage,
    headContents: headContents,
    bodyContents: bodyContents,
    excerptHtml: excerptHtml,
    he: he,
    baseDir: config.baseDir
  }



  console.log("Copying backup and Large Admin...")
  fs.cpSync(`${config.baseDir}/backup`, `${config.publicPath}/backup`, { recursive: true })
  fs.cpSync(`${config.baseDir}/node_modules/large-nft/public`, `${config.publicPath}/large`, { recursive: true })

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

  console.log(`Adding ${generateViewModel.firstPageExploreItems.length} items to index.`)


  const indexResult = Eta.render(indexEjs, {
    title: channelViewModel.channel.title,
    firstPageExploreItems: generateViewModel.firstPageExploreItems,
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

  fs.writeFileSync(`${config.publicPath}/attributes.html`, attributesResult)

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

  fs.mkdirSync(`${config.publicPath}/u`, { recursive: true })
  fs.writeFileSync(`${config.publicPath}/u/activity.html`, userActivityResult)


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

}



generate()

