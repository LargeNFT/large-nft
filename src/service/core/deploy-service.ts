import { Contract, ethers } from "ethers";
import { inject, injectable } from "inversify";
import { PromiseView } from "../../util/promise-view";
import { WalletService } from "./wallet-service";
import { QueueService } from "./queue_service";

@injectable()
class DeployService {
    
    constructor(
        @inject("contracts") private contracts,
        private walletService:WalletService,
        private queueService:QueueService
    ) {}

    async deployWords() {
        console.log(`Deploying Words`)

        return this.deployContract('Words')
    }

    async deployBaseballs(mlbcAddress:string) {

        console.log(`Deploying Baseballs with MLBC address ${mlbcAddress}`)

        return this.deployContract('Baseballs', [mlbcAddress])
    }

    async deployTokenUri(wordsAddress:string) {

        console.log(`Deploying TokenUri with Words address ${wordsAddress}`)

        return this.deployContract('TokenUri', [wordsAddress])

    }

    async deployBaseballWords(wordsAddress:string, baseballsAddress:string, tokenUriAddress:string) {

        console.log(`
            Deploying BaseballWords with: 
            Words address ${wordsAddress}
            Baseballs address ${baseballsAddress}
            TokenUri address ${tokenUriAddress}
        `)

        return this.deployContract('BaseballWords', [
            wordsAddress, 
            baseballsAddress,
            tokenUriAddress
            ]
        )

    }


    async deployContract(name, options?) {
        
        if (!this.walletService.wallet) throw new Error("No wallet!")

        const c = this.contracts[name]
        
        const factory = new ethers.ContractFactory(c.abi, c.bytecode, this.walletService.wallet)

    
        let contract 
        if (options) {
            contract = await factory.deploy( ...options )
        } else {
            contract = await factory.deploy()
        }

       

        let promiseView:PromiseView = {
            title: `Deploying contract ${name}. Waiting for transaction to be mined.`,
            promise: contract.deployTransaction.wait()
        }

        //Wait for it to be mined
        return this.queueService.queuePromiseView(promiseView)

    }

}

export { DeployService }