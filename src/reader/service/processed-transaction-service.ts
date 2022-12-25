import { inject, injectable } from "inversify"
import { validate, ValidationError } from "class-validator"
import { ValidationException } from "../util/validation-exception.js"
import { Transaction } from "../dto/transaction.js"
import { ProcessedTransaction } from "../dto/processed-transaction.js"
import { ProcessedTransactionRepository } from "../repository/processed-transaction-repository.js"


@injectable()
class ProcessedTransactionService {

    @inject("ProcessedTransactionRepository")
    private processedTransactionRepository:ProcessedTransactionRepository

    constructor() {}

    async get(_id:string) {
        return this.processedTransactionRepository.get(_id)
    }

    async put(processedTransaction:ProcessedTransaction) {

        processedTransaction.lastUpdated = new Date().toJSON()

        //Validate
        let errors: ValidationError[] = await validate(processedTransaction, {
            forbidUnknownValues: true,
            whitelist: true
        })

        if (errors.length > 0) {
            throw new ValidationException(errors)
        }

        return this.processedTransactionRepository.put(processedTransaction)
    }

    /**
     * No validation for speeeeeeeeed
     * @param ercEvents 
     * @returns 
     */
     async putAll(transactions:ProcessedTransaction[]) {

        //Update lastUpdated
        transactions.forEach(e => e.lastUpdated = new Date().toJSON())

        return this.processedTransactionRepository.putAll(transactions)
    }


    async listFrom(limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)
            results.push(processedTransaction)

            let previousId = processedTransaction?.previousId

            //Get the previous
            if (previousId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(previousId)

                if (processedTransaction?._id != previousId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listTo(limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextId = processedTransaction?.nextId

            //Get the previous
            if (nextId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction.nextId)

                if (processedTransaction?._id != nextId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }


    async listByTokenFrom(tokenId:number, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            // console.log(processedTransaction)

            results.push(processedTransaction)

            let previousByTokenId = processedTransaction?.previousByTokenIds[tokenId]

            //Get the previous
            if (previousByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTokenIds[tokenId])

                if (processedTransaction?._id != previousByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByTokenTo(tokenId:number, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTokenIds[tokenId]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTokenIds[tokenId])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    

    async listByAddressInitiatedFrom(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.previousByTransactionInitiatorId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTransactionInitiatorId[address])

                if (processedTransaction?._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressInitiatedTo(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTransactionInitiatorId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTransactionInitiatorId[address])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }




    async listByAddressFrom(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        console.log(startId)

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            console.log(processedTransaction)

            results.push(processedTransaction)

            let previousByTransactionInititatorId = processedTransaction?.previousByTokenOwnerId[address]

            //Get the previous
            if (previousByTransactionInititatorId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.previousByTokenOwnerId[address])

                if (processedTransaction?._id != previousByTransactionInititatorId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }

    async listByAddressTo(address:string, limit:number, startId:string) : Promise<ProcessedTransaction[]> {

        let results:ProcessedTransaction[] = []

        while (results?.length < limit && startId) {

            let processedTransaction:ProcessedTransaction = await this.processedTransactionRepository.get(startId)

            results.push(processedTransaction)

            let nextByTokenId = processedTransaction?.nextByTokenOwnerId[address]

            //Get the previous
            if (nextByTokenId) {

                //See 
                processedTransaction = await this.processedTransactionRepository.get(processedTransaction?.nextByTokenOwnerId[address])

                if (processedTransaction?._id != nextByTokenId) break

            } else {
                processedTransaction = undefined
            }

            startId = processedTransaction?._id
        }

        return results

    }



    async getLatest() : Promise<Transaction> {
        let l = await this.processedTransactionRepository.list(1, 0)

        if (l?.length >0) {
            return Object.assign(new Transaction(), l[0])
        }

    }


}



export {
    ProcessedTransactionService
}

