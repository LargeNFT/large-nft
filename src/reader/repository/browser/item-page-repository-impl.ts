import axios from "axios"
import { inject, injectable } from "inversify"
import { ItemPage } from "../../dto/item-page.js"
import { ItemPageRepository } from "../item-page-repository.js"

@injectable()
class ItemPageRepositoryBrowserImpl implements ItemPageRepository {

    constructor(
        @inject("baseURI") private baseURI,
        @inject("hostname") private hostname
    ) {}

    async get(pageNumber: number): Promise<ItemPage> {   

        const response = await axios.get(`${this.hostname}${this.baseURI}itemPages/${pageNumber}.json`)
            
        return response.data
    }

}

export {
    ItemPageRepositoryBrowserImpl
}


