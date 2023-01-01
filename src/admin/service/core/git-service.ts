import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import http from 'isomorphic-git/http/web/index.js'
import { AuthorService } from "../author-service.js";
import { SettingsService } from "./settings-service.js";
import axios from "axios";

import contractABI from '../../../../contracts.json'
import { GitlabService } from "./gitlab-service.js";
import { ChannelService } from "../channel-service.js";
import { ExistingForkInfo, ForkInfo, GitProviderService } from "./git-provider-service.js";
import { GithubService } from "./github-service.js";



@injectable()
class GitService implements GitProviderService {


    fs

    repoURI:string
    defaultBranch:string

    constructor(
        @inject('fs') private getFS:Function,
        @inject('git') public git,
        private settingsService:SettingsService,
        private channelService:ChannelService,
        private authorService:AuthorService,
        private gitlabService:GitlabService,
        private githubService:GithubService

    ) {}


    async initFS(channel:Channel) {

        this.fs = await this.getFS()


        let dir = this.getBaseDir(channel)

        let exists = await this._dirExists(dir)
        // let gitExists = await this._dirExists(`${dir}/.git`)


        //Create directory structure
        if (!exists) {
            await this._createDirectoryStructure(dir)
        }



    }

    async init(channel:Channel) {

        this.logPublishReaderProgress(`Initializing git for channel ${channel._id}`)

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, await this.settingsService.get())


        if (!this.fs) await this.initFS(channel)



        //Init FS
        let fs = this.fs


        //Get fork URL
        let existingForkResult:ExistingForkInfo = await this.getExistingFork(channel)



        //Check if we already have the repo cloned
        let dir = this.getBaseDir(channel)

        let exists = await this._dirExists(dir)
        // let gitExists = await this._dirExists(`${dir}/.git`)

        // console.log(dir, gitExists)

        //Create directory structure
        if (!exists) {
            await this._createDirectoryStructure(dir)
        }


        let currentBranch

        try {
            currentBranch = await this.git.currentBranch({
                fs,
                dir,
                fullname: false
            })
        } catch(ex) {}


        let settings = await this.settingsService.get()

