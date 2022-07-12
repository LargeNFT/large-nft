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
            mainContract.mint( 0, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Too few"
        )

        await truffleAssert.fails(
            mainContract.mint( 11, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Too many"
        )


        //Try the mintFromStartOrFail
        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 0, 1, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Too few"
        )

        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 11, 1, { from: user4 }),
            truffleAssert.ErrorType.REVERT,
            "Too many"
        )


    })

    it("should fail to mint if we don't send enough ETH", async () => {

        await truffleAssert.fails(
            mainContract.mint( 1, { from: user4, value: web3.utils.toWei('0.0799', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

        await truffleAssert.fails(
            mainContract.mint( 2, { from: user4, value: web3.utils.toWei('0.15', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )


        //Try the mintFromStartOrFail
        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 1, 1, { from: user4, value: web3.utils.toWei('0.0799', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 2, 1, { from: user4, value: web3.utils.toWei('0.15', 'ether') }),
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

        await truffleAssert.fails(
            mainContract.mint( 2, { from: user4, value: web3.utils.toWei('0.19', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )


        //Try the mintFromStartOrFail
        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 1, 1, { from: user4, value: web3.utils.toWei('0.09', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 2, 1, { from: user4, value: web3.utils.toWei('0.19', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Send exact ETH"
        )

    })


    it("should mint multiple tokens", async () => {

        let tx = await mainContract.mint( 3, { from: user0, value: web3.utils.toWei('0.24', 'ether') })
        verifyMintEvent(tx, 3)

        assert.strictEqual(await web3.eth.getBalance(mainContract.address), web3.utils.toWei( (3 * 0.08).toString() , 'ether'))

        assert.strictEqual(await mainContract.ownerOf( 1, { from: user0 }), user0)
        assert.strictEqual(await mainContract.ownerOf( 2, { from: user0 }), user0)
        assert.strictEqual(await mainContract.ownerOf( 3, { from: user0 }), user0)

        for (let i=1; i < 3; i++) {
            let uri = await mainContract.tokenURI( i, { from: user4 })
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })


    it("should fail to mint if start is past the current token", async () => {

        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 3, 2, { from: user1, value: web3.utils.toWei('0.24', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Token is past start"
        )

    })

    it("should fail to mint if start is zero", async () => {

        await truffleAssert.fails(
            mainContract.mintFromStartOrFail( 3, 0, { from: user1, value: web3.utils.toWei('0.24', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "No start passed"
        )

    })

    it("should mint multiple if start token is current token", async () => {

        let tx = await mainContract.mintFromStartOrFail( 3, 4, { from: user1, value: web3.utils.toWei('0.24', 'ether') })
        
        verifyMintEvent(tx, 6)
        
        assert.strictEqual(await web3.eth.getBalance(mainContract.address), web3.utils.toWei( (6 * 0.08).toString() , 'ether'))

        assert.strictEqual(await mainContract.ownerOf( 4, { from: user1 }), user1)
        assert.strictEqual(await mainContract.ownerOf( 5, { from: user1 }), user1)
        assert.strictEqual(await mainContract.ownerOf( 6, { from: user1 }), user1)

        for (let i=4; i < 7; i++) {
            let uri = await mainContract.tokenURI( i, { from: user4 })
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })


    it("should mint to owner without a mint fee", async () => {

        let tx1 = await mainContract.mint( 2, { from: user0 })
        assert.strictEqual(await web3.eth.getBalance(mainContract.address), web3.utils.toWei( (6 * 0.08).toString() , 'ether'))
        verifyMintEvent(tx1, 8)

        assert.strictEqual(await mainContract.ownerOf( 7, { from: user0 }), user0)
        assert.strictEqual(await mainContract.ownerOf( 8, { from: user0 }), user0)

    })



    it("should mint the rest of the tokens", async () => {

        let tx2 = await mainContract.mint( 2, { from: user3, value: web3.utils.toWei('0.16', 'ether') })
        assert.strictEqual(await web3.eth.getBalance(mainContract.address), web3.utils.toWei( (8 * 0.08).toString() , 'ether'))
        verifyMintEvent(tx2, 10)


        
        assert.strictEqual(await mainContract.ownerOf( 9, { from: user3 }), user3)
        assert.strictEqual(await mainContract.ownerOf( 10, { from: user3 }), user3)


        for (let i=7; i < 11; i++) {
            let uri = await mainContract.tokenURI( i, { from: user4 })
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })

    it("should fail to mint if token ID is already minted", async () => {
        await truffleAssert.fails(
            mainContract.mint( 1, { from: user4, value: web3.utils.toWei('0.08', 'ether') }),
            truffleAssert.ErrorType.REVERT,
            "Minting closed"
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

    it("should get contract metadata", async () => {

        let uri = await mainContract.contractURI( { from: user4 })
        assert.strictEqual(uri, `ipfs://xyz/contractMetadata.json`)

    })

    // it("should mint token ID with mintFee set to zero", async () => {

    //     let freeContract = await Channel.new( "Test", "TST", "zyx", 0, 10, { from: user0 })

        

    //     //Fail before range
    //     await truffleAssert.fails(
    //         freeContract.mint( 0, { from: user4 }),
    //         truffleAssert.ErrorType.REVERT,
    //         "Invalid token"
    //     )

    //     for (let i=1; i < 11; i++) {

    //         await freeContract.mint( i, { from: user4 })

    //         //Validate
    //         let owner = await freeContract.ownerOf( i, { from: user4 })
    //         let uri = await freeContract.tokenURI( i, { from: user4 })

    //         assert.strictEqual(owner, user4)
    //         assert.strictEqual(uri, `ipfs://zyx/${i}.json`)
    //     }

    //     //Fail after range
    //     await truffleAssert.fails(
    //         freeContract.mint( 11, { from: user4 }),
    //         truffleAssert.ErrorType.REVERT,
    //         "Invalid token"
    //     )



    // })




})

function verifyMintEvent(tx, tokenId) {
  let eventCount = 0;
  for (let l of tx.logs) {
    if (l.event === 'MintEvent') {
      try {
        assert.strictEqual(l.args.tokenId.toNumber(), tokenId)
        eventCount += 1
      } catch (ex) { }
    }
  }
  if (eventCount === 0) {
    assert(false, 'Missing Mint Event')
  } else {
    assert(eventCount === 1, 'Unexpected number of Mint events')
  }
}
