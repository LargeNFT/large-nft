// const TestServiceFactory = require('./test-service-factory');



contract('PostService', async (accounts) => {


    const serviceFactory = new TestServiceFactory();


    before('Setup', async () => {
        // serviceFactory.setRecordServiceContract(await serviceFactory.recordServiceContract.deployed());
        // freedomService = serviceFactory.getFreedomService();
    });


    it("Test callReadList: Get empty list", async () => {
        console.log('here')

    })


})


