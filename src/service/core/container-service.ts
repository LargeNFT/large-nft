
import { getMainContainer } from "../../inversify-admin.config"
import TYPES from "./types"
import { WalletService } from "./wallet-service"

class ContainerService {

    static getInstance(clazz) {
        
        let container = getMainContainer()

        return container.get(clazz)
    }

    static getContainer() {
        return getMainContainer()
    }

    static getWalletService() {
        getMainContainer().get<WalletService>(TYPES.WalletService)

    }


}

export {
    ContainerService
}