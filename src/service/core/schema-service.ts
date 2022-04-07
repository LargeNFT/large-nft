import { injectable } from "inversify";
import { AuthorRepository } from "../../repository/author-repository";
import { ChannelRepository } from "../../repository/channel-repository";
import { ImageRepository } from "../../repository/image-repository";
import { ItemRepository } from "../../repository/item-repository";
import { PinningApiRepository } from "../../repository/pinning-api-repository";

@injectable()
class SchemaService {

    constructor(
        private authorRepository:AuthorRepository,
        private channelRepository:ChannelRepository,
        private imageRepository:ImageRepository,
        private itemRepository:ItemRepository,
        private pinningApiRepository:PinningApiRepository
    ) {}

    async loadWallet(walletAddress:string) {

        console.log(`Loading wallet: ${walletAddress}`)

        //Open and cache databases
        await this.authorRepository.load(walletAddress)
        await this.channelRepository.load(walletAddress)
        await this.imageRepository.load(walletAddress)
        await this.itemRepository.load(walletAddress)
        await this.pinningApiRepository.load(walletAddress)


    }

    async backup(channelId:string) {
        
        const channel = await this.channelRepository.get(channelId)
        const author = await this.authorRepository.get(channel.authorId)

        //Get the items and create an array to hold the paged chunks for the reader
        const items = await this.itemRepository.listByChannel(channelId, 100000, 0)
        const chunkedItems = []

        //Remove publishing related field from channel
        delete channel.pinJobId
        delete channel.pinJobStatus
        delete channel.publishedCid
        delete channel.pubDate
        delete channel.lastUpdated
        delete channel._rev

        //And items
        if (items?.length > 0) {
            for (let item of items) {
                delete item._rev
                delete item.lastUpdated
            }
        }

        //And authors
        if (author) {
            delete author._rev
            delete author.lastUpdated
        }

        //Split items into chunks
        const chunkSize = 20
        for (let i = 0; i < items.length; i += chunkSize) {
            chunkedItems.push(items.slice(i, i + chunkSize))
        }

        //Save pouch dbs
        return {
            initial: {
                channels: [channel],
                authors: [author],
                items: chunkedItems[0] //first page in initial load
            },

            itemChunks: chunkedItems.slice(1) //rest of items            
        }
      
    }



}

export {
    SchemaService
}