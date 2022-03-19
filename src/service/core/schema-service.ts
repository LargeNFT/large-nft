import { injectable } from "inversify";
import { AuthorRepository } from "../../repository/author-repository";
import { ChannelRepository } from "../../repository/channel-repository";
import { ImageRepository } from "../../repository/image-repository";
import { ItemRepository } from "../../repository/item-repository";

@injectable()
class SchemaService {

    constructor(
        private authorRepository:AuthorRepository,
        private channelRepository:ChannelRepository,
        private imageRepository:ImageRepository,
        private itemRepository:ItemRepository
    ) {}

    async loadWallet(walletAddress:string) {

        //Open and cache databases
        await this.authorRepository.load(walletAddress)
        await this.channelRepository.load(walletAddress)
        await this.imageRepository.load(walletAddress)
        await this.itemRepository.load(walletAddress)

    }

    async backup(channelId:string) {
        
        const channel = await this.channelRepository.get(channelId)
        const items = await this.itemRepository.listByChannel(channelId, 100000, 0)
        // const images = await this.imageRepository.listByChannel(channelId, 100000, 0)
        const author = await this.authorRepository.db.allDocs({include_docs: true, attachments: true})

        //Save pouch dbs
        return {
            channels: [channel],
            items: items,
            // images: images,
            authors: author
        }
      
    }


}

export {
    SchemaService
}