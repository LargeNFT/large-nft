import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import { AuthorService } from "../author-service.js";
import { SettingsService } from "./settings-service.js";

//@ts-ignore
import { GitlabService } from "./gitlab-service.js";
import { ChannelService } from "../channel-service.js";
import { ForkInfo, GitProviderService } from "./git-provider-service.js";
import { GithubService } from "./github-service.js";
import { ContractMetadata } from "../../dto/contract-metadata.js";



@injectable()
class GitService implements GitProviderService {


    fs

    repoURI:string
    defaultBranch:string

    constructor(
        // @inject('fs') private getFS:Function,
        // @inject('git') public git,
        private settingsService:SettingsService,
        private channelService:ChannelService,
        private authorService:AuthorService,
        private gitlabService:GitlabService,
        private githubService:GithubService

    ) {}

    async deployReader(channel:Channel, gitActions:any[]) {

        //Delete all existing files from the repo
        this.logPublishProgress(`Deploying reader...`)


        let settings = await this.settingsService.get()

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, settings)


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }


        switch(gitProvider.name) {

            case "gitlab":

                await this.gitlabService.deleteReaderBackup(channel, gitProvider)
                await this.gitlabService.commit(channel, gitActions, gitProvider)
                
                break

            case "github":

                await this.githubService.deleteReaderBackup(channel, gitProvider)

                // await new Promise(resolve => setTimeout(resolve, 10000))

                await this.githubService.commit(channel, gitActions, gitProvider)

                break
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
                await this.gitlabService.commit(channel, gitActions, gitProvider)

                break

            case "github":

                await this.githubService.deleteContractBackup(channel, gitProvider)
                await this.githubService.commit(channel, gitActions, gitProvider)

                break

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


}

export {
    GitService
}

