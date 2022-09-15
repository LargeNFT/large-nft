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

        return this._importAsNew(authors, channels, images, items, animations, themes, staticPages, forkStatus, mediaDownloader, cid)
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

    async importFromReader(baseURI:string, title:string) : Promise<string> {

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
        let authors:Author[] = await this._fetchFile(`${baseURI}backup/authors.json`)
        let channels:Channel[] = await this._fetchFile(`${baseURI}backup/channels.json`)
        let images:Image[] = await this._fetchFile(`${baseURI}backup/images.json`)
        let items:Item[] = await this._fetchFile(`${baseURI}backup/items.json`)
        let animations:Animation[] = await this._fetchFile(`${baseURI}backup/animations.json`)
        let themes:Theme[] = await this._fetchFile(`${baseURI}backup/themes.json`)
        let staticPages:StaticPage[] = await this._fetchFile(`${baseURI}backup/static-pages.json`)

        let mediaDownloader = new URLDownloader(baseURI)

        //Set the new name
        channels[0].title = title

        return this._importAsNew(authors, channels, images, items, animations, themes, staticPages, forkStatus, mediaDownloader)

    }
    
    private async _importAsNew(authors:Author[], channels:Channel[], images:Image[], items:Item[], animations:Animation[], themes:Theme[], staticPages:StaticPage[], forkStatus:ForkStatus, mediaDownloader:MediaDownloader, cid?:string) {

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

            //Remove ID 
            delete author._rev
            delete author.lastUpdated
            delete author.dateCreated
            delete author["_rev_tree"]

            let authorObj = Object.assign(new Author(), author)

            try {
                await this.authorService.put(authorObj)
            } catch (ex) {} //ignore duplicates            

            forkStatus.authors.saved++
            this.logForkProgress(forkStatus, `Inserted author ${authorObj._id}`)
        }

        for (let channel of channels) {

            let oldId = channel._id

            delete channel._id
            delete channel._rev 
            delete channel["_rev_tree"]
            delete channel.contractAddress
            delete channel.localCid
            delete channel.localPubDate
            delete channel.pinJobId
            delete channel.pinJobStatus
            delete channel.publishedCid
            delete channel.pubDate
            delete channel.publishReaderRepoId
            delete channel.publishReaderRepoPath
            delete channel.publishReaderRepoStatus
            delete channel.lastUpdated
            delete channel.dateCreated

            //Get the new author ID
            channel.authorId = this.walletService.address?.toString()

            //Add it if doesn't exist 
            if (channel.authorId) {
                await this.authorService.insertIfNew(channel.authorId)
            }

        
            //Mark parent
            if (cid) {
                channel.forkedFromCid = cid
            } else {
                channel.forkedFromId = oldId
            }

            let channelObj = Object.assign(new Channel(), channel)

            try {
                await this.channelService.put(channelObj)
            } catch (ex) {} //ignore duplicates   

            idMap.set(oldId, channelObj._id)
            channelId = channelObj._id

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

        }

        for (let image of images) {

            delete image._rev
            delete image.dateCreated
            delete image["_rev_tree"]

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

            delete animation._rev
            delete animation.dateCreated
            delete animation["_rev_tree"]

            //Load content
            animation.content = await mediaDownloader.getAsString(`animations/${animation.cid}.html`)

            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`)

        }
        // console.log(items)
        for (let item of items) {
            
            delete item._id
            delete item._rev
            delete item.lastUpdated
            delete item.dateCreated
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

            let itemObj = Object.assign(new Item(), item)

            try {
                await this.itemService.put(itemObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

        }

        for (let theme of themes) {

            // delete theme._id
            // delete theme._rev
            // delete theme.lastUpdated
            // delete theme.dateCreated
            // delete theme["_rev_tree"]

            theme.channelId = idMap.get(theme.channelId) //look up the new channel ID


            let themeObj = Object.assign(new Theme(), theme)

            try {
                await this.themeService.put(themeObj)
            } catch (ex) {} //ignore duplicates            

            forkStatus.themes.saved++
            this.logForkProgress(forkStatus, `Inserted theme ${themeObj._id}`)
        }

        for (let staticPage of staticPages) {

            delete staticPage._id
            delete staticPage._rev
            delete staticPage.lastUpdated
            delete staticPage.dateCreated
            delete staticPage["_rev_tree"]

            staticPage.channelId = idMap.get(staticPage.channelId) //look up the new channel ID


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
        
        let response = await axios.get(`${this.basePath}backup/${path}`)
        return response.data?.toString()

    }

    async getAsBuffer(path:string): Promise<Uint8Array> {

        // console.log(`${this.basePath}backup/${path}`)

        let response = await axios.get(`${this.basePath}backup/${path}`, {
            responseType: "arraybuffer"
        })
        return response.data
    }

}

interface MediaDownloader {
    basePath:string
    getAsString(filename:string) : Promise<string>
    getAsBuffer(filename:string) : Promise<Uint8Array>
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