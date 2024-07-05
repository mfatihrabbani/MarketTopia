import supertest from "supertest"
import { StoreUtil } from "./utils/store-test-util"
import { UserUtil } from "./utils/user-test-utils"
import {web} from "../src/apps/web"

describe("POST /stores", () => {
    beforeAll(async () => {
        await UserUtil.create()
    })

    afterAll(async () => {
        await StoreUtil.deleteAll()
        await UserUtil.delete()
    })

    it("should create store user", async () => {
        const response = await supertest(web)
            .post("/stores")
            .set("Authorization", "token")
            .send({
                store_name: "Toko Mangga Besar",
                name: "ucup111"
            })

        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.store_name).toBe("Toko Mangga Besar")
        expect(response.body.data.name).toBe("ucup111")
        
    })

    it("should failed store user", async () => {
        const response = await supertest(web)
            .post("/stores")
            .set("Authorization", "token")
            .send({
                store_name: "",
                name: ""
            })

        console.log(response.body)
        expect(response.body.errors).toBeDefined()        
    })

    it("should failed create double store", async () => {
        let response = await supertest(web)
            .post("/stores")
            .set("Authorization", "token")
            .send({
                store_name: "Toko Mangga Besar",
                name: "ucup111"
            })

        response = await supertest(web)
            .post("/stores")
            .set("Authorization", "token")
            .send({
                store_name: "Toko Mangga Besar",
                name: "ucup111"
            })

        console.log(response.body)
        expect(response.body.errors).toBeDefined()        
    })
})

describe("PATCH /stores", () => {
    beforeAll(async () => {
        await UserUtil.create()
        await StoreUtil.create()
    })

    afterAll(async () => {
        await StoreUtil.deleteAll()
        await UserUtil.delete()
    })

    it("should update store", async () => {
        const response = await supertest(web)
            .patch("/stores")
            .set("Authorization", "token")
            .send({
                store_name: "Toko Mangga Besar",
                name: "ucup111"
            })
        
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.store_name).toBe("Toko Mangga Besar")
        expect(response.body.data.name).toBe("ucup111")
    })
})