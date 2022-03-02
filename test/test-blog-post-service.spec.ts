//@ts-nocheck
import { getContainer } from "./inversify.config"

import assert from 'assert'
import moment from 'moment'

import { SchemaService } from "../src/service/core/schema-service"
import { OrbitService } from "../src/service/core/orbit-service"

import { BlogPostService } from "../src/service/core/blog-post-service"
import { BlogPost } from "../src/dto/blog-post"



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


contract('BlogPostService', async (accounts) => {

    let service: BlogPostService
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
        
        service = container.get(BlogPostService)
        schemaService = container.get(SchemaService)
        orbitService = container.get(OrbitService)

        mainStore = await schemaService.generateMainStore(orbitService.getPrivateAccessController(user0.toString()), user0.toString())
        await mainStore.load()

        await schemaService.generateSchema(orbitService.getPrivateAccessController(user0.toString()), mainStore, user0)
        await service.loadStoreForWallet(user0)


    })

    //@ts-ignore
    after("After", async () => {
    })


    let permalink1 

    //@ts-ignore
    it("should create & get", async () => {

        //Arrange
        editor = new Quill("#editor")
        editor.setText("Actual content")

        let post: BlogPost = {
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        }

        //Act
        post = await service.put(post)

        permalink1 = post._id

        //Read via permalinkKey
        let fetched = await service.get(permalink1)

        assert.equal(fetched.content.ops[0].insert, "Actual content\n")
        assert.equal(fetched._id, permalink1)

    })

    //@ts-ignore
    it("should update a post", async () => {

        //Arrange
        let post: BlogPost = await service.get(permalink1)

        //Update with editor
        editor = new Quill("#editor")
        editor.setText("Updated content")

        post.content = editor.getContents()


        //Act
        let updated: BlogPost = await service.put(post)


        //Assert

        //Read via permalinkKey
        let fetched = await service.get(permalink1)

        assert.equal(fetched.content.ops[0].insert, "Updated content\n")
        assert.equal(fetched.cid, updated.cid)
        assert.equal(fetched._id, permalink1)


    })

    let permalink2
    let permalink3
    let permalink4

    //@ts-ignore
    it("should create multiple posts and read back in order", async () => {

        //Arrange
        editor = new Quill("#editor")
        editor.setText("1")

        let post2 = await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("2")


        let post3 = await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("3")

        let post4 = await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        permalink2 = post2._id
        permalink3 = post3._id
        permalink4 = post4._id


        //Act
        let it = await service.getPosts(3, 0)

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "3\n")
        assert.equal(it[1].content.ops[0].insert, "2\n")
        assert.equal(it[2].content.ops[0].insert, "1\n")
    })

    //@ts-ignore
    it("should update those posts and still read them back in order", async () => {

        //Arrange
        editor = new Quill("#editor")

        editor.setText("1-update")

        let post1: BlogPost = await service.get(permalink2)
        post1.content = editor.getContents()

        editor.setText("2-update")

        let post2: BlogPost = await service.get(permalink3)
        post2.content = editor.getContents()

        editor.setText("3-update")

        let post3: BlogPost = await service.get(permalink4)
        post3.content = editor.getContents()


        //Act
        await service.put(post1)
        await service.put(post2)
        await service.put(post3)


        //Act
        let it = await service.getPosts(3, 0)

        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "3-update\n")
        assert.equal(it[1].content.ops[0].insert, "2-update\n")
        assert.equal(it[2].content.ops[0].insert, "1-update\n")


    })


    //@ts-ignore
    it("should create multiple posts and read back just the last part of the list", async () => {

        //Arrange
        editor = new Quill("#editor")

        editor.setText("4")

        await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("5")

        await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("6")


        await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        //Act
        let it = await service.getPosts(3, 0)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "6\n")
        assert.equal(it[1].content.ops[0].insert, "5\n")
        assert.equal(it[2].content.ops[0].insert, "4\n")
    })


    //@ts-ignore
    it("should create multiple posts and skip a few of them", async () => {

        //Arrange
        editor = new Quill("#editor")

        editor.setText("7")

        let post = await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("8")

        await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })

        editor.setText("9")

        await service.put({
            content: editor.getContents(),
            owner: user0.toString(),
            dateCreatedMilli: moment().utc().valueOf()
        })


        //Act
        let it = await service.getPosts(3, 3)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "6\n")
        assert.equal(it[1].content.ops[0].insert, "5\n")
        assert.equal(it[2].content.ops[0].insert, "4\n")
    })



    //@ts-ignore
    it("should load a database with lots of records and page through them", async () => {

        //Arrange
        editor = new Quill("#editor")

        

        for (var i = 0; i < 100; i++) {
            editor.setText((i + 10).toString())
            await service.put({
                content: editor.getContents(),
                owner: user0.toString(),
                dateCreatedMilli: moment().utc().valueOf()
            })
        }

        await service.close()

        await service.loadStoreForWallet(user0)

        //Get a page of 3
        let it = await service.getPosts(3, 0)


        //assert
        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "109\n")
        assert.equal(it[1].content.ops[0].insert, "108\n")
        assert.equal(it[2].content.ops[0].insert, "107\n")

        await service.loadStoreForWallet(user0)
        it = await service.getPosts(3, 3, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "106\n")
        assert.equal(it[1].content.ops[0].insert, "105\n")
        assert.equal(it[2].content.ops[0].insert, "104\n")


        await service.loadStoreForWallet(user0)
        it = await service.getPosts(3, 6, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "103\n")
        assert.equal(it[1].content.ops[0].insert, "102\n")
        assert.equal(it[2].content.ops[0].insert, "101\n")


        await service.loadStoreForWallet(user0)
        it = await service.getPosts(3, 9, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "100\n")
        assert.equal(it[1].content.ops[0].insert, "99\n")
        assert.equal(it[2].content.ops[0].insert, "98\n")

        await service.loadStoreForWallet(user0)
        it = await service.getPosts(3, 12, it[2]._id)

        assert.equal(it.length, 3)
        assert.equal(it[0].content.ops[0].insert, "97\n")
        assert.equal(it[1].content.ops[0].insert, "96\n")
        assert.equal(it[2].content.ops[0].insert, "95\n")

    })


    //@ts-ignore 
    it("should page properly no matter what limit we pass", async () => {

        let mainStore2 = await schemaService.getMainStoreByWalletAddress("test-2")
        await mainStore2.load()
        await schemaService.generateSchema(orbitService.getPrivateAccessController("test-2"), mainStore2, "test-2")

        await service.loadStoreForWallet("test-2")

        //Arrange
        editor = new Quill("#editor")

        for (var i = 0; i < 10; i++) {
            editor.setText((i + 10).toString())
            await service.put({
                content: editor.getContents(),
                owner: user0.toString(),
                dateCreatedMilli: moment().utc().valueOf()
            })
        }

        await service.close()
        await service.loadStoreForWallet("test-2")
        let less = await service.getPosts(8,0)
        assert.equal(less.length, 8)


        //All records
        await service.close()
        await service.loadStoreForWallet("test-2")
        let all = await service.getPosts(10,0)
        assert.equal(all.length, 10)

        await service.close()
        await service.loadStoreForWallet("test-2")
        let more = await service.getPosts(11, 0)
        assert.equal(more.length, 10)


        await service.close()
        await service.loadStoreForWallet("test-2")
        let more2 = await service.getPosts(12, 0)
        assert.equal(more2.length, 10)

        await service.close()
        await service.loadStoreForWallet("test-2")
        let more3 = await service.getPosts(14, 0)
        assert.equal(more3.length, 10)


        await service.close()
        await service.loadStoreForWallet("test-2")
        let more4 = await service.getPosts(14, 0)
        assert.equal(more4.length, 10)


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
