import { ItemPage } from "../dto/item-page.js"

interface ItemPageRepository {
    get(pageNumber:number): Promise<ItemPage>
}

export {
    ItemPageRepository
}
