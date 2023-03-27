import assert from 'assert'
import hre from "hardhat"

import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { expect } from "chai"


let user0
let user1
let user2
let user3
let user4

let mainContract


describe('Channel Contract', async (accounts) => {

    async function deployFunction() {

        // we will call this function in our tests to deploy a new contract and add an owner
        let contractFactory = await hre.ethers.getContractFactory("Channel")
        let contract = await contractFactory.deploy("Test", "TST", "xyz", ethers.utils.parseUnits('0.08', 'ether'), 10)

        // (await contract).deployed();
        const accounts = await ethers.getSigners()


        return { contract, accounts }
      }



    before("", async () => {

    })

    after("After", async () => {
    })


    it("should fail to get tokenURI if token doesn't exist", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        await expect(contract.connect(accounts[0]).tokenURI(1)).to.be.revertedWith("ERC721Metadata: URI query for nonexistent token")
    })


    it("should fail to mint if token ID is out of range", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        await expect(contract.connect(accounts[0]).mint( 0)).to.be.revertedWith("Too few")

        await expect(contract.connect(accounts[0]).mint( 11)).to.be.revertedWith("Too many")

        await expect(contract.connect(accounts[0]).mintFromStartOrFail( 0, 1)).to.be.revertedWith("Too few")

        await expect(contract.connect(accounts[0]).mintFromStartOrFail( 11, 1)).to.be.revertedWith("Too many")

    })

    it("should fail to mint if we don't send enough ETH", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        await expect(contract.connect(accounts[5]).mint( 1, { value: ethers.utils.parseUnits('0.0799', 'ether') })).to.be.revertedWith("Send exact ETH")

        await expect(contract.connect(accounts[5]).mint( 2, { value: ethers.utils.parseUnits('0.15', 'ether') })).to.be.revertedWith("Send exact ETH")

        await expect(contract.connect(accounts[5]).mintFromStartOrFail( 1, 1, { value: ethers.utils.parseUnits('0.0799', 'ether') })).to.be.revertedWith("Send exact ETH")

        await expect(contract.connect(accounts[5]).mintFromStartOrFail( 2, 1, { value: ethers.utils.parseUnits('0.15', 'ether') })).to.be.revertedWith("Send exact ETH")


    })

    it("should fail to mint if we send too much ETH", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)


        await expect(contract.connect(accounts[4]).mint( 1, { value: ethers.utils.parseUnits('0.09', 'ether') })).to.be.revertedWith("Send exact ETH")
        await expect(contract.connect(accounts[4]).mint( 2, { value: ethers.utils.parseUnits('0.19', 'ether') })).to.be.revertedWith("Send exact ETH")

        await expect(contract.connect(accounts[4]).mintFromStartOrFail( 1, 1, { value: ethers.utils.parseUnits('0.09', 'ether') })).to.be.revertedWith("Send exact ETH")
        await expect(contract.connect(accounts[4]).mintFromStartOrFail( 2, 1, { value: ethers.utils.parseUnits('0.19', 'ether') })).to.be.revertedWith("Send exact ETH")

    })


    it("should mint multiple tokens", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        let tx = await contract.connect(accounts[0]).mint( 3, { value: ethers.utils.parseUnits('0.24', 'ether') })

        let receipt = await tx.wait()

        verifyMintEvent(receipt.events, 3)

        let contractBalance = await contract.provider.getBalance(contract.address)

        assert.strictEqual(contractBalance.toString(), ethers.utils.parseUnits( (3 * 0.08).toString() , 'ether').toString())

        assert.strictEqual(await contract.ownerOf( 1), accounts[0].address)
        assert.strictEqual(await contract.ownerOf( 2), accounts[0].address)
        assert.strictEqual(await contract.ownerOf( 3), accounts[0].address)

        for (let i=1; i < 3; i++) {
            let uri = await contract.connect(accounts[4]).tokenURI( i)
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })


    it("should fail to mint if start is past the current token", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        await expect(contract.connect(accounts[1]).mintFromStartOrFail( 3, 2, { value: ethers.utils.parseUnits('0.24', 'ether') })).to.be.revertedWith("Token is past start")

    })

    it("should fail to mint if start is zero", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        await expect(contract.connect(accounts[1]).mintFromStartOrFail( 3, 0, { value: ethers.utils.parseUnits('0.24', 'ether') })).to.be.revertedWith("No start passed")

    })

    it("should mint multiple if start token is current token", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)


        //Mint 3 
        await contract.connect(accounts[1]).mint( 3, { value: ethers.utils.parseUnits('0.24', 'ether') })


        //Mint 3 more starting at #4
        let tx = await contract.connect(accounts[1]).mintFromStartOrFail( 3, 4, { value: ethers.utils.parseUnits('0.24', 'ether') })
        let receipt = await tx.wait()

        //Verify token id #6 minted
        verifyMintEvent(receipt.events, 6)

        let contractBalance = await contract.provider.getBalance(contract.address)

        //Verify contract balance
        assert.strictEqual(contractBalance.toString(), ethers.utils.parseUnits( (6 * 0.08).toString() , 'ether').toString())
        
        //Verify ownership of 4/5/6
        assert.strictEqual(await contract.ownerOf( 4), accounts[1].address)
        assert.strictEqual(await contract.ownerOf( 5), accounts[1].address)
        assert.strictEqual(await contract.ownerOf( 6), accounts[1].address)

        for (let i=4; i < 7; i++) {
            let uri = await contract.connect(accounts[4]).tokenURI( i)
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })

    it("should mint to owner without a mint fee", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        //First mint 6
        await contract.connect(accounts[1]).mint( 6, { value: ethers.utils.parseUnits('0.48', 'ether') })


        let tx = await contract.connect(accounts[0]).mint(2)
        let receipt = await tx.wait()

        verifyMintEvent(receipt.events, 8)

        let contractBalance = await contract.provider.getBalance(contract.address)

        //Verify contract balance
        assert.strictEqual(contractBalance.toString(), ethers.utils.parseUnits( (6 * 0.08).toString() , 'ether').toString())

        assert.strictEqual(await contract.ownerOf( 7, { from: user0 }), accounts[0].address)
        assert.strictEqual(await contract.ownerOf( 8, { from: user0 }), accounts[0].address)

    })

    it("should mint the rest of the tokens", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)


        //First mint 8
        await contract.connect(accounts[3]).mint( 8, { value: ethers.utils.parseUnits('0.64', 'ether') })

        let tx = await contract.connect(accounts[3]).mint(2, { value: ethers.utils.parseUnits('0.16', 'ether') })
        let receipt = await tx.wait()

        verifyMintEvent(receipt.events, 10)


        let contractBalance = await contract.provider.getBalance(contract.address)

        //Verify contract balance
        assert.strictEqual(contractBalance.toString(), ethers.utils.parseUnits( (10 * 0.08).toString() , 'ether').toString())

        
        assert.strictEqual(await contract.ownerOf( 9), accounts[3].address)
        assert.strictEqual(await contract.ownerOf( 10), accounts[3].address )


        for (let i=7; i < 11; i++) {
            let uri = await contract.connect(accounts[4]).tokenURI( i)
            assert.strictEqual(uri, `ipfs://xyz/metadata/${i}.json`)
        }

    })

    it("should fail to mint if token ID is already minted", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        //First mint 10
        await contract.connect(accounts[4]).mint( 10, { value: ethers.utils.parseUnits('0.80', 'ether') })

        await expect(contract.connect(accounts[4]).mint( 1, { value: ethers.utils.parseUnits('0.08', 'ether') })).to.be.revertedWith("Minting closed")

    })

    it("should fail to withdraw if not owner", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        //First mint 10
        await contract.connect(accounts[4]).mint( 10, { value: ethers.utils.parseUnits('0.80', 'ether') })

        await expect(contract.connect(accounts[4]).withdraw()).to.be.revertedWith("Ownable: caller is not the owner")

    })

    it("should withdraw if owner", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)

        //First mint 10
        await contract.connect(accounts[4]).mint( 10, { value: ethers.utils.parseUnits('0.80', 'ether') })


        // let beforeBalance = await web3.eth.getBalance(user0)

        let receipt = await contract.connect(accounts[0]).withdraw()
        const gasUsed = receipt.gasUsed


        //Check contract balance
        let contractBalance = await contract.provider.getBalance(contract.address)

        //Check user balance
        let afterBalance = await contract.provider.getBalance(accounts[0].address)

        assert.strictEqual(contractBalance.toString(), '0')
        // console.log(afterBalance.toString())

        // console.log(contractBalance)
        // console.log(afterBalance)
        // console.log(beforeBalance - afterBalance + gasUsed)
        // console.log( toBN(web3.utils.toWei( (10 * 0.08).toString() , 'ether')).sub(toBN(gasUsed)).toString()  )

    })

    it("should get contract metadata", async () => {

        const { contract, accounts } = await loadFixture(deployFunction)


        let uri = await contract.connect(accounts[4]).contractURI()
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

function verifyMintEvent(logs, tokenId) {

  let eventCount = 0
  for (let l of logs) {
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
