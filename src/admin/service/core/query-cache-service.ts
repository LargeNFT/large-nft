import { injectable } from "inversify"
import { QueryCacheRepository } from "../../repository/query-cache-repository.js"
import { QueryCache } from "../../dto/query-cache.js"




@injectable()
class QueryCacheService {

    constructor(
        private queryCacheRepository:QueryCacheRepository
    ) {}


    async put(queryCache:QueryCache) {
        
        if (!queryCache) {
            queryCache = new QueryCache()
            queryCache.dateCreated = new Date().toJSON()
        } 

        queryCache.lastUpdated = new Date().toJSON()

        await this.queryCacheRepository.put(queryCache)
    }

    async get(queryName:string) : Promise<QueryCache> {
        return this.queryCacheRepository.get(queryName)
    }

    async delete(_id:string) {
        console.log(_id)
        await this.queryCacheRepository.delete(_id)
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

            let cachedResult = await queryCacheService.get(cacheQueryName)
            if (cachedResult && !cachedResult.stale) return cachedResult.result
    

            // call the original function
            let result
            if (Array.isArray(arguments)) {
                result = await originalValue.apply(this, ...arguments)
            } else {
                result = await originalValue.apply(this, arguments)
            }

            if (!cachedResult) {
                cachedResult = {
                    _id: cacheQueryName
                }
            }

            cachedResult.result = result
            cachedResult.stale = false

            await queryCacheService.put(cachedResult)

            return result
    
        }
    }
}




export {
    QueryCacheService, cacheQuery
}