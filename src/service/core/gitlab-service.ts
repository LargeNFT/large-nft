import axios from 'axios'
const toBuffer = require('it-to-buffer')
import parse from "parse-link-header"

import { inject, injectable } from "inversify";


import { Channel } from "../../dto/channel";
import { IpfsService } from './ipfs-service';

import http from 'isomorphic-git/http/web/index.js'
import { AuthorService } from '../../service/author-service';
import { SettingsService } from './settings-service';
import { Settings } from '../../dto/settings';
import { ItemService } from '../../service/item-service';
import { Item } from '../../dto/item';
import { Image } from '../../dto/image';
import { Animation } from '../../dto/animation';

import { ExportService } from './export-service';
import { ImageService } from '../../service/image-service';
import { AnimationService } from '../../service/animation-service';
import { PublishService } from './publish-service';
import { NFTMetadata } from 'dto/nft-metadata';


const contractABI = require('../../../contracts.json')


@injectable()
class GitlabService {

    static BASE_URL = 'https://gitlab.com/api/v4'
    static READER_REPO_ID = 15461980

    constructor(
        private settingsService:SettingsService,
        private ipfsService:IpfsService,
        private authorService:AuthorService,
        private itemService:ItemService,
        private exportService:ExportService,
        private imageService:ImageService,
        private animationService:AnimationService,
        private publishService:PublishService,
        @inject('fs') private getFS:Function,
        @inject('git') private git
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

    async getExistingFork(channel:Channel) {

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

    // async deployReader(channel:Channel) {

    //     //Delete all existing files from the repo

    //     this.logPublishReaderProgress(`Deploying reader...`)
    //     let config = await this.get()

    //     if (config.personalAccessToken.length < 1) {
    //         throw new Error("Gitlab personal access token not set")
    //     }

    //     await this.deleteReaderBackup(channel)

    //     let actions = []

    //     let directory = `/export/${channel._id}`

        
    //     //If the contract is deployed add a file with the address
    //     if (channel.contractAddress) {
            
    //         actions.push({
    //             action: "create",
    //             file_path: "backup/contract/contract.json",
    //             content: JSON.stringify({ 
    //                 contractAddress: channel.contractAddress,
    //                 ipfsCid: channel.localCid
    //              })
    //         })

    //         //Also the ABI
    //         actions.push({
    //             action: "create",
    //             file_path: "backup/contract/contract-abi.json",
    //             content: JSON.stringify(contractABI)
    //         })

    //         //Also the contract metadata
    //         let contractMetadata = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/contractMetadata.json`)) 
    //         actions.push({
    //             action: "create",
    //             file_path: "backup/export/contractMetadata.json",
    //             content: new TextDecoder("utf-8").decode(contractMetadata)
    //         })


    //     } else {
    //         actions.push({
    //             action: "create",
    //             file_path: "backup/contract/contract.json",
    //             content: JSON.stringify({}) //empty file
    //         })

    //         actions.push({
    //             action: "create",
    //             file_path: "backup/contract/contract-abi.json",
    //             content: JSON.stringify({}) //empty file
    //         })
    //     }

    //     //Read channels
    //     let channelsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/channels.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/channels.json",
    //         content: new TextDecoder("utf-8").decode(channelsContents)
    //     })

    //     //Authors
    //     let authorsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/authors.json`)) 


    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/authors.json",
    //         content: new TextDecoder("utf-8").decode(authorsContents)
    //     })


        

    //     //Items
    //     let itemsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/items.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/items.json",
    //         content: new TextDecoder("utf-8").decode(itemsContents)
    //     })

    //     //Images
    //     let imageContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/images.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/images.json",
    //         content: new TextDecoder("utf-8").decode(imageContents)
    //     })


    //     //Animations
    //     let animationsContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/animations.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/animations.json",
    //         content: new TextDecoder("utf-8").decode(animationsContents)
    //     })







    //     //Themes
    //     let themesContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/themes.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/themes.json",
    //         content: new TextDecoder("utf-8").decode(themesContents)
    //     })



    //     //Themes
    //     let staticPagesContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/backup/static-pages.json`)) 

    //     //Add create action
    //     actions.push({
    //         action: "create",
    //         file_path: "backup/export/backup/static-pages.json",
    //         content: new TextDecoder("utf-8").decode(staticPagesContents)
    //     })


    //     //Commit 
    //     await this.commit(channel, actions, config)



    //     //Get list of files in /metadata
    //     this.logPublishReaderProgress(`Saving NFT metadata...`)
        
    //     try {

    //         let i=0

    //         for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/metadata/`)) {

    //             let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/metadata/${file.name}`)) 
    
    //             //Add create action
    //             actions.push({
    //                 action: "create",
    //                 file_path: `backup/export/metadata/${file.name}`,
    //                 content: new TextDecoder("utf-8").decode(bufferedContents)
    //             })

    //             if (i % 500 == 0) {
    //                 //Commit 
    //                 await this.commit(channel, actions, config)
    //             }

    //             i++
    
    //         }

    //     } catch(ex) {
    //         // console.log(ex)
    //     }


    //     //Commit 
    //     await this.commit(channel, actions, config)


    //     //Get list of files in /images
    //     this.logPublishReaderProgress(`Saving images...`)

    //     try {

    //         let i=0

    //         for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/images/`)) {

    //             let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/images/${file.name}`)) 
    
    //             //Add create action
    //             actions.push({
    //                 action: "create",
    //                 file_path: `backup/export/images/${file.name}`,
    //                 content: Buffer.from(bufferedContents).toString('base64'),
    //                 encoding: 'base64'
    //             })

    //             if (i % 500 == 0) {
    //                 //Commit 
    //                 await this.commit(channel, actions, config)
    //             }

    //             i++
    
    //         }
            
    //     } catch(ex) {
    //         this.logPublishReaderProgress(ex)
    //     }


    //     //Commit 
    //     await this.commit(channel, actions, config)


    //     //Get list of files in /animations
    //     this.logPublishReaderProgress(`Saving animations...`)

    //     try {

    //         let i=0

    //         for await (const file of this.ipfsService.ipfs.files.ls(`${directory}/animations/`)) {

    //             let bufferedContents = await toBuffer(this.ipfsService.ipfs.files.read(`${directory}/animations/${file.name}`)) 
    
    //             //Add create action
    //             actions.push({
    //                 action: "create",
    //                 file_path: `backup/export/animations/${file.name}`,
    //                 content: Buffer.from(bufferedContents).toString('base64'),
    //                 encoding: 'base64'
    //             })

    //             if (i % 500 == 0) {
    //                 //Commit 
    //                 await this.commit(channel, actions, config)
    //             }

    //             i++
    
    //         }
            
    //     } catch(ex) {
    //         this.logPublishReaderProgress(ex)
    //     }


    //     await this.commit(channel, actions, config)

    //     this.logPublishReaderProgress(`Publish complete`)

    // }

    async commit(channel:Channel, actions:any[], settings:Settings) {

        this.logPublishReaderProgress(`Commiting reader data for ${channel.title}: ${actions.length} actions`)

        let url = `${GitlabService.BASE_URL}/projects/${channel.publishReaderRepoId}/repository/commits`

        const res = await axios.post(url, {
            branch: "master",
            commit_message: `Commiting reader data for ${channel.title}`,
            actions: actions,
        } , {
            headers: {
                "Authorization": `Bearer ${settings.personalAccessToken}`
            }
        })

        //Clear actions
        actions.length = 0
    }

    async deleteReaderBackup(channel:Channel) {

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
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
                    "Authorization": `Bearer ${settings.personalAccessToken}`
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
                    "Authorization": `Bearer ${settings.personalAccessToken}`
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

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
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
        let fs = await this.getFS()

        console.log(fs)

        //Check if we already have a repo
        let dir = `/repo-${channel._id}`

        let exists = await this._dirExists(fs, dir)
        let gitExists = await this._dirExists(fs, `${dir}/.git`)

        console.log(exists, gitExists)


        //Create directory structure
        if (!exists) {
            await this._createDirectoryStructure(fs, dir)
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




        this.logPublishReaderProgress(`Copying files from IPFS to git repo...`)


        //IPFS MFS directory
        let ipfsDir = `/export/${channel._id}`
        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            //Write contract info
            await this.addFile(fs, dir, 'backup/contract/contract.json', Buffer.from(JSON.stringify({
                contractAddress: channel.contractAddress,
                ipfsCid: channel.localCid
            })))

            
            //Also the ABI
            await this.addFile(fs, dir, 'backup/contract/contract-abi.json', Buffer.from(JSON.stringify(contractABI)))
            await this.addFile(fs, dir, 'backup/export/contractMetadata.json', await toBuffer(this.ipfsService.ipfs.files.read(`${ipfsDir}/contractMetadata.json`)) )

        } else {

            await this.addFile(fs, dir, 'backup/contract/contract-abi.json', Buffer.from(JSON.stringify({})))
            await this.addFile(fs, dir, 'backup/export/contractMetadata.json', Buffer.from(JSON.stringify({})) )

        }


        //Get list of files in /backup        
        try {

            this.logPublishReaderProgress(`Saving backup...`)

            let files = ['animations.json', 'authors.json', 'channels.json', 'images.json', 'items.json', 'static-pages.json', 'themes.json']

            for (let filename of files) {
                this.logPublishReaderProgress(`Saving ${dir}/backup/export/backup/${filename}`)
                await this.addFile(fs, dir, `backup/export/backup/${filename}`, await toBuffer(this.ipfsService.ipfs.files.read(`${ipfsDir}/backup/${filename}`))  )
            }

        } catch(ex) {
            this.logPublishReaderProgress(ex)
        }


        //Get data we need.
        this.logPublishReaderProgress(`Reading data...`)
        let items:Item[] = await this.itemService.listByChannel(channel._id, 100000, 0)

        let imageCids:string[] = []
        let animationCids:string[] = []
        
        if (channel.coverImageId) {
            imageCids.push(channel.coverImageId)
        }

        if (channel.coverBannerId) {
            imageCids.push(channel.coverBannerId)
        }


        //Get image and animation ids so we can quickly grab them. 
        for (let item of items) {
            imageCids.push(...this.exportService.getImageCidsByItem(item))
            animationCids.push(item.animationId)
        }

        let images:Image[] = await this.imageService.getByIds(imageCids)
        let animations:Animation[] = await this.animationService.getByIds(animationCids)

        let animationDirectoryCid = await this.publishService.getAnimationDirectoryCid(ipfsDir)
        let imageDirectoryCid = await this.publishService.getImageDirectoryCid(ipfsDir)


        this.logPublishReaderProgress(`Saving metadata...`)

        for (let item of items) {

            let coverImage = images.filter(i => i._id == item.coverImageId)[0]
            let nftMetadata:NFTMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage, animationDirectoryCid, imageDirectoryCid)

            this.logPublishReaderProgress(`Saving ${dir}/backup/export/metadata/${item.tokenId}.json`)

            await this.addFile(fs, dir, `backup/export/metadata/${item.tokenId}.json`, JSON.stringify(nftMetadata) )

        }


        this.logPublishReaderProgress(`Saving images...`)

        for (let image of images) {

            let filename = `${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            this.logPublishReaderProgress(`Saving ${dir}/backup/export/images/${filename}`)
            await this.addFile(fs, dir, `backup/export/images/${filename}`, await this.imageService.getImageContent(image)  )

        }


        this.logPublishReaderProgress(`Saving animations...`)
        for (let animation of animations) {
            this.logPublishReaderProgress(`Saving ${dir}/backup/export/animations/${animation._id}.html`)
            await this.addFile(fs, dir, `backup/export/animations/${animation._id}.html`, animation.content )
        }

        this.logPublishReaderProgress("Git add...")
        await this.git.add({
            fs,
            dir,
            filepath: '.'
        })


        this.logPublishReaderProgress("Git commit")
        let commitResult = await this.git.commit({
            fs,
            dir,
            message: `Channel "${channel.title}" published`
        })

        this.logPublishReaderProgress(commitResult.toString())


        this.logPublishReaderProgress("Git push...")
        let pushResult = await this.git.push({
            fs,
            http,
            dir: dir,
            remote: 'origin',
            ref: defaultBranch,
            onAuth: () =>  {

                return {
                    username: settings.username,
                    password: settings.personalAccessToken
                }

            },
          })

        this.logPublishReaderProgress(pushResult.toString())

    }



    private async _dirExists(fs, dir) {

        let exists = false

        //Make sure directory exists
        try {
            let result = await fs.promises.readdir(dir)
            // console.log(result)
            exists = true
        } catch (ex) {
            // console.log(ex)
        }

        return exists
    }

    private async _createDirectoryStructure(fs, dir:string) {

        //Create directory structure
        fs.mkdirSync(`${dir}`)
        fs.mkdirSync(`${dir}/backup`)

        fs.mkdirSync(`${dir}/backup/contract`)
        fs.mkdirSync(`${dir}/backup/export`)

        fs.mkdirSync(`${dir}/backup/export/backup`)
        fs.mkdirSync(`${dir}/backup/export/images`)
        fs.mkdirSync(`${dir}/backup/export/metadata`)
        fs.mkdirSync(`${dir}/backup/export/animations`)

    }

    private async addFile(fs, dir, filepath, content) {

        console.log(`${dir}/${filepath}`)

        await fs.promises.writeFile(
            `${dir}/${filepath}`, 
            content
        )



    }

}




export {
    GitlabService
}