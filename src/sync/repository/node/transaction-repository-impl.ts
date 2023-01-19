import {  inject, injectable } from "inversify"
import { Transaction } from "../../dto/transaction.js"
import { TransactionRepository } from "../transaction-repository.js"


@injectable()
class TransactionRepositoryNodeImpl implements TransactionRepository {

    async get(_id: string): Promise<Transaction> {
        return Transaction.findByPk(_id)
    }

    async put(transaction: Transaction, options?:any): Promise<Transaction> {
        return transaction.save(options)
    }
  
    async putAll(transactions:Transaction[], options?:any) : Promise<void> {
        for (let transaction of transactions) {
            await this.put(transaction,options)
        }    
    }


    async list(limit: number, skip: number): Promise<Transaction[]> {

        return Transaction.findAll({
            limit: limit,
            offset: skip,
            order: [
                ['blockNumber', 'DESC'],
                ['transactionIndex', 'DESC']
            ]
        })

    }

    


}





export {
    TransactionRepositoryNodeImpl
}