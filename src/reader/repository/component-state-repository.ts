import { ComponentState } from "../dto/component-state.js"


interface ComponentStateRepository {
    get(_id:string): Promise<ComponentState>
    put(componentState:ComponentState) : Promise<void>
}

export {
    ComponentStateRepository
}
