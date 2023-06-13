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
        let channel = JSON.parse(JSON.stringify(originalChannel))
        
        let items: Item[] = JSON.parse(JSON.stringify(
            await this.itemService.listByChannel(originalChannel._id, 100000, 0)
        ))

        //Get author
        let author
        
        try {
            author = await this.authorService.get(originalChannel.authorId)
        } catch(ex) {}


        if (author) {
            author = JSON.parse(JSON.stringify(author))
        }



        //Get themes
        let themes = JSON.parse(JSON.stringify(
            await this.themeService.listByChannel(originalChannel._id, 1000, 0)
        ))

        //Get static pages
        let staticPages = JSON.parse(JSON.stringify(
            await this.staticPageService.listByChannel(originalChannel._id, 1000, 0)
        ))

        //Remove publishing related field from channel
        delete channel.contractAddress
        delete channel.pinJobId
        delete channel.pinJobStatus
        delete channel.publishedCid
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

        //Remove publishing related fields from author
        if (author) {
            delete author._rev
            delete author.lastUpdated
            delete author["_rev_tree"]
        }

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
        for (let item of items) {

            //Build animation URL if we have content
            if (item.animationId && !item.coverImageAsAnimation) {
                animationCids.push(item.animationId)
            }

            imageCids.push(...this.getImageCidsByItem(item))

            //Delete publishing related fields
            delete item._rev
            delete item.lastUpdated
            delete item["_rev_tree"]

        }

        //Look up all the images
        imageCids = [...new Set(imageCids)] //deduplicate
        animationCids = [...new Set(animationCids)] //deduplicate


        let images:Image[] = await this.imageService.getByIds(imageCids)
        let animations:Animation[] = await this.animationService.getByIds(animationCids)

        // console.log(images)
        // console.log(animations)

        //Clean up themes
        for (let theme of themes) {

            delete theme._rev
            delete theme["_rev_tree"]
        }

        //Clean up staticPages
        for (let staticPage of staticPages) {

            delete staticPage._rev
            delete staticPage["_rev_tree"]
        }


        return {

            animations: animations,
            images: images,

            channel: channel,
            items: items,
            author: author,
            themes: themes,
            staticPages: staticPages,

            ownerAddress: ownerAddress
        }

    }


    async createBackup(exportBundle: ExportBundle) : Promise<BackupBundle> {

        let channel: Channel = JSON.parse( JSON.stringify(exportBundle.channel) )
        let items: Item[] = exportBundle.items
        let author: Author = exportBundle.author
        let themes:Theme[] = exportBundle.themes
        let staticPages:StaticPage[] = exportBundle.staticPages

    
        //If we're exporting an existing collection delete the "forkedBy" fields
        if (channel.forkType == "existing") {
            delete channel.forkType
            delete channel.forkedFromCid
            delete channel.forkedFromFeeRecipient
            delete channel.forkedFromId
        }

        //Generate bundles with extra info for each item
        for (let item of items) {

            let previous = items.filter( i => i.tokenId == parseInt(item.tokenId.toString()) -1)
            let next = items.filter( i => i.tokenId == parseInt(item.tokenId.toString()) + 1)

            //Add the previous and next items so they can used in navigation
            item['previous'] = previous?.length > 0 ? { 
                _id: previous[0]._id,
                tokenId: previous[0].tokenId
            }  : undefined

            item['next'] = next?.length > 0 ? { 
                _id: next[0]._id,
                tokenId: next[0].tokenId
            } : undefined


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

        }


        let images:Image[] = []
        let animations:Animation[] = []

        for (let image of exportBundle.images) {

            let clonedImage = JSON.parse( JSON.stringify(image) )

            //Remove publishing related field from image
            delete clonedImage._rev
            delete clonedImage["_rev_tree"]
            delete clonedImage.buffer
            delete clonedImage.svg

            images.push( clonedImage )
        }


        for (let animation of exportBundle.animations) {

            let clonedAnimation = JSON.parse( JSON.stringify(animation) )

            //Remove publishing related fields
            delete clonedAnimation._rev
            delete clonedAnimation["_rev_tree"]
            delete clonedAnimation.content


            animations.push( clonedAnimation )


        }


        let authors = []

        if (author) {
            authors.push(author)
        }


        //Add itemCount to channel
        channel['itemCount'] = items?.length

        //Save pouch dbs
        return {
            channels: [channel],
            authors: authors,
            items: items,
            themes: themes,
            staticPages: staticPages,
            images: images,
            animations: animations      
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


}

export {
    ExportService
}