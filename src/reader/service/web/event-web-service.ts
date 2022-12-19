// import axios from "axios";
import axios from "axios";
import { inject, injectable } from "inversify";
import { ERCEvent } from "../../dto/erc-event.js";

import { SchemaService } from "../core/schema-service.js";
import { ERCEventService } from "../erc-event-service.js";

@injectable()
class EventWebService {

    @inject("SchemaService")
    private schemaService:SchemaService
    
    @inject("ERCEventService")
    private ercEventService:ERCEventService

    constructor(
        @inject("baseURI") private baseURI
    ) {}

    async listFrom(limit:number, startId?:string) : Promise<ERCEvent[]> {

        await this.schemaService.load(["erc-events"])

        if (!startId) {
            let result = await axios.get(`${this.baseURI}sync/events/latest.json`)
            startId = result.data._id
        }

        return this.ercEventService.listFrom(limit, startId)

    }

    async listTo(limit:number, startId?:string) : Promise<ERCEvent[]> {

        await this.schemaService.load(["erc-events"])

        return this.ercEventService.listTo(limit, startId)

    }

}




export {
    EventWebService
}