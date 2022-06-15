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



@injectable()
class ImportService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private authorService: AuthorService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
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
        }

        this.logForkProgress(forkStatus, "Starting fork. Fetching data...")

        await this.ipfsService.ipfs.files.cp(`/ipfs/${cid}`, '/fork', { create: true, parents: true, flush: true })


        this.logForkProgress(forkStatus, "Fetching files...")

        let channelId 

        let idMap = new Map<string, string>()

        //Load the directory from IPFS
        let authors:Author[] = await this._readFile(`/fork/backup/authors.json`)
        let channels:Channel[] = await this._readFile(`/fork/backup/channels.json`)
        let images:Image[] = await this._readFile(`/fork/backup/images.json`)
        let items:Item[] = await this._readFile(`/fork/backup/items.json`)
        let animations:Animation[] = await this._readFile(`/fork/backup/animations.json`)

        if (!authors || !channels || !images || !items) {
            throw new Error("Invalid collection hash")
        }

        forkStatus.authors.total = authors.length
        forkStatus.channels.total = channels.length
        forkStatus.images.total = images.length
        forkStatus.items.total = items.length
        forkStatus.animations.total = animations.length

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
            channel.authorId = this.walletService.address.toString()

            //Add it if doesn't exist 
            await this.authorService.insertIfNew(channel.authorId)

        
            //Mark parent
            channel.forkedFromCid = cid

            let channelObj = Object.assign(new Channel(), channel)

            try {
                await this.channelService.put(channelObj)
            } catch (ex) {} //ignore duplicates   

            idMap.set(oldId, channelObj._id)
            channelId = channelObj._id

            forkStatus.channels.saved++
            this.logForkProgress(forkStatus, `Inserted channel ${channelObj._id}`)

            console.log(channel)


        }

        for (let image of images) {

            delete image._rev
            delete image.dateCreated
            delete image["_rev_tree"]

            let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`/fork/images/${image.cid}.${image.generated ? 'svg' : 'jpg' }`)) 

            //Load content
            if (image.generated) {
                image.svg = new TextDecoder("utf-8").decode(bufferedContents)
            } else {
                image.buffer = bufferedContents
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
            let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`/fork/animations/${animation.cid}.html`)) 
            animation.content = new TextDecoder("utf-8").decode(bufferedContents)

            let animationObj = Object.assign(new Animation(), animation)

            try {
                await this.animationService.put(animationObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.animations.saved++
            this.logForkProgress(forkStatus, `Inserted animation ${animationObj._id}`)

        }


        for (let item of items) {
            delete item._id
            delete item._rev
            delete item.lastUpdated
            delete item.dateCreated
            delete item["_rev_tree"]

            item.channelId = idMap.get(item.channelId) //look up the new channel ID

            let itemObj = Object.assign(new Item(), item)

            try {
                await this.itemService.put(itemObj)
            } catch (ex) {} //ignore duplicates   

            forkStatus.items.saved++
            this.logForkProgress(forkStatus, `Inserted item ${itemObj._id}`)

        }


        console.log(`Import complete`)


        return channelId
    }

    async _readFile(filename:string) {
        let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(filename)) 
        return JSON.parse(new TextDecoder("utf-8").decode(bufferedContents))

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

export {
    ImportService
}