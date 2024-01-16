import { inject, injectable } from "inversify"
import { SettingsService } from "./settings-service.js"

import { fixedSize } from 'ipfs-unixfs-importer/chunker'
import { balanced } from 'ipfs-unixfs-importer/layout'
import { CID, CarWriter } from '@ipld/car/writer'
import { MFS, mfs } from "@helia/mfs"
import { car } from '@helia/car'

@injectable()
class IpfsService {

  @inject(SettingsService)
  private settingsService:SettingsService

  public peerCount:number=0
  public addresses

  public ipfs

  private _helia
  private _mfs:MFS
  private _car
  
  initializing=false

  private mfsOptions = {
      // these are the default kubo options
      cidVersion: 0,
      rawLeaves: false,
      layout: balanced({
        maxChildrenPerNode: 174
      }),
      chunker: fixedSize({
        chunkSize: 262144
      }),
  }


  constructor(
    @inject('ipfsRemoteInit') private ipfsRemoteInit,
    @inject('helia') private helia:Function,
  ) {}




  async init() {

    if (this.ipfs || this.initializing) return
    
    this.initializing = true
    
    let settings

    try {
      settings = await this.settingsService.get()
    } catch(ex) {}

    console.time('Init IPFS')

    this.ipfs = await this.ipfsRemoteInit(settings?.ipfsHost ? settings.ipfsHost : '/ip4/127.0.0.1/tcp/5001')

    console.timeEnd('Init IPFS')

    this.initializing = false

  }

  async initLocal() {

    if (this._helia) return

    this.initializing = true

    console.time('Init IPFS')

    this._helia = await this.helia()
    this._mfs = mfs(this._helia)
    this._car = car(this._helia)

    this.initializing = false

    console.timeEnd('Init IPFS')
  }

  async destroyLocal() {

    console.time('Destroy IPFS')

    await this._helia.stop()

    console.timeEnd('Destroy IPFS')

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

  async filesRm(path:string, options?:any) {
    return this.ipfs.files.rm(path, options)
  }

  async filesCp(fromPath:string, toPath:string, options?:any) {
    return this.ipfs.files.cp(fromPath, toPath, options)
  }

  async filesRead(path:string) {
    return this.ipfs.files.read(path)
  }

  async filesWrite(path:string, content:any, options?:any) {
    return this.ipfs.files.write(path, content, options)
  }

  async filesFlush(path:string) {
    return this.ipfs.files.flush(path)
  }

  async add(content:any) {
    return this.ipfs.add(content)
  }

  async stat(ipfsFilename:string, options?:any) {
    return this.ipfs.files.stat(ipfsFilename, options)
  }


  async heliaRm(path:string, options?:any) {
    return this._mfs.rm(path, options)
  }

  async heliaCp(fromPath:string, toPath:string, options?:any) {
    return this.ipfs.files.cp(fromPath, toPath, Object.assign(this.mfsOptions, options))
  }

  async heliaRead(path:string) {
    return this.ipfs.files.read(path)
  }

  async heliaWrite(path:string, content:any, options?:any) {
    return this.ipfs.files.write(path, content, Object.assign(this.mfsOptions, options))
  }

  async heliaFlush(path:string) {
    return this.ipfs.files.flush(path)
  }

  async heliaAdd(content:Uint8Array, path:string, options?:any) : Promise<CID> {

    await this._mfs.writeBytes(content, path, Object.assign(this.mfsOptions, options))

    let stat = await this._mfs.stat(path)

    return stat.cid

  }

  async heliaMkDir(path:string, options?:any) {
    return this._mfs.mkdir(path, Object.assign(this.mfsOptions, options))
  }

  async heliaStat(path:string, options?:any) {
    return this._mfs.stat(path, Object.assign(this.mfsOptions, options))
  }

  async createCAR(rootCID:CID) {

    console.log("Creating CAR file export...")

    return CarWriter.create(rootCID)
    
  }

  async exportCAR(rootCID:CID, writer) {
    return this._car.export(rootCID, writer)
  }

  /**
  *
  * @param {AsyncIterable<Uint8Array>} carReaderIterable
  * @returns {Promise<Blob>}
  */
  async carWriterOutToBlob (carReaderIterable) {
    const parts = []
    for await (const part of carReaderIterable) {
      parts.push(part)
    }
    return new Blob(parts, { type: 'application/car' })
  }

  
}



export {
  IpfsService
}