import axios from 'axios'
const toBuffer = require('it-to-buffer')
import parse from "parse-link-header"

import { validate, ValidationError } from "class-validator";
import { inject, injectable } from "inversify";
import { ValidationException } from "../../util/validation-exception";


import { GitlabRepository } from "../../repository/gitlab-repository";
import { Gitlab } from "../../dto/gitlab";
import { Channel } from "../../dto/channel";
import { IpfsService } from './ipfs-service';

import http from 'isomorphic-git/http/web/index.js'
import { AuthorService } from '../../service/author-service';

const contractABI = require('../../../contracts.json')


@injectable()
class GitlabService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    constructor(
        private gitlabRepository:GitlabRepository,
        private ipfsService:IpfsService,
        private authorService:AuthorService,
        @inject('fs') private fs,
        @inject('git') private git
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

        // console.log(response)

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

        let directory = `/export/${channel._id}`

        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            actions.push({
                action: "create",
                file_path: "backup/contract/contract.json",
                content: JSON.stringify({ 
                    contractAddress: channel.contractAddress,
                    ipfsCid: channel.localCid
                 })
            })

            //Also the ABI
            actions.push({
                action: "create",
                file_path: "backup/contract/contract-abi.json",
                content: JSON.stringify(contractABI)
            })

            //Also the contract metadata
            let contractMetadata = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/contractMetadata.json`)) 
            actions.push({
                action: "create",
                file_path: "backup/export/contractMetadata.json",
                content: new TextDecoder("utf-8").decode(contractMetadata)
            })


        } else {
            actions.push({
                action: "create",
                file_path: "backup/contract/contract.json",
                content: JSON.stringify({}) //empty file
            })

            actions.push({
                action: "create",
                file_path: "backup/contract/contract-abi.json",
                content: JSON.stringify({}) //empty file
            })
        }

        //Read channels
        let channelsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/channels.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/channels.json",
            content: new TextDecoder("utf-8").decode(channelsContents)
        })

        //Authors
        let authorsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/authors.json`)) 


        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/authors.json",
            content: new TextDecoder("utf-8").decode(authorsContents)
        })


        

        //Items
        let itemsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/items.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/items.json",
            content: new TextDecoder("utf-8").decode(itemsContents)
        })

        //Images
        let imageContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/images.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/images.json",
            content: new TextDecoder("utf-8").decode(imageContents)
        })


        //Animations
        let animationsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/animations.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/animations.json",
            content: new TextDecoder("utf-8").decode(animationsContents)
        })







        //Themes
        let themesContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/themes.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/themes.json",
            content: new TextDecoder("utf-8").decode(themesContents)
        })



        //Themes
        let staticPagesContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/static-pages.json`)) 

        //Add create action
        actions.push({
            action: "create",
            file_path: "backup/export/backup/static-pages.json",
            content: new TextDecoder("utf-8").decode(staticPagesContents)
        })


        //Commit 
        await this.commit(channel, actions, config)



        //Get list of files in /metadata
        this.logPublishReaderProgress(`Saving NFT metadata...`)
        
        try {

            let i=0

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/metadata/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/metadata/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/export/metadata/${file.name}`,
                    content: new TextDecoder("utf-8").decode(bufferedContents)
                })

                if (i % 500 == 0) {
                    //Commit 
                    await this.commit(channel, actions, config)
                }

                i++
    
            }

        } catch(ex) {
            // console.log(ex)
        }


        //Commit 
        await this.commit(channel, actions, config)


        //Get list of files in /images
        this.logPublishReaderProgress(`Saving images...`)

        try {

            let i=0

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/images/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/images/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/export/images/${file.name}`,
                    content: Buffer.from(bufferedContents).toString('base64'),
                    encoding: 'base64'
                })

                if (i % 500 == 0) {
                    //Commit 
                    await this.commit(channel, actions, config)
                }

                i++
    
            }
            
        } catch(ex) {
            this.logPublishReaderProgress(ex)
        }


        //Commit 
        await this.commit(channel, actions, config)


        //Get list of files in /animations
        this.logPublishReaderProgress(`Saving animations...`)

        try {

            let i=0

            for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/animations/`)) {

                let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/animations/${file.name}`)) 
    
                //Add create action
                actions.push({
                    action: "create",
                    file_path: `backup/export/animations/${file.name}`,
                    content: Buffer.from(bufferedContents).toString('base64'),
                    encoding: 'base64'
                })

                if (i % 500 == 0) {
                    //Commit 
                    await this.commit(channel, actions, config)
                }

                i++
    
            }
            
        } catch(ex) {
            this.logPublishReaderProgress(ex)
        }


        await this.commit(channel, actions, config)

        this.logPublishReaderProgress(`Publish complete`)

    }

    async commit(channel:Channel, actions:any[], config:Gitlab) {

        this.logPublishReaderProgress(`Commiting reader data for ${channel.title}: ${actions.length} actions`)

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

        const res = await axios.post(url, {
            branch: "master",
            commit_message: `Commiting reader data for ${channel.title}`,
            actions: actions,
        } , {
            headers: {
                "Authorization": `Bearer ${config.personalAccessToken}`
            }
        })

        //Clear actions
        actions.length = 0
    }


    async deleteReaderBackup(channel:Channel) {

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }
        

        this.logPublishReaderProgress(`Deleting existing files from repo...`)


        let treeLink = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/tree?recursive=true&path=backup&pagination=keyset`
        let linkHeaders
        let actions = []

        do {

            //Get list of current files in backup folder
            let results = await axios.get(treeLink, {
                headers: {
                    "Authorization": `Bearer ${config.personalAccessToken}`
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

            this.logPublishReaderProgress(`Deleting ${actions.length} files from repo...`)

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








    async deployReaderGit(channel:Channel) {

        let config = await this.get()

        if (config.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }

        //Make sure we have an author
        let author = await this.authorService.get(channel.authorId)

        if (!author) {
            throw new Error("No author found.")
        }

        let gitUsername = author.name ? author.name : author._id


        //Get fork URL
        let existingForkResult = await this.getExistingFork(channel)

        let repoURI = existingForkResult.http_url_to_repo
        let defaultBranch = existingForkResult.default_branch 


        //Init FS
        let fs = this.fs

        fs.backend.ipfs = this.ipfsService.ipfs

        //Get a reference to the IPFSFileList to build
        let ipfsFileList:IPFSFileList = 


        //Check if we already have a repo
        let dir = `/repo-${channel._id}`
        let exists = await this._dirExists(`${dir}/.git`)


        //Clone or pull depending on if we already have the repo.
        if (!exists) {

            this.logPublishReaderProgress(`Git clone: ${repoURI} to ${dir}`)

            await this.git.clone({
                fs,
                http,
                dir,
                corsProxy: 'https://cors.isomorphic-git.org',
                url: repoURI,
                ref: defaultBranch,
                singleBranch: true
            })


            this.logPublishReaderProgress(`Setting git user.name to ${gitUsername}`)

            await this.git.setConfig({
                fs,
                dir,
                path: 'user.name',
                value: gitUsername
            })


        } else {

            this.logPublishReaderProgress(`Git pull`)

            //Do a git pull
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

        this.logPublishReaderProgress(`Deploying reader...`)





        //IPFS MFS directory
        let ipfsDir = `/export/${channel._id}`
        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            //Write contract info
            await fs.promises.writeFile(`${dir}/backup/contract/contract.json`, JSON.stringify({
                contractAddress: channel.contractAddress,
                ipfsCid: channel.localCid
            }), 'utf8')


            //Also the ABI
            await fs.promises.writeFile(`${dir}/backup/contract/contract-abi.json`, JSON.stringify(contractABI), 'utf8')

            //Also the contract metadata
            await this._ipfsToFs(`${ipfsDir}/contractMetadata.json`, `${dir}/backup/export/contractMetadata.json`)



        } else {
            await fs.promises.writeFile(`${dir}/backup/contract/contract.json`, JSON.stringify({}), 'utf8') //empty file
            await fs.promises.writeFile(`${dir}/backup/contract/contract-abi.json`, JSON.stringify({}), 'utf8') //empty file
        }

        // //Channels
        await this._ipfsToFs(`${ipfsDir}/backup/channels.json`, `${dir}/backup/export/backup/channels.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/authors.json`, `${dir}/backup/export/backup/authors.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/items.json`, `${dir}/backup/export/backup/items.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/images.json`, `${dir}/backup/export/backup/images.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/animations.json`, `${dir}/backup/export/backup/animations.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/themes.json`, `${dir}/backup/export/backup/themes.json`)
        await this._ipfsToFs(`${ipfsDir}/backup/static-pages.json`, `${dir}/backup/export/backup/static-pages.json`)


        // //Get list of files in /metadata        
        // try {

        //     this.logPublishReaderProgress(`Saving NFT metadata...`)

        //     for await (const file of this.ipfsService.ipfs.files.ls(`${ipfsDir}/metadata/`)) {
        //         this.logPublishReaderProgress(`Saving ${dir}/backup/export/metadata/${file.name}`)
        //         await this._ipfsToFs(`${ipfsDir}/metadata/${file.name}`, `${dir}/backup/export/metadata/${file.name}`)
        //     }

        // } catch(ex) {
        //     this.logPublishReaderProgress(ex)
        // }

   
        // //Get list of files in /images
        // try {

        //     this.logPublishReaderProgress(`Saving images...`)

        //     for await (const file of this.ipfsService.ipfs.files.ls(`${ipfsDir}/images/`)) {
        //         this.logPublishReaderProgress(`Saving ${dir}/backup/export/images/${file.name}`)

        //         await this._ipfsToFsBinary(`${ipfsDir}/images/${file.name}`, `${dir}/backup/export/images/${file.name}`)
        //     }
            
        // } catch(ex) {
        //     this.logPublishReaderProgress(ex)
        // }


        // //Get list of files in /animations
        // try {

        //     this.logPublishReaderProgress(`Saving animations...`)

        //     for await (const file of this.ipfsService.ipfs.files.ls(`${ipfsDir}/animations/`)) {
        //         this.logPublishReaderProgress(`Saving ${dir}/backup/export/animations/${file.name}`)

        //         await this._ipfsToFsBinary(`${ipfsDir}/animations/${file.name}`, `${dir}/backup/export/animations/${file.name}`)
        //     }
            
        // } catch(ex) {
        //     this.logPublishReaderProgress(ex)
        // }


        //Git add
        console.log("Git add")

        await this.git.add({
            fs,
            dir,
            filepath: "."
        })

        

        console.log("Git commit")
        await this.git.commit({
            fs,
            dir,
            message: `Channel "${channel.title}" published`
        })

        console.log("Git push")
        let pushResult = await this.git.push({
            fs,
            http,
            dir: dir,
            remote: 'origin',
            ref: defaultBranch,
            onAuth: () => ({ 
                username: 'ptoner', //gotta store this somewhere
                password: config.personalAccessToken
            }),
          })

        console.log(pushResult)

        this.logPublishReaderProgress(`Publish complete`)

    }

    private async _ipfsToFs(ipfsFilename:string, fsFilename:string) {
        let contents = await toBuffer(this.ipfsService.ipfs.files.read(ipfsFilename)) 
        return this.fs.promises.writeFile(fsFilename, new TextDecoder("utf-8").decode(contents), 'utf8') 
    }

    private async _ipfsToFsBinary(ipfsFilename:string, fsFilename:string) {
        let contents = await toBuffer(this.ipfsService.ipfs.files.read(ipfsFilename)) 
        return this.fs.promises.writeFile(fsFilename, contents, 'utf8') 
    }

    private async _dirExists(dir) {

        let exists = false

        //Make sure directory exists
        try {
            await this.fs.promises.readdir(dir)
            exists = true
        } catch (ex) {}

        return exists
    }


}



export {
    GitlabService
}