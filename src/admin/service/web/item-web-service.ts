import { injectable } from "inversify";
import moment from "moment";
import he from 'he'

import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Image } from "../../dto/image.js";
import { Item } from "../../dto/item.js";
import { AttributeSelectionViewModel } from "../../dto/viewmodel/attribute-selection-view-model.js";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model.js";

import { ItemViewModel } from "../../dto/viewmodel/item-view-model.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { ImageService } from "../image-service.js";
import { ItemService } from "../item-service.js";
import { AnimationService } from "../animation-service.js";
import { Animation } from "../../dto/animation.js";
import { AnimationViewModel } from "../../dto/viewmodel/animation-view-model.js";
import { QuillService } from "../quill-service.js";
import { ThemeService } from "../theme-service.js";
import { Theme } from "../../dto/theme.js";
import { ItemListViewModel } from "../../dto/viewmodel/item-list-view-model.js";
import { AggregateStats } from "../../dto/aggregate-stats.js";
import { QueryCacheService } from "../../service/core/query-cache-service.js";
import { QueryCache } from "../../dto/query-cache.js";
import { AttributeCountService } from "../../service/attribute-count-service.js";
import { AttributeCount } from "../../dto/attribute.js";
import { ExportService } from "../core/export-service.js";
import { GitService } from "../core/git-service.js";
import { IpfsService } from "../core/ipfs-service.js";


const { DOMParser, XMLSerializer } = require('@xmldom/xmldom')
const parser = new DOMParser()

@injectable()
class ItemWebService {

    constructor(
        private itemService: ItemService,
        private channelService: ChannelService,
        private imageService: ImageService,
        private authorService: AuthorService,
        private animationService:AnimationService,
        private quillService:QuillService,
        private themeService:ThemeService,
        private queryCacheService:QueryCacheService,
        private exportService:ExportService,
        private gitService:GitService,
        private ipfsService:IpfsService,
        private attributeCountService:AttributeCountService
    ) { }

