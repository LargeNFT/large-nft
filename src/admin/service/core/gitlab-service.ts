import { default as axios } from 'axios'

import { injectable } from "inversify"

import { Channel } from "../../dto/channel.js"
import { ForkInfo, GitProviderService } from './git-provider-service.js'

import { SettingsService } from './settings-service.js'

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


        let path = `${channel.title}`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

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

        let path = `${channel.title}`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

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

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["gitlab"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let jobs = await this.getJobForCommit(channel, gitProvider)

        if (jobs?.length > 0 && jobs[0].status == "success") {
            return "finished"
        }

    }

    async getJobForCommit(channel:Channel, gitProvider) : Promise<any[]> {

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/jobs`

        const res = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return res.data?.filter(job => job.commit?.id == channel.publishReaderIPFSStatus.headSha)

    }

    async getIPFSActionResult(channel: Channel): Promise<any> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["gitlab"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        try {

            let jobs = await this.getJobForCommit(channel, gitProvider)

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/jobs/${jobs[0].id}/artifacts/ipfs/ipfs.json`

            const res = await axios.get(url, {
                headers: {
                    "Authorization": `Bearer ${gitProvider.personalAccessToken}`
                }
            })

            let result = res.data

            result.archive = `https://gitlab.com/${gitProvider.username}/${channel.publishReaderRepoPath}/-/jobs/${jobs[0].id}/artifacts/file/ipfs/${result.cid}.car`

            return result

        } catch(ex) {
            console.log(ex)
        }



    }

    async getProductionURIInfo(channel: Channel): Promise<any> {
        
        function getGitHubUsername(url) {

            const path = url.replace("https://gitlab.com/", "")
          
            // Split the remaining path into parts
            const parts = path.split("/")
          
            // Extract the username and repository name
            const username = parts[0]
            
            return username

        }


        return {
            hostname: `https://${getGitHubUsername(channel.httpUrlToRepo)}.gitlab.io`,
            baseURI: `/${this.getBranchName(channel)}/`
        }

    }

    async commit(channel:Channel, actions:any[], gitProvider) : Promise<string> {

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

        let latestCommit = await this.getMostRecentCommit(channel, gitProvider)
        
        this.logPublishProgress(`Commit successful: ${latestCommit}`)


        return latestCommit

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

            this.logPublishProgress(`Deleting ${actions.length} files from repo...`)

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

            await axios.post(url, {
                branch: "master",
                commit_message: `Deleting .upload`,
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

    async getMostRecentCommit(channel, gitProvider) {


        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

        const res = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let commits = res.data

        if (commits?.length > 0) {
            return commits[0].id
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

    getBranchName(channel) {
        return channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()
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