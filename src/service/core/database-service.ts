import { injectable } from 'inversify';

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find'
import { ChannelRepository } from '../../repository/channel-repository';
import { ItemRepository } from '../../repository/item-repository';


@injectable()
class DatabaseService {

    dbCache = {}

    constructor() {
        //Enable find plugin
        PouchDB.plugin(PouchFind)
    }



    async getDatabase(walletAddress:string, name:string, buildIndexes?:Function) {

        const fullName = `./pouch/${walletAddress}-${name}`


        if (this.dbCache[fullName]) return this.dbCache[fullName]

        //Create or open database
        this.dbCache[fullName] = new PouchDB(fullName)

        const details = await this.dbCache[fullName].info()

        //If it's empty build the indexes
        if (details.doc_count == 0 && details.update_seq == 0) {

            //Create indexes
            if (buildIndexes) {
                console.log(`Creating indexes for ${fullName}`)
                await buildIndexes(this.dbCache[fullName])
            }
        }



        return this.dbCache[fullName]

    }





}

export {
    DatabaseService
}