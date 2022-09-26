import { inject, injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Item } from "../../dto/item";
import { Image } from "../../dto/image";

import { AnimationService } from "../animation-service";
import { AuthorService } from "../author-service";
import { ChannelService } from "../channel-service";
import { ImageService } from "../image-service";
import { ItemService } from "../item-service";
import { IpfsService } from "./ipfs-service";
import TYPES from "./types";
import { WalletService } from "./wallet-service"
import { Animation } from "../../dto/animation"
import { ForkStatus } from "../../dto/viewmodel/fork-status"
import toBuffer from 'it-to-buffer'
import { Theme } from "../../dto/theme";
import { ThemeService } from "../theme-service";
import { StaticPage } from "../../dto/static-page";
import { StaticPageService } from "../static-page-service";
import { BigNumber, ethers } from "ethers";
import axios from "axios";

import { concat as uint8ArrayConcat } from 'uint8arrays/concat'
import all from 'it-all'
import { ImportBundle, MediaDownloader } from "dto/import-bundle";
import Hash from 'ipfs-only-hash'


@injectable()
class ImportService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private themeService:ThemeService,
        private staticPageService:StaticPageService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) {}

    async importFromIPFS(cid:string) : Promise<string> {

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

        let mediaDownloader = new IPFSDownloader(this.ipfsService)

        return this._importAsFork(authors, channels, images, items, animations, themes, staticPages, forkStatus, mediaDownloader, cid)
    }

    async importFromContract(contractAddress:string, startToken:number, endToken:number) : Promise<string> {

        let wallet = this.walletService.wallet

        //Look up channel since it has the basic ERC721 signature
        const c = this.contracts['Channel']

        let contract = new ethers.Contract(contractAddress, c.abi, wallet)

        // contract

        for (let i=startToken; i <= endToken; i++) {
            
            let tokenMetadata = await this._getTokenMetadata(contract, i)

            // console.log(tokenMetadata)

            //Fetch image
            if (tokenMetadata.image) {
                let image = await this._fetchURI(tokenMetadata.image)
                // console.log(image.length)

            }


        }


        return 

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
            forkStatus: forkStatus

        }

    }

    private async _importAsFork(authors:Author[], channels:Channel[], images:Image[], items:Item[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, cid?:string) {

        let channelId 

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

        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {

            delete author._rev 
            delete author["_rev_tree"]

            //Author might already exist. Get it so we can update.
            let existingAuthor

            try {
                existingAuthor = await this.authorService.get(author._id)
            } catch(ex) {}

            await this.authorService.put(Object.assign(existingAuthor, author))            

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

            let channelObj = Object.assign(new Channel(), channel)

            await this.channelService.put(channelObj) 

            idMap.set(oldId, channelObj._id)
            channelId = channelObj._id

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

        }

        for (let image of images) {

            //Load content
            if (image.generated) {
                image.svg = await mediaDownloader.getAsString(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
            } else {
                image.buffer = await mediaDownloader.getAsBuffer(`images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)
            }

            let imageObj = Object.assign(new Image(), image)

            try {
                await this.imageService.put(imageObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.images.saved++
            this.logForkProgress(forkStatus, `Inserted image ${imageObj._id}`)

        }

        for (let animation of animations) {

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)

            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`)

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

            await this.itemService.put(itemObj) 

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

        this.logForkProgress(forkStatus, `
        ******************************\n
        ******************************\n
        ******************************\n
                Import complete\n
        ******************************\n
        ******************************\n
        ******************************
        `)

        return channelId
    }

    private async _importExisting(authors:Author[], channels:Channel[], images:Image[], items:Item[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, cid?:string) {

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


        //Loop through the contents and insert each one like it's an unseen row
        for (let author of authors) {

            delete author._rev 
            delete author["_rev_tree"]

            //Author might already exist. Get it so we can update.
            let existingAuthor

            try {
                existingAuthor = await this.authorService.get(author._id)
            } catch(ex) {}

            try {
                await this.authorService.put(Object.assign(existingAuthor, author))
            } catch (ex) {} //ignore duplicates            

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${author._id}`)
        }

        for (let channel of channels) {
            
            //Remove any existing rev info
            delete channel._rev
            delete channel["_rev_tree"]

            //Check if it exists
            let channelObj = await this.channelService.getLatestRevision(channel._id)
            channelObj["_deleted"] = false

            await this.channelService.put(Object.assign(channelObj, channel))  

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

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
                console.log(image.svg, expectedCid)
                throw new Error(`Incorrect cid when importing image. Expected: ${image.cid}, Result: ${expectedCid.toString()}`)
            }


            try {
                await this.imageService.put(imageObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.images.saved++
            this.logForkProgress(forkStatus, `Inserted image ${imageObj._id}`)

        }

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
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`)

        }

        for (let theme of themes) {

            //Remove any existing rev info
            delete theme._rev
            delete theme["_rev_tree"]

            //Check if it exists
            let themeObj = await this.themeService.getLatestRevision(theme._id)
            themeObj["_deleted"] = false

            await this.themeService.put(Object.assign(themeObj, theme))           

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
            
            await this.itemService.put(Object.assign(itemObj, item))  

            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

        }

        for (let staticPage of staticPages) {

            //Remove any existing rev info
            delete staticPage._rev
            delete staticPage["_rev_tree"]

            //Check if it exists
            let staticPageObj = await this.staticPageService.getLatestRevision(staticPage._id)
            staticPageObj["_deleted"] = false
            
            await this.staticPageService.put(Object.assign(staticPageObj, staticPage))          

            forkStatus.staticPages.saved++
            this.logForkProgress(forkStatus, `Inserted static page ${staticPageObj._id}`)
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

        return channels[0]._id
    }

    async _getTokenMetadata(contract, tokenId:number) : Promise<TokenMetadata> {

        let tokenURI = await contract.tokenURI(tokenId)

        return this._fetchURI(tokenURI)

    }

    async _fetchURI(uri) {

        if (uri?.startsWith("ipfs://")) {

            //Remove ipfs://
            uri = `/ipfs/${uri.substring(7,uri.length)}`

            //Get from IPFS
            const data = uint8ArrayConcat(await all(this.ipfsService.ipfs.files.read(uri)))

            //@ts-ignore
            return new TextDecoder().decode(data)

        } else {

            //Get from old interwebs
            let result = await axios.get(uri)
            return result.data
        }


    }

    async _readFile(filename:string) {
        let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(filename)) 
        return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

    }

    async _fetchFile(filename:string) {
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




interface TokenMetadata {
    name: string
    image: string
    external_url: string 
    attributes: [{
        trait_type: string
        value:string
    }]
}

export {
    ImportService
}