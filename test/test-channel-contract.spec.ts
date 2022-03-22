//@ts-nocheck

import assert from 'assert'
const truffleAssert = require('truffle-assertions')
const { toBN } = web3.utils;


const Channel = artifacts.require("Channel")

let user0
let user1
let user2
let user3
let user4

let mainContract


contract('Channel Contract', async (accounts) => {


    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        mainContract = await Channel.new( "Test", "TST", "xyz", web3.utils.toWei('0.08', 'ether'), 10, { from: user0 })

    })

    after("After", async () => {
    })


    it("should fail to get tokenURI if token doesn't exist", async () => {

        await truffleAssert.fails(
            mainContract.tokenURI( 1, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "ERC721Metadata: URI query for nonexistent token"
        )

    })


    it("should fail to mint if token ID is out of range", async () => {
        await truffleAssert.fails(
            mainContract.mint( 11, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Invalid token"
        )

        await truffleAssert.fails(
            mainContract.mint( 0, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Invalid token"
        )

    })

    it("should fail to mint if we don't send enough ETH", async () => {
        await truffleAssert.fails(
            mainContract.mint( 1, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

    })

    it("should fail to mint if we send too much ETH", async () => {
        await truffleAssert.fails(
            mainContract.mint( 1, { from: user4, value: web3.utils.toWei('0.09', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

    })


    it("should mint all tokens by ID", async () => {

        for (let i=1; i < 11; i++) {

            await mainContract.mint( i, { from: user4, value: web3.utils.toWei('0.08', 'ether') })

            //Validate
            let owner = await mainContract.ownerOf( i, { from: user4 })
            let uri = await mainContract.tokenURI( i, { from: user4 })
  
            let balance = await web3.eth.getBalance(mainContract.address)

            assert.strictEqual(balance, web3.utils.toWei( (i * 0.08).toString() , 'ether'))
            assert.strictEqual(owner, user4)
            assert.strictEqual(uri, `ipfs://xyz/${i}.json`)
        }


    })

    it("should fail to mint if token ID is already minted", async () => {
        await truffleAssert.fails(
            mainContract.mint( 1, { from: user4, value: web3.utils.toWei('0.08', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Exists"
        )
    })


    it("should fail to withdraw if not owner", async () => {

        await truffleAssert.fails(
            mainContract.withdraw( { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Ownable: caller is not the owner"
        )

    })

    it("should withdraw if owner", async () => {

        // let beforeBalance = await web3.eth.getBalance(user0)

        let receipt = await mainContract.withdraw( { from: user0 })
        const gasUsed = receipt.receipt.gasUsed;


        //Check contract balance
        let contractBalance = await web3.eth.getBalance(mainContract.address)

        //Check user balance
        // let afterBalance = await web3.eth.getBalance(user0)

        assert.strictEqual(contractBalance, '0')

        // console.log(contractBalance)
        // console.log(afterBalance)
        // console.log(beforeBalance - afterBalance + gasUsed)
        // console.log( toBN(web3.utils.toWei( (10 * 0.08).toString() , 'ether')).sub(toBN(gasUsed)).toString()  )

    })



    it("should mint token ID with mintFee set to zero", async () => {

        let freeContract = await Channel.new( "Test", "TST", "zyx", 0, 10, { from: user0 })

        

        //Fail before range
        await truffleAssert.fails(
            freeContract.mint( 0, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Invalid token"
        )

        for (let i=1; i < 11; i++) {

            await freeContract.mint( i, { from: user4 })

            //Validate
            let owner = await freeContract.ownerOf( i, { from: user4 })
            let uri = await freeContract.tokenURI( i, { from: user4 })

            assert.strictEqual(owner, user4)
            assert.strictEqual(uri, `ipfs://zyx/${i}.json`)
        }

        //Fail after range
        await truffleAssert.fails(
            freeContract.mint( 11, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Invalid token"
        )



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

