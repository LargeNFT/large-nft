import axios from 'axios'
const toBuffer = require('it-to-buffer')

import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { ValidationException } from "../../util/validation-exception";


import { GitlabRepository } from "../../repository/gitlab-repository";
import { Gitlab } from "../../dto/gitlab";
import { Channel } from "../../dto/channel";
import { IpfsService } from './ipfs-service';

@injectable()
class GitlabService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    constructor(
        private gitlabRepository:GitlabRepository,
        private ipfsService:IpfsService
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

    async deployReader(channel:Channel) {

        //Delete all existing files from the repo

        console.log(`Deploying reader..`)

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        await this.deleteReaderBackup(channel)
        

        let actions = []

        let directory = `/blogs/${channel._id}/backup`

        //Read initial.json
        let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/initial.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/initial.json",
            content: new TextDecoder("utf-8").decode(bufferedContents)
        })

        console.log(`Saving item chunks...`)


        //Get list of files in /itemChunks
        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/itemChunks/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/itemChunks/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/itemChunks/${file.name}`,
                    content: new TextDecoder("utf-8").decode(bufferedContents)
                })
    
            }

        } catch(ex) {
            // console.log(ex)
        }

        console.log(`Saving items...`)

        //Get list of files in /items

        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/items/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/items/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/items/${file.name}`,
                    content: new TextDecoder("utf-8").decode(bufferedContents)
                })
    
            }
            
        } catch(ex) {
            console.log(ex)
        }



        //Get list of files in /images
        console.log(`Saving images...`)

        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/images/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/images/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/images/${file.name}`,
                    content: new TextDecoder("utf-8").decode(bufferedContents)
                })
    
            }
            
        } catch(ex) {
            console.log(ex)
        }


        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`


        await axios.post(url, {
            branch: "master",
            commit_message: `Commiting reader data for ${channel.title}`,
            actions: actions
        } , {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        console.log(`Publish complete`)



    }



    async deleteReaderBackup(channel:Channel) {

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        //Get list of current files in backup folder
        let results = await axios.get(`${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/tree?recursive=true&path=backup`, {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        let actions = results?.data?.map( result => {
            return {
                action: 'delete',
                file_path: result.path
            }
        })

        
        console.log(actions)

        if (actions?.length > 0) {

            let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

            await axios.post(url, {
                branch: "master",
                commit_message: `Deleting existing reader for ${channel.title}`,
                actions: actions
            } , {
                headers: {
                    "Authorization": `Bearer ${config.personalAccessToken}`
                }
            })

        }




    }

}

export {
    GitlabService
}