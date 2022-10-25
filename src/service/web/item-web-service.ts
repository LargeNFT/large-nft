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
import { ItemListViewModel } from "dto/viewmodel/item-list-view-model";
import { AttributeInfo } from "repository/item-repository";

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
        private themeService:ThemeService
    ) { }

    async get(_id: string): Promise<ItemViewModel> {

        let item:Item = await this.itemService.get(_id)

        //Get channel
        const channel:Channel = await this.channelService.get(item.channelId)

        let totalItemCount = await this.channelService.countItemsByChannel(channel._id)

        return this.getViewModel(item, channel, totalItemCount)
    }

    async getNavigation(_id: string): Promise<ItemViewModel> {

        let item:Item = await this.itemService.get(_id)

        //Get channel
        const channel:Channel = await this.channelService.get(item.channelId)

        return this.getNavigationViewModel(item, channel)
    }

    async getViewModel(item: Item, channel:Channel, totalItemCount:number): Promise<ItemViewModel> {

        console.time('Get viewmodel')

        let animation:AnimationViewModel
        let coverImage: ImageViewModel
        let authorPhoto:ImageViewModel

        let animationContentHTML


        let attributeSelections:AttributeSelectionViewModel[] = []

        let author: Author

        let editable = !channel.contractAddress


        console.time('Get image')

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

        console.time('Get attributes')

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

            //Look up scarcity of attributes
            let results = await this.itemService.getAttributeInfo(channel._id, attributeSelections.map(as => {
                return {
                    traitType: as.traitType,
                    value: as.value
                }
            }))

            for (let attributeSelection of attributeSelections) {
                let matches = results.filter(ai => ai.traitType == attributeSelection.traitType && ai.value == attributeSelection.value)
                attributeSelection.categoryPercent = matches?.length > 0 ? new Intl.NumberFormat('default', {
                    style: 'percent',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format((matches[0].count / totalItemCount)) : ''
            }

        }


        console.timeEnd('Get attributes')

        console.time('Get last')

        //Is this the last one? 
        let maxToken = await this.itemService.getMaxTokenId(channel._id)
        console.timeEnd('Get last')

        let canDelete = (maxToken == item.tokenId)
        
        let themes:Theme[] = []

        if (item.themes?.length > 0) {

            try {
            
                for (let theme of item.themes) {
                    themes.push(await this.themeService.get(theme))
                }

            } catch(ex) {}
        }



        console.timeEnd('Get viewmodel')

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

        let totalItemCount = await this.channelService.countItemsByChannel(channel._id)

        let itemViewModel:ItemViewModel = await this.getViewModel(item, channel, totalItemCount)

        itemViewModel.previous = await this.itemService.getPrevious(item)
        itemViewModel.next = await this.itemService.getNext(item)

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


}

export {
    ItemWebService
}