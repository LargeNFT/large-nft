import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"

import fs from "fs"

import { Container } from "inversify"

import excerptHtml from 'excerpt-html'
import he from 'he'


import { getMainContainer, GetMainContainerCommand } from "./inversify.config.js"

let channelId


import { GenerateService, GenerateViewModel } from "../reader/service/core/generate-service.js"
import { ProcessConfig } from "../reader/util/process-config.js"
import { ChannelWebService } from "../reader/service/web/channel-web-service.js"

import pkg from 'convert-svg-to-png';
import path from "path"
import { ItemViewModel } from "../reader/dto/viewmodel/item-view-model.js"
import { ItemWebService } from "../reader/service/web/item-web-service.js"


const { convert } = pkg



let generate = async () => {

  console.log("Starting generate")

  let config:any = await ProcessConfig.getConfig() 

  if (!config.externalLinks) {
    config.externalLinks = []
  }


  let container = new Container()

  container.bind("channelId").toConstantValue(() => {
    return channelId
  })
  container.bind('sequelize').toConstantValue({})


  container.bind("contracts").toConstantValue([])
  container.bind("convert-svg-to-png").toConstantValue(convert)

  

  let command:GetMainContainerCommand = {
    customContainer: container,
    channelDir: config.channelDir,
    runDir: config.runDir,    
    baseURI: config.baseURI,
    hostname: config.hostname,
    alchemy: undefined
  }

  container = await getMainContainer(command)


  //Get data services.
  let channelWebService:ChannelWebService = container.get("ChannelWebService")
  let itemWebService:ItemWebService = container.get("ItemWebService")

  let generateService:GenerateService = container.get("GenerateService")
  let eta:any = container.get("eta")


  await generateService.load()


  //Create public path.
  await fs.promises.mkdir(`${config.publicPath}/t`, { recursive: true })



  let channelViewModel = await channelWebService.get(0)
  channelId = channelViewModel.channel._id

  console.log(`Generating Large Reader for '${channelViewModel.channel.title}'`)


  //Generate item pages
  let itemViewModels:ItemViewModel[] = await itemWebService.list(0, config.maxItems)
  await generateService.generateItemPages(config, itemViewModels)


  let generateViewModel:GenerateViewModel = await generateService.getGenerateViewModel(config, itemViewModels)

  await generateService.defineEtaTemplates(config, config.channelDir)


  let baseViewModel:any = {
    channelViewModel: channelViewModel,
    attributeReport: await generateService.generateAttributeTotals(config, channelViewModel),
    routablePages: generateViewModel.routablePages,
    baseURL: config.baseURL,
    hostname: config.hostname,
    marketplaces: config.marketplaces,
    externalLinks: config.externalLinks,
    base64Version: generateViewModel.base64Version,
    channelId: channelViewModel.channel._id,
    showMintPage: config.showMintPage,
    showActivityPage: config.showActivityPage,
    excerptHtml: excerptHtml,
    he: he,
    logo: config.logo,
    libraryURL: config.libraryURL,
    largeURL: config.largeURL,
    headEndContents: generateViewModel.headEndContents,
    bodyContents: generateViewModel.bodyContents
  }

  if (!fs.existsSync(`${config.publicPath}/backup`)) {
    console.time("Copying backup...")
    fs.cpSync(`${config.channelDir}/backup`, `${config.publicPath}/backup`, { recursive: true })
    console.timeEnd("Copying backup...")
  }



  //Copy logo
  if (config.logo?.src) {

    //Get ext 
    let logoExt = config.logo?.src.split('.').pop()

    //Logo location
    let logoPath = path.resolve(config.channelDir, config.logo.src)

    fs.cpSync(`${logoPath}`, `${config.publicPath}/logo.${logoExt}`, { recursive: true })

  }


  if (!config.libraryURL) {

    //Generate library 
    //If there's no libraryURL configured then we need to include a copy of the admin app.
    console.time("Copying Large NFT Admin...")

    if (fs.existsSync(`${config.publicPath}/large`)) {
      fs.rmSync(`${config.publicPath}/large`, { recursive: true })
    }
  
    fs.cpSync(`${config.runDir}/node_modules/large-nft/public`, config.publicPath, { recursive: true })
  
    //Don't need this part.
    if (fs.existsSync(`${config.publicPath}/r`)) {
      fs.rmSync(`${config.publicPath}/r`, { recursive: true })
    }



    //Read app.html and index.html from Large and update the paths.
    let indexBuffer = fs.readFileSync(`${config.publicPath}/large/index.html`)
  
    let indexContents = indexBuffer.toString()
  
    indexContents = indexContents.replace(`../admin/app/js/runtime.admin.js`, `${config.baseURL}large/admin/app/js/runtime.admin.js?v=${config.VERSION}`)
    indexContents = indexContents.replace(`../admin/app/js/vendors.admin.js`, `${config.baseURL}large/admin/app/js/vendors.admin.js?v=${config.VERSION}`)
    indexContents = indexContents.replace(`../admin/app/js/main.admin.js`, `${config.baseURL}large/admin/app/js/main.admin.js?v=${config.VERSION}`)
  
  
    //Footer for the admin
    let adminFooter
  
    try {
      adminFooter = await fs.promises.readFile(config.adminFooter)
    } catch(ex) {}
  
  
    //Inject admin footer template.
    if (adminFooter?.length > 0) {
  
      let footerTemplate = eta.renderString(adminFooter.toString(), { 
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
  
    fs.writeFileSync(`${config.publicPath}/large/index.html`, indexContents)

    //Move SW
    fs.renameSync(`${config.publicPath}/large/reader/browser/sw-${config.VERSION}.js`, `${config.publicPath}/sw-${config.VERSION}.js`)


    console.timeEnd("Copying Large NFT Admin...")


  } 



  fs.mkdirSync(`${config.publicPath}/s`, { recursive: true })

  //Generate HTML
  await generateService.generatePages(config, channelViewModel, generateViewModel, baseViewModel)

  //Generate webp version of channel cover image
  if (channelViewModel.channel.coverImageId) {
    await generateService.generateWebp(config, `${config.channelDir}/backup/export/images/${channelViewModel.channel.coverImageId}.jpg` , channelViewModel.channel.coverImageId, 100)
  }

  if (channelViewModel.channel.coverBannerId) {
    await generateService.generateWebp(config, `${config.channelDir}/backup/export/images/${channelViewModel.channel.coverBannerId}.jpg` , channelViewModel.channel.coverBannerId)
  }

  await generateService.generateAttributeItems(config, baseViewModel.attributeReport)

  //Generate web manifest
  await generateService.generateManifest(config, channelViewModel)

  //Generate apple touch icon
  await generateService.generateAppleTouchIcon(config)

  if (!fs.existsSync(`${config.publicPath}/sync/transactions`)) {
    fs.mkdirSync(`${config.publicPath}/sync/transactions`, { recursive: true })
  }

  if (!fs.existsSync(`${config.publicPath}/sync/home.json`)) {
    console.log(`Creating ${config.publicPath}/sync/home.json`)
    fs.writeFileSync(`${config.publicPath}/sync/home.json`, Buffer.from(JSON.stringify({})))
  }

  if (!fs.existsSync(`${config.publicPath}/sync/transactions/latest.json`)) {
    console.log(`Creating ${config.publicPath}/sync/transactions/latest.json`)
    fs.writeFileSync(`${config.publicPath}/sync/transactions/latest.json`, Buffer.from(JSON.stringify({})))
  }

  console.log("Generation complete")

}


try {
  generate()
} catch(ex) {
  console.log(ex)
}


export {
  generate
}


