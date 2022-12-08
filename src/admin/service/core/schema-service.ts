import { injectable } from "inversify";

import { AnimationRepository } from "../../repository/animation-repository.js";
import { AuthorRepository } from "../../repository/author-repository.js";
import { ChannelRepository } from "../../repository/channel-repository.js";
import { SettingsRepository } from "../../repository/settings-repository.js";
import { ImageRepository } from "../../repository/image-repository.js";
import { ItemRepository } from "../../repository/item-repository.js";
import { PinningApiRepository } from "../../repository/pinning-api-repository.js";
import { StaticPageRepository } from "../../repository/static-page-repository.js";
import { ThemeRepository } from "../../repository/theme-repository.js";
import { TokenMetadataCacheRepository } from "../../repository/token-metadata-cache-repository.js";
import { QueryCacheRepository } from "../../repository/query-cache-repository.js";
import { AttributeCountRepository } from "../../repository/attribute-count-repository.js";

@injectable()
class SchemaService {

    // loadedChannelId:string

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
        private queryCacheRepository:QueryCacheRepository,
        private attributeCountRepository:AttributeCountRepository
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

        console.log(`Loading channel: ${channelId}`)

        await this.itemRepository.load(channelId)
        await this.animationRepository.load(channelId)
        await this.imageRepository.load(channelId)
        await this.themeRepository.load(channelId)
        await this.staticPageRepository.load(channelId)
        await this.attributeCountRepository.load(channelId)


    }

    async dropChannel(channelId:string) {

        console.log(`Dropping channel: ${channelId}`)

        await this.itemRepository.db.destroy()
        await this.animationRepository.db.destroy()
        await this.imageRepository.db.destroy()
        await this.themeRepository.db.destroy()
        await this.staticPageRepository.db.destroy()
        await this.attributeCountRepository.db.destroy()

    }



}

export {
    SchemaService
}