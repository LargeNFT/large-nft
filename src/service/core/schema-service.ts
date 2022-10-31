import { injectable } from "inversify";
import { IpfsHostRepository } from "../../repository/ipfs-host-repository";

import { AnimationRepository } from "../../repository/animation-repository";
import { AuthorRepository } from "../../repository/author-repository";
import { ChannelRepository } from "../../repository/channel-repository";
import { GitlabRepository } from "../../repository/gitlab-repository";
import { ImageRepository } from "../../repository/image-repository";
import { ItemRepository } from "../../repository/item-repository";
import { PinningApiRepository } from "../../repository/pinning-api-repository";
import { StaticPageRepository } from "../../repository/static-page-repository";
import { ThemeRepository } from "../../repository/theme-repository";
import { TokenMetadataCacheRepository } from "../../repository/token-metadata-cache-repository";

@injectable()
class SchemaService {

    constructor(
        private authorRepository:AuthorRepository,
        private channelRepository:ChannelRepository,
        private imageRepository:ImageRepository,
        private itemRepository:ItemRepository,
        private pinningApiRepository:PinningApiRepository,
        private gitlabRepository:GitlabRepository,
        private animationRepository:AnimationRepository,
        private themeRepository:ThemeRepository,
        private staticPageRepository:StaticPageRepository,
        private ipfsHostRepository:IpfsHostRepository,
        private tokenMetadataCacheRepository:TokenMetadataCacheRepository
    ) {}

    async load() {

        console.log(`Loading databases`)

        //Open and cache databases
        await this.authorRepository.load()
        await this.channelRepository.load()
        await this.imageRepository.load()
        await this.itemRepository.load()
        await this.pinningApiRepository.load()
        await this.gitlabRepository.load()
        await this.animationRepository.load()
        await this.themeRepository.load()
        await this.staticPageRepository.load()
        await this.ipfsHostRepository.load()
        await this.tokenMetadataCacheRepository.load()

    }

}

export {
    SchemaService
}