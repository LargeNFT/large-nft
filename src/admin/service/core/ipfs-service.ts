import { inject, injectable } from "inversify"
import { SettingsService } from "./settings-service"



@injectable()
class IpfsService {

  public peerCount:number=0
  public addresses

  public ipfs
  
  initializing=false

  constructor(
    @inject('ipfsInit') private ipfsInit,
    @inject('ipfsRemoteInit') private ipfsRemoteInit,
    private settingsService:SettingsService
  ) {}


  async init() {

    if (this.ipfs || this.initializing) return
    
    this.initializing = true
    
    console.log('Init IPFS')

    let settings

    try {
      settings = await this.settingsService.get()
    } catch(ex) {}

    if (settings?.ipfsHost) {
      this.ipfs = await this.ipfsRemoteInit(settings?.ipfsHost)
    } else {
      this.ipfs = await this.ipfsInit()
    }

    this.initializing = false


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
  
  async clearInit() {

    delete this.ipfs 
    this.initializing = false

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