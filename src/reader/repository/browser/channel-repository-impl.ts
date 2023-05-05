import axios from "axios"
import {  inject, injectable } from "inversify"
import { Channel } from "../../dto/channel.js"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"
import { ChannelRepository } from "../channel-repository.js"

@injectable()
class ChannelRepositoryBrowserImpl implements ChannelRepository {
    
    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {
            //Create indexes
            await db.createIndex({ index: { fields: ['dateCreated'] } })
            await db.createIndex({ index: { fields: ['lastUpdated'] } })
            
        }
    }]


    db:any
    dbName:string = "channels"

    @inject('DatabaseService')
    private databaseService: DatabaseService

    constructor(
        @inject("baseURI") private baseURI:Function,
        @inject("hostname") private hostname:Function
    ) {}

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        })
    }


    async get(): Promise<Channel> {        
        
        let channels = await this.db.allDocs({
            include_docs: true
        })

        let channel:Channel 

        //Find the first actual channel (skip design)
        for (let c of channels.rows) {
            if (c.doc.dateCreated) channel = c.doc
        }

        // console.log(channels)

        // let channel:Channel = channels.rows[0].doc
        // console.log(channel)

        const contractResponse = await axios.get(`${this.hostname()}${this.baseURI()}backup/contract/contract.json`)
        // console.log(contractResponse)

        if (contractResponse?.data) {
            channel.contractAddress = contractResponse.data.contractAddress
        }

        return channel
    }

}

export {
    ChannelRepositoryBrowserImpl
}