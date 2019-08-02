import { Profile } from "../../js/dto/profile";
import assert = require('assert');
import { ProfileService } from "../../js/services/profile-service";
import { IdentityService } from "../../js/services/util/identity-service";
import { SchemaService } from "../../js/services/util/schema-service";

const OrbitDB = require('orbit-db')


const Keystore = require('orbit-db-keystore')
const path = require('path')
const keypath = path.resolve('./keys')



const ipfsClient = require('ipfs-http-client')

const ipfs = ipfsClient({
    host: "localhost",
    port: 5001,
    protocol: 'http'
  })


// //@ts-ignore
// contract('SchemaService', async (accounts) => {

//     let service: SchemaService

//     //@ts-ignore
//     before("", async () => {


//         identityService = new IdentityService()

//         let keystore = Keystore.create(keypath)

//         let identity = await identityService.getIdentity(keystore)

//         const orbitdb = await OrbitDB.createInstance(ipfs, {
//             directory: "./orbitdb",
//             identity: identity
//         })

//         let ac = identityService.getAccessController(orbitdb)

//         let store = await orbitdb.docstore("test-profile", {
//             accessController: ac
//         })

//         service = new ProfileService(store)
//     })








// })


