import { inject, injectable } from "inversify";

import he from "he"
import fs from "fs"
import path from "path";


import { ethers } from "ethers"



import { ItemResults, RowItemViewModel } from "../../dto/item-page.js";
import { StaticPage } from "../../dto/static-page.js";
import { ItemViewModel } from "../../dto/viewmodel/item-view-model.js";
import { StaticPageService } from "../static-page-service.js";
import { ItemWebService } from "../web/item-web-service.js";


import { ItemService } from "../item-service.js";
import { ItemRepository } from "../../repository/item-repository.js";
import { StaticPageRepository } from "../../repository/static-page-repository.js";


import tokenEjs from '../../ejs/pages/token.ejs'
import indexEjs from '../../ejs/index.ejs'
import libraryIndexEjs from '../../../sync-library/ejs/index.ejs'
import fourOhFourLibraryEjs from '../../../sync-library/ejs/404.ejs'

import _headEjs from '../../ejs/template/_head.ejs'
import _initEjs from '../../ejs/template/_init.ejs'
import _metaTagsEjs from '../../ejs/template/_meta_tags.ejs'
import _metaTagsJsEjs from '../../ejs/template/_meta_tags_js.ejs'

import footerEjs from '../../ejs/footer.ejs'

import mintEjs from '../../ejs/mint.ejs'
import searchEjs from '../../ejs/search.ejs'
import fourOhFourEjs from '../../ejs/404.ejs'

import attributesEjs from '../../ejs/pages/attributes.ejs'
import attributeEjs from '../../ejs/pages/attribute.ejs'
import exploreEjs from '../../ejs/pages/explore.ejs'
import staticPageEjs from '../../ejs/pages/static-page.ejs'
import activityEjs from '../../ejs/pages/activity.ejs'
import userEjs from '../../ejs/pages/user.ejs'
import userActivityEjs from '../../ejs/pages/user-activity.ejs'
import transactionEjs from '../../ejs/pages/transaction.ejs'

import leaderboardEjs from '../../ejs/pages/leaderboard.ejs'
import largestSalesEjs from '../../ejs/pages/sales.ejs'

const PER_PAGE = 40

@injectable()
class GenerateService {

    constructor(
        @inject("ItemService") private itemService: ItemService,
        @inject("ItemWebService") private itemWebService: ItemWebService,
        @inject("StaticPageService") private staticPageService: StaticPageService,
        @inject("ItemRepository") private itemRepository: ItemRepository,
        @inject("StaticPageRepository") private staticPageRepository:StaticPageRepository,
        @inject("convert-svg-to-png") private convert,
        @inject("eta") private eta,
        @inject("jimp") private jimp
    ) { }

    async load() {
        //@ts-ignore
        await this.itemRepository.load()

        //@ts-ignore
        await this.staticPageRepository.load()

    }

    async getGenerateViewModel(config, itemViewModels:ItemViewModel[]): Promise<GenerateViewModel> {

        //Get first page of items for explore page
        let itemResults: ItemResults = await this.itemWebService.exploreList({}, 0, PER_PAGE)

        let generateViewModel: GenerateViewModel = {
            itemViewModels: itemViewModels,
            firstPageExploreItems: itemResults.items,
            routablePages: await this.staticPageService.listRoutablePages(),
            base64Version: Buffer.from(JSON.stringify(config.VERSION)).toString('base64'),
            bodyContents: ``,
            headEndContents: ``
        }



        if (config.libraryURL) {

          //https://web.dev/defer-non-critical-css/
          
          generateViewModel.headEndContents = `
          <script defer src="/large/library/browser/js/runtime.library.js?v=${config.VERSION}"></script>
          <script defer src="/large/library/browser/js/vendors.library.js?v=${config.VERSION}"></script>
          <script defer src="/large/library/browser/js/main.library.js?v=${config.VERSION}"></script>

          <link rel="preload" href="/large/library/browser/css/vendors.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">
          <link rel="preload" href="/large/library/browser/css/main.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">

          `

        } else {

          generateViewModel.headEndContents = `
          <script defer src="${config.baseURL}large/reader/browser/js/runtime.reader.js?v=${config.VERSION}"></script>
          <script defer src="${config.baseURL}large/reader/browser/js/vendors.reader.js?v=${config.VERSION}"></script>
          <script defer src="${config.baseURL}large/reader/browser/js/main.reader.js?v=${config.VERSION}"></script>

          <link rel="preload" href="${config.baseURL}large/reader/browser/css/vendors.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">
          <link rel="preload" href="${config.baseURL}large/reader/browser/css/main.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">

          `
        }



        return generateViewModel

    }

