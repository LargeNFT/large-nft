var ipfsClient = require('ipfs-http-client');

/**
 * IPFS configuration for tests
 */
const ipfs = ipfsClient({ 
    host: 'localhost', 
    port: '5001', 
    protocol: 'http' 
  })

/**
 * Get the contract
 */
const recordServiceContract = artifacts.require("RecordService");


class TestServiceFactory {

    constructor(recordServiceContract, ipfs) {
        this.recordServiceContract = recordServiceContract;
        this.ipfs = ipfs;
        // this.freedom = 

        this.initialize(recordServiceContract, ipfs);

    }

    initialize(recordServiceContract, ipfs) {
        // this.freedom = 
    }

    /**
     * Only giving getters to the actual services to expose
     */

    getPostService() {
        return this.postService;
    }

    getProfileService() {
        return this.profileService;
    }

}


module.exports = TestServiceFactory;