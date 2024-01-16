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
import { DatabaseService } from "./database-service.js";
import { OriginalMetadataRepository } from "../../repository/original-metadata-repository.js";
import { CarRepository } from "../../repository/car-repository.js";

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
        private attributeCountRepository:AttributeCountRepository,
        private originalMetadataRepository:OriginalMetadataRepository,
        private carRepository:CarRepository,
        private databaseService:DatabaseService
    ) {}

    async load() {

        console.log(`Loading databases`)

        //Open and cache databases
        await this.channelRepository.load()
        await this.settingsRepository.load()
        await this.tokenMetadataCacheRepository.load()
        await this.queryCacheRepository.load()

    }

    async loadChannel(channelId:string) {

        if (this.loadedChannelId == channelId) return

        console.time(`Loading channel: ${channelId}`)

        await this.authorRepository.load(channelId)
        await this.itemRepository.load(channelId)
        await this.animationRepository.load(channelId)
        await this.originalMetadataRepository.load(channelId)
        await this.imageRepository.load(channelId)
        await this.themeRepository.load(channelId)
        await this.staticPageRepository.load(channelId)
        await this.attributeCountRepository.load(channelId)
        await this.carRepository.load(channelId)

        this.loadedChannelId = channelId

        console.timeEnd(`Loading channel: ${channelId}`)

    }

    async loadEmptyChannel(channelId:string) {

        if (this.loadedChannelId == channelId) return

        console.time(`Loading empty channel: ${channelId}`)

        await this.authorRepository.loadEmpty(channelId)
        await this.itemRepository.loadEmpty(channelId)
        await this.animationRepository.loadEmpty(channelId)
        await this.originalMetadataRepository.loadEmpty(channelId)
        await this.imageRepository.loadEmpty(channelId)
        await this.themeRepository.loadEmpty(channelId)
        await this.staticPageRepository.loadEmpty(channelId)
        await this.attributeCountRepository.loadEmpty(channelId)
        await this.carRepository.loadEmpty(channelId)

        this.loadedChannelId = channelId

        console.timeEnd(`Loading empty channel: ${channelId}`)

    }



    async loadChannelBackup(channelBackup:ChannelBackup) {

        console.time(`Loading channel from backup`)


        await this.loadEmptyChannel(channelBackup.channel._id)

        console.log(`Loading:
            Items: ${channelBackup.items ? channelBackup.items.length : 0}
            Themes: ${channelBackup.themes ? channelBackup.themes.length : 0}
            Static Pages: ${channelBackup.staticPages ? channelBackup.staticPages.length : 0}
            Attribute Counts: ${channelBackup.attributeCounts ? channelBackup.attributeCounts.length : 0}
            Authors: ${channelBackup.authors ? channelBackup.authors.length : 0}
            Original Metadata: ${channelBackup.originalMetadata ? channelBackup.originalMetadata.length : 0}

        `)

        const prepareRows = (rows) => {

            rows.map(row => {
                delete row._rev
                delete row['_rev_tree'] 
            })

        }


        prepareRows(channelBackup.items)
        prepareRows(channelBackup.themes)
        prepareRows(channelBackup.staticPages)
        prepareRows(channelBackup.attributeCounts)
        prepareRows(channelBackup.authors)
        prepareRows(channelBackup.originalMetadata)


        await this.itemRepository.db.bulkDocs(channelBackup.items)
        await this.themeRepository.db.bulkDocs(channelBackup.themes)
        await this.staticPageRepository.db.bulkDocs(channelBackup.staticPages)
        await this.attributeCountRepository.db.bulkDocs(channelBackup.attributeCounts)
        await this.authorRepository.db.bulkDocs(channelBackup.authors)
        await this.channelRepository.db.bulkDocs([channelBackup.channel])
        await this.originalMetadataRepository.db.bulkDocs(channelBackup.originalMetadata)

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
        let authorDocs = await this.authorRepository.db.allDocs({ include_docs: true })
        let originalMetadataDocs = await this.originalMetadataRepository.db.allDocs({ include_docs: true })


        return {
            channel: channel,
            items: itemDocs.rows.map(r => r.doc),
            animations: animationsDocs.rows.map(r => r.doc),
            images: imagesDocs.rows.map(r => r.doc),
            themes: themesDocs.rows.map(r => r.doc),
            staticPages: staticPagesDocs.rows.map(r => r.doc),
            attributeCounts: attributeCountsDocs.rows.map(r => r.doc),
            authors: authorDocs.rows.map(r => r.doc),
            originalMetadata: originalMetadataDocs.rows.map(r => r.doc)
        }

    }


    async dropChannel(channelId:string) {

        console.log(`Dropping channel: ${channelId}`)

        //Delete all files and then compact()
        let clearDatabase = async (db) => {

            let updatedRows = []

            let result = await db.allDocs()

            for (let row of result.rows) {

                if (row.id.startsWith("_design") || row.id.startsWith("_local")) continue

                updatedRows.push({
                    _id: row.id,
                    _rev: row.value.rev,
                    _deleted: true
                })
            }

            const details = await db.info()

            //Remove
            await db.bulkDocs(updatedRows)

            //Compact
            await db.compact()

            //Clear cached copy
            delete this.databaseService.dbCache[details.db_name]

        }

        await clearDatabase(this.authorRepository.db)
        await clearDatabase(this.itemRepository.db)
        await clearDatabase(this.animationRepository.db)
        await clearDatabase(this.originalMetadataRepository.db)
        await clearDatabase(this.imageRepository.db)
        await clearDatabase(this.themeRepository.db)
        await clearDatabase(this.staticPageRepository.db)
        await clearDatabase(this.attributeCountRepository.db)
        await clearDatabase(this.carRepository.db)

    }



}

interface ChannelBackup {
    channel:Channel,
    items: any,
    originalMetadata: any,
    authors:any,
    animations?: any,
    images?: any,
    themes: any,
    staticPages: any,
    attributeCounts: any
}


export {
    SchemaService, ChannelBackup
}