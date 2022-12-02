
interface ItemPage {
    items?:RowItemViewModel[]
}

interface ItemResults {
    items?:RowItemViewModel[]
    totalMatches?:number 
    limit?:number
    skip?:number
}

interface RowItemViewModel {
    _id:string
    title:string
    coverImageId:string
    coverImageGenerated:boolean 
    tokenId:number

}

export {
    ItemPage, RowItemViewModel, 
    ItemResults
}