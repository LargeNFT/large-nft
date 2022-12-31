import axios from "axios";
import { inject, injectable } from "inversify";

import { Channel } from "../../dto/channel.js";
import { ExistingForkInfo, ForkInfo, GitProviderService } from './git-provider-service.js';

import { SettingsService } from './settings-service.js';


@injectable()
class GithubService implements GitProviderService {

    static BASE_URL = 'https://api.github.com'
    static READER_REPO_OWNER = "LargeNFT"
    static READER_REPO = "large-reader"

    
    constructor(
        private settingsService:SettingsService,
    ) {}

    async createFork(channel:Channel) : Promise<ForkInfo> {

        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return {
                id: existingFork.id,
                path: existingFork.path
            }
        }


        console.log(`Creating reader fork...`)

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/forks`


        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        
        //Create a new one
        let response = await axios.post(url, {
            name: path,
            default_branch_only: true
        }, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path
        }
    }

    public async getExistingFork(channel:Channel) : Promise<ExistingForkInfo> {


        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        let url = `${GithubService.BASE_URL}/repos/${GithubService.READER_REPO_OWNER}/${GithubService.READER_REPO}/forks`
        
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${gitProvider.personalAccessToken}`
            }
        })

        let forks = response.data



        let name = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Search for one with the same path
        let results = forks.filter( f => f.name == name && f.owner.login == gitProvider.username)


        if (results?.length == 1) {
            return {
                id: results[0].id,
                httpUrlToRepo: `${results[0].html_url}.git`,
                path: results[0].name,
                defaultBranch: results[0].default_branch
            }
        }
    }

    async getForkRepoStatus(channel:Channel) : Promise<string> {

        let settings = await this.settingsService.get()

        let gitProvider = settings.gitProviders["github"]


        if (gitProvider.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return "finished"
        } 

        return "pending"

        // let url = `${GithubService.BASE_URL}/projects/${channel.publishReaderRepoId}`

        // let response = await axios.get(url, {
        //     headers: {
        //         "Authorization": `Bearer ${gitProvider.personalAccessToken}`,
        //         "X-GitHub-Api-Version": "2022-11-28"
        //     }
        // })

        // return response.data.import_status

    }

}




export {
    GithubService
}