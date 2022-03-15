import { injectable } from "inversify";
import { Item } from "../dto/item";
import { NFTMetadata } from "../dto/nft-metadata";
import { DatabaseService } from "./core/database-service";
import { ValidationException } from "../util/validation-exception";
import { validate, ValidationError } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';


@injectable()
class ItemService {

    db:any

    constructor(
        private databaseService:DatabaseService,
    ) {}

    async load(walletAddress:string) {

        this.db = this.databaseService.getDatabase(walletAddress, "item", (db) => {

            db.createIndex({
                index: {
                  fields: ['channel._id']
                }
            })

        })
    }

    async get(_id:string) : Promise<Item> {
        return this.db.get(_id)
    }

    async put(item:Item) {

        if (!item._id) {
            item._id = uuidv4()
            item.dateCreated = new Date().toJSON()
          } else {
            item.lastUpdated = new Date().toJSON()
          }
      
          //Validate
          let errors:ValidationError[] = await validate(item)
      
          if (errors.length > 0) {
            throw new ValidationException(errors)
          }
          
      
          await this.db.put(item)
    }

    async listByChannel(channelId:string, limit:number, skip:number) : Promise<Item[]> {

        return this.db.find({
            selector: {
                'channel.id': channelId
            },
            limit: limit,
            skip: skip

        })

    }

    async exportNFTMetadata(_id:string) : Promise<NFTMetadata> {
        return 
    } 

    async mint(_id:string) {
        
    }


}

export {
    ItemService
}