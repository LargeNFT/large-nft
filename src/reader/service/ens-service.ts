import { inject, injectable } from "inversify";
import moment from "moment";
import { ENS } from "../dto/ens.js";
import { ENSRepository } from "../repository/ens-repository.js";
import { WalletService } from "./core/wallet-service.js";


@injectable()
class ENSService {

    @inject("ENSRepository")
    private ensRepository:ENSRepository

    @inject("WalletService")
    private walletService: WalletService

    constructor() {}


    async getOrDownloadByAddress(_id:string): Promise<string> {    
        
        let ens 
        
        try {
            ens = await this.ensRepository.get(_id)
        } catch(ex) {}

        
        //Only update once per week
        let update = moment(ens?.lastEnsNameUpdate).isBefore(moment().subtract(7, 'days')) 


        if (update || !ens) {

            let ensName = await this.walletService.provider.lookupAddress(_id)

            console.log(`Looking up ENS for ${_id} ${ensName?.length > 0 ? `(${ensName})` : ''}`)

            if (!ens) {
                ens = new ENS()
                ens._id = _id 
            }
    
            ens.name = ensName
            ens.lastEnsNameUpdate = new Date().toJSON()
            await this.ensRepository.put(ens)
        }

        return ens.name

    }



}

export {
    ENSService
}