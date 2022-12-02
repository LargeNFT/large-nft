import { ERCEvent } from "../dto/erc-event.js"


interface ERCEventRepository {
    get(_id:string): Promise<ERCEvent>
    put(ercEvent:ERCEvent) : Promise<void>
    getByTokenId(tokenId:number, limit:number, skip:number): Promise<ERCEvent[]> 
    list(limit: number, skip: number): Promise<ERCEvent[]> 

}

export {
    ERCEventRepository
}
