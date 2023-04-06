import { inject, injectable } from "inversify"
import fs from "fs"
import { ItemPage } from "../../dto/item-page.js"
import { ItemPageRepository } from "../item-page-repository.js"

@injectable()
class ItemPageRepositoryNodeImpl implements ItemPageRepository {

    constructor(
        @inject('channelDir') private channelDir
    ) {}

    async get(pageNumber:number): Promise<ItemPage> {                
        return JSON.parse(fs.readFileSync(`${this.channelDir}/public/itemPages/${pageNumber}.json`, 'utf8'))
    }

}

export {
    ItemPageRepositoryNodeImpl
}


