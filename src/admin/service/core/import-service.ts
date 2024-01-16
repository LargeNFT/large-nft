import { inject, injectable } from "inversify"
import toBuffer from 'it-to-buffer'
import all from 'it-all'
import Hash from 'ipfs-only-hash'
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import IPFSGatewayTools from "@pinata/ipfs-gateway-tools/dist/node.js"

import fs from "fs"


import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Item } from "../../dto/item.js";
import { Image } from "../../dto/image.js";

import { AnimationService } from "../animation-service.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { ImageService } from "../image-service.js";
import { ItemService } from "../item-service.js";
import { IpfsService } from "./ipfs-service.js";
import TYPES from "./types.js";
import { WalletService } from "./wallet-service.js"
import { Animation } from "../../dto/animation.js"
import { ForkStatus } from "../../dto/viewmodel/fork-status.js"
import { Theme } from "../../dto/theme.js";
import { StaticPage } from "../../dto/static-page.js";
import { ethers } from "ethers";

import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import { ImportBundle, MediaDownloader } from "../../dto/import-bundle.js";
import { ThemeRepository } from "../../repository/theme-repository.js";
import { ThemeService } from "../theme-service.js";

import { StaticPageRepository } from "../../repository/static-page-repository.js";
import { TokenMetadataCacheRepository } from "../../repository/token-metadata-cache-repository.js";

import { ContractMetadata } from "../../dto/contract-metadata.js";
import { StaticPageService } from "../static-page-service.js";
import { ERCEventService } from "./erc-event-service.js";
import { AttributeOptions } from "../../dto/attribute.js";

import isSvg from "is-svg"
import { TokenMetadata } from "../../dto/token-metadata-cache.js";
import { QueryCache } from "../../dto/query-cache.js"
import { QueryCacheService } from "./query-cache-service.js"
import { SchemaService } from "./schema-service.js"
import { ItemWebService } from "../web/item-web-service.js"
import { ChannelWebService } from "../web/channel-web-service.js"
import { OriginalMetadataService } from "../original-metadata-service.js"
import { OriginalMetadata } from "../../dto/original-metadata.js"


const gatewayTools = new IPFSGatewayTools()

@injectable()
class ImportService {

    constructor(
        private channelService: ChannelService,
        private channelWebService: ChannelWebService,
        private queryCacheService:QueryCacheService,
        private schemaService:SchemaService,
        private itemService: ItemService,
        private itemWebService:ItemWebService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private themeRepository:ThemeRepository,
        private themeService:ThemeService,
        private staticPageRepository:StaticPageRepository,
        private staticPageService:StaticPageService,
        private ercEventService:ERCEventService,
        private originalMetadataService:OriginalMetadataService,
        private tokenMetadataCacheRepository:TokenMetadataCacheRepository,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) {}

    async importFromIPFS(cid:string, forkType:string, owner?:string) : Promise<string> {

        let forkStatus:ForkStatus = {
            animations: { saved: 0, total: 0},
            images: { saved: 0, total: 0},
            channels: { saved: 0, total: 0},
            items: { saved: 0, total: 0},
            authors: { saved: 0, total: 0},
            themes: { saved: 0, total: 0 },
            staticPages:  { saved: 0, total: 0 }
        }

        this.logForkProgress(forkStatus, `Starting fork of ${cid}. Fetching data...`)


        try {
            await this.ipfsService.filesRm('/fork', { recursive: true, flush: true})
        } catch (ex) { }

        await this.ipfsService.filesCp(`/ipfs/${cid}`, '/fork', { create: true, parents: true, flush: true })

        this.logForkProgress(forkStatus, "Processing...")


        //Load the directory from IPFS
        let authors:Author[] = await this._readFile(`/fork/backup/authors.json`)
        let channels:Channel[] = await this._readFile(`/fork/backup/channels.json`)
        let images:Image[] = await this._readFile(`/fork/backup/images.json`)
        let items:Item[] = await this._readFile(`/fork/backup/items.json`)
        
        let animations:Animation[] = await this._readFile(`/fork/backup/animations.json`)
        let themes:Theme[] = await this._readFile(`/fork/backup/themes.json`)
        let staticPages:StaticPage[] = await this._readFile(`/fork/backup/static-pages.json`)
        let contractMetadata:ContractMetadata = await this._readFile(`/fork/contractMetadata.json`)

        let originalMetadata:OriginalMetadata[]

        try {
            originalMetadata = await this._readFile(`/fork/backup/originalMetadata.json`)
        } catch(ex) {}

        let tokenMetadata = {}

        let mediaDownloader = new IPFSDownloader(this.ipfsService)

        if (forkType == "existing") {

            for (let item of items) {
                // this.logForkProgress(forkStatus, `Downloading metadata for token #${item.tokenId}`)
                tokenMetadata[item.tokenId] =  await this._readFile(`/fork/metadata/${item.tokenId}.json`)
            }

            return this._importExisting(authors, channels, images, items, originalMetadata, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, tokenMetadata, cid)
        
        } else {

            //Create author
            if (owner) {
                let author = new Author()
                author.walletAddress = owner
                authors = [author]
            } 

            return this._importAsFork(authors, channels, images, items, originalMetadata, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, cid)
        }

    }

