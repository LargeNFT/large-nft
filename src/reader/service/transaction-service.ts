import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { TransactionRepository } from "../repository/transaction-repository.js"
import { Transaction } from "../dto/transaction.js"
import { WalletService } from "./core/wallet-service.js"


@injectable()
class TransactionService {

    @inject("TransactionRepository")
    private transactionRepository:TransactionRepository

    @inject("WalletService")
    private walletService:WalletService

    constructor() {}


    async get(_id:string): Promise<Transaction> {        

        
        let transaction

        try {
            transaction = await this.transactionRepository.get(_id)
        } catch(ex) {}

        if (!transaction) {

            try {

                transaction = new Transaction()
                transaction._id = _id

                //Download it.
                let data = await this.walletService.provider.getTransaction(_id)

                transaction.data = data.data
                transaction.hash = data.hash 
                transaction.blockHash = data.blockHash
                transaction.blockNumber = data.blockNumber
                transaction.transactionIndex = data.transactionIndex
                transaction.from = data.from
                transaction.gasLimit = data.gasLimit
                transaction.gasPrice = data.gasPrice
                transaction.nonce = data.nonce
                transaction.value = data.value
                transaction.networkId = data.networkId
                transaction.r = data.r
                transaction.s = data.s
                transaction.v = data.v
                transaction.raw = data.raw

                transaction.ercEvents = {}
                transaction.previousByTokenIds = {}
                transaction.nextByTokenIds = {}

            } catch(ex) {
                console.log(ex)
            }
        }

        return transaction
    }

    async put(transaction:Transaction) {

        if (!transaction._id) {
            transaction._id = transaction.hash
            transaction.dateCreated = new Date().toJSON()
        }

        transaction.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(transaction, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.transactionRepository.put(transaction)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(transactions:Transaction[]) {

        //Update lastUpdated
        transactions.forEach(e => e.lastUpdated = new Date().toJSON())

        return this.transactionRepository.putAll(transactions)
    }


    async listFrom(limit:number, startId:string) : Promise<Transaction[]> {

        let results:Transaction[] = []

        while (results?.length < limit && startId) {

            let transaction:Transaction = await this.transactionRepository.get(startId)

            results.push(transaction)

            let previousId = transaction?.previousId

            //Get the previous
            if (previousId) {

                //See 
                transaction = await this.transactionRepository.get(previousId)

                if (transaction?._id != previousId) break

            } else {
                transaction = undefined
            }

            startId = transaction?._id
        }

        return results

    }

    async listTo(limit:number, startId:string) : Promise<Transaction[]> {

        let results:Transaction[] = []

        while (results?.length < limit && startId) {

            let transaction:Transaction = await this.transactionRepository.get(startId)

            results.push(transaction)

            let nextId = transaction?.nextId

            //Get the previous
            if (nextId) {

                //See 
                transaction = await this.transactionRepository.get(transaction.nextId)

                if (transaction?._id != nextId) break

            } else {
                transaction = undefined
            }

            startId = transaction?._id
        }

        return results

    }


    async listByTokenFrom(tokenId:number, limit:number, startId:string) : Promise<Transaction[]> {

        let results:Transaction[] = []

        while (results?.length < limit && startId) {

            let transaction:Transaction = await this.transactionRepository.get(startId)

            results.push(transaction)

            let previousByTokenId = transaction?.previousByTokenIds[tokenId]

            //Get the previous
            if (previousByTokenId) {

                //See 
                transaction = await this.transactionRepository.get(transaction?.previousByTokenIds[tokenId])

                if (transaction?._id != previousByTokenId) break

            } else {
                transaction = undefined
            }

            startId = transaction?._id
        }

        return results

    }

    async listByTokenTo(tokenId:number, limit:number, startId:string) : Promise<Transaction[]> {

        let results:Transaction[] = []

        while (results?.length < limit && startId) {

            let transaction:Transaction = await this.transactionRepository.get(startId)

            results.push(transaction)

            let nextByTokenId = transaction?.nextByTokenIds[tokenId]

            //Get the previous
            if (nextByTokenId) {

                //See 
                transaction = await this.transactionRepository.get(transaction?.nextByTokenIds[tokenId])

                if (transaction?._id != nextByTokenId) break

            } else {
                transaction = undefined
            }

            startId = transaction?._id
        }

        return results

    }

    async getLatest() : Promise<Transaction> {
        let l = await this.transactionRepository.list(1, 0)

        if (l?.length >0) {
            return Object.assign(new Transaction(), l[0])
        }

    }


}



export {
    TransactionService
}

