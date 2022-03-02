import EventEmitter from "events"
import { inject, injectable } from "inversify"

import PouchStore from "orbit-db-pouch"

import { WalletService } from "./wallet-service"

const AccessControllers = require('orbit-db-access-controllers')
const EthIdentityProvider = require('orbit-db-identity-provider/src/ethereum-identity-provider')
const Identities = require('orbit-db-identity-provider')

const ensureAddress = require('orbit-db-access-controllers/src/utils/ensure-ac-address')
const pMapSeries = require('p-map-series')

const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')
const Keystore = require('orbit-db-keystore')


@injectable()
class OrbitService {

  public orbitDb
  public ipfs

  private identity

  constructor(
    private walletService:WalletService,
    @inject('ipfsOptions') private ipfsOptions,
    @inject('orbitOptions') private orbitOptions

  ) { }


  async init(askIdentity = true) {

    console.log('Init IPFS/Orbit')

    if (!this.orbitDb) {
      OrbitDB.addDatabaseType("pouch", PouchStore)

      AccessControllers.addAccessController({ AccessController: MainStoreAccessController })
      Identities.addIdentityProvider(EthIdentityProvider)
    }
    
    if (!this.ipfs) {
      this.ipfs = await IPFS.create(this.ipfsOptions)
    }
    

    let options: any = {
      AccessControllers: AccessControllers
    }

    if (askIdentity) {
      let keystore = new Keystore()
      options.identity = await this.getIdentity(keystore)
    }

    Object.assign(options, this.orbitOptions)

    this.orbitDb = await OrbitDB.createInstance(this.ipfs, options)

    console.log('Init IPFS/Orbit complete')

  }

  async getIdentity(keystore) {

    if (this.identity) return this.identity

    const type = EthIdentityProvider.type

    const options = {
      type: type,
      keystore: keystore,
      wallet: this.walletService.wallet
    }
    this.identity = await Identities.createIdentity(options)

    return this.identity
  }


  getPublicAccessController(orbitdb) {
    return {
      type: 'orbitdb',
      write: ['*']
    }
  }

  getPrivateAccessController(walletAddress: string) {
    return {
      type: 'orbitdb',
      write: [walletAddress]
    }
  }


}


class MainStoreAccessController extends EventEmitter {

  _orbitdb: any
  _db: any
  _options: any
  _walletAddress: any

  constructor(orbitdb, options) {
      super()
      this._orbitdb = orbitdb
      this._db = null
      this._options = options || {}

      this._walletAddress = options.walletAddress 

  }

  // Returns the type of the access controller
  static get type() { return 'mainStore' }

  // Returns the address of the OrbitDB used as the AC
  get address() {
      return this._db.address
  }

  // Return true if entry is allowed to be added to the database
  async canAppend(entry, identityProvider) {
      // Write keys and admins keys are allowed
      const access = new Set([...this.get('write'), ...this.get('admin')])
      // If the ACL contains the writer's public key or it contains '*'
      if (access.has(entry.identity.id) || access.has('*')) {
          const verifiedIdentity = await identityProvider.verifyIdentity(entry.identity)
          // Allow access if identity verifies
          return verifiedIdentity
      }

      return false
  }

  get capabilities() {
      if (this._db) {
          const capabilities = this._db.index

          const toSet = (e) => {
              const key = e[0]
              capabilities[key] = new Set([...(capabilities[key] || []), ...e[1]])
          }

          // Merge with the access controller of the database
          // and make sure all values are Sets
          Object.entries({
              ...capabilities,
              // Add the root access controller's 'write' access list
              // as admins on this controller
              ...{ admin: new Set([...(capabilities.admin || []), ...this._db.access.write]) }
          }).forEach(toSet)

          return capabilities
      }
      return {}
  }

  get(capability) {
      return this.capabilities[capability] || new Set([])
  }

  async close() {
      await this._db.close()
  }

  async load(address) {

      if (this._db) { await this._db.close() }

      // Force '<address>/_access' naming for the database
      this._db = await this._orbitdb.keyvalue(ensureAddress(address), {
          // use ipfs controller as a immutable "root controller"
          accessController: {
              type: 'ipfs',
              write: [this._options.walletAddress]
          },
          sync: true
      })

      // console.log(this._options)

      this._db.events.on('ready', this._onUpdate.bind(this))
      this._db.events.on('write', this._onUpdate.bind(this))
      this._db.events.on('replicated', this._onUpdate.bind(this))

      await this._db.load()
  }

  async save() {
      // return the manifest data
      return {
          address: this._db.address.toString()
      }
  }

  async grant(capability, key) {
      // Merge current keys with the new key
      const capabilities = new Set([...(this._db.get(capability) || []), ...[key]])
      await this._db.put(capability, Array.from(capabilities.values()))
  }

  async revoke(capability, key) {
      const capabilities = new Set(this._db.get(capability) || [])
      capabilities.delete(key)
      if (capabilities.size > 0) {
          await this._db.put(capability, Array.from(capabilities.values()))
      } else {
          await this._db.del(capability)
      }
  }

  /* Private methods */
  _onUpdate() {
      this.emit('updated')
  }

  /* Factory */
  static async create(orbitdb, options: any = {}) {
      const ac = new MainStoreAccessController(orbitdb, options)
      await ac.load(options.address || options.name || 'default-access-controller')

      // Add write access from options
      if (options.write && !options.address) {
          await pMapSeries(options.write, async (e) => ac.grant('write', e))
      }

      return ac
  }
}


export {
  OrbitService
}