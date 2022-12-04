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
import { AnimationService } from "../animation-service.js"


import { ExportService } from "./export-service.js"
import Hash from 'ipfs-only-hash'
import { GitService } from "./git-service.js"
import { GitlabService } from "./gitlab-service.js"


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private exportService:ExportService,
        private gitService:GitService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async publish(channel: Channel) {

        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.exportService.prepareExport(channel, this.walletService.address)

        let feeRecipient = await this._getFeeReceipient(exportBundle)

        this.logPublishProgress(undefined, `Fee Recipient: ${feeRecipient}`)


        this.logPublishProgress(undefined, "Preparing backup...")
        let backup:BackupBundle = await this.exportService.createBackup(exportBundle)

        this.logPublishProgress(undefined, "Backup created. Initializing git...")

        await this.gitService.init(channel)

        this.logPublishProgress(undefined, "Git initialized. Exporting...")

        let cid: string = await this.export(exportBundle, backup, feeRecipient)

        //Update local cid info
        Object.assign(channel, await this.channelService.get(channel._id))

        channel.localCid = cid
        channel.localPubDate = new Date().toJSON()

        await this.channelService.put(channel)

    }

    async export(exportBundle:ExportBundle, backup:BackupBundle, feeRecipient:string): Promise<string> {

        let flush = true
        let ipfsDirectory = `/export/${exportBundle.channel._id}`
        let gitDirectory = this.gitService.getBaseDir(exportBundle.channel)

        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.images.length },
            animations: { saved: 0, total: exportBundle.animations.length },
        
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
        
        //Clear 
        try {
            await this.ipfsService.ipfs.files.read(ipfsDirectory)
            await this.ipfsService.ipfs.files.rm(ipfsDirectory,  { recursive: true, flush: true})
        } catch (ex) { }

        //Save images
        await this._publishImages(publishStatus, ipfsDirectory, gitDirectory, exportBundle.images, true)

        //Save animations
        await this._publishAnimations(publishStatus, ipfsDirectory, gitDirectory, exportBundle.animations, true)


        //Get directory cids
        let imageDirectory = await this.getImageDirectoryCid(ipfsDirectory)
        let animationDirectory = await this.getAnimationDirectoryCid(ipfsDirectory)

        await this._publishNFTMetadata(publishStatus, ipfsDirectory, gitDirectory, exportBundle.channel, exportBundle.items, animationDirectory, imageDirectory, true)





        //Save contract metadata
        let contractMetadataPath = `${ipfsDirectory}/contractMetadata.json`
        let contractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient, imageDirectory)

        //Adding and then copying otherwise the CID does not match what we'd expect. 
        // let contractResult = await this.ipfsService.ipfs.add({
        //     content: new TextEncoder().encode(JSON.stringify(contractMetadata))
        // })

        // await this.ipfsService.ipfs.files.cp(`/ipfs/${contractResult.cid.toString()}`, contractMetadataPath, { create: true, parents: true, flush:flush })

        //IPFS
        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush:flush })
        
        //Write to Git
        await this.gitService.writeFile(`${gitDirectory}/backup/export/contractMetadata.json`, new TextEncoder().encode(JSON.stringify(contractMetadata)))




        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath)
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`)

        //Write channels backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)))
        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)

        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)))
        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)

        //Write items backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/items.json`,  new TextEncoder().encode(JSON.stringify(backup.items)) , { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/items.json`, new TextEncoder().encode(JSON.stringify(backup.items)))
        publishStatus.backups.items.saved = backup.items.length
        this.logPublishProgress(publishStatus)

        //Write images backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(backup.images)) , { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/images.json`, new TextEncoder().encode(JSON.stringify(backup.images)))
        publishStatus.backups.images.saved = backup.images.length
        this.logPublishProgress(publishStatus)

        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(backup.animations)) , { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/animations.json`, new TextEncoder().encode(JSON.stringify(backup.animations)))
        publishStatus.backups.animations.saved = backup.animations.length
        this.logPublishProgress(publishStatus)

        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/themes.json`,  new TextEncoder().encode(JSON.stringify(backup.themes)) , { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/themes.json`, new TextEncoder().encode(JSON.stringify(backup.themes)))
        publishStatus.backups.themes.saved = backup.themes.length
        this.logPublishProgress(publishStatus)

        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${ipfsDirectory}/backup/static-pages.json`,  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , { create: true, parents: true, flush: flush })
        await this.gitService.writeFile(`${gitDirectory}/backup/export/backup/static-pages.json`, new TextEncoder().encode(JSON.stringify(backup.staticPages)))
        publishStatus.backups.staticPages.saved = backup.staticPages.length
        this.logPublishProgress(publishStatus)

        this.logPublishProgress(publishStatus, `Flushing to IPFS...`)
        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

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

    private async _publishAnimations(publishStatus:PublishStatus, ipfsDirectory:string, gitDirectory:string, animations:Animation[], flush: boolean) {

        //Save animation cids
        let animationContents = animations?.map( animation => { return { content: animation.content } })
                
        if (animationContents?.length > 0) {

            this.logPublishProgress(publishStatus, `Exporting ${animationContents.length} animations`)

            for (let animationContent of animationContents) {

                const result = await this.ipfsService.ipfs.add(animationContent)


                //Get animation from export
                let animation = animations.filter( i => i.cid == result.cid.toString())[0]
                    
                let filename = `${ipfsDirectory}/animations/${animation.cid}.html`

                await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { parents: true, flush: flush })


                //Save to git
                await this.gitService.writeFile(`${gitDirectory}/backup/export/animations/${animation.cid}.html`, animationContent.content)


                if (result.cid.toString() !== animation.cid.toString()) {
                    throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.cid.toString()}`)
                }

                publishStatus.animations.saved++

                this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to ${ipfsDirectory}/animations/${animation.cid}.html (${animation.cid})`)


            }

        }


    }

    private async _publishImages(publishStatus:PublishStatus, ipfsDirectory:string, gitDirectory:string, images:Image[], flush: boolean) {

        /** Using IPFS addAll was causing issues with bigger files.  */

        for (let i of images) {
            
            //Add to IPFS
            const result = await this.ipfsService.ipfs.add({
                content: await this.imageService.getImageContent(i)
            })

            //Get image from export
            let image = images.filter( i => i.cid == result.cid.toString())[0]

            //Move to MFS directory in IPFS
            let filename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 
            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { create: true, parents: true, flush:flush })

            
            //Save to git
            await this.gitService.writeFile(`${gitDirectory}/backup/export/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}`, await this.imageService.getImageContent(i))



            //Validate cid
            if (result.cid.toString() != i.cid) {    
                throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.cid.toString()}`)
            }

            publishStatus.images.saved++

            this.logPublishProgress(publishStatus, `Saving image to ${filename} (${image.cid})`)


        }




    }

    private async _publishNFTMetadata(publishStatus:PublishStatus, ipfsDirectory:string, gitDirectory:string, channel:Channel, items:Item[], animationDirectoryCid:string, imageDirectoryCid:string, flush:boolean) {

        this.logPublishProgress(publishStatus, `Exporting ${items.length} metadata files`)


        let metadataNFTMap = {}

        for (let item of items) {

            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage, animationDirectoryCid, imageDirectoryCid)
            
            let content = new TextEncoder().encode(JSON.stringify(nftMetadata))

            metadataNFTMap[await Hash.of(content)] = nftMetadata


            const result = await this.ipfsService.ipfs.add({
                content: new TextEncoder().encode(JSON.stringify(nftMetadata))
            })


            let nft = metadataNFTMap[result.cid.toString()]

            let nftMetadataPath = `${ipfsDirectory}/metadata/${nft.tokenId}.json`

            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, nftMetadataPath, { create: true, parents: true, flush:flush })


            //Save to git
            await this.gitService.writeFile(`${gitDirectory}/backup/export/metadata/${nft.tokenId}.json`, new TextEncoder().encode(JSON.stringify(nftMetadata)))


            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${nft.tokenId} to ${nftMetadataPath}`)

        }


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