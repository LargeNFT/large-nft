import { QueryCache } from "../../dto/query-cache.js";
import { injectable } from "inversify";
import moment from "moment";
import { Author } from "../../dto/author.js";
import { Channel } from "../../dto/channel.js";
import { Item } from "../../dto/item.js";

import { Image } from "../../dto/image.js";

import { ChannelViewModel } from "../../dto/viewmodel/channel-view-model.js";
import { ImageViewModel } from "../../dto/viewmodel/image-view-model.js";
import { AuthorService } from "../author-service.js";
import { ChannelService } from "../channel-service.js";
import { ImageService } from "../image-service.js";
import { ItemService } from "../item-service.js";
import { ItemWebService } from "./item-web-service.js";
import { QueryCacheService } from "../../service/core/query-cache-service.js";
import { SchemaService } from "../../service/core/schema-service.js";
import { GitService } from "../core/git-service.js";
import { SettingsService } from "../core/settings-service.js";

@injectable()
class ChannelWebService {

    constructor(
        private channelService: ChannelService,
        private imageService: ImageService,
        private authorService: AuthorService,
        private itemService:ItemService,
        private itemWebService:ItemWebService,
        private queryCacheService:QueryCacheService,
        private gitService:GitService,
        private schemaService:SchemaService,
        private settingsService:SettingsService
    ) { }

    async get(_id: string): Promise<ChannelViewModel> {
        return this.getViewModel(await this.channelService.get(_id))
    }

    async getViewModel(channel: Channel): Promise<ChannelViewModel> {

        let coverImage: ImageViewModel
        let coverBanner: ImageViewModel
        let authorPhoto: ImageViewModel

        let author: Author

        let editable = !channel.contractAddress

        //Load the right image db so we can get the cover and banner
        await this.imageService.load(channel._id)


        if (channel.coverImageId) {

            try {
                let cImage = await this.imageService.get(channel.coverImageId)

                coverImage = {
                    cid: cImage.cid,
                    url: await this.imageService.getUrl(cImage)
                }
    
            } catch (ex) {}

        }

        if (channel.coverBannerId) {

            try {
                let cBanner = await this.imageService.get(channel.coverBannerId)

                coverBanner = {
                    cid: cBanner.cid,
                    url: await this.imageService.getUrl(cBanner)
                }
            } catch(ex) {}

        }

        if (channel.authorId) {

            author = await this.authorService.get(channel.authorId)

            //Load cover photo if there is one.
            if (author.coverPhotoId) {

                try {
                    let aImage = await this.imageService.get(author.coverPhotoId)

                    authorPhoto = {
                        cid: aImage.cid,
                        url: await this.imageService.getUrl(aImage)
                    }
                } catch(ex) {}

            }

        }

        let itemCount = await this.channelService.countItemsByChannel(channel._id)

        let settings

        try {
            settings = await this.settingsService.get()
        } catch(ex) {}


        let gitProvider

        try {
            gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)
        } catch(ex) {}


        return {
            channel: channel,
            // themes: themes,
            // staticPages: staticPages,
            coverImage: coverImage,
            coverBanner: coverBanner,
            author: author,
            authorDisplayName: this.authorService.getDisplayName(author),
            authorPhoto: authorPhoto,
            itemCount: itemCount,
            editable: editable,
            dateCreated: moment(channel.dateCreated).format("MMM Do YYYY"),
            gitProvider: gitProvider
        }

    }

    async list(limit: number, skip: number): Promise<ChannelViewModel[]> {

        let result: ChannelViewModel[] = []

        let channels: Channel[] = await this.channelService.list(limit, skip)

        for (let channel of channels.filter(c => !c.forkType || c.importSuccess)) {
            result.push(await this.getViewModel(channel))
        }

        return result

    }

    async upgrade(channel:Channel) {

        //Loop through each item. 
        let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)


        for (let item of items) {

            //@ts-ignore
            //Look up the cover image
            let coverImage = await this.imageService.get(item.coverImageId)

            item.coverImageGenerated = coverImage.generated
        
            //Resave
            let updated = Object.assign(new Item(), item)
            await this.itemService.put(updated)

            console.log(updated)


        }

    }

    async regenerateItemMedia(channel:Channel) {

        //Loop through each item. 
        let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)


        for (let item of items) {

            //Save the cover image 
            await this.itemWebService.updateGeneratedCoverImage(item)

            //And the animation
            await this.itemWebService.saveAnimation(item)

            //Resave
            let updated = Object.assign(new Item(), item)
            await this.itemService.put(updated)

            // console.log(updated)

        }
    }

    async put(channel:Channel, coverImage?:Image, coverBanner?:Image) : Promise<void> {
        
        let response = await this.channelService.put(channel)

        channel._rev = response.rev

        //Load the right channel dbs
        await this.schemaService.loadChannel(channel._id)

        //Save cover image
        if (coverImage) {
            try {
                //Could be a duplicate. Which means it's fine.
                await this.imageService.put(Object.assign(new Image(), coverImage))
            } catch (ex) { }
        }



        //Save cover banner
        if (coverBanner) {
            try {
                //Could be a duplicate. Which means it's fine.
                await this.imageService.put(Object.assign(new Image(), coverBanner))
            } catch (ex) {  }
        }


        let queryCache:QueryCache
        try {
            queryCache = await this.queryCacheService.get(`token_id_stats_by_channel_${channel._id}`)
        } catch(ex) {}

        if (!queryCache) {
            queryCache = new QueryCache()
            queryCache._id = `token_id_stats_by_channel_${channel._id}`
            queryCache.result = {
                min: 0,
                max: 0,
                count: 0
            }
        }


        //Update cache
        await this.queryCacheService.put(queryCache)

    }



}

export {
    ChannelWebService
}