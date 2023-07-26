import { inject, injectable } from "inversify";

import { ItemPage } from "../dto/item-page.js";
import { ItemPageRepository } from "../repository/item-page-repository.js";

@injectable()
class ItemPageService {

    @inject("ItemPageRepository")
    private itemPageRepository:ItemPageRepository
  
    constructor(
    ) { }

    async get(pageNumber: number): Promise<ItemPage> {
        return this.itemPageRepository.get(pageNumber)
    }
    
}

export {
    ItemPageService
}