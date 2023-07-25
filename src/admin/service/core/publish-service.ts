import { inject, injectable } from "inversify"
import { Channel } from "../../dto/channel.js"
import { Animation } from "../../dto/animation.js"
import { Item } from "../../dto/item.js"

import { BackupBundle, ExportBundle } from "../../dto/export-bundle.js"
import { Image } from "../../dto/image.js"

import { PublishStatus } from "../../dto/viewmodel/publish-status.js"
import { ChannelService } from "../channel-service.js"
import { ImageService } from "../image-service.js"
import { ItemService } from "../item-service.js"

import { IpfsService } from "./ipfs-service.js"
import TYPES from "./types.js"
import { WalletService } from "./wallet-service.js"


import { ExportService } from "./export-service.js"
import Hash from 'ipfs-only-hash'
import { ContractMetadata } from "../../dto/contract-metadata.js"
//@ts-ignore
import contractABI from '../../../../contracts.json' assert { type: "json" }
import { SettingsService } from "./settings-service.js"


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private exportService:ExportService,
        private settingsService:SettingsService,
        @inject(TYPES.WalletService) private walletService: WalletService
    ) { }

    async publish(channel: Channel, baseDir:string) {

        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.exportService.prepareExport(channel, this.walletService.address)

        
        let feeRecipient = await this.getFeeReceipient(exportBundle)

        if (feeRecipient) {
            this.logPublishProgress(undefined, `Fee Recipient: ${feeRecipient}`)
        }

        this.logPublishProgress(undefined, "Preparing backup...")

        let backup:BackupBundle = await this.exportService.createBackup(exportBundle)


        //export to IPFS but only if we don't have a contractAddress
        let cids:CidInfo
        if (!channel.contractAddress) {

            cids = await this.exportToIPFS(exportBundle, backup, feeRecipient)

        } else {

            cids = {
                cid: channel.publishReaderIPFSStatus.cid,
                imageDirectoryCid: channel.publishReaderIPFSStatus.imageDirectoryCid,
                animationDirectoryCid: channel.publishReaderIPFSStatus.animationDirectoryCid
            }

        }




        let fsActions = await this.exportToFS(baseDir, channel, exportBundle, backup, feeRecipient, cids)

        return {
            cids: cids,
            fsActions: fsActions
        }

    }

    async exportToIPFS(exportBundle:ExportBundle, backup:BackupBundle, feeRecipient:string): Promise<CidInfo> {

        let flush = true
        let ipfsDirectory = this.getIPFSDirectory(exportBundle.channel)

        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(ipfsDirectory)
            await this.ipfsService.ipfs.files.rm(ipfsDirectory,  { recursive: true, flush: true})
        } catch (ex) { }


        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.images.length  },
            animations: { saved: 0, total: exportBundle.animations.length},
        
            backups: {
                channels: { saved: 0, total: 1 },
                authors: { saved: 0, total: 1 }, 
                items: { saved: 0, total: backup.items.length },
                images: { saved: 0, total: exportBundle.images.length },
                animations: { saved: 0, total: exportBundle.animations.length },
                themes: { saved: 0, total: backup.themes.length },
                staticPages: { saved: 0, total: backup.staticPages.length }
            }
        }

        this.logPublishProgress(publishStatus)


        //Save images
        await this._publishImagesIPFS(publishStatus, ipfsDirectory, exportBundle.images, true)

        //Save animations
        await this._publishAnimationsIPFS(publishStatus, ipfsDirectory, exportBundle.animations, true)


        //Get directory cids
        let imageDirectory = await this.getImageDirectoryCid(ipfsDirectory)
        let animationDirectory = await this.getAnimationDirectoryCid(ipfsDirectory)

        await this._publishNFTMetadataIPFS(publishStatus, ipfsDirectory, exportBundle.channel, exportBundle.items, animationDirectory, imageDirectory, true)

        //Save contract metadata
        let contractMetadataPath = `${ipfsDirectory}/contractMetadata.json`
        let contractMetadata:ContractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient, imageDirectory)

        //IPFS
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush:flush })
        

        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath)
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`)



        //Write channels backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush })
        
        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)



        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush })

        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)



        //Write items backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/items.json`,  new TextEncoder().encode(JSON.stringify(backup.items)) , { create: true, parents: true, flush: flush })
        
        publishStatus.backups.items.saved = backup.items.length
        this.logPublishProgress(publishStatus)



        //Write images backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(backup.images)) , { create: true, parents: true, flush: flush })        

        publishStatus.backups.images.saved = backup.images.length
        this.logPublishProgress(publishStatus)



        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(backup.animations)) , { create: true, parents: true, flush: flush })

        publishStatus.backups.animations.saved = backup.animations.length
        this.logPublishProgress(publishStatus)



        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/themes.json`,  new TextEncoder().encode(JSON.stringify(backup.themes)) , { create: true, parents: true, flush: flush })
        
        publishStatus.backups.themes.saved = backup.themes.length
        this.logPublishProgress(publishStatus)



        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/static-pages.json`,  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , { create: true, parents: true, flush: flush })
        
        publishStatus.backups.staticPages.saved = backup.staticPages.length
        this.logPublishProgress(publishStatus)



        this.logPublishProgress(publishStatus, `Flushing to IPFS...`)
        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)


        return {
            cid: result.cid.toString(),
            imageDirectoryCid: imageDirectory.cid.toString(),
            animationDirectoryCid: animationDirectory.cid.toString()
        }

    }

    async exportToFS(baseDir:string, channel:Channel, exportBundle:ExportBundle, backup:BackupBundle, feeRecipient:string, cids?:CidInfo): Promise<any[]> {

        let fsActions = []

        //Save images
        await this._publishImagesFS(baseDir, fsActions, exportBundle.images)

        //Save animations
        await this._publishAnimationsFS(baseDir, fsActions, exportBundle.animations)

        await this._publishNFTMetadataFS(baseDir, fsActions, exportBundle.channel, exportBundle.items, cids.animationDirectoryCid, cids.imageDirectoryCid)

        //Save contract metadata
        let contractMetadata:ContractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient, cids.imageDirectoryCid)


        //Write to Git
        fsActions.push({
            file_path: `${baseDir}/backup/export/contractMetadata.json`,
            content: Buffer.from(JSON.stringify(contractMetadata))
        })


        //Only copy contract info to git. IPFS doesn't know about it.
        if (channel.contractAddress) {
                    
            fsActions.push({
                file_path: `${baseDir}/backup/contract/contract.json`,
                content: Buffer.from(JSON.stringify({ 
                    contractAddress: channel.contractAddress,
                    ipfsCid: channel.publishReaderIPFSStatus?.cid
                }))

            })

            //Also the ABI
            fsActions.push({
                file_path: `${baseDir}/backup/contract/contract-abi.json`,
                content: Buffer.from(JSON.stringify(contractABI))
            })


        } else {
            fsActions.push({
                file_path: `${baseDir}/backup/contract/contract.json`,
                content: Buffer.from(JSON.stringify({}))
            })

            fsActions.push({
                file_path: `${baseDir}/backup/contract/contract-abi.json`,
                content: Buffer.from(JSON.stringify({}))
            })
        }

        const getProductionURIInfo = async (channel) => {

            let settings = await this.settingsService.get()

            let gitProvider
    
            //If it's "default" or blank then look at the global default
            if (!channel.gitProvider || channel.gitProvider == "default") {
    
                if (settings.defaultGitProvider) {
                    gitProvider = settings.defaultGitProvider
                } else {
                    gitProvider = "github"
                }
                
            } else {
                gitProvider = channel.gitProvider
            }
    
            switch(gitProvider) {

                case "gitlab":

                    function getGitLabUsername(url) {

                        const path = url.replace("https://gitlab.com/", "")
                    
                        // Split the remaining path into parts
                        const parts = path.split("/")
                    
                        // Extract the username and repository name
                        const username = parts[0]
                        
                        return username
            
                    }
            
            
                    return {
                        hostname: `https://${getGitLabUsername(channel.httpUrlToRepo)}.gitlab.io`,
                        baseURI: `/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`
                }

                case "github":

                    function getGitHubUsername(url) {

                        const path = url.replace("https://github.com/", "");
                    
                        // Split the remaining path into parts
                        const parts = path.split("/");
                    
                        // Extract the username and repository name
                        const username = parts[0];
                        
                        return username
            
                    }
            
            
                    return {
                        hostname: `https://${getGitHubUsername(channel.httpUrlToRepo)}.github.io`,
                        baseURI: `/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`
                }

            }

        }

        let productionURIInfo = await getProductionURIInfo(channel)

        //Copy a large-config.json to GitHub
        fsActions.push({
            file_path: `${baseDir}/large-config.json`,
            content: Buffer.from(JSON.stringify({
                "showMintPage": channel.showMintPage,
                "showActivityPage": channel.showActivityPage,
                "hostname": channel.productionHostname ? channel.productionHostname : productionURIInfo?.hostname,
                "libraryURL": channel.productionBaseLibraryURI,
                "baseURL": channel.productionBaseURI ? channel.productionBaseURI : productionURIInfo?.baseURI,
                "externalLinks": channel.externalLinks,
                "marketplaces": channel.marketplaces
            } ))
        })


        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/channels.json`,
            content: Buffer.from(JSON.stringify(backup.channels))
        })
        

        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/authors.json`,
            content: Buffer.from(JSON.stringify(backup.authors))
        })

        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/items.json`,
            content: Buffer.from(JSON.stringify(backup.items))
        })
       
        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/images.json`,
            content: Buffer.from(JSON.stringify(backup.images))
        })
        
        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/animations.json`,
            content: Buffer.from(JSON.stringify(backup.animations))
        })
                
        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/themes.json`,
            content: Buffer.from(JSON.stringify(backup.themes))
        })
        
        fsActions.push({
            file_path: `${baseDir}/backup/export/backup/static-pages.json`,
            content: Buffer.from(JSON.stringify(backup.staticPages))
        })
        

        return fsActions

    }

    getIPFSDirectory(channel:Channel) {
        return `/export/${channel._id}`
    }

    public async getAnimationDirectoryCid(directory) {

        let cid

        try {
            
            let stat = await this.ipfsService.ipfs.files.stat(`${directory}/animations/`, {
                hash: true
            })
    
            cid = stat.cid.toString()
    
        } catch(ex) {}

        return cid
    }

    public async getImageDirectoryCid(directory) {
        
        let cid

        try {
            let stat = await this.ipfsService.ipfs.files.stat(`${directory}/images/`, {
                hash: true
            })
    
            cid = stat.cid.toString()
    
        } catch(ex) {}

        return cid

    }

    public async getFeeReceipient(exportBundle:ExportBundle) {

        let feeRecipient

        if (exportBundle.channel.forkType == "existing") {  
            if (exportBundle.channel.forkedFromFeeRecipient) {
                feeRecipient = exportBundle.channel.forkedFromFeeRecipient 
            }
        } else {
            feeRecipient = exportBundle.ownerAddress
        }

        return feeRecipient
    }

    private async _publishAnimationsIPFS(publishStatus:PublishStatus, ipfsDirectory:string, animations:Animation[], flush: boolean) {

        this.logPublishProgress(publishStatus, `Exporting ${animations.length} animations`)

        for (let animation of animations) {

            let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`

            let animationContent = {
                content: animation.content
            }

            //Check if it's already in IPFS
            let stat

            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
            } catch(ex) {}


            if (!stat?.cid.toString()) {

                const result = await this.ipfsService.ipfs.add(animationContent)

                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { parents: true, flush: flush })
    
                if (result.cid.toString() !== animation.cid.toString()) {
                    throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.cid.toString()}`)
                }

                this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to ${ipfsDirectory}/animations/${animation.cid}.html (${animation.cid})`)


            } else {

                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`)
            }


            publishStatus.animations.saved++



        }

    }

    private async _publishAnimationsFS(baseDir:string, fsActions:any[], animations:Animation[]) {

        for (let animation of animations) {

            let animationContent = {
                content: animation.content
            }

            //Add to git
            fsActions.push({
                file_path: `${baseDir}/backup/export/animations/${animation.cid}.html`,
                content: Buffer.from(animationContent.content)
            })

        }


    }

    private async _publishImagesIPFS(publishStatus:PublishStatus, ipfsDirectory:string, images:Image[], flush: boolean) {

        for (let image of images) {
            
            let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 


            //Check if it's already in IPFS
            let stat

            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
            } catch(ex) {}


            if (!stat?.cid.toString()) {

                //Add to IPFS
                const result = await this.ipfsService.ipfs.add({
                    content: await this.imageService.getImageContent(image)
                })


                //Move to MFS directory in IPFS
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush:flush })

                //Validate cid
                if (result.cid.toString() != image.cid) {    
                    throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.cid.toString()}`)
                }

                this.logPublishProgress(publishStatus, `Saving image to ${ipfsFilename} (${image.cid})`)

            } else {
                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`)
            }

            publishStatus.images.saved++


        }


    }

    private async _publishImagesFS(baseDir:string, fsActions:any[], images:Image[]) {

        for (let image of images) {
            
            let content 

            if (image.buffer) {

                if (content instanceof Uint8Array) {
                    content = image.buffer
                } else {
                    //@ts-ignore
                    content = Buffer.from(Object.values(image.buffer)) //this is because pouchdb allDocs is returning a weird format of the data on node.
                }

            } else if (image.svg) {
                content = Buffer.from(image.svg)
            }

            //Add to git. 
            fsActions.push({
                file_path: `${baseDir}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`,
                content: content
            })

        }


    }

    private async _publishNFTMetadataIPFS(publishStatus:PublishStatus, ipfsDirectory:string, channel:Channel, items:Item[], animationDirectoryCid:string, imageDirectoryCid:string, flush:boolean) {

        let gitActions = []


        this.logPublishProgress(publishStatus, `Exporting ${items.length} metadata files`)


        let metadataNFTMap = {}

        for (let item of items) {

            let ipfsFilename = `${ipfsDirectory}/metadata/${item.tokenId}.json`


            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage, animationDirectoryCid, imageDirectoryCid)
            
            let content = new TextEncoder().encode(JSON.stringify(nftMetadata))
            let contentCid = await Hash.of(content)

            metadataNFTMap[contentCid] = nftMetadata


            //Check if it's already in IPFS
            let stat

            try {
                stat = await this.ipfsService.ipfs.files.stat(ipfsFilename, { hash: true })
            } catch(ex) {}


            if (stat?.cid.toString() != contentCid) {

                const result = await this.ipfsService.ipfs.add({
                    content: content
                })
    
    
                // let nft = metadataNFTMap[result.cid.toString()]
    
    
                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, ipfsFilename, { create: true, parents: true, flush:flush })
    
            } else {
                this.logPublishProgress(publishStatus, `${ipfsFilename} already exists. Skipping...`)
            }

            // let nft = metadataNFTMap[contentCid]


            // //Save to git
            // gitActions.push({
            //     action: "create",
            //     file_path: `/backup/export/metadata/${nft.tokenId}.json`,
            //     content: Buffer.from(JSON.stringify(nftMetadata))
            // })


            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${item.tokenId} to ${ipfsFilename}`)

        }

        return gitActions

    }

    private async _publishNFTMetadataFS(baseDir:string, fsActions:any[], channel:Channel, items:Item[], animationDirectoryCid:string, imageDirectoryCid:string) {

        let metadataNFTMap = {}

        for (let item of items) {

            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage, animationDirectoryCid, imageDirectoryCid)
            

            let content = new TextEncoder().encode(JSON.stringify(nftMetadata))
            let contentCid = await Hash.of(content)

            metadataNFTMap[contentCid] = nftMetadata

            let nft = metadataNFTMap[contentCid]



            //Save to git
            fsActions.push({
                file_path: `${baseDir}/backup/export/metadata/${nft.tokenId}.json`,
                content: Buffer.from(JSON.stringify(nftMetadata))
            })

        }

    }


    private logPublishProgress(publishStatus:PublishStatus, message?: string) {

        if (message) {
            console.log(message)
        }
        

        if (typeof window !== "undefined" && typeof window.document !== "undefined") {
            // browser
            const imageSelectedEvent = new CustomEvent('publish-progress', {
                detail: { 
                    publishStatus: publishStatus,
                    message: message 
                }
            })

            document.dispatchEvent(imageSelectedEvent)

        }

    }

}


interface CidInfo {
    cid: string
    imageDirectoryCid:string
    animationDirectoryCid:string
}

export {
    PublishService, CidInfo
}