import axios from "axios"
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

    @inject('baseURI') 
    private baseURI

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            initialRecords: false,
            changesets: changesets
        })
    }

    constructor() {}


    async get(_id:string): Promise<ERCEvent> {        

        let event

        try {
            event = await this.db.get(_id)
        } catch(ex) {}

        if (!event) {
            try {
                //Download it.
                let result = await axios.get(`${this.baseURI}sync/events/${_id}.json`)
                event = result.data

                //Save it
                await this.db.put(event)


            } catch(ex) {
                console.log(ex)
            }
        }

        return Object.assign(new ERCEvent(), event)

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
                },
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


}





export {
    ERCEventRepositoryBrowserImpl
}