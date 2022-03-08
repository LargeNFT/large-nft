import { inject, injectable } from "inversify"

import { WalletService } from "./wallet-service"

import IPFS from 'ipfs'

@injectable()
class IpfsService {

  public orbitDb
  public ipfs

  private identity

  constructor(
    @inject('ipfsOptions') private ipfsOptions
  ) { }


  async init() {

    console.log('Init IPFS')
    
    if (!this.ipfs) {
      this.ipfs = await IPFS.create(this.ipfsOptions)
    }

    console.log('Init IPFS complete')

  }
  

}


export {
  IpfsService
}