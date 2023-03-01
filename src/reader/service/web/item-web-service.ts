import { inject, injectable } from "inversify";
import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Image } from "../../dto/image.js";
import { Item } from "../../dto/item.js";
import { Animation } from "../../dto/animation.js";

import { AttributeSelectionViewModel } from "../../dto/viewmodel/attribute-selection-view-model.js";


import { ItemViewModel } from "../../dto/viewmodel/item-view-model.js";
import { AnimationService } from "../animation-service.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { QuillService } from "../core/quill-service.js";
import { SchemaService } from "../core/schema-service.js";
import { ImageService } from "../image-service.js";
import { ItemService } from "../item-service.js";

import he from "he"
import { ItemPage, ItemResults, RowItemViewModel } from "../../dto/item-page.js";
import { ItemPageService } from "../item-page-service.js";
import { AttributeTotal } from "../../dto/attribute-total.js";
import { AttributeTotalService } from "../attribute-total-service.js";
import { AttributeOptions, AttributeOptionsViewModel } from "../../dto/attribute.js";

import { DOMParser, XMLSerializer } from '@xmldom/xmldom'

const parser = new DOMParser()

@injectable()
class ItemWebService {

    @inject("ItemService")
    private itemService: ItemService

    @inject("ChannelService")
    private channelService: ChannelService

    @inject("AuthorService")
    private authorService: AuthorService

    @inject("ImageService")
    private imageService: ImageService

    @inject("SchemaService")
    private schemaService: SchemaService

    @inject("QuillService")
    private quillService: QuillService

    @inject("AnimationService")
    private animationService: AnimationService

    @inject("ItemPageService")
    private itemPageService: ItemPageService

    @inject("AttributeTotalService")
    private attributeTotalService: AttributeTotalService

    @inject("baseURI")
    private baseURI: string


    private allTokensCache:number[]

    constructor() {}

    async get(_id: string): Promise<ItemViewModel> {

        let item:Item = await this.itemService.get(_id)

        //Get channel
        const channel = await this.channelService.get()

        //Get attribute report
        const attributeReport:AttributeTotal[] = await this.attributeTotalService.list()

        return this.getViewModel(item, channel, attributeReport)
    }

    async getByTokenId(tokenId:number) : Promise<Item> {

        return this.itemService.getByTokenId(tokenId)

    }

