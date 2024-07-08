import { UserUtil } from "./utils/user-test-utils";
import { StoreUtil } from "./utils/store-test-util";
import { ProductUtil } from "./utils/product-test-util";
import supertest from "supertest";
import { web } from "../src/apps/web";
import { StockUtil } from "./utils/stock-test-util";
import { OrderUtil } from "./utils/order-test-util";

describe("POST /orders", () => {
  beforeAll(async () => {
    await UserUtil.create();
    await StoreUtil.create();
    await ProductUtil.create();
    await StockUtil.create();
  });

  afterAll(async () => {
    await OrderUtil.deleteOrderItem();
    await OrderUtil.delete();
    await StockUtil.delete();
    await OrderUtil.delete();
    await ProductUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });

  it("should create orders", async () => {
    const response = await supertest(web)
      .post("/orders")
      .set("Authorization", "token")
      .send({
        store_id: "123",
        product_id: "1234test",
        amount: 1,
      });

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data.order_id).toBeDefined();
    expect(response.body.data.store_id).toBe("123");
    expect(response.body.data.product_id).toBe("1234test");
    expect(response.body.data.amount).toBe(1);
    expect(response.body.data.total_price).toBeDefined;
    expect(response.body.data.status).toBe("UNPAID");
  });

  it("should failed create orders not found product", async () => {
    const response = await supertest(web)
      .post("/orders")
      .set("Authorization", "token")
      .send({
        store_id: "123",
        product_id: "1",
        amount: 1,
      });

    console.log(response.body);
    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined();
  });

  it("should failed create orders out of stock", async () => {
    const response = await supertest(web)
      .post("/orders")
      .set("Authorization", "token")
      .send({
        store_id: "123",
        product_id: "1234test",
        amount: 200,
      });

    console.log(response.body);
    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});

describe("GET /orders", () => {
  beforeEach(async () => {
    await UserUtil.create();
    await StoreUtil.create();
    await ProductUtil.create();
    await StockUtil.create();
    await OrderUtil.create();
    await OrderUtil.createOrderItem();
  });

  afterEach(async () => {
    await OrderUtil.deleteOrderItem();
    await OrderUtil.delete();
    await StockUtil.delete();
    await OrderUtil.delete();
    await ProductUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });

  it("should get all orders by user", async () => {
    const response = await supertest(web)
      .get("/orders")
      .set("Authorization", "token");

    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.data[0].order_id).toBeDefined();
    expect(response.body.data[0].store_id).toBe("123");
    expect(response.body.data[0].product_id).toBe("1234test");
    expect(response.body.data[0].amount).toBeDefined();
    expect(response.body.data[0].total_price).toBeDefined;
    expect(response.body.data[0].status).toBe("UNPAID");
    expect(response.body.data[0].product.image_url).toBe("test");
    expect(response.body.data[0].product.product_id).toBe("1234test");
    expect(response.body.data[0].product.product_name).toBe("test_product");
    expect(response.body.data[0].product.product_description).toBeDefined();
    expect(response.body.data[0].product.total_sold).toBeDefined();
    expect(response.body.data[0].product.price).toBeDefined();
  });
});
