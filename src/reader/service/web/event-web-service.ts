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

    async getLatestEvents() : Promise<ERCEvent[]> {

        await this.schemaService.load(["erc-events"])

        let result = await axios.get(`${this.baseURI}sync/events/latest.json`)

        let latest = result.data

        return this.ercEventService.listFrom(25, latest._id)

    }

}




export {
    EventWebService
}