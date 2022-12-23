// // import axios from "axios";
// import axios from "axios";
// import { inject, injectable } from "inversify";
// import { ERCEvent } from "../../dto/erc-event.js";
// import { RowItemViewModel } from "../../dto/item-page.js";

// import { SchemaService } from "../core/schema-service.js";
// import { ERCEventService } from "../erc-event-service.js";
// import { ItemService } from "../item-service.js";

// @injectable()
// class EventWebService {

//     @inject("SchemaService")
//     private schemaService:SchemaService
    
//     @inject("ERCEventService")
//     private ercEventService:ERCEventService

//     @inject("ItemService")
//     private itemService:ItemService

//     constructor(
//         @inject("baseURI") private baseURI
//     ) {}

//     async get(_id:string) : Promise<ERCEventViewModel> {

//         await this.schemaService.load(["erc-events"])

//         let ercEvent:ERCEvent = await this.ercEventService.get(_id)

//         return this.translateErcEventToViewModel(ercEvent)

//     }



//     async listFrom(limit:number, startId?:string) : Promise<ERCEventViewModel[]> {

//         await this.schemaService.load(["erc-events"])

//         if (!startId) {
//             let result = await axios.get(`${this.baseURI}sync/events/latest.json`)
//             startId = result.data._id
//         }

//         return this.translateErcEventsToViewModels(await this.ercEventService.listFrom(limit, startId))

//     }

//     async listTo(limit:number, startId?:string) : Promise<ERCEventViewModel[]> {

//         await this.schemaService.load(["erc-events"])

//         return this.translateErcEventsToViewModels(await this.ercEventService.listTo(limit, startId))

//     }


//     async listByTokenFrom(tokenId:number, limit:number, startId?:string) : Promise<ERCEventViewModel[]> {

//         await this.schemaService.load(["erc-events"])

//         if (!startId) {
//             let result = await axios.get(`${this.baseURI}sync/tokens/${tokenId}.json`)
//             startId = result.data.latestErcEventId
//         }

//         return this.translateErcEventsToViewModels(await this.ercEventService.listByTokenFrom(limit, startId))

//     }

//     async listByTokenTo(limit:number, startId?:string) : Promise<ERCEventViewModel[]> {

//         await this.schemaService.load(["erc-events"])

//         return this.translateErcEventsToViewModels(await this.ercEventService.listByTokenTo(limit, startId))

//     }

//     async translateErcEventToViewModel(ercEvent:ERCEvent) : Promise<ERCEventViewModel>{

//         let result:ERCEventViewModel = {
//             ercEvent: ercEvent,
//         }

//         if (ercEvent.tokenId) {
//             let matches= await this.itemService.getRowItemViewModelsByTokenIds([ercEvent.tokenId])
//             result.rowItemViewModel = matches[0]
//         }
    
//         return result
//     }

//     async translateErcEventsToViewModels(ercEvents:ERCEvent[]) : Promise<ERCEventViewModel[]> {

//         let results:ERCEventViewModel[] = []

//         for (let event of ercEvents) {
//             results.push(await this.translateErcEventToViewModel(event))
//         }

//         return results
//     }

// }


// interface ERCEventViewModel {
//     ercEvent?:ERCEvent
//     rowItemViewModel?:RowItemViewModel
// }

// export {
//     EventWebService
// }