import { Item } from "../dto/item.js"
import { ItemPage, RowItemViewModel } from "../dto/item-page.js"

let CHUNK_SIZE = 10

interface ItemRepository {
    get(_id:string): Promise<Item>
    list(skip:number, limit?:number): Promise<Item[]>
    getByTokenId(tokenId:number) : Promise<Item>
    getByTokenIds(tokenIds:number[]) : Promise<Item[]>
    getRowItemViewModelsByAttribute(traitType:string, value:string, pageNumber:number) : Promise<ItemPage>
    getRowItemViewModelsByTokenIds(tokenIds:number[]) : Promise<RowItemViewModel[]>
    getRowItemViewModelsByTokenId(tokenId:number) : Promise<RowItemViewModel>
    query(query:string) : Promise<Item[]>
    all() : Promise<Item[]>
    listByTokenId(startTokenId:number, limit:number) : Promise<Item[]> 

}

export {
    ItemRepository, CHUNK_SIZE
}
