import { inject, injectable } from "inversify";
import { ItemPage, ItemResults, RowItemViewModel } from "../../dto/item-page.js";
import { StaticPage } from "../../dto/static-page.js";
import { ItemViewModel } from "../../dto/viewmodel/item-view-model.js";
import { StaticPageService } from "../static-page-service.js";
import { ChannelWebService } from "../web/channel-web-service.js";
import { ItemWebService } from "../web/item-web-service.js";
import fs from "fs"



const PER_PAGE = 40

@injectable()
class GenerateService {

    constructor(
        @inject("ChannelWebService") private channelWebService: ChannelWebService,
        @inject("ItemWebService") private itemWebService: ItemWebService,
        @inject("StaticPageService") private staticPageService: StaticPageService,
        @inject("convert-svg-to-png") private convert,
        // @inject("sharp") private sharp

    ) { }


    async getGenerateViewModel(config): Promise<GenerateViewModel> {

        //Get first page of items for explore page
        let itemResults: ItemResults = await this.itemWebService.exploreList({}, 0, PER_PAGE)


        let generateViewModel: GenerateViewModel = {
            firstPageExploreItems: itemResults.items,
            routablePages: await this.staticPageService.listRoutablePages(),
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

        let imagePath 

        //For now just the one
        if (item.coverImage.generated) {
            //Create PNG from SVG
            imagePath = await this.generatePNGFromSVG(config, item)
        } else {
            imagePath = `${config.baseDir}/backup/export/images/${item.coverImage._id}.jpg` 
        }

        // //Generate a small thumbnail
        // await this.sharp(imagePath)
        //     .resize(50)
        //     .toFile(`${config.publicPath}/backup/generated/images/50x50/${item.coverImage._id}.jpg`)

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


}


interface GenerateViewModel {
    firstPageExploreItems: RowItemViewModel[],
    routablePages: StaticPage[],
    base64Version: string,
    headContents: string,
    bodyContents: string
}

export {
    GenerateService, GenerateViewModel
}