import { injectable } from "inversify";

import { AnimationRepository } from "../../repository/animation-repository";
import { AuthorRepository } from "../../repository/author-repository";
import { ChannelRepository } from "../../repository/channel-repository";
import { SettingsRepository } from "../../repository/settings-repository";
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
        private settingsRepository:SettingsRepository,
        private animationRepository:AnimationRepository,
        private themeRepository:ThemeRepository,
        private staticPageRepository:StaticPageRepository,
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
        await this.settingsRepository.load()
        await this.animationRepository.load()
        await this.themeRepository.load()
        await this.staticPageRepository.load()
        await this.tokenMetadataCacheRepository.load()

        

    }

}

export {
    SchemaService
}