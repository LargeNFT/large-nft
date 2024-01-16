import { inject, injectable } from "inversify"

import Hash from 'ipfs-only-hash'
import { CID, CarWriter } from '@ipld/car/writer'

import { Channel } from "../../dto/channel.js"


import { BackupBundle, ExportBundle } from "../../dto/export-bundle.js"
import { Image } from "../../dto/image.js"

import { PublishStatus } from "../../dto/viewmodel/publish-status.js"
import { ChannelService } from "../channel-service.js"
import { ImageService } from "../image-service.js"
import { ItemService } from "../item-service.js"

import { IpfsService } from "./ipfs-service.js"

import { ExportService } from "./export-service.js"
import { ContractMetadata } from "../../dto/contract-metadata.js"

import { AnimationService } from "../animation-service.js"
import { Item } from "../../dto/item.js"


@injectable()
class PublishIPFSService {

    constructor(
        private channelService: ChannelService,
        private itemService: ItemService,
        private ipfsService: IpfsService,
        private imageService: ImageService,
        private animationService:AnimationService,
        private exportService:ExportService,
    ) { }

    async exportToIPFS(exportBundle:ExportBundle, backup:BackupBundle, feeRecipient:string): Promise<CID> {

        let ipfsDirectory = this.getIPFSDirectory(exportBundle.channel)

        try {
            let stat = await this.ipfsService.heliaStat(ipfsDirectory)
            await this.ipfsService.heliaRm(ipfsDirectory)
        } catch(ex) {}


        await this.ipfsService.heliaMkDir(`${ipfsDirectory}`, { force: true })



        let publishStatus:PublishStatus = {

            contractMetadata: { saved: 0, total: 1 },
            
            nftMetadata: { saved: 0, total: exportBundle.items.length },
            images: { saved: 0, total: exportBundle.imageCids.length  },
            animations: { saved: 0, total: exportBundle.animationCids.length},
        
            backups: {
                channels: { saved: 0, total: 1 },
                authors: { saved: 0, total: 1 }, 
                items: { saved: 0, total: backup.itemCount },
                images: { saved: 0, total: exportBundle.imageCids.length },
                animations: { saved: 0, total: exportBundle.animationCids.length },
                themes: { saved: 0, total: backup.themeCount },
                staticPages: { saved: 0, total: backup.staticPageCount }
            }
        }


        //Save images
        await this._publishImages(publishStatus, ipfsDirectory, exportBundle.imageCids)

        //Save animations
        await this._publishAnimations(publishStatus, ipfsDirectory, exportBundle.animationCids)

        //Save metadata
        await this._publishNFTMetadata(publishStatus, ipfsDirectory, exportBundle.channel, exportBundle.items)

        //Save contract metadata
        let contractMetadataPath = `${ipfsDirectory}/contractMetadata.json`
        let contractMetadata:ContractMetadata = await this.channelService.exportContractMetadata(exportBundle.channel, feeRecipient)

        //IPFS
        let addContractResult = await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(contractMetadata)), contractMetadataPath  )
        
        publishStatus.contractMetadata.saved = 1
        this.logPublishProgress(publishStatus, `Saving contract metadata to ${contractMetadataPath} (${addContractResult.toString()})`)


        await this.ipfsService.heliaMkDir(`${ipfsDirectory}/backup`)


        //Write channels backup
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.channels)), `${ipfsDirectory}/backup/channels.json`  )

        publishStatus.backups.channels.saved = 1
        this.logPublishProgress(publishStatus)


        //Write authors backup
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.authors)), `${ipfsDirectory}/backup/authors.json`  )

        publishStatus.backups.authors.saved = 1
        this.logPublishProgress(publishStatus)


        //Write items backup
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.items)), `${ipfsDirectory}/backup/items.json` )

        publishStatus.backups.items.saved = backup.itemCount
        this.logPublishProgress(publishStatus)


        //Write original metadata backup       
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.originalMetadata)), `${ipfsDirectory}/backup/originalMetadata.json` )

        //Write images backup
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.images)) , `${ipfsDirectory}/backup/images.json` )

        publishStatus.backups.images.saved = backup.imageCount
        this.logPublishProgress(publishStatus)


        //Write animations backup
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.animations)) , `${ipfsDirectory}/backup/animations.json` )

        publishStatus.backups.animations.saved = backup.animationCount
        this.logPublishProgress(publishStatus)


        //Write themes backup        
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.themes)) , `${ipfsDirectory}/backup/themes.json` )

        publishStatus.backups.themes.saved = backup.themeCount
        this.logPublishProgress(publishStatus)


        //Write staticPages backup        
        await this.ipfsService.heliaAdd(  new TextEncoder().encode(JSON.stringify(backup.staticPages)) , `${ipfsDirectory}/backup/static-pages.json` )

        publishStatus.backups.staticPages.saved = backup.staticPageCount
        this.logPublishProgress(publishStatus)


        let stat = await this.ipfsService.heliaStat(ipfsDirectory)


        this.logPublishProgress(publishStatus, `Published to local IPFS at ${stat.cid.toString()}`)


        return stat.cid

    }

    async exportContractToIPFS(channel:Channel, contract:Buffer, contractABI:Buffer, largeConfig): Promise<CID> {

        let ipfsDirectory = `/contract/${this.getIPFSDirectory(channel)}`

        try {
            let stat = await this.ipfsService.heliaStat(ipfsDirectory)
            await this.ipfsService.heliaRm(ipfsDirectory)
        } catch(ex) {}


        await this.ipfsService.heliaMkDir(`${ipfsDirectory}`, { force: true })

        //Contract

        //Contract ABI
        //Large config

        //IPFS
        await this.ipfsService.heliaAdd(  contract, `${ipfsDirectory}/contract.json`  )
        await this.ipfsService.heliaAdd(  contractABI, `${ipfsDirectory}/contract-abi.json`  )
        await this.ipfsService.heliaAdd(  largeConfig , `${ipfsDirectory}/large-config.json`  )

        let stat = await this.ipfsService.heliaStat(ipfsDirectory)

        let publishStatus:PublishStatus = {
            contractMetadata: undefined,
            nftMetadata: undefined,
            images: undefined,
            animations: undefined,
            backups: {
                channels: undefined,
                authors: undefined,
                items: undefined,
                images: undefined,
                animations: undefined,
                themes: undefined,
                staticPages: undefined
            }
        }

        this.logPublishProgress(publishStatus, `Published to local IPFS at ${stat.cid.toString()}`)


        return stat.cid

    }


    getIPFSDirectory(channel:Channel) {
        return `/export/${channel._id}`
    }

    private async _publishAnimations(publishStatus:PublishStatus, ipfsDirectory:string, animationCids:string[]) {

        this.logPublishProgress(publishStatus, `Exporting ${animationCids.length} animations`)

        await this.ipfsService.heliaMkDir(`${ipfsDirectory}/animations`)


        for (let animationCid of animationCids) {

            let animation = await this.animationService.get(animationCid)

            let ipfsFilename = `${ipfsDirectory}/animations/${animation.cid}.html`


            const result = await this.ipfsService.heliaAdd(new TextEncoder().encode(animation.content), ipfsFilename)

            if (result.toString() !== animation.cid.toString()) {
                throw new Error(`Incorrect cid when saving animation. Expected: ${animation.cid}, Result: ${result.toString()}`)
            }

            this.logPublishProgress(publishStatus, `Saving animation #${publishStatus.animations.saved} to /animations/${animation.cid}.html (${animation.cid})`)

            publishStatus.animations.saved++

        }

    }

    private async _publishImages(publishStatus:PublishStatus, ipfsDirectory:string, imageCids:string[]){

        await this.ipfsService.heliaMkDir(`${ipfsDirectory}/images`)

        for (let imageCid of imageCids) {
            
            let image = await this.imageService.get(imageCid)

            let ipfsFilename = `${ipfsDirectory}/images/${image.cid}.${image.buffer ? 'jpg' : 'svg'}` 

            //Add to IPFS
            const result = await this.ipfsService.heliaAdd(await this.imageService.getImageContent(image), ipfsFilename)

            //Validate cid
            if (result.toString() != image.cid) {    
                throw new Error(`Incorrect cid when saving image. Expected: ${image.cid}, Result: ${result.toString()}`)
            }

            this.logPublishProgress(publishStatus, `Saving image to ${ipfsFilename} (${result.toString()})`)

            publishStatus.images.saved++

        }

    }

    private async _publishNFTMetadata(publishStatus:PublishStatus, ipfsDirectory:string, channel:Channel, items:Item[])  {

        this.logPublishProgress(publishStatus, `Exporting ${items.length} metadata files`)

        await this.ipfsService.heliaMkDir(`${ipfsDirectory}/metadata`)

        let metadataNFTMap = {}

        for (let theItem of items) {

            let item = this.exportService.prepareItem(theItem)

            let ipfsFilename = `${ipfsDirectory}/metadata/${item.tokenId}.json`


            let coverImage:Image = await this.imageService.get(item.coverImageId)
            let nftMetadata = await this.itemService.exportNFTMetadata(channel, item, coverImage)
            
            let content = new TextEncoder().encode(JSON.stringify(nftMetadata))
            let contentCid = await Hash.of(content)

            metadataNFTMap[contentCid] = nftMetadata

            const result = await this.ipfsService.heliaAdd(content, ipfsFilename)

            publishStatus.nftMetadata.saved++

            this.logPublishProgress(publishStatus, `Saving #${item.tokenId} to ${ipfsFilename}`)

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
    cid: CID
}

export {
    PublishIPFSService, CidInfo
}