    async generateImages(config, item:ItemViewModel) {

        fs.mkdirSync(`${config.publicPath}/backup/generated/images/50x50`, { recursive: true })
        fs.mkdirSync(`${config.publicPath}/backup/generated/images/100x100`, { recursive: true })


        //For now just the one
        if (item.coverImage.generated) {
            //Create PNG from SVG to show on Twitter/Discord preview
            await this.generatePNGForItem(config, item)

        } else {

            let imagePath = `${config.publicPath}/backup/export/images/${item.coverImage._id}.jpg` 

            //Generate thumbnail
            await this.generateWebp(config, imagePath, item.coverImage._id, 50)

        }


    }

    async generatePNGForItem(config, item:ItemViewModel) {

        let path = `${config.publicPath}/backup/generated/images/${item.coverImage._id}.png` 

        if (!fs.existsSync(path)) {
    
            console.log(`Converting SVG to PNG: ${path}`)    
            
            await this.generatePNGFromSVG(item.coverImage.svg, path, 1200, 1200)

        } else {
          // console.log(`Skipping ${item.coverImage._id}.png`)
        }

        return path

    }

    async generatePNGFromSVG(svg:string, outputPath:string, height:number, width:number) {

      let png = await this.convert(svg, {
        height: height,
        width: width,
        puppeteer: { 
          args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        }
      })

      fs.writeFileSync(outputPath, png)

    }

    async generateWebp(config, imagePath, imageId, size?) {

        let filename = `${config.publicPath}/backup/generated/images${size ? `/${size}x${size}/` : '/'}${imageId}.webp`

        if (!fs.existsSync(filename)) {
    
            try {

              //@ts-ignore
              let file = await this.jimp.read(imagePath)

              if (size) {
                  //Generate and resize
                  file.resize(size, size).write(filename)
              } else {
                  //Generate
                  file.write(filename)
              }

              console.log(`Created webp at: ${filename} from ${imagePath}`)    

            } catch(ex) {
              console.log(`Error creating webp at: ${filename} from ${imagePath}`, ex.message)    
            }

        } else {

          // console.log(`Skipping thumbnail ${imageId}.png`)

        }


    }

    async generateCollage(config, items:ItemViewModel[]) {

        // const PER_ROW = 100
        // const THUMBNAIL_WIDTH = 50

        // let rows = Math.ceil(items?.length / PER_ROW)

        // let width 

        // if (rows == 1) {
        //     width = items.length * THUMBNAIL_WIDTH
        // } else {
        //     width = PER_ROW * THUMBNAIL_WIDTH
        // }

        // let height = rows * THUMBNAIL_WIDTH

        // let collageBg = await this.sharp({
        //     create: {
        //       width: width,
        //       height: height
        //     }
        //   })
        //   .png()
        //   .toBuffer()




        // let composites = items.map( ivm => {

        //     return {
        //         input: `${config.publicPath}/backup/generated/images/50x50/${ivm.coverImage._id}.png`,

        //     }

        // })


        // await this.sharp(collageBg) //here call the previous generated image
        //         .composite([
        //             { input: './images/output1.jpg', gravity: 'northwest' },
        //             { input: './images/output2.jpg', gravity: 'northeast' },
        //             { input: './images/output3.jpg', gravity: 'southwest' },
        //             { input: './images/output4.jpg', gravity: 'southeast' },
        //         ])
        //         .toFile('combined.jpg');

    }

