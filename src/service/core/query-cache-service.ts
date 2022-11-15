import { injectable } from "inversify"
import { QueryCacheRepository } from "../../repository/query-cache-repository"
import { QueryCache } from "../../dto/query-cache"




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

        let queryCache:QueryCache 

        try {
            queryCache = await this.queryCacheRepository.get(queryName)
        } catch(ex) {}

        return queryCache

    }

    async delete(_id:string) {
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
            if (cachedResult) return cachedResult.result
    
            // call the original function
            let result
            if (Array.isArray(arguments)) {
                result = await originalValue.apply(this, ...arguments)
            } else {
                result = await originalValue.apply(this, arguments)
            }
            
            let queryCache:QueryCache = {
                _id: cacheQueryName,
                result: result
            }

            await queryCacheService.put(queryCache)

            return result
    
        }
    }
}




export {
    QueryCacheService, cacheQuery
}