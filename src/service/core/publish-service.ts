import { BigNumber, ethers } from "ethers"
import { inject, injectable } from "inversify"
import { Channel } from "../../dto/channel"
import { Animation } from "../../dto/animation"
import { Item } from "../../dto/item"

import { BackupBundle, ExportBundle } from "../../dto/export-bundle"
import { Image } from "../../dto/image"

import { PublishStatus } from "../../dto/viewmodel/publish-status"
import { ChannelService } from "../channel-service"
import { ImageService } from "../image-service"
import { ItemService } from "../item-service"

import { IpfsService } from "./ipfs-service"
import TYPES from "./types"
import { WalletService } from "./wallet-service"
import { AnimationService } from "../animation-service"


import { ExportService } from "./export-service"
import { NFTMetadata } from "dto/nft-metadata"


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private exportService:ExportService,
        @inject(TYPES.WalletService) private walletService: WalletService,
        @inject("contracts") private contracts,
    ) { }

    async publishToIPFS(channel: Channel) {

        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.exportService.prepareExport(channel, this.walletService.address)

        this.logPublishProgress(undefined, "Preparing backup...")
        let backup:BackupBundle = await this.exportService.createBackup(exportBundle)

        console.log('Backup created')



        let cid: string = await this.exportToIPFS(exportBundle, backup)


        //Update local cid info
        Object.assign(channel, await this.channelService.get(channel._id))

        channel.localCid = cid
        channel.localPubDate = new Date().toJSON()

        await this.channelService.put(channel)

    }


    async exportToIPFS(exportBundle:ExportBundle, backup:BackupBundle): Promise<string> {

        let flush = true
        let directory = `/export/${exportBundle.channel._id}`


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
            await this.ipfsService.ipfs.files.read(directory)
            await this.ipfsService.ipfs.files.rm(directory,  { recursive: true, flush: true})
        } catch (ex) { }

        //Save images
        await this._publishImages(publishStatus, directory, exportBundle.images, true)

        //Save animations
        await this._publishAnimations(publishStatus, directory, exportBundle.animations, true)


        //Get directory cids
        let imageDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/images/`, {
            hash: true
        })

        let animationDirectory = await this.ipfsService.ipfs.files.stat(`${directory}/animations/`, {
            hash: true
        })

        await this._publishNFTMetadata(publishStatus, directory, exportBundle.channel, exportBundle.items, animationDirectory.cid.toString(), imageDirectory.cid.toString(), true)


        //Save contract metadata
        let contractMetadataPath = `${directory}/contractMetadata.json`
        let contractMetadata = await this.channelService.exportContractMetadata(
            exportBundle.channel, 
            exportBundle.channel.forkType == "existing" ? exportBundle.channel.forkedFromFeeRecipient : exportBundle.ownerAddress, 
            imageDirectory.cid.toString()
        )

        //Adding and then copying otherwise the CID does not match what we'd expect. 
        // let contractResult = await this.ipfsService.ipfs.add({
        //     content: new TextEncoder().encode(JSON.stringify(contractMetadata))
        // })

        // await this.ipfsService.ipfs.files.cp(`/ipfs/${contractResult.cid.toString()}`, contractMetadataPath, { create: true, parents: true, flush:flush })

        await this.ipfsService.ipfs.files.write(contractMetadataPath, new TextEncoder().encode(JSON.stringify(contractMetadata)), { create: true, parents: true, flush:flush })





        let stat = await this.ipfsService.ipfs.files.stat(contractMetadataPath)
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${stat.cid})`)



        //Write channels backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/channels.json`, new TextEncoder().encode(JSON.stringify(backup.channels)), { create: true, parents: true, flush: flush })
        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)


        //Write authors backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/authors.json`, new TextEncoder().encode(JSON.stringify(backup.authors)), { create: true, parents: true, flush: flush })
        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)

        //Write items backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/items.json`,  new TextEncoder().encode(JSON.stringify(backup.items)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.items.saved = backup.items.length
        this.logPublishProgress(publishStatus)

        //Write images backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/images.json`,  new TextEncoder().encode(JSON.stringify(backup.images)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.images.saved = backup.images.length
        this.logPublishProgress(publishStatus)

        //Write animations backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/animations.json`,  new TextEncoder().encode(JSON.stringify(backup.animations)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.animations.saved = backup.animations.length
        this.logPublishProgress(publishStatus)

        //Write themes backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/themes.json`,  new TextEncoder().encode(JSON.stringify(backup.themes)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.themes.saved = backup.themes.length
        this.logPublishProgress(publishStatus)

        //Write staticPages backup
        await this.ipfsService.ipfs.files.write(`${directory}/backup/static-pages.json`,  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , { create: true, parents: true, flush: flush })
        publishStatus.backups.staticPages.saved = backup.staticPages.length
        this.logPublishProgress(publishStatus)


        await this.ipfsService.ipfs.files.flush(`/export/${exportBundle.channel._id}/`)


        let result = await this.ipfsService.ipfs.files.stat(`/export/${exportBundle.channel._id}/`, {
            hash: true
        })

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${result.cid.toString()}`)

        return result.cid.toString()

    }


    private async _publishAnimations(publishStatus:PublishStatus, directory:string, animations:Animation[], flush: boolean) {

        //Save animation cids
        let animationContents = animations?.map( animation => { return { content: animation.content } })
                
        for await (const result of this.ipfsService.ipfs.addAll(animationContents)) {

            //Get animation from export
            let animation = animations.filter( i => i.cid == result.cid.toString())[0]

            let filename = `${directory}/animations/${animation.cid}.html`

            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { parents: true, flush: flush })

            if (result.cid.toString() !== animation.cid.toString()) {
                throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.cid.toString()}`)
            }

            publishStatus.animations.saved++

            this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to ${directory}/animations/${animation.cid}.html (${animation.cid})`)
            
        }

    }

    private async _publishImages(publishStatus:PublishStatus, directory:string, images:Image[], flush: boolean) {

        let imageContents = images?.map( image => {

            let content

            if (image.buffer) {
                content = image.buffer?.data ? image.buffer?.data : image.buffer //difference between browser and node buffer?
            } else if (image.svg) {
                content = image.svg
            }

            return {
                content: content
            }

        })

        for await (const result of this.ipfsService.ipfs.addAll(imageContents)) {

            //Get image from export
            let image = images.filter( i => i.cid == result.cid.toString())[0]

            let filename = `${directory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, filename, { create: true, parents: true, flush:flush })
    
            //Validate cid
            if (result.cid.toString() != image.cid) {    
                throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.cid.toString()}`)
            }

            publishStatus.images.saved++

            this.logPublishProgress(publishStatus, `Saving image to ${filename} (${image.cid})`)

        }


    }

    private async _publishNFTMetadata(publishStatus:PublishStatus, directory:string, channel:Channel, items:Item[], animationDirectoryCid:string, imageDirectoryCid:string, flush:boolean) {


        //Save metadata for each NFT
        for (let item of items) {

            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nft = await this.itemService.exportNFTMetadata(channel, item, coverImage, animationDirectoryCid, imageDirectoryCid)
            
            
            let nftMetadataPath = `${directory}/metadata/${nft.tokenId}.json`


            //Adding and then copying otherwise the CID does not match what we'd expect. 
            // let result = await this.ipfsService.ipfs.add({
            //     content: new TextEncoder().encode(JSON.stringify(nft))
            // })

            // await this.ipfsService.ipfs.files.cp(`/ipfs/${result.cid.toString()}`, nftMetadataPath, { create: true, parents: true, flush:flush })
            await this.ipfsService.ipfs.files.write(nftMetadataPath, new TextEncoder().encode(JSON.stringify(nft)), { create: true, parents: true, flush:flush })




            let stat = await this.ipfsService.ipfs.files.stat(nftMetadataPath)

            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${nft.tokenId} to ${nftMetadataPath} (${stat.cid})`)

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