        if (!currentBranch) {

            this.logPublishReaderProgress(`Git clone: ${existingForkResult.httpUrlToRepo} to ${dir}`)

            this.logPublishReaderProgress(
                await this.git.clone({
                    fs,
                    http,
                    dir,
                    corsProxy: settings.gitCorsProxy,
                    url: existingForkResult.httpUrlToRepo,
                    ref: existingForkResult.defaultBranch,
                    singleBranch: true
                })
            )
    

            this.logPublishReaderProgress(
                await this.git.setConfig({
                    fs,
                    dir,
                    path: 'user.name',
                    value: gitProvider.username
                })
            )



        } else {

            this.logPublishReaderProgress(
                await this.git.pull({
                    fs,
                    http,
                    dir,
                    ref: existingForkResult.defaultBranch,
                    singleBranch: true,
                    corsProxy: settings.gitCorsProxy
                })
            )
        }


    }

    public getBaseDir(channel:Channel) {
        return `/repos-${channel._id}`
    }

    public async writeFile(filepath:string, content) {

        console.log(`Saving file to git repo: ${filepath}`)

        // let fs = this.fs
        // let dir = filepath.substring(0, filepath.lastIndexOf("/"))
        // let gitdir = filepath.substring(0, filepath.indexOf("/", 1) + 1) + ".git"

        // let filename = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length )

        await this.fs.promises.writeFile(filepath, content)

        // let status = await this.git.status({ fs, dir, gitdir, filepath: filename })    

        // console.log(status)

        // if (status != "unmodified") {
            // await this.git.add({ fs, dir, gitdir, filepath: filename })
        // }

    }

    public async removeFile(filepath:string) {

        try {
            console.log(`Removing file from git repo: ${filepath}`)

            let fs = this.fs
            let dir = filepath.substring(0, filepath.lastIndexOf("/"))
            let gitdir = filepath.substring(0, filepath.indexOf("/", 1) + 1) + ".git"
    
            let filename = filepath.substring(filepath.lastIndexOf("/") + 1, filepath.length )
    
            await this.fs.promises.unlink(filepath)
    
            await this.git.remove({ fs, dir, gitdir, filepath: filename })
        } catch (ex) {}

    }

    public async gitAddAll(channel:Channel) {

        this.logPublishReaderProgress("Git add...")
        
        let fs = this.fs
        let dir = this.getBaseDir(channel)

        return this.git.add({
            fs,
            dir,
            filepath: '.'
        })
    
    }

    public async gitCommit(channel:Channel) {

        let fs = this.fs
        let dir = this.getBaseDir(channel)

        this.logPublishReaderProgress("Git commit")

        return this.git.commit({
            fs,
            dir,
            message: `Channel "${channel.title}" published`
        })

    }

    public async gitPush(channel:Channel, username:string, password:string) {

        let settings = await this.settingsService.get()


        this.logPublishReaderProgress("Git push...")

        let fs = this.fs
        let dir = this.getBaseDir(channel)

        return this.git.push({
            fs,
            http,
            dir: dir,
            remote: 'origin',
            ref: this.defaultBranch,
            corsProxy: settings.gitCorsProxy,
            onAuth: () =>  {

                return {
                    username: username,
                    password: password
                }

            },
          })

    }

    private async _dirExists(dir) {

        let exists = false

        //Make sure directory exists
        try {
            let result = await this.fs.promises.readdir(dir)
            // console.log(result)
            exists = true
        } catch (ex) {
            // console.log(ex)
        }

        return exists
    }

    private async _createDirectoryStructure(dir:string) {

        //Create directory structure
        this.fs.promises.mkdir(`${dir}`)
        this.fs.promises.mkdir(`${dir}/backup`)

        this.fs.promises.mkdir(`${dir}/backup/contract`)
        this.fs.promises.mkdir(`${dir}/backup/export`)

        this.fs.promises.mkdir(`${dir}/backup/export/backup`)
        this.fs.promises.mkdir(`${dir}/backup/export/images`)
        this.fs.promises.mkdir(`${dir}/backup/export/metadata`)
        this.fs.promises.mkdir(`${dir}/backup/export/animations`)

    }

    public async clearGitRepos() {

        //Init FS
        this.fs = await this.getFS()

        //Reinit and wipe
        await this.fs.init("large-fs", { wipe: true})

    }

    private logPublishReaderProgress(message:string) {
    
        console.log(message)
    
        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
          // browser
          const imageSelectedEvent = new CustomEvent('publish-reader-progress', {
            detail: { message: message }
          })
      
          document.dispatchEvent(imageSelectedEvent)
    
        }
    
    }

    async deployReaderGit(channel:Channel, contractMetadata:any) {

        let gitProvider = await this.channelService.getGitProviderCredentials(channel, await this.settingsService.get())



        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error(`${gitProvider.name} personal access token not set`)
        }

        //Init or load repo
        await this.init(channel)
        
        this.logPublishReaderProgress(`Copying files from IPFS to git repo...`)

        let dir = this.getBaseDir(channel)

        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            //Write contract info
            await this.writeFile(`${dir}/backup/contract/contract.json`, Buffer.from(JSON.stringify({
                contractAddress: channel.contractAddress,
                ipfsCid: channel.localCid
            })))

            
            //Also the ABI
            await this.writeFile(`${dir}/backup/contract/contract-abi.json`, Buffer.from(JSON.stringify(contractABI)))
            await this.writeFile(`${dir}/backup/export/contractMetadata.json`, contractMetadata)

        } else {

            await this.writeFile(`${dir}/backup/contract/contract.json`, Buffer.from(JSON.stringify({})))
            await this.writeFile(`${dir}/backup/contract/contract-abi.json`, Buffer.from(JSON.stringify({})))
            await this.writeFile(`${dir}/backup/export/contractMetadata.json`, Buffer.from(JSON.stringify({})) )

        }

        await this.gitAddAll(channel)
        await this.gitCommit(channel)

        await this.gitPush(channel, gitProvider.username, gitProvider.personalAccessToken)

        this.logPublishReaderProgress("Publish complete")

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



}

export {
    GitService
}