    async get(_id: string): Promise<ItemViewModel> {

        let item:Item = await this.itemService.get(_id)

        //Get channel
        const channel:Channel = await this.channelService.get(item.channelId)

        let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${item.channelId}`)
        
        let tokenIdStats = queryCache.result

        return this.getViewModel(item, channel, tokenIdStats)
    }

    async getNavigation(channelId:string, tokenId: number): Promise<ItemViewModel> {

        let item:Item = await this.itemService.getByTokenId(channelId, tokenId)

        //Get channel
        const channel:Channel = await this.channelService.get(item.channelId)

        return this.getNavigationViewModel(item, channel)
    }

    async getViewModel(item: Item, channel:Channel, tokenIdStats:AggregateStats): Promise<ItemViewModel> {

        // console.time('Get viewmodel')

        let animation:AnimationViewModel
        let coverImage: ImageViewModel
        let authorPhoto:ImageViewModel

        let animationContentHTML


        let attributeSelections:AttributeSelectionViewModel[] = []

        let author: Author

        let editable = !channel.contractAddress


        // console.time('Get image')

        if (item.coverImageId) {

            try {
                let image:Image = await this.imageService.get(item.coverImageId)

                coverImage = {
                    cid: image.cid,
                    url: await this.imageService.getUrl(image)
                }
            } catch(ex) {}

        }

        if (item.animationId) {

            try {

                let a:Animation = await this.animationService.get(item.animationId)
            
                animation = {
                    cid: a.cid,
                    content: he.unescape(a.content)
                }
    
                let page = parser.parseFromString(a.content, 'text/html')
    
                let body = page.getElementsByTagName('body')[0]
                
                animationContentHTML = he.unescape(new XMLSerializer().serializeToString(body))
    
                //Swap body tag to a div
                animationContentHTML = "<div" + animationContentHTML.slice(5)
                animationContentHTML = animationContentHTML.substring(0, animationContentHTML.length - 7) + "</div>"

            } catch(ex) { }

        }

        //Get author
        if (channel.authorId) {
            
            author = await this.authorService.get(channel.authorId)

            //Load cover photo if there is one.
            if (author.coverPhotoId) {
                let aImage = await this.imageService.get(author.coverPhotoId)

                authorPhoto = {
                    cid: aImage.cid,
                    url: await this.imageService.getUrl(aImage)
                }
            }

        }

        // console.time('Get attributes')

        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {

            for (let ao of channel.attributeOptions) {

                //find the one selected by this item
                let selections = item?.attributeSelections?.filter( as => ao?.traitType == as?.traitType)

                attributeSelections.push({
                    id: ao.id,
                    traitType: ao.traitType,
                    values: ao.values,
                    value: selections?.length > 0 ? selections[0].value : '',
                })

            }


            for (let attributeSelection of attributeSelections) {

                try {

                    let attributeCount:AttributeCount = await this.attributeCountService.get(`${channel._id}-${attributeSelection.traitType}-${attributeSelection.value}`)

                    attributeSelection.categoryPercent = attributeCount ? new Intl.NumberFormat('default', {
                        style: 'percent',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    }).format((attributeCount.count / tokenIdStats.count)) : ''

                } catch(ex) {}

            }


        }


        // console.timeEnd('Get attributes')

        // console.time('Get last')

        let canDelete = (tokenIdStats.max == item.tokenId)
        
        let themes:Theme[] = []

        if (item.themes?.length > 0) {

            try {
            
                for (let theme of item.themes) {
                    themes.push(await this.themeService.get(theme))
                }

            } catch(ex) {}
        }



        // console.timeEnd('Get viewmodel')

        let images:ImageViewModel[] = await this.getImagesFromContent(item)

        //If cover image not part of image list add it.
        if (images.filter(i => i.cid == coverImage?.cid).length == 0) {
            images.push(coverImage)
        }


        // console.log(item)

        return {
            item: item,
            themes: themes,
            contentHTML: await this.quillService.translateContent(item.content),
            animationContentHTML: animationContentHTML,
            dateDisplay: moment(item.dateCreated).format("MMM Do YYYY"),
            channel: channel,
            coverImage: coverImage,
            animation: animation,
            author: author,
            authorPhoto: authorPhoto,
            authorDisplayName: this.authorService.getDisplayName(author),
            images: images,
            attributeSelections: attributeSelections,
            editable: editable,
            canDelete: canDelete
        }

    }

    async getNavigationViewModel(item:Item, channel:Channel) : Promise<ItemViewModel> {

        let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channel._id}`)
        let tokenIdStats = queryCache.result

        let itemViewModel:ItemViewModel = await this.getViewModel(item, channel, tokenIdStats)

        if (itemViewModel.item.tokenId < tokenIdStats.max) {
            itemViewModel.next = itemViewModel.item.tokenId + 1
        }

        if (itemViewModel.item.tokenId > tokenIdStats.min) {
            itemViewModel.previous =  itemViewModel.item.tokenId - 1
        }


