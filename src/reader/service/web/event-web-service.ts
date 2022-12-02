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
    ) {}

    async getHomeEventList() : Promise<ERCEvent[]> {

        await this.schemaService.load(["erc-events"])

        return this.ercEventService.list(100, 0)
    }

}

export {
    EventWebService
}