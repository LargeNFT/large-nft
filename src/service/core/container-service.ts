
import { container } from "../../inversify.config.js"
import TYPES from "./types.js"
import { WalletService } from "./wallet-service.js"

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