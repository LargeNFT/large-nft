import { injectable } from "inversify";

@injectable()
class PagingService {
    
    constructor() {}

    /**
     * This function takes in a limit, offset, and count and generates a model 
     * 
     * @param offset 
     * @param limit 
     * @param count 
     */
    buildPagingViewModel(offset: number, limit: number, count: number) : PagingViewModel {

        let viewModel = new PagingViewModel()

        viewModel.offset = offset ? offset : 0
        viewModel.limit = limit
        viewModel.count = count 

        viewModel.start = viewModel.offset + 1


        viewModel.end = Math.min(viewModel.offset + limit, count) 

        viewModel.previousOffset = Math.max(viewModel.offset-limit, 0);

        if ( (viewModel.offset + limit) < count -1) {
            viewModel.nextOffset = viewModel.offset + limit
        }

        viewModel.showNext = viewModel.end != viewModel.count
        viewModel.showPrevious = viewModel.offset != 0

        viewModel.page = Math.ceil(viewModel.end / limit)

        return viewModel
    }



    calculateEndIndex(limit, offset, currentCount) {
        let endIndex = offset + limit - 1

        //If it's the last page don't go past the final record
        return Math.min( currentCount - 1,  endIndex )
    }


    calculateDescendingEndIndex(limit, offset) {
        let endIndex = offset - (limit - 1)

        //Don't go lower than 0
        return Math.max( 0,  endIndex )
    }

    calculateDescendingOffset(offset, currentCount) {

        let calculatedOffset = (currentCount - 1) - offset
        // console.log(`offset: ${offset}, currentCount: ${currentCount}, calculatedOffset: ${calculatedOffset}`)
        return Math.max( 0,  calculatedOffset )
    }


}

class PagingViewModel {

    page:number
    offset: number
    limit: number
    count: number

    start: number
    end: number 

    previousOffset: number 
    nextOffset: number 

    showPrevious:boolean
    showNext:boolean

}


export {
    PagingService,
    PagingViewModel
}
