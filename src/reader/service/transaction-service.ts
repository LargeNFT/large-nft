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

    async get(_id:string) {
        return this.transactionRepository.get(_id)
    }

    async getOrDownload(_id:string): Promise<Transaction> {        
        
        let transaction

        try {
            transaction = await this.transactionRepository.get(_id)
        } catch(ex) {}

        if (!transaction) {

            try {

                transaction = new Transaction()
                
                //Download it.
                let data = await this.walletService.provider.getTransaction(_id)

                transaction._id = data.hash
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

                await this.transactionRepository.put(transaction)

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

