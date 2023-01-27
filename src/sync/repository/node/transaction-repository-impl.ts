import {  inject, injectable } from "inversify"
import { Transaction } from "../../dto/transaction.js"
import { TransactionRepository } from "../transaction-repository.js"


@injectable()
class TransactionRepositoryNodeImpl implements TransactionRepository {

    async get(_id: string): Promise<Transaction> {
        return Transaction.findByPk(_id)
    }

    async put(transaction: Transaction, options?:any): Promise<Transaction> {

        await transaction.save(options)
        return transaction
        
    }
  
    async putAll(transactions:Transaction[], options?:any) : Promise<void> {
        for (let transaction of transactions) {
            await this.put(transaction,options)
        }    
    }


    async list(limit: number, skip: number, options?:any): Promise<Transaction[]> {

        let query = {
            limit: limit,
            offset: skip,
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        }

        query = Object.assign(query, options)

        return Transaction.findAll(query)

    }

    


}





export {
    TransactionRepositoryNodeImpl
}