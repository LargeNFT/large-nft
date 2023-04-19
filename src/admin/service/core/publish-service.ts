import { BigNumber, ethers } from "ethers"
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
import { GitService } from "./git-service.js"
import { AnimationService } from "../animation-service.js"
import { ContractMetadata } from "../../dto/contract-metadata.js"
import contractABI from '../../../../contracts.json'


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private exportService:ExportService,
        private gitService:GitService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async publish(channel: Channel, exportMedia:boolean, exportMetadata:boolean) {

        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.exportService.prepareExport(channel, this.walletService.address)

        let feeRecipient = await this._getFeeReceipient(exportBundle)

        this.logPublishProgress(undefined, `Fee Recipient: ${feeRecipient}`)


        this.logPublishProgress(undefined, "Preparing backup...")
        let backup:BackupBundle = await this.exportService.createBackup(exportBundle)

        // this.logPublishProgress(undefined, "Backup created. Initializing git...")

        // await this.gitService.init(channel)

        // this.logPublishProgress(undefined, "Git initialized. Exporting...")

        let cid: string = await this.export(channel, exportBundle, backup, feeRecipient, exportMedia, exportMetadata)

        //Update local cid info
        Object.assign(channel, await this.channelService.get(channel._id))

        channel.localCid = cid
        channel.localPubDate = new Date().toJSON()

        await this.channelService.put(channel)

    }

    async export(channel:Channel, exportBundle:ExportBundle, backup:BackupBundle, feeRecipient:string, exportMedia:boolean = true, exportMetadata:boolean=true): Promise<string> {

        let flush = true
        let ipfsDirectory = this.getIPFSDirectory(exportBundle.channel)

        let gitActions = []

        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportMetadata ? exportBundle.items.length : 0 },
            images: { saved: 0, total: exportMedia ? exportBundle.images.length : 0 },
            animations: { saved: 0, total: exportMedia ? exportBundle.animations.length : 0},
        
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

        if (exportMedia) {

            //Save images
            gitActions.push(...await this._publishImages(publishStatus, ipfsDirectory, exportBundle.images, true))

            //Save animations
            gitActions.push(...await this._publishAnimations(publishStatus, ipfsDirectory, exportBundle.animations, true))

        }


        //Get directory cids
        let imageDirectory = await this.getImageDirectoryCid(ipfsDirectory)
        let animationDirectory = await this.getAnimationDirectoryCid(ipfsDirectory)


        if (exportMetadata) {
            gitActions.push(...await this._publishNFTMetadata(publishStatus, ipfsDirectory, exportBundle.channel, exportBundle.items, animationDirectory, imageDirectory, true))
        }


        //Save contract metadata
        let contractMetadataPath = `${ipfsDirectory}/contractMetadata.json`
        let contractMetadata:ContractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient, imageDirectory)

        //IPFS
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush:flush })
        
        //Write to Git
        gitActions.push({
            action: "create",
            file_path: `/backup/export/contractMetadata.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(contractMetadata)))
        })


        //Only copy contract info to git. IPFS doesn't know about it.
        if (exportBundle.channel.contractAddress) {
                    
            gitActions.push({
                action: "create",
                file_path: "/backup/contract/contract.json",
                content: new TextDecoder().decode(Buffer.from(JSON.stringify({ 
                    contractAddress: exportBundle.channel.contractAddress,
                    ipfsCid: exportBundle.channel.localCid
                })))
            })

            //Also the ABI
            gitActions.push({
                action: "create",
                file_path: "/backup/contract/contract-abi.json",
                content: new TextDecoder().decode(Buffer.from(JSON.stringify(contractABI)))
            })


        } else {
            gitActions.push({
                action: "create",
                file_path: "/backup/contract/contract.json",
                content: new TextDecoder().decode(Buffer.from(JSON.stringify({}))) //empty file
            })

            gitActions.push({
                action: "create",
                file_path: "/backup/contract/contract-abi.json",
                content: new TextDecoder().decode(Buffer.from(JSON.stringify({}))) //empty file
            })
        }





        //Adding and then copying otherwise the CID does not match what we'd expect. 
        // let contractResult = await this.ipfsService.ipfs.add({
        //     content: new TextEncoder().encode(JSON.stringify(contractMetadata))
        // })

        // await this.ipfsService.ipfs.files.cp(`/ipfs/${contractResult.cid.toString()}`, contractMetadataPath, { create: true, parents: true, flush:flush })



        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath)
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`)

        //Write channels backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush })
        
        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/channels.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.channels)))
        })
        
        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)

        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush })

        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/authors.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.authors)))
        })
        
        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)

        //Write items backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/items.json`,  new TextEncoder().encode(JSON.stringify(backup.items)) , { create: true, parents: true, flush: flush })
        
        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/items.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.items)))
        })
        
        publishStatus.backups.items.saved = backup.items.length
        this.logPublishProgress(publishStatus)

        //Write images backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(backup.images)) , { create: true, parents: true, flush: flush })        
        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/images.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.images)))
        })
        
        publishStatus.backups.images.saved = backup.images.length
        this.logPublishProgress(publishStatus)

        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(backup.animations)) , { create: true, parents: true, flush: flush })

        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/animations.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.animations)))
        })
                
        publishStatus.backups.animations.saved = backup.animations.length
        this.logPublishProgress(publishStatus)

        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/themes.json`,  new TextEncoder().encode(JSON.stringify(backup.themes)) , { create: true, parents: true, flush: flush })
        
        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/themes.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.themes)))
        })
        
        publishStatus.backups.themes.saved = backup.themes.length
        this.logPublishProgress(publishStatus)

        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/static-pages.json`,  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , { create: true, parents: true, flush: flush })
        
        gitActions.push({
            action: "create",
            file_path: `/backup/export/backup/static-pages.json`,
            content: new TextDecoder().decode(Buffer.from(JSON.stringify(backup.staticPages)))
        })
        
        
        publishStatus.backups.staticPages.saved = backup.staticPages.length
        this.logPublishProgress(publishStatus)


        this.logPublishProgress(publishStatus, `Flushing to IPFS...`)
        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)


        //Export to git
        await this.gitService.deployReader(channel, gitActions)




        return result.cid.toString()

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

    private async _getFeeReceipient(exportBundle:ExportBundle) {

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

    private async _publishAnimations(publishStatus:PublishStatus, ipfsDirectory:string, animations:Animation[], flush: boolean) {

        let gitActions = []

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

            //Add to git
            gitActions.push({
                action: "create",
                file_path: `/backup/export/animations/${animation.cid}.html`,
                content: new TextDecoder("utf-8").decode(Buffer.from(animationContent.content)) 
            })


            publishStatus.animations.saved++



        }

        return gitActions


    }

    private async _publishImages(publishStatus:PublishStatus, ipfsDirectory:string, images:Image[], flush: boolean) {

        /** Using IPFS addAll was causing issues with bigger files.  */
        let gitActions = []



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

            //Add to git. 
            gitActions.push({
                action: "create",
                file_path: `/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`,
                content: Buffer.from(await this.imageService.getImageContent(image)).toString('base64'),
                encoding: 'base64'
            })



            publishStatus.images.saved++



        }

        return gitActions

    }

    private async _publishNFTMetadata(publishStatus:PublishStatus, ipfsDirectory:string, channel:Channel, items:Item[], animationDirectoryCid:string, imageDirectoryCid:string, flush:boolean) {

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

            let nft = metadataNFTMap[contentCid]

            //Save to git
            gitActions.push({
                action: "create",
                file_path: `/backup/export/metadata/${nft.tokenId}.json`,
                content: Buffer.from(JSON.stringify(nftMetadata)).toString('base64'),
                encoding: 'base64'
            })


            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${item.tokenId} to ${ipfsFilename}`)

        }

        return gitActions

    }

    async deployContract(channel: Channel) {

        if (!channel.localCid) {
            throw new Error("Not published to Pinata")
        }

        let count = await this.channelService.countItemsByChannel(channel._id)

        if (count <= 0) {
            throw new Error("No NFTs")
        }

        //Deploy contract
        let mintPriceWei = ethers.utils.parseUnits(channel.mintPrice, 'ether')        
        let receipt = await this.deploy(channel.title, channel.symbol, channel.localCid, mintPriceWei.toString(), count)

        //Update address locally
        channel.contractAddress = receipt.contractAddress
        await this.channelService.put(channel)

    }

    private async deploy(name: string, symbol: string, ipfsCid: string, mintFee: string, maxTokenId: number) {

        if (!name || !symbol || !mintFee || !maxTokenId || !ipfsCid) throw new Error("Missing inputs to deploy")

        let wallet = this.walletService.wallet
        if (!wallet) throw new Error("No wallet!")

        const c = this.contracts['Channel']

        const factory = new ethers.ContractFactory(c.abi, c.bytecode, wallet)
        
        let contract = await factory.deploy(
            name, 
            symbol, 
            ipfsCid, 
            BigNumber.from(mintFee.toString()), 
            BigNumber.from(maxTokenId.toString())
        )
        
        return contract.deployTransaction.wait()
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

export {
    PublishService
}