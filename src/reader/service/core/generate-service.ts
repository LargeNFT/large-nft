import { inject, injectable } from "inversify";
import fs from "fs"
import * as Eta from 'eta'


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
import { SyncStatusService } from "../../../library/service/sync-status-service.js";





const PER_PAGE = 40

@injectable()
class GenerateService {

    constructor(
        @inject("ItemService") private itemService: ItemService,
        @inject("ItemWebService") private itemWebService: ItemWebService,
        @inject("StaticPageService") private staticPageService: StaticPageService,
        @inject("SyncStatusService") private syncStatusService: SyncStatusService,

        @inject("ItemRepository") private itemRepository: ItemRepository,
        @inject("StaticPageRepository") private staticPageRepository:StaticPageRepository,
        @inject("convert-svg-to-png") private convert,
        @inject("sharp") private sharp
    ) { }

    async load() {
        //@ts-ignore
        await this.itemRepository.load()
        //@ts-ignore
        await this.staticPageRepository.load()
    }


    async getGenerateViewModel(config, additionalStaticPages?:StaticPage[]): Promise<GenerateViewModel> {

        //Get first page of items for explore page
        let itemResults: ItemResults = await this.itemWebService.exploreList({}, 0, PER_PAGE)

        let itemViewModels:ItemViewModel[] = await this.itemWebService.list(0, config.maxItems)

        let generateViewModel: GenerateViewModel = {
            itemViewModels: itemViewModels,
            firstPageExploreItems: itemResults.items,
            routablePages: await this.staticPageService.listRoutablePages(additionalStaticPages),
            base64Version: Buffer.from(JSON.stringify(config.VERSION)).toString('base64'),
            headContents: `
                <script defer src="${config.baseURL}large/reader/browser/js/runtime.reader.js"></script>
                <script defer src="${config.baseURL}large/reader/browser/js/vendors.reader.js"></script>
                <script defer src="${config.baseURL}large/reader/browser/js/main.reader.js"></script>
            `,
            bodyContents: ``

        }

        return generateViewModel

    }

    async generateImages(config, item:ItemViewModel) {

        await fs.promises.mkdir(`${config.publicPath}/backup/generated/images/50x50`, { recursive: true })

        //For now just the one
        if (item.coverImage.generated) {

            //Create PNG from SVG to show on Twitter/Discord preview
            await this.generatePNGFromSVG(config, item)

        } else {

            let imagePath = `${config.baseDir}/backup/export/images/${item.coverImage._id}.jpg` 

            //Generate thumbnail
            await this.generateWebp(config, imagePath, item.coverImage._id, 50)

        }


    }

    async generatePNGFromSVG(config, item:ItemViewModel) {

        let path = `${config.publicPath}/backup/generated/images/${item.coverImage._id}.png` 

        if (!fs.existsSync(path)) {
    
            console.log(`Converting SVG to PNG: ${path}`)    
            
            let png = await this.convert(item.coverImage.svg, {
              height: 1200,
              width: 1200
            })
      
            await fs.promises.writeFile(path, png)

        } else {
          console.log(`Skipping ${item.coverImage._id}.png`)
        }

        return path

    }

    async generateWebp(config, imagePath, imageId, size?) {

        let filename = `${config.publicPath}/backup/generated/images${size ? `/${size}x${size}/` : '/'}${imageId}.webp`

        if (!fs.existsSync(filename)) {
    
            console.log(`Creating webp at: ${filename}`)    

            if (size) {
                //Generate and resize
                await this.sharp(imagePath)
                .resize(size)
                .toFile(filename)
            } else {
                //Generate and resize
                await this.sharp(imagePath)
                .toFile(filename)
            }

        } else {

          console.log(`Skipping thumbnail ${imageId}.png`)

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


    async generatePages(config, channelViewModel, generateViewModel, baseViewModel) {

        const indexResult = Eta.render(indexEjs, {
          title: channelViewModel.channel.title,
          // firstPageExploreItems: generateViewModel.firstPageExploreItems,
          firstPost: generateViewModel.itemViewModels[0],
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
      
          const result = Eta.render(tokenEjs, {
            title: rowItemViewModel.title,
            itemViewModel: itemViewModel,
            baseViewModel: baseViewModel,
            previous: previous,
            next: next
          })
      
      
          fs.mkdirSync(`${config.publicPath}/t/${rowItemViewModel.tokenId}`, { recursive: true })
      
          //Write the HTML page
          fs.writeFileSync(`${config.publicPath}/t/${rowItemViewModel.tokenId}/index.html`, result)
      
          //Write rowItemViewModel
          fs.writeFileSync(`${config.publicPath}/t/${rowItemViewModel.tokenId}/rowItemViewModel.json`, Buffer.from(JSON.stringify(rowItemViewModel)))
      
          //Generate any images we need
          await this.generateImages(config, itemViewModel)
      
      
          console.timeEnd(`Generating /t/${rowItemViewModel.tokenId}`)
      
        }
      
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
    await fs.promises.mkdir(`${config.publicPath}/itemPages`, { recursive: true })
    
    for (let itemPage of itemPages) {
        // console.log(`Writing item page: public/itemPages/${pageCount}.json`)
        await fs.promises.writeFile(`${config.publicPath}/itemPages/${pageCount}.json`, JSON.stringify(itemPage))
        pageCount++
    }
    
    }

    async generateAttributeTotals(config, channelViewModel) {

        //Attribute report. Write to file.
        let attributeTotals = await this.itemWebService.buildAttributeTotals(channelViewModel.channel)
        await fs.promises.writeFile(`${config.publicPath}/attributeTotals.json`, JSON.stringify(attributeTotals))

        return attributeTotals
    }

    async defineEtaTemplates(config) {

        //Load init eta template
        Eta.templates.define("_init", Eta.compile(_initEjs))
        Eta.templates.define("_meta_tags", Eta.compile(_metaTagsEjs))
        Eta.templates.define("_meta_tags_js", Eta.compile(_metaTagsJsEjs))


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
    }
    

}


interface GenerateViewModel {
    itemViewModels:ItemViewModel[],
    firstPageExploreItems: RowItemViewModel[],
    routablePages: StaticPage[],
    base64Version: string,
    headContents: string,
    bodyContents: string
}



export {
    GenerateService, GenerateViewModel
}