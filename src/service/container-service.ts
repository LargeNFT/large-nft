
const { getMainContainer } = require("../inversify.config")

class ContainerService {

    static getInstance(clazz) {
        
        let container = getMainContainer()

        return container.get(clazz)
    }

    static getContainer() {
        return getMainContainer()
    }

}

export {
    ContainerService
}