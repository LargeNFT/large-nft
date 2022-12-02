import { AttributeTotal } from "../dto/attribute-total.js"

interface AttributeTotalRepository {
    get(_id:string): Promise<AttributeTotal>
    getByIds(ids:string[]) : Promise<AttributeTotal[]>
    put(attributeTotal:AttributeTotal) : Promise<void>
    list() : Promise<AttributeTotal[]> 

}



export {
    AttributeTotalRepository
}
