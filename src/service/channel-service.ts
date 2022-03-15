import { injectable } from "inversify"
import { validate, ValidationError } from 'class-validator';
import { Channel } from "../dto/channel"
import { DatabaseService } from "./core/database-service"
import { ValidationException } from "../util/validation-exception";
import { v4 as uuidv4 } from 'uuid';

@injectable()
class ChannelService {

  db:any

  constructor(
    private databaseService:DatabaseService
  ) { }

  async load(walletAddress:string) {

    this.db = await this.databaseService.getDatabase(walletAddress, "channel", (db) => {

      //Create indexes
      db.createIndex({index: { fields: ['dateCreated']}})
      db.createIndex({index: { fields: ['lastUpdated']}})

    })

  }

  async get(_id:string): Promise<Channel> {
    return this.db.get(_id)
  }

  async put(channel: Channel) {

    if (!channel._id) {
      channel._id = uuidv4()
      channel.dateCreated = new Date().toJSON()
    } else {
      channel.lastUpdated = new Date().toJSON()
    }

    //Validate
    let errors:ValidationError[] = await validate(channel)

    if (errors.length > 0) {
      throw new ValidationException(errors)
    }
    

    await this.db.put(channel)
  }

  async list(limit: number, skip:number): Promise<Channel[]> {

    let response = await this.db.find({
      selector: { "dateCreated": { $exists: true } },
      sort: [{ 'dateCreated': 'desc'}],
      limit: limit,
      skip: skip
    })

    return response.docs

  }

  async delete(_id:string): Promise<void> {
    await this.db.del(_id)
  }

  async exportNFTMetadata(_id:string) {}
  async getJSONFeed(_id:string) {}
  async getRSSFeed(_id:string) : Promise<string> {return}
  async publish(_id:string) { }
  async importFromIPFS(cid:string) {}

}


export {
  ChannelService
}
