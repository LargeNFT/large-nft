import { default as axios } from 'axios'

import { inject, injectable } from "inversify";

import { Channel } from "../../dto/channel.js";
import { ForkInfo, GitProviderService } from './git-provider-service.js';

import { SettingsService } from './settings-service.js';

import parse from "parse-link-header"



@injectable()
class GitlabService implements GitProviderService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    
    constructor(
        private settingsService:SettingsService,
    ) {}


    async createFork(channel:Channel) : Promise<ForkInfo> {
        
        console.log(`Creating reader fork...`)

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["gitlab"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/fork`


        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return {
                id: existingFork.id,
                path: existingFork.path,
                branch: "master"
            }
        }
        
        //Create a new one
        let response = await axios.post(url, {
            name: path,
            path: path
        } , {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path,
            branch: "master"
        }

    }

    public async getExistingFork(channel:Channel) : Promise<ForkInfo> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["gitlab"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/forks`
        
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let forks = response.data

        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Search for one with the same path
        let results = forks.filter( f => f.path == path && f.owner.username == gitProvider.username)


        if (results?.length == 1) {
            return {
                id: results[0].id,
                httpUrlToRepo: results[0].http_url_to_repo,
                path: results[0].path,
                branch: results[0].default_branch
            }
        }

    }

    async getForkRepoStatus(channel:Channel) : Promise<string> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["gitlab"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}`

        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return response.data.import_status

    }

    async getIPFSActionStatus(channel: Channel): Promise<string> {
        throw new Error("Method not implemented.");
    }

    async getIPFSActionResult(channel: Channel): Promise<any> {
        throw new Error('Method not implemented.');
    }

    async commit(channel:Channel, actions:any[], gitProvider) {

        for (let action of actions) {
            action.encoding = "base64"
            action.content = action.content.toString('base64')
        }


        let chunks = this.chunkIt(actions, 500)

        for (let chunk of chunks) {

            this.logPublishProgress(`Commiting reader data for ${channel.title} to GitLab: ${chunk.length} actions`)

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`
    
            const res = await axios.post(url, {
                branch: "master",
                commit_message: `Commiting reader data for ${channel.title}`,
                actions: chunk,
            } , {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

        }



    }

    async deleteReaderBackup(channel:Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }
        

        this.logPublishProgress(`Deleting existing files from repo...`)


        let treeLink = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/tree?recursive=true&path=.upload&pagination=keyset`
        let linkHeaders
        let actions = []

        do {

            //Get list of current files in .upload folder
            let results = await axios.get(treeLink, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

            //Skip directories because gitlab chokes on them.
            let resultActions = results?.data?.reverse()?.filter(result => result.name.indexOf('.') > 0).map( result => {
                return {
                    action: 'delete',
                    file_path: result.path
                }
            })

            actions.push(...resultActions)

            linkHeaders = parse(results.headers["link"])

            treeLink = linkHeaders?.next?.url

        } while(treeLink)


        if (actions?.length > 0) {

            actions.push({
                action: "delete",
                file_path: "large-config.json"
            })


            this.logPublishProgress(`Deleting ${actions.length} files from repo...`)

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

            await axios.post(url, {
                branch: "master",
                commit_message: `Deleting existing reader for ${channel.title}`,
                actions: actions
            } , {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

        }

    }

    async deleteContractBackup(channel:Channel, gitProvider) {

        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        this.logPublishProgress(`Deleting existing contract files from repo...`)

        let actions = [{
            action: 'delete',
            file_path: "/backup/contract/contract.json"
        },{
            action: 'delete',
            file_path: "/backup/contract/contract-abi.json"
        }]


        if (actions?.length > 0) {

            this.logPublishProgress(`Deleting ${actions.length} files from repo...`)

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

            await axios.post(url, {
                branch: "master",
                commit_message: `Deleting existing contract files for ${channel.title}`,
                actions: actions
            } , {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

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

    chunkIt(gitActions: any[], perChunk: number) {

        let chunks = []
    
        //Break into rows
        for (let i = 0; i < gitActions.length; i += perChunk) {
            let chunk = gitActions.slice(i, i + perChunk)
            chunks.push(chunk)
        }
    
        return chunks
    }
    








}




export {
    GitlabService
}