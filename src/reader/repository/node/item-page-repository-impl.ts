import { inject, injectable } from "inversify"
import fs from "fs"
import { ItemPage } from "../../dto/item-page.js"
import { ItemPageRepository } from "../item-page-repository.js"

@injectable()
class ItemPageRepositoryNodeImpl implements ItemPageRepository {

    constructor(
        @inject('baseDir') private baseDir
    ) {}

    async get(pageNumber:number): Promise<ItemPage> {                
        return JSON.parse(fs.readFileSync(`${this.baseDir}/public/itemPages/${pageNumber}.json`, 'utf8'))
    }

}

export {
    ItemPageRepositoryNodeImpl
}


