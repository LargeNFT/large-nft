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
import { QueryCacheRepository } from "../../repository/query-cache-repository";

@injectable()
class SchemaService {

    loadedChannelId:string

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
        private tokenMetadataCacheRepository:TokenMetadataCacheRepository,
        private queryCacheRepository:QueryCacheRepository
    ) {}

    async load() {

        console.log(`Loading databases`)

        //Open and cache databases
        await this.authorRepository.load()
        await this.channelRepository.load()
        await this.settingsRepository.load()
        await this.tokenMetadataCacheRepository.load()
        await this.queryCacheRepository.load()
        // await this.pinningApiRepository.load()
    }

    async loadChannel(channelId:string) {

        if (channelId == this.loadedChannelId) return

        await this.itemRepository.load(channelId)
        await this.animationRepository.load(channelId)
        await this.imageRepository.load(channelId)
        await this.themeRepository.load(channelId)
        await this.staticPageRepository.load(channelId)

        this.loadedChannelId = channelId

    }



}

export {
    SchemaService
}