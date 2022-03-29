import { inject, injectable } from "inversify"

// const IPFS = require('ipfs')
// import * as IPFS from 'ipfs-core'

@injectable()
class IpfsService {

  public ipfs

  constructor(
    @inject('ipfsOptions') private ipfsOptions
  ) { }


  async init() {

    // console.log('Init IPFS')
    
    // if (!this.ipfs) {
    //   this.ipfs = await IPFS.create(this.ipfsOptions)
    // }

    // console.log('Init IPFS complete')

  }
  

}


export {
  IpfsService
}