import { inject, injectable } from "inversify"
import toBuffer from 'it-to-buffer'
import all from 'it-all'
import Hash from 'ipfs-only-hash'
import axios from "axios"
import { v4 as uuidv4 } from 'uuid'
import IPFSGatewayTools from "@pinata/ipfs-gateway-tools/dist/node.js"


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
import { BigNumber, Contract, ethers } from "ethers";

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
            await this.ipfsService.ipfs.files.rm('/fork', { recursive: true, flush: true})
        } catch (ex) { }


        await this.ipfsService.ipfs.files.cp(`/ipfs/${cid}`, '/fork', { create: true, parents: true, flush: true })

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

        let mediaDownloader = new IPFSDownloader(this.ipfsService)

        if (forkType == "existing") {

            return this._importExisting(authors, channels, images, items, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, cid)
        
        } else {

            //Create author
            if (owner) {
                let author = new Author()
                author.walletAddress = owner
                authors = [author]
            } 

            return this._importAsFork(authors, channels, images, items, animations, themes, staticPages, forkStatus, mediaDownloader, contractMetadata, cid)
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
        importBundle.channels[0].localCid = ipfsCid

        return this._importExisting(
            importBundle.authors, 
            importBundle.channels, 
            importBundle.images, 
            importBundle.items, 
            importBundle.animations, 
            importBundle.themes, 
            importBundle.staticPages, 
            importBundle.forkStatus, 
            importBundle.mediaDownloader, 
            importBundle.contractMetadata,
            ipfsCid)

    }

    async importAsForkFromReader(baseURI:string, title:string, ipfsCid?:string) {

        let importBundle:ImportBundle = await this._buildImportBundle(baseURI)


        delete importBundle.channels[0].contractAddress
        delete importBundle.channels[0].localCid

        //Set the new name
        importBundle.channels[0].title = title

        return this._importAsFork(
            importBundle.authors, 
            importBundle.channels, 
            importBundle.images, 
            importBundle.items, 
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

        let mediaDownloader = new URLDownloader(baseURI)

        return {
            authors: authors,
            channels: channels,
            images: images,
            items: items,
            animations: animations,
            themes: themes,
            staticPages: staticPages,
            mediaDownloader: mediaDownloader,
            forkStatus: forkStatus,
            contractMetadata: contractMetadata

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
        let contract = new ethers.Contract(contractAddress, this._getERC721ABI(), wallet)

        this.logForkProgress(forkStatus, `Fetching tokens for contract ${contract.address}`)


        let tokenIds = await this.ercEventService.getTokensForContract(contract)

        
        forkStatus.channels.total = 1
        forkStatus.items.total = tokenIds.size


        //Create channel
        let channel:Channel = new Channel()

        channel.importSuccess = false

        if (forkType == "existing") {
            channel.contractAddress = contractAddress
        }

        channel.title = await contract.name()
        channel.symbol = await contract.symbol() 
        channel.sellerFeeBasisPoints = 0


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

        
        //Fetch token metadata for all tokens
        let tokenMetadata:TokenMetadata[] = []


        for (let tokenId of tokenIds) {

            this.logForkProgress(forkStatus, `Fetching metadata for #${tokenId}`)

            let metadata = await this._getTokenMetadata(contract, tokenId )

            tokenMetadata.push( metadata )

            if (metadata.image || metadata.image_url) {
                forkStatus.images.total++
            }

            if (metadata.animation_url) {
                forkStatus.animations.total++
            }

        }

        
        for (let metadata of tokenMetadata) {

            this.logForkProgress(forkStatus, `Importing token #${metadata.tokenId}`)

            let item:Item = new Item()
            

            let image:Image
            let animation:Animation

            let imageDimensions


            let tempImage = document.createElement('img')

            
            if (metadata.image || metadata.image_url) {

                //Fetch and create image
                let imageURI = metadata.image ? metadata.image : metadata.image_url
                let imageData = await this._fetchURI(imageURI)

                //Figure out if it's an svg and save appropriately
                if (isSvg(new TextDecoder().decode(imageData))) {
                    image = await this.imageService.newFromSvg(new TextDecoder().decode(imageData))
                } else {

                    image = await this.imageService.newFromBuffer(imageData)

                    await this.imageService.loadImage(tempImage, imageData)

                    imageDimensions = {
                        width: tempImage.width,
                        height: tempImage.height
                    }

                }

                try {
                    await this.imageService.put(image)
                    await this.itemWebService.publishImage(channel, image.cid)
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

            } else {

                //Generate a new one from the cover image
                item.coverImageAsAnimation = true 

                if (imageDimensions) {

                    //Insert the image into the Quill content so it shows up if we edit this item.
                    item.content = {
                        "ops": [
                            {
                                "insert": {
                                    "ipfsimage": {
                                        "src": await this.imageService.getUrl(image),
                                        "cid": image.cid,
                                        "width": imageDimensions.width,
                                        "height": imageDimensions.height,
                                        "style": null
                                    }
                                }
                            },
                            {
                                "insert": "\n\n"
                            }
                        ]
                    }

                }


                let content = await this.animationService.buildAnimationPage(item)

                animation = await this.animationService.newFromText(content)

            }


            //Save animation
            try {
                await this.animationService.put(animation)
                await this.itemWebService.publishAnimation(channel, animation.cid)
            } catch(ex) {} //ignore duplicates
            

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Importing animation ${animation._id}`)



            item.tokenId = metadata.tokenId 
            item.title = metadata.name 
            item.channelId = channel._id
            item.attributeSelections = []
            item.animationId = animation._id 


            //Build attributes for item
            for (let attribute of metadata.attributes) {

                item.attributeSelections.push({
                    traitType: attribute.trait_type,
                    value: attribute.value
                })

                this._addAttributeToChannel(attribute, channel)


            }
            
            item.originalJSONMetadata = metadata

            //Save item
            await this.itemWebService.put(item)

            //Update token stats
            tokenIdStatsQueryCache.result.count++

            if (!tokenIdStatsQueryCache.result.min || item.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = item.tokenId
            }

            if (!tokenIdStatsQueryCache.result.max || item.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = item.tokenId
            }



            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Importing item ${item._id}`)


        }



        // forkStatus.authors.saved++
        // this.logForkProgress(forkStatus, `Inserted author ${author._id}`)


        // //Save channel with attributes
        // channel.authorId = author._id
        
        channel.importSuccess = true

        await this.channelWebService.put(channel)

        this.logForkProgress(forkStatus, `Building query cache for channel ${channel._id}`)
        await this.channelService.buildAttributeCounts(channel._id)
        await this.queryCacheService.put(tokenIdStatsQueryCache)

        forkStatus.channels.saved++
        this.logForkProgress(forkStatus, `Importing channel ${channel._id}`)


        
        return channel._id

    }

    private async _importAsFork(authors:Author[], channels:Channel[], images:Image[], items:Item[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, contractMetadata:ContractMetadata, cid?:string) {

        let channelId 
        let channelObj

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

        channels[0].forkType = "fork"
        channels[0].forkedFromFeeRecipient = contractMetadata.fee_recipient

        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {

            delete author._rev 
            delete author["_rev_tree"]

            //Author might already exist. Get it so we can update.
            let existingAuthor

            try {
                existingAuthor = await this.authorService.get(author._id)
            } catch(ex) {}

            await this.authorService.put(Object.assign(existingAuthor ? existingAuthor : new Author(), author))            

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`)
        }

        for (let channel of channels) {

            let oldId = channel._id

            delete channel._id
            delete channel._rev 
            delete channel["_rev_tree"]

            //Get the new author ID
            channel.authorId = this.walletService.address?.toString()

            //Add it if doesn't exist 
            if (channel.authorId) {
                await this.authorService.insertIfNew(channel.authorId)
            }
        
            //Mark parent
            if (cid) {
                channel.forkedFromCid = cid
            } 

            channel.forkedFromId = oldId

            channelObj = Object.assign(new Channel(), channel)

            await this.channelWebService.put(channelObj) 

            idMap.set(oldId, channelObj._id)
            channelId = channelObj._id

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

        }



        let tokenIdStatsQueryCache = new QueryCache()
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channelId}`
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        }

        await this.schemaService.loadChannel(channelId)


        for (let animation of animations) {

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)

            //Validate we match the IPFS cid 
            let expectedCid = await Hash.of(animation.content)

            if (expectedCid.toString() != animation.cid) {    
                throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`)
            }


            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
                await this.itemWebService.publishAnimation(channels[0], animationObj.cid)
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

            //Validate we match the IPFS cid 
            let expectedCid = await Hash.of(content)

            if (expectedCid.toString() != image.cid) {    
                throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`)
            }

            try {
                await this.imageService.put(imageObj)
                await this.itemWebService.publishImage(channels[0], imageObj.cid)

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

            await this.itemWebService.put(itemObj) 

            //Update token stats
            tokenIdStatsQueryCache.result.count++

            if (!tokenIdStatsQueryCache.result.min || itemObj.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = itemObj.tokenId
            }

            if (!tokenIdStatsQueryCache.result.max || itemObj.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = itemObj.tokenId
            }


            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

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

        await this.channelWebService.put(channelObj) 


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

        
        await this.channelService.buildAttributeCounts(channelId)
        await this.queryCacheService.put(tokenIdStatsQueryCache)


        return channelId
    }

    private async _importExisting(authors:Author[], channels:Channel[], images:Image[], items:Item[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, contractMetadata:ContractMetadata, cid?:string) {

        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash")
        }

        let channelId
        let channelObj

        forkStatus.authors.total = authors.length
        forkStatus.channels.total = channels.length
        forkStatus.images.total = images.length
        forkStatus.items.total = items.length
        forkStatus.animations.total = animations.length
        forkStatus.themes.total = themes.length
        forkStatus.staticPages.total = staticPages.length

        this.logForkProgress(forkStatus, "Updating totals...")

        channels[0].forkType = "existing"
        channels[0].forkedFromFeeRecipient = contractMetadata.fee_recipient

        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {

            delete author._rev 
            delete author["_rev_tree"]

            //Author might already exist. Get it so we can update.
            let existingAuthor

            try {
                existingAuthor = await this.authorService.get(author._id)
            } catch(ex) {}

            await this.authorService.put(Object.assign(existingAuthor ? existingAuthor : new Author(), author))           

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`)
        }

        for (let channel of channels) {
            
            //Remove any existing rev info
            delete channel._rev
            delete channel["_rev_tree"]

            //Check if it exists
            channelObj = await this.channelService.getLatestRevision(channel._id)
            channelObj["_deleted"] = false

            await this.channelWebService.put(Object.assign(channelObj, channel))  

            channelId = channelObj._id

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

        }


        let tokenIdStatsQueryCache = new QueryCache()
        tokenIdStatsQueryCache._id = `token_id_stats_by_channel_${channelId}`
        tokenIdStatsQueryCache.result = {
            min: undefined,
            max: undefined,
            count: 0
        }

        await this.schemaService.loadChannel(channelId)


        for (let animation of animations) {

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)


            //Validate we match the IPFS cid 
            let expectedCid = await Hash.of(animation.content)

            if (expectedCid.toString() != animation.cid) {    
                throw new Error(`Incorrect cid when importing animation. Expected: ${animation.cid}, Result: ${expectedCid.toString()}`)
            }


            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
                await this.itemWebService.publishAnimation(channels[0], animationObj.cid)

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

            //Validate we match the IPFS cid 
            let expectedCid = await Hash.of(content)

            if (expectedCid.toString() != image.cid) {    
                throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`)
            }


            try {
                await this.imageService.put(imageObj)
                await this.itemWebService.publishImage(channels[0], imageObj.cid)

            } catch (ex) {} //ignore duplicates   

            forkStatus.images.saved++
            this.logForkProgress(forkStatus, `Inserted image ${imageObj._id}`)

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
            itemObj["_deleted"] = false
            
            await this.itemWebService.put(Object.assign(itemObj, item))  

            //Update token stats
            tokenIdStatsQueryCache.result.count++

            if (!tokenIdStatsQueryCache.result.min || itemObj.tokenId < tokenIdStatsQueryCache.result.min) {
                tokenIdStatsQueryCache.result.min = itemObj.tokenId
            }

            if (!tokenIdStatsQueryCache.result.max || itemObj.tokenId > tokenIdStatsQueryCache.result.max) {
                tokenIdStatsQueryCache.result.max = itemObj.tokenId
            }


            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

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

        await this.channelWebService.put(channelObj) 



        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `)

        this.logForkProgress(forkStatus, `Building query cache for channel ${channels[0]._id}`)

        await this.channelService.buildAttributeCounts(channels[0]._id)
        await this.queryCacheService.put(tokenIdStatsQueryCache)


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

        let cacheId = `${contract.address}-${tokenId}`

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

        console.log(tokenURI)

        let metadata = JSON.parse(new TextDecoder().decode(await this._fetchURI(tokenURI)))

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

        

        if (gatewayTools.containsCID(uri)) {

            uri = gatewayTools.convertToDesiredGateway(uri, '')

            //Remove ipfs://
            // uri = `/ipfs/${uri.substring(7,uri.length)}`
            
            // console.log(uri)

            //Get from IPFS
            const data = uint8ArrayConcat(await all(this.ipfsService.ipfs.cat(uri)))

            //@ts-ignore
            return data

        } else {

            //Get from old interwebs
            let result = await axios.get(uri, {
                responseType: "arraybuffer",
            })

            return Buffer.from(result.data,'binary')

            // console.log(result)

            // return result.data
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