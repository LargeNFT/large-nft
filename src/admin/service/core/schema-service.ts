import { injectable } from "inversify";

import { AnimationRepository } from "../../repository/animation-repository.js";
import { AuthorRepository } from "../../repository/author-repository.js";
import { ChannelRepository } from "../../repository/channel-repository.js";
import { SettingsRepository } from "../../repository/settings-repository.js";
import { ImageRepository } from "../../repository/image-repository.js";
import { ItemRepository } from "../../repository/item-repository.js";
import { StaticPageRepository } from "../../repository/static-page-repository.js";
import { ThemeRepository } from "../../repository/theme-repository.js";
import { TokenMetadataCacheRepository } from "../../repository/token-metadata-cache-repository.js";
import { QueryCacheRepository } from "../../repository/query-cache-repository.js";
import { AttributeCountRepository } from "../../repository/attribute-count-repository.js";
import { Channel } from "../../dto/channel.js";

@injectable()
class SchemaService {

    loadedChannelId:string

    constructor(
        private authorRepository:AuthorRepository,
        private channelRepository:ChannelRepository,
        private imageRepository:ImageRepository,
        private itemRepository:ItemRepository,
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
        await this.imageRepository.load()
        await this.settingsRepository.load()
        await this.tokenMetadataCacheRepository.load()
        await this.queryCacheRepository.load()
        // await this.pinningApiRepository.load()
    }

    async loadChannel(channelId:string) {

        console.time(`Loading channel: ${channelId}`)

        await this.itemRepository.load(channelId)
        await this.animationRepository.load(channelId)
        await this.imageRepository.load(channelId)
        await this.themeRepository.load(channelId)
        await this.staticPageRepository.load(channelId)
        await this.attributeCountRepository.load(channelId)

        this.loadedChannelId = channelId

        console.timeEnd(`Loading channel: ${channelId}`)

    }

    async loadChannelBackup(channelBackup:ChannelBackup) {

        console.time(`Loading channel from backup`)


        await this.loadChannel(channelBackup.channel._id)



        console.log(`Loading:
            Items: ${channelBackup.items ? channelBackup.items.length : 0}
            Animations: ${channelBackup.animations ? channelBackup.animations.length : 0}
            Images: ${channelBackup.images ? channelBackup.images.length : 0}
            Themes: ${channelBackup.themes ? channelBackup.themes.length : 0}
            Static Pages: ${channelBackup.staticPages ? channelBackup.staticPages.length : 0}
            Attribute Counts: ${channelBackup.attributeCounts ? channelBackup.attributeCounts.length : 0}
        `)

        const prepareRows = (rows) => {

            rows.map(row => {
                delete row._rev
                delete row['_rev_tree'] 
            })

        }


        prepareRows(channelBackup.items)
        prepareRows(channelBackup.animations)
        prepareRows(channelBackup.images)
        prepareRows(channelBackup.themes)
        prepareRows(channelBackup.staticPages)
        prepareRows(channelBackup.attributeCounts)


        await this.itemRepository.db.bulkDocs(channelBackup.items)
        await this.animationRepository.db.bulkDocs(channelBackup.animations)
        await this.imageRepository.db.bulkDocs(channelBackup.images)
        await this.themeRepository.db.bulkDocs(channelBackup.themes)
        await this.staticPageRepository.db.bulkDocs(channelBackup.staticPages)
        await this.attributeCountRepository.db.bulkDocs(channelBackup.attributeCounts)
        
        await this.channelRepository.db.bulkDocs([channelBackup.channel])

        // console.log(await this.itemRepository.db.info().then(info => info.doc_count))
        // console.log(await this.animationRepository.db.info().then(info => info.doc_count))
        // console.log(await this.imageRepository.db.info().then(info => info.doc_count))
        // console.log(await this.themeRepository.db.info().then(info => info.doc_count))
        // console.log(await this.staticPageRepository.db.info().then(info => info.doc_count))
        // console.log(await this.attributeCountRepository.db.info().then(info => info.doc_count))

        console.timeEnd(`Loading channel from backup`)


    }


    async backupChannel() : Promise<ChannelBackup> {

        let channel = await this.channelRepository.get(this.loadedChannelId)

        let itemDocs = await this.itemRepository.db.allDocs({ include_docs: true })
        let animationsDocs = await this.animationRepository.db.allDocs({ include_docs: true })
        let imagesDocs = await this.imageRepository.db.allDocs({ include_docs: true })
        let themesDocs = await this.themeRepository.db.allDocs({ include_docs: true })
        let staticPagesDocs = await this.staticPageRepository.db.allDocs({ include_docs: true })
        let attributeCountsDocs = await this.attributeCountRepository.db.allDocs({ include_docs: true })

        return {
            channel: channel,
            items: itemDocs.rows.map(r => r.doc),
            animations: animationsDocs.rows.map(r => r.doc),
            images: imagesDocs.rows.map(r => r.doc),
            themes: themesDocs.rows.map(r => r.doc),
            staticPages: staticPagesDocs.rows.map(r => r.doc),
            attributeCounts: attributeCountsDocs.rows.map(r => r.doc)
        }

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

interface ChannelBackup {
    channel:Channel,
    items: any,
    animations: any,
    images: any,
    themes: any,
    staticPages: any,
    attributeCounts: any
}


export {
    SchemaService, ChannelBackup
}