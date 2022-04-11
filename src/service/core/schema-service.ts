import { injectable } from "inversify";
import { Author } from "../../dto/author";
import { Channel } from "../../dto/channel";
import { Item } from "../../dto/item";
import { ItemViewModel } from "../../dto/viewmodel/item-view-model";
import { AuthorRepository } from "../../repository/author-repository";
import { ChannelRepository } from "../../repository/channel-repository";
import { GitlabRepository } from "../../repository/gitlab-repository";
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
        private pinningApiRepository:PinningApiRepository,
        private gitlabRepository:GitlabRepository
    ) {}

    async loadWallet(walletAddress:string) {

        console.log(`Loading wallet: ${walletAddress}`)

        //Open and cache databases
        await this.authorRepository.load(walletAddress)
        await this.channelRepository.load(walletAddress)
        await this.imageRepository.load(walletAddress)
        await this.itemRepository.load(walletAddress)
        await this.pinningApiRepository.load(walletAddress)
        await this.gitlabRepository.load(walletAddress)

    }

}

export {
    SchemaService
}