    async generateManifest(config, channelViewModel) {

      fs.writeFileSync(`${config.publicPath}/manifest-icon.svg`, `<svg viewBox='0 0 1200 1200' xmlns='http://www.w3.org/2000/svg' version='1.1' style="background-color:rgb(28,28,29);">
            
            <style>
              .logo { fill:#FCB827; font-size: 800px; font-weight:600; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; }
            </style>
            
            <g>
              <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="logo">${channelViewModel.channel.symbol.substring(0,1)}</text>    

            </g>
        </svg>`)


      fs.writeFileSync(`${config.publicPath}/app.webmanifest`, JSON.stringify({
        "name": channelViewModel.channel.title,
        "short-name": channelViewModel.channel.symbol,
        "description": `Browse ${channelViewModel.channel.title}`,
        "display": "standalone",
        "theme_color": "#FCB827",
        "theme-color": "#FCB827",
        "background_color": "#808080",
        "icons": [
          {
            "src": "manifest-icon.svg",
            "sizes": "150x150",
            "type": "image/svg+xml",
            "purpose": "any"
          }
        ],

        "start_url": "index.html"
      }))

    
    }

    async generateAppleTouchIcon(config) {

      let buffer = fs.readFileSync(`${config.publicPath}/manifest-icon.svg`)
      
      await this.generatePNGFromSVG(buffer.toString(), `${config.publicPath}/apple-touch-icon.png`, 180, 180)

    }
    
