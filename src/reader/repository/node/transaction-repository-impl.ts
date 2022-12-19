import { ethers } from "ethers"
import {  inject, injectable } from "inversify"
import { Transaction } from "../../dto/transaction.js"
import { DatabaseService } from "../../service/core/database-service.js"
import { WalletService } from "../../service/core/wallet-service.js"
import { TransactionRepository } from "../transaction-repository.js"


@injectable()
class TransactionRepositoryNodeImpl implements TransactionRepository {

    db:any
    dbName:string = "transactions"

    @inject('DatabaseService')
    private databaseService:DatabaseService

    @inject('WalletService')
    private walletService:WalletService


    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
        })
    }



    async get(_id: string): Promise<Transaction> {

        let transaction

        try {
            transaction = await this.db.get(_id)
        } catch(ex) {}

        if (!transaction) {

            try {

                transaction = new Transaction()

                //Download it.
                transaction.data = await this.walletService.provider.getTransaction(_id)
                transaction._id = _id

                //Save it
                await this.db.put(transaction)


            } catch(ex) {
                console.log(ex)
            }
        }

        return Object.assign(new Transaction(), transaction)
    }


    async put(transaction: Transaction): Promise<void> {
        await this.db.put(transaction)
    }
  


}





export {
    TransactionRepositoryNodeImpl
}