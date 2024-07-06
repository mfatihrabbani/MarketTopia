import supertest from "supertest"
import { ProductUtil } from "./utils/product-test-util"
import { StoreUtil } from "./utils/store-test-util"
import { UserUtil } from "./utils/user-test-utils"
import { web } from "../src/apps/web"

describe("POST /products", () => {
    beforeAll(async () => {
        await UserUtil.create()
        await StoreUtil.create()
    })
    
    afterAll(async () => {
        await ProductUtil.delete()
        await StoreUtil.deleteAll()
        await UserUtil.delete()
    })

    it("should create product", async () => {
        const response = await supertest(web)
            .post("/products")
            .set("Authorization", "token")
            .send({
                product_name: "test_product",
                product_description: "Product ini bagus sekali",
                category_id: "ACCOUNT",
                payment_method: "DEPOSIT_WORLD_LOCK",
                price: 1000
            })
        
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.product_id).toBeDefined()
        expect(response.body.data.product_name).toBe("test_product")
        expect(response.body.data.category_id).toBe("ACCOUNT")
        expect(response.body.data.payment_method).toBe("DEPOSIT_WORLD_LOCK")
        expect(response.body.data.price).toBe(1000)
        expect(response.body.data.total_sold).toBe(0)
        expect(response.body.data.is_active).toBe(true)
    })
})

describe("PATCH /products", () => {
    beforeEach(async () => {
        await UserUtil.create()
        await StoreUtil.create()
        await ProductUtil.create()
    })
    
    afterEach(async () => {
        await ProductUtil.delete()
        await StoreUtil.deleteAll()
        await UserUtil.delete()
    })

    it("should update product", async () => {
        const response = await supertest(web)
            .patch("/products")
            .set("Authorization", "token")
            .send({
                product_id: "1234test",
                product_name: "test_product_baru",
                product_description: "Product ini bagus sekali",
                category_id: "ACCOUNT",
                payment_method: "DEPOSIT_WORLD_LOCK",
                price: 1000
            })
        
        console.log(response.body)
        expect(response.status).toBe(200)
        expect(response.body.data.product_id).toBeDefined()
        expect(response.body.data.product_name).toBe("test_product_baru")
        expect(response.body.data.category_id).toBe("ACCOUNT")
        expect(response.body.data.payment_method).toBe("DEPOSIT_WORLD_LOCK")
        expect(response.body.data.price).toBe(1000)
        expect(response.body.data.total_sold).toBe(0)
        expect(response.body.data.is_active).toBe(true)
        expect(response.body.data.image_url).toBeDefined()
    })

    it("should failed update product", async () => {
        const response = await supertest(web)
            .patch("/products")
            .set("Authorization", "token")
            .send({
                product_id: "ini tidak ada",
                product_name: "test_product_baru",
                product_description: "Product ini bagus sekali",
                category_id: "ACCOUNT",
                payment_method: "DEPOSIT_WORLD_LOCK",
                price: 1000
            })
        
        console.log(response.body)
        expect(response.status).toBe(404)
        expect(response.body.errors).toBeDefined()
    })

    it("should failed update product cannot null body", async () => {
        const response = await supertest(web)
            .patch("/products")
            .set("Authorization", "token")
            .send({
                product_name: "test_product_baru",
                product_description: "Product ini bagus sekali",
                category_id: "ACCOUNT",
                payment_method: "DEPOSIT_WORLD_LOCK",
                price: 1000
            })
        
        console.log(response.body)
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeDefined()
    })
})

describe("PATCH /products", () => {

    beforeEach(async () => {
        await UserUtil.create()
        await StoreUtil.create()
        await ProductUtil.create()
    })
    
    afterEach(async () => {
        await ProductUtil.delete()
        await StoreUtil.deleteAll()
        await UserUtil.delete()
    })

    it("should get products", async () => {
        const response = await supertest(web)
            .get("/products?most_sold=true")

        console.log(response.body)
        expect(response.status).toBe(200)
    })

})