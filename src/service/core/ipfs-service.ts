import { inject, injectable } from "inversify"


@injectable()
class IpfsService {

  public peerCount:number=0
  public addresses

  public ipfs
  
  initializing=false

  constructor(
    @inject('ipfsOptions') private ipfsOptions,
    @inject('IPFS') private IPFS
  ) { }


  async init() {

    if (this.ipfs || this.initializing) return
    
    this.initializing = true
    
    console.log('Init IPFS')

    this.ipfs = await this.IPFS.create(this.ipfsOptions)

    //TODO: 


    // this.ipfs.libp2p.connectionManager.on('peer:connect', (connection) => {
    //   // this.updateInfo()
    //   
    // })

    // this.ipfs.libp2p.connectionManager.on('peer:disconnect', (connection) => {
    //   // this.updateInfo()
    // })

    console.log('Init IPFS complete')

  }
  
  async updateInfo() {

    let id = await this.ipfs.id()

    let peers = await this.ipfs.swarm.peers()

    this.peerCount = peers.length
    this.addresses = id?.addresses?.map( a => a.toString())

    const updatePeerCountEvent = new CustomEvent('update-peers', {
      detail: { 
        addresses: this.addresses,
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