    async importExistingFromContract(contractAddress:string) : Promise<string> {
        return this._importFromContract(contractAddress, "existing")
    }

    async importAsForkFromContract(contractAddress:string) : Promise<string> {
        return this._importFromContract(contractAddress, "fork")
    }

    async importExistingFromReader(baseURI:string, contractAddress:string, ipfsCid:string) {

        let importBundle:ImportBundle = await this._buildImportBundle(baseURI)

        importBundle.channels[0].contractAddress = contractAddress

        importBundle.channels[0].publishReaderIPFSStatus = {}
        importBundle.channels[0].publishReaderIPFSStatus.cid = ipfsCid

        return this._importExisting(
            importBundle.authors, 
            importBundle.channels, 
            importBundle.images, 
            importBundle.items, 
            importBundle.originalMetadata,
            importBundle.animations, 
            importBundle.themes, 
            importBundle.staticPages, 
            importBundle.forkStatus, 
            importBundle.mediaDownloader, 
            importBundle.contractMetadata,
            importBundle.tokenMetadata,
            ipfsCid)

    }

    async importAsForkFromReader(baseURI:string, title:string, ipfsCid?:string) {

        let importBundle:ImportBundle = await this._buildImportBundle(baseURI)


        delete importBundle.channels[0].contractAddress
        delete importBundle.channels[0].publishReaderIPFSStatus

        //Set the new name
        importBundle.channels[0].title = title

        return this._importAsFork(
            importBundle.authors, 
            importBundle.channels, 
            importBundle.images, 
            importBundle.items, 
            importBundle.originalMetadata,
            importBundle.animations, 
            importBundle.themes, 
            importBundle.staticPages, 
            importBundle.forkStatus, 
            importBundle.mediaDownloader,
            importBundle.contractMetadata,
            ipfsCid)
    }

    private async _buildImportBundle(baseURI:string) : Promise<ImportBundle> {

        let forkStatus:ForkStatus = {
            animations: { saved: 0, total: 0},
            images: { saved: 0, total: 0},
            channels: { saved: 0, total: 0},
            items: { saved: 0, total: 0},
            authors: { saved: 0, total: 0},
            themes: { saved: 0, total: 0 },
            staticPages:  { saved: 0, total: 0 }
        }

        this.logForkProgress(forkStatus, "Processing...")

        //Load the files from the server.
        let authors:Author[] = await this._fetchFile(`${baseURI}backup/export/backup/authors.json`)
        let channels:Channel[] = await this._fetchFile(`${baseURI}backup/export/backup/channels.json`)
        let images:Image[] = await this._fetchFile(`${baseURI}backup/export/backup/images.json`)
        let items:Item[] = await this._fetchFile(`${baseURI}backup/export/backup/items.json`)

        let animations:Animation[] = await this._fetchFile(`${baseURI}backup/export/backup/animations.json`)
        let themes:Theme[] = await this._fetchFile(`${baseURI}backup/export/backup/themes.json`)
        let staticPages:StaticPage[] = await this._fetchFile(`${baseURI}backup/export/backup/static-pages.json`)

        let contractMetadata:ContractMetadata = await this._fetchFile(`${baseURI}backup/export/contractMetadata.json`)

        let originalMetadata:OriginalMetadata[]

        try {
            originalMetadata= await this._fetchFile(`${baseURI}backup/export/backup/originalMetadata.json`)
        } catch(ex) {}


        let mediaDownloader = new URLDownloader(baseURI)

        let tokenMetadata = {}

        for (let item of items) {
            tokenMetadata[item.tokenId] =  await this._fetchFile(`${baseURI}backup/export/metadata/${item.tokenId}.json`)
        }

        return {
            authors: authors,
            channels: channels,
            images: images,
            items: items,
            originalMetadata: originalMetadata,
            animations: animations,
            themes: themes,
            staticPages: staticPages,
            mediaDownloader: mediaDownloader,
            forkStatus: forkStatus,
            contractMetadata: contractMetadata,
            tokenMetadata: tokenMetadata

        }

    }

