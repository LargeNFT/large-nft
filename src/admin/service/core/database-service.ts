import { inject, injectable } from 'inversify';


@injectable()
class DatabaseService {

    dbCache = {}

    constructor(
        @inject("pouch-prefix") private pouchPrefix:string,
        @inject('PouchDB') private PouchDB
    ) {}

    async getDatabase(name:string, changesets?:Changeset[]) {

        const fullName = `${this.pouchPrefix}-large-${name}`

        if (this.dbCache[fullName]) return this.dbCache[fullName]

        //Create or open database
        this.dbCache[fullName] = new this.PouchDB(fullName, { auto_compaction: true })

        const details = await this.dbCache[fullName].info()

        //Check if it's a brand new database
        let isEmpty = details.doc_count == 0 && details.update_seq == 0

        //If it's empty build the indexes
        if (isEmpty) {

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

    async getEmptyDatabase(name:string) {

        // const fullName = `${this.pouchPrefix}${ethers.utils.getAddress(walletAddress)}-${name}`
        const fullName = `${this.pouchPrefix}-large-${name}`

        //Create or open database
        this.dbCache[fullName] = new this.PouchDB(fullName, { auto_compaction: true })

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