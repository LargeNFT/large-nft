import { inject, injectable } from "inversify"
import { Item } from "../../dto/item.js"
import { ItemRepository, CHUNK_SIZE } from "./../item-repository.js"
import { Changeset, DatabaseService } from "../../service/core/database-service.js"
import axios from "axios"
import { ItemPage, RowItemViewModel } from "../../dto/item-page.js"



import sanitize from "sanitize-filename"


@injectable()
class ItemRepositoryBrowserImpl implements ItemRepository {

    static CHUNK_SIZE = CHUNK_SIZE

    changesets:Changeset[] = [
        {
            id: '0',
            changeset: async (db) => {

                await db.createIndex({
                    index: {
                        fields: ['tokenId']
                    }
                })
        
        
                await db.search({
                    build: true,
                    fields: ['contentHTML', 'title', 'tokenId']
                })
        
                
            }
        }
    ]

    db:any
    dbName:string = "items"
    
    @inject('DatabaseService')
    private databaseService: DatabaseService
    
    constructor(
        @inject("baseURI") private baseURI,
        @inject("hostname") private hostname
    ) {}

    async load() {
        this.db = await this.databaseService.getDatabase({
            name: this.dbName,
            changesets: this.changesets,
            initialRecords: true
        })
    }


    async get(_id: string): Promise<Item> {
        return Object.assign(new Item(), await this.db.get(_id))
    }
    


    async put(item: Item) {
        await this.db.put(item)
    }

    async list(skip: number, limit:number=CHUNK_SIZE): Promise<Item[]> {

        let response = await this.db.find({
            selector: {
                tokenId: { $exists: true }
            },
            sort: [{ 'tokenId': 'asc' }],
            limit: limit,
            skip: skip
        })

        return response.docs

    }

    async getByTokenId(tokenId:number) : Promise<Item> {

        let response = await this.db.find({
            selector: {
                tokenId: { $eq: tokenId },
            },
            limit: 1
        })

        if (response.docs?.length > 0) {
            return response.docs[0]
        }

        
    }

    async getByTokenIds(ids:number[]) : Promise<Item[]> {

        let response = await this.db.find({
            selector: {
                tokenId: { $in: ids },
            }
        })

        if (response.docs?.length > 0) {
            return response.docs
        } else {
            return []
        }
    }


    async getRowItemViewModelsByAttribute(traitType:string, value:string, pageNumber:number) : Promise<ItemPage> {

        let itemPage:ItemPage

        const response = await axios.get(`${this.hostname}${this.baseURI}attributes/items/${sanitize(traitType)}/${sanitize(value)}/${pageNumber}.json`)
        
        itemPage = response.data

        return itemPage
    }



    async getRowItemViewModelsByTokenIds(tokenIds:number[]) : Promise<RowItemViewModel[]> {

        let items:RowItemViewModel[] = []

        for (let tokenId of tokenIds) {
            const response = await axios.get(`${this.hostname}${this.baseURI}t/${tokenId}/rowItemViewModel.json`)
            items.push(response.data)
        }

        return items
    }

    async getRowItemViewModelsByTokenId(tokenId:number) : Promise<RowItemViewModel> {

        const response = await axios.get(`${this.hostname}${this.baseURI}t/${tokenId}/rowItemViewModel.json`)
        return response.data

    }


    
    async listByTokenId(startTokenId:number, limit:number) : Promise<Item[]> {

        let response = await this.db.find({
            selector: {
                tokenId: { $eq: startTokenId },
            },
            sort: [{ 'tokenId': 'desc' }],
            limit: limit
        })

        return response.docs

    }

    async query(query:string) : Promise<Item[]> {

        let response = await this.db.search({
            query: query,
            fields: ['contentHTML', 'title', 'tokenId'],
            include_docs: true,
            highlighting: true, 
            limit: CHUNK_SIZE
        })


        let rows = response.rows.map( row => {

            if (row.highlighting.contentHTML) {
                row.doc.contentHTML = row.highlighting.contentHTML
            } 

            //Remove image tags
            row.doc.contentHTML = row.doc.contentHTML.replace(/<img .*?>/g,""); 


            return row.doc
        })


        return rows

    }



    async all(): Promise<Item[]> {
        let response = await this.db.find({
            selector: {
                tokenId: { $exists: true }
            },
            sort: [{ 'tokenId': 'asc' }],
            limit: 100000,
            skip: 0
        })

        return response.docs
    }


    
}

export {
    ItemRepositoryBrowserImpl
}


