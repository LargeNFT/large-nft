import { injectable } from "inversify"
import { Theme } from "../dto/theme"
import { DatabaseService } from "../service/core/database-service"


@injectable()
class ThemeRepository {

    db: any

    constructor(
        private databaseService: DatabaseService
    ) { }


    async load(walletAddress: string) {
        this.db = await this.databaseService.getDatabase(walletAddress, "theme")
    }
    async get(_id: string): Promise<Theme> {
        return Object.assign(new Theme(), await this.db.get(_id))
    }

    async put(theme: Theme) {
        await this.db.put(theme)
    }

}

export {
    ThemeRepository
}