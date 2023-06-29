import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import { AuthorService } from "../author-service.js";
import { SettingsService } from "./settings-service.js";

//@ts-ignore
import { GitlabService } from "./gitlab-service.js";
import { ChannelService } from "../channel-service.js";
import { ForkInfo, GitProviderService } from "./git-provider-service.js";
import { GithubService } from "./github-service.js";
import { SchemaService } from "./schema-service.js";

//TODO: Refactor this so we're not specifically switching between github and gitlab 
//Inject the proper service and then call the method on it. This will make it easier to add more 
//providers later.

@injectable()
class GitService {

    fs

    repoURI:string
    defaultBranch:string

    constructor(
        private settingsService:SettingsService,
        private channelService:ChannelService,
        private gitlabService:GitlabService,
        private githubService:GithubService,
        private schemaService:SchemaService

    ) {}

    async deployReader(channel:Channel) {

        //Delete all existing files from the repo
        this.logPublishProgress(`Deploying reader...`)

        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }


        let gitActions:any[] = []

        this.logPublishProgress(`Creating channel backup...`)
        let backup = await this.schemaService.backupChannel()


        gitActions.push({
            action: "create",
            file_path: `/.upload/channel.json`,
            content: Buffer.from(JSON.stringify(backup.channel))
        })

        gitActions.push({
            action: "create",
            file_path: `/.upload/items.json`,
            content: Buffer.from(JSON.stringify(backup.items))
        })

        gitActions.push({
            action: "create",
            file_path: `/.upload/authors.json`,
            content: Buffer.from(JSON.stringify(backup.authors))
        })

        gitActions.push({
            action: "create",
            file_path: `/.upload/themes.json`,
            content: Buffer.from(JSON.stringify(backup.themes))
        })

        gitActions.push({
            action: "create",
            file_path: `/.upload/staticPages.json`,
            content: Buffer.from(JSON.stringify(backup.staticPages))
        })

        gitActions.push({
            action: "create",
            file_path: `/.upload/attributeCounts.json`,
            content: Buffer.from(JSON.stringify(backup.attributeCounts))
        })


        this.logPublishProgress(`Packaging ${backup.images?.length} images...`)

        let i=0
        for (let image of backup.images) {
            gitActions.push({
                action: "create",
                file_path: `/.upload/images/${i}.json`,
                content: Buffer.from(JSON.stringify(image))
            })
            i++
        }


        this.logPublishProgress(`Packaging ${backup.animations?.length} animations...`)

        i=0
        for (let animation of backup.animations) {
            gitActions.push({
                action: "create",
                file_path: `/.upload/animations/${i}.json`,
                content: Buffer.from(JSON.stringify(animation))
            })
            i++
        }


        switch(gitProvider.name) {

            case "gitlab":
                await this.gitlabService.createVariables(channel)
                await this.gitlabService.deleteReaderBackup(channel, gitProvider)
                return this.gitlabService.commit(channel, gitActions, gitProvider)
                
            case "github":
                await this.githubService.createVariables(channel)
                await this.githubService.deleteReaderBackup(channel, gitProvider)
                return this.githubService.commit(channel, gitActions, gitProvider)
        }


        //Commit 
        this.logPublishProgress(`Export to git complete`)

    }

    async deployReaderContract(channel:Channel, gitActions:any[]) {

        //Delete all existing files from the repo
        // this.logPublishProgress(`Deploying reader contract...`)


        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }



        switch(gitProvider.name) {
            case "gitlab":

                await this.gitlabService.deleteContractBackup(channel, gitProvider)
                return this.gitlabService.commit(channel, gitActions, gitProvider)

            case "github":

                // await this.githubService.deleteContractBackup(channel, gitProvider)
                return this.githubService.commit(channel, gitActions, gitProvider)

        }


        //Commit 
        this.logPublishProgress(`Export to git complete`)

    }

    async getExistingFork(channel:Channel) {

        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getExistingFork(channel)
            case "github":
                return this.githubService.getExistingFork(channel)
        }

    }

    async createFork(channel: Channel): Promise<ForkInfo> {

        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.createFork(channel)
            case "github":
                return this.githubService.createFork(channel)
        }

    }

    async createVariables(channel: Channel): Promise<any> {

        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.createVariables(channel)
            case "github":
                return this.githubService.createVariables(channel)
        }

    }


    async getForkRepoStatus(channel: Channel): Promise<string> {

        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getForkRepoStatus(channel)
            case "github":
                return this.githubService.getForkRepoStatus(channel)
        }

    }

    async getIPFSActionStatus(channel: Channel) : Promise<string> {
        
        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getIPFSActionStatus(channel)
            case "github":
                return this.githubService.getIPFSActionStatus(channel)
        }

    }

    async getIPFSActionResult(channel: Channel) : Promise<any> {
        
        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        switch(gitProvider.name) {
            case "gitlab":
                return this.gitlabService.getIPFSActionResult(channel)
            case "github":
                return this.githubService.getIPFSActionResult(channel)
        }

    }

    // async getProductionURIInfo(channel: Channel) : Promise<any> {
        
    //     let settings = await this.settingsService.get()

    //     let gitProvider

    //     //If it's "default" or blank then look at the global default
    //     if (!channel.gitProvider || channel.gitProvider == "default") {

    //         if (settings.defaultGitProvider) {
    //             gitProvider = settings.defaultGitProvider
    //         } else {
    //             gitProvider = "github"
    //         }
            
    //     } else {
    //         gitProvider = channel.gitProvider
    //     }


    //     switch(gitProvider) {
    //         case "gitlab":
    //             return this.gitlabService.getProductionURIInfo(channel)
    //         case "github":
    //             return this.githubService.getProductionURIInfo(channel)
    //     }

    // }

    private logPublishProgress(message:string) {
    
        console.log(message)
    
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
          // browser
          const imageSelectedEvent = new CustomEvent('publish-progress', {
            detail: { message: message }
          })
      
          document.dispatchEvent(imageSelectedEvent)
    
        }
    
    }

    private chunkArrayByBytes(items, chunkSizeBytes) {

        let chunks = []


        //First create a map with the size of each item
        let itemSizes = {}
        items.forEach(item => {

            itemSizes[item._id] = Buffer.byteLength(JSON.stringify(item), 'utf8')

            console.log(item)

            if (itemSizes[item._id] > chunkSizeBytes) {
                throw new Error(`Image larger than 15MB found. Upload can not proceed.`)
            }
        })


        let currentChunk = []
        let currentChunkSize = 0

        for (let item of items) {

            //If this one would put us over the limit, create a new chunk
            if (currentChunkSize + itemSizes[item._id] >= chunkSizeBytes) {
                chunks.push(currentChunk) 
                currentChunk = []
                currentChunkSize = 0
            }

            currentChunk.push(item)
            currentChunkSize += itemSizes[item._id]

        }

        //If there's anything in the last chunk then add it
        if (currentChunk.length > 0) {
            chunks.push(currentChunk) 
        }

        return chunks

    }
      

}

export {
    GitService
}