    private async _importFromContract(contractAddress:string, forkType:string) : Promise<string> {

        let forkStatus:ForkStatus = {
            animations: { saved: 0, total: 0},
            images: { saved: 0, total: 0},
            channels: { saved: 0, total: 0},
            items: { saved: 0, total: 0},
            authors: { saved: 0, total: 0},
            themes: { saved: 0, total: 0 },
            staticPages:  { saved: 0, total: 0 }
        }

        let wallet = this.walletService.wallet

        //Look up channel since it has the basic ERC721 signature
        let contract = new ethers.Contract(contractAddress, this._getERC721ABI(), wallet ? wallet : this.walletService.provider)

        this.logForkProgress(forkStatus, `Fetching tokens for contract ${contractAddress}`)


        let tokenIds = await this.ercEventService.getTokensForContract(contract)

        
        forkStatus.channels.total = 1
        forkStatus.items.total = tokenIds.size


        //Create channel
        let channel:Channel = new Channel()

        channel.importSuccess = false

        if (forkType == "existing") {
            channel.contractAddress = contractAddress
        }

        channel.forkType = forkType

        channel.title = await contract.name()
        channel.symbol = await contract.symbol() 
        // channel.sellerFeeBasisPoints = 0


        channel.attributeOptions = []

        //Insert channel to get an _id
        await this.channelWebService.put(channel)


        let tokenIdStatsQueryCache = new QueryCache()
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        }


        await this.schemaService.loadChannel(channel._id)

        let skippedTokens = []

        //Fetch token metadata for all tokens
        for (let tokenId of tokenIds) {

            this.logForkProgress(forkStatus, `Fetching metadata for #${tokenId}`)

            try {

                let metadata = await this._getTokenMetadata(contract, tokenId )

                if (!metadata.tokenId) {
                    skippedTokens.push(tokenId)
                    this.logForkProgress(forkStatus, `Metadata for #${tokenId} not found. Skipping import.`)
                    continue
                }

                this.logForkProgress(forkStatus, `Importing token #${metadata.tokenId}`)
    
                console.time(`Importing token #${metadata.tokenId}`)
    
                let item:Item = new Item()
                
                let image:Image
                let animation:Animation
    
                if (metadata.image || metadata.image_url) {
    
                    //Fetch and create image
                    let imageURI = metadata.image ? metadata.image : metadata.image_url
                    let imageData = await this._fetchURI(imageURI)
    
                    //Figure out if it's an svg and save appropriately
                    if (isSvg(new TextDecoder().decode(imageData))) {
                        image = await this.imageService.newFromSvg(new TextDecoder().decode(imageData))
                    } else {
                        image = await this.imageService.newFromBuffer(imageData)
                    }
    
                    try {
                        await this.imageService.put(image)
                    } catch(ex) {} //ignore duplicates
                    
                    item.coverImageId = image._id
    
                    forkStatus.images.saved++
                    this.logForkProgress(forkStatus, `Importing image ${image._id}`)
    
    
                } else {
                    throw new Error("No image in metadata")
                }
    
    
                //Create or save animation
                if (metadata.animation_url) {
    
                    item.coverImageAsAnimation = false
    
                    //Fetch and create animation
                    animation = await this.animationService.newFromText(new TextDecoder().decode(await this._fetchURI(metadata.animation_url)))
    
    
                    //Save animation
                    try {
                        await this.animationService.put(animation)
                    } catch(ex) {} //ignore duplicates
    
                    
                    forkStatus.animations.saved++
                    this.logForkProgress(forkStatus, `Importing animation ${animation._id}`)
    
                    item.animationId = animation._id 
    
    
                } else {
                    item.coverImageAsAnimation = true 
                }
        
                item.tokenId = metadata.tokenId 
                item.title = metadata.name 
                item.channelId = channel._id
                item.attributeSelections = []
    
                //Build attributes for item
                for (let attribute of metadata.attributes) {
    
                    item.attributeSelections.push({
                        traitType: attribute.trait_type,
                        value: attribute.value
                    })
    
                    this._addAttributeToChannel(attribute, channel)
    
                }
                
                //Save metadata
                let originalMetadata = await this.originalMetadataService.newFromText(JSON.stringify(metadata))
    
                await this.originalMetadataService.put(originalMetadata)
    
                item.originalJSONMetadataId = originalMetadata._id
    
                //Save item
                await this.itemWebService.put({
                    channel: channel,
                    item: item,
                    updateQueryCache: false,
                    publish: false
                })
    
                //Update token stats
                tokenIdStatsQueryCache.result.count++
    
                if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                    tokenIdStatsQueryCache.result.min = item.tokenId
                }
    
                if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                    tokenIdStatsQueryCache.result.max = item.tokenId
                }
    
