import assert = require('assert');

import { Utils } from './utils'


//@ts-ignore
contract('WhitePages', async (accounts) => {

    let createdCount = 0
    let whitePages

    //@ts-ignore
    before("", async () => {

        //@ts-ignore
        let contract = artifacts.require("Whitepages")

        whitePages = await contract.deployed()
        
    })

    //@ts-ignore
    it("Should count zero records when we start", async () => {

        //Act
        let count = await whitePages.count()

        assert.equal(0, count)

    });

    //@ts-ignore
    it("Should create a record and verify the info is stored in contract", async () => {

        //Arrange
        let fakeCid = "TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iT";

        //Act
        let result = await whitePages.create(fakeCid)
        createdCount++;

        //Assert
        var loggedRecord = Utils.parseEvent(result)


        //Verify the logged record
        assert.equal(loggedRecord.orbitCid, "TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iT", "OrbitCids should match");
        assert.equal(loggedRecord.owner, accounts[0], "OrbitCids should match");



        //Also verify with a read.
        let orbitCid = await whitePages.read(accounts[0]);


        //Check that the metadata matches.
        assert.equal(orbitCid, "TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iT", "OrbitCids should match");


    });


    //@ts-ignore
    it("Should throw an error when creating with address that aleady exists", async () => {
        
        //Act
        try {
            let result = await whitePages.create("TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iT")
            assert.fail("Did not throw exception")
        } catch(ex) {
            assert.equal(ex.reason, "Address already exists")
        }

    })



    //@ts-ignore
    it("Should throw an error when creating with blank orbitCid. ", async () => {
        
        //Act
        try {
            let result = await whitePages.create("");
            assert.fail("Did not throw exception")
        } catch(ex) {

            assert.equal(ex.reason, "You must supply an orbitCid")
        }

    })

    //@ts-ignore
    it("Should throw an error when reading invalid address", async () => {

        //Act
        try {
            let result = await whitePages.read("XYZ");
            assert.fail("Did not throw exception")
        } catch(ex) {

            assert.equal(ex.reason, "invalid address")
        }

    })

    //@ts-ignore
    it("Should count recods after inserting multiple", async () => {

        //Arrange
        let result1 = await whitePages.create("TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78MQ", { from: accounts[1] });
        let result2 = await whitePages.create("MdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iF", { from: accounts[2] });
        let result3 = await whitePages.create("GdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iB", { from: accounts[3] });
        let result4 = await whitePages.create("AdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iA", { from: accounts[4] });
        let result5 = await whitePages.create("RdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iY", { from: accounts[5] });

        createdCount += 5;

        //Act
        let count = await whitePages.count();

        assert.equal(count, createdCount);
        
    });


    //@ts-ignore
    it("Shouldn't update to a blank cid.", async () => {
        
        //Arrange
        let result = await whitePages.create("VXLTM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78MQ", { from: accounts[6] });

        
        //Act
        try {
            let result = await whitePages.update("", { from: accounts[6] });
            assert.fail("Did not throw exception")
        } catch(ex) {

            assert.equal(ex.reason, "You must supply an orbitCid")
        }


    });


    //@ts-ignore
    it("Should update a record with a new IPFS cid and make sure the changes are saved.", async () => {
        
        //Arrange
        let result = await whitePages.create("VXLTM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78MQ", { from: accounts[7] });

        
        //Act
        await whitePages.update("CRLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b7ViB", { from: accounts[7] });


        //Assert
        let cid = await whitePages.read(accounts[7]);


        assert.equal(cid, "CRLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b7ViB")


    });


    //@ts-ignore    
    it("Should read all the records we've created so far by index", async () => {

        let _1 = await whitePages.readByIndex(1)
        let _2 = await whitePages.readByIndex(2)
        let _3 = await whitePages.readByIndex(3)
        let _4 = await whitePages.readByIndex(4)
        let _5 = await whitePages.readByIndex(5)
        let _6 = await whitePages.readByIndex(6)
        let _7 = await whitePages.readByIndex(7)

        assert.equal(_1, "TdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78MQ")
        assert.equal(_2, "MdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iF")
        assert.equal(_3, "GdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iB")
        assert.equal(_4, "AdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iA")
        assert.equal(_5, "RdLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78iY")
        assert.equal(_6, "VXLTM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b78MQ")
        assert.equal(_7, "CRLuM31DmfwJYHi9FJPoSqLf9fepy6o2qcdk88t9w395b7ViB")

    });


})


