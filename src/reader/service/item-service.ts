import { inject, injectable } from "inversify";
import { Item } from "../dto/item.js";
import { RowItemViewModel } from "../dto/item-page.js";
import { ItemRepository } from "../repository/item-repository.js";
import { AttributeTotal } from "../dto/attribute-total.js";
import { AttributeTotalService } from "./attribute-total-service.js";
import { Channel } from "../dto/channel.js";

@injectable()
class ItemService {

    @inject("ItemRepository")
    private itemRepository:ItemRepository
    
    @inject("AttributeTotalService")
    private attributeTotalService:AttributeTotalService

    constructor(
    ) { }

    async get(_id: string): Promise<Item> {
        return this.itemRepository.get(_id)
    }
    
    async list(skip: number, limit?:number): Promise<Item[]> {
        return this.itemRepository.list(skip, limit)
    }

    async query(query:string) {
        return this.itemRepository.query(query)
    }
    
    async all() {
        return this.itemRepository.all()
    }
    
    async getByTokenId(tokenId:number) : Promise<Item> {
        return this.itemRepository.getByTokenId(tokenId)
    }

    async getByTokenIds(tokenIds:number[]) : Promise<Item[]> {
        return this.itemRepository.getByTokenIds(tokenIds)
    }

    async getRowItemViewModelsByTokenIds(tokenIds:number[]) : Promise<RowItemViewModel[]> {
        return this.itemRepository.getRowItemViewModelsByTokenIds(tokenIds)    
    }


    async listByTokenId(startTokenId:number, limit:number=10) {
        return this.itemRepository.listByTokenId(startTokenId, limit)
    }


    async buildAttributeTotals(channel:Channel) : Promise<AttributeTotal[]> {

        let items:Item[] = await this.all()

        return this.attributeTotalService.buildAttributeTotals(channel, items)
    }

}

export {
    ItemService
}