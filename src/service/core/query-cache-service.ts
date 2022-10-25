import { injectable } from "inversify"
import { getMainContainer } from "inversify.config"
import { QueryCache } from "../../dto/query-cache"




@injectable()
class QueryCacheService {

    constructor() {}


    async put(db, queryName:string, result:any) {

        let queryCacheId = `_local/query_${queryName}`
        
        let queryCache:QueryCache 

        try {
            queryCache = await db.get(queryCacheId)
        } catch(ex) {}

        if (!queryCache) {
            queryCache = new QueryCache()
            queryCache._id = queryCacheId
            queryCache.result = result
            queryCache.dateCreated = new Date().toJSON()
        } 

        queryCache.lastUpdated = new Date().toJSON()

        await db.put(queryCache)
    }

    async get(db:any, queryName:string) {

        let queryCacheId = `_local/query_${queryName}`


        let queryCache:QueryCache 

        try {
            queryCache = await db.get(queryCacheId)
        } catch(ex) {}

        return queryCache

    }

    async clear(db:any, queryName:string) {

        let queryCacheId = `_local/query_${queryName}`

        try {
            await db.remove(queryCacheId)
        } catch(ex) {}
    }


}



function cacheQuery(queryName: string) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const serializeArgs = (...args: any[]) =>
            args
            .map((arg: any) => arg.toString())
            .join(':')

        const originalValue = descriptor.value;
    
        descriptor.value = async function () { 

            const serializedArguments = serializeArgs(...arguments)

            console.log(serializedArguments)


            // let queryCacheService = globalThis.container.get(QueryCacheService)

            // let cacheQueryName = `${queryName}_${serializedArguments}`

            // let cachedResult = await queryCacheService.get(this.db, cacheQueryName)
            // if (cachedResult) return cachedResult.result
    
            // call the original function
            let result
            if (Array.isArray(arguments)) {
                result = await originalValue.apply(this, ...arguments)
            } else {
                result = await originalValue.apply(this, arguments)
            }

            console.log(result)
            
            // await queryCacheService.put(this.db, cacheQueryName, result)

            return result
    
        }
    }
}




export {
    QueryCacheService, cacheQuery
}