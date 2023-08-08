import { Author } from "../../dto/author.js"
import { Channel } from "../../dto/channel.js"
import { ExportBundle, BackupBundle } from "../../dto/export-bundle.js"
import { Item } from "../../dto/item.js"
import { StaticPage } from "../../dto/static-page.js"
import { Theme } from "../../dto/theme.js"
import { Image } from "../../dto/image.js"
import { Animation } from "../../dto/animation.js"


import { injectable } from "inversify"
import { ItemService } from "../../service/item-service.js"
import { AuthorService } from "../../service/author-service.js"
import { ThemeService } from "../../service/theme-service.js"
import { StaticPageService } from "../../service/static-page-service.js"
import { ImageService } from "../../service/image-service.js"
import { AnimationService } from "../../service/animation-service.js"

@injectable()
class ExportService {

    constructor(
        private itemService:ItemService,
        private authorService:AuthorService,
        private themeService:ThemeService,
        private imageService:ImageService,
        private animationService:AnimationService,
        private staticPageService:StaticPageService
    ) {}
    
    async prepareExport(originalChannel: Channel, ownerAddress:string) : Promise<ExportBundle> {
        
        //Clone
        let channel = await this.getExportChannel(originalChannel)
        
        //Get author
        let author = await this.getExportAuthor(originalChannel.authorId)

        let itemIds = await this.itemService.getIds()

        //Assign  
        let imageCids:string[] = []
        let animationCids:string[] = []
        
        //Add cover image
        if (channel.coverImageId?.length > 0) {
            imageCids.push(channel.coverImageId)
        }

        //Add banner image
        if (channel.coverBannerId?.length > 0) {
            imageCids.push(channel.coverBannerId)
        }

        //Add author image
        if (author?.coverPhotoId?.length > 0) {
            imageCids.push(author.coverPhotoId)
        }

        //Gather NFT data
        for (let itemId of itemIds) {

            let item = await this.itemService.get(itemId)

            //Build animation URL if we have content
            if (item.animationId && !item.coverImageAsAnimation) {
                animationCids.push(item.animationId)
            }

            imageCids.push(...this.getImageCidsByItem(item))

        }

        //Look up all the images
        imageCids = [...new Set(imageCids)] //deduplicate
        animationCids = [...new Set(animationCids)] //deduplicate

        return {

            animationCids: animationCids,
            imageCids: imageCids,

            channel: channel,
            author: author,

            itemIds: itemIds,
            themeIds: await this.themeService.getIds(),
            staticPageIds: await this.staticPageService.getIds(),

            ownerAddress: ownerAddress
        }

    }

    async createBackup(exportBundle: ExportBundle) : Promise<BackupBundle> {

        let author: Author = exportBundle.author

        let channel: Channel = this.getBackupChannel(exportBundle.channel, exportBundle.itemIds.length)

        let authors = []

        if (author) {
            authors.push(author)
        }

        let items = await this.getBackupItems(exportBundle.itemIds)
        let themes = await this.getBackupThemes(exportBundle.themeIds)
        let staticPages = await this.getBackupStaticPages(exportBundle.staticPageIds)
        let images = await this.getBackupImages(exportBundle.imageCids)
        let animations = await this.getBackupAnimations(exportBundle.animationCids)



        //Save pouch dbs
        return {
            channels: [channel],
            authors: authors,

            items: items,
            themes: themes,
            staticPages: staticPages,
            images: images,
            animations: animations,

            itemCount: exportBundle.itemIds.length,
            themeCount: exportBundle.themeIds.length,
            staticPageCount: exportBundle.staticPageIds.length,
            imageCount: exportBundle.imageCids.length,
            animationCount: exportBundle.animationCids.length
            
        }

    }

    getImageCidsByItem(item:Item) {

        let imageCids:string[] = []

        //Add cover image
        if (item.coverImageId?.length > 0) {
            imageCids.push(item.coverImageId)
        } 

        //Get images in post content
        if (item.content?.ops) {
            for (let op of item.content.ops) {
                if (op.insert && op.insert.ipfsimage && op.insert.ipfsimage?.cid?.length > 0) {
                    imageCids.push(op.insert.ipfsimage.cid)
                }
            }
        }

        return imageCids
    }

    getImageCidsByStaticPage(staticPage:StaticPage) {

        let imageCids:string[] = []

        //Get images in post content
        if (staticPage.content?.ops) {
            for (let op of staticPage.content.ops) {
                if (op.insert && op.insert.ipfsimage && op.insert.ipfsimage?.cid?.length > 0) {
                    imageCids.push(op.insert.ipfsimage.cid)
                }
            }
        }

        return imageCids
    }

