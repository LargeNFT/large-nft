import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { TransactionRepository } from "../repository/transaction-repository.js"
import { Transaction } from "../dto/transaction.js"


@injectable()
class TransactionService {

    @inject("TransactionRepository")
    private transactionRepository:TransactionRepository

    constructor() {}


    async get(_id:string): Promise<Transaction> {        
        return this.transactionRepository.get(_id)
    }

    async put(transaction:Transaction) {

        if (!transaction._id) {
            transaction._id = transaction.transactionHash
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

}



export {
    TransactionService
}

