import { IpfsHost } from "../dto/ipfs-host"
import { injectable } from "inversify"
import { Changeset, DatabaseService } from "../service/core/database-service"


@injectable()
class IpfsHostRepository {

    changesets:Changeset[] = [{
        id: '0',
        changeset: async (db) => {
            //Create indexes
            await db.createIndex({ index: { fields: ['dateCreated'] } })
        }
    }]

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load() {
        this.db = await this.databaseService.getDatabase("ipfs-host", this.changesets)
    }
    async get(): Promise<IpfsHost> {
        return Object.assign(new IpfsHost(), await this.db.get("single"))
    }

    async put(ipfsHost: IpfsHost) {

        //Force it to have the 'single' id
        ipfsHost._id = "single"

        await this.db.put(ipfsHost)
    }

}

export {
    IpfsHostRepository
}