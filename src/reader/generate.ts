import "core-js/stable/index.js"
import "regenerator-runtime/runtime.js"
import "reflect-metadata"


import fs from "fs"
import * as Eta from 'eta'

import { Container } from "inversify"

import excerptHtml from 'excerpt-html'
import he from 'he'


import { getMainContainer, GetMainContainerCommand } from "../sync/inversify.config.js"

let channelId

import _initEjs from './ejs/template/_init.ejs'
import _metaTagsEjs from './ejs/template/_meta_tags.ejs'
import _metaTagsJsEjs from './ejs/template/_meta_tags_js.ejs'

import { GenerateService, GenerateViewModel } from "./service/core/generate-service.js"
import { ProcessConfig } from "./util/process-config.js"
import { ChannelWebService } from "./service/web/channel-web-service.js"

import pkg from 'convert-svg-to-png';
import { StaticPage } from "./dto/static-page.js"
import path from "path"


const { convert } = pkg;



let generate = async () => {

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
  let generateService:GenerateService = container.get("GenerateService")

  await generateService.load()


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


  let channelViewModel = await channelWebService.get(0, additionalStaticPages)
  channelId = channelViewModel.channel._id


  let generateViewModel:GenerateViewModel = await generateService.getGenerateViewModel(config, additionalStaticPages)

  await generateService.generateItemPages(config, generateViewModel.itemViewModels)
  await generateService.defineEtaTemplates(config)

  let baseViewModel = {
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
    headEndContents: `
    <script defer src="${config.baseURL}large/reader/browser/js/runtime-${config.VERSION}.reader.js"></script>
    <script defer src="${config.baseURL}large/reader/browser/js/vendors-${config.VERSION}.reader.js"></script>
    <script defer src="${config.baseURL}large/reader/browser/js/main-${config.VERSION}.reader.js"></script>
      `,
    bodyContents: ``,
    excerptHtml: excerptHtml,
    he: he,
    logo: config.logo,
    largeURL: config.largeURL
  }

  console.time("Copying backup...")
  fs.cpSync(`${config.channelDir}/backup`, `${config.publicPath}/backup`, { recursive: true })
  console.timeEnd("Copying backup...")



  if (!config.skipAdmin) {

    console.time("Copying Large NFT Admin...")

    if (fs.existsSync(`${config.publicPath}/large`)) {
      fs.rmSync(`${config.publicPath}/large`, { recursive: true })
    }

    fs.cpSync(`${config.runDir}/node_modules/large-nft/public`, `${config.publicPath}/large`, { recursive: true })


    //Read app.html and index.html from Large and update the paths.
    let indexBuffer = fs.readFileSync(`${config.publicPath}/large/index.html`)

    let indexContents = indexBuffer.toString()

    indexContents = indexContents.replace(`../admin/app/js/runtime-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/runtime-${config.VERSION}.admin.js`)
    indexContents = indexContents.replace(`../admin/app/js/vendors-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/vendors-${config.VERSION}.admin.js`)
    indexContents = indexContents.replace(`../admin/app/js/main-${config.VERSION}.admin.js`, `${config.baseURL}large/admin/app/js/main-${config.VERSION}.admin.js`)


    //Footer for the admin
    let adminFooter

    try {
      adminFooter = await fs.promises.readFile(config.adminFooter)
    } catch(ex) {}


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
      let logoPath = path.resolve(config.channelDir, config.logo.src)

      fs.cpSync(`${logoPath}`, `${config.publicPath}/logo.${logoExt}`, { recursive: true })

    }


    fs.writeFileSync(`${config.publicPath}/large/index.html`, indexContents)

    //Move SW
    fs.renameSync(`${config.publicPath}/large/reader/browser/sw-${config.VERSION}.js`, `${config.publicPath}/sw-${config.VERSION}.js`)

    console.timeEnd("Copying Large NFT Admin...")


  }


  fs.mkdirSync(config.publicPath, { recursive: true })


  //Generate HTML
  await generateService.generatePages(config, channelViewModel, generateViewModel, baseViewModel)

  //Generate webp version of channel cover image
  await generateService.generateWebp(config, `${config.channelDir}/backup/export/images/${channelViewModel.channel.coverImageId}.jpg` , channelViewModel.channel.coverImageId)
  await generateService.generateWebp(config, `${config.channelDir}/backup/export/images/${channelViewModel.channel.coverBannerId}.jpg` , channelViewModel.channel.coverBannerId)

  await generateService.generateAttributeItems(config, baseViewModel.attributeReport)


  console.log("Generation complete")

}



generate()

export {
  generate
}


