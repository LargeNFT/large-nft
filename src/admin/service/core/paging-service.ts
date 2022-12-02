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
    buildPagingViewModel(offset: number, limit: number, count: number, numberOfPages:number) : PagingViewModel {

        let viewModel = new PagingViewModel()

        viewModel.offset = offset ? offset : 0
        viewModel.limit = limit
        viewModel.count = count 

        viewModel.start = viewModel.offset + 1


        viewModel.end = Math.min(viewModel.offset + limit, count) 

        
        viewModel.previousOffset = Math.max(viewModel.offset-limit, 0);

        if ( (viewModel.offset + limit) < count ) {
            viewModel.nextOffset = viewModel.offset + limit
        }

        
        //Set current page
        viewModel.page = viewModel.offset/viewModel.limit + 1
        if (viewModel.page > viewModel.endPage) viewModel.page = viewModel.endPage

        viewModel.endPage = Math.ceil(viewModel.count / viewModel.limit)


        viewModel.lastOffset = viewModel.endPage * viewModel.limit - viewModel.limit
        

        viewModel.showNext = viewModel.endPage > viewModel.page
        viewModel.showPrevious = viewModel.offset != 0

        viewModel.showFirst = viewModel.page > 2
        viewModel.showLast = viewModel.page < (viewModel.endPage - 1)


        //Number of pages shouldn't be past the end
        // numberOfPages = Math.min(numberOfPages, viewModel.endPage - viewModel.page)

        // viewModel.pageNumbers = []
        // for (let i=viewModel.page; i < numberOfPages + viewModel.page; i++) {
        //     viewModel.pageNumbers.push({
        //         display: i + 1,
        //         offset: i * viewModel.limit
        //     })
        // }

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
    pageNumbers:PageNumber[]
    endPage:number

    offset: number
    limit: number
    count: number

    start: number
    end: number 

    previousOffset: number 
    nextOffset: number 
    lastOffset:number

    showPrevious:boolean
    showNext:boolean
    showFirst:boolean
    showLast:boolean

}

interface PageNumber {
    display:number
    offset:number
}

export {
    PagingService,
    PagingViewModel
}
