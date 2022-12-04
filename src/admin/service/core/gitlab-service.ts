import { default as axios } from 'axios'

// const toBuffer = require('it-to-buffer')
import toBuffer from "it-to-buffer"


import { inject, injectable } from "inversify";


import { Channel } from "../../dto/channel.js";
import { IpfsService } from './ipfs-service.js';

import { AuthorService } from '../../service/author-service.js';
import { SettingsService } from './settings-service.js';
import { Settings } from '../../dto/settings.js';
import { ItemService } from '../../service/item-service.js';
import { Item } from '../../dto/item.js';
import { Image } from '../../dto/image.js';
import { Animation } from '../../dto/animation.js';

import { ExportService } from './export-service.js';
import { ImageService } from '../../service/image-service.js';
import { AnimationService } from '../../service/animation-service.js';
import { PublishService } from './publish-service.js';
import { NFTMetadata } from '../../dto/nft-metadata.js';


import contractABI from '../../../../contracts.json'
import { GitService } from './git-service.js';

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
        private gitService:GitService,
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

    async deployReaderGit(channel:Channel) {

        let settings = await this.settingsService.get()

        if (settings.personalAccessToken.length < 1) {
            throw new Error("Gitlab personal access token not set")
        }


        //Init or load repo
        await this.gitService.init(channel)
        

        this.logPublishReaderProgress(`Copying files from IPFS to git repo...`)


        let dir = this.gitService.getBaseDir(channel)


        //IPFS MFS directory
        let ipfsDir = `/export/${channel._id}`
        
        //If the contract is deployed add a file with the address
        if (channel.contractAddress) {
            
            //Write contract info
            await this.gitService.writeFile(`${dir}/backup/contract/contract.json`, Buffer.from(JSON.stringify({
                contractAddress: channel.contractAddress,
                ipfsCid: channel.localCid
            })))

            
            //Also the ABI
            await this.gitService.writeFile(`${dir}/backup/contract/contract-abi.json`, Buffer.from(JSON.stringify(contractABI)))
            await this.gitService.writeFile(`${dir}/backup/export/contractMetadata.json`, await toBuffer(this.ipfsService.ipfs.files.read(`${ipfsDir}/contractMetadata.json`)) )

        } else {

            await this.gitService.writeFile(`${dir}/backup/contract/contract-abi.json`, Buffer.from(JSON.stringify({})))
            await this.gitService.writeFile(`${dir}/backup/export/contractMetadata.json`, Buffer.from(JSON.stringify({})) )

        }


        //Get list of files in /backup        
        try {

            this.logPublishReaderProgress(`Saving backup...`)

            let files = ['animations.json', 'authors.json', 'channels.json', 'images.json', 'items.json', 'static-pages.json', 'themes.json']

            for (let filename of files) {
                this.logPublishReaderProgress(`Saving ${dir}/backup/export/backup/${filename}`)
                await this.gitService.writeFile(`${this.gitService.getBaseDir(channel)}/backup/export/backup/${filename}`, await toBuffer(this.ipfsService.ipfs.files.read(`${ipfsDir}/backup/${filename}`))  )
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

            //Only export if we're not showing the image only.
            if (!item.coverImageAsAnimation) {
                animationCids.push(item.animationId)
            }


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

            await this.gitService.writeFile(`${dir}/backup/export/metadata/${item.tokenId}.json`, JSON.stringify(nftMetadata) )

        }


        this.logPublishReaderProgress(`Saving images...`)

        for (let image of images) {

            let filename = `${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            this.logPublishReaderProgress(`Saving ${dir}/backup/export/images/${filename}`)
            await this.gitService.writeFile(`${dir}/backup/export/images/${filename}`, await this.imageService.getImageContent(image)  )

        }


        this.logPublishReaderProgress(`Saving animations...`)
        for (let animation of animations) {
            this.logPublishReaderProgress(`Saving ${dir}/backup/export/animations/${animation._id}.html`)
            await this.gitService.writeFile(`${dir}/backup/export/animations/${animation._id}.html`, animation.content )
        }


        await this.gitService.gitAddAll(channel)
        await this.gitService.gitCommit(channel)
        await this.gitService.gitPush(channel, settings.username, settings.personalAccessToken)

        this.logPublishReaderProgress("Publish complete")

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