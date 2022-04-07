import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Item } from "../../dto/item";
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

    async backup(channel:Channel, items:Item[], author:Author) {
        
        const chunkedItems = []

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