import { inject, injectable } from "inversify"
import { Item } from "../../dto/item.js"
import fs from "fs"
import { ItemRepository, CHUNK_SIZE } from "../item-repository.js"
import { ItemPage, RowItemViewModel } from "../../dto/item-page.js"

@injectable()
class ItemRepositoryNodeImpl implements ItemRepository {

    static CHUNK_SIZE = CHUNK_SIZE

    items:Item[] = []

    dbName:string = "items"


    constructor(
        @inject('channelDir') private channelDir
    ) {}

    async getRowItemViewModelsByOwner(address: string, pageNumber: number): Promise<ItemPage> {
        throw new Error("Method not implemented.")
    }

    async getRowItemViewModelsByAttribute(traitType: string, value: string, pageNumber: number): Promise<ItemPage> {
        throw new Error("Method not implemented.")
    }

    async load() {
        this.items = JSON.parse(fs.readFileSync(`${this.channelDir}/backup/export/backup/items.json`, 'utf8'))
    }

    async get(_id: string): Promise<Item> {        
        
        let matches = this.items.filter( item => item._id == _id)

        if (matches?.length > 0) {
            return matches[0]
        }

        return matches[0]

    }

    async list(skip:number, limit?:number): Promise<Item[]> {
        return this.items.slice(skip, limit)
    }

    async getByTokenIds(ids:number[]) : Promise<Item[]> {
        return
    }

    async getRowItemViewModelsByTokenIds(tokenIds:number[]) : Promise<RowItemViewModel[]> {

        let items:RowItemViewModel[] = []

        for (let tokenId of tokenIds) {
            const response = fs.readFileSync(`${this.channelDir}/public/t/${tokenId}/rowItemViewModel.json`, 'utf8')
            items.push(JSON.parse(response))
        }

        return items

    }

    async getRowItemViewModelsByTokenId(tokenId:number) : Promise<RowItemViewModel> {

        const response = fs.readFileSync(`${this.channelDir}/public/t/${tokenId}/rowItemViewModel.json`, 'utf8')
        return JSON.parse(response)

    }


    async getByTokenId(tokenId:number) : Promise<Item> {

        let matches = this.items.filter( item => item.tokenId == tokenId)


        if (matches?.length > 0) {
            return matches[0]
        }

        return matches[0]
        
    }

    async listByTokenId(startTokenId:number, limit:number) : Promise<Item[]> {
        return []
    }

    async query(query:string) : Promise<Item[]> {
        return []
    }

    async all(): Promise<Item[]> {
        return this.items
    }


}

export {
    ItemRepositoryNodeImpl
}


