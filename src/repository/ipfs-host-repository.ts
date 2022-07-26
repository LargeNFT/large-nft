import { IpfsHost } from "../dto/ipfs-host"
import { injectable } from "inversify"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class IpfsHostRepository {

    CREATE_INDEXES = async (db) => {

        //Create indexes
        await db.createIndex({ index: { fields: ['dateCreated'] } })
        
    }

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "ipfs-host", this.CREATE_INDEXES)
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