import { ethers } from 'ethers';
import { inject, injectable } from 'inversify';

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find'


@injectable()
class DatabaseService {

    dbCache = {}

    constructor(
        @inject("pouch-prefix") private pouchPrefix:string
    ) {
        //Enable find plugin
        PouchDB.plugin(PouchFind)

        // console.log("Trying to replicate...")
        // // PouchDB.replicate(`./pouch/0x842439CbB838069d087904F87fa9762069b1aB55-item`, 'http://localhost:5984/items', {live: true});


        // const remote = new PouchDB('http://localhost:5984/items')
        // const local = new PouchDB(`./pouch/0x842439CbB838069d087904F87fa9762069b1aB55-item`)


        // const rep = local.replicate.to(remote, {
        //     live: true,
        //     retry: true
        //   }).on('change', function (info) {
        //     // handle change
        //     console.log(info)
        //   }).on('paused', function (err) {
        //     // replication paused (e.g. replication up to date, user went offline)
        //     console.log(err)

        //   }).on('active', function () {
        //     // replicate resumed (e.g. new changes replicating, user went back online)
        //     console.log('active')

        //   }).on('denied', function (err) {
        //     // a document failed to replicate (e.g. due to permissions)
        //     console.log(err)

        //   }).on('complete', function (info) {
        //     // handle complete
        //     console.log(info)

        //   }).on('error', function (err) {
        //     // handle error
        //     console.log(err)
        //   });

        //   console.log(rep)


    }


    async getDatabase(walletAddress:string, name:string, changesets?:Changeset[]) {

        const fullName = `${this.pouchPrefix}${ethers.utils.getAddress(walletAddress)}-${name}`

        if (this.dbCache[fullName]) return this.dbCache[fullName]

        //Create or open database
        this.dbCache[fullName] = new PouchDB(fullName, { auto_compaction: true })

        const details = await this.dbCache[fullName].info()

        //If it's empty build the indexes
        if (details.doc_count == 0 && details.update_seq == 0) {

            //Create indexes
            if (changesets) {

                console.log(`Creating indexes for ${fullName}`)

                let localChangesets:LocalChangeset = { 
                    _id: "_local/changesets",
                    ids: [] 
                }

                for (let changeset of changesets) {
                    await changeset.changeset(this.dbCache[fullName])
                    localChangesets.ids.push(changeset.id)
                    console.log(`New changeset detected...${changeset.id}`)
                }

                //Mark changesets as run
                await this.dbCache[fullName].put(localChangesets)

                
            }

        } else {

            //Otherwise check if each changeset has been applied and if not then apply it.
            if (changesets) {

                let localChangesets:LocalChangeset 

                try {
                    localChangesets = await this.dbCache[fullName].get("_local/changesets")
                } catch(ex) {}

                if (!localChangesets) {
                    localChangesets = { 
                        _id: "_local/changesets",
                        ids: [] 
                    }
                }


                let updated = false

                for (let changeset of changesets) {
                    
                    //If it hasn't been run then run it.
                    if (!localChangesets.ids.includes(changeset.id)) {

                        try {
                            //Execute the changes. This could fail if the changes have actually been applied but it wasn't marked. 
                            //But in that scenario we just accept the failure and mark it applied. 
                            await changeset.changeset(this.dbCache[fullName])
                        } catch(ex) { }
                        
                        
                        localChangesets.ids.push(changeset.id)
                        
                        updated = true
                        
                        console.log(`New changeset detected...${changeset.id}`)
                    }

                }


                if (updated) {
                    console.log(`Saving changeset log...`, localChangesets)
                    await this.dbCache[fullName].put(localChangesets)
                }   
            }
        }

        return this.dbCache[fullName]

    }

    async getLatestRevision(db, _id:string) {
        
        let latest

        try {
            latest = await db.get(_id)
        } catch(ex) {}

        if (latest) return latest

        let results = await db.allDocs({key: _id, include_docs: true, deleted: 'ok' })

        if (results.rows?.length > 0) {

            //Return a deleted representation
            let result = {
                _id: _id,
                _rev: results.rows[0].value.rev,
                _deleted: true
            }
    
            return result
    
        }

        

    }


}


interface Changeset {
    id:string
    changeset(db): Promise<void>
}

interface LocalChangeset {
    _id:string
    ids:string[]
}

export {
    DatabaseService, Changeset
}