    private async getExportChannel(originalChannel: Channel) : Promise<Channel> {

        let channel = JSON.parse(JSON.stringify(originalChannel))

        //Remove publishing related field from channel
        delete channel.contractAddress
        delete channel.pinJobId
        delete channel.pinJobStatus
        delete channel.pubDate
        delete channel.publishReaderRepoId
        delete channel.publishReaderRepoPath
        delete channel.publishReaderRepoBranch
        delete channel.publishReaderRepoStatus
        delete channel.publishReaderIPFSStatus

        delete channel.productionHostname
        delete channel.productionBaseLibraryURI
        delete channel.productionBaseURI
        delete channel.showMintPage
        delete channel.showActivityPage
        delete channel.marketplaces
        delete channel.externalLinks

        delete channel.importSuccess
        delete channel.lastUpdated
        delete channel._rev
        delete channel["_rev_tree"]

        return channel

    }

    private async getExportAuthor(authorId:string) : Promise<Author> {

        let author:Author

        try {
            author = await this.authorService.get(authorId)
        } catch(ex) {}


        if (author) {
            author = JSON.parse(JSON.stringify(author))

            delete author._rev
            delete author.lastUpdated
            delete author["_rev_tree"]

        }

        return author
    }

    private prepareTheme(theme:Theme) : Theme {

        delete theme._rev
        delete theme["_rev_tree"]

        return JSON.parse(JSON.stringify(theme))

    }

    private prepareStaticPage(staticPage:StaticPage) : StaticPage {

        delete staticPage._rev
        delete staticPage["_rev_tree"]

        return JSON.parse(JSON.stringify(staticPage))

    }

    public prepareItem(item:Item) : Item {

        //Delete publishing related fields
        delete item._rev
        delete item.lastUpdated
        delete item["_rev_tree"]

        return JSON.parse(JSON.stringify(item))

    }

    private getBackupChannel(exportChannel:Channel, itemCount:number) : Channel {

        let channel: Channel = JSON.parse( JSON.stringify(exportChannel) )

        //If we're exporting an existing collection delete the "forkedBy" fields
        if (channel.forkType == "existing") {
            delete channel.forkType
            delete channel.forkedFromCid
            delete channel.forkedFromFeeRecipient
            delete channel.forkedFromId
        }

        //Add itemCount to channel
        channel['itemCount'] = itemCount

        return channel

    }

    private async getBackupThemes(themeIds:string[]) {
        
        let themes = []

        for (let themeId of themeIds) {
            themes.push(this.prepareTheme(await this.themeService.get(themeId)))
        }

        return themes

    }

    private async getBackupStaticPages(staticPageIds:string[]) {
        
        let staticPages = []

        for (let staticPageId of staticPageIds) {
            staticPages.push(this.prepareStaticPage(await this.staticPageService.get(staticPageId)))
        }

        return staticPages

    }

    private async getBackupItems(itemIds:string[]) {
        
        let items = []

        let counter = 0

        itemIds = itemIds.sort()

        for (let itemId of itemIds) {

            let item = this.prepareItem(await this.itemService.get(itemId))

            //Remove the image src data from the content. Will restore from local copy when importing.
            //Reduce backup filesize
            if (item.content?.ops?.length > 0) {

                let ops = []

                for (let op of item.content.ops) {

                    if (op.insert && op.insert.ipfsimage) {
                        delete op.insert.ipfsimage.src
                    }

                    ops.push(op)
                }

                item.content.ops = ops

            }
            
            items.push(item)

            counter++

            console.log(`Processing token #${item.tokenId} ${counter}/${itemIds.length}`)



        }

        console.log(`Tokens processed`)


        return items

    }

    private async getBackupImages(imageIds:string[]) {
        
        let images = []

        let counter = 0

        for (let imageId of imageIds) {

            let image = await this.imageService.get(imageId)

            let clonedImage = JSON.parse( JSON.stringify(image) )

            //Remove publishing related field from image
            delete clonedImage._rev
            delete clonedImage["_rev_tree"]
            delete clonedImage.buffer
            delete clonedImage.svg

            images.push(clonedImage)

            counter++

            console.log(`Processing image #${clonedImage._id} ${counter}/${imageIds.length}`)


        }

        console.log(`Images processed`)


        return images

    }

    private async getBackupAnimations(animationIds:string[]) {
        
        let animations=[]

        let counter = 0
        
        for (let animationId of animationIds) {

            let animation = await this.animationService.get(animationId)

            let clonedAnimation = JSON.parse( JSON.stringify(animation) )

            //Remove publishing related field from image
            delete clonedAnimation._rev
            delete clonedAnimation["_rev_tree"]
            delete clonedAnimation.content

            animations.push(clonedAnimation)

            counter++

            console.log(`Processing image #${clonedAnimation._id} ${counter}/${animationIds.length}`)

        }

        console.log(`Animations processed`)


        return animations

    }


}

export {
    ExportService
}