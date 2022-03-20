//@ts-nocheck

import assert from 'assert'


const ChannelFactory = artifacts.require("ChannelFactory")

let user0
let user1
let user2
let user3
let user4

contract('ChannelFactory Contract', async (accounts) => {


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]
    
    })

    after("After", async () => {
    })

    it("should fail to activate for non-owner", async () => {

    })

    it("should fail to activate if already active", async () => {

    })

    it("should fail to get tokenURI if project inactive", async () => {

    })

    it("should fail to get tokenURI if token doesn't exist", async () => {

    })

    it("should fail to changeFeeRecipient for non-owner", async () => {

    })

    it("should fail to mint if project is inactive", async () => {

    })

    it("should fail to mint if token ID is out of range", async () => {

    })

    it("should fail to mint if we don't send enough ETH", async () => {

    })

    it("should mint token ID", async () => {

    })

    it("should mint token ID with mintFee set to zero", async () => {

    })


    it("should send ETH to feeRecipient even if owner is different", async () => {

    })

    it("should fail to mint if token ID is already minted", async () => {

    })

    it("should changeFeeRecipient for owner", async () => {

    })

    // it("should fail to create invalid channel", async () => {
        
    //     try {
    //         await service.put(new Channel())
    //         assert.fail("Did not throw exception")
    //     } catch(ex) {
    //         assert.strictEqual(ex.errors.length, 3)
    //     }

    // })

})

