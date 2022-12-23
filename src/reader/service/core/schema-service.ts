import { inject, injectable } from "inversify"
import { AnimationRepository } from "../../repository/animation-repository.js"
import { AttributeTotalRepository } from "../../repository/attribute-total-repository.js"
import { AuthorRepository } from "../../repository/author-repository.js"
import { BlockRepository } from "../../repository/block-repository.js"
import { ChannelRepository } from "../../repository/channel-repository.js"
import { ComponentStateRepository } from "../../repository/component-state-repository.js"
import { ContractStateRepository } from "../../repository/contract-state-repository.js"
// import { ERCEventRepository } from "../../repository/erc-event-repository.js"
import { ImageRepository } from "../../repository/image-repository.js"
import { ItemRepository } from "../../repository/item-repository.js"
import { ProcessedTransactionRepository } from "../../repository/processed-transaction-repository.js"
import { ReaderSettingsRepository } from "../../repository/reader-settings-repository.js"
import { StaticPageRepository } from "../../repository/static-page-repository.js"
import { TokenOwnerRepository } from "../../repository/token-owner-repository.js"
import { TokenRepository } from "../../repository/token-repository.js"
import { TransactionRepository } from "../../repository/transaction-repository.js"


@injectable()
class SchemaService {

    @inject("ItemRepository")
    private itemRepository:ItemRepository 

    @inject("ChannelRepository")
    private channelRepository:ChannelRepository

    @inject("AuthorRepository")
    private authorRepository:AuthorRepository

    @inject("ImageRepository")
    private imageRepository:ImageRepository
    
    @inject("AnimationRepository")
    private animationRepository:AnimationRepository

    @inject("StaticPageRepository")
    private staticPageRepository:StaticPageRepository

    @inject("ReaderSettingsRepository")
    private readerSettingsRepository:ReaderSettingsRepository


    @inject("ContractStateRepository")
    private contractStateRepository:ContractStateRepository

    // @inject("ERCEventRepository")
    // private ercEventRepository:ERCEventRepository

    @inject("AttributeTotalRepository")
    private attributeTotalRepository:AttributeTotalRepository

    @inject("ComponentStateRepository")
    private componentStateRepository:ComponentStateRepository

    @inject("TokenOwnerRepository")
    private tokenOwnerRepository:TokenOwnerRepository

    @inject("TransactionRepository")
    private transactionRepository:TransactionRepository

    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    @inject("TokenRepository")
    private tokenRepository:TokenRepository

    @inject("BlockRepository")
    private blockRepository:BlockRepository

    constructor() {

    }

    async load(dbs:string[]) {

        const repositories = []

        repositories.push(this.itemRepository)
        repositories.push(this.channelRepository)
        repositories.push(this.authorRepository)
        repositories.push(this.imageRepository)
        repositories.push(this.animationRepository)
        repositories.push(this.staticPageRepository)
        repositories.push(this.readerSettingsRepository)

        repositories.push(this.staticPageRepository)
        repositories.push(this.readerSettingsRepository)

        repositories.push(this.contractStateRepository)
        // repositories.push(this.ercEventRepository)
        repositories.push(this.attributeTotalRepository)
        repositories.push(this.componentStateRepository)
        repositories.push(this.tokenOwnerRepository)
        repositories.push(this.transactionRepository)
        repositories.push(this.blockRepository)
        repositories.push(this.tokenRepository)
        repositories.push(this.processedTransactionRepository)

        for (let db of dbs) {

            let repo = repositories.filter( r => r.dbName == db)[0]

            if (!repo) continue

            if (!repo.db) {
                await repo.load()
            }
            
        }

    }

    async loadWallet(walletAddress:string) {

        console.log(`Loading wallet: ${walletAddress}`)




        //Open and cache databases
        // await this.authorRepository.load(walletAddress)
        // await this.channelRepository.load(walletAddress)
        // await this.imageRepository.load(walletAddress)
        // await this.itemRepository.load(walletAddress)
        // await this.pinningApiRepository.load(walletAddress)
        // await this.gitlabRepository.load(walletAddress)
        // await this.animationRepository.load(walletAddress)
        // await this.themeRepository.load(walletAddress)
        // await this.staticPageRepository.load(walletAddress)
        // await this.ipfsHostRepository.load(walletAddress)

    }



}

export {
    SchemaService
}