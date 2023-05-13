import axios from "axios"
import { inject, injectable } from "inversify"
import { HomeRepository } from "../home-repository.js"


@injectable()
class HomeRepositoryBrowserImpl implements HomeRepository {

    constructor(
        @inject('libraryURL') private libraryURL
    ) {}

    async get(pageNumber: number): Promise<HomeViewModel> {   
        const response = await axios.get(`${this.libraryURL}/home.json`)
            
        return response.data
    }

}

interface HomeViewModel {
    
}

export {
    HomeRepositoryBrowserImpl, HomeViewModel
}


