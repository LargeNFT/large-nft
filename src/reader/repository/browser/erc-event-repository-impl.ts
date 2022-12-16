import {  inject, injectable } from "inversify"
import { ERCEvent } from "../../dto/erc-event.js"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"
import { ERCEventRepository, changesets } from "../erc-event-repository.js"


@injectable()
class ERCEventRepositoryBrowserImpl implements ERCEventRepository {


    db:any
    dbName:string = "erc-events"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }

    constructor() {}


    async get(_id:string): Promise<ERCEvent> {        
        return Object.assign(new ERCEvent(), await this.db.get(_id))
    }

    async put(ercEvent:ERCEvent) {
        await this.db.put(ercEvent)
    }

    async list(limit: number, skip: number): Promise<ERCEvent[]> {

        let response = await this.db.find({
            selector: { 
                "blockNumber": { 
                    $exists: true 
                },
                "logIndex": { 
                    $exists: true 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{blockNumber: 'desc'}, {logIndex: 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }

        return response.docs

    }




    async getByTokenIdDesc(tokenId:number, limit:number, skip:number) : Promise<ERCEvent[]> {
        
        let response = await this.db.find({
            selector: { 
                "tokenId": { 
                    $eq: tokenId 
                }
            },
            limit: limit,
            skip: skip,
            sort: [{blockNumber: 'desc'}, {logIndex: 'desc'}]
        })

        if (response.warning) {
            console.log(response.warning)
        }
        return response.docs


        // let result = await this.db.query(function (doc, emit) {

        //     let ids = []

        //     switch(doc.event) {
        
        //         case "Transfer":
        //         case "Approval":
        //             ids.push(doc.args[2])
        //             break
        //     }
        
        //     for (let tokenId of ids) {
        //         //@ts-ignore
        //         emit([ parseInt(tokenId), doc.blockNumber, doc.logIndex ])
        //     }


        //   }, {
        //     include_docs: true,
        //     startkey: [tokenId, 0, 0],
        //     endkey: [tokenId, {},{}]
        // })

        // return result.rows.map( row => row.doc)

    }


}





export {
    ERCEventRepositoryBrowserImpl
}