import { RowItemViewModel } from "../dto/item-page.js"

interface RowItemViewModelRepository {
    load() 
    get(_id: string): Promise<RowItemViewModel> 
    put(item: RowItemViewModel) 
    getByTokenIds(ids:number[]) : Promise<RowItemViewModel[]>


}

export {
    RowItemViewModelRepository
}
