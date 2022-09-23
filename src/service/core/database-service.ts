import { injectable } from 'inversify';

import PouchDB from 'pouchdb';
import PouchFind from 'pouchdb-find'


@injectable()
class DatabaseService {

    dbCache = {}

    constructor() {
        //Enable find plugin
        PouchDB.plugin(PouchFind)

        // PouchDB.replicate(`./pouch/0x98de44fe4fb29d4b0a44df46836cbd9b62670fcc-item`, 'http://localhost:5984/items', {live: true});


    }


    async getDatabase(walletAddress:string, name:string, changesets?:Changeset[]) {

        const fullName = `./pouch/${walletAddress}-${name}`

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

        let result = {
            _id: _id,
            _rev: results.rows[0].value.rev,
            _deleted: true
        }

        return result

        // let r = await db.get(_id, {
        //     rev: results.rows[0].value.rev,
        //     deleted: 'ok',
        //     style: 'all_docs'
        // })

        // console.log(result)
        // console.log(r)

        // return r
        

        // console.log(results)

        // return result



        // const viaChanges = await db.changes({
        //     live: false,
        //     since: 0,
        //     doc_ids: [_id],
        //     style: 'all_docs'
        // })

        // // console.log(JSON.stringify(viaChanges))

        // if (viaChanges.results?.length > 0) {

        //     let lastRevision = viaChanges.results.map( result => result.changes[0].rev)

        //     console.log(JSON.stringify(lastRevision))

        //     // return db.get(_id, {
        //     //     rev: lastRevision[0],
        //     //     deleted: 'ok',
        //     //     style: 'all_docs'
        //     // })
            
        // }

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