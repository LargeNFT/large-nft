import { Web3Exception } from "../exceptions/Web3Exception";
import { ValidationException } from "../exceptions/ValidationException";
import { Listing } from "../dto/listing";

class WhitepagesService {

    constructor(
        private contract: any
    ) {}

    
    async read(address: string) : Promise<string> {

        let cid:string

        try {
            cid = await this.contract.read(address);
        } catch (ex) {
            console.log(ex)
            throw new Web3Exception(ex)
        }

        return cid

    }

    async readByIndex(index:number) {

        let result: {
            owner: string,
            orbitCid: string 
        }

        try {
            result = await this.contract.readByIndex(index);
        } catch (ex) {
            throw new Web3Exception(ex)
        }

        if (!result) {
            throw new Web3Exception(new Error("Empty result from 'readByIndex' contract call"))
        }

        return result;

    }

    async readList(limit, offset) : Promise<Listing[]> {

        let items:Listing[] = [];

        let currentCount = await this.count();
        if (currentCount <= 0) return items


        this.validateLimitOffset(limit, offset, currentCount);
        let endIndex = this.calculateEndIndex(limit, offset, currentCount);


        try {

            for (var i=offset; i <= endIndex; i++) {
                items.push(await this.readByIndex(i));
            }

            return items;
        } catch (ex) {
            throw new Web3Exception(ex)
        }

    }

    async readListDescending(limit, offset) : Promise<Listing[]>  {

        let items:Listing[] = [];

        let currentCount = await this.count();

        if (currentCount <= 0) return items


        //Adjust the offset to start at the end of the list.
        let calculatedOffset = this.calculateDescendingOffset(offset, currentCount);


        this.validateLimitOffset(limit, calculatedOffset, currentCount);
        let endIndex = this.calculateDescendingEndIndex(limit, calculatedOffset);


        try {
            // console.log(`limit: ${limit}, offset: ${calculatedOffset}, endIndex: ${endIndex}, count: ${currentCount}`);
            for (var i=calculatedOffset; i >= endIndex; i--) {
                items.push(await this.readByIndex(i));
            }

            return items;
        } catch (ex) {
            throw new Web3Exception(ex)
        }

    }

    async count() {
        let result

        try {
            result = await this.contract.count()
        } catch (ex) {
            throw new Web3Exception(ex)
        }

        if (!result) {
            throw new Web3Exception(new Error("Empty result from callCount contract call"))
        }

        return result.toNumber();

    }

    async create(orbitCid) {

        try {
            return await this.contract.create(orbitCid);
        } catch (ex) {
            throw new Web3Exception(ex)
        }

    }

    async update(orbitCid) {

        try {
            return await this.contract.update(orbitCid);
        } catch (ex) {
            throw new Web3Exception(ex)
        }

    }


    validateLimitOffset(limit, offset, currentCount) {

        if (limit <= 0) {
            throw new ValidationException(`Negative limit given. Limit needs to be positive: ${limit}`)
        }

        if (offset < 0) {
            throw new ValidationException(`Negative offset provided. Offset needs to be positive: ${offset}`)
        }

        if (offset > 0 && offset >= currentCount) {
            throw new ValidationException(`Invalid offset provided. Offset must be lower than total number of records: offset: ${offset}, currrentCount: ${currentCount}`)
        }
    }

    calculateEndIndex(limit, offset, currentCount) {
        let endIndex = offset + limit - 1

        //If it's the last page don't go past the final record
        return Math.min( currentCount - 1,  endIndex )
    }


    calculateDescendingEndIndex(limit, offset) {
        let endIndex = offset - (limit - 1)

        //Don't go lower than 0
        return Math.max( 0,  endIndex )
    }

    calculateDescendingOffset(offset, currentCount) {

        let calculatedOffset = (currentCount - 1) - offset
        // console.log(`offset: ${offset}, currentCount: ${currentCount}, calculatedOffset: ${calculatedOffset}`)
        return Math.max( 0,  calculatedOffset )
    }



}

export {
    WhitepagesService
}