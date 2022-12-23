// import { ERCEvent } from "../dto/erc-event.js"
// import { Changeset } from "../service/core/database-service.js"


// interface ERCEventRepository {
//     get(_id:string): Promise<ERCEvent>
//     put(ercEvent:ERCEvent) : Promise<void>
//     putAll(ercEvents:ERCEvent[]) : Promise<void>
//     getByTokenIdDesc(tokenId:number, limit:number, skip:number): Promise<ERCEvent[]> 
//     list(limit: number, skip: number): Promise<ERCEvent[]> 
// }

// let changesets:Changeset[] = [
//     {
//         id: '0',
//         changeset: async (db) => {

//             await db.createIndex({
//                 index: {
//                     fields: ['event']
//                 }
//             })

//             await db.createIndex({
//                 index: {
//                     fields: ['blockNumber', 'logIndex'],
//                 }
//             })

//             await db.createIndex({
//                 index: {
//                     fields: ['tokenId', 'blockNumber', 'logIndex']
//                 }
//             })

//         }
//     }
// ]


// export {
//     ERCEventRepository, changesets
// }
