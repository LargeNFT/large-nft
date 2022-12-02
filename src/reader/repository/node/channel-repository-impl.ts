import {  inject, injectable } from "inversify"
import { Channel } from "../../dto/channel.js"
import fs from "fs"
import { ChannelRepository } from "./../channel-repository.js"


@injectable()
class ChannelRepositoryNodeImpl implements ChannelRepository {
    
    constructor(
        @inject('baseDir') private baseDir
    ) {}

    async get(): Promise<Channel> {        
        
        const channels = JSON.parse(fs.readFileSync(`${this.baseDir}/backup/export/backup/channels.json`, 'utf8'))
        let channel:Channel = channels[0]


        try {
            const contract = JSON.parse(fs.readFileSync(`${this.baseDir}/backup/contract/contract.json`, 'utf8'))

            if (contract?.contractAddress) {
                channel.contractAddress = contract.contractAddress
            }
    
        } catch(ex) {}

        return channel
    }



}

export {
    ChannelRepositoryNodeImpl
}