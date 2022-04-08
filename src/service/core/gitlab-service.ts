import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { ValidationException } from "../../util/validation-exception";
import axios from 'axios'
import { GitlabRepository } from "../../repository/gitlab-repository";
import { Gitlab } from "../../dto/gitlab";
import { Channel } from "../../dto/channel";

@injectable()
class GitlabService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    constructor(
        private gitlabRepository:GitlabRepository
    ) {}

    async get(): Promise<Gitlab> {
        return this.gitlabRepository.get()
    }

    async put(gitlab: Gitlab) {

        if (!gitlab._id) {
            gitlab._id = "single"
            gitlab.dateCreated = new Date().toJSON()
        } else {
            gitlab.lastUpdated = new Date().toJSON()
        }

        //Validate
        let errors: ValidationError[] = await validate(gitlab, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        await this.gitlabRepository.put(gitlab)    
    }

    async createReaderFork(channel:Channel) {
        
        console.log(`Creating reader fork...`)

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/fork`


        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        let response = await axios.post(url, {
            name: `${channel.title} - Large Reader`,
            path: path
        } , {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path
        }

    }

    async getForkRepoStatus(channel:Channel) {

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}`

        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        return response.data.import_status


    }

}

export {
    GitlabService
}