    async getViewModel(item: Item, channel:Channel, attributeReport:AttributeTotal[]): Promise<ItemViewModel> {

        let attributeSelections:AttributeSelectionViewModel[] = []

        let author: Author
        let coverImage:Image
        let animation:Animation

        let animationContentHTML

        //Get author
        if (channel.authorId) {
            author = await this.authorService.get(channel.authorId)
        }

        //Only show attributes that are valid at the category level. 
        if (channel.attributeOptions.length > 0) {

            for (let ao of channel.attributeOptions) {

                //find the one selected by this item
                let selections = item?.attributeSelections?.filter( as => ao?.traitType == as?.traitType)

                let selection = selections?.length > 0 ? selections[0].value : undefined


                let attributeTotals:AttributeTotal[] = attributeReport.filter( at => at.traitType == ao.traitType)

                let matches = attributeTotals?.filter( at => at.value == selection)


                attributeSelections.push({
                    id: ao.id,
                    traitType: ao.traitType,
                    values: ao.values,
                    value: selection,
                    attributeTotal: matches?.length > 0 ? matches[0] : undefined
                })

            }

        }

        //Get image
        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId)
        }

        //Get animation if we are displaying it.
        if (item.animationId && !item.coverImageAsAnimation) {

            animation = await this.animationService.get(item.animationId)

            let page = parser.parseFromString(animation.content, 'text/html')

            let body = page.getElementsByTagName('body')[0]
            
            animationContentHTML = he.unescape(new XMLSerializer().serializeToString(body))

            //Swap body tag to a div
            animationContentHTML = "<div" + animationContentHTML.slice(5)
            animationContentHTML = animationContentHTML.substring(0, animationContentHTML.length - 7) + "</div>"

                
        }


        //Get image data and re-insert it into the content ops
        if (item.content?.ops?.length > 0) {

            let ops = []

            for (let op of item.content.ops) {

                if (op.insert && op.insert.ipfsimage) {

                    let image:Image = await this.imageService.get(op.insert.ipfsimage.cid)
            
                    op.insert.ipfsimage.src = await this.imageService.getUrl(image)

                    // console.log(op.src)
                }

                ops.push(op)
            }

            item.content.ops = ops

        }


        //Load previous and nex


        return {
            item: item,
            animation:animation,
            animationContentHTML: animationContentHTML,
            contentHTML: await this.quillService.translateContent(item.content),
            channel: channel,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            attributeSelections: attributeSelections,
            coverImage: coverImage
        }

    }

    async getMintViewModel(item: Item, channel:Channel): Promise<ItemViewModel> {

        let attributeSelections:AttributeSelectionViewModel[] = []

        let author: Author
        let coverImage:Image
        let animation:Animation

        //Get image
        if (item.coverImageId) {
            coverImage = await this.imageService.get(item.coverImageId)
        }

        return {
            item: item,
            animation:animation,
            channel: channel,
            author: author,
            attributeSelections: attributeSelections,
            coverImage: coverImage
        }

    }

    async getSearchViewModel(item: Item, channel:Channel): Promise<ItemViewModel> {

        let attributeSelections:AttributeSelectionViewModel[] = []

        let author: Author
        let coverImage:Image
        let animation:Animation

        //Get image
        // if (item.coverImageId) {
        //     coverImage = await this.imageService.get(item.coverImageId)
        // }

        return {
            item: item,
            animation:animation,
            channel: channel,
            author: author,
            attributeSelections: attributeSelections,
            // coverImage: coverImage
        }

    }

    async getExploreAttributeOptions(params:any) : Promise<AttributeOptionsViewModel[]> {

        await this.schemaService.load(["channels", "authors", "attribute-totals"])

        //Get channel
        const channel = await this.channelService.get()


        let attributeTotals:AttributeTotal[] = await this.attributeTotalService.list()


        //Get a list of the token IDs that we're already filtered to so we can adjust the counts.
        // let filteredIds = await this._paramsToFilteredIds(params, attributeTotals)

        let attributeOptions:AttributeOptions[] = channel.attributeOptions

        let results:AttributeOptionsViewModel[] = []

        for (let ao of attributeOptions) {

            let values = []

            for (let v of ao.values.sort()) {

                let clonedParams = JSON.parse(JSON.stringify(params))
                delete clonedParams[ao.traitType]

                //Unapply the selection for this filter so the counts are like this one isn't already applied. 
                let parentFilteredIds = await this._paramsToFilteredIds(clonedParams, attributeTotals)

                let at = attributeTotals.filter( at => at.traitType ==  ao.traitType && at.value == v)[0]

                if (at) {

                    values.push({
                        value: v,
                        count: at.tokenIds.filter(x => parentFilteredIds.includes(x)).length 
                    })

                } else {

                    console.log(`${ao.traitType} / ${v} totals not found.`)

                }


            }
            
            //Sort by count
            values.sort((a,b) => b.count - a.count)


            let aovm:AttributeOptionsViewModel = {
                id: ao.id,
                traitType: ao.traitType,
                values: values
            }

            results.push(aovm)

        }


        return results

    }

    async exploreList(params:any, skip: number, limit?:number): Promise<ItemResults> {

        await this.schemaService.load(["channels", "authors", "attribute-totals"])
        

        if (params && Object.keys(params)?.length > 0) {

            return this.exploreQuery(params, skip, limit)

        } else {

            //Figure out which page this is and return it.
            let pageNumber = skip / limit 

            let itemPage:ItemPage = await this.itemPageService.get(pageNumber)
            let channel:Channel = await this.channelService.get()


            return {
                items: itemPage.items,
                totalMatches: channel.itemCount,
                limit: limit,
                skip: skip
            }

        }
    }

    async exploreQuery(params:any,  skip: number, limit?:number): Promise<ItemResults> {

        await this.schemaService.load([ "channels", "authors", "attribute-totals"])
        
        let attributeTotals:AttributeTotal[] = await this.attributeTotalService.list()

        let filteredIds = await this._paramsToFilteredIds(params, attributeTotals)
        
        //Paging
        let totalMatches = filteredIds.length
        filteredIds = filteredIds.slice(skip, skip + limit)

        let viewModels:RowItemViewModel[] = await this.itemService.getRowItemViewModelsByTokenIds(filteredIds)

        return {
            items: viewModels,
            totalMatches: totalMatches,
            limit: limit,
            skip: skip
        }
    
    }

    async _paramsToFilteredIds(params, allAttributeTotals:AttributeTotal[]) : Promise<number[]> {

        let attributeTotalIds = []

        for (let key of Object.keys(params)) {
            attributeTotalIds.push(`${key}:::${params[key]}`)
        }

        let attributeTotals:AttributeTotal[] = allAttributeTotals?.filter( at => attributeTotalIds?.includes(at._id))  

        if (attributeTotals?.length > 0) {
            return attributeTotals.map( at => at.tokenIds).reduce((p,c) => p.filter(e => c.includes(e)))
        } else {

            //No filter selected so return every token ID
            if (!this.allTokensCache) {
                this.allTokensCache = Array.from(new Set(allAttributeTotals.map( at => at.tokenIds).flat()))
            }

            return this.allTokensCache

        }


    }


    async list(skip: number, limit?:number): Promise<ItemViewModel[]> {

        let result: ItemViewModel[] = []

        //Get channel
        const channel = await this.channelService.get()

        //Get attribute report
        const attributeReport:AttributeTotal[] = await this.itemService.buildAttributeTotals(channel)
        
        let items: Item[] = await this.itemService.list(skip, limit)

        for (let item of items) {
            result.push(await this.getViewModel(item, channel, attributeReport))
        }

        return result

    }

    async mintList(skip: number, limit?:number): Promise<ItemViewModel[]> {

        let result: ItemViewModel[] = []

        //Get channel
        const channel = await this.channelService.get()
        
        let items: Item[] = await this.itemService.list(skip, limit)

        for (let item of items) {
            result.push(await this.getMintViewModel(item, channel))
        }

        return result

    }



    async itemPage(pageNumber:number) : Promise<ItemPage> {
        return this.itemPageService.get(pageNumber)
    }

    async attributeItemPage(traitType:string, value: string, pageNumber:number) : Promise<ItemPage> {
        return this.itemService.getRowItemViewModelsByAttribute(traitType, value, pageNumber)
    }

    async ownerItemPage(address:string, pageNumber:number) : Promise<ItemPage> {
        return this.itemService.getRowItemViewModelsByOwner(address, pageNumber)
    }

    async query(query:string) : Promise<Item[]> {

        await this.schemaService.load(["items", "channels"])

        let results = await this.itemService.query(query)


        //Get channel
        const channel = await this.channelService.get()

        let viewModels: ItemViewModel[] = []

        for (let item of results) {
            viewModels.push(await this.getSearchViewModel(item, channel))
        }


        return viewModels
    }

    async buildItemPages(itemViewModels:ItemViewModel[], perPage:number) : Promise<ItemPage[]> {

        // await this.schemaService.load(["images"])

        let result: ItemPage[] = []


        let viewModels:RowItemViewModel[] = [] 

        //Create view models
        for (let itemViewModel of itemViewModels) {

            let item:Item = itemViewModel.item

            viewModels.push({
                _id: item._id,
                coverImageGenerated: itemViewModel.coverImage.generated ? true : false,
                coverImageId: itemViewModel.coverImage._id,
                title: `${item.title ? item.title : `#${item.tokenId}` }`,
                tokenId: item.tokenId
            })

        }

        //Break into rows
        for (let i = 0; i < viewModels.length; i += perPage) {
            result.push({
                items: viewModels.slice(i, i + perPage)
            })
        }


        return result

    }
    
    async buildAttributeTotals(channel:Channel) : Promise<AttributeTotal[]> {
        return this.itemService.buildAttributeTotals(channel)
    }

    async getRowItemViewModelsByTokenIds(filteredIds) : Promise<RowItemViewModel[]> {
        return this.itemService.getRowItemViewModelsByTokenIds(filteredIds)
    }

    translateRowItemViewModel(item:Item, coverImage:Image) : RowItemViewModel {

        let viewModel:RowItemViewModel = {
            _id: item._id,
            coverImageGenerated: coverImage.generated ? true : false,
            coverImageId: coverImage._id,
            title: `${item.title ? item.title : `#${item.tokenId}`}`,
            tokenId: item.tokenId
        }
        
        return viewModel

    }


}


export {
    ItemWebService
}