        return itemViewModel
    }

    async getListViewModel(item:Item, channel:Channel) : Promise<ItemListViewModel> {
     
        let coverImage

        if (item.coverImageId) {

            try {
                let image:Image = await this.imageService.get(item.coverImageId)
                coverImage = {
                    cid: image.cid,
                    url: await this.imageService.getUrl(image)
                }
            } catch(ex) {}

        }

        return {
            item: item,
            channel:channel,
            coverImage: coverImage
        }


    }

    async listByChannel(channelId: string, limit: number, skip: number): Promise<ItemListViewModel[]> {

        let result: ItemListViewModel[] = []

        let items: Item[] = await this.itemService.listByChannel(channelId, limit, skip)

        //Get channel
        const channel:Channel = await this.channelService.get(channelId)

        for (let item of items) {
            result.push(await this.getListViewModel(item, channel))
        }

        return result

    }

    async getImagesFromContent(item:Item) : Promise<ImageViewModel[]> {

        if (!item.content) return []

        let ops = item.content.ops

        const images = []

        if (ops?.length > 0) {

            for (let op of ops) {
                if (op.insert && op.insert.ipfsimage) {
                    images.push({
                        cid: op.insert.ipfsimage.cid,
                        url: op.insert.ipfsimage.src
                    })
                }
            }

            //Now generate the text preview
            try {
                
                let image:Image = await this.imageService.newFromItem(item)

                images.push({
                    cid: image.cid,
                    url: await this.imageService.getSVGURL(image),
                    svg: image.svg,
                    generated: true
                })

            } catch(ex) {}

        }
        


        return images
    }

    async getNewViewModel(channelId:string) : Promise<ItemViewModel> {
        
        let channel = await this.channelService.get(channelId)


        //Get default attribute options
        let attributeSelections:AttributeSelectionViewModel[] = []

        for (let ao of channel.attributeOptions) {

            attributeSelections.push({
                id: ao.id,
                traitType: ao.traitType,
                values: ao.values,
                value: '',
                categoryPercent: ''
            })
        }



        let itemViewModel:ItemViewModel = {
            item: {
                attributeSelections: []
            },
            channel: channel,
            attributeSelections: attributeSelections,
            editable: true,
            canDelete: true
        }

        return itemViewModel

    }

    async saveGeneratedCoverImage(item:Item) : Promise<Image> {

        let images = await this.getImagesFromContent(item)

        let matches = images?.filter(image => {
  
          if (item.coverImageId) {
            //If there's a cover then only return true if this is it.
            return image.cid == item.coverImageId
          } else {
            //If it's not set then we want to filter to the generated one.
            return image.generated == true
          }
  
        })
  
        let image = Object.assign(new Image(), matches[0]) 

        if (image.generated == true) {
                        
            //Remove URL before saving
            delete image['url']
        
            try {
                await this.imageService.put(image)
            } catch(ex) { 
                // console.log(ex)
            } //Might already exist. That's fine.  

            item.coverImageId = image._id

        }

        return image

    }

    async saveAnimation(item:Item) : Promise<Animation> {

        let content = await this.animationService.buildAnimationPage(item)

        let animation:Animation = await this.animationService.newFromText(content)

        try {
            await this.animationService.put(animation)
        } catch(ex) { 
            // console.log(ex)
        } //Might already exist. That's fine.  

        item.animationId = animation._id

        return animation
    }

    async updateGeneratedCoverImage(item:Item) {

        //Check if the current cover image is generated.
        let coverImage = await this.imageService.get(item.coverImageId)

        //If it's not generated then leave.
        if (!coverImage.generated) return 

        //If it is then generate a new one.
        let newCoverImage:Image = await this.imageService.newFromItem(item)


        //Save it
        try {
            await this.imageService.put(newCoverImage)
        } catch(ex) {}


        item.coverImageId = newCoverImage._id


    }

    async put(command:PutItemCommand) : Promise<void> {


        //Get the image cids that we'll be left with.
        command.item.imageIds = this.exportService.getImageCidsByItem(command.item)

        //If the item exists we need to do some cleanup before saving.
        //Find any images and animations that are being removed and remove them.
        if (command.item._rev) {

            let existing = await this.itemService.get(command.item._id)
            
            //Loop through the existing images and find the ones we're removing.
            let removedImageCids = this.exportService.getImageCidsByItem(existing).filter( cid => !command.item.imageIds?.includes(cid))

            //Remove
            for (let removedCid of removedImageCids) {
                // console.log(`Removing ${removedCid} from images.`)
                await this.deletePublishedImageByChannel(command.channel, command.item, removedCid)
            }

            //Remove animation if changed
            if (command.item.animationId != existing.animationId) {
                console.log(`Removing ${existing.animationId} from animations.`)
                await this.deletePublishedAnimationByChannel(command.channel, command.item, existing.animationId)
            }

        }

        //Put item  
        await this.itemService.put(command.item)


        //Put images in IPFS and git
        for (let imageCid of command.item.imageIds) {
            try {
                await this.publishImage(command.channel, await this.imageService.get(imageCid), false )
            } catch(ex) {}
        }

        //Put animation
        try {
            await this.publishAnimation(command.channel, await this.animationService.get(command.item.animationId), false)
        } catch(ex) {}


        if (command.updateQueryCache) {

            let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${command.item.channelId}`)

            let tokenIdStats = queryCache.result
    
            if (command.item.tokenId < tokenIdStats.min) {
                tokenIdStats.min = command.item.tokenId
            }
    
            if (command.item.tokenId > tokenIdStats.max) {
                tokenIdStats.max = command.item.tokenId
                tokenIdStats.count++
            }
    
            queryCache.result = tokenIdStats
            
    
            //Update cache
            await this.queryCacheService.put(queryCache)
    
    
            //Update attribute counts
            let attributeCounts:AttributeCount[] = await this.itemService.getAttributeInfoBySelections(command.item.channelId, command.item.attributeSelections)
    
    
            for (let attributeCount of attributeCounts) {
    
                let ac:AttributeCount
    
                let attributeCountId = `${command.item.channelId}-${attributeCount.traitType}-${attributeCount.value}`

                try {
                    ac = await this.attributeCountService.get(attributeCountId)
                } catch(ex) {}
    
                if (!ac) {
                    ac = new AttributeCount()
                    ac.channelId = command.item.channelId
                    ac.traitType = attributeCount.traitType
                    ac.value = attributeCount.value
                }
                
                ac.count = attributeCount.count
    
                await this.attributeCountService.put(ac)
            }
        }



    }

    async delete(item:Item) : Promise<void> {

        let channel = await this.channelService.get(item.channelId)

        //Delete item
        await this.itemService.delete(item)

        //Delete images
        let imageCids = this.exportService.getImageCidsByItem(item)
        for (let imageCid of imageCids) {
            await this.deletePublishedImageByChannel(channel, item, imageCid)
        }

        //Delete animation
        await this.deletePublishedAnimationByChannel(channel, item, item.animationId)

        //Delete JSON metadata
        await this.deleteJSONForItem(channel, item)



        let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${item.channelId}`)

        let tokenIdStats = queryCache.result

        //If deleting the lowest token ID then reset. Only works because we can only delete the final item. Change this if that changes.
        if (item.tokenId == tokenIdStats.min) {
            //Reset
            tokenIdStats.min = 0
            tokenIdStats.max = 0 
            tokenIdStats.count = 0
        } else {
            tokenIdStats.max = item.tokenId - 1
            tokenIdStats.count--
        }

        queryCache.result = tokenIdStats

        //Update cache
        await this.queryCacheService.put(queryCache)

    }

    async clone(item:Item) : Promise<Item> {

        let itemCopy = JSON.parse(JSON.stringify(item))

        delete itemCopy._id
        delete itemCopy._rev
        delete itemCopy['_rev_tree']
        delete itemCopy.tokenId

        itemCopy = Object.assign(new Item(), itemCopy)

        //Save to get an ID, etc
        let channel = await this.channelService.get(item.channelId)
        await this.put({
            channel: channel,
            item: itemCopy
        })


        //Build contentHTML for searching
        itemCopy.contentHTML = await this.quillService.translateContent(itemCopy.content, true)

        //Save the cover image if necessary
        let coverImage = await this.saveGeneratedCoverImage(itemCopy)
        item.coverImageGenerated = coverImage.generated
        
        //And the animation
        await this.saveAnimation(itemCopy)

        //Save the result
        await this.put({
            channel: channel,
            item: itemCopy
        })


        return itemCopy

    }

    async publishImage(channel:Channel, image:Image, flush:boolean=true) : Promise<void> {

        if (!image) return

        let ipfsDirectory = `/export/${channel._id}`
        let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

        //Check if it's already in IPFS
        let stat

        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
        } catch(ex) {}

        if (!stat?.cid?.toString()) {

            let content = await this.imageService.getImageContent(image)

            //Add to IPFS
            const result = await this.ipfsService.ipfs.add({
                content: content
            })

            //Move to MFS directory in IPFS
            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush:flush })

            //Add to git
            let gitDirectory = this.gitService.getBaseDir(channel)
            await this.gitService.writeFile(`${gitDirectory}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`, content)
        }



    }

    async deletePublishedImageByChannel(channel:Channel, item:Item, removedCid:string): Promise<void> {

        try {

            let image = await this.imageService.get(removedCid)

            //TODO: Make sure the image isn't still in use by another
            let existing = (await this.itemService.getByImageId(removedCid)).filter(i => i._id != item._id)

            if (existing?.length > 0) return

            await this.imageService.delete(image)

            //Remove from IPFS
            let ipfsDirectory = `/export/${channel._id}`
            let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`

            await this._safeDelete(ipfsFilename)





            //Remove from git
            let gitDirectory = this.gitService.getBaseDir(channel)
            await this.gitService.removeFile(`${gitDirectory}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`)

        } catch(ex) {}



    }

    async publishAnimation(channel:Channel, animation:Animation, flush:boolean=true) : Promise<void> {

        if (!animation) return

        let ipfsDirectory = `/export/${channel._id}`
        let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`


        //Check if it's already in IPFS
        let stat

        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
        } catch(ex) { }


        if (!stat?.cid?.toString()) {
            
            // console.log(`Publishing animation ${animation._id}`)

            const result = await this.ipfsService.ipfs.add({
                content: animation.content
            })

            //Move to MFS directory in IPFS
            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush:flush })
    
            //Add to git
            let gitDirectory = this.gitService.getBaseDir(channel)
            await this.gitService.writeFile(`${gitDirectory}/backup/export/animations/${animation.cid}.html`, animation.content)

        }


        // console.log(`Saved animation ${animationCid}`)


    }

    async deletePublishedAnimationByChannel(channel:Channel, item:Item, animationId:string): Promise<void> {

        try {

            let animation = await this.animationService.get(animationId)

            //TODO: Make sure the animation isn't still in use by another
            let existing = (await this.itemService.getByAnimationId(animation._id)).filter(i => i._id != item._id)
            if (existing?.length > 0) return

            await this.animationService.delete(animation)

            //Remove from IPFS
            let ipfsDirectory = `/export/${channel._id}`
            let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`

            await this._safeDelete(ipfsFilename)



            //Remove from git
            let gitDirectory = this.gitService.getBaseDir(channel)
            await this.gitService.removeFile(`${gitDirectory}/backup/export/animations/${animation.cid}.html`)

        } catch(ex) {}


    }

    async deleteJSONForItem(channel:Channel, item:Item): Promise<void> {

        //Remove from IPFS
        let ipfsDirectory = `/export/${channel._id}`
        let ipfsFilename = `${ipfsDirectory}/metadata/${item.tokenId}.json`


        //Check if it's already in IPFS
        await this._safeDelete(ipfsFilename)


        //Remove from git
        let gitDirectory = this.gitService.getBaseDir(channel)
        await this.gitService.removeFile(`${gitDirectory}/backup/export/metadata/${item.tokenId}.json`)
    }


    private async _safeDelete(ipfsFilename:string) {

        //Check if it's already in IPFS
        let stat

        try {
            stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
        } catch(ex) { }

        if (stat?.cid?.toString()) {
            await this.ipfsService.ipfs.files.rm(ipfsFilename,  { recursive: true, flush: true})
        }

    }


}


interface PutItemCommand {
    channel:Channel
    item:Item
    updateQueryCache?:boolean
    publish?:boolean
}




export {
    ItemWebService
}