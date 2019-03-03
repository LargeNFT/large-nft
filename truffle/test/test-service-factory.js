var ipfsClient = require('ipfs-http-client');

var blah = require('./tests-runnable.js')

console.log(blah)
console.log('here')


const Freedom = require('freedom-for-data')





class TestServiceFactory {

    constructor() {
        
        // this.recordServiceContract = artifacts.require("RecordService");

        // console.log(this.recordServiceContract)

        // // this.freedom = await Freedom({
        // //     ipfsConfig: {
        // //       host: settings.ipfsHost,
        // //       port: settings.ipfsApiPort
        // //     },
        // //     recordContractAddress: settings.recordContractAddress,
        // //     recordContractTransactionHash: settings.recordContractTransactionHash
        // //   })

        // this.initialize(recordServiceContract, ipfs);

    }

    initialize(recordServiceContract, ipfs) {
        // this.postService = new PostService() 
    }

    /**
     * Only giving getters to the actual services to expose
     */

    getPostService() {
        // return this.postService;
    }

    getProfileService() {
        // return this.profileService;
    }

}


export default TestServiceFactory;