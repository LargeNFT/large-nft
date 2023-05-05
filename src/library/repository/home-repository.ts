import { HomeViewModel } from "./web/home-repository-impl.js"

interface HomeRepository {
    get(pageNumber:number): Promise<HomeViewModel>
}



export {
    HomeRepository
}
