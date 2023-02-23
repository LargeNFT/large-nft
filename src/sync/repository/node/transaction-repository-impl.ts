import {  inject, injectable } from "inversify"
import { Transaction } from "../../dto/transaction.js"
import { TransactionRepository } from "../transaction-repository.js"

import { createRequire } from 'module'
const require = createRequire(import.meta.url)

const { Op } = require("sequelize")

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

    async remove(transaction:Transaction, options?:any) : Promise<void> {
        await transaction.destroy(options)
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

    
    async findBetweenBlocks(startBlock: number, endBlock: number, options?: any): Promise<Transaction[]> {

        let query = {
            where: {
                blockNumber: {
                    [Op.and]: {
                        [Op.gte]: startBlock,
                        [Op.lte]: endBlock
                    }
                }
            }
        }

        query = Object.assign(query, options)

        return Transaction.findAll(query)

    }



}





export {
    TransactionRepositoryNodeImpl
}