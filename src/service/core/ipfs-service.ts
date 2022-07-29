import { inject, injectable } from "inversify"
import { IpfsHostService } from "./ipfs-host-service"
import { create } from 'ipfs-http-client'
import { IpfsHost } from "../../dto/ipfs-host"
import { Channel } from "../../dto/channel"


@injectable()
class IpfsService {

  public peerCount:number=0
  public addresses

  public ipfs
  
  initializing=false

  constructor(
    @inject('ipfsInit') private ipfsInit,
    private ipfsHostService:IpfsHostService
  ) {}


  async init() {

    if (this.ipfs || this.initializing) return
    
    this.initializing = true
    
    console.log('Init IPFS')

    let ipfsHost

    try {
      ipfsHost = await this.ipfsHostService.get()
    } catch(ex) {}

    if (ipfsHost) {
      this.ipfs = create({ url: ipfsHost.url })
    } else {
      this.ipfs = await this.ipfsInit()
    }

  
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