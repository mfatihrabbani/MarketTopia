import supertest from "supertest";
import { ProductUtil } from "./utils/product-test-util";
import { StockUtil } from "./utils/stock-test-util";
import { StoreUtil } from "./utils/store-test-util";
import { UserUtil } from "./utils/user-test-utils";
import { web } from "../src/apps/web";

describe("POST /stocks", () => {
  beforeEach(async () => {
    await UserUtil.create();
    await StoreUtil.create();
    await ProductUtil.create();
  });

  afterEach(async () => {
    await StockUtil.deleteAll();
    await ProductUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });
  it("should create stock", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test",
        type_id: 1,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(200);
  });
  it("should failed create stock", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test1",
        type_id: 1,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(404);
  });
  it("should failed create stock type stock not found", async () => {
    const response = await supertest(web)
      .post("/stocks")
      .set("PrivateKey-Store", "123")
      .send({
        product_id: "1234test",
        type_id: 100,
        data: "CID:1",
      });

    console.log(response.body);
    expect(response.statusCode).toBe(404);
  });
});

describe("POST /stocks/bulk", () => {
  beforeEach(async () => {
    await UserUtil.create();
    await StoreUtil.create();
    await ProductUtil.create();
  });

  afterEach(async () => {
    await StockUtil.deleteAll();
    await ProductUtil.delete();
    await StoreUtil.deleteAll();
    await UserUtil.delete();
  });
  it("should create bulk stock", async () => {
    const response = await supertest(web)
      .post("/stocks/bulk")
      .set("PrivateKey-Store", "123")
      .send({
        data: [
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
        ],
      });

    console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toBeDefined();
  });
  it("should failed create bulk stock payload not enough", async () => {
    const response = await supertest(web)
      .post("/stocks/bulk")
      .set("PrivateKey-Store", "123")
      .send({
        data: [
          {
            product_id: "1234test",
            type_id: 1,
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
        ],
      });

    console.log(response.body);
    expect(response.statusCode).toBe(400);
  });
  it("should create bulk stock", async () => {
    const response = await supertest(web)
      .post("/stocks/bulk")
      .set("PrivateKey-Store", "123")
      .send({
        data: [
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1,
            data: "CID:1",
          },
          {
            product_id: "1234test",
            type_id: 1111,
            data: "CID:1",
          },
        ],
      });

    console.log(response.body);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });
});
