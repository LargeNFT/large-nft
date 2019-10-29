class PagingService {

    getPages(total, offset, limit) : Page[] {

        let pages:Page[] = []

        let numPages = ( (total -1) / limit ) + 1
        let currentPage = (offset / limit) + 1

        // console.log(numPages)
        // console.log(currentPage)
  
        for (let i=1; i <= numPages; i++) {
          pages.push({
            num: i,
            active: i == currentPage
          })
        }

        return pages
    }

}


class Page {
    num:number
    active:boolean
}

export {
    PagingService, Page
}
