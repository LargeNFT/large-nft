import { inject, injectable } from "inversify";
import { AttributeTotal } from "../dto/attribute-total.js";
import { Channel } from "../dto/channel.js";
import { Item } from "../dto/item.js";
import { AttributeTotalRepository } from "../repository/attribute-total-repository.js";

@injectable()
class AttributeTotalService {

    @inject("AttributeTotalRepository")
    private attributeTotalRepository:AttributeTotalRepository

    constructor() {}

    async get(_id:string): Promise<AttributeTotal> {      
        return this.attributeTotalRepository.get(_id)
    }

    async put(attributeTotal:AttributeTotal) : Promise<void> {
        return this.attributeTotalRepository.put(attributeTotal)
    }

    async getByIds(ids:string[]) : Promise<AttributeTotal[]> {
        return this.attributeTotalRepository.getByIds(ids)
    }

    async list() : Promise<AttributeTotal[]> {
        return this.attributeTotalRepository.list()
    }

    async buildAttributeTotals(channel:Channel, items:Item[]) : Promise<AttributeTotal[]> {

        let totals:AttributeTotal[] = []
        
        //Build starting total objects.
        let totalKeys = new Set(items.map( item => item.attributeSelections.map( as => `${as.traitType}:::${as.value}`) ).flat())


        for (let totalKey of totalKeys) {

            let attributeTotal:AttributeTotal = {
                _id: totalKey,
                traitType: totalKey.substring(0, totalKey.indexOf(":::")),
                value: totalKey.substring(totalKey.indexOf(":::") + 3, totalKey.length ),
                count: 0,
                tokenIds: []
            }

            totals.push(attributeTotal)

        }



        //Loop through the items
        for (let item of items) {

            for (let as of item.attributeSelections) {
                
                //Find the matching AttributeTotal
                let total:AttributeTotal = totals.filter( at => at.traitType == as.traitType && at.value == as.value)[0]

                // console.log(as.traitType, as.value, totals.filter( at => at.traitType == as.traitType))

                //Add one to the report total
                total.tokenIds.push(item.tokenId)
                total.count++
            }

        }

        //Loop through keys and calculate totals for each one.
        for (let total of totals) {
            total.categoryPercent = new Intl.NumberFormat('default', {
                style: 'percent',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format((total.count / channel.itemCount))
        }



        //Sort totals by count
        totals.sort((a,b) => b.count - a.count)


        return totals
    }


}

export {
    AttributeTotalService
}