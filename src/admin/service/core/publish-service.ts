import { inject, injectable } from "inversify"

import { Channel } from "../../dto/channel.js"

import { BackupBundle, ExportBundle } from "../../dto/export-bundle.js"

import { PublishStatus } from "../../dto/viewmodel/publish-status.js"
import { ChannelService } from "../channel-service.js"

import TYPES from "./types.js"
import { WalletService } from "./wallet-service.js"

import { ExportService } from "./export-service.js"
import contractABI from '../../../../contracts.json' assert { type: "json" }
import { SettingsService } from "./settings-service.js"
import { PublishIPFSService } from "./publish-ipfs-service.js"

import { CID, CarWriter } from '@ipld/car/writer'
import { Car } from "../../dto/car.js"


@injectable()
class PublishService {

    constructor(
        private channelService: ChannelService,
        private exportService:ExportService,
        private settingsService:SettingsService,
        private publishIPFSService:PublishIPFSService,
        @inject(TYPES.WalletService) private walletService: WalletService
    ) { }

    async publish(channel: Channel, baseDir:string) : Promise<{cid:CID, car:Car}> {

        //First clear out the existing IPFS info
        delete channel.publishReaderIPFSStatus
        await this.channelService.put(channel)


        //Export metadata
        this.logPublishProgress(undefined, "Preparing export...")
        let exportBundle:ExportBundle = await this.exportService.prepareExport(channel, this.walletService.address)


        let feeRecipient = await this.getFeeReceipient(exportBundle.channel, exportBundle.ownerAddress)

        if (feeRecipient) {
            this.logPublishProgress(undefined, `Fee Recipient: ${feeRecipient}`)
        }

        this.logPublishProgress(undefined, "Preparing backup...")

        let backup:BackupBundle = await this.exportService.createBackup(exportBundle)


        this.logPublishProgress(undefined, "Exporting to IPFS...")

        let cid = await this.publishIPFSService.exportToIPFS(exportBundle, backup, feeRecipient)
            
        let car = await this.publishIPFSService.createCarFromCID("export", cid)

        return {
            cid: cid,
            car: car
        } 


    }

    async publishContract(channel:Channel) : Promise<Car> {

        let contract:Buffer
        let contractABIBuffer:Buffer
        let largeConfig:Buffer

        if (channel.contractAddress) {
                    
            contract = Buffer.from(JSON.stringify({ 
                contractAddress: channel.contractAddress,
                ipfsCid: channel.publishReaderIPFSStatus?.cid
            }))

            //Also the ABI
            contractABIBuffer = Buffer.from(JSON.stringify(contractABI))

        } else {
            contract =  Buffer.from(JSON.stringify({}))
            contractABIBuffer = Buffer.from(JSON.stringify({}))
        }

        let productionURIInfo = await this.getProductionURIInfo(channel)


        //Copy a large-config.json to GitHub
        largeConfig = Buffer.from(JSON.stringify({
            "showMintPage": channel.showMintPage,
            "showActivityPage": channel.showActivityPage,
            "hostname": channel.productionHostname ? channel.productionHostname : productionURIInfo?.hostname,
            "libraryURL": channel.productionBaseLibraryURI,
            "baseURL": channel.productionBaseURI ? channel.productionBaseURI : productionURIInfo?.baseURI,
            "externalLinks": channel.externalLinks,
            "marketplaces": channel.marketplaces
        }))


        let cid = await this.publishIPFSService.exportContractToIPFS(channel, contract, contractABIBuffer, largeConfig )


        return this.publishIPFSService.createCarFromCID("contract", cid)

    }
  
    public async getFeeReceipient(channel:Channel, ownerAddress:string) {

        let feeRecipient

        if (channel.forkType == "existing") {  
            if (channel.forkedFromFeeRecipient) {
                feeRecipient = channel.forkedFromFeeRecipient 
            }
        } else {
            feeRecipient = ownerAddress
        }

        return feeRecipient
    }

    //** TODO: Move to appropriate git services */
    private async getProductionURIInfo(channel) {

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
        
                if (!channel.httpUrlToRepo) return

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
        
        
                if (!channel.httpUrlToRepo) return

                return {
                    hostname: `https://${getGitHubUsername(channel.httpUrlToRepo)}.github.io`,
                    baseURI: `/${channel.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}/`
                }

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


interface FSAction {
    file_path: string
    content: any
    keepExisting?: boolean
}

export {
    PublishService
}