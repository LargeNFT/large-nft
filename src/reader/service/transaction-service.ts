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
                let transactionData = await this.walletService.provider.getTransaction(_id)
                let transactionReceiptData = await this.walletService.provider.getTransactionReceipt(_id)

                transaction._id = transactionData.hash
                transaction.data = transactionData.data
                transaction.hash = transactionData.hash 
                transaction.blockHash = transactionData.blockHash
                transaction.blockNumber = transactionData.blockNumber
                transaction.transactionIndex = transactionData.transactionIndex
                transaction.from = transactionData.from
                transaction.gasLimit = transactionData.gasLimit
                transaction.gasPrice = transactionData.gasPrice
                transaction.nonce = transactionData.nonce
                transaction.value = transactionData.value
                transaction.networkId = transactionData.networkId
                transaction.r = transactionData.r
                transaction.s = transactionData.s
                transaction.v = transactionData.v
                transaction.raw = transactionData.raw

                transaction.receipt = {
                    contractAddress: transactionReceiptData.contractAddress,
                    cumulativeGasUsed: transactionReceiptData.cumulativeGasUsed,
                    effectiveGasPrice: transactionReceiptData.effectiveGasPrice,
                    gasUsed: transactionReceiptData.gasUsed,
                    logs: transactionReceiptData.logs
                }


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

