import { inject, injectable } from "inversify";
import { Channel } from "../../dto/channel.js";
import http from 'isomorphic-git/http/web/index.js'
import { AuthorService } from "../author-service.js";
import { SettingsService } from "./settings-service.js";
import axios from "axios";
import { GitlabService } from "./gitlab-service.js";

@injectable()
class GitService {

    fs

    repoURI:string
    defaultBranch:string

    constructor(
        @inject('fs') private getFS:Function,
        @inject('git') private git,
        private settingsService:SettingsService,
        private authorService:AuthorService
    ) {}


    async init(channel:Channel) {

        //Init FS
        this.fs = await this.getFS()
        let fs = this.fs

        //Make sure we have an author
        let author
        let gitUsername
        try {
            author = await this.authorService.get(channel.authorId)
            gitUsername = author.name ? author.name : author._id
        } catch(ex) {}
        

        if (!gitUsername) gitUsername = "john"


        //Get fork URL
        let existingForkResult = await this.getExistingFork(channel)

        let repoURI = existingForkResult.http_url_to_repo
        let defaultBranch = existingForkResult.default_branch 


        //Check if we already have the repo cloned
        let dir = this.getBaseDir(channel)

        let exists = await this._dirExists(dir)
        let gitExists = await this._dirExists(`${dir}/.git`)

        console.log(exists, gitExists, gitUsername, this.git)


        //Create directory structure
        if (!exists) {
            await this._createDirectoryStructure(dir)
        }

        if (!gitExists) {

            this.logPublishReaderProgress(`Git clone: ${repoURI} to ${dir}`)

            this.logPublishReaderProgress(
                await this.git.clone({
                    fs,
                    http,
                    dir,
                    url: repoURI,
                    ref: defaultBranch,
                    singleBranch: true
                })
            )
    

            this.logPublishReaderProgress(
                await this.git.setConfig({
                    fs,
                    dir,
                    path: 'user.name',
                    value: gitUsername
                })
            )



        } else {

            this.logPublishReaderProgress(
                await this.git.pull({
                    fs,
                    http,
                    dir,
                    ref: defaultBranch,
                    singleBranch: true
                })
            )
        }


    }

    public getBaseDir(channel:Channel) {
        return `/repos-${channel._id}`
    }

    public async writeFile(filepath, content) {

        console.log(`Saving file to git repo: ${filepath}`)

        await this.fs.promises.writeFile(
            `${filepath}`, 
            content
        )

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

        this.logPublishReaderProgress("Git push...")

        let fs = this.fs
        let dir = this.getBaseDir(channel)

        return this.git.push({
            fs,
            http,
            dir: dir,
            remote: 'origin',
            ref: this.defaultBranch,
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




    private async clearGitRepos() {

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


    private async getExistingFork(channel:Channel) {

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/forks`
        
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${settings.personalAccessToken}`
            }
        })

        // console.log(response)

        let forks = response.data

        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Search for one with the same path
        let results = forks.filter( f => f.path == path)

        if (results?.length == 1) return results[0]

    }


}

export {
    GitService
}