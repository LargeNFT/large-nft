
import { container } from "../../inversify.config"
import TYPES from "./types"
import { WalletService } from "./wallet-service"

class ContainerService {

    static getInstance(clazz) {
        
        return container.get(clazz)
    }

    static getContainer() {
        return container
    }

    static getWalletService() {
        return container.get<WalletService>(TYPES.WalletService)

    }


}

export {
    ContainerService
}