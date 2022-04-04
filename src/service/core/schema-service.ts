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
        const items = await this.itemRepository.listByChannel(channelId, 100000, 0)
        // const images = await this.imageRepository.listByChannel(channelId, 100000, 0)
        const authorResults = await this.authorRepository.db.allDocs({include_docs: true, attachments: true})
        const authors = authorResults.rows.map(row => row.doc)

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
        if (authors?.length > 0) {

            for (let author of authors) {
                delete author._rev
                delete author.lastUpdated
            }

        }

        //Save pouch dbs
        return {
            channels: [channel],
            items: items,
            // images: images,
            authors: authors
        }
      
    }

    async import(cid:string) {

    }


}

export {
    SchemaService
}