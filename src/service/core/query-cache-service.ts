import { injectable } from "inversify"
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
            queryCache.dateCreated = new Date().toJSON()
        } 

        queryCache.result = result
        queryCache.lastUpdated = new Date().toJSON()

        await db.put(queryCache)
    }

    async get(db:any, queryName:string) {

        let queryCacheId = `_local/query_${queryName}`

        // console.log(queryCacheId)

        let queryCache:QueryCache 

        try {
            queryCache = await db.get(queryCacheId)
        } catch(ex) {}

        // console.log(queryCache)

        return queryCache

    }

    async clear(db:any, queryName:string) {

        let cache = await this.get(db, queryName)

        if (cache) {
            try {
                await db.remove(cache)
            } catch(ex) {
                console.log(ex)
            }
        }

    }


}



function cacheQuery(queryName: string) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        
        const serializeArgs = (...args: any[]) =>
            args
            .map((arg: any) => arg?.toString())
            .join(':')

        const originalValue = descriptor.value;
    
        descriptor.value = async function () { 

            const serializedArguments = serializeArgs(...arguments)

            let queryCacheService = globalThis.container.get(QueryCacheService)

            let cacheQueryName = `${queryName}_${serializedArguments}`

            let cachedResult = await queryCacheService.get(this.db, cacheQueryName)
            if (cachedResult) return cachedResult.result
    
            // call the original function
            let result
            if (Array.isArray(arguments)) {
                result = await originalValue.apply(this, ...arguments)
            } else {
                result = await originalValue.apply(this, arguments)
            }
            
            await queryCacheService.put(this.db, cacheQueryName, result)

            return result
    
        }
    }
}




export {
    QueryCacheService, cacheQuery
}