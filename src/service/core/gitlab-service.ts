import axios from 'axios'
const toBuffer = require('it-to-buffer')

import { validate, ValidationError } from "class-validator";
import { injectable } from "inversify";
import { ValidationException } from "../../util/validation-exception";


import { GitlabRepository } from "../../repository/gitlab-repository";
import { Gitlab } from "../../dto/gitlab";
import { Channel } from "../../dto/channel";
import { IpfsService } from './ipfs-service';


const contractABI = require('../../../contracts.json')


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
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        return {
            id: response.data.id,
            path: path
        }

    }

    async getExistingFork(channel:Channel) {

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        let url = `${GitlabService.BASE_URL}/projects/${GitlabService.READER_REPO_ID}/forks`
        
        let response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        console.log(response)

        let forks = response.data

        let path = `${channel.title} Reader`.replace(/[^a-z0-9]/gi, '-').toLowerCase()

        //Search for one with the same path
        let results = forks.filter( f => f.path == path)

        if (results?.length == 1) return results[0]

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

        this.logPublishReaderProgress(`Deploying reader...`)

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        await this.deleteReaderBackup(channel)
        
        let actions = []

        let directory = `/blogs/${channel._id}`

        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            actions.push({
                action: "create",
                file_path: "backup/contract.json",
                content: JSON.stringify({ contractAddress: channel.contractAddress })
            })

            //Also the ABI
            actions.push({
                action: "create",
                file_path: "backup/contract-abi.json",
                content: JSON.stringify(contractABI)
            })

        } else {
            actions.push({
                action: "create",
                file_path: "backup/contract.json",
                content: JSON.stringify({}) //empty file
            })

            actions.push({
                action: "create",
                file_path: "backup/contract-abi.json",
                content: JSON.stringify({}) //empty file
            })
        }

        //Read channels
        let channelsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/channels.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/channels.json",
            content: new TextDecoder("utf-8").decode(channelsContents)
        })

        //Authors
        let authorsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/authors.json`)) 


        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/authors.json",
            content: new TextDecoder("utf-8").decode(authorsContents)
        })


        

        //Items
        let itemsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/items.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/items.json",
            content: new TextDecoder("utf-8").decode(itemsContents)
        })

        //Images
        let imageContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/images.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/images.json",
            content: new TextDecoder("utf-8").decode(imageContents)
        })


        //Animations
        let animationsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/animations.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/animations.json",
            content: new TextDecoder("utf-8").decode(animationsContents)
        })

        //Get list of files in /metadata
        this.logPublishReaderProgress(`Saving NFT metadata...`)
        
        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/metadata/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/metadata/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/metadata/${file.name}`,
                    content: new TextDecoder("utf-8").decode(bufferedContents)
                })
    
            }

        } catch(ex) {
            // console.log(ex)
        }




        //Get list of files in /itemChunks
        this.logPublishReaderProgress(`Saving item chunks...`)
        
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


        //Get list of files in /images
        this.logPublishReaderProgress(`Saving images...`)

        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/images/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/images/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/images/${file.name}`,
                    content: Buffer.from(bufferedContents).toString('base64'),
                    encoding: 'base64'
                })
    
            }
            
        } catch(ex) {
            this.logPublishReaderProgress(ex)
        }



        //Get list of files in /animations
        this.logPublishReaderProgress(`Saving animations...`)

        try {

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/animations/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/animations/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/animations/${file.name}`,
                    content: Buffer.from(bufferedContents).toString('base64'),
                    encoding: 'base64'
                })
    
            }
            
        } catch(ex) {
            this.logPublishReaderProgress(ex)
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

        this.logPublishReaderProgress(`Publish complete`)

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

        //Skip directories because gitlab chokes on them.
        let actions = results?.data?.reverse()?.filter(result => result.name.indexOf('.') > 0).map( result => {

            return {
                action: 'delete',
                file_path: result.path
            }
        })

        
        if (actions?.length > 0) {

            console.log(`Deleting from reader repo...`)

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