                forkStatus.items.saved++
                // this.logForkProgress(forkStatus, `Importing item ${item._id}`)
    
                // console.timeEnd(`Importing token #${metadata.tokenId}`)
    
                if (metadata.image || metadata.image_url) {
                    forkStatus.images.total++
                }
    
                if (metadata.animation_url) {
                    forkStatus.animations.total++
                }
    
                console.timeEnd(`Importing token #${metadata.tokenId}`)


            } catch(ex) {
                console.log(`Error importing token ${tokenId}: ${ex.message}`)
            }
            

        }

        this.logForkProgress(forkStatus, `Skipped tokens: ${skippedTokens}`)


        this.logForkProgress(forkStatus, `Building query cache for channel ${channel._id}`)


        await this.channelService.buildAttributeCounts(channel._id)



        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache 

        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id)
        } catch (ex) {}

        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev
        }

        await this.queryCacheService.put(tokenIdStatsQueryCache)


        channel.importSuccess = true
        await this.channelWebService.put(channel)

        forkStatus.channels.saved++
        this.logForkProgress(forkStatus, `Importing channel ${channel._id}`)

        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)

        
        return channel._id

    }

    private async _importAsFork(authors:Author[], channels:Channel[], images:Image[], items:Item[], originalMetadatas:OriginalMetadata[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, contractMetadata:ContractMetadata, cid?:string) {

        let channelId 
        let channel

        let idMap = new Map<string, string>()


        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash")
        }

        
        forkStatus.authors.total = authors.length
        forkStatus.channels.total = channels.length
        forkStatus.images.total = images.length
        forkStatus.items.total = items.length
        forkStatus.animations.total = animations.length
        forkStatus.themes.total = themes.length
        forkStatus.staticPages.total = staticPages.length

        this.logForkProgress(forkStatus, "Updating totals...")

        channel = new Channel()
        Object.assign(channel, channels[0])

        channel.forkType = "fork"
        channel.forkedFromFeeRecipient = contractMetadata.fee_recipient



        //Insert channel
        let oldId = `${channel._id}`

        delete channel._id
        delete channel._rev 
        delete channel["_rev_tree"]

    
        //Mark parent
        if (cid) {
            channel.forkedFromCid = cid
        } 

        channel.forkedFromId = oldId

        await this.channelWebService.put(channel) 

        idMap.set(oldId, channel._id)
        channelId = channel._id

        forkStatus.channels.saved++
        this.logForkProgress(forkStatus, `Inserted channel ${channel._id}`)



        let tokenIdStatsQueryCache = new QueryCache()
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        }


        await this.schemaService.loadChannel(channel._id)


        //Get the new author ID
        channel.authorId = this.walletService.address?.toString()

        //Add it if doesn't exist 
        if (channel.authorId) {
            await this.authorService.insertIfNew(channel.authorId)
        }


        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {
            
            delete author._rev 
            delete author["_rev_tree"]

            await this.authorService.put(Object.assign(new Author(), author))           

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`)
        }


        for (let animation of animations) {

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)

            //Validate we match the IPFS cid 
            // let expectedCid = await Hash.of(animation.content)

            // if (expectedCid.toString() != animation.cid) {    
            //     throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`)
            // }


            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
                // await this.itemWebService.publishAnimation(channels[0], animationObj.cid, false)
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`)

        }

        for (let image of images) {

            let content

            //Load content
            if (image.generated) {
                image.svg = await mediaDownloader.getAsString(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
                content = image.svg
            } else {
                image.buffer = await mediaDownloader.getAsBuffer(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
                content = new Uint8Array(image.buffer)
            }


            let imageObj = Object.assign(new Image(), image)

            // //Validate we match the IPFS cid 
            // let expectedCid = await Hash.of(content)

            // if (expectedCid.toString() != image.cid) {    
            //     throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`)
            // }

            try {
                await this.imageService.put(imageObj)
                // await this.itemWebService.publishImage(channels[0], imageObj.cid, false)

            } catch (ex) {} //ignore duplicates   

            forkStatus.images.saved++
            this.logForkProgress(forkStatus, `Inserted image ${imageObj._id}`)

        }

        for (let theme of themes) {

            let oldId = theme._id

            delete theme._id
            delete theme._rev 
            delete theme["_rev_tree"]

            theme.channelId = idMap.get(theme.channelId) //look up the new channel ID

            let themeObj = Object.assign(new Theme(), theme)

            theme.forkedFromId = oldId

            await this.themeService.put(themeObj)           

            //map old id
            idMap.set(oldId, themeObj._id)

            forkStatus.themes.saved++
            this.logForkProgress(forkStatus, `Inserted theme ${themeObj._id}`)
        }

        for (let staticPage of staticPages) {

            let oldId = staticPage._id

            delete staticPage._id
            delete staticPage._rev 
            delete staticPage["_rev_tree"]

            staticPage.channelId = idMap.get(staticPage.channelId) //look up the new channel ID

            staticPage.forkedFromId = oldId

            let staticPageObj = Object.assign(new StaticPage(), staticPage)

            try {
                await this.staticPageService.put(staticPageObj)
            } catch (ex) {} //ignore duplicates            

            forkStatus.staticPages.saved++
            this.logForkProgress(forkStatus, `Inserted static page ${staticPageObj._id}`)
        }

        for (let item of items) {
            
            let oldId = item._id

            delete item._id
            delete item._rev 
            delete item["_rev_tree"]

            item.channelId = idMap.get(item.channelId) //look up the new channel ID

            //Get image data and re-insert it into the content ops
            if (item.content?.ops?.length > 0) {

                let ops = []

                for (let op of item.content.ops) {

                    if (op.insert && op.insert.ipfsimage) {

                        let image:Image = await this.imageService.get(op.insert.ipfsimage.cid)
                        op.insert.ipfsimage.src = await this.imageService.getUrl(image)
                    }

                    ops.push(op)
                }

                item.content.ops = ops

            }

            //Loop through themes and update IDs
            if (item.themes?.length > 0) {

                let updatedThemes:string[] = []

                for (let theme of item.themes) {
                    updatedThemes.push(idMap.get(theme))
                }
    
                item.themes = updatedThemes
            }

            item.forkedFromId = oldId


            let itemObj = Object.assign(new Item(), item)

            await this.itemWebService.put({
                channel: channel,
                item: itemObj,
                updateQueryCache: false,
                publish: false
            }) 



            //Update token stats
            tokenIdStatsQueryCache.result.count++

            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId
            }

            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId
            }



            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

        }

    
        // console.log(channel)


        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `)

        this.logForkProgress(forkStatus, `Building query cache for channel ${channelId}`)    

        await this.channelService.buildAttributeCounts(channel._id)



        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache 

        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id)
        } catch (ex) {}

        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev
        }

        await this.queryCacheService.put(tokenIdStatsQueryCache)


        channel.importSuccess = true
        await this.channelWebService.put(channel) 

        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)


        return channelId
    }

    private async _importExisting(authors:Author[], channels:Channel[], images:Image[], items:Item[], originalMetadatas:OriginalMetadata[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, contractMetadata:ContractMetadata, tokenMetadata:any, cid?:string) {

        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash")
        }

        let channelId
        let channel

        forkStatus.authors.total = authors.length
        forkStatus.channels.total = channels.length
        forkStatus.images.total = images.length
        forkStatus.items.total = items.length
        forkStatus.animations.total = animations.length
        forkStatus.themes.total = themes.length
        forkStatus.staticPages.total = staticPages.length

        this.logForkProgress(forkStatus, "Updating totals...")

        channel = Object.assign(new Channel(), channels[0])

        channel.forkType = "existing"
        channel.forkedFromFeeRecipient = contractMetadata.fee_recipient



        //Remove any existing rev info
        delete channel._rev
        delete channel["_rev_tree"]

        //Check if it exists
        let channelObj = await this.channelService.getLatestRevision(channel._id)

        if (channelObj) {
            channel["_deleted"] = false
            channel._rev = channelObj._rev
        }


        await this.channelWebService.put(channel)  




        channelId = channel._id

        forkStatus.channels.saved++
        this.logForkProgress(forkStatus, `Inserted channel ${channel._id}`)



        let tokenIdStatsQueryCache = new QueryCache()
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channel._id}`
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        }

        await this.schemaService.loadChannel(channelId)

        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {

            delete author._rev 
            delete author["_rev_tree"]

            //Check if it exists
            let authorObj = await this.authorService.getLatestRevision(author._id)
            authorObj["_deleted"] = false

            await this.authorService.put(Object.assign(authorObj, author))           

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`)
        }


        for (let animation of animations) {

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)


            // //Validate we match the IPFS cid 
            // let expectedCid = await Hash.of(animation.content)

            // if (expectedCid.toString() != animation.cid) {    
            //     throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`)
            // }


            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus)

        }

        for (let image of images) {

            let content

            //Load content
            if (image.generated) {
                image.svg = await mediaDownloader.getAsString(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
                content = image.svg
            } else {
                image.buffer = await mediaDownloader.getAsBuffer(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
                content = new Uint8Array(image.buffer)
            }


            let imageObj = Object.assign(new Image(), image)

            //Validate we match the IPFS cid 
            // let expectedCid = await Hash.of(content)

            // if (expectedCid.toString() != image.cid) {    
            //     throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`)
            // }


            try {
                await this.imageService.put(imageObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.images.saved++
            this.logForkProgress(forkStatus)

        }

        for (let theme of themes) {

            //Remove any existing rev info
            delete theme._rev
            delete theme["_rev_tree"]

            //Check if it exists
            let themeObj = await this.themeRepository.getLatestRevision(theme._id)
            themeObj["_deleted"] = false

            await this.themeRepository.put(Object.assign(themeObj, theme))           

            forkStatus.themes.saved++
            this.logForkProgress(forkStatus, `Inserted theme ${themeObj._id}`)
        }

        for (let staticPage of staticPages) {

            //Remove any existing rev info
            delete staticPage._rev
            delete staticPage["_rev_tree"]

            //Check if it exists
            let staticPageObj = await this.staticPageRepository.getLatestRevision(staticPage._id)
            staticPageObj["_deleted"] = false
            
            await this.staticPageRepository.put(Object.assign(staticPageObj, staticPage))          

            forkStatus.staticPages.saved++
            this.logForkProgress(forkStatus, `Inserted static page ${staticPageObj._id}`)
        }

        for (let item of items) {
           

            //Get image data and re-insert it into the content ops
            if (item.content?.ops?.length > 0) {

                let ops = []

                for (let op of item.content.ops) {

                    if (op.insert && op.insert.ipfsimage) {

                        let image:Image = await this.imageService.get(op.insert.ipfsimage.cid)
                        op.insert.ipfsimage.src = await this.imageService.getUrl(image)
                    }

                    ops.push(op)
                }

                item.content.ops = ops

            }

            //Remove any existing rev info
            delete item._rev
            delete item["_rev_tree"]

            //Check if it exists
            let itemObj = await this.itemService.getLatestRevision(item._id)

            if (itemObj) {
                item["_deleted"] = false
                item._rev = itemObj._rev
            }


            //Save metadata
            let originalMetadata = await this.originalMetadataService.newFromText(JSON.stringify(tokenMetadata[item.tokenId]))
            await this.originalMetadataService.put(originalMetadata)
            item.originalJSONMetadataId = originalMetadata._id

            //Save image
            await this.itemWebService.put({
                channel: channel,
                item: Object.assign(new Item(), item),
                updateQueryCache: false,
                publish: false
            })  


            //Update token stats
            tokenIdStatsQueryCache.result.count++

            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId
            }

            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId
            }


            forkStatus.items.saved++
            this.logForkProgress(forkStatus)

        }



        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `)

        this.logForkProgress(forkStatus, `Building query cache for channel ${channel._id}`)    

        await this.channelService.buildAttributeCounts(channel._id)

        //Update existing token cache if it exists or create a new one.
        let existingTokenIdStatsCache 

        try {
            existingTokenIdStatsCache = await this.queryCacheService.get(tokenIdStatsQueryCache._id)
        } catch (ex) {}

        if (existingTokenIdStatsCache) {
            tokenIdStatsQueryCache._rev = existingTokenIdStatsCache._rev
        }

        await this.queryCacheService.put(tokenIdStatsQueryCache)


        channel.importSuccess = true

        await this.channelWebService.put(channel) 

        // await this.ipfsService.ipfs.files.flush(`/export/${channel._id}/`)

        this.logForkProgress(forkStatus, `Forking channel ${channel._id} complete`)


        
        return channels[0]._id
    }

    private _addAttributeToChannel(attribute: { trait_type: string; value: string; }, channel: Channel) {
    
        let attributeOptions:AttributeOptions

        //Check if the trait_type is already on the channel
        let matching = channel.attributeOptions.filter(ao => ao.traitType == attribute.trait_type)

        if (matching?.length > 0) {
            attributeOptions = matching[0]            
        } else {
            channel.attributeOptions.push({ 
                id: uuidv4(),
                traitType: attribute.trait_type, 
                values: [attribute.value] 
            })
            attributeOptions = channel.attributeOptions[channel.attributeOptions.length - 1]
        }

        //Add the value if it doesn't exist
        if (!attributeOptions.values.includes(attribute.value)) {
            attributeOptions.values.push(attribute.value)
        }


    }

    private async _getTokenMetadata(contract, tokenId:number) : Promise<TokenMetadata> {

        let cacheId = `${await contract.getAddress()}-${tokenId}`

        //Check the cache
        let existing

        try {
            existing = await this.tokenMetadataCacheRepository.get(cacheId)
        } catch(ex) {}
        
        if (existing) {
            console.log(`Returning cached token metadata #${tokenId}`)
            return existing.tokenMetadata
        } 

        
        let tokenURI = await contract.tokenURI(tokenId)

        let metadataData = await this._fetchURI(tokenURI)

        //Some collections 
        let metadata = JSON.parse(new TextDecoder().decode(metadataData))

        metadata.tokenId = tokenId

        //Cache it
        await this.tokenMetadataCacheRepository.put({
            _id: cacheId,
            tokenMetadata: metadata,
            dateCreated: new Date().toJSON()
        })


        return metadata

    }

    private async _fetchURI(uri) {
        
        if (uri.startsWith("data:application/json;utf-8,")) {

            return Buffer.from(uri.substring(28, uri.length))

        } else if (uri.startsWith("data:image/bmp;base64,")) {

            return Buffer.from(uri.substring(22, uri.length), "base64")


        } else if (uri.startsWith("http")) {

            //Get from old interwebs
            let result = await axios.get(uri, {
                responseType: "arraybuffer",
            })

            return Buffer.from(result.data,'binary')


        } else {

            let containResults = gatewayTools.containsCID(uri)

            if (containResults?.containsCid) {

                uri = gatewayTools.convertToDesiredGateway(uri, '')
    
                //Get from IPFS
                const data = uint8ArrayConcat(await all(this.ipfsService.ipfs.cat(uri)))
    
                return data
    
            } 

        }

    }

    private async _readFile(filename:string) {
        let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(filename)) 
        return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

    }

    private async _fetchFile(filename:string) {
        let response = await axios.get(filename)
        return response.data
    }

    private logForkProgress(forkStatus:ForkStatus, message?: string) {

        if (message) {
            console.log(message)
        }
        

        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const e = new CustomEvent('fork-progress', {
                detail: { 
                    forkStatus: forkStatus,
                    message: message 
                }
            })

            document.dispatchEvent(e)

        }

    }

    private _getERC721ABI() {
        return `[
            {
                "inputs":[
                   {
                      "internalType":"string",
                      "name":"name",
                      "type":"string"
                   },
                   {
                      "internalType":"string",
                      "name":"symbol",
                      "type":"string"
                   }
                ],
                "stateMutability":"nonpayable",
                "type":"constructor"
            },

            {
              "constant": true,
              "inputs": [],
              "name": "name",
              "outputs": [
                {
                  "name": "",
                  "type": "string"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_spender",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "approve",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "totalSupply",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_from",
                  "type": "address"
                },
                {
                  "name": "_to",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "transferFrom",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "decimals",
              "outputs": [
                {
                  "name": "",
                  "type": "uint8"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_owner",
                  "type": "address"
                }
              ],
              "name": "balanceOf",
              "outputs": [
                {
                  "name": "balance",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [],
              "name": "symbol",
              "outputs": [
                {
                  "name": "",
                  "type": "string"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "constant": false,
              "inputs": [
                {
                  "name": "_to",
                  "type": "address"
                },
                {
                  "name": "_value",
                  "type": "uint256"
                }
              ],
              "name": "transfer",
              "outputs": [
                {
                  "name": "",
                  "type": "bool"
                }
              ],
              "payable": false,
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "constant": true,
              "inputs": [
                {
                  "name": "_owner",
                  "type": "address"
                },
                {
                  "name": "_spender",
                  "type": "address"
                }
              ],
              "name": "allowance",
              "outputs": [
                {
                  "name": "",
                  "type": "uint256"
                }
              ],
              "payable": false,
              "stateMutability": "view",
              "type": "function"
            },
            {
              "payable": true,
              "stateMutability": "payable",
              "type": "fallback"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "owner",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "spender",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Approval",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "name": "from",
                  "type": "address"
                },
                {
                  "indexed": true,
                  "name": "to",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "name": "value",
                  "type": "uint256"
                }
              ],
              "name": "Transfer",
              "type": "event"
            },
            {
                "inputs":[
                   {
                      "internalType":"uint256",
                      "name":"tokenId",
                      "type":"uint256"
                   }
                ],
                "name":"tokenURI",
                "outputs":[
                   {
                      "internalType":"string",
                      "name":"",
                      "type":"string"
                   }
                ],
                "stateMutability":"view",
                "type":"function"
             }
             
          ]`
    }

}





class IPFSDownloader implements MediaDownloader {
    
    basePath:string = "/fork/"

    constructor(
        private ipfsService:IpfsService
    ) {}

    async getAsString(filename:string): Promise<string> {        
        let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${this.basePath}${filename}`)) 
        return new TextDecoder("utf-8").decode(bufferedContents)
    }

    async getAsBuffer(filename:string): Promise<Uint8Array> {        
        return toBuffer(this.ipfsService.ipfs.files.read(`${this.basePath}${filename}`)) 
    }

}

class URLDownloader implements MediaDownloader {
    
    constructor(
        public basePath: string
    ) {}

    async getAsString(path:string): Promise<string> {
        
        let response = await axios.get(`${this.basePath}backup/export/${path}`)
        return response.data?.toString()
    }

    async getAsBuffer(path:string): Promise<Uint8Array> {

        let response = await axios.get(`${this.basePath}backup/export/${path}`, {
            responseType: "arraybuffer"
        })
        return response.data
    }

}








export {
    ImportService
}