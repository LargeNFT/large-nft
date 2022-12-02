import { injectable } from "inversify";
import moment from "moment";
import he from 'he'

import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Image } from "../../dto/image";
import { Item } from "../../dto/item";
import { AttributeSelectionViewModel } from "../../dto/viewmodel/attribute-selection-view-model";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model";

import { ItemViewModel } from "../../dto/viewmodel/item-view-model";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";
import { AnimationService } from "../animation-service";
import { Animation } from "../../dto/animation";
import { AnimationViewModel } from "../../dto/viewmodel/animation-view-model";
import { QuillService } from "../quill-service";
import { ThemeService } from "../theme-service";
import { Theme } from "../../dto/theme";
import { ItemListViewModel } from "../../dto/viewmodel/item-list-view-model";
import { AggregateStats } from "../../dto/aggregate-stats";
import { QueryCacheService } from "../../service/core/query-cache-service";
import { ItemRepository } from "../../repository/item-repository";
import { QueryCache } from "../../dto/query-cache";
import { AttributeCountService } from "../../service/attribute-count-service";
import { AttributeCount } from "../../dto/attribute";

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
        private itemRepository:ItemRepository,
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
        if (images.filter(i => i.cid == coverImage.cid).length == 0) {
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



    async put(item:Item) : Promise<void> {

        await this.itemService.put(item)

        let queryCache:QueryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${item.channelId}`)

        let tokenIdStats = queryCache.result

        if (item.tokenId < tokenIdStats.min) {
            tokenIdStats.min = item.tokenId
        }

        if (item.tokenId > tokenIdStats.max) {
            tokenIdStats.max = item.tokenId
            tokenIdStats.count++
        }

        queryCache.result = tokenIdStats
        

        //Update cache
        await this.queryCacheService.put(queryCache)


        //Update attribute counts
        let attributeCounts:AttributeCount[] = await this.itemService.getAttributeInfoBySelections(item.channelId, item.attributeSelections)


        for (let attributeCount of attributeCounts) {

            let existing:AttributeCount

            try {
                existing = await this.attributeCountService.get(`${item.channelId}-${attributeCount.traitType}-${attributeCount.value}`)
            } catch(ex) {}

            if (!existing) {
                existing = new AttributeCount()
                existing.channelId = item.channelId
                existing.traitType = attributeCount.traitType
                existing.value = attributeCount.value
            }
            
            existing.count = attributeCount.count

            await this.attributeCountService.put(existing)
        }


    }


    async delete(item:Item) : Promise<void> {

        await this.itemService.delete(item)

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



}

export {
    ItemWebService
}