import { injectable } from "inversify"
import { DatabaseService } from "../service/core/database-service.js"
import { Car } from "../dto/car.js"


@injectable()
class CarRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }

    async load(channelId:string) {
        this.db = await this.databaseService.getDatabase(`${channelId}-car`)
    }

    async loadEmpty(channelId:string) {
        this.db = await this.databaseService.getEmptyDatabase(`${channelId}-car`)
    }

    async get(_id: string): Promise<Car> {
        return Object.assign(new Car(), await this.db.get(_id))
    }

    async put(car: Car) {
        await this.db.put(car)
    }

    async delete(car: Car): Promise<void> {
        await this.db.remove(car)
    }

    async getByIds(ids:string[]) {
        let results = await this.db.allDocs({
            keys: ids,
            include_docs: true

        })

        return results.rows?.map( d => d.doc)
    }

}

export {
    CarRepository
}