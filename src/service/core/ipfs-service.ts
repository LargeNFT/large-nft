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
      this.updatePeerCount()
    })

    this.ipfs.libp2p.connectionManager.on('peer:disconnect', (connection) => {
      this.updatePeerCount()
    })

    console.log('Init IPFS complete')

  }
  
  async updatePeerCount() {

    let peers = await this.ipfs.swarm.peers()

    this.peerCount = peers.length

    const updatePeerCountEvent = new CustomEvent('update-peer-count', {
      detail: { count: this.peerCount }
    })

    document.dispatchEvent(updatePeerCountEvent)
    
    console.log(`IPFS has ${this.peerCount} peers.`)
  }

}


export {
  IpfsService
}