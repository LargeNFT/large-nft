import { inject, injectable } from "inversify"
import { SettingsService } from "./settings-service.js"



@injectable()
class IpfsService {


  @inject(SettingsService)
  private settingsService:SettingsService

  public peerCount:number=0
  public addresses

  public ipfs
  
  initializing=false

  constructor(
    @inject('ipfsRemoteInit') private ipfsRemoteInit,
  ) {}


  async init() {

    if (this.ipfs || this.initializing) return
    
    this.initializing = true
    
    let settings

    try {
      settings = await this.settingsService.get()
    } catch(ex) {}

    if (settings?.ipfsHost) {

      console.log('Init IPFS')

      this.ipfs = await this.ipfsRemoteInit(settings?.ipfsHost)

      console.log('Init IPFS complete')

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