    async writeAttributeRowItems(traitType:string, value:string, rowItemViewModels:any[], filepath:string) {

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

    async generateAttributeItems(config, attributeTotals) {

        //Write row items for each attribute
    for (let attributeTotal of attributeTotals) {

        let rowItemViewModels = await this.itemService.getRowItemViewModelsByTokenIds(attributeTotal.tokenIds)

        await this.writeAttributeRowItems(
        attributeTotal.traitType, 
        attributeTotal.value, 
        rowItemViewModels,  
        `${config.publicPath}/attributes/items`)
    }

    }

    async generateItemPages(config, itemViewModels) {

    let itemPages = await this.itemWebService.buildItemPages(itemViewModels, PER_PAGE)

    //Write item pages to files
    let pageCount = 0
    await fs.mkdirSync(`${config.publicPath}/itemPages`, { recursive: true })
    
    for (let itemPage of itemPages) {
        // console.log(`Writing item page: public/itemPages/${pageCount}.json`)
        fs.writeFileSync(`${config.publicPath}/itemPages/${pageCount}.json`, JSON.stringify(itemPage))
        pageCount++
    }
    
    }

    async generateAttributeTotals(config, channelViewModel) {

        //Attribute report. Write to file.
        let attributeTotals = await this.itemWebService.buildAttributeTotals(channelViewModel.channel)
        fs.writeFileSync(`${config.publicPath}/attributeTotals.json`, JSON.stringify(attributeTotals))

        return attributeTotals
    }

    async defineEtaTemplates(config, rootDir) {

        //Load init eta template
        this.eta.loadTemplate("@init", _initEjs)
        this.eta.loadTemplate("@meta_tags", _metaTagsEjs)
        this.eta.loadTemplate("@meta_tags_js", _metaTagsJsEjs)


        //Template hooks.
        /** Hook: headStart */
        let headStartContents

        try {
            headStartContents = fs.readFileSync(path.resolve(rootDir, config.headStart))
        } catch(ex) {}

        this.eta.loadTemplate("@headStart", headStartContents ? headStartContents?.toString() : '')


        //Load the default footer or use a configured template.
        /** Hook: footer */
        let footer

        try {
            footer = fs.readFileSync(path.resolve(rootDir, config.footer))
        } catch(ex) {}



        this.eta.loadTemplate("@footer", footer ? footer?.toString() : footerEjs)
        
    }
    
    async generateLibraryPages(config, syncDir) {

      if (!fs.existsSync(`${syncDir}${config.libraryURL}`)) {
        fs.mkdirSync(`${syncDir}${config.libraryURL}`)
      }

      await this.defineEtaTemplates(config, process.env.INIT_CWD)

      let baseViewModel:any = {
        routablePages: [],
        baseURL: config.baseURL,
        hostname: config.hostname,
        base64Version: Buffer.from(JSON.stringify(config.VERSION)).toString('base64'),
        logo: config.logo,
        libraryURL: config.libraryURL,
        largeURL: config.largeURL,
        headEndContents: `
      <script defer src="${config.largeURL}/library/browser/js/runtime.library.js?v=${config.VERSION}"></script>
      <script defer src="${config.largeURL}/library/browser/js/vendors.library.js?v=${config.VERSION}"></script>
      <script defer src="${config.largeURL}/library/browser/js/main.library.js?v=${config.VERSION}"></script>

      <link rel="preload" href="${config.largeURL}/library/browser/css/vendors.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">
      <link rel="preload" href="${config.largeURL}/library/browser/css/main.css?v=${config.VERSION}" as="style" onload="this.onload=null;this.rel='stylesheet'">


        `,
        bodyContents: ``
      }
      
      await this.renderPage(
        config,
        libraryIndexEjs,
        {
          baseViewModel: baseViewModel,
          title: config.title
        },
        `${syncDir}${config.libraryURL}/index.html`
      )

      //404 page
      await this.renderPage(
        config,
        fourOhFourLibraryEjs,
        {
          baseViewModel: baseViewModel,
          title: "404 Page Not Found"
        },
        `${syncDir}${config.libraryURL}/404.html`
      )


    }

    async generatePages(config, channelViewModel, generateViewModel, baseViewModel) {

      fs.mkdirSync(`${config.publicPath}/attributes`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/attribute`, { recursive: true })

      fs.mkdirSync(`${config.publicPath}/activity`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/leaderboard`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/sales`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/u`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/u/activity`, { recursive: true })
      fs.mkdirSync(`${config.publicPath}/transaction`, { recursive: true })


      await this.renderPage(
        config,
        indexEjs,
        {
          title: channelViewModel.channel.title,
          firstPost: generateViewModel.itemViewModels[0],
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/index.html`
      )


      //Mint page
      if (config.showMintPage) {
        
        await this.renderPage(
          config,
          mintEjs,
          {
            title: channelViewModel.channel.title,
            baseViewModel: baseViewModel
          },
          `${config.publicPath}/mint.html`
        )

      }
    
    
      //Search page
      await this.renderPage(
        config,
        searchEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/search.html`
      )






      //Attribute Report
      await this.renderPage(
        config,
        attributesEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/attributes/index.html`
      )



    
    
      //Attribute page
      await this.renderPage(
        config,
        attributeEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/attribute/index.html`
      )


    
    
      //Explore
      await this.renderPage(
        config,
        exploreEjs,
        {
          title: channelViewModel.channel.title,
          firstPageExploreItems: generateViewModel.firstPageExploreItems,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/explore.html`
      )



      //Activity page
      await this.renderPage(
        config,
        activityEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/activity/index.html`
      )



      //Leaderboard page
      await this.renderPage(
        config,
        leaderboardEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/leaderboard/index.html`
      )



      //Largest Sales page
      await this.renderPage(
        config,
        largestSalesEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/sales/index.html`
      )



    
      //Token Owner page
      await this.renderPage(
        config,
        userEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/u/index.html`
      )


      //Token Owner activity page
      await this.renderPage(
        config,
        userActivityEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/u/activity/index.html`
      )


    
      //Transaction page
      await this.renderPage(
        config,
        transactionEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/transaction/index.html`
      )


      //404 page
      await this.renderPage(
        config,
        fourOhFourEjs,
        {
          title: channelViewModel.channel.title,
          baseViewModel: baseViewModel
        },
        `${config.publicPath}/404.html`
      )

    
      //Build static pages
    
      //links
      if (channelViewModel.staticPagesViewModel?.links?.length > 0) {
        for (let staticPage of channelViewModel.staticPagesViewModel?.links) {

          await this.renderPage(
            config,
            staticPageEjs,
            {
              title: channelViewModel.channel.title,
              staticPage: staticPage,
              baseViewModel: baseViewModel
            },
            `${config.publicPath}/s/${staticPage.slug}.html`
          )

        }
      }
    
      //"none"
      if (channelViewModel.staticPagesViewModel?.none?.length > 0) {
        for (let staticPage of channelViewModel.staticPagesViewModel?.none) {
    
          await this.renderPage(
            config,
            staticPageEjs,
            {
              title: channelViewModel.channel.title,
              staticPage: staticPage,
              baseViewModel: baseViewModel
            },
            `${config.publicPath}/s/${staticPage.slug}.html`
          )


        }
      }
    

    
      //Generate token pages
      let minTokenId = Math.min(...generateViewModel.itemViewModels.map(i => i.item.tokenId))
      let maxTokenId = Math.max(...generateViewModel.itemViewModels.map(i => i.item.tokenId))
    
    
    
      let rowItemViewModels = []
    
      //Write all row item view models
      for (let itemViewModel of generateViewModel.itemViewModels) {
        rowItemViewModels.push(this.itemWebService.translateRowItemViewModel(itemViewModel.item, itemViewModel.coverImage))
      }
    

      fs.writeFileSync(`${config.publicPath}/t/all.json`, Buffer.from(JSON.stringify(rowItemViewModels)))
    
      
      //Read the template file 
      for (let itemViewModel of generateViewModel.itemViewModels) {
    
        let rowItemViewModel = this.itemWebService.translateRowItemViewModel(itemViewModel.item, itemViewModel.coverImage)
    
        let previous 
        let next 
    
        if (rowItemViewModel.tokenId != minTokenId) {
          previous = generateViewModel.itemViewModels.filter( ivm => ivm.item.tokenId == rowItemViewModel.tokenId - 1)[0]
        }
    
        if (rowItemViewModel.tokenId != maxTokenId) {
          next = generateViewModel.itemViewModels.filter( ivm => ivm.item.tokenId == rowItemViewModel.tokenId + 1)[0]
        }
    
    
        //Generate the token page
        console.time(`Generating /t/${rowItemViewModel.tokenId}`)
        
        fs.mkdirSync(`${config.publicPath}/t/${rowItemViewModel.tokenId}`, { recursive: true })

        await this.renderPage(
          config,
          tokenEjs,
          {
            title: rowItemViewModel.title,
            itemViewModel: itemViewModel,
            baseViewModel: baseViewModel,
            previous: previous,
            next: next,
            ethers: ethers
          },
          `${config.publicPath}/t/${rowItemViewModel.tokenId}/index.html`
        )

    
        //Write rowItemViewModel
        fs.writeFileSync(`${config.publicPath}/t/${rowItemViewModel.tokenId}/rowItemViewModel.json`, Buffer.from(JSON.stringify(rowItemViewModel)))
    

        //Generate any images we need
        await this.generateImages(config, itemViewModel)

    
        console.timeEnd(`Generating /t/${rowItemViewModel.tokenId}`)
    
      }
    
    }

    async renderPage(config, ejsTemplate, model, filepath) {

      const result = this.eta.renderString(ejsTemplate, model)

      //Create partial
      const pageContent = result.substring(
        result.indexOf("<!--pageContent-->") + 19, 
        result.lastIndexOf("<!--/pageContent-->")
      )

      const scriptContent = result.substring(
        result.indexOf("//pageInitScripts") + 18, 
        result.lastIndexOf("///pageInitScripts")
      )

      let partialResult = `
          <template>
              ${he.unescape(pageContent)}
          </template>

          <script>

              ${scriptContent}

              export default init
          </script>
      `

      //Write file
      fs.writeFileSync(filepath, result.replace(scriptContent, "").replace(pageContent, ""))

      let partialPath = filepath.replace(config.publicPath, `${config.publicPath}/partial`)

      if (config.libraryURL) {
        partialPath = partialPath.replace(config.libraryURL, `${config.libraryURL}/partial`)
      }

      //Create partial directory
      const partialDirName = path.dirname(partialPath)

      if (!fs.existsSync(partialDirName)) {
          fs.mkdirSync(partialDirName, { recursive: true })
      }
  
      //Write partial
      fs.writeFileSync(partialPath, partialResult)


    }

}


interface GenerateViewModel {
    itemViewModels:ItemViewModel[],
    firstPageExploreItems: RowItemViewModel[],
    routablePages: StaticPage[],
    base64Version: string,
    headEndContents: string,
    bodyContents: string
}



export {
    GenerateService, GenerateViewModel
}