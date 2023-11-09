import { inject, injectable } from "inversify";
import { WalletService } from "../../reader/service/core/wallet-service.js";
import { ENS } from "../../sync/dto/ens.js";
import { ENSRepository } from "../../sync/repository/ens-repository.js";


@injectable()
class ENSService {

    @inject("ENSRepository")
    private ensRepository:ENSRepository

    @inject("WalletService")
    private walletService: WalletService

    @inject("dayjs")
    private dayjs

    constructor() {}


    async getOrDownloadByAddress(_id:string, options?:any): Promise<string> {    
        
        let ens 
        
        try {
            ens = await this.ensRepository.get(_id, options)
        } catch(ex) {}


        //Only update once per week
        let update = this.dayjs(ens?.lastEnsNameUpdate).isBefore(this.dayjs().subtract(7, 'days')) 


        if (update || !ens) {
            
            let ensName = await this.walletService.provider.lookupAddress(_id)

            console.log(`Looking up ENS for ${_id} ${ensName?.length > 0 ? `(${ensName})` : ''}`)

            if (!ens) {
                ens = new ENS()
                ens._id = _id 
            }
    
            ens.name = ensName
            ens.lastEnsNameUpdate = new Date().toJSON()
            

            await this.ensRepository.put(ens, options)
        }

        return ens.name

    }



}

export {
    ENSService
}