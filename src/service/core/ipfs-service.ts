import { inject, injectable } from "inversify"

import * as IPFS from 'ipfs-core'

@injectable()
class IpfsService {

  public peerCount:number=0

  public ipfs

  constructor(
    @inject('ipfsOptions') private ipfsOptions
  ) { }


  async init() {

    if (this.ipfs) return
    
    console.log('Init IPFS')

    this.ipfs = await IPFS.create(this.ipfsOptions)

    this.ipfs.libp2p.connectionManager.on('peer:connect', (connection) => {
      this.updateInfo()
    })

    this.ipfs.libp2p.connectionManager.on('peer:disconnect', (connection) => {
      this.updateInfo()
    })

    console.log('Init IPFS complete')

  }
  
  async updateInfo() {

    let id = await this.ipfs.id()

    let peers = await this.ipfs.swarm.peers()

    this.peerCount = peers.length

    const updatePeerCountEvent = new CustomEvent('update-peers', {
      detail: { 
        addresses: id?.addresses?.map( a => a.toString()),
        peers: peers.map(p => p.addr.toString()),
        count: this.peerCount 
      }
    })

    document.dispatchEvent(updatePeerCountEvent)
    
    console.log(`IPFS has ${this.peerCount} peers.`)
  }

}


export {
  IpfsService
}