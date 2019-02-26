const TestServiceFactory = require('./test-service-factory.js');
const serviceFactory = new TestServiceFactory();



contract('FreedomService', async (accounts) => {


    before('Setup', async () => {
        serviceFactory.setRecordServiceContract(await serviceFactory.recordServiceContract.deployed());
        freedomService = serviceFactory.getFreedomService();
    });


    it("Test callReadList: Get empty list", async () => {

        let itemList = await freedomService.readList(TEST_REPO1, 10, 0);

        assert.equal(itemList.length, 0);
    })


})