import { default as axios } from 'axios'

import { inject, injectable } from "inversify";

import { Channel } from "../../dto/channel.js";

import { SettingsService } from './settings-service.js';


@injectable()
class GitlabService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    
    constructor(
        private settingsService:SettingsService,
    ) {}

    async createReaderFork(channel:Channel) {
        
        console.log(`Creating reader fork...`)

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/fork`


        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Look for an existing fork and just return it.
        let existingFork = await this.getExistingFork(channel)

        if (existingFork) {
            return {
                id: existingFork.id,
                path: existingFork.path
            }
        }
        
        //Create a new one
        let response = await axios.post(url, {
            name: path,
            path: path
        } , {
            headers: {
                "Authorization": `Bearer ${settings.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path
        }

    }

    public async getExistingFork(channel:Channel) {

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

    async getForkRepoStatus(channel:Channel) {

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}`

        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${settings.personalAccessToken}`
            }
        })

        return response.data.import_status

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













}




export {
    GitlabService
}