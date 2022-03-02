//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'
import moment from 'moment'

import { SchemaService } from "../src/service/core/schema-service"
import { PageService } from "../src/service/core/page-service"
import { OrbitService } from "../src/service/core/orbit-service"
import { Page } from '../src/dto/page'

const Whitepages = artifacts.require("Whitepages")

let user0
let user1
let user2
let user3
let user4

//Need a simulated quill js
initEditor()
import Quill from "quill"

let editor


//@ts-ignore
contract('PageService', async (accounts) => {

    let service: PageService
    let schemaService:SchemaService
    let orbitService:OrbitService
    let mainStore

    //@ts-ignore
    before("", async () => {

        user0 = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        user3 = accounts[3]
        user4 = accounts[4]

        let container = await getContainer()

        service = container.get(PageService)
        schemaService = container.get(SchemaService)
        orbitService = container.get(OrbitService)

        mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user3.toString()), user3.toString())
        await mainStore.load()

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user3.toString()), mainStore, user3)
        await service.loadStoreForWallet(user3)
    })

    //@ts-ignore
    after("After", async () => {
        // await ipfs.stop()
    })


    let permalink1 

    //@ts-ignore
    it("should create & get", async () => {

        //Arrange
        editor = new Quill("#editor")
        editor.setText("Actual content")

        let page: Page = {
            homePage: true,
            content: editor.getContents(),
            owner: user3.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        }

        //Act
        page = await service.put(page)

        permalink1 = page._id

        //Assert
        assert.notEqual(page._id, undefined)

        //Read via permalink
        let fetched: Page = await service.get(permalink1)

        assert.equal(fetched.content.ops[0].insert, "Actual content\n")
        assert.equal(fetched._id, page._id)

    })

    //@ts-ignore
    it("should update a page", async () => {

        //Arrange
        editor = new Quill("#editor")
        editor.setText("Updated content")

        let page: Page = await service.get(permalink1)
        page.content = editor.getContents()


        //Act
        let updated: Page = await service.put(page)


        //Assert

        //Read via cid
        let fetched: Page = await service.get(updated._id)

        assert.equal(fetched.content.ops[0].insert, "Updated content\n")
        assert.equal(fetched._id, permalink1)


    })
   

    //@ts-ignore
    it("should get an array of all pages", async () => {

        //Arrange
        //Create another record
        editor = new Quill("#editor")
        editor.setText("page2")

        let page: Page = {
            content: editor.getContents(),
            homePage: true,
            owner: user3.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        }

        page = await service.put(page)


        //Act
        let pages:Page[] = await service.getPages()


        //Assert
        assert.equal(pages[0].content.ops[0].insert, "Updated content\n")
        assert.equal(pages[1].content.ops[0].insert, "page2\n")

    })
    



})



function initEditor() {

    const jsdom = require('jsdom')
    const { JSDOM } = jsdom;

    const dom = new JSDOM('<div id="editor"></div>')

    dom.window.document.getSelection = function() { return { getRangeAt: function() { } }; }
    dom.window.document.execCommand = function (command, showUI, value) { try { return document.execCommand(command, showUI, value); } catch(e) {} return false; }

    global.window = dom.window;
    global.document = dom.window.document;
    global.Node = dom.window.Node;
    global.navigator = global.window.navigator;
    global.Text = dom.window.Text;
    global.HTMLElement = window.HTMLElement;
    global.MutationObserver = dom.window.MutationObserver;


}
